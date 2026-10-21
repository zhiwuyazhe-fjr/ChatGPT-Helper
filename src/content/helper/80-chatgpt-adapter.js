import { t } from './10-base.js';
// Chrome Extension Content Script - ChatGPT Helper ChatGPT Adapter


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
        // Semantic boundaries keep extension UI and sidebar cards out of chat features.
        return document.querySelector('main') || document.querySelector('[role="main"]');
    }

    getMessageRole(message) {
        return message?.getAttribute('data-message-author-role') ||
            message?.getAttribute('data-turn') ||
            message?.querySelector('[data-message-author-role]')?.getAttribute('data-message-author-role') ||
            (message?.querySelector('.markdown, .prose') ? 'assistant' : null);
    }

    getMessageContent(message) {
        return message?.querySelector('.markdown, .prose, [data-message-content]') || message;
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
        // Detection must not move the conversation or trigger scroll listeners.
        return this.isScrollableCandidate(element);
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
        const cached = this.getCachedResponseContainer();
        if (cached) return cached;

        const main = this.getChatContainer();
        const message = this.getChatMessages()[0];
        // Walk out from a message first: a scrollable code block is not the conversation.
        for (let element = message?.parentElement || main; element; element = element.parentElement) {
            if (element.clientHeight > 0 && this.hasScrollableOverflow(window.getComputedStyle(element))) {
                return this.cacheResponseContainer(element);
            }
        }
        if (main) {
            const candidates = main.querySelectorAll('[data-scroll-root], [class*="overflow-y-auto"], [class*="overflow-auto"]');
            for (const element of candidates) {
                if ((!message || element.contains(message)) && element.clientHeight > 0 &&
                    this.hasScrollableOverflow(window.getComputedStyle(element))) {
                    return this.cacheResponseContainer(element);
                }
            }
        }
        return document.scrollingElement || document.documentElement;
    }

    getChatMessages() {
        // Message discovery must not depend on whether the conversation is long enough to scroll.
        const container = this.getChatContainer();
        if (!container) return [];
        const selector = '[data-message-author-role], [data-testid^="conversation-turn-"], article[data-turn]';
        return Array.from(container.querySelectorAll(selector)).filter((message) => {
            if (message.closest('#chatgpt-helper-right, [data-gh-owned]')) return false;
            if (message.closest('[hidden], [aria-hidden="true"]')) return false;
            // Prefer the semantic message inside a turn, and avoid nested duplicates.
            if (message.hasAttribute('data-message-author-role')) {
                return !message.parentElement?.closest('[data-message-author-role]');
            }
            return !message.querySelector('[data-message-author-role]') &&
                !message.parentElement?.closest('[data-testid^="conversation-turn-"], article[data-turn]') &&
                Boolean(this.getMessageRole(message));
        });
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
        const title = (item.title || '').trim() || t('untitledConversation');
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
            const title = (item.innerText || item.textContent || '').trim().replace(/\s+/g, ' ') || t('untitledConversation');
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

export { ChatGPTAdapter };
