import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { fetchConversation, fetchConversationsPage, fetchProjects, RateLimitError } from '../api';
import { EXPORT_OPERATION_BATCH } from '../constants';
import { exportAllToHtml } from '../exporter/html';
import { exportAllToJson, exportAllToOfficialJson } from '../exporter/json';
import { exportAllToMarkdown } from '../exporter/markdown';
import { getExportPortal } from '../host';
import { useSettingContext } from './SettingContext';
import type { ApiConversationItem, ApiConversationWithId, ApiProjectInfo } from '../api';
import type { FC } from '../type';

const formats = { Markdown: exportAllToMarkdown, HTML: exportAllToHtml, JSON: exportAllToOfficialJson, 'JSON (ZIP)': exportAllToJson };
function pause(ms: number, signal: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
        signal.throwIfAborted();
        const stop = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); };
        const timer = setTimeout(() => { signal.removeEventListener('abort', stop); resolve(); }, ms);
        signal.addEventListener('abort', stop, { once: true });
    });
}
function BatchContent({ format, close }: { format: string; close: () => void }) {
    const { t } = useTranslation();
    const { enableMeta, exportMetaList, exportAllLimit } = useSettingContext();
    const [source, setSource] = useState('API');
    const [project, setProject] = useState('');
    const [projects, setProjects] = useState<ApiProjectInfo[]>([]);
    const [items, setItems] = useState<ApiConversationItem[]>([]);
    const [local, setLocal] = useState<ApiConversationWithId[]>([]);
    const [selected, setSelected] = useState(new Set<string>());
    const [query, setQuery] = useState('');
    const [output, setOutput] = useState('Markdown');
    const [cursor, setCursor] = useState<number | string | null>(0);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const generation = useRef(0);
    const alive = useRef(true);
    const job = useRef<AbortController>();
    const visible = useMemo(() => items.filter(item => (item.title || '').toLocaleLowerCase().includes(query.toLocaleLowerCase())), [items, query]);
    const load = async (next: number | string, replace = false) => {
        const version = ++generation.current;
        setLoading(true); setError('');
        try {
            const page = await fetchConversationsPage(project || null, next, EXPORT_OPERATION_BATCH);
            if (!alive.current || version !== generation.current) return;
            const all = replace ? page.items : [...items, ...page.items];
            const unique = [...new Map(all.map(item => [item.id, item])).values()];
            setItems(unique);
            setCursor(project ? (page.cursor && page.cursor !== next ? page.cursor : null) :
                page.items.length >= EXPORT_OPERATION_BATCH && (page.total == null || unique.length < page.total) ? unique.length : null);
        } catch (error) { if (alive.current && version === generation.current) setError(error.message); }
        finally { if (alive.current && version === generation.current) setLoading(false); }
    };
    useEffect(() => {
        if (source !== 'API') { setLoading(false); return; }
        setItems([]); setSelected(new Set()); setCursor(0); void load(0, true);
        return () => { generation.current++; };
    }, [source, project]);
    useEffect(() => {
        fetchProjects().then(value => { if (alive.current) setProjects(value); }).catch(() => {});
        return () => { alive.current = false; generation.current++; job.current?.abort(); };
    }, []);
    const upload = async (file?: File) => {
        if (!file) return;
        const version = ++generation.current;
        setLoading(true); setError('');
        try {
            if (file.size > 200 * 1024 * 1024) throw new Error(t('Invalid File Format'));
            const data = JSON.parse(await file.text());
            if (!Array.isArray(data) || data.some(item => !item || typeof item.id !== 'string' || !item.mapping || typeof item.mapping !== 'object' || Array.isArray(item.mapping))) throw new Error(t('Invalid File Format'));
            if (!alive.current || version !== generation.current) return;
            const unique = [...new Map<string, ApiConversationWithId>(data.map(item => [item.id, item])).values()];
            setLocal(unique); setItems(unique as any); setSelected(new Set()); setSource('Local'); setCursor(null);
        } catch (error) { if (alive.current && version === generation.current) setError(error.message); }
        finally { if (alive.current && version === generation.current) setLoading(false); }
    };
    const cancel = () => { job.current?.abort(); setBusy(false); setStatus(t('Export cancelled')); };
    const run = async () => {
        if (busy || !selected.size) return;
        const controller = job.current = new AbortController();
        const signal = controller.signal;
        const chosen = items.filter(item => selected.has(item.id));
        setBusy(true); setError('');
        let saved = 0;
        try {
            const count = Math.ceil(chosen.length / EXPORT_OPERATION_BATCH);
            for (let batch = 0; batch < count; batch++) {
                const conversations: ApiConversationWithId[] = [];
                const slice = chosen.slice(batch * EXPORT_OPERATION_BATCH, (batch + 1) * EXPORT_OPERATION_BATCH);
                for (const item of slice) {
                    signal.throwIfAborted();
                    setStatus(`${batch * EXPORT_OPERATION_BATCH + conversations.length + 1} / ${chosen.length} · ${item.title}`);
                    if (source === 'Local') conversations.push(local.find(conversation => conversation.id === item.id));
                    else {
                        for (let attempt = 0; ; attempt++) {
                            try { conversations.push(await fetchConversation(item.id, output !== 'JSON', signal)); break; }
                            catch (error) {
                                if (!(error instanceof RateLimitError) || attempt >= 3) throw error;
                                setStatus(t('Rate limited wait', { seconds: Math.ceil(error.retryAfterMs / 1000) }));
                                await pause(error.retryAfterMs, signal);
                            }
                        }
                        await pause(200, signal);
                    }
                }
                signal.throwIfAborted();
                await formats[output](format, conversations, enableMeta ? exportMetaList : [], projects.find(item => item.id === project)?.display.name, batch + 1, count, signal);
                saved++;
                signal.throwIfAborted();
            }
            setStatus(t('Batch export saved', { count: chosen.length }));
        } catch (error) {
            if (!signal.aborted && alive.current) setError(`${t('Export failed')}: ${error.message}${saved ? ` · ${t('Saved batches', { count: saved })}` : ''}`);
        } finally { if (!signal.aborted && alive.current) setBusy(false); }
    };
    return <>
        <div className="gh-export-dialog-heading"><Dialog.Title className="DialogTitle">{t('Export All')}</Dialog.Title><button type="button" className="gh-export-icon-button" aria-label={t('Close')} onClick={() => { job.current?.abort(); close(); }}>×</button></div>
        <Dialog.Description className="gh-export-hint">{t('Batch export description')}</Dialog.Description>
        <div className="gh-batch-tools">
            <label>{t('Source')}<select aria-label={t('Source')} value={source} disabled={busy} onChange={event => { setSource(event.currentTarget.value); if (event.currentTarget.value === 'Local') { setItems(local as any); setSelected(new Set()); setCursor(null); } }}><option value="API">ChatGPT</option><option value="Local">conversations.json</option></select></label>
            {source === 'API' ? <label>{t('Project')}<select aria-label={t('Project')} value={project} disabled={busy || loading} onChange={event => setProject(event.currentTarget.value)}><option value="">{t('All conversations')}</option>{projects.map(item => <option key={item.id} value={item.id}>{item.display.name}</option>)}</select></label> : <label>{t('Import file')}<input type="file" accept=".json,application/json" disabled={busy} onChange={event => void upload(event.currentTarget.files?.[0])} /></label>}
        </div>
        <input className="Input" type="search" value={query} aria-label={t('Search conversations')} placeholder={t('Search conversations')} disabled={busy} onInput={event => setQuery(event.currentTarget.value)} />
        <div className="gh-image-selection-tools"><strong>{t('Selected count', { count: selected.size })}</strong><button type="button" disabled={busy} onClick={() => setSelected(previous => new Set([...previous, ...visible.map(item => item.id)]))}>{t('Select all')}</button><button type="button" disabled={busy} onClick={() => setSelected(new Set())}>{t('Clear')}</button></div>
        <div className="gh-batch-list" aria-busy={loading}>{visible.map(item => <label key={item.id} className="gh-batch-row"><input type="checkbox" checked={selected.has(item.id)} disabled={busy} onChange={event => setSelected(previous => { const next = new Set(previous); if (event.currentTarget.checked) next.add(item.id); else next.delete(item.id); return next; })} /><span>{item.title || 'ChatGPT'}</span></label>)}{!visible.length && <p className="gh-export-hint">{loading ? t('Loading') : t('No results')}</p>}</div>
        {source === 'API' && cursor !== null && <button type="button" className="Button neutral" disabled={loading || busy || items.length >= exportAllLimit} onClick={() => void load(cursor)}>{t('Load next page')}</button>}
        {error && <p role="alert" className="gh-export-error">{error}</p>}
        <div className="gh-export-dialog-footer"><span role="status" className="gh-export-hint">{status}</span><select aria-label={t('Format')} value={output} disabled={busy} onChange={event => setOutput(event.currentTarget.value)}>{Object.keys(formats).map(name => <option key={name}>{name}</option>)}</select><button type="button" className="Button neutral" onClick={busy ? cancel : close}>{busy ? t('Cancel') : t('Close')}</button><button type="button" className="Button green" disabled={busy || loading || !selected.size} onClick={run}>{t('Export')}</button></div>
    </>;
}
export const ExportDialog: FC<{ format: string; open: boolean; onOpenChange: (value: boolean) => void }> = ({ format, open, onOpenChange, children }) => <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger><Dialog.Portal container={getExportPortal()}><Dialog.Overlay className="DialogOverlay" /><Dialog.Content className="DialogContent">{open && <BatchContent format={format} close={() => onOpenChange(false)} />}</Dialog.Content></Dialog.Portal>
</Dialog.Root>;
