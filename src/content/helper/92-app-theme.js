import { AUTHOR_GITHUB_URL, DEFAULT_THEME_CONFIG, EXTENSION_VERSION, ISSUE_URL, REPO_URL, THEME_BACKGROUND_ALLOWED_TYPES, THEME_BACKGROUND_MAX_SIZE, THEME_HOST_ATTRS, THEME_PRESETS, buildThemeSurfaceVars, clampNumber, createElement, createHelperLogoNode, createSvgIconNode, getExtensionManifestMeta, getThemePresetByKey, normalizeThemeConfig, openExternalLink, setButtonIcon } from './10-base.js';
import { THEME_RUNTIME_CSS } from './21-theme-runtime.js';
// Chrome Extension Content Script - ChatGPT Helper App Theme



export const ThemeFeature = {
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
        for (const element of [document.documentElement, document.body]) {
            if (element.getAttribute('data-gh-mode') !== normalizedMode) {
                element.setAttribute('data-gh-mode', normalizedMode);
            }
        }
        const changed = this.currentEffectiveTheme !== normalizedMode;
        this.currentEffectiveTheme = normalizedMode;
        if (changed || !this.themeButtonsInitialized) {
            this.themeButtonsInitialized = true;
            this.updateThemeButtons();
        }
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
        // The native app owns html. A legacy body.dark must never override html.light.
        for (const element of [document.documentElement, document.body]) {
            if (element.classList.contains('dark')) return 'dark';
            if (element.classList.contains('light')) return 'light';
            const mode = element.getAttribute('data-theme');
            if (mode === 'dark' || mode === 'light') return mode;
            const scheme = element.style.colorScheme;
            if (scheme === 'dark' || scheme === 'light') return scheme;
        }
        return this.getSystemPreferredTheme();
    },

    directApplyPageTheme(theme) {
        const mode = theme === 'dark' ? 'dark' : 'light';
        const html = document.documentElement;
        html.classList.remove('dark-theme', 'light-theme', mode === 'dark' ? 'light' : 'dark');
        html.classList.add(mode);
        // Remove classes written by older Helper versions. Keeping two native theme
        // roots lets an old body.dark keep the page dark after html changes to light.
        document.body.classList.remove('dark', 'light', 'dark-theme', 'light-theme');
        document.body.style.removeProperty('color-scheme');
        document.body.removeAttribute('data-theme');
        document.body.removeAttribute('data-mode');
        if (html.style.colorScheme !== mode) html.style.colorScheme = mode;
        if (html.getAttribute('data-theme') !== mode) html.setAttribute('data-theme', mode);
        if (html.hasAttribute('data-appearance-theme')) html.setAttribute('data-appearance-theme', mode);
        if (html.hasAttribute('data-mode')) html.setAttribute('data-mode', mode);
        try {
            const preference = this.getThemeConfig().appearanceMode === 'system' ? 'system' : mode;
            localStorage.setItem('theme', preference);
        } catch (error) {
            // Storage can be unavailable; the current page still switches immediately.
        }
        this.syncHelperThemeMode(mode);
        this.syncNativeThemeScopes(mode);
    },

    syncNativeThemeScopes(mode = this.currentEffectiveTheme) {
        // The current ChatGPT renderer owns its own palette below html. Updating
        // html alone leaves DIL text and writing blocks in the previous mode.
        const scopes = new Set();
        document.querySelectorAll('main [data-dil-message-id], main [data-oai-writing-block-surface]').forEach(content => {
            const scope = content.closest('[data-theme]');
            if (scope && scope !== document.documentElement && scope !== document.body) scopes.add(scope);
        });
        for (const scope of scopes) {
            if (scope.getAttribute('data-gh-native-theme') !== 'true') scope.setAttribute('data-gh-native-theme', 'true');
            if (scope.getAttribute('data-theme') !== mode) scope.setAttribute('data-theme', mode);
        }
    },

    async applyEffectiveTheme(theme, options = {}) {
        const mode = theme === 'dark' ? 'dark' : 'light';
        // No guessed native button click or asynchronous retry: one state transition
        // updates native classes, Helper tokens and wallpaper together in this turn.
        this.directApplyPageTheme(mode);
        this.settings.themeMode = mode;
        if (options.persist) this.saveSettings();
        this.updateThemeVisualState();
        if (this.themeModalRefs) this.syncThemeModalState();
        return mode;
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
        const changed = cfg.presetKey !== preset.key;
        cfg.presetKey = preset.key;
        if (changed) {
            cfg.updatedAt = new Date().toISOString();
            if (persist) this.saveSettings();
        }
        this.updateThemeVisualState();
        if (this.themeModalRefs) this.syncThemeModalState();
    },

    clearThemeHostMarks() {
        const attrs = [...THEME_HOST_ATTRS, 'data-gh-theme-host-clear'];
        for (const attr of attrs) {
            document.querySelectorAll(`[${attr}]`).forEach(node => node.removeAttribute(attr));
        }
    },

    refreshThemeHostTargets() {
        this.syncNativeThemeScopes();
        const targets = new Map();
        const mark = (element, attr) => {
            if (!(element instanceof HTMLElement)) return;
            if (!targets.has(element)) targets.set(element, new Set());
            targets.get(element).add(attr);
        };
        const clearPath = (element, stop = document.body) => {
            for (let current = element; current && current !== stop; current = current.parentElement) {
                mark(current, 'data-gh-theme-host-clear');
            }
        };
        const main = document.querySelector('main, [role="main"]') || this.adapter?.getChatContainer?.();
        mark(main, 'data-gh-theme-host-main');
        mark(main, 'data-gh-theme-host-chat-list');
        clearPath(main);
        // Clear only message ancestors. Rich cards, code blocks, menus and message
        // bubbles retain their own backgrounds, even as the site adds new wrappers.
        const messages = this.adapter?.getChatMessages?.() || [];
        messages.forEach(message => {
            clearPath(message.parentElement, main);
        });
        const sidebar = this.findSidebarShellByGeometry();
        mark(sidebar, 'data-gh-theme-host-sidebar-shell');
        mark(sidebar, 'data-gh-theme-host-sidebar');
        clearPath(sidebar);
        sidebar?.querySelectorAll('nav, [role="navigation"]').forEach(nav => clearPath(nav, sidebar));
        for (const child of sidebar?.children || []) {
            if (!child.matches('.gh-theme-glass-layer, [role="dialog"], [role="menu"]')) mark(child, 'data-gh-theme-host-clear');
        }
        this.themeHostLastFoundShell = Boolean(sidebar);

        this.adapter?.findTextarea?.();
        const input = this.adapter?.textarea || document.querySelector('[data-composer-markdown], #prompt-textarea');
        const composer = input?.closest('[data-composer-body], form, [data-testid="composer"]');
        const surface = input?.closest('[data-composer-surface-variant], [data-composer-surface], [class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')
            || composer?.querySelector('[class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')
            || composer;
        mark(composer, 'data-gh-theme-host-composer');
        mark(surface, 'data-gh-theme-host-composer-surface');
        clearPath(surface);
        // The native footer paints a full-width surface in a non-interactive sibling,
        // not an input ancestor. elementsFromPoint cannot discover pointer-events:none.
        // Only clear that background; controls, attachments and menus remain intact.
        for (let ancestor = surface?.parentElement; ancestor && ancestor !== main && ancestor !== document.body; ancestor = ancestor.parentElement) {
            for (const child of ancestor.children) {
                if (child.matches('.pointer-events-none.absolute.inset-x-0.bg-surface') && !child.contains(input)) {
                    mark(child, 'data-gh-theme-host-clear');
                }
            }
        }
        // Diff role marks rather than remove/re-add all attributes every update.
        for (const attr of [...THEME_HOST_ATTRS, 'data-gh-theme-host-clear']) {
            document.querySelectorAll(`[${attr}]`).forEach(node => {
                if (!targets.get(node)?.has(attr)) node.removeAttribute(attr);
            });
        }
        for (const [node, attrs] of targets) {
            for (const attr of attrs) {
                if (node.getAttribute(attr) !== 'true') node.setAttribute(attr, 'true');
            }
        }
        if (this.isBackgroundEnabled()) {
            if (sidebar) this.ensureThemeGlassLayer(sidebar, 'sidebar');
            if (surface) this.ensureThemeGlassLayer(surface, 'composer');
            // SPA can remove the wallpaper layer independently of its hosts.
            this.ensureThemeBackgroundLayer();
        }
        this.themeHostTargets = { main, sidebar, composer, surface };
    },

    queueThemeHostRefresh() {
        if (this.themeHostRefreshQueued) return;
        this.themeHostRefreshQueued = true;
        this.themeHostRefreshTimer = setTimeout(() => {
            this.themeHostRefreshQueued = false;
            this.themeHostRefreshTimer = null;
            this.refreshThemeHostTargets();
        }, 80);
    },

    findSidebarShellByGeometry() {
        const candidates = document.querySelectorAll('#stage-slideover-sidebar, #stage-sidebar-tiny-bar, [data-testid="sidebar"], nav[aria-label], aside');
        for (const node of candidates) {
            if (node.closest('[id^="chatgpt-helper"]')) continue;
            const rect = node.getBoundingClientRect();
            if (rect.width >= 40 && rect.width <= Math.max(520, innerWidth * .42)
                && rect.height >= innerHeight * .4 && rect.left < 100) return node;
        }
        return null;
    },

    startThemeHostWatchdog() {
        if (this.themeHostWatchdog) return;
        this.themeHostWatchdog = new MutationObserver(records => {
            // Streaming text does not change host ancestry. Only structural changes
            // outside the extension can require another role reconciliation.
            if (!records.some(record => {
                if (record.type === 'attributes') {
                    return record.target.matches('[data-gh-native-theme="true"]') &&
                        record.target.getAttribute('data-theme') !== this.currentEffectiveTheme;
                }
                if ([...record.addedNodes].some(node => node.nodeType === 1 &&
                    (node.matches('[data-theme], [data-dil-message-id]') || node.querySelector('[data-dil-message-id]')))) return true;
                if (record.target.closest?.('[id^="chatgpt-helper"], [data-message-author-role], [data-markdown-text-style]')) return false;
                return [...record.addedNodes, ...record.removedNodes].some(node =>
                    node.nodeType === 1 && !node.matches?.('[id^="chatgpt-helper"], .gh-theme-glass-layer'));
            })) return;
            this.queueThemeHostRefresh();
        });
        this.themeHostWatchdog.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-theme'] });
    },

    stopThemeHostWatchdog() {
        this.themeHostWatchdog?.disconnect();
        this.themeHostWatchdog = null;
        clearTimeout(this.themeHostRefreshTimer);
        this.themeHostRefreshTimer = null;
        this.themeHostRefreshQueued = false;
    },

    isBackgroundEnabled() {
        return document.documentElement.getAttribute('data-gh-bg-enabled') === 'true';
    },

    // 玻璃层是毛玻璃效果的唯一载体：宿主容器的最后一个子节点，
    // absolute + z-index:-1 + pointer-events:none，画在宿主全部内容之下、
    // 壁纸之上。宿主自身背景由 CSS 清空。backdrop-filter 只出现在这一层，
    // 页面容器（可能含有 fixed 后代/原生弹层）永远不会因它产生包含块问题。
    ensureThemeGlassLayer(host, variant) {
        if (!(host instanceof HTMLElement)) return null;
        // 玻璃层以 absolute + inset:0 盖住宿主。宿主若是 static，inset 会沿祖先链
        // 解析到更外层的定位元素，玻璃层可能被放大到整页（2026-10 新版 DOM 的
        // composer 容器链全 static，实测铺满视口变成一块深色蒙版）。
        // position:relative 不会为 fixed 后代创建包含块（transform/backdrop-filter
        // 才会），符合“页面容器永不做包含块炸弹”的架构约束，这里只补定位。
        try {
            if (getComputedStyle(host).position === 'static') {
                host.setAttribute('data-gh-theme-relative', 'true');
            }
        } catch (e) {
            // ignore
        }
        const id = variant === 'composer'
            ? 'chatgpt-helper-glass-composer'
            : 'chatgpt-helper-glass-sidebar';
        let layer = document.getElementById(id);
        if (layer && layer.parentElement !== host) {
            layer.remove();
            layer = null;
        }
        if (!layer) {
            layer = document.createElement('div');
            layer.id = id;
            layer.className = `gh-theme-glass-layer gh-glass-${variant}`;
            layer.setAttribute('aria-hidden', 'true');
            host.appendChild(layer);
        }
        return layer;
    },

    removeThemeGlassLayers() {
        document.querySelectorAll('.gh-theme-glass-layer').forEach(node => node.remove());
        document.querySelectorAll('[data-gh-theme-relative]').forEach(node => node.removeAttribute('data-gh-theme-relative'));
    },

    // 覆盖层探查：在主区/侧栏/输入区取点，几何遍历所有命中元素（含
    // pointer-events:none 的绘制层），列出每个会"画东西"的元素——定位
    // 壁纸被谁盖住时，最靠前的不透明项就是答案。
    probeThemeCoverStack() {
        const points = [];
        const pushPoint = (label, el, fx, fy) => {
            if (!(el instanceof HTMLElement)) return;
            const rect = el.getBoundingClientRect();
            if (rect.width < 40 || rect.height < 40) return;
            points.push({
                label,
                x: Math.round(rect.left + rect.width * fx),
                y: Math.round(rect.top + rect.height * fy)
            });
        };
        pushPoint('main', document.querySelector('main') || document.querySelector('[role="main"]'), 0.5, 0.3);
        pushPoint('sidebar', document.querySelector('[data-gh-theme-host-sidebar-shell="true"]'), 0.5, 0.5);
        pushPoint('composer', document.querySelector('[data-gh-theme-host-composer-surface="true"]'), 0.5, 0.5);

        const isOurElement = (el) => (
            (typeof el.id === 'string' && (
                el.id.startsWith('chatgpt-helper') || el.id === 'chatgpt-helper-theme-bg-layer'
            )) ||
            (typeof el.className === 'string' && el.className.includes('chatgpt-helper'))
        );

        const results = {};
        for (const point of points) {
            const painters = [];
            const all = document.querySelectorAll('*');
            for (const el of all) {
                if (!(el instanceof HTMLElement) || el === document.documentElement || el === document.body) continue;
                if (isOurElement(el)) continue;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (point.x < rect.left || point.x > rect.right || point.y < rect.top || point.y > rect.bottom) continue;
                const cs = getComputedStyle(el);
                const bgAlphaMatch = /^rgba\((?:\d+,\s*){3},\s*([\d.]+)\)/.exec(cs.backgroundColor);
                const bgAlpha = bgAlphaMatch ? parseFloat(bgAlphaMatch[1]) : (cs.backgroundColor !== 'transparent' && cs.backgroundColor !== '' ? 1 : 0);
                const hasGradient = cs.backgroundImage !== 'none';
                const hasBackdrop = cs.backdropFilter !== 'none' && cs.backdropFilter !== '';
                if (bgAlpha <= 0.04 && !hasGradient && !hasBackdrop) continue;
                painters.push({
                    tag: el.tagName.toLowerCase(),
                    id: el.id || undefined,
                    cls: (typeof el.className === 'string' ? el.className : '').slice(0, 80) || undefined,
                    bg: cs.backgroundColor.slice(0, 36),
                    bi: hasGradient ? cs.backgroundImage.slice(0, 50) : undefined,
                    bdk: hasBackdrop ? cs.backdropFilter.slice(0, 30) : undefined,
                    z: cs.zIndex,
                    pos: cs.position
                });
            }
            results[point.label] = painters.slice(0, 12);
        }
        return results;
    },

    collectThemeDiagnostics() {
        const shell = document.querySelector('[data-gh-theme-host-sidebar-shell="true"]');
        const describe = (el) => {
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                tag: el.tagName.toLowerCase(),
                id: el.id || undefined,
                cls: (typeof el.className === 'string' ? el.className : '').slice(0, 120) || undefined,
                rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
                attrs: Array.from(el.attributes).filter(a => a.name.startsWith('data-gh')).map(a => a.name)
            };
        };
        const describeComputed = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {
                backgroundColor: cs.backgroundColor,
                backgroundImage: cs.backgroundImage.slice(0, 90),
                backdropFilter: cs.backdropFilter.slice(0, 40),
                boxShadow: cs.boxShadow.slice(0, 90),
                opacity: cs.opacity,
                zIndex: cs.zIndex,
                position: cs.position
            };
        };
        let sidebarCandidates = [];
        try {
            sidebarCandidates = Array.from(document.querySelectorAll('#stage-slideover-sidebar, [data-testid="sidebar"], [data-testid*="sidebar"], nav[aria-label], aside[aria-label]'))
                .slice(0, 8)
                .map(el => ({ ...describe(el), computed: describeComputed(el) }));
        } catch (e) {
            sidebarCandidates = ['query failed: ' + e.message];
        }
        const layer = document.getElementById('chatgpt-helper-theme-bg-layer');
        const rootStyle = document.documentElement.style;
        return {
            version: EXTENSION_VERSION,
            url: location.href.slice(0, 120),
            viewport: { w: window.innerWidth, h: window.innerHeight },
            rootAttrs: {
                bgEnabled: document.documentElement.getAttribute('data-gh-bg-enabled'),
                mode: document.documentElement.getAttribute('data-gh-mode'),
                pageTheme: document.documentElement.getAttribute('data-gh-page-theme')
            },
            themeConfig: this.getThemeConfig(),
            hasBackgroundObjectUrl: Boolean(this.themeBackgroundObjectUrl),
            backgroundReadError: this.themeBackgroundReadError || null,
            sidebarShell: describe(shell),
            sidebarShellComputed: describeComputed(shell),
            bgLayerComputed: layer ? {
                display: getComputedStyle(layer).display,
                hasImage: getComputedStyle(layer).backgroundImage.includes('url'),
                filter: getComputedStyle(layer).filter.slice(0, 60),
                zIndex: getComputedStyle(layer).zIndex
            } : 'missing',
            rootInlineVars: {
                sidebarBgDark: rootStyle.getPropertyValue('--gh-page-sidebar-bg-dark').slice(0, 90),
                sidebarBgLight: rootStyle.getPropertyValue('--gh-page-sidebar-bg-light').slice(0, 90),
                panelBlur: rootStyle.getPropertyValue('--gh-panel-blur'),
                enhanceAlphaDark: rootStyle.getPropertyValue('--gh-sidebar-enhance-alpha-dark')
            },
            sidebarCandidates,
            glassLayers: Array.from(document.querySelectorAll('.gh-theme-glass-layer')).map((node) => {
                const cs = getComputedStyle(node);
                return {
                    id: node.id,
                    host: node.parentElement ? (node.parentElement.tagName.toLowerCase() +
                        (node.parentElement.id ? '#' + node.parentElement.id : '')) : null,
                    backdropFilter: cs.backdropFilter.slice(0, 40),
                    zIndex: cs.zIndex,
                    position: cs.position,
                    pointerEvents: cs.pointerEvents
                };
            }),
            geometricShell: describe(this.findSidebarShellByGeometry()),
            coverProbe: (() => {
                try {
                    return this.probeThemeCoverStack();
                } catch (e) {
                    return 'probe failed: ' + e.message;
                }
            })()
        };
    },

    ensureThemeRuntimeStyle() {
        if (document.getElementById('chatgpt-helper-theme-runtime-style')) return;
        const style = document.createElement('style');
        style.id = 'chatgpt-helper-theme-runtime-style';
        style.textContent = THEME_RUNTIME_CSS;
        document.head.appendChild(style);
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

    async refreshThemeBackgroundState() {
        if (this.destroyed) return;
        const revision = this.themeBackgroundRevision = (this.themeBackgroundRevision || 0) + 1;
        const cfg = this.getThemeConfig();
        const assetId = cfg.backgroundAssetId;
        if (!cfg.backgroundImageEnabled || !assetId) {
            this.revokeThemeBackgroundObjectUrl();
            this.updateThemeVisualState();
            if (this.themeModalRefs) this.syncThemeModalState();
            return;
        }
        if (this.themeBackgroundObjectAssetId === assetId && this.themeBackgroundObjectUrl) {
            this.updateThemeVisualState();
            if (this.themeModalRefs) this.syncThemeModalState();
            return;
        }
        try {
            const row = await this.themeAssetRepository.getAsset(assetId);
            const current = this.getThemeConfig();
            // A late read must not restore an image that was disabled or replaced.
            if (this.destroyed || revision !== this.themeBackgroundRevision || current.backgroundAssetId !== assetId
                || !current.backgroundImageEnabled) return;
            const url = row?.blob ? URL.createObjectURL(row.blob) : null;
            this.revokeThemeBackgroundObjectUrl();
            this.themeBackgroundObjectUrl = url;
            this.themeBackgroundObjectAssetId = url ? assetId : null;
            // Missing page-origin storage is not proof the user's asset was deleted.
            // Keep the saved reference so backup restore / another origin can recover it.
            this.themeBackgroundReadError = url ? null : 'missing';
        } catch (error) {
            if (this.destroyed || revision !== this.themeBackgroundRevision) return;
            this.themeBackgroundReadError = 'unavailable';
            console.error('[ChatGPT Helper] 读取背景图片失败，已保留配置:', error);
        }
        this.updateThemeVisualState();
        if (this.themeModalRefs) this.syncThemeModalState();
    },

    scheduleThemeSettingSave() {
        if (this.themeSettingSaveTimer) {
            clearTimeout(this.themeSettingSaveTimer);
        }
        this.themeSettingSaveTimer = setTimeout(() => {
            this.themeSettingSaveTimer = null;
            try {
                this.saveSettings();
            } catch (e) {
                console.error('[ChatGPT Helper] 保存主题设置失败:', e);
            }
        }, 250);
    },

    syncThemeSurfaceVariables(canRenderBackground) {
        const root = document.documentElement;
        const isDark = this.currentEffectiveTheme === 'dark';
        const cfg = this.getThemeConfig();
        const preset = getThemePresetByKey(cfg.presetKey);
        const surfaceVars = buildThemeSurfaceVars(preset, {
            isDark,
            canRenderBackground,
            messageIntensity: cfg.messageGlassIntensity,
            panelIntensity: cfg.panelGlassIntensity
        });

        Object.entries(surfaceVars).forEach(([key, value]) => {
            if (root.style.getPropertyValue(key) !== value) root.style.setProperty(key, value);
        });
    },

    updateThemeVisualState() {
        this.ensureThemeRuntimeStyle();
        const cfg = this.getThemeConfig();
        const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl && this.themeBackgroundObjectAssetId === cfg.backgroundAssetId);
        const root = document.documentElement;
        const pageThemeEnabled = !getThemePresetByKey(cfg.presetKey).isOriginal;
        this.syncHelperThemeMode(this.detectEffectiveThemeFromDom());
        if (!this.themeHostTargets || canRenderBackground !== this.themeHadBackground) this.queueThemeHostRefresh();
        this.themeHadBackground = canRenderBackground;
        root.setAttribute('data-gh-theme-active', 'true');
        root.setAttribute('data-gh-theme-preset', cfg.presetKey || DEFAULT_THEME_CONFIG.presetKey);
        root.setAttribute('data-gh-page-theme', pageThemeEnabled ? 'true' : 'false');
        root.setAttribute('data-gh-bg-enabled', canRenderBackground ? 'true' : 'false');
        root.setAttribute('data-gh-msg-glass', cfg.messageGlassEnabled ? 'true' : 'false');
        root.setAttribute('data-gh-sidebar-enhance', cfg.sidebarTextEnhanceEnabled ? 'true' : 'false');
        root.style.setProperty('--gh-bg-image', this.sanitizeCssUrl(this.themeBackgroundObjectUrl));
        root.style.setProperty('--gh-bg-blur', `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`);
        root.style.setProperty('--gh-sidebar-enhance-alpha', (clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100).toFixed(2));
        root.style.setProperty('--gh-sidebar-enhance-alpha-dark', (clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100 * 0.4).toFixed(2));
        this.syncThemeSurfaceVariables(canRenderBackground);

        const layer = this.ensureThemeBackgroundLayer();
        layer.style.display = canRenderBackground ? 'block' : 'none';
        layer.style.backgroundImage = this.sanitizeCssUrl(this.themeBackgroundObjectUrl);
        if (!canRenderBackground) {
            // 壁纸关闭时移除注入的玻璃层，页面完全回到自身样式
            this.removeThemeGlassLayers();
        }

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
        const operation = this.themeAssetOperation = (this.themeAssetOperation || 0) + 1;
        // Verify the bytes before replacing a working wallpaper.
        const bitmap = await createImageBitmap(file).catch(() => {
            throw new Error(this.t('themeImageLoadFailed'));
        });
        bitmap.close();
        if (operation !== this.themeAssetOperation) return;
        const row = await this.themeAssetRepository.putAsset(file, file.type);
        if (operation !== this.themeAssetOperation) {
            await this.themeAssetRepository.deleteAsset(row.id).catch(() => undefined);
            return;
        }
        const cfg = this.getThemeConfig();
        const oldAssetId = cfg.backgroundAssetId;
        cfg.backgroundAssetId = row.id;
        cfg.backgroundImageEnabled = true;
        cfg.updatedAt = new Date().toISOString();
        this.saveSettings();
        await this.refreshThemeBackgroundState();
        if (oldAssetId && oldAssetId !== row.id) {
            await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => undefined);
        }
        if (operation === this.themeAssetOperation) this.showToast(this.t('themeUploadSuccess'));
    },

    async removeThemeBackgroundFile() {
        this.themeAssetOperation = (this.themeAssetOperation || 0) + 1;
        const cfg = this.getThemeConfig();
        const oldAssetId = cfg.backgroundAssetId;
        cfg.backgroundImageEnabled = false;
        cfg.backgroundAssetId = null;
        cfg.updatedAt = new Date().toISOString();
        this.saveSettings();
        await this.refreshThemeBackgroundState();
        if (oldAssetId) await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => undefined);
        this.showToast(this.t('themeBackgroundRemoved'));
    },

    async initializeThemeSystem() {
        if (this.destroyed) return;
        const cfg = this.getThemeConfig();
        this.refreshThemeHostTargets();
        this.applyThemePresetVariables(cfg.presetKey, false);
        await this.applyAppearanceMode(cfg.appearanceMode, {
            persist: false,
            showToast: false,
            preferNative: false
        });
        await this.refreshThemeBackgroundState();
        if (this.destroyed) return;
        this.queueThemeHostRefresh();
        this.startThemeHostWatchdog();
    },

    syncThemeModalState() {
        if (!this.themeModalRefs) return;
        const refs = this.themeModalRefs;
        const cfg = this.getThemeConfig();
        const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl && this.themeBackgroundObjectAssetId === cfg.backgroundAssetId);

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
        if (refs.wallpaperBlock) {
            refs.wallpaperBlock.classList.toggle('no-wallpaper', !canRenderBackground);
        }
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
        const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl && this.themeBackgroundObjectAssetId === cfg.backgroundAssetId);
        const isDark = this.currentEffectiveTheme === 'dark';
        const preset = getThemePresetByKey(cfg.presetKey);
        const pageThemeEnabled = !getThemePresetByKey(cfg.presetKey).isOriginal;
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
        if (this.aboutModal?.isConnected) {
            this.aboutModal.classList.add('open');
            this.aboutModal.querySelector('.chatgpt-helper-about-close')?.focus({ preventScroll: true });
            return;
        }
        this.aboutModalTrigger = triggerElement?.focus ? triggerElement : document.activeElement;

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
        header.appendChild(createElement('div', { className: 'chatgpt-helper-about-hero-glow', 'aria-hidden': 'true' }));
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
            { icon: 'edit', label: this.t('aboutFeaturePrompts') || 'Prompt management and quick insertion' },
            { icon: 'list', label: this.t('aboutFeatureOutline') || 'Automatic outline generation and navigation' },
            { icon: 'message', label: this.t('aboutFeatureConversations') || 'Conversation organization and batch actions' },
            { icon: 'export', label: this.t('aboutFeatureExport') || 'Multi-format export and reading-position tools' }
        ].forEach((feature, index) => {
            const item = createElement('li', { className: 'chatgpt-helper-about-feature-item' });
            const featureIcon = createElement('span', { className: 'chatgpt-helper-about-feature-icon' });
            featureIcon.appendChild(createSvgIconNode(feature.icon, { size: 14, strokeWidth: '2.2' }));
            item.appendChild(featureIcon);
            item.appendChild(createElement('span', { className: 'chatgpt-helper-about-feature-label' }, feature.label));
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
        const authorAvatar = createElement('div', { className: 'chatgpt-helper-about-avatar' });
        authorAvatar.appendChild(createSvgIconNode('user', { size: 22, strokeWidth: '2' }));
        authorBody.appendChild(authorAvatar);
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
        this.aboutModalFrame = requestAnimationFrame(() => {
            this.aboutModalFrame = null;
            if (this.aboutModal !== overlay || !overlay.isConnected) return;
            overlay.classList.add('open');
            closeBtn.focus({ preventScroll: true });
        });
    },

    closeAboutModal() {
        cancelAnimationFrame(this.aboutModalFrame);
        this.aboutModalFrame = null;
        const modal = this.aboutModal;
        const trigger = this.aboutModalTrigger;
        if (this.aboutModalBackdropHandler) modal?.removeEventListener('click', this.aboutModalBackdropHandler);
        if (this.aboutModalEscHandler) document.removeEventListener('keydown', this.aboutModalEscHandler, true);
        this.aboutModal = null;
        this.aboutModalTrigger = null;
        this.aboutModalBackdropHandler = null;
        this.aboutModalEscHandler = null;
        // Remove synchronously: no hidden dialog can intercept a quick reopen,
        // and no delayed callback can steal focus from the next dialog.
        modal?.remove();
        if (!this.destroyed && trigger?.isConnected) trigger.focus({ preventScroll: true });
    },

    openThemeSettingsModal(triggerElement = null) {
        if (this.themeModal?.isConnected) {
            this.syncThemeModalState();
            this.themeModal.classList.add('open');
            this.themeModal.querySelector('.chatgpt-helper-theme-modal-close')?.focus({ preventScroll: true });
            return;
        }
        this.themeModalTrigger = triggerElement?.focus ? triggerElement : document.activeElement;

        const overlay = createElement('div', { id: 'chatgpt-helper-theme-modal' });
        const dialog = createElement('div', {
            className: 'chatgpt-helper-theme-modal-dialog',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-labelledby': 'chatgpt-helper-theme-modal-title'
        });
        const header = createElement('div', { className: 'chatgpt-helper-theme-modal-header' });
        const headerTitle = createElement('div', { className: 'chatgpt-helper-theme-modal-title', id: 'chatgpt-helper-theme-modal-title' });
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

        const blurRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
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

        const messageGlassRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
        messageGlassRow.appendChild(createElement('span', {}, this.t('themeMessageGlass') || 'Message Glass Effect'));
        const messageGlass = createElement('input', { type: 'checkbox' });
        messageGlassRow.appendChild(messageGlass);
        wallpaperBlock.appendChild(messageGlassRow);

        const messageGlassIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
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

        const panelGlassIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
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

        const sidebarEnhanceRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
        sidebarEnhanceRow.appendChild(createElement('span', {}, this.t('themeSidebarEnhance') || 'Sidebar Text Enhance'));
        const sidebarEnhance = createElement('input', { type: 'checkbox' });
        sidebarEnhanceRow.appendChild(sidebarEnhance);
        wallpaperBlock.appendChild(sidebarEnhanceRow);

        const sidebarEnhanceIntensityRow = createElement('div', { className: 'chatgpt-helper-theme-row wallpaper-dependent' });
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
            this.scheduleThemeSettingSave();
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
            this.scheduleThemeSettingSave();
            this.updateThemeVisualState();
        });

        panelGlassIntensityRange.addEventListener('input', () => {
            const cfg = this.getThemeConfig();
            cfg.panelGlassIntensity = Math.round(clampNumber(panelGlassIntensityRange.value, 0, 100));
            cfg.updatedAt = new Date().toISOString();
            panelGlassIntensityValue.textContent = `${cfg.panelGlassIntensity}%`;
            this.scheduleThemeSettingSave();
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
            this.scheduleThemeSettingSave();
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
            wallpaperBlock,
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
        this.themeModalFrame = requestAnimationFrame(() => {
            this.themeModalFrame = null;
            if (this.themeModal !== overlay || !overlay.isConnected) return;
            overlay.classList.add('open');
            closeBtn.focus({ preventScroll: true });
        });
    },

    closeThemeSettingsModal() {
        cancelAnimationFrame(this.themeModalFrame);
        this.themeModalFrame = null;
        const modal = this.themeModal;
        const trigger = this.themeModalTrigger;
        if (this.themeModalBackdropHandler) modal?.removeEventListener('click', this.themeModalBackdropHandler);
        if (this.themeModalEscHandler) document.removeEventListener('keydown', this.themeModalEscHandler, true);
        this.themeModal = null;
        this.themeModalTrigger = null;
        this.themeModalRefs = null;
        this.themeModalEscHandler = null;
        this.themeModalBackdropHandler = null;
        modal?.remove();
        if (!this.destroyed && trigger?.isConnected) trigger.focus({ preventScroll: true });
    }
};
