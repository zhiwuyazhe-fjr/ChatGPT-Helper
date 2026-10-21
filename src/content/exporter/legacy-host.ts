import { conversationIdFromPath } from "../shared/conversation-context.js";
import { ChatGPTClient } from "../shared/chatgpt-client.js";
import { BUILD_ID, EXPORT_PROTOCOL } from "../shared/build";
import { ExportContractError, validateExportHost } from "./host";
import type { ExportHost } from "./host";
const legacyClients = new WeakMap<object, ChatGPTClient>();
export function acceptExportHost(input: ExportHost): ExportHost {
  if (input?.protocol != null) {
    validateExportHost(input);
    return input;
  }
  const runtime = (globalThis as any).chrome?.runtime;
  if (
    runtime?.getManifest?.().version !== "2.7.0" ||
    !input ||
    [
      "getMessages",
      "getSelectedMessages",
      "subscribe",
      "getContext",
      "notify",
      "loadDependency",
    ].some((key) => typeof input[key] !== "function")
  )
    throw new ExportContractError();
  const owner = (input as any).adapter;
  if (!owner || typeof owner !== "object") throw new ExportContractError();
  let client = legacyClients.get(owner);
  if (!client) {
    client = new ChatGPTClient();
    legacyClients.set(owner, client);
  }
  return {
    protocol: EXPORT_PROTOCOL,
    buildId: BUILD_ID,
    request: (path, options) => client.json(path, options),
    getContext: () => {
      const context = input.getContext();
      return {
        ...context,
        origin: location.origin,
        conversationId: conversationIdFromPath(context.path),
      };
    },
    getMessages: () => input.getMessages(),
    getSelectedMessages: () => input.getSelectedMessages(),
    subscribe: (callback) => input.subscribe(callback),
    notify: (message) => input.notify(message),
    loadDependency: (name) => input.loadDependency(name),
  };
}
