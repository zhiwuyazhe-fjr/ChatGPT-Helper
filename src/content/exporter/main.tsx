import { render } from "preact";
import { DirectMenu } from "./ui/DirectMenu";
import { acceptExportHost } from "./legacy-host";
import { ExportSession } from "./session";
import { SessionContext } from "./ui/SessionContext";
import { BUILD_ID, EXPORT_PROTOCOL } from "../shared/build";
import { syncLanguageFromHelper } from "./i18n";
import type { ExportHost } from "./host";
import "./styles/missing-tailwind.css";
import "./styles/workspace.css";

let disposeCurrent: (() => void) | undefined;
function mount(target: Element, host: ExportHost) {
  host = acceptExportHost(host);
  disposeCurrent?.();
  syncLanguageFromHelper(host.getContext().language);
  const root = document.createElement("div");
  root.className = "gh-export-root";
  root.setAttribute("data-gh-owned", "export");
  target.append(root);
  const portal = document.createElement("div");
  portal.className = "gh-export-portal";
  portal.setAttribute("data-gh-owned", "export");
  document.body.append(portal);
  const session = new ExportSession(host, portal);
  const controller = {
    openImage: () => root.dispatchEvent(new Event("open-image")),
    contextChanged: () => {
      session.contextChanged();
      root.dispatchEvent(new Event("context-changed"));
    },
    setLanguage: (language: string) => syncLanguageFromHelper(language),
    destroy: () => {
      session.dispose();
      render(null, root);
      root.remove();
      portal.remove();
      if (disposeCurrent === controller.destroy) {
        disposeCurrent = undefined;
      }
    },
  };
  disposeCurrent = controller.destroy;
  try {
    render(
      <SessionContext.Provider value={session}>
        <DirectMenu container={root} host={host} />
      </SessionContext.Provider>,
      root,
    );
  } catch (error) {
    controller.destroy();
    throw error;
  }
  return controller;
}
const namespace = (window.__MY_EXT__ = window.__MY_EXT__ || {});
namespace.exporter = { mount, buildId: BUILD_ID, protocol: EXPORT_PROTOCOL };
// Diagnostic compatibility only. All application calls use the typed host contract.
namespace.ChatGPTExporterMount = mount;
