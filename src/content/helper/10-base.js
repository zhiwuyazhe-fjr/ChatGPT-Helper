// Chrome Extension Content Script - ChatGPT Helper Base
(function () {
    'use strict';

    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    // ==================== 设置项 ====================
    const SETTING_KEYS = {
        PROMPTS: 'chatgpt_prompts',
        SETTINGS: 'chatgpt_settings',
        PROMPT_LIBRARY_VERSION: 'chatgpt_prompts_version',
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
            editPrompt: '编辑提示词',
            noPrompts: '暂无提示词',
            promptEmptyHint: '添加常用工作流，让高频任务一键进入输入框。',
            promptSearchEmptyHint: '换个关键词，或新建一个更贴近当前任务的提示词。',
            optional: '可选',
            defaultPromptResearchTitle: '资料精读与洞察提炼',
            defaultPromptResearchContent: '请作为严谨的研究助理，精读以下材料，并按这个结构输出：\n1. 核心结论（3-5条）\n2. 关键证据与来源位置\n3. 隐含假设或争议点\n4. 可执行建议\n5. 还需要补充确认的问题\n\n材料：',
            defaultPromptResearchCategory: '研究',
            defaultPromptPlanningTitle: '任务拆解与执行计划',
            defaultPromptPlanningContent: '请把下面目标拆解成可执行计划。先确认目标、约束和成功标准，再输出：\n1. 里程碑\n2. 具体任务清单\n3. 优先级与依赖关系\n4. 主要风险与应对方案\n5. 今天就能开始的下一步\n\n目标：',
            defaultPromptPlanningCategory: '效率',
            defaultPromptWritingTitle: '写作润色与结构优化',
            defaultPromptWritingContent: '请作为资深编辑，优化下面文字。要求：\n1. 保留原意和事实\n2. 提升结构、逻辑和可读性\n3. 标出关键修改理由\n4. 给出一个更简洁版本和一个更有说服力版本\n\n原文：',
            defaultPromptWritingCategory: '写作',
            defaultPromptDebugTitle: 'Bug 定位与修复方案',
            defaultPromptDebugContent: '请作为高级工程师协助定位问题。请先根据现象列出最可能的原因，再给出验证步骤、最小修复方案、潜在副作用和建议补充的测试。\n\n现象 / 报错 / 相关代码：',
            defaultPromptDebugCategory: '开发',
            defaultPromptDecisionTitle: '方案对比与决策建议',
            defaultPromptDecisionContent: '请帮我对比下面几个方案，并用决策表输出：目标匹配度、成本、风险、可维护性、长期影响。最后给出推荐方案、推荐理由和什么情况下应该改选其他方案。\n\n背景与方案：',
            defaultPromptDecisionCategory: '决策',
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
            noSearchResults: '未找到匹配结果',
            inbox: '收件箱',
            untitledConversation: '未命名对话',
            promptFolderName: '请输入文件夹名称：',
            moveToFolder: '移动到文件夹',
            confirm: '确定',
            confirmDeleteConversation: '确定要删除 "{title}" 吗？',
            confirmDeleteConversations: '确定要删除 {count} 个会话吗？',
            exportedConversations: '已导出 {count} 个会话',
            openConversationFirst: '请先打开会话: {title}',
            addTag: '添加标签',
            tagPrompt: '输入标签名称（留空删除标签）：',
            tagUpdated: '标签已更新',
            exportInfoHeading: '导出信息',
            conversationTitleLabel: '会话标题',
            exportTimeLabel: '导出时间',
            sourceLabel: '来源',
            linkLabel: '链接',
            userRole: '用户',
            historyLoading: '正在加载历史...',
            scrollContainerMissing: '未找到滚动容器',
            historyLoadComplete: '历史加载完成',
            pleaseWait: '请稍候...',
            stop: '停止',
            formulaCopied: '公式已复制',
            copyFailed: '复制失败',
            copyAsMarkdown: '复制为 Markdown',
            tableCopied: '表格已复制',
            outlineNoContent: '暂无大纲内容，请等待对话生成或刷新页面',
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
            readingHistory: '阅读历史',
            settingsGroupGeneral: '通用',
            settingsGroupReadingNavigation: '阅读与导航',
            settingsGroupContentProcessing: '内容处理',
            settingsGroupTabPrivacy: '标签页与隐私',
            settingsGroupQuickButtons: '快捷按钮',
            language: '界面语言',
            autoDetect: '自动检测',
            chinese: '简体中文',
            english: 'English',
            languageChanged: '语言已更改',
            themeToggle: '切换主题',
            newChatInTab: '新标签页开启对话',
            dragToReorder: '拖动改变顺序',
            noAnchor: '暂无锚点',
            noAnchorAutoHint: '暂无锚点（点击顶部/底部按钮可自动生成）',
            setAnchor: '设置锚点',
            clearAnchor: '清除锚点',
            returnAnchor: '返回锚点',
            returnPreviousPosition: '返回跳转前位置',
            anchorSet: '已设置锚点',
            anchorSetFailed: '设置锚点失败',
            anchorCleared: '已清除锚点',
            returnedAnchor: '已返回锚点',
            returnedPreviousPosition: '已返回跳转前位置',
            returnAnchorFailed: '返回锚点失败',
            scrolledTop: '已滚动到顶部',
            scrolledBottom: '已滚动到底部',
            exportModuleLoadFailed: '导出模块加载失败，请检查 ChatGPT Exporter 脚本是否正常运行。',
            exportModuleMissing: '未检测到 ChatGPT Exporter，请确保扩展已正确加载。',
            operationFailed: '操作失败',
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
            aboutTagline: '贴近 ChatGPT 的轻量效率面板',
            aboutMotivationTitle: '开发动机',
            aboutMotivationContent: '作为长期使用 ChatGPT 的 TJU 计算机学生，我把常用的提示词、导航、整理和导出需求做成一个轻量工具。它来自真实使用中的反复打磨，目标是减少切换和整理成本，让注意力留在对话本身。',
            aboutFeedbackTitle: '反馈',
            aboutFeatureRequest: '功能建议',
            aboutBugSupport: '提交反馈',
            aboutOpenSourceTitle: '项目信息',
            aboutSupportTitle: '分享项目',
            aboutSupportContent: '如果 ChatGPT Helper 对你的工作流有帮助，可以把仓库分享给需要的人，或在 GitHub 上留下建议。',
            aboutShare: '分享给朋友',
            aboutAuthorTitle: '关于作者',
            aboutAuthorBio: 'TJU | CS 在读\nAI 工具探索者\n长期 ChatGPT 使用者',
            aboutFooterNote: '兼容 chatgpt.com 与 chat.openai.com · 本地设置与解析 · 面向高频工作流',
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
            aboutPoweredBy: '为专注的 ChatGPT 工作流打造',
            aboutIntroTitle: '项目简介',
            aboutIntro: 'ChatGPT Helper 通过右侧功能面板为 ChatGPT 提供提示词管理、对话大纲、会话整理、导出与阅读定位等增强能力，尽量保持原页面结构不被打断。',
            aboutFeaturesTitle: '核心能力',
            aboutFeaturePrompts: '提示词管理与快速插入',
            aboutFeatureOutline: '自动生成对话大纲与导航',
            aboutFeatureConversations: '历史会话整理与批量管理',
            aboutFeatureExport: '多格式导出与阅读定位增强',
            aboutSitesLabel: '站点',
            aboutSupportSites: '支持 chatgpt.com、chat.openai.com 与 new.oaifree.com',
            aboutPrivacyTitle: '隐私与权限',
            aboutPrivacy: '所有设置与数据处理均在本地浏览器完成；扩展使用 storage 保存本地配置，不会上传对话内容。',
            searchConversations: '搜索会话...',
            selectConversationsFirst: '请先选择要操作的会话',
            defaultPanelOpenLabel: '默认展开面板',
            enablePromptsLabel: '启用提示词',
            enableOutlineLabel: '启用大纲',
            showUserMessagesLabel: '显示用户消息',
            enableConversationsLabel: '启用会话管理',
            preventAutoScrollLabel: '防止自动滚动',
            preventAutoScrollDesc: '阅读前文时，不让页面跳到最新回复',
            enableReadingHistoryLabel: '启用阅读历史',
            enableReadingHistoryDesc: '记住每个会话上次读到的位置',
            autoRestoreLabel: '自动跳转',
            autoRestoreDesc: '打开会话时回到上次阅读位置',
            outlineSyncScrollLabel: '大纲跟随阅读位置',
            outlineSyncScrollDesc: '滚动正文时，高亮对应的大纲条目',
            showUserMessagesDesc: '在大纲中把你的提问也作为节点',
            tabVisibilityLabel: 'Tab 显示',
            tabAutoRenameLabel: '自动重命名标签页',
            tabShowStatusLabel: '显示生成状态',
            tabPlaySoundLabel: '播放通知声音',
            tabVolumeLabel: '通知音量',
            tabPrivacyModeLabel: '隐私模式',
            tabPrivacyTitleLabel: '隐私模式标题',
            enableFormulaCopyLabel: '启用公式复制',
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
            buttonBack: '返回',
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
            editPrompt: 'Edit Prompt',
            noPrompts: 'No prompts',
            promptEmptyHint: 'Add reusable workflows so frequent tasks are one click away.',
            promptSearchEmptyHint: 'Try another keyword, or create a prompt for this task.',
            optional: 'optional',
            defaultPromptResearchTitle: 'Deep Reading and Insight Extraction',
            defaultPromptResearchContent: 'Act as a rigorous research assistant. Read the material carefully and respond with:\n1. Core takeaways (3-5 bullets)\n2. Key evidence and where it appears\n3. Hidden assumptions or disputed points\n4. Actionable recommendations\n5. Questions that still need confirmation\n\nMaterial:',
            defaultPromptResearchCategory: 'Research',
            defaultPromptPlanningTitle: 'Task Breakdown and Execution Plan',
            defaultPromptPlanningContent: 'Break the goal below into an executable plan. First clarify the objective, constraints, and success criteria, then provide:\n1. Milestones\n2. Concrete tasks\n3. Priorities and dependencies\n4. Key risks and mitigations\n5. The next step I can start today\n\nGoal:',
            defaultPromptPlanningCategory: 'Productivity',
            defaultPromptWritingTitle: 'Writing Polish and Structure',
            defaultPromptWritingContent: 'Act as a senior editor and improve the text below. Requirements:\n1. Preserve the original meaning and facts\n2. Improve structure, logic, and readability\n3. Explain the most important changes\n4. Provide one concise version and one more persuasive version\n\nDraft:',
            defaultPromptWritingCategory: 'Writing',
            defaultPromptDebugTitle: 'Bug Diagnosis and Fix Plan',
            defaultPromptDebugContent: 'Act as a senior engineer and help diagnose this issue. Start with the most likely causes, then provide validation steps, a minimal fix, possible side effects, and tests that should be added.\n\nSymptoms / error / relevant code:',
            defaultPromptDebugCategory: 'Development',
            defaultPromptDecisionTitle: 'Option Comparison and Decision',
            defaultPromptDecisionContent: 'Compare the options below and output a decision table covering goal fit, cost, risk, maintainability, and long-term impact. End with the recommended option, why it wins, and when another option would be better.\n\nContext and options:',
            defaultPromptDecisionCategory: 'Decision',
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
            noSearchResults: 'No matching results',
            inbox: 'Inbox',
            untitledConversation: 'Untitled conversation',
            promptFolderName: 'Enter folder name:',
            moveToFolder: 'Move to Folder',
            confirm: 'Confirm',
            confirmDeleteConversation: 'Delete "{title}"?',
            confirmDeleteConversations: 'Delete {count} conversations?',
            exportedConversations: 'Exported {count} conversations',
            openConversationFirst: 'Open the conversation first: {title}',
            addTag: 'Add Tag',
            tagPrompt: 'Enter a tag name. Leave blank to remove tags:',
            tagUpdated: 'Tag updated',
            exportInfoHeading: 'Export Info',
            conversationTitleLabel: 'Conversation Title',
            exportTimeLabel: 'Export Time',
            sourceLabel: 'Source',
            linkLabel: 'Link',
            userRole: 'User',
            historyLoading: 'Loading history...',
            scrollContainerMissing: 'Scroll container not found',
            historyLoadComplete: 'History loaded',
            pleaseWait: 'Please wait...',
            stop: 'Stop',
            formulaCopied: 'Formula copied',
            copyFailed: 'Copy failed',
            copyAsMarkdown: 'Copy as Markdown',
            tableCopied: 'Table copied',
            outlineNoContent: 'No outline yet. Wait for the conversation to generate or refresh the page.',
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
            readingHistory: 'Reading History',
            settingsGroupGeneral: 'General',
            settingsGroupReadingNavigation: 'Reading & Navigation',
            settingsGroupContentProcessing: 'Content Processing',
            settingsGroupTabPrivacy: 'Tabs & Privacy',
            settingsGroupQuickButtons: 'Quick Buttons',
            language: 'Interface Language',
            autoDetect: 'Auto Detect',
            chinese: '简体中文',
            english: 'English',
            themeToggle: 'Switch Theme',
            newChatInTab: 'Open Chat in New Tab',
            dragToReorder: 'Drag to reorder',
            noAnchor: 'No anchor',
            noAnchorAutoHint: 'No anchor yet. Click Top or Bottom to create one automatically.',
            setAnchor: 'Set Anchor',
            clearAnchor: 'Clear Anchor',
            returnAnchor: 'Return to Anchor',
            returnPreviousPosition: 'Return to Previous Position',
            anchorSet: 'Anchor set',
            anchorSetFailed: 'Failed to set anchor',
            anchorCleared: 'Anchor cleared',
            returnedAnchor: 'Returned to anchor',
            returnedPreviousPosition: 'Returned to previous position',
            returnAnchorFailed: 'Failed to return to anchor',
            scrolledTop: 'Scrolled to top',
            scrolledBottom: 'Scrolled to bottom',
            exportModuleLoadFailed: 'Export module failed to load. Check whether the ChatGPT Exporter script is running.',
            exportModuleMissing: 'ChatGPT Exporter was not detected. Make sure the extension loaded correctly.',
            operationFailed: 'Operation failed',
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
            aboutMotivationTitle: 'Motivation',
            aboutMotivationContent: 'I built ChatGPT Helper as a TJU computer science student and long-time ChatGPT user. It gathers the prompt, navigation, organization, export, and reading-position tools I kept needing in daily work, with the goal of reducing switching costs and keeping attention on the conversation.',
            aboutFeedbackTitle: 'Feedback',
            aboutFeatureRequest: 'Feature Request',
            aboutBugSupport: 'Submit Feedback',
            aboutOpenSourceTitle: 'Project Info',
            aboutSupportTitle: 'Share the Project',
            aboutSupportContent: 'If ChatGPT Helper fits your workflow, share the repository with someone who may need it, or leave feedback on GitHub.',
            aboutShare: 'Share with Friends',
            aboutAuthorTitle: 'About the Author',
            aboutAuthorBio: 'TJU | Computer Science student\nAI tool builder\nLong-time ChatGPT user',
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
            aboutSitesLabel: 'Sites',
            aboutSupportSites: 'Works on chatgpt.com, chat.openai.com, and new.oaifree.com',
            aboutPrivacyTitle: 'Privacy & Permissions',
            aboutPrivacy: 'All settings and data processing stay in your browser. The extension uses storage for local preferences and does not upload conversation content.',
            searchConversations: 'Search conversations...',
            selectConversationsFirst: 'Please select conversations first',
            defaultPanelOpenLabel: 'Open Panel by Default',
            enablePromptsLabel: 'Prompts',
            enableOutlineLabel: 'Outline',
            showUserMessagesLabel: 'Show User Messages',
            enableConversationsLabel: 'Conversation Manager',
            preventAutoScrollLabel: 'Prevent Auto Scroll',
            preventAutoScrollDesc: 'Stop the page from jumping to the newest reply while you read earlier content',
            enableReadingHistoryLabel: 'Reading History',
            enableReadingHistoryDesc: 'Remember the last reading position in each conversation',
            autoRestoreLabel: 'Auto Restore Position',
            autoRestoreDesc: 'Open conversations at the last remembered reading position',
            outlineSyncScrollLabel: 'Outline Follows Reading Position',
            outlineSyncScrollDesc: 'Highlight the matching outline item while you scroll the conversation',
            showUserMessagesDesc: 'Include your questions as outline nodes',
            tabVisibilityLabel: 'Tab Visibility',
            tabAutoRenameLabel: 'Auto Rename Tab',
            tabShowStatusLabel: 'Show Generation Status',
            tabPlaySoundLabel: 'Play Notification Sound',
            tabVolumeLabel: 'Notification Volume',
            tabPrivacyModeLabel: 'Privacy Mode',
            tabPrivacyTitleLabel: 'Privacy Mode Title',
            enableFormulaCopyLabel: 'Formula Copy',
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
            buttonBack: 'Back',
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
    const EXTENSION_NAME = 'ChatGPT Helper';
    const EXTENSION_VERSION = '2.4.0';
    const EXTENSION_AUTHOR = 'zhiwuyazhe_fjr';
    const EXTENSION_LICENSE = 'MIT';
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
        outline: {
            enabled: true,
            showUserQueries: true,
            autoUpdate: true,
            syncScroll: true,
            updateInterval: 2,
            maxLevel: 6
        },
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
        // 阶段1：阅读历史设置
        readingHistory: {
            persistence: true,
            autoRestore: false
        },
        // 阶段3：复制功能设置
        formulaCopy: {
            enabled: true
        },
        tableCopy: {
            enabled: true
        },
        // 阶段4：标签页设置
        tabSettings: {
            enabled: true,
            showStatus: true,
            notificationSound: false,
            notificationVolume: 0.5,
            titleFormat: '{status}{title}',
            privacyMode: false,
            privacyTitle: 'ChatGPT'
        }
    };

    // 默认提示词
    function createDefaultPrompts() {
        return [
            {
                id: 'default_3',
                title: t('defaultPromptResearchTitle'),
                content: t('defaultPromptResearchContent'),
                category: t('defaultPromptResearchCategory'),
            },
            {
                id: 'default_4',
                title: t('defaultPromptPlanningTitle'),
                content: t('defaultPromptPlanningContent'),
                category: t('defaultPromptPlanningCategory'),
            },
            {
                id: 'default_5',
                title: t('defaultPromptWritingTitle'),
                content: t('defaultPromptWritingContent'),
                category: t('defaultPromptWritingCategory'),
            },
            {
                id: 'default_6',
                title: t('defaultPromptDebugTitle'),
                content: t('defaultPromptDebugContent'),
                category: t('defaultPromptDebugCategory'),
            },
            {
                id: 'default_7',
                title: t('defaultPromptDecisionTitle'),
                content: t('defaultPromptDecisionContent'),
                category: t('defaultPromptDecisionCategory'),
            },
        ];
    }

    const DEFAULT_PROMPTS = createDefaultPrompts();

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
        const fallback = {
            name: EXTENSION_NAME,
            version: EXTENSION_VERSION,
            author: EXTENSION_AUTHOR,
            license: EXTENSION_LICENSE
        };
        try {
            const manifest = runtime && typeof runtime.getManifest === 'function' ? runtime.getManifest() : null;
            return manifest ? { ...fallback, ...manifest } : fallback;
        } catch (e) {
            return fallback;
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

    function createHelperLogoSvg() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 48 48');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('aria-hidden', 'true');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';

        const outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outer.setAttribute('cx', '24');
        outer.setAttribute('cy', '24');
        outer.setAttribute('r', '21');
        outer.setAttribute('fill', '#ffffff');
        outer.setAttribute('stroke', '#111827');
        outer.setAttribute('stroke-width', '3');
        svg.appendChild(outer);

        const knot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        knot.setAttribute('d', 'M18.5 15.5 24 12l5.5 3.5v6.3L35 25.1v6.2L24 38l-11-6.7v-6.2l5.5-3.3v-6.3Z M18.5 21.8 24 25l5.5-3.2 M18.5 28.2 24 31.5l5.5-3.3');
        knot.setAttribute('stroke', '#111827');
        knot.setAttribute('stroke-width', '3');
        knot.setAttribute('stroke-linecap', 'round');
        knot.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(knot);

        const plusV = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        plusV.setAttribute('d', 'M35.5 8v12');
        plusV.setAttribute('stroke', '#facc15');
        plusV.setAttribute('stroke-width', '4.5');
        plusV.setAttribute('stroke-linecap', 'round');
        svg.appendChild(plusV);

        const plusH = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        plusH.setAttribute('d', 'M29.5 14h12');
        plusH.setAttribute('stroke', '#facc15');
        plusH.setAttribute('stroke-width', '4.5');
        plusH.setAttribute('stroke-linecap', 'round');
        svg.appendChild(plusH);

        return svg;
    }

    function createHelperLogoNode(options = {}) {
        const {
            size = 18,
            className = '',
            alt = 'ChatGPT Helper',
            title = '',
        } = options;
        const wrap = createElement('span', {
            className,
            title,
            role: 'img',
            'aria-label': alt,
        });
        wrap.style.width = `${size}px`;
        wrap.style.height = `${size}px`;
        wrap.style.display = 'inline-flex';
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'center';
        wrap.style.flexShrink = '0';
        wrap.style.lineHeight = '0';
        wrap.style.position = 'relative';
        wrap.style.overflow = 'hidden';

        const fallbackSvg = createHelperLogoSvg();
        fallbackSvg.classList.add('chatgpt-helper-logo-fallback-svg');

        const svgImg = createElement('img', {
            className: 'chatgpt-helper-logo-svg',
            alt: '',
            draggable: false,
            'aria-hidden': 'true',
        });
        svgImg.addEventListener('load', () => {
            svgImg.dataset.loaded = 'true';
        });
        svgImg.addEventListener('error', () => {
            svgImg.style.display = 'none';
            fallbackSvg.dataset.active = 'true';
        });
        svgImg.src = getExtensionAssetUrl('icons/logo.svg');

        wrap.appendChild(fallbackSvg);
        wrap.appendChild(svgImg);
        return wrap;
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
        info: [
            ['circle', { cx: '12', cy: '12', r: '10' }],
            ['path', { d: 'M12 16v-4' }],
            ['path', { d: 'M12 8h.01' }]
        ],
        user: [
            ['path', { d: 'M19 21a7 7 0 0 0-14 0' }],
            ['circle', { cx: '12', cy: '8', r: '4' }]
        ],
        shield: [
            ['path', { d: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z' }],
            ['path', { d: 'm9 12 2 2 4-4' }]
        ],
        github: [
            ['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.5 10.5 0 0 0-6 0C8 2 7 2 7 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 6 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4' }],
            ['path', { d: 'M9 18c-4.5 2-5-2-7-2' }]
        ],
        external: [
            ['path', { d: 'M15 3h6v6' }],
            ['path', { d: 'M10 14 21 3' }],
            ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }]
        ],
        share: [
            ['circle', { cx: '18', cy: '5', r: '3' }],
            ['circle', { cx: '6', cy: '12', r: '3' }],
            ['circle', { cx: '18', cy: '19', r: '3' }],
            ['path', { d: 'm8.6 13.5 6.8 4' }],
            ['path', { d: 'm15.4 6.5-6.8 4' }]
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
        search: [
            ['circle', { cx: '11', cy: '11', r: '7' }],
            ['path', { d: 'm21 21-4.3-4.3' }]
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
        const darkPanelTop = hasWallpaper
            ? 'rgba(32, 33, 35, 0.74)'
            : '#202123';
        const darkPanelBottom = hasWallpaper
            ? 'rgba(23, 23, 23, 0.66)'
            : '#171717';
        const lightPanelTop = hasWallpaper
            ? `color-mix(in srgb, #ffffff, ${light} 68%)`
            : '#f9f9f9';
        const lightPanelBottom = hasWallpaper
            ? `color-mix(in srgb, #f4f5f2, ${primary} 12%)`
            : '#f9f9f9';
        const surfaceTop = isDark ? darkPanelTop : lightPanelTop;
        const surfaceBottom = isDark ? darkPanelBottom : lightPanelBottom;
        const neutralText = isDark ? 'rgba(236, 236, 241, 0.96)' : 'rgba(18, 23, 20, 0.94)';
        const mutedText = isDark ? 'rgba(197, 197, 210, 0.74)' : 'rgba(85, 97, 89, 0.78)';
        const panelLine = isDark
            ? (hasWallpaper ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.12)')
            : (hasWallpaper
                ? `color-mix(in srgb, ${primary}, rgba(12,18,16,0.14) 44%)`
                : 'rgba(0, 0, 0, 0.10)');
        const cardShadow = isDark
            ? '0 1px 0 rgba(255, 255, 255, 0.035)'
            : (hasWallpaper
                ? '0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 22px rgba(18, 23, 20, 0.07)'
                : '0 1px 0 rgba(0, 0, 0, 0.025)');
        const elevatedShadow = isDark
            ? (hasWallpaper ? '0 8px 20px rgba(0, 0, 0, 0.20)' : '0 0 0 0 rgba(0, 0, 0, 0)')
            : (hasWallpaper
                ? `0 12px 30px color-mix(in srgb, rgba(18,23,20,0.12), ${primary} 18%)`
                : '0 0 0 0 rgba(0, 0, 0, 0)');

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
                ? (hasWallpaper ? 'rgba(255, 255, 255, 0.045)' : 'color-mix(in srgb, #202123, #ffffff 2%)')
                : (hasWallpaper ? `color-mix(in srgb, ${surfaceTop}, ${primary} 4%)` : '#f3f3f3'),
            '--gh-panel-card': vars['--gh-panel-card-bg'] || (isDark
                ? (hasWallpaper ? 'rgba(255, 255, 255, 0.060)' : 'color-mix(in srgb, #202123, #ffffff 5%)')
                : (hasWallpaper ? `color-mix(in srgb, ${surfaceTop}, #ffffff 52%)` : '#ffffff')),
            '--gh-panel-card-hover': isDark
                ? (hasWallpaper ? 'rgba(255, 255, 255, 0.090)' : 'color-mix(in srgb, #202123, #ffffff 9%)')
                : (hasWallpaper ? `color-mix(in srgb, ${surfaceTop}, ${primary} 9%)` : '#ececec'),
            '--gh-panel-line': panelLine,
            '--gh-panel-muted-line': `color-mix(in srgb, ${panelLine}, transparent 42%)`,
            '--gh-panel-elevated-shadow': elevatedShadow,
            '--gh-panel-card-shadow': cardShadow,
            '--gh-header-quiet-bg': isDark
                ? 'var(--gh-panel-surface)'
                : (hasWallpaper
                    ? `linear-gradient(180deg, color-mix(in srgb, ${surfaceTop}, ${primary} 8%) 0%, ${surfaceTop} 100%)`
                    : 'var(--gh-panel-surface)'),
            '--gh-focus-ring': `color-mix(in srgb, ${primary}, transparent ${isDark ? 56 : 68}%)`,
            '--gh-control-bg': isDark
                ? (hasWallpaper ? 'rgba(255, 255, 255, 0.055)' : 'color-mix(in srgb, #202123, #ffffff 5%)')
                : (hasWallpaper ? `color-mix(in srgb, ${surfaceTop}, #ffffff 48%)` : '#ffffff'),
            '--gh-control-bg-hover': isDark
                ? (hasWallpaper ? 'rgba(255, 255, 255, 0.090)' : 'color-mix(in srgb, #202123, #ffffff 9%)')
                : (hasWallpaper ? `color-mix(in srgb, ${surfaceTop}, ${primary} 8%)` : '#ececec'),
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
                    '--gh-bg': hasWallpaper ? 'rgba(32, 33, 35, 0.180)' : '#202123',
                    '--gh-bg-secondary': hasWallpaper ? 'rgba(23, 23, 23, 0.140)' : '#171717',
                    '--gh-text': '#ececf1',
                    '--gh-text-secondary': 'rgba(236, 236, 241, 0.72)',
                    '--gh-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                    '--gh-hover': hasWallpaper ? 'rgba(255, 255, 255, 0.080)' : '#2a2b2d',
                    '--gh-shadow': hasWallpaper ? '0 8px 20px rgba(0, 0, 0, 0.180)' : '0 0 0 0 rgba(0, 0, 0, 0)',
                    '--gh-input-bg': hasWallpaper
                        ? 'rgba(255, 255, 255, 0.060)'
                        : '#2a2b2d',
                    '--gh-input-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                    '--gh-active-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.100)' : '#343541',
                    '--gh-right-overlay': hasWallpaper
                        ? 'linear-gradient(180deg, rgba(32, 33, 35, 0.700) 0%, rgba(23, 23, 23, 0.600) 100%)'
                        : 'linear-gradient(180deg, #202123 0%, #171717 100%)',
                    '--gh-panel-card-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.060)' : '#2a2b2d',
                    '--gh-panel-card-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                    '--gh-sidebar-button-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.060)' : '#2a2b2d',
                    '--gh-msg-user-bg': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(32, 33, 35, 0.220) 0%, rgba(52, 53, 65, 0.120) 100%)'
                        : 'rgba(52, 53, 65, 0.940)',
                    '--gh-msg-assistant-bg': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(32, 33, 35, 0.160) 0%, rgba(23, 23, 23, 0.090) 100%)'
                        : 'transparent',
                    '--gh-msg-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                    '--gh-msg-shadow': hasWallpaper ? '0 8px 20px rgba(0, 0, 0, 0.120)' : 'none',
                    '--gh-msg-blur': messageBlur,
                    '--gh-panel-blur': panelBlur,
                    '--gh-composer-blur': composerBlur,
                    '--gh-composer-shadow': hasWallpaper ? '0 8px 20px rgba(0, 0, 0, 0.120)' : 'none',
                    '--gh-page-sidebar-bg-light': 'color-mix(in srgb, #ffffff, transparent 84%)',
                    '--gh-page-chat-bg-light': 'transparent',
                    '--gh-page-composer-bg-light': 'color-mix(in srgb, #ffffff, transparent 78%)',
                    '--gh-page-sidebar-bg-dark': hasWallpaper
                        ? 'linear-gradient(180deg, rgba(32, 33, 35, 0.320) 0%, rgba(23, 23, 23, 0.220) 100%)'
                        : 'transparent',
                    '--gh-page-chat-bg-dark': 'transparent',
                    '--gh-page-composer-bg-dark': hasWallpaper
                        ? 'linear-gradient(135deg, rgba(32, 33, 35, 0.800) 0%, rgba(23, 23, 23, 0.720) 100%)'
                        : 'transparent',
                    '--gh-page-accent-soft': 'rgba(59, 130, 246, 0.100)',
                    '--gh-page-accent-soft-dark': hasWallpaper ? 'rgba(255, 255, 255, 0.100)' : 'rgba(255, 255, 255, 0.080)',
                    '--gh-page-accent-strong': '#2563eb',
                    '--gh-page-link': '#2563eb',
                    '--gh-page-selection': 'rgba(59, 130, 246, 0.180)'
                }, preset, options);
            }

            return withProductivitySurfaceVars({
                '--gh-bg': '#f9f9f9',
                '--gh-bg-secondary': '#f3f3f3',
                '--gh-text': '#0d0d0d',
                '--gh-text-secondary': 'rgba(13, 13, 13, 0.64)',
                '--gh-border': 'rgba(0, 0, 0, 0.10)',
                '--gh-hover': '#ececec',
                '--gh-shadow': hasWallpaper ? '0 8px 20px rgba(0, 0, 0, 0.080)' : '0 0 0 0 rgba(0,0,0,0)',
                '--gh-input-bg': hasWallpaper
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.860) 0%, rgba(248, 250, 252, 0.760) 100%)'
                    : '#ffffff',
                '--gh-input-border': hasWallpaper ? 'rgba(226, 232, 240, 0.860)' : 'rgba(0, 0, 0, 0.10)',
                '--gh-active-bg': '#ececec',
                '--gh-right-overlay': hasWallpaper
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.560) 0%, rgba(248, 250, 252, 0.420) 100%)'
                    : '#f9f9f9',
                '--gh-panel-card-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.540)' : '#ffffff',
                '--gh-panel-card-border': hasWallpaper ? 'rgba(255, 255, 255, 0.460)' : 'rgba(0, 0, 0, 0.10)',
                '--gh-sidebar-button-bg': hasWallpaper ? 'rgba(255, 255, 255, 0.420)' : '#ececec',
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
                    : '#f9f9f9',
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
                ? blendRgbColors('#202123', preset.primary, 0.04 + panelUnit * 0.04)
                : blendRgbColors('#202123', preset.primary, 0.06 + panelUnit * 0.04);
            const sidebarBottom = hasWallpaper
                ? blendRgbColors('#171717', preset.secondary, 0.03 + panelUnit * 0.04)
                : blendRgbColors('#171717', preset.secondary, 0.04 + panelUnit * 0.03);
            const panelTop = hasWallpaper
                ? blendRgbColors('#202123', preset.primary, 0.04 + panelUnit * 0.05)
                : blendRgbColors('#202123', preset.primary, 0.06 + panelUnit * 0.04);
            const panelBottom = hasWallpaper
                ? blendRgbColors('#171717', preset.secondary, 0.03 + panelUnit * 0.05)
                : blendRgbColors('#171717', preset.secondary, 0.04 + panelUnit * 0.03);
            const cardTop = hasWallpaper
                ? blendRgbColors('#2a2b2d', preset.primary, 0.04 + panelUnit * 0.05)
                : blendRgbColors('#2a2b2d', preset.primary, 0.05 + panelUnit * 0.04);
            const cardBottom = hasWallpaper
                ? blendRgbColors('#202123', preset.secondary, 0.03 + panelUnit * 0.04)
                : blendRgbColors('#202123', preset.secondary, 0.04 + panelUnit * 0.03);
            const messageTop = hasWallpaper
                ? blendRgbColors('#202123', preset.light, 0.04 + messageUnit * 0.05)
                : blendRgbColors('#202123', preset.light, 0.03 + messageUnit * 0.03);
            const messageAccent = hasWallpaper
                ? blendRgbColors('#202123', preset.primary, 0.06 + messageUnit * 0.06)
                : blendRgbColors('#202123', preset.primary, 0.08 + messageUnit * 0.04);
            const userAccent = hasWallpaper
                ? blendRgbColors('#252628', preset.secondary, 0.05 + messageUnit * 0.05)
                : blendRgbColors('#252628', preset.secondary, 0.07 + messageUnit * 0.04);
            const activeTint = blendRgbColors('#343541', preset.primary, 0.12 + panelUnit * 0.06);
            const shadowTint = hasWallpaper
                ? blendRgbColors('#000000', preset.primary, 0.04)
                : '#000000';
            const composerTop = hasWallpaper
                ? blendRgbColors('#2a2b2d', preset.light, 0.04 + composerUnit * 0.05)
                : blendRgbColors('#2a2b2d', preset.light, 0.03 + composerUnit * 0.03);
            const composerBottom = hasWallpaper
                ? blendRgbColors('#202123', preset.primary, 0.06 + composerUnit * 0.06)
                : blendRgbColors('#202123', preset.primary, 0.08 + composerUnit * 0.04);

            return withProductivitySurfaceVars({
                '--gh-bg': rgbaFromColor(cardTop, hasWallpaper ? (0.28 + panelUnit * 0.14) : 0.98),
                '--gh-bg-secondary': rgbaFromColor(cardBottom, hasWallpaper ? (0.22 + panelUnit * 0.12) : 0.96),
                '--gh-text': '#ececf1',
                '--gh-text-secondary': 'rgba(236, 236, 241, 0.72)',
                '--gh-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                '--gh-hover': hasWallpaper ? 'rgba(255, 255, 255, 0.080)' : '#2a2b2d',
                '--gh-shadow': hasWallpaper
                    ? `0 8px 20px ${rgbaFromColor(shadowTint, 0.14 + panelUnit * 0.04)}`
                    : '0 0 0 0 rgba(0, 0, 0, 0)',
                '--gh-input-bg': buildLinearGradient('135deg', [
                    `${rgbaFromColor(composerTop, hasWallpaper ? (0.46 + composerUnit * 0.16) : 0.94)} 0%`,
                    `${rgbaFromColor(composerBottom, hasWallpaper ? (0.36 + composerUnit * 0.14) : 0.96)} 100%`
                ]),
                '--gh-input-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
                '--gh-active-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.18 + panelUnit * 0.06) : 0.90),
                '--gh-right-overlay': buildLinearGradient('180deg', [
                    `${rgbaFromColor(panelTop, hasWallpaper ? (0.48 + panelUnit * 0.12) : 0.99)} 0%`,
                    `${rgbaFromColor(panelBottom, hasWallpaper ? (0.36 + panelUnit * 0.10) : 0.97)} 100%`
                ]),
                '--gh-panel-card-bg': buildLinearGradient('135deg', [
                    `${rgbaFromColor(cardTop, hasWallpaper ? (0.42 + panelUnit * 0.14) : 0.98)} 0%`,
                    `${rgbaFromColor(cardBottom, hasWallpaper ? (0.32 + panelUnit * 0.12) : 0.96)} 100%`
                ]),
                '--gh-panel-card-border': hasWallpaper ? 'rgba(255, 255, 255, 0.150)' : 'rgba(255, 255, 255, 0.120)',
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
                '--gh-msg-border': hasWallpaper ? 'rgba(255, 255, 255, 0.140)' : 'rgba(255, 255, 255, 0.110)',
                '--gh-msg-shadow': hasWallpaper
                    ? `0 8px 20px ${rgbaFromColor(shadowTint, 0.10 + messageUnit * 0.05)}`
                    : 'none',
                '--gh-msg-blur': messageBlur,
                '--gh-panel-blur': panelBlur,
                '--gh-composer-blur': composerBlur,
                '--gh-composer-shadow': hasWallpaper
                    ? `0 8px 20px ${rgbaFromColor(shadowTint, 0.10 + composerUnit * 0.04)}`
                    : 'none',
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
            '--gh-shadow': hasWallpaper
                ? `0 8px 20px ${rgbaFromColor(shadowTint, 0.10 + panelUnit * 0.06)}`
                : '0 0 0 0 rgba(0, 0, 0, 0)',
            '--gh-input-bg': buildLinearGradient('135deg', [
                `${rgbaFromColor(composerTop, hasWallpaper ? (0.72 + composerUnit * 0.16) : 0.96)} 0%`,
                `${rgbaFromColor(composerBottom, hasWallpaper ? (0.62 + composerUnit * 0.14) : 0.90)} 100%`
            ]),
            '--gh-input-border': rgbaFromColor(messageBorder, hasWallpaper ? (0.38 + composerUnit * 0.12) : (0.38 + composerUnit * 0.08)),
            '--gh-active-bg': rgbaFromColor(activeTint, hasWallpaper ? (0.18 + panelUnit * 0.08) : (0.34 + panelUnit * 0.10)),
            '--gh-right-overlay': hasWallpaper
                ? buildLinearGradient('180deg', [
                    `${rgbaFromColor(panelTop, 0.56 + panelUnit * 0.16)} 0%`,
                    `${rgbaFromColor(panelBottom, 0.42 + panelUnit * 0.14)} 100%`
                ])
                : '#f9f9f9',
            '--gh-panel-card-bg': hasWallpaper
                ? buildLinearGradient('135deg', [
                    `${rgbaFromColor(cardTop, 0.48 + panelUnit * 0.16)} 0%`,
                    `${rgbaFromColor(cardBottom, 0.36 + panelUnit * 0.14)} 100%`
                ])
                : '#ffffff',
            '--gh-panel-card-border': hasWallpaper
                ? rgbaFromColor(panelBorder, 0.32 + panelUnit * 0.12)
                : 'rgba(0, 0, 0, 0.10)',
            '--gh-sidebar-button-bg': hasWallpaper
                ? rgbaFromColor(activeTint, 0.32 + panelUnit * 0.12)
                : '#ececec',
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
            '--gh-msg-shadow': hasWallpaper
                ? `0 14px 32px ${rgbaFromColor(shadowTint, 0.08 + messageUnit * 0.08)}`
                : 'none',
            '--gh-msg-blur': messageBlur,
            '--gh-panel-blur': panelBlur,
            '--gh-composer-blur': composerBlur,
            '--gh-composer-shadow': hasWallpaper
                ? `0 10px 24px ${rgbaFromColor(shadowTint, 0.08 + composerUnit * 0.08)}`
                : 'none',
            '--gh-page-sidebar-bg-light': hasWallpaper
                ? buildLinearGradient('180deg', [
                    `${rgbaFromColor(sidebarTop, 0.30 + panelUnit * 0.14)} 0%`,
                    `${rgbaFromColor(sidebarBottom, 0.18 + panelUnit * 0.12)} 100%`
                ])
                : '#f9f9f9',
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
        EXTENSION_NAME,
        EXTENSION_VERSION,
        EXTENSION_AUTHOR,
        EXTENSION_LICENSE,
        THEME_HOST_ATTRS,
        DEFAULT_THEME_CONFIG,
        DEFAULT_SETTINGS,
        DEFAULT_PROMPTS,
        createDefaultPrompts,
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
