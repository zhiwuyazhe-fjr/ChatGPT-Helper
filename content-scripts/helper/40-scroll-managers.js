// Chrome Extension Content Script - ChatGPT Helper Scroll Managers
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
        OutlineManager,
        CopyManager,
        TabRenameManager,
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;

    // ==================== 阶段1：核心滚动和锚点系统 ====================

    /**
     * 滚动管理器
     * 提供统一的滚动接口，适配不同站点的滚动容器
     */
    class ScrollManager {
        constructor(adapter) {
            this.adapter = adapter;
        }

        get container() {
            return this.adapter.getResponseContainer();
        }

        get scrollTop() {
            return this.container ? this.container.scrollTop : window.scrollY;
        }

        set scrollTop(val) {
            if (this.container) {
                this.container.scrollTop = val;
            } else {
                window.scrollTo(0, val);
            }
        }

        get scrollHeight() {
            return this.container ? this.container.scrollHeight : document.body.scrollHeight;
        }

        get clientHeight() {
            return this.container ? this.container.clientHeight : window.innerHeight;
        }

        scrollTo(options) {
            const container = this.container;
            if (!container) {
                // 如果没有容器，使用window滚动
                // 检查是否在底部
                const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
                const targetTop = options && typeof options === 'object' ? (options.top !== undefined ? options.top : window.scrollY) : (typeof options === 'number' ? options : window.scrollY);
                const currentTop = window.scrollY;
                const needsScroll = Math.abs(targetTop - currentTop) > 1;
                
                if (isAtBottomWindow && needsScroll) {
                    // 在底部且需要滚动，使用强制滚动
                    console.log('[ChatGPT Helper] scrollTo (window): 在底部，使用强制滚动方法，目标位置:', targetTop, '当前位置:', currentTop);
                    const scrollElement = document.scrollingElement || document.documentElement || document.body;
                    window.__ghBypassLock = true;
                    
                    const forceScroll = () => {
                        try {
                            // 直接设置 scrollTop
                            scrollElement.scrollTop = targetTop;
                            if (document.documentElement) {
                                document.documentElement.scrollTop = targetTop;
                            }
                            if (document.body) {
                                document.body.scrollTop = targetTop;
                            }
                            // 也使用 scrollTo 作为备用
                            window.scrollTo({ top: targetTop, behavior: options?.behavior || 'instant' });
                        } catch (e) {
                            console.error('[ChatGPT Helper] window 强制滚动失败:', e);
                        }
                    };
                    
                    // 立即执行多次
                    forceScroll();
                    setTimeout(() => forceScroll(), 0);
                    setTimeout(() => forceScroll(), 10);
                    setTimeout(() => forceScroll(), 20);
                    
                    // 使用 setInterval 确保滚动成功
                    let attempts = 0;
                    const maxAttempts = 100;
                    const scrollInterval = setInterval(() => {
                        attempts++;
                        const before = window.scrollY;
                        window.__ghBypassLock = true;
                        forceScroll();
                        const current = window.scrollY;
                        
                        if (Math.abs(current - targetTop) <= 5 || attempts >= maxAttempts) {
                            clearInterval(scrollInterval);
                            setTimeout(() => delete window.__ghBypassLock, 100);
                            console.log('[ChatGPT Helper] window 强制滚动完成，最终位置:', current, '目标位置:', targetTop);
                        } else if (Math.abs(current - before) > 1) {
                            // 位置有变化，继续尝试
                        } else if (attempts > 20) {
                            // 20次尝试后仍然没有变化，尝试 scrollIntoView
                            try {
                                if (targetTop < currentTop) {
                                    const firstElement = document.body.firstElementChild || document.body.firstChild;
                                    if (firstElement && firstElement.nodeType === 1) {
                                        firstElement.scrollIntoView({ behavior: 'instant', block: 'start', __bypassLock: true });
                                    }
                                } else {
                                    const lastElement = document.body.lastElementChild || document.body.lastChild;
                                    if (lastElement && lastElement.nodeType === 1) {
                                        lastElement.scrollIntoView({ behavior: 'instant', block: 'end', __bypassLock: true });
                                    }
                                }
                            } catch (e) {
                                console.error('[ChatGPT Helper] window scrollIntoView 失败:', e);
                            }
                            clearInterval(scrollInterval);
                            setTimeout(() => delete window.__ghBypassLock, 100);
                        }
                    }, 10);
                } else {
                    if (options && typeof options === 'object') {
                        window.scrollTo({ top: options.top || 0, behavior: options.behavior || 'auto' });
                    } else {
                        window.scrollTo(0, options || 0);
                    }
                }
                return;
            }

            // 检查是否在底部
            const isAtBottomContainer = this.isAtBottom(50);
            let targetTop;
            if (options && typeof options === 'object') {
                targetTop = options.top !== undefined ? options.top : container.scrollTop;
            } else if (typeof options === 'number') {
                targetTop = options;
            } else {
                targetTop = container.scrollTop;
            }
            const currentTop = container.scrollTop;
            const needsScroll = Math.abs(targetTop - currentTop) > 1; // 只要位置不同就需要滚动

            // 如果在底部且需要滚动到不同位置，使用强制滚动方法
            // 注意：只有当目标位置不是底部时才需要强制滚动（向上滚动）
            const isScrollingUp = targetTop < currentTop;
            if (isAtBottomContainer && needsScroll && isScrollingUp) {
                console.log('[ChatGPT Helper] scrollTo: 在底部且向上滚动，使用强制滚动方法，目标位置:', targetTop, '当前位置:', currentTop);
                
                // 设置 bypassLock 标志，绕过所有滚动锁定
                container.__ghBypassLock = true;
                window.__ghBypassLock = true;
                
                // 获取原生 scrollTop setter（从原型链获取，绕过可能的拦截）
                const proto = Object.getPrototypeOf(container);
                const descriptor = Object.getOwnPropertyDescriptor(proto, 'scrollTop') ||
                    Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop') ||
                    Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');

                const forceScroll = () => {
                    try {
                        // 方法1: 使用原生 setter（如果可用）
                        if (descriptor && descriptor.set) {
                            descriptor.set.call(container, targetTop);
                        } else {
                            // 方法2: 直接操作属性，绕过所有拦截
                            Object.defineProperty(container, 'scrollTop', {
                                value: targetTop,
                                writable: true,
                                configurable: true
                            });
                        }
                    } catch (e) {
                        // 方法3: 直接赋值（最后的备用方案）
                        try {
                            container.scrollTop = targetTop;
                        } catch (e2) {
                            console.error('[ChatGPT Helper] 强制设置 scrollTop 失败:', e2);
                        }
                    }
                };

                // 立即执行多次，确保生效
                forceScroll();
                setTimeout(() => {
                    container.__ghBypassLock = true;
                    window.__ghBypassLock = true;
                    forceScroll();
                }, 0);
                setTimeout(() => {
                    container.__ghBypassLock = true;
                    window.__ghBypassLock = true;
                    forceScroll();
                }, 10);
                setTimeout(() => {
                    container.__ghBypassLock = true;
                    window.__ghBypassLock = true;
                    forceScroll();
                }, 20);

                // 也使用 scrollTo 作为备用
                try {
                    container.scrollTo({ top: targetTop, behavior: options?.behavior || 'instant', __bypassLock: true });
                } catch (e) {
                    console.log('[ChatGPT Helper] scrollTo 失败:', e);
                }

                // 使用 setInterval 持续尝试，确保滚动成功
                let attempts = 0;
                const maxAttempts = 50;
                const scrollInterval = setInterval(() => {
                    attempts++;
                    const before = container.scrollTop;
                    container.__ghBypassLock = true; // 确保标志始终存在
                    window.__ghBypassLock = true;
                    forceScroll();
                    const current = container.scrollTop;
                    
                    // 检查是否到达目标位置
                    if (Math.abs(current - targetTop) <= 5 || attempts >= maxAttempts) {
                        clearInterval(scrollInterval);
                        setTimeout(() => {
                            delete container.__ghBypassLock;
                            delete window.__ghBypassLock;
                        }, 100);
                        console.log('[ChatGPT Helper] 强制滚动完成，最终位置:', current, '目标位置:', targetTop, '尝试次数:', attempts);
                    } else if (Math.abs(current - before) > 1) {
                        // 位置有变化，继续尝试
                    } else if (attempts > 10) {
                        // 10次尝试后仍然没有变化，尝试 scrollIntoView
                        console.log('[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView');
                        try {
                            // 向上滚动，使用第一个子元素
                            const firstChild = container.firstElementChild || container.firstChild;
                            if (firstChild && firstChild.nodeType === 1) {
                                firstChild.scrollIntoView({ behavior: 'instant', block: 'start', __bypassLock: true });
                            }
                        } catch (e) {
                            console.error('[ChatGPT Helper] scrollIntoView 失败:', e);
                        }
                        clearInterval(scrollInterval);
                        setTimeout(() => {
                            delete container.__ghBypassLock;
                            delete window.__ghBypassLock;
                        }, 100);
                    }
                }, 10);
                return;
            }

            // 正确处理绕过锁定标志
            const shouldBypass = options && typeof options === 'object' && options.__bypassLock;
            if (shouldBypass) {
                container.__ghBypassLock = true;
            }

            try {
                if (typeof options === 'object') {
                    container.scrollTo(options);
                } else {
                    // 兼容旧式调用
                    container.scrollTop = options || 0;
                }
            } catch (e) {
                // 兼容部分旧浏览器不支持 options 对象
                if (options && typeof options === 'object' && options.top !== undefined) {
                    container.__ghBypassLock = true;
                    container.scrollTop = options.top;
                } else if (typeof options === 'number') {
                    container.__ghBypassLock = true;
                    container.scrollTop = options;
                }
            } finally {
                // 在 finally 中清理绕过标志
                if (shouldBypass) {
                    delete container.__ghBypassLock;
                }
            }
        }

        isAtBottom(threshold = 100) {
            const c = this.container;
            if (!c) {
                return window.innerHeight + window.scrollY >= document.body.scrollHeight - threshold;
            }
            return c.scrollHeight - c.scrollTop - c.clientHeight <= threshold;
        }
    }

    /**
     * 历史加载管理器
     * 负责加载全部历史记录并滚动到真正顶部
     */
    class HistoryLoader {
        constructor(scrollManager, showToastFunc) {
            this.scrollManager = scrollManager;
            this.showToast = showToastFunc || (() => { });
            this.isLoading = false;
            this.aborted = false;
            this.overlay = null;
        }

        async loadAllAndScrollTop() {
            if (this.isLoading) {
                this.showToast('正在加载历史...');
                return;
            }

            const container = this.scrollManager.container;
            if (!container) {
                this.showToast('未找到滚动容器');
                return;
            }

            this.isLoading = true;
            this.aborted = false;

            const WAIT_MS = 800;
            const MAX_NO_CHANGE_ROUNDS = 3;
            const MAX_TOTAL_ROUNDS = 50;

            const initialHeight = container.scrollHeight;
            let lastHeight = initialHeight;
            let noChangeCount = 0;
            let loopCount = 0;

            container.scrollTop = 0;

            const loadLoop = () => {
                if (this.aborted) {
                    this.finish(false);
                    return;
                }

                loopCount++;
                if (loopCount >= MAX_TOTAL_ROUNDS) {
                    this.finish(true);
                    return;
                }

                container.scrollTop = 0;
                container.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }));

                setTimeout(() => {
                    if (this.aborted) {
                        this.finish(false);
                        return;
                    }

                    const currentHeight = container.scrollHeight;
                    if (currentHeight > lastHeight) {
                        lastHeight = currentHeight;
                        noChangeCount = 0;
                        this.updateOverlayText(`正在加载历史... (${Math.round(currentHeight / 1000)}k)`);
                        loadLoop();
                    } else {
                        noChangeCount++;
                        const isAtTop = container.scrollTop < 10;
                        const isFirstRoundNoChange = loopCount === 1 && currentHeight === initialHeight;

                        if (isFirstRoundNoChange && isAtTop) {
                            this.finish(false, true);
                        } else if (noChangeCount >= MAX_NO_CHANGE_ROUNDS) {
                            this.finish(true);
                        } else {
                            this.updateOverlayText(`正在加载历史... (${noChangeCount}/${MAX_NO_CHANGE_ROUNDS})`);
                            loadLoop();
                        }
                    }
                }, WAIT_MS);
            };

            loadLoop();
        }

        finish(success, silent = false) {
            this.isLoading = false;
            this.aborted = false;
            this.hideOverlay();
            if (success && !silent) {
                this.showToast('历史加载完成');
            }
        }

        abort() {
            this.aborted = true;
        }

        showOverlay() {
            if (this.overlay) return;
            const overlay = createElement('div', {
                id: 'chatgpt-helper-loading-overlay',
                className: 'chatgpt-helper-loading-overlay'
            });

            const spinner = createElement('div', { className: 'chatgpt-helper-loading-spinner' });
            const text = createElement('div', {
                id: 'chatgpt-helper-loading-text',
                className: 'chatgpt-helper-loading-text'
            }, '正在加载历史...');
            const hint = createElement('div', {
                className: 'chatgpt-helper-loading-hint'
            }, '请稍候...');
            const stopBtn = createElement('button', {
                className: 'chatgpt-helper-loading-stop-btn',
                type: 'button'
            }, '停止');
            stopBtn.addEventListener('click', () => this.abort());

            overlay.appendChild(spinner);
            overlay.appendChild(text);
            overlay.appendChild(hint);
            overlay.appendChild(stopBtn);
            document.body.appendChild(overlay);
            this.overlay = overlay;
        }

        hideOverlay() {
            if (this.overlay) {
                this.overlay.remove();
                this.overlay = null;
            }
        }

        updateOverlayText(text) {
            if (this.overlay) {
                const textEl = this.overlay.querySelector('#chatgpt-helper-loading-text');
                if (textEl) textEl.textContent = text;
            }
        }
    }

    /**
     * 锚点管理器
     * 支持双向锚点（来回跳转）
     */
    class AnchorManager {
        constructor(scrollManager, showToastFunc) {
            this.scrollManager = scrollManager;
            this.showToast = showToastFunc || (() => { });
            this.previousAnchor = null; // 上一个位置（跳转前）
            this.currentAnchor = null; // 当前锚点（跳转目标）
            this.onAnchorChange = null; // UI 更新回调
        }

        bindUI(callback) {
            this.onAnchorChange = callback;
        }

        _captureCurrentPosition() {
            return {
                top: this.scrollManager.scrollTop,
                ts: Date.now()
            };
        }

        setAnchor(top) {
            this.previousAnchor = {
                top: top !== undefined ? top : this.scrollManager.scrollTop,
                ts: Date.now()
            };
            if (this.onAnchorChange) this.onAnchorChange(true);
        }

        backToAnchor() {
            if (!this.previousAnchor) return false;

            const container = this.scrollManager.container;
            if (!container) return false;

            const currentPos = this._captureCurrentPosition();

            if (this.previousAnchor.top !== undefined) {
                this.scrollManager.scrollTo({ top: this.previousAnchor.top, behavior: 'smooth' });
                this.currentAnchor = this.previousAnchor;
                this.previousAnchor = currentPos;
                return true;
            }
            return false;
        }

        hasAnchor() {
            return this.previousAnchor !== null;
        }

        reset() {
            this.previousAnchor = null;
            this.currentAnchor = null;
            if (this.onAnchorChange) this.onAnchorChange(false);
        }
    }

    /**
     * 阅读进度管理器
     * 负责自动保存和恢复阅读位置
     */
    class ReadingProgressManager {
        constructor(settings, scrollManager, adapter, showToastFunc) {
            this.settings = settings;
            this.scrollManager = scrollManager;
            this.adapter = adapter;
            this.showToast = showToastFunc || (() => { });
            this.lastSaveTime = 0;
            this.isRecording = false;
            this.scrollHandler = null;
            this.restoredTop = null;
        }

        startRecording() {
            if (this.isRecording) return;
            if (!this.settings.readingHistory?.persistence) return;

            this.isRecording = true;
            this.scrollHandler = () => this.handleScroll();

            const container = this.scrollManager.container;
            if (container) {
                container.addEventListener('scroll', this.scrollHandler, { passive: true });
            }
            window.addEventListener('scroll', this.scrollHandler, { capture: true, passive: true });
        }

        stopRecording() {
            if (!this.isRecording) return;
            this.isRecording = false;

            if (this.scrollHandler) {
                const container = this.scrollManager.container;
                if (container) {
                    container.removeEventListener('scroll', this.scrollHandler);
                }
                window.removeEventListener('scroll', this.scrollHandler, { capture: true });
                this.scrollHandler = null;
            }
        }

        handleScroll() {
            if (!this.settings.readingHistory?.persistence) return;

            const now = Date.now();
            if (now - this.lastSaveTime > 1000) {
                this.saveProgress();
                this.lastSaveTime = now;
            }
        }

        getKey() {
            const url = window.location.href;
            const match = url.match(/\/c\/([^\/\?]+)/) || url.match(/\/chat\/([^\/\?]+)/);
            return match ? `chatgpt:${match[1]}` : `chatgpt:${url}`;
        }

        saveProgress() {
            if (!this.isRecording) return;
            if (this.adapter.isNewConversation && this.adapter.isNewConversation()) return;

            const scrollTop = this.scrollManager.scrollTop;
            if (scrollTop < 0) return;

            const key = this.getKey();
            const data = {
                top: scrollTop,
                ts: Date.now()
            };

            const allData = window.GM_getValue('chatgpt_reading_progress', {});
            allData[key] = data;
            window.GM_setValue('chatgpt_reading_progress', allData);
        }

        async restoreProgress() {
            if (!this.settings.readingHistory?.autoRestore) return false;

            const key = this.getKey();
            const allData = window.GM_getValue('chatgpt_reading_progress', {});
            const data = allData[key];

            if (!data) return false;

            const container = this.scrollManager.container;
            if (!container) return false;

            return new Promise((resolve) => {
                let attempts = 0;
                const maxAttempts = 30;

                const tryScroll = () => {
                    if (attempts > maxAttempts) {
                        if (data.top !== undefined && container.scrollHeight >= data.top) {
                            this.scrollManager.scrollTo({ top: data.top, behavior: 'instant' });
                            this.restoredTop = data.top;
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                        return;
                    }

                    attempts++;
                    const currentHeight = container.scrollHeight;

                    if (data.top !== undefined && currentHeight >= data.top) {
                        this.scrollManager.scrollTo({ top: data.top, behavior: 'instant' });
                        this.restoredTop = data.top;
                        resolve(true);
                    } else {
                        container.scrollTop = 0;
                        container.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }));
                        setTimeout(tryScroll, 500);
                    }
                };

                tryScroll();
            });
        }

        cleanup() {
            const lastRun = window.GM_getValue('chatgpt_progress_cleanup_last_run', 0);
            const now = Date.now();
            if (now - lastRun < 24 * 60 * 60 * 1000) return;

            const days = this.settings.readingHistory?.cleanupDays || 30;
            if (days === -1) return;

            const expireTime = days * 24 * 60 * 60 * 1000;
            const allData = window.GM_getValue('chatgpt_reading_progress', {});
            let changed = false;

            Object.keys(allData).forEach(key => {
                if (now - allData[key].ts > expireTime) {
                    delete allData[key];
                    changed = true;
                }
            });

            if (changed) {
                window.GM_setValue('chatgpt_reading_progress', allData);
            }
            window.GM_setValue('chatgpt_progress_cleanup_last_run', now);
        }
    }

    // ==================== 滚动锁定管理器 ====================

    /**
     * 滚动锁定管理器
     * 通过主滚动容器监听和 MutationObserver 修正来实现防自动滚动
     */
    class ScrollLockManager {
        constructor(siteAdapter) {
            this.siteAdapter = siteAdapter;
            this.enabled = false;
            this.originalApis = {
                scrollIntoView: Element.prototype.scrollIntoView,
                scrollTo: window.scrollTo,
                scrollBy: window.scrollBy,
                elementScrollTo: Element.prototype.scrollTo,
                elementScrollBy: Element.prototype.scrollBy,
                elementScroll: Element.prototype.scroll,
                scrollTopDescriptor: null,
            };
            this.usesPrototypeHijack = false;
            this.observer = null;
            this.autoScrollObserver = null;
            this.cleanupInterval = null;
            this.lastScrollTop = this.getCurrentScrollTop();
            this.lockedScrollTop = this.lastScrollTop;
            this.listeningContainer = null;

            this._cachedScrollContainer = null;
            this._cachedResponseContainer = null;
            this._cacheTimestamp = 0;
            this._cacheTimeout = 2000;

            this._debounceTimer = null;
            this._throttleTimer = null;
            this._isUpdatingScroll = false;
            this._rafId = null;
            this._pendingScrollUpdate = false;
            this._correctionRaf = null;
            this._lastUserInteractionAt = 0;
            this._lastProgrammaticFixAt = 0;
            this._userIntentWindowMs = 480;
            this._scrollJumpThreshold = 140;
            this._userInputHandler = null;
            this._lastTouchY = null;
        }

        getScrollContainer() {
            const now = Date.now();
            if (this._cachedScrollContainer &&
                this._cachedScrollContainer.isConnected &&
                (now - this._cacheTimestamp) < this._cacheTimeout) {
                return this._cachedScrollContainer;
            }

            const container = this.siteAdapter?.getScrollContainer?.();
            const result = (container && container.isConnected)
                ? container
                : (document.scrollingElement || document.documentElement || document.body);

            this._cachedScrollContainer = result;
            this._cacheTimestamp = now;
            return result;
        }

        getResponseContainer() {
            const now = Date.now();
            if (this._cachedResponseContainer &&
                this._cachedResponseContainer.isConnected &&
                (now - this._cacheTimestamp) < this._cacheTimeout) {
                return this._cachedResponseContainer;
            }

            const container = this.siteAdapter?.getResponseContainer?.() || this.siteAdapter?.getScrollContainer?.();
            if (container && container.isConnected) {
                this._cachedResponseContainer = container;
                this._cacheTimestamp = now;
            }
            return container;
        }

        clearCache() {
            this._cachedScrollContainer = null;
            this._cachedResponseContainer = null;
            this._cacheTimestamp = 0;
        }

        getCurrentScrollTop() {
            const container = this.getScrollContainer();
            if (!container) return window.scrollY || 0;
            return container.scrollTop || 0;
        }

        isMainScrollElement(element) {
            const container = this._cachedScrollContainer || this.getScrollContainer();
            if (!container || !element) return false;
            if (element === container) return true;
            if (container === document.scrollingElement && (element === document.documentElement || element === document.body)) return true;
            return false;
        }

        shouldBypassLock(options, element) {
            if (options && typeof options === 'object' && options.__bypassLock) return true;
            if (element && element.__ghBypassLock) return true;
            return false;
        }

        refreshContainerListener() {
            if (!this.onScrollHandler) return;
            const container = this.getScrollContainer();
            if (this.listeningContainer === container) return;
            if (this.listeningContainer) {
                try {
                    this.listeningContainer.removeEventListener('scroll', this.onScrollHandler);
                } catch (e) {
                }
            }
            if (container) {
                try {
                    container.addEventListener('scroll', this.onScrollHandler, { passive: true });
                } catch (e) {
                    console.error('[ChatGPT Helper] 添加滚动监听器错误:', e);
                }
            }
            this.listeningContainer = container;
            const current = this.getCurrentScrollTop();
            this.lastScrollTop = current;
            this.lockedScrollTop = current;
        }

        setEnabled(enabled) {
            if (this.enabled === enabled) return;
            this.enabled = enabled;
            if (enabled) {
                this.enable();
            } else {
                this.disable();
            }
        }

        enable() {
            this.clearCache();
            this.lastScrollTop = this.getCurrentScrollTop();
            this.lockedScrollTop = this.lastScrollTop;
            this.startObserver();
            this.startScrollListener();
            this.stopAutoScroll();
        }

        disable() {
            this.clearCache();
            this.stopObserver();
            this.stopScrollListener();
            this.stopAutoScroll();
            if (this._correctionRaf) {
                cancelAnimationFrame(this._correctionRaf);
                this._correctionRaf = null;
            }
            this._isUpdatingScroll = false;
        }

        hijackApis() {
            return;
        }

        restoreApis() {
            return;
        }

        shouldBlockScroll() {
            return this.enabled;
        }

        markUserInteraction() {
            this._lastUserInteractionAt = Date.now();
            const current = this.getCurrentScrollTop();
            this.lastScrollTop = current;
            this.lockedScrollTop = current;
        }

        hasRecentUserInteraction() {
            return (Date.now() - this._lastUserInteractionAt) < this._userIntentWindowMs;
        }

        isProtectingPosition() {
            if (!this.enabled) return false;
            if (this.hasRecentUserInteraction()) return false;
            return Boolean(this.siteAdapter?.isGenerating?.());
        }

        startScrollListener() {
            const onScroll = () => {
                const currentScrollTop = this.getCurrentScrollTop();

                if (!this.enabled) {
                    this.lastScrollTop = currentScrollTop;
                    this.lockedScrollTop = currentScrollTop;
                    return;
                }

                if (this._isUpdatingScroll || (Date.now() - this._lastProgrammaticFixAt) < 80) {
                    this.lastScrollTop = currentScrollTop;
                    this.lockedScrollTop = currentScrollTop;
                    return;
                }

                if (!this.isProtectingPosition()) {
                    this.lastScrollTop = currentScrollTop;
                    this.lockedScrollTop = currentScrollTop;
                    return;
                }

                if (currentScrollTop > this.lockedScrollTop + this._scrollJumpThreshold) {
                    this.scheduleScrollCorrection(this.lockedScrollTop);
                    return;
                }

                this.lastScrollTop = currentScrollTop;
            };

            const markIntent = (event) => {
                if (!this.enabled) return;
                if (event.type === 'keydown') {
                    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];
                    if (!keys.includes(event.key)) return;
                }
                if (event.type === 'touchmove' && event.touches && event.touches.length) {
                    const currentY = event.touches[0].clientY;
                    if (this._lastTouchY != null && Math.abs(currentY - this._lastTouchY) < 3) {
                        return;
                    }
                    this._lastTouchY = currentY;
                }
                this.markUserInteraction();
            };

            this.onScrollHandlerOptions = { passive: true, capture: true };
            window.addEventListener('scroll', onScroll, this.onScrollHandlerOptions);
            this.onScrollHandler = onScroll;
            this._userInputHandler = markIntent;
            window.addEventListener('wheel', markIntent, { passive: true, capture: true });
            window.addEventListener('touchstart', markIntent, { passive: true, capture: true });
            window.addEventListener('touchmove', markIntent, { passive: true, capture: true });
            window.addEventListener('pointerdown', markIntent, { passive: true, capture: true });
            window.addEventListener('mousedown', markIntent, { passive: true, capture: true });
            window.addEventListener('keydown', markIntent, { capture: true });
            this.refreshContainerListener();
        }

        stopScrollListener() {
            if (this.onScrollHandler) {
                window.removeEventListener('scroll', this.onScrollHandler, this.onScrollHandlerOptions || { capture: true });
                if (this.listeningContainer) {
                    this.listeningContainer.removeEventListener('scroll', this.onScrollHandler);
                    this.listeningContainer = null;
                }
                this.onScrollHandler = null;
                this.onScrollHandlerOptions = null;
            }
            if (this._userInputHandler) {
                window.removeEventListener('wheel', this._userInputHandler, { capture: true });
                window.removeEventListener('touchstart', this._userInputHandler, { capture: true });
                window.removeEventListener('touchmove', this._userInputHandler, { capture: true });
                window.removeEventListener('pointerdown', this._userInputHandler, { capture: true });
                window.removeEventListener('mousedown', this._userInputHandler, { capture: true });
                window.removeEventListener('keydown', this._userInputHandler, { capture: true });
                this._userInputHandler = null;
            }
            this._lastTouchY = null;
        }

        startObserver() {
            const handleMutations = (mutations) => {
                if (!this.enabled) return;
                const responseContainer = this.getResponseContainer();
                if (!responseContainer) return;

                let hasRelevantChange = false;
                for (let i = 0; i < Math.min(mutations.length, 10); i++) {
                    const mutation = mutations[i];
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        for (let j = 0; j < Math.min(mutation.addedNodes.length, 5); j++) {
                            const node = mutation.addedNodes[j];
                            if (node.nodeType === 1) {
                                try {
                                    if (responseContainer.contains(node)) {
                                        hasRelevantChange = true;
                                        break;
                                    }
                                } catch (e) {
                                }
                            }
                        }
                        if (hasRelevantChange) break;
                    }
                }

                if (hasRelevantChange) {
                    if (this._debounceTimer) {
                        clearTimeout(this._debounceTimer);
                    }
                    this._debounceTimer = setTimeout(() => {
                        this._updateScrollPosition();
                    }, 40);
                }
            };

            this.observer = new MutationObserver(handleMutations);
            const responseContainer = this.getResponseContainer();
            const observeTarget = responseContainer || document.body;
            this.observer.observe(observeTarget, {
                childList: true,
                subtree: true,
            });

            this.cleanupInterval = setInterval(() => {
                if (!this.enabled) return;
                this.refreshContainerListener();
                this._checkAndFixScroll();
            }, 1500);
        }

        scheduleScrollCorrection(targetTop) {
            if (!this.enabled) return;
            if (this._correctionRaf) {
                cancelAnimationFrame(this._correctionRaf);
            }
            this._pendingScrollUpdate = true;
            this._correctionRaf = requestAnimationFrame(() => {
                this._pendingScrollUpdate = false;
                this._correctionRaf = null;
                this.applyScrollCorrection(targetTop);
            });
        }

        applyScrollCorrection(targetTop) {
            const container = this.getScrollContainer();
            if (!container || !this.enabled) return;
            if (this._isUpdatingScroll) return;

            try {
                this._isUpdatingScroll = true;
                if (typeof container.scrollTo === 'function') {
                    container.scrollTo({ top: targetTop, behavior: 'instant' });
                } else {
                    container.scrollTop = targetTop;
                }
                this._lastProgrammaticFixAt = Date.now();
                this.lastScrollTop = targetTop;
                this.lockedScrollTop = targetTop;
            } catch (e) {
                console.warn('[ChatGPT Helper] 修正滚动位置失败:', e);
            } finally {
                setTimeout(() => {
                    this._isUpdatingScroll = false;
                }, 0);
            }
        }

        _updateScrollPosition() {
            if (this._isUpdatingScroll) return;
            const container = this.getScrollContainer();
            if (!container) return;
            const currentScroll = container.scrollTop;

            if (!this.isProtectingPosition()) {
                this.lastScrollTop = currentScroll;
                this.lockedScrollTop = currentScroll;
                return;
            }

            if (currentScroll > this.lockedScrollTop + this._scrollJumpThreshold) {
                this.scheduleScrollCorrection(this.lockedScrollTop);
                return;
            }

            this.lastScrollTop = currentScroll;
        }

        _checkAndFixScroll() {
            if (this._isUpdatingScroll) return;
            const container = this.getScrollContainer();
            if (!container) return;
            const current = container.scrollTop;

            if (!this.isProtectingPosition()) {
                this.lastScrollTop = current;
                this.lockedScrollTop = current;
                return;
            }

            if (current > this.lockedScrollTop + this._scrollJumpThreshold) {
                this.scheduleScrollCorrection(this.lockedScrollTop);
                return;
            }

            this.lastScrollTop = current;
        }

        stopObserver() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            if (this.cleanupInterval) {
                clearInterval(this.cleanupInterval);
                this.cleanupInterval = null;
            }
            if (this._rafId) {
                cancelAnimationFrame(this._rafId);
                this._rafId = null;
            }
            if (this._debounceTimer) {
                clearTimeout(this._debounceTimer);
                this._debounceTimer = null;
            }
            if (this._throttleTimer) {
                clearTimeout(this._throttleTimer);
                this._throttleTimer = null;
            }
            if (this._correctionRaf) {
                cancelAnimationFrame(this._correctionRaf);
                this._correctionRaf = null;
            }
            this._isUpdatingScroll = false;
            this._pendingScrollUpdate = false;
        }

        startAutoScroll() {
            if (this.autoScrollObserver) {
                this.stopAutoScroll();
            }

            if (this.enabled) {
                return;
            }

            let autoScrollDebounceTimer = null;
            let lastAutoScrollTime = 0;
            const AUTO_SCROLL_THROTTLE = 200;

            this.autoScrollObserver = new MutationObserver((mutations) => {
                if (this.enabled) return;

                const now = Date.now();
                if (now - lastAutoScrollTime < AUTO_SCROLL_THROTTLE) {
                    return;
                }

                const responseContainer = this.getResponseContainer();
                if (!responseContainer) return;

                let hasNewContent = false;
                for (let i = 0; i < Math.min(mutations.length, 10); i++) {
                    const mutation = mutations[i];
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        for (let j = 0; j < Math.min(mutation.addedNodes.length, 5); j++) {
                            const node = mutation.addedNodes[j];
                            if (node.nodeType === 1) {
                                try {
                                    if (responseContainer.contains(node)) {
                                        hasNewContent = true;
                                        break;
                                    }
                                } catch (e) {
                                }
                            }
                        }
                        if (hasNewContent) break;
                    }
                }

                if (hasNewContent) {
                    if (autoScrollDebounceTimer) {
                        clearTimeout(autoScrollDebounceTimer);
                    }

                    autoScrollDebounceTimer = setTimeout(() => {
                        const isGenerating = this.siteAdapter?.isGenerating?.();
                        if (isGenerating) {
                            const container = this.getScrollContainer();
                            if (!container) return;
                            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= 100;
                            if (isNearBottom) {
                                const targetTop = Math.max(0, container.scrollHeight - container.clientHeight);
                                try {
                                    container.scrollTo({
                                        top: targetTop,
                                        behavior: 'smooth'
                                    });
                                } catch (e) {
                                    if (container.scrollTop !== undefined) {
                                        container.scrollTop = targetTop;
                                    }
                                }
                                lastAutoScrollTime = Date.now();
                            }
                        }
                    }, 100);
                }
            });

            const responseContainer = this.getResponseContainer();
            const observeTarget = responseContainer || document.body;
            this.autoScrollObserver.observe(observeTarget, {
                childList: true,
                subtree: responseContainer ? true : false,
            });
        }

        stopAutoScroll() {
            if (this.autoScrollObserver) {
                this.autoScrollObserver.disconnect();
                this.autoScrollObserver = null;
            }
        }
    }
    // ==================== 宽度样式管理器 ====================

    /**
     * 宽度样式管理器
     * 负责页面宽度的动态调整
     */
    class WidthStyleManager {
        constructor(siteAdapter, widthConfig) {
            this.siteAdapter = siteAdapter;
            this.widthConfig = widthConfig;
            this.styleElement = null;
        }

        apply() {
            if (this.styleElement) {
                this.styleElement.remove();
                this.styleElement = null;
            }

            if (this.widthConfig && this.widthConfig.enabled) {
                const css = this.generateCSS();
                this.styleElement = document.createElement('style');
                this.styleElement.id = 'chatgpt-helper-width-styles';
                this.styleElement.textContent = css;
                document.head.appendChild(this.styleElement);
            }
        }

        generateCSS() {
            const globalWidth = `${this.widthConfig.value}${this.widthConfig.unit}`;
            // ChatGPT 主内容区域选择器
            const selectors = [
                'main',
                '[role="main"]',
                'div[class*="flex"][class*="flex-col"]',
            ];

            return selectors.map(selector => {
                return `${selector} { max-width: ${globalWidth} !important; margin-left: auto !important; margin-right: auto !important; }`;
            }).join('\n');
        }

        updateConfig(widthConfig) {
            this.widthConfig = widthConfig;
            this.apply();
        }
    }
    Object.assign(H, {
        ScrollManager,
        HistoryLoader,
        AnchorManager,
        ReadingProgressManager,
        ScrollLockManager,
        WidthStyleManager
    });
})();
