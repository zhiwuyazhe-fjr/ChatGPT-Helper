// Chrome Extension Content Script - ChatGPT Helper Outline Manager
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
        CopyManager,
        TabRenameManager,
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;

    // ==================== 阶段2：大纲管理器 ====================

    /**
     * 大纲管理器
     * 负责大纲的 UI 渲染、交互和状态管理
     */
    class OutlineManager {
        constructor(config) {
            // 保留原始 config
            this.config = config;
            this.container = config.container;
            this.settings = config.settings;
            this.siteAdapter = config.siteAdapter; // 用于获取滚动容器等
            this.onSettingsChange = config.onSettingsChange;
            this.onJumpBefore = config.onJumpBefore; // 跳转前回调，用于保存锚点
            this.t = config.i18n || ((k) => k);

            this.state = {
                tree: null,
                treeKey: '',
                minLevel: 1,
                expandLevel: this.settings.outline?.maxLevel ?? 6,
                includeUserQueries: this.settings.outline?.showUserQueries ?? false,
                levelCounts: {},
                isAllExpanded: false,
                rawOutline: [],
                // 搜索相关状态
                searchQuery: '',
                searchLevelManual: false, // 标记用户是否在搜索时手动调整了层级
                searchResults: null, // 存储搜索匹配信息 { matchedIds: Set, relevantIds: Set }
                preSearchState: null, // 搜索前的状态快照
            };

            // 自动更新相关
            this.observer = null;
            this.updateDebounceTimer = null;
            this.isActive = false;

            // 同步滚动相关
            this.syncScrollHandler = null;
            this.syncScrollThrottleTimer = null;
            this.currentHighlightedItem = null;

            this.init();
        }

        init() {
            this.createUI();
            this.updateAutoUpdateState();
        }

        setActive(active) {
            this.isActive = active;
            this.updateAutoUpdateState();
            this.updateSyncScrollState();
        }

        updateAutoUpdateState() {
            const shouldEnable = this.settings.outline?.enabled &&
                this.settings.outline?.autoUpdate &&
                this.isActive;
            if (shouldEnable) {
                this.startObserver();
            } else {
                this.stopObserver();
            }
        }

        updateSyncScrollState() {
            const shouldEnable = this.settings.outline?.enabled &&
                this.settings.outline?.syncScroll &&
                this.isActive;
            if (shouldEnable) {
                this.startSyncScroll();
            } else {
                this.stopSyncScroll();
            }
        }

        startSyncScroll(retryCount = 0) {
            if (this.syncScrollHandler) return;
            if (!this.siteAdapter) return;

            const scrollContainer = this.siteAdapter.getScrollContainer ? this.siteAdapter.getScrollContainer() : (this.scrollManager ? this.scrollManager.container : null);
            if (!scrollContainer) {
                if (retryCount < 10) {
                    setTimeout(() => {
                        if (this.settings.outline?.syncScroll && this.isActive && !this.syncScrollHandler) {
                            this.startSyncScroll(retryCount + 1);
                        }
                    }, 300);
                }
                return;
            }

            this.syncScrollHandler = () => {
                if (this.state.searchQuery) return;
                if (this.syncScrollThrottleTimer) return;
                this.syncScrollThrottleTimer = setTimeout(() => {
                    this.syncScrollThrottleTimer = null;
                    this.handleSyncScroll();
                }, 200);
            };

            scrollContainer.addEventListener('scroll', this.syncScrollHandler, { passive: true });
        }

        stopSyncScroll() {
            if (!this.syncScrollHandler) return;
            const scrollContainer = this.siteAdapter?.getScrollContainer ? this.siteAdapter.getScrollContainer() : (this.scrollManager ? this.scrollManager.container : null);
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', this.syncScrollHandler);
            }
            this.syncScrollHandler = null;
            if (this.syncScrollThrottleTimer) {
                clearTimeout(this.syncScrollThrottleTimer);
                this.syncScrollThrottleTimer = null;
            }
            if (this.currentHighlightedItem) {
                this.currentHighlightedItem.classList.remove('sync-highlight');
                this.currentHighlightedItem = null;
            }
        }

        handleSyncScroll() {
            if (!this.state.tree || this.state.tree.length === 0) return;
            if (!this.siteAdapter) return;

            const scrollContainer = this.siteAdapter.getScrollContainer ? this.siteAdapter.getScrollContainer() : (this.scrollManager ? this.scrollManager.container : null);
            if (!scrollContainer) return;

            const flattenTree = (items) => {
                const result = [];
                items.forEach((item) => {
                    result.push(item);
                    if (item.children && item.children.length > 0) {
                        result.push(...flattenTree(item.children));
                    }
                });
                return result;
            };
            const allItems = flattenTree(this.state.tree);

            const containerRect = scrollContainer.getBoundingClientRect();
            const viewportTop = containerRect.top;

            let currentItem = null;
            for (const item of allItems) {
                if (!item.element || !item.element.isConnected) continue;
                const rect = item.element.getBoundingClientRect();
                if (rect.top >= viewportTop && rect.top < containerRect.bottom) {
                    currentItem = item;
                    break;
                }
                if (rect.top < viewportTop && rect.bottom > viewportTop) {
                    currentItem = item;
                    break;
                }
            }

            if (!currentItem) return;

            if (this.currentHighlightedItem) {
                this.currentHighlightedItem.classList.remove('sync-highlight');
            }

            const outlineList = document.getElementById('outline-list');
            if (!outlineList) return;

            let outlineItem = outlineList.querySelector(`.outline-item[data-index="${currentItem.index}"]`);
            if (!outlineItem) return;

            if (outlineItem.classList.contains('outline-hidden')) {
                let parent = outlineItem.previousElementSibling;
                while (parent) {
                    if (parent.classList.contains('outline-item') && !parent.classList.contains('outline-hidden')) {
                        const parentLevel = parseInt(parent.dataset.level, 10);
                        const currentLevel = parseInt(outlineItem.dataset.level, 10);
                        if (parentLevel < currentLevel) {
                            outlineItem = parent;
                            break;
                        }
                    }
                    parent = parent.previousElementSibling;
                }
                if (outlineItem.classList.contains('outline-hidden')) return;
            }

            outlineItem.classList.add('sync-highlight');
            this.currentHighlightedItem = outlineItem;

            const wrapper = document.getElementById('outline-list-wrapper');
            if (wrapper) {
                const wrapperRect = wrapper.getBoundingClientRect();
                const itemRect = outlineItem.getBoundingClientRect();
                if (itemRect.top < wrapperRect.top || itemRect.bottom > wrapperRect.bottom) {
                    const scrollOffset = itemRect.top - wrapperRect.top - wrapperRect.height / 2 + itemRect.height / 2;
                    wrapper.scrollBy({ top: scrollOffset, behavior: 'smooth' });
                }
            }
        }

        startObserver() {
            if (this.observer) return;
            this.observer = new MutationObserver(() => {
                this.triggerAutoUpdate();
            });
            this.observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }

        stopObserver() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            if (this.updateDebounceTimer) {
                clearTimeout(this.updateDebounceTimer);
                this.updateDebounceTimer = null;
            }
        }

        triggerAutoUpdate() {
            const interval = (this.settings.outline?.updateInterval || 5) * 1000;

            // 如果已经存在定时器，不重复设置，避免高频 DOM 变更导致频繁刷新
            if (!this.updateDebounceTimer) {
                this.updateDebounceTimer = setTimeout(() => {
                    this.executeAutoUpdate();
                }, interval);
            }
        }

        executeAutoUpdate() {
            if (this.updateDebounceTimer) {
                clearTimeout(this.updateDebounceTimer);
                this.updateDebounceTimer = null;
            }

            // 触发更新回调
            if (this.config && this.config.onAutoUpdate) {
                this.config.onAutoUpdate();
            }

            // 同时发送两个事件：兼容 ChatGPT 助手内部监听
            try { window.dispatchEvent(new CustomEvent('chatgpt-helper-outline-auto-refresh')); } catch (e) { }
            try { window.dispatchEvent(new CustomEvent('gemini-helper-outline-auto-refresh')); } catch (e) { }
        }

        createUI() {
            clearElement(this.container);

            const content = createElement('div', { className: 'outline-content' });
            const toolbar = createElement('div', { className: 'outline-fixed-toolbar' });
            const row1 = createElement('div', { className: 'outline-toolbar-row' });

            // 创建展开/折叠 SVG 图标的辅助函数
            const createExpandIcon = () => {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('viewBox', '0 0 16 16');
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                svg.setAttribute('stroke-width', '2');
                svg.style.width = '14px';
                svg.style.height = '14px';
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '8');
                circle.setAttribute('cy', '8');
                circle.setAttribute('r', '6.5');
                svg.appendChild(circle);
                const h = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                h.setAttribute('x1', '4');
                h.setAttribute('y1', '8');
                h.setAttribute('x2', '12');
                h.setAttribute('y2', '8');
                svg.appendChild(h);
                const v = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                v.setAttribute('x1', '8');
                v.setAttribute('y1', '4');
                v.setAttribute('x2', '8');
                v.setAttribute('y2', '12');
                svg.appendChild(v);
                return svg;
            };
            const createCollapseIcon = () => {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('viewBox', '0 0 16 16');
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                svg.setAttribute('stroke-width', '2');
                svg.style.width = '14px';
                svg.style.height = '14px';
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '8');
                circle.setAttribute('cy', '8');
                circle.setAttribute('r', '6.5');
                svg.appendChild(circle);
                const h = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                h.setAttribute('x1', '4');
                h.setAttribute('y1', '8');
                h.setAttribute('x2', '12');
                h.setAttribute('y2', '8');
                svg.appendChild(h);
                return svg;
            };
            // 保存到类实例以便后续切换使用
            this._createExpandIcon = createExpandIcon;
            this._createCollapseIcon = createCollapseIcon;

            // 用户提问分组按钮
            const showUserQueries = this.settings.outline?.showUserQueries ?? false;
            const groupBtnTitle = showUserQueries
                ? (this.t('outlineHideUserQueriesTooltip') || '隐藏用户提问')
                : (this.t('outlineShowUserQueriesTooltip') || '显示用户提问');
            const groupBtn = createElement('button', {
                className: 'outline-toolbar-btn' + (showUserQueries ? ' active' : ''),
                id: 'outline-group-btn',
                title: groupBtnTitle
            }, '🙋');
            groupBtn.addEventListener('click', () => this.toggleGroupMode());
            row1.appendChild(groupBtn);

            // 展开/折叠按钮 (使用 SVG 图标确保跨平台一致性)
            const expandBtn = createElement('button', {
                className: 'outline-toolbar-btn',
                id: 'outline-expand-btn',
                title: this.t('outlineExpandAll') || '展开全部'
            });
            expandBtn.appendChild(createExpandIcon());
            expandBtn.addEventListener('click', () => this.toggleExpandAll());
            row1.appendChild(expandBtn);

            // 定位当前位置按钮 (使用 SVG 图标确保跨平台一致性)
            const locateBtn = createElement('button', {
                className: 'outline-toolbar-btn',
                id: 'outline-locate-btn',
                title: this.t('outlineLocateCurrent') || '定位当前位置'
            });
            // 创建定位图标 SVG (crosshair/target 风格)
            const locateSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            locateSvg.setAttribute('viewBox', '0 0 18 18');
            locateSvg.setAttribute('fill', 'none');
            locateSvg.setAttribute('stroke', 'currentColor');
            locateSvg.setAttribute('stroke-width', '2');
            locateSvg.setAttribute('stroke-linecap', 'round');
            locateSvg.setAttribute('stroke-linejoin', 'round');
            locateSvg.style.width = '18px';
            locateSvg.style.height = '18px';
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '9');
            circle.setAttribute('cy', '9');
            circle.setAttribute('r', '4.5');
            locateSvg.appendChild(circle);
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', '9');
            line1.setAttribute('y1', '1');
            line1.setAttribute('x2', '9');
            line1.setAttribute('y2', '3.5');
            locateSvg.appendChild(line1);
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', '9');
            line2.setAttribute('y1', '14.5');
            line2.setAttribute('x2', '9');
            line2.setAttribute('y2', '17');
            locateSvg.appendChild(line2);
            const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line3.setAttribute('x1', '1');
            line3.setAttribute('y1', '9');
            line3.setAttribute('x2', '3.5');
            line3.setAttribute('y2', '9');
            locateSvg.appendChild(line3);
            const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line4.setAttribute('x1', '14.5');
            line4.setAttribute('y1', '9');
            line4.setAttribute('x2', '17');
            line4.setAttribute('y2', '9');
            locateSvg.appendChild(line4);
            locateBtn.appendChild(locateSvg);
            locateBtn.addEventListener('click', () => this.locateCurrentPosition());
            row1.appendChild(locateBtn);

            // 滚动列表按钮
            const scrollBtn = createElement('button', {
                className: 'outline-toolbar-btn',
                id: 'outline-scroll-btn',
                title: this.t('outlineScrollBottom') || '滚动到底部'
            });
            scrollBtn.appendChild(createSvgIconNode('arrowDown', { size: 14 }));
            scrollBtn.addEventListener('click', () => this.scrollList());
            row1.appendChild(scrollBtn);

            // 搜索框区域
            const searchWrapper = createElement('div', { className: 'outline-search-wrapper' });
            const searchInput = createElement('input', {
                type: 'text',
                className: 'outline-search-input',
                placeholder: this.t('outlineSearch') || '搜索大纲...',
                value: this.state.searchQuery
            });
            const clearBtn = createElement('button', {
                className: 'outline-search-clear hidden',
                title: this.t('clear') || '清除'
            }, '×');

            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                const val = e.target.value;
                clearBtn.classList.toggle('hidden', !val);
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.handleSearch(val.trim());
                }, 300);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    clearBtn.classList.add('hidden');
                    this.handleSearch('');
                    searchInput.blur();
                }
            });

            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.classList.add('hidden');
                this.handleSearch('');
                searchInput.focus();
            });

            searchWrapper.appendChild(searchInput);
            searchWrapper.appendChild(clearBtn);
            row1.appendChild(searchWrapper);

            toolbar.appendChild(row1);

            // 层级滑块
            const row2 = createElement('div', { className: 'outline-toolbar-row' });
            const sliderContainer = createElement('div', { className: 'outline-level-slider-container' });
            const dotsContainer = createElement('div', { className: 'outline-level-dots', id: 'outline-level-dots' });
            const levelLine = createElement('div', { className: 'outline-level-line' });
            const levelProgress = createElement('div', {
                className: 'outline-level-progress',
                id: 'outline-level-progress'
            });
            levelLine.appendChild(levelProgress);
            dotsContainer.appendChild(levelLine);

            for (let i = 0; i <= 6; i++) {
                const dot = createElement('div', {
                    className: `outline-level-dot ${i <= this.state.expandLevel ? 'active' : ''}`,
                    'data-level': i
                });
                const tooltip = createElement('div', { className: 'outline-level-dot-tooltip' });
                tooltip.textContent = i === 0 ? '⊖' : `H${i}`;
                dot.appendChild(tooltip);
                dot.addEventListener('click', () => this.setLevel(i));
                dotsContainer.appendChild(dot);
            }

            sliderContainer.appendChild(dotsContainer);
            row2.appendChild(sliderContainer);
            toolbar.appendChild(row2);
            content.appendChild(toolbar);

            // 搜索结果统计条
            const resultBar = createElement('div', {
                className: 'outline-result-bar hidden',
                id: 'outline-result-bar'
            });
            content.appendChild(resultBar);

            // 大纲列表包装器
            const listWrapper = createElement('div', {
                className: 'outline-list-wrapper',
                id: 'outline-list-wrapper'
            });
            const list = createElement('div', {
                className: 'outline-list',
                id: 'outline-list'
            });
            listWrapper.appendChild(list);
            content.appendChild(listWrapper);


            this.container.appendChild(content);
        }

        update(outlineData) {
            const listContainer = document.getElementById('outline-list');
            if (!listContainer) return;

            clearElement(listContainer);

            if (!outlineData || outlineData.length === 0) {
                listContainer.appendChild(createElement('div', {
                    className: 'outline-empty'
                }, this.t('outlineEmpty') || '暂无大纲'));
                return;
            }

            // 保存原始大纲
            this.state.rawOutline = outlineData;

            // 统计各层级数量
            this.state.levelCounts = {};
            outlineData.forEach((item) => {
                this.state.levelCounts[item.level] = (this.state.levelCounts[item.level] || 0) + 1;
            });
            this.updateTooltips();

            // 智能缩进：检测最高层级（排除用户提问节点，只考虑 AI 回复的标题）
            const headingLevels = outlineData.filter((item) => !item.isUserQuery).map((item) => item.level);
            const minLevel = headingLevels.length > 0 ? Math.min(...headingLevels) : 1;
            this.state.minLevel = minLevel;

            // 在重构树之前，捕获当前的折叠状态
            const currentStateMap = {};
            if (this.state.tree) {
                this.captureTreeState(this.state.tree, currentStateMap);
            }

            // 构建树形结构
            const outlineKey = outlineData.map((i) => i.text).join('|');
            const isTreeChanged = this.state.treeKey !== outlineKey || !this.state.tree;
            if (isTreeChanged) {
                this.state.tree = this.buildTree(outlineData, minLevel);
                this.state.treeKey = outlineKey;
            }
            const tree = this.state.tree;

            // 恢复折叠状态
            const displayLevel = this.state.expandLevel ?? 6;
            const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
            let effectiveDisplayLevel = displayLevel < minDisplayLevel ? minDisplayLevel : displayLevel;

            // 只有在树结构发生变化时才重新初始化折叠状态
            // 如果树结构没变，保持用户当前的手动操作状态
            if (isTreeChanged) {
                // 1. 先按默认规则初始化所有节点（包括新节点）
                this.initializeCollapsedState(tree, effectiveDisplayLevel);

                // 2. 再恢复用户之前的手动操作（只影响旧节点，新节点保持初始化状态）
                if (Object.keys(currentStateMap).length > 0) {
                    this.restoreTreeState(tree, currentStateMap);
                }
            }
            // 如果树结构没变，直接使用当前状态，不进行任何重置

            // 如果在搜索模式，需要重新应用搜索标记
            if (this.state.searchQuery) {
                this.performSearch(this.state.searchQuery, false);
            }

            // 渲染
            this.refreshCurrent();
        }

        buildTree(outline, minLevel) {
            const tree = [];
            const stack = [];

            outline.forEach((item, index) => {
                // 用户提问节点固定 relativeLevel = 0
                // AI 标题节点使用 level - minLevel + 1（实现层级提升）
                const relativeLevel = item.isUserQuery ? 0 : item.level - minLevel + 1;
                const node = {
                    ...item,
                    relativeLevel,
                    index,
                    children: [],
                    collapsed: false,
                    forceExpanded: false, // 初始化 forceExpanded
                };

                // 找到父节点
                while (stack.length > 0 && stack[stack.length - 1].relativeLevel >= relativeLevel) {
                    stack.pop();
                }

                if (stack.length === 0) {
                    tree.push(node);
                } else {
                    stack[stack.length - 1].children.push(node);
                }

                stack.push(node);
            });

            return tree;
        }

        // 初始化树的折叠状态
        initializeCollapsedState(items, displayLevel) {
            items.forEach((item) => {
                // 确保 forceExpanded 被初始化
                if (item.forceExpanded === undefined) {
                    item.forceExpanded = false;
                }
                if (item.children && item.children.length > 0) {
                    // 使用 relativeLevel 判断所有子节点是否都超过显示层级
                    const allChildrenHidden = item.children.every((child) => child.relativeLevel > displayLevel);
                    item.collapsed = allChildrenHidden;
                    this.initializeCollapsedState(item.children, displayLevel);
                } else {
                    item.collapsed = false;
                }
            });
        }

        // 捕获树的状态（expanded/collapsed）
        captureTreeState(nodes, stateMap) {
            nodes.forEach((node) => {
                const key = `${node.level}_${node.text}`;
                const hasChildren = node.children && node.children.length > 0;
                stateMap[key] = {
                    collapsed: node.collapsed,
                    forceExpanded: node.forceExpanded,
                    hadChildren: hasChildren,
                };

                if (hasChildren) {
                    this.captureTreeState(node.children, stateMap);
                }
            });
        }

        // 恢复树的状态
        restoreTreeState(nodes, stateMap) {
            nodes.forEach((node) => {
                const key = `${node.level}_${node.text}`;
                const state = stateMap[key];
                if (state) {
                    const hasChildrenNow = node.children && node.children.length > 0;
                    const hadChildrenBefore = state.hadChildren;

                    // 只有当「之前有子节点 或 现在没有子节点」时才恢复 collapsed 状态
                    if (hadChildrenBefore || !hasChildrenNow) {
                        node.collapsed = state.collapsed;
                    }

                    if (state.forceExpanded !== undefined) {
                        node.forceExpanded = state.forceExpanded;
                    }
                }

                if (node.children && node.children.length > 0) {
                    this.restoreTreeState(node.children, stateMap);
                }
            });
        }

        // 清除强制展开状态
        clearForceExpandedState(items, displayLevel) {
            items.forEach((item) => {
                item.forceExpanded = false;
                if (item.children && item.children.length > 0) {
                    // 使用 level 而不是 relativeLevel
                    const allChildrenHidden = item.children.every((child) => child.level > displayLevel);
                    item.collapsed = allChildrenHidden;
                    this.clearForceExpandedState(item.children, displayLevel);
                } else {
                    item.collapsed = false;
                }
            });
        }

        // 获取用户问题节点在所有用户问题中的序号（从1开始）
        getUserQueryIndex(targetIndex) {
            if (!this.state.tree) return 0;
            let count = 0;
            const countInTree = (items) => {
                for (const item of items) {
                    if (item.isUserQuery) {
                        count++;
                        if (item.index === targetIndex) return count;
                    }
                    if (item.children && item.children.length > 0) {
                        const result = countInTree(item.children);
                        if (result > 0) return result;
                    }
                }
                return 0;
            };
            return countInTree(this.state.tree);
        }

        // 内部刷新（用于交互更新）
        refreshCurrent() {
            const listContainer = document.getElementById('outline-list');
            if (this.state.tree && listContainer) {
                clearElement(listContainer);

                // 确定当前的显示层级上限
                // 如果在搜索模式且未手动调整，显示所有层级 (Infinity)
                // 否则使用设定的 expandLevel
                let displayLevel;
                if (this.state.searchQuery && !this.state.searchLevelManual) {
                    displayLevel = 100; // 足够大以显示所有
                } else {
                    displayLevel = this.state.expandLevel ?? 6;
                }

                // 根据是否开启用户提问动态调整最小有效层级
                const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
                if (displayLevel < minDisplayLevel) {
                    displayLevel = minDisplayLevel;
                }

                this.renderItems(listContainer, this.state.tree, this.state.minLevel, displayLevel);
            }
        }

        // 渲染大纲项
        renderItems(container, items, minLevel, displayLevel, parentCollapsed = false, parentForceExpanded = false) {
            // 根据是否开启用户提问，确定根节点的 relativeLevel
            const minRelativeLevel = this.state.includeUserQueries ? 0 : 1;

            items.forEach((item) => {
                const hasChildren = item.children && item.children.length > 0;
                // 使用 relativeLevel 判断是否为根节点
                const isRootNode = item.relativeLevel === minRelativeLevel;

                let shouldShow;

                // 计算可见性：使用 relativeLevel 与 displayLevel 比较
                const isLevelAllowed = item.relativeLevel <= displayLevel || parentForceExpanded;

                if (isRootNode) {
                    // 顶层节点逻辑
                    if (this.state.searchQuery) {
                        // 搜索模式下严控顶层显示
                        shouldShow = item.isMatch || item.hasMatchedDescendant;
                    } else {
                        // 普通模式：只需存在即可
                        shouldShow = true;
                    }
                } else {
                    // 非顶层节点
                    const isRelevant = !this.state.searchQuery || item.isMatch || item.hasMatchedDescendant || parentForceExpanded;

                    // 综合判断
                    if (this.state.searchQuery && !this.state.searchLevelManual) {
                        // 纯搜索模式：相关即显示，忽略层级
                        shouldShow = isRelevant && !parentCollapsed;
                    } else if (this.state.searchQuery && this.state.searchLevelManual) {
                        // 搜索且有层级限制
                        // 必须相关 AND 层级允许
                        shouldShow = isRelevant && isLevelAllowed && !parentCollapsed;
                    } else {
                        // 普通模式
                        shouldShow = isLevelAllowed && !parentCollapsed;
                    }
                }

                // 如果父级折叠了，那肯定看不到
                if (parentCollapsed) shouldShow = false;

                // 构建 CSS 类名
                let cssLevel = item.relativeLevel;
                let itemClassName = `outline-item outline-level-${cssLevel}`;
                if (item.isUserQuery) {
                    itemClassName += ' user-query-node';
                }

                const itemEl = createElement('div', {
                    className: itemClassName,
                    'data-index': item.index,
                    'data-level': item.relativeLevel,
                });

                const isExpanded = hasChildren && !item.collapsed;
                const toggle = createElement(
                    'span',
                    {
                        className: `outline-item-toggle ${hasChildren ? (isExpanded ? 'expanded' : '') : 'invisible'}`,
                    },
                    '▸',
                );

                if (hasChildren) {
                    toggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        item.collapsed = !item.collapsed;
                        if (!item.collapsed) {
                            item.forceExpanded = true;
                        }
                        toggle.classList.toggle('expanded', !item.collapsed);
                        this.refreshCurrent();
                    });
                }
                itemEl.appendChild(toggle);

                // 用户提问节点添加序号徽章
                if (item.isUserQuery) {
                    const queryNumber = this.getUserQueryIndex(item.index);
                    const badge = createElement('span', { className: 'user-query-badge' });
                    const icon = createElement('span', { className: 'user-query-badge-icon' });
                    icon.appendChild(createSvgIconNode('message', { size: 12 }));
                    const number = createElement('span', { className: 'user-query-badge-number' }, `${queryNumber}`);
                    badge.appendChild(icon);
                    badge.appendChild(number);
                    itemEl.appendChild(badge);
                }

                const textEl = createElement('span', { className: 'outline-item-text' });

                // 高亮处理
                if (this.state.searchQuery && item.isMatch) {
                    try {
                        const query = this.state.searchQuery;
                        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`(${escapedQuery})`, 'gi');
                        const parts = item.text.split(regex);

                        clearElement(textEl);
                        parts.forEach((part) => {
                            if (part.toLowerCase() === query.toLowerCase()) {
                                const mark = document.createElement('mark');
                                mark.textContent = part;
                                mark.style.backgroundColor = 'rgba(255, 235, 59, 0.5)';
                                mark.style.color = 'inherit';
                                mark.style.padding = '0';
                                mark.style.borderRadius = '2px';
                                textEl.appendChild(mark);
                            } else {
                                textEl.appendChild(document.createTextNode(part));
                            }
                        });
                    } catch (e) {
                        textEl.textContent = item.text;
                        textEl.title = item.text;
                    }
                } else {
                    textEl.textContent = item.text;
                    textEl.title = item.text;
                }
                itemEl.appendChild(textEl);

                // 用户提问添加复制按钮
                if (item.isUserQuery) {
                    const copyBtn = createElement('span', { className: 'outline-item-copy-btn' });
                    copyBtn.title = 'Copy';

                    // 使用 DOM API 创建 SVG（避免 innerHTML 的 CSP 问题）
                    const createCopyIcon = () => {
                        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svg.setAttribute('viewBox', '0 0 24 24');
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', 'currentColor');
                        svg.setAttribute('stroke-width', '2');
                        svg.setAttribute('stroke-linecap', 'round');
                        svg.setAttribute('stroke-linejoin', 'round');
                        svg.style.width = '14px';
                        svg.style.height = '14px';

                        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        rect.setAttribute('x', '9');
                        rect.setAttribute('y', '9');
                        rect.setAttribute('width', '13');
                        rect.setAttribute('height', '13');
                        rect.setAttribute('rx', '2');
                        rect.setAttribute('ry', '2');

                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1');

                        svg.appendChild(rect);
                        svg.appendChild(path);
                        return svg;
                    };

                    const createCheckIcon = () => {
                        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svg.setAttribute('viewBox', '0 0 24 24');
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', '#10b981');
                        svg.setAttribute('stroke-width', '2');
                        svg.setAttribute('stroke-linecap', 'round');
                        svg.setAttribute('stroke-linejoin', 'round');
                        svg.style.width = '14px';
                        svg.style.height = '14px';

                        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                        polyline.setAttribute('points', '20 6 9 17 4 12');

                        svg.appendChild(polyline);
                        return svg;
                    };

                    copyBtn.appendChild(createCopyIcon());

                    copyBtn.addEventListener('click', async (e) => {
                        e.stopPropagation();
                        try {
                            let textToCopy = item.text;
                            if (item.isTruncated && item.element && item.element.isConnected) {
                                // 文本被截断，从 DOM 提取完整文本
                                textToCopy = (this.siteAdapter && this.siteAdapter.extractUserQueryText) ? this.siteAdapter.extractUserQueryText(item.element) : item.text;
                                if (!textToCopy) textToCopy = item.text;
                            }
                            await navigator.clipboard.writeText(textToCopy);
                            // 临时变成对号反馈
                            copyBtn.replaceChildren(createCheckIcon());
                            setTimeout(() => {
                                copyBtn.replaceChildren(createCopyIcon());
                            }, 1500);
                        } catch (err) {
                            console.error('Failed to copy: ', err);
                        }
                    });
                    itemEl.appendChild(copyBtn);
                }

                itemEl.addEventListener('click', (e) => {
                    // 如果点击的是 toggle 或 copyBtn，不处理（它们有自己的事件处理）
                    if (e.target.closest('.outline-item-toggle, .outline-item-copy-btn')) {
                        return;
                    }

                    let targetElement = item.element;

                    // 1. 检查元素是否有效
                    if (!targetElement || !targetElement.isConnected) {
                        // 尝试重新查找
                        // 简单的重新查找策略：在文档中根据文本内容找一个最相似的 H? 标签
                        // 这是一个兜底，动态渲染可能会导致元素重建
                        const headings = document.querySelectorAll(`h${item.level}`);
                        for (const h of headings) {
                            if ((h.textContent || '').trim() === item.text) {
                                targetElement = h;
                                break;
                            }
                        }
                    }

                    if (targetElement && targetElement.isConnected) {
                        // 跳转前回调（用于保存当前位置为锚点）
                        if (this.onJumpBefore) {
                            this.onJumpBefore();
                        }

                        // 获取滚动容器
                        const scrollContainer = this.siteAdapter?.getScrollContainer?.();

                        if (scrollContainer && scrollContainer !== document.documentElement && scrollContainer !== document.body) {
                            // 如果存在自定义滚动容器，手动计算滚动位置，使目标元素位于容器顶部
                            const containerRect = scrollContainer.getBoundingClientRect();
                            const targetRect = targetElement.getBoundingClientRect();

                            // 计算目标元素相对于滚动容器的位置
                            const targetTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;

                            // 设置滚动位置，使目标元素位于容器顶部（留出一些顶部边距避免被固定头部遮挡）
                            const offset = 60; // 顶部偏移量，避免被固定头部遮挡，稍微增加以避免偏上
                            const scrollTop = targetTop - offset;

                            // 使用 __bypassLock 绕过 ScrollLockManager
                            scrollContainer.__ghBypassLock = true;
                            scrollContainer.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
                            setTimeout(() => {
                                delete scrollContainer.__ghBypassLock;
                            }, 500);
                        } else {
                            // 如果没有自定义滚动容器，使用标准的 scrollIntoView
                            // 传入 __bypassLock: true 以绕过 ScrollLockManager 的拦截
                            // 使用 block: 'start' 使目标元素位于视口顶部
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', __bypassLock: true });

                            // 微调：确保目标元素正好在页面顶部（考虑固定头部）
                            setTimeout(() => {
                                const rect = targetElement.getBoundingClientRect();
                                const offset = 40; // 顶部偏移量，稍微增加以避免偏上
                                if (rect.top !== offset) {
                                    window.scrollBy({ top: rect.top - offset, behavior: 'smooth' });
                                }
                            }, 100);
                        }

                        targetElement.classList.add('outline-highlight');
                        setTimeout(() => targetElement.classList.remove('outline-highlight'), 2000);
                    } else {
                        console.warn('ChatGPT Helper: Outline item element lost and not found:', item.text);
                    }
                });

                if (!shouldShow) {
                    itemEl.classList.add('outline-hidden');
                }

                container.appendChild(itemEl);

                if (hasChildren) {
                    const childParentCollapsed = item.collapsed || parentCollapsed;
                    this.renderItems(container, item.children, minLevel, displayLevel, childParentCollapsed, item.forceExpanded || parentForceExpanded);
                }
            });
        }

        handleSearch(query) {
            if (!query) {
                // === 结束搜索 ===
                // 1. 清理搜索状态
                this.state.searchQuery = '';
                this.state.searchResults = null;
                this.state.searchLevelManual = false;

                // 2. 隐藏结果条
                const resultBar = document.getElementById('outline-result-bar');
                if (resultBar) resultBar.classList.add('hidden');

                // 3. 恢复折叠状态
                if (this.state.tree) {
                    // 3.1 先重置为全局设定的层级状态（兜底）
                    const displayLevel = this.state.expandLevel ?? 6;
                    this.clearForceExpandedState(this.state.tree, displayLevel);

                    // 3.2 如果有搜索前的状态快照，则恢复它（覆盖默认状态）
                    if (this.state.preSearchState) {
                        this.restoreTreeState(this.state.tree, this.state.preSearchState);
                        this.state.preSearchState = null; // 恢复后清除快照
                    }
                }

                this.refreshCurrent();
                return;
            }

            // === 开始或更新搜索 ===

            // 如果是从无搜索状态进入搜索状态，保存当前快照
            if (!this.state.searchQuery && this.state.tree) {
                this.state.preSearchState = {};
                this.captureTreeState(this.state.tree, this.state.preSearchState);

                // 搜索前重置所有状态（折叠所有 + 清除手动展开标记）
                this.clearForceExpandedState(this.state.tree, 0);
            }

            this.state.searchQuery = query;
            this.state.searchLevelManual = false; // 重置手动层级标记
            this.performSearch(query);
            this.refreshCurrent();
        }

        // 执行搜索计算
        performSearch(query, updateUI = true) {
            if (!this.state.tree) return;

            const normalize = (str) => str.toLowerCase();
            const normalizedQuery = normalize(query);
            let matchCount = 0;

            // 递归标记树
            // 返回值: { isMatch: boolean, hasMatchedDescendant: boolean }
            const traverse = (nodes) => {
                let hasAnyMatch = false;
                nodes.forEach((node) => {
                    const isMatch = normalize(node.text).includes(normalizedQuery);
                    if (isMatch) matchCount++;

                    node.isMatch = isMatch;

                    if (node.children && node.children.length > 0) {
                        const childResult = traverse(node.children);
                        node.hasMatchedDescendant = childResult;
                    } else {
                        node.hasMatchedDescendant = false;
                    }

                    // 如果有匹配子项，自动展开
                    if (node.hasMatchedDescendant) {
                        node.collapsed = false;
                    }

                    if (isMatch || node.hasMatchedDescendant) {
                        hasAnyMatch = true;
                    }
                });
                return hasAnyMatch;
            };

            traverse(this.state.tree);

            // 更新结果条
            if (updateUI) {
                const resultBar = document.getElementById('outline-result-bar');
                if (resultBar) {
                    resultBar.textContent = `${matchCount} ${this.t('outlineSearchResult') || '个结果'}`;
                    resultBar.classList.remove('hidden');
                }
            }
        }

        toggleGroupMode() {
            const btn = document.getElementById('outline-group-btn');
            if (!this.settings.outline) return;

            // 切换设置
            this.settings.outline.showUserQueries = !this.settings.outline.showUserQueries;
            // 同步到 state（用于 minDisplayLevel 计算）
            this.state.includeUserQueries = this.settings.outline.showUserQueries;

            // 更新按钮状态
            if (btn) {
                btn.classList.toggle('active', this.settings.outline.showUserQueries);
                // 根据当前状态更新提示文案
                if (this.settings.outline.showUserQueries) {
                    btn.title = this.t('outlineHideUserQueriesTooltip') || '隐藏用户提问';
                } else {
                    btn.title = this.t('outlineShowUserQueriesTooltip') || '显示用户提问';
                }
            }

            // 保存设置
            if (this.onSettingsChange) this.onSettingsChange();

            // 触发大纲刷新
            try { window.dispatchEvent(new CustomEvent('gemini-helper-outline-auto-refresh')); } catch (e) { }
            try { window.dispatchEvent(new CustomEvent('chatgpt-helper-outline-auto-refresh')); } catch (e) { }
        }

        toggleExpandAll() {
            const btn = document.getElementById('outline-expand-btn');
            if (!btn) return;

            if (this.state.isAllExpanded) {
                // 如果开启了"只显示用户提问"，收起时应折叠到 Level 0 (只显示提问)
                // 否则折叠到最小标题层级 (通常是 1)
                const targetLevel = this.settings.outline?.showUserQueries ? 0 : this.state.minLevel || 1;
                this.setLevel(targetLevel);
            } else {
                const hasLevelCounts = this.state.levelCounts && Object.keys(this.state.levelCounts).length > 0;
                const maxActualLevel = hasLevelCounts
                    ? Math.max(...Object.keys(this.state.levelCounts).map(Number), 1)
                    : 6;
                this.setLevel(maxActualLevel);
            }
        }

        // 定位到当前页面位置对应的大纲项
        locateCurrentPosition() {
            if (!this.state.tree || this.state.tree.length === 0) return;
            if (!this.siteAdapter) return;

            // 0. 如果在搜索模式，先清除搜索（确保目标项能显示）
            if (this.state.searchQuery) {
                this.handleSearch('');
                // 清除搜索框内容
                const searchInput = document.querySelector('.outline-search-input');
                const clearBtn = document.querySelector('.outline-search-clear');
                if (searchInput) searchInput.value = '';
                if (clearBtn) clearBtn.classList.add('hidden');
            }

            // 1. 获取页面滚动容器
            const scrollContainer = this.siteAdapter.getScrollContainer();
            if (!scrollContainer) return;

            // 2. 收集所有大纲项的 element（展平树结构）
            const flattenTree = (items) => {
                const result = [];
                items.forEach((item) => {
                    result.push(item);
                    if (item.children && item.children.length > 0) {
                        result.push(...flattenTree(item.children));
                    }
                });
                return result;
            };
            const allItems = flattenTree(this.state.tree);

            // 3. 找到当前可视区域中的第一个大纲元素
            const containerRect = scrollContainer.getBoundingClientRect();
            const viewportTop = containerRect.top;
            const viewportBottom = containerRect.bottom;

            let currentItem = null;
            for (const item of allItems) {
                if (!item.element || !item.element.isConnected) continue;

                const rect = item.element.getBoundingClientRect();
                if (rect.top >= viewportTop && rect.top < viewportBottom) {
                    currentItem = item;
                    break;
                }
                if (rect.top < viewportTop && rect.bottom > viewportTop) {
                    currentItem = item;
                    break;
                }
            }

            if (!currentItem) {
                // 如果没找到，尝试找最接近视口顶部的元素
                let minDistance = Infinity;
                for (const item of allItems) {
                    if (!item.element || !item.element.isConnected) continue;
                    const rect = item.element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - viewportTop);
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentItem = item;
                    }
                }
            }

            if (!currentItem) return;

            // === 根据当前显示层级，选择一个“目录层级中的标题节点”来定位 ===
            // 目标：当当前命中的是较深层级或用户提问时，优先定位到当前可见的大纲标题（与当前层级 slider 相匹配）
            const getPathByIndex = (items, targetIndex, path = []) => {
                for (const item of items) {
                    const newPath = [...path, item];
                    if (item.index === targetIndex) return newPath;
                    if (item.children && item.children.length > 0) {
                        const childPath = getPathByIndex(item.children, targetIndex, newPath);
                        if (childPath) return childPath;
                    }
                }
                return null;
            };

            const path = getPathByIndex(this.state.tree, currentItem.index) || [currentItem];
            // 计算当前实际显示层级（与 refreshCurrent 一致）
            let displayLevel = this.state.expandLevel ?? 6;
            const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
            if (displayLevel < minDisplayLevel) displayLevel = minDisplayLevel;

            // 从当前节点向上寻找：第一个 relativeLevel <= displayLevel 的标题节点（优先非用户提问）
            let bestNode = currentItem;
            for (let i = path.length - 1; i >= 0; i--) {
                const node = path[i];
                if (node.relativeLevel <= displayLevel && !node.isUserQuery) {
                    bestNode = node;
                    break;
                }
            }
            currentItem = bestNode;

            // 4. 展开目标项的所有父级节点（确保目标可见）
            const expandParents = (items, targetIndex, parents = []) => {
                for (const item of items) {
                    if (item.index === targetIndex) {
                        // 找到目标，展开所有父级
                        parents.forEach((p) => {
                            p.collapsed = false;
                            p.forceExpanded = true;
                        });
                        return true;
                    }
                    if (item.children && item.children.length > 0) {
                        if (expandParents(item.children, targetIndex, [...parents, item])) {
                            return true;
                        }
                    }
                }
                return false;
            };
            expandParents(this.state.tree, currentItem.index);

            // 5. 刷新显示（展开父级后需要重新渲染）
            this.refreshCurrent();

            // 6. 延迟执行滚动和高亮（等待 DOM 更新）
            setTimeout(() => {
                const outlineList = document.getElementById('outline-list');
                if (!outlineList) return;

                // 优先尝试当前节点对应的大纲项
                let outlineItem = outlineList.querySelector(`.outline-item[data-index="${currentItem.index}"]`);

                // 如果当前节点不可见或未渲染，沿着路径向上查找第一个可见的大纲项
                if (!outlineItem || outlineItem.classList.contains('outline-hidden')) {
                    const indicesToTry = (path && path.length > 0)
                        ? [...path].reverse().map((node) => node.index)
                        : [currentItem.index];

                    for (const idx of indicesToTry) {
                        const candidate = outlineList.querySelector(`.outline-item[data-index="${idx}"]`);
                        if (candidate && !candidate.classList.contains('outline-hidden')) {
                            outlineItem = candidate;
                            break;
                        }
                    }
                }

                if (!outlineItem) return;

                // 滚动大纲面板到该项
                const wrapper = document.getElementById('outline-list-wrapper');
                if (wrapper) {
                    const wrapperRect = wrapper.getBoundingClientRect();
                    const itemRect = outlineItem.getBoundingClientRect();
                    const scrollOffset = itemRect.top - wrapperRect.top - wrapperRect.height / 2 + itemRect.height / 2;
                    wrapper.scrollBy({ top: scrollOffset, behavior: 'smooth' });
                }

                // 高亮该大纲项
                outlineItem.classList.add('highlight');
                setTimeout(() => outlineItem.classList.remove('highlight'), 2000);
            }, 50);
        }

        // 设置层级
        setLevel(level) {
            this.state.expandLevel = level;

            // 清除强制展开状态
            if (this.state.tree) {
                this.clearForceExpandedState(this.state.tree, level);
            }

            // 更新 UI
            const dots = document.querySelectorAll('.outline-level-dot');
            dots.forEach((dot) => {
                const dotLevel = parseInt(dot.dataset.level, 10);
                dot.classList.toggle('active', dotLevel <= level);
            });

            const progress = document.getElementById('outline-level-progress');
            if (progress) {
                progress.style.width = `${(level / 6) * 100}%`;
            }

            // 如果在搜索状态下调整了 Slider，标记为手动
            if (this.state.searchQuery) {
                this.state.searchLevelManual = true;
                this.refreshCurrent();
            } else {
                this.refreshCurrent();
            }

            const btn = document.getElementById('outline-expand-btn');
            const hasLevelCounts = this.state.levelCounts && Object.keys(this.state.levelCounts).length > 0;
            const maxActualLevel = hasLevelCounts
                ? Math.max(...Object.keys(this.state.levelCounts).map(Number), 1)
                : 6;
            if (btn) {
                if (level >= maxActualLevel) {
                    btn.replaceChildren(this._createCollapseIcon ? this._createCollapseIcon() : document.createTextNode('⊖'));
                    btn.title = this.t('outlineCollapseAll');
                    this.state.isAllExpanded = true;
                } else {
                    btn.replaceChildren(this._createExpandIcon ? this._createExpandIcon() : document.createTextNode('⊕'));
                    btn.title = this.t('outlineExpandAll');
                    this.state.isAllExpanded = false;
                }
            }

            this.refreshCurrent();
        }

        updateTooltips() {
            const dots = document.querySelectorAll('.outline-level-dot');
            const showUserQueries = this.settings.outline?.showUserQueries || false;

            dots.forEach((dot) => {
                const level = parseInt(dot.dataset.level, 10);
                const tooltip = dot.querySelector('.outline-level-dot-tooltip');
                if (!tooltip) return;

                if (level === 0) {
                    // Level 0: 分组模式下显示"只显示用户提问"，否则显示折叠符号
                    tooltip.textContent = showUserQueries ? (this.t('outlineOnlyUserQueries') || '只显示用户提问') : '⊖';
                } else {
                    const count = this.state.levelCounts[level] || 0;
                    tooltip.textContent = `H${level}: ${count}`;
                }
            });
        }

        scrollList() {
            const wrapper = document.getElementById('outline-list-wrapper');
            const btn = document.getElementById('outline-scroll-btn');
            if (!wrapper || !btn) return;

            const isAtBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 10;
            if (isAtBottom) {
                wrapper.scrollTo({ top: 0, behavior: 'smooth' });
                setButtonIcon(btn, 'arrowDown', { size: 14 });
                btn.title = this.t('outlineScrollBottom') || '滚动到底部';
            } else {
                wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
                setButtonIcon(btn, 'arrowUp', { size: 14 });
                btn.title = this.t('outlineScrollTop') || '滚动到顶部';
            }
        }
    }
    Object.assign(H, {
        OutlineManager
    });
})();
