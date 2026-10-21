import { ChatGPTClient } from '../shared/chatgpt-client.js';
import { detectLanguage, getExtensionRuntime, setCurrentLang, t } from './10-base.js';
import { ThemeAssetRepository } from './20-theme-assets.js';
import { AnchorManager, HistoryLoader, ReadingProgressManager, ScrollLockManager, ScrollManager, WidthStyleManager } from './40-scroll-managers.js';
import { PromptQuickMenu } from './55-prompt-quick-menu.js';
import { CopyManager } from './60-copy-manager.js';
import { MessageSelectManager } from './65-message-select-manager.js';
import { TabRenameManager } from './70-tab-rename-manager.js';
import { ChatGPTAdapter } from './80-chatgpt-adapter.js';
const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
import { RuntimeScope } from './15-runtime.js';
// Chrome Extension Content Script - ChatGPT Helper App Core


// ==================== ChatGPT helper core ====================
class HelperCore {
    constructor() {
        this.scope = new RuntimeScope();
        this.backend = new ChatGPTClient();
        this.adapter = new ChatGPTAdapter(this.backend);
        setCurrentLang(detectLanguage());
        this.lang = detectLanguage();
        this.t = t;
        this.settings = this.loadSettings();
        this.prompts = this.loadPrompts();
        this.isCollapsed = !this.settings.defaultPanelState;
        this.currentTab = this.settings.tabOrder[0] || 'prompts';
        this.selectedCategory = t('allCategory');
        this.searchQuery = '';
        this.selectedPrompt = null;
        this.savedAnchorTop = null;
        this.hasAnchor = false;
        this.panel = null;
        this.outlineManager = null;

        const toast = message => this.showToast(message);
        this.scrollManager = new ScrollManager(this.adapter);
        this.historyLoader = new HistoryLoader(this.scrollManager, toast, t);
        this.anchorManager = new AnchorManager(this.scrollManager, toast);
        this.anchorManager.bindUI(hasAnchor => {
            this.hasAnchor = hasAnchor;
            this.updateAnchorButton();
        });
        this.readingProgressManager = new ReadingProgressManager(this.settings, this.scrollManager, this.adapter, toast);
        this.copyManager = new CopyManager(this.settings, toast, t);
        this.tabRenameManager = new TabRenameManager(this.adapter, this.settings, toast);
        this.promptQuickMenu = new PromptQuickMenu({
            getPrompts: () => this.prompts,
            isEnabled: () => this.settings.promptQuickMenuEnabled !== false,
            t: key => this.t(key),
            onInsert: prompt => this.usePrompt(prompt, { replaceComposer: true })
        });
        this.messageSelectManager = new MessageSelectManager({ adapter: this.adapter, t: key => this.t(key), onToast: toast, onImageExport: () => this.openImageExport() });
        this.scrollLockManager = new ScrollLockManager(this.adapter);
        this.scrollManager.lockManager = this.scrollLockManager;
        this.widthStyleManager = new WidthStyleManager(this.adapter, this.settings.pageWidth);
        this.currentEffectiveTheme = 'light';
        this.themeAssetRepository = new ThemeAssetRepository();
        this.themeBackgroundObjectUrl = null;
        this.themeBackgroundObjectAssetId = null;
        this.themeRuntimeStyleReady = false;
        this.themeHostRefreshQueued = false;
        root.getThemeDiagnostics = () => this.collectThemeDiagnostics();
        this.scope.listen(window, 'pagehide', event => {
            if (this.themeSettingSaveTimer) {
                clearTimeout(this.themeSettingSaveTimer);
                this.themeSettingSaveTimer = null;
                this.saveSettings();
            }
            if (!event.persisted) this.destroy();
        });
        this.ready = this.init();
        this.ready.catch(error => console.error('[ChatGPT Helper] 初始化失败:', error));
    }

    // Optional features fail independently; required layout errors remain visible.
    runFeature(name, start) {
        try {
            return Promise.resolve(start()).catch(error => console.error('[ChatGPT Helper] ' + name, error));
        } catch (error) {
            console.error('[ChatGPT Helper] ' + name, error);
            return Promise.resolve();
        }
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
        this.onboardingTour?.destroy({ restore: false });
        this.themeBackgroundRevision = (this.themeBackgroundRevision || 0) + 1;
        this.disposeExporter?.();
        this.scope.dispose();
        this.pageScope?.dispose();
        this.themeScope?.dispose();
        for (const key of ['tabSpacingObserver', 'panelSpacingObserver', 'headerSpacingObserver', 'scrollNavObserver', 'promptsResponsiveObserver']) {
            this[key]?.disconnect();
        }
        this.themeObserver?.disconnect();
        this.stopThemeHostWatchdog();
        this.stopSystemThemeListener();
        this.closeThemeSettingsModal();
        this.closeAboutModal?.();
        this.revokeThemeBackgroundObjectUrl();
        this.scrollManager.cancel();
        this.historyLoader.abort();
        this.readingProgressManager.stopRecording();
        this.readingProgressManager.cancelRestore?.();
        this.scrollLockManager.setEnabled(false);
        this.outlineManager?.destroy();
        this.copyManager.destroy();
        this.tabRenameManager.stop();
        this.promptQuickMenu.destroy();
        this.messageSelectManager.stop();
        this.conversationManager?.destroy();
        if (this.panelMessageHandler) getExtensionRuntime()?.onMessage?.removeListener(this.panelMessageHandler);
    }
}

export { HelperCore };
