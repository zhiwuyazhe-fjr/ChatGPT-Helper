// ChatGPT Helper background service worker.
// - forwards the toggle-panel keyboard command to the content script
// - injects the export engine scripts (jszip / exporter) on demand,
//   so they are no longer parsed on every ChatGPT page load.
// No network requests are made from this worker.

const EXPORT_DEP_FILES = {
    engine: ['content-scripts/dist/chatgpt-exporter.js'],
    zip: ['libs/jszip.min.js'],
};

chrome.commands.onCommand.addListener(async (command) => {
    if (command !== 'toggle-helper-panel') return;
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || tab.id == null) return;
        await chrome.tabs.sendMessage(tab.id, { type: 'ch-helper-toggle-panel' });
    } catch (e) {
        // Content script not present on this tab (non-ChatGPT page); ignore.
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || msg.type !== 'ch-helper-inject-export-deps') return;
    (async () => {
        try {
            if (sender.tab && sender.tab.id != null) {
                await chrome.scripting.executeScript({
                    target: { tabId: sender.tab.id, ...(sender.documentId ? { documentIds: [sender.documentId] } : { frameIds: [sender.frameId || 0] }) },
                    files: EXPORT_DEP_FILES[msg.dependency || 'engine'] || EXPORT_DEP_FILES.engine,
                });
                sendResponse({ ok: true });
            } else {
                sendResponse({ ok: false, error: 'missing sender tab' });
            }
        } catch (e) {
            sendResponse({ ok: false, error: String((e && e.message) || e) });
        }
    })();
    return true; // keep the message channel open for the async sendResponse
});
