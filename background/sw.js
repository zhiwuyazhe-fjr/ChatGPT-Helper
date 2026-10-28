(function() {
  "use strict";
  const BUILD_ID = "c2ed687872e7e276";
  const EXPORT_DEP_FILES = {
    engine: ["content-scripts/dist/chatgpt-exporter.js"],
    zip: ["libs/jszip.min.js"]
  };
  chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "toggle-helper-panel") return;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || tab.id == null) return;
      await chrome.tabs.sendMessage(tab.id, { type: "ch-helper-toggle-panel" });
    } catch (e) {
    }
  });
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || msg.type !== "ch-helper-inject-export-deps") return;
    (async () => {
      try {
        if (msg.buildId !== BUILD_ID) return sendResponse({ ok: false, code: "BUILD_MISMATCH", error: "\u6269\u5C55\u7248\u672C\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u5E76\u5237\u65B0\u9875\u9762\u3002" });
        if (!Object.hasOwn(EXPORT_DEP_FILES, msg.dependency)) return sendResponse({ ok: false, error: "Unknown dependency" });
        if (sender.tab && sender.tab.id != null) {
          await chrome.scripting.executeScript({
            target: { tabId: sender.tab.id, ...sender.documentId ? { documentIds: [sender.documentId] } : { frameIds: [sender.frameId || 0] } },
            files: EXPORT_DEP_FILES[msg.dependency]
          });
          sendResponse({ ok: true, buildId: BUILD_ID });
        } else {
          sendResponse({ ok: false, error: "missing sender tab" });
        }
      } catch (e) {
        sendResponse({ ok: false, error: String(e && e.message || e) });
      }
    })();
    return true;
  });
})();
