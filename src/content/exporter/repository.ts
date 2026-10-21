import { blobToDataURL } from "./utils/dom";
import type {
  ApiConversationWithId,
  ApiConversationItem,
  ApiProjectInfo,
} from "./model/types";
import type { ExportHost } from "./host";

function pathId(id: string) {
  if (!/^[\w-]{1,128}$/.test(id))
    throw new Error("Invalid conversation or asset ID");
  return encodeURIComponent(id);
}
export interface ConversationPage {
  items: ApiConversationItem[];
  total: number | null;
  nextCursor: number | string | null;
}
export class ConversationRepository {
  constructor(private request: ExportHost["request"]) {}
  async conversation(
    id: string,
    assets: boolean,
    signal: AbortSignal,
  ): Promise<ApiConversationWithId> {
    const raw = await this.request<any>(`/conversation/${pathId(id)}`, {
      signal,
    });
    signal.throwIfAborted();
    if (!raw?.mapping || Array.isArray(raw.mapping))
      throw new Error("Invalid conversation response");
    const result = { ...raw, id };
    if (assets) await this.assets(result, signal);
    return result;
  }
  async page(
    project: string | null,
    cursor: number | string,
    limit: number,
    signal: AbortSignal,
  ): Promise<ConversationPage> {
    const query = new URLSearchParams(
      project
        ? { cursor: String(cursor), limit: String(limit) }
        : { offset: String(cursor), limit: String(limit) },
    );
    const path = project
      ? `/gizmos/${pathId(project)}/conversations`
      : "/conversations";
    const response = await this.request<any>(`${path}?${query}`, { signal });
    if (!Array.isArray(response?.items))
      throw new Error("Invalid conversation list response");
    const items = response.items
      .filter((item) => item && typeof item.id === "string" && item.id.trim())
      .map((item) => ({
        ...item,
        title: typeof item.title === "string" ? item.title : "ChatGPT",
      }));
    const total =
      typeof response.total === "number" && Number.isFinite(response.total)
        ? response.total
        : null;
    const nextOffset = Number(cursor) + response.items.length;
    const effectiveLimit =
      typeof response.limit === "number" && response.limit > 0
        ? Math.min(limit, response.limit)
        : limit;
    const nextCursor = project
      ? response.cursor != null && response.cursor !== cursor
        ? response.cursor
        : null
      : response.items.length > 0 &&
          (total == null
            ? response.items.length >= effectiveLimit
            : nextOffset < total)
        ? nextOffset
        : null;
    return { items, total, nextCursor };
  }
  async projects(signal: AbortSignal): Promise<ApiProjectInfo[]> {
    const items = new Map<string, ApiProjectInfo>();
    const seen = new Set<string>();
    let cursor: string | number | null = null;
    for (let page = 0; page < 200; page++) {
      signal.throwIfAborted();
      const query = new URLSearchParams({
        conversations_per_gizmo: "0",
        ...(cursor == null ? {} : { cursor: String(cursor) }),
      });
      const response = await this.request<any>(
        `/gizmos/snorlax/sidebar?${query}`,
        { signal },
      );
      if (!Array.isArray(response?.items))
        throw new Error("Invalid project list response");
      for (const row of response.items) {
        const item = row?.gizmo?.gizmo;
        if (item?.id && item.display?.name) items.set(item.id, item);
      }
      cursor = response.cursor;
      if (cursor == null || seen.has(String(cursor))) break;
      seen.add(String(cursor));
    }
    return [...items.values()];
  }
  private async assets(
    conversation: ApiConversationWithId,
    signal: AbortSignal,
  ) {
    const targets: { parent: any; key: string }[] = [];
    for (const node of Object.values(conversation.mapping)) {
      const message = node?.message;
      for (const part of (message?.content && "parts" in message.content
        ? message.content.parts
        : []) || [])
        if (
          part &&
          typeof part === "object" &&
          part.content_type === "image_asset_pointer"
        )
          targets.push({ parent: part, key: "asset_pointer" });
      for (const part of message?.metadata?.aggregate_result?.messages || [])
        if (part.message_type === "image")
          targets.push({ parent: part, key: "image_url" });
    }
    // A bounded pool avoids downloading every attachment in a long conversation at once.
    let index = 0;
    await Promise.all(
      Array.from({ length: Math.min(4, targets.length) }, async () => {
        while (index < targets.length) {
          const { parent, key } = targets[index++];
          signal.throwIfAborted();
          const value = parent[key];
          if (typeof value !== "string" || !value.startsWith("sediment://"))
            continue;
          try {
            const response = await this.request<any>(
              `/files/download/${pathId(value.slice(11))}?post_id=&inline=false`,
              { signal },
            );
            if (response.status !== "success") continue;
            const url = new URL(response.download_url);
            if (url.protocol !== "https:") continue;
            const image = await fetch(url, { signal, credentials: "omit" });
            if (!image.ok) continue;
            parent[key] = await blobToDataURL(await image.blob());
          } catch (error) {
            signal.throwIfAborted(); /* Unavailable attachments retain their original pointer. */
          }
        }
      }),
    );
  }
}
