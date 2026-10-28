import { COLLAPSED_BUTTON_DEFS, DEFAULT_COLLAPSED_BUTTONS_ORDER, createCollapsedButtonIconNode, createElement, createHelperLogoNode, createSvgIconNode, setButtonIcon } from './10-base.js';
import { RuntimeScope, isHelperMutation } from './15-runtime.js';
// Chrome Extension Content Script - ChatGPT Helper App Controls And Events



export const ControlsFeature = {
    toggleCollapse(options = {}) {
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
        if (options.persist !== false) {
            this.settings.defaultPanelState = !this.isCollapsed;
            this.saveSettings();
        }
    },

    createCollapsedButtons() {
        this.quickButtonsCleanup?.();
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

        const savedOrder = Array.isArray(this.settings.collapsedButtonsOrder)
            ? this.settings.collapsedButtonsOrder
            : [];
        const orderedIds = Array.from(new Set(savedOrder
            .map(item => item?.id)
            .filter(id => COLLAPSED_BUTTON_DEFS[id])));
        DEFAULT_COLLAPSED_BUTTONS_ORDER.forEach((item) => {
            if (!orderedIds.includes(item.id)) orderedIds.push(item.id);
        });
        const btnOrder = orderedIds.map(id => ({ id, enabled: true }));
        const quickButtons = {};

        btnOrder.forEach((btnConfig, index) => {
            const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
            if (!def) return;

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
                        e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    this.setAnchorManually();
                };
                setBtn.addEventListener('click', handleSetClick, { capture: false, passive: false });

                const backBtn = createElement('button', {
                    className: 'chatgpt-helper-quick-btn' + (this.savedAnchorTop === null ? ' disabled' : ''),
                    title: this.savedAnchorTop === null ? this.t('noAnchor') : this.t('returnAnchor'),
                    id: 'manual-anchor-back-btn',
                    type: 'button',
                    'aria-label': this.savedAnchorTop === null ? this.t('noAnchor') : this.t('returnAnchor')
                });
                backBtn.appendChild(createSvgIconNode('back', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
                const handleBackClick = (e) => {
                        e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    if (this.savedAnchorTop !== null) {
                        this.backToManualAnchor();
                    } else {
                        this.showToast(this.t('noAnchor'));
                    }
                };
                backBtn.addEventListener('click', handleBackClick, { capture: false, passive: false });

                const clearBtn = createElement('button', {
                    className: 'chatgpt-helper-quick-btn' + (this.savedAnchorTop === null ? ' disabled' : ''),
                    title: this.t('clearAnchor'),
                    id: 'manual-anchor-clear-btn',
                    type: 'button',
                    'aria-label': this.t('clearAnchor')
                });
                clearBtn.appendChild(createSvgIconNode('close', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
                const handleClearClick = (e) => {
                        e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    if (this.savedAnchorTop !== null) {
                        this.clearAnchorManually();
                    } else {
                        this.showToast(this.t('noAnchor'));
                    }
                };
                clearBtn.addEventListener('click', handleClearClick, { capture: false, passive: false });

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
                        e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    // 执行对应的操作
                    try {
                        if (btnId === 'scrollTop') {
                                self.scrollToTop();
                        } else if (btnId === 'scrollBottom') {
                                self.scrollToBottom();
                        } else if (btnId === 'panel') {
                                self.toggleCollapse();
                        } else if (btnId === 'anchor') {
                                self.handleAnchorClick();
                        } else if (btnId === 'theme') {
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

                btn.addEventListener('click', handleClick);

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

        const minimize = createElement('button', {
            id: 'quick-btn-minimize', className: 'chatgpt-helper-quick-btn', type: 'button',
            title: this.t('minimizeQuickButtons'), 'aria-label': this.t('minimizeQuickButtons')
        });
        minimize.appendChild(createSvgIconNode('minus', { size: 18, className: 'chatgpt-helper-quick-btn-icon' }));
        btnGroup.appendChild(minimize);

        const bubble = createElement('button', {
            id: 'quick-btn-bubble', className: 'chatgpt-helper-quick-bubble', type: 'button',
            title: this.t('expandQuickButtons'), 'aria-label': this.t('expandQuickButtons')
        });
        bubble.appendChild(createHelperLogoNode({ size: 30 }));
        btnGroup.appendChild(bubble);
        document.body.appendChild(btnGroup);

        const positionBubble = (dock = false) => {
            if (!this.quickButtonsMinimized) return;
            const rect = btnGroup.getBoundingClientRect();
            const width = rect.width || 54, height = rect.height || 54;
            const point = this.quickBubblePosition || { x: window.innerWidth - width - 8, y: (window.innerHeight - height) / 2 };
            const edgeInset = Math.min(8, Math.max(0, (window.innerWidth - width) / 2));
            this.quickBubblePosition = {
                x: dock ? (this.quickBubbleEdge === 'left' ? edgeInset : Math.max(edgeInset, window.innerWidth - width - edgeInset))
                    : Math.max(0, Math.min(point.x, window.innerWidth - width)),
                y: Math.max(0, Math.min(point.y, window.innerHeight - height))
            };
            btnGroup.style.left = `${this.quickBubblePosition.x}px`;
            btnGroup.style.top = `${this.quickBubblePosition.y}px`;
        };
        const setMinimized = minimized => {
            this.quickButtonsMinimized = minimized;
            btnGroup.classList.toggle('minimized', minimized);
            if (minimized) positionBubble(true);
            else {
                btnGroup.style.removeProperty('left');
                btnGroup.style.removeProperty('top');
            }
        };
        minimize.addEventListener('click', () => {
            setMinimized(true);
            bubble.focus();
        });
        let drag = null;
        let suppressClick = false;
        bubble.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            const rect = btnGroup.getBoundingClientRect();
            drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false };
            suppressClick = false;
            btnGroup.classList.add('bubble-dragging');
            bubble.setPointerCapture(event.pointerId);
        });
        bubble.addEventListener('pointermove', event => {
            if (!drag || event.pointerId !== drag.id) return;
            const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
            if (!drag.moved && Math.hypot(dx, dy) < 5) return;
            drag.moved = true;
            bubble.classList.add('dragging');
            this.quickBubblePosition = { x: drag.left + dx, y: drag.top + dy };
            positionBubble();
        });
        const finishDrag = event => {
            if (!drag || event.pointerId !== drag.id) return;
            suppressClick = drag.moved;
            if (drag.moved) {
                const rect = btnGroup.getBoundingClientRect();
                this.quickBubbleEdge = rect.left + rect.width / 2 < window.innerWidth / 2 ? 'left' : 'right';
            }
            drag = null;
            bubble.classList.remove('dragging');
            btnGroup.classList.remove('bubble-dragging');
            if (suppressClick) positionBubble(true);
        };
        bubble.addEventListener('pointerup', finishDrag);
        bubble.addEventListener('pointercancel', finishDrag);
        bubble.addEventListener('lostpointercapture', finishDrag);
        bubble.addEventListener('click', () => {
            if (suppressClick) { suppressClick = false; return; }
            setMinimized(false);
            minimize.focus();
        });
        const onResize = () => positionBubble(!drag);
        window.addEventListener('resize', onResize);
        this.quickButtonsCleanup = () => window.removeEventListener('resize', onResize);
        if (!this.quickButtonsScopeBound && this.scope) {
            this.quickButtonsScopeBound = true;
            this.scope.cleanups.push(() => this.quickButtonsCleanup?.());
        }
        setMinimized(Boolean(this.quickButtonsMinimized));
        this.quickButtons = quickButtons;
    },

    scrollToTop() {
        const current = this.scrollManager.scrollTop;
        if (current > 100) this.anchorManager?.setAnchor(current);
        this.scrollManager.scrollTo({ top: 0, behavior: 'smooth' });
    },

    scrollToBottom() {
        const current = this.scrollManager.scrollTop;
        if (!this.scrollManager.isAtBottom()) this.anchorManager?.setAnchor(current);
        this.scrollManager.scrollTo({ top: this.scrollManager.scrollHeight, behavior: 'smooth' });
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
        this.scrollManager.scrollTo({ top: this.savedAnchorTop, behavior: 'smooth' });
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
        if (!this.anchorManager?.backToAnchor()) this.showToast(this.t('noAnchorAutoHint'));
        this.updateAnchorButton();
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
        this.themeScope?.dispose();
        const scope = this.themeScope = new RuntimeScope();
        const checkTheme = () => {
            const mode = this.detectEffectiveThemeFromDom();
            if (mode === this.currentEffectiveTheme) return;
            this.syncHelperThemeMode(mode);
            this.syncNativeThemeScopes(mode);
            this.settings.themeMode = mode;
            this.updateThemeVisualState();
        };
        checkTheme();
        const options = { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] };
        scope.observe(document.documentElement, options, checkTheme);
        scope.observe(document.body, options, checkTheme);
        scope.listen(window, 'themechange', checkTheme);
        scope.listen(document, 'themechange', checkTheme);
    },

    showToast(message) {
        const existing = document.getElementById('chatgpt-helper-toast');
        if (existing) existing.remove();

        const toast = createElement('div', {
            id: 'chatgpt-helper-toast',
            className: 'chatgpt-helper-toast',
            role: 'status',
            'aria-live': 'polite'
        }, message);
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    },

    bindEvents() {
        this.pageScope?.dispose();
        const scope = this.pageScope = new RuntimeScope();
        let lastPath = location.pathname;
        let lastMain = this.adapter.getChatContainer();
        const refreshHost = () => {
            const routeChanged = lastPath !== location.pathname;
            lastPath = location.pathname;
            const currentMain = this.adapter.getChatContainer();
            const pageChanged = currentMain !== lastMain;
            lastMain = currentMain;
            this.adapter.findTextarea();
            this.updateLayout();
            this.queueThemeHostRefresh();
            if (!routeChanged && !pageChanged) return;
            this.messageSelectManager.refreshContext();
            this.exporterController?.contextChanged();
            this.scrollManager.cancel();
            if (routeChanged) {
                this.anchorManager?.reset();
                this.savedAnchorTop = null;
                this.hideAnchorMarker();
                this.updateManualAnchorButtons();
            }
            this.scrollLockManager?.clearCache();
            this.scrollLockManager?.refreshContainerListener();
            this.readingProgressManager?.stopRecording();
            this.readingProgressManager?.startRecording();
            if (this.currentTab === 'outline') this.refreshOutline();
            if (routeChanged && lastPath.includes('/c/') && this.conversationManager) {
                scope.schedule('sync-conversations', () => this.conversationManager.syncConversations(), 1500);
            }
        };
        const schedule = () => scope.schedule('host', refreshHost, 120);
        scope.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-app-shell-active-page'] }, mutations => {
            if (lastPath !== location.pathname || mutations.some(mutation => {
                if (mutation.type === 'attributes') return true;
                if (isHelperMutation(mutation)) return false;
                // Token streaming belongs to OutlineManager, not host layout/theme refresh.
                const target = mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
                return !target?.closest('[data-message-author-role], [data-content-search-unit-key], [data-chatgpt-search-unit-key], [data-chatgpt-selection-message-id]');
            })) schedule();
        });
        scope.listen(window, 'popstate', schedule);
        // Navigation API also covers pushState without replacing the site's history methods.
        if (window.navigation) scope.listen(window.navigation, 'navigatesuccess', schedule);
        scope.listen(window, 'resize', schedule, { passive: true });
    }
};
