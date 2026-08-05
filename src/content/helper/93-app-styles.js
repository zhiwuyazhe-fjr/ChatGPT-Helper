// Chrome Extension Content Script - ChatGPT Helper App Styles
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
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;


    if (!ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Styles module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        createStyles() {
            try {
                const existingStyle = document.getElementById('chatgpt-helper-styles');
                if (existingStyle) {
                    try {
                        existingStyle.remove();
                    } catch (e) {
                        console.error('[ChatGPT Helper] 移除旧样式错误:', e);
                    }
                }

                // 默认主题色（实际运行时会由主题预设动态覆盖）
                const colors = {
                    primary: '#64748b',
                    secondary: '#94a3b8',
                    accent: '#475569',
                    light: '#f8fafc',
                };
                const gradient = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
                const fallbackFontFamily = 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
                const pageFontFamily = (() => {
                    try {
                        const source = document.body || document.documentElement;
                        const computedFont = source ? getComputedStyle(source).fontFamily : '';
                        const fontFamily = typeof computedFont === 'string' ? computedFont.trim() : '';
                        return fontFamily && !/[;{}]/.test(fontFamily) ? fontFamily : fallbackFontFamily;
                    } catch (e) {
                        return fallbackFontFamily;
                    }
                })();
                document.documentElement.style.setProperty('--gh-font-family', pageFontFamily);

                const style = document.createElement('style');
                style.id = 'chatgpt-helper-styles';
                style.textContent = `
                /* CSS Variables */
                :root {
                    --gh-font-family: ${pageFontFamily};
                    --gh-bg: #f9f9f9;
                    --gh-bg-secondary: #f3f3f3;
                    --gh-text: #0d0d0d;
                    --gh-text-secondary: rgba(13, 13, 13, 0.64);
                    --gh-border: rgba(0, 0, 0, 0.10);
                    --gh-hover: #ececec;
                    --gh-shadow: 0 0 0 0 rgba(0,0,0,0);
                    --gh-input-bg: #ffffff;
                    --gh-input-border: rgba(0, 0, 0, 0.10);
                    --gh-active-bg: #ececec;
                    --gh-danger: #ef4444;
                    --gh-gradient: ${gradient};
                    --gh-header-bg: ${gradient};
                    --gh-primary: ${colors.primary};
                    --gh-primary-hover: ${colors.accent};
                    --gh-tag-active-bg: ${colors.primary};
                    --gh-success: #10b981;
                    --gh-warning: #f59e0b;
                    --gh-folder-bg-default: #e0f2fe;
                    --gh-folder-bg-expanded: #c7d2fe;
                    --gh-border-active: #6366f1;
                    --gh-checkbox-bg: #4f46e5;
                    --gh-theme-primary: ${colors.primary};
                    --gh-theme-secondary: ${colors.secondary};
                    --gh-theme-accent: ${colors.accent};
                    --gh-theme-accent-dark: ${colors.accent};
                    --gh-theme-light: ${colors.light};
                    /* Outline Highlight Colors (Light Mode) */
                    --gh-outline-locate-bg: rgba(16, 185, 129, 0.25);
                    --gh-outline-locate-border: #10b981;
                    --gh-outline-locate-shadow: rgba(16, 185, 129, 0.5);
                    --gh-outline-sync-bg: rgba(52, 211, 153, 0.10);
                    --gh-outline-sync-border: #34d399;
                    /* Folder Preset Colors */
                    --gh-folder-bg-1: #fdf2f8;
                    --gh-folder-bg-2: #eff6ff;
                    --gh-folder-bg-3: #ecfdf5;
                    --gh-folder-bg-4: #faf5ff;
                    --gh-folder-bg-5: #fefce8;
                    --gh-folder-bg-6: #ecfeff;
                    --gh-folder-bg-7: #fdf4ff;
                }

                :root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {
                    --gh-bg: #202123;
                    --gh-bg-secondary: #171717;
                    --gh-text: #ececf1;
                    --gh-text-secondary: rgba(236, 236, 241, 0.72);
                    --gh-border: rgba(255, 255, 255, 0.12);
                    --gh-hover: #2a2b2d;
                    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    --gh-input-bg: #2a2b2d;
                    --gh-input-border: rgba(255, 255, 255, 0.12);
                    --gh-active-bg: #343541;
                    --gh-header-bg: linear-gradient(180deg, #202123 0%, #171717 100%);
                    --gh-tag-active-bg: rgba(255, 255, 255, 0.1);
                    --gh-primary-hover: var(--gh-theme-accent-dark, #2563eb);
                }

                /* 移除 @media (prefers-color-scheme: dark) 自动应用，只通过 body[data-gh-mode="dark"] 控制 */
                /* 三栏布局容器 */
                #chatgpt-helper-layout {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    position: relative;
                }

                /* 左栏：ChatGPT 侧边栏 */
                #chatgpt-helper-left {
                    flex-shrink: 0;
                    transition: width 0.3s ease;
                }

                /* 中栏：对话区域 */
                #chatgpt-helper-center {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    transition: margin-right 0.3s ease;
                }

                /* 右栏：核心功能区 */
                #chatgpt-helper-right {
                    position: fixed;
                    right: 0;
                    top: 0;
                    width: ${this.settings.panelWidth}px;
                    height: 100vh;
                    background: var(--gh-bg, #ffffff);
                    border-left: none;
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.12), -2px 0 8px rgba(0, 0, 0, 0.06);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
                    overflow: hidden;
                    isolation: isolate;
                    font-family: var(--gh-font-family, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
                    border-radius: 0;
                }
                
                /* 拖拽改变宽度时：禁用 transition，避免“动画追赶鼠标”造成卡顿 */
                #chatgpt-helper-right.gh-resizing {
                    transition: none !important;
                    will-change: width;
                }
                
                /* 拖拽时同时禁用主区域 margin-right 的过渡，提升跟手性 */
                body.gh-resizing main,
                body.gh-resizing [role="main"],
                body.gh-resizing #chatgpt-helper-center {
                    transition: none !important;
                }

                /* 右栏宽度拖拽条（稍微偏内侧，方便拖拽） */
                #chatgpt-helper-resize-handle {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 10px;
                    height: 100%;
                    cursor: col-resize;
                    z-index: 10000;
                    background: transparent;
                }

                #chatgpt-helper-resize-handle::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: var(--gh-border, #e5e7eb);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-resize-handle::after {
                    background: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-right {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-content {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-tabs {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] .chatgpt-helper-search-bar {
                    background: var(--gh-bg-secondary, #f9fafb) !important;
                }
                
                body[data-gh-mode="light"] .chatgpt-helper-categories {
                    background: var(--gh-bg, #ffffff) !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-right,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-categories {
                    background: var(--gh-panel-surface) !important;
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-bg, #1e293b);
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.4), -2px 0 8px rgba(0, 0, 0, 0.2);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    background: var(--gh-header-bg) !important;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-tabs {
                    background: var(--gh-bg, #1e293b);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab {
                    color: var(--gh-text-secondary, #cbd5e1);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-hover, #334155);
                    color: var(--gh-text, #f1f5f9);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    color: var(--gh-text, #f1f5f9);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-bg, #1e293b);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-search-bar {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-categories {
                    background: var(--gh-bg, #1e293b);
                    border-bottom-color: var(--gh-border, #475569);
                }

                #chatgpt-helper-right.collapsed {
                    transform: translateX(100%);
                    width: 0 !important;
                }

                /* 折叠按钮已移除，只保留侧边栏按钮 */

                /* 面板头部 - 渐变背景 */
                #chatgpt-helper-header {
                    /* 允许根据面板宽度动态调整（通过 JS 设置 CSS 变量） */
                    padding: var(--gh-header-padding-v, 12px) var(--gh-header-padding-h, 14px);
                    background: var(--gh-header-bg);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    user-select: none;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
                    border-radius: 0;
                    min-width: 0; /* 允许内部元素正确收缩，避免被挤出裁剪 */
                }

                #chatgpt-helper-title {
                    font-size: 15px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    flex: 1 1 auto; /* 让标题在窄宽时让位给右侧按钮 */
                    min-width: 0;
                }
                
                #chatgpt-helper-title span:last-child {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                #chatgpt-helper-controls {
                    display: flex;
                    gap: var(--gh-header-controls-gap, 4px);
                    align-items: center;
                    flex-shrink: 0; /* 按钮优先保留可见性 */
                }
                
                /* 窄宽紧凑模式：隐藏标题文字 + 缩小按钮/间距，避免按钮被挤出右侧不可见 */
                #chatgpt-helper-header.gh-compact {
                    --gh-header-padding-v: 10px;
                    --gh-header-padding-h: 10px;
                    --gh-header-controls-gap: 2px;
                    --gh-header-btn-size: 24px;
                    --gh-header-btn-font-size: 13px;
                    --gh-header-btn-radius: 6px;
                }
                
                #chatgpt-helper-header.gh-compact #chatgpt-helper-title span:last-child {
                    display: none;
                }

                .chatgpt-helper-header-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: var(--gh-header-btn-size, 28px);
                    height: var(--gh-header-btn-size, 28px);
                    border-radius: var(--gh-header-btn-radius, 6px);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    font-size: var(--gh-header-btn-font-size, 14px);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    min-width: var(--gh-header-btn-size, 28px);
                    padding: 0;
                }

                .chatgpt-helper-header-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.05);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                
                .chatgpt-helper-header-btn:active {
                    transform: scale(0.95);
                }

                /* Tab 导航 */
                #chatgpt-helper-tabs {
                    display: flex;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg, #ffffff);
                    flex-shrink: 0;
                    padding: 0 4px;
                    --tab-padding-h: 12px;
                    --tab-padding-v: 10px;
                    --tab-gap: 6px;
                    --tab-margin: 2px;
                }

                .chatgpt-helper-tab {
                    flex: 1;
                    padding: var(--tab-padding-v) var(--tab-padding-h);
                    text-align: center;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    font-size: 13px;
                    transition: all 0.2s ease;
                    border-bottom: 2px solid transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--tab-gap);
                    border-radius: 6px 6px 0 0;
                    margin: 0 var(--tab-margin);
                    min-width: 0; /* 允许flex项目收缩 */
                }

                .chatgpt-helper-tab:hover {
                    background: var(--gh-hover, #f3f4f6);
                    color: var(--gh-text, #1f2937);
                }

                .chatgpt-helper-tab.active {
                    color: var(--gh-text, #1f2937);
                    border-bottom-color: var(--gh-primary, #10a37f);
                    font-weight: 500;
                    background: var(--gh-bg, #ffffff);
                }

                .chatgpt-helper-tab-drag-handle {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: move;
                    user-select: none;
                    color: var(--gh-text-secondary, #6b7280);
                    font-size: 12px;
                    line-height: 1;
                    padding: 2px 4px;
                    margin-right: 4px;
                    opacity: 0.5;
                    transition: opacity 0.2s;
                    letter-spacing: 0;
                }

                .chatgpt-helper-tab:hover .chatgpt-helper-tab-drag-handle {
                    opacity: 1;
                }

                .chatgpt-helper-tab-drag-handle:hover {
                    opacity: 1;
                    color: var(--gh-primary, #10a37f);
                }

                .chatgpt-helper-tab.dragging {
                    opacity: 0.5;
                }

                .chatgpt-helper-tab.drag-before {
                    border-left: 2px solid var(--gh-primary, #10a37f);
                }

                .chatgpt-helper-tab.drag-after {
                    border-right: 2px solid var(--gh-primary, #10a37f);
                }

                /* 面板内容 */
                #chatgpt-helper-content {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 0;
                    background: var(--gh-bg);
                }

                .chatgpt-helper-content-panel {
                    display: none;
                    flex-direction: column;
                    height: 100%;
                }

                .chatgpt-helper-content-panel.active {
                    display: flex;
                }

                .chatgpt-helper-export-panel.active {
                    flex-direction: column;
                    overflow: hidden;
                }

                /* 搜索栏 */
                .chatgpt-helper-search-bar {
                    padding: 12px;
                    border-bottom: 1px solid var(--gh-border);
                    background: var(--gh-bg-secondary);
                }

                .chatgpt-helper-search-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.2s;
                    box-sizing: border-box;
                    background: var(--gh-input-bg);
                    color: var(--gh-text);
                }

                .chatgpt-helper-search-input:focus {
                    outline: none;
                    border-color: var(--gh-primary);
                }

                /* 分类标签 */
                .chatgpt-helper-categories {
                    padding: 8px 12px;
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                    background: var(--gh-bg);
                    border-bottom: 1px solid var(--gh-border);
                }

                .chatgpt-helper-category-tag {
                    padding: 4px 10px;
                    background: var(--gh-hover);
                    border-radius: 12px;
                    font-size: 12px;
                    color: #4b5563;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                    position: relative;
                    z-index: 1;
                    pointer-events: auto;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag {
                    color: var(--gh-text-secondary, #9ca3af);
                }

                .chatgpt-helper-category-tag:hover {
                    background: var(--gh-border);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {
                    background: var(--gh-hover, #1f2937);
                    color: var(--gh-text, #e5e5e5);
                }

                .chatgpt-helper-category-tag.active {
                    background: var(--gh-tag-active-bg);
                    color: white;
                    border-color: var(--gh-tag-active-bg);
                    z-index: 2;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {
                    background: var(--gh-tag-active-bg);
                    color: white;
                }

                /* 提示词列表 */
                .chatgpt-helper-prompt-list {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px;
                }

                /* 提示词项 */
                .chatgpt-helper-prompt-item {
                    background: var(--gh-bg);
                    border: 1px solid var(--gh-border);
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }

                .chatgpt-helper-prompt-item:hover {
                    border-color: var(--gh-primary);
                    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);
                    transform: translateY(-2px);
                }

                .chatgpt-helper-prompt-item.selected {
                    background: linear-gradient(135deg, #e6f7f3 0%, #f0fdf4 100%);
                    border-color: var(--gh-primary);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {
                    background: linear-gradient(135deg, rgba(16, 163, 127, 0.25) 0%, rgba(25, 195, 125, 0.15) 100%);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.3);
                }

                .chatgpt-helper-prompt-title {
                    font-weight: 500;
                    color: var(--gh-text, #1f2937);
                    margin-bottom: 4px;
                }

                .chatgpt-helper-prompt-content {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                /* 阶段2：大纲管理器样式 */
                .outline-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 200px;
                    user-select: none;
                    overflow: hidden;
                    overflow-x: hidden !important;
                }

                .outline-fixed-toolbar {
                    padding: 10px 12px;
                    background: var(--gh-bg-secondary);
                    border-bottom: 1px solid var(--gh-border);
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .outline-toolbar-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .outline-toolbar-btn {
                    width: 26px;
                    height: 26px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 6px;
                    background: var(--gh-bg);
                    color: var(--gh-text-secondary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .outline-toolbar-btn:hover {
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    background: var(--gh-hover);
                }

                .outline-toolbar-btn.active {
                    border-color: var(--gh-primary);
                    color: white;
                    background: var(--gh-primary);
                }

                .outline-search-wrapper {
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .outline-search-input {
                    flex: 1;
                    height: 28px;
                    padding: 0 10px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 6px;
                    font-size: 13px;
                    color: var(--gh-text);
                    outline: none;
                    transition: all 0.2s;
                    background: var(--gh-input-bg);
                }

                .outline-search-input:focus {
                    border-color: var(--gh-primary);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.1);
                }

                .outline-search-clear {
                    width: 16px;
                    height: 16px;
                    border: none;
                    background: var(--gh-input-border);
                    color: white;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 10px;
                    line-height: 16px;
                    text-align: center;
                    flex-shrink: 0;
                }

                .outline-search-clear:hover {
                    background: var(--gh-text-secondary);
                }

                .outline-search-clear.hidden {
                    display: none;
                }

                .outline-result-bar {
                    padding: 6px 12px;
                    background: #eff6ff;
                    color: #1d4ed8;
                    font-size: 12px;
                    border-bottom: 1px solid #dbeafe;
                    text-align: center;
                    flex-shrink: 0;
                    transition: all 0.3s;
                }

                .outline-result-bar.hidden {
                    display: none;
                }

                body[data-gh-mode="dark"] .outline-result-bar {
                    background: rgba(16, 163, 127, 0.2);
                    color: #10a37f;
                    border-bottom-color: rgba(16, 163, 127, 0.3);
                }

                /* 层级滑块 */
                .outline-level-slider-container {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .outline-level-dots {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                }

                .outline-level-line {
                    position: absolute;
                    left: 10px;
                    right: 10px;
                    top: 50%;
                    height: 4px;
                    background: var(--gh-border);
                    transform: translateY(-50%);
                    z-index: 1;
                    border-radius: 2px;
                }

                .outline-level-progress {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background: var(--gh-primary);
                    border-radius: 2px;
                    transition: width 0.2s;
                }

                .outline-level-dot {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--gh-bg);
                    border: 2px solid var(--gh-border);
                    cursor: pointer;
                    z-index: 2;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .outline-level-dot:hover {
                    border-color: var(--gh-primary);
                    transform: scale(1.1);
                }

                .outline-level-dot.active {
                    background: var(--gh-primary);
                    border-color: var(--gh-primary);
                }

                .outline-level-dot-tooltip {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 4px;
                    padding: 2px 6px;
                    background: var(--gh-bg);
                    color: var(--gh-text);
                    font-size: 10px;
                    white-space: nowrap;
                    border-radius: 4px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    pointer-events: none;
                    border: 1px solid var(--gh-border);
                }

                .outline-level-dot:hover .outline-level-dot-tooltip {
                    opacity: 1;
                    visibility: visible;
                }

                /* 大纲列表区 */
                .outline-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 200px;
                    user-select: none;
                    overflow: hidden;
                }

                .outline-list-wrapper {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px 12px;
                    min-height: 0;
                }

                .outline-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .outline-item {
                    padding: 6px 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    background: transparent;
                    border: 1px solid transparent;
                    font-size: 13px;
                    color: var(--gh-text);
                    transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease;
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .outline-item:hover {
                    background: var(--gh-hover);
                    border-color: rgba(148, 163, 184, 0.4);
                }

                .outline-item:active {
                    transform: translateY(0.5px) scale(0.995);
                    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
                }

                .outline-item.sync-highlight,
                .outline-item.highlight {
                    background: var(--gh-active-bg) !important;
                    border-right: 3px solid var(--gh-primary) !important;
                    border-radius: 6px 0 0 6px;
                    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.25);
                }

                .outline-item.matched {
                    background: var(--gh-active-bg);
                    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.18);
                }

                .outline-item.user-query-node {
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.06));
                    border-color: rgba(59, 130, 246, 0.35);
                }

                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    background: radial-gradient(circle at 0 0, rgba(96, 165, 250, 0.32), rgba(15, 23, 42, 0.9));
                    border-color: rgba(129, 140, 248, 0.7);
                }

                .user-query-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 6px;
                    padding: 0 6px;
                    height: 18px;
                    border-radius: 999px;
                    background: rgba(16, 163, 127, 0.15);
                    color: var(--gh-primary);
                    font-size: 11px;
                    font-weight: 600;
                    gap: 2px;
                    flex-shrink: 0;
                }

                .user-query-badge-icon {
                    font-size: 12px;
                }

                .user-query-badge-number {
                    font-variant-numeric: tabular-nums;
                }
                
                /* 用户提问节点（Level 0） */
                .outline-item.user-query-node {
                    border-left: 3px solid var(--gh-border-active, #6366f1);
                    font-weight: 500;
                    padding-left: 8px !important;
                    margin-top: 8px;
                    border-radius: 8px;
                    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    border-left-color: rgba(129, 140, 248, 0.7);
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.65);
                }
                
                .outline-item.user-query-node:first-child {
                    margin-top: 0;
                }
                
                .outline-item.user-query-node:hover {
                    background: rgba(66, 133, 244, 0.15);
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node:hover {
                    background: rgba(66, 133, 244, 0.25);
                }
                
                /* 用户问题徽章：图标+角标数字 */
                .outline-item.user-query-node .user-query-badge {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    margin-right: 4px;
                    flex-shrink: 0;
                }
                
                .outline-item.user-query-node .user-query-badge-icon {
                    font-size: 15px;
                    line-height: 1;
                    color: #9ca3af;
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-icon {
                    color: #6b7280;
                }
                
                .outline-item.user-query-node .user-query-badge-number {
                    position: absolute;
                    bottom: -2px;
                    right: -4px;
                    min-width: 14px;
                    height: 14px;
                    padding: 0 3px;
                    font-size: 9px;
                    font-weight: 700;
                    line-height: 14px;
                    text-align: center;
                    color: #111827;
                    background: #ffffff;
                    border: 1px solid rgba(209, 213, 219, 0.9);
                    border-radius: 999px;
                    box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.9);
                    z-index: 10;
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-number {
                    color: #e5e5e5;
                    background: #020617;
                    border-color: #374151;
                    box-shadow: 0 0 0 1.5px #020617;
                }
                
                /* 大纲项切换按钮 */
                .outline-item-toggle {
                    width: 24px;
                    min-width: 24px;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #9ca3af;
                    cursor: pointer;
                    transition: color 0.18s ease, background-color 0.18s ease, transform 0.16s ease;
                    font-size: 16px;
                    flex-shrink: 0;
                    margin-right: 4px;
                    box-sizing: border-box;
                    border-radius: 999px;
                    position: relative;
                    z-index: 1;
                    user-select: none;
                    -webkit-user-select: none;
                }
                
                .outline-item-toggle:hover {
                    color: var(--gh-border-active, #6366f1);
                    background-color: rgba(148, 163, 184, 0.16);
                }
                
                body[data-gh-mode="dark"] .outline-item-toggle:hover {
                    background-color: rgba(148, 163, 184, 0.25);
                }
                
                .outline-item-toggle.expanded {
                    transform: rotate(90deg);
                    color: var(--gh-border-active, #6366f1);
                }
                
                .outline-item-toggle.invisible {
                    opacity: 0;
                    cursor: default;
                    pointer-events: none;
                    visibility: visible !important;
                    display: inline-flex !important;
                }
                
                /* 大纲项文本 */
                .outline-item-text {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 24px;
                }
                
                /* 用户提问复制按钮 */
                .outline-item-copy-btn {
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s;
                    cursor: pointer;
                    color: var(--gh-text-secondary, #9ca3af);
                    border-radius: 4px;
                    background: var(--gh-bg, #ffffff);
                    border: 1px solid var(--gh-border, #e5e7eb);
                }
                
                body[data-gh-mode="dark"] .outline-item-copy-btn {
                    background: var(--gh-bg, #1e293b);
                    border-color: var(--gh-border, #475569);
                    color: var(--gh-text-secondary, #cbd5e1);
                }
                
                .outline-item.user-query-node:hover .outline-item-copy-btn {
                    opacity: 1;
                }
                
                .outline-item-copy-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    color: var(--gh-primary, #10a37f);
                }
                
                body[data-gh-mode="dark"] .outline-item-copy-btn:hover {
                    background: var(--gh-hover, #334155);
                    border-color: var(--gh-primary, #3b82f6);
                }

                .outline-item.collapsed {
                    display: none;
                }

                /* 通用隐藏类（用于大纲搜索/折叠） */
                .outline-hidden {
                    display: none !important;
                }

                .outline-expand-icon {
                    display: inline-block;
                    width: 16px;
                    margin-right: 4px;
                    user-select: none;
                    font-size: 10px;
                }
                
                /* H 标题级别徽章 */
                .heading-level-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 28px;
                    height: 20px;
                    padding: 0 6px;
                    margin-right: 6px;
                    background: var(--gh-primary);
                    color: white;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 600;
                    flex-shrink: 0;
                    line-height: 1;
                }
                
                body[data-gh-mode="dark"] .heading-level-badge {
                    background: rgba(16, 163, 127, 0.8);
                }
                
                .outline-item:hover .heading-level-badge {
                    background: var(--gh-primary-hover);
                    transform: scale(1.05);
                }

                .outline-empty {
                    text-align: center;
                    color: var(--gh-text-secondary);
                    padding: 40px 20px;
                    font-size: 14px;
                }

                /* 大纲层级缩进 */
                .outline-item.level-0 {
                    padding-left: 2px;
                    font-weight: 500;
                }

                .outline-item.level-1 {
                    padding-left: 10px;
                    font-weight: 600;
                    font-size: 14px;
                }

                .outline-item.level-2 {
                    padding-left: 28px;
                    font-weight: 500;
                }

                .outline-item.level-3 {
                    padding-left: 46px;
                }

                .outline-item.level-4 {
                    padding-left: 64px;
                    font-size: 12px;
                }

                .outline-item.level-5 {
                    padding-left: 82px;
                    font-size: 12px;
                    color: var(--gh-text-secondary);
                }

                .outline-item.level-6 {
                    padding-left: 100px;
                    font-size: 12px;
                    color: var(--gh-text-secondary);
                }

                /* 折叠状态下的最小宽度 */
                #chatgpt-helper-right.collapsed {
                    width: 50px;
                }

                #chatgpt-helper-right.collapsed #chatgpt-helper-header,
                #chatgpt-helper-right.collapsed #chatgpt-helper-tabs,
                #chatgpt-helper-right.collapsed #chatgpt-helper-content {
                    display: none;
                }

                /* 添加按钮 */
                .chatgpt-helper-add-btn {
                    width: 100%;
                    padding: 10px;
                    margin: 8px;
                    background: var(--gh-primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .chatgpt-helper-add-btn:hover {
                    background: var(--gh-primary-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(16, 163, 127, 0.3);
                }

                .chatgpt-helper-add-btn:active {
                    transform: translateY(0);
                }

                /* 刷新按钮样式 */
                .chatgpt-helper-refresh-btn:hover {
                    background: var(--gh-hover, #f3f4f6) !important;
                    border-color: var(--gh-primary, #3b82f6) !important;
                }

                /* 提示词操作按钮样式 - 右侧偏上 */
                .chatgpt-helper-prompt-content-wrapper {
                    position: relative;
                }

                .chatgpt-helper-prompt-actions {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    gap: 4px;
                    align-items: center;
                }

                .chatgpt-helper-prompt-actions button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 6px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    width: 24px;
                    height: 24px;
                    line-height: 1;
                }

                .chatgpt-helper-prompt-actions .category-btn {
                    background: var(--gh-bg-secondary);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-border);
                }

                .chatgpt-helper-prompt-actions .category-btn:hover {
                    background: var(--gh-hover);
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .edit-btn {
                    background: var(--gh-bg-secondary);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-border);
                }

                .chatgpt-helper-prompt-actions .edit-btn:hover {
                    background: var(--gh-hover);
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .delete-btn {
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    border: 1px solid var(--gh-border, #e5e7eb);
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    color: var(--gh-danger, #ef4444);
                    border-color: var(--gh-danger, #ef4444);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .delete-btn svg {
                    width: 14px;
                    height: 14px;
                    display: block;
                }

                .chatgpt-helper-prompt-actions button:active {
                    transform: translateY(0);
                }

                /* 拖动排序相关样式 */
                .chatgpt-helper-prompt-item {
                    user-select: none;
                }

                .chatgpt-helper-prompt-item.dragging {
                    opacity: 0.5;
                    cursor: grabbing;
                }

                .chatgpt-helper-prompt-item.drag-over {
                    border-top: 3px solid var(--gh-primary);
                    margin-top: 8px;
                }

                .chatgpt-helper-prompt-drag-handle {
                    position: absolute;
                    left: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    cursor: grab;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gh-text-secondary);
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-drag-handle {
                    opacity: 1;
                }

                .chatgpt-helper-prompt-drag-handle:active {
                    cursor: grabbing;
                }

                .chatgpt-helper-prompt-drag-handle::before {
                    content: '⋮⋮';
                    font-size: 14px;
                    line-height: 1;
                    letter-spacing: 0;
                }

                /* 移除自动暗色模式支持，只通过 body[data-gh-mode="dark"] 控制 */

                /* 移除自动暗色模式适配，只通过 body[data-gh-mode="dark"] 控制 */

                /* 滚动条样式 */
                #chatgpt-helper-content::-webkit-scrollbar {
                    width: 6px;
                }

                #chatgpt-helper-content::-webkit-scrollbar-track {
                    background: var(--gh-bg-secondary, #f9fafb);
                }

                #chatgpt-helper-content::-webkit-scrollbar-thumb {
                    background: var(--gh-border, #e5e7eb);
                    border-radius: 3px;
                }

                #chatgpt-helper-content::-webkit-scrollbar-thumb:hover {
                    background: var(--gh-text-secondary, #6b7280);
                }

                /* 侧边按钮组 */
                .chatgpt-helper-quick-buttons {
                    position: fixed !important;
                    right: 340px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex !important;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 2147483647 !important;
                    pointer-events: auto !important;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
                    isolation: isolate;
                    padding: 8px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 16px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    background: rgba(30, 41, 59, 0.3);
                }

                .chatgpt-helper-quick-buttons.collapsed {
                    right: 8px !important;
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }

                .chatgpt-helper-quick-buttons.hidden {
                    display: none !important;
                    visibility: hidden !important;
                }

                .chatgpt-helper-quick-btn {
                    width: 44px !important;
                    height: 44px !important;
                    min-width: 44px !important;
                    min-height: 44px !important;
                    border-radius: 12px;
                    border: 1px solid var(--gh-border);
                    background: var(--gh-bg) !important;
                    color: var(--gh-text) !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
                    pointer-events: auto !important;
                    user-select: none !important;
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    position: relative;
                    z-index: 2147483647 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    outline: none !important;
                    -webkit-tap-highlight-color: transparent;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .chatgpt-helper-quick-btn:active {
                    transform: scale(0.92);
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }

                .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-hover) !important;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
                    border-color: var(--gh-primary);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {
                    background: rgba(30, 41, 59, 0.9) !important;
                    border-color: rgba(71, 85, 105, 0.5);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {
                    background: rgba(51, 65, 85, 0.95) !important;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
                }

                .chatgpt-helper-quick-btn.disabled {
                    opacity: 0.4;
                    cursor: default;
                }

                .chatgpt-helper-quick-btn.disabled:hover {
                    transform: none;
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    background: var(--gh-border);
                    margin: 4px 0;
                }

                /* 锚点标记 - 侧边小标记 */
                .chatgpt-helper-anchor-marker {
                    position: absolute;
                    left: 0;
                    width: 4px;
                    height: 24px;
                    background: var(--gh-header-bg, #10a37f);
                    border-radius: 0 4px 4px 0;
                    z-index: 999;
                    pointer-events: none;
                    box-shadow: 2px 0 4px rgba(0,0,0,0.1);
                }
                .chatgpt-helper-anchor-marker::before {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 8px;
                    width: 6px;
                    height: 6px;
                    border-radius: 999px;
                    background: var(--gh-primary, #64748b);
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #64748b), transparent 72%);
                }

                /* Toast 通知 */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }

                /* 底部导航按钮组 */
                .scroll-nav-container {
                    display: flex;
                    flex-direction: row;
                    gap: 8px;
                    padding: 12px;
                    border-top: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                    justify-content: space-between;
                }
                
                body[data-gh-mode="dark"] .scroll-nav-container {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-top-color: var(--gh-border, #475569);
                }
                
                .scroll-nav-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 8px;
                    background: var(--gh-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    flex: 1;
                    box-sizing: border-box;
                    min-width: 0;
                }
                
                body[data-gh-mode="dark"] .scroll-nav-btn {
                    background: var(--gh-bg, #1e293b);
                    border-color: var(--gh-input-border, #64748b);
                    color: var(--gh-text, #f1f5f9);
                }
                
                .scroll-nav-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(16, 163, 127, 0.15);
                }
                
                body[data-gh-mode="dark"] .scroll-nav-btn:hover {
                    background: var(--gh-hover, #334155);
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                }
                
                .scroll-nav-btn:active {
                    transform: translateY(0);
                }
                
                .scroll-nav-btn span:first-child {
                    font-size: 14px;
                    flex-shrink: 0;
                }
                
                .scroll-nav-btn span:last-child {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .scroll-nav-btn[style*="opacity: 0.4"] {
                    opacity: 0.4 !important;
                    cursor: default !important;
                }
                
                .scroll-nav-btn[style*="opacity: 0.4"]:hover {
                    transform: none;
                    box-shadow: none;
                }

                .chatgpt-helper-conversations-root {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px;
                    min-height: 0;
                }

                .chatgpt-helper-conversations-search {
                    padding: 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg, #ffffff);
                    flex-shrink: 0;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search {
                    background: var(--gh-bg, #111827);
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-conversations-search-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 8px;
                    background: var(--gh-input-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    font-size: 14px;
                    box-sizing: border-box;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }

                .chatgpt-helper-conversations-search-input:focus {
                    outline: none;
                    border-color: var(--gh-primary, #10a37f);
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #10a37f), transparent 80%);
                }

                .chatgpt-helper-batch-toolbar {
                    padding: 8px 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    background: var(--gh-active-bg, #e5e7eb);
                    font-size: 13px;
                    flex-shrink: 0;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar {
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-batch-toolbar-btn {
                    padding: 4px 8px;
                    border: 1px solid var(--gh-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    cursor: pointer;
                    font-size: 12px;
                    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
                }

                .chatgpt-helper-batch-toolbar-btn:hover {
                    transform: translateY(-1px);
                    border-color: var(--gh-primary, #10a37f);
                    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.10);
                }

                .chatgpt-helper-batch-toolbar-btn.danger {
                    background: #ef4444;
                    border-color: rgba(239, 68, 68, 0.65);
                    color: #ffffff;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn {
                    background: var(--gh-bg, #0f172a);
                    border-color: var(--gh-border, #475569);
                    color: var(--gh-text, #f8fafc);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn.danger {
                    background: #dc2626;
                    border-color: rgba(248, 113, 113, 0.55);
                }

                /* 会话模块样式 */
                .chatgpt-helper-folder-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 12px;
                    margin-bottom: 4px;
                    border-radius: 8px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item {
                    background: var(--gh-bg-secondary, #0f172a);
                }
                
                .chatgpt-helper-folder-item:hover {
                    background: var(--gh-hover, #f3f4f6);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item:hover {
                    background: var(--gh-hover, #334155);
                }
                
                .chatgpt-helper-folder-item.default {
                    background: var(--gh-folder-bg-default, #e0f2fe);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item.default {
                    background: var(--gh-bg-secondary, #111827);
                }
                
                .chatgpt-helper-folder-item.expanded {
                    background: var(--gh-folder-bg-expanded, #c7d2fe) !important;
                    border: 2px solid var(--gh-border-active, #6366f1) !important;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
                    border-radius: 8px 8px 0 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item.expanded {
                    background: rgba(99, 102, 241, 0.2) !important;
                    border-color: rgba(99, 102, 241, 0.5) !important;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
                }
                
                .chatgpt-helper-folder-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                    min-width: 0;
                }
                
                .chatgpt-helper-folder-icon {
                    font-size: 18px;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .chatgpt-helper-folder-name {
                    font-weight: 500;
                    color: var(--gh-text, #1f2937);
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex: 1;
                }
                
                .chatgpt-helper-folder-count {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    margin-left: 4px;
                }
                
                .chatgpt-helper-folder-arrow {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    transition: transform 0.2s;
                    flex-shrink: 0;
                }

                .chatgpt-helper-folder-actions {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex-shrink: 0;
                }

                /* 默认隐藏删除按钮，hover 时显示（避免界面噪音） */
                .chatgpt-helper-folder-delete-btn {
                    width: 26px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    font-size: 14px;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
                }

                .chatgpt-helper-folder-item:hover .chatgpt-helper-folder-delete-btn,
                .chatgpt-helper-folder-delete-btn:focus-visible {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-folder-delete-btn:hover {
                    background: rgba(239, 68, 68, 0.12);
                    border-color: rgba(239, 68, 68, 0.35);
                    color: #ef4444;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-folder-delete-btn:hover {
                    background: rgba(239, 68, 68, 0.18);
                    border-color: rgba(239, 68, 68, 0.45);
                }

                .chatgpt-helper-folder-delete-btn:focus-visible {
                    outline: 2px solid rgba(99, 102, 241, 0.55);
                    outline-offset: 2px;
                }

                /* 会话模式：收件箱与其他文件夹分割线 */
                .chatgpt-helper-folder-divider {
                    height: 1px;
                    background: var(--gh-border, #e5e7eb);
                    opacity: 0.75;
                    margin: 8px 6px;
                    border-radius: 1px;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-divider {
                    background: var(--gh-border, #475569);
                    opacity: 0.65;
                }
                
                .chatgpt-helper-folder-item.expanded .chatgpt-helper-folder-arrow {
                    transform: rotate(90deg);
                }
                
                .chatgpt-helper-conversations-list {
                    width: calc(100% - 8px);
                    margin-left: 4px;
                    margin-right: 4px;
                    padding: 8px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    /* 移除会话列表左/右/下方“蓝线”（原本来自激活色边框） */
                    border: 2px solid transparent;
                    border-top: none;
                    border-radius: 0 0 8px 8px;
                    margin-top: -4px;
                    margin-bottom: 4px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
                    /* 让会话列表占满可用高度，由外层容器控制滚动 */
                    max-height: none;
                    height: auto;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .chatgpt-helper-conversations-list::-webkit-scrollbar {
                    display: none;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-list {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: transparent;
                    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
                }
                
                .chatgpt-helper-conversation-item {
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    margin-bottom: 4px;
                    border-radius: 6px;
                    background: var(--gh-bg, #ffffff);
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                    gap: 8px;
                    position: relative;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item {
                    background: var(--gh-bg, #1e293b);
                }

                .chatgpt-helper-conversation-item.pinned {
                    background: color-mix(in srgb, var(--gh-active-bg, #e5e7eb), var(--gh-bg, #ffffff) 42%);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item.pinned {
                    background: color-mix(in srgb, var(--gh-active-bg, rgba(59,130,246,0.3)), var(--gh-bg, #1e293b) 44%);
                    border-color: color-mix(in srgb, var(--gh-border, #475569), transparent 20%);
                }

                .chatgpt-helper-conversation-item:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item:hover {
                    background: var(--gh-hover, #334155);
                }
                
                .chatgpt-helper-conversations-empty {
                    padding: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    font-size: 13px;
                    text-align: center;
                }
                
                /* 会话工具栏样式 */
                .chatgpt-helper-conversations-toolbar {
                    display: flex;
                    gap: 6px;
                    padding: 10px 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                .chatgpt-helper-conversations-toolbar-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    height: 32px;
                    padding: 5px 8px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    color: var(--gh-text, #374151);
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: var(--gh-input-border, #4a5568);
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-conversations-toolbar-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: #9ca3af;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn:hover {
                    background: var(--gh-hover, #1f2937);
                    border-color: #6b7280;
                }
                
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: var(--gh-border-active, #6366f1) !important;
                    color: white !important;
                    border-color: var(--gh-border-active, #6366f1) !important;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: rgba(99, 102, 241, 0.8) !important;
                    border-color: rgba(99, 102, 241, 0.8) !important;
                }
                
                .chatgpt-helper-folder-select {
                    flex: 1;
                    padding: 5px 8px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    color: var(--gh-text, #374151);
                    font-size: 13px;
                    cursor: pointer;
                    min-width: 80px;
                    height: 32px;
                    box-sizing: border-box;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-select {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: var(--gh-input-border, #4a5568);
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-folder-select:focus {
                    outline: none;
                    border-color: var(--gh-border-active, #6366f1);
                }

                .chatgpt-helper-export-header {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 15px;
                    font-weight: 500;
                    color: var(--gh-text, #374151);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
                    box-sizing: border-box;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-export-header {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-export-container {
                    flex: 1;
                    overflow: auto;
                    padding: 0;
                    min-height: 0;
                    position: relative;
                    box-sizing: border-box;
                }
                
                /* 设置面板样式 */
                .chatgpt-helper-setting-section {
                    position: relative;
                    margin-bottom: 18px;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), white 20%) 0%, var(--gh-bg-secondary, #f9fafb) 100%);
                    border-radius: 16px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 8%);
                    overflow: visible;
                    box-shadow:
                        0 14px 30px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.45);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }

                .chatgpt-helper-setting-section:has(.chatgpt-helper-custom-select.open) {
                    z-index: 30;
                    overflow: visible !important;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section {
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #101827), white 4%) 0%, var(--gh-bg-secondary, #101827) 100%);
                    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 10%);
                    box-shadow:
                        0 18px 34px rgba(2, 6, 23, 0.34),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                }
                
                .chatgpt-helper-setting-section-header {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    padding: 16px 18px;
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--gh-text, #374151);
                    letter-spacing: 0.06em;
                    text-align: center;
                    transition: background 0.2s, border-color 0.2s;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header {
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-setting-section-header:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 12%);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header:hover {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 8%);
                }
                
                .chatgpt-helper-setting-section-content {
                    padding: 0 16px 16px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .chatgpt-helper-setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 16px;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), white 12%) 0%, var(--gh-bg, #ffffff) 100%);
                    border-radius: 14px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);
                    box-shadow:
                        0 8px 18px rgba(15, 23, 42, 0.04),
                        inset 0 1px 0 rgba(255,255,255,0.38);
                    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
                }

                .chatgpt-helper-setting-item:has(.chatgpt-helper-custom-select.open) {
                    align-items: flex-start;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item {
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #0f1419), white 3%) 0%, var(--gh-bg, #0f1419) 100%);
                    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 14%);
                    box-shadow:
                        0 10px 22px rgba(2, 6, 23, 0.28),
                        inset 0 1px 0 rgba(255,255,255,0.03);
                }
                
                .chatgpt-helper-setting-item:hover {
                    transform: translateY(-1px);
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);
                    box-shadow:
                        0 12px 26px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.48);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item:hover {
                    box-shadow:
                        0 14px 28px rgba(2, 6, 23, 0.34),
                        inset 0 1px 0 rgba(255,255,255,0.05);
                }
                
                .chatgpt-helper-setting-item-info {
                    flex: 1;
                    margin-right: 12px;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .chatgpt-helper-setting-item-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--gh-text, #374151);
                    margin-bottom: 2px;
                    white-space: nowrap;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item-label {
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-setting-item-desc {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    line-height: 1.4;
                }

                .chatgpt-helper-setting-subheading {
                    margin: 10px 4px 2px;
                    font-size: 11px;
                    font-weight: 700;
                    line-height: 1.2;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: color-mix(in srgb, var(--gh-text-secondary, #6b7280), var(--gh-text, #111827) 22%);
                }

                .chatgpt-helper-setting-subheading:first-child {
                    margin-top: 2px;
                }

                .chatgpt-helper-setting-custom-block {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .chatgpt-helper-setting-custom-block .chatgpt-helper-setting-item {
                    margin: 0;
                }

                .chatgpt-helper-settings-scroll {
                    scrollbar-width: thin;
                }

                .chatgpt-helper-settings-compact {
                    flex: 1;
                    min-height: 0;
                    overflow-y: auto;
                    padding: 10px 12px 16px;
                    box-sizing: border-box;
                }

                .chatgpt-helper-settings-compact-section {
                    margin: 0 0 14px;
                }

                .chatgpt-helper-settings-compact-section:last-of-type {
                    margin-bottom: 8px;
                }

                .chatgpt-helper-settings-compact-title {
                    padding: 0;
                    font-size: 11px;
                    line-height: 1.2;
                    font-weight: 700;
                    color: color-mix(in srgb, var(--gh-text-secondary, #6b7280), var(--gh-text, #111827) 20%);
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .chatgpt-helper-settings-compact-title-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    border: 0;
                    border-radius: 6px;
                    background: transparent;
                    padding: 6px 2px 5px;
                    color: inherit;
                    cursor: pointer;
                    font: inherit;
                    letter-spacing: inherit;
                    line-height: inherit;
                    text-align: left;
                    text-transform: inherit;
                }

                .chatgpt-helper-settings-compact-title-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 62%);
                    color: var(--gh-text, #111827);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-settings-compact-title-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 48%);
                }

                .chatgpt-helper-settings-compact-title-chevron {
                    width: 14px;
                    min-width: 14px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gh-text-secondary, #6b7280);
                    font-size: 12px;
                    transform: rotate(90deg);
                    transition: transform 150ms ease;
                }

                .chatgpt-helper-settings-compact-section.collapsed .chatgpt-helper-settings-compact-title-chevron {
                    transform: rotate(0deg);
                }

                .chatgpt-helper-settings-compact-section.collapsed .chatgpt-helper-settings-compact-list {
                    display: none;
                }

                .chatgpt-helper-settings-compact-title-text {
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-settings-compact-list {
                    border-top: 1px solid var(--gh-border, #e5e7eb);
                }

                .chatgpt-helper-settings-compact-row {
                    min-height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 4px 2px;
                    border-bottom: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);
                    box-sizing: border-box;
                }

                .chatgpt-helper-settings-compact-row:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 58%);
                }

                .chatgpt-helper-settings-compact-label {
                    min-width: 0;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 1.35;
                    color: var(--gh-text, #374151);
                }

                .chatgpt-helper-settings-compact-label.has-desc {
                    white-space: normal;
                }

                .chatgpt-helper-settings-compact-label-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-settings-compact-desc {
                    margin-top: 2px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 11px;
                    font-weight: 400;
                    line-height: 1.25;
                    color: var(--gh-text-secondary, #6b7280);
                }

                .chatgpt-helper-settings-icon-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .chatgpt-helper-settings-icon-label .chatgpt-helper-inline-icon-wrap {
                    width: 24px;
                    min-width: 24px;
                    height: 24px;
                    margin-right: 0;
                    border-radius: 6px;
                }

                .chatgpt-helper-settings-compact-controls {
                    min-width: 92px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    flex-shrink: 0;
                }

                .chatgpt-helper-settings-compact-input {
                    width: 96px;
                    height: 28px;
                    padding: 4px 8px;
                    border: 1px solid var(--gh-border, #e5e7eb);
                    border-radius: 6px;
                    background: var(--gh-input-bg, #ffffff);
                    color: var(--gh-text, #374151);
                    font-size: 13px;
                    box-sizing: border-box;
                }

                .chatgpt-helper-settings-compact-text {
                    width: 156px;
                }

                .chatgpt-helper-settings-compact-select .chatgpt-helper-custom-select-trigger {
                    min-height: 28px;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 13px;
                }

                .chatgpt-helper-settings-compact-button {
                    min-height: 28px;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    box-shadow: none;
                }

                .chatgpt-helper-settings-compact .chatgpt-helper-toggle {
                    transform: scale(0.86);
                    transform-origin: right center;
                }

                .chatgpt-helper-settings-compact .chatgpt-helper-order-btn {
                    width: 28px;
                    height: 26px;
                    min-width: 28px;
                    padding: 0;
                }

                .chatgpt-helper-settings-compact .chatgpt-helper-order-btn:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-settings-compact-row:hover {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 45%);
                }

                .chatgpt-helper-setting-section-title {
                    display: inline-block;
                    text-align: center;
                }

                .chatgpt-helper-theme-block-title,
                .chatgpt-helper-setting-section-title {
                    text-transform: none;
                }

                .chatgpt-helper-inline-icon,
                .chatgpt-helper-icon-logo,
                .chatgpt-helper-quick-btn-logo {
                    filter: drop-shadow(0 4px 12px rgba(15, 23, 42, 0.18));
                }

                .chatgpt-helper-inline-icon-wrap {
                    display: inline-flex;
                    width: 28px;
                    min-width: 28px;
                    height: 28px;
                    align-items: center;
                    justify-content: center;
                    margin-right: 8px;
                    border-radius: 10px;
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 10%);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-inline-icon-wrap {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 10%);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .setting-toggle {
                    position: relative;
                    width: 42px;
                    min-width: 42px;
                    height: 24px;
                    border-radius: 999px;
                    cursor: pointer;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-hover, #e5e7eb), white 18%) 0%, color-mix(in srgb, var(--gh-hover, #e5e7eb), transparent 12%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.5),
                        0 6px 14px rgba(15, 23, 42, 0.08);
                    transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease;
                }

                .setting-toggle::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    box-shadow:
                        0 4px 10px rgba(15, 23, 42, 0.14),
                        inset 0 1px 0 rgba(255,255,255,0.85);
                    transition: transform 0.22s ease;
                }

                .setting-toggle.active {
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #10a37f), white 36%) 0%, color-mix(in srgb, var(--gh-primary, #10a37f), transparent 16%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.38),
                        0 10px 18px rgba(15, 23, 42, 0.12);
                }

                .setting-toggle.active::after {
                    transform: translateX(18px);
                }

                body[data-gh-mode="dark"] .setting-toggle {
                    border-color: color-mix(in srgb, var(--gh-border, #334155), transparent 10%);
                    background:
                        linear-gradient(180deg, color-mix(in srgb, #111827, white 4%) 0%, #0f172a 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.05),
                        0 8px 18px rgba(2, 6, 23, 0.28);
                }

                body[data-gh-mode="dark"] .setting-toggle::after {
                    background: linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%);
                    box-shadow:
                        0 4px 12px rgba(2, 6, 23, 0.42),
                        inset 0 1px 0 rgba(255,255,255,0.7);
                }

                body[data-gh-mode="dark"] .setting-toggle.active {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #6366f1), white 14%) 0%, color-mix(in srgb, var(--gh-primary, #6366f1), #0f172a 65%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.06),
                        0 10px 24px rgba(2, 6, 23, 0.34);
                }

                .chatgpt-helper-settings-footer {
                    padding: 10px 2px 4px;
                }

                .chatgpt-helper-about-btn {
                    width: 100%;
                    min-height: 48px;
                    border-radius: 16px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 10%);
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-bg, #ffffff), white 10%) 0%, color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 10%) 100%);
                    color: var(--gh-text, #111827);
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    box-shadow:
                        0 14px 28px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.46);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }

                .chatgpt-helper-about-btn:hover {
                    transform: translateY(-1px);
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 28%);
                    box-shadow:
                        0 18px 30px rgba(15, 23, 42, 0.12),
                        inset 0 1px 0 rgba(255,255,255,0.52);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-btn {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-bg, #0f1419), white 3%) 0%, color-mix(in srgb, var(--gh-hover, #1f2937), transparent 10%) 100%);
                    box-shadow:
                        0 18px 34px rgba(2, 6, 23, 0.28),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .chatgpt-helper-header-about-btn {
                    position: relative;
                }

                .chatgpt-helper-about-entry-icon {
                    width: 16px;
                    height: 16px;
                    border-radius: 999px;
                    border: 1.6px solid #f97316;
                    color: #ea580c;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 800;
                    line-height: 1;
                    background: rgba(255, 247, 237, 0.2);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.24);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-entry-icon {
                    color: #fdba74;
                    border-color: #fb923c;
                    background: rgba(249, 115, 22, 0.14);
                }

                #chatgpt-helper-header.gh-compact .chatgpt-helper-about-entry-icon {
                    width: 14px;
                    height: 14px;
                    font-size: 10px;
                }

                #chatgpt-helper-about-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10060;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    background: rgba(15, 23, 42, 0.46);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.18s var(--gh-fast-ease, ease);
                }

                #chatgpt-helper-about-modal.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-about-dialog {
                    width: min(820px, calc(100vw - 32px));
                    max-height: min(760px, calc(100vh - 32px));
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: 14px;
                    border: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));
                    background: var(--gh-panel-surface, #ffffff);
                    color: var(--gh-text, #0f172a);
                    box-shadow: 0 22px 58px rgba(15, 23, 42, 0.26), inset 0 1px 0 rgba(255,255,255,0.7);
                    transform: translateY(8px) scale(0.99);
                    transition: transform 0.22s var(--gh-fast-ease, ease), box-shadow 0.22s var(--gh-fast-ease, ease);
                }

                #chatgpt-helper-about-modal.open .chatgpt-helper-about-dialog {
                    transform: translateY(0) scale(1);
                }

                .chatgpt-helper-about-header {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 12px;
                    padding: 15px 18px 14px;
                    border-bottom: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));
                    background: var(--gh-panel-subtle, #f8fafc);
                }

                .chatgpt-helper-about-title-wrap {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    min-width: 0;
                    padding-right: 46px;
                }

                .chatgpt-helper-about-logo {
                    border-radius: 999px;
                    background: #ffffff;
                    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.08), 0 6px 16px rgba(15, 23, 42, 0.08);
                }

                .chatgpt-helper-logo-fallback-svg,
                .chatgpt-helper-logo-svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                .chatgpt-helper-logo-svg {
                    object-fit: contain;
                    opacity: 0;
                    transition: opacity 0.16s var(--gh-fast-ease, ease);
                }

                .chatgpt-helper-logo-svg[data-loaded="true"] {
                    opacity: 1;
                }

                .chatgpt-helper-about-title-text {
                    min-width: 0;
                }

                .chatgpt-helper-about-name-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .chatgpt-helper-about-name {
                    margin: 0;
                    font-size: 23px;
                    font-weight: 700;
                    line-height: 1.18;
                    color: var(--gh-text, #0f172a);
                    letter-spacing: 0;
                }

                .chatgpt-helper-about-tagline {
                    margin: 4px 0 0;
                    font-size: 12.5px;
                    line-height: 1.38;
                    color: var(--gh-text-secondary, #475569);
                    max-width: 520px;
                }

                .chatgpt-helper-about-badge {
                    padding: 3px 8px;
                    border-radius: 7px;
                    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 72%);
                    background: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 90%);
                    font-size: 11.5px;
                    font-weight: 650;
                    line-height: 1.2;
                    letter-spacing: 0;
                    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 38%);
                }

                .chatgpt-helper-about-close {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    width: 32px;
                    height: 32px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .chatgpt-helper-about-body {
                    flex: 1;
                    overflow: auto;
                    padding: 0 18px;
                }

                .chatgpt-helper-about-shell {
                    width: 100%;
                    max-width: none;
                    margin: 0 auto;
                    padding: 14px 0;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 300px;
                    gap: 13px;
                }

                .chatgpt-helper-about-main-stack,
                .chatgpt-helper-about-side-stack {
                    display: grid;
                    align-content: start;
                    gap: 12px;
                }

                .chatgpt-helper-about-section {
                    position: relative;
                    padding: 12px 13px;
                    border: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));
                    border-radius: 10px;
                    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), var(--gh-panel-subtle, #f8fafc) 24%);
                    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 64%);
                }

                .chatgpt-helper-about-section.compact {
                    padding-bottom: 12px;
                }

                .chatgpt-helper-about-section.featured {
                    border-left: 3px solid color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 12%);
                    background: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-panel-card, #ffffff) 94%);
                    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-panel-line, #e2e8f0) 70%);
                    border-left-color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 12%);
                }

                .chatgpt-helper-about-section-head {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 7px;
                }

                .chatgpt-helper-about-section-icon {
                    width: 20px;
                    height: 20px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 18%);
                    background: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 91%);
                    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 78%);
                }

                .chatgpt-helper-about-section-title {
                    margin: 0;
                    font-size: 13.5px;
                    font-weight: 700;
                    line-height: 1.35;
                    color: var(--gh-text, #0f172a);
                    letter-spacing: 0;
                }

                .chatgpt-helper-about-section-text {
                    font-size: 12.5px;
                    line-height: 1.56;
                    color: var(--gh-text-secondary, #334155);
                    white-space: pre-wrap;
                    margin: 0;
                }

                .chatgpt-helper-about-story {
                    display: grid;
                    gap: 8px;
                }

                .chatgpt-helper-about-section-lead {
                    margin: 0;
                    color: var(--gh-text, #0f172a);
                    font-size: 12.8px;
                    line-height: 1.55;
                    font-weight: 560;
                }

                .chatgpt-helper-about-feature-list {
                    list-style: none;
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 7px;
                    padding: 0;
                    margin: 0;
                }

                .chatgpt-helper-about-feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    min-width: 0;
                    color: var(--gh-text-secondary, #334155);
                    font-size: 12.5px;
                    line-height: 1.42;
                    padding: 8px 9px;
                    min-height: 42px;
                    border-radius: 8px;
                    border: 1px solid color-mix(in srgb, var(--gh-panel-line, #e2e8f0), transparent 18%);
                    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), var(--gh-panel-subtle, #f8fafc) 34%);
                }

                .chatgpt-helper-about-feature-index {
                    flex: 0 0 auto;
                    width: 22px;
                    margin-top: 1px;
                    font-size: 10.5px;
                    line-height: 1.35;
                    font-weight: 760;
                    font-variant-numeric: tabular-nums;
                    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 16%);
                }

                .chatgpt-helper-about-feature-item > span:last-child {
                    min-width: 0;
                }

                .chatgpt-helper-about-actions {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 7px;
                    margin-top: 10px;
                }

                .chatgpt-helper-about-link-btn:first-child,
                .chatgpt-helper-about-link-btn:only-child {
                    grid-column: 1 / -1;
                }

                .chatgpt-helper-about-link-btn {
                    min-height: 31px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    min-width: 0;
                    padding: 0 9px;
                    border-radius: 8px;
                    border: 1px solid var(--gh-control-border, rgba(203, 213, 225, 0.9));
                    cursor: pointer;
                    font-size: 11.8px;
                    font-weight: 650;
                    letter-spacing: 0;
                    transition:
                        transform 0.16s var(--gh-fast-ease, ease),
                        box-shadow 0.16s var(--gh-fast-ease, ease),
                        border-color 0.16s var(--gh-fast-ease, ease),
                        background 0.16s var(--gh-fast-ease, ease),
                        color 0.16s var(--gh-fast-ease, ease);
                    color: var(--gh-text, #0f172a);
                    background: var(--gh-control-bg, rgba(255,255,255,0.86));
                    box-shadow: none;
                }

                .chatgpt-helper-about-link-btn svg {
                    flex: 0 0 auto;
                    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 14%);
                }

                .chatgpt-helper-about-link-btn span {
                    min-width: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .chatgpt-helper-about-link-btn:hover {
                    background: var(--gh-control-bg-hover, rgba(248,250,252,0.96));
                    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 48%);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-about-link-btn.primary {
                    color: #ffffff;
                    background: color-mix(in srgb, var(--gh-primary, #3b82f6), #1f2937 10%);
                    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 36%);
                }

                .chatgpt-helper-about-link-btn.primary svg {
                    color: currentColor;
                }

                .chatgpt-helper-about-link-btn.primary:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover, #2563eb), var(--gh-primary, #3b82f6) 56%);
                }

                .chatgpt-helper-about-link-btn.disabled,
                .chatgpt-helper-about-link-btn:disabled {
                    opacity: 0.46;
                    cursor: not-allowed;
                    box-shadow: none;
                    transform: none;
                }

                .chatgpt-helper-about-author-block {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .chatgpt-helper-about-author-bio {
                    margin-bottom: 0;
                }

                .chatgpt-helper-about-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    padding: 10px 18px 12px;
                    text-align: left;
                    border-top: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));
                    background: var(--gh-panel-subtle, #f8fafc);
                }

                .chatgpt-helper-about-footer-note {
                    font-size: 11.8px;
                    line-height: 1.45;
                    color: var(--gh-text-secondary, #475569);
                    margin: 0;
                }

                .chatgpt-helper-about-footer-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 7px;
                    flex: 0 0 auto;
                }

                .chatgpt-helper-about-footer-actions .chatgpt-helper-about-link-btn {
                    min-height: 30px;
                    padding: 0 10px;
                }

                .chatgpt-helper-about-footer-text {
                    font-size: 11.8px;
                    color: var(--gh-text-secondary, #475569);
                    white-space: nowrap;
                }

                .chatgpt-helper-about-link-btn:focus-visible,
                .chatgpt-helper-about-close:focus-visible {
                    outline: 2px solid var(--gh-focus-ring, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 66%)) !important;
                    outline-offset: 2px;
                }

                @media (max-width: 640px) {
                    #chatgpt-helper-about-modal {
                        align-items: stretch;
                        padding: 10px;
                    }

                    .chatgpt-helper-about-dialog {
                        width: 100%;
                        max-height: calc(100vh - 20px);
                    }

                    .chatgpt-helper-about-header {
                        padding: 16px 16px 14px;
                    }

                    .chatgpt-helper-about-body {
                        padding: 0 16px;
                    }

                    .chatgpt-helper-about-shell {
                        padding: 12px 0;
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }

                    .chatgpt-helper-about-main-stack,
                    .chatgpt-helper-about-side-stack {
                        gap: 12px;
                    }

                    .chatgpt-helper-about-title-wrap {
                        gap: 12px;
                        padding-right: 42px;
                    }

                    .chatgpt-helper-about-logo {
                        width: 40px !important;
                        height: 40px !important;
                    }

                    .chatgpt-helper-about-name {
                        font-size: 21px;
                    }

                    .chatgpt-helper-about-feature-list {
                        grid-template-columns: 1fr;
                    }

                    .chatgpt-helper-about-actions {
                        grid-template-columns: 1fr;
                    }

                    .chatgpt-helper-about-link-btn {
                        width: 100%;
                    }

                    .chatgpt-helper-about-footer {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .chatgpt-helper-about-footer-actions {
                        width: 100%;
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 7px;
                    }

                    .chatgpt-helper-about-footer-text {
                        white-space: normal;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    #chatgpt-helper-about-modal,
                    .chatgpt-helper-about-dialog,
                    .chatgpt-helper-about-link-btn {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }

                    .chatgpt-helper-about-dialog,
                    #chatgpt-helper-about-modal.open .chatgpt-helper-about-dialog {
                        transform: none !important;
                    }
                }
                
                .chatgpt-helper-setting-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-shrink: 0;
                }
                
                .collapse-arrow {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    transition: transform 0.2s;
                    display: inline-block;
                }

                .chatgpt-helper-theme-launch-btn {
                    padding: 9px 15px;
                    border-radius: 12px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 18%);
                    background: color-mix(in srgb, var(--gh-bg, #ffffff), transparent 6%);
                    color: var(--gh-text, #111827);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-launch-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 8%);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-1px);
                }

                #chatgpt-helper-theme-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10050;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: color-mix(in srgb, #020617, transparent 22%);
                    backdrop-filter: blur(8px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.24s ease;
                    padding: 14px;
                }

                #chatgpt-helper-theme-modal.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-theme-modal-dialog {
                    width: min(1180px, 96vw);
                    height: min(880px, 93vh);
                    background: var(--gh-panel-surface, var(--gh-bg, #ffffff));
                    color: var(--gh-text, #111827);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    border-radius: 20px;
                    box-shadow:
                        0 26px 72px color-mix(in srgb, #020617, transparent 52%),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                    background: var(--gh-panel-surface, var(--gh-bg, #0b111a));
                    border-color: color-mix(in srgb, #334155, transparent 12%);
                }

                .chatgpt-helper-theme-modal-header {
                    height: 64px;
                    padding: 0 22px;
                    border-bottom: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 0.01em;
                }

                .chatgpt-helper-theme-modal-close {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 20%);
                    color: inherit;
                    cursor: pointer;
                    font-size: 20px;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-modal-close:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                }

                .chatgpt-helper-theme-modal-body {
                    flex: 1;
                    min-height: 0;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 370px;
                    gap: 0;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-main {
                    overflow: auto;
                    padding: 22px 24px 28px;
                }

                .chatgpt-helper-theme-side {
                    border-left: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    padding: 22px 20px;
                    overflow: auto;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 4%);
                }

                .chatgpt-helper-theme-block {
                    margin-bottom: 26px;
                }

                .chatgpt-helper-theme-block-title {
                    font-size: 15px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }

                .chatgpt-helper-theme-segment {
                    display: inline-flex;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    border-radius: 12px;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 8%);
                }

                .chatgpt-helper-theme-segment button {
                    border: none;
                    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 14%);
                    background: transparent;
                    color: var(--gh-text, #1f2937);
                    padding: 9px 14px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-segment button:last-child {
                    border-right: none;
                }

                .chatgpt-helper-theme-segment button:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 92%);
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), #0b1220 10%);
                    color: #fff;
                }

                .chatgpt-helper-theme-preset-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    width: 100%;
                    padding: 14px;
                    border-radius: 14px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 4%);
                }

                .chatgpt-helper-theme-preset {
                    width: 46px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    position: relative;
                    transition: transform 0.16s ease, box-shadow 0.2s ease;
                }

                .chatgpt-helper-theme-preset.active {
                    border-color: #ffffff;
                    box-shadow: 0 0 0 2px color-mix(in srgb, currentColor, white 10%), 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .chatgpt-helper-theme-preset:hover {
                    transform: scale(1.06);
                }

                .chatgpt-helper-theme-preset.is-original {
                    width: auto;
                    min-width: 92px;
                    padding: 0 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f8fafc !important;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    background: linear-gradient(135deg, #334155 0%, #64748b 100%);
                }

                .chatgpt-helper-theme-preset.is-original:hover {
                    transform: translateY(-1px);
                }

                .chatgpt-helper-theme-upload {
                    border: 2px dashed color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 10%);
                    border-radius: 14px;
                    min-height: 220px;
                    padding: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 5%);
                    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
                }

                .chatgpt-helper-theme-upload.dragging {
                    border-color: var(--gh-primary);
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-theme-upload-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0.88;
                    filter: brightness(0.72);
                }

                .chatgpt-helper-theme-upload.has-image::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(2, 6, 23, 0.28) 0%, rgba(2, 6, 23, 0.52) 100%);
                    z-index: 1;
                    pointer-events: none;
                }

                .chatgpt-helper-theme-upload-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    align-items: center;
                }

                .chatgpt-helper-theme-upload.has-image .chatgpt-helper-theme-upload-content {
                    color: #f8fafc;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
                }

                .chatgpt-helper-theme-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: 12px;
                    padding: 10px 12px;
                    border-radius: 12px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);
                    border: 1px solid color-mix(in srgb, var(--gh-border), transparent 18%);
                }

                .chatgpt-helper-theme-row input[type="range"] {
                    width: 220px;
                    accent-color: var(--gh-primary);
                }

                .chatgpt-helper-theme-row input[type="checkbox"] {
                    appearance: none;
                    width: 42px;
                    height: 24px;
                    border-radius: 999px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background: color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 24%);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
                    transition: transform 0.2s ease;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked {
                    background: var(--gh-primary);
                    border-color: var(--gh-primary);
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked::after {
                    transform: translateX(18px);
                }

                .chatgpt-helper-theme-preview {
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 8%);
                    border-radius: 18px;
                    min-height: 350px;
                    overflow: hidden;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), #f8fbff 26%) 0%, var(--gh-bg, #ffffff) 50%),
                        var(--gh-bg, #ffffff);
                    position: relative;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 10px 30px rgba(2, 6, 23, 0.28);
                }

                .chatgpt-helper-theme-preview-bg {
                    position: absolute;
                    inset: -12px;
                    background-size: cover;
                    background-position: center;
                    filter: blur(var(--gh-preview-blur, 5px));
                    transform: scale(1.06);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .chatgpt-helper-theme-preview.has-bg .chatgpt-helper-theme-preview-bg {
                    opacity: 1;
                }

                .chatgpt-helper-theme-preview-inner {
                    position: relative;
                    z-index: 1;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 84px 1fr;
                    min-height: 350px;
                }

                .chatgpt-helper-theme-preview-nav {
                    padding: 12px 8px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);
                    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);
                }

                .chatgpt-helper-theme-preview-chat {
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .chatgpt-helper-theme-preview-msg {
                    border-radius: 12px;
                    padding: 10px 12px;
                    font-size: 13px;
                    line-height: 1.35;
                    max-width: 90%;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 28%);
                }

                .chatgpt-helper-theme-preview-msg.user {
                    margin-left: auto;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 18%);
                }

                .chatgpt-helper-theme-preview-msg.assistant {
                    background: color-mix(in srgb, var(--gh-theme-light, #ecf3ff), transparent 8%);
                }

                .chatgpt-helper-theme-preview-input {
                    margin-top: auto;
                    border-radius: 999px;
                    height: 34px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 0%);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);
                }

                @media (max-width: 980px) {
                    .chatgpt-helper-theme-modal-body {
                        grid-template-columns: 1fr;
                    }
                    .chatgpt-helper-theme-side {
                        border-left: none;
                        border-top: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    }
                }

                /* Quiet efficiency sidebar refresh */
                :root {
                    --gh-bg: #f9f9f9;
                    --gh-bg-secondary: #f3f3f3;
                    --gh-text: #0d0d0d;
                    --gh-text-secondary: rgba(13, 13, 13, 0.64);
                    --gh-border: rgba(0, 0, 0, 0.10);
                    --gh-hover: #ececec;
                    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    --gh-input-bg: #ffffff;
                    --gh-input-border: rgba(0, 0, 0, 0.10);
                    --gh-active-bg: #ececec;
                    --gh-panel-surface: linear-gradient(180deg, #f9f9f9 0%, #f9f9f9 100%);
                    --gh-panel-subtle: #f3f3f3;
                    --gh-panel-card: #ffffff;
                    --gh-panel-card-hover: #ececec;
                    --gh-panel-line: rgba(0, 0, 0, 0.10);
                    --gh-panel-muted-line: rgba(0, 0, 0, 0.06);
                    --gh-panel-elevated-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    --gh-panel-card-shadow: 0 1px 0 rgba(0, 0, 0, 0.025);
                    --gh-header-quiet-bg: var(--gh-panel-surface);
                    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #4285f4), transparent 72%);
                    --gh-control-bg: #ffffff;
                    --gh-control-bg-hover: #ececec;
                    --gh-control-border: rgba(0, 0, 0, 0.10);
                    --gh-control-radius: 8px;
                    --gh-card-radius: 8px;
                }

                :root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {
                    --gh-bg: #202123;
                    --gh-bg-secondary: #171717;
                    --gh-text: #ececf1;
                    --gh-text-secondary: rgba(236, 236, 241, 0.72);
                    --gh-border: rgba(255, 255, 255, 0.12);
                    --gh-hover: #2a2b2d;
                    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    --gh-input-bg: #2a2b2d;
                    --gh-input-border: rgba(255, 255, 255, 0.12);
                    --gh-active-bg: #343541;
                    --gh-panel-surface: linear-gradient(180deg, #202123 0%, #171717 100%);
                    --gh-panel-subtle: color-mix(in srgb, #202123, #ffffff 2%);
                    --gh-panel-card: color-mix(in srgb, #202123, #ffffff 5%);
                    --gh-panel-card-hover: color-mix(in srgb, #202123, #ffffff 9%);
                    --gh-panel-line: rgba(255, 255, 255, 0.12);
                    --gh-panel-muted-line: rgba(255, 255, 255, 0.07);
                    --gh-panel-elevated-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    --gh-panel-card-shadow: 0 1px 0 rgba(255, 255, 255, 0.035);
                    --gh-header-quiet-bg: var(--gh-panel-surface);
                    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #60a5fa), transparent 60%);
                    --gh-control-bg: color-mix(in srgb, #202123, #ffffff 5%);
                    --gh-control-bg-hover: color-mix(in srgb, #202123, #ffffff 9%);
                    --gh-control-border: rgba(255, 255, 255, 0.12);
                }

                #chatgpt-helper-right,
                body[data-gh-mode="light"] #chatgpt-helper-right,
                body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-panel-surface) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    box-shadow: var(--gh-shadow) !important;
                    color: var(--gh-text) !important;
                }

                #chatgpt-helper-resize-handle::after {
                    width: 1px;
                    background: var(--gh-panel-line) !important;
                }

                #chatgpt-helper-resize-handle:hover::after {
                    width: 2px;
                    background: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                }

                #chatgpt-helper-header,
                body[data-gh-mode="light"] #chatgpt-helper-header,
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    background: var(--gh-header-quiet-bg) !important;
                    color: var(--gh-text) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: none !important;
                }

                #chatgpt-helper-title {
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 650;
                    letter-spacing: 0;
                }

                #chatgpt-helper-title span:last-child {
                    color: var(--gh-text);
                }

                #chatgpt-helper-controls {
                    gap: var(--gh-header-controls-gap, 5px);
                }

                .chatgpt-helper-header-btn {
                    background: var(--gh-control-bg);
                    border: 1px solid var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    border-radius: var(--gh-control-radius);
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                }

                .chatgpt-helper-header-btn:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-header-btn:active {
                    transform: translateY(0);
                    box-shadow: none;
                }

                #chatgpt-helper-tabs,
                body[data-gh-mode="light"] #chatgpt-helper-tabs,
                body[data-gh-mode="dark"] #chatgpt-helper-tabs {
                    gap: 4px;
                    padding: 8px 10px 7px;
                    background: color-mix(in srgb, var(--gh-bg), var(--gh-bg-secondary) 36%) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 36%);
                    --tab-padding-h: 8px;
                    --tab-padding-v: 7px;
                    --tab-gap: 5px;
                    --tab-margin: 0px;
                }

                .chatgpt-helper-tab {
                    min-height: 34px;
                    border: 1px solid transparent;
                    border-bottom: 1px solid transparent;
                    border-radius: var(--gh-control-radius);
                    color: var(--gh-text-secondary);
                    font-size: 12.5px;
                    font-weight: 520;
                    line-height: 1.2;
                    letter-spacing: 0;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-tab:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: var(--gh-control-border);
                    color: var(--gh-text);
                }

                .chatgpt-helper-tab.active,
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    background: var(--gh-panel-card);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 58%);
                    color: var(--gh-text);
                    font-weight: 650;
                    box-shadow:
                        inset 0 -2px 0 color-mix(in srgb, var(--gh-primary), transparent 10%),
                        var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-tab-drag-handle,
                .chatgpt-helper-prompt-drag-handle::before {
                    letter-spacing: 0;
                }

                .chatgpt-helper-tab-drag-handle {
                    margin-right: 2px;
                    padding: 1px 2px;
                    opacity: 0.35;
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 18%);
                }

                .chatgpt-helper-tab:hover .chatgpt-helper-tab-drag-handle {
                    opacity: 0.72;
                }

                .chatgpt-helper-tab.drag-before,
                .chatgpt-helper-tab.drag-after {
                    border-color: var(--gh-primary);
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary), transparent 38%);
                }

                #chatgpt-helper-content,
                body[data-gh-mode="light"] #chatgpt-helper-content,
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-panel-surface) !important;
                }

                .chatgpt-helper-search-bar,
                body[data-gh-mode="light"] .chatgpt-helper-search-bar,
                body[data-gh-mode="dark"] .chatgpt-helper-search-bar,
                .chatgpt-helper-categories,
                body[data-gh-mode="light"] .chatgpt-helper-categories,
                body[data-gh-mode="dark"] .chatgpt-helper-categories,
                .outline-fixed-toolbar,
                .chatgpt-helper-conversations-search,
                .chatgpt-helper-conversations-toolbar,
                .chatgpt-helper-batch-toolbar,
                .chatgpt-helper-export-header {
                    background: var(--gh-panel-subtle) !important;
                    border-color: var(--gh-panel-line) !important;
                }

                .chatgpt-helper-search-bar {
                    padding: 12px 12px 10px;
                }

                .chatgpt-helper-search-input,
                .outline-search-input,
                .chatgpt-helper-conversations-search-input {
                    min-height: 38px;
                    border-radius: var(--gh-control-radius);
                    background: var(--gh-input-bg);
                    border-color: var(--gh-input-border);
                    color: var(--gh-text);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.36);
                    transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-search-input,
                body[data-gh-mode="dark"] .outline-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input {
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
                }

                .chatgpt-helper-search-input:focus,
                .outline-search-input:focus,
                .chatgpt-helper-conversations-search-input:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.32);
                }

                .chatgpt-helper-categories {
                    gap: 6px;
                    padding: 10px 12px 12px;
                }

                .chatgpt-helper-category-tag {
                    display: inline-flex;
                    align-items: center;
                    min-height: 28px;
                    padding: 0 11px;
                    border-radius: 999px;
                    background: var(--gh-control-bg);
                    border-color: var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    font-weight: 550;
                    line-height: 1;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-category-tag:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%);
                    color: var(--gh-text);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-category-tag.active,
                body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 18%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 22%);
                    color: #ffffff;
                    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 78%);
                }

                .chatgpt-helper-prompt-list,
                .chatgpt-helper-conversations-root,
                .outline-list-wrapper {
                    padding: 12px 10px 16px;
                }

                .chatgpt-helper-add-btn {
                    width: calc(100% - 0px);
                    min-height: 42px;
                    margin: 0 0 10px;
                    border-radius: var(--gh-card-radius);
                    background: color-mix(in srgb, var(--gh-primary), #ffffff 8%);
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 80%);
                    transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-add-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), #ffffff 7%);
                    transform: translateY(-1px);
                    box-shadow: 0 10px 22px color-mix(in srgb, var(--gh-primary), transparent 74%);
                }

                .chatgpt-helper-prompt-item,
                .chatgpt-helper-conversation-item,
                .chatgpt-helper-folder-item,
                .chatgpt-helper-setting-section,
                .chatgpt-helper-setting-item,
                .chatgpt-helper-about-btn,
                .chatgpt-helper-export-grid .menu-item {
                    background: var(--gh-panel-card) !important;
                    border-color: var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-item {
                    padding: 12px 12px 12px 10px;
                    margin-bottom: 8px;
                    transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-prompt-item:hover,
                .chatgpt-helper-conversation-item:hover,
                .chatgpt-helper-folder-item:hover,
                .chatgpt-helper-setting-item:hover,
                .chatgpt-helper-about-btn:hover,
                .chatgpt-helper-export-grid .menu-item:hover {
                    background: var(--gh-panel-card-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;
                    box-shadow: var(--gh-panel-elevated-shadow);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-item.selected,
                body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;
                    box-shadow:
                        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 78%),
                        var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-title {
                    margin-bottom: 5px;
                    font-size: 13.5px;
                    font-weight: 650;
                    line-height: 1.35;
                    color: var(--gh-text);
                }

                .chatgpt-helper-prompt-content {
                    font-size: 12px;
                    line-height: 1.45;
                    color: var(--gh-text-secondary);
                }

                .chatgpt-helper-prompt-actions {
                    gap: 5px;
                }

                .chatgpt-helper-prompt-actions button,
                .outline-toolbar-btn,
                .chatgpt-helper-conversations-toolbar-btn,
                .chatgpt-helper-batch-toolbar-btn,
                .scroll-nav-btn {
                    background: var(--gh-control-bg);
                    border: 1px solid var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    border-radius: var(--gh-control-radius);
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
                }

                .chatgpt-helper-prompt-actions button {
                    width: 25px;
                    height: 25px;
                    padding: 0;
                }

                .chatgpt-helper-prompt-actions button:hover,
                .outline-toolbar-btn:hover,
                .chatgpt-helper-conversations-toolbar-btn:hover,
                .chatgpt-helper-batch-toolbar-btn:hover,
                .scroll-nav-btn:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                    box-shadow: var(--gh-panel-card-shadow);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover {
                    color: var(--gh-danger);
                    border-color: color-mix(in srgb, var(--gh-danger), transparent 22%);
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%);
                }

                .outline-fixed-toolbar {
                    gap: 10px;
                    padding: 12px;
                }

                .outline-toolbar-row {
                    gap: 6px;
                }

                .outline-toolbar-btn {
                    width: 32px;
                    height: 32px;
                }

                .outline-toolbar-btn.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 16%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 16%);
                    color: #ffffff;
                    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 78%);
                }

                .outline-list {
                    gap: 3px;
                }

                .outline-item {
                    min-height: 32px;
                    padding-top: 6px;
                    padding-bottom: 6px;
                    border-radius: var(--gh-card-radius);
                    border-color: transparent;
                    line-height: 1.35;
                }

                .outline-item:hover {
                    background: var(--gh-panel-card-hover);
                    border-color: var(--gh-panel-muted-line);
                }

                .outline-item.sync-highlight,
                .outline-item.highlight,
                .outline-item.matched {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;
                    border-right: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;
                    border-radius: var(--gh-card-radius) !important;
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .outline-item.user-query-node,
                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 92%);
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);
                    border-left: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .outline-item.user-query-node:hover,
                body[data-gh-mode="dark"] .outline-item.user-query-node:hover {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card-hover) 86%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                }

                .user-query-badge,
                .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 84%);
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 72%);
                    border-radius: 999px;
                }

                body[data-gh-mode="dark"] .user-query-badge,
                body[data-gh-mode="dark"] .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    color: color-mix(in srgb, var(--gh-primary), #ffffff 24%);
                }

                .outline-item:hover .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    transform: none;
                }

                .outline-item-toggle {
                    color: var(--gh-text-secondary);
                }

                .outline-item-toggle:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 88%);
                    color: var(--gh-primary);
                }

                .scroll-nav-container,
                body[data-gh-mode="dark"] .scroll-nav-container {
                    gap: 8px;
                    padding: 10px 12px;
                    background: var(--gh-panel-subtle) !important;
                    border-top: 1px solid var(--gh-panel-line);
                }

                .scroll-nav-btn {
                    min-height: 38px;
                    padding: 8px 10px;
                    font-weight: 600;
                }

                .chatgpt-helper-quick-buttons {
                    gap: 8px;
                    padding: 7px;
                    background: color-mix(in srgb, var(--gh-bg), transparent 10%);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: 18px;
                    box-shadow: 0 12px 30px rgba(31, 36, 32, 0.12), 0 2px 8px rgba(31, 36, 32, 0.08);
                    backdrop-filter: blur(18px) saturate(1.04);
                    -webkit-backdrop-filter: blur(18px) saturate(1.04);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    background: color-mix(in srgb, var(--gh-bg), transparent 8%);
                    border-color: var(--gh-panel-line);
                    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.36), 0 2px 8px rgba(0, 0, 0, 0.26);
                }

                .chatgpt-helper-quick-btn,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {
                    border-radius: 12px;
                    border-color: var(--gh-control-border);
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
                }

                .chatgpt-helper-quick-btn:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 40%);
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-elevated-shadow);
                }

                .chatgpt-helper-quick-btn:active {
                    transform: translateY(0) scale(0.97);
                    box-shadow: none;
                }

                .chatgpt-helper-quick-btn.disabled,
                .chatgpt-helper-quick-btn[disabled] {
                    opacity: 0.38 !important;
                    cursor: default !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-quick-btn.disabled:hover,
                .chatgpt-helper-quick-btn[disabled]:hover {
                    transform: none;
                    border-color: var(--gh-control-border);
                    background: var(--gh-control-bg) !important;
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    margin: 2px 6px;
                    background: var(--gh-panel-muted-line);
                }

                #chatgpt-helper-right button:focus-visible,
                #chatgpt-helper-right input:focus-visible,
                #chatgpt-helper-right textarea:focus-visible,
                #chatgpt-helper-right select:focus-visible,
                .chatgpt-helper-quick-btn:focus-visible,
                .chatgpt-helper-prompt-dialog-btn:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                @media (prefers-reduced-motion: reduce) {
                    #chatgpt-helper-right,
                    #chatgpt-helper-right *,
                    .chatgpt-helper-quick-buttons,
                    .chatgpt-helper-quick-buttons * {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-header {
                    background: var(--gh-panel-surface) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header {
                    background: var(--gh-panel-card-bg) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-scroll,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-footer,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-root,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-panel {
                    background: transparent !important;
                    background-image: none !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="true"] .outline-search-input,
                :root[data-gh-bg-enabled="true"] .outline-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-select,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search-input,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .scroll-nav-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                    backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.default,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item.pinned,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar {
                    background: color-mix(in srgb, var(--gh-active-bg), transparent 28%) !important;
                    border-color: color-mix(in srgb, var(--gh-panel-card-border), transparent 18%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.expanded {
                    background: color-mix(in srgb, var(--gh-active-bg), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 24%) !important;
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 84%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item:hover,
                :root[data-gh-bg-enabled="true"] .scroll-nav-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-header {
                    background: var(--gh-panel-surface) !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-container,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-export-header {
                    background: var(--gh-panel-surface) !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-folder-select,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                }

                /* Theme-driven productivity UI refresh */
                :root {
                    --gh-control-radius: 8px;
                    --gh-card-radius: 8px;
                    --gh-row-radius: 7px;
                    --gh-panel-pad-x: 12px;
                    --gh-panel-pad-y: 10px;
                    --gh-fast-ease: cubic-bezier(0.2, 0, 0, 1);
                }

                .chatgpt-helper-svg-icon {
                    width: 1em;
                    height: 1em;
                    display: block;
                    pointer-events: none;
                }

                #chatgpt-helper-right,
                body[data-gh-mode="light"] #chatgpt-helper-right,
                body[data-gh-mode="dark"] #chatgpt-helper-right,
                :root[data-gh-page-theme="true"] #chatgpt-helper-right,
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
                    background: var(--gh-panel-surface) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    box-shadow: var(--gh-shadow) !important;
                    color: var(--gh-text) !important;
                    font-family: var(--gh-font-family, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
                }

                #chatgpt-helper-right,
                #chatgpt-helper-right button,
                #chatgpt-helper-right input,
                #chatgpt-helper-right textarea,
                #chatgpt-helper-right select,
                #chatgpt-helper-right option,
                #chatgpt-helper-right optgroup {
                    font-family: var(--gh-font-family, inherit) !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
                    backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;
                }

                #chatgpt-helper-header,
                body[data-gh-mode="light"] #chatgpt-helper-header,
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    min-height: 48px;
                    padding: var(--gh-header-padding-v, 9px) var(--gh-header-padding-h, 12px);
                    background: var(--gh-panel-surface) !important;
                    color: var(--gh-text) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: none !important;
                }

                #chatgpt-helper-title {
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0;
                }

                #chatgpt-helper-title span:last-child {
                    color: var(--gh-text);
                }

                #chatgpt-helper-controls {
                    gap: var(--gh-header-controls-gap, 5px);
                }

                .chatgpt-helper-header-btn,
                .prompt-panel-btn,
                .chatgpt-helper-theme-launch-btn,
                .chatgpt-helper-prompt-actions button,
                .outline-toolbar-btn,
                .chatgpt-helper-conversations-toolbar-btn,
                .chatgpt-helper-batch-toolbar-btn,
                .chatgpt-helper-folder-delete-btn,
                .scroll-nav-btn,
                .chatgpt-helper-about-close,
                .chatgpt-helper-theme-modal-close,
                .chatgpt-helper-quick-btn {
                    background: var(--gh-control-bg) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    color: var(--gh-text-secondary) !important;
                    border-radius: var(--gh-control-radius) !important;
                    box-shadow: none !important;
                    transition:
                        background 0.16s var(--gh-fast-ease),
                        border-color 0.16s var(--gh-fast-ease),
                        color 0.16s var(--gh-fast-ease),
                        transform 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease),
                        opacity 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-header-btn {
                    width: var(--gh-header-btn-size, 28px);
                    height: var(--gh-header-btn-size, 28px);
                    min-width: var(--gh-header-btn-size, 28px);
                    padding: 0;
                    font-size: var(--gh-header-btn-font-size, 14px);
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                .prompt-panel-btn.chatgpt-helper-order-btn {
                    width: 32px;
                    height: 32px;
                    min-width: 32px;
                    padding: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatgpt-helper-header-btn:hover,
                .prompt-panel-btn:hover,
                .chatgpt-helper-theme-launch-btn:hover,
                .chatgpt-helper-prompt-actions button:hover,
                .outline-toolbar-btn:hover,
                .chatgpt-helper-conversations-toolbar-btn:hover,
                .chatgpt-helper-batch-toolbar-btn:hover,
                .chatgpt-helper-folder-delete-btn:hover,
                .scroll-nav-btn:hover,
                .chatgpt-helper-about-close:hover,
                .chatgpt-helper-theme-modal-close:hover,
                .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    color: var(--gh-text) !important;
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow) !important;
                }

                .chatgpt-helper-header-btn:active,
                .prompt-panel-btn:active,
                .chatgpt-helper-theme-launch-btn:active,
                .chatgpt-helper-prompt-actions button:active,
                .outline-toolbar-btn:active,
                .chatgpt-helper-conversations-toolbar-btn:active,
                .chatgpt-helper-batch-toolbar-btn:active,
                .scroll-nav-btn:active,
                .chatgpt-helper-quick-btn:active {
                    transform: translateY(0);
                    box-shadow: none !important;
                }

                #chatgpt-helper-tabs,
                body[data-gh-mode="light"] #chatgpt-helper-tabs,
                body[data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,
                :root[data-gh-page-theme="true"] #chatgpt-helper-tabs {
                    gap: 4px;
                    padding: 8px 10px 7px;
                    background: var(--gh-panel-surface) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: none !important;
                    --tab-padding-h: 8px;
                    --tab-padding-v: 7px;
                    --tab-gap: 5px;
                    --tab-margin: 0px;
                }

                .chatgpt-helper-tab {
                    min-height: 34px;
                    border: 1px solid transparent !important;
                    border-radius: var(--gh-control-radius) !important;
                    color: var(--gh-text-secondary) !important;
                    font-size: 12.5px;
                    font-weight: 560;
                    letter-spacing: 0;
                    line-height: 1.2;
                    gap: 5px;
                    transition:
                        background 0.16s var(--gh-fast-ease),
                        border-color 0.16s var(--gh-fast-ease),
                        color 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-tab:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: var(--gh-control-border) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-tab.active,
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: var(--gh-control-border) !important;
                    color: var(--gh-text) !important;
                    font-weight: 650;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-line), transparent 45%) !important;
                }

                .chatgpt-helper-tab-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 62%);
                }

                .chatgpt-helper-tab-drag-handle {
                    opacity: 0.32;
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 22%);
                }

                #chatgpt-helper-content,
                .chatgpt-helper-content-panel,
                body[data-gh-mode="light"] #chatgpt-helper-content,
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-panel-surface) !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,
                :root[data-gh-page-theme="true"] #chatgpt-helper-content,
                :root[data-gh-page-theme="true"] .chatgpt-helper-content-panel {
                    background: transparent !important;
                    background-image: none !important;
                }

                .chatgpt-helper-search-bar,
                .chatgpt-helper-categories,
                .outline-fixed-toolbar,
                .chatgpt-helper-conversations-search,
                .chatgpt-helper-conversations-toolbar,
                .chatgpt-helper-batch-toolbar,
                .chatgpt-helper-export-header,
                .scroll-nav-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container {
                    background: var(--gh-panel-subtle) !important;
                    border-color: var(--gh-panel-line) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-line), transparent 42%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container {
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                }

                .chatgpt-helper-search-input,
                .outline-search-input,
                .chatgpt-helper-conversations-search-input,
                .chatgpt-helper-folder-select,
                #chatgpt-helper-right input,
                #chatgpt-helper-right textarea,
                #chatgpt-helper-right select {
                    min-height: 36px;
                    border-radius: var(--gh-control-radius) !important;
                    background: var(--gh-input-bg) !important;
                    border: 1px solid var(--gh-input-border) !important;
                    color: var(--gh-text) !important;
                    color-scheme: light;
                    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%) !important;
                    transition:
                        border-color 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease),
                        background 0.16s var(--gh-fast-ease);
                }

                #chatgpt-helper-right select option,
                #chatgpt-helper-right select optgroup {
                    background: var(--gh-bg, #ffffff) !important;
                    color: var(--gh-text, #1f2937) !important;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-search-input,
                body[data-gh-mode="dark"] .outline-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-folder-select,
                body[data-gh-mode="dark"] #chatgpt-helper-right input,
                body[data-gh-mode="dark"] #chatgpt-helper-right textarea,
                body[data-gh-mode="dark"] #chatgpt-helper-right select {
                    color-scheme: dark;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
                }

                body[data-gh-mode="dark"] #chatgpt-helper-right select option,
                body[data-gh-mode="dark"] #chatgpt-helper-right select optgroup,
                :root[data-gh-mode="dark"] #chatgpt-helper-right select option,
                :root[data-gh-mode="dark"] #chatgpt-helper-right select optgroup {
                    background: var(--gh-input-bg, #0f172a) !important;
                    color: var(--gh-text, #f8fafc) !important;
                }

                .chatgpt-helper-custom-select {
                    position: relative;
                    min-width: 150px;
                    max-width: 240px;
                    flex: 0 0 auto;
                    font-size: 14px;
                    color: var(--gh-text);
                }

                .chatgpt-helper-custom-select-trigger {
                    width: 100%;
                    min-height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    padding: 6px 10px 6px 12px;
                    border-radius: var(--gh-control-radius) !important;
                    background: var(--gh-input-bg) !important;
                    border: 1px solid var(--gh-input-border) !important;
                    color: var(--gh-text) !important;
                    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%) !important;
                    cursor: pointer;
                    text-align: left;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-custom-select-trigger {
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
                }

                .chatgpt-helper-custom-select-value {
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-custom-select-icon {
                    color: var(--gh-text-secondary);
                    font-size: 12px;
                    line-height: 1;
                    transition: transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-custom-select.open .chatgpt-helper-custom-select-icon {
                    transform: rotate(180deg);
                }

                .chatgpt-helper-custom-select-menu {
                    position: absolute;
                    z-index: 10020;
                    top: calc(100% + 6px);
                    right: 0;
                    width: 100%;
                    max-height: 190px;
                    overflow-y: auto;
                    display: none;
                    padding: 4px;
                    border-radius: var(--gh-control-radius);
                    background: var(--gh-bg) !important;
                    border: 1px solid var(--gh-input-border);
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.22);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-custom-select-menu,
                :root[data-gh-mode="dark"] .chatgpt-helper-custom-select-menu {
                    background: var(--gh-input-bg, #0f172a) !important;
                    box-shadow: 0 18px 42px rgba(2, 6, 23, 0.62);
                }

                .chatgpt-helper-custom-select.open .chatgpt-helper-custom-select-menu {
                    display: block;
                    position: static;
                    margin-top: 6px;
                }

                .chatgpt-helper-custom-select-option {
                    width: 100%;
                    min-height: 34px;
                    display: block;
                    padding: 7px 10px;
                    border: 0;
                    border-radius: calc(var(--gh-control-radius) - 2px);
                    background: transparent;
                    color: var(--gh-text);
                    cursor: pointer;
                    font: inherit;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-custom-select-option:hover,
                .chatgpt-helper-custom-select-option:focus {
                    outline: none;
                    background: var(--gh-hover);
                }

                .chatgpt-helper-custom-select-option.selected {
                    background: color-mix(in srgb, var(--gh-primary), transparent 72%);
                    color: var(--gh-text);
                    font-weight: 700;
                }

                .chatgpt-helper-search-input:focus,
                .outline-search-input:focus,
                .chatgpt-helper-conversations-search-input:focus,
                .chatgpt-helper-folder-select:focus,
                #chatgpt-helper-right input:focus,
                #chatgpt-helper-right textarea:focus,
                #chatgpt-helper-right select:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;
                    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 80%) !important;
                    outline: none !important;
                }

                .chatgpt-helper-prompt-list,
                .chatgpt-helper-conversations-root,
                .outline-list-wrapper,
                .chatgpt-helper-settings-scroll,
                .chatgpt-helper-export-container {
                    padding: 12px 10px 16px !important;
                }

                .chatgpt-helper-add-btn {
                    min-height: 40px;
                    margin: 0 0 10px;
                    border-radius: var(--gh-card-radius) !important;
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 18%) !important;
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                    font-weight: 700;
                }

                .chatgpt-helper-add-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 62%) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%) !important;
                }

                .chatgpt-helper-prompt-item,
                .chatgpt-helper-conversation-item,
                .chatgpt-helper-folder-item,
                .chatgpt-helper-conversations-list,
                .chatgpt-helper-setting-section,
                .chatgpt-helper-setting-item,
                .chatgpt-helper-about-btn,
                .chatgpt-helper-export-grid .menu-item,
                .outline-item.user-query-node,
                .chatgpt-helper-empty-state,
                .chatgpt-helper-theme-block {
                    background: var(--gh-panel-card) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius) !important;
                    box-shadow: var(--gh-panel-card-shadow) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item,
                :root[data-gh-bg-enabled="true"] .outline-item.user-query-node,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-empty-state,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-theme-block {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                }

                .chatgpt-helper-prompt-item:hover,
                .chatgpt-helper-conversation-item:hover,
                .chatgpt-helper-folder-item:hover,
                .chatgpt-helper-setting-item:hover,
                .chatgpt-helper-about-btn:hover,
                .chatgpt-helper-export-grid .menu-item:hover,
                .outline-item:hover {
                    background: var(--gh-panel-card-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;
                    box-shadow: var(--gh-panel-elevated-shadow) !important;
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-item.selected,
                .chatgpt-helper-folder-item.default,
                .chatgpt-helper-folder-item.expanded,
                .chatgpt-helper-conversation-item.pinned,
                .outline-item.sync-highlight,
                .outline-item.highlight,
                .outline-item.matched,
                .outline-toolbar-btn.active,
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 82%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;
                    color: var(--gh-text) !important;
                    box-shadow:
                        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 80%),
                        var(--gh-panel-card-shadow) !important;
                }

                .outline-toolbar-btn.active,
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    color: #ffffff !important;
                    background: color-mix(in srgb, var(--gh-primary), transparent 10%) !important;
                }

                .chatgpt-helper-prompt-title,
                .chatgpt-helper-folder-name,
                .chatgpt-helper-setting-item-label,
                .chatgpt-helper-about-name,
                .chatgpt-helper-theme-block-title {
                    color: var(--gh-text) !important;
                    letter-spacing: 0;
                }

                .chatgpt-helper-prompt-content,
                .chatgpt-helper-setting-item-desc,
                .chatgpt-helper-folder-count,
                .chatgpt-helper-about-tagline,
                .chatgpt-helper-about-section-text {
                    color: var(--gh-text-secondary) !important;
                }

                .chatgpt-helper-conversation-pin {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 20%);
                    opacity: 0.84;
                }

                .chatgpt-helper-conversation-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin-top: 6px;
                }

                .chatgpt-helper-conversation-tag {
                    display: inline-flex;
                    align-items: center;
                    max-width: 100%;
                    min-height: 18px;
                    padding: 2px 6px;
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 78%);
                    border: 1px solid color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 64%);
                    color: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), var(--gh-text) 38%);
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-category-tag,
                .user-query-badge,
                .heading-level-badge {
                    background: var(--gh-control-bg) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    color: var(--gh-text-secondary) !important;
                    border-radius: 999px !important;
                    font-weight: 650;
                }

                .chatgpt-helper-category-tag:hover,
                .user-query-badge:hover,
                .heading-level-badge:hover {
                    background: var(--gh-control-bg-hover) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-category-tag.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 8px 18px color-mix(in srgb, var(--gh-primary), transparent 80%) !important;
                }

                .outline-list {
                    gap: 3px;
                }

                .outline-item {
                    min-height: 32px;
                    border-radius: var(--gh-row-radius) !important;
                    border: 1px solid transparent !important;
                    color: var(--gh-text) !important;
                }

                .outline-item-toggle,
                .outline-item-copy-btn {
                    color: var(--gh-text-secondary) !important;
                }

                .outline-item-toggle:hover,
                .outline-item-copy-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 88%) !important;
                    color: var(--gh-primary) !important;
                }

                .chatgpt-helper-setting-section {
                    padding: 0 !important;
                    overflow: visible;
                    margin-bottom: 12px !important;
                }

                .chatgpt-helper-setting-section-header {
                    background: transparent !important;
                    border-bottom: 1px solid var(--gh-panel-muted-line) !important;
                }

                .chatgpt-helper-setting-item {
                    margin: 8px 0 !important;
                    padding: 12px !important;
                }

                .setting-toggle {
                    background: color-mix(in srgb, var(--gh-border), transparent 24%) !important;
                    border: 1px solid var(--gh-control-border) !important;
                }

                .setting-toggle.active {
                    background: var(--gh-primary) !important;
                    border-color: var(--gh-primary) !important;
                }

                .chatgpt-helper-toggle {
                    width: 44px;
                    height: 24px;
                    padding: 2px;
                    border: 1px solid var(--gh-control-border);
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-border), transparent 24%);
                    cursor: pointer;
                    position: relative;
                    outline: none;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-toggle.active {
                    background: var(--gh-primary);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 10%);
                    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .chatgpt-helper-toggle-knob {
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #f8fafc) 10%);
                    box-shadow: 0 1px 4px rgba(2, 6, 23, 0.22);
                    pointer-events: none;
                    transition: transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-toggle.active .chatgpt-helper-toggle-knob {
                    transform: translateX(20px);
                }

                #chatgpt-helper-theme-modal {
                    background: color-mix(in srgb, #020617, transparent 20%) !important;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .chatgpt-helper-theme-modal-dialog,
                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                    background: var(--gh-panel-surface) !important;
                    color: var(--gh-text) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 14px !important;
                    box-shadow: 0 30px 90px rgba(2, 6, 23, 0.48), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 88%) !important;
                }

                .chatgpt-helper-prompt-dialog-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    background: color-mix(in srgb, #020617, transparent 22%);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }

                .chatgpt-helper-prompt-dialog {
                    width: min(500px, calc(100vw - 32px));
                    max-height: min(680px, calc(100vh - 32px));
                    overflow: auto;
                    padding: 18px;
                    background: var(--gh-panel-surface);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: 14px;
                    box-shadow: 0 28px 80px rgba(2, 6, 23, 0.42), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 86%);
                }

                .chatgpt-helper-compact-dialog {
                    width: min(420px, calc(100vw - 32px));
                }

                .chatgpt-helper-prompt-dialog-title {
                    margin: 0 0 14px;
                    color: var(--gh-text);
                    font-size: 16px;
                    font-weight: 750;
                    line-height: 1.35;
                    letter-spacing: 0;
                }

                .chatgpt-helper-prompt-dialog-field {
                    width: 100%;
                    min-height: 38px;
                    margin: 0 0 10px;
                    padding: 10px 11px;
                    box-sizing: border-box;
                    border-radius: var(--gh-control-radius);
                    border: 1px solid var(--gh-input-border);
                    background: var(--gh-input-bg);
                    color: var(--gh-text);
                    font-size: 14px;
                    line-height: 1.4;
                    outline: none;
                    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), background 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-prompt-dialog-field::placeholder {
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 12%);
                }

                .chatgpt-helper-prompt-dialog-field:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                    box-shadow: 0 0 0 3px var(--gh-focus-ring);
                }

                .chatgpt-helper-prompt-dialog-textarea {
                    min-height: 132px;
                    resize: vertical;
                    font-family: inherit;
                }

                .chatgpt-helper-prompt-dialog-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    margin-top: 4px;
                }

                .chatgpt-helper-prompt-dialog-btn {
                    min-height: 36px;
                    padding: 0 14px;
                    border-radius: var(--gh-control-radius);
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 700;
                    border: 1px solid var(--gh-control-border);
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-prompt-dialog-btn.secondary {
                    background: var(--gh-control-bg);
                    color: var(--gh-text-secondary);
                }

                .chatgpt-helper-prompt-dialog-btn.primary {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 36%);
                    color: #ffffff;
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .chatgpt-helper-prompt-dialog-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-dialog-btn.secondary:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                }

                .chatgpt-helper-prompt-dialog-btn.primary:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 64%);
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%);
                }

                .chatgpt-helper-context-menu {
                    z-index: 10001;
                    min-width: 168px;
                    padding: 5px;
                    background: var(--gh-panel-card);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: var(--gh-control-radius);
                    box-shadow: var(--gh-panel-elevated-shadow);
                    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                }

                .chatgpt-helper-context-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    min-height: 32px;
                    padding: 0 10px;
                    border-radius: 7px;
                    color: var(--gh-text-secondary);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1;
                    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-context-menu-item:hover {
                    background: var(--gh-control-bg-hover);
                    color: var(--gh-text);
                }

                .chatgpt-helper-context-menu-item.danger {
                    color: color-mix(in srgb, var(--gh-danger), var(--gh-text-secondary) 30%);
                }

                .chatgpt-helper-context-menu-item.danger:hover {
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%);
                    color: var(--gh-danger);
                }

                .chatgpt-helper-toast {
                    position: fixed;
                    left: 50%;
                    bottom: 20px;
                    z-index: 10120;
                    max-width: min(420px, calc(100vw - 32px));
                    padding: 10px 14px;
                    transform: translateX(-50%);
                    background: var(--gh-panel-card);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: var(--gh-control-radius);
                    box-shadow: var(--gh-panel-elevated-shadow);
                    font-size: 13px;
                    font-weight: 650;
                    line-height: 1.35;
                    text-align: center;
                    animation: fadeIn 0.2s var(--gh-fast-ease);
                    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                }

                .chatgpt-helper-loading-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: color-mix(in srgb, #020617, transparent 18%);
                    color: var(--gh-text);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .chatgpt-helper-loading-spinner {
                    width: 34px;
                    height: 34px;
                    margin-bottom: 14px;
                    border-radius: 999px;
                    border: 3px solid color-mix(in srgb, var(--gh-primary), transparent 78%);
                    border-top-color: color-mix(in srgb, var(--gh-primary), #ffffff 18%);
                    animation: ghSpin 0.9s linear infinite;
                }

                .chatgpt-helper-loading-text {
                    margin-bottom: 6px;
                    font-size: 15px;
                    font-weight: 700;
                    color: #ffffff;
                }

                .chatgpt-helper-loading-hint {
                    margin-bottom: 14px;
                    color: rgba(255, 255, 255, 0.72);
                    font-size: 12px;
                }

                .chatgpt-helper-loading-stop-btn {
                    min-height: 34px;
                    padding: 0 14px;
                    border-radius: var(--gh-control-radius);
                    border: 1px solid color-mix(in srgb, #ffffff, transparent 72%);
                    background: color-mix(in srgb, #ffffff, transparent 90%);
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-loading-stop-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 32%);
                    transform: translateY(-1px);
                }

                @keyframes ghSpin {
                    to { transform: rotate(360deg); }
                }

                .chatgpt-helper-theme-modal-header,
                .chatgpt-helper-about-header {
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-theme-side,
                .chatgpt-helper-theme-preset-grid,
                .chatgpt-helper-theme-upload,
                .chatgpt-helper-theme-row,
                .chatgpt-helper-theme-preview {
                    background: var(--gh-panel-card) !important;
                    border-color: var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius) !important;
                }

                .chatgpt-helper-theme-segment {
                    background: var(--gh-control-bg) !important;
                    border-color: var(--gh-control-border) !important;
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-theme-segment button {
                    color: var(--gh-text-secondary) !important;
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                    color: #ffffff !important;
                }

                .chatgpt-helper-theme-preset {
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-theme-preset.active {
                    box-shadow:
                        0 0 0 2px var(--gh-panel-surface),
                        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 20%),
                        var(--gh-panel-card-shadow) !important;
                }

                #chatgpt-helper-theme-modal {
                    padding: 18px !important;
                    background: color-mix(in srgb, #020617, transparent 22%) !important;
                    backdrop-filter: blur(8px) saturate(1.02) !important;
                    -webkit-backdrop-filter: blur(8px) saturate(1.02) !important;
                }

                .chatgpt-helper-theme-modal-dialog,
                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                    width: min(1040px, calc(100vw - 32px)) !important;
                    height: min(760px, calc(100vh - 32px)) !important;
                    background: var(--gh-panel-surface) !important;
                    color: var(--gh-text) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 14px !important;
                    box-shadow: 0 26px 72px color-mix(in srgb, #020617, transparent 52%) !important;
                }

                .chatgpt-helper-theme-modal-header {
                    height: 52px !important;
                    min-height: 52px !important;
                    padding: 0 14px 0 16px !important;
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line) !important;
                }

                .chatgpt-helper-theme-modal-title {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    min-width: 0;
                    color: var(--gh-text);
                    font-size: 15px;
                    font-weight: 750;
                    line-height: 1;
                    letter-spacing: 0;
                }

                .chatgpt-helper-theme-modal-title-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 16%);
                    flex: 0 0 auto;
                }

                .chatgpt-helper-theme-modal-close {
                    width: 32px !important;
                    height: 32px !important;
                    padding: 0 !important;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--gh-control-radius) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text-secondary) !important;
                    box-shadow: none !important;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-modal-close:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 44%) !important;
                    color: var(--gh-text) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-modal-close:focus-visible,
                .chatgpt-helper-theme-launch-btn:focus-visible,
                .chatgpt-helper-theme-segment button:focus-visible,
                .chatgpt-helper-theme-preset:focus-visible,
                .chatgpt-helper-theme-row input:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                .chatgpt-helper-theme-modal-body {
                    grid-template-columns: minmax(420px, 1fr) minmax(340px, 420px) !important;
                    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 24%) !important;
                    overflow: hidden !important;
                }

                .chatgpt-helper-theme-main {
                    padding: 14px 18px 18px 16px !important;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    min-width: 0;
                    overflow: auto !important;
                    scrollbar-gutter: stable;
                }

                .chatgpt-helper-theme-workbench-preview {
                    padding: 14px !important;
                    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 10%) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    overflow: auto !important;
                    scrollbar-gutter: stable;
                }

                .chatgpt-helper-theme-main,
                .chatgpt-helper-theme-workbench-preview,
                .chatgpt-helper-theme-modal-body {
                    scrollbar-width: thin;
                    scrollbar-color: color-mix(in srgb, var(--gh-text-secondary), transparent 48%) transparent;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-button,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-button,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-button {
                    width: 0;
                    height: 0;
                    display: none;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-track,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-track,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-track {
                    background: transparent;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-thumb,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-thumb,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-thumb {
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-text-secondary), transparent 54%);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }

                .chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block,
                .chatgpt-helper-theme-workbench-preview {
                    margin: 0 !important;
                    border-radius: 10px !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block {
                    padding: 13px !important;
                    background: color-mix(in srgb, var(--gh-panel-card), transparent 8%) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                }

                .chatgpt-helper-theme-block-title {
                    margin: 0 0 10px !important;
                    color: var(--gh-text);
                    font-size: 12px !important;
                    font-weight: 750 !important;
                    line-height: 1.2;
                    letter-spacing: 0;
                }

                .chatgpt-helper-theme-segment {
                    width: 100%;
                    height: 36px;
                    display: grid !important;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    padding: 3px;
                    gap: 3px;
                    border-radius: 9px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    overflow: visible !important;
                }

                .chatgpt-helper-theme-segment button {
                    min-width: 0;
                    padding: 0 10px !important;
                    border: 0 !important;
                    border-radius: 7px !important;
                    background: transparent !important;
                    color: var(--gh-text-secondary) !important;
                    font-size: 12px !important;
                    font-weight: 700 !important;
                    line-height: 1;
                    white-space: nowrap;
                    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-segment button:hover {
                    background: var(--gh-control-bg-hover) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                }

                .chatgpt-helper-theme-preset-grid {
                    display: flex !important;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px !important;
                    padding: 0 !important;
                    background: transparent !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    overflow: visible !important;
                    isolation: isolate;
                }

                .chatgpt-helper-theme-preset {
                    flex: 0 0 58px;
                    width: 58px !important;
                    height: 34px !important;
                    min-width: 0;
                    padding: 0 !important;
                    border-radius: 8px !important;
                    border: 1px solid color-mix(in srgb, currentColor, var(--gh-panel-card) 40%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 82%) !important;
                    transform: none !important;
                    position: relative;
                    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), opacity 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-preset:hover {
                    transform: none !important;
                    opacity: 0.92;
                }

                .chatgpt-helper-theme-preset.active {
                    z-index: 2;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 8%) !important;
                    box-shadow:
                        0 0 0 2px var(--gh-panel-card),
                        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 36%) !important;
                }

                .chatgpt-helper-theme-preset.is-original {
                    flex-basis: 132px;
                    width: 132px !important;
                    min-width: 0 !important;
                    max-width: 160px;
                    padding: 0 12px !important;
                    color: var(--gh-text) !important;
                    background: linear-gradient(
                        135deg,
                        color-mix(in srgb, var(--gh-panel-card), var(--gh-primary) 10%),
                        color-mix(in srgb, var(--gh-panel-subtle), var(--gh-text-secondary) 12%)
                    ) !important;
                    font-size: 11px !important;
                    font-weight: 750 !important;
                    letter-spacing: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .chatgpt-helper-theme-upload {
                    height: 146px !important;
                    min-height: 0 !important;
                    padding: 12px !important;
                    border: 1px dashed color-mix(in srgb, var(--gh-control-border), var(--gh-primary) 14%) !important;
                    border-radius: 10px !important;
                    background: var(--gh-control-bg) !important;
                    box-shadow: none !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-upload.dragging {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-control-bg) 82%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-upload-bg {
                    filter: brightness(0.72) saturate(0.95) !important;
                    opacity: 0.9 !important;
                }

                .chatgpt-helper-theme-upload.has-image::after {
                    background: linear-gradient(
                        180deg,
                        color-mix(in srgb, #020617, transparent 58%) 0%,
                        color-mix(in srgb, #020617, transparent 32%) 100%
                    ) !important;
                }

                .chatgpt-helper-theme-upload-content {
                    gap: 6px !important;
                }

                .chatgpt-helper-theme-upload-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);
                }

                .chatgpt-helper-theme-upload-title {
                    color: var(--gh-text);
                    font-size: 13px;
                    font-weight: 750;
                    line-height: 1.25;
                }

                .chatgpt-helper-theme-upload-hint {
                    color: var(--gh-text-secondary);
                    font-size: 11px;
                    line-height: 1.25;
                }

                .chatgpt-helper-theme-upload-actions {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 7px;
                    margin-top: 4px;
                }

                .chatgpt-helper-theme-launch-btn {
                    min-height: 31px !important;
                    padding: 0 10px !important;
                    border-radius: var(--gh-control-radius) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none !important;
                    font-size: 12px !important;
                    font-weight: 700 !important;
                    letter-spacing: 0 !important;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-launch-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-launch-btn:disabled {
                    opacity: 0.42;
                    cursor: default;
                }

                .chatgpt-helper-theme-row {
                    display: grid !important;
                    grid-template-columns: minmax(150px, 1fr) minmax(192px, 242px);
                    align-items: center !important;
                    min-height: 42px;
                    margin: 8px 0 0 !important;
                    padding: 8px 10px !important;
                    gap: 10px !important;
                    border-radius: 9px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: color-mix(in srgb, var(--gh-control-bg), transparent 8%) !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-theme-row > span:first-child {
                    min-width: 0;
                    color: var(--gh-text);
                    font-size: 12px;
                    font-weight: 650;
                    line-height: 1.3;
                }

                .chatgpt-helper-theme-range-control {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 42px;
                    align-items: center;
                    gap: 8px;
                    justify-self: end;
                    width: min(100%, 242px);
                }

                .chatgpt-helper-theme-value {
                    min-width: 42px;
                    color: var(--gh-text-secondary);
                    font-size: 11px;
                    font-weight: 700;
                    text-align: right;
                    font-variant-numeric: tabular-nums;
                }

                .chatgpt-helper-theme-row input[type="range"] {
                    width: 100% !important;
                    height: 4px;
                    accent-color: var(--gh-primary);
                    cursor: pointer;
                }

                .chatgpt-helper-theme-row input[type="range"]:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                }

                .chatgpt-helper-theme-row input[type="checkbox"] {
                    justify-self: end;
                    width: 40px !important;
                    height: 22px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: color-mix(in srgb, var(--gh-border), transparent 28%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 90%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]::after {
                    top: 2px !important;
                    left: 2px !important;
                    width: 16px !important;
                    height: 16px !important;
                    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #ffffff) 10%) !important;
                    box-shadow: 0 1px 3px color-mix(in srgb, #020617, transparent 74%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 8%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked::after {
                    transform: translateX(18px) !important;
                }

                .chatgpt-helper-theme-preview {
                    width: 100%;
                    min-height: 328px !important;
                    max-height: min(430px, calc(100vh - 174px));
                    aspect-ratio: 4 / 3;
                    border-radius: 10px !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    background: var(--gh-panel-card) !important;
                    box-shadow: none !important;
                    overflow: hidden !important;
                    isolation: isolate;
                }

                .chatgpt-helper-theme-preview-bg {
                    z-index: 0;
                    background-position: center 42% !important;
                    filter: blur(calc(var(--gh-preview-blur, 0px) + 1px)) brightness(0.62) saturate(0.9) !important;
                    opacity: 0.92 !important;
                }

                .chatgpt-helper-theme-preview.has-bg::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    background:
                        linear-gradient(90deg, color-mix(in srgb, #020617, transparent 40%) 0%, transparent 34%),
                        linear-gradient(180deg, transparent 42%, color-mix(in srgb, #020617, transparent 34%) 100%);
                }

                .chatgpt-helper-theme-preview-inner {
                    grid-template-columns: 82px minmax(0, 1fr) !important;
                    min-height: 100% !important;
                    height: 100%;
                    z-index: 1;
                }

                .chatgpt-helper-theme-preview-nav {
                    padding: 12px 8px !important;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-preview-chat {
                    padding: 13px !important;
                    gap: 10px !important;
                    min-width: 0;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-preview-msg {
                    border-radius: 10px !important;
                    padding: 9px 10px !important;
                    color: var(--gh-text);
                    font-size: 12px !important;
                    line-height: 1.35 !important;
                    box-shadow: none !important;
                    max-width: min(84%, 290px) !important;
                    overflow-wrap: anywhere;
                }

                .chatgpt-helper-theme-preview-input {
                    width: calc(100% - 10px);
                    height: 33px !important;
                    margin: auto 5px 8px;
                    border-radius: 10px !important;
                    background: var(--gh-input-bg) !important;
                    border: 1px solid var(--gh-input-border) !important;
                    box-shadow: 0 0 0 3px color-mix(in srgb, #020617, transparent 88%) !important;
                }

                @media (max-width: 920px) {
                    .chatgpt-helper-theme-modal-dialog,
                    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                        height: min(820px, calc(100vh - 24px)) !important;
                    }

                    .chatgpt-helper-theme-modal-body {
                        grid-template-columns: 1fr !important;
                        overflow: auto !important;
                    }

                    .chatgpt-helper-theme-workbench-preview {
                        border-left: 0 !important;
                        border-top: 1px solid var(--gh-panel-line) !important;
                    }

                    .chatgpt-helper-theme-workbench-preview .chatgpt-helper-theme-block-title {
                        position: static;
                    }
                }

                @media (max-width: 560px) {
                    #chatgpt-helper-theme-modal {
                        padding: 10px !important;
                    }

                    .chatgpt-helper-theme-modal-dialog,
                    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                        width: calc(100vw - 20px) !important;
                        height: calc(100vh - 20px) !important;
                    }

                    .chatgpt-helper-theme-main,
                    .chatgpt-helper-theme-workbench-preview {
                        padding: 10px !important;
                    }

                    .chatgpt-helper-theme-row {
                        align-items: flex-start;
                        grid-template-columns: 1fr;
                    }

                    .chatgpt-helper-theme-range-control {
                        width: 100%;
                        flex-basis: auto;
                        grid-template-columns: minmax(0, 1fr) 42px;
                    }

                    .chatgpt-helper-theme-preview-inner {
                        grid-template-columns: 64px minmax(0, 1fr) !important;
                    }
                }

                .chatgpt-helper-export-panel,
                .chatgpt-helper-export-container,
                .chatgpt-helper-export-host {
                    background: transparent !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-export-header {
                    min-height: 46px;
                    padding: 10px 12px !important;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px !important;
                    font-weight: 700 !important;
                    color: var(--gh-text) !important;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
                    box-sizing: border-box;
                }

                .chatgpt-helper-export-header-title {
                    line-height: 1;
                }

                .chatgpt-helper-export-host :is(button, input, select, textarea),
                [data-gh-exporter-host="true"] :is(button, input, select, textarea) {
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-export-grid {
                    padding: 12px 14px 18px !important;
                    gap: 7px !important;
                    grid-template-columns: minmax(0, 1fr) !important;
                    align-content: start !important;
                    grid-auto-rows: minmax(50px, auto) !important;
                }

                .chatgpt-helper-export-grid > :is(.row-full, .row-half) {
                    grid-column: auto !important;
                }

                .chatgpt-helper-export-grid > :is(.row-full, .row-half):not(.menu-item) {
                    display: contents !important;
                    grid-column: auto !important;
                }

                .chatgpt-helper-export-grid .menu-item {
                    min-height: 50px !important;
                    height: auto !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    margin: 0 !important;
                    padding: 0 13px !important;
                    gap: 11px !important;
                    border-radius: 9px !important;
                    border: 1px solid color-mix(in srgb, var(--gh-panel-line), transparent 20%) !important;
                    background: color-mix(in srgb, var(--gh-panel-card), transparent 18%) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none !important;
                    text-align: left !important;
                    overflow: hidden;
                    box-sizing: border-box !important;
                    transform: none !important;
                }

                .chatgpt-helper-export-grid .menu-item:hover {
                    background: color-mix(in srgb, var(--gh-panel-card-hover), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-export-grid .menu-item-icon {
                    width: 24px !important;
                    height: 24px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    flex: 0 0 24px !important;
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%) !important;
                }

                .chatgpt-helper-export-grid .menu-item-icon svg,
                .chatgpt-helper-export-grid .menu-item > svg {
                    width: 17px !important;
                    height: 17px !important;
                    color: currentColor !important;
                    flex: 0 0 auto !important;
                }

                .chatgpt-helper-export-grid .menu-item-label {
                    min-width: 0 !important;
                    flex: 1 1 auto !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    color: var(--gh-text) !important;
                    font-size: 14px !important;
                    font-weight: 680 !important;
                    line-height: 1.25 !important;
                }

                .scroll-nav-container,
                body[data-gh-mode="dark"] .scroll-nav-container {
                    gap: 8px;
                    padding: 10px 12px;
                    background: var(--gh-panel-surface) !important;
                    border-top: 1px solid var(--gh-panel-line) !important;
                }

                .scroll-nav-btn {
                    min-height: 36px;
                    padding: 8px 10px;
                    font-weight: 700;
                    gap: 6px;
                }

                .scroll-nav-btn[style*="opacity: 0.4"],
                .chatgpt-helper-quick-btn.disabled,
                .chatgpt-helper-quick-btn[disabled],
                .prompt-panel-btn[disabled] {
                    opacity: 0.38 !important;
                    cursor: default !important;
                    box-shadow: none !important;
                }

                .scroll-nav-btn[style*="opacity: 0.4"]:hover,
                .chatgpt-helper-quick-btn.disabled:hover,
                .chatgpt-helper-quick-btn[disabled]:hover,
                .prompt-panel-btn[disabled]:hover {
                    transform: none !important;
                    border-color: var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                }

                .chatgpt-helper-quick-buttons,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    gap: 8px;
                    padding: 7px;
                    background: color-mix(in srgb, var(--gh-panel-surface), transparent 8%) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 16px !important;
                    box-shadow: var(--gh-panel-elevated-shadow) !important;
                    backdrop-filter: blur(18px) saturate(1.04);
                    -webkit-backdrop-filter: blur(18px) saturate(1.04);
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    margin: 2px 6px;
                    background: var(--gh-panel-muted-line) !important;
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover,
                .chatgpt-helper-folder-delete-btn:hover,
                .chatgpt-helper-batch-toolbar-btn.danger:hover {
                    color: var(--gh-danger) !important;
                    border-color: color-mix(in srgb, var(--gh-danger), transparent 28%) !important;
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%) !important;
                }

                .chatgpt-helper-prompt-toolbar {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 12px 9px;
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line) !important;
                    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 58%);
                    flex: 0 0 auto;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-toolbar {
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                }

                .chatgpt-helper-prompt-search-bar {
                    position: relative;
                    flex: 1 1 auto;
                    min-width: 0;
                    padding: 0 !important;
                    border: 0 !important;
                    background: transparent !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-prompt-search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--gh-text-secondary);
                    pointer-events: none;
                    opacity: 0.72;
                    z-index: 1;
                }

                .chatgpt-helper-prompt-search-bar .chatgpt-helper-search-input {
                    padding-left: 34px !important;
                    padding-right: 10px !important;
                    min-height: 36px !important;
                    font-size: 13px !important;
                }

                .chatgpt-helper-add-btn-compact {
                    width: auto !important;
                    min-width: 38px;
                    max-width: 124px;
                    min-height: 36px !important;
                    margin: 0 !important;
                    padding: 0 11px !important;
                    flex: 0 0 auto;
                    border-radius: var(--gh-control-radius) !important;
                    gap: 6px;
                    overflow: hidden;
                    font-size: 12.5px !important;
                    font-weight: 720 !important;
                }

                .chatgpt-helper-add-btn-compact span {
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-prompt-categories {
                    padding: 7px 12px 8px !important;
                    gap: 5px !important;
                    align-items: center;
                    flex-wrap: nowrap !important;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                }

                .chatgpt-helper-prompt-categories::-webkit-scrollbar {
                    display: none;
                }

                .chatgpt-helper-category-tag {
                    font: inherit;
                    appearance: none;
                    -webkit-appearance: none;
                    text-align: center;
                    white-space: nowrap;
                    flex: 0 0 auto;
                }

                .chatgpt-helper-prompt-categories .chatgpt-helper-category-tag {
                    min-height: 23px !important;
                    padding: 0 8px !important;
                    border-radius: 999px !important;
                    font-size: 11.5px !important;
                    font-weight: 650 !important;
                    line-height: 1 !important;
                    letter-spacing: 0 !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-prompt-categories .chatgpt-helper-category-tag.active,
                body[data-gh-mode="dark"] .chatgpt-helper-prompt-categories .chatgpt-helper-category-tag.active {
                    box-shadow: 0 3px 10px color-mix(in srgb, var(--gh-primary), transparent 84%) !important;
                }

                .chatgpt-helper-prompt-list {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    padding: 9px 10px 16px !important;
                }

                .chatgpt-helper-prompt-item {
                    min-height: 68px;
                    margin-bottom: 0 !important;
                    padding: 10px 10px 10px 34px !important;
                    overflow: hidden;
                    isolation: isolate;
                }

                .chatgpt-helper-prompt-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 10px;
                    bottom: 10px;
                    width: 3px;
                    border-radius: 0 999px 999px 0;
                    background: transparent;
                    transition: background 0.16s var(--gh-fast-ease), opacity 0.16s var(--gh-fast-ease);
                    opacity: 0;
                }

                .chatgpt-helper-prompt-item:hover::before {
                    background: color-mix(in srgb, var(--gh-primary), transparent 46%);
                    opacity: 1;
                }

                .chatgpt-helper-prompt-item.selected::before {
                    background: var(--gh-primary);
                    opacity: 1;
                }

                .chatgpt-helper-prompt-content-wrapper {
                    min-width: 0;
                    margin-left: 0 !important;
                    padding-right: 56px !important;
                    position: relative;
                }

                .chatgpt-helper-prompt-item-header {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    min-width: 0;
                    margin-bottom: 4px;
                }

                .chatgpt-helper-prompt-title {
                    flex: 1 1 auto;
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 13px !important;
                    font-weight: 710 !important;
                    line-height: 1.3;
                }

                .chatgpt-helper-prompt-category-pill {
                    max-width: 104px;
                    min-height: 20px;
                    padding: 0 6px;
                    border-radius: 999px;
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 70%);
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%);
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 28%);
                    font: inherit;
                    font-size: 10.5px;
                    font-weight: 700;
                    line-height: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    flex: 0 1 auto;
                }

                .chatgpt-helper-prompt-category-pill:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 82%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%);
                }

                .chatgpt-helper-prompt-content {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    white-space: normal !important;
                    text-overflow: clip !important;
                    font-size: 12px !important;
                    line-height: 1.42 !important;
                }

                .chatgpt-helper-prompt-actions {
                    top: -1px !important;
                    right: 0 !important;
                    gap: 5px !important;
                    opacity: 0.72;
                    transition: opacity 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-actions,
                .chatgpt-helper-prompt-item:focus-within .chatgpt-helper-prompt-actions {
                    opacity: 1;
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-actions button {
                    width: 26px !important;
                    height: 26px !important;
                    border-radius: 7px !important;
                    background: color-mix(in srgb, var(--gh-panel-card), transparent 10%) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    color: var(--gh-text-secondary) !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-prompt-actions .edit-btn:hover {
                    color: var(--gh-primary) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 38%) !important;
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%) !important;
                }

                .chatgpt-helper-prompt-drag-handle {
                    left: 8px !important;
                    width: 18px !important;
                    opacity: 0.28;
                }

                .chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-drag-handle,
                .chatgpt-helper-prompt-item:focus-within .chatgpt-helper-prompt-drag-handle {
                    opacity: 0.86;
                }

                .chatgpt-helper-prompt-empty {
                    margin: 6px 0;
                    padding: 28px 18px !important;
                    min-height: 210px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    text-align: center;
                }

                .chatgpt-helper-prompt-empty-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%);
                    opacity: 0.86;
                }

                .chatgpt-helper-prompt-empty-title {
                    color: var(--gh-text);
                    font-size: 14px;
                    font-weight: 750;
                    line-height: 1.3;
                }

                .chatgpt-helper-prompt-empty-desc {
                    max-width: 220px;
                    color: var(--gh-text-secondary);
                    font-size: 12.5px;
                    line-height: 1.45;
                }

                .chatgpt-helper-empty-add-btn {
                    width: auto !important;
                    min-height: 34px !important;
                    margin: 6px 0 0 !important;
                    padding: 0 12px !important;
                    border-radius: var(--gh-control-radius) !important;
                }

                #chatgpt-helper-right button:focus-visible,
                #chatgpt-helper-right input:focus-visible,
                #chatgpt-helper-right textarea:focus-visible,
                #chatgpt-helper-right select:focus-visible,
                .chatgpt-helper-quick-btn:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                @media (prefers-reduced-motion: reduce) {
                    #chatgpt-helper-right,
                    #chatgpt-helper-right *,
                    .chatgpt-helper-quick-buttons,
                    .chatgpt-helper-quick-buttons * {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }
                }

                /* 响应式调整中栏 - 通过 JS 动态更新 */
            `;
                try {
                    if (document.head) {
                        document.head.appendChild(style);
                    } else {
                        // 如果 head 不存在，等待它出现
                        const waitForHead = () => {
                            if (document.head) {
                                document.head.appendChild(style);
                            } else {
                                setTimeout(waitForHead, 100);
                            }
                        };
                        waitForHead();
                    }
                } catch (e) {
                    console.error('[ChatGPT Helper] 添加样式到 head 错误:', e);
                }
            } catch (e) {
                console.error('[ChatGPT Helper] createStyles 错误:', e);
                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
            }
        }
    });
})();
