import { PANEL_WIDTH_MAX, PANEL_WIDTH_MIN, TAB_DEFINITIONS, clearElement, createElement, createHelperLogoNode, createSvgIconNode, openExternalLink, setButtonIcon } from './10-base.js';
// Chrome Extension Content Script - ChatGPT Helper App Layout



export const LayoutFeature = {
    createLayout() {
        this.panel = document.getElementById('chatgpt-helper-right');
        if (!this.panel) {
            this.panel = createElement('div', {
                id: 'chatgpt-helper-right',
                className: this.isCollapsed ? 'collapsed' : ''
            });
            document.body.appendChild(this.panel);
        }
        this.initResizeHandle();
        this.adjustChatGPTLayout();
    },

    adjustChatGPTLayout() {
        // 使用更温和的方式调整布局，只调整主容器的右边距
        const updateLayout = () => {
            // 修复：折叠时 margin 为 0，展开时为面板宽度
            const marginValue = this.isCollapsed || window.innerWidth < 768 ? 0 : this.settings.panelWidth;

            // 用 CSS 变量驱动，拖拽过程中只更新变量/单个 style 属性，避免频繁 remove/append <style>
            try {
                document.documentElement.style.setProperty('--gh-panel-margin-right', `${marginValue}px`);
            } catch (e) { /* ignore */ }

            // 样式节点只创建一次，避免反复重建
            let layoutStyle = document.getElementById('chatgpt-helper-layout-style');
            if (!layoutStyle) {
                layoutStyle = document.createElement('style');
                layoutStyle.id = 'chatgpt-helper-layout-style';
                layoutStyle.textContent = `
                    /* 只调整主容器的右边距，为右侧面板留出空间（由 CSS 变量驱动） */
                    main,
                    [role="main"] {
                        margin-right: var(--gh-panel-margin-right, 0px) !important;
                        transition: margin-right 0.3s ease !important;
                    }

                    /* 确保页面不横向滚动 */
                    body {
                        overflow-x: hidden !important;
                    }
                `;
                document.head.appendChild(layoutStyle);
            }
        };

        // 立即执行一次
        updateLayout();


        // 保存更新函数供 toggleCollapse 使用
        this.updateLayout = updateLayout;
    },

    initResizeHandle() {
        if (!this.panel) return;
        // UI rebuilds replace the handle; always release its previous drag session first.
        this.resizeHandleCleanup?.();
        const panel = this.panel;
        let handle = panel.querySelector('#chatgpt-helper-resize-handle');
        if (!handle) {
            handle = document.createElement('div');
            handle.id = 'chatgpt-helper-resize-handle';
            panel.appendChild(handle);
        }

        const collapseThreshold = PANEL_WIDTH_MIN - 56;
        const clampWidth = width => Math.max(PANEL_WIDTH_MIN, Math.min(PANEL_WIDTH_MAX, width));
        let dragging = false;
        let startX = 0;
        let startWidth = 0;
        let restoreWidth = 0;
        let latestClientX = 0;
        let rafId = null;
        let previousUserSelect = '';
        let lastLayoutUpdateTs = 0;
        const rawWidth = () => startWidth + startX - latestClientX;
        const applyWidth = width => {
            this.settings.panelWidth = width;
            panel.style.width = `${width}px`;
        };

        const finishDrag = (commit = true, collapse = false) => {
            if (!dragging) return;
            dragging = false;
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('blur', onBlur);
            document.body.style.userSelect = previousUserSelect;
            document.body.classList.remove('gh-resizing');
            panel.classList.remove('gh-resizing');
            if (!commit) return;

            // Collapsing must not persist the narrow preview as the next expanded width.
            applyWidth(collapse ? restoreWidth : clampWidth(rawWidth()));
            if (collapse && !this.isCollapsed) {
                this.toggleCollapse(); // Owns the layout update and single settings save.
            } else {
                this.updateLayout?.();
                this.saveSettings();
            }
        };

        const onMouseMove = event => {
            if (!dragging) return;
            if (event.buttons === 0) {
                // Recover when mouseup occurred outside the page without a window blur.
                finishDrag();
                return;
            }
            latestClientX = event.clientX;
            if (rawWidth() < collapseThreshold) {
                finishDrag(true, true);
                return;
            }
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                if (!dragging) return;
                applyWidth(clampWidth(rawWidth()));
                const now = performance.now();
                if (now - lastLayoutUpdateTs >= 50) {
                    lastLayoutUpdateTs = now;
                    this.updateLayout?.();
                }
            });
        };
        const onMouseUp = event => {
            if (event.button !== 0 || !dragging) return;
            latestClientX = event.clientX;
            // Flush the final position even if mouseup precedes the scheduled frame.
            finishDrag(true, rawWidth() < collapseThreshold);
        };
        const onBlur = () => finishDrag();
        const onMouseDown = event => {
            if (event.button !== 0 || this.isCollapsed || this.destroyed || dragging) return;
            event.preventDefault();
            startX = latestClientX = event.clientX;
            startWidth = panel.getBoundingClientRect().width || this.settings.panelWidth;
            restoreWidth = clampWidth(this.settings.panelWidth || startWidth);
            previousUserSelect = document.body.style.userSelect;
            dragging = true;
            document.body.style.userSelect = 'none';
            document.body.classList.add('gh-resizing');
            panel.classList.add('gh-resizing');
            lastLayoutUpdateTs = -Infinity;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            window.addEventListener('blur', onBlur);
        };
        handle.addEventListener('mousedown', onMouseDown);
        this.resizeHandleCleanup = () => {
            finishDrag(false);
            handle.removeEventListener('mousedown', onMouseDown);
        };
        if (!this.resizeHandleScopeBound && this.scope) {
            this.resizeHandleScopeBound = true;
            this.scope.cleanups.push(() => this.resizeHandleCleanup?.());
        }
    },

    initTabResponsiveSpacing(tabsContainer) {
        if (!tabsContainer) return;

        // 如果已经初始化过，先清理旧的observer
        if (this.tabSpacingObserver) {
            this.tabSpacingObserver.disconnect();
            this.tabSpacingObserver = null;
        }
        if (this.panelSpacingObserver) {
            this.panelSpacingObserver.disconnect();
            this.panelSpacingObserver = null;
        }

        // 更新间距的函数
        const updateSpacing = () => {
            const width = tabsContainer.getBoundingClientRect().width;
            // 极窄时隐藏文字，仅保留图标，避免挤压溢出
            tabsContainer.classList.toggle('icons-only', width < 300);
            // 根据宽度动态调整间距
            // 当宽度小于300px时，开始减小间距
            if (width < 300) {
                // 非常窄时，使用最小间距
                const ratio = Math.max(0.3, (width - 200) / 100); // 200-300px之间线性变化
                tabsContainer.style.setProperty('--tab-padding-h', `${Math.max(4, 8 * ratio)}px`);
                tabsContainer.style.setProperty('--tab-padding-v', `${Math.max(5, 7 * ratio)}px`);
                tabsContainer.style.setProperty('--tab-gap', `${Math.max(2, 5 * ratio)}px`);
                tabsContainer.style.setProperty('--tab-margin', '0px');
            } else if (width < 400) {
                // 中等宽度时，适度减小间距
                const ratio = 0.75 + (width - 300) / 400; // 300-400px之间从0.75到1.0
                tabsContainer.style.setProperty('--tab-padding-h', `${4 * ratio}px`);
                tabsContainer.style.setProperty('--tab-padding-v', `${7 * ratio}px`);
                tabsContainer.style.setProperty('--tab-gap', `${5 * ratio}px`);
                tabsContainer.style.setProperty('--tab-margin', '0px');
            } else {
                // 正常宽度时，使用默认间距
                tabsContainer.style.setProperty('--tab-padding-h', '8px');
                tabsContainer.style.setProperty('--tab-padding-v', '7px');
                tabsContainer.style.setProperty('--tab-gap', '5px');
                tabsContainer.style.setProperty('--tab-margin', '0px');
            }
        };

        // 初始更新
        updateSpacing();

        // 使用ResizeObserver监听容器宽度变化
        let spacingRafId = null;
        const scheduleUpdateSpacing = () => {
            if (spacingRafId) return;
            spacingRafId = requestAnimationFrame(() => {
                spacingRafId = null;
                updateSpacing();
            });
        };

        this.tabSpacingObserver = new ResizeObserver(() => {
            // 宽度变化可能非常频繁（尤其拖拽改变面板宽度时），用 rAF 合并回调
            scheduleUpdateSpacing();
        });

        this.tabSpacingObserver.observe(tabsContainer);

        // 也监听面板宽度变化（当拖拽改变面板宽度时）
        if (this.panel) {
            this.panelSpacingObserver = new ResizeObserver(() => {
                scheduleUpdateSpacing();
            });
            this.panelSpacingObserver.observe(this.panel);
        }
    },

    initHeaderResponsiveSpacing(headerEl) {
        if (!headerEl) return;

        // 如果已经初始化过，先清理旧的observer
        if (this.headerSpacingObserver) {
            this.headerSpacingObserver.disconnect();
            this.headerSpacingObserver = null;
        }

        const updateSpacing = () => {
            try {
                const width = headerEl.getBoundingClientRect().width;

                // 顶部增加了 About 按钮后，提前进入紧凑模式，避免按钮溢出
                const compact = width < 318;
                headerEl.classList.toggle('gh-compact', compact);

                // 非常窄时进一步压缩（避免极限情况下仍溢出）
                if (width < 270) {
                    headerEl.style.setProperty('--gh-header-btn-size', '22px');
                    headerEl.style.setProperty('--gh-header-controls-gap', '2px');
                    headerEl.style.setProperty('--gh-header-padding-h', '8px');
                    headerEl.style.setProperty('--gh-header-padding-v', '9px');
                    headerEl.style.setProperty('--gh-header-btn-font-size', '12px');
                } else if (width < 348) {
                    headerEl.style.setProperty('--gh-header-btn-size', '24px');
                    headerEl.style.setProperty('--gh-header-controls-gap', '2px');
                    headerEl.style.setProperty('--gh-header-padding-h', '10px');
                    headerEl.style.setProperty('--gh-header-padding-v', '10px');
                    headerEl.style.setProperty('--gh-header-btn-font-size', '13px');
                } else if (width < 404) {
                    headerEl.style.setProperty('--gh-header-btn-size', '26px');
                    headerEl.style.setProperty('--gh-header-controls-gap', '3px');
                    headerEl.style.setProperty('--gh-header-padding-h', '12px');
                    headerEl.style.setProperty('--gh-header-padding-v', '11px');
                    headerEl.style.setProperty('--gh-header-btn-font-size', '13px');
                } else {
                    // 恢复默认（清理覆盖值）
                    headerEl.style.removeProperty('--gh-header-btn-size');
                    headerEl.style.removeProperty('--gh-header-controls-gap');
                    headerEl.style.removeProperty('--gh-header-padding-h');
                    headerEl.style.removeProperty('--gh-header-padding-v');
                    headerEl.style.removeProperty('--gh-header-btn-font-size');
                }
            } catch (e) {
                // 忽略异常，避免影响主流程
            }
        };

        // 初始更新
        updateSpacing();

        // 监听 header 宽度变化（面板拖拽会触发）
        let headerSpacingRafId = null;
        const scheduleHeaderUpdateSpacing = () => {
            if (headerSpacingRafId) return;
            headerSpacingRafId = requestAnimationFrame(() => {
                headerSpacingRafId = null;
                updateSpacing();
            });
        };
        this.headerSpacingObserver = new ResizeObserver(() => scheduleHeaderUpdateSpacing());
        this.headerSpacingObserver.observe(headerEl);
    },

    initScrollNavResponsive(navEl) {
        if (!navEl) return;

        // 如果已经初始化过，先清理旧的observer
        if (this.scrollNavObserver) {
            this.scrollNavObserver.disconnect();
            this.scrollNavObserver = null;
        }

        const updateMode = () => {
            const width = navEl.getBoundingClientRect().width;
            // 极窄时隐藏文字，仅保留图标
            navEl.classList.toggle('icons-only', width < 250);
        };

        updateMode();

        let navRafId = null;
        const scheduleUpdate = () => {
            if (navRafId) return;
            navRafId = requestAnimationFrame(() => {
                navRafId = null;
                updateMode();
            });
        };
        this.scrollNavObserver = new ResizeObserver(() => scheduleUpdate());
        this.scrollNavObserver.observe(navEl);
    },

    initPromptsResponsive(panelEl) {
        if (!panelEl) return;

        // 如果已经初始化过，先清理旧的observer
        if (this.promptsResponsiveObserver) {
            this.promptsResponsiveObserver.disconnect();
            this.promptsResponsiveObserver = null;
        }

        const updateMode = () => {
            const width = panelEl.getBoundingClientRect().width;
            // 极窄时隐藏“添加新提示词”按钮与卡片上的编辑/删除按钮
            panelEl.classList.toggle('compact', width < 300);
        };

        updateMode();

        let panelRafId = null;
        const scheduleUpdate = () => {
            if (panelRafId) return;
            panelRafId = requestAnimationFrame(() => {
                panelRafId = null;
                updateMode();
            });
        };
        this.promptsResponsiveObserver = new ResizeObserver(() => scheduleUpdate());
        this.promptsResponsiveObserver.observe(panelEl);
    },

    updateCollapseButtonState() {
        const collapseBtn = document.getElementById('chatgpt-helper-collapse-btn');
        if (!collapseBtn) return;

        const nextTitle = this.isCollapsed ? this.t('expand') : this.t('collapse');
        setButtonIcon(collapseBtn, this.isCollapsed ? 'panelExpand' : 'panelCollapse', { size: 16 });
        collapseBtn.title = nextTitle;
        collapseBtn.setAttribute('aria-label', nextTitle);
    },

    getTabOrder() {
        const defaultTabOrder = ['prompts', 'outline', 'conversations', 'export'];
        const savedOrder = Array.isArray(this.settings.tabOrder) && this.settings.tabOrder.length > 0
            ? this.settings.tabOrder.filter(tabId => defaultTabOrder.includes(tabId))
            : [];
        return savedOrder.length > 0 ? savedOrder : [...defaultTabOrder];
    },

    getTabLabel(tabId) {
        return tabId === 'prompts' ? this.t('tabPrompts') :
            tabId === 'outline' ? this.t('tabOutline') :
                tabId === 'conversations' ? this.t('tabConversations') :
                    tabId === 'export' ? this.t('tabExport') :
                        tabId === 'settings' ? this.t('tabSettings') : tabId;
    },

    renderTabBar(tabsEl) {
        if (!tabsEl) return;
        clearElement(tabsEl);

        const tabOrder = this.getTabOrder();
        if (!tabOrder.includes(this.currentTab) && this.currentTab !== 'settings') {
            this.currentTab = tabOrder[0] || 'prompts';
        }

        tabOrder.forEach(tabId => {
            const def = TAB_DEFINITIONS[tabId];
            if (!def) return;

            const tab = createElement('button', {
                className: `chatgpt-helper-tab ${this.currentTab === tabId ? 'active' : ''}`,
                'data-tab': tabId,
                id: `${tabId}-tab`,
                type: 'button',
                role: 'tab',
                'aria-selected': String(this.currentTab === tabId),
                'aria-controls': `${tabId}-content`,
                'aria-label': this.getTabLabel(tabId),
                tabindex: this.currentTab === tabId ? 0 : -1,
                title: this.getTabLabel(tabId)
            });
            tab.appendChild(createSvgIconNode(def.iconName || 'list', {
                size: 15,
                className: 'chatgpt-helper-tab-icon'
            }));
            tab.appendChild(createElement('span', { className: 'chatgpt-helper-tab-label' }, this.getTabLabel(tabId)));
            tab.addEventListener('click', () => this.switchTab(tabId));
            tabsEl.appendChild(tab);
        });
        tabsEl.onkeydown = event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            const tabs = Array.from(tabsEl.querySelectorAll('[role="tab"]'));
            const index = tabs.indexOf(event.target);
            if (index < 0) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
                : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
            this.switchTab(tabs[next].dataset.tab);
            tabs[next].focus();
        };
    },

    rebuildTabBar() {
        if (!this.panel) return;
        const tabs = this.panel.querySelector('#chatgpt-helper-tabs');
        if (!tabs) return;
        this.renderTabBar(tabs);
        this.initTabResponsiveSpacing(tabs);
    },

    createUI() {
        if (!this.panel) return;

        // 记录设置页滚动位置：配置变更后重建 UI 时恢复，避免视图跳回顶部
        try {
            if (this.currentTab === 'settings') {
                const settingsScroll = this.panel.querySelector('#settings-content .chatgpt-helper-settings-compact');
                this.settingsScrollTop = settingsScroll ? settingsScroll.scrollTop : null;
            } else {
                this.settingsScrollTop = null;
            }
        } catch (e) { /* ignore */ }

        clearElement(this.panel);

        // 折叠按钮已移除，只保留侧边栏按钮

        // 头部 - 渐变背景
        const header = createElement('div', { id: 'chatgpt-helper-header' });
        const title = createElement('div', { id: 'chatgpt-helper-title' });
        title.appendChild(createHelperLogoNode({
            size: 18,
            className: 'chatgpt-helper-icon-logo chatgpt-helper-header-logo',
            title: this.t('panelTitle') || 'ChatGPT Helper',
        }));
        title.appendChild(createElement('span', {}, this.t('panelTitle')));

        const controls = createElement('div', { id: 'chatgpt-helper-controls' });

        // 主题切换按钮
        const themeBtn = createElement('button', {
            className: 'chatgpt-helper-header-btn',
            title: this.t('themeToggle'),
            id: 'chatgpt-helper-header-theme-btn',
            type: 'button', // 明确指定按钮类型，避免表单提交等意外行为
            'aria-label': this.t('themeToggle')
        });
        // 初始图标根据当前主题设置
        const isDark = document.body.dataset.ghMode === 'dark' ||
            /\bdark\b/i.test(document.body.className);
        setButtonIcon(themeBtn, isDark ? 'sun' : 'moon', { size: 15 });
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // 阻止同一元素上的其他事件监听器
            this.toggleTheme(e);
            return false; // 额外确保阻止默认行为
        });

        // 新标签页开启对话按钮
        const newChatBtn = createElement('button', {
            className: 'chatgpt-helper-header-btn',
            title: this.t('newChatInTab'),
            id: 'chatgpt-helper-header-newchat-btn',
            type: 'button',
            'aria-label': this.t('newChatInTab')
        });
        newChatBtn.appendChild(createSvgIconNode('plus', { size: 15 }));
        newChatBtn.addEventListener('click', () => {
            // 走统一的 openExternalLink：带 noopener/noreferrer，防 reverse tabnabbing
            openExternalLink('https://chatgpt.com');
        });

        // 刷新按钮
        const refreshBtn = createElement('button', {
            className: 'chatgpt-helper-header-btn',
            title: this.t('refresh'),
            type: 'button',
            'aria-label': this.t('refresh')
        });
        refreshBtn.appendChild(createSvgIconNode('refresh', { size: 15 }));
        refreshBtn.addEventListener('click', () => {
            if (this.currentTab === 'prompts') {
                this.refreshPromptList();
            } else if (this.currentTab === 'outline') {
                this.refreshOutline();
            }
        });

        // 折叠按钮（头部）
        const collapseBtn = createElement('button', {
            className: 'chatgpt-helper-header-btn',
            title: this.isCollapsed ? this.t('expand') : this.t('collapse'),
            id: 'chatgpt-helper-collapse-btn',
            type: 'button',
            'aria-label': this.isCollapsed ? this.t('expand') : this.t('collapse')
        });
        collapseBtn.appendChild(createSvgIconNode(this.isCollapsed ? 'panelExpand' : 'panelCollapse', { size: 16 }));
        collapseBtn.addEventListener('click', () => this.toggleCollapse());

        // 设置按钮
        const settingsBtn = createElement('button', {
            className: 'chatgpt-helper-header-btn',
            title: this.t('settingsTitle'),
            id: 'chatgpt-helper-settings-btn',
            type: 'button',
            'aria-label': this.t('settingsTitle')
        });
        settingsBtn.appendChild(createSvgIconNode('settings', { size: 15 }));
        settingsBtn.addEventListener('click', () => {
            if (this.currentTab === 'settings') {
                this.switchTab(this.previousTab || 'prompts');
            } else {
                this.previousTab = this.currentTab;
                this.switchTab('settings');
            }
        });

        controls.appendChild(themeBtn);
        controls.appendChild(newChatBtn);
        controls.appendChild(refreshBtn);
        controls.appendChild(settingsBtn);
        controls.appendChild(collapseBtn);

        header.appendChild(title);
        header.appendChild(controls);
        this.panel.appendChild(header);
        this.updateCollapseButtonState();

        // 头部按钮自适应（避免拖动变窄时按钮溢出到右侧不可见）
        this.initHeaderResponsiveSpacing(header);

        // Tab 导航（排序与显示配置已移至设置页）
        const tabs = createElement('div', { id: 'chatgpt-helper-tabs' });
        tabs.setAttribute('role', 'tablist');
        this.renderTabBar(tabs);

        this.panel.appendChild(tabs);

        // 添加响应式间距调整（极窄时自动只显示图标）
        this.initTabResponsiveSpacing(tabs);

        // 内容区域
        const content = createElement('div', { id: 'chatgpt-helper-content' });

        // 为每个Tab创建内容面板
        ['prompts', 'outline', 'conversations', 'export', 'settings'].forEach(tabId => {
            const panel = createElement('div', {
                className: `chatgpt-helper-content-panel ${this.currentTab === tabId ? 'active' : ''}`,
                id: `${tabId}-content`,
                'data-tab': tabId,  // 添加 data-tab 属性，供 updateCategoryBar 等函数使用
                role: 'tabpanel',
                'aria-labelledby': tabId === 'settings' ? 'chatgpt-helper-settings-btn' : `${tabId}-tab`
            });
            content.appendChild(panel);
        });

        this.panel.appendChild(content);

        // 确保每次重建 UI 之后都挂载拖拽手柄
        this.initResizeHandle();

        // 底部导航按钮组
        const scrollNavContainer = createElement('div', {
            className: 'scroll-nav-container',
            id: 'scroll-nav-container',
        });

        const navScrollTopBtn = createElement('button', {
            className: 'scroll-nav-btn',
            id: 'scroll-top-btn',
            title: this.t('outlineScrollTop'),
            type: 'button',
            'aria-label': this.t('outlineScrollTop')
        });
        navScrollTopBtn.appendChild(createSvgIconNode('arrowUp', { size: 15 }));
        navScrollTopBtn.appendChild(createElement('span', { className: 'chatgpt-helper-nav-label' }, this.t('buttonScrollTop')));
        navScrollTopBtn.addEventListener('click', () => this.scrollToTop());

        const navAnchorBtn = createElement('button', {
            className: 'scroll-nav-btn',
            id: 'scroll-anchor-btn',
            title: this.t('noAnchor'),
            type: 'button',
            'aria-label': this.t('returnPreviousPosition'),
            style: 'opacity: 0.4; cursor: default;'
        });
        navAnchorBtn.appendChild(createSvgIconNode('anchor', { size: 15 }));
        navAnchorBtn.appendChild(createElement('span', { className: 'chatgpt-helper-nav-label' }, this.t('buttonBack')));
        navAnchorBtn.addEventListener('click', () => this.handleAnchorClick());

        const navScrollBottomBtn = createElement('button', {
            className: 'scroll-nav-btn',
            id: 'scroll-bottom-btn',
            title: this.t('outlineScrollBottom'),
            type: 'button',
            'aria-label': this.t('outlineScrollBottom')
        });
        navScrollBottomBtn.appendChild(createSvgIconNode('arrowDown', { size: 15 }));
        navScrollBottomBtn.appendChild(createElement('span', { className: 'chatgpt-helper-nav-label' }, this.t('buttonScrollBottom')));
        navScrollBottomBtn.addEventListener('click', () => this.scrollToBottom());

        scrollNavContainer.appendChild(navScrollTopBtn);
        scrollNavContainer.appendChild(navAnchorBtn);
        scrollNavContainer.appendChild(navScrollBottomBtn);
        this.panel.appendChild(scrollNavContainer);

        // 底部导航按钮自适应（极窄时只显示图标）
        this.initScrollNavResponsive(scrollNavContainer);

        // 初始化内容
        this.switchTab(this.currentTab);
    },

    switchTab(tabName) {
        const renderers = {
            prompts: 'renderPrompts', outline: 'renderOutline', conversations: 'renderConversations',
            export: 'renderExport', settings: 'renderSettings'
        };
        if (!renderers[tabName]) return;
        if (this.currentTab === 'export') this.disposeExporter?.();
        if (tabName !== 'export') this._openImageOnMount = false;
        this.currentTab = tabName;
        this.panel.querySelectorAll('.chatgpt-helper-tab').forEach(tab => {
            const active = tab.dataset.tab === tabName;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
        });
        this.panel.querySelectorAll('.chatgpt-helper-content-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === tabName + '-content');
        });
        const panel = this.panel.querySelector('#' + tabName + '-content');
        if (panel) {
            clearElement(panel);
            this[renderers[tabName]](panel);
        }
        this.outlineManager?.setActive(tabName === 'outline');
    }
};
