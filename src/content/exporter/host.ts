export interface MessageSnapshot {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    html: string;
    order: number;
}
export interface ExportHost {
    adapter: { getChatMessages(): Element[]; fetchBackendResponse(url: string, options?: RequestInit): Promise<Response> };
    getMessages(): MessageSnapshot[];
    getSelectedMessages(): MessageSnapshot[];
    subscribe(listener: () => void): () => void;
    getContext(): { path: string; title: string; language: string; theme: string };
    notify(message: string): void;
    loadDependency(name: 'zip'): Promise<any>;
}
let currentHost: ExportHost | null = null;
let portal: HTMLElement;
export function setExportHost(host: ExportHost | null, target?: HTMLElement) { currentHost = host; if (target) portal = target; }
export function getExportHost() { return currentHost; }
export function getExportPortal() { return portal; }
