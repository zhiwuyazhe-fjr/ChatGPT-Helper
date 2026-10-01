import EventEmitter from 'mitt'
import { HttpError, RateLimitError } from '../api'
import { sleep } from './utils'

type RequestFn<T> = () => Promise<T>

/** Public shape callers pass to `add()` */
interface RequestObject<T> {
    name: string
    request: RequestFn<T>
}

/** Internal shape with per-item retry counters */
interface InternalRequestObject<T> extends RequestObject<T> {
    retries: number // general error retries
    rateRetries: number // 429-specific retries
}

export type RequestStatus = 'processing' | 'retrying' | 'rate_limited'

interface ProgressEvent {
    total: number
    completed: number
    currentName: string
    currentStatus: RequestStatus
    /** Seconds remaining in a rate-limit pause (only set when status === 'rate_limited') */
    rateLimitWaitSecs?: number
}

/** Max retries for generic (non-429) errors before skipping a single request */
const MAX_RETRIES = 5
/**
 * Max times the entire queue can be globally paused for rate limiting before
 * giving up and stopping the queue entirely.
 */
const MAX_GLOBAL_PAUSES = 5
/**
 * Default pause length (ms) applied to the whole queue on a 429.
 * Used when the API does not return a Retry-After header.
 */
const DEFAULT_429_PAUSE_MS = 60_000

export class RequestQueue<T> {
    private eventEmitter = EventEmitter<{
        done: T[]
        progress: ProgressEvent
        /** Emitted when the queue aborts itself (e.g. rate-limit retries exhausted) — not a success */
        stopped: []
    } & Record<string, any[]>>()

    private queue: Array<InternalRequestObject<T>> = []
    private results: T[] = []

    private status: 'IDLE' | 'IN_PROGRESS' | 'STOPPED' | 'COMPLETED' = 'IDLE'

    private readonly backoffMultiplier = 2
    private backoff: number

    private total = 0
    private completed = 0

    /**
     * Monotonic token: bumped by stop()/clear(). Every in-flight process()
     * chain captures the token at start and bails out after any await if the
     * token changed — otherwise a cleared/stopped queue's tail would keep
     * running and emit a ghost `done` (triggering unwanted downloads).
     */
    private generation = 0

    /**
     * Timestamp (ms since epoch) until which the whole queue is frozen after
     * receiving a 429. While Date.now() < pauseUntil every process() iteration
     * waits out the remainder before making the next request.
     */
    private pauseUntil = 0
    /** How many global rate-limit pauses have been applied so far */
    private globalPauses = 0

    constructor(private minBackoff: number, private maxBackoff: number) {
        this.backoff = minBackoff
    }

    add(requestObject: RequestObject<T>) {
        this.queue.push({ ...requestObject, retries: 0, rateRetries: 0 })
    }

    start() {
        if (this.status === 'IDLE') {
            this.total = this.queue.length
            this.process(this.generation)
        }
    }

    /**
     * Stop the queue. Deliberately does NOT emit `done`: `done` means
     * "finished successfully", and UI callbacks react to it by downloading
     * files / mutating lists / showing success alerts.
     */
    stop() {
        this.generation++
        this.status = 'STOPPED'
    }

    clear() {
        this.generation++
        this.queue = []
        this.results = []
        this.status = 'IDLE'
        this.backoff = this.minBackoff
        this.pauseUntil = 0
        this.globalPauses = 0
        this.total = 0
        this.completed = 0
    }

    on(event: 'progress', fn: (progress: ProgressEvent) => void): () => void
    on(event: 'done', fn: (result: T[]) => void): () => void
    on(event: 'stopped', fn: () => void): () => void
    on(event: string, fn: (...args: any[]) => void): () => void {
        this.eventEmitter.on(event, fn)
        return () => this.eventEmitter.off(event, fn)
    }

    private async process(generation: number) {
        if (generation !== this.generation) return
        if (this.status === 'STOPPED' || this.status === 'COMPLETED') {
            return
        }

        if (this.queue.length === 0) {
            this.done()
            return
        }

        // ── Global rate-limit pause ──────────────────────────────────────────
        // If a previous request set pauseUntil, wait for the remainder before
        // making any new request. This freezes the whole queue at once instead
        // of per-item retries, so 100 queued items don't each wait 30s in turn.
        const remaining = this.pauseUntil - Date.now()
        if (remaining > 0) {
            const waitSecs = Math.ceil(remaining / 1000)
            // Broadcast the pause status for every item currently at the front
            this.progress(this.queue[0].name, 'rate_limited', waitSecs)
            await sleep(remaining)
            if (generation !== this.generation) return
            this.pauseUntil = 0
        }

        this.status = 'IN_PROGRESS'
        const requestObject = this.queue.shift()!
        const { name, request } = requestObject

        let waitMs = this.backoff

        try {
            this.progress(name, 'processing')
            const result = await request()
            if (generation !== this.generation) return
            this.results.push(result)
            this.completed++
            this.progress(name, 'processing')
            this.backoff = this.minBackoff // reset on success
            requestObject.retries = 0
        }
        catch (error) {
            if (generation !== this.generation) return
            if (error instanceof RateLimitError) {
                this.globalPauses++
                if (this.globalPauses > MAX_GLOBAL_PAUSES) {
                    // Rate limit persists even after several long pauses — abort.
                    console.warn('[Exporter] Queue stopped: API rate limit did not clear after', MAX_GLOBAL_PAUSES, 'pauses')
                    this.stop()
                    // 通知 UI 复位状态（区别于成功完成的 done）
                    this.eventEmitter.emit('stopped')
                    return
                }
                // Freeze the whole queue. Exponentially increase the pause so
                // we back off harder if the first pause wasn't long enough.
                const pauseMs = Math.max(
                    error.retryAfterMs,
                    DEFAULT_429_PAUSE_MS * this.globalPauses,
                )
                this.pauseUntil = Date.now() + pauseMs
                this.progress(name, 'rate_limited', Math.round(pauseMs / 1000))
                console.warn(`[Exporter] Rate limited (429). Pausing queue for ${Math.round(pauseMs / 1000)}s (pause #${this.globalPauses})`)
                // Put this item back — it will be retried after the pause clears
                this.queue.unshift(requestObject)
                waitMs = 0 // the sleep is handled at the top of the next process() call
            }
            else if (error instanceof HttpError && error.status >= 400 && error.status < 500) {
                // 4xx 是确定性失败（参数/权限问题）：重试不可能成功，直接跳过
                console.warn(`[Exporter] "${name}" skipped: ${error.status} ${error.message}`)
                waitMs = 0
            }
            else {
                console.error(`[Exporter] "${name}" failed:`, error)
                requestObject.retries++
                if (requestObject.retries > MAX_RETRIES) {
                    console.warn(`[Exporter] "${name}" skipped after ${MAX_RETRIES} retries`)
                    waitMs = 0 // skip — don't re-queue
                }
                else {
                    this.backoff = Math.min(this.backoff * this.backoffMultiplier, this.maxBackoff)
                    waitMs = this.backoff
                    this.progress(name, 'retrying')
                    this.queue.unshift(requestObject)
                }
            }
        }

        await sleep(waitMs)
        if (generation !== this.generation) return
        this.process(generation)
    }

    private progress(name: string, status: RequestStatus, rateLimitWaitSecs?: number) {
        this.eventEmitter.emit('progress', {
            total: this.total,
            completed: this.completed,
            currentName: name,
            currentStatus: status,
            rateLimitWaitSecs,
        })
    }

    private done() {
        this.status = 'COMPLETED'
        this.eventEmitter.emit('done', this.results)
    }
}
