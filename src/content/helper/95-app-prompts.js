// Chrome Extension Content Script - ChatGPT Helper App Prompts
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
        TabRenameManager,
        ChatGPTAdapter,
        ChatGPTHelper
    } = H;


    if (!ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Prompts module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        renderPrompts(container) {
            // 搜索栏
            const searchBar = createElement('div', { className: 'chatgpt-helper-search-bar' });
            const searchInput = createElement('input', {
                className: 'chatgpt-helper-search-input',
                type: 'text',
                placeholder: this.t('searchPlaceholder'),
                value: this.searchQuery || ''
            });
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim();
                this.refreshPromptList();
            });
            searchBar.appendChild(searchInput);
            container.appendChild(searchBar);

            // 分类标签
            const categories = this.getCategories();
            const categoryBar = createElement('div', { className: 'chatgpt-helper-categories' });
            const allCategoryText = this.t('allCategory');
            const allTag = createElement('div', {
                className: `chatgpt-helper-category-tag ${this.selectedCategory === allCategoryText ? 'active' : ''}`
            }, allCategoryText);
            allTag.addEventListener('click', () => {
                this.selectedCategory = allCategoryText;
                // 先更新分类栏高亮状态，再刷新列表
                this.updateCategoryBar();
                // 使用 setTimeout 确保分类栏更新完成后再刷新列表
                setTimeout(() => {
                    this.refreshPromptList();
                }, 0);
            });
            categoryBar.appendChild(allTag);

            categories.forEach(cat => {
                const tag = createElement('div', {
                    className: `chatgpt-helper-category-tag ${this.selectedCategory === cat ? 'active' : ''}`
                }, cat);
                tag.addEventListener('click', () => {
                    this.selectedCategory = cat;
                    // 先更新分类栏高亮状态，再刷新列表
                    this.updateCategoryBar();
                    // 使用 setTimeout 确保分类栏更新完成后再刷新列表
                    setTimeout(() => {
                        this.refreshPromptList();
                    }, 0);
                });
                categoryBar.appendChild(tag);
            });
            container.appendChild(categoryBar);

            // 提示词列表容器
            const listContainer = createElement('div', { className: 'chatgpt-helper-prompt-list', id: 'prompt-list' });
            container.appendChild(listContainer);

            this.refreshPromptList();
        },

        refreshPromptList() {
            const listContainer = this.panel.querySelector('#prompt-list');
            if (!listContainer) return;

            clearElement(listContainer);

            // 添加提示词按钮
            const addBtn = createElement('button', {
                className: 'chatgpt-helper-add-btn'
            });
            addBtn.appendChild(createElement('span', {}, '+'));
            addBtn.appendChild(createElement('span', {}, this.t('addPrompt')));
            addBtn.addEventListener('click', () => this.showAddPromptDialog());
            listContainer.appendChild(addBtn);

            // 过滤提示词
            let filteredPrompts = this.prompts;
            if (this.selectedCategory && this.selectedCategory !== this.t('allCategory')) {
                filteredPrompts = filteredPrompts.filter(p => p.category === this.selectedCategory);
            }
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filteredPrompts = filteredPrompts.filter(p =>
                    p.title.toLowerCase().includes(query) ||
                    p.content.toLowerCase().includes(query)
                );
            }

            if (filteredPrompts.length === 0) {
                listContainer.appendChild(createElement('div', {
                    style: { textAlign: 'center', color: 'var(--gh-text-secondary)', padding: '20px', fontSize: '14px' }
                }, this.t('noPrompts')));
                return;
            }

            // 注意：updateCategoryBar() 会在需要时被调用，这里不重复调用
            // 避免在刷新列表时重置分类栏的高亮状态
            
            filteredPrompts.forEach((prompt, filteredIndex) => {
                // 找到在完整列表中的索引
                const fullIndex = this.prompts.findIndex(p => p.id === prompt.id);
                const item = createElement('div', {
                    className: `chatgpt-helper-prompt-item ${this.selectedPrompt?.id === prompt.id ? 'selected' : ''}`,
                    'data-prompt-id': prompt.id,
                    'data-prompt-index': fullIndex !== -1 ? fullIndex : filteredIndex
                });
                
                // 拖动手柄
                const dragHandle = createElement('div', {
                    className: 'chatgpt-helper-prompt-drag-handle'
                });
                item.appendChild(dragHandle);

                // 设置内容区域左边距，为拖动手柄留出空间
                const contentWrapper = createElement('div', {
                    className: 'chatgpt-helper-prompt-content-wrapper',
                    style: {
                        marginLeft: '28px',
                        position: 'relative',
                        paddingRight: '60px' // 为按钮留出空间
                    }
                });

                const title = createElement('div', { className: 'chatgpt-helper-prompt-title' }, prompt.title);
                const content = createElement('div', { className: 'chatgpt-helper-prompt-content' }, prompt.content);
                
                contentWrapper.appendChild(title);
                contentWrapper.appendChild(content);

                // 操作按钮 - 放到右侧偏上
                const actions = createElement('div', {
                    className: 'chatgpt-helper-prompt-actions'
                });
                
                // 如果有分类，添加分类按钮
                if (prompt.category) {
                    const categoryBtn = createElement('button', {
                        className: 'category-btn',
                        title: `${this.t('category')}: ${prompt.category}`,
                        type: 'button' // 明确指定按钮类型
                    });
                    categoryBtn.appendChild(createSvgIconNode('tag', { size: 14 }));
                    categoryBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation(); // 阻止同一元素上的其他事件监听器
                        this.selectedCategory = prompt.category;
                        // 先更新分类栏高亮状态，再刷新列表
                        this.updateCategoryBar();
                        // 使用 setTimeout 确保分类栏更新完成后再刷新列表
                        setTimeout(() => {
                            this.refreshPromptList();
                        }, 0);
                        return false; // 额外确保阻止默认行为
                    });
                    actions.appendChild(categoryBtn);
                }
                
                const editBtn = createElement('button', {
                    className: 'edit-btn',
                    title: this.t('edit')
                });
                editBtn.appendChild(createSvgIconNode('edit', { size: 14 }));
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showEditPromptDialog(prompt);
                });
                
                const deleteBtn = createElement('button', {
                    className: 'delete-btn',
                    title: this.t('delete')
                });
                deleteBtn.appendChild(createSvgIconNode('trash', { size: 14 }));
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(this.t('confirmDelete'))) {
                        this.deletePrompt(prompt.id);
                    }
                });
                
                actions.appendChild(editBtn);
                actions.appendChild(deleteBtn);
                
                contentWrapper.appendChild(actions);
                item.appendChild(contentWrapper);
                
                // 拖动功能
                this.initPromptDrag(item, prompt, fullIndex !== -1 ? fullIndex : filteredIndex);

                item.addEventListener('click', (e) => {
                    if (!e.target.closest('button') && !e.target.closest('.chatgpt-helper-prompt-drag-handle')) {
                        this.selectedPrompt = prompt;
                        this.adapter.insertPrompt(prompt.content);
                        this.refreshPromptList(); // 刷新以显示选中状态
                    }
                });
                
                listContainer.appendChild(item);
            });
        },

        initPromptDrag(item, prompt, index) {
            const dragHandle = item.querySelector('.chatgpt-helper-prompt-drag-handle');
            if (!dragHandle) return;

            let isDragging = false;
            // 使用完整列表中的索引，而不是过滤后的索引
            const draggedIndex = this.prompts.findIndex(p => p.id === prompt.id);
            if (draggedIndex === -1) return; // 如果找不到，不初始化拖拽

            // 鼠标按下
            dragHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isDragging = true;
                item.classList.add('dragging');
                item.style.opacity = '0.5';
                document.body.style.cursor = 'grabbing';
            });

            // 鼠标移动
            const handleMouseMove = (e) => {
                if (!isDragging) return;

                const listContainer = this.panel.querySelector('#prompt-list');
                if (!listContainer) return;

                const items = Array.from(listContainer.querySelectorAll('.chatgpt-helper-prompt-item:not(.dragging)'));
                const mouseY = e.clientY;
                
                // 移除所有drag-over类
                items.forEach(el => el.classList.remove('drag-over'));

                // 找到鼠标位置下的元素
                for (let i = 0; i < items.length; i++) {
                    const rect = items[i].getBoundingClientRect();
                    const elementCenterY = rect.top + rect.height / 2;
                    
                    if (mouseY < elementCenterY) {
                        items[i].classList.add('drag-over');
                        break;
                    }
                }

                // 如果鼠标在最后一个元素下方
                if (items.length > 0) {
                    const lastRect = items[items.length - 1].getBoundingClientRect();
                    if (mouseY > lastRect.bottom) {
                        items[items.length - 1].classList.add('drag-over');
                    }
                }
            };

            // 鼠标释放
            const handleMouseUp = (e) => {
                if (!isDragging) return;

                isDragging = false;
                item.classList.remove('dragging');
                item.style.opacity = '';
                document.body.style.cursor = '';

                const listContainer = this.panel.querySelector('#prompt-list');
                if (listContainer) {
                    const items = Array.from(listContainer.querySelectorAll('.chatgpt-helper-prompt-item'));
                    
                    // 先找到目标位置（在移除drag-over类之前）
                    const draggedPromptId = prompt.id;
                    let targetIndex = draggedIndex;

                    for (let i = 0; i < items.length; i++) {
                        if (items[i] === item) continue;
                        if (items[i].classList.contains('drag-over')) {
                            const targetPromptId = items[i].dataset.promptId;
                            // 找到在完整列表中的索引
                            targetIndex = this.prompts.findIndex(p => p.id === targetPromptId);
                            if (targetIndex === -1) {
                                // 如果找不到，保持原位置
                                targetIndex = draggedIndex;
                            }
                            break;
                        }
                    }

                    // 移除所有drag-over类
                    items.forEach(el => el.classList.remove('drag-over'));

                    // 如果位置发生了变化，重新排序
                    if (targetIndex !== draggedIndex && targetIndex !== -1) {
                        this.reorderPrompts(draggedPromptId, targetIndex);
                    }
                }

                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },

        reorderPrompts(draggedPromptId, targetIndex) {
            // 找到被拖动的提示词在完整列表中的索引
            const fromIndex = this.prompts.findIndex(p => p.id === draggedPromptId);
            if (fromIndex === -1) return;

            // 从原位置移除
            const [movedPrompt] = this.prompts.splice(fromIndex, 1);
            
            // 计算新位置（考虑从原位置移除后的索引变化）
            let newIndex = targetIndex;
            if (targetIndex > fromIndex) {
                newIndex = targetIndex - 1;
            }
            
            // 插入到新位置
            this.prompts.splice(newIndex, 0, movedPrompt);

            this.savePrompts();
            this.refreshPromptList();
        },

        getCategories() {
            const categories = new Set();
            this.prompts.forEach(p => {
                if (p.category) categories.add(p.category);
            });
            return Array.from(categories).sort();
        },

        updateCategoryBar() {
            // 更新分类标签栏，而不是重新渲染整个面板
            // 优先使用 data-tab 属性查找，如果没有则使用 id 作为后备
            const promptsPanel = this.panel?.querySelector('.chatgpt-helper-content-panel[data-tab="prompts"]') ||
                                 this.panel?.querySelector('#prompts-content');
            if (!promptsPanel) return;

            const categoryBar = promptsPanel.querySelector('.chatgpt-helper-categories');
            if (!categoryBar) return;

            // 保存当前选中的分类
            const currentCategory = this.selectedCategory;
            
            // 获取最新的分类列表
            const categories = this.getCategories();
            
            // 清空分类标签栏
            const allCategoryText = this.t('allCategory');
            clearElement(categoryBar);
            
            // 重新添加"全部"标签
            const newAllTag = createElement('div', {
                className: `chatgpt-helper-category-tag ${currentCategory === allCategoryText ? 'active' : ''}`
            }, allCategoryText);
            newAllTag.addEventListener('click', () => {
                this.selectedCategory = allCategoryText;
                // 先更新分类栏高亮状态，再刷新列表
                this.updateCategoryBar();
                // 使用 setTimeout 确保分类栏更新完成后再刷新列表
                setTimeout(() => {
                    this.refreshPromptList();
                }, 0);
            });
            categoryBar.appendChild(newAllTag);
            
            // 添加所有分类标签
            categories.forEach(cat => {
                const tag = createElement('div', {
                    className: `chatgpt-helper-category-tag ${currentCategory === cat ? 'active' : ''}`
                }, cat);
                tag.addEventListener('click', () => {
                    this.selectedCategory = cat;
                    // 先更新分类栏高亮状态，再刷新列表
                    this.updateCategoryBar();
                    // 使用 setTimeout 确保分类栏更新完成后再刷新列表
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

        showEditPromptDialog(prompt) {
            this.showPromptDialog(prompt);
        },

        showPromptDialog(prompt = null) {
            const overlay = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog-overlay',
                role: 'presentation'
            });

            const dialog = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': prompt ? this.t('editPrompt') : this.t('addPrompt')
            });

            const title = createElement('h3', {
                className: 'chatgpt-helper-prompt-dialog-title'
            }, prompt ? this.t('editPrompt') : this.t('addPrompt'));

            const titleInput = createElement('input', {
                className: 'chatgpt-helper-prompt-dialog-field',
                type: 'text',
                placeholder: this.t('title'),
                value: prompt?.title || ''
            });

            const contentTextarea = createElement('textarea', {
                className: 'chatgpt-helper-prompt-dialog-field chatgpt-helper-prompt-dialog-textarea',
                placeholder: this.t('content'),
                value: prompt?.content || ''
            });

            const categoryInput = createElement('input', {
                className: 'chatgpt-helper-prompt-dialog-field',
                type: 'text',
                placeholder: `${this.t('category')} (${this.t('optional')})`,
                value: prompt?.category || ''
            });

            const buttons = createElement('div', {
                className: 'chatgpt-helper-prompt-dialog-actions'
            });

            const cancelBtn = createElement('button', {
                className: 'chatgpt-helper-prompt-dialog-btn secondary',
                type: 'button'
            }, this.t('cancel'));
            cancelBtn.addEventListener('click', () => overlay.remove());

            const saveBtn = createElement('button', {
                className: 'chatgpt-helper-prompt-dialog-btn primary',
                type: 'button'
            }, this.t('save'));
            saveBtn.addEventListener('click', () => {
                const title = titleInput.value.trim();
                const content = contentTextarea.value.trim();
                const category = categoryInput.value.trim();

                if (!title || !content) {
                    alert(this.t('fillTitleContent'));
                    return;
                }

                // 检查是否添加了新分类
                const categoriesBefore = new Set(this.getCategories());
                const isNewCategory = category && !categoriesBefore.has(category);
                
                if (prompt) {
                    this.updatePrompt(prompt.id, { title, content, category });
                } else {
                    this.addPrompt({ title, content, category });
                }
                
                overlay.remove();
                
                // 如果添加了新分类，且当前没有选中分类或选中了"全部"，则选中新添加的分类
                if (isNewCategory && (!this.selectedCategory || this.selectedCategory === this.t('allCategory'))) {
                    this.selectedCategory = category;
                }
                
                // 先更新分类标签栏（同步显示新分类并更新高亮状态）
                // 使用 setTimeout 确保数据已保存后再更新UI
                setTimeout(() => {
                    this.updateCategoryBar();
                    // 然后刷新提示词列表
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

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });
        },

        addPrompt(prompt) {
            prompt.id = 'custom_' + Date.now();
            this.prompts.push(prompt);
            this.savePrompts();
        },

        updatePrompt(id, updatedPrompt) {
            const index = this.prompts.findIndex(p => p.id === id);
            if (index !== -1) {
                this.prompts[index] = { ...this.prompts[index], ...updatedPrompt };
                this.savePrompts();
            }
        },

        deletePrompt(id) {
            this.prompts = this.prompts.filter(p => p.id !== id);
            this.savePrompts();
            // 更新分类标签栏（如果删除的提示词是某个分类的最后一个，该分类会从标签栏中消失）
            this.updateCategoryBar();
            this.refreshPromptList();
        }
    });
})();
