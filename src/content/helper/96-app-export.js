import { conversationIdFromPath } from '../shared/conversation-context.js';
import { BUILD_ID, EXPORT_PROTOCOL } from '../shared/build';
import { createElement, getCurrentLang } from './10-base.js';
import { snapshotMessages } from './66-message-snapshot.js';

// The helper owns mounting, language, message identity and lifetime. The optional
// exporter owns conversion and its dialogs; it never watches the host page.
export const ExportFeature = {
    syncExporterLanguage() {
        this.exporterController?.setLanguage(getCurrentLang());
    },

    async loadExportDependency(dependency = 'engine') {
        this._exportLoads ||= new Map();
        const ready = () => dependency === 'engine' ? (window.__MY_EXT__?.exporter?.buildId === BUILD_ID ? window.__MY_EXT__.exporter : null) :
            window.JSZip;
        if (ready()) return ready();
        if (this._exportLoads.has(dependency)) return this._exportLoads.get(dependency);
        const promise = new Promise((resolve, reject) => {
            const runtime = globalThis.chrome?.runtime;
            if (!runtime?.id) return reject(new Error(this.t('exportEngineInjectFailed')));
            runtime.sendMessage({ type: 'ch-helper-inject-export-deps', dependency, buildId: BUILD_ID }, response => {
                const error = runtime.lastError;
                if (error || !response?.ok || !ready()) reject(new Error(error?.message || response?.error || this.t('exportModuleMissing')));
                else resolve(ready());
            });
        });
        this._exportLoads.set(dependency, promise);
        try { return await promise; }
        finally { this._exportLoads.delete(dependency); }
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
        if (!window.__MY_EXT__?.exporter) host.appendChild(loading);
        try {
            const engine = await this.loadExportDependency();
            if (this.destroyed || revision !== this._exportRevision || !host.isConnected) return;
            loading.remove();
            this.exporterController = engine.mount(host, {
                protocol: EXPORT_PROTOCOL, buildId: BUILD_ID,
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
            const retry = createElement('button', { className: 'chatgpt-helper-btn', type: 'button' }, this.t('refresh'));
            retry.addEventListener('click', () => { container.replaceChildren(); this.renderExport(container); });
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
