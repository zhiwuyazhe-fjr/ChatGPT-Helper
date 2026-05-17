(function() {
  "use strict";
  (function() {
    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    const SETTING_KEYS = {
      PROMPTS: "chatgpt_prompts",
      SETTINGS: "chatgpt_settings",
      DEFAULT_PANEL_STATE: "chatgpt_default_panel_state",
      PANEL_WIDTH: "chatgpt_panel_width",
      LANGUAGE: "chatgpt_language"
    };
    const I18N = {
      "zh-CN": {
        panelTitle: "ChatGPT Helper",
        tabPrompts: "提示词",
        tabOutline: "大纲",
        tabConversations: "会话",
        tabExport: "导出",
        tabSettings: "设置",
        searchPlaceholder: "搜索提示词...",
        addPrompt: "添加新提示词",
        allCategory: "全部",
        refresh: "刷新",
        expand: "展开",
        collapse: "收起",
        edit: "编辑",
        delete: "删除",
        save: "保存",
        cancel: "取消",
        add: "添加",
        title: "标题",
        category: "分类",
        content: "提示词内容",
        promptUpdated: "提示词已更新",
        promptAdded: "提示词已添加",
        deleted: "已删除",
        copied: "已复制到剪贴板",
        refreshed: "已刷新",
        inserted: "已插入提示词",
        confirmDelete: "确定删除?",
        fillTitleContent: "请填写标题和内容",
        noConversations: "暂无会话",
        syncConversations: "同步会话",
        newFolder: "新建文件夹",
        deleteFolder: "删除文件夹",
        deleteFolderConfirm: '确定要删除文件夹 "{name}" 吗？\n文件夹内的会话将移动到收件箱。',
        folderDeleted: "文件夹已删除",
        batchMode: "批量操作",
        batchComplete: "完成",
        selected: "已选择",
        items: "项",
        move: "移动",
        export: "导出",
        pinned: "置顶",
        unpinned: "取消置顶",
        moved: "已移动",
        exported: "已导出",
        synced: "已同步",
        newSessions: "个新会话",
        updatedSessions: "个会话",
        exportFormat: "选择导出格式：\n1. Markdown\n2. JSON\n3. TXT",
        exportSuccess: "导出成功",
        exportFailed: "导出失败",
        noContent: "未找到对话内容",
        openFirst: "请先打开会话",
        settingsTitle: "设置",
        panelSettings: "面板设置",
        featureSettings: "功能设置",
        readingHistory: "阅读历史",
        anchorSettings: "锚点设置",
        copySettings: "复制功能",
        tabFunctionSettings: "tab栏功能",
        tabOrderSettings: "tab栏功能",
        tabPageSettings: "标签页设置",
        languageSettings: "语言设置",
        language: "界面语言",
        autoDetect: "自动检测",
        chinese: "简体中文",
        english: "English",
        themeSettingsSection: "主题设置",
        openThemeSettings: "打开主题设置",
        themeDialogTitle: "主题",
        themeAppearance: "外观",
        themeAppearanceSystem: "跟随系统",
        themeAppearanceLight: "浅色",
        themeAppearanceDark: "深色",
        themeColorPresets: "颜色",
        themePresetOriginal: "原始主题",
        themeWallpaper: "壁纸",
        themeEnableWallpaper: "启用壁纸",
        themeDropImage: "将图片拖放到这里",
        themeFileTypes: "支持 PNG、JPG、WebP，最大 5MB",
        themeSelectFile: "选择文件",
        themeRemoveImage: "移除背景图",
        themeBlur: "模糊",
        themeMessageGlass: "消息毛玻璃效果",
        themeMessageGlassIntensity: "消息毛玻璃强度",
        themePanelGlassIntensity: "侧栏/右栏毛玻璃强度",
        themeSidebarEnhance: "侧栏文字增强",
        themeSidebarEnhanceIntensity: "增强强度",
        themeLivePreview: "实时预览",
        themeUploadSuccess: "背景图片已更新",
        themeBackgroundRemoved: "背景图片已移除",
        themeNoBackground: "暂无背景图片",
        themeInvalidType: "仅支持 PNG/JPG/WebP 格式",
        themeFileTooLarge: "图片大小不能超过 5MB",
        themeImageLoadFailed: "图片加载失败，请重试",
        themeSwitchedLight: "已切换到浅色模式",
        themeSwitchedDark: "已切换到深色模式",
        themeSwitchFailed: "主题切换失败",
        aboutButton: "关于",
        aboutTopEntryTitle: "关于",
        aboutDialogTitle: "关于 ChatGPT Helper",
        aboutTagline: "为重度 ChatGPT 使用者打造的高效增强工作台",
        aboutMotivationTitle: "😘 开发动机",
        aboutMotivationContent: "这不仅仅是一个插件，更是一位 TJU 计算机学生对极致体验的追求。作为 ChatGPT 的重度使用者，我亲手打造了这个工具包，只为消除那些恼人的小摩擦。愿它能陪你翻过琐碎的深山，去看见真正重要的奇思妙想。",
        aboutFeedbackTitle: "💬 反馈",
        aboutFeatureRequest: "功能建议",
        aboutBugSupport: "问题反馈 / 支持",
        aboutOpenSourceTitle: "🌱 开源项目",
        aboutSupportTitle: "💕 支持项目",
        aboutSupportContent: "ChatGPT Helper的成长，离不开你的每一次高效交互。如果它曾为你节省过一分钟，或带来过一次惊喜，请考虑支持它的未来。每一份认可，都是我继续敲下下一行代码的动力💕",
        aboutShare: "分享给朋友",
        aboutAuthorTitle: "👨‍💻 关于作者",
        aboutAuthorBio: "📍 TJU | CS 在读\n🚀 AI 探索者 | 预备役创业者\n✨ Elon Musk 信徒",
        aboutFooterNote: "多平台兼容 · 本地解析零上传 · 重度 ChatGPT 玩家的效率工具包",
        aboutRepoButton: "GitHub 仓库",
        aboutRepoLabel: "项目仓库",
        aboutAuthorGithub: "作者 GitHub",
        aboutClose: "关闭",
        aboutCopyRepoSuccess: "分享链接已复制",
        aboutCopyRepoFailed: "复制失败，请手动复制仓库链接",
        aboutVersionTitle: "版本信息",
        aboutVersionLabel: "版本",
        aboutAuthorLabel: "作者",
        aboutLicenseLabel: "许可证",
        aboutPoweredBy: "为专注的 ChatGPT 工作流打造❤️",
        aboutIntroTitle: "项目简介",
        aboutIntro: "ChatGPT Helper 通过右侧功能面板为 ChatGPT 提供提示词管理、对话大纲、会话整理、导出与阅读定位等增强能力，尽量保持原页面结构不被打断。",
        aboutFeaturesTitle: "核心能力",
        aboutFeaturePrompts: "提示词管理与快速插入",
        aboutFeatureOutline: "自动生成对话大纲与导航",
        aboutFeatureConversations: "历史会话整理与批量管理",
        aboutFeatureExport: "多格式导出与阅读定位增强",
        aboutSupportSites: "支持 chatgpt.com、chat.openai.com 与 new.oaifree.com",
        aboutPrivacyTitle: "隐私与权限",
        aboutPrivacy: "所有设置与数据处理均在本地浏览器完成；扩展使用 storage 保存配置，notifications 仅用于完成提醒，不会上传对话内容。",
        pageSettings: "页面设置",
        outlineSettings: "大纲设置",
        searchConversations: "搜索会话...",
        selectConversationsFirst: "请先选择要操作的会话",
        panelWidthLabel: "面板宽度",
        defaultPanelOpenLabel: "默认展开面板",
        enablePromptsLabel: "启用提示词",
        enableOutlineLabel: "启用大纲",
        showUserMessagesLabel: "显示用户消息",
        enableConversationsLabel: "启用会话管理",
        preventAutoScrollLabel: "防止自动滚动",
        limitPageWidthLabel: "限制页面宽度",
        pageWidthValueLabel: "页面宽度值",
        pageWidthUnitLabel: "宽度单位",
        collapsedButtonsDesc: "调整折叠面板按钮的显示顺序",
        collapsedButtonsTitle: "折叠按钮",
        enableReadingHistoryLabel: "启用阅读历史",
        autoRestoreLabel: "自动跳转",
        historyDaysLabel: "历史保留时间（天）",
        autoUpdateOutlineLabel: "对话期间自动更新大纲",
        outlineIntervalLabel: "更新检测间隔（秒）",
        outlineSyncScrollLabel: "同步滚动",
        outlineMaxLevelLabel: "最大标题层级",
        tabAutoRenameLabel: "自动重命名标签页",
        tabRenameIntervalLabel: "重命名检测间隔（秒）",
        tabShowStatusLabel: "显示生成状态",
        tabDesktopNotifyLabel: "发送桌面通知",
        tabPlaySoundLabel: "播放通知声音",
        tabVolumeLabel: "通知音量（0.1-1.0）",
        tabNotifyWhenFocusedLabel: "前台时也通知",
        tabAutoFocusLabel: "自动聚焦窗口",
        tabPrivacyModeLabel: "隐私模式",
        tabPrivacyTitleLabel: "隐私模式标题",
        enableFormulaCopyLabel: "启用公式复制",
        formulaDelimiterLabel: "公式使用 LaTeX 分隔符（$ / $$）",
        enableTableCopyLabel: "启用表格复制",
        // 大纲相关文案
        outlineEmpty: "暂无大纲",
        outlineSearchResult: "条结果",
        outlineExpandAll: "展开全部",
        outlineCollapseAll: "折叠全部",
        outlineShowUserQueriesTooltip: "显示用户提问",
        outlineHideUserQueriesTooltip: "隐藏用户提问",
        outlineLocateCurrent: "定位当前位置",
        outlineSearch: "搜索大纲...",
        outlineOnlyUserQueries: "只显示用户提问",
        outlineScrollBottom: "滚动到底部",
        outlineScrollTop: "滚动到顶部",
        clear: "清除",
        // Button labels for collapsed buttons
        buttonScrollTop: "顶部",
        buttonAnchor: "锚点",
        buttonTheme: "主题",
        buttonManualAnchor: "手动锚点",
        buttonScrollBottom: "底部",
        // Button actions
        moveUp: "上移",
        moveDown: "下移",
        buttonOrderUpdated: "已更新按钮顺序",
        enabled: "已启用",
        disabled: "已禁用"
      },
      "en": {
        panelTitle: "ChatGPT Helper",
        tabPrompts: "Prompts",
        tabOutline: "Outline",
        tabConversations: "Conversations",
        tabExport: "Export",
        tabSettings: "Settings",
        searchPlaceholder: "Search prompts...",
        addPrompt: "Add New Prompt",
        allCategory: "All",
        refresh: "Refresh",
        expand: "Expand",
        collapse: "Collapse",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        add: "Add",
        title: "Title",
        category: "Category",
        content: "Prompt Content",
        promptUpdated: "Prompt updated",
        promptAdded: "Prompt added",
        deleted: "Deleted",
        copied: "Copied to clipboard",
        refreshed: "Refreshed",
        inserted: "Prompt inserted",
        confirmDelete: "Delete this prompt?",
        fillTitleContent: "Please fill in title and content",
        noConversations: "No conversations",
        syncConversations: "Sync Conversations",
        newFolder: "New Folder",
        deleteFolder: "Delete folder",
        deleteFolderConfirm: 'Delete folder "{name}"?\nConversations in this folder will be moved to Inbox.',
        folderDeleted: "Folder deleted",
        batchMode: "Batch Mode",
        batchComplete: "Complete",
        selected: "Selected",
        items: "items",
        move: "Move",
        export: "Export",
        pinned: "Pinned",
        unpinned: "Unpinned",
        moved: "Moved",
        exported: "Exported",
        synced: "Synced",
        newSessions: "new sessions",
        updatedSessions: "sessions",
        exportFormat: "Select export format:\n1. Markdown\n2. JSON\n3. TXT",
        exportSuccess: "Export successful",
        exportFailed: "Export failed",
        noContent: "No conversation content found",
        openFirst: "Please open the conversation first",
        settingsTitle: "Settings",
        panelSettings: "Panel Settings",
        featureSettings: "Feature Settings",
        readingHistory: "Reading History",
        anchorSettings: "Anchor Settings",
        copySettings: "Copy Features",
        tabFunctionSettings: "Tab Settings",
        tabOrderSettings: "Tab Functions",
        tabPageSettings: "Tab Settings",
        languageSettings: "Language Settings",
        language: "Interface Language",
        autoDetect: "Auto Detect",
        chinese: "简体中文",
        english: "English",
        themeSettingsSection: "Theme Settings",
        openThemeSettings: "Open Theme Settings",
        themeDialogTitle: "Theme",
        themeAppearance: "Appearance",
        themeAppearanceSystem: "System",
        themeAppearanceLight: "Light",
        themeAppearanceDark: "Dark",
        themeColorPresets: "Colors",
        themePresetOriginal: "Original",
        themeWallpaper: "Wallpaper",
        themeEnableWallpaper: "Enable Wallpaper",
        themeDropImage: "Drop image here",
        themeFileTypes: "PNG/JPG/WebP up to 5MB",
        themeSelectFile: "Select File",
        themeRemoveImage: "Remove Background",
        themeBlur: "Blur",
        themeMessageGlass: "Message Glass Effect",
        themeMessageGlassIntensity: "Message Glass Intensity",
        themePanelGlassIntensity: "Side Panel Glass Intensity",
        themeSidebarEnhance: "Sidebar Text Enhance",
        themeSidebarEnhanceIntensity: "Enhance Intensity",
        themeLivePreview: "Live Preview",
        themeUploadSuccess: "Background image updated",
        themeBackgroundRemoved: "Background image removed",
        themeNoBackground: "No background image",
        themeInvalidType: "Only PNG/JPG/WebP is supported",
        themeFileTooLarge: "Image size must be 5MB or less",
        themeImageLoadFailed: "Image loading failed, please try again",
        themeSwitchedLight: "Switched to light mode",
        themeSwitchedDark: "Switched to dark mode",
        themeSwitchFailed: "Theme switch failed",
        aboutButton: "About",
        aboutTopEntryTitle: "About",
        aboutDialogTitle: "About ChatGPT Helper",
        aboutTagline: "A focused productivity layer designed for heavy ChatGPT users",
        aboutMotivationTitle: "😘 Motivation",
        aboutMotivationContent: "😘This is more than just an extension. It is one TJU computer science student's pursuit of a smoother, more delightful ChatGPT experience. As a heavy ChatGPT user, I built this toolkit by hand to remove the tiny frictions that keep interrupting real thinking. I hope it helps you get past the busy clutter and spend more time on ideas that truly matter.",
        aboutFeedbackTitle: "💬 Feedback",
        aboutFeatureRequest: "Feature Request",
        aboutBugSupport: "Bug Report / Support",
        aboutOpenSourceTitle: "🌱 Open Source",
        aboutSupportTitle: "💕 Support the Project",
        aboutSupportContent: "The growth of ChatGPT Helper comes from every efficient interaction you have with it. If it has ever saved you a minute or brought you a small surprise, please consider supporting its future. Every bit of recognition is fuel for the next line of code. 💕",
        aboutShare: "Share with Friends",
        aboutAuthorTitle: "👨‍💻 About the Author",
        aboutAuthorBio: "📍 TJU | CS 在读\n🚀 AI 探索者 | 预备役创业者\n✨ Elon Musk 信徒",
        aboutFooterNote: "Works on chatgpt.com, chat.openai.com, and new.oaifree.com · Local-first, no conversation uploads",
        aboutRepoButton: "GitHub Repository",
        aboutRepoLabel: "Repository",
        aboutAuthorGithub: "Author GitHub",
        aboutClose: "Close",
        aboutCopyRepoSuccess: "Share link copied",
        aboutCopyRepoFailed: "Copy failed, please copy the repository link manually",
        aboutVersionTitle: "Version Info",
        aboutVersionLabel: "Version",
        aboutAuthorLabel: "Author",
        aboutLicenseLabel: "License",
        aboutPoweredBy: "Built for focused ChatGPT workflows",
        aboutIntroTitle: "Overview",
        aboutIntro: "ChatGPT Helper adds a focused side panel for prompt management, outlines, conversation organization, exports, and reading-position utilities while keeping the native ChatGPT flow familiar.",
        aboutFeaturesTitle: "Core Features",
        aboutFeaturePrompts: "Prompt management and quick insertion",
        aboutFeatureOutline: "Automatic outline generation and navigation",
        aboutFeatureConversations: "Conversation organization and batch actions",
        aboutFeatureExport: "Multi-format export and reading-position tools",
        aboutSupportSites: "Works on chatgpt.com, chat.openai.com, and new.oaifree.com",
        aboutPrivacyTitle: "Privacy & Permissions",
        aboutPrivacy: "All settings and data processing stay in your browser. The extension uses storage for local preferences and notifications only for completion alerts.",
        pageSettings: "Page Settings",
        outlineSettings: "Outline Settings",
        searchConversations: "Search conversations...",
        selectConversationsFirst: "Please select conversations first",
        panelWidthLabel: "Panel Width",
        defaultPanelOpenLabel: "Open Panel by Default",
        enablePromptsLabel: "Prompts",
        enableOutlineLabel: "Outline",
        showUserMessagesLabel: "Show User Messages",
        enableConversationsLabel: "Conversation Manager",
        preventAutoScrollLabel: "Prevent Auto Scroll",
        limitPageWidthLabel: "Limit Page Width",
        pageWidthValueLabel: "Page Width Value",
        pageWidthUnitLabel: "Width Unit",
        collapsedButtonsDesc: "Adjust the order of collapsed panel buttons",
        collapsedButtonsTitle: "Collapsed Buttons",
        enableReadingHistoryLabel: "Reading History",
        autoRestoreLabel: "Auto Restore Position",
        historyDaysLabel: "History Retention Days",
        autoUpdateOutlineLabel: "Auto Update Outline During Conversation",
        outlineIntervalLabel: "Update Interval (seconds)",
        outlineSyncScrollLabel: "Sync Scroll",
        outlineMaxLevelLabel: "Max Heading Level",
        tabAutoRenameLabel: "Auto Rename Tab",
        tabRenameIntervalLabel: "Rename Check Interval (seconds)",
        tabShowStatusLabel: "Show Generation Status",
        tabDesktopNotifyLabel: "Desktop Notification",
        tabPlaySoundLabel: "Play Notification Sound",
        tabVolumeLabel: "Notification Volume (0.1–1.0)",
        tabNotifyWhenFocusedLabel: "Notify Even When Tab is Focused",
        tabAutoFocusLabel: "Auto Focus Window",
        tabPrivacyModeLabel: "Privacy Mode",
        tabPrivacyTitleLabel: "Privacy Mode Title",
        enableFormulaCopyLabel: "Formula Copy",
        formulaDelimiterLabel: "Use LaTeX Delimiters ($ / $$)",
        enableTableCopyLabel: "Table Copy",
        languageChanged: "Language changed",
        // Outline related
        outlineEmpty: "No outline",
        outlineSearchResult: "results",
        outlineExpandAll: "Expand All",
        outlineCollapseAll: "Collapse All",
        outlineShowUserQueriesTooltip: "Show user queries",
        outlineHideUserQueriesTooltip: "Hide user queries",
        outlineLocateCurrent: "Locate Current Position",
        outlineSearch: "Search outline...",
        outlineOnlyUserQueries: "Only show user queries",
        outlineScrollBottom: "Scroll to bottom",
        outlineScrollTop: "Scroll to top",
        clear: "Clear",
        // Button labels for collapsed buttons
        buttonScrollTop: "Top",
        buttonAnchor: "Anchor",
        buttonTheme: "Theme",
        buttonManualAnchor: "Manual Anchor",
        buttonScrollBottom: "Bottom",
        // Button actions
        moveUp: "Move Up",
        moveDown: "Move Down",
        buttonOrderUpdated: "Button order updated",
        enabled: "Enabled",
        disabled: "Disabled"
      }
    };
    function detectLanguage() {
      const savedLang = window.GM_getValue(SETTING_KEYS.LANGUAGE, "auto");
      if (savedLang !== "auto" && I18N[savedLang]) {
        return savedLang;
      }
      const lang = navigator.language || navigator.userLanguage || "en";
      if (lang.startsWith("zh")) {
        return "zh-CN";
      }
      return "en";
    }
    let currentLang = detectLanguage();
    function t(key) {
      return I18N[currentLang]?.[key] || I18N["en"]?.[key] || key;
    }
    const TAB_DEFINITIONS = {
      prompts: { id: "prompts", label: "提示词", iconName: "edit" },
      outline: { id: "outline", label: "大纲", iconName: "list" },
      conversations: { id: "conversations", label: "会话", iconName: "message" },
      export: { id: "export", label: "导出", iconName: "export" },
      settings: { id: "settings", label: "设置", iconName: "settings" }
    };
    const COLLAPSED_BUTTON_DEFS = {
      scrollTop: { iconName: "arrowUp", labelKey: "buttonScrollTop", canToggle: false, isPanelOnly: false },
      panel: { icon: "", iconType: "helper-logo", labelKey: null, label: "ChatGPT Helper", canToggle: false, isPanelOnly: true },
      anchor: { iconName: "anchor", labelKey: "buttonAnchor", canToggle: true, isPanelOnly: true },
      theme: { iconName: "sun", labelKey: "buttonTheme", canToggle: true, isPanelOnly: true },
      manualAnchor: { iconName: "pin", labelKey: "buttonManualAnchor", canToggle: true, isPanelOnly: false, isGroup: true },
      scrollBottom: { iconName: "arrowDown", labelKey: "buttonScrollBottom", canToggle: false, isPanelOnly: false }
    };
    const DEFAULT_COLLAPSED_BUTTONS_ORDER = [
      { id: "scrollTop", enabled: true },
      { id: "panel", enabled: true },
      { id: "anchor", enabled: true },
      { id: "theme", enabled: true },
      { id: "manualAnchor", enabled: true },
      { id: "scrollBottom", enabled: true }
    ];
    const THEME_PRESETS = [
      { key: "original", labelKey: "themePresetOriginal", primary: "#64748b", secondary: "#94a3b8", accent: "#475569", light: "#f8fafc", isOriginal: true },
      { key: "blue", primary: "#4285f4", secondary: "#60a5fa", accent: "#2563eb", light: "#eaf2ff" },
      { key: "gray", primary: "#52525b", secondary: "#71717a", accent: "#3f3f46", light: "#f3f4f6" },
      { key: "red", primary: "#dc2626", secondary: "#f87171", accent: "#b91c1c", light: "#ffecec" },
      { key: "pink", primary: "#db2777", secondary: "#f472b6", accent: "#be185d", light: "#ffe6f3" },
      { key: "purple", primary: "#9333ea", secondary: "#c084fc", accent: "#7e22ce", light: "#f2e9ff" },
      { key: "cyan", primary: "#0891b2", secondary: "#22d3ee", accent: "#0e7490", light: "#e2fbff" },
      { key: "teal", primary: "#0d9488", secondary: "#2dd4bf", accent: "#0f766e", light: "#e2fdf8" },
      { key: "green", primary: "#16a34a", secondary: "#4ade80", accent: "#15803d", light: "#e8ffe8" },
      { key: "yellow", primary: "#ca8a04", secondary: "#facc15", accent: "#a16207", light: "#fff8d8" },
      { key: "orange", primary: "#ea580c", secondary: "#fb923c", accent: "#c2410c", light: "#fff0e4" }
    ];
    const THEME_PRESET_MAP = THEME_PRESETS.reduce((acc, preset) => {
      acc[preset.key] = preset;
      return acc;
    }, {});
    const THEME_PRESET_INLINE_VAR_KEYS = [
      "--gh-theme-primary",
      "--gh-theme-secondary",
      "--gh-theme-accent",
      "--gh-theme-accent-dark",
      "--gh-theme-light",
      "--gh-primary",
      "--gh-primary-hover",
      "--gh-tag-active-bg",
      "--gh-gradient",
      "--gh-header-bg",
      "--gh-theme-surface-light-base",
      "--gh-theme-surface-light-accent",
      "--gh-theme-surface-dark-base",
      "--gh-theme-surface-dark-accent",
      "--gh-page-sidebar-bg-light",
      "--gh-page-chat-bg-light",
      "--gh-page-composer-bg-light",
      "--gh-page-sidebar-bg-dark",
      "--gh-page-chat-bg-dark",
      "--gh-page-composer-bg-dark",
      "--gh-page-accent-soft",
      "--gh-page-accent-soft-dark",
      "--gh-page-accent-strong",
      "--gh-page-link",
      "--gh-page-selection"
    ];
    const THEME_BACKGROUND_DB_NAME = "chatgpt_helper_theme";
    const THEME_BACKGROUND_DB_VERSION = 1;
    const THEME_BACKGROUND_STORE = "assets";
    const THEME_BACKGROUND_MAX_SIZE = 5 * 1024 * 1024;
    const THEME_BACKGROUND_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
    const FEATURE_REQUEST_URL = "";
    const ISSUE_URL = "https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper/issues/new";
    const REPO_URL = "https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper";
    const AUTHOR_GITHUB_URL = "https://github.com/zhiwuyazhe-fjr";
    const THEME_HOST_ATTRS = [
      "data-gh-theme-host-sidebar-shell",
      "data-gh-theme-host-sidebar",
      "data-gh-theme-host-main",
      "data-gh-theme-host-chat-list",
      "data-gh-theme-host-composer",
      "data-gh-theme-host-composer-surface"
    ];
    const DEFAULT_THEME_CONFIG = {
      appearanceMode: "system",
      // 'system' | 'light' | 'dark'
      presetKey: "original",
      backgroundImageEnabled: false,
      backgroundBlurPx: 5,
      messageGlassEnabled: false,
      messageGlassIntensity: 60,
      panelGlassIntensity: 45,
      sidebarTextEnhanceEnabled: true,
      sidebarTextEnhanceIntensity: 20,
      backgroundAssetId: null,
      updatedAt: ""
    };
    const DEFAULT_SETTINGS = {
      panelWidth: 320,
      defaultPanelState: true,
      // true = 展开, false = 折叠
      prompts: { enabled: true },
      outline: { enabled: true, showUserQueries: true },
      conversations: { enabled: true },
      tabOrder: ["prompts", "outline", "conversations", "export"],
      collapsedButtonsOrder: DEFAULT_COLLAPSED_BUTTONS_ORDER,
      themeMode: null,
      // 'light' | 'dark' | null
      themeConfig: { ...DEFAULT_THEME_CONFIG },
      anchorEnabled: true,
      themeEnabled: true,
      manualAnchorEnabled: true,
      // 滚动锁定设置
      preventAutoScroll: false,
      // 页面宽度设置
      pageWidth: {
        enabled: false,
        value: 1200,
        unit: "px"
      },
      // 阶段1：阅读历史设置
      readingHistory: {
        persistence: true,
        autoRestore: false,
        cleanupDays: 30
      },
      // 阶段3：复制功能设置
      formulaCopy: {
        enabled: true,
        delimiterEnabled: true
      },
      tableCopy: {
        enabled: true
      },
      // 阶段4：标签页设置
      tabSettings: {
        enabled: true,
        renameInterval: 3,
        showStatus: true,
        titleFormat: "{status}{title}",
        showNotification: false,
        notificationSound: false,
        notificationVolume: 0.5,
        notifyWhenFocused: false,
        autoFocus: false,
        privacyMode: false,
        privacyTitle: "ChatGPT"
      }
    };
    const DEFAULT_PROMPTS = [
      {
        id: "default_1",
        title: "代码审查",
        content: "请帮我审查以下代码，指出潜在的问题和改进建议：",
        category: "开发"
      },
      {
        id: "default_2",
        title: "翻译",
        content: "请将以下内容翻译成中文：",
        category: "工具"
      }
    ];
    function createElement(tag, attrs = {}, text = "") {
      const el = document.createElement(tag);
      if (typeof attrs === "string") {
        text = attrs;
        attrs = {};
      }
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === "className") {
          el.className = value;
        } else if (key === "style" && typeof value === "object") {
          Object.assign(el.style, value);
        } else if (key.startsWith("data-") || key.startsWith("aria-") || key === "role") {
          el.setAttribute(key, value);
        } else {
          el[key] = value;
        }
      });
      if (text) el.textContent = text;
      return el;
    }
    function getExtensionRuntime() {
      if (typeof browser !== "undefined" && browser.runtime) return browser.runtime;
      if (typeof chrome !== "undefined" && chrome.runtime) return chrome.runtime;
      return null;
    }
    function getExtensionAssetUrl(path) {
      const runtime = getExtensionRuntime();
      try {
        return runtime && typeof runtime.getURL === "function" ? runtime.getURL(path) : path;
      } catch (e) {
        return path;
      }
    }
    function getExtensionManifestMeta() {
      const runtime = getExtensionRuntime();
      try {
        return runtime && typeof runtime.getManifest === "function" ? runtime.getManifest() : null;
      } catch (e) {
        return null;
      }
    }
    function openExternalLink(url) {
      if (!url) return false;
      try {
        window.open(url, "_blank", "noopener,noreferrer");
        return true;
      } catch (e) {
        try {
          window.open(url, "_blank");
          return true;
        } catch (e2) {
          return false;
        }
      }
    }
    async function copyTextToClipboard(text) {
      if (!text) return false;
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (e) {
      }
      try {
        const textarea = createElement("textarea", { value: text });
        textarea.setAttribute("readonly", "readonly");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const success = document.execCommand("copy");
        textarea.remove();
        return !!success;
      } catch (e) {
        return false;
      }
    }
    function createHelperLogoNode(options = {}) {
      const {
        size = 18,
        className = "",
        alt = "ChatGPT Helper",
        title = ""
      } = options;
      const img = createElement("img", {
        className,
        alt,
        title,
        src: getExtensionAssetUrl("icons/logo.svg"),
        draggable: false
      });
      img.width = size;
      img.height = size;
      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      img.style.display = "block";
      img.style.objectFit = "contain";
      img.style.flexShrink = "0";
      return img;
    }
    const SVG_ICON_DEFS = {
      edit: [
        ["path", { d: "M12 20h9" }],
        ["path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" }]
      ],
      list: [
        ["path", { d: "M8 6h13" }],
        ["path", { d: "M8 12h13" }],
        ["path", { d: "M8 18h13" }],
        ["path", { d: "M3 6h.01" }],
        ["path", { d: "M3 12h.01" }],
        ["path", { d: "M3 18h.01" }]
      ],
      message: [
        ["path", { d: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" }]
      ],
      export: [
        ["path", { d: "M12 3v12" }],
        ["path", { d: "m7 8 5-5 5 5" }],
        ["path", { d: "M5 21h14" }],
        ["path", { d: "M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" }]
      ],
      image: [
        ["rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }],
        ["circle", { cx: "8.5", cy: "10.5", r: "1.5" }],
        ["path", { d: "m21 15-5-5L5 21" }]
      ],
      settings: [
        ["path", { d: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" }],
        ["path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.36.32.7.6 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.52 1Z" }]
      ],
      arrowUp: [
        ["path", { d: "m18 15-6-6-6 6" }],
        ["path", { d: "M12 9v12" }],
        ["path", { d: "M5 3h14" }]
      ],
      arrowDown: [
        ["path", { d: "m6 9 6 6 6-6" }],
        ["path", { d: "M12 15V3" }],
        ["path", { d: "M5 21h14" }]
      ],
      anchor: [
        ["circle", { cx: "12", cy: "5", r: "3" }],
        ["path", { d: "M12 8v13" }],
        ["path", { d: "M5 12H2a10 10 0 0 0 20 0h-3" }],
        ["path", { d: "m19 12-2 2" }],
        ["path", { d: "m5 12 2 2" }]
      ],
      sun: [
        ["circle", { cx: "12", cy: "12", r: "4" }],
        ["path", { d: "M12 2v2" }],
        ["path", { d: "M12 20v2" }],
        ["path", { d: "m4.93 4.93 1.41 1.41" }],
        ["path", { d: "m17.66 17.66 1.41 1.41" }],
        ["path", { d: "M2 12h2" }],
        ["path", { d: "M20 12h2" }],
        ["path", { d: "m6.34 17.66-1.41 1.41" }],
        ["path", { d: "m19.07 4.93-1.41 1.41" }]
      ],
      moon: [
        ["path", { d: "M20.98 15.57A9 9 0 1 1 8.43 3.02 7 7 0 0 0 20.98 15.57Z" }]
      ],
      plus: [
        ["path", { d: "M12 5v14" }],
        ["path", { d: "M5 12h14" }]
      ],
      refresh: [
        ["path", { d: "M21 12a9 9 0 0 1-15.2 6.5" }],
        ["path", { d: "M3 12A9 9 0 0 1 18.2 5.5" }],
        ["path", { d: "M18 2v4h-4" }],
        ["path", { d: "M6 22v-4h4" }]
      ],
      collapse: [
        ["path", { d: "m15 18-6-6 6-6" }]
      ],
      expand: [
        ["path", { d: "m9 18 6-6-6-6" }]
      ],
      pin: [
        ["path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }],
        ["circle", { cx: "12", cy: "10", r: "3" }]
      ],
      back: [
        ["path", { d: "M9 14 4 9l5-5" }],
        ["path", { d: "M4 9h10a6 6 0 0 1 0 12h-2" }]
      ],
      close: [
        ["path", { d: "M18 6 6 18" }],
        ["path", { d: "m6 6 12 12" }]
      ],
      check: [
        ["path", { d: "m20 6-11 11-5-5" }]
      ],
      tag: [
        ["path", { d: "M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .59 1.41l7.4 7.4a2 2 0 0 0 2.82 0l8.6-8.6a2 2 0 0 0 0-2.82l-7.4-7.4A2 2 0 0 0 12.6 2Z" }],
        ["path", { d: "M7 7h.01" }]
      ],
      folder: [
        ["path", { d: "M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }]
      ],
      trash: [
        ["path", { d: "M3 6h18" }],
        ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
        ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
        ["path", { d: "M10 11v6" }],
        ["path", { d: "M14 11v6" }]
      ]
    };
    function createSvgIconNode(iconName, options = {}) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const size = options.size || 16;
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", options.strokeWidth || "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("aria-hidden", "true");
      svg.classList.add("chatgpt-helper-svg-icon");
      if (options.className) {
        options.className.split(/\s+/).filter(Boolean).forEach((name) => svg.classList.add(name));
      }
      svg.style.width = `${size}px`;
      svg.style.height = `${size}px`;
      svg.style.flexShrink = "0";
      const defs = SVG_ICON_DEFS[iconName] || SVG_ICON_DEFS.list;
      defs.forEach(([tag, attrs]) => {
        const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
        Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
        svg.appendChild(node);
      });
      return svg;
    }
    function setButtonIcon(button, iconName, options = {}) {
      if (!button) return;
      button.replaceChildren(createSvgIconNode(iconName, options));
    }
    function createCollapsedButtonIconNode(def, options = {}) {
      if (def && def.iconType === "helper-logo") {
        return createHelperLogoNode({
          size: options.size || 18,
          className: options.className || "chatgpt-helper-icon-logo",
          title: options.title || def.label || "ChatGPT Helper"
        });
      }
      return createSvgIconNode(def && def.iconName ? def.iconName : "list", options);
    }
    function clearElement(el) {
      while (el.firstChild) {
        el.firstChild.remove();
      }
    }
    function clampNumber(value, min, max) {
      const n = Number(value);
      if (!Number.isFinite(n)) return min;
      return Math.min(max, Math.max(min, n));
    }
    function normalizeHexColor(value, fallback = "#4285f4") {
      if (typeof value !== "string") return fallback;
      const trimmed = value.trim();
      if (/^#[\da-fA-F]{6}$/.test(trimmed)) return trimmed;
      if (/^#[\da-fA-F]{3}$/.test(trimmed)) {
        return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
      }
      return fallback;
    }
    function hexToRgb(value, fallback = "#4285f4") {
      const hex = normalizeHexColor(value, fallback).slice(1);
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    }
    function blendRgbColors(baseColor, tintColor, tintWeight = 0.5) {
      const base = typeof baseColor === "string" ? hexToRgb(baseColor) : baseColor;
      const tint = typeof tintColor === "string" ? hexToRgb(tintColor) : tintColor;
      const weight = clampNumber(tintWeight, 0, 1);
      return {
        r: Math.round(base.r + (tint.r - base.r) * weight),
        g: Math.round(base.g + (tint.g - base.g) * weight),
        b: Math.round(base.b + (tint.b - base.b) * weight)
      };
    }
    function rgbaFromColor(color, alpha = 1) {
      const rgb = typeof color === "string" ? hexToRgb(color) : color;
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampNumber(alpha, 0, 1).toFixed(3)})`;
    }
    function buildLinearGradient(angle, stops) {
      return `linear-gradient(${angle}, ${stops.join(", ")})`;
    }
    function createThemeAssetId() {
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
      }
      return `theme-bg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
    function getThemePresetByKey(key) {
      return THEME_PRESET_MAP[key] || THEME_PRESET_MAP[DEFAULT_THEME_CONFIG.presetKey];
    }
    function withProductivitySurfaceVars(vars, presetInput, options = {}) {
      const preset = presetInput && typeof presetInput === "object" ? presetInput : getThemePresetByKey(DEFAULT_THEME_CONFIG.presetKey);
      const isDark = Boolean(options.isDark);
      const hasWallpaper = Boolean(options.canRenderBackground);
      const primary = preset.primary || "#64748b";
      const secondary = preset.secondary || "#94a3b8";
      const accent = preset.accent || primary;
      const light = preset.light || "#f8fafc";
      const darkPanelTop = `color-mix(in srgb, #070b12, ${primary} ${hasWallpaper ? 22 : 18}%)`;
      const darkPanelBottom = `color-mix(in srgb, #05070b, ${secondary} ${hasWallpaper ? 15 : 11}%)`;
      const lightPanelTop = `color-mix(in srgb, #ffffff, ${light} ${hasWallpaper ? 68 : 78}%)`;
      const lightPanelBottom = `color-mix(in srgb, #f4f5f2, ${primary} ${hasWallpaper ? 12 : 8}%)`;
      const surfaceTop = isDark ? darkPanelTop : lightPanelTop;
      const surfaceBottom = isDark ? darkPanelBottom : lightPanelBottom;
      const neutralText = isDark ? "rgba(248, 250, 252, 0.96)" : "rgba(18, 23, 20, 0.94)";
      const mutedText = isDark ? "rgba(204, 213, 205, 0.76)" : "rgba(85, 97, 89, 0.78)";
      const panelLine = isDark ? `color-mix(in srgb, ${primary}, rgba(255,255,255,0.16) ${hasWallpaper ? 52 : 40}%)` : `color-mix(in srgb, ${primary}, rgba(12,18,16,0.14) ${hasWallpaper ? 44 : 58}%)`;
      const cardShadow = isDark ? "0 1px 0 rgba(255, 255, 255, 0.025), 0 10px 24px rgba(0, 0, 0, 0.18)" : "0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 22px rgba(18, 23, 20, 0.07)";
      const elevatedShadow = isDark ? `0 14px 34px color-mix(in srgb, #000000, ${primary} 16%)` : `0 12px 30px color-mix(in srgb, rgba(18,23,20,0.12), ${primary} 18%)`;
      return {
        ...vars,
        "--gh-theme-primary": primary,
        "--gh-theme-secondary": secondary,
        "--gh-theme-accent": accent,
        "--gh-theme-accent-dark": accent,
        "--gh-theme-light": light,
        "--gh-primary": primary,
        "--gh-primary-hover": accent,
        "--gh-tag-active-bg": primary,
        "--gh-gradient": `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        "--gh-header-bg": `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        "--gh-text": vars["--gh-text"] || neutralText,
        "--gh-text-secondary": vars["--gh-text-secondary"] || mutedText,
        "--gh-panel-surface": `linear-gradient(180deg, ${surfaceTop} 0%, ${surfaceBottom} 100%)`,
        "--gh-panel-subtle": isDark ? `color-mix(in srgb, ${surfaceBottom}, ${primary} 10%)` : `color-mix(in srgb, ${surfaceTop}, ${primary} 4%)`,
        "--gh-panel-card": vars["--gh-panel-card-bg"] || (isDark ? `color-mix(in srgb, ${surfaceTop}, #ffffff 6%)` : `color-mix(in srgb, ${surfaceTop}, #ffffff 52%)`),
        "--gh-panel-card-hover": isDark ? `color-mix(in srgb, ${surfaceTop}, ${primary} 18%)` : `color-mix(in srgb, ${surfaceTop}, ${primary} 9%)`,
        "--gh-panel-line": panelLine,
        "--gh-panel-muted-line": `color-mix(in srgb, ${panelLine}, transparent 42%)`,
        "--gh-panel-elevated-shadow": elevatedShadow,
        "--gh-panel-card-shadow": cardShadow,
        "--gh-header-quiet-bg": isDark ? `linear-gradient(180deg, color-mix(in srgb, ${surfaceTop}, ${primary} 22%) 0%, ${surfaceTop} 100%)` : `linear-gradient(180deg, color-mix(in srgb, ${surfaceTop}, ${primary} 8%) 0%, ${surfaceTop} 100%)`,
        "--gh-focus-ring": `color-mix(in srgb, ${primary}, transparent ${isDark ? 56 : 68}%)`,
        "--gh-control-bg": isDark ? `color-mix(in srgb, ${surfaceTop}, #ffffff 6%)` : `color-mix(in srgb, ${surfaceTop}, #ffffff 48%)`,
        "--gh-control-bg-hover": isDark ? `color-mix(in srgb, ${surfaceTop}, ${primary} 18%)` : `color-mix(in srgb, ${surfaceTop}, ${primary} 8%)`,
        "--gh-control-border": `color-mix(in srgb, ${panelLine}, transparent 8%)`,
        "--gh-control-radius": "8px",
        "--gh-card-radius": "8px",
        "--gh-danger": "#ef4444",
        "--gh-success": "#10b981",
        "--gh-warning": "#f59e0b",
        "--gh-folder-bg-default": `color-mix(in srgb, ${primary}, transparent ${isDark ? 78 : 86}%)`,
        "--gh-folder-bg-expanded": `color-mix(in srgb, ${primary}, transparent ${isDark ? 68 : 78}%)`,
        "--gh-border-active": primary,
        "--gh-checkbox-bg": accent
      };
    }
    function buildThemeSurfaceVars(presetInput, options = {}) {
      const preset = presetInput && typeof presetInput === "object" ? presetInput : getThemePresetByKey(DEFAULT_THEME_CONFIG.presetKey);
      const isDark = Boolean(options.isDark);
      const isOriginal = Boolean(preset && preset.isOriginal);
      const hasWallpaper = Boolean(options.canRenderBackground);
      const panelUnit = clampNumber(options.panelIntensity, 0, 100) / 100;
      const messageUnit = clampNumber(options.messageIntensity, 0, 100) / 100;
      const composerUnit = Math.min(1, Math.max(panelUnit * 0.55, messageUnit * 0.85));
      const panelBlur = hasWallpaper ? `${8 + Math.round(panelUnit * 10)}px` : `${2 + Math.round(panelUnit * 4)}px`;
      const messageBlur = hasWallpaper ? `${10 + Math.round(messageUnit * 12)}px` : `${4 + Math.round(messageUnit * 6)}px`;
      const composerBlur = hasWallpaper ? `${9 + Math.round(composerUnit * 11)}px` : `${3 + Math.round(composerUnit * 5)}px`;
      if (isOriginal) {
        if (isDark) {
          return withProductivitySurfaceVars({
            "--gh-bg": hasWallpaper ? "rgba(15, 23, 42, 0.160)" : "#1e293b",
            "--gh-bg-secondary": hasWallpaper ? "rgba(15, 23, 42, 0.110)" : "#0f172a",
            "--gh-text": "#f1f5f9",
            "--gh-text-secondary": "#cbd5e1",
            "--gh-border": hasWallpaper ? "rgba(226, 232, 240, 0.180)" : "#475569",
            "--gh-hover": hasWallpaper ? "rgba(30, 41, 59, 0.160)" : "#334155",
            "--gh-shadow": hasWallpaper ? "0 14px 32px rgba(2, 6, 23, 0.200)" : "0 10px 40px rgba(0,0,0,0.4)",
            "--gh-input-bg": hasWallpaper ? "linear-gradient(135deg, rgba(15, 23, 42, 0.620) 0%, rgba(15, 23, 42, 0.520) 100%)" : "#334155",
            "--gh-input-border": hasWallpaper ? "rgba(148, 163, 184, 0.420)" : "#64748b",
            "--gh-active-bg": hasWallpaper ? "rgba(59, 130, 246, 0.220)" : "rgba(59, 130, 246, 0.300)",
            "--gh-right-overlay": hasWallpaper ? "linear-gradient(180deg, rgba(15, 23, 42, 0.560) 0%, rgba(15, 23, 42, 0.420) 100%)" : "#1e293b",
            "--gh-panel-card-bg": hasWallpaper ? "rgba(15, 23, 42, 0.420)" : "#0f172a",
            "--gh-panel-card-border": hasWallpaper ? "rgba(255, 255, 255, 0.220)" : "#475569",
            "--gh-sidebar-button-bg": hasWallpaper ? "rgba(15, 23, 42, 0.320)" : "#334155",
            "--gh-msg-user-bg": hasWallpaper ? "linear-gradient(135deg, rgba(15, 23, 42, 0.240) 0%, rgba(30, 41, 59, 0.140) 100%)" : "rgba(51, 65, 85, 0.940)",
            "--gh-msg-assistant-bg": hasWallpaper ? "linear-gradient(135deg, rgba(15, 23, 42, 0.180) 0%, rgba(15, 23, 42, 0.100) 100%)" : "transparent",
            "--gh-msg-border": hasWallpaper ? "rgba(255, 255, 255, 0.180)" : "rgba(100, 116, 139, 0.360)",
            "--gh-msg-shadow": hasWallpaper ? "0 14px 32px rgba(2, 6, 23, 0.120)" : "none",
            "--gh-msg-blur": messageBlur,
            "--gh-panel-blur": panelBlur,
            "--gh-composer-blur": composerBlur,
            "--gh-composer-shadow": hasWallpaper ? "0 10px 24px rgba(2, 6, 23, 0.140)" : "none",
            "--gh-page-sidebar-bg-light": "color-mix(in srgb, #ffffff, transparent 84%)",
            "--gh-page-chat-bg-light": "transparent",
            "--gh-page-composer-bg-light": "color-mix(in srgb, #ffffff, transparent 78%)",
            "--gh-page-sidebar-bg-dark": hasWallpaper ? "linear-gradient(180deg, rgba(2, 6, 23, 0.360) 0%, rgba(2, 6, 23, 0.240) 100%)" : "transparent",
            "--gh-page-chat-bg-dark": "transparent",
            "--gh-page-composer-bg-dark": hasWallpaper ? "linear-gradient(135deg, rgba(8, 17, 29, 0.860) 0%, rgba(15, 23, 42, 0.760) 100%)" : "transparent",
            "--gh-page-accent-soft": "rgba(59, 130, 246, 0.120)",
            "--gh-page-accent-soft-dark": hasWallpaper ? "rgba(59, 130, 246, 0.220)" : "rgba(59, 130, 246, 0.260)",
            "--gh-page-accent-strong": "#2563eb",
            "--gh-page-link": "#2563eb",
            "--gh-page-selection": "rgba(59, 130, 246, 0.180)"
          }, preset, options);
        }
        return withProductivitySurfaceVars({
          "--gh-bg": "#ffffff",
          "--gh-bg-secondary": "#f9fafb",
          "--gh-text": "#1f2937",
          "--gh-text-secondary": "#6b7280",
          "--gh-border": "#e5e7eb",
          "--gh-hover": "#f3f4f6",
          "--gh-shadow": "0 10px 40px rgba(0,0,0,0.15)",
          "--gh-input-bg": hasWallpaper ? "linear-gradient(135deg, rgba(255, 255, 255, 0.860) 0%, rgba(248, 250, 252, 0.760) 100%)" : "#ffffff",
          "--gh-input-border": hasWallpaper ? "rgba(226, 232, 240, 0.860)" : "#d1d5db",
          "--gh-active-bg": "#e5e7eb",
          "--gh-right-overlay": hasWallpaper ? "linear-gradient(180deg, rgba(255, 255, 255, 0.560) 0%, rgba(248, 250, 252, 0.420) 100%)" : "#ffffff",
          "--gh-panel-card-bg": hasWallpaper ? "rgba(255, 255, 255, 0.540)" : "#f9fafb",
          "--gh-panel-card-border": hasWallpaper ? "rgba(255, 255, 255, 0.460)" : "#e5e7eb",
          "--gh-sidebar-button-bg": hasWallpaper ? "rgba(255, 255, 255, 0.420)" : "#f3f4f6",
          "--gh-msg-user-bg": hasWallpaper ? "linear-gradient(135deg, rgba(255, 255, 255, 0.340) 0%, rgba(248, 250, 252, 0.240) 100%)" : "rgba(255, 255, 255, 0.920)",
          "--gh-msg-assistant-bg": hasWallpaper ? "linear-gradient(135deg, rgba(255, 255, 255, 0.280) 0%, rgba(248, 250, 252, 0.180) 100%)" : "transparent",
          "--gh-msg-border": hasWallpaper ? "rgba(255, 255, 255, 0.420)" : "rgba(209, 213, 219, 0.580)",
          "--gh-msg-shadow": hasWallpaper ? "0 14px 32px rgba(15, 23, 42, 0.100)" : "none",
          "--gh-msg-blur": messageBlur,
          "--gh-panel-blur": panelBlur,
          "--gh-composer-blur": composerBlur,
          "--gh-composer-shadow": hasWallpaper ? "0 10px 24px rgba(15, 23, 42, 0.100)" : "none",
          "--gh-page-sidebar-bg-light": hasWallpaper ? "linear-gradient(180deg, rgba(255, 255, 255, 0.360) 0%, rgba(248, 250, 252, 0.220) 100%)" : "transparent",
          "--gh-page-chat-bg-light": "transparent",
          "--gh-page-composer-bg-light": hasWallpaper ? "linear-gradient(135deg, rgba(255, 255, 255, 0.900) 0%, rgba(248, 250, 252, 0.800) 100%)" : "transparent",
          "--gh-page-sidebar-bg-dark": "linear-gradient(180deg, rgba(2, 6, 23, 0.260) 0%, rgba(2, 6, 23, 0.160) 100%)",
          "--gh-page-chat-bg-dark": "transparent",
          "--gh-page-composer-bg-dark": "linear-gradient(135deg, rgba(8, 17, 29, 0.240) 0%, rgba(8, 17, 29, 0.160) 100%)",
          "--gh-page-accent-soft": "rgba(59, 130, 246, 0.120)",
          "--gh-page-accent-soft-dark": "rgba(59, 130, 246, 0.260)",
          "--gh-page-accent-strong": "#2563eb",
          "--gh-page-link": "#2563eb",
          "--gh-page-selection": "rgba(59, 130, 246, 0.180)"
        }, preset, options);
      }
      if (isDark) {
        const sidebarTop2 = hasWallpaper ? blendRgbColors("#020617", preset.primary, 0.12 + panelUnit * 0.18) : blendRgbColors("#070711", preset.primary, 0.4 + panelUnit * 0.18);
        const sidebarBottom2 = hasWallpaper ? blendRgbColors("#020617", preset.secondary, 0.08 + panelUnit * 0.16) : blendRgbColors("#06070f", preset.secondary, 0.28 + panelUnit * 0.14);
        const panelTop2 = hasWallpaper ? blendRgbColors("#07111f", preset.primary, 0.14 + panelUnit * 0.18) : blendRgbColors("#111324", preset.primary, 0.32 + panelUnit * 0.16);
        const panelBottom2 = hasWallpaper ? blendRgbColors("#07111f", preset.secondary, 0.1 + panelUnit * 0.16) : blendRgbColors("#0d1323", preset.secondary, 0.24 + panelUnit * 0.14);
        const cardTop2 = hasWallpaper ? blendRgbColors("#091220", preset.primary, 0.16 + panelUnit * 0.14) : blendRgbColors("#171932", preset.primary, 0.28 + panelUnit * 0.16);
        const cardBottom2 = hasWallpaper ? blendRgbColors("#08111c", preset.secondary, 0.1 + panelUnit * 0.12) : blendRgbColors("#111729", preset.secondary, 0.2 + panelUnit * 0.12);
        const messageTop = hasWallpaper ? blendRgbColors("#0b1324", preset.light, 0.14 + messageUnit * 0.16) : blendRgbColors("#17192c", preset.light, 0.08 + messageUnit * 0.08);
        const messageAccent = hasWallpaper ? blendRgbColors("#09111f", preset.primary, 0.18 + messageUnit * 0.18) : blendRgbColors("#17192c", preset.primary, 0.38 + messageUnit * 0.16);
        const userAccent = hasWallpaper ? blendRgbColors("#08111d", preset.secondary, 0.14 + messageUnit * 0.16) : blendRgbColors("#121a2f", preset.secondary, 0.3 + messageUnit * 0.14);
        const panelBorder2 = hasWallpaper ? blendRgbColors("#dbeafe", preset.primary, 0.16) : blendRgbColors("#64748b", preset.primary, 0.2);
        const messageBorder2 = hasWallpaper ? blendRgbColors("#f8fafc", preset.primary, 0.18) : blendRgbColors("#94a3b8", preset.primary, 0.16);
        const activeTint2 = blendRgbColors("#0b1324", preset.primary, hasWallpaper ? 0.74 : 0.78);
        const shadowTint2 = hasWallpaper ? blendRgbColors("#020617", preset.primary, 0.28) : blendRgbColors("#030712", preset.primary, 0.18);
        const composerTop2 = hasWallpaper ? blendRgbColors("#09111f", preset.light, 0.12 + composerUnit * 0.14) : blendRgbColors("#14172a", preset.light, 0.08 + composerUnit * 0.08);
        const composerBottom2 = hasWallpaper ? blendRgbColors("#08111d", preset.primary, 0.16 + composerUnit * 0.16) : blendRgbColors("#101628", preset.primary, 0.34 + composerUnit * 0.16);
        hasWallpaper ? blendRgbColors("#060b18", preset.primary, 0.08 + panelUnit * 0.1) : blendRgbColors("#090814", preset.primary, 0.3 + panelUnit * 0.14);
        hasWallpaper ? blendRgbColors("#050913", preset.secondary, 0.06 + panelUnit * 0.08) : blendRgbColors("#06070f", preset.secondary, 0.18 + panelUnit * 0.1);
        return withProductivitySurfaceVars({
          "--gh-bg": rgbaFromColor(cardTop2, hasWallpaper ? 0.28 + panelUnit * 0.14 : 0.98),
          "--gh-bg-secondary": rgbaFromColor(cardBottom2, hasWallpaper ? 0.22 + panelUnit * 0.12 : 0.96),
          "--gh-text": "rgba(248, 250, 252, 0.96)",
          "--gh-text-secondary": "rgba(203, 213, 225, 0.78)",
          "--gh-border": rgbaFromColor(panelBorder2, hasWallpaper ? 0.1 + panelUnit * 0.08 : 0.22 + panelUnit * 0.08),
          "--gh-hover": rgbaFromColor(panelBottom2, hasWallpaper ? 0.09 + panelUnit * 0.07 : 0.42 + panelUnit * 0.1),
          "--gh-shadow": `-14px 0 34px ${rgbaFromColor(shadowTint2, hasWallpaper ? 0.14 + panelUnit * 0.08 : 0.18 + panelUnit * 0.06)}`,
          "--gh-input-bg": buildLinearGradient("135deg", [
            `${rgbaFromColor(composerTop2, hasWallpaper ? 0.46 + composerUnit * 0.16 : 0.94)} 0%`,
            `${rgbaFromColor(composerBottom2, hasWallpaper ? 0.36 + composerUnit * 0.14 : 0.96)} 100%`
          ]),
          "--gh-input-border": rgbaFromColor(messageBorder2, hasWallpaper ? 0.22 + composerUnit * 0.12 : 0.24 + composerUnit * 0.1),
          "--gh-active-bg": rgbaFromColor(activeTint2, hasWallpaper ? 0.18 + panelUnit * 0.06 : 0.88),
          "--gh-right-overlay": buildLinearGradient("180deg", [
            `${rgbaFromColor(panelTop2, hasWallpaper ? 0.48 + panelUnit * 0.12 : 0.99)} 0%`,
            `${rgbaFromColor(panelBottom2, hasWallpaper ? 0.36 + panelUnit * 0.1 : 0.97)} 100%`
          ]),
          "--gh-panel-card-bg": buildLinearGradient("135deg", [
            `${rgbaFromColor(cardTop2, hasWallpaper ? 0.42 + panelUnit * 0.14 : 0.98)} 0%`,
            `${rgbaFromColor(cardBottom2, hasWallpaper ? 0.32 + panelUnit * 0.12 : 0.96)} 100%`
          ]),
          "--gh-panel-card-border": rgbaFromColor(panelBorder2, hasWallpaper ? 0.18 + panelUnit * 0.1 : 0.2 + panelUnit * 0.1),
          "--gh-sidebar-button-bg": rgbaFromColor(activeTint2, hasWallpaper ? 0.3 + panelUnit * 0.12 : 0.82),
          "--gh-msg-user-bg": buildLinearGradient("135deg", [
            `${rgbaFromColor(messageTop, hasWallpaper ? 0.18 + messageUnit * 0.12 : 0.98)} 0%`,
            `${rgbaFromColor(userAccent, hasWallpaper ? 0.09 + messageUnit * 0.08 : 0.94)} 100%`
          ]),
          "--gh-msg-assistant-bg": hasWallpaper ? buildLinearGradient("135deg", [
            `${rgbaFromColor(messageTop, 0.16 + messageUnit * 0.12)} 0%`,
            `${rgbaFromColor(messageAccent, 0.08 + messageUnit * 0.08)} 100%`
          ]) : "transparent",
          "--gh-msg-border": rgbaFromColor(messageBorder2, hasWallpaper ? 0.08 + messageUnit * 0.08 : 0.18 + messageUnit * 0.08),
          "--gh-msg-shadow": `0 16px 34px ${rgbaFromColor(shadowTint2, hasWallpaper ? 0.12 + messageUnit * 0.08 : 0.16 + messageUnit * 0.08)}`,
          "--gh-msg-blur": messageBlur,
          "--gh-panel-blur": panelBlur,
          "--gh-composer-blur": composerBlur,
          "--gh-composer-shadow": `0 12px 28px ${rgbaFromColor(shadowTint2, hasWallpaper ? 0.1 + composerUnit * 0.07 : 0.16 + composerUnit * 0.08)}`,
          "--gh-page-sidebar-bg-light": buildLinearGradient("180deg", [
            `${rgbaFromColor(blendRgbColors("#ffffff", preset.light, 0.7), 0.18)} 0%`,
            `${rgbaFromColor(blendRgbColors("#ffffff", preset.primary, 0.16), 0.08)} 100%`
          ]),
          "--gh-page-chat-bg-light": "transparent",
          "--gh-page-composer-bg-light": buildLinearGradient("135deg", [
            `${rgbaFromColor(blendRgbColors("#ffffff", preset.light, 0.62), 0.22)} 0%`,
            `${rgbaFromColor(blendRgbColors("#ffffff", preset.primary, 0.18), 0.12)} 100%`
          ]),
          "--gh-page-sidebar-bg-dark": buildLinearGradient("180deg", [
            `${rgbaFromColor(sidebarTop2, hasWallpaper ? 0.32 + panelUnit * 0.14 : 0.99)} 0%`,
            `${rgbaFromColor(sidebarBottom2, hasWallpaper ? 0.22 + panelUnit * 0.12 : 0.97)} 100%`
          ]),
          "--gh-page-chat-bg-dark": "transparent",
          "--gh-page-composer-bg-dark": buildLinearGradient("135deg", [
            `${rgbaFromColor(composerTop2, hasWallpaper ? 0.76 + composerUnit * 0.12 : 0.98)} 0%`,
            `${rgbaFromColor(composerBottom2, hasWallpaper ? 0.66 + composerUnit * 0.12 : 0.95)} 100%`
          ]),
          "--gh-page-accent-soft": rgbaFromColor(blendRgbColors("#ffffff", preset.primary, 0.34), 0.22 + panelUnit * 0.08),
          "--gh-page-accent-soft-dark": rgbaFromColor(activeTint2, hasWallpaper ? 0.2 + panelUnit * 0.08 : 0.9),
          "--gh-page-accent-strong": preset.accent,
          "--gh-page-link": preset.accent,
          "--gh-page-selection": rgbaFromColor(blendRgbColors("#0b1324", preset.primary, 0.72), hasWallpaper ? 0.22 : 0.32)
        }, preset, options);
      }
      const sidebarTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.72) : blendRgbColors("#ffffff", preset.light, 0.92);
      const sidebarBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.16 + panelUnit * 0.12) : blendRgbColors("#ffffff", preset.primary, 0.24 + panelUnit * 0.16);
      const panelTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.78) : blendRgbColors("#ffffff", preset.light, 0.9);
      const panelBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.secondary, 0.18 + panelUnit * 0.14) : blendRgbColors("#ffffff", preset.secondary, 0.26 + panelUnit * 0.16);
      const cardTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.6) : blendRgbColors("#ffffff", preset.light, 0.88);
      const cardBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.secondary, 0.2 + panelUnit * 0.1) : blendRgbColors("#ffffff", preset.primary, 0.2 + panelUnit * 0.14);
      const userTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.7) : blendRgbColors("#ffffff", preset.light, 0.9);
      const userBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.secondary, 0.16 + messageUnit * 0.14) : blendRgbColors("#ffffff", preset.secondary, 0.2 + messageUnit * 0.14);
      const assistantTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.76) : blendRgbColors("#ffffff", preset.light, 0.94);
      const assistantBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.18 + messageUnit * 0.16) : blendRgbColors("#ffffff", preset.primary, 0.18 + messageUnit * 0.14);
      const panelBorder = hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.12) : blendRgbColors("#cbd5e1", preset.primary, 0.18);
      const messageBorder = hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.16) : blendRgbColors("#cbd5e1", preset.primary, 0.18);
      const activeTint = blendRgbColors("#eff6ff", preset.primary, hasWallpaper ? 0.34 : 0.46);
      const shadowTint = hasWallpaper ? blendRgbColors("#0f172a", preset.primary, 0.16) : blendRgbColors("#94a3b8", preset.primary, 0.1);
      const composerTop = hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.64) : blendRgbColors("#ffffff", preset.light, 0.9);
      const composerBottom = hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.18 + composerUnit * 0.12) : blendRgbColors("#ffffff", preset.primary, 0.18 + composerUnit * 0.12);
      hasWallpaper ? blendRgbColors("#ffffff", preset.light, 0.34) : blendRgbColors("#ffffff", preset.light, 0.6);
      hasWallpaper ? blendRgbColors("#ffffff", preset.primary, 0.08 + panelUnit * 0.06) : blendRgbColors("#ffffff", preset.primary, 0.12 + panelUnit * 0.08);
      return withProductivitySurfaceVars({
        "--gh-bg": rgbaFromColor(cardTop, hasWallpaper ? 0.4 + panelUnit * 0.16 : 0.97),
        "--gh-bg-secondary": rgbaFromColor(cardBottom, hasWallpaper ? 0.3 + panelUnit * 0.14 : 0.93),
        "--gh-text": "rgba(15, 23, 42, 0.92)",
        "--gh-text-secondary": "rgba(51, 65, 85, 0.78)",
        "--gh-border": rgbaFromColor(panelBorder, hasWallpaper ? 0.2 + panelUnit * 0.1 : 0.34 + panelUnit * 0.08),
        "--gh-hover": rgbaFromColor(panelBottom, hasWallpaper ? 0.1 + panelUnit * 0.08 : 0.6 + panelUnit * 0.1),
        "--gh-shadow": `-14px 0 34px ${rgbaFromColor(shadowTint, hasWallpaper ? 0.1 + panelUnit * 0.06 : 0.14 + panelUnit * 0.05)}`,
        "--gh-input-bg": buildLinearGradient("135deg", [
          `${rgbaFromColor(composerTop, hasWallpaper ? 0.72 + composerUnit * 0.16 : 0.96)} 0%`,
          `${rgbaFromColor(composerBottom, hasWallpaper ? 0.62 + composerUnit * 0.14 : 0.9)} 100%`
        ]),
        "--gh-input-border": rgbaFromColor(messageBorder, hasWallpaper ? 0.38 + composerUnit * 0.12 : 0.38 + composerUnit * 0.08),
        "--gh-active-bg": rgbaFromColor(activeTint, hasWallpaper ? 0.18 + panelUnit * 0.08 : 0.34 + panelUnit * 0.1),
        "--gh-right-overlay": buildLinearGradient("180deg", [
          `${rgbaFromColor(panelTop, hasWallpaper ? 0.56 + panelUnit * 0.16 : 0.98)} 0%`,
          `${rgbaFromColor(panelBottom, hasWallpaper ? 0.42 + panelUnit * 0.14 : 0.94)} 100%`
        ]),
        "--gh-panel-card-bg": buildLinearGradient("135deg", [
          `${rgbaFromColor(cardTop, hasWallpaper ? 0.48 + panelUnit * 0.16 : 0.96)} 0%`,
          `${rgbaFromColor(cardBottom, hasWallpaper ? 0.36 + panelUnit * 0.14 : 0.92)} 100%`
        ]),
        "--gh-panel-card-border": rgbaFromColor(panelBorder, hasWallpaper ? 0.32 + panelUnit * 0.12 : 0.36 + panelUnit * 0.08),
        "--gh-sidebar-button-bg": rgbaFromColor(activeTint, hasWallpaper ? 0.32 + panelUnit * 0.12 : 0.32 + panelUnit * 0.1),
        "--gh-msg-user-bg": buildLinearGradient("135deg", [
          `${rgbaFromColor(userTop, hasWallpaper ? 0.26 + messageUnit * 0.18 : 0.96)} 0%`,
          `${rgbaFromColor(userBottom, hasWallpaper ? 0.1 + messageUnit * 0.1 : 0.88)} 100%`
        ]),
        "--gh-msg-assistant-bg": hasWallpaper ? buildLinearGradient("135deg", [
          `${rgbaFromColor(assistantTop, 0.24 + messageUnit * 0.16)} 0%`,
          `${rgbaFromColor(assistantBottom, 0.12 + messageUnit * 0.12)} 100%`
        ]) : "transparent",
        "--gh-msg-border": rgbaFromColor(messageBorder, hasWallpaper ? 0.24 + messageUnit * 0.12 : 0.38 + messageUnit * 0.1),
        "--gh-msg-shadow": `0 14px 32px ${rgbaFromColor(shadowTint, hasWallpaper ? 0.08 + messageUnit * 0.08 : 0.1 + messageUnit * 0.06)}`,
        "--gh-msg-blur": messageBlur,
        "--gh-panel-blur": panelBlur,
        "--gh-composer-blur": composerBlur,
        "--gh-composer-shadow": `0 10px 24px ${rgbaFromColor(shadowTint, hasWallpaper ? 0.08 + composerUnit * 0.08 : 0.1 + composerUnit * 0.06)}`,
        "--gh-page-sidebar-bg-light": buildLinearGradient("180deg", [
          `${rgbaFromColor(sidebarTop, hasWallpaper ? 0.3 + panelUnit * 0.14 : 0.98)} 0%`,
          `${rgbaFromColor(sidebarBottom, hasWallpaper ? 0.18 + panelUnit * 0.12 : 0.94)} 100%`
        ]),
        "--gh-page-chat-bg-light": "transparent",
        "--gh-page-composer-bg-light": buildLinearGradient("135deg", [
          `${rgbaFromColor(composerTop, hasWallpaper ? 0.8 + composerUnit * 0.14 : 0.97)} 0%`,
          `${rgbaFromColor(composerBottom, hasWallpaper ? 0.68 + composerUnit * 0.12 : 0.9)} 100%`
        ]),
        "--gh-page-sidebar-bg-dark": buildLinearGradient("180deg", [
          `${rgbaFromColor(blendRgbColors("#020617", preset.primary, 0.22), 0.36)} 0%`,
          `${rgbaFromColor(blendRgbColors("#020617", preset.secondary, 0.16), 0.24)} 100%`
        ]),
        "--gh-page-chat-bg-dark": "transparent",
        "--gh-page-composer-bg-dark": buildLinearGradient("135deg", [
          `${rgbaFromColor(blendRgbColors("#08111d", preset.light, 0.12), 0.86)} 0%`,
          `${rgbaFromColor(blendRgbColors("#08111d", preset.primary, 0.18), 0.76)} 100%`
        ]),
        "--gh-page-accent-soft": rgbaFromColor(activeTint, hasWallpaper ? 0.2 + panelUnit * 0.08 : 0.88),
        "--gh-page-accent-soft-dark": rgbaFromColor(blendRgbColors("#0b1324", preset.primary, 0.72), 0.24 + panelUnit * 0.1),
        "--gh-page-accent-strong": preset.accent,
        "--gh-page-link": preset.accent,
        "--gh-page-selection": rgbaFromColor(blendRgbColors("#ffffff", preset.primary, 0.38), hasWallpaper ? 0.28 : 0.34)
      }, preset, options);
    }
    function normalizeThemeConfig(rawConfig, legacyThemeMode) {
      const input = rawConfig && typeof rawConfig === "object" ? rawConfig : {};
      const appearanceModeRaw = input.appearanceMode || legacyThemeMode || "system";
      const appearanceMode = ["system", "light", "dark"].includes(appearanceModeRaw) ? appearanceModeRaw : "system";
      const presetKey = THEME_PRESET_MAP[input.presetKey] ? input.presetKey : DEFAULT_THEME_CONFIG.presetKey;
      const backgroundAssetId = typeof input.backgroundAssetId === "string" && input.backgroundAssetId.trim() ? input.backgroundAssetId.trim() : null;
      const backgroundImageEnabled = Boolean(input.backgroundImageEnabled) && Boolean(backgroundAssetId);
      const updatedAt = typeof input.updatedAt === "string" && input.updatedAt ? input.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
      return {
        appearanceMode,
        presetKey,
        backgroundImageEnabled,
        backgroundBlurPx: Math.round(clampNumber(input.backgroundBlurPx, 0, 20)),
        messageGlassEnabled: Boolean(input.messageGlassEnabled),
        messageGlassIntensity: input.messageGlassIntensity == null ? DEFAULT_THEME_CONFIG.messageGlassIntensity : Math.round(clampNumber(input.messageGlassIntensity, 0, 100)),
        panelGlassIntensity: input.panelGlassIntensity == null ? DEFAULT_THEME_CONFIG.panelGlassIntensity : Math.round(clampNumber(input.panelGlassIntensity, 0, 100)),
        sidebarTextEnhanceEnabled: typeof input.sidebarTextEnhanceEnabled === "boolean" ? input.sidebarTextEnhanceEnabled : true,
        sidebarTextEnhanceIntensity: Math.round(clampNumber(input.sidebarTextEnhanceIntensity, 0, 100)),
        backgroundAssetId,
        updatedAt
      };
    }
    function getCurrentLang() {
      return currentLang;
    }
    function setCurrentLang(lang) {
      currentLang = lang;
      return currentLang;
    }
    Object.defineProperty(H, "currentLang", {
      configurable: true,
      enumerable: false,
      get: getCurrentLang,
      set: setCurrentLang
    });
    Object.assign(H, {
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
      normalizeThemeConfig
    });
  })();
  (function() {
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
    class ThemeAssetRepository {
      constructor() {
        this.dbPromise = null;
      }
      openDB() {
        if (this.dbPromise) return this.dbPromise;
        this.dbPromise = new Promise((resolve, reject) => {
          try {
            const request = indexedDB.open(THEME_BACKGROUND_DB_NAME, THEME_BACKGROUND_DB_VERSION);
            request.onupgradeneeded = () => {
              const db = request.result;
              if (!db.objectStoreNames.contains(THEME_BACKGROUND_STORE)) {
                db.createObjectStore(THEME_BACKGROUND_STORE, { keyPath: "id" });
              }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error("IndexedDB open failed"));
          } catch (error) {
            reject(error);
          }
        });
        return this.dbPromise;
      }
      async getAsset(id) {
        if (!id) return null;
        const db = await this.openDB();
        return await new Promise((resolve, reject) => {
          try {
            const tx = db.transaction(THEME_BACKGROUND_STORE, "readonly");
            const store = tx.objectStore(THEME_BACKGROUND_STORE);
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error || new Error("get asset failed"));
          } catch (error) {
            reject(error);
          }
        });
      }
      async putAsset(blob, mimeType) {
        const db = await this.openDB();
        const id = createThemeAssetId();
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const row = {
          id,
          mimeType: mimeType || blob.type,
          size: blob.size,
          blob,
          createdAt: now,
          updatedAt: now
        };
        await new Promise((resolve, reject) => {
          try {
            const tx = db.transaction(THEME_BACKGROUND_STORE, "readwrite");
            const store = tx.objectStore(THEME_BACKGROUND_STORE);
            const req = store.put(row);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error || new Error("put asset failed"));
          } catch (error) {
            reject(error);
          }
        });
        return row;
      }
      async deleteAsset(id) {
        if (!id) return;
        const db = await this.openDB();
        await new Promise((resolve, reject) => {
          try {
            const tx = db.transaction(THEME_BACKGROUND_STORE, "readwrite");
            const store = tx.objectStore(THEME_BACKGROUND_STORE);
            const req = store.delete(id);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error || new Error("delete asset failed"));
          } catch (error) {
            reject(error);
          }
        });
      }
    }
    Object.assign(H, {
      ThemeAssetRepository
    });
  })();
  (function() {
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
    class ConversationManager {
      constructor(config) {
        this.container = config.container;
        this.settings = config.settings;
        this.adapter = config.adapter;
        this.t = config.i18n || ((k) => k);
        this.data = this.loadData();
        this.searchQuery = "";
        this.filterPinned = false;
        this.filterTagIds = /* @__PURE__ */ new Set();
        this.expandedFolderId = null;
        this.selectedIds = /* @__PURE__ */ new Set();
        this.batchMode = false;
        this.autoSyncInterval = null;
        this.lastSyncTime = 0;
        this.startAutoSync();
      }
      loadData() {
        let saved = null;
        if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized && window.__MY_EXT__.storageCache) {
          const cacheKeys = Object.keys(window.__MY_EXT__.storageCache || {});
          console.log("[ChatGPT Helper] 缓存已初始化，缓存中的键:", cacheKeys);
          saved = window.__MY_EXT__.storageCache["chatgpt_conversations"];
          console.log("[ChatGPT Helper] 从已初始化的缓存读取数据:", saved !== void 0 && saved !== null ? "找到数据" : "未找到数据");
          if (saved !== void 0 && saved !== null) {
            console.log("[ChatGPT Helper] 缓存中的数据类型:", typeof saved, Array.isArray(saved) ? "(数组)" : "(对象)");
          }
        } else if (window.__MY_EXT__ && window.__MY_EXT__.storageCache) {
          saved = window.__MY_EXT__.storageCache["chatgpt_conversations"];
          console.log("[ChatGPT Helper] 从缓存读取数据（缓存可能未完全初始化）");
        }
        if (saved === void 0 || saved === null) {
          saved = window.GM_getValue("chatgpt_conversations", null);
          console.log("[ChatGPT Helper] 使用 GM_getValue 读取数据:", saved ? "找到数据" : "未找到数据");
          if (saved) {
            console.log("[ChatGPT Helper] GM_getValue 返回的数据类型:", typeof saved);
          }
        }
        if (saved && typeof saved === "object") {
          const conversationCount = Object.keys(saved.conversations || {}).length;
          console.log("[ChatGPT Helper] 加载会话数据:", conversationCount, "个会话");
          console.log("[ChatGPT Helper] 会话数据结构:", {
            folders: saved.folders?.length || 0,
            tags: saved.tags?.length || 0,
            conversations: conversationCount,
            lastUsedFolderId: saved.lastUsedFolderId
          });
          return saved;
        }
        console.log("[ChatGPT Helper] 使用默认会话数据结构（未找到保存的数据）");
        if (window.__MY_EXT__ && window.__MY_EXT__.GM && window.__MY_EXT__.GM.getValue) {
          window.__MY_EXT__.GM.getValue("chatgpt_conversations", null).then((asyncValue) => {
            if (asyncValue && typeof asyncValue === "object") {
              const asyncCount = Object.keys(asyncValue.conversations || {}).length;
              console.log("[ChatGPT Helper] 异步读取发现数据:", asyncCount, "个会话");
              if (asyncCount > 0) {
                console.warn("[ChatGPT Helper] 警告：异步读取发现数据，但同步读取未找到。可能需要等待缓存初始化。");
              }
            }
          }).catch((err) => {
            console.error("[ChatGPT Helper] 异步读取错误:", err);
          });
        }
        return {
          folders: [{ id: "inbox", name: "📥 收件箱", icon: "📥", isDefault: true }],
          tags: [],
          conversations: {},
          lastUsedFolderId: "inbox"
        };
      }
      // 重新加载数据（用于缓存初始化后）
      reloadData() {
        const oldCount = Object.keys(this.data.conversations || {}).length;
        this.data = this.loadData();
        const newCount = Object.keys(this.data.conversations || {}).length;
        if (newCount !== oldCount) {
          console.log("[ChatGPT Helper] 数据已重新加载，会话数量从", oldCount, "变为", newCount);
          if (this.container && this.container.children.length > 0) {
            this.createUI();
          }
        }
      }
      saveData() {
        window.GM_setValue("chatgpt_conversations", this.data);
      }
      startAutoSync() {
        if (this.autoSyncInterval) {
          clearInterval(this.autoSyncInterval);
        }
        this.autoSyncInterval = setInterval(() => {
          this.syncConversations();
        }, 5 * 60 * 1e3);
      }
      stopAutoSync() {
        if (this.autoSyncInterval) {
          clearInterval(this.autoSyncInterval);
          this.autoSyncInterval = null;
        }
      }
      createUI() {
        if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
          const oldCount = Object.keys(this.data.conversations || {}).length;
          this.data = this.loadData();
          const newCount = Object.keys(this.data.conversations || {}).length;
          if (newCount !== oldCount) {
            console.log("[ChatGPT Helper] 在 createUI 时重新加载数据，会话数量从", oldCount, "变为", newCount);
          }
        } else {
          const checkCache = (retries = 50) => {
            if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
              const oldCount = Object.keys(this.data.conversations || {}).length;
              this.data = this.loadData();
              const newCount = Object.keys(this.data.conversations || {}).length;
              if (newCount !== oldCount) {
                console.log("[ChatGPT Helper] 缓存初始化后重新加载数据，会话数量从", oldCount, "变为", newCount);
              }
            } else if (retries > 0) {
              setTimeout(() => checkCache(retries - 1), 100);
            }
          };
          checkCache();
        }
        clearElement(this.container);
        const now = Date.now();
        if (now - this.lastSyncTime > 60 * 1e3) {
          setTimeout(() => {
            this.syncConversations();
          }, 500);
        }
        const toolbar = createElement("div", {
          className: "chatgpt-helper-conversations-toolbar",
          style: {
            padding: "10px 12px",
            borderBottom: "1px solid var(--gh-border)",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            flexShrink: 0
          }
        });
        const folderSelect = createElement("select", {
          className: "chatgpt-helper-folder-select"
        });
        this.data.folders.forEach((folder) => {
          const option = createElement("option", { value: folder.id }, folder.name);
          if (folder.id === this.data.lastUsedFolderId) option.selected = true;
          folderSelect.appendChild(option);
        });
        folderSelect.addEventListener("change", () => {
          this.data.lastUsedFolderId = folderSelect.value;
          this.saveData();
          this.renderConversationList();
        });
        toolbar.appendChild(folderSelect);
        const syncBtn = createElement("button", {
          className: "chatgpt-helper-conversations-toolbar-btn sync",
          title: this.t("syncConversations") || "同步会话"
        }, "🔄");
        syncBtn.addEventListener("click", () => this.syncConversations());
        toolbar.appendChild(syncBtn);
        const addFolderBtn = createElement("button", {
          className: "chatgpt-helper-conversations-toolbar-btn add-folder",
          title: this.t("newFolder") || "新建文件夹"
        }, "📁");
        addFolderBtn.addEventListener("click", () => this.showCreateFolderDialog());
        toolbar.appendChild(addFolderBtn);
        const batchBtn = createElement("button", {
          className: "chatgpt-helper-conversations-toolbar-btn batch-mode" + (this.batchMode ? " active" : ""),
          title: this.t("batchMode") || "批量操作"
        }, this.batchMode ? "✓" : "☑");
        batchBtn.addEventListener("click", () => {
          this.batchMode = !this.batchMode;
          if (!this.batchMode) {
            this.selectedIds.clear();
          }
          this.createUI();
        });
        toolbar.appendChild(batchBtn);
        if (this.batchMode) {
          this.batchToolbar = createElement("div", {
            className: "chatgpt-helper-batch-toolbar"
          });
          this.batchToolbar.appendChild(createElement("span", {
            style: { color: "var(--gh-text)", fontWeight: "500" }
          }, `${this.t("selected") || "已选择"} ${this.selectedIds.size} ${this.t("items") || "项"}`));
          const moveBtn = createElement("button", {
            className: "chatgpt-helper-batch-toolbar-btn"
          }, `📁 ${this.t("move") || "移动"}`);
          moveBtn.addEventListener("click", () => this.batchMove());
          this.batchToolbar.appendChild(moveBtn);
          const deleteBtn = createElement("button", {
            className: "chatgpt-helper-batch-toolbar-btn danger"
          }, "🗑 " + (this.t("delete") || "删除"));
          deleteBtn.addEventListener("click", () => this.batchDelete());
          this.batchToolbar.appendChild(deleteBtn);
          this.container.appendChild(this.batchToolbar);
        }
        this.container.appendChild(toolbar);
        const searchBar = createElement("div", {
          className: "chatgpt-helper-conversations-search"
        });
        const searchInput = createElement("input", {
          className: "chatgpt-helper-conversations-search-input",
          type: "text",
          placeholder: this.t("searchConversations") || "搜索会话...",
          value: this.searchQuery
        });
        let searchTimeout = null;
        searchInput.addEventListener("input", () => {
          this.searchQuery = searchInput.value.trim();
          if (searchTimeout) clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => this.renderConversationList(), 150);
        });
        searchBar.appendChild(searchInput);
        this.container.appendChild(searchBar);
        const listContainer = createElement("div", {
          className: "chatgpt-helper-conversations-root",
          style: {
            flex: 1,
            overflowY: "auto",
            padding: "8px"
          }
        });
        this.container.appendChild(listContainer);
        this.listContainer = listContainer;
        this.renderConversationList();
      }
      renderConversationList() {
        if (!this.listContainer) return;
        clearElement(this.listContainer);
        const folders = this.data.folders || [];
        const visibleEntries = [];
        folders.forEach((folder, index) => {
          let conversations = Object.values(this.data.conversations || {}).filter((c) => c.folderId === folder.id);
          if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            conversations = conversations.filter(
              (c) => c.title && c.title.toLowerCase().includes(query)
            );
          }
          if (this.filterPinned) {
            conversations = conversations.filter((c) => c.pinned);
          }
          if (this.searchQuery && conversations.length === 0) return;
          visibleEntries.push({ folder, index, conversations });
        });
        if (visibleEntries.length === 0) {
          this.listContainer.appendChild(createElement("div", {
            className: "chatgpt-helper-conversations-empty"
          }, this.searchQuery ? "未找到匹配结果" : "暂无会话"));
          return;
        }
        visibleEntries.forEach((entry, visibleIndex) => {
          const { folder, index, conversations } = entry;
          const folderItem = this.createFolderItem(folder, index, conversations.length);
          this.listContainer.appendChild(folderItem);
          const shouldExpand = this.expandedFolderId === folder.id;
          const conversationList = createElement("div", {
            className: "chatgpt-helper-conversations-list",
            "data-folder-id": folder.id,
            style: shouldExpand ? "display: block;" : "display: none;"
          });
          folderItem.addEventListener("click", (e) => {
            if (e.target.closest("button")) return;
            this.listContainer.querySelectorAll(".chatgpt-helper-folder-item.expanded").forEach((el) => {
              if (el !== folderItem) {
                el.classList.remove("expanded");
                const otherList = this.listContainer.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${el.dataset.folderId}"]`);
                if (otherList) {
                  otherList.style.display = "none";
                }
                const otherArrow = el.querySelector(".chatgpt-helper-folder-arrow");
                if (otherArrow) {
                  otherArrow.style.transform = "rotate(0deg)";
                }
              }
            });
            const isExpanded = folderItem.classList.toggle("expanded");
            this.expandedFolderId = isExpanded ? folder.id : null;
            const arrow = folderItem.querySelector(".chatgpt-helper-folder-arrow");
            if (arrow) {
              arrow.style.transform = isExpanded ? "rotate(90deg)" : "rotate(0deg)";
            }
            if (isExpanded) {
              this.renderConversationsInFolder(folder.id, conversationList);
              conversationList.style.display = "block";
            } else {
              conversationList.style.display = "none";
            }
          });
          if (shouldExpand) {
            folderItem.classList.add("expanded");
            this.renderConversationsInFolder(folder.id, conversationList);
          }
          this.listContainer.appendChild(conversationList);
          if (folder.id === "inbox") {
            const hasNonInboxAfter = visibleEntries.slice(visibleIndex + 1).some((e) => e.folder && e.folder.id !== "inbox");
            if (hasNonInboxAfter) {
              this.listContainer.appendChild(createElement("div", {
                className: "chatgpt-helper-folder-divider"
              }));
            }
          }
        });
      }
      createFolderItem(folder, index, count) {
        const item = createElement("div", {
          className: "chatgpt-helper-folder-item" + (folder.isDefault ? " default" : ""),
          "data-folder-id": folder.id
        });
        const info = createElement("div", {
          className: "chatgpt-helper-folder-info"
        });
        const icon = createElement("span", {
          className: "chatgpt-helper-folder-icon"
        }, folder.icon || "📁");
        info.appendChild(icon);
        const name = createElement("span", {
          className: "chatgpt-helper-folder-name"
        }, folder.name.replace(folder.icon || "", "").trim() || (folder.id === "inbox" ? "收件箱" : folder.name));
        info.appendChild(name);
        const countSpan = createElement("span", {
          className: "chatgpt-helper-folder-count"
        }, `(${count})`);
        info.appendChild(countSpan);
        item.appendChild(info);
        const actions = createElement("div", {
          className: "chatgpt-helper-folder-actions"
        });
        if (!folder.isDefault && folder.id !== "inbox") {
          const deleteBtn = createElement("button", {
            className: "chatgpt-helper-folder-delete-btn",
            title: this.t("deleteFolder") || "删除文件夹"
          }, "🗑");
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.deleteFolder(folder.id);
          });
          actions.appendChild(deleteBtn);
        }
        const arrow = createElement("span", {
          className: "chatgpt-helper-folder-arrow",
          style: {
            transform: this.expandedFolderId === folder.id ? "rotate(90deg)" : "rotate(0deg)"
          }
        }, "▸");
        actions.appendChild(arrow);
        item.appendChild(actions);
        return item;
      }
      renderConversationsInFolder(folderId, container) {
        clearElement(container);
        let conversations = Object.values(this.data.conversations).filter((c) => c.folderId === folderId);
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          conversations = conversations.filter(
            (c) => c.title && c.title.toLowerCase().includes(query)
          );
        }
        if (this.filterPinned) {
          conversations = conversations.filter((c) => c.pinned);
        }
        if (conversations.length === 0) {
          container.appendChild(createElement("div", {
            className: "chatgpt-helper-conversations-empty"
          }, this.t("noConversations") || "该文件夹暂无会话"));
          return;
        }
        conversations.sort((a, b) => {
          if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
          return (b.updatedAt || 0) - (a.updatedAt || 0);
        });
        conversations.forEach((conv) => {
          const item = createElement("div", {
            className: "chatgpt-helper-conversation-item" + (conv.pinned ? " pinned" : ""),
            "data-conv-id": conv.id
          });
          if (this.batchMode) {
            const checkbox = createElement("input", {
              type: "checkbox",
              checked: this.selectedIds.has(conv.id),
              style: {
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                width: "18px",
                height: "18px"
              }
            });
            checkbox.addEventListener("click", (e) => {
              e.stopPropagation();
              if (checkbox.checked) {
                this.selectedIds.add(conv.id);
              } else {
                this.selectedIds.delete(conv.id);
              }
              this.updateBatchToolbar();
            });
            item.appendChild(checkbox);
          }
          if (conv.pinned) {
            const pinIcon = createElement("span", {
              className: "chatgpt-helper-conversation-pin",
              style: {
                position: "absolute",
                top: "8px",
                right: "8px"
              }
            });
            pinIcon.appendChild(createSvgIconNode("pin", { size: 13 }));
            item.appendChild(pinIcon);
          }
          const title = createElement("div", {
            style: {
              fontWeight: "500",
              color: "var(--gh-text)",
              marginBottom: "4px",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              paddingRight: conv.pinned ? "20px" : "0",
              paddingLeft: this.batchMode ? "30px" : "0"
            }
          }, conv.title || "未命名对话");
          item.appendChild(title);
          if (conv.tagIds && conv.tagIds.length > 0 && this.data.tags) {
            const tagsContainer = createElement("div", {
              className: "chatgpt-helper-conversation-tags"
            });
            conv.tagIds.forEach((tagId) => {
              const tag = this.data.tags.find((t2) => t2.id === tagId);
              if (tag) {
                const tagEl = createElement("span", {
                  className: "chatgpt-helper-conversation-tag"
                }, tag.name);
                tagEl.style.setProperty("--gh-tag-color", tag.color || "var(--gh-primary)");
                tagsContainer.appendChild(tagEl);
              }
            });
            item.appendChild(tagsContainer);
          }
          const time = createElement("div", {
            style: {
              fontSize: "12px",
              color: "var(--gh-text-secondary)",
              marginTop: "4px"
            }
          }, this.formatTime(conv.updatedAt));
          item.appendChild(time);
          item.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.showContextMenu(e, conv);
          });
          item.addEventListener("click", (e) => {
            if (this.batchMode && e.target.type !== "checkbox") {
              const checkbox = item.querySelector('input[type="checkbox"]');
              if (checkbox) {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                  this.selectedIds.add(conv.id);
                } else {
                  this.selectedIds.delete(conv.id);
                }
                this.updateBatchToolbar();
              }
            } else if (!this.batchMode && conv.url) {
              window.location.href = conv.url;
            }
          });
          container.appendChild(item);
        });
      }
      syncConversations() {
        const conversations = this.adapter.getConversationList();
        if (!conversations || conversations.length === 0) {
          this.showToast(this.t("noConversations") || "未找到会话，请先打开侧边栏");
          return;
        }
        this.lastSyncTime = Date.now();
        let newCount = 0;
        let updatedCount = 0;
        const folderId = this.data.lastUsedFolderId || "inbox";
        conversations.forEach((item) => {
          const id = item.id;
          const title = item.title;
          const url = item.url;
          const isPinned = item.isPinned || false;
          const remoteUpdatedAt = item.updatedAt || item.createdAt;
          const localConversation = this.data.conversations[id];
          const actualUpdatedAt = remoteUpdatedAt || localConversation?.updatedAt || localConversation?.createdAt || Date.now();
          if (!localConversation) {
            this.data.conversations[id] = {
              id,
              title,
              url,
              folderId,
              // 确保添加到收件箱
              pinned: isPinned,
              createdAt: actualUpdatedAt,
              updatedAt: actualUpdatedAt
            };
            newCount++;
          } else {
            if (localConversation.title !== title) {
              localConversation.title = title;
              updatedCount++;
            }
            if (localConversation.url !== url) {
              localConversation.url = url;
            }
            if (localConversation.pinned !== isPinned) {
              localConversation.pinned = isPinned;
              updatedCount++;
            }
            const currentUpdated = localConversation.updatedAt || 0;
            if (actualUpdatedAt > currentUpdated) {
              localConversation.updatedAt = actualUpdatedAt;
            } else if (!remoteUpdatedAt && localConversation.updatedAt) ;
          }
        });
        this.saveData();
        this.renderConversationList();
        if ((newCount > 0 || updatedCount > 0) && this.expandedFolderId) {
          const expandedFolderList = this.listContainer?.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${this.expandedFolderId}"]`);
          if (expandedFolderList) {
            this.renderConversationsInFolder(this.expandedFolderId, expandedFolderList);
          }
        }
        const msg = newCount > 0 ? `${this.t("synced") || "已同步"} ${newCount} ${this.t("newSessions") || "个新会话"}` : updatedCount > 0 ? `${this.t("synced") || "已同步"} ${updatedCount} ${this.t("updatedSessions") || "个会话"}` : this.t("synced") || "同步完成";
        this.showToast(msg);
      }
      showCreateFolderDialog() {
        const name = prompt("请输入文件夹名称：");
        if (!name || !name.trim()) return;
        const folder = {
          id: "folder_" + Date.now(),
          name: `📁 ${name.trim()}`,
          icon: "📁",
          isDefault: false
        };
        this.data.folders.push(folder);
        this.saveData();
        this.createUI();
      }
      deleteFolder(folderId) {
        if (!folderId || folderId === "inbox") return;
        const folder = (this.data.folders || []).find((f) => f.id === folderId);
        if (!folder || folder.isDefault) return;
        const folderName = (folder.name || "").trim() || folderId;
        const confirmTpl = this.t("deleteFolderConfirm") || '确定要删除文件夹 "{name}" 吗？\n文件夹内的会话将移动到收件箱。';
        const confirmMsg = confirmTpl.replace("{name}", folderName.replace(/"/g, ""));
        if (!confirm(confirmMsg)) return;
        const conversations = this.data.conversations || {};
        Object.values(conversations).forEach((conv) => {
          if (conv && conv.folderId === folderId) {
            conv.folderId = "inbox";
          }
        });
        this.data.folders = (this.data.folders || []).filter((f) => f.id !== folderId);
        if (this.data.lastUsedFolderId === folderId) this.data.lastUsedFolderId = "inbox";
        if (this.expandedFolderId === folderId) this.expandedFolderId = null;
        this.saveData();
        this.createUI();
        this.showToast(this.t("folderDeleted") || "文件夹已删除");
      }
      formatTime(timestamp) {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        try {
          const locale = getCurrentLang && getCurrentLang() === "zh-CN" ? "zh-CN" : "en-US";
          return date.toLocaleString(locale, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
        } catch (e) {
          return date.toLocaleString();
        }
      }
      updateBatchToolbar() {
        if (this.batchToolbar) {
          const countEl = this.batchToolbar.querySelector("span");
          if (countEl) {
            countEl.textContent = `已选择 ${this.selectedIds.size} 项`;
          }
        }
      }
      batchMove() {
        if (this.selectedIds.size === 0) {
          this.showToast(this.t("selectConversationsFirst") || "请先选择要移动的会话");
          return;
        }
        this.showMoveToFolderDialog(null, true);
      }
      batchDelete() {
        if (this.selectedIds.size === 0) {
          this.showToast(this.t("selectConversationsFirst") || "请先选择要删除的会话");
          return;
        }
        if (!confirm(`确定要删除 ${this.selectedIds.size} 个会话吗？`)) return;
        this.selectedIds.forEach((id) => {
          delete this.data.conversations[id];
        });
        this.selectedIds.clear();
        this.saveData();
        this.renderConversationList();
        this.updateBatchToolbar();
        this.showToast("已删除");
      }
      async batchExport() {
        if (this.selectedIds.size === 0) {
          this.showToast(this.t("selectConversationsFirst") || "请先选择要导出的会话");
          return;
        }
        const format = prompt("选择导出格式：\n1. Markdown\n2. JSON\n3. TXT", "1");
        if (!format) return;
        const formatMap = { "1": "markdown", "2": "json", "3": "txt" };
        const selectedFormat = formatMap[format] || "markdown";
        for (const id of this.selectedIds) {
          const conv = this.data.conversations[id];
          if (conv && conv.url) {
            await this.exportConversation(conv, selectedFormat);
          }
        }
        this.showToast(`已导出 ${this.selectedIds.size} 个会话`);
      }
      async exportConversation(conv, format = "markdown") {
        if (window.location.href !== conv.url) {
          this.showToast(this.t("openFirst") || `请先打开会话: ${conv.title}`);
          return;
        }
        const messages = this.extractMessages();
        if (messages.length === 0) {
          this.showToast(this.t("noContent") || "未找到对话内容");
          return;
        }
        let content = "";
        const filename = `${conv.title || "未命名"}_${Date.now()}`;
        switch (format) {
          case "markdown":
            content = this.formatToMarkdown(conv, messages);
            this.downloadFile(content, `${filename}.md`, "text/markdown");
            break;
          case "json":
            content = this.formatToJSON(conv, messages);
            this.downloadFile(content, `${filename}.json`, "application/json");
            break;
          case "txt":
            content = this.formatToTXT(conv, messages);
            this.downloadFile(content, `${filename}.txt`, "text/plain");
            break;
        }
      }
      extractMessages() {
        const messages = [];
        const messageElements = this.adapter.getChatMessages();
        messageElements.forEach((el, index) => {
          const role = el.getAttribute("data-message-author-role") || (el.querySelector('[data-message-author-role="user"]') ? "user" : "assistant");
          const content = (el.innerText || el.textContent || "").trim();
          if (content) {
            messages.push({ role, content });
          }
        });
        return messages;
      }
      formatToMarkdown(conv, messages) {
        const lines = [];
        const now = (/* @__PURE__ */ new Date()).toLocaleString();
        const userLabel = "用户";
        lines.push(`# 📤 导出信息`);
        lines.push(`- **会话标题**: ${conv.title || "未命名"}`);
        lines.push(`- **导出时间**: ${now}`);
        lines.push(`- **来源**: ChatGPT`);
        lines.push(`- **链接**: ${window.location.href}`);
        lines.push("---");
        lines.push("");
        messages.forEach((msg) => {
          if (msg.role === "user") {
            lines.push(`## 🙋 ${userLabel}`);
            lines.push("");
            lines.push(msg.content);
            lines.push("");
            lines.push("---");
            lines.push("");
          } else {
            lines.push(`## 🤖 ChatGPT`);
            lines.push("");
            lines.push(msg.content);
            lines.push("");
            lines.push("---");
            lines.push("");
          }
        });
        return lines.join("\n");
      }
      formatToJSON(conv, messages) {
        const data = {
          metadata: {
            title: conv.title || "未命名",
            id: conv.id,
            url: window.location.href,
            exportTime: (/* @__PURE__ */ new Date()).toISOString(),
            source: "ChatGPT"
          },
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        };
        return JSON.stringify(data, null, 2);
      }
      formatToTXT(conv, messages) {
        const lines = [];
        const now = (/* @__PURE__ */ new Date()).toLocaleString();
        const userLabel = "用户";
        lines.push(`会话标题: ${conv.title || "未命名"}`);
        lines.push(`导出时间: ${now}`);
        lines.push(`来源: ChatGPT`);
        lines.push(`链接: ${window.location.href}`);
        lines.push("");
        lines.push("=".repeat(50));
        lines.push("");
        messages.forEach((msg) => {
          if (msg.role === "user") {
            lines.push(`[${userLabel}]`);
          } else {
            lines.push(`[ChatGPT]`);
          }
          lines.push(msg.content);
          lines.push("");
          lines.push("-".repeat(50));
          lines.push("");
        });
        return lines.join("\n");
      }
      downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      showMoveToFolderDialog(conv, isBatch = false) {
        const overlay = createElement("div", {
          className: "chatgpt-helper-prompt-dialog-overlay",
          role: "presentation"
        });
        const dialog = createElement("div", {
          className: "chatgpt-helper-prompt-dialog chatgpt-helper-compact-dialog",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "移动到文件夹"
        });
        dialog.appendChild(createElement("div", {
          className: "chatgpt-helper-prompt-dialog-title"
        }, "移动到文件夹"));
        const folderSelect = createElement("select", {
          className: "chatgpt-helper-prompt-dialog-field"
        });
        this.data.folders.forEach((folder) => {
          const option = createElement("option", { value: folder.id }, folder.name);
          folderSelect.appendChild(option);
        });
        dialog.appendChild(folderSelect);
        const btnContainer = createElement("div", {
          className: "chatgpt-helper-prompt-dialog-actions"
        });
        const cancelBtn = createElement("button", {
          className: "chatgpt-helper-prompt-dialog-btn secondary",
          type: "button"
        }, "取消");
        cancelBtn.addEventListener("click", () => overlay.remove());
        const confirmBtn = createElement("button", {
          className: "chatgpt-helper-prompt-dialog-btn primary",
          type: "button"
        }, "确定");
        confirmBtn.addEventListener("click", () => {
          const folderId = folderSelect.value;
          if (isBatch) {
            this.selectedIds.forEach((id) => {
              if (this.data.conversations[id]) {
                this.data.conversations[id].folderId = folderId;
              }
            });
            this.saveData();
            this.renderConversationList();
            this.updateBatchToolbar();
            this.showToast(`已移动 ${this.selectedIds.size} 个会话`);
          } else if (conv) {
            conv.folderId = folderId;
            this.saveData();
            this.renderConversationList();
            this.showToast("已移动");
          }
          overlay.remove();
        });
        btnContainer.appendChild(cancelBtn);
        btnContainer.appendChild(confirmBtn);
        dialog.appendChild(btnContainer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.remove();
        });
      }
      showContextMenu(e, conv) {
        const menu = createElement("div", {
          className: "chatgpt-helper-context-menu",
          style: {
            position: "fixed",
            top: e.clientY + "px",
            left: e.clientX + "px"
          }
        });
        const items = [
          { label: "置顶", iconName: "pin", action: () => this.togglePin(conv) },
          { label: "移动到...", iconName: "folder", action: () => this.showMoveToFolderDialog(conv) },
          { label: "添加标签", iconName: "tag", action: () => this.showTagDialog(conv) },
          { label: "删除", iconName: "trash", danger: true, action: () => this.deleteConversation(conv) }
        ];
        items.forEach((item) => {
          const menuItem = createElement("div", {
            className: `chatgpt-helper-context-menu-item${item.danger ? " danger" : ""}`,
            role: "menuitem"
          });
          menuItem.appendChild(createSvgIconNode(item.iconName, { size: 14 }));
          menuItem.appendChild(createElement("span", {}, item.label));
          menuItem.addEventListener("click", () => {
            item.action();
            menu.remove();
          });
          menu.appendChild(menuItem);
        });
        document.body.appendChild(menu);
        const removeMenu = () => {
          menu.remove();
          document.removeEventListener("click", removeMenu);
        };
        setTimeout(() => document.addEventListener("click", removeMenu), 100);
      }
      togglePin(conv) {
        conv.pinned = !conv.pinned;
        this.saveData();
        this.renderConversationList();
        this.showToast(conv.pinned ? "已置顶" : "已取消置顶");
      }
      deleteConversation(conv) {
        if (!confirm(`确定要删除 "${conv.title}" 吗？`)) return;
        delete this.data.conversations[conv.id];
        this.saveData();
        this.renderConversationList();
        this.showToast("已删除");
      }
      showTagDialog(conv) {
        const tagName = prompt("输入标签名称（留空删除标签）：");
        if (tagName === null) return;
        if (!this.data.tags) this.data.tags = [];
        if (tagName.trim()) {
          let tag = this.data.tags.find((t2) => t2.name.toLowerCase() === tagName.toLowerCase());
          if (!tag) {
            const preset = getThemePresetByKey(this.settings?.themeConfig?.presetKey || DEFAULT_THEME_CONFIG.presetKey);
            tag = {
              id: "tag_" + Date.now(),
              name: tagName.trim(),
              color: preset.primary
            };
            this.data.tags.push(tag);
          }
          if (!conv.tagIds) conv.tagIds = [];
          if (!conv.tagIds.includes(tag.id)) {
            conv.tagIds.push(tag.id);
          }
        } else {
          delete conv.tagIds;
        }
        this.saveData();
        this.renderConversationList();
        this.showToast("标签已更新");
      }
      showToast(message) {
        const existing = document.getElementById("chatgpt-helper-toast");
        if (existing) existing.remove();
        const toast = createElement("div", {
          id: "chatgpt-helper-toast",
          className: "chatgpt-helper-toast"
        }, message);
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2e3);
      }
    }
    Object.assign(H, {
      ConversationManager
    });
  })();
  (function() {
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
      OutlineManager,
      CopyManager,
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    class ScrollManager {
      constructor(adapter) {
        this.adapter = adapter;
      }
      get container() {
        return this.adapter.getResponseContainer();
      }
      get scrollTop() {
        return this.container ? this.container.scrollTop : window.scrollY;
      }
      set scrollTop(val) {
        if (this.container) {
          this.container.scrollTop = val;
        } else {
          window.scrollTo(0, val);
        }
      }
      get scrollHeight() {
        return this.container ? this.container.scrollHeight : document.body.scrollHeight;
      }
      get clientHeight() {
        return this.container ? this.container.clientHeight : window.innerHeight;
      }
      scrollTo(options) {
        const container = this.container;
        if (!container) {
          const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
          const targetTop2 = options && typeof options === "object" ? options.top !== void 0 ? options.top : window.scrollY : typeof options === "number" ? options : window.scrollY;
          const currentTop2 = window.scrollY;
          const needsScroll2 = Math.abs(targetTop2 - currentTop2) > 1;
          if (isAtBottomWindow && needsScroll2) {
            console.log("[ChatGPT Helper] scrollTo (window): 在底部，使用强制滚动方法，目标位置:", targetTop2, "当前位置:", currentTop2);
            const scrollElement = document.scrollingElement || document.documentElement || document.body;
            window.__ghBypassLock = true;
            const forceScroll = () => {
              try {
                scrollElement.scrollTop = targetTop2;
                if (document.documentElement) {
                  document.documentElement.scrollTop = targetTop2;
                }
                if (document.body) {
                  document.body.scrollTop = targetTop2;
                }
                window.scrollTo({ top: targetTop2, behavior: options?.behavior || "instant" });
              } catch (e) {
                console.error("[ChatGPT Helper] window 强制滚动失败:", e);
              }
            };
            forceScroll();
            setTimeout(() => forceScroll(), 0);
            setTimeout(() => forceScroll(), 10);
            setTimeout(() => forceScroll(), 20);
            let attempts = 0;
            const maxAttempts = 100;
            const scrollInterval = setInterval(() => {
              attempts++;
              const before = window.scrollY;
              window.__ghBypassLock = true;
              forceScroll();
              const current = window.scrollY;
              if (Math.abs(current - targetTop2) <= 5 || attempts >= maxAttempts) {
                clearInterval(scrollInterval);
                setTimeout(() => delete window.__ghBypassLock, 100);
                console.log("[ChatGPT Helper] window 强制滚动完成，最终位置:", current, "目标位置:", targetTop2);
              } else if (Math.abs(current - before) > 1) ;
              else if (attempts > 20) {
                try {
                  if (targetTop2 < currentTop2) {
                    const firstElement = document.body.firstElementChild || document.body.firstChild;
                    if (firstElement && firstElement.nodeType === 1) {
                      firstElement.scrollIntoView({ behavior: "instant", block: "start", __bypassLock: true });
                    }
                  } else {
                    const lastElement = document.body.lastElementChild || document.body.lastChild;
                    if (lastElement && lastElement.nodeType === 1) {
                      lastElement.scrollIntoView({ behavior: "instant", block: "end", __bypassLock: true });
                    }
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] window scrollIntoView 失败:", e);
                }
                clearInterval(scrollInterval);
                setTimeout(() => delete window.__ghBypassLock, 100);
              }
            }, 10);
          } else {
            if (options && typeof options === "object") {
              window.scrollTo({ top: options.top || 0, behavior: options.behavior || "auto" });
            } else {
              window.scrollTo(0, options || 0);
            }
          }
          return;
        }
        const isAtBottomContainer = this.isAtBottom(50);
        let targetTop;
        if (options && typeof options === "object") {
          targetTop = options.top !== void 0 ? options.top : container.scrollTop;
        } else if (typeof options === "number") {
          targetTop = options;
        } else {
          targetTop = container.scrollTop;
        }
        const currentTop = container.scrollTop;
        const needsScroll = Math.abs(targetTop - currentTop) > 1;
        const isScrollingUp = targetTop < currentTop;
        if (isAtBottomContainer && needsScroll && isScrollingUp) {
          console.log("[ChatGPT Helper] scrollTo: 在底部且向上滚动，使用强制滚动方法，目标位置:", targetTop, "当前位置:", currentTop);
          container.__ghBypassLock = true;
          window.__ghBypassLock = true;
          const proto = Object.getPrototypeOf(container);
          const descriptor = Object.getOwnPropertyDescriptor(proto, "scrollTop") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop") || Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
          const forceScroll = () => {
            try {
              if (descriptor && descriptor.set) {
                descriptor.set.call(container, targetTop);
              } else {
                Object.defineProperty(container, "scrollTop", {
                  value: targetTop,
                  writable: true,
                  configurable: true
                });
              }
            } catch (e) {
              try {
                container.scrollTop = targetTop;
              } catch (e2) {
                console.error("[ChatGPT Helper] 强制设置 scrollTop 失败:", e2);
              }
            }
          };
          forceScroll();
          setTimeout(() => {
            container.__ghBypassLock = true;
            window.__ghBypassLock = true;
            forceScroll();
          }, 0);
          setTimeout(() => {
            container.__ghBypassLock = true;
            window.__ghBypassLock = true;
            forceScroll();
          }, 10);
          setTimeout(() => {
            container.__ghBypassLock = true;
            window.__ghBypassLock = true;
            forceScroll();
          }, 20);
          try {
            container.scrollTo({ top: targetTop, behavior: options?.behavior || "instant", __bypassLock: true });
          } catch (e) {
            console.log("[ChatGPT Helper] scrollTo 失败:", e);
          }
          let attempts = 0;
          const maxAttempts = 50;
          const scrollInterval = setInterval(() => {
            attempts++;
            const before = container.scrollTop;
            container.__ghBypassLock = true;
            window.__ghBypassLock = true;
            forceScroll();
            const current = container.scrollTop;
            if (Math.abs(current - targetTop) <= 5 || attempts >= maxAttempts) {
              clearInterval(scrollInterval);
              setTimeout(() => {
                delete container.__ghBypassLock;
                delete window.__ghBypassLock;
              }, 100);
              console.log("[ChatGPT Helper] 强制滚动完成，最终位置:", current, "目标位置:", targetTop, "尝试次数:", attempts);
            } else if (Math.abs(current - before) > 1) ;
            else if (attempts > 10) {
              console.log("[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView");
              try {
                const firstChild = container.firstElementChild || container.firstChild;
                if (firstChild && firstChild.nodeType === 1) {
                  firstChild.scrollIntoView({ behavior: "instant", block: "start", __bypassLock: true });
                }
              } catch (e) {
                console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
              }
              clearInterval(scrollInterval);
              setTimeout(() => {
                delete container.__ghBypassLock;
                delete window.__ghBypassLock;
              }, 100);
            }
          }, 10);
          return;
        }
        const shouldBypass = options && typeof options === "object" && options.__bypassLock;
        if (shouldBypass) {
          container.__ghBypassLock = true;
        }
        try {
          if (typeof options === "object") {
            container.scrollTo(options);
          } else {
            container.scrollTop = options || 0;
          }
        } catch (e) {
          if (options && typeof options === "object" && options.top !== void 0) {
            container.__ghBypassLock = true;
            container.scrollTop = options.top;
          } else if (typeof options === "number") {
            container.__ghBypassLock = true;
            container.scrollTop = options;
          }
        } finally {
          if (shouldBypass) {
            delete container.__ghBypassLock;
          }
        }
      }
      isAtBottom(threshold = 100) {
        const c = this.container;
        if (!c) {
          return window.innerHeight + window.scrollY >= document.body.scrollHeight - threshold;
        }
        return c.scrollHeight - c.scrollTop - c.clientHeight <= threshold;
      }
    }
    class HistoryLoader {
      constructor(scrollManager, showToastFunc) {
        this.scrollManager = scrollManager;
        this.showToast = showToastFunc || (() => {
        });
        this.isLoading = false;
        this.aborted = false;
        this.overlay = null;
      }
      async loadAllAndScrollTop() {
        if (this.isLoading) {
          this.showToast("正在加载历史...");
          return;
        }
        const container = this.scrollManager.container;
        if (!container) {
          this.showToast("未找到滚动容器");
          return;
        }
        this.isLoading = true;
        this.aborted = false;
        const WAIT_MS = 800;
        const MAX_NO_CHANGE_ROUNDS = 3;
        const MAX_TOTAL_ROUNDS = 50;
        const initialHeight = container.scrollHeight;
        let lastHeight = initialHeight;
        let noChangeCount = 0;
        let loopCount = 0;
        container.scrollTop = 0;
        const loadLoop = () => {
          if (this.aborted) {
            this.finish(false);
            return;
          }
          loopCount++;
          if (loopCount >= MAX_TOTAL_ROUNDS) {
            this.finish(true);
            return;
          }
          container.scrollTop = 0;
          container.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, bubbles: true }));
          setTimeout(() => {
            if (this.aborted) {
              this.finish(false);
              return;
            }
            const currentHeight = container.scrollHeight;
            if (currentHeight > lastHeight) {
              lastHeight = currentHeight;
              noChangeCount = 0;
              this.updateOverlayText(`正在加载历史... (${Math.round(currentHeight / 1e3)}k)`);
              loadLoop();
            } else {
              noChangeCount++;
              const isAtTop = container.scrollTop < 10;
              const isFirstRoundNoChange = loopCount === 1 && currentHeight === initialHeight;
              if (isFirstRoundNoChange && isAtTop) {
                this.finish(false, true);
              } else if (noChangeCount >= MAX_NO_CHANGE_ROUNDS) {
                this.finish(true);
              } else {
                this.updateOverlayText(`正在加载历史... (${noChangeCount}/${MAX_NO_CHANGE_ROUNDS})`);
                loadLoop();
              }
            }
          }, WAIT_MS);
        };
        loadLoop();
      }
      finish(success, silent = false) {
        this.isLoading = false;
        this.aborted = false;
        this.hideOverlay();
        if (success && !silent) {
          this.showToast("历史加载完成");
        }
      }
      abort() {
        this.aborted = true;
      }
      showOverlay() {
        if (this.overlay) return;
        const overlay = createElement("div", {
          id: "chatgpt-helper-loading-overlay",
          className: "chatgpt-helper-loading-overlay"
        });
        const spinner = createElement("div", { className: "chatgpt-helper-loading-spinner" });
        const text = createElement("div", {
          id: "chatgpt-helper-loading-text",
          className: "chatgpt-helper-loading-text"
        }, "正在加载历史...");
        const hint = createElement("div", {
          className: "chatgpt-helper-loading-hint"
        }, "请稍候...");
        const stopBtn = createElement("button", {
          className: "chatgpt-helper-loading-stop-btn",
          type: "button"
        }, "停止");
        stopBtn.addEventListener("click", () => this.abort());
        overlay.appendChild(spinner);
        overlay.appendChild(text);
        overlay.appendChild(hint);
        overlay.appendChild(stopBtn);
        document.body.appendChild(overlay);
        this.overlay = overlay;
      }
      hideOverlay() {
        if (this.overlay) {
          this.overlay.remove();
          this.overlay = null;
        }
      }
      updateOverlayText(text) {
        if (this.overlay) {
          const textEl = this.overlay.querySelector("#chatgpt-helper-loading-text");
          if (textEl) textEl.textContent = text;
        }
      }
    }
    class AnchorManager {
      constructor(scrollManager, showToastFunc) {
        this.scrollManager = scrollManager;
        this.showToast = showToastFunc || (() => {
        });
        this.previousAnchor = null;
        this.currentAnchor = null;
        this.onAnchorChange = null;
      }
      bindUI(callback) {
        this.onAnchorChange = callback;
      }
      _captureCurrentPosition() {
        return {
          top: this.scrollManager.scrollTop,
          ts: Date.now()
        };
      }
      setAnchor(top) {
        this.previousAnchor = {
          top: top !== void 0 ? top : this.scrollManager.scrollTop,
          ts: Date.now()
        };
        if (this.onAnchorChange) this.onAnchorChange(true);
      }
      backToAnchor() {
        if (!this.previousAnchor) return false;
        const container = this.scrollManager.container;
        if (!container) return false;
        const currentPos = this._captureCurrentPosition();
        if (this.previousAnchor.top !== void 0) {
          this.scrollManager.scrollTo({ top: this.previousAnchor.top, behavior: "smooth" });
          this.currentAnchor = this.previousAnchor;
          this.previousAnchor = currentPos;
          return true;
        }
        return false;
      }
      hasAnchor() {
        return this.previousAnchor !== null;
      }
      reset() {
        this.previousAnchor = null;
        this.currentAnchor = null;
        if (this.onAnchorChange) this.onAnchorChange(false);
      }
    }
    class ReadingProgressManager {
      constructor(settings, scrollManager, adapter, showToastFunc) {
        this.settings = settings;
        this.scrollManager = scrollManager;
        this.adapter = adapter;
        this.showToast = showToastFunc || (() => {
        });
        this.lastSaveTime = 0;
        this.isRecording = false;
        this.scrollHandler = null;
        this.restoredTop = null;
      }
      startRecording() {
        if (this.isRecording) return;
        if (!this.settings.readingHistory?.persistence) return;
        this.isRecording = true;
        this.scrollHandler = () => this.handleScroll();
        const container = this.scrollManager.container;
        if (container) {
          container.addEventListener("scroll", this.scrollHandler, { passive: true });
        }
        window.addEventListener("scroll", this.scrollHandler, { capture: true, passive: true });
      }
      stopRecording() {
        if (!this.isRecording) return;
        this.isRecording = false;
        if (this.scrollHandler) {
          const container = this.scrollManager.container;
          if (container) {
            container.removeEventListener("scroll", this.scrollHandler);
          }
          window.removeEventListener("scroll", this.scrollHandler, { capture: true });
          this.scrollHandler = null;
        }
      }
      handleScroll() {
        if (!this.settings.readingHistory?.persistence) return;
        const now = Date.now();
        if (now - this.lastSaveTime > 1e3) {
          this.saveProgress();
          this.lastSaveTime = now;
        }
      }
      getKey() {
        const url = window.location.href;
        const match = url.match(/\/c\/([^\/\?]+)/) || url.match(/\/chat\/([^\/\?]+)/);
        return match ? `chatgpt:${match[1]}` : `chatgpt:${url}`;
      }
      saveProgress() {
        if (!this.isRecording) return;
        if (this.adapter.isNewConversation && this.adapter.isNewConversation()) return;
        const scrollTop = this.scrollManager.scrollTop;
        if (scrollTop < 0) return;
        const key = this.getKey();
        const data = {
          top: scrollTop,
          ts: Date.now()
        };
        const allData = window.GM_getValue("chatgpt_reading_progress", {});
        allData[key] = data;
        window.GM_setValue("chatgpt_reading_progress", allData);
      }
      async restoreProgress() {
        if (!this.settings.readingHistory?.autoRestore) return false;
        const key = this.getKey();
        const allData = window.GM_getValue("chatgpt_reading_progress", {});
        const data = allData[key];
        if (!data) return false;
        const container = this.scrollManager.container;
        if (!container) return false;
        return new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 30;
          const tryScroll = () => {
            if (attempts > maxAttempts) {
              if (data.top !== void 0 && container.scrollHeight >= data.top) {
                this.scrollManager.scrollTo({ top: data.top, behavior: "instant" });
                this.restoredTop = data.top;
                resolve(true);
              } else {
                resolve(false);
              }
              return;
            }
            attempts++;
            const currentHeight = container.scrollHeight;
            if (data.top !== void 0 && currentHeight >= data.top) {
              this.scrollManager.scrollTo({ top: data.top, behavior: "instant" });
              this.restoredTop = data.top;
              resolve(true);
            } else {
              container.scrollTop = 0;
              container.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, bubbles: true }));
              setTimeout(tryScroll, 500);
            }
          };
          tryScroll();
        });
      }
      cleanup() {
        const lastRun = window.GM_getValue("chatgpt_progress_cleanup_last_run", 0);
        const now = Date.now();
        if (now - lastRun < 24 * 60 * 60 * 1e3) return;
        const days = this.settings.readingHistory?.cleanupDays || 30;
        if (days === -1) return;
        const expireTime = days * 24 * 60 * 60 * 1e3;
        const allData = window.GM_getValue("chatgpt_reading_progress", {});
        let changed = false;
        Object.keys(allData).forEach((key) => {
          if (now - allData[key].ts > expireTime) {
            delete allData[key];
            changed = true;
          }
        });
        if (changed) {
          window.GM_setValue("chatgpt_reading_progress", allData);
        }
        window.GM_setValue("chatgpt_progress_cleanup_last_run", now);
      }
    }
    class ScrollLockManager {
      constructor(siteAdapter) {
        this.siteAdapter = siteAdapter;
        this.enabled = false;
        this.originalApis = {
          scrollIntoView: Element.prototype.scrollIntoView,
          scrollTo: window.scrollTo,
          scrollBy: window.scrollBy,
          elementScrollTo: Element.prototype.scrollTo,
          elementScrollBy: Element.prototype.scrollBy,
          elementScroll: Element.prototype.scroll,
          scrollTopDescriptor: null
        };
        this.usesPrototypeHijack = false;
        this.observer = null;
        this.autoScrollObserver = null;
        this.cleanupInterval = null;
        this.lastScrollTop = this.getCurrentScrollTop();
        this.lockedScrollTop = this.lastScrollTop;
        this.listeningContainer = null;
        this._cachedScrollContainer = null;
        this._cachedResponseContainer = null;
        this._cacheTimestamp = 0;
        this._cacheTimeout = 2e3;
        this._debounceTimer = null;
        this._throttleTimer = null;
        this._isUpdatingScroll = false;
        this._rafId = null;
        this._pendingScrollUpdate = false;
        this._correctionRaf = null;
        this._lastUserInteractionAt = 0;
        this._lastProgrammaticFixAt = 0;
        this._userIntentWindowMs = 480;
        this._scrollJumpThreshold = 140;
        this._userInputHandler = null;
        this._lastTouchY = null;
      }
      getScrollContainer() {
        const now = Date.now();
        if (this._cachedScrollContainer && this._cachedScrollContainer.isConnected && now - this._cacheTimestamp < this._cacheTimeout) {
          return this._cachedScrollContainer;
        }
        const container = this.siteAdapter?.getScrollContainer?.();
        const result = container && container.isConnected ? container : document.scrollingElement || document.documentElement || document.body;
        this._cachedScrollContainer = result;
        this._cacheTimestamp = now;
        return result;
      }
      getResponseContainer() {
        const now = Date.now();
        if (this._cachedResponseContainer && this._cachedResponseContainer.isConnected && now - this._cacheTimestamp < this._cacheTimeout) {
          return this._cachedResponseContainer;
        }
        const container = this.siteAdapter?.getResponseContainer?.() || this.siteAdapter?.getScrollContainer?.();
        if (container && container.isConnected) {
          this._cachedResponseContainer = container;
          this._cacheTimestamp = now;
        }
        return container;
      }
      clearCache() {
        this._cachedScrollContainer = null;
        this._cachedResponseContainer = null;
        this._cacheTimestamp = 0;
      }
      getCurrentScrollTop() {
        const container = this.getScrollContainer();
        if (!container) return window.scrollY || 0;
        return container.scrollTop || 0;
      }
      isMainScrollElement(element) {
        const container = this._cachedScrollContainer || this.getScrollContainer();
        if (!container || !element) return false;
        if (element === container) return true;
        if (container === document.scrollingElement && (element === document.documentElement || element === document.body)) return true;
        return false;
      }
      shouldBypassLock(options, element) {
        if (options && typeof options === "object" && options.__bypassLock) return true;
        if (element && element.__ghBypassLock) return true;
        return false;
      }
      refreshContainerListener() {
        if (!this.onScrollHandler) return;
        const container = this.getScrollContainer();
        if (this.listeningContainer === container) return;
        if (this.listeningContainer) {
          try {
            this.listeningContainer.removeEventListener("scroll", this.onScrollHandler);
          } catch (e) {
          }
        }
        if (container) {
          try {
            container.addEventListener("scroll", this.onScrollHandler, { passive: true });
          } catch (e) {
            console.error("[ChatGPT Helper] 添加滚动监听器错误:", e);
          }
        }
        this.listeningContainer = container;
        const current = this.getCurrentScrollTop();
        this.lastScrollTop = current;
        this.lockedScrollTop = current;
      }
      setEnabled(enabled) {
        if (this.enabled === enabled) return;
        this.enabled = enabled;
        if (enabled) {
          this.enable();
        } else {
          this.disable();
        }
      }
      enable() {
        this.clearCache();
        this.lastScrollTop = this.getCurrentScrollTop();
        this.lockedScrollTop = this.lastScrollTop;
        this.startObserver();
        this.startScrollListener();
        this.stopAutoScroll();
      }
      disable() {
        this.clearCache();
        this.stopObserver();
        this.stopScrollListener();
        this.stopAutoScroll();
        if (this._correctionRaf) {
          cancelAnimationFrame(this._correctionRaf);
          this._correctionRaf = null;
        }
        this._isUpdatingScroll = false;
      }
      hijackApis() {
        return;
      }
      restoreApis() {
        return;
      }
      shouldBlockScroll() {
        return this.enabled;
      }
      markUserInteraction() {
        this._lastUserInteractionAt = Date.now();
        const current = this.getCurrentScrollTop();
        this.lastScrollTop = current;
        this.lockedScrollTop = current;
      }
      hasRecentUserInteraction() {
        return Date.now() - this._lastUserInteractionAt < this._userIntentWindowMs;
      }
      isProtectingPosition() {
        if (!this.enabled) return false;
        if (this.hasRecentUserInteraction()) return false;
        return Boolean(this.siteAdapter?.isGenerating?.());
      }
      startScrollListener() {
        const onScroll = () => {
          const currentScrollTop = this.getCurrentScrollTop();
          if (!this.enabled) {
            this.lastScrollTop = currentScrollTop;
            this.lockedScrollTop = currentScrollTop;
            return;
          }
          if (this._isUpdatingScroll || Date.now() - this._lastProgrammaticFixAt < 80) {
            this.lastScrollTop = currentScrollTop;
            this.lockedScrollTop = currentScrollTop;
            return;
          }
          if (!this.isProtectingPosition()) {
            this.lastScrollTop = currentScrollTop;
            this.lockedScrollTop = currentScrollTop;
            return;
          }
          if (currentScrollTop > this.lockedScrollTop + this._scrollJumpThreshold) {
            this.scheduleScrollCorrection(this.lockedScrollTop);
            return;
          }
          this.lastScrollTop = currentScrollTop;
        };
        const markIntent = (event) => {
          if (!this.enabled) return;
          if (event.type === "keydown") {
            const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Space"];
            if (!keys.includes(event.key)) return;
          }
          if (event.type === "touchmove" && event.touches && event.touches.length) {
            const currentY = event.touches[0].clientY;
            if (this._lastTouchY != null && Math.abs(currentY - this._lastTouchY) < 3) {
              return;
            }
            this._lastTouchY = currentY;
          }
          this.markUserInteraction();
        };
        this.onScrollHandlerOptions = { passive: true, capture: true };
        window.addEventListener("scroll", onScroll, this.onScrollHandlerOptions);
        this.onScrollHandler = onScroll;
        this._userInputHandler = markIntent;
        window.addEventListener("wheel", markIntent, { passive: true, capture: true });
        window.addEventListener("touchstart", markIntent, { passive: true, capture: true });
        window.addEventListener("touchmove", markIntent, { passive: true, capture: true });
        window.addEventListener("pointerdown", markIntent, { passive: true, capture: true });
        window.addEventListener("mousedown", markIntent, { passive: true, capture: true });
        window.addEventListener("keydown", markIntent, { capture: true });
        this.refreshContainerListener();
      }
      stopScrollListener() {
        if (this.onScrollHandler) {
          window.removeEventListener("scroll", this.onScrollHandler, this.onScrollHandlerOptions || { capture: true });
          if (this.listeningContainer) {
            this.listeningContainer.removeEventListener("scroll", this.onScrollHandler);
            this.listeningContainer = null;
          }
          this.onScrollHandler = null;
          this.onScrollHandlerOptions = null;
        }
        if (this._userInputHandler) {
          window.removeEventListener("wheel", this._userInputHandler, { capture: true });
          window.removeEventListener("touchstart", this._userInputHandler, { capture: true });
          window.removeEventListener("touchmove", this._userInputHandler, { capture: true });
          window.removeEventListener("pointerdown", this._userInputHandler, { capture: true });
          window.removeEventListener("mousedown", this._userInputHandler, { capture: true });
          window.removeEventListener("keydown", this._userInputHandler, { capture: true });
          this._userInputHandler = null;
        }
        this._lastTouchY = null;
      }
      startObserver() {
        const handleMutations = (mutations) => {
          if (!this.enabled) return;
          const responseContainer2 = this.getResponseContainer();
          if (!responseContainer2) return;
          let hasRelevantChange = false;
          for (let i = 0; i < Math.min(mutations.length, 10); i++) {
            const mutation = mutations[i];
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
              for (let j = 0; j < Math.min(mutation.addedNodes.length, 5); j++) {
                const node = mutation.addedNodes[j];
                if (node.nodeType === 1) {
                  try {
                    if (responseContainer2.contains(node)) {
                      hasRelevantChange = true;
                      break;
                    }
                  } catch (e) {
                  }
                }
              }
              if (hasRelevantChange) break;
            }
          }
          if (hasRelevantChange) {
            if (this._debounceTimer) {
              clearTimeout(this._debounceTimer);
            }
            this._debounceTimer = setTimeout(() => {
              this._updateScrollPosition();
            }, 40);
          }
        };
        this.observer = new MutationObserver(handleMutations);
        const responseContainer = this.getResponseContainer();
        const observeTarget = responseContainer || document.body;
        this.observer.observe(observeTarget, {
          childList: true,
          subtree: true
        });
        this.cleanupInterval = setInterval(() => {
          if (!this.enabled) return;
          this.refreshContainerListener();
          this._checkAndFixScroll();
        }, 1500);
      }
      scheduleScrollCorrection(targetTop) {
        if (!this.enabled) return;
        if (this._correctionRaf) {
          cancelAnimationFrame(this._correctionRaf);
        }
        this._pendingScrollUpdate = true;
        this._correctionRaf = requestAnimationFrame(() => {
          this._pendingScrollUpdate = false;
          this._correctionRaf = null;
          this.applyScrollCorrection(targetTop);
        });
      }
      applyScrollCorrection(targetTop) {
        const container = this.getScrollContainer();
        if (!container || !this.enabled) return;
        if (this._isUpdatingScroll) return;
        try {
          this._isUpdatingScroll = true;
          if (typeof container.scrollTo === "function") {
            container.scrollTo({ top: targetTop, behavior: "instant" });
          } else {
            container.scrollTop = targetTop;
          }
          this._lastProgrammaticFixAt = Date.now();
          this.lastScrollTop = targetTop;
          this.lockedScrollTop = targetTop;
        } catch (e) {
          console.warn("[ChatGPT Helper] 修正滚动位置失败:", e);
        } finally {
          setTimeout(() => {
            this._isUpdatingScroll = false;
          }, 0);
        }
      }
      _updateScrollPosition() {
        if (this._isUpdatingScroll) return;
        const container = this.getScrollContainer();
        if (!container) return;
        const currentScroll = container.scrollTop;
        if (!this.isProtectingPosition()) {
          this.lastScrollTop = currentScroll;
          this.lockedScrollTop = currentScroll;
          return;
        }
        if (currentScroll > this.lockedScrollTop + this._scrollJumpThreshold) {
          this.scheduleScrollCorrection(this.lockedScrollTop);
          return;
        }
        this.lastScrollTop = currentScroll;
      }
      _checkAndFixScroll() {
        if (this._isUpdatingScroll) return;
        const container = this.getScrollContainer();
        if (!container) return;
        const current = container.scrollTop;
        if (!this.isProtectingPosition()) {
          this.lastScrollTop = current;
          this.lockedScrollTop = current;
          return;
        }
        if (current > this.lockedScrollTop + this._scrollJumpThreshold) {
          this.scheduleScrollCorrection(this.lockedScrollTop);
          return;
        }
        this.lastScrollTop = current;
      }
      stopObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        if (this.cleanupInterval) {
          clearInterval(this.cleanupInterval);
          this.cleanupInterval = null;
        }
        if (this._rafId) {
          cancelAnimationFrame(this._rafId);
          this._rafId = null;
        }
        if (this._debounceTimer) {
          clearTimeout(this._debounceTimer);
          this._debounceTimer = null;
        }
        if (this._throttleTimer) {
          clearTimeout(this._throttleTimer);
          this._throttleTimer = null;
        }
        if (this._correctionRaf) {
          cancelAnimationFrame(this._correctionRaf);
          this._correctionRaf = null;
        }
        this._isUpdatingScroll = false;
        this._pendingScrollUpdate = false;
      }
      startAutoScroll() {
        if (this.autoScrollObserver) {
          this.stopAutoScroll();
        }
        if (this.enabled) {
          return;
        }
        let autoScrollDebounceTimer = null;
        let lastAutoScrollTime = 0;
        const AUTO_SCROLL_THROTTLE = 200;
        this.autoScrollObserver = new MutationObserver((mutations) => {
          if (this.enabled) return;
          const now = Date.now();
          if (now - lastAutoScrollTime < AUTO_SCROLL_THROTTLE) {
            return;
          }
          const responseContainer2 = this.getResponseContainer();
          if (!responseContainer2) return;
          let hasNewContent = false;
          for (let i = 0; i < Math.min(mutations.length, 10); i++) {
            const mutation = mutations[i];
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
              for (let j = 0; j < Math.min(mutation.addedNodes.length, 5); j++) {
                const node = mutation.addedNodes[j];
                if (node.nodeType === 1) {
                  try {
                    if (responseContainer2.contains(node)) {
                      hasNewContent = true;
                      break;
                    }
                  } catch (e) {
                  }
                }
              }
              if (hasNewContent) break;
            }
          }
          if (hasNewContent) {
            if (autoScrollDebounceTimer) {
              clearTimeout(autoScrollDebounceTimer);
            }
            autoScrollDebounceTimer = setTimeout(() => {
              const isGenerating = this.siteAdapter?.isGenerating?.();
              if (isGenerating) {
                const container = this.getScrollContainer();
                if (!container) return;
                const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= 100;
                if (isNearBottom) {
                  const targetTop = Math.max(0, container.scrollHeight - container.clientHeight);
                  try {
                    container.scrollTo({
                      top: targetTop,
                      behavior: "smooth"
                    });
                  } catch (e) {
                    if (container.scrollTop !== void 0) {
                      container.scrollTop = targetTop;
                    }
                  }
                  lastAutoScrollTime = Date.now();
                }
              }
            }, 100);
          }
        });
        const responseContainer = this.getResponseContainer();
        const observeTarget = responseContainer || document.body;
        this.autoScrollObserver.observe(observeTarget, {
          childList: true,
          subtree: responseContainer ? true : false
        });
      }
      stopAutoScroll() {
        if (this.autoScrollObserver) {
          this.autoScrollObserver.disconnect();
          this.autoScrollObserver = null;
        }
      }
    }
    class WidthStyleManager {
      constructor(siteAdapter, widthConfig) {
        this.siteAdapter = siteAdapter;
        this.widthConfig = widthConfig;
        this.styleElement = null;
      }
      apply() {
        if (this.styleElement) {
          this.styleElement.remove();
          this.styleElement = null;
        }
        if (this.widthConfig && this.widthConfig.enabled) {
          const css = this.generateCSS();
          this.styleElement = document.createElement("style");
          this.styleElement.id = "chatgpt-helper-width-styles";
          this.styleElement.textContent = css;
          document.head.appendChild(this.styleElement);
        }
      }
      generateCSS() {
        const globalWidth = `${this.widthConfig.value}${this.widthConfig.unit}`;
        const selectors = [
          "main",
          '[role="main"]',
          'div[class*="flex"][class*="flex-col"]'
        ];
        return selectors.map((selector) => {
          return `${selector} { max-width: ${globalWidth} !important; margin-left: auto !important; margin-right: auto !important; }`;
        }).join("\n");
      }
      updateConfig(widthConfig) {
        this.widthConfig = widthConfig;
        this.apply();
      }
    }
    Object.assign(H, {
      ScrollManager,
      HistoryLoader,
      AnchorManager,
      ReadingProgressManager,
      ScrollLockManager,
      WidthStyleManager
    });
  })();
  (function() {
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
      CopyManager,
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    class OutlineManager {
      constructor(config) {
        this.config = config;
        this.container = config.container;
        this.settings = config.settings;
        this.siteAdapter = config.siteAdapter;
        this.onSettingsChange = config.onSettingsChange;
        this.onJumpBefore = config.onJumpBefore;
        this.t = config.i18n || ((k) => k);
        this.state = {
          tree: null,
          treeKey: "",
          minLevel: 1,
          expandLevel: this.settings.outline?.maxLevel ?? 6,
          includeUserQueries: this.settings.outline?.showUserQueries ?? false,
          levelCounts: {},
          isAllExpanded: false,
          rawOutline: [],
          // 搜索相关状态
          searchQuery: "",
          searchLevelManual: false,
          // 标记用户是否在搜索时手动调整了层级
          searchResults: null,
          // 存储搜索匹配信息 { matchedIds: Set, relevantIds: Set }
          preSearchState: null
          // 搜索前的状态快照
        };
        this.observer = null;
        this.updateDebounceTimer = null;
        this.isActive = false;
        this.syncScrollHandler = null;
        this.syncScrollThrottleTimer = null;
        this.currentHighlightedItem = null;
        this.init();
      }
      init() {
        this.createUI();
        this.updateAutoUpdateState();
      }
      setActive(active) {
        this.isActive = active;
        this.updateAutoUpdateState();
        this.updateSyncScrollState();
      }
      updateAutoUpdateState() {
        const shouldEnable = this.settings.outline?.enabled && this.settings.outline?.autoUpdate && this.isActive;
        if (shouldEnable) {
          this.startObserver();
        } else {
          this.stopObserver();
        }
      }
      updateSyncScrollState() {
        const shouldEnable = this.settings.outline?.enabled && this.settings.outline?.syncScroll && this.isActive;
        if (shouldEnable) {
          this.startSyncScroll();
        } else {
          this.stopSyncScroll();
        }
      }
      startSyncScroll(retryCount = 0) {
        if (this.syncScrollHandler) return;
        if (!this.siteAdapter) return;
        const scrollContainer = this.siteAdapter.getScrollContainer ? this.siteAdapter.getScrollContainer() : this.scrollManager ? this.scrollManager.container : null;
        if (!scrollContainer) {
          if (retryCount < 10) {
            setTimeout(() => {
              if (this.settings.outline?.syncScroll && this.isActive && !this.syncScrollHandler) {
                this.startSyncScroll(retryCount + 1);
              }
            }, 300);
          }
          return;
        }
        this.syncScrollHandler = () => {
          if (this.state.searchQuery) return;
          if (this.syncScrollThrottleTimer) return;
          this.syncScrollThrottleTimer = setTimeout(() => {
            this.syncScrollThrottleTimer = null;
            this.handleSyncScroll();
          }, 200);
        };
        scrollContainer.addEventListener("scroll", this.syncScrollHandler, { passive: true });
      }
      stopSyncScroll() {
        if (!this.syncScrollHandler) return;
        const scrollContainer = this.siteAdapter?.getScrollContainer ? this.siteAdapter.getScrollContainer() : this.scrollManager ? this.scrollManager.container : null;
        if (scrollContainer) {
          scrollContainer.removeEventListener("scroll", this.syncScrollHandler);
        }
        this.syncScrollHandler = null;
        if (this.syncScrollThrottleTimer) {
          clearTimeout(this.syncScrollThrottleTimer);
          this.syncScrollThrottleTimer = null;
        }
        if (this.currentHighlightedItem) {
          this.currentHighlightedItem.classList.remove("sync-highlight");
          this.currentHighlightedItem = null;
        }
      }
      handleSyncScroll() {
        if (!this.state.tree || this.state.tree.length === 0) return;
        if (!this.siteAdapter) return;
        const scrollContainer = this.siteAdapter.getScrollContainer ? this.siteAdapter.getScrollContainer() : this.scrollManager ? this.scrollManager.container : null;
        if (!scrollContainer) return;
        const flattenTree = (items) => {
          const result = [];
          items.forEach((item) => {
            result.push(item);
            if (item.children && item.children.length > 0) {
              result.push(...flattenTree(item.children));
            }
          });
          return result;
        };
        const allItems = flattenTree(this.state.tree);
        const containerRect = scrollContainer.getBoundingClientRect();
        const viewportTop = containerRect.top;
        let currentItem = null;
        for (const item of allItems) {
          if (!item.element || !item.element.isConnected) continue;
          const rect = item.element.getBoundingClientRect();
          if (rect.top >= viewportTop && rect.top < containerRect.bottom) {
            currentItem = item;
            break;
          }
          if (rect.top < viewportTop && rect.bottom > viewportTop) {
            currentItem = item;
            break;
          }
        }
        if (!currentItem) return;
        if (this.currentHighlightedItem) {
          this.currentHighlightedItem.classList.remove("sync-highlight");
        }
        const outlineList = document.getElementById("outline-list");
        if (!outlineList) return;
        let outlineItem = outlineList.querySelector(`.outline-item[data-index="${currentItem.index}"]`);
        if (!outlineItem) return;
        if (outlineItem.classList.contains("outline-hidden")) {
          let parent = outlineItem.previousElementSibling;
          while (parent) {
            if (parent.classList.contains("outline-item") && !parent.classList.contains("outline-hidden")) {
              const parentLevel = parseInt(parent.dataset.level, 10);
              const currentLevel = parseInt(outlineItem.dataset.level, 10);
              if (parentLevel < currentLevel) {
                outlineItem = parent;
                break;
              }
            }
            parent = parent.previousElementSibling;
          }
          if (outlineItem.classList.contains("outline-hidden")) return;
        }
        outlineItem.classList.add("sync-highlight");
        this.currentHighlightedItem = outlineItem;
        const wrapper = document.getElementById("outline-list-wrapper");
        if (wrapper) {
          const wrapperRect = wrapper.getBoundingClientRect();
          const itemRect = outlineItem.getBoundingClientRect();
          if (itemRect.top < wrapperRect.top || itemRect.bottom > wrapperRect.bottom) {
            const scrollOffset = itemRect.top - wrapperRect.top - wrapperRect.height / 2 + itemRect.height / 2;
            wrapper.scrollBy({ top: scrollOffset, behavior: "smooth" });
          }
        }
      }
      startObserver() {
        if (this.observer) return;
        this.observer = new MutationObserver(() => {
          this.triggerAutoUpdate();
        });
        this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
      stopObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        if (this.updateDebounceTimer) {
          clearTimeout(this.updateDebounceTimer);
          this.updateDebounceTimer = null;
        }
      }
      triggerAutoUpdate() {
        const interval = (this.settings.outline?.updateInterval || 5) * 1e3;
        if (!this.updateDebounceTimer) {
          this.updateDebounceTimer = setTimeout(() => {
            this.executeAutoUpdate();
          }, interval);
        }
      }
      executeAutoUpdate() {
        if (this.updateDebounceTimer) {
          clearTimeout(this.updateDebounceTimer);
          this.updateDebounceTimer = null;
        }
        if (this.config && this.config.onAutoUpdate) {
          this.config.onAutoUpdate();
        }
        try {
          window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh"));
        } catch (e) {
        }
        try {
          window.dispatchEvent(new CustomEvent("gemini-helper-outline-auto-refresh"));
        } catch (e) {
        }
      }
      createUI() {
        clearElement(this.container);
        const content = createElement("div", { className: "outline-content" });
        const toolbar = createElement("div", { className: "outline-fixed-toolbar" });
        const row1 = createElement("div", { className: "outline-toolbar-row" });
        const createExpandIcon = () => {
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("viewBox", "0 0 16 16");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");
          svg.style.width = "14px";
          svg.style.height = "14px";
          const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle2.setAttribute("cx", "8");
          circle2.setAttribute("cy", "8");
          circle2.setAttribute("r", "6.5");
          svg.appendChild(circle2);
          const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
          h.setAttribute("x1", "4");
          h.setAttribute("y1", "8");
          h.setAttribute("x2", "12");
          h.setAttribute("y2", "8");
          svg.appendChild(h);
          const v = document.createElementNS("http://www.w3.org/2000/svg", "line");
          v.setAttribute("x1", "8");
          v.setAttribute("y1", "4");
          v.setAttribute("x2", "8");
          v.setAttribute("y2", "12");
          svg.appendChild(v);
          return svg;
        };
        const createCollapseIcon = () => {
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("viewBox", "0 0 16 16");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");
          svg.style.width = "14px";
          svg.style.height = "14px";
          const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle2.setAttribute("cx", "8");
          circle2.setAttribute("cy", "8");
          circle2.setAttribute("r", "6.5");
          svg.appendChild(circle2);
          const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
          h.setAttribute("x1", "4");
          h.setAttribute("y1", "8");
          h.setAttribute("x2", "12");
          h.setAttribute("y2", "8");
          svg.appendChild(h);
          return svg;
        };
        this._createExpandIcon = createExpandIcon;
        this._createCollapseIcon = createCollapseIcon;
        const showUserQueries = this.settings.outline?.showUserQueries ?? false;
        const groupBtnTitle = showUserQueries ? this.t("outlineHideUserQueriesTooltip") || "隐藏用户提问" : this.t("outlineShowUserQueriesTooltip") || "显示用户提问";
        const groupBtn = createElement("button", {
          className: "outline-toolbar-btn" + (showUserQueries ? " active" : ""),
          id: "outline-group-btn",
          title: groupBtnTitle
        }, "🙋");
        groupBtn.addEventListener("click", () => this.toggleGroupMode());
        row1.appendChild(groupBtn);
        const expandBtn = createElement("button", {
          className: "outline-toolbar-btn",
          id: "outline-expand-btn",
          title: this.t("outlineExpandAll") || "展开全部"
        });
        expandBtn.appendChild(createExpandIcon());
        expandBtn.addEventListener("click", () => this.toggleExpandAll());
        row1.appendChild(expandBtn);
        const locateBtn = createElement("button", {
          className: "outline-toolbar-btn",
          id: "outline-locate-btn",
          title: this.t("outlineLocateCurrent") || "定位当前位置"
        });
        const locateSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        locateSvg.setAttribute("viewBox", "0 0 18 18");
        locateSvg.setAttribute("fill", "none");
        locateSvg.setAttribute("stroke", "currentColor");
        locateSvg.setAttribute("stroke-width", "2");
        locateSvg.setAttribute("stroke-linecap", "round");
        locateSvg.setAttribute("stroke-linejoin", "round");
        locateSvg.style.width = "18px";
        locateSvg.style.height = "18px";
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "9");
        circle.setAttribute("cy", "9");
        circle.setAttribute("r", "4.5");
        locateSvg.appendChild(circle);
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "9");
        line1.setAttribute("y1", "1");
        line1.setAttribute("x2", "9");
        line1.setAttribute("y2", "3.5");
        locateSvg.appendChild(line1);
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "9");
        line2.setAttribute("y1", "14.5");
        line2.setAttribute("x2", "9");
        line2.setAttribute("y2", "17");
        locateSvg.appendChild(line2);
        const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line3.setAttribute("x1", "1");
        line3.setAttribute("y1", "9");
        line3.setAttribute("x2", "3.5");
        line3.setAttribute("y2", "9");
        locateSvg.appendChild(line3);
        const line4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line4.setAttribute("x1", "14.5");
        line4.setAttribute("y1", "9");
        line4.setAttribute("x2", "17");
        line4.setAttribute("y2", "9");
        locateSvg.appendChild(line4);
        locateBtn.appendChild(locateSvg);
        locateBtn.addEventListener("click", () => this.locateCurrentPosition());
        row1.appendChild(locateBtn);
        const scrollBtn = createElement("button", {
          className: "outline-toolbar-btn",
          id: "outline-scroll-btn",
          title: this.t("outlineScrollBottom") || "滚动到底部"
        });
        scrollBtn.appendChild(createSvgIconNode("arrowDown", { size: 14 }));
        scrollBtn.addEventListener("click", () => this.scrollList());
        row1.appendChild(scrollBtn);
        const searchWrapper = createElement("div", { className: "outline-search-wrapper" });
        const searchInput = createElement("input", {
          type: "text",
          className: "outline-search-input",
          placeholder: this.t("outlineSearch") || "搜索大纲...",
          value: this.state.searchQuery
        });
        const clearBtn = createElement("button", {
          className: "outline-search-clear hidden",
          title: this.t("clear") || "清除"
        }, "×");
        let debounceTimer;
        searchInput.addEventListener("input", (e) => {
          const val = e.target.value;
          clearBtn.classList.toggle("hidden", !val);
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.handleSearch(val.trim());
          }, 300);
        });
        searchInput.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            searchInput.value = "";
            clearBtn.classList.add("hidden");
            this.handleSearch("");
            searchInput.blur();
          }
        });
        clearBtn.addEventListener("click", () => {
          searchInput.value = "";
          clearBtn.classList.add("hidden");
          this.handleSearch("");
          searchInput.focus();
        });
        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(clearBtn);
        row1.appendChild(searchWrapper);
        toolbar.appendChild(row1);
        const row2 = createElement("div", { className: "outline-toolbar-row" });
        const sliderContainer = createElement("div", { className: "outline-level-slider-container" });
        const dotsContainer = createElement("div", { className: "outline-level-dots", id: "outline-level-dots" });
        const levelLine = createElement("div", { className: "outline-level-line" });
        const levelProgress = createElement("div", {
          className: "outline-level-progress",
          id: "outline-level-progress"
        });
        levelLine.appendChild(levelProgress);
        dotsContainer.appendChild(levelLine);
        for (let i = 0; i <= 6; i++) {
          const dot = createElement("div", {
            className: `outline-level-dot ${i <= this.state.expandLevel ? "active" : ""}`,
            "data-level": i
          });
          const tooltip = createElement("div", { className: "outline-level-dot-tooltip" });
          tooltip.textContent = i === 0 ? "⊖" : `H${i}`;
          dot.appendChild(tooltip);
          dot.addEventListener("click", () => this.setLevel(i));
          dotsContainer.appendChild(dot);
        }
        sliderContainer.appendChild(dotsContainer);
        row2.appendChild(sliderContainer);
        toolbar.appendChild(row2);
        content.appendChild(toolbar);
        const resultBar = createElement("div", {
          className: "outline-result-bar hidden",
          id: "outline-result-bar"
        });
        content.appendChild(resultBar);
        const listWrapper = createElement("div", {
          className: "outline-list-wrapper",
          id: "outline-list-wrapper"
        });
        const list = createElement("div", {
          className: "outline-list",
          id: "outline-list"
        });
        listWrapper.appendChild(list);
        content.appendChild(listWrapper);
        this.container.appendChild(content);
      }
      update(outlineData) {
        const listContainer = document.getElementById("outline-list");
        if (!listContainer) return;
        clearElement(listContainer);
        if (!outlineData || outlineData.length === 0) {
          listContainer.appendChild(createElement("div", {
            className: "outline-empty"
          }, this.t("outlineEmpty") || "暂无大纲"));
          return;
        }
        this.state.rawOutline = outlineData;
        this.state.levelCounts = {};
        outlineData.forEach((item) => {
          this.state.levelCounts[item.level] = (this.state.levelCounts[item.level] || 0) + 1;
        });
        this.updateTooltips();
        const headingLevels = outlineData.filter((item) => !item.isUserQuery).map((item) => item.level);
        const minLevel = headingLevels.length > 0 ? Math.min(...headingLevels) : 1;
        this.state.minLevel = minLevel;
        const currentStateMap = {};
        if (this.state.tree) {
          this.captureTreeState(this.state.tree, currentStateMap);
        }
        const outlineKey = outlineData.map((i) => i.text).join("|");
        const isTreeChanged = this.state.treeKey !== outlineKey || !this.state.tree;
        if (isTreeChanged) {
          this.state.tree = this.buildTree(outlineData, minLevel);
          this.state.treeKey = outlineKey;
        }
        const tree = this.state.tree;
        const displayLevel = this.state.expandLevel ?? 6;
        const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
        let effectiveDisplayLevel = displayLevel < minDisplayLevel ? minDisplayLevel : displayLevel;
        if (isTreeChanged) {
          this.initializeCollapsedState(tree, effectiveDisplayLevel);
          if (Object.keys(currentStateMap).length > 0) {
            this.restoreTreeState(tree, currentStateMap);
          }
        }
        if (this.state.searchQuery) {
          this.performSearch(this.state.searchQuery, false);
        }
        this.refreshCurrent();
      }
      buildTree(outline, minLevel) {
        const tree = [];
        const stack = [];
        outline.forEach((item, index) => {
          const relativeLevel = item.isUserQuery ? 0 : item.level - minLevel + 1;
          const node = {
            ...item,
            relativeLevel,
            index,
            children: [],
            collapsed: false,
            forceExpanded: false
            // 初始化 forceExpanded
          };
          while (stack.length > 0 && stack[stack.length - 1].relativeLevel >= relativeLevel) {
            stack.pop();
          }
          if (stack.length === 0) {
            tree.push(node);
          } else {
            stack[stack.length - 1].children.push(node);
          }
          stack.push(node);
        });
        return tree;
      }
      // 初始化树的折叠状态
      initializeCollapsedState(items, displayLevel) {
        items.forEach((item) => {
          if (item.forceExpanded === void 0) {
            item.forceExpanded = false;
          }
          if (item.children && item.children.length > 0) {
            const allChildrenHidden = item.children.every((child) => child.relativeLevel > displayLevel);
            item.collapsed = allChildrenHidden;
            this.initializeCollapsedState(item.children, displayLevel);
          } else {
            item.collapsed = false;
          }
        });
      }
      // 捕获树的状态（expanded/collapsed）
      captureTreeState(nodes, stateMap) {
        nodes.forEach((node) => {
          const key = `${node.level}_${node.text}`;
          const hasChildren = node.children && node.children.length > 0;
          stateMap[key] = {
            collapsed: node.collapsed,
            forceExpanded: node.forceExpanded,
            hadChildren: hasChildren
          };
          if (hasChildren) {
            this.captureTreeState(node.children, stateMap);
          }
        });
      }
      // 恢复树的状态
      restoreTreeState(nodes, stateMap) {
        nodes.forEach((node) => {
          const key = `${node.level}_${node.text}`;
          const state = stateMap[key];
          if (state) {
            const hasChildrenNow = node.children && node.children.length > 0;
            const hadChildrenBefore = state.hadChildren;
            if (hadChildrenBefore || !hasChildrenNow) {
              node.collapsed = state.collapsed;
            }
            if (state.forceExpanded !== void 0) {
              node.forceExpanded = state.forceExpanded;
            }
          }
          if (node.children && node.children.length > 0) {
            this.restoreTreeState(node.children, stateMap);
          }
        });
      }
      // 清除强制展开状态
      clearForceExpandedState(items, displayLevel) {
        items.forEach((item) => {
          item.forceExpanded = false;
          if (item.children && item.children.length > 0) {
            const allChildrenHidden = item.children.every((child) => child.level > displayLevel);
            item.collapsed = allChildrenHidden;
            this.clearForceExpandedState(item.children, displayLevel);
          } else {
            item.collapsed = false;
          }
        });
      }
      // 获取用户问题节点在所有用户问题中的序号（从1开始）
      getUserQueryIndex(targetIndex) {
        if (!this.state.tree) return 0;
        let count = 0;
        const countInTree = (items) => {
          for (const item of items) {
            if (item.isUserQuery) {
              count++;
              if (item.index === targetIndex) return count;
            }
            if (item.children && item.children.length > 0) {
              const result = countInTree(item.children);
              if (result > 0) return result;
            }
          }
          return 0;
        };
        return countInTree(this.state.tree);
      }
      // 内部刷新（用于交互更新）
      refreshCurrent() {
        const listContainer = document.getElementById("outline-list");
        if (this.state.tree && listContainer) {
          clearElement(listContainer);
          let displayLevel;
          if (this.state.searchQuery && !this.state.searchLevelManual) {
            displayLevel = 100;
          } else {
            displayLevel = this.state.expandLevel ?? 6;
          }
          const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
          if (displayLevel < minDisplayLevel) {
            displayLevel = minDisplayLevel;
          }
          this.renderItems(listContainer, this.state.tree, this.state.minLevel, displayLevel);
        }
      }
      // 渲染大纲项
      renderItems(container, items, minLevel, displayLevel, parentCollapsed = false, parentForceExpanded = false) {
        const minRelativeLevel = this.state.includeUserQueries ? 0 : 1;
        items.forEach((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isRootNode = item.relativeLevel === minRelativeLevel;
          let shouldShow;
          const isLevelAllowed = item.relativeLevel <= displayLevel || parentForceExpanded;
          if (isRootNode) {
            if (this.state.searchQuery) {
              shouldShow = item.isMatch || item.hasMatchedDescendant;
            } else {
              shouldShow = true;
            }
          } else {
            const isRelevant = !this.state.searchQuery || item.isMatch || item.hasMatchedDescendant || parentForceExpanded;
            if (this.state.searchQuery && !this.state.searchLevelManual) {
              shouldShow = isRelevant && !parentCollapsed;
            } else if (this.state.searchQuery && this.state.searchLevelManual) {
              shouldShow = isRelevant && isLevelAllowed && !parentCollapsed;
            } else {
              shouldShow = isLevelAllowed && !parentCollapsed;
            }
          }
          if (parentCollapsed) shouldShow = false;
          let cssLevel = item.relativeLevel;
          let itemClassName = `outline-item outline-level-${cssLevel}`;
          if (item.isUserQuery) {
            itemClassName += " user-query-node";
          }
          const itemEl = createElement("div", {
            className: itemClassName,
            "data-index": item.index,
            "data-level": item.relativeLevel
          });
          const isExpanded = hasChildren && !item.collapsed;
          const toggle = createElement(
            "span",
            {
              className: `outline-item-toggle ${hasChildren ? isExpanded ? "expanded" : "" : "invisible"}`
            },
            "▸"
          );
          if (hasChildren) {
            toggle.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              item.collapsed = !item.collapsed;
              if (!item.collapsed) {
                item.forceExpanded = true;
              }
              toggle.classList.toggle("expanded", !item.collapsed);
              this.refreshCurrent();
            });
          }
          itemEl.appendChild(toggle);
          if (item.isUserQuery) {
            const queryNumber = this.getUserQueryIndex(item.index);
            const badge = createElement("span", { className: "user-query-badge" });
            const icon = createElement("span", { className: "user-query-badge-icon" });
            icon.appendChild(createSvgIconNode("message", { size: 12 }));
            const number = createElement("span", { className: "user-query-badge-number" }, `${queryNumber}`);
            badge.appendChild(icon);
            badge.appendChild(number);
            itemEl.appendChild(badge);
          }
          const textEl = createElement("span", { className: "outline-item-text" });
          if (this.state.searchQuery && item.isMatch) {
            try {
              const query = this.state.searchQuery;
              const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              const regex = new RegExp(`(${escapedQuery})`, "gi");
              const parts = item.text.split(regex);
              clearElement(textEl);
              parts.forEach((part) => {
                if (part.toLowerCase() === query.toLowerCase()) {
                  const mark = document.createElement("mark");
                  mark.textContent = part;
                  mark.style.backgroundColor = "rgba(255, 235, 59, 0.5)";
                  mark.style.color = "inherit";
                  mark.style.padding = "0";
                  mark.style.borderRadius = "2px";
                  textEl.appendChild(mark);
                } else {
                  textEl.appendChild(document.createTextNode(part));
                }
              });
            } catch (e) {
              textEl.textContent = item.text;
              textEl.title = item.text;
            }
          } else {
            textEl.textContent = item.text;
            textEl.title = item.text;
          }
          itemEl.appendChild(textEl);
          if (item.isUserQuery) {
            const copyBtn = createElement("span", { className: "outline-item-copy-btn" });
            copyBtn.title = "Copy";
            const createCopyIcon = () => {
              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute("viewBox", "0 0 24 24");
              svg.setAttribute("fill", "none");
              svg.setAttribute("stroke", "currentColor");
              svg.setAttribute("stroke-width", "2");
              svg.setAttribute("stroke-linecap", "round");
              svg.setAttribute("stroke-linejoin", "round");
              svg.style.width = "14px";
              svg.style.height = "14px";
              const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              rect.setAttribute("x", "9");
              rect.setAttribute("y", "9");
              rect.setAttribute("width", "13");
              rect.setAttribute("height", "13");
              rect.setAttribute("rx", "2");
              rect.setAttribute("ry", "2");
              const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute("d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1");
              svg.appendChild(rect);
              svg.appendChild(path);
              return svg;
            };
            const createCheckIcon = () => {
              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute("viewBox", "0 0 24 24");
              svg.setAttribute("fill", "none");
              svg.setAttribute("stroke", "#10b981");
              svg.setAttribute("stroke-width", "2");
              svg.setAttribute("stroke-linecap", "round");
              svg.setAttribute("stroke-linejoin", "round");
              svg.style.width = "14px";
              svg.style.height = "14px";
              const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
              polyline.setAttribute("points", "20 6 9 17 4 12");
              svg.appendChild(polyline);
              return svg;
            };
            copyBtn.appendChild(createCopyIcon());
            copyBtn.addEventListener("click", async (e) => {
              e.stopPropagation();
              try {
                let textToCopy = item.text;
                if (item.isTruncated && item.element && item.element.isConnected) {
                  textToCopy = this.siteAdapter && this.siteAdapter.extractUserQueryText ? this.siteAdapter.extractUserQueryText(item.element) : item.text;
                  if (!textToCopy) textToCopy = item.text;
                }
                await navigator.clipboard.writeText(textToCopy);
                copyBtn.replaceChildren(createCheckIcon());
                setTimeout(() => {
                  copyBtn.replaceChildren(createCopyIcon());
                }, 1500);
              } catch (err) {
                console.error("Failed to copy: ", err);
              }
            });
            itemEl.appendChild(copyBtn);
          }
          itemEl.addEventListener("click", (e) => {
            if (e.target.closest(".outline-item-toggle, .outline-item-copy-btn")) {
              return;
            }
            let targetElement = item.element;
            if (!targetElement || !targetElement.isConnected) {
              const headings = document.querySelectorAll(`h${item.level}`);
              for (const h of headings) {
                if ((h.textContent || "").trim() === item.text) {
                  targetElement = h;
                  break;
                }
              }
            }
            if (targetElement && targetElement.isConnected) {
              if (this.onJumpBefore) {
                this.onJumpBefore();
              }
              const scrollContainer = this.siteAdapter?.getScrollContainer?.();
              if (scrollContainer && scrollContainer !== document.documentElement && scrollContainer !== document.body) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const targetTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;
                const offset = 60;
                const scrollTop = targetTop - offset;
                scrollContainer.__ghBypassLock = true;
                scrollContainer.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" });
                setTimeout(() => {
                  delete scrollContainer.__ghBypassLock;
                }, 500);
              } else {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start", __bypassLock: true });
                setTimeout(() => {
                  const rect = targetElement.getBoundingClientRect();
                  const offset = 40;
                  if (rect.top !== offset) {
                    window.scrollBy({ top: rect.top - offset, behavior: "smooth" });
                  }
                }, 100);
              }
              targetElement.classList.add("outline-highlight");
              setTimeout(() => targetElement.classList.remove("outline-highlight"), 2e3);
            } else {
              console.warn("ChatGPT Helper: Outline item element lost and not found:", item.text);
            }
          });
          if (!shouldShow) {
            itemEl.classList.add("outline-hidden");
          }
          container.appendChild(itemEl);
          if (hasChildren) {
            const childParentCollapsed = item.collapsed || parentCollapsed;
            this.renderItems(container, item.children, minLevel, displayLevel, childParentCollapsed, item.forceExpanded || parentForceExpanded);
          }
        });
      }
      handleSearch(query) {
        if (!query) {
          this.state.searchQuery = "";
          this.state.searchResults = null;
          this.state.searchLevelManual = false;
          const resultBar = document.getElementById("outline-result-bar");
          if (resultBar) resultBar.classList.add("hidden");
          if (this.state.tree) {
            const displayLevel = this.state.expandLevel ?? 6;
            this.clearForceExpandedState(this.state.tree, displayLevel);
            if (this.state.preSearchState) {
              this.restoreTreeState(this.state.tree, this.state.preSearchState);
              this.state.preSearchState = null;
            }
          }
          this.refreshCurrent();
          return;
        }
        if (!this.state.searchQuery && this.state.tree) {
          this.state.preSearchState = {};
          this.captureTreeState(this.state.tree, this.state.preSearchState);
          this.clearForceExpandedState(this.state.tree, 0);
        }
        this.state.searchQuery = query;
        this.state.searchLevelManual = false;
        this.performSearch(query);
        this.refreshCurrent();
      }
      // 执行搜索计算
      performSearch(query, updateUI = true) {
        if (!this.state.tree) return;
        const normalize = (str) => str.toLowerCase();
        const normalizedQuery = normalize(query);
        let matchCount = 0;
        const traverse = (nodes) => {
          let hasAnyMatch = false;
          nodes.forEach((node) => {
            const isMatch = normalize(node.text).includes(normalizedQuery);
            if (isMatch) matchCount++;
            node.isMatch = isMatch;
            if (node.children && node.children.length > 0) {
              const childResult = traverse(node.children);
              node.hasMatchedDescendant = childResult;
            } else {
              node.hasMatchedDescendant = false;
            }
            if (node.hasMatchedDescendant) {
              node.collapsed = false;
            }
            if (isMatch || node.hasMatchedDescendant) {
              hasAnyMatch = true;
            }
          });
          return hasAnyMatch;
        };
        traverse(this.state.tree);
        if (updateUI) {
          const resultBar = document.getElementById("outline-result-bar");
          if (resultBar) {
            resultBar.textContent = `${matchCount} ${this.t("outlineSearchResult") || "个结果"}`;
            resultBar.classList.remove("hidden");
          }
        }
      }
      toggleGroupMode() {
        const btn = document.getElementById("outline-group-btn");
        if (!this.settings.outline) return;
        this.settings.outline.showUserQueries = !this.settings.outline.showUserQueries;
        this.state.includeUserQueries = this.settings.outline.showUserQueries;
        if (btn) {
          btn.classList.toggle("active", this.settings.outline.showUserQueries);
          if (this.settings.outline.showUserQueries) {
            btn.title = this.t("outlineHideUserQueriesTooltip") || "隐藏用户提问";
          } else {
            btn.title = this.t("outlineShowUserQueriesTooltip") || "显示用户提问";
          }
        }
        if (this.onSettingsChange) this.onSettingsChange();
        try {
          window.dispatchEvent(new CustomEvent("gemini-helper-outline-auto-refresh"));
        } catch (e) {
        }
        try {
          window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh"));
        } catch (e) {
        }
      }
      toggleExpandAll() {
        const btn = document.getElementById("outline-expand-btn");
        if (!btn) return;
        if (this.state.isAllExpanded) {
          const targetLevel = this.settings.outline?.showUserQueries ? 0 : this.state.minLevel || 1;
          this.setLevel(targetLevel);
        } else {
          const hasLevelCounts = this.state.levelCounts && Object.keys(this.state.levelCounts).length > 0;
          const maxActualLevel = hasLevelCounts ? Math.max(...Object.keys(this.state.levelCounts).map(Number), 1) : 6;
          this.setLevel(maxActualLevel);
        }
      }
      // 定位到当前页面位置对应的大纲项
      locateCurrentPosition() {
        if (!this.state.tree || this.state.tree.length === 0) return;
        if (!this.siteAdapter) return;
        if (this.state.searchQuery) {
          this.handleSearch("");
          const searchInput = document.querySelector(".outline-search-input");
          const clearBtn = document.querySelector(".outline-search-clear");
          if (searchInput) searchInput.value = "";
          if (clearBtn) clearBtn.classList.add("hidden");
        }
        const scrollContainer = this.siteAdapter.getScrollContainer();
        if (!scrollContainer) return;
        const flattenTree = (items) => {
          const result = [];
          items.forEach((item) => {
            result.push(item);
            if (item.children && item.children.length > 0) {
              result.push(...flattenTree(item.children));
            }
          });
          return result;
        };
        const allItems = flattenTree(this.state.tree);
        const containerRect = scrollContainer.getBoundingClientRect();
        const viewportTop = containerRect.top;
        const viewportBottom = containerRect.bottom;
        let currentItem = null;
        for (const item of allItems) {
          if (!item.element || !item.element.isConnected) continue;
          const rect = item.element.getBoundingClientRect();
          if (rect.top >= viewportTop && rect.top < viewportBottom) {
            currentItem = item;
            break;
          }
          if (rect.top < viewportTop && rect.bottom > viewportTop) {
            currentItem = item;
            break;
          }
        }
        if (!currentItem) {
          let minDistance = Infinity;
          for (const item of allItems) {
            if (!item.element || !item.element.isConnected) continue;
            const rect = item.element.getBoundingClientRect();
            const distance = Math.abs(rect.top - viewportTop);
            if (distance < minDistance) {
              minDistance = distance;
              currentItem = item;
            }
          }
        }
        if (!currentItem) return;
        const getPathByIndex = (items, targetIndex, path2 = []) => {
          for (const item of items) {
            const newPath = [...path2, item];
            if (item.index === targetIndex) return newPath;
            if (item.children && item.children.length > 0) {
              const childPath = getPathByIndex(item.children, targetIndex, newPath);
              if (childPath) return childPath;
            }
          }
          return null;
        };
        const path = getPathByIndex(this.state.tree, currentItem.index) || [currentItem];
        let displayLevel = this.state.expandLevel ?? 6;
        const minDisplayLevel = this.state.includeUserQueries ? 0 : 1;
        if (displayLevel < minDisplayLevel) displayLevel = minDisplayLevel;
        let bestNode = currentItem;
        for (let i = path.length - 1; i >= 0; i--) {
          const node = path[i];
          if (node.relativeLevel <= displayLevel && !node.isUserQuery) {
            bestNode = node;
            break;
          }
        }
        currentItem = bestNode;
        const expandParents = (items, targetIndex, parents = []) => {
          for (const item of items) {
            if (item.index === targetIndex) {
              parents.forEach((p) => {
                p.collapsed = false;
                p.forceExpanded = true;
              });
              return true;
            }
            if (item.children && item.children.length > 0) {
              if (expandParents(item.children, targetIndex, [...parents, item])) {
                return true;
              }
            }
          }
          return false;
        };
        expandParents(this.state.tree, currentItem.index);
        this.refreshCurrent();
        setTimeout(() => {
          const outlineList = document.getElementById("outline-list");
          if (!outlineList) return;
          let outlineItem = outlineList.querySelector(`.outline-item[data-index="${currentItem.index}"]`);
          if (!outlineItem || outlineItem.classList.contains("outline-hidden")) {
            const indicesToTry = path && path.length > 0 ? [...path].reverse().map((node) => node.index) : [currentItem.index];
            for (const idx of indicesToTry) {
              const candidate = outlineList.querySelector(`.outline-item[data-index="${idx}"]`);
              if (candidate && !candidate.classList.contains("outline-hidden")) {
                outlineItem = candidate;
                break;
              }
            }
          }
          if (!outlineItem) return;
          const wrapper = document.getElementById("outline-list-wrapper");
          if (wrapper) {
            const wrapperRect = wrapper.getBoundingClientRect();
            const itemRect = outlineItem.getBoundingClientRect();
            const scrollOffset = itemRect.top - wrapperRect.top - wrapperRect.height / 2 + itemRect.height / 2;
            wrapper.scrollBy({ top: scrollOffset, behavior: "smooth" });
          }
          outlineItem.classList.add("highlight");
          setTimeout(() => outlineItem.classList.remove("highlight"), 2e3);
        }, 50);
      }
      // 设置层级
      setLevel(level) {
        this.state.expandLevel = level;
        if (this.settings.outline) {
          this.settings.outline.maxLevel = level;
          if (this.onSettingsChange) this.onSettingsChange();
        }
        if (this.state.tree) {
          this.clearForceExpandedState(this.state.tree, level);
        }
        const dots = document.querySelectorAll(".outline-level-dot");
        dots.forEach((dot) => {
          const dotLevel = parseInt(dot.dataset.level, 10);
          dot.classList.toggle("active", dotLevel <= level);
        });
        const progress = document.getElementById("outline-level-progress");
        if (progress) {
          progress.style.width = `${level / 6 * 100}%`;
        }
        if (this.state.searchQuery) {
          this.state.searchLevelManual = true;
          this.refreshCurrent();
        } else {
          this.refreshCurrent();
        }
        const btn = document.getElementById("outline-expand-btn");
        const hasLevelCounts = this.state.levelCounts && Object.keys(this.state.levelCounts).length > 0;
        const maxActualLevel = hasLevelCounts ? Math.max(...Object.keys(this.state.levelCounts).map(Number), 1) : 6;
        if (btn) {
          if (level >= maxActualLevel) {
            btn.replaceChildren(this._createCollapseIcon ? this._createCollapseIcon() : document.createTextNode("⊖"));
            btn.title = this.t("outlineCollapseAll");
            this.state.isAllExpanded = true;
          } else {
            btn.replaceChildren(this._createExpandIcon ? this._createExpandIcon() : document.createTextNode("⊕"));
            btn.title = this.t("outlineExpandAll");
            this.state.isAllExpanded = false;
          }
        }
        this.refreshCurrent();
      }
      updateTooltips() {
        const dots = document.querySelectorAll(".outline-level-dot");
        const showUserQueries = this.settings.outline?.showUserQueries || false;
        dots.forEach((dot) => {
          const level = parseInt(dot.dataset.level, 10);
          const tooltip = dot.querySelector(".outline-level-dot-tooltip");
          if (!tooltip) return;
          if (level === 0) {
            tooltip.textContent = showUserQueries ? this.t("outlineOnlyUserQueries") || "只显示用户提问" : "⊖";
          } else {
            const count = this.state.levelCounts[level] || 0;
            tooltip.textContent = `H${level}: ${count}`;
          }
        });
      }
      scrollList() {
        const wrapper = document.getElementById("outline-list-wrapper");
        const btn = document.getElementById("outline-scroll-btn");
        if (!wrapper || !btn) return;
        const isAtBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 10;
        if (isAtBottom) {
          wrapper.scrollTo({ top: 0, behavior: "smooth" });
          setButtonIcon(btn, "arrowDown", { size: 14 });
          btn.title = this.t("outlineScrollBottom") || "滚动到底部";
        } else {
          wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: "smooth" });
          setButtonIcon(btn, "arrowUp", { size: 14 });
          btn.title = this.t("outlineScrollTop") || "滚动到顶部";
        }
      }
    }
    Object.assign(H, {
      OutlineManager
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    class CopyManager {
      constructor(settings, showToastFunc) {
        this.settings = settings;
        this.showToast = showToastFunc || (() => {
        });
        this.formulaCopyInitialized = false;
        this.tableCopyInitialized = false;
        this.formulaDblClickHandler = null;
        this.tableObserver = null;
        this.injectedButtons = /* @__PURE__ */ new Set();
      }
      // ==================== Formula Copy ====================
      /**
       * 初始化公式双击复制功能
       * 适配 ChatGPT 的公式元素结构
       */
      initFormulaCopy() {
        if (this.formulaCopyInitialized) return;
        this.formulaCopyInitialized = true;
        const styleId = "chatgpt-helper-formula-copy-style";
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          style.textContent = `
                    /* ChatGPT 公式元素选择器 */
                    [class*="katex"], 
                    [class*="math"], 
                    .katex-display,
                    .katex-html {
                        user-select: none !important;
                        cursor: pointer !important;
                    }
                    [class*="katex"]:hover, 
                    [class*="math"]:hover,
                    .katex-display:hover {
                        outline: 2px solid var(--gh-primary, #10a37f);
                        outline-offset: 2px;
                        border-radius: 4px;
                    }
                `;
          document.head.appendChild(style);
        }
        this.formulaDblClickHandler = (e) => {
          const mathEl = e.target.closest('[class*="katex"], [class*="math"], .katex-display');
          if (!mathEl) return;
          let latex = null;
          latex = mathEl.getAttribute("data-latex") || mathEl.getAttribute("data-math") || mathEl.getAttribute("data-formula");
          if (!latex) {
            const annotation = mathEl.querySelector('[data-latex], [data-math], annotation[encoding="application/x-tex"]');
            if (annotation) {
              latex = annotation.getAttribute("data-latex") || annotation.getAttribute("data-math") || annotation.textContent;
            }
          }
          if (!latex) {
            const ariaLabel = mathEl.getAttribute("aria-label");
            if (ariaLabel) {
              latex = ariaLabel;
            }
          }
          if (!latex) {
            const text = mathEl.textContent || mathEl.innerText;
            if (text && text.trim()) {
              latex = text.trim();
            }
          }
          if (!latex) {
            console.warn("[FormulaCopy] No LaTeX found");
            return;
          }
          latex = latex.trim().replace(/^\\\(|\\\)$/g, "").replace(/^\\\[|\\\]$/g, "");
          let copyText = latex;
          if (this.settings.formulaCopy?.delimiterEnabled !== false) {
            const isBlock = mathEl.classList.contains("katex-display") || mathEl.offsetHeight > 40 || mathEl.closest('[class*="block"]');
            copyText = isBlock ? `$$${latex}$$` : `$${latex}$`;
          }
          navigator.clipboard.writeText(copyText).then(() => {
            this.showToast("公式已复制");
          }).catch((err) => {
            console.error("[FormulaCopy] Copy failed:", err);
            this.showToast("复制失败");
          });
          e.preventDefault();
          e.stopPropagation();
        };
        document.addEventListener("dblclick", this.formulaDblClickHandler, true);
      }
      /**
       * 销毁公式双击复制功能
       */
      destroyFormulaCopy() {
        this.formulaCopyInitialized = false;
        const style = document.getElementById("chatgpt-helper-formula-copy-style");
        if (style) style.remove();
        if (this.formulaDblClickHandler) {
          document.removeEventListener("dblclick", this.formulaDblClickHandler, true);
          this.formulaDblClickHandler = null;
        }
      }
      // ==================== Table Copy ====================
      /**
       * 初始化表格 Markdown 复制功能
       */
      initTableCopy() {
        if (this.tableCopyInitialized) return;
        this.tableCopyInitialized = true;
        const styleId = "chatgpt-helper-table-copy-style";
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          style.textContent = `
                    .chatgpt-helper-table-copy-btn {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        width: 28px;
                        height: 28px;
                        border: none;
                        border-radius: 6px;
                        background: var(--gh-bg-secondary, rgba(255,255,255,0.9));
                        color: var(--gh-text, #374151);
                        cursor: pointer;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0.7;
                        transition: opacity 0.2s, background 0.2s, transform 0.2s;
                        z-index: 10;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    .chatgpt-helper-table-container:hover .chatgpt-helper-table-copy-btn,
                    table:hover .chatgpt-helper-table-copy-btn {
                        opacity: 1;
                    }
                    .chatgpt-helper-table-copy-btn:hover {
                        background: var(--gh-primary, #10a37f);
                        color: white;
                        transform: scale(1.1);
                    }
                    .chatgpt-helper-table-container {
                        position: relative;
                    }
                `;
          document.head.appendChild(style);
        }
        this.tableObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === "TABLE") {
                  this.injectTableButton(node);
                }
                const tables = node.querySelectorAll && node.querySelectorAll("table");
                if (tables) {
                  tables.forEach((table) => this.injectTableButton(table));
                }
              }
            });
          });
        });
        this.tableObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
        document.querySelectorAll("table").forEach((table) => {
          this.injectTableButton(table);
        });
      }
      /**
       * 为表格注入复制按钮
       */
      injectTableButton(table) {
        if (this.injectedButtons.has(table)) return;
        this.injectedButtons.add(table);
        try {
          let container = table.parentElement;
          if (!container) return;
          if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
          }
          container.classList.add("chatgpt-helper-table-container");
          if (container.querySelector(".chatgpt-helper-table-copy-btn")) return;
          const btn = document.createElement("button");
          btn.className = "chatgpt-helper-table-copy-btn";
          btn.appendChild(createSvgIconNode("list", { size: 14 }));
          btn.title = "复制为 Markdown";
          btn.addEventListener("mouseenter", () => {
            btn.style.opacity = "1";
          });
          btn.addEventListener("mouseleave", () => {
            btn.style.opacity = "0.7";
          });
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const markdown = this.tableToMarkdown(table);
            navigator.clipboard.writeText(markdown).then(() => {
              this.showToast("表格已复制");
              setButtonIcon(btn, "check", { size: 14 });
              setTimeout(() => {
                setButtonIcon(btn, "list", { size: 14 });
              }, 1e3);
            }).catch((err) => {
              console.error("[TableCopy] Copy failed:", err);
              this.showToast("复制失败");
            });
          });
          container.appendChild(btn);
        } catch (err) {
          console.error("[TableCopy] Error injecting button:", err);
        }
      }
      /**
       * 表格转 Markdown
       */
      tableToMarkdown(table) {
        const rows = table.querySelectorAll("tr");
        if (rows.length === 0) return "";
        const lines = [];
        let headerProcessed = false;
        const getCellContent = (cell) => {
          let text = cell.innerText || cell.textContent || "";
          const mathElements = cell.querySelectorAll('[class*="katex"], [class*="math"]');
          mathElements.forEach((mathEl) => {
            const latex = mathEl.getAttribute("data-latex") || mathEl.getAttribute("data-math") || mathEl.getAttribute("aria-label") || mathEl.textContent;
            if (latex) {
              text = text.replace(mathEl.textContent, `$${latex}$`);
            }
          });
          return text.trim().replace(/\|/g, "\\|").replace(/\n/g, " ").replace(/\s+/g, " ") || "";
        };
        rows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll("th, td");
          if (cells.length === 0) return;
          const cellTexts = Array.from(cells).map(getCellContent);
          lines.push("| " + cellTexts.join(" | ") + " |");
          if (!headerProcessed && (row.querySelector("th") || rowIndex === 0)) {
            const alignments = Array.from(cells).map((cell) => {
              const style = getComputedStyle(cell);
              const textAlign = style.textAlign;
              if (textAlign === "center") return ":---:";
              if (textAlign === "right") return "---:";
              return "---";
            });
            lines.push("| " + alignments.join(" | ") + " |");
            headerProcessed = true;
          }
        });
        return lines.join("\n");
      }
      /**
       * 销毁表格复制功能
       */
      destroyTableCopy() {
        this.tableCopyInitialized = false;
        if (this.tableObserver) {
          this.tableObserver.disconnect();
          this.tableObserver = null;
        }
        const style = document.getElementById("chatgpt-helper-table-copy-style");
        if (style) style.remove();
        document.querySelectorAll(".chatgpt-helper-table-copy-btn").forEach((btn) => btn.remove());
        document.querySelectorAll(".chatgpt-helper-table-container").forEach((container) => {
          container.classList.remove("chatgpt-helper-table-container");
        });
        this.injectedButtons.clear();
      }
      /**
       * 初始化所有复制功能
       */
      init() {
        if (this.settings.formulaCopy?.enabled !== false) {
          this.initFormulaCopy();
        }
        if (this.settings.tableCopy?.enabled !== false) {
          this.initTableCopy();
        }
      }
      /**
       * 销毁所有复制功能
       */
      destroy() {
        this.destroyFormulaCopy();
        this.destroyTableCopy();
      }
    }
    Object.assign(H, {
      CopyManager
    });
  })();
  (function() {
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
    class TabRenameManager {
      constructor(adapter, settings, showToastFunc) {
        this.adapter = adapter;
        this.settings = settings;
        this.showToast = showToastFunc || (() => {
        });
        this.lastSessionName = null;
        this.intervalId = null;
        this.isRunning = false;
        this.aiState = "idle";
        this.lastAiState = "idle";
        this.userSawCompletion = false;
        this.notificationAudioContext = null;
        this.notificationAudioUnlocked = false;
        this.pendingNotificationTone = false;
        this.notificationUnlockHandler = null;
        this.visibilityChangeHandler = null;
      }
      start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.updateTabName();
        this.ensureNotificationAudioUnlock();
        if (!this.visibilityChangeHandler) {
          this.visibilityChangeHandler = () => this.onVisibilityChange();
        }
        document.addEventListener("visibilitychange", this.visibilityChangeHandler);
        const intervalMs = (this.settings.tabSettings?.renameInterval || 3) * 1e3;
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
        if (this.visibilityChangeHandler) {
          document.removeEventListener("visibilitychange", this.visibilityChangeHandler);
        }
        this.teardownNotificationAudioUnlock();
      }
      restartInterval() {
        if (this.isRunning && this.intervalId) {
          clearInterval(this.intervalId);
          const intervalMs = (this.settings.tabSettings?.renameInterval || 3) * 1e3;
          this.intervalId = setInterval(() => this.updateTabName(), intervalMs);
        }
      }
      startGenerationObserver() {
        if (this.generationObserver) return;
        this.generationObserver = new MutationObserver(() => {
          const isGenerating = this.adapter.isGenerating();
          if (isGenerating && this.aiState !== "generating") {
            this.aiState = "generating";
            this.updateTabName();
          } else if (!isGenerating && this.aiState === "generating") {
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
      onVisibilityChange() {
        if (this.aiState === "generating" && !this.adapter.isGenerating()) {
          this.userSawCompletion = true;
        }
      }
      onAiComplete() {
        const wasGenerating = this.aiState === "generating";
        this.aiState = "completed";
        if (wasGenerating) {
          this.sendCompletionNotification();
        }
        this.userSawCompletion = false;
        this.updateTabName(true);
      }
      sendCompletionNotification() {
        const tabSettings = this.settings.tabSettings || {};
        if (tabSettings.notificationSound) {
          void this.playNotificationSound(tabSettings.notificationVolume || 0.5);
        }
        if (tabSettings.autoFocus) {
          try {
            if (window.focus) {
              window.focus();
            }
            setTimeout(() => {
              try {
                if (window.focus) {
                  window.focus();
                }
              } catch (e) {
              }
            }, 100);
            if (window.top && window.top !== window && window.top.focus) {
              try {
                window.top.focus();
              } catch (e) {
              }
            }
          } catch (e) {
          }
        }
      }
      ensureNotificationAudioUnlock() {
        if (this.notificationUnlockHandler) return;
        this.notificationUnlockHandler = () => {
          void this.unlockNotificationAudio().then((unlocked) => {
            if (unlocked && this.pendingNotificationTone) {
              const volume = this.settings.tabSettings?.notificationVolume || 0.5;
              this.pendingNotificationTone = false;
              void this.playNotificationSound(volume);
            }
          });
        };
        ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
          window.addEventListener(eventName, this.notificationUnlockHandler, { passive: true, capture: true });
        });
      }
      teardownNotificationAudioUnlock() {
        if (!this.notificationUnlockHandler) return;
        ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
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
          console.warn("[ChatGPT Helper] 创建 AudioContext 失败:", e);
          return null;
        }
      }
      async unlockNotificationAudio() {
        const ctx = this.getNotificationAudioContext();
        if (!ctx) return false;
        try {
          if (ctx.state === "suspended") {
            await ctx.resume();
          }
          const gain = ctx.createGain();
          gain.gain.value = 1e-4;
          gain.connect(ctx.destination);
          const osc = ctx.createOscillator();
          const now = ctx.currentTime;
          osc.type = "sine";
          osc.frequency.value = 440;
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.01);
          this.notificationAudioUnlocked = ctx.state === "running";
          if (this.notificationAudioUnlocked) {
            this.teardownNotificationAudioUnlock();
          }
          return this.notificationAudioUnlocked;
        } catch (e) {
          console.warn("[ChatGPT Helper] 解锁通知音失败:", e);
          return false;
        }
      }
      async playNotificationSound(volume = 0.5) {
        const clampedVolume = Math.max(0.1, Math.min(1, Number(volume) || 0.5));
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
          master.gain.setValueAtTime(1e-4, now);
          master.gain.exponentialRampToValueAtTime(Math.max(0.02, clampedVolume * 0.08), now + 0.01);
          master.gain.exponentialRampToValueAtTime(1e-4, now + 0.34);
          master.connect(ctx.destination);
          const first = ctx.createOscillator();
          first.type = "sine";
          first.frequency.setValueAtTime(880, now);
          first.connect(master);
          first.start(now);
          first.stop(now + 0.11);
          const second = ctx.createOscillator();
          second.type = "triangle";
          second.frequency.setValueAtTime(1320, now + 0.14);
          second.connect(master);
          second.start(now + 0.14);
          second.stop(now + 0.32);
          this.pendingNotificationTone = false;
          return true;
        } catch (e) {
          console.warn("[ChatGPT Helper] 播放通知音失败:", e);
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
        if (tabSettings.privacyMode) {
          document.title = tabSettings.privacyTitle || "ChatGPT";
          return;
        }
        const sessionName = this.getCleanSessionName(tabSettings);
        const isGenerating = this.isGenerating();
        const statusPrefix = tabSettings.showStatus !== false ? isGenerating ? "⏳ " : "✅ " : "";
        const format = tabSettings.titleFormat || "{status}{title}";
        const modelName = format.includes("{model}") ? this.adapter.getModelName ? this.adapter.getModelName() : "" : "";
        let finalTitle = format.replace("{status}", statusPrefix).replace("{title}", sessionName || "ChatGPT").replace("{model}", modelName ? `[${modelName}] ` : "").replace(/\s+/g, " ").trim();
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
        const isPolluted = (name) => {
          if (!name) return false;
          if (/^[⏳✅]/.test(name)) return true;
          if (/\[[\w\s.]+\]/.test(name)) return true;
          if (name === (tabSettings.privacyTitle || "ChatGPT")) return true;
          return false;
        };
        if (sessionName && !isPolluted(sessionName)) {
          this.lastSessionName = sessionName;
          return sessionName;
        }
        return this.lastSessionName;
      }
      isGenerating() {
        if (this.aiState === "completed") return false;
        return this.aiState === "generating" || (this.adapter.isGenerating ? this.adapter.isGenerating() : false);
      }
    }
    Object.assign(H, {
      TabRenameManager
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTHelper
    } = H;
    class ChatGPTAdapter {
      constructor() {
        this.textarea = null;
        this.lastResponseContainer = null;
        this.findTextarea();
      }
      findTextarea() {
        const selectors = [
          "#prompt-textarea",
          'textarea[placeholder*="Message"]',
          'textarea[placeholder*="消息"]',
          'textarea[data-id="root"]',
          'div[contenteditable="true"][role="textbox"]',
          'div[contenteditable="true"]',
          "textarea"
        ];
        for (const selector of selectors) {
          const el = document.querySelector(selector);
          if (el && el.offsetParent !== null) {
            this.textarea = el;
            return;
          }
        }
      }
      getSidebarContainer() {
        return document.querySelector('nav[aria-label*="Chat history"]') || document.querySelector('nav[aria-label*="聊天历史"]') || document.querySelector('aside[aria-label*="Chat history"]') || document.querySelector('aside[aria-label*="聊天历史"]') || document.querySelector('[data-testid="sidebar"]') || document.querySelector("nav") || document.querySelector("aside");
      }
      getChatContainer() {
        return document.querySelector('main[class*="flex"]') || document.querySelector("main") || document.querySelector('[role="main"]') || document.querySelector(".flex-1") || document.querySelector('[class*="flex"][class*="flex-col"]');
      }
      isScrollableOverflowValue(value) {
        return value === "auto" || value === "scroll" || value === "overlay";
      }
      hasScrollableOverflow(style) {
        if (!style) return false;
        return this.isScrollableOverflowValue(style.overflowY) || this.isScrollableOverflowValue(style.overflow);
      }
      isScrollableCandidate(element) {
        if (!element || !element.isConnected || element.clientHeight <= 0 || element.getClientRects().length === 0) {
          return false;
        }
        const style = window.getComputedStyle(element);
        return element.scrollHeight > element.clientHeight && this.hasScrollableOverflow(style);
      }
      canScrollElement(element) {
        if (!this.isScrollableCandidate(element)) {
          return false;
        }
        try {
          const originalScrollTop = element.scrollTop;
          const maxScrollTop = Math.max(0, element.scrollHeight - element.clientHeight);
          if (maxScrollTop <= 0) {
            return false;
          }
          const delta = originalScrollTop >= maxScrollTop - 1 ? -1 : 1;
          const targetScrollTop = Math.max(0, Math.min(maxScrollTop, originalScrollTop + delta));
          if (targetScrollTop === originalScrollTop) {
            return false;
          }
          element.scrollTop = targetScrollTop;
          const didScroll = element.scrollTop !== originalScrollTop;
          element.scrollTop = originalScrollTop;
          return didScroll;
        } catch (e) {
          return false;
        }
      }
      cacheResponseContainer(element) {
        if (element && element.isConnected) {
          this.lastResponseContainer = element;
        }
        return element;
      }
      getCachedResponseContainer() {
        if (!this.lastResponseContainer) {
          return null;
        }
        if (!this.isScrollableCandidate(this.lastResponseContainer)) {
          this.lastResponseContainer = null;
          return null;
        }
        return this.lastResponseContainer;
      }
      insertPrompt(content) {
        let editor = this.textarea;
        if (!editor) {
          this.findTextarea();
          editor = this.textarea;
          if (!editor) {
            console.warn("[ChatGPT Helper] 未找到输入框");
            return false;
          }
        }
        if (!editor.isConnected) {
          this.textarea = null;
          this.findTextarea();
          editor = this.textarea;
          if (!editor) return false;
        }
        try {
          if (editor.contentEditable === "true" || editor.getAttribute("contenteditable") === "true") {
            editor.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("insertText", false, content);
            editor.dispatchEvent(new Event("input", { bubbles: true }));
            editor.dispatchEvent(new Event("change", { bubbles: true }));
          } else if (editor.tagName === "TEXTAREA") {
            editor.focus();
            editor.value = content;
            editor.dispatchEvent(new Event("input", { bubbles: true }));
            editor.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            editor.textContent = content;
            editor.dispatchEvent(new Event("input", { bubbles: true }));
          }
          return true;
        } catch (e) {
          console.error("[ChatGPT Helper] 插入提示词失败:", e);
          return false;
        }
      }
      getResponseContainer() {
        const cachedContainer = this.getCachedResponseContainer();
        if (cachedContainer) {
          return cachedContainer;
        }
        const mainContainer = this.getChatContainer() || document.querySelector(".flex-1");
        if (mainContainer) {
          const findScrollableChild = (element, depth = 0) => {
            if (depth > 5) return null;
            if (this.canScrollElement(element)) {
              return element;
            }
            for (const child of element.children) {
              const found = findScrollableChild(child, depth + 1);
              if (found) return found;
            }
            return null;
          };
          if (this.canScrollElement(mainContainer)) {
            return this.cacheResponseContainer(mainContainer);
          }
          const scrollableChild = findScrollableChild(mainContainer);
          if (scrollableChild) {
            console.log("[ChatGPT Helper] 找到可滚动的子元素:", scrollableChild);
            return this.cacheResponseContainer(scrollableChild);
          }
          const allElements = mainContainer.querySelectorAll("*");
          for (const el of allElements) {
            if (this.canScrollElement(el)) {
              console.log("[ChatGPT Helper] 找到可滚动的元素（通过 overflow 样式）:", el);
              return this.cacheResponseContainer(el);
            }
          }
        }
        const messageSelectors = [
          "[data-message-author-role]",
          '.group[data-testid*="conversation-turn"]',
          '[class*="group"]'
        ];
        for (const selector of messageSelectors) {
          const message = document.querySelector(selector);
          if (message) {
            let parent = message.parentElement;
            let depth = 0;
            while (parent && depth < 15) {
              if (this.canScrollElement(parent)) {
                return this.cacheResponseContainer(parent);
              }
              parent = parent.parentElement;
              depth++;
            }
          }
        }
        this.lastResponseContainer = null;
        console.log("[ChatGPT Helper] 未找到可滚动容器，回退到 body");
        return document.body;
      }
      getChatMessages() {
        const container = this.getResponseContainer();
        if (!container) return [];
        const messageSelectors = [
          "[data-message-author-role]",
          '.group[data-testid*="conversation-turn"]',
          ".group",
          '[class*="group"]'
        ];
        for (const selector of messageSelectors) {
          const messages = container.querySelectorAll(selector);
          if (messages.length > 0) {
            return Array.from(messages);
          }
        }
        return [];
      }
      getSessionName() {
        let title = document.title;
        if (title) {
          title = title.replace(/^[⏳✅]\s*/, "").trim();
          title = title.replace(/^\[[\w\s.]+\]\s*/, "").trim();
          if (title && title !== "ChatGPT" && title !== "New Chat") {
            return title;
          }
        }
        const sidebar = this.getSidebarContainer();
        if (sidebar) {
          const activeItem = sidebar.querySelector('[aria-current="page"], [data-active="true"], .active');
          if (activeItem) {
            const name = activeItem.textContent?.trim();
            if (name && name !== "New Chat" && name !== "新对话") {
              return name;
            }
          }
        }
        const url = window.location.href;
        const match = url.match(/\/c\/([a-zA-Z0-9-]+)/);
        if (match) {
          return `Chat ${match[1].substring(0, 8)}`;
        }
        return null;
      }
      getModelName() {
        const selectors = [
          "[data-model]",
          '[aria-label*="model"]',
          '[title*="model" i]',
          'select[aria-label*="model" i]',
          ".model-selector",
          '[class*="model"]'
        ];
        for (const selector of selectors) {
          const el = document.querySelector(selector);
          if (el) {
            const model = el.getAttribute("data-model") || el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent?.trim();
            if (model && model.length < 50) {
              return model.replace(/model\s*:?\s*/i, "").trim();
            }
          }
        }
        return null;
      }
      getConversationList() {
        const sidebar = this.getSidebarContainer();
        if (!sidebar) return [];
        const conversations = [];
        const selectors = [
          'a[href*="/c/"]',
          'a[href*="/chat/"]',
          "nav a",
          "aside a",
          '[class*="conversation"] a',
          '[data-testid*="conversation"] a'
        ];
        let items = [];
        for (const selector of selectors) {
          items = Array.from(sidebar.querySelectorAll(selector));
          if (items.length > 0) break;
        }
        items.forEach((item) => {
          const href = item.getAttribute("href");
          if (!href) return;
          const idMatch = href.match(/\/c\/([^\/\?]+)/) || href.match(/\/chat\/([^\/\?]+)/);
          if (!idMatch) return;
          const id = idMatch[1];
          const title = (item.innerText || item.textContent || "").trim().replace(/\s+/g, " ") || "未命名对话";
          const url = href.startsWith("http") ? href : `https://chat.openai.com${href}`;
          const isPinned = item.closest('[class*="pinned"]') !== null || item.closest('[data-pinned="true"]') !== null || item.getAttribute("data-pinned") === "true";
          let updatedAt = null;
          try {
            const timeEl = item.querySelector("time[datetime]") || item.closest("li, div, article, section")?.querySelector("time[datetime]");
            if (timeEl) {
              const dt = timeEl.getAttribute("datetime") || timeEl.dateTime;
              const ts = Date.parse(dt);
              if (!Number.isNaN(ts)) {
                updatedAt = ts;
              }
            }
          } catch (e) {
          }
          conversations.push({
            id,
            title,
            url,
            isPinned,
            updatedAt
          });
        });
        return conversations;
      }
      getSiteId() {
        return "chatgpt";
      }
      extractUserQueryText(element) {
        if (!element) return "";
        const textContent = element.textContent || element.innerText || "";
        return textContent.trim();
      }
      getScrollContainer() {
        return this.getResponseContainer();
      }
      isGenerating() {
        const stopButton = document.querySelector('button[aria-label*="Stop" i], button[aria-label*="停止" i], button[data-testid*="stop" i]');
        if (stopButton && stopButton.offsetParent !== null) {
          return true;
        }
        const loadingIndicators = [
          '[class*="loading"]',
          '[class*="generating"]',
          '[role="progressbar"]',
          '[data-testid*="loading" i]',
          '[aria-busy="true"]'
        ];
        for (const selector of loadingIndicators) {
          const indicator = document.querySelector(selector);
          if (indicator && indicator.offsetParent !== null) {
            return true;
          }
        }
        return false;
      }
    }
    Object.assign(H, {
      ChatGPTAdapter
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter
    } = H;
    class ChatGPTHelper {
      constructor() {
        try {
          try {
            this.adapter = new ChatGPTAdapter();
          } catch (e) {
            console.error("[ChatGPT Helper] ChatGPTAdapter 创建错误:", e);
            throw e;
          }
          try {
            this.prompts = this.loadPrompts();
          } catch (e) {
            console.error("[ChatGPT Helper] loadPrompts 错误:", e);
            this.prompts = DEFAULT_PROMPTS;
          }
          try {
            this.settings = this.loadSettings();
          } catch (e) {
            console.error("[ChatGPT Helper] loadSettings 错误:", e);
            this.settings = DEFAULT_SETTINGS;
          }
          this.isCollapsed = !this.settings.defaultPanelState;
          this.currentTab = this.settings.tabOrder && this.settings.tabOrder.length > 0 ? this.settings.tabOrder[0] : "prompts";
          this.selectedCategory = t("allCategory");
          this.searchQuery = "";
          this.selectedPrompt = null;
          this.savedAnchorTop = null;
          this.hasAnchor = false;
          this.panel = null;
          this.lang = detectLanguage();
          this.t = t;
          try {
            this.scrollManager = new ScrollManager(this.adapter);
          } catch (e) {
            console.error("[ChatGPT Helper] ScrollManager 创建错误:", e);
            throw e;
          }
          try {
            this.historyLoader = new HistoryLoader(this.scrollManager, (msg) => this.showToast(msg));
          } catch (e) {
            console.error("[ChatGPT Helper] HistoryLoader 创建错误:", e);
            this.historyLoader = null;
          }
          try {
            this.anchorManager = new AnchorManager(this.scrollManager, (msg) => this.showToast(msg));
          } catch (e) {
            console.error("[ChatGPT Helper] AnchorManager 创建错误:", e);
            this.anchorManager = null;
          }
          try {
            this.readingProgressManager = new ReadingProgressManager(
              this.settings,
              this.scrollManager,
              this.adapter,
              (msg) => this.showToast(msg)
            );
          } catch (e) {
            console.error("[ChatGPT Helper] ReadingProgressManager 创建错误:", e);
            this.readingProgressManager = null;
          }
          try {
            if (this.anchorManager) {
              this.anchorManager.bindUI((hasAnchor) => {
                this.hasAnchor = hasAnchor;
                if (this.updateAnchorButton) {
                  this.updateAnchorButton();
                }
              });
            }
          } catch (e) {
            console.error("[ChatGPT Helper] 绑定锚点UI回调错误:", e);
          }
          this.outlineManager = null;
          try {
            this.copyManager = new CopyManager(this.settings, (msg) => this.showToast(msg));
          } catch (e) {
            console.error("[ChatGPT Helper] CopyManager 创建错误:", e);
            this.copyManager = null;
          }
          try {
            this.tabRenameManager = new TabRenameManager(this.adapter, this.settings, (msg) => this.showToast(msg));
          } catch (e) {
            console.error("[ChatGPT Helper] TabRenameManager 创建错误:", e);
            this.tabRenameManager = null;
          }
          this.themeObserver = null;
          this.systemThemeMediaQuery = null;
          this.systemThemeListener = null;
          this.currentEffectiveTheme = "light";
          this.themeAssetRepository = new ThemeAssetRepository();
          this.themeBackgroundObjectUrl = null;
          this.themeBackgroundObjectAssetId = null;
          this.themeModal = null;
          this.themeModalRefs = null;
          this.themeModalEscHandler = null;
          this.themeModalBackdropHandler = null;
          this.themeRuntimeStyleReady = false;
          this.themeHostRefreshQueued = false;
          this.beforeUnloadHandler = () => {
            this.revokeThemeBackgroundObjectUrl();
            this.stopSystemThemeListener();
            this.closeThemeSettingsModal();
          };
          window.addEventListener("beforeunload", this.beforeUnloadHandler);
          try {
            this.init();
          } catch (e) {
            console.error("[ChatGPT Helper] init 调用错误:", e);
            console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
          }
        } catch (e) {
          console.error("[ChatGPT Helper] 构造函数严重错误:", e);
          console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
          this.panel = null;
          this.adapter = null;
          throw e;
        }
      }
    }
    Object.assign(H, {
      ChatGPTHelper
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Storage And Init module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      loadPrompts() {
        const saved = window.GM_getValue(SETTING_KEYS.PROMPTS, null);
        return saved || DEFAULT_PROMPTS;
      },
      savePrompts() {
        window.GM_setValue(SETTING_KEYS.PROMPTS, this.prompts);
      },
      loadSettings() {
        const saved = window.GM_getValue(SETTING_KEYS.SETTINGS, null);
        const source = saved && typeof saved === "object" ? saved : {};
        const settings = {
          ...DEFAULT_SETTINGS,
          ...source,
          prompts: { ...DEFAULT_SETTINGS.prompts, ...source.prompts || {} },
          outline: { ...DEFAULT_SETTINGS.outline, ...source.outline || {} },
          conversations: { ...DEFAULT_SETTINGS.conversations, ...source.conversations || {} },
          pageWidth: { ...DEFAULT_SETTINGS.pageWidth, ...source.pageWidth || {} },
          readingHistory: { ...DEFAULT_SETTINGS.readingHistory, ...source.readingHistory || {} },
          formulaCopy: { ...DEFAULT_SETTINGS.formulaCopy, ...source.formulaCopy || {} },
          tableCopy: { ...DEFAULT_SETTINGS.tableCopy, ...source.tableCopy || {} },
          tabSettings: { ...DEFAULT_SETTINGS.tabSettings, ...source.tabSettings || {} }
        };
        settings.themeConfig = normalizeThemeConfig(source.themeConfig, source.themeMode);
        settings.themeMode = null;
        if (!Array.isArray(settings.tabOrder)) {
          settings.tabOrder = ["prompts", "outline", "conversations", "export"];
        }
        if (!Array.isArray(settings.collapsedButtonsOrder)) {
          settings.collapsedButtonsOrder = DEFAULT_COLLAPSED_BUTTONS_ORDER.map((item) => ({ ...item }));
        } else {
          settings.collapsedButtonsOrder = settings.collapsedButtonsOrder.filter((item) => item && COLLAPSED_BUTTON_DEFS[item.id]).map((item) => ({
            id: item.id,
            enabled: item.enabled !== false
          }));
          if (settings.collapsedButtonsOrder.length === 0) {
            settings.collapsedButtonsOrder = DEFAULT_COLLAPSED_BUTTONS_ORDER.map((item) => ({ ...item }));
          }
        }
        if (settings.tabOrder && !settings.tabOrder.includes("export")) {
          settings.tabOrder.push("export");
        } else if (!settings.tabOrder) {
          settings.tabOrder = ["prompts", "outline", "conversations", "export"];
        }
        return settings;
      },
      saveSettings() {
        this.settings.themeConfig = normalizeThemeConfig(this.settings.themeConfig, this.settings.themeMode);
        window.GM_setValue(SETTING_KEYS.SETTINGS, this.settings);
      },
      async requestNotificationPermission() {
        if (typeof window.GM_notification !== "undefined") {
          return true;
        }
        if (typeof Notification === "undefined") {
          console.warn("[ChatGPT Helper] Notification API 不可用");
          return false;
        }
        if (Notification.permission === "granted") {
          return true;
        }
        if (Notification.permission === "denied") {
          this.showToast("通知权限已被拒绝，请在浏览器设置中允许通知");
          return false;
        }
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            this.showToast("通知权限已授予");
            return true;
          } else {
            this.showToast("通知权限被拒绝");
            return false;
          }
        } catch (err) {
          console.error("[ChatGPT Helper] 请求通知权限失败:", err);
          this.showToast("请求通知权限失败");
          return false;
        }
      },
      init() {
        try {
          console.log("[ChatGPT Helper] 开始初始化...");
          try {
            this.createStyles();
          } catch (e) {
            console.error("[ChatGPT Helper] createStyles 错误:", e);
          }
          try {
            this.createLayout();
          } catch (e) {
            console.error("[ChatGPT Helper] createLayout 错误:", e);
          }
          setTimeout(() => {
            try {
              if (this.panel) {
                try {
                  this.initializeThemeSystem().catch((e) => {
                    console.error("[ChatGPT Helper] initializeThemeSystem 错误:", e);
                  });
                } catch (e) {
                  console.error("[ChatGPT Helper] initializeThemeSystem 调用错误:", e);
                }
                try {
                  this.createUI();
                } catch (e) {
                  console.error("[ChatGPT Helper] createUI 错误:", e);
                }
                try {
                  this.createCollapsedButtons();
                } catch (e) {
                  console.error("[ChatGPT Helper] createCollapsedButtons 错误:", e);
                }
                try {
                  this.bindEvents();
                } catch (e) {
                  console.error("[ChatGPT Helper] bindEvents 错误:", e);
                }
                try {
                  this.monitorTheme();
                } catch (e) {
                  console.error("[ChatGPT Helper] monitorTheme 错误:", e);
                }
                try {
                  if (this.settings.readingHistory?.persistence) {
                    this.readingProgressManager.startRecording();
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] startRecording 错误:", e);
                }
                try {
                  if (this.settings.readingHistory?.autoRestore) {
                    setTimeout(() => {
                      try {
                        this.readingProgressManager.restoreProgress().then((success) => {
                          if (success && this.readingProgressManager.restoredTop !== null) {
                            this.anchorManager.setAnchor(this.readingProgressManager.restoredTop);
                          }
                        }).catch((e) => {
                          console.error("[ChatGPT Helper] restoreProgress 错误:", e);
                        });
                      } catch (e) {
                        console.error("[ChatGPT Helper] restoreProgress 设置错误:", e);
                      }
                    }, 1e3);
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] 恢复阅读位置错误:", e);
                }
                try {
                  this.readingProgressManager.cleanup();
                } catch (e) {
                  console.error("[ChatGPT Helper] cleanup 错误:", e);
                }
                try {
                  if (!this.widthStyleManager) {
                    this.widthStyleManager = new WidthStyleManager(this.adapter, this.settings.pageWidth);
                    this.widthStyleManager.apply();
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] WidthStyleManager 错误:", e);
                }
                try {
                  if (this.settings.formulaCopy?.enabled !== false || this.settings.tableCopy?.enabled !== false) {
                    this.copyManager.init();
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] copyManager.init 错误:", e);
                }
                try {
                  if (this.settings.tabSettings?.enabled !== false) {
                    this.tabRenameManager.start();
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] tabRenameManager.start 错误:", e);
                }
                try {
                  if (!this.scrollLockManager) {
                    this.scrollLockManager = new ScrollLockManager(this.adapter);
                    this.scrollLockManager.setEnabled(this.settings.preventAutoScroll || false);
                  } else {
                    this.scrollLockManager.setEnabled(this.settings.preventAutoScroll || false);
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] ScrollLockManager 错误:", e);
                }
                try {
                  window.addEventListener("chatgpt-helper-outline-auto-refresh", () => {
                    try {
                      if (this.currentTab === "outline") {
                        this.refreshOutline();
                      }
                    } catch (e) {
                      console.error("[ChatGPT Helper] refreshOutline 错误:", e);
                    }
                  });
                } catch (e) {
                  console.error("[ChatGPT Helper] 添加大纲刷新监听器错误:", e);
                }
                console.log("[ChatGPT Helper] 初始化完成");
              } else {
                console.error("[ChatGPT Helper] 面板未创建，重试...");
                setTimeout(() => {
                  try {
                    this.createLayout();
                    if (this.panel) {
                      try {
                        this.initializeThemeSystem().catch((e3) => {
                          console.error("[ChatGPT Helper] 重试 initializeThemeSystem 错误:", e3);
                        });
                      } catch (e3) {
                        console.error("[ChatGPT Helper] 重试 initializeThemeSystem 调用错误:", e3);
                      }
                      try {
                        this.createUI();
                        this.createCollapsedButtons();
                        this.bindEvents();
                      } catch (e) {
                        console.error("[ChatGPT Helper] 重试创建 UI 错误:", e);
                      }
                    }
                  } catch (e) {
                    console.error("[ChatGPT Helper] 重试 createLayout 错误:", e);
                  }
                }, 500);
              }
            } catch (e) {
              console.error("[ChatGPT Helper] init setTimeout 错误:", e);
              console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
            }
          }, 100);
        } catch (e) {
          console.error("[ChatGPT Helper] 初始化错误:", e);
          console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
        }
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Theme module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      getThemeConfig() {
        if (!this.settings.themeConfig || typeof this.settings.themeConfig !== "object") {
          this.settings.themeConfig = normalizeThemeConfig(null, this.settings.themeMode);
        }
        return this.settings.themeConfig;
      },
      updateThemeButtons() {
        const isDark = this.currentEffectiveTheme === "dark";
        const quickThemeBtn = document.getElementById("quick-btn-theme");
        if (quickThemeBtn) {
          setButtonIcon(quickThemeBtn, isDark ? "moon" : "sun", {
            size: 18,
            className: "chatgpt-helper-quick-btn-icon"
          });
        }
        const headerThemeBtn = document.getElementById("chatgpt-helper-header-theme-btn");
        if (headerThemeBtn) {
          setButtonIcon(headerThemeBtn, isDark ? "sun" : "moon", { size: 15 });
        }
      },
      syncHelperThemeMode(mode) {
        const normalizedMode = mode === "dark" ? "dark" : "light";
        document.body.dataset.ghMode = normalizedMode;
        document.body.setAttribute("data-gh-mode", normalizedMode);
        document.documentElement.setAttribute("data-gh-mode", normalizedMode);
        this.currentEffectiveTheme = normalizedMode;
        this.updateThemeButtons();
      },
      getSystemPreferredTheme() {
        try {
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
          }
        } catch (e) {
        }
        return "light";
      },
      stopSystemThemeListener() {
        if (!this.systemThemeMediaQuery || !this.systemThemeListener) return;
        try {
          if (typeof this.systemThemeMediaQuery.removeEventListener === "function") {
            this.systemThemeMediaQuery.removeEventListener("change", this.systemThemeListener);
          } else if (typeof this.systemThemeMediaQuery.removeListener === "function") {
            this.systemThemeMediaQuery.removeListener(this.systemThemeListener);
          }
        } catch (e) {
        }
        this.systemThemeMediaQuery = null;
        this.systemThemeListener = null;
      },
      startSystemThemeListener() {
        this.stopSystemThemeListener();
        if (!window.matchMedia) return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
          const cfg = this.getThemeConfig();
          if (cfg.appearanceMode !== "system") return;
          const targetTheme = mediaQuery.matches ? "dark" : "light";
          void this.applyEffectiveTheme(targetTheme, {
            preferNative: false,
            persist: false,
            fromSystem: true
          });
        };
        try {
          if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handler);
          } else if (typeof mediaQuery.addListener === "function") {
            mediaQuery.addListener(handler);
          }
        } catch (e) {
        }
        this.systemThemeMediaQuery = mediaQuery;
        this.systemThemeListener = handler;
      },
      detectEffectiveThemeFromDom() {
        const bodyClass = document.body.className;
        const htmlClass = document.documentElement.className;
        const bodyStyle = window.getComputedStyle(document.body);
        const hasDarkClass = /\bdark\b/i.test(bodyClass) || /\bdark-theme\b/i.test(bodyClass) || /\bdark\b/i.test(htmlClass) || /\bdark-theme\b/i.test(htmlClass);
        const hasLightClass = /\blight\b/i.test(bodyClass) || /\blight-theme\b/i.test(bodyClass) || /\blight\b/i.test(htmlClass) || /\blight-theme\b/i.test(htmlClass);
        if (hasDarkClass) return "dark";
        if (hasLightClass) return "light";
        const dataTheme = document.body.dataset.theme || document.documentElement.dataset.theme || document.documentElement.getAttribute("data-theme");
        if (dataTheme === "dark") return "dark";
        if (dataTheme === "light") return "light";
        const inlineColorScheme = document.body.style.colorScheme;
        const computedColorScheme = bodyStyle.colorScheme;
        const colorScheme = inlineColorScheme || computedColorScheme;
        if (colorScheme === "dark") return "dark";
        if (colorScheme === "light") return "light";
        const bgColor = bodyStyle.backgroundColor || "";
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const r = parseInt(rgbMatch[1], 10);
          const g = parseInt(rgbMatch[2], 10);
          const b = parseInt(rgbMatch[3], 10);
          const brightness = (r + g + b) / 3;
          if (brightness < 128) return "dark";
        }
        return "light";
      },
      findNativeThemeToggleButton() {
        const helperPanel = document.getElementById("chatgpt-helper-panel");
        const isInHelperPanel = (btn) => {
          if (!btn) return false;
          if (helperPanel && helperPanel.contains(btn)) return true;
          let element = btn;
          while (element && element !== document.body) {
            if (element.id && element.id.includes("chatgpt-helper")) return true;
            if (typeof element.className === "string" && element.className.includes("chatgpt-helper")) return true;
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
            const btn = candidate.closest("button") || candidate;
            if (!btn || btn.tagName !== "BUTTON" || isInHelperPanel(btn)) continue;
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
            btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
          } catch (e2) {
            return false;
          }
        }
        for (let attempt = 0; attempt < 8; attempt++) {
          await new Promise((resolve) => setTimeout(resolve, 150));
          if (this.detectEffectiveThemeFromDom() === targetTheme) {
            return true;
          }
        }
        return false;
      },
      directApplyPageTheme(theme) {
        if (theme === "dark") {
          document.body.classList.add("dark", "dark-theme");
          document.documentElement.classList.add("dark", "dark-theme");
          document.body.classList.remove("light", "light-theme");
          document.documentElement.classList.remove("light", "light-theme");
          document.body.style.colorScheme = "dark";
          document.documentElement.style.colorScheme = "dark";
          document.body.dataset.theme = "dark";
          document.documentElement.setAttribute("data-theme", "dark");
          document.body.setAttribute("data-mode", "dark");
          document.documentElement.setAttribute("data-mode", "dark");
        } else {
          document.body.classList.remove("dark", "dark-theme");
          document.documentElement.classList.remove("dark", "dark-theme");
          document.body.classList.add("light", "light-theme");
          document.documentElement.classList.add("light", "light-theme");
          document.body.style.colorScheme = "light";
          document.documentElement.style.colorScheme = "light";
          document.body.dataset.theme = "light";
          document.documentElement.setAttribute("data-theme", "light");
          document.body.setAttribute("data-mode", "light");
          document.documentElement.setAttribute("data-mode", "light");
        }
        try {
          localStorage.setItem("theme", theme);
        } catch (e) {
        }
        this.syncHelperThemeMode(theme);
        window.dispatchEvent(new CustomEvent("themechange", { detail: { mode: theme } }));
        document.dispatchEvent(new CustomEvent("themechange", { detail: { mode: theme } }));
        try {
          window.dispatchEvent(new StorageEvent("storage", {
            key: "theme",
            newValue: theme,
            oldValue: null
          }));
        } catch (e) {
        }
      },
      async applyEffectiveTheme(theme, options = {}) {
        const opts = {
          preferNative: true,
          persist: false,
          ...options
        };
        const normalizedTheme = theme === "dark" ? "dark" : "light";
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
        const normalizedMode = ["system", "light", "dark"].includes(mode) ? mode : "system";
        cfg.appearanceMode = normalizedMode;
        cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        if (normalizedMode === "system") {
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
          if (normalizedMode === "dark") {
            this.showToast(this.t("themeSwitchedDark"));
          } else if (normalizedMode === "light") {
            this.showToast(this.t("themeSwitchedLight"));
          }
        }
      },
      applyThemePresetVariables(presetKey, persist = true) {
        const cfg = this.getThemeConfig();
        const preset = getThemePresetByKey(presetKey);
        const root2 = document.documentElement;
        if (preset.isOriginal) {
          THEME_PRESET_INLINE_VAR_KEYS.forEach((key) => {
            root2.style.removeProperty(key);
          });
        } else {
          const gradient = `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)`;
          root2.style.setProperty("--gh-theme-primary", preset.primary);
          root2.style.setProperty("--gh-theme-secondary", preset.secondary);
          root2.style.setProperty("--gh-theme-accent", preset.accent);
          root2.style.setProperty("--gh-theme-accent-dark", preset.accent);
          root2.style.setProperty("--gh-theme-light", preset.light);
          root2.style.setProperty("--gh-primary", preset.primary);
          root2.style.setProperty("--gh-primary-hover", preset.accent);
          root2.style.setProperty("--gh-tag-active-bg", preset.primary);
          root2.style.setProperty("--gh-gradient", gradient);
          root2.style.setProperty("--gh-header-bg", gradient);
          root2.style.setProperty("--gh-theme-surface-light-base", rgbaFromColor(blendRgbColors("#ffffff", preset.light, 0.64), 1));
          root2.style.setProperty("--gh-theme-surface-light-accent", rgbaFromColor(blendRgbColors("#ffffff", preset.primary, 0.18), 1));
          root2.style.setProperty("--gh-theme-surface-dark-base", rgbaFromColor(blendRgbColors("#020617", preset.primary, 0.18), 1));
          root2.style.setProperty("--gh-theme-surface-dark-accent", rgbaFromColor(blendRgbColors("#020617", preset.secondary, 0.16), 1));
          root2.style.setProperty("--gh-page-sidebar-bg-light", "linear-gradient(180deg, rgba(255, 255, 255, 0.360), rgba(248, 250, 252, 0.220))");
          root2.style.setProperty("--gh-page-chat-bg-light", "transparent");
          root2.style.setProperty("--gh-page-composer-bg-light", "linear-gradient(135deg, rgba(255, 255, 255, 0.900), rgba(248, 250, 252, 0.800))");
          root2.style.setProperty("--gh-page-sidebar-bg-dark", "linear-gradient(180deg, rgba(2, 6, 23, 0.360), rgba(2, 6, 23, 0.240))");
          root2.style.setProperty("--gh-page-chat-bg-dark", "transparent");
          root2.style.setProperty("--gh-page-composer-bg-dark", "linear-gradient(135deg, rgba(8, 17, 29, 0.860), rgba(15, 23, 42, 0.760))");
          root2.style.setProperty("--gh-page-accent-soft", `color-mix(in srgb, ${preset.primary}, transparent 84%)`);
          root2.style.setProperty("--gh-page-accent-soft-dark", `color-mix(in srgb, ${preset.primary}, transparent 74%)`);
          root2.style.setProperty("--gh-page-accent-strong", preset.accent);
          root2.style.setProperty("--gh-page-link", preset.accent);
          root2.style.setProperty("--gh-page-selection", `color-mix(in srgb, ${preset.primary}, transparent 82%)`);
        }
        if (cfg.presetKey !== preset.key) {
          cfg.presetKey = preset.key;
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
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
        element.setAttribute(attrName, "true");
        return true;
      },
      markThemeHostChain(element, attrName, options = {}) {
        if (!(element instanceof HTMLElement)) return false;
        let current = element;
        let depth = 0;
        let marked = false;
        while (current && current !== document.body && current !== document.documentElement && depth < 6) {
          if (options.kind === "sidebar") {
            const rect = current.getBoundingClientRect();
            const isLikelySidebarShell = rect.width >= 140 && rect.width <= Math.max(520, Math.floor(window.innerWidth * 0.42)) && rect.height >= Math.floor(window.innerHeight * 0.45) && rect.left <= 80;
            if (!isLikelySidebarShell) {
              if (depth === 0) {
                return false;
              }
              break;
            }
          }
          current.setAttribute(attrName, "true");
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
        const getElementClassName = (element) => typeof element.className === "string" ? element.className : element.getAttribute && element.getAttribute("class") || "";
        const looksLikeChatSidebar = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const rect = element.getBoundingClientRect();
          const maxWidth = Math.max(520, Math.floor(window.innerWidth * 0.42));
          const isLeftRail = rect.left <= 80 && rect.width >= 140 && rect.width <= maxWidth && rect.height >= Math.floor(window.innerHeight * 0.45);
          if (!isLeftRail) return false;
          const signals = [
            element.id,
            getElementClassName(element),
            element.getAttribute("data-testid"),
            element.getAttribute("aria-label"),
            (element.textContent || "").slice(0, 600)
          ].filter(Boolean).join(" ");
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
          "#stage-slideover-sidebar",
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
          ...collectCandidates("aside, nav").filter(looksLikeChatSidebar)
        ];
        let sidebarHost = null;
        for (const candidate of sidebarCandidates) {
          if (!looksLikeChatSidebar(candidate)) continue;
          if (this.markThemeHostChain(candidate, "data-gh-theme-host-sidebar", { kind: "sidebar" })) {
            sidebarHost = candidate;
            break;
          }
        }
        if (sidebarHost && sidebarHost.closest) {
          const sidebarShell = resolveSidebarShell(sidebarHost);
          const sidebarWrapper = sidebarHost.closest('#stage-slideover-sidebar, [data-testid*="sidebar"], [id*="sidebar"], [class*="sidebar"], [class*="Sidebar"], aside, nav');
          this.markThemeHostElement(sidebarShell, "data-gh-theme-host-sidebar-shell");
          this.markThemeHostChain(sidebarWrapper, "data-gh-theme-host-sidebar", { kind: "sidebar" });
          this.markThemeHostElement(sidebarWrapper, "data-gh-theme-host-sidebar");
          this.markThemeHostElement(sidebarShell, "data-gh-theme-host-sidebar");
          this.markThemeHostElement(sidebarHost.firstElementChild, "data-gh-theme-host-sidebar");
          this.markThemeHostElement(sidebarHost.firstElementChild && sidebarHost.firstElementChild.firstElementChild, "data-gh-theme-host-sidebar");
        }
        const mainCandidates = [
          this.adapter?.getChatContainer ? this.adapter.getChatContainer() : null,
          document.querySelector("main"),
          document.querySelector('[role="main"]')
        ];
        let mainHost = null;
        for (const candidate of mainCandidates) {
          if (this.markThemeHostElement(candidate, "data-gh-theme-host-main")) {
            mainHost = candidate;
            break;
          }
        }
        const chatListSelectors = [
          'main [data-testid*="conversation"]',
          'main [class*="conversation"]',
          "main [data-message-author-role]",
          '[role="main"] [data-message-author-role]',
          '[role="main"] [class*="overflow-y-auto"]'
        ];
        let chatListHost = null;
        for (const selector of chatListSelectors) {
          const hit = document.querySelector(selector);
          if (!hit) continue;
          const container = hit.closest('[class*="overflow"], [class*="conversation"], section, article, main') || hit;
          if (this.markThemeHostElement(container, "data-gh-theme-host-chat-list")) {
            chatListHost = container;
            break;
          }
        }
        if (!chatListHost && mainHost) {
          this.markThemeHostElement(mainHost, "data-gh-theme-host-chat-list");
        }
        const composerInput = this.adapter?.textarea || document.querySelector("#prompt-textarea") || document.querySelector('textarea[placeholder*="Message"]') || document.querySelector('textarea[placeholder*="消息"]') || document.querySelector('div[contenteditable="true"][role="textbox"]') || document.querySelector('div[contenteditable="true"]');
        const findComposerSurface = (input) => {
          if (!(input instanceof HTMLElement)) return null;
          let current = input;
          let depth = 0;
          while (current && current !== document.body && current !== document.documentElement && depth < 8) {
            const rect = current.getBoundingClientRect();
            const className = getElementClassName(current);
            const hasSurfaceSignal = /bg-token|composer|rounded|superellipse|border|shadow/i.test(className) || (current.getAttribute("data-testid") || "").toLowerCase().includes("composer");
            const hasReasonableSize = rect.width >= 260 && rect.height >= 40 && rect.height <= Math.max(280, Math.floor(window.innerHeight * 0.3));
            if (hasSurfaceSignal && hasReasonableSize) {
              return current;
            }
            current = current.parentElement;
            depth += 1;
          }
          return input.closest('[data-testid*="composer"]') || input.closest('[class*="composer"]') || input.parentElement;
        };
        const composerHost = composerInput ? composerInput.closest("form") || composerInput.closest('[data-testid*="composer"]') || composerInput.closest('[class*="composer"]') || composerInput.closest('[class*="footer"]') || composerInput.parentElement : document.querySelector('[data-testid*="composer"]') || document.querySelector("main form") || document.querySelector('[role="main"] form');
        const composerSurface = composerInput ? findComposerSurface(composerInput) : document.querySelector('[data-testid*="composer"] [class*="bg-token"]') || document.querySelector('[data-testid*="composer"] [class*="rounded"]') || composerHost;
        this.markThemeHostElement(composerHost, "data-gh-theme-host-composer");
        this.markThemeHostElement(composerSurface || composerHost, "data-gh-theme-host-composer-surface");
      },
      queueThemeHostRefresh() {
        if (this.themeHostRefreshQueued) return;
        this.themeHostRefreshQueued = true;
        const flush = () => {
          this.themeHostRefreshQueued = false;
          this.refreshThemeHostTargets();
        };
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(flush);
        } else {
          setTimeout(flush, 16);
        }
      },
      ensureThemeRuntimeStyle() {
        if (this.themeRuntimeStyleReady) return;
        let style = document.getElementById("chatgpt-helper-theme-runtime-style");
        if (!style) {
          style = document.createElement("style");
          style.id = "chatgpt-helper-theme-runtime-style";
          style.textContent = `
                :root {
                    --gh-bg-image: none;
                    --gh-bg-blur: 5px;
                    --gh-sidebar-enhance-alpha: 0.2;
                    --gh-bg-overlay-light: rgba(12, 18, 32, 0.18);
                    --gh-bg-overlay-dark: rgba(2, 6, 23, 0.48);
                    --gh-panel-blur: 14px;
                    --gh-composer-blur: 16px;
                    --gh-page-sidebar-bg-light: linear-gradient(180deg, rgba(255, 255, 255, 0.360), rgba(248, 250, 252, 0.220));
                    --gh-page-chat-bg-light: transparent;
                    --gh-page-composer-bg-light: linear-gradient(135deg, rgba(255, 255, 255, 0.900), rgba(248, 250, 252, 0.800));
                    --gh-page-sidebar-bg-dark: linear-gradient(180deg, rgba(2, 6, 23, 0.360), rgba(2, 6, 23, 0.240));
                    --gh-page-chat-bg-dark: transparent;
                    --gh-page-composer-bg-dark: linear-gradient(135deg, rgba(8, 17, 29, 0.860), rgba(15, 23, 42, 0.760));
                    --gh-page-accent-soft: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 84%);
                    --gh-page-accent-soft-dark: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 74%);
                    --gh-page-accent-strong: var(--gh-theme-accent, #2563eb);
                    --gh-page-link: var(--gh-theme-accent, #2563eb);
                    --gh-page-selection: color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 82%);
                    --gh-right-overlay: linear-gradient(180deg, rgba(255,255,255,0.56), rgba(248,250,252,0.42));
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
                    box-shadow: var(--gh-shadow), inset 0 0 0 1px var(--gh-panel-card-border);
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
                    --sidebar-mask-bg: transparent;
                    --sidebar-surface-primary: transparent;
                    --sidebar-surface-secondary: transparent;
                    --sidebar-surface-tertiary: transparent;
                    --bg-elevated-secondary: transparent;
                    background: var(--gh-page-sidebar-bg-light) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] #stage-slideover-sidebar,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-testid="sidebar"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] [data-gh-theme-host-sidebar-shell="true"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="Chat history"],
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"][data-gh-mode="dark"] aside[aria-label*="聊天历史"] {
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
                    box-shadow: var(--gh-shadow), inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-content {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="false"][data-gh-page-theme="true"] .outline-fixed-toolbar {
                    background: color-mix(in srgb, var(--gh-bg-secondary), transparent 2%) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
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
                    background: transparent !important;
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
                    background: transparent !important;
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
                :root[data-gh-page-theme="true"] [role="main"],
                :root[data-gh-page-theme="true"] header,
                :root[data-gh-page-theme="true"] [role="banner"] {
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
        let layer = document.getElementById("chatgpt-helper-theme-bg-layer");
        if (!layer) {
          layer = document.createElement("div");
          layer.id = "chatgpt-helper-theme-bg-layer";
          layer.setAttribute("aria-hidden", "true");
          document.body.prepend(layer);
        }
        return layer;
      },
      sanitizeCssUrl(url) {
        if (!url) return "none";
        const escaped = String(url).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return `url("${escaped}")`;
      },
      revokeThemeBackgroundObjectUrl() {
        if (!this.themeBackgroundObjectUrl) return;
        try {
          URL.revokeObjectURL(this.themeBackgroundObjectUrl);
        } catch (e) {
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
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          this.saveSettings();
        }
        this.updateThemeVisualState();
      },
      syncThemeSurfaceVariables(canRenderBackground) {
        const root2 = document.documentElement;
        const isDark = this.detectEffectiveThemeFromDom() === "dark";
        const cfg = this.getThemeConfig();
        const preset = getThemePresetByKey(cfg.presetKey);
        const surfaceVars = buildThemeSurfaceVars(preset, {
          isDark,
          canRenderBackground,
          messageIntensity: cfg.messageGlassIntensity,
          panelIntensity: cfg.panelGlassIntensity
        });
        Object.entries(surfaceVars).forEach(([key, value]) => {
          root2.style.setProperty(key, value);
        });
      },
      updateThemeVisualState() {
        this.ensureThemeRuntimeStyle();
        const cfg = this.getThemeConfig();
        const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl);
        const root2 = document.documentElement;
        this.syncHelperThemeMode(this.detectEffectiveThemeFromDom());
        this.refreshThemeHostTargets();
        root2.setAttribute("data-gh-theme-active", "true");
        root2.setAttribute("data-gh-theme-preset", cfg.presetKey || DEFAULT_THEME_CONFIG.presetKey);
        root2.setAttribute("data-gh-page-theme", "true");
        root2.setAttribute("data-gh-bg-enabled", canRenderBackground ? "true" : "false");
        root2.setAttribute("data-gh-msg-glass", cfg.messageGlassEnabled ? "true" : "false");
        root2.setAttribute("data-gh-sidebar-enhance", cfg.sidebarTextEnhanceEnabled ? "true" : "false");
        root2.style.setProperty("--gh-bg-image", this.sanitizeCssUrl(this.themeBackgroundObjectUrl));
        root2.style.setProperty("--gh-bg-blur", `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`);
        root2.style.setProperty("--gh-sidebar-enhance-alpha", (clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100).toFixed(2));
        this.syncThemeSurfaceVariables(canRenderBackground);
        const layer = this.ensureThemeBackgroundLayer();
        layer.style.display = canRenderBackground ? "block" : "none";
        layer.style.backgroundImage = this.sanitizeCssUrl(this.themeBackgroundObjectUrl);
        if (this.themeModalRefs) {
          this.updateThemePreviewCard();
        }
      },
      validateThemeBackgroundFile(file) {
        if (!file || !(file instanceof File)) {
          throw new Error(this.t("themeImageLoadFailed"));
        }
        if (!THEME_BACKGROUND_ALLOWED_TYPES.includes(file.type)) {
          throw new Error(this.t("themeInvalidType"));
        }
        if (file.size > THEME_BACKGROUND_MAX_SIZE) {
          throw new Error(this.t("themeFileTooLarge"));
        }
      },
      async uploadThemeBackgroundFile(file) {
        this.validateThemeBackgroundFile(file);
        const cfg = this.getThemeConfig();
        const oldAssetId = cfg.backgroundAssetId;
        const row = await this.themeAssetRepository.putAsset(file, file.type);
        cfg.backgroundAssetId = row.id;
        cfg.backgroundImageEnabled = true;
        cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        this.saveSettings();
        await this.refreshThemeBackgroundState();
        if (oldAssetId && oldAssetId !== row.id) {
          await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => void 0);
        }
        if (this.themeModalRefs) {
          this.syncThemeModalState();
        }
        this.showToast(this.t("themeUploadSuccess"));
      },
      async removeThemeBackgroundFile() {
        const cfg = this.getThemeConfig();
        const oldAssetId = cfg.backgroundAssetId;
        cfg.backgroundImageEnabled = false;
        cfg.backgroundAssetId = null;
        cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        this.saveSettings();
        this.revokeThemeBackgroundObjectUrl();
        this.updateThemeVisualState();
        if (oldAssetId) {
          await this.themeAssetRepository.deleteAsset(oldAssetId).catch(() => void 0);
        }
        if (this.themeModalRefs) {
          this.syncThemeModalState();
        }
        this.showToast(this.t("themeBackgroundRemoved"));
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
        refs.appearanceButtons.system.classList.toggle("active", cfg.appearanceMode === "system");
        refs.appearanceButtons.light.classList.toggle("active", cfg.appearanceMode === "light");
        refs.appearanceButtons.dark.classList.toggle("active", cfg.appearanceMode === "dark");
        refs.presetButtons.forEach((btn) => {
          const isActive = btn.dataset.presetKey === cfg.presetKey;
          btn.classList.toggle("active", isActive);
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
        refs.uploadDrop.classList.toggle("has-image", canRenderBackground);
        refs.uploadBg.style.backgroundImage = canRenderBackground ? this.sanitizeCssUrl(this.themeBackgroundObjectUrl) : "none";
        this.updateThemePreviewCard();
      },
      updateThemePreviewCard() {
        if (!this.themeModalRefs) return;
        const refs = this.themeModalRefs;
        const cfg = this.getThemeConfig();
        const canRenderBackground = Boolean(cfg.backgroundImageEnabled && this.themeBackgroundObjectUrl);
        const isDark = this.currentEffectiveTheme === "dark";
        const preset = getThemePresetByKey(cfg.presetKey);
        const previewVars = buildThemeSurfaceVars(preset, {
          isDark,
          canRenderBackground,
          messageIntensity: cfg.messageGlassIntensity,
          panelIntensity: cfg.panelGlassIntensity
        });
        const previewNavBg = canRenderBackground ? isDark ? previewVars["--gh-page-sidebar-bg-dark"] : previewVars["--gh-page-sidebar-bg-light"] : isDark ? previewVars["--gh-page-sidebar-bg-dark"] : previewVars["--gh-page-sidebar-bg-light"];
        const previewInputBg = canRenderBackground ? isDark ? previewVars["--gh-page-composer-bg-dark"] : previewVars["--gh-page-composer-bg-light"] : isDark ? previewVars["--gh-page-composer-bg-dark"] : previewVars["--gh-page-composer-bg-light"];
        const previewChatBg = "transparent";
        const previewMessageUserBg = previewVars["--gh-msg-user-bg"];
        const previewAssistantBubble = canRenderBackground && cfg.messageGlassEnabled;
        const previewMessageAssistantBg = previewAssistantBubble ? previewVars["--gh-msg-assistant-bg"] : "transparent";
        const previewBorder = previewVars ? previewVars["--gh-panel-card-border"] : isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.32)";
        const previewMessageBorder = previewVars ? previewVars["--gh-msg-border"] : previewBorder;
        refs.preview.classList.toggle("has-bg", canRenderBackground);
        refs.previewBg.style.backgroundImage = canRenderBackground ? this.sanitizeCssUrl(this.themeBackgroundObjectUrl) : "none";
        refs.preview.style.setProperty("--gh-preview-blur", `${Math.round(clampNumber(cfg.backgroundBlurPx, 0, 20))}px`);
        refs.previewNav.style.background = previewNavBg;
        refs.previewNav.style.border = `1px solid ${previewBorder}`;
        refs.previewNav.style.boxShadow = cfg.sidebarTextEnhanceEnabled && !isDark && canRenderBackground ? `inset 0 0 0 9999px rgba(255,255,255,${(clampNumber(cfg.sidebarTextEnhanceIntensity, 0, 100) / 100).toFixed(2)}), inset 0 0 0 1px ${previewBorder}` : `inset 0 0 0 1px ${previewBorder}`;
        refs.previewNav.style.backdropFilter = canRenderBackground && previewVars ? `blur(${previewVars["--gh-panel-blur"]})` : "none";
        refs.previewChat.style.background = previewChatBg;
        refs.previewChat.style.border = "1px solid transparent";
        refs.previewUserMsg.style.background = previewMessageUserBg;
        refs.previewAssistantMsg.style.background = previewMessageAssistantBg;
        refs.previewUserMsg.style.border = `1px solid ${previewMessageBorder}`;
        refs.previewAssistantMsg.style.border = previewAssistantBubble ? `1px solid ${previewMessageBorder}` : "1px solid transparent";
        refs.previewUserMsg.style.padding = canRenderBackground ? cfg.messageGlassEnabled ? "10px 12px" : "8px 10px" : "10px 12px";
        refs.previewAssistantMsg.style.padding = previewAssistantBubble ? "14px 18px" : "0";
        refs.previewUserMsg.style.borderRadius = canRenderBackground ? cfg.messageGlassEnabled ? "24px" : "18px" : "20px";
        refs.previewAssistantMsg.style.borderRadius = previewAssistantBubble ? "28px" : "0";
        refs.previewAssistantMsg.style.backdropFilter = previewAssistantBubble ? `blur(${previewVars["--gh-msg-blur"]})` : "none";
        refs.previewUserMsg.style.backdropFilter = cfg.messageGlassEnabled || !canRenderBackground ? canRenderBackground && previewVars ? `blur(${previewVars["--gh-msg-blur"]})` : "none" : "none";
        refs.previewAssistantMsg.style.boxShadow = previewAssistantBubble ? `inset 0 0 0 1px ${previewMessageBorder}` : "none";
        refs.previewAssistantMsg.style.color = "";
        refs.previewInput.style.background = previewInputBg;
        refs.previewInput.style.border = `1px solid ${previewMessageBorder}`;
        refs.previewInput.style.backdropFilter = canRenderBackground && previewVars ? `blur(${previewVars["--gh-composer-blur"]})` : "none";
        refs.previewInput.style.boxShadow = canRenderBackground && previewVars ? `inset 0 0 0 1px ${previewMessageBorder}` : "none";
      },
      openAboutModal() {
        if (this.aboutModal && this.aboutModal.isConnected) {
          requestAnimationFrame(() => this.aboutModal.classList.add("open"));
          return;
        }
        const manifest = getExtensionManifestMeta() || {};
        const productName = manifest.name || "ChatGPT Helper";
        const version = manifest.version || "2.1.0";
        const author = typeof manifest.author === "string" ? manifest.author : manifest.author && typeof manifest.author.name === "string" ? manifest.author.name : "zhiwuyazhe_fjr";
        const overlay = createElement("div", { id: "chatgpt-helper-about-modal" });
        const dialog = createElement("div", { className: "chatgpt-helper-about-dialog" });
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-label", this.t("aboutDialogTitle") || "About ChatGPT Helper");
        const header = createElement("div", { className: "chatgpt-helper-about-header" });
        const titleWrap = createElement("div", { className: "chatgpt-helper-about-title-wrap" });
        titleWrap.appendChild(createHelperLogoNode({
          size: 64,
          className: "chatgpt-helper-about-logo",
          title: productName
        }));
        const titleText = createElement("div", { className: "chatgpt-helper-about-title-text" });
        const nameRow = createElement("div", { className: "chatgpt-helper-about-name-row" });
        nameRow.appendChild(createElement("div", { className: "chatgpt-helper-about-name" }, productName));
        nameRow.appendChild(createElement("div", { className: "chatgpt-helper-about-badge" }, `v${version}`));
        titleText.appendChild(nameRow);
        titleText.appendChild(createElement("div", { className: "chatgpt-helper-about-tagline" }, this.t("aboutTagline") || "A focused productivity layer designed for heavy ChatGPT users"));
        titleWrap.appendChild(titleText);
        const closeBtn = createElement("button", {
          className: "chatgpt-helper-about-close",
          type: "button",
          title: this.t("aboutClose") || "Close"
        }, "×");
        header.appendChild(titleWrap);
        header.appendChild(closeBtn);
        const body = createElement("div", { className: "chatgpt-helper-about-body" });
        const shell = createElement("div", { className: "chatgpt-helper-about-shell" });
        const createSection = (title, options = {}) => {
          const section = createElement("section", {
            className: `chatgpt-helper-about-section${options.soft ? " soft" : ""}${options.tight ? " tight" : ""}`
          });
          section.appendChild(createElement("div", { className: "chatgpt-helper-about-section-title" }, title));
          if (options.text) {
            section.appendChild(createElement("div", { className: "chatgpt-helper-about-section-text" }, options.text));
          }
          if (options.bodyNode) {
            section.appendChild(options.bodyNode);
          }
          if (options.actions && options.actions.children.length) {
            section.appendChild(options.actions);
          }
          return section;
        };
        const createActionRow = () => createElement("div", { className: "chatgpt-helper-about-actions" });
        const createActionButton = (label, options = {}) => {
          const button = createElement("button", {
            className: `chatgpt-helper-about-link-btn ${options.variant || "ghost"}${options.disabled ? " disabled" : ""}`,
            type: "button",
            disabled: !!options.disabled,
            title: options.title || ""
          }, label);
          if (options.onClick && !options.disabled) {
            button.addEventListener("click", options.onClick);
          }
          return button;
        };
        const motivationSection = createSection(
          this.t("aboutMotivationTitle") || "😘 Motivation",
          {
            text: this.t("aboutMotivationContent") || "This is more than just an extension."
          }
        );
        const feedbackActions = createActionRow();
        feedbackActions.appendChild(createActionButton(
          this.t("aboutFeatureRequest") || "Feature Request",
          {
            variant: "ghost",
            disabled: !FEATURE_REQUEST_URL,
            title: FEATURE_REQUEST_URL ? "" : this.t("disabled") || "Disabled"
          }
        ));
        feedbackActions.appendChild(createActionButton(
          this.t("aboutBugSupport") || "Bug Report / Support",
          {
            variant: "ghost",
            onClick: () => openExternalLink(ISSUE_URL)
          }
        ));
        const feedbackSection = createSection(
          this.t("aboutFeedbackTitle") || "💬 Feedback",
          { actions: feedbackActions, tight: true }
        );
        const openSourceInfo = createElement("div", { className: "chatgpt-helper-about-inline-meta" });
        openSourceInfo.appendChild(createElement("span", { className: "chatgpt-helper-about-inline-label" }, `${this.t("aboutRepoLabel") || "Repository"}:`));
        openSourceInfo.appendChild(createElement("span", { className: "chatgpt-helper-about-inline-value" }, REPO_URL.replace(/^https?:\/\//, "")));
        const openSourceActions = createActionRow();
        openSourceActions.appendChild(createActionButton(
          this.t("aboutRepoButton") || "GitHub Repository",
          {
            variant: "ghost",
            onClick: () => openExternalLink(REPO_URL)
          }
        ));
        const openSourceSection = createSection(
          this.t("aboutOpenSourceTitle") || "🌱 Open Source",
          {
            bodyNode: openSourceInfo,
            actions: openSourceActions,
            tight: true
          }
        );
        const supportActions = createActionRow();
        supportActions.appendChild(createActionButton(
          this.t("aboutShare") || "Share with Friends",
          {
            variant: "soft",
            onClick: async () => {
              const copied = await copyTextToClipboard(REPO_URL);
              this.showToast(copied ? this.t("aboutCopyRepoSuccess") || "Repository link copied" : this.t("aboutCopyRepoFailed") || "Copy failed");
            }
          }
        ));
        const supportSection = createSection(
          this.t("aboutSupportTitle") || "💕 Support the Project",
          {
            text: this.t("aboutSupportContent") || "Every bit of recognition is fuel for the next line of code.",
            actions: supportActions
          }
        );
        const authorBody = createElement("div", { className: "chatgpt-helper-about-author-block" });
        authorBody.appendChild(createElement("div", { className: "chatgpt-helper-about-author-name" }, author || "zhiwuyazhe_fjr"));
        authorBody.appendChild(createElement("div", { className: "chatgpt-helper-about-section-text chatgpt-helper-about-author-bio" }, this.t("aboutAuthorBio") || "Author bio coming soon"));
        const authorActions = createActionRow();
        authorActions.appendChild(createActionButton(
          this.t("aboutAuthorGithub") || "Author GitHub",
          {
            variant: "ghost",
            onClick: () => openExternalLink(AUTHOR_GITHUB_URL)
          }
        ));
        const authorSection = createSection(
          this.t("aboutAuthorTitle") || "👨‍💻 About the Author",
          {
            bodyNode: authorBody,
            actions: authorActions,
            tight: true
          }
        );
        shell.appendChild(motivationSection);
        shell.appendChild(feedbackSection);
        shell.appendChild(openSourceSection);
        shell.appendChild(supportSection);
        shell.appendChild(authorSection);
        body.appendChild(shell);
        const footer = createElement("div", { className: "chatgpt-helper-about-footer" });
        footer.appendChild(createElement("div", { className: "chatgpt-helper-about-footer-note" }, this.t("aboutFooterNote") || "Works on chatgpt.com, chat.openai.com, and new.oaifree.com · Local-first, no conversation uploads"));
        footer.appendChild(createElement("div", { className: "chatgpt-helper-about-footer-text" }, this.t("aboutPoweredBy") || "Built for focused ChatGPT workflows"));
        dialog.appendChild(header);
        dialog.appendChild(body);
        dialog.appendChild(footer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        const closeModal = () => this.closeAboutModal();
        closeBtn.addEventListener("click", closeModal);
        this.aboutModalBackdropHandler = (event) => {
          if (event.target === overlay) {
            closeModal();
          }
        };
        overlay.addEventListener("click", this.aboutModalBackdropHandler);
        this.aboutModalEscHandler = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeModal();
          }
        };
        document.addEventListener("keydown", this.aboutModalEscHandler, true);
        this.aboutModal = overlay;
        requestAnimationFrame(() => overlay.classList.add("open"));
      },
      closeAboutModal() {
        if (!this.aboutModal) return;
        this.aboutModal.classList.remove("open");
        const modalToRemove = this.aboutModal;
        setTimeout(() => {
          if (modalToRemove && modalToRemove.parentNode) {
            modalToRemove.parentNode.removeChild(modalToRemove);
          }
        }, 200);
        if (this.aboutModalBackdropHandler) {
          this.aboutModal.removeEventListener("click", this.aboutModalBackdropHandler);
        }
        if (this.aboutModalEscHandler) {
          document.removeEventListener("keydown", this.aboutModalEscHandler, true);
        }
        this.aboutModal = null;
        this.aboutModalBackdropHandler = null;
        this.aboutModalEscHandler = null;
      },
      openThemeSettingsModal() {
        if (this.themeModal && this.themeModal.isConnected) {
          this.syncThemeModalState();
          requestAnimationFrame(() => this.themeModal.classList.add("open"));
          return;
        }
        const overlay = createElement("div", { id: "chatgpt-helper-theme-modal" });
        const dialog = createElement("div", { className: "chatgpt-helper-theme-modal-dialog" });
        const header = createElement("div", { className: "chatgpt-helper-theme-modal-header" });
        const headerTitle = createElement("div", { className: "chatgpt-helper-theme-modal-title" });
        headerTitle.appendChild(createSvgIconNode("settings", {
          size: 16,
          className: "chatgpt-helper-theme-modal-title-icon"
        }));
        headerTitle.appendChild(createElement("span", {}, this.t("themeDialogTitle") || "Theme"));
        header.appendChild(headerTitle);
        const closeBtn = createElement("button", {
          className: "chatgpt-helper-theme-modal-close",
          type: "button",
          title: "Close"
        });
        closeBtn.appendChild(createSvgIconNode("close", { size: 16 }));
        header.appendChild(closeBtn);
        const body = createElement("div", { className: "chatgpt-helper-theme-modal-body" });
        const main = createElement("div", { className: "chatgpt-helper-theme-main chatgpt-helper-theme-workbench-settings" });
        const side = createElement("div", { className: "chatgpt-helper-theme-side chatgpt-helper-theme-workbench-preview" });
        const appearanceBlock = createElement("div", { className: "chatgpt-helper-theme-block theme-appearance-block" });
        appearanceBlock.appendChild(createElement("div", { className: "chatgpt-helper-theme-block-title" }, this.t("themeAppearance") || "Appearance"));
        const appearanceSegment = createElement("div", { className: "chatgpt-helper-theme-segment" });
        const appearanceButtons = {
          system: createElement("button", { type: "button" }, this.t("themeAppearanceSystem") || "System"),
          light: createElement("button", { type: "button" }, this.t("themeAppearanceLight") || "Light"),
          dark: createElement("button", { type: "button" }, this.t("themeAppearanceDark") || "Dark")
        };
        appearanceSegment.appendChild(appearanceButtons.system);
        appearanceSegment.appendChild(appearanceButtons.light);
        appearanceSegment.appendChild(appearanceButtons.dark);
        appearanceBlock.appendChild(appearanceSegment);
        const colorsBlock = createElement("div", { className: "chatgpt-helper-theme-block theme-colors-block" });
        colorsBlock.appendChild(createElement("div", { className: "chatgpt-helper-theme-block-title" }, this.t("themeColorPresets") || "Colors"));
        const presetGrid = createElement("div", { className: "chatgpt-helper-theme-preset-grid" });
        const presetButtons = [];
        THEME_PRESETS.forEach((preset) => {
          const presetBtn = createElement("button", {
            className: "chatgpt-helper-theme-preset",
            type: "button",
            title: preset.labelKey ? this.t(preset.labelKey) : preset.key,
            "data-preset-key": preset.key
          });
          if (preset.isOriginal) {
            presetBtn.classList.add("is-original");
            presetBtn.textContent = this.t(preset.labelKey) || "Original";
          } else {
            presetBtn.style.background = preset.primary;
            presetBtn.style.color = preset.primary;
          }
          presetGrid.appendChild(presetBtn);
          presetButtons.push(presetBtn);
        });
        colorsBlock.appendChild(presetGrid);
        const wallpaperBlock = createElement("div", { className: "chatgpt-helper-theme-block theme-wallpaper-block" });
        wallpaperBlock.appendChild(createElement("div", { className: "chatgpt-helper-theme-block-title" }, this.t("themeWallpaper") || "Wallpaper"));
        const wallpaperEnableRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        wallpaperEnableRow.appendChild(createElement("span", {}, this.t("themeEnableWallpaper") || "Enable Wallpaper"));
        const wallpaperEnable = createElement("input", { type: "checkbox" });
        wallpaperEnableRow.appendChild(wallpaperEnable);
        wallpaperBlock.appendChild(wallpaperEnableRow);
        const uploadDrop = createElement("div", { className: "chatgpt-helper-theme-upload" });
        const uploadBg = createElement("div", { className: "chatgpt-helper-theme-upload-bg" });
        const uploadContent = createElement("div", { className: "chatgpt-helper-theme-upload-content" });
        uploadContent.appendChild(createSvgIconNode("image", {
          size: 20,
          className: "chatgpt-helper-theme-upload-icon"
        }));
        uploadContent.appendChild(createElement("div", {
          className: "chatgpt-helper-theme-upload-title"
        }, this.t("themeDropImage") || "Drop image here"));
        uploadContent.appendChild(createElement("div", {
          className: "chatgpt-helper-theme-upload-hint"
        }, this.t("themeFileTypes") || "PNG/JPG/WebP up to 5MB"));
        const uploadButtons = createElement("div", { className: "chatgpt-helper-theme-upload-actions" });
        const selectFileBtn = createElement("button", {
          className: "chatgpt-helper-theme-launch-btn",
          type: "button"
        }, this.t("themeSelectFile") || "Select File");
        const removeFileBtn = createElement("button", {
          className: "chatgpt-helper-theme-launch-btn",
          type: "button"
        }, this.t("themeRemoveImage") || "Remove");
        uploadButtons.appendChild(selectFileBtn);
        uploadButtons.appendChild(removeFileBtn);
        uploadContent.appendChild(uploadButtons);
        uploadDrop.appendChild(uploadBg);
        uploadDrop.appendChild(uploadContent);
        wallpaperBlock.appendChild(uploadDrop);
        const fileInput = createElement("input", {
          type: "file",
          accept: "image/png,image/jpeg,image/webp",
          style: { display: "none" }
        });
        wallpaperBlock.appendChild(fileInput);
        const blurRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        blurRow.appendChild(createElement("span", {}, this.t("themeBlur") || "Blur"));
        const blurControls = createElement("div", { className: "chatgpt-helper-theme-range-control" });
        const blurRange = createElement("input", {
          type: "range",
          min: 0,
          max: 20,
          step: 1
        });
        const blurValue = createElement("span", { className: "chatgpt-helper-theme-value" }, "5px");
        blurControls.appendChild(blurRange);
        blurControls.appendChild(blurValue);
        blurRow.appendChild(blurControls);
        wallpaperBlock.appendChild(blurRow);
        const messageGlassRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        messageGlassRow.appendChild(createElement("span", {}, this.t("themeMessageGlass") || "Message Glass Effect"));
        const messageGlass = createElement("input", { type: "checkbox" });
        messageGlassRow.appendChild(messageGlass);
        wallpaperBlock.appendChild(messageGlassRow);
        const messageGlassIntensityRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        messageGlassIntensityRow.appendChild(createElement("span", {}, this.t("themeMessageGlassIntensity") || "Message Glass Intensity"));
        const messageGlassIntensityControls = createElement("div", { className: "chatgpt-helper-theme-range-control" });
        const messageGlassIntensityRange = createElement("input", {
          type: "range",
          min: 0,
          max: 100,
          step: 1
        });
        const messageGlassIntensityValue = createElement("span", { className: "chatgpt-helper-theme-value" }, "60%");
        messageGlassIntensityControls.appendChild(messageGlassIntensityRange);
        messageGlassIntensityControls.appendChild(messageGlassIntensityValue);
        messageGlassIntensityRow.appendChild(messageGlassIntensityControls);
        wallpaperBlock.appendChild(messageGlassIntensityRow);
        const panelGlassIntensityRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        panelGlassIntensityRow.appendChild(createElement("span", {}, this.t("themePanelGlassIntensity") || "Side Panel Glass Intensity"));
        const panelGlassIntensityControls = createElement("div", { className: "chatgpt-helper-theme-range-control" });
        const panelGlassIntensityRange = createElement("input", {
          type: "range",
          min: 0,
          max: 100,
          step: 1
        });
        const panelGlassIntensityValue = createElement("span", { className: "chatgpt-helper-theme-value" }, "45%");
        panelGlassIntensityControls.appendChild(panelGlassIntensityRange);
        panelGlassIntensityControls.appendChild(panelGlassIntensityValue);
        panelGlassIntensityRow.appendChild(panelGlassIntensityControls);
        wallpaperBlock.appendChild(panelGlassIntensityRow);
        const sidebarEnhanceRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        sidebarEnhanceRow.appendChild(createElement("span", {}, this.t("themeSidebarEnhance") || "Sidebar Text Enhance"));
        const sidebarEnhance = createElement("input", { type: "checkbox" });
        sidebarEnhanceRow.appendChild(sidebarEnhance);
        wallpaperBlock.appendChild(sidebarEnhanceRow);
        const sidebarEnhanceIntensityRow = createElement("div", { className: "chatgpt-helper-theme-row" });
        sidebarEnhanceIntensityRow.appendChild(createElement("span", {}, this.t("themeSidebarEnhanceIntensity") || "Enhance Intensity"));
        const sidebarEnhanceControls = createElement("div", { className: "chatgpt-helper-theme-range-control" });
        const sidebarEnhanceRange = createElement("input", {
          type: "range",
          min: 0,
          max: 100,
          step: 1
        });
        const sidebarEnhanceValue = createElement("span", { className: "chatgpt-helper-theme-value" }, "20%");
        sidebarEnhanceControls.appendChild(sidebarEnhanceRange);
        sidebarEnhanceControls.appendChild(sidebarEnhanceValue);
        sidebarEnhanceIntensityRow.appendChild(sidebarEnhanceControls);
        wallpaperBlock.appendChild(sidebarEnhanceIntensityRow);
        main.appendChild(appearanceBlock);
        main.appendChild(colorsBlock);
        main.appendChild(wallpaperBlock);
        side.appendChild(createElement("div", { className: "chatgpt-helper-theme-block-title" }, this.t("themeLivePreview") || "Live Preview"));
        const preview = createElement("div", { className: "chatgpt-helper-theme-preview" });
        const previewBg = createElement("div", { className: "chatgpt-helper-theme-preview-bg" });
        const previewInner = createElement("div", { className: "chatgpt-helper-theme-preview-inner" });
        const previewNav = createElement("div", { className: "chatgpt-helper-theme-preview-nav" });
        for (let i = 0; i < 5; i++) {
          const item = createElement("div", {
            style: {
              height: "20px",
              marginBottom: "10px",
              borderRadius: "999px",
              background: i === 2 ? "color-mix(in srgb, var(--gh-primary), transparent 30%)" : "color-mix(in srgb, var(--gh-text-secondary, #9ca3af), transparent 75%)"
            }
          });
          previewNav.appendChild(item);
        }
        const previewChat = createElement("div", { className: "chatgpt-helper-theme-preview-chat" });
        const previewUserMsg = createElement("div", { className: "chatgpt-helper-theme-preview-msg user" }, "Summarize recent updates.");
        const previewAssistantMsg = createElement("div", { className: "chatgpt-helper-theme-preview-msg assistant" }, "Theme engine, wallpaper controls, and live preview are now enabled.");
        const previewInput = createElement("div", { className: "chatgpt-helper-theme-preview-input" });
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
            console.error("[ChatGPT Helper] applyAppearanceMode 失败:", error);
            this.showToast(this.t("themeSwitchFailed"));
          });
        };
        appearanceButtons.system.addEventListener("click", () => onAppearanceChange("system"));
        appearanceButtons.light.addEventListener("click", () => onAppearanceChange("light"));
        appearanceButtons.dark.addEventListener("click", () => onAppearanceChange("dark"));
        presetButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const key = btn.dataset.presetKey;
            this.applyThemePresetVariables(key, true);
            this.updateThemeVisualState();
          });
        });
        wallpaperEnable.addEventListener("change", () => {
          const cfg = this.getThemeConfig();
          if (!cfg.backgroundAssetId && wallpaperEnable.checked) {
            wallpaperEnable.checked = false;
            this.showToast(this.t("themeNoBackground"));
            return;
          }
          cfg.backgroundImageEnabled = Boolean(wallpaperEnable.checked && cfg.backgroundAssetId);
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          this.saveSettings();
          void this.refreshThemeBackgroundState();
        });
        blurRange.addEventListener("input", () => {
          const cfg = this.getThemeConfig();
          cfg.backgroundBlurPx = Math.round(clampNumber(blurRange.value, 0, 20));
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          blurValue.textContent = `${cfg.backgroundBlurPx}px`;
          this.saveSettings();
          this.updateThemeVisualState();
        });
        messageGlass.addEventListener("change", () => {
          const cfg = this.getThemeConfig();
          cfg.messageGlassEnabled = Boolean(messageGlass.checked);
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          this.saveSettings();
          this.updateThemeVisualState();
          this.syncThemeModalState();
        });
        messageGlassIntensityRange.addEventListener("input", () => {
          const cfg = this.getThemeConfig();
          cfg.messageGlassIntensity = Math.round(clampNumber(messageGlassIntensityRange.value, 0, 100));
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          messageGlassIntensityValue.textContent = `${cfg.messageGlassIntensity}%`;
          this.saveSettings();
          this.updateThemeVisualState();
        });
        panelGlassIntensityRange.addEventListener("input", () => {
          const cfg = this.getThemeConfig();
          cfg.panelGlassIntensity = Math.round(clampNumber(panelGlassIntensityRange.value, 0, 100));
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          panelGlassIntensityValue.textContent = `${cfg.panelGlassIntensity}%`;
          this.saveSettings();
          this.updateThemeVisualState();
        });
        sidebarEnhance.addEventListener("change", () => {
          const cfg = this.getThemeConfig();
          cfg.sidebarTextEnhanceEnabled = Boolean(sidebarEnhance.checked);
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          this.saveSettings();
          this.updateThemeVisualState();
          this.syncThemeModalState();
        });
        sidebarEnhanceRange.addEventListener("input", () => {
          const cfg = this.getThemeConfig();
          cfg.sidebarTextEnhanceIntensity = Math.round(clampNumber(sidebarEnhanceRange.value, 0, 100));
          cfg.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          sidebarEnhanceValue.textContent = `${cfg.sidebarTextEnhanceIntensity}%`;
          this.saveSettings();
          this.updateThemeVisualState();
        });
        selectFileBtn.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", () => {
          const file = fileInput.files && fileInput.files[0];
          fileInput.value = "";
          if (!file) return;
          void this.uploadThemeBackgroundFile(file).catch((error) => {
            const message = error && error.message ? error.message : this.t("themeImageLoadFailed");
            this.showToast(message);
          });
        });
        removeFileBtn.addEventListener("click", () => {
          void this.removeThemeBackgroundFile().catch((error) => {
            console.error("[ChatGPT Helper] removeThemeBackgroundFile 失败:", error);
          });
        });
        ["dragenter", "dragover"].forEach((eventName) => {
          uploadDrop.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadDrop.classList.add("dragging");
          });
        });
        ["dragleave", "drop"].forEach((eventName) => {
          uploadDrop.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadDrop.classList.remove("dragging");
          });
        });
        uploadDrop.addEventListener("drop", (e) => {
          const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
          if (!file) return;
          void this.uploadThemeBackgroundFile(file).catch((error) => {
            const message = error && error.message ? error.message : this.t("themeImageLoadFailed");
            this.showToast(message);
          });
        });
        const closeModal = () => this.closeThemeSettingsModal();
        closeBtn.addEventListener("click", closeModal);
        this.themeModalBackdropHandler = (event) => {
          if (event.target === overlay) {
            closeModal();
          }
        };
        overlay.addEventListener("click", this.themeModalBackdropHandler);
        this.themeModalEscHandler = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeModal();
          }
        };
        document.addEventListener("keydown", this.themeModalEscHandler, true);
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
        requestAnimationFrame(() => overlay.classList.add("open"));
      },
      closeThemeSettingsModal() {
        if (!this.themeModal) return;
        this.themeModal.classList.remove("open");
        const modalToRemove = this.themeModal;
        setTimeout(() => {
          if (modalToRemove && modalToRemove.parentNode) {
            modalToRemove.parentNode.removeChild(modalToRemove);
          }
        }, 200);
        if (this.themeModalBackdropHandler) {
          this.themeModal.removeEventListener("click", this.themeModalBackdropHandler);
        }
        if (this.themeModalEscHandler) {
          document.removeEventListener("keydown", this.themeModalEscHandler, true);
        }
        this.themeModal = null;
        this.themeModalRefs = null;
        this.themeModalEscHandler = null;
        this.themeModalBackdropHandler = null;
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Styles module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      createStyles() {
        try {
          const existingStyle = document.getElementById("chatgpt-helper-styles");
          if (existingStyle) {
            try {
              existingStyle.remove();
            } catch (e) {
              console.error("[ChatGPT Helper] 移除旧样式错误:", e);
            }
          }
          const colors = {
            primary: "#64748b",
            secondary: "#94a3b8",
            accent: "#475569",
            light: "#f8fafc"
          };
          const gradient = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
          const style = document.createElement("style");
          style.id = "chatgpt-helper-styles";
          style.textContent = `
                /* CSS Variables */
                :root {
                    --gh-bg: #ffffff;
                    --gh-bg-secondary: #f9fafb;
                    --gh-text: #1f2937;
                    --gh-text-secondary: #6b7280;
                    --gh-border: #e5e7eb;
                    --gh-hover: #f3f4f6;
                    --gh-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    --gh-input-bg: #ffffff;
                    --gh-input-border: #d1d5db;
                    --gh-active-bg: #e5e7eb;
                    --gh-danger: #ef4444;
                    --gh-gradient: ${gradient};
                    --gh-header-bg: ${gradient};
                    --gh-primary: ${colors.primary};
                    --gh-primary-hover: ${colors.accent};
                    --gh-tag-active-bg: ${colors.primary};
                    --gh-success: #10b981;
                    --gh-warning: #f59e0b;
                    --gh-folder-bg-default: #e0f2fe;
                    --gh-folder-bg-expanded: #c7d2fe;
                    --gh-border-active: #6366f1;
                    --gh-checkbox-bg: #4f46e5;
                    --gh-theme-primary: ${colors.primary};
                    --gh-theme-secondary: ${colors.secondary};
                    --gh-theme-accent: ${colors.accent};
                    --gh-theme-accent-dark: ${colors.accent};
                    --gh-theme-light: ${colors.light};
                    /* Outline Highlight Colors (Light Mode) */
                    --gh-outline-locate-bg: rgba(16, 185, 129, 0.25);
                    --gh-outline-locate-border: #10b981;
                    --gh-outline-locate-shadow: rgba(16, 185, 129, 0.5);
                    --gh-outline-sync-bg: rgba(52, 211, 153, 0.10);
                    --gh-outline-sync-border: #34d399;
                    /* Folder Preset Colors */
                    --gh-folder-bg-1: #fdf2f8;
                    --gh-folder-bg-2: #eff6ff;
                    --gh-folder-bg-3: #ecfdf5;
                    --gh-folder-bg-4: #faf5ff;
                    --gh-folder-bg-5: #fefce8;
                    --gh-folder-bg-6: #ecfeff;
                    --gh-folder-bg-7: #fdf4ff;
                }

                :root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {
                    --gh-bg: #1e293b;
                    --gh-bg-secondary: #0f172a;
                    --gh-text: #f1f5f9;
                    --gh-text-secondary: #cbd5e1;
                    --gh-border: #475569;
                    --gh-hover: #334155;
                    --gh-shadow: 0 10px 40px rgba(0,0,0,0.4);
                    --gh-input-bg: #334155;
                    --gh-input-border: #64748b;
                    --gh-active-bg: #3b82f6;
                    --gh-header-bg: linear-gradient(
                        135deg,
                        color-mix(in srgb, var(--gh-theme-primary, #4285f4), #020617 80%),
                        color-mix(in srgb, var(--gh-theme-secondary, #60a5fa), #020617 84%)
                    );
                    --gh-tag-active-bg: rgba(59, 130, 246, 0.3);
                    --gh-primary-hover: var(--gh-theme-accent-dark, #2563eb);
                }

                /* 移除 @media (prefers-color-scheme: dark) 自动应用，只通过 body[data-gh-mode="dark"] 控制 */
                /* 三栏布局容器 */
                #chatgpt-helper-layout {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    position: relative;
                }

                /* 左栏：ChatGPT 侧边栏 */
                #chatgpt-helper-left {
                    flex-shrink: 0;
                    transition: width 0.3s ease;
                }

                /* 中栏：对话区域 */
                #chatgpt-helper-center {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    transition: margin-right 0.3s ease;
                }

                /* 右栏：核心功能区 */
                #chatgpt-helper-right {
                    position: fixed;
                    right: 0;
                    top: 0;
                    width: ${this.settings.panelWidth}px;
                    height: 100vh;
                    background: var(--gh-bg, #ffffff);
                    border-left: none;
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.12), -2px 0 8px rgba(0, 0, 0, 0.06);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
                    overflow: hidden;
                    isolation: isolate;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    border-radius: 0;
                }
                
                /* 拖拽改变宽度时：禁用 transition，避免“动画追赶鼠标”造成卡顿 */
                #chatgpt-helper-right.gh-resizing {
                    transition: none !important;
                    will-change: width;
                }
                
                /* 拖拽时同时禁用主区域 margin-right 的过渡，提升跟手性 */
                body.gh-resizing main,
                body.gh-resizing [role="main"],
                body.gh-resizing #chatgpt-helper-center {
                    transition: none !important;
                }

                /* 右栏宽度拖拽条（稍微偏内侧，方便拖拽） */
                #chatgpt-helper-resize-handle {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 10px;
                    height: 100%;
                    cursor: col-resize;
                    z-index: 10000;
                    background: transparent;
                }

                #chatgpt-helper-resize-handle::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: var(--gh-border, #e5e7eb);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-resize-handle::after {
                    background: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-right {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-content {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] #chatgpt-helper-tabs {
                    background: var(--gh-bg, #ffffff) !important;
                }
                
                body[data-gh-mode="light"] .chatgpt-helper-search-bar {
                    background: var(--gh-bg-secondary, #f9fafb) !important;
                }
                
                body[data-gh-mode="light"] .chatgpt-helper-categories {
                    background: var(--gh-bg, #ffffff) !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-right,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    box-shadow: var(--gh-shadow), inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: transparent !important;
                }

                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-categories {
                    background: var(--gh-panel-card-bg) !important;
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-bg, #1e293b);
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.4), -2px 0 8px rgba(0, 0, 0, 0.2);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    background: var(--gh-header-bg) !important;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-tabs {
                    background: var(--gh-bg, #1e293b);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab {
                    color: var(--gh-text-secondary, #cbd5e1);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-hover, #334155);
                    color: var(--gh-text, #f1f5f9);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    color: var(--gh-text, #f1f5f9);
                }
                
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-bg, #1e293b);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-search-bar {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-categories {
                    background: var(--gh-bg, #1e293b);
                    border-bottom-color: var(--gh-border, #475569);
                }

                #chatgpt-helper-right.collapsed {
                    transform: translateX(100%);
                    width: 0 !important;
                }

                /* 折叠按钮已移除，只保留侧边栏按钮 */

                /* 面板头部 - 渐变背景 */
                #chatgpt-helper-header {
                    /* 允许根据面板宽度动态调整（通过 JS 设置 CSS 变量） */
                    padding: var(--gh-header-padding-v, 12px) var(--gh-header-padding-h, 14px);
                    background: var(--gh-header-bg);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    user-select: none;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
                    border-radius: 0;
                    min-width: 0; /* 允许内部元素正确收缩，避免被挤出裁剪 */
                }

                #chatgpt-helper-title {
                    font-size: 15px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    flex: 1 1 auto; /* 让标题在窄宽时让位给右侧按钮 */
                    min-width: 0;
                }
                
                #chatgpt-helper-title span:last-child {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                #chatgpt-helper-controls {
                    display: flex;
                    gap: var(--gh-header-controls-gap, 4px);
                    align-items: center;
                    flex-shrink: 0; /* 按钮优先保留可见性 */
                }
                
                /* 窄宽紧凑模式：隐藏标题文字 + 缩小按钮/间距，避免按钮被挤出右侧不可见 */
                #chatgpt-helper-header.gh-compact {
                    --gh-header-padding-v: 10px;
                    --gh-header-padding-h: 10px;
                    --gh-header-controls-gap: 2px;
                    --gh-header-btn-size: 24px;
                    --gh-header-btn-font-size: 13px;
                    --gh-header-btn-radius: 6px;
                }
                
                #chatgpt-helper-header.gh-compact #chatgpt-helper-title span:last-child {
                    display: none;
                }

                .chatgpt-helper-header-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: var(--gh-header-btn-size, 28px);
                    height: var(--gh-header-btn-size, 28px);
                    border-radius: var(--gh-header-btn-radius, 6px);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    font-size: var(--gh-header-btn-font-size, 14px);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    min-width: var(--gh-header-btn-size, 28px);
                    padding: 0;
                }

                .chatgpt-helper-header-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.05);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                
                .chatgpt-helper-header-btn:active {
                    transform: scale(0.95);
                }

                /* Tab 导航 */
                #chatgpt-helper-tabs {
                    display: flex;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg, #ffffff);
                    flex-shrink: 0;
                    padding: 0 4px;
                    --tab-padding-h: 12px;
                    --tab-padding-v: 10px;
                    --tab-gap: 6px;
                    --tab-margin: 2px;
                }

                .chatgpt-helper-tab {
                    flex: 1;
                    padding: var(--tab-padding-v) var(--tab-padding-h);
                    text-align: center;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    font-size: 13px;
                    transition: all 0.2s ease;
                    border-bottom: 2px solid transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--tab-gap);
                    border-radius: 6px 6px 0 0;
                    margin: 0 var(--tab-margin);
                    min-width: 0; /* 允许flex项目收缩 */
                }

                .chatgpt-helper-tab:hover {
                    background: var(--gh-hover, #f3f4f6);
                    color: var(--gh-text, #1f2937);
                }

                .chatgpt-helper-tab.active {
                    color: var(--gh-text, #1f2937);
                    border-bottom-color: var(--gh-primary, #10a37f);
                    font-weight: 500;
                    background: var(--gh-bg, #ffffff);
                }

                .chatgpt-helper-tab-drag-handle {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: move;
                    user-select: none;
                    color: var(--gh-text-secondary, #6b7280);
                    font-size: 12px;
                    line-height: 1;
                    padding: 2px 4px;
                    margin-right: 4px;
                    opacity: 0.5;
                    transition: opacity 0.2s;
                    letter-spacing: 0;
                }

                .chatgpt-helper-tab:hover .chatgpt-helper-tab-drag-handle {
                    opacity: 1;
                }

                .chatgpt-helper-tab-drag-handle:hover {
                    opacity: 1;
                    color: var(--gh-primary, #10a37f);
                }

                .chatgpt-helper-tab.dragging {
                    opacity: 0.5;
                }

                .chatgpt-helper-tab.drag-before {
                    border-left: 2px solid var(--gh-primary, #10a37f);
                }

                .chatgpt-helper-tab.drag-after {
                    border-right: 2px solid var(--gh-primary, #10a37f);
                }

                /* 面板内容 */
                #chatgpt-helper-content {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 0;
                    background: var(--gh-bg);
                }

                .chatgpt-helper-content-panel {
                    display: none;
                    flex-direction: column;
                    height: 100%;
                }

                .chatgpt-helper-content-panel.active {
                    display: flex;
                }

                .chatgpt-helper-export-panel.active {
                    flex-direction: column;
                    overflow: hidden;
                }

                /* 搜索栏 */
                .chatgpt-helper-search-bar {
                    padding: 12px;
                    border-bottom: 1px solid var(--gh-border);
                    background: var(--gh-bg-secondary);
                }

                .chatgpt-helper-search-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.2s;
                    box-sizing: border-box;
                    background: var(--gh-input-bg);
                    color: var(--gh-text);
                }

                .chatgpt-helper-search-input:focus {
                    outline: none;
                    border-color: var(--gh-primary);
                }

                /* 分类标签 */
                .chatgpt-helper-categories {
                    padding: 8px 12px;
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                    background: var(--gh-bg);
                    border-bottom: 1px solid var(--gh-border);
                }

                .chatgpt-helper-category-tag {
                    padding: 4px 10px;
                    background: var(--gh-hover);
                    border-radius: 12px;
                    font-size: 12px;
                    color: #4b5563;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                    position: relative;
                    z-index: 1;
                    pointer-events: auto;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag {
                    color: var(--gh-text-secondary, #9ca3af);
                }

                .chatgpt-helper-category-tag:hover {
                    background: var(--gh-border);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {
                    background: var(--gh-hover, #1f2937);
                    color: var(--gh-text, #e5e5e5);
                }

                .chatgpt-helper-category-tag.active {
                    background: var(--gh-tag-active-bg);
                    color: white;
                    border-color: var(--gh-tag-active-bg);
                    z-index: 2;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {
                    background: var(--gh-tag-active-bg);
                    color: white;
                }

                /* 提示词列表 */
                .chatgpt-helper-prompt-list {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px;
                }

                /* 提示词项 */
                .chatgpt-helper-prompt-item {
                    background: var(--gh-bg);
                    border: 1px solid var(--gh-border);
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }

                .chatgpt-helper-prompt-item:hover {
                    border-color: var(--gh-primary);
                    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);
                    transform: translateY(-2px);
                }

                .chatgpt-helper-prompt-item.selected {
                    background: linear-gradient(135deg, #e6f7f3 0%, #f0fdf4 100%);
                    border-color: var(--gh-primary);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {
                    background: linear-gradient(135deg, rgba(16, 163, 127, 0.25) 0%, rgba(25, 195, 125, 0.15) 100%);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.3);
                }

                .chatgpt-helper-prompt-title {
                    font-weight: 500;
                    color: var(--gh-text, #1f2937);
                    margin-bottom: 4px;
                }

                .chatgpt-helper-prompt-content {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                /* 阶段2：大纲管理器样式 */
                .outline-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 200px;
                    user-select: none;
                    overflow: hidden;
                    overflow-x: hidden !important;
                }

                .outline-fixed-toolbar {
                    padding: 10px 12px;
                    background: var(--gh-bg-secondary);
                    border-bottom: 1px solid var(--gh-border);
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .outline-toolbar-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .outline-toolbar-btn {
                    width: 26px;
                    height: 26px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 6px;
                    background: var(--gh-bg);
                    color: var(--gh-text-secondary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .outline-toolbar-btn:hover {
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    background: var(--gh-hover);
                }

                .outline-toolbar-btn.active {
                    border-color: var(--gh-primary);
                    color: white;
                    background: var(--gh-primary);
                }

                .outline-search-wrapper {
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .outline-search-input {
                    flex: 1;
                    height: 28px;
                    padding: 0 10px;
                    border: 1px solid var(--gh-input-border);
                    border-radius: 6px;
                    font-size: 13px;
                    color: var(--gh-text);
                    outline: none;
                    transition: all 0.2s;
                    background: var(--gh-input-bg);
                }

                .outline-search-input:focus {
                    border-color: var(--gh-primary);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.1);
                }

                .outline-search-clear {
                    width: 16px;
                    height: 16px;
                    border: none;
                    background: var(--gh-input-border);
                    color: white;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 10px;
                    line-height: 16px;
                    text-align: center;
                    flex-shrink: 0;
                }

                .outline-search-clear:hover {
                    background: var(--gh-text-secondary);
                }

                .outline-search-clear.hidden {
                    display: none;
                }

                .outline-result-bar {
                    padding: 6px 12px;
                    background: #eff6ff;
                    color: #1d4ed8;
                    font-size: 12px;
                    border-bottom: 1px solid #dbeafe;
                    text-align: center;
                    flex-shrink: 0;
                    transition: all 0.3s;
                }

                .outline-result-bar.hidden {
                    display: none;
                }

                body[data-gh-mode="dark"] .outline-result-bar {
                    background: rgba(16, 163, 127, 0.2);
                    color: #10a37f;
                    border-bottom-color: rgba(16, 163, 127, 0.3);
                }

                /* 层级滑块 */
                .outline-level-slider-container {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .outline-level-dots {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 24px;
                }

                .outline-level-line {
                    position: absolute;
                    left: 10px;
                    right: 10px;
                    top: 50%;
                    height: 4px;
                    background: var(--gh-border);
                    transform: translateY(-50%);
                    z-index: 1;
                    border-radius: 2px;
                }

                .outline-level-progress {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background: var(--gh-primary);
                    border-radius: 2px;
                    transition: width 0.2s;
                }

                .outline-level-dot {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--gh-bg);
                    border: 2px solid var(--gh-border);
                    cursor: pointer;
                    z-index: 2;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .outline-level-dot:hover {
                    border-color: var(--gh-primary);
                    transform: scale(1.1);
                }

                .outline-level-dot.active {
                    background: var(--gh-primary);
                    border-color: var(--gh-primary);
                }

                .outline-level-dot-tooltip {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 4px;
                    padding: 2px 6px;
                    background: var(--gh-bg);
                    color: var(--gh-text);
                    font-size: 10px;
                    white-space: nowrap;
                    border-radius: 4px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    pointer-events: none;
                    border: 1px solid var(--gh-border);
                }

                .outline-level-dot:hover .outline-level-dot-tooltip {
                    opacity: 1;
                    visibility: visible;
                }

                /* 大纲列表区 */
                .outline-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 200px;
                    user-select: none;
                    overflow: hidden;
                }

                .outline-list-wrapper {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px 12px;
                    min-height: 0;
                }

                .outline-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .outline-item {
                    padding: 6px 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    background: transparent;
                    border: 1px solid transparent;
                    font-size: 13px;
                    color: var(--gh-text);
                    transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease;
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .outline-item:hover {
                    background: var(--gh-hover);
                    border-color: rgba(148, 163, 184, 0.4);
                }

                .outline-item:active {
                    transform: translateY(0.5px) scale(0.995);
                    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
                }

                .outline-item.sync-highlight,
                .outline-item.highlight {
                    background: var(--gh-active-bg) !important;
                    border-right: 3px solid var(--gh-primary) !important;
                    border-radius: 6px 0 0 6px;
                    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.25);
                }

                .outline-item.matched {
                    background: var(--gh-active-bg);
                    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.18);
                }

                .outline-item.user-query-node {
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.06));
                    border-color: rgba(59, 130, 246, 0.35);
                }

                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    background: radial-gradient(circle at 0 0, rgba(96, 165, 250, 0.32), rgba(15, 23, 42, 0.9));
                    border-color: rgba(129, 140, 248, 0.7);
                }

                .user-query-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 6px;
                    padding: 0 6px;
                    height: 18px;
                    border-radius: 999px;
                    background: rgba(16, 163, 127, 0.15);
                    color: var(--gh-primary);
                    font-size: 11px;
                    font-weight: 600;
                    gap: 2px;
                    flex-shrink: 0;
                }

                .user-query-badge-icon {
                    font-size: 12px;
                }

                .user-query-badge-number {
                    font-variant-numeric: tabular-nums;
                }
                
                /* 用户提问节点（Level 0） */
                .outline-item.user-query-node {
                    border-left: 3px solid var(--gh-border-active, #6366f1);
                    font-weight: 500;
                    padding-left: 8px !important;
                    margin-top: 8px;
                    border-radius: 8px;
                    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    border-left-color: rgba(129, 140, 248, 0.7);
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.65);
                }
                
                .outline-item.user-query-node:first-child {
                    margin-top: 0;
                }
                
                .outline-item.user-query-node:hover {
                    background: rgba(66, 133, 244, 0.15);
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node:hover {
                    background: rgba(66, 133, 244, 0.25);
                }
                
                /* 用户问题徽章：图标+角标数字 */
                .outline-item.user-query-node .user-query-badge {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    margin-right: 4px;
                    flex-shrink: 0;
                }
                
                .outline-item.user-query-node .user-query-badge-icon {
                    font-size: 15px;
                    line-height: 1;
                    color: #9ca3af;
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-icon {
                    color: #6b7280;
                }
                
                .outline-item.user-query-node .user-query-badge-number {
                    position: absolute;
                    bottom: -2px;
                    right: -4px;
                    min-width: 14px;
                    height: 14px;
                    padding: 0 3px;
                    font-size: 9px;
                    font-weight: 700;
                    line-height: 14px;
                    text-align: center;
                    color: #111827;
                    background: #ffffff;
                    border: 1px solid rgba(209, 213, 219, 0.9);
                    border-radius: 999px;
                    box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.9);
                    z-index: 10;
                }
                
                body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-number {
                    color: #e5e5e5;
                    background: #020617;
                    border-color: #374151;
                    box-shadow: 0 0 0 1.5px #020617;
                }
                
                /* 大纲项切换按钮 */
                .outline-item-toggle {
                    width: 24px;
                    min-width: 24px;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #9ca3af;
                    cursor: pointer;
                    transition: color 0.18s ease, background-color 0.18s ease, transform 0.16s ease;
                    font-size: 16px;
                    flex-shrink: 0;
                    margin-right: 4px;
                    box-sizing: border-box;
                    border-radius: 999px;
                    position: relative;
                    z-index: 1;
                    user-select: none;
                    -webkit-user-select: none;
                }
                
                .outline-item-toggle:hover {
                    color: var(--gh-border-active, #6366f1);
                    background-color: rgba(148, 163, 184, 0.16);
                }
                
                body[data-gh-mode="dark"] .outline-item-toggle:hover {
                    background-color: rgba(148, 163, 184, 0.25);
                }
                
                .outline-item-toggle.expanded {
                    transform: rotate(90deg);
                    color: var(--gh-border-active, #6366f1);
                }
                
                .outline-item-toggle.invisible {
                    opacity: 0;
                    cursor: default;
                    pointer-events: none;
                    visibility: visible !important;
                    display: inline-flex !important;
                }
                
                /* 大纲项文本 */
                .outline-item-text {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 24px;
                }
                
                /* 用户提问复制按钮 */
                .outline-item-copy-btn {
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s;
                    cursor: pointer;
                    color: var(--gh-text-secondary, #9ca3af);
                    border-radius: 4px;
                    background: var(--gh-bg, #ffffff);
                    border: 1px solid var(--gh-border, #e5e7eb);
                }
                
                body[data-gh-mode="dark"] .outline-item-copy-btn {
                    background: var(--gh-bg, #1e293b);
                    border-color: var(--gh-border, #475569);
                    color: var(--gh-text-secondary, #cbd5e1);
                }
                
                .outline-item.user-query-node:hover .outline-item-copy-btn {
                    opacity: 1;
                }
                
                .outline-item-copy-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    color: var(--gh-primary, #10a37f);
                }
                
                body[data-gh-mode="dark"] .outline-item-copy-btn:hover {
                    background: var(--gh-hover, #334155);
                    border-color: var(--gh-primary, #3b82f6);
                }

                .outline-item.collapsed {
                    display: none;
                }

                /* 通用隐藏类（用于大纲搜索/折叠） */
                .outline-hidden {
                    display: none !important;
                }

                .outline-expand-icon {
                    display: inline-block;
                    width: 16px;
                    margin-right: 4px;
                    user-select: none;
                    font-size: 10px;
                }
                
                /* H 标题级别徽章 */
                .heading-level-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 28px;
                    height: 20px;
                    padding: 0 6px;
                    margin-right: 6px;
                    background: var(--gh-primary);
                    color: white;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 600;
                    flex-shrink: 0;
                    line-height: 1;
                }
                
                body[data-gh-mode="dark"] .heading-level-badge {
                    background: rgba(16, 163, 127, 0.8);
                }
                
                .outline-item:hover .heading-level-badge {
                    background: var(--gh-primary-hover);
                    transform: scale(1.05);
                }

                .outline-empty {
                    text-align: center;
                    color: var(--gh-text-secondary);
                    padding: 40px 20px;
                    font-size: 14px;
                }

                /* 大纲层级缩进 */
                .outline-item.level-0 {
                    padding-left: 2px;
                    font-weight: 500;
                }

                .outline-item.level-1 {
                    padding-left: 10px;
                    font-weight: 600;
                    font-size: 14px;
                }

                .outline-item.level-2 {
                    padding-left: 28px;
                    font-weight: 500;
                }

                .outline-item.level-3 {
                    padding-left: 46px;
                }

                .outline-item.level-4 {
                    padding-left: 64px;
                    font-size: 12px;
                }

                .outline-item.level-5 {
                    padding-left: 82px;
                    font-size: 12px;
                    color: var(--gh-text-secondary);
                }

                .outline-item.level-6 {
                    padding-left: 100px;
                    font-size: 12px;
                    color: var(--gh-text-secondary);
                }

                /* 折叠状态下的最小宽度 */
                #chatgpt-helper-right.collapsed {
                    width: 50px;
                }

                #chatgpt-helper-right.collapsed #chatgpt-helper-header,
                #chatgpt-helper-right.collapsed #chatgpt-helper-tabs,
                #chatgpt-helper-right.collapsed #chatgpt-helper-content {
                    display: none;
                }

                /* 添加按钮 */
                .chatgpt-helper-add-btn {
                    width: 100%;
                    padding: 10px;
                    margin: 8px;
                    background: var(--gh-primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .chatgpt-helper-add-btn:hover {
                    background: var(--gh-primary-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(16, 163, 127, 0.3);
                }

                .chatgpt-helper-add-btn:active {
                    transform: translateY(0);
                }

                /* 刷新按钮样式 */
                .chatgpt-helper-refresh-btn:hover {
                    background: var(--gh-hover, #f3f4f6) !important;
                    border-color: var(--gh-primary, #3b82f6) !important;
                }

                /* 提示词操作按钮样式 - 右侧偏上 */
                .chatgpt-helper-prompt-content-wrapper {
                    position: relative;
                }

                .chatgpt-helper-prompt-actions {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    gap: 4px;
                    align-items: center;
                }

                .chatgpt-helper-prompt-actions button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 6px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    width: 24px;
                    height: 24px;
                    line-height: 1;
                }

                .chatgpt-helper-prompt-actions .category-btn {
                    background: var(--gh-bg-secondary);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-border);
                }

                .chatgpt-helper-prompt-actions .category-btn:hover {
                    background: var(--gh-hover);
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .edit-btn {
                    background: var(--gh-bg-secondary);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-border);
                }

                .chatgpt-helper-prompt-actions .edit-btn:hover {
                    background: var(--gh-hover);
                    border-color: var(--gh-primary);
                    color: var(--gh-primary);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .delete-btn {
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    border: 1px solid var(--gh-border, #e5e7eb);
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    color: var(--gh-danger, #ef4444);
                    border-color: var(--gh-danger, #ef4444);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .chatgpt-helper-prompt-actions .delete-btn svg {
                    width: 14px;
                    height: 14px;
                    display: block;
                }

                .chatgpt-helper-prompt-actions button:active {
                    transform: translateY(0);
                }

                /* 拖动排序相关样式 */
                .chatgpt-helper-prompt-item {
                    user-select: none;
                }

                .chatgpt-helper-prompt-item.dragging {
                    opacity: 0.5;
                    cursor: grabbing;
                }

                .chatgpt-helper-prompt-item.drag-over {
                    border-top: 3px solid var(--gh-primary);
                    margin-top: 8px;
                }

                .chatgpt-helper-prompt-drag-handle {
                    position: absolute;
                    left: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    cursor: grab;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gh-text-secondary);
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-drag-handle {
                    opacity: 1;
                }

                .chatgpt-helper-prompt-drag-handle:active {
                    cursor: grabbing;
                }

                .chatgpt-helper-prompt-drag-handle::before {
                    content: '⋮⋮';
                    font-size: 14px;
                    line-height: 1;
                    letter-spacing: 0;
                }

                /* 移除自动暗色模式支持，只通过 body[data-gh-mode="dark"] 控制 */

                /* 移除自动暗色模式适配，只通过 body[data-gh-mode="dark"] 控制 */

                /* 滚动条样式 */
                #chatgpt-helper-content::-webkit-scrollbar {
                    width: 6px;
                }

                #chatgpt-helper-content::-webkit-scrollbar-track {
                    background: var(--gh-bg-secondary, #f9fafb);
                }

                #chatgpt-helper-content::-webkit-scrollbar-thumb {
                    background: var(--gh-border, #e5e7eb);
                    border-radius: 3px;
                }

                #chatgpt-helper-content::-webkit-scrollbar-thumb:hover {
                    background: var(--gh-text-secondary, #6b7280);
                }

                /* 侧边按钮组 */
                .chatgpt-helper-quick-buttons {
                    position: fixed !important;
                    right: 340px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex !important;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 2147483647 !important;
                    pointer-events: auto !important;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
                    isolation: isolate;
                    padding: 8px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 16px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    background: rgba(30, 41, 59, 0.3);
                }

                .chatgpt-helper-quick-buttons.collapsed {
                    right: 8px !important;
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }

                .chatgpt-helper-quick-buttons.hidden {
                    display: none !important;
                    visibility: hidden !important;
                }

                .chatgpt-helper-quick-btn {
                    width: 44px !important;
                    height: 44px !important;
                    min-width: 44px !important;
                    min-height: 44px !important;
                    border-radius: 12px;
                    border: 1px solid var(--gh-border);
                    background: var(--gh-bg) !important;
                    color: var(--gh-text) !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
                    pointer-events: auto !important;
                    user-select: none !important;
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    position: relative;
                    z-index: 2147483647 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    outline: none !important;
                    -webkit-tap-highlight-color: transparent;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .chatgpt-helper-quick-btn:active {
                    transform: scale(0.92);
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }

                .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-hover) !important;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
                    border-color: var(--gh-primary);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {
                    background: rgba(30, 41, 59, 0.9) !important;
                    border-color: rgba(71, 85, 105, 0.5);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {
                    background: rgba(51, 65, 85, 0.95) !important;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
                }

                .chatgpt-helper-quick-btn.disabled {
                    opacity: 0.4;
                    cursor: default;
                }

                .chatgpt-helper-quick-btn.disabled:hover {
                    transform: none;
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    background: var(--gh-border);
                    margin: 4px 0;
                }

                /* 锚点标记 - 侧边小标记 */
                .chatgpt-helper-anchor-marker {
                    position: absolute;
                    left: 0;
                    width: 4px;
                    height: 24px;
                    background: var(--gh-header-bg, #10a37f);
                    border-radius: 0 4px 4px 0;
                    z-index: 999;
                    pointer-events: none;
                    box-shadow: 2px 0 4px rgba(0,0,0,0.1);
                }
                .chatgpt-helper-anchor-marker::before {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 8px;
                    width: 6px;
                    height: 6px;
                    border-radius: 999px;
                    background: var(--gh-primary, #64748b);
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #64748b), transparent 72%);
                }

                /* Toast 通知 */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }

                /* 底部导航按钮组 */
                .scroll-nav-container {
                    display: flex;
                    flex-direction: row;
                    gap: 8px;
                    padding: 12px;
                    border-top: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                    justify-content: space-between;
                }
                
                body[data-gh-mode="dark"] .scroll-nav-container {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-top-color: var(--gh-border, #475569);
                }
                
                .scroll-nav-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 8px;
                    background: var(--gh-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    flex: 1;
                    box-sizing: border-box;
                    min-width: 0;
                }
                
                body[data-gh-mode="dark"] .scroll-nav-btn {
                    background: var(--gh-bg, #1e293b);
                    border-color: var(--gh-input-border, #64748b);
                    color: var(--gh-text, #f1f5f9);
                }
                
                .scroll-nav-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(16, 163, 127, 0.15);
                }
                
                body[data-gh-mode="dark"] .scroll-nav-btn:hover {
                    background: var(--gh-hover, #334155);
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                }
                
                .scroll-nav-btn:active {
                    transform: translateY(0);
                }
                
                .scroll-nav-btn span:first-child {
                    font-size: 14px;
                    flex-shrink: 0;
                }
                
                .scroll-nav-btn span:last-child {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .scroll-nav-btn[style*="opacity: 0.4"] {
                    opacity: 0.4 !important;
                    cursor: default !important;
                }
                
                .scroll-nav-btn[style*="opacity: 0.4"]:hover {
                    transform: none;
                    box-shadow: none;
                }

                .chatgpt-helper-conversations-root {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    padding: 8px;
                    min-height: 0;
                }

                .chatgpt-helper-conversations-search {
                    padding: 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg, #ffffff);
                    flex-shrink: 0;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search {
                    background: var(--gh-bg, #111827);
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-conversations-search-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 8px;
                    background: var(--gh-input-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    font-size: 14px;
                    box-sizing: border-box;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }

                .chatgpt-helper-conversations-search-input:focus {
                    outline: none;
                    border-color: var(--gh-primary, #10a37f);
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #10a37f), transparent 80%);
                }

                .chatgpt-helper-batch-toolbar {
                    padding: 8px 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    background: var(--gh-active-bg, #e5e7eb);
                    font-size: 13px;
                    flex-shrink: 0;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar {
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-batch-toolbar-btn {
                    padding: 4px 8px;
                    border: 1px solid var(--gh-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg, #ffffff);
                    color: var(--gh-text, #1f2937);
                    cursor: pointer;
                    font-size: 12px;
                    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
                }

                .chatgpt-helper-batch-toolbar-btn:hover {
                    transform: translateY(-1px);
                    border-color: var(--gh-primary, #10a37f);
                    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.10);
                }

                .chatgpt-helper-batch-toolbar-btn.danger {
                    background: #ef4444;
                    border-color: rgba(239, 68, 68, 0.65);
                    color: #ffffff;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn {
                    background: var(--gh-bg, #0f172a);
                    border-color: var(--gh-border, #475569);
                    color: var(--gh-text, #f8fafc);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn.danger {
                    background: #dc2626;
                    border-color: rgba(248, 113, 113, 0.55);
                }

                /* 会话模块样式 */
                .chatgpt-helper-folder-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 12px;
                    margin-bottom: 4px;
                    border-radius: 8px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item {
                    background: var(--gh-bg-secondary, #0f172a);
                }
                
                .chatgpt-helper-folder-item:hover {
                    background: var(--gh-hover, #f3f4f6);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item:hover {
                    background: var(--gh-hover, #334155);
                }
                
                .chatgpt-helper-folder-item.default {
                    background: var(--gh-folder-bg-default, #e0f2fe);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item.default {
                    background: var(--gh-bg-secondary, #111827);
                }
                
                .chatgpt-helper-folder-item.expanded {
                    background: var(--gh-folder-bg-expanded, #c7d2fe) !important;
                    border: 2px solid var(--gh-border-active, #6366f1) !important;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
                    border-radius: 8px 8px 0 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-item.expanded {
                    background: rgba(99, 102, 241, 0.2) !important;
                    border-color: rgba(99, 102, 241, 0.5) !important;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
                }
                
                .chatgpt-helper-folder-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                    min-width: 0;
                }
                
                .chatgpt-helper-folder-icon {
                    font-size: 18px;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .chatgpt-helper-folder-name {
                    font-weight: 500;
                    color: var(--gh-text, #1f2937);
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex: 1;
                }
                
                .chatgpt-helper-folder-count {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    margin-left: 4px;
                }
                
                .chatgpt-helper-folder-arrow {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #6b7280);
                    transition: transform 0.2s;
                    flex-shrink: 0;
                }

                .chatgpt-helper-folder-actions {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex-shrink: 0;
                }

                /* 默认隐藏删除按钮，hover 时显示（避免界面噪音） */
                .chatgpt-helper-folder-delete-btn {
                    width: 26px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: var(--gh-text-secondary, #6b7280);
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    font-size: 14px;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
                }

                .chatgpt-helper-folder-item:hover .chatgpt-helper-folder-delete-btn,
                .chatgpt-helper-folder-delete-btn:focus-visible {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-folder-delete-btn:hover {
                    background: rgba(239, 68, 68, 0.12);
                    border-color: rgba(239, 68, 68, 0.35);
                    color: #ef4444;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-folder-delete-btn:hover {
                    background: rgba(239, 68, 68, 0.18);
                    border-color: rgba(239, 68, 68, 0.45);
                }

                .chatgpt-helper-folder-delete-btn:focus-visible {
                    outline: 2px solid rgba(99, 102, 241, 0.55);
                    outline-offset: 2px;
                }

                /* 会话模式：收件箱与其他文件夹分割线 */
                .chatgpt-helper-folder-divider {
                    height: 1px;
                    background: var(--gh-border, #e5e7eb);
                    opacity: 0.75;
                    margin: 8px 6px;
                    border-radius: 1px;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-divider {
                    background: var(--gh-border, #475569);
                    opacity: 0.65;
                }
                
                .chatgpt-helper-folder-item.expanded .chatgpt-helper-folder-arrow {
                    transform: rotate(90deg);
                }
                
                .chatgpt-helper-conversations-list {
                    width: calc(100% - 8px);
                    margin-left: 4px;
                    margin-right: 4px;
                    padding: 8px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    /* 移除会话列表左/右/下方“蓝线”（原本来自激活色边框） */
                    border: 2px solid transparent;
                    border-top: none;
                    border-radius: 0 0 8px 8px;
                    margin-top: -4px;
                    margin-bottom: 4px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
                    /* 让会话列表占满可用高度，由外层容器控制滚动 */
                    max-height: none;
                    height: auto;
                    overflow-y: auto;
                    overflow-x: hidden !important;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .chatgpt-helper-conversations-list::-webkit-scrollbar {
                    display: none;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-list {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: transparent;
                    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
                }
                
                .chatgpt-helper-conversation-item {
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    margin-bottom: 4px;
                    border-radius: 6px;
                    background: var(--gh-bg, #ffffff);
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                    gap: 8px;
                    position: relative;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item {
                    background: var(--gh-bg, #1e293b);
                }

                .chatgpt-helper-conversation-item.pinned {
                    background: color-mix(in srgb, var(--gh-active-bg, #e5e7eb), var(--gh-bg, #ffffff) 42%);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item.pinned {
                    background: color-mix(in srgb, var(--gh-active-bg, rgba(59,130,246,0.3)), var(--gh-bg, #1e293b) 44%);
                    border-color: color-mix(in srgb, var(--gh-border, #475569), transparent 20%);
                }

                .chatgpt-helper-conversation-item:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-conversation-item:hover {
                    background: var(--gh-hover, #334155);
                }
                
                .chatgpt-helper-conversations-empty {
                    padding: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    font-size: 13px;
                    text-align: center;
                }
                
                /* 会话工具栏样式 */
                .chatgpt-helper-conversations-toolbar {
                    display: flex;
                    gap: 6px;
                    padding: 10px 12px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }
                
                .chatgpt-helper-conversations-toolbar-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    height: 32px;
                    padding: 5px 8px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    color: var(--gh-text, #374151);
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: var(--gh-input-border, #4a5568);
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-conversations-toolbar-btn:hover {
                    background: var(--gh-hover, #f3f4f6);
                    border-color: #9ca3af;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn:hover {
                    background: var(--gh-hover, #1f2937);
                    border-color: #6b7280;
                }
                
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: var(--gh-border-active, #6366f1) !important;
                    color: white !important;
                    border-color: var(--gh-border-active, #6366f1) !important;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: rgba(99, 102, 241, 0.8) !important;
                    border-color: rgba(99, 102, 241, 0.8) !important;
                }
                
                .chatgpt-helper-folder-select {
                    flex: 1;
                    padding: 5px 8px;
                    border: 1px solid var(--gh-input-border, #d1d5db);
                    border-radius: 6px;
                    background: var(--gh-bg-secondary, #f9fafb);
                    color: var(--gh-text, #374151);
                    font-size: 13px;
                    cursor: pointer;
                    min-width: 80px;
                    height: 32px;
                    box-sizing: border-box;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-folder-select {
                    background: var(--gh-bg-secondary, #1a1a1a);
                    border-color: var(--gh-input-border, #4a5568);
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-folder-select:focus {
                    outline: none;
                    border-color: var(--gh-border-active, #6366f1);
                }

                .chatgpt-helper-export-header {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--gh-border, #e5e7eb);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 15px;
                    font-weight: 500;
                    color: var(--gh-text, #374151);
                    background: var(--gh-bg-secondary, #f9fafb);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
                    box-sizing: border-box;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-export-header {
                    background: var(--gh-bg-secondary, #0f172a);
                    border-bottom-color: var(--gh-border, #475569);
                }

                .chatgpt-helper-export-container {
                    flex: 1;
                    overflow: auto;
                    padding: 0;
                    min-height: 0;
                    position: relative;
                    box-sizing: border-box;
                }
                
                /* 设置面板样式 */
                .chatgpt-helper-setting-section {
                    margin-bottom: 18px;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), white 20%) 0%, var(--gh-bg-secondary, #f9fafb) 100%);
                    border-radius: 16px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 8%);
                    overflow: hidden;
                    box-shadow:
                        0 14px 30px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.45);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section {
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #101827), white 4%) 0%, var(--gh-bg-secondary, #101827) 100%);
                    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 10%);
                    box-shadow:
                        0 18px 34px rgba(2, 6, 23, 0.34),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                }
                
                .chatgpt-helper-setting-section-header {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    padding: 16px 18px;
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--gh-text, #374151);
                    letter-spacing: 0.06em;
                    text-align: center;
                    transition: background 0.2s, border-color 0.2s;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header {
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-setting-section-header:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 12%);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header:hover {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 8%);
                }
                
                .chatgpt-helper-setting-section-content {
                    padding: 0 16px 16px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .chatgpt-helper-setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 16px;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), white 12%) 0%, var(--gh-bg, #ffffff) 100%);
                    border-radius: 14px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);
                    box-shadow:
                        0 8px 18px rgba(15, 23, 42, 0.04),
                        inset 0 1px 0 rgba(255,255,255,0.38);
                    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item {
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #0f1419), white 3%) 0%, var(--gh-bg, #0f1419) 100%);
                    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 14%);
                    box-shadow:
                        0 10px 22px rgba(2, 6, 23, 0.28),
                        inset 0 1px 0 rgba(255,255,255,0.03);
                }
                
                .chatgpt-helper-setting-item:hover {
                    transform: translateY(-1px);
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);
                    box-shadow:
                        0 12px 26px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.48);
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item:hover {
                    box-shadow:
                        0 14px 28px rgba(2, 6, 23, 0.34),
                        inset 0 1px 0 rgba(255,255,255,0.05);
                }
                
                .chatgpt-helper-setting-item-info {
                    flex: 1;
                    margin-right: 12px;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .chatgpt-helper-setting-item-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--gh-text, #374151);
                    margin-bottom: 2px;
                    white-space: nowrap;
                }
                
                body[data-gh-mode="dark"] .chatgpt-helper-setting-item-label {
                    color: var(--gh-text, #e5e5e5);
                }
                
                .chatgpt-helper-setting-item-desc {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    line-height: 1.4;
                }

                .chatgpt-helper-settings-scroll {
                    scrollbar-width: thin;
                }

                .chatgpt-helper-setting-section-title {
                    display: inline-block;
                    text-align: center;
                }

                .chatgpt-helper-theme-block-title,
                .chatgpt-helper-setting-section-title {
                    text-transform: none;
                }

                .chatgpt-helper-inline-icon,
                .chatgpt-helper-icon-logo,
                .chatgpt-helper-quick-btn-logo {
                    filter: drop-shadow(0 4px 12px rgba(15, 23, 42, 0.18));
                }

                .chatgpt-helper-inline-icon-wrap {
                    display: inline-flex;
                    width: 28px;
                    min-width: 28px;
                    height: 28px;
                    align-items: center;
                    justify-content: center;
                    margin-right: 8px;
                    border-radius: 10px;
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 10%);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-inline-icon-wrap {
                    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 10%);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .setting-toggle {
                    position: relative;
                    width: 42px;
                    min-width: 42px;
                    height: 24px;
                    border-radius: 999px;
                    cursor: pointer;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-hover, #e5e7eb), white 18%) 0%, color-mix(in srgb, var(--gh-hover, #e5e7eb), transparent 12%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.5),
                        0 6px 14px rgba(15, 23, 42, 0.08);
                    transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease;
                }

                .setting-toggle::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    box-shadow:
                        0 4px 10px rgba(15, 23, 42, 0.14),
                        inset 0 1px 0 rgba(255,255,255,0.85);
                    transition: transform 0.22s ease;
                }

                .setting-toggle.active {
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #10a37f), white 36%) 0%, color-mix(in srgb, var(--gh-primary, #10a37f), transparent 16%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.38),
                        0 10px 18px rgba(15, 23, 42, 0.12);
                }

                .setting-toggle.active::after {
                    transform: translateX(18px);
                }

                body[data-gh-mode="dark"] .setting-toggle {
                    border-color: color-mix(in srgb, var(--gh-border, #334155), transparent 10%);
                    background:
                        linear-gradient(180deg, color-mix(in srgb, #111827, white 4%) 0%, #0f172a 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.05),
                        0 8px 18px rgba(2, 6, 23, 0.28);
                }

                body[data-gh-mode="dark"] .setting-toggle::after {
                    background: linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%);
                    box-shadow:
                        0 4px 12px rgba(2, 6, 23, 0.42),
                        inset 0 1px 0 rgba(255,255,255,0.7);
                }

                body[data-gh-mode="dark"] .setting-toggle.active {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #6366f1), white 14%) 0%, color-mix(in srgb, var(--gh-primary, #6366f1), #0f172a 65%) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.06),
                        0 10px 24px rgba(2, 6, 23, 0.34);
                }

                .chatgpt-helper-settings-footer {
                    padding: 10px 2px 4px;
                }

                .chatgpt-helper-about-btn {
                    width: 100%;
                    min-height: 48px;
                    border-radius: 16px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 10%);
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-bg, #ffffff), white 10%) 0%, color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 10%) 100%);
                    color: var(--gh-text, #111827);
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    box-shadow:
                        0 14px 28px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255,255,255,0.46);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }

                .chatgpt-helper-about-btn:hover {
                    transform: translateY(-1px);
                    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 28%);
                    box-shadow:
                        0 18px 30px rgba(15, 23, 42, 0.12),
                        inset 0 1px 0 rgba(255,255,255,0.52);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-btn {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-bg, #0f1419), white 3%) 0%, color-mix(in srgb, var(--gh-hover, #1f2937), transparent 10%) 100%);
                    box-shadow:
                        0 18px 34px rgba(2, 6, 23, 0.28),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                }

                .chatgpt-helper-header-about-btn {
                    position: relative;
                }

                .chatgpt-helper-about-entry-icon {
                    width: 16px;
                    height: 16px;
                    border-radius: 999px;
                    border: 1.6px solid #f97316;
                    color: #ea580c;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 800;
                    line-height: 1;
                    background: rgba(255, 247, 237, 0.2);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.24);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-entry-icon {
                    color: #fdba74;
                    border-color: #fb923c;
                    background: rgba(249, 115, 22, 0.14);
                }

                #chatgpt-helper-header.gh-compact .chatgpt-helper-about-entry-icon {
                    width: 14px;
                    height: 14px;
                    font-size: 10px;
                }

                #chatgpt-helper-about-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10060;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 18px;
                    background:
                        radial-gradient(980px 420px at 10% 0%, rgba(249, 115, 22, 0.10), transparent 58%),
                        radial-gradient(1100px 540px at 100% 100%, rgba(99, 102, 241, 0.12), transparent 64%),
                        rgba(2, 6, 23, 0.70);
                    backdrop-filter: blur(12px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.24s ease;
                }

                #chatgpt-helper-about-modal.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-about-dialog {
                    width: min(720px, 94vw);
                    max-height: min(860px, 92vh);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: 28px;
                    border: 1px solid rgba(226, 232, 240, 0.72);
                    background:
                        linear-gradient(180deg, #fffaf5 0%, #fffdfa 28%, #f8fafc 100%);
                    color: #0f172a;
                    box-shadow:
                        0 36px 92px rgba(15, 23, 42, 0.34),
                        inset 0 1px 0 rgba(255,255,255,0.58);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-dialog {
                    background:
                        linear-gradient(180deg, #101016 0%, #0c0d12 100%);
                    border-color: rgba(71, 85, 105, 0.34);
                    color: #edf2ff;
                    box-shadow:
                        0 44px 100px rgba(2, 6, 23, 0.56),
                        inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .chatgpt-helper-about-header {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 16px;
                    padding: 28px 30px 18px;
                    border-bottom: 1px solid rgba(226, 232, 240, 0.72);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-header {
                    border-bottom-color: rgba(71, 85, 105, 0.34);
                }

                .chatgpt-helper-about-title-wrap {
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                    min-width: 0;
                    padding-right: 52px;
                }

                .chatgpt-helper-about-logo {
                    border-radius: 14px;
                    filter: drop-shadow(0 8px 18px rgba(15, 23, 42, 0.10));
                }

                .chatgpt-helper-about-title-text {
                    min-width: 0;
                }

                .chatgpt-helper-about-name-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .chatgpt-helper-about-name {
                    font-size: 30px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: 0;
                }

                .chatgpt-helper-about-tagline {
                    margin-top: 8px;
                    font-size: 14px;
                    line-height: 1.75;
                    color: #475569;
                    max-width: 520px;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-name {
                    color: #f8fbff;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-tagline {
                    color: #b7c4d9;
                }

                .chatgpt-helper-about-badge {
                    padding: 6px 11px;
                    border-radius: 999px;
                    border: 1px solid rgba(203, 213, 225, 0.8);
                    background: rgba(255,255,255,0.88);
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    color: #0f172a;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-badge {
                    background: rgba(15, 23, 42, 0.72);
                    border-color: rgba(148, 163, 184, 0.24);
                    color: #e5eefb;
                }

                .chatgpt-helper-about-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    border: 1px solid rgba(203, 213, 225, 0.8);
                    background: rgba(255,255,255,0.84);
                    color: #0f172a;
                    cursor: pointer;
                    font-size: 20px;
                    transition: all 0.2s ease;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-close {
                    background: rgba(15, 23, 42, 0.72);
                    border-color: rgba(148, 163, 184, 0.24);
                    color: #e5eefb;
                }

                .chatgpt-helper-about-close:hover {
                    transform: translateY(-1px);
                    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 26%);
                }

                .chatgpt-helper-about-body {
                    flex: 1;
                    overflow: auto;
                    padding: 0 30px;
                }

                .chatgpt-helper-about-shell {
                    width: 100%;
                    max-width: 620px;
                    margin: 0 auto;
                    padding: 24px 0 18px;
                }

                .chatgpt-helper-about-section {
                    padding: 0;
                }

                .chatgpt-helper-about-section + .chatgpt-helper-about-section {
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(226, 232, 240, 0.72);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-section + .chatgpt-helper-about-section {
                    border-top-color: rgba(71, 85, 105, 0.34);
                }

                .chatgpt-helper-about-section.soft {
                    padding: 18px 20px;
                    border-radius: 20px;
                    border: 1px solid rgba(226, 232, 240, 0.72);
                    background:
                        linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(248,250,252,0.92) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.56),
                        0 18px 32px rgba(15, 23, 42, 0.06);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-section.soft {
                    border-color: rgba(71, 85, 105, 0.34);
                    background:
                        linear-gradient(180deg, rgba(20, 24, 34, 0.96) 0%, rgba(12, 14, 20, 0.98) 100%);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.04),
                        0 18px 34px rgba(2, 6, 23, 0.28);
                }

                .chatgpt-helper-about-section.tight .chatgpt-helper-about-actions {
                    margin-top: 14px;
                }

                .chatgpt-helper-about-section-title {
                    font-size: 18px;
                    font-weight: 800;
                    line-height: 1.35;
                    color: #0f172a;
                    letter-spacing: 0;
                    margin-bottom: 10px;
                }

                .chatgpt-helper-about-section-text {
                    font-size: 14px;
                    line-height: 1.85;
                    color: #334155;
                    white-space: pre-wrap;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-section-title {
                    color: #f8fbff;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-section-text {
                    color: #c8d5ea;
                }

                .chatgpt-helper-about-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 16px;
                }

                .chatgpt-helper-about-link-btn {
                    min-height: 40px;
                    padding: 0 15px;
                    border-radius: 999px;
                    border: 1px solid rgba(203, 213, 225, 0.74);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.01em;
                    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
                    color: #0f172a;
                    background: rgba(255,255,255,0.84);
                    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
                }

                .chatgpt-helper-about-link-btn:hover {
                    transform: translateY(-1px);
                }

                .chatgpt-helper-about-link-btn.soft {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #3b82f6), white 82%) 0%, color-mix(in srgb, var(--gh-primary, #3b82f6), white 72%) 100%);
                    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 72%);
                    color: color-mix(in srgb, var(--gh-primary, #3b82f6), #0f172a 42%);
                    box-shadow: 0 10px 24px rgba(59, 130, 246, 0.14);
                }

                .chatgpt-helper-about-link-btn.disabled,
                .chatgpt-helper-about-link-btn:disabled {
                    opacity: 0.46;
                    cursor: not-allowed;
                    box-shadow: none;
                    transform: none;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-link-btn {
                    background: rgba(15, 23, 42, 0.72);
                    color: #e5eefb;
                    border-color: rgba(148, 163, 184, 0.22);
                    box-shadow: 0 16px 26px rgba(2, 6, 23, 0.24);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-link-btn.soft {
                    background:
                        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #60a5fa), #0f172a 80%) 0%, color-mix(in srgb, var(--gh-primary, #60a5fa), #0b1220 74%) 100%);
                    color: #ecf4ff;
                    border-color: color-mix(in srgb, var(--gh-primary, #60a5fa), transparent 70%);
                    box-shadow: 0 16px 32px rgba(2, 6, 23, 0.32);
                }

                .chatgpt-helper-about-author-block {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .chatgpt-helper-about-author-name {
                    font-size: 18px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: 0;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-author-name {
                    color: #f8fbff;
                }

                .chatgpt-helper-about-author-bio {
                    margin-bottom: 0;
                }

                .chatgpt-helper-about-inline-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-top: 6px;
                    font-size: 12px;
                    line-height: 1.75;
                }

                .chatgpt-helper-about-inline-label {
                    font-weight: 700;
                    color: #475569;
                }

                .chatgpt-helper-about-inline-value {
                    color: #334155;
                    word-break: break-all;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-inline-label {
                    color: #a8bbd6;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-inline-value {
                    color: #dbe7f6;
                }

                .chatgpt-helper-about-footer {
                    padding: 16px 30px 24px;
                    text-align: center;
                    border-top: 1px solid rgba(226, 232, 240, 0.72);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-footer {
                    border-top-color: rgba(71, 85, 105, 0.34);
                }

                .chatgpt-helper-about-footer-note {
                    font-size: 12px;
                    line-height: 1.7;
                    color: #475569;
                    margin-bottom: 6px;
                }

                .chatgpt-helper-about-footer-text {
                    font-size: 12px;
                    color: #475569;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-about-footer-note,
                body[data-gh-mode="dark"] .chatgpt-helper-about-footer-text {
                    color: #9fb2cd;
                }

                @media (max-width: 640px) {
                    .chatgpt-helper-about-header {
                        padding: 24px 22px 16px;
                    }

                    .chatgpt-helper-about-body {
                        padding: 0 22px;
                    }

                    .chatgpt-helper-about-shell {
                        padding: 22px 0 16px;
                    }

                    .chatgpt-helper-about-title-wrap {
                        gap: 14px;
                    }

                    .chatgpt-helper-about-name {
                        font-size: 26px;
                    }

                    .chatgpt-helper-about-section.soft {
                        padding: 16px 16px;
                    }
                }
                
                .chatgpt-helper-setting-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-shrink: 0;
                }
                
                .collapse-arrow {
                    font-size: 12px;
                    color: var(--gh-text-secondary, #9ca3af);
                    transition: transform 0.2s;
                    display: inline-block;
                }

                .chatgpt-helper-theme-launch-btn {
                    padding: 9px 15px;
                    border-radius: 12px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 18%);
                    background: color-mix(in srgb, var(--gh-bg, #ffffff), transparent 6%);
                    color: var(--gh-text, #111827);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-launch-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 8%);
                    border-color: var(--gh-primary, #10a37f);
                    transform: translateY(-1px);
                }

                #chatgpt-helper-theme-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10050;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: color-mix(in srgb, #020617, transparent 22%);
                    backdrop-filter: blur(8px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.24s ease;
                    padding: 14px;
                }

                #chatgpt-helper-theme-modal.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .chatgpt-helper-theme-modal-dialog {
                    width: min(1180px, 96vw);
                    height: min(880px, 93vh);
                    background: var(--gh-panel-surface, var(--gh-bg, #ffffff));
                    color: var(--gh-text, #111827);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    border-radius: 20px;
                    box-shadow:
                        0 26px 72px color-mix(in srgb, #020617, transparent 52%),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                    background: var(--gh-panel-surface, var(--gh-bg, #0b111a));
                    border-color: color-mix(in srgb, #334155, transparent 12%);
                }

                .chatgpt-helper-theme-modal-header {
                    height: 64px;
                    padding: 0 22px;
                    border-bottom: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 0.01em;
                }

                .chatgpt-helper-theme-modal-close {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 20%);
                    color: inherit;
                    cursor: pointer;
                    font-size: 20px;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-modal-close:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                }

                .chatgpt-helper-theme-modal-body {
                    flex: 1;
                    min-height: 0;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 370px;
                    gap: 0;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-main {
                    overflow: auto;
                    padding: 22px 24px 28px;
                }

                .chatgpt-helper-theme-side {
                    border-left: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    padding: 22px 20px;
                    overflow: auto;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 4%);
                }

                .chatgpt-helper-theme-block {
                    margin-bottom: 26px;
                }

                .chatgpt-helper-theme-block-title {
                    font-size: 15px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }

                .chatgpt-helper-theme-segment {
                    display: inline-flex;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    border-radius: 12px;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 8%);
                }

                .chatgpt-helper-theme-segment button {
                    border: none;
                    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 14%);
                    background: transparent;
                    color: var(--gh-text, #1f2937);
                    padding: 9px 14px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-segment button:last-child {
                    border-right: none;
                }

                .chatgpt-helper-theme-segment button:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 92%);
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), #0b1220 10%);
                    color: #fff;
                }

                .chatgpt-helper-theme-preset-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    width: 100%;
                    padding: 14px;
                    border-radius: 14px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 4%);
                }

                .chatgpt-helper-theme-preset {
                    width: 46px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    position: relative;
                    transition: transform 0.16s ease, box-shadow 0.2s ease;
                }

                .chatgpt-helper-theme-preset.active {
                    border-color: #ffffff;
                    box-shadow: 0 0 0 2px color-mix(in srgb, currentColor, white 10%), 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .chatgpt-helper-theme-preset:hover {
                    transform: scale(1.06);
                }

                .chatgpt-helper-theme-preset.is-original {
                    width: auto;
                    min-width: 92px;
                    padding: 0 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f8fafc !important;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    background: linear-gradient(135deg, #334155 0%, #64748b 100%);
                }

                .chatgpt-helper-theme-preset.is-original:hover {
                    transform: translateY(-1px);
                }

                .chatgpt-helper-theme-upload {
                    border: 2px dashed color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 10%);
                    border-radius: 14px;
                    min-height: 220px;
                    padding: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 5%);
                    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
                }

                .chatgpt-helper-theme-upload.dragging {
                    border-color: var(--gh-primary);
                    background: color-mix(in srgb, var(--gh-primary), transparent 90%);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-theme-upload-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0.88;
                    filter: brightness(0.72);
                }

                .chatgpt-helper-theme-upload.has-image::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(2, 6, 23, 0.28) 0%, rgba(2, 6, 23, 0.52) 100%);
                    z-index: 1;
                    pointer-events: none;
                }

                .chatgpt-helper-theme-upload-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    align-items: center;
                }

                .chatgpt-helper-theme-upload.has-image .chatgpt-helper-theme-upload-content {
                    color: #f8fafc;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
                }

                .chatgpt-helper-theme-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: 12px;
                    padding: 10px 12px;
                    border-radius: 12px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);
                    border: 1px solid color-mix(in srgb, var(--gh-border), transparent 18%);
                }

                .chatgpt-helper-theme-row input[type="range"] {
                    width: 220px;
                    accent-color: var(--gh-primary);
                }

                .chatgpt-helper-theme-row input[type="checkbox"] {
                    appearance: none;
                    width: 42px;
                    height: 24px;
                    border-radius: 999px;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);
                    background: color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 24%);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
                    transition: transform 0.2s ease;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked {
                    background: var(--gh-primary);
                    border-color: var(--gh-primary);
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked::after {
                    transform: translateX(18px);
                }

                .chatgpt-helper-theme-preview {
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 8%);
                    border-radius: 18px;
                    min-height: 350px;
                    overflow: hidden;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), #f8fbff 26%) 0%, var(--gh-bg, #ffffff) 50%),
                        var(--gh-bg, #ffffff);
                    position: relative;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 10px 30px rgba(2, 6, 23, 0.28);
                }

                .chatgpt-helper-theme-preview-bg {
                    position: absolute;
                    inset: -12px;
                    background-size: cover;
                    background-position: center;
                    filter: blur(var(--gh-preview-blur, 5px));
                    transform: scale(1.06);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .chatgpt-helper-theme-preview.has-bg .chatgpt-helper-theme-preview-bg {
                    opacity: 1;
                }

                .chatgpt-helper-theme-preview-inner {
                    position: relative;
                    z-index: 1;
                    height: 100%;
                    display: grid;
                    grid-template-columns: 84px 1fr;
                    min-height: 350px;
                }

                .chatgpt-helper-theme-preview-nav {
                    padding: 12px 8px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);
                    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);
                }

                .chatgpt-helper-theme-preview-chat {
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .chatgpt-helper-theme-preview-msg {
                    border-radius: 12px;
                    padding: 10px 12px;
                    font-size: 13px;
                    line-height: 1.35;
                    max-width: 90%;
                    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 28%);
                }

                .chatgpt-helper-theme-preview-msg.user {
                    margin-left: auto;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 18%);
                }

                .chatgpt-helper-theme-preview-msg.assistant {
                    background: color-mix(in srgb, var(--gh-theme-light, #ecf3ff), transparent 8%);
                }

                .chatgpt-helper-theme-preview-input {
                    margin-top: auto;
                    border-radius: 999px;
                    height: 34px;
                    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 0%);
                    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);
                }

                @media (max-width: 980px) {
                    .chatgpt-helper-theme-modal-body {
                        grid-template-columns: 1fr;
                    }
                    .chatgpt-helper-theme-side {
                        border-left: none;
                        border-top: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);
                    }
                }

                /* Quiet efficiency sidebar refresh */
                :root {
                    --gh-bg: #fbfbfa;
                    --gh-bg-secondary: #f4f5f2;
                    --gh-text: #1f2420;
                    --gh-text-secondary: #66716a;
                    --gh-border: #dde2dc;
                    --gh-hover: #edf2ed;
                    --gh-shadow: -14px 0 32px rgba(31, 36, 32, 0.10), -2px 0 8px rgba(31, 36, 32, 0.06);
                    --gh-input-bg: #ffffff;
                    --gh-input-border: #d7ddd6;
                    --gh-active-bg: color-mix(in srgb, var(--gh-theme-primary, #4285f4), #ffffff 88%);
                    --gh-panel-surface: linear-gradient(180deg, #fbfbfa 0%, #f6f7f4 100%);
                    --gh-panel-subtle: color-mix(in srgb, var(--gh-bg-secondary), #ffffff 38%);
                    --gh-panel-card: color-mix(in srgb, var(--gh-bg), #ffffff 58%);
                    --gh-panel-card-hover: color-mix(in srgb, var(--gh-hover), #ffffff 34%);
                    --gh-panel-line: color-mix(in srgb, var(--gh-border), transparent 10%);
                    --gh-panel-muted-line: color-mix(in srgb, var(--gh-border), transparent 40%);
                    --gh-panel-elevated-shadow: 0 8px 22px rgba(31, 36, 32, 0.08);
                    --gh-panel-card-shadow: 0 1px 1px rgba(31, 36, 32, 0.03);
                    --gh-header-quiet-bg: linear-gradient(
                        180deg,
                        color-mix(in srgb, var(--gh-theme-primary, #4285f4), #ffffff 88%) 0%,
                        color-mix(in srgb, var(--gh-bg), #ffffff 28%) 100%
                    );
                    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #4285f4), transparent 72%);
                    --gh-control-bg: color-mix(in srgb, var(--gh-bg), #ffffff 44%);
                    --gh-control-bg-hover: color-mix(in srgb, var(--gh-hover), #ffffff 20%);
                    --gh-control-border: color-mix(in srgb, var(--gh-border), transparent 8%);
                    --gh-control-radius: 8px;
                    --gh-card-radius: 8px;
                }

                :root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {
                    --gh-bg: #191c1a;
                    --gh-bg-secondary: #111412;
                    --gh-text: #f2f3ef;
                    --gh-text-secondary: #a9b1aa;
                    --gh-border: #30362f;
                    --gh-hover: #242a25;
                    --gh-shadow: -16px 0 34px rgba(0, 0, 0, 0.34), -2px 0 10px rgba(0, 0, 0, 0.28);
                    --gh-input-bg: #202520;
                    --gh-input-border: #384038;
                    --gh-active-bg: color-mix(in srgb, var(--gh-theme-primary, #4285f4), #1b211c 78%);
                    --gh-panel-surface: linear-gradient(180deg, #1b1f1c 0%, #151815 100%);
                    --gh-panel-subtle: color-mix(in srgb, var(--gh-bg-secondary), #242a25 34%);
                    --gh-panel-card: color-mix(in srgb, var(--gh-bg), #262c27 42%);
                    --gh-panel-card-hover: color-mix(in srgb, var(--gh-hover), #313832 26%);
                    --gh-panel-line: color-mix(in srgb, var(--gh-border), transparent 6%);
                    --gh-panel-muted-line: color-mix(in srgb, var(--gh-border), transparent 36%);
                    --gh-panel-elevated-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
                    --gh-panel-card-shadow: 0 1px 1px rgba(0, 0, 0, 0.22);
                    --gh-header-quiet-bg: linear-gradient(
                        180deg,
                        color-mix(in srgb, var(--gh-theme-primary, #4285f4), #1d221f 80%) 0%,
                        color-mix(in srgb, var(--gh-bg), #242a25 22%) 100%
                    );
                    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #60a5fa), transparent 60%);
                    --gh-control-bg: color-mix(in srgb, var(--gh-bg), #2a302b 36%);
                    --gh-control-bg-hover: color-mix(in srgb, var(--gh-hover), #353d36 24%);
                    --gh-control-border: color-mix(in srgb, var(--gh-border), transparent 8%);
                }

                #chatgpt-helper-right,
                body[data-gh-mode="light"] #chatgpt-helper-right,
                body[data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-panel-surface) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    box-shadow: var(--gh-shadow) !important;
                    color: var(--gh-text) !important;
                }

                #chatgpt-helper-resize-handle::after {
                    width: 1px;
                    background: var(--gh-panel-line) !important;
                }

                #chatgpt-helper-resize-handle:hover::after {
                    width: 2px;
                    background: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                }

                #chatgpt-helper-header,
                body[data-gh-mode="light"] #chatgpt-helper-header,
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    background: var(--gh-header-quiet-bg) !important;
                    color: var(--gh-text) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: none !important;
                }

                #chatgpt-helper-title {
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 650;
                    letter-spacing: 0;
                }

                #chatgpt-helper-title span:last-child {
                    color: var(--gh-text);
                }

                #chatgpt-helper-controls {
                    gap: var(--gh-header-controls-gap, 5px);
                }

                .chatgpt-helper-header-btn {
                    background: var(--gh-control-bg);
                    border: 1px solid var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    border-radius: var(--gh-control-radius);
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                }

                .chatgpt-helper-header-btn:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-header-btn:active {
                    transform: translateY(0);
                    box-shadow: none;
                }

                #chatgpt-helper-tabs,
                body[data-gh-mode="light"] #chatgpt-helper-tabs,
                body[data-gh-mode="dark"] #chatgpt-helper-tabs {
                    gap: 4px;
                    padding: 8px 10px 7px;
                    background: color-mix(in srgb, var(--gh-bg), var(--gh-bg-secondary) 36%) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 36%);
                    --tab-padding-h: 8px;
                    --tab-padding-v: 7px;
                    --tab-gap: 5px;
                    --tab-margin: 0px;
                }

                .chatgpt-helper-tab {
                    min-height: 34px;
                    border: 1px solid transparent;
                    border-bottom: 1px solid transparent;
                    border-radius: var(--gh-control-radius);
                    color: var(--gh-text-secondary);
                    font-size: 12.5px;
                    font-weight: 520;
                    line-height: 1.2;
                    letter-spacing: 0;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-tab:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: var(--gh-control-border);
                    color: var(--gh-text);
                }

                .chatgpt-helper-tab.active,
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    background: var(--gh-panel-card);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 58%);
                    color: var(--gh-text);
                    font-weight: 650;
                    box-shadow:
                        inset 0 -2px 0 color-mix(in srgb, var(--gh-primary), transparent 10%),
                        var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-tab-drag-handle,
                .chatgpt-helper-prompt-drag-handle::before {
                    letter-spacing: 0;
                }

                .chatgpt-helper-tab-drag-handle {
                    margin-right: 2px;
                    padding: 1px 2px;
                    opacity: 0.35;
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 18%);
                }

                .chatgpt-helper-tab:hover .chatgpt-helper-tab-drag-handle {
                    opacity: 0.72;
                }

                .chatgpt-helper-tab.drag-before,
                .chatgpt-helper-tab.drag-after {
                    border-color: var(--gh-primary);
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary), transparent 38%);
                }

                #chatgpt-helper-content,
                body[data-gh-mode="light"] #chatgpt-helper-content,
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-panel-surface) !important;
                }

                .chatgpt-helper-search-bar,
                body[data-gh-mode="light"] .chatgpt-helper-search-bar,
                body[data-gh-mode="dark"] .chatgpt-helper-search-bar,
                .chatgpt-helper-categories,
                body[data-gh-mode="light"] .chatgpt-helper-categories,
                body[data-gh-mode="dark"] .chatgpt-helper-categories,
                .outline-fixed-toolbar,
                .chatgpt-helper-conversations-search,
                .chatgpt-helper-conversations-toolbar,
                .chatgpt-helper-batch-toolbar,
                .chatgpt-helper-export-header {
                    background: var(--gh-panel-subtle) !important;
                    border-color: var(--gh-panel-line) !important;
                }

                .chatgpt-helper-search-bar {
                    padding: 12px 12px 10px;
                }

                .chatgpt-helper-search-input,
                .outline-search-input,
                .chatgpt-helper-conversations-search-input {
                    min-height: 38px;
                    border-radius: var(--gh-control-radius);
                    background: var(--gh-input-bg);
                    border-color: var(--gh-input-border);
                    color: var(--gh-text);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.36);
                    transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
                }

                body[data-gh-mode="dark"] .chatgpt-helper-search-input,
                body[data-gh-mode="dark"] .outline-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input {
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
                }

                .chatgpt-helper-search-input:focus,
                .outline-search-input:focus,
                .chatgpt-helper-conversations-search-input:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.32);
                }

                .chatgpt-helper-categories {
                    gap: 6px;
                    padding: 10px 12px 12px;
                }

                .chatgpt-helper-category-tag {
                    display: inline-flex;
                    align-items: center;
                    min-height: 28px;
                    padding: 0 11px;
                    border-radius: 999px;
                    background: var(--gh-control-bg);
                    border-color: var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    font-weight: 550;
                    line-height: 1;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-category-tag:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%);
                    color: var(--gh-text);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-category-tag.active,
                body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 18%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 22%);
                    color: #ffffff;
                    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 78%);
                }

                .chatgpt-helper-prompt-list,
                .chatgpt-helper-conversations-root,
                .outline-list-wrapper {
                    padding: 12px 10px 16px;
                }

                .chatgpt-helper-add-btn {
                    width: calc(100% - 0px);
                    min-height: 42px;
                    margin: 0 0 10px;
                    border-radius: var(--gh-card-radius);
                    background: color-mix(in srgb, var(--gh-primary), #ffffff 8%);
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 80%);
                    transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-add-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), #ffffff 7%);
                    transform: translateY(-1px);
                    box-shadow: 0 10px 22px color-mix(in srgb, var(--gh-primary), transparent 74%);
                }

                .chatgpt-helper-prompt-item,
                .chatgpt-helper-conversation-item,
                .chatgpt-helper-folder-item,
                .chatgpt-helper-setting-section,
                .chatgpt-helper-setting-item,
                .chatgpt-helper-about-btn,
                .chatgpt-helper-export-grid .menu-item {
                    background: var(--gh-panel-card) !important;
                    border-color: var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-item {
                    padding: 12px 12px 12px 10px;
                    margin-bottom: 8px;
                    transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
                }

                .chatgpt-helper-prompt-item:hover,
                .chatgpt-helper-conversation-item:hover,
                .chatgpt-helper-folder-item:hover,
                .chatgpt-helper-setting-item:hover,
                .chatgpt-helper-about-btn:hover,
                .chatgpt-helper-export-grid .menu-item:hover {
                    background: var(--gh-panel-card-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;
                    box-shadow: var(--gh-panel-elevated-shadow);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-item.selected,
                body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;
                    box-shadow:
                        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 78%),
                        var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-title {
                    margin-bottom: 5px;
                    font-size: 13.5px;
                    font-weight: 650;
                    line-height: 1.35;
                    color: var(--gh-text);
                }

                .chatgpt-helper-prompt-content {
                    font-size: 12px;
                    line-height: 1.45;
                    color: var(--gh-text-secondary);
                }

                .chatgpt-helper-prompt-actions {
                    gap: 5px;
                }

                .chatgpt-helper-prompt-actions button,
                .outline-toolbar-btn,
                .chatgpt-helper-conversations-toolbar-btn,
                .chatgpt-helper-batch-toolbar-btn,
                .scroll-nav-btn {
                    background: var(--gh-control-bg);
                    border: 1px solid var(--gh-control-border);
                    color: var(--gh-text-secondary);
                    border-radius: var(--gh-control-radius);
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
                }

                .chatgpt-helper-prompt-actions button {
                    width: 25px;
                    height: 25px;
                    padding: 0;
                }

                .chatgpt-helper-prompt-actions button:hover,
                .outline-toolbar-btn:hover,
                .chatgpt-helper-conversations-toolbar-btn:hover,
                .chatgpt-helper-batch-toolbar-btn:hover,
                .scroll-nav-btn:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                    box-shadow: var(--gh-panel-card-shadow);
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover {
                    color: var(--gh-danger);
                    border-color: color-mix(in srgb, var(--gh-danger), transparent 22%);
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%);
                }

                .outline-fixed-toolbar {
                    gap: 10px;
                    padding: 12px;
                }

                .outline-toolbar-row {
                    gap: 6px;
                }

                .outline-toolbar-btn {
                    width: 32px;
                    height: 32px;
                }

                .outline-toolbar-btn.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 16%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 16%);
                    color: #ffffff;
                    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 78%);
                }

                .outline-list {
                    gap: 3px;
                }

                .outline-item {
                    min-height: 32px;
                    padding-top: 6px;
                    padding-bottom: 6px;
                    border-radius: var(--gh-card-radius);
                    border-color: transparent;
                    line-height: 1.35;
                }

                .outline-item:hover {
                    background: var(--gh-panel-card-hover);
                    border-color: var(--gh-panel-muted-line);
                }

                .outline-item.sync-highlight,
                .outline-item.highlight,
                .outline-item.matched {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;
                    border-right: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;
                    border-radius: var(--gh-card-radius) !important;
                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .outline-item.user-query-node,
                body[data-gh-mode="dark"] .outline-item.user-query-node {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 92%);
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);
                    border-left: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .outline-item.user-query-node:hover,
                body[data-gh-mode="dark"] .outline-item.user-query-node:hover {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card-hover) 86%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                }

                .user-query-badge,
                .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 84%);
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 72%);
                    border-radius: 999px;
                }

                body[data-gh-mode="dark"] .user-query-badge,
                body[data-gh-mode="dark"] .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    color: color-mix(in srgb, var(--gh-primary), #ffffff 24%);
                }

                .outline-item:hover .heading-level-badge {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    transform: none;
                }

                .outline-item-toggle {
                    color: var(--gh-text-secondary);
                }

                .outline-item-toggle:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 88%);
                    color: var(--gh-primary);
                }

                .scroll-nav-container,
                body[data-gh-mode="dark"] .scroll-nav-container {
                    gap: 8px;
                    padding: 10px 12px;
                    background: var(--gh-panel-subtle) !important;
                    border-top: 1px solid var(--gh-panel-line);
                }

                .scroll-nav-btn {
                    min-height: 38px;
                    padding: 8px 10px;
                    font-weight: 600;
                }

                .chatgpt-helper-quick-buttons {
                    gap: 8px;
                    padding: 7px;
                    background: color-mix(in srgb, var(--gh-bg), transparent 10%);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: 18px;
                    box-shadow: 0 12px 30px rgba(31, 36, 32, 0.12), 0 2px 8px rgba(31, 36, 32, 0.08);
                    backdrop-filter: blur(18px) saturate(1.04);
                    -webkit-backdrop-filter: blur(18px) saturate(1.04);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    background: color-mix(in srgb, var(--gh-bg), transparent 8%);
                    border-color: var(--gh-panel-line);
                    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.36), 0 2px 8px rgba(0, 0, 0, 0.26);
                }

                .chatgpt-helper-quick-btn,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {
                    border-radius: 12px;
                    border-color: var(--gh-control-border);
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none;
                    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
                }

                .chatgpt-helper-quick-btn:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 40%);
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-elevated-shadow);
                }

                .chatgpt-helper-quick-btn:active {
                    transform: translateY(0) scale(0.97);
                    box-shadow: none;
                }

                .chatgpt-helper-quick-btn.disabled,
                .chatgpt-helper-quick-btn[disabled] {
                    opacity: 0.38 !important;
                    cursor: default !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-quick-btn.disabled:hover,
                .chatgpt-helper-quick-btn[disabled]:hover {
                    transform: none;
                    border-color: var(--gh-control-border);
                    background: var(--gh-control-bg) !important;
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    margin: 2px 6px;
                    background: var(--gh-panel-muted-line);
                }

                #chatgpt-helper-right button:focus-visible,
                #chatgpt-helper-right input:focus-visible,
                #chatgpt-helper-right textarea:focus-visible,
                #chatgpt-helper-right select:focus-visible,
                .chatgpt-helper-quick-btn:focus-visible,
                .chatgpt-helper-prompt-dialog-btn:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                @media (prefers-reduced-motion: reduce) {
                    #chatgpt-helper-right,
                    #chatgpt-helper-right *,
                    .chatgpt-helper-quick-buttons,
                    .chatgpt-helper-quick-buttons * {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-header {
                    background:
                        linear-gradient(
                            135deg,
                            color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 82%) 0%,
                            color-mix(in srgb, var(--gh-theme-secondary, #60a5fa), transparent 88%) 100%
                        ) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);
                    box-shadow:
                        inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-card-border), transparent 10%),
                        0 10px 24px rgba(15, 23, 42, 0.10);
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header {
                    background: var(--gh-panel-card-bg) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-scroll,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-footer,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-root,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-panel {
                    background: transparent !important;
                    background-image: none !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="true"] .outline-search-input,
                :root[data-gh-bg-enabled="true"] .outline-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-select,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search-input,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn,
                :root[data-gh-bg-enabled="true"] .scroll-nav-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                    backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.default,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item.pinned,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar {
                    background: color-mix(in srgb, var(--gh-active-bg), transparent 28%) !important;
                    border-color: color-mix(in srgb, var(--gh-panel-card-border), transparent 18%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.expanded {
                    background: color-mix(in srgb, var(--gh-active-bg), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 24%) !important;
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 84%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item:hover,
                :root[data-gh-bg-enabled="true"] .scroll-nav-btn:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item:hover,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn:hover {
                    background: color-mix(in srgb, var(--gh-hover), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-right {
                    background: var(--gh-right-overlay) !important;
                    box-shadow: var(--gh-shadow), inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-header {
                    background:
                        linear-gradient(
                            135deg,
                            color-mix(in srgb, var(--gh-theme-primary, #4285f4), transparent 92%) 0%,
                            color-mix(in srgb, var(--gh-theme-secondary, #60a5fa), transparent 96%) 100%
                        ) !important;
                    box-shadow:
                        inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-card-border), transparent 12%),
                        0 10px 24px rgba(2, 6, 23, 0.18) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-container,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-export-header {
                    background: var(--gh-panel-card-bg) !important;
                    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-folder-select,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn,
                :root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-btn {
                    background: var(--gh-input-bg) !important;
                    border-color: var(--gh-input-border) !important;
                }

                /* Theme-driven productivity UI refresh */
                :root {
                    --gh-control-radius: 8px;
                    --gh-card-radius: 8px;
                    --gh-row-radius: 7px;
                    --gh-panel-pad-x: 12px;
                    --gh-panel-pad-y: 10px;
                    --gh-fast-ease: cubic-bezier(0.2, 0, 0, 1);
                }

                .chatgpt-helper-svg-icon {
                    width: 1em;
                    height: 1em;
                    display: block;
                    pointer-events: none;
                }

                #chatgpt-helper-right,
                body[data-gh-mode="light"] #chatgpt-helper-right,
                body[data-gh-mode="dark"] #chatgpt-helper-right,
                :root[data-gh-page-theme="true"] #chatgpt-helper-right,
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
                    background: var(--gh-panel-surface) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    box-shadow: var(--gh-shadow) !important;
                    color: var(--gh-text) !important;
                    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
                    backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);
                    box-shadow: var(--gh-shadow), inset 0 0 0 1px var(--gh-panel-card-border) !important;
                }

                #chatgpt-helper-header,
                body[data-gh-mode="light"] #chatgpt-helper-header,
                body[data-gh-mode="dark"] #chatgpt-helper-header {
                    min-height: 48px;
                    padding: var(--gh-header-padding-v, 9px) var(--gh-header-padding-h, 12px);
                    background: var(--gh-header-quiet-bg) !important;
                    color: var(--gh-text) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: none !important;
                }

                #chatgpt-helper-title {
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0;
                }

                #chatgpt-helper-title span:last-child {
                    color: var(--gh-text);
                }

                #chatgpt-helper-controls {
                    gap: var(--gh-header-controls-gap, 5px);
                }

                .chatgpt-helper-header-btn,
                .prompt-panel-btn,
                .chatgpt-helper-theme-launch-btn,
                .chatgpt-helper-prompt-actions button,
                .outline-toolbar-btn,
                .chatgpt-helper-conversations-toolbar-btn,
                .chatgpt-helper-batch-toolbar-btn,
                .chatgpt-helper-folder-delete-btn,
                .scroll-nav-btn,
                .chatgpt-helper-about-close,
                .chatgpt-helper-theme-modal-close,
                .chatgpt-helper-quick-btn {
                    background: var(--gh-control-bg) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    color: var(--gh-text-secondary) !important;
                    border-radius: var(--gh-control-radius) !important;
                    box-shadow: none !important;
                    transition:
                        background 0.16s var(--gh-fast-ease),
                        border-color 0.16s var(--gh-fast-ease),
                        color 0.16s var(--gh-fast-ease),
                        transform 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease),
                        opacity 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-header-btn {
                    width: var(--gh-header-btn-size, 28px);
                    height: var(--gh-header-btn-size, 28px);
                    min-width: var(--gh-header-btn-size, 28px);
                    padding: 0;
                    font-size: var(--gh-header-btn-font-size, 14px);
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                .prompt-panel-btn.chatgpt-helper-order-btn {
                    width: 32px;
                    height: 32px;
                    min-width: 32px;
                    padding: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatgpt-helper-header-btn:hover,
                .prompt-panel-btn:hover,
                .chatgpt-helper-theme-launch-btn:hover,
                .chatgpt-helper-prompt-actions button:hover,
                .outline-toolbar-btn:hover,
                .chatgpt-helper-conversations-toolbar-btn:hover,
                .chatgpt-helper-batch-toolbar-btn:hover,
                .chatgpt-helper-folder-delete-btn:hover,
                .scroll-nav-btn:hover,
                .chatgpt-helper-about-close:hover,
                .chatgpt-helper-theme-modal-close:hover,
                .chatgpt-helper-quick-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    color: var(--gh-text) !important;
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow) !important;
                }

                .chatgpt-helper-header-btn:active,
                .prompt-panel-btn:active,
                .chatgpt-helper-theme-launch-btn:active,
                .chatgpt-helper-prompt-actions button:active,
                .outline-toolbar-btn:active,
                .chatgpt-helper-conversations-toolbar-btn:active,
                .chatgpt-helper-batch-toolbar-btn:active,
                .scroll-nav-btn:active,
                .chatgpt-helper-quick-btn:active {
                    transform: translateY(0);
                    box-shadow: none !important;
                }

                #chatgpt-helper-tabs,
                body[data-gh-mode="light"] #chatgpt-helper-tabs,
                body[data-gh-mode="dark"] #chatgpt-helper-tabs,
                :root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,
                :root[data-gh-page-theme="true"] #chatgpt-helper-tabs {
                    gap: 4px;
                    padding: 8px 10px 7px;
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line);
                    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 42%) !important;
                    --tab-padding-h: 8px;
                    --tab-padding-v: 7px;
                    --tab-gap: 5px;
                    --tab-margin: 0px;
                }

                .chatgpt-helper-tab {
                    min-height: 34px;
                    border: 1px solid transparent !important;
                    border-radius: var(--gh-control-radius) !important;
                    color: var(--gh-text-secondary) !important;
                    font-size: 12.5px;
                    font-weight: 560;
                    letter-spacing: 0;
                    line-height: 1.2;
                    gap: 5px;
                    transition:
                        background 0.16s var(--gh-fast-ease),
                        border-color 0.16s var(--gh-fast-ease),
                        color 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-tab:hover,
                body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: var(--gh-control-border) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-tab.active,
                body[data-gh-mode="dark"] .chatgpt-helper-tab.active {
                    background: var(--gh-panel-card) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;
                    color: var(--gh-text) !important;
                    font-weight: 700;
                    box-shadow:
                        inset 0 -2px 0 color-mix(in srgb, var(--gh-primary), transparent 16%),
                        var(--gh-panel-card-shadow) !important;
                }

                .chatgpt-helper-tab-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%);
                }

                .chatgpt-helper-tab-drag-handle {
                    opacity: 0.32;
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 22%);
                }

                #chatgpt-helper-content,
                .chatgpt-helper-content-panel,
                body[data-gh-mode="light"] #chatgpt-helper-content,
                body[data-gh-mode="dark"] #chatgpt-helper-content {
                    background: var(--gh-panel-surface) !important;
                }

                :root[data-gh-bg-enabled="true"] #chatgpt-helper-content,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,
                :root[data-gh-page-theme="true"] #chatgpt-helper-content,
                :root[data-gh-page-theme="true"] .chatgpt-helper-content-panel {
                    background: transparent !important;
                    background-image: none !important;
                }

                .chatgpt-helper-search-bar,
                .chatgpt-helper-categories,
                .outline-fixed-toolbar,
                .chatgpt-helper-conversations-search,
                .chatgpt-helper-conversations-toolbar,
                .chatgpt-helper-batch-toolbar,
                .chatgpt-helper-export-header,
                .scroll-nav-container,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container {
                    background: var(--gh-panel-subtle) !important;
                    border-color: var(--gh-panel-line) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-line), transparent 42%) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,
                :root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-header,
                :root[data-gh-bg-enabled="true"] .scroll-nav-container {
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);
                }

                .chatgpt-helper-search-input,
                .outline-search-input,
                .chatgpt-helper-conversations-search-input,
                .chatgpt-helper-folder-select,
                #chatgpt-helper-right input,
                #chatgpt-helper-right textarea,
                #chatgpt-helper-right select {
                    min-height: 36px;
                    border-radius: var(--gh-control-radius) !important;
                    background: var(--gh-input-bg) !important;
                    border: 1px solid var(--gh-input-border) !important;
                    color: var(--gh-text) !important;
                    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%) !important;
                    transition:
                        border-color 0.16s var(--gh-fast-ease),
                        box-shadow 0.16s var(--gh-fast-ease),
                        background 0.16s var(--gh-fast-ease);
                }

                body[data-gh-mode="dark"] .chatgpt-helper-search-input,
                body[data-gh-mode="dark"] .outline-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,
                body[data-gh-mode="dark"] .chatgpt-helper-folder-select,
                body[data-gh-mode="dark"] #chatgpt-helper-right input,
                body[data-gh-mode="dark"] #chatgpt-helper-right textarea,
                body[data-gh-mode="dark"] #chatgpt-helper-right select {
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
                }

                .chatgpt-helper-search-input:focus,
                .outline-search-input:focus,
                .chatgpt-helper-conversations-search-input:focus,
                .chatgpt-helper-folder-select:focus,
                #chatgpt-helper-right input:focus,
                #chatgpt-helper-right textarea:focus,
                #chatgpt-helper-right select:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;
                    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 80%) !important;
                    outline: none !important;
                }

                .chatgpt-helper-prompt-list,
                .chatgpt-helper-conversations-root,
                .outline-list-wrapper,
                .chatgpt-helper-settings-scroll,
                .chatgpt-helper-export-container {
                    padding: 12px 10px 16px !important;
                }

                .chatgpt-helper-add-btn {
                    min-height: 40px;
                    margin: 0 0 10px;
                    border-radius: var(--gh-card-radius) !important;
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 18%) !important;
                    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                    font-weight: 700;
                }

                .chatgpt-helper-add-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 62%) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%) !important;
                }

                .chatgpt-helper-prompt-item,
                .chatgpt-helper-conversation-item,
                .chatgpt-helper-folder-item,
                .chatgpt-helper-conversations-list,
                .chatgpt-helper-setting-section,
                .chatgpt-helper-setting-item,
                .chatgpt-helper-about-btn,
                .chatgpt-helper-export-grid .menu-item,
                .outline-item.user-query-node,
                .chatgpt-helper-empty-state,
                .chatgpt-helper-theme-block {
                    background: var(--gh-panel-card) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius) !important;
                    box-shadow: var(--gh-panel-card-shadow) !important;
                }

                :root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item,
                :root[data-gh-bg-enabled="true"] .outline-item.user-query-node,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-empty-state,
                :root[data-gh-bg-enabled="true"] .chatgpt-helper-theme-block {
                    background: var(--gh-panel-card-bg) !important;
                    border-color: var(--gh-panel-card-border) !important;
                    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);
                }

                .chatgpt-helper-prompt-item:hover,
                .chatgpt-helper-conversation-item:hover,
                .chatgpt-helper-folder-item:hover,
                .chatgpt-helper-setting-item:hover,
                .chatgpt-helper-about-btn:hover,
                .chatgpt-helper-export-grid .menu-item:hover,
                .outline-item:hover {
                    background: var(--gh-panel-card-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;
                    box-shadow: var(--gh-panel-elevated-shadow) !important;
                    transform: translateY(-1px);
                }

                .chatgpt-helper-prompt-item.selected,
                .chatgpt-helper-folder-item.default,
                .chatgpt-helper-folder-item.expanded,
                .chatgpt-helper-conversation-item.pinned,
                .outline-item.sync-highlight,
                .outline-item.highlight,
                .outline-item.matched,
                .outline-toolbar-btn.active,
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 82%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;
                    color: var(--gh-text) !important;
                    box-shadow:
                        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 80%),
                        var(--gh-panel-card-shadow) !important;
                }

                .outline-toolbar-btn.active,
                .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {
                    color: #ffffff !important;
                    background: color-mix(in srgb, var(--gh-primary), transparent 10%) !important;
                }

                .chatgpt-helper-prompt-title,
                .chatgpt-helper-folder-name,
                .chatgpt-helper-setting-item-label,
                .chatgpt-helper-about-name,
                .chatgpt-helper-theme-block-title {
                    color: var(--gh-text) !important;
                    letter-spacing: 0;
                }

                .chatgpt-helper-prompt-content,
                .chatgpt-helper-setting-item-desc,
                .chatgpt-helper-folder-count,
                .chatgpt-helper-about-tagline,
                .chatgpt-helper-about-section-text {
                    color: var(--gh-text-secondary) !important;
                }

                .chatgpt-helper-conversation-pin {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 20%);
                    opacity: 0.84;
                }

                .chatgpt-helper-conversation-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin-top: 6px;
                }

                .chatgpt-helper-conversation-tag {
                    display: inline-flex;
                    align-items: center;
                    max-width: 100%;
                    min-height: 18px;
                    padding: 2px 6px;
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 78%);
                    border: 1px solid color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 64%);
                    color: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), var(--gh-text) 38%);
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .chatgpt-helper-category-tag,
                .user-query-badge,
                .heading-level-badge {
                    background: var(--gh-control-bg) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    color: var(--gh-text-secondary) !important;
                    border-radius: 999px !important;
                    font-weight: 650;
                }

                .chatgpt-helper-category-tag:hover,
                .user-query-badge:hover,
                .heading-level-badge:hover {
                    background: var(--gh-control-bg-hover) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-category-tag.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 8px 18px color-mix(in srgb, var(--gh-primary), transparent 80%) !important;
                }

                .outline-list {
                    gap: 3px;
                }

                .outline-item {
                    min-height: 32px;
                    border-radius: var(--gh-row-radius) !important;
                    border: 1px solid transparent !important;
                    color: var(--gh-text) !important;
                }

                .outline-item-toggle,
                .outline-item-copy-btn {
                    color: var(--gh-text-secondary) !important;
                }

                .outline-item-toggle:hover,
                .outline-item-copy-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 88%) !important;
                    color: var(--gh-primary) !important;
                }

                .chatgpt-helper-setting-section {
                    padding: 0 !important;
                    overflow: hidden;
                    margin-bottom: 12px !important;
                }

                .chatgpt-helper-setting-section-header {
                    background: transparent !important;
                    border-bottom: 1px solid var(--gh-panel-muted-line) !important;
                }

                .chatgpt-helper-setting-item {
                    margin: 8px 0 !important;
                    padding: 12px !important;
                }

                .setting-toggle {
                    background: color-mix(in srgb, var(--gh-border), transparent 24%) !important;
                    border: 1px solid var(--gh-control-border) !important;
                }

                .setting-toggle.active {
                    background: var(--gh-primary) !important;
                    border-color: var(--gh-primary) !important;
                }

                .chatgpt-helper-toggle {
                    width: 44px;
                    height: 24px;
                    padding: 2px;
                    border: 1px solid var(--gh-control-border);
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-border), transparent 24%);
                    cursor: pointer;
                    position: relative;
                    outline: none;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-toggle.active {
                    background: var(--gh-primary);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 10%);
                    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .chatgpt-helper-toggle-knob {
                    width: 18px;
                    height: 18px;
                    border-radius: 999px;
                    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #f8fafc) 10%);
                    box-shadow: 0 1px 4px rgba(2, 6, 23, 0.22);
                    pointer-events: none;
                    transition: transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-toggle.active .chatgpt-helper-toggle-knob {
                    transform: translateX(20px);
                }

                #chatgpt-helper-theme-modal {
                    background: color-mix(in srgb, #020617, transparent 20%) !important;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .chatgpt-helper-theme-modal-dialog,
                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog,
                .chatgpt-helper-about-dialog,
                body[data-gh-mode="dark"] .chatgpt-helper-about-dialog {
                    background: var(--gh-panel-surface) !important;
                    color: var(--gh-text) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 14px !important;
                    box-shadow: 0 30px 90px rgba(2, 6, 23, 0.48), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 88%) !important;
                }

                .chatgpt-helper-prompt-dialog-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    background: color-mix(in srgb, #020617, transparent 22%);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }

                .chatgpt-helper-prompt-dialog {
                    width: min(500px, calc(100vw - 32px));
                    max-height: min(680px, calc(100vh - 32px));
                    overflow: auto;
                    padding: 18px;
                    background: var(--gh-panel-surface);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: 14px;
                    box-shadow: 0 28px 80px rgba(2, 6, 23, 0.42), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 86%);
                }

                .chatgpt-helper-compact-dialog {
                    width: min(420px, calc(100vw - 32px));
                }

                .chatgpt-helper-prompt-dialog-title {
                    margin: 0 0 14px;
                    color: var(--gh-text);
                    font-size: 16px;
                    font-weight: 750;
                    line-height: 1.35;
                    letter-spacing: 0;
                }

                .chatgpt-helper-prompt-dialog-field {
                    width: 100%;
                    min-height: 38px;
                    margin: 0 0 10px;
                    padding: 10px 11px;
                    box-sizing: border-box;
                    border-radius: var(--gh-control-radius);
                    border: 1px solid var(--gh-input-border);
                    background: var(--gh-input-bg);
                    color: var(--gh-text);
                    font-size: 14px;
                    line-height: 1.4;
                    outline: none;
                    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), background 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-prompt-dialog-field::placeholder {
                    color: color-mix(in srgb, var(--gh-text-secondary), transparent 12%);
                }

                .chatgpt-helper-prompt-dialog-field:focus {
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);
                    box-shadow: 0 0 0 3px var(--gh-focus-ring);
                }

                .chatgpt-helper-prompt-dialog-textarea {
                    min-height: 132px;
                    resize: vertical;
                    font-family: inherit;
                }

                .chatgpt-helper-prompt-dialog-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    margin-top: 4px;
                }

                .chatgpt-helper-prompt-dialog-btn {
                    min-height: 36px;
                    padding: 0 14px;
                    border-radius: var(--gh-control-radius);
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 700;
                    border: 1px solid var(--gh-control-border);
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-prompt-dialog-btn.secondary {
                    background: var(--gh-control-bg);
                    color: var(--gh-text-secondary);
                }

                .chatgpt-helper-prompt-dialog-btn.primary {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 36%);
                    color: #ffffff;
                    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%);
                }

                .chatgpt-helper-prompt-dialog-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: var(--gh-panel-card-shadow);
                }

                .chatgpt-helper-prompt-dialog-btn.secondary:hover {
                    background: var(--gh-control-bg-hover);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);
                    color: var(--gh-text);
                }

                .chatgpt-helper-prompt-dialog-btn.primary:hover {
                    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 64%);
                    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%);
                }

                .chatgpt-helper-context-menu {
                    z-index: 10001;
                    min-width: 168px;
                    padding: 5px;
                    background: var(--gh-panel-card);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: var(--gh-control-radius);
                    box-shadow: var(--gh-panel-elevated-shadow);
                    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                }

                .chatgpt-helper-context-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    min-height: 32px;
                    padding: 0 10px;
                    border-radius: 7px;
                    color: var(--gh-text-secondary);
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1;
                    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-context-menu-item:hover {
                    background: var(--gh-control-bg-hover);
                    color: var(--gh-text);
                }

                .chatgpt-helper-context-menu-item.danger {
                    color: color-mix(in srgb, var(--gh-danger), var(--gh-text-secondary) 30%);
                }

                .chatgpt-helper-context-menu-item.danger:hover {
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%);
                    color: var(--gh-danger);
                }

                .chatgpt-helper-toast {
                    position: fixed;
                    left: 50%;
                    bottom: 20px;
                    z-index: 10120;
                    max-width: min(420px, calc(100vw - 32px));
                    padding: 10px 14px;
                    transform: translateX(-50%);
                    background: var(--gh-panel-card);
                    color: var(--gh-text);
                    border: 1px solid var(--gh-panel-line);
                    border-radius: var(--gh-control-radius);
                    box-shadow: var(--gh-panel-elevated-shadow);
                    font-size: 13px;
                    font-weight: 650;
                    line-height: 1.35;
                    text-align: center;
                    animation: fadeIn 0.2s var(--gh-fast-ease);
                    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);
                }

                .chatgpt-helper-loading-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: color-mix(in srgb, #020617, transparent 18%);
                    color: var(--gh-text);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .chatgpt-helper-loading-spinner {
                    width: 34px;
                    height: 34px;
                    margin-bottom: 14px;
                    border-radius: 999px;
                    border: 3px solid color-mix(in srgb, var(--gh-primary), transparent 78%);
                    border-top-color: color-mix(in srgb, var(--gh-primary), #ffffff 18%);
                    animation: ghSpin 0.9s linear infinite;
                }

                .chatgpt-helper-loading-text {
                    margin-bottom: 6px;
                    font-size: 15px;
                    font-weight: 700;
                    color: #ffffff;
                }

                .chatgpt-helper-loading-hint {
                    margin-bottom: 14px;
                    color: rgba(255, 255, 255, 0.72);
                    font-size: 12px;
                }

                .chatgpt-helper-loading-stop-btn {
                    min-height: 34px;
                    padding: 0 14px;
                    border-radius: var(--gh-control-radius);
                    border: 1px solid color-mix(in srgb, #ffffff, transparent 72%);
                    background: color-mix(in srgb, #ffffff, transparent 90%);
                    color: #ffffff;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease);
                }

                .chatgpt-helper-loading-stop-btn:hover {
                    background: color-mix(in srgb, var(--gh-primary), transparent 78%);
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 32%);
                    transform: translateY(-1px);
                }

                @keyframes ghSpin {
                    to { transform: rotate(360deg); }
                }

                .chatgpt-helper-theme-modal-header,
                .chatgpt-helper-about-header {
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-theme-side,
                .chatgpt-helper-theme-preset-grid,
                .chatgpt-helper-theme-upload,
                .chatgpt-helper-theme-row,
                .chatgpt-helper-theme-preview,
                .chatgpt-helper-about-section,
                .chatgpt-helper-about-section.soft {
                    background: var(--gh-panel-card) !important;
                    border-color: var(--gh-panel-line) !important;
                    border-radius: var(--gh-card-radius) !important;
                }

                .chatgpt-helper-theme-segment {
                    background: var(--gh-control-bg) !important;
                    border-color: var(--gh-control-border) !important;
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-theme-segment button {
                    color: var(--gh-text-secondary) !important;
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                    color: #ffffff !important;
                }

                .chatgpt-helper-theme-preset {
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-theme-preset.active {
                    box-shadow:
                        0 0 0 2px var(--gh-panel-surface),
                        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 20%),
                        var(--gh-panel-card-shadow) !important;
                }

                #chatgpt-helper-theme-modal {
                    padding: 18px !important;
                    background: color-mix(in srgb, #020617, transparent 22%) !important;
                    backdrop-filter: blur(8px) saturate(1.02) !important;
                    -webkit-backdrop-filter: blur(8px) saturate(1.02) !important;
                }

                .chatgpt-helper-theme-modal-dialog,
                body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                    width: min(1040px, calc(100vw - 32px)) !important;
                    height: min(760px, calc(100vh - 32px)) !important;
                    background: var(--gh-panel-surface) !important;
                    color: var(--gh-text) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 14px !important;
                    box-shadow: 0 26px 72px color-mix(in srgb, #020617, transparent 52%) !important;
                }

                .chatgpt-helper-theme-modal-header {
                    height: 52px !important;
                    min-height: 52px !important;
                    padding: 0 14px 0 16px !important;
                    background: var(--gh-panel-subtle) !important;
                    border-bottom: 1px solid var(--gh-panel-line) !important;
                }

                .chatgpt-helper-theme-modal-title {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    min-width: 0;
                    color: var(--gh-text);
                    font-size: 15px;
                    font-weight: 750;
                    line-height: 1;
                    letter-spacing: 0;
                }

                .chatgpt-helper-theme-modal-title-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 16%);
                    flex: 0 0 auto;
                }

                .chatgpt-helper-theme-modal-close {
                    width: 32px !important;
                    height: 32px !important;
                    padding: 0 !important;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--gh-control-radius) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text-secondary) !important;
                    box-shadow: none !important;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-modal-close:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 44%) !important;
                    color: var(--gh-text) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-modal-close:focus-visible,
                .chatgpt-helper-theme-launch-btn:focus-visible,
                .chatgpt-helper-theme-segment button:focus-visible,
                .chatgpt-helper-theme-preset:focus-visible,
                .chatgpt-helper-theme-row input:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                .chatgpt-helper-theme-modal-body {
                    grid-template-columns: minmax(420px, 1fr) minmax(340px, 420px) !important;
                    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 24%) !important;
                    overflow: hidden !important;
                }

                .chatgpt-helper-theme-main {
                    padding: 14px 18px 18px 16px !important;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    min-width: 0;
                    overflow: auto !important;
                    scrollbar-gutter: stable;
                }

                .chatgpt-helper-theme-workbench-preview {
                    padding: 14px !important;
                    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 10%) !important;
                    border-left: 1px solid var(--gh-panel-line) !important;
                    overflow: auto !important;
                    scrollbar-gutter: stable;
                }

                .chatgpt-helper-theme-main,
                .chatgpt-helper-theme-workbench-preview,
                .chatgpt-helper-theme-modal-body {
                    scrollbar-width: thin;
                    scrollbar-color: color-mix(in srgb, var(--gh-text-secondary), transparent 48%) transparent;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-button,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-button,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-button {
                    width: 0;
                    height: 0;
                    display: none;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-track,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-track,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-track {
                    background: transparent;
                }

                .chatgpt-helper-theme-main::-webkit-scrollbar-thumb,
                .chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-thumb,
                .chatgpt-helper-theme-modal-body::-webkit-scrollbar-thumb {
                    border-radius: 999px;
                    background: color-mix(in srgb, var(--gh-text-secondary), transparent 54%);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }

                .chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block,
                .chatgpt-helper-theme-workbench-preview {
                    margin: 0 !important;
                    border-radius: 10px !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block {
                    padding: 13px !important;
                    background: color-mix(in srgb, var(--gh-panel-card), transparent 8%) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                }

                .chatgpt-helper-theme-block-title {
                    margin: 0 0 10px !important;
                    color: var(--gh-text);
                    font-size: 12px !important;
                    font-weight: 750 !important;
                    line-height: 1.2;
                    letter-spacing: 0;
                }

                .chatgpt-helper-theme-segment {
                    width: 100%;
                    height: 36px;
                    display: grid !important;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    padding: 3px;
                    gap: 3px;
                    border-radius: 9px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    overflow: visible !important;
                }

                .chatgpt-helper-theme-segment button {
                    min-width: 0;
                    padding: 0 10px !important;
                    border: 0 !important;
                    border-radius: 7px !important;
                    background: transparent !important;
                    color: var(--gh-text-secondary) !important;
                    font-size: 12px !important;
                    font-weight: 700 !important;
                    line-height: 1;
                    white-space: nowrap;
                    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-segment button:hover {
                    background: var(--gh-control-bg-hover) !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-theme-segment button.active {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%) !important;
                    color: #ffffff !important;
                    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                }

                .chatgpt-helper-theme-preset-grid {
                    display: flex !important;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px !important;
                    padding: 0 !important;
                    background: transparent !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    overflow: visible !important;
                    isolation: isolate;
                }

                .chatgpt-helper-theme-preset {
                    flex: 0 0 58px;
                    width: 58px !important;
                    height: 34px !important;
                    min-width: 0;
                    padding: 0 !important;
                    border-radius: 8px !important;
                    border: 1px solid color-mix(in srgb, currentColor, var(--gh-panel-card) 40%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 82%) !important;
                    transform: none !important;
                    position: relative;
                    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), opacity 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-preset:hover {
                    transform: none !important;
                    opacity: 0.92;
                }

                .chatgpt-helper-theme-preset.active {
                    z-index: 2;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 8%) !important;
                    box-shadow:
                        0 0 0 2px var(--gh-panel-card),
                        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 36%) !important;
                }

                .chatgpt-helper-theme-preset.is-original {
                    flex-basis: 132px;
                    width: 132px !important;
                    min-width: 0 !important;
                    max-width: 160px;
                    padding: 0 12px !important;
                    color: var(--gh-text) !important;
                    background: linear-gradient(
                        135deg,
                        color-mix(in srgb, var(--gh-panel-card), var(--gh-primary) 10%),
                        color-mix(in srgb, var(--gh-panel-subtle), var(--gh-text-secondary) 12%)
                    ) !important;
                    font-size: 11px !important;
                    font-weight: 750 !important;
                    letter-spacing: 0 !important;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .chatgpt-helper-theme-upload {
                    height: 146px !important;
                    min-height: 0 !important;
                    padding: 12px !important;
                    border: 1px dashed color-mix(in srgb, var(--gh-control-border), var(--gh-primary) 14%) !important;
                    border-radius: 10px !important;
                    background: var(--gh-control-bg) !important;
                    box-shadow: none !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-upload.dragging {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-control-bg) 82%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-upload-bg {
                    filter: brightness(0.72) saturate(0.95) !important;
                    opacity: 0.9 !important;
                }

                .chatgpt-helper-theme-upload.has-image::after {
                    background: linear-gradient(
                        180deg,
                        color-mix(in srgb, #020617, transparent 58%) 0%,
                        color-mix(in srgb, #020617, transparent 32%) 100%
                    ) !important;
                }

                .chatgpt-helper-theme-upload-content {
                    gap: 6px !important;
                }

                .chatgpt-helper-theme-upload-icon {
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);
                }

                .chatgpt-helper-theme-upload-title {
                    color: var(--gh-text);
                    font-size: 13px;
                    font-weight: 750;
                    line-height: 1.25;
                }

                .chatgpt-helper-theme-upload-hint {
                    color: var(--gh-text-secondary);
                    font-size: 11px;
                    line-height: 1.25;
                }

                .chatgpt-helper-theme-upload-actions {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 7px;
                    margin-top: 4px;
                }

                .chatgpt-helper-theme-launch-btn {
                    min-height: 31px !important;
                    padding: 0 10px !important;
                    border-radius: var(--gh-control-radius) !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none !important;
                    font-size: 12px !important;
                    font-weight: 700 !important;
                    letter-spacing: 0 !important;
                    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;
                }

                .chatgpt-helper-theme-launch-btn:hover {
                    background: var(--gh-control-bg-hover) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-theme-launch-btn:disabled {
                    opacity: 0.42;
                    cursor: default;
                }

                .chatgpt-helper-theme-row {
                    display: grid !important;
                    grid-template-columns: minmax(150px, 1fr) minmax(192px, 242px);
                    align-items: center !important;
                    min-height: 42px;
                    margin: 8px 0 0 !important;
                    padding: 8px 10px !important;
                    gap: 10px !important;
                    border-radius: 9px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: color-mix(in srgb, var(--gh-control-bg), transparent 8%) !important;
                    box-shadow: none !important;
                }

                .chatgpt-helper-theme-row > span:first-child {
                    min-width: 0;
                    color: var(--gh-text);
                    font-size: 12px;
                    font-weight: 650;
                    line-height: 1.3;
                }

                .chatgpt-helper-theme-range-control {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 42px;
                    align-items: center;
                    gap: 8px;
                    justify-self: end;
                    width: min(100%, 242px);
                }

                .chatgpt-helper-theme-value {
                    min-width: 42px;
                    color: var(--gh-text-secondary);
                    font-size: 11px;
                    font-weight: 700;
                    text-align: right;
                    font-variant-numeric: tabular-nums;
                }

                .chatgpt-helper-theme-row input[type="range"] {
                    width: 100% !important;
                    height: 4px;
                    accent-color: var(--gh-primary);
                    cursor: pointer;
                }

                .chatgpt-helper-theme-row input[type="range"]:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                }

                .chatgpt-helper-theme-row input[type="checkbox"] {
                    justify-self: end;
                    width: 40px !important;
                    height: 22px !important;
                    border: 1px solid var(--gh-control-border) !important;
                    background: color-mix(in srgb, var(--gh-border), transparent 28%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 90%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]::after {
                    top: 2px !important;
                    left: 2px !important;
                    width: 16px !important;
                    height: 16px !important;
                    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #ffffff) 10%) !important;
                    box-shadow: 0 1px 3px color-mix(in srgb, #020617, transparent 74%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked {
                    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 8%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;
                }

                .chatgpt-helper-theme-row input[type="checkbox"]:checked::after {
                    transform: translateX(18px) !important;
                }

                .chatgpt-helper-theme-preview {
                    width: 100%;
                    min-height: 328px !important;
                    max-height: min(430px, calc(100vh - 174px));
                    aspect-ratio: 4 / 3;
                    border-radius: 10px !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    background: var(--gh-panel-card) !important;
                    box-shadow: none !important;
                    overflow: hidden !important;
                    isolation: isolate;
                }

                .chatgpt-helper-theme-preview-bg {
                    z-index: 0;
                    background-position: center 42% !important;
                    filter: blur(calc(var(--gh-preview-blur, 0px) + 1px)) brightness(0.62) saturate(0.9) !important;
                    opacity: 0.92 !important;
                }

                .chatgpt-helper-theme-preview.has-bg::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    background:
                        linear-gradient(90deg, color-mix(in srgb, #020617, transparent 40%) 0%, transparent 34%),
                        linear-gradient(180deg, transparent 42%, color-mix(in srgb, #020617, transparent 34%) 100%);
                }

                .chatgpt-helper-theme-preview-inner {
                    grid-template-columns: 82px minmax(0, 1fr) !important;
                    min-height: 100% !important;
                    height: 100%;
                    z-index: 1;
                }

                .chatgpt-helper-theme-preview-nav {
                    padding: 12px 8px !important;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-preview-chat {
                    padding: 13px !important;
                    gap: 10px !important;
                    min-width: 0;
                    overflow: hidden;
                }

                .chatgpt-helper-theme-preview-msg {
                    border-radius: 10px !important;
                    padding: 9px 10px !important;
                    color: var(--gh-text);
                    font-size: 12px !important;
                    line-height: 1.35 !important;
                    box-shadow: none !important;
                    max-width: min(84%, 290px) !important;
                    overflow-wrap: anywhere;
                }

                .chatgpt-helper-theme-preview-input {
                    width: calc(100% - 10px);
                    height: 33px !important;
                    margin: auto 5px 8px;
                    border-radius: 10px !important;
                    background: var(--gh-input-bg) !important;
                    border: 1px solid var(--gh-input-border) !important;
                    box-shadow: 0 0 0 3px color-mix(in srgb, #020617, transparent 88%) !important;
                }

                @media (max-width: 920px) {
                    .chatgpt-helper-theme-modal-dialog,
                    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                        height: min(820px, calc(100vh - 24px)) !important;
                    }

                    .chatgpt-helper-theme-modal-body {
                        grid-template-columns: 1fr !important;
                        overflow: auto !important;
                    }

                    .chatgpt-helper-theme-workbench-preview {
                        border-left: 0 !important;
                        border-top: 1px solid var(--gh-panel-line) !important;
                    }

                    .chatgpt-helper-theme-workbench-preview .chatgpt-helper-theme-block-title {
                        position: static;
                    }
                }

                @media (max-width: 560px) {
                    #chatgpt-helper-theme-modal {
                        padding: 10px !important;
                    }

                    .chatgpt-helper-theme-modal-dialog,
                    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {
                        width: calc(100vw - 20px) !important;
                        height: calc(100vh - 20px) !important;
                    }

                    .chatgpt-helper-theme-main,
                    .chatgpt-helper-theme-workbench-preview {
                        padding: 10px !important;
                    }

                    .chatgpt-helper-theme-row {
                        align-items: flex-start;
                        grid-template-columns: 1fr;
                    }

                    .chatgpt-helper-theme-range-control {
                        width: 100%;
                        flex-basis: auto;
                        grid-template-columns: minmax(0, 1fr) 42px;
                    }

                    .chatgpt-helper-theme-preview-inner {
                        grid-template-columns: 64px minmax(0, 1fr) !important;
                    }
                }

                .chatgpt-helper-export-panel,
                .chatgpt-helper-export-container,
                .chatgpt-helper-export-host {
                    background: transparent !important;
                    color: var(--gh-text) !important;
                }

                .chatgpt-helper-export-header {
                    min-height: 46px;
                    padding: 10px 12px !important;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px !important;
                    font-weight: 700 !important;
                    color: var(--gh-text) !important;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
                    box-sizing: border-box;
                }

                .chatgpt-helper-export-header-title {
                    line-height: 1;
                }

                .chatgpt-helper-export-host :is(button, input, select, textarea),
                [data-gh-exporter-host="true"] :is(button, input, select, textarea) {
                    border-radius: var(--gh-control-radius) !important;
                }

                .chatgpt-helper-export-grid {
                    padding: 12px 14px 18px !important;
                    gap: 7px !important;
                    grid-template-columns: minmax(0, 1fr) !important;
                    align-content: start !important;
                    grid-auto-rows: minmax(50px, auto) !important;
                }

                .chatgpt-helper-export-grid > :is(.row-full, .row-half) {
                    grid-column: auto !important;
                }

                .chatgpt-helper-export-grid > :is(.row-full, .row-half):not(.menu-item) {
                    display: contents !important;
                    grid-column: auto !important;
                }

                .chatgpt-helper-export-grid .menu-item {
                    min-height: 50px !important;
                    height: auto !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    margin: 0 !important;
                    padding: 0 13px !important;
                    gap: 11px !important;
                    border-radius: 9px !important;
                    border: 1px solid color-mix(in srgb, var(--gh-panel-line), transparent 20%) !important;
                    background: color-mix(in srgb, var(--gh-panel-card), transparent 18%) !important;
                    color: var(--gh-text) !important;
                    box-shadow: none !important;
                    text-align: left !important;
                    overflow: hidden;
                    box-sizing: border-box !important;
                    transform: none !important;
                }

                .chatgpt-helper-export-grid .menu-item:hover {
                    background: color-mix(in srgb, var(--gh-panel-card-hover), transparent 12%) !important;
                    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%) !important;
                    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;
                    transform: none !important;
                }

                .chatgpt-helper-export-grid .menu-item-icon {
                    width: 24px !important;
                    height: 24px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    flex: 0 0 24px !important;
                    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%) !important;
                }

                .chatgpt-helper-export-grid .menu-item-icon svg,
                .chatgpt-helper-export-grid .menu-item > svg {
                    width: 17px !important;
                    height: 17px !important;
                    color: currentColor !important;
                    flex: 0 0 auto !important;
                }

                .chatgpt-helper-export-grid .menu-item-label {
                    min-width: 0 !important;
                    flex: 1 1 auto !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    color: var(--gh-text) !important;
                    font-size: 14px !important;
                    font-weight: 680 !important;
                    line-height: 1.25 !important;
                }

                .scroll-nav-container,
                body[data-gh-mode="dark"] .scroll-nav-container {
                    gap: 8px;
                    padding: 10px 12px;
                    background: var(--gh-panel-subtle) !important;
                    border-top: 1px solid var(--gh-panel-line) !important;
                }

                .scroll-nav-btn {
                    min-height: 36px;
                    padding: 8px 10px;
                    font-weight: 700;
                    gap: 6px;
                }

                .scroll-nav-btn[style*="opacity: 0.4"],
                .chatgpt-helper-quick-btn.disabled,
                .chatgpt-helper-quick-btn[disabled],
                .prompt-panel-btn[disabled] {
                    opacity: 0.38 !important;
                    cursor: default !important;
                    box-shadow: none !important;
                }

                .scroll-nav-btn[style*="opacity: 0.4"]:hover,
                .chatgpt-helper-quick-btn.disabled:hover,
                .chatgpt-helper-quick-btn[disabled]:hover,
                .prompt-panel-btn[disabled]:hover {
                    transform: none !important;
                    border-color: var(--gh-control-border) !important;
                    background: var(--gh-control-bg) !important;
                }

                .chatgpt-helper-quick-buttons,
                body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {
                    gap: 8px;
                    padding: 7px;
                    background: color-mix(in srgb, var(--gh-panel-surface), transparent 8%) !important;
                    border: 1px solid var(--gh-panel-line) !important;
                    border-radius: 16px !important;
                    box-shadow: var(--gh-panel-elevated-shadow) !important;
                    backdrop-filter: blur(18px) saturate(1.04);
                    -webkit-backdrop-filter: blur(18px) saturate(1.04);
                }

                .chatgpt-helper-btn-divider {
                    height: 1px;
                    margin: 2px 6px;
                    background: var(--gh-panel-muted-line) !important;
                }

                .chatgpt-helper-prompt-actions .delete-btn:hover,
                .chatgpt-helper-folder-delete-btn:hover,
                .chatgpt-helper-batch-toolbar-btn.danger:hover {
                    color: var(--gh-danger) !important;
                    border-color: color-mix(in srgb, var(--gh-danger), transparent 28%) !important;
                    background: color-mix(in srgb, var(--gh-danger), transparent 90%) !important;
                }

                #chatgpt-helper-right button:focus-visible,
                #chatgpt-helper-right input:focus-visible,
                #chatgpt-helper-right textarea:focus-visible,
                #chatgpt-helper-right select:focus-visible,
                .chatgpt-helper-quick-btn:focus-visible {
                    outline: 2px solid var(--gh-focus-ring) !important;
                    outline-offset: 2px;
                }

                @media (prefers-reduced-motion: reduce) {
                    #chatgpt-helper-right,
                    #chatgpt-helper-right *,
                    .chatgpt-helper-quick-buttons,
                    .chatgpt-helper-quick-buttons * {
                        transition-duration: 0.01ms !important;
                        animation-duration: 0.01ms !important;
                    }
                }

                /* 响应式调整中栏 - 通过 JS 动态更新 */
            `;
          try {
            if (document.head) {
              document.head.appendChild(style);
            } else {
              const waitForHead = () => {
                if (document.head) {
                  document.head.appendChild(style);
                } else {
                  setTimeout(waitForHead, 100);
                }
              };
              waitForHead();
            }
          } catch (e) {
            console.error("[ChatGPT Helper] 添加样式到 head 错误:", e);
          }
        } catch (e) {
          console.error("[ChatGPT Helper] createStyles 错误:", e);
          console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
        }
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Layout module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      createLayout() {
        try {
          const existingPanel = document.getElementById("chatgpt-helper-right");
          if (existingPanel) {
            this.panel = existingPanel;
            try {
              this.initResizeHandle();
            } catch (e) {
              console.error("[ChatGPT Helper] initResizeHandle 错误:", e);
            }
            return;
          }
          const rightBar = createElement("div", {
            id: "chatgpt-helper-right",
            className: this.isCollapsed ? "collapsed" : ""
          });
          if (document.body) {
            try {
              document.body.appendChild(rightBar);
              this.panel = rightBar;
              try {
                this.initResizeHandle();
              } catch (e) {
                console.error("[ChatGPT Helper] initResizeHandle 错误:", e);
              }
            } catch (e) {
              console.error("[ChatGPT Helper] 添加面板到 body 错误:", e);
            }
          } else {
            let checkBodyInterval = null;
            const checkBody = () => {
              try {
                if (document.body) {
                  document.body.appendChild(rightBar);
                  this.panel = rightBar;
                  try {
                    this.initResizeHandle();
                  } catch (e) {
                    console.error("[ChatGPT Helper] initResizeHandle 错误:", e);
                  }
                  if (checkBodyInterval) {
                    clearInterval(checkBodyInterval);
                    checkBodyInterval = null;
                  }
                }
              } catch (e) {
                console.error("[ChatGPT Helper] checkBody 错误:", e);
              }
            };
            checkBodyInterval = setInterval(checkBody, 100);
            setTimeout(() => {
              if (checkBodyInterval) {
                clearInterval(checkBodyInterval);
                checkBodyInterval = null;
              }
              try {
                if (!this.panel && document.body) {
                  document.body.appendChild(rightBar);
                  this.panel = rightBar;
                  try {
                    this.initResizeHandle();
                  } catch (e) {
                    console.error("[ChatGPT Helper] initResizeHandle 错误:", e);
                  }
                }
              } catch (e) {
                console.error("[ChatGPT Helper] 超时后添加面板错误:", e);
              }
            }, 5e3);
          }
          setTimeout(() => {
            try {
              if (this.adjustChatGPTLayout) {
                this.adjustChatGPTLayout();
              }
            } catch (e) {
              console.error("[ChatGPT Helper] adjustChatGPTLayout 错误:", e);
            }
          }, 500);
        } catch (e) {
          console.error("[ChatGPT Helper] createLayout 错误:", e);
          console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
        }
      },
      adjustChatGPTLayout() {
        const updateLayout = () => {
          const marginValue = this.isCollapsed ? 0 : this.settings.panelWidth;
          try {
            document.documentElement.style.setProperty("--gh-panel-margin-right", `${marginValue}px`);
          } catch (e) {
          }
          let layoutStyle = document.getElementById("chatgpt-helper-layout-style");
          if (!layoutStyle) {
            layoutStyle = document.createElement("style");
            layoutStyle.id = "chatgpt-helper-layout-style";
            layoutStyle.textContent = `
                        /* 只调整主容器的右边距，为右侧面板留出空间（由 CSS 变量驱动） */
                        main,
                        [role="main"] {
                            margin-right: var(--gh-panel-margin-right, 0px) !important;
                            transition: margin-right 0.3s ease !important;
                        }
                        
                        /* 确保页面不横向滚动 */
                        body {
                            overflow-x: hidden !important;
                        }
                    `;
            document.head.appendChild(layoutStyle);
          }
        };
        updateLayout();
        setTimeout(updateLayout, 500);
        setTimeout(updateLayout, 1500);
        setTimeout(updateLayout, 3e3);
        this.updateLayout = updateLayout;
      },
      initResizeHandle() {
        if (!this.panel) return;
        let handle = this.panel.querySelector("#chatgpt-helper-resize-handle");
        if (!handle) {
          handle = document.createElement("div");
          handle.id = "chatgpt-helper-resize-handle";
          this.panel.appendChild(handle);
        }
        let startX = 0;
        let startWidth = 0;
        let rafId = null;
        let latestClientX = 0;
        let lastLayoutUpdateTs = 0;
        const layoutUpdateIntervalMs = 50;
        const onMouseMove = (e) => {
          if (!this.panel) return;
          latestClientX = e.clientX;
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const delta = startX - latestClientX;
            let newWidth = startWidth + delta;
            const minWidth = 220;
            const maxWidth = 640;
            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;
            this.settings.panelWidth = newWidth;
            this.panel.style.width = `${newWidth}px`;
            if (this.updateLayout) {
              const now = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
              if (now - lastLayoutUpdateTs >= layoutUpdateIntervalMs) {
                lastLayoutUpdateTs = now;
                this.updateLayout();
              }
            }
          });
        };
        const onMouseUp = () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          document.body.style.userSelect = "";
          document.body.classList.remove("gh-resizing");
          if (this.panel) this.panel.classList.remove("gh-resizing");
          if (this.updateLayout) this.updateLayout();
          this.saveSettings();
        };
        handle.addEventListener("mousedown", (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          startX = e.clientX;
          latestClientX = e.clientX;
          startWidth = this.panel ? this.panel.getBoundingClientRect().width : this.settings.panelWidth;
          document.body.style.userSelect = "none";
          document.body.classList.add("gh-resizing");
          this.panel.classList.add("gh-resizing");
          lastLayoutUpdateTs = 0;
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });
      },
      initTabResponsiveSpacing(tabsContainer) {
        if (!tabsContainer) return;
        if (this.tabSpacingObserver) {
          this.tabSpacingObserver.disconnect();
          this.tabSpacingObserver = null;
        }
        if (this.panelSpacingObserver) {
          this.panelSpacingObserver.disconnect();
          this.panelSpacingObserver = null;
        }
        const updateSpacing = () => {
          const width = tabsContainer.getBoundingClientRect().width;
          if (width < 300) {
            const ratio = Math.max(0.3, (width - 200) / 100);
            tabsContainer.style.setProperty("--tab-padding-h", `${Math.max(4, 8 * ratio)}px`);
            tabsContainer.style.setProperty("--tab-padding-v", `${Math.max(5, 7 * ratio)}px`);
            tabsContainer.style.setProperty("--tab-gap", `${Math.max(2, 5 * ratio)}px`);
            tabsContainer.style.setProperty("--tab-margin", "0px");
          } else if (width < 400) {
            const ratio = 0.75 + (width - 300) / 400;
            tabsContainer.style.setProperty("--tab-padding-h", `${8 * ratio}px`);
            tabsContainer.style.setProperty("--tab-padding-v", `${7 * ratio}px`);
            tabsContainer.style.setProperty("--tab-gap", `${5 * ratio}px`);
            tabsContainer.style.setProperty("--tab-margin", "0px");
          } else {
            tabsContainer.style.setProperty("--tab-padding-h", "8px");
            tabsContainer.style.setProperty("--tab-padding-v", "7px");
            tabsContainer.style.setProperty("--tab-gap", "5px");
            tabsContainer.style.setProperty("--tab-margin", "0px");
          }
        };
        updateSpacing();
        let spacingRafId = null;
        const scheduleUpdateSpacing = () => {
          if (spacingRafId) return;
          spacingRafId = requestAnimationFrame(() => {
            spacingRafId = null;
            updateSpacing();
          });
        };
        this.tabSpacingObserver = new ResizeObserver(() => {
          scheduleUpdateSpacing();
        });
        this.tabSpacingObserver.observe(tabsContainer);
        if (this.panel) {
          this.panelSpacingObserver = new ResizeObserver(() => {
            scheduleUpdateSpacing();
          });
          this.panelSpacingObserver.observe(this.panel);
        }
      },
      initHeaderResponsiveSpacing(headerEl) {
        if (!headerEl) return;
        if (this.headerSpacingObserver) {
          this.headerSpacingObserver.disconnect();
          this.headerSpacingObserver = null;
        }
        const updateSpacing = () => {
          try {
            const width = headerEl.getBoundingClientRect().width;
            const compact = width < 318;
            headerEl.classList.toggle("gh-compact", compact);
            if (width < 270) {
              headerEl.style.setProperty("--gh-header-btn-size", "22px");
              headerEl.style.setProperty("--gh-header-controls-gap", "2px");
              headerEl.style.setProperty("--gh-header-padding-h", "8px");
              headerEl.style.setProperty("--gh-header-padding-v", "9px");
              headerEl.style.setProperty("--gh-header-btn-font-size", "12px");
            } else if (width < 348) {
              headerEl.style.setProperty("--gh-header-btn-size", "24px");
              headerEl.style.setProperty("--gh-header-controls-gap", "2px");
              headerEl.style.setProperty("--gh-header-padding-h", "10px");
              headerEl.style.setProperty("--gh-header-padding-v", "10px");
              headerEl.style.setProperty("--gh-header-btn-font-size", "13px");
            } else if (width < 404) {
              headerEl.style.setProperty("--gh-header-btn-size", "26px");
              headerEl.style.setProperty("--gh-header-controls-gap", "3px");
              headerEl.style.setProperty("--gh-header-padding-h", "12px");
              headerEl.style.setProperty("--gh-header-padding-v", "11px");
              headerEl.style.setProperty("--gh-header-btn-font-size", "13px");
            } else {
              headerEl.style.removeProperty("--gh-header-btn-size");
              headerEl.style.removeProperty("--gh-header-controls-gap");
              headerEl.style.removeProperty("--gh-header-padding-h");
              headerEl.style.removeProperty("--gh-header-padding-v");
              headerEl.style.removeProperty("--gh-header-btn-font-size");
            }
          } catch (e) {
          }
        };
        updateSpacing();
        let headerSpacingRafId = null;
        const scheduleHeaderUpdateSpacing = () => {
          if (headerSpacingRafId) return;
          headerSpacingRafId = requestAnimationFrame(() => {
            headerSpacingRafId = null;
            updateSpacing();
          });
        };
        this.headerSpacingObserver = new ResizeObserver(() => scheduleHeaderUpdateSpacing());
        this.headerSpacingObserver.observe(headerEl);
      },
      updateCollapseButtonState() {
        const collapseBtn = document.getElementById("chatgpt-helper-collapse-btn");
        if (!collapseBtn) return;
        const nextTitle = this.isCollapsed ? this.t("expand") || "展开" : this.t("collapse");
        setButtonIcon(collapseBtn, this.isCollapsed ? "expand" : "collapse", { size: 16 });
        collapseBtn.title = nextTitle;
        collapseBtn.setAttribute("aria-label", nextTitle);
      },
      createUI() {
        if (!this.panel) return;
        clearElement(this.panel);
        const header = createElement("div", { id: "chatgpt-helper-header" });
        const title = createElement("div", { id: "chatgpt-helper-title" });
        title.appendChild(createHelperLogoNode({
          size: 18,
          className: "chatgpt-helper-icon-logo chatgpt-helper-header-logo",
          title: this.t("panelTitle") || "ChatGPT Helper"
        }));
        title.appendChild(createElement("span", {}, this.t("panelTitle")));
        const controls = createElement("div", { id: "chatgpt-helper-controls" });
        const themeBtn = createElement("button", {
          className: "chatgpt-helper-header-btn",
          title: "切换主题",
          id: "chatgpt-helper-header-theme-btn",
          type: "button",
          // 明确指定按钮类型，避免表单提交等意外行为
          "aria-label": "切换主题"
        });
        const isDark = document.body.dataset.ghMode === "dark" || /\bdark\b/i.test(document.body.className);
        setButtonIcon(themeBtn, isDark ? "sun" : "moon", { size: 15 });
        themeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          this.toggleTheme(e);
          return false;
        });
        const newChatBtn = createElement("button", {
          className: "chatgpt-helper-header-btn",
          title: "新标签页开启对话",
          id: "chatgpt-helper-header-newchat-btn",
          type: "button",
          "aria-label": "新标签页开启对话"
        });
        newChatBtn.appendChild(createSvgIconNode("plus", { size: 15 }));
        newChatBtn.addEventListener("click", () => {
          window.open("https://chatgpt.com", "_blank");
        });
        const refreshBtn = createElement("button", {
          className: "chatgpt-helper-header-btn",
          title: this.t("refresh"),
          type: "button",
          "aria-label": this.t("refresh")
        });
        refreshBtn.appendChild(createSvgIconNode("refresh", { size: 15 }));
        refreshBtn.addEventListener("click", () => {
          if (this.currentTab === "prompts") {
            this.refreshPromptList();
          } else if (this.currentTab === "outline") {
            this.refreshOutline();
          }
        });
        const collapseBtn = createElement("button", {
          className: "chatgpt-helper-header-btn",
          title: this.isCollapsed ? this.t("expand") || "展开" : this.t("collapse"),
          id: "chatgpt-helper-collapse-btn",
          type: "button",
          "aria-label": this.isCollapsed ? this.t("expand") || "展开" : this.t("collapse")
        });
        collapseBtn.appendChild(createSvgIconNode(this.isCollapsed ? "expand" : "collapse", { size: 16 }));
        collapseBtn.addEventListener("click", () => this.toggleCollapse());
        const settingsBtn = createElement("button", {
          className: "chatgpt-helper-header-btn",
          title: this.t("settingsTitle"),
          id: "chatgpt-helper-settings-btn",
          type: "button",
          "aria-label": this.t("settingsTitle")
        });
        settingsBtn.appendChild(createSvgIconNode("settings", { size: 15 }));
        settingsBtn.addEventListener("click", () => {
          if (this.currentTab === "settings") {
            this.switchTab(this.previousTab || "prompts");
          } else {
            this.previousTab = this.currentTab;
            this.switchTab("settings");
          }
        });
        const aboutBtn = createElement("button", {
          className: "chatgpt-helper-header-btn chatgpt-helper-header-about-btn",
          title: this.t("aboutTopEntryTitle") || this.t("aboutButton") || "About",
          id: "chatgpt-helper-header-about-btn",
          type: "button"
        });
        const aboutIcon = createElement("span", { className: "chatgpt-helper-about-entry-icon" }, "i");
        aboutIcon.setAttribute("aria-hidden", "true");
        aboutBtn.appendChild(aboutIcon);
        aboutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openAboutModal();
        });
        controls.appendChild(themeBtn);
        controls.appendChild(newChatBtn);
        controls.appendChild(refreshBtn);
        controls.appendChild(settingsBtn);
        controls.appendChild(collapseBtn);
        controls.appendChild(aboutBtn);
        header.appendChild(title);
        header.appendChild(controls);
        this.panel.appendChild(header);
        this.updateCollapseButtonState();
        this.initHeaderResponsiveSpacing(header);
        const tabs = createElement("div", { id: "chatgpt-helper-tabs" });
        tabs.setAttribute("role", "tablist");
        const tabOrder = this.settings.tabOrder || ["prompts", "outline", "conversations", "export"];
        tabOrder.forEach((tabId) => {
          if (tabId === "settings") return;
          const def = TAB_DEFINITIONS[tabId];
          if (!def) return;
          const tab = createElement("button", {
            className: `chatgpt-helper-tab ${this.currentTab === tabId ? "active" : ""}`,
            "data-tab": tabId,
            id: `${tabId}-tab`,
            type: "button",
            role: "tab",
            "aria-selected": String(this.currentTab === tabId),
            "aria-controls": `${tabId}-content`
          });
          const dragHandle = createElement("span", {
            className: "chatgpt-helper-tab-drag-handle",
            draggable: true
          });
          dragHandle.innerHTML = "⋮&nbsp;⋮";
          dragHandle.setAttribute("title", "拖动改变顺序");
          tab.appendChild(dragHandle);
          tab.appendChild(createSvgIconNode(def.iconName || "list", {
            size: 15,
            className: "chatgpt-helper-tab-icon"
          }));
          const tabLabel = tabId === "prompts" ? this.t("tabPrompts") : tabId === "outline" ? this.t("tabOutline") : tabId === "conversations" ? this.t("tabConversations") : tabId === "export" ? this.t("tabExport") : tabId === "settings" ? this.t("tabSettings") : def.label;
          tab.appendChild(createElement("span", {}, tabLabel));
          tab.addEventListener("click", () => this.switchTab(tabId));
          dragHandle.addEventListener("dragstart", (e) => {
            e.stopPropagation();
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", tabId);
            tab.classList.add("dragging");
            tabs.setAttribute("data-dragging", "true");
          });
          dragHandle.addEventListener("dragend", (e) => {
            e.stopPropagation();
            tab.classList.remove("dragging");
            tabs.removeAttribute("data-dragging");
            tabs.querySelectorAll(".chatgpt-helper-tab").forEach((t2) => {
              t2.classList.remove("drag-over", "drag-before", "drag-after");
            });
          });
          tab.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            const draggingTab = tabs.querySelector(".dragging");
            if (draggingTab && draggingTab !== tab) {
              const allTabs = Array.from(tabs.querySelectorAll(".chatgpt-helper-tab:not(.dragging)"));
              allTabs.indexOf(tab);
              const rect = tab.getBoundingClientRect();
              const mouseX = e.clientX;
              const tabCenter = rect.left + rect.width / 2;
              tabs.querySelectorAll(".chatgpt-helper-tab").forEach((t2) => {
                t2.classList.remove("drag-before", "drag-after");
              });
              if (mouseX < tabCenter) {
                tab.classList.add("drag-before");
              } else {
                tab.classList.add("drag-after");
              }
            }
          });
          tab.addEventListener("dragleave", (e) => {
            const rect = tab.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
              tab.classList.remove("drag-over", "drag-before", "drag-after");
            }
          });
          tab.addEventListener("drop", (e) => {
            e.preventDefault();
            tab.classList.remove("drag-over", "drag-before", "drag-after");
            const draggedTabId = e.dataTransfer.getData("text/html");
            const draggedTab = tabs.querySelector(`[data-tab="${draggedTabId}"]`);
            if (draggedTab && draggedTab !== tab) {
              const allTabs = Array.from(tabs.querySelectorAll(".chatgpt-helper-tab"));
              const draggedIndex = allTabs.indexOf(draggedTab);
              const targetIndex = allTabs.indexOf(tab);
              const rect = tab.getBoundingClientRect();
              const mouseX = e.clientX;
              const tabCenter = rect.left + rect.width / 2;
              const insertBefore = mouseX < tabCenter;
              if (draggedIndex < targetIndex) {
                if (insertBefore) {
                  tabs.insertBefore(draggedTab, tab);
                } else {
                  tabs.insertBefore(draggedTab, tab.nextSibling);
                }
              } else {
                if (insertBefore) {
                  tabs.insertBefore(draggedTab, tab);
                } else {
                  tabs.insertBefore(draggedTab, tab.nextSibling);
                }
              }
              const newOrder = Array.from(tabs.querySelectorAll(".chatgpt-helper-tab")).map((t2) => t2.dataset.tab);
              this.settings.tabOrder = newOrder;
              this.saveSettings();
            }
          });
          tabs.appendChild(tab);
        });
        this.panel.appendChild(tabs);
        this.initTabResponsiveSpacing(tabs);
        const content = createElement("div", { id: "chatgpt-helper-content" });
        ["prompts", "outline", "conversations", "export", "settings"].forEach((tabId) => {
          const panel = createElement("div", {
            className: `chatgpt-helper-content-panel ${this.currentTab === tabId ? "active" : ""}`,
            id: `${tabId}-content`,
            "data-tab": tabId,
            // 添加 data-tab 属性，供 updateCategoryBar 等函数使用
            role: "tabpanel",
            "aria-labelledby": tabId === "settings" ? "chatgpt-helper-settings-btn" : `${tabId}-tab`
          });
          content.appendChild(panel);
        });
        this.panel.appendChild(content);
        this.initResizeHandle();
        const scrollNavContainer = createElement("div", {
          className: "scroll-nav-container",
          id: "scroll-nav-container"
        });
        const navScrollTopBtn = createElement("button", {
          className: "scroll-nav-btn",
          id: "scroll-top-btn",
          title: "滚动到顶部",
          type: "button",
          "aria-label": "滚动到顶部"
        });
        navScrollTopBtn.appendChild(createSvgIconNode("arrowUp", { size: 15 }));
        navScrollTopBtn.appendChild(createElement("span", {}, "顶部"));
        navScrollTopBtn.addEventListener("click", () => this.scrollToTop());
        const navAnchorBtn = createElement("button", {
          className: "scroll-nav-btn",
          id: "scroll-anchor-btn",
          title: "暂无锚点",
          type: "button",
          "aria-label": "返回跳转前位置",
          style: "opacity: 0.4; cursor: default;"
        });
        navAnchorBtn.appendChild(createSvgIconNode("anchor", { size: 15 }));
        navAnchorBtn.appendChild(createElement("span", {}, "返回"));
        navAnchorBtn.addEventListener("click", () => this.handleAnchorClick());
        const navScrollBottomBtn = createElement("button", {
          className: "scroll-nav-btn",
          id: "scroll-bottom-btn",
          title: "滚动到底部",
          type: "button",
          "aria-label": "滚动到底部"
        });
        navScrollBottomBtn.appendChild(createSvgIconNode("arrowDown", { size: 15 }));
        navScrollBottomBtn.appendChild(createElement("span", {}, "底部"));
        navScrollBottomBtn.addEventListener("click", () => this.scrollToBottom());
        scrollNavContainer.appendChild(navScrollTopBtn);
        scrollNavContainer.appendChild(navAnchorBtn);
        scrollNavContainer.appendChild(navScrollBottomBtn);
        this.panel.appendChild(scrollNavContainer);
        this.switchTab(this.currentTab);
      },
      switchTab(tabName) {
        this.currentTab = tabName;
        const tabs = this.panel.querySelectorAll(".chatgpt-helper-tab");
        tabs.forEach((tab) => {
          const isActive = tab.dataset.tab === tabName;
          tab.classList.toggle("active", isActive);
          tab.setAttribute("aria-selected", String(isActive));
        });
        const panels = this.panel.querySelectorAll(".chatgpt-helper-content-panel");
        panels.forEach((panel2) => {
          panel2.classList.toggle("active", panel2.id === `${tabName}-content`);
        });
        const panel = this.panel.querySelector(`#${tabName}-content`);
        if (panel) {
          clearElement(panel);
          if (tabName === "prompts") {
            this.renderPrompts(panel);
          } else if (tabName === "outline") {
            this.renderOutline(panel);
            if (this.outlineManager) {
              this.outlineManager.setActive(true);
            }
          } else if (tabName === "conversations") {
            this.renderConversations(panel);
            if (this.outlineManager) {
              this.outlineManager.setActive(false);
            }
          } else if (tabName === "export") {
            this.renderExport(panel);
            if (this.outlineManager) {
              this.outlineManager.setActive(false);
            }
          } else if (tabName === "settings") {
            this.renderSettings(panel);
            if (this.outlineManager) {
              this.outlineManager.setActive(false);
            }
          } else {
            if (this.outlineManager) {
              this.outlineManager.setActive(false);
            }
          }
        }
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Prompts module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      renderPrompts(container) {
        const searchBar = createElement("div", { className: "chatgpt-helper-search-bar" });
        const searchInput = createElement("input", {
          className: "chatgpt-helper-search-input",
          type: "text",
          placeholder: this.t("searchPlaceholder"),
          value: this.searchQuery || ""
        });
        searchInput.addEventListener("input", (e) => {
          this.searchQuery = e.target.value.trim();
          this.refreshPromptList();
        });
        searchBar.appendChild(searchInput);
        container.appendChild(searchBar);
        const categories = this.getCategories();
        const categoryBar = createElement("div", { className: "chatgpt-helper-categories" });
        const allCategoryText = this.t("allCategory");
        const allTag = createElement("div", {
          className: `chatgpt-helper-category-tag ${this.selectedCategory === allCategoryText ? "active" : ""}`
        }, allCategoryText);
        allTag.addEventListener("click", () => {
          this.selectedCategory = allCategoryText;
          this.updateCategoryBar();
          setTimeout(() => {
            this.refreshPromptList();
          }, 0);
        });
        categoryBar.appendChild(allTag);
        categories.forEach((cat) => {
          const tag = createElement("div", {
            className: `chatgpt-helper-category-tag ${this.selectedCategory === cat ? "active" : ""}`
          }, cat);
          tag.addEventListener("click", () => {
            this.selectedCategory = cat;
            this.updateCategoryBar();
            setTimeout(() => {
              this.refreshPromptList();
            }, 0);
          });
          categoryBar.appendChild(tag);
        });
        container.appendChild(categoryBar);
        const listContainer = createElement("div", { className: "chatgpt-helper-prompt-list", id: "prompt-list" });
        container.appendChild(listContainer);
        this.refreshPromptList();
      },
      refreshPromptList() {
        const listContainer = this.panel.querySelector("#prompt-list");
        if (!listContainer) return;
        clearElement(listContainer);
        const addBtn = createElement("button", {
          className: "chatgpt-helper-add-btn"
        });
        addBtn.appendChild(createElement("span", {}, "+"));
        addBtn.appendChild(createElement("span", {}, this.t("addPrompt")));
        addBtn.addEventListener("click", () => this.showAddPromptDialog());
        listContainer.appendChild(addBtn);
        let filteredPrompts = this.prompts;
        if (this.selectedCategory && this.selectedCategory !== "全部") {
          filteredPrompts = filteredPrompts.filter((p) => p.category === this.selectedCategory);
        }
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filteredPrompts = filteredPrompts.filter(
            (p) => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query)
          );
        }
        if (filteredPrompts.length === 0) {
          listContainer.appendChild(createElement("div", {
            style: { textAlign: "center", color: "var(--gh-text-secondary)", padding: "20px", fontSize: "14px" }
          }, "暂无提示词"));
          return;
        }
        filteredPrompts.forEach((prompt2, filteredIndex) => {
          const fullIndex = this.prompts.findIndex((p) => p.id === prompt2.id);
          const item = createElement("div", {
            className: `chatgpt-helper-prompt-item ${this.selectedPrompt?.id === prompt2.id ? "selected" : ""}`,
            "data-prompt-id": prompt2.id,
            "data-prompt-index": fullIndex !== -1 ? fullIndex : filteredIndex
          });
          const dragHandle = createElement("div", {
            className: "chatgpt-helper-prompt-drag-handle"
          });
          item.appendChild(dragHandle);
          const contentWrapper = createElement("div", {
            className: "chatgpt-helper-prompt-content-wrapper",
            style: {
              marginLeft: "28px",
              position: "relative",
              paddingRight: "60px"
              // 为按钮留出空间
            }
          });
          const title = createElement("div", { className: "chatgpt-helper-prompt-title" }, prompt2.title);
          const content = createElement("div", { className: "chatgpt-helper-prompt-content" }, prompt2.content);
          contentWrapper.appendChild(title);
          contentWrapper.appendChild(content);
          const actions = createElement("div", {
            className: "chatgpt-helper-prompt-actions"
          });
          if (prompt2.category) {
            const categoryBtn = createElement("button", {
              className: "category-btn",
              title: `切换到分类: ${prompt2.category}`,
              type: "button"
              // 明确指定按钮类型
            });
            categoryBtn.appendChild(createSvgIconNode("tag", { size: 14 }));
            categoryBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              this.selectedCategory = prompt2.category;
              this.updateCategoryBar();
              setTimeout(() => {
                this.refreshPromptList();
              }, 0);
              return false;
            });
            actions.appendChild(categoryBtn);
          }
          const editBtn = createElement("button", {
            className: "edit-btn",
            title: "编辑"
          });
          editBtn.appendChild(createSvgIconNode("edit", { size: 14 }));
          editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.showEditPromptDialog(prompt2);
          });
          const deleteBtn = createElement("button", {
            className: "delete-btn",
            title: this.t("delete")
          });
          deleteBtn.appendChild(createSvgIconNode("trash", { size: 14 }));
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(this.t("confirmDelete"))) {
              this.deletePrompt(prompt2.id);
            }
          });
          actions.appendChild(editBtn);
          actions.appendChild(deleteBtn);
          contentWrapper.appendChild(actions);
          item.appendChild(contentWrapper);
          this.initPromptDrag(item, prompt2, fullIndex !== -1 ? fullIndex : filteredIndex);
          item.addEventListener("click", (e) => {
            if (!e.target.closest("button") && !e.target.closest(".chatgpt-helper-prompt-drag-handle")) {
              this.selectedPrompt = prompt2;
              this.adapter.insertPrompt(prompt2.content);
              this.refreshPromptList();
            }
          });
          listContainer.appendChild(item);
        });
      },
      initPromptDrag(item, prompt2, index) {
        const dragHandle = item.querySelector(".chatgpt-helper-prompt-drag-handle");
        if (!dragHandle) return;
        let isDragging = false;
        const draggedIndex = this.prompts.findIndex((p) => p.id === prompt2.id);
        if (draggedIndex === -1) return;
        dragHandle.addEventListener("mousedown", (e) => {
          e.preventDefault();
          e.stopPropagation();
          isDragging = true;
          item.classList.add("dragging");
          item.style.opacity = "0.5";
          document.body.style.cursor = "grabbing";
        });
        const handleMouseMove = (e) => {
          if (!isDragging) return;
          const listContainer = this.panel.querySelector("#prompt-list");
          if (!listContainer) return;
          const items = Array.from(listContainer.querySelectorAll(".chatgpt-helper-prompt-item:not(.dragging)"));
          const mouseY = e.clientY;
          items.forEach((el) => el.classList.remove("drag-over"));
          for (let i = 0; i < items.length; i++) {
            const rect = items[i].getBoundingClientRect();
            const elementCenterY = rect.top + rect.height / 2;
            if (mouseY < elementCenterY) {
              items[i].classList.add("drag-over");
              break;
            }
          }
          if (items.length > 0) {
            const lastRect = items[items.length - 1].getBoundingClientRect();
            if (mouseY > lastRect.bottom) {
              items[items.length - 1].classList.add("drag-over");
            }
          }
        };
        const handleMouseUp = (e) => {
          if (!isDragging) return;
          isDragging = false;
          item.classList.remove("dragging");
          item.style.opacity = "";
          document.body.style.cursor = "";
          const listContainer = this.panel.querySelector("#prompt-list");
          if (listContainer) {
            const items = Array.from(listContainer.querySelectorAll(".chatgpt-helper-prompt-item"));
            const draggedPromptId = prompt2.id;
            let targetIndex = draggedIndex;
            for (let i = 0; i < items.length; i++) {
              if (items[i] === item) continue;
              if (items[i].classList.contains("drag-over")) {
                const targetPromptId = items[i].dataset.promptId;
                targetIndex = this.prompts.findIndex((p) => p.id === targetPromptId);
                if (targetIndex === -1) {
                  targetIndex = draggedIndex;
                }
                break;
              }
            }
            items.forEach((el) => el.classList.remove("drag-over"));
            if (targetIndex !== draggedIndex && targetIndex !== -1) {
              this.reorderPrompts(draggedPromptId, targetIndex);
            }
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      reorderPrompts(draggedPromptId, targetIndex) {
        const fromIndex = this.prompts.findIndex((p) => p.id === draggedPromptId);
        if (fromIndex === -1) return;
        const [movedPrompt] = this.prompts.splice(fromIndex, 1);
        let newIndex = targetIndex;
        if (targetIndex > fromIndex) {
          newIndex = targetIndex - 1;
        }
        this.prompts.splice(newIndex, 0, movedPrompt);
        this.savePrompts();
        this.refreshPromptList();
      },
      getCategories() {
        const categories = /* @__PURE__ */ new Set();
        this.prompts.forEach((p) => {
          if (p.category) categories.add(p.category);
        });
        return Array.from(categories).sort();
      },
      updateCategoryBar() {
        const promptsPanel = this.panel?.querySelector('.chatgpt-helper-content-panel[data-tab="prompts"]') || this.panel?.querySelector("#prompts-content");
        if (!promptsPanel) return;
        const categoryBar = promptsPanel.querySelector(".chatgpt-helper-categories");
        if (!categoryBar) return;
        const currentCategory = this.selectedCategory;
        const categories = this.getCategories();
        const allCategoryText = this.t("allCategory");
        clearElement(categoryBar);
        const newAllTag = createElement("div", {
          className: `chatgpt-helper-category-tag ${currentCategory === allCategoryText ? "active" : ""}`
        }, allCategoryText);
        newAllTag.addEventListener("click", () => {
          this.selectedCategory = allCategoryText;
          this.updateCategoryBar();
          setTimeout(() => {
            this.refreshPromptList();
          }, 0);
        });
        categoryBar.appendChild(newAllTag);
        categories.forEach((cat) => {
          const tag = createElement("div", {
            className: `chatgpt-helper-category-tag ${currentCategory === cat ? "active" : ""}`
          }, cat);
          tag.addEventListener("click", () => {
            this.selectedCategory = cat;
            this.updateCategoryBar();
            setTimeout(() => {
              this.refreshPromptList();
            }, 0);
          });
          categoryBar.appendChild(tag);
        });
      },
      showAddPromptDialog() {
        this.showPromptDialog(null);
      },
      showEditPromptDialog(prompt2) {
        this.showPromptDialog(prompt2);
      },
      showPromptDialog(prompt2 = null) {
        const overlay = createElement("div", {
          className: "chatgpt-helper-prompt-dialog-overlay",
          role: "presentation"
        });
        const dialog = createElement("div", {
          className: "chatgpt-helper-prompt-dialog",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": prompt2 ? "编辑提示词" : "添加提示词"
        });
        const title = createElement("h3", {
          className: "chatgpt-helper-prompt-dialog-title"
        }, prompt2 ? "编辑提示词" : "添加提示词");
        const titleInput = createElement("input", {
          className: "chatgpt-helper-prompt-dialog-field",
          type: "text",
          placeholder: "提示词标题",
          value: prompt2?.title || ""
        });
        const contentTextarea = createElement("textarea", {
          className: "chatgpt-helper-prompt-dialog-field chatgpt-helper-prompt-dialog-textarea",
          placeholder: this.t("content"),
          value: prompt2?.content || ""
        });
        const categoryInput = createElement("input", {
          className: "chatgpt-helper-prompt-dialog-field",
          type: "text",
          placeholder: this.t("category") + "（可选）",
          value: prompt2?.category || ""
        });
        const buttons = createElement("div", {
          className: "chatgpt-helper-prompt-dialog-actions"
        });
        const cancelBtn = createElement("button", {
          className: "chatgpt-helper-prompt-dialog-btn secondary",
          type: "button"
        }, this.t("cancel"));
        cancelBtn.addEventListener("click", () => overlay.remove());
        const saveBtn = createElement("button", {
          className: "chatgpt-helper-prompt-dialog-btn primary",
          type: "button"
        }, this.t("save"));
        saveBtn.addEventListener("click", () => {
          const title2 = titleInput.value.trim();
          const content = contentTextarea.value.trim();
          const category = categoryInput.value.trim();
          if (!title2 || !content) {
            alert(this.t("fillTitleContent"));
            return;
          }
          const categoriesBefore = new Set(this.getCategories());
          const isNewCategory = category && !categoriesBefore.has(category);
          if (prompt2) {
            this.updatePrompt(prompt2.id, { title: title2, content, category });
          } else {
            this.addPrompt({ title: title2, content, category });
          }
          overlay.remove();
          if (isNewCategory && (!this.selectedCategory || this.selectedCategory === this.t("allCategory"))) {
            this.selectedCategory = category;
          }
          setTimeout(() => {
            this.updateCategoryBar();
            this.refreshPromptList();
          }, 0);
        });
        buttons.appendChild(cancelBtn);
        buttons.appendChild(saveBtn);
        dialog.appendChild(title);
        dialog.appendChild(titleInput);
        dialog.appendChild(contentTextarea);
        dialog.appendChild(categoryInput);
        dialog.appendChild(buttons);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.remove();
        });
      },
      addPrompt(prompt2) {
        prompt2.id = "custom_" + Date.now();
        this.prompts.push(prompt2);
        this.savePrompts();
      },
      updatePrompt(id, updatedPrompt) {
        const index = this.prompts.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.prompts[index] = { ...this.prompts[index], ...updatedPrompt };
          this.savePrompts();
        }
      },
      deletePrompt(id) {
        this.prompts = this.prompts.filter((p) => p.id !== id);
        this.savePrompts();
        this.updateCategoryBar();
        this.refreshPromptList();
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Export module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      renderExport(container) {
        container.classList.add("chatgpt-helper-export-panel");
        const titleBar = createElement("div", {
          className: "chatgpt-helper-export-header",
          id: "chatgpt-helper-export-header"
        });
        titleBar.appendChild(createSvgIconNode("export", {
          size: 16,
          className: "chatgpt-helper-export-header-icon"
        }));
        titleBar.appendChild(createElement("span", {
          className: "chatgpt-helper-export-header-title"
        }, this.t("tabExport") || "导出"));
        container.appendChild(titleBar);
        const exportContainer = createElement("div", {
          className: "chatgpt-helper-export-container",
          id: "chatgpt-helper-export-container",
          style: {
            flex: "1",
            overflow: "auto",
            padding: "0",
            minHeight: "0",
            position: "relative",
            boxSizing: "border-box"
          }
        });
        container.appendChild(exportContainer);
        let retryCount = 0;
        const maxRetries = 50;
        const tryMount = () => {
          const exporterMount = window.__MY_EXT__ && window.__MY_EXT__.ChatGPTExporterMount ? window.__MY_EXT__.ChatGPTExporterMount : window.ChatGPTExporterMount;
          if (exporterMount && typeof exporterMount === "function") {
            try {
              console.log("[ChatGPT Helper] 找到 ChatGPTExporterMount，开始挂载");
              const mountedContainer = exporterMount(exportContainer);
              if (mountedContainer) {
                mountedContainer.style.width = "100%";
                mountedContainer.style.height = "100%";
                mountedContainer.style.overflow = "auto";
                mountedContainer.classList.add("chatgpt-helper-export-host");
                mountedContainer.setAttribute("data-gh-exporter-host", "true");
                exportContainer.setAttribute("data-gh-exporter-container", "true");
                console.log("[ChatGPT Helper] ChatGPT Exporter 挂载成功");
              }
            } catch (e) {
              console.error("[ChatGPT Helper] 挂载 ChatGPT Exporter 失败:", e);
              exportContainer.appendChild(createElement("div", {
                style: { padding: "12px", fontSize: "13px", color: "var(--gh-text-secondary)" }
              }, "导出模块加载失败，请检查 ChatGPT Exporter 脚本是否正常运行。"));
            }
          } else if (retryCount < maxRetries) {
            retryCount++;
            if (retryCount % 10 === 0) {
              console.log(`[ChatGPT Helper] 等待 ChatGPTExporterMount... (${retryCount}/${maxRetries})`);
            }
            setTimeout(tryMount, 100);
          } else {
            console.warn("[ChatGPT Helper] ChatGPTExporterMount 未找到，当前状态:", {
              hasMyExt: !!window.__MY_EXT__,
              hasNamespaceMount: typeof window.__MY_EXT__?.ChatGPTExporterMount === "function",
              hasWindowMount: typeof window.ChatGPTExporterMount === "function"
            });
            exportContainer.appendChild(createElement("div", {
              style: { padding: "12px", fontSize: "13px", color: "var(--gh-text-secondary)" }
            }, "未检测到 ChatGPT Exporter，请确保扩展已正确加载。"));
          }
        };
        setTimeout(tryMount, 200);
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Conversations And Settings module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      renderConversations(container) {
        if (!this.conversationManager) {
          this.conversationManager = new ConversationManager({
            container,
            settings: this.settings,
            adapter: this.adapter,
            i18n: this.t
          });
        } else {
          this.conversationManager.container = container;
          this.conversationManager.settings = this.settings;
          this.conversationManager.t = this.t;
        }
        this.conversationManager.createUI();
        const data = this.conversationManager.data;
        console.log("[ChatGPT Helper] 会话管理器数据:", {
          folders: data.folders?.length || 0,
          conversations: Object.keys(data.conversations || {}).length,
          hasData: Object.keys(data.conversations || {}).length > 0
        });
        if (Object.keys(data.conversations || {}).length === 0) {
          console.log("[ChatGPT Helper] 当前没有保存的会话，这是正常的（新安装或未同步）");
        }
      },
      createCollapsibleSection(title, content, options = {}) {
        const { defaultExpanded = false } = options;
        const section = createElement("div", {
          className: "chatgpt-helper-setting-section",
          style: {
            marginBottom: "18px",
            background: "var(--gh-bg-secondary)",
            borderRadius: "16px",
            border: "1px solid var(--gh-border)",
            overflow: "hidden"
          }
        });
        const header = createElement("div", {
          className: "chatgpt-helper-setting-section-header",
          style: {
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            padding: "16px 18px",
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--gh-text)",
            transition: "background 0.2s, border-color 0.2s",
            textAlign: "center",
            position: "relative"
          }
        });
        const headerLeft = createElement("div", {
          className: "chatgpt-helper-setting-section-header-inner",
          style: "display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"
        });
        const arrow = createElement("span", {
          style: "font-size: 12px; color: var(--gh-text-secondary); transition: transform 0.2s; display: inline-block; position: absolute; right: 2px;",
          className: "collapse-arrow"
        }, "▶");
        const headerTitle = createElement("span", {
          className: "chatgpt-helper-setting-section-title"
        }, title);
        headerLeft.appendChild(arrow);
        headerLeft.appendChild(headerTitle);
        header.appendChild(headerLeft);
        section.appendChild(header);
        const contentContainer = createElement("div", {
          className: "chatgpt-helper-setting-section-content",
          style: `display: ${defaultExpanded ? "block" : "none"}; padding: 0 16px 16px 16px;`
        });
        contentContainer.appendChild(content);
        let isExpanded = defaultExpanded;
        const updateState = () => {
          contentContainer.style.display = isExpanded ? "block" : "none";
          arrow.style.transform = isExpanded ? "rotate(90deg)" : "rotate(0deg)";
          header.style.background = isExpanded ? "var(--gh-hover)" : "transparent";
        };
        if (defaultExpanded) {
          arrow.style.transform = "rotate(90deg)";
          header.style.background = "var(--gh-hover)";
        }
        header.addEventListener("click", () => {
          isExpanded = !isExpanded;
          updateState();
        });
        header.addEventListener("mouseenter", () => {
          if (!isExpanded) {
            header.style.background = "var(--gh-hover)";
          }
        });
        header.addEventListener("mouseleave", () => {
          if (!isExpanded) {
            header.style.background = "transparent";
          }
        });
        section.appendChild(contentContainer);
        return section;
      },
      createSettingSection(title, items, options = {}) {
        const { collapsible = true, defaultExpanded = false } = options;
        const content = createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }
        });
        items.forEach((item) => {
          const itemEl = createElement("div", {
            className: "chatgpt-helper-setting-item",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              borderBottom: "none"
            }
          });
          const label = createElement("div", {
            className: "chatgpt-helper-setting-item-label",
            style: {
              fontSize: "14px",
              color: "var(--gh-text)",
              flex: 1,
              paddingLeft: "2px",
              textAlign: "left"
            }
          }, item.label);
          itemEl.appendChild(label);
          let control;
          if (item.type === "toggle") {
            control = createElement("button", {
              className: `chatgpt-helper-toggle${item.value ? " active" : ""}`,
              type: "button",
              "aria-pressed": item.value ? "true" : "false"
            });
            const toggleCircle = createElement("div", {
              className: "chatgpt-helper-toggle-knob"
            });
            control.appendChild(toggleCircle);
            const handleToggle = (e) => {
              if (e) {
                e.preventDefault();
                e.stopPropagation();
              }
              const newValue = !item.value;
              item.value = newValue;
              control.classList.toggle("active", newValue);
              control.setAttribute("aria-pressed", newValue ? "true" : "false");
              if (item.onChange) {
                try {
                  item.onChange(newValue);
                } catch (err) {
                  console.error("[ChatGPT Helper] Toggle onChange error:", err);
                }
              }
            };
            control.addEventListener("click", handleToggle);
            control.addEventListener("mousedown", (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
          } else if (item.type === "select") {
            control = createElement("select", {
              style: {
                padding: "6px 12px",
                border: "1px solid var(--gh-border)",
                borderRadius: "6px",
                background: "var(--gh-input-bg)",
                color: "var(--gh-text)",
                fontSize: "14px",
                cursor: "pointer",
                minWidth: "150px"
              }
            });
            if (item.options) {
              item.options.forEach((opt) => {
                const option = createElement("option", { value: opt.value }, opt.label);
                if (opt.value === item.value) option.selected = true;
                control.appendChild(option);
              });
            }
            control.addEventListener("change", (e) => {
              e.stopPropagation();
              const newValue = control.value;
              item.value = newValue;
              if (item.onChange) {
                try {
                  item.onChange(newValue);
                } catch (err) {
                  console.error("[ChatGPT Helper] Select onChange error:", err);
                }
              }
            });
          } else if (item.type === "number") {
            const inputAttrs = {
              type: "number",
              value: item.value,
              min: item.min !== void 0 ? item.min : 200,
              max: item.max !== void 0 ? item.max : 600,
              style: {
                width: "100px",
                padding: "6px 8px",
                border: "1px solid var(--gh-border)",
                borderRadius: "6px",
                background: "var(--gh-input-bg)",
                color: "var(--gh-text)",
                fontSize: "14px"
              }
            };
            if (item.step !== void 0) {
              inputAttrs.step = item.step;
            }
            control = createElement("input", inputAttrs);
            const handleNumberChange = () => {
              if (item.onChange) {
                try {
                  item.onChange(control.value);
                } catch (err) {
                  console.error("[ChatGPT Helper] Number onChange error:", err);
                }
              }
            };
            control.addEventListener("change", handleNumberChange);
            control.addEventListener("blur", handleNumberChange);
            control.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                control.blur();
                handleNumberChange();
              }
            });
          } else if (item.type === "text") {
            control = createElement("input", {
              type: "text",
              value: item.value || "",
              placeholder: item.placeholder || "",
              style: {
                flex: 1,
                maxWidth: "200px",
                padding: "6px 12px",
                border: "1px solid var(--gh-border)",
                borderRadius: "6px",
                background: "var(--gh-input-bg)",
                color: "var(--gh-text)",
                fontSize: "14px"
              }
            });
            const handleTextChange = () => {
              if (item.onChange) {
                try {
                  item.onChange(control.value);
                } catch (err) {
                  console.error("[ChatGPT Helper] Text onChange error:", err);
                }
              }
            };
            control.addEventListener("change", handleTextChange);
            control.addEventListener("blur", handleTextChange);
            control.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                control.blur();
                handleTextChange();
              }
            });
          } else if (item.type === "button") {
            control = createElement("button", {
              className: "chatgpt-helper-theme-launch-btn",
              type: "button"
            }, item.buttonText || this.t("openThemeSettings") || "Open Theme Settings");
            control.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (item.onClick) {
                try {
                  item.onClick();
                } catch (err) {
                  console.error("[ChatGPT Helper] Button onClick error:", err);
                }
              }
            });
          }
          if (control) {
            const controls = createElement("div", {
              className: "chatgpt-helper-setting-controls",
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0
              }
            });
            controls.appendChild(control);
            itemEl.appendChild(controls);
          }
          content.appendChild(itemEl);
        });
        if (collapsible) {
          return this.createCollapsibleSection(title, content, { defaultExpanded });
        } else {
          const section = createElement("div", {
            className: "chatgpt-helper-setting-section",
            style: {
              marginBottom: "24px",
              padding: "18px",
              background: "var(--gh-bg-secondary)",
              borderRadius: "16px",
              border: "1px solid var(--gh-border)"
            }
          });
          const sectionTitle = createElement("div", {
            style: {
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--gh-text-secondary)",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              paddingLeft: "4px"
            }
          }, title);
          section.appendChild(sectionTitle);
          section.appendChild(content);
          return section;
        }
      },
      renderSettings(container) {
        const settingsContent = createElement("div", {
          className: "chatgpt-helper-settings-scroll",
          style: {
            padding: "18px 16px 26px",
            overflowY: "auto",
            flex: 1
          }
        });
        const panelSection = this.createSettingSection(this.t("panelSettings") || "面板设置", [
          {
            label: this.t("panelWidthLabel") || "面板宽度",
            type: "number",
            value: this.settings.panelWidth,
            onChange: (val) => {
              this.settings.panelWidth = Math.max(200, Math.min(600, parseInt(val) || 320));
              this.saveSettings();
              this.adjustChatGPTLayout();
              this.showToast("已更新面板宽度，刷新页面生效");
            }
          },
          {
            label: this.t("defaultPanelOpenLabel") || "默认展开面板",
            type: "toggle",
            value: this.settings.defaultPanelState,
            onChange: (val) => {
              this.settings.defaultPanelState = val;
              this.saveSettings();
            }
          }
        ]);
        const themeSection = this.createSettingSection(this.t("themeSettingsSection") || "主题设置", [
          {
            label: this.t("themeDialogTitle") || "主题",
            type: "button",
            buttonText: this.t("openThemeSettings") || "打开主题设置",
            onClick: () => {
              this.openThemeSettingsModal();
            }
          }
        ], { defaultExpanded: false });
        const featureSection = this.createSettingSection(this.t("featureSettings") || "功能设置", [
          {
            label: this.t("showUserMessagesLabel") || "显示用户消息",
            type: "toggle",
            value: this.settings.outline?.showUserQueries !== false,
            onChange: (val) => {
              if (!this.settings.outline) this.settings.outline = {};
              this.settings.outline.showUserQueries = val;
              this.saveSettings();
              if (this.currentTab === "outline") {
                this.refreshOutline();
              }
            }
          },
          {
            label: this.t("preventAutoScrollLabel") || "防止自动滚动",
            type: "toggle",
            value: this.settings.preventAutoScroll || false,
            onChange: (val) => {
              console.log("[ChatGPT Helper] 切换防止自动滚动:", val);
              this.settings.preventAutoScroll = val;
              this.saveSettings();
              if (!this.scrollLockManager) {
                console.log("[ChatGPT Helper] 创建新的 ScrollLockManager");
                this.scrollLockManager = new ScrollLockManager(this.adapter);
              }
              console.log("[ChatGPT Helper] 设置 ScrollLockManager.enabled =", val);
              this.scrollLockManager.setEnabled(val);
              setTimeout(() => {
                const actualEnabled = this.scrollLockManager?.enabled;
                console.log("[ChatGPT Helper] 防止自动滚动状态:", {
                  期望: val,
                  实际: actualEnabled,
                  一致: val === actualEnabled
                });
                if (val !== actualEnabled) {
                  console.warn("[ChatGPT Helper] 警告：状态不一致！");
                }
              }, 100);
              this.showToast(val ? "已启用防止自动滚动" : "已禁用防止自动滚动");
            }
          },
          {
            label: this.t("tabPlaySoundLabel") || "播放通知声音",
            type: "toggle",
            value: this.settings.tabSettings?.notificationSound || false,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.notificationSound = val;
              if (this.settings.tabSettings.notificationVolume == null) {
                this.settings.tabSettings.notificationVolume = 0.5;
              }
              this.saveSettings();
            }
          },
          {
            label: this.t("tabVolumeLabel") || "通知音量（0.1-1.0）",
            type: "number",
            value: this.settings.tabSettings?.notificationVolume || 0.5,
            min: 0.1,
            max: 1,
            step: 0.1,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              let v = parseFloat(val);
              if (isNaN(v)) v = 0.5;
              v = Math.max(0.1, Math.min(1, v));
              this.settings.tabSettings.notificationVolume = v;
              this.saveSettings();
            }
          },
          {
            label: this.t("tabAutoFocusLabel") || "自动聚焦窗口",
            type: "toggle",
            value: this.settings.tabSettings?.autoFocus || false,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.autoFocus = val;
              this.saveSettings();
            }
          }
        ]);
        const pageSection = this.createSettingSection(this.t("pageSettings") || "页面设置", [
          {
            label: this.t("limitPageWidthLabel") || "限制页面宽度",
            type: "toggle",
            value: this.settings.pageWidth?.enabled || false,
            onChange: (val) => {
              if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: "px" };
              this.settings.pageWidth.enabled = val;
              this.saveSettings();
              if (this.widthStyleManager) {
                this.widthStyleManager.updateConfig(this.settings.pageWidth);
              }
              this.showToast(val ? "已启用页面宽度限制" : "已禁用页面宽度限制");
            }
          },
          {
            label: this.t("pageWidthValueLabel") || "页面宽度值",
            type: "number",
            value: this.settings.pageWidth?.value || 1200,
            onChange: (val) => {
              if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: "px" };
              this.settings.pageWidth.value = Math.max(800, Math.min(2e3, parseInt(val) || 1200));
              this.saveSettings();
              if (this.widthStyleManager && this.settings.pageWidth.enabled) {
                this.widthStyleManager.updateConfig(this.settings.pageWidth);
              }
            }
          },
          {
            label: this.t("pageWidthUnitLabel") || "宽度单位",
            type: "select",
            value: this.settings.pageWidth?.unit || "px",
            options: [
              { value: "px", label: "px" },
              { value: "%", label: "%" },
              { value: "rem", label: "rem" }
            ],
            onChange: (val) => {
              if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: "px" };
              this.settings.pageWidth.unit = val;
              this.saveSettings();
              if (this.widthStyleManager && this.settings.pageWidth.enabled) {
                this.widthStyleManager.updateConfig(this.settings.pageWidth);
              }
            }
          }
        ]);
        const collapsedContainer = createElement("div", {});
        const collapsedBtnDesc = createElement("div", {
          className: "chatgpt-helper-setting-item-desc",
          style: "padding: 0 12px 8px 12px; margin-bottom: 4px;"
        }, this.t("collapsedButtonsDesc") || "调整折叠面板按钮的显示顺序");
        collapsedContainer.appendChild(collapsedBtnDesc);
        const currentBtnOrder = this.settings.collapsedButtonsOrder || DEFAULT_COLLAPSED_BUTTONS_ORDER;
        currentBtnOrder.forEach((btnConfig, index) => {
          const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
          if (!def) return;
          const item = createElement("div", { className: "chatgpt-helper-setting-item" });
          const info = createElement("div", { className: "chatgpt-helper-setting-item-info" });
          const label = createElement("div", {
            className: "chatgpt-helper-setting-item-label",
            style: "display: flex; align-items: center;"
          });
          const iconSpan = createElement("span", {
            className: "chatgpt-helper-inline-icon-wrap",
            style: "display: inline-flex; width: 24px; min-width: 24px; justify-content: center; align-items: center; margin-right: 6px;"
          });
          iconSpan.appendChild(createCollapsedButtonIconNode(def, {
            size: 18,
            className: "chatgpt-helper-inline-icon"
          }));
          const buttonLabel = def.labelKey ? this.t(def.labelKey) : def.label || "";
          const textSpan = createElement("span", {}, buttonLabel);
          label.appendChild(iconSpan);
          label.appendChild(textSpan);
          info.appendChild(label);
          const controls = createElement("div", { className: "chatgpt-helper-setting-controls" });
          if (def.canToggle) {
            const toggle = createElement("div", {
              className: "setting-toggle" + (btnConfig.enabled ? " active" : ""),
              style: "transform: scale(0.8); margin-right: 12px;"
            });
            toggle.addEventListener("click", (e) => {
              e.stopPropagation();
              btnConfig.enabled = !btnConfig.enabled;
              toggle.classList.toggle("active", btnConfig.enabled);
              this.settings.collapsedButtonsOrder = currentBtnOrder;
              this.saveSettings();
              this.createCollapsedButtons();
              this.showToast(btnConfig.enabled ? this.t("enabled") || "已启用" : this.t("disabled") || "已禁用");
            });
            controls.appendChild(toggle);
          }
          const upBtn = createElement("button", {
            className: "prompt-panel-btn chatgpt-helper-order-btn",
            title: this.t("moveUp") || "上移"
          });
          upBtn.appendChild(createSvgIconNode("arrowUp", { size: 15 }));
          upBtn.disabled = index === 0;
          const downBtn = createElement("button", {
            className: "prompt-panel-btn chatgpt-helper-order-btn",
            title: this.t("moveDown") || "下移"
          });
          downBtn.appendChild(createSvgIconNode("arrowDown", { size: 15 }));
          downBtn.disabled = index === currentBtnOrder.length - 1;
          [upBtn, downBtn].forEach((btn) => {
            if (btn.disabled) {
              btn.style.opacity = "0.4";
              btn.style.cursor = "not-allowed";
            } else {
              btn.style.opacity = "1";
              btn.style.cursor = "pointer";
            }
          });
          upBtn.addEventListener("click", () => {
            if (index > 0) {
              const newOrder = [...currentBtnOrder];
              [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
              this.settings.collapsedButtonsOrder = newOrder;
              this.saveSettings();
              this.createCollapsedButtons();
              this.showToast(this.t("buttonOrderUpdated") || "已更新按钮顺序");
            }
          });
          downBtn.addEventListener("click", () => {
            if (index < currentBtnOrder.length - 1) {
              const newOrder = [...currentBtnOrder];
              [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
              this.settings.collapsedButtonsOrder = newOrder;
              this.saveSettings();
              this.createCollapsedButtons();
              this.showToast(this.t("buttonOrderUpdated") || "已更新按钮顺序");
            }
          });
          controls.appendChild(upBtn);
          controls.appendChild(downBtn);
          item.appendChild(info);
          item.appendChild(controls);
          collapsedContainer.appendChild(item);
        });
        const collapsedSection = this.createCollapsibleSection(this.t("collapsedButtonsTitle") || "折叠按钮", collapsedContainer, { defaultExpanded: false });
        const tabOrderSection = this.createSettingSection(this.t("tabOrderSettings") || "tab栏功能", [
          {
            label: this.t("tabPrompts") || "提示词",
            type: "toggle",
            value: this.settings.tabOrder?.includes("prompts") !== false,
            onChange: (val) => {
              if (!this.settings.tabOrder) this.settings.tabOrder = ["prompts", "outline", "conversations", "export"];
              if (val && !this.settings.tabOrder.includes("prompts")) {
                this.settings.tabOrder.push("prompts");
              } else if (!val) {
                this.settings.tabOrder = this.settings.tabOrder.filter((t2) => t2 !== "prompts");
              }
              this.saveSettings();
              this.createUI();
            }
          },
          {
            label: this.t("tabOutline") || "大纲",
            type: "toggle",
            value: this.settings.tabOrder?.includes("outline") !== false,
            onChange: (val) => {
              if (!this.settings.tabOrder) this.settings.tabOrder = ["prompts", "outline", "conversations", "export"];
              if (val && !this.settings.tabOrder.includes("outline")) {
                this.settings.tabOrder.push("outline");
              } else if (!val) {
                this.settings.tabOrder = this.settings.tabOrder.filter((t2) => t2 !== "outline");
              }
              this.saveSettings();
              this.createUI();
            }
          },
          {
            label: this.t("tabConversations") || "会话",
            type: "toggle",
            value: this.settings.tabOrder?.includes("conversations") !== false,
            onChange: (val) => {
              if (!this.settings.tabOrder) this.settings.tabOrder = ["prompts", "outline", "conversations", "export"];
              if (val && !this.settings.tabOrder.includes("conversations")) {
                this.settings.tabOrder.push("conversations");
              } else if (!val) {
                this.settings.tabOrder = this.settings.tabOrder.filter((t2) => t2 !== "conversations");
              }
              this.saveSettings();
              this.createUI();
            }
          },
          {
            label: this.t("tabExport") || "导出",
            type: "toggle",
            value: this.settings.tabOrder?.includes("export") !== false,
            onChange: (val) => {
              if (!this.settings.tabOrder) this.settings.tabOrder = ["prompts", "outline", "conversations", "export"];
              if (val && !this.settings.tabOrder.includes("export")) {
                this.settings.tabOrder.push("export");
              } else if (!val) {
                this.settings.tabOrder = this.settings.tabOrder.filter((t2) => t2 !== "export");
              }
              this.saveSettings();
              this.createUI();
            }
          }
        ]);
        const languageSection = this.createSettingSection(t("languageSettings"), [
          {
            label: t("language"),
            type: "select",
            value: this.lang || "auto",
            options: [
              { value: "auto", label: t("autoDetect") },
              { value: "zh-CN", label: t("chinese") },
              { value: "en", label: t("english") }
            ],
            onChange: (val) => {
              window.GM_setValue(SETTING_KEYS.LANGUAGE, val);
              setCurrentLang(val === "auto" ? detectLanguage() : val);
              this.lang = getCurrentLang();
              this.createUI();
              this.showToast(this.t("languageChanged") || "语言已更改");
            }
          }
        ]);
        const readingHistorySection = this.createSettingSection(this.t("readingHistory") || "阅读历史", [
          {
            label: this.t("enableReadingHistoryLabel") || "启用阅读历史",
            type: "toggle",
            value: this.settings.readingHistory?.persistence !== false,
            onChange: (val) => {
              if (!this.settings.readingHistory) this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
              this.settings.readingHistory.persistence = val;
              this.saveSettings();
              if (val && this.readingProgressManager) {
                this.readingProgressManager.startRecording();
              }
              this.showToast(val ? "已启用阅读历史" : "已禁用阅读历史");
            }
          },
          {
            label: this.t("autoRestoreLabel") || "自动跳转",
            type: "toggle",
            value: this.settings.readingHistory?.autoRestore || false,
            onChange: (val) => {
              if (!this.settings.readingHistory) this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
              this.settings.readingHistory.autoRestore = val;
              this.saveSettings();
              this.showToast(val ? "已启用自动跳转" : "已禁用自动跳转");
            }
          },
          {
            label: this.t("historyDaysLabel") || "历史保留时间（天）",
            type: "number",
            value: this.settings.readingHistory?.cleanupDays || 30,
            min: -1,
            max: 365,
            onChange: (val) => {
              if (!this.settings.readingHistory) this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
              this.settings.readingHistory.cleanupDays = parseInt(val) || 30;
              this.saveSettings();
              if (this.readingProgressManager) {
                this.readingProgressManager.cleanup();
              }
            }
          }
        ]);
        const outlineSettingsSection = this.createSettingSection(this.t("outlineSettings") || "大纲设置", [
          {
            label: this.t("autoUpdateOutlineLabel") || "对话期间自动更新大纲",
            type: "toggle",
            value: this.settings.outline?.autoUpdate !== false,
            onChange: (val) => {
              if (!this.settings.outline) this.settings.outline = {};
              this.settings.outline.autoUpdate = val;
              this.saveSettings();
              if (this.outlineManager) {
                this.outlineManager.updateAutoUpdateState();
              }
            }
          },
          {
            label: this.t("outlineIntervalLabel") || "更新检测间隔（秒）",
            type: "number",
            value: this.settings.outline?.updateInterval || 2,
            min: 1,
            max: 10,
            onChange: (val) => {
              if (!this.settings.outline) this.settings.outline = {};
              this.settings.outline.updateInterval = Math.max(1, Math.min(10, parseInt(val) || 2));
              this.saveSettings();
            }
          },
          {
            label: this.t("outlineSyncScrollLabel") || "同步滚动",
            type: "toggle",
            value: this.settings.outline?.syncScroll !== false,
            onChange: (val) => {
              if (!this.settings.outline) this.settings.outline = {};
              this.settings.outline.syncScroll = val;
              this.saveSettings();
              if (this.outlineManager) {
                this.outlineManager.updateSyncScrollState();
              }
            }
          },
          {
            label: this.t("outlineMaxLevelLabel") || "最大标题层级",
            type: "select",
            value: this.settings.outline?.maxLevel || 6,
            options: [
              { value: 1, label: "仅 H1" },
              { value: 2, label: "H1-H2" },
              { value: 3, label: "H1-H3" },
              { value: 4, label: "H1-H4" },
              { value: 5, label: "H1-H5" },
              { value: 6, label: "H1-H6（全部）" }
            ],
            onChange: (val) => {
              if (!this.settings.outline) this.settings.outline = {};
              this.settings.outline.maxLevel = parseInt(val) || 6;
              this.saveSettings();
              if (this.currentTab === "outline") {
                this.refreshOutline();
              }
            }
          }
        ]);
        const tabSettingsSection = this.createSettingSection(this.t("tabPageSettings") || "标签页设置", [
          {
            label: this.t("tabAutoRenameLabel") || "自动重命名标签页",
            type: "toggle",
            value: this.settings.tabSettings?.enabled !== false,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.enabled = val;
              this.saveSettings();
              if (this.tabRenameManager) {
                if (val) {
                  this.tabRenameManager.start();
                } else {
                  this.tabRenameManager.stop();
                }
              }
            }
          },
          {
            label: this.t("tabRenameIntervalLabel") || "重命名检测间隔（秒）",
            type: "number",
            value: this.settings.tabSettings?.renameInterval || 3,
            min: 1,
            max: 60,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.renameInterval = Math.max(1, Math.min(60, parseInt(val) || 3));
              this.saveSettings();
              if (this.tabRenameManager) {
                this.tabRenameManager.restartInterval();
              }
            }
          },
          {
            label: this.t("tabShowStatusLabel") || "显示生成状态",
            type: "toggle",
            value: this.settings.tabSettings?.showStatus !== false,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.showStatus = val;
              this.saveSettings();
              if (this.tabRenameManager) {
                this.tabRenameManager.updateTabName(true);
              }
            }
          },
          {
            label: this.t("tabPrivacyModeLabel") || "隐私模式",
            type: "toggle",
            value: this.settings.tabSettings?.privacyMode || false,
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.privacyMode = val;
              this.saveSettings();
              if (this.tabRenameManager) {
                this.tabRenameManager.updateTabName(true);
              }
            }
          },
          {
            label: this.t("tabPrivacyTitleLabel") || "隐私模式标题",
            type: "text",
            value: this.settings.tabSettings?.privacyTitle || "ChatGPT",
            onChange: (val) => {
              if (!this.settings.tabSettings) this.settings.tabSettings = {};
              this.settings.tabSettings.privacyTitle = val || "ChatGPT";
              this.saveSettings();
              if (this.tabRenameManager) {
                this.tabRenameManager.updateTabName(true);
              }
            }
          }
        ]);
        const copySettingsSection = this.createSettingSection(this.t("copySettings") || "复制功能", [
          {
            label: this.t("enableFormulaCopyLabel") || "启用公式复制",
            type: "toggle",
            value: this.settings.formulaCopy?.enabled !== false,
            onChange: (val) => {
              if (!this.settings.formulaCopy) this.settings.formulaCopy = { enabled: true, delimiterEnabled: true };
              this.settings.formulaCopy.enabled = val;
              this.saveSettings();
              if (this.copyManager && val) {
                this.copyManager.init();
              }
            }
          },
          {
            label: this.t("formulaDelimiterLabel") || "公式使用 LaTeX 分隔符（$ / $$）",
            type: "toggle",
            value: this.settings.formulaCopy?.delimiterEnabled !== false,
            onChange: (val) => {
              if (!this.settings.formulaCopy) this.settings.formulaCopy = { enabled: true, delimiterEnabled: true };
              this.settings.formulaCopy.delimiterEnabled = val;
              this.saveSettings();
            }
          },
          {
            label: this.t("enableTableCopyLabel") || "启用表格复制",
            type: "toggle",
            value: this.settings.tableCopy?.enabled !== false,
            onChange: (val) => {
              if (!this.settings.tableCopy) this.settings.tableCopy = { enabled: true };
              this.settings.tableCopy.enabled = val;
              this.saveSettings();
              if (this.copyManager && val) {
                this.copyManager.init();
              }
            }
          }
        ]);
        settingsContent.appendChild(panelSection);
        settingsContent.appendChild(themeSection);
        settingsContent.appendChild(featureSection);
        settingsContent.appendChild(pageSection);
        settingsContent.appendChild(collapsedSection);
        settingsContent.appendChild(tabOrderSection);
        settingsContent.appendChild(languageSection);
        settingsContent.appendChild(readingHistorySection);
        settingsContent.appendChild(outlineSettingsSection);
        settingsContent.appendChild(tabSettingsSection);
        settingsContent.appendChild(copySettingsSection);
        const aboutFooter = createElement("div", {
          className: "chatgpt-helper-settings-footer"
        });
        const aboutBtn = createElement("button", {
          className: "chatgpt-helper-about-btn",
          type: "button"
        }, this.t("aboutButton") || "About");
        aboutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openAboutModal();
        });
        aboutFooter.appendChild(aboutBtn);
        settingsContent.appendChild(aboutFooter);
        container.appendChild(settingsContent);
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Outline module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      refreshOutline() {
        const panel = this.panel.querySelector("#outline-content");
        if (panel && this.currentTab === "outline") {
          this.renderOutline(panel);
        }
      },
      renderOutline(container) {
        if (!this.outlineManager) {
          const siteAdapterWrapper = {
            getScrollContainer: () => this.scrollManager?.container || this.adapter.getResponseContainer(),
            extractUserQueryText: (element) => {
              if (!element) return "";
              const textContent = element.textContent || element.innerText || "";
              return textContent.trim();
            },
            ...this.adapter
          };
          this.outlineManager = new OutlineManager({
            container,
            settings: this.settings,
            siteAdapter: siteAdapterWrapper,
            onJumpBefore: () => {
              this.anchorManager.setAnchor(this.scrollManager.scrollTop);
            },
            onAutoUpdate: () => this.refreshOutline(),
            onSettingsChange: (newSettings) => {
              if (!this.settings.outline) this.settings.outline = {};
              Object.assign(this.settings.outline, newSettings);
              this.saveSettings();
            },
            // 使用全局 i18n 函数，确保大纲工具栏在中英文模式下的提示文案一致生效
            i18n: t
          });
        }
        if (this.outlineManager.container !== container) {
          this.outlineManager.container = container;
          this.outlineManager.createUI();
        } else {
          const outlineList = document.getElementById("outline-list");
          if (!outlineList) {
            this.outlineManager.createUI();
          }
        }
        const outline = this.extractOutline();
        if (outline && outline.length > 0) {
          this.outlineManager.update(outline);
          this.outlineManager.setActive(this.currentTab === "outline");
        } else {
          clearElement(container);
          const emptyMsg = createElement("div", {
            style: {
              padding: "40px 20px",
              textAlign: "center",
              color: "var(--gh-text-secondary)",
              fontSize: "14px"
            }
          }, "暂无大纲内容，请等待对话生成或刷新页面");
          container.appendChild(emptyMsg);
        }
      },
      extractOutline() {
        const outline = [];
        try {
          const isInConversationPage = window.location.pathname.includes("/c/");
          if (!isInConversationPage) {
            return [];
          }
          const messages = this.adapter.getChatMessages();
          if (!messages || messages.length === 0) {
            return [];
          }
          const responseContainer = this.adapter.getResponseContainer();
          if (!responseContainer || responseContainer.children.length === 0) {
            return [];
          }
          const validMessages = Array.from(messages).filter((msg) => {
            return responseContainer.contains(msg) || msg.closest("main");
          });
          if (validMessages.length === 0) {
            return [];
          }
          const headingSelectors = [
            "h1, h2, h3, h4, h5, h6",
            '[role="heading"]'
          ];
          validMessages.forEach((msg, msgIndex) => {
            const role = msg.getAttribute("data-message-author-role");
            const isAssistant = role === "assistant" || role === "system" || !role;
            const isUser = role === "user";
            if (isAssistant) {
              const headingsInMsg = [];
              for (const selector of headingSelectors) {
                const found = Array.from(msg.querySelectorAll(selector));
                if (found.length > 0) {
                  headingsInMsg.push(...found);
                  break;
                }
              }
              headingsInMsg.forEach((h) => {
                if (!h) return;
                if (h.offsetParent === null && h.style.display === "none") return;
                const text = (h.innerText || h.textContent || "").trim().replace(/\s+/g, " ");
                if (!text) return;
                let level = 3;
                const tagMatch = h.tagName && h.tagName.match(/^H([1-6])$/i);
                if (tagMatch) {
                  level = parseInt(tagMatch[1], 10);
                } else {
                  const ariaLevel = h.getAttribute("aria-level");
                  if (ariaLevel) {
                    const parsed = parseInt(ariaLevel, 10);
                    if (!Number.isNaN(parsed)) level = parsed;
                  }
                }
                outline.push({
                  level: Math.max(1, Math.min(6, level)),
                  text,
                  element: h,
                  isUserQuery: false,
                  index: outline.length
                });
              });
              if (headingsInMsg.length === 0) {
                const firstBlock = msg.querySelector("p, li, div");
                if (firstBlock) {
                  const raw = (firstBlock.innerText || firstBlock.textContent || "").trim();
                  if (raw) {
                    const text = raw.length > 80 ? raw.slice(0, 80) + "…" : raw;
                    outline.push({
                      level: 1,
                      text,
                      element: firstBlock,
                      isUserQuery: false,
                      index: outline.length
                    });
                  }
                }
              }
            }
            if (this.settings.outline?.showUserQueries && isUser) {
              const text = (msg.innerText || msg.textContent || "").trim();
              if (text) {
                const cleanText = text.replace(/\s+/g, " ");
                outline.push({
                  level: 0,
                  text: cleanText.length > 100 ? cleanText.slice(0, 100) + "..." : cleanText,
                  element: msg,
                  isUserQuery: true,
                  index: outline.length
                });
              }
            }
          });
          outline.sort((a, b) => {
            try {
              const aRect = a.element?.getBoundingClientRect();
              const bRect = b.element?.getBoundingClientRect();
              if (!aRect || !bRect) return 0;
              return aRect.top - bRect.top;
            } catch {
              return 0;
            }
          });
        } catch (error) {
          console.error("[ChatGPT Helper] 提取大纲时出错:", error);
        }
        return outline;
      }
    });
  })();
  (function() {
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
      TabRenameManager,
      ChatGPTAdapter,
      ChatGPTHelper
    } = H;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Controls And Events module");
      return;
    }
    Object.assign(ChatGPTHelper.prototype, {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.panel.classList.toggle("collapsed", this.isCollapsed);
        this.updateCollapseButtonState();
        const quickButtons = document.getElementById("chatgpt-helper-quick-buttons");
        if (quickButtons) {
          if (this.isCollapsed) {
            quickButtons.classList.remove("hidden");
            quickButtons.classList.add("collapsed");
            quickButtons.style.right = "8px";
            quickButtons.style.display = "flex";
          } else {
            quickButtons.classList.add("hidden");
            quickButtons.classList.remove("collapsed");
            quickButtons.style.right = `${this.settings.panelWidth + 20}px`;
            quickButtons.style.display = "none";
          }
        } else {
          this.createCollapsedButtons();
        }
        if (this.updateLayout) {
          this.updateLayout();
        }
        this.settings.defaultPanelState = !this.isCollapsed;
        this.saveSettings();
      },
      createCollapsedButtons() {
        const existing = document.getElementById("chatgpt-helper-quick-buttons");
        if (existing) existing.remove();
        const btnGroup = createElement("div", {
          id: "chatgpt-helper-quick-buttons",
          className: "chatgpt-helper-quick-buttons" + (this.isCollapsed ? " collapsed" : " hidden")
        });
        if (this.isCollapsed) {
          btnGroup.style.right = "8px";
          btnGroup.style.display = "flex";
          btnGroup.classList.remove("hidden");
          btnGroup.classList.add("collapsed");
        } else {
          btnGroup.style.right = `${this.settings.panelWidth + 20}px`;
          btnGroup.style.display = "none";
          btnGroup.classList.add("hidden");
          btnGroup.classList.remove("collapsed");
        }
        const btnOrder = this.settings.collapsedButtonsOrder || DEFAULT_COLLAPSED_BUTTONS_ORDER;
        const quickButtons = {};
        btnOrder.forEach((btnConfig, index) => {
          const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
          if (!def) return;
          if (btnConfig.id === "anchor" && this.settings.anchorEnabled === false) return;
          if (btnConfig.id === "theme" && this.settings.themeEnabled === false) return;
          if (btnConfig.id === "manualAnchor" && this.settings.manualAnchorEnabled === false) return;
          const isEnabled = def.canToggle ? btnConfig.enabled !== false : true;
          if (!isEnabled) return;
          if (index > 0 && def.isPanelOnly && !COLLAPSED_BUTTON_DEFS[btnOrder[index - 1].id]?.isPanelOnly) {
            btnGroup.appendChild(createElement("div", { className: "chatgpt-helper-btn-divider" }));
          }
          if (btnConfig.id === "manualAnchor") {
            const setBtn = createElement("button", {
              className: "chatgpt-helper-quick-btn",
              title: "设置锚点",
              id: "manual-anchor-set-btn",
              type: "button",
              "aria-label": "设置锚点"
            });
            setBtn.appendChild(createSvgIconNode("pin", { size: 18, className: "chatgpt-helper-quick-btn-icon" }));
            const handleSetClick = (e) => {
              console.log("[ChatGPT Helper] 设置锚点按钮点击");
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              this.setAnchorManually();
            };
            setBtn.addEventListener("click", handleSetClick, { capture: true, passive: false });
            setBtn.addEventListener("click", handleSetClick, { capture: false, passive: false });
            setBtn.addEventListener("mousedown", (e) => {
              e.preventDefault();
              e.stopPropagation();
            }, { capture: true });
            const backBtn = createElement("button", {
              className: "chatgpt-helper-quick-btn" + (this.savedAnchorTop === null ? " disabled" : ""),
              title: this.savedAnchorTop === null ? "暂无锚点" : "返回锚点",
              id: "manual-anchor-back-btn",
              type: "button",
              "aria-label": this.savedAnchorTop === null ? "暂无锚点" : "返回锚点"
            });
            backBtn.appendChild(createSvgIconNode("back", { size: 18, className: "chatgpt-helper-quick-btn-icon" }));
            const handleBackClick = (e) => {
              console.log("[ChatGPT Helper] 返回锚点按钮点击");
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (this.savedAnchorTop !== null) {
                this.backToManualAnchor();
              } else {
                this.showToast("暂无锚点");
              }
            };
            backBtn.addEventListener("click", handleBackClick, { capture: true, passive: false });
            backBtn.addEventListener("click", handleBackClick, { capture: false, passive: false });
            backBtn.addEventListener("mousedown", (e) => {
              e.preventDefault();
              e.stopPropagation();
            }, { capture: true });
            const clearBtn = createElement("button", {
              className: "chatgpt-helper-quick-btn" + (this.savedAnchorTop === null ? " disabled" : ""),
              title: "清除锚点",
              id: "manual-anchor-clear-btn",
              type: "button",
              "aria-label": "清除锚点"
            });
            clearBtn.appendChild(createSvgIconNode("close", { size: 18, className: "chatgpt-helper-quick-btn-icon" }));
            const handleClearClick = (e) => {
              console.log("[ChatGPT Helper] 清除锚点按钮点击");
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (this.savedAnchorTop !== null) {
                this.clearAnchorManually();
              } else {
                this.showToast("暂无锚点");
              }
            };
            clearBtn.addEventListener("click", handleClearClick, { capture: true, passive: false });
            clearBtn.addEventListener("click", handleClearClick, { capture: false, passive: false });
            clearBtn.addEventListener("mousedown", (e) => {
              e.preventDefault();
              e.stopPropagation();
            }, { capture: true });
            btnGroup.appendChild(setBtn);
            btnGroup.appendChild(backBtn);
            btnGroup.appendChild(clearBtn);
          } else {
            const btnTitle = def.labelKey ? this.t(def.labelKey) : def.label || "";
            const btn = createElement("button", {
              className: "chatgpt-helper-quick-btn" + (def.isPanelOnly ? " panel-only" : ""),
              title: btnTitle,
              id: `quick-btn-${btnConfig.id}`,
              type: "button",
              "aria-label": btnTitle
            });
            btn.appendChild(createCollapsedButtonIconNode(def, {
              size: btnConfig.id === "panel" ? 20 : 18,
              className: btnConfig.id === "panel" ? "chatgpt-helper-quick-btn-logo" : "chatgpt-helper-quick-btn-icon",
              title: btnTitle
            }));
            const self = this;
            const btnId = btnConfig.id;
            const handleClick = function(e) {
              console.log("[ChatGPT Helper] 按钮点击:", btnId, "按钮元素:", btn, "事件:", e);
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              try {
                if (btnId === "scrollTop") {
                  console.log("[ChatGPT Helper] 执行 scrollToTop");
                  self.scrollToTop();
                } else if (btnId === "scrollBottom") {
                  console.log("[ChatGPT Helper] 执行 scrollToBottom");
                  self.scrollToBottom();
                } else if (btnId === "panel") {
                  console.log("[ChatGPT Helper] 执行 toggleCollapse");
                  self.toggleCollapse();
                } else if (btnId === "anchor") {
                  console.log("[ChatGPT Helper] 执行 handleAnchorClick");
                  self.handleAnchorClick();
                } else if (btnId === "theme") {
                  console.log("[ChatGPT Helper] 执行 toggleTheme");
                  self.toggleTheme(e);
                  setTimeout(() => {
                    const isDark = document.body.dataset.ghMode === "dark" || document.documentElement.getAttribute("data-gh-mode") === "dark";
                    setButtonIcon(btn, isDark ? "moon" : "sun", {
                      size: 18,
                      className: "chatgpt-helper-quick-btn-icon"
                    });
                  }, 200);
                }
              } catch (error) {
                console.error("[ChatGPT Helper] 按钮操作失败:", btnId, error, error.stack);
                self.showToast("操作失败: " + error.message);
              }
            };
            btn.addEventListener("mouseenter", () => {
              console.log("[ChatGPT Helper] 鼠标悬停在按钮上:", btnId);
            });
            btn.addEventListener("mousedown", (e) => {
              console.log("[ChatGPT Helper] 按钮 mousedown:", btnId);
              e.preventDefault();
              e.stopPropagation();
            }, true);
            btn.onclick = handleClick;
            btn.addEventListener("click", handleClick, true);
            btn.addEventListener("click", handleClick, false);
            btn.addEventListener("mousedown", function(e) {
              e.preventDefault();
              e.stopPropagation();
            }, true);
            if (btnConfig.id === "anchor") {
              if (!self.hasAnchor) {
                btn.style.opacity = "0.4";
                btn.style.cursor = "default";
                btn.title = "暂无锚点";
              } else {
                btn.title = "返回跳转前位置";
              }
            } else if (btnConfig.id === "theme") {
              const isDark = document.body.dataset.ghMode === "dark" || document.documentElement.getAttribute("data-gh-mode") === "dark" || /\bdark\b/i.test(document.body.className);
              setButtonIcon(btn, isDark ? "moon" : "sun", {
                size: 18,
                className: "chatgpt-helper-quick-btn-icon"
              });
            }
            quickButtons[btnConfig.id] = btn;
            btnGroup.appendChild(btn);
          }
        });
        document.body.appendChild(btnGroup);
        this.quickButtons = quickButtons;
      },
      scrollToTop() {
        console.log("[ChatGPT Helper] scrollToTop 被调用");
        const currentScrollTop = this.scrollManager.scrollTop;
        if (currentScrollTop > 100 && this.anchorManager) {
          this.anchorManager.setAnchor(currentScrollTop);
        }
        const container = this.scrollManager.container;
        console.log("[ChatGPT Helper] 滚动容器:", container, "scrollTop:", container?.scrollTop, "scrollHeight:", container?.scrollHeight, "clientHeight:", container?.clientHeight);
        const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
        console.log("[ChatGPT Helper] 是否在底部（window）:", isAtBottomWindow, "window.scrollY:", window.scrollY, "document.body.scrollHeight:", document.body.scrollHeight);
        if (!container || container === document.body) {
          console.log("[ChatGPT Helper] 使用 window 滚动");
          if (isAtBottomWindow) {
            console.log("[ChatGPT Helper] 在底部，使用直接设置 scrollTop 强制滚动");
            const wasLockEnabled2 = this.scrollLockManager && this.scrollLockManager.enabled;
            if (wasLockEnabled2) {
              this.scrollLockManager.setEnabled(false);
            }
            const scrollElement = document.scrollingElement || document.documentElement || document.body;
            console.log("[ChatGPT Helper] 滚动元素:", scrollElement);
            let originalScrollTopSetter = null;
            if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
              originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
            }
            const forceScrollToZero2 = () => {
              try {
                if (originalScrollTopSetter) {
                  originalScrollTopSetter.call(scrollElement, 0);
                } else {
                  scrollElement.scrollTop = 0;
                }
                if (document.documentElement) {
                  document.documentElement.scrollTop = 0;
                }
                if (document.body) {
                  document.body.scrollTop = 0;
                }
              } catch (e) {
                console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e);
              }
            };
            forceScrollToZero2();
            setTimeout(() => forceScrollToZero2(), 0);
            setTimeout(() => forceScrollToZero2(), 10);
            let attempts = 0;
            const maxAttempts = 200;
            const scrollInterval = setInterval(() => {
              attempts++;
              const before = window.scrollY || scrollElement.scrollTop;
              if (wasLockEnabled2 && this.scrollLockManager) {
                this.scrollLockManager.setEnabled(false);
              }
              forceScrollToZero2();
              const current = window.scrollY || scrollElement.scrollTop;
              console.log("[ChatGPT Helper] window 强制滚动尝试", attempts, "当前位置:", current, "之前:", before, "scrollElement.scrollTop:", scrollElement.scrollTop);
              if (current <= 5 || attempts >= maxAttempts) {
                clearInterval(scrollInterval);
                if (wasLockEnabled2 && this.scrollLockManager) {
                  setTimeout(() => {
                    this.scrollLockManager.setEnabled(true);
                  }, 200);
                }
                console.log("[ChatGPT Helper] window 滚动到顶部完成，最终位置:", current, "尝试次数:", attempts);
                this.showToast("已滚动到顶部");
              } else if (current >= before && attempts > 10) {
                console.log("[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView");
                try {
                  const firstElement = document.body.firstElementChild || document.body.firstChild;
                  if (firstElement && firstElement.nodeType === 1) {
                    firstElement.scrollIntoView({ behavior: "instant", block: "start" });
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
                }
                clearInterval(scrollInterval);
                if (wasLockEnabled2 && this.scrollLockManager) {
                  setTimeout(() => {
                    this.scrollLockManager.setEnabled(true);
                  }, 200);
                }
                this.showToast("已滚动到顶部");
              }
            }, 10);
          } else {
            window.__ghBypassLock = true;
            window.scrollTo({ top: 0, behavior: "instant" });
            setTimeout(() => delete window.__ghBypassLock, 100);
            this.showToast("已滚动到顶部");
          }
          return;
        }
        if (container.scrollHeight <= container.clientHeight || container.clientHeight === 0) {
          console.log("[ChatGPT Helper] 容器不可滚动，尝试 window 滚动");
          if (isAtBottomWindow) {
            console.log("[ChatGPT Helper] 在底部（容器不可滚动），使用直接设置 scrollTop 强制滚动");
            const wasLockEnabled2 = this.scrollLockManager && this.scrollLockManager.enabled;
            if (wasLockEnabled2) {
              this.scrollLockManager.setEnabled(false);
            }
            const scrollElement = document.scrollingElement || document.documentElement || document.body;
            let originalScrollTopSetter = null;
            if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
              originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
            }
            const forceScrollToZero2 = () => {
              try {
                if (originalScrollTopSetter) {
                  originalScrollTopSetter.call(scrollElement, 0);
                } else {
                  scrollElement.scrollTop = 0;
                }
                if (document.documentElement) {
                  document.documentElement.scrollTop = 0;
                }
                if (document.body) {
                  document.body.scrollTop = 0;
                }
              } catch (e) {
                console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e);
              }
            };
            forceScrollToZero2();
            setTimeout(() => forceScrollToZero2(), 0);
            setTimeout(() => forceScrollToZero2(), 10);
            let attempts = 0;
            const maxAttempts = 200;
            const scrollInterval = setInterval(() => {
              attempts++;
              const before = window.scrollY || scrollElement.scrollTop;
              if (wasLockEnabled2 && this.scrollLockManager) {
                this.scrollLockManager.setEnabled(false);
              }
              forceScrollToZero2();
              const current = window.scrollY || scrollElement.scrollTop;
              if (current <= 5 || attempts >= maxAttempts) {
                clearInterval(scrollInterval);
                if (wasLockEnabled2 && this.scrollLockManager) {
                  setTimeout(() => {
                    this.scrollLockManager.setEnabled(true);
                  }, 200);
                }
                this.showToast("已滚动到顶部");
              } else if (current >= before && attempts > 10) {
                try {
                  const firstElement = document.body.firstElementChild || document.body.firstChild;
                  if (firstElement && firstElement.nodeType === 1) {
                    firstElement.scrollIntoView({ behavior: "instant", block: "start" });
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
                }
                clearInterval(scrollInterval);
                if (wasLockEnabled2 && this.scrollLockManager) {
                  setTimeout(() => {
                    this.scrollLockManager.setEnabled(true);
                  }, 200);
                }
                this.showToast("已滚动到顶部");
              }
            }, 10);
          } else {
            window.__ghBypassLock = true;
            window.scrollTo({ top: 0, behavior: "instant" });
            setTimeout(() => delete window.__ghBypassLock, 100);
            this.showToast("已滚动到顶部");
          }
          return;
        }
        const isAtBottomContainer = this.scrollManager.isAtBottom(50);
        console.log("[ChatGPT Helper] 是否在底部（容器）:", isAtBottomContainer, "当前scrollTop:", container.scrollTop, "scrollHeight:", container.scrollHeight, "clientHeight:", container.clientHeight);
        const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
        let originalScrollTopDescriptor = null;
        let scrollTopRestored = false;
        if (wasLockEnabled) {
          console.log("[ChatGPT Helper] 完全禁用 ScrollLockManager");
          this.scrollLockManager.setEnabled(false);
          if (this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
            originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;
            if (originalScrollTopDescriptor && isAtBottomContainer) {
              try {
                Object.defineProperty(Element.prototype, "scrollTop", originalScrollTopDescriptor);
                scrollTopRestored = true;
                console.log("[ChatGPT Helper] 已临时恢复原始 scrollTop setter");
              } catch (e) {
                console.warn("[ChatGPT Helper] 恢复 scrollTop setter 失败:", e);
              }
            }
          }
        }
        container.__ghBypassLock = true;
        const getNativeSetter = () => {
          if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
            return originalScrollTopDescriptor.set;
          }
          const proto = Object.getPrototypeOf(container);
          const descriptor = Object.getOwnPropertyDescriptor(proto, "scrollTop") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop") || Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
          return descriptor?.set;
        };
        const nativeSetter = getNativeSetter();
        const forceScrollToZero = () => {
          try {
            if (nativeSetter) {
              nativeSetter.call(container, 0);
            } else {
              Object.defineProperty(container, "scrollTop", {
                value: 0,
                writable: true,
                configurable: true
              });
            }
          } catch (e) {
            try {
              container.scrollTop = 0;
            } catch (e2) {
              console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e2);
            }
          }
        };
        const cleanup = () => {
          delete container.__ghBypassLock;
          if (wasLockEnabled && this.scrollLockManager) {
            if (scrollTopRestored && this.scrollLockManager.originalApis) {
              try {
                const self = this.scrollLockManager;
                Object.defineProperty(Element.prototype, "scrollTop", {
                  get: function() {
                    return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                  },
                  set: function(value) {
                    if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                      return;
                    }
                    if (self.originalApis.scrollTopDescriptor.set) {
                      self.originalApis.scrollTopDescriptor.set.call(this, value);
                    }
                  },
                  configurable: true
                });
              } catch (e) {
                console.warn("[ChatGPT Helper] 重新劫持 scrollTop setter 失败:", e);
              }
            }
            setTimeout(() => {
              this.scrollLockManager.setEnabled(true);
            }, 200);
          }
        };
        forceScrollToZero();
        setTimeout(() => forceScrollToZero(), 0);
        setTimeout(() => forceScrollToZero(), 10);
        try {
          container.scrollTo({ top: 0, behavior: "instant", __bypassLock: true });
        } catch (e) {
          console.log("[ChatGPT Helper] scrollTo 失败:", e);
        }
        if (isAtBottomContainer) {
          console.log("[ChatGPT Helper] 在底部，使用 setInterval 强制滚动");
          let attempts = 0;
          const maxAttempts = 200;
          const scrollInterval = setInterval(() => {
            attempts++;
            const before = container.scrollTop;
            container.__ghBypassLock = true;
            if (wasLockEnabled && this.scrollLockManager) {
              this.scrollLockManager.setEnabled(false);
            }
            forceScrollToZero();
            const current = container.scrollTop;
            console.log("[ChatGPT Helper] 强制滚动尝试", attempts, "当前位置:", current, "之前:", before);
            if (current <= 5 || attempts >= maxAttempts) {
              clearInterval(scrollInterval);
              cleanup();
              console.log("[ChatGPT Helper] 滚动到顶部完成，最终位置:", current, "尝试次数:", attempts);
              this.showToast("已滚动到顶部");
            } else if (current >= before && attempts > 10) {
              console.log("[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView");
              try {
                const firstChild = container.firstElementChild || container.firstChild;
                if (firstChild && firstChild.nodeType === 1) {
                  firstChild.scrollIntoView({ behavior: "instant", block: "start" });
                }
              } catch (e) {
                console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
              }
              clearInterval(scrollInterval);
              cleanup();
              this.showToast("已滚动到顶部");
            }
          }, 10);
        } else {
          let attempts = 0;
          const maxAttempts = 50;
          const scrollStep = () => {
            attempts++;
            const before = container.scrollTop;
            container.__ghBypassLock = true;
            if (wasLockEnabled && this.scrollLockManager) {
              this.scrollLockManager.setEnabled(false);
            }
            forceScrollToZero();
            const current = container.scrollTop;
            if (current <= 5 || attempts >= maxAttempts) {
              cleanup();
              console.log("[ChatGPT Helper] 滚动到顶部完成，最终位置:", current, "尝试次数:", attempts);
              this.showToast("已滚动到顶部");
            } else if (current < before) {
              requestAnimationFrame(scrollStep);
            } else {
              cleanup();
              this.showToast("已滚动到顶部");
            }
          };
          requestAnimationFrame(() => {
            requestAnimationFrame(scrollStep);
          });
        }
      },
      scrollToBottom() {
        console.log("[ChatGPT Helper] scrollToBottom 被调用");
        const currentScrollTop = this.scrollManager.scrollTop;
        if (currentScrollTop > 100 && this.anchorManager) {
          this.anchorManager.setAnchor(currentScrollTop);
        }
        const container = this.scrollManager.container;
        console.log("[ChatGPT Helper] 滚动容器:", container, "scrollTop:", container?.scrollTop, "scrollHeight:", container?.scrollHeight, "clientHeight:", container?.clientHeight);
        if (!container || container === document.body) {
          console.log("[ChatGPT Helper] 使用 window 滚动到底部");
          window.__ghBypassLock = true;
          window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
          setTimeout(() => delete window.__ghBypassLock, 100);
          this.showToast("已滚动到底部");
          return;
        }
        const targetTop = Math.max(0, container.scrollHeight - container.clientHeight);
        console.log("[ChatGPT Helper] 目标滚动位置:", targetTop);
        if (container.scrollHeight <= container.clientHeight || container.clientHeight === 0) {
          console.log("[ChatGPT Helper] 容器不可滚动，尝试 window 滚动");
          window.__ghBypassLock = true;
          window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
          setTimeout(() => delete window.__ghBypassLock, 100);
          this.showToast("已滚动到底部");
          return;
        }
        const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
        if (wasLockEnabled) {
          console.log("[ChatGPT Helper] 临时禁用 ScrollLockManager");
          this.scrollLockManager.setEnabled(false);
        }
        container.__ghBypassLock = true;
        const scrollToTarget = () => {
          try {
            const proto = Object.getPrototypeOf(container);
            const descriptor = Object.getOwnPropertyDescriptor(proto, "scrollTop") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop") || Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
            if (descriptor && descriptor.set) {
              console.log("[ChatGPT Helper] 使用原生 scrollTop setter");
              descriptor.set.call(container, targetTop);
            } else {
              console.log("[ChatGPT Helper] 使用直接设置 scrollTop");
              Object.defineProperty(container, "scrollTop", {
                value: targetTop,
                writable: true,
                configurable: true
              });
            }
          } catch (e) {
            console.log("[ChatGPT Helper] 原生 setter 失败，使用直接设置:", e);
            try {
              container.scrollTop = targetTop;
            } catch (e2) {
              console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e2);
            }
          }
        };
        scrollToTarget();
        try {
          container.scrollTo({ top: targetTop, behavior: "instant", __bypassLock: true });
        } catch (e) {
          console.log("[ChatGPT Helper] scrollTo 失败:", e);
        }
        let attempts = 0;
        const maxAttempts = 50;
        const scrollStep = () => {
          attempts++;
          const before = container.scrollTop;
          Math.max(0, container.scrollHeight - container.clientHeight);
          container.__ghBypassLock = true;
          if (wasLockEnabled && this.scrollLockManager) {
            this.scrollLockManager.setEnabled(false);
          }
          scrollToTarget();
          const currentTop = container.scrollTop;
          const distanceToBottom = container.scrollHeight - currentTop - container.clientHeight;
          if (distanceToBottom <= 5 || attempts >= maxAttempts) {
            delete container.__ghBypassLock;
            if (wasLockEnabled && this.scrollLockManager) {
              setTimeout(() => {
                this.scrollLockManager.setEnabled(true);
              }, 200);
            }
            console.log("[ChatGPT Helper] 滚动到底部完成，最终位置:", currentTop, "距离底部:", distanceToBottom, "尝试次数:", attempts);
            this.showToast("已滚动到底部");
          } else if (currentTop > before) {
            requestAnimationFrame(scrollStep);
          } else {
            console.log("[ChatGPT Helper] 滚动被拦截，尝试更强制的方法");
            try {
              const lastChild = container.lastElementChild || container.lastChild;
              if (lastChild && lastChild.nodeType === 1) {
                lastChild.scrollIntoView({ behavior: "instant", block: "end" });
              }
            } catch (e) {
              console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
            }
            delete container.__ghBypassLock;
            if (wasLockEnabled && this.scrollLockManager) {
              setTimeout(() => {
                this.scrollLockManager.setEnabled(true);
              }, 200);
            }
            this.showToast("已滚动到底部");
          }
        };
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollStep);
        });
      },
      setAnchorManually() {
        try {
          const container = this.scrollManager.container;
          if (container) {
            this.savedAnchorTop = container.scrollTop || this.scrollManager.scrollTop;
          } else {
            this.savedAnchorTop = window.scrollY || 0;
          }
          this.showAnchorMarker(this.savedAnchorTop);
          this.updateManualAnchorButtons();
          this.showToast("已设置锚点");
        } catch (error) {
          console.error("[ChatGPT Helper] 设置锚点失败:", error);
          this.showToast("设置锚点失败");
        }
      },
      backToManualAnchor() {
        if (this.savedAnchorTop === null) {
          this.showToast("暂无锚点");
          return;
        }
        try {
          const container = this.scrollManager.container;
          const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
          if (!container || container === document.body) {
            if (isAtBottomWindow) {
              console.log("[ChatGPT Helper] 在底部（手动锚点），使用直接设置 scrollTop 强制滚动");
              const wasLockEnabled2 = this.scrollLockManager && this.scrollLockManager.enabled;
              if (wasLockEnabled2) {
                this.scrollLockManager.setEnabled(false);
              }
              const scrollElement = document.scrollingElement || document.documentElement || document.body;
              let originalScrollTopSetter = null;
              if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
              }
              const forceScrollToTarget2 = () => {
                try {
                  if (originalScrollTopSetter) {
                    originalScrollTopSetter.call(scrollElement, this.savedAnchorTop);
                  } else {
                    scrollElement.scrollTop = this.savedAnchorTop;
                  }
                  if (document.documentElement) {
                    document.documentElement.scrollTop = this.savedAnchorTop;
                  }
                  if (document.body) {
                    document.body.scrollTop = this.savedAnchorTop;
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e);
                }
              };
              forceScrollToTarget2();
              setTimeout(() => forceScrollToTarget2(), 0);
              setTimeout(() => forceScrollToTarget2(), 10);
              let attempts = 0;
              const maxAttempts = 200;
              const scrollInterval = setInterval(() => {
                attempts++;
                const before = window.scrollY || scrollElement.scrollTop;
                if (wasLockEnabled2 && this.scrollLockManager) {
                  this.scrollLockManager.setEnabled(false);
                }
                forceScrollToTarget2();
                const current = window.scrollY || scrollElement.scrollTop;
                const diff = Math.abs(current - this.savedAnchorTop);
                console.log("[ChatGPT Helper] window 强制滚动到锚点尝试", attempts, "当前位置:", current, "目标:", this.savedAnchorTop, "差值:", diff);
                if (diff <= 5) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  this.showToast("已返回锚点");
                } else if (attempts >= maxAttempts) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  this.showToast("返回锚点失败");
                } else if (Math.abs(current - before) < 1 && attempts > 10) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  this.showToast("返回锚点失败");
                }
              }, 10);
            } else {
              window.__ghBypassLock = true;
              window.scrollTo({ top: this.savedAnchorTop, behavior: "instant" });
              setTimeout(() => delete window.__ghBypassLock, 100);
              this.showToast("已返回锚点");
            }
            return;
          }
          const isAtBottomContainer = this.scrollManager.isAtBottom(50);
          console.log("[ChatGPT Helper] 返回锚点，是否在底部:", isAtBottomContainer, "目标位置:", this.savedAnchorTop);
          const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
          let originalScrollTopDescriptor = null;
          let scrollTopRestored = false;
          if (wasLockEnabled && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
            this.scrollLockManager.setEnabled(false);
            originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;
            if (originalScrollTopDescriptor && isAtBottomContainer) {
              try {
                Object.defineProperty(Element.prototype, "scrollTop", originalScrollTopDescriptor);
                scrollTopRestored = true;
                console.log("[ChatGPT Helper] 已临时恢复原始 scrollTop setter（锚点）");
              } catch (e) {
                console.warn("[ChatGPT Helper] 恢复 scrollTop setter 失败:", e);
              }
            }
          } else if (wasLockEnabled) {
            this.scrollLockManager.setEnabled(false);
          }
          container.__ghBypassLock = true;
          const getNativeSetter = () => {
            if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
              return originalScrollTopDescriptor.set;
            }
            const proto = Object.getPrototypeOf(container);
            const descriptor = Object.getOwnPropertyDescriptor(proto, "scrollTop") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop") || Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
            return descriptor?.set;
          };
          const nativeSetter = getNativeSetter();
          const forceScrollToTarget = () => {
            try {
              if (nativeSetter) {
                nativeSetter.call(container, this.savedAnchorTop);
              } else {
                Object.defineProperty(container, "scrollTop", {
                  value: this.savedAnchorTop,
                  writable: true,
                  configurable: true
                });
              }
            } catch (e) {
              container.scrollTop = this.savedAnchorTop;
            }
          };
          const cleanup = () => {
            delete container.__ghBypassLock;
            if (wasLockEnabled && this.scrollLockManager) {
              if (scrollTopRestored && this.scrollLockManager.originalApis) {
                try {
                  const self = this.scrollLockManager;
                  Object.defineProperty(Element.prototype, "scrollTop", {
                    get: function() {
                      return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                    },
                    set: function(value) {
                      if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                        return;
                      }
                      if (self.originalApis.scrollTopDescriptor.set) {
                        self.originalApis.scrollTopDescriptor.set.call(this, value);
                      }
                    },
                    configurable: true
                  });
                } catch (e) {
                  console.warn("[ChatGPT Helper] 重新劫持 scrollTop setter 失败:", e);
                }
              }
              setTimeout(() => {
                this.scrollLockManager.setEnabled(true);
              }, 200);
            }
          };
          forceScrollToTarget();
          setTimeout(() => forceScrollToTarget(), 0);
          setTimeout(() => forceScrollToTarget(), 10);
          try {
            container.scrollTo({ top: this.savedAnchorTop, behavior: "instant", __bypassLock: true });
          } catch (e) {
            console.log("[ChatGPT Helper] scrollTo 失败:", e);
          }
          if (isAtBottomContainer) {
            console.log("[ChatGPT Helper] 在底部，使用 setInterval 强制滚动到锚点");
            let attempts = 0;
            const maxAttempts = 200;
            const scrollInterval = setInterval(() => {
              attempts++;
              const before = container.scrollTop;
              container.__ghBypassLock = true;
              if (wasLockEnabled && this.scrollLockManager) {
                this.scrollLockManager.setEnabled(false);
              }
              forceScrollToTarget();
              const current = container.scrollTop;
              const diff = Math.abs(current - this.savedAnchorTop);
              console.log("[ChatGPT Helper] 强制滚动到锚点尝试", attempts, "当前位置:", current, "目标:", this.savedAnchorTop, "差值:", diff);
              if (diff <= 5) {
                clearInterval(scrollInterval);
                cleanup();
                this.showToast("已返回锚点");
              } else if (attempts >= maxAttempts) {
                clearInterval(scrollInterval);
                cleanup();
                this.showToast("返回锚点失败");
              } else if (Math.abs(current - before) < 1 && attempts > 10) {
                console.log("[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView");
                try {
                  const children = Array.from(container.children);
                  for (const child of children) {
                    const rect = child.getBoundingClientRect();
                    const childTop = container.scrollTop + rect.top - container.getBoundingClientRect().top;
                    if (Math.abs(childTop - this.savedAnchorTop) < 100) {
                      child.scrollIntoView({ behavior: "instant", block: "start" });
                      break;
                    }
                  }
                  setTimeout(() => {
                    const finalCurrent = container.scrollTop;
                    const finalDiff = Math.abs(finalCurrent - this.savedAnchorTop);
                    if (finalDiff <= 5) {
                      this.showToast("已返回锚点");
                    } else {
                      this.showToast("返回锚点失败");
                    }
                  }, 100);
                } catch (e) {
                  console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
                  clearInterval(scrollInterval);
                  cleanup();
                  this.showToast("返回锚点失败");
                }
                clearInterval(scrollInterval);
                cleanup();
              }
            }, 10);
          } else {
            cleanup();
            this.showToast("已返回锚点");
          }
        } catch (error) {
          console.error("[ChatGPT Helper] 返回锚点失败:", error);
          this.showToast("返回锚点失败");
        }
      },
      clearAnchorManually() {
        this.savedAnchorTop = null;
        this.hideAnchorMarker();
        this.updateManualAnchorButtons();
        this.showToast("已清除锚点");
      },
      showAnchorMarker(scrollTop) {
        this.hideAnchorMarker();
        const container = this.scrollManager.container;
        if (!container) return;
        const containerStyle = window.getComputedStyle(container);
        if (containerStyle.position === "static") {
          container.style.position = "relative";
        }
        const marker = createElement("div", {
          className: "chatgpt-helper-anchor-marker",
          id: "chatgpt-helper-anchor-marker",
          style: `top: ${scrollTop}px;`
        });
        container.appendChild(marker);
      },
      hideAnchorMarker() {
        const marker = document.getElementById("chatgpt-helper-anchor-marker");
        if (marker) {
          marker.remove();
        }
      },
      updateManualAnchorButtons() {
        const backBtn = document.getElementById("manual-anchor-back-btn");
        const clearBtn = document.getElementById("manual-anchor-clear-btn");
        const hasAnchor = this.savedAnchorTop !== null;
        if (backBtn) {
          backBtn.classList.toggle("disabled", !hasAnchor);
          backBtn.title = hasAnchor ? "返回锚点" : "暂无锚点";
        }
        if (clearBtn) {
          clearBtn.classList.toggle("disabled", !hasAnchor);
        }
      },
      handleAnchorClick() {
        if (!this.anchorManager || !this.anchorManager.hasAnchor()) {
          this.showToast("暂无锚点（点击顶部/底部按钮可自动生成）");
          return;
        }
        try {
          const container = this.scrollManager.container;
          const isAtBottomWindow = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
          if (!container || container === document.body) {
            const anchorTop2 = this.anchorManager.previousAnchor?.top;
            if (anchorTop2 === void 0) {
              this.showToast("返回锚点失败");
              return;
            }
            if (isAtBottomWindow) {
              console.log("[ChatGPT Helper] 在底部（自动锚点），使用直接设置 scrollTop 强制滚动");
              const wasLockEnabled2 = this.scrollLockManager && this.scrollLockManager.enabled;
              if (wasLockEnabled2) {
                this.scrollLockManager.setEnabled(false);
              }
              const scrollElement = document.scrollingElement || document.documentElement || document.body;
              let originalScrollTopSetter = null;
              if (this.scrollLockManager && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
                originalScrollTopSetter = this.scrollLockManager.originalApis.scrollTopDescriptor.set;
              }
              const forceScrollToTarget2 = () => {
                try {
                  if (originalScrollTopSetter) {
                    originalScrollTopSetter.call(scrollElement, anchorTop2);
                  } else {
                    scrollElement.scrollTop = anchorTop2;
                  }
                  if (document.documentElement) {
                    document.documentElement.scrollTop = anchorTop2;
                  }
                  if (document.body) {
                    document.body.scrollTop = anchorTop2;
                  }
                } catch (e) {
                  console.error("[ChatGPT Helper] 设置 scrollTop 失败:", e);
                }
              };
              forceScrollToTarget2();
              setTimeout(() => forceScrollToTarget2(), 0);
              setTimeout(() => forceScrollToTarget2(), 10);
              let attempts = 0;
              const maxAttempts = 200;
              const scrollInterval = setInterval(() => {
                attempts++;
                const before = window.scrollY || scrollElement.scrollTop;
                if (wasLockEnabled2 && this.scrollLockManager) {
                  this.scrollLockManager.setEnabled(false);
                }
                forceScrollToTarget2();
                const current = window.scrollY || scrollElement.scrollTop;
                const diff = Math.abs(current - anchorTop2);
                console.log("[ChatGPT Helper] window 强制滚动到锚点尝试", attempts, "当前位置:", current, "目标:", anchorTop2, "差值:", diff);
                if (diff <= 5) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  const currentPos = this.anchorManager._captureCurrentPosition();
                  this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                  this.anchorManager.previousAnchor = currentPos;
                  this.showToast("已返回跳转前位置");
                } else if (attempts >= maxAttempts) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  this.showToast("返回锚点失败");
                } else if (Math.abs(current - before) < 1 && attempts > 10) {
                  clearInterval(scrollInterval);
                  if (wasLockEnabled2 && this.scrollLockManager) {
                    setTimeout(() => {
                      this.scrollLockManager.setEnabled(true);
                    }, 200);
                  }
                  this.showToast("返回锚点失败");
                }
              }, 10);
            } else {
              const success = this.anchorManager.backToAnchor();
              if (success) {
                this.showToast("已返回跳转前位置");
              } else {
                this.showToast("返回锚点失败");
              }
            }
            return;
          }
          const isAtBottomContainer = this.scrollManager.isAtBottom(50);
          console.log("[ChatGPT Helper] 返回锚点，是否在底部:", isAtBottomContainer);
          const anchorTop = this.anchorManager.previousAnchor?.top;
          if (anchorTop === void 0) {
            this.showToast("返回锚点失败");
            return;
          }
          const wasLockEnabled = this.scrollLockManager && this.scrollLockManager.enabled;
          let originalScrollTopDescriptor = null;
          let scrollTopRestored = false;
          if (wasLockEnabled && this.scrollLockManager.originalApis && this.scrollLockManager.originalApis.scrollTopDescriptor) {
            this.scrollLockManager.setEnabled(false);
            originalScrollTopDescriptor = this.scrollLockManager.originalApis.scrollTopDescriptor;
            if (originalScrollTopDescriptor && isAtBottomContainer) {
              try {
                Object.defineProperty(Element.prototype, "scrollTop", originalScrollTopDescriptor);
                scrollTopRestored = true;
                console.log("[ChatGPT Helper] 已临时恢复原始 scrollTop setter（自动锚点）");
              } catch (e) {
                console.warn("[ChatGPT Helper] 恢复 scrollTop setter 失败:", e);
              }
            }
          } else if (wasLockEnabled) {
            this.scrollLockManager.setEnabled(false);
          }
          container.__ghBypassLock = true;
          const getNativeSetter = () => {
            if (originalScrollTopDescriptor && originalScrollTopDescriptor.set) {
              return originalScrollTopDescriptor.set;
            }
            const proto = Object.getPrototypeOf(container);
            const descriptor = Object.getOwnPropertyDescriptor(proto, "scrollTop") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTop") || Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
            return descriptor?.set;
          };
          const nativeSetter = getNativeSetter();
          const forceScrollToTarget = () => {
            try {
              if (nativeSetter) {
                nativeSetter.call(container, anchorTop);
              } else {
                Object.defineProperty(container, "scrollTop", {
                  value: anchorTop,
                  writable: true,
                  configurable: true
                });
              }
            } catch (e) {
              container.scrollTop = anchorTop;
            }
          };
          const cleanup = () => {
            delete container.__ghBypassLock;
            if (wasLockEnabled && this.scrollLockManager) {
              if (scrollTopRestored && this.scrollLockManager.originalApis) {
                try {
                  const self = this.scrollLockManager;
                  Object.defineProperty(Element.prototype, "scrollTop", {
                    get: function() {
                      return self.originalApis.scrollTopDescriptor.get ? self.originalApis.scrollTopDescriptor.get.call(this) : 0;
                    },
                    set: function(value) {
                      if (self.enabled && self.shouldBlockScroll() && self.isMainScrollElement(this) && !self.shouldBypassLock(null, this) && value > this.scrollTop + 50) {
                        return;
                      }
                      if (self.originalApis.scrollTopDescriptor.set) {
                        self.originalApis.scrollTopDescriptor.set.call(this, value);
                      }
                    },
                    configurable: true
                  });
                } catch (e) {
                  console.warn("[ChatGPT Helper] 重新劫持 scrollTop setter 失败:", e);
                }
              }
              setTimeout(() => {
                this.scrollLockManager.setEnabled(true);
              }, 200);
            }
          };
          forceScrollToTarget();
          setTimeout(() => forceScrollToTarget(), 0);
          setTimeout(() => forceScrollToTarget(), 10);
          try {
            container.scrollTo({ top: anchorTop, behavior: "instant", __bypassLock: true });
          } catch (e) {
            console.log("[ChatGPT Helper] scrollTo 失败:", e);
          }
          if (isAtBottomContainer) {
            console.log("[ChatGPT Helper] 在底部，使用 setInterval 强制滚动到锚点");
            let attempts = 0;
            const maxAttempts = 200;
            const scrollInterval = setInterval(() => {
              attempts++;
              const before = container.scrollTop;
              container.__ghBypassLock = true;
              if (wasLockEnabled && this.scrollLockManager) {
                this.scrollLockManager.setEnabled(false);
              }
              forceScrollToTarget();
              const current = container.scrollTop;
              const diff = Math.abs(current - anchorTop);
              console.log("[ChatGPT Helper] 强制滚动到锚点尝试", attempts, "当前位置:", current, "目标:", anchorTop, "差值:", diff);
              if (diff <= 5) {
                clearInterval(scrollInterval);
                cleanup();
                const currentPos = this.anchorManager._captureCurrentPosition();
                this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                this.anchorManager.previousAnchor = currentPos;
                this.showToast("已返回跳转前位置");
              } else if (attempts >= maxAttempts) {
                clearInterval(scrollInterval);
                cleanup();
                this.showToast("返回锚点失败");
              } else if (Math.abs(current - before) < 1 && attempts > 10) {
                console.log("[ChatGPT Helper] 滚动被拦截，尝试 scrollIntoView");
                try {
                  const children = Array.from(container.children);
                  for (const child of children) {
                    const rect = child.getBoundingClientRect();
                    const childTop = container.scrollTop + rect.top - container.getBoundingClientRect().top;
                    if (Math.abs(childTop - anchorTop) < 100) {
                      child.scrollIntoView({ behavior: "instant", block: "start" });
                      break;
                    }
                  }
                  setTimeout(() => {
                    const finalCurrent = container.scrollTop;
                    const finalDiff = Math.abs(finalCurrent - anchorTop);
                    if (finalDiff <= 5) {
                      const currentPos = this.anchorManager._captureCurrentPosition();
                      this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
                      this.anchorManager.previousAnchor = currentPos;
                      this.showToast("已返回跳转前位置");
                    } else {
                      this.showToast("返回锚点失败");
                    }
                  }, 100);
                } catch (e) {
                  console.error("[ChatGPT Helper] scrollIntoView 失败:", e);
                  clearInterval(scrollInterval);
                  cleanup();
                  this.showToast("返回锚点失败");
                }
                clearInterval(scrollInterval);
                cleanup();
              }
            }, 10);
          } else {
            const success = this.anchorManager.backToAnchor();
            cleanup();
            if (success) {
              const currentPos = this.anchorManager._captureCurrentPosition();
              this.anchorManager.currentAnchor = this.anchorManager.previousAnchor;
              this.anchorManager.previousAnchor = currentPos;
              this.showToast("已返回跳转前位置");
            } else {
              this.showToast("返回锚点失败");
            }
          }
        } catch (error) {
          console.error("[ChatGPT Helper] 返回锚点失败:", error);
          this.showToast("返回锚点失败");
        }
      },
      updateAnchorButton() {
        const hasAnchor = this.anchorManager ? this.anchorManager.hasAnchor() : this.hasAnchor;
        const anchorBtn = document.getElementById("quick-btn-anchor");
        if (anchorBtn) {
          anchorBtn.style.opacity = hasAnchor ? "1" : "0.4";
          anchorBtn.style.cursor = hasAnchor ? "pointer" : "default";
          anchorBtn.title = hasAnchor ? "返回跳转前位置" : "暂无锚点";
        }
        const navAnchorBtn = document.getElementById("scroll-anchor-btn");
        if (navAnchorBtn) {
          if (hasAnchor) {
            navAnchorBtn.style.opacity = "1";
            navAnchorBtn.style.cursor = "pointer";
            navAnchorBtn.title = "返回跳转前位置";
          } else {
            navAnchorBtn.style.opacity = "0.4";
            navAnchorBtn.style.cursor = "default";
            navAnchorBtn.title = "暂无锚点";
          }
        }
      },
      toggleTheme(event) {
        try {
          const currentTheme = this.detectEffectiveThemeFromDom();
          const nextMode = currentTheme === "dark" ? "light" : "dark";
          void this.applyAppearanceMode(nextMode, {
            persist: true,
            showToast: true,
            preferNative: true
          }).catch((error) => {
            console.error("[ChatGPT Helper] 主题切换失败:", error, error && error.stack);
            this.showToast(this.t("themeSwitchFailed"));
          });
        } catch (error) {
          console.error("[ChatGPT Helper] 主题切换失败:", error, error.stack);
          this.showToast(this.t("themeSwitchFailed"));
        }
      },
      monitorTheme() {
        const checkTheme = () => {
          const detectedMode = this.detectEffectiveThemeFromDom();
          const changed = this.currentEffectiveTheme !== detectedMode;
          this.syncHelperThemeMode(detectedMode);
          this.settings.themeMode = detectedMode;
          if (changed) {
            this.updateThemeVisualState();
          }
        };
        checkTheme();
        if (!this.themeObserver) {
          this.themeObserver = new MutationObserver(() => {
            checkTheme();
          });
          this.themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["class", "data-theme", "style"]
          });
          this.themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme", "style"]
          });
          window.addEventListener("themechange", checkTheme);
          document.addEventListener("themechange", checkTheme);
        }
      },
      showToast(message) {
        const existing = document.getElementById("chatgpt-helper-toast");
        if (existing) existing.remove();
        const toast = createElement("div", {
          id: "chatgpt-helper-toast",
          className: "chatgpt-helper-toast"
        }, message);
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2e3);
      },
      bindEvents() {
        let updateTimeout = null;
        const observer = new MutationObserver((mutations) => {
          let isOutlineInternalChange = false;
          for (const mutation of mutations) {
            const target = mutation.target;
            if (target && (target.id === "outline-list" || target.id === "outline-list-wrapper" || target.closest("#outline-list") || target.closest("#outline-list-wrapper"))) {
              isOutlineInternalChange = true;
              break;
            }
          }
          if (isOutlineInternalChange) {
            return;
          }
          if (updateTimeout) clearTimeout(updateTimeout);
          updateTimeout = setTimeout(() => {
            this.adapter.findTextarea();
            if (this.currentTab === "outline") {
              if (!this.outlineManager) {
                const content = this.panel?.querySelector("#outline-content");
                if (content) {
                  this.renderOutline(content);
                }
              } else {
                const outline = this.extractOutline();
                if (outline && outline.length > 0) {
                  this.outlineManager.update(outline);
                }
              }
            }
            if (this.updateLayout) {
              this.updateLayout();
            }
            this.queueThemeHostRefresh();
          }, 300);
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        let lastUrl = location.href;
        let lastPathname = location.pathname;
        const urlObserver = new MutationObserver(() => {
          const currentUrl = location.href;
          const currentPathname = location.pathname;
          if (currentUrl !== lastUrl) {
            const wasInConversation = lastPathname.includes("/c/");
            const isInConversation = currentPathname.includes("/c/");
            const enteredNewConversation = !wasInConversation && isInConversation || wasInConversation && isInConversation && currentPathname !== lastPathname;
            lastUrl = currentUrl;
            lastPathname = currentPathname;
            setTimeout(() => {
              this.adapter.findTextarea();
              if (this.updateLayout) {
                this.updateLayout();
              }
              this.queueThemeHostRefresh();
              if (this.currentTab === "outline") {
                if (this.outlineManager) {
                  this.outlineManager.stopSyncScroll();
                  this.outlineManager = null;
                }
                const content = this.panel?.querySelector("#outline-content");
                if (content) {
                  this.renderOutline(content);
                }
              }
              if (enteredNewConversation && this.conversationManager) {
                setTimeout(() => {
                  this.conversationManager.syncConversations();
                }, 1500);
              }
            }, 1e3);
          }
        });
        urlObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
        window.addEventListener("popstate", () => {
          setTimeout(() => {
            this.adapter.findTextarea();
            if (this.updateLayout) {
              this.updateLayout();
            }
            this.queueThemeHostRefresh();
            if (this.currentTab === "outline") {
              if (this.outlineManager) {
                this.outlineManager.stopSyncScroll();
                this.outlineManager = null;
              }
              const content = this.panel?.querySelector("#outline-content");
              if (content) {
                this.renderOutline(content);
              }
            }
            if (location.pathname.includes("/c/") && this.conversationManager) {
              setTimeout(() => {
                this.conversationManager.syncConversations();
              }, 1500);
            }
          }, 1e3);
        });
      }
    });
  })();
  if (!window.__MY_EXT__) {
    window.__MY_EXT__ = {};
  }
  (function() {
    if (window.chatgptHelperInitialized) {
      return;
    }
    window.chatgptHelperInitialized = true;
    const helperNamespace = window.__MY_EXT__.helper || {};
    const { ChatGPTHelper } = helperNamespace;
    if (!ChatGPTHelper) {
      console.error("[ChatGPT Helper] ChatGPTHelper modules are not loaded; initialization skipped");
      return;
    }
    function initHelper() {
      try {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initHelper);
          return;
        }
        if (!document.body) {
          let bodyRetries = 50;
          const waitForBody = () => {
            if (document.body) {
              initHelper();
            } else if (bodyRetries > 0) {
              bodyRetries--;
              setTimeout(waitForBody, 100);
            } else {
              console.error("[ChatGPT Helper] 等待 body 超时，无法初始化");
            }
          };
          waitForBody();
          return;
        }
        const waitForCache = (retries = 40) => {
          try {
            if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
              console.log("[ChatGPT Helper] 缓存已初始化，开始初始化 Helper");
              setTimeout(() => {
                try {
                  const helper = new ChatGPTHelper();
                  setTimeout(() => {
                    try {
                      if (helper && helper.conversationManager) {
                        helper.conversationManager.reloadData();
                        const data = helper.conversationManager.data;
                        console.log("[ChatGPT Helper] 会话数据加载完成:", {
                          folders: data.folders?.length || 0,
                          conversations: Object.keys(data.conversations || {}).length,
                          hasData: Object.keys(data.conversations || {}).length > 0
                        });
                        if (Object.keys(data.conversations || {}).length === 0) {
                          console.log("[ChatGPT Helper] 提示：当前没有保存的会话。使用 Helper 的功能后，会话数据会自动保存。");
                        }
                      }
                    } catch (e) {
                      console.error("[ChatGPT Helper] 会话数据加载错误:", e);
                    }
                  }, 1e3);
                } catch (e) {
                  console.error("[ChatGPT Helper] 初始化失败:", e);
                  console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
                  setTimeout(() => {
                    try {
                      new ChatGPTHelper();
                    } catch (e2) {
                      console.error("[ChatGPT Helper] 重试初始化失败:", e2);
                      console.error("[ChatGPT Helper] 重试错误堆栈:", e2.stack);
                    }
                  }, 2e3);
                }
              }, 300);
            } else if (retries > 0) {
              setTimeout(() => waitForCache(retries - 1), 50);
            } else {
              console.warn("[ChatGPT Helper] 缓存初始化超时，使用默认值初始化");
              setTimeout(() => {
                try {
                  new ChatGPTHelper();
                } catch (e) {
                  console.error("[ChatGPT Helper] 初始化失败:", e);
                  console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
                }
              }, 300);
            }
          } catch (e) {
            console.error("[ChatGPT Helper] waitForCache 错误:", e);
            console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
            setTimeout(() => {
              try {
                new ChatGPTHelper();
              } catch (e2) {
                console.error("[ChatGPT Helper] 降级初始化失败:", e2);
              }
            }, 500);
          }
        };
        waitForCache();
      } catch (e) {
        console.error("[ChatGPT Helper] initHelper 顶层错误:", e);
        console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
        setTimeout(() => {
          try {
            if (document.body) {
              new ChatGPTHelper();
            }
          } catch (e2) {
            console.error("[ChatGPT Helper] 最终降级初始化失败:", e2);
          }
        }, 1e3);
      }
    }
    try {
      initHelper();
    } catch (e) {
      console.error("[ChatGPT Helper] 初始化入口错误:", e);
      console.error("[ChatGPT Helper] 错误堆栈:", e.stack);
    }
  })();
})();
