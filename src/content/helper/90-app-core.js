// Chrome Extension Content Script - ChatGPT Helper App Core
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
        ChatGPTAdapter
    } = H;

    // ==================== ChatGPT helper core ====================
    class ChatGPTHelper {
        constructor() {
            try {
                try {
                    this.adapter = new ChatGPTAdapter();
                } catch (e) {
                    console.error('[ChatGPT Helper] ChatGPTAdapter 创建错误:', e);
                    throw e; // 如果 adapter 创建失败，无法继续
                }
                
                try {
                    this.prompts = this.loadPrompts();
                } catch (e) {
                    console.error('[ChatGPT Helper] loadPrompts 错误:', e);
                    this.prompts = DEFAULT_PROMPTS; // 使用默认值
                }
                
                try {
                    this.settings = this.loadSettings();
                } catch (e) {
                    console.error('[ChatGPT Helper] loadSettings 错误:', e);
                    this.settings = DEFAULT_SETTINGS; // 使用默认值
                }
                
                this.isCollapsed = !this.settings.defaultPanelState;
                this.currentTab = this.settings.tabOrder && this.settings.tabOrder.length > 0
                    ? this.settings.tabOrder[0]
                    : 'prompts';
                this.selectedCategory = t('allCategory');
                this.searchQuery = '';
                this.selectedPrompt = null;
                this.savedAnchorTop = null; // 手动锚点位置
                this.hasAnchor = false; // 是否有阅读锚点
                this.panel = null;
                this.lang = detectLanguage();
                this.t = t; // 翻译函数

                // 阶段1：初始化管理器
                try {
                    this.scrollManager = new ScrollManager(this.adapter);
                } catch (e) {
                    console.error('[ChatGPT Helper] ScrollManager 创建错误:', e);
                    throw e; // 关键组件，失败则无法继续
                }
                
                try {
                    this.historyLoader = new HistoryLoader(this.scrollManager, (msg) => this.showToast(msg));
                } catch (e) {
                    console.error('[ChatGPT Helper] HistoryLoader 创建错误:', e);
                    this.historyLoader = null; // 非关键组件，允许为 null
                }
                
                try {
                    this.anchorManager = new AnchorManager(this.scrollManager, (msg) => this.showToast(msg));
                } catch (e) {
                    console.error('[ChatGPT Helper] AnchorManager 创建错误:', e);
                    this.anchorManager = null; // 非关键组件，允许为 null
                }
                
                try {
                    this.readingProgressManager = new ReadingProgressManager(
                        this.settings,
                        this.scrollManager,
                        this.adapter,
                        (msg) => this.showToast(msg)
                    );
                } catch (e) {
                    console.error('[ChatGPT Helper] ReadingProgressManager 创建错误:', e);
                    this.readingProgressManager = null; // 非关键组件，允许为 null
                }

                // 绑定锚点UI更新回调
                try {
                    if (this.anchorManager) {
                        this.anchorManager.bindUI((hasAnchor) => {
                            this.hasAnchor = hasAnchor;
                            if (this.updateAnchorButton) {
                                this.updateAnchorButton();
                            }
                        });
                    }
                } catch (e) {
                    console.error('[ChatGPT Helper] 绑定锚点UI回调错误:', e);
                }

                // 阶段2：初始化大纲管理器
                this.outlineManager = null; // 延迟初始化，在renderOutline时创建

                // 阶段3：初始化复制管理器
                try {
                    this.copyManager = new CopyManager(this.settings, (msg) => this.showToast(msg));
                } catch (e) {
                    console.error('[ChatGPT Helper] CopyManager 创建错误:', e);
                    this.copyManager = null; // 非关键组件，允许为 null
                }

                // 阶段4：初始化标签页管理器
                try {
                    this.tabRenameManager = new TabRenameManager(this.adapter, this.settings, (msg) => this.showToast(msg));
                } catch (e) {
                    console.error('[ChatGPT Helper] TabRenameManager 创建错误:', e);
                    this.tabRenameManager = null; // 非关键组件，允许为 null
                }

                // 初始化主题监听器
                this.themeObserver = null;
                this.systemThemeMediaQuery = null;
                this.systemThemeListener = null;
                this.currentEffectiveTheme = 'light';
                this.themeAssetRepository = new ThemeAssetRepository();
                this.themeBackgroundObjectUrl = null;
                this.themeBackgroundObjectAssetId = null;
                this.themeModal = null;
                this.themeModalRefs = null;
                this.themeModalEscHandler = null;
                this.themeModalBackdropHandler = null;
                this.themeRuntimeStyleReady = false;
                this.themeHostRefreshQueued = false;
                this.beforeUnloadHandler = () => {
                    this.revokeThemeBackgroundObjectUrl();
                    this.stopSystemThemeListener();
                    this.closeThemeSettingsModal();
                };
                window.addEventListener('beforeunload', this.beforeUnloadHandler);

                try {
                    this.init();
                } catch (e) {
                    console.error('[ChatGPT Helper] init 调用错误:', e);
                    console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                }
            } catch (e) {
                console.error('[ChatGPT Helper] 构造函数严重错误:', e);
                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                // 即使出错，也尝试设置基本属性，避免后续代码报错
                this.panel = null;
                this.adapter = null;
                throw e; // 重新抛出，让调用者知道初始化失败
            }
        }
    }

    Object.assign(H, {
        ChatGPTHelper
    });
})();
