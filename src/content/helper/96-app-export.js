import { conversationIdFromPath } from '../shared/conversation-context.js';
import { EXPORT_PROTOCOL } from '../shared/build';
import { createElement, getCurrentLang } from './10-base.js';
import { snapshotMessages } from './66-message-snapshot.js';

// The helper owns mounting, language, message identity and lifetime. The optional
// exporter owns conversion and its dialogs; it never watches the host page.
export const ExportFeature = {
    syncExporterLanguage() {
        this.exporterController?.setLanguage(getCurrentLang());
    },

    async loadExportDependency(dependency = 'engine') {
        const runtime = globalThis.chrome?.runtime;
        if (!runtime?.id) throw new Error(this.t('exportEngineInjectFailed'));
        if (dependency === 'zip') {
            await import(/* @vite-ignore */ runtime.getURL('libs/jszip.min.js'));
            if (typeof window.JSZip !== 'function') throw new Error(this.t('exportModuleLoadFailed'));
            return window.JSZip;
        }
        const engine = await import(/* @vite-ignore */ runtime.getURL('libs/chatgpt-export-engine.js'));
        if (engine.protocol !== EXPORT_PROTOCOL || typeof engine.mount !== 'function') {
            throw new Error(this.t('exportProtocolMismatch'));
        }
        return engine;
    },

    disposeExporter() {
        this._exportRevision = (this._exportRevision || 0) + 1;
        this.exporterController?.destroy();
        this.exporterController = null;
    },

    async renderExport(container) {
        this.disposeExporter();
        const revision = this._exportRevision;
        container.classList.add('chatgpt-helper-export-panel');
        const host = createElement('div', { className: 'chatgpt-helper-export-container', id: 'chatgpt-helper-export-container' });
        const loading = createElement('div', { className: 'chatgpt-helper-export-engine-loading', role: 'status' }, this.t('exportEngineLoading'));
        container.appendChild(host);
        host.appendChild(loading);
        try {
            const engine = await this.loadExportDependency();
            if (this.destroyed || revision !== this._exportRevision || !host.isConnected) return;
            loading.remove();
            this.exporterController = engine.mount(host, {
                protocol: EXPORT_PROTOCOL,
                request: (path, options) => this.backend.json(path, options),
                getMessages: () => snapshotMessages(this.adapter),
                getSelectedMessages: () => this.messageSelectManager.collectSelectedMessages(),
                subscribe: listener => this.messageSelectManager.subscribe(listener),
                getContext: () => ({
                    origin: location.origin, conversationId: conversationIdFromPath(location.pathname),
                    path: location.pathname, title: this.adapter.getSessionName() || 'ChatGPT',
                    language: getCurrentLang(), theme: this.currentEffectiveTheme,
                }),
                notify: message => this.showToast(message),
                loadDependency: dependency => this.loadExportDependency(dependency),
            });
            if (this._openImageOnMount) {
                this._openImageOnMount = false;
                this.exporterController.openImage();
            }
        } catch (error) {
            if (revision !== this._exportRevision || !host.isConnected) return;
            loading.remove();
            const message = createElement('p', { className: 'chatgpt-helper-export-engine-error', role: 'alert' }, error.message);
            const retry = createElement('button', { className: 'chatgpt-helper-btn', type: 'button' }, this.t('reloadPage'));
            retry.addEventListener('click', () => location.reload());
            host.append(message, retry);
        }
    },

    openImageExport() {
        if (this.exporterController && this.currentTab === 'export') this.exporterController.openImage();
        else {
            this._openImageOnMount = true;
            if (this.isCollapsed) this.toggleCollapse();
            this.switchTab('export');
        }
    },
};
