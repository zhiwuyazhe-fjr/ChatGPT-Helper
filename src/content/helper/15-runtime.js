// Own listeners, observers and deferred work for one feature lifetime.
export class RuntimeScope {
    constructor() {
        this.cleanups = [];
        this.jobs = new Map();
        this.disposed = false;
    }

    listen(target, event, handler, options) {
        target?.addEventListener(event, handler, options);
        this.cleanups.push(() => target?.removeEventListener(event, handler, options));
        return handler;
    }

    observe(target, options, handler) {
        const observer = new MutationObserver(handler);
        observer.observe(target, options);
        this.cleanups.push(() => observer.disconnect());
        return observer;
    }

    schedule(key, callback, delay = 100) {
        if (this.disposed || this.jobs.has(key)) return;
        this.jobs.set(key, setTimeout(() => {
            this.jobs.delete(key);
            if (!this.disposed) callback();
        }, delay));
    }

    dispose() {
        this.disposed = true;
        this.jobs.forEach(clearTimeout);
        this.jobs.clear();
        this.cleanups.splice(0).reverse().forEach(cleanup => cleanup());
    }
}

// Text mutations have a Text target; never call Element.closest on that target.
export function isHelperMutation(mutation) {
    const element = mutation.target?.nodeType === 1 ? mutation.target : mutation.target?.parentElement;
    return Boolean(element?.closest('[id^="chatgpt-helper"], [data-gh-owned], .chatgpt-helper-dialog-overlay, #outline-content'));
}
