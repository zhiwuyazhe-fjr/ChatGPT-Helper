import { COLLAPSED_BUTTON_DEFS, DEFAULT_COLLAPSED_BUTTONS_ORDER, DEFAULT_SETTINGS, PANEL_WIDTH_MAX, PANEL_WIDTH_MIN, SETTING_KEYS, createDefaultPrompts, getExtensionRuntime, normalizeThemeConfig } from './10-base.js';
// Chrome Extension Content Script - ChatGPT Helper App Storage And Init



const MAIN_TAB_ORDER = ['prompts', 'outline', 'conversations', 'export'];
const FIXED_PAGE_WIDTH_CONFIG = { enabled: false, value: 1200, unit: 'px' };
const normalizeMainTabOrder = (value) => {
    const ordered = Array.isArray(value)
        ? value.filter(tabId => MAIN_TAB_ORDER.includes(tabId))
        : [];
    const unique = Array.from(new Set(ordered));
    return unique.length > 0 ? unique : [...MAIN_TAB_ORDER];
};
const normalizeCollapsedButtonsOrder = (value) => {
    const source = Array.isArray(value) ? value : [];
    const orderedIds = Array.from(new Set(source
        .map(item => item?.id)
        .filter(id => COLLAPSED_BUTTON_DEFS[id])));
    DEFAULT_COLLAPSED_BUTTONS_ORDER.forEach((item) => {
        if (!orderedIds.includes(item.id)) orderedIds.push(item.id);
    });
    return orderedIds.map(id => ({ id, enabled: true }));
};

export const StorageFeature = {
    loadPrompts() {
        const promptLibraryVersion = 3;
        const removedDefaultPromptIds = new Set(['default_1', 'default_2']);
        const saved = window.GM_getValue(SETTING_KEYS.PROMPTS, null);
        if (!Array.isArray(saved)) {
            window.GM_setValue(SETTING_KEYS.PROMPT_LIBRARY_VERSION, promptLibraryVersion);
            return createDefaultPrompts();
        }

        const savedVersion = Number(window.GM_getValue(SETTING_KEYS.PROMPT_LIBRARY_VERSION, 1)) || 1;
        if (savedVersion >= promptLibraryVersion) {
            return saved;
        }

        const retainedPrompts = saved.filter(prompt => !removedDefaultPromptIds.has(prompt?.id));
        const existingIds = new Set(retainedPrompts.map(prompt => prompt?.id).filter(Boolean));
        const missingDefaults = createDefaultPrompts().filter(prompt => prompt.id && !existingIds.has(prompt.id));
        const prompts = missingDefaults.length > 0 ? [...retainedPrompts, ...missingDefaults] : retainedPrompts;

        window.GM_setValue(SETTING_KEYS.PROMPT_LIBRARY_VERSION, promptLibraryVersion);
        if (missingDefaults.length > 0 || retainedPrompts.length !== saved.length) {
            window.GM_setValue(SETTING_KEYS.PROMPTS, prompts);
        }

        return prompts;
    },

    savePrompts() {
        window.GM_setValue(SETTING_KEYS.PROMPTS, this.prompts);
    },

    normalizeRuntimeSettings(source = {}) {
        const saved = source && typeof source === 'object' ? source : {};
        const settings = {
            ...DEFAULT_SETTINGS,
            // 与拖拽钳制共用常量（220-640）：不一致会导致拖宽后持久化值缩水、布局错位
            panelWidth: Math.max(PANEL_WIDTH_MIN, Math.min(PANEL_WIDTH_MAX, parseInt(saved.panelWidth) || DEFAULT_SETTINGS.panelWidth)),
            defaultPanelState: saved.defaultPanelState !== undefined
                ? Boolean(saved.defaultPanelState)
                : DEFAULT_SETTINGS.defaultPanelState,
            preventAutoScroll: Boolean(saved.preventAutoScroll),
            prompts: { enabled: true },
            promptSortMode: ['manual', 'recent', 'frequent'].includes(saved.promptSortMode)
                ? saved.promptSortMode
                : 'manual',
            promptQuickMenuEnabled: saved.promptQuickMenuEnabled !== false,
            outline: {
                enabled: true,
                showUserQueries: saved.outline?.showUserQueries !== false,
                autoUpdate: true,
                syncScroll: saved.outline?.syncScroll !== false,
                updateInterval: 2,
                maxLevel: 6
            },
            conversations: { enabled: true },
            pageWidth: { ...FIXED_PAGE_WIDTH_CONFIG },
            tabOrder: normalizeMainTabOrder(saved.tabOrder),
            collapsedButtonsOrder: normalizeCollapsedButtonsOrder(saved.collapsedButtonsOrder),
            anchorEnabled: true,
            themeEnabled: true,
            manualAnchorEnabled: true,
            readingHistory: {
                persistence: saved.readingHistory?.persistence !== false,
                autoRestore: Boolean(saved.readingHistory?.autoRestore),
                cleanupDays: 30
            },
            formulaCopy: {
                enabled: saved.formulaCopy?.enabled !== false
            },
            tableCopy: {
                enabled: saved.tableCopy?.enabled !== false
            },
            tabSettings: {
                enabled: saved.tabSettings?.enabled !== false,
                showStatus: saved.tabSettings?.showStatus !== false,
                notificationSound: Boolean(saved.tabSettings?.notificationSound),
                notificationVolume: Math.max(0.1, Math.min(1, Number(saved.tabSettings?.notificationVolume) || 0.5)),
                titleFormat: saved.tabSettings?.titleFormat || '{status}{title}',
                privacyMode: Boolean(saved.tabSettings?.privacyMode),
                privacyTitle: saved.tabSettings?.privacyTitle || 'ChatGPT'
            }
        };

        settings.themeConfig = normalizeThemeConfig(saved.themeConfig, saved.themeMode);
        settings.themeMode = null;
        return settings;
    },

    serializeSettingsForStorage(settings = this.settings) {
        const normalized = this.normalizeRuntimeSettings(settings || {});
        return {
            panelWidth: normalized.panelWidth,
            defaultPanelState: normalized.defaultPanelState,
            prompts: { enabled: true },
            outline: {
                enabled: true,
                showUserQueries: normalized.outline.showUserQueries,
                syncScroll: normalized.outline.syncScroll
            },
            conversations: { enabled: true },
            tabOrder: [...normalized.tabOrder],
            collapsedButtonsOrder: normalized.collapsedButtonsOrder.map((item) => ({ ...item, enabled: true })),
            themeMode: null,
            themeConfig: normalized.themeConfig,
            anchorEnabled: true,
            themeEnabled: true,
            manualAnchorEnabled: true,
            preventAutoScroll: normalized.preventAutoScroll,
            promptSortMode: normalized.promptSortMode,
            promptQuickMenuEnabled: normalized.promptQuickMenuEnabled,
            readingHistory: {
                persistence: normalized.readingHistory.persistence,
                autoRestore: normalized.readingHistory.autoRestore
            },
            formulaCopy: {
                enabled: normalized.formulaCopy.enabled
            },
            tableCopy: {
                enabled: normalized.tableCopy.enabled
            },
            tabSettings: {
                enabled: normalized.tabSettings.enabled,
                showStatus: normalized.tabSettings.showStatus,
                notificationSound: normalized.tabSettings.notificationSound,
                notificationVolume: normalized.tabSettings.notificationVolume,
                titleFormat: normalized.tabSettings.titleFormat,
                privacyMode: normalized.tabSettings.privacyMode,
                privacyTitle: normalized.tabSettings.privacyTitle
            }
        };
    },

    loadSettings() {
        const saved = window.GM_getValue(SETTING_KEYS.SETTINGS, null);
        return this.normalizeRuntimeSettings(saved);
    },

    saveSettings() {
        const normalized = this.normalizeRuntimeSettings(this.settings);
        Object.keys(this.settings).forEach((key) => delete this.settings[key]);
        Object.assign(this.settings, normalized);
        window.GM_setValue(SETTING_KEYS.SETTINGS, this.serializeSettingsForStorage(this.settings));
    },

    async init() {
        this.createStyles();
        this.createLayout();
        if (!this.panel) throw new Error('Helper panel could not be mounted');
        this.createUI();
        this.createCollapsedButtons();
        this.bindEvents();
        await this.runFeature('theme', () => this.initializeThemeSystem());
        if (this.destroyed) return;
        this.monitorTheme();
        this.runFeature('reading history', () => {
            this.readingProgressManager.startRecording();
            this.readingProgressManager.cleanup();
            if (this.settings.readingHistory?.autoRestore) {
                this.scope.schedule('restore-reading', () => {
                    this.runFeature('restore reading', async () => {
                        const restored = await this.readingProgressManager.restoreProgress();
                        if (restored) this.anchorManager.setAnchor(this.readingProgressManager.restoredTop);
                    });
                }, 500);
            }
        });
        this.runFeature('page width', () => this.widthStyleManager.apply());
        this.runFeature('copy', () => this.copyManager.init());
        if (this.settings.tabSettings?.enabled !== false) this.runFeature('tab status', () => this.tabRenameManager.start());
        if (this.settings.promptQuickMenuEnabled !== false) this.promptQuickMenu.start();
        this.runFeature('message selection', () => this.messageSelectManager.start());
        this.scrollLockManager.setEnabled(Boolean(this.settings.preventAutoScroll));
        const runtime = getExtensionRuntime();
        if (runtime?.onMessage?.addListener) {
            this.panelMessageHandler = message => {
                if (message?.type === 'ch-helper-toggle-panel') this.toggleCollapse();
            };
            runtime.onMessage.addListener(this.panelMessageHandler);
        }
        this.scope.listen(window, 'chatgpt-helper-outline-auto-refresh', () => {
            if (this.currentTab === 'outline') this.refreshOutline();
        });
        this.runFeature('onboarding', () => this.maybeShowOnboarding());
    }
};
