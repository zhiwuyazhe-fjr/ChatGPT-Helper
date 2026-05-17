// Chrome Extension Content Script - ChatGPT Helper App Outline
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
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Outline module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        refreshOutline() {
            const panel = this.panel.querySelector('#outline-content');
            if (panel && this.currentTab === 'outline') {
                this.renderOutline(panel);
            }
        },

        renderOutline(container) {
            // 阶段2：使用OutlineManager
            if (!this.outlineManager) {
                // 创建一个适配器对象，同时提供 siteAdapter 接口和 scrollManager 接口
                const siteAdapterWrapper = {
                    getScrollContainer: () => this.scrollManager?.container || this.adapter.getResponseContainer(),
                    extractUserQueryText: (element) => {
                        // 从用户消息元素中提取完整文本
                        if (!element) return '';
                        // 查找用户消息的文本内容
                        const textContent = element.textContent || element.innerText || '';
                        return textContent.trim();
                    },
                    ...this.adapter
                };

                this.outlineManager = new OutlineManager({
                    container: container,
                    settings: this.settings,
                    siteAdapter: siteAdapterWrapper,
                    onJumpBefore: () => {
                        this.anchorManager.setAnchor(this.scrollManager.scrollTop);
                    },
                    onAutoUpdate: () => this.refreshOutline(),
                    onSettingsChange: (newSettings) => {
                        if (!this.settings.outline) this.settings.outline = {};
                        Object.assign(this.settings.outline, newSettings);
                        this.saveSettings();
                    },
                    // 使用全局 i18n 函数，确保大纲工具栏在中英文模式下的提示文案一致生效
                    i18n: t
                });
            }

            // 修复：确保容器引用正确（切换Tab后容器可能变化）
            if (this.outlineManager.container !== container) {
                this.outlineManager.container = container;
                // 修复：如果容器变化，需要重新创建UI（因为clearElement清空了容器）
                this.outlineManager.createUI();
            } else {
                // 修复：检查UI是否存在，如果不存在则重新创建
                const outlineList = document.getElementById('outline-list');
                if (!outlineList) {
                    this.outlineManager.createUI();
                }
            }

            // 提取大纲数据
            const outline = this.extractOutline();
            if (outline && outline.length > 0) {
                this.outlineManager.update(outline);
                // 设置激活状态
                this.outlineManager.setActive(this.currentTab === 'outline');
            } else {
                // 如果没有大纲，显示提示
                clearElement(container);
                const emptyMsg = createElement('div', {
                    style: {
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: 'var(--gh-text-secondary)',
                        fontSize: '14px'
                    }
                }, '暂无大纲内容，请等待对话生成或刷新页面');
                container.appendChild(emptyMsg);
            }
        },

        extractOutline() {
            const outline = [];

            try {
                // 首先检查是否在对话页面（URL包含 /c/ 表示在对话页面）
                const isInConversationPage = window.location.pathname.includes('/c/');
                if (!isInConversationPage) {
                    // 不在对话页面，返回空数组
                    return [];
                }
                
                // 只从 ChatGPT 的"助手回复"消息中提取标题，避免干扰元素
                const messages = this.adapter.getChatMessages();
                if (!messages || messages.length === 0) {
                    // 如果没有消息，返回空数组，不显示任何内容
                    return [];
                }
                
                // 检查是否真的在对话页面中（有实际的消息内容）
                // 避免在没有选择对话时显示会话标题
                const responseContainer = this.adapter.getResponseContainer();
                if (!responseContainer || responseContainer.children.length === 0) {
                    return [];
                }
                
                // 进一步验证：确保消息真的在对话容器中，而不是在侧边栏中
                // 检查消息是否在 responseContainer 内部
                const validMessages = Array.from(messages).filter(msg => {
                    return responseContainer.contains(msg) || msg.closest('main');
                });
                
                if (validMessages.length === 0) {
                    // 没有有效的消息在对话容器中，返回空数组
                    return [];
                }

                const headingSelectors = [
                    'h1, h2, h3, h4, h5, h6',
                    '[role="heading"]'
                ];

                // 使用验证过的消息列表
                validMessages.forEach((msg, msgIndex) => {
                    const role = msg.getAttribute('data-message-author-role');
                    const isAssistant = role === 'assistant' || role === 'system' || !role;
                    const isUser = role === 'user';

                    // 1) 助手回复中的标题 -> 大纲主节点
                    if (isAssistant) {
                        const headingsInMsg = [];
                        for (const selector of headingSelectors) {
                            const found = Array.from(msg.querySelectorAll(selector));
                            if (found.length > 0) {
                                headingsInMsg.push(...found);
                                break;
                            }
                        }

                        headingsInMsg.forEach((h) => {
                            if (!h) return;
                            if (h.offsetParent === null && h.style.display === 'none') return;

                            const text = (h.innerText || h.textContent || '').trim().replace(/\s+/g, ' ');
                            if (!text) return;

                            let level = 3;
                            const tagMatch = h.tagName && h.tagName.match(/^H([1-6])$/i);
                            if (tagMatch) {
                                level = parseInt(tagMatch[1], 10);
                            } else {
                                const ariaLevel = h.getAttribute('aria-level');
                                if (ariaLevel) {
                                    const parsed = parseInt(ariaLevel, 10);
                                    if (!Number.isNaN(parsed)) level = parsed;
                                }
                            }

                            outline.push({
                                level: Math.max(1, Math.min(6, level)),
                                text,
                                element: h,
                                isUserQuery: false,
                                index: outline.length
                            });
                        });

                        // 如果没有显式标题，为了便于折叠，使用回答的第一段文本生成一个一级大纲项
                        if (headingsInMsg.length === 0) {
                            const firstBlock = msg.querySelector('p, li, div');
                            if (firstBlock) {
                                const raw = (firstBlock.innerText || firstBlock.textContent || '').trim();
                                if (raw) {
                                    const text = raw.length > 80 ? raw.slice(0, 80) + '…' : raw;
                                    outline.push({
                                        level: 1,
                                        text,
                                        element: firstBlock,
                                        isUserQuery: false,
                                        index: outline.length
                                    });
                                }
                            }
                        }
                    }

                    // 2) 用户提问（可选） -> level 0 节点
                    if (this.settings.outline?.showUserQueries && isUser) {
                        const text = (msg.innerText || msg.textContent || '').trim();
                        if (text) {
                            const cleanText = text.replace(/\s+/g, ' ');
                            outline.push({
                                level: 0,
                                text: cleanText.length > 100 ? cleanText.slice(0, 100) + '...' : cleanText,
                                element: msg,
                                isUserQuery: true,
                                index: outline.length
                            });
                        }
                    }
                });

                // 按在页面中的垂直位置排序，保证顺序与对话一致
                outline.sort((a, b) => {
                    try {
                        const aRect = a.element?.getBoundingClientRect();
                        const bRect = b.element?.getBoundingClientRect();
                        if (!aRect || !bRect) return 0;
                        return aRect.top - bRect.top;
                    } catch {
                        return 0;
                    }
                });

            } catch (error) {
                console.error('[ChatGPT Helper] 提取大纲时出错:', error);
            }

            return outline;
        }
    });
})();
