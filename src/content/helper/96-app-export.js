// Chrome Extension Content Script - ChatGPT Helper App Export
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
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Export module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        renderExport(container) {
            // 通过 class 控制 flex 布局，避免 inline style 覆盖 display:none
            container.classList.add('chatgpt-helper-export-panel');

            // 先创建标题栏
            const titleBar = createElement('div', {
                className: 'chatgpt-helper-export-header',
                id: 'chatgpt-helper-export-header'
            });
            titleBar.appendChild(createSvgIconNode('export', {
                size: 16,
                className: 'chatgpt-helper-export-header-icon'
            }));
            titleBar.appendChild(createElement('span', {
                className: 'chatgpt-helper-export-header-title'
            }, this.t('tabExport') || '导出'));

            // 先添加标题栏到容器
            container.appendChild(titleBar);

            // 创建导出内容容器
            const exportContainer = createElement('div', {
                className: 'chatgpt-helper-export-container',
                id: 'chatgpt-helper-export-container',
                style: {
                    flex: '1',
                    overflow: 'auto',
                    padding: '0',
                    minHeight: '0',
                    position: 'relative',
                    boxSizing: 'border-box'
                }
            });
            container.appendChild(exportContainer);

            // 延迟挂载 Exporter，确保 DOM 结构已建立，并重试直到找到函数
            let retryCount = 0;
            const maxRetries = 50; // 最多重试 50 次（约 5 秒）
            const tryMount = () => {
                // 优先从命名空间获取，否则从 window 获取
                const exporterMount =
                    (window.__MY_EXT__ && window.__MY_EXT__.ChatGPTExporterMount)
                        ? window.__MY_EXT__.ChatGPTExporterMount
                        : window.ChatGPTExporterMount;

                if (exporterMount && typeof exporterMount === 'function') {
                    try {
                        console.log('[ChatGPT Helper] 找到 ChatGPTExporterMount，开始挂载');
                        const mountedContainer = exporterMount(exportContainer);
                        if (mountedContainer) {
                            // 确保挂载的容器不会覆盖标题栏
                            mountedContainer.style.width = '100%';
                            mountedContainer.style.height = '100%';
                            mountedContainer.style.overflow = 'auto';
                            mountedContainer.classList.add('chatgpt-helper-export-host');
                            mountedContainer.setAttribute('data-gh-exporter-host', 'true');
                            exportContainer.setAttribute('data-gh-exporter-container', 'true');
                            console.log('[ChatGPT Helper] ChatGPT Exporter 挂载成功');
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] 挂载 ChatGPT Exporter 失败:', e);
                        exportContainer.appendChild(createElement('div', {
                            style: { padding: '12px', fontSize: '13px', color: 'var(--gh-text-secondary)' }
                        }, '导出模块加载失败，请检查 ChatGPT Exporter 脚本是否正常运行。'));
                    }
                } else if (retryCount < maxRetries) {
                    retryCount++;
                    if (retryCount % 10 === 0) {
                        console.log(`[ChatGPT Helper] 等待 ChatGPTExporterMount... (${retryCount}/${maxRetries})`);
                    }
                    setTimeout(tryMount, 100); // 每 100ms 重试一次
                } else {
                    console.warn('[ChatGPT Helper] ChatGPTExporterMount 未找到，当前状态:', {
                        hasMyExt: !!window.__MY_EXT__,
                        hasNamespaceMount: typeof window.__MY_EXT__?.ChatGPTExporterMount === 'function',
                        hasWindowMount: typeof window.ChatGPTExporterMount === 'function'
                    });
                    exportContainer.appendChild(createElement('div', {
                        style: { padding: '12px', fontSize: '13px', color: 'var(--gh-text-secondary)' }
                    }, '未检测到 ChatGPT Exporter，请确保扩展已正确加载。'));
                }
            };
            setTimeout(tryMount, 200); // 延迟 200ms 开始尝试
        }
    });
})();
