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
            // 与同步版同一闸门：存储不可用/缓存未就绪时拒绝写盘，保护磁盘上的真实数据
            if (window.__MY_EXT__.storageUnavailable) {
                return Promise.reject(new Error('storage unavailable; write rejected'));
            }
            if (!window.__MY_EXT__.storageCacheInitialized && window.__MY_EXT__.storageCache === undefined) {
                return Promise.reject(new Error('storage cache not ready; write rejected'));
            }
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
                return Promise.reject(error);
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

    // 存储读取失败时置 true：此时内存态是默认值，任何写回都会清掉磁盘上的真实数据
    function markStorageUnavailable() {
        window.__MY_EXT__.storageUnavailable = true;
        window.__MY_EXT__.storageCacheInitialized = true; // 允许 UI 以只读模式启动
        window.__MY_EXT__.storageCache = window.__MY_EXT__.storageCache || {};
        console.error('[GM API Adapter] 存储不可用：本页以只读模式运行，拒绝一切写操作以保护既有数据');
    }

    // 缓存就绪前若发生过写入（缓存里只有被写过的键），就绪回调必须合并而不是整体替换，否则写入被吞
    function mergeCacheFromStorage(allData) {
        const pendingWrites = window.__MY_EXT__.storageCache || {};
        const pendingDeletes = window.__MY_EXT__.storagePendingDeletes;
        const merged = Object.assign({}, allData, pendingWrites);
        if (pendingDeletes) {
            for (const key of pendingDeletes) delete merged[key];
            pendingDeletes.clear();
        }
        window.__MY_EXT__.storageCache = merged;
    }

    // 缓存就绪通知：晚初始化场景下让上层（如会话管理器）重新加载真实数据
    function notifyStorageReady() {
        window.__MY_EXT__.storageCacheInitialized = true;
        try {
            window.dispatchEvent(new CustomEvent('ch-helper-storage-ready'));
        } catch (e) { /* ignore */ }
    }

    function writeGateAllowed(key) {
        if (window.__MY_EXT__.storageUnavailable) {
            console.warn('[GM API Adapter] 存储不可用，拒绝写入以保护既有数据:', key);
            return false;
        }
        // 缓存从未就绪（读取回调一直没回来）：内存态可能是默认值，写回会覆盖磁盘真实数据
        if (!window.__MY_EXT__.storageCacheInitialized && window.__MY_EXT__.storageCache === undefined) {
            console.warn('[GM API Adapter] 存储缓存尚未就绪，拒绝写入:', key);
            return false;
        }
        return true;
    }

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
                        markStorageUnavailable();
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
                window.__MY_EXT__.storageCacheLoading = false;
                if (chrome.runtime.lastError) {
                    console.error('[GM API Adapter] 加载所有数据错误:', chrome.runtime.lastError);
                    markStorageUnavailable();
                    return;
                }
                mergeCacheFromStorage(allData || {});
                notifyStorageReady();
            });
        }
        // 如果缓存中没有，返回默认值
        // 注意：首次调用时可能返回默认值，但后续调用会从缓存读取
        return defaultValue;
    };

    const GM_setValue_sync = (key, value) => {
        if (!writeGateAllowed(key)) return;
        // 更新缓存
        if (!window.__MY_EXT__.storageCache) {
            window.__MY_EXT__.storageCache = {};
        }
        window.__MY_EXT__.storageCache[key] = value;
        // 缓存未就绪时记录待落盘写入（就绪时由 onChanged 之外的路径补写）
        if (!window.__MY_EXT__.storageCacheInitialized) {
            if (!window.__MY_EXT__.storagePendingWrites) window.__MY_EXT__.storagePendingWrites = new Map();
            window.__MY_EXT__.storagePendingWrites.set(key, value);
        }
        // 异步保存
        StorageAdapter.setValue(key, value).catch(console.error);
    };

    const GM_deleteValue_sync = (key) => {
        if (!writeGateAllowed(key)) return;
        // 从缓存删除
        if (window.__MY_EXT__.storageCache) {
            delete window.__MY_EXT__.storageCache[key];
        }
        if (!window.__MY_EXT__.storageCacheInitialized) {
            if (!window.__MY_EXT__.storagePendingDeletes) window.__MY_EXT__.storagePendingDeletes = new Set();
            window.__MY_EXT__.storagePendingDeletes.add(key);
        }
        // 异步删除
        StorageAdapter.deleteValue(key).catch(console.error);
    };

    // ==================== 初始化存储缓存 ====================
    async function initStorageCache() {
        try {
            const allData = await chrome.storage.local.get(null);
            if (window.__MY_EXT__.storageUnavailable) return;
            mergeCacheFromStorage(allData);
            notifyStorageReady();
        } catch (error) {
            console.error('[GM API Adapter] Init cache error:', error);
            markStorageUnavailable();
        }
    }

    // 多标签页同步：其它标签页写入时刷新本页缓存，
    // 避免基于陈旧缓存的整键写覆盖掉别的标签页刚保存的数据。
    try {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== 'local') return;
            if (!window.__MY_EXT__.storageCache) return;
            for (const [key, change] of Object.entries(changes)) {
                // 防御畸形载荷：非 {oldValue,newValue} 对象的 change 直接跳过，
                // 避免外部 stub/异常实现把缓存键误删
                if (!change || typeof change !== 'object') continue;
                if (change.newValue === undefined) {
                    delete window.__MY_EXT__.storageCache[key];
                } else {
                    window.__MY_EXT__.storageCache[key] = change.newValue;
                }
            }
        });
    } catch (error) {
        console.warn('[GM API Adapter] 注册 storage.onChanged 失败:', error);
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
                    markStorageUnavailable();
                    return;
                }
                mergeCacheFromStorage(allData || {});
                notifyStorageReady();
                // 不打印具体键名与数据内容，避免把用户的提示词/会话标题泄露到页面控制台
                console.log('[GM API Adapter] 缓存初始化完成，已加载', Object.keys(allData || {}).length, '个键');
                // 缓存就绪前发生的写入只进了内存：这里补写到磁盘
                const pendingWrites = window.__MY_EXT__.storagePendingWrites;
                const pendingDeletes = window.__MY_EXT__.storagePendingDeletes;
                if (pendingWrites && pendingWrites.size > 0) {
                    for (const [key, value] of pendingWrites) {
                        StorageAdapter.setValue(key, value).catch((e) => console.error('[GM API Adapter] 补写待落盘键失败:', key, e));
                    }
                    pendingWrites.clear();
                }
                if (pendingDeletes && pendingDeletes.size > 0) {
                    for (const key of pendingDeletes) {
                        StorageAdapter.deleteValue(key).catch((e) => console.error('[GM API Adapter] 补删待落盘键失败:', key, e));
                    }
                    pendingDeletes.clear();
                }
            } catch (error) {
                console.error('[GM API Adapter] 缓存初始化错误:', error);
                markStorageUnavailable();
            }
        });
    } catch (error) {
        console.error('[GM API Adapter] 存储访问错误:', error);
        markStorageUnavailable();
    }

    console.log('[GM API Adapter] 已初始化');
})();
