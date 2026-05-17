import '../helper/10-base.js'
import '../helper/20-theme-assets.js'
import '../helper/30-conversation-manager.js'
import '../helper/40-scroll-managers.js'
import '../helper/50-outline-manager.js'
import '../helper/60-copy-manager.js'
import '../helper/70-tab-rename-manager.js'
import '../helper/80-chatgpt-adapter.js'
import '../helper/90-app-core.js'
import '../helper/91-app-storage-init.js'
import '../helper/92-app-theme.js'
import '../helper/93-app-styles.js'
import '../helper/94-app-layout.js'
import '../helper/95-app-prompts.js'
import '../helper/96-app-export.js'
import '../helper/97-app-conversations-settings.js'
import '../helper/98-app-outline.js'
import '../helper/99-app-controls-events.js'

// Chrome Extension Content Script - ChatGPT Helper

if (!window.__MY_EXT__) {
    window.__MY_EXT__ = {};
}

(function () {
    'use strict';

    // Prevent duplicate initialization.
    if (window.chatgptHelperInitialized) {
        return;
    }
    window.chatgptHelperInitialized = true;

    const helperNamespace = window.__MY_EXT__.helper || {};
    const { ChatGPTHelper } = helperNamespace;

    if (!ChatGPTHelper) {
        console.error('[ChatGPT Helper] ChatGPTHelper modules are not loaded; initialization skipped');
        return;
    }

    function initHelper() {
        try {
            // 确保页面已经加载
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initHelper);
                return;
            }

            // 确保 body 存在
            if (!document.body) {
                // 如果 body 不存在，等待最多 5 秒
                let bodyRetries = 50;
                const waitForBody = () => {
                    if (document.body) {
                        initHelper();
                    } else if (bodyRetries > 0) {
                        bodyRetries--;
                        setTimeout(waitForBody, 100);
                    } else {
                        console.error('[ChatGPT Helper] 等待 body 超时，无法初始化');
                    }
                };
                waitForBody();
                return;
            }

            // 等待 GM API 适配器的缓存初始化完成
            const waitForCache = (retries = 40) => {
                try {
                    if (window.__MY_EXT__ && window.__MY_EXT__.storageCacheInitialized) {
                        // 缓存已初始化，继续初始化 Helper
                        console.log('[ChatGPT Helper] 缓存已初始化，开始初始化 Helper');
                        // 再等待一小段时间，确保缓存数据完全加载
                        setTimeout(() => {
                            try {
                                const helper = new ChatGPTHelper();
                                // 延迟检查会话数据（因为 conversationManager 是延迟创建的）
                                setTimeout(() => {
                                    try {
                                        if (helper && helper.conversationManager) {
                                            // 重新加载数据（确保从已初始化的缓存读取）
                                            helper.conversationManager.reloadData();
                                            const data = helper.conversationManager.data;
                                            console.log('[ChatGPT Helper] 会话数据加载完成:', {
                                                folders: data.folders?.length || 0,
                                                conversations: Object.keys(data.conversations || {}).length,
                                                hasData: Object.keys(data.conversations || {}).length > 0
                                            });
                                            if (Object.keys(data.conversations || {}).length === 0) {
                                                console.log('[ChatGPT Helper] 提示：当前没有保存的会话。使用 Helper 的功能后，会话数据会自动保存。');
                                            }
                                        }
                                    } catch (e) {
                                        console.error('[ChatGPT Helper] 会话数据加载错误:', e);
                                    }
                                }, 1000);
                            } catch (e) {
                                console.error('[ChatGPT Helper] 初始化失败:', e);
                                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                                // 重试一次
                                setTimeout(() => {
                                    try {
                                        new ChatGPTHelper();
                                    } catch (e2) {
                                        console.error('[ChatGPT Helper] 重试初始化失败:', e2);
                                        console.error('[ChatGPT Helper] 重试错误堆栈:', e2.stack);
                                    }
                                }, 2000);
                            }
                        }, 300);
                    } else if (retries > 0) {
                        // 缓存还未初始化，等待 50ms 后重试
                        setTimeout(() => waitForCache(retries - 1), 50);
                    } else {
                        // 超时，直接初始化（使用默认值）
                        console.warn('[ChatGPT Helper] 缓存初始化超时，使用默认值初始化');
                        setTimeout(() => {
                            try {
                                new ChatGPTHelper();
                            } catch (e) {
                                console.error('[ChatGPT Helper] 初始化失败:', e);
                                console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                            }
                        }, 300);
                    }
                } catch (e) {
                    console.error('[ChatGPT Helper] waitForCache 错误:', e);
                    console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
                    // 即使出错也尝试初始化
                    setTimeout(() => {
                        try {
                            new ChatGPTHelper();
                        } catch (e2) {
                            console.error('[ChatGPT Helper] 降级初始化失败:', e2);
                        }
                    }, 500);
                }
            };
            
            waitForCache();
        } catch (e) {
            console.error('[ChatGPT Helper] initHelper 顶层错误:', e);
            console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
            // 即使出错也尝试初始化，确保页面不被阻塞
            setTimeout(() => {
                try {
                    if (document.body) {
                        new ChatGPTHelper();
                    }
                } catch (e2) {
                    console.error('[ChatGPT Helper] 最终降级初始化失败:', e2);
                }
            }, 1000);
        }
    }

    // 使用 try-catch 包裹整个初始化调用
    try {
        initHelper();
    } catch (e) {
        console.error('[ChatGPT Helper] 初始化入口错误:', e);
        console.error('[ChatGPT Helper] 错误堆栈:', e.stack);
    }
})();
