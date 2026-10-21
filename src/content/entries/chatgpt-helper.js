import { BUILD_ID } from '../shared/build';
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
    Promise.all([documentReady, storageReady]).then(async () => {
        const application = new helper.ChatGPTHelper();
        const owner = { buildId: BUILD_ID, dispose: () => application.destroy() };
        root.application = owner;
        try { await application.ready; }
        catch (error) { owner.dispose(); if (root.application === owner) delete root.application; throw error; }
    }).catch(error => {
        window.chatgptHelperInitialized = false;
        console.error('[ChatGPT Helper] 启动失败:', error);
    });
}
