// Chrome Extension Content Script - ChatGPT Helper App Layout
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
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Layout module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        createLayout() {
            try {
                // 检查是否已经存在面板
                const existingPanel = document.getElementById('chatgpt-helper-right');
                if (existingPanel) {
                    this.panel = existingPanel;
                    try {
                        this.initResizeHandle();
                    } catch (e) {
                        console.error('[ChatGPT Helper] initResizeHandle 错误:', e);
                    }
                    return;
                }

                // 直接创建右栏面板，使用固定定位
                // 通过 CSS 调整 ChatGPT 原有布局，实现三栏效果
                const rightBar = createElement('div', {
                    id: 'chatgpt-helper-right',
                    className: this.isCollapsed ? 'collapsed' : ''
                });

                // 确保添加到 body 的末尾，避免干扰现有元素
                if (document.body) {
                    try {
                        document.body.appendChild(rightBar);
                        this.panel = rightBar;
                        try {
                            this.initResizeHandle();
                        } catch (e) {
                            console.error('[ChatGPT Helper] initResizeHandle 错误:', e);
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] 添加面板到 body 错误:', e);
                    }
                } else {
                    // 如果 body 还没准备好，等待
                    let checkBodyInterval = null;
                    const checkBody = () => {
                        try {
                            if (document.body) {
                                document.body.appendChild(rightBar);
                                this.panel = rightBar;
                                try {
                                    this.initResizeHandle();
                                } catch (e) {
                                    console.error('[ChatGPT Helper] initResizeHandle 错误:', e);
                                }
                                if (checkBodyInterval) {
                                    clearInterval(checkBodyInterval);
                                    checkBodyInterval = null;
                                }
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] checkBody 错误:', e);
                        }
                    };

                    checkBodyInterval = setInterval(checkBody, 100);

                    // 超时保护
                    setTimeout(() => {
                        if (checkBodyInterval) {
                            clearInterval(checkBodyInterval);
                            checkBodyInterval = null;
                        }
                        try {
                            if (!this.panel && document.body) {
                                document.body.appendChild(rightBar);
                                this.panel = rightBar;
                                try {
                                    this.initResizeHandle();
                                } catch (e) {
                                    console.error('[ChatGPT Helper] initResizeHandle 错误:', e);
                                }
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] 超时后添加面板错误:', e);
                        }
                    }, 5000);
                }

                // 延迟调整布局，确保 ChatGPT 的 DOM 已经渲染
                setTimeout(() => {
                    try {
                        if (this.adjustChatGPTLayout) {
                            this.adjustChatGPTLayout();
                        }
                    } catch (e) {
                        console.error('[ChatGPT Helper] adjustChatGPTLayout 错误:', e);
                    }
                }, 500);
            } catch (e) {
                console.error('[ChatGPT Helper] createLayout 错误:', e);
                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
            }
        },

        adjustChatGPTLayout() {
            // 使用更温和的方式调整布局，只调整主容器的右边距
            const updateLayout = () => {
                // 修复：折叠时 margin 为 0，展开时为面板宽度
                const marginValue = this.isCollapsed ? 0 : this.settings.panelWidth;

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

            // 延迟执行，等待页面完全加载
            setTimeout(updateLayout, 500);
            setTimeout(updateLayout, 1500);
            setTimeout(updateLayout, 3000);

            // 保存更新函数供 toggleCollapse 使用
            this.updateLayout = updateLayout;
        },

        initResizeHandle() {
            if (!this.panel) return;

            // 如果拖拽手柄已经存在，则不重复创建（避免被 createUI 清空后无法重新挂载）
            let handle = this.panel.querySelector('#chatgpt-helper-resize-handle');
            if (!handle) {
                handle = document.createElement('div');
                handle.id = 'chatgpt-helper-resize-handle';
                this.panel.appendChild(handle);
            }

            let startX = 0;
            let startWidth = 0;
            let rafId = null;
            let latestClientX = 0;
            let lastLayoutUpdateTs = 0;
            const layoutUpdateIntervalMs = 50; // 降低拖拽期间的整页 reflow 频率（20fps）

            const onMouseMove = (e) => {
                if (!this.panel) return;
                
                // 记录最新坐标；每帧最多更新一次，避免 cancel/schedule 震荡
                latestClientX = e.clientX;

                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    const delta = startX - latestClientX;
                    let newWidth = startWidth + delta;
                    const minWidth = 220;
                    const maxWidth = 640;
                    if (newWidth < minWidth) newWidth = minWidth;
                    if (newWidth > maxWidth) newWidth = maxWidth;

                    this.settings.panelWidth = newWidth;
                    this.panel.style.width = `${newWidth}px`;

                    // 拖拽期间同步“主内容区让位”是最重的操作（会触发 reflow），因此降频执行
                    if (this.updateLayout) {
                        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
                        if (now - lastLayoutUpdateTs >= layoutUpdateIntervalMs) {
                            lastLayoutUpdateTs = now;
                            this.updateLayout();
                        }
                    }
                });
            };

            const onMouseUp = () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.body.style.userSelect = '';
                document.body.classList.remove('gh-resizing');
                if (this.panel) this.panel.classList.remove('gh-resizing');
                // 松手后做一次最终布局同步，确保主内容区与最终宽度一致
                if (this.updateLayout) this.updateLayout();
                this.saveSettings();
            };

            handle.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                startX = e.clientX;
                latestClientX = e.clientX;
                startWidth = this.panel ? this.panel.getBoundingClientRect().width : this.settings.panelWidth;
                document.body.style.userSelect = 'none';
                document.body.classList.add('gh-resizing');
                this.panel.classList.add('gh-resizing');
                lastLayoutUpdateTs = 0; // 确保第一帧就能更新一次布局
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
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
                    tabsContainer.style.setProperty('--tab-padding-h', `${8 * ratio}px`);
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

        updateCollapseButtonState() {
            const collapseBtn = document.getElementById('chatgpt-helper-collapse-btn');
            if (!collapseBtn) return;

            const nextTitle = this.isCollapsed ? this.t('expand') : this.t('collapse');
            setButtonIcon(collapseBtn, this.isCollapsed ? 'expand' : 'collapse', { size: 16 });
            collapseBtn.title = nextTitle;
            collapseBtn.setAttribute('aria-label', nextTitle);
        },

        createUI() {
            if (!this.panel) return;

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
                window.open('https://chatgpt.com', '_blank');
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
            collapseBtn.appendChild(createSvgIconNode(this.isCollapsed ? 'expand' : 'collapse', { size: 16 }));
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

            const aboutBtn = createElement('button', {
                className: 'chatgpt-helper-header-btn chatgpt-helper-header-about-btn',
                title: this.t('aboutTopEntryTitle') || this.t('aboutButton') || 'About',
                id: 'chatgpt-helper-header-about-btn',
                type: 'button'
            });
            const aboutIcon = createElement('span', { className: 'chatgpt-helper-about-entry-icon' }, 'i');
            aboutIcon.setAttribute('aria-hidden', 'true');
            aboutBtn.appendChild(aboutIcon);
            aboutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openAboutModal();
            });

            controls.appendChild(themeBtn);
            controls.appendChild(newChatBtn);
            controls.appendChild(refreshBtn);
            controls.appendChild(settingsBtn);
            controls.appendChild(collapseBtn);
            controls.appendChild(aboutBtn);

            header.appendChild(title);
            header.appendChild(controls);
            this.panel.appendChild(header);
            this.updateCollapseButtonState();
            
            // 头部按钮自适应（避免拖动变窄时按钮溢出到右侧不可见）
            this.initHeaderResponsiveSpacing(header);

            // Tab 导航
            const tabs = createElement('div', { id: 'chatgpt-helper-tabs' });
            tabs.setAttribute('role', 'tablist');
            const tabOrder = this.settings.tabOrder || ['prompts', 'outline', 'conversations', 'export'];

            tabOrder.forEach(tabId => {
                if (tabId === 'settings') return; // 设置按钮在头部
                const def = TAB_DEFINITIONS[tabId];
                if (!def) return;

                const tab = createElement('button', {
                    className: `chatgpt-helper-tab ${this.currentTab === tabId ? 'active' : ''}`,
                    'data-tab': tabId,
                    id: `${tabId}-tab`,
                    type: 'button',
                    role: 'tab',
                    'aria-selected': String(this.currentTab === tabId),
                    'aria-controls': `${tabId}-content`
                });
                
                // 创建六个点的拖拽手柄
                const dragHandle = createElement('span', {
                    className: 'chatgpt-helper-tab-drag-handle',
                    draggable: true
                });
                dragHandle.innerHTML = '⋮&nbsp;⋮';
                dragHandle.setAttribute('title', this.t('dragToReorder'));
                
                tab.appendChild(dragHandle);
                tab.appendChild(createSvgIconNode(def.iconName || 'list', {
                    size: 15,
                    className: 'chatgpt-helper-tab-icon'
                }));
                // 使用国际化文本
                const tabLabel = tabId === 'prompts' ? this.t('tabPrompts') :
                    tabId === 'outline' ? this.t('tabOutline') :
                        tabId === 'conversations' ? this.t('tabConversations') :
                            tabId === 'export' ? this.t('tabExport') :
                                tabId === 'settings' ? this.t('tabSettings') : def.label;
                tab.appendChild(createElement('span', {}, tabLabel));
                tab.addEventListener('click', () => this.switchTab(tabId));
                
                // 拖拽事件 - 绑定到拖拽手柄
                dragHandle.addEventListener('dragstart', (e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', tabId);
                    tab.classList.add('dragging');
                    // 设置一个标记，表示正在拖拽
                    tabs.setAttribute('data-dragging', 'true');
                });
                
                dragHandle.addEventListener('dragend', (e) => {
                    e.stopPropagation();
                    tab.classList.remove('dragging');
                    tabs.removeAttribute('data-dragging');
                    // 移除所有拖拽相关的样式
                    tabs.querySelectorAll('.chatgpt-helper-tab').forEach(t => {
                        t.classList.remove('drag-over', 'drag-before', 'drag-after');
                    });
                });
                
                tab.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    const draggingTab = tabs.querySelector('.dragging');
                    if (draggingTab && draggingTab !== tab) {
                        const allTabs = Array.from(tabs.querySelectorAll('.chatgpt-helper-tab:not(.dragging)'));
                        const currentIndex = allTabs.indexOf(tab);
                        const rect = tab.getBoundingClientRect();
                        const mouseX = e.clientX;
                        const tabCenter = rect.left + rect.width / 2;
                        
                        // 清除之前的样式
                        tabs.querySelectorAll('.chatgpt-helper-tab').forEach(t => {
                            t.classList.remove('drag-before', 'drag-after');
                        });
                        
                        if (mouseX < tabCenter) {
                            tab.classList.add('drag-before');
                        } else {
                            tab.classList.add('drag-after');
                        }
                    }
                });
                
                tab.addEventListener('dragleave', (e) => {
                    // 只有当鼠标真正离开tab区域时才移除样式
                    const rect = tab.getBoundingClientRect();
                    if (e.clientX < rect.left || e.clientX > rect.right || 
                        e.clientY < rect.top || e.clientY > rect.bottom) {
                        tab.classList.remove('drag-over', 'drag-before', 'drag-after');
                    }
                });
                
                tab.addEventListener('drop', (e) => {
                    e.preventDefault();
                    tab.classList.remove('drag-over', 'drag-before', 'drag-after');
                    const draggedTabId = e.dataTransfer.getData('text/html');
                    const draggedTab = tabs.querySelector(`[data-tab="${draggedTabId}"]`);
                    
                    if (draggedTab && draggedTab !== tab) {
                        const allTabs = Array.from(tabs.querySelectorAll('.chatgpt-helper-tab'));
                        const draggedIndex = allTabs.indexOf(draggedTab);
                        const targetIndex = allTabs.indexOf(tab);
                        
                        // 计算新的插入位置
                        const rect = tab.getBoundingClientRect();
                        const mouseX = e.clientX;
                        const tabCenter = rect.left + rect.width / 2;
                        const insertBefore = mouseX < tabCenter;
                        
                        // 移动DOM元素
                        if (draggedIndex < targetIndex) {
                            if (insertBefore) {
                                tabs.insertBefore(draggedTab, tab);
                            } else {
                                tabs.insertBefore(draggedTab, tab.nextSibling);
                            }
                        } else {
                            if (insertBefore) {
                                tabs.insertBefore(draggedTab, tab);
                            } else {
                                tabs.insertBefore(draggedTab, tab.nextSibling);
                            }
                        }
                        
                        // 更新tabOrder
                        const newOrder = Array.from(tabs.querySelectorAll('.chatgpt-helper-tab')).map(t => t.dataset.tab);
                        this.settings.tabOrder = newOrder;
                        this.saveSettings();
                    }
                });
                
                tabs.appendChild(tab);
            });

            this.panel.appendChild(tabs);

            // 添加响应式间距调整
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
            navScrollTopBtn.appendChild(createElement('span', {}, this.t('buttonScrollTop')));
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
            navAnchorBtn.appendChild(createElement('span', {}, this.t('buttonBack')));
            navAnchorBtn.addEventListener('click', () => this.handleAnchorClick());

            const navScrollBottomBtn = createElement('button', {
                className: 'scroll-nav-btn',
                id: 'scroll-bottom-btn',
                title: this.t('outlineScrollBottom'),
                type: 'button',
                'aria-label': this.t('outlineScrollBottom')
            });
            navScrollBottomBtn.appendChild(createSvgIconNode('arrowDown', { size: 15 }));
            navScrollBottomBtn.appendChild(createElement('span', {}, this.t('buttonScrollBottom')));
            navScrollBottomBtn.addEventListener('click', () => this.scrollToBottom());

            scrollNavContainer.appendChild(navScrollTopBtn);
            scrollNavContainer.appendChild(navAnchorBtn);
            scrollNavContainer.appendChild(navScrollBottomBtn);
            this.panel.appendChild(scrollNavContainer);

            // 初始化内容
            this.switchTab(this.currentTab);
        },

        switchTab(tabName) {
            this.currentTab = tabName;

            // 更新 Tab 状态
            const tabs = this.panel.querySelectorAll('.chatgpt-helper-tab');
            tabs.forEach(tab => {
                const isActive = tab.dataset.tab === tabName;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
            });

            // 更新内容面板显示
            const panels = this.panel.querySelectorAll('.chatgpt-helper-content-panel');
            panels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `${tabName}-content`);
            });

            // 渲染对应Tab的内容
            const panel = this.panel.querySelector(`#${tabName}-content`);
            if (panel) {
                clearElement(panel);

                if (tabName === 'prompts') {
                    this.renderPrompts(panel);
                } else if (tabName === 'outline') {
                    this.renderOutline(panel);
                    if (this.outlineManager) {
                        this.outlineManager.setActive(true);
                    }
                } else if (tabName === 'conversations') {
                    this.renderConversations(panel);
                    // 切换到其他Tab时，停用大纲管理器
                    if (this.outlineManager) {
                        this.outlineManager.setActive(false);
                    }
                } else if (tabName === 'export') {
                    this.renderExport(panel);
                    // 切换到导出时，同样停用大纲管理器
                    if (this.outlineManager) {
                        this.outlineManager.setActive(false);
                    }
                } else if (tabName === 'settings') {
                    this.renderSettings(panel);
                    // 切换到其他Tab时，停用大纲管理器
                    if (this.outlineManager) {
                        this.outlineManager.setActive(false);
                    }
                } else {
                    // 切换到其他Tab时，停用大纲管理器
                    if (this.outlineManager) {
                        this.outlineManager.setActive(false);
                    }
                }
            }
        }
    });
})();
