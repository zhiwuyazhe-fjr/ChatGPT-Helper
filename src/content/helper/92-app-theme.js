// Chrome Extension Content Script - ChatGPT Helper App Theme
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
        ISSUE_URL,
        REPO_URL,
        AUTHOR_GITHUB_URL,
        EXTENSION_VERSION,
        THEME_HOST_ATTRS,
        DEFAULT_THEME_CONFIG,
        DEFAULT_SETTINGS,
        DEFAULT_PROMPTS,
        createElement,
        getExtensionRuntime,
        getExtensionAssetUrl,
        getExtensionManifestMeta,
        openExternalLink,
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
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;


    if (!ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Theme module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        getThemeConfig() {
            if (!this.settings.themeConfig || typeof this.settings.themeConfig !== 'object') {
                this.settings.themeConfig = normalizeThemeConfig(null, this.settings.themeMode);
            }
            return this.settings.themeConfig;
        },

        updateThemeButtons() {
            const isDark = this.currentEffectiveTheme === 'dark';
            const quickThemeBtn = document.getElementById('quick-btn-theme');
            if (quickThemeBtn) {
                setButtonIcon(quickThemeBtn, isDark ? 'moon' : 'sun', {
                    size: 18,
                    className: 'chatgpt-helper-quick-btn-icon'
                });
            }
            const headerThemeBtn = document.getElementById('chatgpt-helper-header-theme-btn');
            if (headerThemeBtn) {
                setButtonIcon(headerThemeBtn, isDark ? 'sun' : 'moon', { size: 15 });
            }
        },

        syncHelperThemeMode(mode) {
            const normalizedMode = mode === 'dark' ? 'dark' : 'light';
            document.body.dataset.ghMode = normalizedMode;
            document.body.setAttribute('data-gh-mode', normalizedMode);
            document.documentElement.setAttribute('data-gh-mode', normalizedMode);
            this.currentEffectiveTheme = normalizedMode;
            this.updateThemeButtons();
        },

        getSystemPreferredTheme() {
            try {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'dark';
                }
            } catch (e) {
                // ignore
            }
            return 'light';
        },

        stopSystemThemeListener() {
            if (!this.systemThemeMediaQuery || !this.systemThemeListener) return;
            try {
                if (typeof this.systemThemeMediaQuery.removeEventListener === 'function') {
                    this.systemThemeMediaQuery.removeEventListener('change', this.systemThemeListener);
                } else if (typeof this.systemThemeMediaQuery.removeListener === 'function') {
                    this.systemThemeMediaQuery.removeListener(this.systemThemeListener);
                }
            } catch (e) {
                // ignore
            }
            this.systemThemeMediaQuery = null;
            this.systemThemeListener = null;
        },

        startSystemThemeListener() {
            this.stopSystemThemeListener();
            if (!window.matchMedia) return;
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = () => {
                const cfg = this.getThemeConfig();
                if (cfg.appearanceMode !== 'system') return;
                const targetTheme = mediaQuery.matches ? 'dark' : 'light';
                void this.applyEffectiveTheme(targetTheme, {
                    preferNative: false,
                    persist: false,
                    fromSystem: true
                });
            };
            try {
                if (typeof mediaQuery.addEventListener === 'function') {
                    mediaQuery.addEventListener('change', handler);
                } else if (typeof mediaQuery.addListener === 'function') {
                    mediaQuery.addListener(handler);
                }
            } catch (e) {
                // ignore
            }
            this.systemThemeMediaQuery = mediaQuery;
            this.systemThemeListener = handler;
        },

        detectEffectiveThemeFromDom() {
            const bodyClass = document.body.className;
            const htmlClass = document.documentElement.className;
            const bodyStyle = window.getComputedStyle(document.body);
            const hasDarkClass = /\bdark\b/i.test(bodyClass) ||
                /\bdark-theme\b/i.test(bodyClass) ||
                /\bdark\b/i.test(htmlClass) ||
                /\bdark-theme\b/i.test(htmlClass);
            const hasLightClass = /\blight\b/i.test(bodyClass) ||
                /\blight-theme\b/i.test(bodyClass) ||
                /\blight\b/i.test(htmlClass) ||
                /\blight-theme\b/i.test(htmlClass);

            if (hasDarkClass) return 'dark';
            if (hasLightClass) return 'light';

            const dataTheme = document.body.dataset.theme ||
                document.documentElement.dataset.theme ||
                document.documentElement.getAttribute('data-theme');
            if (dataTheme === 'dark') return 'dark';
            if (dataTheme === 'light') return 'light';

            const inlineColorScheme = document.body.style.colorScheme;
            const computedColorScheme = bodyStyle.colorScheme;
            const colorScheme = inlineColorScheme || computedColorScheme;
            if (colorScheme === 'dark') return 'dark';
            if (colorScheme === 'light') return 'light';

            const bgColor = bodyStyle.backgroundColor || '';
            const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1], 10);
                const g = parseInt(rgbMatch[2], 10);
                const b = parseInt(rgbMatch[3], 10);
                const brightness = (r + g + b) / 3;
                if (brightness < 128) return 'dark';
            }
            return 'light';
        },

        findNativeThemeToggleButton() {
            const helperPanel = document.getElementById('chatgpt-helper-panel');
            const isInHelperPanel = (btn) => {
                if (!btn) return false;
                if (helperPanel && helperPanel.contains(btn)) return true;
                let element = btn;
                while (element && element !== document.body) {
                    if (element.id && element.id.includes('chatgpt-helper')) return true;
                    if (typeof element.className === 'string' && element.className.includes('chatgpt-helper')) return true;
                    element = element.parentElement;
                }
                return false;
            };

            const selectors = [
                'button[aria-label*="theme" i]',
                'button[data-testid*="theme" i]',
                '[role="button"][aria-label*="theme" i]'
            ];

            for (const selector of selectors) {
                const candidates = Array.from(document.querySelectorAll(selector));
                for (const candidate of candidates) {
                    const btn = candidate.closest('button') || candidate;
                    if (!btn || btn.tagName !== 'BUTTON' || isInHelperPanel(btn)) continue;
                    const rect = btn.getBoundingClientRect();
                    if (rect.width <= 0 || rect.height <= 0) continue;
                    return btn;
                }
            }

            return null;
        },

        async tryToggleNativeTheme(targetTheme) {
            const currentTheme = this.detectEffectiveThemeFromDom();
            if (currentTheme === targetTheme) return true;

            const btn = this.findNativeThemeToggleButton();
            if (!btn) return false;

            try {
                btn.click();
            } catch (e) {
                try {
                    btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                } catch (e2) {
                    return false;
                }
            }

            for (let attempt = 0; attempt < 8; attempt++) {
                await new Promise(resolve => setTimeout(resolve, 150));
                if (this.detectEffectiveThemeFromDom() === targetTheme) {
                    return true;
                }
            }
            return false;
        },

        directApplyPageTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark', 'dark-theme');
                document.documentElement.classList.add('dark', 'dark-theme');
                document.body.classList.remove('light', 'light-theme');
                document.documentElement.classList.remove('light', 'light-theme');
                document.body.style.colorScheme = 'dark';
                document.documentElement.style.colorScheme = 'dark';
                document.body.dataset.theme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
                document.body.setAttribute('data-mode', 'dark');
                document.documentElement.setAttribute('data-mode', 'dark');
            } else {
                document.body.classList.remove('dark', 'dark-theme');
                document.documentElement.classList.remove('dark', 'dark-theme');
                document.body.classList.add('light', 'light-theme');
                document.documentElement.classList.add('light', 'light-theme');
                document.body.style.colorScheme = 'light';
                document.documentElement.style.colorScheme = 'light';
                document.body.dataset.theme = 'light';
                document.documentElement.setAttribute('data-theme', 'light');
                document.body.setAttribute('data-mode', 'light');
                document.documentElement.setAttribute('data-mode', 'light');
            }

            try {
                localStorage.setItem('theme', theme);
            } catch (e) {
                // ignore
            }

            this.syncHelperThemeMode(theme);
            window.dispatchEvent(new CustomEvent('themechange', { detail: { mode: theme } }));
            document.dispatchEvent(new CustomEvent('themechange', { detail: { mode: theme } }));
            try {
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'theme',
                    newValue: theme,
                    oldValue: null
                }));
            } catch (e) {
                // ignore
            }
        },

        async applyEffectiveTheme(theme, options = {}) {
            const opts = {
                preferNative: true,
                persist: false,
                fromSystem: false,
                ...options
            };

            const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
            let applied = false;
            if (opts.preferNative) {
                applied = await this.tryToggleNativeTheme(normalizedTheme);
            }

            if (!applied) {
                this.directApplyPageTheme(normalizedTheme);
            } else {
                this.syncHelperThemeMode(this.detectEffectiveThemeFromDom());
            }

            this.settings.themeMode = normalizedTheme;
            if (opts.persist) {
                this.saveSettings();
            }

            this.updateThemeVisualState();
            if (this.themeModalRefs) {
                this.syncThemeModalState();
            }
            return normalizedTheme;
        },

        async applyAppearanceMode(mode, options = {}) {
            const opts = {
                persist: true,
                showToast: false,
                preferNative: true,
                ...options
            };
            const cfg = this.getThemeConfig();
            const normalizedMode = ['system', 'light', 'dark'].includes(mode) ? mode : 'system';
            cfg.appearanceMode = normalizedMode;
            cfg.updatedAt = new Date().toISOString();

            if (normalizedMode === 'system') {
                this.startSystemThemeListener();
                const systemTheme = this.getSystemPreferredTheme();
                await this.applyEffectiveTheme(systemTheme, {
                    preferNative: false,
                    persist: false,
                    fromSystem: true
                });
            } else {
                this.stopSystemThemeListener();
                await this.applyEffectiveTheme(normalizedMode, {
                    preferNative: opts.preferNative,
                    persist: false
                });
            }

            if (opts.persist) {
                this.saveSettings();
            }

            if (opts.showToast) {
                if (normalizedMode === 'dark') {
                    this.showToast(this.t('themeSwitchedDark'));
                } else if (normalizedMode === 'light') {
                    this.showToast(this.t('themeSwitchedLight'));
                }
            }
        },

        applyThemePresetVariables(presetKey, persist = true) {
            const cfg = this.getThemeConfig();
            const preset = getThemePresetByKey(presetKey);
            const root = document.documentElement;
            if (preset.isOriginal) {
                THEME_PRESET_INLINE_VAR_KEYS.forEach((key) => {
                    root.style.removeProperty(key);
                });
            } else {
                const gradient = `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)`;
                root.style.setProperty('--gh-theme-primary', preset.primary);
                root.style.setProperty('--gh-theme-secondary', preset.secondary);
                root.style.setProperty('--gh-theme-accent', preset.accent);
                root.style.setProperty('--gh-theme-accent-dark', preset.accent);
                root.style.setProperty('--gh-theme-light', preset.light);
                root.style.setProperty('--gh-primary', preset.primary);
                root.style.setProperty('--gh-primary-hover', preset.accent);
                root.style.setProperty('--gh-tag-active-bg', preset.primary);
                root.style.setProperty('--gh-gradient', gradient);
                root.style.setProperty('--gh-header-bg', gradient);
                root.style.setProperty('--gh-theme-surface-light-base', rgbaFromColor(blendRgbColors('#ffffff', preset.light, 0.64), 1));
                root.style.setProperty('--gh-theme-surface-light-accent', rgbaFromColor(blendRgbColors('#ffffff', preset.primary, 0.18), 1));
                root.style.setProperty('--gh-theme-surface-dark-base', rgbaFromColor(blendRgbColors('#202123', preset.primary, 0.06), 1));
                root.style.setProperty('--gh-theme-surface-dark-accent', rgbaFromColor(blendRgbColors('#171717', preset.secondary, 0.04), 1));
                root.style.setProperty('--gh-page-sidebar-bg-light', 'linear-gradient(180deg, rgba(255, 255, 255, 0.360), rgba(248, 250, 252, 0.220))');
                root.style.setProperty('--gh-page-chat-bg-light', 'transparent');
                root.style.setProperty('--gh-page-composer-bg-light', 'linear-gradient(135deg, rgba(255, 255, 255, 0.900), rgba(248, 250, 252, 0.800))');
                root.style.setProperty('--gh-page-sidebar-bg-dark', 'linear-gradient(180deg, rgba(32, 33, 35, 0.320), rgba(23, 23, 23, 0.220))');
                root.style.setProperty('--gh-page-chat-bg-dark', 'transparent');
                root.style.setProperty('--gh-page-composer-bg-dark', 'linear-gradient(135deg, rgba(32, 33, 35, 0.800), rgba(23, 23, 23, 0.720))');
                root.style.setProperty('--gh-page-accent-soft', `color-mix(in srgb, ${preset.primary}, transparent 84%)`);
                root.style.setProperty('--gh-page-accent-soft-dark', `color-mix(in srgb, ${preset.primary}, transparent 88%)`);
                root.style.setProperty('--gh-page-accent-strong', preset.accent);
                root.style.setProperty('--gh-page-link', preset.accent);
                root.style.setProperty('--gh-page-selection', `color-mix(in srgb, ${preset.primary}, transparent 82%)`);
            }

            if (cfg.presetKey !== preset.key) {
                cfg.presetKey = preset.key;
                cfg.updatedAt = new Date().toISOString();
                if (persist) {
                    this.saveSettings();
                }
            }

            if (this.themeModalRefs) {
                this.syncThemeModalState();
            }
        },

        markThemeHostElement(element, attrName) {
            if (!(element instanceof HTMLElement)) return false;
            element.setAttribute(attrName, 'true');
            return true;
        },

        markThemeHostChain(element, attrName, options = {}) {
            if (!(element instanceof HTMLElement)) return false;

            let current = element;
            let depth = 0;
            let marked = false;

            while (current && current !== document.body && current !== document.documentElement && depth < 6) {
                if (options.kind === 'sidebar') {
                    const rect = current.getBoundingClientRect();
                    const isLikelySidebarShell = rect.width >= 140
                        && rect.width <= Math.max(520, Math.floor(window.innerWidth * 0.42))
                        && rect.height >= Math.floor(window.innerHeight * 0.45)
                        && rect.left <= 80;

                    if (!isLikelySidebarShell) {
                        if (depth === 0) {
                            return false;
                        }
                        break;
                    }
                }

                current.setAttribute(attrName, 'true');
                marked = true;
                current = current.parentElement;
                depth += 1;
            }

            return marked;
        },

        clearThemeHostMarks() {
            THEME_HOST_ATTRS.forEach((attrName) => {
                document.querySelectorAll(`[${attrName}="true"]`).forEach((node) => {
                    node.removeAttribute(attrName);
                });
            });
        },

        refreshThemeHostTargets() {
            this.clearThemeHostMarks();

            const collectCandidates = (selector) => {
                try {
                    return Array.from(document.querySelectorAll(selector));
                } catch (error) {
                    return [];
                }
            };
            const getElementClassName = (element) => (
                typeof element.className === 'string'
                    ? element.className
                    : (element.getAttribute && element.getAttribute('class')) || ''
            );
            const looksLikeChatSidebar = (element) => {
                if (!(element instanceof HTMLElement)) return false;
                const rect = element.getBoundingClientRect();
                const maxWidth = Math.max(520, Math.floor(window.innerWidth * 0.42));
                const isLeftRail = rect.left <= 80
                    && rect.width >= 140
                    && rect.width <= maxWidth
                    && rect.height >= Math.floor(window.innerHeight * 0.45);
                if (!isLeftRail) return false;

                const signals = [
                    element.id,
                    getElementClassName(element),
                    element.getAttribute('data-testid'),
                    element.getAttribute('aria-label'),
                    (element.textContent || '').slice(0, 600)
                ].filter(Boolean).join(' ');

                return /sidebar|slideover|Chat history|聊天历史|侧边栏|新聊天|搜索聊天|项目|最近|New chat|Search chats|Projects|Recent|ChatGPT|Codex/i.test(signals);
            };
            const resolveSidebarShell = (element) => {
                let current = element;
                let best = null;
                let depth = 0;
                while (current && current !== document.body && current !== document.documentElement && depth < 8) {
                    if (looksLikeChatSidebar(current)) {
                        best = current;
                    } else if (best) {
                        break;
                    }
                    current = current.parentElement;
                    depth += 1;
                }
                return best || element;
            };
            const sidebarSelectors = [
                '#stage-slideover-sidebar',
                '[data-testid="sidebar"]',
                '[data-testid*="sidebar"]',
                '[aria-label*="Chat history"]',
                '[aria-label*="聊天历史"]',
                '[aria-label*="Sidebar"]',
                '[aria-label*="侧边栏"]',
                '[id*="sidebar"]',
                '[class*="sidebar"]',
                '[class*="Sidebar"]'
            ];
            const sidebarCandidates = [
                this.adapter?.getSidebarContainer ? this.adapter.getSidebarContainer() : null,
                ...sidebarSelectors.flatMap(collectCandidates),
                ...collectCandidates('aside, nav').filter(looksLikeChatSidebar)
            ];

            let sidebarHost = null;
            for (const candidate of sidebarCandidates) {
                if (!looksLikeChatSidebar(candidate)) continue;
                if (this.markThemeHostChain(candidate, 'data-gh-theme-host-sidebar', { kind: 'sidebar' })) {
                    sidebarHost = candidate;
                    break;
                }
            }
            if (sidebarHost && sidebarHost.closest) {
                const sidebarShell = resolveSidebarShell(sidebarHost);
                const sidebarWrapper = sidebarHost.closest('#stage-slideover-sidebar, [data-testid*="sidebar"], [id*="sidebar"], [class*="sidebar"], [class*="Sidebar"], aside, nav');
                this.markThemeHostElement(sidebarShell, 'data-gh-theme-host-sidebar-shell');
                this.markThemeHostChain(sidebarWrapper, 'data-gh-theme-host-sidebar', { kind: 'sidebar' });
                this.markThemeHostElement(sidebarWrapper, 'data-gh-theme-host-sidebar');
                this.markThemeHostElement(sidebarShell, 'data-gh-theme-host-sidebar');
                this.markThemeHostElement(sidebarHost.firstElementChild, 'data-gh-theme-host-sidebar');
                this.markThemeHostElement(sidebarHost.firstElementChild && sidebarHost.firstElementChild.firstElementChild, 'data-gh-theme-host-sidebar');
            }

            const mainCandidates = [
                this.adapter?.getChatContainer ? this.adapter.getChatContainer() : null,
                document.querySelector('main'),
                document.querySelector('[role="main"]')
            ];
            let mainHost = null;
            for (const candidate of mainCandidates) {
                if (this.markThemeHostElement(candidate, 'data-gh-theme-host-main')) {
                    mainHost = candidate;
                    break;
                }
            }

            const chatListSelectors = [
                'main [data-testid*="conversation"]',
                'main [class*="conversation"]',
                'main [data-message-author-role]',
                '[role="main"] [data-message-author-role]',
                '[role="main"] [class*="overflow-y-auto"]'
            ];
            let chatListHost = null;
            for (const selector of chatListSelectors) {
                const hit = document.querySelector(selector);
                if (!hit) continue;
                const container = hit.closest('[class*="overflow"], [class*="conversation"], section, article, main') || hit;
                if (this.markThemeHostElement(container, 'data-gh-theme-host-chat-list')) {
                    chatListHost = container;
                    break;
                }
            }
            if (!chatListHost && mainHost) {
                this.markThemeHostElement(mainHost, 'data-gh-theme-host-chat-list');
            }

            const composerInput = this.adapter?.textarea
                || document.querySelector('#prompt-textarea')
                || document.querySelector('textarea[placeholder*="Message"]')
                || document.querySelector('textarea[placeholder*="消息"]')
                || document.querySelector('div[contenteditable="true"][role="textbox"]')
                || document.querySelector('div[contenteditable="true"]');
            const findComposerSurface = (input) => {
                if (!(input instanceof HTMLElement)) return null;
                let current = input;
                let depth = 0;
                while (current && current !== document.body && current !== document.documentElement && depth < 8) {
                    const rect = current.getBoundingClientRect();
                    const className = getElementClassName(current);
                    const hasSurfaceSignal = /bg-token|composer|rounded|superellipse|border|shadow/i.test(className)
                        || (current.getAttribute('data-testid') || '').toLowerCase().includes('composer');
                    const hasReasonableSize = rect.width >= 260
                        && rect.height >= 40
                        && rect.height <= Math.max(280, Math.floor(window.innerHeight * 0.30));
                    if (hasSurfaceSignal && hasReasonableSize) {
                        return current;
                    }
                    current = current.parentElement;
                    depth += 1;
                }
                return input.closest('[data-testid*="composer"]')
                    || input.closest('[class*="composer"]')
                    || input.parentElement;
            };
            const composerHost = composerInput
                ? (composerInput.closest('form')
                    || composerInput.closest('[data-testid*="composer"]')
                    || composerInput.closest('[class*="composer"]')
                    || composerInput.closest('[class*="footer"]')
                    || composerInput.parentElement)
                : (document.querySelector('[data-testid*="composer"]')
                    || document.querySelector('main form')
                    || document.querySelector('[role="main"] form'));
            const composerSurface = composerInput
                ? findComposerSurface(composerInput)
                : (document.querySelector('[data-testid*="composer"] [class*="bg-token"]')
                    || document.querySelector('[data-testid*="composer"] [class*="rounded"]')
                    || composerHost);
            this.markThemeHostElement(composerHost, 'data-gh-theme-host-composer');
            this.markThemeHostElement(composerSurface || composerHost, 'data-gh-theme-host-composer-surface');
        },

        queueThemeHostRefresh() {
            if (this.themeHostRefreshQueued) return;
            this.themeHostRefreshQueued = true;
            const flush = () => {
                this.themeHostRefreshQueued = false;
                this.refreshThemeHostTargets();
            };
            if (typeof requestAnimationFrame === 'function') {
                requestAnimationFrame(flush);
            } else {
                setTimeout(flush, 16);
            }
        },

        ensureThemeRuntimeStyle() {
            if (this.themeRuntimeStyleReady) return;
            let style = document.getElementById('chatgpt-helper-theme-runtime-style');
            if (!style) {
                style = document.createElement('style');
                style.id = 'chatgpt-helper-theme-runtime-style';
                style.textContent = `
                :root {
                    --gh-bg-image: none;
                    --gh-bg-blur: 5px;
                    --gh-sidebar-enhance-alpha: 0.2;
                    --gh-bg-overlay-light: rgba(12, 18, 32, 0.18);
                    --gh-bg-overlay-dark: rgba(23, 23, 23, 0.48);
                    --gh-panel-blur: 14px;
                    --gh-composer-blur: 16px;
                    --gh-page-sidebar-bg-light: #f9f9f9;
                    --gh-page-chat-bg-light: transparent;
                    --gh-page-composer-bg-light: linear-gradient(135deg, rgba(255, 255, 255, 0.900), rgba(248, 250, 252, 0.800));
                    --gh-page-sidebar-bg-dark: linear-gradient(180deg, rgba(32, 33, 35, 0.320), rgba(23, 23, 23, 0.220));
                    --gh-page-chat-bg-dark: transparent;
                    --gh-page-composer-bg-dark: linear-gradient(135deg, rgba(32, 33, 35, 0.800), rgba(23, 23, 23, 0.720));
                    --gh-page-accent-soft: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 84%);
                    --gh-page-accent-soft-dark: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 88%);
                    --gh-page-accent-strong: var(--gh-theme-accent, #2563eb);
                    --gh-page-link: var(--gh-theme-accent, #2563eb);
                    --gh-page-selection: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 82%);
                    --gh-right-overlay: #f9f9f9;
                    --gh-panel-card-bg: rgba(255,255,255,0.54);
                    --gh-panel-card-border: rgba(255,255,255,0.46);
                    --gh-sidebar-button-bg: rgba(255,255,255,0.42);
                    --gh-msg-user-bg: color-mix(in srgb, #ffffff, transparent 24%);
                    --gh-msg-assistant-bg: color-mix(in srgb, #edf4ff, transparent 30%);
                    --gh-msg-border: rgba(255,255,255,0.42);
                    --gh-msg-shadow: 0 14px 32px rgba(15, 23, 42, 0.10);
                    --gh-msg-blur: 18px;
                    --gh-composer-shadow: 0 10px 24px rgba(15, 23, 42, 0.10);
                }

                #chatgpt-helper-theme-bg-layer {
                    position: fixed;
                    inset: -8vh -8vw;
                    z-index: 0;
                    pointer-events: none;
                    display: none;
                    background-image: none;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    filter: blur(var(--gh-bg-blur));
                }

                #chatgpt-helper-theme-bg-layer::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: var(--gh-bg-overlay-light);
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-theme-bg-layer {
                    display: block;
                    background-image: var(--gh-bg-image);
                    filter: blur(var(--gh-bg-blur)) brightness(0.7) saturate(0.88);
                }

                :root[data-gh-bg-enabled="true"],
                :root[data-gh-bg-enabled="true"] body,
                :root[data-gh-bg-enabled="true"] #__next {
                    background-color: transparent !important;
                }

                :root[data-gh-mode="dark"] #chatgpt-helper-theme-bg-layer {
                    filter: blur(var(--gh-bg-blur)) brightness(0.5) saturate(0.82);
                }

                :root[data-gh-mode="dark"] #chatgpt-helper-theme-bg-layer::after {
                    background: var(--gh-bg-overlay-dark);
                }

                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-bg-enabled="true"] aside[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="true"] aside[aria-label*="聊天历史"] {
                    --sidebar-mask-bg: transparent;
                    --sidebar-surface-primary: transparent;
                    --sidebar-surface-secondary: transparent;
                    --sidebar-surface-tertiary: transparent;
                    --bg-elevated-secondary: transparent;
                    background: var(--gh-page-sidebar-bg-light) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.04);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.04);
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    box-shadow: inset 1px 0 0 var(--gh-panel-line);
                }

                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar > div,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] > div,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] > div,
                :root[data-gh-bg-enabled="true"] nav[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="true"] nav[aria-label*="聊天历史"],
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-left,
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-center,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] nav,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] aside {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-sidebar"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-bg"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div > div,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div > div {
                    background: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="sticky"][class*="bottom-0"] button {
                    background: var(--gh-sidebar-button-bg) !important;
                    backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px));
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px));
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] :is(a, button):hover {
                    background: var(--gh-sidebar-button-bg) !important;
                }

                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-main="true"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-chat-list="true"],
                :root[data-gh-bg-enabled="true"] main,
                :root[data-gh-bg-enabled="true"] [role="main"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] header,
                :root[data-gh-bg-enabled="true"] [role="banner"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"] header::before,
                :root[data-gh-bg-enabled="true"] header::after,
                :root[data-gh-bg-enabled="true"] [role="banner"]::before,
                :root[data-gh-bg-enabled="true"] [role="banner"]::after,
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"]::before,
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"]::after,
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"]::before,
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"]::after,
                :root[data-gh-bg-enabled="true"] header > div,
                :root[data-gh-bg-enabled="true"] header > div > div,
                :root[data-gh-bg-enabled="true"] [role="banner"] > div,
                :root[data-gh-bg-enabled="true"] [role="banner"] > div > div,
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] > div,
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] > div > div,
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] > div,
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] > div > div,
                :root[data-gh-bg-enabled="true"] header [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] header [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] header [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] header [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] header [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [role="banner"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [role="banner"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] [role="banner"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] [role="banner"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] [role="banner"] [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] [data-testid*="page-header"] [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] [data-element-id*="page-header"] [class*="bg-token-bg-elevated"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-composer="true"],
                :root[data-gh-bg-enabled="true"] main form,
                :root[data-gh-bg-enabled="true"] [role="main"] form {
                    background: transparent !important;
                    background-color: transparent !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    border-radius: 0;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-bg-enabled="true"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-light) !important;
                    backdrop-filter: blur(var(--gh-composer-blur));
                    -webkit-backdrop-filter: blur(var(--gh-composer-blur));
                    border-radius: 28px !important;
                    box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow);
                }

                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"],
                :root[data-gh-bg-enabled="true"] main [class*="top-shadow"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="top-shadow"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"]::before,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"]::before,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"]::after,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"]::after,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] > div,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] > div > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] > div > div,
                :root[data-gh-bg-enabled="true"] main [class*="top-shadow"]::before,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="top-shadow"]::before,
                :root[data-gh-bg-enabled="true"] main [class*="top-shadow"]::after,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="top-shadow"]::after,
                :root[data-gh-bg-enabled="true"] main [class*="top-shadow"] > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="top-shadow"] > div,
                :root[data-gh-bg-enabled="true"] main [class*="top-shadow"] > div > div,
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="top-shadow"] > div > div,
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][class*="top-0"] [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][class*="top-0"] [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-primary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] main [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sticky"][style*="top: 0"] [class*="bg-token-bg-elevated"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] aside[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] aside[aria-label*="聊天历史"] {
                    --sidebar-mask-bg: var(--gh-page-sidebar-bg-dark);
                    --sidebar-surface-primary: var(--gh-page-sidebar-bg-dark);
                    --sidebar-surface-secondary: var(--gh-panel-subtle);
                    --sidebar-surface-tertiary: var(--gh-panel-card);
                    --bg-elevated-secondary: var(--gh-panel-card);
                    background: var(--gh-page-sidebar-bg-dark) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-main="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-chat-list="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] main,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [role="main"] {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] main form,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [role="main"] form {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-dark) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow);
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] [class*="sticky"][class*="bottom-0"] button {
                    background: var(--gh-sidebar-button-bg) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [aria-current="page"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [data-active="true"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [aria-selected="true"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [data-state="active"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [role="option"][aria-selected="true"],
                :root[data-gh-page-theme="true"] nav[aria-label*="Chat history"] [aria-current="page"],
                :root[data-gh-page-theme="true"] nav[aria-label*="聊天历史"] [aria-current="page"],
                :root[data-gh-page-theme="true"] [data-testid="sidebar"] [aria-current="page"] {
                    background: var(--gh-page-accent-soft) !important;
                    color: var(--gh-page-accent-strong) !important;
                }

                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [aria-current="page"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [data-active="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [aria-selected="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [data-state="active"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [role="option"][aria-selected="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] nav[aria-label*="Chat history"] [aria-current="page"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] nav[aria-label*="聊天历史"] [aria-current="page"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [aria-current="page"] {
                    background: var(--gh-page-accent-soft-dark) !important;
                    color: #ffffff !important;
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-main="true"] a,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-chat-list="true"] a,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] a {
                    color: var(--gh-page-link) !important;
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-main="true"] ::selection,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-chat-list="true"] ::selection {
                    background: var(--gh-page-selection);
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] button[type="submit"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] button[data-testid*="send"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] button[class*="send"] {
                    background-color: var(--gh-page-accent-strong) !important;
                    border-color: transparent !important;
                    color: #ffffff !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-content {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar {
                    background: var(--gh-panel-card-bg) !important;
                    backdrop-filter: blur(var(--gh-panel-blur));
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur));
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="true"] .outline-search-input,
                :root[data-gh-bg-enabled="true"] .outline-toolbar-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                    backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px));
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px));
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-item,
                :root[data-gh-bg-enabled="true"] .outline-item.user-query-node,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-empty-state,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-theme-block {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    backdrop-filter: blur(var(--gh-panel-blur));
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur));
                }

                :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] #chatgpt-helper-right .chatgpt-helper-tab-content,
                :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] #chatgpt-helper-right .chatgpt-helper-prompt-item,
                :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] #chatgpt-helper-right .outline-item {
                    background: color-mix(in srgb, var(--gh-panel-card-bg), transparent 6%) !important;
                    backdrop-filter: blur(calc(var(--gh-msg-blur) - 2px));
                    -webkit-backdrop-filter: blur(calc(var(--gh-msg-blur) - 2px));
                    box-shadow: inset 0 0 1px 0 var(--gh-msg-border);
                }

                :root[data-gh-bg-enabled="true"] #thread-bottom-container,
                :root[data-gh-bg-enabled="true"] #thread-bottom,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container > div,
                :root[data-gh-bg-enabled="true"] #thread-bottom > div,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container > div > div,
                :root[data-gh-bg-enabled="true"] main [class*="composer-parent"],
                :root[data-gh-bg-enabled="true"] main [class*="sharp-edge-bottom-shadow"],
                :root[data-gh-bg-enabled="true"] main [class*="sharp-edge-top-shadow"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="composer-parent"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sharp-edge-bottom-shadow"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="sharp-edge-top-shadow"] {
                    background: transparent !important;
                    box-shadow: none !important;
                    background-image: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"] #thread-bottom-container::before,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container::after,
                :root[data-gh-bg-enabled="true"] #thread-bottom::before,
                :root[data-gh-bg-enabled="true"] #thread-bottom::after,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container > div::before,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container > div::after,
                :root[data-gh-bg-enabled="true"] #thread-bottom-container [class*="text-token-text-secondary"],
                :root[data-gh-bg-enabled="true"] #thread-bottom-container [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="true"] #thread-bottom-container [class*="bg-token-bg-secondary"],
                :root[data-gh-bg-enabled="true"] #thread-bottom-container [class*="bg-token-bg-tertiary"],
                :root[data-gh-bg-enabled="true"] #thread-bottom-container [class*="bg-token-bg-elevated"],
                :root[data-gh-bg-enabled="true"] [role="main"] [class*="text-token-text-secondary"][class*="text-xs"] {
                    background: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"] #thread-bottom-container [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"] #thread-bottom [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"] main [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"] [role="main"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-light) !important;
                    background-image: var(--gh-page-composer-bg-light) !important;
                    backdrop-filter: blur(var(--gh-composer-blur)) saturate(1.04) !important;
                    -webkit-backdrop-filter: blur(var(--gh-composer-blur)) saturate(1.04) !important;
                    border-radius: 28px !important;
                    box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #thread-bottom-container [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #thread-bottom [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] main [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] [role="main"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-dark) !important;
                    background-image: var(--gh-page-composer-bg-dark) !important;
                }

                @supports selector(:has(*)) {
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]) {
                        background: var(--gh-msg-user-bg) !important;
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 8px 10px !important;
                        border-radius: 24px !important;
                        background-clip: padding-box;
                    }

                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] > div:has(> .markdown),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] > div:has(> .markdown),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] > div > div:has(> .markdown),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] > div > div:has(> .markdown),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] > div > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] > div > div:has(> [class*="markdown"]) {
                        background: var(--gh-msg-assistant-bg) !important;
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 14px 18px !important;
                        border-radius: 28px !important;
                        background-clip: padding-box;
                    }

                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] [class*="markdown"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] [class*="markdown"] {
                        background: transparent !important;
                        background-image: none !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        box-shadow: none !important;
                    }

                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] [class*="markdown"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] [class*="markdown"] {
                        padding: 0 !important;
                        border-radius: 0 !important;
                        overflow: visible !important;
                    }
                }

                @supports not selector(:has(*)) {
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] div[class*="rounded-2xl"] {
                        background: var(--gh-msg-user-bg) !important;
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 10px 12px !important;
                        background-clip: padding-box;
                        border-radius: 24px !important;
                        overflow: hidden;
                    }

                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] main [data-message-author-role="assistant"] [class*="markdown"],
                    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="assistant"] [class*="markdown"] {
                        background: var(--gh-msg-assistant-bg) !important;
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 14px 18px !important;
                        border-radius: 28px !important;
                        background-clip: padding-box;
                        overflow: hidden;
                    }
                }

                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) code:not(pre code),
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) code:not(pre code),
                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) kbd,
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) kbd {
                    display: inline-block;
                    padding: 0.14em 0.48em !important;
                    border-radius: 10px !important;
                    background: color-mix(in srgb, var(--gh-msg-assistant-bg), transparent 24%) !important;
                    border: 1px solid color-mix(in srgb, var(--gh-msg-border), transparent 12%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-msg-border), transparent 28%);
                    backdrop-filter: blur(calc(var(--gh-msg-blur) - 8px));
                    -webkit-backdrop-filter: blur(calc(var(--gh-msg-blur) - 8px));
                    color: inherit !important;
                }

                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) :is(a, button, span, div)[class*="rounded-full"],
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(.markdown, [class*="markdown"]) :is(a, button, span, div)[class*="rounded-full"],
                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(a, button)[data-testid*="source" i],
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(a, button)[data-testid*="source" i],
                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(a, button)[aria-label*="source" i],
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(a, button)[aria-label*="source" i],
                :root[data-gh-bg-enabled="true"] main [data-message-author-role="assistant"] :is(a, button)[aria-label*="来源"],
                :root[data-gh-bg-enabled="true"] [role="main"] [data-message-author-role="assistant"] :is(a, button)[aria-label*="来源"] {
                    background: color-mix(in srgb, var(--gh-msg-assistant-bg), transparent 18%) !important;
                    border-color: color-mix(in srgb, var(--gh-msg-border), transparent 10%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-msg-border), transparent 24%), 0 6px 18px rgba(15, 23, 42, 0.08) !important;
                    backdrop-filter: blur(calc(var(--gh-msg-blur) - 7px));
                    -webkit-backdrop-filter: blur(calc(var(--gh-msg-blur) - 7px));
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] aside[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] aside[aria-label*="聊天历史"] {
                    --sidebar-mask-bg: var(--gh-page-sidebar-bg-light);
                    --sidebar-surface-primary: var(--gh-page-sidebar-bg-light);
                    --sidebar-surface-secondary: var(--gh-panel-subtle);
                    --sidebar-surface-tertiary: var(--gh-panel-card);
                    --bg-elevated-secondary: var(--gh-panel-card);
                    background: var(--gh-page-sidebar-bg-light) !important;
                    box-shadow: inset -1px 0 0 var(--gh-panel-line);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="聊天历史"] {
                    --sidebar-mask-bg: var(--gh-page-sidebar-bg-dark);
                    --sidebar-surface-primary: var(--gh-page-sidebar-bg-dark);
                    --sidebar-surface-secondary: var(--gh-panel-subtle);
                    --sidebar-surface-tertiary: var(--gh-panel-card);
                    --bg-elevated-secondary: var(--gh-panel-card);
                    background: var(--gh-page-sidebar-bg-dark) !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-center,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-main="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-chat-list="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #chatgpt-helper-center,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-main="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-chat-list="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] main,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [role="main"] {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-composer="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main form,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] form {
                    background: transparent !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    box-shadow: inset 1px 0 0 var(--gh-panel-line);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-content {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .outline-fixed-toolbar {
                    background: var(--gh-panel-surface) !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .outline-search-input,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .outline-toolbar-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-prompt-item,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .outline-item.user-query-node,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-empty-state,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-theme-block,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-right .chatgpt-helper-tab-content,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-right .outline-item {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-card-border), transparent 18%);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] nav[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] nav[aria-label*="聊天历史"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] nav,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] aside {
                    background: transparent !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-sidebar"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] {
                    background: var(--gh-page-sidebar-bg-light) !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div > div {
                    background: var(--gh-page-sidebar-bg-light) !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-sidebar"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-main-surface"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-(--sidebar-mask-bg"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::before,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"]::after,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"] > div > div,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] > div > div {
                    background: var(--gh-page-sidebar-bg-dark) !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="sticky"][class*="bottom-0"] button {
                    background: var(--gh-sidebar-button-bg) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-light) !important;
                    border-radius: 28px !important;
                    box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-dark) !important;
                }

                @supports selector(:has(*)) {
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]) {
                        background: var(--gh-msg-user-bg) !important;
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 8px 10px !important;
                        border-radius: 24px !important;
                        background-clip: padding-box;
                    }

                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] > div:has(> .markdown),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] > div:has(> .markdown),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] > div > div:has(> .markdown),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] > div > div:has(> .markdown),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] > div > div:has(> [class*="markdown"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] > div > div:has(> [class*="markdown"]) {
                        background: transparent !important;
                        background-image: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        border-radius: 0 !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                    }

                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]),
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div > div:has(> div[class*="rounded-2xl"]) {
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                    }

                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] [class*="markdown"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] [class*="markdown"] {
                        background: transparent !important;
                        background-image: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        border-radius: 0 !important;
                        overflow: visible !important;
                    }
                }

                @supports not selector(:has(*)) {
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="user"] div[class*="rounded-2xl"] {
                        background: var(--gh-msg-user-bg) !important;
                        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
                        padding: 10px 12px !important;
                        background-clip: padding-box;
                        border-radius: 24px !important;
                        overflow: hidden;
                    }

                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] .markdown,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] main [data-message-author-role="assistant"] [class*="markdown"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] [role="main"] [data-message-author-role="assistant"] [class*="markdown"] {
                        background: transparent !important;
                        background-image: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        border-radius: 0 !important;
                        overflow: visible !important;
                    }

                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] > div > div,
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] main [data-message-author-role="user"] div[class*="rounded-2xl"],
                    :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-msg-glass="true"] [role="main"] [data-message-author-role="user"] div[class*="rounded-2xl"] {
                        backdrop-filter: blur(var(--gh-msg-blur));
                        -webkit-backdrop-filter: blur(var(--gh-msg-blur));
                    }
                }

                :root[data-gh-page-theme="true"] #stage-slideover-sidebar,
                :root[data-gh-page-theme="true"] [data-testid="sidebar"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-page-theme="true"] aside[aria-label*="Chat history"],
                :root[data-gh-page-theme="true"] aside[aria-label*="聊天历史"] {
                    --sidebar-mask-bg: transparent;
                    --sidebar-surface-primary: transparent;
                    --sidebar-surface-secondary: transparent;
                    --sidebar-surface-tertiary: transparent;
                    --bg-elevated-secondary: transparent;
                    background: var(--gh-page-sidebar-bg-light) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                :root[data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar,
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="Chat history"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="聊天历史"] {
                    background: var(--gh-page-sidebar-bg-dark) !important;
                }

                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] #stage-slideover-sidebar,
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] [data-testid="sidebar"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] aside[aria-label*="Chat history"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] aside[aria-label*="聊天历史"] {
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.04);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.04);
                }

                :root[data-gh-page-theme="true"] #stage-slideover-sidebar > div,
                :root[data-gh-page-theme="true"] [data-testid="sidebar"] > div,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] > div,
                :root[data-gh-page-theme="true"] nav[aria-label*="Chat history"],
                :root[data-gh-page-theme="true"] nav[aria-label*="聊天历史"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] nav,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] aside,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-sidebar"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-bg"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-token-main-surface"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="bg-(--sidebar-mask-bg"] {
                    background: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="top-0"],
                :root[data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"],
                :root[data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="top-0"],
                :root[data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="top-0"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar="true"] [class*="sticky"][class*="bottom-0"] {
                    background: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                }

                :root[data-gh-page-theme="true"] #stage-slideover-sidebar [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-page-theme="true"] [data-testid="sidebar"] [class*="sticky"][class*="bottom-0"] button,
                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] [class*="sticky"][class*="bottom-0"] button {
                    background: var(--gh-sidebar-button-bg) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] :is(a, button):hover {
                    background: var(--gh-sidebar-button-bg) !important;
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-main="true"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-chat-list="true"],
                :root[data-gh-page-theme="true"] #chatgpt-helper-center,
                :root[data-gh-page-theme="true"] main,
                :root[data-gh-page-theme="true"] [role="main"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-page-theme="true"] header,
                :root[data-gh-bg-enabled="true"][data-gh-page-theme="true"] [role="banner"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"],
                :root[data-gh-page-theme="true"] main form,
                :root[data-gh-page-theme="true"] [role="main"] form {
                    background: transparent !important;
                    background-color: transparent !important;
                    background-image: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                :root[data-gh-page-theme="true"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-page-theme="true"] [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"] #thread-bottom-container [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"] #thread-bottom [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"] main [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"] [role="main"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-light) !important;
                    background-image: var(--gh-page-composer-bg-light) !important;
                    border-radius: 28px !important;
                    box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow) !important;
                }

                :root[data-gh-page-theme="true"][data-gh-mode="dark"] form[class*="group/composer"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token-bg-primary"][class*="corner-superellipse"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer="true"] div[class*="bg-token"][class*="rounded"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] #thread-bottom-container [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] #thread-bottom [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] main [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-mode="dark"] [role="main"] [data-gh-theme-host-composer-surface="true"] {
                    background: var(--gh-page-composer-bg-dark) !important;
                    background-image: var(--gh-page-composer-bg-dark) !important;
                }

                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] #thread-bottom-container [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] #thread-bottom [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] main [data-gh-theme-host-composer-surface="true"],
                :root[data-gh-page-theme="true"][data-gh-bg-enabled="true"] [role="main"] [data-gh-theme-host-composer-surface="true"] {
                    backdrop-filter: blur(var(--gh-composer-blur)) saturate(1.04) !important;
                    -webkit-backdrop-filter: blur(var(--gh-composer-blur)) saturate(1.04) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="light"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="light"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="light"] [data-gh-theme-host-sidebar-shell="true"] {
                    box-shadow: inset 0 0 0 9999px rgba(255, 255, 255, var(--gh-sidebar-enhance-alpha));
                }

                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar="true"] {
                    box-shadow: none;
                }

                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] nav[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] nav[aria-label*="聊天历史"],
                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"] {
                    box-shadow: none;
                }
                `;
                document.head.appendChild(style);
            }
            this.themeRuntimeStyleReady = true;
        },

        ensureThemeBackgroundLayer() {
            let layer = document.getElementById('chatgpt-helper-theme-bg-layer');
            if (!layer) {
                layer = document.createElement('div');
                layer.id = 'chatgpt-helper-theme-bg-layer';
                layer.setAttribute('aria-hidden', 'true');
                document.body.prepend(layer);
            }
            return layer;
        },

        sanitizeCssUrl(url) {
            if (!url) return 'none';
            const escaped = String(url).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            return `url("${escaped}")`;
        },

        revokeThemeBackgroundObjectUrl() {
            if (!this.themeBackgroundObjectUrl) return;
            try {
                URL.revokeObjectURL(this.themeBackgroundObjectUrl);
            } catch (e) {
                // ignore
            }
            this.themeBackgroundObjectUrl = null;
            this.themeBackgroundObjectAssetId = null;
        },

        async resolveThemeBackgroundObjectUrl(assetId) {
            if (!assetId) {
                this.revokeThemeBackgroundObjectUrl();
                return null;
            }
            if (this.themeBackgroundObjectAssetId === assetId && this.themeBackgroundObjectUrl) {
                return this.themeBackgroundObjectUrl;
            }
            const row = await this.themeAssetRepository.getAsset(assetId);
            if (!row || !row.blob) {
                this.revokeThemeBackgroundObjectUrl();
                return null;
            }
            this.revokeThemeBackgroundObjectUrl();
            this.themeBackgroundObjectUrl = URL.createObjectURL(row.blob);
            this.themeBackgroundObjectAssetId = assetId;
            return this.themeBackgroundObjectUrl;
        },

        async refreshThemeBackgroundState() {
            const cfg = this.getThemeConfig();
            if (!cfg.backgroundImageEnabled || !cfg.backgroundAssetId) {
                this.revokeThemeBackgroundObjectUrl();
                this.updateThemeVisualState();
                return;
            }

            const url = await this.resolveThemeBackgroundObjectUrl(cfg.backgroundAssetId);
            if (!url) {
                cfg.backgroundImageEnabled = false;
                cfg.backgroundAssetId = null;
                cfg.updatedAt = new Date().toISOString();
                this.saveSettings();
            }
            this.updateThemeVisualState();
        },

        syncThemeSurfaceVariables(canRenderBackground) {
            const root = document.documentElement;
            const isDark = this.detectEffectiveThemeFromDom() === 'dark';
            const cfg = this.getThemeConfig();
            const preset = getThemePresetByKey(cfg.presetKey);
            const surfaceVars = buildThemeSurfaceVars(preset, {
                isDark,
                canRenderBackground,
                messageIntensity: cfg.messageGlassIntensity,
                panelIntensity: cfg.panelGlassIntensity
            });

            Object.entries(surfaceVars).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        },

        updateThemeVisualState() {
            this.ensureThemeRuntimeStyle();
            const cfg = this.getThemeConfig();
            const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl);
            const root = document.documentElement;
            const pageThemeEnabled = true;
            this.syncHelperThemeMode(this.detectEffectiveThemeFromDom());
            this.refreshThemeHostTargets();
            root.setAttribute('data-gh-theme-active', 'true');
            root.setAttribute('data-gh-theme-preset', cfg.presetKey || DEFAULT_THEME_CONFIG.presetKey);
            root.setAttribute('data-gh-page-theme', pageThemeEnabled ? 'true' : 'false');
            root.setAttribute('data-gh-bg-enabled', canRenderBackground ? 'true' : 'false');
            root.setAttribute('data-gh-msg-glass', cfg.messageGlassEnabled ? 'true' : 'false');
            root.setAttribute('data-gh-sidebar-enhance', cfg.sidebarTextEnhanceEnabled ? 'true' : 'false');
            root.style.setProperty('--gh-bg-image', this.sanitizeCssUrl(this.themeBackgroundObjectUrl));
            root.style.setProperty('--gh-bg-blur', `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`);
            root.style.setProperty('--gh-sidebar-enhance-alpha', (clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100).toFixed(2));
            this.syncThemeSurfaceVariables(canRenderBackground);

            const layer = this.ensureThemeBackgroundLayer();
            layer.style.display = canRenderBackground ? 'block' : 'none';
            layer.style.backgroundImage = this.sanitizeCssUrl(this.themeBackgroundObjectUrl);

            if (this.themeModalRefs) {
                this.updateThemePreviewCard();
            }
        },

        validateThemeBackgroundFile(file) {
            if (!file || !(file instanceof File)) {
                throw new Error(this.t('themeImageLoadFailed'));
            }
            if (!THEME_BACKGROUND_ALLOWED_TYPES.includes(file.type)) {
                throw new Error(this.t('themeInvalidType'));
            }
            if (file.size > THEME_BACKGROUND_MAX_SIZE) {
                throw new Error(this.t('themeFileTooLarge'));
            }
        },

        async uploadThemeBackgroundFile(file) {
            this.validateThemeBackgroundFile(file);
            const cfg = this.getThemeConfig();
            const oldAssetId = cfg.backgroundAssetId;
            const row = await this.themeAssetRepository.putAsset(file, file.type);
            cfg.backgroundAssetId = row.id;
            cfg.backgroundImageEnabled = true;
            cfg.updatedAt = new Date().toISOString();
            this.saveSettings();
            await this.refreshThemeBackgroundState();
            if (oldAssetId && oldAssetId !== row.id) {
                await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => undefined);
            }
            if (this.themeModalRefs) {
                this.syncThemeModalState();
            }
            this.showToast(this.t('themeUploadSuccess'));
        },

        async removeThemeBackgroundFile() {
            const cfg = this.getThemeConfig();
            const oldAssetId = cfg.backgroundAssetId;
            cfg.backgroundImageEnabled = false;
            cfg.backgroundAssetId = null;
            cfg.updatedAt = new Date().toISOString();
            this.saveSettings();
            this.revokeThemeBackgroundObjectUrl();
            this.updateThemeVisualState();
            if (oldAssetId) {
                await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => undefined);
            }
            if (this.themeModalRefs) {
                this.syncThemeModalState();
            }
            this.showToast(this.t('themeBackgroundRemoved'));
        },

        async initializeThemeSystem() {
            const cfg = this.getThemeConfig();
            this.refreshThemeHostTargets();
            this.applyThemePresetVariables(cfg.presetKey, false);
            await this.applyAppearanceMode(cfg.appearanceMode, {
                persist: false,
                showToast: false,
                preferNative: false
            });
            await this.refreshThemeBackgroundState();
            this.queueThemeHostRefresh();
        },

        syncThemeModalState() {
            if (!this.themeModalRefs) return;
            const refs = this.themeModalRefs;
            const cfg = this.getThemeConfig();
            const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl);

            refs.appearanceButtons.system.classList.toggle('active', cfg.appearanceMode === 'system');
            refs.appearanceButtons.light.classList.toggle('active', cfg.appearanceMode === 'light');
            refs.appearanceButtons.dark.classList.toggle('active', cfg.appearanceMode === 'dark');

            refs.presetButtons.forEach((btn) => {
                const isActive = btn.dataset.presetKey === cfg.presetKey;
                btn.classList.toggle('active', isActive);
            });

            refs.wallpaperEnable.checked = cfg.backgroundImageEnabled && Boolean(cfg.backgroundAssetId);
            refs.blurRange.value = `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}`;
            refs.blurValue.textContent = `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`;
            refs.messageGlass.checked = Boolean(cfg.messageGlassEnabled);
            refs.messageGlassIntensityRange.disabled = !cfg.messageGlassEnabled;
            refs.messageGlassIntensityRange.value = `${Math.round(clampNumber(cfg.messageGlassIntensity, 0, 100))}`;
            refs.messageGlassIntensityValue.textContent = `${Math.round(clampNumber(cfg.messageGlassIntensity, 0, 100))}%`;
            refs.panelGlassIntensityRange.value = `${Math.round(clampNumber(cfg.panelGlassIntensity, 0, 100))}`;
            refs.panelGlassIntensityValue.textContent = `${Math.round(clampNumber(cfg.panelGlassIntensity, 0, 100))}%`;
            refs.sidebarEnhance.checked = Boolean(cfg.sidebarTextEnhanceEnabled);
            refs.sidebarEnhanceRange.disabled = !cfg.sidebarTextEnhanceEnabled;
            refs.sidebarEnhanceRange.value = `${Math.round(clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100))}`;
            refs.sidebarEnhanceValue.textContent = `${Math.round(clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100))}%`;

            refs.removeFileBtn.disabled = !cfg.backgroundAssetId;
            refs.uploadDrop.classList.toggle('has-image', canRenderBackground);
            refs.uploadBg.style.backgroundImage = canRenderBackground
                ? this.sanitizeCssUrl(this.themeBackgroundObjectUrl)
                : 'none';

            this.updateThemePreviewCard();
        },

        updateThemePreviewCard() {
            if (!this.themeModalRefs) return;
            const refs = this.themeModalRefs;
            const cfg = this.getThemeConfig();
            const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl);
            const isDark = this.currentEffectiveTheme === 'dark';
            const preset = getThemePresetByKey(cfg.presetKey);
            const pageThemeEnabled = true;
            const previewVars = buildThemeSurfaceVars(preset, {
                isDark,
                canRenderBackground,
                messageIntensity: cfg.messageGlassIntensity,
                panelIntensity: cfg.panelGlassIntensity
            });
            const previewNavBg = canRenderBackground
                ? (isDark ? previewVars['--gh-page-sidebar-bg-dark'] : previewVars['--gh-page-sidebar-bg-light'])
                : (pageThemeEnabled
                    ? (isDark ? previewVars['--gh-page-sidebar-bg-dark'] : previewVars['--gh-page-sidebar-bg-light'])
                    : (isDark ? 'rgba(15, 23, 42, 0.920)' : 'rgba(255, 255, 255, 0.960)'));
            const previewInputBg = canRenderBackground
                ? (isDark ? previewVars['--gh-page-composer-bg-dark'] : previewVars['--gh-page-composer-bg-light'])
                : (pageThemeEnabled
                    ? (isDark ? previewVars['--gh-page-composer-bg-dark'] : previewVars['--gh-page-composer-bg-light'])
                    : (isDark ? '#334155' : '#ffffff'));
            const previewChatBg = 'transparent';
            const previewMessageUserBg = (canRenderBackground || pageThemeEnabled)
                ? previewVars['--gh-msg-user-bg']
                : (isDark ? 'rgba(51, 65, 85, 0.940)' : 'rgba(255,255,255,0.920)');
            const previewAssistantBubble = canRenderBackground && cfg.messageGlassEnabled;
            const previewMessageAssistantBg = previewAssistantBubble
                ? previewVars['--gh-msg-assistant-bg']
                : 'transparent';
            const previewBorder = previewVars
                ? previewVars['--gh-panel-card-border']
                : (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.32)');
            const previewMessageBorder = previewVars
                ? previewVars['--gh-msg-border']
                : previewBorder;

            refs.preview.classList.toggle('has-bg', canRenderBackground);
            refs.previewBg.style.backgroundImage = canRenderBackground
                ? this.sanitizeCssUrl(this.themeBackgroundObjectUrl)
                : 'none';
            refs.preview.style.setProperty('--gh-preview-blur', `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`);
            refs.previewNav.style.background = previewNavBg;
            refs.previewNav.style.border = `1px solid ${previewBorder}`;
            refs.previewNav.style.boxShadow = cfg.sidebarTextEnhanceEnabled && !isDark && canRenderBackground
                ? `inset 0 0 0 9999px rgba(255,255,255,${(clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100).toFixed(2)}), inset 0 0 0 1px ${previewBorder}`
                : `inset 0 0 0 1px ${previewBorder}`;
            refs.previewNav.style.backdropFilter = canRenderBackground && previewVars
                ? `blur(${previewVars['--gh-panel-blur']})`
                : 'none';
            refs.previewChat.style.background = previewChatBg;
            refs.previewChat.style.border = '1px solid transparent';
            refs.previewUserMsg.style.background = previewMessageUserBg;
            refs.previewAssistantMsg.style.background = previewMessageAssistantBg;
            refs.previewUserMsg.style.border = `1px solid ${previewMessageBorder}`;
            refs.previewAssistantMsg.style.border = previewAssistantBubble
                ? `1px solid ${previewMessageBorder}`
                : '1px solid transparent';
            refs.previewUserMsg.style.padding = canRenderBackground
                ? (cfg.messageGlassEnabled ? '10px 12px' : '8px 10px')
                : '10px 12px';
            refs.previewAssistantMsg.style.padding = previewAssistantBubble ? '14px 18px' : '0';
            refs.previewUserMsg.style.borderRadius = canRenderBackground
                ? (cfg.messageGlassEnabled ? '24px' : '18px')
                : '20px';
            refs.previewAssistantMsg.style.borderRadius = previewAssistantBubble ? '28px' : '0';
            refs.previewAssistantMsg.style.backdropFilter = previewAssistantBubble
                ? `blur(${previewVars['--gh-msg-blur']})`
                : 'none';
            refs.previewUserMsg.style.backdropFilter = (cfg.messageGlassEnabled || !canRenderBackground)
                ? ((canRenderBackground && previewVars) ? `blur(${previewVars['--gh-msg-blur']})` : 'none')
                : 'none';
            refs.previewAssistantMsg.style.boxShadow = previewAssistantBubble ? `inset 0 0 0 1px ${previewMessageBorder}` : 'none';
            refs.previewAssistantMsg.style.color = '';
            refs.previewInput.style.background = previewInputBg;
            refs.previewInput.style.border = `1px solid ${previewMessageBorder}`;
            refs.previewInput.style.backdropFilter = canRenderBackground && previewVars
                ? `blur(${previewVars['--gh-composer-blur']})`
                : 'none';
            refs.previewInput.style.boxShadow = canRenderBackground && previewVars
                ? `inset 0 0 0 1px ${previewMessageBorder}`
                : 'none';
        },

        openAboutModal(triggerElement = null) {
            if (triggerElement && typeof triggerElement.focus === 'function') {
                this.aboutModalTrigger = triggerElement;
            }

            if (this.aboutModal && this.aboutModal.isConnected) {
                requestAnimationFrame(() => {
                    this.aboutModal.classList.add('open');
                    const closeControl = this.aboutModal.querySelector('.chatgpt-helper-about-close');
                    if (closeControl && typeof closeControl.focus === 'function') {
                        try {
                            closeControl.focus({ preventScroll: true });
                        } catch (e) {
                            closeControl.focus();
                        }
                    }
                });
                return;
            }

            const manifest = getExtensionManifestMeta() || {};
            const productName = manifest.name || 'ChatGPT Helper';
            const version = manifest.version || EXTENSION_VERSION || '0.0.0';
            const titleId = 'chatgpt-helper-about-title';
            const descriptionId = 'chatgpt-helper-about-description';

            const overlay = createElement('div', { id: 'chatgpt-helper-about-modal' });
            const dialog = createElement('div', { className: 'chatgpt-helper-about-dialog' });
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            dialog.setAttribute('aria-labelledby', titleId);
            dialog.setAttribute('aria-describedby', descriptionId);

            const header = createElement('div', { className: 'chatgpt-helper-about-header' });
            const titleWrap = createElement('div', { className: 'chatgpt-helper-about-title-wrap' });
            titleWrap.appendChild(createHelperLogoNode({
                size: 44,
                className: 'chatgpt-helper-about-logo',
                title: productName,
            }));

            const titleText = createElement('div', { className: 'chatgpt-helper-about-title-text' });
            const nameRow = createElement('div', { className: 'chatgpt-helper-about-name-row' });
            nameRow.appendChild(createElement('h2', { className: 'chatgpt-helper-about-name', id: titleId }, productName));
            nameRow.appendChild(createElement('div', { className: 'chatgpt-helper-about-badge' }, `v${version}`));
            titleText.appendChild(nameRow);
            titleText.appendChild(createElement('p', { className: 'chatgpt-helper-about-tagline', id: descriptionId }, this.t('aboutTagline') || 'A focused productivity layer designed for heavy ChatGPT users'));
            titleWrap.appendChild(titleText);

            const closeBtn = createElement('button', {
                className: 'chatgpt-helper-about-close',
                type: 'button',
                title: this.t('aboutClose') || 'Close',
                'aria-label': this.t('aboutClose') || 'Close'
            });
            closeBtn.appendChild(createSvgIconNode('close', { size: 16 }));

            header.appendChild(titleWrap);
            header.appendChild(closeBtn);

            const body = createElement('div', { className: 'chatgpt-helper-about-body' });
            const shell = createElement('div', { className: 'chatgpt-helper-about-shell' });

            const createSection = (title, options = {}) => {
                const section = createElement('section', {
                    className: `chatgpt-helper-about-section${options.compact ? ' compact' : ''}${options.featured ? ' featured' : ''}`
                });
                const sectionHeader = createElement('div', { className: 'chatgpt-helper-about-section-head' });
                if (options.icon) {
                    const iconWrap = createElement('span', { className: 'chatgpt-helper-about-section-icon' });
                    iconWrap.appendChild(createSvgIconNode(options.icon, { size: 15, strokeWidth: '2.2' }));
                    sectionHeader.appendChild(iconWrap);
                }
                sectionHeader.appendChild(createElement('h3', { className: 'chatgpt-helper-about-section-title' }, title));
                section.appendChild(sectionHeader);
                if (options.text) {
                    section.appendChild(createElement('p', { className: 'chatgpt-helper-about-section-text' }, options.text));
                }
                if (options.bodyNode) {
                    section.appendChild(options.bodyNode);
                }
                if (options.actions && options.actions.children.length) {
                    section.appendChild(options.actions);
                }
                return section;
            };

            const createActionRow = () => createElement('div', { className: 'chatgpt-helper-about-actions' });
            const createActionButton = (label, options = {}) => {
                const button = createElement('button', {
                    className: `chatgpt-helper-about-link-btn ${options.variant || 'ghost'}${options.disabled ? ' disabled' : ''}`,
                    type: 'button',
                    disabled: !!options.disabled,
                    title: options.title || label
                });
                if (options.icon) {
                    button.appendChild(createSvgIconNode(options.icon, { size: 15, strokeWidth: '2.2' }));
                }
                button.appendChild(createElement('span', {}, label));
                if (options.onClick && !options.disabled) {
                    button.addEventListener('click', options.onClick);
                }
                return button;
            };

            const storyBody = createElement('div', { className: 'chatgpt-helper-about-story' });
            storyBody.appendChild(createElement('p', {
                className: 'chatgpt-helper-about-section-lead'
            }, this.t('aboutIntro') || 'ChatGPT Helper adds a focused side panel for ChatGPT workflows.'));
            storyBody.appendChild(createElement('p', {
                className: 'chatgpt-helper-about-section-text'
            }, this.t('aboutMotivationContent') || 'This is more than just an extension.'));

            const motivationSection = createSection(
                this.t('aboutMotivationTitle') || 'Motivation',
                {
                    bodyNode: storyBody,
                    icon: 'info',
                    featured: true
                }
            );

            const featureList = createElement('ul', { className: 'chatgpt-helper-about-feature-list' });
            [
                this.t('aboutFeaturePrompts') || 'Prompt management and quick insertion',
                this.t('aboutFeatureOutline') || 'Automatic outline generation and navigation',
                this.t('aboutFeatureConversations') || 'Conversation organization and batch actions',
                this.t('aboutFeatureExport') || 'Multi-format export and reading-position tools'
            ].forEach((feature, index) => {
                const item = createElement('li', { className: 'chatgpt-helper-about-feature-item' });
                item.appendChild(createElement('span', { className: 'chatgpt-helper-about-feature-index' }, String(index + 1).padStart(2, '0')));
                item.appendChild(createElement('span', {}, feature));
                featureList.appendChild(item);
            });
            const featuresSection = createSection(
                this.t('aboutFeaturesTitle') || 'Core Features',
                {
                    bodyNode: featureList,
                    icon: 'list',
                    compact: true
                }
            );

            const privacySection = createSection(
                this.t('aboutPrivacyTitle') || 'Privacy & Permissions',
                {
                    text: this.t('aboutPrivacy') || 'All settings and data processing stay in your browser.',
                    icon: 'shield',
                    compact: true
                }
            );

            const authorBody = createElement('div', { className: 'chatgpt-helper-about-author-block' });
            authorBody.appendChild(createElement('p', { className: 'chatgpt-helper-about-section-text chatgpt-helper-about-author-bio' }, this.t('aboutAuthorBio') || 'Author bio coming soon'));
            const authorActions = createActionRow();
            authorActions.appendChild(createActionButton(
                this.t('aboutAuthorGithub') || 'Author GitHub',
                {
                    variant: 'ghost',
                    icon: 'user',
                    onClick: () => openExternalLink(AUTHOR_GITHUB_URL)
                }
            ));
            const authorSection = createSection(
                this.t('aboutAuthorTitle') || 'About the Author',
                {
                    bodyNode: authorBody,
                    actions: authorActions,
                    compact: true,
                    icon: 'user'
                }
            );

            const mainStack = createElement('div', { className: 'chatgpt-helper-about-main-stack' });
            const sideStack = createElement('div', { className: 'chatgpt-helper-about-side-stack' });
            mainStack.appendChild(motivationSection);
            mainStack.appendChild(featuresSection);
            sideStack.appendChild(privacySection);
            sideStack.appendChild(authorSection);

            shell.appendChild(mainStack);
            shell.appendChild(sideStack);
            body.appendChild(shell);

            const footer = createElement('div', { className: 'chatgpt-helper-about-footer' });
            footer.appendChild(createElement('div', { className: 'chatgpt-helper-about-footer-note' }, this.t('aboutFooterNote') || 'Works on chatgpt.com, chat.openai.com, and new.oaifree.com · Local-first, no conversation uploads'));
            const footerActions = createElement('div', { className: 'chatgpt-helper-about-footer-actions' });
            footerActions.appendChild(createActionButton(
                this.t('aboutRepoButton') || 'GitHub Repository',
                {
                    variant: 'primary',
                    icon: 'github',
                    onClick: () => openExternalLink(REPO_URL)
                }
            ));
            footerActions.appendChild(createActionButton(
                this.t('aboutBugSupport') || 'Submit Feedback',
                {
                    variant: 'ghost',
                    icon: 'message',
                    onClick: () => openExternalLink(ISSUE_URL)
                }
            ));
            footer.appendChild(footerActions);

            dialog.appendChild(header);
            dialog.appendChild(body);
            dialog.appendChild(footer);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const closeModal = () => this.closeAboutModal();
            closeBtn.addEventListener('click', closeModal);
            this.aboutModalBackdropHandler = (event) => {
                if (event.target === overlay) {
                    closeModal();
                }
            };
            overlay.addEventListener('click', this.aboutModalBackdropHandler);
            this.aboutModalEscHandler = (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeModal();
                }
            };
            document.addEventListener('keydown', this.aboutModalEscHandler, true);

            this.aboutModal = overlay;
            requestAnimationFrame(() => {
                overlay.classList.add('open');
                try {
                    closeBtn.focus({ preventScroll: true });
                } catch (e) {
                    closeBtn.focus();
                }
            });
        },

        closeAboutModal() {
            if (!this.aboutModal) return;
            this.aboutModal.classList.remove('open');
            const modalToRemove = this.aboutModal;
            const triggerToFocus = this.aboutModalTrigger;
            setTimeout(() => {
                if (modalToRemove && modalToRemove.parentNode) {
                    modalToRemove.parentNode.removeChild(modalToRemove);
                }
            }, 200);
            if (this.aboutModalBackdropHandler) {
                this.aboutModal.removeEventListener('click', this.aboutModalBackdropHandler);
            }
            if (this.aboutModalEscHandler) {
                document.removeEventListener('keydown', this.aboutModalEscHandler, true);
            }
            this.aboutModal = null;
            this.aboutModalTrigger = null;
            this.aboutModalBackdropHandler = null;
            this.aboutModalEscHandler = null;
            if (triggerToFocus && triggerToFocus.isConnected && typeof triggerToFocus.focus === 'function') {
                setTimeout(() => {
                    try {
                        triggerToFocus.focus({ preventScroll: true });
                    } catch (e) {
                        triggerToFocus.focus();
                    }
                }, 0);
            }
        },

        openThemeSettingsModal() {
            if (this.themeModal && this.themeModal.isConnected) {
                this.syncThemeModalState();
                requestAnimationFrame(() => this.themeModal.classList.add('open'));
                return;
            }

            const overlay = createElement('div', { id: 'chatgpt-helper-theme-modal' });
            const dialog = createElement('div', { className: 'chatgpt-helper-theme-modal-dialog' });
            const header = createElement('div', { className: 'chatgpt-helper-theme-modal-header' });
            const headerTitle = createElement('div', { className: 'chatgpt-helper-theme-modal-title' });
            headerTitle.appendChild(createSvgIconNode('settings', {
                size: 16,
                className: 'chatgpt-helper-theme-modal-title-icon'
            }));
            headerTitle.appendChild(createElement('span', {}, this.t('themeDialogTitle') || 'Theme'));
            header.appendChild(headerTitle);
            const closeBtn = createElement('button', {
                className: 'chatgpt-helper-theme-modal-close',
                type: 'button',
                title: 'Close'
            });
            closeBtn.appendChild(createSvgIconNode('close', { size: 16 }));
            header.appendChild(closeBtn);

            const body = createElement('div', { className: 'chatgpt-helper-theme-modal-body' });
            const main = createElement('div', { className: 'chatgpt-helper-theme-main chatgpt-helper-theme-workbench-settings' });
            const side = createElement('div', { className: 'chatgpt-helper-theme-side chatgpt-helper-theme-workbench-preview' });

            const appearanceBlock = createElement('div', { className: 'chatgpt-helper-theme-block theme-appearance-block' });
            appearanceBlock.appendChild(createElement('div', { className: 'chatgpt-helper-theme-block-title' }, this.t('themeAppearance') || 'Appearance'));
            const appearanceSegment = createElement('div', { className: 'chatgpt-helper-theme-segment' });
            const appearanceButtons = {
                system: createElement('button', { type: 'button' }, this.t('themeAppearanceSystem') || 'System'),
                light: createElement('button', { type: 'button' }, this.t('themeAppearanceLight') || 'Light'),
                dark: createElement('button', { type: 'button' }, this.t('themeAppearanceDark') || 'Dark')
            };
            appearanceSegment.appendChild(appearanceButtons.system);
            appearanceSegment.appendChild(appearanceButtons.light);
            appearanceSegment.appendChild(appearanceButtons.dark);
            appearanceBlock.appendChild(appearanceSegment);

            const colorsBlock = createElement('div', { className: 'chatgpt-helper-theme-block theme-colors-block' });
            colorsBlock.appendChild(createElement('div', { className: 'chatgpt-helper-theme-block-title' }, this.t('themeColorPresets') || 'Colors'));
            const presetGrid = createElement('div', { className: 'chatgpt-helper-theme-preset-grid' });
            const presetButtons = [];
            THEME_PRESETS.forEach((preset) => {
                const presetBtn = createElement('button', {
                    className: 'chatgpt-helper-theme-preset',
                    type: 'button',
                    title: preset.labelKey ? this.t(preset.labelKey) : preset.key,
                    'data-preset-key': preset.key
                });
                if (preset.isOriginal) {
                    presetBtn.classList.add('is-original');
                    presetBtn.textContent = this.t(preset.labelKey) || 'Original';
                } else {
                    presetBtn.style.background = preset.primary;
                    presetBtn.style.color = preset.primary;
                }
                presetGrid.appendChild(presetBtn);
                presetButtons.push(presetBtn);
            });
            colorsBlock.appendChild(presetGrid);

            const wallpaperBlock = createElement('div', { className: 'chatgpt-helper-theme-block theme-wallpaper-block' });
            wallpaperBlock.appendChild(createElement('div', { className: 'chatgpt-helper-theme-block-title' }, this.t('themeWallpaper') || 'Wallpaper'));

            const wallpaperEnableRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            wallpaperEnableRow.appendChild(createElement('span', {}, this.t('themeEnableWallpaper') || 'Enable Wallpaper'));
            const wallpaperEnable = createElement('input', { type: 'checkbox' });
            wallpaperEnableRow.appendChild(wallpaperEnable);
            wallpaperBlock.appendChild(wallpaperEnableRow);

            const uploadDrop = createElement('div', { className: 'chatgpt-helper-theme-upload' });
            const uploadBg = createElement('div', { className: 'chatgpt-helper-theme-upload-bg' });
            const uploadContent = createElement('div', { className: 'chatgpt-helper-theme-upload-content' });
            uploadContent.appendChild(createSvgIconNode('image', {
                size: 20,
                className: 'chatgpt-helper-theme-upload-icon'
            }));
            uploadContent.appendChild(createElement('div', {
                className: 'chatgpt-helper-theme-upload-title'
            }, this.t('themeDropImage') || 'Drop image here'));
            uploadContent.appendChild(createElement('div', {
                className: 'chatgpt-helper-theme-upload-hint'
            }, this.t('themeFileTypes') || 'PNG/JPG/WebP up to 5MB'));
            const uploadButtons = createElement('div', { className: 'chatgpt-helper-theme-upload-actions' });
            const selectFileBtn = createElement('button', {
                className: 'chatgpt-helper-theme-launch-btn',
                type: 'button'
            }, this.t('themeSelectFile') || 'Select File');
            const removeFileBtn = createElement('button', {
                className: 'chatgpt-helper-theme-launch-btn',
                type: 'button'
            }, this.t('themeRemoveImage') || 'Remove');
            uploadButtons.appendChild(selectFileBtn);
            uploadButtons.appendChild(removeFileBtn);
            uploadContent.appendChild(uploadButtons);
            uploadDrop.appendChild(uploadBg);
            uploadDrop.appendChild(uploadContent);
            wallpaperBlock.appendChild(uploadDrop);

            const fileInput = createElement('input', {
                type: 'file',
                accept: 'image/png,image/jpeg,image/webp',
                style: { display: 'none' }
            });
            wallpaperBlock.appendChild(fileInput);

            const blurRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            blurRow.appendChild(createElement('span', {}, this.t('themeBlur') || 'Blur'));
            const blurControls = createElement('div', { className: 'chatgpt-helper-theme-range-control' });
            const blurRange = createElement('input', {
                type: 'range',
                min: 0,
                max: 20,
                step: 1
            });
            const blurValue = createElement('span', { className: 'chatgpt-helper-theme-value' }, '5px');
            blurControls.appendChild(blurRange);
            blurControls.appendChild(blurValue);
            blurRow.appendChild(blurControls);
            wallpaperBlock.appendChild(blurRow);

            const messageGlassRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            messageGlassRow.appendChild(createElement('span', {}, this.t('themeMessageGlass') || 'Message Glass Effect'));
            const messageGlass = createElement('input', { type: 'checkbox' });
            messageGlassRow.appendChild(messageGlass);
            wallpaperBlock.appendChild(messageGlassRow);

            const messageGlassIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            messageGlassIntensityRow.appendChild(createElement('span', {}, this.t('themeMessageGlassIntensity') || 'Message Glass Intensity'));
            const messageGlassIntensityControls = createElement('div', { className: 'chatgpt-helper-theme-range-control' });
            const messageGlassIntensityRange = createElement('input', {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            });
            const messageGlassIntensityValue = createElement('span', { className: 'chatgpt-helper-theme-value' }, '60%');
            messageGlassIntensityControls.appendChild(messageGlassIntensityRange);
            messageGlassIntensityControls.appendChild(messageGlassIntensityValue);
            messageGlassIntensityRow.appendChild(messageGlassIntensityControls);
            wallpaperBlock.appendChild(messageGlassIntensityRow);

            const panelGlassIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            panelGlassIntensityRow.appendChild(createElement('span', {}, this.t('themePanelGlassIntensity') || 'Side Panel Glass Intensity'));
            const panelGlassIntensityControls = createElement('div', { className: 'chatgpt-helper-theme-range-control' });
            const panelGlassIntensityRange = createElement('input', {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            });
            const panelGlassIntensityValue = createElement('span', { className: 'chatgpt-helper-theme-value' }, '45%');
            panelGlassIntensityControls.appendChild(panelGlassIntensityRange);
            panelGlassIntensityControls.appendChild(panelGlassIntensityValue);
            panelGlassIntensityRow.appendChild(panelGlassIntensityControls);
            wallpaperBlock.appendChild(panelGlassIntensityRow);

            const sidebarEnhanceRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            sidebarEnhanceRow.appendChild(createElement('span', {}, this.t('themeSidebarEnhance') || 'Sidebar Text Enhance'));
            const sidebarEnhance = createElement('input', { type: 'checkbox' });
            sidebarEnhanceRow.appendChild(sidebarEnhance);
            wallpaperBlock.appendChild(sidebarEnhanceRow);

            const sidebarEnhanceIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row' });
            sidebarEnhanceIntensityRow.appendChild(createElement('span', {}, this.t('themeSidebarEnhanceIntensity') || 'Enhance Intensity'));
            const sidebarEnhanceControls = createElement('div', { className: 'chatgpt-helper-theme-range-control' });
            const sidebarEnhanceRange = createElement('input', {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            });
            const sidebarEnhanceValue = createElement('span', { className: 'chatgpt-helper-theme-value' }, '20%');
            sidebarEnhanceControls.appendChild(sidebarEnhanceRange);
            sidebarEnhanceControls.appendChild(sidebarEnhanceValue);
            sidebarEnhanceIntensityRow.appendChild(sidebarEnhanceControls);
            wallpaperBlock.appendChild(sidebarEnhanceIntensityRow);

            main.appendChild(appearanceBlock);
            main.appendChild(colorsBlock);
            main.appendChild(wallpaperBlock);

            side.appendChild(createElement('div', { className: 'chatgpt-helper-theme-block-title' }, this.t('themeLivePreview') || 'Live Preview'));
            const preview = createElement('div', { className: 'chatgpt-helper-theme-preview' });
            const previewBg = createElement('div', { className: 'chatgpt-helper-theme-preview-bg' });
            const previewInner = createElement('div', { className: 'chatgpt-helper-theme-preview-inner' });
            const previewNav = createElement('div', { className: 'chatgpt-helper-theme-preview-nav' });
            for (let i = 0; i < 5; i++) {
                const item = createElement('div', {
                    style: {
                        height: '20px',
                        marginBottom: '10px',
                        borderRadius: '999px',
                        background: i === 2
                            ? 'color-mix(in srgb, var(--gh-primary), transparent 30%)'
                            : 'color-mix(in srgb, var(--gh-text-secondary, #9ca3af), transparent 75%)'
                    }
                });
                previewNav.appendChild(item);
            }

            const previewChat = createElement('div', { className: 'chatgpt-helper-theme-preview-chat' });
            const previewUserMsg = createElement('div', { className: 'chatgpt-helper-theme-preview-msg user' }, 'Summarize recent updates.');
            const previewAssistantMsg = createElement('div', { className: 'chatgpt-helper-theme-preview-msg assistant' }, 'Theme engine, wallpaper controls, and live preview are now enabled.');
            const previewInput = createElement('div', { className: 'chatgpt-helper-theme-preview-input' });
            previewChat.appendChild(previewUserMsg);
            previewChat.appendChild(previewAssistantMsg);
            previewChat.appendChild(previewInput);
            previewInner.appendChild(previewNav);
            previewInner.appendChild(previewChat);
            preview.appendChild(previewBg);
            preview.appendChild(previewInner);
            side.appendChild(preview);

            body.appendChild(main);
            body.appendChild(side);
            dialog.appendChild(header);
            dialog.appendChild(body);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const onAppearanceChange = (mode) => {
                void this.applyAppearanceMode(mode, {
                    persist: true,
                    showToast: false,
                    preferNative: true
                }).catch((error) => {
                    console.error('[ChatGPT Helper] applyAppearanceMode 失败:', error);
                    this.showToast(this.t('themeSwitchFailed'));
                });
            };
            appearanceButtons.system.addEventListener('click', () => onAppearanceChange('system'));
            appearanceButtons.light.addEventListener('click', () => onAppearanceChange('light'));
            appearanceButtons.dark.addEventListener('click', () => onAppearanceChange('dark'));

            presetButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const key = btn.dataset.presetKey;
                    this.applyThemePresetVariables(key, true);
                    this.updateThemeVisualState();
                });
            });

            wallpaperEnable.addEventListener('change', () => {
                const cfg = this.getThemeConfig();
                if (!cfg.backgroundAssetId && wallpaperEnable.checked) {
                    wallpaperEnable.checked = false;
                    this.showToast(this.t('themeNoBackground'));
                    return;
                }
                cfg.backgroundImageEnabled = Boolean(wallpaperEnable.checked && cfg.backgroundAssetId);
                cfg.updatedAt = new Date().toISOString();
                this.saveSettings();
                void this.refreshThemeBackgroundState();
            });

            blurRange.addEventListener('input', () => {
                const cfg = this.getThemeConfig();
                cfg.backgroundBlurPx = Math.round(clampNumber(blurRange.value, 0, 20));
                cfg.updatedAt = new Date().toISOString();
                blurValue.textContent = `${cfg.backgroundBlurPx}px`;
                this.saveSettings();
                this.updateThemeVisualState();
            });

            messageGlass.addEventListener('change', () => {
                const cfg = this.getThemeConfig();
                cfg.messageGlassEnabled = Boolean(messageGlass.checked);
                cfg.updatedAt = new Date().toISOString();
                this.saveSettings();
                this.updateThemeVisualState();
                this.syncThemeModalState();
            });

            messageGlassIntensityRange.addEventListener('input', () => {
                const cfg = this.getThemeConfig();
                cfg.messageGlassIntensity = Math.round(clampNumber(messageGlassIntensityRange.value, 0, 100));
                cfg.updatedAt = new Date().toISOString();
                messageGlassIntensityValue.textContent = `${cfg.messageGlassIntensity}%`;
                this.saveSettings();
                this.updateThemeVisualState();
            });

            panelGlassIntensityRange.addEventListener('input', () => {
                const cfg = this.getThemeConfig();
                cfg.panelGlassIntensity = Math.round(clampNumber(panelGlassIntensityRange.value, 0, 100));
                cfg.updatedAt = new Date().toISOString();
                panelGlassIntensityValue.textContent = `${cfg.panelGlassIntensity}%`;
                this.saveSettings();
                this.updateThemeVisualState();
            });

            sidebarEnhance.addEventListener('change', () => {
                const cfg = this.getThemeConfig();
                cfg.sidebarTextEnhanceEnabled = Boolean(sidebarEnhance.checked);
                cfg.updatedAt = new Date().toISOString();
                this.saveSettings();
                this.updateThemeVisualState();
                this.syncThemeModalState();
            });

            sidebarEnhanceRange.addEventListener('input', () => {
                const cfg = this.getThemeConfig();
                cfg.sidebarTextEnhanceIntensity = Math.round(clampNumber(sidebarEnhanceRange.value, 0, 100));
                cfg.updatedAt = new Date().toISOString();
                sidebarEnhanceValue.textContent = `${cfg.sidebarTextEnhanceIntensity}%`;
                this.saveSettings();
                this.updateThemeVisualState();
            });

            selectFileBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', () => {
                const file = fileInput.files && fileInput.files[0];
                fileInput.value = '';
                if (!file) return;
                void this.uploadThemeBackgroundFile(file).catch((error) => {
                    const message = error && error.message ? error.message : this.t('themeImageLoadFailed');
                    this.showToast(message);
                });
            });

            removeFileBtn.addEventListener('click', () => {
                void this.removeThemeBackgroundFile().catch((error) => {
                    console.error('[ChatGPT Helper] removeThemeBackgroundFile 失败:', error);
                });
            });

            ['dragenter', 'dragover'].forEach((eventName) => {
                uploadDrop.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    uploadDrop.classList.add('dragging');
                });
            });
            ['dragleave', 'drop'].forEach((eventName) => {
                uploadDrop.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    uploadDrop.classList.remove('dragging');
                });
            });
            uploadDrop.addEventListener('drop', (e) => {
                const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
                if (!file) return;
                void this.uploadThemeBackgroundFile(file).catch((error) => {
                    const message = error && error.message ? error.message : this.t('themeImageLoadFailed');
                    this.showToast(message);
                });
            });

            const closeModal = () => this.closeThemeSettingsModal();
            closeBtn.addEventListener('click', closeModal);
            this.themeModalBackdropHandler = (event) => {
                if (event.target === overlay) {
                    closeModal();
                }
            };
            overlay.addEventListener('click', this.themeModalBackdropHandler);
            this.themeModalEscHandler = (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeModal();
                }
            };
            document.addEventListener('keydown', this.themeModalEscHandler, true);

            this.themeModal = overlay;
            this.themeModalRefs = {
                appearanceButtons,
                presetButtons,
                wallpaperEnable,
                blurRange,
                blurValue,
                messageGlass,
                messageGlassIntensityRange,
                messageGlassIntensityValue,
                panelGlassIntensityRange,
                panelGlassIntensityValue,
                sidebarEnhance,
                sidebarEnhanceRange,
                sidebarEnhanceValue,
                uploadDrop,
                uploadBg,
                removeFileBtn,
                preview,
                previewBg,
                previewNav,
                previewChat,
                previewUserMsg,
                previewAssistantMsg,
                previewInput
            };
            this.syncThemeModalState();
            requestAnimationFrame(() => overlay.classList.add('open'));
        },

        closeThemeSettingsModal() {
            if (!this.themeModal) return;
            this.themeModal.classList.remove('open');
            const modalToRemove = this.themeModal;
            setTimeout(() => {
                if (modalToRemove && modalToRemove.parentNode) {
                    modalToRemove.parentNode.removeChild(modalToRemove);
                }
            }, 200);
            if (this.themeModalBackdropHandler) {
                this.themeModal.removeEventListener('click', this.themeModalBackdropHandler);
            }
            if (this.themeModalEscHandler) {
                document.removeEventListener('keydown', this.themeModalEscHandler, true);
            }
            this.themeModal = null;
            this.themeModalRefs = null;
            this.themeModalEscHandler = null;
            this.themeModalBackdropHandler = null;
        }
    });
})();
