declare global {
    interface Window {
        GM_getValue?: <T = unknown>(key: string, defaultValue?: T) => T;
        GM_setValue?: (key: string, value: unknown) => void;
        GM_deleteValue?: (key: string) => void;
    }
}
// Uses the same extension-storage bridge as Helper. Legacy exporter:* keys remain
// readable; settings are never silently redirected into the host site's storage.
export class ScriptStorage {
    static get<T>(key: string): T | null {
        const stored = window.GM_getValue?.(key, null);
        if (stored == null) return null;
        if (typeof stored !== 'string') return stored as T;
        try { return JSON.parse(stored); } catch { return null; }
    }
    static set<T>(key: string, value: T) { window.GM_setValue?.(key, JSON.stringify(value)); }
    static delete(key: string) { window.GM_deleteValue?.(key); }
}
