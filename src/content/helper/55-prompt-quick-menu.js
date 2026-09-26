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
    // 触发前缀使用双斜杠 // ：单斜杠属于 ChatGPT 自带的斜杠命令菜单，避免与其冲突
    const TRIGGER_PREFIX = '//';

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
            const text = rawText.replace(/^[\s]+/, ''); // 仅在整体以 // 开头时触发
            if (text.startsWith(TRIGGER_PREFIX)) {
                const query = text.slice(TRIGGER_PREFIX.length);
                if (query.length > MAX_QUERY_LENGTH || /\s/.test(query) || query.startsWith('/')) {
                    this.close();
                    return;
                }
                this.query = query;
                this.open();
            } else if (this.isOpen) {
                this.close();
            }
        }

        handleKeyDown(e) {
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
