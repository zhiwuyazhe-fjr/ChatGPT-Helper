// Chrome Extension Content Script - ChatGPT Helper Theme Assets
(function () {
    'use strict';

    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    const {
        SETTING_KEYS,
        I18N,
        detectLanguage,
        t,
        getCurrentLang,
        setCurrentLang,
        TAB_DEFINITIONS,
        COLLAPSED_BUTTON_DEFS,
        DEFAULT_COLLAPSED_BUTTONS_ORDER,
        THEME_PRESETS,
        THEME_PRESET_MAP,
        THEME_PRESET_INLINE_VAR_KEYS,
        THEME_BACKGROUND_DB_NAME,
        THEME_BACKGROUND_DB_VERSION,
        THEME_BACKGROUND_STORE,
        THEME_BACKGROUND_MAX_SIZE,
        THEME_BACKGROUND_ALLOWED_TYPES,
        FEATURE_REQUEST_URL,
        ISSUE_URL,
        REPO_URL,
        AUTHOR_GITHUB_URL,
        THEME_HOST_ATTRS,
        DEFAULT_THEME_CONFIG,
        DEFAULT_SETTINGS,
        DEFAULT_PROMPTS,
        createElement,
        getExtensionRuntime,
        getExtensionAssetUrl,
        getExtensionManifestMeta,
        openExternalLink,
        copyTextToClipboard,
        createHelperLogoNode,
        SVG_ICON_DEFS,
        createSvgIconNode,
        setButtonIcon,
        createCollapsedButtonIconNode,
        clearElement,
        clampNumber,
        normalizeHexColor,
        hexToRgb,
        blendRgbColors,
        rgbaFromColor,
        buildLinearGradient,
        createThemeAssetId,
        getThemePresetByKey,
        withProductivitySurfaceVars,
        buildThemeSurfaceVars,
        normalizeThemeConfig,
        ConversationManager,
        ScrollManager,
        HistoryLoader,
        AnchorManager,
        ReadingProgressManager,
        ScrollLockManager,
        WidthStyleManager,
        OutlineManager,
        CopyManager,
        TabRenameManager,
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;

    class ThemeAssetRepository {
        constructor() {
            this.dbPromise = null;
        }

        openDB() {
            if (this.dbPromise) return this.dbPromise;
            this.dbPromise = new Promise((resolve, reject) => {
                try {
                    const request = indexedDB.open(THEME_BACKGROUND_DB_NAME, THEME_BACKGROUND_DB_VERSION);
                    request.onupgradeneeded = () => {
                        const db = request.result;
                        if (!db.objectStoreNames.contains(THEME_BACKGROUND_STORE)) {
                            db.createObjectStore(THEME_BACKGROUND_STORE, { keyPath: 'id' });
                        }
                    };
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));
                } catch (error) {
                    reject(error);
                }
            });
            return this.dbPromise;
        }

        async getAsset(id) {
            if (!id) return null;
            const db = await this.openDB();
            return await new Promise((resolve, reject) => {
                try {
                    const tx = db.transaction(THEME_BACKGROUND_STORE, 'readonly');
                    const store = tx.objectStore(THEME_BACKGROUND_STORE);
                    const req = store.get(id);
                    req.onsuccess = () => resolve(req.result || null);
                    req.onerror = () => reject(req.error || new Error('get asset failed'));
                } catch (error) {
                    reject(error);
                }
            });
        }

        async putAsset(blob, mimeType) {
            const db = await this.openDB();
            const id = createThemeAssetId();
            const now = new Date().toISOString();
            const row = {
                id,
                mimeType: mimeType || blob.type,
                size: blob.size,
                blob,
                createdAt: now,
                updatedAt: now
            };
            await new Promise((resolve, reject) => {
                try {
                    const tx = db.transaction(THEME_BACKGROUND_STORE, 'readwrite');
                    const store = tx.objectStore(THEME_BACKGROUND_STORE);
                    const req = store.put(row);
                    req.onsuccess = () => resolve();
                    req.onerror = () => reject(req.error || new Error('put asset failed'));
                } catch (error) {
                    reject(error);
                }
            });
            return row;
        }

        async deleteAsset(id) {
            if (!id) return;
            const db = await this.openDB();
            await new Promise((resolve, reject) => {
                try {
                    const tx = db.transaction(THEME_BACKGROUND_STORE, 'readwrite');
                    const store = tx.objectStore(THEME_BACKGROUND_STORE);
                    const req = store.delete(id);
                    req.onsuccess = () => resolve();
                    req.onerror = () => reject(req.error || new Error('delete asset failed'));
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
    Object.assign(H, {
        ThemeAssetRepository
    });
})();
