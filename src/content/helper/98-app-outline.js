import { t } from './10-base.js';
import { OutlineManager } from './50-outline-manager.js';
import { OutlineIndex } from './51-outline-index.js';
import { conversationIdFromPath } from '../shared/conversation-context.js';
// Chrome Extension Content Script - ChatGPT Helper App Outline



export const OutlineFeature = {
    refreshOutline(reload = false) {
        const panel = this.panel?.querySelector('#outline-content');
        if (panel && this.currentTab === 'outline') this.renderOutline(panel, reload);
    },

    renderOutline(container, reload = false) {
        if (!this.outlineManager) {
            this.outlineManager = new OutlineManager({
                container,
                settings: this.settings,
                siteAdapter: this.adapter,
                onNavigate: (item, onComplete) => {
                    const index = this.outlineIndex;
                    const bounds = {};
                    this.scrollManager.scrollTo({ resolveTarget: scroll => index.resolve(item, scroll, bounds), onComplete: result => {
                        if (result.timedOut) this.showToast(t('outlineTargetUnavailable'));
                        onComplete(result);
                    } });
                },
                cancelNavigation: () => this.scrollManager.cancel(),
                onJumpBefore: () => {
                    if (this.anchorManager && this.scrollManager) {
                        this.anchorManager.setAnchor(this.scrollManager.scrollTop);
                    }
                },
                onAutoUpdate: () => {
                    // The host lifecycle resets navigation/anchors before binding a new
                    // workspace. A virtual-window mutation must not publish it early.
                    if (this.outlineIndex?.path === location.pathname && this.outlineIndex.main === this.adapter.getChatContainer()) {
                        this.refreshOutline();
                    }
                },
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
        const main = this.adapter.getChatContainer();
        if (this.outlineIndex?.main !== main || this.outlineIndex?.path !== location.pathname) {
            this.outlineIndex?.controller.abort();
            this.outlineIndex = new OutlineIndex(this.adapter, main, location.pathname);
        }
        const index = this.outlineIndex;
        const id = conversationIdFromPath(index.path);
        if (main && id && !index.loading && (!index.requested || reload || (!manager.isActive && !index.data))) {
            index.requested = true;
            index.loading = true;
            this.backend.json(`/conversation/${encodeURIComponent(id)}`, { signal: index.controller.signal })
                .then(data => {
                    if (index.controller.signal.aborted || index.path !== location.pathname || main !== this.adapter.getChatContainer()) return;
                    if ((data?.conversation_id || data?.id || id) !== id) return;
                    index.setConversation(data);
                    this.refreshOutline();
                })
                .catch(() => { /* Temporary chats and offline sessions use observed messages. */ })
                .finally(() => { index.loading = false; });
        }
        manager.update(index.update(this.settings.outline?.showUserQueries));
        manager.setActive(this.currentTab === 'outline');
    }
};
