import sanitize from 'sanitize-filename'
import { dateStr, timestamp, unixTimestampToISOString } from './utils'

export function downloadFile(filename: string, type: string, content: string | Blob) {
    const blob = content instanceof Blob ? content : new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // 批量导出时每个分卷一个 ZIP blob（可达数百 MB）：不回收会常驻内存直到刷新
    setTimeout(() => URL.revokeObjectURL(url), 30_000)
}

export function downloadUrl(filename: string, url: string) {
    // 该辅助函数只应触发下载，绝不能被用来导航到任意 scheme（javascript: 等）
    if (!/^(data:|blob:)/i.test(url)) {
        console.warn('[Exporter] downloadUrl rejected non-download scheme:', new URL(url, location.href).protocol)
        return
    }
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export function normalizeProjectName(projectName: string) {
    return projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export interface PartInfo {
    part: number
    total: number
}

function partSuffix(partInfo?: PartInfo): string {
    if (!partInfo || partInfo.total <= 1) return ''
    const pad = (n: number) => String(n).padStart(2, '0')
    return `-part-${pad(partInfo.part)}-of-${pad(partInfo.total)}`
}

export function buildZipFileName(format: string, projectName?: string, partInfo?: PartInfo) {
    const suffix = partSuffix(partInfo)
    if (projectName) {
        return `chatgpt-export-${format}-project-${normalizeProjectName(projectName)}${suffix}.zip`
    }
    return `chatgpt-export-${format}${suffix}.zip`
}

export function buildJsonBatchFileName(projectName?: string, partInfo?: PartInfo) {
    const suffix = partSuffix(partInfo)
    if (projectName) {
        return `chatgpt-export-project-${normalizeProjectName(projectName)}${suffix}.json`
    }
    return `chatgpt-export${suffix}.json`
}

export function getFileNameWithFormat(format: string, ext: string, {
    title = document.title,
    // chatId will be empty when exporting all conversations
    chatId = '',
    // convert to seconds for unixTimestampToISOString which expects a unix
    // timestamp (in seconds). using Date.now() directly would pass
    // milliseconds which results in an invalid far future date.
    createTime = Math.floor(Date.now() / 1000),
    updateTime = Math.floor(Date.now() / 1000),
} = {}) {
    const _title = sanitize(title).replace(/\s+/g, '_')
    const _createTime = unixTimestampToISOString(createTime)
    const _updateTime = unixTimestampToISOString(updateTime)

    // chatId 可能来自本地导入的 conversations.json（完全可控），
    // 模板本身也是用户自由文本：整名最后统一消毒并截断，堵住 zip 路径穿越（Zip Slip）
    const name = format
        .replace('{title}', _title)
        .replace('{date}', dateStr())
        .replace('{timestamp}', timestamp())
        .replace('{chat_id}', chatId.replace(/[^\w.-]+/g, '_'))
        .replace('{create_time}', _createTime)
        .replace('{update_time}', _updateTime)
        .concat(`.${ext}`)
    return sanitize(name).slice(0, 120)
}
