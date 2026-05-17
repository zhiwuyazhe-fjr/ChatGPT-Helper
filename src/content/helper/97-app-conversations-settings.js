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

        createCollapsibleSection(title, content, options = {}) {
            const { defaultExpanded = false } = options;
            const section = createElement('div', {
                className: 'chatgpt-helper-setting-section',
                style: {
                    marginBottom: '18px',
                    background: 'var(--gh-bg-secondary)',
                    borderRadius: '16px',
                    border: '1px solid var(--gh-border)',
                    overflow: 'visible'
                }
            });

            // 标题栏（可点击折叠/展开）
            const header = createElement('div', {
                className: 'chatgpt-helper-setting-section-header',
                style: {
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    userSelect: 'none',
                    padding: '16px 18px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--gh-text)',
                    transition: 'background 0.2s, border-color 0.2s',
                    textAlign: 'center',
                    position: 'relative'
                }
            });

            const headerLeft = createElement('div', {
                className: 'chatgpt-helper-setting-section-header-inner',
                style: 'display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;'
            });
            // 箭头
            const arrow = createElement('span', {
                style: 'font-size: 12px; color: var(--gh-text-secondary); transition: transform 0.2s; display: inline-block; position: absolute; right: 2px;',
                className: 'collapse-arrow'
            }, '▶');

            const headerTitle = createElement('span', {
                className: 'chatgpt-helper-setting-section-title'
            }, title);
            headerLeft.appendChild(arrow);
            headerLeft.appendChild(headerTitle);

            header.appendChild(headerLeft);
            section.appendChild(header);

            // 内容容器
            const contentContainer = createElement('div', {
                className: 'chatgpt-helper-setting-section-content',
                style: `display: ${defaultExpanded ? 'block' : 'none'}; padding: 0 16px 16px 16px;`
            });
            contentContainer.appendChild(content);

            // 切换折叠状态
            let isExpanded = defaultExpanded;
            const updateState = () => {
                contentContainer.style.display = isExpanded ? 'block' : 'none';
                arrow.style.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
                header.style.background = isExpanded ? 'var(--gh-hover)' : 'transparent';
            };
            // 初始化状态
            if (defaultExpanded) {
                arrow.style.transform = 'rotate(90deg)';
                header.style.background = 'var(--gh-hover)';
            }

            header.addEventListener('click', () => {
                isExpanded = !isExpanded;
                updateState();
            });
            header.addEventListener('mouseenter', () => {
                if (!isExpanded) {
                    header.style.background = 'var(--gh-hover)';
                }
            });
            header.addEventListener('mouseleave', () => {
                if (!isExpanded) {
                    header.style.background = 'transparent';
                }
            });

            section.appendChild(contentContainer);
            return section;
        },

        createSettingSection(title, items, options = {}) {
            const { collapsible = true, defaultExpanded = false } = options;

            // 创建内容容器
            const content = createElement('div', {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }
            });

            items.forEach(item => {
                const itemEl = createElement('div', {
                    className: 'chatgpt-helper-setting-item',
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 16px',
                        borderBottom: 'none'
                    }
                });

                const label = createElement('div', {
                    className: 'chatgpt-helper-setting-item-label',
                    style: {
                        fontSize: '14px',
                        color: 'var(--gh-text)',
                        flex: 1,
                        paddingLeft: '2px',
                        textAlign: 'left'
                    }
                }, item.label);
                itemEl.appendChild(label);

                let control;
                if (item.type === 'toggle') {
                    control = createElement('button', {
                        className: `chatgpt-helper-toggle${item.value ? ' active' : ''}`,
                        type: 'button',
                        'aria-pressed': item.value ? 'true' : 'false'
                    });
                    const toggleCircle = createElement('div', {
                        className: 'chatgpt-helper-toggle-knob'
                    });
                    control.appendChild(toggleCircle);
                    
                    const handleToggle = (e) => {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        const newValue = !item.value;
                        item.value = newValue;
                        control.classList.toggle('active', newValue);
                        control.setAttribute('aria-pressed', newValue ? 'true' : 'false');
                        if (item.onChange) {
                            try {
                                item.onChange(newValue);
                            } catch (err) {
                                console.error('[ChatGPT Helper] Toggle onChange error:', err);
                            }
                        }
                    };
                    
                    control.addEventListener('click', handleToggle);
                    control.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                } else if (item.type === 'select') {
                    const options = item.options || [];
                    const selected = options.find(opt => String(opt.value) === String(item.value)) || options[0];
                    control = createElement('div', {
                        className: 'chatgpt-helper-custom-select',
                        'data-value': selected ? String(selected.value) : ''
                    });
                    const trigger = createElement('button', {
                        className: 'chatgpt-helper-custom-select-trigger',
                        type: 'button',
                        'aria-haspopup': 'listbox',
                        'aria-expanded': 'false'
                    });
                    const triggerText = createElement('span', {
                        className: 'chatgpt-helper-custom-select-value'
                    }, selected ? selected.label : '');
                    const triggerIcon = createElement('span', {
                        className: 'chatgpt-helper-custom-select-icon',
                        'aria-hidden': 'true'
                    }, '▾');
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
                        if (item.onChange) {
                            try {
                                item.onChange(newValue);
                            } catch (err) {
                                console.error('[ChatGPT Helper] Select onChange error:', err);
                            }
                        }
                    };

                    options.forEach(opt => {
                        const isSelected = String(opt.value) === String(item.value);
                        const option = createElement('button', {
                            className: `chatgpt-helper-custom-select-option${isSelected ? ' selected' : ''}`,
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
                        if (control.classList.contains('open')) closeMenu();
                        else openMenu();
                    });
                    trigger.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape') {
                            closeMenu();
                        } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openMenu();
                            const current = menu.querySelector('.chatgpt-helper-custom-select-option.selected')
                                || menu.querySelector('.chatgpt-helper-custom-select-option');
                            if (current) current.focus();
                        }
                    });
                    menu.addEventListener('keydown', (e) => {
                        const optionEls = Array.from(menu.querySelectorAll('.chatgpt-helper-custom-select-option'));
                        const currentIndex = optionEls.indexOf(document.activeElement);
                        if (e.key === 'Escape') {
                            closeMenu();
                            trigger.focus();
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const next = optionEls[Math.min(optionEls.length - 1, currentIndex + 1)] || optionEls[0];
                            if (next) next.focus();
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prev = optionEls[Math.max(0, currentIndex - 1)] || optionEls[optionEls.length - 1];
                            if (prev) prev.focus();
                        }
                    });
                    control.addEventListener('focusout', (e) => {
                        if (!control.contains(e.relatedTarget)) closeMenu();
                    });
                    control.appendChild(trigger);
                    control.appendChild(menu);
                } else if (item.type === 'number') {
                    const inputAttrs = {
                        type: 'number',
                        value: item.value,
                        min: item.min !== undefined ? item.min : 200,
                        max: item.max !== undefined ? item.max : 600,
                        style: {
                            width: '100px',
                            padding: '6px 8px',
                            border: '1px solid var(--gh-border)',
                            borderRadius: '6px',
                            background: 'var(--gh-input-bg)',
                            color: 'var(--gh-text)',
                            fontSize: '14px'
                        }
                    };
                    if (item.step !== undefined) {
                        inputAttrs.step = item.step;
                    }
                    control = createElement('input', inputAttrs);
                    const handleNumberChange = () => {
                        if (item.onChange) {
                            try {
                                item.onChange(control.value);
                            } catch (err) {
                                console.error('[ChatGPT Helper] Number onChange error:', err);
                            }
                        }
                    };
                    control.addEventListener('change', handleNumberChange);
                    control.addEventListener('blur', handleNumberChange);
                    control.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            control.blur();
                            handleNumberChange();
                        }
                    });
                } else if (item.type === 'text') {
                    control = createElement('input', {
                        type: 'text',
                        value: item.value || '',
                        placeholder: item.placeholder || '',
                        style: {
                            flex: 1,
                            maxWidth: '200px',
                            padding: '6px 12px',
                            border: '1px solid var(--gh-border)',
                            borderRadius: '6px',
                            background: 'var(--gh-input-bg)',
                            color: 'var(--gh-text)',
                            fontSize: '14px'
                        }
                    });
                    const handleTextChange = () => {
                        if (item.onChange) {
                            try {
                                item.onChange(control.value);
                            } catch (err) {
                                console.error('[ChatGPT Helper] Text onChange error:', err);
                            }
                        }
                    };
                    control.addEventListener('change', handleTextChange);
                    control.addEventListener('blur', handleTextChange);
                    control.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            control.blur();
                            handleTextChange();
                        }
                    });
                } else if (item.type === 'button') {
                    control = createElement('button', {
                        className: 'chatgpt-helper-theme-launch-btn',
                        type: 'button'
                    }, item.buttonText || this.t('openThemeSettings') || 'Open Theme Settings');
                    control.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (item.onClick) {
                            try {
                                item.onClick();
                            } catch (err) {
                                console.error('[ChatGPT Helper] Button onClick error:', err);
                            }
                        }
                    });
                }

                if (control) {
                    const controls = createElement('div', {
                        className: 'chatgpt-helper-setting-controls',
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flexShrink: 0
                        }
                    });
                    controls.appendChild(control);
                    itemEl.appendChild(controls);
                }
                content.appendChild(itemEl);
            });

            // 如果支持折叠，使用可折叠区域
            if (collapsible) {
                return this.createCollapsibleSection(title, content, { defaultExpanded });
            } else {
                // 不支持折叠，直接返回内容
                const section = createElement('div', {
                    className: 'chatgpt-helper-setting-section',
                    style: {
                        marginBottom: '24px',
                        padding: '18px',
                        background: 'var(--gh-bg-secondary)',
                        borderRadius: '16px',
                        border: '1px solid var(--gh-border)'
                    }
                });
                const sectionTitle = createElement('div', {
                    style: {
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--gh-text-secondary)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        paddingLeft: '4px'
                    }
                }, title);
                section.appendChild(sectionTitle);
                section.appendChild(content);
                return section;
            }
        },

        renderSettings(container) {
            const settingsContent = createElement('div', {
                className: 'chatgpt-helper-settings-scroll',
                style: {
                    padding: '18px 16px 26px',
                    overflowY: 'auto',
                    flex: 1
                }
            });

            // 面板设置（可折叠）
            const panelSection = this.createSettingSection(this.t('panelSettings') || '面板设置', [
                {
                    label: this.t('panelWidthLabel') || '面板宽度',
                    type: 'number',
                    value: this.settings.panelWidth,
                    onChange: (val) => {
                        this.settings.panelWidth = Math.max(200, Math.min(600, parseInt(val) || 320));
                        this.saveSettings();
                        this.adjustChatGPTLayout();
                        this.showToast(this.t('panelWidthUpdated'));
                    }
                },
                {
                    label: this.t('defaultPanelOpenLabel') || '默认展开面板',
                    type: 'toggle',
                    value: this.settings.defaultPanelState,
                    onChange: (val) => {
                        this.settings.defaultPanelState = val;
                        this.saveSettings();
                    }
                }
            ]);

            const themeSection = this.createSettingSection(this.t('themeSettingsSection') || '主题设置', [
                {
                    label: this.t('themeDialogTitle') || '主题',
                    type: 'button',
                    buttonText: this.t('openThemeSettings') || '打开主题设置',
                    onClick: () => {
                        this.openThemeSettingsModal();
                    }
                }
            ], { defaultExpanded: false });

            // 功能设置（可折叠）
            const featureSection = this.createSettingSection(this.t('featureSettings') || '功能设置', [
                {
                    label: this.t('showUserMessagesLabel') || '显示用户消息',
                    type: 'toggle',
                    value: this.settings.outline?.showUserQueries !== false,
                    onChange: (val) => {
                        if (!this.settings.outline) this.settings.outline = {};
                        this.settings.outline.showUserQueries = val;
                        this.saveSettings();
                        if (this.currentTab === 'outline') {
                            this.refreshOutline();
                        }
                    }
                },
                {
                    label: this.t('preventAutoScrollLabel') || '防止自动滚动',
                    type: 'toggle',
                    value: this.settings.preventAutoScroll || false,
                    onChange: (val) => {
                        console.log('[ChatGPT Helper] 切换防止自动滚动:', val);
                        this.settings.preventAutoScroll = val;
                        this.saveSettings();
                        if (!this.scrollLockManager) {
                            console.log('[ChatGPT Helper] 创建新的 ScrollLockManager');
                            this.scrollLockManager = new ScrollLockManager(this.adapter);
                        }
                        console.log('[ChatGPT Helper] 设置 ScrollLockManager.enabled =', val);
                        this.scrollLockManager.setEnabled(val);
                        // 验证状态是否正确设置
                        setTimeout(() => {
                            const actualEnabled = this.scrollLockManager?.enabled;
                            console.log('[ChatGPT Helper] 防止自动滚动状态:', {
                                期望: val,
                                实际: actualEnabled,
                                一致: val === actualEnabled
                            });
                            if (val !== actualEnabled) {
                                console.warn('[ChatGPT Helper] 警告：状态不一致！');
                            }
                        }, 100);
                        this.showToast(`${this.t(val ? 'enabled' : 'disabled')} ${this.t('preventAutoScrollLabel')}`);
                    }
                },
                {
                    label: this.t('tabPlaySoundLabel') || '播放通知声音',
                    type: 'toggle',
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
                    label: this.t('tabVolumeLabel') || '通知音量（0.1-1.0）',
                    type: 'number',
                    value: this.settings.tabSettings?.notificationVolume || 0.5,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1,
                    onChange: (val) => {
                        if (!this.settings.tabSettings) this.settings.tabSettings = {};
                        let v = parseFloat(val);
                        if (isNaN(v)) v = 0.5;
                        v = Math.max(0.1, Math.min(1.0, v));
                        this.settings.tabSettings.notificationVolume = v;
                        this.saveSettings();
                    }
                },
                {
                    label: this.t('tabAutoFocusLabel') || '自动聚焦窗口',
                    type: 'toggle',
                    value: this.settings.tabSettings?.autoFocus || false,
                    onChange: (val) => {
                        if (!this.settings.tabSettings) this.settings.tabSettings = {};
                        this.settings.tabSettings.autoFocus = val;
                        this.saveSettings();
                    }
                }
            ]);

            // 页面设置（可折叠）
            const pageSection = this.createSettingSection(this.t('pageSettings') || '页面设置', [
                {
                    label: this.t('limitPageWidthLabel') || '限制页面宽度',
                    type: 'toggle',
                    value: this.settings.pageWidth?.enabled || false,
                    onChange: (val) => {
                        if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: 'px' };
                        this.settings.pageWidth.enabled = val;
                        this.saveSettings();
                        if (this.widthStyleManager) {
                            this.widthStyleManager.updateConfig(this.settings.pageWidth);
                        }
                        this.showToast(`${this.t(val ? 'enabled' : 'disabled')} ${this.t('limitPageWidthLabel')}`);
                    }
                },
                {
                    label: this.t('pageWidthValueLabel') || '页面宽度值',
                    type: 'number',
                    value: this.settings.pageWidth?.value || 1200,
                    onChange: (val) => {
                        if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: 'px' };
                        this.settings.pageWidth.value = Math.max(800, Math.min(2000, parseInt(val) || 1200));
                        this.saveSettings();
                        if (this.widthStyleManager && this.settings.pageWidth.enabled) {
                            this.widthStyleManager.updateConfig(this.settings.pageWidth);
                        }
                    }
                },
                {
                    label: this.t('pageWidthUnitLabel') || '宽度单位',
                    type: 'select',
                    value: this.settings.pageWidth?.unit || 'px',
                    options: [
                        { value: 'px', label: 'px' },
                        { value: '%', label: '%' },
                        { value: 'rem', label: 'rem' }
                    ],
                    onChange: (val) => {
                        if (!this.settings.pageWidth) this.settings.pageWidth = { enabled: false, value: 1200, unit: 'px' };
                        this.settings.pageWidth.unit = val;
                        this.saveSettings();
                        if (this.widthStyleManager && this.settings.pageWidth.enabled) {
                            this.widthStyleManager.updateConfig(this.settings.pageWidth);
                        }
                    }
                }
            ]);

            // 折叠按钮设置（可折叠）
            const collapsedContainer = createElement('div', {});
            const collapsedBtnDesc = createElement('div', {
                className: 'chatgpt-helper-setting-item-desc',
                style: 'padding: 0 12px 8px 12px; margin-bottom: 4px;'
            }, this.t('collapsedButtonsDesc') || '调整折叠面板按钮的显示顺序');
            collapsedContainer.appendChild(collapsedBtnDesc);

            const currentBtnOrder = this.settings.collapsedButtonsOrder || DEFAULT_COLLAPSED_BUTTONS_ORDER;

            currentBtnOrder.forEach((btnConfig, index) => {
                const def = COLLAPSED_BUTTON_DEFS[btnConfig.id];
                if (!def) return;

                const item = createElement('div', { className: 'chatgpt-helper-setting-item' });
                const info = createElement('div', { className: 'chatgpt-helper-setting-item-info' });
                const label = createElement('div', {
                    className: 'chatgpt-helper-setting-item-label',
                    style: 'display: flex; align-items: center;'
                });
                const iconSpan = createElement('span', {
                    className: 'chatgpt-helper-inline-icon-wrap',
                    style: 'display: inline-flex; width: 24px; min-width: 24px; justify-content: center; align-items: center; margin-right: 6px;'
                });
                iconSpan.appendChild(createCollapsedButtonIconNode(def, {
                    size: 18,
                    className: 'chatgpt-helper-inline-icon'
                }));
                const buttonLabel = def.labelKey ? this.t(def.labelKey) : (def.label || '');
                const textSpan = createElement('span', {}, buttonLabel);
                label.appendChild(iconSpan);
                label.appendChild(textSpan);
                info.appendChild(label);

                const controls = createElement('div', { className: 'chatgpt-helper-setting-controls' });

                // 可切换的按钮（anchor/theme/manualAnchor）添加开关
                if (def.canToggle) {
                    const toggle = createElement('div', {
                        className: 'setting-toggle' + (btnConfig.enabled ? ' active' : ''),
                        style: 'transform: scale(0.8); margin-right: 12px;'
                    });
                    toggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        btnConfig.enabled = !btnConfig.enabled;
                        toggle.classList.toggle('active', btnConfig.enabled);
                        this.settings.collapsedButtonsOrder = currentBtnOrder;
                        this.saveSettings();
                        this.createCollapsedButtons();
                        this.showToast(btnConfig.enabled ? (this.t('enabled') || '已启用') : (this.t('disabled') || '已禁用'));
                    });
                    controls.appendChild(toggle);
                }

                // 上下移动按钮
                const upBtn = createElement('button', {
                    className: 'prompt-panel-btn chatgpt-helper-order-btn',
                    title: this.t('moveUp') || '上移'
                });
                upBtn.appendChild(createSvgIconNode('arrowUp', { size: 15 }));
                upBtn.disabled = index === 0;

                const downBtn = createElement('button', {
                    className: 'prompt-panel-btn chatgpt-helper-order-btn',
                    title: this.t('moveDown') || '下移'
                });
                downBtn.appendChild(createSvgIconNode('arrowDown', { size: 15 }));
                downBtn.disabled = index === currentBtnOrder.length - 1;

                [upBtn, downBtn].forEach((btn) => {
                    if (btn.disabled) {
                        btn.style.opacity = '0.4';
                        btn.style.cursor = 'not-allowed';
                    } else {
                        btn.style.opacity = '1';
                        btn.style.cursor = 'pointer';
                    }
                });

                upBtn.addEventListener('click', () => {
                    if (index > 0) {
                        const newOrder = [...currentBtnOrder];
                        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                        this.settings.collapsedButtonsOrder = newOrder;
                        this.saveSettings();
                        this.createCollapsedButtons();
                        this.showToast(this.t('buttonOrderUpdated') || '已更新按钮顺序');
                    }
                });

                downBtn.addEventListener('click', () => {
                    if (index < currentBtnOrder.length - 1) {
                        const newOrder = [...currentBtnOrder];
                        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                        this.settings.collapsedButtonsOrder = newOrder;
                        this.saveSettings();
                        this.createCollapsedButtons();
                        this.showToast(this.t('buttonOrderUpdated') || '已更新按钮顺序');
                    }
                });

                controls.appendChild(upBtn);
                controls.appendChild(downBtn);

                item.appendChild(info);
                item.appendChild(controls);
                collapsedContainer.appendChild(item);
            });

            const collapsedSection = this.createCollapsibleSection(this.t('collapsedButtonsTitle') || '折叠按钮', collapsedContainer, { defaultExpanded: false });

            // Tab顺序设置（可折叠）
            const tabOrderSection = this.createSettingSection(this.t('tabOrderSettings') || 'tab栏功能', [
                {
                    label: this.t('tabPrompts') || '提示词',
                    type: 'toggle',
                    value: this.settings.tabOrder?.includes('prompts') !== false,
                    onChange: (val) => {
                        if (!this.settings.tabOrder) this.settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
                        if (val && !this.settings.tabOrder.includes('prompts')) {
                            this.settings.tabOrder.push('prompts');
                        } else if (!val) {
                            this.settings.tabOrder = this.settings.tabOrder.filter(t => t !== 'prompts');
                        }
                        this.saveSettings();
                        this.createUI();
                    }
                },
                {
                    label: this.t('tabOutline') || '大纲',
                    type: 'toggle',
                    value: this.settings.tabOrder?.includes('outline') !== false,
                    onChange: (val) => {
                        if (!this.settings.tabOrder) this.settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
                        if (val && !this.settings.tabOrder.includes('outline')) {
                            this.settings.tabOrder.push('outline');
                        } else if (!val) {
                            this.settings.tabOrder = this.settings.tabOrder.filter(t => t !== 'outline');
                        }
                        this.saveSettings();
                        this.createUI();
                    }
                },
                {
                    label: this.t('tabConversations') || '会话',
                    type: 'toggle',
                    value: this.settings.tabOrder?.includes('conversations') !== false,
                    onChange: (val) => {
                        if (!this.settings.tabOrder) this.settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
                        if (val && !this.settings.tabOrder.includes('conversations')) {
                            this.settings.tabOrder.push('conversations');
                        } else if (!val) {
                            this.settings.tabOrder = this.settings.tabOrder.filter(t => t !== 'conversations');
                        }
                        this.saveSettings();
                        this.createUI();
                    }
                },
                {
                    label: this.t('tabExport') || '导出',
                    type: 'toggle',
                    value: this.settings.tabOrder?.includes('export') !== false,
                    onChange: (val) => {
                        if (!this.settings.tabOrder) this.settings.tabOrder = ['prompts', 'outline', 'conversations', 'export'];
                        if (val && !this.settings.tabOrder.includes('export')) {
                            this.settings.tabOrder.push('export');
                        } else if (!val) {
                            this.settings.tabOrder = this.settings.tabOrder.filter(t => t !== 'export');
                        }
                        this.saveSettings();
                        this.createUI();
                    }
                }
            ]);

            const savedLanguagePreference = window.GM_getValue(SETTING_KEYS.LANGUAGE, 'auto');
            const languageValue = savedLanguagePreference === 'auto' || I18N[savedLanguagePreference]
                ? savedLanguagePreference
                : 'auto';

            // 语言设置（可折叠）
            const languageSection = this.createSettingSection(t('languageSettings'), [
                {
                    label: t('language'),
                    type: 'select',
                    value: languageValue,
                    options: [
                        { value: 'auto', label: t('autoDetect') },
                        { value: 'zh-CN', label: t('chinese') },
                        { value: 'en', label: t('english') }
                    ],
                    onChange: (val) => {
                        window.GM_setValue(SETTING_KEYS.LANGUAGE, val);
                        setCurrentLang(val === 'auto' ? detectLanguage() : val);
                        if (this.syncExporterLanguage) {
                            this.syncExporterLanguage();
                        }
                        this.lang = val;
                        this.selectedCategory = this.t('allCategory');
                        if (!window.GM_getValue(SETTING_KEYS.PROMPTS, null)) {
                            this.prompts = createDefaultPrompts();
                        }
                        // 重新渲染UI以应用新语言
                        this.createUI();
                        this.showToast(this.t('languageChanged'));
                    }
                }
            ]);

            // 阅读历史设置（可折叠）
            const readingHistorySection = this.createSettingSection(this.t('readingHistory') || '阅读历史', [
                {
                    label: this.t('enableReadingHistoryLabel') || '启用阅读历史',
                    type: 'toggle',
                    value: this.settings.readingHistory?.persistence !== false,
                    onChange: (val) => {
                        if (!this.settings.readingHistory) this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
                        this.settings.readingHistory.persistence = val;
                        this.saveSettings();
                        if (val && this.readingProgressManager) {
                            this.readingProgressManager.startRecording();
                        }
                        this.showToast(`${this.t(val ? 'enabled' : 'disabled')} ${this.t('readingHistory')}`);
                    }
                },
                {
                    label: this.t('autoRestoreLabel') || '自动跳转',
                    type: 'toggle',
                    value: this.settings.readingHistory?.autoRestore || false,
                    onChange: (val) => {
                        if (!this.settings.readingHistory) this.settings.readingHistory = { persistence: true, autoRestore: false, cleanupDays: 30 };
                        this.settings.readingHistory.autoRestore = val;
                        this.saveSettings();
                        this.showToast(`${this.t(val ? 'enabled' : 'disabled')} ${this.t('autoRestoreLabel')}`);
                    }
                },
                {
                    label: this.t('historyDaysLabel') || '历史保留时间（天）',
                    type: 'number',
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

            // 大纲设置（可折叠）
            const outlineSettingsSection = this.createSettingSection(this.t('outlineSettings') || '大纲设置', [
                {
                    label: this.t('autoUpdateOutlineLabel') || '对话期间自动更新大纲',
                    type: 'toggle',
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
                    label: this.t('outlineIntervalLabel') || '更新检测间隔（秒）',
                    type: 'number',
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
                    label: this.t('outlineSyncScrollLabel') || '同步滚动',
                    type: 'toggle',
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
                    label: this.t('outlineMaxLevelLabel') || '最大标题层级',
                    type: 'select',
                    value: this.settings.outline?.maxLevel || 6,
                    options: [
                        { value: 1, label: this.t('outlineLevelOnlyH1') },
                        { value: 2, label: 'H1-H2' },
                        { value: 3, label: 'H1-H3' },
                        { value: 4, label: 'H1-H4' },
                        { value: 5, label: 'H1-H5' },
                        { value: 6, label: this.t('outlineLevelAll') }
                    ],
                    onChange: (val) => {
                        if (!this.settings.outline) this.settings.outline = {};
                        this.settings.outline.maxLevel = parseInt(val) || 6;
                        this.saveSettings();
                        if (this.currentTab === 'outline') {
                            this.refreshOutline();
                        }
                    }
                }
            ]);

            // 标签页设置（可折叠）
            const tabSettingsSection = this.createSettingSection(this.t('tabPageSettings') || '标签页设置', [
                {
                    label: this.t('tabAutoRenameLabel') || '自动重命名标签页',
                    type: 'toggle',
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
                    label: this.t('tabRenameIntervalLabel') || '重命名检测间隔（秒）',
                    type: 'number',
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
                    label: this.t('tabShowStatusLabel') || '显示生成状态',
                    type: 'toggle',
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
                    label: this.t('tabPrivacyModeLabel') || '隐私模式',
                    type: 'toggle',
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
                    label: this.t('tabPrivacyTitleLabel') || '隐私模式标题',
                    type: 'text',
                    value: this.settings.tabSettings?.privacyTitle || 'ChatGPT',
                    onChange: (val) => {
                        if (!this.settings.tabSettings) this.settings.tabSettings = {};
                        this.settings.tabSettings.privacyTitle = val || 'ChatGPT';
                        this.saveSettings();
                        if (this.tabRenameManager) {
                            this.tabRenameManager.updateTabName(true);
                        }
                    }
                }
            ]);

            // 复制功能设置（可折叠）
            const copySettingsSection = this.createSettingSection(this.t('copySettings') || '复制功能', [
                {
                    label: this.t('enableFormulaCopyLabel') || '启用公式复制',
                    type: 'toggle',
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
                    label: this.t('formulaDelimiterLabel') || '公式使用 LaTeX 分隔符（$ / $$）',
                    type: 'toggle',
                    value: this.settings.formulaCopy?.delimiterEnabled !== false,
                    onChange: (val) => {
                        if (!this.settings.formulaCopy) this.settings.formulaCopy = { enabled: true, delimiterEnabled: true };
                        this.settings.formulaCopy.delimiterEnabled = val;
                        this.saveSettings();
                    }
                },
                {
                    label: this.t('enableTableCopyLabel') || '启用表格复制',
                    type: 'toggle',
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
                this.openAboutModal();
            });
            aboutFooter.appendChild(aboutBtn);
            settingsContent.appendChild(aboutFooter);

            container.appendChild(settingsContent);
        }
    });
})();
