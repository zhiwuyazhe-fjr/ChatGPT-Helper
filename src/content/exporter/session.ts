import { ConversationRepository } from "./repository";
import { validateExportHost } from "./host";
import { processConversation } from "./model/conversation";
import { conversationToMarkdown } from "./exporter/markdown";
import { conversationToHtml } from "./exporter/html";
import { conversationToText } from "./exporter/text";
import { convertToOoba, convertToTavern } from "./utils/conversion";
import { copyToClipboard } from "./utils/clipboard";
import {
  buildJsonBatchFileName,
  buildZipFileName,
  downloadFile,
  getFileNameWithFormat,
} from "./utils/download";
import type { ExportContext, ExportHost } from "./host";
import type { ApiConversationWithId } from "./model/types";
import type { ExportOptions } from "./model/options";

export type ExportFormat =
  | "text"
  | "markdown"
  | "html"
  | "json"
  | "json-document"
  | "tavern"
  | "ooba";
export type BatchFormat = "Markdown" | "HTML" | "JSON" | "JSON (ZIP)";
export const batchFormats: BatchFormat[] = [
  "Markdown",
  "HTML",
  "JSON",
  "JSON (ZIP)",
];
export interface ExportJob {
  signal: AbortSignal;
  context: ExportContext;
  assertActive(): void;
  cancel(): void;
  finish(): void;
}
interface Artifact {
  filename: string;
  mime: string;
  content: string | Blob;
}

export class ExportSession {
  readonly repository: ConversationRepository;
  feedback = { error: false, message: "" };
  private listeners = new Set<() => void>();
  report(message: string, error = false) {
    this.feedback = { message, error };
    this.listeners.forEach((listener) => listener());
  }
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  private disposed = false;
  private generation = 0;
  private jobs = new Set<AbortController>();
  constructor(
    readonly host: ExportHost,
    readonly portal: HTMLElement,
  ) {
    validateExportHost(host);
    this.repository = new ConversationRepository((path, options) =>
      host.request(path, options),
    );
  }
  createJob(): ExportJob {
    if (this.disposed)
      throw new DOMException("Export session ended", "AbortError");
    const controller = new AbortController();
    const generation = this.generation;
    const context = { ...this.host.getContext() };
    this.jobs.add(controller);
    return {
      signal: controller.signal,
      context,
      assertActive: () => {
        controller.signal.throwIfAborted();
        if (
          this.disposed ||
          generation !== this.generation ||
          context.path !== this.host.getContext().path
        )
          throw new DOMException("Conversation changed", "AbortError");
      },
      cancel: () => {
        controller.abort();
        this.jobs.delete(controller);
      },
      finish: () => this.jobs.delete(controller),
    };
  }
  contextChanged() {
    this.generation++;
    this.jobs.forEach((job) => job.abort());
    this.jobs.clear();
  }
  dispose() {
    this.disposed = true;
    this.contextChanged();
    this.listeners.clear();
  }
  options(settings: any, context = this.host.getContext()): ExportOptions {
    return {
      format:
        typeof settings.format === "string" && settings.format.trim()
          ? settings.format
          : "ChatGPT-{title}",
      enableThinking: Boolean(settings.enableThinking),
      enableTimestamp: Boolean(settings.enableTimestamp),
      enableTimestampHTML: Boolean(settings.enableTimestampHTML),
      enableTimestampMarkdown: Boolean(settings.enableTimestampMarkdown),
      timeStamp24H: Boolean(settings.timeStamp24H),
      enableMeta: Boolean(settings.enableMeta),
      exportMetaList: Array.isArray(settings.exportMetaList)
        ? settings.exportMetaList
            .filter(
              (item) =>
                typeof item?.name === "string" &&
                typeof item.value === "string",
            )
            .map((item) => ({ ...item }))
        : [],
      origin: context.origin,
      language: context.language,
      theme: context.theme,
    };
  }
  private artifact(
    raw: ApiConversationWithId,
    kind: ExportFormat,
    options: ExportOptions,
  ): Artifact {
    const info = {
      title: typeof raw.title === "string" && raw.title ? raw.title : "ChatGPT",
      chatId: raw.id,
      createTime: raw.create_time,
      updateTime: raw.update_time,
    };
    if (kind === "json" || kind === "json-document")
      return {
        filename: getFileNameWithFormat(options.format, "json", info),
        mime: "application/json",
        content: JSON.stringify(kind === "json" ? [raw] : raw),
      };
    const conversation = processConversation(raw, {
      enableThinking: options.enableThinking,
    });
    const renderers = {
      text: () => ({
        ext: "txt",
        mime: "text/plain",
        content: conversationToText(conversation),
      }),
      markdown: () => ({
        ext: "md",
        mime: "text/markdown",
        content: conversationToMarkdown(conversation, options),
      }),
      html: () => ({
        ext: "html",
        mime: "text/html",
        content: conversationToHtml(conversation, options),
      }),
      tavern: () => ({
        ext: "jsonl",
        mime: "application/x-ndjson",
        content: convertToTavern(conversation),
      }),
      ooba: () => ({
        ext: "json",
        mime: "application/json",
        content: convertToOoba(conversation),
      }),
    };
    const output = renderers[kind]();
    return {
      filename: getFileNameWithFormat(options.format, output.ext, info),
      mime: output.mime,
      content: output.content,
    };
  }
  commit(artifact: Artifact, job: ExportJob) {
    job.assertActive();
    downloadFile(artifact.filename, artifact.mime, artifact.content);
  }
  async current(kind: ExportFormat, settings: any): Promise<boolean> {
    const job = this.createJob();
    this.report("");
    const options = this.options(settings, job.context);
    try {
      if (!job.context.conversationId)
        throw new Error(
          job.context.language.startsWith("zh")
            ? "当前对话尚未保存，暂时无法导出完整对话。"
            : "This conversation has not been saved yet.",
        );
      const raw = await this.repository.conversation(
        job.context.conversationId,
        ["markdown", "html"].includes(kind),
        job.signal,
      );
      job.assertActive();
      const artifact = this.artifact(raw, kind, options);
      if (kind === "text") {
        job.assertActive();
        await copyToClipboard(String(artifact.content));
      } else this.commit(artifact, job);
      this.report(
        job.context.language.startsWith("zh")
          ? kind === "text"
            ? "已复制"
            : "已导出"
          : kind === "text"
            ? "Copied"
            : "Exported",
      );
      return true;
    } finally {
      job.finish();
    }
  }
  async batch(
    raw: ApiConversationWithId[],
    kind: BatchFormat,
    settings: any,
    projectName: string | undefined,
    part: number,
    total: number,
    job: ExportJob,
  ) {
    const options = this.options(settings, job.context);
    job.assertActive();
    if (kind === "JSON") {
      this.commit(
        {
          filename: buildJsonBatchFileName(projectName, { part, total }),
          mime: "application/json",
          content: JSON.stringify(raw),
        },
        job,
      );
      return;
    }
    const ZIP = await this.host.loadDependency("zip");
    job.assertActive();
    const zip = new ZIP();
    const used = new Set<string>();
    const format =
      kind === "JSON (ZIP)"
        ? "json-document"
        : (kind.toLowerCase() as ExportFormat);
    for (const conversation of raw) {
      job.assertActive();
      const artifact = this.artifact(conversation, format, options);
      const dot = artifact.filename.lastIndexOf(".");
      const base = artifact.filename.slice(0, dot);
      const ext = artifact.filename.slice(dot);
      let name = artifact.filename;
      let suffix = 1;
      while (used.has(name)) name = `${base} (${suffix++})${ext}`;
      used.add(name);
      zip.file(name, artifact.content);
    }
    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    this.commit(
      {
        filename: buildZipFileName(
          format === "json-document" ? "json" : format,
          projectName,
          { part, total },
        ),
        mime: "application/zip",
        content: blob,
      },
      job,
    );
  }
}
