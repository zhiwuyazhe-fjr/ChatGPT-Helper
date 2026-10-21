import * as helper from '../helper/index.js';

const root = window.__MY_EXT__ = window.__MY_EXT__ || {};
// Compatibility boundary for diagnostics and integration checks; modules use static imports.
root.helper = { ...helper };
if (!window.chatgptHelperInitialized) {
    window.chatgptHelperInitialized = true;
    const documentReady = document.readyState === 'loading'
        ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }))
        : Promise.resolve();
    const storageReady = root.storageCacheInitialized ? Promise.resolve() : new Promise(resolve => {
        window.addEventListener('ch-helper-storage-ready', resolve, { once: true });
    });
    Promise.all([documentReady, storageReady]).then(() => {
        new helper.ChatGPTHelper();
    }).catch(error => {
        window.chatgptHelperInitialized = false;
        console.error('[ChatGPT Helper] 启动失败:', error);
    });
}
