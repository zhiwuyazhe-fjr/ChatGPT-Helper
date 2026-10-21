import { BUILD_ID, EXPORT_PROTOCOL } from "../shared/build";
export interface MessageSnapshot {
  id: string;
  role: "user" | "assistant";
  content: string;
  html: string;
  order: number;
}
export interface ExportContext {
  path: string;
  title: string;
  language: string;
  theme: string;
  origin: string;
  conversationId: string | null;
}
export interface ExportHost {
  protocol: number;
  buildId: string;
  request<T>(path: string, options?: { signal?: AbortSignal }): Promise<T>;
  getMessages(): MessageSnapshot[];
  getSelectedMessages(): MessageSnapshot[];
  subscribe(listener: () => void): () => void;
  getContext(): ExportContext;
  notify(message: string): void;
  loadDependency(name: "zip"): Promise<any>;
}
export class ExportContractError extends Error {
  code = "BUILD_MISMATCH";
  constructor() {
    super("扩展版本不一致，请重新加载扩展并刷新此页面。");
    this.name = "ExportContractError";
  }
}
export function validateExportHost(host: ExportHost) {
  if (
    !host ||
    host.protocol !== EXPORT_PROTOCOL ||
    host.buildId !== BUILD_ID ||
    [
      "request",
      "getMessages",
      "getSelectedMessages",
      "subscribe",
      "getContext",
      "notify",
      "loadDependency",
    ].some((key) => typeof host[key] !== "function")
  )
    throw new ExportContractError();
}
