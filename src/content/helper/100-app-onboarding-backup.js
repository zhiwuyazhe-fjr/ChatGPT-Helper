// Chrome Extension Content Script - ChatGPT Helper Onboarding & Backup
// 首次使用引导 + 数据备份/恢复（提示词、设置、主题壁纸、会话整理数据）
(function () {
    'use strict';

    const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
    const H = root.helper = root.helper || {};
    const {
        SETTING_KEYS,
        EXTENSION_VERSION,
        createElement,
        createHelperLogoNode,
        createSvgIconNode
    } = H;

    const BACKUP_APP_MARKER = 'chatgpt-helper';
    const BACKUP_FORMAT_VERSION = 1;

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = String(reader.result || '');
                    const commaIndex = result.indexOf(',');
                    resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
                };
                reader.onerror = () => reject(reader.error || new Error('read blob failed'));
                reader.readAsDataURL(blob);
            } catch (e) {
                reject(e);
            }
        });
    }

    function base64ToBlob(base64, mimeType) {
        const binary = atob(String(base64 || ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new Blob([bytes], { type: mimeType || 'application/octet-stream' });
    }

    function formatBackupTimestamp() {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    }

    if (!H.ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper is not loaded; skipping App Onboarding & Backup module');
        return;
    }
    const ChatGPTHelperClass = H.ChatGPTHelper;

    Object.assign(ChatGPTHelperClass.prototype, {
        // ==================== 新手引导 ====================

        maybeShowOnboarding(options = {}) {
            try {
                const done = window.GM_getValue(SETTING_KEYS.ONBOARDING_DONE, null);
                if (!options.force && done) return;
                this.showOnboardingOverlay();
            } catch (e) {
                console.error('[ChatGPT Helper] 显示新手引导失败:', e);
            }
        },

        showOnboardingOverlay() {
            const existing = document.getElementById('chatgpt-helper-onboarding-overlay');
            if (existing) existing.remove();

            const overlay = createElement('div', {
                // id 前缀用于被主题壁纸的"body 直属容器透明化"规则排除
                id: 'chatgpt-helper-onboarding-overlay',
                className: 'gh-onboarding-overlay',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': this.t('onboardingTitle')
            });
            const card = createElement('div', { className: 'gh-onboarding-card' });

            const header = createElement('div', { className: 'gh-onboarding-header' });
            header.appendChild(createHelperLogoNode({
                size: 30,
                className: 'gh-onboarding-logo',
                title: 'ChatGPT Helper'
            }));
            const headerText = createElement('div', { className: 'gh-onboarding-header-text' });
            headerText.appendChild(createElement('div', { className: 'gh-onboarding-title' }, this.t('onboardingTitle')));
            headerText.appendChild(createElement('div', { className: 'gh-onboarding-subtitle' }, this.t('onboardingSubtitle')));
            header.appendChild(headerText);
            card.appendChild(header);

            const steps = createElement('div', { className: 'gh-onboarding-steps' });
            const stepDefs = [
                { icon: 'edit', titleKey: 'onboardingStep1Title', descKey: 'onboardingStep1Desc' },
                { icon: 'message', titleKey: 'onboardingStep2Title', descKey: 'onboardingStep2Desc' },
                { icon: 'list', titleKey: 'onboardingStep3Title', descKey: 'onboardingStep3Desc' }
            ];
            stepDefs.forEach((def, index) => {
                const step = createElement('div', { className: 'gh-onboarding-step' });
                const badge = createElement('div', { className: 'gh-onboarding-step-badge' });
                badge.appendChild(createSvgIconNode(def.icon, { size: 15 }));
                step.appendChild(badge);
                const text = createElement('div', { className: 'gh-onboarding-step-text' });
                text.appendChild(createElement('div', { className: 'gh-onboarding-step-title' }, `${index + 1}. ${this.t(def.titleKey)}`));
                text.appendChild(createElement('div', { className: 'gh-onboarding-step-desc' }, this.t(def.descKey)));
                step.appendChild(text);
                steps.appendChild(step);
            });
            card.appendChild(steps);

            const startBtn = createElement('button', {
                className: 'gh-onboarding-start-btn',
                type: 'button'
            }, this.t('onboardingStart'));
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                try {
                    window.GM_setValue(SETTING_KEYS.ONBOARDING_DONE, true);
                } catch (err) {
                    console.error('[ChatGPT Helper] 保存引导完成标记失败:', err);
                }
                overlay.remove();
            });
            card.appendChild(startBtn);

            overlay.appendChild(card);
            document.body.appendChild(overlay);
            overlay.addEventListener('click', (e) => {
                // 点击遮罩不关闭，避免误触后无法再次看到引导（可在设置中重看）
                if (e.target === overlay) {
                    overlay.classList.add('gh-onboarding-pulse');
                    setTimeout(() => overlay.classList.remove('gh-onboarding-pulse'), 300);
                }
            });
        },

        // ==================== 数据备份与恢复 ====================

        async collectBackupData() {
            const data = {};
            const prompts = window.GM_getValue(SETTING_KEYS.PROMPTS, null);
            data.prompts = Array.isArray(prompts) ? prompts : (this.prompts || []);
            const settings = window.GM_getValue(SETTING_KEYS.SETTINGS, null);
            data.settings = settings && typeof settings === 'object'
                ? settings
                : (typeof this.serializeSettingsForStorage === 'function' ? this.serializeSettingsForStorage() : {});
            data.language = window.GM_getValue(SETTING_KEYS.LANGUAGE, 'auto');
            data.promptLibraryVersion = window.GM_getValue(SETTING_KEYS.PROMPT_LIBRARY_VERSION, null);
            data.conversations = window.GM_getValue(SETTING_KEYS.CONVERSATIONS, null);
            data.readingProgress = window.GM_getValue(SETTING_KEYS.READING_PROGRESS, null);

            // 主题壁纸（IndexedDB）转 base64
            data.themeAssets = [];
            try {
                if (this.themeAssetRepository && typeof this.themeAssetRepository.getAllAssets === 'function') {
                    const assets = await this.themeAssetRepository.getAllAssets();
                    for (const asset of assets || []) {
                        if (!asset || !asset.blob) continue;
                        data.themeAssets.push({
                            id: asset.id,
                            mimeType: asset.mimeType,
                            size: asset.size,
                            createdAt: asset.createdAt,
                            dataBase64: await blobToBase64(asset.blob)
                        });
                    }
                }
            } catch (e) {
                console.warn('[ChatGPT Helper] 备份主题壁纸失败:', e);
            }
            return data;
        },

        async exportBackupData() {
            try {
                const data = await this.collectBackupData();
                const backup = {
                    app: BACKUP_APP_MARKER,
                    formatVersion: BACKUP_FORMAT_VERSION,
                    extensionVersion: EXTENSION_VERSION,
                    exportedAt: new Date().toISOString(),
                    data
                };
                const json = JSON.stringify(backup, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = createElement('a', {
                    href: url,
                    download: `chatgpt-helper-backup-${formatBackupTimestamp()}.json`
                });
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    link.remove();
                    URL.revokeObjectURL(url);
                }, 1000);
                this.showToast(this.t('backupExportSuccess'));
            } catch (e) {
                console.error('[ChatGPT Helper] 导出备份失败:', e);
                this.showToast(this.t('operationFailed'));
            }
        },

        importBackupData() {
            try {
                const existingInput = document.getElementById('gh-backup-import-input');
                if (existingInput) existingInput.remove();
                const input = createElement('input', {
                    id: 'gh-backup-import-input',
                    type: 'file',
                    accept: 'application/json,.json'
                });
                input.style.display = 'none';
                document.body.appendChild(input);
                input.addEventListener('change', async () => {
                    const file = input.files && input.files[0];
                    input.remove();
                    if (!file) return;
                    try {
                        const text = await file.text();
                        const parsed = JSON.parse(text);
                        if (!parsed || parsed.app !== BACKUP_APP_MARKER || !parsed.data || typeof parsed.data !== 'object') {
                            this.showToast(this.t('backupInvalidFile'));
                            return;
                        }
                        if (!confirm(this.t('backupImportConfirm'))) {
                            return;
                        }
                        await this.applyBackupData(parsed.data);
                    } catch (e) {
                        console.error('[ChatGPT Helper] 导入备份失败:', e);
                        this.showToast(this.t('backupImportFailed'));
                    }
                });
                input.click();
            } catch (e) {
                console.error('[ChatGPT Helper] 打开备份文件失败:', e);
                this.showToast(this.t('operationFailed'));
            }
        },

        async applyBackupData(data) {
            if (Array.isArray(data.prompts)) {
                window.GM_setValue(SETTING_KEYS.PROMPTS, data.prompts);
            }
            if (data.settings && typeof data.settings === 'object') {
                window.GM_setValue(SETTING_KEYS.SETTINGS, data.settings);
            }
            if (typeof data.language === 'string' && data.language) {
                window.GM_setValue(SETTING_KEYS.LANGUAGE, data.language);
            }
            if (data.conversations && typeof data.conversations === 'object') {
                window.GM_setValue(SETTING_KEYS.CONVERSATIONS, data.conversations);
            }
            if (data.readingProgress && typeof data.readingProgress === 'object') {
                window.GM_setValue(SETTING_KEYS.READING_PROGRESS, data.readingProgress);
            }
            if (data.promptLibraryVersion != null) {
                window.GM_setValue(SETTING_KEYS.PROMPT_LIBRARY_VERSION, data.promptLibraryVersion);
            }

            let assetCount = 0;
            if (Array.isArray(data.themeAssets) && data.themeAssets.length > 0) {
                try {
                    if (!this.themeAssetRepository) {
                        this.themeAssetRepository = new (H.ThemeAssetRepository)();
                    }
                    for (const asset of data.themeAssets) {
                        if (!asset || !asset.id || !asset.dataBase64) continue;
                        const blob = base64ToBlob(asset.dataBase64, asset.mimeType);
                        await this.themeAssetRepository.putAsset(blob, asset.mimeType, asset.id);
                        assetCount++;
                    }
                } catch (e) {
                    console.warn('[ChatGPT Helper] 恢复主题壁纸失败:', e);
                }
            }

            const promptCount = Array.isArray(data.prompts) ? data.prompts.length : 0;
            const conversationCount = data.conversations && data.conversations.conversations
                ? Object.keys(data.conversations.conversations || {}).length
                : 0;
            const summary = (this.t('backupIncludeHint') || '')
                .replace('{prompts}', String(promptCount))
                .replace('{conversations}', String(conversationCount))
                .replace('{assets}', String(assetCount));
            this.showToast(`${this.t('backupImportSuccess')} · ${summary}`);
            setTimeout(() => {
                try {
                    window.location.reload();
                } catch (e) {
                    console.error('[ChatGPT Helper] 刷新页面失败:', e);
                }
            }, 2500);
        }
    });
})();
