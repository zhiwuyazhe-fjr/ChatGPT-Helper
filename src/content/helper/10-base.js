// Chrome Extension Content Script - ChatGPT Helper Base
(function () {
    'use strict';

    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    // ==================== 设置项 ====================
    const SETTING_KEYS = {
        PROMPTS: 'chatgpt_prompts',
        SETTINGS: 'chatgpt_settings',
        DEFAULT_PANEL_STATE: 'chatgpt_default_panel_state',
        PANEL_WIDTH: 'chatgpt_panel_width',
        LANGUAGE: 'chatgpt_language',
    };

    // ==================== 国际化 ====================
    const I18N = {
        'zh-CN': {
            panelTitle: 'ChatGPT Helper',
            tabPrompts: '提示词',
            tabOutline: '大纲',
            tabConversations: '会话',
            tabExport: '导出',
            tabSettings: '设置',
            searchPlaceholder: '搜索提示词...',
            addPrompt: '添加新提示词',
            allCategory: '全部',
            refresh: '刷新',
            expand: '展开',
            collapse: '收起',
            edit: '编辑',
            delete: '删除',
            save: '保存',
            cancel: '取消',
            add: '添加',
            title: '标题',
            category: '分类',
            content: '提示词内容',
            promptUpdated: '提示词已更新',
            promptAdded: '提示词已添加',
            deleted: '已删除',
            copied: '已复制到剪贴板',
            refreshed: '已刷新',
            inserted: '已插入提示词',
            confirmDelete: '确定删除?',
            fillTitleContent: '请填写标题和内容',
            noConversations: '暂无会话',
            syncConversations: '同步会话',
            newFolder: '新建文件夹',
            deleteFolder: '删除文件夹',
            deleteFolderConfirm: '确定要删除文件夹 "{name}" 吗？\n文件夹内的会话将移动到收件箱。',
            folderDeleted: '文件夹已删除',
            batchMode: '批量操作',
            batchComplete: '完成',
            selected: '已选择',
            items: '项',
            move: '移动',
            export: '导出',
            pinned: '置顶',
            unpinned: '取消置顶',
            moved: '已移动',
            exported: '已导出',
            synced: '已同步',
            conversationSyncing: '正在同步会话...',
            conversationSyncNoResults: '未加载到历史会话，请确认已登录 ChatGPT 后重试',
            conversationSyncFailed: '会话同步失败，请稍后重试',
            newSessions: '个新会话',
            updatedSessions: '个会话',
            exportFormat: '选择导出格式：\n1. Markdown\n2. JSON\n3. TXT',
            exportSuccess: '导出成功',
            exportFailed: '导出失败',
            noContent: '未找到对话内容',
            openFirst: '请先打开会话',
            settingsTitle: '设置',
            panelSettings: '面板设置',
            featureSettings: '功能设置',
            readingHistory: '阅读历史',
            anchorSettings: '锚点设置',
            copySettings: '复制功能',
            tabFunctionSettings: 'tab栏功能',
            tabOrderSettings: 'tab栏功能',
            tabPageSettings: '标签页设置',
            languageSettings: '语言设置',
            language: '界面语言',
            autoDetect: '自动检测',
            chinese: '简体中文',
            english: 'English',
            themeSettingsSection: '主题设置',
            openThemeSettings: '打开主题设置',
            themeDialogTitle: '主题',
            themeAppearance: '外观',
            themeAppearanceSystem: '跟随系统',
            themeAppearanceLight: '浅色',
            themeAppearanceDark: '深色',
            themeColorPresets: '颜色',
            themePresetOriginal: '原始主题',
            themeWallpaper: '壁纸',
            themeEnableWallpaper: '启用壁纸',
            themeDropImage: '将图片拖放到这里',
            themeFileTypes: '支持 PNG、JPG、WebP，最大 5MB',
            themeSelectFile: '选择文件',
            themeRemoveImage: '移除背景图',
            themeBlur: '模糊',
            themeMessageGlass: '消息毛玻璃效果',
            themeMessageGlassIntensity: '消息毛玻璃强度',
            themePanelGlassIntensity: '侧栏/右栏毛玻璃强度',
            themeSidebarEnhance: '侧栏文字增强',
            themeSidebarEnhanceIntensity: '增强强度',
            themeLivePreview: '实时预览',
            themeUploadSuccess: '背景图片已更新',
            themeBackgroundRemoved: '背景图片已移除',
            themeNoBackground: '暂无背景图片',
            themeInvalidType: '仅支持 PNG/JPG/WebP 格式',
            themeFileTooLarge: '图片大小不能超过 5MB',
            themeImageLoadFailed: '图片加载失败，请重试',
            themeSwitchedLight: '已切换到浅色模式',
            themeSwitchedDark: '已切换到深色模式',
            themeSwitchFailed: '主题切换失败',
            aboutButton: '关于',
            aboutTopEntryTitle: '关于',
            aboutDialogTitle: '关于 ChatGPT Helper',
            aboutTagline: '为重度 ChatGPT 使用者打造的高效增强工作台',
            aboutMotivationTitle: '😘 开发动机',
            aboutMotivationContent: '这不仅仅是一个插件，更是一位 TJU 计算机学生对极致体验的追求。作为 ChatGPT 的重度使用者，我亲手打造了这个工具包，只为消除那些恼人的小摩擦。愿它能陪你翻过琐碎的深山，去看见真正重要的奇思妙想。',
            aboutFeedbackTitle: '💬 反馈',
            aboutFeatureRequest: '功能建议',
            aboutBugSupport: '问题反馈 / 支持',
            aboutOpenSourceTitle: '🌱 开源项目',
            aboutSupportTitle: '💕 支持项目',
            aboutSupportContent: 'ChatGPT Helper的成长，离不开你的每一次高效交互。如果它曾为你节省过一分钟，或带来过一次惊喜，请考虑支持它的未来。每一份认可，都是我继续敲下下一行代码的动力💕',
            aboutShare: '分享给朋友',
            aboutAuthorTitle: '👨‍💻 关于作者',
            aboutAuthorBio: '📍 TJU | CS 在读\n🚀 AI 探索者 | 预备役创业者\n✨ Elon Musk 信徒',
            aboutFooterNote: '多平台兼容 · 本地解析零上传 · 重度 ChatGPT 玩家的效率工具包',
            aboutRepoButton: 'GitHub 仓库',
            aboutRepoLabel: '项目仓库',
            aboutAuthorGithub: '作者 GitHub',
            aboutClose: '关闭',
            aboutCopyRepoSuccess: '分享链接已复制',
            aboutCopyRepoFailed: '复制失败，请手动复制仓库链接',
            aboutVersionTitle: '版本信息',
            aboutVersionLabel: '版本',
            aboutAuthorLabel: '作者',
            aboutLicenseLabel: '许可证',
            aboutPoweredBy: '为专注的 ChatGPT 工作流打造❤️',
            aboutIntroTitle: '项目简介',
            aboutIntro: 'ChatGPT Helper 通过右侧功能面板为 ChatGPT 提供提示词管理、对话大纲、会话整理、导出与阅读定位等增强能力，尽量保持原页面结构不被打断。',
            aboutFeaturesTitle: '核心能力',
            aboutFeaturePrompts: '提示词管理与快速插入',
            aboutFeatureOutline: '自动生成对话大纲与导航',
            aboutFeatureConversations: '历史会话整理与批量管理',
            aboutFeatureExport: '多格式导出与阅读定位增强',
            aboutSupportSites: '支持 chatgpt.com、chat.openai.com 与 new.oaifree.com',
            aboutPrivacyTitle: '隐私与权限',
            aboutPrivacy: '所有设置与数据处理均在本地浏览器完成；扩展使用 storage 保存配置，notifications 仅用于完成提醒，不会上传对话内容。',
            pageSettings: '页面设置',
            outlineSettings: '大纲设置',
            searchConversations: '搜索会话...',
            selectConversationsFirst: '请先选择要操作的会话',
            panelWidthLabel: '面板宽度',
            defaultPanelOpenLabel: '默认展开面板',
            enablePromptsLabel: '启用提示词',
            enableOutlineLabel: '启用大纲',
            showUserMessagesLabel: '显示用户消息',
            enableConversationsLabel: '启用会话管理',
            preventAutoScrollLabel: '防止自动滚动',
            limitPageWidthLabel: '限制页面宽度',
            pageWidthValueLabel: '页面宽度值',
            pageWidthUnitLabel: '宽度单位',
            collapsedButtonsDesc: '调整折叠面板按钮的显示顺序',
            collapsedButtonsTitle: '折叠按钮',
            enableReadingHistoryLabel: '启用阅读历史',
            autoRestoreLabel: '自动跳转',
            historyDaysLabel: '历史保留时间（天）',
            autoUpdateOutlineLabel: '对话期间自动更新大纲',
            outlineIntervalLabel: '更新检测间隔（秒）',
            outlineSyncScrollLabel: '同步滚动',
            outlineMaxLevelLabel: '最大标题层级',
            tabAutoRenameLabel: '自动重命名标签页',
            tabRenameIntervalLabel: '重命名检测间隔（秒）',
            tabShowStatusLabel: '显示生成状态',
            tabDesktopNotifyLabel: '发送桌面通知',
            tabPlaySoundLabel: '播放通知声音',
            tabVolumeLabel: '通知音量（0.1-1.0）',
            tabNotifyWhenFocusedLabel: '前台时也通知',
            tabAutoFocusLabel: '自动聚焦窗口',
            tabPrivacyModeLabel: '隐私模式',
            tabPrivacyTitleLabel: '隐私模式标题',
            enableFormulaCopyLabel: '启用公式复制',
            formulaDelimiterLabel: '公式使用 LaTeX 分隔符（$ / $$）',
            enableTableCopyLabel: '启用表格复制',
            // 大纲相关文案
            outlineEmpty: '暂无大纲',
            outlineSearchResult: '条结果',
            outlineExpandAll: '展开全部',
            outlineCollapseAll: '折叠全部',
            outlineShowUserQueriesTooltip: '显示用户提问',
            outlineHideUserQueriesTooltip: '隐藏用户提问',
            outlineLocateCurrent: '定位当前位置',
            outlineSearch: '搜索大纲...',
            outlineOnlyUserQueries: '只显示用户提问',
            outlineScrollBottom: '滚动到底部',
            outlineScrollTop: '滚动到顶部',
            clear: '清除',
            // Button labels for collapsed buttons
            buttonScrollTop: '顶部',
            buttonAnchor: '锚点',
            buttonTheme: '主题',
            buttonManualAnchor: '手动锚点',
            buttonScrollBottom: '底部',
            // Button actions
            moveUp: '上移',
            moveDown: '下移',
            buttonOrderUpdated: '已更新按钮顺序',
            enabled: '已启用',
            disabled: '已禁用',
        },
        'en': {
            panelTitle: 'ChatGPT Helper',
            tabPrompts: 'Prompts',
            tabOutline: 'Outline',
            tabConversations: 'Conversations',
            tabExport: 'Export',
            tabSettings: 'Settings',
            searchPlaceholder: 'Search prompts...',
            addPrompt: 'Add New Prompt',
            allCategory: 'All',
            refresh: 'Refresh',
            expand: 'Expand',
            collapse: 'Collapse',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
            add: 'Add',
            title: 'Title',
            category: 'Category',
            content: 'Prompt Content',
            promptUpdated: 'Prompt updated',
            promptAdded: 'Prompt added',
            deleted: 'Deleted',
            copied: 'Copied to clipboard',
            refreshed: 'Refreshed',
            inserted: 'Prompt inserted',
            confirmDelete: 'Delete this prompt?',
            fillTitleContent: 'Please fill in title and content',
            noConversations: 'No conversations',
            syncConversations: 'Sync Conversations',
            newFolder: 'New Folder',
            deleteFolder: 'Delete folder',
            deleteFolderConfirm: 'Delete folder "{name}"?\nConversations in this folder will be moved to Inbox.',
            folderDeleted: 'Folder deleted',
            batchMode: 'Batch Mode',
            batchComplete: 'Complete',
            selected: 'Selected',
            items: 'items',
            move: 'Move',
            export: 'Export',
            pinned: 'Pinned',
            unpinned: 'Unpinned',
            moved: 'Moved',
            exported: 'Exported',
            synced: 'Synced',
            conversationSyncing: 'Syncing conversations...',
            conversationSyncNoResults: 'No history conversations loaded. Make sure you are signed in to ChatGPT, then try again.',
            conversationSyncFailed: 'Conversation sync failed. Please try again later.',
            newSessions: 'new sessions',
            updatedSessions: 'sessions',
            exportFormat: 'Select export format:\n1. Markdown\n2. JSON\n3. TXT',
            exportSuccess: 'Export successful',
            exportFailed: 'Export failed',
            noContent: 'No conversation content found',
            openFirst: 'Please open the conversation first',
            settingsTitle: 'Settings',
            panelSettings: 'Panel Settings',
            featureSettings: 'Feature Settings',
            readingHistory: 'Reading History',
            anchorSettings: 'Anchor Settings',
            copySettings: 'Copy Features',
            tabFunctionSettings: 'Tab Settings',
            tabOrderSettings: 'Tab Functions',
            tabPageSettings: 'Tab Settings',
            languageSettings: 'Language Settings',
            language: 'Interface Language',
            autoDetect: 'Auto Detect',
            chinese: '简体中文',
            english: 'English',
            themeSettingsSection: 'Theme Settings',
            openThemeSettings: 'Open Theme Settings',
            themeDialogTitle: 'Theme',
            themeAppearance: 'Appearance',
            themeAppearanceSystem: 'System',
            themeAppearanceLight: 'Light',
            themeAppearanceDark: 'Dark',
            themeColorPresets: 'Colors',
            themePresetOriginal: 'Original',
            themeWallpaper: 'Wallpaper',
            themeEnableWallpaper: 'Enable Wallpaper',
            themeDropImage: 'Drop image here',
            themeFileTypes: 'PNG/JPG/WebP up to 5MB',
            themeSelectFile: 'Select File',
            themeRemoveImage: 'Remove Background',
            themeBlur: 'Blur',
            themeMessageGlass: 'Message Glass Effect',
            themeMessageGlassIntensity: 'Message Glass Intensity',
            themePanelGlassIntensity: 'Side Panel Glass Intensity',
            themeSidebarEnhance: 'Sidebar Text Enhance',
            themeSidebarEnhanceIntensity: 'Enhance Intensity',
            themeLivePreview: 'Live Preview',
            themeUploadSuccess: 'Background image updated',
            themeBackgroundRemoved: 'Background image removed',
            themeNoBackground: 'No background image',
            themeInvalidType: 'Only PNG/JPG/WebP is supported',
            themeFileTooLarge: 'Image size must be 5MB or less',
            themeImageLoadFailed: 'Image loading failed, please try again',
            themeSwitchedLight: 'Switched to light mode',
            themeSwitchedDark: 'Switched to dark mode',
            themeSwitchFailed: 'Theme switch failed',
            aboutButton: 'About',
            aboutTopEntryTitle: 'About',
            aboutDialogTitle: 'About ChatGPT Helper',
            aboutTagline: 'A focused productivity layer designed for heavy ChatGPT users',
            aboutMotivationTitle: '😘 Motivation',
            aboutMotivationContent: '😘This is more than just an extension. It is one TJU computer science student\'s pursuit of a smoother, more delightful ChatGPT experience. As a heavy ChatGPT user, I built this toolkit by hand to remove the tiny frictions that keep interrupting real thinking. I hope it helps you get past the busy clutter and spend more time on ideas that truly matter.',
            aboutFeedbackTitle: '💬 Feedback',
            aboutFeatureRequest: 'Feature Request',
            aboutBugSupport: 'Bug Report / Support',
            aboutOpenSourceTitle: '🌱 Open Source',
            aboutSupportTitle: '💕 Support the Project',
            aboutSupportContent: 'The growth of ChatGPT Helper comes from every efficient interaction you have with it. If it has ever saved you a minute or brought you a small surprise, please consider supporting its future. Every bit of recognition is fuel for the next line of code. 💕',
            aboutShare: 'Share with Friends',
            aboutAuthorTitle: '👨‍💻 About the Author',
            aboutAuthorBio: '📍 TJU | CS 在读\n🚀 AI 探索者 | 预备役创业者\n✨ Elon Musk 信徒',
            aboutFooterNote: 'Works on chatgpt.com, chat.openai.com, and new.oaifree.com · Local-first, no conversation uploads',
            aboutRepoButton: 'GitHub Repository',
            aboutRepoLabel: 'Repository',
            aboutAuthorGithub: 'Author GitHub',
            aboutClose: 'Close',
            aboutCopyRepoSuccess: 'Share link copied',
            aboutCopyRepoFailed: 'Copy failed, please copy the repository link manually',
            aboutVersionTitle: 'Version Info',
            aboutVersionLabel: 'Version',
            aboutAuthorLabel: 'Author',
            aboutLicenseLabel: 'License',
            aboutPoweredBy: 'Built for focused ChatGPT workflows',
            aboutIntroTitle: 'Overview',
            aboutIntro: 'ChatGPT Helper adds a focused side panel for prompt management, outlines, conversation organization, exports, and reading-position utilities while keeping the native ChatGPT flow familiar.',
            aboutFeaturesTitle: 'Core Features',
            aboutFeaturePrompts: 'Prompt management and quick insertion',
            aboutFeatureOutline: 'Automatic outline generation and navigation',
            aboutFeatureConversations: 'Conversation organization and batch actions',
            aboutFeatureExport: 'Multi-format export and reading-position tools',
            aboutSupportSites: 'Works on chatgpt.com, chat.openai.com, and new.oaifree.com',
            aboutPrivacyTitle: 'Privacy & Permissions',
            aboutPrivacy: 'All settings and data processing stay in your browser. The extension uses storage for local preferences and notifications only for completion alerts.',
            pageSettings: 'Page Settings',
            outlineSettings: 'Outline Settings',
            searchConversations: 'Search conversations...',
            selectConversationsFirst: 'Please select conversations first',
            panelWidthLabel: 'Panel Width',
            defaultPanelOpenLabel: 'Open Panel by Default',
            enablePromptsLabel: 'Prompts',
            enableOutlineLabel: 'Outline',
            showUserMessagesLabel: 'Show User Messages',
            enableConversationsLabel: 'Conversation Manager',
            preventAutoScrollLabel: 'Prevent Auto Scroll',
            limitPageWidthLabel: 'Limit Page Width',
            pageWidthValueLabel: 'Page Width Value',
            pageWidthUnitLabel: 'Width Unit',
            collapsedButtonsDesc: 'Adjust the order of collapsed panel buttons',
            collapsedButtonsTitle: 'Collapsed Buttons',
            enableReadingHistoryLabel: 'Reading History',
            autoRestoreLabel: 'Auto Restore Position',
            historyDaysLabel: 'History Retention Days',
            autoUpdateOutlineLabel: 'Auto Update Outline During Conversation',
            outlineIntervalLabel: 'Update Interval (seconds)',
            outlineSyncScrollLabel: 'Sync Scroll',
            outlineMaxLevelLabel: 'Max Heading Level',
            tabAutoRenameLabel: 'Auto Rename Tab',
            tabRenameIntervalLabel: 'Rename Check Interval (seconds)',
            tabShowStatusLabel: 'Show Generation Status',
            tabDesktopNotifyLabel: 'Desktop Notification',
            tabPlaySoundLabel: 'Play Notification Sound',
            tabVolumeLabel: 'Notification Volume (0.1–1.0)',
            tabNotifyWhenFocusedLabel: 'Notify Even When Tab is Focused',
            tabAutoFocusLabel: 'Auto Focus Window',
            tabPrivacyModeLabel: 'Privacy Mode',
            tabPrivacyTitleLabel: 'Privacy Mode Title',
            enableFormulaCopyLabel: 'Formula Copy',
            formulaDelimiterLabel: 'Use LaTeX Delimiters ($ / $$)',
            enableTableCopyLabel: 'Table Copy',
            languageChanged: 'Language changed',
            // Outline related
            outlineEmpty: 'No outline',
            outlineSearchResult: 'results',
            outlineExpandAll: 'Expand All',
            outlineCollapseAll: 'Collapse All',
            outlineShowUserQueriesTooltip: 'Show user queries',
            outlineHideUserQueriesTooltip: 'Hide user queries',
            outlineLocateCurrent: 'Locate Current Position',
            outlineSearch: 'Search outline...',
            outlineOnlyUserQueries: 'Only show user queries',
            outlineScrollBottom: 'Scroll to bottom',
            outlineScrollTop: 'Scroll to top',
            clear: 'Clear',
            // Button labels for collapsed buttons
            buttonScrollTop: 'Top',
            buttonAnchor: 'Anchor',
            buttonTheme: 'Theme',
            buttonManualAnchor: 'Manual Anchor',
            buttonScrollBottom: 'Bottom',
            // Button actions
            moveUp: 'Move Up',
            moveDown: 'Move Down',
            buttonOrderUpdated: 'Button order updated',
            enabled: 'Enabled',
            disabled: 'Disabled',
        }
    };

    // 语言检测函数
    function detectLanguage() {
        const savedLang = window.GM_getValue(SETTING_KEYS.LANGUAGE, 'auto');
        if (savedLang !== 'auto' && I18N[savedLang]) {
            return savedLang;
        }
        const lang = navigator.language || navigator.userLanguage || 'en';
        if (lang.startsWith('zh')) {
            return 'zh-CN';
        }
        return 'en';
    }

    // 全局翻译函数
    let currentLang = detectLanguage();
    function t(key) {
        return I18N[currentLang]?.[key] || I18N['en']?.[key] || key;
    }

    // Tab 定义
    const TAB_DEFINITIONS = {
        prompts: { id: 'prompts', label: '提示词', iconName: 'edit' },
        outline: { id: 'outline', label: '大纲', iconName: 'list' },
        conversations: { id: 'conversations', label: '会话', iconName: 'message' },
        export: { id: 'export', label: '导出', iconName: 'export' },
        settings: { id: 'settings', label: '设置', iconName: 'settings' },
    };

    // 折叠面板按钮定义
    const COLLAPSED_BUTTON_DEFS = {
        scrollTop: { iconName: 'arrowUp', labelKey: 'buttonScrollTop', canToggle: false, isPanelOnly: false },
        panel: { icon: '', iconType: 'helper-logo', labelKey: null, label: 'ChatGPT Helper', canToggle: false, isPanelOnly: true },
        anchor: { iconName: 'anchor', labelKey: 'buttonAnchor', canToggle: true, isPanelOnly: true },
        theme: { iconName: 'sun', labelKey: 'buttonTheme', canToggle: true, isPanelOnly: true },
        manualAnchor: { iconName: 'pin', labelKey: 'buttonManualAnchor', canToggle: true, isPanelOnly: false, isGroup: true },
        scrollBottom: { iconName: 'arrowDown', labelKey: 'buttonScrollBottom', canToggle: false, isPanelOnly: false },
    };
    const DEFAULT_COLLAPSED_BUTTONS_ORDER = [
        { id: 'scrollTop', enabled: true },
        { id: 'panel', enabled: true },
        { id: 'anchor', enabled: true },
        { id: 'theme', enabled: true },
        { id: 'manualAnchor', enabled: true },
        { id: 'scrollBottom', enabled: true },
    ];

    const THEME_PRESETS = [
        { key: 'original', labelKey: 'themePresetOriginal', primary: '#64748b', secondary: '#94a3b8', accent: '#475569', light: '#f8fafc', isOriginal: true },
        { key: 'blue', primary: '#4285f4', secondary: '#60a5fa', accent: '#2563eb', light: '#eaf2ff' },
        { key: 'gray', primary: '#52525b', secondary: '#71717a', accent: '#3f3f46', light: '#f3f4f6' },
        { key: 'red', primary: '#dc2626', secondary: '#f87171', accent: '#b91c1c', light: '#ffecec' },
        { key: 'pink', primary: '#db2777', secondary: '#f472b6', accent: '#be185d', light: '#ffe6f3' },
        { key: 'purple', primary: '#9333ea', secondary: '#c084fc', accent: '#7e22ce', light: '#f2e9ff' },
        { key: 'cyan', primary: '#0891b2', secondary: '#22d3ee', accent: '#0e7490', light: '#e2fbff' },
        { key: 'teal', primary: '#0d9488', secondary: '#2dd4bf', accent: '#0f766e', light: '#e2fdf8' },
        { key: 'green', primary: '#16a34a', secondary: '#4ade80', accent: '#15803d', light: '#e8ffe8' },
        { key: 'yellow', primary: '#ca8a04', secondary: '#facc15', accent: '#a16207', light: '#fff8d8' },
        { key: 'orange', primary: '#ea580c', secondary: '#fb923c', accent: '#c2410c', light: '#fff0e4' },
    ];

    const THEME_PRESET_MAP = THEME_PRESETS.reduce((acc, preset) => {
        acc[preset.key] = preset;
        return acc;
    }, {});
    const THEME_PRESET_INLINE_VAR_KEYS = [
        '--gh-theme-primary',
        '--gh-theme-secondary',
        '--gh-theme-accent',
        '--gh-theme-accent-dark',
        '--gh-theme-light',
        '--gh-primary',
        '--gh-primary-hover',
        '--gh-tag-active-bg',
        '--gh-gradient',
        '--gh-header-bg',
        '--gh-theme-surface-light-base',
        '--gh-theme-surface-light-accent',
        '--gh-theme-surface-dark-base',
        '--gh-theme-surface-dark-accent',
        '--gh-page-sidebar-bg-light',
        '--gh-page-chat-bg-light',
        '--gh-page-composer-bg-light',
        '--gh-page-sidebar-bg-dark',
        '--gh-page-chat-bg-dark',
        '--gh-page-composer-bg-dark',
        '--gh-page-accent-soft',
        '--gh-page-accent-soft-dark',
        '--gh-page-accent-strong',
        '--gh-page-link',
        '--gh-page-selection'
    ];

    const THEME_BACKGROUND_DB_NAME = 'chatgpt_helper_theme';
    const THEME_BACKGROUND_DB_VERSION = 1;
    const THEME_BACKGROUND_STORE = 'assets';
    const THEME_BACKGROUND_MAX_SIZE = 5 * 1024 * 1024;
    const THEME_BACKGROUND_ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
    const FEATURE_REQUEST_URL = '';
    const ISSUE_URL = 'https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper/issues/new';
    const REPO_URL = 'https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper';
    const AUTHOR_GITHUB_URL = 'https://github.com/zhiwuyazhe-fjr';
    const THEME_HOST_ATTRS = [
        'data-gh-theme-host-sidebar-shell',
        'data-gh-theme-host-sidebar',
        'data-gh-theme-host-main',
        'data-gh-theme-host-chat-list',
        'data-gh-theme-host-composer',
        'data-gh-theme-host-composer-surface'
    ];

    const DEFAULT_THEME_CONFIG = {
        appearanceMode: 'system', // 'system' | 'light' | 'dark'
        presetKey: 'original',
        backgroundImageEnabled: false,
        backgroundBlurPx: 5,
        messageGlassEnabled: false,
        messageGlassIntensity: 60,
        panelGlassIntensity: 45,
        sidebarTextEnhanceEnabled: true,
        sidebarTextEnhanceIntensity: 20,
        backgroundAssetId: null,
        updatedAt: ''
    };

    // 默认设置
    const DEFAULT_SETTINGS = {
        panelWidth: 320,
        defaultPanelState: true, // true = 展开, false = 折叠
        prompts: { enabled: true },
        outline: { enabled: true, showUserQueries: true },
        conversations: { enabled: true },
        tabOrder: ['prompts', 'outline', 'conversations', 'export'],
        collapsedButtonsOrder: DEFAULT_COLLAPSED_BUTTONS_ORDER,
        themeMode: null, // 'light' | 'dark' | null
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
            unit: 'px'
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
            titleFormat: '{status}{title}',
            showNotification: false,
            notificationSound: false,
            notificationVolume: 0.5,
            notifyWhenFocused: false,
            autoFocus: false,
            privacyMode: false,
            privacyTitle: 'ChatGPT'
        }
    };

    // 默认提示词
    const DEFAULT_PROMPTS = [
        {
            id: 'default_1',
            title: '代码审查',
            content: '请帮我审查以下代码，指出潜在的问题和改进建议：',
            category: '开发',
        },
        {
            id: 'default_2',
            title: '翻译',
            content: '请将以下内容翻译成中文：',
            category: '工具',
        },
    ];

    // ==================== 工具函数 ====================
    function createElement(tag, attrs = {}, text = '') {
        const el = document.createElement(tag);
        if (typeof attrs === 'string') {
            text = attrs;
            attrs = {};
        }
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') {
                el.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(el.style, value);
            } else if (key.startsWith('data-') || key.startsWith('aria-') || key === 'role') {
                el.setAttribute(key, value);
            } else {
                el[key] = value;
            }
        });
        if (text) el.textContent = text;
        return el;
    }

    function getExtensionRuntime() {
        if (typeof browser !== 'undefined' && browser.runtime) return browser.runtime;
        if (typeof chrome !== 'undefined' && chrome.runtime) return chrome.runtime;
        return null;
    }

    function getExtensionAssetUrl(path) {
        const runtime = getExtensionRuntime();
        try {
            return runtime && typeof runtime.getURL === 'function' ? runtime.getURL(path) : path;
        } catch (e) {
            return path;
        }
    }

    function getExtensionManifestMeta() {
        const runtime = getExtensionRuntime();
        try {
            return runtime && typeof runtime.getManifest === 'function' ? runtime.getManifest() : null;
        } catch (e) {
            return null;
        }
    }

    function openExternalLink(url) {
        if (!url) return false;
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
            return true;
        } catch (e) {
            try {
                window.open(url, '_blank');
                return true;
            } catch (e2) {
                return false;
            }
        }
    }

    async function copyTextToClipboard(text) {
        if (!text) return false;
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (e) {
            // Fall back to execCommand below.
        }

        try {
            const textarea = createElement('textarea', { value: text });
            textarea.setAttribute('readonly', 'readonly');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.pointerEvents = 'none';
            textarea.style.left = '-9999px';
            textarea.style.top = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            const success = document.execCommand('copy');
            textarea.remove();
            return !!success;
        } catch (e) {
            return false;
        }
    }

    function createHelperLogoNode(options = {}) {
        const {
            size = 18,
            className = '',
            alt = 'ChatGPT Helper',
            title = '',
        } = options;
        const img = createElement('img', {
            className,
            alt,
            title,
            src: getExtensionAssetUrl('icons/logo.svg'),
            draggable: false,
        });
        img.width = size;
        img.height = size;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.display = 'block';
        img.style.objectFit = 'contain';
        img.style.flexShrink = '0';
        return img;
    }

    const SVG_ICON_DEFS = {
        edit: [
            ['path', { d: 'M12 20h9' }],
            ['path', { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' }]
        ],
        list: [
            ['path', { d: 'M8 6h13' }],
            ['path', { d: 'M8 12h13' }],
            ['path', { d: 'M8 18h13' }],
            ['path', { d: 'M3 6h.01' }],
            ['path', { d: 'M3 12h.01' }],
            ['path', { d: 'M3 18h.01' }]
        ],
        message: [
            ['path', { d: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z' }]
        ],
        export: [
            ['path', { d: 'M12 3v12' }],
            ['path', { d: 'm7 8 5-5 5 5' }],
            ['path', { d: 'M5 21h14' }],
            ['path', { d: 'M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4' }]
        ],
        image: [
            ['rect', { x: '3', y: '5', width: '18', height: '14', rx: '2' }],
            ['circle', { cx: '8.5', cy: '10.5', r: '1.5' }],
            ['path', { d: 'm21 15-5-5L5 21' }]
        ],
        settings: [
            ['path', { d: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z' }],
            ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.36.32.7.6 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.52 1Z' }]
        ],
        arrowUp: [
            ['path', { d: 'm18 15-6-6-6 6' }],
            ['path', { d: 'M12 9v12' }],
            ['path', { d: 'M5 3h14' }]
        ],
        arrowDown: [
            ['path', { d: 'm6 9 6 6 6-6' }],
            ['path', { d: 'M12 15V3' }],
            ['path', { d: 'M5 21h14' }]
        ],
        anchor: [
            ['circle', { cx: '12', cy: '5', r: '3' }],
            ['path', { d: 'M12 8v13' }],
            ['path', { d: 'M5 12H2a10 10 0 0 0 20 0h-3' }],
            ['path', { d: 'm19 12-2 2' }],
            ['path', { d: 'm5 12 2 2' }]
        ],
        sun: [
            ['circle', { cx: '12', cy: '12', r: '4' }],
            ['path', { d: 'M12 2v2' }],
            ['path', { d: 'M12 20v2' }],
            ['path', { d: 'm4.93 4.93 1.41 1.41' }],
            ['path', { d: 'm17.66 17.66 1.41 1.41' }],
            ['path', { d: 'M2 12h2' }],
            ['path', { d: 'M20 12h2' }],
            ['path', { d: 'm6.34 17.66-1.41 1.41' }],
            ['path', { d: 'm19.07 4.93-1.41 1.41' }]
        ],
        moon: [
            ['path', { d: 'M20.98 15.57A9 9 0 1 1 8.43 3.02 7 7 0 0 0 20.98 15.57Z' }]
        ],
        plus: [
            ['path', { d: 'M12 5v14' }],
            ['path', { d: 'M5 12h14' }]
        ],
        refresh: [
            ['path', { d: 'M21 12a9 9 0 0 1-15.2 6.5' }],
            ['path', { d: 'M3 12A9 9 0 0 1 18.2 5.5' }],
            ['path', { d: 'M18 2v4h-4' }],
            ['path', { d: 'M6 22v-4h4' }]
        ],
        collapse: [
            ['path', { d: 'm15 18-6-6 6-6' }]
        ],
        expand: [
            ['path', { d: 'm9 18 6-6-6-6' }]
        ],
        pin: [
            ['path', { d: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z' }],
            ['circle', { cx: '12', cy: '10', r: '3' }]
        ],
        back: [
            ['path', { d: 'M9 14 4 9l5-5' }],
            ['path', { d: 'M4 9h10a6 6 0 0 1 0 12h-2' }]
        ],
        close: [
            ['path', { d: 'M18 6 6 18' }],
            ['path', { d: 'm6 6 12 12' }]
        ],
        check: [
            ['path', { d: 'm20 6-11 11-5-5' }]
        ],
        tag: [
            ['path', { d: 'M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .59 1.41l7.4 7.4a2 2 0 0 0 2.82 0l8.6-8.6a2 2 0 0 0 0-2.82l-7.4-7.4A2 2 0 0 0 12.6 2Z' }],
            ['path', { d: 'M7 7h.01' }]
        ],
        folder: [
            ['path', { d: 'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z' }]
        ],
        trash: [
            ['path', { d: 'M3 6h18' }],
            ['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' }],
            ['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }],
            ['path', { d: 'M10 11v6' }],
            ['path', { d: 'M14 11v6' }]
        ]
    };

    function createSvgIconNode(iconName, options = {}) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const size = options.size || 16;
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', options.strokeWidth || '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        svg.classList.add('chatgpt-helper-svg-icon');
        if (options.className) {
            options.className.split(/\s+/).filter(Boolean).forEach((name) => svg.classList.add(name));
        }
        svg.style.width = `${size}px`;
        svg.style.height = `${size}px`;
        svg.style.flexShrink = '0';
        const defs = SVG_ICON_DEFS[iconName] || SVG_ICON_DEFS.list;
        defs.forEach(([tag, attrs]) => {
            const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
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
        if (def && def.iconType === 'helper-logo') {
            return createHelperLogoNode({
                size: options.size || 18,
                className: options.className || 'chatgpt-helper-icon-logo',
                title: options.title || def.label || 'ChatGPT Helper',
            });
        }
        return createSvgIconNode(def && def.iconName ? def.iconName : 'list', options);
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

    function normalizeHexColor(value, fallback = '#4285f4') {
        if (typeof value !== 'string') return fallback;
        const trimmed = value.trim();
        if (/^#[\da-fA-F]{6}$/.test(trimmed)) return trimmed;
        if (/^#[\da-fA-F]{3}$/.test(trimmed)) {
            return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
        }
        return fallback;
    }

    function hexToRgb(value, fallback = '#4285f4') {
        const hex = normalizeHexColor(value, fallback).slice(1);
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16)
        };
    }

    function blendRgbColors(baseColor, tintColor, tintWeight = 0.5) {
        const base = typeof baseColor === 'string' ? hexToRgb(baseColor) : baseColor;
        const tint = typeof tintColor === 'string' ? hexToRgb(tintColor) : tintColor;
        const weight = clampNumber(tintWeight, 0, 1);
        return {
            r: Math.round(base.r + ((tint.r - base.r) * weight)),
            g: Math.round(base.g + ((tint.g - base.g) * weight)),
            b: Math.round(base.b + ((tint.b - base.b) * weight))
        };
    }

    function rgbaFromColor(color, alpha = 1) {
        const rgb = typeof color === 'string' ? hexToRgb(color) : color;
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampNumber(alpha, 0, 1).toFixed(3)})`;
    }

    function buildLinearGradient(angle, stops) {
        return `linear-gradient(${angle}, ${stops.join(', ')})`;
    }

    function createThemeAssetId() {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        return `theme-bg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    function getThemePresetByKey(key) {
        return THEME_PRESET_MAP[key] || THEME_PRESET_MAP[DEFAULT_THEME_CONFIG.presetKey];
    }

    function withProductivitySurfaceVars(vars, presetInput, options = {}) {
        const preset = presetInput && typeof presetInput === 'object'
            ? presetInput
            : getThemePresetByKey(DEFAULT_THEME_CONFIG.presetKey);
        const isDark = Boolean(options.isDark);
        const hasWallpaper = Boolean(options.canRenderBackground);
        const primary = preset.primary || '#64748b';
        const secondary = preset.secondary || '#94a3b8';
        const accent = preset.accent || primary;
        const light = preset.light || '#f8fafc';
        const darkPanelTop = `color-mix(in srgb, #070b12, ${primary} ${hasWallpaper ? 22 : 18}%)`;
        const darkPanelBottom = `color-mix(in srgb, #05070b, ${secondary} ${hasWallpaper ? 15 : 11}%)`;
        const lightPanelTop = `color-mix(in srgb, #ffffff, ${light} ${hasWallpaper ? 68 : 78}%)`;
        const lightPanelBottom = `color-mix(in srgb, #f4f5f2, ${primary} ${hasWallpaper ? 12 : 8}%)`;
        const surfaceTop = isDark ? darkPanelTop : lightPanelTop;
        const surfaceBottom = isDark ? darkPanelBottom : lightPanelBottom;
        const neutralText = isDark ? 'rgba(248, 250, 252, 0.96)' : 'rgba(18, 23, 20, 0.94)';
        const mutedText = isDark ? 'rgba(204, 213, 205, 0.76)' : 'rgba(85, 97, 89, 0.78)';
        const panelLine = isDark
            ? `color-mix(in srgb, ${primary}, rgba(255,255,255,0.16) ${hasWallpaper ? 52 : 40}%)`
            : `color-mix(in srgb, ${primary}, rgba(12,18,16,0.14) ${hasWallpaper ? 44 : 58}%)`;
        const cardShadow = isDark
            ? '0 1px 0 rgba(255, 255, 255, 0.025), 0 10px 24px rgba(0, 0, 0, 0.18)'
            : '0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 22px rgba(18, 23, 20, 0.07)';
        const elevatedShadow = isDark
            ? `0 14px 34px color-mix(in srgb, #000000, ${primary} 16%)`
            : `0 12px 30px color-mix(in srgb, rgba(18,23,20,0.12), ${primary} 18%)`;

        return {
            ...vars,
            '--gh-theme-primary': primary,
            '--gh-theme-secondary': secondary,
            '--gh-theme-accent': accent,
            '--gh-theme-accent-dark': accent,
            '--gh-theme-light': light,
            '--gh-primary': primary,
            '--gh-primary-hover': accent,
            '--gh-tag-active-bg': primary,
            '--gh-gradient': `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            '--gh-header-bg': `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            '--gh-text': vars['--gh-text'] || neutralText,
            '--gh-text-secondary': vars['--gh-text-secondary'] || mutedText,
            '--gh-panel-surface': `linear-gradient(180deg, ${surfaceTop} 0%, ${surfaceBottom} 100%)`,
            '--gh-panel-subtle': isDark
                ? `color-mix(in srgb, ${surfaceBottom}, ${primary} 10%)`
                : `color-mix(in srgb, ${surfaceTop}, ${primary} 4%)`,
            '--gh-panel-card': vars['--gh-panel-card-bg'] || (isDark
                ? `color-mix(in srgb, ${surfaceTop}, #ffffff 6%)`
                : `color-mix(in srgb, ${surfaceTop}, #ffffff 52%)`),
            '--gh-panel-card-hover': isDark
                ? `color-mix(in srgb, ${surfaceTop}, ${primary} 18%)`
                : `color-mix(in srgb, ${surfaceTop}, ${primary} 9%)`,
            '--gh-panel-line': panelLine,
            '--gh-panel-muted-line': `color-mix(in srgb, ${panelLine}, transparent 42%)`,
            '--gh-panel-elevated-shadow': elevatedShadow,
            '--gh-panel-card-shadow': cardShadow,
            '--gh-header-quiet-bg': isDark
                ? `linear-gradient(180deg, color-mix(in srgb, ${surfaceTop}, ${primary} 22%) 0%, ${surfaceTop} 100%)`
                : `linear-gradient(180deg, color-mix(in srgb, ${surfaceTop}, ${primary} 8%) 0%, ${surfaceTop} 100%)`,
            '--gh-focus-ring': `color-mix(in srgb, ${primary}, transparent ${isDark ? 56 : 68}%)`,
            '--gh-control-bg': isDark
                ? `color-mix(in srgb, ${surfaceTop}, #ffffff 6%)`
                : `color-mix(in srgb, ${surfaceTop}, #ffffff 48%)`,
            '--gh-control-bg-hover': isDark
                ? `color-mix(in srgb, ${surfaceTop}, ${primary} 18%)`
                : `color-mix(in srgb, ${surfaceTop}, ${primary} 8%)`,
            '--gh-control-border': `color-mix(in srgb, ${panelLine}, transparent 8%)`,
            '--gh-control-radius': '8px',
            '--gh-card-radius': '8px',
            '--gh-danger': '#ef4444',
            '--gh-success': '#10b981',
            '--gh-warning': '#f59e0b',
            '--gh-folder-bg-default': `color-mix(in srgb, ${primary}, transparent ${isDark ? 78 : 86}%)`,
            '--gh-folder-bg-expanded': `color-mix(in srgb, ${primary}, transparent ${isDark ? 68 : 78}%)`,
            '--gh-border-active': primary,
            '--gh-checkbox-bg': accent
        };
    }

    function buildThemeSurfaceVars(presetInput, options = {}) {
        const preset = presetInput && typeof presetInput === 'object'
            ? presetInput
            : getThemePresetByKey(DEFAULT_THEME_CONFIG.presetKey);
        const isDark = Boolean(options.isDark);
        const isOriginal = Boolean(preset && preset.isOriginal);
        const hasWallpaper = Boolean(options.canRenderBackground);
        const panelUnit = clampNumber(options.panelIntensity, 0, 100) / 100;
        const messageUnit = clampNumber(options.messageIntensity, 0, 100) / 100;
        const composerUnit = Math.min(1, Math.max(panelUnit * 0.55, messageUnit * 0.85));
        const panelBlur = hasWallpaper
            ? `${8 + Math.round(panelUnit * 10)}px`
            : `${2 + Math.round(panelUnit * 4)}px`;
        const messageBlur = hasWallpaper
            ? `${10 + Math.round(messageUnit * 12)}px`
            : `${4 + Math.round(messageUnit * 6)}px`;
        const composerBlur = hasWallpaper
            ? `${9 + Math.round(composerUnit * 11)}px`
            : `${3 + Math.round(composerUnit * 5)}px`;

        if (isOriginal) {
            if (isDark) {
                return withProductivitySurfaceVars({
                    '--gh-bg': hasWallpaper ? 'rgba(15, 23, 42, 0.160)' : '#1e293b',
                    '--gh-bg-secondary': hasWallpaper ? 'rgba(15, 23, 42, 0.110)' : '#0f172a',
                    '--gh-text': '#f1f5f9',
                    '--gh-text-secondary': '#cbd5e1',
                    '--gh-border': hasWallpaper ? 'rgba(226, 232, 240, 0.180)' : '#475569',
                    '--gh-hover': hasWallpaper ? 'rgba(30, 41, 59, 0.160)' : '#334155',
                    '--gh-shadow': hasWallpaper ? '0 14px 32px rgba(2, 6, 23, 0.200)' : '0 10px 40px rgba(0,0,0,0.4)',
                    '--gh-input-bg': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.620) 0%, rgba(15, 23, 42, 0.520) 100%)'
                        : '#334155',
                    '--gh-input-border': hasWallpaper ? 'rgba(148, 163, 184, 0.420)' : '#64748b',
                    '--gh-active-bg': hasWallpaper ? 'rgba(59, 130, 246, 0.220)' : 'rgba(59, 130, 246, 0.300)',
                    '--gh-right-overlay': hasWallpaper
                        ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.560) 0%, rgba(15, 23, 42, 0.420) 100%)'
                        : '#1e293b',
                    '--gh-panel-card-bg': hasWallpaper ? 'rgba(15, 23, 42, 0.420)' : '#0f172a',
                    '--gh-panel-card-border': hasWallpaper ? 'rgba(255, 255, 255, 0.220)' : '#475569',
                    '--gh-sidebar-button-bg': hasWallpaper ? 'rgba(15, 23, 42, 0.320)' : '#334155',
                    '--gh-msg-user-bg': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.240) 0%, rgba(30, 41, 59, 0.140) 100%)'
                        : 'rgba(51, 65, 85, 0.940)',
                    '--gh-msg-assistant-bg': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.180) 0%, rgba(15, 23, 42, 0.100) 100%)'
                        : 'transparent',
                    '--gh-msg-border': hasWallpaper ? 'rgba(255, 255, 255, 0.180)' : 'rgba(100, 116, 139, 0.360)',
                    '--gh-msg-shadow': hasWallpaper ? '0 14px 32px rgba(2, 6, 23, 0.120)' : 'none',
                    '--gh-msg-blur': messageBlur,
                    '--gh-panel-blur': panelBlur,
                    '--gh-composer-blur': composerBlur,
                    '--gh-composer-shadow': hasWallpaper ? '0 10px 24px rgba(2, 6, 23, 0.140)' : 'none',
                    '--gh-page-sidebar-bg-light': 'color-mix(in srgb, #ffffff, transparent 84%)',
                    '--gh-page-chat-bg-light': 'transparent',
                    '--gh-page-composer-bg-light': 'color-mix(in srgb, #ffffff, transparent 78%)',
                    '--gh-page-sidebar-bg-dark': hasWallpaper
                        ? 'linear-gradient(180deg, rgba(2, 6, 23, 0.360) 0%, rgba(2, 6, 23, 0.240) 100%)'
                        : 'transparent',
                    '--gh-page-chat-bg-dark': 'transparent',
                    '--gh-page-composer-bg-dark': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(8, 17, 29, 0.860) 0%, rgba(15, 23, 42, 0.760) 100%)'
                        : 'transparent',
                    '--gh-page-accent-soft': 'rgba(59, 130, 246, 0.120)',
                    '--gh-page-accent-soft-dark': hasWallpaper ? 'rgba(59, 130, 246, 0.220)' : 'rgba(59, 130, 246, 0.260)',
                    '--gh-page-accent-strong': '#2563eb',
                    '--gh-page-link': '#2563eb',
                    '--gh-page-selection': 'rgba(59, 130, 246, 0.180)'
                }, preset, options);
            }

            return withProductivitySurfaceVars({
                '--gh-bg': '#ffffff',
                '--gh-bg-secondary': '#f9fafb',
                '--gh-text': '#1f2937',
                '--gh-text-secondary': '#6b7280',
                '--gh-border': '#e5e7eb',
                '--gh-hover': '#f3f4f6',
                '--gh-shadow': '0 10px 40px rgba(0,0,0,0.15)',
                '--gh-input-bg': hasWallpaper
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.860) 0%, rgba(248, 250, 252, 0.760) 100%)'
                    : '#ffffff',
                '--gh-input-border': hasWallpaper ? 'rgba(226, 232, 240, 0.860)' : '#d1d5db',
                '--gh-active-bg': '#e5e7eb',
                '--gh-right-overlay': hasWallpaper
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.560) 0%, rgba(248, 250, 252, 0.420) 100%)'
                    : '#ffffff',
                '--gh-panel-card-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.540)' : '#f9fafb',
                '--gh-panel-card-border': hasWallpaper ? 'rgba(255, 255, 255, 0.460)' : '#e5e7eb',
                '--gh-sidebar-button-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.420)' : '#f3f4f6',
                '--gh-msg-user-bg': hasWallpaper
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.340) 0%, rgba(248, 250, 252, 0.240) 100%)'
                    : 'rgba(255, 255, 255, 0.920)',
                '--gh-msg-assistant-bg': hasWallpaper
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.280) 0%, rgba(248, 250, 252, 0.180) 100%)'
                    : 'transparent',
                '--gh-msg-border': hasWallpaper ? 'rgba(255, 255, 255, 0.420)' : 'rgba(209, 213, 219, 0.580)',
                '--gh-msg-shadow': hasWallpaper ? '0 14px 32px rgba(15, 23, 42, 0.100)' : 'none',
                '--gh-msg-blur': messageBlur,
                '--gh-panel-blur': panelBlur,
                '--gh-composer-blur': composerBlur,
                '--gh-composer-shadow': hasWallpaper ? '0 10px 24px rgba(15, 23, 42, 0.100)' : 'none',
                '--gh-page-sidebar-bg-light': hasWallpaper
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.360) 0%, rgba(248, 250, 252, 0.220) 100%)'
                    : 'transparent',
                '--gh-page-chat-bg-light': 'transparent',
                '--gh-page-composer-bg-light': hasWallpaper
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.900) 0%, rgba(248, 250, 252, 0.800) 100%)'
                    : 'transparent',
                '--gh-page-sidebar-bg-dark': 'linear-gradient(180deg, rgba(2, 6, 23, 0.260) 0%, rgba(2, 6, 23, 0.160) 100%)',
                '--gh-page-chat-bg-dark': 'transparent',
                '--gh-page-composer-bg-dark': 'linear-gradient(135deg, rgba(8, 17, 29, 0.240) 0%, rgba(8, 17, 29, 0.160) 100%)',
                '--gh-page-accent-soft': 'rgba(59, 130, 246, 0.120)',
                '--gh-page-accent-soft-dark': 'rgba(59, 130, 246, 0.260)',
                '--gh-page-accent-strong': '#2563eb',
                '--gh-page-link': '#2563eb',
                '--gh-page-selection': 'rgba(59, 130, 246, 0.180)'
            }, preset, options);
        }

        if (isDark) {
            const sidebarTop = hasWallpaper
                ? blendRgbColors('#020617', preset.primary, 0.12 + panelUnit * 0.18)
                : blendRgbColors('#070711', preset.primary, 0.40 + panelUnit * 0.18);
            const sidebarBottom = hasWallpaper
                ? blendRgbColors('#020617', preset.secondary, 0.08 + panelUnit * 0.16)
                : blendRgbColors('#06070f', preset.secondary, 0.28 + panelUnit * 0.14);
            const panelTop = hasWallpaper
                ? blendRgbColors('#07111f', preset.primary, 0.14 + panelUnit * 0.18)
                : blendRgbColors('#111324', preset.primary, 0.32 + panelUnit * 0.16);
            const panelBottom = hasWallpaper
                ? blendRgbColors('#07111f', preset.secondary, 0.10 + panelUnit * 0.16)
                : blendRgbColors('#0d1323', preset.secondary, 0.24 + panelUnit * 0.14);
            const cardTop = hasWallpaper
                ? blendRgbColors('#091220', preset.primary, 0.16 + panelUnit * 0.14)
                : blendRgbColors('#171932', preset.primary, 0.28 + panelUnit * 0.16);
            const cardBottom = hasWallpaper
                ? blendRgbColors('#08111c', preset.secondary, 0.10 + panelUnit * 0.12)
                : blendRgbColors('#111729', preset.secondary, 0.20 + panelUnit * 0.12);
            const messageTop = hasWallpaper
                ? blendRgbColors('#0b1324', preset.light, 0.14 + messageUnit * 0.16)
                : blendRgbColors('#17192c', preset.light, 0.08 + messageUnit * 0.08);
            const messageAccent = hasWallpaper
                ? blendRgbColors('#09111f', preset.primary, 0.18 + messageUnit * 0.18)
                : blendRgbColors('#17192c', preset.primary, 0.38 + messageUnit * 0.16);
            const userAccent = hasWallpaper
                ? blendRgbColors('#08111d', preset.secondary, 0.14 + messageUnit * 0.16)
                : blendRgbColors('#121a2f', preset.secondary, 0.30 + messageUnit * 0.14);
            const panelBorder = hasWallpaper
                ? blendRgbColors('#dbeafe', preset.primary, 0.16)
                : blendRgbColors('#64748b', preset.primary, 0.20);
            const messageBorder = hasWallpaper
                ? blendRgbColors('#f8fafc', preset.primary, 0.18)
                : blendRgbColors('#94a3b8', preset.primary, 0.16);
            const activeTint = blendRgbColors('#0b1324', preset.primary, hasWallpaper ? 0.74 : 0.78);
            const shadowTint = hasWallpaper
                ? blendRgbColors('#020617', preset.primary, 0.28)
                : blendRgbColors('#030712', preset.primary, 0.18);
            const composerTop = hasWallpaper
                ? blendRgbColors('#09111f', preset.light, 0.12 + composerUnit * 0.14)
                : blendRgbColors('#14172a', preset.light, 0.08 + composerUnit * 0.08);
            const composerBottom = hasWallpaper
                ? blendRgbColors('#08111d', preset.primary, 0.16 + composerUnit * 0.16)
                : blendRgbColors('#101628', preset.primary, 0.34 + composerUnit * 0.16);
            const chatTop = hasWallpaper
                ? blendRgbColors('#060b18', preset.primary, 0.08 + panelUnit * 0.10)
                : blendRgbColors('#090814', preset.primary, 0.30 + panelUnit * 0.14);
            const chatBottom = hasWallpaper
                ? blendRgbColors('#050913', preset.secondary, 0.06 + panelUnit * 0.08)
                : blendRgbColors('#06070f', preset.secondary, 0.18 + panelUnit * 0.10);

            return withProductivitySurfaceVars({
                '--gh-bg': rgbaFromColor(cardTop, hasWallpaper ? (0.28 + panelUnit * 0.14) : 0.98),
                '--gh-bg-secondary': rgbaFromColor(cardBottom, hasWallpaper ? (0.22 + panelUnit * 0.12) : 0.96),
                '--gh-text': 'rgba(248, 250, 252, 0.96)',
                '--gh-text-secondary': 'rgba(203, 213, 225, 0.78)',
                '--gh-border': rgbaFromColor(panelBorder, hasWallpaper ? (0.10 + panelUnit * 0.08) : (0.22 + panelUnit * 0.08)),
                '--gh-hover': rgbaFromColor(panelBottom, hasWallpaper ? (0.09 + panelUnit * 0.07) : (0.42 + panelUnit * 0.10)),
                '--gh-shadow': `-14px 0 34px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.14 + panelUnit * 0.08) : (0.18 + panelUnit * 0.06))}`,
                '--gh-input-bg': buildLinearGradient('135deg', [
                    `${rgbaFromColor(composerTop, hasWallpaper ? (0.46 + composerUnit * 0.16) : 0.94)} 0%`,
                    `${rgbaFromColor(composerBottom, hasWallpaper ? (0.36 + composerUnit * 0.14) : 0.96)} 100%`
                ]),
                '--gh-input-border': rgbaFromColor(messageBorder, hasWallpaper ? (0.22 + composerUnit * 0.12) : (0.24 + composerUnit * 0.10)),
                '--gh-active-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.18 + panelUnit * 0.06) : 0.88),
                '--gh-right-overlay': buildLinearGradient('180deg', [
                    `${rgbaFromColor(panelTop, hasWallpaper ? (0.48 + panelUnit * 0.12) : 0.99)} 0%`,
                    `${rgbaFromColor(panelBottom, hasWallpaper ? (0.36 + panelUnit * 0.10) : 0.97)} 100%`
                ]),
                '--gh-panel-card-bg': buildLinearGradient('135deg', [
                    `${rgbaFromColor(cardTop, hasWallpaper ? (0.42 + panelUnit * 0.14) : 0.98)} 0%`,
                    `${rgbaFromColor(cardBottom, hasWallpaper ? (0.32 + panelUnit * 0.12) : 0.96)} 100%`
                ]),
                '--gh-panel-card-border': rgbaFromColor(panelBorder, hasWallpaper ? (0.18 + panelUnit * 0.10) : (0.20 + panelUnit * 0.10)),
                '--gh-sidebar-button-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.30 + panelUnit * 0.12) : 0.82),
                '--gh-msg-user-bg': buildLinearGradient('135deg', [
                    `${rgbaFromColor(messageTop, hasWallpaper ? (0.18 + messageUnit * 0.12) : 0.98)} 0%`,
                    `${rgbaFromColor(userAccent, hasWallpaper ? (0.09 + messageUnit * 0.08) : 0.94)} 100%`
                ]),
                '--gh-msg-assistant-bg': hasWallpaper
                    ? buildLinearGradient('135deg', [
                        `${rgbaFromColor(messageTop, 0.16 + messageUnit * 0.12)} 0%`,
                        `${rgbaFromColor(messageAccent, 0.08 + messageUnit * 0.08)} 100%`
                    ])
                    : 'transparent',
                '--gh-msg-border': rgbaFromColor(messageBorder, hasWallpaper ? (0.08 + messageUnit * 0.08) : (0.18 + messageUnit * 0.08)),
                '--gh-msg-shadow': `0 16px 34px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.12 + messageUnit * 0.08) : (0.16 + messageUnit * 0.08))}`,
                '--gh-msg-blur': messageBlur,
                '--gh-panel-blur': panelBlur,
                '--gh-composer-blur': composerBlur,
                '--gh-composer-shadow': `0 12px 28px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.10 + composerUnit * 0.07) : (0.16 + composerUnit * 0.08))}`,
                '--gh-page-sidebar-bg-light': buildLinearGradient('180deg', [
                    `${rgbaFromColor(blendRgbColors('#ffffff', preset.light, 0.70), 0.18)} 0%`,
                    `${rgbaFromColor(blendRgbColors('#ffffff', preset.primary, 0.16), 0.08)} 100%`
                ]),
                '--gh-page-chat-bg-light': 'transparent',
                '--gh-page-composer-bg-light': buildLinearGradient('135deg', [
                    `${rgbaFromColor(blendRgbColors('#ffffff', preset.light, 0.62), 0.22)} 0%`,
                    `${rgbaFromColor(blendRgbColors('#ffffff', preset.primary, 0.18), 0.12)} 100%`
                ]),
                '--gh-page-sidebar-bg-dark': buildLinearGradient('180deg', [
                    `${rgbaFromColor(sidebarTop, hasWallpaper ? (0.32 + panelUnit * 0.14) : 0.99)} 0%`,
                    `${rgbaFromColor(sidebarBottom, hasWallpaper ? (0.22 + panelUnit * 0.12) : 0.97)} 100%`
                ]),
                '--gh-page-chat-bg-dark': 'transparent',
                '--gh-page-composer-bg-dark': buildLinearGradient('135deg', [
                    `${rgbaFromColor(composerTop, hasWallpaper ? (0.76 + composerUnit * 0.12) : 0.98)} 0%`,
                    `${rgbaFromColor(composerBottom, hasWallpaper ? (0.66 + composerUnit * 0.12) : 0.95)} 100%`
                ]),
                '--gh-page-accent-soft': rgbaFromColor(blendRgbColors('#ffffff', preset.primary, 0.34), 0.22 + panelUnit * 0.08),
                '--gh-page-accent-soft-dark': rgbaFromColor(activeTint, hasWallpaper ? (0.20 + panelUnit * 0.08) : 0.90),
                '--gh-page-accent-strong': preset.accent,
                '--gh-page-link': preset.accent,
                '--gh-page-selection': rgbaFromColor(blendRgbColors('#0b1324', preset.primary, 0.72), hasWallpaper ? 0.22 : 0.32)
            }, preset, options);
        }

        const sidebarTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.72)
            : blendRgbColors('#ffffff', preset.light, 0.92);
        const sidebarBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.16 + panelUnit * 0.12)
            : blendRgbColors('#ffffff', preset.primary, 0.24 + panelUnit * 0.16);
        const panelTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.78)
            : blendRgbColors('#ffffff', preset.light, 0.90);
        const panelBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.secondary, 0.18 + panelUnit * 0.14)
            : blendRgbColors('#ffffff', preset.secondary, 0.26 + panelUnit * 0.16);
        const cardTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.60)
            : blendRgbColors('#ffffff', preset.light, 0.88);
        const cardBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.secondary, 0.20 + panelUnit * 0.10)
            : blendRgbColors('#ffffff', preset.primary, 0.20 + panelUnit * 0.14);
        const userTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.70)
            : blendRgbColors('#ffffff', preset.light, 0.90);
        const userBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.secondary, 0.16 + messageUnit * 0.14)
            : blendRgbColors('#ffffff', preset.secondary, 0.20 + messageUnit * 0.14);
        const assistantTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.76)
            : blendRgbColors('#ffffff', preset.light, 0.94);
        const assistantBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.18 + messageUnit * 0.16)
            : blendRgbColors('#ffffff', preset.primary, 0.18 + messageUnit * 0.14);
        const panelBorder = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.12)
            : blendRgbColors('#cbd5e1', preset.primary, 0.18);
        const messageBorder = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.16)
            : blendRgbColors('#cbd5e1', preset.primary, 0.18);
        const activeTint = blendRgbColors('#eff6ff', preset.primary, hasWallpaper ? 0.34 : 0.46);
        const shadowTint = hasWallpaper
            ? blendRgbColors('#0f172a', preset.primary, 0.16)
            : blendRgbColors('#94a3b8', preset.primary, 0.10);
        const composerTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.64)
            : blendRgbColors('#ffffff', preset.light, 0.90);
        const composerBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.18 + composerUnit * 0.12)
            : blendRgbColors('#ffffff', preset.primary, 0.18 + composerUnit * 0.12);
        const chatTop = hasWallpaper
            ? blendRgbColors('#ffffff', preset.light, 0.34)
            : blendRgbColors('#ffffff', preset.light, 0.60);
        const chatBottom = hasWallpaper
            ? blendRgbColors('#ffffff', preset.primary, 0.08 + panelUnit * 0.06)
            : blendRgbColors('#ffffff', preset.primary, 0.12 + panelUnit * 0.08);

        return withProductivitySurfaceVars({
            '--gh-bg': rgbaFromColor(cardTop, hasWallpaper ? (0.40 + panelUnit * 0.16) : 0.97),
            '--gh-bg-secondary': rgbaFromColor(cardBottom, hasWallpaper ? (0.30 + panelUnit * 0.14) : 0.93),
            '--gh-text': 'rgba(15, 23, 42, 0.92)',
            '--gh-text-secondary': 'rgba(51, 65, 85, 0.78)',
            '--gh-border': rgbaFromColor(panelBorder, hasWallpaper ? (0.20 + panelUnit * 0.10) : (0.34 + panelUnit * 0.08)),
            '--gh-hover': rgbaFromColor(panelBottom, hasWallpaper ? (0.10 + panelUnit * 0.08) : (0.60 + panelUnit * 0.10)),
            '--gh-shadow': `-14px 0 34px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.10 + panelUnit * 0.06) : (0.14 + panelUnit * 0.05))}`,
            '--gh-input-bg': buildLinearGradient('135deg', [
                `${rgbaFromColor(composerTop, hasWallpaper ? (0.72 + composerUnit * 0.16) : 0.96)} 0%`,
                `${rgbaFromColor(composerBottom, hasWallpaper ? (0.62 + composerUnit * 0.14) : 0.90)} 100%`
            ]),
            '--gh-input-border': rgbaFromColor(messageBorder, hasWallpaper ? (0.38 + composerUnit * 0.12) : (0.38 + composerUnit * 0.08)),
            '--gh-active-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.18 + panelUnit * 0.08) : (0.34 + panelUnit * 0.10)),
            '--gh-right-overlay': buildLinearGradient('180deg', [
                `${rgbaFromColor(panelTop, hasWallpaper ? (0.56 + panelUnit * 0.16) : 0.98)} 0%`,
                `${rgbaFromColor(panelBottom, hasWallpaper ? (0.42 + panelUnit * 0.14) : 0.94)} 100%`
            ]),
            '--gh-panel-card-bg': buildLinearGradient('135deg', [
                `${rgbaFromColor(cardTop, hasWallpaper ? (0.48 + panelUnit * 0.16) : 0.96)} 0%`,
                `${rgbaFromColor(cardBottom, hasWallpaper ? (0.36 + panelUnit * 0.14) : 0.92)} 100%`
            ]),
            '--gh-panel-card-border': rgbaFromColor(panelBorder, hasWallpaper ? (0.32 + panelUnit * 0.12) : (0.36 + panelUnit * 0.08)),
            '--gh-sidebar-button-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.32 + panelUnit * 0.12) : (0.32 + panelUnit * 0.10)),
            '--gh-msg-user-bg': buildLinearGradient('135deg', [
                `${rgbaFromColor(userTop, hasWallpaper ? (0.26 + messageUnit * 0.18) : 0.96)} 0%`,
                `${rgbaFromColor(userBottom, hasWallpaper ? (0.10 + messageUnit * 0.10) : 0.88)} 100%`
            ]),
            '--gh-msg-assistant-bg': hasWallpaper
                ? buildLinearGradient('135deg', [
                    `${rgbaFromColor(assistantTop, 0.24 + messageUnit * 0.16)} 0%`,
                    `${rgbaFromColor(assistantBottom, 0.12 + messageUnit * 0.12)} 100%`
                ])
                : 'transparent',
            '--gh-msg-border': rgbaFromColor(messageBorder, hasWallpaper ? (0.24 + messageUnit * 0.12) : (0.38 + messageUnit * 0.10)),
            '--gh-msg-shadow': `0 14px 32px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.08 + messageUnit * 0.08) : (0.10 + messageUnit * 0.06))}`,
            '--gh-msg-blur': messageBlur,
            '--gh-panel-blur': panelBlur,
            '--gh-composer-blur': composerBlur,
            '--gh-composer-shadow': `0 10px 24px ${rgbaFromColor(shadowTint, hasWallpaper ? (0.08 + composerUnit * 0.08) : (0.10 + composerUnit * 0.06))}`,
            '--gh-page-sidebar-bg-light': buildLinearGradient('180deg', [
                `${rgbaFromColor(sidebarTop, hasWallpaper ? (0.30 + panelUnit * 0.14) : 0.98)} 0%`,
                `${rgbaFromColor(sidebarBottom, hasWallpaper ? (0.18 + panelUnit * 0.12) : 0.94)} 100%`
            ]),
            '--gh-page-chat-bg-light': 'transparent',
            '--gh-page-composer-bg-light': buildLinearGradient('135deg', [
                `${rgbaFromColor(composerTop, hasWallpaper ? (0.80 + composerUnit * 0.14) : 0.97)} 0%`,
                `${rgbaFromColor(composerBottom, hasWallpaper ? (0.68 + composerUnit * 0.12) : 0.90)} 100%`
            ]),
            '--gh-page-sidebar-bg-dark': buildLinearGradient('180deg', [
                `${rgbaFromColor(blendRgbColors('#020617', preset.primary, 0.22), 0.36)} 0%`,
                `${rgbaFromColor(blendRgbColors('#020617', preset.secondary, 0.16), 0.24)} 100%`
            ]),
            '--gh-page-chat-bg-dark': 'transparent',
            '--gh-page-composer-bg-dark': buildLinearGradient('135deg', [
                `${rgbaFromColor(blendRgbColors('#08111d', preset.light, 0.12), 0.86)} 0%`,
                `${rgbaFromColor(blendRgbColors('#08111d', preset.primary, 0.18), 0.76)} 100%`
            ]),
            '--gh-page-accent-soft': rgbaFromColor(activeTint, hasWallpaper ? (0.20 + panelUnit * 0.08) : 0.88),
            '--gh-page-accent-soft-dark': rgbaFromColor(blendRgbColors('#0b1324', preset.primary, 0.72), 0.24 + panelUnit * 0.10),
            '--gh-page-accent-strong': preset.accent,
            '--gh-page-link': preset.accent,
            '--gh-page-selection': rgbaFromColor(blendRgbColors('#ffffff', preset.primary, 0.38), hasWallpaper ? 0.28 : 0.34)
        }, preset, options);
    }

    function normalizeThemeConfig(rawConfig, legacyThemeMode) {
        const input = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
        const appearanceModeRaw = input.appearanceMode || legacyThemeMode || 'system';
        const appearanceMode = ['system', 'light', 'dark'].includes(appearanceModeRaw)
            ? appearanceModeRaw
            : 'system';
        const presetKey = THEME_PRESET_MAP[input.presetKey]
            ? input.presetKey
            : DEFAULT_THEME_CONFIG.presetKey;
        const backgroundAssetId = typeof input.backgroundAssetId === 'string' && input.backgroundAssetId.trim()
            ? input.backgroundAssetId.trim()
            : null;
        const backgroundImageEnabled = Boolean(input.backgroundImageEnabled) && Boolean(backgroundAssetId);
        const updatedAt = typeof input.updatedAt === 'string' && input.updatedAt
            ? input.updatedAt
            : new Date().toISOString();

        return {
            appearanceMode,
            presetKey,
            backgroundImageEnabled,
            backgroundBlurPx: Math.round(clampNumber(input.backgroundBlurPx, 0, 20)),
            messageGlassEnabled: Boolean(input.messageGlassEnabled),
            messageGlassIntensity: input.messageGlassIntensity == null
                ? DEFAULT_THEME_CONFIG.messageGlassIntensity
                : Math.round(clampNumber(input.messageGlassIntensity, 0, 100)),
            panelGlassIntensity: input.panelGlassIntensity == null
                ? DEFAULT_THEME_CONFIG.panelGlassIntensity
                : Math.round(clampNumber(input.panelGlassIntensity, 0, 100)),
            sidebarTextEnhanceEnabled:
                typeof input.sidebarTextEnhanceEnabled === 'boolean'
                    ? input.sidebarTextEnhanceEnabled
                    : true,
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


    Object.defineProperty(H, 'currentLang', {
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
