# ChatGPT Helper Exporter Adaptation

Upstream source: `pionxzh/chatgpt-exporter`, tag `userscript-v2.32.1`.
Upstream license is preserved in `src/content/exporter/LICENSE`.

Local compatibility patches:

- Replace `vite-plugin-monkey` runtime imports with the Chrome content-script globals supplied by `content-scripts/gm-api-adapter.js`.
- Use `window` instead of `unsafeWindow` for ChatGPT page boot data.
- Disable the upstream userscript sidebar injection path.
- Expose `window.ChatGPTExporterMount(targetElement)` and mirror it to `window.__MY_EXT__.ChatGPTExporterMount`.
- Render a compact `DirectMenu` for the Helper export tab while keeping upstream export/settings dialogs and storage keys.
- Keep `JSZip` and `html2canvas` external so they are provided by the existing extension `libs/` scripts.
