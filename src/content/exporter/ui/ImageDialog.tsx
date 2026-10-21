import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { defaultImageOptions, imageDocument, prepareImageFrame, saveMessageImage } from '../exporter/image';
import { getExportPortal } from '../host';
import { useSettingContext } from './SettingContext';
import type { ExportHost, MessageSnapshot } from '../host';
import type { ImageOptions } from '../exporter/image';

export function ImageDialog({ host, messages, initialIds, onClose }: { host: ExportHost; messages: MessageSnapshot[]; initialIds: string[]; onClose: () => void }) {
    const { t } = useTranslation();
    const { format: filenameFormat } = useSettingContext();
    const [selected, setSelected] = useState(new Set(initialIds));
    const [options, setOptions] = useState<ImageOptions>({ ...defaultImageOptions, theme: host.getContext().theme === 'dark' ? 'dark' : 'light' });
    const [ready, setReady] = useState(false);
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [missing, setMissing] = useState(0);
    const [zoom, setZoom] = useState(.6);
    const [height, setHeight] = useState(600);
    const frame = useRef<HTMLIFrameElement>();
    const viewport = useRef<HTMLDivElement>();
    const job = useRef<AbortController>();
    const title = useRef(host.getContext().title).current;
    const chosen = useMemo(() => messages.filter(message => selected.has(message.id)), [messages, selected]);
    const html = useMemo(() => imageDocument(title, chosen, options, t('You')), [title, chosen, options.width, options.theme, t]);
    const change = (key: keyof ImageOptions, value: any) => setOptions(previous => ({ ...previous, [key]: value }));
    useEffect(() => {
        const controller = new AbortController();
        setReady(false); setError('');
        prepareImageFrame(frame.current, html, controller.signal).then(count => {
            if (controller.signal.aborted) return;
            setMissing(count);
            setHeight(Math.min(4000, frame.current.contentDocument.getElementById('export-image').scrollHeight));
            setReady(true);
        }).catch(error => { if (error.name !== 'AbortError') setError(error.message); });
        return () => controller.abort();
    }, [html]);
    useEffect(() => {
        const resize = new ResizeObserver(() => setZoom(Math.min(1, Math.max(.2, (viewport.current.clientWidth - 24) / options.width))));
        resize.observe(viewport.current);
        return () => resize.disconnect();
    }, [options.width]);
    useEffect(() => () => job.current?.abort(), []);
    const close = () => { job.current?.abort(); onClose(); };
    const save = async () => {
        if (busy || !ready || !chosen.length) return;
        const controller = job.current = new AbortController();
        setBusy(true); setError('');
        try {
            await saveMessageImage(frame.current, title, options, filenameFormat, controller.signal,
                (done, total) => setStatus(t('Image progress', { done, total })));
            host.notify(t('Image saved'));
            setStatus(t('Image saved'));
        } catch (error) {
            if (!controller.signal.aborted) setError(error.message || t('Export failed'));
        } finally { if (!controller.signal.aborted) setBusy(false); }
    };
    return <Dialog.Root open onOpenChange={value => { if (!value) close(); }}>
        <Dialog.Portal container={getExportPortal()}>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent gh-image-dialog" aria-describedby="gh-image-description">
                <div className="gh-export-dialog-heading"><Dialog.Title className="DialogTitle">{t('Export image')}</Dialog.Title>
                    <button type="button" className="gh-export-icon-button" aria-label={t('Close')} onClick={close}>×</button></div>
                <Dialog.Description id="gh-image-description">{t('Image selection description')}</Dialog.Description>
                <div className="gh-image-layout">
                    <section className="gh-image-selection" aria-label={t('Select messages')}>
                        <div className="gh-image-selection-tools"><strong>{t('Selected count', { count: chosen.length })}</strong>
                            <button type="button" disabled={busy} onClick={() => setSelected(new Set(messages.map(message => message.id)))}>{t('Select all')}</button>
                            <button type="button" disabled={busy} onClick={() => setSelected(new Set())}>{t('Clear')}</button></div>
                        <div className="gh-image-message-list">{messages.map((message, index) => <label key={message.id} className="gh-image-message-option">
                            <input type="checkbox" checked={selected.has(message.id)} disabled={busy} onChange={event => setSelected(previous => {
                                const next = new Set(previous); if (event.currentTarget.checked) next.add(message.id); else next.delete(message.id); return next;
                            })} />
                            <span><strong>{index + 1} · {message.role === 'user' ? t('You') : 'ChatGPT'}</strong><span>{message.content.slice(0, 120) || t('Image')}</span></span>
                        </label>)}</div>
                    </section>
                    <section className="gh-image-preview-column">
                        <div className="gh-image-options">
                            <label>{t('Format')}<select aria-label={t('Format')} value={options.format} disabled={busy} onChange={event => change('format', event.currentTarget.value)}><option value="png">PNG</option><option value="jpeg">JPEG</option></select></label>
                            <label>{t('Appearance')}<select aria-label={t('Appearance')} value={options.theme} disabled={busy} onChange={event => change('theme', event.currentTarget.value)}><option value="light">{t('Light')}</option><option value="dark">{t('Dark')}</option></select></label>
                            <label>{t('Image width')}<select aria-label={t('Image width')} value={options.width} disabled={busy} onChange={event => change('width', Number(event.currentTarget.value))}><option value="768">768 px</option><option value="960">960 px</option></select></label>
                            <label>{t('Resolution')}<select aria-label={t('Resolution')} value={options.scale} disabled={busy} onChange={event => change('scale', Number(event.currentTarget.value))}><option value="1">1×</option><option value="2">2×</option></select></label>
                            <label>{t('Layout')}<select aria-label={t('Layout')} value={options.paged ? 'pages' : 'long'} disabled={busy} onChange={event => change('paged', event.currentTarget.value === 'pages')}><option value="pages">{t('Pages')}</option><option value="long">{t('Long image')}</option></select></label>
                        </div>
                        <div className="gh-image-preview-scroll" ref={viewport} aria-label={t('Preview')}>
                            <div style={{ width: options.width * zoom, height: height * zoom }}>
                                <iframe ref={frame} title={t('Image preview')} sandbox="allow-same-origin" style={{ width: options.width, height, transform: `scale(${zoom})`, transformOrigin: 'top left' }} />
                            </div>
                        </div>
                        <p className="gh-export-hint">{t('Image pages hint')}</p>
                        {missing > 0 && <p role="status" className="gh-export-hint">{t('Image unavailable count', { count: missing })}</p>}
                    </section>
                </div>
                <div className="gh-export-dialog-footer">
                    <span role={error ? 'alert' : 'status'} className={error ? 'gh-export-error' : 'gh-export-hint'}>{error || (busy ? status : chosen.length ? (ready ? status : t('Preparing preview')) : t('Choose at least one message'))}</span>
                    <button type="button" className="Button neutral" onClick={close}>{busy ? t('Cancel') : t('Close')}</button>
                    <button type="button" className="Button green" onClick={save} disabled={!ready || !chosen.length || busy}>{busy ? t('Exporting') : t('Save image')}</button>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>;
}
