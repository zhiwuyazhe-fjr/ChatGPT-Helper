(function(){"use strict";const F={PROMPTS:"chatgpt_prompts",SETTINGS:"chatgpt_settings",PROMPT_LIBRARY_VERSION:"chatgpt_prompts_version",DEFAULT_PANEL_STATE:"chatgpt_default_panel_state",PANEL_WIDTH:"chatgpt_panel_width",LANGUAGE:"chatgpt_language",CONVERSATIONS:"chatgpt_conversations",READING_PROGRESS:"chatgpt_reading_progress",ONBOARDING_DONE:"chatgpt_onboarding_done"},xe=/\{\{\s*([^{}\n]+?)\s*\}\}/g;function Me(n){if(typeof n!="string"||!n)return[];const e=[];let t;for(xe.lastIndex=0;(t=xe.exec(n))!==null;){const r=t[1].trim();r&&!e.includes(r)&&e.push(r)}return e}function Ke(n,e={}){return typeof n!="string"||!n?n||"":n.replace(xe,(t,r)=>{const a=String(r||"").trim(),o=e[a];return o==null||o===""?t:String(o)})}const oe={"zh-CN":{panelTitle:"ChatGPT Helper",tabPrompts:"\u63D0\u793A\u8BCD",tabOutline:"\u5927\u7EB2",tabConversations:"\u4F1A\u8BDD",tabExport:"\u5BFC\u51FA",tabSettings:"\u8BBE\u7F6E",searchPlaceholder:"\u641C\u7D22\u63D0\u793A\u8BCD...",addPrompt:"\u6DFB\u52A0\u65B0\u63D0\u793A\u8BCD",editPrompt:"\u7F16\u8F91\u63D0\u793A\u8BCD",noPrompts:"\u6682\u65E0\u63D0\u793A\u8BCD",promptEmptyHint:"\u6DFB\u52A0\u5E38\u7528\u5DE5\u4F5C\u6D41\uFF0C\u8BA9\u9AD8\u9891\u4EFB\u52A1\u4E00\u952E\u8FDB\u5165\u8F93\u5165\u6846\u3002",promptSearchEmptyHint:"\u6362\u4E2A\u5173\u952E\u8BCD\uFF0C\u6216\u65B0\u5EFA\u4E00\u4E2A\u66F4\u8D34\u8FD1\u5F53\u524D\u4EFB\u52A1\u7684\u63D0\u793A\u8BCD\u3002",optional:"\u53EF\u9009",defaultPromptResearchTitle:"\u8D44\u6599\u7CBE\u8BFB\u4E0E\u6D1E\u5BDF\u63D0\u70BC",defaultPromptResearchContent:`\u8BF7\u4F5C\u4E3A\u4E25\u8C28\u7684\u7814\u7A76\u52A9\u7406\uFF0C\u7CBE\u8BFB\u4EE5\u4E0B\u6750\u6599\uFF0C\u5E76\u6309\u8FD9\u4E2A\u7ED3\u6784\u8F93\u51FA\uFF1A
1. \u6838\u5FC3\u7ED3\u8BBA\uFF083-5\u6761\uFF09
2. \u5173\u952E\u8BC1\u636E\u4E0E\u6765\u6E90\u4F4D\u7F6E
3. \u9690\u542B\u5047\u8BBE\u6216\u4E89\u8BAE\u70B9
4. \u53EF\u6267\u884C\u5EFA\u8BAE
5. \u8FD8\u9700\u8981\u8865\u5145\u786E\u8BA4\u7684\u95EE\u9898

\u6750\u6599\uFF1A`,defaultPromptResearchCategory:"\u7814\u7A76",defaultPromptPlanningTitle:"\u4EFB\u52A1\u62C6\u89E3\u4E0E\u6267\u884C\u8BA1\u5212",defaultPromptPlanningContent:`\u8BF7\u628A\u4E0B\u9762\u76EE\u6807\u62C6\u89E3\u6210\u53EF\u6267\u884C\u8BA1\u5212\u3002\u5148\u786E\u8BA4\u76EE\u6807\u3001\u7EA6\u675F\u548C\u6210\u529F\u6807\u51C6\uFF0C\u518D\u8F93\u51FA\uFF1A
1. \u91CC\u7A0B\u7891
2. \u5177\u4F53\u4EFB\u52A1\u6E05\u5355
3. \u4F18\u5148\u7EA7\u4E0E\u4F9D\u8D56\u5173\u7CFB
4. \u4E3B\u8981\u98CE\u9669\u4E0E\u5E94\u5BF9\u65B9\u6848
5. \u4ECA\u5929\u5C31\u80FD\u5F00\u59CB\u7684\u4E0B\u4E00\u6B65

\u76EE\u6807\uFF1A`,defaultPromptPlanningCategory:"\u6548\u7387",defaultPromptWritingTitle:"\u5199\u4F5C\u6DA6\u8272\u4E0E\u7ED3\u6784\u4F18\u5316",defaultPromptWritingContent:`\u8BF7\u4F5C\u4E3A\u8D44\u6DF1\u7F16\u8F91\uFF0C\u4F18\u5316\u4E0B\u9762\u6587\u5B57\u3002\u8981\u6C42\uFF1A
1. \u4FDD\u7559\u539F\u610F\u548C\u4E8B\u5B9E
2. \u63D0\u5347\u7ED3\u6784\u3001\u903B\u8F91\u548C\u53EF\u8BFB\u6027
3. \u6807\u51FA\u5173\u952E\u4FEE\u6539\u7406\u7531
4. \u7ED9\u51FA\u4E00\u4E2A\u66F4\u7B80\u6D01\u7248\u672C\u548C\u4E00\u4E2A\u66F4\u6709\u8BF4\u670D\u529B\u7248\u672C

\u539F\u6587\uFF1A`,defaultPromptWritingCategory:"\u5199\u4F5C",defaultPromptDebugTitle:"Bug \u5B9A\u4F4D\u4E0E\u4FEE\u590D\u65B9\u6848",defaultPromptDebugContent:`\u8BF7\u4F5C\u4E3A\u9AD8\u7EA7\u5DE5\u7A0B\u5E08\u534F\u52A9\u5B9A\u4F4D\u95EE\u9898\u3002\u8BF7\u5148\u6839\u636E\u73B0\u8C61\u5217\u51FA\u6700\u53EF\u80FD\u7684\u539F\u56E0\uFF0C\u518D\u7ED9\u51FA\u9A8C\u8BC1\u6B65\u9AA4\u3001\u6700\u5C0F\u4FEE\u590D\u65B9\u6848\u3001\u6F5C\u5728\u526F\u4F5C\u7528\u548C\u5EFA\u8BAE\u8865\u5145\u7684\u6D4B\u8BD5\u3002

\u73B0\u8C61 / \u62A5\u9519 / \u76F8\u5173\u4EE3\u7801\uFF1A`,defaultPromptDebugCategory:"\u5F00\u53D1",defaultPromptDecisionTitle:"\u65B9\u6848\u5BF9\u6BD4\u4E0E\u51B3\u7B56\u5EFA\u8BAE",defaultPromptDecisionContent:`\u8BF7\u5E2E\u6211\u5BF9\u6BD4\u4E0B\u9762\u51E0\u4E2A\u65B9\u6848\uFF0C\u5E76\u7528\u51B3\u7B56\u8868\u8F93\u51FA\uFF1A\u76EE\u6807\u5339\u914D\u5EA6\u3001\u6210\u672C\u3001\u98CE\u9669\u3001\u53EF\u7EF4\u62A4\u6027\u3001\u957F\u671F\u5F71\u54CD\u3002\u6700\u540E\u7ED9\u51FA\u63A8\u8350\u65B9\u6848\u3001\u63A8\u8350\u7406\u7531\u548C\u4EC0\u4E48\u60C5\u51B5\u4E0B\u5E94\u8BE5\u6539\u9009\u5176\u4ED6\u65B9\u6848\u3002

\u80CC\u666F\u4E0E\u65B9\u6848\uFF1A`,defaultPromptDecisionCategory:"\u51B3\u7B56",allCategory:"\u5168\u90E8",refresh:"\u5237\u65B0",expand:"\u5C55\u5F00\u4FA7\u680F",collapse:"\u6536\u8D77\u4FA7\u680F",edit:"\u7F16\u8F91",delete:"\u5220\u9664",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",add:"\u6DFB\u52A0",title:"\u6807\u9898",category:"\u5206\u7C7B",content:"\u63D0\u793A\u8BCD\u5185\u5BB9",promptUpdated:"\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0",promptAdded:"\u63D0\u793A\u8BCD\u5DF2\u6DFB\u52A0",deleted:"\u5DF2\u5220\u9664",copied:"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",refreshed:"\u5DF2\u5237\u65B0",inserted:"\u5DF2\u63D2\u5165\u63D0\u793A\u8BCD",confirmDelete:"\u786E\u5B9A\u5220\u9664?",fillTitleContent:"\u8BF7\u586B\u5199\u6807\u9898\u548C\u5185\u5BB9",noConversations:"\u6682\u65E0\u4F1A\u8BDD",noSearchResults:"\u672A\u627E\u5230\u5339\u914D\u7ED3\u679C",inbox:"\u6536\u4EF6\u7BB1",untitledConversation:"\u672A\u547D\u540D\u5BF9\u8BDD",promptFolderName:"\u8BF7\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0\uFF1A",moveToFolder:"\u79FB\u52A8\u5230\u6587\u4EF6\u5939",confirm:"\u786E\u5B9A",confirmDeleteConversation:'\u786E\u5B9A\u8981\u5220\u9664 "{title}" \u5417\uFF1F',confirmDeleteConversations:"\u786E\u5B9A\u8981\u5220\u9664 {count} \u4E2A\u4F1A\u8BDD\u5417\uFF1F",exportedConversations:"\u5DF2\u5BFC\u51FA {count} \u4E2A\u4F1A\u8BDD",openConversationFirst:"\u8BF7\u5148\u6253\u5F00\u4F1A\u8BDD: {title}",addTag:"\u6DFB\u52A0\u6807\u7B7E",tagPrompt:"\u8F93\u5165\u6807\u7B7E\u540D\u79F0\uFF08\u7559\u7A7A\u5220\u9664\u6807\u7B7E\uFF09\uFF1A",tagUpdated:"\u6807\u7B7E\u5DF2\u66F4\u65B0",exportInfoHeading:"\u5BFC\u51FA\u4FE1\u606F",conversationTitleLabel:"\u4F1A\u8BDD\u6807\u9898",exportTimeLabel:"\u5BFC\u51FA\u65F6\u95F4",sourceLabel:"\u6765\u6E90",linkLabel:"\u94FE\u63A5",userRole:"\u7528\u6237",historyLoading:"\u6B63\u5728\u52A0\u8F7D\u5386\u53F2...",scrollContainerMissing:"\u672A\u627E\u5230\u6EDA\u52A8\u5BB9\u5668",historyLoadComplete:"\u5386\u53F2\u52A0\u8F7D\u5B8C\u6210",pleaseWait:"\u8BF7\u7A0D\u5019...",stop:"\u505C\u6B62",formulaCopied:"\u516C\u5F0F\u5DF2\u590D\u5236",formulaSourceUnavailable:"\u672A\u627E\u5230\u516C\u5F0F\u6E90\u7801\uFF0C\u672A\u590D\u5236",copyFailed:"\u590D\u5236\u5931\u8D25",copyAsMarkdown:"\u590D\u5236\u4E3A Markdown",tableCopied:"\u8868\u683C\u5DF2\u590D\u5236",outlineNoContent:"\u6682\u65E0\u5927\u7EB2\u5185\u5BB9\uFF0C\u8BF7\u7B49\u5F85\u5BF9\u8BDD\u751F\u6210\u6216\u5237\u65B0\u9875\u9762",syncConversations:"\u540C\u6B65\u4F1A\u8BDD",newFolder:"\u65B0\u5EFA\u6587\u4EF6\u5939",deleteFolder:"\u5220\u9664\u6587\u4EF6\u5939",deleteFolderConfirm:`\u786E\u5B9A\u8981\u5220\u9664\u6587\u4EF6\u5939 "{name}" \u5417\uFF1F
\u6587\u4EF6\u5939\u5185\u7684\u4F1A\u8BDD\u5C06\u79FB\u52A8\u5230\u6536\u4EF6\u7BB1\u3002`,folderDeleted:"\u6587\u4EF6\u5939\u5DF2\u5220\u9664",batchMode:"\u6279\u91CF\u64CD\u4F5C",batchComplete:"\u5B8C\u6210",selected:"\u5DF2\u9009\u62E9",items:"\u9879",move:"\u79FB\u52A8",export:"\u5BFC\u51FA",pinned:"\u7F6E\u9876",unpinned:"\u53D6\u6D88\u7F6E\u9876",moved:"\u5DF2\u79FB\u52A8",exported:"\u5DF2\u5BFC\u51FA",synced:"\u5DF2\u540C\u6B65",conversationSyncing:"\u6B63\u5728\u540C\u6B65\u4F1A\u8BDD...",conversationSyncNoResults:"\u672A\u52A0\u8F7D\u5230\u5386\u53F2\u4F1A\u8BDD\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u767B\u5F55 ChatGPT \u540E\u91CD\u8BD5",conversationSyncFailed:"\u4F1A\u8BDD\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",newSessions:"\u4E2A\u65B0\u4F1A\u8BDD",updatedSessions:"\u4E2A\u4F1A\u8BDD",exportFormat:`\u9009\u62E9\u5BFC\u51FA\u683C\u5F0F\uFF1A
1. Markdown
2. JSON
3. TXT`,exportSuccess:"\u5BFC\u51FA\u6210\u529F",exportFailed:"\u5BFC\u51FA\u5931\u8D25",noContent:"\u672A\u627E\u5230\u5BF9\u8BDD\u5185\u5BB9",openFirst:"\u8BF7\u5148\u6253\u5F00\u4F1A\u8BDD",settingsTitle:"\u8BBE\u7F6E",readingHistory:"\u9605\u8BFB\u5386\u53F2",settingsGroupGeneral:"\u901A\u7528",settingsGroupTabs:"\u6807\u7B7E\u9875",settingsGroupReadingNavigation:"\u9605\u8BFB\u4E0E\u5BFC\u822A",settingsGroupContentProcessing:"\u5185\u5BB9\u5904\u7406",settingsGroupBrowserTab:"\u6D4F\u89C8\u5668\u6807\u7B7E\u9875",settingsGroupQuickButtons:"\u5FEB\u6377\u6309\u94AE",settingsShowTab:"\u663E\u793A\u201C{name}\u201D",tabOrderUpdated:"\u6807\u7B7E\u9875\u987A\u5E8F\u5DF2\u66F4\u65B0",language:"\u754C\u9762\u8BED\u8A00",autoDetect:"\u81EA\u52A8\u68C0\u6D4B",chinese:"\u7B80\u4F53\u4E2D\u6587",english:"English",languageChanged:"\u8BED\u8A00\u5DF2\u66F4\u6539",themeToggle:"\u5207\u6362\u4E3B\u9898",newChatInTab:"\u65B0\u6807\u7B7E\u9875\u5F00\u542F\u5BF9\u8BDD",noAnchor:"\u6682\u65E0\u951A\u70B9",noAnchorAutoHint:"\u6682\u65E0\u951A\u70B9\uFF08\u70B9\u51FB\u9876\u90E8/\u5E95\u90E8\u6309\u94AE\u53EF\u81EA\u52A8\u751F\u6210\uFF09",setAnchor:"\u8BBE\u7F6E\u951A\u70B9",clearAnchor:"\u6E05\u9664\u951A\u70B9",returnAnchor:"\u8FD4\u56DE\u951A\u70B9",returnPreviousPosition:"\u8FD4\u56DE\u8DF3\u8F6C\u524D\u4F4D\u7F6E",anchorSet:"\u5DF2\u8BBE\u7F6E\u951A\u70B9",anchorSetFailed:"\u8BBE\u7F6E\u951A\u70B9\u5931\u8D25",anchorCleared:"\u5DF2\u6E05\u9664\u951A\u70B9",returnedAnchor:"\u5DF2\u8FD4\u56DE\u951A\u70B9",returnedPreviousPosition:"\u5DF2\u8FD4\u56DE\u8DF3\u8F6C\u524D\u4F4D\u7F6E",returnAnchorFailed:"\u8FD4\u56DE\u951A\u70B9\u5931\u8D25",scrolledTop:"\u5DF2\u6EDA\u52A8\u5230\u9876\u90E8",scrolledBottom:"\u5DF2\u6EDA\u52A8\u5230\u5E95\u90E8",exportModuleLoadFailed:"\u5BFC\u51FA\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 ChatGPT Helper \u5BFC\u51FA\u811A\u672C\u662F\u5426\u6B63\u5E38\u8FD0\u884C\u3002",exportModuleMissing:"\u672A\u68C0\u6D4B\u5230 ChatGPT Helper \u5BFC\u51FA\u6A21\u5757\uFF0C\u8BF7\u786E\u4FDD\u6269\u5C55\u5DF2\u6B63\u786E\u52A0\u8F7D\u3002",operationFailed:"\u64CD\u4F5C\u5931\u8D25",openThemeSettings:"\u6253\u5F00\u4E3B\u9898\u8BBE\u7F6E",themeDialogTitle:"\u4E3B\u9898",themeAppearance:"\u5916\u89C2",themeAppearanceSystem:"\u8DDF\u968F\u7CFB\u7EDF",themeAppearanceLight:"\u6D45\u8272",themeAppearanceDark:"\u6DF1\u8272",themeColorPresets:"\u989C\u8272",themePresetOriginal:"\u539F\u59CB\u4E3B\u9898",themeWallpaper:"\u58C1\u7EB8",themeEnableWallpaper:"\u542F\u7528\u58C1\u7EB8",themeDropImage:"\u5C06\u56FE\u7247\u62D6\u653E\u5230\u8FD9\u91CC",themeFileTypes:"\u652F\u6301 PNG\u3001JPG\u3001WebP\uFF0C\u6700\u5927 5MB",themeSelectFile:"\u9009\u62E9\u6587\u4EF6",themeRemoveImage:"\u79FB\u9664\u80CC\u666F\u56FE",themeBlur:"\u6A21\u7CCA",themeMessageGlass:"\u6D88\u606F\u6BDB\u73BB\u7483\u6548\u679C",themeMessageGlassIntensity:"\u6D88\u606F\u6BDB\u73BB\u7483\u5F3A\u5EA6",themePanelGlassIntensity:"\u4FA7\u680F/\u53F3\u680F\u6BDB\u73BB\u7483\u5F3A\u5EA6",themeSidebarEnhance:"\u4FA7\u680F\u6587\u5B57\u589E\u5F3A",themeSidebarEnhanceIntensity:"\u589E\u5F3A\u5F3A\u5EA6",themeLivePreview:"\u5B9E\u65F6\u9884\u89C8",themeUploadSuccess:"\u80CC\u666F\u56FE\u7247\u5DF2\u66F4\u65B0",themeBackgroundRemoved:"\u80CC\u666F\u56FE\u7247\u5DF2\u79FB\u9664",themeNoBackground:"\u6682\u65E0\u80CC\u666F\u56FE\u7247",themeInvalidType:"\u4EC5\u652F\u6301 PNG/JPG/WebP \u683C\u5F0F",themeFileTooLarge:"\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB",themeImageLoadFailed:"\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",themeSwitchedLight:"\u5DF2\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",themeSwitchedDark:"\u5DF2\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",themeSwitchFailed:"\u4E3B\u9898\u5207\u6362\u5931\u8D25",aboutButton:"\u5173\u4E8E",aboutTopEntryTitle:"\u5173\u4E8E",aboutDialogTitle:"\u5173\u4E8E ChatGPT Helper",aboutTagline:"\u8D34\u8FD1 ChatGPT \u7684\u8F7B\u91CF\u6548\u7387\u9762\u677F",aboutMotivationTitle:"\u5F00\u53D1\u52A8\u673A",aboutMotivationContent:"\u4F5C\u4E3A\u957F\u671F\u4F7F\u7528 ChatGPT \u7684 TJU \u8BA1\u7B97\u673A\u5B66\u751F\uFF0C\u6211\u628A\u5E38\u7528\u7684\u63D0\u793A\u8BCD\u3001\u5BFC\u822A\u3001\u6574\u7406\u548C\u5BFC\u51FA\u9700\u6C42\u505A\u6210\u4E00\u4E2A\u8F7B\u91CF\u5DE5\u5177\u3002\u5B83\u6765\u81EA\u771F\u5B9E\u4F7F\u7528\u4E2D\u7684\u53CD\u590D\u6253\u78E8\uFF0C\u76EE\u6807\u662F\u51CF\u5C11\u5207\u6362\u548C\u6574\u7406\u6210\u672C\uFF0C\u8BA9\u6CE8\u610F\u529B\u7559\u5728\u5BF9\u8BDD\u672C\u8EAB\u3002",aboutFeedbackTitle:"\u53CD\u9988",aboutFeatureRequest:"\u529F\u80FD\u5EFA\u8BAE",aboutBugSupport:"\u63D0\u4EA4\u53CD\u9988",aboutOpenSourceTitle:"\u9879\u76EE\u4FE1\u606F",aboutSupportTitle:"\u5206\u4EAB\u9879\u76EE",aboutSupportContent:"\u5982\u679C ChatGPT Helper \u5BF9\u4F60\u7684\u5DE5\u4F5C\u6D41\u6709\u5E2E\u52A9\uFF0C\u53EF\u4EE5\u628A\u4ED3\u5E93\u5206\u4EAB\u7ED9\u9700\u8981\u7684\u4EBA\uFF0C\u6216\u5728 GitHub \u4E0A\u7559\u4E0B\u5EFA\u8BAE\u3002",aboutShare:"\u5206\u4EAB\u7ED9\u670B\u53CB",aboutAuthorTitle:"\u5173\u4E8E\u4F5C\u8005",aboutAuthorBio:`TJU | CS \u5728\u8BFB
AI \u5DE5\u5177\u63A2\u7D22\u8005
\u957F\u671F ChatGPT \u4F7F\u7528\u8005`,aboutRepoButton:"GitHub \u4ED3\u5E93",aboutRepoLabel:"\u9879\u76EE\u4ED3\u5E93",aboutAuthorGithub:"\u4F5C\u8005 GitHub",aboutClose:"\u5173\u95ED",aboutCopyRepoSuccess:"\u5206\u4EAB\u94FE\u63A5\u5DF2\u590D\u5236",aboutCopyRepoFailed:"\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u4ED3\u5E93\u94FE\u63A5",aboutVersionTitle:"\u7248\u672C\u4FE1\u606F",aboutVersionLabel:"\u7248\u672C",aboutAuthorLabel:"\u4F5C\u8005",aboutLicenseLabel:"\u8BB8\u53EF\u8BC1",aboutPoweredBy:"\u4E3A\u4E13\u6CE8\u7684 ChatGPT \u5DE5\u4F5C\u6D41\u6253\u9020",aboutIntroTitle:"\u9879\u76EE\u7B80\u4ECB",aboutIntro:"ChatGPT Helper \u901A\u8FC7\u53F3\u4FA7\u529F\u80FD\u9762\u677F\u4E3A ChatGPT \u63D0\u4F9B\u63D0\u793A\u8BCD\u7BA1\u7406\u3001\u5BF9\u8BDD\u5927\u7EB2\u3001\u4F1A\u8BDD\u6574\u7406\u3001\u5BFC\u51FA\u4E0E\u9605\u8BFB\u5B9A\u4F4D\u7B49\u589E\u5F3A\u80FD\u529B\uFF0C\u5C3D\u91CF\u4FDD\u6301\u539F\u9875\u9762\u7ED3\u6784\u4E0D\u88AB\u6253\u65AD\u3002",aboutFeaturesTitle:"\u6838\u5FC3\u80FD\u529B",aboutFeaturePrompts:"\u63D0\u793A\u8BCD\u7BA1\u7406\u4E0E\u5FEB\u901F\u63D2\u5165",aboutFeatureOutline:"\u81EA\u52A8\u751F\u6210\u5BF9\u8BDD\u5927\u7EB2\u4E0E\u5BFC\u822A",aboutFeatureConversations:"\u5386\u53F2\u4F1A\u8BDD\u6574\u7406\u4E0E\u6279\u91CF\u7BA1\u7406",aboutFeatureExport:"\u591A\u683C\u5F0F\u5BFC\u51FA\u4E0E\u9605\u8BFB\u5B9A\u4F4D\u589E\u5F3A",aboutSitesLabel:"\u7AD9\u70B9",aboutSupportSites:"\u652F\u6301 chatgpt.com\u3001chat.openai.com \u4E0E new.oaifree.com",aboutPrivacyTitle:"\u9690\u79C1\u4E0E\u6743\u9650",aboutPrivacy:"\u6240\u6709\u8BBE\u7F6E\u4E0E\u6570\u636E\u5904\u7406\u5747\u5728\u672C\u5730\u6D4F\u89C8\u5668\u5B8C\u6210\uFF1B\u6269\u5C55\u4F7F\u7528 storage \u4FDD\u5B58\u672C\u5730\u914D\u7F6E\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u5BF9\u8BDD\u5185\u5BB9\u3002",searchConversations:"\u641C\u7D22\u4F1A\u8BDD...",selectConversationsFirst:"\u8BF7\u5148\u9009\u62E9\u8981\u64CD\u4F5C\u7684\u4F1A\u8BDD",defaultPanelOpenLabel:"\u9ED8\u8BA4\u5C55\u5F00\u9762\u677F",enablePromptsLabel:"\u542F\u7528\u63D0\u793A\u8BCD",enableOutlineLabel:"\u542F\u7528\u5927\u7EB2",showUserMessagesLabel:"\u663E\u793A\u7528\u6237\u6D88\u606F",enableConversationsLabel:"\u542F\u7528\u4F1A\u8BDD\u7BA1\u7406",preventAutoScrollLabel:"\u9632\u6B62\u81EA\u52A8\u6EDA\u52A8",preventAutoScrollDesc:"\u9605\u8BFB\u524D\u6587\u65F6\uFF0C\u4E0D\u8BA9\u9875\u9762\u8DF3\u5230\u6700\u65B0\u56DE\u590D",enableReadingHistoryLabel:"\u542F\u7528\u9605\u8BFB\u5386\u53F2",enableReadingHistoryDesc:"\u8BB0\u4F4F\u6BCF\u4E2A\u4F1A\u8BDD\u4E0A\u6B21\u8BFB\u5230\u7684\u4F4D\u7F6E",autoRestoreLabel:"\u81EA\u52A8\u8DF3\u8F6C",autoRestoreDesc:"\u6253\u5F00\u4F1A\u8BDD\u65F6\u56DE\u5230\u4E0A\u6B21\u9605\u8BFB\u4F4D\u7F6E",outlineSyncScrollLabel:"\u5927\u7EB2\u8DDF\u968F\u9605\u8BFB\u4F4D\u7F6E",outlineSyncScrollDesc:"\u6EDA\u52A8\u6B63\u6587\u65F6\uFF0C\u9AD8\u4EAE\u5BF9\u5E94\u7684\u5927\u7EB2\u6761\u76EE",showUserMessagesDesc:"\u5728\u5927\u7EB2\u4E2D\u628A\u4F60\u7684\u63D0\u95EE\u4E5F\u4F5C\u4E3A\u8282\u70B9",tabVisibilityLabel:"Tab \u663E\u793A",tabAutoRenameLabel:"\u81EA\u52A8\u91CD\u547D\u540D\u6807\u7B7E\u9875",tabShowStatusLabel:"\u663E\u793A\u751F\u6210\u72B6\u6001",tabPlaySoundLabel:"\u64AD\u653E\u901A\u77E5\u58F0\u97F3",tabVolumeLabel:"\u901A\u77E5\u97F3\u91CF",tabPrivacyModeLabel:"\u9690\u79C1\u6A21\u5F0F",tabPrivacyTitleLabel:"\u9690\u79C1\u6A21\u5F0F\u6807\u9898",enableFormulaCopyLabel:"\u542F\u7528\u516C\u5F0F\u590D\u5236",enableTableCopyLabel:"\u542F\u7528\u8868\u683C\u590D\u5236",outlineEmpty:"\u6682\u65E0\u5927\u7EB2",outlineSearchResult:"\u6761\u7ED3\u679C",outlineExpandAll:"\u5C55\u5F00\u5168\u90E8",outlineCollapseAll:"\u6298\u53E0\u5168\u90E8",outlineShowUserQueriesTooltip:"\u663E\u793A\u7528\u6237\u63D0\u95EE",outlineHideUserQueriesTooltip:"\u9690\u85CF\u7528\u6237\u63D0\u95EE",outlineLocateCurrent:"\u5B9A\u4F4D\u5F53\u524D\u4F4D\u7F6E",outlineSearch:"\u641C\u7D22\u5927\u7EB2...",outlineOnlyUserQueries:"\u53EA\u663E\u793A\u7528\u6237\u63D0\u95EE",outlineScrollBottom:"\u6EDA\u52A8\u5230\u5E95\u90E8",outlineScrollTop:"\u6EDA\u52A8\u5230\u9876\u90E8",clear:"\u6E05\u9664",buttonScrollTop:"\u9876\u90E8",buttonAnchor:"\u951A\u70B9",buttonTheme:"\u4E3B\u9898",buttonManualAnchor:"\u624B\u52A8\u951A\u70B9",buttonScrollBottom:"\u5E95\u90E8",buttonBack:"\u8FD4\u56DE",moveUp:"\u4E0A\u79FB",moveDown:"\u4E0B\u79FB",buttonOrderUpdated:"\u5DF2\u66F4\u65B0\u6309\u94AE\u987A\u5E8F",enabled:"\u5DF2\u542F\u7528",disabled:"\u5DF2\u7981\u7528",settingsGroupData:"\u5907\u4EFD\u4E0E\u6062\u590D",backupExportButton:"\u5BFC\u51FA\u5907\u4EFD",backupExportDesc:"\u5C06\u63D0\u793A\u8BCD\u3001\u8BBE\u7F6E\u3001\u4E3B\u9898\u4E0E\u58C1\u7EB8\u3001\u4F1A\u8BDD\u6574\u7406\u6570\u636E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6",backupImportButton:"\u5BFC\u5165\u5907\u4EFD",backupImportDesc:"\u4ECE\u5907\u4EFD\u6587\u4EF6\u6062\u590D\uFF0C\u5C06\u8986\u76D6\u5F53\u524D\u7684\u540C\u9879\u6570\u636E",backupImportConfirm:`\u5BFC\u5165\u5C06\u8986\u76D6\u5F53\u524D\u7684\u63D0\u793A\u8BCD\u3001\u8BBE\u7F6E\u3001\u4E3B\u9898\u4E0E\u4F1A\u8BDD\u6574\u7406\u6570\u636E\uFF0C\u4E14\u65E0\u6CD5\u64A4\u9500\u3002
\u786E\u5B9A\u7EE7\u7EED\u5417\uFF1F`,backupExportSuccess:"\u5907\u4EFD\u5DF2\u5BFC\u51FA",backupImportSuccess:"\u5907\u4EFD\u5DF2\u5BFC\u5165\uFF0C\u5373\u5C06\u5237\u65B0\u9875\u9762",backupInvalidFile:"\u4E0D\u662F\u6709\u6548\u7684 ChatGPT Helper \u5907\u4EFD\u6587\u4EF6",backupImportFailed:"\u5BFC\u5165\u5931\u8D25\uFF0C\u5907\u4EFD\u6587\u4EF6\u53EF\u80FD\u6709\u8BEF",backupIncludeHint:"\u5305\u542B {prompts} \u6761\u63D0\u793A\u8BCD\u3001{conversations} \u4E2A\u4F1A\u8BDD\u3001{assets} \u5F20\u58C1\u7EB8",backupReadingHint:"\u6B63\u5728\u8BFB\u53D6\u5907\u4EFD\u6570\u636E\u2026",onboardingTitle:"\u719F\u6089\u4F60\u7684\u4FA7\u680F",onboardingSubtitle:"\u8DDF\u7740\u754C\u9762\u8D70\u4E00\u904D\uFF0C\u627E\u5230\u5E38\u7528\u7684\u51E0\u4E2A\u5165\u53E3\u3002\u968F\u65F6\u53EF\u4EE5\u8DF3\u8FC7\u3002",onboardingDuration:"\u5FEB\u901F\u4E0A\u624B \xB7 \u7EA6 1 \u5206\u949F",onboardingGuide:"\u5FEB\u901F\u4E0A\u624B",onboardingStart:"\u5F00\u59CB\u4E86\u89E3",onboardingSkip:"\u8DF3\u8FC7",onboardingPrevious:"\u4E0A\u4E00\u6B65",onboardingNext:"\u4E0B\u4E00\u6B65",onboardingFinish:"\u5F00\u59CB\u4F7F\u7528",tour_prompts_label:"\u63D0\u793A\u8BCD",tour_prompts_title:"\u5E38\u7528\u63D0\u793A\u8BCD\uFF0C\u5C31\u5728\u624B\u8FB9",tour_prompts_body:"\u70B9\u4E00\u6761\u63D0\u793A\u8BCD\u63D2\u5165\u8F93\u5165\u6846\u3002\u8F93\u5165 //\uFF0C\u4E5F\u80FD\u968F\u65F6\u6253\u5F00\u83DC\u5355\u3002",tour_outline_label:"\u5927\u7EB2",tour_outline_title:"\u957F\u5BF9\u8BDD\uFF0C\u76F4\u63A5\u8DF3\u5230\u91CD\u70B9",tour_outline_body:"\u70B9\u51FB\u6761\u76EE\u8DF3\u5230\u5BF9\u5E94\u5185\u5BB9\uFF0C\u518D\u7528\u201C\u8FD4\u56DE\u201D\u56DE\u5230\u539F\u6765\u7684\u9605\u8BFB\u4F4D\u7F6E\u3002",tour_outline_empty:"\u6709\u4E86\u5BF9\u8BDD\u5185\u5BB9\uFF0C\u8FD9\u91CC\u5C31\u4F1A\u751F\u6210\u5927\u7EB2\u3002\u6253\u5F00\u4E00\u6761\u5386\u53F2\u5BF9\u8BDD\u8BD5\u8BD5\u3002",tour_organize_label:"\u6574\u7406\u4E0E\u5BFC\u51FA",tour_organize_title:"\u627E\u5230\u65E7\u5BF9\u8BDD\uFF0C\u4FDD\u5B58\u597D\u5185\u5BB9",tour_organize_body:"\u5728\u4F1A\u8BDD\u9875\u641C\u7D22\u3001\u7F6E\u9876\u548C\u5206\u7EC4\uFF1B\u5728\u5BFC\u51FA\u9875\u4FDD\u5B58\u5F53\u524D\u5BF9\u8BDD\u3002",tour_panel_label:"\u4FA7\u680F",tour_panel_title:"\u9700\u8981\u65F6\u5C55\u5F00\uFF0C\u4E13\u6CE8\u65F6\u6536\u8D77",tour_panel_body:"\u62D6\u52A8\u5DE6\u8FB9\u7F18\u8C03\u6574\u5BBD\u5EA6\uFF0C\u7EE7\u7EED\u5411\u53F3\u62D6\u53EF\u6536\u8D77\u3002\u4E5F\u53EF\u4EE5\u7528\u5FEB\u6377\u952E\u5207\u6362\u3002",tour_appearance_label:"\u5916\u89C2",tour_appearance_title:"\u4E3B\u9898\u4E0E\u58C1\u7EB8",tour_appearance_body:"\u5207\u6362\u660E\u6697\u3001\u9009\u4E00\u5F20\u58C1\u7EB8\uFF0C\u518D\u8C03\u6574\u6BDB\u73BB\u7483\u5F3A\u5EA6\u3002\u4EE5\u540E\u53EF\u4EE5\u5728\u8BBE\u7F6E\u91CC\u91CD\u65B0\u67E5\u770B\u5F15\u5BFC\u3002",tour_focus_composer:"\u5B9A\u4F4D\u8F93\u5165\u6846",tour_open_conversations:"\u67E5\u770B\u4F1A\u8BDD",tour_open_export:"\u6253\u5F00\u5BFC\u51FA",tour_collapse_panel:"\u8BD5\u8BD5\u6536\u8D77",tour_expand_panel:"\u5C55\u5F00\u4FA7\u680F",tour_open_theme:"\u6253\u5F00\u4E3B\u9898\u8BBE\u7F6E",tour_target_missing:"\u5F53\u524D\u533A\u57DF\u672A\u5C55\u5F00\u6216\u5DF2\u9690\u85CF\u3002\u53EF\u4EE5\u7EE7\u7EED\u4E0B\u4E00\u6B65\u3002",replayOnboarding:"\u91CD\u770B\u65B0\u624B\u5F15\u5BFC",promptSortLabel:"\u6392\u5E8F",promptSortManual:"\u624B\u52A8",promptSortRecent:"\u6700\u8FD1\u4F7F\u7528",promptSortFrequent:"\u6700\u5E38\u7528",promptVariablesTitle:"\u586B\u5199\u53D8\u91CF",promptVariablesDesc:"\u8BE5\u63D0\u793A\u8BCD\u5305\u542B\u4EE5\u4E0B\u53D8\u91CF\uFF0C\u586B\u5199\u540E\u63D2\u5165\uFF1A",promptInsert:"\u63D2\u5165",promptQuickMenuEnabledLabel:"\u8F93\u5165\u6846 / \u5FEB\u901F\u5524\u8D77",promptQuickMenuEnabledDesc:"\u5728 ChatGPT \u8F93\u5165\u6846\u8F93\u5165 // \u5524\u8D77\u63D0\u793A\u8BCD\u5FEB\u901F\u9009\u62E9\u83DC\u5355\uFF08\u5355\u4E2A / \u7531 ChatGPT \u539F\u751F\u547D\u4EE4\u83DC\u5355\u4F7F\u7528\uFF09",quickMenuEmpty:"\u6CA1\u6709\u5339\u914D\u7684\u63D0\u793A\u8BCD",quickMenuHint:"\u2191\u2193 \u9009\u62E9\u3000Enter \u63D2\u5165\u3000Esc \u5173\u95ED",shortcutHintLabel:"\u9762\u677F\u5FEB\u6377\u952E",shortcutHintDesc:"Alt+Shift+H \u663E\u793A/\u9690\u85CF\u9762\u677F\uFF0C\u53EF\u5728 chrome://extensions/shortcuts \u4FEE\u6539",selectMessageTitle:"\u9009\u62E9\u6B64\u6D88\u606F",selectedMessagesCount:"\u5DF2\u9009 {count} \u6761",exportSelectedImage:"\u56FE\u7247",exportSelectedMarkdown:"Markdown",exportSelectedJson:"JSON",exportSelectedTxt:"TXT",copySelectedMessages:"\u590D\u5236",clearSelection:"\u6E05\u9664",selectedExported:"\u5DF2\u5BFC\u51FA\u6240\u9009\u6D88\u606F",selectedExportEmpty:"\u8BF7\u5148\u9009\u62E9\u8981\u5BFC\u51FA\u7684\u6D88\u606F",selectedCopied:"\u5DF2\u590D\u5236\u6240\u9009\u6D88\u606F",selectedNoContent:"\u6240\u9009\u6D88\u606F\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684\u6587\u672C\u5185\u5BB9",exportEngineLoading:"\u6B63\u5728\u52A0\u8F7D\u5BFC\u51FA\u5F15\u64CE\u2026",exportEngineInjectFailed:"\u5BFC\u51FA\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u540E\u91CD\u8BD5"},en:{panelTitle:"ChatGPT Helper",tabPrompts:"Prompts",tabOutline:"Outline",tabConversations:"Conversations",tabExport:"Export",tabSettings:"Settings",searchPlaceholder:"Search prompts...",addPrompt:"Add New Prompt",editPrompt:"Edit Prompt",noPrompts:"No prompts",promptEmptyHint:"Add reusable workflows so frequent tasks are one click away.",promptSearchEmptyHint:"Try another keyword, or create a prompt for this task.",optional:"optional",defaultPromptResearchTitle:"Deep Reading and Insight Extraction",defaultPromptResearchContent:`Act as a rigorous research assistant. Read the material carefully and respond with:
1. Core takeaways (3-5 bullets)
2. Key evidence and where it appears
3. Hidden assumptions or disputed points
4. Actionable recommendations
5. Questions that still need confirmation

Material:`,defaultPromptResearchCategory:"Research",defaultPromptPlanningTitle:"Task Breakdown and Execution Plan",defaultPromptPlanningContent:`Break the goal below into an executable plan. First clarify the objective, constraints, and success criteria, then provide:
1. Milestones
2. Concrete tasks
3. Priorities and dependencies
4. Key risks and mitigations
5. The next step I can start today

Goal:`,defaultPromptPlanningCategory:"Productivity",defaultPromptWritingTitle:"Writing Polish and Structure",defaultPromptWritingContent:`Act as a senior editor and improve the text below. Requirements:
1. Preserve the original meaning and facts
2. Improve structure, logic, and readability
3. Explain the most important changes
4. Provide one concise version and one more persuasive version

Draft:`,defaultPromptWritingCategory:"Writing",defaultPromptDebugTitle:"Bug Diagnosis and Fix Plan",defaultPromptDebugContent:`Act as a senior engineer and help diagnose this issue. Start with the most likely causes, then provide validation steps, a minimal fix, possible side effects, and tests that should be added.

Symptoms / error / relevant code:`,defaultPromptDebugCategory:"Development",defaultPromptDecisionTitle:"Option Comparison and Decision",defaultPromptDecisionContent:`Compare the options below and output a decision table covering goal fit, cost, risk, maintainability, and long-term impact. End with the recommended option, why it wins, and when another option would be better.

Context and options:`,defaultPromptDecisionCategory:"Decision",allCategory:"All",refresh:"Refresh",expand:"Expand sidebar",collapse:"Collapse sidebar",edit:"Edit",delete:"Delete",save:"Save",cancel:"Cancel",add:"Add",title:"Title",category:"Category",content:"Prompt Content",promptUpdated:"Prompt updated",promptAdded:"Prompt added",deleted:"Deleted",copied:"Copied to clipboard",refreshed:"Refreshed",inserted:"Prompt inserted",confirmDelete:"Delete this prompt?",fillTitleContent:"Please fill in title and content",noConversations:"No conversations",noSearchResults:"No matching results",inbox:"Inbox",untitledConversation:"Untitled conversation",promptFolderName:"Enter folder name:",moveToFolder:"Move to Folder",confirm:"Confirm",confirmDeleteConversation:'Delete "{title}"?',confirmDeleteConversations:"Delete {count} conversations?",exportedConversations:"Exported {count} conversations",openConversationFirst:"Open the conversation first: {title}",addTag:"Add Tag",tagPrompt:"Enter a tag name. Leave blank to remove tags:",tagUpdated:"Tag updated",exportInfoHeading:"Export Info",conversationTitleLabel:"Conversation Title",exportTimeLabel:"Export Time",sourceLabel:"Source",linkLabel:"Link",userRole:"User",historyLoading:"Loading history...",scrollContainerMissing:"Scroll container not found",historyLoadComplete:"History loaded",pleaseWait:"Please wait...",stop:"Stop",formulaCopied:"Formula copied",formulaSourceUnavailable:"Formula source unavailable; nothing was copied",copyFailed:"Copy failed",copyAsMarkdown:"Copy as Markdown",tableCopied:"Table copied",outlineNoContent:"No outline yet. Wait for the conversation to generate or refresh the page.",syncConversations:"Sync Conversations",newFolder:"New Folder",deleteFolder:"Delete folder",deleteFolderConfirm:`Delete folder "{name}"?
Conversations in this folder will be moved to Inbox.`,folderDeleted:"Folder deleted",batchMode:"Batch Mode",batchComplete:"Complete",selected:"Selected",items:"items",move:"Move",export:"Export",pinned:"Pinned",unpinned:"Unpinned",moved:"Moved",exported:"Exported",synced:"Synced",conversationSyncing:"Syncing conversations...",conversationSyncNoResults:"No history conversations loaded. Make sure you are signed in to ChatGPT, then try again.",conversationSyncFailed:"Conversation sync failed. Please try again later.",newSessions:"new sessions",updatedSessions:"sessions",exportFormat:`Select export format:
1. Markdown
2. JSON
3. TXT`,exportSuccess:"Export successful",exportFailed:"Export failed",noContent:"No conversation content found",openFirst:"Please open the conversation first",settingsTitle:"Settings",readingHistory:"Reading History",settingsGroupGeneral:"General",settingsGroupTabs:"Tabs",settingsGroupReadingNavigation:"Reading & Navigation",settingsGroupContentProcessing:"Content Processing",settingsGroupBrowserTab:"Browser Tab",settingsGroupQuickButtons:"Quick Buttons",settingsShowTab:'Show "{name}"',tabOrderUpdated:"Tab order updated",language:"Interface Language",autoDetect:"Auto Detect",chinese:"\u7B80\u4F53\u4E2D\u6587",english:"English",themeToggle:"Switch Theme",newChatInTab:"Open Chat in New Tab",noAnchor:"No anchor",noAnchorAutoHint:"No anchor yet. Click Top or Bottom to create one automatically.",setAnchor:"Set Anchor",clearAnchor:"Clear Anchor",returnAnchor:"Return to Anchor",returnPreviousPosition:"Return to Previous Position",anchorSet:"Anchor set",anchorSetFailed:"Failed to set anchor",anchorCleared:"Anchor cleared",returnedAnchor:"Returned to anchor",returnedPreviousPosition:"Returned to previous position",returnAnchorFailed:"Failed to return to anchor",scrolledTop:"Scrolled to top",scrolledBottom:"Scrolled to bottom",exportModuleLoadFailed:"Export module failed to load. Check whether the ChatGPT Helper export script is running.",exportModuleMissing:"ChatGPT Helper export module was not detected. Make sure the extension loaded correctly.",operationFailed:"Operation failed",openThemeSettings:"Open Theme Settings",themeDialogTitle:"Theme",themeAppearance:"Appearance",themeAppearanceSystem:"System",themeAppearanceLight:"Light",themeAppearanceDark:"Dark",themeColorPresets:"Colors",themePresetOriginal:"Original",themeWallpaper:"Wallpaper",themeEnableWallpaper:"Enable Wallpaper",themeDropImage:"Drop image here",themeFileTypes:"PNG/JPG/WebP up to 5MB",themeSelectFile:"Select File",themeRemoveImage:"Remove Background",themeBlur:"Blur",themeMessageGlass:"Message Glass Effect",themeMessageGlassIntensity:"Message Glass Intensity",themePanelGlassIntensity:"Side Panel Glass Intensity",themeSidebarEnhance:"Sidebar Text Enhance",themeSidebarEnhanceIntensity:"Enhance Intensity",themeLivePreview:"Live Preview",themeUploadSuccess:"Background image updated",themeBackgroundRemoved:"Background image removed",themeNoBackground:"No background image",themeInvalidType:"Only PNG/JPG/WebP is supported",themeFileTooLarge:"Image size must be 5MB or less",themeImageLoadFailed:"Image loading failed, please try again",themeSwitchedLight:"Switched to light mode",themeSwitchedDark:"Switched to dark mode",themeSwitchFailed:"Theme switch failed",aboutButton:"About",aboutTopEntryTitle:"About",aboutDialogTitle:"About ChatGPT Helper",aboutTagline:"A focused productivity layer designed for heavy ChatGPT users",aboutMotivationTitle:"Motivation",aboutMotivationContent:"I built ChatGPT Helper as a TJU computer science student and long-time ChatGPT user. It gathers the prompt, navigation, organization, export, and reading-position tools I kept needing in daily work, with the goal of reducing switching costs and keeping attention on the conversation.",aboutFeedbackTitle:"Feedback",aboutFeatureRequest:"Feature Request",aboutBugSupport:"Submit Feedback",aboutOpenSourceTitle:"Project Info",aboutSupportTitle:"Share the Project",aboutSupportContent:"If ChatGPT Helper fits your workflow, share the repository with someone who may need it, or leave feedback on GitHub.",aboutShare:"Share with Friends",aboutAuthorTitle:"About the Author",aboutAuthorBio:`TJU | Computer Science student
AI tool builder
Long-time ChatGPT user`,aboutRepoButton:"GitHub Repository",aboutRepoLabel:"Repository",aboutAuthorGithub:"Author GitHub",aboutClose:"Close",aboutCopyRepoSuccess:"Share link copied",aboutCopyRepoFailed:"Copy failed, please copy the repository link manually",aboutVersionTitle:"Version Info",aboutVersionLabel:"Version",aboutAuthorLabel:"Author",aboutLicenseLabel:"License",aboutPoweredBy:"Built for focused ChatGPT workflows",aboutIntroTitle:"Overview",aboutIntro:"ChatGPT Helper adds a focused side panel for prompt management, outlines, conversation organization, exports, and reading-position utilities while keeping the native ChatGPT flow familiar.",aboutFeaturesTitle:"Core Features",aboutFeaturePrompts:"Prompt management and quick insertion",aboutFeatureOutline:"Automatic outline generation and navigation",aboutFeatureConversations:"Conversation organization and batch actions",aboutFeatureExport:"Multi-format export and reading-position tools",aboutSitesLabel:"Sites",aboutSupportSites:"Works on chatgpt.com, chat.openai.com, and new.oaifree.com",aboutPrivacyTitle:"Privacy & Permissions",aboutPrivacy:"All settings and data processing stay in your browser. The extension uses storage for local preferences and does not upload conversation content.",searchConversations:"Search conversations...",selectConversationsFirst:"Please select conversations first",defaultPanelOpenLabel:"Open Panel by Default",enablePromptsLabel:"Prompts",enableOutlineLabel:"Outline",showUserMessagesLabel:"Show User Messages",enableConversationsLabel:"Conversation Manager",preventAutoScrollLabel:"Prevent Auto Scroll",preventAutoScrollDesc:"Stop the page from jumping to the newest reply while you read earlier content",enableReadingHistoryLabel:"Reading History",enableReadingHistoryDesc:"Remember the last reading position in each conversation",autoRestoreLabel:"Auto Restore Position",autoRestoreDesc:"Open conversations at the last remembered reading position",outlineSyncScrollLabel:"Outline Follows Reading Position",outlineSyncScrollDesc:"Highlight the matching outline item while you scroll the conversation",showUserMessagesDesc:"Include your questions as outline nodes",tabVisibilityLabel:"Tab Visibility",tabAutoRenameLabel:"Auto Rename Tab",tabShowStatusLabel:"Show Generation Status",tabPlaySoundLabel:"Play Notification Sound",tabVolumeLabel:"Notification Volume",tabPrivacyModeLabel:"Privacy Mode",tabPrivacyTitleLabel:"Privacy Mode Title",enableFormulaCopyLabel:"Formula Copy",enableTableCopyLabel:"Table Copy",languageChanged:"Language changed",outlineEmpty:"No outline",outlineSearchResult:"results",outlineExpandAll:"Expand All",outlineCollapseAll:"Collapse All",outlineShowUserQueriesTooltip:"Show user queries",outlineHideUserQueriesTooltip:"Hide user queries",outlineLocateCurrent:"Locate Current Position",outlineSearch:"Search outline...",outlineOnlyUserQueries:"Only show user queries",outlineScrollBottom:"Scroll to bottom",outlineScrollTop:"Scroll to top",clear:"Clear",buttonScrollTop:"Top",buttonAnchor:"Anchor",buttonTheme:"Theme",buttonManualAnchor:"Manual Anchor",buttonScrollBottom:"Bottom",buttonBack:"Back",moveUp:"Move Up",moveDown:"Move Down",buttonOrderUpdated:"Button order updated",enabled:"Enabled",disabled:"Disabled",settingsGroupData:"Backup & Restore",backupExportButton:"Export Backup",backupExportDesc:"Export prompts, settings, theme, wallpapers and conversation groups to a JSON file",backupImportButton:"Import Backup",backupImportDesc:"Restore from a backup file; matching local data will be replaced",backupImportConfirm:`Importing will replace your current prompts, settings, theme and conversation groups. This cannot be undone.
Continue?`,backupExportSuccess:"Backup exported",backupImportSuccess:"Backup imported. Reloading\u2026",backupInvalidFile:"Not a valid ChatGPT Helper backup file",backupImportFailed:"Import failed. The backup file may be corrupted",backupIncludeHint:"{prompts} prompts, {conversations} conversations, {assets} wallpapers",backupReadingHint:"Reading backup data\u2026",onboardingTitle:"Meet your sidebar",onboardingSubtitle:"Find the tools you will use most, right where they live. You can skip at any time.",onboardingDuration:"Quick tour \xB7 About a minute",onboardingGuide:"Quick tour",onboardingStart:"Take the tour",onboardingSkip:"Skip",onboardingPrevious:"Back",onboardingNext:"Next",onboardingFinish:"Get started",tour_prompts_label:"Prompts",tour_prompts_title:"Keep useful prompts close",tour_prompts_body:"Choose a prompt to insert it into the composer. Type // to open the quick menu.",tour_outline_label:"Outline",tour_outline_title:"Jump to the part you need",tour_outline_body:"Select an entry to jump to its content. Use Return to get back to your reading position.",tour_outline_empty:"The outline appears when a conversation has content. Try opening a previous chat.",tour_organize_label:"Organize & export",tour_organize_title:"Find old chats. Keep the useful parts.",tour_organize_body:"Search, pin and group chats in Conversations. Save the current chat from Export.",tour_panel_label:"Sidebar",tour_panel_title:"More room when you need it",tour_panel_body:"Drag the left edge to resize. Keep dragging right to collapse, or use the shortcut.",tour_appearance_label:"Appearance",tour_appearance_title:"Themes and wallpaper",tour_appearance_body:"Choose light or dark, add a wallpaper and adjust the glass effect. Replay this tour from Settings.",tour_focus_composer:"Focus composer",tour_open_conversations:"View conversations",tour_open_export:"Open export",tour_collapse_panel:"Try collapsing",tour_expand_panel:"Expand sidebar",tour_open_theme:"Open theme settings",tour_target_missing:"This area is collapsed or hidden. You can continue to the next step.",replayOnboarding:"Replay Onboarding",promptSortLabel:"Sort",promptSortManual:"Manual",promptSortRecent:"Recent",promptSortFrequent:"Frequent",promptVariablesTitle:"Fill in Variables",promptVariablesDesc:"This prompt contains variables. Fill them in before inserting:",promptInsert:"Insert",promptQuickMenuEnabledLabel:"Slash Quick Menu",promptQuickMenuEnabledDesc:"Typing // in the ChatGPT input opens a quick prompt picker (single / belongs to ChatGPT native commands)",quickMenuEmpty:"No matching prompts",quickMenuHint:"\u2191\u2193 navigate \xB7 Enter insert \xB7 Esc close",shortcutHintLabel:"Panel Shortcut",shortcutHintDesc:"Alt+Shift+H toggles the panel. Change it at chrome://extensions/shortcuts",selectMessageTitle:"Select this message",selectedMessagesCount:"{count} selected",exportSelectedImage:"Image",exportSelectedMarkdown:"Markdown",exportSelectedJson:"JSON",exportSelectedTxt:"TXT",copySelectedMessages:"Copy",clearSelection:"Clear",selectedExported:"Selected messages exported",selectedExportEmpty:"Select messages first",selectedCopied:"Selected messages copied",selectedNoContent:"The selected messages have no text content to export",exportEngineLoading:"Loading export engine\u2026",exportEngineInjectFailed:"Failed to load the export engine. Refresh the page and try again"}};function ie(){const n=window.GM_getValue(F.LANGUAGE,"auto");return n!=="auto"&&Object.prototype.hasOwnProperty.call(oe,n)?n:(navigator.language||navigator.userLanguage||"en").startsWith("zh")?"zh-CN":"en"}let ye=ie();function W(n){return oe[ye]?.[n]||oe.en?.[n]||n}const Le={prompts:{id:"prompts",label:"\u63D0\u793A\u8BCD",iconName:"edit"},outline:{id:"outline",label:"\u5927\u7EB2",iconName:"list"},conversations:{id:"conversations",label:"\u4F1A\u8BDD",iconName:"message"},export:{id:"export",label:"\u5BFC\u51FA",iconName:"export"},settings:{id:"settings",label:"\u8BBE\u7F6E",iconName:"settings"}},ne={scrollTop:{iconName:"arrowUp",labelKey:"buttonScrollTop",canToggle:!1,isPanelOnly:!1},panel:{icon:"",iconType:"helper-logo",labelKey:null,label:"ChatGPT Helper",canToggle:!1,isPanelOnly:!0},anchor:{iconName:"anchor",labelKey:"buttonAnchor",canToggle:!0,isPanelOnly:!0},theme:{iconName:"sun",labelKey:"buttonTheme",canToggle:!0,isPanelOnly:!0},manualAnchor:{iconName:"pin",labelKey:"buttonManualAnchor",canToggle:!0,isPanelOnly:!1,isGroup:!0},scrollBottom:{iconName:"arrowDown",labelKey:"buttonScrollBottom",canToggle:!1,isPanelOnly:!1}},se=[{id:"scrollTop",enabled:!0},{id:"panel",enabled:!0},{id:"anchor",enabled:!0},{id:"theme",enabled:!0},{id:"manualAnchor",enabled:!0},{id:"scrollBottom",enabled:!0}],Pe=[{key:"original",labelKey:"themePresetOriginal",primary:"#64748b",secondary:"#94a3b8",accent:"#475569",light:"#f8fafc",isOriginal:!0},{key:"blue",primary:"#4285f4",secondary:"#60a5fa",accent:"#2563eb",light:"#eaf2ff"},{key:"gray",primary:"#52525b",secondary:"#71717a",accent:"#3f3f46",light:"#f3f4f6"},{key:"red",primary:"#dc2626",secondary:"#f87171",accent:"#b91c1c",light:"#ffecec"},{key:"pink",primary:"#db2777",secondary:"#f472b6",accent:"#be185d",light:"#ffe6f3"},{key:"purple",primary:"#9333ea",secondary:"#c084fc",accent:"#7e22ce",light:"#f2e9ff"},{key:"cyan",primary:"#0891b2",secondary:"#22d3ee",accent:"#0e7490",light:"#e2fbff"},{key:"teal",primary:"#0d9488",secondary:"#2dd4bf",accent:"#0f766e",light:"#e2fdf8"},{key:"green",primary:"#16a34a",secondary:"#4ade80",accent:"#15803d",light:"#e8ffe8"},{key:"yellow",primary:"#ca8a04",secondary:"#facc15",accent:"#a16207",light:"#fff8d8"},{key:"orange",primary:"#ea580c",secondary:"#fb923c",accent:"#c2410c",light:"#fff0e4"}],we=Pe.reduce((n,e)=>(n[e.key]=e,n),{}),zt=["--gh-theme-primary","--gh-theme-secondary","--gh-theme-accent","--gh-theme-accent-dark","--gh-theme-light","--gh-primary","--gh-primary-hover","--gh-tag-active-bg","--gh-gradient","--gh-header-bg","--gh-theme-surface-light-base","--gh-theme-surface-light-accent","--gh-theme-surface-dark-base","--gh-theme-surface-dark-accent","--gh-page-sidebar-bg-light","--gh-page-chat-bg-light","--gh-page-composer-bg-light","--gh-page-sidebar-bg-dark","--gh-page-chat-bg-dark","--gh-page-composer-bg-dark","--gh-page-accent-soft","--gh-page-accent-soft-dark","--gh-page-accent-strong","--gh-page-link","--gh-page-selection"],Xe="chatgpt_helper_theme",Je=1,le="assets",Ze=5*1024*1024,et=["image/png","image/jpeg","image/webp"],Dt="",tt="https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper/issues/new",rt="https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper",nt="https://github.com/zhiwuyazhe-fjr",at="ChatGPT Helper",he="2.7.0",ot="zhiwuyazhe_fjr",it="MIT",Ne=["data-gh-theme-host-sidebar-shell","data-gh-theme-host-sidebar","data-gh-theme-host-main","data-gh-theme-host-chat-list","data-gh-theme-host-composer","data-gh-theme-host-composer-surface"],X={appearanceMode:"system",presetKey:"original",backgroundImageEnabled:!1,backgroundBlurPx:5,messageGlassEnabled:!1,messageGlassIntensity:60,panelGlassIntensity:45,sidebarTextEnhanceEnabled:!0,sidebarTextEnhanceIntensity:20,backgroundAssetId:null,updatedAt:""},ke={panelWidth:320,defaultPanelState:!0,prompts:{enabled:!0},promptSortMode:"manual",promptQuickMenuEnabled:!0,outline:{enabled:!0,showUserQueries:!0,autoUpdate:!0,syncScroll:!0,updateInterval:2,maxLevel:6},conversations:{enabled:!0},tabOrder:["prompts","outline","conversations","export"],collapsedButtonsOrder:se,themeMode:null,themeConfig:{...X},anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,preventAutoScroll:!1,readingHistory:{persistence:!0,autoRestore:!1},formulaCopy:{enabled:!0},tableCopy:{enabled:!0},tabSettings:{enabled:!0,showStatus:!0,notificationSound:!1,notificationVolume:.5,titleFormat:"{status}{title}",privacyMode:!1,privacyTitle:"ChatGPT"}};function pe(){return[{id:"default_3",title:W("defaultPromptResearchTitle"),content:W("defaultPromptResearchContent"),category:W("defaultPromptResearchCategory")},{id:"default_4",title:W("defaultPromptPlanningTitle"),content:W("defaultPromptPlanningContent"),category:W("defaultPromptPlanningCategory")},{id:"default_5",title:W("defaultPromptWritingTitle"),content:W("defaultPromptWritingContent"),category:W("defaultPromptWritingCategory")},{id:"default_6",title:W("defaultPromptDebugTitle"),content:W("defaultPromptDebugContent"),category:W("defaultPromptDebugCategory")},{id:"default_7",title:W("defaultPromptDecisionTitle"),content:W("defaultPromptDecisionContent"),category:W("defaultPromptDecisionCategory")}]}const Ht=pe(),ce=220,Ce=640,qt=new Set(["id","name","type","value","title","placeholder","checked","disabled","readOnly","min","max","step","alt","draggable","download","accept","htmlFor","tabIndex","spellcheck","indeterminate","selected","maxLength","rows","cols","wrap","target","rel","dir","lang","inputMode"]);function Gt(n,e){if(typeof e!="string"||!e)return!0;const t=e.trim().toLowerCase();return!(t.startsWith("javascript:")||t.startsWith("vbscript:")||t.startsWith("data:text/html")||(n==="src"||n==="srcset")&&t.startsWith("data:")&&!t.startsWith("data:image/"))}function l(n,e={},t=""){const r=document.createElement(n);return typeof e=="string"&&(t=e,e={}),Object.entries(e).forEach(([a,o])=>{a==="className"?r.className=o:a==="style"&&typeof o=="object"?Object.assign(r.style,o):a==="style"&&typeof o=="string"?/url\(/i.test(o)||(r.style.cssText=o):a.startsWith("data-")||a.startsWith("aria-")||a==="role"?r.setAttribute(a,o):/^on/i.test(a)||a==="innerHTML"||a==="outerHTML"||a==="srcdoc"||a==="formAction"?console.warn("[ChatGPT Helper] createElement \u62D2\u7EDD\u5371\u9669\u5C5E\u6027:",a):a==="href"||a==="src"?Gt(a,o)?r.setAttribute(a,o):console.warn("[ChatGPT Helper] createElement \u62D2\u7EDD\u4E0D\u5B89\u5168 URL \u5C5E\u6027:",a):qt.has(a)?r[a]=o:r.setAttribute(a,o)}),t&&(r.textContent=t),r}function ae(){return typeof browser<"u"&&browser.runtime?browser.runtime:typeof chrome<"u"&&chrome.runtime?chrome.runtime:null}function st(n){const e=ae();try{return e&&typeof e.getURL=="function"?e.getURL(n):n}catch{return n}}function lt(){const n=ae(),e={name:at,version:he,author:ot,license:it};try{const t=n&&typeof n.getManifest=="function"?n.getManifest():null;return t?{...e,...t}:e}catch{return e}}function de(n){if(!n)return!1;try{return window.open(n,"_blank","noopener,noreferrer"),!0}catch{try{return window.open(n,"_blank"),!0}catch{return!1}}}const Ft=new Set(["chatgpt.com","chat.openai.com","new.oaifree.com"]);function Te(n){if(typeof n!="string")return null;const e=n.trim();if(!e)return null;try{const t=new URL(e,window.location.origin);return t.protocol!=="https:"&&t.protocol!=="http:"||!Ft.has(t.hostname.toLowerCase())?null:t.href}catch{return null}}async function Ie(n){if(!n)return!1;try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(n),!0}catch{}try{const e=l("textarea",{value:n});e.setAttribute("readonly","readonly"),e.style.position="fixed",e.style.opacity="0",e.style.pointerEvents="none",e.style.left="-9999px",e.style.top="0",document.body.appendChild(e),e.focus(),e.select(),e.setSelectionRange(0,e.value.length);const t=document.execCommand("copy");return e.remove(),!!t}catch{return!1}}function $t(){const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 48 48"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true"),n.style.width="100%",n.style.height="100%",n.style.display="block";const e=document.createElementNS("http://www.w3.org/2000/svg","circle");e.setAttribute("cx","24"),e.setAttribute("cy","24"),e.setAttribute("r","21"),e.setAttribute("fill","#ffffff"),e.setAttribute("stroke","#111827"),e.setAttribute("stroke-width","3"),n.appendChild(e);const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","M18.5 15.5 24 12l5.5 3.5v6.3L35 25.1v6.2L24 38l-11-6.7v-6.2l5.5-3.3v-6.3Z M18.5 21.8 24 25l5.5-3.2 M18.5 28.2 24 31.5l5.5-3.3"),t.setAttribute("stroke","#111827"),t.setAttribute("stroke-width","3"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),n.appendChild(t);const r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d","M35.5 8v12"),r.setAttribute("stroke","#facc15"),r.setAttribute("stroke-width","4.5"),r.setAttribute("stroke-linecap","round"),n.appendChild(r);const a=document.createElementNS("http://www.w3.org/2000/svg","path");return a.setAttribute("d","M29.5 14h12"),a.setAttribute("stroke","#facc15"),a.setAttribute("stroke-width","4.5"),a.setAttribute("stroke-linecap","round"),n.appendChild(a),n}function ge(n={}){const{size:e=18,className:t="",alt:r="ChatGPT Helper",title:a=""}=n,o=l("span",{className:t,title:a,role:"img","aria-label":r});o.style.width=`${e}px`,o.style.height=`${e}px`,o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.flexShrink="0",o.style.lineHeight="0",o.style.position="relative",o.style.overflow="hidden";const i=$t();i.classList.add("chatgpt-helper-logo-fallback-svg");const s=l("img",{className:"chatgpt-helper-logo-svg",alt:"",draggable:!1,"aria-hidden":"true"});return s.addEventListener("load",()=>{s.dataset.loaded="true"}),s.addEventListener("error",()=>{s.style.display="none",i.dataset.active="true"}),s.src=st("icons/logo.svg"),o.appendChild(i),o.appendChild(s),o}const _e={edit:[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}]],list:[["path",{d:"M8 6h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 18h13"}],["path",{d:"M3 6h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 18h.01"}]],message:[["path",{d:"M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"}]],info:[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]],user:[["path",{d:"M19 21a7 7 0 0 0-14 0"}],["circle",{cx:"12",cy:"8",r:"4"}]],shield:[["path",{d:"M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"}],["path",{d:"m9 12 2 2 4-4"}]],github:[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.5 10.5 0 0 0-6 0C8 2 7 2 7 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 6 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4"}],["path",{d:"M9 18c-4.5 2-5-2-7-2"}]],external:[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],share:[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["path",{d:"m8.6 13.5 6.8 4"}],["path",{d:"m15.4 6.5-6.8 4"}]],export:[["path",{d:"M12 3v12"}],["path",{d:"m7 8 5-5 5 5"}],["path",{d:"M5 21h14"}],["path",{d:"M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4"}]],image:[["rect",{x:"3",y:"5",width:"18",height:"14",rx:"2"}],["circle",{cx:"8.5",cy:"10.5",r:"1.5"}],["path",{d:"m21 15-5-5L5 21"}]],settings:[["path",{d:"M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"}],["path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.36.32.7.6 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.52 1Z"}]],arrowUp:[["path",{d:"m18 15-6-6-6 6"}],["path",{d:"M12 9v12"}],["path",{d:"M5 3h14"}]],arrowDown:[["path",{d:"m6 9 6 6 6-6"}],["path",{d:"M12 15V3"}],["path",{d:"M5 21h14"}]],anchor:[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M12 8v13"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3"}],["path",{d:"m19 12-2 2"}],["path",{d:"m5 12 2 2"}]],sun:[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]],moon:[["path",{d:"M20.98 15.57A9 9 0 1 1 8.43 3.02 7 7 0 0 0 20.98 15.57Z"}]],plus:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],search:[["circle",{cx:"11",cy:"11",r:"7"}],["path",{d:"m21 21-4.3-4.3"}]],refresh:[["path",{d:"M21 12a9 9 0 0 1-15.2 6.5"}],["path",{d:"M3 12A9 9 0 0 1 18.2 5.5"}],["path",{d:"M18 2v4h-4"}],["path",{d:"M6 22v-4h4"}]],collapse:[["path",{d:"m15 18-6-6 6-6"}]],expand:[["path",{d:"m9 18 6-6-6-6"}]],panelCollapse:[["rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"2.5"}],["path",{d:"M14.5 4.5v15"}],["path",{d:"m8.5 9.5 2.5 2.5-2.5 2.5"}]],panelExpand:[["rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"2.5"}],["path",{d:"M14.5 4.5v15"}],["path",{d:"m11 9.5-2.5 2.5 2.5 2.5"}]],pin:[["path",{d:"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"}],["circle",{cx:"12",cy:"10",r:"3"}]],back:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10a6 6 0 0 1 0 12h-2"}]],close:[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],check:[["path",{d:"m20 6-11 11-5-5"}]],tag:[["path",{d:"M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .59 1.41l7.4 7.4a2 2 0 0 0 2.82 0l8.6-8.6a2 2 0 0 0 0-2.82l-7.4-7.4A2 2 0 0 0 12.6 2Z"}],["path",{d:"M7 7h.01"}]],folder:[["path",{d:"M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"}]],trash:[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}],["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}]]};function _(n,e={}){const t=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=e.size||16;return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width",e.strokeWidth||"2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true"),t.classList.add("chatgpt-helper-svg-icon"),e.className&&e.className.split(/\s+/).filter(Boolean).forEach(o=>t.classList.add(o)),t.style.width=`${r}px`,t.style.height=`${r}px`,t.style.flexShrink="0",(_e[n]||_e.list).forEach(([o,i])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",o);Object.entries(i).forEach(([h,p])=>s.setAttribute(h,p)),t.appendChild(s)}),t}function J(n,e,t={}){n&&n.replaceChildren(_(e,t))}function Be(n,e={}){return n&&n.iconType==="helper-logo"?ge({size:e.size||18,className:e.className||"chatgpt-helper-icon-logo",title:e.title||n.label||"ChatGPT Helper"}):_(n&&n.iconName?n.iconName:"list",e)}function K(n){for(;n.firstChild;)n.firstChild.remove()}function $(n,e,t){const r=Number(n);return Number.isFinite(r)?Math.min(t,Math.max(e,r)):e}function ht(n,e="#4285f4"){if(typeof n!="string")return e;const t=n.trim();return/^#[\da-fA-F]{6}$/.test(t)?t:/^#[\da-fA-F]{3}$/.test(t)?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:e}function Se(n,e="#4285f4"){const t=ht(n,e).slice(1);return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function y(n,e,t=.5){const r=typeof n=="string"?Se(n):n,a=typeof e=="string"?Se(e):e,o=$(t,0,1);return{r:Math.round(r.r+(a.r-r.r)*o),g:Math.round(r.g+(a.g-r.g)*o),b:Math.round(r.b+(a.b-r.b)*o)}}function k(n,e=1){const t=typeof n=="string"?Se(n):n;return`rgba(${t.r}, ${t.g}, ${t.b}, ${$(e,0,1).toFixed(3)})`}function Y(n,e){return`linear-gradient(${n}, ${e.join(", ")})`}function pt(){return window.crypto&&typeof window.crypto.randomUUID=="function"?window.crypto.randomUUID():`theme-bg-${Date.now()}-${Math.random().toString(36).slice(2,10)}`}function te(n){return we[n]||we[X.presetKey]}function ue(n,e,t={}){const r=e&&typeof e=="object"?e:te(X.presetKey),a=!!t.isDark,o=!!t.canRenderBackground,i=o?Ut(r,t):{},s=r.primary||"#64748b",h=r.secondary||"#94a3b8",p=r.accent||s,d=r.light||"#f8fafc",c=o?"rgba(32, 33, 35, 0.74)":"#202123",g=o?"rgba(23, 23, 23, 0.66)":"#171717",m=o?`color-mix(in srgb, #ffffff, ${d} 68%)`:"#f9f9f9",x=o?`color-mix(in srgb, #f4f5f2, ${s} 12%)`:"#f9f9f9",b=a?c:m,L=a?g:x,B=a?"rgba(236, 236, 241, 0.96)":"rgba(18, 23, 20, 0.94)",S=a?"rgba(197, 197, 210, 0.74)":"rgba(85, 97, 89, 0.78)",v=a?o?"rgba(255, 255, 255, 0.15)":"rgba(255, 255, 255, 0.12)":o?`color-mix(in srgb, ${s}, rgba(12,18,16,0.14) 44%)`:"rgba(0, 0, 0, 0.10)",I=a?"0 1px 0 rgba(255, 255, 255, 0.035)":o?"0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 22px rgba(18, 23, 20, 0.07)":"0 1px 0 rgba(0, 0, 0, 0.025)",D=a?o?"0 8px 20px rgba(0, 0, 0, 0.20)":"0 0 0 0 rgba(0, 0, 0, 0)":o?`0 12px 30px color-mix(in srgb, rgba(18,23,20,0.12), ${s} 18%)`:"0 0 0 0 rgba(0, 0, 0, 0)";return{...n,"--gh-theme-primary":s,"--gh-theme-secondary":h,"--gh-theme-accent":p,"--gh-theme-accent-dark":p,"--gh-theme-light":d,"--gh-primary":s,"--gh-primary-hover":p,"--gh-tag-active-bg":s,"--gh-gradient":`linear-gradient(135deg, ${s} 0%, ${h} 100%)`,"--gh-header-bg":`linear-gradient(135deg, ${s} 0%, ${h} 100%)`,"--gh-text":n["--gh-text"]||B,"--gh-text-secondary":n["--gh-text-secondary"]||S,"--gh-panel-surface":`linear-gradient(180deg, ${b} 0%, ${L} 100%)`,"--gh-panel-subtle":a?o?"rgba(255, 255, 255, 0.045)":"color-mix(in srgb, #202123, #ffffff 2%)":o?`color-mix(in srgb, ${b}, ${s} 4%)`:"#f3f3f3","--gh-panel-card":n["--gh-panel-card-bg"]||(a?o?"rgba(255, 255, 255, 0.060)":"color-mix(in srgb, #202123, #ffffff 5%)":o?`color-mix(in srgb, ${b}, #ffffff 52%)`:"#ffffff"),"--gh-panel-card-hover":a?o?"rgba(255, 255, 255, 0.090)":"color-mix(in srgb, #202123, #ffffff 9%)":o?`color-mix(in srgb, ${b}, ${s} 9%)`:"#ececec","--gh-panel-line":v,"--gh-panel-muted-line":`color-mix(in srgb, ${v}, transparent 42%)`,"--gh-panel-elevated-shadow":D,"--gh-panel-card-shadow":I,"--gh-header-quiet-bg":a?"var(--gh-panel-surface)":o?`linear-gradient(180deg, color-mix(in srgb, ${b}, ${s} 8%) 0%, ${b} 100%)`:"var(--gh-panel-surface)","--gh-focus-ring":`color-mix(in srgb, ${s}, transparent ${a?56:68}%)`,"--gh-control-bg":a?o?"rgba(255, 255, 255, 0.055)":"color-mix(in srgb, #202123, #ffffff 5%)":o?`color-mix(in srgb, ${b}, #ffffff 48%)`:"#ffffff","--gh-control-bg-hover":a?o?"rgba(255, 255, 255, 0.090)":"color-mix(in srgb, #202123, #ffffff 9%)":o?`color-mix(in srgb, ${b}, ${s} 8%)`:"#ececec","--gh-control-border":`color-mix(in srgb, ${v}, transparent 8%)`,"--gh-control-radius":"8px","--gh-card-radius":"8px","--gh-danger":"#ef4444","--gh-success":"#10b981","--gh-warning":"#f59e0b","--gh-folder-bg-default":`color-mix(in srgb, ${s}, transparent ${a?78:86}%)`,"--gh-folder-bg-expanded":`color-mix(in srgb, ${s}, transparent ${a?68:78}%)`,"--gh-border-active":s,"--gh-checkbox-bg":p,...i}}function Ut(n,e){const t=$(e.panelIntensity,0,100)/100,r=$(e.messageIntensity,0,100)/100,a=n.isOriginal?0:.045,o=y("#ffffff",n.primary,a),i=y("#202123",n.primary,a),s=e.isDark?i:o,h=.12+t*.62,p=k(s,h),d=k(s,.06+t*.14),c=k(s,.12+t*.18);return{"--gh-right-overlay":p,"--gh-page-sidebar-bg-light":k(o,h),"--gh-page-sidebar-bg-dark":k(i,h),"--gh-panel-surface":"transparent","--gh-header-quiet-bg":"transparent","--gh-panel-subtle":k(s,.04+t*.06),"--gh-panel-card-bg":d,"--gh-panel-card":d,"--gh-panel-card-hover":c,"--gh-control-bg":c,"--gh-input-bg":c,"--gh-control-bg-hover":k(s,.18+t*.18),"--gh-panel-card-shadow":"none","--gh-panel-elevated-shadow":"none","--gh-sidebar-button-bg":c,"--gh-msg-user-bg":k(s,.1+r*.48),"--gh-msg-assistant-bg":k(s,.06+r*.5),"--gh-page-composer-bg-light":k(o,.55+t*.3),"--gh-page-composer-bg-dark":k(i,.55+t*.3)}}function Re(n,e={}){const t=n&&typeof n=="object"?n:te(X.presetKey),r=!!e.isDark,a=!!(t&&t.isOriginal),o=!!e.canRenderBackground,i=$(e.panelIntensity,0,100)/100,s=$(e.messageIntensity,0,100)/100,h=i,p=`${o?Math.round(i*40):0}px`,d=`${o?Math.round(s*32):0}px`,c=`${o?Math.round(h*24):0}px`;if(a)return ue(r?{"--gh-bg":o?"rgba(32, 33, 35, 0.180)":"#202123","--gh-bg-secondary":o?"rgba(23, 23, 23, 0.140)":"#171717","--gh-text":"#ececf1","--gh-text-secondary":"rgba(236, 236, 241, 0.72)","--gh-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-hover":o?"rgba(255, 255, 255, 0.080)":"#2a2b2d","--gh-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.180)":"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-input-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-active-bg":o?"rgba(255, 255, 255, 0.100)":"#343541","--gh-right-overlay":o?"linear-gradient(180deg, rgba(32, 33, 35, 0.700) 0%, rgba(23, 23, 23, 0.600) 100%)":"linear-gradient(180deg, #202123 0%, #171717 100%)","--gh-panel-card-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-panel-card-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-sidebar-button-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-msg-user-bg":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.220) 0%, rgba(52, 53, 65, 0.120) 100%)":"rgba(52, 53, 65, 0.940)","--gh-msg-assistant-bg":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.160) 0%, rgba(23, 23, 23, 0.090) 100%)":"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-msg-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.120)":"none","--gh-msg-blur":d,"--gh-panel-blur":p,"--gh-composer-blur":c,"--gh-composer-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.120)":"none","--gh-page-sidebar-bg-light":"color-mix(in srgb, #ffffff, transparent 84%)","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":"color-mix(in srgb, #ffffff, transparent 78%)","--gh-page-sidebar-bg-dark":o?"linear-gradient(180deg, rgba(32, 33, 35, 0.120) 0%, rgba(23, 23, 23, 0.070) 100%)":"transparent","--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.800) 0%, rgba(23, 23, 23, 0.720) 100%)":"transparent","--gh-page-accent-soft":"rgba(59, 130, 246, 0.100)","--gh-page-accent-soft-dark":o?"rgba(255, 255, 255, 0.100)":"rgba(255, 255, 255, 0.080)","--gh-page-accent-strong":"#2563eb","--gh-page-link":"#2563eb","--gh-page-selection":"rgba(59, 130, 246, 0.180)"}:{"--gh-bg":"#f9f9f9","--gh-bg-secondary":"#f3f3f3","--gh-text":"#0d0d0d","--gh-text-secondary":"rgba(13, 13, 13, 0.64)","--gh-border":"rgba(0, 0, 0, 0.10)","--gh-hover":"#ececec","--gh-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.080)":"0 0 0 0 rgba(0,0,0,0)","--gh-input-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.860) 0%, rgba(248, 250, 252, 0.760) 100%)":"#ffffff","--gh-input-border":o?"rgba(226, 232, 240, 0.860)":"rgba(0, 0, 0, 0.10)","--gh-active-bg":"#ececec","--gh-right-overlay":o?"linear-gradient(180deg, rgba(255, 255, 255, 0.560) 0%, rgba(248, 250, 252, 0.420) 100%)":"#f9f9f9","--gh-panel-card-bg":o?"rgba(255, 255, 255, 0.540)":"#ffffff","--gh-panel-card-border":o?"rgba(255, 255, 255, 0.460)":"rgba(0, 0, 0, 0.10)","--gh-sidebar-button-bg":o?"rgba(255, 255, 255, 0.420)":"#ececec","--gh-msg-user-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.340) 0%, rgba(248, 250, 252, 0.240) 100%)":"rgba(255, 255, 255, 0.920)","--gh-msg-assistant-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.280) 0%, rgba(248, 250, 252, 0.180) 100%)":"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.420)":"rgba(209, 213, 219, 0.580)","--gh-msg-shadow":o?"0 14px 32px rgba(15, 23, 42, 0.100)":"none","--gh-msg-blur":d,"--gh-panel-blur":p,"--gh-composer-blur":c,"--gh-composer-shadow":o?"0 10px 24px rgba(15, 23, 42, 0.100)":"none","--gh-page-sidebar-bg-light":o?"linear-gradient(180deg, rgba(255, 255, 255, 0.360) 0%, rgba(248, 250, 252, 0.220) 100%)":"#f9f9f9","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.900) 0%, rgba(248, 250, 252, 0.800) 100%)":"transparent","--gh-page-sidebar-bg-dark":"linear-gradient(180deg, rgba(2, 6, 23, 0.260) 0%, rgba(2, 6, 23, 0.160) 100%)","--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":"linear-gradient(135deg, rgba(8, 17, 29, 0.240) 0%, rgba(8, 17, 29, 0.160) 100%)","--gh-page-accent-soft":"rgba(59, 130, 246, 0.120)","--gh-page-accent-soft-dark":"rgba(59, 130, 246, 0.260)","--gh-page-accent-strong":"#2563eb","--gh-page-link":"#2563eb","--gh-page-selection":"rgba(59, 130, 246, 0.180)"},t,e);if(r){const A=o?y("#202123",t.primary,.04+i*.04):y("#202123",t.primary,.06+i*.04),w=o?y("#171717",t.secondary,.03+i*.04):y("#171717",t.secondary,.04+i*.03),N=o?y("#202123",t.primary,.04+i*.05):y("#202123",t.primary,.06+i*.04),O=o?y("#171717",t.secondary,.03+i*.05):y("#171717",t.secondary,.04+i*.03),R=o?y("#2a2b2d",t.primary,.04+i*.05):y("#2a2b2d",t.primary,.05+i*.04),M=o?y("#202123",t.secondary,.03+i*.04):y("#202123",t.secondary,.04+i*.03),z=o?y("#202123",t.light,.04+s*.05):y("#202123",t.light,.03+s*.03),G=o?y("#202123",t.primary,.06+s*.06):y("#202123",t.primary,.08+s*.04),H=o?y("#252628",t.secondary,.05+s*.05):y("#252628",t.secondary,.07+s*.04),j=y("#343541",t.primary,.12+i*.06),V=o?y("#000000",t.primary,.04):"#000000",Q=o?y("#2a2b2d",t.light,.04+h*.05):y("#2a2b2d",t.light,.03+h*.03),ee=o?y("#202123",t.primary,.06+h*.06):y("#202123",t.primary,.08+h*.04);return ue({"--gh-bg":k(R,o?.28+i*.14:.98),"--gh-bg-secondary":k(M,o?.22+i*.12:.96),"--gh-text":"#ececf1","--gh-text-secondary":"rgba(236, 236, 241, 0.72)","--gh-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-hover":o?"rgba(255, 255, 255, 0.080)":"#2a2b2d","--gh-shadow":o?`0 8px 20px ${k(V,.14+i*.04)}`:"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":Y("135deg",[`${k(Q,o?.46+h*.16:.94)} 0%`,`${k(ee,o?.36+h*.14:.96)} 100%`]),"--gh-input-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-active-bg":k(j,o?.18+i*.06:.9),"--gh-right-overlay":Y("180deg",[`${k(N,o?.48+i*.12:.99)} 0%`,`${k(O,o?.36+i*.1:.97)} 100%`]),"--gh-panel-card-bg":Y("135deg",[`${k(R,o?.42+i*.14:.98)} 0%`,`${k(M,o?.32+i*.12:.96)} 100%`]),"--gh-panel-card-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-sidebar-button-bg":k(j,o?.3+i*.12:.82),"--gh-msg-user-bg":Y("135deg",[`${k(z,o?.18+s*.12:.98)} 0%`,`${k(H,o?.09+s*.08:.94)} 100%`]),"--gh-msg-assistant-bg":o?Y("135deg",[`${k(z,.16+s*.12)} 0%`,`${k(G,.08+s*.08)} 100%`]):"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.140)":"rgba(255, 255, 255, 0.110)","--gh-msg-shadow":o?`0 8px 20px ${k(V,.1+s*.05)}`:"none","--gh-msg-blur":d,"--gh-panel-blur":p,"--gh-composer-blur":c,"--gh-composer-shadow":o?`0 8px 20px ${k(V,.1+h*.04)}`:"none","--gh-page-sidebar-bg-light":Y("180deg",[`${k(y("#ffffff",t.light,.7),.18)} 0%`,`${k(y("#ffffff",t.primary,.16),.08)} 100%`]),"--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":Y("135deg",[`${k(y("#ffffff",t.light,.62),.22)} 0%`,`${k(y("#ffffff",t.primary,.18),.12)} 100%`]),"--gh-page-sidebar-bg-dark":Y("180deg",[`${k(A,o?.12+i*.08:.99)} 0%`,`${k(w,o?.07+i*.06:.97)} 100%`]),"--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":Y("135deg",[`${k(Q,o?.76+h*.12:.98)} 0%`,`${k(ee,o?.66+h*.12:.95)} 100%`]),"--gh-page-accent-soft":k(y("#ffffff",t.primary,.34),.22+i*.08),"--gh-page-accent-soft-dark":k(j,o?.2+i*.08:.9),"--gh-page-accent-strong":t.accent,"--gh-page-link":t.accent,"--gh-page-selection":k(y("#0b1324",t.primary,.72),o?.22:.32)},t,e)}const g=o?y("#ffffff",t.light,.72):y("#ffffff",t.light,.92),m=o?y("#ffffff",t.primary,.16+i*.12):y("#ffffff",t.primary,.24+i*.16),x=o?y("#ffffff",t.light,.78):y("#ffffff",t.light,.9),b=o?y("#ffffff",t.secondary,.18+i*.14):y("#ffffff",t.secondary,.26+i*.16),L=o?y("#ffffff",t.light,.6):y("#ffffff",t.light,.88),B=o?y("#ffffff",t.secondary,.2+i*.1):y("#ffffff",t.primary,.2+i*.14),S=o?y("#ffffff",t.light,.7):y("#ffffff",t.light,.9),v=o?y("#ffffff",t.secondary,.16+s*.14):y("#ffffff",t.secondary,.2+s*.14),I=o?y("#ffffff",t.light,.76):y("#ffffff",t.light,.94),D=o?y("#ffffff",t.primary,.18+s*.16):y("#ffffff",t.primary,.18+s*.14),E=o?y("#ffffff",t.primary,.12):y("#cbd5e1",t.primary,.18),P=o?y("#ffffff",t.primary,.16):y("#cbd5e1",t.primary,.18),q=y("#eff6ff",t.primary,o?.34:.46),u=o?y("#0f172a",t.primary,.16):y("#94a3b8",t.primary,.1),f=o?y("#ffffff",t.light,.64):y("#ffffff",t.light,.9),C=y("#ffffff",t.primary,.18+h*.12);return o?y("#ffffff",t.light,.34):y("#ffffff",t.light,.6),o?y("#ffffff",t.primary,.08+i*.06):y("#ffffff",t.primary,.12+i*.08),ue({"--gh-bg":k(L,o?.4+i*.16:.97),"--gh-bg-secondary":k(B,o?.3+i*.14:.93),"--gh-text":"rgba(15, 23, 42, 0.92)","--gh-text-secondary":"rgba(51, 65, 85, 0.78)","--gh-border":k(E,o?.2+i*.1:.34+i*.08),"--gh-hover":k(b,o?.1+i*.08:.6+i*.1),"--gh-shadow":o?`0 8px 20px ${k(u,.1+i*.06)}`:"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":Y("135deg",[`${k(f,o?.72+h*.16:.96)} 0%`,`${k(C,o?.62+h*.14:.9)} 100%`]),"--gh-input-border":k(P,o?.38+h*.12:.38+h*.08),"--gh-active-bg":k(q,o?.18+i*.08:.34+i*.1),"--gh-right-overlay":o?Y("180deg",[`${k(x,.56+i*.16)} 0%`,`${k(b,.42+i*.14)} 100%`]):"#f9f9f9","--gh-panel-card-bg":o?Y("135deg",[`${k(L,.48+i*.16)} 0%`,`${k(B,.36+i*.14)} 100%`]):"#ffffff","--gh-panel-card-border":o?k(E,.32+i*.12):"rgba(0, 0, 0, 0.10)","--gh-sidebar-button-bg":o?k(q,.32+i*.12):"#ececec","--gh-msg-user-bg":Y("135deg",[`${k(S,o?.26+s*.18:.96)} 0%`,`${k(v,o?.1+s*.1:.88)} 100%`]),"--gh-msg-assistant-bg":o?Y("135deg",[`${k(I,.24+s*.16)} 0%`,`${k(D,.12+s*.12)} 100%`]):"transparent","--gh-msg-border":k(P,o?.24+s*.12:.38+s*.1),"--gh-msg-shadow":o?`0 14px 32px ${k(u,.08+s*.08)}`:"none","--gh-msg-blur":d,"--gh-panel-blur":p,"--gh-composer-blur":c,"--gh-composer-shadow":o?`0 10px 24px ${k(u,.08+h*.08)}`:"none","--gh-page-sidebar-bg-light":o?Y("180deg",[`${k(g,.3+i*.14)} 0%`,`${k(m,.18+i*.12)} 100%`]):"#f9f9f9","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":Y("135deg",[`${k(f,o?.8+h*.14:.97)} 0%`,`${k(C,o?.68+h*.12:.9)} 100%`]),"--gh-page-sidebar-bg-dark":Y("180deg",[`${k(y("#020617",t.primary,.22),.36)} 0%`,`${k(y("#020617",t.secondary,.16),.24)} 100%`]),"--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":Y("135deg",[`${k(y("#08111d",t.light,.12),.86)} 0%`,`${k(y("#08111d",t.primary,.18),.76)} 100%`]),"--gh-page-accent-soft":k(q,o?.2+i*.08:.88),"--gh-page-accent-soft-dark":k(y("#0b1324",t.primary,.72),.24+i*.1),"--gh-page-accent-strong":t.accent,"--gh-page-link":t.accent,"--gh-page-selection":k(y("#ffffff",t.primary,.38),o?.28:.34)},t,e)}function Oe(n,e){const t=n&&typeof n=="object"?n:{},r=t.appearanceMode||e||"system",a=["system","light","dark"].includes(r)?r:"system",o=we[t.presetKey]?t.presetKey:X.presetKey,i=typeof t.backgroundAssetId=="string"&&t.backgroundAssetId.trim()?t.backgroundAssetId.trim():null,s=!!t.backgroundImageEnabled&&!!i,h=typeof t.updatedAt=="string"&&t.updatedAt?t.updatedAt:new Date().toISOString();return{appearanceMode:a,presetKey:o,backgroundImageEnabled:s,backgroundBlurPx:t.backgroundBlurPx==null?X.backgroundBlurPx:Math.round($(t.backgroundBlurPx,0,20)),messageGlassEnabled:!!t.messageGlassEnabled,messageGlassIntensity:t.messageGlassIntensity==null?X.messageGlassIntensity:Math.round($(t.messageGlassIntensity,0,100)),panelGlassIntensity:t.panelGlassIntensity==null?X.panelGlassIntensity:Math.round($(t.panelGlassIntensity,0,100)),sidebarTextEnhanceEnabled:typeof t.sidebarTextEnhanceEnabled=="boolean"?t.sidebarTextEnhanceEnabled:!0,sidebarTextEnhanceIntensity:t.sidebarTextEnhanceIntensity==null?X.sidebarTextEnhanceIntensity:Math.round($(t.sidebarTextEnhanceIntensity,0,100)),backgroundAssetId:i,updatedAt:h}}function be(){return ye}function ze(n){return ye=n,ye}class De{constructor(){this.dbPromise=null}openDB(){return this.dbPromise?this.dbPromise:(this.dbPromise=new Promise((e,t)=>{const r=indexedDB.open(Xe,Je);r.onupgradeneeded=()=>{const a=r.result;a.objectStoreNames.contains(le)||a.createObjectStore(le,{keyPath:"id"})},r.onsuccess=()=>{const a=r.result;a.onversionchange=()=>{a.close(),this.dbPromise=null},a.onclose=()=>{this.dbPromise=null},e(a)},r.onerror=()=>t(r.error||new Error("IndexedDB open failed"))}),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async transaction(e,t){const r=await this.openDB();return new Promise((a,o)=>{const i=r.transaction(le,e);let s;i.oncomplete=()=>a(s),i.onerror=()=>o(i.error||new Error("Theme asset transaction failed")),i.onabort=()=>o(i.error||new Error("Theme asset transaction aborted"));try{const h=t(i.objectStore(le));h.onsuccess=()=>{s=h.result},h.onerror=()=>o(h.error||new Error("Theme asset request failed"))}catch(h){i.abort(),o(h)}})}async getAsset(e){return e&&await this.transaction("readonly",t=>t.get(e))||null}async getAllAssets(){return await this.transaction("readonly",e=>e.getAll())||[]}async putAsset(e,t,r=null){const a=new Date().toISOString(),o={id:r||pt(),mimeType:t||e.type,size:e.size,blob:e,createdAt:a,updatedAt:a};return await this.transaction("readwrite",i=>i.put(o)),o}async deleteAsset(e){e&&await this.transaction("readwrite",t=>t.delete(e))}}class ct{constructor(e){this.container=e.container,this.settings=e.settings,this.adapter=e.adapter,this.t=e.i18n||(t=>t),this.data=this.loadData(),this.searchQuery="",this.filterPinned=!1,this.filterTagIds=new Set,this.expandedFolderId=null,this.selectedIds=new Set,this.batchMode=!1,this.autoSyncInterval=null,this.syncPromise=null,this.lastSyncTime=0,window.addEventListener("ch-helper-storage-ready",()=>this.reloadData(),{once:!0}),this.startAutoSync()}loadData(){let e=null;if(window.__MY_EXT__&&window.__MY_EXT__.storageCacheInitialized&&window.__MY_EXT__.storageCache){const t=Object.keys(window.__MY_EXT__.storageCache||{});console.log("[ChatGPT Helper] \u7F13\u5B58\u5DF2\u521D\u59CB\u5316\uFF0C\u7F13\u5B58\u4E2D\u7684\u952E:",t),e=window.__MY_EXT__.storageCache.chatgpt_conversations,console.log("[ChatGPT Helper] \u4ECE\u5DF2\u521D\u59CB\u5316\u7684\u7F13\u5B58\u8BFB\u53D6\u6570\u636E:",e!=null?"\u627E\u5230\u6570\u636E":"\u672A\u627E\u5230\u6570\u636E"),e!=null&&console.log("[ChatGPT Helper] \u7F13\u5B58\u4E2D\u7684\u6570\u636E\u7C7B\u578B:",typeof e,Array.isArray(e)?"(\u6570\u7EC4)":"(\u5BF9\u8C61)")}else window.__MY_EXT__&&window.__MY_EXT__.storageCache&&(e=window.__MY_EXT__.storageCache.chatgpt_conversations,console.log("[ChatGPT Helper] \u4ECE\u7F13\u5B58\u8BFB\u53D6\u6570\u636E\uFF08\u7F13\u5B58\u53EF\u80FD\u672A\u5B8C\u5168\u521D\u59CB\u5316\uFF09"));if(e==null&&(e=window.GM_getValue("chatgpt_conversations",null),console.log("[ChatGPT Helper] \u4F7F\u7528 GM_getValue \u8BFB\u53D6\u6570\u636E:",e?"\u627E\u5230\u6570\u636E":"\u672A\u627E\u5230\u6570\u636E"),e&&console.log("[ChatGPT Helper] GM_getValue \u8FD4\u56DE\u7684\u6570\u636E\u7C7B\u578B:",typeof e)),e&&typeof e=="object"){const t=Object.keys(e.conversations||{}).length;return console.log("[ChatGPT Helper] \u52A0\u8F7D\u4F1A\u8BDD\u6570\u636E:",t,"\u4E2A\u4F1A\u8BDD"),console.log("[ChatGPT Helper] \u4F1A\u8BDD\u6570\u636E\u7ED3\u6784:",{folders:e.folders?.length||0,tags:e.tags?.length||0,conversations:t,lastUsedFolderId:e.lastUsedFolderId}),this.sanitizeLoadedData(e),this._loadedWithUnreadyCache=!1,e}return this._loadedWithUnreadyCache=!!(window.__MY_EXT__&&window.__MY_EXT__.storageCache&&!window.__MY_EXT__.storageCacheInitialized),console.log("[ChatGPT Helper] \u4F7F\u7528\u9ED8\u8BA4\u4F1A\u8BDD\u6570\u636E\u7ED3\u6784\uFF08\u672A\u627E\u5230\u4FDD\u5B58\u7684\u6570\u636E\uFF09"),window.__MY_EXT__&&window.__MY_EXT__.GM&&window.__MY_EXT__.GM.getValue&&window.__MY_EXT__.GM.getValue("chatgpt_conversations",null).then(t=>{if(t&&typeof t=="object"){const r=Object.keys(t.conversations||{}).length;console.log("[ChatGPT Helper] \u5F02\u6B65\u8BFB\u53D6\u53D1\u73B0\u6570\u636E:",r,"\u4E2A\u4F1A\u8BDD"),r>0&&console.warn("[ChatGPT Helper] \u8B66\u544A\uFF1A\u5F02\u6B65\u8BFB\u53D6\u53D1\u73B0\u6570\u636E\uFF0C\u4F46\u540C\u6B65\u8BFB\u53D6\u672A\u627E\u5230\u3002\u53EF\u80FD\u9700\u8981\u7B49\u5F85\u7F13\u5B58\u521D\u59CB\u5316\u3002")}}).catch(t=>{console.error("[ChatGPT Helper] \u5F02\u6B65\u8BFB\u53D6\u9519\u8BEF:",t)}),{folders:[{id:"inbox",name:"\u{1F4E5} \u6536\u4EF6\u7BB1",icon:"\u{1F4E5}",isDefault:!0}],tags:[],conversations:{},lastUsedFolderId:"inbox"}}reloadData(){const e=Object.keys(this.data.conversations||{}).length;this.data=this.loadData();const t=Object.keys(this.data.conversations||{}).length;t!==e&&(console.log("[ChatGPT Helper] \u6570\u636E\u5DF2\u91CD\u65B0\u52A0\u8F7D\uFF0C\u4F1A\u8BDD\u6570\u91CF\u4ECE",e,"\u53D8\u4E3A",t),this.container&&this.container.children.length>0&&this.createUI())}saveData(){if(this._loadedWithUnreadyCache){console.warn("[ChatGPT Helper] \u5B58\u50A8\u7F13\u5B58\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7\u672C\u6B21\u4F1A\u8BDD\u6570\u636E\u5199\u5165");return}window.GM_setValue("chatgpt_conversations",this.data)}sanitizeLoadedData(e){try{Array.isArray(e.folders)||(e.folders=[]),Array.isArray(e.tags)||(e.tags=[]),(!e.conversations||typeof e.conversations!="object"||Array.isArray(e.conversations))&&(e.conversations={}),Object.entries(e.conversations).forEach(([t,r])=>{if(!r||typeof r!="object"){delete e.conversations[t];return}const a=Te(r.url);a?r.url=a:delete r.url})}catch(t){console.error("[ChatGPT Helper] \u4F1A\u8BDD\u6570\u636E\u51C0\u5316\u5931\u8D25:",t)}}ensureInboxFolder(){Array.isArray(this.data.folders)||(this.data.folders=[]),this.data.folders.some(e=>e&&e.id==="inbox")||this.data.folders.unshift({id:"inbox",name:"\u{1F4E5} \u6536\u4EF6\u7BB1",icon:"\u{1F4E5}",isDefault:!0})}getFolderDisplayName(e){return e?e.id==="inbox"?this.t("inbox"):(e.name||"").replace(e.icon||"","").trim()||e.name||"":""}getFolderOptionLabel(e){return`${e?.icon||""} ${this.getFolderDisplayName(e)}`.trim()}getTargetFolderId(){this.ensureInboxFolder();const e=new Set(this.data.folders.map(t=>t&&t.id).filter(Boolean));return this.data.lastUsedFolderId&&e.has(this.data.lastUsedFolderId)?this.data.lastUsedFolderId:(this.data.lastUsedFolderId="inbox","inbox")}normalizeConversationFolders(){this.ensureInboxFolder();const e=new Set(this.data.folders.map(t=>t&&t.id).filter(Boolean));Object.values(this.data.conversations||{}).forEach(t=>{!t||e.has(t.folderId)||(t.folderId="inbox")})}startAutoSync(){this.autoSyncInterval&&clearInterval(this.autoSyncInterval),this.autoSyncInterval=setInterval(()=>{this.syncConversations()},5*60*1e3)}stopAutoSync(){this.autoSyncInterval&&(clearInterval(this.autoSyncInterval),this.autoSyncInterval=null)}createUI(){if(window.__MY_EXT__&&window.__MY_EXT__.storageCacheInitialized){const c=Object.keys(this.data.conversations||{}).length;this.data=this.loadData();const g=Object.keys(this.data.conversations||{}).length;g!==c&&console.log("[ChatGPT Helper] \u5728 createUI \u65F6\u91CD\u65B0\u52A0\u8F7D\u6570\u636E\uFF0C\u4F1A\u8BDD\u6570\u91CF\u4ECE",c,"\u53D8\u4E3A",g)}else{const c=(g=50)=>{if(window.__MY_EXT__&&window.__MY_EXT__.storageCacheInitialized){const m=Object.keys(this.data.conversations||{}).length;this.data=this.loadData();const x=Object.keys(this.data.conversations||{}).length;x!==m&&console.log("[ChatGPT Helper] \u7F13\u5B58\u521D\u59CB\u5316\u540E\u91CD\u65B0\u52A0\u8F7D\u6570\u636E\uFF0C\u4F1A\u8BDD\u6570\u91CF\u4ECE",m,"\u53D8\u4E3A",x)}else g>0&&setTimeout(()=>c(g-1),100)};c()}K(this.container),Date.now()-this.lastSyncTime>60*1e3&&setTimeout(()=>{this.syncConversations()},500);const t=l("div",{className:"chatgpt-helper-conversations-toolbar",style:{padding:"10px 12px",borderBottom:"1px solid var(--gh-border)",display:"flex",gap:"6px",alignItems:"center",flexShrink:0}}),r=l("select",{className:"chatgpt-helper-folder-select"});this.data.folders.forEach(c=>{const g=l("option",{value:c.id},this.getFolderOptionLabel(c));c.id===this.data.lastUsedFolderId&&(g.selected=!0),r.appendChild(g)}),r.addEventListener("change",()=>{this.data.lastUsedFolderId=r.value,this.saveData(),this.renderConversationList()}),t.appendChild(r);const a=l("button",{className:"chatgpt-helper-conversations-toolbar-btn sync",title:this.t("syncConversations")||"\u540C\u6B65\u4F1A\u8BDD"},"\u{1F504}");a.addEventListener("click",()=>this.syncConversations({showAlreadySyncing:!0})),t.appendChild(a);const o=l("button",{className:"chatgpt-helper-conversations-toolbar-btn add-folder",title:this.t("newFolder")||"\u65B0\u5EFA\u6587\u4EF6\u5939"},"\u{1F4C1}");o.addEventListener("click",()=>this.showCreateFolderDialog()),t.appendChild(o);const i=l("button",{className:"chatgpt-helper-conversations-toolbar-btn batch-mode"+(this.batchMode?" active":""),title:this.t("batchMode")||"\u6279\u91CF\u64CD\u4F5C"},this.batchMode?"\u2713":"\u2611");if(i.addEventListener("click",()=>{this.batchMode=!this.batchMode,this.batchMode||this.selectedIds.clear(),this.createUI()}),t.appendChild(i),this.batchMode){this.batchToolbar=l("div",{className:"chatgpt-helper-batch-toolbar"}),this.batchToolbar.appendChild(l("span",{style:{color:"var(--gh-text)",fontWeight:"500"}},`${this.t("selected")||"\u5DF2\u9009\u62E9"} ${this.selectedIds.size} ${this.t("items")||"\u9879"}`));const c=l("button",{className:"chatgpt-helper-batch-toolbar-btn"},`\u{1F4C1} ${this.t("move")||"\u79FB\u52A8"}`);c.addEventListener("click",()=>this.batchMove()),this.batchToolbar.appendChild(c);const g=l("button",{className:"chatgpt-helper-batch-toolbar-btn danger"},"\u{1F5D1} "+(this.t("delete")||"\u5220\u9664"));g.addEventListener("click",()=>this.batchDelete()),this.batchToolbar.appendChild(g),this.container.appendChild(this.batchToolbar)}this.container.appendChild(t);const s=l("div",{className:"chatgpt-helper-conversations-search"}),h=l("input",{className:"chatgpt-helper-conversations-search-input",type:"text",placeholder:this.t("searchConversations")||"\u641C\u7D22\u4F1A\u8BDD...",value:this.searchQuery});let p=null;h.addEventListener("input",()=>{this.searchQuery=h.value.trim(),p&&clearTimeout(p),p=setTimeout(()=>this.renderConversationList(),150)}),s.appendChild(h),this.container.appendChild(s);const d=l("div",{className:"chatgpt-helper-conversations-root",style:{flex:1,overflowY:"auto",padding:"8px"}});this.container.appendChild(d),this.listContainer=d,this.renderConversationList()}renderConversationList(){if(!this.listContainer)return;K(this.listContainer);const e=this.data.folders||[],t=[];if(e.forEach((r,a)=>{let o=Object.values(this.data.conversations||{}).filter(i=>i.folderId===r.id);if(this.searchQuery){const i=this.searchQuery.toLowerCase();o=o.filter(s=>s.title&&s.title.toLowerCase().includes(i))}this.filterPinned&&(o=o.filter(i=>i.pinned)),!(this.searchQuery&&o.length===0)&&t.push({folder:r,index:a,conversations:o})}),t.length===0){this.listContainer.appendChild(l("div",{className:"chatgpt-helper-conversations-empty"},this.searchQuery?this.t("noSearchResults"):this.t("noConversations")));return}t.forEach((r,a)=>{const{folder:o,index:i,conversations:s}=r,h=this.createFolderItem(o,i,s.length);this.listContainer.appendChild(h);const p=this.expandedFolderId===o.id,d=l("div",{className:"chatgpt-helper-conversations-list","data-folder-id":o.id,style:p?"display: block;":"display: none;"});h.addEventListener("click",c=>{if(c.target.closest("button"))return;this.listContainer.querySelectorAll(".chatgpt-helper-folder-item.expanded").forEach(x=>{if(x!==h){x.classList.remove("expanded");const b=this.listContainer.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${CSS.escape(x.dataset.folderId||"")}"]`);b&&(b.style.display="none");const L=x.querySelector(".chatgpt-helper-folder-arrow");L&&(L.style.transform="rotate(0deg)")}});const g=h.classList.toggle("expanded");this.expandedFolderId=g?o.id:null;const m=h.querySelector(".chatgpt-helper-folder-arrow");m&&(m.style.transform=g?"rotate(90deg)":"rotate(0deg)"),g?(this.renderConversationsInFolder(o.id,d),d.style.display="block"):d.style.display="none"}),p&&(h.classList.add("expanded"),this.renderConversationsInFolder(o.id,d)),this.listContainer.appendChild(d),o.id==="inbox"&&t.slice(a+1).some(g=>g.folder&&g.folder.id!=="inbox")&&this.listContainer.appendChild(l("div",{className:"chatgpt-helper-folder-divider"}))})}createFolderItem(e,t,r){const a=l("div",{className:"chatgpt-helper-folder-item"+(e.isDefault?" default":""),"data-folder-id":e.id}),o=l("div",{className:"chatgpt-helper-folder-info"}),i=l("span",{className:"chatgpt-helper-folder-icon"},e.icon||"\u{1F4C1}");o.appendChild(i);const s=l("span",{className:"chatgpt-helper-folder-name"},this.getFolderDisplayName(e));o.appendChild(s);const h=l("span",{className:"chatgpt-helper-folder-count"},`(${r})`);o.appendChild(h),a.appendChild(o);const p=l("div",{className:"chatgpt-helper-folder-actions"});if(!e.isDefault&&e.id!=="inbox"){const c=l("button",{className:"chatgpt-helper-folder-delete-btn",title:this.t("deleteFolder")||"\u5220\u9664\u6587\u4EF6\u5939"},"\u{1F5D1}");c.addEventListener("click",g=>{g.stopPropagation(),this.deleteFolder(e.id)}),p.appendChild(c)}const d=l("span",{className:"chatgpt-helper-folder-arrow",style:{transform:this.expandedFolderId===e.id?"rotate(90deg)":"rotate(0deg)"}},"\u25B8");return p.appendChild(d),a.appendChild(p),a}renderConversationsInFolder(e,t){K(t);let r=Object.values(this.data.conversations).filter(a=>a.folderId===e);if(this.searchQuery){const a=this.searchQuery.toLowerCase();r=r.filter(o=>o.title&&o.title.toLowerCase().includes(a))}if(this.filterPinned&&(r=r.filter(a=>a.pinned)),r.length===0){t.appendChild(l("div",{className:"chatgpt-helper-conversations-empty"},this.t("noConversations")));return}r.sort((a,o)=>a.pinned!==o.pinned?o.pinned?1:-1:(o.updatedAt||0)-(a.updatedAt||0)),r.forEach(a=>{const o=l("div",{className:"chatgpt-helper-conversation-item"+(a.pinned?" pinned":""),"data-conv-id":a.id});if(this.batchMode){const h=l("input",{type:"checkbox",checked:this.selectedIds.has(a.id),style:{position:"absolute",left:"8px",top:"50%",transform:"translateY(-50%)",cursor:"pointer",width:"18px",height:"18px"}});h.addEventListener("click",p=>{p.stopPropagation(),h.checked?this.selectedIds.add(a.id):this.selectedIds.delete(a.id),this.updateBatchToolbar()}),o.appendChild(h)}if(a.pinned){const h=l("span",{className:"chatgpt-helper-conversation-pin",style:{position:"absolute",top:"8px",right:"8px"}});h.appendChild(_("pin",{size:13})),o.appendChild(h)}const i=l("div",{style:{fontWeight:"500",color:"var(--gh-text)",marginBottom:"4px",fontSize:"14px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:a.pinned?"20px":"0",paddingLeft:this.batchMode?"30px":"0"}},a.title||this.t("untitledConversation"));if(o.appendChild(i),a.tagIds&&a.tagIds.length>0&&this.data.tags){const h=l("div",{className:"chatgpt-helper-conversation-tags"});a.tagIds.forEach(p=>{const d=this.data.tags.find(c=>c.id===p);if(d){const c=l("span",{className:"chatgpt-helper-conversation-tag"},d.name);c.style.setProperty("--gh-tag-color",d.color||"var(--gh-primary)"),h.appendChild(c)}}),o.appendChild(h)}const s=l("div",{style:{fontSize:"12px",color:"var(--gh-text-secondary)",marginTop:"4px"}},this.formatTime(a.updatedAt));o.appendChild(s),o.addEventListener("contextmenu",h=>{h.preventDefault(),this.showContextMenu(h,a)}),o.addEventListener("click",h=>{if(this.batchMode&&h.target.type!=="checkbox"){const p=o.querySelector('input[type="checkbox"]');p&&(p.checked=!p.checked,p.checked?this.selectedIds.add(a.id):this.selectedIds.delete(a.id),this.updateBatchToolbar())}else if(!this.batchMode&&a.url){const p=Te(a.url);p&&(window.location.href=p)}}),t.appendChild(o)})}async syncConversations(e={}){return this.syncPromise?(e.showAlreadySyncing&&this.showToast(this.t("conversationSyncing")||"\u6B63\u5728\u540C\u6B65\u4F1A\u8BDD..."),this.syncPromise):(this.syncPromise=(async()=>{try{const t=await Promise.resolve(this.adapter.getConversationList());if(this.lastSyncTime=Date.now(),!Array.isArray(t)||t.length===0)return this.showToast(this.t("conversationSyncNoResults")||"\u672A\u52A0\u8F7D\u5230\u5386\u53F2\u4F1A\u8BDD\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u767B\u5F55 ChatGPT \u540E\u91CD\u8BD5"),{total:0,newCount:0,updatedCount:0};this.data.conversations||(this.data.conversations={}),this.normalizeConversationFolders();let r=0,a=0;const o=this.getTargetFolderId();if(t.forEach(s=>{if(!s||!s.id)return;const h=s.id,p=s.title||this.t("untitledConversation"),d=Te(s.url)||void 0,c=s.createdAt||null,g=s.updatedAt||c,m=this.data.conversations[h],x=g||m?.updatedAt||m?.createdAt||Date.now(),b=c||m?.createdAt||x;if(!m){this.data.conversations[h]={id:h,title:p,url:d,folderId:o,pinned:!!s.isPinned,createdAt:b,updatedAt:x},r++;return}m.title!==p&&(m.title=p,a++),d&&m.url!==d&&(m.url=d,a++),m.folderId||(m.folderId=o),m.pinned===void 0&&(m.pinned=!!s.isPinned),b&&(!m.createdAt||b<m.createdAt)&&(m.createdAt=b,a++);const L=m.updatedAt||0;x>L&&(m.updatedAt=x,a++)}),this.saveData(),this.renderConversationList(),(r>0||a>0)&&this.expandedFolderId){const s=this.listContainer?.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${CSS.escape(this.expandedFolderId||"")}"]`);s&&this.renderConversationsInFolder(this.expandedFolderId,s)}const i=r>0?`${this.t("synced")||"\u5DF2\u540C\u6B65"} ${r} ${this.t("newSessions")||"\u4E2A\u65B0\u4F1A\u8BDD"}`:a>0?`${this.t("synced")||"\u5DF2\u540C\u6B65"} ${a} ${this.t("updatedSessions")||"\u4E2A\u4F1A\u8BDD"}`:this.t("synced")||"\u540C\u6B65\u5B8C\u6210";return this.showToast(i),{total:t.length,newCount:r,updatedCount:a}}catch(t){return console.error("[ChatGPT Helper] \u540C\u6B65\u4F1A\u8BDD\u5931\u8D25:",t),this.lastSyncTime=Date.now(),this.showToast(this.t("conversationSyncFailed")||"\u4F1A\u8BDD\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"),{total:0,newCount:0,updatedCount:0,error:t}}finally{this.syncPromise=null}})(),this.syncPromise)}showCreateFolderDialog(){const e=prompt(this.t("promptFolderName"));if(!e||!e.trim())return;const t={id:"folder_"+Date.now(),name:`\u{1F4C1} ${e.trim()}`,icon:"\u{1F4C1}",isDefault:!1};this.data.folders.push(t),this.saveData(),this.createUI()}deleteFolder(e){if(!e||e==="inbox")return;const t=(this.data.folders||[]).find(s=>s.id===e);if(!t||t.isDefault)return;const r=(t.name||"").trim()||e,o=(this.t("deleteFolderConfirm")||`\u786E\u5B9A\u8981\u5220\u9664\u6587\u4EF6\u5939 "{name}" \u5417\uFF1F
\u6587\u4EF6\u5939\u5185\u7684\u4F1A\u8BDD\u5C06\u79FB\u52A8\u5230\u6536\u4EF6\u7BB1\u3002`).replace("{name}",r.replace(/"/g,""));if(!confirm(o))return;const i=this.data.conversations||{};Object.values(i).forEach(s=>{s&&s.folderId===e&&(s.folderId="inbox")}),this.data.folders=(this.data.folders||[]).filter(s=>s.id!==e),this.data.lastUsedFolderId===e&&(this.data.lastUsedFolderId="inbox"),this.expandedFolderId===e&&(this.expandedFolderId=null),this.saveData(),this.createUI(),this.showToast(this.t("folderDeleted")||"\u6587\u4EF6\u5939\u5DF2\u5220\u9664")}formatTime(e){if(!e)return"";const t=new Date(e);try{const r=be&&be()==="zh-CN"?"zh-CN":"en-US";return t.toLocaleString(r,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return t.toLocaleString()}}updateBatchToolbar(){if(this.batchToolbar){const e=this.batchToolbar.querySelector("span");e&&(e.textContent=`${this.t("selected")} ${this.selectedIds.size} ${this.t("items")}`)}}batchMove(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u79FB\u52A8\u7684\u4F1A\u8BDD");return}this.showMoveToFolderDialog(null,!0)}batchDelete(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u5220\u9664\u7684\u4F1A\u8BDD");return}confirm(this.t("confirmDeleteConversations").replace("{count}",this.selectedIds.size))&&(this.selectedIds.forEach(e=>{delete this.data.conversations[e]}),this.selectedIds.clear(),this.saveData(),this.renderConversationList(),this.updateBatchToolbar(),this.showToast(this.t("deleted")))}async batchExport(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u5BFC\u51FA\u7684\u4F1A\u8BDD");return}const e=prompt(this.t("exportFormat"),"1");if(!e)return;const r={1:"markdown",2:"json",3:"txt"}[e]||"markdown";for(const a of this.selectedIds){const o=this.data.conversations[a];o&&o.url&&await this.exportConversation(o,r)}this.showToast(this.t("exportedConversations").replace("{count}",this.selectedIds.size))}async exportConversation(e,t="markdown"){const r=(window.location.pathname.match(/\/c\/([^/?]+)/)||[])[1];if(!r||r!==e.id){this.showToast(this.t("openConversationFirst").replace("{title}",e.title||this.t("untitledConversation")));return}const a=this.extractMessages();if(a.length===0){this.showToast(this.t("noContent")||"\u672A\u627E\u5230\u5BF9\u8BDD\u5185\u5BB9");return}const o=String(e.title||this.t("untitledConversation")).replace(/[\\/:*?"<>|\r\n]+/g,"_").replace(/\s+/g," ").trim().slice(0,80)||"conversation";let i="";const s=`${o}_${Date.now()}`;switch(t){case"markdown":i=this.formatToMarkdown(e,a),this.downloadFile(i,`${s}.md`,"text/markdown");break;case"json":i=this.formatToJSON(e,a),this.downloadFile(i,`${s}.json`,"application/json");break;case"txt":i=this.formatToTXT(e,a),this.downloadFile(i,`${s}.txt`,"text/plain");break}}extractMessages(){const e=[];return this.adapter.getChatMessages().forEach((r,a)=>{const o=r.getAttribute("data-message-author-role")||(r.querySelector('[data-message-author-role="user"]')?"user":"assistant"),i=(r.innerText||r.textContent||"").trim();i&&e.push({role:o,content:i})}),e}formatToMarkdown(e,t){const r=[],a=new Date().toLocaleString(),o=this.t("userRole");return r.push(`# \u{1F4E4} ${this.t("exportInfoHeading")}`),r.push(`- **${this.t("conversationTitleLabel")}**: ${e.title||this.t("untitledConversation")}`),r.push(`- **${this.t("exportTimeLabel")}**: ${a}`),r.push(`- **${this.t("sourceLabel")}**: ChatGPT`),r.push(`- **${this.t("linkLabel")}**: ${window.location.href}`),r.push("---"),r.push(""),t.forEach(i=>{i.role==="user"?(r.push(`## \u{1F64B} ${o}`),r.push(""),r.push(i.content),r.push(""),r.push("---"),r.push("")):(r.push("## \u{1F916} ChatGPT"),r.push(""),r.push(i.content),r.push(""),r.push("---"),r.push(""))}),r.join(`
`)}formatToJSON(e,t){const r={metadata:{title:e.title||this.t("untitledConversation"),id:e.id,url:window.location.href,exportTime:new Date().toISOString(),source:"ChatGPT"},messages:t.map(a=>({role:a.role,content:a.content}))};return JSON.stringify(r,null,2)}formatToTXT(e,t){const r=[],a=new Date().toLocaleString(),o=this.t("userRole");return r.push(`${this.t("conversationTitleLabel")}: ${e.title||this.t("untitledConversation")}`),r.push(`${this.t("exportTimeLabel")}: ${a}`),r.push(`${this.t("sourceLabel")}: ChatGPT`),r.push(`${this.t("linkLabel")}: ${window.location.href}`),r.push(""),r.push("=".repeat(50)),r.push(""),t.forEach(i=>{i.role==="user"?r.push(`[${o}]`):r.push("[ChatGPT]"),r.push(i.content),r.push(""),r.push("-".repeat(50)),r.push("")}),r.join(`
`)}downloadFile(e,t,r){const a=new Blob([e],{type:r}),o=URL.createObjectURL(a),i=document.createElement("a");i.href=o,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}showMoveToFolderDialog(e,t=!1){const r=l("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),a=l("div",{className:"chatgpt-helper-prompt-dialog chatgpt-helper-compact-dialog",role:"dialog","aria-modal":"true","aria-label":this.t("moveToFolder")});a.appendChild(l("div",{className:"chatgpt-helper-prompt-dialog-title"},this.t("moveToFolder")));const o=l("select",{className:"chatgpt-helper-prompt-dialog-field"});this.data.folders.forEach(p=>{const d=l("option",{value:p.id},this.getFolderOptionLabel(p));o.appendChild(d)}),a.appendChild(o);const i=l("div",{className:"chatgpt-helper-prompt-dialog-actions"}),s=l("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));s.addEventListener("click",()=>r.remove());const h=l("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("confirm"));h.addEventListener("click",()=>{if(!r.isConnected)return;const p=o.value;t?(this.selectedIds.forEach(d=>{this.data.conversations[d]&&(this.data.conversations[d].folderId=p)}),this.saveData(),this.renderConversationList(),this.updateBatchToolbar(),this.showToast(`${this.t("moved")} ${this.selectedIds.size} ${this.t("updatedSessions")}`)):e&&(e.folderId=p,this.saveData(),this.renderConversationList(),this.showToast(this.t("moved"))),r.remove()}),i.appendChild(s),i.appendChild(h),a.appendChild(i),r.appendChild(a),document.body.appendChild(r),r.addEventListener("click",p=>{p.target===r&&r.remove()})}showContextMenu(e,t){const r=document.querySelector(".chatgpt-helper-context-menu");r&&r.remove();const a=l("div",{className:"chatgpt-helper-context-menu",style:{position:"fixed",top:e.clientY+"px",left:e.clientX+"px"}});[{label:t.pinned?this.t("unpinned"):this.t("pinned"),iconName:"pin",action:()=>this.togglePin(t)},{label:this.t("move"),iconName:"folder",action:()=>this.showMoveToFolderDialog(t)},{label:this.t("addTag"),iconName:"tag",action:()=>this.showTagDialog(t)},{label:this.t("delete"),iconName:"trash",danger:!0,action:()=>this.deleteConversation(t)}].forEach(s=>{const h=l("div",{className:`chatgpt-helper-context-menu-item${s.danger?" danger":""}`,role:"menuitem"});h.appendChild(_(s.iconName,{size:14})),h.appendChild(l("span",{},s.label)),h.addEventListener("click",()=>{s.action(),a.remove()}),a.appendChild(h)}),document.body.appendChild(a);const i=()=>{a.remove(),document.removeEventListener("click",i)};setTimeout(()=>document.addEventListener("click",i),100)}togglePin(e){e.pinned=!e.pinned,this.saveData(),this.renderConversationList(),this.showToast(e.pinned?this.t("pinned"):this.t("unpinned"))}deleteConversation(e){const t=e.title||this.t("untitledConversation");confirm(this.t("confirmDeleteConversation").replace("{title}",t.replace(/"/g,"")))&&(delete this.data.conversations[e.id],this.saveData(),this.renderConversationList(),this.showToast(this.t("deleted")))}showTagDialog(e){const t=prompt(this.t("tagPrompt"));if(t!==null){if(this.data.tags||(this.data.tags=[]),t.trim()){let r=this.data.tags.find(a=>a.name.toLowerCase()===t.toLowerCase());if(!r){const a=te(this.settings?.themeConfig?.presetKey||X.presetKey);r={id:"tag_"+Date.now(),name:t.trim(),color:a.primary},this.data.tags.push(r)}e.tagIds||(e.tagIds=[]),e.tagIds.includes(r.id)||e.tagIds.push(r.id)}else delete e.tagIds;this.saveData(),this.renderConversationList(),this.showToast(this.t("tagUpdated"))}}showToast(e){const t=document.getElementById("chatgpt-helper-toast");t&&t.remove();const r=l("div",{id:"chatgpt-helper-toast",className:"chatgpt-helper-toast"},e);document.body.appendChild(r),setTimeout(()=>r.remove(),2e3)}}class dt{constructor(e){this.adapter=e,this.lockManager=null,this.cancelPending=null}get container(){return this.adapter.getScrollContainer?.()||this.adapter.getResponseContainer()||document.scrollingElement}get scrollTop(){return this.container?.scrollTop??window.scrollY}set scrollTop(e){this.scrollTo({top:e,behavior:"instant"})}get scrollHeight(){return this.container?.scrollHeight??document.documentElement.scrollHeight}get clientHeight(){return this.container?.clientHeight??window.innerHeight}cancel(){this.cancelPending?.()}scrollTo(e={}){this.cancel();const t=this.container;if(!t)return;const r=Math.max(0,Math.min(Number(typeof e=="number"?e:e.top)||0,Math.max(0,t.scrollHeight-t.clientHeight))),o=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches?"instant":e.behavior||"smooth",i=this.lockManager;let s=!1;const h=(g=!1)=>{if(!s){s=!0,clearTimeout(c),t.removeEventListener("scrollend",p);for(const m of["wheel","touchstart","pointerdown","keydown"])window.removeEventListener(m,d,!0);i&&(i.navigationActive=!1,i.markUserInteraction()),this.cancelPending=null,e.onComplete?.({cancelled:g===!0,top:t.scrollTop})}},p=()=>h(!1),d=g=>{g?.isTrusted!==!1&&(g?.type==="keydown"&&!["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(g.key)||(t.scrollTo({top:t.scrollTop,behavior:"instant"}),h(!0)))},c=setTimeout(p,1200);this.cancelPending=()=>d(),i&&(i.navigationActive=!0,i.markUserInteraction()),t.addEventListener("scrollend",p,{once:!0});for(const g of["wheel","touchstart","pointerdown","keydown"])window.addEventListener(g,d,{capture:!0,passive:!0});t.scrollTo({top:r,behavior:o})}isAtBottom(e=100){return this.scrollHeight-this.clientHeight-this.scrollTop<=e}}class gt{constructor(e,t,r){this.scrollManager=e,this.showToast=t||(()=>{}),this.t=r||(a=>a),this.isLoading=!1,this.aborted=!1,this.overlay=null}async loadAllAndScrollTop(){if(this.isLoading){this.showToast(this.t("historyLoading"));return}const e=this.scrollManager.container;if(!e){this.showToast(this.t("scrollContainerMissing"));return}this.isLoading=!0,this.aborted=!1;const t=800,r=3,a=50,o=e.scrollHeight;let i=o,s=0,h=0;e.scrollTop=0;const p=()=>{if(this.aborted){this.finish(!1);return}if(h++,h>=a){this.finish(!0);return}e.scrollTop=0,e.dispatchEvent(new WheelEvent("wheel",{deltaY:-100,bubbles:!0})),setTimeout(()=>{if(this.aborted){this.finish(!1);return}const d=e.scrollHeight;if(d>i)i=d,s=0,this.updateOverlayText(`${this.t("historyLoading")} (${Math.round(d/1e3)}k)`),p();else{s++;const c=e.scrollTop<10;h===1&&d===o&&c?this.finish(!1,!0):s>=r?this.finish(!0):(this.updateOverlayText(`${this.t("historyLoading")} (${s}/${r})`),p())}},t)};p()}finish(e,t=!1){this.isLoading=!1,this.aborted=!1,this.hideOverlay(),e&&!t&&this.showToast(this.t("historyLoadComplete"))}abort(){this.aborted=!0}showOverlay(){if(this.overlay)return;const e=l("div",{id:"chatgpt-helper-loading-overlay",className:"chatgpt-helper-loading-overlay"}),t=l("div",{className:"chatgpt-helper-loading-spinner"}),r=l("div",{id:"chatgpt-helper-loading-text",className:"chatgpt-helper-loading-text"},this.t("historyLoading")),a=l("div",{className:"chatgpt-helper-loading-hint"},this.t("pleaseWait")),o=l("button",{className:"chatgpt-helper-loading-stop-btn",type:"button"},this.t("stop"));o.addEventListener("click",()=>this.abort()),e.appendChild(t),e.appendChild(r),e.appendChild(a),e.appendChild(o),document.body.appendChild(e),this.overlay=e}hideOverlay(){this.overlay&&(this.overlay.remove(),this.overlay=null)}updateOverlayText(e){if(this.overlay){const t=this.overlay.querySelector("#chatgpt-helper-loading-text");t&&(t.textContent=e)}}}class ut{constructor(e,t){this.scrollManager=e,this.showToast=t||(()=>{}),this.previousAnchor=null,this.currentAnchor=null,this.onAnchorChange=null}bindUI(e){this.onAnchorChange=e}_captureCurrentPosition(){return{top:this.scrollManager.scrollTop,ts:Date.now()}}setAnchor(e){this.previousAnchor={top:e!==void 0?e:this.scrollManager.scrollTop,ts:Date.now()},this.onAnchorChange&&this.onAnchorChange(!0)}backToAnchor(){if(!this.previousAnchor)return!1;const e=this._captureCurrentPosition();return this.previousAnchor.top!==void 0?(this.scrollManager.scrollTo({top:this.previousAnchor.top,behavior:"smooth"}),this.currentAnchor=this.previousAnchor,this.previousAnchor=e,!0):!1}hasAnchor(){return this.previousAnchor!==null}reset(){this.previousAnchor=null,this.currentAnchor=null,this.onAnchorChange&&this.onAnchorChange(!1)}}class bt{constructor(e,t,r,a){this.settings=e,this.scrollManager=t,this.adapter=r,this.showToast=a||(()=>{}),this.lastSaveTime=0,this.isRecording=!1,this.scrollHandler=null,this.restoredTop=null,this.trailingSaveTimer=null}startRecording(){if(this.isRecording||!this.settings.readingHistory?.persistence)return;this.isRecording=!0,this.scrollHandler=()=>this.handleScroll();const e=this.recordingContainer=this.scrollManager.container;e&&e.addEventListener("scroll",this.scrollHandler,{passive:!0}),window.addEventListener("scroll",this.scrollHandler,{capture:!0,passive:!0})}stopRecording(){if(this.isRecording){if(this.isRecording=!1,this.scrollHandler){const e=this.recordingContainer;this.recordingContainer=null,e&&e.removeEventListener("scroll",this.scrollHandler),window.removeEventListener("scroll",this.scrollHandler,{capture:!0}),this.scrollHandler=null}this.trailingSaveTimer&&(clearTimeout(this.trailingSaveTimer),this.trailingSaveTimer=null)}}handleScroll(){if(!this.settings.readingHistory?.persistence)return;const e=Date.now();e-this.lastSaveTime>1e3&&(this.saveProgress(),this.lastSaveTime=e),this.trailingSaveTimer&&clearTimeout(this.trailingSaveTimer),this.trailingSaveTimer=setTimeout(()=>{this.trailingSaveTimer=null,this.saveProgress()},1200)}getKey(){const e=window.location.href,t=e.match(/\/c\/([^\/\?]+)/)||e.match(/\/chat\/([^\/\?]+)/);return t?`chatgpt:${t[1]}`:null}saveProgress(){if(!this.isRecording||this.adapter.isNewConversation&&this.adapter.isNewConversation())return;const e=this.scrollManager.scrollTop;if(e<0)return;const t=this.getKey();if(!t)return;const r={top:e,ts:Date.now()},a=(typeof window.GM_getValue=="function"?window.GM_getValue("chatgpt_reading_progress",{}):{})||{};!a||typeof a!="object"||(a[t]=r,window.GM_setValue("chatgpt_reading_progress",a))}async restoreProgress(){if(this.cancelRestore?.(),!this.settings.readingHistory?.autoRestore)return!1;const e=this.getKey(),t=window.GM_getValue("chatgpt_reading_progress",{})?.[e];return!t||!Number.isFinite(t.top)||t.top<0?!1:new Promise(r=>{let a=0,o,i=!1;const s=d=>{if(!i){i=!0,clearTimeout(o);for(const c of["wheel","touchstart","pointerdown","keydown"])window.removeEventListener(c,h,!0);this.cancelRestore=null,r(d)}},h=d=>{d?.isTrusted!==!1&&s(!1)};this.cancelRestore=()=>s(!1);for(const d of["wheel","touchstart","pointerdown","keydown"])window.addEventListener(d,h,{capture:!0,passive:!0});const p=()=>{if(!i){if(this.getKey()!==e||a++>=30)return s(!1);this.scrollManager.scrollHeight-this.scrollManager.clientHeight>=t.top?(this.scrollManager.scrollTo({top:t.top,behavior:"instant"}),this.restoredTop=t.top,s(!0)):o=setTimeout(p,500)}};p()})}cleanup(){const e=window.GM_getValue("chatgpt_progress_cleanup_last_run",0),t=Date.now();if(t-e<24*60*60*1e3)return;const r=this.settings.readingHistory?.cleanupDays||30;if(r===-1)return;const a=r*24*60*60*1e3,o=window.GM_getValue("chatgpt_reading_progress",{});let i=!1;Object.keys(o).forEach(s=>{t-o[s].ts>a&&(delete o[s],i=!0)}),i&&window.GM_setValue("chatgpt_reading_progress",o),window.GM_setValue("chatgpt_progress_cleanup_last_run",t)}}class He{constructor(e){this.siteAdapter=e,this.enabled=!1,this.observer=null,this.autoScrollObserver=null,this.cleanupInterval=null,this.lastScrollTop=this.getCurrentScrollTop(),this.lockedScrollTop=this.lastScrollTop,this.listeningContainer=null,this._cachedScrollContainer=null,this._cachedResponseContainer=null,this._cacheTimestamp=0,this._cacheTimeout=2e3,this._debounceTimer=null,this._throttleTimer=null,this._isUpdatingScroll=!1,this._rafId=null,this._pendingScrollUpdate=!1,this._correctionRaf=null,this._lastUserInteractionAt=0,this._lastProgrammaticFixAt=0,this._userIntentWindowMs=480,this._scrollJumpThreshold=140,this._userInputHandler=null,this._lastTouchY=null}getScrollContainer(){const e=Date.now();if(this._cachedScrollContainer&&this._cachedScrollContainer.isConnected&&e-this._cacheTimestamp<this._cacheTimeout)return this._cachedScrollContainer;const t=this.siteAdapter?.getScrollContainer?.(),r=t&&t.isConnected?t:document.scrollingElement||document.documentElement||document.body;return this._cachedScrollContainer=r,this._cacheTimestamp=e,r}getResponseContainer(){const e=Date.now();if(this._cachedResponseContainer&&this._cachedResponseContainer.isConnected&&e-this._cacheTimestamp<this._cacheTimeout)return this._cachedResponseContainer;const t=this.siteAdapter?.getResponseContainer?.()||this.siteAdapter?.getScrollContainer?.();return t&&t.isConnected&&(this._cachedResponseContainer=t,this._cacheTimestamp=e),t}clearCache(){this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null,this._cachedScrollContainer=null,this._cachedResponseContainer=null,this._cacheTimestamp=0}getCurrentScrollTop(){const e=this.getScrollContainer();return e?e.scrollTop||0:window.scrollY||0}refreshContainerListener(){if(!this.onScrollHandler)return;const e=this.getScrollContainer();if(this.listeningContainer===e)return;if(this.listeningContainer)try{this.listeningContainer.removeEventListener("scroll",this.onScrollHandler)}catch{}if(e)try{e.addEventListener("scroll",this.onScrollHandler,{passive:!0})}catch(r){console.error("[ChatGPT Helper] \u6DFB\u52A0\u6EDA\u52A8\u76D1\u542C\u5668\u9519\u8BEF:",r)}this.listeningContainer=e;const t=this.getCurrentScrollTop();this.lastScrollTop=t,this.lockedScrollTop=t}setEnabled(e){this.enabled!==e&&(this.enabled=e,e?this.enable():this.disable())}enable(){this.clearCache(),this.lastScrollTop=this.getCurrentScrollTop(),this.lockedScrollTop=this.lastScrollTop,this.startObserver(),this.startScrollListener(),this.stopAutoScroll()}disable(){this.clearCache(),this.stopObserver(),this.stopScrollListener(),this.stopAutoScroll(),this._correctionRaf&&(cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null),this._isUpdatingScroll=!1}markUserInteraction(){this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null,this._lastUserInteractionAt=Date.now();const e=this.getCurrentScrollTop();this.lastScrollTop=e,this.lockedScrollTop=e}hasRecentUserInteraction(){return Date.now()-this._lastUserInteractionAt<this._userIntentWindowMs}isProtectingPosition(){return!this.enabled||this.navigationActive||this.hasRecentUserInteraction()?!1:!!this.siteAdapter?.isGenerating?.()}startScrollListener(){const e=()=>{const r=this.getCurrentScrollTop();if(!this.enabled){this.lastScrollTop=r,this.lockedScrollTop=r;return}if(this._isUpdatingScroll||Date.now()-this._lastProgrammaticFixAt<80){this.lastScrollTop=r,this.lockedScrollTop=r;return}if(!this.isProtectingPosition()){this.lastScrollTop=r,this.lockedScrollTop=r;return}if(r>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=r},t=r=>{if(this.enabled&&!(r.type==="keydown"&&!["ArrowUp","ArrowDown","PageUp","PageDown","Home","End","Space"].includes(r.key))){if(r.type==="touchmove"&&r.touches&&r.touches.length){const a=r.touches[0].clientY;if(this._lastTouchY!=null&&Math.abs(a-this._lastTouchY)<3)return;this._lastTouchY=a}this.markUserInteraction()}};this.onScrollHandlerOptions={passive:!0,capture:!0},window.addEventListener("scroll",e,this.onScrollHandlerOptions),this.onScrollHandler=e,this._userInputHandler=t,window.addEventListener("wheel",t,{passive:!0,capture:!0}),window.addEventListener("touchstart",t,{passive:!0,capture:!0}),window.addEventListener("touchmove",t,{passive:!0,capture:!0}),window.addEventListener("pointerdown",t,{passive:!0,capture:!0}),window.addEventListener("mousedown",t,{passive:!0,capture:!0}),window.addEventListener("keydown",t,{capture:!0}),this.refreshContainerListener()}stopScrollListener(){this.onScrollHandler&&(window.removeEventListener("scroll",this.onScrollHandler,this.onScrollHandlerOptions||{capture:!0}),this.listeningContainer&&(this.listeningContainer.removeEventListener("scroll",this.onScrollHandler),this.listeningContainer=null),this.onScrollHandler=null,this.onScrollHandlerOptions=null),this._userInputHandler&&(window.removeEventListener("wheel",this._userInputHandler,{capture:!0}),window.removeEventListener("touchstart",this._userInputHandler,{capture:!0}),window.removeEventListener("touchmove",this._userInputHandler,{capture:!0}),window.removeEventListener("pointerdown",this._userInputHandler,{capture:!0}),window.removeEventListener("mousedown",this._userInputHandler,{capture:!0}),window.removeEventListener("keydown",this._userInputHandler,{capture:!0}),this._userInputHandler=null),this._lastTouchY=null}startObserver(){const e=a=>{if(!this.enabled)return;const o=this.getResponseContainer();if(!o)return;let i=!1;for(let s=0;s<Math.min(a.length,10);s++){const h=a[s];if(h.type==="childList"&&h.addedNodes.length>0){for(let p=0;p<Math.min(h.addedNodes.length,5);p++){const d=h.addedNodes[p];if(d.nodeType===1)try{if(o.contains(d)){i=!0;break}}catch{}}if(i)break}}i&&(this._debounceTimer&&clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._updateScrollPosition()},40))};this.observer=new MutationObserver(e);const r=this.getResponseContainer()||document.body;this.observer.observe(r,{childList:!0,subtree:!0}),this.cleanupInterval=setInterval(()=>{this.enabled&&(this.refreshContainerListener(),this._checkAndFixScroll())},1500)}scheduleScrollCorrection(e){this.enabled&&(this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._pendingScrollUpdate=!0,this._correctionRaf=requestAnimationFrame(()=>{this._pendingScrollUpdate=!1,this._correctionRaf=null,this.applyScrollCorrection(e)}))}applyScrollCorrection(e){const t=this.getScrollContainer();if(!(!t||!this.isProtectingPosition())&&!this._isUpdatingScroll)try{this._isUpdatingScroll=!0,typeof t.scrollTo=="function"?t.scrollTo({top:e,behavior:"instant"}):t.scrollTop=e,this._lastProgrammaticFixAt=Date.now(),this.lastScrollTop=e,this.lockedScrollTop=e}catch(r){console.warn("[ChatGPT Helper] \u4FEE\u6B63\u6EDA\u52A8\u4F4D\u7F6E\u5931\u8D25:",r)}finally{setTimeout(()=>{this._isUpdatingScroll=!1},0)}}_updateScrollPosition(){if(this._isUpdatingScroll)return;const e=this.getScrollContainer();if(!e)return;const t=e.scrollTop;if(!this.isProtectingPosition()){this.lastScrollTop=t,this.lockedScrollTop=t;return}if(t>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=t}_checkAndFixScroll(){if(this._isUpdatingScroll)return;const e=this.getScrollContainer();if(!e)return;const t=e.scrollTop;if(!this.isProtectingPosition()){this.lastScrollTop=t,this.lockedScrollTop=t;return}if(t>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=t}stopObserver(){this.observer&&(this.observer.disconnect(),this.observer=null),this.cleanupInterval&&(clearInterval(this.cleanupInterval),this.cleanupInterval=null),this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=null),this._debounceTimer&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._throttleTimer&&(clearTimeout(this._throttleTimer),this._throttleTimer=null),this._correctionRaf&&(cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null),this._isUpdatingScroll=!1,this._pendingScrollUpdate=!1}startAutoScroll(){if(this.autoScrollObserver&&this.stopAutoScroll(),this.enabled)return;let e=null,t=0;const r=200;this.autoScrollObserver=new MutationObserver(i=>{if(this.enabled||Date.now()-t<r)return;const h=this.getResponseContainer();if(!h)return;let p=!1;for(let d=0;d<Math.min(i.length,10);d++){const c=i[d];if(c.type==="childList"&&c.addedNodes.length>0){for(let g=0;g<Math.min(c.addedNodes.length,5);g++){const m=c.addedNodes[g];if(m.nodeType===1)try{if(h.contains(m)){p=!0;break}}catch{}}if(p)break}}p&&(e&&clearTimeout(e),e=setTimeout(()=>{if(this.siteAdapter?.isGenerating?.()){const c=this.getScrollContainer();if(!c)return;if(c.scrollHeight-c.scrollTop-c.clientHeight<=100){const m=Math.max(0,c.scrollHeight-c.clientHeight);try{c.scrollTo({top:m,behavior:"smooth"})}catch{c.scrollTop!==void 0&&(c.scrollTop=m)}t=Date.now()}}},100))});const a=this.getResponseContainer(),o=a||document.body;this.autoScrollObserver.observe(o,{childList:!0,subtree:!!a})}stopAutoScroll(){this.autoScrollObserver&&(this.autoScrollObserver.disconnect(),this.autoScrollObserver=null)}}class mt{constructor(e,t){this.siteAdapter=e,this.widthConfig=t,this.styleElement=null}apply(){if(this.styleElement&&(this.styleElement.remove(),this.styleElement=null),this.widthConfig&&this.widthConfig.enabled){const e=this.generateCSS();this.styleElement=document.createElement("style"),this.styleElement.id="chatgpt-helper-width-styles",this.styleElement.textContent=e,document.head.appendChild(this.styleElement)}}generateCSS(){const e=`${this.widthConfig.value}${this.widthConfig.unit}`;return["main",'[role="main"]','div[class*="flex"][class*="flex-col"]'].map(r=>`${r} { max-width: ${e} !important; margin-left: auto !important; margin-right: auto !important; }`).join(`
`)}updateConfig(e){this.widthConfig=e,this.apply()}}class ft{constructor(e){this.config=e,this.container=e.container,this.settings=e.settings,this.siteAdapter=e.siteAdapter,this.onSettingsChange=e.onSettingsChange,this.onJumpBefore=e.onJumpBefore,this.t=e.i18n||(t=>t),this.state={tree:null,treeKey:"",minLevel:1,expandLevel:this.settings.outline?.maxLevel??6,includeUserQueries:this.settings.outline?.showUserQueries??!1,levelCounts:{},isAllExpanded:!1,rawOutline:[],searchQuery:"",searchLevelManual:!1,searchResults:null,preSearchState:null},this.observer=null,this.updateDebounceTimer=null,this.isActive=!1,this.syncScrollHandler=null,this.syncScrollThrottleTimer=null,this.currentHighlightedItem=null,this.init()}init(){this.createUI(),this.updateAutoUpdateState()}setActive(e){this.isActive=e,this.destroyed=!1,this.updateAutoUpdateState(),this.updateSyncScrollState()}updateAutoUpdateState(){this.settings.outline?.enabled&&this.settings.outline?.autoUpdate&&this.isActive?this.startObserver():this.stopObserver()}updateSyncScrollState(){this.settings.outline?.enabled&&this.settings.outline?.syncScroll&&this.isActive?this.startSyncScroll():this.stopSyncScroll()}startSyncScroll(){const e=this.siteAdapter?.getScrollContainer?.(),t=e===document.scrollingElement?document:e;t===this.syncScrollTarget&&this.syncScrollHandler||(this.stopSyncScroll(),t&&(this.syncScrollTarget=t,this.syncScrollHandler=()=>{this.state.searchQuery||this.syncScrollThrottleTimer||(this.syncScrollThrottleTimer=setTimeout(()=>{this.syncScrollThrottleTimer=null,this.isActive&&this.handleSyncScroll()},100))},t.addEventListener("scroll",this.syncScrollHandler,{passive:!0}),this.handleSyncScroll()))}stopSyncScroll(){this.syncScrollTarget?.removeEventListener("scroll",this.syncScrollHandler),this.syncScrollTarget=null,this.syncScrollHandler=null,clearTimeout(this.syncScrollThrottleTimer),this.syncScrollThrottleTimer=null,this.currentHighlightedItem?.classList.remove("sync-highlight"),this.currentHighlightedItem?.removeAttribute("aria-current"),this.currentHighlightedItem=null,this.navigationTarget=null}getCurrentItem(){const e=this.siteAdapter?.getScrollContainer?.();if(!e||!this.state.tree?.length)return null;const r=(e===document.scrollingElement?0:e.getBoundingClientRect().top)+60;if(this.navigationTarget){const{id:s,settledTop:h}=this.navigationTarget;if(h==null||Math.abs(e.scrollTop-h)<3){const p=this.findItem(s);if(p)return p}this.navigationTarget=null}let a=null,o=null;const i=s=>s.forEach(h=>{h.element?.isConnected&&(h.element.getBoundingClientRect().top<=r+2?a=h:o||(o=h)),i(h.children)});return i(this.state.tree),a||o}findItem(e){const t=r=>{for(const a of r||[]){if(a.id===e)return a;const o=t(a.children);if(o)return o}return null};return t(this.state.tree)}handleSyncScroll(e=this.getCurrentItem()){if(!e)return;this.currentHighlightedItem&&(this.currentHighlightedItem.classList.remove("sync-highlight"),this.currentHighlightedItem.removeAttribute("aria-current"));const t=this.container.querySelector("#outline-list");if(!t)return;let r=t.querySelector(`.outline-item[data-index="${e.index}"]`);if(!r)return;if(r.classList.contains("outline-hidden")){let o=r.previousElementSibling;for(;o;){if(o.classList.contains("outline-item")&&!o.classList.contains("outline-hidden")){const i=parseInt(o.dataset.level,10),s=parseInt(r.dataset.level,10);if(i<s){r=o;break}}o=o.previousElementSibling}if(r.classList.contains("outline-hidden"))return}r.classList.add("sync-highlight"),r.setAttribute("aria-current","location"),this.currentHighlightedItem=r;const a=this.container.querySelector("#outline-list-wrapper");if(a){const o=a.getBoundingClientRect(),i=r.getBoundingClientRect();if(i.top<o.top||i.bottom>o.bottom){const s=i.top-o.top-o.height/2+i.height/2;a.scrollBy({top:s,behavior:"smooth"})}}}startObserver(){if(this.observer)return;const e='main, [role="main"], [data-message-author-role], [data-testid^="conversation-turn-"]',t=r=>r?.closest?.("#chatgpt-helper-right, [data-gh-owned]");this.observer=new MutationObserver(r=>{r.some(o=>{const i=o.target.nodeType===1?o.target:o.target.parentElement;return t(i)?!1:i?.closest(e)?!0:[...o.addedNodes,...o.removedNodes].some(s=>s.nodeType===1&&!t(s)&&(s.matches(e)||s.querySelector(e)))})&&this.triggerAutoUpdate()}),this.observer.observe(document.body,{childList:!0,characterData:!0,subtree:!0})}stopObserver(){this.observer&&(this.observer.disconnect(),this.observer=null),this.updateDebounceTimer&&(clearTimeout(this.updateDebounceTimer),this.updateDebounceTimer=null)}destroy(){this.destroyed=!0,this.isActive=!1,clearTimeout(this.searchDebounceTimer),this.stopObserver(),this.stopSyncScroll()}triggerAutoUpdate(){if(!this.isActive||this.destroyed)return;const e=Math.max(250,Math.min(1e4,(this.settings.outline?.updateInterval??1)*1e3));this.updateDebounceTimer||(this.updateDebounceTimer=setTimeout(()=>{this.executeAutoUpdate()},e))}executeAutoUpdate(){this.updateDebounceTimer&&(clearTimeout(this.updateDebounceTimer),this.updateDebounceTimer=null),!(!this.isActive||this.destroyed)&&(this.config.onAutoUpdate?this.config.onAutoUpdate():window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh")))}createUI(){clearTimeout(this.searchDebounceTimer),this.renderedTreeKey=null,K(this.container);const e=l("div",{className:"outline-content"}),t=l("div",{className:"outline-fixed-toolbar"}),r=l("div",{className:"outline-toolbar-row"}),a=()=>{const w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.setAttribute("viewBox","0 0 16 16"),w.setAttribute("fill","none"),w.setAttribute("stroke","currentColor"),w.setAttribute("stroke-width","2"),w.style.width="14px",w.style.height="14px";const N=document.createElementNS("http://www.w3.org/2000/svg","circle");N.setAttribute("cx","8"),N.setAttribute("cy","8"),N.setAttribute("r","6.5"),w.appendChild(N);const O=document.createElementNS("http://www.w3.org/2000/svg","line");O.setAttribute("x1","4"),O.setAttribute("y1","8"),O.setAttribute("x2","12"),O.setAttribute("y2","8"),w.appendChild(O);const R=document.createElementNS("http://www.w3.org/2000/svg","line");return R.setAttribute("x1","8"),R.setAttribute("y1","4"),R.setAttribute("x2","8"),R.setAttribute("y2","12"),w.appendChild(R),w},o=()=>{const w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.setAttribute("viewBox","0 0 16 16"),w.setAttribute("fill","none"),w.setAttribute("stroke","currentColor"),w.setAttribute("stroke-width","2"),w.style.width="14px",w.style.height="14px";const N=document.createElementNS("http://www.w3.org/2000/svg","circle");N.setAttribute("cx","8"),N.setAttribute("cy","8"),N.setAttribute("r","6.5"),w.appendChild(N);const O=document.createElementNS("http://www.w3.org/2000/svg","line");return O.setAttribute("x1","4"),O.setAttribute("y1","8"),O.setAttribute("x2","12"),O.setAttribute("y2","8"),w.appendChild(O),w};this._createExpandIcon=a,this._createCollapseIcon=o;const i=this.settings.outline?.showUserQueries??!1,s=i?this.t("outlineHideUserQueriesTooltip")||"\u9690\u85CF\u7528\u6237\u63D0\u95EE":this.t("outlineShowUserQueriesTooltip")||"\u663E\u793A\u7528\u6237\u63D0\u95EE",h=l("button",{className:"outline-toolbar-btn"+(i?" active":""),id:"outline-group-btn",title:s},"\u{1F64B}");h.addEventListener("click",()=>this.toggleGroupMode()),r.appendChild(h);const p=l("button",{className:"outline-toolbar-btn",id:"outline-expand-btn",title:this.t("outlineExpandAll")||"\u5C55\u5F00\u5168\u90E8"});p.appendChild(a()),p.addEventListener("click",()=>this.toggleExpandAll()),r.appendChild(p);const d=l("button",{className:"outline-toolbar-btn",id:"outline-locate-btn",title:this.t("outlineLocateCurrent")||"\u5B9A\u4F4D\u5F53\u524D\u4F4D\u7F6E"}),c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("viewBox","0 0 18 18"),c.setAttribute("fill","none"),c.setAttribute("stroke","currentColor"),c.setAttribute("stroke-width","2"),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round"),c.style.width="18px",c.style.height="18px";const g=document.createElementNS("http://www.w3.org/2000/svg","circle");g.setAttribute("cx","9"),g.setAttribute("cy","9"),g.setAttribute("r","4.5"),c.appendChild(g);const m=document.createElementNS("http://www.w3.org/2000/svg","line");m.setAttribute("x1","9"),m.setAttribute("y1","1"),m.setAttribute("x2","9"),m.setAttribute("y2","3.5"),c.appendChild(m);const x=document.createElementNS("http://www.w3.org/2000/svg","line");x.setAttribute("x1","9"),x.setAttribute("y1","14.5"),x.setAttribute("x2","9"),x.setAttribute("y2","17"),c.appendChild(x);const b=document.createElementNS("http://www.w3.org/2000/svg","line");b.setAttribute("x1","1"),b.setAttribute("y1","9"),b.setAttribute("x2","3.5"),b.setAttribute("y2","9"),c.appendChild(b);const L=document.createElementNS("http://www.w3.org/2000/svg","line");L.setAttribute("x1","14.5"),L.setAttribute("y1","9"),L.setAttribute("x2","17"),L.setAttribute("y2","9"),c.appendChild(L),d.appendChild(c),d.addEventListener("click",()=>this.locateCurrentPosition()),r.appendChild(d);const B=l("button",{className:"outline-toolbar-btn",id:"outline-scroll-btn",title:this.t("outlineScrollBottom")||"\u6EDA\u52A8\u5230\u5E95\u90E8"});B.appendChild(_("arrowDown",{size:14})),B.addEventListener("click",()=>this.scrollList()),r.appendChild(B);const S=l("div",{className:"outline-search-wrapper"}),v=l("input",{type:"text",className:"outline-search-input",placeholder:this.t("outlineSearch")||"\u641C\u7D22\u5927\u7EB2...",value:this.state.searchQuery}),I=l("button",{className:"outline-search-clear"+(this.state.searchQuery?"":" hidden"),title:this.t("clear")||"\u6E05\u9664"},"\xD7");v.addEventListener("input",w=>{const N=w.target.value;I.classList.toggle("hidden",!N),clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=setTimeout(()=>{this.handleSearch(N.trim())},300)}),v.addEventListener("keydown",w=>{w.key==="Escape"&&(v.value="",I.classList.add("hidden"),clearTimeout(this.searchDebounceTimer),this.handleSearch(""),v.blur())}),I.addEventListener("click",()=>{v.value="",I.classList.add("hidden"),clearTimeout(this.searchDebounceTimer),this.handleSearch(""),v.focus()}),S.appendChild(v),S.appendChild(I),r.appendChild(S),t.appendChild(r);const D=l("div",{className:"outline-toolbar-row"}),E=l("div",{className:"outline-level-slider-container"}),P=l("div",{className:"outline-level-dots",id:"outline-level-dots"}),q=l("div",{className:"outline-level-line"}),u=l("div",{className:"outline-level-progress",id:"outline-level-progress"});q.appendChild(u),P.appendChild(q);for(let w=0;w<=6;w++){const N=l("div",{className:`outline-level-dot ${w<=this.state.expandLevel?"active":""}`,"data-level":w}),O=l("div",{className:"outline-level-dot-tooltip"});O.textContent=w===0?"\u2296":`H${w}`,N.appendChild(O),N.addEventListener("click",()=>this.setLevel(w)),P.appendChild(N)}E.appendChild(P),D.appendChild(E),t.appendChild(D),e.appendChild(t);const f=l("div",{className:"outline-result-bar hidden",id:"outline-result-bar"});e.appendChild(f);const C=l("div",{className:"outline-list-wrapper",id:"outline-list-wrapper"}),A=l("div",{className:"outline-list",id:"outline-list"});C.appendChild(A),e.appendChild(C),this.container.appendChild(e)}update(e=[]){if(!this.container.querySelector("#outline-list"))return;this.state.rawOutline=e,this.state.includeUserQueries=this.settings.outline?.showUserQueries??!1;const r=JSON.stringify(e.map(({id:h,level:p,text:d,isUserQuery:c})=>[h,p,d,c]));if(r===this.state.treeKey&&this.state.tree){const h=new Map(e.map(d=>[d.id,d])),p=d=>d.forEach(c=>{const g=h.get(c.id);g&&Object.assign(c,g),p(c.children)});p(this.state.tree),this.renderedTreeKey!==r&&this.refreshCurrent();return}const a={};this.state.tree&&this.captureTreeState(this.state.tree,a);const o=e.filter(h=>!h.isUserQuery).map(h=>h.level);this.state.minLevel=o.length?Math.min(...o):1,this.state.tree=this.buildTree(e,this.state.minLevel),this.state.treeKey=r,this.state.levelCounts={};const i=h=>h.forEach(p=>{this.state.levelCounts[p.relativeLevel]=(this.state.levelCounts[p.relativeLevel]||0)+1,i(p.children)});i(this.state.tree),this.updateTooltips();const s=Math.max(this.state.includeUserQueries?0:1,this.state.expandLevel??6);this.initializeCollapsedState(this.state.tree,s),this.restoreTreeState(this.state.tree,a),this.state.searchQuery&&this.performSearch(this.state.searchQuery),this.refreshCurrent()}buildTree(e,t){const r=[],a=[],o=new Map;e.filter(s=>!s.isUserQuery).forEach(s=>{o.set(s.messageId,Math.min(o.get(s.messageId)??6,s.level))});let i;return e.forEach((s,h)=>{const p=s.isUserQuery?0:s.level-(o.get(s.messageId)??t)+1;if(s.messageId!==i){const c=a.find(g=>g.isUserQuery);a.length=0,c&&!s.isUserQuery&&a.push(c),i=s.messageId}const d={...s,relativeLevel:p,index:h,children:[],collapsed:!1,forceExpanded:!1};for(;a.length>0&&a[a.length-1].relativeLevel>=p;)a.pop();a.length===0?r.push(d):a[a.length-1].children.push(d),a.push(d)}),r}initializeCollapsedState(e,t){e.forEach(r=>{if(r.forceExpanded===void 0&&(r.forceExpanded=!1),r.children&&r.children.length>0){const a=r.children.every(o=>o.relativeLevel>t);r.collapsed=a,this.initializeCollapsedState(r.children,t)}else r.collapsed=!1})}captureTreeState(e,t){e.forEach(r=>{const a=r.id||`${r.index}_${r.level}_${r.text}`,o=r.children&&r.children.length>0;t[a]={collapsed:r.collapsed,forceExpanded:r.forceExpanded,hadChildren:o},o&&this.captureTreeState(r.children,t)})}restoreTreeState(e,t){e.forEach(r=>{const a=r.id||`${r.index}_${r.level}_${r.text}`,o=t[a];if(o){const i=r.children&&r.children.length>0;(o.hadChildren||!i)&&(r.collapsed=o.collapsed),o.forceExpanded!==void 0&&(r.forceExpanded=o.forceExpanded)}r.children&&r.children.length>0&&this.restoreTreeState(r.children,t)})}clearForceExpandedState(e,t){e.forEach(r=>{if(r.forceExpanded=!1,r.children&&r.children.length>0){const a=r.children.every(o=>o.relativeLevel>t);r.collapsed=a,this.clearForceExpandedState(r.children,t)}else r.collapsed=!1})}getUserQueryIndex(e){if(!this.state.tree)return 0;let t=0;const r=a=>{for(const o of a){if(o.isUserQuery&&(t++,o.index===e))return t;if(o.children&&o.children.length>0){const i=r(o.children);if(i>0)return i}}return 0};return r(this.state.tree)}refreshCurrent(){const e=this.container.querySelector("#outline-list");if(this.state.tree&&e){if(K(e),this.renderedTreeKey=this.state.treeKey,!this.state.tree.length){e.appendChild(l("div",{className:"outline-empty",role:"status"},this.t("outlineNoContent")));return}let t;this.state.searchQuery&&!this.state.searchLevelManual?t=100:t=this.state.expandLevel??6;const r=this.state.includeUserQueries?0:1;t<r&&(t=r),this.renderItems(e,this.state.tree,this.state.minLevel,t),this.isActive&&this.handleSyncScroll();const a=s=>s.some(h=>h.children.length&&(h.collapsed||a(h.children))),o=Math.max(1,...Object.keys(this.state.levelCounts).map(Number));this.state.isAllExpanded=t>=o&&!a(this.state.tree);const i=this.container.querySelector("#outline-expand-btn");i&&(i.title=this.t(this.state.isAllExpanded?"outlineCollapseAll":"outlineExpandAll"),i.setAttribute("aria-label",i.title),i.replaceChildren(this.state.isAllExpanded?this._createCollapseIcon():this._createExpandIcon()))}}renderItems(e,t,r,a,o=!1,i=!1){const s=this.state.includeUserQueries?0:1;t.forEach(h=>{const p=h.children&&h.children.length>0,d=h.relativeLevel===s;let c;const g=h.relativeLevel<=a||i;if(d)this.state.searchQuery?c=h.isMatch||h.hasMatchedDescendant:c=!0;else{const v=!this.state.searchQuery||h.isMatch||h.hasMatchedDescendant||i;this.state.searchQuery&&!this.state.searchLevelManual?c=v&&!o:this.state.searchQuery&&this.state.searchLevelManual?c=v&&g&&!o:c=g&&!o}o&&(c=!1);let x=`outline-item outline-level-${h.relativeLevel}`;h.isUserQuery&&(x+=" user-query-node");const b=l("div",{className:x,role:"button",tabIndex:0,"aria-label":h.text,"data-index":h.index,"data-outline-id":h.id,"data-level":h.relativeLevel});b.addEventListener("keydown",v=>{v.target===b&&(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),b.click())});const L=p&&!h.collapsed,B=l("span",{className:`outline-item-toggle ${p?L?"expanded":"":"invisible"}`,role:"button",tabIndex:p?0:-1,"aria-label":this.t(L?"outlineCollapseAll":"outlineExpandAll"),"aria-expanded":String(L)},"\u25B8");if(p&&(B.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),v.stopPropagation(),B.click())}),B.addEventListener("click",v=>{v.stopPropagation(),v.preventDefault(),h.collapsed=!h.collapsed,h.collapsed||(h.forceExpanded=!0),B.classList.toggle("expanded",!h.collapsed),this.refreshCurrent()})),b.appendChild(B),h.isUserQuery){const v=this.getUserQueryIndex(h.index),I=l("span",{className:"user-query-badge"}),D=l("span",{className:"user-query-badge-icon"});D.appendChild(_("message",{size:12}));const E=l("span",{className:"user-query-badge-number"},`${v}`);I.appendChild(D),I.appendChild(E),b.appendChild(I)}const S=l("span",{className:"outline-item-text"});if(this.state.searchQuery&&h.isMatch)try{const v=this.state.searchQuery,I=v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),D=new RegExp(`(${I})`,"gi"),E=h.text.split(D);K(S),E.forEach(P=>{if(P.toLowerCase()===v.toLowerCase()){const q=document.createElement("mark");q.textContent=P,q.style.backgroundColor="rgba(255, 235, 59, 0.5)",q.style.color="inherit",q.style.padding="0",q.style.borderRadius="2px",S.appendChild(q)}else S.appendChild(document.createTextNode(P))})}catch{S.textContent=h.text,S.title=h.text}else S.textContent=h.text,S.title=h.text;if(b.appendChild(S),h.isUserQuery){const v=l("span",{className:"outline-item-copy-btn"});v.title="Copy";const I=()=>{const E=document.createElementNS("http://www.w3.org/2000/svg","svg");E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.setAttribute("stroke","currentColor"),E.setAttribute("stroke-width","2"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round"),E.style.width="14px",E.style.height="14px";const P=document.createElementNS("http://www.w3.org/2000/svg","rect");P.setAttribute("x","9"),P.setAttribute("y","9"),P.setAttribute("width","13"),P.setAttribute("height","13"),P.setAttribute("rx","2"),P.setAttribute("ry","2");const q=document.createElementNS("http://www.w3.org/2000/svg","path");return q.setAttribute("d","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"),E.appendChild(P),E.appendChild(q),E},D=()=>{const E=document.createElementNS("http://www.w3.org/2000/svg","svg");E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.setAttribute("stroke","#10b981"),E.setAttribute("stroke-width","2"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round"),E.style.width="14px",E.style.height="14px";const P=document.createElementNS("http://www.w3.org/2000/svg","polyline");return P.setAttribute("points","20 6 9 17 4 12"),E.appendChild(P),E};v.appendChild(I()),v.addEventListener("click",async E=>{E.stopPropagation();try{let P=h.text;h.isTruncated&&h.element&&h.element.isConnected&&(P=this.siteAdapter&&this.siteAdapter.extractUserQueryText?this.siteAdapter.extractUserQueryText(h.element):h.text,P||(P=h.text)),await navigator.clipboard.writeText(P),v.replaceChildren(D()),setTimeout(()=>{v.replaceChildren(I())},1500)}catch(P){console.error("Failed to copy: ",P)}}),b.appendChild(v)}if(b.addEventListener("click",v=>{if(v.target.closest(".outline-item-toggle, .outline-item-copy-btn"))return;const I=this.findItem(h.id)||h;let D=I.element;if((!D||!D.isConnected)&&(D=this.config.resolveItem?.(h)),D&&D.isConnected){this.onJumpBefore&&this.onJumpBefore();const E=this.siteAdapter?.getScrollContainer?.(),P=E&&E!==document.scrollingElement?E.getBoundingClientRect().top:0,q=D.getBoundingClientRect().top-P+(E?.scrollTop??window.scrollY)-60,u={id:h.id,settledTop:null};this.navigationTarget=u,this.handleSyncScroll(I),this.config.onNavigate?.(Math.max(0,q),({cancelled:f,top:C})=>{this.navigationTarget!==u||this.destroyed||(f?(this.navigationTarget=null,this.settings.outline?.syncScroll&&this.handleSyncScroll()):(u.settledTop=C,this.handleSyncScroll(this.findItem(u.id))))}),D.classList.add("outline-highlight"),setTimeout(()=>D.classList.remove("outline-highlight"),2e3)}else console.warn("ChatGPT Helper: Outline item element lost and not found:",h.text)}),c||(b.tabIndex=-1,b.classList.add("outline-hidden")),e.appendChild(b),p){const v=h.collapsed||o;this.renderItems(e,h.children,r,a,v,h.forceExpanded||i)}})}handleSearch(e){if(!e){this.state.searchQuery="",this.state.searchResults=null,this.state.searchLevelManual=!1;const t=this.container.querySelector("#outline-result-bar");if(t&&t.classList.add("hidden"),this.state.tree){const r=this.state.expandLevel??6;this.clearForceExpandedState(this.state.tree,r),this.state.preSearchState&&(this.restoreTreeState(this.state.tree,this.state.preSearchState),this.state.preSearchState=null)}this.refreshCurrent();return}!this.state.searchQuery&&this.state.tree&&(this.state.preSearchState={},this.captureTreeState(this.state.tree,this.state.preSearchState),this.clearForceExpandedState(this.state.tree,0)),this.state.searchQuery=e,this.state.searchLevelManual=!1,this.performSearch(e),this.refreshCurrent()}performSearch(e,t=!0){if(!this.state.tree)return;const r=s=>s.toLowerCase(),a=r(e);let o=0;const i=s=>{let h=!1;return s.forEach(p=>{const d=r(p.text).includes(a);if(d&&o++,p.isMatch=d,p.children&&p.children.length>0){const c=i(p.children);p.hasMatchedDescendant=c}else p.hasMatchedDescendant=!1;p.hasMatchedDescendant&&(p.collapsed=!1),(d||p.hasMatchedDescendant)&&(h=!0)}),h};if(i(this.state.tree),t){const s=this.container.querySelector("#outline-result-bar");s&&(s.textContent=`${o} ${this.t("outlineSearchResult")||"\u4E2A\u7ED3\u679C"}`,s.classList.remove("hidden"))}}toggleGroupMode(){const e=this.container.querySelector("#outline-group-btn");this.settings.outline&&(this.settings.outline.showUserQueries=!this.settings.outline.showUserQueries,this.state.includeUserQueries=this.settings.outline.showUserQueries,e&&(e.classList.toggle("active",this.settings.outline.showUserQueries),this.settings.outline.showUserQueries?e.title=this.t("outlineHideUserQueriesTooltip")||"\u9690\u85CF\u7528\u6237\u63D0\u95EE":e.title=this.t("outlineShowUserQueriesTooltip")||"\u663E\u793A\u7528\u6237\u63D0\u95EE"),this.onSettingsChange&&this.onSettingsChange({showUserQueries:this.settings.outline.showUserQueries}),this.config.onAutoUpdate?this.config.onAutoUpdate():window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh")))}toggleExpandAll(){if(this.container.querySelector("#outline-expand-btn"))if(this.state.isAllExpanded){const t=this.settings.outline?.showUserQueries?0:1;this.setLevel(t)}else{const r=this.state.levelCounts&&Object.keys(this.state.levelCounts).length>0?Math.max(...Object.keys(this.state.levelCounts).map(Number),1):6;this.setLevel(r)}}locateCurrentPosition(){if(!this.state.tree||this.state.tree.length===0||!this.siteAdapter)return;if(this.state.searchQuery){this.handleSearch("");const h=this.container.querySelector(".outline-search-input"),p=this.container.querySelector(".outline-search-clear");h&&(h.value=""),p&&p.classList.add("hidden")}let e=this.getCurrentItem();if(!e)return;const t=(h,p,d=[])=>{for(const c of h){const g=[...d,c];if(c.index===p)return g;if(c.children&&c.children.length>0){const m=t(c.children,p,g);if(m)return m}}return null},r=t(this.state.tree,e.index)||[e];let a=this.state.expandLevel??6;const o=this.state.includeUserQueries?0:1;a<o&&(a=o);let i=e;for(let h=r.length-1;h>=0;h--){const p=r[h];if(p.relativeLevel<=a&&!p.isUserQuery){i=p;break}}e=i;const s=(h,p,d=[])=>{for(const c of h){if(c.index===p)return d.forEach(g=>{g.collapsed=!1,g.forceExpanded=!0}),!0;if(c.children&&c.children.length>0&&s(c.children,p,[...d,c]))return!0}return!1};s(this.state.tree,e.index),this.refreshCurrent(),setTimeout(()=>{const h=this.container.querySelector("#outline-list");if(!h)return;let p=h.querySelector(`.outline-item[data-index="${e.index}"]`);if(!p||p.classList.contains("outline-hidden")){const c=r&&r.length>0?[...r].reverse().map(g=>g.index):[e.index];for(const g of c){const m=h.querySelector(`.outline-item[data-index="${g}"]`);if(m&&!m.classList.contains("outline-hidden")){p=m;break}}}if(!p)return;const d=this.container.querySelector("#outline-list-wrapper");if(d){const c=d.getBoundingClientRect(),g=p.getBoundingClientRect(),m=g.top-c.top-c.height/2+g.height/2;d.scrollBy({top:m,behavior:"smooth"})}p.classList.add("highlight"),setTimeout(()=>p.classList.remove("highlight"),2e3)},50)}setLevel(e){this.state.expandLevel=e,this.state.tree&&this.clearForceExpandedState(this.state.tree,e),this.container.querySelectorAll(".outline-level-dot").forEach(s=>{const h=parseInt(s.dataset.level,10);s.classList.toggle("active",h<=e)});const r=this.container.querySelector("#outline-level-progress");r&&(r.style.width=`${e/6*100}%`),this.state.searchQuery&&(this.state.searchLevelManual=!0);const a=this.container.querySelector("#outline-expand-btn"),i=this.state.levelCounts&&Object.keys(this.state.levelCounts).length>0?Math.max(...Object.keys(this.state.levelCounts).map(Number),1):6;a&&(e>=i?(a.replaceChildren(this._createCollapseIcon?this._createCollapseIcon():document.createTextNode("\u2296")),a.title=this.t("outlineCollapseAll"),this.state.isAllExpanded=!0):(a.replaceChildren(this._createExpandIcon?this._createExpandIcon():document.createTextNode("\u2295")),a.title=this.t("outlineExpandAll"),this.state.isAllExpanded=!1)),this.refreshCurrent()}updateTooltips(){const e=this.container.querySelectorAll(".outline-level-dot"),t=this.settings.outline?.showUserQueries||!1;e.forEach(r=>{const a=parseInt(r.dataset.level,10),o=r.querySelector(".outline-level-dot-tooltip");if(o)if(a===0)o.textContent=t?this.t("outlineOnlyUserQueries")||"\u53EA\u663E\u793A\u7528\u6237\u63D0\u95EE":"\u2296";else{const i=this.state.levelCounts[a]||0;o.textContent=`H${a}: ${i}`}})}scrollList(){const e=this.container.querySelector("#outline-list-wrapper"),t=this.container.querySelector("#outline-scroll-btn");if(!e||!t)return;e.scrollTop+e.clientHeight>=e.scrollHeight-10?(e.scrollTo({top:0,behavior:"smooth"}),J(t,"arrowDown",{size:14}),t.title=this.t("outlineScrollBottom")||"\u6EDA\u52A8\u5230\u5E95\u90E8"):(e.scrollTo({top:e.scrollHeight,behavior:"smooth"}),J(t,"arrowUp",{size:14}),t.title=this.t("outlineScrollTop")||"\u6EDA\u52A8\u5230\u9876\u90E8")}}const jt=["#prompt-textarea",'div[contenteditable="true"][role="textbox"]','textarea[data-id="root"]','textarea[placeholder*="Message"]','textarea[placeholder*="\u6D88\u606F"]'],vt="//",Vt=24,Qt=9;function xt(n){const e=String(n||"").replace(/^\s+/,"");if(!e.startsWith(vt))return null;const t=e.slice(vt.length);return t.startsWith("/")||/\s/.test(t)||t.length>Vt?null:{query:t}}class yt{constructor(e={}){this.getPrompts=e.getPrompts||(()=>[]),this.isEnabled=e.isEnabled||(()=>!0),this.onInsert=e.onInsert||(()=>{}),this.t=e.t||(t=>t),this.menuEl=null,this.items=[],this.activeIndex=0,this.query="",this.composer=null,this.isOpen=!1,this.suppressed=!1,this._started=!1,this._suppressInput=!1}start(){this._started||(this._started=!0,this._onInput=e=>this.handleInput(e),this._onKeyDown=e=>this.handleKeyDown(e),this._onMouseDown=e=>this.handleMouseDown(e),this._onResize=()=>{this.isOpen&&this.positionMenu()},document.addEventListener("input",this._onInput,!0),document.addEventListener("keydown",this._onKeyDown,!0),document.addEventListener("mousedown",this._onMouseDown,!0),window.addEventListener("resize",this._onResize))}stop(){this._started&&(this._started=!1,document.removeEventListener("input",this._onInput,!0),document.removeEventListener("keydown",this._onKeyDown,!0),document.removeEventListener("mousedown",this._onMouseDown,!0),window.removeEventListener("resize",this._onResize),this.close())}destroy(){this.stop(),this.menuEl&&this.menuEl.parentNode&&this.menuEl.parentNode.removeChild(this.menuEl),this.menuEl=null}isComposerEvent(e){const t=e.target;return!t||t.nodeType!==1?!1:!!(t.id==="prompt-textarea"||t.matches&&t.matches('div[contenteditable="true"][role="textbox"]')||t.matches&&t.matches('textarea[data-id="root"]')||t.matches&&t.matches('textarea[placeholder*="Message"]')||t.matches&&t.matches('textarea[placeholder*="\u6D88\u606F"]'))}getComposer(){for(const e of jt){const t=document.querySelector(e);if(t&&t.offsetParent!==null)return t}return null}getComposerText(e){return e?e.tagName==="TEXTAREA"||e.tagName==="INPUT"?e.value||"":e.textContent||"":""}handleInput(e){if(!this._started||e.isComposing)return;if(this._suppressInput){this._suppressInput=!1;return}if(!this.isComposerEvent(e))return;this.composer=e.target;const t=this.isEnabled()?xt(this.getComposerText(this.composer)):null;if(!t){this.suppressed=!1,this.isOpen&&this.close();return}this.suppressed||(this.query=t.query,this.show())}handleKeyDown(e){if(this.isOpen&&!(e.isComposing||e.keyCode===229)){if(!this.isComposerEvent(e)){this.close();return}if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(e.preventDefault(),e.stopPropagation(),this.items.length===0)return;const t=e.key==="ArrowDown"?1:-1;this.activeIndex=(this.activeIndex+t+this.items.length)%this.items.length,this.updateActiveItem();return}if(e.key==="Enter"||e.key==="Tab"){e.preventDefault(),e.stopPropagation(),this.insertActive();return}e.key==="Escape"&&(this.suppressed=!0,this.close())}}handleMouseDown(e){this.isOpen&&(this.menuEl&&e.target&&this.menuEl.contains(e.target)||this.composer&&this.composer.contains&&this.composer.contains(e.target)||this.close())}filterPrompts(){const e=this.getPrompts()||[],t=this.query.toLowerCase();return e.filter(a=>{if(!a)return!1;const o=(a.title||"").toLowerCase(),i=(a.content||"").toLowerCase(),s=(a.category||"").toLowerCase();return t?o.includes(t)||i.includes(t)||s.includes(t):!0}).slice(0,Qt)}show(){this.items=this.filterPrompts(),this.activeIndex=0,this.menuEl||(this.menuEl=this.buildMenu(),this.menuEl.id="chatgpt-helper-quick-menu",document.body.appendChild(this.menuEl)),this.menuEl.classList.add("open"),this.renderItems(),this.positionMenu(),this.isOpen=!0}close(){this.menuEl&&this.menuEl.classList.remove("open"),this.isOpen=!1}buildMenu(){const e=l("div",{className:"gh-quick-menu",role:"listbox","aria-label":"ChatGPT Helper prompts"}),t=l("div",{className:"gh-quick-menu-list"});e.appendChild(t);const r=l("div",{className:"gh-quick-menu-hint"},this.t("quickMenuHint"));return e.appendChild(r),e}renderItems(){const e=this.menuEl.querySelector(".gh-quick-menu-list");if(e){for(;e.firstChild;)e.firstChild.remove();if(this.items.length===0){const t=l("div",{className:"gh-quick-menu-empty"},this.t("quickMenuEmpty"));e.appendChild(t);return}this.items.forEach((t,r)=>{const a=Me(t.content),o=l("div",{className:`gh-quick-menu-item${r===this.activeIndex?" active":""}`,role:"option","aria-selected":String(r===this.activeIndex),"data-index":String(r)}),i=l("span",{className:"gh-quick-menu-item-icon"});i.appendChild(_("edit",{size:13})),o.appendChild(i);const s=l("div",{className:"gh-quick-menu-item-main"});s.appendChild(l("span",{className:"gh-quick-menu-item-title"},t.title||""));const h=l("span",{className:"gh-quick-menu-item-meta"});t.category&&h.appendChild(l("span",{className:"gh-quick-menu-item-category"},t.category)),a.length>0&&h.appendChild(l("span",{className:"gh-quick-menu-item-vars"},`${a.length} {{}}`)),s.appendChild(h),o.appendChild(s),o.addEventListener("mousedown",p=>{p.preventDefault(),p.stopPropagation()}),o.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),this.activeIndex=r,this.insertActive()}),o.addEventListener("mousemove",()=>{this.activeIndex!==r&&(this.activeIndex=r,this.updateActiveItem())}),e.appendChild(o)})}}updateActiveItem(){if(!this.menuEl)return;const e=this.menuEl.querySelectorAll(".gh-quick-menu-item");e.forEach((r,a)=>{const o=a===this.activeIndex;r.classList.toggle("active",o),r.setAttribute("aria-selected",String(o))});const t=e[this.activeIndex];t&&t.scrollIntoView&&t.scrollIntoView({block:"nearest"})}positionMenu(){if(!this.menuEl||!this.composer)return;const e=this.composer.getBoundingClientRect(),t=this.menuEl.getBoundingClientRect();let r=e.left;r+t.width>window.innerWidth-12&&(r=Math.max(12,window.innerWidth-t.width-12));let a=e.top-t.height-8;a<12&&(a=e.bottom+8),this.menuEl.style.left=`${Math.round(r)}px`,this.menuEl.style.top=`${Math.round(a)}px`}insertActive(){const e=this.items[this.activeIndex];if(e){this.close();try{this.onInsert(e)}catch(t){console.error("[ChatGPT Helper] \u5FEB\u901F\u83DC\u5355\u63D2\u5165\u5931\u8D25:",t)}}}replaceComposerText(e){const t=this.composer&&this.composer.isConnected?this.composer:this.getComposer();if(!t)return!1;const r=a=>String(a||"").replace(/\s+/g,"");try{if(t.focus(),t.tagName==="TEXTAREA"||t.tagName==="INPUT")return t.value=e,this._suppressInput=!0,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),!0;const a=()=>{const o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i)};if(a(),this._suppressInput=!0,document.execCommand("insertText",!1,e),r(t.textContent)===r(e))return this._suppressInput=!0,t.dispatchEvent(new Event("input",{bubbles:!0})),!0;try{a(),this._suppressInput=!0,document.execCommand("delete")}catch{}return!1}catch(a){return console.error("[ChatGPT Helper] \u66FF\u6362\u8F93\u5165\u6846\u6587\u672C\u5931\u8D25:",a),!1}}}const wt=["data-latex","data-math","data-formula"],kt=wt.map(n=>`[${n}]`).join(", "),Ct=`.katex, .katex-display, [data-d-component="math"], math, mjx-container, .MathJax, ${kt}`,Wt="body, html, main, article, p, li, td, th, [data-message-author-role], [data-markdown-text-style], [data-content-search-unit-key]";function Yt(n){const e=n?.nodeType===1?n:n?.parentElement;if(!e?.closest||e.closest('pre, code, textarea, [contenteditable="true"]'))return null;const t=e.closest(".katex");if(t)return t;const r=e.closest(Ct);if(!r)return null;const a=r.querySelectorAll(".katex");return a.length>1?null:a[0]||r}function Kt(n){let e=String(n||"").trim(),t;for(const[r,a,o]of[["$$","$$",!0],["\\[","\\]",!0],["\\(","\\)",!1],["$","$",!1]])if(e.length>r.length+a.length&&e.startsWith(r)&&e.endsWith(a)){const i=e.slice(0,-a.length).match(/\\+$/)?.[0].length||0;if(a==="$"&&i%2)continue;e=e.slice(r.length,-a.length).trim(),t=o;break}return{latex:e||null,display:t}}function qe(n){for(const e of wt){const t=n.getAttribute(e);if(t?.trim())return t}return null}function Xt(n){const e=Yt(n);if(!e)return null;const t=Array.from(e.querySelectorAll('annotation[encoding="application/x-tex" i], annotation[encoding="text/x-tex" i]')).map(s=>s.textContent).filter(s=>s?.trim());let r=t.length===1?t[0]:null;if(r||(r=qe(e)),!r&&t.length<=1){const s=Array.from(e.querySelectorAll(kt)).map(qe).filter(Boolean);s.length===1&&(r=s[0])}for(let s=e.parentElement;!r&&s&&!s.matches(Wt)&&!(s.querySelectorAll(".katex").length>1);s=s.parentElement)r=qe(s);const a=Kt(r),o=e.matches("math")?e:e.querySelector("math"),i=!!(e.closest('.katex-display, [data-d-component="math"][data-d-block]')||o?.getAttribute("display")==="block"||a.display===!0);return{root:e,latex:a.latex,display:i}}function Jt(n){return n?.latex?n.display?`$$
${n.latex}
$$`:`$${n.latex}$`:null}class Tt{constructor(e,t,r){this.settings=e,this.showToast=t||(()=>{}),this.t=r||(a=>a),this.formulaCopyInitialized=!1,this.tableCopyInitialized=!1,this.formulaDblClickHandler=null,this.tableObserver=null}initFormulaCopy(){if(this.formulaCopyInitialized)return;this.formulaCopyInitialized=!0;const e="chatgpt-helper-formula-copy-style";if(!document.getElementById(e)){const t=document.createElement("style");t.id=e,t.textContent=`
                :is(${Ct}):not(pre *):not(code *):not([contenteditable="true"] *) {
                    cursor: copy;
                }
                .katex:hover, math:not(.katex *):hover,
                [data-latex]:not(:has(.katex)):hover,
                [data-math]:not(:has(.katex)):hover,
                [data-formula]:not(:has(.katex)):hover {
                    outline: 1px solid var(--gh-primary, #64748b);
                    outline-offset: 3px;
                    border-radius: 3px;
                }
            `,document.head.appendChild(t)}this.formulaDblClickHandler=async t=>{if(this.settings.formulaCopy?.enabled===!1)return;const r=Xt(t.target);if(!r)return;t.preventDefault(),t.stopPropagation();const a=Jt(r);if(!a){this.showToast(this.t("formulaSourceUnavailable"));return}const o=await Ie(a);this.showToast(this.t(o?"formulaCopied":"copyFailed"))},document.addEventListener("dblclick",this.formulaDblClickHandler,!0)}destroyFormulaCopy(){this.formulaCopyInitialized=!1;const e=document.getElementById("chatgpt-helper-formula-copy-style");e&&e.remove(),this.formulaDblClickHandler&&(document.removeEventListener("dblclick",this.formulaDblClickHandler,!0),this.formulaDblClickHandler=null)}initTableCopy(){if(this.tableCopyInitialized)return;this.tableCopyInitialized=!0;const e="chatgpt-helper-table-copy-style";if(!document.getElementById(e)){const t=document.createElement("style");t.id=e,t.textContent=`
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
            `,document.head.appendChild(t)}this.tableObserver=new MutationObserver(t=>{t.forEach(r=>{r.addedNodes.forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){a.tagName==="TABLE"&&this.injectTableButton(a);const o=a.querySelectorAll&&a.querySelectorAll("table");o&&o.forEach(i=>this.injectTableButton(i))}})})}),this.tableObserver.observe(document.body,{childList:!0,subtree:!0}),document.querySelectorAll("table").forEach(t=>{this.injectTableButton(t)})}injectTableButton(e){if(!(e.dataset&&e.dataset.ghTableBtn==="1")){e.dataset&&(e.dataset.ghTableBtn="1");try{let t=e.parentElement;if(!t||(getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.classList.add("chatgpt-helper-table-container"),t.querySelector(".chatgpt-helper-table-copy-btn")))return;const r=document.createElement("button");r.className="chatgpt-helper-table-copy-btn",r.appendChild(_("list",{size:14})),r.title=this.t("copyAsMarkdown"),r.addEventListener("mouseenter",()=>{r.style.opacity="1"}),r.addEventListener("mouseleave",()=>{r.style.opacity="0.7"}),r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const o=this.tableToMarkdown(e);navigator.clipboard.writeText(o).then(()=>{this.showToast(this.t("tableCopied")),J(r,"check",{size:14}),setTimeout(()=>{J(r,"list",{size:14})},1e3)}).catch(i=>{console.error("[TableCopy] Copy failed:",i),this.showToast(this.t("copyFailed"))})}),t.appendChild(r)}catch(t){console.error("[TableCopy] Error injecting button:",t)}}}tableToMarkdown(e){const t=e.querySelectorAll("tr");if(t.length===0)return"";const r=[];let a=!1;const o=i=>{let s=i.innerText||i.textContent||"";return i.querySelectorAll('[class*="katex"], [class*="math"]').forEach(p=>{const d=p.getAttribute("data-latex")||p.getAttribute("data-math")||p.getAttribute("aria-label")||p.textContent;d&&(s=s.replace(p.textContent,`$${d}$`))}),s.trim().replace(/\|/g,"\\|").replace(/\n/g," ").replace(/\s+/g," ")||""};return t.forEach((i,s)=>{const h=i.querySelectorAll("th, td");if(h.length===0)return;const p=Array.from(h).map(o);if(r.push("| "+p.join(" | ")+" |"),!a&&(i.querySelector("th")||s===0)){const d=Array.from(h).map(c=>{const m=getComputedStyle(c).textAlign;return m==="center"?":---:":m==="right"?"---:":"---"});r.push("| "+d.join(" | ")+" |"),a=!0}}),r.join(`
`)}destroyTableCopy(){this.tableCopyInitialized=!1,this.tableObserver&&(this.tableObserver.disconnect(),this.tableObserver=null);const e=document.getElementById("chatgpt-helper-table-copy-style");e&&e.remove(),document.querySelectorAll(".chatgpt-helper-table-copy-btn").forEach(t=>t.remove()),document.querySelectorAll(".chatgpt-helper-table-container").forEach(t=>{t.classList.remove("chatgpt-helper-table-container")}),document.querySelectorAll("table[data-gh-table-btn]").forEach(t=>{delete t.dataset.ghTableBtn})}init(){this.settings.formulaCopy?.enabled!==!1&&this.initFormulaCopy(),this.settings.tableCopy?.enabled!==!1&&this.initTableCopy()}destroy(){this.destroyFormulaCopy(),this.destroyTableCopy()}}const Zt='script, style, link, iframe, object, embed, button, input, textarea, select, [hidden], [aria-hidden="true"]:not(.katex-html), .sr-only, .gh-msg-select-check, [data-gh-owned]',er=new Set("div span p br hr h1 h2 h3 h4 h5 h6 strong b em i u s del a blockquote pre code ul ol li table thead tbody tfoot tr th td img figure figcaption details summary sup sub math semantics annotation mrow mi mn mo mtext mspace msup msub msubsup mfrac msqrt mroot mtable mtr mtd mover munder munderover mpadded mstyle svg path line rect circle g".split(" ")),tr=new Set("alt title colspan rowspan start reversed display encoding xmlns viewBox d fill stroke stroke-width x y x1 y1 x2 y2 width height cx cy r preserveAspectRatio".split(" "));function rr(n,e=!1){try{const t=new URL(n,location.href);return["https:","http:"].includes(t.protocol)||e&&/^(data:image\/(png|jpeg|webp|gif);|blob:)/i.test(n)?t.href:""}catch{return""}}function Ge(n,e,t){const a=n.getMessageContent(e).cloneNode(!0);a.querySelectorAll(Zt).forEach(i=>i.remove());for(const i of[a,...a.querySelectorAll("*")]){if(!er.has(i.localName)){i.replaceWith(...i.childNodes);continue}const s=!!i.closest(".katex, .katex-display");for(const h of[...i.attributes])if(h.name==="href"||h.name==="src"){const p=rr(h.value,h.name==="src");p?i.setAttribute(h.name,p):i.removeAttribute(h.name)}else if(h.name==="class")s||i.removeAttribute("class");else if(h.name==="style"&&s){const d=[...i.style].filter(c=>/^(height|width|min-width|top|left|right|bottom|vertical-align|margin-(left|right|top|bottom)|padding-(left|right|top|bottom)|border-bottom-width|font-size|line-height|position|display)$/.test(c)).map(c=>[c,i.style.getPropertyValue(c)]);i.removeAttribute("style"),d.forEach(([c,g])=>{/^(?:-?[\d.]+(?:em|px|%)?|relative|absolute|inline-block|block)$/.test(g)&&i.style.setProperty(c,g)})}else tr.has(h.name)||i.removeAttribute(h.name);i.localName==="img"&&(i.removeAttribute("width"),i.removeAttribute("height"))}const o=a.cloneNode(!0);return o.querySelectorAll(".katex").forEach(i=>{const s=i.querySelector('annotation[encoding="application/x-tex"]')?.textContent;s&&i.replaceWith(document.createTextNode(i.closest(".katex-display")?`
$$${s}$$
`:`$${s}$`))}),o.querySelectorAll("br").forEach(i=>i.replaceWith(`
`)),o.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, li, pre, tr").forEach(i=>i.append(`
`)),{id:n.getMessageIdentity(e,t),role:n.getMessageRole(e),content:(o.textContent||"").trim(),html:a.innerHTML,order:t}}function nr(n){return n.getChatMessages().map((e,t)=>Ge(n,e,t)).filter(e=>["user","assistant"].includes(e.role)&&(e.content||e.html.includes("<img")))}class Ae{constructor(){this.cleanups=[],this.jobs=new Map,this.disposed=!1}listen(e,t,r,a){return e?.addEventListener(t,r,a),this.cleanups.push(()=>e?.removeEventListener(t,r,a)),r}observe(e,t,r){const a=new MutationObserver(r);return a.observe(e,t),this.cleanups.push(()=>a.disconnect()),a}schedule(e,t,r=100){this.disposed||this.jobs.has(e)||this.jobs.set(e,setTimeout(()=>{this.jobs.delete(e),this.disposed||t()},r))}dispose(){this.disposed=!0,this.jobs.forEach(clearTimeout),this.jobs.clear(),this.cleanups.splice(0).reverse().forEach(e=>e())}}function St(n){return!!(n.target?.nodeType===1?n.target:n.target?.parentElement)?.closest('[id^="chatgpt-helper"], [data-gh-owned], .chatgpt-helper-dialog-overlay, #outline-content')}class At{constructor(e={}){this.t=e.t||(t=>t),this.showToast=e.onToast||(t=>{}),this.observer=null,this.adapter=e.adapter,this.onImageExport=e.onImageExport,this.listeners=new Set,this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.toolbar=null,this.selections=[],this._syncTimer=null,this._started=!1}start(){this._started||(this._started=!0,this.syncTurns(),typeof MutationObserver=="function"&&(this.observer=new MutationObserver(e=>{e.some(t=>!St(t))&&this.scheduleSync()}),this.observer.observe(document.body,{childList:!0,subtree:!0})))}stop(){this._started&&(this._started=!1,this.observer&&(this.observer.disconnect(),this.observer=null),this._syncTimer&&(clearTimeout(this._syncTimer),this._syncTimer=null),this.selections=[],this.removeToolbar(),document.querySelectorAll(".gh-msg-select-check").forEach(e=>e.remove()),document.querySelectorAll(".gh-msg-select-turn").forEach(e=>{e.classList.remove("gh-msg-select-turn","gh-msg-selected")}))}scheduleSync(){this._syncTimer||(this._syncTimer=setTimeout(()=>{this._syncTimer=null,this.syncTurns()},300))}findTurns(){return this.adapter.getChatMessages().filter(e=>["user","assistant"].includes(this.adapter.getMessageRole(e)))}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}refreshContext(){(this.route!==location.pathname||this.main!==this.adapter.getChatContainer())&&(this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.clearSelection()),this.syncTurns(),this.notify()}syncTurns(){if(!this._started)return;(this.route!==location.pathname||this.main!==this.adapter.getChatContainer())&&(this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.clearSelection()),this.findTurns().forEach((t,r)=>{const a=this.adapter.getMessageIdentity(t,r),o=this.selections.some(s=>s.id===a);t.classList.toggle("gh-msg-selected",o);const i=t.querySelector(":scope > .gh-msg-select-check");if(i&&(i.classList.toggle("checked",o),i.setAttribute("aria-pressed",String(o))),!t.querySelector(":scope > .gh-msg-select-check"))try{t.classList.add("gh-msg-select-turn");const s=l("button",{className:"gh-msg-select-check",type:"button",title:this.t("selectMessageTitle"),"aria-label":this.t("selectMessageTitle"),"aria-pressed":String(o),"data-gh-owned":"selection"});s.appendChild(_("check",{size:11})),s.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),this.toggle(t,s)}),t.insertAdjacentElement("afterbegin",s)}catch{}}),this.updateToolbar()}toggle(e,t){const r=this.findTurns().indexOf(e),a=Ge(this.adapter,e,r),o=this.selections.findIndex(i=>i.id===a.id);o!==-1?(this.selections.splice(o,1),e.classList.remove("gh-msg-selected"),t&&(t.classList.remove("checked"),t.setAttribute("aria-pressed","false"))):(this.selections.push(a),e.classList.add("gh-msg-selected"),t&&(t.classList.add("checked"),t.setAttribute("aria-pressed","true"))),this.updateToolbar(),this.notify()}clearSelection(){this.selections=[],document.querySelectorAll(".gh-msg-select-turn.gh-msg-selected").forEach(e=>{e.classList.remove("gh-msg-selected");const t=e.querySelector(":scope > .gh-msg-select-check");t&&(t.classList.remove("checked"),t.setAttribute("aria-pressed","false"))}),this.updateToolbar(),this.notify()}getConversationTitle(){return this.adapter.getSessionName()||"ChatGPT"}collectSelectedMessages(){const e=new Map(this.findTurns().map((t,r)=>[this.adapter.getMessageIdentity(t,r),t]));return this.selections.map(t=>e.has(t.id)?Ge(this.adapter,e.get(t.id),t.order):t).sort((t,r)=>t.order-r.order)}formatToMarkdown(e,t,r){const a=[`# ${e}`,""];return a.push(`> ${this.t("exportTimeLabel")}: ${r}`),a.push(""),t.forEach((o,i)=>{const s=o.role==="user"?`## \u{1F9D1} ${this.t("userRole")}`:"## \u{1F916} ChatGPT";a.push(s),a.push(""),a.push(o.content),i<t.length-1&&a.push("")}),a.join(`
`)}formatToTxt(e,t,r){const a=[`=== ${e} (${r}) ===`,""];return t.forEach(o=>{const i=o.role==="user"?`[${this.t("userRole")}]`:"[ChatGPT]";a.push(i),a.push(o.content),a.push("")}),a.join(`
`)}formatToJson(e,t,r){return JSON.stringify({title:e,exportedAt:r,source:window.location&&window.location.href?window.location.href:"",messages:t.map(({role:a,content:o})=>({role:a,content:o}))},null,2)}sanitizeFilename(e){return String(e||"conversation").replace(/[\\/:*?"<>|\r\n]+/g,"_").replace(/\s+/g," ").trim().slice(0,80)||"conversation"}downloadFile(e,t,r){const a=new Blob([e],{type:r}),o=URL.createObjectURL(a),i=l("a",{href:o,download:t});document.body.appendChild(i),i.click(),setTimeout(()=>{i.remove(),URL.revokeObjectURL(o)},1e3)}exportSelected(e){const t=this.collectSelectedMessages();if(t.length===0){this.showToast(this.t("selectedExportEmpty"));return}const r=this.getConversationTitle(),a=new Date().toLocaleString(),o=new Date().toISOString().slice(0,10),i=`${this.sanitizeFilename(r)}-${o}`;try{e==="md"?this.downloadFile(this.formatToMarkdown(r,t,a),`chatgpt-helper-${i}.md`,"text/markdown"):e==="json"?this.downloadFile(this.formatToJson(r,t,a),`chatgpt-helper-${i}.json`,"application/json"):this.downloadFile(this.formatToTxt(r,t,a),`chatgpt-helper-${i}.txt`,"text/plain"),this.showToast(this.t("selectedExported"))}catch(s){console.error("[ChatGPT Helper] \u5BFC\u51FA\u6240\u9009\u6D88\u606F\u5931\u8D25:",s),this.showToast(this.t("exportFailed"))}}async copySelected(){const e=this.collectSelectedMessages();if(e.length===0){this.showToast(this.t("selectedExportEmpty"));return}const t=this.getConversationTitle(),r=this.formatToMarkdown(t,e,new Date().toLocaleString()),a=await Ie(r);this.showToast(a?this.t("selectedCopied"):this.t("copyFailed"))}ensureToolbar(){if(this.toolbar&&this.toolbar.isConnected)return this.toolbar;this.toolbar=l("div",{id:"chatgpt-helper-msg-select-toolbar",className:"gh-msg-select-toolbar",role:"toolbar","aria-label":"ChatGPT Helper message export","data-gh-owned":"selection"});const e=l("span",{className:"gh-msg-select-toolbar-count"});this.toolbar.appendChild(e);const t=(a,o,i="")=>{const s=l("button",{className:`gh-msg-select-toolbar-btn ${i}`,type:"button"},a);return s.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),o()}),s};this.toolbar.appendChild(t(this.t("exportSelectedImage"),()=>this.onImageExport?.())),this.toolbar.appendChild(t(this.t("exportSelectedMarkdown"),()=>this.exportSelected("md"))),this.toolbar.appendChild(t(this.t("exportSelectedJson"),()=>this.exportSelected("json"))),this.toolbar.appendChild(t(this.t("exportSelectedTxt"),()=>this.exportSelected("txt"))),this.toolbar.appendChild(t(this.t("copySelectedMessages"),()=>{this.copySelected()},"secondary")),this.toolbar.appendChild(t(this.t("clearSelection"),()=>this.clearSelection(),"secondary"));const r=l("button",{className:"gh-msg-select-toolbar-close",type:"button",title:this.t("clearSelection"),"aria-label":this.t("clearSelection")});return r.appendChild(_("close",{size:12})),r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.clearSelection()}),this.toolbar.appendChild(r),document.body.appendChild(this.toolbar),this.toolbar}removeToolbar(){this.toolbar&&this.toolbar.parentNode&&this.toolbar.parentNode.removeChild(this.toolbar),this.toolbar=null}updateToolbar(){const e=this.selections.length;if(e===0){this.toolbar&&this.toolbar.classList.remove("open");return}const t=this.ensureToolbar(),r=t.querySelector(".gh-msg-select-toolbar-count");r&&(r.textContent=(this.t("selectedMessagesCount")||"{count} selected").replace("{count}",String(e))),t.classList.add("open")}}class Et{constructor(e,t,r){this.adapter=e,this.settings=t,this.showToast=r||(()=>{}),this.lastSessionName=null,this.intervalId=null,this.isRunning=!1,this.aiState="idle",this.lastAiState="idle",this.generationObserver=null,this.observerTarget=null,this.notificationAudioContext=null,this.notificationAudioUnlocked=!1,this.pendingNotificationTone=!1,this.notificationUnlockHandler=null}start(){if(this.isRunning)return;this.isRunning=!0,this.updateTabName(),this.settings.tabSettings?.notificationSound&&this.ensureNotificationAudioUnlock();const e=3e3;this.intervalId=setInterval(()=>{if(this.updateTabName(),this.generationObserver){const t=this.adapter.getResponseContainer();t&&t!==this.observerTarget&&(this.generationObserver.observe(t,{childList:!0,subtree:!0,characterData:!0}),this.observerTarget=t)}},e),this.startGenerationObserver()}stop(){this.isRunning&&(this.isRunning=!1,this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.generationObserver&&(this.generationObserver.disconnect(),this.generationObserver=null),this.observerTarget=null,this.teardownNotificationAudioUnlock())}restartInterval(){if(this.isRunning&&this.intervalId){clearInterval(this.intervalId);const e=3e3;this.intervalId=setInterval(()=>this.updateTabName(),e)}}startGenerationObserver(){if(this.generationObserver)return;const e=this.adapter.getResponseContainer();e&&(this.generationObserver=new MutationObserver(()=>{const t=this.adapter.isGenerating();t&&this.aiState!=="generating"?(this.aiState="generating",this.updateTabName()):!t&&this.aiState==="generating"&&this.onAiComplete()}),this.generationObserver.observe(e,{childList:!0,subtree:!0,characterData:!0}),this.observerTarget=e)}onAiComplete(){const e=this.aiState==="generating";this.aiState="completed",e&&this.sendCompletionNotification(),this.updateTabName(!0)}sendCompletionNotification(){const e=this.settings.tabSettings||{};e.notificationSound&&this.playNotificationSound(e.notificationVolume||.5)}ensureNotificationAudioUnlock(){this.notificationUnlockHandler||(this.notificationUnlockHandler=()=>{this.unlockNotificationAudio().then(e=>{e&&this.pendingNotificationTone&&(this.pendingNotificationTone=!1,this.playNotificationSound(this.settings.tabSettings?.notificationVolume||.5))})},["pointerdown","keydown","touchstart"].forEach(e=>{window.addEventListener(e,this.notificationUnlockHandler,{passive:!0,capture:!0})}))}teardownNotificationAudioUnlock(){this.notificationUnlockHandler&&(["pointerdown","keydown","touchstart"].forEach(e=>{window.removeEventListener(e,this.notificationUnlockHandler,{capture:!0})}),this.notificationUnlockHandler=null)}getNotificationAudioContext(){if(this.notificationAudioContext)return this.notificationAudioContext;const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;try{return this.notificationAudioContext=new e,this.notificationAudioContext}catch(t){return console.warn("[ChatGPT Helper] Failed to create AudioContext:",t),null}}async unlockNotificationAudio(){const e=this.getNotificationAudioContext();if(!e)return!1;try{e.state==="suspended"&&await e.resume();const t=e.createGain();t.gain.value=1e-4,t.connect(e.destination);const r=e.createOscillator(),a=e.currentTime;return r.type="sine",r.frequency.value=440,r.connect(t),r.start(a),r.stop(a+.01),this.notificationAudioUnlocked=e.state==="running",this.notificationAudioUnlocked&&this.teardownNotificationAudioUnlock(),this.notificationAudioUnlocked}catch(t){return console.warn("[ChatGPT Helper] Failed to unlock notification sound:",t),!1}}async playNotificationSound(e=.5){const t=Math.max(.1,Math.min(1,Number(e)||.5));this.ensureNotificationAudioUnlock();const r=this.getNotificationAudioContext();if(!r)return this.pendingNotificationTone=!0,!1;if(!await this.unlockNotificationAudio())return this.pendingNotificationTone=!0,!1;try{const o=r.currentTime+.01,i=r.createGain();i.gain.setValueAtTime(1e-4,o),i.gain.exponentialRampToValueAtTime(Math.max(.02,t*.08),o+.01),i.gain.exponentialRampToValueAtTime(1e-4,o+.34),i.connect(r.destination);const s=r.createOscillator();s.type="sine",s.frequency.setValueAtTime(880,o),s.connect(i),s.start(o),s.stop(o+.11);const h=r.createOscillator();return h.type="triangle",h.frequency.setValueAtTime(1320,o+.14),h.connect(i),h.start(o+.14),h.stop(o+.32),this.pendingNotificationTone=!1,!0}catch(o){return console.warn("[ChatGPT Helper] Failed to play notification sound:",o),this.pendingNotificationTone=!0,!1}}togglePrivacyMode(){const e=this.settings.tabSettings||{};return e.privacyMode=!e.privacyMode,this.settings.tabSettings=e,this.updateTabName(!0),e.privacyMode}updateTabName(e=!1){const t=this.settings.tabSettings||{};if(t.privacyMode){document.title=t.privacyTitle||"ChatGPT";return}const r=this.getCleanSessionName(t),a=this.isGenerating(),o=t.showStatus!==!1?a?"\u23F3 ":"\u2705 ":"",i=t.titleFormat||"{status}{title}",s=i.includes("{model}")&&this.adapter.getModelName?this.adapter.getModelName():"";let h=i.replace("{status}",o).replace("{title}",r||"ChatGPT").replace("{model}",s?`[${s}] `:"").replace(/\s+/g," ").trim();h&&(e||h!==document.title)&&(document.title=h)}getCleanSessionName(e){if(this.adapter.isNewConversation&&this.adapter.isNewConversation())return this.lastSessionName=null,null;let t=this.adapter.getSessionName?this.adapter.getSessionName():null;return t&&!(a=>a?!!(/^(?:\u23f3|\u2705)\s*/u.test(a)||/^[⏳✅]/.test(a)||/\[[\w\s.]+\]/.test(a)||a===(e.privacyTitle||"ChatGPT")):!1)(t)?(this.lastSessionName=t,t):this.lastSessionName}isGenerating(){return this.aiState==="completed"?!1:this.aiState==="generating"||(this.adapter.isGenerating?this.adapter.isGenerating():!1)}}class Mt{constructor(){this.textarea=null,this.lastResponseContainer=null,this.accessTokenPromise=null,this.accountIdPromise=null,this.findTextarea()}findTextarea(){this.textarea=null;const e=this.getChatContainer();if(!e)return;const t=['[data-composer-markdown][contenteditable="true"]',"#prompt-textarea",'textarea[placeholder*="Message"]','textarea[placeholder*="\u6D88\u606F"]','textarea[data-id="root"]','div[contenteditable="true"][role="textbox"]','div[contenteditable="true"]',"textarea"];for(const r of t){const a=Array.from(e.querySelectorAll(r)).find(o=>!o.closest('[data-oai-writing-block-surface], [id^="chatgpt-helper"], [data-app-shell-active-page="false"], [hidden], [inert]')&&o.getClientRects().length>0&&getComputedStyle(o).visibility!=="hidden");if(a){this.textarea=a;return}}}getSidebarContainer(){return document.querySelector('nav[aria-label*="Chat history"]')||document.querySelector('nav[aria-label*="\u804A\u5929\u5386\u53F2"]')||document.querySelector('aside[aria-label*="Chat history"]')||document.querySelector('aside[aria-label*="\u804A\u5929\u5386\u53F2"]')||document.querySelector('[data-testid="sidebar"]')||document.querySelector("nav")||document.querySelector("aside")}getChatContainer(){const e=Array.from(document.querySelectorAll('main, [role="main"]')).filter(a=>!a.closest('[data-app-shell-active-page="false"], [hidden]')),t=e.filter(a=>a.closest('[data-app-shell-active-page="true"]')),r=a=>a.getClientRects().length>0&&getComputedStyle(a).visibility!=="hidden";return t.find(r)||t[0]||e.find(r)||null}getMessageRole(e){const r=(e?.getAttribute("data-content-search-unit-key")||e?.getAttribute("data-chatgpt-search-unit-key"))?.split(":").pop();return r==="user"||r==="assistant"?r:e?.getAttribute("data-message-author-role")||e?.getAttribute("data-turn")||e?.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||(e?.matches("[data-chatgpt-selection-message-id]")||e?.querySelector('[data-conversation-role="assistant"], [data-markdown-text-style="assistant-message"], .markdown, .prose')?"assistant":null)}getMessageContent(e){return this.getMessageRole(e)==="user"?e?.querySelector("[data-user-message-bubble] .whitespace-pre-wrap, [data-user-message-bubble]")||e:e?.querySelector('[data-markdown-text-style="assistant-message"], .markdown, .prose, [data-message-content]')||e}getMessageIdentity(e,t){return e.getAttribute("data-message-id")||e.getAttribute("data-chatgpt-selection-message-id")||e.querySelector("[data-chatgpt-selection-message-id]")?.getAttribute("data-chatgpt-selection-message-id")||`${e.closest("[data-turn-key]")?.getAttribute("data-turn-key")||""}:${e.getAttribute("data-content-search-unit-key")||e.getAttribute("data-chatgpt-search-unit-key")||e.closest('[data-testid^="conversation-turn-"]')?.getAttribute("data-testid")||`message-${t}`}`}isScrollableOverflowValue(e){return e==="auto"||e==="scroll"||e==="overlay"}hasScrollableOverflow(e){return e?this.isScrollableOverflowValue(e.overflowY)||this.isScrollableOverflowValue(e.overflow):!1}isScrollableCandidate(e){if(!e||!e.isConnected||e.clientHeight<=0||e.getClientRects().length===0)return!1;const t=window.getComputedStyle(e);return e.scrollHeight>e.clientHeight&&this.hasScrollableOverflow(t)}canScrollElement(e){return this.isScrollableCandidate(e)}cacheResponseContainer(e){return e&&e.isConnected&&(this.lastResponseContainer=e),e}getCachedResponseContainer(){return this.lastResponseContainer?!this.getChatContainer()?.contains(this.lastResponseContainer)||!this.isScrollableCandidate(this.lastResponseContainer)?(this.lastResponseContainer=null,null):this.lastResponseContainer:null}insertPrompt(e){let t=this.textarea;if(!t&&(this.findTextarea(),t=this.textarea,!t))return console.warn("[ChatGPT Helper] \u672A\u627E\u5230\u8F93\u5165\u6846"),!1;if(!t.isConnected&&(this.textarea=null,this.findTextarea(),t=this.textarea,!t))return!1;try{if(t.contentEditable==="true"||t.getAttribute("contenteditable")==="true"){t.focus();const r=window.getSelection(),a=document.createRange();a.selectNodeContents(t),a.collapse(!1),r.removeAllRanges(),r.addRange(a),document.execCommand("insertText",!1,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}else t.tagName==="TEXTAREA"?(t.focus(),t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))):(t.textContent=e,t.dispatchEvent(new Event("input",{bubbles:!0})));return!0}catch(r){return console.error("[ChatGPT Helper] \u63D2\u5165\u63D0\u793A\u8BCD\u5931\u8D25:",r),!1}}getResponseContainer(){const e=this.getCachedResponseContainer();if(e)return e;const t=this.getChatContainer(),r=this.getChatMessages()[0];for(let a=r?.parentElement||t;a;a=a.parentElement)if(a.clientHeight>0&&this.hasScrollableOverflow(window.getComputedStyle(a)))return this.cacheResponseContainer(a);if(t){const a=t.querySelectorAll('[data-scroll-root], [class*="overflow-y-auto"], [class*="overflow-auto"]');for(const o of a)if((!r||o.contains(r))&&o.clientHeight>0&&this.hasScrollableOverflow(window.getComputedStyle(o)))return this.cacheResponseContainer(o)}return document.scrollingElement||document.documentElement}getChatMessages(){const e=this.getChatContainer();if(!e)return[];const t="[data-message-author-role]",r="[data-content-search-unit-key], [data-chatgpt-search-unit-key]",a=`${t}, ${r}, [data-chatgpt-selection-message-id], [data-testid^="conversation-turn-"], article[data-turn]`;return Array.from(e.querySelectorAll(a)).filter(o=>o.closest("#chatgpt-helper-right, [data-gh-owned]")||o.closest('[hidden], [aria-hidden="true"]')?!1:o.hasAttribute("data-message-author-role")?!o.parentElement?.closest("[data-message-author-role]"):o.matches(r)?!o.querySelector(t)&&!o.parentElement?.closest(r)&&!!this.getMessageRole(o):o.matches("[data-chatgpt-selection-message-id]")?!o.parentElement?.closest(`${r}, ${t}, [data-chatgpt-selection-message-id]`):!o.querySelector("[data-message-author-role]")&&!o.parentElement?.closest('[data-testid^="conversation-turn-"], article[data-turn]')&&!!this.getMessageRole(o))}getSessionName(){let e=document.title;if(e&&(e=e.replace(/^[⏳✅]\s*/,"").trim(),e=e.replace(/^\[[\w\s.]+\]\s*/,"").trim(),e&&e!=="ChatGPT"&&e!=="New Chat"))return e;const t=this.getSidebarContainer();if(t){const o=t.querySelector('[aria-current="page"], [data-active="true"], .active');if(o){const i=o.textContent?.trim();if(i&&i!=="New Chat"&&i!=="\u65B0\u5BF9\u8BDD")return i}}const a=window.location.href.match(/\/c\/([a-zA-Z0-9-]+)/);return a?`Chat ${a[1].substring(0,8)}`:null}getModelName(){const e=["[data-model]",'[aria-label*="model"]','[title*="model" i]','select[aria-label*="model" i]',".model-selector",'[class*="model"]'];for(const t of e){const r=document.querySelector(t);if(r){const a=r.getAttribute("data-model")||r.getAttribute("aria-label")||r.getAttribute("title")||r.textContent?.trim();if(a&&a.length<50)return a.replace(/model\s*:?\s*/i,"").trim()}}return null}getBackendApiBaseUrl(){const e=window.location?.origin||"https://chatgpt.com";return{"https://chat.openai.com":"https://chat.openai.com/backend-api","https://chatgpt.com":"https://chatgpt.com/backend-api","https://new.oaifree.com":"https://new.oaifree.com/backend-api"}[e]||`${e}/backend-api`}getPageAccessToken(){return window.__remixContext?.state?.loaderData?.root?.clientBootstrap?.session?.accessToken||window.__NEXT_DATA__?.props?.pageProps?.session?.accessToken||null}async fetchSessionAccessToken(){const e=await fetch(`${window.location.origin}/api/auth/session`,{credentials:"include"});if(!e.ok)throw new Error(`Session request failed: ${e.status}`);const t=await e.json();if(!t?.accessToken)throw new Error("Session response did not include an access token");return this.accessTokenExpiresAt=Date.parse(t.expires)||Date.now()+36e5,t.accessToken}async getAccessToken(){const e=this.pageAccessTokenRejected?null:this.getPageAccessToken();return e||(this.accessTokenExpiresAt&&this.accessTokenExpiresAt-6e4<=Date.now()&&(this.accessTokenPromise=null),this.accessTokenPromise||(this.accessTokenPromise=this.fetchSessionAccessToken().catch(t=>{throw this.accessTokenPromise=null,t})),this.accessTokenPromise)}getCookie(e){return document.cookie.match(`(^|;)\\s*${e}\\s*=\\s*([^;]+)`)?.pop()||""}async fetchBackendResponse(e,t={},r=!0,a=!1){let o=null;try{o=await this.getAccessToken()}catch(h){console.warn("[ChatGPT Helper] \u672A\u80FD\u83B7\u53D6 access token\uFF0C\u5C1D\u8BD5\u4F7F\u7528 Cookie \u4F1A\u8BDD\u8BF7\u6C42:",h)}const i={...t.headers};if(o&&(i.Authorization=`Bearer ${o}`,i["X-Authorization"]=`Bearer ${o}`),r){const h=await this.getTeamAccountId();h&&(i["Chatgpt-Account-Id"]=h)}const s=await fetch(e,{credentials:"include",...t,headers:i});return s.status===401&&!a?(this.accessTokenPromise=null,this.pageAccessTokenRejected=!0,this.fetchBackendResponse(e,t,r,!0)):s}async fetchBackendJson(e,t={},r=!0){const a=await this.fetchBackendResponse(e,t,r);if(!a.ok)throw new Error(`ChatGPT API request failed: ${a.status} ${a.statusText||""}`.trim());return a.json()}async fetchTeamAccountId(){const e=this.getCookie("_account");if(!e)return null;const t=`${this.getBackendApiBaseUrl()}/accounts/check/v4-2023-04-27`;return(await this.fetchBackendJson(t,{},!1))?.accounts?.[e]?.account?.account_id||null}async getTeamAccountId(){return this.accountIdPromise||(this.accountIdPromise=this.fetchTeamAccountId().catch(e=>(console.warn("[ChatGPT Helper] \u83B7\u53D6\u56E2\u961F\u8D26\u53F7 ID \u5931\u8D25\uFF0C\u7EE7\u7EED\u4F7F\u7528\u9ED8\u8BA4\u8D26\u53F7:",e),null))),this.accountIdPromise}parseConversationTimestamp(e){if(!e)return null;if(typeof e=="number")return e<1e12?e*1e3:e;const t=Date.parse(e);return Number.isNaN(t)?null:t}normalizeConversationApiItem(e){if(!e||!e.id||e.is_archived||e.is_temporary_chat)return null;const t=this.parseConversationTimestamp(e.create_time),r=this.parseConversationTimestamp(e.update_time)||t,a=(e.title||"").trim()||W("untitledConversation"),o=new URL(`/c/${e.id}`,window.location.origin).href;return{id:e.id,title:a,url:o,isPinned:!!(e.is_starred||e.pinned_time),createdAt:t,updatedAt:r}}async fetchConversationListFromApi(e=1e3,t=100){const r=[];let a=0;for(;r.length<e;){const o=Math.min(t,e-r.length),i=new URL(`${this.getBackendApiBaseUrl()}/conversations`);i.searchParams.set("offset",String(a)),i.searchParams.set("limit",String(o));const s=await this.fetchBackendJson(i.href),h=Array.isArray(s?.items)?s.items:[];if(h.length===0)break;h.forEach(c=>{const g=this.normalizeConversationApiItem(c);g&&r.length<e&&r.push(g)}),a+=h.length;const p=typeof s.total=="number"?s.total:null,d=typeof s.limit=="number"?s.limit:o;if(p!==null&&a>=p||h.length<d)break}return r}async getConversationList(e={}){try{const t=await this.fetchConversationListFromApi(e.maxConversations||1e3,e.pageSize||100);if(t.length>0)return t;console.warn("[ChatGPT Helper] API \u672A\u8FD4\u56DE\u5386\u53F2\u4F1A\u8BDD\uFF0C\u56DE\u9000\u5230\u4FA7\u8FB9\u680F DOM \u626B\u63CF")}catch(t){console.warn("[ChatGPT Helper] API \u52A0\u8F7D\u5386\u53F2\u4F1A\u8BDD\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u4FA7\u8FB9\u680F DOM \u626B\u63CF:",t)}return this.getConversationListFromDom()}getConversationListFromDom(){const e=this.getSidebarContainer();if(!e)return[];const t=[],r=new Set,a=['a[href^="/c/"]','a[href*="/c/"]','a[href^="/chat/"]','a[href*="/chat/"]','[data-testid*="history"] a[href*="/c/"]','[data-testid*="conversation"] a[href*="/c/"]','[class*="conversation"] a[href*="/c/"]','nav a[href*="/c/"]','aside a[href*="/c/"]',"nav a","aside a",'[class*="conversation"] a','[data-testid*="conversation"] a'];let o=[];for(const i of a)if(o=Array.from(e.querySelectorAll(i)),o.length>0)break;return o.forEach(i=>{const s=i.getAttribute("href");if(!s)return;const h=s.match(/\/c\/([^\/\?]+)/)||s.match(/\/chat\/([^\/\?]+)/);if(!h)return;const p=h[1];if(r.has(p))return;r.add(p);const d=(i.innerText||i.textContent||"").trim().replace(/\s+/g," ")||W("untitledConversation"),c=new URL(s,window.location.origin).href,g=typeof i.closest=="function"?i.closest.bind(i):()=>null,m=g('[class*="pinned"]')!==null||g('[data-pinned="true"]')!==null||i.getAttribute("data-pinned")==="true";let x=null;try{const b=i.querySelector("time[datetime]")||i.closest("li, div, article, section")?.querySelector("time[datetime]");if(b){const L=b.getAttribute("datetime")||b.dateTime,B=Date.parse(L);Number.isNaN(B)||(x=B)}}catch{}t.push({id:p,title:d,url:c,isPinned:m,updatedAt:x})}),t}getSiteId(){return"chatgpt"}extractUserQueryText(e){return e?(e.textContent||e.innerText||"").trim():""}getScrollContainer(){return this.getResponseContainer()}isGenerating(){const e=document.querySelector('button[aria-label*="Stop" i], button[aria-label*="\u505C\u6B62" i], button[data-testid*="stop" i]');if(e&&e.offsetParent!==null)return!0;const t=['[class*="loading"]','[class*="generating"]','[role="progressbar"]','[data-testid*="loading" i]','[aria-busy="true"]'];for(const r of t){const a=document.querySelector(r);if(a&&a.offsetParent!==null)return!0}return!1}}const ar=window.__MY_EXT__=window.__MY_EXT__||{};class or{constructor(){this.scope=new Ae,this.adapter=new Mt,ze(ie()),this.lang=ie(),this.t=W,this.settings=this.loadSettings(),this.prompts=this.loadPrompts(),this.isCollapsed=!this.settings.defaultPanelState,this.currentTab=this.settings.tabOrder[0]||"prompts",this.selectedCategory=W("allCategory"),this.searchQuery="",this.selectedPrompt=null,this.savedAnchorTop=null,this.hasAnchor=!1,this.panel=null,this.outlineManager=null;const e=t=>this.showToast(t);this.scrollManager=new dt(this.adapter),this.historyLoader=new gt(this.scrollManager,e,W),this.anchorManager=new ut(this.scrollManager,e),this.anchorManager.bindUI(t=>{this.hasAnchor=t,this.updateAnchorButton()}),this.readingProgressManager=new bt(this.settings,this.scrollManager,this.adapter,e),this.copyManager=new Tt(this.settings,e,W),this.tabRenameManager=new Et(this.adapter,this.settings,e),this.promptQuickMenu=new yt({getPrompts:()=>this.prompts,isEnabled:()=>this.settings.promptQuickMenuEnabled!==!1,t:t=>this.t(t),onInsert:t=>this.usePrompt(t,{replaceComposer:!0})}),this.messageSelectManager=new At({adapter:this.adapter,t:t=>this.t(t),onToast:e,onImageExport:()=>this.openImageExport()}),this.scrollLockManager=new He(this.adapter),this.scrollManager.lockManager=this.scrollLockManager,this.widthStyleManager=new mt(this.adapter,this.settings.pageWidth),this.currentEffectiveTheme="light",this.themeAssetRepository=new De,this.themeBackgroundObjectUrl=null,this.themeBackgroundObjectAssetId=null,this.themeRuntimeStyleReady=!1,this.themeHostRefreshQueued=!1,ar.getThemeDiagnostics=()=>this.collectThemeDiagnostics(),this.scope.listen(window,"pagehide",t=>{this.themeSettingSaveTimer&&(clearTimeout(this.themeSettingSaveTimer),this.themeSettingSaveTimer=null,this.saveSettings()),t.persisted||this.destroy()}),this.ready=this.init(),this.ready.catch(t=>console.error("[ChatGPT Helper] \u521D\u59CB\u5316\u5931\u8D25:",t))}runFeature(e,t){try{return Promise.resolve(t()).catch(r=>console.error("[ChatGPT Helper] "+e,r))}catch(r){return console.error("[ChatGPT Helper] "+e,r),Promise.resolve()}}destroy(){if(!this.destroyed){this.destroyed=!0,this.onboardingTour?.destroy({restore:!1}),this.themeBackgroundRevision=(this.themeBackgroundRevision||0)+1,this.disposeExporter?.(),this.scope.dispose(),this.pageScope?.dispose(),this.themeScope?.dispose();for(const e of["tabSpacingObserver","panelSpacingObserver","headerSpacingObserver","scrollNavObserver","promptsResponsiveObserver"])this[e]?.disconnect();this.themeObserver?.disconnect(),this.stopThemeHostWatchdog(),this.stopSystemThemeListener(),this.closeThemeSettingsModal(),this.closeAboutModal?.(),this.revokeThemeBackgroundObjectUrl(),this.scrollManager.cancel(),this.historyLoader.abort(),this.readingProgressManager.stopRecording(),this.readingProgressManager.cancelRestore?.(),this.scrollLockManager.setEnabled(!1),this.outlineManager?.destroy(),this.copyManager.destroy(),this.tabRenameManager.stop(),this.promptQuickMenu.destroy(),this.messageSelectManager.stop(),this.conversationManager?.stopAutoSync(),this.panelMessageHandler&&ae()?.onMessage?.removeListener(this.panelMessageHandler)}}}const Lt=["prompts","outline","conversations","export"],ir={enabled:!1,value:1200,unit:"px"},sr=n=>{const e=Array.isArray(n)?n.filter(r=>Lt.includes(r)):[],t=Array.from(new Set(e));return t.length>0?t:[...Lt]},lr=n=>{const e=Array.isArray(n)?n:[],t=Array.from(new Set(e.map(r=>r?.id).filter(r=>ne[r])));return se.forEach(r=>{t.includes(r.id)||t.push(r.id)}),t.map(r=>({id:r,enabled:!0}))},hr={loadPrompts(){const e=new Set(["default_1","default_2"]),t=window.GM_getValue(F.PROMPTS,null);if(!Array.isArray(t))return window.GM_setValue(F.PROMPT_LIBRARY_VERSION,3),pe();if((Number(window.GM_getValue(F.PROMPT_LIBRARY_VERSION,1))||1)>=3)return t;const a=t.filter(h=>!e.has(h?.id)),o=new Set(a.map(h=>h?.id).filter(Boolean)),i=pe().filter(h=>h.id&&!o.has(h.id)),s=i.length>0?[...a,...i]:a;return window.GM_setValue(F.PROMPT_LIBRARY_VERSION,3),(i.length>0||a.length!==t.length)&&window.GM_setValue(F.PROMPTS,s),s},savePrompts(){window.GM_setValue(F.PROMPTS,this.prompts)},normalizeRuntimeSettings(n={}){const e=n&&typeof n=="object"?n:{},t={...ke,panelWidth:Math.max(ce,Math.min(Ce,parseInt(e.panelWidth)||ke.panelWidth)),defaultPanelState:e.defaultPanelState!==void 0?!!e.defaultPanelState:ke.defaultPanelState,preventAutoScroll:!!e.preventAutoScroll,prompts:{enabled:!0},promptSortMode:["manual","recent","frequent"].includes(e.promptSortMode)?e.promptSortMode:"manual",promptQuickMenuEnabled:e.promptQuickMenuEnabled!==!1,outline:{enabled:!0,showUserQueries:e.outline?.showUserQueries!==!1,autoUpdate:!0,syncScroll:e.outline?.syncScroll!==!1,updateInterval:2,maxLevel:6},conversations:{enabled:!0},pageWidth:{...ir},tabOrder:sr(e.tabOrder),collapsedButtonsOrder:lr(e.collapsedButtonsOrder),anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,readingHistory:{persistence:e.readingHistory?.persistence!==!1,autoRestore:!!e.readingHistory?.autoRestore,cleanupDays:30},formulaCopy:{enabled:e.formulaCopy?.enabled!==!1},tableCopy:{enabled:e.tableCopy?.enabled!==!1},tabSettings:{enabled:e.tabSettings?.enabled!==!1,showStatus:e.tabSettings?.showStatus!==!1,notificationSound:!!e.tabSettings?.notificationSound,notificationVolume:Math.max(.1,Math.min(1,Number(e.tabSettings?.notificationVolume)||.5)),titleFormat:e.tabSettings?.titleFormat||"{status}{title}",privacyMode:!!e.tabSettings?.privacyMode,privacyTitle:e.tabSettings?.privacyTitle||"ChatGPT"}};return t.themeConfig=Oe(e.themeConfig,e.themeMode),t.themeMode=null,t},serializeSettingsForStorage(n=this.settings){const e=this.normalizeRuntimeSettings(n||{});return{panelWidth:e.panelWidth,defaultPanelState:e.defaultPanelState,prompts:{enabled:!0},outline:{enabled:!0,showUserQueries:e.outline.showUserQueries,syncScroll:e.outline.syncScroll},conversations:{enabled:!0},tabOrder:[...e.tabOrder],collapsedButtonsOrder:e.collapsedButtonsOrder.map(t=>({...t,enabled:!0})),themeMode:null,themeConfig:e.themeConfig,anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,preventAutoScroll:e.preventAutoScroll,promptSortMode:e.promptSortMode,promptQuickMenuEnabled:e.promptQuickMenuEnabled,readingHistory:{persistence:e.readingHistory.persistence,autoRestore:e.readingHistory.autoRestore},formulaCopy:{enabled:e.formulaCopy.enabled},tableCopy:{enabled:e.tableCopy.enabled},tabSettings:{enabled:e.tabSettings.enabled,showStatus:e.tabSettings.showStatus,notificationSound:e.tabSettings.notificationSound,notificationVolume:e.tabSettings.notificationVolume,titleFormat:e.tabSettings.titleFormat,privacyMode:e.tabSettings.privacyMode,privacyTitle:e.tabSettings.privacyTitle}}},loadSettings(){const n=window.GM_getValue(F.SETTINGS,null);return this.normalizeRuntimeSettings(n)},saveSettings(){const n=this.normalizeRuntimeSettings(this.settings);Object.keys(this.settings).forEach(e=>delete this.settings[e]),Object.assign(this.settings,n),window.GM_setValue(F.SETTINGS,this.serializeSettingsForStorage(this.settings))},async init(){if(this.createStyles(),this.createLayout(),!this.panel)throw new Error("Helper panel could not be mounted");if(this.createUI(),this.createCollapsedButtons(),this.bindEvents(),await this.runFeature("theme",()=>this.initializeThemeSystem()),this.destroyed)return;this.monitorTheme(),this.runFeature("reading history",()=>{this.readingProgressManager.startRecording(),this.readingProgressManager.cleanup(),this.settings.readingHistory?.autoRestore&&this.scope.schedule("restore-reading",()=>{this.runFeature("restore reading",async()=>{await this.readingProgressManager.restoreProgress()&&this.anchorManager.setAnchor(this.readingProgressManager.restoredTop)})},500)}),this.runFeature("page width",()=>this.widthStyleManager.apply()),this.runFeature("copy",()=>this.copyManager.init()),this.settings.tabSettings?.enabled!==!1&&this.runFeature("tab status",()=>this.tabRenameManager.start()),this.settings.promptQuickMenuEnabled!==!1&&this.promptQuickMenu.start(),this.runFeature("message selection",()=>this.messageSelectManager.start()),this.scrollLockManager.setEnabled(!!this.settings.preventAutoScroll);const n=ae();n?.onMessage?.addListener&&(this.panelMessageHandler=e=>{e?.type==="ch-helper-toggle-panel"&&this.toggleCollapse()},n.onMessage.addListener(this.panelMessageHandler)),this.scope.listen(window,"chatgpt-helper-outline-auto-refresh",()=>{this.currentTab==="outline"&&this.refreshOutline()}),this.runFeature("onboarding",()=>this.maybeShowOnboarding())}},pr=`
    :root[data-gh-mode="light"] {
        --gh-page-text: #202123;
        --gh-page-muted: #62676f;
        --gh-page-surface: #ffffff;
        --gh-page-sidebar: var(--gh-page-sidebar-bg-light, #f9f9f9);
        --gh-page-composer: var(--gh-page-composer-bg-light, #ffffff);
    }
    :root[data-gh-mode="dark"] {
        --gh-page-text: #ececf1;
        --gh-page-muted: #b4b4bd;
        --gh-page-surface: #212121;
        --gh-page-sidebar: var(--gh-page-sidebar-bg-dark, #171717);
        --gh-page-composer: var(--gh-page-composer-bg-dark, #2f2f2f);
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
        inset: calc(var(--gh-bg-blur, 5px) * -2);
        z-index: -1;
        pointer-events: none;
        display: none;
        background: var(--gh-bg-image, none) center / cover no-repeat;
        filter: blur(var(--gh-bg-blur, 5px));
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
    :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="light"] :is(.gh-glass-sidebar, #chatgpt-helper-right) {
        box-shadow: inset 0 0 0 9999px rgba(255,255,255,var(--gh-sidebar-enhance-alpha, .2)) !important;
    }
    :root[data-gh-bg-enabled="true"][data-gh-sidebar-enhance="true"][data-gh-mode="dark"] :is(.gh-glass-sidebar, #chatgpt-helper-right) {
        box-shadow: inset 0 0 0 9999px rgba(15,15,16,var(--gh-sidebar-enhance-alpha-dark, .08)) !important;
    }
    :root[data-gh-bg-enabled="false"] .gh-theme-glass-layer { display: none; }
    :root[data-gh-bg-enabled="true"] [data-gh-theme-host-sidebar-shell="true"] :is(a, button):hover {
        background: var(--gh-sidebar-button-bg);
    }
    :root[data-gh-bg-enabled="true"] #chatgpt-helper-right {
        background: var(--gh-right-overlay) !important;
        backdrop-filter: blur(var(--gh-panel-blur));
        transition: transform .2s ease, width .2s ease;
    }
    /* A single glass plane per sidebar. Repeated child filters made small changes
       invisible, and gave the right panel a much denser surface than the left. */
    :root[data-gh-bg-enabled="true"] #chatgpt-helper-right * {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
    }
    :root[data-gh-bg-enabled="true"][data-gh-msg-glass="true"] [data-oai-writing-block-surface] {
        --wb-surface-primary: transparent;
        --oai-wb-surface-primary: transparent;
        background: transparent !important;
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
`,cr={getThemeConfig(){return(!this.settings.themeConfig||typeof this.settings.themeConfig!="object")&&(this.settings.themeConfig=Oe(null,this.settings.themeMode)),this.settings.themeConfig},updateThemeButtons(){const n=this.currentEffectiveTheme==="dark",e=document.getElementById("quick-btn-theme");e&&J(e,n?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"});const t=document.getElementById("chatgpt-helper-header-theme-btn");t&&J(t,n?"sun":"moon",{size:15})},syncHelperThemeMode(n){const e=n==="dark"?"dark":"light";for(const r of[document.documentElement,document.body])r.getAttribute("data-gh-mode")!==e&&r.setAttribute("data-gh-mode",e);const t=this.currentEffectiveTheme!==e;this.currentEffectiveTheme=e,(t||!this.themeButtonsInitialized)&&(this.themeButtonsInitialized=!0,this.updateThemeButtons())},getSystemPreferredTheme(){try{if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"},stopSystemThemeListener(){if(!(!this.systemThemeMediaQuery||!this.systemThemeListener)){try{typeof this.systemThemeMediaQuery.removeEventListener=="function"?this.systemThemeMediaQuery.removeEventListener("change",this.systemThemeListener):typeof this.systemThemeMediaQuery.removeListener=="function"&&this.systemThemeMediaQuery.removeListener(this.systemThemeListener)}catch{}this.systemThemeMediaQuery=null,this.systemThemeListener=null}},startSystemThemeListener(){if(this.stopSystemThemeListener(),!window.matchMedia)return;const n=window.matchMedia("(prefers-color-scheme: dark)"),e=()=>{if(this.getThemeConfig().appearanceMode!=="system")return;const r=n.matches?"dark":"light";this.applyEffectiveTheme(r,{preferNative:!1,persist:!1,fromSystem:!0})};try{typeof n.addEventListener=="function"?n.addEventListener("change",e):typeof n.addListener=="function"&&n.addListener(e)}catch{}this.systemThemeMediaQuery=n,this.systemThemeListener=e},detectEffectiveThemeFromDom(){for(const n of[document.documentElement,document.body]){if(n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light";const e=n.getAttribute("data-theme");if(e==="dark"||e==="light")return e;const t=n.style.colorScheme;if(t==="dark"||t==="light")return t}return this.getSystemPreferredTheme()},directApplyPageTheme(n){const e=n==="dark"?"dark":"light",t=document.documentElement;t.classList.remove("dark-theme","light-theme",e==="dark"?"light":"dark"),t.classList.add(e),document.body.classList.remove("dark","light","dark-theme","light-theme"),document.body.style.removeProperty("color-scheme"),document.body.removeAttribute("data-theme"),document.body.removeAttribute("data-mode"),t.style.colorScheme!==e&&(t.style.colorScheme=e),t.getAttribute("data-theme")!==e&&t.setAttribute("data-theme",e),t.hasAttribute("data-appearance-theme")&&t.setAttribute("data-appearance-theme",e),t.hasAttribute("data-mode")&&t.setAttribute("data-mode",e);try{const r=this.getThemeConfig().appearanceMode==="system"?"system":e;localStorage.setItem("theme",r)}catch{}this.syncHelperThemeMode(e),this.syncNativeThemeScopes(e)},syncNativeThemeScopes(n=this.currentEffectiveTheme){const e=new Set;this.adapter?.getChatContainer?.()?.querySelectorAll("[data-dil-message-id], [data-oai-writing-block-surface]").forEach(t=>{const r=t.closest("[data-theme]");r&&r!==document.documentElement&&r!==document.body&&e.add(r)});for(const t of e)t.getAttribute("data-gh-native-theme")!=="true"&&t.setAttribute("data-gh-native-theme","true"),t.getAttribute("data-theme")!==n&&t.setAttribute("data-theme",n)},async applyEffectiveTheme(n,e={}){const t=n==="dark"?"dark":"light";return this.directApplyPageTheme(t),this.settings.themeMode=t,e.persist&&this.saveSettings(),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState(),t},async applyAppearanceMode(n,e={}){const t={persist:!0,showToast:!1,preferNative:!0,...e},r=this.getThemeConfig(),a=["system","light","dark"].includes(n)?n:"system";if(r.appearanceMode=a,r.updatedAt=new Date().toISOString(),a==="system"){this.startSystemThemeListener();const o=this.getSystemPreferredTheme();await this.applyEffectiveTheme(o,{preferNative:!1,persist:!1,fromSystem:!0})}else this.stopSystemThemeListener(),await this.applyEffectiveTheme(a,{preferNative:t.preferNative,persist:!1});t.persist&&this.saveSettings(),t.showToast&&(a==="dark"?this.showToast(this.t("themeSwitchedDark")):a==="light"&&this.showToast(this.t("themeSwitchedLight")))},applyThemePresetVariables(n,e=!0){const t=this.getThemeConfig(),r=te(n),a=t.presetKey!==r.key;t.presetKey=r.key,a&&(t.updatedAt=new Date().toISOString(),e&&this.saveSettings()),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState()},clearThemeHostMarks(){const n=[...Ne,"data-gh-theme-host-clear"];for(const e of n)document.querySelectorAll(`[${e}]`).forEach(t=>t.removeAttribute(e))},refreshThemeHostTargets(){this.syncNativeThemeScopes();const n=new Map,e=(p,d)=>{p instanceof HTMLElement&&(n.has(p)||n.set(p,new Set),n.get(p).add(d))},t=(p,d=document.body)=>{for(let c=p;c&&c!==d;c=c.parentElement)e(c,"data-gh-theme-host-clear")},r=this.adapter?.getChatContainer?.();e(r,"data-gh-theme-host-main"),e(r,"data-gh-theme-host-chat-list"),t(r),r?.querySelectorAll('.thread-scroll-container, [data-thread-find-target="conversation"], [data-thread-user-message-navigation-content]').forEach(p=>{t(p,r)}),(this.adapter?.getChatMessages?.()||[]).forEach(p=>{t(p.parentElement,r)});const o=this.findSidebarShellByGeometry();e(o,"data-gh-theme-host-sidebar-shell"),e(o,"data-gh-theme-host-sidebar"),t(o),o?.querySelectorAll('nav, [role="navigation"]').forEach(p=>t(p,o));for(const p of o?.children||[])p.matches('.gh-theme-glass-layer, [role="dialog"], [role="menu"]')||e(p,"data-gh-theme-host-clear");this.themeHostLastFoundShell=!!o,this.adapter?.findTextarea?.();const i=this.adapter?.textarea,s=i?.closest('[data-composer-body], form, [data-testid="composer"]'),h=i?.closest('[data-composer-surface-variant], [data-composer-surface], [class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')||s?.querySelector('[class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')||s;e(s,"data-gh-theme-host-composer"),e(h,"data-gh-theme-host-composer-surface"),t(h);for(let p=h?.parentElement;p&&p!==r&&p!==document.body;p=p.parentElement)for(const d of p.children)d.matches(".pointer-events-none.absolute.inset-x-0.bg-surface")&&!d.contains(i)&&e(d,"data-gh-theme-host-clear");for(const p of[...Ne,"data-gh-theme-host-clear"])document.querySelectorAll(`[${p}]`).forEach(d=>{n.get(d)?.has(p)||d.removeAttribute(p)});for(const[p,d]of n)for(const c of d)p.getAttribute(c)!=="true"&&p.setAttribute(c,"true");this.isBackgroundEnabled()&&(o&&this.ensureThemeGlassLayer(o,"sidebar"),h&&this.ensureThemeGlassLayer(h,"composer"),this.ensureThemeBackgroundLayer()),this.themeHostTargets={main:r,sidebar:o,composer:s,surface:h}},queueThemeHostRefresh(){this.destroyed||this.themeHostRefreshQueued||(this.themeHostRefreshQueued=!0,this.themeHostRefreshTimer=setTimeout(()=>{this.themeHostRefreshQueued=!1,this.themeHostRefreshTimer=null,this.destroyed||this.refreshThemeHostTargets()},80))},findSidebarShellByGeometry(){const n=document.querySelectorAll('#stage-slideover-sidebar, #stage-sidebar-tiny-bar, [data-testid="sidebar"], nav[aria-label], aside');for(const e of n){if(e.closest('[id^="chatgpt-helper"]'))continue;const t=e.getBoundingClientRect();if(t.width>=40&&t.width<=Math.max(520,innerWidth*.42)&&t.height>=innerHeight*.4&&t.left<100)return e}return null},startThemeHostWatchdog(){this.themeHostWatchdog||(this.themeHostWatchdog=new MutationObserver(n=>{n.some(e=>e.type==="attributes"?e.attributeName==="data-app-shell-active-page"||e.target.matches('[data-app-shell-active-page], [data-app-shell-page-surface], main, [role="main"]')?!0:e.target.matches('[data-gh-native-theme="true"]')&&e.target.getAttribute("data-theme")!==this.currentEffectiveTheme:[...e.addedNodes].some(t=>t.nodeType===1&&(t.matches("[data-theme], [data-dil-message-id]")||t.querySelector("[data-dil-message-id]")))?!0:e.target.closest?.('[id^="chatgpt-helper"], [data-message-author-role], [data-markdown-text-style]')?!1:[...e.addedNodes,...e.removedNodes].some(t=>t.nodeType===1&&!t.matches?.('[id^="chatgpt-helper"], .gh-theme-glass-layer')))&&this.queueThemeHostRefresh()}),this.themeHostWatchdog.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-theme","data-app-shell-active-page","style","class","hidden","aria-hidden","inert"]}))},stopThemeHostWatchdog(){this.themeHostWatchdog?.disconnect(),this.themeHostWatchdog=null,clearTimeout(this.themeHostRefreshTimer),this.themeHostRefreshTimer=null,this.themeHostRefreshQueued=!1},isBackgroundEnabled(){return document.documentElement.getAttribute("data-gh-bg-enabled")==="true"},ensureThemeGlassLayer(n,e){if(!(n instanceof HTMLElement))return null;try{getComputedStyle(n).position==="static"&&n.setAttribute("data-gh-theme-relative","true")}catch{}const t=e==="composer"?"chatgpt-helper-glass-composer":"chatgpt-helper-glass-sidebar";let r=document.getElementById(t);return r&&r.parentElement!==n&&(r.remove(),r=null),r||(r=document.createElement("div"),r.id=t,r.className=`gh-theme-glass-layer gh-glass-${e}`,r.setAttribute("aria-hidden","true"),n.appendChild(r)),r},removeThemeGlassLayers(){document.querySelectorAll(".gh-theme-glass-layer").forEach(n=>n.remove()),document.querySelectorAll("[data-gh-theme-relative]").forEach(n=>n.removeAttribute("data-gh-theme-relative"))},probeThemeCoverStack(){const n=[],e=(a,o,i,s)=>{if(!(o instanceof HTMLElement))return;const h=o.getBoundingClientRect();h.width<40||h.height<40||n.push({label:a,x:Math.round(h.left+h.width*i),y:Math.round(h.top+h.height*s)})};e("main",document.querySelector("main")||document.querySelector('[role="main"]'),.5,.3),e("sidebar",document.querySelector('[data-gh-theme-host-sidebar-shell="true"]'),.5,.5),e("composer",document.querySelector('[data-gh-theme-host-composer-surface="true"]'),.5,.5);const t=a=>typeof a.id=="string"&&(a.id.startsWith("chatgpt-helper")||a.id==="chatgpt-helper-theme-bg-layer")||typeof a.className=="string"&&a.className.includes("chatgpt-helper"),r={};for(const a of n){const o=[],i=document.querySelectorAll("*");for(const s of i){if(!(s instanceof HTMLElement)||s===document.documentElement||s===document.body||t(s))continue;const h=s.getBoundingClientRect();if(h.width===0||h.height===0||a.x<h.left||a.x>h.right||a.y<h.top||a.y>h.bottom)continue;const p=getComputedStyle(s),d=/^rgba\((?:\d+,\s*){3},\s*([\d.]+)\)/.exec(p.backgroundColor),c=d?parseFloat(d[1]):p.backgroundColor!=="transparent"&&p.backgroundColor!==""?1:0,g=p.backgroundImage!=="none",m=p.backdropFilter!=="none"&&p.backdropFilter!=="";c<=.04&&!g&&!m||o.push({tag:s.tagName.toLowerCase(),id:s.id||void 0,cls:(typeof s.className=="string"?s.className:"").slice(0,80)||void 0,bg:p.backgroundColor.slice(0,36),bi:g?p.backgroundImage.slice(0,50):void 0,bdk:m?p.backdropFilter.slice(0,30):void 0,z:p.zIndex,pos:p.position})}r[a.label]=o.slice(0,12)}return r},collectThemeDiagnostics(){const n=document.querySelector('[data-gh-theme-host-sidebar-shell="true"]'),e=i=>{if(!i)return null;const s=i.getBoundingClientRect();return{tag:i.tagName.toLowerCase(),id:i.id||void 0,cls:(typeof i.className=="string"?i.className:"").slice(0,120)||void 0,rect:{x:Math.round(s.x),y:Math.round(s.y),w:Math.round(s.width),h:Math.round(s.height)},attrs:Array.from(i.attributes).filter(h=>h.name.startsWith("data-gh")).map(h=>h.name)}},t=i=>{if(!i)return null;const s=getComputedStyle(i);return{backgroundColor:s.backgroundColor,backgroundImage:s.backgroundImage.slice(0,90),backdropFilter:s.backdropFilter.slice(0,40),boxShadow:s.boxShadow.slice(0,90),opacity:s.opacity,zIndex:s.zIndex,position:s.position}};let r=[];try{r=Array.from(document.querySelectorAll('#stage-slideover-sidebar, [data-testid="sidebar"], [data-testid*="sidebar"], nav[aria-label], aside[aria-label]')).slice(0,8).map(i=>({...e(i),computed:t(i)}))}catch(i){r=["query failed: "+i.message]}const a=document.getElementById("chatgpt-helper-theme-bg-layer"),o=document.documentElement.style;return{version:he,url:location.href.slice(0,120),viewport:{w:window.innerWidth,h:window.innerHeight},rootAttrs:{bgEnabled:document.documentElement.getAttribute("data-gh-bg-enabled"),mode:document.documentElement.getAttribute("data-gh-mode"),pageTheme:document.documentElement.getAttribute("data-gh-page-theme")},themeConfig:this.getThemeConfig(),hasBackgroundObjectUrl:!!this.themeBackgroundObjectUrl,backgroundReadError:this.themeBackgroundReadError||null,sidebarShell:e(n),sidebarShellComputed:t(n),bgLayerComputed:a?{display:getComputedStyle(a).display,hasImage:getComputedStyle(a).backgroundImage.includes("url"),filter:getComputedStyle(a).filter.slice(0,60),zIndex:getComputedStyle(a).zIndex}:"missing",rootInlineVars:{sidebarBgDark:o.getPropertyValue("--gh-page-sidebar-bg-dark").slice(0,90),sidebarBgLight:o.getPropertyValue("--gh-page-sidebar-bg-light").slice(0,90),panelBlur:o.getPropertyValue("--gh-panel-blur"),enhanceAlphaDark:o.getPropertyValue("--gh-sidebar-enhance-alpha-dark")},sidebarCandidates:r,glassLayers:Array.from(document.querySelectorAll(".gh-theme-glass-layer")).map(i=>{const s=getComputedStyle(i);return{id:i.id,host:i.parentElement?i.parentElement.tagName.toLowerCase()+(i.parentElement.id?"#"+i.parentElement.id:""):null,backdropFilter:s.backdropFilter.slice(0,40),zIndex:s.zIndex,position:s.position,pointerEvents:s.pointerEvents}}),geometricShell:e(this.findSidebarShellByGeometry()),coverProbe:(()=>{try{return this.probeThemeCoverStack()}catch(i){return"probe failed: "+i.message}})()}},ensureThemeRuntimeStyle(){if(document.getElementById("chatgpt-helper-theme-runtime-style"))return;const n=document.createElement("style");n.id="chatgpt-helper-theme-runtime-style",n.textContent=pr,document.head.appendChild(n),this.themeRuntimeStyleReady=!0},ensureThemeBackgroundLayer(){let n=document.getElementById("chatgpt-helper-theme-bg-layer");return n||(n=document.createElement("div"),n.id="chatgpt-helper-theme-bg-layer",n.setAttribute("aria-hidden","true"),document.body.prepend(n)),n},sanitizeCssUrl(n){return n?`url("${String(n).replace(/\\/g,"\\\\").replace(/"/g,'\\"')}")`:"none"},revokeThemeBackgroundObjectUrl(){if(this.themeBackgroundObjectUrl){try{URL.revokeObjectURL(this.themeBackgroundObjectUrl)}catch{}this.themeBackgroundObjectUrl=null,this.themeBackgroundObjectAssetId=null}},async refreshThemeBackgroundState(){if(this.destroyed)return;const n=this.themeBackgroundRevision=(this.themeBackgroundRevision||0)+1,e=this.getThemeConfig(),t=e.backgroundAssetId;if(!e.backgroundImageEnabled||!t){this.revokeThemeBackgroundObjectUrl(),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState();return}if(this.themeBackgroundObjectAssetId===t&&this.themeBackgroundObjectUrl){this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState();return}try{const r=await this.themeAssetRepository.getAsset(t),a=this.getThemeConfig();if(this.destroyed||n!==this.themeBackgroundRevision||a.backgroundAssetId!==t||!a.backgroundImageEnabled)return;const o=r?.blob?URL.createObjectURL(r.blob):null;this.revokeThemeBackgroundObjectUrl(),this.themeBackgroundObjectUrl=o,this.themeBackgroundObjectAssetId=o?t:null,this.themeBackgroundReadError=o?null:"missing"}catch(r){if(this.destroyed||n!==this.themeBackgroundRevision)return;this.themeBackgroundReadError="unavailable",console.error("[ChatGPT Helper] \u8BFB\u53D6\u80CC\u666F\u56FE\u7247\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u914D\u7F6E:",r)}this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState()},scheduleThemeSettingSave(){this.themeSettingSaveTimer&&clearTimeout(this.themeSettingSaveTimer),this.themeSettingSaveTimer=setTimeout(()=>{this.themeSettingSaveTimer=null;try{this.saveSettings()}catch(n){console.error("[ChatGPT Helper] \u4FDD\u5B58\u4E3B\u9898\u8BBE\u7F6E\u5931\u8D25:",n)}},250)},syncThemeSurfaceVariables(n){const e=document.documentElement,t=this.currentEffectiveTheme==="dark",r=this.getThemeConfig(),a=te(r.presetKey),o=Re(a,{isDark:t,canRenderBackground:n,messageIntensity:r.messageGlassIntensity,panelIntensity:r.panelGlassIntensity});Object.entries(o).forEach(([i,s])=>{e.style.getPropertyValue(i)!==s&&e.style.setProperty(i,s)})},updateThemeVisualState(){this.ensureThemeRuntimeStyle();const n=this.getThemeConfig(),e=!!(n.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===n.backgroundAssetId),t=document.documentElement,r=!te(n.presetKey).isOriginal;this.syncHelperThemeMode(this.detectEffectiveThemeFromDom()),(!this.themeHostTargets||e!==this.themeHadBackground)&&this.queueThemeHostRefresh(),this.themeHadBackground=e,t.setAttribute("data-gh-theme-active","true"),t.setAttribute("data-gh-theme-preset",n.presetKey||X.presetKey),t.setAttribute("data-gh-page-theme",r?"true":"false"),t.setAttribute("data-gh-bg-enabled",e?"true":"false"),t.setAttribute("data-gh-msg-glass",n.messageGlassEnabled?"true":"false"),t.setAttribute("data-gh-sidebar-enhance",n.sidebarTextEnhanceEnabled?"true":"false"),t.style.setProperty("--gh-bg-image",this.sanitizeCssUrl(this.themeBackgroundObjectUrl)),t.style.setProperty("--gh-bg-blur",`${Math.round($(n.backgroundBlurPx,0,20))}px`);const a=($(n.sidebarTextEnhanceIntensity,0,100)/100*.65).toFixed(3);t.style.setProperty("--gh-sidebar-enhance-alpha",a),t.style.setProperty("--gh-sidebar-enhance-alpha-dark",a),this.syncThemeSurfaceVariables(e);const o=this.ensureThemeBackgroundLayer();o.style.display=e?"block":"none",o.style.backgroundImage=this.sanitizeCssUrl(this.themeBackgroundObjectUrl),e||this.removeThemeGlassLayers(),this.themeModalRefs&&this.updateThemePreviewCard()},validateThemeBackgroundFile(n){if(!n||!(n instanceof File))throw new Error(this.t("themeImageLoadFailed"));if(!et.includes(n.type))throw new Error(this.t("themeInvalidType"));if(n.size>Ze)throw new Error(this.t("themeFileTooLarge"))},async uploadThemeBackgroundFile(n){this.validateThemeBackgroundFile(n);const e=this.themeAssetOperation=(this.themeAssetOperation||0)+1;if((await createImageBitmap(n).catch(()=>{throw new Error(this.t("themeImageLoadFailed"))})).close(),e!==this.themeAssetOperation)return;const r=await this.themeAssetRepository.putAsset(n,n.type);if(e!==this.themeAssetOperation){await this.themeAssetRepository.deleteAsset(r.id).catch(()=>{});return}const a=this.getThemeConfig(),o=a.backgroundAssetId;a.backgroundAssetId=r.id,a.backgroundImageEnabled=!0,a.updatedAt=new Date().toISOString(),this.saveSettings(),await this.refreshThemeBackgroundState(),o&&o!==r.id&&await this.themeAssetRepository.deleteAsset(o).catch(()=>{}),e===this.themeAssetOperation&&this.showToast(this.t("themeUploadSuccess"))},async removeThemeBackgroundFile(){this.themeAssetOperation=(this.themeAssetOperation||0)+1;const n=this.getThemeConfig(),e=n.backgroundAssetId;n.backgroundImageEnabled=!1,n.backgroundAssetId=null,n.updatedAt=new Date().toISOString(),this.saveSettings(),await this.refreshThemeBackgroundState(),e&&await this.themeAssetRepository.deleteAsset(e).catch(()=>{}),this.showToast(this.t("themeBackgroundRemoved"))},async initializeThemeSystem(){if(this.destroyed)return;const n=this.getThemeConfig();this.refreshThemeHostTargets(),this.applyThemePresetVariables(n.presetKey,!1),await this.applyAppearanceMode(n.appearanceMode,{persist:!1,showToast:!1,preferNative:!1}),await this.refreshThemeBackgroundState(),!this.destroyed&&(this.queueThemeHostRefresh(),this.startThemeHostWatchdog())},syncThemeModalState(){if(!this.themeModalRefs)return;const n=this.themeModalRefs,e=this.getThemeConfig(),t=!!(e.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===e.backgroundAssetId);n.appearanceButtons.system.classList.toggle("active",e.appearanceMode==="system"),n.appearanceButtons.light.classList.toggle("active",e.appearanceMode==="light"),n.appearanceButtons.dark.classList.toggle("active",e.appearanceMode==="dark"),n.presetButtons.forEach(r=>{const a=r.dataset.presetKey===e.presetKey;r.classList.toggle("active",a)}),n.wallpaperEnable.checked=e.backgroundImageEnabled&&!!e.backgroundAssetId,n.blurRange.disabled=!t,n.messageGlass.disabled=!t,n.panelGlassIntensityRange.disabled=!t,n.sidebarEnhance.disabled=!t,n.blurRange.value=`${Math.round($(e.backgroundBlurPx,0,20))}`,n.blurValue.textContent=`${Math.round($(e.backgroundBlurPx,0,20))}px`,n.messageGlass.checked=!!e.messageGlassEnabled,n.messageGlassIntensityRange.disabled=!t||!e.messageGlassEnabled,n.messageGlassIntensityRange.value=`${Math.round($(e.messageGlassIntensity,0,100))}`,n.messageGlassIntensityValue.textContent=`${Math.round($(e.messageGlassIntensity,0,100))}%`,n.panelGlassIntensityRange.value=`${Math.round($(e.panelGlassIntensity,0,100))}`,n.panelGlassIntensityValue.textContent=`${Math.round($(e.panelGlassIntensity,0,100))}%`,n.sidebarEnhance.checked=!!e.sidebarTextEnhanceEnabled,n.sidebarEnhanceRange.disabled=!t||!e.sidebarTextEnhanceEnabled,n.sidebarEnhanceRange.value=`${Math.round($(e.sidebarTextEnhanceIntensity,0,100))}`,n.sidebarEnhanceValue.textContent=`${Math.round($(e.sidebarTextEnhanceIntensity,0,100))}%`,n.removeFileBtn.disabled=!e.backgroundAssetId,n.wallpaperBlock&&n.wallpaperBlock.classList.toggle("no-wallpaper",!t),n.uploadDrop.classList.toggle("has-image",t),n.uploadBg.style.backgroundImage=t?this.sanitizeCssUrl(this.themeBackgroundObjectUrl):"none",this.updateThemePreviewCard()},updateThemePreviewCard(){if(!this.themeModalRefs)return;const n=this.themeModalRefs,e=this.getThemeConfig(),t=!!(e.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===e.backgroundAssetId),r=this.currentEffectiveTheme==="dark",a=te(e.presetKey),o=!te(e.presetKey).isOriginal,i=Re(a,{isDark:r,canRenderBackground:t,messageIntensity:e.messageGlassIntensity,panelIntensity:e.panelGlassIntensity}),s=t||o?r?i["--gh-page-sidebar-bg-dark"]:i["--gh-page-sidebar-bg-light"]:r?"rgba(15, 23, 42, 0.920)":"rgba(255, 255, 255, 0.960)",h=t||o?r?i["--gh-page-composer-bg-dark"]:i["--gh-page-composer-bg-light"]:r?"#334155":"#ffffff",p="transparent",d=t||o?i["--gh-msg-user-bg"]:r?"rgba(51, 65, 85, 0.940)":"rgba(255,255,255,0.920)",c=t&&e.messageGlassEnabled,g=c?i["--gh-msg-assistant-bg"]:"transparent",m=i?i["--gh-panel-card-border"]:r?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.32)",x=i?i["--gh-msg-border"]:m;n.preview.classList.toggle("has-bg",t),n.previewBg.style.backgroundImage=t?this.sanitizeCssUrl(this.themeBackgroundObjectUrl):"none",n.preview.style.setProperty("--gh-preview-blur",`${Math.round($(e.backgroundBlurPx,0,20))}px`),n.previewNav.style.background=s,n.previewNav.style.border=`1px solid ${m}`,n.previewNav.style.boxShadow=e.sidebarTextEnhanceEnabled&&t?`inset 0 0 0 9999px rgba(${r?"15,15,16":"255,255,255"},${($(e.sidebarTextEnhanceIntensity,0,100)/100*.65).toFixed(3)}), inset 0 0 0 1px ${m}`:`inset 0 0 0 1px ${m}`,n.previewNav.style.backdropFilter=t&&i?`blur(${i["--gh-panel-blur"]})`:"none",n.previewChat.style.background=p,n.previewChat.style.border="1px solid transparent",n.previewUserMsg.style.background=d,n.previewAssistantMsg.style.background=g,n.previewUserMsg.style.border=`1px solid ${x}`,n.previewAssistantMsg.style.border=c?`1px solid ${x}`:"1px solid transparent",n.previewUserMsg.style.padding=t?e.messageGlassEnabled?"10px 12px":"8px 10px":"10px 12px",n.previewAssistantMsg.style.padding=c?"14px 18px":"0",n.previewUserMsg.style.borderRadius=t?e.messageGlassEnabled?"24px":"18px":"20px",n.previewAssistantMsg.style.borderRadius=c?"28px":"0",n.previewAssistantMsg.style.backdropFilter=c?`blur(${i["--gh-msg-blur"]})`:"none",n.previewUserMsg.style.backdropFilter=(e.messageGlassEnabled||!t)&&t&&i?`blur(${i["--gh-msg-blur"]})`:"none",n.previewAssistantMsg.style.boxShadow=c?`inset 0 0 0 1px ${x}`:"none",n.previewAssistantMsg.style.color="",n.previewInput.style.background=h,n.previewInput.style.border=`1px solid ${x}`,n.previewInput.style.backdropFilter=t&&i?`blur(${i["--gh-composer-blur"]})`:"none",n.previewInput.style.boxShadow=t&&i?`inset 0 0 0 1px ${x}`:"none"},openAboutModal(n=null){if(this.aboutModal?.isConnected){this.aboutModal.classList.add("open"),this.aboutModal.querySelector(".chatgpt-helper-about-close")?.focus({preventScroll:!0});return}this.aboutModalTrigger=n?.focus?n:document.activeElement;const e=lt()||{},t=e.name||"ChatGPT Helper",r=e.version||he,a="chatgpt-helper-about-title",o="chatgpt-helper-about-description",i=l("div",{id:"chatgpt-helper-about-modal"}),s=l("div",{className:"chatgpt-helper-about-dialog"});s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-labelledby",a),s.setAttribute("aria-describedby",o);const h=l("div",{className:"chatgpt-helper-about-header"});h.appendChild(l("div",{className:"chatgpt-helper-about-hero-glow","aria-hidden":"true"}));const p=l("div",{className:"chatgpt-helper-about-title-wrap"});p.appendChild(ge({size:44,className:"chatgpt-helper-about-logo",title:t}));const d=l("div",{className:"chatgpt-helper-about-title-text"}),c=l("div",{className:"chatgpt-helper-about-name-row"});c.appendChild(l("h2",{className:"chatgpt-helper-about-name",id:a},t)),c.appendChild(l("div",{className:"chatgpt-helper-about-badge"},`v${r}`)),d.appendChild(c),d.appendChild(l("p",{className:"chatgpt-helper-about-tagline",id:o},this.t("aboutTagline")||"A focused productivity layer designed for heavy ChatGPT users")),p.appendChild(d);const g=l("button",{className:"chatgpt-helper-about-close",type:"button",title:this.t("aboutClose")||"Close","aria-label":this.t("aboutClose")||"Close"});g.appendChild(_("close",{size:16})),h.appendChild(p),h.appendChild(g);const m=l("div",{className:"chatgpt-helper-about-body"}),x=l("div",{className:"chatgpt-helper-about-shell"}),b=(R,M={})=>{const z=l("section",{className:`chatgpt-helper-about-section${M.compact?" compact":""}${M.featured?" featured":""}`}),G=l("div",{className:"chatgpt-helper-about-section-head"});if(M.icon){const H=l("span",{className:"chatgpt-helper-about-section-icon"});H.appendChild(_(M.icon,{size:15,strokeWidth:"2.2"})),G.appendChild(H)}return G.appendChild(l("h3",{className:"chatgpt-helper-about-section-title"},R)),z.appendChild(G),M.text&&z.appendChild(l("p",{className:"chatgpt-helper-about-section-text"},M.text)),M.bodyNode&&z.appendChild(M.bodyNode),M.actions&&M.actions.children.length&&z.appendChild(M.actions),z},L=()=>l("div",{className:"chatgpt-helper-about-actions"}),B=(R,M={})=>{const z=l("button",{className:`chatgpt-helper-about-link-btn ${M.variant||"ghost"}${M.disabled?" disabled":""}`,type:"button",disabled:!!M.disabled,title:M.title||R});return M.icon&&z.appendChild(_(M.icon,{size:15,strokeWidth:"2.2"})),z.appendChild(l("span",{},R)),M.onClick&&!M.disabled&&z.addEventListener("click",M.onClick),z},S=l("div",{className:"chatgpt-helper-about-story"});S.appendChild(l("p",{className:"chatgpt-helper-about-section-lead"},this.t("aboutIntro")||"ChatGPT Helper adds a focused side panel for ChatGPT workflows.")),S.appendChild(l("p",{className:"chatgpt-helper-about-section-text"},this.t("aboutMotivationContent")||"This is more than just an extension."));const v=b(this.t("aboutMotivationTitle")||"Motivation",{bodyNode:S,icon:"info",featured:!0}),I=l("ul",{className:"chatgpt-helper-about-feature-list"});[{icon:"edit",label:this.t("aboutFeaturePrompts")||"Prompt management and quick insertion"},{icon:"list",label:this.t("aboutFeatureOutline")||"Automatic outline generation and navigation"},{icon:"message",label:this.t("aboutFeatureConversations")||"Conversation organization and batch actions"},{icon:"export",label:this.t("aboutFeatureExport")||"Multi-format export and reading-position tools"}].forEach((R,M)=>{const z=l("li",{className:"chatgpt-helper-about-feature-item"}),G=l("span",{className:"chatgpt-helper-about-feature-icon"});G.appendChild(_(R.icon,{size:14,strokeWidth:"2.2"})),z.appendChild(G),z.appendChild(l("span",{className:"chatgpt-helper-about-feature-label"},R.label)),I.appendChild(z)});const D=b(this.t("aboutFeaturesTitle")||"Core Features",{bodyNode:I,icon:"list",compact:!0}),E=b(this.t("aboutPrivacyTitle")||"Privacy & Permissions",{text:this.t("aboutPrivacy")||"All settings and data processing stay in your browser.",icon:"shield",compact:!0}),P=l("div",{className:"chatgpt-helper-about-author-block"}),q=l("div",{className:"chatgpt-helper-about-avatar"});q.appendChild(l("img",{src:ae()?.getURL("icons/author-avatar.png")||"icons/author-avatar.png",alt:this.t("aboutAuthorTitle"),width:64,height:64,loading:"lazy"})),P.appendChild(q),P.appendChild(l("p",{className:"chatgpt-helper-about-section-text chatgpt-helper-about-author-bio"},this.t("aboutAuthorBio")||"Author bio coming soon"));const u=L();u.appendChild(B(this.t("aboutAuthorGithub")||"Author GitHub",{variant:"ghost",icon:"user",onClick:()=>de(nt)}));const f=b(this.t("aboutAuthorTitle")||"About the Author",{bodyNode:P,actions:u,compact:!0,icon:"user"}),C=l("div",{className:"chatgpt-helper-about-main-stack"}),A=l("div",{className:"chatgpt-helper-about-side-stack"});C.appendChild(v),C.appendChild(D),A.appendChild(E),A.appendChild(f),x.appendChild(C),x.appendChild(A),m.appendChild(x);const w=l("div",{className:"chatgpt-helper-about-footer"}),N=l("div",{className:"chatgpt-helper-about-footer-actions"});N.appendChild(B(this.t("aboutRepoButton")||"GitHub Repository",{variant:"primary",icon:"github",onClick:()=>de(rt)})),N.appendChild(B(this.t("aboutBugSupport")||"Submit Feedback",{variant:"ghost",icon:"message",onClick:()=>de(tt)})),w.appendChild(N),s.appendChild(h),s.appendChild(m),s.appendChild(w),i.appendChild(s),document.body.appendChild(i);const O=()=>this.closeAboutModal();g.addEventListener("click",O),this.aboutModalBackdropHandler=R=>{R.target===i&&O()},i.addEventListener("click",this.aboutModalBackdropHandler),this.aboutModalEscHandler=R=>{R.key==="Escape"&&(R.preventDefault(),O())},document.addEventListener("keydown",this.aboutModalEscHandler,!0),this.aboutModal=i,this.aboutModalFrame=requestAnimationFrame(()=>{this.aboutModalFrame=null,!(this.aboutModal!==i||!i.isConnected)&&(i.classList.add("open"),g.focus({preventScroll:!0}))})},closeAboutModal(){cancelAnimationFrame(this.aboutModalFrame),this.aboutModalFrame=null;const n=this.aboutModal,e=this.aboutModalTrigger;this.aboutModalBackdropHandler&&n?.removeEventListener("click",this.aboutModalBackdropHandler),this.aboutModalEscHandler&&document.removeEventListener("keydown",this.aboutModalEscHandler,!0),this.aboutModal=null,this.aboutModalTrigger=null,this.aboutModalBackdropHandler=null,this.aboutModalEscHandler=null,n?.remove(),!this.destroyed&&e?.isConnected&&e.focus({preventScroll:!0})},openThemeSettingsModal(n=null){if(this.themeModal?.isConnected){this.syncThemeModalState(),this.themeModal.classList.add("open"),this.themeModal.querySelector(".chatgpt-helper-theme-modal-close")?.focus({preventScroll:!0});return}this.themeModalTrigger=n?.focus?n:document.activeElement;const e=l("div",{id:"chatgpt-helper-theme-modal"}),t=l("div",{className:"chatgpt-helper-theme-modal-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"chatgpt-helper-theme-modal-title"}),r=l("div",{className:"chatgpt-helper-theme-modal-header"}),a=l("div",{className:"chatgpt-helper-theme-modal-title",id:"chatgpt-helper-theme-modal-title"});a.appendChild(_("settings",{size:16,className:"chatgpt-helper-theme-modal-title-icon"})),a.appendChild(l("span",{},this.t("themeDialogTitle")||"Theme")),r.appendChild(a);const o=l("button",{className:"chatgpt-helper-theme-modal-close",type:"button",title:"Close"});o.appendChild(_("close",{size:16})),r.appendChild(o);const i=l("div",{className:"chatgpt-helper-theme-modal-body"}),s=l("div",{className:"chatgpt-helper-theme-main chatgpt-helper-theme-workbench-settings"}),h=l("div",{className:"chatgpt-helper-theme-side chatgpt-helper-theme-workbench-preview"}),p=l("div",{className:"chatgpt-helper-theme-block theme-appearance-block"});p.appendChild(l("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeAppearance")||"Appearance"));const d=l("div",{className:"chatgpt-helper-theme-segment"}),c={system:l("button",{type:"button"},this.t("themeAppearanceSystem")||"System"),light:l("button",{type:"button"},this.t("themeAppearanceLight")||"Light"),dark:l("button",{type:"button"},this.t("themeAppearanceDark")||"Dark")};d.appendChild(c.system),d.appendChild(c.light),d.appendChild(c.dark),p.appendChild(d);const g=l("div",{className:"chatgpt-helper-theme-block theme-colors-block"});g.appendChild(l("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeColorPresets")||"Colors"));const m=l("div",{className:"chatgpt-helper-theme-preset-grid"}),x=[];Pe.forEach(T=>{const U=l("button",{className:"chatgpt-helper-theme-preset",type:"button",title:T.labelKey?this.t(T.labelKey):T.key,"data-preset-key":T.key});T.isOriginal?(U.classList.add("is-original"),U.textContent=this.t(T.labelKey)||"Original"):(U.style.background=T.primary,U.style.color=T.primary),m.appendChild(U),x.push(U)}),g.appendChild(m);const b=l("div",{className:"chatgpt-helper-theme-block theme-wallpaper-block"});b.appendChild(l("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeWallpaper")||"Wallpaper"));const L=l("div",{className:"chatgpt-helper-theme-row"});L.appendChild(l("span",{},this.t("themeEnableWallpaper")||"Enable Wallpaper"));const B=l("input",{type:"checkbox"});L.appendChild(B),b.appendChild(L);const S=l("div",{className:"chatgpt-helper-theme-upload"}),v=l("div",{className:"chatgpt-helper-theme-upload-bg"}),I=l("div",{className:"chatgpt-helper-theme-upload-content"});I.appendChild(_("image",{size:20,className:"chatgpt-helper-theme-upload-icon"})),I.appendChild(l("div",{className:"chatgpt-helper-theme-upload-title"},this.t("themeDropImage")||"Drop image here")),I.appendChild(l("div",{className:"chatgpt-helper-theme-upload-hint"},this.t("themeFileTypes")||"PNG/JPG/WebP up to 5MB"));const D=l("div",{className:"chatgpt-helper-theme-upload-actions"}),E=l("button",{className:"chatgpt-helper-theme-launch-btn",type:"button"},this.t("themeSelectFile")||"Select File"),P=l("button",{className:"chatgpt-helper-theme-launch-btn",type:"button"},this.t("themeRemoveImage")||"Remove");D.appendChild(E),D.appendChild(P),I.appendChild(D),S.appendChild(v),S.appendChild(I),b.appendChild(S);const q=l("input",{type:"file",accept:"image/png,image/jpeg,image/webp",style:{display:"none"}});b.appendChild(q);const u=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});u.appendChild(l("span",{},this.t("themeBlur")||"Blur"));const f=l("div",{className:"chatgpt-helper-theme-range-control"}),C=l("input",{type:"range",min:0,max:20,step:1}),A=l("span",{className:"chatgpt-helper-theme-value"},"5px");f.appendChild(C),f.appendChild(A),u.appendChild(f),b.appendChild(u);const w=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});w.appendChild(l("span",{},this.t("themeMessageGlass")||"Message Glass Effect"));const N=l("input",{type:"checkbox"});w.appendChild(N),b.appendChild(w);const O=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});O.appendChild(l("span",{},this.t("themeMessageGlassIntensity")||"Message Glass Intensity"));const R=l("div",{className:"chatgpt-helper-theme-range-control"}),M=l("input",{type:"range",min:0,max:100,step:1}),z=l("span",{className:"chatgpt-helper-theme-value"},"60%");R.appendChild(M),R.appendChild(z),O.appendChild(R),b.appendChild(O);const G=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});G.appendChild(l("span",{},this.t("themePanelGlassIntensity")||"Side Panel Glass Intensity"));const H=l("div",{className:"chatgpt-helper-theme-range-control"}),j=l("input",{type:"range",min:0,max:100,step:1}),V=l("span",{className:"chatgpt-helper-theme-value"},"45%");H.appendChild(j),H.appendChild(V),G.appendChild(H),b.appendChild(G);const Q=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});Q.appendChild(l("span",{},this.t("themeSidebarEnhance")||"Sidebar Text Enhance"));const ee=l("input",{type:"checkbox"});Q.appendChild(ee),b.appendChild(Q);const $e=l("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});$e.appendChild(l("span",{},this.t("themeSidebarEnhanceIntensity")||"Enhance Intensity"));const Ue=l("div",{className:"chatgpt-helper-theme-range-control"}),me=l("input",{type:"range",min:0,max:100,step:1}),je=l("span",{className:"chatgpt-helper-theme-value"},"20%");Ue.appendChild(me),Ue.appendChild(je),$e.appendChild(Ue),b.appendChild($e);for(const[T,U]of[[B,"themeEnableWallpaper"],[C,"themeBlur"],[N,"themeMessageGlass"],[M,"themeMessageGlassIntensity"],[j,"themePanelGlassIntensity"],[ee,"themeSidebarEnhance"],[me,"themeSidebarEnhanceIntensity"]])T.setAttribute("aria-label",this.t(U));s.appendChild(p),s.appendChild(g),s.appendChild(b),h.appendChild(l("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeLivePreview")||"Live Preview"));const Ee=l("div",{className:"chatgpt-helper-theme-preview"}),_t=l("div",{className:"chatgpt-helper-theme-preview-bg"}),Ve=l("div",{className:"chatgpt-helper-theme-preview-inner"}),Qe=l("div",{className:"chatgpt-helper-theme-preview-nav"});for(let T=0;T<5;T++){const U=l("div",{style:{height:"20px",marginBottom:"10px",borderRadius:"999px",background:T===2?"color-mix(in srgb, var(--gh-primary), transparent 30%)":"color-mix(in srgb, var(--gh-text-secondary, #9ca3af), transparent 75%)"}});Qe.appendChild(U)}const fe=l("div",{className:"chatgpt-helper-theme-preview-chat"}),Bt=l("div",{className:"chatgpt-helper-theme-preview-msg user"},"Summarize recent updates."),Rt=l("div",{className:"chatgpt-helper-theme-preview-msg assistant"},"Theme engine, wallpaper controls, and live preview are now enabled."),Ot=l("div",{className:"chatgpt-helper-theme-preview-input"});fe.appendChild(Bt),fe.appendChild(Rt),fe.appendChild(Ot),Ve.appendChild(Qe),Ve.appendChild(fe),Ee.appendChild(_t),Ee.appendChild(Ve),h.appendChild(Ee),i.appendChild(s),i.appendChild(h),t.appendChild(r),t.appendChild(i),e.appendChild(t),document.body.appendChild(e);const We=T=>{this.applyAppearanceMode(T,{persist:!0,showToast:!1,preferNative:!0}).catch(U=>{console.error("[ChatGPT Helper] applyAppearanceMode \u5931\u8D25:",U),this.showToast(this.t("themeSwitchFailed"))})};c.system.addEventListener("click",()=>We("system")),c.light.addEventListener("click",()=>We("light")),c.dark.addEventListener("click",()=>We("dark")),x.forEach(T=>{T.addEventListener("click",()=>{const U=T.dataset.presetKey;this.applyThemePresetVariables(U,!0)})}),B.addEventListener("change",()=>{const T=this.getThemeConfig();if(!T.backgroundAssetId&&B.checked){B.checked=!1,this.showToast(this.t("themeNoBackground"));return}T.backgroundImageEnabled=!!(B.checked&&T.backgroundAssetId),T.updatedAt=new Date().toISOString(),this.saveSettings(),this.refreshThemeBackgroundState()}),C.addEventListener("input",()=>{const T=this.getThemeConfig();T.backgroundBlurPx=Math.round($(C.value,0,20)),T.updatedAt=new Date().toISOString(),A.textContent=`${T.backgroundBlurPx}px`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),N.addEventListener("change",()=>{const T=this.getThemeConfig();T.messageGlassEnabled=!!N.checked,T.updatedAt=new Date().toISOString(),this.saveSettings(),this.updateThemeVisualState(),this.syncThemeModalState()}),M.addEventListener("input",()=>{const T=this.getThemeConfig();T.messageGlassIntensity=Math.round($(M.value,0,100)),T.updatedAt=new Date().toISOString(),z.textContent=`${T.messageGlassIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),j.addEventListener("input",()=>{const T=this.getThemeConfig();T.panelGlassIntensity=Math.round($(j.value,0,100)),T.updatedAt=new Date().toISOString(),V.textContent=`${T.panelGlassIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),ee.addEventListener("change",()=>{const T=this.getThemeConfig();T.sidebarTextEnhanceEnabled=!!ee.checked,T.updatedAt=new Date().toISOString(),this.saveSettings(),this.updateThemeVisualState(),this.syncThemeModalState()}),me.addEventListener("input",()=>{const T=this.getThemeConfig();T.sidebarTextEnhanceIntensity=Math.round($(me.value,0,100)),T.updatedAt=new Date().toISOString(),je.textContent=`${T.sidebarTextEnhanceIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),E.addEventListener("click",()=>q.click()),q.addEventListener("change",()=>{const T=q.files&&q.files[0];q.value="",T&&this.uploadThemeBackgroundFile(T).catch(U=>{const ve=U&&U.message?U.message:this.t("themeImageLoadFailed");this.showToast(ve)})}),P.addEventListener("click",()=>{this.removeThemeBackgroundFile().catch(T=>{console.error("[ChatGPT Helper] removeThemeBackgroundFile \u5931\u8D25:",T)})}),["dragenter","dragover"].forEach(T=>{S.addEventListener(T,U=>{U.preventDefault(),U.stopPropagation(),S.classList.add("dragging")})}),["dragleave","drop"].forEach(T=>{S.addEventListener(T,U=>{U.preventDefault(),U.stopPropagation(),S.classList.remove("dragging")})}),S.addEventListener("drop",T=>{const U=T.dataTransfer&&T.dataTransfer.files&&T.dataTransfer.files[0];U&&this.uploadThemeBackgroundFile(U).catch(ve=>{const Mr=ve&&ve.message?ve.message:this.t("themeImageLoadFailed");this.showToast(Mr)})});const Ye=()=>this.closeThemeSettingsModal();o.addEventListener("click",Ye),this.themeModalBackdropHandler=T=>{T.target===e&&Ye()},e.addEventListener("click",this.themeModalBackdropHandler),this.themeModalEscHandler=T=>{T.key==="Escape"&&(T.preventDefault(),Ye())},document.addEventListener("keydown",this.themeModalEscHandler,!0),this.themeModal=e,this.themeModalRefs={appearanceButtons:c,presetButtons:x,wallpaperBlock:b,wallpaperEnable:B,blurRange:C,blurValue:A,messageGlass:N,messageGlassIntensityRange:M,messageGlassIntensityValue:z,panelGlassIntensityRange:j,panelGlassIntensityValue:V,sidebarEnhance:ee,sidebarEnhanceRange:me,sidebarEnhanceValue:je,uploadDrop:S,uploadBg:v,removeFileBtn:P,preview:Ee,previewBg:_t,previewNav:Qe,previewChat:fe,previewUserMsg:Bt,previewAssistantMsg:Rt,previewInput:Ot},this.syncThemeModalState(),this.themeModalFrame=requestAnimationFrame(()=>{this.themeModalFrame=null,!(this.themeModal!==e||!e.isConnected)&&(e.classList.add("open"),o.focus({preventScroll:!0}))})},closeThemeSettingsModal(){cancelAnimationFrame(this.themeModalFrame),this.themeModalFrame=null;const n=this.themeModal,e=this.themeModalTrigger;this.themeModalBackdropHandler&&n?.removeEventListener("click",this.themeModalBackdropHandler),this.themeModalEscHandler&&document.removeEventListener("keydown",this.themeModalEscHandler,!0),this.themeModal=null,this.themeModalTrigger=null,this.themeModalRefs=null,this.themeModalEscHandler=null,this.themeModalBackdropHandler=null,n?.remove(),!this.destroyed&&e?.isConnected&&e.focus({preventScroll:!0})}},Pt=`/* CSS Variables */\r
:root {\r
    --gh-font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\r
    --gh-bg: #f9f9f9;\r
    --gh-bg-secondary: #f3f3f3;\r
    --gh-text: #0d0d0d;\r
    --gh-text-secondary: rgba(13, 13, 13, 0.64);\r
    --gh-border: rgba(0, 0, 0, 0.10);\r
    --gh-hover: #ececec;\r
    --gh-shadow: 0 0 0 0 rgba(0,0,0,0);\r
    --gh-input-bg: #ffffff;\r
    --gh-input-border: rgba(0, 0, 0, 0.10);\r
    --gh-active-bg: #ececec;\r
    --gh-danger: #ef4444;\r
    --gh-gradient: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);\r
    --gh-header-bg: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);\r
    --gh-primary: #64748b;\r
    --gh-primary-hover: #475569;\r
    --gh-tag-active-bg: #64748b;\r
    --gh-success: #10b981;\r
    --gh-warning: #f59e0b;\r
    --gh-folder-bg-default: #e0f2fe;\r
    --gh-folder-bg-expanded: #c7d2fe;\r
    --gh-border-active: #6366f1;\r
    --gh-checkbox-bg: #4f46e5;\r
    --gh-theme-primary: #64748b;\r
    --gh-theme-secondary: #94a3b8;\r
    --gh-theme-accent: #475569;\r
    --gh-theme-accent-dark: #475569;\r
    --gh-theme-light: #f8fafc;\r
    /* Outline Highlight Colors (Light Mode) */\r
    --gh-outline-locate-bg: rgba(16, 185, 129, 0.25);\r
    --gh-outline-locate-border: #10b981;\r
    --gh-outline-locate-shadow: rgba(16, 185, 129, 0.5);\r
    --gh-outline-sync-bg: rgba(52, 211, 153, 0.10);\r
    --gh-outline-sync-border: #34d399;\r
    /* Folder Preset Colors */\r
    --gh-folder-bg-1: #fdf2f8;\r
    --gh-folder-bg-2: #eff6ff;\r
    --gh-folder-bg-3: #ecfdf5;\r
    --gh-folder-bg-4: #faf5ff;\r
    --gh-folder-bg-5: #fefce8;\r
    --gh-folder-bg-6: #ecfeff;\r
    --gh-folder-bg-7: #fdf4ff;\r
}\r
\r
:root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {\r
    --gh-bg: #202123;\r
    --gh-bg-secondary: #171717;\r
    --gh-text: #ececf1;\r
    --gh-text-secondary: rgba(236, 236, 241, 0.72);\r
    --gh-border: rgba(255, 255, 255, 0.12);\r
    --gh-hover: #2a2b2d;\r
    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\r
    --gh-input-bg: #2a2b2d;\r
    --gh-input-border: rgba(255, 255, 255, 0.12);\r
    --gh-active-bg: #343541;\r
    --gh-header-bg: linear-gradient(180deg, #202123 0%, #171717 100%);\r
    --gh-tag-active-bg: rgba(255, 255, 255, 0.1);\r
    --gh-primary-hover: var(--gh-theme-accent-dark, #2563eb);\r
}\r
\r
/* \u79FB\u9664 @media (prefers-color-scheme: dark) \u81EA\u52A8\u5E94\u7528\uFF0C\u53EA\u901A\u8FC7 body[data-gh-mode="dark"] \u63A7\u5236 */\r
/* \u4E09\u680F\u5E03\u5C40\u5BB9\u5668 */\r
#chatgpt-helper-layout {\r
    display: flex;\r
    width: 100%;\r
    height: 100vh;\r
    position: relative;\r
}\r
\r
/* \u5DE6\u680F\uFF1AChatGPT \u4FA7\u8FB9\u680F */\r
#chatgpt-helper-left {\r
    flex-shrink: 0;\r
    transition: width 0.3s ease;\r
}\r
\r
/* \u4E2D\u680F\uFF1A\u5BF9\u8BDD\u533A\u57DF */\r
#chatgpt-helper-center {\r
    flex: 1;\r
    display: flex;\r
    flex-direction: column;\r
    min-width: 0;\r
    transition: margin-right 0.3s ease;\r
}\r
\r
/* \u53F3\u680F\uFF1A\u6838\u5FC3\u529F\u80FD\u533A */\r
#chatgpt-helper-right {\r
    position: fixed;\r
    right: 0;\r
    top: 0;\r
    width: var(--gh-panel-width, 360px);\r
    max-width: 100vw;\r
    height: 100vh;\r
    background: var(--gh-bg, #ffffff);\r
    border-left: none;\r
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.12), -2px 0 8px rgba(0, 0, 0, 0.06);\r
    z-index: 9999;\r
    display: flex;\r
    flex-direction: column;\r
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;\r
    overflow: hidden;\r
    isolation: isolate;\r
    font-family: var(--gh-font-family, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);\r
    border-radius: 0;\r
}\r
\r
/* \u62D6\u62FD\u6539\u53D8\u5BBD\u5EA6\u65F6\uFF1A\u7981\u7528 transition\uFF0C\u907F\u514D\u201C\u52A8\u753B\u8FFD\u8D76\u9F20\u6807\u201D\u9020\u6210\u5361\u987F */\r
#chatgpt-helper-right.gh-resizing {\r
    transition: none !important;\r
    will-change: width;\r
}\r
\r
/* \u62D6\u62FD\u65F6\u540C\u65F6\u7981\u7528\u4E3B\u533A\u57DF margin-right \u7684\u8FC7\u6E21\uFF0C\u63D0\u5347\u8DDF\u624B\u6027 */\r
body.gh-resizing main,\r
body.gh-resizing [role="main"],\r
body.gh-resizing #chatgpt-helper-center {\r
    transition: none !important;\r
}\r
\r
/* \u53F3\u680F\u5BBD\u5EA6\u62D6\u62FD\u6761\uFF08\u7A0D\u5FAE\u504F\u5185\u4FA7\uFF0C\u65B9\u4FBF\u62D6\u62FD\uFF09 */\r
#chatgpt-helper-resize-handle {\r
    position: absolute;\r
    left: 0;\r
    top: 0;\r
    width: 10px;\r
    height: 100%;\r
    cursor: col-resize;\r
    z-index: 10000;\r
    background: transparent;\r
}\r
\r
#chatgpt-helper-resize-handle::after {\r
    content: '';\r
    position: absolute;\r
    left: 0;\r
    top: 0;\r
    width: 1px;\r
    height: 100%;\r
    background: var(--gh-border, #e5e7eb);\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-resize-handle::after {\r
    background: var(--gh-border, #475569);\r
}\r
\r
body[data-gh-mode="light"] #chatgpt-helper-right {\r
    background: var(--gh-bg, #ffffff) !important;\r
}\r
\r
body[data-gh-mode="light"] #chatgpt-helper-content {\r
    background: var(--gh-bg, #ffffff) !important;\r
}\r
\r
body[data-gh-mode="light"] #chatgpt-helper-tabs {\r
    background: var(--gh-bg, #ffffff) !important;\r
}\r
\r
body[data-gh-mode="light"] .chatgpt-helper-search-bar {\r
    background: var(--gh-bg-secondary, #f9fafb) !important;\r
}\r
\r
body[data-gh-mode="light"] .chatgpt-helper-categories {\r
    background: var(--gh-bg, #ffffff) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-right,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-right {\r
    background: var(--gh-right-overlay) !important;\r
    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-content,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-content {\r
    background: transparent !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] #chatgpt-helper-tabs,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] #chatgpt-helper-tabs,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="light"] .chatgpt-helper-categories,\r
:root[data-gh-bg-enabled="true"] body[data-gh-mode="dark"] .chatgpt-helper-categories {\r
    background: var(--gh-panel-surface) !important;\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-right {\r
    background: var(--gh-bg, #1e293b);\r
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.4), -2px 0 8px rgba(0, 0, 0, 0.2);\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-header {\r
    background: var(--gh-header-bg) !important;\r
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-tabs {\r
    background: var(--gh-bg, #1e293b);\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-tab {\r
    color: var(--gh-text-secondary, #cbd5e1);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {\r
    background: var(--gh-hover, #334155);\r
    color: var(--gh-text, #f1f5f9);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-tab.active {\r
    color: var(--gh-text, #f1f5f9);\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-content {\r
    background: var(--gh-bg, #1e293b);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-search-bar {\r
    background: var(--gh-bg-secondary, #0f172a);\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-categories {\r
    background: var(--gh-bg, #1e293b);\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
#chatgpt-helper-right.collapsed {\r
    transform: translateX(100%);\r
    width: 0 !important;\r
}\r
\r
/* \u6298\u53E0\u6309\u94AE\u5DF2\u79FB\u9664\uFF0C\u53EA\u4FDD\u7559\u4FA7\u8FB9\u680F\u6309\u94AE */\r
\r
/* \u9762\u677F\u5934\u90E8 - \u6E10\u53D8\u80CC\u666F */\r
#chatgpt-helper-header {\r
    /* \u5141\u8BB8\u6839\u636E\u9762\u677F\u5BBD\u5EA6\u52A8\u6001\u8C03\u6574\uFF08\u901A\u8FC7 JS \u8BBE\u7F6E CSS \u53D8\u91CF\uFF09 */\r
    padding: var(--gh-header-padding-v, 12px) var(--gh-header-padding-h, 14px);\r
    background: var(--gh-header-bg);\r
    color: white;\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    user-select: none;\r
    flex-shrink: 0;\r
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);\r
    border-radius: 0;\r
    min-width: 0; /* \u5141\u8BB8\u5185\u90E8\u5143\u7D20\u6B63\u786E\u6536\u7F29\uFF0C\u907F\u514D\u88AB\u6324\u51FA\u88C1\u526A */\r
}\r
\r
#chatgpt-helper-title {\r
    font-size: 15px;\r
    font-weight: 600;\r
    display: flex;\r
    align-items: center;\r
    gap: 6px;\r
    white-space: nowrap;\r
    flex: 1 1 auto; /* \u8BA9\u6807\u9898\u5728\u7A84\u5BBD\u65F6\u8BA9\u4F4D\u7ED9\u53F3\u4FA7\u6309\u94AE */\r
    min-width: 0;\r
}\r
\r
#chatgpt-helper-title span:last-child {\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
#chatgpt-helper-controls {\r
    display: flex;\r
    gap: var(--gh-header-controls-gap, 4px);\r
    align-items: center;\r
    flex-shrink: 0; /* \u6309\u94AE\u4F18\u5148\u4FDD\u7559\u53EF\u89C1\u6027 */\r
}\r
\r
/* \u7A84\u5BBD\u7D27\u51D1\u6A21\u5F0F\uFF1A\u9690\u85CF\u6807\u9898\u6587\u5B57 + \u7F29\u5C0F\u6309\u94AE/\u95F4\u8DDD\uFF0C\u907F\u514D\u6309\u94AE\u88AB\u6324\u51FA\u53F3\u4FA7\u4E0D\u53EF\u89C1 */\r
#chatgpt-helper-header.gh-compact {\r
    --gh-header-padding-v: 10px;\r
    --gh-header-padding-h: 10px;\r
    --gh-header-controls-gap: 2px;\r
    --gh-header-btn-size: 24px;\r
    --gh-header-btn-font-size: 13px;\r
    --gh-header-btn-radius: 6px;\r
}\r
\r
#chatgpt-helper-header.gh-compact #chatgpt-helper-title span:last-child {\r
    display: none;\r
}\r
\r
.chatgpt-helper-header-btn {\r
    background: rgba(255,255,255,0.2);\r
    border: none;\r
    color: white;\r
    width: var(--gh-header-btn-size, 28px);\r
    height: var(--gh-header-btn-size, 28px);\r
    border-radius: var(--gh-header-btn-radius, 6px);\r
    cursor: pointer;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    transition: all 0.2s ease;\r
    font-size: var(--gh-header-btn-font-size, 14px);\r
    backdrop-filter: blur(10px);\r
    -webkit-backdrop-filter: blur(10px);\r
    min-width: var(--gh-header-btn-size, 28px);\r
    padding: 0;\r
}\r
\r
.chatgpt-helper-header-btn:hover {\r
    background: rgba(255,255,255,0.3);\r
    transform: scale(1.05);\r
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\r
}\r
\r
.chatgpt-helper-header-btn:active {\r
    transform: scale(0.95);\r
}\r
\r
/* Tab \u5BFC\u822A */\r
#chatgpt-helper-tabs {\r
    display: flex;\r
    border-bottom: 1px solid var(--gh-border, #e5e7eb);\r
    background: var(--gh-bg, #ffffff);\r
    flex-shrink: 0;\r
    padding: 0 4px;\r
    --tab-padding-h: 12px;\r
    --tab-padding-v: 10px;\r
    --tab-gap: 6px;\r
    --tab-margin: 2px;\r
}\r
\r
.chatgpt-helper-tab {\r
    flex: 1;\r
    padding: var(--tab-padding-v) var(--tab-padding-h);\r
    text-align: center;\r
    cursor: pointer;\r
    border: none;\r
    background: transparent;\r
    color: var(--gh-text-secondary, #6b7280);\r
    font-size: 13px;\r
    transition: all 0.2s ease;\r
    border-bottom: 2px solid transparent;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: var(--tab-gap);\r
    border-radius: 6px 6px 0 0;\r
    margin: 0 var(--tab-margin);\r
    min-width: 0; /* \u5141\u8BB8flex\u9879\u76EE\u6536\u7F29 */\r
}\r
\r
.chatgpt-helper-tab:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    color: var(--gh-text, #1f2937);\r
}\r
\r
.chatgpt-helper-tab.active {\r
    color: var(--gh-text, #1f2937);\r
    border-bottom-color: var(--gh-primary, #10a37f);\r
    font-weight: 500;\r
    background: var(--gh-bg, #ffffff);\r
}\r
\r
.chatgpt-helper-tab-label {\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
/* \u6781\u7A84\u9762\u677F\uFF1ATab \u53EA\u663E\u793A\u56FE\u6807 */\r
#chatgpt-helper-tabs.icons-only .chatgpt-helper-tab-label {\r
    display: none;\r
}\r
\r
#chatgpt-helper-tabs.icons-only .chatgpt-helper-tab {\r
    gap: 0;\r
    --tab-padding-h: 0px;\r
}\r
\r
#chatgpt-helper-tabs.icons-only .chatgpt-helper-tab-icon {\r
    width: 16px;\r
    height: 16px;\r
}\r
\r
/* \u9762\u677F\u5185\u5BB9 */\r
#chatgpt-helper-content {\r
    flex: 1;\r
    overflow-y: auto;\r
    overflow-x: hidden !important;\r
    padding: 0;\r
    background: var(--gh-bg);\r
}\r
\r
.chatgpt-helper-content-panel {\r
    display: none;\r
    flex-direction: column;\r
    height: 100%;\r
}\r
\r
.chatgpt-helper-content-panel.active {\r
    display: flex;\r
}\r
\r
.chatgpt-helper-export-panel.active {\r
    flex-direction: column;\r
    overflow: hidden;\r
}\r
\r
/* \u641C\u7D22\u680F */\r
.chatgpt-helper-search-bar {\r
    padding: 12px;\r
    border-bottom: 1px solid var(--gh-border);\r
    background: var(--gh-bg-secondary);\r
}\r
\r
.chatgpt-helper-search-input {\r
    width: 100%;\r
    padding: 6px 12px;\r
    border: 1px solid var(--gh-input-border);\r
    border-radius: 8px;\r
    font-size: 14px;\r
    transition: all 0.2s;\r
    box-sizing: border-box;\r
    background: var(--gh-input-bg);\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-search-input:focus {\r
    outline: none;\r
    border-color: var(--gh-primary);\r
}\r
\r
/* \u5206\u7C7B\u6807\u7B7E */\r
.chatgpt-helper-categories {\r
    padding: 8px 12px;\r
    display: flex;\r
    gap: 6px;\r
    flex-wrap: wrap;\r
    background: var(--gh-bg);\r
    border-bottom: 1px solid var(--gh-border);\r
}\r
\r
.chatgpt-helper-category-tag {\r
    padding: 4px 10px;\r
    background: var(--gh-hover);\r
    border-radius: 12px;\r
    font-size: 12px;\r
    color: #4b5563;\r
    cursor: pointer;\r
    transition: all 0.2s;\r
    border: 1px solid transparent;\r
    position: relative;\r
    z-index: 1;\r
    pointer-events: auto;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-category-tag {\r
    color: var(--gh-text-secondary, #9ca3af);\r
}\r
\r
.chatgpt-helper-category-tag:hover {\r
    background: var(--gh-border);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {\r
    background: var(--gh-hover, #1f2937);\r
    color: var(--gh-text, #e5e5e5);\r
}\r
\r
.chatgpt-helper-category-tag.active {\r
    background: var(--gh-tag-active-bg);\r
    color: white;\r
    border-color: var(--gh-tag-active-bg);\r
    z-index: 2;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {\r
    background: var(--gh-tag-active-bg);\r
    color: white;\r
}\r
\r
/* \u63D0\u793A\u8BCD\u5217\u8868 */\r
.chatgpt-helper-prompt-list {\r
    flex: 1;\r
    overflow-y: auto;\r
    overflow-x: hidden !important;\r
    padding: 8px;\r
}\r
\r
/* \u63D0\u793A\u8BCD\u9879 */\r
.chatgpt-helper-prompt-item {\r
    background: var(--gh-bg);\r
    border: 1px solid var(--gh-border);\r
    border-radius: 8px;\r
    padding: 12px;\r
    margin-bottom: 8px;\r
    cursor: pointer;\r
    transition: all 0.2s;\r
    position: relative;\r
}\r
\r
.chatgpt-helper-prompt-item:hover {\r
    border-color: var(--gh-primary);\r
    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);\r
    transform: translateY(-2px);\r
}\r
\r
.chatgpt-helper-prompt-item.selected {\r
    background: linear-gradient(135deg, #e6f7f3 0%, #f0fdf4 100%);\r
    border-color: var(--gh-primary);\r
    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {\r
    background: linear-gradient(135deg, rgba(16, 163, 127, 0.25) 0%, rgba(25, 195, 125, 0.15) 100%);\r
    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.3);\r
}\r
\r
.chatgpt-helper-prompt-title {\r
    font-weight: 500;\r
    color: var(--gh-text, #1f2937);\r
    margin-bottom: 4px;\r
}\r
\r
.chatgpt-helper-prompt-content {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #6b7280);\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
/* \u9636\u6BB52\uFF1A\u5927\u7EB2\u7BA1\u7406\u5668\u6837\u5F0F */\r
.outline-content {\r
    display: flex;\r
    flex-direction: column;\r
    flex: 1;\r
    min-height: 200px;\r
    user-select: none;\r
    overflow: hidden;\r
    overflow-x: hidden !important;\r
}\r
\r
.outline-fixed-toolbar {\r
    padding: 10px 12px;\r
    background: var(--gh-bg-secondary);\r
    border-bottom: 1px solid var(--gh-border);\r
    flex-shrink: 0;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.outline-toolbar-row {\r
    display: flex;\r
    align-items: center;\r
    gap: 4px;\r
}\r
\r
.outline-toolbar-btn {\r
    width: 26px;\r
    height: 26px;\r
    border: 1px solid var(--gh-input-border);\r
    border-radius: 6px;\r
    background: var(--gh-bg);\r
    color: var(--gh-text-secondary);\r
    cursor: pointer;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    font-size: 14px;\r
    transition: all 0.2s;\r
    flex-shrink: 0;\r
}\r
\r
.outline-toolbar-btn:hover {\r
    border-color: var(--gh-primary);\r
    color: var(--gh-primary);\r
    background: var(--gh-hover);\r
}\r
\r
.outline-toolbar-btn.active {\r
    border-color: var(--gh-primary);\r
    color: white;\r
    background: var(--gh-primary);\r
}\r
\r
.outline-search-wrapper {\r
    position: relative;\r
    flex: 1;\r
    display: flex;\r
    align-items: center;\r
    gap: 4px;\r
}\r
\r
.outline-search-input {\r
    flex: 1;\r
    height: 28px;\r
    padding: 0 10px;\r
    border: 1px solid var(--gh-input-border);\r
    border-radius: 6px;\r
    font-size: 13px;\r
    color: var(--gh-text);\r
    outline: none;\r
    transition: all 0.2s;\r
    background: var(--gh-input-bg);\r
}\r
\r
.outline-search-input:focus {\r
    border-color: var(--gh-primary);\r
    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.1);\r
}\r
\r
.outline-search-clear {\r
    width: 16px;\r
    height: 16px;\r
    border: none;\r
    background: var(--gh-input-border);\r
    color: white;\r
    border-radius: 50%;\r
    cursor: pointer;\r
    font-size: 10px;\r
    line-height: 16px;\r
    text-align: center;\r
    flex-shrink: 0;\r
}\r
\r
.outline-search-clear:hover {\r
    background: var(--gh-text-secondary);\r
}\r
\r
.outline-search-clear.hidden {\r
    display: none;\r
}\r
\r
.outline-result-bar {\r
    padding: 6px 12px;\r
    background: #eff6ff;\r
    color: #1d4ed8;\r
    font-size: 12px;\r
    border-bottom: 1px solid #dbeafe;\r
    text-align: center;\r
    flex-shrink: 0;\r
    transition: all 0.3s;\r
}\r
\r
.outline-result-bar.hidden {\r
    display: none;\r
}\r
\r
body[data-gh-mode="dark"] .outline-result-bar {\r
    background: rgba(16, 163, 127, 0.2);\r
    color: #10a37f;\r
    border-bottom-color: rgba(16, 163, 127, 0.3);\r
}\r
\r
/* \u5C42\u7EA7\u6ED1\u5757 */\r
.outline-level-slider-container {\r
    display: flex;\r
    align-items: center;\r
    width: 100%;\r
}\r
\r
.outline-level-dots {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
    width: 100%;\r
    height: 24px;\r
}\r
\r
.outline-level-line {\r
    position: absolute;\r
    left: 10px;\r
    right: 10px;\r
    top: 50%;\r
    height: 4px;\r
    background: var(--gh-border);\r
    transform: translateY(-50%);\r
    z-index: 1;\r
    border-radius: 2px;\r
}\r
\r
.outline-level-progress {\r
    position: absolute;\r
    left: 0;\r
    top: 0;\r
    height: 100%;\r
    background: var(--gh-primary);\r
    border-radius: 2px;\r
    transition: width 0.2s;\r
}\r
\r
.outline-level-dot {\r
    position: relative;\r
    width: 20px;\r
    height: 20px;\r
    border-radius: 50%;\r
    background: var(--gh-bg);\r
    border: 2px solid var(--gh-border);\r
    cursor: pointer;\r
    z-index: 2;\r
    transition: all 0.2s;\r
    flex-shrink: 0;\r
}\r
\r
.outline-level-dot:hover {\r
    border-color: var(--gh-primary);\r
    transform: scale(1.1);\r
}\r
\r
.outline-level-dot.active {\r
    background: var(--gh-primary);\r
    border-color: var(--gh-primary);\r
}\r
\r
.outline-level-dot-tooltip {\r
    position: absolute;\r
    bottom: 100%;\r
    left: 50%;\r
    transform: translateX(-50%);\r
    margin-bottom: 4px;\r
    padding: 2px 6px;\r
    background: var(--gh-bg);\r
    color: var(--gh-text);\r
    font-size: 10px;\r
    white-space: nowrap;\r
    border-radius: 4px;\r
    opacity: 0;\r
    visibility: hidden;\r
    transition: all 0.2s;\r
    pointer-events: none;\r
    border: 1px solid var(--gh-border);\r
}\r
\r
.outline-level-dot:hover .outline-level-dot-tooltip {\r
    opacity: 1;\r
    visibility: visible;\r
}\r
\r
/* \u5927\u7EB2\u5217\u8868\u533A */\r
.outline-content {\r
    display: flex;\r
    flex-direction: column;\r
    flex: 1;\r
    min-height: 200px;\r
    user-select: none;\r
    overflow: hidden;\r
}\r
\r
.outline-list-wrapper {\r
    flex: 1;\r
    overflow-y: auto;\r
    overflow-x: hidden !important;\r
    padding: 8px 12px;\r
    min-height: 0;\r
}\r
\r
.outline-list {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 2px;\r
}\r
\r
.outline-item {\r
    padding: 6px 10px;\r
    border-radius: 8px;\r
    cursor: pointer;\r
    background: transparent;\r
    border: 1px solid transparent;\r
    font-size: 13px;\r
    color: var(--gh-text);\r
    transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease;\r
    display: flex;\r
    align-items: center;\r
    position: relative;\r
}\r
\r
.outline-item:hover {\r
    background: var(--gh-hover);\r
    border-color: rgba(148, 163, 184, 0.4);\r
}\r
\r
.outline-item:active {\r
    transform: translateY(0.5px) scale(0.995);\r
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);\r
}\r
\r
.outline-item.sync-highlight,\r
.outline-item.highlight {\r
    background: var(--gh-active-bg) !important;\r
    border-right: 3px solid var(--gh-primary) !important;\r
    border-radius: 6px 0 0 6px;\r
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.25);\r
}\r
\r
.outline-item.matched {\r
    background: var(--gh-active-bg);\r
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.18);\r
}\r
\r
.outline-item.user-query-node {\r
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.06));\r
    border-color: rgba(59, 130, 246, 0.35);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item.user-query-node {\r
    background: radial-gradient(circle at 0 0, rgba(96, 165, 250, 0.32), rgba(15, 23, 42, 0.9));\r
    border-color: rgba(129, 140, 248, 0.7);\r
}\r
\r
.user-query-badge {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    margin-right: 6px;\r
    padding: 0 6px;\r
    height: 18px;\r
    border-radius: 999px;\r
    background: rgba(16, 163, 127, 0.15);\r
    color: var(--gh-primary);\r
    font-size: 11px;\r
    font-weight: 600;\r
    gap: 2px;\r
    flex-shrink: 0;\r
}\r
\r
.user-query-badge-icon {\r
    font-size: 12px;\r
}\r
\r
.user-query-badge-number {\r
    font-variant-numeric: tabular-nums;\r
}\r
\r
/* \u7528\u6237\u63D0\u95EE\u8282\u70B9\uFF08Level 0\uFF09 */\r
.outline-item.user-query-node {\r
    border-left: 3px solid var(--gh-border-active, #6366f1);\r
    font-weight: 500;\r
    padding-left: 8px !important;\r
    margin-top: 8px;\r
    border-radius: 8px;\r
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item.user-query-node {\r
    border-left-color: rgba(129, 140, 248, 0.7);\r
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.65);\r
}\r
\r
.outline-item.user-query-node:first-child {\r
    margin-top: 0;\r
}\r
\r
.outline-item.user-query-node:hover {\r
    background: rgba(66, 133, 244, 0.15);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item.user-query-node:hover {\r
    background: rgba(66, 133, 244, 0.25);\r
}\r
\r
/* \u7528\u6237\u95EE\u9898\u5FBD\u7AE0\uFF1A\u56FE\u6807+\u89D2\u6807\u6570\u5B57 */\r
.outline-item.user-query-node .user-query-badge {\r
    position: relative;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    width: 24px;\r
    height: 24px;\r
    margin-right: 4px;\r
    flex-shrink: 0;\r
}\r
\r
.outline-item.user-query-node .user-query-badge-icon {\r
    font-size: 15px;\r
    line-height: 1;\r
    color: #9ca3af;\r
}\r
\r
body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-icon {\r
    color: #6b7280;\r
}\r
\r
.outline-item.user-query-node .user-query-badge-number {\r
    position: absolute;\r
    bottom: -2px;\r
    right: -4px;\r
    min-width: 14px;\r
    height: 14px;\r
    padding: 0 3px;\r
    font-size: 9px;\r
    font-weight: 700;\r
    line-height: 14px;\r
    text-align: center;\r
    color: #111827;\r
    background: #ffffff;\r
    border: 1px solid rgba(209, 213, 219, 0.9);\r
    border-radius: 999px;\r
    box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.9);\r
    z-index: 10;\r
}\r
\r
body[data-gh-mode="dark"] .outline-item.user-query-node .user-query-badge-number {\r
    color: #e5e5e5;\r
    background: #020617;\r
    border-color: #374151;\r
    box-shadow: 0 0 0 1.5px #020617;\r
}\r
\r
/* \u5927\u7EB2\u9879\u5207\u6362\u6309\u94AE */\r
.outline-item-toggle {\r
    width: 24px;\r
    min-width: 24px;\r
    height: 24px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: #9ca3af;\r
    cursor: pointer;\r
    transition: color 0.18s ease, background-color 0.18s ease, transform 0.16s ease;\r
    font-size: 16px;\r
    flex-shrink: 0;\r
    margin-right: 4px;\r
    box-sizing: border-box;\r
    border-radius: 999px;\r
    position: relative;\r
    z-index: 1;\r
    user-select: none;\r
    -webkit-user-select: none;\r
}\r
\r
.outline-item-toggle:hover {\r
    color: var(--gh-border-active, #6366f1);\r
    background-color: rgba(148, 163, 184, 0.16);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item-toggle:hover {\r
    background-color: rgba(148, 163, 184, 0.25);\r
}\r
\r
.outline-item-toggle.expanded {\r
    transform: rotate(90deg);\r
    color: var(--gh-border-active, #6366f1);\r
}\r
\r
.outline-item-toggle.invisible {\r
    opacity: 0;\r
    cursor: default;\r
    pointer-events: none;\r
    visibility: visible !important;\r
    display: inline-flex !important;\r
}\r
\r
/* \u5927\u7EB2\u9879\u6587\u672C */\r
.outline-item-text {\r
    flex: 1;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    line-height: 24px;\r
}\r
\r
/* \u7528\u6237\u63D0\u95EE\u590D\u5236\u6309\u94AE */\r
.outline-item-copy-btn {\r
    position: absolute;\r
    right: 8px;\r
    top: 50%;\r
    transform: translateY(-50%);\r
    width: 20px;\r
    height: 20px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    opacity: 0;\r
    transition: opacity 0.2s;\r
    cursor: pointer;\r
    color: var(--gh-text-secondary, #9ca3af);\r
    border-radius: 4px;\r
    background: var(--gh-bg, #ffffff);\r
    border: 1px solid var(--gh-border, #e5e7eb);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item-copy-btn {\r
    background: var(--gh-bg, #1e293b);\r
    border-color: var(--gh-border, #475569);\r
    color: var(--gh-text-secondary, #cbd5e1);\r
}\r
\r
.outline-item.user-query-node:hover .outline-item-copy-btn {\r
    opacity: 1;\r
}\r
\r
.outline-item-copy-btn:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    border-color: var(--gh-primary, #10a37f);\r
    color: var(--gh-primary, #10a37f);\r
}\r
\r
body[data-gh-mode="dark"] .outline-item-copy-btn:hover {\r
    background: var(--gh-hover, #334155);\r
    border-color: var(--gh-primary, #3b82f6);\r
}\r
\r
.outline-item.collapsed {\r
    display: none;\r
}\r
\r
/* \u901A\u7528\u9690\u85CF\u7C7B\uFF08\u7528\u4E8E\u5927\u7EB2\u641C\u7D22/\u6298\u53E0\uFF09 */\r
#chatgpt-helper-right #outline-content .outline-hidden {\r
    display: none !important;\r
}\r
\r
.outline-expand-icon {\r
    display: inline-block;\r
    width: 16px;\r
    margin-right: 4px;\r
    user-select: none;\r
    font-size: 10px;\r
}\r
\r
/* H \u6807\u9898\u7EA7\u522B\u5FBD\u7AE0 */\r
.heading-level-badge {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    min-width: 28px;\r
    height: 20px;\r
    padding: 0 6px;\r
    margin-right: 6px;\r
    background: var(--gh-primary);\r
    color: white;\r
    border-radius: 10px;\r
    font-size: 10px;\r
    font-weight: 600;\r
    flex-shrink: 0;\r
    line-height: 1;\r
}\r
\r
body[data-gh-mode="dark"] .heading-level-badge {\r
    background: rgba(16, 163, 127, 0.8);\r
}\r
\r
.outline-item:hover .heading-level-badge {\r
    background: var(--gh-primary-hover);\r
    transform: scale(1.05);\r
}\r
\r
.outline-empty {\r
    text-align: center;\r
    color: var(--gh-text-secondary);\r
    padding: 40px 20px;\r
    font-size: 14px;\r
}\r
\r
/* \u5927\u7EB2\u5C42\u7EA7\u7F29\u8FDB */\r
.outline-item.level-0 {\r
    padding-left: 2px;\r
    font-weight: 500;\r
}\r
\r
.outline-item.level-1 {\r
    padding-left: 10px;\r
    font-weight: 600;\r
    font-size: 14px;\r
}\r
\r
.outline-item.level-2 {\r
    padding-left: 28px;\r
    font-weight: 500;\r
}\r
\r
.outline-item.level-3 {\r
    padding-left: 46px;\r
}\r
\r
.outline-item.level-4 {\r
    padding-left: 64px;\r
    font-size: 12px;\r
}\r
\r
.outline-item.level-5 {\r
    padding-left: 82px;\r
    font-size: 12px;\r
    color: var(--gh-text-secondary);\r
}\r
\r
.outline-item.level-6 {\r
    padding-left: 100px;\r
    font-size: 12px;\r
    color: var(--gh-text-secondary);\r
}\r
\r
/* \u6298\u53E0\u72B6\u6001\u4E0B\u7684\u6700\u5C0F\u5BBD\u5EA6 */\r
#chatgpt-helper-right.collapsed {\r
    width: 50px;\r
}\r
\r
#chatgpt-helper-right.collapsed #chatgpt-helper-header,\r
#chatgpt-helper-right.collapsed #chatgpt-helper-tabs,\r
#chatgpt-helper-right.collapsed #chatgpt-helper-content {\r
    display: none;\r
}\r
\r
/* \u6DFB\u52A0\u6309\u94AE */\r
.chatgpt-helper-add-btn {\r
    width: 100%;\r
    padding: 10px;\r
    margin: 8px;\r
    background: var(--gh-primary);\r
    color: white;\r
    border: none;\r
    border-radius: 8px;\r
    cursor: pointer;\r
    font-size: 14px;\r
    font-weight: 500;\r
    transition: all 0.2s;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 6px;\r
}\r
\r
.chatgpt-helper-add-btn:hover {\r
    background: var(--gh-primary-hover);\r
    transform: translateY(-1px);\r
    box-shadow: 0 4px 8px rgba(16, 163, 127, 0.3);\r
}\r
\r
.chatgpt-helper-add-btn:active {\r
    transform: translateY(0);\r
}\r
\r
/* \u5237\u65B0\u6309\u94AE\u6837\u5F0F */\r
.chatgpt-helper-refresh-btn:hover {\r
    background: var(--gh-hover, #f3f4f6) !important;\r
    border-color: var(--gh-primary, #3b82f6) !important;\r
}\r
\r
/* \u63D0\u793A\u8BCD\u64CD\u4F5C\u6309\u94AE\u6837\u5F0F - \u53F3\u4FA7\u504F\u4E0A */\r
.chatgpt-helper-prompt-content-wrapper {\r
    position: relative;\r
}\r
\r
.chatgpt-helper-prompt-actions {\r
    position: absolute;\r
    top: 0;\r
    right: 0;\r
    display: flex;\r
    gap: 4px;\r
    align-items: center;\r
}\r
\r
.chatgpt-helper-prompt-actions button {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 4px 6px;\r
    border-radius: 4px;\r
    cursor: pointer;\r
    font-size: 14px;\r
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\r
    border: none;\r
    width: 24px;\r
    height: 24px;\r
    line-height: 1;\r
}\r
\r
.chatgpt-helper-prompt-actions .category-btn {\r
    background: var(--gh-bg-secondary);\r
    color: var(--gh-text);\r
    border: 1px solid var(--gh-border);\r
}\r
\r
.chatgpt-helper-prompt-actions .category-btn:hover {\r
    background: var(--gh-hover);\r
    border-color: var(--gh-primary);\r
    color: var(--gh-primary);\r
    transform: translateY(-1px);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
}\r
\r
.chatgpt-helper-prompt-actions .edit-btn {\r
    background: var(--gh-bg-secondary);\r
    color: var(--gh-text);\r
    border: 1px solid var(--gh-border);\r
}\r
\r
.chatgpt-helper-prompt-actions .edit-btn:hover {\r
    background: var(--gh-hover);\r
    border-color: var(--gh-primary);\r
    color: var(--gh-primary);\r
    transform: translateY(-1px);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
}\r
\r
.chatgpt-helper-prompt-actions .delete-btn {\r
    background: transparent;\r
    color: var(--gh-text-secondary, #6b7280);\r
    border: 1px solid var(--gh-border, #e5e7eb);\r
}\r
\r
.chatgpt-helper-prompt-actions .delete-btn:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    color: var(--gh-danger, #ef4444);\r
    border-color: var(--gh-danger, #ef4444);\r
    transform: translateY(-1px);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
}\r
\r
.chatgpt-helper-prompt-actions .delete-btn svg {\r
    width: 14px;\r
    height: 14px;\r
    display: block;\r
}\r
\r
.chatgpt-helper-prompt-actions button:active {\r
    transform: translateY(0);\r
}\r
\r
/* \u62D6\u52A8\u6392\u5E8F\u76F8\u5173\u6837\u5F0F */\r
.chatgpt-helper-prompt-item {\r
    user-select: none;\r
}\r
\r
.chatgpt-helper-prompt-item.dragging {\r
    opacity: 0.5;\r
    cursor: grabbing;\r
}\r
\r
.chatgpt-helper-prompt-item.drag-over {\r
    border-top: 3px solid var(--gh-primary);\r
    margin-top: 8px;\r
}\r
\r
.chatgpt-helper-prompt-drag-handle {\r
    position: absolute;\r
    left: 8px;\r
    top: 50%;\r
    transform: translateY(-50%);\r
    width: 20px;\r
    height: 20px;\r
    cursor: grab;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: var(--gh-text-secondary);\r
    opacity: 0;\r
    transition: opacity 0.2s;\r
}\r
\r
.chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-drag-handle {\r
    opacity: 1;\r
}\r
\r
.chatgpt-helper-prompt-drag-handle:active {\r
    cursor: grabbing;\r
}\r
\r
.chatgpt-helper-prompt-drag-handle::before {\r
    content: '\u22EE\u22EE';\r
    font-size: 14px;\r
    line-height: 1;\r
    letter-spacing: 0;\r
}\r
\r
/* \u79FB\u9664\u81EA\u52A8\u6697\u8272\u6A21\u5F0F\u652F\u6301\uFF0C\u53EA\u901A\u8FC7 body[data-gh-mode="dark"] \u63A7\u5236 */\r
\r
/* \u79FB\u9664\u81EA\u52A8\u6697\u8272\u6A21\u5F0F\u9002\u914D\uFF0C\u53EA\u901A\u8FC7 body[data-gh-mode="dark"] \u63A7\u5236 */\r
\r
/* \u6EDA\u52A8\u6761\u6837\u5F0F */\r
#chatgpt-helper-content::-webkit-scrollbar {\r
    width: 6px;\r
}\r
\r
#chatgpt-helper-content::-webkit-scrollbar-track {\r
    background: var(--gh-bg-secondary, #f9fafb);\r
}\r
\r
#chatgpt-helper-content::-webkit-scrollbar-thumb {\r
    background: var(--gh-border, #e5e7eb);\r
    border-radius: 3px;\r
}\r
\r
#chatgpt-helper-content::-webkit-scrollbar-thumb:hover {\r
    background: var(--gh-text-secondary, #6b7280);\r
}\r
\r
/* \u4FA7\u8FB9\u6309\u94AE\u7EC4 */\r
.chatgpt-helper-quick-buttons {\r
    position: fixed !important;\r
    right: 340px;\r
    top: 50%;\r
    transform: translateY(-50%);\r
    display: flex !important;\r
    flex-direction: column;\r
    gap: 10px;\r
    z-index: 2147483647 !important;\r
    pointer-events: auto !important;\r
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;\r
    isolation: isolate;\r
    padding: 8px;\r
    background: rgba(255, 255, 255, 0.02);\r
    border-radius: 16px;\r
    backdrop-filter: blur(20px);\r
    -webkit-backdrop-filter: blur(20px);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {\r
    background: rgba(30, 41, 59, 0.3);\r
}\r
\r
.chatgpt-helper-quick-buttons.collapsed {\r
    right: 8px !important;\r
    display: flex !important;\r
    visibility: visible !important;\r
    opacity: 1 !important;\r
}\r
\r
.chatgpt-helper-quick-buttons.hidden {\r
    display: none !important;\r
    visibility: hidden !important;\r
}\r
\r
.chatgpt-helper-quick-btn {\r
    width: 44px !important;\r
    height: 44px !important;\r
    min-width: 44px !important;\r
    min-height: 44px !important;\r
    border-radius: 12px;\r
    border: 1px solid var(--gh-border);\r
    background: var(--gh-bg) !important;\r
    color: var(--gh-text) !important;\r
    cursor: pointer !important;\r
    display: flex !important;\r
    align-items: center;\r
    justify-content: center;\r
    font-size: 20px;\r
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r
    box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);\r
    pointer-events: auto !important;\r
    user-select: none !important;\r
    -webkit-user-select: none !important;\r
    -moz-user-select: none !important;\r
    position: relative;\r
    z-index: 2147483647 !important;\r
    margin: 0 !important;\r
    padding: 0 !important;\r
    outline: none !important;\r
    -webkit-tap-highlight-color: transparent;\r
    backdrop-filter: blur(10px);\r
    -webkit-backdrop-filter: blur(10px);\r
}\r
\r
.chatgpt-helper-quick-btn:active {\r
    transform: scale(0.92);\r
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);\r
}\r
\r
.chatgpt-helper-quick-btn:hover {\r
    background: var(--gh-hover) !important;\r
    transform: translateY(-2px) scale(1.05);\r
    box-shadow: 0 8px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);\r
    border-color: var(--gh-primary);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {\r
    background: rgba(30, 41, 59, 0.9) !important;\r
    border-color: rgba(71, 85, 105, 0.5);\r
    box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {\r
    background: rgba(51, 65, 85, 0.95) !important;\r
    box-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);\r
}\r
\r
.chatgpt-helper-quick-btn.disabled {\r
    opacity: 0.4;\r
    cursor: default;\r
}\r
\r
.chatgpt-helper-quick-btn.disabled:hover {\r
    transform: none;\r
}\r
\r
.chatgpt-helper-btn-divider {\r
    height: 1px;\r
    background: var(--gh-border);\r
    margin: 4px 0;\r
}\r
\r
/* \u951A\u70B9\u6807\u8BB0 - \u4FA7\u8FB9\u5C0F\u6807\u8BB0 */\r
.chatgpt-helper-anchor-marker {\r
    position: absolute;\r
    left: 0;\r
    width: 4px;\r
    height: 24px;\r
    background: var(--gh-header-bg, #10a37f);\r
    border-radius: 0 4px 4px 0;\r
    z-index: 999;\r
    pointer-events: none;\r
    box-shadow: 2px 0 4px rgba(0,0,0,0.1);\r
}\r
.chatgpt-helper-anchor-marker::before {\r
    content: '';\r
    position: absolute;\r
    left: 7px;\r
    top: 8px;\r
    width: 6px;\r
    height: 6px;\r
    border-radius: 999px;\r
    background: var(--gh-primary, #64748b);\r
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #64748b), transparent 72%);\r
}\r
\r
/* Toast \u901A\u77E5 */\r
@keyframes fadeIn {\r
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }\r
    to { opacity: 1; transform: translateX(-50%) translateY(0); }\r
}\r
\r
/* \u5E95\u90E8\u5BFC\u822A\u6309\u94AE\u7EC4 */\r
.scroll-nav-container {\r
    display: flex;\r
    flex-direction: row;\r
    gap: 8px;\r
    padding: 12px;\r
    border-top: 1px solid var(--gh-border, #e5e7eb);\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    flex-shrink: 0;\r
    justify-content: space-between;\r
}\r
\r
body[data-gh-mode="dark"] .scroll-nav-container {\r
    background: var(--gh-bg-secondary, #0f172a);\r
    border-top-color: var(--gh-border, #475569);\r
}\r
\r
.scroll-nav-btn {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 6px;\r
    padding: 8px 12px;\r
    border: 1px solid var(--gh-input-border, #d1d5db);\r
    border-radius: 8px;\r
    background: var(--gh-bg, #ffffff);\r
    color: var(--gh-text, #1f2937);\r
    font-size: 12px;\r
    font-weight: 500;\r
    cursor: pointer;\r
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\r
    flex: 1;\r
    box-sizing: border-box;\r
    min-width: 0;\r
}\r
\r
body[data-gh-mode="dark"] .scroll-nav-btn {\r
    background: var(--gh-bg, #1e293b);\r
    border-color: var(--gh-input-border, #64748b);\r
    color: var(--gh-text, #f1f5f9);\r
}\r
\r
.scroll-nav-btn:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    border-color: var(--gh-primary, #10a37f);\r
    transform: translateY(-1px);\r
    box-shadow: 0 2px 8px rgba(16, 163, 127, 0.15);\r
}\r
\r
body[data-gh-mode="dark"] .scroll-nav-btn:hover {\r
    background: var(--gh-hover, #334155);\r
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\r
}\r
\r
.scroll-nav-btn:active {\r
    transform: translateY(0);\r
}\r
\r
.scroll-nav-btn span:first-child {\r
    font-size: 14px;\r
    flex-shrink: 0;\r
}\r
\r
.scroll-nav-btn span:last-child {\r
    white-space: nowrap;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
.scroll-nav-btn[style*="opacity: 0.4"] {\r
    opacity: 0.4 !important;\r
    cursor: default !important;\r
}\r
\r
.scroll-nav-btn[style*="opacity: 0.4"]:hover {\r
    transform: none;\r
    box-shadow: none;\r
}\r
\r
.chatgpt-helper-conversations-root {\r
    flex: 1;\r
    overflow-y: auto;\r
    overflow-x: hidden !important;\r
    padding: 8px;\r
    min-height: 0;\r
}\r
\r
.chatgpt-helper-conversations-search {\r
    padding: 8px 12px;\r
    border-bottom: 1px solid var(--gh-border, #e5e7eb);\r
    background: var(--gh-bg, #ffffff);\r
    flex-shrink: 0;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-search {\r
    background: var(--gh-bg, #111827);\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
.chatgpt-helper-conversations-search-input {\r
    width: 100%;\r
    padding: 8px 12px;\r
    border: 1px solid var(--gh-input-border, #d1d5db);\r
    border-radius: 8px;\r
    background: var(--gh-input-bg, #ffffff);\r
    color: var(--gh-text, #1f2937);\r
    font-size: 14px;\r
    box-sizing: border-box;\r
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\r
}\r
\r
.chatgpt-helper-conversations-search-input:focus {\r
    outline: none;\r
    border-color: var(--gh-primary, #10a37f);\r
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary, #10a37f), transparent 80%);\r
}\r
\r
.chatgpt-helper-batch-toolbar {\r
    padding: 8px 12px;\r
    border-bottom: 1px solid var(--gh-border, #e5e7eb);\r
    display: flex;\r
    gap: 8px;\r
    align-items: center;\r
    background: var(--gh-active-bg, #e5e7eb);\r
    font-size: 13px;\r
    flex-shrink: 0;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar {\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
.chatgpt-helper-batch-toolbar-btn {\r
    padding: 4px 8px;\r
    border: 1px solid var(--gh-border, #d1d5db);\r
    border-radius: 6px;\r
    background: var(--gh-bg, #ffffff);\r
    color: var(--gh-text, #1f2937);\r
    cursor: pointer;\r
    font-size: 12px;\r
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;\r
}\r
\r
.chatgpt-helper-batch-toolbar-btn:hover {\r
    transform: translateY(-1px);\r
    border-color: var(--gh-primary, #10a37f);\r
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.10);\r
}\r
\r
.chatgpt-helper-batch-toolbar-btn.danger {\r
    background: #ef4444;\r
    border-color: rgba(239, 68, 68, 0.65);\r
    color: #ffffff;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn {\r
    background: var(--gh-bg, #0f172a);\r
    border-color: var(--gh-border, #475569);\r
    color: var(--gh-text, #f8fafc);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn.danger {\r
    background: #dc2626;\r
    border-color: rgba(248, 113, 113, 0.55);\r
}\r
\r
/* \u4F1A\u8BDD\u6A21\u5757\u6837\u5F0F */\r
.chatgpt-helper-folder-item {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    padding: 10px 12px;\r
    margin-bottom: 4px;\r
    border-radius: 8px;\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    cursor: pointer;\r
    transition: all 0.2s;\r
    border: 1px solid transparent;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-item {\r
    background: var(--gh-bg-secondary, #0f172a);\r
}\r
\r
.chatgpt-helper-folder-item:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-item:hover {\r
    background: var(--gh-hover, #334155);\r
}\r
\r
.chatgpt-helper-folder-item.default {\r
    background: var(--gh-folder-bg-default, #e0f2fe);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-item.default {\r
    background: var(--gh-bg-secondary, #111827);\r
}\r
\r
.chatgpt-helper-folder-item.expanded {\r
    background: var(--gh-folder-bg-expanded, #c7d2fe) !important;\r
    border: 2px solid var(--gh-border-active, #6366f1) !important;\r
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);\r
    border-radius: 8px 8px 0 0;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-item.expanded {\r
    background: rgba(99, 102, 241, 0.2) !important;\r
    border-color: rgba(99, 102, 241, 0.5) !important;\r
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);\r
}\r
\r
.chatgpt-helper-folder-info {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    flex: 1;\r
    min-width: 0;\r
}\r
\r
.chatgpt-helper-folder-icon {\r
    font-size: 18px;\r
    width: 24px;\r
    height: 24px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    flex-shrink: 0;\r
}\r
\r
.chatgpt-helper-folder-name {\r
    font-weight: 500;\r
    color: var(--gh-text, #1f2937);\r
    font-size: 14px;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    flex: 1;\r
}\r
\r
.chatgpt-helper-folder-count {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #6b7280);\r
    margin-left: 4px;\r
}\r
\r
.chatgpt-helper-folder-arrow {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #6b7280);\r
    transition: transform 0.2s;\r
    flex-shrink: 0;\r
}\r
\r
.chatgpt-helper-folder-actions {\r
    display: flex;\r
    align-items: center;\r
    gap: 6px;\r
    flex-shrink: 0;\r
}\r
\r
/* \u9ED8\u8BA4\u9690\u85CF\u5220\u9664\u6309\u94AE\uFF0Chover \u65F6\u663E\u793A\uFF08\u907F\u514D\u754C\u9762\u566A\u97F3\uFF09 */\r
.chatgpt-helper-folder-delete-btn {\r
    width: 26px;\r
    height: 26px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 6px;\r
    border: 1px solid transparent;\r
    background: transparent;\r
    color: var(--gh-text-secondary, #6b7280);\r
    cursor: pointer;\r
    padding: 0;\r
    line-height: 1;\r
    font-size: 14px;\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;\r
}\r
\r
.chatgpt-helper-folder-item:hover .chatgpt-helper-folder-delete-btn,\r
.chatgpt-helper-folder-delete-btn:focus-visible {\r
    opacity: 1;\r
    pointer-events: auto;\r
}\r
\r
.chatgpt-helper-folder-delete-btn:hover {\r
    background: rgba(239, 68, 68, 0.12);\r
    border-color: rgba(239, 68, 68, 0.35);\r
    color: #ef4444;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-delete-btn:hover {\r
    background: rgba(239, 68, 68, 0.18);\r
    border-color: rgba(239, 68, 68, 0.45);\r
}\r
\r
.chatgpt-helper-folder-delete-btn:focus-visible {\r
    outline: 2px solid rgba(99, 102, 241, 0.55);\r
    outline-offset: 2px;\r
}\r
\r
/* \u4F1A\u8BDD\u6A21\u5F0F\uFF1A\u6536\u4EF6\u7BB1\u4E0E\u5176\u4ED6\u6587\u4EF6\u5939\u5206\u5272\u7EBF */\r
.chatgpt-helper-folder-divider {\r
    height: 1px;\r
    background: var(--gh-border, #e5e7eb);\r
    opacity: 0.75;\r
    margin: 8px 6px;\r
    border-radius: 1px;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-divider {\r
    background: var(--gh-border, #475569);\r
    opacity: 0.65;\r
}\r
\r
.chatgpt-helper-folder-item.expanded .chatgpt-helper-folder-arrow {\r
    transform: rotate(90deg);\r
}\r
\r
.chatgpt-helper-conversations-list {\r
    width: calc(100% - 8px);\r
    margin-left: 4px;\r
    margin-right: 4px;\r
    padding: 8px;\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    /* \u79FB\u9664\u4F1A\u8BDD\u5217\u8868\u5DE6/\u53F3/\u4E0B\u65B9\u201C\u84DD\u7EBF\u201D\uFF08\u539F\u672C\u6765\u81EA\u6FC0\u6D3B\u8272\u8FB9\u6846\uFF09 */\r
    border: 2px solid transparent;\r
    border-top: none;\r
    border-radius: 0 0 8px 8px;\r
    margin-top: -4px;\r
    margin-bottom: 4px;\r
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\r
    /* \u8BA9\u4F1A\u8BDD\u5217\u8868\u5360\u6EE1\u53EF\u7528\u9AD8\u5EA6\uFF0C\u7531\u5916\u5C42\u5BB9\u5668\u63A7\u5236\u6EDA\u52A8 */\r
    max-height: none;\r
    height: auto;\r
    overflow-y: auto;\r
    overflow-x: hidden !important;\r
    scrollbar-width: none;\r
    -ms-overflow-style: none;\r
}\r
\r
.chatgpt-helper-conversations-list::-webkit-scrollbar {\r
    display: none;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-list {\r
    background: var(--gh-bg-secondary, #1a1a1a);\r
    border-color: transparent;\r
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);\r
}\r
\r
.chatgpt-helper-conversation-item {\r
    display: flex;\r
    align-items: center;\r
    padding: 8px 12px;\r
    margin-bottom: 4px;\r
    border-radius: 6px;\r
    background: var(--gh-bg, #ffffff);\r
    border: 1px solid transparent;\r
    cursor: pointer;\r
    transition: all 0.2s;\r
    gap: 8px;\r
    position: relative;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversation-item {\r
    background: var(--gh-bg, #1e293b);\r
}\r
\r
.chatgpt-helper-conversation-item.pinned {\r
    background: color-mix(in srgb, var(--gh-active-bg, #e5e7eb), var(--gh-bg, #ffffff) 42%);\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversation-item.pinned {\r
    background: color-mix(in srgb, var(--gh-active-bg, rgba(59,130,246,0.3)), var(--gh-bg, #1e293b) 44%);\r
    border-color: color-mix(in srgb, var(--gh-border, #475569), transparent 20%);\r
}\r
\r
.chatgpt-helper-conversation-item:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    border-color: var(--gh-primary, #10a37f);\r
    transform: translateY(-2px);\r
    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversation-item:hover {\r
    background: var(--gh-hover, #334155);\r
}\r
\r
.chatgpt-helper-conversations-empty {\r
    padding: 12px;\r
    color: var(--gh-text-secondary, #9ca3af);\r
    font-size: 13px;\r
    text-align: center;\r
}\r
\r
/* \u4F1A\u8BDD\u5DE5\u5177\u680F\u6837\u5F0F */\r
.chatgpt-helper-conversations-toolbar {\r
    display: flex;\r
    gap: 6px;\r
    padding: 10px 12px;\r
    border-bottom: 1px solid var(--gh-border, #e5e7eb);\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    flex-shrink: 0;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar {\r
    background: var(--gh-bg-secondary, #0f172a);\r
    border-bottom-color: var(--gh-border, #475569);\r
}\r
\r
.chatgpt-helper-conversations-toolbar-btn {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    min-width: 32px;\r
    height: 32px;\r
    padding: 5px 8px;\r
    border: 1px solid var(--gh-input-border, #d1d5db);\r
    border-radius: 6px;\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    color: var(--gh-text, #374151);\r
    cursor: pointer;\r
    font-size: 13px;\r
    transition: all 0.2s ease;\r
    flex-shrink: 0;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn {\r
    background: var(--gh-bg-secondary, #1a1a1a);\r
    border-color: var(--gh-input-border, #4a5568);\r
    color: var(--gh-text, #e5e5e5);\r
}\r
\r
.chatgpt-helper-conversations-toolbar-btn:hover {\r
    background: var(--gh-hover, #f3f4f6);\r
    border-color: #9ca3af;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn:hover {\r
    background: var(--gh-hover, #1f2937);\r
    border-color: #6b7280;\r
}\r
\r
.chatgpt-helper-conversations-toolbar-btn.batch-mode.active {\r
    background: var(--gh-border-active, #6366f1) !important;\r
    color: white !important;\r
    border-color: var(--gh-border-active, #6366f1) !important;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn.batch-mode.active {\r
    background: rgba(99, 102, 241, 0.8) !important;\r
    border-color: rgba(99, 102, 241, 0.8) !important;\r
}\r
\r
.chatgpt-helper-folder-select {\r
    flex: 1;\r
    padding: 5px 8px;\r
    border: 1px solid var(--gh-input-border, #d1d5db);\r
    border-radius: 6px;\r
    background: var(--gh-bg-secondary, #f9fafb);\r
    color: var(--gh-text, #374151);\r
    font-size: 13px;\r
    cursor: pointer;\r
    min-width: 80px;\r
    height: 32px;\r
    box-sizing: border-box;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-select {\r
    background: var(--gh-bg-secondary, #1a1a1a);\r
    border-color: var(--gh-input-border, #4a5568);\r
    color: var(--gh-text, #e5e5e5);\r
}\r
\r
.chatgpt-helper-folder-select:focus {\r
    outline: none;\r
    border-color: var(--gh-border-active, #6366f1);\r
}\r
\r
.chatgpt-helper-export-container {\r
    flex: 1;\r
    overflow: auto;\r
    padding: 0;\r
    min-height: 0;\r
    position: relative;\r
    box-sizing: border-box;\r
}\r
\r
/* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */\r
.chatgpt-helper-setting-section {\r
    position: relative;\r
    margin-bottom: 18px;\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), white 20%) 0%, var(--gh-bg-secondary, #f9fafb) 100%);\r
    border-radius: 16px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 8%);\r
    overflow: visible;\r
    box-shadow:\r
        0 14px 30px rgba(15, 23, 42, 0.08),\r
        inset 0 1px 0 rgba(255,255,255,0.45);\r
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\r
}\r
\r
.chatgpt-helper-setting-section:has(.chatgpt-helper-custom-select.open) {\r
    z-index: 30;\r
    overflow: visible !important;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-section {\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg-secondary, #101827), white 4%) 0%, var(--gh-bg-secondary, #101827) 100%);\r
    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 10%);\r
    box-shadow:\r
        0 18px 34px rgba(2, 6, 23, 0.34),\r
        inset 0 1px 0 rgba(255,255,255,0.04);\r
}\r
\r
.chatgpt-helper-setting-section-header {\r
    cursor: pointer;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    user-select: none;\r
    padding: 16px 18px;\r
    font-size: 14px;\r
    font-weight: 700;\r
    color: var(--gh-text, #374151);\r
    letter-spacing: 0.06em;\r
    text-align: center;\r
    transition: background 0.2s, border-color 0.2s;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header {\r
    color: var(--gh-text, #e5e5e5);\r
}\r
\r
.chatgpt-helper-setting-section-header:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 12%);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-section-header:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 8%);\r
}\r
\r
.chatgpt-helper-setting-section-content {\r
    padding: 0 16px 16px 16px;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 10px;\r
}\r
\r
.chatgpt-helper-setting-item {\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    padding: 14px 16px;\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), white 12%) 0%, var(--gh-bg, #ffffff) 100%);\r
    border-radius: 14px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);\r
    box-shadow:\r
        0 8px 18px rgba(15, 23, 42, 0.04),\r
        inset 0 1px 0 rgba(255,255,255,0.38);\r
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;\r
}\r
\r
.chatgpt-helper-setting-item:has(.chatgpt-helper-custom-select.open) {\r
    align-items: flex-start;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-item {\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #0f1419), white 3%) 0%, var(--gh-bg, #0f1419) 100%);\r
    border-color: color-mix(in srgb, var(--gh-border, #2d3748), transparent 14%);\r
    box-shadow:\r
        0 10px 22px rgba(2, 6, 23, 0.28),\r
        inset 0 1px 0 rgba(255,255,255,0.03);\r
}\r
\r
.chatgpt-helper-setting-item:hover {\r
    transform: translateY(-1px);\r
    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);\r
    box-shadow:\r
        0 12px 26px rgba(15, 23, 42, 0.08),\r
        inset 0 1px 0 rgba(255,255,255,0.48);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-item:hover {\r
    box-shadow:\r
        0 14px 28px rgba(2, 6, 23, 0.34),\r
        inset 0 1px 0 rgba(255,255,255,0.05);\r
}\r
\r
.chatgpt-helper-setting-item-info {\r
    flex: 1;\r
    margin-right: 12px;\r
    min-width: 0;\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: center;\r
}\r
\r
.chatgpt-helper-setting-item-label {\r
    font-size: 14px;\r
    font-weight: 600;\r
    color: var(--gh-text, #374151);\r
    margin-bottom: 2px;\r
    white-space: nowrap;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-setting-item-label {\r
    color: var(--gh-text, #e5e5e5);\r
}\r
\r
.chatgpt-helper-setting-item-desc {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #9ca3af);\r
    line-height: 1.4;\r
}\r
\r
.chatgpt-helper-setting-subheading {\r
    margin: 10px 4px 2px;\r
    font-size: 11px;\r
    font-weight: 700;\r
    line-height: 1.2;\r
    letter-spacing: 0.08em;\r
    text-transform: uppercase;\r
    color: color-mix(in srgb, var(--gh-text-secondary, #6b7280), var(--gh-text, #111827) 22%);\r
}\r
\r
.chatgpt-helper-setting-subheading:first-child {\r
    margin-top: 2px;\r
}\r
\r
.chatgpt-helper-setting-custom-block {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.chatgpt-helper-setting-custom-block .chatgpt-helper-setting-item {\r
    margin: 0;\r
}\r
\r
.chatgpt-helper-settings-scroll {\r
    scrollbar-width: thin;\r
}\r
\r
.chatgpt-helper-settings-compact {\r
    flex: 1;\r
    min-height: 0;\r
    overflow-y: auto;\r
    padding: 10px 12px 16px;\r
    box-sizing: border-box;\r
}\r
\r
.chatgpt-helper-settings-compact-section {\r
    margin: 0 0 10px;\r
    border: 1px solid var(--gh-panel-line, #e5e7eb);\r
    border-radius: 12px;\r
    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), transparent 4%);\r
    overflow: hidden;\r
    transition: border-color 0.16s ease;\r
}\r
\r
.chatgpt-helper-settings-compact-section:hover {\r
    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 58%);\r
}\r
\r
.chatgpt-helper-settings-compact-section:last-of-type {\r
    margin-bottom: 8px;\r
}\r
\r
.chatgpt-helper-settings-compact-title {\r
    padding: 0;\r
    font-size: 12.5px;\r
    line-height: 1.2;\r
    font-weight: 650;\r
    color: var(--gh-text, #111827);\r
    letter-spacing: 0.01em;\r
    text-transform: none;\r
}\r
\r
.chatgpt-helper-settings-compact-title-btn {\r
    width: 100%;\r
    display: flex;\r
    align-items: center;\r
    gap: 7px;\r
    border: 0;\r
    border-radius: 0;\r
    background: transparent;\r
    padding: 10px 12px;\r
    color: inherit;\r
    cursor: pointer;\r
    font: inherit;\r
    letter-spacing: inherit;\r
    line-height: inherit;\r
    text-align: left;\r
    text-transform: inherit;\r
}\r
\r
.chatgpt-helper-settings-compact-section:not(.collapsed) .chatgpt-helper-settings-compact-title-btn {\r
    color: color-mix(in srgb, var(--gh-primary, #10a37f), var(--gh-text, #111827) 28%);\r
}\r
\r
.chatgpt-helper-settings-compact-title-btn:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 62%);\r
    color: var(--gh-text, #111827);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-settings-compact-title-btn:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 48%);\r
}\r
\r
.chatgpt-helper-settings-compact-title-chevron {\r
    width: 14px;\r
    min-width: 14px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: var(--gh-text-secondary, #6b7280);\r
    font-size: 12px;\r
    transform: rotate(90deg);\r
    transition: transform 150ms ease;\r
}\r
\r
.chatgpt-helper-settings-compact-section.collapsed .chatgpt-helper-settings-compact-title-chevron {\r
    transform: rotate(0deg);\r
}\r
\r
.chatgpt-helper-settings-compact-section.collapsed .chatgpt-helper-settings-compact-list {\r
    display: none;\r
}\r
\r
.chatgpt-helper-settings-compact-title-count {\r
    margin-left: auto;\r
    min-width: 20px;\r
    padding: 2px 7px;\r
    border-radius: 999px;\r
    text-align: center;\r
    font-size: 10.5px;\r
    font-weight: 650;\r
    line-height: 1.3;\r
    font-variant-numeric: tabular-nums;\r
    letter-spacing: 0;\r
    color: var(--gh-text-secondary, #6b7280);\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 24%);\r
}\r
\r
.chatgpt-helper-settings-compact-title-text {\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-settings-compact-list {\r
    border-top: 1px solid var(--gh-panel-muted-line, #e5e7eb);\r
    padding: 0 10px 4px;\r
}\r
\r
.chatgpt-helper-settings-compact-row {\r
    min-height: 38px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 12px;\r
    padding: 4px 2px;\r
    border-bottom: 1px solid color-mix(in srgb, var(--gh-border, #e5e7eb), transparent 18%);\r
    box-sizing: border-box;\r
}\r
\r
.chatgpt-helper-settings-compact-row:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 58%);\r
}\r
\r
.chatgpt-helper-settings-compact-label {\r
    min-width: 0;\r
    flex: 1;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    font-size: 13px;\r
    font-weight: 500;\r
    line-height: 1.35;\r
    color: var(--gh-text, #374151);\r
}\r
\r
.chatgpt-helper-settings-compact-label.has-desc {\r
    white-space: normal;\r
}\r
\r
.chatgpt-helper-settings-compact-label-text {\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-settings-compact-desc {\r
    margin-top: 2px;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    font-size: 11px;\r
    font-weight: 400;\r
    line-height: 1.25;\r
    color: var(--gh-text-secondary, #6b7280);\r
}\r
\r
.chatgpt-helper-settings-icon-label {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
}\r
\r
.chatgpt-helper-settings-icon-label .chatgpt-helper-inline-icon-wrap {\r
    width: 24px;\r
    min-width: 24px;\r
    height: 24px;\r
    margin-right: 0;\r
    border-radius: 6px;\r
}\r
\r
.chatgpt-helper-settings-compact-controls {\r
    min-width: 92px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: flex-end;\r
    flex-shrink: 0;\r
}\r
\r
.chatgpt-helper-settings-compact-input {\r
    width: 96px;\r
    height: 28px;\r
    padding: 4px 8px;\r
    border: 1px solid var(--gh-border, #e5e7eb);\r
    border-radius: 6px;\r
    background: var(--gh-input-bg, #ffffff);\r
    color: var(--gh-text, #374151);\r
    font-size: 13px;\r
    box-sizing: border-box;\r
}\r
\r
.chatgpt-helper-settings-compact-text {\r
    width: 156px;\r
}\r
\r
.chatgpt-helper-settings-compact-select .chatgpt-helper-custom-select-trigger {\r
    min-height: 28px;\r
    padding: 4px 8px;\r
    border-radius: 6px;\r
    font-size: 13px;\r
}\r
\r
.chatgpt-helper-settings-compact-button {\r
    min-height: 28px;\r
    padding: 4px 10px;\r
    border-radius: 6px;\r
    font-size: 12px;\r
    font-weight: 600;\r
    box-shadow: none;\r
}\r
\r
.chatgpt-helper-settings-compact .chatgpt-helper-toggle {\r
    transform: scale(0.86);\r
    transform-origin: right center;\r
}\r
\r
.chatgpt-helper-settings-compact .chatgpt-helper-order-btn {\r
    width: 28px;\r
    height: 26px;\r
    min-width: 28px;\r
    padding: 0;\r
}\r
\r
.chatgpt-helper-settings-compact .chatgpt-helper-order-btn:disabled {\r
    opacity: 0.35;\r
    cursor: not-allowed;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-settings-compact-row:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 45%);\r
}\r
\r
.chatgpt-helper-setting-section-title {\r
    display: inline-block;\r
    text-align: center;\r
}\r
\r
.chatgpt-helper-theme-block-title,\r
.chatgpt-helper-setting-section-title {\r
    text-transform: none;\r
}\r
\r
.chatgpt-helper-inline-icon,\r
.chatgpt-helper-icon-logo,\r
.chatgpt-helper-quick-btn-logo {\r
    filter: drop-shadow(0 4px 12px rgba(15, 23, 42, 0.18));\r
}\r
\r
.chatgpt-helper-inline-icon-wrap {\r
    display: inline-flex;\r
    width: 28px;\r
    min-width: 28px;\r
    height: 28px;\r
    align-items: center;\r
    justify-content: center;\r
    margin-right: 8px;\r
    border-radius: 10px;\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 10%);\r
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-inline-icon-wrap {\r
    background: color-mix(in srgb, var(--gh-hover, #1f2937), transparent 10%);\r
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);\r
}\r
\r
.setting-toggle {\r
    position: relative;\r
    width: 42px;\r
    min-width: 42px;\r
    height: 24px;\r
    border-radius: 999px;\r
    cursor: pointer;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-hover, #e5e7eb), white 18%) 0%, color-mix(in srgb, var(--gh-hover, #e5e7eb), transparent 12%) 100%);\r
    box-shadow:\r
        inset 0 1px 0 rgba(255,255,255,0.5),\r
        0 6px 14px rgba(15, 23, 42, 0.08);\r
    transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease;\r
}\r
\r
.setting-toggle::after {\r
    content: '';\r
    position: absolute;\r
    top: 2px;\r
    left: 2px;\r
    width: 18px;\r
    height: 18px;\r
    border-radius: 999px;\r
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\r
    box-shadow:\r
        0 4px 10px rgba(15, 23, 42, 0.14),\r
        inset 0 1px 0 rgba(255,255,255,0.85);\r
    transition: transform 0.22s ease;\r
}\r
\r
.setting-toggle.active {\r
    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 24%);\r
    background:\r
        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #10a37f), white 36%) 0%, color-mix(in srgb, var(--gh-primary, #10a37f), transparent 16%) 100%);\r
    box-shadow:\r
        inset 0 1px 0 rgba(255,255,255,0.38),\r
        0 10px 18px rgba(15, 23, 42, 0.12);\r
}\r
\r
.setting-toggle.active::after {\r
    transform: translateX(18px);\r
}\r
\r
body[data-gh-mode="dark"] .setting-toggle {\r
    border-color: color-mix(in srgb, var(--gh-border, #334155), transparent 10%);\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, #111827, white 4%) 0%, #0f172a 100%);\r
    box-shadow:\r
        inset 0 1px 0 rgba(255,255,255,0.05),\r
        0 8px 18px rgba(2, 6, 23, 0.28);\r
}\r
\r
body[data-gh-mode="dark"] .setting-toggle::after {\r
    background: linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%);\r
    box-shadow:\r
        0 4px 12px rgba(2, 6, 23, 0.42),\r
        inset 0 1px 0 rgba(255,255,255,0.7);\r
}\r
\r
body[data-gh-mode="dark"] .setting-toggle.active {\r
    background:\r
        linear-gradient(135deg, color-mix(in srgb, var(--gh-primary, #6366f1), white 14%) 0%, color-mix(in srgb, var(--gh-primary, #6366f1), #0f172a 65%) 100%);\r
    box-shadow:\r
        inset 0 1px 0 rgba(255,255,255,0.06),\r
        0 10px 24px rgba(2, 6, 23, 0.34);\r
}\r
\r
.chatgpt-helper-settings-footer {\r
    padding: 10px 2px 4px;\r
}\r
\r
/* \u4E0E\u8BBE\u7F6E\u9875\u5176\u4ED6\u63A7\u4EF6\u4FDD\u6301\u4E00\u81F4\u7684\u7D27\u51D1\u6837\u5F0F */\r
.chatgpt-helper-about-btn {\r
    width: 100%;\r
    min-height: 32px;\r
    padding: 5px 10px;\r
    border-radius: 8px;\r
    border: 1px solid var(--gh-control-border, rgba(203, 213, 225, 0.9));\r
    background: var(--gh-control-bg, rgba(255, 255, 255, 0.86));\r
    color: var(--gh-text-secondary, #475569);\r
    font-size: 12.5px;\r
    font-weight: 600;\r
    letter-spacing: 0.01em;\r
    cursor: pointer;\r
    box-shadow: none;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;\r
}\r
\r
.chatgpt-helper-about-btn:hover {\r
    background: var(--gh-control-bg-hover, rgba(248, 250, 252, 0.96));\r
    border-color: color-mix(in srgb, var(--gh-primary, #10a37f), transparent 48%);\r
    color: var(--gh-text, #111827);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-about-btn {\r
    background: var(--gh-control-bg, rgba(32, 33, 35, 0.95));\r
    box-shadow: none;\r
}\r
\r
\r
#chatgpt-helper-about-modal {\r
    position: fixed;\r
    inset: 0;\r
    z-index: 10060;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 16px;\r
    background: rgba(9, 14, 26, 0.58);\r
    backdrop-filter: blur(8px) saturate(1.05);\r
    -webkit-backdrop-filter: blur(8px) saturate(1.05);\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.2s var(--gh-fast-ease, ease);\r
}\r
\r
#chatgpt-helper-about-modal.open {\r
    opacity: 1;\r
    pointer-events: auto;\r
}\r
\r
.chatgpt-helper-about-dialog {\r
    width: min(840px, calc(100vw - 32px));\r
    max-height: min(780px, calc(100vh - 32px));\r
    display: flex;\r
    flex-direction: column;\r
    overflow: hidden;\r
    border-radius: 18px;\r
    border: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));\r
    background: var(--gh-panel-surface, #ffffff);\r
    color: var(--gh-text, #0f172a);\r
    box-shadow:\r
        0 32px 80px rgba(2, 8, 23, 0.42),\r
        0 8px 24px rgba(2, 8, 23, 0.18),\r
        inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%);\r
    transform: translateY(10px) scale(0.985);\r
    transition: transform 0.24s var(--gh-fast-ease, ease), box-shadow 0.24s var(--gh-fast-ease, ease);\r
}\r
\r
#chatgpt-helper-about-modal.open .chatgpt-helper-about-dialog {\r
    transform: translateY(0) scale(1);\r
}\r
\r
.chatgpt-helper-about-header {\r
    position: relative;\r
    overflow: hidden;\r
    display: flex;\r
    align-items: center;\r
    justify-content: flex-start;\r
    gap: 14px;\r
    padding: 20px 22px 18px;\r
    border-bottom: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));\r
    background:\r
        radial-gradient(120% 160% at 88% -20%, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 84%) 0%, transparent 56%),\r
        radial-gradient(90% 140% at 8% 130%, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 90%) 0%, transparent 52%),\r
        var(--gh-panel-subtle, #f8fafc);\r
}\r
\r
.chatgpt-helper-about-hero-glow {\r
    position: absolute;\r
    top: -70px;\r
    right: 60px;\r
    width: 190px;\r
    height: 190px;\r
    border-radius: 50%;\r
    background: radial-gradient(circle, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 82%) 0%, transparent 68%);\r
    filter: blur(6px);\r
    pointer-events: none;\r
}\r
\r
.chatgpt-helper-about-title-wrap {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
    gap: 15px;\r
    min-width: 0;\r
    padding-right: 46px;\r
}\r
\r
.chatgpt-helper-about-logo {\r
    flex: 0 0 auto;\r
    border-radius: 50%;\r
    background: #ffffff;\r
    box-shadow:\r
        0 0 0 1px color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 82%),\r
        0 10px 26px color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 78%),\r
        0 2px 8px rgba(15, 23, 42, 0.10);\r
}\r
\r
.chatgpt-helper-logo-fallback-svg,\r
.chatgpt-helper-logo-svg {\r
    position: absolute;\r
    inset: 0;\r
    width: 100%;\r
    height: 100%;\r
    display: block;\r
}\r
\r
.chatgpt-helper-logo-svg {\r
    object-fit: contain;\r
    opacity: 0;\r
    transition: opacity 0.16s var(--gh-fast-ease, ease);\r
}\r
\r
.chatgpt-helper-logo-svg[data-loaded="true"] {\r
    opacity: 1;\r
}\r
\r
.chatgpt-helper-about-title-text {\r
    min-width: 0;\r
}\r
\r
.chatgpt-helper-about-name-row {\r
    display: flex;\r
    align-items: center;\r
    gap: 10px;\r
    flex-wrap: wrap;\r
}\r
\r
.chatgpt-helper-about-name {\r
    margin: 0;\r
    font-size: 22px;\r
    font-weight: 750;\r
    line-height: 1.18;\r
    color: var(--gh-text, #0f172a);\r
    letter-spacing: -0.01em;\r
}\r
\r
.chatgpt-helper-about-tagline {\r
    margin: 5px 0 0;\r
    font-size: 12.8px;\r
    line-height: 1.45;\r
    color: var(--gh-text-secondary, #475569);\r
    max-width: 540px;\r
}\r
\r
.chatgpt-helper-about-badge {\r
    padding: 3px 10px;\r
    border-radius: 999px;\r
    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 68%);\r
    background: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 88%);\r
    font-size: 11.5px;\r
    font-weight: 700;\r
    line-height: 1.4;\r
    letter-spacing: 0.02em;\r
    font-variant-numeric: tabular-nums;\r
    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 42%);\r
    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 72%);\r
}\r
\r
.chatgpt-helper-about-close {\r
    position: absolute;\r
    top: 16px;\r
    right: 16px;\r
    width: 32px;\r
    height: 32px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 9px;\r
    border: 1px solid transparent;\r
    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), transparent 30%);\r
    color: var(--gh-text-secondary, #475569);\r
    cursor: pointer;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;\r
}\r
\r
.chatgpt-helper-about-close:hover {\r
    background: var(--gh-control-bg-hover, rgba(248,250,252,0.96));\r
    border-color: var(--gh-control-border, rgba(203, 213, 225, 0.9));\r
    color: var(--gh-text, #0f172a);\r
    transform: rotate(90deg);\r
}\r
\r
.chatgpt-helper-about-body {\r
    flex: 1;\r
    overflow: auto;\r
    padding: 0 20px;\r
    scrollbar-width: thin;\r
    scrollbar-color: color-mix(in srgb, var(--gh-text-secondary, #64748b), transparent 62%) transparent;\r
}\r
\r
.chatgpt-helper-about-body::-webkit-scrollbar {\r
    width: 8px;\r
}\r
\r
.chatgpt-helper-about-body::-webkit-scrollbar-thumb {\r
    border-radius: 999px;\r
    background: color-mix(in srgb, var(--gh-text-secondary, #64748b), transparent 62%);\r
}\r
\r
.chatgpt-helper-about-shell {\r
    width: 100%;\r
    max-width: none;\r
    margin: 0 auto;\r
    padding: 16px 0 6px;\r
    display: grid;\r
    grid-template-columns: minmax(0, 1fr) 296px;\r
    gap: 14px;\r
}\r
\r
.chatgpt-helper-about-main-stack,\r
.chatgpt-helper-about-side-stack {\r
    display: grid;\r
    align-content: start;\r
    gap: 14px;\r
}\r
\r
.chatgpt-helper-about-section {\r
    position: relative;\r
    padding: 14px 15px;\r
    border: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));\r
    border-radius: 14px;\r
    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), var(--gh-panel-subtle, #f8fafc) 30%);\r
    box-shadow:\r
        var(--gh-panel-card-shadow, none),\r
        inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 70%);\r
}\r
\r
.chatgpt-helper-about-section.compact {\r
    padding-bottom: 14px;\r
}\r
\r
.chatgpt-helper-about-section.featured {\r
    overflow: hidden;\r
    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-panel-line, #e2e8f0) 62%);\r
    background:\r
        linear-gradient(150deg, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 92%) 0%, transparent 46%),\r
        color-mix(in srgb, var(--gh-panel-card, #ffffff), var(--gh-panel-subtle, #f8fafc) 30%);\r
}\r
\r
.chatgpt-helper-about-section.featured::before {\r
    content: '';\r
    position: absolute;\r
    left: 0;\r
    top: 12px;\r
    bottom: 12px;\r
    width: 3px;\r
    border-radius: 999px;\r
    background: linear-gradient(180deg, var(--gh-primary, #3b82f6), color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 55%));\r
}\r
\r
.chatgpt-helper-about-section-head {\r
    display: flex;\r
    align-items: center;\r
    gap: 9px;\r
    margin-bottom: 9px;\r
}\r
\r
.chatgpt-helper-about-section-icon {\r
    width: 24px;\r
    height: 24px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 8px;\r
    color: var(--gh-primary, #3b82f6);\r
    background: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 88%);\r
    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 76%);\r
    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 76%);\r
}\r
\r
.chatgpt-helper-about-section-title {\r
    margin: 0;\r
    font-size: 13.5px;\r
    font-weight: 700;\r
    line-height: 1.35;\r
    color: var(--gh-text, #0f172a);\r
    letter-spacing: 0;\r
}\r
\r
.chatgpt-helper-about-section-text {\r
    font-size: 12.5px;\r
    line-height: 1.6;\r
    color: var(--gh-text-secondary, #334155);\r
    white-space: pre-wrap;\r
    margin: 0;\r
}\r
\r
.chatgpt-helper-about-story {\r
    display: grid;\r
    gap: 8px;\r
}\r
\r
.chatgpt-helper-about-section-lead {\r
    margin: 0;\r
    color: var(--gh-text, #0f172a);\r
    font-size: 12.8px;\r
    line-height: 1.6;\r
    font-weight: 560;\r
}\r
\r
.chatgpt-helper-about-feature-list {\r
    list-style: none;\r
    display: grid;\r
    grid-template-columns: repeat(2, minmax(0, 1fr));\r
    gap: 8px;\r
    padding: 0;\r
    margin: 0;\r
}\r
\r
.chatgpt-helper-about-feature-item {\r
    display: flex;\r
    align-items: center;\r
    gap: 10px;\r
    min-width: 0;\r
    color: var(--gh-text-secondary, #334155);\r
    font-size: 12.5px;\r
    line-height: 1.45;\r
    font-weight: 530;\r
    padding: 10px 11px;\r
    min-height: 46px;\r
    border-radius: 11px;\r
    border: 1px solid color-mix(in srgb, var(--gh-panel-line, #e2e8f0), transparent 22%);\r
    background: color-mix(in srgb, var(--gh-panel-card, #ffffff), transparent 42%);\r
    transition: border-color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;\r
}\r
\r
.chatgpt-helper-about-feature-item:hover {\r
    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 52%);\r
    transform: translateY(-1px);\r
    box-shadow: 0 8px 18px color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 88%);\r
}\r
\r
.chatgpt-helper-about-feature-icon {\r
    flex: 0 0 auto;\r
    width: 26px;\r
    height: 26px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 8px;\r
    color: var(--gh-primary, #3b82f6);\r
    background: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 88%);\r
    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 80%);\r
}\r
\r
.chatgpt-helper-about-feature-label {\r
    min-width: 0;\r
}\r
\r
.chatgpt-helper-about-actions {\r
    display: grid;\r
    grid-template-columns: repeat(2, minmax(0, 1fr));\r
    gap: 7px;\r
    margin-top: 10px;\r
}\r
\r
.chatgpt-helper-about-link-btn:first-child,\r
.chatgpt-helper-about-link-btn:only-child {\r
    grid-column: 1 / -1;\r
}\r
\r
.chatgpt-helper-about-link-btn {\r
    min-height: 32px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 6px;\r
    min-width: 0;\r
    padding: 0 10px;\r
    border-radius: 9px;\r
    border: 1px solid var(--gh-control-border, rgba(203, 213, 225, 0.9));\r
    cursor: pointer;\r
    font-size: 12px;\r
    font-weight: 650;\r
    letter-spacing: 0;\r
    transition:\r
        transform 0.16s var(--gh-fast-ease, ease),\r
        box-shadow 0.16s var(--gh-fast-ease, ease),\r
        border-color 0.16s var(--gh-fast-ease, ease),\r
        background 0.16s var(--gh-fast-ease, ease),\r
        color 0.16s var(--gh-fast-ease, ease);\r
    color: var(--gh-text, #0f172a);\r
    background: var(--gh-control-bg, rgba(255,255,255,0.86));\r
    box-shadow: none;\r
}\r
\r
.chatgpt-helper-about-link-btn svg {\r
    flex: 0 0 auto;\r
    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 14%);\r
}\r
\r
.chatgpt-helper-about-link-btn span {\r
    min-width: 0;\r
    white-space: nowrap;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
.chatgpt-helper-about-link-btn:hover {\r
    background: var(--gh-control-bg-hover, rgba(248,250,252,0.96));\r
    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 48%);\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-about-link-btn.primary {\r
    color: #ffffff;\r
    background: linear-gradient(135deg, var(--gh-primary, #3b82f6), color-mix(in srgb, var(--gh-primary, #3b82f6), #1f2937 18%));\r
    border-color: color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 36%);\r
    box-shadow: 0 8px 18px color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 76%);\r
}\r
\r
.chatgpt-helper-about-link-btn.primary svg {\r
    color: currentColor;\r
}\r
\r
.chatgpt-helper-about-link-btn.primary:hover {\r
    background: linear-gradient(135deg, var(--gh-primary-hover, #2563eb), color-mix(in srgb, var(--gh-primary, #3b82f6), #1f2937 10%));\r
}\r
\r
.chatgpt-helper-about-link-btn.disabled,\r
.chatgpt-helper-about-link-btn:disabled {\r
    opacity: 0.46;\r
    cursor: not-allowed;\r
    box-shadow: none;\r
    transform: none;\r
}\r
\r
.chatgpt-helper-about-author-block {\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    text-align: center;\r
    gap: 9px;\r
}\r
\r
.chatgpt-helper-about-avatar {\r
    width: 46px;\r
    height: 46px;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 50%;\r
    color: color-mix(in srgb, var(--gh-primary, #3b82f6), var(--gh-text, #0f172a) 24%);\r
    background:\r
        linear-gradient(140deg, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 82%) 0%, transparent 60%),\r
        var(--gh-panel-card, #ffffff);\r
    border: 1px solid color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 68%);\r
    box-shadow:\r
        0 8px 20px color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 84%),\r
        inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 72%);\r
}\r
\r
.chatgpt-helper-about-author-bio {\r
    margin-bottom: 0;\r
    line-height: 1.7;\r
}\r
\r
.chatgpt-helper-about-author-block .chatgpt-helper-about-actions {\r
    width: 100%;\r
}\r
\r
.chatgpt-helper-about-footer {\r
    display: flex;\r
    align-items: center;\r
    justify-content: flex-end;\r
    gap: 14px;\r
    padding: 12px 20px 14px;\r
    text-align: left;\r
    border-top: 1px solid var(--gh-panel-line, rgba(226, 232, 240, 0.9));\r
    background: var(--gh-panel-subtle, #f8fafc);\r
}\r
\r
.chatgpt-helper-about-footer-actions {\r
    display: flex;\r
    align-items: center;\r
    justify-content: flex-end;\r
    gap: 7px;\r
    flex: 0 0 auto;\r
}\r
\r
.chatgpt-helper-about-footer-actions .chatgpt-helper-about-link-btn {\r
    min-height: 30px;\r
    padding: 0 11px;\r
}\r
\r
.chatgpt-helper-about-link-btn:focus-visible,\r
.chatgpt-helper-about-close:focus-visible {\r
    outline: 2px solid var(--gh-focus-ring, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 66%)) !important;\r
    outline-offset: 2px;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-about-header {\r
    background:\r
        radial-gradient(120% 160% at 88% -20%, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 86%) 0%, transparent 56%),\r
        radial-gradient(90% 140% at 8% 130%, color-mix(in srgb, var(--gh-primary, #3b82f6), transparent 92%) 0%, transparent 52%),\r
        color-mix(in srgb, var(--gh-bg, #202123), #ffffff 3%);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-about-logo {\r
    background: color-mix(in srgb, var(--gh-bg, #202123), #ffffff 6%);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-about-section.featured::before {\r
    opacity: 0.8;\r
}\r
\r
@media (max-width: 640px) {\r
    #chatgpt-helper-about-modal {\r
        align-items: stretch;\r
        padding: 10px;\r
    }\r
\r
    .chatgpt-helper-about-dialog {\r
        width: 100%;\r
        max-height: calc(100vh - 20px);\r
    }\r
\r
    .chatgpt-helper-about-header {\r
        padding: 16px 16px 14px;\r
    }\r
\r
    .chatgpt-helper-about-body {\r
        padding: 0 14px;\r
    }\r
\r
    .chatgpt-helper-about-shell {\r
        padding: 12px 0;\r
        grid-template-columns: 1fr;\r
        gap: 12px;\r
    }\r
\r
    .chatgpt-helper-about-main-stack,\r
    .chatgpt-helper-about-side-stack {\r
        gap: 12px;\r
    }\r
\r
    .chatgpt-helper-about-title-wrap {\r
        gap: 12px;\r
        padding-right: 42px;\r
    }\r
\r
    .chatgpt-helper-about-logo {\r
        width: 40px !important;\r
        height: 40px !important;\r
    }\r
\r
    .chatgpt-helper-about-name {\r
        font-size: 20px;\r
    }\r
\r
    .chatgpt-helper-about-feature-list {\r
        grid-template-columns: 1fr;\r
    }\r
\r
    .chatgpt-helper-about-actions {\r
        grid-template-columns: 1fr;\r
    }\r
\r
    .chatgpt-helper-about-link-btn {\r
        width: 100%;\r
    }\r
\r
    .chatgpt-helper-about-footer-actions {\r
        width: 100%;\r
        display: grid;\r
        grid-template-columns: repeat(2, minmax(0, 1fr));\r
        gap: 7px;\r
    }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
    #chatgpt-helper-about-modal,\r
    .chatgpt-helper-about-dialog,\r
    .chatgpt-helper-about-link-btn {\r
        transition-duration: 0.01ms !important;\r
        animation-duration: 0.01ms !important;\r
    }\r
\r
    .chatgpt-helper-about-dialog,\r
    #chatgpt-helper-about-modal.open .chatgpt-helper-about-dialog {\r
        transform: none !important;\r
    }\r
}\r
\r
.chatgpt-helper-setting-controls {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    flex-shrink: 0;\r
}\r
\r
.collapse-arrow {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #9ca3af);\r
    transition: transform 0.2s;\r
    display: inline-block;\r
}\r
\r
.chatgpt-helper-theme-launch-btn {\r
    padding: 9px 15px;\r
    border-radius: 12px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 18%);\r
    background: color-mix(in srgb, var(--gh-bg, #ffffff), transparent 6%);\r
    color: var(--gh-text, #111827);\r
    cursor: pointer;\r
    font-size: 13px;\r
    font-weight: 600;\r
    letter-spacing: 0.01em;\r
    transition: all 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-launch-btn:hover {\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 8%);\r
    border-color: var(--gh-primary, #10a37f);\r
    transform: translateY(-1px);\r
}\r
\r
#chatgpt-helper-theme-modal {\r
    position: fixed;\r
    inset: 0;\r
    z-index: 10050;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    background: color-mix(in srgb, #020617, transparent 22%);\r
    backdrop-filter: blur(8px);\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.24s ease;\r
    padding: 14px;\r
}\r
\r
#chatgpt-helper-theme-modal.open {\r
    opacity: 1;\r
    pointer-events: auto;\r
}\r
\r
.chatgpt-helper-theme-modal-dialog {\r
    width: min(1180px, 96vw);\r
    height: min(880px, 93vh);\r
    background: var(--gh-panel-surface, var(--gh-bg, #ffffff));\r
    color: var(--gh-text, #111827);\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);\r
    border-radius: 20px;\r
    box-shadow:\r
        0 26px 72px color-mix(in srgb, #020617, transparent 52%),\r
        inset 0 1px 0 rgba(255, 255, 255, 0.4);\r
    display: flex;\r
    flex-direction: column;\r
    overflow: hidden;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {\r
    background: var(--gh-panel-surface, var(--gh-bg, #0b111a));\r
    border-color: color-mix(in srgb, #334155, transparent 12%);\r
}\r
\r
.chatgpt-helper-theme-modal-header {\r
    height: 64px;\r
    padding: 0 22px;\r
    border-bottom: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    font-size: 24px;\r
    font-weight: 700;\r
    letter-spacing: 0.01em;\r
}\r
\r
.chatgpt-helper-theme-modal-close {\r
    width: 36px;\r
    height: 36px;\r
    border-radius: 10px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);\r
    background: color-mix(in srgb, var(--gh-hover, #f3f4f6), transparent 20%);\r
    color: inherit;\r
    cursor: pointer;\r
    font-size: 20px;\r
    transition: all 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-modal-close:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 90%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);\r
}\r
\r
.chatgpt-helper-theme-modal-body {\r
    flex: 1;\r
    min-height: 0;\r
    display: grid;\r
    grid-template-columns: minmax(0, 1fr) 370px;\r
    gap: 0;\r
    overflow: hidden;\r
}\r
\r
.chatgpt-helper-theme-main {\r
    overflow: auto;\r
    padding: 22px 24px 28px;\r
}\r
\r
.chatgpt-helper-theme-side {\r
    border-left: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);\r
    padding: 22px 20px;\r
    overflow: auto;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 4%);\r
}\r
\r
.chatgpt-helper-theme-block {\r
    margin-bottom: 26px;\r
}\r
\r
.chatgpt-helper-theme-block-title {\r
    font-size: 15px;\r
    font-weight: 700;\r
    margin-bottom: 12px;\r
}\r
\r
.chatgpt-helper-theme-segment {\r
    display: inline-flex;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);\r
    border-radius: 12px;\r
    overflow: hidden;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 8%);\r
}\r
\r
.chatgpt-helper-theme-segment button {\r
    border: none;\r
    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 14%);\r
    background: transparent;\r
    color: var(--gh-text, #1f2937);\r
    padding: 9px 14px;\r
    cursor: pointer;\r
    font-size: 13px;\r
    font-weight: 700;\r
    transition: all 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-segment button:last-child {\r
    border-right: none;\r
}\r
\r
.chatgpt-helper-theme-segment button:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 92%);\r
}\r
\r
.chatgpt-helper-theme-segment button.active {\r
    background: color-mix(in srgb, var(--gh-primary), #0b1220 10%);\r
    color: #fff;\r
}\r
\r
.chatgpt-helper-theme-preset-grid {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 10px;\r
    width: 100%;\r
    padding: 14px;\r
    border-radius: 14px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 10%);\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 4%);\r
}\r
\r
.chatgpt-helper-theme-preset {\r
    width: 46px;\r
    height: 46px;\r
    border-radius: 12px;\r
    border: 1px solid transparent;\r
    cursor: pointer;\r
    position: relative;\r
    transition: transform 0.16s ease, box-shadow 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-preset.active {\r
    border-color: #ffffff;\r
    box-shadow: 0 0 0 2px color-mix(in srgb, currentColor, white 10%), 0 8px 20px rgba(0, 0, 0, 0.2);\r
}\r
\r
.chatgpt-helper-theme-preset:hover {\r
    transform: scale(1.06);\r
}\r
\r
.chatgpt-helper-theme-preset.is-original {\r
    width: auto;\r
    min-width: 92px;\r
    padding: 0 14px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: #f8fafc !important;\r
    font-size: 12px;\r
    font-weight: 700;\r
    letter-spacing: 0.02em;\r
    background: linear-gradient(135deg, #334155 0%, #64748b 100%);\r
}\r
\r
.chatgpt-helper-theme-preset.is-original:hover {\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-theme-upload {\r
    border: 2px dashed color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 10%);\r
    border-radius: 14px;\r
    min-height: 220px;\r
    padding: 18px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    text-align: center;\r
    position: relative;\r
    overflow: hidden;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f9fafb), transparent 5%);\r
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-upload.dragging {\r
    border-color: var(--gh-primary);\r
    background: color-mix(in srgb, var(--gh-primary), transparent 90%);\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-theme-upload-bg {\r
    position: absolute;\r
    inset: 0;\r
    background-size: cover;\r
    background-position: center;\r
    opacity: 0.88;\r
    filter: brightness(0.72);\r
}\r
\r
.chatgpt-helper-theme-upload.has-image::after {\r
    content: '';\r
    position: absolute;\r
    inset: 0;\r
    background: linear-gradient(180deg, rgba(2, 6, 23, 0.28) 0%, rgba(2, 6, 23, 0.52) 100%);\r
    z-index: 1;\r
    pointer-events: none;\r
}\r
\r
.chatgpt-helper-theme-upload-content {\r
    position: relative;\r
    z-index: 2;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    align-items: center;\r
}\r
\r
.chatgpt-helper-theme-upload.has-image .chatgpt-helper-theme-upload-content {\r
    color: #f8fafc;\r
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);\r
}\r
\r
.chatgpt-helper-theme-row {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 12px;\r
    margin-bottom: 12px;\r
    padding: 10px 12px;\r
    border-radius: 12px;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);\r
    border: 1px solid color-mix(in srgb, var(--gh-border), transparent 18%);\r
}\r
\r
.chatgpt-helper-theme-row input[type="range"] {\r
    width: 220px;\r
    accent-color: var(--gh-primary);\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"] {\r
    appearance: none;\r
    width: 42px;\r
    height: 24px;\r
    border-radius: 999px;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 8%);\r
    background: color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 24%);\r
    cursor: pointer;\r
    position: relative;\r
    transition: all 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]::after {\r
    content: '';\r
    position: absolute;\r
    top: 2px;\r
    left: 2px;\r
    width: 18px;\r
    height: 18px;\r
    border-radius: 999px;\r
    background: #ffffff;\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);\r
    transition: transform 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]:checked {\r
    background: var(--gh-primary);\r
    border-color: var(--gh-primary);\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]:checked::after {\r
    transform: translateX(18px);\r
}\r
\r
/* \u65E0\u58C1\u7EB8\u65F6\uFF0C\u73BB\u7483/\u6A21\u7CCA/\u4FA7\u680F\u589E\u5F3A\u7B49\u4F9D\u8D56\u58C1\u7EB8\u7684\u63A7\u4EF6\u7F6E\u7070\u63D0\u793A */\r
.chatgpt-helper-theme-block.no-wallpaper .chatgpt-helper-theme-row.wallpaper-dependent {\r
    opacity: 0.5;\r
}\r
\r
.chatgpt-helper-theme-preview {\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 8%);\r
    border-radius: 18px;\r
    min-height: 350px;\r
    overflow: hidden;\r
    background:\r
        linear-gradient(180deg, color-mix(in srgb, var(--gh-bg, #ffffff), #f8fbff 26%) 0%, var(--gh-bg, #ffffff) 50%),\r
        var(--gh-bg, #ffffff);\r
    position: relative;\r
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 10px 30px rgba(2, 6, 23, 0.28);\r
}\r
\r
.chatgpt-helper-theme-preview-bg {\r
    position: absolute;\r
    inset: calc(var(--gh-preview-blur, 0px) * -2);\r
    background-size: cover;\r
    background-position: center;\r
    filter: blur(var(--gh-preview-blur, 5px));\r
    transform: none;\r
    opacity: 0;\r
    transition: opacity 0.2s ease;\r
}\r
\r
.chatgpt-helper-theme-preview.has-bg .chatgpt-helper-theme-preview-bg {\r
    opacity: 1;\r
}\r
\r
.chatgpt-helper-theme-preview-inner {\r
    position: relative;\r
    z-index: 1;\r
    height: 100%;\r
    display: grid;\r
    grid-template-columns: 84px 1fr;\r
    min-height: 350px;\r
}\r
\r
.chatgpt-helper-theme-preview-nav {\r
    padding: 12px 8px;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f8fafc), transparent 12%);\r
    border-right: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);\r
}\r
\r
.chatgpt-helper-theme-preview-chat {\r
    padding: 14px;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 12px;\r
}\r
\r
.chatgpt-helper-theme-preview-msg {\r
    border-radius: 12px;\r
    padding: 10px 12px;\r
    font-size: 13px;\r
    line-height: 1.35;\r
    max-width: 90%;\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #cbd5e1), transparent 28%);\r
}\r
\r
.chatgpt-helper-theme-preview-msg.user {\r
    margin-left: auto;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 18%);\r
}\r
\r
.chatgpt-helper-theme-preview-msg.assistant {\r
    background: color-mix(in srgb, var(--gh-theme-light, #ecf3ff), transparent 8%);\r
}\r
\r
.chatgpt-helper-theme-preview-input {\r
    margin-top: auto;\r
    border-radius: 999px;\r
    height: 34px;\r
    background: color-mix(in srgb, var(--gh-bg-secondary, #f1f5f9), transparent 0%);\r
    border: 1px solid color-mix(in srgb, var(--gh-border, #d1d5db), transparent 12%);\r
}\r
\r
@media (max-width: 980px) {\r
    .chatgpt-helper-theme-modal-body {\r
        grid-template-columns: 1fr;\r
    }\r
    .chatgpt-helper-theme-side {\r
        border-left: none;\r
        border-top: 1px solid color-mix(in srgb, var(--gh-border), transparent 12%);\r
    }\r
}\r
\r
/* Quiet efficiency sidebar refresh */\r
:root {\r
    --gh-bg: #f9f9f9;\r
    --gh-bg-secondary: #f3f3f3;\r
    --gh-text: #0d0d0d;\r
    --gh-text-secondary: rgba(13, 13, 13, 0.64);\r
    --gh-border: rgba(0, 0, 0, 0.10);\r
    --gh-hover: #ececec;\r
    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\r
    --gh-input-bg: #ffffff;\r
    --gh-input-border: rgba(0, 0, 0, 0.10);\r
    --gh-active-bg: #ececec;\r
    --gh-panel-surface: linear-gradient(180deg, #f9f9f9 0%, #f9f9f9 100%);\r
    --gh-panel-subtle: #f3f3f3;\r
    --gh-panel-card: #ffffff;\r
    --gh-panel-card-hover: #ececec;\r
    --gh-panel-line: rgba(0, 0, 0, 0.10);\r
    --gh-panel-muted-line: rgba(0, 0, 0, 0.06);\r
    --gh-panel-elevated-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\r
    --gh-panel-card-shadow: 0 1px 0 rgba(0, 0, 0, 0.025);\r
    --gh-header-quiet-bg: var(--gh-panel-surface);\r
    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #4285f4), transparent 72%);\r
    --gh-control-bg: #ffffff;\r
    --gh-control-bg-hover: #ececec;\r
    --gh-control-border: rgba(0, 0, 0, 0.10);\r
    --gh-control-radius: 8px;\r
    --gh-card-radius: 8px;\r
}\r
\r
:root:not([data-gh-theme-active="true"]) body[data-gh-mode="dark"] {\r
    --gh-bg: #202123;\r
    --gh-bg-secondary: #171717;\r
    --gh-text: #ececf1;\r
    --gh-text-secondary: rgba(236, 236, 241, 0.72);\r
    --gh-border: rgba(255, 255, 255, 0.12);\r
    --gh-hover: #2a2b2d;\r
    --gh-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\r
    --gh-input-bg: #2a2b2d;\r
    --gh-input-border: rgba(255, 255, 255, 0.12);\r
    --gh-active-bg: #343541;\r
    --gh-panel-surface: linear-gradient(180deg, #202123 0%, #171717 100%);\r
    --gh-panel-subtle: color-mix(in srgb, #202123, #ffffff 2%);\r
    --gh-panel-card: color-mix(in srgb, #202123, #ffffff 5%);\r
    --gh-panel-card-hover: color-mix(in srgb, #202123, #ffffff 9%);\r
    --gh-panel-line: rgba(255, 255, 255, 0.12);\r
    --gh-panel-muted-line: rgba(255, 255, 255, 0.07);\r
    --gh-panel-elevated-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\r
    --gh-panel-card-shadow: 0 1px 0 rgba(255, 255, 255, 0.035);\r
    --gh-header-quiet-bg: var(--gh-panel-surface);\r
    --gh-focus-ring: color-mix(in srgb, var(--gh-primary, #60a5fa), transparent 60%);\r
    --gh-control-bg: color-mix(in srgb, #202123, #ffffff 5%);\r
    --gh-control-bg-hover: color-mix(in srgb, #202123, #ffffff 9%);\r
    --gh-control-border: rgba(255, 255, 255, 0.12);\r
}\r
\r
#chatgpt-helper-right,\r
body[data-gh-mode="light"] #chatgpt-helper-right,\r
body[data-gh-mode="dark"] #chatgpt-helper-right {\r
    background: var(--gh-panel-surface) !important;\r
    border-left: 1px solid var(--gh-panel-line) !important;\r
    box-shadow: var(--gh-shadow) !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
#chatgpt-helper-resize-handle::after {\r
    width: 1px;\r
    background: var(--gh-panel-line) !important;\r
}\r
\r
#chatgpt-helper-resize-handle:hover::after {\r
    width: 2px;\r
    background: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;\r
}\r
\r
#chatgpt-helper-header,\r
body[data-gh-mode="light"] #chatgpt-helper-header,\r
body[data-gh-mode="dark"] #chatgpt-helper-header {\r
    background: var(--gh-header-quiet-bg) !important;\r
    color: var(--gh-text) !important;\r
    border-bottom: 1px solid var(--gh-panel-line);\r
    box-shadow: none !important;\r
}\r
\r
#chatgpt-helper-title {\r
    gap: 8px;\r
    font-size: 14px;\r
    font-weight: 650;\r
    letter-spacing: 0;\r
}\r
\r
#chatgpt-helper-title span:last-child {\r
    color: var(--gh-text);\r
}\r
\r
#chatgpt-helper-controls {\r
    gap: var(--gh-header-controls-gap, 5px);\r
}\r
\r
.chatgpt-helper-header-btn {\r
    background: var(--gh-control-bg);\r
    border: 1px solid var(--gh-control-border);\r
    color: var(--gh-text-secondary);\r
    border-radius: var(--gh-control-radius);\r
    box-shadow: none;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;\r
    backdrop-filter: none;\r
    -webkit-backdrop-filter: none;\r
}\r
\r
.chatgpt-helper-header-btn:hover {\r
    background: var(--gh-control-bg-hover);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);\r
    color: var(--gh-text);\r
    transform: translateY(-1px);\r
    box-shadow: var(--gh-panel-card-shadow);\r
}\r
\r
.chatgpt-helper-header-btn:active {\r
    transform: translateY(0);\r
    box-shadow: none;\r
}\r
\r
#chatgpt-helper-tabs,\r
body[data-gh-mode="light"] #chatgpt-helper-tabs,\r
body[data-gh-mode="dark"] #chatgpt-helper-tabs {\r
    gap: 4px;\r
    padding: 8px 10px 7px;\r
    background: color-mix(in srgb, var(--gh-bg), var(--gh-bg-secondary) 36%) !important;\r
    border-bottom: 1px solid var(--gh-panel-line);\r
    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 36%);\r
    --tab-padding-h: 8px;\r
    --tab-padding-v: 7px;\r
    --tab-gap: 5px;\r
    --tab-margin: 0px;\r
}\r
\r
.chatgpt-helper-tab {\r
    min-height: 34px;\r
    border: 1px solid transparent;\r
    border-bottom: 1px solid transparent;\r
    border-radius: var(--gh-control-radius);\r
    color: var(--gh-text-secondary);\r
    font-size: 12.5px;\r
    font-weight: 520;\r
    line-height: 1.2;\r
    letter-spacing: 0;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;\r
}\r
\r
.chatgpt-helper-tab:hover,\r
body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {\r
    background: var(--gh-control-bg-hover);\r
    border-color: var(--gh-control-border);\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-tab.active,\r
body[data-gh-mode="dark"] .chatgpt-helper-tab.active {\r
    background: var(--gh-panel-card);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 58%);\r
    color: var(--gh-text);\r
    font-weight: 650;\r
    box-shadow:\r
        inset 0 -2px 0 color-mix(in srgb, var(--gh-primary), transparent 10%),\r
        var(--gh-panel-card-shadow);\r
}\r
\r
/* \u6781\u7A84\u9762\u677F\uFF1A\u5E95\u90E8\u5BFC\u822A\u53EA\u663E\u793A\u56FE\u6807 */\r
.scroll-nav-container.icons-only .chatgpt-helper-nav-label {\r
    display: none;\r
}\r
\r
.scroll-nav-container.icons-only .scroll-nav-btn {\r
    gap: 0;\r
    padding: 8px 0;\r
    flex: 0 0 auto;\r
    min-width: 40px;\r
}\r
\r
#chatgpt-helper-content,\r
body[data-gh-mode="light"] #chatgpt-helper-content,\r
body[data-gh-mode="dark"] #chatgpt-helper-content {\r
    background: var(--gh-panel-surface) !important;\r
}\r
\r
.chatgpt-helper-search-bar,\r
body[data-gh-mode="light"] .chatgpt-helper-search-bar,\r
body[data-gh-mode="dark"] .chatgpt-helper-search-bar,\r
.chatgpt-helper-categories,\r
body[data-gh-mode="light"] .chatgpt-helper-categories,\r
body[data-gh-mode="dark"] .chatgpt-helper-categories,\r
.outline-fixed-toolbar,\r
.chatgpt-helper-conversations-search,\r
.chatgpt-helper-conversations-toolbar,\r
.chatgpt-helper-batch-toolbar {\r
    background: var(--gh-panel-subtle) !important;\r
    border-color: var(--gh-panel-line) !important;\r
}\r
\r
.chatgpt-helper-search-bar {\r
    padding: 8px 12px;\r
}\r
\r
.chatgpt-helper-search-input,\r
.outline-search-input,\r
.chatgpt-helper-conversations-search-input {\r
    min-height: 32px;\r
    border-radius: var(--gh-control-radius);\r
    background: var(--gh-input-bg);\r
    border-color: var(--gh-input-border);\r
    color: var(--gh-text);\r
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.36);\r
    transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-search-input,\r
body[data-gh-mode="dark"] .outline-search-input,\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input {\r
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);\r
}\r
\r
.chatgpt-helper-search-input:focus,\r
.outline-search-input:focus,\r
.chatgpt-helper-conversations-search-input:focus {\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);\r
    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.32);\r
}\r
\r
.chatgpt-helper-categories {\r
    gap: 6px;\r
    padding: 10px 12px 12px;\r
}\r
\r
.chatgpt-helper-category-tag {\r
    display: inline-flex;\r
    align-items: center;\r
    min-height: 28px;\r
    padding: 0 11px;\r
    border-radius: 999px;\r
    background: var(--gh-control-bg);\r
    border-color: var(--gh-control-border);\r
    color: var(--gh-text-secondary);\r
    font-weight: 550;\r
    line-height: 1;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;\r
}\r
\r
.chatgpt-helper-category-tag:hover,\r
body[data-gh-mode="dark"] .chatgpt-helper-category-tag:hover {\r
    background: var(--gh-control-bg-hover);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%);\r
    color: var(--gh-text);\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-category-tag.active,\r
body[data-gh-mode="dark"] .chatgpt-helper-category-tag.active {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 18%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 22%);\r
    color: #ffffff;\r
    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 78%);\r
}\r
\r
.chatgpt-helper-prompt-list,\r
.chatgpt-helper-conversations-root,\r
.outline-list-wrapper {\r
    padding: 12px 10px 16px;\r
}\r
\r
.chatgpt-helper-add-btn {\r
    width: calc(100% - 0px);\r
    min-height: 42px;\r
    margin: 0 0 10px;\r
    border-radius: var(--gh-card-radius);\r
    background: color-mix(in srgb, var(--gh-primary), #ffffff 8%);\r
    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 80%);\r
    transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;\r
}\r
\r
.chatgpt-helper-add-btn:hover {\r
    background: color-mix(in srgb, var(--gh-primary-hover), #ffffff 7%);\r
    transform: translateY(-1px);\r
    box-shadow: 0 10px 22px color-mix(in srgb, var(--gh-primary), transparent 74%);\r
}\r
\r
.chatgpt-helper-prompt-item,\r
.chatgpt-helper-conversation-item,\r
.chatgpt-helper-folder-item,\r
.chatgpt-helper-setting-section,\r
.chatgpt-helper-setting-item,\r
.chatgpt-helper-about-btn,\r
.chatgpt-helper-export-grid .menu-item {\r
    background: var(--gh-panel-card) !important;\r
    border-color: var(--gh-panel-line) !important;\r
    border-radius: var(--gh-card-radius);\r
    box-shadow: var(--gh-panel-card-shadow);\r
}\r
\r
.chatgpt-helper-prompt-item {\r
    padding: 12px 12px 12px 10px;\r
    margin-bottom: 8px;\r
    transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;\r
}\r
\r
.chatgpt-helper-prompt-item:hover,\r
.chatgpt-helper-conversation-item:hover,\r
.chatgpt-helper-folder-item:hover,\r
.chatgpt-helper-setting-item:hover,\r
.chatgpt-helper-about-btn:hover,\r
.chatgpt-helper-export-grid .menu-item:hover {\r
    background: var(--gh-panel-card-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;\r
    box-shadow: var(--gh-panel-elevated-shadow);\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-prompt-item.selected,\r
body[data-gh-mode="dark"] .chatgpt-helper-prompt-item.selected {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;\r
    box-shadow:\r
        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 78%),\r
        var(--gh-panel-card-shadow);\r
}\r
\r
.chatgpt-helper-prompt-title {\r
    margin-bottom: 5px;\r
    font-size: 13.5px;\r
    font-weight: 650;\r
    line-height: 1.35;\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-prompt-content {\r
    font-size: 12px;\r
    line-height: 1.45;\r
    color: var(--gh-text-secondary);\r
}\r
\r
.chatgpt-helper-prompt-actions {\r
    gap: 5px;\r
}\r
\r
.chatgpt-helper-prompt-actions button,\r
.outline-toolbar-btn,\r
.chatgpt-helper-conversations-toolbar-btn,\r
.chatgpt-helper-batch-toolbar-btn,\r
.scroll-nav-btn {\r
    background: var(--gh-control-bg);\r
    border: 1px solid var(--gh-control-border);\r
    color: var(--gh-text-secondary);\r
    border-radius: var(--gh-control-radius);\r
    box-shadow: none;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;\r
}\r
\r
.chatgpt-helper-prompt-actions button {\r
    width: 25px;\r
    height: 25px;\r
    padding: 0;\r
}\r
\r
.chatgpt-helper-prompt-actions button:hover,\r
.outline-toolbar-btn:hover,\r
.chatgpt-helper-conversations-toolbar-btn:hover,\r
.chatgpt-helper-batch-toolbar-btn:hover,\r
.scroll-nav-btn:hover {\r
    background: var(--gh-control-bg-hover);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);\r
    color: var(--gh-text);\r
    box-shadow: var(--gh-panel-card-shadow);\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-prompt-actions .delete-btn:hover {\r
    color: var(--gh-danger);\r
    border-color: color-mix(in srgb, var(--gh-danger), transparent 22%);\r
    background: color-mix(in srgb, var(--gh-danger), transparent 90%);\r
}\r
\r
.outline-fixed-toolbar {\r
    gap: 10px;\r
    padding: 12px;\r
}\r
\r
.outline-toolbar-row {\r
    gap: 6px;\r
}\r
\r
.outline-toolbar-btn {\r
    width: 32px;\r
    height: 32px;\r
}\r
\r
.outline-toolbar-btn.active {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 16%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 16%);\r
    color: #ffffff;\r
    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 78%);\r
}\r
\r
.outline-list {\r
    gap: 3px;\r
}\r
\r
.outline-item {\r
    min-height: 32px;\r
    padding-top: 6px;\r
    padding-bottom: 6px;\r
    border-radius: var(--gh-card-radius);\r
    border-color: transparent;\r
    line-height: 1.35;\r
}\r
\r
.outline-item:hover {\r
    background: var(--gh-panel-card-hover);\r
    border-color: var(--gh-panel-muted-line);\r
}\r
\r
.outline-item.sync-highlight,\r
.outline-item.highlight,\r
.outline-item.matched {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 86%) !important;\r
    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;\r
    border-right: 1px solid color-mix(in srgb, var(--gh-primary), transparent 35%) !important;\r
    border-radius: var(--gh-card-radius) !important;\r
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 82%);\r
}\r
\r
.outline-item.user-query-node,\r
body[data-gh-mode="dark"] .outline-item.user-query-node {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 92%);\r
    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);\r
    border-left: 1px solid color-mix(in srgb, var(--gh-primary), transparent 58%);\r
    box-shadow: var(--gh-panel-card-shadow);\r
}\r
\r
.outline-item.user-query-node:hover,\r
body[data-gh-mode="dark"] .outline-item.user-query-node:hover {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card-hover) 86%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);\r
}\r
\r
.user-query-badge,\r
.heading-level-badge {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 84%);\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);\r
    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 72%);\r
    border-radius: 999px;\r
}\r
\r
body[data-gh-mode="dark"] .user-query-badge,\r
body[data-gh-mode="dark"] .heading-level-badge {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 78%);\r
    color: color-mix(in srgb, var(--gh-primary), #ffffff 24%);\r
}\r
\r
.outline-item:hover .heading-level-badge {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 78%);\r
    transform: none;\r
}\r
\r
.outline-item-toggle {\r
    color: var(--gh-text-secondary);\r
}\r
\r
.outline-item-toggle:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 88%);\r
    color: var(--gh-primary);\r
}\r
\r
.scroll-nav-container,\r
body[data-gh-mode="dark"] .scroll-nav-container {\r
    gap: 8px;\r
    padding: 10px 12px;\r
    background: var(--gh-panel-subtle) !important;\r
    border-top: 1px solid var(--gh-panel-line);\r
}\r
\r
.scroll-nav-btn {\r
    min-height: 38px;\r
    padding: 8px 10px;\r
    font-weight: 600;\r
}\r
\r
.chatgpt-helper-quick-buttons {\r
    gap: 8px;\r
    padding: 7px;\r
    background: color-mix(in srgb, var(--gh-bg), transparent 10%);\r
    border: 1px solid var(--gh-panel-line);\r
    border-radius: 18px;\r
    box-shadow: 0 12px 30px rgba(31, 36, 32, 0.12), 0 2px 8px rgba(31, 36, 32, 0.08);\r
    backdrop-filter: blur(18px) saturate(1.04);\r
    -webkit-backdrop-filter: blur(18px) saturate(1.04);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {\r
    background: color-mix(in srgb, var(--gh-bg), transparent 8%);\r
    border-color: var(--gh-panel-line);\r
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.36), 0 2px 8px rgba(0, 0, 0, 0.26);\r
}\r
\r
.chatgpt-helper-quick-btn,\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-btn {\r
    border-radius: 12px;\r
    border-color: var(--gh-control-border);\r
    background: var(--gh-control-bg) !important;\r
    color: var(--gh-text) !important;\r
    box-shadow: none;\r
    transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;\r
}\r
\r
.chatgpt-helper-quick-btn:hover,\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-btn:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 40%);\r
    transform: translateY(-1px);\r
    box-shadow: var(--gh-panel-elevated-shadow);\r
}\r
\r
.chatgpt-helper-quick-btn:active {\r
    transform: translateY(0) scale(0.97);\r
    box-shadow: none;\r
}\r
\r
.chatgpt-helper-quick-btn.disabled,\r
.chatgpt-helper-quick-btn[disabled] {\r
    opacity: 0.38 !important;\r
    cursor: default !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-quick-btn.disabled:hover,\r
.chatgpt-helper-quick-btn[disabled]:hover {\r
    transform: none;\r
    border-color: var(--gh-control-border);\r
    background: var(--gh-control-bg) !important;\r
}\r
\r
.chatgpt-helper-btn-divider {\r
    height: 1px;\r
    margin: 2px 6px;\r
    background: var(--gh-panel-muted-line);\r
}\r
\r
#chatgpt-helper-right button:focus-visible,\r
#chatgpt-helper-right input:focus-visible,\r
#chatgpt-helper-right textarea:focus-visible,\r
#chatgpt-helper-right select:focus-visible,\r
.chatgpt-helper-quick-btn:focus-visible,\r
.chatgpt-helper-prompt-dialog-btn:focus-visible {\r
    outline: 2px solid var(--gh-focus-ring) !important;\r
    outline-offset: 2px;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
    #chatgpt-helper-right,\r
    #chatgpt-helper-right *,\r
    .chatgpt-helper-quick-buttons,\r
    .chatgpt-helper-quick-buttons * {\r
        transition-duration: 0.01ms !important;\r
        animation-duration: 0.01ms !important;\r
    }\r
}\r
\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-header {\r
    background: var(--gh-panel-surface) !important;\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.06);\r
    box-shadow: none !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,\r
:root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,\r
:root[data-gh-bg-enabled="true"] .scroll-nav-container {\r
    background: var(--gh-panel-card-bg) !important;\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
    box-shadow: inset 0 0 0 1px var(--gh-panel-card-border);\r
}\r
\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-content,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-scroll,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-settings-footer,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-root,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-export-container,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-export-panel {\r
    background: transparent !important;\r
    background-image: none !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-search-input,\r
:root[data-gh-bg-enabled="true"] .outline-search-input,\r
:root[data-gh-bg-enabled="true"] .outline-toolbar-btn,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-select,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search-input,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn,\r
:root[data-gh-bg-enabled="true"] .scroll-nav-btn {\r
    background: var(--gh-input-bg) !important;\r
    border-color: var(--gh-input-border) !important;\r
    backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);\r
    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) - 2px)) saturate(1.02);\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item {\r
    background: var(--gh-panel-card-bg) !important;\r
    border-color: var(--gh-panel-card-border) !important;\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.default,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item.pinned,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar {\r
    background: color-mix(in srgb, var(--gh-active-bg), transparent 28%) !important;\r
    border-color: color-mix(in srgb, var(--gh-panel-card-border), transparent 18%) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item.expanded {\r
    background: color-mix(in srgb, var(--gh-active-bg), transparent 12%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 24%) !important;\r
    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 84%) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar-btn:hover,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar-btn:hover,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item:hover,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item:hover,\r
:root[data-gh-bg-enabled="true"] .scroll-nav-btn:hover,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item:hover,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn:hover {\r
    background: color-mix(in srgb, var(--gh-hover), transparent 12%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-right {\r
    background: var(--gh-right-overlay) !important;\r
    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-header {\r
    background: var(--gh-panel-surface) !important;\r
    box-shadow: none !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] #chatgpt-helper-tabs,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-categories,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-fixed-toolbar,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-container {\r
    background: var(--gh-panel-surface) !important;\r
    box-shadow: none !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-search-input,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-search-input,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .outline-toolbar-btn,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-folder-select,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-toolbar-btn,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .chatgpt-helper-batch-toolbar-btn,\r
:root[data-gh-bg-enabled="true"][data-gh-mode="dark"] .scroll-nav-btn {\r
    background: var(--gh-input-bg) !important;\r
    border-color: var(--gh-input-border) !important;\r
}\r
\r
/* Theme-driven productivity UI refresh */\r
:root {\r
    --gh-control-radius: 8px;\r
    --gh-card-radius: 8px;\r
    --gh-row-radius: 7px;\r
    --gh-panel-pad-x: 12px;\r
    --gh-panel-pad-y: 10px;\r
    --gh-fast-ease: cubic-bezier(0.2, 0, 0, 1);\r
}\r
\r
.chatgpt-helper-svg-icon {\r
    width: 1em;\r
    height: 1em;\r
    display: block;\r
    pointer-events: none;\r
}\r
\r
#chatgpt-helper-right,\r
body[data-gh-mode="light"] #chatgpt-helper-right,\r
body[data-gh-mode="dark"] #chatgpt-helper-right,\r
:root[data-gh-page-theme="true"] #chatgpt-helper-right,\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-right {\r
    background: var(--gh-panel-surface) !important;\r
    border-left: 1px solid var(--gh-panel-line) !important;\r
    box-shadow: var(--gh-shadow) !important;\r
    color: var(--gh-text) !important;\r
    font-family: var(--gh-font-family, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);\r
}\r
\r
#chatgpt-helper-right,\r
#chatgpt-helper-right button,\r
#chatgpt-helper-right input,\r
#chatgpt-helper-right textarea,\r
#chatgpt-helper-right select,\r
#chatgpt-helper-right option,\r
#chatgpt-helper-right optgroup {\r
    font-family: var(--gh-font-family, inherit) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-right {\r
    backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);\r
    -webkit-backdrop-filter: blur(calc(var(--gh-panel-blur) + 2px)) saturate(1.03);\r
    box-shadow: inset 1px 0 0 var(--gh-panel-line) !important;\r
}\r
\r
#chatgpt-helper-header,\r
body[data-gh-mode="light"] #chatgpt-helper-header,\r
body[data-gh-mode="dark"] #chatgpt-helper-header {\r
    min-height: 48px;\r
    padding: var(--gh-header-padding-v, 9px) var(--gh-header-padding-h, 12px);\r
    background: var(--gh-panel-surface) !important;\r
    color: var(--gh-text) !important;\r
    border-bottom: 1px solid var(--gh-panel-line);\r
    box-shadow: none !important;\r
}\r
\r
#chatgpt-helper-title {\r
    gap: 8px;\r
    font-size: 14px;\r
    font-weight: 700;\r
    letter-spacing: 0;\r
}\r
\r
#chatgpt-helper-title span:last-child {\r
    color: var(--gh-text);\r
}\r
\r
#chatgpt-helper-controls {\r
    gap: var(--gh-header-controls-gap, 5px);\r
}\r
\r
.chatgpt-helper-header-btn,\r
.prompt-panel-btn,\r
.chatgpt-helper-theme-launch-btn,\r
.chatgpt-helper-prompt-actions button,\r
.outline-toolbar-btn,\r
.chatgpt-helper-conversations-toolbar-btn,\r
.chatgpt-helper-batch-toolbar-btn,\r
.chatgpt-helper-folder-delete-btn,\r
.scroll-nav-btn,\r
.chatgpt-helper-about-close,\r
.chatgpt-helper-theme-modal-close,\r
.chatgpt-helper-quick-btn {\r
    background: var(--gh-control-bg) !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    color: var(--gh-text-secondary) !important;\r
    border-radius: var(--gh-control-radius) !important;\r
    box-shadow: none !important;\r
    transition:\r
        background 0.16s var(--gh-fast-ease),\r
        border-color 0.16s var(--gh-fast-ease),\r
        color 0.16s var(--gh-fast-ease),\r
        transform 0.16s var(--gh-fast-ease),\r
        box-shadow 0.16s var(--gh-fast-ease),\r
        opacity 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-header-btn {\r
    width: var(--gh-header-btn-size, 28px);\r
    height: var(--gh-header-btn-size, 28px);\r
    min-width: var(--gh-header-btn-size, 28px);\r
    padding: 0;\r
    font-size: var(--gh-header-btn-font-size, 14px);\r
    backdrop-filter: none !important;\r
    -webkit-backdrop-filter: none !important;\r
}\r
\r
.prompt-panel-btn.chatgpt-helper-order-btn {\r
    width: 32px;\r
    height: 32px;\r
    min-width: 32px;\r
    padding: 0;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
}\r
\r
.chatgpt-helper-header-btn:hover,\r
.prompt-panel-btn:hover,\r
.chatgpt-helper-theme-launch-btn:hover,\r
.chatgpt-helper-prompt-actions button:hover,\r
.outline-toolbar-btn:hover,\r
.chatgpt-helper-conversations-toolbar-btn:hover,\r
.chatgpt-helper-batch-toolbar-btn:hover,\r
.chatgpt-helper-folder-delete-btn:hover,\r
.scroll-nav-btn:hover,\r
.chatgpt-helper-about-close:hover,\r
.chatgpt-helper-theme-modal-close:hover,\r
.chatgpt-helper-quick-btn:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;\r
    color: var(--gh-text) !important;\r
    transform: translateY(-1px);\r
    box-shadow: var(--gh-panel-card-shadow) !important;\r
}\r
\r
.chatgpt-helper-header-btn:active,\r
.prompt-panel-btn:active,\r
.chatgpt-helper-theme-launch-btn:active,\r
.chatgpt-helper-prompt-actions button:active,\r
.outline-toolbar-btn:active,\r
.chatgpt-helper-conversations-toolbar-btn:active,\r
.chatgpt-helper-batch-toolbar-btn:active,\r
.scroll-nav-btn:active,\r
.chatgpt-helper-quick-btn:active {\r
    transform: translateY(0);\r
    box-shadow: none !important;\r
}\r
\r
#chatgpt-helper-tabs,\r
body[data-gh-mode="light"] #chatgpt-helper-tabs,\r
body[data-gh-mode="dark"] #chatgpt-helper-tabs,\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-tabs,\r
:root[data-gh-page-theme="true"] #chatgpt-helper-tabs {\r
    gap: 4px;\r
    padding: 8px 10px 7px;\r
    background: var(--gh-panel-surface) !important;\r
    border-bottom: 1px solid var(--gh-panel-line);\r
    box-shadow: none !important;\r
    --tab-padding-h: 8px;\r
    --tab-padding-v: 7px;\r
    --tab-gap: 5px;\r
    --tab-margin: 0px;\r
}\r
\r
.chatgpt-helper-tab {\r
    min-height: 34px;\r
    border: 1px solid transparent !important;\r
    border-radius: var(--gh-control-radius) !important;\r
    color: var(--gh-text-secondary) !important;\r
    font-size: 12.5px;\r
    font-weight: 560;\r
    letter-spacing: 0;\r
    line-height: 1.2;\r
    gap: 5px;\r
    transition:\r
        background 0.16s var(--gh-fast-ease),\r
        border-color 0.16s var(--gh-fast-ease),\r
        color 0.16s var(--gh-fast-ease),\r
        box-shadow 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-tab:hover,\r
body[data-gh-mode="dark"] .chatgpt-helper-tab:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: var(--gh-control-border) !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.chatgpt-helper-tab.active,\r
body[data-gh-mode="dark"] .chatgpt-helper-tab.active {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: var(--gh-control-border) !important;\r
    color: var(--gh-text) !important;\r
    font-weight: 650;\r
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-line), transparent 45%) !important;\r
}\r
\r
.chatgpt-helper-tab-icon {\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 62%);\r
}\r
\r
.chatgpt-helper-tab-drag-handle {\r
    opacity: 0.32;\r
    color: color-mix(in srgb, var(--gh-text-secondary), transparent 22%);\r
}\r
\r
#chatgpt-helper-content,\r
.chatgpt-helper-content-panel,\r
body[data-gh-mode="light"] #chatgpt-helper-content,\r
body[data-gh-mode="dark"] #chatgpt-helper-content {\r
    background: var(--gh-panel-surface) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] #chatgpt-helper-content,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-content-panel,\r
:root[data-gh-page-theme="true"] #chatgpt-helper-content,\r
:root[data-gh-page-theme="true"] .chatgpt-helper-content-panel {\r
    background: transparent !important;\r
    background-image: none !important;\r
}\r
\r
.chatgpt-helper-search-bar,\r
.chatgpt-helper-categories,\r
.outline-fixed-toolbar,\r
.chatgpt-helper-conversations-search,\r
.chatgpt-helper-conversations-toolbar,\r
.chatgpt-helper-batch-toolbar,\r
.scroll-nav-container,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,\r
:root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,\r
:root[data-gh-bg-enabled="true"] .scroll-nav-container {\r
    background: var(--gh-panel-subtle) !important;\r
    border-color: var(--gh-panel-line) !important;\r
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-panel-line), transparent 42%) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-search-bar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-categories,\r
:root[data-gh-bg-enabled="true"] .outline-fixed-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-search,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-toolbar,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-batch-toolbar,\r
:root[data-gh-bg-enabled="true"] .scroll-nav-container {\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
}\r
\r
.chatgpt-helper-search-input,\r
.outline-search-input,\r
.chatgpt-helper-conversations-search-input,\r
.chatgpt-helper-folder-select,\r
#chatgpt-helper-right input,\r
#chatgpt-helper-right textarea,\r
#chatgpt-helper-right select {\r
    min-height: 36px;\r
    border-radius: var(--gh-control-radius) !important;\r
    background: var(--gh-input-bg) !important;\r
    border: 1px solid var(--gh-input-border) !important;\r
    color: var(--gh-text) !important;\r
    color-scheme: light;\r
    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%) !important;\r
    transition:\r
        border-color 0.16s var(--gh-fast-ease),\r
        box-shadow 0.16s var(--gh-fast-ease),\r
        background 0.16s var(--gh-fast-ease);\r
}\r
\r
#chatgpt-helper-right select option,\r
#chatgpt-helper-right select optgroup {\r
    background: var(--gh-bg, #ffffff) !important;\r
    color: var(--gh-text, #1f2937) !important;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-search-input,\r
body[data-gh-mode="dark"] .outline-search-input,\r
body[data-gh-mode="dark"] .chatgpt-helper-conversations-search-input,\r
body[data-gh-mode="dark"] .chatgpt-helper-folder-select,\r
body[data-gh-mode="dark"] #chatgpt-helper-right input,\r
body[data-gh-mode="dark"] #chatgpt-helper-right textarea,\r
body[data-gh-mode="dark"] #chatgpt-helper-right select {\r
    color-scheme: dark;\r
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;\r
}\r
\r
body[data-gh-mode="dark"] #chatgpt-helper-right select option,\r
body[data-gh-mode="dark"] #chatgpt-helper-right select optgroup,\r
:root[data-gh-mode="dark"] #chatgpt-helper-right select option,\r
:root[data-gh-mode="dark"] #chatgpt-helper-right select optgroup {\r
    background: var(--gh-input-bg, #0f172a) !important;\r
    color: var(--gh-text, #f8fafc) !important;\r
}\r
\r
.chatgpt-helper-custom-select {\r
    position: relative;\r
    min-width: 150px;\r
    max-width: 240px;\r
    flex: 0 0 auto;\r
    font-size: 14px;\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-custom-select-trigger {\r
    width: 100%;\r
    min-height: 36px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 10px;\r
    padding: 6px 10px 6px 12px;\r
    border-radius: var(--gh-control-radius) !important;\r
    background: var(--gh-input-bg) !important;\r
    border: 1px solid var(--gh-input-border) !important;\r
    color: var(--gh-text) !important;\r
    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 78%) !important;\r
    cursor: pointer;\r
    text-align: left;\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-custom-select-trigger {\r
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;\r
}\r
\r
.chatgpt-helper-custom-select-value {\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-custom-select-icon {\r
    color: var(--gh-text-secondary);\r
    font-size: 12px;\r
    line-height: 1;\r
    transition: transform 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-custom-select.open .chatgpt-helper-custom-select-icon {\r
    transform: rotate(180deg);\r
}\r
\r
.chatgpt-helper-custom-select-menu {\r
    position: absolute;\r
    z-index: 10020;\r
    top: calc(100% + 6px);\r
    right: 0;\r
    width: 100%;\r
    max-height: 190px;\r
    overflow-y: auto;\r
    display: none;\r
    padding: 4px;\r
    border-radius: var(--gh-control-radius);\r
    background: var(--gh-bg) !important;\r
    border: 1px solid var(--gh-input-border);\r
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.22);\r
}\r
\r
body[data-gh-mode="dark"] .chatgpt-helper-custom-select-menu,\r
:root[data-gh-mode="dark"] .chatgpt-helper-custom-select-menu {\r
    background: var(--gh-input-bg, #0f172a) !important;\r
    box-shadow: 0 18px 42px rgba(2, 6, 23, 0.62);\r
}\r
\r
.chatgpt-helper-custom-select.open .chatgpt-helper-custom-select-menu {\r
    display: block;\r
    position: static;\r
    margin-top: 6px;\r
}\r
\r
.chatgpt-helper-custom-select-option {\r
    width: 100%;\r
    min-height: 34px;\r
    display: block;\r
    padding: 7px 10px;\r
    border: 0;\r
    border-radius: calc(var(--gh-control-radius) - 2px);\r
    background: transparent;\r
    color: var(--gh-text);\r
    cursor: pointer;\r
    font: inherit;\r
    text-align: left;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-custom-select-option:hover,\r
.chatgpt-helper-custom-select-option:focus {\r
    outline: none;\r
    background: var(--gh-hover);\r
}\r
\r
.chatgpt-helper-custom-select-option.selected {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 72%);\r
    color: var(--gh-text);\r
    font-weight: 700;\r
}\r
\r
.chatgpt-helper-search-input:focus,\r
.outline-search-input:focus,\r
.chatgpt-helper-conversations-search-input:focus,\r
.chatgpt-helper-folder-select:focus,\r
#chatgpt-helper-right input:focus,\r
#chatgpt-helper-right textarea:focus,\r
#chatgpt-helper-right select:focus {\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;\r
    box-shadow: 0 0 0 3px var(--gh-focus-ring), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 80%) !important;\r
    outline: none !important;\r
}\r
\r
.chatgpt-helper-prompt-list,\r
.chatgpt-helper-conversations-root,\r
.outline-list-wrapper,\r
.chatgpt-helper-settings-scroll,\r
.chatgpt-helper-export-container {\r
    padding: 12px 10px 16px !important;\r
}\r
\r
.chatgpt-helper-add-btn {\r
    min-height: 40px;\r
    margin: 0 0 10px;\r
    border-radius: var(--gh-card-radius) !important;\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 18%) !important;\r
    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 42%) !important;\r
    color: #ffffff !important;\r
    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;\r
    font-weight: 700;\r
}\r
\r
.chatgpt-helper-add-btn:hover {\r
    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 62%) !important;\r
    transform: translateY(-1px);\r
    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%) !important;\r
}\r
\r
.chatgpt-helper-prompt-item,\r
.chatgpt-helper-conversation-item,\r
.chatgpt-helper-folder-item,\r
.chatgpt-helper-conversations-list,\r
.chatgpt-helper-setting-section,\r
.chatgpt-helper-setting-item,\r
.chatgpt-helper-about-btn,\r
.chatgpt-helper-export-grid .menu-item,\r
.outline-item.user-query-node,\r
.chatgpt-helper-empty-state,\r
.chatgpt-helper-theme-block {\r
    background: var(--gh-panel-card) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    border-radius: var(--gh-card-radius) !important;\r
    box-shadow: var(--gh-panel-card-shadow) !important;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversation-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-folder-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-conversations-list,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-section,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-setting-item,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-about-btn,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item,\r
:root[data-gh-bg-enabled="true"] .outline-item.user-query-node,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-empty-state,\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-theme-block {\r
    background: var(--gh-panel-card-bg) !important;\r
    border-color: var(--gh-panel-card-border) !important;\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.02);\r
}\r
\r
.chatgpt-helper-prompt-item:hover,\r
.chatgpt-helper-conversation-item:hover,\r
.chatgpt-helper-folder-item:hover,\r
.chatgpt-helper-setting-item:hover,\r
.chatgpt-helper-about-btn:hover,\r
.chatgpt-helper-export-grid .menu-item:hover,\r
.outline-item:hover {\r
    background: var(--gh-panel-card-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%) !important;\r
    box-shadow: var(--gh-panel-elevated-shadow) !important;\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-prompt-item.selected,\r
.chatgpt-helper-folder-item.default,\r
.chatgpt-helper-folder-item.expanded,\r
.chatgpt-helper-conversation-item.pinned,\r
.outline-item.sync-highlight,\r
.outline-item.highlight,\r
.outline-item.matched,\r
.outline-toolbar-btn.active,\r
.chatgpt-helper-conversations-toolbar-btn.batch-mode.active {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 82%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 34%) !important;\r
    color: var(--gh-text) !important;\r
    box-shadow:\r
        0 0 0 2px color-mix(in srgb, var(--gh-primary), transparent 80%),\r
        var(--gh-panel-card-shadow) !important;\r
}\r
\r
.outline-toolbar-btn.active,\r
.chatgpt-helper-conversations-toolbar-btn.batch-mode.active {\r
    color: #ffffff !important;\r
    background: color-mix(in srgb, var(--gh-primary), transparent 10%) !important;\r
}\r
\r
.chatgpt-helper-prompt-title,\r
.chatgpt-helper-folder-name,\r
.chatgpt-helper-setting-item-label,\r
.chatgpt-helper-about-name,\r
.chatgpt-helper-theme-block-title {\r
    color: var(--gh-text) !important;\r
    letter-spacing: 0;\r
}\r
\r
.chatgpt-helper-prompt-content,\r
.chatgpt-helper-setting-item-desc,\r
.chatgpt-helper-folder-count,\r
.chatgpt-helper-about-tagline,\r
.chatgpt-helper-about-section-text {\r
    color: var(--gh-text-secondary) !important;\r
}\r
\r
.chatgpt-helper-conversation-pin {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 20%);\r
    opacity: 0.84;\r
}\r
\r
.chatgpt-helper-conversation-tags {\r
    display: flex;\r
    flex-wrap: wrap;\r
    gap: 4px;\r
    margin-top: 6px;\r
}\r
\r
.chatgpt-helper-conversation-tag {\r
    display: inline-flex;\r
    align-items: center;\r
    max-width: 100%;\r
    min-height: 18px;\r
    padding: 2px 6px;\r
    border-radius: 999px;\r
    background: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 78%);\r
    border: 1px solid color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), transparent 64%);\r
    color: color-mix(in srgb, var(--gh-tag-color, var(--gh-primary)), var(--gh-text) 38%);\r
    font-size: 11px;\r
    font-weight: 650;\r
    line-height: 1;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-category-tag,\r
.user-query-badge,\r
.heading-level-badge {\r
    background: var(--gh-control-bg) !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    color: var(--gh-text-secondary) !important;\r
    border-radius: 999px !important;\r
    font-weight: 650;\r
}\r
\r
.chatgpt-helper-category-tag:hover,\r
.user-query-badge:hover,\r
.heading-level-badge:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.chatgpt-helper-category-tag.active {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%) !important;\r
    color: #ffffff !important;\r
    box-shadow: 0 8px 18px color-mix(in srgb, var(--gh-primary), transparent 80%) !important;\r
}\r
\r
.outline-list {\r
    gap: 3px;\r
}\r
\r
.outline-item {\r
    min-height: 32px;\r
    border-radius: var(--gh-row-radius) !important;\r
    border: 1px solid transparent !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.outline-item-toggle,\r
.outline-item-copy-btn {\r
    color: var(--gh-text-secondary) !important;\r
}\r
\r
.outline-item-toggle:hover,\r
.outline-item-copy-btn:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 88%) !important;\r
    color: var(--gh-primary) !important;\r
}\r
\r
.chatgpt-helper-setting-section {\r
    padding: 0 !important;\r
    overflow: visible;\r
    margin-bottom: 12px !important;\r
}\r
\r
.chatgpt-helper-setting-section-header {\r
    background: transparent !important;\r
    border-bottom: 1px solid var(--gh-panel-muted-line) !important;\r
}\r
\r
.chatgpt-helper-setting-item {\r
    margin: 8px 0 !important;\r
    padding: 12px !important;\r
}\r
\r
.setting-toggle {\r
    background: color-mix(in srgb, var(--gh-border), transparent 24%) !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
}\r
\r
.setting-toggle.active {\r
    background: var(--gh-primary) !important;\r
    border-color: var(--gh-primary) !important;\r
}\r
\r
.chatgpt-helper-toggle {\r
    width: 44px;\r
    height: 24px;\r
    padding: 2px;\r
    border: 1px solid var(--gh-control-border);\r
    border-radius: 999px;\r
    background: color-mix(in srgb, var(--gh-border), transparent 24%);\r
    cursor: pointer;\r
    position: relative;\r
    outline: none;\r
    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-toggle.active {\r
    background: var(--gh-primary);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 10%);\r
    box-shadow: 0 6px 16px color-mix(in srgb, var(--gh-primary), transparent 82%);\r
}\r
\r
.chatgpt-helper-toggle-knob {\r
    width: 18px;\r
    height: 18px;\r
    border-radius: 999px;\r
    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #f8fafc) 10%);\r
    box-shadow: 0 1px 4px rgba(2, 6, 23, 0.22);\r
    pointer-events: none;\r
    transition: transform 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-toggle.active .chatgpt-helper-toggle-knob {\r
    transform: translateX(20px);\r
}\r
\r
#chatgpt-helper-theme-modal {\r
    background: color-mix(in srgb, #020617, transparent 20%) !important;\r
    backdrop-filter: blur(10px);\r
    -webkit-backdrop-filter: blur(10px);\r
}\r
\r
.chatgpt-helper-theme-modal-dialog,\r
body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {\r
    background: var(--gh-panel-surface) !important;\r
    color: var(--gh-text) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    border-radius: 14px !important;\r
    box-shadow: 0 30px 90px rgba(2, 6, 23, 0.48), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 88%) !important;\r
}\r
\r
.chatgpt-helper-prompt-dialog-overlay {\r
    position: fixed;\r
    inset: 0;\r
    z-index: 10000;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 16px;\r
    background: color-mix(in srgb, #020617, transparent 22%);\r
    backdrop-filter: blur(8px);\r
    -webkit-backdrop-filter: blur(8px);\r
}\r
\r
.chatgpt-helper-prompt-dialog {\r
    width: min(500px, calc(100vw - 32px));\r
    max-height: min(680px, calc(100vh - 32px));\r
    overflow: auto;\r
    padding: 18px;\r
    background: var(--gh-panel-surface);\r
    color: var(--gh-text);\r
    border: 1px solid var(--gh-panel-line);\r
    border-radius: 14px;\r
    box-shadow: 0 28px 80px rgba(2, 6, 23, 0.42), inset 0 1px 0 color-mix(in srgb, #ffffff, transparent 86%);\r
}\r
\r
.chatgpt-helper-compact-dialog {\r
    width: min(420px, calc(100vw - 32px));\r
}\r
\r
.chatgpt-helper-prompt-dialog-title {\r
    margin: 0 0 14px;\r
    color: var(--gh-text);\r
    font-size: 16px;\r
    font-weight: 750;\r
    line-height: 1.35;\r
    letter-spacing: 0;\r
}\r
\r
.chatgpt-helper-prompt-dialog-field {\r
    width: 100%;\r
    min-height: 38px;\r
    margin: 0 0 10px;\r
    padding: 10px 11px;\r
    box-sizing: border-box;\r
    border-radius: var(--gh-control-radius);\r
    border: 1px solid var(--gh-input-border);\r
    background: var(--gh-input-bg);\r
    color: var(--gh-text);\r
    font-size: 14px;\r
    line-height: 1.4;\r
    outline: none;\r
    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), background 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-prompt-dialog-field::placeholder {\r
    color: color-mix(in srgb, var(--gh-text-secondary), transparent 12%);\r
}\r
\r
.chatgpt-helper-prompt-dialog-field:focus {\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 20%);\r
    box-shadow: 0 0 0 3px var(--gh-focus-ring);\r
}\r
\r
.chatgpt-helper-prompt-dialog-textarea {\r
    min-height: 132px;\r
    resize: vertical;\r
    font-family: inherit;\r
}\r
\r
.chatgpt-helper-prompt-dialog-actions {\r
    display: flex;\r
    justify-content: flex-end;\r
    gap: 8px;\r
    margin-top: 4px;\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn {\r
    min-height: 36px;\r
    padding: 0 14px;\r
    border-radius: var(--gh-control-radius);\r
    cursor: pointer;\r
    font-size: 14px;\r
    font-weight: 700;\r
    border: 1px solid var(--gh-control-border);\r
    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn.secondary {\r
    background: var(--gh-control-bg);\r
    color: var(--gh-text-secondary);\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn.primary {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 36%);\r
    color: #ffffff;\r
    box-shadow: 0 8px 20px color-mix(in srgb, var(--gh-primary), transparent 82%);\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn:hover {\r
    transform: translateY(-1px);\r
    box-shadow: var(--gh-panel-card-shadow);\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn.secondary:hover {\r
    background: var(--gh-control-bg-hover);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%);\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-prompt-dialog-btn.primary:hover {\r
    background: color-mix(in srgb, var(--gh-primary-hover), var(--gh-primary) 64%);\r
    box-shadow: 0 10px 24px color-mix(in srgb, var(--gh-primary), transparent 76%);\r
}\r
\r
.chatgpt-helper-context-menu {\r
    z-index: 10001;\r
    min-width: 168px;\r
    padding: 5px;\r
    background: var(--gh-panel-card);\r
    color: var(--gh-text);\r
    border: 1px solid var(--gh-panel-line);\r
    border-radius: var(--gh-control-radius);\r
    box-shadow: var(--gh-panel-elevated-shadow);\r
    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);\r
}\r
\r
.chatgpt-helper-context-menu-item {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    min-height: 32px;\r
    padding: 0 10px;\r
    border-radius: 7px;\r
    color: var(--gh-text-secondary);\r
    cursor: pointer;\r
    font-size: 13px;\r
    font-weight: 600;\r
    line-height: 1;\r
    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-context-menu-item:hover {\r
    background: var(--gh-control-bg-hover);\r
    color: var(--gh-text);\r
}\r
\r
.chatgpt-helper-context-menu-item.danger {\r
    color: color-mix(in srgb, var(--gh-danger), var(--gh-text-secondary) 30%);\r
}\r
\r
.chatgpt-helper-context-menu-item.danger:hover {\r
    background: color-mix(in srgb, var(--gh-danger), transparent 90%);\r
    color: var(--gh-danger);\r
}\r
\r
.chatgpt-helper-toast {\r
    position: fixed;\r
    left: 50%;\r
    bottom: 20px;\r
    z-index: 10120;\r
    max-width: min(420px, calc(100vw - 32px));\r
    padding: 10px 14px;\r
    transform: translateX(-50%);\r
    background: var(--gh-panel-card);\r
    color: var(--gh-text);\r
    border: 1px solid var(--gh-panel-line);\r
    border-radius: var(--gh-control-radius);\r
    box-shadow: var(--gh-panel-elevated-shadow);\r
    font-size: 13px;\r
    font-weight: 650;\r
    line-height: 1.35;\r
    text-align: center;\r
    animation: fadeIn 0.2s var(--gh-fast-ease);\r
    backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur, 10px)) saturate(1.02);\r
}\r
\r
.chatgpt-helper-loading-overlay {\r
    position: fixed;\r
    inset: 0;\r
    z-index: 99999;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 20px;\r
    background: color-mix(in srgb, #020617, transparent 18%);\r
    color: var(--gh-text);\r
    backdrop-filter: blur(10px);\r
    -webkit-backdrop-filter: blur(10px);\r
}\r
\r
.chatgpt-helper-loading-spinner {\r
    width: 34px;\r
    height: 34px;\r
    margin-bottom: 14px;\r
    border-radius: 999px;\r
    border: 3px solid color-mix(in srgb, var(--gh-primary), transparent 78%);\r
    border-top-color: color-mix(in srgb, var(--gh-primary), #ffffff 18%);\r
    animation: ghSpin 0.9s linear infinite;\r
}\r
\r
.chatgpt-helper-loading-text {\r
    margin-bottom: 6px;\r
    font-size: 15px;\r
    font-weight: 700;\r
    color: #ffffff;\r
}\r
\r
.chatgpt-helper-loading-hint {\r
    margin-bottom: 14px;\r
    color: rgba(255, 255, 255, 0.72);\r
    font-size: 12px;\r
}\r
\r
.chatgpt-helper-loading-stop-btn {\r
    min-height: 34px;\r
    padding: 0 14px;\r
    border-radius: var(--gh-control-radius);\r
    border: 1px solid color-mix(in srgb, #ffffff, transparent 72%);\r
    background: color-mix(in srgb, #ffffff, transparent 90%);\r
    color: #ffffff;\r
    cursor: pointer;\r
    font-size: 13px;\r
    font-weight: 700;\r
    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-loading-stop-btn:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 78%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 32%);\r
    transform: translateY(-1px);\r
}\r
\r
@keyframes ghSpin {\r
    to { transform: rotate(360deg); }\r
}\r
\r
.chatgpt-helper-theme-modal-header,\r
.chatgpt-helper-about-header {\r
    background: var(--gh-panel-subtle) !important;\r
    border-bottom: 1px solid var(--gh-panel-line) !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.chatgpt-helper-theme-side,\r
.chatgpt-helper-theme-preset-grid,\r
.chatgpt-helper-theme-upload,\r
.chatgpt-helper-theme-row,\r
.chatgpt-helper-theme-preview {\r
    background: var(--gh-panel-card) !important;\r
    border-color: var(--gh-panel-line) !important;\r
    border-radius: var(--gh-card-radius) !important;\r
}\r
\r
.chatgpt-helper-theme-segment {\r
    background: var(--gh-control-bg) !important;\r
    border-color: var(--gh-control-border) !important;\r
    border-radius: var(--gh-control-radius) !important;\r
}\r
\r
.chatgpt-helper-theme-segment button {\r
    color: var(--gh-text-secondary) !important;\r
}\r
\r
.chatgpt-helper-theme-segment button.active {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;\r
    color: #ffffff !important;\r
}\r
\r
.chatgpt-helper-theme-preset {\r
    border-radius: var(--gh-control-radius) !important;\r
}\r
\r
.chatgpt-helper-theme-preset.active {\r
    box-shadow:\r
        0 0 0 2px var(--gh-panel-surface),\r
        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 20%),\r
        var(--gh-panel-card-shadow) !important;\r
}\r
\r
#chatgpt-helper-theme-modal {\r
    padding: 18px !important;\r
    background: color-mix(in srgb, #020617, transparent 22%) !important;\r
    backdrop-filter: blur(8px) saturate(1.02) !important;\r
    -webkit-backdrop-filter: blur(8px) saturate(1.02) !important;\r
}\r
\r
.chatgpt-helper-theme-modal-dialog,\r
body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {\r
    width: min(1040px, calc(100vw - 32px)) !important;\r
    height: min(760px, calc(100vh - 32px)) !important;\r
    background: var(--gh-panel-surface) !important;\r
    color: var(--gh-text) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    border-radius: 14px !important;\r
    box-shadow: 0 26px 72px color-mix(in srgb, #020617, transparent 52%) !important;\r
}\r
\r
.chatgpt-helper-theme-modal-header {\r
    height: 52px !important;\r
    min-height: 52px !important;\r
    padding: 0 14px 0 16px !important;\r
    background: var(--gh-panel-subtle) !important;\r
    border-bottom: 1px solid var(--gh-panel-line) !important;\r
}\r
\r
.chatgpt-helper-theme-modal-title {\r
    display: inline-flex;\r
    align-items: center;\r
    gap: 9px;\r
    min-width: 0;\r
    color: var(--gh-text);\r
    font-size: 15px;\r
    font-weight: 750;\r
    line-height: 1;\r
    letter-spacing: 0;\r
}\r
\r
.chatgpt-helper-theme-modal-title-icon {\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 16%);\r
    flex: 0 0 auto;\r
}\r
\r
.chatgpt-helper-theme-modal-close {\r
    width: 32px !important;\r
    height: 32px !important;\r
    padding: 0 !important;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: var(--gh-control-radius) !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    background: var(--gh-control-bg) !important;\r
    color: var(--gh-text-secondary) !important;\r
    box-shadow: none !important;\r
    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;\r
}\r
\r
.chatgpt-helper-theme-modal-close:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 44%) !important;\r
    color: var(--gh-text) !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-theme-modal-close:focus-visible,\r
.chatgpt-helper-theme-launch-btn:focus-visible,\r
.chatgpt-helper-theme-segment button:focus-visible,\r
.chatgpt-helper-theme-preset:focus-visible,\r
.chatgpt-helper-theme-row input:focus-visible {\r
    outline: 2px solid var(--gh-focus-ring) !important;\r
    outline-offset: 2px;\r
}\r
\r
.chatgpt-helper-theme-modal-body {\r
    grid-template-columns: minmax(420px, 1fr) minmax(340px, 420px) !important;\r
    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 24%) !important;\r
    overflow: hidden !important;\r
}\r
\r
.chatgpt-helper-theme-main {\r
    padding: 14px 18px 18px 16px !important;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 12px;\r
    min-width: 0;\r
    overflow: auto !important;\r
    scrollbar-gutter: stable;\r
}\r
\r
.chatgpt-helper-theme-workbench-preview {\r
    padding: 14px !important;\r
    background: color-mix(in srgb, var(--gh-panel-subtle), transparent 10%) !important;\r
    border-left: 1px solid var(--gh-panel-line) !important;\r
    overflow: auto !important;\r
    scrollbar-gutter: stable;\r
}\r
\r
.chatgpt-helper-theme-main,\r
.chatgpt-helper-theme-workbench-preview,\r
.chatgpt-helper-theme-modal-body {\r
    scrollbar-width: thin;\r
    scrollbar-color: color-mix(in srgb, var(--gh-text-secondary), transparent 48%) transparent;\r
}\r
\r
.chatgpt-helper-theme-main::-webkit-scrollbar,\r
.chatgpt-helper-theme-workbench-preview::-webkit-scrollbar,\r
.chatgpt-helper-theme-modal-body::-webkit-scrollbar {\r
    width: 8px;\r
    height: 8px;\r
}\r
\r
.chatgpt-helper-theme-main::-webkit-scrollbar-button,\r
.chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-button,\r
.chatgpt-helper-theme-modal-body::-webkit-scrollbar-button {\r
    width: 0;\r
    height: 0;\r
    display: none;\r
}\r
\r
.chatgpt-helper-theme-main::-webkit-scrollbar-track,\r
.chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-track,\r
.chatgpt-helper-theme-modal-body::-webkit-scrollbar-track {\r
    background: transparent;\r
}\r
\r
.chatgpt-helper-theme-main::-webkit-scrollbar-thumb,\r
.chatgpt-helper-theme-workbench-preview::-webkit-scrollbar-thumb,\r
.chatgpt-helper-theme-modal-body::-webkit-scrollbar-thumb {\r
    border-radius: 999px;\r
    background: color-mix(in srgb, var(--gh-text-secondary), transparent 54%);\r
    border: 2px solid transparent;\r
    background-clip: padding-box;\r
}\r
\r
.chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block,\r
.chatgpt-helper-theme-workbench-preview {\r
    margin: 0 !important;\r
    border-radius: 10px !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-theme-workbench-settings .chatgpt-helper-theme-block {\r
    padding: 13px !important;\r
    background: color-mix(in srgb, var(--gh-panel-card), transparent 8%) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
}\r
\r
.chatgpt-helper-theme-block-title {\r
    margin: 0 0 10px !important;\r
    color: var(--gh-text);\r
    font-size: 12px !important;\r
    font-weight: 750 !important;\r
    line-height: 1.2;\r
    letter-spacing: 0;\r
}\r
\r
.chatgpt-helper-theme-segment {\r
    width: 100%;\r
    height: 36px;\r
    display: grid !important;\r
    grid-template-columns: repeat(3, minmax(0, 1fr));\r
    padding: 3px;\r
    gap: 3px;\r
    border-radius: 9px !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    background: var(--gh-control-bg) !important;\r
    overflow: visible !important;\r
}\r
\r
.chatgpt-helper-theme-segment button {\r
    min-width: 0;\r
    padding: 0 10px !important;\r
    border: 0 !important;\r
    border-radius: 7px !important;\r
    background: transparent !important;\r
    color: var(--gh-text-secondary) !important;\r
    font-size: 12px !important;\r
    font-weight: 700 !important;\r
    line-height: 1;\r
    white-space: nowrap;\r
    transition: background 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;\r
}\r
\r
.chatgpt-helper-theme-segment button:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.chatgpt-helper-theme-segment button.active {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 16%) !important;\r
    color: #ffffff !important;\r
    box-shadow: 0 5px 14px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;\r
}\r
\r
.chatgpt-helper-theme-preset-grid {\r
    display: flex !important;\r
    flex-wrap: wrap;\r
    align-items: center;\r
    gap: 10px !important;\r
    padding: 0 !important;\r
    background: transparent !important;\r
    border: 0 !important;\r
    border-radius: 0 !important;\r
    box-shadow: none !important;\r
    overflow: visible !important;\r
    isolation: isolate;\r
}\r
\r
.chatgpt-helper-theme-preset {\r
    flex: 0 0 58px;\r
    width: 58px !important;\r
    height: 34px !important;\r
    min-width: 0;\r
    padding: 0 !important;\r
    border-radius: 8px !important;\r
    border: 1px solid color-mix(in srgb, currentColor, var(--gh-panel-card) 40%) !important;\r
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 82%) !important;\r
    transform: none !important;\r
    position: relative;\r
    transition: border-color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease), opacity 0.16s var(--gh-fast-ease) !important;\r
}\r
\r
.chatgpt-helper-theme-preset:hover {\r
    transform: none !important;\r
    opacity: 0.92;\r
}\r
\r
.chatgpt-helper-theme-preset.active {\r
    z-index: 2;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 8%) !important;\r
    box-shadow:\r
        0 0 0 2px var(--gh-panel-card),\r
        0 0 0 4px color-mix(in srgb, var(--gh-primary), transparent 36%) !important;\r
}\r
\r
.chatgpt-helper-theme-preset.is-original {\r
    flex-basis: 132px;\r
    width: 132px !important;\r
    min-width: 0 !important;\r
    max-width: 160px;\r
    padding: 0 12px !important;\r
    color: var(--gh-text) !important;\r
    background: linear-gradient(\r
        135deg,\r
        color-mix(in srgb, var(--gh-panel-card), var(--gh-primary) 10%),\r
        color-mix(in srgb, var(--gh-panel-subtle), var(--gh-text-secondary) 12%)\r
    ) !important;\r
    font-size: 11px !important;\r
    font-weight: 750 !important;\r
    letter-spacing: 0 !important;\r
    white-space: nowrap;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
.chatgpt-helper-theme-upload {\r
    height: 146px !important;\r
    min-height: 0 !important;\r
    padding: 12px !important;\r
    border: 1px dashed color-mix(in srgb, var(--gh-control-border), var(--gh-primary) 14%) !important;\r
    border-radius: 10px !important;\r
    background: var(--gh-control-bg) !important;\r
    box-shadow: none !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-theme-upload.dragging {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-control-bg) 82%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 18%) !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-theme-upload-bg {\r
    filter: brightness(0.72) saturate(0.95) !important;\r
    opacity: 0.9 !important;\r
}\r
\r
.chatgpt-helper-theme-upload.has-image::after {\r
    background: linear-gradient(\r
        180deg,\r
        color-mix(in srgb, #020617, transparent 58%) 0%,\r
        color-mix(in srgb, #020617, transparent 32%) 100%\r
    ) !important;\r
}\r
\r
.chatgpt-helper-theme-upload-content {\r
    gap: 6px !important;\r
}\r
\r
.chatgpt-helper-theme-upload-icon {\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 18%);\r
}\r
\r
.chatgpt-helper-theme-upload-title {\r
    color: var(--gh-text);\r
    font-size: 13px;\r
    font-weight: 750;\r
    line-height: 1.25;\r
}\r
\r
.chatgpt-helper-theme-upload-hint {\r
    color: var(--gh-text-secondary);\r
    font-size: 11px;\r
    line-height: 1.25;\r
}\r
\r
.chatgpt-helper-theme-upload-actions {\r
    display: flex;\r
    flex-wrap: wrap;\r
    justify-content: center;\r
    gap: 7px;\r
    margin-top: 4px;\r
}\r
\r
.chatgpt-helper-theme-launch-btn {\r
    min-height: 31px !important;\r
    padding: 0 10px !important;\r
    border-radius: var(--gh-control-radius) !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    background: var(--gh-control-bg) !important;\r
    color: var(--gh-text) !important;\r
    box-shadow: none !important;\r
    font-size: 12px !important;\r
    font-weight: 700 !important;\r
    letter-spacing: 0 !important;\r
    transition: background 0.16s var(--gh-fast-ease), border-color 0.16s var(--gh-fast-ease), color 0.16s var(--gh-fast-ease), box-shadow 0.16s var(--gh-fast-ease) !important;\r
}\r
\r
.chatgpt-helper-theme-launch-btn:hover {\r
    background: var(--gh-control-bg-hover) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 42%) !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-theme-launch-btn:disabled {\r
    opacity: 0.42;\r
    cursor: default;\r
}\r
\r
.chatgpt-helper-theme-row {\r
    display: grid !important;\r
    grid-template-columns: minmax(150px, 1fr) minmax(192px, 242px);\r
    align-items: center !important;\r
    min-height: 42px;\r
    margin: 8px 0 0 !important;\r
    padding: 8px 10px !important;\r
    gap: 10px !important;\r
    border-radius: 9px !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    background: color-mix(in srgb, var(--gh-control-bg), transparent 8%) !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-theme-row > span:first-child {\r
    min-width: 0;\r
    color: var(--gh-text);\r
    font-size: 12px;\r
    font-weight: 650;\r
    line-height: 1.3;\r
}\r
\r
.chatgpt-helper-theme-range-control {\r
    display: grid;\r
    grid-template-columns: minmax(0, 1fr) 42px;\r
    align-items: center;\r
    gap: 8px;\r
    justify-self: end;\r
    width: min(100%, 242px);\r
}\r
\r
.chatgpt-helper-theme-value {\r
    min-width: 42px;\r
    color: var(--gh-text-secondary);\r
    font-size: 11px;\r
    font-weight: 700;\r
    text-align: right;\r
    font-variant-numeric: tabular-nums;\r
}\r
\r
.chatgpt-helper-theme-row input[type="range"] {\r
    width: 100% !important;\r
    height: 20px;\r
    appearance: none !important;\r
    -webkit-appearance: none !important;\r
    background: transparent;\r
    accent-color: var(--gh-primary);\r
    cursor: pointer;\r
}\r
\r
.chatgpt-helper-theme-row input[type="range"]::-webkit-slider-runnable-track {\r
    height: 4px;\r
    border-radius: 999px;\r
    background: color-mix(in srgb, var(--gh-text-secondary), transparent 62%);\r
}\r
\r
.chatgpt-helper-theme-row input[type="range"]::-webkit-slider-thumb {\r
    appearance: none;\r
    -webkit-appearance: none;\r
    width: 16px;\r
    height: 16px;\r
    margin-top: -6px;\r
    border: 2px solid var(--gh-panel-card);\r
    border-radius: 50%;\r
    background: var(--gh-primary);\r
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.24);\r
}\r
\r
.chatgpt-helper-theme-row input[type="range"]:disabled {\r
    opacity: 0.35;\r
    cursor: not-allowed;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"] {\r
    justify-self: end;\r
    width: 40px !important;\r
    height: 22px !important;\r
    border: 1px solid var(--gh-control-border) !important;\r
    background: color-mix(in srgb, var(--gh-border), transparent 28%) !important;\r
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #ffffff, transparent 90%) !important;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]::after {\r
    top: 2px !important;\r
    left: 2px !important;\r
    width: 16px !important;\r
    height: 16px !important;\r
    background: color-mix(in srgb, #ffffff, var(--gh-theme-light, #ffffff) 10%) !important;\r
    box-shadow: 0 1px 3px color-mix(in srgb, #020617, transparent 74%) !important;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]:checked {\r
    background: color-mix(in srgb, var(--gh-primary), var(--gh-panel-card) 8%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 12%) !important;\r
}\r
\r
.chatgpt-helper-theme-row input[type="checkbox"]:checked::after {\r
    transform: translateX(18px) !important;\r
}\r
\r
.chatgpt-helper-theme-preview {\r
    width: 100%;\r
    min-height: 328px !important;\r
    max-height: min(430px, calc(100vh - 174px));\r
    aspect-ratio: 4 / 3;\r
    border-radius: 10px !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    background: var(--gh-panel-card) !important;\r
    box-shadow: none !important;\r
    overflow: hidden !important;\r
    isolation: isolate;\r
}\r
\r
.chatgpt-helper-theme-preview-bg {\r
    z-index: 0;\r
    background-position: center !important;\r
    filter: blur(var(--gh-preview-blur, 0px)) !important;\r
}\r
\r
.chatgpt-helper-theme-preview.has-bg::after {\r
    content: none;\r
}\r
\r
.chatgpt-helper-theme-preview-inner {\r
    grid-template-columns: 82px minmax(0, 1fr) !important;\r
    min-height: 100% !important;\r
    height: 100%;\r
    z-index: 1;\r
}\r
\r
.chatgpt-helper-theme-preview-nav {\r
    padding: 12px 8px !important;\r
    overflow: hidden;\r
}\r
\r
.chatgpt-helper-theme-preview-chat {\r
    padding: 13px !important;\r
    gap: 10px !important;\r
    min-width: 0;\r
    overflow: hidden;\r
}\r
\r
.chatgpt-helper-theme-preview-msg {\r
    border-radius: 10px !important;\r
    padding: 9px 10px !important;\r
    color: var(--gh-text);\r
    font-size: 12px !important;\r
    line-height: 1.35 !important;\r
    box-shadow: none !important;\r
    max-width: min(84%, 290px) !important;\r
    overflow-wrap: anywhere;\r
}\r
\r
.chatgpt-helper-theme-preview-input {\r
    width: calc(100% - 10px);\r
    height: 33px !important;\r
    margin: auto 5px 8px;\r
    border-radius: 10px !important;\r
    /* Appearance is supplied by the same tokens as the actual composer. */\r
}\r
\r
@media (max-width: 920px) {\r
    .chatgpt-helper-theme-modal-dialog,\r
    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {\r
        height: min(820px, calc(100vh - 24px)) !important;\r
    }\r
\r
    .chatgpt-helper-theme-modal-body {\r
        grid-template-columns: 1fr !important;\r
        overflow: auto !important;\r
    }\r
\r
    .chatgpt-helper-theme-workbench-preview {\r
        border-left: 0 !important;\r
        border-top: 1px solid var(--gh-panel-line) !important;\r
    }\r
\r
    .chatgpt-helper-theme-workbench-preview .chatgpt-helper-theme-block-title {\r
        position: static;\r
    }\r
}\r
\r
@media (max-width: 560px) {\r
    #chatgpt-helper-theme-modal {\r
        padding: 10px !important;\r
    }\r
\r
    .chatgpt-helper-theme-modal-dialog,\r
    body[data-gh-mode="dark"] .chatgpt-helper-theme-modal-dialog {\r
        width: calc(100vw - 20px) !important;\r
        height: calc(100vh - 20px) !important;\r
    }\r
\r
    .chatgpt-helper-theme-main,\r
    .chatgpt-helper-theme-workbench-preview {\r
        padding: 10px !important;\r
    }\r
\r
    .chatgpt-helper-theme-row {\r
        align-items: flex-start;\r
        grid-template-columns: 1fr;\r
    }\r
\r
    .chatgpt-helper-theme-range-control {\r
        width: 100%;\r
        flex-basis: auto;\r
        grid-template-columns: minmax(0, 1fr) 42px;\r
    }\r
\r
    .chatgpt-helper-theme-preview-inner {\r
        grid-template-columns: 64px minmax(0, 1fr) !important;\r
    }\r
}\r
\r
.chatgpt-helper-export-panel,\r
.chatgpt-helper-export-container,\r
.chatgpt-helper-export-host {\r
    background: transparent !important;\r
    color: var(--gh-text) !important;\r
}\r
\r
.chatgpt-helper-export-host :is(button, input, select, textarea),\r
[data-gh-exporter-host="true"] :is(button, input, select, textarea) {\r
    border-radius: var(--gh-control-radius) !important;\r
}\r
\r
.chatgpt-helper-export-grid {\r
    padding: 12px 14px 18px !important;\r
    gap: 7px !important;\r
    grid-template-columns: minmax(0, 1fr) !important;\r
    align-content: start !important;\r
    grid-auto-rows: minmax(42px, auto) !important;\r
}\r
\r
.chatgpt-helper-export-grid > :is(.row-full, .row-half) {\r
    grid-column: auto !important;\r
}\r
\r
.chatgpt-helper-export-grid > :is(.row-full, .row-half):not(.menu-item) {\r
    display: contents !important;\r
    grid-column: auto !important;\r
}\r
\r
.chatgpt-helper-export-grid .menu-item {\r
    display: flex !important;\r
    min-height: 42px !important;\r
    height: auto !important;\r
    flex-direction: row !important;\r
    align-items: center !important;\r
    justify-content: flex-start !important;\r
    margin: 0 !important;\r
    padding: 6px 12px !important;\r
    gap: 10px !important;\r
    border-radius: 9px !important;\r
    border: 1px solid color-mix(in srgb, var(--gh-panel-line), transparent 20%) !important;\r
    background: color-mix(in srgb, var(--gh-panel-card), transparent 18%) !important;\r
    color: var(--gh-text) !important;\r
    box-shadow: none !important;\r
    text-align: left !important;\r
    overflow: hidden;\r
    box-sizing: border-box !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-export-grid .menu-item:hover {\r
    background: color-mix(in srgb, var(--gh-panel-card-hover), transparent 12%) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 54%) !important;\r
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary), transparent 82%) !important;\r
    transform: none !important;\r
}\r
\r
.chatgpt-helper-export-grid .menu-item-icon {\r
    width: 24px !important;\r
    height: 24px !important;\r
    display: flex !important;\r
    align-items: center !important;\r
    justify-content: center !important;\r
    flex: 0 0 24px !important;\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%) !important;\r
}\r
\r
.chatgpt-helper-export-grid .menu-item-icon svg,\r
.chatgpt-helper-export-grid .menu-item > svg {\r
    width: 17px !important;\r
    height: 17px !important;\r
    color: currentColor !important;\r
    flex: 0 0 auto !important;\r
}\r
\r
.chatgpt-helper-export-grid .menu-item-label {\r
    min-width: 0 !important;\r
    flex: 1 1 auto !important;\r
    overflow: hidden !important;\r
    text-overflow: ellipsis !important;\r
    white-space: nowrap !important;\r
    color: var(--gh-text) !important;\r
    font-size: 12.8px !important;\r
    font-weight: 600 !important;\r
    line-height: 1.3 !important;\r
}\r
\r
/* \u5BFC\u51FA\u6A21\u5757\uFF1A\u7981\u6B62\u6A2A\u5411\u6EA2\u51FA\uFF0C\u4E0E\u9762\u677F\u5185\u5BB9\u5BF9\u9F50 */\r
.chatgpt-helper-export-grid,\r
.chatgpt-helper-export-host,\r
.chatgpt-helper-export-container {\r
    overflow-x: hidden !important;\r
    max-width: 100% !important;\r
}\r
\r
.scroll-nav-container,\r
body[data-gh-mode="dark"] .scroll-nav-container {\r
    gap: 8px;\r
    padding: 10px 12px;\r
    background: var(--gh-panel-surface) !important;\r
    border-top: 1px solid var(--gh-panel-line) !important;\r
}\r
\r
.scroll-nav-btn {\r
    min-height: 36px;\r
    padding: 8px 10px;\r
    font-weight: 700;\r
    gap: 6px;\r
}\r
\r
.scroll-nav-btn[style*="opacity: 0.4"],\r
.chatgpt-helper-quick-btn.disabled,\r
.chatgpt-helper-quick-btn[disabled],\r
.prompt-panel-btn[disabled] {\r
    opacity: 0.38 !important;\r
    cursor: default !important;\r
    box-shadow: none !important;\r
}\r
\r
.scroll-nav-btn[style*="opacity: 0.4"]:hover,\r
.chatgpt-helper-quick-btn.disabled:hover,\r
.chatgpt-helper-quick-btn[disabled]:hover,\r
.prompt-panel-btn[disabled]:hover {\r
    transform: none !important;\r
    border-color: var(--gh-control-border) !important;\r
    background: var(--gh-control-bg) !important;\r
}\r
\r
.chatgpt-helper-quick-buttons,\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons {\r
    gap: 8px;\r
    padding: 7px;\r
    background: color-mix(in srgb, var(--gh-panel-surface), transparent 8%) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    border-radius: 16px !important;\r
    box-shadow: var(--gh-panel-elevated-shadow) !important;\r
    backdrop-filter: blur(18px) saturate(1.04);\r
    -webkit-backdrop-filter: blur(18px) saturate(1.04);\r
}\r
\r
.chatgpt-helper-btn-divider {\r
    height: 1px;\r
    margin: 2px 6px;\r
    background: var(--gh-panel-muted-line) !important;\r
}\r
\r
.chatgpt-helper-prompt-actions .delete-btn:hover,\r
.chatgpt-helper-folder-delete-btn:hover,\r
.chatgpt-helper-batch-toolbar-btn.danger:hover {\r
    color: var(--gh-danger) !important;\r
    border-color: color-mix(in srgb, var(--gh-danger), transparent 28%) !important;\r
    background: color-mix(in srgb, var(--gh-danger), transparent 90%) !important;\r
}\r
\r
.chatgpt-helper-prompt-toolbar {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    padding: 10px 12px 9px;\r
    background: var(--gh-panel-subtle) !important;\r
    border-bottom: 1px solid var(--gh-panel-line) !important;\r
    box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--gh-panel-line), transparent 58%);\r
    flex: 0 0 auto;\r
}\r
\r
:root[data-gh-bg-enabled="true"] .chatgpt-helper-prompt-toolbar {\r
    backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
    -webkit-backdrop-filter: blur(var(--gh-panel-blur)) saturate(1.03);\r
}\r
\r
/* \u6781\u7A84\u9762\u677F\uFF1A\u9690\u85CF\u201C\u6DFB\u52A0\u65B0\u63D0\u793A\u8BCD\u201D\u6309\u94AE\uFF0C\u53EA\u4FDD\u7559\u641C\u7D22\u6846\uFF1B\u5361\u7247\u7F16\u8F91/\u5220\u9664\u6309\u94AE\u4E00\u5E76\u9690\u85CF\uFF0C\r
   \u5E76\u56DE\u6536\u4E3A\u6309\u94AE\u9884\u7559\u7684\u53F3\u4FA7\u7A7A\u95F4\uFF0C\u8BA9\u6807\u9898/\u6B63\u6587\u5360\u6EE1\u6574\u884C */\r
.chatgpt-helper-content-panel.compact .chatgpt-helper-add-btn,\r
.chatgpt-helper-content-panel.compact .chatgpt-helper-prompt-actions {\r
    display: none;\r
}\r
\r
.chatgpt-helper-content-panel.compact .chatgpt-helper-prompt-content-wrapper {\r
    padding-right: 0 !important;\r
}\r
\r
.chatgpt-helper-prompt-search-bar {\r
    position: relative;\r
    flex: 1 1 auto;\r
    min-width: 0;\r
    padding: 0 !important;\r
    border: 0 !important;\r
    background: transparent !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-prompt-search-icon {\r
    position: absolute;\r
    left: 12px;\r
    top: 50%;\r
    transform: translateY(-50%);\r
    color: var(--gh-text-secondary);\r
    pointer-events: none;\r
    opacity: 0.72;\r
    z-index: 1;\r
}\r
\r
.chatgpt-helper-prompt-search-bar .chatgpt-helper-search-input {\r
    padding-left: 34px !important;\r
    padding-right: 10px !important;\r
    min-height: 32px !important;\r
    font-size: 13px !important;\r
}\r
\r
.chatgpt-helper-add-btn-compact {\r
    width: auto !important;\r
    min-width: 38px;\r
    max-width: 124px;\r
    min-height: 36px !important;\r
    margin: 0 !important;\r
    padding: 0 11px !important;\r
    flex: 0 0 auto;\r
    border-radius: var(--gh-control-radius) !important;\r
    gap: 6px;\r
    overflow: hidden;\r
    font-size: 12.5px !important;\r
    font-weight: 720 !important;\r
}\r
\r
.chatgpt-helper-add-btn-compact span {\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-prompt-categories {\r
    padding: 7px 12px 8px !important;\r
    gap: 5px !important;\r
    align-items: center;\r
    flex-wrap: nowrap !important;\r
    overflow-x: auto;\r
    overflow-y: hidden;\r
    scrollbar-width: none;\r
}\r
\r
.chatgpt-helper-prompt-categories::-webkit-scrollbar {\r
    display: none;\r
}\r
\r
.chatgpt-helper-category-tag {\r
    font: inherit;\r
    appearance: none;\r
    -webkit-appearance: none;\r
    text-align: center;\r
    white-space: nowrap;\r
    flex: 0 0 auto;\r
}\r
\r
.chatgpt-helper-prompt-categories .chatgpt-helper-category-tag {\r
    min-height: 23px !important;\r
    padding: 0 8px !important;\r
    border-radius: 999px !important;\r
    font-size: 11.5px !important;\r
    font-weight: 650 !important;\r
    line-height: 1 !important;\r
    letter-spacing: 0 !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-prompt-categories .chatgpt-helper-category-tag.active,\r
body[data-gh-mode="dark"] .chatgpt-helper-prompt-categories .chatgpt-helper-category-tag.active {\r
    box-shadow: 0 3px 10px color-mix(in srgb, var(--gh-primary), transparent 84%) !important;\r
}\r
\r
.chatgpt-helper-prompt-list {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 7px;\r
    padding: 9px 10px 16px !important;\r
}\r
\r
.chatgpt-helper-prompt-item {\r
    min-height: 68px;\r
    margin-bottom: 0 !important;\r
    padding: 10px 10px 10px 34px !important;\r
    overflow: hidden;\r
    isolation: isolate;\r
}\r
\r
.chatgpt-helper-prompt-item::before {\r
    content: '';\r
    position: absolute;\r
    left: 0;\r
    top: 10px;\r
    bottom: 10px;\r
    width: 3px;\r
    border-radius: 0 999px 999px 0;\r
    background: transparent;\r
    transition: background 0.16s var(--gh-fast-ease), opacity 0.16s var(--gh-fast-ease);\r
    opacity: 0;\r
}\r
\r
.chatgpt-helper-prompt-item:hover::before {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 46%);\r
    opacity: 1;\r
}\r
\r
.chatgpt-helper-prompt-item.selected::before {\r
    background: var(--gh-primary);\r
    opacity: 1;\r
}\r
\r
.chatgpt-helper-prompt-content-wrapper {\r
    min-width: 0;\r
    margin-left: 0 !important;\r
    padding-right: 56px !important;\r
    position: relative;\r
}\r
\r
.chatgpt-helper-prompt-item-header {\r
    display: flex;\r
    align-items: center;\r
    gap: 7px;\r
    min-width: 0;\r
    margin-bottom: 4px;\r
}\r
\r
.chatgpt-helper-prompt-title {\r
    flex: 1 1 auto;\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    font-size: 13px !important;\r
    font-weight: 710 !important;\r
    line-height: 1.3;\r
}\r
\r
.chatgpt-helper-prompt-category-pill {\r
    max-width: 104px;\r
    min-height: 20px;\r
    padding: 0 6px;\r
    border-radius: 999px;\r
    border: 1px solid color-mix(in srgb, var(--gh-primary), transparent 70%);\r
    background: color-mix(in srgb, var(--gh-primary), transparent 90%);\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text) 28%);\r
    font: inherit;\r
    font-size: 10.5px;\r
    font-weight: 700;\r
    line-height: 1;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    cursor: pointer;\r
    flex: 0 1 auto;\r
}\r
\r
.chatgpt-helper-prompt-category-pill:hover {\r
    background: color-mix(in srgb, var(--gh-primary), transparent 82%);\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 48%);\r
}\r
\r
.chatgpt-helper-prompt-content {\r
    display: -webkit-box;\r
    -webkit-line-clamp: 2;\r
    -webkit-box-orient: vertical;\r
    overflow: hidden;\r
    white-space: normal !important;\r
    text-overflow: clip !important;\r
    font-size: 12px !important;\r
    line-height: 1.42 !important;\r
}\r
\r
.chatgpt-helper-prompt-actions {\r
    top: -1px !important;\r
    right: 0 !important;\r
    gap: 5px !important;\r
    opacity: 0.72;\r
    transition: opacity 0.16s var(--gh-fast-ease), transform 0.16s var(--gh-fast-ease);\r
}\r
\r
.chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-actions,\r
.chatgpt-helper-prompt-item:focus-within .chatgpt-helper-prompt-actions {\r
    opacity: 1;\r
    transform: translateY(-1px);\r
}\r
\r
.chatgpt-helper-prompt-actions button {\r
    width: 26px !important;\r
    height: 26px !important;\r
    border-radius: 7px !important;\r
    background: color-mix(in srgb, var(--gh-panel-card), transparent 10%) !important;\r
    border: 1px solid var(--gh-panel-line) !important;\r
    color: var(--gh-text-secondary) !important;\r
    box-shadow: none !important;\r
}\r
\r
.chatgpt-helper-prompt-actions .edit-btn:hover {\r
    color: var(--gh-primary) !important;\r
    border-color: color-mix(in srgb, var(--gh-primary), transparent 38%) !important;\r
    background: color-mix(in srgb, var(--gh-primary), transparent 90%) !important;\r
}\r
\r
.chatgpt-helper-prompt-drag-handle {\r
    left: 8px !important;\r
    width: 18px !important;\r
    opacity: 0.28;\r
}\r
\r
.chatgpt-helper-prompt-item:hover .chatgpt-helper-prompt-drag-handle,\r
.chatgpt-helper-prompt-item:focus-within .chatgpt-helper-prompt-drag-handle {\r
    opacity: 0.86;\r
}\r
\r
.chatgpt-helper-prompt-empty {\r
    margin: 6px 0;\r
    padding: 28px 18px !important;\r
    min-height: 210px;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 9px;\r
    text-align: center;\r
}\r
\r
.chatgpt-helper-prompt-empty-icon {\r
    color: color-mix(in srgb, var(--gh-primary), var(--gh-text-secondary) 34%);\r
    opacity: 0.86;\r
}\r
\r
.chatgpt-helper-prompt-empty-title {\r
    color: var(--gh-text);\r
    font-size: 14px;\r
    font-weight: 750;\r
    line-height: 1.3;\r
}\r
\r
.chatgpt-helper-prompt-empty-desc {\r
    max-width: 220px;\r
    color: var(--gh-text-secondary);\r
    font-size: 12.5px;\r
    line-height: 1.45;\r
}\r
\r
.chatgpt-helper-empty-add-btn {\r
    width: auto !important;\r
    min-height: 34px !important;\r
    margin: 6px 0 0 !important;\r
    padding: 0 12px !important;\r
    border-radius: var(--gh-control-radius) !important;\r
}\r
\r
#chatgpt-helper-right button:focus-visible,\r
#chatgpt-helper-right input:focus-visible,\r
#chatgpt-helper-right textarea:focus-visible,\r
#chatgpt-helper-right select:focus-visible,\r
.chatgpt-helper-quick-btn:focus-visible {\r
    outline: 2px solid var(--gh-focus-ring) !important;\r
    outline-offset: 2px;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
    #chatgpt-helper-right,\r
    #chatgpt-helper-right *,\r
    .chatgpt-helper-quick-buttons,\r
    .chatgpt-helper-quick-buttons * {\r
        transition-duration: 0.01ms !important;\r
        animation-duration: 0.01ms !important;\r
    }\r
}\r
\r
/* ==================== \u63D0\u793A\u8BCD\u6392\u5E8F\u9009\u62E9\u5668\uFF08\u7D27\u51D1\u7248\uFF09 ==================== */\r
.chatgpt-helper-prompt-sort-select {\r
    min-width: 0;\r
    flex: 0 0 auto;\r
    font-size: 12px;\r
}\r
\r
.chatgpt-helper-prompt-sort-select .chatgpt-helper-custom-select-trigger {\r
    min-height: 30px;\r
    padding: 4px 8px;\r
    gap: 6px;\r
    font-size: 12px;\r
    border-radius: 7px;\r
}\r
\r
.chatgpt-helper-prompt-sort-select .chatgpt-helper-custom-select-value {\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-prompt-sort-select .chatgpt-helper-custom-select-menu {\r
    position: absolute;\r
    min-width: 128px;\r
    width: auto;\r
    z-index: 10030;\r
}\r
\r
.chatgpt-helper-prompt-sort-select.open .chatgpt-helper-custom-select-menu {\r
    display: block;\r
    position: absolute;\r
    margin-top: 0;\r
}\r
\r
/* \u6781\u7A84\u9762\u677F\u9690\u85CF\u6392\u5E8F\u9009\u62E9\u5668 */\r
.chatgpt-helper-content-panel.compact .chatgpt-helper-prompt-sort-select {\r
    display: none;\r
}\r
\r
/* ==================== \u63D0\u793A\u8BCD\u53D8\u91CF\u586B\u5199\u5BF9\u8BDD\u6846 ==================== */\r
.chatgpt-helper-prompt-variables-prompt-name {\r
    font-size: 12px;\r
    color: var(--gh-text-secondary, #6b7280);\r
    margin: -6px 0 4px;\r
}\r
\r
.chatgpt-helper-prompt-variables-desc {\r
    font-size: 12.5px;\r
    color: var(--gh-text-secondary, #6b7280);\r
    margin-bottom: 12px;\r
}\r
\r
.chatgpt-helper-prompt-variables-row {\r
    display: flex;\r
    align-items: center;\r
    gap: 10px;\r
    margin-bottom: 10px;\r
}\r
\r
.chatgpt-helper-prompt-variables-label {\r
    flex: 0 0 auto;\r
    min-width: 96px;\r
    max-width: 42%;\r
    font-size: 12.5px;\r
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\r
    color: var(--gh-text, #111827);\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
.chatgpt-helper-prompt-variables-row input {\r
    flex: 1 1 auto;\r
    min-width: 0;\r
}\r
\r
/* ==================== \u8F93\u5165\u6846 / \u5FEB\u901F\u5524\u8D77\u83DC\u5355\uFF08\u9875\u9762\u7EA7\u6D6E\u52A8\uFF09 ==================== */\r
.gh-quick-menu {\r
    position: fixed;\r
    z-index: 2147483000;\r
    opacity: 1 !important;\r
    backdrop-filter: none !important;\r
    -webkit-backdrop-filter: none !important;\r
    min-width: 280px;\r
    max-width: 380px;\r
    display: none;\r
    flex-direction: column;\r
    padding: 5px;\r
    border-radius: 12px;\r
    /* \u6E10\u53D8\u5F62\u5F0F\u7684\u7EAF\u8272\u80CC\u666F\uFF1A\u4E0D\u4F1A\u88AB\u58C1\u7EB8\u900F\u660E\u5316\u89C4\u5219\uFF08\u4EC5\u6E05 background-color\uFF09\u6D17\u6389 */\r
    background: linear-gradient(#ffffff, #ffffff) !important;\r
    border: 1px solid rgba(15, 23, 42, 0.12);\r
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.20);\r
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu,\r
:root[data-gh-mode="dark"] .gh-quick-menu,\r
body.dark .gh-quick-menu {\r
    background: linear-gradient(#26272a, #26272a) !important;\r
    border-color: rgba(255, 255, 255, 0.14);\r
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55);\r
}\r
\r
.gh-quick-menu.open {\r
    display: flex;\r
}\r
\r
.gh-quick-menu-list {\r
    max-height: 276px;\r
    overflow-y: auto;\r
}\r
\r
.gh-quick-menu-item {\r
    display: flex;\r
    align-items: center;\r
    gap: 9px;\r
    padding: 7px 9px;\r
    border-radius: 8px;\r
    cursor: pointer;\r
}\r
\r
.gh-quick-menu-item.active {\r
    background: rgba(59, 130, 246, 0.12);\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-item.active,\r
:root[data-gh-mode="dark"] .gh-quick-menu-item.active,\r
body.dark .gh-quick-menu-item.active {\r
    background: rgba(255, 255, 255, 0.10);\r
}\r
\r
.gh-quick-menu-item-icon {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    width: 22px;\r
    height: 22px;\r
    border-radius: 6px;\r
    background: rgba(15, 23, 42, 0.06);\r
    color: #334155;\r
    flex: 0 0 auto;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-item-icon,\r
:root[data-gh-mode="dark"] .gh-quick-menu-item-icon,\r
body.dark .gh-quick-menu-item-icon {\r
    background: rgba(255, 255, 255, 0.07);\r
    color: #cbd5e1;\r
}\r
\r
.gh-quick-menu-item-main {\r
    flex: 1 1 auto;\r
    min-width: 0;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 8px;\r
}\r
\r
.gh-quick-menu-item-title {\r
    font-size: 13px;\r
    font-weight: 500;\r
    color: #0f172a;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-item-title,\r
:root[data-gh-mode="dark"] .gh-quick-menu-item-title,\r
body.dark .gh-quick-menu-item-title {\r
    color: #ececf1;\r
}\r
\r
.gh-quick-menu-item-meta {\r
    display: inline-flex;\r
    align-items: center;\r
    gap: 6px;\r
    flex: 0 0 auto;\r
}\r
\r
.gh-quick-menu-item-category {\r
    font-size: 11px;\r
    padding: 1px 7px;\r
    border-radius: 999px;\r
    background: rgba(59, 130, 246, 0.10);\r
    color: #2563eb;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-item-category,\r
:root[data-gh-mode="dark"] .gh-quick-menu-item-category,\r
body.dark .gh-quick-menu-item-category {\r
    background: rgba(255, 255, 255, 0.08);\r
    color: #93c5fd;\r
}\r
\r
.gh-quick-menu-item-vars {\r
    font-size: 11px;\r
    color: #9ca3af;\r
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\r
}\r
\r
.gh-quick-menu-empty {\r
    padding: 14px 10px;\r
    font-size: 12.5px;\r
    color: #6b7280;\r
    text-align: center;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-empty,\r
:root[data-gh-mode="dark"] .gh-quick-menu-empty,\r
body.dark .gh-quick-menu-empty {\r
    color: #9ca3af;\r
}\r
\r
.gh-quick-menu-hint {\r
    padding: 6px 8px 3px;\r
    border-top: 1px solid rgba(15, 23, 42, 0.08);\r
    font-size: 11px;\r
    color: #9ca3af;\r
    white-space: nowrap;\r
}\r
\r
body[data-gh-mode="dark"] .gh-quick-menu-hint,\r
:root[data-gh-mode="dark"] .gh-quick-menu-hint,\r
body.dark .gh-quick-menu-hint {\r
    border-top-color: rgba(255, 255, 255, 0.08);\r
}\r
\r
/* ==================== \u591A\u9009\u6D88\u606F\u5BFC\u51FA\uFF08\u9875\u9762\u7EA7\u6D6E\u52A8\uFF09 ==================== */\r
.gh-msg-select-turn {\r
    position: relative;\r
}\r
\r
.gh-msg-select-check {\r
    position: absolute;\r
    top: 10px;\r
    right: 10px;\r
    z-index: 30;\r
    width: 22px;\r
    height: 22px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 0;\r
    border-radius: 999px;\r
    border: 1.5px solid rgba(15, 23, 42, 0.22);\r
    background: rgba(255, 255, 255, 0.86);\r
    color: transparent;\r
    cursor: pointer;\r
    opacity: 0;\r
    transition: opacity 0.12s ease, background 0.12s ease, border-color 0.12s ease;\r
}\r
\r
.gh-msg-select-turn:hover .gh-msg-select-check,\r
.gh-msg-select-check.checked,\r
.gh-msg-select-check:focus-visible {\r
    opacity: 1;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-check,\r
:root[data-gh-mode="dark"] .gh-msg-select-check,\r
body.dark .gh-msg-select-check {\r
    border-color: rgba(255, 255, 255, 0.30);\r
    background: rgba(32, 33, 35, 0.88);\r
}\r
\r
.gh-msg-select-check.checked {\r
    border-color: #10b981;\r
    background: #10b981;\r
    color: #ffffff;\r
}\r
\r
.gh-msg-select-turn.gh-msg-selected > .gh-msg-select-check {\r
    opacity: 1;\r
}\r
\r
.gh-msg-select-toolbar {\r
    position: fixed;\r
    left: 50%;\r
    transform: translateX(-50%) translateY(12px);\r
    bottom: 132px;\r
    z-index: 2147483000;\r
    opacity: 1 !important;\r
    backdrop-filter: none !important;\r
    -webkit-backdrop-filter: none !important;\r
    display: none;\r
    align-items: center;\r
    gap: 8px;\r
    padding: 8px 10px;\r
    border-radius: 14px;\r
    background: linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)) !important;\r
    border: 1px solid rgba(15, 23, 42, 0.10);\r
    box-shadow: 0 16px 44px rgba(15, 23, 42, 0.24);\r
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\r
    opacity: 0;\r
    transition: opacity 0.16s ease, transform 0.16s ease;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar,\r
body.dark .gh-msg-select-toolbar {\r
    background: linear-gradient(rgba(32, 33, 35, 0.97), rgba(32, 33, 35, 0.97)) !important;\r
    border-color: rgba(255, 255, 255, 0.12);\r
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);\r
}\r
\r
.gh-msg-select-toolbar.open {\r
    display: flex;\r
    opacity: 1;\r
    transform: translateX(-50%) translateY(0);\r
}\r
\r
.gh-msg-select-toolbar-count {\r
    font-size: 12.5px;\r
    font-weight: 600;\r
    color: #0f172a;\r
    padding: 0 4px 0 6px;\r
    white-space: nowrap;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-count,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-count,\r
body.dark .gh-msg-select-toolbar-count {\r
    color: #ececf1;\r
}\r
\r
.gh-msg-select-toolbar-btn {\r
    font-size: 12px;\r
    padding: 5px 10px;\r
    border-radius: 8px;\r
    border: 1px solid rgba(59, 130, 246, 0.35);\r
    background: rgba(59, 130, 246, 0.10);\r
    color: #2563eb;\r
    cursor: pointer;\r
    white-space: nowrap;\r
    transition: background 0.12s ease;\r
}\r
\r
.gh-msg-select-toolbar-btn:hover {\r
    background: rgba(59, 130, 246, 0.20);\r
}\r
\r
.gh-msg-select-toolbar-btn.secondary {\r
    border-color: rgba(15, 23, 42, 0.16);\r
    background: rgba(15, 23, 42, 0.05);\r
    color: #475569;\r
}\r
\r
.gh-msg-select-toolbar-btn.secondary:hover {\r
    background: rgba(15, 23, 42, 0.10);\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-btn,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-btn {\r
    border-color: rgba(147, 197, 253, 0.35);\r
    background: rgba(59, 130, 246, 0.16);\r
    color: #93c5fd;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-btn:hover,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-btn:hover {\r
    background: rgba(59, 130, 246, 0.28);\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-btn.secondary,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-btn.secondary {\r
    border-color: rgba(255, 255, 255, 0.16);\r
    background: rgba(255, 255, 255, 0.06);\r
    color: #cbd5e1;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-btn.secondary:hover,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-btn.secondary:hover {\r
    background: rgba(255, 255, 255, 0.12);\r
}\r
\r
.gh-msg-select-toolbar-close {\r
    width: 24px;\r
    height: 24px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    border-radius: 999px;\r
    border: 0;\r
    background: transparent;\r
    color: #6b7280;\r
    cursor: pointer;\r
}\r
\r
.gh-msg-select-toolbar-close:hover {\r
    background: rgba(15, 23, 42, 0.08);\r
    color: #0f172a;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-close,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-close {\r
    color: #9ca3af;\r
}\r
\r
body[data-gh-mode="dark"] .gh-msg-select-toolbar-close:hover,\r
:root[data-gh-mode="dark"] .gh-msg-select-toolbar-close:hover {\r
    background: rgba(255, 255, 255, 0.10);\r
    color: #ececf1;\r
}\r
\r
/* ==================== \u5BFC\u51FA\u5F15\u64CE\u6309\u9700\u52A0\u8F7D\u72B6\u6001 ==================== */\r
.chatgpt-helper-export-engine-loading {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 8px;\r
    min-height: 120px;\r
    font-size: 13px;\r
    color: var(--gh-text-secondary, #6b7280);\r
}\r
\r
.chatgpt-helper-export-engine-loading::before {\r
    content: '';\r
    width: 14px;\r
    height: 14px;\r
    border-radius: 999px;\r
    border: 2px solid var(--gh-panel-muted-line, rgba(0, 0, 0, 0.12));\r
    border-top-color: var(--gh-primary, #3b82f6);\r
    animation: gh-export-engine-spin 0.8s linear infinite;\r
}\r
\r
@keyframes gh-export-engine-spin {\r
    to { transform: rotate(360deg); }\r
}\r
\r
.chatgpt-helper-export-engine-error {\r
    padding: 14px 12px;\r
    font-size: 13px;\r
    color: var(--gh-text-secondary, #6b7280);\r
}\r
\r
/* \u54CD\u5E94\u5F0F\u8C03\u6574\u4E2D\u680F - \u901A\u8FC7 JS \u52A8\u6001\u66F4\u65B0 */\r
\r
.chatgpt-helper-about-avatar { width:64px; height:64px; overflow:hidden; }\r
.chatgpt-helper-about-avatar img { display:block; width:100%; height:100%; object-fit:cover; }\r
`,dr={createStyles(){const n=document.documentElement,e=getComputedStyle(document.body).fontFamily.trim();e&&!/[;{}]/.test(e)&&n.style.setProperty("--gh-font-family",e),n.style.setProperty("--gh-panel-width",this.settings.panelWidth+"px");let t=document.getElementById("chatgpt-helper-styles");t||(t=document.createElement("style"),t.id="chatgpt-helper-styles",document.head.appendChild(t)),t.textContent!==Pt&&(t.textContent=Pt)}},gr={createLayout(){this.panel=document.getElementById("chatgpt-helper-right"),this.panel||(this.panel=l("div",{id:"chatgpt-helper-right",className:this.isCollapsed?"collapsed":""}),document.body.appendChild(this.panel)),this.initResizeHandle(),this.adjustChatGPTLayout()},adjustChatGPTLayout(){const n=()=>{const e=this.isCollapsed||window.innerWidth<768?0:this.settings.panelWidth;try{document.documentElement.style.setProperty("--gh-panel-margin-right",`${e}px`)}catch{}let t=document.getElementById("chatgpt-helper-layout-style");t||(t=document.createElement("style"),t.id="chatgpt-helper-layout-style",t.textContent=`
                    /* \u53EA\u8C03\u6574\u4E3B\u5BB9\u5668\u7684\u53F3\u8FB9\u8DDD\uFF0C\u4E3A\u53F3\u4FA7\u9762\u677F\u7559\u51FA\u7A7A\u95F4\uFF08\u7531 CSS \u53D8\u91CF\u9A71\u52A8\uFF09 */
                    main,
                    [role="main"] {
                        margin-right: var(--gh-panel-margin-right, 0px) !important;
                        transition: margin-right 0.3s ease !important;
                    }

                    /* \u786E\u4FDD\u9875\u9762\u4E0D\u6A2A\u5411\u6EDA\u52A8 */
                    body {
                        overflow-x: hidden !important;
                    }
                `,document.head.appendChild(t))};n(),this.updateLayout=n},initResizeHandle(){if(!this.panel)return;this.resizeHandleCleanup?.();const n=this.panel;let e=n.querySelector("#chatgpt-helper-resize-handle");e||(e=document.createElement("div"),e.id="chatgpt-helper-resize-handle",n.appendChild(e));const t=ce-56,r=v=>Math.max(ce,Math.min(Ce,v));let a=!1,o=0,i=0,s=0,h=0,p=null,d="",c=0;const g=()=>i+o-h,m=v=>{this.settings.panelWidth=v,n.style.width=`${v}px`},x=(v=!0,I=!1)=>{a&&(a=!1,p!==null&&cancelAnimationFrame(p),p=null,document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",L),window.removeEventListener("blur",B),document.body.style.userSelect=d,document.body.classList.remove("gh-resizing"),n.classList.remove("gh-resizing"),v&&(m(I?s:r(g())),I&&!this.isCollapsed?this.toggleCollapse():(this.updateLayout?.(),this.saveSettings())))},b=v=>{if(a){if(v.buttons===0){x();return}if(h=v.clientX,g()<t){x(!0,!0);return}p===null&&(p=requestAnimationFrame(()=>{if(p=null,!a)return;m(r(g()));const I=performance.now();I-c>=50&&(c=I,this.updateLayout?.())}))}},L=v=>{v.button!==0||!a||(h=v.clientX,x(!0,g()<t))},B=()=>x(),S=v=>{v.button!==0||this.isCollapsed||this.destroyed||a||(v.preventDefault(),o=h=v.clientX,i=n.getBoundingClientRect().width||this.settings.panelWidth,s=r(this.settings.panelWidth||i),d=document.body.style.userSelect,a=!0,document.body.style.userSelect="none",document.body.classList.add("gh-resizing"),n.classList.add("gh-resizing"),c=-1/0,document.addEventListener("mousemove",b),document.addEventListener("mouseup",L),window.addEventListener("blur",B))};e.addEventListener("mousedown",S),this.resizeHandleCleanup=()=>{x(!1),e.removeEventListener("mousedown",S)},!this.resizeHandleScopeBound&&this.scope&&(this.resizeHandleScopeBound=!0,this.scope.cleanups.push(()=>this.resizeHandleCleanup?.()))},initTabResponsiveSpacing(n){if(!n)return;this.tabSpacingObserver&&(this.tabSpacingObserver.disconnect(),this.tabSpacingObserver=null),this.panelSpacingObserver&&(this.panelSpacingObserver.disconnect(),this.panelSpacingObserver=null);const e=()=>{const a=n.getBoundingClientRect().width;if(n.classList.toggle("icons-only",a<300),a<300){const o=Math.max(.3,(a-200)/100);n.style.setProperty("--tab-padding-h",`${Math.max(4,8*o)}px`),n.style.setProperty("--tab-padding-v",`${Math.max(5,7*o)}px`),n.style.setProperty("--tab-gap",`${Math.max(2,5*o)}px`),n.style.setProperty("--tab-margin","0px")}else if(a<400){const o=.75+(a-300)/400;n.style.setProperty("--tab-padding-h",`${4*o}px`),n.style.setProperty("--tab-padding-v",`${7*o}px`),n.style.setProperty("--tab-gap",`${5*o}px`),n.style.setProperty("--tab-margin","0px")}else n.style.setProperty("--tab-padding-h","8px"),n.style.setProperty("--tab-padding-v","7px"),n.style.setProperty("--tab-gap","5px"),n.style.setProperty("--tab-margin","0px")};e();let t=null;const r=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.tabSpacingObserver=new ResizeObserver(()=>{r()}),this.tabSpacingObserver.observe(n),this.panel&&(this.panelSpacingObserver=new ResizeObserver(()=>{r()}),this.panelSpacingObserver.observe(this.panel))},initHeaderResponsiveSpacing(n){if(!n)return;this.headerSpacingObserver&&(this.headerSpacingObserver.disconnect(),this.headerSpacingObserver=null);const e=()=>{try{const a=n.getBoundingClientRect().width,o=a<318;n.classList.toggle("gh-compact",o),a<270?(n.style.setProperty("--gh-header-btn-size","22px"),n.style.setProperty("--gh-header-controls-gap","2px"),n.style.setProperty("--gh-header-padding-h","8px"),n.style.setProperty("--gh-header-padding-v","9px"),n.style.setProperty("--gh-header-btn-font-size","12px")):a<348?(n.style.setProperty("--gh-header-btn-size","24px"),n.style.setProperty("--gh-header-controls-gap","2px"),n.style.setProperty("--gh-header-padding-h","10px"),n.style.setProperty("--gh-header-padding-v","10px"),n.style.setProperty("--gh-header-btn-font-size","13px")):a<404?(n.style.setProperty("--gh-header-btn-size","26px"),n.style.setProperty("--gh-header-controls-gap","3px"),n.style.setProperty("--gh-header-padding-h","12px"),n.style.setProperty("--gh-header-padding-v","11px"),n.style.setProperty("--gh-header-btn-font-size","13px")):(n.style.removeProperty("--gh-header-btn-size"),n.style.removeProperty("--gh-header-controls-gap"),n.style.removeProperty("--gh-header-padding-h"),n.style.removeProperty("--gh-header-padding-v"),n.style.removeProperty("--gh-header-btn-font-size"))}catch{}};e();let t=null;const r=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.headerSpacingObserver=new ResizeObserver(()=>r()),this.headerSpacingObserver.observe(n)},initScrollNavResponsive(n){if(!n)return;this.scrollNavObserver&&(this.scrollNavObserver.disconnect(),this.scrollNavObserver=null);const e=()=>{const a=n.getBoundingClientRect().width;n.classList.toggle("icons-only",a<250)};e();let t=null;const r=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.scrollNavObserver=new ResizeObserver(()=>r()),this.scrollNavObserver.observe(n)},initPromptsResponsive(n){if(!n)return;this.promptsResponsiveObserver&&(this.promptsResponsiveObserver.disconnect(),this.promptsResponsiveObserver=null);const e=()=>{const a=n.getBoundingClientRect().width;n.classList.toggle("compact",a<300)};e();let t=null;const r=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.promptsResponsiveObserver=new ResizeObserver(()=>r()),this.promptsResponsiveObserver.observe(n)},updateCollapseButtonState(){const n=document.getElementById("chatgpt-helper-collapse-btn");if(!n)return;const e=this.isCollapsed?this.t("expand"):this.t("collapse");J(n,this.isCollapsed?"panelExpand":"panelCollapse",{size:16}),n.title=e,n.setAttribute("aria-label",e)},getTabOrder(){const n=["prompts","outline","conversations","export"],e=Array.isArray(this.settings.tabOrder)&&this.settings.tabOrder.length>0?this.settings.tabOrder.filter(t=>n.includes(t)):[];return e.length>0?e:[...n]},getTabLabel(n){return n==="prompts"?this.t("tabPrompts"):n==="outline"?this.t("tabOutline"):n==="conversations"?this.t("tabConversations"):n==="export"?this.t("tabExport"):n==="settings"?this.t("tabSettings"):n},renderTabBar(n){if(!n)return;K(n);const e=this.getTabOrder();!e.includes(this.currentTab)&&this.currentTab!=="settings"&&(this.currentTab=e[0]||"prompts"),e.forEach(t=>{const r=Le[t];if(!r)return;const a=l("button",{className:`chatgpt-helper-tab ${this.currentTab===t?"active":""}`,"data-tab":t,id:`${t}-tab`,type:"button",role:"tab","aria-selected":String(this.currentTab===t),"aria-controls":`${t}-content`,"aria-label":this.getTabLabel(t),tabindex:this.currentTab===t?0:-1,title:this.getTabLabel(t)});a.appendChild(_(r.iconName||"list",{size:15,className:"chatgpt-helper-tab-icon"})),a.appendChild(l("span",{className:"chatgpt-helper-tab-label"},this.getTabLabel(t))),a.addEventListener("click",()=>this.switchTab(t)),n.appendChild(a)}),n.onkeydown=t=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(t.key))return;const r=Array.from(n.querySelectorAll('[role="tab"]')),a=r.indexOf(t.target);if(a<0)return;t.preventDefault();const o=t.key==="Home"?0:t.key==="End"?r.length-1:(a+(t.key==="ArrowRight"?1:-1)+r.length)%r.length;this.switchTab(r[o].dataset.tab),r[o].focus()}},rebuildTabBar(){if(!this.panel)return;const n=this.panel.querySelector("#chatgpt-helper-tabs");n&&(this.renderTabBar(n),this.initTabResponsiveSpacing(n))},createUI(){if(!this.panel)return;try{if(this.currentTab==="settings"){const b=this.panel.querySelector("#settings-content .chatgpt-helper-settings-compact");this.settingsScrollTop=b?b.scrollTop:null}else this.settingsScrollTop=null}catch{}K(this.panel);const n=l("div",{id:"chatgpt-helper-header"}),e=l("div",{id:"chatgpt-helper-title"});e.appendChild(ge({size:18,className:"chatgpt-helper-icon-logo chatgpt-helper-header-logo",title:this.t("panelTitle")||"ChatGPT Helper"})),e.appendChild(l("span",{},this.t("panelTitle")));const t=l("div",{id:"chatgpt-helper-controls"}),r=l("button",{className:"chatgpt-helper-header-btn",title:this.t("themeToggle"),id:"chatgpt-helper-header-theme-btn",type:"button","aria-label":this.t("themeToggle")}),a=document.body.dataset.ghMode==="dark"||/\bdark\b/i.test(document.body.className);J(r,a?"sun":"moon",{size:15}),r.addEventListener("click",b=>(b.preventDefault(),b.stopPropagation(),b.stopImmediatePropagation(),this.toggleTheme(b),!1));const o=l("button",{className:"chatgpt-helper-header-btn",title:this.t("newChatInTab"),id:"chatgpt-helper-header-newchat-btn",type:"button","aria-label":this.t("newChatInTab")});o.appendChild(_("plus",{size:15})),o.addEventListener("click",()=>{de("https://chatgpt.com")});const i=l("button",{className:"chatgpt-helper-header-btn",title:this.t("refresh"),type:"button","aria-label":this.t("refresh")});i.appendChild(_("refresh",{size:15})),i.addEventListener("click",()=>{this.currentTab==="prompts"?this.refreshPromptList():this.currentTab==="outline"&&this.refreshOutline()});const s=l("button",{className:"chatgpt-helper-header-btn",title:this.isCollapsed?this.t("expand"):this.t("collapse"),id:"chatgpt-helper-collapse-btn",type:"button","aria-label":this.isCollapsed?this.t("expand"):this.t("collapse")});s.appendChild(_(this.isCollapsed?"panelExpand":"panelCollapse",{size:16})),s.addEventListener("click",()=>this.toggleCollapse());const h=l("button",{className:"chatgpt-helper-header-btn",title:this.t("settingsTitle"),id:"chatgpt-helper-settings-btn",type:"button","aria-label":this.t("settingsTitle")});h.appendChild(_("settings",{size:15})),h.addEventListener("click",()=>{this.currentTab==="settings"?this.switchTab(this.previousTab||"prompts"):(this.previousTab=this.currentTab,this.switchTab("settings"))}),t.appendChild(r),t.appendChild(o),t.appendChild(i),t.appendChild(h),t.appendChild(s),n.appendChild(e),n.appendChild(t),this.panel.appendChild(n),this.updateCollapseButtonState(),this.initHeaderResponsiveSpacing(n);const p=l("div",{id:"chatgpt-helper-tabs"});p.setAttribute("role","tablist"),this.renderTabBar(p),this.panel.appendChild(p),this.initTabResponsiveSpacing(p);const d=l("div",{id:"chatgpt-helper-content"});["prompts","outline","conversations","export","settings"].forEach(b=>{const L=l("div",{className:`chatgpt-helper-content-panel ${this.currentTab===b?"active":""}`,id:`${b}-content`,"data-tab":b,role:"tabpanel","aria-labelledby":b==="settings"?"chatgpt-helper-settings-btn":`${b}-tab`});d.appendChild(L)}),this.panel.appendChild(d),this.initResizeHandle();const c=l("div",{className:"scroll-nav-container",id:"scroll-nav-container"}),g=l("button",{className:"scroll-nav-btn",id:"scroll-top-btn",title:this.t("outlineScrollTop"),type:"button","aria-label":this.t("outlineScrollTop")});g.appendChild(_("arrowUp",{size:15})),g.appendChild(l("span",{className:"chatgpt-helper-nav-label"},this.t("buttonScrollTop"))),g.addEventListener("click",()=>this.scrollToTop());const m=l("button",{className:"scroll-nav-btn",id:"scroll-anchor-btn",title:this.t("noAnchor"),type:"button","aria-label":this.t("returnPreviousPosition"),style:"opacity: 0.4; cursor: default;"});m.appendChild(_("anchor",{size:15})),m.appendChild(l("span",{className:"chatgpt-helper-nav-label"},this.t("buttonBack"))),m.addEventListener("click",()=>this.handleAnchorClick());const x=l("button",{className:"scroll-nav-btn",id:"scroll-bottom-btn",title:this.t("outlineScrollBottom"),type:"button","aria-label":this.t("outlineScrollBottom")});x.appendChild(_("arrowDown",{size:15})),x.appendChild(l("span",{className:"chatgpt-helper-nav-label"},this.t("buttonScrollBottom"))),x.addEventListener("click",()=>this.scrollToBottom()),c.appendChild(g),c.appendChild(m),c.appendChild(x),this.panel.appendChild(c),this.initScrollNavResponsive(c),this.switchTab(this.currentTab)},switchTab(n){const e={prompts:"renderPrompts",outline:"renderOutline",conversations:"renderConversations",export:"renderExport",settings:"renderSettings"};if(!e[n])return;this.currentTab==="export"&&this.disposeExporter?.(),n!=="export"&&(this._openImageOnMount=!1),this.currentTab=n,this.panel.querySelectorAll(".chatgpt-helper-tab").forEach(r=>{const a=r.dataset.tab===n;r.classList.toggle("active",a),r.setAttribute("aria-selected",String(a)),r.tabIndex=a?0:-1}),this.panel.querySelectorAll(".chatgpt-helper-content-panel").forEach(r=>{r.classList.toggle("active",r.id===n+"-content")});const t=this.panel.querySelector("#"+n+"-content");t&&(K(t),this[e[n]](t)),this.outlineManager?.setActive(n==="outline")}},ur={selectPromptCategory(n){this.selectedCategory=n,this.updateCategoryBar(),setTimeout(()=>{this.refreshPromptList()},0)},renderPrompts(n){const e=l("div",{className:"chatgpt-helper-prompt-toolbar"}),t=l("div",{className:"chatgpt-helper-search-bar chatgpt-helper-prompt-search-bar"});t.appendChild(_("search",{size:15,className:"chatgpt-helper-prompt-search-icon"}));const r=l("input",{className:"chatgpt-helper-search-input",type:"text","aria-label":this.t("searchPlaceholder"),placeholder:this.t("searchPlaceholder"),value:this.searchQuery||""});r.addEventListener("input",S=>{this.searchQuery=S.target.value.trim(),this.refreshPromptList()}),t.appendChild(r),e.appendChild(t);const a=[{value:"manual",label:this.t("promptSortManual")},{value:"recent",label:this.t("promptSortRecent")},{value:"frequent",label:this.t("promptSortFrequent")}],o=this.settings.promptSortMode||"manual",i=l("div",{className:"chatgpt-helper-custom-select chatgpt-helper-prompt-sort-select",title:this.t("promptSortLabel"),"data-value":o}),s=l("button",{className:"chatgpt-helper-custom-select-trigger",type:"button","aria-haspopup":"listbox","aria-expanded":"false","aria-label":this.t("promptSortLabel"),title:this.t("promptSortLabel")}),h=l("span",{className:"chatgpt-helper-custom-select-value"},(a.find(S=>S.value===o)||a[0]).label),p=l("span",{className:"chatgpt-helper-custom-select-icon","aria-hidden":"true"},"\u25BE");s.appendChild(h),s.appendChild(p);const d=l("div",{className:"chatgpt-helper-custom-select-menu",role:"listbox"}),c=()=>{i.classList.remove("open"),s.setAttribute("aria-expanded","false")};a.forEach(S=>{const v=S.value===o,I=l("button",{className:"chatgpt-helper-custom-select-option"+(v?" selected":""),type:"button",role:"option","aria-selected":String(v),"data-value":S.value},S.label);I.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),this.settings.promptSortMode=S.value,this.saveSettings(),i.dataset.value=S.value,h.textContent=S.label,d.querySelectorAll(".chatgpt-helper-custom-select-option").forEach(E=>{const P=E.dataset.value===S.value;E.classList.toggle("selected",P),E.setAttribute("aria-selected",String(P))}),c(),this.refreshPromptList()}),d.appendChild(I)}),s.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();const v=!i.classList.contains("open");i.classList.toggle("open",v),s.setAttribute("aria-expanded",String(v))}),i.addEventListener("focusout",S=>{i.contains(S.relatedTarget)||c()}),i.appendChild(s),i.appendChild(d),e.appendChild(i);const g=l("button",{className:"chatgpt-helper-add-btn chatgpt-helper-add-btn-compact",type:"button",title:this.t("addPrompt"),"aria-label":this.t("addPrompt")});g.appendChild(_("plus",{size:16})),g.appendChild(l("span",{},this.t("addPrompt"))),g.addEventListener("click",()=>this.showAddPromptDialog()),e.appendChild(g),n.appendChild(e),this.initPromptsResponsive(n);const m=this.getCategories(),x=l("div",{className:"chatgpt-helper-categories chatgpt-helper-prompt-categories"}),b=this.t("allCategory"),L=l("button",{className:`chatgpt-helper-category-tag ${this.selectedCategory===b?"active":""}`,type:"button"},b);L.addEventListener("click",()=>this.selectPromptCategory(b)),x.appendChild(L),m.forEach(S=>{const v=l("button",{className:`chatgpt-helper-category-tag ${this.selectedCategory===S?"active":""}`,type:"button"},S);v.addEventListener("click",()=>this.selectPromptCategory(S)),x.appendChild(v)}),n.appendChild(x);const B=l("div",{className:"chatgpt-helper-prompt-list",id:"prompt-list"});n.appendChild(B),this.refreshPromptList()},refreshPromptList(){const n=this.panel.querySelector("#prompt-list");if(!n)return;K(n);let e=this.prompts;if(this.selectedCategory&&this.selectedCategory!==this.t("allCategory")&&(e=e.filter(r=>r.category===this.selectedCategory)),this.searchQuery){const r=this.searchQuery.toLowerCase();e=e.filter(a=>a.title.toLowerCase().includes(r)||a.content.toLowerCase().includes(r))}const t=this.settings.promptSortMode||"manual";if(t!=="manual"&&(e=[...e].sort((r,a)=>{if(t==="frequent"){const o=(a.useCount||0)-(r.useCount||0);if(o!==0)return o}return(a.lastUsedAt||0)-(r.lastUsedAt||0)})),e.length===0){const r=l("div",{className:"chatgpt-helper-empty-state chatgpt-helper-prompt-empty"});r.appendChild(_("edit",{size:22,className:"chatgpt-helper-prompt-empty-icon"})),r.appendChild(l("div",{className:"chatgpt-helper-prompt-empty-title"},this.searchQuery?this.t("noSearchResults"):this.t("noPrompts"))),r.appendChild(l("div",{className:"chatgpt-helper-prompt-empty-desc"},this.searchQuery?this.t("promptSearchEmptyHint"):this.t("promptEmptyHint")));const a=l("button",{className:"chatgpt-helper-add-btn chatgpt-helper-empty-add-btn",type:"button"},this.t("addPrompt"));a.addEventListener("click",()=>this.showAddPromptDialog()),r.appendChild(a),n.appendChild(r);return}e.forEach((r,a)=>{const o=this.prompts.findIndex(b=>b.id===r.id),i=l("div",{className:`chatgpt-helper-prompt-item ${this.selectedPrompt?.id===r.id?"selected":""}`,"data-prompt-id":r.id,"data-prompt-index":o!==-1?o:a}),s=l("div",{className:"chatgpt-helper-prompt-drag-handle"});i.appendChild(s);const h=l("div",{className:"chatgpt-helper-prompt-content-wrapper"}),p=l("div",{className:"chatgpt-helper-prompt-item-header"}),d=l("div",{className:"chatgpt-helper-prompt-title"},r.title);if(p.appendChild(d),r.category){const b=l("button",{className:"chatgpt-helper-prompt-category-pill",title:`${this.t("category")}: ${r.category}`,type:"button"},r.category);b.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation(),this.selectPromptCategory(r.category)}),p.appendChild(b)}const c=l("div",{className:"chatgpt-helper-prompt-content"},r.content);h.appendChild(p),h.appendChild(c);const g=l("div",{className:"chatgpt-helper-prompt-actions"}),m=l("button",{className:"edit-btn",title:this.t("edit"),"aria-label":this.t("edit"),type:"button"});m.appendChild(_("edit",{size:14})),m.addEventListener("click",b=>{b.stopPropagation(),this.showEditPromptDialog(r)});const x=l("button",{className:"delete-btn",title:this.t("delete"),"aria-label":this.t("delete"),type:"button"});x.appendChild(_("trash",{size:14})),x.addEventListener("click",b=>{b.stopPropagation(),confirm(this.t("confirmDelete"))&&this.deletePrompt(r.id)}),g.appendChild(m),g.appendChild(x),h.appendChild(g),i.appendChild(h),this.initPromptDrag(i,r,o!==-1?o:a),i.addEventListener("click",b=>{!b.target.closest("button")&&!b.target.closest(".chatgpt-helper-prompt-drag-handle")&&(this.selectedPrompt=r,this.usePrompt(r))}),n.appendChild(i)})},initPromptDrag(n,e,t){const r=n.querySelector(".chatgpt-helper-prompt-drag-handle");if(!r)return;let a=!1;const o=this.prompts.findIndex(h=>h.id===e.id);if(o===-1)return;r.addEventListener("mousedown",h=>{h.preventDefault(),h.stopPropagation(),a=!0,n.classList.add("dragging"),n.style.opacity="0.5",document.body.style.cursor="grabbing",document.addEventListener("mousemove",i),document.addEventListener("mouseup",s),window.addEventListener("blur",s)});const i=h=>{if(!a)return;const p=this.panel.querySelector("#prompt-list");if(!p)return;const d=Array.from(p.querySelectorAll(".chatgpt-helper-prompt-item:not(.dragging)")),c=h.clientY;d.forEach(g=>g.classList.remove("drag-over"));for(let g=0;g<d.length;g++){const m=d[g].getBoundingClientRect(),x=m.top+m.height/2;if(c<x){d[g].classList.add("drag-over");break}}if(d.length>0){const g=d[d.length-1].getBoundingClientRect();c>g.bottom&&d[d.length-1].classList.add("drag-over")}},s=h=>{if(!a)return;a=!1,n.classList.remove("dragging"),n.style.opacity="",document.body.style.cursor="";const p=this.panel.querySelector("#prompt-list");if(p){const d=Array.from(p.querySelectorAll(".chatgpt-helper-prompt-item")),c=e.id;let g=o;for(let m=0;m<d.length;m++)if(d[m]!==n&&d[m].classList.contains("drag-over")){const x=d[m].dataset.promptId;g=this.prompts.findIndex(b=>b.id===x),g===-1&&(g=o);break}d.forEach(m=>m.classList.remove("drag-over")),g!==o&&g!==-1&&this.reorderPrompts(c,g)}document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",s),window.removeEventListener("blur",s)}},reorderPrompts(n,e){const t=this.prompts.findIndex(o=>o.id===n);if(t===-1)return;const[r]=this.prompts.splice(t,1);let a=e;e>t&&(a=e-1),this.prompts.splice(a,0,r),this.savePrompts(),this.refreshPromptList()},getCategories(){const n=new Set;return this.prompts.forEach(e=>{e.category&&n.add(e.category)}),Array.from(n).sort()},updateCategoryBar(){const n=this.panel?.querySelector('.chatgpt-helper-content-panel[data-tab="prompts"]')||this.panel?.querySelector("#prompts-content");if(!n)return;const e=n.querySelector(".chatgpt-helper-categories");if(!e)return;const t=this.selectedCategory,r=this.getCategories(),a=this.t("allCategory");K(e);const o=l("button",{className:`chatgpt-helper-category-tag ${t===a?"active":""}`,type:"button"},a);o.addEventListener("click",()=>this.selectPromptCategory(a)),e.appendChild(o),r.forEach(i=>{const s=l("button",{className:`chatgpt-helper-category-tag ${t===i?"active":""}`,type:"button"},i);s.addEventListener("click",()=>this.selectPromptCategory(i)),e.appendChild(s)})},showAddPromptDialog(){this.showPromptDialog(null)},showEditPromptDialog(n){this.showPromptDialog(n)},showPromptDialog(n=null){const e=l("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),t=l("div",{className:"chatgpt-helper-prompt-dialog",role:"dialog","aria-modal":"true","aria-label":n?this.t("editPrompt"):this.t("addPrompt")}),r=l("h3",{className:"chatgpt-helper-prompt-dialog-title"},n?this.t("editPrompt"):this.t("addPrompt")),a=l("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:this.t("title"),value:n?.title||""}),o=l("textarea",{className:"chatgpt-helper-prompt-dialog-field chatgpt-helper-prompt-dialog-textarea",placeholder:this.t("content"),value:n?.content||""}),i=l("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:`${this.t("category")} (${this.t("optional")})`,value:n?.category||""}),s=l("div",{className:"chatgpt-helper-prompt-dialog-actions"}),h=l("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));h.addEventListener("click",()=>e.remove());const p=l("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("save"));p.addEventListener("click",()=>{if(!e.isConnected)return;const d=a.value.trim(),c=o.value.trim(),g=i.value.trim();if(!d||!c){alert(this.t("fillTitleContent"));return}const m=new Set(this.getCategories()),x=g&&!m.has(g);n?this.updatePrompt(n.id,{title:d,content:c,category:g}):this.addPrompt({title:d,content:c,category:g}),e.remove(),x&&(!this.selectedCategory||this.selectedCategory===this.t("allCategory"))&&(this.selectedCategory=g),setTimeout(()=>{this.updateCategoryBar(),this.refreshPromptList()},0)}),s.appendChild(h),s.appendChild(p),t.appendChild(r),t.appendChild(a),t.appendChild(o),t.appendChild(i),t.appendChild(s),e.appendChild(t),document.body.appendChild(e),e.addEventListener("click",d=>{d.target===e&&e.remove()})},addPrompt(n){n.id="custom_"+Date.now(),this.prompts.push(n),this.savePrompts()},updatePrompt(n,e){const t=this.prompts.findIndex(r=>r.id===n);t!==-1&&(this.prompts[t]={...this.prompts[t],...e},this.savePrompts())},deletePrompt(n){this.prompts=this.prompts.filter(e=>e.id!==n),this.savePrompts(),this.updateCategoryBar(),this.refreshPromptList()},trackPromptUsage(n){const e=this.prompts.find(t=>t.id===n);e&&(e.useCount=(Number(e.useCount)||0)+1,e.lastUsedAt=Date.now(),this.savePrompts(),this.currentTab==="prompts"&&this.refreshPromptList())},usePrompt(n,e={}){if(!n)return;const t=Me(n.content);if(t.length>0){if(e.replaceComposer&&this.promptQuickMenu)try{this.promptQuickMenu.replaceComposerText("")}catch{}this.showPromptVariablesDialog(n,t,r=>{this.trackPromptUsage(n.id),this.applyPromptToComposer(r,e)})}else this.trackPromptUsage(n.id),this.applyPromptToComposer(n.content,e)},applyPromptToComposer(n,e={}){let t=!1;e.replaceComposer&&this.promptQuickMenu&&(t=this.promptQuickMenu.replaceComposerText(n)),t||(t=this.adapter.insertPrompt(n)),this.showToast(t?this.t("inserted"):this.t("operationFailed"))},showPromptVariablesDialog(n,e,t){const r=l("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),a=l("div",{className:"chatgpt-helper-prompt-dialog chatgpt-helper-prompt-variables-dialog",role:"dialog","aria-modal":"true","aria-label":this.t("promptVariablesTitle")});a.appendChild(l("h3",{className:"chatgpt-helper-prompt-dialog-title"},this.t("promptVariablesTitle"))),a.appendChild(l("div",{className:"chatgpt-helper-prompt-variables-prompt-name"},n?.title||"")),a.appendChild(l("div",{className:"chatgpt-helper-prompt-variables-desc"},this.t("promptVariablesDesc")));const o={};e.forEach(d=>{const c=l("div",{className:"chatgpt-helper-prompt-variables-row"});c.appendChild(l("label",{className:"chatgpt-helper-prompt-variables-label"},`{{${d}}}`));const g=l("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:d});o[d]=g,c.appendChild(g),a.appendChild(c)});const i=l("div",{className:"chatgpt-helper-prompt-dialog-actions"}),s=l("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));s.addEventListener("click",()=>r.remove());const h=l("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("promptInsert"));h.addEventListener("click",()=>{if(!r.isConnected)return;const d={};e.forEach(g=>{d[g]=(o[g].value||"").trim()}),r.remove();const c=Ke(n.content,d);t(c)}),i.appendChild(s),i.appendChild(h),a.appendChild(i),r.appendChild(a),document.body.appendChild(r),r.addEventListener("click",d=>{d.target===r&&r.remove()});const p=a.querySelector('input[type="text"]');p&&setTimeout(()=>p.focus(),50)}},br={syncExporterLanguage(){this.exporterController?.setLanguage(be())},async loadExportDependency(n="engine"){this._exportLoads||(this._exportLoads=new Map);const e=()=>n==="engine"?window.__MY_EXT__?.exporter:window.JSZip;if(e())return e();if(this._exportLoads.has(n))return this._exportLoads.get(n);const t=new Promise((r,a)=>{const o=globalThis.chrome?.runtime;if(!o?.id)return a(new Error(this.t("exportEngineInjectFailed")));o.sendMessage({type:"ch-helper-inject-export-deps",dependency:n},i=>{const s=o.lastError;s||!i?.ok||!e()?a(new Error(s?.message||i?.error||this.t("exportModuleMissing"))):r(e())})});this._exportLoads.set(n,t);try{return await t}finally{this._exportLoads.delete(n)}},disposeExporter(){this._exportRevision=(this._exportRevision||0)+1,this.exporterController?.destroy(),this.exporterController=null},async renderExport(n){this.disposeExporter();const e=this._exportRevision;n.classList.add("chatgpt-helper-export-panel");const t=l("div",{className:"chatgpt-helper-export-container",id:"chatgpt-helper-export-container"}),r=l("div",{className:"chatgpt-helper-export-engine-loading",role:"status"},this.t("exportEngineLoading"));n.appendChild(t),window.__MY_EXT__?.exporter||t.appendChild(r);try{const a=await this.loadExportDependency();if(this.destroyed||e!==this._exportRevision||!t.isConnected)return;r.remove(),this.exporterController=a.mount(t,{adapter:this.adapter,getMessages:()=>nr(this.adapter),getSelectedMessages:()=>this.messageSelectManager.collectSelectedMessages(),subscribe:o=>this.messageSelectManager.subscribe(o),getContext:()=>({path:location.pathname,title:this.adapter.getSessionName()||"ChatGPT",language:be(),theme:this.currentEffectiveTheme}),notify:o=>this.showToast(o),loadDependency:o=>this.loadExportDependency(o)}),this._openImageOnMount&&(this._openImageOnMount=!1,this.exporterController.openImage())}catch(a){if(e!==this._exportRevision||!t.isConnected)return;r.remove();const o=l("p",{className:"chatgpt-helper-export-engine-error",role:"alert"},a.message),i=l("button",{className:"chatgpt-helper-btn",type:"button"},this.t("refresh"));i.addEventListener("click",()=>{n.replaceChildren(),this.renderExport(n)}),t.append(o,i)}},openImageExport(){this.exporterController&&this.currentTab==="export"?this.exporterController.openImage():(this._openImageOnMount=!0,this.isCollapsed&&this.toggleCollapse(),this.switchTab("export"))}},mr={renderConversations(n){this.conversationManager?(this.conversationManager.container=n,this.conversationManager.settings=this.settings,this.conversationManager.t=this.t):this.conversationManager=new ct({container:n,settings:this.settings,adapter:this.adapter,i18n:this.t}),this.conversationManager.createUI();const e=this.conversationManager.data;console.log("[ChatGPT Helper] \u4F1A\u8BDD\u7BA1\u7406\u5668\u6570\u636E:",{folders:e.folders?.length||0,conversations:Object.keys(e.conversations||{}).length,hasData:Object.keys(e.conversations||{}).length>0}),Object.keys(e.conversations||{}).length===0&&console.log("[ChatGPT Helper] \u5F53\u524D\u6CA1\u6709\u4FDD\u5B58\u7684\u4F1A\u8BDD\uFF0C\u8FD9\u662F\u6B63\u5E38\u7684\uFF08\u65B0\u5B89\u88C5\u6216\u672A\u540C\u6B65\uFF09")},renderSettings(n){const e=l("div",{className:"chatgpt-helper-settings-scroll chatgpt-helper-settings-compact"}),t=this.settingsScrollTop;this.settingsScrollTop=null;const r=()=>{const u=this.panel?.querySelector("#settings-content");if(!u)return;const f=u.querySelector(".chatgpt-helper-settings-compact");this.settingsScrollTop=f?f.scrollTop:null,K(u),this.renderSettings(u)},a=()=>(this.settings.readingHistory||(this.settings.readingHistory={persistence:!0,autoRestore:!1,cleanupDays:30}),this.settings.readingHistory),o=()=>(this.settings.outline||(this.settings.outline={}),this.settings.outline),i=()=>(this.settings.tabSettings||(this.settings.tabSettings={}),this.settings.tabSettings),s=()=>(this.settings.formulaCopy||(this.settings.formulaCopy={enabled:!0}),this.settings.formulaCopy),h=()=>(this.settings.tableCopy||(this.settings.tableCopy={enabled:!0}),this.settings.tableCopy),p=window.GM_getValue(F.LANGUAGE,"auto"),d=p==="auto"||oe[p]?p:"auto",c=i(),g=u=>{let f=null;if(u.type==="toggle")f=l("button",{className:"chatgpt-helper-toggle"+(u.value?" active":""),type:"button","aria-label":u.label,"aria-pressed":u.value?"true":"false"}),f.appendChild(l("div",{className:"chatgpt-helper-toggle-knob"})),f.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation();const A=!u.value;u.value=A,f.classList.toggle("active",A),f.setAttribute("aria-pressed",A?"true":"false"),u.onChange&&u.onChange(A)===!1&&(u.value=!A,f.classList.toggle("active",!A),f.setAttribute("aria-pressed",A?"false":"true"))});else if(u.type==="select"){const C=u.options||[],A=C.find(H=>String(H.value)===String(u.value))||C[0];f=l("div",{className:"chatgpt-helper-custom-select chatgpt-helper-settings-compact-select","data-value":A?String(A.value):""});const w=l("button",{className:"chatgpt-helper-custom-select-trigger",type:"button","aria-haspopup":"listbox","aria-expanded":"false","aria-label":u.label}),N=l("span",{className:"chatgpt-helper-custom-select-value"},A?A.label:""),O=l("span",{className:"chatgpt-helper-custom-select-icon","aria-hidden":"true"},"\u25BE");w.appendChild(N),w.appendChild(O);const R=l("div",{className:"chatgpt-helper-custom-select-menu",role:"listbox"}),M=()=>{f.classList.remove("open"),w.setAttribute("aria-expanded","false")},z=()=>{f.classList.add("open"),w.setAttribute("aria-expanded","true")},G=H=>{const j=H.value;u.value=j,f.dataset.value=String(j),N.textContent=H.label,R.querySelectorAll(".chatgpt-helper-custom-select-option").forEach(V=>{const Q=V.dataset.value===String(j);V.classList.toggle("selected",Q),V.setAttribute("aria-selected",Q?"true":"false")}),M(),u.onChange&&u.onChange(j)};C.forEach(H=>{const j=String(H.value)===String(u.value),V=l("button",{className:"chatgpt-helper-custom-select-option"+(j?" selected":""),type:"button",role:"option","aria-selected":j?"true":"false","data-value":String(H.value)},H.label);V.addEventListener("click",Q=>{Q.preventDefault(),Q.stopPropagation(),G(H)}),R.appendChild(V)}),w.addEventListener("click",H=>{H.preventDefault(),H.stopPropagation(),f.classList.contains("open")?M():z()}),f.addEventListener("focusout",H=>{f.contains(H.relatedTarget)||M()}),f.appendChild(w),f.appendChild(R)}else if(u.type==="number"){f=l("input",{className:"chatgpt-helper-settings-compact-input",type:"number",value:u.value,min:u.min!==void 0?u.min:200,max:u.max!==void 0?u.max:600,step:u.step!==void 0?u.step:1,"aria-label":u.label});const C=()=>{u.onChange&&u.onChange(f.value)};f.addEventListener("change",C),f.addEventListener("blur",C),f.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),f.blur(),C())})}else if(u.type==="text"){f=l("input",{className:"chatgpt-helper-settings-compact-input chatgpt-helper-settings-compact-text",type:"text",value:u.value||"",placeholder:u.placeholder||"","aria-label":u.label});const C=()=>{u.onChange&&u.onChange(f.value)};f.addEventListener("change",C),f.addEventListener("blur",C),f.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),f.blur(),C())})}else u.type==="button"&&(f=l("button",{className:"chatgpt-helper-theme-launch-btn chatgpt-helper-settings-compact-button",type:"button"},u.buttonText||u.label),f.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),u.onClick&&u.onClick()}));return f},m=u=>{const f=l("div",{className:"chatgpt-helper-settings-compact-row"}),C=l("div",{className:"chatgpt-helper-settings-compact-label"+(u.desc?" has-desc":""),title:u.desc?`${u.label} - ${u.desc}`:u.label});C.appendChild(l("div",{className:"chatgpt-helper-settings-compact-label-text"},u.label)),u.desc&&C.appendChild(l("div",{className:"chatgpt-helper-settings-compact-desc"},u.desc)),f.appendChild(C);const A=g(u);if(A){const w=l("div",{className:"chatgpt-helper-settings-compact-controls"});w.appendChild(A),f.appendChild(w)}return f},x=()=>(this.expandedSettingsSections||(this.expandedSettingsSections=new Set),this.expandedSettingsSections),b=(u,f,C,A={})=>{const w=x(),N=!w.has(u),O=`chatgpt-helper-settings-${u}-list`,M=l("section",{className:N?"chatgpt-helper-settings-compact-section collapsed":"chatgpt-helper-settings-compact-section","data-settings-section":u}),z=l("div",{className:"chatgpt-helper-settings-compact-title"}),G=l("button",{className:"chatgpt-helper-settings-compact-title-btn",type:"button","aria-expanded":String(!N),"aria-controls":O});G.appendChild(l("span",{className:"chatgpt-helper-settings-compact-title-chevron","aria-hidden":"true"},">")),G.appendChild(l("span",{className:"chatgpt-helper-settings-compact-title-text"},f)),A.count!=null&&G.appendChild(l("span",{className:"chatgpt-helper-settings-compact-title-count","aria-hidden":"true"},String(A.count))),G.addEventListener("click",()=>{const j=!M.classList.contains("collapsed");M.classList.toggle("collapsed",j),G.setAttribute("aria-expanded",String(!j)),j?w.delete(u):w.add(u)}),z.appendChild(G),M.appendChild(z);const H=C();return H.id=O,M.appendChild(H),M},L=(u,f,C)=>b(u,f,()=>{const A=l("div",{className:"chatgpt-helper-settings-compact-list"});return C.filter(Boolean).forEach(w=>A.appendChild(w instanceof Node?w:m(w))),A},{count:C.filter(Boolean).length}),B=["prompts","outline","conversations","export"],S=()=>{const u=this.getTabOrder();return u.map((f,C)=>{const A=Le[f],w=l("div",{className:"chatgpt-helper-settings-compact-row chatgpt-helper-settings-quick-button-row"}),N=l("div",{className:"chatgpt-helper-settings-compact-label chatgpt-helper-settings-icon-label"}),O=l("span",{className:"chatgpt-helper-inline-icon-wrap"});O.appendChild(_(A?.iconName||"list",{size:14,className:"chatgpt-helper-inline-icon"})),N.appendChild(O),N.appendChild(l("span",{},this.getTabLabel(f)));const R=l("div",{className:"chatgpt-helper-settings-compact-controls"}),M=H=>{const j=this.getTabOrder(),V=C+H;if(V<0||V>=j.length)return;const Q=[...j];[Q[C],Q[V]]=[Q[V],Q[C]],this.settings.tabOrder=Q,this.saveSettings(),this.rebuildTabBar(),this.showToast(this.t("tabOrderUpdated")||"Tab order updated"),r()},z=l("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveUp")||"Move Up",type:"button"});z.appendChild(_("arrowUp",{size:14})),z.disabled=C===0,z.addEventListener("click",()=>M(-1));const G=l("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveDown")||"Move Down",type:"button"});return G.appendChild(_("arrowDown",{size:14})),G.disabled=C===u.length-1,G.addEventListener("click",()=>M(1)),R.appendChild(z),R.appendChild(G),w.appendChild(N),w.appendChild(R),w})},v=u=>({label:(this.t("settingsShowTab")||'Show "{name}"').replace("{name}",this.getTabLabel(u)),type:"toggle",value:this.settings.tabOrder?.includes(u)!==!1,onChange:f=>{if((!Array.isArray(this.settings.tabOrder)||this.settings.tabOrder.length===0)&&(this.settings.tabOrder=this.getTabOrder()),f){const C=[...this.settings.tabOrder,u].filter((A,w,N)=>N.indexOf(A)===w).sort((A,w)=>B.indexOf(A)-B.indexOf(w));this.settings.tabOrder=C}else{const C=this.settings.tabOrder.filter(A=>A!==u);if(C.length===0)return this.showToast(this.t("operationFailed")||"Operation failed"),!1;this.settings.tabOrder=C,this.currentTab===u&&(this.currentTab=C[0],this.switchTab(this.currentTab))}return this.saveSettings(),this.rebuildTabBar(),r(),!0}}),I=()=>{const u=Array.isArray(this.settings.collapsedButtonsOrder)?this.settings.collapsedButtonsOrder:[],f=Array.from(new Set(u.map(C=>C?.id).filter(C=>ne[C])));return se.forEach(C=>{f.includes(C.id)||f.push(C.id)}),f.map(C=>({id:C,enabled:!0}))},D=()=>{const u=I();return b("quick-buttons",this.t("settingsGroupQuickButtons")||"Quick Buttons",()=>{const f=l("div",{className:"chatgpt-helper-settings-compact-list"});return u.forEach((C,A)=>{const w=ne[C.id];if(!w)return;const N=l("div",{className:"chatgpt-helper-settings-compact-row chatgpt-helper-settings-quick-button-row"}),O=l("div",{className:"chatgpt-helper-settings-compact-label chatgpt-helper-settings-icon-label"}),R=l("span",{className:"chatgpt-helper-inline-icon-wrap"});R.appendChild(Be(w,{size:16,className:"chatgpt-helper-inline-icon"})),O.appendChild(R),O.appendChild(l("span",{},w.labelKey?this.t(w.labelKey):w.label||C.id));const M=l("div",{className:"chatgpt-helper-settings-compact-controls"}),z=j=>{const V=A+j;if(V<0||V>=u.length)return;const Q=[...u];[Q[A],Q[V]]=[Q[V],Q[A]],this.settings.collapsedButtonsOrder=Q.map(ee=>({id:ee.id,enabled:!0})),this.saveSettings(),this.createCollapsedButtons(),this.showToast(this.t("buttonOrderUpdated")||"Button order updated"),r()},G=l("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveUp")||"Move Up",type:"button"});G.appendChild(_("arrowUp",{size:14})),G.disabled=A===0,G.addEventListener("click",()=>z(-1));const H=l("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveDown")||"Move Down",type:"button"});H.appendChild(_("arrowDown",{size:14})),H.disabled=A===u.length-1,H.addEventListener("click",()=>z(1)),M.appendChild(G),M.appendChild(H),N.appendChild(O),N.appendChild(M),f.appendChild(N)}),f},{count:u.length})};[L("general",this.t("settingsGroupGeneral")||"General",[{label:this.t("themeDialogTitle")||"Theme",type:"button",buttonText:this.t("openThemeSettings")||"Open Theme Settings",onClick:()=>this.openThemeSettingsModal()},{label:this.t("language")||"Interface Language",type:"select",value:d,options:[{value:"auto",label:this.t("autoDetect")},{value:"zh-CN",label:this.t("chinese")},{value:"en",label:this.t("english")}],onChange:u=>{window.GM_setValue(F.LANGUAGE,u),ze(u==="auto"?ie():u),this.syncExporterLanguage&&this.syncExporterLanguage(),this.lang=u,this.selectedCategory=this.t("allCategory"),window.GM_getValue(F.PROMPTS,null)||(this.prompts=pe()),this.createUI(),this.showToast(this.t("languageChanged"))}},{label:this.t("defaultPanelOpenLabel")||"Open Panel by Default",type:"toggle",value:this.settings.defaultPanelState,onChange:u=>{this.settings.defaultPanelState=u,this.saveSettings()}},{label:this.t("promptQuickMenuEnabledLabel")||"Slash Quick Menu",type:"toggle",value:this.settings.promptQuickMenuEnabled!==!1,onChange:u=>{this.settings.promptQuickMenuEnabled=u,this.saveSettings();try{if(!this.promptQuickMenu)return;u?this.promptQuickMenu.start():this.promptQuickMenu.stop()}catch(f){console.error("[ChatGPT Helper] \u5207\u6362\u5FEB\u901F\u83DC\u5355\u5931\u8D25:",f)}this.showToast(this.t(u?"enabled":"disabled")+" "+this.t("promptQuickMenuEnabledLabel"))}},{label:this.t("shortcutHintLabel")||"Panel Shortcut",type:"button",buttonText:"Alt+Shift+H",onClick:()=>{this.showToast(this.t("shortcutHintDesc"))}},{label:this.t("replayOnboarding")||"Replay Onboarding",type:"button",buttonText:this.t("replayOnboarding"),onClick:()=>this.maybeShowOnboarding({force:!0})}]),L("tabs",this.t("settingsGroupTabs")||"Tabs",[...S(),v("prompts"),v("outline"),v("conversations"),v("export")]),L("reading-navigation",this.t("settingsGroupReadingNavigation")||"Reading & Navigation",[{label:this.t("preventAutoScrollLabel")||"Prevent Auto Scroll",desc:this.t("preventAutoScrollDesc")||"Keep the page from jumping to the latest reply while you are reading earlier content.",type:"toggle",value:this.settings.preventAutoScroll||!1,onChange:u=>{this.settings.preventAutoScroll=u,this.saveSettings(),this.scrollLockManager||(this.scrollLockManager=new He(this.adapter)),this.scrollLockManager.setEnabled(u),this.showToast(this.t(u?"enabled":"disabled")+" "+this.t("preventAutoScrollLabel"))}},{label:this.t("enableReadingHistoryLabel")||"Reading History",desc:this.t("enableReadingHistoryDesc")||"Remember the last reading position for each conversation.",type:"toggle",value:this.settings.readingHistory?.persistence!==!1,onChange:u=>{const f=a();f.persistence=u,this.saveSettings(),u&&this.readingProgressManager&&this.readingProgressManager.startRecording(),this.showToast(this.t(u?"enabled":"disabled")+" "+this.t("readingHistory"))}},{label:this.t("autoRestoreLabel")||"Auto Restore Position",desc:this.t("autoRestoreDesc")||"Open a conversation at the last remembered reading position.",type:"toggle",value:this.settings.readingHistory?.autoRestore||!1,onChange:u=>{const f=a();f.autoRestore=u,this.saveSettings(),this.showToast(this.t(u?"enabled":"disabled")+" "+this.t("autoRestoreLabel"))}},{label:this.t("showUserMessagesLabel")||"Show User Messages",desc:this.t("showUserMessagesDesc")||"Include your questions as outline nodes.",type:"toggle",value:this.settings.outline?.showUserQueries!==!1,onChange:u=>{const f=o();f.showUserQueries=u,this.saveSettings(),this.currentTab==="outline"&&this.refreshOutline()}},{label:this.t("outlineSyncScrollLabel")||"Outline Follows Reading Position",desc:this.t("outlineSyncScrollDesc")||"Highlight the matching outline item as you scroll the conversation.",type:"toggle",value:this.settings.outline?.syncScroll!==!1,onChange:u=>{const f=o();f.syncScroll=u,this.saveSettings(),this.outlineManager&&this.outlineManager.updateSyncScrollState()}}]),L("content-processing",this.t("settingsGroupContentProcessing")||"Content Processing",[{label:this.t("enableFormulaCopyLabel")||"Formula Copy",type:"toggle",value:this.settings.formulaCopy?.enabled!==!1,onChange:u=>{const f=s();f.enabled=u,this.saveSettings(),this.copyManager&&(u?this.copyManager.initFormulaCopy():this.copyManager.destroyFormulaCopy())}},{label:this.t("enableTableCopyLabel")||"Table Copy",type:"toggle",value:this.settings.tableCopy?.enabled!==!1,onChange:u=>{const f=h();f.enabled=u,this.saveSettings(),this.copyManager&&(u?this.copyManager.initTableCopy():this.copyManager.destroyTableCopy())}}]),L("browser-tab",this.t("settingsGroupBrowserTab")||"Browser Tab",[{label:this.t("tabAutoRenameLabel")||"Auto Rename Tab",type:"toggle",value:c.enabled!==!1,onChange:u=>{const f=i();f.enabled=u,this.saveSettings(),this.tabRenameManager&&(u?this.tabRenameManager.start():this.tabRenameManager.stop())}},{label:this.t("tabShowStatusLabel")||"Show Generation Status",type:"toggle",value:c.showStatus!==!1,onChange:u=>{const f=i();f.showStatus=u,this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0)}},{label:this.t("tabPlaySoundLabel")||"Play Notification Sound",type:"toggle",value:c.notificationSound||!1,onChange:u=>{const f=i();f.notificationSound=u,f.notificationVolume==null&&(f.notificationVolume=.5),this.saveSettings(),this.tabRenameManager&&(u?this.tabRenameManager.ensureNotificationAudioUnlock():this.tabRenameManager.teardownNotificationAudioUnlock()),r()}},c.notificationSound?{label:this.t("tabVolumeLabel")||"Notification Volume",type:"number",value:c.notificationVolume||.5,min:.1,max:1,step:.1,onChange:u=>{const f=i();let C=parseFloat(u);isNaN(C)&&(C=.5),f.notificationVolume=Math.max(.1,Math.min(1,C)),this.saveSettings()}}:null,{label:this.t("tabPrivacyModeLabel")||"Privacy Mode",type:"toggle",value:c.privacyMode||!1,onChange:u=>{const f=i();f.privacyMode=u,this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0),r()}},c.privacyMode?{label:this.t("tabPrivacyTitleLabel")||"Privacy Title",type:"text",value:c.privacyTitle||"ChatGPT",onChange:u=>{const f=i();f.privacyTitle=u||"ChatGPT",this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0)}}:null]),D(),L("data",this.t("settingsGroupData")||"Backup & Restore",[{label:this.t("backupExportButton")||"Export Backup",desc:this.t("backupExportDesc"),type:"button",buttonText:this.t("backupExportButton"),onClick:()=>this.exportBackupData()},{label:this.t("backupImportButton")||"Import Backup",desc:this.t("backupImportDesc"),type:"button",buttonText:this.t("backupImportButton"),onClick:()=>this.importBackupData()}])].forEach(u=>e.appendChild(u));const P=l("div",{className:"chatgpt-helper-settings-footer"}),q=l("button",{className:"chatgpt-helper-about-btn",type:"button"},this.t("aboutButton")||"About");q.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),this.openAboutModal(u.currentTarget)}),P.appendChild(q),e.appendChild(P),n.appendChild(e),t!=null&&(e.scrollTop=t)}},fr={refreshOutline(){const n=this.panel?.querySelector("#outline-content");n&&this.currentTab==="outline"&&this.renderOutline(n)},renderOutline(n){this.outlineManager||(this.outlineManager=new ft({container:n,settings:this.settings,siteAdapter:this.adapter,onNavigate:(t,r)=>this.scrollManager.scrollTo({top:t,behavior:"smooth",onComplete:r}),onJumpBefore:()=>{this.anchorManager&&this.scrollManager&&this.anchorManager.setAnchor(this.scrollManager.scrollTop)},onAutoUpdate:()=>this.refreshOutline(),resolveItem:t=>this.extractOutline().find(r=>r.id===t.id)?.element,onSettingsChange:t=>{var r;(r=this.settings).outline||(r.outline={}),Object.assign(this.settings.outline,t),this.saveSettings()},i18n:W}));const e=this.outlineManager;e.settings=this.settings,(e.container!==n||!n.querySelector("#outline-list"))&&(e.container=n,e.createUI()),e.update(this.extractOutline()),e.setActive(this.currentTab==="outline")},extractOutline(){const n=[],e=r=>(r?.innerText||r?.textContent||"").trim().replace(/\s+/g," "),t=(r,a,o,i,s=!1)=>{const h=e(r);if(!h)return;const p=s?100:i==="summary"?80:1/0;n.push({id:`${o}:${s?"query":i}`,messageId:o,level:a,text:h.length>p?`${h.slice(0,p)}\u2026`:h,isTruncated:h.length>p,element:r,isUserQuery:s,index:n.length})};return this.adapter.getChatMessages().forEach((r,a)=>{const o=this.adapter.getMessageRole(r),i=this.adapter.getMessageIdentity(r,a),s=`${window.location.pathname}:${i}`;if(o==="user"){this.settings.outline?.showUserQueries&&t(this.adapter.getMessageContent(r),0,s,0,!0);return}if(o!=="assistant")return;const h=this.adapter.getMessageContent(r),p=Array.from(h.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).filter(d=>!d.closest('pre, [hidden], [aria-hidden="true"], .sr-only')&&e(d));if(p.forEach((d,c)=>{const g=Number(d.tagName.match(/^H([1-6])$/i)?.[1]||d.getAttribute("aria-level"))||2;t(d,Math.max(1,Math.min(6,g)),s,c)}),!p.length){const d=h.querySelector("p, li")||h;t(d,1,s,"summary")}}),n}},vr={toggleCollapse(n={}){this.isCollapsed=!this.isCollapsed,this.panel.classList.toggle("collapsed",this.isCollapsed),this.updateCollapseButtonState();const e=document.getElementById("chatgpt-helper-quick-buttons");e?this.isCollapsed?(e.classList.remove("hidden"),e.classList.add("collapsed"),e.style.right="8px",e.style.display="flex"):(e.classList.add("hidden"),e.classList.remove("collapsed"),e.style.right=`${this.settings.panelWidth+20}px`,e.style.display="none"):this.createCollapsedButtons(),this.updateLayout&&this.updateLayout(),n.persist!==!1&&(this.settings.defaultPanelState=!this.isCollapsed,this.saveSettings())},createCollapsedButtons(){const n=document.getElementById("chatgpt-helper-quick-buttons");n&&n.remove();const e=l("div",{id:"chatgpt-helper-quick-buttons",className:"chatgpt-helper-quick-buttons"+(this.isCollapsed?" collapsed":" hidden")});this.isCollapsed?(e.style.right="8px",e.style.display="flex",e.classList.remove("hidden"),e.classList.add("collapsed")):(e.style.right=`${this.settings.panelWidth+20}px`,e.style.display="none",e.classList.add("hidden"),e.classList.remove("collapsed"));const t=Array.isArray(this.settings.collapsedButtonsOrder)?this.settings.collapsedButtonsOrder:[],r=Array.from(new Set(t.map(i=>i?.id).filter(i=>ne[i])));se.forEach(i=>{r.includes(i.id)||r.push(i.id)});const a=r.map(i=>({id:i,enabled:!0})),o={};a.forEach((i,s)=>{const h=ne[i.id];if(h)if(s>0&&h.isPanelOnly&&!ne[a[s-1].id]?.isPanelOnly&&e.appendChild(l("div",{className:"chatgpt-helper-btn-divider"})),i.id==="manualAnchor"){const p=l("button",{className:"chatgpt-helper-quick-btn",title:this.t("setAnchor"),id:"manual-anchor-set-btn",type:"button","aria-label":this.t("setAnchor")});p.appendChild(_("pin",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const d=b=>{b.preventDefault(),b.stopPropagation(),b.stopImmediatePropagation(),this.setAnchorManually()};p.addEventListener("click",d,{capture:!1,passive:!1});const c=l("button",{className:"chatgpt-helper-quick-btn"+(this.savedAnchorTop===null?" disabled":""),title:this.savedAnchorTop===null?this.t("noAnchor"):this.t("returnAnchor"),id:"manual-anchor-back-btn",type:"button","aria-label":this.savedAnchorTop===null?this.t("noAnchor"):this.t("returnAnchor")});c.appendChild(_("back",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const g=b=>{b.preventDefault(),b.stopPropagation(),b.stopImmediatePropagation(),this.savedAnchorTop!==null?this.backToManualAnchor():this.showToast(this.t("noAnchor"))};c.addEventListener("click",g,{capture:!1,passive:!1});const m=l("button",{className:"chatgpt-helper-quick-btn"+(this.savedAnchorTop===null?" disabled":""),title:this.t("clearAnchor"),id:"manual-anchor-clear-btn",type:"button","aria-label":this.t("clearAnchor")});m.appendChild(_("close",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const x=b=>{b.preventDefault(),b.stopPropagation(),b.stopImmediatePropagation(),this.savedAnchorTop!==null?this.clearAnchorManually():this.showToast(this.t("noAnchor"))};m.addEventListener("click",x,{capture:!1,passive:!1}),e.appendChild(p),e.appendChild(c),e.appendChild(m)}else{const p=h.labelKey?this.t(h.labelKey):h.label||"",d=l("button",{className:"chatgpt-helper-quick-btn"+(h.isPanelOnly?" panel-only":""),title:p,id:`quick-btn-${i.id}`,type:"button","aria-label":p});d.appendChild(Be(h,{size:i.id==="panel"?20:18,className:i.id==="panel"?"chatgpt-helper-quick-btn-logo":"chatgpt-helper-quick-btn-icon",title:p}));const c=this,g=i.id,m=function(x){x.preventDefault(),x.stopPropagation(),x.stopImmediatePropagation();try{g==="scrollTop"?c.scrollToTop():g==="scrollBottom"?c.scrollToBottom():g==="panel"?c.toggleCollapse():g==="anchor"?c.handleAnchorClick():g==="theme"&&(c.toggleTheme(x),setTimeout(()=>{const b=document.body.dataset.ghMode==="dark"||document.documentElement.getAttribute("data-gh-mode")==="dark";J(d,b?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"})},200))}catch(b){console.error("[ChatGPT Helper] \u6309\u94AE\u64CD\u4F5C\u5931\u8D25:",g,b,b.stack),c.showToast(`${c.t("operationFailed")}: ${b.message}`)}};if(d.addEventListener("click",m),i.id==="anchor")c.hasAnchor?d.title=c.t("returnPreviousPosition"):(d.style.opacity="0.4",d.style.cursor="default",d.title=c.t("noAnchor"));else if(i.id==="theme"){const x=document.body.dataset.ghMode==="dark"||document.documentElement.getAttribute("data-gh-mode")==="dark"||/\bdark\b/i.test(document.body.className);J(d,x?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"})}o[i.id]=d,e.appendChild(d)}}),document.body.appendChild(e),this.quickButtons=o},scrollToTop(){const n=this.scrollManager.scrollTop;n>100&&this.anchorManager?.setAnchor(n),this.scrollManager.scrollTo({top:0,behavior:"smooth"})},scrollToBottom(){const n=this.scrollManager.scrollTop;this.scrollManager.isAtBottom()||this.anchorManager?.setAnchor(n),this.scrollManager.scrollTo({top:this.scrollManager.scrollHeight,behavior:"smooth"})},setAnchorManually(){try{const n=this.scrollManager.container;n?this.savedAnchorTop=n.scrollTop||this.scrollManager.scrollTop:this.savedAnchorTop=window.scrollY||0,this.showAnchorMarker(this.savedAnchorTop),this.updateManualAnchorButtons(),this.showToast(this.t("anchorSet"))}catch(n){console.error("[ChatGPT Helper] \u8BBE\u7F6E\u951A\u70B9\u5931\u8D25:",n),this.showToast(this.t("anchorSetFailed"))}},backToManualAnchor(){if(this.savedAnchorTop===null){this.showToast(this.t("noAnchor"));return}this.scrollManager.scrollTo({top:this.savedAnchorTop,behavior:"smooth"})},clearAnchorManually(){this.savedAnchorTop=null,this.hideAnchorMarker(),this.updateManualAnchorButtons(),this.showToast(this.t("anchorCleared"))},showAnchorMarker(n){this.hideAnchorMarker();const e=this.scrollManager.container;if(!e)return;window.getComputedStyle(e).position==="static"&&(e.style.position="relative");const r=l("div",{className:"chatgpt-helper-anchor-marker",id:"chatgpt-helper-anchor-marker",style:`top: ${n}px;`});e.appendChild(r)},hideAnchorMarker(){const n=document.getElementById("chatgpt-helper-anchor-marker");n&&n.remove()},updateManualAnchorButtons(){const n=document.getElementById("manual-anchor-back-btn"),e=document.getElementById("manual-anchor-clear-btn"),t=this.savedAnchorTop!==null;n&&(n.classList.toggle("disabled",!t),n.title=t?this.t("returnAnchor"):this.t("noAnchor"),n.setAttribute("aria-label",n.title)),e&&e.classList.toggle("disabled",!t)},handleAnchorClick(){this.anchorManager?.backToAnchor()||this.showToast(this.t("noAnchorAutoHint")),this.updateAnchorButton()},updateAnchorButton(){const n=this.anchorManager?this.anchorManager.hasAnchor():this.hasAnchor,e=document.getElementById("quick-btn-anchor");e&&(e.style.opacity=n?"1":"0.4",e.style.cursor=n?"pointer":"default",e.title=n?this.t("returnPreviousPosition"):this.t("noAnchor"),e.setAttribute("aria-label",e.title));const t=document.getElementById("scroll-anchor-btn");t&&(n?(t.style.opacity="1",t.style.cursor="pointer",t.title=this.t("returnPreviousPosition"),t.setAttribute("aria-label",t.title)):(t.style.opacity="0.4",t.style.cursor="default",t.title=this.t("noAnchor"),t.setAttribute("aria-label",t.title)))},toggleTheme(n){try{const t=this.detectEffectiveThemeFromDom()==="dark"?"light":"dark";this.applyAppearanceMode(t,{persist:!0,showToast:!0,preferNative:!0}).catch(r=>{console.error("[ChatGPT Helper] \u4E3B\u9898\u5207\u6362\u5931\u8D25:",r,r&&r.stack),this.showToast(this.t("themeSwitchFailed"))})}catch(e){console.error("[ChatGPT Helper] \u4E3B\u9898\u5207\u6362\u5931\u8D25:",e,e.stack),this.showToast(this.t("themeSwitchFailed"))}},monitorTheme(){this.themeScope?.dispose();const n=this.themeScope=new Ae,e=()=>{const r=this.detectEffectiveThemeFromDom();r!==this.currentEffectiveTheme&&(this.syncHelperThemeMode(r),this.syncNativeThemeScopes(r),this.settings.themeMode=r,this.updateThemeVisualState())};e();const t={attributes:!0,attributeFilter:["class","data-theme","style"]};n.observe(document.documentElement,t,e),n.observe(document.body,t,e),n.listen(window,"themechange",e),n.listen(document,"themechange",e)},showToast(n){const e=document.getElementById("chatgpt-helper-toast");e&&e.remove();const t=l("div",{id:"chatgpt-helper-toast",className:"chatgpt-helper-toast",role:"status","aria-live":"polite"},n);document.body.appendChild(t),setTimeout(()=>t.remove(),2e3)},bindEvents(){this.pageScope?.dispose();const n=this.pageScope=new Ae;let e=location.pathname,t=this.adapter.getChatContainer();const r=()=>{const o=e!==location.pathname;e=location.pathname;const i=this.adapter.getChatContainer(),s=i!==t;t=i,this.adapter.findTextarea(),this.updateLayout(),this.queueThemeHostRefresh(),!(!o&&!s)&&(this.messageSelectManager.refreshContext(),this.exporterController?.contextChanged(),this.scrollManager.cancel(),o&&(this.anchorManager?.reset(),this.savedAnchorTop=null,this.hideAnchorMarker(),this.updateManualAnchorButtons()),this.scrollLockManager?.clearCache(),this.scrollLockManager?.refreshContainerListener(),this.readingProgressManager?.stopRecording(),this.readingProgressManager?.startRecording(),this.currentTab==="outline"&&this.refreshOutline(),o&&e.includes("/c/")&&this.conversationManager&&n.schedule("sync-conversations",()=>this.conversationManager.syncConversations(),1500))},a=()=>n.schedule("host",r,120);n.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-shell-active-page"]},o=>{(e!==location.pathname||o.some(i=>i.type==="attributes"?!0:St(i)?!1:!(i.target.nodeType===1?i.target:i.target.parentElement)?.closest("[data-message-author-role], [data-content-search-unit-key], [data-chatgpt-search-unit-key], [data-chatgpt-selection-message-id]")))&&a()}),n.listen(window,"popstate",a),window.navigation&&n.listen(window.navigation,"navigatesuccess",a),n.listen(window,"resize",a,{passive:!0})}},Nt="chatgpt-helper",xr=1;function yr(n){return new Promise((e,t)=>{try{const r=new FileReader;r.onload=()=>{const a=String(r.result||""),o=a.indexOf(",");e(o>=0?a.slice(o+1):a)},r.onerror=()=>t(r.error||new Error("read blob failed")),r.readAsDataURL(n)}catch(r){t(r)}})}function wr(n,e){const t=atob(String(n||"")),r=new Uint8Array(t.length);for(let a=0;a<t.length;a++)r[a]=t.charCodeAt(a);return new Blob([r],{type:e||"application/octet-stream"})}function kr(){const n=new Date,e=t=>String(t).padStart(2,"0");return`${n.getFullYear()}${e(n.getMonth()+1)}${e(n.getDate())}-${e(n.getHours())}${e(n.getMinutes())}`}const Cr={async collectBackupData(){const n={},e=window.GM_getValue(F.PROMPTS,null);n.prompts=Array.isArray(e)?e:this.prompts||[];const t=window.GM_getValue(F.SETTINGS,null);n.settings=t&&typeof t=="object"?t:typeof this.serializeSettingsForStorage=="function"?this.serializeSettingsForStorage():{},n.language=window.GM_getValue(F.LANGUAGE,"auto"),n.promptLibraryVersion=window.GM_getValue(F.PROMPT_LIBRARY_VERSION,null),n.conversations=window.GM_getValue(F.CONVERSATIONS,null),n.readingProgress=window.GM_getValue(F.READING_PROGRESS,null),n.themeAssets=[];try{if(this.themeAssetRepository&&typeof this.themeAssetRepository.getAllAssets=="function"){const r=await this.themeAssetRepository.getAllAssets();for(const a of r||[])!a||!a.blob||n.themeAssets.push({id:a.id,mimeType:a.mimeType,size:a.size,createdAt:a.createdAt,dataBase64:await yr(a.blob)})}}catch(r){console.warn("[ChatGPT Helper] \u5907\u4EFD\u4E3B\u9898\u58C1\u7EB8\u5931\u8D25:",r)}return n},async exportBackupData(){try{const n=await this.collectBackupData(),e={app:Nt,formatVersion:xr,extensionVersion:he,exportedAt:new Date().toISOString(),data:n},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),o=l("a",{href:a,download:`chatgpt-helper-backup-${kr()}.json`});document.body.appendChild(o),o.click(),setTimeout(()=>{o.remove(),URL.revokeObjectURL(a)},1e3),this.showToast(this.t("backupExportSuccess"))}catch(n){console.error("[ChatGPT Helper] \u5BFC\u51FA\u5907\u4EFD\u5931\u8D25:",n),this.showToast(this.t("operationFailed"))}},importBackupData(){try{const n=document.getElementById("gh-backup-import-input");n&&n.remove();const e=l("input",{id:"gh-backup-import-input",type:"file",accept:"application/json,.json"});e.style.display="none",document.body.appendChild(e),e.addEventListener("change",async()=>{const t=e.files&&e.files[0];if(e.remove(),!!t)try{const r=await t.text(),a=JSON.parse(r);if(!a||a.app!==Nt||!a.data||typeof a.data!="object"){this.showToast(this.t("backupInvalidFile"));return}if(!confirm(this.t("backupImportConfirm")))return;await this.applyBackupData(a.data)}catch(r){console.error("[ChatGPT Helper] \u5BFC\u5165\u5907\u4EFD\u5931\u8D25:",r),this.showToast(this.t("backupImportFailed"))}}),e.click()}catch(n){console.error("[ChatGPT Helper] \u6253\u5F00\u5907\u4EFD\u6587\u4EF6\u5931\u8D25:",n),this.showToast(this.t("operationFailed"))}},sanitizeBackupData(n){const e={};if(Array.isArray(n.prompts)&&(e.prompts=n.prompts.filter(t=>t&&typeof t=="object").map(t=>{const r={...t};return typeof r.title!="string"&&(r.title=String(r.title??"")),typeof r.content!="string"&&(r.content=String(r.content??"")),r.category!==void 0&&typeof r.category!="string"&&(r.category=String(r.category)),r}).slice(0,5e3)),n.settings&&typeof n.settings=="object"&&!Array.isArray(n.settings)){const t={};Object.keys(n.settings).forEach(r=>{r==="__proto__"||r==="constructor"||r==="prototype"||(t[r]=n.settings[r])}),Number.isFinite(Number(t.panelWidth))&&(t.panelWidth=Math.max(ce,Math.min(Ce,Number(t.panelWidth)))),e.settings=t}if(typeof n.language=="string"&&/^[a-z]{2}(-[A-Za-z0-9]{2,8})?$/.test(n.language)&&(e.language=n.language),n.conversations&&typeof n.conversations=="object"&&!Array.isArray(n.conversations)&&n.conversations.conversations&&typeof n.conversations.conversations=="object"){const t={...n.conversations,conversations:{}};Object.entries(n.conversations.conversations).forEach(([r,a])=>{!a||typeof a!="object"||r==="__proto__"||r==="constructor"||r==="prototype"||(t.conversations[r]=a)}),e.conversations=t}if(n.readingProgress&&typeof n.readingProgress=="object"&&!Array.isArray(n.readingProgress)){const t={};Object.keys(n.readingProgress).forEach(r=>{if(r==="__proto__"||r==="constructor"||r==="prototype")return;const a=n.readingProgress[r];a&&typeof a=="object"&&(t[r]=a)}),e.readingProgress=t}return n.promptLibraryVersion!=null&&Number.isFinite(Number(n.promptLibraryVersion))&&(e.promptLibraryVersion=Number(n.promptLibraryVersion)),e},async applyBackupData(n){const e=this.sanitizeBackupData(n);e.prompts&&window.GM_setValue(F.PROMPTS,e.prompts),e.settings&&window.GM_setValue(F.SETTINGS,e.settings),e.language&&window.GM_setValue(F.LANGUAGE,e.language),e.conversations&&window.GM_setValue(F.CONVERSATIONS,e.conversations),e.readingProgress&&window.GM_setValue(F.READING_PROGRESS,e.readingProgress),e.promptLibraryVersion!=null&&window.GM_setValue(F.PROMPT_LIBRARY_VERSION,e.promptLibraryVersion);let t=0;if(Array.isArray(n.themeAssets)&&n.themeAssets.length>0)try{this.themeAssetRepository||(this.themeAssetRepository=new De);for(const i of n.themeAssets){if(!i||!i.id||!i.dataBase64||!/^[A-Za-z0-9+/=\s]+$/.test(String(i.dataBase64)))continue;const s=wr(i.dataBase64,i.mimeType);await this.themeAssetRepository.putAsset(s,i.mimeType,i.id),t++}}catch(i){console.warn("[ChatGPT Helper] \u6062\u590D\u4E3B\u9898\u58C1\u7EB8\u5931\u8D25:",i)}const r=Array.isArray(e.prompts)?e.prompts.length:0,a=e.conversations&&e.conversations.conversations?Object.keys(e.conversations.conversations||{}).length:0,o=(this.t("backupIncludeHint")||"").replace("{prompts}",String(r)).replace("{conversations}",String(a)).replace("{assets}",String(t));this.showToast(`${this.t("backupImportSuccess")} \xB7 ${o}`),setTimeout(()=>{try{window.location.reload()}catch(i){console.error("[ChatGPT Helper] \u5237\u65B0\u9875\u9762\u5931\u8D25:",i)}},2500)}},Tr=`.gh-tour {
    --tour-surface: #fbfcfa;
    --tour-ink: #202722;
    --tour-muted: #647067;
    --tour-line: rgba(32, 39, 34, .14);
    --tour-soft: #eef1ec;
    position: fixed;
    inset: 0;
    z-index: 2147483001;
    pointer-events: none;
    font-family: var(--gh-font-family, system-ui, sans-serif);
    color: var(--tour-ink);
}
:root[data-gh-mode="dark"] .gh-tour {
    --tour-surface: #222722;
    --tour-ink: #eef2eb;
    --tour-muted: #aeb8ab;
    --tour-line: rgba(238, 242, 235, .17);
    --tour-soft: #30372f;
}
.gh-tour *, .gh-tour *::before, .gh-tour *::after { box-sizing: border-box; }
.gh-tour [hidden] { display: none !important; }
.gh-tour-shade { display: none; position: fixed; inset: 0; background: rgba(16, 22, 18, .38); }
.gh-tour-welcome .gh-tour-shade { display: block; }
.gh-tour-spotlight {
    position: fixed;
    border: 2px solid color-mix(in srgb, var(--gh-primary, #64748b), #c9d7c7 40%);
    border-radius: 12px;
    box-shadow: 0 0 0 9999px rgba(16, 22, 18, .34), 0 0 0 4px rgba(230, 241, 228, .18);
    pointer-events: none;
}
.gh-tour-card {
    position: fixed;
    width: min(360px, calc(100vw - 24px));
    max-height: calc(100dvh - 24px);
    overflow: auto;
    overscroll-behavior: contain;
    padding: 22px;
    border: 1px solid var(--tour-line);
    border-radius: 16px;
    background: var(--tour-surface);
    box-shadow: 0 18px 60px rgba(12, 20, 14, .22);
    pointer-events: auto;
    line-height: 1.5;
    text-align: left;
    animation: gh-tour-enter .18s ease-out;
}
.gh-tour-welcome .gh-tour-card { width: min(440px, calc(100vw - 24px)); padding: 26px; }
.gh-tour-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.gh-tour-brand { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 13px; font-weight: 650; }
.gh-tour-brand img { flex: none; }
.gh-tour button { font: inherit; cursor: pointer; }
.gh-tour-skip, .gh-tour-back { border: 0; background: transparent; color: var(--tour-muted); padding: 7px 4px; font-size: 13px !important; }
.gh-tour-skip:hover, .gh-tour-back:hover { color: var(--tour-ink); }
.gh-tour-eyebrow { margin: 26px 0 7px; color: var(--tour-muted); font-size: 12px; letter-spacing: .025em; }
.gh-tour h2 { margin: 0; color: var(--tour-ink); font-size: 24px; font-weight: 680; line-height: 1.3; letter-spacing: -.025em; }
.gh-tour-welcome h2 { font-size: 29px; }
.gh-tour h2:focus { outline: none; }
.gh-tour-body { margin: 12px 0 0; color: var(--tour-muted); font-size: 14px; line-height: 1.7; }
.gh-tour-summary { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; font-size: 13px; }
.gh-tour-summary span + span::before { content: '\xB7'; margin-right: 8px; color: var(--tour-muted); }
.gh-tour-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 18px; }
.gh-tour-actions kbd { background: var(--tour-soft); border: 1px solid var(--tour-line); border-radius: 6px; padding: 6px 8px; font: 12px/1.5 ui-monospace, monospace; }
.gh-tour-button { border: 1px solid var(--tour-line); border-radius: 7px; background: transparent; color: var(--tour-ink); padding: 8px 11px; font-size: 13px !important; }
.gh-tour-button:hover { background: var(--tour-soft); }
.gh-tour-button:disabled { opacity: .45; cursor: default; }
.gh-tour-missing { margin: 12px 0 0; font-size: 12px; color: var(--tour-muted); }
.gh-tour-progress { display: flex; gap: 6px; margin-top: 22px; padding-top: 17px; border-top: 1px solid var(--tour-line); }
.gh-tour-progress button { flex: 1; border: 0; border-radius: 6px; background: var(--tour-soft); color: var(--tour-muted); height: 28px; font-size: 12px; }
.gh-tour-progress button.active { background: var(--tour-ink); color: var(--tour-surface); }
.gh-tour-progress button.visited { color: var(--tour-ink); }
.gh-tour-progress button:hover { box-shadow: inset 0 0 0 1px var(--tour-line); }
.gh-tour-footer { display: flex; align-items: center; gap: 16px; margin-top: 16px; }
.gh-tour-primary { margin-left: auto; min-width: 96px; padding: 9px 17px; border: 1px solid transparent; border-radius: 8px; background: var(--tour-ink); color: var(--tour-surface); font-size: 14px !important; font-weight: 600 !important; }
.gh-tour-primary:hover { filter: brightness(1.1); }
.gh-tour button:focus-visible { outline: 2px solid var(--gh-primary, #64748b); outline-offset: 3px; }
@keyframes gh-tour-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 760px) {
    .gh-tour-card { width: calc(100vw - 24px); max-height: min(430px, calc(100dvh - 24px)); padding: 18px; }
    .gh-tour-eyebrow { margin-top: 18px; }
    .gh-tour h2 { font-size: 22px; }
    .gh-tour-progress { margin-top: 16px; padding-top: 12px; }
}
@media (prefers-reduced-motion: reduce) { .gh-tour-card { animation: none; } }
`,Z=["prompts","outline","organize","panel","appearance"],re="chatgpt-helper-onboarding";class Sr{constructor(e,t="welcome"){this.app=e,this.scope=new Ae,this.step=Z.includes(t)?t:"welcome",this.initial={tab:e.currentTab,collapsed:e.isCollapsed,focus:document.activeElement,focusText:document.activeElement?.textContent?.trim()},this.closed=!1,this.installStyles(),document.getElementById(`${re}-overlay`)?.remove(),this.root=l("div",{id:`${re}-overlay`,className:"gh-tour"}),this.shade=l("div",{className:"gh-tour-shade","aria-hidden":"true"}),this.spotlight=l("div",{className:"gh-tour-spotlight","aria-hidden":"true"}),this.card=l("section",{className:"gh-tour-card",role:"dialog","aria-labelledby":`${re}-title`,"aria-describedby":`${re}-body`}),this.root.append(this.shade,this.spotlight,this.card),document.body.appendChild(this.root);const r=()=>this.scope.schedule("position",()=>this.position(),32);this.scope.listen(window,"resize",r,{passive:!0}),this.scope.listen(document,"scroll",r,{capture:!0,passive:!0}),this.scope.listen(document,"keydown",a=>this.onKeyDown(a),!0),e.panel&&this.scope.observe(e.panel,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]},r),this.resizeObserver=new ResizeObserver(r),this.resizeObserver.observe(this.card),e.panel&&this.resizeObserver.observe(e.panel),this.show(this.step)}t(e){return this.app.t(e)}installStyles(){if(document.getElementById(`${re}-styles`))return;const e=l("style",{id:`${re}-styles`});e.textContent=Tr,document.head.appendChild(e)}button(e,t,r,a="gh-tour-button"){const o=l("button",{type:"button",className:a,"data-tour-action":t},e);return o.addEventListener("click",r),o}ensurePanelOpen(){this.app.isCollapsed&&this.app.toggleCollapse({persist:!1})}openTab(e){return this.app.panel?.querySelector(`#${e}-tab`)?(this.ensurePanelOpen(),this.app.currentTab!==e&&this.app.switchTab(e),!0):!1}show(e){this.closed||(this.step=e,e!=="welcome"&&this.ensurePanelOpen(),(e==="prompts"||e==="outline")&&this.openTab(e),this.root.dataset.tourStep=e,this.root.classList.toggle("gh-tour-welcome",e==="welcome"),this.render(),this.position(),this.card.querySelector("h2").focus({preventScroll:!0}),this.store("in-progress"))}render(){this.card.replaceChildren();const e=l("div",{className:"gh-tour-header"}),t=l("div",{className:"gh-tour-brand"});t.append(ge({size:21,title:"ChatGPT Helper"}),l("span",{},"ChatGPT Helper")),e.append(t,this.button(this.t("onboardingSkip"),"skip",()=>this.finish("skipped"),"gh-tour-skip")),this.card.appendChild(e);const r=Z.indexOf(this.step),a=this.step==="welcome"?this.t("onboardingDuration"):`${this.t("onboardingGuide")} \xB7 ${r+1} / ${Z.length}`;this.card.appendChild(l("p",{className:"gh-tour-eyebrow"},a));const o=this.step==="welcome"?"onboardingTitle":`tour_${this.step}_title`;this.card.appendChild(l("h2",{id:`${re}-title`,tabindex:-1},this.t(o)));let i=this.t(this.step==="welcome"?"onboardingSubtitle":`tour_${this.step}_body`);if(this.step==="outline"&&!this.app.adapter.getChatMessages().length&&(i=this.t("tour_outline_empty")),this.card.appendChild(l("p",{className:"gh-tour-body",id:`${re}-body`},i)),this.step==="welcome"){const c=l("div",{className:"gh-tour-summary"});for(const g of["tour_prompts_label","tour_outline_label","tour_appearance_label"])c.appendChild(l("span",{},this.t(g)));this.card.appendChild(c)}const s=l("div",{className:"gh-tour-actions"});if(this.step==="prompts"){s.appendChild(l("kbd",{},"//"));const c=this.button(this.t("tour_focus_composer"),"composer",()=>{this.app.adapter.findTextarea(),this.app.adapter.textarea?.focus({preventScroll:!0})});this.app.adapter.findTextarea(),c.disabled=!this.app.adapter.textarea,s.appendChild(c)}else if(this.step==="organize")for(const c of["conversations","export"]){const g=this.button(this.t(`tour_open_${c}`),c,()=>{this.openTab(c),this.position()});g.disabled=!this.app.panel?.querySelector(`#${c}-tab`),s.appendChild(g)}else this.step==="panel"?(s.appendChild(l("kbd",{},"Alt+Shift+H")),s.appendChild(this.button(this.t(this.app.isCollapsed?"tour_expand_panel":"tour_collapse_panel"),"panel",()=>{this.app.toggleCollapse({persist:!1}),this.render(),this.position(),this.card.querySelector('[data-tour-action="panel"]').focus({preventScroll:!0})}))):this.step==="appearance"&&s.appendChild(this.button(this.t("tour_open_theme"),"theme",()=>{this.finish("completed"),this.app.openThemeSettingsModal(this.app.panel?.querySelector("#chatgpt-helper-settings-btn"))}));s.childNodes.length&&this.card.appendChild(s),this.missing=l("p",{className:"gh-tour-missing",hidden:!0},this.t("tour_target_missing")),this.card.appendChild(this.missing);const h=l("nav",{className:"gh-tour-progress","aria-label":this.t("onboardingGuide")});Z.forEach((c,g)=>{const m=l("button",{type:"button","data-tour-go":c,"aria-label":`${g+1}. ${this.t(`tour_${c}_label`)}`,title:this.t(`tour_${c}_label`),className:g===r?"active":g<r?"visited":""},`${g+1}`);g===r&&m.setAttribute("aria-current","step"),m.addEventListener("click",()=>this.show(c)),h.appendChild(m)}),this.card.appendChild(h);const p=l("div",{className:"gh-tour-footer"}),d=this.button(this.t("onboardingPrevious"),"prev",()=>this.move(-1),"gh-tour-back");d.hidden=this.step==="welcome",p.appendChild(d),this.step==="welcome"?p.appendChild(this.button(this.t("onboardingStart"),"start",()=>this.show(Z[0]),"gh-tour-primary")):r===Z.length-1?p.appendChild(this.button(this.t("onboardingFinish"),"finish",()=>this.finish("completed"),"gh-tour-primary")):p.appendChild(this.button(this.t("onboardingNext"),"next",()=>this.move(1),"gh-tour-primary")),this.card.appendChild(p)}move(e){const t=Z.indexOf(this.step)+e;t<0?this.show("welcome"):t<Z.length&&this.show(Z[t])}target(){const e=this.app.panel;return e?this.step==="prompts"||this.step==="outline"?e.querySelector(`#${this.step}-content.active`):this.step==="organize"?e.querySelector("#chatgpt-helper-tabs"):this.step==="panel"?this.app.isCollapsed?document.getElementById("quick-btn-panel"):e.querySelector("#chatgpt-helper-resize-handle"):this.step==="appearance"?e.querySelector("#chatgpt-helper-settings-btn"):null:null}position(){if(this.closed)return;const e=window.innerWidth,t=window.innerHeight,a=this.target()?.getBoundingClientRect(),o=a&&a.width>0&&a.height>0&&a.right>0&&a.left<e;if(this.missing.hidden=this.step==="welcome"||!!o,this.root.classList.toggle("gh-tour-no-target",!o),this.spotlight.hidden=!o,o){const p=Math.max(2,a.left-5),d=Math.max(2,a.top-5);Object.assign(this.spotlight.style,{left:`${p}px`,top:`${d}px`,width:`${Math.max(0,Math.min(e-2,a.right+5)-p)}px`,height:`${Math.max(0,Math.min(t-2,a.bottom+5)-d)}px`})}const i=this.card.getBoundingClientRect();let s=(e-i.width)/2,h=(t-i.height)/2;this.step!=="welcome"&&e<=760?h=t-i.height-12:o&&(a.left>=i.width+28?s=a.left-i.width-18:e-a.right>=i.width+28&&(s=a.right+18),h=a.top+Math.min(a.height,t)/2-i.height/2),this.card.style.left=`${Math.max(12,Math.min(e-i.width-12,s))}px`,this.card.style.top=`${Math.max(12,Math.min(t-i.height-12,h))}px`}onKeyDown(e){e.key==="Escape"?(e.preventDefault(),e.stopImmediatePropagation(),this.finish("skipped")):this.card.contains(e.target)&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&(e.key==="ArrowRight"&&this.step!==Z.at(-1)&&(e.preventDefault(),this.move(1)),e.key==="ArrowLeft"&&this.step!=="welcome"&&(e.preventDefault(),this.move(-1)))}store(e){try{window.GM_setValue(F.ONBOARDING_DONE,{schemaVersion:1,status:e,step:this.step,updatedAt:new Date().toISOString()})}catch(t){console.warn("[ChatGPT Helper] \u4FDD\u5B58\u5F15\u5BFC\u8FDB\u5EA6\u5931\u8D25:",t)}}finish(e){this.closed||(this.store(e),this.destroy({restore:e!=="completed"}),e==="completed"&&!this.app.destroyed&&(this.ensurePanelOpen(),this.openTab(this.app.panel?.querySelector("#prompts-tab")?"prompts":this.app.getTabOrder()[0]),this.app.panel?.querySelector(".chatgpt-helper-tab.active")?.focus({preventScroll:!0})))}destroy({restore:e=!0}={}){if(this.closed||(this.closed=!0,this.scope.dispose(),this.resizeObserver.disconnect(),this.root.remove(),this.app.onboardingTour===this&&(this.app.onboardingTour=null),!e||this.app.destroyed))return;const t=this.app.panel?.querySelector(`#${this.initial.tab}-content`)?this.initial.tab:this.app.getTabOrder()[0];this.app.currentTab!==t&&this.app.switchTab(t),this.app.isCollapsed!==this.initial.collapsed&&this.app.toggleCollapse({persist:!1});const r=this.initial.focus,a=Array.from(this.app.panel?.querySelectorAll("button")||[]).find(i=>i.textContent.trim()===this.initial.focusText),o=r?.isConnected?r:a||this.app.panel?.querySelector("#chatgpt-helper-settings-btn");this.initial.collapsed?document.getElementById("quick-btn-panel")?.focus({preventScroll:!0}):o?.focus({preventScroll:!0})}}const Ar={maybeShowOnboarding({force:n=!1}={}){const e=window.GM_getValue(F.ONBOARDING_DONE,null);if(!(!n&&e&&e.status!=="in-progress")){if(this.onboardingTour&&!this.onboardingTour.closed){this.onboardingTour.card.querySelector("h2")?.focus({preventScroll:!0});return}this.onboardingTour=new Sr(this,n?"welcome":e?.step)}},showOnboardingOverlay(){this.maybeShowOnboarding({force:!0})}};class Fe extends or{}Object.assign(Fe.prototype,hr,cr,dr,gr,ur,br,mr,fr,vr,Cr,Ar);const Er=Object.freeze(Object.defineProperty({__proto__:null,AUTHOR_GITHUB_URL:nt,AnchorManager:ut,COLLAPSED_BUTTON_DEFS:ne,ChatGPTAdapter:Mt,ChatGPTHelper:Fe,ConversationManager:ct,CopyManager:Tt,DEFAULT_COLLAPSED_BUTTONS_ORDER:se,DEFAULT_PROMPTS:Ht,DEFAULT_SETTINGS:ke,DEFAULT_THEME_CONFIG:X,EXTENSION_AUTHOR:ot,EXTENSION_LICENSE:it,EXTENSION_NAME:at,EXTENSION_VERSION:he,FEATURE_REQUEST_URL:Dt,HistoryLoader:gt,I18N:oe,ISSUE_URL:tt,MessageSelectManager:At,OutlineManager:ft,PANEL_WIDTH_MAX:Ce,PANEL_WIDTH_MIN:ce,PROMPT_VARIABLE_PATTERN:xe,PromptQuickMenu:yt,REPO_URL:rt,ReadingProgressManager:bt,SETTING_KEYS:F,SVG_ICON_DEFS:_e,ScrollLockManager:He,ScrollManager:dt,TAB_DEFINITIONS:Le,THEME_BACKGROUND_ALLOWED_TYPES:et,THEME_BACKGROUND_DB_NAME:Xe,THEME_BACKGROUND_DB_VERSION:Je,THEME_BACKGROUND_MAX_SIZE:Ze,THEME_BACKGROUND_STORE:le,THEME_HOST_ATTRS:Ne,THEME_PRESETS:Pe,THEME_PRESET_INLINE_VAR_KEYS:zt,THEME_PRESET_MAP:we,TabRenameManager:Et,ThemeAssetRepository:De,WidthStyleManager:mt,blendRgbColors:y,buildLinearGradient:Y,buildThemeSurfaceVars:Re,clampNumber:$,clearElement:K,copyTextToClipboard:Ie,createCollapsedButtonIconNode:Be,createDefaultPrompts:pe,createElement:l,createHelperLogoNode:ge,createSvgIconNode:_,createThemeAssetId:pt,detectLanguage:ie,extractPromptVariables:Me,getCurrentLang:be,getExtensionAssetUrl:st,getExtensionManifestMeta:lt,getExtensionRuntime:ae,getThemePresetByKey:te,hexToRgb:Se,normalizeHexColor:ht,normalizeThemeConfig:Oe,openExternalLink:de,parseQuickMenuTrigger:xt,renderPromptVariables:Ke,rgbaFromColor:k,sanitizeConversationUrl:Te,setButtonIcon:J,setCurrentLang:ze,t:W,withProductivitySurfaceVars:ue},Symbol.toStringTag,{value:"Module"})),It=window.__MY_EXT__=window.__MY_EXT__||{};if(It.helper={...Er},!window.chatgptHelperInitialized){window.chatgptHelperInitialized=!0;const n=document.readyState==="loading"?new Promise(t=>document.addEventListener("DOMContentLoaded",t,{once:!0})):Promise.resolve(),e=It.storageCacheInitialized?Promise.resolve():new Promise(t=>{window.addEventListener("ch-helper-storage-ready",t,{once:!0})});Promise.all([n,e]).then(()=>{new Fe}).catch(t=>{window.chatgptHelperInitialized=!1,console.error("[ChatGPT Helper] \u542F\u52A8\u5931\u8D25:",t)})}})();
