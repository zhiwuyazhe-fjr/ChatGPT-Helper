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
    Object.assign(ChatGPTHelper.prototype, {
        loadPrompts() {
            const saved = window.GM_getValue(SETTING_KEYS.PROMPTS, null);
            return saved || createDefaultPrompts();
        },

        savePrompts() {
            window.GM_setValue(SETTING_KEYS.PROMPTS, this.prompts);
        },

        loadSettings() {
            const saved = window.GM_getValue(SETTING_KEYS.SETTINGS, null);
            const source = saved && typeof saved === 'object' ? saved : {};
            const settings = {
                ...DEFAULT_SETTINGS,
                ...source,
                prompts: { ...DEFAULT_SETTINGS.prompts, ...(source.prompts || {}) },
                outline: { ...DEFAULT_SETTINGS.outline, ...(source.outline || {}) },
                conversations: { ...DEFAULT_SETTINGS.conversations, ...(source.conversations || {}) },
                pageWidth: { ...DEFAULT_SETTINGS.pageWidth, ...(source.pageWidth || {}) },
                readingHistory: { ...DEFAULT_SETTINGS.readingHistory, ...(source.readingHistory || {}) },
                formulaCopy: { ...DEFAULT_SETTINGS.formulaCopy, ...(source.formulaCopy || {}) },
                tableCopy: { ...DEFAULT_SETTINGS.tableCopy, ...(source.tableCopy || {}) },
                tabSettings: { ...DEFAULT_SETTINGS.tabSettings, ...(source.tabSettings || {}) }
            };

            settings.themeConfig = normalizeThemeConfig(source.themeConfig, source.themeMode);
            settings.themeMode = null;

            if (!Array.isArray(settings.tabOrder)) {
                settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
            }

            if (!Array.isArray(settings.collapsedButtonsOrder)) {
                settings.collapsedButtonsOrder = DEFAULT_COLLAPSED_BUTTONS_ORDER.map((item) => ({ ...item }));
            } else {
                settings.collapsedButtonsOrder = settings.collapsedButtonsOrder
                    .filter((item) => item && COLLAPSED_BUTTON_DEFS[item.id])
                    .map((item) => ({
                        id: item.id,
                        enabled: item.enabled !== false
                    }));
                if (settings.collapsedButtonsOrder.length === 0) {
                    settings.collapsedButtonsOrder = DEFAULT_COLLAPSED_BUTTONS_ORDER.map((item) => ({ ...item }));
                }
            }

            // 确保 tabOrder 包含 export（兼容旧版本）
            if (settings.tabOrder && !settings.tabOrder.includes('export')) {
                settings.tabOrder.push('export');
            } else if (!settings.tabOrder) {
                settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
            }
            return settings;
        },

        saveSettings() {
            this.settings.themeConfig = normalizeThemeConfig(this.settings.themeConfig, this.settings.themeMode);
            window.GM_setValue(SETTING_KEYS.SETTINGS, this.settings);
        },

        async requestNotificationPermission() {
            // 如果使用 GM_notification，不需要权限
            if (typeof window.GM_notification !== 'undefined') {
                return true;
            }
            
            // 使用浏览器原生 Notification API
            if (typeof Notification === 'undefined') {
                console.warn('[ChatGPT Helper] Notification API 不可用');
                return false;
            }

            if (Notification.permission === 'granted') {
                return true;
            }

            if (Notification.permission === 'denied') {
                this.showToast(this.t('notificationPermissionDenied'));
                return false;
            }

            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    this.showToast(this.t('notificationPermissionGranted'));
                    return true;
                } else {
                    this.showToast(this.t('notificationPermissionRejected'));
                    return false;
                }
            } catch (err) {
                console.error('[ChatGPT Helper] 请求通知权限失败:', err);
                this.showToast(this.t('notificationPermissionFailed'));
                return false;
            }
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
