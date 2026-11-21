(function(){"use strict";const at="3ec75f7fb4e6e065",J={PROMPTS:"chatgpt_prompts",SETTINGS:"chatgpt_settings",PROMPT_LIBRARY_VERSION:"chatgpt_prompts_version",DEFAULT_PANEL_STATE:"chatgpt_default_panel_state",PANEL_WIDTH:"chatgpt_panel_width",LANGUAGE:"chatgpt_language",CONVERSATIONS:"chatgpt_conversations",READING_PROGRESS:"chatgpt_reading_progress",ONBOARDING_DONE:"chatgpt_onboarding_done"},ot=/\{\{\s*([^{}\n]+?)\s*\}\}/g;function ft(r){if(typeof r!="string"||!r)return[];const e=[];let t;for(ot.lastIndex=0;(t=ot.exec(r))!==null;){const n=t[1].trim();n&&!e.includes(n)&&e.push(n)}return e}function Qt(r,e={}){return typeof r!="string"||!r?r||"":r.replace(ot,(t,n)=>{const a=String(n||"").trim(),o=e[a];return o==null||o===""?t:String(o)})}const $e={"zh-CN":{panelTitle:"ChatGPT Helper",tabPrompts:"\u63D0\u793A\u8BCD",tabOutline:"\u5927\u7EB2",tabConversations:"\u4F1A\u8BDD",tabExport:"\u5BFC\u51FA",tabSettings:"\u8BBE\u7F6E",searchPlaceholder:"\u641C\u7D22\u63D0\u793A\u8BCD...",addPrompt:"\u6DFB\u52A0\u65B0\u63D0\u793A\u8BCD",editPrompt:"\u7F16\u8F91\u63D0\u793A\u8BCD",noPrompts:"\u6682\u65E0\u63D0\u793A\u8BCD",promptEmptyHint:"\u6DFB\u52A0\u5E38\u7528\u5DE5\u4F5C\u6D41\uFF0C\u8BA9\u9AD8\u9891\u4EFB\u52A1\u4E00\u952E\u8FDB\u5165\u8F93\u5165\u6846\u3002",promptSearchEmptyHint:"\u6362\u4E2A\u5173\u952E\u8BCD\uFF0C\u6216\u65B0\u5EFA\u4E00\u4E2A\u66F4\u8D34\u8FD1\u5F53\u524D\u4EFB\u52A1\u7684\u63D0\u793A\u8BCD\u3002",optional:"\u53EF\u9009",defaultPromptResearchTitle:"\u8D44\u6599\u7CBE\u8BFB\u4E0E\u6D1E\u5BDF\u63D0\u70BC",defaultPromptResearchContent:`\u8BF7\u4F5C\u4E3A\u4E25\u8C28\u7684\u7814\u7A76\u52A9\u7406\uFF0C\u7CBE\u8BFB\u4EE5\u4E0B\u6750\u6599\uFF0C\u5E76\u6309\u8FD9\u4E2A\u7ED3\u6784\u8F93\u51FA\uFF1A
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

\u80CC\u666F\u4E0E\u65B9\u6848\uFF1A`,defaultPromptDecisionCategory:"\u51B3\u7B56",allCategory:"\u5168\u90E8",refresh:"\u5237\u65B0",minimizeQuickButtons:"\u6536\u8D77\u5FEB\u6377\u6309\u94AE",expandQuickButtons:"\u5C55\u5F00\u5FEB\u6377\u6309\u94AE",expand:"\u5C55\u5F00\u4FA7\u680F",collapse:"\u6536\u8D77\u4FA7\u680F",edit:"\u7F16\u8F91",delete:"\u5220\u9664",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",add:"\u6DFB\u52A0",title:"\u6807\u9898",category:"\u5206\u7C7B",content:"\u63D0\u793A\u8BCD\u5185\u5BB9",promptUpdated:"\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0",promptAdded:"\u63D0\u793A\u8BCD\u5DF2\u6DFB\u52A0",deleted:"\u5DF2\u5220\u9664",copied:"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",refreshed:"\u5DF2\u5237\u65B0",inserted:"\u5DF2\u63D2\u5165\u63D0\u793A\u8BCD",confirmDelete:"\u786E\u5B9A\u5220\u9664?",fillTitleContent:"\u8BF7\u586B\u5199\u6807\u9898\u548C\u5185\u5BB9",noConversations:"\u6682\u65E0\u4F1A\u8BDD",noSearchResults:"\u672A\u627E\u5230\u5339\u914D\u7ED3\u679C",inbox:"\u6536\u4EF6\u7BB1",untitledConversation:"\u672A\u547D\u540D\u5BF9\u8BDD",promptFolderName:"\u8BF7\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0\uFF1A",moveToFolder:"\u79FB\u52A8\u5230\u6587\u4EF6\u5939",confirm:"\u786E\u5B9A",confirmDeleteConversation:'\u786E\u5B9A\u8981\u5220\u9664 "{title}" \u5417\uFF1F',confirmDeleteConversations:"\u786E\u5B9A\u8981\u5220\u9664 {count} \u4E2A\u4F1A\u8BDD\u5417\uFF1F",exportedConversations:"\u5DF2\u5BFC\u51FA {count} \u4E2A\u4F1A\u8BDD",openConversationFirst:"\u8BF7\u5148\u6253\u5F00\u4F1A\u8BDD: {title}",addTag:"\u6DFB\u52A0\u6807\u7B7E",tagPrompt:"\u8F93\u5165\u6807\u7B7E\u540D\u79F0\uFF08\u7559\u7A7A\u5220\u9664\u6807\u7B7E\uFF09\uFF1A",tagUpdated:"\u6807\u7B7E\u5DF2\u66F4\u65B0",exportInfoHeading:"\u5BFC\u51FA\u4FE1\u606F",conversationTitleLabel:"\u4F1A\u8BDD\u6807\u9898",exportTimeLabel:"\u5BFC\u51FA\u65F6\u95F4",sourceLabel:"\u6765\u6E90",linkLabel:"\u94FE\u63A5",userRole:"\u7528\u6237",historyLoading:"\u6B63\u5728\u52A0\u8F7D\u5386\u53F2...",scrollContainerMissing:"\u672A\u627E\u5230\u6EDA\u52A8\u5BB9\u5668",historyLoadComplete:"\u5386\u53F2\u52A0\u8F7D\u5B8C\u6210",pleaseWait:"\u8BF7\u7A0D\u5019...",stop:"\u505C\u6B62",formulaCopied:"\u516C\u5F0F\u5DF2\u590D\u5236",formulaSourceUnavailable:"\u672A\u627E\u5230\u516C\u5F0F\u6E90\u7801\uFF0C\u672A\u590D\u5236",copyFailed:"\u590D\u5236\u5931\u8D25",copyAsMarkdown:"\u590D\u5236\u4E3A Markdown",tableCopied:"\u8868\u683C\u5DF2\u590D\u5236",outlineNoContent:"\u6682\u65E0\u5927\u7EB2\u5185\u5BB9\uFF0C\u8BF7\u7B49\u5F85\u5BF9\u8BDD\u751F\u6210\u6216\u5237\u65B0\u9875\u9762",syncConversations:"\u540C\u6B65\u4F1A\u8BDD",newFolder:"\u65B0\u5EFA\u6587\u4EF6\u5939",deleteFolder:"\u5220\u9664\u6587\u4EF6\u5939",deleteFolderConfirm:`\u786E\u5B9A\u8981\u5220\u9664\u6587\u4EF6\u5939 "{name}" \u5417\uFF1F
\u6587\u4EF6\u5939\u5185\u7684\u4F1A\u8BDD\u5C06\u79FB\u52A8\u5230\u6536\u4EF6\u7BB1\u3002`,folderDeleted:"\u6587\u4EF6\u5939\u5DF2\u5220\u9664",batchMode:"\u6279\u91CF\u64CD\u4F5C",batchComplete:"\u5B8C\u6210",selected:"\u5DF2\u9009\u62E9",items:"\u9879",move:"\u79FB\u52A8",export:"\u5BFC\u51FA",pinned:"\u7F6E\u9876",unpinned:"\u53D6\u6D88\u7F6E\u9876",moved:"\u5DF2\u79FB\u52A8",exported:"\u5DF2\u5BFC\u51FA",synced:"\u5DF2\u540C\u6B65",conversationSyncing:"\u6B63\u5728\u540C\u6B65\u4F1A\u8BDD...",conversationSyncNoResults:"\u672A\u52A0\u8F7D\u5230\u5386\u53F2\u4F1A\u8BDD\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u767B\u5F55 ChatGPT \u540E\u91CD\u8BD5",conversationSyncFailed:"\u4F1A\u8BDD\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",newSessions:"\u4E2A\u65B0\u4F1A\u8BDD",updatedSessions:"\u4E2A\u4F1A\u8BDD",exportFormat:`\u9009\u62E9\u5BFC\u51FA\u683C\u5F0F\uFF1A
1. Markdown
2. JSON
3. TXT`,exportSuccess:"\u5BFC\u51FA\u6210\u529F",exportFailed:"\u5BFC\u51FA\u5931\u8D25",noContent:"\u672A\u627E\u5230\u5BF9\u8BDD\u5185\u5BB9",openFirst:"\u8BF7\u5148\u6253\u5F00\u4F1A\u8BDD",settingsTitle:"\u8BBE\u7F6E",readingHistory:"\u9605\u8BFB\u5386\u53F2",settingsGroupGeneral:"\u901A\u7528",settingsGroupTabs:"\u6807\u7B7E\u9875",settingsGroupReadingNavigation:"\u9605\u8BFB\u4E0E\u5BFC\u822A",settingsGroupContentProcessing:"\u5185\u5BB9\u5904\u7406",settingsGroupBrowserTab:"\u6D4F\u89C8\u5668\u6807\u7B7E\u9875",settingsGroupQuickButtons:"\u5FEB\u6377\u6309\u94AE",settingsShowTab:"\u663E\u793A\u201C{name}\u201D",tabOrderUpdated:"\u6807\u7B7E\u9875\u987A\u5E8F\u5DF2\u66F4\u65B0",language:"\u754C\u9762\u8BED\u8A00",autoDetect:"\u81EA\u52A8\u68C0\u6D4B",chinese:"\u7B80\u4F53\u4E2D\u6587",english:"English",languageChanged:"\u8BED\u8A00\u5DF2\u66F4\u6539",themeToggle:"\u5207\u6362\u4E3B\u9898",newChatInTab:"\u65B0\u6807\u7B7E\u9875\u5F00\u542F\u5BF9\u8BDD",noAnchor:"\u6682\u65E0\u951A\u70B9",noAnchorAutoHint:"\u6682\u65E0\u951A\u70B9\uFF08\u70B9\u51FB\u9876\u90E8/\u5E95\u90E8\u6309\u94AE\u53EF\u81EA\u52A8\u751F\u6210\uFF09",setAnchor:"\u8BBE\u7F6E\u951A\u70B9",clearAnchor:"\u6E05\u9664\u951A\u70B9",returnAnchor:"\u8FD4\u56DE\u951A\u70B9",returnPreviousPosition:"\u8FD4\u56DE\u8DF3\u8F6C\u524D\u4F4D\u7F6E",anchorSet:"\u5DF2\u8BBE\u7F6E\u951A\u70B9",anchorSetFailed:"\u8BBE\u7F6E\u951A\u70B9\u5931\u8D25",anchorCleared:"\u5DF2\u6E05\u9664\u951A\u70B9",returnedAnchor:"\u5DF2\u8FD4\u56DE\u951A\u70B9",returnedPreviousPosition:"\u5DF2\u8FD4\u56DE\u8DF3\u8F6C\u524D\u4F4D\u7F6E",returnAnchorFailed:"\u8FD4\u56DE\u951A\u70B9\u5931\u8D25",scrolledTop:"\u5DF2\u6EDA\u52A8\u5230\u9876\u90E8",scrolledBottom:"\u5DF2\u6EDA\u52A8\u5230\u5E95\u90E8",exportModuleLoadFailed:"\u5BFC\u51FA\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 ChatGPT Helper \u5BFC\u51FA\u811A\u672C\u662F\u5426\u6B63\u5E38\u8FD0\u884C\u3002",exportModuleMissing:"\u672A\u68C0\u6D4B\u5230 ChatGPT Helper \u5BFC\u51FA\u6A21\u5757\uFF0C\u8BF7\u786E\u4FDD\u6269\u5C55\u5DF2\u6B63\u786E\u52A0\u8F7D\u3002",operationFailed:"\u64CD\u4F5C\u5931\u8D25",openThemeSettings:"\u6253\u5F00\u4E3B\u9898\u8BBE\u7F6E",themeDialogTitle:"\u4E3B\u9898",themeAppearance:"\u5916\u89C2",themeAppearanceSystem:"\u8DDF\u968F\u7CFB\u7EDF",themeAppearanceLight:"\u6D45\u8272",themeAppearanceDark:"\u6DF1\u8272",themeColorPresets:"\u989C\u8272",themePresetOriginal:"\u539F\u59CB\u4E3B\u9898",themeWallpaper:"\u58C1\u7EB8",themeEnableWallpaper:"\u542F\u7528\u58C1\u7EB8",themeDropImage:"\u5C06\u56FE\u7247\u62D6\u653E\u5230\u8FD9\u91CC",themeFileTypes:"\u652F\u6301 PNG\u3001JPG\u3001WebP\uFF0C\u6700\u5927 5MB",themeSelectFile:"\u9009\u62E9\u6587\u4EF6",themeRemoveImage:"\u79FB\u9664\u80CC\u666F\u56FE",themeBlur:"\u6A21\u7CCA",themeMessageGlass:"\u6D88\u606F\u6BDB\u73BB\u7483\u6548\u679C",themeMessageGlassIntensity:"\u6D88\u606F\u6BDB\u73BB\u7483\u5F3A\u5EA6",themePanelGlassIntensity:"\u4FA7\u680F/\u53F3\u680F\u6BDB\u73BB\u7483\u5F3A\u5EA6",themeSidebarEnhance:"\u4FA7\u680F\u6587\u5B57\u589E\u5F3A",themeSidebarEnhanceIntensity:"\u589E\u5F3A\u5F3A\u5EA6",themeLivePreview:"\u5B9E\u65F6\u9884\u89C8",themeUploadSuccess:"\u80CC\u666F\u56FE\u7247\u5DF2\u66F4\u65B0",themeBackgroundRemoved:"\u80CC\u666F\u56FE\u7247\u5DF2\u79FB\u9664",themeNoBackground:"\u6682\u65E0\u80CC\u666F\u56FE\u7247",themeInvalidType:"\u4EC5\u652F\u6301 PNG/JPG/WebP \u683C\u5F0F",themeFileTooLarge:"\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB",themeImageLoadFailed:"\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",themeSwitchedLight:"\u5DF2\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",themeSwitchedDark:"\u5DF2\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",themeSwitchFailed:"\u4E3B\u9898\u5207\u6362\u5931\u8D25",aboutButton:"\u5173\u4E8E",aboutTopEntryTitle:"\u5173\u4E8E",aboutDialogTitle:"\u5173\u4E8E ChatGPT Helper",aboutTagline:"\u8D34\u8FD1 ChatGPT \u7684\u8F7B\u91CF\u6548\u7387\u9762\u677F",aboutMotivationTitle:"\u5F00\u53D1\u52A8\u673A",aboutMotivationContent:"\u6E90\u4E8E\u65E5\u5E38\u4F7F\u7528\u4E2D\u7684\u5B9E\u9645\u9700\u6C42\uFF0C\u628A\u63D0\u793A\u8BCD\u3001\u5BFC\u822A\u548C\u6574\u7406\u5DE5\u5177\u653E\u5728\u4E00\u5904\uFF0C\u51CF\u5C11\u5207\u6362\uFF0C\u8BA9\u6CE8\u610F\u529B\u56DE\u5230\u5BF9\u8BDD\u3002",aboutFeedbackTitle:"\u53CD\u9988",aboutFeatureRequest:"\u529F\u80FD\u5EFA\u8BAE",aboutBugSupport:"\u63D0\u4EA4\u53CD\u9988",aboutOpenSourceTitle:"\u9879\u76EE\u4FE1\u606F",aboutSupportTitle:"\u5206\u4EAB\u9879\u76EE",aboutSupportContent:"\u5982\u679C ChatGPT Helper \u5BF9\u4F60\u7684\u5DE5\u4F5C\u6D41\u6709\u5E2E\u52A9\uFF0C\u53EF\u4EE5\u628A\u4ED3\u5E93\u5206\u4EAB\u7ED9\u9700\u8981\u7684\u4EBA\uFF0C\u6216\u5728 GitHub \u4E0A\u7559\u4E0B\u5EFA\u8BAE\u3002",aboutShare:"\u5206\u4EAB\u7ED9\u670B\u53CB",aboutAuthorTitle:"\u5173\u4E8E\u4F5C\u8005",aboutAuthorBio:`TJU | CS \u5728\u8BFB
AI \u5DE5\u5177\u63A2\u7D22\u8005
\u957F\u671F ChatGPT \u4F7F\u7528\u8005`,aboutRepoButton:"GitHub \u4ED3\u5E93",aboutRepoLabel:"\u9879\u76EE\u4ED3\u5E93",aboutAuthorGithub:"\u4F5C\u8005 GitHub",aboutClose:"\u5173\u95ED",aboutCopyRepoSuccess:"\u5206\u4EAB\u94FE\u63A5\u5DF2\u590D\u5236",aboutCopyRepoFailed:"\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u4ED3\u5E93\u94FE\u63A5",aboutVersionTitle:"\u7248\u672C\u4FE1\u606F",aboutVersionLabel:"\u7248\u672C",aboutAuthorLabel:"\u4F5C\u8005",aboutLicenseLabel:"\u8BB8\u53EF\u8BC1",aboutPoweredBy:"\u4E3A\u4E13\u6CE8\u7684 ChatGPT \u5DE5\u4F5C\u6D41\u6253\u9020",aboutIntroTitle:"\u9879\u76EE\u7B80\u4ECB",aboutIntro:"ChatGPT Helper \u901A\u8FC7\u53F3\u4FA7\u529F\u80FD\u9762\u677F\u4E3A ChatGPT \u63D0\u4F9B\u63D0\u793A\u8BCD\u7BA1\u7406\u3001\u5BF9\u8BDD\u5927\u7EB2\u3001\u4F1A\u8BDD\u6574\u7406\u3001\u5BFC\u51FA\u4E0E\u9605\u8BFB\u5B9A\u4F4D\u7B49\u589E\u5F3A\u80FD\u529B\uFF0C\u5C3D\u91CF\u4FDD\u6301\u539F\u9875\u9762\u7ED3\u6784\u4E0D\u88AB\u6253\u65AD\u3002",aboutFeaturesTitle:"\u6838\u5FC3\u80FD\u529B",aboutFeaturePrompts:"\u63D0\u793A\u8BCD\u7BA1\u7406\u4E0E\u5FEB\u901F\u63D2\u5165",aboutFeatureOutline:"\u81EA\u52A8\u751F\u6210\u5BF9\u8BDD\u5927\u7EB2\u4E0E\u5BFC\u822A",aboutFeatureConversations:"\u5386\u53F2\u4F1A\u8BDD\u6574\u7406\u4E0E\u6279\u91CF\u7BA1\u7406",aboutFeatureExport:"\u591A\u683C\u5F0F\u5BFC\u51FA\u4E0E\u9605\u8BFB\u5B9A\u4F4D\u589E\u5F3A",aboutSitesLabel:"\u7AD9\u70B9",aboutSupportSites:"\u652F\u6301 chatgpt.com\u3001chat.openai.com \u4E0E new.oaifree.com",aboutPrivacyTitle:"\u9690\u79C1\u4E0E\u6743\u9650",aboutPrivacy:"\u6240\u6709\u8BBE\u7F6E\u4E0E\u6570\u636E\u5904\u7406\u5747\u5728\u672C\u5730\u6D4F\u89C8\u5668\u5B8C\u6210\uFF1B\u6269\u5C55\u4F7F\u7528 storage \u4FDD\u5B58\u672C\u5730\u914D\u7F6E\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u5BF9\u8BDD\u5185\u5BB9\u3002",searchConversations:"\u641C\u7D22\u4F1A\u8BDD...",selectConversationsFirst:"\u8BF7\u5148\u9009\u62E9\u8981\u64CD\u4F5C\u7684\u4F1A\u8BDD",defaultPanelOpenLabel:"\u9ED8\u8BA4\u5C55\u5F00\u9762\u677F",enablePromptsLabel:"\u542F\u7528\u63D0\u793A\u8BCD",enableOutlineLabel:"\u542F\u7528\u5927\u7EB2",showUserMessagesLabel:"\u663E\u793A\u7528\u6237\u6D88\u606F",enableConversationsLabel:"\u542F\u7528\u4F1A\u8BDD\u7BA1\u7406",preventAutoScrollLabel:"\u9632\u6B62\u81EA\u52A8\u6EDA\u52A8",preventAutoScrollDesc:"\u9605\u8BFB\u524D\u6587\u65F6\uFF0C\u4E0D\u8BA9\u9875\u9762\u8DF3\u5230\u6700\u65B0\u56DE\u590D",enableReadingHistoryLabel:"\u542F\u7528\u9605\u8BFB\u5386\u53F2",enableReadingHistoryDesc:"\u8BB0\u4F4F\u6BCF\u4E2A\u4F1A\u8BDD\u4E0A\u6B21\u8BFB\u5230\u7684\u4F4D\u7F6E",autoRestoreLabel:"\u81EA\u52A8\u8DF3\u8F6C",autoRestoreDesc:"\u6253\u5F00\u4F1A\u8BDD\u65F6\u56DE\u5230\u4E0A\u6B21\u9605\u8BFB\u4F4D\u7F6E",outlineSyncScrollLabel:"\u5927\u7EB2\u8DDF\u968F\u9605\u8BFB\u4F4D\u7F6E",outlineSyncScrollDesc:"\u6EDA\u52A8\u6B63\u6587\u65F6\uFF0C\u9AD8\u4EAE\u5BF9\u5E94\u7684\u5927\u7EB2\u6761\u76EE",showUserMessagesDesc:"\u5728\u5927\u7EB2\u4E2D\u628A\u4F60\u7684\u63D0\u95EE\u4E5F\u4F5C\u4E3A\u8282\u70B9",tabVisibilityLabel:"Tab \u663E\u793A",tabAutoRenameLabel:"\u81EA\u52A8\u91CD\u547D\u540D\u6807\u7B7E\u9875",tabShowStatusLabel:"\u663E\u793A\u751F\u6210\u72B6\u6001",tabPlaySoundLabel:"\u64AD\u653E\u901A\u77E5\u58F0\u97F3",tabVolumeLabel:"\u901A\u77E5\u97F3\u91CF",tabPrivacyModeLabel:"\u9690\u79C1\u6A21\u5F0F",tabPrivacyTitleLabel:"\u9690\u79C1\u6A21\u5F0F\u6807\u9898",enableFormulaCopyLabel:"\u542F\u7528\u516C\u5F0F\u590D\u5236",enableTableCopyLabel:"\u542F\u7528\u8868\u683C\u590D\u5236",outlineEmpty:"\u6682\u65E0\u5927\u7EB2",outlineImages:"\u56FE\u7247\uFF08{n} \u5F20\uFF09",outlineTargetUnavailable:"\u6B64\u6761\u6D88\u606F\u5C1A\u672A\u8F7D\u5165\uFF0C\u6682\u65F6\u65E0\u6CD5\u5B9A\u4F4D",outlineSearchResult:"\u6761\u7ED3\u679C",outlineExpandAll:"\u5C55\u5F00\u5168\u90E8",outlineCollapseAll:"\u6298\u53E0\u5168\u90E8",outlineShowUserQueriesTooltip:"\u663E\u793A\u7528\u6237\u63D0\u95EE",outlineHideUserQueriesTooltip:"\u9690\u85CF\u7528\u6237\u63D0\u95EE",outlineLocateCurrent:"\u5B9A\u4F4D\u5F53\u524D\u4F4D\u7F6E",outlineSearch:"\u641C\u7D22\u5927\u7EB2...",outlineOnlyUserQueries:"\u53EA\u663E\u793A\u7528\u6237\u63D0\u95EE",outlineScrollBottom:"\u6EDA\u52A8\u5230\u5E95\u90E8",outlineScrollTop:"\u6EDA\u52A8\u5230\u9876\u90E8",clear:"\u6E05\u9664",buttonScrollTop:"\u9876\u90E8",buttonAnchor:"\u951A\u70B9",buttonTheme:"\u4E3B\u9898",buttonManualAnchor:"\u624B\u52A8\u951A\u70B9",buttonScrollBottom:"\u5E95\u90E8",buttonBack:"\u8FD4\u56DE",moveUp:"\u4E0A\u79FB",moveDown:"\u4E0B\u79FB",buttonOrderUpdated:"\u5DF2\u66F4\u65B0\u6309\u94AE\u987A\u5E8F",enabled:"\u5DF2\u542F\u7528",disabled:"\u5DF2\u7981\u7528",settingsGroupData:"\u5907\u4EFD\u4E0E\u6062\u590D",backupExportButton:"\u5BFC\u51FA\u5907\u4EFD",backupExportDesc:"\u5C06\u63D0\u793A\u8BCD\u3001\u8BBE\u7F6E\u3001\u4E3B\u9898\u4E0E\u58C1\u7EB8\u3001\u4F1A\u8BDD\u6574\u7406\u6570\u636E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6",backupImportButton:"\u5BFC\u5165\u5907\u4EFD",backupImportDesc:"\u4ECE\u5907\u4EFD\u6587\u4EF6\u6062\u590D\uFF0C\u5C06\u8986\u76D6\u5F53\u524D\u7684\u540C\u9879\u6570\u636E",backupImportConfirm:`\u5BFC\u5165\u5C06\u8986\u76D6\u5F53\u524D\u7684\u63D0\u793A\u8BCD\u3001\u8BBE\u7F6E\u3001\u4E3B\u9898\u4E0E\u4F1A\u8BDD\u6574\u7406\u6570\u636E\uFF0C\u4E14\u65E0\u6CD5\u64A4\u9500\u3002
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

Context and options:`,defaultPromptDecisionCategory:"Decision",allCategory:"All",refresh:"Refresh",minimizeQuickButtons:"Minimize shortcuts",expandQuickButtons:"Expand shortcuts",expand:"Expand sidebar",collapse:"Collapse sidebar",edit:"Edit",delete:"Delete",save:"Save",cancel:"Cancel",add:"Add",title:"Title",category:"Category",content:"Prompt Content",promptUpdated:"Prompt updated",promptAdded:"Prompt added",deleted:"Deleted",copied:"Copied to clipboard",refreshed:"Refreshed",inserted:"Prompt inserted",confirmDelete:"Delete this prompt?",fillTitleContent:"Please fill in title and content",noConversations:"No conversations",noSearchResults:"No matching results",inbox:"Inbox",untitledConversation:"Untitled conversation",promptFolderName:"Enter folder name:",moveToFolder:"Move to Folder",confirm:"Confirm",confirmDeleteConversation:'Delete "{title}"?',confirmDeleteConversations:"Delete {count} conversations?",exportedConversations:"Exported {count} conversations",openConversationFirst:"Open the conversation first: {title}",addTag:"Add Tag",tagPrompt:"Enter a tag name. Leave blank to remove tags:",tagUpdated:"Tag updated",exportInfoHeading:"Export Info",conversationTitleLabel:"Conversation Title",exportTimeLabel:"Export Time",sourceLabel:"Source",linkLabel:"Link",userRole:"User",historyLoading:"Loading history...",scrollContainerMissing:"Scroll container not found",historyLoadComplete:"History loaded",pleaseWait:"Please wait...",stop:"Stop",formulaCopied:"Formula copied",formulaSourceUnavailable:"Formula source unavailable; nothing was copied",copyFailed:"Copy failed",copyAsMarkdown:"Copy as Markdown",tableCopied:"Table copied",outlineNoContent:"No outline yet. Wait for the conversation to generate or refresh the page.",syncConversations:"Sync Conversations",newFolder:"New Folder",deleteFolder:"Delete folder",deleteFolderConfirm:`Delete folder "{name}"?
Conversations in this folder will be moved to Inbox.`,folderDeleted:"Folder deleted",batchMode:"Batch Mode",batchComplete:"Complete",selected:"Selected",items:"items",move:"Move",export:"Export",pinned:"Pinned",unpinned:"Unpinned",moved:"Moved",exported:"Exported",synced:"Synced",conversationSyncing:"Syncing conversations...",conversationSyncNoResults:"No history conversations loaded. Make sure you are signed in to ChatGPT, then try again.",conversationSyncFailed:"Conversation sync failed. Please try again later.",newSessions:"new sessions",updatedSessions:"sessions",exportFormat:`Select export format:
1. Markdown
2. JSON
3. TXT`,exportSuccess:"Export successful",exportFailed:"Export failed",noContent:"No conversation content found",openFirst:"Please open the conversation first",settingsTitle:"Settings",readingHistory:"Reading History",settingsGroupGeneral:"General",settingsGroupTabs:"Tabs",settingsGroupReadingNavigation:"Reading & Navigation",settingsGroupContentProcessing:"Content Processing",settingsGroupBrowserTab:"Browser Tab",settingsGroupQuickButtons:"Quick Buttons",settingsShowTab:'Show "{name}"',tabOrderUpdated:"Tab order updated",language:"Interface Language",autoDetect:"Auto Detect",chinese:"\u7B80\u4F53\u4E2D\u6587",english:"English",themeToggle:"Switch Theme",newChatInTab:"Open Chat in New Tab",noAnchor:"No anchor",noAnchorAutoHint:"No anchor yet. Click Top or Bottom to create one automatically.",setAnchor:"Set Anchor",clearAnchor:"Clear Anchor",returnAnchor:"Return to Anchor",returnPreviousPosition:"Return to Previous Position",anchorSet:"Anchor set",anchorSetFailed:"Failed to set anchor",anchorCleared:"Anchor cleared",returnedAnchor:"Returned to anchor",returnedPreviousPosition:"Returned to previous position",returnAnchorFailed:"Failed to return to anchor",scrolledTop:"Scrolled to top",scrolledBottom:"Scrolled to bottom",exportModuleLoadFailed:"Export module failed to load. Check whether the ChatGPT Helper export script is running.",exportModuleMissing:"ChatGPT Helper export module was not detected. Make sure the extension loaded correctly.",operationFailed:"Operation failed",openThemeSettings:"Open Theme Settings",themeDialogTitle:"Theme",themeAppearance:"Appearance",themeAppearanceSystem:"System",themeAppearanceLight:"Light",themeAppearanceDark:"Dark",themeColorPresets:"Colors",themePresetOriginal:"Original",themeWallpaper:"Wallpaper",themeEnableWallpaper:"Enable Wallpaper",themeDropImage:"Drop image here",themeFileTypes:"PNG/JPG/WebP up to 5MB",themeSelectFile:"Select File",themeRemoveImage:"Remove Background",themeBlur:"Blur",themeMessageGlass:"Message Glass Effect",themeMessageGlassIntensity:"Message Glass Intensity",themePanelGlassIntensity:"Side Panel Glass Intensity",themeSidebarEnhance:"Sidebar Text Enhance",themeSidebarEnhanceIntensity:"Enhance Intensity",themeLivePreview:"Live Preview",themeUploadSuccess:"Background image updated",themeBackgroundRemoved:"Background image removed",themeNoBackground:"No background image",themeInvalidType:"Only PNG/JPG/WebP is supported",themeFileTooLarge:"Image size must be 5MB or less",themeImageLoadFailed:"Image loading failed, please try again",themeSwitchedLight:"Switched to light mode",themeSwitchedDark:"Switched to dark mode",themeSwitchFailed:"Theme switch failed",aboutButton:"About",aboutTopEntryTitle:"About",aboutDialogTitle:"About ChatGPT Helper",aboutTagline:"A focused productivity layer designed for heavy ChatGPT users",aboutMotivationTitle:"Motivation",aboutMotivationContent:"Built for everyday use, ChatGPT Helper brings prompts, navigation, and organization together so you can spend less time switching and more time on the conversation.",aboutFeedbackTitle:"Feedback",aboutFeatureRequest:"Feature Request",aboutBugSupport:"Submit Feedback",aboutOpenSourceTitle:"Project Info",aboutSupportTitle:"Share the Project",aboutSupportContent:"If ChatGPT Helper fits your workflow, share the repository with someone who may need it, or leave feedback on GitHub.",aboutShare:"Share with Friends",aboutAuthorTitle:"About the Author",aboutAuthorBio:`TJU | Computer Science student
AI tool builder
Long-time ChatGPT user`,aboutRepoButton:"GitHub Repository",aboutRepoLabel:"Repository",aboutAuthorGithub:"Author GitHub",aboutClose:"Close",aboutCopyRepoSuccess:"Share link copied",aboutCopyRepoFailed:"Copy failed, please copy the repository link manually",aboutVersionTitle:"Version Info",aboutVersionLabel:"Version",aboutAuthorLabel:"Author",aboutLicenseLabel:"License",aboutPoweredBy:"Built for focused ChatGPT workflows",aboutIntroTitle:"Overview",aboutIntro:"ChatGPT Helper adds a focused side panel for prompt management, outlines, conversation organization, exports, and reading-position utilities while keeping the native ChatGPT flow familiar.",aboutFeaturesTitle:"Core Features",aboutFeaturePrompts:"Prompt management and quick insertion",aboutFeatureOutline:"Automatic outline generation and navigation",aboutFeatureConversations:"Conversation organization and batch actions",aboutFeatureExport:"Multi-format export and reading-position tools",aboutSitesLabel:"Sites",aboutSupportSites:"Works on chatgpt.com, chat.openai.com, and new.oaifree.com",aboutPrivacyTitle:"Privacy & Permissions",aboutPrivacy:"All settings and data processing stay in your browser. The extension uses storage for local preferences and does not upload conversation content.",searchConversations:"Search conversations...",selectConversationsFirst:"Please select conversations first",defaultPanelOpenLabel:"Open Panel by Default",enablePromptsLabel:"Prompts",enableOutlineLabel:"Outline",showUserMessagesLabel:"Show User Messages",enableConversationsLabel:"Conversation Manager",preventAutoScrollLabel:"Prevent Auto Scroll",preventAutoScrollDesc:"Stop the page from jumping to the newest reply while you read earlier content",enableReadingHistoryLabel:"Reading History",enableReadingHistoryDesc:"Remember the last reading position in each conversation",autoRestoreLabel:"Auto Restore Position",autoRestoreDesc:"Open conversations at the last remembered reading position",outlineSyncScrollLabel:"Outline Follows Reading Position",outlineSyncScrollDesc:"Highlight the matching outline item while you scroll the conversation",showUserMessagesDesc:"Include your questions as outline nodes",tabVisibilityLabel:"Tab Visibility",tabAutoRenameLabel:"Auto Rename Tab",tabShowStatusLabel:"Show Generation Status",tabPlaySoundLabel:"Play Notification Sound",tabVolumeLabel:"Notification Volume",tabPrivacyModeLabel:"Privacy Mode",tabPrivacyTitleLabel:"Privacy Mode Title",enableFormulaCopyLabel:"Formula Copy",enableTableCopyLabel:"Table Copy",languageChanged:"Language changed",outlineEmpty:"No outline",outlineImages:"Images ({n})",outlineTargetUnavailable:"This message has not loaded yet.",outlineSearchResult:"results",outlineExpandAll:"Expand All",outlineCollapseAll:"Collapse All",outlineShowUserQueriesTooltip:"Show user queries",outlineHideUserQueriesTooltip:"Hide user queries",outlineLocateCurrent:"Locate Current Position",outlineSearch:"Search outline...",outlineOnlyUserQueries:"Only show user queries",outlineScrollBottom:"Scroll to bottom",outlineScrollTop:"Scroll to top",clear:"Clear",buttonScrollTop:"Top",buttonAnchor:"Anchor",buttonTheme:"Theme",buttonManualAnchor:"Manual Anchor",buttonScrollBottom:"Bottom",buttonBack:"Back",moveUp:"Move Up",moveDown:"Move Down",buttonOrderUpdated:"Button order updated",enabled:"Enabled",disabled:"Disabled",settingsGroupData:"Backup & Restore",backupExportButton:"Export Backup",backupExportDesc:"Export prompts, settings, theme, wallpapers and conversation groups to a JSON file",backupImportButton:"Import Backup",backupImportDesc:"Restore from a backup file; matching local data will be replaced",backupImportConfirm:`Importing will replace your current prompts, settings, theme and conversation groups. This cannot be undone.
Continue?`,backupExportSuccess:"Backup exported",backupImportSuccess:"Backup imported. Reloading\u2026",backupInvalidFile:"Not a valid ChatGPT Helper backup file",backupImportFailed:"Import failed. The backup file may be corrupted",backupIncludeHint:"{prompts} prompts, {conversations} conversations, {assets} wallpapers",backupReadingHint:"Reading backup data\u2026",onboardingTitle:"Meet your sidebar",onboardingSubtitle:"Find the tools you will use most, right where they live. You can skip at any time.",onboardingDuration:"Quick tour \xB7 About a minute",onboardingGuide:"Quick tour",onboardingStart:"Take the tour",onboardingSkip:"Skip",onboardingPrevious:"Back",onboardingNext:"Next",onboardingFinish:"Get started",tour_prompts_label:"Prompts",tour_prompts_title:"Keep useful prompts close",tour_prompts_body:"Choose a prompt to insert it into the composer. Type // to open the quick menu.",tour_outline_label:"Outline",tour_outline_title:"Jump to the part you need",tour_outline_body:"Select an entry to jump to its content. Use Return to get back to your reading position.",tour_outline_empty:"The outline appears when a conversation has content. Try opening a previous chat.",tour_organize_label:"Organize & export",tour_organize_title:"Find old chats. Keep the useful parts.",tour_organize_body:"Search, pin and group chats in Conversations. Save the current chat from Export.",tour_panel_label:"Sidebar",tour_panel_title:"More room when you need it",tour_panel_body:"Drag the left edge to resize. Keep dragging right to collapse, or use the shortcut.",tour_appearance_label:"Appearance",tour_appearance_title:"Themes and wallpaper",tour_appearance_body:"Choose light or dark, add a wallpaper and adjust the glass effect. Replay this tour from Settings.",tour_focus_composer:"Focus composer",tour_open_conversations:"View conversations",tour_open_export:"Open export",tour_collapse_panel:"Try collapsing",tour_expand_panel:"Expand sidebar",tour_open_theme:"Open theme settings",tour_target_missing:"This area is collapsed or hidden. You can continue to the next step.",replayOnboarding:"Replay Onboarding",promptSortLabel:"Sort",promptSortManual:"Manual",promptSortRecent:"Recent",promptSortFrequent:"Frequent",promptVariablesTitle:"Fill in Variables",promptVariablesDesc:"This prompt contains variables. Fill them in before inserting:",promptInsert:"Insert",promptQuickMenuEnabledLabel:"Slash Quick Menu",promptQuickMenuEnabledDesc:"Typing // in the ChatGPT input opens a quick prompt picker (single / belongs to ChatGPT native commands)",quickMenuEmpty:"No matching prompts",quickMenuHint:"\u2191\u2193 navigate \xB7 Enter insert \xB7 Esc close",shortcutHintLabel:"Panel Shortcut",shortcutHintDesc:"Alt+Shift+H toggles the panel. Change it at chrome://extensions/shortcuts",selectMessageTitle:"Select this message",selectedMessagesCount:"{count} selected",exportSelectedImage:"Image",exportSelectedMarkdown:"Markdown",exportSelectedJson:"JSON",exportSelectedTxt:"TXT",copySelectedMessages:"Copy",clearSelection:"Clear",selectedExported:"Selected messages exported",selectedExportEmpty:"Select messages first",selectedCopied:"Selected messages copied",selectedNoContent:"The selected messages have no text content to export",exportEngineLoading:"Loading export engine\u2026",exportEngineInjectFailed:"Failed to load the export engine. Refresh the page and try again"}};function Ue(){const r=window.GM_getValue(J.LANGUAGE,"auto");return r!=="auto"&&Object.prototype.hasOwnProperty.call($e,r)?r:(navigator.language||navigator.userLanguage||"en").startsWith("zh")?"zh-CN":"en"}let it=Ue();function re(r){return $e[it]?.[r]||$e.en?.[r]||r}const xt={prompts:{id:"prompts",label:"\u63D0\u793A\u8BCD",iconName:"edit"},outline:{id:"outline",label:"\u5927\u7EB2",iconName:"list"},conversations:{id:"conversations",label:"\u4F1A\u8BDD",iconName:"message"},export:{id:"export",label:"\u5BFC\u51FA",iconName:"export"},settings:{id:"settings",label:"\u8BBE\u7F6E",iconName:"settings"}},Pe={scrollTop:{iconName:"arrowUp",labelKey:"buttonScrollTop",canToggle:!1,isPanelOnly:!1},panel:{icon:"",iconType:"helper-logo",labelKey:null,label:"ChatGPT Helper",canToggle:!1,isPanelOnly:!0},anchor:{iconName:"anchor",labelKey:"buttonAnchor",canToggle:!0,isPanelOnly:!0},theme:{iconName:"sun",labelKey:"buttonTheme",canToggle:!0,isPanelOnly:!0},manualAnchor:{iconName:"pin",labelKey:"buttonManualAnchor",canToggle:!0,isPanelOnly:!1,isGroup:!0},scrollBottom:{iconName:"arrowDown",labelKey:"buttonScrollBottom",canToggle:!1,isPanelOnly:!1}},Ge=[{id:"scrollTop",enabled:!0},{id:"panel",enabled:!0},{id:"anchor",enabled:!0},{id:"theme",enabled:!0},{id:"manualAnchor",enabled:!0},{id:"scrollBottom",enabled:!0}],vt=[{key:"original",labelKey:"themePresetOriginal",primary:"#64748b",secondary:"#94a3b8",accent:"#475569",light:"#f8fafc",isOriginal:!0},{key:"blue",primary:"#4285f4",secondary:"#60a5fa",accent:"#2563eb",light:"#eaf2ff"},{key:"gray",primary:"#52525b",secondary:"#71717a",accent:"#3f3f46",light:"#f3f4f6"},{key:"red",primary:"#dc2626",secondary:"#f87171",accent:"#b91c1c",light:"#ffecec"},{key:"pink",primary:"#db2777",secondary:"#f472b6",accent:"#be185d",light:"#ffe6f3"},{key:"purple",primary:"#9333ea",secondary:"#c084fc",accent:"#7e22ce",light:"#f2e9ff"},{key:"cyan",primary:"#0891b2",secondary:"#22d3ee",accent:"#0e7490",light:"#e2fbff"},{key:"teal",primary:"#0d9488",secondary:"#2dd4bf",accent:"#0f766e",light:"#e2fdf8"},{key:"green",primary:"#16a34a",secondary:"#4ade80",accent:"#15803d",light:"#e8ffe8"},{key:"yellow",primary:"#ca8a04",secondary:"#facc15",accent:"#a16207",light:"#fff8d8"},{key:"orange",primary:"#ea580c",secondary:"#fb923c",accent:"#c2410c",light:"#fff0e4"}],st=vt.reduce((r,e)=>(r[e.key]=e,r),{}),on=["--gh-theme-primary","--gh-theme-secondary","--gh-theme-accent","--gh-theme-accent-dark","--gh-theme-light","--gh-primary","--gh-primary-hover","--gh-tag-active-bg","--gh-gradient","--gh-header-bg","--gh-theme-surface-light-base","--gh-theme-surface-light-accent","--gh-theme-surface-dark-base","--gh-theme-surface-dark-accent","--gh-page-sidebar-bg-light","--gh-page-chat-bg-light","--gh-page-composer-bg-light","--gh-page-sidebar-bg-dark","--gh-page-chat-bg-dark","--gh-page-composer-bg-dark","--gh-page-accent-soft","--gh-page-accent-soft-dark","--gh-page-accent-strong","--gh-page-link","--gh-page-selection"],Wt="chatgpt_helper_theme",Yt=1,je="assets",Kt=5*1024*1024,Xt=["image/png","image/jpeg","image/webp"],sn="",Jt="https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper/issues/new",Zt="https://github.com/zhiwuyazhe-fjr/ChatGPT-Helper",er="https://github.com/zhiwuyazhe-fjr",tr="ChatGPT Helper",Ve="2.7.8",rr="zhiwuyazhe_fjr",nr="MIT",yt=["data-gh-theme-host-sidebar-shell","data-gh-theme-host-sidebar","data-gh-theme-host-main","data-gh-theme-host-chat-list","data-gh-theme-host-composer","data-gh-theme-host-composer-surface"],ce={appearanceMode:"system",presetKey:"original",backgroundImageEnabled:!1,backgroundBlurPx:5,messageGlassEnabled:!1,messageGlassIntensity:60,panelGlassIntensity:45,sidebarTextEnhanceEnabled:!0,sidebarTextEnhanceIntensity:20,backgroundAssetId:null,updatedAt:""},lt={panelWidth:320,defaultPanelState:!0,prompts:{enabled:!0},promptSortMode:"manual",promptQuickMenuEnabled:!0,outline:{enabled:!0,showUserQueries:!0,autoUpdate:!0,syncScroll:!0,updateInterval:2,maxLevel:6},conversations:{enabled:!0},tabOrder:["prompts","outline","conversations","export"],collapsedButtonsOrder:Ge,themeMode:null,themeConfig:{...ce},anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,preventAutoScroll:!1,readingHistory:{persistence:!0,autoRestore:!1},formulaCopy:{enabled:!0},tableCopy:{enabled:!0},tabSettings:{enabled:!0,showStatus:!0,notificationSound:!1,notificationVolume:.5,titleFormat:"{status}{title}",privacyMode:!1,privacyTitle:"ChatGPT"}};function Qe(){return[{id:"default_3",title:re("defaultPromptResearchTitle"),content:re("defaultPromptResearchContent"),category:re("defaultPromptResearchCategory")},{id:"default_4",title:re("defaultPromptPlanningTitle"),content:re("defaultPromptPlanningContent"),category:re("defaultPromptPlanningCategory")},{id:"default_5",title:re("defaultPromptWritingTitle"),content:re("defaultPromptWritingContent"),category:re("defaultPromptWritingCategory")},{id:"default_6",title:re("defaultPromptDebugTitle"),content:re("defaultPromptDebugContent"),category:re("defaultPromptDebugCategory")},{id:"default_7",title:re("defaultPromptDecisionTitle"),content:re("defaultPromptDecisionContent"),category:re("defaultPromptDecisionCategory")}]}const ln=Qe(),We=220,ht=640,hn=new Set(["id","name","type","value","title","placeholder","checked","disabled","readOnly","min","max","step","alt","draggable","download","accept","htmlFor","tabIndex","spellcheck","indeterminate","selected","maxLength","rows","cols","wrap","target","rel","dir","lang","inputMode"]);function cn(r,e){if(typeof e!="string"||!e)return!0;const t=e.trim().toLowerCase();return!(t.startsWith("javascript:")||t.startsWith("vbscript:")||t.startsWith("data:text/html")||(r==="src"||r==="srcset")&&t.startsWith("data:")&&!t.startsWith("data:image/"))}function d(r,e={},t=""){const n=document.createElement(r);return typeof e=="string"&&(t=e,e={}),Object.entries(e).forEach(([a,o])=>{a==="className"?n.className=o:a==="style"&&typeof o=="object"?Object.assign(n.style,o):a==="style"&&typeof o=="string"?/url\(/i.test(o)||(n.style.cssText=o):a.startsWith("data-")||a.startsWith("aria-")||a==="role"?n.setAttribute(a,o):/^on/i.test(a)||a==="innerHTML"||a==="outerHTML"||a==="srcdoc"||a==="formAction"?console.warn("[ChatGPT Helper] createElement \u62D2\u7EDD\u5371\u9669\u5C5E\u6027:",a):a==="href"||a==="src"?cn(a,o)?n.setAttribute(a,o):console.warn("[ChatGPT Helper] createElement \u62D2\u7EDD\u4E0D\u5B89\u5168 URL \u5C5E\u6027:",a):hn.has(a)?n[a]=o:n.setAttribute(a,o)}),t&&(n.textContent=t),n}function _e(){return typeof browser<"u"&&browser.runtime?browser.runtime:typeof chrome<"u"&&chrome.runtime?chrome.runtime:null}function ar(r){const e=_e();try{return e&&typeof e.getURL=="function"?e.getURL(r):r}catch{return r}}function or(){const r=_e(),e={name:tr,version:Ve,author:rr,license:nr};try{const t=r&&typeof r.getManifest=="function"?r.getManifest():null;return t?{...e,...t}:e}catch{return e}}function Ye(r){if(!r)return!1;try{return window.open(r,"_blank","noopener,noreferrer"),!0}catch{try{return window.open(r,"_blank"),!0}catch{return!1}}}const pn=new Set(["chatgpt.com","chat.openai.com","new.oaifree.com"]);function ct(r){if(typeof r!="string")return null;const e=r.trim();if(!e)return null;try{const t=new URL(e,window.location.origin);return t.protocol!=="https:"&&t.protocol!=="http:"||!pn.has(t.hostname.toLowerCase())?null:t.href}catch{return null}}async function wt(r){if(!r)return!1;try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(r),!0}catch{}try{const e=d("textarea",{value:r});e.setAttribute("readonly","readonly"),e.style.position="fixed",e.style.opacity="0",e.style.pointerEvents="none",e.style.left="-9999px",e.style.top="0",document.body.appendChild(e),e.focus(),e.select(),e.setSelectionRange(0,e.value.length);const t=document.execCommand("copy");return e.remove(),!!t}catch{return!1}}function dn(){const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 48 48"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true"),r.style.width="100%",r.style.height="100%",r.style.display="block";const e=document.createElementNS("http://www.w3.org/2000/svg","circle");e.setAttribute("cx","24"),e.setAttribute("cy","24"),e.setAttribute("r","21"),e.setAttribute("fill","#ffffff"),e.setAttribute("stroke","#111827"),e.setAttribute("stroke-width","3"),r.appendChild(e);const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","M18.5 15.5 24 12l5.5 3.5v6.3L35 25.1v6.2L24 38l-11-6.7v-6.2l5.5-3.3v-6.3Z M18.5 21.8 24 25l5.5-3.2 M18.5 28.2 24 31.5l5.5-3.3"),t.setAttribute("stroke","#111827"),t.setAttribute("stroke-width","3"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),r.appendChild(t);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d","M35.5 8v12"),n.setAttribute("stroke","#facc15"),n.setAttribute("stroke-width","4.5"),n.setAttribute("stroke-linecap","round"),r.appendChild(n);const a=document.createElementNS("http://www.w3.org/2000/svg","path");return a.setAttribute("d","M29.5 14h12"),a.setAttribute("stroke","#facc15"),a.setAttribute("stroke-width","4.5"),a.setAttribute("stroke-linecap","round"),r.appendChild(a),r}function Re(r={}){const{size:e=18,className:t="",alt:n="ChatGPT Helper",title:a=""}=r,o=d("span",{className:t,title:a,role:"img","aria-label":n});o.style.width=`${e}px`,o.style.height=`${e}px`,o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.flexShrink="0",o.style.lineHeight="0",o.style.position="relative",o.style.overflow="hidden";const i=dn();i.classList.add("chatgpt-helper-logo-fallback-svg");const s=d("img",{className:"chatgpt-helper-logo-svg",alt:"",draggable:!1,"aria-hidden":"true"});return s.addEventListener("load",()=>{s.dataset.loaded="true"}),s.addEventListener("error",()=>{s.style.display="none",i.dataset.active="true"}),s.src=ar("icons/logo.svg"),o.appendChild(i),o.appendChild(s),o}const kt={inbox:[["path",{d:"M4 13 6.5 5h11L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"}],["path",{d:"M4 13h5l1.5 2h3L15 13h5"}]],edit:[["path",{d:"M12 20h9"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}]],list:[["path",{d:"M8 6h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 18h13"}],["path",{d:"M3 6h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 18h.01"}]],message:[["path",{d:"M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"}]],info:[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]],user:[["path",{d:"M19 21a7 7 0 0 0-14 0"}],["circle",{cx:"12",cy:"8",r:"4"}]],shield:[["path",{d:"M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"}],["path",{d:"m9 12 2 2 4-4"}]],github:[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.5 10.5 0 0 0-6 0C8 2 7 2 7 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 6 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4"}],["path",{d:"M9 18c-4.5 2-5-2-7-2"}]],external:[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],share:[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["path",{d:"m8.6 13.5 6.8 4"}],["path",{d:"m15.4 6.5-6.8 4"}]],export:[["path",{d:"M12 3v12"}],["path",{d:"m7 8 5-5 5 5"}],["path",{d:"M5 21h14"}],["path",{d:"M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4"}]],image:[["rect",{x:"3",y:"5",width:"18",height:"14",rx:"2"}],["circle",{cx:"8.5",cy:"10.5",r:"1.5"}],["path",{d:"m21 15-5-5L5 21"}]],settings:[["path",{d:"M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"}],["path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.36.32.7.6 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.52 1Z"}]],arrowUp:[["path",{d:"m18 15-6-6-6 6"}],["path",{d:"M12 9v12"}],["path",{d:"M5 3h14"}]],arrowDown:[["path",{d:"m6 9 6 6 6-6"}],["path",{d:"M12 15V3"}],["path",{d:"M5 21h14"}]],anchor:[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M12 8v13"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3"}],["path",{d:"m19 12-2 2"}],["path",{d:"m5 12 2 2"}]],sun:[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]],moon:[["path",{d:"M20.98 15.57A9 9 0 1 1 8.43 3.02 7 7 0 0 0 20.98 15.57Z"}]],plus:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],minus:[["path",{d:"M5 12h14"}]],search:[["circle",{cx:"11",cy:"11",r:"7"}],["path",{d:"m21 21-4.3-4.3"}]],refresh:[["path",{d:"M21 12a9 9 0 0 1-15.2 6.5"}],["path",{d:"M3 12A9 9 0 0 1 18.2 5.5"}],["path",{d:"M18 2v4h-4"}],["path",{d:"M6 22v-4h4"}]],collapse:[["path",{d:"m15 18-6-6 6-6"}]],expand:[["path",{d:"m9 18 6-6-6-6"}]],panelCollapse:[["rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"2.5"}],["path",{d:"M14.5 4.5v15"}],["path",{d:"m8.5 9.5 2.5 2.5-2.5 2.5"}]],panelExpand:[["rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"2.5"}],["path",{d:"M14.5 4.5v15"}],["path",{d:"m11 9.5-2.5 2.5 2.5 2.5"}]],pin:[["path",{d:"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"}],["circle",{cx:"12",cy:"10",r:"3"}]],back:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10a6 6 0 0 1 0 12h-2"}]],close:[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],check:[["path",{d:"m20 6-11 11-5-5"}]],checkSquare:[["rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}],["path",{d:"m8 12 2.5 2.5L16 9"}]],tag:[["path",{d:"M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .59 1.41l7.4 7.4a2 2 0 0 0 2.82 0l8.6-8.6a2 2 0 0 0 0-2.82l-7.4-7.4A2 2 0 0 0 12.6 2Z"}],["path",{d:"M7 7h.01"}]],folder:[["path",{d:"M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"}]],folderPlus:[["path",{d:"M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"}],["path",{d:"M12 10v6m-3-3h6"}]],trash:[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}],["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}]]};function j(r,e={}){const t=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=e.size||16;return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width",e.strokeWidth||"2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.setAttribute("aria-hidden","true"),t.classList.add("chatgpt-helper-svg-icon"),e.className&&e.className.split(/\s+/).filter(Boolean).forEach(o=>t.classList.add(o)),t.style.width=`${n}px`,t.style.height=`${n}px`,t.style.flexShrink="0",(kt[r]||kt.list).forEach(([o,i])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",o);Object.entries(i).forEach(([l,h])=>s.setAttribute(l,h)),t.appendChild(s)}),t}function ue(r,e,t={}){r&&r.replaceChildren(j(e,t))}function Ct(r,e={}){return r&&r.iconType==="helper-logo"?Re({size:e.size||18,className:e.className||"chatgpt-helper-icon-logo",title:e.title||r.label||"ChatGPT Helper"}):j(r&&r.iconName?r.iconName:"list",e)}function he(r){for(;r.firstChild;)r.firstChild.remove()}function Z(r,e,t){const n=Number(r);return Number.isFinite(n)?Math.min(t,Math.max(e,n)):e}function ir(r,e="#4285f4"){if(typeof r!="string")return e;const t=r.trim();return/^#[\da-fA-F]{6}$/.test(t)?t:/^#[\da-fA-F]{3}$/.test(t)?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:e}function pt(r,e="#4285f4"){const t=ir(r,e).slice(1);return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}function B(r,e,t=.5){const n=typeof r=="string"?pt(r):r,a=typeof e=="string"?pt(e):e,o=Z(t,0,1);return{r:Math.round(n.r+(a.r-n.r)*o),g:Math.round(n.g+(a.g-n.g)*o),b:Math.round(n.b+(a.b-n.b)*o)}}function _(r,e=1){const t=typeof r=="string"?pt(r):r;return`rgba(${t.r}, ${t.g}, ${t.b}, ${Z(e,0,1).toFixed(3)})`}function ie(r,e){return`linear-gradient(${r}, ${e.join(", ")})`}function sr(){return window.crypto&&typeof window.crypto.randomUUID=="function"?window.crypto.randomUUID():`theme-bg-${Date.now()}-${Math.random().toString(36).slice(2,10)}`}function ke(r){return st[r]||st[ce.presetKey]}function Ke(r,e,t={}){const n=e&&typeof e=="object"?e:ke(ce.presetKey),a=!!t.isDark,o=!!t.canRenderBackground,i=o?gn(n,t):{},s=n.primary||"#64748b",l=n.secondary||"#94a3b8",h=n.accent||s,p=n.light||"#f8fafc",c=o?"rgba(32, 33, 35, 0.74)":"#202123",u=o?"rgba(23, 23, 23, 0.66)":"#171717",g=o?`color-mix(in srgb, #ffffff, ${p} 68%)`:"#f9f9f9",v=o?`color-mix(in srgb, #f4f5f2, ${s} 12%)`:"#f9f9f9",f=a?c:g,S=a?u:v,k=a?"rgba(236, 236, 241, 0.96)":"rgba(18, 23, 20, 0.94)",M=a?"rgba(197, 197, 210, 0.74)":"rgba(85, 97, 89, 0.78)",x=a?o?"rgba(255, 255, 255, 0.15)":"rgba(255, 255, 255, 0.12)":o?`color-mix(in srgb, ${s}, rgba(12,18,16,0.14) 44%)`:"rgba(0, 0, 0, 0.10)",P=a?"0 1px 0 rgba(255, 255, 255, 0.035)":o?"0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 22px rgba(18, 23, 20, 0.07)":"0 1px 0 rgba(0, 0, 0, 0.025)",D=a?o?"0 8px 20px rgba(0, 0, 0, 0.20)":"0 0 0 0 rgba(0, 0, 0, 0)":o?`0 12px 30px color-mix(in srgb, rgba(18,23,20,0.12), ${s} 18%)`:"0 0 0 0 rgba(0, 0, 0, 0)";return{...r,"--gh-theme-primary":s,"--gh-theme-secondary":l,"--gh-theme-accent":h,"--gh-theme-accent-dark":h,"--gh-theme-light":p,"--gh-primary":s,"--gh-primary-hover":h,"--gh-tag-active-bg":s,"--gh-gradient":`linear-gradient(135deg, ${s} 0%, ${l} 100%)`,"--gh-header-bg":`linear-gradient(135deg, ${s} 0%, ${l} 100%)`,"--gh-text":r["--gh-text"]||k,"--gh-text-secondary":r["--gh-text-secondary"]||M,"--gh-panel-surface":`linear-gradient(180deg, ${f} 0%, ${S} 100%)`,"--gh-panel-subtle":a?o?"rgba(255, 255, 255, 0.045)":"color-mix(in srgb, #202123, #ffffff 2%)":o?`color-mix(in srgb, ${f}, ${s} 4%)`:"#f3f3f3","--gh-panel-card":r["--gh-panel-card-bg"]||(a?o?"rgba(255, 255, 255, 0.060)":"color-mix(in srgb, #202123, #ffffff 5%)":o?`color-mix(in srgb, ${f}, #ffffff 52%)`:"#ffffff"),"--gh-panel-card-hover":a?o?"rgba(255, 255, 255, 0.090)":"color-mix(in srgb, #202123, #ffffff 9%)":o?`color-mix(in srgb, ${f}, ${s} 9%)`:"#ececec","--gh-panel-line":x,"--gh-panel-muted-line":`color-mix(in srgb, ${x}, transparent 42%)`,"--gh-panel-elevated-shadow":D,"--gh-panel-card-shadow":P,"--gh-header-quiet-bg":a?"var(--gh-panel-surface)":o?`linear-gradient(180deg, color-mix(in srgb, ${f}, ${s} 8%) 0%, ${f} 100%)`:"var(--gh-panel-surface)","--gh-focus-ring":`color-mix(in srgb, ${s}, transparent ${a?56:68}%)`,"--gh-control-bg":a?o?"rgba(255, 255, 255, 0.055)":"color-mix(in srgb, #202123, #ffffff 5%)":o?`color-mix(in srgb, ${f}, #ffffff 48%)`:"#ffffff","--gh-control-bg-hover":a?o?"rgba(255, 255, 255, 0.090)":"color-mix(in srgb, #202123, #ffffff 9%)":o?`color-mix(in srgb, ${f}, ${s} 8%)`:"#ececec","--gh-control-border":`color-mix(in srgb, ${x}, transparent 8%)`,"--gh-control-radius":"8px","--gh-card-radius":"8px","--gh-danger":"#ef4444","--gh-success":"#10b981","--gh-warning":"#f59e0b","--gh-folder-bg-default":`color-mix(in srgb, ${s}, transparent ${a?78:86}%)`,"--gh-folder-bg-expanded":`color-mix(in srgb, ${s}, transparent ${a?68:78}%)`,"--gh-border-active":s,"--gh-checkbox-bg":h,...i}}function gn(r,e){const t=Z(e.panelIntensity,0,100)/100,n=Z(e.messageIntensity,0,100)/100,a=r.isOriginal?0:.045,o=B("#ffffff",r.primary,a),i=B("#202123",r.primary,a),s=e.isDark?i:o,l=.12+t*.62,h=_(s,l),p=_(s,.06+t*.14),c=_(s,.12+t*.18);return{"--gh-right-overlay":h,"--gh-page-sidebar-bg-light":_(o,l),"--gh-page-sidebar-bg-dark":_(i,l),"--gh-panel-surface":"transparent","--gh-header-quiet-bg":"transparent","--gh-panel-subtle":_(s,.04+t*.06),"--gh-panel-card-bg":p,"--gh-panel-card":p,"--gh-panel-card-hover":c,"--gh-control-bg":c,"--gh-input-bg":c,"--gh-control-bg-hover":_(s,.18+t*.18),"--gh-panel-card-shadow":"none","--gh-panel-elevated-shadow":"none","--gh-sidebar-button-bg":c,"--gh-msg-user-bg":_(s,.1+n*.48),"--gh-msg-assistant-bg":_(s,.06+n*.5),"--gh-page-composer-bg-light":_(o,.55+t*.3),"--gh-page-composer-bg-dark":_(i,.55+t*.3)}}function St(r,e={}){const t=r&&typeof r=="object"?r:ke(ce.presetKey),n=!!e.isDark,a=!!(t&&t.isOriginal),o=!!e.canRenderBackground,i=Z(e.panelIntensity,0,100)/100,s=Z(e.messageIntensity,0,100)/100,l=i,h=`${o?Math.round(i*40):0}px`,p=`${o?Math.round(s*32):0}px`,c=`${o?Math.round(l*24):0}px`;if(a)return Ke(n?{"--gh-bg":o?"rgba(32, 33, 35, 0.180)":"#202123","--gh-bg-secondary":o?"rgba(23, 23, 23, 0.140)":"#171717","--gh-text":"#ececf1","--gh-text-secondary":"rgba(236, 236, 241, 0.72)","--gh-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-hover":o?"rgba(255, 255, 255, 0.080)":"#2a2b2d","--gh-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.180)":"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-input-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-active-bg":o?"rgba(255, 255, 255, 0.100)":"#343541","--gh-right-overlay":o?"linear-gradient(180deg, rgba(32, 33, 35, 0.700) 0%, rgba(23, 23, 23, 0.600) 100%)":"linear-gradient(180deg, #202123 0%, #171717 100%)","--gh-panel-card-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-panel-card-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-sidebar-button-bg":o?"rgba(255, 255, 255, 0.060)":"#2a2b2d","--gh-msg-user-bg":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.220) 0%, rgba(52, 53, 65, 0.120) 100%)":"rgba(52, 53, 65, 0.940)","--gh-msg-assistant-bg":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.160) 0%, rgba(23, 23, 23, 0.090) 100%)":"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-msg-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.120)":"none","--gh-msg-blur":p,"--gh-panel-blur":h,"--gh-composer-blur":c,"--gh-composer-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.120)":"none","--gh-page-sidebar-bg-light":"color-mix(in srgb, #ffffff, transparent 84%)","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":"color-mix(in srgb, #ffffff, transparent 78%)","--gh-page-sidebar-bg-dark":o?"linear-gradient(180deg, rgba(32, 33, 35, 0.120) 0%, rgba(23, 23, 23, 0.070) 100%)":"transparent","--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":o?"linear-gradient(135deg, rgba(32, 33, 35, 0.800) 0%, rgba(23, 23, 23, 0.720) 100%)":"transparent","--gh-page-accent-soft":"rgba(59, 130, 246, 0.100)","--gh-page-accent-soft-dark":o?"rgba(255, 255, 255, 0.100)":"rgba(255, 255, 255, 0.080)","--gh-page-accent-strong":"#2563eb","--gh-page-link":"#2563eb","--gh-page-selection":"rgba(59, 130, 246, 0.180)"}:{"--gh-bg":"#f9f9f9","--gh-bg-secondary":"#f3f3f3","--gh-text":"#0d0d0d","--gh-text-secondary":"rgba(13, 13, 13, 0.64)","--gh-border":"rgba(0, 0, 0, 0.10)","--gh-hover":"#ececec","--gh-shadow":o?"0 8px 20px rgba(0, 0, 0, 0.080)":"0 0 0 0 rgba(0,0,0,0)","--gh-input-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.860) 0%, rgba(248, 250, 252, 0.760) 100%)":"#ffffff","--gh-input-border":o?"rgba(226, 232, 240, 0.860)":"rgba(0, 0, 0, 0.10)","--gh-active-bg":"#ececec","--gh-right-overlay":o?"linear-gradient(180deg, rgba(255, 255, 255, 0.560) 0%, rgba(248, 250, 252, 0.420) 100%)":"#f9f9f9","--gh-panel-card-bg":o?"rgba(255, 255, 255, 0.540)":"#ffffff","--gh-panel-card-border":o?"rgba(255, 255, 255, 0.460)":"rgba(0, 0, 0, 0.10)","--gh-sidebar-button-bg":o?"rgba(255, 255, 255, 0.420)":"#ececec","--gh-msg-user-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.340) 0%, rgba(248, 250, 252, 0.240) 100%)":"rgba(255, 255, 255, 0.920)","--gh-msg-assistant-bg":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.280) 0%, rgba(248, 250, 252, 0.180) 100%)":"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.420)":"rgba(209, 213, 219, 0.580)","--gh-msg-shadow":o?"0 14px 32px rgba(15, 23, 42, 0.100)":"none","--gh-msg-blur":p,"--gh-panel-blur":h,"--gh-composer-blur":c,"--gh-composer-shadow":o?"0 10px 24px rgba(15, 23, 42, 0.100)":"none","--gh-page-sidebar-bg-light":o?"linear-gradient(180deg, rgba(255, 255, 255, 0.360) 0%, rgba(248, 250, 252, 0.220) 100%)":"#f9f9f9","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":o?"linear-gradient(135deg, rgba(255, 255, 255, 0.900) 0%, rgba(248, 250, 252, 0.800) 100%)":"transparent","--gh-page-sidebar-bg-dark":"linear-gradient(180deg, rgba(2, 6, 23, 0.260) 0%, rgba(2, 6, 23, 0.160) 100%)","--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":"linear-gradient(135deg, rgba(8, 17, 29, 0.240) 0%, rgba(8, 17, 29, 0.160) 100%)","--gh-page-accent-soft":"rgba(59, 130, 246, 0.120)","--gh-page-accent-soft-dark":"rgba(59, 130, 246, 0.260)","--gh-page-accent-strong":"#2563eb","--gh-page-link":"#2563eb","--gh-page-selection":"rgba(59, 130, 246, 0.180)"},t,e);if(n){const A=o?B("#202123",t.primary,.04+i*.04):B("#202123",t.primary,.06+i*.04),L=o?B("#171717",t.secondary,.03+i*.04):B("#171717",t.secondary,.04+i*.03),F=o?B("#202123",t.primary,.04+i*.05):B("#202123",t.primary,.06+i*.04),R=o?B("#171717",t.secondary,.03+i*.05):B("#171717",t.secondary,.04+i*.03),H=o?B("#2a2b2d",t.primary,.04+i*.05):B("#2a2b2d",t.primary,.05+i*.04),z=o?B("#202123",t.secondary,.03+i*.04):B("#202123",t.secondary,.04+i*.03),G=o?B("#202123",t.light,.04+s*.05):B("#202123",t.light,.03+s*.03),V=o?B("#202123",t.primary,.06+s*.06):B("#202123",t.primary,.08+s*.04),m=o?B("#252628",t.secondary,.05+s*.05):B("#252628",t.secondary,.07+s*.04),Q=B("#343541",t.primary,.12+i*.06),W=o?B("#000000",t.primary,.04):"#000000",b=o?B("#2a2b2d",t.light,.04+l*.05):B("#2a2b2d",t.light,.03+l*.03),ne=o?B("#202123",t.primary,.06+l*.06):B("#202123",t.primary,.08+l*.04);return Ke({"--gh-bg":_(H,o?.28+i*.14:.98),"--gh-bg-secondary":_(z,o?.22+i*.12:.96),"--gh-text":"#ececf1","--gh-text-secondary":"rgba(236, 236, 241, 0.72)","--gh-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-hover":o?"rgba(255, 255, 255, 0.080)":"#2a2b2d","--gh-shadow":o?`0 8px 20px ${_(W,.14+i*.04)}`:"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":ie("135deg",[`${_(b,o?.46+l*.16:.94)} 0%`,`${_(ne,o?.36+l*.14:.96)} 100%`]),"--gh-input-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-active-bg":_(Q,o?.18+i*.06:.9),"--gh-right-overlay":ie("180deg",[`${_(F,o?.48+i*.12:.99)} 0%`,`${_(R,o?.36+i*.1:.97)} 100%`]),"--gh-panel-card-bg":ie("135deg",[`${_(H,o?.42+i*.14:.98)} 0%`,`${_(z,o?.32+i*.12:.96)} 100%`]),"--gh-panel-card-border":o?"rgba(255, 255, 255, 0.150)":"rgba(255, 255, 255, 0.120)","--gh-sidebar-button-bg":_(Q,o?.3+i*.12:.82),"--gh-msg-user-bg":ie("135deg",[`${_(G,o?.18+s*.12:.98)} 0%`,`${_(m,o?.09+s*.08:.94)} 100%`]),"--gh-msg-assistant-bg":o?ie("135deg",[`${_(G,.16+s*.12)} 0%`,`${_(V,.08+s*.08)} 100%`]):"transparent","--gh-msg-border":o?"rgba(255, 255, 255, 0.140)":"rgba(255, 255, 255, 0.110)","--gh-msg-shadow":o?`0 8px 20px ${_(W,.1+s*.05)}`:"none","--gh-msg-blur":p,"--gh-panel-blur":h,"--gh-composer-blur":c,"--gh-composer-shadow":o?`0 8px 20px ${_(W,.1+l*.04)}`:"none","--gh-page-sidebar-bg-light":ie("180deg",[`${_(B("#ffffff",t.light,.7),.18)} 0%`,`${_(B("#ffffff",t.primary,.16),.08)} 100%`]),"--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":ie("135deg",[`${_(B("#ffffff",t.light,.62),.22)} 0%`,`${_(B("#ffffff",t.primary,.18),.12)} 100%`]),"--gh-page-sidebar-bg-dark":ie("180deg",[`${_(A,o?.12+i*.08:.99)} 0%`,`${_(L,o?.07+i*.06:.97)} 100%`]),"--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":ie("135deg",[`${_(b,o?.76+l*.12:.98)} 0%`,`${_(ne,o?.66+l*.12:.95)} 100%`]),"--gh-page-accent-soft":_(B("#ffffff",t.primary,.34),.22+i*.08),"--gh-page-accent-soft-dark":_(Q,o?.2+i*.08:.9),"--gh-page-accent-strong":t.accent,"--gh-page-link":t.accent,"--gh-page-selection":_(B("#0b1324",t.primary,.72),o?.22:.32)},t,e)}const u=o?B("#ffffff",t.light,.72):B("#ffffff",t.light,.92),g=o?B("#ffffff",t.primary,.16+i*.12):B("#ffffff",t.primary,.24+i*.16),v=o?B("#ffffff",t.light,.78):B("#ffffff",t.light,.9),f=o?B("#ffffff",t.secondary,.18+i*.14):B("#ffffff",t.secondary,.26+i*.16),S=o?B("#ffffff",t.light,.6):B("#ffffff",t.light,.88),k=o?B("#ffffff",t.secondary,.2+i*.1):B("#ffffff",t.primary,.2+i*.14),M=o?B("#ffffff",t.light,.7):B("#ffffff",t.light,.9),x=o?B("#ffffff",t.secondary,.16+s*.14):B("#ffffff",t.secondary,.2+s*.14),P=o?B("#ffffff",t.light,.76):B("#ffffff",t.light,.94),D=o?B("#ffffff",t.primary,.18+s*.16):B("#ffffff",t.primary,.18+s*.14),w=o?B("#ffffff",t.primary,.12):B("#cbd5e1",t.primary,.18),I=o?B("#ffffff",t.primary,.16):B("#cbd5e1",t.primary,.18),q=B("#eff6ff",t.primary,o?.34:.46),y=o?B("#0f172a",t.primary,.16):B("#94a3b8",t.primary,.1),E=o?B("#ffffff",t.light,.64):B("#ffffff",t.light,.9),C=B("#ffffff",t.primary,.18+l*.12);return o?B("#ffffff",t.light,.34):B("#ffffff",t.light,.6),o?B("#ffffff",t.primary,.08+i*.06):B("#ffffff",t.primary,.12+i*.08),Ke({"--gh-bg":_(S,o?.4+i*.16:.97),"--gh-bg-secondary":_(k,o?.3+i*.14:.93),"--gh-text":"rgba(15, 23, 42, 0.92)","--gh-text-secondary":"rgba(51, 65, 85, 0.78)","--gh-border":_(w,o?.2+i*.1:.34+i*.08),"--gh-hover":_(f,o?.1+i*.08:.6+i*.1),"--gh-shadow":o?`0 8px 20px ${_(y,.1+i*.06)}`:"0 0 0 0 rgba(0, 0, 0, 0)","--gh-input-bg":ie("135deg",[`${_(E,o?.72+l*.16:.96)} 0%`,`${_(C,o?.62+l*.14:.9)} 100%`]),"--gh-input-border":_(I,o?.38+l*.12:.38+l*.08),"--gh-active-bg":_(q,o?.18+i*.08:.34+i*.1),"--gh-right-overlay":o?ie("180deg",[`${_(v,.56+i*.16)} 0%`,`${_(f,.42+i*.14)} 100%`]):"#f9f9f9","--gh-panel-card-bg":o?ie("135deg",[`${_(S,.48+i*.16)} 0%`,`${_(k,.36+i*.14)} 100%`]):"#ffffff","--gh-panel-card-border":o?_(w,.32+i*.12):"rgba(0, 0, 0, 0.10)","--gh-sidebar-button-bg":o?_(q,.32+i*.12):"#ececec","--gh-msg-user-bg":ie("135deg",[`${_(M,o?.26+s*.18:.96)} 0%`,`${_(x,o?.1+s*.1:.88)} 100%`]),"--gh-msg-assistant-bg":o?ie("135deg",[`${_(P,.24+s*.16)} 0%`,`${_(D,.12+s*.12)} 100%`]):"transparent","--gh-msg-border":_(I,o?.24+s*.12:.38+s*.1),"--gh-msg-shadow":o?`0 14px 32px ${_(y,.08+s*.08)}`:"none","--gh-msg-blur":p,"--gh-panel-blur":h,"--gh-composer-blur":c,"--gh-composer-shadow":o?`0 10px 24px ${_(y,.08+l*.08)}`:"none","--gh-page-sidebar-bg-light":o?ie("180deg",[`${_(u,.3+i*.14)} 0%`,`${_(g,.18+i*.12)} 100%`]):"#f9f9f9","--gh-page-chat-bg-light":"transparent","--gh-page-composer-bg-light":ie("135deg",[`${_(E,o?.8+l*.14:.97)} 0%`,`${_(C,o?.68+l*.12:.9)} 100%`]),"--gh-page-sidebar-bg-dark":ie("180deg",[`${_(B("#020617",t.primary,.22),.36)} 0%`,`${_(B("#020617",t.secondary,.16),.24)} 100%`]),"--gh-page-chat-bg-dark":"transparent","--gh-page-composer-bg-dark":ie("135deg",[`${_(B("#08111d",t.light,.12),.86)} 0%`,`${_(B("#08111d",t.primary,.18),.76)} 100%`]),"--gh-page-accent-soft":_(q,o?.2+i*.08:.88),"--gh-page-accent-soft-dark":_(B("#0b1324",t.primary,.72),.24+i*.1),"--gh-page-accent-strong":t.accent,"--gh-page-link":t.accent,"--gh-page-selection":_(B("#ffffff",t.primary,.38),o?.28:.34)},t,e)}function Tt(r,e){const t=r&&typeof r=="object"?r:{},n=t.appearanceMode||e||"system",a=["system","light","dark"].includes(n)?n:"system",o=st[t.presetKey]?t.presetKey:ce.presetKey,i=typeof t.backgroundAssetId=="string"&&t.backgroundAssetId.trim()?t.backgroundAssetId.trim():null,s=!!t.backgroundImageEnabled&&!!i,l=typeof t.updatedAt=="string"&&t.updatedAt?t.updatedAt:new Date().toISOString();return{appearanceMode:a,presetKey:o,backgroundImageEnabled:s,backgroundBlurPx:t.backgroundBlurPx==null?ce.backgroundBlurPx:Math.round(Z(t.backgroundBlurPx,0,20)),messageGlassEnabled:!!t.messageGlassEnabled,messageGlassIntensity:t.messageGlassIntensity==null?ce.messageGlassIntensity:Math.round(Z(t.messageGlassIntensity,0,100)),panelGlassIntensity:t.panelGlassIntensity==null?ce.panelGlassIntensity:Math.round(Z(t.panelGlassIntensity,0,100)),sidebarTextEnhanceEnabled:typeof t.sidebarTextEnhanceEnabled=="boolean"?t.sidebarTextEnhanceEnabled:!0,sidebarTextEnhanceIntensity:t.sidebarTextEnhanceIntensity==null?ce.sidebarTextEnhanceIntensity:Math.round(Z(t.sidebarTextEnhanceIntensity,0,100)),backgroundAssetId:i,updatedAt:l}}function Xe(){return it}function At(r){return it=r,it}class Et{constructor(){this.dbPromise=null}openDB(){return this.dbPromise?this.dbPromise:(this.dbPromise=new Promise((e,t)=>{const n=indexedDB.open(Wt,Yt);n.onupgradeneeded=()=>{const a=n.result;a.objectStoreNames.contains(je)||a.createObjectStore(je,{keyPath:"id"})},n.onsuccess=()=>{const a=n.result;a.onversionchange=()=>{a.close(),this.dbPromise=null},a.onclose=()=>{this.dbPromise=null},e(a)},n.onerror=()=>t(n.error||new Error("IndexedDB open failed"))}),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async transaction(e,t){const n=await this.openDB();return new Promise((a,o)=>{const i=n.transaction(je,e);let s;i.oncomplete=()=>a(s),i.onerror=()=>o(i.error||new Error("Theme asset transaction failed")),i.onabort=()=>o(i.error||new Error("Theme asset transaction aborted"));try{const l=t(i.objectStore(je));l.onsuccess=()=>{s=l.result},l.onerror=()=>o(l.error||new Error("Theme asset request failed"))}catch(l){i.abort(),o(l)}})}async getAsset(e){return e&&await this.transaction("readonly",t=>t.get(e))||null}async getAllAssets(){return await this.transaction("readonly",e=>e.getAll())||[]}async putAsset(e,t,n=null){const a=new Date().toISOString(),o={id:n||sr(),mimeType:t||e.type,size:e.size,blob:e,createdAt:a,updatedAt:a};return await this.transaction("readwrite",i=>i.put(o)),o}async deleteAsset(e){e&&await this.transaction("readwrite",t=>t.delete(e))}}class Je{constructor(){this.cleanups=[],this.jobs=new Map,this.disposed=!1}listen(e,t,n,a){return e?.addEventListener(t,n,a),this.cleanups.push(()=>e?.removeEventListener(t,n,a)),n}observe(e,t,n){const a=new MutationObserver(n);return a.observe(e,t),this.cleanups.push(()=>a.disconnect()),a}schedule(e,t,n=100){this.disposed||this.jobs.has(e)||this.jobs.set(e,setTimeout(()=>{this.jobs.delete(e),this.disposed||t()},n))}dispose(){this.disposed=!0,this.jobs.forEach(clearTimeout),this.jobs.clear(),this.cleanups.splice(0).reverse().forEach(e=>e())}}function lr(r){return!!(r.target?.nodeType===1?r.target:r.target?.parentElement)?.closest('[id^="chatgpt-helper"], [data-gh-owned], .chatgpt-helper-dialog-overlay, #outline-content')}class hr{constructor(e){this.scope=new Je,this.destroyed=!1,this.container=e.container,this.settings=e.settings,this.adapter=e.adapter,this.t=e.i18n||(t=>t),this.data=this.loadData(),this.searchQuery="",this.filterPinned=!1,this.filterTagIds=new Set,this.expandedFolderId=null,this.selectedIds=new Set,this.batchMode=!1,this.autoSyncInterval=null,this.syncPromise=null,this.lastSyncTime=0,this._loadedWithUnreadyCache&&this.scope.listen(window,"ch-helper-storage-ready",()=>this.reloadData(),{once:!0}),this.startAutoSync()}loadData(){const e=window.__MY_EXT__;this._loadedWithUnreadyCache=!!(e?.storageCache&&!e.storageCacheInitialized);const t=window.GM_getValue("chatgpt_conversations",null);if(t&&typeof t=="object"){const n=structuredClone(t);return this.sanitizeLoadedData(n),n}return{folders:[{id:"inbox",name:"\u6536\u4EF6\u7BB1",icon:"",isDefault:!0}],tags:[],conversations:{},lastUsedFolderId:"inbox"}}reloadData(){this.destroyed||(this.data=this.loadData(),this.container?.children.length&&this.createUI())}destroy(){this.destroyed||(this.destroyed=!0,this.syncController?.abort(),this.stopAutoSync(),this.scope.dispose())}saveData(){if(!this.destroyed){if(this._loadedWithUnreadyCache){console.warn("[ChatGPT Helper] \u5B58\u50A8\u7F13\u5B58\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7\u672C\u6B21\u4F1A\u8BDD\u6570\u636E\u5199\u5165");return}window.GM_setValue("chatgpt_conversations",this.data)}}sanitizeLoadedData(e){try{Array.isArray(e.folders)||(e.folders=[]),Array.isArray(e.tags)||(e.tags=[]),(!e.conversations||typeof e.conversations!="object"||Array.isArray(e.conversations))&&(e.conversations={}),Object.entries(e.conversations).forEach(([t,n])=>{if(!n||typeof n!="object"){delete e.conversations[t];return}const a=ct(n.url);a?n.url=a:delete n.url})}catch(t){console.error("[ChatGPT Helper] \u4F1A\u8BDD\u6570\u636E\u51C0\u5316\u5931\u8D25:",t)}}ensureInboxFolder(){Array.isArray(this.data.folders)||(this.data.folders=[]),this.data.folders.some(e=>e&&e.id==="inbox")||this.data.folders.unshift({id:"inbox",name:"\u6536\u4EF6\u7BB1",icon:"",isDefault:!0})}getFolderDisplayName(e){return e?e.id==="inbox"?this.t("inbox"):(e.name||"").replace(e.icon||"","").trim()||e.name||"":""}getFolderOptionLabel(e){return e?.id==="inbox"?this.getFolderDisplayName(e):`${e?.icon||""} ${this.getFolderDisplayName(e)}`.trim()}getTargetFolderId(){this.ensureInboxFolder();const e=new Set(this.data.folders.map(t=>t&&t.id).filter(Boolean));return this.data.lastUsedFolderId&&e.has(this.data.lastUsedFolderId)?this.data.lastUsedFolderId:(this.data.lastUsedFolderId="inbox","inbox")}normalizeConversationFolders(){this.ensureInboxFolder();const e=new Set(this.data.folders.map(t=>t&&t.id).filter(Boolean));Object.values(this.data.conversations||{}).forEach(t=>{!t||e.has(t.folderId)||(t.folderId="inbox")})}startAutoSync(){this.autoSyncInterval&&clearInterval(this.autoSyncInterval),this.autoSyncInterval=setInterval(()=>{this.syncConversations()},5*60*1e3)}stopAutoSync(){this.autoSyncInterval&&(clearInterval(this.autoSyncInterval),this.autoSyncInterval=null)}createUI(){if(this.destroyed)return;window.__MY_EXT__?.storageCacheInitialized&&(this.data=this.loadData()),he(this.container),Date.now()-this.lastSyncTime>6e4&&this.scope.schedule("initial-sync",()=>this.syncConversations(),500);const e=d("div",{className:"chatgpt-helper-conversations-toolbar",style:{padding:"10px 12px",borderBottom:"1px solid var(--gh-border)",display:"flex",gap:"6px",alignItems:"center",flexShrink:0}}),t=d("select",{className:"chatgpt-helper-folder-select"});this.data.folders.forEach(p=>{const c=d("option",{value:p.id},this.getFolderOptionLabel(p));p.id===this.data.lastUsedFolderId&&(c.selected=!0),t.appendChild(c)}),t.addEventListener("change",()=>{this.data.lastUsedFolderId=t.value,this.saveData(),this.renderConversationList()}),e.appendChild(t);const n=d("button",{className:"chatgpt-helper-conversations-toolbar-btn sync",type:"button",title:this.t("syncConversations")||"\u540C\u6B65\u4F1A\u8BDD","aria-label":this.t("syncConversations")||"\u540C\u6B65\u4F1A\u8BDD"});n.appendChild(j("refresh",{size:18,strokeWidth:"1.7"})),n.addEventListener("click",()=>this.syncConversations({showAlreadySyncing:!0})),e.appendChild(n);const a=d("button",{className:"chatgpt-helper-conversations-toolbar-btn add-folder",type:"button",title:this.t("newFolder")||"\u65B0\u5EFA\u6587\u4EF6\u5939","aria-label":this.t("newFolder")||"\u65B0\u5EFA\u6587\u4EF6\u5939"});a.appendChild(j("folderPlus",{size:18,strokeWidth:"1.7"})),a.addEventListener("click",()=>this.showCreateFolderDialog()),e.appendChild(a);const o=d("button",{className:"chatgpt-helper-conversations-toolbar-btn batch-mode"+(this.batchMode?" active":""),type:"button",title:this.t("batchMode")||"\u6279\u91CF\u64CD\u4F5C","aria-label":this.t("batchMode")||"\u6279\u91CF\u64CD\u4F5C","aria-pressed":String(this.batchMode)});if(o.appendChild(j("checkSquare",{size:18,strokeWidth:"1.7"})),o.addEventListener("click",()=>{this.batchMode=!this.batchMode,this.batchMode||this.selectedIds.clear(),this.createUI()}),e.appendChild(o),this.batchMode){this.batchToolbar=d("div",{className:"chatgpt-helper-batch-toolbar"}),this.batchToolbar.appendChild(d("span",{style:{color:"var(--gh-text)",fontWeight:"500"}},`${this.t("selected")||"\u5DF2\u9009\u62E9"} ${this.selectedIds.size} ${this.t("items")||"\u9879"}`));const p=d("button",{className:"chatgpt-helper-batch-toolbar-btn"},`\u{1F4C1} ${this.t("move")||"\u79FB\u52A8"}`);p.addEventListener("click",()=>this.batchMove()),this.batchToolbar.appendChild(p);const c=d("button",{className:"chatgpt-helper-batch-toolbar-btn danger"},"\u{1F5D1} "+(this.t("delete")||"\u5220\u9664"));c.addEventListener("click",()=>this.batchDelete()),this.batchToolbar.appendChild(c),this.container.appendChild(this.batchToolbar)}this.container.appendChild(e);const i=d("div",{className:"chatgpt-helper-conversations-search"}),s=d("input",{className:"chatgpt-helper-conversations-search-input",type:"text",placeholder:this.t("searchConversations")||"\u641C\u7D22\u4F1A\u8BDD...",value:this.searchQuery});let l=null;s.addEventListener("input",()=>{this.searchQuery=s.value.trim(),l&&clearTimeout(l),l=setTimeout(()=>this.renderConversationList(),150)}),i.appendChild(s),this.container.appendChild(i);const h=d("div",{className:"chatgpt-helper-conversations-root",style:{flex:1,overflowY:"auto",padding:"8px"}});this.container.appendChild(h),this.listContainer=h,this.renderConversationList()}renderConversationList(){if(!this.listContainer)return;he(this.listContainer);const e=this.data.folders||[],t=[];if(e.forEach((n,a)=>{let o=Object.values(this.data.conversations||{}).filter(i=>i.folderId===n.id);if(this.searchQuery){const i=this.searchQuery.toLowerCase();o=o.filter(s=>s.title&&s.title.toLowerCase().includes(i))}this.filterPinned&&(o=o.filter(i=>i.pinned)),!(this.searchQuery&&o.length===0)&&t.push({folder:n,index:a,conversations:o})}),t.length===0){this.listContainer.appendChild(d("div",{className:"chatgpt-helper-conversations-empty"},this.searchQuery?this.t("noSearchResults"):this.t("noConversations")));return}t.forEach((n,a)=>{const{folder:o,index:i,conversations:s}=n,l=this.createFolderItem(o,i,s.length);this.listContainer.appendChild(l);const h=this.expandedFolderId===o.id,p=d("div",{className:"chatgpt-helper-conversations-list","data-folder-id":o.id,style:h?"display: block;":"display: none;"});l.addEventListener("click",c=>{if(c.target.closest("button"))return;this.listContainer.querySelectorAll(".chatgpt-helper-folder-item.expanded").forEach(v=>{if(v!==l){v.classList.remove("expanded");const f=this.listContainer.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${CSS.escape(v.dataset.folderId||"")}"]`);f&&(f.style.display="none");const S=v.querySelector(".chatgpt-helper-folder-arrow");S&&(S.style.transform="rotate(0deg)")}});const u=l.classList.toggle("expanded");this.expandedFolderId=u?o.id:null;const g=l.querySelector(".chatgpt-helper-folder-arrow");g&&(g.style.transform=u?"rotate(90deg)":"rotate(0deg)"),u?(this.renderConversationsInFolder(o.id,p),p.style.display="block"):p.style.display="none"}),h&&(l.classList.add("expanded"),this.renderConversationsInFolder(o.id,p)),this.listContainer.appendChild(p),o.id==="inbox"&&t.slice(a+1).some(u=>u.folder&&u.folder.id!=="inbox")&&this.listContainer.appendChild(d("div",{className:"chatgpt-helper-folder-divider"}))})}createFolderItem(e,t,n){const a=d("div",{className:"chatgpt-helper-folder-item"+(e.isDefault?" default":""),"data-folder-id":e.id}),o=d("div",{className:"chatgpt-helper-folder-info"}),i=d("span",{className:"chatgpt-helper-folder-icon","aria-hidden":"true"});e.id==="inbox"?i.appendChild(j("inbox",{size:19,strokeWidth:"1.7"})):i.textContent=e.icon||"\u{1F4C1}",o.appendChild(i);const s=d("span",{className:"chatgpt-helper-folder-name"},this.getFolderDisplayName(e));o.appendChild(s);const l=d("span",{className:"chatgpt-helper-folder-count"},`(${n})`);o.appendChild(l),a.appendChild(o);const h=d("div",{className:"chatgpt-helper-folder-actions"});if(!e.isDefault&&e.id!=="inbox"){const c=d("button",{className:"chatgpt-helper-folder-delete-btn",title:this.t("deleteFolder")||"\u5220\u9664\u6587\u4EF6\u5939"},"\u{1F5D1}");c.addEventListener("click",u=>{u.stopPropagation(),this.deleteFolder(e.id)}),h.appendChild(c)}const p=d("span",{className:"chatgpt-helper-folder-arrow",style:{transform:this.expandedFolderId===e.id?"rotate(90deg)":"rotate(0deg)"}},"\u25B8");return h.appendChild(p),a.appendChild(h),a}renderConversationsInFolder(e,t){he(t);let n=Object.values(this.data.conversations).filter(a=>a.folderId===e);if(this.searchQuery){const a=this.searchQuery.toLowerCase();n=n.filter(o=>o.title&&o.title.toLowerCase().includes(a))}if(this.filterPinned&&(n=n.filter(a=>a.pinned)),n.length===0){t.appendChild(d("div",{className:"chatgpt-helper-conversations-empty"},this.t("noConversations")));return}n.sort((a,o)=>a.pinned!==o.pinned?o.pinned?1:-1:(o.updatedAt||0)-(a.updatedAt||0)),n.forEach(a=>{const o=d("div",{className:"chatgpt-helper-conversation-item"+(a.pinned?" pinned":""),"data-conv-id":a.id});if(this.batchMode){const l=d("input",{type:"checkbox",checked:this.selectedIds.has(a.id),style:{position:"absolute",left:"8px",top:"50%",transform:"translateY(-50%)",cursor:"pointer",width:"18px",height:"18px"}});l.addEventListener("click",h=>{h.stopPropagation(),l.checked?this.selectedIds.add(a.id):this.selectedIds.delete(a.id),this.updateBatchToolbar()}),o.appendChild(l)}if(a.pinned){const l=d("span",{className:"chatgpt-helper-conversation-pin",style:{position:"absolute",top:"8px",right:"8px"}});l.appendChild(j("pin",{size:13})),o.appendChild(l)}const i=d("div",{style:{fontWeight:"500",color:"var(--gh-text)",marginBottom:"4px",fontSize:"14px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:a.pinned?"20px":"0",paddingLeft:this.batchMode?"30px":"0"}},a.title||this.t("untitledConversation"));if(o.appendChild(i),a.tagIds&&a.tagIds.length>0&&this.data.tags){const l=d("div",{className:"chatgpt-helper-conversation-tags"});a.tagIds.forEach(h=>{const p=this.data.tags.find(c=>c.id===h);if(p){const c=d("span",{className:"chatgpt-helper-conversation-tag"},p.name);c.style.setProperty("--gh-tag-color",p.color||"var(--gh-primary)"),l.appendChild(c)}}),o.appendChild(l)}const s=d("div",{style:{fontSize:"12px",color:"var(--gh-text-secondary)",marginTop:"4px"}},this.formatTime(a.updatedAt));o.appendChild(s),o.addEventListener("contextmenu",l=>{l.preventDefault(),this.showContextMenu(l,a)}),o.addEventListener("click",l=>{if(this.batchMode&&l.target.type!=="checkbox"){const h=o.querySelector('input[type="checkbox"]');h&&(h.checked=!h.checked,h.checked?this.selectedIds.add(a.id):this.selectedIds.delete(a.id),this.updateBatchToolbar())}else if(!this.batchMode&&a.url){const h=ct(a.url);h&&(window.location.href=h)}}),t.appendChild(o)})}async syncConversations(e={}){if(this.destroyed)return{total:0,newCount:0,updatedCount:0};if(this.syncPromise)return e.showAlreadySyncing&&this.showToast(this.t("conversationSyncing")||"\u6B63\u5728\u540C\u6B65\u4F1A\u8BDD..."),this.syncPromise;const t=this.syncController=new AbortController;return this.syncPromise=(async()=>{try{const n=await Promise.resolve(this.adapter.getConversationList({signal:t.signal}));if(t.signal.throwIfAborted(),this.lastSyncTime=Date.now(),!Array.isArray(n)||n.length===0)return this.showToast(this.t("conversationSyncNoResults")||"\u672A\u52A0\u8F7D\u5230\u5386\u53F2\u4F1A\u8BDD\uFF0C\u8BF7\u786E\u8BA4\u5DF2\u767B\u5F55 ChatGPT \u540E\u91CD\u8BD5"),{total:0,newCount:0,updatedCount:0};this.data.conversations||(this.data.conversations={}),this.normalizeConversationFolders();let a=0,o=0;const i=this.getTargetFolderId();if(n.forEach(l=>{if(!l||!l.id)return;const h=l.id,p=l.title||this.t("untitledConversation"),c=ct(l.url)||void 0,u=l.createdAt||null,g=l.updatedAt||u,v=this.data.conversations[h],f=g||v?.updatedAt||v?.createdAt||Date.now(),S=u||v?.createdAt||f;if(!v){this.data.conversations[h]={id:h,title:p,url:c,folderId:i,pinned:!!l.isPinned,createdAt:S,updatedAt:f},a++;return}v.title!==p&&(v.title=p,o++),c&&v.url!==c&&(v.url=c,o++),v.folderId||(v.folderId=i),v.pinned===void 0&&(v.pinned=!!l.isPinned),S&&(!v.createdAt||S<v.createdAt)&&(v.createdAt=S,o++);const k=v.updatedAt||0;f>k&&(v.updatedAt=f,o++)}),this.saveData(),this.renderConversationList(),(a>0||o>0)&&this.expandedFolderId){const l=this.listContainer?.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${CSS.escape(this.expandedFolderId||"")}"]`);l&&this.renderConversationsInFolder(this.expandedFolderId,l)}const s=a>0?`${this.t("synced")||"\u5DF2\u540C\u6B65"} ${a} ${this.t("newSessions")||"\u4E2A\u65B0\u4F1A\u8BDD"}`:o>0?`${this.t("synced")||"\u5DF2\u540C\u6B65"} ${o} ${this.t("updatedSessions")||"\u4E2A\u4F1A\u8BDD"}`:this.t("synced")||"\u540C\u6B65\u5B8C\u6210";return this.showToast(s),{total:n.length,newCount:a,updatedCount:o}}catch(n){return t.signal.aborted?{total:0,newCount:0,updatedCount:0}:(console.error("[ChatGPT Helper] \u540C\u6B65\u4F1A\u8BDD\u5931\u8D25:",n),this.lastSyncTime=Date.now(),this.showToast(this.t("conversationSyncFailed")||"\u4F1A\u8BDD\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"),{total:0,newCount:0,updatedCount:0,error:n})}finally{this.syncPromise=null}})(),this.syncPromise}showCreateFolderDialog(){const e=prompt(this.t("promptFolderName"));if(!e||!e.trim())return;const t={id:"folder_"+Date.now(),name:`\u{1F4C1} ${e.trim()}`,icon:"\u{1F4C1}",isDefault:!1};this.data.folders.push(t),this.saveData(),this.createUI()}deleteFolder(e){if(!e||e==="inbox")return;const t=(this.data.folders||[]).find(s=>s.id===e);if(!t||t.isDefault)return;const n=(t.name||"").trim()||e,o=(this.t("deleteFolderConfirm")||`\u786E\u5B9A\u8981\u5220\u9664\u6587\u4EF6\u5939 "{name}" \u5417\uFF1F
\u6587\u4EF6\u5939\u5185\u7684\u4F1A\u8BDD\u5C06\u79FB\u52A8\u5230\u6536\u4EF6\u7BB1\u3002`).replace("{name}",n.replace(/"/g,""));if(!confirm(o))return;const i=this.data.conversations||{};Object.values(i).forEach(s=>{s&&s.folderId===e&&(s.folderId="inbox")}),this.data.folders=(this.data.folders||[]).filter(s=>s.id!==e),this.data.lastUsedFolderId===e&&(this.data.lastUsedFolderId="inbox"),this.expandedFolderId===e&&(this.expandedFolderId=null),this.saveData(),this.createUI(),this.showToast(this.t("folderDeleted")||"\u6587\u4EF6\u5939\u5DF2\u5220\u9664")}formatTime(e){if(!e)return"";const t=new Date(e);try{const n=Xe&&Xe()==="zh-CN"?"zh-CN":"en-US";return t.toLocaleString(n,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return t.toLocaleString()}}updateBatchToolbar(){if(this.batchToolbar){const e=this.batchToolbar.querySelector("span");e&&(e.textContent=`${this.t("selected")} ${this.selectedIds.size} ${this.t("items")}`)}}batchMove(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u79FB\u52A8\u7684\u4F1A\u8BDD");return}this.showMoveToFolderDialog(null,!0)}batchDelete(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u5220\u9664\u7684\u4F1A\u8BDD");return}confirm(this.t("confirmDeleteConversations").replace("{count}",this.selectedIds.size))&&(this.selectedIds.forEach(e=>{delete this.data.conversations[e]}),this.selectedIds.clear(),this.saveData(),this.renderConversationList(),this.updateBatchToolbar(),this.showToast(this.t("deleted")))}async batchExport(){if(this.selectedIds.size===0){this.showToast(this.t("selectConversationsFirst")||"\u8BF7\u5148\u9009\u62E9\u8981\u5BFC\u51FA\u7684\u4F1A\u8BDD");return}const e=prompt(this.t("exportFormat"),"1");if(!e)return;const n={1:"markdown",2:"json",3:"txt"}[e]||"markdown";for(const a of this.selectedIds){const o=this.data.conversations[a];o&&o.url&&await this.exportConversation(o,n)}this.showToast(this.t("exportedConversations").replace("{count}",this.selectedIds.size))}async exportConversation(e,t="markdown"){const n=(window.location.pathname.match(/\/c\/([^/?]+)/)||[])[1];if(!n||n!==e.id){this.showToast(this.t("openConversationFirst").replace("{title}",e.title||this.t("untitledConversation")));return}const a=this.extractMessages();if(a.length===0){this.showToast(this.t("noContent")||"\u672A\u627E\u5230\u5BF9\u8BDD\u5185\u5BB9");return}const o=String(e.title||this.t("untitledConversation")).replace(/[\\/:*?"<>|\r\n]+/g,"_").replace(/\s+/g," ").trim().slice(0,80)||"conversation";let i="";const s=`${o}_${Date.now()}`;switch(t){case"markdown":i=this.formatToMarkdown(e,a),this.downloadFile(i,`${s}.md`,"text/markdown");break;case"json":i=this.formatToJSON(e,a),this.downloadFile(i,`${s}.json`,"application/json");break;case"txt":i=this.formatToTXT(e,a),this.downloadFile(i,`${s}.txt`,"text/plain");break}}extractMessages(){const e=[];return this.adapter.getChatMessages().forEach((n,a)=>{const o=n.getAttribute("data-message-author-role")||(n.querySelector('[data-message-author-role="user"]')?"user":"assistant"),i=(n.innerText||n.textContent||"").trim();i&&e.push({role:o,content:i})}),e}formatToMarkdown(e,t){const n=[],a=new Date().toLocaleString(),o=this.t("userRole");return n.push(`# \u{1F4E4} ${this.t("exportInfoHeading")}`),n.push(`- **${this.t("conversationTitleLabel")}**: ${e.title||this.t("untitledConversation")}`),n.push(`- **${this.t("exportTimeLabel")}**: ${a}`),n.push(`- **${this.t("sourceLabel")}**: ChatGPT`),n.push(`- **${this.t("linkLabel")}**: ${window.location.href}`),n.push("---"),n.push(""),t.forEach(i=>{i.role==="user"?(n.push(`## \u{1F64B} ${o}`),n.push(""),n.push(i.content),n.push(""),n.push("---"),n.push("")):(n.push("## \u{1F916} ChatGPT"),n.push(""),n.push(i.content),n.push(""),n.push("---"),n.push(""))}),n.join(`
`)}formatToJSON(e,t){const n={metadata:{title:e.title||this.t("untitledConversation"),id:e.id,url:window.location.href,exportTime:new Date().toISOString(),source:"ChatGPT"},messages:t.map(a=>({role:a.role,content:a.content}))};return JSON.stringify(n,null,2)}formatToTXT(e,t){const n=[],a=new Date().toLocaleString(),o=this.t("userRole");return n.push(`${this.t("conversationTitleLabel")}: ${e.title||this.t("untitledConversation")}`),n.push(`${this.t("exportTimeLabel")}: ${a}`),n.push(`${this.t("sourceLabel")}: ChatGPT`),n.push(`${this.t("linkLabel")}: ${window.location.href}`),n.push(""),n.push("=".repeat(50)),n.push(""),t.forEach(i=>{i.role==="user"?n.push(`[${o}]`):n.push("[ChatGPT]"),n.push(i.content),n.push(""),n.push("-".repeat(50)),n.push("")}),n.join(`
`)}downloadFile(e,t,n){const a=new Blob([e],{type:n}),o=URL.createObjectURL(a),i=document.createElement("a");i.href=o,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}showMoveToFolderDialog(e,t=!1){const n=d("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),a=d("div",{className:"chatgpt-helper-prompt-dialog chatgpt-helper-compact-dialog",role:"dialog","aria-modal":"true","aria-label":this.t("moveToFolder")});a.appendChild(d("div",{className:"chatgpt-helper-prompt-dialog-title"},this.t("moveToFolder")));const o=d("select",{className:"chatgpt-helper-prompt-dialog-field"});this.data.folders.forEach(h=>{const p=d("option",{value:h.id},this.getFolderOptionLabel(h));o.appendChild(p)}),a.appendChild(o);const i=d("div",{className:"chatgpt-helper-prompt-dialog-actions"}),s=d("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));s.addEventListener("click",()=>n.remove());const l=d("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("confirm"));l.addEventListener("click",()=>{if(!n.isConnected)return;const h=o.value;t?(this.selectedIds.forEach(p=>{this.data.conversations[p]&&(this.data.conversations[p].folderId=h)}),this.saveData(),this.renderConversationList(),this.updateBatchToolbar(),this.showToast(`${this.t("moved")} ${this.selectedIds.size} ${this.t("updatedSessions")}`)):e&&(e.folderId=h,this.saveData(),this.renderConversationList(),this.showToast(this.t("moved"))),n.remove()}),i.appendChild(s),i.appendChild(l),a.appendChild(i),n.appendChild(a),document.body.appendChild(n),n.addEventListener("click",h=>{h.target===n&&n.remove()})}showContextMenu(e,t){const n=document.querySelector(".chatgpt-helper-context-menu");n&&n.remove();const a=d("div",{className:"chatgpt-helper-context-menu",style:{position:"fixed",top:e.clientY+"px",left:e.clientX+"px"}});[{label:t.pinned?this.t("unpinned"):this.t("pinned"),iconName:"pin",action:()=>this.togglePin(t)},{label:this.t("move"),iconName:"folder",action:()=>this.showMoveToFolderDialog(t)},{label:this.t("addTag"),iconName:"tag",action:()=>this.showTagDialog(t)},{label:this.t("delete"),iconName:"trash",danger:!0,action:()=>this.deleteConversation(t)}].forEach(s=>{const l=d("div",{className:`chatgpt-helper-context-menu-item${s.danger?" danger":""}`,role:"menuitem"});l.appendChild(j(s.iconName,{size:14})),l.appendChild(d("span",{},s.label)),l.addEventListener("click",()=>{s.action(),a.remove()}),a.appendChild(l)}),document.body.appendChild(a);const i=()=>{a.remove(),document.removeEventListener("click",i)};setTimeout(()=>document.addEventListener("click",i),100)}togglePin(e){e.pinned=!e.pinned,this.saveData(),this.renderConversationList(),this.showToast(e.pinned?this.t("pinned"):this.t("unpinned"))}deleteConversation(e){const t=e.title||this.t("untitledConversation");confirm(this.t("confirmDeleteConversation").replace("{title}",t.replace(/"/g,"")))&&(delete this.data.conversations[e.id],this.saveData(),this.renderConversationList(),this.showToast(this.t("deleted")))}showTagDialog(e){const t=prompt(this.t("tagPrompt"));if(t!==null){if(this.data.tags||(this.data.tags=[]),t.trim()){let n=this.data.tags.find(a=>a.name.toLowerCase()===t.toLowerCase());if(!n){const a=ke(this.settings?.themeConfig?.presetKey||ce.presetKey);n={id:"tag_"+Date.now(),name:t.trim(),color:a.primary},this.data.tags.push(n)}e.tagIds||(e.tagIds=[]),e.tagIds.includes(n.id)||e.tagIds.push(n.id)}else delete e.tagIds;this.saveData(),this.renderConversationList(),this.showToast(this.t("tagUpdated"))}}showToast(e){const t=document.getElementById("chatgpt-helper-toast");t&&t.remove();const n=d("div",{id:"chatgpt-helper-toast",className:"chatgpt-helper-toast"},e);document.body.appendChild(n),setTimeout(()=>n.remove(),2e3)}}function Mt(r,e){const n=r===document.scrollingElement?0:r.getBoundingClientRect().top+r.clientTop,a=parseFloat(getComputedStyle(r).scrollPaddingTop)||0,o=e?.querySelector('#page-header, [data-testid="conversation-header"], header'),i=o?.getBoundingClientRect(),s=i&&i.top<=n+1&&i.bottom>n&&["sticky","fixed"].includes(getComputedStyle(o).position)?i.bottom-n+8:0;return n+Math.max(a||12,s)}class cr{constructor(e){this.adapter=e,this.lockManager=null,this.cancelPending=null}get container(){return this.adapter.getScrollContainer?.()||this.adapter.getResponseContainer()||document.scrollingElement}get scrollTop(){return this.container?.scrollTop??window.scrollY}set scrollTop(e){this.scrollTo({top:e,behavior:"instant"})}get scrollHeight(){return this.container?.scrollHeight??document.documentElement.scrollHeight}get clientHeight(){return this.container?.clientHeight??window.innerHeight}cancel(){this.cancelPending?.()}scrollTo(e={}){this.cancel();const t=this.container;if(!t)return;const n=x=>Math.max(0,Math.min(x,Math.max(0,t.scrollHeight-t.clientHeight))),o=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches?"instant":e.behavior||"smooth",i=this.lockManager;let s=!1,l,h;const p=(x=!1,P=null,D=!1)=>{if(!s){s=!0,clearTimeout(l),clearTimeout(h),g.removeEventListener("scrollend",c);for(const w of["wheel","touchstart","pointerdown","keydown"])window.removeEventListener(w,u,!0);i&&(i.navigationActive=!1,i.markUserInteraction()),this.cancelPending=null,e.onComplete?.({cancelled:x,top:t.scrollTop,element:P,timedOut:D})}},c=()=>p(!1),u=x=>{x?.isTrusted!==!1&&(x?.type==="keydown"&&!["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(x.key)||(t.scrollTo({top:t.scrollTop,behavior:"instant"}),p(!0)))},g=t===document.scrollingElement?document:t;this.cancelPending=()=>u(),i&&(i.navigationActive=!0,i.markUserInteraction());for(const x of["wheel","touchstart","pointerdown","keydown"])window.addEventListener(x,u,{capture:!0,passive:!0});if(!e.resolveTarget){l=setTimeout(c,1200),g.addEventListener("scrollend",c,{once:!0}),t.scrollTo({top:n(Number(typeof e=="number"?e:e.top)||0),behavior:o});return}let v=null,f=0,S=null,k=null;const M=()=>{if(t!==this.container)return p(!0);const x=e.resolveTarget(t);if(!x)return p(!0);const{element:P,estimate:D}=x,w=Mt(t,this.adapter.getChatContainer()),I=n(P?t.scrollTop+P.getBoundingClientRect().top-w:D);if(P&&Math.abs(t.scrollTop-I)<=2){if((!f||P!==S)&&(f=performance.now()),performance.now()-f>=240)return p(!1,P)}else{f=0;const q=P&&k!==null&&Math.abs(k-t.scrollTop)<1;(v==null||Math.abs(v-I)>1||P!==S||q)&&(t.scrollTo({top:I,behavior:P&&v==null?o:"instant"}),v=I)}S=P,k=t.scrollTop,h=setTimeout(M,80)};l=setTimeout(()=>p(!0,null,!0),6e3),M()}isAtBottom(e=100){return this.scrollHeight-this.clientHeight-this.scrollTop<=e}}class pr{constructor(e,t,n){this.scrollManager=e,this.showToast=t||(()=>{}),this.t=n||(a=>a),this.isLoading=!1,this.aborted=!1,this.overlay=null}async loadAllAndScrollTop(){if(this.isLoading){this.showToast(this.t("historyLoading"));return}const e=this.scrollManager.container;if(!e){this.showToast(this.t("scrollContainerMissing"));return}this.isLoading=!0,this.aborted=!1;const t=800,n=3,a=50,o=e.scrollHeight;let i=o,s=0,l=0;e.scrollTop=0;const h=()=>{if(this.aborted){this.finish(!1);return}if(l++,l>=a){this.finish(!0);return}e.scrollTop=0,e.dispatchEvent(new WheelEvent("wheel",{deltaY:-100,bubbles:!0})),setTimeout(()=>{if(this.aborted){this.finish(!1);return}const p=e.scrollHeight;if(p>i)i=p,s=0,this.updateOverlayText(`${this.t("historyLoading")} (${Math.round(p/1e3)}k)`),h();else{s++;const c=e.scrollTop<10;l===1&&p===o&&c?this.finish(!1,!0):s>=n?this.finish(!0):(this.updateOverlayText(`${this.t("historyLoading")} (${s}/${n})`),h())}},t)};h()}finish(e,t=!1){this.isLoading=!1,this.aborted=!1,this.hideOverlay(),e&&!t&&this.showToast(this.t("historyLoadComplete"))}abort(){this.aborted=!0}showOverlay(){if(this.overlay)return;const e=d("div",{id:"chatgpt-helper-loading-overlay",className:"chatgpt-helper-loading-overlay"}),t=d("div",{className:"chatgpt-helper-loading-spinner"}),n=d("div",{id:"chatgpt-helper-loading-text",className:"chatgpt-helper-loading-text"},this.t("historyLoading")),a=d("div",{className:"chatgpt-helper-loading-hint"},this.t("pleaseWait")),o=d("button",{className:"chatgpt-helper-loading-stop-btn",type:"button"},this.t("stop"));o.addEventListener("click",()=>this.abort()),e.appendChild(t),e.appendChild(n),e.appendChild(a),e.appendChild(o),document.body.appendChild(e),this.overlay=e}hideOverlay(){this.overlay&&(this.overlay.remove(),this.overlay=null)}updateOverlayText(e){if(this.overlay){const t=this.overlay.querySelector("#chatgpt-helper-loading-text");t&&(t.textContent=e)}}}class dr{constructor(e,t){this.scrollManager=e,this.showToast=t||(()=>{}),this.previousAnchor=null,this.currentAnchor=null,this.onAnchorChange=null}bindUI(e){this.onAnchorChange=e}_captureCurrentPosition(){return{top:this.scrollManager.scrollTop,ts:Date.now()}}setAnchor(e){this.previousAnchor={top:e!==void 0?e:this.scrollManager.scrollTop,ts:Date.now()},this.onAnchorChange&&this.onAnchorChange(!0)}backToAnchor(){if(!this.previousAnchor)return!1;const e=this._captureCurrentPosition();return this.previousAnchor.top!==void 0?(this.scrollManager.scrollTo({top:this.previousAnchor.top,behavior:"smooth"}),this.currentAnchor=this.previousAnchor,this.previousAnchor=e,!0):!1}hasAnchor(){return this.previousAnchor!==null}reset(){this.previousAnchor=null,this.currentAnchor=null,this.onAnchorChange&&this.onAnchorChange(!1)}}class gr{constructor(e,t,n,a){this.settings=e,this.scrollManager=t,this.adapter=n,this.showToast=a||(()=>{}),this.lastSaveTime=0,this.isRecording=!1,this.scrollHandler=null,this.restoredTop=null,this.trailingSaveTimer=null}startRecording(){if(this.isRecording||!this.settings.readingHistory?.persistence)return;this.isRecording=!0,this.scrollHandler=()=>this.handleScroll();const e=this.recordingContainer=this.scrollManager.container;e&&e.addEventListener("scroll",this.scrollHandler,{passive:!0}),window.addEventListener("scroll",this.scrollHandler,{capture:!0,passive:!0})}stopRecording(){if(this.isRecording){if(this.isRecording=!1,this.scrollHandler){const e=this.recordingContainer;this.recordingContainer=null,e&&e.removeEventListener("scroll",this.scrollHandler),window.removeEventListener("scroll",this.scrollHandler,{capture:!0}),this.scrollHandler=null}this.trailingSaveTimer&&(clearTimeout(this.trailingSaveTimer),this.trailingSaveTimer=null)}}handleScroll(){if(!this.settings.readingHistory?.persistence)return;const e=Date.now();e-this.lastSaveTime>1e3&&(this.saveProgress(),this.lastSaveTime=e),this.trailingSaveTimer&&clearTimeout(this.trailingSaveTimer),this.trailingSaveTimer=setTimeout(()=>{this.trailingSaveTimer=null,this.saveProgress()},1200)}getKey(){const e=window.location.href,t=e.match(/\/c\/([^\/\?]+)/)||e.match(/\/chat\/([^\/\?]+)/);return t?`chatgpt:${t[1]}`:null}saveProgress(){if(!this.isRecording||this.adapter.isNewConversation&&this.adapter.isNewConversation())return;const e=this.scrollManager.scrollTop;if(e<0)return;const t=this.getKey();if(!t)return;const n={top:e,ts:Date.now()},a=(typeof window.GM_getValue=="function"?window.GM_getValue("chatgpt_reading_progress",{}):{})||{};!a||typeof a!="object"||(a[t]=n,window.GM_setValue("chatgpt_reading_progress",a))}async restoreProgress(){if(this.cancelRestore?.(),!this.settings.readingHistory?.autoRestore)return!1;const e=this.getKey(),t=window.GM_getValue("chatgpt_reading_progress",{})?.[e];return!t||!Number.isFinite(t.top)||t.top<0?!1:new Promise(n=>{let a=0,o,i=!1;const s=p=>{if(!i){i=!0,clearTimeout(o);for(const c of["wheel","touchstart","pointerdown","keydown"])window.removeEventListener(c,l,!0);this.cancelRestore=null,n(p)}},l=p=>{p?.isTrusted!==!1&&s(!1)};this.cancelRestore=()=>s(!1);for(const p of["wheel","touchstart","pointerdown","keydown"])window.addEventListener(p,l,{capture:!0,passive:!0});const h=()=>{if(!i){if(this.getKey()!==e||a++>=30)return s(!1);this.scrollManager.scrollHeight-this.scrollManager.clientHeight>=t.top?(this.scrollManager.scrollTo({top:t.top,behavior:"instant"}),this.restoredTop=t.top,s(!0)):o=setTimeout(h,500)}};h()})}cleanup(){const e=window.GM_getValue("chatgpt_progress_cleanup_last_run",0),t=Date.now();if(t-e<24*60*60*1e3)return;const n=this.settings.readingHistory?.cleanupDays||30;if(n===-1)return;const a=n*24*60*60*1e3,o=window.GM_getValue("chatgpt_reading_progress",{});let i=!1;Object.keys(o).forEach(s=>{t-o[s].ts>a&&(delete o[s],i=!0)}),i&&window.GM_setValue("chatgpt_reading_progress",o),window.GM_setValue("chatgpt_progress_cleanup_last_run",t)}}class Lt{constructor(e){this.siteAdapter=e,this.enabled=!1,this.observer=null,this.autoScrollObserver=null,this.cleanupInterval=null,this.lastScrollTop=this.getCurrentScrollTop(),this.lockedScrollTop=this.lastScrollTop,this.listeningContainer=null,this._cachedScrollContainer=null,this._cachedResponseContainer=null,this._cacheTimestamp=0,this._cacheTimeout=2e3,this._debounceTimer=null,this._throttleTimer=null,this._isUpdatingScroll=!1,this._rafId=null,this._pendingScrollUpdate=!1,this._correctionRaf=null,this._lastUserInteractionAt=0,this._lastProgrammaticFixAt=0,this._userIntentWindowMs=480,this._scrollJumpThreshold=140,this._userInputHandler=null,this._lastTouchY=null}getScrollContainer(){const e=Date.now();if(this._cachedScrollContainer&&this._cachedScrollContainer.isConnected&&e-this._cacheTimestamp<this._cacheTimeout)return this._cachedScrollContainer;const t=this.siteAdapter?.getScrollContainer?.(),n=t&&t.isConnected?t:document.scrollingElement||document.documentElement||document.body;return this._cachedScrollContainer=n,this._cacheTimestamp=e,n}getResponseContainer(){const e=Date.now();if(this._cachedResponseContainer&&this._cachedResponseContainer.isConnected&&e-this._cacheTimestamp<this._cacheTimeout)return this._cachedResponseContainer;const t=this.siteAdapter?.getResponseContainer?.()||this.siteAdapter?.getScrollContainer?.();return t&&t.isConnected&&(this._cachedResponseContainer=t,this._cacheTimestamp=e),t}clearCache(){this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null,this._cachedScrollContainer=null,this._cachedResponseContainer=null,this._cacheTimestamp=0}getCurrentScrollTop(){const e=this.getScrollContainer();return e?e.scrollTop||0:window.scrollY||0}refreshContainerListener(){if(!this.onScrollHandler)return;const e=this.getScrollContainer();if(this.listeningContainer===e)return;if(this.listeningContainer)try{this.listeningContainer.removeEventListener("scroll",this.onScrollHandler)}catch{}if(e)try{e.addEventListener("scroll",this.onScrollHandler,{passive:!0})}catch(n){console.error("[ChatGPT Helper] \u6DFB\u52A0\u6EDA\u52A8\u76D1\u542C\u5668\u9519\u8BEF:",n)}this.listeningContainer=e;const t=this.getCurrentScrollTop();this.lastScrollTop=t,this.lockedScrollTop=t}setEnabled(e){this.enabled!==e&&(this.enabled=e,e?this.enable():this.disable())}enable(){this.clearCache(),this.lastScrollTop=this.getCurrentScrollTop(),this.lockedScrollTop=this.lastScrollTop,this.startObserver(),this.startScrollListener(),this.stopAutoScroll()}disable(){this.clearCache(),this.stopObserver(),this.stopScrollListener(),this.stopAutoScroll(),this._correctionRaf&&(cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null),this._isUpdatingScroll=!1}markUserInteraction(){this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null,this._lastUserInteractionAt=Date.now();const e=this.getCurrentScrollTop();this.lastScrollTop=e,this.lockedScrollTop=e}hasRecentUserInteraction(){return Date.now()-this._lastUserInteractionAt<this._userIntentWindowMs}isProtectingPosition(){return!this.enabled||this.navigationActive||this.hasRecentUserInteraction()?!1:!!this.siteAdapter?.isGenerating?.()}startScrollListener(){const e=()=>{const n=this.getCurrentScrollTop();if(!this.enabled){this.lastScrollTop=n,this.lockedScrollTop=n;return}if(this._isUpdatingScroll||Date.now()-this._lastProgrammaticFixAt<80){this.lastScrollTop=n,this.lockedScrollTop=n;return}if(!this.isProtectingPosition()){this.lastScrollTop=n,this.lockedScrollTop=n;return}if(n>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=n},t=n=>{if(this.enabled&&!(n.type==="keydown"&&!["ArrowUp","ArrowDown","PageUp","PageDown","Home","End","Space"].includes(n.key))){if(n.type==="touchmove"&&n.touches&&n.touches.length){const a=n.touches[0].clientY;if(this._lastTouchY!=null&&Math.abs(a-this._lastTouchY)<3)return;this._lastTouchY=a}this.markUserInteraction()}};this.onScrollHandlerOptions={passive:!0,capture:!0},window.addEventListener("scroll",e,this.onScrollHandlerOptions),this.onScrollHandler=e,this._userInputHandler=t,window.addEventListener("wheel",t,{passive:!0,capture:!0}),window.addEventListener("touchstart",t,{passive:!0,capture:!0}),window.addEventListener("touchmove",t,{passive:!0,capture:!0}),window.addEventListener("pointerdown",t,{passive:!0,capture:!0}),window.addEventListener("mousedown",t,{passive:!0,capture:!0}),window.addEventListener("keydown",t,{capture:!0}),this.refreshContainerListener()}stopScrollListener(){this.onScrollHandler&&(window.removeEventListener("scroll",this.onScrollHandler,this.onScrollHandlerOptions||{capture:!0}),this.listeningContainer&&(this.listeningContainer.removeEventListener("scroll",this.onScrollHandler),this.listeningContainer=null),this.onScrollHandler=null,this.onScrollHandlerOptions=null),this._userInputHandler&&(window.removeEventListener("wheel",this._userInputHandler,{capture:!0}),window.removeEventListener("touchstart",this._userInputHandler,{capture:!0}),window.removeEventListener("touchmove",this._userInputHandler,{capture:!0}),window.removeEventListener("pointerdown",this._userInputHandler,{capture:!0}),window.removeEventListener("mousedown",this._userInputHandler,{capture:!0}),window.removeEventListener("keydown",this._userInputHandler,{capture:!0}),this._userInputHandler=null),this._lastTouchY=null}startObserver(){const e=a=>{if(!this.enabled)return;const o=this.getResponseContainer();if(!o)return;let i=!1;for(let s=0;s<Math.min(a.length,10);s++){const l=a[s];if(l.type==="childList"&&l.addedNodes.length>0){for(let h=0;h<Math.min(l.addedNodes.length,5);h++){const p=l.addedNodes[h];if(p.nodeType===1)try{if(o.contains(p)){i=!0;break}}catch{}}if(i)break}}i&&(this._debounceTimer&&clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._updateScrollPosition()},40))};this.observer=new MutationObserver(e);const n=this.getResponseContainer()||document.body;this.observer.observe(n,{childList:!0,subtree:!0}),this.cleanupInterval=setInterval(()=>{this.enabled&&(this.refreshContainerListener(),this._checkAndFixScroll())},1500)}scheduleScrollCorrection(e){this.enabled&&(this._correctionRaf&&cancelAnimationFrame(this._correctionRaf),this._pendingScrollUpdate=!0,this._correctionRaf=requestAnimationFrame(()=>{this._pendingScrollUpdate=!1,this._correctionRaf=null,this.applyScrollCorrection(e)}))}applyScrollCorrection(e){const t=this.getScrollContainer();if(!(!t||!this.isProtectingPosition())&&!this._isUpdatingScroll)try{this._isUpdatingScroll=!0,typeof t.scrollTo=="function"?t.scrollTo({top:e,behavior:"instant"}):t.scrollTop=e,this._lastProgrammaticFixAt=Date.now(),this.lastScrollTop=e,this.lockedScrollTop=e}catch(n){console.warn("[ChatGPT Helper] \u4FEE\u6B63\u6EDA\u52A8\u4F4D\u7F6E\u5931\u8D25:",n)}finally{setTimeout(()=>{this._isUpdatingScroll=!1},0)}}_updateScrollPosition(){if(this._isUpdatingScroll)return;const e=this.getScrollContainer();if(!e)return;const t=e.scrollTop;if(!this.isProtectingPosition()){this.lastScrollTop=t,this.lockedScrollTop=t;return}if(t>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=t}_checkAndFixScroll(){if(this._isUpdatingScroll)return;const e=this.getScrollContainer();if(!e)return;const t=e.scrollTop;if(!this.isProtectingPosition()){this.lastScrollTop=t,this.lockedScrollTop=t;return}if(t>this.lockedScrollTop+this._scrollJumpThreshold){this.scheduleScrollCorrection(this.lockedScrollTop);return}this.lastScrollTop=t}stopObserver(){this.observer&&(this.observer.disconnect(),this.observer=null),this.cleanupInterval&&(clearInterval(this.cleanupInterval),this.cleanupInterval=null),this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=null),this._debounceTimer&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._throttleTimer&&(clearTimeout(this._throttleTimer),this._throttleTimer=null),this._correctionRaf&&(cancelAnimationFrame(this._correctionRaf),this._correctionRaf=null),this._isUpdatingScroll=!1,this._pendingScrollUpdate=!1}startAutoScroll(){if(this.autoScrollObserver&&this.stopAutoScroll(),this.enabled)return;let e=null,t=0;const n=200;this.autoScrollObserver=new MutationObserver(i=>{if(this.enabled||Date.now()-t<n)return;const l=this.getResponseContainer();if(!l)return;let h=!1;for(let p=0;p<Math.min(i.length,10);p++){const c=i[p];if(c.type==="childList"&&c.addedNodes.length>0){for(let u=0;u<Math.min(c.addedNodes.length,5);u++){const g=c.addedNodes[u];if(g.nodeType===1)try{if(l.contains(g)){h=!0;break}}catch{}}if(h)break}}h&&(e&&clearTimeout(e),e=setTimeout(()=>{if(this.siteAdapter?.isGenerating?.()){const c=this.getScrollContainer();if(!c)return;if(c.scrollHeight-c.scrollTop-c.clientHeight<=100){const g=Math.max(0,c.scrollHeight-c.clientHeight);try{c.scrollTo({top:g,behavior:"smooth"})}catch{c.scrollTop!==void 0&&(c.scrollTop=g)}t=Date.now()}}},100))});const a=this.getResponseContainer(),o=a||document.body;this.autoScrollObserver.observe(o,{childList:!0,subtree:!!a})}stopAutoScroll(){this.autoScrollObserver&&(this.autoScrollObserver.disconnect(),this.autoScrollObserver=null)}}class ur{constructor(e,t){this.siteAdapter=e,this.widthConfig=t,this.styleElement=null}apply(){if(this.styleElement&&(this.styleElement.remove(),this.styleElement=null),this.widthConfig&&this.widthConfig.enabled){const e=this.generateCSS();this.styleElement=document.createElement("style"),this.styleElement.id="chatgpt-helper-width-styles",this.styleElement.textContent=e,document.head.appendChild(this.styleElement)}}generateCSS(){const e=`${this.widthConfig.value}${this.widthConfig.unit}`;return["main",'[role="main"]','div[class*="flex"][class*="flex-col"]'].map(n=>`${n} { max-width: ${e} !important; margin-left: auto !important; margin-right: auto !important; }`).join(`
`)}updateConfig(e){this.widthConfig=e,this.apply()}}class mr{constructor(e){this.config=e,this.container=e.container,this.settings=e.settings,this.siteAdapter=e.siteAdapter,this.onSettingsChange=e.onSettingsChange,this.onJumpBefore=e.onJumpBefore,this.t=e.i18n||(t=>t),this.state={tree:null,treeKey:"",minLevel:1,expandLevel:this.settings.outline?.maxLevel??6,includeUserQueries:this.settings.outline?.showUserQueries??!1,levelCounts:{},isAllExpanded:!1,rawOutline:[],searchQuery:"",searchLevelManual:!1,searchResults:null,preSearchState:null},this.observer=null,this.updateDebounceTimer=null,this.isActive=!1,this.syncScrollHandler=null,this.syncScrollThrottleTimer=null,this.currentHighlightedItem=null,this.init()}init(){this.createUI(),this.updateAutoUpdateState()}setActive(e){!e&&this.navigationTarget&&(this.navigationTarget.settledTop==null&&this.config.cancelNavigation?.(),this.navigationTarget=null),this.isActive=e,this.destroyed=!1,this.updateAutoUpdateState(),this.updateSyncScrollState()}updateAutoUpdateState(){this.settings.outline?.enabled&&this.settings.outline?.autoUpdate&&this.isActive?this.startObserver():this.stopObserver()}updateSyncScrollState(){this.settings.outline?.enabled&&this.settings.outline?.syncScroll&&this.isActive?this.startSyncScroll():this.stopSyncScroll()}startSyncScroll(){const e=this.siteAdapter?.getScrollContainer?.(),t=e===document.scrollingElement?document:e;t===this.syncScrollTarget&&this.syncScrollHandler||(this.stopSyncScroll(),t&&(this.syncScrollTarget=t,this.syncScrollHandler=()=>{this.state.searchQuery||this.syncScrollThrottleTimer||(this.syncScrollThrottleTimer=setTimeout(()=>{this.syncScrollThrottleTimer=null,this.isActive&&this.handleSyncScroll()},100))},t.addEventListener("scroll",this.syncScrollHandler,{passive:!0}),this.handleSyncScroll()))}stopSyncScroll(){this.syncScrollTarget?.removeEventListener("scroll",this.syncScrollHandler),this.syncScrollTarget=null,this.syncScrollHandler=null,clearTimeout(this.syncScrollThrottleTimer),this.syncScrollThrottleTimer=null,this.currentHighlightedItem?.classList.remove("sync-highlight"),this.currentHighlightedItem?.removeAttribute("aria-current"),this.currentHighlightedItem=null}getCurrentItem(){const e=this.siteAdapter?.getScrollContainer?.();if(!e||!this.state.tree?.length)return null;const t=Mt(e,this.siteAdapter.getChatContainer());if(this.navigationTarget){const{id:i,settledTop:s}=this.navigationTarget;if(s==null||Math.abs(e.scrollTop-s)<3){const l=this.findItem(i);if(l)return l}this.navigationTarget=null}let n=null,a=null;const o=i=>i.forEach(s=>{s.element?.isConnected&&(s.element.getBoundingClientRect().top<=t+2?n=s:a||(a=s)),o(s.children)});return o(this.state.tree),n||a}findItem(e){const t=n=>{for(const a of n||[]){if(a.id===e)return a;const o=t(a.children);if(o)return o}return null};return t(this.state.tree)}handleSyncScroll(e=this.getCurrentItem()){if(!e)return;this.currentHighlightedItem&&(this.currentHighlightedItem.classList.remove("sync-highlight"),this.currentHighlightedItem.removeAttribute("aria-current"));const t=this.container.querySelector("#outline-list");if(!t)return;let n=t.querySelector(`.outline-item[data-index="${e.index}"]`);if(!n)return;if(n.classList.contains("outline-hidden")){let o=n.previousElementSibling;for(;o;){if(o.classList.contains("outline-item")&&!o.classList.contains("outline-hidden")){const i=parseInt(o.dataset.level,10),s=parseInt(n.dataset.level,10);if(i<s){n=o;break}}o=o.previousElementSibling}if(n.classList.contains("outline-hidden"))return}n.classList.add("sync-highlight"),n.setAttribute("aria-current","location"),this.currentHighlightedItem=n;const a=this.container.querySelector("#outline-list-wrapper");if(a){const o=a.getBoundingClientRect(),i=n.getBoundingClientRect();if(i.top<o.top||i.bottom>o.bottom){const s=i.top-o.top-o.height/2+i.height/2;a.scrollBy({top:s,behavior:"smooth"})}}}startObserver(){if(this.observer)return;const e='main, [role="main"], [data-message-author-role], [data-testid^="conversation-turn-"]',t="[data-turn-key], [data-message-id], [data-message-author-role], [data-content-search-unit-key], [data-chatgpt-search-unit-key], [data-chatgpt-selection-message-id], [data-user-message-bubble]",n=a=>a?.closest?.("#chatgpt-helper-right, [data-gh-owned]");this.observer=new MutationObserver(a=>{if(a.some(i=>{const s=i.target.nodeType===1?i.target:i.target.parentElement;return n(s)?!1:s?.closest(e)?!0:[...i.addedNodes,...i.removedNodes].some(l=>l.nodeType===1&&!n(l)&&(l.matches(e)||l.querySelector(e)))})){const i=a.some(s=>s.type==="attributes"||s.type==="childList"&&[...s.addedNodes,...s.removedNodes].some(l=>l.nodeType===1&&(l.matches(t)||l.querySelector(t))));this.triggerAutoUpdate(i)}}),this.observer.observe(document.body,{childList:!0,characterData:!0,subtree:!0,attributes:!0,attributeFilter:["data-message-id","data-chatgpt-selection-message-id","data-turn-key","data-content-search-unit-key","data-chatgpt-search-unit-key","data-message-author-role"]})}stopObserver(){this.observer&&(this.observer.disconnect(),this.observer=null),this.updateDebounceTimer&&(clearTimeout(this.updateDebounceTimer),this.updateDebounceTimer=null)}destroy(){this.destroyed=!0,this.isActive=!1,clearTimeout(this.searchDebounceTimer),this.stopObserver(),this.stopSyncScroll()}triggerAutoUpdate(e=!1){if(!this.isActive||this.destroyed)return;const t=Math.max(250,Math.min(1e4,(this.settings.outline?.updateInterval??1)*1e3));e&&!this.windowUpdateQueued&&(clearTimeout(this.updateDebounceTimer),this.updateDebounceTimer=null,this.windowUpdateQueued=!0),this.updateDebounceTimer||(this.updateDebounceTimer=setTimeout(()=>{this.executeAutoUpdate()},e?0:t))}executeAutoUpdate(){this.windowUpdateQueued=!1,this.updateDebounceTimer&&(clearTimeout(this.updateDebounceTimer),this.updateDebounceTimer=null),!(!this.isActive||this.destroyed)&&(this.config.onAutoUpdate?this.config.onAutoUpdate():window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh")))}createUI(){clearTimeout(this.searchDebounceTimer),this.renderedTreeKey=null,he(this.container);const e=d("div",{className:"outline-content"}),t=d("div",{className:"outline-fixed-toolbar"}),n=d("div",{className:"outline-toolbar-row"}),a=()=>{const L=document.createElementNS("http://www.w3.org/2000/svg","svg");L.setAttribute("viewBox","0 0 16 16"),L.setAttribute("fill","none"),L.setAttribute("stroke","currentColor"),L.setAttribute("stroke-width","2"),L.style.width="14px",L.style.height="14px";const F=document.createElementNS("http://www.w3.org/2000/svg","circle");F.setAttribute("cx","8"),F.setAttribute("cy","8"),F.setAttribute("r","6.5"),L.appendChild(F);const R=document.createElementNS("http://www.w3.org/2000/svg","line");R.setAttribute("x1","4"),R.setAttribute("y1","8"),R.setAttribute("x2","12"),R.setAttribute("y2","8"),L.appendChild(R);const H=document.createElementNS("http://www.w3.org/2000/svg","line");return H.setAttribute("x1","8"),H.setAttribute("y1","4"),H.setAttribute("x2","8"),H.setAttribute("y2","12"),L.appendChild(H),L},o=()=>{const L=document.createElementNS("http://www.w3.org/2000/svg","svg");L.setAttribute("viewBox","0 0 16 16"),L.setAttribute("fill","none"),L.setAttribute("stroke","currentColor"),L.setAttribute("stroke-width","2"),L.style.width="14px",L.style.height="14px";const F=document.createElementNS("http://www.w3.org/2000/svg","circle");F.setAttribute("cx","8"),F.setAttribute("cy","8"),F.setAttribute("r","6.5"),L.appendChild(F);const R=document.createElementNS("http://www.w3.org/2000/svg","line");return R.setAttribute("x1","4"),R.setAttribute("y1","8"),R.setAttribute("x2","12"),R.setAttribute("y2","8"),L.appendChild(R),L};this._createExpandIcon=a,this._createCollapseIcon=o;const i=this.settings.outline?.showUserQueries??!1,s=i?this.t("outlineHideUserQueriesTooltip")||"\u9690\u85CF\u7528\u6237\u63D0\u95EE":this.t("outlineShowUserQueriesTooltip")||"\u663E\u793A\u7528\u6237\u63D0\u95EE",l=d("button",{className:"outline-toolbar-btn"+(i?" active":""),id:"outline-group-btn",title:s},"\u{1F64B}");l.addEventListener("click",()=>this.toggleGroupMode()),n.appendChild(l);const h=d("button",{className:"outline-toolbar-btn",id:"outline-expand-btn",title:this.t("outlineExpandAll")||"\u5C55\u5F00\u5168\u90E8"});h.appendChild(a()),h.addEventListener("click",()=>this.toggleExpandAll()),n.appendChild(h);const p=d("button",{className:"outline-toolbar-btn",id:"outline-locate-btn",title:this.t("outlineLocateCurrent")||"\u5B9A\u4F4D\u5F53\u524D\u4F4D\u7F6E"}),c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("viewBox","0 0 18 18"),c.setAttribute("fill","none"),c.setAttribute("stroke","currentColor"),c.setAttribute("stroke-width","2"),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round"),c.style.width="18px",c.style.height="18px";const u=document.createElementNS("http://www.w3.org/2000/svg","circle");u.setAttribute("cx","9"),u.setAttribute("cy","9"),u.setAttribute("r","4.5"),c.appendChild(u);const g=document.createElementNS("http://www.w3.org/2000/svg","line");g.setAttribute("x1","9"),g.setAttribute("y1","1"),g.setAttribute("x2","9"),g.setAttribute("y2","3.5"),c.appendChild(g);const v=document.createElementNS("http://www.w3.org/2000/svg","line");v.setAttribute("x1","9"),v.setAttribute("y1","14.5"),v.setAttribute("x2","9"),v.setAttribute("y2","17"),c.appendChild(v);const f=document.createElementNS("http://www.w3.org/2000/svg","line");f.setAttribute("x1","1"),f.setAttribute("y1","9"),f.setAttribute("x2","3.5"),f.setAttribute("y2","9"),c.appendChild(f);const S=document.createElementNS("http://www.w3.org/2000/svg","line");S.setAttribute("x1","14.5"),S.setAttribute("y1","9"),S.setAttribute("x2","17"),S.setAttribute("y2","9"),c.appendChild(S),p.appendChild(c),p.addEventListener("click",()=>this.locateCurrentPosition()),n.appendChild(p);const k=d("button",{className:"outline-toolbar-btn",id:"outline-scroll-btn",title:this.t("outlineScrollBottom")||"\u6EDA\u52A8\u5230\u5E95\u90E8"});k.appendChild(j("arrowDown",{size:14})),k.addEventListener("click",()=>this.scrollList()),n.appendChild(k);const M=d("div",{className:"outline-search-wrapper"}),x=d("input",{type:"text",className:"outline-search-input",placeholder:this.t("outlineSearch")||"\u641C\u7D22\u5927\u7EB2...",value:this.state.searchQuery}),P=d("button",{className:"outline-search-clear"+(this.state.searchQuery?"":" hidden"),title:this.t("clear")||"\u6E05\u9664"},"\xD7");x.addEventListener("input",L=>{const F=L.target.value;P.classList.toggle("hidden",!F),clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=setTimeout(()=>{this.handleSearch(F.trim())},300)}),x.addEventListener("keydown",L=>{L.key==="Escape"&&(x.value="",P.classList.add("hidden"),clearTimeout(this.searchDebounceTimer),this.handleSearch(""),x.blur())}),P.addEventListener("click",()=>{x.value="",P.classList.add("hidden"),clearTimeout(this.searchDebounceTimer),this.handleSearch(""),x.focus()}),M.appendChild(x),M.appendChild(P),n.appendChild(M),t.appendChild(n);const D=d("div",{className:"outline-toolbar-row"}),w=d("div",{className:"outline-level-slider-container"}),I=d("div",{className:"outline-level-dots",id:"outline-level-dots"}),q=d("div",{className:"outline-level-line"}),y=d("div",{className:"outline-level-progress",id:"outline-level-progress"});q.appendChild(y),I.appendChild(q);for(let L=0;L<=6;L++){const F=d("div",{className:`outline-level-dot ${L<=this.state.expandLevel?"active":""}`,"data-level":L}),R=d("div",{className:"outline-level-dot-tooltip"});R.textContent=L===0?"\u2296":`H${L}`,F.appendChild(R),F.addEventListener("click",()=>this.setLevel(L)),I.appendChild(F)}w.appendChild(I),D.appendChild(w),t.appendChild(D),e.appendChild(t);const E=d("div",{className:"outline-result-bar hidden",id:"outline-result-bar"});e.appendChild(E);const C=d("div",{className:"outline-list-wrapper",id:"outline-list-wrapper"}),A=d("div",{className:"outline-list",id:"outline-list"});C.appendChild(A),e.appendChild(C),this.container.appendChild(e)}update(e=[]){if(!this.container.querySelector("#outline-list"))return;this.state.rawOutline=e,this.state.includeUserQueries=this.settings.outline?.showUserQueries??!1;const n=JSON.stringify(e.map(({id:l,level:h,text:p,isUserQuery:c})=>[l,h,p,c]));if(n===this.state.treeKey&&this.state.tree){const l=new Map(e.map(p=>[p.id,p])),h=p=>p.forEach(c=>{const u=l.get(c.id);u&&Object.assign(c,u),h(c.children)});h(this.state.tree),this.renderedTreeKey!==n&&this.refreshCurrent();return}const a={};this.state.tree&&this.captureTreeState(this.state.tree,a);const o=e.filter(l=>!l.isUserQuery).map(l=>l.level);this.state.minLevel=o.length?Math.min(...o):1,this.state.tree=this.buildTree(e,this.state.minLevel),this.state.treeKey=n,this.state.levelCounts={};const i=l=>l.forEach(h=>{this.state.levelCounts[h.relativeLevel]=(this.state.levelCounts[h.relativeLevel]||0)+1,i(h.children)});i(this.state.tree),this.updateTooltips();const s=Math.max(this.state.includeUserQueries?0:1,this.state.expandLevel??6);this.initializeCollapsedState(this.state.tree,s),this.restoreTreeState(this.state.tree,a),this.state.searchQuery&&this.performSearch(this.state.searchQuery),this.refreshCurrent()}buildTree(e,t){const n=[],a=[],o=new Map;e.filter(l=>!l.isUserQuery).forEach(l=>{o.set(l.messageId,Math.min(o.get(l.messageId)??6,l.level))});let i,s=0;return e.forEach((l,h)=>{const p=l.isUserQuery?0:l.level-(o.get(l.messageId)??t)+1;if(l.messageId!==i){const u=a.find(g=>g.isUserQuery);a.length=0,u&&!l.isUserQuery&&a.push(u),i=l.messageId}const c={...l,questionNumber:l.isUserQuery?++s:null,relativeLevel:p,index:h,children:[],collapsed:!1,forceExpanded:!1};for(;a.length>0&&a[a.length-1].relativeLevel>=p;)a.pop();a.length===0?n.push(c):a[a.length-1].children.push(c),a.push(c)}),n}initializeCollapsedState(e,t){e.forEach(n=>{if(n.forceExpanded===void 0&&(n.forceExpanded=!1),n.children&&n.children.length>0){const a=n.children.every(o=>o.relativeLevel>t);n.collapsed=a,this.initializeCollapsedState(n.children,t)}else n.collapsed=!1})}captureTreeState(e,t){e.forEach(n=>{const a=n.id||`${n.index}_${n.level}_${n.text}`,o=n.children&&n.children.length>0;t[a]={collapsed:n.collapsed,forceExpanded:n.forceExpanded,hadChildren:o},o&&this.captureTreeState(n.children,t)})}restoreTreeState(e,t){e.forEach(n=>{const a=n.id||`${n.index}_${n.level}_${n.text}`,o=t[a];if(o){const i=n.children&&n.children.length>0;(o.hadChildren||!i)&&(n.collapsed=o.collapsed),o.forceExpanded!==void 0&&(n.forceExpanded=o.forceExpanded)}n.children&&n.children.length>0&&this.restoreTreeState(n.children,t)})}clearForceExpandedState(e,t){e.forEach(n=>{if(n.forceExpanded=!1,n.children&&n.children.length>0){const a=n.children.every(o=>o.relativeLevel>t);n.collapsed=a,this.clearForceExpandedState(n.children,t)}else n.collapsed=!1})}refreshCurrent(){const e=this.container.querySelector("#outline-list");if(this.state.tree&&e){if(he(e),this.renderedTreeKey=this.state.treeKey,!this.state.tree.length){e.appendChild(d("div",{className:"outline-empty",role:"status"},this.t("outlineNoContent")));return}let t;this.state.searchQuery&&!this.state.searchLevelManual?t=100:t=this.state.expandLevel??6;const n=this.state.includeUserQueries?0:1;t<n&&(t=n),this.renderItems(e,this.state.tree,this.state.minLevel,t),this.isActive&&this.handleSyncScroll();const a=s=>s.some(l=>l.children.length&&(l.collapsed||a(l.children))),o=Math.max(1,...Object.keys(this.state.levelCounts).map(Number));this.state.isAllExpanded=t>=o&&!a(this.state.tree);const i=this.container.querySelector("#outline-expand-btn");i&&(i.title=this.t(this.state.isAllExpanded?"outlineCollapseAll":"outlineExpandAll"),i.setAttribute("aria-label",i.title),i.replaceChildren(this.state.isAllExpanded?this._createCollapseIcon():this._createExpandIcon()))}}renderItems(e,t,n,a,o=!1,i=!1){const s=this.state.includeUserQueries?0:1;t.forEach(l=>{const h=l.children&&l.children.length>0,p=l.relativeLevel===s;let c;const u=l.relativeLevel<=a||i;if(p)this.state.searchQuery?c=l.isMatch||l.hasMatchedDescendant:c=!0;else{const x=!this.state.searchQuery||l.isMatch||l.hasMatchedDescendant||i;this.state.searchQuery&&!this.state.searchLevelManual?c=x&&!o:this.state.searchQuery&&this.state.searchLevelManual?c=x&&u&&!o:c=u&&!o}o&&(c=!1);let v=`outline-item outline-level-${l.relativeLevel}`;l.isUserQuery&&(v+=" user-query-node");const f=d("div",{className:v,role:"button",tabIndex:0,"aria-label":l.text,"data-index":l.index,"data-outline-id":l.id,"data-level":l.relativeLevel});f.addEventListener("keydown",x=>{x.target===f&&(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),f.click())});const S=h&&!l.collapsed,k=d("span",{className:`outline-item-toggle ${h?S?"expanded":"":"invisible"}`,role:"button",tabIndex:h?0:-1,"aria-label":this.t(S?"outlineCollapseAll":"outlineExpandAll"),"aria-expanded":String(S)},"\u25B8");if(h&&(k.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),x.stopPropagation(),k.click())}),k.addEventListener("click",x=>{x.stopPropagation(),x.preventDefault(),l.collapsed=!l.collapsed,l.collapsed||(l.forceExpanded=!0),k.classList.toggle("expanded",!l.collapsed),this.refreshCurrent()})),f.appendChild(k),l.isUserQuery){const x=d("span",{className:"user-query-badge"}),P=d("span",{className:"user-query-badge-icon"});P.appendChild(j("message",{size:12}));const D=d("span",{className:"user-query-badge-number"},`${l.questionNumber}`);x.appendChild(P),x.appendChild(D),f.appendChild(x)}const M=d("span",{className:"outline-item-text"});if(this.state.searchQuery&&l.isMatch)try{const x=this.state.searchQuery,P=x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),D=new RegExp(`(${P})`,"gi"),w=l.text.split(D);he(M),w.forEach(I=>{if(I.toLowerCase()===x.toLowerCase()){const q=document.createElement("mark");q.textContent=I,q.style.backgroundColor="rgba(255, 235, 59, 0.5)",q.style.color="inherit",q.style.padding="0",q.style.borderRadius="2px",M.appendChild(q)}else M.appendChild(document.createTextNode(I))})}catch{M.textContent=l.text,M.title=l.text}else M.textContent=l.text,M.title=l.text;if(f.appendChild(M),l.isUserQuery){const x=d("span",{className:"outline-item-copy-btn"});x.title="Copy";const P=()=>{const w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.setAttribute("stroke","currentColor"),w.setAttribute("stroke-width","2"),w.setAttribute("stroke-linecap","round"),w.setAttribute("stroke-linejoin","round"),w.style.width="14px",w.style.height="14px";const I=document.createElementNS("http://www.w3.org/2000/svg","rect");I.setAttribute("x","9"),I.setAttribute("y","9"),I.setAttribute("width","13"),I.setAttribute("height","13"),I.setAttribute("rx","2"),I.setAttribute("ry","2");const q=document.createElementNS("http://www.w3.org/2000/svg","path");return q.setAttribute("d","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"),w.appendChild(I),w.appendChild(q),w},D=()=>{const w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.setAttribute("stroke","#10b981"),w.setAttribute("stroke-width","2"),w.setAttribute("stroke-linecap","round"),w.setAttribute("stroke-linejoin","round"),w.style.width="14px",w.style.height="14px";const I=document.createElementNS("http://www.w3.org/2000/svg","polyline");return I.setAttribute("points","20 6 9 17 4 12"),w.appendChild(I),w};x.appendChild(P()),x.addEventListener("click",async w=>{w.stopPropagation();try{let I=l.text;l.isTruncated&&l.element&&l.element.isConnected&&(I=this.siteAdapter&&this.siteAdapter.extractUserQueryText?this.siteAdapter.extractUserQueryText(l.element):l.text,I||(I=l.text)),await navigator.clipboard.writeText(I),x.replaceChildren(D()),setTimeout(()=>{x.replaceChildren(P())},1500)}catch(I){console.error("Failed to copy: ",I)}}),f.appendChild(x)}if(f.addEventListener("click",x=>{if(x.target.closest(".outline-item-toggle, .outline-item-copy-btn"))return;const P=this.findItem(l.id)||l;this.onJumpBefore?.();const D={id:l.id,settledTop:null};this.navigationTarget=D,this.handleSyncScroll(P),this.config.onNavigate(P,({cancelled:w,top:I,element:q})=>{if(!(this.navigationTarget!==D||this.destroyed)){if(w){this.navigationTarget=null,this.settings.outline?.syncScroll&&this.handleSyncScroll();return}D.settledTop=I,this.handleSyncScroll(this.findItem(D.id)),q.classList.add("outline-highlight"),setTimeout(()=>q.classList.remove("outline-highlight"),2e3)}})}),c||(f.tabIndex=-1,f.classList.add("outline-hidden")),e.appendChild(f),h){const x=l.collapsed||o;this.renderItems(e,l.children,n,a,x,l.forceExpanded||i)}})}handleSearch(e){if(!e){this.state.searchQuery="",this.state.searchResults=null,this.state.searchLevelManual=!1;const t=this.container.querySelector("#outline-result-bar");if(t&&t.classList.add("hidden"),this.state.tree){const n=this.state.expandLevel??6;this.clearForceExpandedState(this.state.tree,n),this.state.preSearchState&&(this.restoreTreeState(this.state.tree,this.state.preSearchState),this.state.preSearchState=null)}this.refreshCurrent();return}!this.state.searchQuery&&this.state.tree&&(this.state.preSearchState={},this.captureTreeState(this.state.tree,this.state.preSearchState),this.clearForceExpandedState(this.state.tree,0)),this.state.searchQuery=e,this.state.searchLevelManual=!1,this.performSearch(e),this.refreshCurrent()}performSearch(e,t=!0){if(!this.state.tree)return;const n=s=>s.toLowerCase(),a=n(e);let o=0;const i=s=>{let l=!1;return s.forEach(h=>{const p=n(h.text).includes(a);if(p&&o++,h.isMatch=p,h.children&&h.children.length>0){const c=i(h.children);h.hasMatchedDescendant=c}else h.hasMatchedDescendant=!1;h.hasMatchedDescendant&&(h.collapsed=!1),(p||h.hasMatchedDescendant)&&(l=!0)}),l};if(i(this.state.tree),t){const s=this.container.querySelector("#outline-result-bar");s&&(s.textContent=`${o} ${this.t("outlineSearchResult")||"\u4E2A\u7ED3\u679C"}`,s.classList.remove("hidden"))}}toggleGroupMode(){const e=this.container.querySelector("#outline-group-btn");this.settings.outline&&(this.settings.outline.showUserQueries=!this.settings.outline.showUserQueries,this.state.includeUserQueries=this.settings.outline.showUserQueries,e&&(e.classList.toggle("active",this.settings.outline.showUserQueries),this.settings.outline.showUserQueries?e.title=this.t("outlineHideUserQueriesTooltip")||"\u9690\u85CF\u7528\u6237\u63D0\u95EE":e.title=this.t("outlineShowUserQueriesTooltip")||"\u663E\u793A\u7528\u6237\u63D0\u95EE"),this.onSettingsChange&&this.onSettingsChange({showUserQueries:this.settings.outline.showUserQueries}),this.config.onAutoUpdate?this.config.onAutoUpdate():window.dispatchEvent(new CustomEvent("chatgpt-helper-outline-auto-refresh")))}toggleExpandAll(){if(this.container.querySelector("#outline-expand-btn"))if(this.state.isAllExpanded){const t=this.settings.outline?.showUserQueries?0:1;this.setLevel(t)}else{const n=this.state.levelCounts&&Object.keys(this.state.levelCounts).length>0?Math.max(...Object.keys(this.state.levelCounts).map(Number),1):6;this.setLevel(n)}}locateCurrentPosition(){if(!this.state.tree||this.state.tree.length===0||!this.siteAdapter)return;if(this.state.searchQuery){this.handleSearch("");const l=this.container.querySelector(".outline-search-input"),h=this.container.querySelector(".outline-search-clear");l&&(l.value=""),h&&h.classList.add("hidden")}let e=this.getCurrentItem();if(!e)return;const t=(l,h,p=[])=>{for(const c of l){const u=[...p,c];if(c.index===h)return u;if(c.children&&c.children.length>0){const g=t(c.children,h,u);if(g)return g}}return null},n=t(this.state.tree,e.index)||[e];let a=this.state.expandLevel??6;const o=this.state.includeUserQueries?0:1;a<o&&(a=o);let i=e;for(let l=n.length-1;l>=0;l--){const h=n[l];if(h.relativeLevel<=a&&!h.isUserQuery){i=h;break}}e=i;const s=(l,h,p=[])=>{for(const c of l){if(c.index===h)return p.forEach(u=>{u.collapsed=!1,u.forceExpanded=!0}),!0;if(c.children&&c.children.length>0&&s(c.children,h,[...p,c]))return!0}return!1};s(this.state.tree,e.index),this.refreshCurrent(),setTimeout(()=>{const l=this.container.querySelector("#outline-list");if(!l)return;let h=l.querySelector(`.outline-item[data-index="${e.index}"]`);if(!h||h.classList.contains("outline-hidden")){const c=n&&n.length>0?[...n].reverse().map(u=>u.index):[e.index];for(const u of c){const g=l.querySelector(`.outline-item[data-index="${u}"]`);if(g&&!g.classList.contains("outline-hidden")){h=g;break}}}if(!h)return;const p=this.container.querySelector("#outline-list-wrapper");if(p){const c=p.getBoundingClientRect(),u=h.getBoundingClientRect(),g=u.top-c.top-c.height/2+u.height/2;p.scrollBy({top:g,behavior:"smooth"})}h.classList.add("highlight"),setTimeout(()=>h.classList.remove("highlight"),2e3)},50)}setLevel(e){this.state.expandLevel=e,this.state.tree&&this.clearForceExpandedState(this.state.tree,e),this.container.querySelectorAll(".outline-level-dot").forEach(s=>{const l=parseInt(s.dataset.level,10);s.classList.toggle("active",l<=e)});const n=this.container.querySelector("#outline-level-progress");n&&(n.style.width=`${e/6*100}%`),this.state.searchQuery&&(this.state.searchLevelManual=!0);const a=this.container.querySelector("#outline-expand-btn"),i=this.state.levelCounts&&Object.keys(this.state.levelCounts).length>0?Math.max(...Object.keys(this.state.levelCounts).map(Number),1):6;a&&(e>=i?(a.replaceChildren(this._createCollapseIcon?this._createCollapseIcon():document.createTextNode("\u2296")),a.title=this.t("outlineCollapseAll"),this.state.isAllExpanded=!0):(a.replaceChildren(this._createExpandIcon?this._createExpandIcon():document.createTextNode("\u2295")),a.title=this.t("outlineExpandAll"),this.state.isAllExpanded=!1)),this.refreshCurrent()}updateTooltips(){const e=this.container.querySelectorAll(".outline-level-dot"),t=this.settings.outline?.showUserQueries||!1;e.forEach(n=>{const a=parseInt(n.dataset.level,10),o=n.querySelector(".outline-level-dot-tooltip");if(o)if(a===0)o.textContent=t?this.t("outlineOnlyUserQueries")||"\u53EA\u663E\u793A\u7528\u6237\u63D0\u95EE":"\u2296";else{const i=this.state.levelCounts[a]||0;o.textContent=`H${a}: ${i}`}})}scrollList(){const e=this.container.querySelector("#outline-list-wrapper"),t=this.container.querySelector("#outline-scroll-btn");if(!e||!t)return;e.scrollTop+e.clientHeight>=e.scrollHeight-10?(e.scrollTo({top:0,behavior:"smooth"}),ue(t,"arrowDown",{size:14}),t.title=this.t("outlineScrollBottom")||"\u6EDA\u52A8\u5230\u5E95\u90E8"):(e.scrollTo({top:e.scrollHeight,behavior:"smooth"}),ue(t,"arrowUp",{size:14}),t.title=this.t("outlineScrollTop")||"\u6EDA\u52A8\u5230\u9876\u90E8")}}const un=["#prompt-textarea",'div[contenteditable="true"][role="textbox"]','textarea[data-id="root"]','textarea[placeholder*="Message"]','textarea[placeholder*="\u6D88\u606F"]'],br="//",mn=24,bn=9;function fr(r){const e=String(r||"").replace(/^\s+/,"");if(!e.startsWith(br))return null;const t=e.slice(br.length);return t.startsWith("/")||/\s/.test(t)||t.length>mn?null:{query:t}}class xr{constructor(e={}){this.getPrompts=e.getPrompts||(()=>[]),this.isEnabled=e.isEnabled||(()=>!0),this.onInsert=e.onInsert||(()=>{}),this.t=e.t||(t=>t),this.menuEl=null,this.items=[],this.activeIndex=0,this.query="",this.composer=null,this.isOpen=!1,this.suppressed=!1,this._started=!1,this._suppressInput=!1}start(){this._started||(this._started=!0,this._onInput=e=>this.handleInput(e),this._onKeyDown=e=>this.handleKeyDown(e),this._onMouseDown=e=>this.handleMouseDown(e),this._onResize=()=>{this.isOpen&&this.positionMenu()},document.addEventListener("input",this._onInput,!0),document.addEventListener("keydown",this._onKeyDown,!0),document.addEventListener("mousedown",this._onMouseDown,!0),window.addEventListener("resize",this._onResize))}stop(){this._started&&(this._started=!1,document.removeEventListener("input",this._onInput,!0),document.removeEventListener("keydown",this._onKeyDown,!0),document.removeEventListener("mousedown",this._onMouseDown,!0),window.removeEventListener("resize",this._onResize),this.close())}destroy(){this.stop(),this.menuEl&&this.menuEl.parentNode&&this.menuEl.parentNode.removeChild(this.menuEl),this.menuEl=null}isComposerEvent(e){const t=e.target;return!t||t.nodeType!==1?!1:!!(t.id==="prompt-textarea"||t.matches&&t.matches('div[contenteditable="true"][role="textbox"]')||t.matches&&t.matches('textarea[data-id="root"]')||t.matches&&t.matches('textarea[placeholder*="Message"]')||t.matches&&t.matches('textarea[placeholder*="\u6D88\u606F"]'))}getComposer(){for(const e of un){const t=document.querySelector(e);if(t&&t.offsetParent!==null)return t}return null}getComposerText(e){return e?e.tagName==="TEXTAREA"||e.tagName==="INPUT"?e.value||"":e.textContent||"":""}handleInput(e){if(!this._started||e.isComposing)return;if(this._suppressInput){this._suppressInput=!1;return}if(!this.isComposerEvent(e))return;this.composer=e.target;const t=this.isEnabled()?fr(this.getComposerText(this.composer)):null;if(!t){this.suppressed=!1,this.isOpen&&this.close();return}this.suppressed||(this.query=t.query,this.show())}handleKeyDown(e){if(this.isOpen&&!(e.isComposing||e.keyCode===229)){if(!this.isComposerEvent(e)){this.close();return}if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(e.preventDefault(),e.stopPropagation(),this.items.length===0)return;const t=e.key==="ArrowDown"?1:-1;this.activeIndex=(this.activeIndex+t+this.items.length)%this.items.length,this.updateActiveItem();return}if(e.key==="Enter"||e.key==="Tab"){e.preventDefault(),e.stopPropagation(),this.insertActive();return}e.key==="Escape"&&(this.suppressed=!0,this.close())}}handleMouseDown(e){this.isOpen&&(this.menuEl&&e.target&&this.menuEl.contains(e.target)||this.composer&&this.composer.contains&&this.composer.contains(e.target)||this.close())}filterPrompts(){const e=this.getPrompts()||[],t=this.query.toLowerCase();return e.filter(a=>{if(!a)return!1;const o=(a.title||"").toLowerCase(),i=(a.content||"").toLowerCase(),s=(a.category||"").toLowerCase();return t?o.includes(t)||i.includes(t)||s.includes(t):!0}).slice(0,bn)}show(){this.items=this.filterPrompts(),this.activeIndex=0,this.menuEl||(this.menuEl=this.buildMenu(),this.menuEl.id="chatgpt-helper-quick-menu",document.body.appendChild(this.menuEl)),this.menuEl.classList.add("open"),this.renderItems(),this.positionMenu(),this.isOpen=!0}close(){this.menuEl&&this.menuEl.classList.remove("open"),this.isOpen=!1}buildMenu(){const e=d("div",{className:"gh-quick-menu",role:"listbox","aria-label":"ChatGPT Helper prompts"}),t=d("div",{className:"gh-quick-menu-list"});e.appendChild(t);const n=d("div",{className:"gh-quick-menu-hint"},this.t("quickMenuHint"));return e.appendChild(n),e}renderItems(){const e=this.menuEl.querySelector(".gh-quick-menu-list");if(e){for(;e.firstChild;)e.firstChild.remove();if(this.items.length===0){const t=d("div",{className:"gh-quick-menu-empty"},this.t("quickMenuEmpty"));e.appendChild(t);return}this.items.forEach((t,n)=>{const a=ft(t.content),o=d("div",{className:`gh-quick-menu-item${n===this.activeIndex?" active":""}`,role:"option","aria-selected":String(n===this.activeIndex),"data-index":String(n)}),i=d("span",{className:"gh-quick-menu-item-icon"});i.appendChild(j("edit",{size:13})),o.appendChild(i);const s=d("div",{className:"gh-quick-menu-item-main"});s.appendChild(d("span",{className:"gh-quick-menu-item-title"},t.title||""));const l=d("span",{className:"gh-quick-menu-item-meta"});t.category&&l.appendChild(d("span",{className:"gh-quick-menu-item-category"},t.category)),a.length>0&&l.appendChild(d("span",{className:"gh-quick-menu-item-vars"},`${a.length} {{}}`)),s.appendChild(l),o.appendChild(s),o.addEventListener("mousedown",h=>{h.preventDefault(),h.stopPropagation()}),o.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),this.activeIndex=n,this.insertActive()}),o.addEventListener("mousemove",()=>{this.activeIndex!==n&&(this.activeIndex=n,this.updateActiveItem())}),e.appendChild(o)})}}updateActiveItem(){if(!this.menuEl)return;const e=this.menuEl.querySelectorAll(".gh-quick-menu-item");e.forEach((n,a)=>{const o=a===this.activeIndex;n.classList.toggle("active",o),n.setAttribute("aria-selected",String(o))});const t=e[this.activeIndex];t&&t.scrollIntoView&&t.scrollIntoView({block:"nearest"})}positionMenu(){if(!this.menuEl||!this.composer)return;const e=this.composer.getBoundingClientRect(),t=this.menuEl.getBoundingClientRect();let n=e.left;n+t.width>window.innerWidth-12&&(n=Math.max(12,window.innerWidth-t.width-12));let a=e.top-t.height-8;a<12&&(a=e.bottom+8),this.menuEl.style.left=`${Math.round(n)}px`,this.menuEl.style.top=`${Math.round(a)}px`}insertActive(){const e=this.items[this.activeIndex];if(e){this.close();try{this.onInsert(e)}catch(t){console.error("[ChatGPT Helper] \u5FEB\u901F\u83DC\u5355\u63D2\u5165\u5931\u8D25:",t)}}}replaceComposerText(e){const t=this.composer&&this.composer.isConnected?this.composer:this.getComposer();if(!t)return!1;const n=a=>String(a||"").replace(/\s+/g,"");try{if(t.focus(),t.tagName==="TEXTAREA"||t.tagName==="INPUT")return t.value=e,this._suppressInput=!0,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),!0;const a=()=>{const o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i)};if(a(),this._suppressInput=!0,document.execCommand("insertText",!1,e),n(t.textContent)===n(e))return this._suppressInput=!0,t.dispatchEvent(new Event("input",{bubbles:!0})),!0;try{a(),this._suppressInput=!0,document.execCommand("delete")}catch{}return!1}catch(a){return console.error("[ChatGPT Helper] \u66FF\u6362\u8F93\u5165\u6846\u6587\u672C\u5931\u8D25:",a),!1}}}const vr=["data-latex","data-math","data-formula"],yr=vr.map(r=>`[${r}]`).join(", "),wr=`.katex, .katex-display, [data-d-component="math"], math, mjx-container, .MathJax, ${yr}`,fn="body, html, main, article, p, li, td, th, [data-message-author-role], [data-markdown-text-style], [data-content-search-unit-key]";function xn(r){const e=r?.nodeType===1?r:r?.parentElement;if(!e?.closest||e.closest('pre, code, textarea, [contenteditable="true"]'))return null;const t=e.closest(".katex");if(t)return t;const n=e.closest(wr);if(!n)return null;const a=n.querySelectorAll(".katex");return a.length>1?null:a[0]||n}function vn(r){let e=String(r||"").trim(),t;for(const[n,a,o]of[["$$","$$",!0],["\\[","\\]",!0],["\\(","\\)",!1],["$","$",!1]])if(e.length>n.length+a.length&&e.startsWith(n)&&e.endsWith(a)){const i=e.slice(0,-a.length).match(/\\+$/)?.[0].length||0;if(a==="$"&&i%2)continue;e=e.slice(n.length,-a.length).trim(),t=o;break}return{latex:e||null,display:t}}function It(r){for(const e of vr){const t=r.getAttribute(e);if(t?.trim())return t}return null}function yn(r){const e=xn(r);if(!e)return null;const t=Array.from(e.querySelectorAll('annotation[encoding="application/x-tex" i], annotation[encoding="text/x-tex" i]')).map(s=>s.textContent).filter(s=>s?.trim());let n=t.length===1?t[0]:null;if(n||(n=It(e)),!n&&t.length<=1){const s=Array.from(e.querySelectorAll(yr)).map(It).filter(Boolean);s.length===1&&(n=s[0])}for(let s=e.parentElement;!n&&s&&!s.matches(fn)&&!(s.querySelectorAll(".katex").length>1);s=s.parentElement)n=It(s);const a=vn(n),o=e.matches("math")?e:e.querySelector("math"),i=!!(e.closest('.katex-display, [data-d-component="math"][data-d-block]')||o?.getAttribute("display")==="block"||a.display===!0);return{root:e,latex:a.latex,display:i}}function wn(r){return r?.latex?r.display?`$$
${r.latex}
$$`:`$${r.latex}$`:null}class kr{constructor(e,t,n){this.settings=e,this.showToast=t||(()=>{}),this.t=n||(a=>a),this.formulaCopyInitialized=!1,this.tableCopyInitialized=!1,this.formulaDblClickHandler=null,this.tableObserver=null}initFormulaCopy(){if(this.formulaCopyInitialized)return;this.formulaCopyInitialized=!0;const e="chatgpt-helper-formula-copy-style";if(!document.getElementById(e)){const t=document.createElement("style");t.id=e,t.textContent=`
                :is(${wr}):not(pre *):not(code *):not([contenteditable="true"] *) {
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
            `,document.head.appendChild(t)}this.formulaDblClickHandler=async t=>{if(this.settings.formulaCopy?.enabled===!1)return;const n=yn(t.target);if(!n)return;t.preventDefault(),t.stopPropagation();const a=wn(n);if(!a){this.showToast(this.t("formulaSourceUnavailable"));return}const o=await wt(a);this.showToast(this.t(o?"formulaCopied":"copyFailed"))},document.addEventListener("dblclick",this.formulaDblClickHandler,!0)}destroyFormulaCopy(){this.formulaCopyInitialized=!1;const e=document.getElementById("chatgpt-helper-formula-copy-style");e&&e.remove(),this.formulaDblClickHandler&&(document.removeEventListener("dblclick",this.formulaDblClickHandler,!0),this.formulaDblClickHandler=null)}initTableCopy(){if(this.tableCopyInitialized)return;this.tableCopyInitialized=!0;const e="chatgpt-helper-table-copy-style";if(!document.getElementById(e)){const t=document.createElement("style");t.id=e,t.textContent=`
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
            `,document.head.appendChild(t)}this.tableObserver=new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){a.tagName==="TABLE"&&this.injectTableButton(a);const o=a.querySelectorAll&&a.querySelectorAll("table");o&&o.forEach(i=>this.injectTableButton(i))}})})}),this.tableObserver.observe(document.body,{childList:!0,subtree:!0}),document.querySelectorAll("table").forEach(t=>{this.injectTableButton(t)})}injectTableButton(e){if(!(e.dataset&&e.dataset.ghTableBtn==="1")){e.dataset&&(e.dataset.ghTableBtn="1");try{let t=e.parentElement;if(!t||(getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.classList.add("chatgpt-helper-table-container"),t.querySelector(".chatgpt-helper-table-copy-btn")))return;const n=document.createElement("button");n.className="chatgpt-helper-table-copy-btn",n.appendChild(j("list",{size:14})),n.title=this.t("copyAsMarkdown"),n.addEventListener("mouseenter",()=>{n.style.opacity="1"}),n.addEventListener("mouseleave",()=>{n.style.opacity="0.7"}),n.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const o=this.tableToMarkdown(e);navigator.clipboard.writeText(o).then(()=>{this.showToast(this.t("tableCopied")),ue(n,"check",{size:14}),setTimeout(()=>{ue(n,"list",{size:14})},1e3)}).catch(i=>{console.error("[TableCopy] Copy failed:",i),this.showToast(this.t("copyFailed"))})}),t.appendChild(n)}catch(t){console.error("[TableCopy] Error injecting button:",t)}}}tableToMarkdown(e){const t=e.querySelectorAll("tr");if(t.length===0)return"";const n=[];let a=!1;const o=i=>{let s=i.innerText||i.textContent||"";return i.querySelectorAll('[class*="katex"], [class*="math"]').forEach(h=>{const p=h.getAttribute("data-latex")||h.getAttribute("data-math")||h.getAttribute("aria-label")||h.textContent;p&&(s=s.replace(h.textContent,`$${p}$`))}),s.trim().replace(/\|/g,"\\|").replace(/\n/g," ").replace(/\s+/g," ")||""};return t.forEach((i,s)=>{const l=i.querySelectorAll("th, td");if(l.length===0)return;const h=Array.from(l).map(o);if(n.push("| "+h.join(" | ")+" |"),!a&&(i.querySelector("th")||s===0)){const p=Array.from(l).map(c=>{const g=getComputedStyle(c).textAlign;return g==="center"?":---:":g==="right"?"---:":"---"});n.push("| "+p.join(" | ")+" |"),a=!0}}),n.join(`
`)}destroyTableCopy(){this.tableCopyInitialized=!1,this.tableObserver&&(this.tableObserver.disconnect(),this.tableObserver=null);const e=document.getElementById("chatgpt-helper-table-copy-style");e&&e.remove(),document.querySelectorAll(".chatgpt-helper-table-copy-btn").forEach(t=>t.remove()),document.querySelectorAll(".chatgpt-helper-table-container").forEach(t=>{t.classList.remove("chatgpt-helper-table-container")}),document.querySelectorAll("table[data-gh-table-btn]").forEach(t=>{delete t.dataset.ghTableBtn})}init(){this.settings.formulaCopy?.enabled!==!1&&this.initFormulaCopy(),this.settings.tableCopy?.enabled!==!1&&this.initTableCopy()}destroy(){this.destroyFormulaCopy(),this.destroyTableCopy()}}const kn='script, style, link, iframe, object, embed, button, input, textarea, select, [hidden], [aria-hidden="true"]:not(.katex-html), .sr-only, .gh-msg-select-check, [data-gh-owned]',Cn=new Set("div span p br hr h1 h2 h3 h4 h5 h6 strong b em i u s del a blockquote pre code ul ol li table thead tbody tfoot tr th td img figure figcaption details summary sup sub math semantics annotation mrow mi mn mo mtext mspace msup msub msubsup mfrac msqrt mroot mtable mtr mtd mover munder munderover mpadded mstyle svg path line rect circle g".split(" ")),Sn=new Set("alt title colspan rowspan start reversed display encoding xmlns viewBox d fill stroke stroke-width x y x1 y1 x2 y2 width height cx cy r preserveAspectRatio".split(" "));function Tn(r,e=!1){try{const t=new URL(r,location.href);return["https:","http:"].includes(t.protocol)||e&&/^(data:image\/(png|jpeg|webp|gif);|blob:)/i.test(r)?t.href:""}catch{return""}}function Pt(r,e,t){const a=r.getMessageContent(e).cloneNode(!0);a.querySelectorAll(kn).forEach(i=>i.remove());for(const i of[a,...a.querySelectorAll("*")]){if(!Cn.has(i.localName)){i.replaceWith(...i.childNodes);continue}const s=!!i.closest(".katex, .katex-display");for(const l of[...i.attributes])if(l.name==="href"||l.name==="src"){const h=Tn(l.value,l.name==="src");h?i.setAttribute(l.name,h):i.removeAttribute(l.name)}else if(l.name==="class")s||i.removeAttribute("class");else if(l.name==="style"&&s){const p=[...i.style].filter(c=>/^(height|width|min-width|top|left|right|bottom|vertical-align|margin-(left|right|top|bottom)|padding-(left|right|top|bottom)|border-bottom-width|font-size|line-height|position|display)$/.test(c)).map(c=>[c,i.style.getPropertyValue(c)]);i.removeAttribute("style"),p.forEach(([c,u])=>{/^(?:-?[\d.]+(?:em|px|%)?|relative|absolute|inline-block|block)$/.test(u)&&i.style.setProperty(c,u)})}else Sn.has(l.name)||i.removeAttribute(l.name);i.localName==="img"&&(i.removeAttribute("width"),i.removeAttribute("height"))}const o=a.cloneNode(!0);return o.querySelectorAll(".katex").forEach(i=>{const s=i.querySelector('annotation[encoding="application/x-tex"]')?.textContent;s&&i.replaceWith(document.createTextNode(i.closest(".katex-display")?`
$$${s}$$
`:`$${s}$`))}),o.querySelectorAll("br").forEach(i=>i.replaceWith(`
`)),o.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, li, pre, tr").forEach(i=>i.append(`
`)),{id:r.getMessageIdentity(e,t),role:r.getMessageRole(e),content:(o.textContent||"").trim(),html:a.innerHTML,order:t}}function An(r){return r.getChatMessages().map((e,t)=>Pt(r,e,t)).filter(e=>["user","assistant"].includes(e.role)&&(e.content||e.html.includes("<img")))}class Cr{constructor(e={}){this.t=e.t||(t=>t),this.showToast=e.onToast||(t=>{}),this.observer=null,this.adapter=e.adapter,this.onImageExport=e.onImageExport,this.listeners=new Set,this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.toolbar=null,this.selections=[],this._syncTimer=null,this._started=!1}start(){this._started||(this._started=!0,this.syncTurns(),typeof MutationObserver=="function"&&(this.observer=new MutationObserver(e=>{e.some(t=>!lr(t))&&this.scheduleSync()}),this.observer.observe(document.body,{childList:!0,subtree:!0})))}stop(){this._started&&(this._started=!1,this.observer&&(this.observer.disconnect(),this.observer=null),this._syncTimer&&(clearTimeout(this._syncTimer),this._syncTimer=null),this.selections=[],this.removeToolbar(),document.querySelectorAll(".gh-msg-select-check").forEach(e=>e.remove()),document.querySelectorAll(".gh-msg-select-turn").forEach(e=>{e.classList.remove("gh-msg-select-turn","gh-msg-selected")}))}scheduleSync(){this._syncTimer||(this._syncTimer=setTimeout(()=>{this._syncTimer=null,this.syncTurns()},300))}findTurns(){return this.adapter.getChatMessages().filter(e=>["user","assistant"].includes(this.adapter.getMessageRole(e)))}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}refreshContext(){(this.route!==location.pathname||this.main!==this.adapter.getChatContainer())&&(this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.clearSelection()),this.syncTurns(),this.notify()}syncTurns(){if(!this._started)return;(this.route!==location.pathname||this.main!==this.adapter.getChatContainer())&&(this.route=location.pathname,this.main=this.adapter.getChatContainer(),this.clearSelection()),this.findTurns().forEach((t,n)=>{const a=this.adapter.getMessageIdentity(t,n),o=this.selections.some(s=>s.id===a);t.classList.toggle("gh-msg-selected",o);const i=t.querySelector(":scope > .gh-msg-select-check");if(i&&(i.classList.toggle("checked",o),i.setAttribute("aria-pressed",String(o))),!t.querySelector(":scope > .gh-msg-select-check"))try{t.classList.add("gh-msg-select-turn");const s=d("button",{className:"gh-msg-select-check",type:"button",title:this.t("selectMessageTitle"),"aria-label":this.t("selectMessageTitle"),"aria-pressed":String(o),"data-gh-owned":"selection"});s.appendChild(j("check",{size:11})),s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),this.toggle(t,s)}),t.insertAdjacentElement("afterbegin",s)}catch{}}),this.updateToolbar()}toggle(e,t){const n=this.findTurns().indexOf(e),a=Pt(this.adapter,e,n),o=this.selections.findIndex(i=>i.id===a.id);o!==-1?(this.selections.splice(o,1),e.classList.remove("gh-msg-selected"),t&&(t.classList.remove("checked"),t.setAttribute("aria-pressed","false"))):(this.selections.push(a),e.classList.add("gh-msg-selected"),t&&(t.classList.add("checked"),t.setAttribute("aria-pressed","true"))),this.updateToolbar(),this.notify()}clearSelection(){this.selections=[],document.querySelectorAll(".gh-msg-select-turn.gh-msg-selected").forEach(e=>{e.classList.remove("gh-msg-selected");const t=e.querySelector(":scope > .gh-msg-select-check");t&&(t.classList.remove("checked"),t.setAttribute("aria-pressed","false"))}),this.updateToolbar(),this.notify()}getConversationTitle(){return this.adapter.getSessionName()||"ChatGPT"}collectSelectedMessages(){const e=new Map(this.findTurns().map((t,n)=>[this.adapter.getMessageIdentity(t,n),t]));return this.selections.map(t=>e.has(t.id)?Pt(this.adapter,e.get(t.id),t.order):t).sort((t,n)=>t.order-n.order)}formatToMarkdown(e,t,n){const a=[`# ${e}`,""];return a.push(`> ${this.t("exportTimeLabel")}: ${n}`),a.push(""),t.forEach((o,i)=>{const s=o.role==="user"?`## \u{1F9D1} ${this.t("userRole")}`:"## \u{1F916} ChatGPT";a.push(s),a.push(""),a.push(o.content),i<t.length-1&&a.push("")}),a.join(`
`)}formatToTxt(e,t,n){const a=[`=== ${e} (${n}) ===`,""];return t.forEach(o=>{const i=o.role==="user"?`[${this.t("userRole")}]`:"[ChatGPT]";a.push(i),a.push(o.content),a.push("")}),a.join(`
`)}formatToJson(e,t,n){return JSON.stringify({title:e,exportedAt:n,source:window.location&&window.location.href?window.location.href:"",messages:t.map(({role:a,content:o})=>({role:a,content:o}))},null,2)}sanitizeFilename(e){return String(e||"conversation").replace(/[\\/:*?"<>|\r\n]+/g,"_").replace(/\s+/g," ").trim().slice(0,80)||"conversation"}downloadFile(e,t,n){const a=new Blob([e],{type:n}),o=URL.createObjectURL(a),i=d("a",{href:o,download:t});document.body.appendChild(i),i.click(),setTimeout(()=>{i.remove(),URL.revokeObjectURL(o)},1e3)}exportSelected(e){const t=this.collectSelectedMessages();if(t.length===0){this.showToast(this.t("selectedExportEmpty"));return}const n=this.getConversationTitle(),a=new Date().toLocaleString(),o=new Date().toISOString().slice(0,10),i=`${this.sanitizeFilename(n)}-${o}`;try{e==="md"?this.downloadFile(this.formatToMarkdown(n,t,a),`chatgpt-helper-${i}.md`,"text/markdown"):e==="json"?this.downloadFile(this.formatToJson(n,t,a),`chatgpt-helper-${i}.json`,"application/json"):this.downloadFile(this.formatToTxt(n,t,a),`chatgpt-helper-${i}.txt`,"text/plain"),this.showToast(this.t("selectedExported"))}catch(s){console.error("[ChatGPT Helper] \u5BFC\u51FA\u6240\u9009\u6D88\u606F\u5931\u8D25:",s),this.showToast(this.t("exportFailed"))}}async copySelected(){const e=this.collectSelectedMessages();if(e.length===0){this.showToast(this.t("selectedExportEmpty"));return}const t=this.getConversationTitle(),n=this.formatToMarkdown(t,e,new Date().toLocaleString()),a=await wt(n);this.showToast(a?this.t("selectedCopied"):this.t("copyFailed"))}ensureToolbar(){if(this.toolbar&&this.toolbar.isConnected)return this.toolbar;this.toolbar=d("div",{id:"chatgpt-helper-msg-select-toolbar",className:"gh-msg-select-toolbar",role:"toolbar","aria-label":"ChatGPT Helper message export","data-gh-owned":"selection"});const e=d("span",{className:"gh-msg-select-toolbar-count"});this.toolbar.appendChild(e);const t=(a,o,i="")=>{const s=d("button",{className:`gh-msg-select-toolbar-btn ${i}`,type:"button"},a);return s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),o()}),s};this.toolbar.appendChild(t(this.t("exportSelectedImage"),()=>this.onImageExport?.())),this.toolbar.appendChild(t(this.t("exportSelectedMarkdown"),()=>this.exportSelected("md"))),this.toolbar.appendChild(t(this.t("exportSelectedJson"),()=>this.exportSelected("json"))),this.toolbar.appendChild(t(this.t("exportSelectedTxt"),()=>this.exportSelected("txt"))),this.toolbar.appendChild(t(this.t("copySelectedMessages"),()=>{this.copySelected()},"secondary")),this.toolbar.appendChild(t(this.t("clearSelection"),()=>this.clearSelection(),"secondary"));const n=d("button",{className:"gh-msg-select-toolbar-close",type:"button",title:this.t("clearSelection"),"aria-label":this.t("clearSelection")});return n.appendChild(j("close",{size:12})),n.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.clearSelection()}),this.toolbar.appendChild(n),document.body.appendChild(this.toolbar),this.toolbar}removeToolbar(){this.toolbar&&this.toolbar.parentNode&&this.toolbar.parentNode.removeChild(this.toolbar),this.toolbar=null}updateToolbar(){const e=this.selections.length;if(e===0){this.toolbar&&this.toolbar.classList.remove("open");return}const t=this.ensureToolbar(),n=t.querySelector(".gh-msg-select-toolbar-count");n&&(n.textContent=(this.t("selectedMessagesCount")||"{count} selected").replace("{count}",String(e))),t.classList.add("open")}}class Sr{constructor(e,t,n){this.adapter=e,this.settings=t,this.showToast=n||(()=>{}),this.lastSessionName=null,this.intervalId=null,this.isRunning=!1,this.aiState="idle",this.lastAiState="idle",this.generationObserver=null,this.observerTarget=null,this.notificationAudioContext=null,this.notificationAudioUnlocked=!1,this.pendingNotificationTone=!1,this.notificationUnlockHandler=null}start(){if(this.isRunning)return;this.isRunning=!0,this.updateTabName(),this.settings.tabSettings?.notificationSound&&this.ensureNotificationAudioUnlock();const e=3e3;this.intervalId=setInterval(()=>{if(this.updateTabName(),this.generationObserver){const t=this.adapter.getResponseContainer();t&&t!==this.observerTarget&&(this.generationObserver.observe(t,{childList:!0,subtree:!0,characterData:!0}),this.observerTarget=t)}},e),this.startGenerationObserver()}stop(){this.isRunning&&(this.isRunning=!1,this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.generationObserver&&(this.generationObserver.disconnect(),this.generationObserver=null),this.observerTarget=null,this.teardownNotificationAudioUnlock())}restartInterval(){if(this.isRunning&&this.intervalId){clearInterval(this.intervalId);const e=3e3;this.intervalId=setInterval(()=>this.updateTabName(),e)}}startGenerationObserver(){if(this.generationObserver)return;const e=this.adapter.getResponseContainer();e&&(this.generationObserver=new MutationObserver(()=>{const t=this.adapter.isGenerating();t&&this.aiState!=="generating"?(this.aiState="generating",this.updateTabName()):!t&&this.aiState==="generating"&&this.onAiComplete()}),this.generationObserver.observe(e,{childList:!0,subtree:!0,characterData:!0}),this.observerTarget=e)}onAiComplete(){const e=this.aiState==="generating";this.aiState="completed",e&&this.sendCompletionNotification(),this.updateTabName(!0)}sendCompletionNotification(){const e=this.settings.tabSettings||{};e.notificationSound&&this.playNotificationSound(e.notificationVolume||.5)}ensureNotificationAudioUnlock(){this.notificationUnlockHandler||(this.notificationUnlockHandler=()=>{this.unlockNotificationAudio().then(e=>{e&&this.pendingNotificationTone&&(this.pendingNotificationTone=!1,this.playNotificationSound(this.settings.tabSettings?.notificationVolume||.5))})},["pointerdown","keydown","touchstart"].forEach(e=>{window.addEventListener(e,this.notificationUnlockHandler,{passive:!0,capture:!0})}))}teardownNotificationAudioUnlock(){this.notificationUnlockHandler&&(["pointerdown","keydown","touchstart"].forEach(e=>{window.removeEventListener(e,this.notificationUnlockHandler,{capture:!0})}),this.notificationUnlockHandler=null)}getNotificationAudioContext(){if(this.notificationAudioContext)return this.notificationAudioContext;const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;try{return this.notificationAudioContext=new e,this.notificationAudioContext}catch(t){return console.warn("[ChatGPT Helper] Failed to create AudioContext:",t),null}}async unlockNotificationAudio(){const e=this.getNotificationAudioContext();if(!e)return!1;try{e.state==="suspended"&&await e.resume();const t=e.createGain();t.gain.value=1e-4,t.connect(e.destination);const n=e.createOscillator(),a=e.currentTime;return n.type="sine",n.frequency.value=440,n.connect(t),n.start(a),n.stop(a+.01),this.notificationAudioUnlocked=e.state==="running",this.notificationAudioUnlocked&&this.teardownNotificationAudioUnlock(),this.notificationAudioUnlocked}catch(t){return console.warn("[ChatGPT Helper] Failed to unlock notification sound:",t),!1}}async playNotificationSound(e=.5){const t=Math.max(.1,Math.min(1,Number(e)||.5));this.ensureNotificationAudioUnlock();const n=this.getNotificationAudioContext();if(!n)return this.pendingNotificationTone=!0,!1;if(!await this.unlockNotificationAudio())return this.pendingNotificationTone=!0,!1;try{const o=n.currentTime+.01,i=n.createGain();i.gain.setValueAtTime(1e-4,o),i.gain.exponentialRampToValueAtTime(Math.max(.02,t*.08),o+.01),i.gain.exponentialRampToValueAtTime(1e-4,o+.34),i.connect(n.destination);const s=n.createOscillator();s.type="sine",s.frequency.setValueAtTime(880,o),s.connect(i),s.start(o),s.stop(o+.11);const l=n.createOscillator();return l.type="triangle",l.frequency.setValueAtTime(1320,o+.14),l.connect(i),l.start(o+.14),l.stop(o+.32),this.pendingNotificationTone=!1,!0}catch(o){return console.warn("[ChatGPT Helper] Failed to play notification sound:",o),this.pendingNotificationTone=!0,!1}}togglePrivacyMode(){const e=this.settings.tabSettings||{};return e.privacyMode=!e.privacyMode,this.settings.tabSettings=e,this.updateTabName(!0),e.privacyMode}updateTabName(e=!1){const t=this.settings.tabSettings||{};if(t.privacyMode){document.title=t.privacyTitle||"ChatGPT";return}const n=this.getCleanSessionName(t),a=this.isGenerating(),o=t.showStatus!==!1?a?"\u23F3 ":"\u2705 ":"",i=t.titleFormat||"{status}{title}",s=i.includes("{model}")&&this.adapter.getModelName?this.adapter.getModelName():"";let l=i.replace("{status}",o).replace("{title}",n||"ChatGPT").replace("{model}",s?`[${s}] `:"").replace(/\s+/g," ").trim();l&&(e||l!==document.title)&&(document.title=l)}getCleanSessionName(e){if(this.adapter.isNewConversation&&this.adapter.isNewConversation())return this.lastSessionName=null,null;let t=this.adapter.getSessionName?this.adapter.getSessionName():null;return t&&!(a=>a?!!(/^(?:\u23f3|\u2705)\s*/u.test(a)||/^[⏳✅]/.test(a)||/\[[\w\s.]+\]/.test(a)||a===(e.privacyTitle||"ChatGPT")):!1)(t)?(this.lastSessionName=t,t):this.lastSessionName}isGenerating(){return this.aiState==="completed"?!1:this.aiState==="generating"||(this.adapter.isGenerating?this.adapter.isGenerating():!1)}}function Nt(r,e){return e.throwIfAborted(),new Promise((t,n)=>{const a=()=>n(e.reason||new DOMException("Cancelled","AbortError"));e.addEventListener("abort",a,{once:!0}),r.then(o=>{e.removeEventListener("abort",a),t(o)},o=>{e.removeEventListener("abort",a),n(o)})})}class ze extends Error{constructor(e,t,n=0){super(t),this.name="BackendError",this.status=e,this.retryAfterMs=n}}class Bt{constructor({origin:e=location.origin,fetcher:t=(...o)=>fetch(...o),cookie:n=()=>document.cookie,timeout:a=3e4}={}){this.origin=e,this.fetcher=t,this.cookie=n,this.timeout=a,this.session=null,this.sessionFlight=null,this.account=null}workspace(){return this.cookie().split(";").map(e=>e.trim()).find(e=>e.startsWith("_account="))?.slice(9)||""}async token(){if(this.session&&this.session.expires>Date.now()+6e4)return this.session.token;if(!this.sessionFlight){const e=new AbortController,t=setTimeout(()=>e.abort(new DOMException("Session request timed out","TimeoutError")),this.timeout),n=this.fetcher(`${this.origin}/api/auth/session`,{credentials:"include",signal:e.signal}).then(async a=>{if(!a.ok)throw new ze(a.status,`Session request failed (${a.status})`);const o=await Nt(a.json(),e.signal);if(typeof o.accessToken!="string"||!o.accessToken)throw new ze(401,"ChatGPT session is unavailable");return this.session={token:o.accessToken,expires:Date.parse(o.expires)||Date.now()+36e5},o.accessToken}).finally(()=>{clearTimeout(t),this.sessionFlight===n&&(this.sessionFlight=null)});this.sessionFlight=n}return this.sessionFlight}async accountId(e,t){if(!e)return null;if(this.account?.workspace===e)return this.account.id;const a=(await this.json("/accounts/check/v4-2023-04-27",{signal:t},!1))?.accounts?.[e]?.account?.account_id;if(!a)throw new ze(409,"ChatGPT workspace changed; refresh before exporting");return this.account={workspace:e,id:a},a}async request(e,t={},n=!0,a=o=>o){const o=new URL(e.startsWith("/backend-api/")?e:`/backend-api${e}`,this.origin);if(o.origin!==this.origin||!o.pathname.startsWith("/backend-api/"))throw new TypeError("Invalid backend path");const i=this.workspace(),s=new AbortController,l=()=>s.abort(t.signal?.reason);t.signal?.aborted?l():t.signal?.addEventListener("abort",l,{once:!0});const h=setTimeout(()=>s.abort(new DOMException("Request timed out","TimeoutError")),this.timeout);try{for(let p=0;p<2;p++){s.signal.throwIfAborted();let c;try{c=await Nt(this.token(),s.signal)}catch{if(s.signal.aborted)throw s.signal.reason}s.signal.throwIfAborted();const u=n?await this.accountId(i,s.signal):null;if(s.signal.throwIfAborted(),i!==this.workspace())throw new ze(409,"ChatGPT workspace changed during the request");const g={...t.headers,...c?{Authorization:`Bearer ${c}`,"X-Authorization":`Bearer ${c}`}:{},...u?{"Chatgpt-Account-Id":u}:{}},v=await this.fetcher(o.href,{...t,credentials:"include",headers:g,signal:s.signal});if(i!==this.workspace())throw new ze(409,"ChatGPT workspace changed during the request");if(v.status!==401||p===1)return await Nt(Promise.resolve().then(()=>a(v)),s.signal);this.session=null}}finally{clearTimeout(h),t.signal?.removeEventListener("abort",l)}}async json(e,t={},n=!0){return this.request(e,t,n,async a=>{if(!a.ok){const o=a.headers?.get("Retry-After"),i=o==null?NaN:Number(o),s=Number.isFinite(i)?Math.max(0,i*1e3):Math.max(0,Date.parse(o)-Date.now())||3e4;throw new ze(a.status,`ChatGPT request failed (${a.status})`,a.status===429?s:0)}return a.json()})}}class Tr{constructor(e=new Bt){this.client=e,this.textarea=null,this.lastResponseContainer=null,this.anonymousMessages=new WeakMap,this.nextAnonymousId=0,this.findTextarea()}findTextarea(){this.textarea=null;const e=this.getChatContainer();if(!e)return;const t=['[data-composer-markdown][contenteditable="true"]',"#prompt-textarea",'textarea[placeholder*="Message"]','textarea[placeholder*="\u6D88\u606F"]','textarea[data-id="root"]','div[contenteditable="true"][role="textbox"]','div[contenteditable="true"]',"textarea"];for(const n of t){const a=Array.from(e.querySelectorAll(n)).find(o=>!o.closest('[data-oai-writing-block-surface], [id^="chatgpt-helper"], [data-app-shell-active-page="false"], [hidden], [inert]')&&o.getClientRects().length>0&&getComputedStyle(o).visibility!=="hidden");if(a){this.textarea=a;return}}}getSidebarContainer(){return document.querySelector('nav[aria-label*="Chat history"]')||document.querySelector('nav[aria-label*="\u804A\u5929\u5386\u53F2"]')||document.querySelector('aside[aria-label*="Chat history"]')||document.querySelector('aside[aria-label*="\u804A\u5929\u5386\u53F2"]')||document.querySelector('[data-testid="sidebar"]')||document.querySelector("nav")||document.querySelector("aside")}getChatContainer(){const e=Array.from(document.querySelectorAll('main, [role="main"]')).filter(a=>!a.closest('[data-app-shell-active-page="false"], [hidden]')),t=e.filter(a=>a.closest('[data-app-shell-active-page="true"]')),n=a=>a.getClientRects().length>0&&getComputedStyle(a).visibility!=="hidden";return t.find(n)||t[0]||e.find(n)||null}getMessageRole(e){const n=(e?.getAttribute("data-content-search-unit-key")||e?.getAttribute("data-chatgpt-search-unit-key"))?.split(":").pop();return n==="user"||n==="assistant"?n:e?.getAttribute("data-message-author-role")||e?.closest('[data-turn="user"], [data-turn="assistant"]')?.getAttribute("data-turn")||e?.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||(e?.matches("[data-user-message-bubble]")||e?.querySelector('[data-user-message-bubble], [data-conversation-role="user"]')?"user":null)||(e?.matches("[data-chatgpt-selection-message-id]")||e?.querySelector('[data-conversation-role="assistant"], [data-markdown-text-style="assistant-message"], .markdown, .prose')?"assistant":null)}getMessageContent(e){return this.getMessageRole(e)==="user"?e?.querySelector("[data-user-message-bubble] .whitespace-pre-wrap, [data-user-message-bubble]")||e:e?.querySelector('[data-markdown-text-style="assistant-message"], .markdown, .prose, [data-message-content]')||e}getMessageIdentity(e){return e.getAttribute("data-message-id")||e.getAttribute("data-chatgpt-selection-message-id")||e.querySelector("[data-message-id]")?.getAttribute("data-message-id")||e.querySelector("[data-chatgpt-selection-message-id]")?.getAttribute("data-chatgpt-selection-message-id")||this.getMessageSlot(e)||this.getAnonymousMessageId(e)}getMessageSlot(e){const t=e.closest("[data-turn-key]")?.getAttribute("data-turn-key"),n=e.getAttribute("data-content-search-unit-key")||e.getAttribute("data-chatgpt-search-unit-key"),a=e.closest('[data-testid^="conversation-turn-"]')?.getAttribute("data-testid");return t||n||a?`${t||""}:${n||a||this.getMessageRole(e)}`:null}getAnonymousMessageId(e){return this.anonymousMessages.has(e)||this.anonymousMessages.set(e,`anonymous-${++this.nextAnonymousId}`),this.anonymousMessages.get(e)}getMessageTurnNumber(e){const t=e.closest('[data-testid^="conversation-turn-"]')?.dataset.testid,n=e.getAttribute("data-content-search-unit-key")||e.getAttribute("data-chatgpt-search-unit-key"),a=t?.match(/^conversation-turn-(\d+)$/)||n?.match(/^(?:fallback-)?turn-(\d+):/)||e.closest("[data-turn-key]")?.dataset.turnKey.match(/^(?:fallback-)?turn-(\d+)$/);return a?Number(a[1]):null}getUserOutlineContent(e){const t=this.getMessageContent(e),n=e.closest('[data-turn="user"], [data-testid^="conversation-turn-"]'),o=n&&!n.querySelector('[data-message-author-role="assistant"], [data-turn="assistant"], [data-content-search-unit-key$=":assistant"], [data-chatgpt-search-unit-key$=":assistant"]')?n:e,i=Array.from(o.querySelectorAll('img, [role="img"]')).filter(l=>!l.closest('[hidden], [aria-hidden="true"], .sr-only, [data-gh-owned], [data-testid*="avatar" i]')&&!l.parentElement?.closest('[role="img"]')),s=this.getMessageBodyText(t);return{element:s?t:i[0],text:s,imageCount:i.length}}getMessageBodyText(e){const t='button, [role="button"], [hidden], [aria-hidden="true"], .sr-only, [data-gh-owned], .gh-msg-select-check, img, [role="img"]';let n=e.innerText||e.textContent;if(e.querySelector(t)){const a=e.cloneNode(!0);a.querySelectorAll(t).forEach(o=>o.remove()),a.querySelectorAll("br, p, div").forEach(o=>o.append(" ")),n=a.textContent}return n.trim()}isScrollableOverflowValue(e){return e==="auto"||e==="scroll"||e==="overlay"}hasScrollableOverflow(e){return e?this.isScrollableOverflowValue(e.overflowY)||this.isScrollableOverflowValue(e.overflow):!1}isScrollableCandidate(e){if(!e||!e.isConnected||e.clientHeight<=0||e.getClientRects().length===0)return!1;const t=window.getComputedStyle(e);return e.scrollHeight>e.clientHeight&&this.hasScrollableOverflow(t)}canScrollElement(e){return this.isScrollableCandidate(e)}cacheResponseContainer(e){return e&&e.isConnected&&(this.lastResponseContainer=e),e}getCachedResponseContainer(){return this.lastResponseContainer?!this.getChatContainer()?.contains(this.lastResponseContainer)||!this.isScrollableCandidate(this.lastResponseContainer)?(this.lastResponseContainer=null,null):this.lastResponseContainer:null}insertPrompt(e){let t=this.textarea;if(!t&&(this.findTextarea(),t=this.textarea,!t))return console.warn("[ChatGPT Helper] \u672A\u627E\u5230\u8F93\u5165\u6846"),!1;if(!t.isConnected&&(this.textarea=null,this.findTextarea(),t=this.textarea,!t))return!1;try{if(t.contentEditable==="true"||t.getAttribute("contenteditable")==="true"){t.focus();const n=window.getSelection(),a=document.createRange();a.selectNodeContents(t),a.collapse(!1),n.removeAllRanges(),n.addRange(a),document.execCommand("insertText",!1,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}else t.tagName==="TEXTAREA"?(t.focus(),t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))):(t.textContent=e,t.dispatchEvent(new Event("input",{bubbles:!0})));return!0}catch(n){return console.error("[ChatGPT Helper] \u63D2\u5165\u63D0\u793A\u8BCD\u5931\u8D25:",n),!1}}getResponseContainer(){const e=this.getCachedResponseContainer();if(e)return e;const t=this.getChatContainer(),n=this.getChatMessages()[0];let a=null;for(let i=n?.parentElement||t;i;i=i.parentElement)if(i.clientHeight>0&&this.hasScrollableOverflow(window.getComputedStyle(i))){if(i.scrollHeight>i.clientHeight)return this.cacheResponseContainer(i);a||(a=i)}if(t){const i=t.querySelectorAll('[data-scroll-root], [class*="overflow-y-auto"], [class*="overflow-auto"]');for(const s of i)if((!n||s.contains(n))&&s.clientHeight>0&&this.hasScrollableOverflow(window.getComputedStyle(s))){if(s.scrollHeight>s.clientHeight)return this.cacheResponseContainer(s);a||(a=s)}}const o=document.scrollingElement||document.documentElement;return o.scrollHeight>o.clientHeight?o:a||o}getChatMessages(){const e=this.getChatContainer();if(!e)return[];const t="[data-message-author-role]",n="[data-content-search-unit-key], [data-chatgpt-search-unit-key]",a='[data-testid^="conversation-turn-"], [data-turn="user"], [data-turn="assistant"]',o=`${t}, ${n}, [data-chatgpt-selection-message-id], ${a}, [data-user-message-bubble]`;return Array.from(e.querySelectorAll(o)).filter(i=>i.closest("#chatgpt-helper-right, [data-gh-owned]")||i.closest('[hidden], [aria-hidden="true"]')?!1:i.matches("[data-user-message-bubble]")&&!i.matches(`${t}, ${n}, [data-chatgpt-selection-message-id], ${a}`)?!i.parentElement?.closest(o)&&!i.querySelector(t):i.hasAttribute("data-message-author-role")?!i.parentElement?.closest("[data-message-author-role]"):i.matches(n)?!i.querySelector(t)&&!i.parentElement?.closest(n)&&!!this.getMessageRole(i):i.matches("[data-chatgpt-selection-message-id]")?!i.querySelector(t)&&!i.parentElement?.closest(`${n}, ${t}, [data-chatgpt-selection-message-id]`):!i.querySelector(`${t}, ${n}, [data-chatgpt-selection-message-id], ${a}`)&&!i.parentElement?.closest(`${t}, ${n}, [data-chatgpt-selection-message-id]`)&&!!this.getMessageRole(i))}getSessionName(){let e=document.title;if(e&&(e=e.replace(/^[⏳✅]\s*/,"").trim(),e=e.replace(/^\[[\w\s.]+\]\s*/,"").trim(),e&&e!=="ChatGPT"&&e!=="New Chat"))return e;const t=this.getSidebarContainer();if(t){const o=t.querySelector('[aria-current="page"], [data-active="true"], .active');if(o){const i=o.textContent?.trim();if(i&&i!=="New Chat"&&i!=="\u65B0\u5BF9\u8BDD")return i}}const a=window.location.href.match(/\/c\/([a-zA-Z0-9-]+)/);return a?`Chat ${a[1].substring(0,8)}`:null}getModelName(){const e=["[data-model]",'[aria-label*="model"]','[title*="model" i]','select[aria-label*="model" i]',".model-selector",'[class*="model"]'];for(const t of e){const n=document.querySelector(t);if(n){const a=n.getAttribute("data-model")||n.getAttribute("aria-label")||n.getAttribute("title")||n.textContent?.trim();if(a&&a.length<50)return a.replace(/model\s*:?\s*/i,"").trim()}}return null}getBackendApiBaseUrl(){return`${this.client.origin}/backend-api`}fetchBackendJson(e,t={}){const n=new URL(e,this.client.origin);if(n.origin!==this.client.origin)throw new TypeError("Invalid backend origin");return this.client.json(n.pathname+n.search,t)}parseConversationTimestamp(e){if(!e)return null;if(typeof e=="number")return e<1e12?e*1e3:e;const t=Date.parse(e);return Number.isNaN(t)?null:t}normalizeConversationApiItem(e){if(!e||!e.id||e.is_archived||e.is_temporary_chat)return null;const t=this.parseConversationTimestamp(e.create_time),n=this.parseConversationTimestamp(e.update_time)||t,a=(e.title||"").trim()||re("untitledConversation"),o=new URL(`/c/${e.id}`,window.location.origin).href;return{id:e.id,title:a,url:o,isPinned:!!(e.is_starred||e.pinned_time),createdAt:t,updatedAt:n}}async fetchConversationListFromApi(e=1e3,t=100,n){const a=[];let o=0;const i=new Set;let s=0;for(;a.length<e&&s++<Math.ceil(e/t)+10;){n?.throwIfAborted();const l=Math.min(t,e-a.length),h=new URL(`${this.getBackendApiBaseUrl()}/conversations`);h.searchParams.set("offset",String(o)),h.searchParams.set("limit",String(l));const p=await this.fetchBackendJson(h.href,{signal:n}),c=Array.isArray(p?.items)?p.items:[];if(c.length===0)break;const u=c.filter(f=>f?.id&&!i.has(f.id));if(!u.length)break;u.forEach(f=>{i.add(f.id);const S=this.normalizeConversationApiItem(f);S&&a.length<e&&a.push(S)}),o+=c.length;const g=typeof p.total=="number"?p.total:null,v=typeof p.limit=="number"?p.limit:l;if(g!==null&&o>=g||c.length<v)break}return a}async getConversationList(e={}){try{const t=await this.fetchConversationListFromApi(e.maxConversations||1e3,e.pageSize||100,e.signal);if(t.length>0)return t;console.warn("[ChatGPT Helper] API \u672A\u8FD4\u56DE\u5386\u53F2\u4F1A\u8BDD\uFF0C\u56DE\u9000\u5230\u4FA7\u8FB9\u680F DOM \u626B\u63CF")}catch(t){e.signal?.throwIfAborted(),console.warn("[ChatGPT Helper] API \u52A0\u8F7D\u5386\u53F2\u4F1A\u8BDD\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u4FA7\u8FB9\u680F DOM \u626B\u63CF:",t)}return this.getConversationListFromDom()}getConversationListFromDom(){const e=this.getSidebarContainer();if(!e)return[];const t=[],n=new Set,a=['a[href^="/c/"]','a[href*="/c/"]','a[href^="/chat/"]','a[href*="/chat/"]','[data-testid*="history"] a[href*="/c/"]','[data-testid*="conversation"] a[href*="/c/"]','[class*="conversation"] a[href*="/c/"]','nav a[href*="/c/"]','aside a[href*="/c/"]',"nav a","aside a",'[class*="conversation"] a','[data-testid*="conversation"] a'];let o=[];for(const i of a)if(o=Array.from(e.querySelectorAll(i)),o.length>0)break;return o.forEach(i=>{const s=i.getAttribute("href");if(!s)return;const l=s.match(/\/c\/([^\/\?]+)/)||s.match(/\/chat\/([^\/\?]+)/);if(!l)return;const h=l[1];if(n.has(h))return;n.add(h);const p=(i.innerText||i.textContent||"").trim().replace(/\s+/g," ")||re("untitledConversation"),c=new URL(s,window.location.origin).href,u=typeof i.closest=="function"?i.closest.bind(i):()=>null,g=u('[class*="pinned"]')!==null||u('[data-pinned="true"]')!==null||i.getAttribute("data-pinned")==="true";let v=null;try{const f=i.querySelector("time[datetime]")||i.closest("li, div, article, section")?.querySelector("time[datetime]");if(f){const S=f.getAttribute("datetime")||f.dateTime,k=Date.parse(S);Number.isNaN(k)||(v=k)}}catch{}t.push({id:h,title:p,url:c,isPinned:g,updatedAt:v})}),t}getSiteId(){return"chatgpt"}extractUserQueryText(e){return e?(e.textContent||e.innerText||"").trim():""}getScrollContainer(){return this.getResponseContainer()}isGenerating(){const e=document.querySelector('button[aria-label*="Stop" i], button[aria-label*="\u505C\u6B62" i], button[data-testid*="stop" i]');if(e&&e.offsetParent!==null)return!0;const t=['[class*="loading"]','[class*="generating"]','[role="progressbar"]','[data-testid*="loading" i]','[aria-busy="true"]'];for(const n of t){const a=document.querySelector(n);if(a&&a.offsetParent!==null)return!0}return!1}}const En=window.__MY_EXT__=window.__MY_EXT__||{};class Mn{constructor(){this.scope=new Je,this.backend=new Bt,this.adapter=new Tr(this.backend),At(Ue()),this.lang=Ue(),this.t=re,this.settings=this.loadSettings(),this.prompts=this.loadPrompts(),this.isCollapsed=!this.settings.defaultPanelState,this.currentTab=this.settings.tabOrder[0]||"prompts",this.selectedCategory=re("allCategory"),this.searchQuery="",this.selectedPrompt=null,this.savedAnchorTop=null,this.hasAnchor=!1,this.panel=null,this.outlineManager=null;const e=t=>this.showToast(t);this.scrollManager=new cr(this.adapter),this.historyLoader=new pr(this.scrollManager,e,re),this.anchorManager=new dr(this.scrollManager,e),this.anchorManager.bindUI(t=>{this.hasAnchor=t,this.updateAnchorButton()}),this.readingProgressManager=new gr(this.settings,this.scrollManager,this.adapter,e),this.copyManager=new kr(this.settings,e,re),this.tabRenameManager=new Sr(this.adapter,this.settings,e),this.promptQuickMenu=new xr({getPrompts:()=>this.prompts,isEnabled:()=>this.settings.promptQuickMenuEnabled!==!1,t:t=>this.t(t),onInsert:t=>this.usePrompt(t,{replaceComposer:!0})}),this.messageSelectManager=new Cr({adapter:this.adapter,t:t=>this.t(t),onToast:e,onImageExport:()=>this.openImageExport()}),this.scrollLockManager=new Lt(this.adapter),this.scrollManager.lockManager=this.scrollLockManager,this.widthStyleManager=new ur(this.adapter,this.settings.pageWidth),this.currentEffectiveTheme="light",this.themeAssetRepository=new Et,this.themeBackgroundObjectUrl=null,this.themeBackgroundObjectAssetId=null,this.themeRuntimeStyleReady=!1,this.themeHostRefreshQueued=!1,En.getThemeDiagnostics=()=>this.collectThemeDiagnostics(),this.scope.listen(window,"pagehide",t=>{this.themeSettingSaveTimer&&(clearTimeout(this.themeSettingSaveTimer),this.themeSettingSaveTimer=null,this.saveSettings()),t.persisted||this.destroy()}),this.ready=this.init(),this.ready.catch(t=>console.error("[ChatGPT Helper] \u521D\u59CB\u5316\u5931\u8D25:",t))}runFeature(e,t){try{return Promise.resolve(t()).catch(n=>console.error("[ChatGPT Helper] "+e,n))}catch(n){return console.error("[ChatGPT Helper] "+e,n),Promise.resolve()}}destroy(){if(!this.destroyed){this.destroyed=!0,this.onboardingTour?.destroy({restore:!1}),this.themeBackgroundRevision=(this.themeBackgroundRevision||0)+1,this.disposeExporter?.(),this.scope.dispose(),this.pageScope?.dispose(),this.themeScope?.dispose();for(const e of["tabSpacingObserver","panelSpacingObserver","headerSpacingObserver","scrollNavObserver","promptsResponsiveObserver"])this[e]?.disconnect();this.themeObserver?.disconnect(),this.stopThemeHostWatchdog(),this.stopSystemThemeListener(),this.closeThemeSettingsModal(),this.closeAboutModal?.(),this.revokeThemeBackgroundObjectUrl(),this.scrollManager.cancel(),this.historyLoader.abort(),this.readingProgressManager.stopRecording(),this.readingProgressManager.cancelRestore?.(),this.scrollLockManager.setEnabled(!1),this.outlineManager?.destroy(),this.outlineIndex?.controller.abort(),this.copyManager.destroy(),this.tabRenameManager.stop(),this.promptQuickMenu.destroy(),this.messageSelectManager.stop(),this.conversationManager?.destroy(),this.panelMessageHandler&&_e()?.onMessage?.removeListener(this.panelMessageHandler)}}}const Ar=["prompts","outline","conversations","export"],Ln={enabled:!1,value:1200,unit:"px"},In=r=>{const e=Array.isArray(r)?r.filter(n=>Ar.includes(n)):[],t=Array.from(new Set(e));return t.length>0?t:[...Ar]},Pn=r=>{const e=Array.isArray(r)?r:[],t=Array.from(new Set(e.map(n=>n?.id).filter(n=>Pe[n])));return Ge.forEach(n=>{t.includes(n.id)||t.push(n.id)}),t.map(n=>({id:n,enabled:!0}))},Nn={loadPrompts(){const e=new Set(["default_1","default_2"]),t=window.GM_getValue(J.PROMPTS,null);if(!Array.isArray(t))return window.GM_setValue(J.PROMPT_LIBRARY_VERSION,3),Qe();if((Number(window.GM_getValue(J.PROMPT_LIBRARY_VERSION,1))||1)>=3)return t;const a=t.filter(l=>!e.has(l?.id)),o=new Set(a.map(l=>l?.id).filter(Boolean)),i=Qe().filter(l=>l.id&&!o.has(l.id)),s=i.length>0?[...a,...i]:a;return window.GM_setValue(J.PROMPT_LIBRARY_VERSION,3),(i.length>0||a.length!==t.length)&&window.GM_setValue(J.PROMPTS,s),s},savePrompts(){window.GM_setValue(J.PROMPTS,this.prompts)},normalizeRuntimeSettings(r={}){const e=r&&typeof r=="object"?r:{},t={...lt,panelWidth:Math.max(We,Math.min(ht,parseInt(e.panelWidth)||lt.panelWidth)),defaultPanelState:e.defaultPanelState!==void 0?!!e.defaultPanelState:lt.defaultPanelState,preventAutoScroll:!!e.preventAutoScroll,prompts:{enabled:!0},promptSortMode:["manual","recent","frequent"].includes(e.promptSortMode)?e.promptSortMode:"manual",promptQuickMenuEnabled:e.promptQuickMenuEnabled!==!1,outline:{enabled:!0,showUserQueries:e.outline?.showUserQueries!==!1,autoUpdate:!0,syncScroll:e.outline?.syncScroll!==!1,updateInterval:2,maxLevel:6},conversations:{enabled:!0},pageWidth:{...Ln},tabOrder:In(e.tabOrder),collapsedButtonsOrder:Pn(e.collapsedButtonsOrder),anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,readingHistory:{persistence:e.readingHistory?.persistence!==!1,autoRestore:!!e.readingHistory?.autoRestore,cleanupDays:30},formulaCopy:{enabled:e.formulaCopy?.enabled!==!1},tableCopy:{enabled:e.tableCopy?.enabled!==!1},tabSettings:{enabled:e.tabSettings?.enabled!==!1,showStatus:e.tabSettings?.showStatus!==!1,notificationSound:!!e.tabSettings?.notificationSound,notificationVolume:Math.max(.1,Math.min(1,Number(e.tabSettings?.notificationVolume)||.5)),titleFormat:e.tabSettings?.titleFormat||"{status}{title}",privacyMode:!!e.tabSettings?.privacyMode,privacyTitle:e.tabSettings?.privacyTitle||"ChatGPT"}};return t.themeConfig=Tt(e.themeConfig,e.themeMode),t.themeMode=null,t},serializeSettingsForStorage(r=this.settings){const e=this.normalizeRuntimeSettings(r||{});return{panelWidth:e.panelWidth,defaultPanelState:e.defaultPanelState,prompts:{enabled:!0},outline:{enabled:!0,showUserQueries:e.outline.showUserQueries,syncScroll:e.outline.syncScroll},conversations:{enabled:!0},tabOrder:[...e.tabOrder],collapsedButtonsOrder:e.collapsedButtonsOrder.map(t=>({...t,enabled:!0})),themeMode:null,themeConfig:e.themeConfig,anchorEnabled:!0,themeEnabled:!0,manualAnchorEnabled:!0,preventAutoScroll:e.preventAutoScroll,promptSortMode:e.promptSortMode,promptQuickMenuEnabled:e.promptQuickMenuEnabled,readingHistory:{persistence:e.readingHistory.persistence,autoRestore:e.readingHistory.autoRestore},formulaCopy:{enabled:e.formulaCopy.enabled},tableCopy:{enabled:e.tableCopy.enabled},tabSettings:{enabled:e.tabSettings.enabled,showStatus:e.tabSettings.showStatus,notificationSound:e.tabSettings.notificationSound,notificationVolume:e.tabSettings.notificationVolume,titleFormat:e.tabSettings.titleFormat,privacyMode:e.tabSettings.privacyMode,privacyTitle:e.tabSettings.privacyTitle}}},loadSettings(){const r=window.GM_getValue(J.SETTINGS,null);return this.normalizeRuntimeSettings(r)},saveSettings(){const r=this.normalizeRuntimeSettings(this.settings);Object.keys(this.settings).forEach(e=>delete this.settings[e]),Object.assign(this.settings,r),window.GM_setValue(J.SETTINGS,this.serializeSettingsForStorage(this.settings))},async init(){if(this.createStyles(),this.createLayout(),!this.panel)throw new Error("Helper panel could not be mounted");if(this.createUI(),this.createCollapsedButtons(),this.bindEvents(),await this.runFeature("theme",()=>this.initializeThemeSystem()),this.destroyed)return;this.monitorTheme(),this.runFeature("reading history",()=>{this.readingProgressManager.startRecording(),this.readingProgressManager.cleanup(),this.settings.readingHistory?.autoRestore&&this.scope.schedule("restore-reading",()=>{this.runFeature("restore reading",async()=>{await this.readingProgressManager.restoreProgress()&&this.anchorManager.setAnchor(this.readingProgressManager.restoredTop)})},500)}),this.runFeature("page width",()=>this.widthStyleManager.apply()),this.runFeature("copy",()=>this.copyManager.init()),this.settings.tabSettings?.enabled!==!1&&this.runFeature("tab status",()=>this.tabRenameManager.start()),this.settings.promptQuickMenuEnabled!==!1&&this.promptQuickMenu.start(),this.runFeature("message selection",()=>this.messageSelectManager.start()),this.scrollLockManager.setEnabled(!!this.settings.preventAutoScroll);const r=_e();r?.onMessage?.addListener&&(this.panelMessageHandler=e=>{e?.type==="ch-helper-toggle-panel"&&this.toggleCollapse()},r.onMessage.addListener(this.panelMessageHandler)),this.scope.listen(window,"chatgpt-helper-outline-auto-refresh",()=>{this.currentTab==="outline"&&this.refreshOutline()}),this.runFeature("onboarding",()=>this.maybeShowOnboarding())}},Bn=`
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
`,_n={getThemeConfig(){return(!this.settings.themeConfig||typeof this.settings.themeConfig!="object")&&(this.settings.themeConfig=Tt(null,this.settings.themeMode)),this.settings.themeConfig},updateThemeButtons(){const r=this.currentEffectiveTheme==="dark",e=document.getElementById("quick-btn-theme");e&&ue(e,r?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"});const t=document.getElementById("chatgpt-helper-header-theme-btn");t&&ue(t,r?"sun":"moon",{size:15})},syncHelperThemeMode(r){const e=r==="dark"?"dark":"light";for(const n of[document.documentElement,document.body])n.getAttribute("data-gh-mode")!==e&&n.setAttribute("data-gh-mode",e);const t=this.currentEffectiveTheme!==e;this.currentEffectiveTheme=e,(t||!this.themeButtonsInitialized)&&(this.themeButtonsInitialized=!0,this.updateThemeButtons())},getSystemPreferredTheme(){try{if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"},stopSystemThemeListener(){if(!(!this.systemThemeMediaQuery||!this.systemThemeListener)){try{typeof this.systemThemeMediaQuery.removeEventListener=="function"?this.systemThemeMediaQuery.removeEventListener("change",this.systemThemeListener):typeof this.systemThemeMediaQuery.removeListener=="function"&&this.systemThemeMediaQuery.removeListener(this.systemThemeListener)}catch{}this.systemThemeMediaQuery=null,this.systemThemeListener=null}},startSystemThemeListener(){if(this.stopSystemThemeListener(),!window.matchMedia)return;const r=window.matchMedia("(prefers-color-scheme: dark)"),e=()=>{if(this.getThemeConfig().appearanceMode!=="system")return;const n=r.matches?"dark":"light";this.applyEffectiveTheme(n,{preferNative:!1,persist:!1,fromSystem:!0})};try{typeof r.addEventListener=="function"?r.addEventListener("change",e):typeof r.addListener=="function"&&r.addListener(e)}catch{}this.systemThemeMediaQuery=r,this.systemThemeListener=e},detectEffectiveThemeFromDom(){for(const r of[document.documentElement,document.body]){if(r.classList.contains("dark"))return"dark";if(r.classList.contains("light"))return"light";const e=r.getAttribute("data-theme");if(e==="dark"||e==="light")return e;const t=r.style.colorScheme;if(t==="dark"||t==="light")return t}return this.getSystemPreferredTheme()},directApplyPageTheme(r){const e=r==="dark"?"dark":"light",t=document.documentElement;t.classList.remove("dark-theme","light-theme",e==="dark"?"light":"dark"),t.classList.add(e),document.body.classList.remove("dark","light","dark-theme","light-theme"),document.body.style.removeProperty("color-scheme"),document.body.removeAttribute("data-theme"),document.body.removeAttribute("data-mode"),t.style.colorScheme!==e&&(t.style.colorScheme=e),t.getAttribute("data-theme")!==e&&t.setAttribute("data-theme",e),t.hasAttribute("data-appearance-theme")&&t.setAttribute("data-appearance-theme",e),t.hasAttribute("data-mode")&&t.setAttribute("data-mode",e);try{const n=this.getThemeConfig().appearanceMode==="system"?"system":e;localStorage.setItem("theme",n)}catch{}this.syncHelperThemeMode(e),this.syncNativeThemeScopes(e)},syncNativeThemeScopes(r=this.currentEffectiveTheme){const e=new Set;this.adapter?.getChatContainer?.()?.querySelectorAll("[data-dil-message-id], [data-oai-writing-block-surface]").forEach(t=>{const n=t.closest("[data-theme]");n&&n!==document.documentElement&&n!==document.body&&e.add(n)});for(const t of e)t.getAttribute("data-gh-native-theme")!=="true"&&t.setAttribute("data-gh-native-theme","true"),t.getAttribute("data-theme")!==r&&t.setAttribute("data-theme",r)},async applyEffectiveTheme(r,e={}){const t=r==="dark"?"dark":"light";return this.directApplyPageTheme(t),this.settings.themeMode=t,e.persist&&this.saveSettings(),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState(),t},async applyAppearanceMode(r,e={}){const t={persist:!0,showToast:!1,preferNative:!0,...e},n=this.getThemeConfig(),a=["system","light","dark"].includes(r)?r:"system";if(n.appearanceMode=a,n.updatedAt=new Date().toISOString(),a==="system"){this.startSystemThemeListener();const o=this.getSystemPreferredTheme();await this.applyEffectiveTheme(o,{preferNative:!1,persist:!1,fromSystem:!0})}else this.stopSystemThemeListener(),await this.applyEffectiveTheme(a,{preferNative:t.preferNative,persist:!1});t.persist&&this.saveSettings(),t.showToast&&(a==="dark"?this.showToast(this.t("themeSwitchedDark")):a==="light"&&this.showToast(this.t("themeSwitchedLight")))},applyThemePresetVariables(r,e=!0){const t=this.getThemeConfig(),n=ke(r),a=t.presetKey!==n.key;t.presetKey=n.key,a&&(t.updatedAt=new Date().toISOString(),e&&this.saveSettings()),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState()},clearThemeHostMarks(){const r=[...yt,"data-gh-theme-host-clear"];for(const e of r)document.querySelectorAll(`[${e}]`).forEach(t=>t.removeAttribute(e))},refreshThemeHostTargets(){this.syncNativeThemeScopes();const r=new Map,e=(h,p)=>{h instanceof HTMLElement&&(r.has(h)||r.set(h,new Set),r.get(h).add(p))},t=(h,p=document.body)=>{for(let c=h;c&&c!==p;c=c.parentElement)e(c,"data-gh-theme-host-clear")},n=this.adapter?.getChatContainer?.();e(n,"data-gh-theme-host-main"),e(n,"data-gh-theme-host-chat-list"),t(n),n?.querySelectorAll('.thread-scroll-container, [data-thread-find-target="conversation"], [data-thread-user-message-navigation-content]').forEach(h=>{t(h,n)}),(this.adapter?.getChatMessages?.()||[]).forEach(h=>{t(h.parentElement,n)});const o=this.findSidebarShellByGeometry();e(o,"data-gh-theme-host-sidebar-shell"),e(o,"data-gh-theme-host-sidebar"),t(o),o?.querySelectorAll('nav, [role="navigation"]').forEach(h=>t(h,o));for(const h of o?.children||[])h.matches('.gh-theme-glass-layer, [role="dialog"], [role="menu"]')||e(h,"data-gh-theme-host-clear");this.themeHostLastFoundShell=!!o,this.adapter?.findTextarea?.();const i=this.adapter?.textarea,s=i?.closest('[data-composer-body], form, [data-testid="composer"]'),l=i?.closest('[data-composer-surface-variant], [data-composer-surface], [class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')||s?.querySelector('[class*="bg-token"][class*="rounded"], [class*="bg-token"][class*="superellipse"]')||s;e(s,"data-gh-theme-host-composer"),e(l,"data-gh-theme-host-composer-surface"),t(l);for(let h=l?.parentElement;h&&h!==n&&h!==document.body;h=h.parentElement)for(const p of h.children)p.matches(".pointer-events-none.absolute.inset-x-0.bg-surface")&&!p.contains(i)&&e(p,"data-gh-theme-host-clear");for(const h of[...yt,"data-gh-theme-host-clear"])document.querySelectorAll(`[${h}]`).forEach(p=>{r.get(p)?.has(h)||p.removeAttribute(h)});for(const[h,p]of r)for(const c of p)h.getAttribute(c)!=="true"&&h.setAttribute(c,"true");this.isBackgroundEnabled()&&(o&&this.ensureThemeGlassLayer(o,"sidebar"),l&&this.ensureThemeGlassLayer(l,"composer"),this.ensureThemeBackgroundLayer()),this.themeHostTargets={main:n,sidebar:o,composer:s,surface:l}},queueThemeHostRefresh(){this.destroyed||this.themeHostRefreshQueued||(this.themeHostRefreshQueued=!0,this.themeHostRefreshTimer=setTimeout(()=>{this.themeHostRefreshQueued=!1,this.themeHostRefreshTimer=null,this.destroyed||this.refreshThemeHostTargets()},80))},findSidebarShellByGeometry(){const r=document.querySelectorAll('#stage-slideover-sidebar, #stage-sidebar-tiny-bar, [data-testid="sidebar"], nav[aria-label], aside');for(const e of r){if(e.closest('[id^="chatgpt-helper"]'))continue;const t=e.getBoundingClientRect();if(t.width>=40&&t.width<=Math.max(520,innerWidth*.42)&&t.height>=innerHeight*.4&&t.left<100)return e}return null},startThemeHostWatchdog(){this.themeHostWatchdog||(this.themeHostWatchdog=new MutationObserver(r=>{r.some(e=>e.type==="attributes"?e.attributeName==="data-app-shell-active-page"||e.target.matches('[data-app-shell-active-page], [data-app-shell-page-surface], main, [role="main"]')?!0:e.target.matches('[data-gh-native-theme="true"]')&&e.target.getAttribute("data-theme")!==this.currentEffectiveTheme:[...e.addedNodes].some(t=>t.nodeType===1&&(t.matches("[data-theme], [data-dil-message-id]")||t.querySelector("[data-dil-message-id]")))?!0:e.target.closest?.('[id^="chatgpt-helper"], [data-message-author-role], [data-markdown-text-style]')?!1:[...e.addedNodes,...e.removedNodes].some(t=>t.nodeType===1&&!t.matches?.('[id^="chatgpt-helper"], .gh-theme-glass-layer')))&&this.queueThemeHostRefresh()}),this.themeHostWatchdog.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-theme","data-app-shell-active-page","style","class","hidden","aria-hidden","inert"]}))},stopThemeHostWatchdog(){this.themeHostWatchdog?.disconnect(),this.themeHostWatchdog=null,clearTimeout(this.themeHostRefreshTimer),this.themeHostRefreshTimer=null,this.themeHostRefreshQueued=!1},isBackgroundEnabled(){return document.documentElement.getAttribute("data-gh-bg-enabled")==="true"},ensureThemeGlassLayer(r,e){if(!(r instanceof HTMLElement))return null;try{getComputedStyle(r).position==="static"&&r.setAttribute("data-gh-theme-relative","true")}catch{}const t=e==="composer"?"chatgpt-helper-glass-composer":"chatgpt-helper-glass-sidebar";let n=document.getElementById(t);return n&&n.parentElement!==r&&(n.remove(),n=null),n||(n=document.createElement("div"),n.id=t,n.className=`gh-theme-glass-layer gh-glass-${e}`,n.setAttribute("aria-hidden","true"),r.appendChild(n)),n},removeThemeGlassLayers(){document.querySelectorAll(".gh-theme-glass-layer").forEach(r=>r.remove()),document.querySelectorAll("[data-gh-theme-relative]").forEach(r=>r.removeAttribute("data-gh-theme-relative"))},probeThemeCoverStack(){const r=[],e=(a,o,i,s)=>{if(!(o instanceof HTMLElement))return;const l=o.getBoundingClientRect();l.width<40||l.height<40||r.push({label:a,x:Math.round(l.left+l.width*i),y:Math.round(l.top+l.height*s)})};e("main",document.querySelector("main")||document.querySelector('[role="main"]'),.5,.3),e("sidebar",document.querySelector('[data-gh-theme-host-sidebar-shell="true"]'),.5,.5),e("composer",document.querySelector('[data-gh-theme-host-composer-surface="true"]'),.5,.5);const t=a=>typeof a.id=="string"&&(a.id.startsWith("chatgpt-helper")||a.id==="chatgpt-helper-theme-bg-layer")||typeof a.className=="string"&&a.className.includes("chatgpt-helper"),n={};for(const a of r){const o=[],i=document.querySelectorAll("*");for(const s of i){if(!(s instanceof HTMLElement)||s===document.documentElement||s===document.body||t(s))continue;const l=s.getBoundingClientRect();if(l.width===0||l.height===0||a.x<l.left||a.x>l.right||a.y<l.top||a.y>l.bottom)continue;const h=getComputedStyle(s),p=/^rgba\((?:\d+,\s*){3},\s*([\d.]+)\)/.exec(h.backgroundColor),c=p?parseFloat(p[1]):h.backgroundColor!=="transparent"&&h.backgroundColor!==""?1:0,u=h.backgroundImage!=="none",g=h.backdropFilter!=="none"&&h.backdropFilter!=="";c<=.04&&!u&&!g||o.push({tag:s.tagName.toLowerCase(),id:s.id||void 0,cls:(typeof s.className=="string"?s.className:"").slice(0,80)||void 0,bg:h.backgroundColor.slice(0,36),bi:u?h.backgroundImage.slice(0,50):void 0,bdk:g?h.backdropFilter.slice(0,30):void 0,z:h.zIndex,pos:h.position})}n[a.label]=o.slice(0,12)}return n},collectThemeDiagnostics(){const r=document.querySelector('[data-gh-theme-host-sidebar-shell="true"]'),e=i=>{if(!i)return null;const s=i.getBoundingClientRect();return{tag:i.tagName.toLowerCase(),id:i.id||void 0,cls:(typeof i.className=="string"?i.className:"").slice(0,120)||void 0,rect:{x:Math.round(s.x),y:Math.round(s.y),w:Math.round(s.width),h:Math.round(s.height)},attrs:Array.from(i.attributes).filter(l=>l.name.startsWith("data-gh")).map(l=>l.name)}},t=i=>{if(!i)return null;const s=getComputedStyle(i);return{backgroundColor:s.backgroundColor,backgroundImage:s.backgroundImage.slice(0,90),backdropFilter:s.backdropFilter.slice(0,40),boxShadow:s.boxShadow.slice(0,90),opacity:s.opacity,zIndex:s.zIndex,position:s.position}};let n=[];try{n=Array.from(document.querySelectorAll('#stage-slideover-sidebar, [data-testid="sidebar"], [data-testid*="sidebar"], nav[aria-label], aside[aria-label]')).slice(0,8).map(i=>({...e(i),computed:t(i)}))}catch(i){n=["query failed: "+i.message]}const a=document.getElementById("chatgpt-helper-theme-bg-layer"),o=document.documentElement.style;return{version:Ve,url:location.href.slice(0,120),viewport:{w:window.innerWidth,h:window.innerHeight},rootAttrs:{bgEnabled:document.documentElement.getAttribute("data-gh-bg-enabled"),mode:document.documentElement.getAttribute("data-gh-mode"),pageTheme:document.documentElement.getAttribute("data-gh-page-theme")},themeConfig:this.getThemeConfig(),hasBackgroundObjectUrl:!!this.themeBackgroundObjectUrl,backgroundReadError:this.themeBackgroundReadError||null,sidebarShell:e(r),sidebarShellComputed:t(r),bgLayerComputed:a?{display:getComputedStyle(a).display,hasImage:getComputedStyle(a).backgroundImage.includes("url"),filter:getComputedStyle(a).filter.slice(0,60),zIndex:getComputedStyle(a).zIndex}:"missing",rootInlineVars:{sidebarBgDark:o.getPropertyValue("--gh-page-sidebar-bg-dark").slice(0,90),sidebarBgLight:o.getPropertyValue("--gh-page-sidebar-bg-light").slice(0,90),panelBlur:o.getPropertyValue("--gh-panel-blur"),enhanceAlphaDark:o.getPropertyValue("--gh-sidebar-enhance-alpha-dark")},sidebarCandidates:n,glassLayers:Array.from(document.querySelectorAll(".gh-theme-glass-layer")).map(i=>{const s=getComputedStyle(i);return{id:i.id,host:i.parentElement?i.parentElement.tagName.toLowerCase()+(i.parentElement.id?"#"+i.parentElement.id:""):null,backdropFilter:s.backdropFilter.slice(0,40),zIndex:s.zIndex,position:s.position,pointerEvents:s.pointerEvents}}),geometricShell:e(this.findSidebarShellByGeometry()),coverProbe:(()=>{try{return this.probeThemeCoverStack()}catch(i){return"probe failed: "+i.message}})()}},ensureThemeRuntimeStyle(){if(document.getElementById("chatgpt-helper-theme-runtime-style"))return;const r=document.createElement("style");r.id="chatgpt-helper-theme-runtime-style",r.textContent=Bn,document.head.appendChild(r),this.themeRuntimeStyleReady=!0},ensureThemeBackgroundLayer(){let r=document.getElementById("chatgpt-helper-theme-bg-layer");return r||(r=document.createElement("div"),r.id="chatgpt-helper-theme-bg-layer",r.setAttribute("aria-hidden","true"),document.body.prepend(r)),r},sanitizeCssUrl(r){return r?`url("${String(r).replace(/\\/g,"\\\\").replace(/"/g,'\\"')}")`:"none"},revokeThemeBackgroundObjectUrl(){if(this.themeBackgroundObjectUrl){try{URL.revokeObjectURL(this.themeBackgroundObjectUrl)}catch{}this.themeBackgroundObjectUrl=null,this.themeBackgroundObjectAssetId=null}},async refreshThemeBackgroundState(){if(this.destroyed)return;const r=this.themeBackgroundRevision=(this.themeBackgroundRevision||0)+1,e=this.getThemeConfig(),t=e.backgroundAssetId;if(!e.backgroundImageEnabled||!t){this.revokeThemeBackgroundObjectUrl(),this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState();return}if(this.themeBackgroundObjectAssetId===t&&this.themeBackgroundObjectUrl){this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState();return}try{const n=await this.themeAssetRepository.getAsset(t),a=this.getThemeConfig();if(this.destroyed||r!==this.themeBackgroundRevision||a.backgroundAssetId!==t||!a.backgroundImageEnabled)return;const o=n?.blob?URL.createObjectURL(n.blob):null;this.revokeThemeBackgroundObjectUrl(),this.themeBackgroundObjectUrl=o,this.themeBackgroundObjectAssetId=o?t:null,this.themeBackgroundReadError=o?null:"missing"}catch(n){if(this.destroyed||r!==this.themeBackgroundRevision)return;this.themeBackgroundReadError="unavailable",console.error("[ChatGPT Helper] \u8BFB\u53D6\u80CC\u666F\u56FE\u7247\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u914D\u7F6E:",n)}this.updateThemeVisualState(),this.themeModalRefs&&this.syncThemeModalState()},scheduleThemeSettingSave(){this.themeSettingSaveTimer&&clearTimeout(this.themeSettingSaveTimer),this.themeSettingSaveTimer=setTimeout(()=>{this.themeSettingSaveTimer=null;try{this.saveSettings()}catch(r){console.error("[ChatGPT Helper] \u4FDD\u5B58\u4E3B\u9898\u8BBE\u7F6E\u5931\u8D25:",r)}},250)},syncThemeSurfaceVariables(r){const e=document.documentElement,t=this.currentEffectiveTheme==="dark",n=this.getThemeConfig(),a=ke(n.presetKey),o=St(a,{isDark:t,canRenderBackground:r,messageIntensity:n.messageGlassIntensity,panelIntensity:n.panelGlassIntensity});Object.entries(o).forEach(([i,s])=>{e.style.getPropertyValue(i)!==s&&e.style.setProperty(i,s)})},updateThemeVisualState(){this.ensureThemeRuntimeStyle();const r=this.getThemeConfig(),e=!!(r.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===r.backgroundAssetId),t=document.documentElement,n=!ke(r.presetKey).isOriginal;this.syncHelperThemeMode(this.detectEffectiveThemeFromDom()),(!this.themeHostTargets||e!==this.themeHadBackground)&&this.queueThemeHostRefresh(),this.themeHadBackground=e,t.setAttribute("data-gh-theme-active","true"),t.setAttribute("data-gh-theme-preset",r.presetKey||ce.presetKey),t.setAttribute("data-gh-page-theme",n?"true":"false"),t.setAttribute("data-gh-bg-enabled",e?"true":"false"),t.setAttribute("data-gh-msg-glass",r.messageGlassEnabled?"true":"false"),t.setAttribute("data-gh-sidebar-enhance",r.sidebarTextEnhanceEnabled?"true":"false"),t.style.setProperty("--gh-bg-image",this.sanitizeCssUrl(this.themeBackgroundObjectUrl)),t.style.setProperty("--gh-bg-blur",`${Math.round(Z(r.backgroundBlurPx,0,20))}px`);const a=(Z(r.sidebarTextEnhanceIntensity,0,100)/100*.65).toFixed(3);t.style.setProperty("--gh-sidebar-enhance-alpha",a),t.style.setProperty("--gh-sidebar-enhance-alpha-dark",a),this.syncThemeSurfaceVariables(e);const o=this.ensureThemeBackgroundLayer();o.style.display=e?"block":"none",o.style.backgroundImage=this.sanitizeCssUrl(this.themeBackgroundObjectUrl),e||this.removeThemeGlassLayers(),this.themeModalRefs&&this.updateThemePreviewCard()},validateThemeBackgroundFile(r){if(!r||!(r instanceof File))throw new Error(this.t("themeImageLoadFailed"));if(!Xt.includes(r.type))throw new Error(this.t("themeInvalidType"));if(r.size>Kt)throw new Error(this.t("themeFileTooLarge"))},async uploadThemeBackgroundFile(r){this.validateThemeBackgroundFile(r);const e=this.themeAssetOperation=(this.themeAssetOperation||0)+1;if((await createImageBitmap(r).catch(()=>{throw new Error(this.t("themeImageLoadFailed"))})).close(),e!==this.themeAssetOperation)return;const n=await this.themeAssetRepository.putAsset(r,r.type);if(e!==this.themeAssetOperation){await this.themeAssetRepository.deleteAsset(n.id).catch(()=>{});return}const a=this.getThemeConfig(),o=a.backgroundAssetId;a.backgroundAssetId=n.id,a.backgroundImageEnabled=!0,a.updatedAt=new Date().toISOString(),this.saveSettings(),await this.refreshThemeBackgroundState(),o&&o!==n.id&&await this.themeAssetRepository.deleteAsset(o).catch(()=>{}),e===this.themeAssetOperation&&this.showToast(this.t("themeUploadSuccess"))},async removeThemeBackgroundFile(){this.themeAssetOperation=(this.themeAssetOperation||0)+1;const r=this.getThemeConfig(),e=r.backgroundAssetId;r.backgroundImageEnabled=!1,r.backgroundAssetId=null,r.updatedAt=new Date().toISOString(),this.saveSettings(),await this.refreshThemeBackgroundState(),e&&await this.themeAssetRepository.deleteAsset(e).catch(()=>{}),this.showToast(this.t("themeBackgroundRemoved"))},async initializeThemeSystem(){if(this.destroyed)return;const r=this.getThemeConfig();this.refreshThemeHostTargets(),this.applyThemePresetVariables(r.presetKey,!1),await this.applyAppearanceMode(r.appearanceMode,{persist:!1,showToast:!1,preferNative:!1}),await this.refreshThemeBackgroundState(),!this.destroyed&&(this.queueThemeHostRefresh(),this.startThemeHostWatchdog())},syncThemeModalState(){if(!this.themeModalRefs)return;const r=this.themeModalRefs,e=this.getThemeConfig(),t=!!(e.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===e.backgroundAssetId);r.appearanceButtons.system.classList.toggle("active",e.appearanceMode==="system"),r.appearanceButtons.light.classList.toggle("active",e.appearanceMode==="light"),r.appearanceButtons.dark.classList.toggle("active",e.appearanceMode==="dark"),r.presetButtons.forEach(n=>{const a=n.dataset.presetKey===e.presetKey;n.classList.toggle("active",a)}),r.wallpaperEnable.checked=e.backgroundImageEnabled&&!!e.backgroundAssetId,r.blurRange.disabled=!t,r.messageGlass.disabled=!t,r.panelGlassIntensityRange.disabled=!t,r.sidebarEnhance.disabled=!t,r.blurRange.value=`${Math.round(Z(e.backgroundBlurPx,0,20))}`,r.blurValue.textContent=`${Math.round(Z(e.backgroundBlurPx,0,20))}px`,r.messageGlass.checked=!!e.messageGlassEnabled,r.messageGlassIntensityRange.disabled=!t||!e.messageGlassEnabled,r.messageGlassIntensityRange.value=`${Math.round(Z(e.messageGlassIntensity,0,100))}`,r.messageGlassIntensityValue.textContent=`${Math.round(Z(e.messageGlassIntensity,0,100))}%`,r.panelGlassIntensityRange.value=`${Math.round(Z(e.panelGlassIntensity,0,100))}`,r.panelGlassIntensityValue.textContent=`${Math.round(Z(e.panelGlassIntensity,0,100))}%`,r.sidebarEnhance.checked=!!e.sidebarTextEnhanceEnabled,r.sidebarEnhanceRange.disabled=!t||!e.sidebarTextEnhanceEnabled,r.sidebarEnhanceRange.value=`${Math.round(Z(e.sidebarTextEnhanceIntensity,0,100))}`,r.sidebarEnhanceValue.textContent=`${Math.round(Z(e.sidebarTextEnhanceIntensity,0,100))}%`,r.removeFileBtn.disabled=!e.backgroundAssetId,r.wallpaperBlock&&r.wallpaperBlock.classList.toggle("no-wallpaper",!t),r.uploadDrop.classList.toggle("has-image",t),r.uploadBg.style.backgroundImage=t?this.sanitizeCssUrl(this.themeBackgroundObjectUrl):"none",this.updateThemePreviewCard()},updateThemePreviewCard(){if(!this.themeModalRefs)return;const r=this.themeModalRefs,e=this.getThemeConfig(),t=!!(e.backgroundImageEnabled&&this.themeBackgroundObjectUrl&&this.themeBackgroundObjectAssetId===e.backgroundAssetId),n=this.currentEffectiveTheme==="dark",a=ke(e.presetKey),o=!ke(e.presetKey).isOriginal,i=St(a,{isDark:n,canRenderBackground:t,messageIntensity:e.messageGlassIntensity,panelIntensity:e.panelGlassIntensity}),s=t||o?n?i["--gh-page-sidebar-bg-dark"]:i["--gh-page-sidebar-bg-light"]:n?"rgba(15, 23, 42, 0.920)":"rgba(255, 255, 255, 0.960)",l=t||o?n?i["--gh-page-composer-bg-dark"]:i["--gh-page-composer-bg-light"]:n?"#334155":"#ffffff",h="transparent",p=t||o?i["--gh-msg-user-bg"]:n?"rgba(51, 65, 85, 0.940)":"rgba(255,255,255,0.920)",c=t&&e.messageGlassEnabled,u=c?i["--gh-msg-assistant-bg"]:"transparent",g=i?i["--gh-panel-card-border"]:n?"rgba(255,255,255,0.10)":"rgba(255,255,255,0.32)",v=i?i["--gh-msg-border"]:g;r.preview.classList.toggle("has-bg",t),r.previewBg.style.backgroundImage=t?this.sanitizeCssUrl(this.themeBackgroundObjectUrl):"none",r.preview.style.setProperty("--gh-preview-blur",`${Math.round(Z(e.backgroundBlurPx,0,20))}px`),r.previewNav.style.background=s,r.previewNav.style.border=`1px solid ${g}`,r.previewNav.style.boxShadow=e.sidebarTextEnhanceEnabled&&t?`inset 0 0 0 9999px rgba(${n?"15,15,16":"255,255,255"},${(Z(e.sidebarTextEnhanceIntensity,0,100)/100*.65).toFixed(3)}), inset 0 0 0 1px ${g}`:`inset 0 0 0 1px ${g}`,r.previewNav.style.backdropFilter=t&&i?`blur(${i["--gh-panel-blur"]})`:"none",r.previewChat.style.background=h,r.previewChat.style.border="1px solid transparent",r.previewUserMsg.style.background=p,r.previewAssistantMsg.style.background=u,r.previewUserMsg.style.border=`1px solid ${v}`,r.previewAssistantMsg.style.border=c?`1px solid ${v}`:"1px solid transparent",r.previewUserMsg.style.padding=t?e.messageGlassEnabled?"10px 12px":"8px 10px":"10px 12px",r.previewAssistantMsg.style.padding=c?"14px 18px":"0",r.previewUserMsg.style.borderRadius=t?e.messageGlassEnabled?"24px":"18px":"20px",r.previewAssistantMsg.style.borderRadius=c?"28px":"0",r.previewAssistantMsg.style.backdropFilter=c?`blur(${i["--gh-msg-blur"]})`:"none",r.previewUserMsg.style.backdropFilter=(e.messageGlassEnabled||!t)&&t&&i?`blur(${i["--gh-msg-blur"]})`:"none",r.previewAssistantMsg.style.boxShadow=c?`inset 0 0 0 1px ${v}`:"none",r.previewAssistantMsg.style.color="",r.previewInput.style.background=l,r.previewInput.style.border=`1px solid ${v}`,r.previewInput.style.backdropFilter=t&&i?`blur(${i["--gh-composer-blur"]})`:"none",r.previewInput.style.boxShadow=t&&i?`inset 0 0 0 1px ${v}`:"none"},openAboutModal(r=null){if(this.aboutModal?.isConnected){this.aboutModal.classList.add("open"),this.aboutModal.querySelector(".chatgpt-helper-about-close")?.focus({preventScroll:!0});return}this.aboutModalTrigger=r?.focus?r:document.activeElement;const e=or()||{},t=e.name||"ChatGPT Helper",n=e.version||Ve,a="chatgpt-helper-about-title",o="chatgpt-helper-about-description",i=d("div",{id:"chatgpt-helper-about-modal"}),s=d("div",{className:"chatgpt-helper-about-dialog"});s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-labelledby",a),s.setAttribute("aria-describedby",o);const l=d("div",{className:"chatgpt-helper-about-header"});l.appendChild(d("div",{className:"chatgpt-helper-about-hero-glow","aria-hidden":"true"}));const h=d("div",{className:"chatgpt-helper-about-title-wrap"});h.appendChild(Re({size:44,className:"chatgpt-helper-about-logo",title:t}));const p=d("div",{className:"chatgpt-helper-about-title-text"}),c=d("div",{className:"chatgpt-helper-about-name-row"});c.appendChild(d("h2",{className:"chatgpt-helper-about-name",id:a},t)),c.appendChild(d("div",{className:"chatgpt-helper-about-badge"},`v${n}`)),p.appendChild(c),p.appendChild(d("p",{className:"chatgpt-helper-about-tagline",id:o},this.t("aboutTagline")||"A focused productivity layer designed for heavy ChatGPT users")),h.appendChild(p);const u=d("button",{className:"chatgpt-helper-about-close",type:"button",title:this.t("aboutClose")||"Close","aria-label":this.t("aboutClose")||"Close"});u.appendChild(j("close",{size:16})),l.appendChild(h),l.appendChild(u);const g=d("div",{className:"chatgpt-helper-about-body"}),v=d("div",{className:"chatgpt-helper-about-shell"}),f=(H,z={})=>{const G=d("section",{className:`chatgpt-helper-about-section${z.compact?" compact":""}${z.featured?" featured":""}${z.name?` ${z.name}`:""}`}),V=d("div",{className:"chatgpt-helper-about-section-head"});if(z.icon){const m=d("span",{className:"chatgpt-helper-about-section-icon"});m.appendChild(j(z.icon,{size:15,strokeWidth:"2.2"})),V.appendChild(m)}return V.appendChild(d("h3",{className:"chatgpt-helper-about-section-title"},H)),G.appendChild(V),z.text&&G.appendChild(d("p",{className:"chatgpt-helper-about-section-text"},z.text)),z.bodyNode&&G.appendChild(z.bodyNode),z.actions&&z.actions.children.length&&G.appendChild(z.actions),G},S=()=>d("div",{className:"chatgpt-helper-about-actions"}),k=(H,z={})=>{const G=d("button",{className:`chatgpt-helper-about-link-btn ${z.variant||"ghost"}${z.disabled?" disabled":""}`,type:"button",disabled:!!z.disabled,title:z.title||H});return z.icon&&G.appendChild(j(z.icon,{size:15,strokeWidth:"2.2"})),G.appendChild(d("span",{},H)),z.onClick&&!z.disabled&&G.addEventListener("click",z.onClick),G},M=d("div",{className:"chatgpt-helper-about-story"});M.appendChild(d("p",{className:"chatgpt-helper-about-section-text"},this.t("aboutMotivationContent")||"Built to keep everyday ChatGPT tools together and attention on the conversation."));const x=f(this.t("aboutMotivationTitle")||"Motivation",{bodyNode:M,icon:"info",name:"about-motivation",featured:!0}),P=d("ul",{className:"chatgpt-helper-about-feature-list"});[{icon:"edit",label:this.t("aboutFeaturePrompts")||"Prompt management and quick insertion"},{icon:"list",label:this.t("aboutFeatureOutline")||"Automatic outline generation and navigation"},{icon:"message",label:this.t("aboutFeatureConversations")||"Conversation organization and batch actions"},{icon:"export",label:this.t("aboutFeatureExport")||"Multi-format export and reading-position tools"}].forEach((H,z)=>{const G=d("li",{className:"chatgpt-helper-about-feature-item"}),V=d("span",{className:"chatgpt-helper-about-feature-icon"});V.appendChild(j(H.icon,{size:14,strokeWidth:"2.2"})),G.appendChild(V),G.appendChild(d("span",{className:"chatgpt-helper-about-feature-label"},H.label)),P.appendChild(G)});const D=f(this.t("aboutFeaturesTitle")||"Core Features",{bodyNode:P,icon:"list",name:"about-features",compact:!0}),w=f(this.t("aboutPrivacyTitle")||"Privacy & Permissions",{text:this.t("aboutPrivacy")||"All settings and data processing stay in your browser.",icon:"shield",name:"about-privacy",compact:!0}),I=d("div",{className:"chatgpt-helper-about-author-block"}),q=d("div",{className:"chatgpt-helper-about-avatar"});q.appendChild(d("img",{src:_e()?.getURL("icons/author-avatar.png")||"icons/author-avatar.png",alt:this.t("aboutAuthorTitle"),width:64,height:64,loading:"lazy"})),I.appendChild(q),I.appendChild(d("p",{className:"chatgpt-helper-about-section-text chatgpt-helper-about-author-bio"},this.t("aboutAuthorBio")||"Author bio coming soon"));const y=S();y.appendChild(k(this.t("aboutAuthorGithub")||"Author GitHub",{variant:"ghost",icon:"user",onClick:()=>Ye(er)}));const E=f(this.t("aboutAuthorTitle")||"About the Author",{bodyNode:I,actions:y,compact:!0,name:"about-author",icon:"user"}),C=d("div",{className:"chatgpt-helper-about-main-stack"}),A=d("div",{className:"chatgpt-helper-about-side-stack"});C.appendChild(x),C.appendChild(D),A.appendChild(w),A.appendChild(E),v.appendChild(C),v.appendChild(A),g.appendChild(v);const L=d("div",{className:"chatgpt-helper-about-footer"}),F=d("div",{className:"chatgpt-helper-about-footer-actions"});F.appendChild(k(this.t("aboutRepoButton")||"GitHub Repository",{variant:"primary",icon:"github",onClick:()=>Ye(Zt)})),F.appendChild(k(this.t("aboutBugSupport")||"Submit Feedback",{variant:"ghost",icon:"message",onClick:()=>Ye(Jt)})),L.appendChild(F),s.appendChild(l),s.appendChild(g),s.appendChild(L),i.appendChild(s),document.body.appendChild(i);const R=()=>this.closeAboutModal();u.addEventListener("click",R),this.aboutModalBackdropHandler=H=>{H.target===i&&R()},i.addEventListener("click",this.aboutModalBackdropHandler),this.aboutModalEscHandler=H=>{H.key==="Escape"&&(H.preventDefault(),R())},document.addEventListener("keydown",this.aboutModalEscHandler,!0),this.aboutModal=i,this.aboutModalFrame=requestAnimationFrame(()=>{this.aboutModalFrame=null,!(this.aboutModal!==i||!i.isConnected)&&(i.classList.add("open"),u.focus({preventScroll:!0}))})},closeAboutModal(){cancelAnimationFrame(this.aboutModalFrame),this.aboutModalFrame=null;const r=this.aboutModal,e=this.aboutModalTrigger;this.aboutModalBackdropHandler&&r?.removeEventListener("click",this.aboutModalBackdropHandler),this.aboutModalEscHandler&&document.removeEventListener("keydown",this.aboutModalEscHandler,!0),this.aboutModal=null,this.aboutModalTrigger=null,this.aboutModalBackdropHandler=null,this.aboutModalEscHandler=null,r?.remove(),!this.destroyed&&e?.isConnected&&e.focus({preventScroll:!0})},openThemeSettingsModal(r=null){if(this.themeModal?.isConnected){this.syncThemeModalState(),this.themeModal.classList.add("open"),this.themeModal.querySelector(".chatgpt-helper-theme-modal-close")?.focus({preventScroll:!0});return}this.themeModalTrigger=r?.focus?r:document.activeElement;const e=d("div",{id:"chatgpt-helper-theme-modal"}),t=d("div",{className:"chatgpt-helper-theme-modal-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"chatgpt-helper-theme-modal-title"}),n=d("div",{className:"chatgpt-helper-theme-modal-header"}),a=d("div",{className:"chatgpt-helper-theme-modal-title",id:"chatgpt-helper-theme-modal-title"});a.appendChild(j("settings",{size:16,className:"chatgpt-helper-theme-modal-title-icon"})),a.appendChild(d("span",{},this.t("themeDialogTitle")||"Theme")),n.appendChild(a);const o=d("button",{className:"chatgpt-helper-theme-modal-close",type:"button",title:"Close"});o.appendChild(j("close",{size:16})),n.appendChild(o);const i=d("div",{className:"chatgpt-helper-theme-modal-body"}),s=d("div",{className:"chatgpt-helper-theme-main chatgpt-helper-theme-workbench-settings"}),l=d("div",{className:"chatgpt-helper-theme-side chatgpt-helper-theme-workbench-preview"}),h=d("div",{className:"chatgpt-helper-theme-block theme-appearance-block"});h.appendChild(d("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeAppearance")||"Appearance"));const p=d("div",{className:"chatgpt-helper-theme-segment"}),c={system:d("button",{type:"button"},this.t("themeAppearanceSystem")||"System"),light:d("button",{type:"button"},this.t("themeAppearanceLight")||"Light"),dark:d("button",{type:"button"},this.t("themeAppearanceDark")||"Dark")};p.appendChild(c.system),p.appendChild(c.light),p.appendChild(c.dark),h.appendChild(p);const u=d("div",{className:"chatgpt-helper-theme-block theme-colors-block"});u.appendChild(d("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeColorPresets")||"Colors"));const g=d("div",{className:"chatgpt-helper-theme-preset-grid"}),v=[];vt.forEach(O=>{const K=d("button",{className:"chatgpt-helper-theme-preset",type:"button",title:O.labelKey?this.t(O.labelKey):O.key,"data-preset-key":O.key});O.isOriginal?(K.classList.add("is-original"),K.textContent=this.t(O.labelKey)||"Original"):(K.style.background=O.primary,K.style.color=O.primary),g.appendChild(K),v.push(K)}),u.appendChild(g);const f=d("div",{className:"chatgpt-helper-theme-block theme-wallpaper-block"});f.appendChild(d("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeWallpaper")||"Wallpaper"));const S=d("div",{className:"chatgpt-helper-theme-row"});S.appendChild(d("span",{},this.t("themeEnableWallpaper")||"Enable Wallpaper"));const k=d("input",{type:"checkbox"});S.appendChild(k),f.appendChild(S);const M=d("div",{className:"chatgpt-helper-theme-upload"}),x=d("div",{className:"chatgpt-helper-theme-upload-bg"}),P=d("div",{className:"chatgpt-helper-theme-upload-content"});P.appendChild(j("image",{size:20,className:"chatgpt-helper-theme-upload-icon"})),P.appendChild(d("div",{className:"chatgpt-helper-theme-upload-title"},this.t("themeDropImage")||"Drop image here")),P.appendChild(d("div",{className:"chatgpt-helper-theme-upload-hint"},this.t("themeFileTypes")||"PNG/JPG/WebP up to 5MB"));const D=d("div",{className:"chatgpt-helper-theme-upload-actions"}),w=d("button",{className:"chatgpt-helper-theme-launch-btn",type:"button"},this.t("themeSelectFile")||"Select File"),I=d("button",{className:"chatgpt-helper-theme-launch-btn",type:"button"},this.t("themeRemoveImage")||"Remove");D.appendChild(w),D.appendChild(I),P.appendChild(D),M.appendChild(x),M.appendChild(P),f.appendChild(M);const q=d("input",{type:"file",accept:"image/png,image/jpeg,image/webp",style:{display:"none"}});f.appendChild(q);const y=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});y.appendChild(d("span",{},this.t("themeBlur")||"Blur"));const E=d("div",{className:"chatgpt-helper-theme-range-control"}),C=d("input",{type:"range",min:0,max:20,step:1}),A=d("span",{className:"chatgpt-helper-theme-value"},"5px");E.appendChild(C),E.appendChild(A),y.appendChild(E),f.appendChild(y);const L=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});L.appendChild(d("span",{},this.t("themeMessageGlass")||"Message Glass Effect"));const F=d("input",{type:"checkbox"});L.appendChild(F),f.appendChild(L);const R=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});R.appendChild(d("span",{},this.t("themeMessageGlassIntensity")||"Message Glass Intensity"));const H=d("div",{className:"chatgpt-helper-theme-range-control"}),z=d("input",{type:"range",min:0,max:100,step:1}),G=d("span",{className:"chatgpt-helper-theme-value"},"60%");H.appendChild(z),H.appendChild(G),R.appendChild(H),f.appendChild(R);const V=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});V.appendChild(d("span",{},this.t("themePanelGlassIntensity")||"Side Panel Glass Intensity"));const m=d("div",{className:"chatgpt-helper-theme-range-control"}),Q=d("input",{type:"range",min:0,max:100,step:1}),W=d("span",{className:"chatgpt-helper-theme-value"},"45%");m.appendChild(Q),m.appendChild(W),V.appendChild(m),f.appendChild(V);const b=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});b.appendChild(d("span",{},this.t("themeSidebarEnhance")||"Sidebar Text Enhance"));const ne=d("input",{type:"checkbox"});b.appendChild(ne),f.appendChild(b);const we=d("div",{className:"chatgpt-helper-theme-row wallpaper-dependent"});we.appendChild(d("span",{},this.t("themeSidebarEnhanceIntensity")||"Enhance Intensity"));const ae=d("div",{className:"chatgpt-helper-theme-range-control"}),de=d("input",{type:"range",min:0,max:100,step:1}),ge=d("span",{className:"chatgpt-helper-theme-value"},"20%");ae.appendChild(de),ae.appendChild(ge),we.appendChild(ae),f.appendChild(we);for(const[O,K]of[[k,"themeEnableWallpaper"],[C,"themeBlur"],[F,"themeMessageGlass"],[z,"themeMessageGlassIntensity"],[Q,"themePanelGlassIntensity"],[ne,"themeSidebarEnhance"],[de,"themeSidebarEnhanceIntensity"]])O.setAttribute("aria-label",this.t(K));s.appendChild(h),s.appendChild(u),s.appendChild(f),l.appendChild(d("div",{className:"chatgpt-helper-theme-block-title"},this.t("themeLivePreview")||"Live Preview"));const be=d("div",{className:"chatgpt-helper-theme-preview"}),Ce=d("div",{className:"chatgpt-helper-theme-preview-bg"}),Ne=d("div",{className:"chatgpt-helper-theme-preview-inner"}),De=d("div",{className:"chatgpt-helper-theme-preview-nav"});for(let O=0;O<5;O++){const K=d("div",{style:{height:"20px",marginBottom:"10px",borderRadius:"999px",background:O===2?"color-mix(in srgb, var(--gh-primary), transparent 30%)":"color-mix(in srgb, var(--gh-text-secondary, #9ca3af), transparent 75%)"}});De.appendChild(K)}const Be=d("div",{className:"chatgpt-helper-theme-preview-chat"}),mt=d("div",{className:"chatgpt-helper-theme-preview-msg user"},"Summarize recent updates."),bt=d("div",{className:"chatgpt-helper-theme-preview-msg assistant"},"Theme engine, wallpaper controls, and live preview are now enabled."),tt=d("div",{className:"chatgpt-helper-theme-preview-input"});Be.appendChild(mt),Be.appendChild(bt),Be.appendChild(tt),Ne.appendChild(De),Ne.appendChild(Be),be.appendChild(Ce),be.appendChild(Ne),l.appendChild(be),i.appendChild(s),i.appendChild(l),t.appendChild(n),t.appendChild(i),e.appendChild(t),document.body.appendChild(e);const qe=O=>{this.applyAppearanceMode(O,{persist:!0,showToast:!1,preferNative:!0}).catch(K=>{console.error("[ChatGPT Helper] applyAppearanceMode \u5931\u8D25:",K),this.showToast(this.t("themeSwitchFailed"))})};c.system.addEventListener("click",()=>qe("system")),c.light.addEventListener("click",()=>qe("light")),c.dark.addEventListener("click",()=>qe("dark")),v.forEach(O=>{O.addEventListener("click",()=>{const K=O.dataset.presetKey;this.applyThemePresetVariables(K,!0)})}),k.addEventListener("change",()=>{const O=this.getThemeConfig();if(!O.backgroundAssetId&&k.checked){k.checked=!1,this.showToast(this.t("themeNoBackground"));return}O.backgroundImageEnabled=!!(k.checked&&O.backgroundAssetId),O.updatedAt=new Date().toISOString(),this.saveSettings(),this.refreshThemeBackgroundState()}),C.addEventListener("input",()=>{const O=this.getThemeConfig();O.backgroundBlurPx=Math.round(Z(C.value,0,20)),O.updatedAt=new Date().toISOString(),A.textContent=`${O.backgroundBlurPx}px`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),F.addEventListener("change",()=>{const O=this.getThemeConfig();O.messageGlassEnabled=!!F.checked,O.updatedAt=new Date().toISOString(),this.saveSettings(),this.updateThemeVisualState(),this.syncThemeModalState()}),z.addEventListener("input",()=>{const O=this.getThemeConfig();O.messageGlassIntensity=Math.round(Z(z.value,0,100)),O.updatedAt=new Date().toISOString(),G.textContent=`${O.messageGlassIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),Q.addEventListener("input",()=>{const O=this.getThemeConfig();O.panelGlassIntensity=Math.round(Z(Q.value,0,100)),O.updatedAt=new Date().toISOString(),W.textContent=`${O.panelGlassIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),ne.addEventListener("change",()=>{const O=this.getThemeConfig();O.sidebarTextEnhanceEnabled=!!ne.checked,O.updatedAt=new Date().toISOString(),this.saveSettings(),this.updateThemeVisualState(),this.syncThemeModalState()}),de.addEventListener("input",()=>{const O=this.getThemeConfig();O.sidebarTextEnhanceIntensity=Math.round(Z(de.value,0,100)),O.updatedAt=new Date().toISOString(),ge.textContent=`${O.sidebarTextEnhanceIntensity}%`,this.scheduleThemeSettingSave(),this.updateThemeVisualState()}),w.addEventListener("click",()=>q.click()),q.addEventListener("change",()=>{const O=q.files&&q.files[0];q.value="",O&&this.uploadThemeBackgroundFile(O).catch(K=>{const Le=K&&K.message?K.message:this.t("themeImageLoadFailed");this.showToast(Le)})}),I.addEventListener("click",()=>{this.removeThemeBackgroundFile().catch(O=>{console.error("[ChatGPT Helper] removeThemeBackgroundFile \u5931\u8D25:",O)})}),["dragenter","dragover"].forEach(O=>{M.addEventListener(O,K=>{K.preventDefault(),K.stopPropagation(),M.classList.add("dragging")})}),["dragleave","drop"].forEach(O=>{M.addEventListener(O,K=>{K.preventDefault(),K.stopPropagation(),M.classList.remove("dragging")})}),M.addEventListener("drop",O=>{const K=O.dataTransfer&&O.dataTransfer.files&&O.dataTransfer.files[0];K&&this.uploadThemeBackgroundFile(K).catch(Le=>{const jt=Le&&Le.message?Le.message:this.t("themeImageLoadFailed");this.showToast(jt)})});const He=()=>this.closeThemeSettingsModal();o.addEventListener("click",He),this.themeModalBackdropHandler=O=>{O.target===e&&He()},e.addEventListener("click",this.themeModalBackdropHandler),this.themeModalEscHandler=O=>{O.key==="Escape"&&(O.preventDefault(),He())},document.addEventListener("keydown",this.themeModalEscHandler,!0),this.themeModal=e,this.themeModalRefs={appearanceButtons:c,presetButtons:v,wallpaperBlock:f,wallpaperEnable:k,blurRange:C,blurValue:A,messageGlass:F,messageGlassIntensityRange:z,messageGlassIntensityValue:G,panelGlassIntensityRange:Q,panelGlassIntensityValue:W,sidebarEnhance:ne,sidebarEnhanceRange:de,sidebarEnhanceValue:ge,uploadDrop:M,uploadBg:x,removeFileBtn:I,preview:be,previewBg:Ce,previewNav:De,previewChat:Be,previewUserMsg:mt,previewAssistantMsg:bt,previewInput:tt},this.syncThemeModalState(),this.themeModalFrame=requestAnimationFrame(()=>{this.themeModalFrame=null,!(this.themeModal!==e||!e.isConnected)&&(e.classList.add("open"),o.focus({preventScroll:!0}))})},closeThemeSettingsModal(){cancelAnimationFrame(this.themeModalFrame),this.themeModalFrame=null;const r=this.themeModal,e=this.themeModalTrigger;this.themeModalBackdropHandler&&r?.removeEventListener("click",this.themeModalBackdropHandler),this.themeModalEscHandler&&document.removeEventListener("keydown",this.themeModalEscHandler,!0),this.themeModal=null,this.themeModalTrigger=null,this.themeModalRefs=null,this.themeModalEscHandler=null,this.themeModalBackdropHandler=null,r?.remove(),!this.destroyed&&e?.isConnected&&e.focus({preventScroll:!0})}},Er=`/* CSS Variables */\r
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
.chatgpt-helper-quick-bubble {\r
    display: none;\r
}\r
\r
.chatgpt-helper-quick-buttons.minimized,\r
body[data-gh-mode="dark"] .chatgpt-helper-quick-buttons.minimized {\r
    right: auto !important;\r
    transform: none;\r
    width: 54px;\r
    height: 54px;\r
    box-sizing: border-box;\r
    padding: 0 !important;\r
    border-radius: 50% !important;\r
    background: var(--gh-bg) !important;\r
    transition: left 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;\r
}\r
\r
.chatgpt-helper-quick-buttons.minimized.bubble-dragging { transition: none; }\r
\r
.chatgpt-helper-quick-buttons.minimized > :not(.chatgpt-helper-quick-bubble) {\r
    display: none !important;\r
}\r
\r
.chatgpt-helper-quick-buttons.minimized .chatgpt-helper-quick-bubble {\r
    display: flex;\r
    width: 100%;\r
    height: 100%;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 0;\r
    border: 0;\r
    border-radius: 50%;\r
    background: transparent;\r
    cursor: grab;\r
    touch-action: none;\r
    user-select: none;\r
}\r
\r
.chatgpt-helper-quick-bubble.dragging { cursor: grabbing; }\r
.chatgpt-helper-quick-bubble:focus-visible { outline: 2px solid var(--gh-primary); outline-offset: 2px; }\r
@media (prefers-reduced-motion: reduce) {\r
    .chatgpt-helper-quick-buttons.minimized { transition: none; }\r
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
    color: var(--gh-text-secondary, #6b7280);\r
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
    padding: 16px 0;\r
    display: grid;\r
    grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);\r
    gap: 14px;\r
}\r
\r
.chatgpt-helper-about-main-stack,\r
.chatgpt-helper-about-side-stack {\r
    display: contents;\r
}\r
\r
.chatgpt-helper-about-section.about-motivation { grid-column: 1; grid-row: 1; }\r
.chatgpt-helper-about-section.about-features { grid-column: 1; grid-row: 2; }\r
.chatgpt-helper-about-section.about-privacy { grid-column: 2; grid-row: 1; }\r
.chatgpt-helper-about-section.about-author { grid-column: 2; grid-row: 2; }\r
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
    flex-direction: row;\r
    align-items: center;\r
    text-align: left;\r
    gap: 14px;\r
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
    line-height: 1.55;\r
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
    .chatgpt-helper-about-section.about-motivation,\r
    .chatgpt-helper-about-section.about-features,\r
    .chatgpt-helper-about-section.about-privacy,\r
    .chatgpt-helper-about-section.about-author {\r
        grid-column: auto;\r
        grid-row: auto;\r
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
\r
    .chatgpt-helper-about-footer-actions .chatgpt-helper-about-link-btn:first-child {\r
        grid-column: auto;\r
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
`,Rn={createStyles(){const r=document.documentElement,e=getComputedStyle(document.body).fontFamily.trim();e&&!/[;{}]/.test(e)&&r.style.setProperty("--gh-font-family",e),r.style.setProperty("--gh-panel-width",this.settings.panelWidth+"px");let t=document.getElementById("chatgpt-helper-styles");t||(t=document.createElement("style"),t.id="chatgpt-helper-styles",document.head.appendChild(t)),t.textContent!==Er&&(t.textContent=Er)}},zn={createLayout(){this.panel=document.getElementById("chatgpt-helper-right"),this.panel||(this.panel=d("div",{id:"chatgpt-helper-right",className:this.isCollapsed?"collapsed":""}),document.body.appendChild(this.panel)),this.initResizeHandle(),this.adjustChatGPTLayout()},adjustChatGPTLayout(){const r=()=>{const e=this.isCollapsed||window.innerWidth<768?0:this.settings.panelWidth;try{document.documentElement.style.setProperty("--gh-panel-margin-right",`${e}px`)}catch{}let t=document.getElementById("chatgpt-helper-layout-style");t||(t=document.createElement("style"),t.id="chatgpt-helper-layout-style",t.textContent=`
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
                `,document.head.appendChild(t))};r(),this.updateLayout=r},initResizeHandle(){if(!this.panel)return;this.resizeHandleCleanup?.();const r=this.panel;let e=r.querySelector("#chatgpt-helper-resize-handle");e||(e=document.createElement("div"),e.id="chatgpt-helper-resize-handle",r.appendChild(e));const t=We-56,n=x=>Math.max(We,Math.min(ht,x));let a=!1,o=0,i=0,s=0,l=0,h=null,p="",c=0;const u=()=>i+o-l,g=x=>{this.settings.panelWidth=x,r.style.width=`${x}px`},v=(x=!0,P=!1)=>{a&&(a=!1,h!==null&&cancelAnimationFrame(h),h=null,document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",S),window.removeEventListener("blur",k),document.body.style.userSelect=p,document.body.classList.remove("gh-resizing"),r.classList.remove("gh-resizing"),x&&(g(P?s:n(u())),P&&!this.isCollapsed?this.toggleCollapse():(this.updateLayout?.(),this.saveSettings())))},f=x=>{if(a){if(x.buttons===0){v();return}if(l=x.clientX,u()<t){v(!0,!0);return}h===null&&(h=requestAnimationFrame(()=>{if(h=null,!a)return;g(n(u()));const P=performance.now();P-c>=50&&(c=P,this.updateLayout?.())}))}},S=x=>{x.button!==0||!a||(l=x.clientX,v(!0,u()<t))},k=()=>v(),M=x=>{x.button!==0||this.isCollapsed||this.destroyed||a||(x.preventDefault(),o=l=x.clientX,i=r.getBoundingClientRect().width||this.settings.panelWidth,s=n(this.settings.panelWidth||i),p=document.body.style.userSelect,a=!0,document.body.style.userSelect="none",document.body.classList.add("gh-resizing"),r.classList.add("gh-resizing"),c=-1/0,document.addEventListener("mousemove",f),document.addEventListener("mouseup",S),window.addEventListener("blur",k))};e.addEventListener("mousedown",M),this.resizeHandleCleanup=()=>{v(!1),e.removeEventListener("mousedown",M)},!this.resizeHandleScopeBound&&this.scope&&(this.resizeHandleScopeBound=!0,this.scope.cleanups.push(()=>this.resizeHandleCleanup?.()))},initTabResponsiveSpacing(r){if(!r)return;this.tabSpacingObserver&&(this.tabSpacingObserver.disconnect(),this.tabSpacingObserver=null),this.panelSpacingObserver&&(this.panelSpacingObserver.disconnect(),this.panelSpacingObserver=null);const e=()=>{const a=r.getBoundingClientRect().width;if(r.classList.toggle("icons-only",a<300),a<300){const o=Math.max(.3,(a-200)/100);r.style.setProperty("--tab-padding-h",`${Math.max(4,8*o)}px`),r.style.setProperty("--tab-padding-v",`${Math.max(5,7*o)}px`),r.style.setProperty("--tab-gap",`${Math.max(2,5*o)}px`),r.style.setProperty("--tab-margin","0px")}else if(a<400){const o=.75+(a-300)/400;r.style.setProperty("--tab-padding-h",`${4*o}px`),r.style.setProperty("--tab-padding-v",`${7*o}px`),r.style.setProperty("--tab-gap",`${5*o}px`),r.style.setProperty("--tab-margin","0px")}else r.style.setProperty("--tab-padding-h","8px"),r.style.setProperty("--tab-padding-v","7px"),r.style.setProperty("--tab-gap","5px"),r.style.setProperty("--tab-margin","0px")};e();let t=null;const n=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.tabSpacingObserver=new ResizeObserver(()=>{n()}),this.tabSpacingObserver.observe(r),this.panel&&(this.panelSpacingObserver=new ResizeObserver(()=>{n()}),this.panelSpacingObserver.observe(this.panel))},initHeaderResponsiveSpacing(r){if(!r)return;this.headerSpacingObserver&&(this.headerSpacingObserver.disconnect(),this.headerSpacingObserver=null);const e=()=>{try{const a=r.getBoundingClientRect().width,o=a<318;r.classList.toggle("gh-compact",o),a<270?(r.style.setProperty("--gh-header-btn-size","22px"),r.style.setProperty("--gh-header-controls-gap","2px"),r.style.setProperty("--gh-header-padding-h","8px"),r.style.setProperty("--gh-header-padding-v","9px"),r.style.setProperty("--gh-header-btn-font-size","12px")):a<348?(r.style.setProperty("--gh-header-btn-size","24px"),r.style.setProperty("--gh-header-controls-gap","2px"),r.style.setProperty("--gh-header-padding-h","10px"),r.style.setProperty("--gh-header-padding-v","10px"),r.style.setProperty("--gh-header-btn-font-size","13px")):a<404?(r.style.setProperty("--gh-header-btn-size","26px"),r.style.setProperty("--gh-header-controls-gap","3px"),r.style.setProperty("--gh-header-padding-h","12px"),r.style.setProperty("--gh-header-padding-v","11px"),r.style.setProperty("--gh-header-btn-font-size","13px")):(r.style.removeProperty("--gh-header-btn-size"),r.style.removeProperty("--gh-header-controls-gap"),r.style.removeProperty("--gh-header-padding-h"),r.style.removeProperty("--gh-header-padding-v"),r.style.removeProperty("--gh-header-btn-font-size"))}catch{}};e();let t=null;const n=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.headerSpacingObserver=new ResizeObserver(()=>n()),this.headerSpacingObserver.observe(r)},initScrollNavResponsive(r){if(!r)return;this.scrollNavObserver&&(this.scrollNavObserver.disconnect(),this.scrollNavObserver=null);const e=()=>{const a=r.getBoundingClientRect().width;r.classList.toggle("icons-only",a<250)};e();let t=null;const n=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.scrollNavObserver=new ResizeObserver(()=>n()),this.scrollNavObserver.observe(r)},initPromptsResponsive(r){if(!r)return;this.promptsResponsiveObserver&&(this.promptsResponsiveObserver.disconnect(),this.promptsResponsiveObserver=null);const e=()=>{const a=r.getBoundingClientRect().width;r.classList.toggle("compact",a<300)};e();let t=null;const n=()=>{t||(t=requestAnimationFrame(()=>{t=null,e()}))};this.promptsResponsiveObserver=new ResizeObserver(()=>n()),this.promptsResponsiveObserver.observe(r)},updateCollapseButtonState(){const r=document.getElementById("chatgpt-helper-collapse-btn");if(!r)return;const e=this.isCollapsed?this.t("expand"):this.t("collapse");ue(r,this.isCollapsed?"panelExpand":"panelCollapse",{size:16}),r.title=e,r.setAttribute("aria-label",e)},getTabOrder(){const r=["prompts","outline","conversations","export"],e=Array.isArray(this.settings.tabOrder)&&this.settings.tabOrder.length>0?this.settings.tabOrder.filter(t=>r.includes(t)):[];return e.length>0?e:[...r]},getTabLabel(r){return r==="prompts"?this.t("tabPrompts"):r==="outline"?this.t("tabOutline"):r==="conversations"?this.t("tabConversations"):r==="export"?this.t("tabExport"):r==="settings"?this.t("tabSettings"):r},renderTabBar(r){if(!r)return;he(r);const e=this.getTabOrder();!e.includes(this.currentTab)&&this.currentTab!=="settings"&&(this.currentTab=e[0]||"prompts"),e.forEach(t=>{const n=xt[t];if(!n)return;const a=d("button",{className:`chatgpt-helper-tab ${this.currentTab===t?"active":""}`,"data-tab":t,id:`${t}-tab`,type:"button",role:"tab","aria-selected":String(this.currentTab===t),"aria-controls":`${t}-content`,"aria-label":this.getTabLabel(t),tabindex:this.currentTab===t?0:-1,title:this.getTabLabel(t)});a.appendChild(j(n.iconName||"list",{size:15,className:"chatgpt-helper-tab-icon"})),a.appendChild(d("span",{className:"chatgpt-helper-tab-label"},this.getTabLabel(t))),a.addEventListener("click",()=>this.switchTab(t)),r.appendChild(a)}),r.onkeydown=t=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(t.key))return;const n=Array.from(r.querySelectorAll('[role="tab"]')),a=n.indexOf(t.target);if(a<0)return;t.preventDefault();const o=t.key==="Home"?0:t.key==="End"?n.length-1:(a+(t.key==="ArrowRight"?1:-1)+n.length)%n.length;this.switchTab(n[o].dataset.tab),n[o].focus()}},rebuildTabBar(){if(!this.panel)return;const r=this.panel.querySelector("#chatgpt-helper-tabs");r&&(this.renderTabBar(r),this.initTabResponsiveSpacing(r))},createUI(){if(!this.panel)return;try{if(this.currentTab==="settings"){const f=this.panel.querySelector("#settings-content .chatgpt-helper-settings-compact");this.settingsScrollTop=f?f.scrollTop:null}else this.settingsScrollTop=null}catch{}he(this.panel);const r=d("div",{id:"chatgpt-helper-header"}),e=d("div",{id:"chatgpt-helper-title"});e.appendChild(Re({size:18,className:"chatgpt-helper-icon-logo chatgpt-helper-header-logo",title:this.t("panelTitle")||"ChatGPT Helper"})),e.appendChild(d("span",{},this.t("panelTitle")));const t=d("div",{id:"chatgpt-helper-controls"}),n=d("button",{className:"chatgpt-helper-header-btn",title:this.t("themeToggle"),id:"chatgpt-helper-header-theme-btn",type:"button","aria-label":this.t("themeToggle")}),a=document.body.dataset.ghMode==="dark"||/\bdark\b/i.test(document.body.className);ue(n,a?"sun":"moon",{size:15}),n.addEventListener("click",f=>(f.preventDefault(),f.stopPropagation(),f.stopImmediatePropagation(),this.toggleTheme(f),!1));const o=d("button",{className:"chatgpt-helper-header-btn",title:this.t("newChatInTab"),id:"chatgpt-helper-header-newchat-btn",type:"button","aria-label":this.t("newChatInTab")});o.appendChild(j("plus",{size:15})),o.addEventListener("click",()=>{Ye("https://chatgpt.com")});const i=d("button",{className:"chatgpt-helper-header-btn",title:this.t("refresh"),type:"button","aria-label":this.t("refresh")});i.appendChild(j("refresh",{size:15})),i.addEventListener("click",()=>{this.currentTab==="prompts"?this.refreshPromptList():this.currentTab==="outline"&&this.refreshOutline(!0)});const s=d("button",{className:"chatgpt-helper-header-btn",title:this.isCollapsed?this.t("expand"):this.t("collapse"),id:"chatgpt-helper-collapse-btn",type:"button","aria-label":this.isCollapsed?this.t("expand"):this.t("collapse")});s.appendChild(j(this.isCollapsed?"panelExpand":"panelCollapse",{size:16})),s.addEventListener("click",()=>this.toggleCollapse());const l=d("button",{className:"chatgpt-helper-header-btn",title:this.t("settingsTitle"),id:"chatgpt-helper-settings-btn",type:"button","aria-label":this.t("settingsTitle")});l.appendChild(j("settings",{size:15})),l.addEventListener("click",()=>{this.currentTab==="settings"?this.switchTab(this.previousTab||"prompts"):(this.previousTab=this.currentTab,this.switchTab("settings"))}),t.appendChild(n),t.appendChild(o),t.appendChild(i),t.appendChild(l),t.appendChild(s),r.appendChild(e),r.appendChild(t),this.panel.appendChild(r),this.updateCollapseButtonState(),this.initHeaderResponsiveSpacing(r);const h=d("div",{id:"chatgpt-helper-tabs"});h.setAttribute("role","tablist"),this.renderTabBar(h),this.panel.appendChild(h),this.initTabResponsiveSpacing(h);const p=d("div",{id:"chatgpt-helper-content"});["prompts","outline","conversations","export","settings"].forEach(f=>{const S=d("div",{className:`chatgpt-helper-content-panel ${this.currentTab===f?"active":""}`,id:`${f}-content`,"data-tab":f,role:"tabpanel","aria-labelledby":f==="settings"?"chatgpt-helper-settings-btn":`${f}-tab`});p.appendChild(S)}),this.panel.appendChild(p),this.initResizeHandle();const c=d("div",{className:"scroll-nav-container",id:"scroll-nav-container"}),u=d("button",{className:"scroll-nav-btn",id:"scroll-top-btn",title:this.t("outlineScrollTop"),type:"button","aria-label":this.t("outlineScrollTop")});u.appendChild(j("arrowUp",{size:15})),u.appendChild(d("span",{className:"chatgpt-helper-nav-label"},this.t("buttonScrollTop"))),u.addEventListener("click",()=>this.scrollToTop());const g=d("button",{className:"scroll-nav-btn",id:"scroll-anchor-btn",title:this.t("noAnchor"),type:"button","aria-label":this.t("returnPreviousPosition"),style:"opacity: 0.4; cursor: default;"});g.appendChild(j("anchor",{size:15})),g.appendChild(d("span",{className:"chatgpt-helper-nav-label"},this.t("buttonBack"))),g.addEventListener("click",()=>this.handleAnchorClick());const v=d("button",{className:"scroll-nav-btn",id:"scroll-bottom-btn",title:this.t("outlineScrollBottom"),type:"button","aria-label":this.t("outlineScrollBottom")});v.appendChild(j("arrowDown",{size:15})),v.appendChild(d("span",{className:"chatgpt-helper-nav-label"},this.t("buttonScrollBottom"))),v.addEventListener("click",()=>this.scrollToBottom()),c.appendChild(u),c.appendChild(g),c.appendChild(v),this.panel.appendChild(c),this.initScrollNavResponsive(c),this.switchTab(this.currentTab)},switchTab(r){const e={prompts:"renderPrompts",outline:"renderOutline",conversations:"renderConversations",export:"renderExport",settings:"renderSettings"};if(!e[r])return;this.currentTab==="export"&&this.disposeExporter?.(),r!=="export"&&(this._openImageOnMount=!1),this.currentTab=r,this.panel.querySelectorAll(".chatgpt-helper-tab").forEach(n=>{const a=n.dataset.tab===r;n.classList.toggle("active",a),n.setAttribute("aria-selected",String(a)),n.tabIndex=a?0:-1}),this.panel.querySelectorAll(".chatgpt-helper-content-panel").forEach(n=>{n.classList.toggle("active",n.id===r+"-content")});const t=this.panel.querySelector("#"+r+"-content");t&&(he(t),this[e[r]](t)),this.outlineManager?.setActive(r==="outline")}},Fn={selectPromptCategory(r){this.selectedCategory=r,this.updateCategoryBar(),setTimeout(()=>{this.refreshPromptList()},0)},renderPrompts(r){const e=d("div",{className:"chatgpt-helper-prompt-toolbar"}),t=d("div",{className:"chatgpt-helper-search-bar chatgpt-helper-prompt-search-bar"});t.appendChild(j("search",{size:15,className:"chatgpt-helper-prompt-search-icon"}));const n=d("input",{className:"chatgpt-helper-search-input",type:"text","aria-label":this.t("searchPlaceholder"),placeholder:this.t("searchPlaceholder"),value:this.searchQuery||""});n.addEventListener("input",M=>{this.searchQuery=M.target.value.trim(),this.refreshPromptList()}),t.appendChild(n),e.appendChild(t);const a=[{value:"manual",label:this.t("promptSortManual")},{value:"recent",label:this.t("promptSortRecent")},{value:"frequent",label:this.t("promptSortFrequent")}],o=this.settings.promptSortMode||"manual",i=d("div",{className:"chatgpt-helper-custom-select chatgpt-helper-prompt-sort-select",title:this.t("promptSortLabel"),"data-value":o}),s=d("button",{className:"chatgpt-helper-custom-select-trigger",type:"button","aria-haspopup":"listbox","aria-expanded":"false","aria-label":this.t("promptSortLabel"),title:this.t("promptSortLabel")}),l=d("span",{className:"chatgpt-helper-custom-select-value"},(a.find(M=>M.value===o)||a[0]).label),h=d("span",{className:"chatgpt-helper-custom-select-icon","aria-hidden":"true"},"\u25BE");s.appendChild(l),s.appendChild(h);const p=d("div",{className:"chatgpt-helper-custom-select-menu",role:"listbox"}),c=()=>{i.classList.remove("open"),s.setAttribute("aria-expanded","false")};a.forEach(M=>{const x=M.value===o,P=d("button",{className:"chatgpt-helper-custom-select-option"+(x?" selected":""),type:"button",role:"option","aria-selected":String(x),"data-value":M.value},M.label);P.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),this.settings.promptSortMode=M.value,this.saveSettings(),i.dataset.value=M.value,l.textContent=M.label,p.querySelectorAll(".chatgpt-helper-custom-select-option").forEach(w=>{const I=w.dataset.value===M.value;w.classList.toggle("selected",I),w.setAttribute("aria-selected",String(I))}),c(),this.refreshPromptList()}),p.appendChild(P)}),s.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();const x=!i.classList.contains("open");i.classList.toggle("open",x),s.setAttribute("aria-expanded",String(x))}),i.addEventListener("focusout",M=>{i.contains(M.relatedTarget)||c()}),i.appendChild(s),i.appendChild(p),e.appendChild(i);const u=d("button",{className:"chatgpt-helper-add-btn chatgpt-helper-add-btn-compact",type:"button",title:this.t("addPrompt"),"aria-label":this.t("addPrompt")});u.appendChild(j("plus",{size:16})),u.appendChild(d("span",{},this.t("addPrompt"))),u.addEventListener("click",()=>this.showAddPromptDialog()),e.appendChild(u),r.appendChild(e),this.initPromptsResponsive(r);const g=this.getCategories(),v=d("div",{className:"chatgpt-helper-categories chatgpt-helper-prompt-categories"}),f=this.t("allCategory"),S=d("button",{className:`chatgpt-helper-category-tag ${this.selectedCategory===f?"active":""}`,type:"button"},f);S.addEventListener("click",()=>this.selectPromptCategory(f)),v.appendChild(S),g.forEach(M=>{const x=d("button",{className:`chatgpt-helper-category-tag ${this.selectedCategory===M?"active":""}`,type:"button"},M);x.addEventListener("click",()=>this.selectPromptCategory(M)),v.appendChild(x)}),r.appendChild(v);const k=d("div",{className:"chatgpt-helper-prompt-list",id:"prompt-list"});r.appendChild(k),this.refreshPromptList()},refreshPromptList(){const r=this.panel.querySelector("#prompt-list");if(!r)return;he(r);let e=this.prompts;if(this.selectedCategory&&this.selectedCategory!==this.t("allCategory")&&(e=e.filter(n=>n.category===this.selectedCategory)),this.searchQuery){const n=this.searchQuery.toLowerCase();e=e.filter(a=>a.title.toLowerCase().includes(n)||a.content.toLowerCase().includes(n))}const t=this.settings.promptSortMode||"manual";if(t!=="manual"&&(e=[...e].sort((n,a)=>{if(t==="frequent"){const o=(a.useCount||0)-(n.useCount||0);if(o!==0)return o}return(a.lastUsedAt||0)-(n.lastUsedAt||0)})),e.length===0){const n=d("div",{className:"chatgpt-helper-empty-state chatgpt-helper-prompt-empty"});n.appendChild(j("edit",{size:22,className:"chatgpt-helper-prompt-empty-icon"})),n.appendChild(d("div",{className:"chatgpt-helper-prompt-empty-title"},this.searchQuery?this.t("noSearchResults"):this.t("noPrompts"))),n.appendChild(d("div",{className:"chatgpt-helper-prompt-empty-desc"},this.searchQuery?this.t("promptSearchEmptyHint"):this.t("promptEmptyHint")));const a=d("button",{className:"chatgpt-helper-add-btn chatgpt-helper-empty-add-btn",type:"button"},this.t("addPrompt"));a.addEventListener("click",()=>this.showAddPromptDialog()),n.appendChild(a),r.appendChild(n);return}e.forEach((n,a)=>{const o=this.prompts.findIndex(f=>f.id===n.id),i=d("div",{className:`chatgpt-helper-prompt-item ${this.selectedPrompt?.id===n.id?"selected":""}`,"data-prompt-id":n.id,"data-prompt-index":o!==-1?o:a}),s=d("div",{className:"chatgpt-helper-prompt-drag-handle"});i.appendChild(s);const l=d("div",{className:"chatgpt-helper-prompt-content-wrapper"}),h=d("div",{className:"chatgpt-helper-prompt-item-header"}),p=d("div",{className:"chatgpt-helper-prompt-title"},n.title);if(h.appendChild(p),n.category){const f=d("button",{className:"chatgpt-helper-prompt-category-pill",title:`${this.t("category")}: ${n.category}`,type:"button"},n.category);f.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation(),this.selectPromptCategory(n.category)}),h.appendChild(f)}const c=d("div",{className:"chatgpt-helper-prompt-content"},n.content);l.appendChild(h),l.appendChild(c);const u=d("div",{className:"chatgpt-helper-prompt-actions"}),g=d("button",{className:"edit-btn",title:this.t("edit"),"aria-label":this.t("edit"),type:"button"});g.appendChild(j("edit",{size:14})),g.addEventListener("click",f=>{f.stopPropagation(),this.showEditPromptDialog(n)});const v=d("button",{className:"delete-btn",title:this.t("delete"),"aria-label":this.t("delete"),type:"button"});v.appendChild(j("trash",{size:14})),v.addEventListener("click",f=>{f.stopPropagation(),confirm(this.t("confirmDelete"))&&this.deletePrompt(n.id)}),u.appendChild(g),u.appendChild(v),l.appendChild(u),i.appendChild(l),this.initPromptDrag(i,n,o!==-1?o:a),i.addEventListener("click",f=>{!f.target.closest("button")&&!f.target.closest(".chatgpt-helper-prompt-drag-handle")&&(this.selectedPrompt=n,this.usePrompt(n))}),r.appendChild(i)})},initPromptDrag(r,e,t){const n=r.querySelector(".chatgpt-helper-prompt-drag-handle");if(!n)return;let a=!1;const o=this.prompts.findIndex(l=>l.id===e.id);if(o===-1)return;n.addEventListener("mousedown",l=>{l.preventDefault(),l.stopPropagation(),a=!0,r.classList.add("dragging"),r.style.opacity="0.5",document.body.style.cursor="grabbing",document.addEventListener("mousemove",i),document.addEventListener("mouseup",s),window.addEventListener("blur",s)});const i=l=>{if(!a)return;const h=this.panel.querySelector("#prompt-list");if(!h)return;const p=Array.from(h.querySelectorAll(".chatgpt-helper-prompt-item:not(.dragging)")),c=l.clientY;p.forEach(u=>u.classList.remove("drag-over"));for(let u=0;u<p.length;u++){const g=p[u].getBoundingClientRect(),v=g.top+g.height/2;if(c<v){p[u].classList.add("drag-over");break}}if(p.length>0){const u=p[p.length-1].getBoundingClientRect();c>u.bottom&&p[p.length-1].classList.add("drag-over")}},s=l=>{if(!a)return;a=!1,r.classList.remove("dragging"),r.style.opacity="",document.body.style.cursor="";const h=this.panel.querySelector("#prompt-list");if(h){const p=Array.from(h.querySelectorAll(".chatgpt-helper-prompt-item")),c=e.id;let u=o;for(let g=0;g<p.length;g++)if(p[g]!==r&&p[g].classList.contains("drag-over")){const v=p[g].dataset.promptId;u=this.prompts.findIndex(f=>f.id===v),u===-1&&(u=o);break}p.forEach(g=>g.classList.remove("drag-over")),u!==o&&u!==-1&&this.reorderPrompts(c,u)}document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",s),window.removeEventListener("blur",s)}},reorderPrompts(r,e){const t=this.prompts.findIndex(o=>o.id===r);if(t===-1)return;const[n]=this.prompts.splice(t,1);let a=e;e>t&&(a=e-1),this.prompts.splice(a,0,n),this.savePrompts(),this.refreshPromptList()},getCategories(){const r=new Set;return this.prompts.forEach(e=>{e.category&&r.add(e.category)}),Array.from(r).sort()},updateCategoryBar(){const r=this.panel?.querySelector('.chatgpt-helper-content-panel[data-tab="prompts"]')||this.panel?.querySelector("#prompts-content");if(!r)return;const e=r.querySelector(".chatgpt-helper-categories");if(!e)return;const t=this.selectedCategory,n=this.getCategories(),a=this.t("allCategory");he(e);const o=d("button",{className:`chatgpt-helper-category-tag ${t===a?"active":""}`,type:"button"},a);o.addEventListener("click",()=>this.selectPromptCategory(a)),e.appendChild(o),n.forEach(i=>{const s=d("button",{className:`chatgpt-helper-category-tag ${t===i?"active":""}`,type:"button"},i);s.addEventListener("click",()=>this.selectPromptCategory(i)),e.appendChild(s)})},showAddPromptDialog(){this.showPromptDialog(null)},showEditPromptDialog(r){this.showPromptDialog(r)},showPromptDialog(r=null){const e=d("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),t=d("div",{className:"chatgpt-helper-prompt-dialog",role:"dialog","aria-modal":"true","aria-label":r?this.t("editPrompt"):this.t("addPrompt")}),n=d("h3",{className:"chatgpt-helper-prompt-dialog-title"},r?this.t("editPrompt"):this.t("addPrompt")),a=d("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:this.t("title"),value:r?.title||""}),o=d("textarea",{className:"chatgpt-helper-prompt-dialog-field chatgpt-helper-prompt-dialog-textarea",placeholder:this.t("content"),value:r?.content||""}),i=d("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:`${this.t("category")} (${this.t("optional")})`,value:r?.category||""}),s=d("div",{className:"chatgpt-helper-prompt-dialog-actions"}),l=d("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));l.addEventListener("click",()=>e.remove());const h=d("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("save"));h.addEventListener("click",()=>{if(!e.isConnected)return;const p=a.value.trim(),c=o.value.trim(),u=i.value.trim();if(!p||!c){alert(this.t("fillTitleContent"));return}const g=new Set(this.getCategories()),v=u&&!g.has(u);r?this.updatePrompt(r.id,{title:p,content:c,category:u}):this.addPrompt({title:p,content:c,category:u}),e.remove(),v&&(!this.selectedCategory||this.selectedCategory===this.t("allCategory"))&&(this.selectedCategory=u),setTimeout(()=>{this.updateCategoryBar(),this.refreshPromptList()},0)}),s.appendChild(l),s.appendChild(h),t.appendChild(n),t.appendChild(a),t.appendChild(o),t.appendChild(i),t.appendChild(s),e.appendChild(t),document.body.appendChild(e),e.addEventListener("click",p=>{p.target===e&&e.remove()})},addPrompt(r){r.id="custom_"+Date.now(),this.prompts.push(r),this.savePrompts()},updatePrompt(r,e){const t=this.prompts.findIndex(n=>n.id===r);t!==-1&&(this.prompts[t]={...this.prompts[t],...e},this.savePrompts())},deletePrompt(r){this.prompts=this.prompts.filter(e=>e.id!==r),this.savePrompts(),this.updateCategoryBar(),this.refreshPromptList()},trackPromptUsage(r){const e=this.prompts.find(t=>t.id===r);e&&(e.useCount=(Number(e.useCount)||0)+1,e.lastUsedAt=Date.now(),this.savePrompts(),this.currentTab==="prompts"&&this.refreshPromptList())},usePrompt(r,e={}){if(!r)return;const t=ft(r.content);if(t.length>0){if(e.replaceComposer&&this.promptQuickMenu)try{this.promptQuickMenu.replaceComposerText("")}catch{}this.showPromptVariablesDialog(r,t,n=>{this.trackPromptUsage(r.id),this.applyPromptToComposer(n,e)})}else this.trackPromptUsage(r.id),this.applyPromptToComposer(r.content,e)},applyPromptToComposer(r,e={}){let t=!1;e.replaceComposer&&this.promptQuickMenu&&(t=this.promptQuickMenu.replaceComposerText(r)),t||(t=this.adapter.insertPrompt(r)),this.showToast(t?this.t("inserted"):this.t("operationFailed"))},showPromptVariablesDialog(r,e,t){const n=d("div",{className:"chatgpt-helper-prompt-dialog-overlay",role:"presentation"}),a=d("div",{className:"chatgpt-helper-prompt-dialog chatgpt-helper-prompt-variables-dialog",role:"dialog","aria-modal":"true","aria-label":this.t("promptVariablesTitle")});a.appendChild(d("h3",{className:"chatgpt-helper-prompt-dialog-title"},this.t("promptVariablesTitle"))),a.appendChild(d("div",{className:"chatgpt-helper-prompt-variables-prompt-name"},r?.title||"")),a.appendChild(d("div",{className:"chatgpt-helper-prompt-variables-desc"},this.t("promptVariablesDesc")));const o={};e.forEach(p=>{const c=d("div",{className:"chatgpt-helper-prompt-variables-row"});c.appendChild(d("label",{className:"chatgpt-helper-prompt-variables-label"},`{{${p}}}`));const u=d("input",{className:"chatgpt-helper-prompt-dialog-field",type:"text",placeholder:p});o[p]=u,c.appendChild(u),a.appendChild(c)});const i=d("div",{className:"chatgpt-helper-prompt-dialog-actions"}),s=d("button",{className:"chatgpt-helper-prompt-dialog-btn secondary",type:"button"},this.t("cancel"));s.addEventListener("click",()=>n.remove());const l=d("button",{className:"chatgpt-helper-prompt-dialog-btn primary",type:"button"},this.t("promptInsert"));l.addEventListener("click",()=>{if(!n.isConnected)return;const p={};e.forEach(u=>{p[u]=(o[u].value||"").trim()}),n.remove();const c=Qt(r.content,p);t(c)}),i.appendChild(s),i.appendChild(l),a.appendChild(i),n.appendChild(a),document.body.appendChild(n),n.addEventListener("click",p=>{p.target===n&&n.remove()});const h=a.querySelector('input[type="text"]');h&&setTimeout(()=>h.focus(),50)}};function Mr(r){return String(r||"").match(/\/c\/([a-zA-Z0-9-]+)(?:\/|$)/)?.[1]||null}const On={syncExporterLanguage(){this.exporterController?.setLanguage(Xe())},async loadExportDependency(r="engine"){this._exportLoads||(this._exportLoads=new Map);const e=()=>r==="engine"?window.__MY_EXT__?.exporter?.buildId===at?window.__MY_EXT__.exporter:null:window.JSZip;if(e())return e();if(this._exportLoads.has(r))return this._exportLoads.get(r);const t=new Promise((n,a)=>{const o=globalThis.chrome?.runtime;if(!o?.id)return a(new Error(this.t("exportEngineInjectFailed")));o.sendMessage({type:"ch-helper-inject-export-deps",dependency:r,buildId:at},i=>{const s=o.lastError;s||!i?.ok||!e()?a(new Error(s?.message||i?.error||this.t("exportModuleMissing"))):n(e())})});this._exportLoads.set(r,t);try{return await t}finally{this._exportLoads.delete(r)}},disposeExporter(){this._exportRevision=(this._exportRevision||0)+1,this.exporterController?.destroy(),this.exporterController=null},async renderExport(r){this.disposeExporter();const e=this._exportRevision;r.classList.add("chatgpt-helper-export-panel");const t=d("div",{className:"chatgpt-helper-export-container",id:"chatgpt-helper-export-container"}),n=d("div",{className:"chatgpt-helper-export-engine-loading",role:"status"},this.t("exportEngineLoading"));r.appendChild(t),window.__MY_EXT__?.exporter||t.appendChild(n);try{const a=await this.loadExportDependency();if(this.destroyed||e!==this._exportRevision||!t.isConnected)return;n.remove(),this.exporterController=a.mount(t,{protocol:1,buildId:at,request:(o,i)=>this.backend.json(o,i),getMessages:()=>An(this.adapter),getSelectedMessages:()=>this.messageSelectManager.collectSelectedMessages(),subscribe:o=>this.messageSelectManager.subscribe(o),getContext:()=>({origin:location.origin,conversationId:Mr(location.pathname),path:location.pathname,title:this.adapter.getSessionName()||"ChatGPT",language:Xe(),theme:this.currentEffectiveTheme}),notify:o=>this.showToast(o),loadDependency:o=>this.loadExportDependency(o)}),this._openImageOnMount&&(this._openImageOnMount=!1,this.exporterController.openImage())}catch(a){if(e!==this._exportRevision||!t.isConnected)return;n.remove();const o=d("p",{className:"chatgpt-helper-export-engine-error",role:"alert"},a.message),i=d("button",{className:"chatgpt-helper-btn",type:"button"},this.t("refresh"));i.addEventListener("click",()=>{r.replaceChildren(),this.renderExport(r)}),t.append(o,i)}},openImageExport(){this.exporterController&&this.currentTab==="export"?this.exporterController.openImage():(this._openImageOnMount=!0,this.isCollapsed&&this.toggleCollapse(),this.switchTab("export"))}},Dn={renderConversations(r){this.conversationManager?(this.conversationManager.container=r,this.conversationManager.settings=this.settings,this.conversationManager.t=this.t):this.conversationManager=new hr({container:r,settings:this.settings,adapter:this.adapter,i18n:this.t}),this.conversationManager.createUI();const e=this.conversationManager.data;console.log("[ChatGPT Helper] \u4F1A\u8BDD\u7BA1\u7406\u5668\u6570\u636E:",{folders:e.folders?.length||0,conversations:Object.keys(e.conversations||{}).length,hasData:Object.keys(e.conversations||{}).length>0}),Object.keys(e.conversations||{}).length===0&&console.log("[ChatGPT Helper] \u5F53\u524D\u6CA1\u6709\u4FDD\u5B58\u7684\u4F1A\u8BDD\uFF0C\u8FD9\u662F\u6B63\u5E38\u7684\uFF08\u65B0\u5B89\u88C5\u6216\u672A\u540C\u6B65\uFF09")},renderSettings(r){const e=d("div",{className:"chatgpt-helper-settings-scroll chatgpt-helper-settings-compact"}),t=this.settingsScrollTop;this.settingsScrollTop=null;const n=()=>{const y=this.panel?.querySelector("#settings-content");if(!y)return;const E=y.querySelector(".chatgpt-helper-settings-compact");this.settingsScrollTop=E?E.scrollTop:null,he(y),this.renderSettings(y)},a=()=>(this.settings.readingHistory||(this.settings.readingHistory={persistence:!0,autoRestore:!1,cleanupDays:30}),this.settings.readingHistory),o=()=>(this.settings.outline||(this.settings.outline={}),this.settings.outline),i=()=>(this.settings.tabSettings||(this.settings.tabSettings={}),this.settings.tabSettings),s=()=>(this.settings.formulaCopy||(this.settings.formulaCopy={enabled:!0}),this.settings.formulaCopy),l=()=>(this.settings.tableCopy||(this.settings.tableCopy={enabled:!0}),this.settings.tableCopy),h=window.GM_getValue(J.LANGUAGE,"auto"),p=h==="auto"||$e[h]?h:"auto",c=i(),u=y=>{let E=null;if(y.type==="toggle")E=d("button",{className:"chatgpt-helper-toggle"+(y.value?" active":""),type:"button","aria-label":y.label,"aria-pressed":y.value?"true":"false"}),E.appendChild(d("div",{className:"chatgpt-helper-toggle-knob"})),E.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation();const A=!y.value;y.value=A,E.classList.toggle("active",A),E.setAttribute("aria-pressed",A?"true":"false"),y.onChange&&y.onChange(A)===!1&&(y.value=!A,E.classList.toggle("active",!A),E.setAttribute("aria-pressed",A?"false":"true"))});else if(y.type==="select"){const C=y.options||[],A=C.find(m=>String(m.value)===String(y.value))||C[0];E=d("div",{className:"chatgpt-helper-custom-select chatgpt-helper-settings-compact-select","data-value":A?String(A.value):""});const L=d("button",{className:"chatgpt-helper-custom-select-trigger",type:"button","aria-haspopup":"listbox","aria-expanded":"false","aria-label":y.label}),F=d("span",{className:"chatgpt-helper-custom-select-value"},A?A.label:""),R=d("span",{className:"chatgpt-helper-custom-select-icon","aria-hidden":"true"},"\u25BE");L.appendChild(F),L.appendChild(R);const H=d("div",{className:"chatgpt-helper-custom-select-menu",role:"listbox"}),z=()=>{E.classList.remove("open"),L.setAttribute("aria-expanded","false")},G=()=>{E.classList.add("open"),L.setAttribute("aria-expanded","true")},V=m=>{const Q=m.value;y.value=Q,E.dataset.value=String(Q),F.textContent=m.label,H.querySelectorAll(".chatgpt-helper-custom-select-option").forEach(W=>{const b=W.dataset.value===String(Q);W.classList.toggle("selected",b),W.setAttribute("aria-selected",b?"true":"false")}),z(),y.onChange&&y.onChange(Q)};C.forEach(m=>{const Q=String(m.value)===String(y.value),W=d("button",{className:"chatgpt-helper-custom-select-option"+(Q?" selected":""),type:"button",role:"option","aria-selected":Q?"true":"false","data-value":String(m.value)},m.label);W.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),V(m)}),H.appendChild(W)}),L.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),E.classList.contains("open")?z():G()}),E.addEventListener("focusout",m=>{E.contains(m.relatedTarget)||z()}),E.appendChild(L),E.appendChild(H)}else if(y.type==="number"){E=d("input",{className:"chatgpt-helper-settings-compact-input",type:"number",value:y.value,min:y.min!==void 0?y.min:200,max:y.max!==void 0?y.max:600,step:y.step!==void 0?y.step:1,"aria-label":y.label});const C=()=>{y.onChange&&y.onChange(E.value)};E.addEventListener("change",C),E.addEventListener("blur",C),E.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),E.blur(),C())})}else if(y.type==="text"){E=d("input",{className:"chatgpt-helper-settings-compact-input chatgpt-helper-settings-compact-text",type:"text",value:y.value||"",placeholder:y.placeholder||"","aria-label":y.label});const C=()=>{y.onChange&&y.onChange(E.value)};E.addEventListener("change",C),E.addEventListener("blur",C),E.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),E.blur(),C())})}else y.type==="button"&&(E=d("button",{className:"chatgpt-helper-theme-launch-btn chatgpt-helper-settings-compact-button",type:"button"},y.buttonText||y.label),E.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),y.onClick&&y.onClick()}));return E},g=y=>{const E=d("div",{className:"chatgpt-helper-settings-compact-row"}),C=d("div",{className:"chatgpt-helper-settings-compact-label"+(y.desc?" has-desc":""),title:y.desc?`${y.label} - ${y.desc}`:y.label});C.appendChild(d("div",{className:"chatgpt-helper-settings-compact-label-text"},y.label)),y.desc&&C.appendChild(d("div",{className:"chatgpt-helper-settings-compact-desc"},y.desc)),E.appendChild(C);const A=u(y);if(A){const L=d("div",{className:"chatgpt-helper-settings-compact-controls"});L.appendChild(A),E.appendChild(L)}return E},v=()=>(this.expandedSettingsSections||(this.expandedSettingsSections=new Set),this.expandedSettingsSections),f=(y,E,C,A={})=>{const L=v(),F=!L.has(y),R=`chatgpt-helper-settings-${y}-list`,z=d("section",{className:F?"chatgpt-helper-settings-compact-section collapsed":"chatgpt-helper-settings-compact-section","data-settings-section":y}),G=d("div",{className:"chatgpt-helper-settings-compact-title"}),V=d("button",{className:"chatgpt-helper-settings-compact-title-btn",type:"button","aria-expanded":String(!F),"aria-controls":R});V.appendChild(d("span",{className:"chatgpt-helper-settings-compact-title-chevron","aria-hidden":"true"},">")),V.appendChild(d("span",{className:"chatgpt-helper-settings-compact-title-text"},E)),A.count!=null&&V.appendChild(d("span",{className:"chatgpt-helper-settings-compact-title-count","aria-hidden":"true"},String(A.count))),V.addEventListener("click",()=>{const Q=!z.classList.contains("collapsed");z.classList.toggle("collapsed",Q),V.setAttribute("aria-expanded",String(!Q)),Q?L.delete(y):L.add(y)}),G.appendChild(V),z.appendChild(G);const m=C();return m.id=R,z.appendChild(m),z},S=(y,E,C)=>f(y,E,()=>{const A=d("div",{className:"chatgpt-helper-settings-compact-list"});return C.filter(Boolean).forEach(L=>A.appendChild(L instanceof Node?L:g(L))),A},{count:C.filter(Boolean).length}),k=["prompts","outline","conversations","export"],M=()=>{const y=this.getTabOrder();return y.map((E,C)=>{const A=xt[E],L=d("div",{className:"chatgpt-helper-settings-compact-row chatgpt-helper-settings-quick-button-row"}),F=d("div",{className:"chatgpt-helper-settings-compact-label chatgpt-helper-settings-icon-label"}),R=d("span",{className:"chatgpt-helper-inline-icon-wrap"});R.appendChild(j(A?.iconName||"list",{size:14,className:"chatgpt-helper-inline-icon"})),F.appendChild(R),F.appendChild(d("span",{},this.getTabLabel(E)));const H=d("div",{className:"chatgpt-helper-settings-compact-controls"}),z=m=>{const Q=this.getTabOrder(),W=C+m;if(W<0||W>=Q.length)return;const b=[...Q];[b[C],b[W]]=[b[W],b[C]],this.settings.tabOrder=b,this.saveSettings(),this.rebuildTabBar(),this.showToast(this.t("tabOrderUpdated")||"Tab order updated"),n()},G=d("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveUp")||"Move Up",type:"button"});G.appendChild(j("arrowUp",{size:14})),G.disabled=C===0,G.addEventListener("click",()=>z(-1));const V=d("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveDown")||"Move Down",type:"button"});return V.appendChild(j("arrowDown",{size:14})),V.disabled=C===y.length-1,V.addEventListener("click",()=>z(1)),H.appendChild(G),H.appendChild(V),L.appendChild(F),L.appendChild(H),L})},x=y=>({label:(this.t("settingsShowTab")||'Show "{name}"').replace("{name}",this.getTabLabel(y)),type:"toggle",value:this.settings.tabOrder?.includes(y)!==!1,onChange:E=>{if((!Array.isArray(this.settings.tabOrder)||this.settings.tabOrder.length===0)&&(this.settings.tabOrder=this.getTabOrder()),E){const C=[...this.settings.tabOrder,y].filter((A,L,F)=>F.indexOf(A)===L).sort((A,L)=>k.indexOf(A)-k.indexOf(L));this.settings.tabOrder=C}else{const C=this.settings.tabOrder.filter(A=>A!==y);if(C.length===0)return this.showToast(this.t("operationFailed")||"Operation failed"),!1;this.settings.tabOrder=C,this.currentTab===y&&(this.currentTab=C[0],this.switchTab(this.currentTab))}return this.saveSettings(),this.rebuildTabBar(),n(),!0}}),P=()=>{const y=Array.isArray(this.settings.collapsedButtonsOrder)?this.settings.collapsedButtonsOrder:[],E=Array.from(new Set(y.map(C=>C?.id).filter(C=>Pe[C])));return Ge.forEach(C=>{E.includes(C.id)||E.push(C.id)}),E.map(C=>({id:C,enabled:!0}))},D=()=>{const y=P();return f("quick-buttons",this.t("settingsGroupQuickButtons")||"Quick Buttons",()=>{const E=d("div",{className:"chatgpt-helper-settings-compact-list"});return y.forEach((C,A)=>{const L=Pe[C.id];if(!L)return;const F=d("div",{className:"chatgpt-helper-settings-compact-row chatgpt-helper-settings-quick-button-row"}),R=d("div",{className:"chatgpt-helper-settings-compact-label chatgpt-helper-settings-icon-label"}),H=d("span",{className:"chatgpt-helper-inline-icon-wrap"});H.appendChild(Ct(L,{size:16,className:"chatgpt-helper-inline-icon"})),R.appendChild(H),R.appendChild(d("span",{},L.labelKey?this.t(L.labelKey):L.label||C.id));const z=d("div",{className:"chatgpt-helper-settings-compact-controls"}),G=Q=>{const W=A+Q;if(W<0||W>=y.length)return;const b=[...y];[b[A],b[W]]=[b[W],b[A]],this.settings.collapsedButtonsOrder=b.map(ne=>({id:ne.id,enabled:!0})),this.saveSettings(),this.createCollapsedButtons(),this.showToast(this.t("buttonOrderUpdated")||"Button order updated"),n()},V=d("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveUp")||"Move Up",type:"button"});V.appendChild(j("arrowUp",{size:14})),V.disabled=A===0,V.addEventListener("click",()=>G(-1));const m=d("button",{className:"prompt-panel-btn chatgpt-helper-order-btn",title:this.t("moveDown")||"Move Down",type:"button"});m.appendChild(j("arrowDown",{size:14})),m.disabled=A===y.length-1,m.addEventListener("click",()=>G(1)),z.appendChild(V),z.appendChild(m),F.appendChild(R),F.appendChild(z),E.appendChild(F)}),E},{count:y.length})};[S("general",this.t("settingsGroupGeneral")||"General",[{label:this.t("themeDialogTitle")||"Theme",type:"button",buttonText:this.t("openThemeSettings")||"Open Theme Settings",onClick:()=>this.openThemeSettingsModal()},{label:this.t("language")||"Interface Language",type:"select",value:p,options:[{value:"auto",label:this.t("autoDetect")},{value:"zh-CN",label:this.t("chinese")},{value:"en",label:this.t("english")}],onChange:y=>{window.GM_setValue(J.LANGUAGE,y),At(y==="auto"?Ue():y),this.syncExporterLanguage&&this.syncExporterLanguage(),this.lang=y,this.selectedCategory=this.t("allCategory"),window.GM_getValue(J.PROMPTS,null)||(this.prompts=Qe()),this.createUI(),this.showToast(this.t("languageChanged"))}},{label:this.t("defaultPanelOpenLabel")||"Open Panel by Default",type:"toggle",value:this.settings.defaultPanelState,onChange:y=>{this.settings.defaultPanelState=y,this.saveSettings()}},{label:this.t("promptQuickMenuEnabledLabel")||"Slash Quick Menu",type:"toggle",value:this.settings.promptQuickMenuEnabled!==!1,onChange:y=>{this.settings.promptQuickMenuEnabled=y,this.saveSettings();try{if(!this.promptQuickMenu)return;y?this.promptQuickMenu.start():this.promptQuickMenu.stop()}catch(E){console.error("[ChatGPT Helper] \u5207\u6362\u5FEB\u901F\u83DC\u5355\u5931\u8D25:",E)}this.showToast(this.t(y?"enabled":"disabled")+" "+this.t("promptQuickMenuEnabledLabel"))}},{label:this.t("shortcutHintLabel")||"Panel Shortcut",type:"button",buttonText:"Alt+Shift+H",onClick:()=>{this.showToast(this.t("shortcutHintDesc"))}},{label:this.t("replayOnboarding")||"Replay Onboarding",type:"button",buttonText:this.t("replayOnboarding"),onClick:()=>this.maybeShowOnboarding({force:!0})}]),S("tabs",this.t("settingsGroupTabs")||"Tabs",[...M(),x("prompts"),x("outline"),x("conversations"),x("export")]),S("reading-navigation",this.t("settingsGroupReadingNavigation")||"Reading & Navigation",[{label:this.t("preventAutoScrollLabel")||"Prevent Auto Scroll",desc:this.t("preventAutoScrollDesc")||"Keep the page from jumping to the latest reply while you are reading earlier content.",type:"toggle",value:this.settings.preventAutoScroll||!1,onChange:y=>{this.settings.preventAutoScroll=y,this.saveSettings(),this.scrollLockManager||(this.scrollLockManager=new Lt(this.adapter)),this.scrollLockManager.setEnabled(y),this.showToast(this.t(y?"enabled":"disabled")+" "+this.t("preventAutoScrollLabel"))}},{label:this.t("enableReadingHistoryLabel")||"Reading History",desc:this.t("enableReadingHistoryDesc")||"Remember the last reading position for each conversation.",type:"toggle",value:this.settings.readingHistory?.persistence!==!1,onChange:y=>{const E=a();E.persistence=y,this.saveSettings(),y&&this.readingProgressManager&&this.readingProgressManager.startRecording(),this.showToast(this.t(y?"enabled":"disabled")+" "+this.t("readingHistory"))}},{label:this.t("autoRestoreLabel")||"Auto Restore Position",desc:this.t("autoRestoreDesc")||"Open a conversation at the last remembered reading position.",type:"toggle",value:this.settings.readingHistory?.autoRestore||!1,onChange:y=>{const E=a();E.autoRestore=y,this.saveSettings(),this.showToast(this.t(y?"enabled":"disabled")+" "+this.t("autoRestoreLabel"))}},{label:this.t("showUserMessagesLabel")||"Show User Messages",desc:this.t("showUserMessagesDesc")||"Include your questions as outline nodes.",type:"toggle",value:this.settings.outline?.showUserQueries!==!1,onChange:y=>{const E=o();E.showUserQueries=y,this.saveSettings(),this.currentTab==="outline"&&this.refreshOutline()}},{label:this.t("outlineSyncScrollLabel")||"Outline Follows Reading Position",desc:this.t("outlineSyncScrollDesc")||"Highlight the matching outline item as you scroll the conversation.",type:"toggle",value:this.settings.outline?.syncScroll!==!1,onChange:y=>{const E=o();E.syncScroll=y,this.saveSettings(),this.outlineManager&&this.outlineManager.updateSyncScrollState()}}]),S("content-processing",this.t("settingsGroupContentProcessing")||"Content Processing",[{label:this.t("enableFormulaCopyLabel")||"Formula Copy",type:"toggle",value:this.settings.formulaCopy?.enabled!==!1,onChange:y=>{const E=s();E.enabled=y,this.saveSettings(),this.copyManager&&(y?this.copyManager.initFormulaCopy():this.copyManager.destroyFormulaCopy())}},{label:this.t("enableTableCopyLabel")||"Table Copy",type:"toggle",value:this.settings.tableCopy?.enabled!==!1,onChange:y=>{const E=l();E.enabled=y,this.saveSettings(),this.copyManager&&(y?this.copyManager.initTableCopy():this.copyManager.destroyTableCopy())}}]),S("browser-tab",this.t("settingsGroupBrowserTab")||"Browser Tab",[{label:this.t("tabAutoRenameLabel")||"Auto Rename Tab",type:"toggle",value:c.enabled!==!1,onChange:y=>{const E=i();E.enabled=y,this.saveSettings(),this.tabRenameManager&&(y?this.tabRenameManager.start():this.tabRenameManager.stop())}},{label:this.t("tabShowStatusLabel")||"Show Generation Status",type:"toggle",value:c.showStatus!==!1,onChange:y=>{const E=i();E.showStatus=y,this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0)}},{label:this.t("tabPlaySoundLabel")||"Play Notification Sound",type:"toggle",value:c.notificationSound||!1,onChange:y=>{const E=i();E.notificationSound=y,E.notificationVolume==null&&(E.notificationVolume=.5),this.saveSettings(),this.tabRenameManager&&(y?this.tabRenameManager.ensureNotificationAudioUnlock():this.tabRenameManager.teardownNotificationAudioUnlock()),n()}},c.notificationSound?{label:this.t("tabVolumeLabel")||"Notification Volume",type:"number",value:c.notificationVolume||.5,min:.1,max:1,step:.1,onChange:y=>{const E=i();let C=parseFloat(y);isNaN(C)&&(C=.5),E.notificationVolume=Math.max(.1,Math.min(1,C)),this.saveSettings()}}:null,{label:this.t("tabPrivacyModeLabel")||"Privacy Mode",type:"toggle",value:c.privacyMode||!1,onChange:y=>{const E=i();E.privacyMode=y,this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0),n()}},c.privacyMode?{label:this.t("tabPrivacyTitleLabel")||"Privacy Title",type:"text",value:c.privacyTitle||"ChatGPT",onChange:y=>{const E=i();E.privacyTitle=y||"ChatGPT",this.saveSettings(),this.tabRenameManager&&this.tabRenameManager.updateTabName(!0)}}:null]),D(),S("data",this.t("settingsGroupData")||"Backup & Restore",[{label:this.t("backupExportButton")||"Export Backup",desc:this.t("backupExportDesc"),type:"button",buttonText:this.t("backupExportButton"),onClick:()=>this.exportBackupData()},{label:this.t("backupImportButton")||"Import Backup",desc:this.t("backupImportDesc"),type:"button",buttonText:this.t("backupImportButton"),onClick:()=>this.importBackupData()}])].forEach(y=>e.appendChild(y));const I=d("div",{className:"chatgpt-helper-settings-footer"}),q=d("button",{className:"chatgpt-helper-about-btn",type:"button"},this.t("aboutButton")||"About");q.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),this.openAboutModal(y.currentTarget)}),I.appendChild(q),e.appendChild(I),r.appendChild(e),t!=null&&(e.scrollTop=t)}},qn={};function Hn(r,e){const t=qn,n=typeof t.includeImageAlt=="boolean"?t.includeImageAlt:!0,a=typeof t.includeHtml=="boolean"?t.includeHtml:!0;return Lr(r,n,a)}function Lr(r,e,t){if($n(r)){if("value"in r)return r.type==="html"&&!t?"":r.value;if(e&&"alt"in r&&r.alt)return r.alt;if("children"in r)return Ir(r.children,e,t)}return Array.isArray(r)?Ir(r,e,t):""}function Ir(r,e,t){const n=[];let a=-1;for(;++a<r.length;)n[a]=Lr(r[a],e,t);return n.join("")}function $n(r){return!!(r&&typeof r=="object")}function xe(r,e,t,n){const a=r.length;let o=0,i;if(e<0?e=-e>a?0:a+e:e=e>a?a:e,t=t>0?t:0,n.length<1e4)i=Array.from(n),i.unshift(e,t),r.splice(...i);else for(t&&r.splice(e,t);o<n.length;)i=n.slice(o,o+1e4),i.unshift(e,0),r.splice(...i),o+=1e4,e+=1e4}function pe(r,e){return r.length>0?(xe(r,r.length,0,e),r):e}const Pr={}.hasOwnProperty;function Un(r){const e={};let t=-1;for(;++t<r.length;)Gn(e,r[t]);return e}function Gn(r,e){let t;for(t in e){const a=(Pr.call(r,t)?r[t]:void 0)||(r[t]={}),o=e[t];let i;if(o)for(i in o){Pr.call(a,i)||(a[i]=[]);const s=o[i];jn(a[i],Array.isArray(s)?s:s?[s]:[])}}}function jn(r,e){let t=-1;const n=[];for(;++t<e.length;)(e[t].add==="after"?r:n).push(e[t]);xe(r,0,0,n)}const Vn=/[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,ve=Ae(/[A-Za-z]/),me=Ae(/[\dA-Za-z]/),Qn=Ae(/[#-'*+\--9=?A-Z^-~]/);function _t(r){return r!==null&&(r<32||r===127)}const Rt=Ae(/\d/),Wn=Ae(/[\dA-Fa-f]/),Yn=Ae(/[!-/:-@[-`{-~]/);function $(r){return r!==null&&r<-2}function se(r){return r!==null&&(r<0||r===32)}function Y(r){return r===-2||r===-1||r===32}const Kn=Ae(Vn),Xn=Ae(/\s/);function Ae(r){return e;function e(t){return t!==null&&r.test(String.fromCharCode(t))}}function te(r,e,t,n){const a=n?n-1:Number.POSITIVE_INFINITY;let o=0;return i;function i(l){return Y(l)?(r.enter(t),s(l)):e(l)}function s(l){return Y(l)&&o++<a?(r.consume(l),s):(r.exit(t),e(l))}}const Jn={tokenize:Zn};function Zn(r){const e=r.attempt(this.parser.constructs.contentInitial,n,a);let t;return e;function n(s){if(s===null){r.consume(s);return}return r.enter("lineEnding"),r.consume(s),r.exit("lineEnding"),te(r,e,"linePrefix")}function a(s){return r.enter("paragraph"),o(s)}function o(s){const l=r.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=l),t=l,i(s)}function i(s){if(s===null){r.exit("chunkText"),r.exit("paragraph"),r.consume(s);return}return $(s)?(r.consume(s),r.exit("chunkText"),o):(r.consume(s),i)}}const ea={tokenize:ta},Nr={tokenize:ra};function ta(r){const e=this,t=[];let n=0,a,o,i;return s;function s(x){if(n<t.length){const P=t[n];return e.containerState=P[1],r.attempt(P[0].continuation,l,h)(x)}return h(x)}function l(x){if(n++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,a&&M();const P=e.events.length;let D=P,w;for(;D--;)if(e.events[D][0]==="exit"&&e.events[D][1].type==="chunkFlow"){w=e.events[D][1].end;break}k(n);let I=P;for(;I<e.events.length;)e.events[I][1].end=Object.assign({},w),I++;return xe(e.events,D+1,0,e.events.slice(P)),e.events.length=I,h(x)}return s(x)}function h(x){if(n===t.length){if(!a)return u(x);if(a.currentConstruct&&a.currentConstruct.concrete)return v(x);e.interrupt=!!(a.currentConstruct&&!a._gfmTableDynamicInterruptHack)}return e.containerState={},r.check(Nr,p,c)(x)}function p(x){return a&&M(),k(n),u(x)}function c(x){return e.parser.lazy[e.now().line]=n!==t.length,i=e.now().offset,v(x)}function u(x){return e.containerState={},r.attempt(Nr,g,v)(x)}function g(x){return n++,t.push([e.currentConstruct,e.containerState]),u(x)}function v(x){if(x===null){a&&M(),k(0),r.consume(x);return}return a=a||e.parser.flow(e.now()),r.enter("chunkFlow",{contentType:"flow",previous:o,_tokenizer:a}),f(x)}function f(x){if(x===null){S(r.exit("chunkFlow"),!0),k(0),r.consume(x);return}return $(x)?(r.consume(x),S(r.exit("chunkFlow")),n=0,e.interrupt=void 0,s):(r.consume(x),f)}function S(x,P){const D=e.sliceStream(x);if(P&&D.push(null),x.previous=o,o&&(o.next=x),o=x,a.defineSkip(x.start),a.write(D),e.parser.lazy[x.start.line]){let w=a.events.length;for(;w--;)if(a.events[w][1].start.offset<i&&(!a.events[w][1].end||a.events[w][1].end.offset>i))return;const I=e.events.length;let q=I,y,E;for(;q--;)if(e.events[q][0]==="exit"&&e.events[q][1].type==="chunkFlow"){if(y){E=e.events[q][1].end;break}y=!0}for(k(n),w=I;w<e.events.length;)e.events[w][1].end=Object.assign({},E),w++;xe(e.events,q+1,0,e.events.slice(I)),e.events.length=w}}function k(x){let P=t.length;for(;P-- >x;){const D=t[P];e.containerState=D[1],D[0].exit.call(e,r)}t.length=x}function M(){a.write([null]),o=void 0,a=void 0,e.containerState._closeFlow=void 0}}function ra(r,e,t){return te(r,r.attempt(this.parser.constructs.document,e,t),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Br(r){if(r===null||se(r)||Xn(r))return 1;if(Kn(r))return 2}function zt(r,e,t){const n=[];let a=-1;for(;++a<r.length;){const o=r[a].resolveAll;o&&!n.includes(o)&&(e=o(e,t),n.push(o))}return e}const Ft={name:"attention",tokenize:aa,resolveAll:na};function na(r,e){let t=-1,n,a,o,i,s,l,h,p;for(;++t<r.length;)if(r[t][0]==="enter"&&r[t][1].type==="attentionSequence"&&r[t][1]._close){for(n=t;n--;)if(r[n][0]==="exit"&&r[n][1].type==="attentionSequence"&&r[n][1]._open&&e.sliceSerialize(r[n][1]).charCodeAt(0)===e.sliceSerialize(r[t][1]).charCodeAt(0)){if((r[n][1]._close||r[t][1]._open)&&(r[t][1].end.offset-r[t][1].start.offset)%3&&!((r[n][1].end.offset-r[n][1].start.offset+r[t][1].end.offset-r[t][1].start.offset)%3))continue;l=r[n][1].end.offset-r[n][1].start.offset>1&&r[t][1].end.offset-r[t][1].start.offset>1?2:1;const c=Object.assign({},r[n][1].end),u=Object.assign({},r[t][1].start);_r(c,-l),_r(u,l),i={type:l>1?"strongSequence":"emphasisSequence",start:c,end:Object.assign({},r[n][1].end)},s={type:l>1?"strongSequence":"emphasisSequence",start:Object.assign({},r[t][1].start),end:u},o={type:l>1?"strongText":"emphasisText",start:Object.assign({},r[n][1].end),end:Object.assign({},r[t][1].start)},a={type:l>1?"strong":"emphasis",start:Object.assign({},i.start),end:Object.assign({},s.end)},r[n][1].end=Object.assign({},i.start),r[t][1].start=Object.assign({},s.end),h=[],r[n][1].end.offset-r[n][1].start.offset&&(h=pe(h,[["enter",r[n][1],e],["exit",r[n][1],e]])),h=pe(h,[["enter",a,e],["enter",i,e],["exit",i,e],["enter",o,e]]),h=pe(h,zt(e.parser.constructs.insideSpan.null,r.slice(n+1,t),e)),h=pe(h,[["exit",o,e],["enter",s,e],["exit",s,e],["exit",a,e]]),r[t][1].end.offset-r[t][1].start.offset?(p=2,h=pe(h,[["enter",r[t][1],e],["exit",r[t][1],e]])):p=0,xe(r,n-1,t-n+3,h),t=n+h.length-p-2;break}}for(t=-1;++t<r.length;)r[t][1].type==="attentionSequence"&&(r[t][1].type="data");return r}function aa(r,e){const t=this.parser.constructs.attentionMarkers.null,n=this.previous,a=Br(n);let o;return i;function i(l){return o=l,r.enter("attentionSequence"),s(l)}function s(l){if(l===o)return r.consume(l),s;const h=r.exit("attentionSequence"),p=Br(l),c=!p||p===2&&a||t.includes(l),u=!a||a===2&&p||t.includes(n);return h._open=!!(o===42?c:c&&(a||!u)),h._close=!!(o===42?u:u&&(p||!c)),e(l)}}function _r(r,e){r.column+=e,r.offset+=e,r._bufferIndex+=e}const oa={name:"autolink",tokenize:ia};function ia(r,e,t){let n=0;return a;function a(g){return r.enter("autolink"),r.enter("autolinkMarker"),r.consume(g),r.exit("autolinkMarker"),r.enter("autolinkProtocol"),o}function o(g){return ve(g)?(r.consume(g),i):h(g)}function i(g){return g===43||g===45||g===46||me(g)?(n=1,s(g)):h(g)}function s(g){return g===58?(r.consume(g),n=0,l):(g===43||g===45||g===46||me(g))&&n++<32?(r.consume(g),s):(n=0,h(g))}function l(g){return g===62?(r.exit("autolinkProtocol"),r.enter("autolinkMarker"),r.consume(g),r.exit("autolinkMarker"),r.exit("autolink"),e):g===null||g===32||g===60||_t(g)?t(g):(r.consume(g),l)}function h(g){return g===64?(r.consume(g),p):Qn(g)?(r.consume(g),h):t(g)}function p(g){return me(g)?c(g):t(g)}function c(g){return g===46?(r.consume(g),n=0,p):g===62?(r.exit("autolinkProtocol").type="autolinkEmail",r.enter("autolinkMarker"),r.consume(g),r.exit("autolinkMarker"),r.exit("autolink"),e):u(g)}function u(g){if((g===45||me(g))&&n++<63){const v=g===45?u:c;return r.consume(g),v}return t(g)}}const dt={tokenize:sa,partial:!0};function sa(r,e,t){return n;function n(o){return Y(o)?te(r,a,"linePrefix")(o):a(o)}function a(o){return o===null||$(o)?e(o):t(o)}}const Rr={name:"blockQuote",tokenize:la,continuation:{tokenize:ha},exit:ca};function la(r,e,t){const n=this;return a;function a(i){if(i===62){const s=n.containerState;return s.open||(r.enter("blockQuote",{_container:!0}),s.open=!0),r.enter("blockQuotePrefix"),r.enter("blockQuoteMarker"),r.consume(i),r.exit("blockQuoteMarker"),o}return t(i)}function o(i){return Y(i)?(r.enter("blockQuotePrefixWhitespace"),r.consume(i),r.exit("blockQuotePrefixWhitespace"),r.exit("blockQuotePrefix"),e):(r.exit("blockQuotePrefix"),e(i))}}function ha(r,e,t){const n=this;return a;function a(i){return Y(i)?te(r,o,"linePrefix",n.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i):o(i)}function o(i){return r.attempt(Rr,e,t)(i)}}function ca(r){r.exit("blockQuote")}const zr={name:"characterEscape",tokenize:pa};function pa(r,e,t){return n;function n(o){return r.enter("characterEscape"),r.enter("escapeMarker"),r.consume(o),r.exit("escapeMarker"),a}function a(o){return Yn(o)?(r.enter("characterEscapeValue"),r.consume(o),r.exit("characterEscapeValue"),r.exit("characterEscape"),e):t(o)}}const Fr=document.createElement("i");function Ot(r){const e="&"+r+";";Fr.innerHTML=e;const t=Fr.textContent;return t.charCodeAt(t.length-1)===59&&r!=="semi"||t===e?!1:t}const Or={name:"characterReference",tokenize:da};function da(r,e,t){const n=this;let a=0,o,i;return s;function s(c){return r.enter("characterReference"),r.enter("characterReferenceMarker"),r.consume(c),r.exit("characterReferenceMarker"),l}function l(c){return c===35?(r.enter("characterReferenceMarkerNumeric"),r.consume(c),r.exit("characterReferenceMarkerNumeric"),h):(r.enter("characterReferenceValue"),o=31,i=me,p(c))}function h(c){return c===88||c===120?(r.enter("characterReferenceMarkerHexadecimal"),r.consume(c),r.exit("characterReferenceMarkerHexadecimal"),r.enter("characterReferenceValue"),o=6,i=Wn,p):(r.enter("characterReferenceValue"),o=7,i=Rt,p(c))}function p(c){if(c===59&&a){const u=r.exit("characterReferenceValue");return i===me&&!Ot(n.sliceSerialize(u))?t(c):(r.enter("characterReferenceMarker"),r.consume(c),r.exit("characterReferenceMarker"),r.exit("characterReference"),e)}return i(c)&&a++<o?(r.consume(c),p):t(c)}}const Dr={tokenize:ua,partial:!0},qr={name:"codeFenced",tokenize:ga,concrete:!0};function ga(r,e,t){const n=this,a={tokenize:D,partial:!0};let o=0,i=0,s;return l;function l(w){return h(w)}function h(w){const I=n.events[n.events.length-1];return o=I&&I[1].type==="linePrefix"?I[2].sliceSerialize(I[1],!0).length:0,s=w,r.enter("codeFenced"),r.enter("codeFencedFence"),r.enter("codeFencedFenceSequence"),p(w)}function p(w){return w===s?(i++,r.consume(w),p):i<3?t(w):(r.exit("codeFencedFenceSequence"),Y(w)?te(r,c,"whitespace")(w):c(w))}function c(w){return w===null||$(w)?(r.exit("codeFencedFence"),n.interrupt?e(w):r.check(Dr,f,P)(w)):(r.enter("codeFencedFenceInfo"),r.enter("chunkString",{contentType:"string"}),u(w))}function u(w){return w===null||$(w)?(r.exit("chunkString"),r.exit("codeFencedFenceInfo"),c(w)):Y(w)?(r.exit("chunkString"),r.exit("codeFencedFenceInfo"),te(r,g,"whitespace")(w)):w===96&&w===s?t(w):(r.consume(w),u)}function g(w){return w===null||$(w)?c(w):(r.enter("codeFencedFenceMeta"),r.enter("chunkString",{contentType:"string"}),v(w))}function v(w){return w===null||$(w)?(r.exit("chunkString"),r.exit("codeFencedFenceMeta"),c(w)):w===96&&w===s?t(w):(r.consume(w),v)}function f(w){return r.attempt(a,P,S)(w)}function S(w){return r.enter("lineEnding"),r.consume(w),r.exit("lineEnding"),k}function k(w){return o>0&&Y(w)?te(r,M,"linePrefix",o+1)(w):M(w)}function M(w){return w===null||$(w)?r.check(Dr,f,P)(w):(r.enter("codeFlowValue"),x(w))}function x(w){return w===null||$(w)?(r.exit("codeFlowValue"),M(w)):(r.consume(w),x)}function P(w){return r.exit("codeFenced"),e(w)}function D(w,I,q){let y=0;return E;function E(R){return w.enter("lineEnding"),w.consume(R),w.exit("lineEnding"),C}function C(R){return w.enter("codeFencedFence"),Y(R)?te(w,A,"linePrefix",n.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(R):A(R)}function A(R){return R===s?(w.enter("codeFencedFenceSequence"),L(R)):q(R)}function L(R){return R===s?(y++,w.consume(R),L):y>=i?(w.exit("codeFencedFenceSequence"),Y(R)?te(w,F,"whitespace")(R):F(R)):q(R)}function F(R){return R===null||$(R)?(w.exit("codeFencedFence"),I(R)):q(R)}}}function ua(r,e,t){const n=this;return a;function a(i){return i===null?t(i):(r.enter("lineEnding"),r.consume(i),r.exit("lineEnding"),o)}function o(i){return n.parser.lazy[n.now().line]?t(i):e(i)}}const Dt={name:"codeIndented",tokenize:ba},ma={tokenize:fa,partial:!0};function ba(r,e,t){const n=this;return a;function a(h){return r.enter("codeIndented"),te(r,o,"linePrefix",5)(h)}function o(h){const p=n.events[n.events.length-1];return p&&p[1].type==="linePrefix"&&p[2].sliceSerialize(p[1],!0).length>=4?i(h):t(h)}function i(h){return h===null?l(h):$(h)?r.attempt(ma,i,l)(h):(r.enter("codeFlowValue"),s(h))}function s(h){return h===null||$(h)?(r.exit("codeFlowValue"),i(h)):(r.consume(h),s)}function l(h){return r.exit("codeIndented"),e(h)}}function fa(r,e,t){const n=this;return a;function a(i){return n.parser.lazy[n.now().line]?t(i):$(i)?(r.enter("lineEnding"),r.consume(i),r.exit("lineEnding"),a):te(r,o,"linePrefix",5)(i)}function o(i){const s=n.events[n.events.length-1];return s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?e(i):$(i)?a(i):t(i)}}const xa={name:"codeText",tokenize:wa,resolve:va,previous:ya};function va(r){let e=r.length-4,t=3,n,a;if((r[t][1].type==="lineEnding"||r[t][1].type==="space")&&(r[e][1].type==="lineEnding"||r[e][1].type==="space")){for(n=t;++n<e;)if(r[n][1].type==="codeTextData"){r[t][1].type="codeTextPadding",r[e][1].type="codeTextPadding",t+=2,e-=2;break}}for(n=t-1,e++;++n<=e;)a===void 0?n!==e&&r[n][1].type!=="lineEnding"&&(a=n):(n===e||r[n][1].type==="lineEnding")&&(r[a][1].type="codeTextData",n!==a+2&&(r[a][1].end=r[n-1][1].end,r.splice(a+2,n-a-2),e-=n-a-2,n=a+2),a=void 0);return r}function ya(r){return r!==96||this.events[this.events.length-1][1].type==="characterEscape"}function wa(r,e,t){let n=0,a,o;return i;function i(c){return r.enter("codeText"),r.enter("codeTextSequence"),s(c)}function s(c){return c===96?(r.consume(c),n++,s):(r.exit("codeTextSequence"),l(c))}function l(c){return c===null?t(c):c===32?(r.enter("space"),r.consume(c),r.exit("space"),l):c===96?(o=r.enter("codeTextSequence"),a=0,p(c)):$(c)?(r.enter("lineEnding"),r.consume(c),r.exit("lineEnding"),l):(r.enter("codeTextData"),h(c))}function h(c){return c===null||c===32||c===96||$(c)?(r.exit("codeTextData"),l(c)):(r.consume(c),h)}function p(c){return c===96?(r.consume(c),a++,p):a===n?(r.exit("codeTextSequence"),r.exit("codeText"),e(c)):(o.type="codeTextData",h(c))}}function Hr(r){const e={};let t=-1,n,a,o,i,s,l,h;for(;++t<r.length;){for(;t in e;)t=e[t];if(n=r[t],t&&n[1].type==="chunkFlow"&&r[t-1][1].type==="listItemPrefix"&&(l=n[1]._tokenizer.events,o=0,o<l.length&&l[o][1].type==="lineEndingBlank"&&(o+=2),o<l.length&&l[o][1].type==="content"))for(;++o<l.length&&l[o][1].type!=="content";)l[o][1].type==="chunkText"&&(l[o][1]._isInFirstContentOfListItem=!0,o++);if(n[0]==="enter")n[1].contentType&&(Object.assign(e,ka(r,t)),t=e[t],h=!0);else if(n[1]._container){for(o=t,a=void 0;o--&&(i=r[o],i[1].type==="lineEnding"||i[1].type==="lineEndingBlank");)i[0]==="enter"&&(a&&(r[a][1].type="lineEndingBlank"),i[1].type="lineEnding",a=o);a&&(n[1].end=Object.assign({},r[a][1].start),s=r.slice(a,t),s.unshift(n),xe(r,a,t-a+1,s))}}return!h}function ka(r,e){const t=r[e][1],n=r[e][2];let a=e-1;const o=[],i=t._tokenizer||n.parser[t.contentType](t.start),s=i.events,l=[],h={};let p,c,u=-1,g=t,v=0,f=0;const S=[f];for(;g;){for(;r[++a][1]!==g;);o.push(a),g._tokenizer||(p=n.sliceStream(g),g.next||p.push(null),c&&i.defineSkip(g.start),g._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=!0),i.write(p),g._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=void 0)),c=g,g=g.next}for(g=t;++u<s.length;)s[u][0]==="exit"&&s[u-1][0]==="enter"&&s[u][1].type===s[u-1][1].type&&s[u][1].start.line!==s[u][1].end.line&&(f=u+1,S.push(f),g._tokenizer=void 0,g.previous=void 0,g=g.next);for(i.events=[],g?(g._tokenizer=void 0,g.previous=void 0):S.pop(),u=S.length;u--;){const k=s.slice(S[u],S[u+1]),M=o.pop();l.unshift([M,M+k.length-1]),xe(r,M,2,k)}for(u=-1;++u<l.length;)h[v+l[u][0]]=v+l[u][1],v+=l[u][1]-l[u][0]-1;return h}const Ca={tokenize:Aa,resolve:Ta},Sa={tokenize:Ea,partial:!0};function Ta(r){return Hr(r),r}function Aa(r,e){let t;return n;function n(s){return r.enter("content"),t=r.enter("chunkContent",{contentType:"content"}),a(s)}function a(s){return s===null?o(s):$(s)?r.check(Sa,i,o)(s):(r.consume(s),a)}function o(s){return r.exit("chunkContent"),r.exit("content"),e(s)}function i(s){return r.consume(s),r.exit("chunkContent"),t.next=r.enter("chunkContent",{contentType:"content",previous:t}),t=t.next,a}}function Ea(r,e,t){const n=this;return a;function a(i){return r.exit("chunkContent"),r.enter("lineEnding"),r.consume(i),r.exit("lineEnding"),te(r,o,"linePrefix")}function o(i){if(i===null||$(i))return t(i);const s=n.events[n.events.length-1];return!n.parser.constructs.disable.null.includes("codeIndented")&&s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?e(i):r.interrupt(n.parser.constructs.flow,t,e)(i)}}function $r(r,e,t,n,a,o,i,s,l){const h=l||Number.POSITIVE_INFINITY;let p=0;return c;function c(k){return k===60?(r.enter(n),r.enter(a),r.enter(o),r.consume(k),r.exit(o),u):k===null||k===32||k===41||_t(k)?t(k):(r.enter(n),r.enter(i),r.enter(s),r.enter("chunkString",{contentType:"string"}),f(k))}function u(k){return k===62?(r.enter(o),r.consume(k),r.exit(o),r.exit(a),r.exit(n),e):(r.enter(s),r.enter("chunkString",{contentType:"string"}),g(k))}function g(k){return k===62?(r.exit("chunkString"),r.exit(s),u(k)):k===null||k===60||$(k)?t(k):(r.consume(k),k===92?v:g)}function v(k){return k===60||k===62||k===92?(r.consume(k),g):g(k)}function f(k){return!p&&(k===null||k===41||se(k))?(r.exit("chunkString"),r.exit(s),r.exit(i),r.exit(n),e(k)):p<h&&k===40?(r.consume(k),p++,f):k===41?(r.consume(k),p--,f):k===null||k===32||k===40||_t(k)?t(k):(r.consume(k),k===92?S:f)}function S(k){return k===40||k===41||k===92?(r.consume(k),f):f(k)}}function Ur(r,e,t,n,a,o){const i=this;let s=0,l;return h;function h(g){return r.enter(n),r.enter(a),r.consume(g),r.exit(a),r.enter(o),p}function p(g){return s>999||g===null||g===91||g===93&&!l||g===94&&!s&&"_hiddenFootnoteSupport"in i.parser.constructs?t(g):g===93?(r.exit(o),r.enter(a),r.consume(g),r.exit(a),r.exit(n),e):$(g)?(r.enter("lineEnding"),r.consume(g),r.exit("lineEnding"),p):(r.enter("chunkString",{contentType:"string"}),c(g))}function c(g){return g===null||g===91||g===93||$(g)||s++>999?(r.exit("chunkString"),p(g)):(r.consume(g),l||(l=!Y(g)),g===92?u:c)}function u(g){return g===91||g===92||g===93?(r.consume(g),s++,c):c(g)}}function Gr(r,e,t,n,a,o){let i;return s;function s(u){return u===34||u===39||u===40?(r.enter(n),r.enter(a),r.consume(u),r.exit(a),i=u===40?41:u,l):t(u)}function l(u){return u===i?(r.enter(a),r.consume(u),r.exit(a),r.exit(n),e):(r.enter(o),h(u))}function h(u){return u===i?(r.exit(o),l(i)):u===null?t(u):$(u)?(r.enter("lineEnding"),r.consume(u),r.exit("lineEnding"),te(r,h,"linePrefix")):(r.enter("chunkString",{contentType:"string"}),p(u))}function p(u){return u===i||u===null||$(u)?(r.exit("chunkString"),h(u)):(r.consume(u),u===92?c:p)}function c(u){return u===i||u===92?(r.consume(u),p):p(u)}}function Ze(r,e){let t;return n;function n(a){return $(a)?(r.enter("lineEnding"),r.consume(a),r.exit("lineEnding"),t=!0,n):Y(a)?te(r,n,t?"linePrefix":"lineSuffix")(a):e(a)}}function Fe(r){return r.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ma={name:"definition",tokenize:Ia},La={tokenize:Pa,partial:!0};function Ia(r,e,t){const n=this;let a;return o;function o(g){return r.enter("definition"),i(g)}function i(g){return Ur.call(n,r,s,t,"definitionLabel","definitionLabelMarker","definitionLabelString")(g)}function s(g){return a=Fe(n.sliceSerialize(n.events[n.events.length-1][1]).slice(1,-1)),g===58?(r.enter("definitionMarker"),r.consume(g),r.exit("definitionMarker"),l):t(g)}function l(g){return se(g)?Ze(r,h)(g):h(g)}function h(g){return $r(r,p,t,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(g)}function p(g){return r.attempt(La,c,c)(g)}function c(g){return Y(g)?te(r,u,"whitespace")(g):u(g)}function u(g){return g===null||$(g)?(r.exit("definition"),n.parser.defined.push(a),e(g)):t(g)}}function Pa(r,e,t){return n;function n(s){return se(s)?Ze(r,a)(s):t(s)}function a(s){return Gr(r,o,t,"definitionTitle","definitionTitleMarker","definitionTitleString")(s)}function o(s){return Y(s)?te(r,i,"whitespace")(s):i(s)}function i(s){return s===null||$(s)?e(s):t(s)}}const Na={name:"hardBreakEscape",tokenize:Ba};function Ba(r,e,t){return n;function n(o){return r.enter("hardBreakEscape"),r.consume(o),a}function a(o){return $(o)?(r.exit("hardBreakEscape"),e(o)):t(o)}}const _a={name:"headingAtx",tokenize:za,resolve:Ra};function Ra(r,e){let t=r.length-2,n=3,a,o;return r[n][1].type==="whitespace"&&(n+=2),t-2>n&&r[t][1].type==="whitespace"&&(t-=2),r[t][1].type==="atxHeadingSequence"&&(n===t-1||t-4>n&&r[t-2][1].type==="whitespace")&&(t-=n+1===t?2:4),t>n&&(a={type:"atxHeadingText",start:r[n][1].start,end:r[t][1].end},o={type:"chunkText",start:r[n][1].start,end:r[t][1].end,contentType:"text"},xe(r,n,t-n+1,[["enter",a,e],["enter",o,e],["exit",o,e],["exit",a,e]])),r}function za(r,e,t){let n=0;return a;function a(p){return r.enter("atxHeading"),o(p)}function o(p){return r.enter("atxHeadingSequence"),i(p)}function i(p){return p===35&&n++<6?(r.consume(p),i):p===null||se(p)?(r.exit("atxHeadingSequence"),s(p)):t(p)}function s(p){return p===35?(r.enter("atxHeadingSequence"),l(p)):p===null||$(p)?(r.exit("atxHeading"),e(p)):Y(p)?te(r,s,"whitespace")(p):(r.enter("atxHeadingText"),h(p))}function l(p){return p===35?(r.consume(p),l):(r.exit("atxHeadingSequence"),s(p))}function h(p){return p===null||p===35||se(p)?(r.exit("atxHeadingText"),s(p)):(r.consume(p),h)}}const Fa=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],jr=["pre","script","style","textarea"],Oa={name:"htmlFlow",tokenize:$a,resolveTo:Ha,concrete:!0},Da={tokenize:Ga,partial:!0},qa={tokenize:Ua,partial:!0};function Ha(r){let e=r.length;for(;e--&&!(r[e][0]==="enter"&&r[e][1].type==="htmlFlow"););return e>1&&r[e-2][1].type==="linePrefix"&&(r[e][1].start=r[e-2][1].start,r[e+1][1].start=r[e-2][1].start,r.splice(e-2,2)),r}function $a(r,e,t){const n=this;let a,o,i,s,l;return h;function h(b){return p(b)}function p(b){return r.enter("htmlFlow"),r.enter("htmlFlowData"),r.consume(b),c}function c(b){return b===33?(r.consume(b),u):b===47?(r.consume(b),o=!0,f):b===63?(r.consume(b),a=3,n.interrupt?e:m):ve(b)?(r.consume(b),i=String.fromCharCode(b),S):t(b)}function u(b){return b===45?(r.consume(b),a=2,g):b===91?(r.consume(b),a=5,s=0,v):ve(b)?(r.consume(b),a=4,n.interrupt?e:m):t(b)}function g(b){return b===45?(r.consume(b),n.interrupt?e:m):t(b)}function v(b){const ne="CDATA[";return b===ne.charCodeAt(s++)?(r.consume(b),s===ne.length?n.interrupt?e:A:v):t(b)}function f(b){return ve(b)?(r.consume(b),i=String.fromCharCode(b),S):t(b)}function S(b){if(b===null||b===47||b===62||se(b)){const ne=b===47,we=i.toLowerCase();return!ne&&!o&&jr.includes(we)?(a=1,n.interrupt?e(b):A(b)):Fa.includes(i.toLowerCase())?(a=6,ne?(r.consume(b),k):n.interrupt?e(b):A(b)):(a=7,n.interrupt&&!n.parser.lazy[n.now().line]?t(b):o?M(b):x(b))}return b===45||me(b)?(r.consume(b),i+=String.fromCharCode(b),S):t(b)}function k(b){return b===62?(r.consume(b),n.interrupt?e:A):t(b)}function M(b){return Y(b)?(r.consume(b),M):E(b)}function x(b){return b===47?(r.consume(b),E):b===58||b===95||ve(b)?(r.consume(b),P):Y(b)?(r.consume(b),x):E(b)}function P(b){return b===45||b===46||b===58||b===95||me(b)?(r.consume(b),P):D(b)}function D(b){return b===61?(r.consume(b),w):Y(b)?(r.consume(b),D):x(b)}function w(b){return b===null||b===60||b===61||b===62||b===96?t(b):b===34||b===39?(r.consume(b),l=b,I):Y(b)?(r.consume(b),w):q(b)}function I(b){return b===l?(r.consume(b),l=null,y):b===null||$(b)?t(b):(r.consume(b),I)}function q(b){return b===null||b===34||b===39||b===47||b===60||b===61||b===62||b===96||se(b)?D(b):(r.consume(b),q)}function y(b){return b===47||b===62||Y(b)?x(b):t(b)}function E(b){return b===62?(r.consume(b),C):t(b)}function C(b){return b===null||$(b)?A(b):Y(b)?(r.consume(b),C):t(b)}function A(b){return b===45&&a===2?(r.consume(b),H):b===60&&a===1?(r.consume(b),z):b===62&&a===4?(r.consume(b),Q):b===63&&a===3?(r.consume(b),m):b===93&&a===5?(r.consume(b),V):$(b)&&(a===6||a===7)?(r.exit("htmlFlowData"),r.check(Da,W,L)(b)):b===null||$(b)?(r.exit("htmlFlowData"),L(b)):(r.consume(b),A)}function L(b){return r.check(qa,F,W)(b)}function F(b){return r.enter("lineEnding"),r.consume(b),r.exit("lineEnding"),R}function R(b){return b===null||$(b)?L(b):(r.enter("htmlFlowData"),A(b))}function H(b){return b===45?(r.consume(b),m):A(b)}function z(b){return b===47?(r.consume(b),i="",G):A(b)}function G(b){if(b===62){const ne=i.toLowerCase();return jr.includes(ne)?(r.consume(b),Q):A(b)}return ve(b)&&i.length<8?(r.consume(b),i+=String.fromCharCode(b),G):A(b)}function V(b){return b===93?(r.consume(b),m):A(b)}function m(b){return b===62?(r.consume(b),Q):b===45&&a===2?(r.consume(b),m):A(b)}function Q(b){return b===null||$(b)?(r.exit("htmlFlowData"),W(b)):(r.consume(b),Q)}function W(b){return r.exit("htmlFlow"),e(b)}}function Ua(r,e,t){const n=this;return a;function a(i){return $(i)?(r.enter("lineEnding"),r.consume(i),r.exit("lineEnding"),o):t(i)}function o(i){return n.parser.lazy[n.now().line]?t(i):e(i)}}function Ga(r,e,t){return n;function n(a){return r.enter("lineEnding"),r.consume(a),r.exit("lineEnding"),r.attempt(dt,e,t)}}const ja={name:"htmlText",tokenize:Va};function Va(r,e,t){const n=this;let a,o,i;return s;function s(m){return r.enter("htmlText"),r.enter("htmlTextData"),r.consume(m),l}function l(m){return m===33?(r.consume(m),h):m===47?(r.consume(m),D):m===63?(r.consume(m),x):ve(m)?(r.consume(m),q):t(m)}function h(m){return m===45?(r.consume(m),p):m===91?(r.consume(m),o=0,v):ve(m)?(r.consume(m),M):t(m)}function p(m){return m===45?(r.consume(m),g):t(m)}function c(m){return m===null?t(m):m===45?(r.consume(m),u):$(m)?(i=c,z(m)):(r.consume(m),c)}function u(m){return m===45?(r.consume(m),g):c(m)}function g(m){return m===62?H(m):m===45?u(m):c(m)}function v(m){const Q="CDATA[";return m===Q.charCodeAt(o++)?(r.consume(m),o===Q.length?f:v):t(m)}function f(m){return m===null?t(m):m===93?(r.consume(m),S):$(m)?(i=f,z(m)):(r.consume(m),f)}function S(m){return m===93?(r.consume(m),k):f(m)}function k(m){return m===62?H(m):m===93?(r.consume(m),k):f(m)}function M(m){return m===null||m===62?H(m):$(m)?(i=M,z(m)):(r.consume(m),M)}function x(m){return m===null?t(m):m===63?(r.consume(m),P):$(m)?(i=x,z(m)):(r.consume(m),x)}function P(m){return m===62?H(m):x(m)}function D(m){return ve(m)?(r.consume(m),w):t(m)}function w(m){return m===45||me(m)?(r.consume(m),w):I(m)}function I(m){return $(m)?(i=I,z(m)):Y(m)?(r.consume(m),I):H(m)}function q(m){return m===45||me(m)?(r.consume(m),q):m===47||m===62||se(m)?y(m):t(m)}function y(m){return m===47?(r.consume(m),H):m===58||m===95||ve(m)?(r.consume(m),E):$(m)?(i=y,z(m)):Y(m)?(r.consume(m),y):H(m)}function E(m){return m===45||m===46||m===58||m===95||me(m)?(r.consume(m),E):C(m)}function C(m){return m===61?(r.consume(m),A):$(m)?(i=C,z(m)):Y(m)?(r.consume(m),C):y(m)}function A(m){return m===null||m===60||m===61||m===62||m===96?t(m):m===34||m===39?(r.consume(m),a=m,L):$(m)?(i=A,z(m)):Y(m)?(r.consume(m),A):(r.consume(m),F)}function L(m){return m===a?(r.consume(m),a=void 0,R):m===null?t(m):$(m)?(i=L,z(m)):(r.consume(m),L)}function F(m){return m===null||m===34||m===39||m===60||m===61||m===96?t(m):m===47||m===62||se(m)?y(m):(r.consume(m),F)}function R(m){return m===47||m===62||se(m)?y(m):t(m)}function H(m){return m===62?(r.consume(m),r.exit("htmlTextData"),r.exit("htmlText"),e):t(m)}function z(m){return r.exit("htmlTextData"),r.enter("lineEnding"),r.consume(m),r.exit("lineEnding"),G}function G(m){return Y(m)?te(r,V,"linePrefix",n.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m):V(m)}function V(m){return r.enter("htmlTextData"),i(m)}}const qt={name:"labelEnd",tokenize:Ja,resolveTo:Xa,resolveAll:Ka},Qa={tokenize:Za},Wa={tokenize:eo},Ya={tokenize:to};function Ka(r){let e=-1;for(;++e<r.length;){const t=r[e][1];(t.type==="labelImage"||t.type==="labelLink"||t.type==="labelEnd")&&(r.splice(e+1,t.type==="labelImage"?4:2),t.type="data",e++)}return r}function Xa(r,e){let t=r.length,n=0,a,o,i,s;for(;t--;)if(a=r[t][1],o){if(a.type==="link"||a.type==="labelLink"&&a._inactive)break;r[t][0]==="enter"&&a.type==="labelLink"&&(a._inactive=!0)}else if(i){if(r[t][0]==="enter"&&(a.type==="labelImage"||a.type==="labelLink")&&!a._balanced&&(o=t,a.type!=="labelLink")){n=2;break}}else a.type==="labelEnd"&&(i=t);const l={type:r[o][1].type==="labelLink"?"link":"image",start:Object.assign({},r[o][1].start),end:Object.assign({},r[r.length-1][1].end)},h={type:"label",start:Object.assign({},r[o][1].start),end:Object.assign({},r[i][1].end)},p={type:"labelText",start:Object.assign({},r[o+n+2][1].end),end:Object.assign({},r[i-2][1].start)};return s=[["enter",l,e],["enter",h,e]],s=pe(s,r.slice(o+1,o+n+3)),s=pe(s,[["enter",p,e]]),s=pe(s,zt(e.parser.constructs.insideSpan.null,r.slice(o+n+4,i-3),e)),s=pe(s,[["exit",p,e],r[i-2],r[i-1],["exit",h,e]]),s=pe(s,r.slice(i+1)),s=pe(s,[["exit",l,e]]),xe(r,o,r.length,s),r}function Ja(r,e,t){const n=this;let a=n.events.length,o,i;for(;a--;)if((n.events[a][1].type==="labelImage"||n.events[a][1].type==="labelLink")&&!n.events[a][1]._balanced){o=n.events[a][1];break}return s;function s(u){return o?o._inactive?c(u):(i=n.parser.defined.includes(Fe(n.sliceSerialize({start:o.end,end:n.now()}))),r.enter("labelEnd"),r.enter("labelMarker"),r.consume(u),r.exit("labelMarker"),r.exit("labelEnd"),l):t(u)}function l(u){return u===40?r.attempt(Qa,p,i?p:c)(u):u===91?r.attempt(Wa,p,i?h:c)(u):i?p(u):c(u)}function h(u){return r.attempt(Ya,p,c)(u)}function p(u){return e(u)}function c(u){return o._balanced=!0,t(u)}}function Za(r,e,t){return n;function n(c){return r.enter("resource"),r.enter("resourceMarker"),r.consume(c),r.exit("resourceMarker"),a}function a(c){return se(c)?Ze(r,o)(c):o(c)}function o(c){return c===41?p(c):$r(r,i,s,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function i(c){return se(c)?Ze(r,l)(c):p(c)}function s(c){return t(c)}function l(c){return c===34||c===39||c===40?Gr(r,h,t,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):p(c)}function h(c){return se(c)?Ze(r,p)(c):p(c)}function p(c){return c===41?(r.enter("resourceMarker"),r.consume(c),r.exit("resourceMarker"),r.exit("resource"),e):t(c)}}function eo(r,e,t){const n=this;return a;function a(s){return Ur.call(n,r,o,i,"reference","referenceMarker","referenceString")(s)}function o(s){return n.parser.defined.includes(Fe(n.sliceSerialize(n.events[n.events.length-1][1]).slice(1,-1)))?e(s):t(s)}function i(s){return t(s)}}function to(r,e,t){return n;function n(o){return r.enter("reference"),r.enter("referenceMarker"),r.consume(o),r.exit("referenceMarker"),a}function a(o){return o===93?(r.enter("referenceMarker"),r.consume(o),r.exit("referenceMarker"),r.exit("reference"),e):t(o)}}const ro={name:"labelStartImage",tokenize:no,resolveAll:qt.resolveAll};function no(r,e,t){const n=this;return a;function a(s){return r.enter("labelImage"),r.enter("labelImageMarker"),r.consume(s),r.exit("labelImageMarker"),o}function o(s){return s===91?(r.enter("labelMarker"),r.consume(s),r.exit("labelMarker"),r.exit("labelImage"),i):t(s)}function i(s){return s===94&&"_hiddenFootnoteSupport"in n.parser.constructs?t(s):e(s)}}const ao={name:"labelStartLink",tokenize:oo,resolveAll:qt.resolveAll};function oo(r,e,t){const n=this;return a;function a(i){return r.enter("labelLink"),r.enter("labelMarker"),r.consume(i),r.exit("labelMarker"),r.exit("labelLink"),o}function o(i){return i===94&&"_hiddenFootnoteSupport"in n.parser.constructs?t(i):e(i)}}const Ht={name:"lineEnding",tokenize:io};function io(r,e){return t;function t(n){return r.enter("lineEnding"),r.consume(n),r.exit("lineEnding"),te(r,e,"linePrefix")}}const gt={name:"thematicBreak",tokenize:so};function so(r,e,t){let n=0,a;return o;function o(h){return r.enter("thematicBreak"),i(h)}function i(h){return a=h,s(h)}function s(h){return h===a?(r.enter("thematicBreakSequence"),l(h)):n>=3&&(h===null||$(h))?(r.exit("thematicBreak"),e(h)):t(h)}function l(h){return h===a?(r.consume(h),n++,l):(r.exit("thematicBreakSequence"),Y(h)?te(r,s,"whitespace")(h):s(h))}}const le={name:"list",tokenize:co,continuation:{tokenize:po},exit:uo},lo={tokenize:mo,partial:!0},ho={tokenize:go,partial:!0};function co(r,e,t){const n=this,a=n.events[n.events.length-1];let o=a&&a[1].type==="linePrefix"?a[2].sliceSerialize(a[1],!0).length:0,i=0;return s;function s(g){const v=n.containerState.type||(g===42||g===43||g===45?"listUnordered":"listOrdered");if(v==="listUnordered"?!n.containerState.marker||g===n.containerState.marker:Rt(g)){if(n.containerState.type||(n.containerState.type=v,r.enter(v,{_container:!0})),v==="listUnordered")return r.enter("listItemPrefix"),g===42||g===45?r.check(gt,t,h)(g):h(g);if(!n.interrupt||g===49)return r.enter("listItemPrefix"),r.enter("listItemValue"),l(g)}return t(g)}function l(g){return Rt(g)&&++i<10?(r.consume(g),l):(!n.interrupt||i<2)&&(n.containerState.marker?g===n.containerState.marker:g===41||g===46)?(r.exit("listItemValue"),h(g)):t(g)}function h(g){return r.enter("listItemMarker"),r.consume(g),r.exit("listItemMarker"),n.containerState.marker=n.containerState.marker||g,r.check(dt,n.interrupt?t:p,r.attempt(lo,u,c))}function p(g){return n.containerState.initialBlankLine=!0,o++,u(g)}function c(g){return Y(g)?(r.enter("listItemPrefixWhitespace"),r.consume(g),r.exit("listItemPrefixWhitespace"),u):t(g)}function u(g){return n.containerState.size=o+n.sliceSerialize(r.exit("listItemPrefix"),!0).length,e(g)}}function po(r,e,t){const n=this;return n.containerState._closeFlow=void 0,r.check(dt,a,o);function a(s){return n.containerState.furtherBlankLines=n.containerState.furtherBlankLines||n.containerState.initialBlankLine,te(r,e,"listItemIndent",n.containerState.size+1)(s)}function o(s){return n.containerState.furtherBlankLines||!Y(s)?(n.containerState.furtherBlankLines=void 0,n.containerState.initialBlankLine=void 0,i(s)):(n.containerState.furtherBlankLines=void 0,n.containerState.initialBlankLine=void 0,r.attempt(ho,e,i)(s))}function i(s){return n.containerState._closeFlow=!0,n.interrupt=void 0,te(r,r.attempt(le,e,t),"linePrefix",n.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s)}}function go(r,e,t){const n=this;return te(r,a,"listItemIndent",n.containerState.size+1);function a(o){const i=n.events[n.events.length-1];return i&&i[1].type==="listItemIndent"&&i[2].sliceSerialize(i[1],!0).length===n.containerState.size?e(o):t(o)}}function uo(r){r.exit(this.containerState.type)}function mo(r,e,t){const n=this;return te(r,a,"listItemPrefixWhitespace",n.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function a(o){const i=n.events[n.events.length-1];return!Y(o)&&i&&i[1].type==="listItemPrefixWhitespace"?e(o):t(o)}}const Vr={name:"setextUnderline",tokenize:fo,resolveTo:bo};function bo(r,e){let t=r.length,n,a,o;for(;t--;)if(r[t][0]==="enter"){if(r[t][1].type==="content"){n=t;break}r[t][1].type==="paragraph"&&(a=t)}else r[t][1].type==="content"&&r.splice(t,1),!o&&r[t][1].type==="definition"&&(o=t);const i={type:"setextHeading",start:Object.assign({},r[a][1].start),end:Object.assign({},r[r.length-1][1].end)};return r[a][1].type="setextHeadingText",o?(r.splice(a,0,["enter",i,e]),r.splice(o+1,0,["exit",r[n][1],e]),r[n][1].end=Object.assign({},r[o][1].end)):r[n][1]=i,r.push(["exit",i,e]),r}function fo(r,e,t){const n=this;let a;return o;function o(h){let p=n.events.length,c;for(;p--;)if(n.events[p][1].type!=="lineEnding"&&n.events[p][1].type!=="linePrefix"&&n.events[p][1].type!=="content"){c=n.events[p][1].type==="paragraph";break}return!n.parser.lazy[n.now().line]&&(n.interrupt||c)?(r.enter("setextHeadingLine"),a=h,i(h)):t(h)}function i(h){return r.enter("setextHeadingLineSequence"),s(h)}function s(h){return h===a?(r.consume(h),s):(r.exit("setextHeadingLineSequence"),Y(h)?te(r,l,"lineSuffix")(h):l(h))}function l(h){return h===null||$(h)?(r.exit("setextHeadingLine"),e(h)):t(h)}}const xo={tokenize:vo};function vo(r){const e=this,t=r.attempt(dt,n,r.attempt(this.parser.constructs.flowInitial,a,te(r,r.attempt(this.parser.constructs.flow,a,r.attempt(Ca,a)),"linePrefix")));return t;function n(o){if(o===null){r.consume(o);return}return r.enter("lineEndingBlank"),r.consume(o),r.exit("lineEndingBlank"),e.currentConstruct=void 0,t}function a(o){if(o===null){r.consume(o);return}return r.enter("lineEnding"),r.consume(o),r.exit("lineEnding"),e.currentConstruct=void 0,t}}const yo={resolveAll:Wr()},wo=Qr("string"),ko=Qr("text");function Qr(r){return{tokenize:e,resolveAll:Wr(r==="text"?Co:void 0)};function e(t){const n=this,a=this.parser.constructs[r],o=t.attempt(a,i,s);return i;function i(p){return h(p)?o(p):s(p)}function s(p){if(p===null){t.consume(p);return}return t.enter("data"),t.consume(p),l}function l(p){return h(p)?(t.exit("data"),o(p)):(t.consume(p),l)}function h(p){if(p===null)return!0;const c=a[p];let u=-1;if(c)for(;++u<c.length;){const g=c[u];if(!g.previous||g.previous.call(n,n.previous))return!0}return!1}}}function Wr(r){return e;function e(t,n){let a=-1,o;for(;++a<=t.length;)o===void 0?t[a]&&t[a][1].type==="data"&&(o=a,a++):(!t[a]||t[a][1].type!=="data")&&(a!==o+2&&(t[o][1].end=t[a-1][1].end,t.splice(o+2,a-o-2),a=o+2),o=void 0);return r?r(t,n):t}}function Co(r,e){let t=0;for(;++t<=r.length;)if((t===r.length||r[t][1].type==="lineEnding")&&r[t-1][1].type==="data"){const n=r[t-1][1],a=e.sliceStream(n);let o=a.length,i=-1,s=0,l;for(;o--;){const h=a[o];if(typeof h=="string"){for(i=h.length;h.charCodeAt(i-1)===32;)s++,i--;if(i)break;i=-1}else if(h===-2)l=!0,s++;else if(h!==-1){o++;break}}if(s){const h={type:t===r.length||l||s<2?"lineSuffix":"hardBreakTrailing",start:{line:n.end.line,column:n.end.column-s,offset:n.end.offset-s,_index:n.start._index+o,_bufferIndex:o?i:n.start._bufferIndex+i},end:Object.assign({},n.end)};n.end=Object.assign({},h.start),n.start.offset===n.end.offset?Object.assign(n,h):(r.splice(t,0,["enter",h,e],["exit",h,e]),t+=2)}t++}return r}function So(r,e,t){let n=Object.assign(t?Object.assign({},t):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1});const a={},o=[];let i=[],s=[];const l={consume:M,enter:x,exit:P,attempt:I(D),check:I(w),interrupt:I(w,{interrupt:!0})},h={previous:null,code:null,containerState:{},events:[],parser:r,sliceStream:g,sliceSerialize:u,now:v,defineSkip:f,write:c};let p=e.tokenize.call(h,l);return e.resolveAll&&o.push(e),h;function c(C){return i=pe(i,C),S(),i[i.length-1]!==null?[]:(q(e,0),h.events=zt(o,h.events,h),h.events)}function u(C,A){return Ao(g(C),A)}function g(C){return To(i,C)}function v(){const{line:C,column:A,offset:L,_index:F,_bufferIndex:R}=n;return{line:C,column:A,offset:L,_index:F,_bufferIndex:R}}function f(C){a[C.line]=C.column,E()}function S(){let C;for(;n._index<i.length;){const A=i[n._index];if(typeof A=="string")for(C=n._index,n._bufferIndex<0&&(n._bufferIndex=0);n._index===C&&n._bufferIndex<A.length;)k(A.charCodeAt(n._bufferIndex));else k(A)}}function k(C){p=p(C)}function M(C){$(C)?(n.line++,n.column=1,n.offset+=C===-3?2:1,E()):C!==-1&&(n.column++,n.offset++),n._bufferIndex<0?n._index++:(n._bufferIndex++,n._bufferIndex===i[n._index].length&&(n._bufferIndex=-1,n._index++)),h.previous=C}function x(C,A){const L=A||{};return L.type=C,L.start=v(),h.events.push(["enter",L,h]),s.push(L),L}function P(C){const A=s.pop();return A.end=v(),h.events.push(["exit",A,h]),A}function D(C,A){q(C,A.from)}function w(C,A){A.restore()}function I(C,A){return L;function L(F,R,H){let z,G,V,m;return Array.isArray(F)?W(F):"tokenize"in F?W([F]):Q(F);function Q(ae){return de;function de(ge){const be=ge!==null&&ae[ge],Ce=ge!==null&&ae.null,Ne=[...Array.isArray(be)?be:be?[be]:[],...Array.isArray(Ce)?Ce:Ce?[Ce]:[]];return W(Ne)(ge)}}function W(ae){return z=ae,G=0,ae.length===0?H:b(ae[G])}function b(ae){return de;function de(ge){return m=y(),V=ae,ae.partial||(h.currentConstruct=ae),ae.name&&h.parser.constructs.disable.null.includes(ae.name)?we():ae.tokenize.call(A?Object.assign(Object.create(h),A):h,l,ne,we)(ge)}}function ne(ae){return C(V,m),R}function we(ae){return m.restore(),++G<z.length?b(z[G]):H}}}function q(C,A){C.resolveAll&&!o.includes(C)&&o.push(C),C.resolve&&xe(h.events,A,h.events.length-A,C.resolve(h.events.slice(A),h)),C.resolveTo&&(h.events=C.resolveTo(h.events,h))}function y(){const C=v(),A=h.previous,L=h.currentConstruct,F=h.events.length,R=Array.from(s);return{restore:H,from:F};function H(){n=C,h.previous=A,h.currentConstruct=L,h.events.length=F,s=R,E()}}function E(){n.line in a&&n.column<2&&(n.column=a[n.line],n.offset+=a[n.line]-1)}}function To(r,e){const t=e.start._index,n=e.start._bufferIndex,a=e.end._index,o=e.end._bufferIndex;let i;if(t===a)i=[r[t].slice(n,o)];else{if(i=r.slice(t,a),n>-1){const s=i[0];typeof s=="string"?i[0]=s.slice(n):i.shift()}o>0&&i.push(r[a].slice(0,o))}return i}function Ao(r,e){let t=-1;const n=[];let a;for(;++t<r.length;){const o=r[t];let i;if(typeof o=="string")i=o;else switch(o){case-5:{i="\r";break}case-4:{i=`
`;break}case-3:{i=`\r
`;break}case-2:{i=e?" ":"	";break}case-1:{if(!e&&a)continue;i=" ";break}default:i=String.fromCharCode(o)}a=o===-2,n.push(i)}return n.join("")}const Eo=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:{null:[42,95]},contentInitial:{91:Ma},disable:{null:[]},document:{42:le,43:le,45:le,48:le,49:le,50:le,51:le,52:le,53:le,54:le,55:le,56:le,57:le,62:Rr},flow:{35:_a,42:gt,45:[Vr,gt],60:Oa,61:Vr,95:gt,96:qr,126:qr},flowInitial:{[-2]:Dt,[-1]:Dt,32:Dt},insideSpan:{null:[Ft,yo]},string:{38:Or,92:zr},text:{[-5]:Ht,[-4]:Ht,[-3]:Ht,33:ro,38:Or,42:Ft,60:[oa,ja],91:ao,92:[Na,zr],93:qt,95:Ft,96:xa}},Symbol.toStringTag,{value:"Module"}));function Mo(r){const t=Un([Eo,...(r||{}).extensions||[]]),n={defined:[],lazy:{},constructs:t,content:a(Jn),document:a(ea),flow:a(xo),string:a(wo),text:a(ko)};return n;function a(o){return i;function i(s){return So(n,o,s)}}}const Yr=/[\0\t\n\r]/g;function Lo(){let r=1,e="",t=!0,n;return a;function a(o,i,s){const l=[];let h,p,c,u,g;for(o=e+o.toString(i),c=0,e="",t&&(o.charCodeAt(0)===65279&&c++,t=void 0);c<o.length;){if(Yr.lastIndex=c,h=Yr.exec(o),u=h&&h.index!==void 0?h.index:o.length,g=o.charCodeAt(u),!h){e=o.slice(c);break}if(g===10&&c===u&&n)l.push(-3),n=void 0;else switch(n&&(l.push(-5),n=void 0),c<u&&(l.push(o.slice(c,u)),r+=u-c),g){case 0:{l.push(65533),r++;break}case 9:{for(p=Math.ceil(r/4)*4,l.push(-2);r++<p;)l.push(-1);break}case 10:{l.push(-4),r=1;break}default:n=!0,r=1}c=u+1}return s&&(n&&l.push(-5),e&&l.push(e),l.push(null)),l}}function Io(r){for(;!Hr(r););return r}function Kr(r,e){const t=Number.parseInt(r,e);return t<9||t===11||t>13&&t<32||t>126&&t<160||t>55295&&t<57344||t>64975&&t<65008||(t&65535)===65535||(t&65535)===65534||t>1114111?"\uFFFD":String.fromCharCode(t)}const Po=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function No(r){return r.replace(Po,Bo)}function Bo(r,e,t){if(e)return e;if(t.charCodeAt(0)===35){const a=t.charCodeAt(1),o=a===120||a===88;return Kr(t.slice(o?2:1),o?16:10)}return Ot(t)||r}function ut(r){return!r||typeof r!="object"?"":"position"in r||"type"in r?Xr(r.position):"start"in r||"end"in r?Xr(r):"line"in r||"column"in r?$t(r):""}function $t(r){return Jr(r&&r.line)+":"+Jr(r&&r.column)}function Xr(r){return $t(r&&r.start)+"-"+$t(r&&r.end)}function Jr(r){return r&&typeof r=="number"?r:1}const Zr={}.hasOwnProperty,_o=function(r,e,t){return typeof e!="string"&&(t=e,e=void 0),Ro(t)(Io(Mo(t).document().write(Lo()(r,e,!0))))};function Ro(r){const e={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(K),autolinkProtocol:C,autolinkEmail:C,atxHeading:s(tt),blockQuote:s(Ne),characterEscape:C,characterReference:C,codeFenced:s(De),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:s(De,l),codeText:s(Be,l),codeTextData:C,data:C,codeFlowValue:C,definition:s(mt),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:s(bt),hardBreakEscape:s(qe),hardBreakTrailing:s(qe),htmlFlow:s(He,l),htmlFlowData:C,htmlText:s(He,l),htmlTextData:C,image:s(O),label:l,link:s(K),listItem:s(jt),listItemValue:v,listOrdered:s(Le,g),listUnordered:s(Le),paragraph:s(Ko),reference:we,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:s(tt),strong:s(Xo),thematicBreak:s(Zo)},exit:{atxHeading:p(),atxHeadingSequence:I,autolink:p(),autolinkEmail:Ce,autolinkProtocol:be,blockQuote:p(),characterEscapeValue:A,characterReferenceMarkerHexadecimal:de,characterReferenceMarkerNumeric:de,characterReferenceValue:ge,codeFenced:p(M),codeFencedFence:k,codeFencedFenceInfo:f,codeFencedFenceMeta:S,codeFlowValue:A,codeIndented:p(x),codeText:p(z),codeTextData:A,data:A,definition:p(),definitionDestinationString:w,definitionLabelString:P,definitionTitleString:D,emphasis:p(),hardBreakEscape:p(F),hardBreakTrailing:p(F),htmlFlow:p(R),htmlFlowData:A,htmlText:p(H),htmlTextData:A,image:p(V),label:Q,labelText:m,lineEnding:L,link:p(G),listItem:p(),listOrdered:p(),listUnordered:p(),paragraph:p(),referenceString:ae,resourceDestinationString:W,resourceTitleString:b,resource:ne,setextHeading:p(E),setextHeadingLineSequence:y,setextHeadingText:q,strong:p(),thematicBreak:p()}};en(e,(r||{}).mdastExtensions||[]);const t={};return n;function n(T){let N={type:"root",children:[]};const U={stack:[N],tokenStack:[],config:e,enter:h,exit:c,buffer:l,resume:u,setData:o,getData:i},X=[];let ee=-1;for(;++ee<T.length;)if(T[ee][1].type==="listOrdered"||T[ee][1].type==="listUnordered")if(T[ee][0]==="enter")X.push(ee);else{const fe=X.pop();ee=a(T,fe,ee)}for(ee=-1;++ee<T.length;){const fe=e[T[ee][0]];Zr.call(fe,T[ee][1].type)&&fe[T[ee][1].type].call(Object.assign({sliceSerialize:T[ee][2].sliceSerialize},U),T[ee][1])}if(U.tokenStack.length>0){const fe=U.tokenStack[U.tokenStack.length-1];(fe[1]||tn).call(U,void 0,fe[0])}for(N.position={start:Ee(T.length>0?T[0][1].start:{line:1,column:1,offset:0}),end:Ee(T.length>0?T[T.length-2][1].end:{line:1,column:1,offset:0})},ee=-1;++ee<e.transforms.length;)N=e.transforms[ee](N)||N;return N}function a(T,N,U){let X=N-1,ee=-1,fe=!1,Ie,Se,rt,nt;for(;++X<=U;){const oe=T[X];if(oe[1].type==="listUnordered"||oe[1].type==="listOrdered"||oe[1].type==="blockQuote"?(oe[0]==="enter"?ee++:ee--,nt=void 0):oe[1].type==="lineEndingBlank"?oe[0]==="enter"&&(Ie&&!nt&&!ee&&!rt&&(rt=X),nt=void 0):oe[1].type==="linePrefix"||oe[1].type==="listItemValue"||oe[1].type==="listItemMarker"||oe[1].type==="listItemPrefix"||oe[1].type==="listItemPrefixWhitespace"||(nt=void 0),!ee&&oe[0]==="enter"&&oe[1].type==="listItemPrefix"||ee===-1&&oe[0]==="exit"&&(oe[1].type==="listUnordered"||oe[1].type==="listOrdered")){if(Ie){let Vt=X;for(Se=void 0;Vt--;){const Te=T[Vt];if(Te[1].type==="lineEnding"||Te[1].type==="lineEndingBlank"){if(Te[0]==="exit")continue;Se&&(T[Se][1].type="lineEndingBlank",fe=!0),Te[1].type="lineEnding",Se=Vt}else if(!(Te[1].type==="linePrefix"||Te[1].type==="blockQuotePrefix"||Te[1].type==="blockQuotePrefixWhitespace"||Te[1].type==="blockQuoteMarker"||Te[1].type==="listItemIndent"))break}rt&&(!Se||rt<Se)&&(Ie._spread=!0),Ie.end=Object.assign({},Se?T[Se][1].start:oe[1].end),T.splice(Se||X,0,["exit",Ie,oe[2]]),X++,U++}oe[1].type==="listItemPrefix"&&(Ie={type:"listItem",_spread:!1,start:Object.assign({},oe[1].start),end:void 0},T.splice(X,0,["enter",Ie,oe[2]]),X++,U++,rt=void 0,nt=!0)}}return T[N][1]._spread=fe,U}function o(T,N){t[T]=N}function i(T){return t[T]}function s(T,N){return U;function U(X){h.call(this,T(X),X),N&&N.call(this,X)}}function l(){this.stack.push({type:"fragment",children:[]})}function h(T,N,U){return this.stack[this.stack.length-1].children.push(T),this.stack.push(T),this.tokenStack.push([N,U]),T.position={start:Ee(N.start)},T}function p(T){return N;function N(U){T&&T.call(this,U),c.call(this,U)}}function c(T,N){const U=this.stack.pop(),X=this.tokenStack.pop();if(X)X[0].type!==T.type&&(N?N.call(this,T,X[0]):(X[1]||tn).call(this,T,X[0]));else throw new Error("Cannot close `"+T.type+"` ("+ut({start:T.start,end:T.end})+"): it\u2019s not open");return U.position.end=Ee(T.end),U}function u(){return Hn(this.stack.pop())}function g(){o("expectingFirstListItemValue",!0)}function v(T){if(i("expectingFirstListItemValue")){const N=this.stack[this.stack.length-2];N.start=Number.parseInt(this.sliceSerialize(T),10),o("expectingFirstListItemValue")}}function f(){const T=this.resume(),N=this.stack[this.stack.length-1];N.lang=T}function S(){const T=this.resume(),N=this.stack[this.stack.length-1];N.meta=T}function k(){i("flowCodeInside")||(this.buffer(),o("flowCodeInside",!0))}function M(){const T=this.resume(),N=this.stack[this.stack.length-1];N.value=T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),o("flowCodeInside")}function x(){const T=this.resume(),N=this.stack[this.stack.length-1];N.value=T.replace(/(\r?\n|\r)$/g,"")}function P(T){const N=this.resume(),U=this.stack[this.stack.length-1];U.label=N,U.identifier=Fe(this.sliceSerialize(T)).toLowerCase()}function D(){const T=this.resume(),N=this.stack[this.stack.length-1];N.title=T}function w(){const T=this.resume(),N=this.stack[this.stack.length-1];N.url=T}function I(T){const N=this.stack[this.stack.length-1];if(!N.depth){const U=this.sliceSerialize(T).length;N.depth=U}}function q(){o("setextHeadingSlurpLineEnding",!0)}function y(T){const N=this.stack[this.stack.length-1];N.depth=this.sliceSerialize(T).charCodeAt(0)===61?1:2}function E(){o("setextHeadingSlurpLineEnding")}function C(T){const N=this.stack[this.stack.length-1];let U=N.children[N.children.length-1];(!U||U.type!=="text")&&(U=Jo(),U.position={start:Ee(T.start)},N.children.push(U)),this.stack.push(U)}function A(T){const N=this.stack.pop();N.value+=this.sliceSerialize(T),N.position.end=Ee(T.end)}function L(T){const N=this.stack[this.stack.length-1];if(i("atHardBreak")){const U=N.children[N.children.length-1];U.position.end=Ee(T.end),o("atHardBreak");return}!i("setextHeadingSlurpLineEnding")&&e.canContainEols.includes(N.type)&&(C.call(this,T),A.call(this,T))}function F(){o("atHardBreak",!0)}function R(){const T=this.resume(),N=this.stack[this.stack.length-1];N.value=T}function H(){const T=this.resume(),N=this.stack[this.stack.length-1];N.value=T}function z(){const T=this.resume(),N=this.stack[this.stack.length-1];N.value=T}function G(){const T=this.stack[this.stack.length-1];if(i("inReference")){const N=i("referenceType")||"shortcut";T.type+="Reference",T.referenceType=N,delete T.url,delete T.title}else delete T.identifier,delete T.label;o("referenceType")}function V(){const T=this.stack[this.stack.length-1];if(i("inReference")){const N=i("referenceType")||"shortcut";T.type+="Reference",T.referenceType=N,delete T.url,delete T.title}else delete T.identifier,delete T.label;o("referenceType")}function m(T){const N=this.sliceSerialize(T),U=this.stack[this.stack.length-2];U.label=No(N),U.identifier=Fe(N).toLowerCase()}function Q(){const T=this.stack[this.stack.length-1],N=this.resume(),U=this.stack[this.stack.length-1];if(o("inReference",!0),U.type==="link"){const X=T.children;U.children=X}else U.alt=N}function W(){const T=this.resume(),N=this.stack[this.stack.length-1];N.url=T}function b(){const T=this.resume(),N=this.stack[this.stack.length-1];N.title=T}function ne(){o("inReference")}function we(){o("referenceType","collapsed")}function ae(T){const N=this.resume(),U=this.stack[this.stack.length-1];U.label=N,U.identifier=Fe(this.sliceSerialize(T)).toLowerCase(),o("referenceType","full")}function de(T){o("characterReferenceType",T.type)}function ge(T){const N=this.sliceSerialize(T),U=i("characterReferenceType");let X;U?(X=Kr(N,U==="characterReferenceMarkerNumeric"?10:16),o("characterReferenceType")):X=Ot(N);const ee=this.stack.pop();ee.value+=X,ee.position.end=Ee(T.end)}function be(T){A.call(this,T);const N=this.stack[this.stack.length-1];N.url=this.sliceSerialize(T)}function Ce(T){A.call(this,T);const N=this.stack[this.stack.length-1];N.url="mailto:"+this.sliceSerialize(T)}function Ne(){return{type:"blockquote",children:[]}}function De(){return{type:"code",lang:null,meta:null,value:""}}function Be(){return{type:"inlineCode",value:""}}function mt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function bt(){return{type:"emphasis",children:[]}}function tt(){return{type:"heading",depth:void 0,children:[]}}function qe(){return{type:"break"}}function He(){return{type:"html",value:""}}function O(){return{type:"image",title:null,url:"",alt:null}}function K(){return{type:"link",title:null,url:"",children:[]}}function Le(T){return{type:"list",ordered:T.type==="listOrdered",start:null,spread:T._spread,children:[]}}function jt(T){return{type:"listItem",spread:T._spread,checked:null,children:[]}}function Ko(){return{type:"paragraph",children:[]}}function Xo(){return{type:"strong",children:[]}}function Jo(){return{type:"text",value:""}}function Zo(){return{type:"thematicBreak"}}}function Ee(r){return{line:r.line,column:r.column,offset:r.offset}}function en(r,e){let t=-1;for(;++t<e.length;){const n=e[t];Array.isArray(n)?en(r,n):zo(r,n)}}function zo(r,e){let t;for(t in e)if(Zr.call(e,t)){if(t==="canContainEols"){const n=e[t];n&&r[t].push(...n)}else if(t==="transforms"){const n=e[t];n&&r[t].push(...n)}else if(t==="enter"||t==="exit"){const n=e[t];n&&Object.assign(r[t],n)}}}function tn(r,e){throw r?new Error("Cannot close `"+r.type+"` ("+ut({start:r.start,end:r.end})+"): a different token (`"+e.type+"`, "+ut({start:e.start,end:e.end})+") is open"):new Error("Cannot close document, a token (`"+e.type+"`, "+ut({start:e.start,end:e.end})+") is still open")}const rn=r=>(r||"").trim().replace(/\s+/g," "),Ut=r=>r.value??r.alt??(r.children||[]).map(Ut).join("");function Oe(r,e,t,n=null,a=0){const o=rn(t)||(a?re("outlineImages").replace("{n}",String(a)):""),i=e===0?100:r==="summary"?80:1/0;return{position:r,level:e,text:o.length>i?o.slice(0,i)+"\u2026":o,isTruncated:o.length>i,element:n}}function nn(r,e,t){if(t==="user"){const{element:i,text:s,imageCount:l}=r.getUserOutlineContent(e);return[Oe("query",0,s,i,l)].filter(h=>h.text)}const n=r.getMessageContent(e),a=Array.from(n.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).filter(i=>!i.closest('pre, [hidden], [aria-hidden="true"], .sr-only')&&rn(i.textContent));if(a.length)return a.map((i,s)=>{const l=Number(i.tagName.match(/^H([1-6])$/)?.[1]||i.getAttribute("aria-level"))||2;return Oe(s,Math.max(1,Math.min(6,l)),i.innerText||i.textContent,i)});const o=n.querySelector("p, li")||n;return[Oe("summary",1,r.getMessageBodyText(o),o)].filter(i=>i.text)}function Fo(r){const e=Array.isArray(r.content?.parts)?r.content.parts:[],t=e.filter(i=>typeof i=="string").join(`
`);if(r.author.role==="user"){const i=r.metadata?.attachments,s=e.filter(l=>l?.content_type==="image_asset_pointer").length||(Array.isArray(i)?i.filter(l=>l?.mime_type?.startsWith("image/")).length:0);return[Oe("query",0,t,null,s)].filter(l=>l.text)}if(!t.trim())return[];const n=[];let a="";const o=i=>{i.type==="heading"?n.push(Oe(n.length,i.depth,Ut(i))):!a&&i.type==="paragraph"&&(a=Ut(i)),i.children?.forEach(o)};return o(_o(t)),n.length?n:[Oe("summary",1,a||t)]}class Oo{constructor(e,t,n){this.adapter=e,this.main=t,this.path=n,this.seen=new Map,this.branch=[],this.byId=new Map,this.aliases=new Map,this.ranks=new Map,this.controller=new AbortController}setConversation(e,t=e?.current_node){const n=e?.mapping;if(!t&&n){const i=Object.keys(n).filter(s=>!n[s]?.children?.length);i.length===1&&(t=i[0])}if(!n?.[t])return;const a=[],o=new Set;for(let i=t;i;i=n[i]?.parent){if(o.has(i)||!n[i])return;o.add(i);const s=n[i].message;if(!["user","assistant"].includes(s?.author?.role)||!["text","multimodal_text"].includes(s.content?.content_type)||s.metadata?.is_visually_hidden_from_conversation||s.recipient&&s.recipient!=="all"||s.channel==="analysis")continue;const l=Fo(s);l.length&&a.push({id:s.id||i,role:s.author.role,items:l})}this.data=e,this.branchKeys=o,this.branch=a.reverse(),this.byId=new Map(this.branch.map((i,s)=>[i.id,s]));for(const i of this.seen.keys())n[i]&&!o.has(i)&&this.seen.delete(i);this.aliases.clear()}readMounted(e,t=!0){const n=e===document.scrollingElement?0:e.getBoundingClientRect().top+e.clientTop;return this.adapter.getChatMessages().flatMap(a=>{const o=this.adapter.getMessageRole(a);if(o!=="user"&&o!=="assistant")return[];const i=this.adapter.getMessageIdentity(a),s=this.adapter.getMessageSlot(a),l=a.closest("[data-turn-key]")?.getAttribute("data-turn-key");return[{id:i,slot:s,role:o,turn:l,number:this.adapter.getMessageTurnNumber(a),message:a,top:e.scrollTop+a.getBoundingClientRect().top-n,items:t?nn(this.adapter,a,o):null}]})}bind(e){const t=new Map;for(const n of e)if(n.role==="assistant"&&n.turn&&this.byId.has(n.id)){let a=this.byId.get(n.id)-1;for(;a>=0&&this.branch[a].role!=="user";)a--;a>=0&&t.set(n.turn,this.branch[a].id)}for(const n of e)if(!this.byId.has(n.id)&&(n.id===n.slot||n.id.startsWith("anonymous-"))){const a=n.role==="user"&&t.get(n.turn);if(a&&this.aliases.set(n.id,a),!this.aliases.has(n.id)&&n.items?.[0]){const o=this.branch.filter(i=>i.role===n.role&&i.items[0].text===n.items[0].text);o.length===1&&this.aliases.set(n.id,o[0].id)}n.id=this.aliases.get(n.id)||n.id}}update(e){const t=this.adapter.getScrollContainer();if(!t)return[];const n=this.readMounted(t),a=n.findLast(f=>this.data?.mapping?.[f.id]?.message&&!this.branchKeys.has(f.id));if(a){let f=a.id;const S=new Set([f]);for(;this.data.mapping[f]?.children?.length===1;){const k=this.data.mapping[f].children[0];if(S.has(k))break;S.add(k),f=k}this.seen.clear(),this.setConversation(this.data,f)}if(this.data&&this.boundBranch!==this.branch){const f=Array.from(this.seen.values());this.bind(f),this.seen=new Map(f.map(S=>[S.id,S])),this.boundBranch=this.branch}this.bind(n);const o=new Map(Array.from(this.seen.values(),f=>[f.slot,f.id]));for(const f of n){const S=f.slot&&o.get(f.slot);if(!S||S===f.id||this.aliases.get(S)===f.id||this.byId.has(S)&&this.byId.has(f.id))continue;const k=this.ranks.get(S);for(const[M,x]of this.ranks)x>=k&&this.seen.delete(M);this.byId.has(S)&&(this.branch=this.branch.slice(0,this.byId.get(S)),this.byId=new Map(this.branch.map((M,x)=>[M.id,x])))}const i=new Map;for(const{id:f,slot:S,role:k,items:M,top:x,number:P,turn:D}of n)M.length&&(i.set(f,M),this.seen.set(f,{id:f,slot:S,role:k,top:x,number:P,turn:D,items:M.map(w=>({...w,element:null}))}));for(const f of this.aliases.keys())this.seen.delete(f);const s=this.branch.some(f=>this.seen.has(f.id)),l=s||!this.seen.size?this.branch:[],h=(f,S)=>(f.number!=null&&S.number!=null?f.number-S.number:0)||f.top-S.top,p=Array.from(this.seen.values()).sort(h),c=[],u=new Map;let g=null;for(let f=p.length-1;f>=0;f--){const S=p[f];s&&this.byId.has(S.id)?g=S.id:(u.has(g)||u.set(g,[]),u.get(g).push(S))}for(const f of l)u.has(f.id)&&c.push(...u.get(f.id).reverse()),c.push(this.seen.get(f.id)||f);u.has(null)&&c.push(...u.get(null).reverse()),this.ranks=new Map(c.map((f,S)=>[f.id,S]));const v=[];for(const f of c){if(!e&&f.role==="user")continue;const S=new Map;for(const k of i.get(f.id)||f.items){const M=S.get(k.text)||0;S.set(k.text,M+1),v.push({...k,occurrence:M,id:`${this.path}:${f.id}:${k.position}`,messageId:f.id,isUserQuery:f.role==="user",index:v.length})}}return v}resolve(e,t,n){if(location.pathname!==this.path||this.adapter.getChatContainer()!==this.main)return null;const a=this.ranks.get(e.messageId);if(a==null)return null;const o=this.readMounted(t,!1);this.bind(o);const i=o.find(u=>u.id===e.messageId);if(i){const u=nn(this.adapter,i.message,i.role),g=typeof e.position=="number"?u.filter(v=>v.text===e.text)[e.occurrence]:u[0];if(g?.element?.getClientRects().length)return{element:g.element};if(i.message.getClientRects().length)return{estimate:i.top}}n.height!==t.scrollHeight&&(n.height=t.scrollHeight,n.low={rank:0,top:0},n.high={rank:Math.max(1,this.ranks.size),top:t.scrollHeight});for(const u of o){const g=this.ranks.get(u.id);g!=null&&(g<a&&g>=n.low.rank&&(n.low={rank:g,top:u.top+u.message.getBoundingClientRect().height}),g>a&&g<=n.high.rank&&(n.high={rank:g,top:u.top}))}const{low:s,high:l}=n,h=(a-s.rank)/Math.max(1,l.rank-s.rank),p=this.seen.get(e.messageId)?.top,c=!n.triedRemembered&&p!=null?p:s.top+h*(l.top-s.top);return n.triedRemembered=!0,{estimate:c}}}const Do={refreshOutline(r=!1){const e=this.panel?.querySelector("#outline-content");e&&this.currentTab==="outline"&&this.renderOutline(e,r)},renderOutline(r,e=!1){this.outlineManager||(this.outlineManager=new mr({container:r,settings:this.settings,siteAdapter:this.adapter,onNavigate:(i,s)=>{const l=this.outlineIndex,h={};this.scrollManager.scrollTo({resolveTarget:p=>l.resolve(i,p,h),onComplete:p=>{p.timedOut&&this.showToast(re("outlineTargetUnavailable")),s(p)}})},cancelNavigation:()=>this.scrollManager.cancel(),onJumpBefore:()=>{this.anchorManager&&this.scrollManager&&this.anchorManager.setAnchor(this.scrollManager.scrollTop)},onAutoUpdate:()=>{this.outlineIndex?.path===location.pathname&&this.outlineIndex.main===this.adapter.getChatContainer()&&this.refreshOutline()},onSettingsChange:i=>{var s;(s=this.settings).outline||(s.outline={}),Object.assign(this.settings.outline,i),this.saveSettings()},i18n:re}));const t=this.outlineManager;t.settings=this.settings,(t.container!==r||!r.querySelector("#outline-list"))&&(t.container=r,t.createUI());const n=this.adapter.getChatContainer();(this.outlineIndex?.main!==n||this.outlineIndex?.path!==location.pathname)&&(this.outlineIndex?.controller.abort(),this.outlineIndex=new Oo(this.adapter,n,location.pathname));const a=this.outlineIndex,o=Mr(a.path);n&&o&&!a.loading&&(!a.requested||e||!t.isActive&&!a.data)&&(a.requested=!0,a.loading=!0,this.backend.json(`/conversation/${encodeURIComponent(o)}`,{signal:a.controller.signal}).then(i=>{a.controller.signal.aborted||a.path!==location.pathname||n!==this.adapter.getChatContainer()||(i?.conversation_id||i?.id||o)===o&&(a.setConversation(i),this.refreshOutline())}).catch(()=>{}).finally(()=>{a.loading=!1})),t.update(a.update(this.settings.outline?.showUserQueries)),t.setActive(this.currentTab==="outline")}},qo={toggleCollapse(r={}){this.isCollapsed=!this.isCollapsed,this.panel.classList.toggle("collapsed",this.isCollapsed),this.updateCollapseButtonState();const e=document.getElementById("chatgpt-helper-quick-buttons");e?this.isCollapsed?(e.classList.remove("hidden"),e.classList.add("collapsed"),e.style.right="8px",e.style.display="flex"):(e.classList.add("hidden"),e.classList.remove("collapsed"),e.style.right=`${this.settings.panelWidth+20}px`,e.style.display="none"):this.createCollapsedButtons(),this.updateLayout&&this.updateLayout(),r.persist!==!1&&(this.settings.defaultPanelState=!this.isCollapsed,this.saveSettings())},createCollapsedButtons(){this.quickButtonsCleanup?.();const r=document.getElementById("chatgpt-helper-quick-buttons");r&&r.remove();const e=d("div",{id:"chatgpt-helper-quick-buttons",className:"chatgpt-helper-quick-buttons"+(this.isCollapsed?" collapsed":" hidden")});this.isCollapsed?(e.style.right="8px",e.style.display="flex",e.classList.remove("hidden"),e.classList.add("collapsed")):(e.style.right=`${this.settings.panelWidth+20}px`,e.style.display="none",e.classList.add("hidden"),e.classList.remove("collapsed"));const t=Array.isArray(this.settings.collapsedButtonsOrder)?this.settings.collapsedButtonsOrder:[],n=Array.from(new Set(t.map(v=>v?.id).filter(v=>Pe[v])));Ge.forEach(v=>{n.includes(v.id)||n.push(v.id)});const a=n.map(v=>({id:v,enabled:!0})),o={};a.forEach((v,f)=>{const S=Pe[v.id];if(S)if(f>0&&S.isPanelOnly&&!Pe[a[f-1].id]?.isPanelOnly&&e.appendChild(d("div",{className:"chatgpt-helper-btn-divider"})),v.id==="manualAnchor"){const k=d("button",{className:"chatgpt-helper-quick-btn",title:this.t("setAnchor"),id:"manual-anchor-set-btn",type:"button","aria-label":this.t("setAnchor")});k.appendChild(j("pin",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const M=I=>{I.preventDefault(),I.stopPropagation(),I.stopImmediatePropagation(),this.setAnchorManually()};k.addEventListener("click",M,{capture:!1,passive:!1});const x=d("button",{className:"chatgpt-helper-quick-btn"+(this.savedAnchorTop===null?" disabled":""),title:this.savedAnchorTop===null?this.t("noAnchor"):this.t("returnAnchor"),id:"manual-anchor-back-btn",type:"button","aria-label":this.savedAnchorTop===null?this.t("noAnchor"):this.t("returnAnchor")});x.appendChild(j("back",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const P=I=>{I.preventDefault(),I.stopPropagation(),I.stopImmediatePropagation(),this.savedAnchorTop!==null?this.backToManualAnchor():this.showToast(this.t("noAnchor"))};x.addEventListener("click",P,{capture:!1,passive:!1});const D=d("button",{className:"chatgpt-helper-quick-btn"+(this.savedAnchorTop===null?" disabled":""),title:this.t("clearAnchor"),id:"manual-anchor-clear-btn",type:"button","aria-label":this.t("clearAnchor")});D.appendChild(j("close",{size:18,className:"chatgpt-helper-quick-btn-icon"}));const w=I=>{I.preventDefault(),I.stopPropagation(),I.stopImmediatePropagation(),this.savedAnchorTop!==null?this.clearAnchorManually():this.showToast(this.t("noAnchor"))};D.addEventListener("click",w,{capture:!1,passive:!1}),e.appendChild(k),e.appendChild(x),e.appendChild(D)}else{const k=S.labelKey?this.t(S.labelKey):S.label||"",M=d("button",{className:"chatgpt-helper-quick-btn"+(S.isPanelOnly?" panel-only":""),title:k,id:`quick-btn-${v.id}`,type:"button","aria-label":k});M.appendChild(Ct(S,{size:v.id==="panel"?20:18,className:v.id==="panel"?"chatgpt-helper-quick-btn-logo":"chatgpt-helper-quick-btn-icon",title:k}));const x=this,P=v.id,D=function(w){w.preventDefault(),w.stopPropagation(),w.stopImmediatePropagation();try{P==="scrollTop"?x.scrollToTop():P==="scrollBottom"?x.scrollToBottom():P==="panel"?x.toggleCollapse():P==="anchor"?x.handleAnchorClick():P==="theme"&&(x.toggleTheme(w),setTimeout(()=>{const I=document.body.dataset.ghMode==="dark"||document.documentElement.getAttribute("data-gh-mode")==="dark";ue(M,I?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"})},200))}catch(I){console.error("[ChatGPT Helper] \u6309\u94AE\u64CD\u4F5C\u5931\u8D25:",P,I,I.stack),x.showToast(`${x.t("operationFailed")}: ${I.message}`)}};if(M.addEventListener("click",D),v.id==="anchor")x.hasAnchor?M.title=x.t("returnPreviousPosition"):(M.style.opacity="0.4",M.style.cursor="default",M.title=x.t("noAnchor"));else if(v.id==="theme"){const w=document.body.dataset.ghMode==="dark"||document.documentElement.getAttribute("data-gh-mode")==="dark"||/\bdark\b/i.test(document.body.className);ue(M,w?"moon":"sun",{size:18,className:"chatgpt-helper-quick-btn-icon"})}o[v.id]=M,e.appendChild(M)}});const i=d("button",{id:"quick-btn-minimize",className:"chatgpt-helper-quick-btn",type:"button",title:this.t("minimizeQuickButtons"),"aria-label":this.t("minimizeQuickButtons")});i.appendChild(j("minus",{size:18,className:"chatgpt-helper-quick-btn-icon"})),e.appendChild(i);const s=d("button",{id:"quick-btn-bubble",className:"chatgpt-helper-quick-bubble",type:"button",title:this.t("expandQuickButtons"),"aria-label":this.t("expandQuickButtons")});s.appendChild(Re({size:30})),e.appendChild(s),document.body.appendChild(e);const l=(v=!1)=>{if(!this.quickButtonsMinimized)return;const f=e.getBoundingClientRect(),S=f.width||54,k=f.height||54,M=this.quickBubblePosition||{x:window.innerWidth-S-8,y:(window.innerHeight-k)/2},x=Math.min(8,Math.max(0,(window.innerWidth-S)/2));this.quickBubblePosition={x:v?this.quickBubbleEdge==="left"?x:Math.max(x,window.innerWidth-S-x):Math.max(0,Math.min(M.x,window.innerWidth-S)),y:Math.max(0,Math.min(M.y,window.innerHeight-k))},e.style.left=`${this.quickBubblePosition.x}px`,e.style.top=`${this.quickBubblePosition.y}px`},h=v=>{this.quickButtonsMinimized=v,e.classList.toggle("minimized",v),v?l(!0):(e.style.removeProperty("left"),e.style.removeProperty("top"))};i.addEventListener("click",()=>{h(!0),s.focus()});let p=null,c=!1;s.addEventListener("pointerdown",v=>{if(v.button!==0)return;const f=e.getBoundingClientRect();p={id:v.pointerId,x:v.clientX,y:v.clientY,left:f.left,top:f.top,moved:!1},c=!1,e.classList.add("bubble-dragging"),s.setPointerCapture(v.pointerId)}),s.addEventListener("pointermove",v=>{if(!p||v.pointerId!==p.id)return;const f=v.clientX-p.x,S=v.clientY-p.y;!p.moved&&Math.hypot(f,S)<5||(p.moved=!0,s.classList.add("dragging"),this.quickBubblePosition={x:p.left+f,y:p.top+S},l())});const u=v=>{if(!(!p||v.pointerId!==p.id)){if(c=p.moved,p.moved){const f=e.getBoundingClientRect();this.quickBubbleEdge=f.left+f.width/2<window.innerWidth/2?"left":"right"}p=null,s.classList.remove("dragging"),e.classList.remove("bubble-dragging"),c&&l(!0)}};s.addEventListener("pointerup",u),s.addEventListener("pointercancel",u),s.addEventListener("lostpointercapture",u),s.addEventListener("click",()=>{if(c){c=!1;return}h(!1),i.focus()});const g=()=>l(!p);window.addEventListener("resize",g),this.quickButtonsCleanup=()=>window.removeEventListener("resize",g),!this.quickButtonsScopeBound&&this.scope&&(this.quickButtonsScopeBound=!0,this.scope.cleanups.push(()=>this.quickButtonsCleanup?.())),h(!!this.quickButtonsMinimized),this.quickButtons=o},scrollToTop(){const r=this.scrollManager.scrollTop;r>100&&this.anchorManager?.setAnchor(r),this.scrollManager.scrollTo({top:0,behavior:"smooth"})},scrollToBottom(){const r=this.scrollManager.scrollTop;this.scrollManager.isAtBottom()||this.anchorManager?.setAnchor(r),this.scrollManager.scrollTo({top:this.scrollManager.scrollHeight,behavior:"smooth"})},setAnchorManually(){try{const r=this.scrollManager.container;r?this.savedAnchorTop=r.scrollTop||this.scrollManager.scrollTop:this.savedAnchorTop=window.scrollY||0,this.showAnchorMarker(this.savedAnchorTop),this.updateManualAnchorButtons(),this.showToast(this.t("anchorSet"))}catch(r){console.error("[ChatGPT Helper] \u8BBE\u7F6E\u951A\u70B9\u5931\u8D25:",r),this.showToast(this.t("anchorSetFailed"))}},backToManualAnchor(){if(this.savedAnchorTop===null){this.showToast(this.t("noAnchor"));return}this.scrollManager.scrollTo({top:this.savedAnchorTop,behavior:"smooth"})},clearAnchorManually(){this.savedAnchorTop=null,this.hideAnchorMarker(),this.updateManualAnchorButtons(),this.showToast(this.t("anchorCleared"))},showAnchorMarker(r){this.hideAnchorMarker();const e=this.scrollManager.container;if(!e)return;window.getComputedStyle(e).position==="static"&&(e.style.position="relative");const n=d("div",{className:"chatgpt-helper-anchor-marker",id:"chatgpt-helper-anchor-marker",style:`top: ${r}px;`});e.appendChild(n)},hideAnchorMarker(){const r=document.getElementById("chatgpt-helper-anchor-marker");r&&r.remove()},updateManualAnchorButtons(){const r=document.getElementById("manual-anchor-back-btn"),e=document.getElementById("manual-anchor-clear-btn"),t=this.savedAnchorTop!==null;r&&(r.classList.toggle("disabled",!t),r.title=t?this.t("returnAnchor"):this.t("noAnchor"),r.setAttribute("aria-label",r.title)),e&&e.classList.toggle("disabled",!t)},handleAnchorClick(){this.anchorManager?.backToAnchor()||this.showToast(this.t("noAnchorAutoHint")),this.updateAnchorButton()},updateAnchorButton(){const r=this.anchorManager?this.anchorManager.hasAnchor():this.hasAnchor,e=document.getElementById("quick-btn-anchor");e&&(e.style.opacity=r?"1":"0.4",e.style.cursor=r?"pointer":"default",e.title=r?this.t("returnPreviousPosition"):this.t("noAnchor"),e.setAttribute("aria-label",e.title));const t=document.getElementById("scroll-anchor-btn");t&&(r?(t.style.opacity="1",t.style.cursor="pointer",t.title=this.t("returnPreviousPosition"),t.setAttribute("aria-label",t.title)):(t.style.opacity="0.4",t.style.cursor="default",t.title=this.t("noAnchor"),t.setAttribute("aria-label",t.title)))},toggleTheme(r){try{const t=this.detectEffectiveThemeFromDom()==="dark"?"light":"dark";this.applyAppearanceMode(t,{persist:!0,showToast:!0,preferNative:!0}).catch(n=>{console.error("[ChatGPT Helper] \u4E3B\u9898\u5207\u6362\u5931\u8D25:",n,n&&n.stack),this.showToast(this.t("themeSwitchFailed"))})}catch(e){console.error("[ChatGPT Helper] \u4E3B\u9898\u5207\u6362\u5931\u8D25:",e,e.stack),this.showToast(this.t("themeSwitchFailed"))}},monitorTheme(){this.themeScope?.dispose();const r=this.themeScope=new Je,e=()=>{const n=this.detectEffectiveThemeFromDom();n!==this.currentEffectiveTheme&&(this.syncHelperThemeMode(n),this.syncNativeThemeScopes(n),this.settings.themeMode=n,this.updateThemeVisualState())};e();const t={attributes:!0,attributeFilter:["class","data-theme","style"]};r.observe(document.documentElement,t,e),r.observe(document.body,t,e),r.listen(window,"themechange",e),r.listen(document,"themechange",e)},showToast(r){const e=document.getElementById("chatgpt-helper-toast");e&&e.remove();const t=d("div",{id:"chatgpt-helper-toast",className:"chatgpt-helper-toast",role:"status","aria-live":"polite"},r);document.body.appendChild(t),setTimeout(()=>t.remove(),2e3)},bindEvents(){this.pageScope?.dispose();const r=this.pageScope=new Je;let e=location.pathname,t=this.adapter.getChatContainer();const n=()=>{const o=e!==location.pathname;e=location.pathname;const i=this.adapter.getChatContainer(),s=i!==t;t=i,this.adapter.findTextarea(),this.updateLayout(),this.queueThemeHostRefresh(),!(!o&&!s)&&(this.outlineIndex&&(this.outlineIndex.path!==e||this.outlineIndex.main!==i)&&(this.outlineIndex.controller.abort(),this.outlineIndex=null),this.messageSelectManager.refreshContext(),this.exporterController?.contextChanged(),this.scrollManager.cancel(),o&&(this.anchorManager?.reset(),this.savedAnchorTop=null,this.hideAnchorMarker(),this.updateManualAnchorButtons()),this.scrollLockManager?.clearCache(),this.scrollLockManager?.refreshContainerListener(),this.readingProgressManager?.stopRecording(),this.readingProgressManager?.startRecording(),this.currentTab==="outline"&&this.refreshOutline(),o&&e.includes("/c/")&&this.conversationManager&&r.schedule("sync-conversations",()=>this.conversationManager.syncConversations(),1500))},a=()=>r.schedule("host",n,120);r.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-shell-active-page"]},o=>{(e!==location.pathname||o.some(i=>i.type==="attributes"?!0:lr(i)?!1:!(i.target.nodeType===1?i.target:i.target.parentElement)?.closest("[data-message-author-role], [data-content-search-unit-key], [data-chatgpt-search-unit-key], [data-chatgpt-selection-message-id]")))&&a()}),r.listen(window,"popstate",a),window.navigation&&r.listen(window.navigation,"navigatesuccess",a),r.listen(window,"resize",a,{passive:!0})}},an="chatgpt-helper",Ho=1;function $o(r){return new Promise((e,t)=>{try{const n=new FileReader;n.onload=()=>{const a=String(n.result||""),o=a.indexOf(",");e(o>=0?a.slice(o+1):a)},n.onerror=()=>t(n.error||new Error("read blob failed")),n.readAsDataURL(r)}catch(n){t(n)}})}function Uo(r,e){const t=atob(String(r||"")),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return new Blob([n],{type:e||"application/octet-stream"})}function Go(){const r=new Date,e=t=>String(t).padStart(2,"0");return`${r.getFullYear()}${e(r.getMonth()+1)}${e(r.getDate())}-${e(r.getHours())}${e(r.getMinutes())}`}const jo={async collectBackupData(){const r={},e=window.GM_getValue(J.PROMPTS,null);r.prompts=Array.isArray(e)?e:this.prompts||[];const t=window.GM_getValue(J.SETTINGS,null);r.settings=t&&typeof t=="object"?t:typeof this.serializeSettingsForStorage=="function"?this.serializeSettingsForStorage():{},r.language=window.GM_getValue(J.LANGUAGE,"auto"),r.promptLibraryVersion=window.GM_getValue(J.PROMPT_LIBRARY_VERSION,null),r.conversations=window.GM_getValue(J.CONVERSATIONS,null),r.readingProgress=window.GM_getValue(J.READING_PROGRESS,null),r.themeAssets=[];try{if(this.themeAssetRepository&&typeof this.themeAssetRepository.getAllAssets=="function"){const n=await this.themeAssetRepository.getAllAssets();for(const a of n||[])!a||!a.blob||r.themeAssets.push({id:a.id,mimeType:a.mimeType,size:a.size,createdAt:a.createdAt,dataBase64:await $o(a.blob)})}}catch(n){console.warn("[ChatGPT Helper] \u5907\u4EFD\u4E3B\u9898\u58C1\u7EB8\u5931\u8D25:",n)}return r},async exportBackupData(){try{const r=await this.collectBackupData(),e={app:an,formatVersion:Ho,extensionVersion:Ve,exportedAt:new Date().toISOString(),data:r},t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(n),o=d("a",{href:a,download:`chatgpt-helper-backup-${Go()}.json`});document.body.appendChild(o),o.click(),setTimeout(()=>{o.remove(),URL.revokeObjectURL(a)},1e3),this.showToast(this.t("backupExportSuccess"))}catch(r){console.error("[ChatGPT Helper] \u5BFC\u51FA\u5907\u4EFD\u5931\u8D25:",r),this.showToast(this.t("operationFailed"))}},importBackupData(){try{const r=document.getElementById("gh-backup-import-input");r&&r.remove();const e=d("input",{id:"gh-backup-import-input",type:"file",accept:"application/json,.json"});e.style.display="none",document.body.appendChild(e),e.addEventListener("change",async()=>{const t=e.files&&e.files[0];if(e.remove(),!!t)try{const n=await t.text(),a=JSON.parse(n);if(!a||a.app!==an||!a.data||typeof a.data!="object"){this.showToast(this.t("backupInvalidFile"));return}if(!confirm(this.t("backupImportConfirm")))return;await this.applyBackupData(a.data)}catch(n){console.error("[ChatGPT Helper] \u5BFC\u5165\u5907\u4EFD\u5931\u8D25:",n),this.showToast(this.t("backupImportFailed"))}}),e.click()}catch(r){console.error("[ChatGPT Helper] \u6253\u5F00\u5907\u4EFD\u6587\u4EF6\u5931\u8D25:",r),this.showToast(this.t("operationFailed"))}},sanitizeBackupData(r){const e={};if(Array.isArray(r.prompts)&&(e.prompts=r.prompts.filter(t=>t&&typeof t=="object").map(t=>{const n={...t};return typeof n.title!="string"&&(n.title=String(n.title??"")),typeof n.content!="string"&&(n.content=String(n.content??"")),n.category!==void 0&&typeof n.category!="string"&&(n.category=String(n.category)),n}).slice(0,5e3)),r.settings&&typeof r.settings=="object"&&!Array.isArray(r.settings)){const t={};Object.keys(r.settings).forEach(n=>{n==="__proto__"||n==="constructor"||n==="prototype"||(t[n]=r.settings[n])}),Number.isFinite(Number(t.panelWidth))&&(t.panelWidth=Math.max(We,Math.min(ht,Number(t.panelWidth)))),e.settings=t}if(typeof r.language=="string"&&/^[a-z]{2}(-[A-Za-z0-9]{2,8})?$/.test(r.language)&&(e.language=r.language),r.conversations&&typeof r.conversations=="object"&&!Array.isArray(r.conversations)&&r.conversations.conversations&&typeof r.conversations.conversations=="object"){const t={...r.conversations,conversations:{}};Object.entries(r.conversations.conversations).forEach(([n,a])=>{!a||typeof a!="object"||n==="__proto__"||n==="constructor"||n==="prototype"||(t.conversations[n]=a)}),e.conversations=t}if(r.readingProgress&&typeof r.readingProgress=="object"&&!Array.isArray(r.readingProgress)){const t={};Object.keys(r.readingProgress).forEach(n=>{if(n==="__proto__"||n==="constructor"||n==="prototype")return;const a=r.readingProgress[n];a&&typeof a=="object"&&(t[n]=a)}),e.readingProgress=t}return r.promptLibraryVersion!=null&&Number.isFinite(Number(r.promptLibraryVersion))&&(e.promptLibraryVersion=Number(r.promptLibraryVersion)),e},async applyBackupData(r){const e=this.sanitizeBackupData(r);e.prompts&&window.GM_setValue(J.PROMPTS,e.prompts),e.settings&&window.GM_setValue(J.SETTINGS,e.settings),e.language&&window.GM_setValue(J.LANGUAGE,e.language),e.conversations&&window.GM_setValue(J.CONVERSATIONS,e.conversations),e.readingProgress&&window.GM_setValue(J.READING_PROGRESS,e.readingProgress),e.promptLibraryVersion!=null&&window.GM_setValue(J.PROMPT_LIBRARY_VERSION,e.promptLibraryVersion);let t=0;if(Array.isArray(r.themeAssets)&&r.themeAssets.length>0)try{this.themeAssetRepository||(this.themeAssetRepository=new Et);for(const i of r.themeAssets){if(!i||!i.id||!i.dataBase64||!/^[A-Za-z0-9+/=\s]+$/.test(String(i.dataBase64)))continue;const s=Uo(i.dataBase64,i.mimeType);await this.themeAssetRepository.putAsset(s,i.mimeType,i.id),t++}}catch(i){console.warn("[ChatGPT Helper] \u6062\u590D\u4E3B\u9898\u58C1\u7EB8\u5931\u8D25:",i)}const n=Array.isArray(e.prompts)?e.prompts.length:0,a=e.conversations&&e.conversations.conversations?Object.keys(e.conversations.conversations||{}).length:0,o=(this.t("backupIncludeHint")||"").replace("{prompts}",String(n)).replace("{conversations}",String(a)).replace("{assets}",String(t));this.showToast(`${this.t("backupImportSuccess")} \xB7 ${o}`),setTimeout(()=>{try{window.location.reload()}catch(i){console.error("[ChatGPT Helper] \u5237\u65B0\u9875\u9762\u5931\u8D25:",i)}},2500)}},Vo=`.gh-tour {
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
`,ye=["prompts","outline","organize","panel","appearance"],Me="chatgpt-helper-onboarding";class Qo{constructor(e,t="welcome"){this.app=e,this.scope=new Je,this.step=ye.includes(t)?t:"welcome",this.initial={tab:e.currentTab,collapsed:e.isCollapsed,focus:document.activeElement,focusText:document.activeElement?.textContent?.trim()},this.closed=!1,this.installStyles(),document.getElementById(`${Me}-overlay`)?.remove(),this.root=d("div",{id:`${Me}-overlay`,className:"gh-tour"}),this.shade=d("div",{className:"gh-tour-shade","aria-hidden":"true"}),this.spotlight=d("div",{className:"gh-tour-spotlight","aria-hidden":"true"}),this.card=d("section",{className:"gh-tour-card",role:"dialog","aria-labelledby":`${Me}-title`,"aria-describedby":`${Me}-body`}),this.root.append(this.shade,this.spotlight,this.card),document.body.appendChild(this.root);const n=()=>this.scope.schedule("position",()=>this.position(),32);this.scope.listen(window,"resize",n,{passive:!0}),this.scope.listen(document,"scroll",n,{capture:!0,passive:!0}),this.scope.listen(document,"keydown",a=>this.onKeyDown(a),!0),e.panel&&this.scope.observe(e.panel,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]},n),this.resizeObserver=new ResizeObserver(n),this.resizeObserver.observe(this.card),e.panel&&this.resizeObserver.observe(e.panel),this.show(this.step)}t(e){return this.app.t(e)}installStyles(){if(document.getElementById(`${Me}-styles`))return;const e=d("style",{id:`${Me}-styles`});e.textContent=Vo,document.head.appendChild(e)}button(e,t,n,a="gh-tour-button"){const o=d("button",{type:"button",className:a,"data-tour-action":t},e);return o.addEventListener("click",n),o}ensurePanelOpen(){this.app.isCollapsed&&this.app.toggleCollapse({persist:!1})}openTab(e){return this.app.panel?.querySelector(`#${e}-tab`)?(this.ensurePanelOpen(),this.app.currentTab!==e&&this.app.switchTab(e),!0):!1}show(e){this.closed||(this.step=e,e!=="welcome"&&this.ensurePanelOpen(),(e==="prompts"||e==="outline")&&this.openTab(e),this.root.dataset.tourStep=e,this.root.classList.toggle("gh-tour-welcome",e==="welcome"),this.render(),this.position(),this.card.querySelector("h2").focus({preventScroll:!0}),this.store("in-progress"))}render(){this.card.replaceChildren();const e=d("div",{className:"gh-tour-header"}),t=d("div",{className:"gh-tour-brand"});t.append(Re({size:21,title:"ChatGPT Helper"}),d("span",{},"ChatGPT Helper")),e.append(t,this.button(this.t("onboardingSkip"),"skip",()=>this.finish("skipped"),"gh-tour-skip")),this.card.appendChild(e);const n=ye.indexOf(this.step),a=this.step==="welcome"?this.t("onboardingDuration"):`${this.t("onboardingGuide")} \xB7 ${n+1} / ${ye.length}`;this.card.appendChild(d("p",{className:"gh-tour-eyebrow"},a));const o=this.step==="welcome"?"onboardingTitle":`tour_${this.step}_title`;this.card.appendChild(d("h2",{id:`${Me}-title`,tabindex:-1},this.t(o)));let i=this.t(this.step==="welcome"?"onboardingSubtitle":`tour_${this.step}_body`);if(this.step==="outline"&&!this.app.adapter.getChatMessages().length&&(i=this.t("tour_outline_empty")),this.card.appendChild(d("p",{className:"gh-tour-body",id:`${Me}-body`},i)),this.step==="welcome"){const c=d("div",{className:"gh-tour-summary"});for(const u of["tour_prompts_label","tour_outline_label","tour_appearance_label"])c.appendChild(d("span",{},this.t(u)));this.card.appendChild(c)}const s=d("div",{className:"gh-tour-actions"});if(this.step==="prompts"){s.appendChild(d("kbd",{},"//"));const c=this.button(this.t("tour_focus_composer"),"composer",()=>{this.app.adapter.findTextarea(),this.app.adapter.textarea?.focus({preventScroll:!0})});this.app.adapter.findTextarea(),c.disabled=!this.app.adapter.textarea,s.appendChild(c)}else if(this.step==="organize")for(const c of["conversations","export"]){const u=this.button(this.t(`tour_open_${c}`),c,()=>{this.openTab(c),this.position()});u.disabled=!this.app.panel?.querySelector(`#${c}-tab`),s.appendChild(u)}else this.step==="panel"?(s.appendChild(d("kbd",{},"Alt+Shift+H")),s.appendChild(this.button(this.t(this.app.isCollapsed?"tour_expand_panel":"tour_collapse_panel"),"panel",()=>{this.app.toggleCollapse({persist:!1}),this.render(),this.position(),this.card.querySelector('[data-tour-action="panel"]').focus({preventScroll:!0})}))):this.step==="appearance"&&s.appendChild(this.button(this.t("tour_open_theme"),"theme",()=>{this.finish("completed"),this.app.openThemeSettingsModal(this.app.panel?.querySelector("#chatgpt-helper-settings-btn"))}));s.childNodes.length&&this.card.appendChild(s),this.missing=d("p",{className:"gh-tour-missing",hidden:!0},this.t("tour_target_missing")),this.card.appendChild(this.missing);const l=d("nav",{className:"gh-tour-progress","aria-label":this.t("onboardingGuide")});ye.forEach((c,u)=>{const g=d("button",{type:"button","data-tour-go":c,"aria-label":`${u+1}. ${this.t(`tour_${c}_label`)}`,title:this.t(`tour_${c}_label`),className:u===n?"active":u<n?"visited":""},`${u+1}`);u===n&&g.setAttribute("aria-current","step"),g.addEventListener("click",()=>this.show(c)),l.appendChild(g)}),this.card.appendChild(l);const h=d("div",{className:"gh-tour-footer"}),p=this.button(this.t("onboardingPrevious"),"prev",()=>this.move(-1),"gh-tour-back");p.hidden=this.step==="welcome",h.appendChild(p),this.step==="welcome"?h.appendChild(this.button(this.t("onboardingStart"),"start",()=>this.show(ye[0]),"gh-tour-primary")):n===ye.length-1?h.appendChild(this.button(this.t("onboardingFinish"),"finish",()=>this.finish("completed"),"gh-tour-primary")):h.appendChild(this.button(this.t("onboardingNext"),"next",()=>this.move(1),"gh-tour-primary")),this.card.appendChild(h)}move(e){const t=ye.indexOf(this.step)+e;t<0?this.show("welcome"):t<ye.length&&this.show(ye[t])}target(){const e=this.app.panel;return e?this.step==="prompts"||this.step==="outline"?e.querySelector(`#${this.step}-content.active`):this.step==="organize"?e.querySelector("#chatgpt-helper-tabs"):this.step==="panel"?this.app.isCollapsed?document.getElementById("quick-btn-panel"):e.querySelector("#chatgpt-helper-resize-handle"):this.step==="appearance"?e.querySelector("#chatgpt-helper-settings-btn"):null:null}position(){if(this.closed)return;const e=window.innerWidth,t=window.innerHeight,a=this.target()?.getBoundingClientRect(),o=a&&a.width>0&&a.height>0&&a.right>0&&a.left<e;if(this.missing.hidden=this.step==="welcome"||!!o,this.root.classList.toggle("gh-tour-no-target",!o),this.spotlight.hidden=!o,o){const h=Math.max(2,a.left-5),p=Math.max(2,a.top-5);Object.assign(this.spotlight.style,{left:`${h}px`,top:`${p}px`,width:`${Math.max(0,Math.min(e-2,a.right+5)-h)}px`,height:`${Math.max(0,Math.min(t-2,a.bottom+5)-p)}px`})}const i=this.card.getBoundingClientRect();let s=(e-i.width)/2,l=(t-i.height)/2;this.step!=="welcome"&&e<=760?l=t-i.height-12:o&&(a.left>=i.width+28?s=a.left-i.width-18:e-a.right>=i.width+28&&(s=a.right+18),l=a.top+Math.min(a.height,t)/2-i.height/2),this.card.style.left=`${Math.max(12,Math.min(e-i.width-12,s))}px`,this.card.style.top=`${Math.max(12,Math.min(t-i.height-12,l))}px`}onKeyDown(e){e.key==="Escape"?(e.preventDefault(),e.stopImmediatePropagation(),this.finish("skipped")):this.card.contains(e.target)&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&(e.key==="ArrowRight"&&this.step!==ye.at(-1)&&(e.preventDefault(),this.move(1)),e.key==="ArrowLeft"&&this.step!=="welcome"&&(e.preventDefault(),this.move(-1)))}store(e){try{window.GM_setValue(J.ONBOARDING_DONE,{schemaVersion:1,status:e,step:this.step,updatedAt:new Date().toISOString()})}catch(t){console.warn("[ChatGPT Helper] \u4FDD\u5B58\u5F15\u5BFC\u8FDB\u5EA6\u5931\u8D25:",t)}}finish(e){this.closed||(this.store(e),this.destroy({restore:e!=="completed"}),e==="completed"&&!this.app.destroyed&&(this.ensurePanelOpen(),this.openTab(this.app.panel?.querySelector("#prompts-tab")?"prompts":this.app.getTabOrder()[0]),this.app.panel?.querySelector(".chatgpt-helper-tab.active")?.focus({preventScroll:!0})))}destroy({restore:e=!0}={}){if(this.closed||(this.closed=!0,this.scope.dispose(),this.resizeObserver.disconnect(),this.root.remove(),this.app.onboardingTour===this&&(this.app.onboardingTour=null),!e||this.app.destroyed))return;const t=this.app.panel?.querySelector(`#${this.initial.tab}-content`)?this.initial.tab:this.app.getTabOrder()[0];this.app.currentTab!==t&&this.app.switchTab(t),this.app.isCollapsed!==this.initial.collapsed&&this.app.toggleCollapse({persist:!1});const n=this.initial.focus,a=Array.from(this.app.panel?.querySelectorAll("button")||[]).find(i=>i.textContent.trim()===this.initial.focusText),o=n?.isConnected?n:a||this.app.panel?.querySelector("#chatgpt-helper-settings-btn");this.initial.collapsed?document.getElementById("quick-btn-panel")?.focus({preventScroll:!0}):o?.focus({preventScroll:!0})}}const Wo={maybeShowOnboarding({force:r=!1}={}){const e=window.GM_getValue(J.ONBOARDING_DONE,null);if(!(!r&&e&&e.status!=="in-progress")){if(this.onboardingTour&&!this.onboardingTour.closed){this.onboardingTour.card.querySelector("h2")?.focus({preventScroll:!0});return}this.onboardingTour=new Qo(this,r?"welcome":e?.step)}},showOnboardingOverlay(){this.maybeShowOnboarding({force:!0})}};class Gt extends Mn{}Object.assign(Gt.prototype,Nn,_n,Rn,zn,Fn,On,Dn,Do,qo,jo,Wo);const Yo=Object.freeze(Object.defineProperty({__proto__:null,AUTHOR_GITHUB_URL:er,AnchorManager:dr,COLLAPSED_BUTTON_DEFS:Pe,ChatGPTAdapter:Tr,ChatGPTClient:Bt,ChatGPTHelper:Gt,ConversationManager:hr,CopyManager:kr,DEFAULT_COLLAPSED_BUTTONS_ORDER:Ge,DEFAULT_PROMPTS:ln,DEFAULT_SETTINGS:lt,DEFAULT_THEME_CONFIG:ce,EXTENSION_AUTHOR:rr,EXTENSION_LICENSE:nr,EXTENSION_NAME:tr,EXTENSION_VERSION:Ve,FEATURE_REQUEST_URL:sn,HistoryLoader:pr,I18N:$e,ISSUE_URL:Jt,MessageSelectManager:Cr,OutlineManager:mr,PANEL_WIDTH_MAX:ht,PANEL_WIDTH_MIN:We,PROMPT_VARIABLE_PATTERN:ot,PromptQuickMenu:xr,REPO_URL:Zt,ReadingProgressManager:gr,SETTING_KEYS:J,SVG_ICON_DEFS:kt,ScrollLockManager:Lt,ScrollManager:cr,TAB_DEFINITIONS:xt,THEME_BACKGROUND_ALLOWED_TYPES:Xt,THEME_BACKGROUND_DB_NAME:Wt,THEME_BACKGROUND_DB_VERSION:Yt,THEME_BACKGROUND_MAX_SIZE:Kt,THEME_BACKGROUND_STORE:je,THEME_HOST_ATTRS:yt,THEME_PRESETS:vt,THEME_PRESET_INLINE_VAR_KEYS:on,THEME_PRESET_MAP:st,TabRenameManager:Sr,ThemeAssetRepository:Et,WidthStyleManager:ur,blendRgbColors:B,buildLinearGradient:ie,buildThemeSurfaceVars:St,clampNumber:Z,clearElement:he,copyTextToClipboard:wt,createCollapsedButtonIconNode:Ct,createDefaultPrompts:Qe,createElement:d,createHelperLogoNode:Re,createSvgIconNode:j,createThemeAssetId:sr,detectLanguage:Ue,extractPromptVariables:ft,getCurrentLang:Xe,getExtensionAssetUrl:ar,getExtensionManifestMeta:or,getExtensionRuntime:_e,getThemePresetByKey:ke,hexToRgb:pt,normalizeHexColor:ir,normalizeThemeConfig:Tt,openExternalLink:Ye,parseQuickMenuTrigger:fr,readingLine:Mt,renderPromptVariables:Qt,rgbaFromColor:_,sanitizeConversationUrl:ct,setButtonIcon:ue,setCurrentLang:At,t:re,withProductivitySurfaceVars:Ke},Symbol.toStringTag,{value:"Module"})),et=window.__MY_EXT__=window.__MY_EXT__||{};if(et.helper={...Yo},!window.chatgptHelperInitialized){window.chatgptHelperInitialized=!0;const r=document.readyState==="loading"?new Promise(t=>document.addEventListener("DOMContentLoaded",t,{once:!0})):Promise.resolve(),e=et.storageCacheInitialized?Promise.resolve():new Promise(t=>{window.addEventListener("ch-helper-storage-ready",t,{once:!0})});Promise.all([r,e]).then(async()=>{const t=new Gt,n={buildId:at,dispose:()=>t.destroy()};et.application=n;try{await t.ready}catch(a){throw n.dispose(),et.application===n&&delete et.application,a}}).catch(t=>{window.chatgptHelperInitialized=!1,console.error("[ChatGPT Helper] \u542F\u52A8\u5931\u8D25:",t)})}})();
