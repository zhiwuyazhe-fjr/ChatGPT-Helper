// ChatGPT Helper background service worker.
// - forwards the toggle-panel keyboard command to the content script
// - injects the export engine scripts (jszip / html2canvas / exporter) on demand,
//   so they are no longer parsed on every ChatGPT page load.
// No network requests are made from this worker.

const EXPORT_DEP_FILES = [
    'libs/jszip.min.js',
    'libs/html2canvas.min.js',
    'content-scripts/dist/chatgpt-exporter.js',
];

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
                    target: { tabId: sender.tab.id },
                    files: EXPORT_DEP_FILES,
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
