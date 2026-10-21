import { exportedHtmlStyles } from '../generated/html-assets';
import { getFileNameWithFormat } from '../utils/download';
import type { MessageSnapshot } from '../host';

export interface ImageOptions {
    format: 'png' | 'jpeg'; theme: 'light' | 'dark'; width: number; scale: number; paged: boolean;
}
export const defaultImageOptions: ImageOptions = { format: 'png', theme: 'light', width: 768, scale: 2, paged: true };
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export function imageDocument(title: string, messages: MessageSnapshot[], options: ImageOptions, userLabel: string) {
    const dark = options.theme === 'dark';
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: http: data: blob:; style-src 'unsafe-inline'; font-src data:">
        <style>${exportedHtmlStyles}
        * { box-sizing:border-box } html,body { margin:0; padding:0; width:${options.width}px; background:${dark ? '#202221' : '#fafbf9'}; color:${dark ? '#ecefea' : '#202620'}; color-scheme:${options.theme}; }
        body { font:16px/1.75 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif; }
        #export-image { width:${options.width}px; padding:40px; overflow:hidden; }
        header { border-bottom:1px solid ${dark ? '#444b43' : '#dce2da'}; padding-bottom:24px; margin-bottom:28px; }
        header small,footer { color:${dark ? '#b4bfb2' : '#647260'}; font-size:12px; }
        header h1 { font-size:26px; line-height:1.4; margin:8px 0 0; overflow-wrap:anywhere; }
        article { margin:0 0 30px; } .role { font-size:12px; font-weight:700; color:${dark ? '#91c3aa' : '#356e53'}; margin-bottom:10px; }
        .message { overflow-wrap:anywhere; } .message > :first-child { margin-top:0 }
        p,ul,ol,blockquote,pre,table,figure { margin:12px 0; } ul,ol { padding-left:26px }
        h1,h2,h3,h4,h5,h6 { line-height:1.45; margin:24px 0 12px; } h1 { font-size:25px } h2 { font-size:22px } h3 { font-size:19px }
        pre { white-space:pre-wrap; overflow-wrap:anywhere; padding:16px; border-radius:8px; background:${dark ? '#151816' : '#eef2ec'}; font-size:13px; line-height:1.6; }
        code { font-family:ui-monospace,Consolas,monospace; } table { border-collapse:collapse; width:100%; table-layout:fixed; font-size:14px; }
        th,td { border:1px solid ${dark ? '#485044' : '#d2dacc'}; padding:9px; vertical-align:top; } th { text-align:left; background:${dark ? '#30372e' : '#eef2ec'}; }
        blockquote { border-left:3px solid #91ab8a; padding-left:16px; margin-left:0; }
        a { color:${dark ? '#aacdb6' : '#356e53'}; text-decoration:underline; } img { display:block; max-width:100%; height:auto; border-radius:8px; }
        .missing-image { border:1px dashed #9aa793; padding:12px; font-size:13px; }
        .katex-display { margin:18px 0; overflow-wrap:normal; } .katex { white-space:nowrap; }
        footer { border-top:1px solid ${dark ? '#444b43' : '#dce2da'}; padding-top:16px; }
        </style></head><body><main id="export-image"><header><small>ChatGPT Helper</small><h1>${escape(title)}</h1></header>
        ${messages.map(message => `<article><div class="role">${escape(message.role === 'user' ? userLabel : 'ChatGPT')}</div><div class="message">${message.html || escape(message.content).replace(/\n/g, '<br>')}</div></article>`).join('')}
        <footer>ChatGPT Helper · ${messages.length} ${userLabel === '你' ? '条消息' : 'messages'}</footer></main></body></html>`;
}

function checkCancelled(signal: AbortSignal) { if (signal.aborted) throw new DOMException('Cancelled', 'AbortError'); }
export async function prepareImageFrame(frame: HTMLIFrameElement, html: string, signal: AbortSignal): Promise<number> {
    checkCancelled(signal);
    await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => finish(new Error('Image preview timed out')), 10000);
        const cancel = () => finish(new DOMException('Cancelled', 'AbortError'));
        const loaded = () => finish();
        function finish(error?: Error) {
            clearTimeout(timeout); frame.removeEventListener('load', loaded); signal.removeEventListener('abort', cancel);
            if (error) reject(error); else resolve();
        }
        frame.addEventListener('load', loaded, { once: true }); signal.addEventListener('abort', cancel, { once: true });
        frame.srcdoc = html;
    });
    checkCancelled(signal);
    const doc = frame.contentDocument;
    if (!doc?.getElementById('export-image')) throw new Error('Image preview unavailable');
    const settle = (promise: Promise<any>) => Promise.race([promise, new Promise(resolve => setTimeout(resolve, 6000))]);
    await settle(doc.fonts.ready);
    let missing = 0;
    await Promise.all(Array.from(doc.images).map(async image => {
        // Make an explicit placeholder for inaccessible assets, never silently omit them.
        const src = image.getAttribute('src');
        image.crossOrigin = 'anonymous';
        if (src) image.src = src;
        await settle(image.decode().catch(() => {}));
        checkCancelled(signal);
        let usable = image.complete && image.naturalWidth > 0;
        if (usable && !image.src.startsWith('data:')) {
            try {
                const canvas = doc.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0); image.src = canvas.toDataURL('image/png');
                canvas.width = canvas.height = 0; await image.decode();
            } catch { usable = false; }
        }
        if (!usable) {
            missing++;
            const note = doc.createElement('p'); note.className = 'missing-image';
            note.textContent = `[${image.alt || 'Image unavailable'}]`; image.replaceWith(note);
        }
    }));
    checkCancelled(signal);
    return missing;
}

// Prefer block boundaries, and only cut a block when it alone is taller than a page.
export function getImageSlices(root: HTMLElement, maxHeight: number) {
    const height = Math.ceil(root.getBoundingClientRect().height);
    const origin = root.getBoundingClientRect().top;
    const boundaries = Array.from(root.querySelectorAll('article, p, pre, table, li, h1, h2, h3, .katex-display'))
        .map(node => Math.ceil(node.getBoundingClientRect().bottom - origin + 8)).filter(value => value > 0).sort((a,b) => a-b);
    const slices: { top: number; height: number }[] = [];
    for (let top = 0; top < height;) {
        let end = Math.min(height, top + maxHeight);
        if (end < height) {
            const candidate = boundaries.filter(value => value > top + maxHeight * .55 && value <= end).pop();
            if (candidate) end = candidate;
        }
        slices.push({ top, height: end - top }); top = end;
    }
    return slices;
}

export async function saveMessageImage(frame: HTMLIFrameElement, title: string, options: ImageOptions, filenameFormat: string, signal: AbortSignal, progress: (done: number, total: number) => void, output: { language: string; zip(): Promise<any>; save(filename: string, blob: Blob): void }) {
    checkCancelled(signal);
    const root = frame.contentDocument?.getElementById('export-image');
    if (!root) throw new Error('Image preview unavailable');
    const height = Math.ceil(root.getBoundingClientRect().height);
    const maxHeight = Math.min(16000 / options.scale, Math.floor(16000000 / (options.width * options.scale ** 2)));
    if (!options.paged && height > maxHeight) throw new Error(output.language.startsWith('zh') ? '图片过长，请选择分页或降低清晰度。' : 'Image is too long. Choose pages or standard resolution.');
    const slices = getImageSlices(root, options.paged ? Math.min(2400, maxHeight) : height);
    const ZIP = slices.length > 1 ? await output.zip() : null;
    const zip = ZIP ? new ZIP() : null;
    for (let index = 0; index < slices.length; index++) {
        checkCancelled(signal);
        progress(index, slices.length);
        const slice = slices[index];
        const doc = root.ownerDocument;
        const copy = root.cloneNode(true) as HTMLElement;
        const style = doc.createElement('style');
        style.textContent = doc.head.querySelector('style').textContent;
        copy.prepend(style);
        const bodyStyle = doc.defaultView.getComputedStyle(doc.body);
        copy.style.font = bodyStyle.font;
        copy.style.color = bodyStyle.color;
        copy.style.backgroundColor = bodyStyle.backgroundColor;
        const serialized = new XMLSerializer().serializeToString(copy);
        // All styles, fonts and images are embedded; Chrome paints the same preview
        // in an SVG viewport. Each viewport is bounded before allocating its canvas.
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width * options.scale}" height="${slice.height * options.scale}" viewBox="0 0 ${options.width} ${slice.height}"><foreignObject x="0" y="-${slice.top}" width="${options.width}" height="${height}">${serialized}</foreignObject></svg>`;
        const image = new Image();
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        await image.decode();
        checkCancelled(signal);
        const canvas = doc.createElement('canvas');
        canvas.width = options.width * options.scale;
        canvas.height = slice.height * options.scale;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Image canvas unavailable');
        context.drawImage(image, 0, 0);
        try {
            checkCancelled(signal);
            const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Image encoding failed')), `image/${options.format}`, .94));
            checkCancelled(signal);
            const filename = getFileNameWithFormat(filenameFormat, options.format === 'jpeg' ? 'jpg' : 'png', { title });
            if (zip) zip.file(`${String(index + 1).padStart(3, '0')}-${filename}`, blob);
            else output.save(filename, blob);
        } finally { canvas.width = 0; canvas.height = 0; }
        progress(index + 1, slices.length);
    }
    if (zip) {
        const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE' });
        checkCancelled(signal);
        output.save(getFileNameWithFormat(filenameFormat, 'zip', { title }), blob);
    }
    return slices.length;
}
