import { render } from 'preact';
import { DirectMenu } from './ui/DirectMenu';
import { setExportHost } from './host';
import { syncLanguageFromHelper } from './i18n';
import type { ExportHost } from './host';
import './styles/missing-tailwind.css';
import './styles/workspace.css';

let disposeCurrent: (() => void) | undefined;
function mount(target: Element, host: ExportHost) {
    disposeCurrent?.();
    syncLanguageFromHelper(host.getContext().language);
    const root = document.createElement('div');
    root.className = 'gh-export-root';
    root.setAttribute('data-gh-owned', 'export');
    target.append(root);
    const portal = document.createElement('div');
    portal.className = 'gh-export-portal';
    portal.setAttribute('data-gh-owned', 'export');
    document.body.append(portal);
    setExportHost(host, portal);
    const controller = {
        openImage: () => root.dispatchEvent(new Event('open-image')),
        contextChanged: () => root.dispatchEvent(new Event('context-changed')),
        setLanguage: (language: string) => syncLanguageFromHelper(language),
        destroy: () => {
            render(null, root);
            root.remove();
            portal.remove();
            if (disposeCurrent === controller.destroy) { disposeCurrent = undefined; setExportHost(null); }
        },
    };
    disposeCurrent = controller.destroy;
    try { render(<DirectMenu container={root} host={host} />, root); }
    catch (error) { controller.destroy(); throw error; }
    return controller;
}
const namespace = window.__MY_EXT__ = window.__MY_EXT__ || {};
namespace.exporter = { mount };
// Diagnostic compatibility only. All application calls use the typed host contract.
namespace.ChatGPTExporterMount = mount;
