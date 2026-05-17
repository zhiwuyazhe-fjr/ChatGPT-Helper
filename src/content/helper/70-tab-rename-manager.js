// Chrome Extension Content Script - ChatGPT Helper Tab Rename Manager
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
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;

    // ==================== 阶段4：标签页增强 ====================

    /**
     * 标签页重命名管理器
     * 负责自动重命名标签页、显示状态、通知、隐私模式
     */
    class TabRenameManager {
        constructor(adapter, settings, showToastFunc) {
            this.adapter = adapter;
            this.settings = settings;
            this.showToast = showToastFunc || (() => { });
            this.lastSessionName = null;
            this.intervalId = null;
            this.isRunning = false;
            this.aiState = 'idle'; // 'idle' | 'generating' | 'completed'
            this.lastAiState = 'idle';
            this.notificationAudioContext = null;
            this.notificationAudioUnlocked = false;
            this.pendingNotificationTone = false;
            this.notificationUnlockHandler = null;
        }

        start() {
            if (this.isRunning) return;
            this.isRunning = true;
            this.updateTabName();
            if (this.settings.tabSettings?.notificationSound) {
                this.ensureNotificationAudioUnlock();
            }

            const intervalMs = 3000;
            this.intervalId = setInterval(() => this.updateTabName(), intervalMs);

            this.startGenerationObserver();
        }

        stop() {
            if (!this.isRunning) return;
            this.isRunning = false;

            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }

            if (this.generationObserver) {
                this.generationObserver.disconnect();
                this.generationObserver = null;
            }

            this.teardownNotificationAudioUnlock();
        }

        restartInterval() {
            if (this.isRunning && this.intervalId) {
                clearInterval(this.intervalId);
                const intervalMs = 3000;
                this.intervalId = setInterval(() => this.updateTabName(), intervalMs);
            }
        }

        startGenerationObserver() {
            if (this.generationObserver) return;

            this.generationObserver = new MutationObserver(() => {
                const isGenerating = this.adapter.isGenerating();
                if (isGenerating && this.aiState !== 'generating') {
                    this.aiState = 'generating';
                    this.updateTabName();
                } else if (!isGenerating && this.aiState === 'generating') {
                    this.onAiComplete();
                }
            });

            const container = this.adapter.getResponseContainer();
            if (container) {
                this.generationObserver.observe(container, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            }
        }

        onAiComplete() {
            const wasGenerating = this.aiState === 'generating';
            this.aiState = 'completed';
            if (wasGenerating) {
                this.sendCompletionNotification();
            }
            this.updateTabName(true);
        }

        sendCompletionNotification() {
            const tabSettings = this.settings.tabSettings || {};
            if (tabSettings.notificationSound) {
                void this.playNotificationSound(tabSettings.notificationVolume || 0.5);
            }
        }

        ensureNotificationAudioUnlock() {
            if (this.notificationUnlockHandler) return;
            this.notificationUnlockHandler = () => {
                void this.unlockNotificationAudio().then((unlocked) => {
                    if (unlocked && this.pendingNotificationTone) {
                        this.pendingNotificationTone = false;
                        void this.playNotificationSound(this.settings.tabSettings?.notificationVolume || 0.5);
                    }
                });
            };
            ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
                window.addEventListener(eventName, this.notificationUnlockHandler, { passive: true, capture: true });
            });
        }

        teardownNotificationAudioUnlock() {
            if (!this.notificationUnlockHandler) return;
            ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
                window.removeEventListener(eventName, this.notificationUnlockHandler, { capture: true });
            });
            this.notificationUnlockHandler = null;
        }

        getNotificationAudioContext() {
            if (this.notificationAudioContext) return this.notificationAudioContext;
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            try {
                this.notificationAudioContext = new AudioCtx();
                return this.notificationAudioContext;
            } catch (e) {
                console.warn('[ChatGPT Helper] Failed to create AudioContext:', e);
                return null;
            }
        }

        async unlockNotificationAudio() {
            const ctx = this.getNotificationAudioContext();
            if (!ctx) return false;

            try {
                if (ctx.state === 'suspended') {
                    await ctx.resume();
                }
                const gain = ctx.createGain();
                gain.gain.value = 0.0001;
                gain.connect(ctx.destination);
                const osc = ctx.createOscillator();
                const now = ctx.currentTime;
                osc.type = 'sine';
                osc.frequency.value = 440;
                osc.connect(gain);
                osc.start(now);
                osc.stop(now + 0.01);

                this.notificationAudioUnlocked = ctx.state === 'running';
                if (this.notificationAudioUnlocked) {
                    this.teardownNotificationAudioUnlock();
                }
                return this.notificationAudioUnlocked;
            } catch (e) {
                console.warn('[ChatGPT Helper] Failed to unlock notification sound:', e);
                return false;
            }
        }

        async playNotificationSound(volume = 0.5) {
            const clampedVolume = Math.max(0.1, Math.min(1.0, Number(volume) || 0.5));
            this.ensureNotificationAudioUnlock();

            const ctx = this.getNotificationAudioContext();
            if (!ctx) {
                this.pendingNotificationTone = true;
                return false;
            }

            const unlocked = await this.unlockNotificationAudio();
            if (!unlocked) {
                this.pendingNotificationTone = true;
                return false;
            }

            try {
                const now = ctx.currentTime + 0.01;
                const master = ctx.createGain();
                master.gain.setValueAtTime(0.0001, now);
                master.gain.exponentialRampToValueAtTime(Math.max(0.02, clampedVolume * 0.08), now + 0.01);
                master.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
                master.connect(ctx.destination);

                const first = ctx.createOscillator();
                first.type = 'sine';
                first.frequency.setValueAtTime(880, now);
                first.connect(master);
                first.start(now);
                first.stop(now + 0.11);

                const second = ctx.createOscillator();
                second.type = 'triangle';
                second.frequency.setValueAtTime(1320, now + 0.14);
                second.connect(master);
                second.start(now + 0.14);
                second.stop(now + 0.32);

                this.pendingNotificationTone = false;
                return true;
            } catch (e) {
                console.warn('[ChatGPT Helper] Failed to play notification sound:', e);
                this.pendingNotificationTone = true;
                return false;
            }
        }

        togglePrivacyMode() {
            const tabSettings = this.settings.tabSettings || {};
            tabSettings.privacyMode = !tabSettings.privacyMode;
            this.settings.tabSettings = tabSettings;
            this.updateTabName(true);
            return tabSettings.privacyMode;
        }

        updateTabName(force = false) {
            const tabSettings = this.settings.tabSettings || {};

            // 隐私模式
            if (tabSettings.privacyMode) {
                document.title = tabSettings.privacyTitle || 'ChatGPT';
                return;
            }

            // 获取会话名称
            const sessionName = this.getCleanSessionName(tabSettings);

            const isGenerating = this.isGenerating();
            const statusPrefix = tabSettings.showStatus !== false
                ? (isGenerating ? '\u23f3 ' : '\u2705 ')
                : '';
            const format = tabSettings.titleFormat || '{status}{title}';
            const modelName = format.includes('{model}') && this.adapter.getModelName
                ? this.adapter.getModelName()
                : '';

            let finalTitle = format
                .replace('{status}', statusPrefix)
                .replace('{title}', sessionName || 'ChatGPT')
                .replace('{model}', modelName ? `[${modelName}] ` : '')
                .replace(/\s+/g, ' ')
                .trim();

            if (finalTitle && (force || finalTitle !== document.title)) {
                document.title = finalTitle;
            }
        }

        getCleanSessionName(tabSettings) {
            if (this.adapter.isNewConversation && this.adapter.isNewConversation()) {
                this.lastSessionName = null;
                return null;
            }

            let sessionName = this.adapter.getSessionName ? this.adapter.getSessionName() : null;

            // 检测污染
            const isPolluted = (name) => {
                if (!name) return false;
                if (/^(?:\u23f3|\u2705)\s*/u.test(name)) return true;
                if (/^[⏳✅]/.test(name)) return true;
                if (/\[[\w\s.]+\]/.test(name)) return true;
                if (name === (tabSettings.privacyTitle || 'ChatGPT')) return true;
                return false;
            };

            if (sessionName && !isPolluted(sessionName)) {
                this.lastSessionName = sessionName;
                return sessionName;
            }

            return this.lastSessionName;
        }

        isGenerating() {
            if (this.aiState === 'completed') return false;
            return this.aiState === 'generating' || (this.adapter.isGenerating ? this.adapter.isGenerating() : false);
        }
    }
    Object.assign(H, {
        TabRenameManager
    });
})();
