// Chrome Extension Content Script - ChatGPT Helper App Controls And Events
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
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Controls And Events module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
            this.panel.classList.toggle('collapsed', this.isCollapsed);
            this.updateCollapseButtonState();

            // 折叠按钮已移除，只保留侧边栏按钮

            // 更新侧边按钮组显示和位置
            const quickButtons = document.getElementById('chatgpt-helper-quick-buttons');
            if (quickButtons) {
                if (this.isCollapsed) {
                    quickButtons.classList.remove('hidden');
                    quickButtons.classList.add('collapsed');
                    quickButtons.style.right = '8px';
                    quickButtons.style.display = 'flex';
                } else {
                    quickButtons.classList.add('hidden');
                    quickButtons.classList.remove('collapsed');
                    quickButtons.style.right = `${this.settings.panelWidth + 20}px`;
                    quickButtons.style.display = 'none';
                }
            } else {
                // 如果按钮组不存在，重新创建
                this.createCollapsedButtons();
            }

            // 更新布局
            if (this.updateLayout) {
                this.updateLayout();
            }

            // 更新设置
            this.settings.defaultPanelState = !this.isCollapsed;
            this.saveSettings();
        },

        createCollapsedButtons() {
            // 移除已存在的按钮组
            const existing = document.getElementById('chatgpt-helper-quick-buttons');
            if (existing) existing.remove();

            // 创建侧边按钮组
            const btnGroup = createElement('div', {
                id: 'chatgpt-helper-quick-buttons',
                className: 'chatgpt-helper-quick-buttons' + (this.isCollapsed ? ' collapsed' : ' hidden')
            });

            // 设置初始位置和显示状态
            if (this.isCollapsed) {
                btnGroup.style.right = '8px';
                btnGroup.style.display = 'flex';
                btnGroup.classList.remove('hidden');
                btnGroup.classList.add('collapsed');
            } else {
                btnGroup.style.right = `${this.settings.panelWidth + 20}px`;
                btnGroup.style.display = 'none';
                btnGroup.classList.add('hidden');
                btnGroup.classList.remove('collapsed');
            }

            const btnOrder = this.settings.collapsedButtonsOrder || DEFAULT_COLLAPSED_BUTTONS_ORDER;
            const quickButtons = {};

            btnOrder.forEach((btnConfig, index) => {
                const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
                if (!def) return;

                // 检查功能是否启用
                if (btnConfig.id === 'anchor' && this.settings.anchorEnabled === false) return;
                if (btnConfig.id === 'theme' && this.settings.themeEnabled === false) return;
                if (btnConfig.id === 'manualAnchor' && this.settings.manualAnchorEnabled === false) return;

                const isEnabled = def.canToggle ? (btnConfig.enabled !== false) : true;
                if (!isEnabled) return;

                // 添加分隔线（在类型切换时）
                if (index > 0 && def.isPanelOnly && !COLLAPSED_BUTTON_DEFS[btnOrder[index - 1].id]?.isPanelOnly) {
                    btnGroup.appendChild(createElement('div', { className: 'chatgpt-helper-btn-divider' }));
                }

                if (btnConfig.id === 'manualAnchor') {
                    // 手动锚点按钮组
                    const setBtn = createElement('button', {
                        className: 'chatgpt-helper-quick-btn',
                        title: this.t('setAnchor'),
                        id: 'manual-anchor-set-btn',
                        type: 'button',
                        'aria-label': this.t('setAnchor')
                    });
                    setBtn.appendChild(createSvgIconNode('pin', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
                    const handleSetClick = (e) => {
                        console.log('[ChatGPT Helper] 设置锚点按钮点击');
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        this.setAnchorManually();
                    };
                    setBtn.addEventListener('click', handleSetClick, { capture: true, passive: false });
                    setBtn.addEventListener('click', handleSetClick, { capture: false, passive: false });
                    setBtn.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true });

                    const backBtn = createElement('button', {
                        className: 'chatgpt-helper-quick-btn' + (this.savedAnchorTop === null ? ' disabled' : ''),
                        title: this.savedAnchorTop === null ? this.t('noAnchor') : this.t('returnAnchor'),
                        id: 'manual-anchor-back-btn',
                        type: 'button',
                        'aria-label': this.savedAnchorTop === null ? this.t('noAnchor') : this.t('returnAnchor')
                    });
                    backBtn.appendChild(createSvgIconNode('back', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
                    const handleBackClick = (e) => {
                        console.log('[ChatGPT Helper] 返回锚点按钮点击');
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        if (this.savedAnchorTop !== null) {
                            this.backToManualAnchor();
                        } else {
                            this.showToast(this.t('noAnchor'));
                        }
                    };
                    backBtn.addEventListener('click', handleBackClick, { capture: true, passive: false });
                    backBtn.addEventListener('click', handleBackClick, { capture: false, passive: false });
                    backBtn.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true });

                    const clearBtn = createElement('button', {
                        className: 'chatgpt-helper-quick-btn' + (this.savedAnchorTop === null ? ' disabled' : ''),
                        title: this.t('clearAnchor'),
                        id: 'manual-anchor-clear-btn',
                        type: 'button',
                        'aria-label': this.t('clearAnchor')
                    });
                    clearBtn.appendChild(createSvgIconNode('close', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
                    const handleClearClick = (e) => {
                        console.log('[ChatGPT Helper] 清除锚点按钮点击');
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        if (this.savedAnchorTop !== null) {
                            this.clearAnchorManually();
                        } else {
                            this.showToast(this.t('noAnchor'));
                        }
                    };
                    clearBtn.addEventListener('click', handleClearClick, { capture: true, passive: false });
                    clearBtn.addEventListener('click', handleClearClick, { capture: false, passive: false });
                    clearBtn.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true });

                    btnGroup.appendChild(setBtn);
                    btnGroup.appendChild(backBtn);
                    btnGroup.appendChild(clearBtn);
                } else {
                    const btnTitle = def.labelKey ? this.t(def.labelKey) : (def.label || '');
                    const btn = createElement('button', {
                        className: 'chatgpt-helper-quick-btn' + (def.isPanelOnly ? ' panel-only' : ''),
                        title: btnTitle,
                        id: `quick-btn-${btnConfig.id}`,
                        type: 'button',
                        'aria-label': btnTitle
                    });
                    btn.appendChild(createCollapsedButtonIconNode(def, {
                        size: btnConfig.id === 'panel' ? 20 : 18,
                        className: btnConfig.id === 'panel' ? 'chatgpt-helper-quick-btn-logo' : 'chatgpt-helper-quick-btn-icon',
                        title: btnTitle
                    }));

                    // 绑定事件 - 使用直接绑定方式，确保this正确
                    const self = this;
                    const btnId = btnConfig.id;

                    // 创建事件处理函数
                    const handleClick = function (e) {
                        console.log('[ChatGPT Helper] 按钮点击:', btnId, '按钮元素:', btn, '事件:', e);
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();

                        // 执行对应的操作
                        try {
                            if (btnId === 'scrollTop') {
                                console.log('[ChatGPT Helper] 执行 scrollToTop');
                                self.scrollToTop();
                            } else if (btnId === 'scrollBottom') {
                                console.log('[ChatGPT Helper] 执行 scrollToBottom');
                                self.scrollToBottom();
                            } else if (btnId === 'panel') {
                                console.log('[ChatGPT Helper] 执行 toggleCollapse');
                                self.toggleCollapse();
                            } else if (btnId === 'anchor') {
                                console.log('[ChatGPT Helper] 执行 handleAnchorClick');
                                self.handleAnchorClick();
                            } else if (btnId === 'theme') {
                                console.log('[ChatGPT Helper] 执行 toggleTheme');
                                self.toggleTheme(e);
                                // 更新图标
                                setTimeout(() => {
                                    const isDark = document.body.dataset.ghMode === 'dark' ||
                                        document.documentElement.getAttribute('data-gh-mode') === 'dark';
                                    setButtonIcon(btn, isDark ? 'moon' : 'sun', {
                                        size: 18,
                                        className: 'chatgpt-helper-quick-btn-icon'
                                    });
                                }, 200);
                            }
                        } catch (error) {
                            console.error('[ChatGPT Helper] 按钮操作失败:', btnId, error, error.stack);
                            self.showToast(`${self.t('operationFailed')}: ${error.message}`);
                        }
                    };

                    // 添加鼠标事件监听（用于调试）
                    btn.addEventListener('mouseenter', () => {
                        console.log('[ChatGPT Helper] 鼠标悬停在按钮上:', btnId);
                    });

                    btn.addEventListener('mousedown', (e) => {
                        console.log('[ChatGPT Helper] 按钮 mousedown:', btnId);
                        e.preventDefault();
                        e.stopPropagation();
                    }, true);

                    // 使用多种方式绑定，确保事件能被捕获
                    // 方法1: 直接 onclick（最可靠）
                    btn.onclick = handleClick;

                    // 方法2: addEventListener capture 模式
                    btn.addEventListener('click', handleClick, true);

                    // 方法3: addEventListener 普通模式
                    btn.addEventListener('click', handleClick, false);

                    // 方法4: mousedown 作为备选
                    btn.addEventListener('mousedown', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }, true);

                    // 初始化状态
                    if (btnConfig.id === 'anchor') {
                        if (!self.hasAnchor) {
                            btn.style.opacity = '0.4';
                            btn.style.cursor = 'default';
                            btn.title = self.t('noAnchor');
                        } else {
                            btn.title = self.t('returnPreviousPosition');
                        }
                    } else if (btnConfig.id === 'theme') {
                        // 根据当前主题设置图标
                        const isDark = document.body.dataset.ghMode === 'dark' ||
                            document.documentElement.getAttribute('data-gh-mode') === 'dark' ||
                            /\bdark\b/i.test(document.body.className);
                        setButtonIcon(btn, isDark ? 'moon' : 'sun', {
                            size: 18,
                            className: 'chatgpt-helper-quick-btn-icon'
                        });
                    }

                    quickButtons[btnConfig.id] = btn;
                    btnGroup.appendChild(btn);
                }
            });

            document.body.appendChild(btnGroup);
            this.quickButtons = quickButtons;
        },

        scrollToTop() {
            console.log('[ChatGPT Helper] scrollToTop 被调用');

            // 点击去顶部时，自动记录当前位置为锚点
            const currentScrollTop = this.scrollManager.scrollTop;
            if (currentScrollTop > 100 && this.anchorManager) {
                this.anchorManager.setAnchor(currentScrollTop);
            }

            // 重新查找滚动容器（可能已变化）
            const container = this.scrollManager.container;
            console.log('[ChatGPT Helper] 滚动容器:', container, 'scrollTop:', container?.scrollTop, 'scrollHeight:', container?.scrollHeight, 'clientHeight:', container?.clientHeight);

            // 检查是否在底部（需要在获取容器之前检查，因为可能使用 window 滚动）
            const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
            console.log('[ChatGPT Helper] 是否在底部（window）:', isAtBottomWindow, 'window.scrollY:', window.scrollY, 'document.body.scrollHeight:', document.body.scrollHeight);

            if (!container || container === document.body) {
                console.log('[ChatGPT Helper] 使用 window 滚动');

                // 如果在底部，需要强制滚动
                if (isAtBottomWindow) {
                    console.log('[ChatGPT Helper] 在底部，使用直接设置 scrollTop 强制滚动');
                    // 完全禁用 ScrollLockManager
                    const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                    if (wasLockEnabled) {
                        this.scrollLockManager.setEnabled(false);
                    }

                    // 获取滚动元素
                    const scrollElement = document.scrollingElement || document.documentElement || document.body;
                    console.log('[ChatGPT Helper] 滚动元素:', scrollElement);

                    // 获取原生 scrollTop setter
                    let originalScrollTopSetter = null;
                    if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                        originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
                    }

                    // 强制滚动函数：直接设置 scrollTop
                    const forceScrollToZero = () => {
                        try {
                            // 方法1: 使用原生 scrollTop setter
                            if (originalScrollTopSetter) {
                                originalScrollTopSetter.call(scrollElement, 0);
                            } else {
                                // 方法2: 直接设置 scrollTop（绕过所有拦截）
                                scrollElement.scrollTop = 0;
                            }
                            // 方法3: 同时设置 documentElement 和 body（确保兼容性）
                            if (document.documentElement) {
                                document.documentElement.scrollTop = 0;
                            }
                            if (document.body) {
                                document.body.scrollTop = 0;
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e);
                        }
                    };

                    // 立即执行多次
                    forceScrollToZero();
                    setTimeout(() => forceScrollToZero(), 0);
                    setTimeout(() => forceScrollToZero(), 10);

                    // 使用 setInterval 强制滚动
                    let attempts = 0;
                    const maxAttempts = 200;
                    const scrollInterval = setInterval(() => {
                        attempts++;
                        const before = window.scrollY || scrollElement.scrollTop;

                        // 确保 ScrollLockManager 被禁用
                        if (wasLockEnabled && this.scrollLockManager) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        // 强制设置 scrollTop
                        forceScrollToZero();

                        const current = window.scrollY || scrollElement.scrollTop;
                        console.log('[ChatGPT Helper] window 强制滚动尝试', attempts, '当前位置:', current, '之前:', before, 'scrollElement.scrollTop:', scrollElement.scrollTop);

                        if (current <= 5 || attempts >= maxAttempts) {
                            clearInterval(scrollInterval);
                            if (wasLockEnabled && this.scrollLockManager) {
                                setTimeout(() => {
                                    this.scrollLockManager.setEnabled(true);
                                }, 200);
                            }
                            console.log('[ChatGPT Helper] window 滚动到顶部完成，最终位置:', current, '尝试次数:', attempts);
                            this.showToast(this.t('scrolledTop'));
                        } else if (current >= before && attempts > 10) {
                            // 如果10次尝试后仍然没有变化，尝试使用 scrollIntoView
                            console.log('[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView');
                            try {
                                const firstElement = document.body.firstElementChild || document.body.firstChild;
                                if (firstElement && firstElement.nodeType === 1) {
                                    firstElement.scrollIntoView({ behavior: 'instant', block: 'start' });
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                            }
                            clearInterval(scrollInterval);
                            if (wasLockEnabled && this.scrollLockManager) {
                                setTimeout(() => {
                                    this.scrollLockManager.setEnabled(true);
                                }, 200);
                            }
                            this.showToast(this.t('scrolledTop'));
                        }
                    }, 10);
                } else {
                    window.__ghBypassLock = true;
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    setTimeout(() => delete window.__ghBypassLock, 100);
                    this.showToast(this.t('scrolledTop'));
                }
                return;
            }

            // 检查容器是否真正可滚动
            if (container.scrollHeight <= container.clientHeight || container.clientHeight === 0) {
                console.log('[ChatGPT Helper] 容器不可滚动，尝试 window 滚动');

                // 如果在底部，需要强制滚动
                if (isAtBottomWindow) {
                    console.log('[ChatGPT Helper] 在底部（容器不可滚动），使用直接设置 scrollTop 强制滚动');
                    // 完全禁用 ScrollLockManager
                    const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                    if (wasLockEnabled) {
                        this.scrollLockManager.setEnabled(false);
                    }

                    // 获取滚动元素
                    const scrollElement = document.scrollingElement || document.documentElement || document.body;

                    // 获取原生 scrollTop setter
                    let originalScrollTopSetter = null;
                    if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                        originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
                    }

                    // 强制滚动函数：直接设置 scrollTop
                    const forceScrollToZero = () => {
                        try {
                            if (originalScrollTopSetter) {
                                originalScrollTopSetter.call(scrollElement, 0);
                            } else {
                                scrollElement.scrollTop = 0;
                            }
                            if (document.documentElement) {
                                document.documentElement.scrollTop = 0;
                            }
                            if (document.body) {
                                document.body.scrollTop = 0;
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e);
                        }
                    };

                    // 立即执行多次
                    forceScrollToZero();
                    setTimeout(() => forceScrollToZero(), 0);
                    setTimeout(() => forceScrollToZero(), 10);

                    // 使用 setInterval 强制滚动
                    let attempts = 0;
                    const maxAttempts = 200;
                    const scrollInterval = setInterval(() => {
                        attempts++;
                        const before = window.scrollY || scrollElement.scrollTop;

                        if (wasLockEnabled && this.scrollLockManager) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        forceScrollToZero();

                        const current = window.scrollY || scrollElement.scrollTop;
                        if (current <= 5 || attempts >= maxAttempts) {
                            clearInterval(scrollInterval);
                            if (wasLockEnabled && this.scrollLockManager) {
                                setTimeout(() => {
                                    this.scrollLockManager.setEnabled(true);
                                }, 200);
                            }
                            this.showToast(this.t('scrolledTop'));
                        } else if (current >= before && attempts > 10) {
                            try {
                                const firstElement = document.body.firstElementChild || document.body.firstChild;
                                if (firstElement && firstElement.nodeType === 1) {
                                    firstElement.scrollIntoView({ behavior: 'instant', block: 'start' });
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                            }
                            clearInterval(scrollInterval);
                            if (wasLockEnabled && this.scrollLockManager) {
                                setTimeout(() => {
                                    this.scrollLockManager.setEnabled(true);
                                }, 200);
                            }
                            this.showToast(this.t('scrolledTop'));
                        }
                    }, 10);
                } else {
                    window.__ghBypassLock = true;
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    setTimeout(() => delete window.__ghBypassLock, 100);
                    this.showToast(this.t('scrolledTop'));
                }
                return;
            }

            // 关键修复：检查是否在底部（容器可滚动时）
            const isAtBottomContainer = this.scrollManager.isAtBottom(50);
            console.log('[ChatGPT Helper] 是否在底部（容器）:', isAtBottomContainer, '当前scrollTop:', container.scrollTop, 'scrollHeight:', container.scrollHeight, 'clientHeight:', container.clientHeight);

            // 关键修复：完全禁用 ScrollLockManager，并临时恢复原始 scrollTop setter
            const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
            let originalScrollTopDescriptor = null;
            let scrollTopRestored = false;

            // 修复：无论是否在底部，都先禁用锁定，允许滚动
            if (wasLockEnabled) {
                console.log('[ChatGPT Helper] 完全禁用 ScrollLockManager');
                this.scrollLockManager.setEnabled(false);

                if (this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                    originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;

                    // 关键修复：如果在底部，临时恢复原始的 scrollTop setter（绕过劫持）
                    if (originalScrollTopDescriptor && isAtBottomContainer) {
                        try {
                            Object.defineProperty(Element.prototype, 'scrollTop', originalScrollTopDescriptor);
                            scrollTopRestored = true;
                            console.log('[ChatGPT Helper] 已临时恢复原始 scrollTop setter');
                        } catch (e) {
                            console.warn('[ChatGPT Helper] 恢复 scrollTop setter 失败:', e);
                        }
                    }
                }
            }

            // 设置 bypassLock 标志
            container.__ghBypassLock = true;

            // 获取原生 scrollTop setter（绕过所有拦截）
            const getNativeSetter = () => {
                // 方法1: 从 ScrollLockManager 的原始API获取
                if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
                    return originalScrollTopDescriptor.set;
                }

                // 方法2: 从原型链获取（如果已经恢复）
                const proto = Object.getPrototypeOf(container);
                const descriptor = Object.getOwnPropertyDescriptor(proto, 'scrollTop') ||
                    Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop') ||
                    Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');

                return descriptor?.set;
            };

            const nativeSetter = getNativeSetter();

            // 强制滚动函数（使用原生setter）
            const forceScrollToZero = () => {
                try {
                    if (nativeSetter) {
                        nativeSetter.call(container, 0);
                    } else {
                        // 直接操作属性，绕过所有拦截
                        Object.defineProperty(container, 'scrollTop', {
                            value: 0,
                            writable: true,
                            configurable: true
                        });
                    }
                } catch (e) {
                    try {
                        container.scrollTop = 0;
                    } catch (e2) {
                        console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e2);
                    }
                }
            };

            // 清理函数：恢复 scrollTop setter 的劫持
            const cleanup = () => {
                delete container.__ghBypassLock;
                if (wasLockEnabled && this.scrollLockManager) {
                    // 如果临时恢复了 scrollTop setter，需要重新劫持
                    if (scrollTopRestored && this.scrollLockManager.originalApis) {
                        try {
                            // 重新劫持 scrollTop setter
                            const self = this.scrollLockManager;
                            Object.defineProperty(Element.prototype, 'scrollTop', {
                                get: function () {
                                    return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                                },
                                set: function (value) {
                                    if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                                        return;
                                    }
                                    if (self.originalApis.scrollTopDescriptor.set) {
                                        self.originalApis.scrollTopDescriptor.set.call(this, value);
                                    }
                                },
                                configurable: true,
                            });
                        } catch (e) {
                            console.warn('[ChatGPT Helper] 重新劫持 scrollTop setter 失败:', e);
                        }
                    }
                    setTimeout(() => {
                        this.scrollLockManager.setEnabled(true);
                    }, 200);
                }
            };

            // 立即执行多次，确保生效
            forceScrollToZero();
            setTimeout(() => forceScrollToZero(), 0);
            setTimeout(() => forceScrollToZero(), 10);

            // 使用 scrollTo（带 bypassLock）
            try {
                container.scrollTo({ top: 0, behavior: 'instant', __bypassLock: true });
            } catch (e) {
                console.log('[ChatGPT Helper] scrollTo 失败:', e);
            }

            // 如果在底部，使用 setInterval 强制滚动（比 requestAnimationFrame 更可靠）
            if (isAtBottomContainer) {
                console.log('[ChatGPT Helper] 在底部，使用 setInterval 强制滚动');
                let attempts = 0;
                const maxAttempts = 200; // 增加尝试次数
                const scrollInterval = setInterval(() => {
                    attempts++;
                    const before = container.scrollTop;

                    // 确保标志和禁用状态存在
                    container.__ghBypassLock = true;
                    if (wasLockEnabled && this.scrollLockManager) {
                        this.scrollLockManager.setEnabled(false);
                    }

                    // 强制设置 scrollTop
                    forceScrollToZero();

                    // 检查是否到达顶部
                    const current = container.scrollTop;
                    console.log('[ChatGPT Helper] 强制滚动尝试', attempts, '当前位置:', current, '之前:', before);

                    if (current <= 5 || attempts >= maxAttempts) {
                        clearInterval(scrollInterval);
                        cleanup();
                        console.log('[ChatGPT Helper] 滚动到顶部完成，最终位置:', current, '尝试次数:', attempts);
                        this.showToast(this.t('scrolledTop'));
                    } else if (current >= before && attempts > 10) {
                        // 如果10次尝试后仍然没有变化，尝试其他方法
                        console.log('[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView');
                        try {
                            const firstChild = container.firstElementChild || container.firstChild;
                            if (firstChild && firstChild.nodeType === 1) {
                                firstChild.scrollIntoView({ behavior: 'instant', block: 'start' });
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                        }
                        clearInterval(scrollInterval);
                        cleanup();
                        this.showToast(this.t('scrolledTop'));
                    }
                }, 10); // 每10ms执行一次
            } else {
                // 不在底部，使用正常的 requestAnimationFrame
                let attempts = 0;
                const maxAttempts = 50;
                const scrollStep = () => {
                    attempts++;
                    const before = container.scrollTop;

                    container.__ghBypassLock = true;
                    if (wasLockEnabled && this.scrollLockManager) {
                        this.scrollLockManager.setEnabled(false);
                    }

                    forceScrollToZero();

                    const current = container.scrollTop;
                    if (current <= 5 || attempts >= maxAttempts) {
                        cleanup();
                        console.log('[ChatGPT Helper] 滚动到顶部完成，最终位置:', current, '尝试次数:', attempts);
                        this.showToast(this.t('scrolledTop'));
                    } else if (current < before) {
                        requestAnimationFrame(scrollStep);
                    } else {
                        cleanup();
                        this.showToast(this.t('scrolledTop'));
                    }
                };

                requestAnimationFrame(() => {
                    requestAnimationFrame(scrollStep);
                });
            }
        },

        scrollToBottom() {
            console.log('[ChatGPT Helper] scrollToBottom 被调用');

            // 点击去底部时，自动记录当前位置为锚点
            const currentScrollTop = this.scrollManager.scrollTop;
            if (currentScrollTop > 100 && this.anchorManager) {
                this.anchorManager.setAnchor(currentScrollTop);
            }

            // 重新查找滚动容器（可能已变化）
            const container = this.scrollManager.container;
            console.log('[ChatGPT Helper] 滚动容器:', container, 'scrollTop:', container?.scrollTop, 'scrollHeight:', container?.scrollHeight, 'clientHeight:', container?.clientHeight);

            if (!container || container === document.body) {
                console.log('[ChatGPT Helper] 使用 window 滚动到底部');
                window.__ghBypassLock = true;
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
                setTimeout(() => delete window.__ghBypassLock, 100);
                this.showToast(this.t('scrolledBottom'));
                return;
            }

            // 检查容器是否真正可滚动
            const targetTop = Math.max(0, container.scrollHeight - container.clientHeight);
            console.log('[ChatGPT Helper] 目标滚动位置:', targetTop);

            if (container.scrollHeight <= container.clientHeight || container.clientHeight === 0) {
                console.log('[ChatGPT Helper] 容器不可滚动，尝试 window 滚动');
                window.__ghBypassLock = true;
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
                setTimeout(() => delete window.__ghBypassLock, 100);
                this.showToast(this.t('scrolledBottom'));
                return;
            }

            // 关键修复：临时禁用 ScrollLockManager，然后强制滚动
            const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
            if (wasLockEnabled) {
                console.log('[ChatGPT Helper] 临时禁用 ScrollLockManager');
                this.scrollLockManager.setEnabled(false);
            }

            // 设置 bypassLock 标志
            container.__ghBypassLock = true;

            // 方法1: 直接使用原生 scrollTop setter（绕过所有拦截）
            const scrollToTarget = () => {
                try {
                    // 获取原生描述符（从原始原型链）
                    const proto = Object.getPrototypeOf(container);
                    const descriptor = Object.getOwnPropertyDescriptor(proto, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');

                    if (descriptor && descriptor.set) {
                        console.log('[ChatGPT Helper] 使用原生 scrollTop setter');
                        descriptor.set.call(container, targetTop);
                    } else {
                        console.log('[ChatGPT Helper] 使用直接设置 scrollTop');
                        // 直接操作属性，绕过所有拦截
                        Object.defineProperty(container, 'scrollTop', {
                            value: targetTop,
                            writable: true,
                            configurable: true
                        });
                    }
                } catch (e) {
                    console.log('[ChatGPT Helper] 原生 setter 失败，使用直接设置:', e);
                    try {
                        container.scrollTop = targetTop;
                    } catch (e2) {
                        console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e2);
                    }
                }
            };

            // 立即执行
            scrollToTarget();

            // 方法2: 使用 scrollTo（带 bypassLock）
            try {
                container.scrollTo({ top: targetTop, behavior: 'instant', __bypassLock: true });
            } catch (e) {
                console.log('[ChatGPT Helper] scrollTo 失败:', e);
            }

            // 方法3: 使用循环滚动确保真正到达底部
            let attempts = 0;
            const maxAttempts = 50;
            const scrollStep = () => {
                attempts++;
                const before = container.scrollTop;
                const target = Math.max(0, container.scrollHeight - container.clientHeight);

                // 确保标志和禁用状态存在
                container.__ghBypassLock = true;
                if (wasLockEnabled && this.scrollLockManager) {
                    this.scrollLockManager.setEnabled(false);
                }

                // 强制设置 scrollTop
                scrollToTarget();

                // 检查是否到达底部
                const currentTop = container.scrollTop;
                const distanceToBottom = container.scrollHeight - currentTop - container.clientHeight;
                if (distanceToBottom <= 5 || attempts >= maxAttempts) {
                    // 滚动完成，恢复状态
                    delete container.__ghBypassLock;
                    if (wasLockEnabled && this.scrollLockManager) {
                        setTimeout(() => {
                            this.scrollLockManager.setEnabled(true);
                        }, 200);
                    }
                    console.log('[ChatGPT Helper] 滚动到底部完成，最终位置:', currentTop, '距离底部:', distanceToBottom, '尝试次数:', attempts);
                    this.showToast(this.t('scrolledBottom'));
                } else if (currentTop > before) {
                    // 还在滚动中，继续
                    requestAnimationFrame(scrollStep);
                } else {
                    // 没有变化，可能被拦截，尝试更强制的方法
                    console.log('[ChatGPT Helper] 滚动被拦截，尝试更强制的方法');
                    // 使用 scrollIntoView 作为最后手段
                    try {
                        const lastChild = container.lastElementChild || container.lastChild;
                        if (lastChild && lastChild.nodeType === 1) {
                            lastChild.scrollIntoView({ behavior: 'instant', block: 'end' });
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                    }
                    delete container.__ghBypassLock;
                    if (wasLockEnabled && this.scrollLockManager) {
                        setTimeout(() => {
                            this.scrollLockManager.setEnabled(true);
                        }, 200);
                    }
                    this.showToast(this.t('scrolledBottom'));
                }
            };

            // 延迟执行，确保 DOM 已更新
            requestAnimationFrame(() => {
                requestAnimationFrame(scrollStep);
            });
        },

        setAnchorManually() {
            try {
                const container = this.scrollManager.container;
                if (container) {
                    this.savedAnchorTop = container.scrollTop || this.scrollManager.scrollTop;
                } else {
                    this.savedAnchorTop = window.scrollY || 0;
                }
                // 显示锚点图标
                this.showAnchorMarker(this.savedAnchorTop);
                this.updateManualAnchorButtons();
                this.showToast(this.t('anchorSet'));
            } catch (error) {
                console.error('[ChatGPT Helper] 设置锚点失败:', error);
                this.showToast(this.t('anchorSetFailed'));
            }
        },

        backToManualAnchor() {
            if (this.savedAnchorTop === null) {
                this.showToast(this.t('noAnchor'));
                return;
            }

            try {
                const container = this.scrollManager.container;
                // 检查是否在底部（需要在获取容器之前检查）
                const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

                if (!container || container === document.body) {
                    // 如果在底部，需要强制滚动
                    if (isAtBottomWindow) {
                        console.log('[ChatGPT Helper] 在底部（手动锚点），使用直接设置 scrollTop 强制滚动');
                        const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                        if (wasLockEnabled) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        const scrollElement = document.scrollingElement || document.documentElement || document.body;
                        let originalScrollTopSetter = null;
                        if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                            originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
                        }

                        const forceScrollToTarget = () => {
                            try {
                                if (originalScrollTopSetter) {
                                    originalScrollTopSetter.call(scrollElement, this.savedAnchorTop);
                                } else {
                                    scrollElement.scrollTop = this.savedAnchorTop;
                                }
                                if (document.documentElement) {
                                    document.documentElement.scrollTop = this.savedAnchorTop;
                                }
                                if (document.body) {
                                    document.body.scrollTop = this.savedAnchorTop;
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e);
                            }
                        };

                        forceScrollToTarget();
                        setTimeout(() => forceScrollToTarget(), 0);
                        setTimeout(() => forceScrollToTarget(), 10);

                        let attempts = 0;
                        const maxAttempts = 200;
                        const scrollInterval = setInterval(() => {
                            attempts++;
                            const before = window.scrollY || scrollElement.scrollTop;

                            if (wasLockEnabled && this.scrollLockManager) {
                                this.scrollLockManager.setEnabled(false);
                            }

                            forceScrollToTarget();

                            const current = window.scrollY || scrollElement.scrollTop;
                            const diff = Math.abs(current - this.savedAnchorTop);
                            console.log('[ChatGPT Helper] window 强制滚动到锚点尝试', attempts, '当前位置:', current, '目标:', this.savedAnchorTop, '差值:', diff);

                            if (diff <= 5) {
                                // 真正到达目标位置
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                this.showToast(this.t('returnedAnchor'));
                            } else if (attempts >= maxAttempts) {
                                // 达到最大尝试次数，但未到达目标位置
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                this.showToast(this.t('returnAnchorFailed'));
                            } else if (Math.abs(current - before) < 1 && attempts > 10) {
                                // 滚动被拦截，无法继续
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                this.showToast(this.t('returnAnchorFailed'));
                            }
                        }, 10);
                    } else {
                        window.__ghBypassLock = true;
                        window.scrollTo({ top: this.savedAnchorTop, behavior: 'instant' });
                        setTimeout(() => delete window.__ghBypassLock, 100);
                        this.showToast(this.t('returnedAnchor'));
                    }
                    return;
                }

                // 关键修复：检查是否在底部，如果在底部需要强制滚动
                const isAtBottomContainer = this.scrollManager.isAtBottom(50);
                console.log('[ChatGPT Helper] 返回锚点，是否在底部:', isAtBottomContainer, '目标位置:', this.savedAnchorTop);

                // 完全禁用 ScrollLockManager，并临时恢复原始 scrollTop setter
                const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                let originalScrollTopDescriptor = null;
                let scrollTopRestored = false;

                if (wasLockEnabled && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                    this.scrollLockManager.setEnabled(false);
                    originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;

                    // 关键修复：临时恢复原始的 scrollTop setter（绕过劫持）
                    if (originalScrollTopDescriptor && isAtBottomContainer) {
                        try {
                            Object.defineProperty(Element.prototype, 'scrollTop', originalScrollTopDescriptor);
                            scrollTopRestored = true;
                            console.log('[ChatGPT Helper] 已临时恢复原始 scrollTop setter（锚点）');
                        } catch (e) {
                            console.warn('[ChatGPT Helper] 恢复 scrollTop setter 失败:', e);
                        }
                    }
                } else if (wasLockEnabled) {
                    this.scrollLockManager.setEnabled(false);
                }

                // 设置 bypassLock 标志
                container.__ghBypassLock = true;

                // 获取原生 scrollTop setter
                const getNativeSetter = () => {
                    if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
                        return originalScrollTopDescriptor.set;
                    }
                    const proto = Object.getPrototypeOf(container);
                    const descriptor = Object.getOwnPropertyDescriptor(proto, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');
                    return descriptor?.set;
                };

                const nativeSetter = getNativeSetter();

                // 强制滚动函数
                const forceScrollToTarget = () => {
                    try {
                        if (nativeSetter) {
                            nativeSetter.call(container, this.savedAnchorTop);
                        } else {
                            Object.defineProperty(container, 'scrollTop', {
                                value: this.savedAnchorTop,
                                writable: true,
                                configurable: true
                            });
                        }
                    } catch (e) {
                        container.scrollTop = this.savedAnchorTop;
                    }
                };

                // 清理函数：恢复 scrollTop setter 的劫持
                const cleanup = () => {
                    delete container.__ghBypassLock;
                    if (wasLockEnabled && this.scrollLockManager) {
                        if (scrollTopRestored && this.scrollLockManager.originalApis) {
                            try {
                                const self = this.scrollLockManager;
                                Object.defineProperty(Element.prototype, 'scrollTop', {
                                    get: function () {
                                        return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                                    },
                                    set: function (value) {
                                        if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                                            return;
                                        }
                                        if (self.originalApis.scrollTopDescriptor.set) {
                                            self.originalApis.scrollTopDescriptor.set.call(this, value);
                                        }
                                    },
                                    configurable: true,
                                });
                            } catch (e) {
                                console.warn('[ChatGPT Helper] 重新劫持 scrollTop setter 失败:', e);
                            }
                        }
                        setTimeout(() => {
                            this.scrollLockManager.setEnabled(true);
                        }, 200);
                    }
                };

                // 立即执行多次
                forceScrollToTarget();
                setTimeout(() => forceScrollToTarget(), 0);
                setTimeout(() => forceScrollToTarget(), 10);

                // 使用 scrollTo
                try {
                    container.scrollTo({ top: this.savedAnchorTop, behavior: 'instant', __bypassLock: true });
                } catch (e) {
                    console.log('[ChatGPT Helper] scrollTo 失败:', e);
                }

                // 如果在底部，使用 setInterval 强制滚动
                if (isAtBottomContainer) {
                    console.log('[ChatGPT Helper] 在底部，使用 setInterval 强制滚动到锚点');
                    let attempts = 0;
                    const maxAttempts = 200;
                    const scrollInterval = setInterval(() => {
                        attempts++;
                        const before = container.scrollTop;

                        container.__ghBypassLock = true;
                        if (wasLockEnabled && this.scrollLockManager) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        forceScrollToTarget();

                        const current = container.scrollTop;
                        const diff = Math.abs(current - this.savedAnchorTop);
                        console.log('[ChatGPT Helper] 强制滚动到锚点尝试', attempts, '当前位置:', current, '目标:', this.savedAnchorTop, '差值:', diff);

                        if (diff <= 5) {
                            // 真正到达目标位置
                            clearInterval(scrollInterval);
                            cleanup();
                            this.showToast(this.t('returnedAnchor'));
                        } else if (attempts >= maxAttempts) {
                            // 达到最大尝试次数，但未到达目标位置
                            clearInterval(scrollInterval);
                            cleanup();
                            this.showToast(this.t('returnAnchorFailed'));
                        } else if (Math.abs(current - before) < 1 && attempts > 10) {
                            // 如果10次尝试后仍然没有变化，尝试其他方法
                            console.log('[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView');
                            try {
                                const children = Array.from(container.children);
                                for (const child of children) {
                                    const rect = child.getBoundingClientRect();
                                    const childTop = container.scrollTop + rect.top - container.getBoundingClientRect().top;
                                    if (Math.abs(childTop - this.savedAnchorTop) < 100) {
                                        child.scrollIntoView({ behavior: 'instant', block: 'start' });
                                        break;
                                    }
                                }
                                // 检查是否成功滚动
                                setTimeout(() => {
                                    const finalCurrent = container.scrollTop;
                                    const finalDiff = Math.abs(finalCurrent - this.savedAnchorTop);
                                    if (finalDiff <= 5) {
                                        this.showToast(this.t('returnedAnchor'));
                                    } else {
                                        this.showToast(this.t('returnAnchorFailed'));
                                    }
                                }, 100);
                            } catch (e) {
                                console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                                clearInterval(scrollInterval);
                                cleanup();
                                this.showToast(this.t('returnAnchorFailed'));
                            }
                            clearInterval(scrollInterval);
                            cleanup();
                        }
                    }, 10);
                } else {
                    // 不在底部，正常滚动即可
                    cleanup();
                    this.showToast(this.t('returnedAnchor'));
                }
            } catch (error) {
                console.error('[ChatGPT Helper] 返回锚点失败:', error);
                this.showToast(this.t('returnAnchorFailed'));
            }
        },

        clearAnchorManually() {
            this.savedAnchorTop = null;
            // 隐藏锚点图标
            this.hideAnchorMarker();
            this.updateManualAnchorButtons();
            this.showToast(this.t('anchorCleared'));
        },

        showAnchorMarker(scrollTop) {
            // 先移除已有标记
            this.hideAnchorMarker();

            const container = this.scrollManager.container;
            if (!container) return;

            // 确保容器有 position 定位
            const containerStyle = window.getComputedStyle(container);
            if (containerStyle.position === 'static') {
                container.style.position = 'relative';
            }

            const marker = createElement('div', {
                className: 'chatgpt-helper-anchor-marker',
                id: 'chatgpt-helper-anchor-marker',
                style: `top: ${scrollTop}px;`,
            });

            container.appendChild(marker);
        },

        hideAnchorMarker() {
            const marker = document.getElementById('chatgpt-helper-anchor-marker');
            if (marker) {
                marker.remove();
            }
        },

        updateManualAnchorButtons() {
            const backBtn = document.getElementById('manual-anchor-back-btn');
            const clearBtn = document.getElementById('manual-anchor-clear-btn');
            const hasAnchor = this.savedAnchorTop !== null;

            if (backBtn) {
                backBtn.classList.toggle('disabled', !hasAnchor);
                backBtn.title = hasAnchor ? this.t('returnAnchor') : this.t('noAnchor');
                backBtn.setAttribute('aria-label', backBtn.title);
            }
            if (clearBtn) {
                clearBtn.classList.toggle('disabled', !hasAnchor);
            }
        },

        handleAnchorClick() {
            if (!this.anchorManager || !this.anchorManager.hasAnchor()) {
                this.showToast(this.t('noAnchorAutoHint'));
                return;
            }

            // 返回锚点（支持来回跳转）
            try {
                const container = this.scrollManager.container;
                // 检查是否在底部（需要在获取容器之前检查）
                const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

                if (!container || container === document.body) {
                    // 获取锚点位置
                    const anchorTop = this.anchorManager.previousAnchor?.top;
                    if (anchorTop === undefined) {
                        this.showToast(this.t('returnAnchorFailed'));
                        return;
                    }

                    // 如果在底部，需要强制滚动
                    if (isAtBottomWindow) {
                        console.log('[ChatGPT Helper] 在底部（自动锚点），使用直接设置 scrollTop 强制滚动');
                        const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                        if (wasLockEnabled) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        const scrollElement = document.scrollingElement || document.documentElement || document.body;
                        let originalScrollTopSetter = null;
                        if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                            originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
                        }

                        const forceScrollToTarget = () => {
                            try {
                                if (originalScrollTopSetter) {
                                    originalScrollTopSetter.call(scrollElement, anchorTop);
                                } else {
                                    scrollElement.scrollTop = anchorTop;
                                }
                                if (document.documentElement) {
                                    document.documentElement.scrollTop = anchorTop;
                                }
                                if (document.body) {
                                    document.body.scrollTop = anchorTop;
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] 设置 scrollTop 失败:', e);
                            }
                        };

                        forceScrollToTarget();
                        setTimeout(() => forceScrollToTarget(), 0);
                        setTimeout(() => forceScrollToTarget(), 10);

                        let attempts = 0;
                        const maxAttempts = 200;
                        const scrollInterval = setInterval(() => {
                            attempts++;
                            const before = window.scrollY || scrollElement.scrollTop;

                            if (wasLockEnabled && this.scrollLockManager) {
                                this.scrollLockManager.setEnabled(false);
                            }

                            forceScrollToTarget();

                            const current = window.scrollY || scrollElement.scrollTop;
                            const diff = Math.abs(current - anchorTop);
                            console.log('[ChatGPT Helper] window 强制滚动到锚点尝试', attempts, '当前位置:', current, '目标:', anchorTop, '差值:', diff);

                            if (diff <= 5) {
                                // 真正到达目标位置
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                // 更新锚点管理器状态
                                const currentPos = this.anchorManager._captureCurrentPosition();
                                this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                                this.anchorManager.previousAnchor = currentPos;
                                this.showToast(this.t('returnedPreviousPosition'));
                            } else if (attempts >= maxAttempts) {
                                // 达到最大尝试次数，但未到达目标位置
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                this.showToast(this.t('returnAnchorFailed'));
                            } else if (Math.abs(current - before) < 1 && attempts > 10) {
                                // 滚动被拦截，无法继续
                                clearInterval(scrollInterval);
                                if (wasLockEnabled && this.scrollLockManager) {
                                    setTimeout(() => {
                                        this.scrollLockManager.setEnabled(true);
                                    }, 200);
                                }
                                this.showToast(this.t('returnAnchorFailed'));
                            }
                        }, 10);
                    } else {
                        const success = this.anchorManager.backToAnchor();
                        if (success) {
                            this.showToast(this.t('returnedPreviousPosition'));
                        } else {
                            this.showToast(this.t('returnAnchorFailed'));
                        }
                    }
                    return;
                }

                // 关键修复：检查是否在底部，如果在底部需要强制滚动
                const isAtBottomContainer = this.scrollManager.isAtBottom(50);
                console.log('[ChatGPT Helper] 返回锚点，是否在底部:', isAtBottomContainer);

                // 获取锚点位置
                const anchorTop = this.anchorManager.previousAnchor?.top;
                if (anchorTop === undefined) {
                    this.showToast(this.t('returnAnchorFailed'));
                    return;
                }

                // 完全禁用 ScrollLockManager，并临时恢复原始 scrollTop setter
                const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
                let originalScrollTopDescriptor = null;
                let scrollTopRestored = false;

                if (wasLockEnabled && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                    this.scrollLockManager.setEnabled(false);
                    originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;

                    // 关键修复：临时恢复原始的 scrollTop setter（绕过劫持）
                    if (originalScrollTopDescriptor && isAtBottomContainer) {
                        try {
                            Object.defineProperty(Element.prototype, 'scrollTop', originalScrollTopDescriptor);
                            scrollTopRestored = true;
                            console.log('[ChatGPT Helper] 已临时恢复原始 scrollTop setter（自动锚点）');
                        } catch (e) {
                            console.warn('[ChatGPT Helper] 恢复 scrollTop setter 失败:', e);
                        }
                    }
                } else if (wasLockEnabled) {
                    this.scrollLockManager.setEnabled(false);
                }

                // 设置 bypassLock 标志
                container.__ghBypassLock = true;

                // 获取原生 scrollTop setter
                const getNativeSetter = () => {
                    if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
                        return originalScrollTopDescriptor.set;
                    }
                    const proto = Object.getPrototypeOf(container);
                    const descriptor = Object.getOwnPropertyDescriptor(proto, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop') ||
                        Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');
                    return descriptor?.set;
                };

                const nativeSetter = getNativeSetter();

                // 强制滚动函数
                const forceScrollToTarget = () => {
                    try {
                        if (nativeSetter) {
                            nativeSetter.call(container, anchorTop);
                        } else {
                            Object.defineProperty(container, 'scrollTop', {
                                value: anchorTop,
                                writable: true,
                                configurable: true
                            });
                        }
                    } catch (e) {
                        container.scrollTop = anchorTop;
                    }
                };

                // 清理函数：恢复 scrollTop setter 的劫持
                const cleanup = () => {
                    delete container.__ghBypassLock;
                    if (wasLockEnabled && this.scrollLockManager) {
                        if (scrollTopRestored && this.scrollLockManager.originalApis) {
                            try {
                                const self = this.scrollLockManager;
                                Object.defineProperty(Element.prototype, 'scrollTop', {
                                    get: function () {
                                        return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                                    },
                                    set: function (value) {
                                        if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                                            return;
                                        }
                                        if (self.originalApis.scrollTopDescriptor.set) {
                                            self.originalApis.scrollTopDescriptor.set.call(this, value);
                                        }
                                    },
                                    configurable: true,
                                });
                            } catch (e) {
                                console.warn('[ChatGPT Helper] 重新劫持 scrollTop setter 失败:', e);
                            }
                        }
                        setTimeout(() => {
                            this.scrollLockManager.setEnabled(true);
                        }, 200);
                    }
                };

                // 立即执行多次
                forceScrollToTarget();
                setTimeout(() => forceScrollToTarget(), 0);
                setTimeout(() => forceScrollToTarget(), 10);

                // 使用 scrollTo
                try {
                    container.scrollTo({ top: anchorTop, behavior: 'instant', __bypassLock: true });
                } catch (e) {
                    console.log('[ChatGPT Helper] scrollTo 失败:', e);
                }

                // 如果在底部，使用 setInterval 强制滚动
                if (isAtBottomContainer) {
                    console.log('[ChatGPT Helper] 在底部，使用 setInterval 强制滚动到锚点');
                    let attempts = 0;
                    const maxAttempts = 200;
                    const scrollInterval = setInterval(() => {
                        attempts++;
                        const before = container.scrollTop;

                        container.__ghBypassLock = true;
                        if (wasLockEnabled && this.scrollLockManager) {
                            this.scrollLockManager.setEnabled(false);
                        }

                        forceScrollToTarget();

                        const current = container.scrollTop;
                        const diff = Math.abs(current - anchorTop);
                        console.log('[ChatGPT Helper] 强制滚动到锚点尝试', attempts, '当前位置:', current, '目标:', anchorTop, '差值:', diff);

                        if (diff <= 5) {
                            // 真正到达目标位置
                            clearInterval(scrollInterval);
                            cleanup();
                            // 更新锚点管理器状态
                            const currentPos = this.anchorManager._captureCurrentPosition();
                            this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                            this.anchorManager.previousAnchor = currentPos;
                            this.showToast(this.t('returnedPreviousPosition'));
                        } else if (attempts >= maxAttempts) {
                            // 达到最大尝试次数，但未到达目标位置
                            clearInterval(scrollInterval);
                            cleanup();
                            this.showToast(this.t('returnAnchorFailed'));
                        } else if (Math.abs(current - before) < 1 && attempts > 10) {
                            // 如果10次尝试后仍然没有变化，尝试其他方法
                            console.log('[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView');
                            try {
                                const children = Array.from(container.children);
                                for (const child of children) {
                                    const rect = child.getBoundingClientRect();
                                    const childTop = container.scrollTop + rect.top - container.getBoundingClientRect().top;
                                    if (Math.abs(childTop - anchorTop) < 100) {
                                        child.scrollIntoView({ behavior: 'instant', block: 'start' });
                                        break;
                                    }
                                }
                                // 检查是否成功滚动
                                setTimeout(() => {
                                    const finalCurrent = container.scrollTop;
                                    const finalDiff = Math.abs(finalCurrent - anchorTop);
                                    if (finalDiff <= 5) {
                                        // 更新锚点管理器状态
                                        const currentPos = this.anchorManager._captureCurrentPosition();
                                        this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                                        this.anchorManager.previousAnchor = currentPos;
                                        this.showToast(this.t('returnedPreviousPosition'));
                                    } else {
                                        this.showToast(this.t('returnAnchorFailed'));
                                    }
                                }, 100);
                            } catch (e) {
                                console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                                clearInterval(scrollInterval);
                                cleanup();
                                this.showToast(this.t('returnAnchorFailed'));
                            }
                            clearInterval(scrollInterval);
                            cleanup();
                        }
                    }, 10);
                } else {
                    // 不在底部，正常滚动即可
                    const success = this.anchorManager.backToAnchor();
                    cleanup();
                    if (success) {
                        // 更新锚点管理器状态
                        const currentPos = this.anchorManager._captureCurrentPosition();
                        this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                        this.anchorManager.previousAnchor = currentPos;
                        this.showToast(this.t('returnedPreviousPosition'));
                    } else {
                        this.showToast(this.t('returnAnchorFailed'));
                    }
                }
            } catch (error) {
                console.error('[ChatGPT Helper] 返回锚点失败:', error);
                this.showToast(this.t('returnAnchorFailed'));
            }
        },

        updateAnchorButton() {
            const hasAnchor = this.anchorManager ? this.anchorManager.hasAnchor() : this.hasAnchor;

            // 更新侧边栏按钮
            const anchorBtn = document.getElementById('quick-btn-anchor');
            if (anchorBtn) {
                anchorBtn.style.opacity = hasAnchor ? '1' : '0.4';
                anchorBtn.style.cursor = hasAnchor ? 'pointer' : 'default';
                anchorBtn.title = hasAnchor ? this.t('returnPreviousPosition') : this.t('noAnchor');
                anchorBtn.setAttribute('aria-label', anchorBtn.title);
            }

            // 更新底部导航按钮
            const navAnchorBtn = document.getElementById('scroll-anchor-btn');
            if (navAnchorBtn) {
                if (hasAnchor) {
                    navAnchorBtn.style.opacity = '1';
                    navAnchorBtn.style.cursor = 'pointer';
                    navAnchorBtn.title = this.t('returnPreviousPosition');
                    navAnchorBtn.setAttribute('aria-label', navAnchorBtn.title);
                } else {
                    navAnchorBtn.style.opacity = '0.4';
                    navAnchorBtn.style.cursor = 'default';
                    navAnchorBtn.title = this.t('noAnchor');
                    navAnchorBtn.setAttribute('aria-label', navAnchorBtn.title);
                }
            }
        },

        toggleTheme(event) {
            try {
                const currentTheme = this.detectEffectiveThemeFromDom();
                const nextMode = currentTheme === 'dark' ? 'light' : 'dark';
                void this.applyAppearanceMode(nextMode, {
                    persist: true,
                    showToast: true,
                    preferNative: true
                }).catch((error) => {
                    console.error('[ChatGPT Helper] 主题切换失败:', error, error && error.stack);
                    this.showToast(this.t('themeSwitchFailed'));
                });
            } catch (error) {
                console.error('[ChatGPT Helper] 主题切换失败:', error, error.stack);
                this.showToast(this.t('themeSwitchFailed'));
            }
        },

        monitorTheme() {
            const checkTheme = () => {
                const detectedMode = this.detectEffectiveThemeFromDom();
                const changed = this.currentEffectiveTheme !== detectedMode;
                this.syncHelperThemeMode(detectedMode);
                this.settings.themeMode = detectedMode;
                if (changed) {
                    this.updateThemeVisualState();
                }
            };

            checkTheme(); // 初始检查

            if (!this.themeObserver) {
                this.themeObserver = new MutationObserver(() => {
                    checkTheme();
                });
                // 监听 body 的 class、data-theme 和 style 变化（主要方法）
                this.themeObserver.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'style'],
                });
                // 监听 html 的 class、data-theme 和 style 变化
                this.themeObserver.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'style'],
                });

                // 也监听主题变化事件
                window.addEventListener('themechange', checkTheme);
                document.addEventListener('themechange', checkTheme);
            }
        },

        showToast(message) {
            const existing = document.getElementById('chatgpt-helper-toast');
            if (existing) existing.remove();

            const toast = createElement('div', {
                id: 'chatgpt-helper-toast',
                className: 'chatgpt-helper-toast'
            }, message);
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        },

        bindEvents() {
            // 监听页面变化，重新查找元素
            let updateTimeout = null;
            const observer = new MutationObserver((mutations) => {
                // 检查是否是大纲列表内部的变化，如果是则忽略（避免干扰用户交互）
                let isOutlineInternalChange = false;
                for (const mutation of mutations) {
                    const target = mutation.target;
                    if (target && (
                        target.id === 'outline-list' ||
                        target.id === 'outline-list-wrapper' ||
                        target.closest('#outline-list') ||
                        target.closest('#outline-list-wrapper')
                    )) {
                        isOutlineInternalChange = true;
                        break;
                    }
                }
                // 如果是大纲内部变化，不触发更新
                if (isOutlineInternalChange) {
                    return;
                }

                // 防抖处理
                if (updateTimeout) clearTimeout(updateTimeout);
                updateTimeout = setTimeout(() => {
                    this.adapter.findTextarea();
                    if (this.currentTab === 'outline') {
                        // 只有在 outlineManager 不存在时才重新创建
                        // 如果已存在，只刷新内容，不重置管理器
                        if (!this.outlineManager) {
                            const content = this.panel?.querySelector('#outline-content');
                            if (content) {
                                this.renderOutline(content);
                            }
                        } else {
                            // 如果管理器已存在，只刷新大纲数据，不重新创建管理器
                            const outline = this.extractOutline();
                            if (outline && outline.length > 0) {
                                this.outlineManager.update(outline);
                            }
                        }
                    }
                    // 重新调整布局（可能页面结构变化了）
                    if (this.updateLayout) {
                        this.updateLayout();
                    }
                    this.queueThemeHostRefresh();
                }, 300);
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 监听 URL 变化（SPA 导航）
            let lastUrl = location.href;
            let lastPathname = location.pathname;
            const urlObserver = new MutationObserver(() => {
                const currentUrl = location.href;
                const currentPathname = location.pathname;
                if (currentUrl !== lastUrl) {
                    const wasInConversation = lastPathname.includes('/c/');
                    const isInConversation = currentPathname.includes('/c/');
                    
                    // 检测是否进入新会话页面（从非对话页面进入对话页面，或从一个对话进入另一个对话）
                    const enteredNewConversation = (!wasInConversation && isInConversation) || 
                                                   (wasInConversation && isInConversation && currentPathname !== lastPathname);
                    
                    lastUrl = currentUrl;
                    lastPathname = currentPathname;
                    
                    // URL 变化时，延迟更新布局和元素
                    setTimeout(() => {
                        this.adapter.findTextarea();
                        if (this.updateLayout) {
                            this.updateLayout();
                        }
                        this.queueThemeHostRefresh();
                        if (this.currentTab === 'outline') {
                            // 重置大纲管理器，强制重新初始化
                            if (this.outlineManager) {
                                this.outlineManager.stopSyncScroll();
                                this.outlineManager = null;
                            }
                            const content = this.panel?.querySelector('#outline-content');
                            if (content) {
                                this.renderOutline(content);
                            }
                        }
                        
                        // 如果进入新会话页面，自动同步并更新已展开的文件夹
                        if (enteredNewConversation && this.conversationManager) {
                            // 延迟一点时间，确保DOM已更新
                            setTimeout(() => {
                                this.conversationManager.syncConversations();
                            }, 1500);
                        }
                    }, 1000);
                }
            });

            urlObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 使用 popstate 监听浏览器导航
            window.addEventListener('popstate', () => {
                setTimeout(() => {
                    this.adapter.findTextarea();
                    if (this.updateLayout) {
                        this.updateLayout();
                    }
                    this.queueThemeHostRefresh();
                    // 重置大纲管理器
                    if (this.currentTab === 'outline') {
                        if (this.outlineManager) {
                            this.outlineManager.stopSyncScroll();
                            this.outlineManager = null;
                        }
                        const content = this.panel?.querySelector('#outline-content');
                        if (content) {
                            this.renderOutline(content);
                        }
                    }
                    
                    // 如果进入新会话页面，自动同步并更新已展开的文件夹
                    if (location.pathname.includes('/c/') && this.conversationManager) {
                        setTimeout(() => {
                            this.conversationManager.syncConversations();
                        }, 1500);
                    }
                }, 1000);
            });
        }
    });
})();
