// Route identity is explicit. Never substitute the most recent conversation.
export function conversationIdFromPath(path) {
  return String(path || "").match(/\/c\/([a-zA-Z0-9-]+)(?:\/|$)/)?.[1] || null;
}
