import { t } from './10-base.js';
import { OutlineManager } from './50-outline-manager.js';
// Chrome Extension Content Script - ChatGPT Helper App Outline



export const OutlineFeature = {
    refreshOutline() {
        const panel = this.panel?.querySelector('#outline-content');
        if (panel && this.currentTab === 'outline') this.renderOutline(panel);
    },

    renderOutline(container) {
        if (!this.outlineManager) {
            this.outlineManager = new OutlineManager({
                container,
                settings: this.settings,
                siteAdapter: this.adapter,
                onNavigate: top => this.scrollManager.scrollTo({ top, behavior: 'smooth' }),
                onJumpBefore: () => {
                    if (this.anchorManager && this.scrollManager) {
                        this.anchorManager.setAnchor(this.scrollManager.scrollTop);
                    }
                },
                onAutoUpdate: () => this.refreshOutline(),
                resolveItem: (item) => this.extractOutline().find((candidate) => candidate.id === item.id)?.element,
                onSettingsChange: (newSettings) => {
                    this.settings.outline ||= {};
                    Object.assign(this.settings.outline, newSettings);
                    this.saveSettings();
                },
                i18n: t
            });
        }
        const manager = this.outlineManager;
        manager.settings = this.settings;
        if (manager.container !== container || !container.querySelector('#outline-list')) {
            manager.container = container;
            manager.createUI();
        }
        // Keep the toolbar and observer alive even before the first answer arrives.
        manager.update(this.extractOutline());
        manager.setActive(this.currentTab === 'outline');
    },

    extractOutline() {
        const outline = [];
        const cleanText = (element) => (element?.innerText || element?.textContent || '').trim().replace(/\s+/g, ' ');
        const addItem = (element, level, messageId, position, isUserQuery = false) => {
            const text = cleanText(element);
            if (!text) return;
            const limit = isUserQuery ? 100 : position === 'summary' ? 80 : Infinity;
            outline.push({
                id: `${messageId}:${isUserQuery ? 'query' : position}`,
                messageId,
                level,
                text: text.length > limit ? `${text.slice(0, limit)}…` : text,
                isTruncated: text.length > limit,
                element,
                isUserQuery,
                index: outline.length
            });
        };

        this.adapter.getChatMessages().forEach((message, messageIndex) => {
            const role = this.adapter.getMessageRole(message);
            const messageKey = this.adapter.getMessageIdentity(message, messageIndex);
            const messageId = `${window.location.pathname}:${messageKey}`;
            if (role === 'user') {
                if (this.settings.outline?.showUserQueries) addItem(this.adapter.getMessageContent(message), 0, messageId, 0, true);
                return;
            }
            if (role !== 'assistant') return;
            const content = this.adapter.getMessageContent(message);
            const headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'))
                .filter((heading) => !heading.closest('pre, [hidden], [aria-hidden="true"], .sr-only') && cleanText(heading));
            headings.forEach((heading, index) => {
                const level = Number(heading.tagName.match(/^H([1-6])$/i)?.[1] || heading.getAttribute('aria-level')) || 2;
                addItem(heading, Math.max(1, Math.min(6, level)), messageId, index);
            });
            if (!headings.length) {
                const firstBlock = content.querySelector('p, li') || content;
                addItem(firstBlock, 1, messageId, 'summary');
            }
        });
        // querySelectorAll already provides document order; geometry sorting causes layout work
        // and misorders virtualized/temporarily hidden messages.
        return outline;
    }
};
