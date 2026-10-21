
// Theme styles are generated once from semantic host roles, not site utility classes.
const THEME_RUNTIME_CSS = `
    :root[data-gh-mode="light"] {
        --gh-page-text: #202123;
        --gh-page-muted: #62676f;
        --gh-page-surface: #ffffff;
        --gh-page-sidebar: var(--gh-page-sidebar-bg-light, #f9f9f9);
        --gh-page-composer: var(--gh-page-composer-bg-light, #ffffff);
        --gh-wallpaper-tint: rgba(255, 255, 255, .48);
    }
    :root[data-gh-mode="dark"] {
        --gh-page-text: #ececf1;
        --gh-page-muted: #b4b4bd;
        --gh-page-surface: #212121;
        --gh-page-sidebar: var(--gh-page-sidebar-bg-dark, #171717);
        --gh-page-composer: var(--gh-page-composer-bg-dark, #2f2f2f);
        --gh-wallpaper-tint: rgba(12, 15, 20, .52);
    }
    /* Native markdown may retain a prose-invert class after a theme change.
       Override its semantic palette, leaving code blocks and embedded cards alone. */
    :root[data-gh-theme-active="true"] :is(main, [role="main"]) {
        color: var(--gh-page-text);
    }
    :root[data-gh-theme-active="true"] :is([data-markdown-text-style="assistant-message"], [data-message-author-role="assistant"] .markdown) {
        --tw-prose-body: var(--gh-page-text);
        --tw-prose-headings: var(--gh-page-text);
        --tw-prose-bold: var(--gh-page-text);
        --tw-prose-quotes: var(--gh-page-text);
        --tw-prose-counters: var(--gh-page-muted);
        --tw-prose-bullets: var(--gh-page-muted);
        color: var(--gh-page-text) !important;
    }
    :root[data-gh-theme-active="true"] :is([data-markdown-text-style="assistant-message"], [data-message-author-role="assistant"] .markdown) :is(p, h1, h2, h3, h4, h5, h6, li, strong, em, blockquote):not(pre *) {
        color: inherit;
    }
    :root[data-gh-page-theme="true"] [data-gh-theme-host-sidebar-shell="true"] {
        background: var(--gh-page-sidebar) !important;
    }
    :root[data-gh-page-theme="true"] [data-gh-theme-host-composer-surface="true"] {
        background: var(--gh-page-composer) !important;
    }
    :root[data-gh-page-theme="true"] :is(main, [role="main"]) a {
        color: var(--gh-page-link);
    }
    :root[data-gh-page-theme="true"] :is(main, [role="main"]) ::selection {
        background: var(--gh-page-selection);
    }

    /* An isolated body paints the negative wallpaper above its own background.
       No transform/filter is applied to an ancestor of native fixed UI. */
    :root[data-gh-bg-enabled="true"] body { isolation: isolate; }
    #chatgpt-helper-theme-bg-layer {
        position: fixed;
        inset: -40px;
        z-index: -1;
        pointer-events: none;
        display: none;
        background: var(--gh-bg-image, none) center / cover no-repeat;
        filter: blur(var(--gh-bg-blur, 5px));
    }
    #chatgpt-helper-theme-bg-layer::after {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--gh-wallpaper-tint);
    }
    :root[data-gh-bg-enabled="true"] #chatgpt-helper-theme-bg-layer { display: block; }
    :root[data-gh-bg-enabled="true"] :is(
        [data-gh-theme-host-clear="true"],
        [data-gh-theme-host-main="true"],
        [data-gh-theme-host-chat-list="true"],
        [data-gh-theme-host-sidebar="true"],
        [data-gh-theme-host-composer="true"],
        [data-gh-theme-host-composer-surface="true"]
    ) {
        background: transparent !important;
        box-shadow: none !important;
    }
    /* The current thread shell paints an opaque surface in ::before. Its own
       computed background is transparent, so clearing only the element misses it. */
    :root[data-gh-bg-enabled="true"] [data-gh-theme-host-clear="true"]::before,
    :root[data-gh-bg-enabled="true"] [data-gh-theme-host-clear="true"]::after {
        background: transparent !important;
        box-shadow: none !important;
    }
    :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] {
        --sidebar-mask-bg: transparent;
        --sidebar-surface-primary: transparent;
        --sidebar-surface-secondary: transparent;
        --sidebar-surface-tertiary: transparent;
        background: transparent !important;
    }
    :root[data-gh-bg-enabled="true"] :is([data-gh-theme-host-sidebar-shell="true"], [data-gh-theme-host-composer-surface="true"]) {
        isolation: isolate;
    }
    [data-gh-theme-relative="true"] { position: relative; }
    .gh-theme-glass-layer {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        border-radius: inherit;
        background: var(--gh-page-sidebar);
        backdrop-filter: blur(var(--gh-panel-blur, 14px));
        box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
    }
    .gh-theme-glass-layer.gh-glass-composer {
        background: var(--gh-page-composer);
        backdrop-filter: blur(var(--gh-composer-blur, 16px));
        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-composer-shadow);
    }
    :root[data-gh-sidebar-enhance="true"][data-gh-mode="light"] .gh-glass-sidebar {
        box-shadow: inset 0 0 0 9999px rgba(255,255,255,var(--gh-sidebar-enhance-alpha, .2));
    }
    :root[data-gh-sidebar-enhance="true"][data-gh-mode="dark"] .gh-glass-sidebar {
        box-shadow: inset 0 0 0 9999px rgba(15,15,16,var(--gh-sidebar-enhance-alpha-dark, .08));
    }
    :root[data-gh-bg-enabled="false"] .gh-theme-glass-layer { display: none; }
    :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] :is(a, button):hover {
        background: var(--gh-sidebar-button-bg);
    }
    :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
        background: var(--gh-right-overlay) !important;
        backdrop-filter: blur(var(--gh-panel-blur));
    }
    :root[data-gh-bg-enabled="true"] #chatgpt-helper-content { background: transparent !important; }
    :root[data-gh-bg-enabled="true"] :is(#chatgpt-helper-tabs, .chatgpt-helper-search-bar, .chatgpt-helper-categories, .outline-fixed-toolbar) {
        background: var(--gh-panel-card-bg) !important;
    }
    :root[data-gh-bg-enabled="true"] :is(.chatgpt-helper-prompt-item, .outline-item.user-query-node, .chatgpt-helper-theme-block) {
        background: var(--gh-panel-card-bg) !important;
        border-color: var(--gh-panel-card-border);
    }
    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] :is([data-user-message-bubble="true"], [data-message-author-role="user"] .whitespace-pre-wrap) {
        background: var(--gh-msg-user-bg) !important;
        backdrop-filter: blur(var(--gh-msg-blur));
        border-radius: 24px;
        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
    }
    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] :is([data-markdown-text-style="assistant-message"], [data-message-author-role="assistant"] .markdown) {
        background: var(--gh-msg-assistant-bg) !important;
        backdrop-filter: blur(var(--gh-msg-blur));
        border-radius: 24px;
        padding: 14px 18px;
        box-shadow: inset 0 0 0 1px var(--gh-msg-border), var(--gh-msg-shadow);
    }
`;

export { THEME_RUNTIME_CSS };
