// Chrome Extension Content Script - ChatGPT Helper ChatGPT Adapter
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
        ChatGPTHelper
    } = H;

    // ==================== ChatGPT 适配器 ====================
    class ChatGPTAdapter {
        constructor() {
            this.textarea = null;
            this.lastResponseContainer = null;
            this.accessTokenPromise = null;
            this.accountIdPromise = null;
            this.findTextarea();
        }

        findTextarea() {
            // ChatGPT 的输入框选择器（按优先级）
            const selectors = [
                '#prompt-textarea',
                'textarea[placeholder*="Message"]',
                'textarea[placeholder*="消息"]',
                'textarea[data-id="root"]',
                'div[contenteditable="true"][role="textbox"]',
                'div[contenteditable="true"]',
                'textarea',
            ];
            for (const selector of selectors) {
                const el = document.querySelector(selector);
                if (el && el.offsetParent !== null) { // 确保元素可见
                    this.textarea = el;
                    return;
                }
            }
        }

        getSidebarContainer() {
            // ChatGPT 侧边栏容器（按优先级）
            return document.querySelector('nav[aria-label*="Chat history"]') ||
                document.querySelector('nav[aria-label*="聊天历史"]') ||
                document.querySelector('aside[aria-label*="Chat history"]') ||
                document.querySelector('aside[aria-label*="聊天历史"]') ||
                document.querySelector('[data-testid="sidebar"]') ||
                document.querySelector('nav') ||
                document.querySelector('aside');
        }

        getChatContainer() {
            // ChatGPT 对话区域容器（按优先级）
            return document.querySelector('main[class*="flex"]') ||
                document.querySelector('main') ||
                document.querySelector('[role="main"]') ||
                document.querySelector('.flex-1') ||
                document.querySelector('[class*="flex"][class*="flex-col"]');
        }

        isScrollableOverflowValue(value) {
            return value === 'auto' || value === 'scroll' || value === 'overlay';
        }

        hasScrollableOverflow(style) {
            if (!style) return false;
            return this.isScrollableOverflowValue(style.overflowY) ||
                this.isScrollableOverflowValue(style.overflow);
        }

        isScrollableCandidate(element) {
            if (!element || !element.isConnected || element.clientHeight <= 0 || element.getClientRects().length === 0) {
                return false;
            }
            const style = window.getComputedStyle(element);
            return element.scrollHeight > element.clientHeight && this.hasScrollableOverflow(style);
        }

        canScrollElement(element) {
            if (!this.isScrollableCandidate(element)) {
                return false;
            }

            try {
                const originalScrollTop = element.scrollTop;
                const maxScrollTop = Math.max(0, element.scrollHeight - element.clientHeight);
                if (maxScrollTop <= 0) {
                    return false;
                }

                const delta = originalScrollTop >= maxScrollTop - 1 ? -1 : 1;
                const targetScrollTop = Math.max(0, Math.min(maxScrollTop, originalScrollTop + delta));
                if (targetScrollTop === originalScrollTop) {
                    return false;
                }

                element.scrollTop = targetScrollTop;
                const didScroll = element.scrollTop !== originalScrollTop;
                element.scrollTop = originalScrollTop;
                return didScroll;
            } catch (e) {
                return false;
            }
        }

        cacheResponseContainer(element) {
            if (element && element.isConnected) {
                this.lastResponseContainer = element;
            }
            return element;
        }

        getCachedResponseContainer() {
            if (!this.lastResponseContainer) {
                return null;
            }

            if (!this.isScrollableCandidate(this.lastResponseContainer)) {
                this.lastResponseContainer = null;
                return null;
            }

            return this.lastResponseContainer;
        }

        insertPrompt(content) {
            let editor = this.textarea;
            if (!editor) {
                this.findTextarea();
                editor = this.textarea;
                if (!editor) {
                    console.warn('[ChatGPT Helper] 未找到输入框');
                    return false;
                }
            }

            // 验证元素仍在 DOM 中
            if (!editor.isConnected) {
                this.textarea = null;
                this.findTextarea();
                editor = this.textarea;
                if (!editor) return false;
            }

            try {
                if (editor.contentEditable === 'true' || editor.getAttribute('contenteditable') === 'true') {
                    // contenteditable div
                    editor.focus();
                    const selection = window.getSelection();
                    const range = document.createRange();

                    // 选择所有内容
                    range.selectNodeContents(editor);
                    range.collapse(false); // 移动到末尾
                    selection.removeAllRanges();
                    selection.addRange(range);

                    // 插入文本
                    document.execCommand('insertText', false, content);

                    // 触发输入事件
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                    editor.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (editor.tagName === 'TEXTAREA') {
                    // textarea
                    editor.focus();
                    editor.value = content;
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                    editor.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    // 降级方案：直接设置文本内容
                    editor.textContent = content;
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                }
                return true;
            } catch (e) {
                console.error('[ChatGPT Helper] 插入提示词失败:', e);
                return false;
            }
        }

        getResponseContainer() {
            // 关键修复：ChatGPT 的滚动发生在容器内部的子元素上
            // 需要查找真正可滚动的子元素，而不是容器本身

            const cachedContainer = this.getCachedResponseContainer();
            if (cachedContainer) {
                return cachedContainer;
            }

            // 1. 先找到主容器
            const mainContainer = this.getChatContainer() ||
                document.querySelector('.flex-1');

            if (mainContainer) {
                // 2. 在容器内部查找真正可滚动的子元素
                // 方法：遍历所有子元素，找到 scrollHeight > clientHeight 且可以设置 scrollTop 的元素
                const findScrollableChild = (element, depth = 0) => {
                    if (depth > 5) return null; // 限制深度

                    if (this.canScrollElement(element)) {
                        return element;
                    }

                    // 递归查找子元素
                    for (const child of element.children) {
                        const found = findScrollableChild(child, depth + 1);
                        if (found) return found;
                    }

                    return null;
                };

                // 先检查容器本身
                if (this.canScrollElement(mainContainer)) {
                    return this.cacheResponseContainer(mainContainer);
                }

                // 在容器内部查找可滚动的子元素
                const scrollableChild = findScrollableChild(mainContainer);
                if (scrollableChild) {
                    console.log('[ChatGPT Helper] 找到可滚动的子元素:', scrollableChild);
                    return this.cacheResponseContainer(scrollableChild);
                }

                // 如果找不到，尝试更激进的查找：查找所有有 overflow 样式的元素
                const allElements = mainContainer.querySelectorAll('*');
                for (const el of allElements) {
                    if (this.canScrollElement(el)) {
                        console.log('[ChatGPT Helper] 找到可滚动的元素（通过 overflow 样式）:', el);
                        return this.cacheResponseContainer(el);
                    }
                }
            }

            // 3. 回退：查找包含消息的元素，向上查找可滚动的父元素
            const messageSelectors = [
                '[data-message-author-role]',
                '.group[data-testid*="conversation-turn"]',
                '[class*="group"]',
            ];

            for (const selector of messageSelectors) {
                const message = document.querySelector(selector);
                if (message) {
                    // 向上查找可滚动的父容器
                    let parent = message.parentElement;
                    let depth = 0;
                    while (parent && depth < 15) {
                        if (this.canScrollElement(parent)) {
                            return this.cacheResponseContainer(parent);
                        }
                        parent = parent.parentElement;
                        depth++;
                    }
                }
            }

            // 4. 最后回退到 body
            this.lastResponseContainer = null;
            console.log('[ChatGPT Helper] 未找到可滚动容器，回退到 body');
            return document.body;
        }

        getChatMessages() {
            const container = this.getResponseContainer();
            if (!container) return [];

            // ChatGPT 消息选择器
            const messageSelectors = [
                '[data-message-author-role]',
                '.group[data-testid*="conversation-turn"]',
                '.group',
                '[class*="group"]',
            ];

            for (const selector of messageSelectors) {
                const messages = container.querySelectorAll(selector);
                if (messages.length > 0) {
                    return Array.from(messages);
                }
            }

            return [];
        }

        getSessionName() {
            // 获取当前会话名称
            // 方法1: 从页面标题获取（去除状态前缀）
            let title = document.title;
            if (title) {
                // 移除状态前缀
                title = title.replace(/^[⏳✅]\s*/, '').trim();
                // 移除模型名称
                title = title.replace(/^\[[\w\s.]+\]\s*/, '').trim();
                // 如果不是默认标题，返回
                if (title && title !== 'ChatGPT' && title !== 'New Chat') {
                    return title;
                }
            }

            // 方法2: 尝试从侧边栏获取当前选中的会话名称
            const sidebar = this.getSidebarContainer();
            if (sidebar) {
                const activeItem = sidebar.querySelector('[aria-current="page"], [data-active="true"], .active');
                if (activeItem) {
                    const name = activeItem.textContent?.trim();
                    if (name && name !== 'New Chat' && name !== '新对话') {
                        return name;
                    }
                }
            }

            // 方法3: 尝试从URL获取会话ID（作为备选）
            const url = window.location.href;
            const match = url.match(/\/c\/([a-zA-Z0-9-]+)/);
            if (match) {
                return `Chat ${match[1].substring(0, 8)}`;
            }

            return null;
        }

        getModelName() {
            // 获取当前使用的模型名称
            // ChatGPT 通常在页面某个位置显示模型信息
            const selectors = [
                '[data-model]',
                '[aria-label*="model"]',
                '[title*="model" i]',
                'select[aria-label*="model" i]',
                '.model-selector',
                '[class*="model"]'
            ];

            for (const selector of selectors) {
                const el = document.querySelector(selector);
                if (el) {
                    const model = el.getAttribute('data-model') ||
                        el.getAttribute('aria-label') ||
                        el.getAttribute('title') ||
                        el.textContent?.trim();
                    if (model && model.length < 50) {
                        return model.replace(/model\s*:?\s*/i, '').trim();
                    }
                }
            }

            return null;
        }

        getBackendApiBaseUrl() {
            const origin = window.location?.origin || 'https://chatgpt.com';
            const apiMapping = {
                'https://chat.openai.com': 'https://chat.openai.com/backend-api',
                'https://chatgpt.com': 'https://chatgpt.com/backend-api',
                'https://new.oaifree.com': 'https://new.oaifree.com/backend-api'
            };
            return apiMapping[origin] || `${origin}/backend-api`;
        }

        getPageAccessToken() {
            return window.__remixContext?.state?.loaderData?.root?.clientBootstrap?.session?.accessToken ||
                window.__NEXT_DATA__?.props?.pageProps?.session?.accessToken ||
                null;
        }

        async fetchSessionAccessToken() {
            const response = await fetch(`${window.location.origin}/api/auth/session`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Session request failed: ${response.status}`);
            }
            const session = await response.json();
            if (!session?.accessToken) {
                throw new Error('Session response did not include an access token');
            }
            return session.accessToken;
        }

        async getAccessToken() {
            const pageAccessToken = this.getPageAccessToken();
            if (pageAccessToken) return pageAccessToken;

            if (!this.accessTokenPromise) {
                this.accessTokenPromise = this.fetchSessionAccessToken().catch((error) => {
                    this.accessTokenPromise = null;
                    throw error;
                });
            }
            return this.accessTokenPromise;
        }

        getCookie(key) {
            return document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)?.pop() || '';
        }

        async fetchBackendJson(url, options = {}, includeAccount = true) {
            let accessToken = null;
            try {
                accessToken = await this.getAccessToken();
            } catch (error) {
                console.warn('[ChatGPT Helper] 未能获取 access token，尝试使用 Cookie 会话请求:', error);
            }

            const headers = { ...options.headers };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
                headers['X-Authorization'] = `Bearer ${accessToken}`;
            }

            if (includeAccount) {
                const accountId = await this.getTeamAccountId();
                if (accountId) {
                    headers['Chatgpt-Account-Id'] = accountId;
                }
            }

            const response = await fetch(url, {
                credentials: 'include',
                ...options,
                headers
            });
            if (!response.ok) {
                throw new Error(`ChatGPT API request failed: ${response.status} ${response.statusText || ''}`.trim());
            }
            return response.json();
        }

        async fetchTeamAccountId() {
            const workspaceId = this.getCookie('_account');
            if (!workspaceId) return null;

            const url = `${this.getBackendApiBaseUrl()}/accounts/check/v4-2023-04-27`;
            const accountsCheck = await this.fetchBackendJson(url, {}, false);
            return accountsCheck?.accounts?.[workspaceId]?.account?.account_id || null;
        }

        async getTeamAccountId() {
            if (!this.accountIdPromise) {
                this.accountIdPromise = this.fetchTeamAccountId().catch((error) => {
                    console.warn('[ChatGPT Helper] 获取团队账号 ID 失败，继续使用默认账号:', error);
                    return null;
                });
            }
            return this.accountIdPromise;
        }

        parseConversationTimestamp(value) {
            if (!value) return null;
            if (typeof value === 'number') {
                return value < 1e12 ? value * 1000 : value;
            }
            const parsed = Date.parse(value);
            return Number.isNaN(parsed) ? null : parsed;
        }

        normalizeConversationApiItem(item) {
            if (!item || !item.id || item.is_archived || item.is_temporary_chat) {
                return null;
            }

            const createdAt = this.parseConversationTimestamp(item.create_time);
            const updatedAt = this.parseConversationTimestamp(item.update_time) || createdAt;
            const title = (item.title || '').trim() || '未命名对话';
            const url = new URL(`/c/${item.id}`, window.location.origin).href;

            return {
                id: item.id,
                title,
                url,
                isPinned: Boolean(item.is_starred || item.pinned_time),
                createdAt,
                updatedAt
            };
        }

        async fetchConversationListFromApi(maxConversations = 1000, pageSize = 100) {
            const conversations = [];
            let offset = 0;

            while (conversations.length < maxConversations) {
                const limit = Math.min(pageSize, maxConversations - conversations.length);
                const url = new URL(`${this.getBackendApiBaseUrl()}/conversations`);
                url.searchParams.set('offset', String(offset));
                url.searchParams.set('limit', String(limit));

                const result = await this.fetchBackendJson(url.href);
                const items = Array.isArray(result?.items) ? result.items : [];
                if (items.length === 0) break;

                items.forEach((item) => {
                    const normalized = this.normalizeConversationApiItem(item);
                    if (normalized && conversations.length < maxConversations) {
                        conversations.push(normalized);
                    }
                });

                offset += items.length;
                const total = typeof result.total === 'number' ? result.total : null;
                const responseLimit = typeof result.limit === 'number' ? result.limit : limit;
                if (total !== null && offset >= total) break;
                if (items.length < responseLimit) break;
            }

            return conversations;
        }

        async getConversationList(options = {}) {
            try {
                const conversations = await this.fetchConversationListFromApi(
                    options.maxConversations || 1000,
                    options.pageSize || 100
                );
                if (conversations.length > 0) {
                    return conversations;
                }
                console.warn('[ChatGPT Helper] API 未返回历史会话，回退到侧边栏 DOM 扫描');
            } catch (error) {
                console.warn('[ChatGPT Helper] API 加载历史会话失败，回退到侧边栏 DOM 扫描:', error);
            }

            return this.getConversationListFromDom();
        }

        getConversationListFromDom() {
            // 从侧边栏获取会话列表
            const sidebar = this.getSidebarContainer();
            if (!sidebar) return [];

            const conversations = [];
            const seenIds = new Set();
            const selectors = [
                'a[href^="/c/"]',
                'a[href*="/c/"]',
                'a[href^="/chat/"]',
                'a[href*="/chat/"]',
                '[data-testid*="history"] a[href*="/c/"]',
                '[data-testid*="conversation"] a[href*="/c/"]',
                '[class*="conversation"] a[href*="/c/"]',
                'nav a[href*="/c/"]',
                'aside a[href*="/c/"]',
                'nav a',
                'aside a',
                '[class*="conversation"] a',
                '[data-testid*="conversation"] a'
            ];

            let items = [];
            for (const selector of selectors) {
                items = Array.from(sidebar.querySelectorAll(selector));
                if (items.length > 0) break;
            }

            items.forEach(item => {
                const href = item.getAttribute('href');
                if (!href) return;

                // 提取会话ID
                const idMatch = href.match(/\/c\/([^\/\?]+)/) || href.match(/\/chat\/([^\/\?]+)/);
                if (!idMatch) return;

                const id = idMatch[1];
                if (seenIds.has(id)) return;
                seenIds.add(id);
                // 使用innerText避免乱码
                const title = (item.innerText || item.textContent || '').trim().replace(/\s+/g, ' ') || '未命名对话';
                const url = new URL(href, window.location.origin).href;

                // 检查是否置顶
                const closest = typeof item.closest === 'function' ? item.closest.bind(item) : () => null;
                const isPinned = closest('[class*="pinned"]') !== null ||
                    closest('[data-pinned="true"]') !== null ||
                    item.getAttribute('data-pinned') === 'true';

                // 尝试从 DOM 中提取最近更新时间
                let updatedAt = null;
                try {
                    // ChatGPT 侧边栏可能在链接附近包含 <time datetime="...">
                    const timeEl = item.querySelector('time[datetime]') ||
                        item.closest('li, div, article, section')?.querySelector('time[datetime]');
                    if (timeEl) {
                        const dt = timeEl.getAttribute('datetime') || timeEl.dateTime;
                        const ts = Date.parse(dt);
                        if (!Number.isNaN(ts)) {
                            updatedAt = ts;
                        }
                    }
                } catch (e) {
                    // 忽略时间解析错误，使用默认时间
                }

                conversations.push({
                    id,
                    title,
                    url,
                    isPinned,
                    updatedAt
                });
            });

            return conversations;
        }

        getSiteId() {
            return 'chatgpt';
        }

        extractUserQueryText(element) {
            // 从用户消息元素中提取完整文本
            if (!element) return '';
            // 查找用户消息的文本内容
            const textContent = element.textContent || element.innerText || '';
            return textContent.trim();
        }

        getScrollContainer() {
            return this.getResponseContainer();
        }

        isGenerating() {
            // 检测 ChatGPT 是否正在生成响应
            // 查找停止按钮或加载指示器
            const stopButton = document.querySelector('button[aria-label*="Stop" i], button[aria-label*="停止" i], button[data-testid*="stop" i]');
            if (stopButton && stopButton.offsetParent !== null) {
                return true;
            }

            // 查找加载指示器
            const loadingIndicators = [
                '[class*="loading"]',
                '[class*="generating"]',
                '[role="progressbar"]',
                '[data-testid*="loading" i]',
                '[aria-busy="true"]'
            ];

            for (const selector of loadingIndicators) {
                const indicator = document.querySelector(selector);
                if (indicator && indicator.offsetParent !== null) {
                    return true;
                }
            }

            return false;
        }
    }
    Object.assign(H, {
        ChatGPTAdapter
    });
})();
