// Chrome Extension Content Script - ChatGPT Helper Prompt Quick Menu
// 在 ChatGPT 输入框中以 / 开头输入时，弹出提示词快速选择菜单
(function () {
    'use strict';

    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    const {
        createElement,
        createSvgIconNode,
        extractPromptVariables
    } = H;

    const COMPOSER_SELECTORS = [
        '#prompt-textarea',
        'div[contenteditable="true"][role="textbox"]',
        'textarea[data-id="root"]',
        'textarea[placeholder*="Message"]',
        'textarea[placeholder*="消息"]'
    ];
    const MAX_QUERY_LENGTH = 24;
    const MAX_VISIBLE_ITEMS = 9;
    // 双斜杠 // 立即触发；单斜杠 / 延迟探测 ChatGPT 原生命令菜单，
    // 原生菜单出现则让位，未出现（如账号无斜杠命令）则弹出我们的菜单
    const TRIGGER_PREFIX = '//';
    const SINGLE_SLASH_DEFER_MS = 160;
    const NATIVE_MENU_SELECTORS = [
        '[data-radix-popper-content-wrapper]',
        '[data-floating-ui-portal]',
        '[role="listbox"]',
        '[role="menu"]'
    ];

    class PromptQuickMenu {
        constructor(config = {}) {
            this.getPrompts = config.getPrompts || (() => []);
            this.isEnabled = config.isEnabled || (() => true);
            this.onInsert = config.onInsert || (() => {});
            this.t = config.t || ((key) => key);
            this.isOpen = false;
            this.menuEl = null;
            this.items = [];
            this.activeIndex = 0;
            this.query = '';
            this.composer = null;
            this._composerChangeTimer = null;
        }

        getComposer() {
            for (const selector of COMPOSER_SELECTORS) {
                const el = document.querySelector(selector);
                if (el && el.offsetParent !== null) {
                    return el;
                }
            }
            return null;
        }

        getComposerText(el) {
            if (!el) return '';
            if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                return el.value || '';
            }
            return el.textContent || '';
        }

        start() {
            if (this._started) return;
            this._started = true;
            this._onInput = (e) => this.handleInput(e);
            this._onKeyDown = (e) => this.handleKeyDown(e);
            this._onMouseDown = (e) => this.handleMouseDown(e);
            // capture 阶段监听，确保在 ChatGPT 自己的 Enter 处理之前拿到按键
            document.addEventListener('input', this._onInput, true);
            document.addEventListener('keydown', this._onKeyDown, true);
            document.addEventListener('mousedown', this._onMouseDown, true);
            // 窗口尺寸变化时，若菜单开着则重新贴位（输入框为固定定位，随之移动）
            this._onResize = () => {
                if (this.isOpen) this.positionMenu();
            };
            window.addEventListener('resize', this._onResize);
            // 页面切换 / 输入框重建时关闭菜单
            this._onSelectionChange = () => {
                if (this.isOpen && !this.getComposer()) this.close();
            };
            document.addEventListener('selectionchange', this._onSelectionChange);
        }

        stop() {
            if (!this._started) return;
            this._started = false;
            document.removeEventListener('input', this._onInput, true);
            document.removeEventListener('keydown', this._onKeyDown, true);
            document.removeEventListener('mousedown', this._onMouseDown, true);
            document.removeEventListener('selectionchange', this._onSelectionChange);
            if (this._onResize) {
                window.removeEventListener('resize', this._onResize);
            }
            this.cancelSlashDefer();
            this.close();
        }

        // 仅识别 ChatGPT 对话输入框，避免在页面其他 textarea/input 中误触发
        isComposerEvent(e) {
            const target = e.target;
            if (!target || target.nodeType !== 1) return false;
            if (target.id === 'prompt-textarea') return true;
            if (target.matches && target.matches('div[contenteditable="true"][role="textbox"]')) return true;
            if (target.matches && target.matches('textarea[data-id="root"]')) return true;
            if (target.matches && target.matches('textarea[placeholder*="Message"]')) return true;
            if (target.matches && target.matches('textarea[placeholder*="消息"]')) return true;
            return false;
        }

        handleInput(e) {
            if (e.type === 'input' && e.isComposing) return; // IME 组合输入中不处理
            if (!this.isEnabled()) {
                if (this.isOpen) this.close();
                return;
            }
            if (!this.isComposerEvent(e)) {
                return;
            }
            this.composer = e.target;
            const rawText = this.getComposerText(this.composer);
            const text = rawText.replace(/^[\s]+/, '');
            this.cancelSlashDefer();

            if (text.startsWith(TRIGGER_PREFIX)) {
                // "//" 强制触发，不做让位探测
                const query = text.slice(TRIGGER_PREFIX.length);
                if (query.length > MAX_QUERY_LENGTH || /\s/.test(query) || query.startsWith('/')) {
                    this.close();
                    return;
                }
                this.query = query;
                this.open();
                return;
            }

            if (text.startsWith('/') && !text.startsWith(TRIGGER_PREFIX)) {
                // 单斜杠：先给 ChatGPT 原生命令菜单一个出现窗口；
                // 它出现了就让位，没出现就弹出我们的菜单
                const query = text.slice(1);
                if (query.length > MAX_QUERY_LENGTH || /\s/.test(query) || query.startsWith('/')) {
                    this.close();
                    return;
                }
                if (this.isOpen) {
                    // 菜单已由我们接管：直接更新过滤结果，不再重复探测
                    this.query = query;
                    this.open();
                    return;
                }
                const snapshot = text;
                this._slashDeferTimer = setTimeout(() => {
                    this._slashDeferTimer = null;
                    try {
                        if (!this.isEnabled()) return;
                        const current = this.getComposerText(this.composer).replace(/^[\s]+/, '');
                        if (current !== snapshot) return; // 文本已变化，等下一个输入事件
                        if (this.hasNativeComposerMenu()) return; // 原生菜单在场，让位
                        this.query = snapshot.slice(1);
                        this.open();
                    } catch (err) {
                        // ignore
                    }
                }, SINGLE_SLASH_DEFER_MS);
                return;
            }

            if (this.isOpen) {
                this.close();
            }
        }

        cancelSlashDefer() {
            if (this._slashDeferTimer) {
                clearTimeout(this._slashDeferTimer);
                this._slashDeferTimer = null;
            }
        }

        // 探测输入框附近是否出现了 ChatGPT 原生弹层（斜杠命令/提及等）
        hasNativeComposerMenu() {
            if (!this.composer || !this.composer.getBoundingClientRect) return false;
            const cRect = this.composer.getBoundingClientRect();
            for (const selector of NATIVE_MENU_SELECTORS) {
                let nodes = [];
                try {
                    nodes = document.querySelectorAll(selector);
                } catch (e) {
                    continue;
                }
                for (const node of nodes) {
                    if (!(node instanceof HTMLElement)) continue;
                    if (typeof node.id === 'string' && node.id.startsWith('chatgpt-helper')) continue;
                    if (this.menuEl && (node === this.menuEl || this.menuEl.contains(node))) continue;
                    const r = node.getBoundingClientRect();
                    if (r.width < 40 || r.height < 16) continue;
                    const style = window.getComputedStyle(node);
                    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) continue;
                    // 输入框上方 520px 带宽内（原生斜杠菜单的标准位置）
                    if (r.bottom <= cRect.top + 24 && r.top >= cRect.top - 520) return true;
                }
            }
            return false;
        }

        handleKeyDown(e) {
            // 菜单未打开但探测等待中，Esc 也要能取消（否则会“凭空弹出”）
            if (e.key === 'Escape' && this._slashDeferTimer) {
                this.cancelSlashDefer();
                e.stopPropagation();
                return;
            }
            if (!this.isOpen) return;
            // IME 组合输入期间完全放行
            if (e.isComposing || e.keyCode === 229) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                e.stopPropagation();
                if (this.items.length === 0) return;
                const delta = e.key === 'ArrowDown' ? 1 : -1;
                this.activeIndex = (this.activeIndex + delta + this.items.length) % this.items.length;
                this.updateActiveItem();
                return;
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                e.stopPropagation();
                this.insertActive();
                return;
            }
            if (e.key === 'Escape') {
                e.stopPropagation();
                this.cancelSlashDefer();
                this.close();
            }
        }

        handleMouseDown(e) {
            if (!this.isOpen) return;
            if (this.menuEl && e.target && this.menuEl.contains(e.target)) return;
            if (this.composer && this.composer.contains && this.composer.contains(e.target)) return;
            this.close();
        }

        filterPrompts() {
            const prompts = this.getPrompts() || [];
            const query = this.query.toLowerCase();
            const matched = prompts.filter((p) => {
                if (!p) return false;
                // 含变量的提示词也允许快速插入，插入时再填变量
                const title = (p.title || '').toLowerCase();
                const content = (p.content || '').toLowerCase();
                const category = (p.category || '').toLowerCase();
                if (!query) return true;
                return title.includes(query) || content.includes(query) || category.includes(query);
            });
            return matched.slice(0, MAX_VISIBLE_ITEMS);
        }

        open() {
            const filtered = this.filterPrompts();
            this.items = filtered;
            this.activeIndex = 0;
            if (!this.menuEl) {
                this.menuEl = this.buildMenu();
                // id 前缀用于被主题壁纸的"body 直属容器透明化"规则排除，防止菜单背景被强制透明
                this.menuEl.id = 'chatgpt-helper-quick-menu';
                document.body.appendChild(this.menuEl);
            }
            // 先渲染并显示菜单，再定位（可见状态下才能量到真实高度，
            // 同一帧内完成不会闪烁），确保菜单整体位于输入框上方
            this.menuEl.classList.add('open');
            this.renderItems();
            this.positionMenu();
            this.isOpen = true;
        }

        close() {
            if (this.menuEl) {
                this.menuEl.classList.remove('open');
            }
            this.isOpen = false;
            this.cancelSlashDefer();
        }

        destroy() {
            this.stop();
            if (this.menuEl && this.menuEl.parentNode) {
                this.menuEl.parentNode.removeChild(this.menuEl);
            }
            this.menuEl = null;
        }

        buildMenu() {
            const menu = createElement('div', {
                className: 'gh-quick-menu',
                role: 'listbox',
                'aria-label': 'ChatGPT Helper prompts'
            });
            const list = createElement('div', { className: 'gh-quick-menu-list' });
            menu.appendChild(list);
            const hint = createElement('div', { className: 'gh-quick-menu-hint' }, this.t('quickMenuHint'));
            menu.appendChild(hint);
            return menu;
        }

        renderItems() {
            const list = this.menuEl.querySelector('.gh-quick-menu-list');
            if (!list) return;
            while (list.firstChild) list.firstChild.remove();
            if (this.items.length === 0) {
                const empty = createElement('div', { className: 'gh-quick-menu-empty' }, this.t('quickMenuEmpty'));
                list.appendChild(empty);
                return;
            }
            this.items.forEach((prompt, index) => {
                const vars = extractPromptVariables(prompt.content);
                const item = createElement('div', {
                    className: `gh-quick-menu-item${index === this.activeIndex ? ' active' : ''}`,
                    role: 'option',
                    'aria-selected': String(index === this.activeIndex),
                    'data-index': String(index)
                });
                const iconWrap = createElement('span', { className: 'gh-quick-menu-item-icon' });
                iconWrap.appendChild(createSvgIconNode('edit', { size: 13 }));
                item.appendChild(iconWrap);

                const main = createElement('div', { className: 'gh-quick-menu-item-main' });
                main.appendChild(createElement('span', { className: 'gh-quick-menu-item-title' }, prompt.title || ''));
                const meta = createElement('span', { className: 'gh-quick-menu-item-meta' });
                if (prompt.category) {
                    meta.appendChild(createElement('span', { className: 'gh-quick-menu-item-category' }, prompt.category));
                }
                if (vars.length > 0) {
                    meta.appendChild(createElement('span', { className: 'gh-quick-menu-item-vars' },
                        `${vars.length} {{}}`));
                }
                main.appendChild(meta);
                item.appendChild(main);

                // mousedown 在 blur 之前触发，用于保持输入框焦点
                item.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.activeIndex = index;
                    this.insertActive();
                });
                item.addEventListener('mousemove', () => {
                    if (this.activeIndex !== index) {
                        this.activeIndex = index;
                        this.updateActiveItem();
                    }
                });
                list.appendChild(item);
            });
        }

        updateActiveItem() {
            if (!this.menuEl) return;
            const itemEls = this.menuEl.querySelectorAll('.gh-quick-menu-item');
            itemEls.forEach((el, index) => {
                const isActive = index === this.activeIndex;
                el.classList.toggle('active', isActive);
                el.setAttribute('aria-selected', String(isActive));
            });
            const activeEl = itemEls[this.activeIndex];
            if (activeEl && activeEl.scrollIntoView) {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        }

        positionMenu() {
            if (!this.menuEl || !this.composer) return;
            const rect = this.composer.getBoundingClientRect();
            // 菜单必须处于可见状态（open class）才能量到真实高度，
            // 否则 display:none 下高度为 0，会把菜单摆到输入框内部造成遮挡
            const menuRect = this.menuEl.getBoundingClientRect();
            let left = rect.left;
            if (left + menuRect.width > window.innerWidth - 12) {
                left = Math.max(12, window.innerWidth - menuRect.width - 12);
            }
            // 优先整体悬在输入框上方：菜单底边距输入框顶边 8px
            let top = rect.top - menuRect.height - 8;
            if (top < 12) {
                // 上方空间不足时才落到输入框下方
                top = rect.bottom + 8;
            }
            this.menuEl.style.left = `${Math.round(left)}px`;
            this.menuEl.style.top = `${Math.round(top)}px`;
        }

        insertActive() {
            const prompt = this.items[this.activeIndex];
            if (!prompt) return;
            this.close();
            try {
                this.onInsert(prompt);
            } catch (e) {
                console.error('[ChatGPT Helper] 快速菜单插入失败:', e);
            }
        }

        // 用最终内容替换输入框文本（删除 "//关键词" 后写入提示词）
        // 注意：在 ProseMirror 等编辑器上 execCommand 可能返回 false 但内容实际已插入，
        // 因此以 DOM 实际文本为准判断成败，绝不重复插入导致文字翻倍。
        replaceComposerText(text) {
            const el = this.composer && this.composer.isConnected
                ? this.composer
                : this.getComposer();
            if (!el) return false;
            const normalize = (s) => String(s || '').replace(/\s+/g, '');
            try {
                el.focus();
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    el.value = text;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                }

                const selectAll = () => {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    selection.removeAllRanges();
                    selection.addRange(range);
                };

                selectAll();
                document.execCommand('insertText', false, text);

                if (normalize(el.textContent) === normalize(text)) {
                    // 内容已就位（无论 execCommand 返回值如何）
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                }

                // 未生效：清空输入内容后交由调用方走 adapter.insertPrompt 兜底
                try {
                    selectAll();
                    document.execCommand('delete');
                } catch (err) {
                    // ignore
                }
                return false;
            } catch (e) {
                console.error('[ChatGPT Helper] 替换输入框文本失败:', e);
                return false;
            }
        }
    }

    Object.assign(H, {
        PromptQuickMenu
    });
})();
