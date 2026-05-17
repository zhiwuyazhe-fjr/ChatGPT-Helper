declare global {
    interface Window {
        GM_getValue?: <T = unknown>(key: string, defaultValue?: T) => T
        GM_setValue?: (key: string, value: unknown) => void
        GM_deleteValue?: (key: string) => void
    }
}

/**
 * Greasemonkey storage API
 * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
 * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
 */
export class GMStorage {
    static supported = typeof window.GM_getValue === 'function' && typeof window.GM_setValue === 'function'

    static get<T>(key: string): T | null {
        const item = window.GM_getValue?.<string>(key, '')
        if (item) {
            try {
                return JSON.parse(item)
            }
            catch {
                return null
            }
        }
        return null
    }

    static set<T>(key: string, value: T): void {
        const item = JSON.stringify(value)
        window.GM_setValue?.(key, item)
    }

    static delete(key: string): void {
        window.GM_deleteValue?.(key)
    }
}

export class LocalStorage {
    static supported = typeof localStorage === 'object'

    static get<T>(key: string): T | null {
        const item = localStorage.getItem(key)
        if (item) {
            try {
                return JSON.parse(item)
            }
            catch {
                return null
            }
        }
        return null
    }

    static set<T>(key: string, value: T): void {
        const item = JSON.stringify(value)
        localStorage.setItem(key, item)
    }

    static delete(key: string): void {
        localStorage.removeItem(key)
    }
}

export class MemoryStorage {
    private static map = new Map<string, any>()

    static supported = true

    static get<T>(key: string): T | null {
        const item = this.map.get(key)
        if (!item) return null
        return item
    }

    static set<T>(key: string, value: T): void {
        this.map.set(key, value)
    }

    static delete(key: string): void {
        this.map.delete(key)
    }
}

export class ScriptStorage {
    static get<T>(key: string): T | null {
        if (GMStorage.supported) {
            try {
                return GMStorage.get<T>(key)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        if (LocalStorage.supported) {
            try {
                return LocalStorage.get<T>(key)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        return MemoryStorage.get<T>(key)
    }

    static set<T>(key: string, value: T): void {
        if (GMStorage.supported) {
            try {
                return GMStorage.set<T>(key, value)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        if (LocalStorage.supported) {
            try {
                return LocalStorage.set<T>(key, value)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        return MemoryStorage.set<T>(key, value)
    }

    static delete(key: string): void {
        if (GMStorage.supported) {
            try {
                return GMStorage.delete(key)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        if (LocalStorage.supported) {
            try {
                return LocalStorage.delete(key)
            }
            catch {
                // ignore, fallback to next storage
            }
        }

        return MemoryStorage.delete(key)
    }
}
