// Older helpers ask the worker to execute this classic script and then mount
// synchronously. executeScript waits for the final expression's promise.
(async () => {
    const engine = await import(chrome.runtime.getURL('libs/chatgpt-export-engine.js'));
    const root = window.__MY_EXT__ ||= {};
    // The old loader compares this field to the calling page's build stamp.
    root.exporter = { mount: engine.mountLegacy, protocol: engine.protocol, buildId: root.application?.buildId ?? engine.buildId };
    root.ChatGPTExporterMount = engine.mountLegacy;
})();
