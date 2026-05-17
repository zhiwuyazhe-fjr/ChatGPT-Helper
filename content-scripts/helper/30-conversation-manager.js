// Chrome Extension Content Script - ChatGPT Helper Conversation Manager
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

    // ==================== 会话管理器 ====================
    class ConversationManager {
        constructor(config) {
            this.container = config.container;
            this.settings = config.settings;
            this.adapter = config.adapter;
            this.t = config.i18n || ((k) => k);
            this.data = this.loadData();
            this.searchQuery = '';
            this.filterPinned = false;
            this.filterTagIds = new Set();
            this.expandedFolderId = null;
            this.selectedIds = new Set();
            this.batchMode = false;
            this.autoSyncInterval = null;
            this.lastSyncTime = 0; // 记录上次同步时间
            // 启动自动同步（每5分钟同步一次）
            this.startAutoSync();
        }

        loadData() {
            // 确保从缓存中读取数据
            let saved = null;
            
            // 首先检查缓存是否已初始化
            if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized && window.__MY_EXT__.storageCache) {
                // 缓存已初始化，直接从缓存读取
                const cacheKeys = Object.keys(window.__MY_EXT__.storageCache || {});
                console.log('[ChatGPT Helper] 缓存已初始化，缓存中的键:', cacheKeys);
                saved = window.__MY_EXT__.storageCache['chatgpt_conversations'];
                console.log('[ChatGPT Helper] 从已初始化的缓存读取数据:', saved !== undefined && saved !== null ? '找到数据' : '未找到数据');
                if (saved !== undefined && saved !== null) {
                    console.log('[ChatGPT Helper] 缓存中的数据类型:', typeof saved, Array.isArray(saved) ? '(数组)' : '(对象)');
                }
            } else if (window.__MY_EXT__ && window.__MY_EXT__.storageCache) {
                // 缓存存在但可能未完全初始化，尝试读取
                saved = window.__MY_EXT__.storageCache['chatgpt_conversations'];
                console.log('[ChatGPT Helper] 从缓存读取数据（缓存可能未完全初始化）');
            }
            
            // 如果缓存中没有，使用 GM_getValue（会触发缓存更新）
            if (saved === undefined || saved === null) {
                saved = window.GM_getValue('chatgpt_conversations', null);
                console.log('[ChatGPT Helper] 使用 GM_getValue 读取数据:', saved ? '找到数据' : '未找到数据');
                if (saved) {
                    console.log('[ChatGPT Helper] GM_getValue 返回的数据类型:', typeof saved);
                }
            }
            
            if (saved && typeof saved === 'object') {
                const conversationCount = Object.keys(saved.conversations || {}).length;
                console.log('[ChatGPT Helper] 加载会话数据:', conversationCount, '个会话');
                console.log('[ChatGPT Helper] 会话数据结构:', {
                    folders: saved.folders?.length || 0,
                    tags: saved.tags?.length || 0,
                    conversations: conversationCount,
                    lastUsedFolderId: saved.lastUsedFolderId
                });
                return saved;
            }
            console.log('[ChatGPT Helper] 使用默认会话数据结构（未找到保存的数据）');
            // 尝试直接从 Chrome storage 读取（异步方式，用于调试）
            if (window.__MY_EXT__ && window.__MY_EXT__.GM && window.__MY_EXT__.GM.getValue) {
                window.__MY_EXT__.GM.getValue('chatgpt_conversations', null).then((asyncValue) => {
                    if (asyncValue && typeof asyncValue === 'object') {
                        const asyncCount = Object.keys(asyncValue.conversations || {}).length;
                        console.log('[ChatGPT Helper] 异步读取发现数据:', asyncCount, '个会话');
                        if (asyncCount > 0) {
                            console.warn('[ChatGPT Helper] 警告：异步读取发现数据，但同步读取未找到。可能需要等待缓存初始化。');
                        }
                    }
                }).catch((err) => {
                    console.error('[ChatGPT Helper] 异步读取错误:', err);
                });
            }
            return {
                folders: [{ id: 'inbox', name: '📥 收件箱', icon: '📥', isDefault: true }],
                tags: [],
                conversations: {},
                lastUsedFolderId: 'inbox',
            };
        }
        
        // 重新加载数据（用于缓存初始化后）
        reloadData() {
            const oldCount = Object.keys(this.data.conversations || {}).length;
            this.data = this.loadData();
            const newCount = Object.keys(this.data.conversations || {}).length;
            if (newCount !== oldCount) {
                console.log('[ChatGPT Helper] 数据已重新加载，会话数量从', oldCount, '变为', newCount);
                // 如果 UI 已创建，需要重新渲染
                if (this.container && this.container.children.length > 0) {
                    this.createUI();
                }
            }
        }

        saveData() {
            window.GM_setValue('chatgpt_conversations', this.data);
        }

        startAutoSync() {
            // 清除旧的定时器
            if (this.autoSyncInterval) {
                clearInterval(this.autoSyncInterval);
            }
            // 每5分钟自动同步一次
            this.autoSyncInterval = setInterval(() => {
                this.syncConversations();
            }, 5 * 60 * 1000); // 5分钟
        }

        stopAutoSync() {
            if (this.autoSyncInterval) {
                clearInterval(this.autoSyncInterval);
                this.autoSyncInterval = null;
            }
        }

        createUI() {
            // 在创建 UI 前，如果缓存已初始化，重新加载数据
            if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
                const oldCount = Object.keys(this.data.conversations || {}).length;
                this.data = this.loadData();
                const newCount = Object.keys(this.data.conversations || {}).length;
                if (newCount !== oldCount) {
                    console.log('[ChatGPT Helper] 在 createUI 时重新加载数据，会话数量从', oldCount, '变为', newCount);
                }
            } else {
                // 如果缓存还未初始化，等待初始化后重新加载（但不重新调用 createUI，避免递归）
                const checkCache = (retries = 50) => {
                    if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
                        const oldCount = Object.keys(this.data.conversations || {}).length;
                        this.data = this.loadData();
                        const newCount = Object.keys(this.data.conversations || {}).length;
                        if (newCount !== oldCount) {
                            console.log('[ChatGPT Helper] 缓存初始化后重新加载数据，会话数量从', oldCount, '变为', newCount);
                            // 只更新数据，不重新调用 createUI（避免递归）
                            // UI 会在下次切换标签页时自动更新
                        }
                    } else if (retries > 0) {
                        setTimeout(() => checkCache(retries - 1), 100);
                    }
                };
                checkCache();
            }
            
            clearElement(this.container);
            
            // 如果距离上次同步已经超过1分钟，自动同步一次
            const now = Date.now();
            if (now - this.lastSyncTime > 60 * 1000) {
                // 延迟执行，避免阻塞UI渲染
                setTimeout(() => {
                    this.syncConversations();
                }, 500);
            }

            // 工具栏
            const toolbar = createElement('div', {
                className: 'chatgpt-helper-conversations-toolbar',
                style: {
                    padding: '10px 12px',
                    borderBottom: '1px solid var(--gh-border)',
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                    flexShrink: 0
                }
            });

            // 文件夹选择
            const folderSelect = createElement('select', {
                className: 'chatgpt-helper-folder-select'
            });
            this.data.folders.forEach(folder => {
                const option = createElement('option', { value: folder.id }, folder.name);
                if (folder.id === this.data.lastUsedFolderId) option.selected = true;
                folderSelect.appendChild(option);
            });
            folderSelect.addEventListener('change', () => {
                this.data.lastUsedFolderId = folderSelect.value;
                this.saveData();
                this.renderConversationList();
            });
            toolbar.appendChild(folderSelect);

            // 同步按钮
            const syncBtn = createElement('button', {
                className: 'chatgpt-helper-conversations-toolbar-btn sync',
                title: this.t('syncConversations') || '同步会话'
            }, '🔄');
            syncBtn.addEventListener('click', () => this.syncConversations());
            toolbar.appendChild(syncBtn);

            // 新建文件夹按钮
            const addFolderBtn = createElement('button', {
                className: 'chatgpt-helper-conversations-toolbar-btn add-folder',
                title: this.t('newFolder') || '新建文件夹'
            }, '📁');
            addFolderBtn.addEventListener('click', () => this.showCreateFolderDialog());
            toolbar.appendChild(addFolderBtn);

            // 批量操作按钮
            const batchBtn = createElement('button', {
                className: 'chatgpt-helper-conversations-toolbar-btn batch-mode' + (this.batchMode ? ' active' : ''),
                title: this.t('batchMode') || '批量操作'
            }, this.batchMode ? '✓' : '☑');
            batchBtn.addEventListener('click', () => {
                this.batchMode = !this.batchMode;
                if (!this.batchMode) {
                    this.selectedIds.clear();
                }
                this.createUI();
            });
            toolbar.appendChild(batchBtn);

            // 批量操作工具栏（仅在批量模式下显示）
            if (this.batchMode) {
                this.batchToolbar = createElement('div', {
                    className: 'chatgpt-helper-batch-toolbar'
                });
                this.batchToolbar.appendChild(createElement('span', {
                    style: { color: 'var(--gh-text)', fontWeight: '500' }
                }, `${this.t('selected') || '已选择'} ${this.selectedIds.size} ${this.t('items') || '项'}`));

                const moveBtn = createElement('button', {
                    className: 'chatgpt-helper-batch-toolbar-btn'
                }, `📁 ${this.t('move') || '移动'}`);
                moveBtn.addEventListener('click', () => this.batchMove());
                this.batchToolbar.appendChild(moveBtn);

                const deleteBtn = createElement('button', {
                    className: 'chatgpt-helper-batch-toolbar-btn danger'
                }, '🗑 ' + (this.t('delete') || '删除'));
                deleteBtn.addEventListener('click', () => this.batchDelete());
                this.batchToolbar.appendChild(deleteBtn);

                this.container.appendChild(this.batchToolbar);
            }

            this.container.appendChild(toolbar);

            // 搜索栏
            const searchBar = createElement('div', {
                className: 'chatgpt-helper-conversations-search'
            });
            const searchInput = createElement('input', {
                className: 'chatgpt-helper-conversations-search-input',
                type: 'text',
                placeholder: this.t('searchConversations') || '搜索会话...',
                value: this.searchQuery
            });
            let searchTimeout = null;
            searchInput.addEventListener('input', () => {
                this.searchQuery = searchInput.value.trim();
                if (searchTimeout) clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => this.renderConversationList(), 150);
            });
            searchBar.appendChild(searchInput);
            this.container.appendChild(searchBar);

            // 会话列表容器
            const listContainer = createElement('div', {
                className: 'chatgpt-helper-conversations-root',
                style: {
                    flex: 1,
                    overflowY: 'auto',
                    padding: '8px'
                }
            });
            this.container.appendChild(listContainer);
            this.listContainer = listContainer;

            this.renderConversationList();
        }

        renderConversationList() {
            if (!this.listContainer) return;
            clearElement(this.listContainer);

            // 使用文件夹展开/折叠模式（手风琴）
            const folders = this.data.folders || [];
            // 先计算“可见文件夹”，再渲染（便于在收件箱和其他文件夹之间插入分割线）
            const visibleEntries = [];
            folders.forEach((folder, index) => {
                let conversations = Object.values(this.data.conversations || {})
                    .filter(c => c.folderId === folder.id);

                if (this.searchQuery) {
                    const query = this.searchQuery.toLowerCase();
                    conversations = conversations.filter(c =>
                        c.title && c.title.toLowerCase().includes(query)
                    );
                }

                if (this.filterPinned) {
                    conversations = conversations.filter(c => c.pinned);
                }

                // 如果搜索模式下没有匹配的会话，跳过该文件夹
                if (this.searchQuery && conversations.length === 0) return;

                visibleEntries.push({ folder, index, conversations });
            });

            if (visibleEntries.length === 0) {
                this.listContainer.appendChild(createElement('div', {
                    className: 'chatgpt-helper-conversations-empty'
                }, this.searchQuery ? '未找到匹配结果' : '暂无会话'));
                return;
            }

            visibleEntries.forEach((entry, visibleIndex) => {
                const { folder, index, conversations } = entry;

                // 创建文件夹项
                const folderItem = this.createFolderItem(folder, index, conversations.length);
                this.listContainer.appendChild(folderItem);

                // 判断是否应该展开
                const shouldExpand = this.expandedFolderId === folder.id;

                // 会话列表容器
                const conversationList = createElement('div', {
                    className: 'chatgpt-helper-conversations-list',
                    'data-folder-id': folder.id,
                    style: shouldExpand ? 'display: block;' : 'display: none;'
                });

                // 绑定展开逻辑
                folderItem.addEventListener('click', (e) => {
                    if (e.target.closest('button')) return; // 避免点击按钮触发

                    // 折叠其他文件夹（手风琴模式）
                    this.listContainer.querySelectorAll('.chatgpt-helper-folder-item.expanded').forEach((el) => {
                        if (el !== folderItem) {
                            el.classList.remove('expanded');
                            const otherList = this.listContainer.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${el.dataset.folderId}"]`);
                            if (otherList) {
                                otherList.style.display = 'none';
                            }
                            // 更新箭头
                            const otherArrow = el.querySelector('.chatgpt-helper-folder-arrow');
                            if (otherArrow) {
                                otherArrow.style.transform = 'rotate(0deg)';
                            }
                        }
                    });

                    const isExpanded = folderItem.classList.toggle('expanded');
                    this.expandedFolderId = isExpanded ? folder.id : null;

                    // 更新箭头
                    const arrow = folderItem.querySelector('.chatgpt-helper-folder-arrow');
                    if (arrow) {
                        arrow.style.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
                    }

                    if (isExpanded) {
                        this.renderConversationsInFolder(folder.id, conversationList);
                        conversationList.style.display = 'block';
                    } else {
                        conversationList.style.display = 'none';
                    }
                });

                if (shouldExpand) {
                    folderItem.classList.add('expanded');
                    this.renderConversationsInFolder(folder.id, conversationList);
                }

                this.listContainer.appendChild(conversationList);

                // 在“收件箱”和“其他文件夹”之间画一条细线分割（仅当收件箱后面确实还有其他文件夹）
                if (folder.id === 'inbox') {
                    const hasNonInboxAfter = visibleEntries.slice(visibleIndex + 1).some(e => e.folder && e.folder.id !== 'inbox');
                    if (hasNonInboxAfter) {
                        this.listContainer.appendChild(createElement('div', {
                            className: 'chatgpt-helper-folder-divider'
                        }));
                    }
                }
            });
        }

        createFolderItem(folder, index, count) {
            // 文件夹样式
            const item = createElement('div', {
                className: 'chatgpt-helper-folder-item' + (folder.isDefault ? ' default' : ''),
                'data-folder-id': folder.id
            });

            const info = createElement('div', {
                className: 'chatgpt-helper-folder-info'
            });

            const icon = createElement('span', {
                className: 'chatgpt-helper-folder-icon'
            }, folder.icon || '📁');
            info.appendChild(icon);

            const name = createElement('span', {
                className: 'chatgpt-helper-folder-name'
            }, folder.name.replace(folder.icon || '', '').trim() || (folder.id === 'inbox' ? '收件箱' : folder.name));
            info.appendChild(name);

            const countSpan = createElement('span', {
                className: 'chatgpt-helper-folder-count'
            }, `(${count})`);
            info.appendChild(countSpan);

            item.appendChild(info);

            // 右侧操作区（删除 + 展开箭头）
            const actions = createElement('div', {
                className: 'chatgpt-helper-folder-actions'
            });

            // 删除文件夹按钮（默认文件夹不允许删除）
            if (!folder.isDefault && folder.id !== 'inbox') {
                const deleteBtn = createElement('button', {
                    className: 'chatgpt-helper-folder-delete-btn',
                    title: this.t('deleteFolder') || '删除文件夹'
                }, '🗑');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteFolder(folder.id);
                });
                actions.appendChild(deleteBtn);
            }

            // 展开/折叠箭头
            const arrow = createElement('span', {
                className: 'chatgpt-helper-folder-arrow',
                style: {
                    transform: this.expandedFolderId === folder.id ? 'rotate(90deg)' : 'rotate(0deg)'
                }
            }, '▸');
            actions.appendChild(arrow);

            item.appendChild(actions);

            return item;
        }

        renderConversationsInFolder(folderId, container) {
            clearElement(container);

            let conversations = Object.values(this.data.conversations)
                .filter(c => c.folderId === folderId);

            // 搜索过滤
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                conversations = conversations.filter(c =>
                    c.title && c.title.toLowerCase().includes(query)
                );
            }

            // 置顶过滤
            if (this.filterPinned) {
                conversations = conversations.filter(c => c.pinned);
            }

            if (conversations.length === 0) {
                container.appendChild(createElement('div', {
                    className: 'chatgpt-helper-conversations-empty'
                }, this.t('noConversations') || '该文件夹暂无会话'));
                return;
            }

            // 排序：置顶的在前，然后按更新时间
            conversations.sort((a, b) => {
                if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
                return (b.updatedAt || 0) - (a.updatedAt || 0);
            });

            // 将会话渲染到当前文件夹对应的列表容器中，而不是整个 listContainer 底部
            conversations.forEach(conv => {
                const item = createElement('div', {
                    className: 'chatgpt-helper-conversation-item' + (conv.pinned ? ' pinned' : ''),
                    'data-conv-id': conv.id
                });

                // 批量选择复选框
                if (this.batchMode) {
                    const checkbox = createElement('input', {
                        type: 'checkbox',
                        checked: this.selectedIds.has(conv.id),
                        style: {
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            width: '18px',
                            height: '18px'
                        }
                    });
                    checkbox.addEventListener('click', (e) => {
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

                // 置顶图标
                if (conv.pinned) {
                    const pinIcon = createElement('span', {
                        className: 'chatgpt-helper-conversation-pin',
                        style: {
                            position: 'absolute',
                            top: '8px',
                            right: '8px'
                        }
                    });
                    pinIcon.appendChild(createSvgIconNode('pin', { size: 13 }));
                    item.appendChild(pinIcon);
                }

                const title = createElement('div', {
                    style: {
                        fontWeight: '500',
                        color: 'var(--gh-text)',
                        marginBottom: '4px',
                        fontSize: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingRight: conv.pinned ? '20px' : '0',
                        paddingLeft: this.batchMode ? '30px' : '0'
                    }
                }, conv.title || '未命名对话');
                item.appendChild(title);

                // 标签显示
                if (conv.tagIds && conv.tagIds.length > 0 && this.data.tags) {
                    const tagsContainer = createElement('div', {
                        className: 'chatgpt-helper-conversation-tags'
                    });
                    conv.tagIds.forEach(tagId => {
                        const tag = this.data.tags.find(t => t.id === tagId);
                        if (tag) {
                            const tagEl = createElement('span', {
                                className: 'chatgpt-helper-conversation-tag'
                            }, tag.name);
                            tagEl.style.setProperty('--gh-tag-color', tag.color || 'var(--gh-primary)');
                            tagsContainer.appendChild(tagEl);
                        }
                    });
                    item.appendChild(tagsContainer);
                }

                const time = createElement('div', {
                    style: {
                        fontSize: '12px',
                        color: 'var(--gh-text-secondary)',
                        marginTop: '4px'
                    }
                }, this.formatTime(conv.updatedAt));

                item.appendChild(time);

                // 右键菜单
                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.showContextMenu(e, conv);
                });

                item.addEventListener('click', (e) => {
                    if (this.batchMode && e.target.type !== 'checkbox') {
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

                // 关键修复：追加到当前文件夹的会话列表容器中
                container.appendChild(item);
            });
        }

        syncConversations() {
            // 使用适配器的 getConversationList 方法
            const conversations = this.adapter.getConversationList();

            if (!conversations || conversations.length === 0) {
                this.showToast(this.t('noConversations') || '未找到会话，请先打开侧边栏');
                return;
            }
            
            // 更新同步时间
            this.lastSyncTime = Date.now();

            let newCount = 0;
            let updatedCount = 0;
            const folderId = this.data.lastUsedFolderId || 'inbox';

            conversations.forEach(item => {
                const id = item.id;
                const title = item.title;
                const url = item.url;
                const isPinned = item.isPinned || false;
                // 使用会话的实际更新时间，而不是当前时间
                // 如果从DOM中提取到了更新时间，使用它；否则保留本地已有的更新时间，避免使用同步时间
                const remoteUpdatedAt = item.updatedAt || item.createdAt;
                const localConversation = this.data.conversations[id];
                const actualUpdatedAt = remoteUpdatedAt || (localConversation?.updatedAt) || (localConversation?.createdAt) || Date.now();

                if (!localConversation) {
                    // 新会话：添加到指定文件夹（默认收件箱）
                    this.data.conversations[id] = {
                        id,
                        title,
                        url,
                        folderId: folderId, // 确保添加到收件箱
                        pinned: isPinned,
                        createdAt: actualUpdatedAt,
                        updatedAt: actualUpdatedAt
                    };
                    newCount++;
                } else {
                    // 更新已有会话
                    if (localConversation.title !== title) {
                        localConversation.title = title;
                        updatedCount++;
                    }
                    if (localConversation.url !== url) {
                        localConversation.url = url;
                    }
                    // 同步置顶状态
                    if (localConversation.pinned !== isPinned) {
                        localConversation.pinned = isPinned;
                        updatedCount++;
                    }

                    // 仅当远端时间更晚时才更新本地更新时间，避免每次同步都"重置"为当前时间
                    // 使用会话的实际更新时间，而不是同步时间
                    const currentUpdated = localConversation.updatedAt || 0;
                    if (actualUpdatedAt > currentUpdated) {
                        localConversation.updatedAt = actualUpdatedAt;
                    } else if (!remoteUpdatedAt && localConversation.updatedAt) {
                        // 如果远端没有提供更新时间，保持本地已有的更新时间不变
                        // 这样就不会用同步时间覆盖会话的实际更新时间
                    }
                }
            });

            this.saveData();
            // 确保会话按照时间排序
            this.renderConversationList();
            
            // 修复：如果有新会话或更新，且当前有展开的文件夹，需要重新渲染该文件夹的会话列表
            if ((newCount > 0 || updatedCount > 0) && this.expandedFolderId) {
                const expandedFolderList = this.listContainer?.querySelector(`.chatgpt-helper-conversations-list[data-folder-id="${this.expandedFolderId}"]`);
                if (expandedFolderList) {
                    this.renderConversationsInFolder(this.expandedFolderId, expandedFolderList);
                }
            }
            
            const msg = newCount > 0
                ? `${this.t('synced') || '已同步'} ${newCount} ${this.t('newSessions') || '个新会话'}`
                : (updatedCount > 0
                    ? `${this.t('synced') || '已同步'} ${updatedCount} ${this.t('updatedSessions') || '个会话'}`
                    : (this.t('synced') || '同步完成'));
            this.showToast(msg);
        }

        showCreateFolderDialog() {
            const name = prompt('请输入文件夹名称：');
            if (!name || !name.trim()) return;

            const folder = {
                id: 'folder_' + Date.now(),
                name: `📁 ${name.trim()}`,
                icon: '📁',
                isDefault: false
            };
            this.data.folders.push(folder);
            this.saveData();
            this.createUI();
        }

        deleteFolder(folderId) {
            if (!folderId || folderId === 'inbox') return;
            const folder = (this.data.folders || []).find(f => f.id === folderId);
            if (!folder || folder.isDefault) return;

            const folderName = (folder.name || '').trim() || folderId;
            const confirmTpl = this.t('deleteFolderConfirm') || '确定要删除文件夹 "{name}" 吗？\n文件夹内的会话将移动到收件箱。';
            const confirmMsg = confirmTpl.replace('{name}', folderName.replace(/"/g, ''));
            if (!confirm(confirmMsg)) return;

            // 将该文件夹内会话移动到收件箱（避免误删会话）
            const conversations = this.data.conversations || {};
            Object.values(conversations).forEach(conv => {
                if (conv && conv.folderId === folderId) {
                    conv.folderId = 'inbox';
                }
            });

            // 删除文件夹
            this.data.folders = (this.data.folders || []).filter(f => f.id !== folderId);

            // 修正状态
            if (this.data.lastUsedFolderId === folderId) this.data.lastUsedFolderId = 'inbox';
            if (this.expandedFolderId === folderId) this.expandedFolderId = null;

            this.saveData();
            this.createUI();
            this.showToast(this.t('folderDeleted') || '文件夹已删除');
        }

        formatTime(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            try {
                // 根据当前语言环境格式化时间，避免中文/英文混用
                const locale = (getCurrentLang && getCurrentLang() === 'zh-CN')
                    ? 'zh-CN'
                    : 'en-US';
                return date.toLocaleString(locale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (e) {
                return date.toLocaleString();
            }
        }

        updateBatchToolbar() {
            if (this.batchToolbar) {
                const countEl = this.batchToolbar.querySelector('span');
                if (countEl) {
                    countEl.textContent = `已选择 ${this.selectedIds.size} 项`;
                }
            }
        }

        batchMove() {
            if (this.selectedIds.size === 0) {
                this.showToast(this.t('selectConversationsFirst') || '请先选择要移动的会话');
                return;
            }
            this.showMoveToFolderDialog(null, true);
        }

        batchDelete() {
            if (this.selectedIds.size === 0) {
                this.showToast(this.t('selectConversationsFirst') || '请先选择要删除的会话');
                return;
            }
            if (!confirm(`确定要删除 ${this.selectedIds.size} 个会话吗？`)) return;

            this.selectedIds.forEach(id => {
                delete this.data.conversations[id];
            });
            this.selectedIds.clear();
            this.saveData();
            this.renderConversationList();
            this.updateBatchToolbar();
            this.showToast('已删除');
        }

        async batchExport() {
            if (this.selectedIds.size === 0) {
                this.showToast(this.t('selectConversationsFirst') || '请先选择要导出的会话');
                return;
            }
            const format = prompt('选择导出格式：\n1. Markdown\n2. JSON\n3. TXT', '1');
            if (!format) return;

            const formatMap = { '1': 'markdown', '2': 'json', '3': 'txt' };
            const selectedFormat = formatMap[format] || 'markdown';

            for (const id of this.selectedIds) {
                const conv = this.data.conversations[id];
                if (conv && conv.url) {
                    await this.exportConversation(conv, selectedFormat);
                }
            }
            this.showToast(`已导出 ${this.selectedIds.size} 个会话`);
        }

        async exportConversation(conv, format = 'markdown') {
            // 需要打开会话才能导出内容
            if (window.location.href !== conv.url) {
                this.showToast(this.t('openFirst') || `请先打开会话: ${conv.title}`);
                return;
            }

            const messages = this.extractMessages();
            if (messages.length === 0) {
                this.showToast(this.t('noContent') || '未找到对话内容');
                return;
            }

            let content = '';
            const filename = `${conv.title || '未命名'}_${Date.now()}`;

            switch (format) {
                case 'markdown':
                    content = this.formatToMarkdown(conv, messages);
                    this.downloadFile(content, `${filename}.md`, 'text/markdown');
                    break;
                case 'json':
                    content = this.formatToJSON(conv, messages);
                    this.downloadFile(content, `${filename}.json`, 'application/json');
                    break;
                case 'txt':
                    content = this.formatToTXT(conv, messages);
                    this.downloadFile(content, `${filename}.txt`, 'text/plain');
                    break;
            }
        }

        extractMessages() {
            const messages = [];
            const messageElements = this.adapter.getChatMessages();

            messageElements.forEach((el, index) => {
                const role = el.getAttribute('data-message-author-role') ||
                    (el.querySelector('[data-message-author-role="user"]') ? 'user' : 'assistant');
                const content = (el.innerText || el.textContent || '').trim();
                if (content) {
                    messages.push({ role, content });
                }
            });

            return messages;
        }

        formatToMarkdown(conv, messages) {
            const lines = [];
            const now = new Date().toLocaleString();
            const userLabel = '用户';

            lines.push(`# 📤 导出信息`);
            lines.push(`- **会话标题**: ${conv.title || '未命名'}`);
            lines.push(`- **导出时间**: ${now}`);
            lines.push(`- **来源**: ChatGPT`);
            lines.push(`- **链接**: ${window.location.href}`);
            lines.push('---');
            lines.push('');

            messages.forEach((msg) => {
                if (msg.role === 'user') {
                    lines.push(`## 🙋 ${userLabel}`);
                    lines.push('');
                    lines.push(msg.content);
                    lines.push('');
                    lines.push('---');
                    lines.push('');
                } else {
                    lines.push(`## 🤖 ChatGPT`);
                    lines.push('');
                    lines.push(msg.content);
                    lines.push('');
                    lines.push('---');
                    lines.push('');
                }
            });

            return lines.join('\n');
        }

        formatToJSON(conv, messages) {
            const data = {
                metadata: {
                    title: conv.title || '未命名',
                    id: conv.id,
                    url: window.location.href,
                    exportTime: new Date().toISOString(),
                    source: 'ChatGPT',
                },
                messages: messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            };
            return JSON.stringify(data, null, 2);
        }

        formatToTXT(conv, messages) {
            const lines = [];
            const now = new Date().toLocaleString();
            const userLabel = '用户';

            lines.push(`会话标题: ${conv.title || '未命名'}`);
            lines.push(`导出时间: ${now}`);
            lines.push(`来源: ChatGPT`);
            lines.push(`链接: ${window.location.href}`);
            lines.push('');
            lines.push('='.repeat(50));
            lines.push('');

            messages.forEach((msg) => {
                if (msg.role === 'user') {
                    lines.push(`[${userLabel}]`);
                } else {
                    lines.push(`[ChatGPT]`);
                }
                lines.push(msg.content);
                lines.push('');
                lines.push('-'.repeat(50));
                lines.push('');
            });

            return lines.join('\n');
        }

        downloadFile(content, filename, mimeType) {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        showMoveToFolderDialog(conv, isBatch = false) {
            const overlay = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog-overlay',
                role: 'presentation'
            });

            const dialog = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog chatgpt-helper-compact-dialog',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': '移动到文件夹'
            });

            dialog.appendChild(createElement('div', {
                className: 'chatgpt-helper-prompt-dialog-title'
            }, '移动到文件夹'));

            const folderSelect = createElement('select', {
                className: 'chatgpt-helper-prompt-dialog-field'
            });

            this.data.folders.forEach(folder => {
                const option = createElement('option', { value: folder.id }, folder.name);
                folderSelect.appendChild(option);
            });

            dialog.appendChild(folderSelect);

            const btnContainer = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog-actions'
            });

            const cancelBtn = createElement('button', {
                className: 'chatgpt-helper-prompt-dialog-btn secondary',
                type: 'button'
            }, '取消');
            cancelBtn.addEventListener('click', () => overlay.remove());

            const confirmBtn = createElement('button', {
                className: 'chatgpt-helper-prompt-dialog-btn primary',
                type: 'button'
            }, '确定');
            confirmBtn.addEventListener('click', () => {
                const folderId = folderSelect.value;
                if (isBatch) {
                    this.selectedIds.forEach(id => {
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
                    this.showToast('已移动');
                }
                overlay.remove();
            });

            btnContainer.appendChild(cancelBtn);
            btnContainer.appendChild(confirmBtn);
            dialog.appendChild(btnContainer);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });
        }

        showContextMenu(e, conv) {
            // 简单的右键菜单实现
            const menu = createElement('div', {
                className: 'chatgpt-helper-context-menu',
                style: {
                    position: 'fixed',
                    top: e.clientY + 'px',
                    left: e.clientX + 'px'
                }
            });

            const items = [
                { label: '置顶', iconName: 'pin', action: () => this.togglePin(conv) },
                { label: '移动到...', iconName: 'folder', action: () => this.showMoveToFolderDialog(conv) },
                { label: '添加标签', iconName: 'tag', action: () => this.showTagDialog(conv) },
                { label: '删除', iconName: 'trash', danger: true, action: () => this.deleteConversation(conv) }
            ];

            items.forEach(item => {
                const menuItem = createElement('div', {
                    className: `chatgpt-helper-context-menu-item${item.danger ? ' danger' : ''}`,
                    role: 'menuitem'
                });
                menuItem.appendChild(createSvgIconNode(item.iconName, { size: 14 }));
                menuItem.appendChild(createElement('span', {}, item.label));
                menuItem.addEventListener('click', () => {
                    item.action();
                    menu.remove();
                });
                menu.appendChild(menuItem);
            });

            document.body.appendChild(menu);
            const removeMenu = () => {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            };
            setTimeout(() => document.addEventListener('click', removeMenu), 100);
        }

        togglePin(conv) {
            conv.pinned = !conv.pinned;
            this.saveData();
            this.renderConversationList();
            this.showToast(conv.pinned ? '已置顶' : '已取消置顶');
        }

        deleteConversation(conv) {
            if (!confirm(`确定要删除 "${conv.title}" 吗？`)) return;
            delete this.data.conversations[conv.id];
            this.saveData();
            this.renderConversationList();
            this.showToast('已删除');
        }

        showTagDialog(conv) {
            // 简化的标签对话框
            const tagName = prompt('输入标签名称（留空删除标签）：');
            if (tagName === null) return;

            if (!this.data.tags) this.data.tags = [];

            if (tagName.trim()) {
                // 查找或创建标签
                let tag = this.data.tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
                if (!tag) {
                    const preset = getThemePresetByKey(this.settings?.themeConfig?.presetKey || DEFAULT_THEME_CONFIG.presetKey);
                    tag = {
                        id: 'tag_' + Date.now(),
                        name: tagName.trim(),
                        color: preset.primary
                    };
                    this.data.tags.push(tag);
                }

                // 添加标签到会话
                if (!conv.tagIds) conv.tagIds = [];
                if (!conv.tagIds.includes(tag.id)) {
                    conv.tagIds.push(tag.id);
                }
            } else {
                // 删除所有标签
                delete conv.tagIds;
            }

            this.saveData();
            this.renderConversationList();
            this.showToast('标签已更新');
        }

        showToast(message) {
            const existing = document.getElementById('chatgpt-helper-toast');
            if (existing) existing.remove();

            const toast = createElement('div', {
                id: 'chatgpt-helper-toast',
                className: 'chatgpt-helper-toast'
            }, message);
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
    }
    Object.assign(H, {
        ConversationManager
    });
})();
