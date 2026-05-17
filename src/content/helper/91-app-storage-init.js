// Chrome Extension Content Script - ChatGPT Helper App Storage And Init
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
        createDefaultPrompts,
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
        ThemeAssetRepository,
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


    if (!ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Storage And Init module');
        return;
    }
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

    Object.assign(ChatGPTHelper.prototype, {
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
                panelWidth: Math.max(200, Math.min(600, parseInt(saved.panelWidth) || DEFAULT_SETTINGS.panelWidth)),
                defaultPanelState: saved.defaultPanelState !== undefined
                    ? Boolean(saved.defaultPanelState)
                    : DEFAULT_SETTINGS.defaultPanelState,
                preventAutoScroll: Boolean(saved.preventAutoScroll),
                prompts: { enabled: true },
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

        init() {
            try {
                console.log('[ChatGPT Helper] 开始初始化...');
                try {
                    this.createStyles();
                } catch (e) {
                    console.error('[ChatGPT Helper] createStyles 错误:', e);
                }
                
                try {
                    this.createLayout();
                } catch (e) {
                    console.error('[ChatGPT Helper] createLayout 错误:', e);
                }

                // 确保面板创建后再创建 UI
                setTimeout(() => {
                    try {
                        if (this.panel) {
                            try {
                                this.initializeThemeSystem().catch((e) => {
                                    console.error('[ChatGPT Helper] initializeThemeSystem 错误:', e);
                                });
                            } catch (e) {
                                console.error('[ChatGPT Helper] initializeThemeSystem 调用错误:', e);
                            }

                            try {
                                this.createUI();
                            } catch (e) {
                                console.error('[ChatGPT Helper] createUI 错误:', e);
                            }
                            
                            try {
                                this.createCollapsedButtons();
                            } catch (e) {
                                console.error('[ChatGPT Helper] createCollapsedButtons 错误:', e);
                            }
                            
                            try {
                                this.bindEvents();
                            } catch (e) {
                                console.error('[ChatGPT Helper] bindEvents 错误:', e);
                            }

                            // 启动主题监听
                            try {
                                this.monitorTheme();
                            } catch (e) {
                                console.error('[ChatGPT Helper] monitorTheme 错误:', e);
                            }

                            // 阶段1：启动阅读历史记录
                            try {
                                if (this.settings.readingHistory?.persistence) {
                                    this.readingProgressManager.startRecording();
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] startRecording 错误:', e);
                            }

                            // 阶段1：尝试恢复阅读位置
                            try {
                                if (this.settings.readingHistory?.autoRestore) {
                                    setTimeout(() => {
                                        try {
                                            this.readingProgressManager.restoreProgress().then((success) => {
                                                if (success && this.readingProgressManager.restoredTop !== null) {
                                                    this.anchorManager.setAnchor(this.readingProgressManager.restoredTop);
                                                }
                                            }).catch((e) => {
                                                console.error('[ChatGPT Helper] restoreProgress 错误:', e);
                                            });
                                        } catch (e) {
                                            console.error('[ChatGPT Helper] restoreProgress 设置错误:', e);
                                        }
                                    }, 1000);
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] 恢复阅读位置错误:', e);
                            }

                            // 阶段1：清理过期历史
                            try {
                                this.readingProgressManager.cleanup();
                            } catch (e) {
                                console.error('[ChatGPT Helper] cleanup 错误:', e);
                            }

                            // 初始化宽度样式管理器
                            try {
                                if (!this.widthStyleManager) {
                                    this.widthStyleManager = new WidthStyleManager(this.adapter, this.settings.pageWidth);
                                    this.widthStyleManager.apply();
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] WidthStyleManager 错误:', e);
                            }

                            // 阶段3：初始化复制功能
                            try {
                                if (this.settings.formulaCopy?.enabled !== false || this.settings.tableCopy?.enabled !== false) {
                                    this.copyManager.init();
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] copyManager.init 错误:', e);
                            }

                            // 阶段4：启动标签页管理器
                            try {
                                if (this.settings.tabSettings?.enabled !== false) {
                                    this.tabRenameManager.start();
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] tabRenameManager.start 错误:', e);
                            }

                            // 初始化滚动锁定管理器
                            try {
                                if (!this.scrollLockManager) {
                                    this.scrollLockManager = new ScrollLockManager(this.adapter);
                                    // 根据设置决定是否启用防止自动滚动
                                    // 显式设置状态，确保状态同步
                                    this.scrollLockManager.setEnabled(this.settings.preventAutoScroll || false);
                                } else {
                                    // 如果已经存在，也要同步状态
                                    this.scrollLockManager.setEnabled(this.settings.preventAutoScroll || false);
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] ScrollLockManager 错误:', e);
                            }

                            // 监听大纲自动刷新事件
                            try {
                                window.addEventListener('chatgpt-helper-outline-auto-refresh', () => {
                                    try {
                                        if (this.currentTab === 'outline') {
                                            this.refreshOutline();
                                        }
                                    } catch (e) {
                                        console.error('[ChatGPT Helper] refreshOutline 错误:', e);
                                    }
                                });
                            } catch (e) {
                                console.error('[ChatGPT Helper] 添加大纲刷新监听器错误:', e);
                            }

                            console.log('[ChatGPT Helper] 初始化完成');
                        } else {
                            console.error('[ChatGPT Helper] 面板未创建，重试...');
                            setTimeout(() => {
                                try {
                                    this.createLayout();
                                    if (this.panel) {
                                        try {
                                            this.initializeThemeSystem().catch((e3) => {
                                                console.error('[ChatGPT Helper] 重试 initializeThemeSystem 错误:', e3);
                                            });
                                        } catch (e3) {
                                            console.error('[ChatGPT Helper] 重试 initializeThemeSystem 调用错误:', e3);
                                        }

                                        try {
                                            this.createUI();
                                            this.createCollapsedButtons();
                                            this.bindEvents();
                                        } catch (e) {
                                            console.error('[ChatGPT Helper] 重试创建 UI 错误:', e);
                                        }
                                    }
                                } catch (e) {
                                    console.error('[ChatGPT Helper] 重试 createLayout 错误:', e);
                                }
                            }, 500);
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] init setTimeout 错误:', e);
                        console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                    }
                }, 100);
            } catch (e) {
                console.error('[ChatGPT Helper] 初始化错误:', e);
                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
            }
        }
    });
})();
