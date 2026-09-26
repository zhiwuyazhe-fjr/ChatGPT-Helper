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
        syncExporterLanguage() {
            const exporterLang = getCurrentLang() === 'zh-CN' ? 'zh-Hans' : 'en-US';
            try {
                window.GM_setValue('exporter:language', JSON.stringify(exporterLang));
            } catch (e) {
                console.warn('[ChatGPT Helper] Failed to persist exporter language:', e);
            }

            const namespaceSync = window.__MY_EXT__?.ChatGPTExporterSetLanguage;
            const windowSync = window.ChatGPTExporterSetLanguage;
            if (typeof namespaceSync === 'function') {
                namespaceSync(exporterLang);
            } else if (typeof windowSync === 'function') {
                windowSync(exporterLang);
            }

            try {
                window.dispatchEvent(new CustomEvent('chatgpt-helper-language-changed', {
                    detail: { language: exporterLang }
                }));
            } catch (e) {
                // ignore
            }
        },

        // 按需加载导出引擎：jszip / html2canvas / chatgpt-exporter 不再随页面加载，
        // 首次进入导出页时请求 service worker 注入，减小 ChatGPT 页面的脚本解析负担
        async ensureExporterEngine() {
            const isReady = () => {
                const mount = (window.__MY_EXT__ && window.__MY_EXT__.ChatGPTExporterMount) ||
                    window.ChatGPTExporterMount;
                return typeof mount === 'function';
            };
            if (isReady()) return true;
            // 并发守卫：快速切换两次导出页时不重复注入
            if (this._exporterEnginePromise) return this._exporterEnginePromise;

            this._exporterEnginePromise = (async () => {
                const runtime = (typeof chrome !== 'undefined' && chrome.runtime) ||
                    (typeof browser !== 'undefined' && browser.runtime);
                if (!runtime || !runtime.id || typeof runtime.sendMessage !== 'function') {
                    // 非扩展环境（本地测试页）：引擎需由页面自行加载
                    console.warn('[ChatGPT Helper] 当前环境无法按需注入导出引擎');
                    return isReady();
                }
                try {
                    await new Promise((resolve) => {
                        try {
                            runtime.sendMessage({ type: 'ch-helper-inject-export-deps' }, () => {
                                // 读取 lastError，避免未检查错误告警；注入失败会在后续轮询中暴露
                                void (chrome.runtime && chrome.runtime.lastError);
                                resolve();
                            });
                        } catch (e) {
                            resolve();
                        }
                    });
                } catch (e) {
                    console.warn('[ChatGPT Helper] 请求注入导出引擎失败:', e);
                }
                // 注入本身是异步的，轮询等待挂载函数就绪（最多约 6 秒）
                for (let i = 0; i < 60; i++) {
                    if (isReady()) return true;
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
                return isReady();
            })();

            try {
                return await this._exporterEnginePromise;
            } finally {
                this._exporterEnginePromise = null;
            }
        },

        renderExport(container) {
            // 通过 class 控制 flex 布局，避免 inline style 覆盖 display:none
            container.classList.add('chatgpt-helper-export-panel');
            this.syncExporterLanguage();

            // 创建导出内容容器（标题由顶部 Tab 承担，不再重复展示）
            const exportContainer = createElement('div', {
                className: 'chatgpt-helper-export-container',
                id: 'chatgpt-helper-export-container',
                style: {
                    flex: '1',
                    overflow: 'auto',
                    overflowX: 'hidden',
                    padding: '0',
                    minHeight: '0',
                    position: 'relative',
                    boxSizing: 'border-box'
                }
            });
            container.appendChild(exportContainer);

            const loadingEl = createElement('div', {
                className: 'chatgpt-helper-export-engine-loading'
            }, this.t('exportEngineLoading'));
            // 引擎已就绪时不显示加载态，避免闪烁
            const alreadyReady = typeof ((window.__MY_EXT__ && window.__MY_EXT__.ChatGPTExporterMount) ||
                window.ChatGPTExporterMount) === 'function';
            if (!alreadyReady) {
                exportContainer.appendChild(loadingEl);
            }

            // 先确保导出引擎已注入，再进入挂载轮询
            this.ensureExporterEngine().then((ready) => {
                if (!this.panel || !this.panel.isConnected) return;
                if (loadingEl.parentNode) loadingEl.remove();
                if (!ready) {
                    exportContainer.appendChild(createElement('div', {
                        className: 'chatgpt-helper-export-engine-error'
                    }, this.t('exportEngineInjectFailed')));
                    return;
                }
                this.tryMountExporter(exportContainer);
            }).catch((e) => {
                console.error('[ChatGPT Helper] ensureExporterEngine 异常:', e);
                if (loadingEl.parentNode) loadingEl.remove();
                this.tryMountExporter(exportContainer);
            });
        },

        tryMountExporter(exportContainer) {
            // 延迟挂载 Exporter，确保 DOM 结构已建立，并重试直到找到函数
            let retryCount = 0;
            const maxRetries = 30; // 最多重试 30 次（约 3 秒）
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
                            console.log('[ChatGPT Helper] 导出模块挂载成功');
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] 挂载导出模块失败:', e);
                        exportContainer.appendChild(createElement('div', {
                            style: { padding: '12px', fontSize: '13px', color: 'var(--gh-text-secondary)' }
                        }, this.t('exportModuleLoadFailed')));
                    }
                } else if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(tryMount, 100);
                } else {
                    console.warn('[ChatGPT Helper] ChatGPTExporterMount 未找到，当前状态:', {
                        hasMyExt: !!window.__MY_EXT__,
                        hasNamespaceMount: typeof window.__MY_EXT__?.ChatGPTExporterMount === 'function',
                        hasWindowMount: typeof window.ChatGPTExporterMount === 'function'
                    });
                    exportContainer.appendChild(createElement('div', {
                        style: { padding: '12px', fontSize: '13px', color: 'var(--gh-text-secondary)' }
                    }, this.t('exportModuleMissing')));
                }
            };
            setTimeout(tryMount, 200); // 延迟 200ms 开始尝试
        }
    });
})();
