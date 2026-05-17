// Chrome Extension Content Script - ChatGPT Helper App Conversations And Settings
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
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Conversations And Settings module');
        return;
    }
    Object.assign(ChatGPTHelper.prototype, {
        renderConversations(container) {
            // 初始化或更新会话管理器（支持语言、设置变化时重新渲染）
            if (!this.conversationManager) {
                this.conversationManager = new ConversationManager({
                    container: container,
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
            
            // 检查并显示会话数据状态
            const data = this.conversationManager.data;
            console.log('[ChatGPT Helper] 会话管理器数据:', {
                folders: data.folders?.length || 0,
                conversations: Object.keys(data.conversations || {}).length,
                hasData: Object.keys(data.conversations || {}).length > 0
            });
            
            // 如果没有会话数据，显示提示信息
            if (Object.keys(data.conversations || {}).length === 0) {
                console.log('[ChatGPT Helper] 当前没有保存的会话，这是正常的（新安装或未同步）');
            }
        },

        renderSettings(container) {
            const settingsContent = createElement('div', {
                className: 'chatgpt-helper-settings-scroll chatgpt-helper-settings-compact'
            });

            const rerenderSettings = () => {
                const panel = this.panel?.querySelector('#settings-content');
                if (!panel) return;
                clearElement(panel);
                this.renderSettings(panel);
            };
            const ensureReadingHistory = () => {
                if (!this.settings.readingHistory) {
                    this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
                }
                return this.settings.readingHistory;
            };
            const ensureOutline = () => {
                if (!this.settings.outline) this.settings.outline = {};
                return this.settings.outline;
            };
            const ensureTabSettings = () => {
                if (!this.settings.tabSettings) this.settings.tabSettings = {};
                return this.settings.tabSettings;
            };
            const ensureFormulaCopy = () => {
                if (!this.settings.formulaCopy) this.settings.formulaCopy = { enabled: true };
                return this.settings.formulaCopy;
            };
            const ensureTableCopy = () => {
                if (!this.settings.tableCopy) this.settings.tableCopy = { enabled: true };
                return this.settings.tableCopy;
            };

            const savedLanguagePreference = window.GM_getValue(SETTING_KEYS.LANGUAGE, 'auto');
            const languageValue = savedLanguagePreference === 'auto' || I18N[savedLanguagePreference]
                ? savedLanguagePreference
                : 'auto';
            const tabSettings = ensureTabSettings();

            const createCompactControl = (item) => {
                let control = null;
                if (item.type === 'toggle') {
                    control = createElement('button', {
                        className: 'chatgpt-helper-toggle' + (item.value ? ' active' : ''),
                        type: 'button',
                        'aria-label': item.label,
                        'aria-pressed': item.value ? 'true' : 'false'
                    });
                    control.appendChild(createElement('div', { className: 'chatgpt-helper-toggle-knob' }));
                    control.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const newValue = !item.value;
                        item.value = newValue;
                        control.classList.toggle('active', newValue);
                        control.setAttribute('aria-pressed', newValue ? 'true' : 'false');
                        if (item.onChange) {
                            const result = item.onChange(newValue);
                            if (result === false) {
                                item.value = !newValue;
                                control.classList.toggle('active', !newValue);
                                control.setAttribute('aria-pressed', !newValue ? 'true' : 'false');
                            }
                        }
                    });
                } else if (item.type === 'select') {
                    const options = item.options || [];
                    const selected = options.find(opt => String(opt.value) === String(item.value)) || options[0];
                    control = createElement('div', {
                        className: 'chatgpt-helper-custom-select chatgpt-helper-settings-compact-select',
                        'data-value': selected ? String(selected.value) : ''
                    });
                    const trigger = createElement('button', {
                        className: 'chatgpt-helper-custom-select-trigger',
                        type: 'button',
                        'aria-haspopup': 'listbox',
                        'aria-expanded': 'false',
                        'aria-label': item.label
                    });
                    const triggerText = createElement('span', {
                        className: 'chatgpt-helper-custom-select-value'
                    }, selected ? selected.label : '');
                    const triggerIcon = createElement('span', {
                        className: 'chatgpt-helper-custom-select-icon',
                        'aria-hidden': 'true'
                    }, '\u25be');
                    trigger.appendChild(triggerText);
                    trigger.appendChild(triggerIcon);

                    const menu = createElement('div', {
                        className: 'chatgpt-helper-custom-select-menu',
                        role: 'listbox'
                    });
                    const closeMenu = () => {
                        control.classList.remove('open');
                        trigger.setAttribute('aria-expanded', 'false');
                    };
                    const openMenu = () => {
                        control.classList.add('open');
                        trigger.setAttribute('aria-expanded', 'true');
                    };
                    const chooseOption = (opt) => {
                        const newValue = opt.value;
                        item.value = newValue;
                        control.dataset.value = String(newValue);
                        triggerText.textContent = opt.label;
                        menu.querySelectorAll('.chatgpt-helper-custom-select-option').forEach(optionEl => {
                            const isSelected = optionEl.dataset.value === String(newValue);
                            optionEl.classList.toggle('selected', isSelected);
                            optionEl.setAttribute('aria-selected', isSelected ? 'true' : 'false');
                        });
                        closeMenu();
                        if (item.onChange) item.onChange(newValue);
                    };
                    options.forEach(opt => {
                        const isSelected = String(opt.value) === String(item.value);
                        const option = createElement('button', {
                            className: 'chatgpt-helper-custom-select-option' + (isSelected ? ' selected' : ''),
                            type: 'button',
                            role: 'option',
                            'aria-selected': isSelected ? 'true' : 'false',
                            'data-value': String(opt.value)
                        }, opt.label);
                        option.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            chooseOption(opt);
                        });
                        menu.appendChild(option);
                    });
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        control.classList.contains('open') ? closeMenu() : openMenu();
                    });
                    control.addEventListener('focusout', (e) => {
                        if (!control.contains(e.relatedTarget)) closeMenu();
                    });
                    control.appendChild(trigger);
                    control.appendChild(menu);
                } else if (item.type === 'number') {
                    control = createElement('input', {
                        className: 'chatgpt-helper-settings-compact-input',
                        type: 'number',
                        value: item.value,
                        min: item.min !== undefined ? item.min : 200,
                        max: item.max !== undefined ? item.max : 600,
                        step: item.step !== undefined ? item.step : 1,
                        'aria-label': item.label
                    });
                    const commit = () => {
                        if (item.onChange) item.onChange(control.value);
                    };
                    control.addEventListener('change', commit);
                    control.addEventListener('blur', commit);
                    control.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            control.blur();
                            commit();
                        }
                    });
                } else if (item.type === 'text') {
                    control = createElement('input', {
                        className: 'chatgpt-helper-settings-compact-input chatgpt-helper-settings-compact-text',
                        type: 'text',
                        value: item.value || '',
                        placeholder: item.placeholder || '',
                        'aria-label': item.label
                    });
                    const commit = () => {
                        if (item.onChange) item.onChange(control.value);
                    };
                    control.addEventListener('change', commit);
                    control.addEventListener('blur', commit);
                    control.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            control.blur();
                            commit();
                        }
                    });
                } else if (item.type === 'button') {
                    control = createElement('button', {
                        className: 'chatgpt-helper-theme-launch-btn chatgpt-helper-settings-compact-button',
                        type: 'button'
                    }, item.buttonText || item.label);
                    control.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (item.onClick) item.onClick();
                    });
                }
                return control;
            };

            const createCompactRow = (item) => {
                const row = createElement('div', { className: 'chatgpt-helper-settings-compact-row' });
                const label = createElement('div', {
                    className: 'chatgpt-helper-settings-compact-label' + (item.desc ? ' has-desc' : ''),
                    title: item.desc ? `${item.label} - ${item.desc}` : item.label
                });
                label.appendChild(createElement('div', {
                    className: 'chatgpt-helper-settings-compact-label-text'
                }, item.label));
                if (item.desc) {
                    label.appendChild(createElement('div', {
                        className: 'chatgpt-helper-settings-compact-desc'
                    }, item.desc));
                }
                row.appendChild(label);
                const control = createCompactControl(item);
                if (control) {
                    const controls = createElement('div', { className: 'chatgpt-helper-settings-compact-controls' });
                    controls.appendChild(control);
                    row.appendChild(controls);
                }
                return row;
            };

            const createCompactSection = (title, items) => {
                const section = createElement('section', { className: 'chatgpt-helper-settings-compact-section' });
                section.appendChild(createElement('div', { className: 'chatgpt-helper-settings-compact-title' }, title));
                const list = createElement('div', { className: 'chatgpt-helper-settings-compact-list' });
                items.filter(Boolean).forEach((item) => list.appendChild(createCompactRow(item)));
                section.appendChild(list);
                return section;
            };

            const defaultTabOrder = ['prompts', 'outline', 'conversations', 'export'];
            const getTabLabel = (tabId) => tabId === 'prompts' ? this.t('tabPrompts') :
                tabId === 'outline' ? this.t('tabOutline') :
                    tabId === 'conversations' ? this.t('tabConversations') :
                        tabId === 'export' ? this.t('tabExport') : tabId;
            const createTabVisibilityItem = (tabId) => ({
                label: getTabLabel(tabId),
                type: 'toggle',
                value: this.settings.tabOrder?.includes(tabId) !== false,
                onChange: (val) => {
                    if (!Array.isArray(this.settings.tabOrder) || this.settings.tabOrder.length === 0) {
                        this.settings.tabOrder = [...defaultTabOrder];
                    }
                    if (val) {
                        const next = [...this.settings.tabOrder, tabId]
                            .filter((id, index, arr) => defaultTabOrder.includes(id) && arr.indexOf(id) === index)
                            .sort((a, b) => defaultTabOrder.indexOf(a) - defaultTabOrder.indexOf(b));
                        this.settings.tabOrder = next;
                    } else {
                        const next = this.settings.tabOrder.filter(id => id !== tabId);
                        if (next.length === 0) {
                            this.showToast(this.t('operationFailed') || 'Operation failed');
                            return false;
                        }
                        this.settings.tabOrder = next;
                        if (this.currentTab === tabId) {
                            this.currentTab = next[0];
                        }
                    }
                    this.saveSettings();
                    this.createUI();
                    return true;
                }
            });
            const getQuickButtonOrder = () => {
                const savedOrder = Array.isArray(this.settings.collapsedButtonsOrder)
                    ? this.settings.collapsedButtonsOrder
                    : [];
                const orderedIds = Array.from(new Set(savedOrder
                    .map(item => item?.id)
                    .filter(id => COLLAPSED_BUTTON_DEFS[id])));
                DEFAULT_COLLAPSED_BUTTONS_ORDER.forEach((item) => {
                    if (!orderedIds.includes(item.id)) orderedIds.push(item.id);
                });
                return orderedIds.map(id => ({ id, enabled: true }));
            };
            const createQuickButtonsSection = () => {
                const section = createElement('section', { className: 'chatgpt-helper-settings-compact-section' });
                section.appendChild(createElement('div', {
                    className: 'chatgpt-helper-settings-compact-title'
                }, this.t('settingsGroupQuickButtons') || 'Quick Buttons'));
                const list = createElement('div', { className: 'chatgpt-helper-settings-compact-list' });
                const order = getQuickButtonOrder();
                order.forEach((btnConfig, index) => {
                    const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
                    if (!def) return;
                    const row = createElement('div', {
                        className: 'chatgpt-helper-settings-compact-row chatgpt-helper-settings-quick-button-row'
                    });
                    const label = createElement('div', {
                        className: 'chatgpt-helper-settings-compact-label chatgpt-helper-settings-icon-label'
                    });
                    const icon = createElement('span', { className: 'chatgpt-helper-inline-icon-wrap' });
                    icon.appendChild(createCollapsedButtonIconNode(def, {
                        size: 16,
                        className: 'chatgpt-helper-inline-icon'
                    }));
                    label.appendChild(icon);
                    label.appendChild(createElement('span', {}, def.labelKey ? this.t(def.labelKey) : (def.label || btnConfig.id)));

                    const controls = createElement('div', { className: 'chatgpt-helper-settings-compact-controls' });
                    const move = (delta) => {
                        const nextIndex = index + delta;
                        if (nextIndex < 0 || nextIndex >= order.length) return;
                        const nextOrder = [...order];
                        [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
                        this.settings.collapsedButtonsOrder = nextOrder.map(item => ({ id: item.id, enabled: true }));
                        this.saveSettings();
                        this.createCollapsedButtons();
                        this.showToast(this.t('buttonOrderUpdated') || 'Button order updated');
                        rerenderSettings();
                    };
                    const upBtn = createElement('button', {
                        className: 'prompt-panel-btn chatgpt-helper-order-btn',
                        title: this.t('moveUp') || 'Move Up',
                        type: 'button'
                    });
                    upBtn.appendChild(createSvgIconNode('arrowUp', { size: 14 }));
                    upBtn.disabled = index === 0;
                    upBtn.addEventListener('click', () => move(-1));
                    const downBtn = createElement('button', {
                        className: 'prompt-panel-btn chatgpt-helper-order-btn',
                        title: this.t('moveDown') || 'Move Down',
                        type: 'button'
                    });
                    downBtn.appendChild(createSvgIconNode('arrowDown', { size: 14 }));
                    downBtn.disabled = index === order.length - 1;
                    downBtn.addEventListener('click', () => move(1));
                    controls.appendChild(upBtn);
                    controls.appendChild(downBtn);
                    row.appendChild(label);
                    row.appendChild(controls);
                    list.appendChild(row);
                });
                section.appendChild(list);
                return section;
            };

            const sections = [
                createCompactSection(this.t('settingsGroupGeneral') || 'General', [
                    {
                        label: this.t('themeDialogTitle') || 'Theme',
                        type: 'button',
                        buttonText: this.t('openThemeSettings') || 'Open Theme Settings',
                        onClick: () => this.openThemeSettingsModal()
                    },
                    {
                        label: this.t('language') || 'Interface Language',
                        type: 'select',
                        value: languageValue,
                        options: [
                            { value: 'auto', label: this.t('autoDetect') },
                            { value: 'zh-CN', label: this.t('chinese') },
                            { value: 'en', label: this.t('english') }
                        ],
                        onChange: (val) => {
                            window.GM_setValue(SETTING_KEYS.LANGUAGE, val);
                            setCurrentLang(val === 'auto' ? detectLanguage() : val);
                            if (this.syncExporterLanguage) this.syncExporterLanguage();
                            this.lang = val;
                            this.selectedCategory = this.t('allCategory');
                            if (!window.GM_getValue(SETTING_KEYS.PROMPTS, null)) {
                                this.prompts = createDefaultPrompts();
                            }
                            this.createUI();
                            this.showToast(this.t('languageChanged'));
                        }
                    },
                    {
                        label: this.t('defaultPanelOpenLabel') || 'Open Panel by Default',
                        type: 'toggle',
                        value: this.settings.defaultPanelState,
                        onChange: (val) => {
                            this.settings.defaultPanelState = val;
                            this.saveSettings();
                        }
                    }
                ]),
                createQuickButtonsSection(),
                createCompactSection(this.t('settingsGroupReadingNavigation') || 'Reading & Navigation', [
                    {
                        label: this.t('preventAutoScrollLabel') || 'Prevent Auto Scroll',
                        desc: this.t('preventAutoScrollDesc') || 'Keep the page from jumping to the latest reply while you are reading earlier content.',
                        type: 'toggle',
                        value: this.settings.preventAutoScroll || false,
                        onChange: (val) => {
                            this.settings.preventAutoScroll = val;
                            this.saveSettings();
                            if (!this.scrollLockManager) {
                                this.scrollLockManager = new ScrollLockManager(this.adapter);
                            }
                            this.scrollLockManager.setEnabled(val);
                            this.showToast(this.t(val ? 'enabled' : 'disabled') + ' ' + this.t('preventAutoScrollLabel'));
                        }
                    },
                    {
                        label: this.t('enableReadingHistoryLabel') || 'Reading History',
                        desc: this.t('enableReadingHistoryDesc') || 'Remember the last reading position for each conversation.',
                        type: 'toggle',
                        value: this.settings.readingHistory?.persistence !== false,
                        onChange: (val) => {
                            const cfg = ensureReadingHistory();
                            cfg.persistence = val;
                            this.saveSettings();
                            if (val && this.readingProgressManager) this.readingProgressManager.startRecording();
                            this.showToast(this.t(val ? 'enabled' : 'disabled') + ' ' + this.t('readingHistory'));
                        }
                    },
                    {
                        label: this.t('autoRestoreLabel') || 'Auto Restore Position',
                        desc: this.t('autoRestoreDesc') || 'Open a conversation at the last remembered reading position.',
                        type: 'toggle',
                        value: this.settings.readingHistory?.autoRestore || false,
                        onChange: (val) => {
                            const cfg = ensureReadingHistory();
                            cfg.autoRestore = val;
                            this.saveSettings();
                            this.showToast(this.t(val ? 'enabled' : 'disabled') + ' ' + this.t('autoRestoreLabel'));
                        }
                    },
                    {
                        label: this.t('showUserMessagesLabel') || 'Show User Messages',
                        desc: this.t('showUserMessagesDesc') || 'Include your questions as outline nodes.',
                        type: 'toggle',
                        value: this.settings.outline?.showUserQueries !== false,
                        onChange: (val) => {
                            const cfg = ensureOutline();
                            cfg.showUserQueries = val;
                            this.saveSettings();
                            if (this.currentTab === 'outline') this.refreshOutline();
                        }
                    },
                    {
                        label: this.t('outlineSyncScrollLabel') || 'Outline Follows Reading Position',
                        desc: this.t('outlineSyncScrollDesc') || 'Highlight the matching outline item as you scroll the conversation.',
                        type: 'toggle',
                        value: this.settings.outline?.syncScroll !== false,
                        onChange: (val) => {
                            const cfg = ensureOutline();
                            cfg.syncScroll = val;
                            this.saveSettings();
                            if (this.outlineManager) this.outlineManager.updateSyncScrollState();
                        }
                    }
                ]),
                createCompactSection(this.t('settingsGroupContentProcessing') || 'Content Processing', [
                    {
                        label: this.t('enableFormulaCopyLabel') || 'Formula Copy',
                        type: 'toggle',
                        value: this.settings.formulaCopy?.enabled !== false,
                        onChange: (val) => {
                            const cfg = ensureFormulaCopy();
                            cfg.enabled = val;
                            this.saveSettings();
                            if (this.copyManager) {
                                if (val) this.copyManager.initFormulaCopy();
                                else this.copyManager.destroyFormulaCopy();
                            }
                        }
                    },
                    {
                        label: this.t('enableTableCopyLabel') || 'Table Copy',
                        type: 'toggle',
                        value: this.settings.tableCopy?.enabled !== false,
                        onChange: (val) => {
                            const cfg = ensureTableCopy();
                            cfg.enabled = val;
                            this.saveSettings();
                            if (this.copyManager) {
                                if (val) this.copyManager.initTableCopy();
                                else this.copyManager.destroyTableCopy();
                            }
                        }
                    }
                ]),
                createCompactSection(this.t('settingsGroupTabPrivacy') || 'Tabs & Privacy', [
                    createTabVisibilityItem('prompts'),
                    createTabVisibilityItem('outline'),
                    createTabVisibilityItem('conversations'),
                    createTabVisibilityItem('export'),
                    {
                        label: this.t('tabAutoRenameLabel') || 'Auto Rename Tab',
                        type: 'toggle',
                        value: tabSettings.enabled !== false,
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            cfg.enabled = val;
                            this.saveSettings();
                            if (this.tabRenameManager) {
                                if (val) this.tabRenameManager.start();
                                else this.tabRenameManager.stop();
                            }
                        }
                    },
                    {
                        label: this.t('tabShowStatusLabel') || 'Show Generation Status',
                        type: 'toggle',
                        value: tabSettings.showStatus !== false,
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            cfg.showStatus = val;
                            this.saveSettings();
                            if (this.tabRenameManager) this.tabRenameManager.updateTabName(true);
                        }
                    },
                    {
                        label: this.t('tabPlaySoundLabel') || 'Play Notification Sound',
                        type: 'toggle',
                        value: tabSettings.notificationSound || false,
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            cfg.notificationSound = val;
                            if (cfg.notificationVolume == null) cfg.notificationVolume = 0.5;
                            this.saveSettings();
                            if (this.tabRenameManager) {
                                if (val) this.tabRenameManager.ensureNotificationAudioUnlock();
                                else this.tabRenameManager.teardownNotificationAudioUnlock();
                            }
                            rerenderSettings();
                        }
                    },
                    tabSettings.notificationSound ? {
                        label: this.t('tabVolumeLabel') || 'Notification Volume',
                        type: 'number',
                        value: tabSettings.notificationVolume || 0.5,
                        min: 0.1,
                        max: 1,
                        step: 0.1,
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            let volume = parseFloat(val);
                            if (isNaN(volume)) volume = 0.5;
                            cfg.notificationVolume = Math.max(0.1, Math.min(1, volume));
                            this.saveSettings();
                        }
                    } : null,
                    {
                        label: this.t('tabPrivacyModeLabel') || 'Privacy Mode',
                        type: 'toggle',
                        value: tabSettings.privacyMode || false,
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            cfg.privacyMode = val;
                            this.saveSettings();
                            if (this.tabRenameManager) this.tabRenameManager.updateTabName(true);
                            rerenderSettings();
                        }
                    },
                    tabSettings.privacyMode ? {
                        label: this.t('tabPrivacyTitleLabel') || 'Privacy Title',
                        type: 'text',
                        value: tabSettings.privacyTitle || 'ChatGPT',
                        onChange: (val) => {
                            const cfg = ensureTabSettings();
                            cfg.privacyTitle = val || 'ChatGPT';
                            this.saveSettings();
                            if (this.tabRenameManager) this.tabRenameManager.updateTabName(true);
                        }
                    } : null
                ])
            ];

            sections.forEach(section => settingsContent.appendChild(section));

            const aboutFooter = createElement('div', {
                className: 'chatgpt-helper-settings-footer'
            });
            const aboutBtn = createElement('button', {
                className: 'chatgpt-helper-about-btn',
                type: 'button'
            }, this.t('aboutButton') || 'About');
            aboutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openAboutModal(e.currentTarget);
            });
            aboutFooter.appendChild(aboutBtn);
            settingsContent.appendChild(aboutFooter);

            container.appendChild(settingsContent);
        }
    });
})();
