const generateKey = (args: any[]) => JSON.stringify(args)

export function memorize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, any>()

    const memorized = (...args: Parameters<T>): ReturnType<T> => {
        const key = generateKey(args)
        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = fn(...args)
        cache.set(key, result)
        // 失败的结果不缓存：否则首次网络抖动会让后续所有调用永远失败
        Promise.resolve(result).catch(() => cache.delete(key))
        return result
    }

    return memorized as T
}
