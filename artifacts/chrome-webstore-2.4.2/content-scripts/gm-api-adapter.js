/**
 * GM_* API 兼容层 - 将 Tampermonkey GM_* API 转换为 Chrome Extension API
 * 使用 window.__MY_EXT__ 命名空间进行共享
 */

(function() {
    'use strict';

    // 初始化命名空间
    if (!window.__MY_EXT__) {
        window.__MY_EXT__ = {};
    }

    // ==================== Storage API 适配 ====================
    const StorageAdapter = {
        /**
         * 获取存储值
         * @param {string} key - 存储键
         * @param {any} defaultValue - 默认值
         * @returns {Promise<any>}
         */
        async getValue(key, defaultValue) {
            try {
                // 使用 Promise 包装，避免 message channel 错误
                return new Promise((resolve, reject) => {
                    try {
                        chrome.storage.local.get(key, (result) => {
                            if (chrome.runtime.lastError) {
                                console.error('[GM API Adapter] getValue error:', chrome.runtime.lastError);
                                resolve(defaultValue);
                            } else {
                                resolve(result[key] !== undefined ? result[key] : defaultValue);
                            }
                        });
                    } catch (error) {
                        console.error('[GM API Adapter] getValue error:', error);
                        resolve(defaultValue);
                    }
                });
            } catch (error) {
                console.error('[GM API Adapter] getValue error:', error);
                return defaultValue;
            }
        },

        /**
         * 设置存储值
         * @param {string} key - 存储键
         * @param {any} value - 存储值
         * @returns {Promise<void>}
         */
        async setValue(key, value) {
            try {
                // 使用 Promise 包装，避免 message channel 错误
                return new Promise((resolve, reject) => {
                    try {
                        chrome.storage.local.set({ [key]: value }, () => {
                            if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError);
                            } else {
                                resolve();
                            }
                        });
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                console.error('[GM API Adapter] setValue error:', error);
            }
        },

        /**
         * 删除存储值
         * @param {string} key - 存储键
         * @returns {Promise<void>}
         */
        async deleteValue(key) {
            try {
                // 使用 Promise 包装，避免 message channel 错误
                return new Promise((resolve, reject) => {
                    try {
                        chrome.storage.local.remove(key, () => {
                            if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError);
                            } else {
                                resolve();
                            }
                        });
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                console.error('[GM API Adapter] deleteValue error:', error);
            }
        }
    };

    // ==================== Notification API 适配 ====================
    const NotificationAdapter = {
        /**
         * 显示通知
         * @param {Object|string} options - 通知选项或消息文本
         * @returns {Promise<string>} 通知ID
         */
        async show(options) {
            try {
                const notificationOptions = typeof options === 'string' 
                    ? { title: 'ChatGPT Helper', message: options }
                    : options;

                const notificationId = await chrome.notifications.create({
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('icons/icon48.png'),
                    title: notificationOptions.title || 'ChatGPT Helper',
                    message: notificationOptions.message || notificationOptions.text || '',
                    ...notificationOptions
                });

                // 自动关闭通知（如果设置了 timeout）
                if (notificationOptions.timeout) {
                    setTimeout(() => {
                        chrome.notifications.clear(notificationId);
                    }, notificationOptions.timeout);
                }

                return notificationId;
            } catch (error) {
                console.error('[GM API Adapter] Notification error:', error);
                // 降级到 console
                console.log('[ChatGPT Helper]', options.message || options.text || options);
                return '';
            }
        }
    };

    // ==================== 同步版本的 GM_* API（兼容原有代码） ====================
    // 注意：这些是同步包装器，内部使用异步操作，但会立即返回默认值
    // 对于需要立即返回值的场景，建议使用异步版本

    const GM_getValue_sync = (key, defaultValue) => {
        // 同步版本：优先从缓存读取
        if (window.__MY_EXT__.storageCache && window.__MY_EXT__.storageCache.hasOwnProperty(key)) {
            const value = window.__MY_EXT__.storageCache[key];
            // 如果值是 null，也返回 null（而不是默认值）
            return value !== undefined ? value : defaultValue;
        }
        // 如果缓存还没有初始化，触发立即加载（异步，但会更新缓存）
        if (!window.__MY_EXT__.storageCacheInitialized && !window.__MY_EXT__.storageCacheLoading) {
            window.__MY_EXT__.storageCacheLoading = true;
            // 立即尝试同步读取单个键（用于首次调用）
            try {
                chrome.storage.local.get(key, (result) => {
                    if (chrome.runtime.lastError) {
                        console.error('[GM API Adapter] 同步读取单个键错误:', chrome.runtime.lastError);
                        return;
                    }
                    if (!window.__MY_EXT__.storageCache) {
                        window.__MY_EXT__.storageCache = {};
                    }
                    if (result && result.hasOwnProperty(key)) {
                        window.__MY_EXT__.storageCache[key] = result[key];
                    }
                });
            } catch (e) {
                console.error('[GM API Adapter] 同步读取错误:', e);
            }
            // 同时加载所有数据到缓存
            chrome.storage.local.get(null, (allData) => {
                if (chrome.runtime.lastError) {
                    console.error('[GM API Adapter] 加载所有数据错误:', chrome.runtime.lastError);
                    window.__MY_EXT__.storageCache = {};
                    window.__MY_EXT__.storageCacheInitialized = true;
                    window.__MY_EXT__.storageCacheLoading = false;
                    return;
                }
                window.__MY_EXT__.storageCache = allData || {};
                window.__MY_EXT__.storageCacheInitialized = true;
                window.__MY_EXT__.storageCacheLoading = false;
            });
        }
        // 如果缓存中没有，返回默认值
        // 注意：首次调用时可能返回默认值，但后续调用会从缓存读取
        return defaultValue;
    };

    const GM_setValue_sync = (key, value) => {
        // 更新缓存
        if (!window.__MY_EXT__.storageCache) {
            window.__MY_EXT__.storageCache = {};
        }
        window.__MY_EXT__.storageCache[key] = value;
        // 异步保存
        StorageAdapter.setValue(key, value).catch(console.error);
    };

    const GM_deleteValue_sync = (key) => {
        // 从缓存删除
        if (window.__MY_EXT__.storageCache) {
            delete window.__MY_EXT__.storageCache[key];
        }
        // 异步删除
        StorageAdapter.deleteValue(key).catch(console.error);
    };

    // ==================== 初始化存储缓存 ====================
    async function initStorageCache() {
        try {
            const allData = await chrome.storage.local.get(null);
            window.__MY_EXT__.storageCache = allData;
            window.__MY_EXT__.storageCacheInitialized = true;
        } catch (error) {
            console.error('[GM API Adapter] Init cache error:', error);
            window.__MY_EXT__.storageCache = {};
            window.__MY_EXT__.storageCacheInitialized = true;
        }
    }

    // ==================== 暴露 API ====================
    // 暴露到 window.__MY_EXT__ 命名空间
    window.__MY_EXT__.GM = {
        // 异步版本（推荐使用）
        getValue: StorageAdapter.getValue.bind(StorageAdapter),
        setValue: StorageAdapter.setValue.bind(StorageAdapter),
        deleteValue: StorageAdapter.deleteValue.bind(StorageAdapter),
        notification: NotificationAdapter.show.bind(NotificationAdapter),

        // 同步版本（兼容原有代码）
        getValueSync: GM_getValue_sync,
        setValueSync: GM_setValue_sync,
        deleteValueSync: GM_deleteValue_sync
    };

    // 为了兼容原有代码，也暴露全局的 GM_* 函数（同步版本）
    // 注意：这些是同步包装器，实际存储操作是异步的
    window.GM_getValue = GM_getValue_sync;
    window.GM_setValue = GM_setValue_sync;
    window.GM_deleteValue = GM_deleteValue_sync;
    window.GM_notification = NotificationAdapter.show.bind(NotificationAdapter);

    // 立即初始化缓存（同步方式，尽可能快地加载）
    // 使用回调方式立即加载，不等待
    try {
        chrome.storage.local.get(null, (allData) => {
            try {
                if (chrome.runtime.lastError) {
                    console.error('[GM API Adapter] 缓存初始化错误:', chrome.runtime.lastError);
                    window.__MY_EXT__.storageCache = {};
                    window.__MY_EXT__.storageCacheInitialized = true;
                    return;
                }
                window.__MY_EXT__.storageCache = allData || {};
                window.__MY_EXT__.storageCacheInitialized = true;
                const keys = Object.keys(allData || {});
                console.log('[GM API Adapter] 缓存初始化完成，已加载', keys.length, '个键');
                if (keys.length > 0) {
                    console.log('[GM API Adapter] 缓存中的键:', keys);
                    // 检查是否有 chatgpt_conversations
                    if (allData && allData['chatgpt_conversations']) {
                        const convData = allData['chatgpt_conversations'];
                        if (typeof convData === 'object' && convData.conversations) {
                            const convCount = Object.keys(convData.conversations || {}).length;
                            console.log('[GM API Adapter] 发现 chatgpt_conversations 数据，包含', convCount, '个会话');
                        }
                    } else {
                        console.log('[GM API Adapter] 未找到 chatgpt_conversations 键');
                    }
                }
            } catch (error) {
                console.error('[GM API Adapter] 缓存初始化错误:', error);
                window.__MY_EXT__.storageCache = {};
                window.__MY_EXT__.storageCacheInitialized = true;
            }
        });
    } catch (error) {
        console.error('[GM API Adapter] 存储访问错误:', error);
        window.__MY_EXT__.storageCache = {};
        window.__MY_EXT__.storageCacheInitialized = true;
    }

    console.log('[GM API Adapter] 已初始化');
})();
