// Chrome Extension Content Script - ChatGPT Helper Copy Manager
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
        TabRenameManager,
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;

    // ==================== 阶段3：复制管理器 ====================

    /**
     * 复制管理器
     * 负责公式双击复制、表格 Markdown 复制等功能
     */
    class CopyManager {
        constructor(settings, showToastFunc, i18n) {
            this.settings = settings;
            this.showToast = showToastFunc || (() => { });
            this.t = i18n || ((key) => key);
            this.formulaCopyInitialized = false;
            this.tableCopyInitialized = false;
            this.formulaDblClickHandler = null;
            this.tableObserver = null;
            this.injectedButtons = new Set();
        }

        // ==================== Formula Copy ====================

        /**
         * 初始化公式双击复制功能
         * 适配 ChatGPT 的公式元素结构
         */
        initFormulaCopy() {
            if (this.formulaCopyInitialized) return;
            this.formulaCopyInitialized = true;

            // 注入 CSS
            const styleId = 'chatgpt-helper-formula-copy-style';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    /* ChatGPT 公式元素选择器 */
                    [class*="katex"], 
                    [class*="math"], 
                    .katex-display,
                    .katex-html {
                        user-select: none !important;
                        cursor: pointer !important;
                    }
                    [class*="katex"]:hover, 
                    [class*="math"]:hover,
                    .katex-display:hover {
                        outline: 2px solid var(--gh-primary, #10a37f);
                        outline-offset: 2px;
                        border-radius: 4px;
                    }
                `;
                document.head.appendChild(style);
            }

            // 双击事件委托处理
            this.formulaDblClickHandler = (e) => {
                // ChatGPT 使用 KaTeX 渲染公式
                const mathEl = e.target.closest('[class*="katex"], [class*="math"], .katex-display');
                if (!mathEl) return;

                let latex = null;

                // 方法1: 尝试从 data 属性获取
                latex = mathEl.getAttribute('data-latex') ||
                    mathEl.getAttribute('data-math') ||
                    mathEl.getAttribute('data-formula');

                // 方法2: 尝试从 KaTeX 的 annotation 元素获取
                if (!latex) {
                    const annotation = mathEl.querySelector('[data-latex], [data-math], annotation[encoding="application/x-tex"]');
                    if (annotation) {
                        latex = annotation.getAttribute('data-latex') ||
                            annotation.getAttribute('data-math') ||
                            annotation.textContent;
                    }
                }

                // 方法3: 尝试从 KaTeX 的 aria-label 获取
                if (!latex) {
                    const ariaLabel = mathEl.getAttribute('aria-label');
                    if (ariaLabel) {
                        latex = ariaLabel;
                    }
                }

                // 方法4: 尝试从文本内容提取（作为最后手段）
                if (!latex) {
                    const text = mathEl.textContent || mathEl.innerText;
                    if (text && text.trim()) {
                        // 尝试提取 LaTeX 格式的文本
                        latex = text.trim();
                    }
                }

                if (!latex) {
                    console.warn('[FormulaCopy] No LaTeX found');
                    return;
                }

                // 清理 LaTeX（移除可能的转义字符）
                latex = latex.trim().replace(/^\\\(|\\\)$/g, '').replace(/^\\\[|\\\]$/g, '');

                const isBlock = mathEl.classList.contains('katex-display') ||
                    mathEl.offsetHeight > 40 ||
                    mathEl.closest('[class*="block"]');
                const copyText = isBlock ? `$$${latex}$$` : `$${latex}$`;

                navigator.clipboard
                    .writeText(copyText)
                    .then(() => {
                        this.showToast(this.t('formulaCopied'));
                    })
                    .catch((err) => {
                        console.error('[FormulaCopy] Copy failed:', err);
                        this.showToast(this.t('copyFailed'));
                    });

                e.preventDefault();
                e.stopPropagation();
            };

            document.addEventListener('dblclick', this.formulaDblClickHandler, true);
        }

        /**
         * 销毁公式双击复制功能
         */
        destroyFormulaCopy() {
            this.formulaCopyInitialized = false;

            const style = document.getElementById('chatgpt-helper-formula-copy-style');
            if (style) style.remove();

            if (this.formulaDblClickHandler) {
                document.removeEventListener('dblclick', this.formulaDblClickHandler, true);
                this.formulaDblClickHandler = null;
            }
        }

        // ==================== Table Copy ====================

        /**
         * 初始化表格 Markdown 复制功能
         */
        initTableCopy() {
            if (this.tableCopyInitialized) return;
            this.tableCopyInitialized = true;

            // 注入 CSS
            const styleId = 'chatgpt-helper-table-copy-style';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    .chatgpt-helper-table-copy-btn {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        width: 28px;
                        height: 28px;
                        border: none;
                        border-radius: 6px;
                        background: var(--gh-bg-secondary, rgba(255,255,255,0.9));
                        color: var(--gh-text, #374151);
                        cursor: pointer;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0.7;
                        transition: opacity 0.2s, background 0.2s, transform 0.2s;
                        z-index: 10;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    .chatgpt-helper-table-container:hover .chatgpt-helper-table-copy-btn,
                    table:hover .chatgpt-helper-table-copy-btn {
                        opacity: 1;
                    }
                    .chatgpt-helper-table-copy-btn:hover {
                        background: var(--gh-primary, #10a37f);
                        color: white;
                        transform: scale(1.1);
                    }
                    .chatgpt-helper-table-container {
                        position: relative;
                    }
                `;
                document.head.appendChild(style);
            }

            // 使用 MutationObserver 监听新表格
            this.tableObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // 检查新添加的节点是否是表格
                            if (node.tagName === 'TABLE') {
                                this.injectTableButton(node);
                            }
                            // 检查新添加的节点内是否包含表格
                            const tables = node.querySelectorAll && node.querySelectorAll('table');
                            if (tables) {
                                tables.forEach(table => this.injectTableButton(table));
                            }
                        }
                    });
                });
            });

            this.tableObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 初始化已存在的表格
            document.querySelectorAll('table').forEach(table => {
                this.injectTableButton(table);
            });
        }

        /**
         * 为表格注入复制按钮
         */
        injectTableButton(table) {
            if (this.injectedButtons.has(table)) return;
            this.injectedButtons.add(table);

            try {
                // 找到表格容器
                let container = table.parentElement;
                if (!container) return;

                // 确保容器有相对定位
                if (getComputedStyle(container).position === 'static') {
                    container.style.position = 'relative';
                }
                container.classList.add('chatgpt-helper-table-container');

                // 检查是否已有按钮
                if (container.querySelector('.chatgpt-helper-table-copy-btn')) return;

                const btn = document.createElement('button');
                btn.className = 'chatgpt-helper-table-copy-btn';
                btn.appendChild(createSvgIconNode('list', { size: 14 }));
                btn.title = this.t('copyAsMarkdown');

                btn.addEventListener('mouseenter', () => {
                    btn.style.opacity = '1';
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.opacity = '0.7';
                });

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const markdown = this.tableToMarkdown(table);
                    navigator.clipboard
                        .writeText(markdown)
                        .then(() => {
                            this.showToast(this.t('tableCopied'));
                            setButtonIcon(btn, 'check', { size: 14 });
                            setTimeout(() => {
                                setButtonIcon(btn, 'list', { size: 14 });
                            }, 1000);
                        })
                        .catch((err) => {
                            console.error('[TableCopy] Copy failed:', err);
                            this.showToast(this.t('copyFailed'));
                        });
                });

                container.appendChild(btn);
            } catch (err) {
                console.error('[TableCopy] Error injecting button:', err);
            }
        }

        /**
         * 表格转 Markdown
         */
        tableToMarkdown(table) {
            const rows = table.querySelectorAll('tr');
            if (rows.length === 0) return '';

            const lines = [];
            let headerProcessed = false;

            const getCellContent = (cell) => {
                let text = cell.innerText || cell.textContent || '';

                // 处理公式：尝试提取 LaTeX
                const mathElements = cell.querySelectorAll('[class*="katex"], [class*="math"]');
                mathElements.forEach(mathEl => {
                    const latex = mathEl.getAttribute('data-latex') ||
                        mathEl.getAttribute('data-math') ||
                        mathEl.getAttribute('aria-label') ||
                        mathEl.textContent;
                    if (latex) {
                        // 替换公式文本为 LaTeX
                        text = text.replace(mathEl.textContent, `$${latex}$`);
                    }
                });

                // 清理文本：转义管道符和换行
                return text.trim()
                    .replace(/\|/g, '\\|')
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ') || '';
            };

            rows.forEach((row, rowIndex) => {
                const cells = row.querySelectorAll('th, td');
                if (cells.length === 0) return;

                const cellTexts = Array.from(cells).map(getCellContent);
                lines.push('| ' + cellTexts.join(' | ') + ' |');

                // 处理表头分隔符
                if (!headerProcessed && (row.querySelector('th') || rowIndex === 0)) {
                    const alignments = Array.from(cells).map((cell) => {
                        const style = getComputedStyle(cell);
                        const textAlign = style.textAlign;
                        if (textAlign === 'center') return ':---:';
                        if (textAlign === 'right') return '---:';
                        return '---';
                    });
                    lines.push('| ' + alignments.join(' | ') + ' |');
                    headerProcessed = true;
                }
            });

            return lines.join('\n');
        }

        /**
         * 销毁表格复制功能
         */
        destroyTableCopy() {
            this.tableCopyInitialized = false;

            if (this.tableObserver) {
                this.tableObserver.disconnect();
                this.tableObserver = null;
            }

            const style = document.getElementById('chatgpt-helper-table-copy-style');
            if (style) style.remove();

            // 清理所有注入的按钮
            document.querySelectorAll('.chatgpt-helper-table-copy-btn').forEach(btn => btn.remove());
            document.querySelectorAll('.chatgpt-helper-table-container').forEach(container => {
                container.classList.remove('chatgpt-helper-table-container');
            });

            this.injectedButtons.clear();
        }

        /**
         * 初始化所有复制功能
         */
        init() {
            if (this.settings.formulaCopy?.enabled !== false) {
                this.initFormulaCopy();
            }
            if (this.settings.tableCopy?.enabled !== false) {
                this.initTableCopy();
            }
        }

        /**
         * 销毁所有复制功能
         */
        destroy() {
            this.destroyFormulaCopy();
            this.destroyTableCopy();
        }
    }
    Object.assign(H, {
        CopyManager
    });
})();
