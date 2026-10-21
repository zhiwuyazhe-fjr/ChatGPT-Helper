import { THEME_BACKGROUND_DB_NAME, THEME_BACKGROUND_DB_VERSION, THEME_BACKGROUND_STORE, createThemeAssetId } from './10-base.js';
// Chrome Extension Content Script - ChatGPT Helper Theme Assets


class ThemeAssetRepository {
    constructor() {
        this.dbPromise = null;
    }

    openDB() {
        if (this.dbPromise) return this.dbPromise;
        this.dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(THEME_BACKGROUND_DB_NAME, THEME_BACKGROUND_DB_VERSION);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(THEME_BACKGROUND_STORE)) {
                    db.createObjectStore(THEME_BACKGROUND_STORE, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => {
                const db = request.result;
                // Release old connections so an extension update cannot block another tab.
                db.onversionchange = () => { db.close(); this.dbPromise = null; };
                db.onclose = () => { this.dbPromise = null; };
                resolve(db);
            };
            request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));
        });
        this.dbPromise.catch(() => { this.dbPromise = null; });
        return this.dbPromise;
    }

    async transaction(mode, operation) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(THEME_BACKGROUND_STORE, mode);
            let result;
            tx.oncomplete = () => resolve(result);
            tx.onerror = () => reject(tx.error || new Error('Theme asset transaction failed'));
            tx.onabort = () => reject(tx.error || new Error('Theme asset transaction aborted'));
            try {
                const request = operation(tx.objectStore(THEME_BACKGROUND_STORE));
                request.onsuccess = () => { result = request.result; };
                request.onerror = () => reject(request.error || new Error('Theme asset request failed'));
            } catch (error) {
                tx.abort();
                reject(error);
            }
        });
    }

    async getAsset(id) {
        return id ? (await this.transaction('readonly', store => store.get(id))) || null : null;
    }

    async getAllAssets() {
        return (await this.transaction('readonly', store => store.getAll())) || [];
    }

    async putAsset(blob, mimeType, existingId = null) {
        const now = new Date().toISOString();
        const row = {
            id: existingId || createThemeAssetId(),
            mimeType: mimeType || blob.type,
            size: blob.size,
            blob,
            createdAt: now,
            updatedAt: now
        };
        // Request success is not durability: only tx.oncomplete permits saving its id.
        await this.transaction('readwrite', store => store.put(row));
        return row;
    }

    async deleteAsset(id) {
        if (id) await this.transaction('readwrite', store => store.delete(id));
    }
}

export { ThemeAssetRepository };
