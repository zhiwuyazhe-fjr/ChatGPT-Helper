import { copyTextToClipboard, createElement, createSvgIconNode } from './10-base.js';
import { snapshotMessage } from './66-message-snapshot.js';
import { isHelperMutation } from './15-runtime.js';
// Chrome Extension Content Script - ChatGPT Helper Message Select Manager
// 支持勾选对话中的部分消息，悬浮工具条提供 MD/JSON/TXT 导出与复制


class MessageSelectManager {
    constructor(config = {}) {
        this.t = config.t || ((key) => key);
        this.showToast = config.onToast || ((msg) => {});
        this.observer = null;
        this.adapter = config.adapter;
        this.onImageExport = config.onImageExport;
        this.listeners = new Set();
        this.route = location.pathname;
        this.main = this.adapter.getChatContainer();
        this.toolbar = null;
        // 勾选时保存内容快照（纯数据，不持有 DOM 引用）：
        // 长对话被虚拟化回收后仍可导出，也不会造成内存泄漏
        this.selections = [];
        this._syncTimer = null;
        this._started = false;
    }

    start() {
        if (this._started) return;
        this._started = true;
        this.syncTurns();
        if (typeof MutationObserver === 'function') {
            this.observer = new MutationObserver(records => {
                if (records.some(record => !isHelperMutation(record))) this.scheduleSync();
            });
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    stop() {
        if (!this._started) return;
        this._started = false;
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this._syncTimer) {
            clearTimeout(this._syncTimer);
            this._syncTimer = null;
        }
        this.selections = [];
        this.removeToolbar();
        document.querySelectorAll('.gh-msg-select-check').forEach((el) => el.remove());
        document.querySelectorAll('.gh-msg-select-turn').forEach((el) => {
            el.classList.remove('gh-msg-select-turn', 'gh-msg-selected');
        });
    }

    scheduleSync() {
        if (this._syncTimer) return;
        this._syncTimer = setTimeout(() => {
            this._syncTimer = null;
            this.syncTurns();
        }, 300);
    }

    findTurns() {
        return this.adapter.getChatMessages().filter(message => ['user', 'assistant'].includes(this.adapter.getMessageRole(message)));
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notify() { this.listeners.forEach(listener => listener()); }

    refreshContext() {
        if (this.route !== location.pathname || this.main !== this.adapter.getChatContainer()) {
            this.route = location.pathname;
            this.main = this.adapter.getChatContainer();
            this.clearSelection();
        }
        this.syncTurns();
        this.notify();
    }

    syncTurns() {
        // 选中状态保存在 selections 数组（纯数据），DOM 回收不影响已选项
        if (!this._started) return;
        if (this.route !== location.pathname || this.main !== this.adapter.getChatContainer()) {
            this.route = location.pathname;
            this.main = this.adapter.getChatContainer();
            this.clearSelection();
        }
        const turns = this.findTurns();
        turns.forEach((turn, order) => {
            const id = this.adapter.getMessageIdentity(turn, order);
            const selected = this.selections.some(item => item.id === id);
            turn.classList.toggle('gh-msg-selected', selected);
            const existing = turn.querySelector(':scope > .gh-msg-select-check');
            if (existing) {
                existing.classList.toggle('checked', selected);
                existing.setAttribute('aria-pressed', String(selected));
            }
            if (turn.querySelector(':scope > .gh-msg-select-check')) return;
            try {
                turn.classList.add('gh-msg-select-turn');
                const check = createElement('button', {
                    className: 'gh-msg-select-check',
                    type: 'button',
                    title: this.t('selectMessageTitle'),
                    'aria-label': this.t('selectMessageTitle'),
                    'aria-pressed': String(selected),
                    'data-gh-owned': 'selection'
                });
                check.appendChild(createSvgIconNode('check', { size: 11 }));
                check.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle(turn, check);
                });
                turn.insertAdjacentElement('afterbegin', check);
            } catch (e) {
                // 单条消息失败不影响其他消息
            }
        });

        this.updateToolbar();
    }

    toggle(turn, check) {
        const order = this.findTurns().indexOf(turn);
        const message = snapshotMessage(this.adapter, turn, order);
        const existingIndex = this.selections.findIndex(item => item.id === message.id);
        if (existingIndex !== -1) {
            this.selections.splice(existingIndex, 1);
            turn.classList.remove('gh-msg-selected');
            if (check) {
                check.classList.remove('checked');
                check.setAttribute('aria-pressed', 'false');
            }
        } else {
            this.selections.push(message);
            turn.classList.add('gh-msg-selected');
            if (check) {
                check.classList.add('checked');
                check.setAttribute('aria-pressed', 'true');
            }
        }
        this.updateToolbar();
        this.notify();
    }

    clearSelection() {
        this.selections = [];
        document.querySelectorAll('.gh-msg-select-turn.gh-msg-selected').forEach((turn) => {
            turn.classList.remove('gh-msg-selected');
            const check = turn.querySelector(':scope > .gh-msg-select-check');
            if (check) {
                check.classList.remove('checked');
                check.setAttribute('aria-pressed', 'false');
            }
        });
        this.updateToolbar();
        this.notify();
    }

    getConversationTitle() { return this.adapter.getSessionName() || 'ChatGPT'; }

    collectSelectedMessages() {
        // Resolve mounted nodes again (streaming edits / branch replacement), retain snapshots
        // for virtualized nodes, and always export in conversation order.
        const current = new Map(this.findTurns().map((node, order) => [this.adapter.getMessageIdentity(node, order), node]));
        return this.selections.map(item => current.has(item.id) ? snapshotMessage(this.adapter, current.get(item.id), item.order) : item)
            .sort((a, b) => a.order - b.order);
    }

    formatToMarkdown(title, messages, exportedAt) {
        const lines = [`# ${title}`, ''];
        lines.push(`> ${this.t('exportTimeLabel')}: ${exportedAt}`);
        lines.push('');
        messages.forEach((msg, index) => {
            const label = msg.role === 'user'
                ? `## 🧑 ${this.t('userRole')}`
                : '## 🤖 ChatGPT';
            lines.push(label);
            lines.push('');
            lines.push(msg.content);
            if (index < messages.length - 1) lines.push('');
        });
        return lines.join('\n');
    }

    formatToTxt(title, messages, exportedAt) {
        const lines = [`=== ${title} (${exportedAt}) ===`, ''];
        messages.forEach((msg) => {
            const label = msg.role === 'user'
                ? `[${this.t('userRole')}]`
                : '[ChatGPT]';
            lines.push(label);
            lines.push(msg.content);
            lines.push('');
        });
        return lines.join('\n');
    }

    formatToJson(title, messages, exportedAt) {
        return JSON.stringify({
            title,
            exportedAt,
            source: window.location && window.location.href ? window.location.href : '',
            messages: messages.map(({role, content}) => ({role, content}))
        }, null, 2);
    }

    sanitizeFilename(name) {
        return String(name || 'conversation')
            .replace(/[\\/:*?"<>|\r\n]+/g, '_')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 80) || 'conversation';
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = createElement('a', {
            href: url,
            download: filename
        });
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            link.remove();
            URL.revokeObjectURL(url);
        }, 1000);
    }

    exportSelected(format) {
        const messages = this.collectSelectedMessages();
        if (messages.length === 0) {
            this.showToast(this.t('selectedExportEmpty'));
            return;
        }
        const title = this.getConversationTitle();
        const exportedAt = new Date().toLocaleString();
        const stamp = new Date().toISOString().slice(0, 10);
        const baseName = `${this.sanitizeFilename(title)}-${stamp}`;
        try {
            if (format === 'md') {
                this.downloadFile(this.formatToMarkdown(title, messages, exportedAt),
                    `chatgpt-helper-${baseName}.md`, 'text/markdown');
            } else if (format === 'json') {
                this.downloadFile(this.formatToJson(title, messages, exportedAt),
                    `chatgpt-helper-${baseName}.json`, 'application/json');
            } else {
                this.downloadFile(this.formatToTxt(title, messages, exportedAt),
                    `chatgpt-helper-${baseName}.txt`, 'text/plain');
            }
            this.showToast(this.t('selectedExported'));
        } catch (e) {
            console.error('[ChatGPT Helper] 导出所选消息失败:', e);
            this.showToast(this.t('exportFailed'));
        }
    }

    async copySelected() {
        const messages = this.collectSelectedMessages();
        if (messages.length === 0) {
            this.showToast(this.t('selectedExportEmpty'));
            return;
        }
        const title = this.getConversationTitle();
        const markdown = this.formatToMarkdown(title, messages, new Date().toLocaleString());
        const ok = await copyTextToClipboard(markdown);
        this.showToast(ok ? this.t('selectedCopied') : this.t('copyFailed'));
    }

    ensureToolbar() {
        if (this.toolbar && this.toolbar.isConnected) return this.toolbar;
        this.toolbar = createElement('div', {
            // id 前缀用于被主题壁纸的"body 直属容器透明化"规则排除
            id: 'chatgpt-helper-msg-select-toolbar',
            className: 'gh-msg-select-toolbar',
            role: 'toolbar',
            'aria-label': 'ChatGPT Helper message export',
            'data-gh-owned': 'selection'
        });
        const count = createElement('span', { className: 'gh-msg-select-toolbar-count' });
        this.toolbar.appendChild(count);

        const makeBtn = (label, onClick, className = '') => {
            const btn = createElement('button', {
                className: `gh-msg-select-toolbar-btn ${className}`,
                type: 'button'
            }, label);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            });
            return btn;
        };
        this.toolbar.appendChild(makeBtn(this.t('exportSelectedImage'), () => this.onImageExport?.()));
        this.toolbar.appendChild(makeBtn(this.t('exportSelectedMarkdown'), () => this.exportSelected('md')));
        this.toolbar.appendChild(makeBtn(this.t('exportSelectedJson'), () => this.exportSelected('json')));
        this.toolbar.appendChild(makeBtn(this.t('exportSelectedTxt'), () => this.exportSelected('txt')));
        this.toolbar.appendChild(makeBtn(this.t('copySelectedMessages'), () => {
            this.copySelected();
        }, 'secondary'));
        this.toolbar.appendChild(makeBtn(this.t('clearSelection'), () => this.clearSelection(), 'secondary'));

        const closeBtn = createElement('button', {
            className: 'gh-msg-select-toolbar-close',
            type: 'button',
            title: this.t('clearSelection'),
            'aria-label': this.t('clearSelection')
        });
        closeBtn.appendChild(createSvgIconNode('close', { size: 12 }));
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.clearSelection();
        });
        this.toolbar.appendChild(closeBtn);

        document.body.appendChild(this.toolbar);
        return this.toolbar;
    }

    removeToolbar() {
        if (this.toolbar && this.toolbar.parentNode) {
            this.toolbar.parentNode.removeChild(this.toolbar);
        }
        this.toolbar = null;
    }

    updateToolbar() {
        const count = this.selections.length;
        if (count === 0) {
            if (this.toolbar) this.toolbar.classList.remove('open');
            return;
        }
        const toolbar = this.ensureToolbar();
        const countEl = toolbar.querySelector('.gh-msg-select-toolbar-count');
        if (countEl) {
            countEl.textContent = (this.t('selectedMessagesCount') || '{count} selected')
                .replace('{count}', String(count));
        }
        toolbar.classList.add('open');
    }
}

export { MessageSelectManager };
