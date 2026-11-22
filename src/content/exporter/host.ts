import { EXPORT_PROTOCOL } from "../shared/build";
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
  request<T>(path: string, options?: { signal?: AbortSignal }): Promise<T>;
  getMessages(): MessageSnapshot[];
  getSelectedMessages(): MessageSnapshot[];
  subscribe(listener: () => void): () => void;
  getContext(): ExportContext;
  notify(message: string): void;
  loadDependency(name: "zip"): Promise<any>;
}
export class ExportContractError extends Error {
  code = "EXPORT_PROTOCOL_MISMATCH";
  constructor() {
    super("导出模块与当前页面的接口不兼容，请重新加载扩展并刷新页面。");
    this.name = "ExportContractError";
  }
}
export function validateExportHost(host: ExportHost) {
  if (
    !host ||
    host.protocol !== EXPORT_PROTOCOL ||
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
