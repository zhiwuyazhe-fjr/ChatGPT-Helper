import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'
import './generate-html-assets.mjs'

const root = process.cwd()

function walk(dir) {
    const result = []
    if (!fs.existsSync(dir)) return result
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) result.push(...walk(full))
        else if (entry.isFile() && entry.name.endsWith('.js')) result.push(full)
    }
    return result
}

function isUnicodeNoncharacter(codePoint) {
    return (codePoint >= 0xFDD0 && codePoint <= 0xFDEF) ||
        ((codePoint & 0xFFFE) === 0xFFFE && codePoint <= 0x10FFFF)
}

function findUnicodeNoncharacter(content) {
    let byteOffset = 0
    for (const char of content) {
        const codePoint = char.codePointAt(0)
        if (isUnicodeNoncharacter(codePoint)) {
            return { codePoint, byteOffset }
        }
        byteOffset += Buffer.byteLength(char, 'utf8')
    }
    return null
}

const contentScriptFiles = walk(path.join(root, 'content-scripts'))
for (const file of contentScriptFiles) {
    execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' })
}
for (const file of contentScriptFiles) {
    const content = fs.readFileSync(file, 'utf8')
    const hit = findUnicodeNoncharacter(content)
    if (hit) {
        const codePoint = `U+${hit.codePoint.toString(16).toUpperCase().padStart(4, '0')}`
        throw new Error(`${path.relative(root, file)} contains Unicode noncharacter ${codePoint} at byte offset ${hit.byteOffset}; Chrome rejects extension scripts containing Unicode noncharacters`)
    }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const packageLock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'))
const versionSources = {
    'manifest.json': manifest.version,
    'package.json': packageJson.version,
    'package-lock.json': packageLock.version,
    'package-lock.json packages[""]': packageLock.packages?.['']?.version,
}
const versionValues = Object.values(versionSources)
if (versionValues.some(value => !value) || new Set(versionValues).size !== 1) {
    throw new Error(`version mismatch:\n${Object.entries(versionSources).map(([source, version]) => `${source}: ${version ?? '(missing)'}`).join('\n')}`)
}

const remoteHostedCodeRules = [
    {
        label: 'remote <script src>',
        pattern: /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\//i,
    },
    {
        label: 'remote stylesheet',
        pattern: /<link\b(?=[^>]*\brel\s*=\s*["']stylesheet["'])(?=[^>]*\bhref\s*=\s*["']https?:\/\/)[^>]*>/i,
    },
    {
        label: 'remote dynamic import',
        pattern: /\bimport\s*\(\s*["']https?:\/\//i,
    },
    {
        label: 'remote worker script',
        pattern: /\bnew\s+Worker\s*\(\s*["']https?:\/\//i,
    },
]

const remoteHostedCodeScanFiles = [
    path.join(root, 'src/content/exporter/template.html'),
    ...walk(path.join(root, 'content-scripts')),
]
const remoteHostedCodeViolations = []
for (const file of remoteHostedCodeScanFiles) {
    const content = fs.readFileSync(file, 'utf8')
    for (const rule of remoteHostedCodeRules) {
        if (rule.pattern.test(content)) {
            remoteHostedCodeViolations.push(`${path.relative(root, file)}: ${rule.label}`)
        }
    }
}
if (remoteHostedCodeViolations.length > 0) {
    throw new Error(`remote hosted code is not allowed in Chrome Web Store MV3 packages:\n${remoteHostedCodeViolations.join('\n')}`)
}

const scripts = manifest.content_scripts?.[0]?.js ?? []
const expectedScripts = [
    'libs/jszip.min.js',
    'libs/html2canvas.min.js',
    'content-scripts/gm-api-adapter.js',
    'content-scripts/dist/chatgpt-exporter.js',
    'content-scripts/dist/chatgpt-helper.js',
]
if (JSON.stringify(scripts) !== JSON.stringify(expectedScripts)) {
    throw new Error(`manifest.json content script order mismatch:\nexpected ${JSON.stringify(expectedScripts, null, 2)}\nactual   ${JSON.stringify(scripts, null, 2)}`)
}

function makeElement(tag = 'div') {
    const element = {
        tagName: tag.toUpperCase(),
        style: {
            setProperty() {},
            removeProperty() {},
            getPropertyValue() { return '' },
        },
        dataset: {},
        children: [],
        className: '',
        id: '',
        textContent: '',
        isConnected: true,
        parentNode: null,
        classList: {
            add() {},
            remove() {},
            toggle() {},
            contains() { return false },
        },
        setAttribute(name, value) { this[name] = value },
        getAttribute(name) { return this[name] ?? null },
        removeAttribute(name) { delete this[name] },
        append(...children) { this.children.push(...children) },
        appendChild(child) { this.children.push(child); child.parentNode = this; return child },
        prepend(...children) { this.children.unshift(...children) },
        before() {},
        remove() { this.isConnected = false },
        addEventListener() {},
        removeEventListener() {},
        querySelector() { return null },
        querySelectorAll() { return [] },
        focus() {},
        select() {},
        getBoundingClientRect() { return { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 } },
    }
    return element
}

const documentElement = makeElement('html')
const body = makeElement('body')
const head = makeElement('head')
const document = {
    readyState: 'loading',
    compatMode: 'CSS1Compat',
    documentElement,
    body,
    head,
    cookie: '',
    createElement: makeElement,
    createTextNode(text) { return { textContent: text } },
    getElementById() { return null },
    querySelector() { return null },
    querySelectorAll() { return [] },
    addEventListener() {},
    removeEventListener() {},
    execCommand() { return true },
}

const window = {
    __MY_EXT__: {},
    document,
    navigator: { language: 'en-US', clipboard: { writeText: async () => {} } },
    location: { href: 'https://chatgpt.com/', origin: 'https://chatgpt.com', pathname: '/' },
    crypto: { randomUUID: () => 'test-id' },
    addEventListener() {},
    removeEventListener() {},
    open() {},
    matchMedia() {
        return { matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }
    },
    GM_getValue(_key, value) { return value },
    GM_setValue() {},
    GM_deleteValue() {},
}
window.window = window

const context = {
    window,
    document,
    navigator: window.navigator,
    location: window.location,
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    cancelAnimationFrame: clearTimeout,
    Blob,
    URL,
    URLSearchParams,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
    Error,
    JSON,
    Number,
    String,
    Boolean,
    RegExp,
    Array,
    Object,
    Math,
    Date,
    JSZip: function JSZip() {},
    html2canvas: async () => makeElement('canvas'),
    chrome: { runtime: { getURL: (p) => p, getManifest: () => ({ version: 'test' }) } },
    indexedDB: { open() { return {} } },
    Notification: { permission: 'default' },
}
context.globalThis = context

vm.createContext(context)
for (const file of [
    'content-scripts/dist/chatgpt-exporter.js',
    'content-scripts/dist/chatgpt-helper.js',
]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file })
}

if (typeof window.__MY_EXT__.ChatGPTExporterMount !== 'function') {
    throw new Error('ChatGPTExporterMount was not registered')
}
if (!window.__MY_EXT__.helper?.ChatGPTHelper) {
    throw new Error('ChatGPTHelper was not registered')
}

async function runConversationSyncRegression() {
    const { ChatGPTAdapter, ConversationManager } = window.__MY_EXT__.helper
    if (!ChatGPTAdapter || !ConversationManager) {
        throw new Error('Conversation modules were not registered')
    }

    const fetchCalls = []
    const jsonResponse = (body) => ({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => body,
    })
    const fakeFetch = async (url, options = {}) => {
        const urlString = String(url)
        fetchCalls.push({ url: urlString, options })
        if (urlString === 'https://chatgpt.com/api/auth/session') {
            return jsonResponse({ accessToken: 'test-token' })
        }
        if (urlString.startsWith('https://chatgpt.com/backend-api/conversations')) {
            return jsonResponse({
                items: [
                    {
                        id: 'conv-api-1',
                        title: 'API conversation one',
                        create_time: '2026-05-01T10:00:00.000Z',
                        update_time: '2026-05-02T10:00:00.000Z',
                        is_starred: true,
                    },
                    {
                        id: 'conv-api-2',
                        title: 'API conversation two',
                        create_time: '2026-05-03T10:00:00.000Z',
                        update_time: '2026-05-04T10:00:00.000Z',
                    },
                ],
                limit: 100,
                offset: 0,
                total: 2,
            })
        }
        throw new Error(`Unexpected fetch: ${urlString}`)
    }
    context.fetch = fakeFetch
    window.fetch = fakeFetch

    let storedConversations = null
    window.GM_getValue = (key, value) => key === 'chatgpt_conversations' ? null : value
    window.GM_setValue = (key, value) => {
        if (key === 'chatgpt_conversations') {
            storedConversations = value
        }
    }

    const manager = new ConversationManager({
        container: makeElement('div'),
        settings: {},
        adapter: new ChatGPTAdapter(),
        i18n: (key) => key,
    })
    manager.showToast = () => {}
    manager.renderConversationList = () => {}

    try {
        const result = await manager.syncConversations()
        if (result.newCount !== 2) {
            throw new Error(`Expected 2 synced conversations, got ${result.newCount}`)
        }
        if (!storedConversations?.conversations?.['conv-api-1'] || !storedConversations?.conversations?.['conv-api-2']) {
            throw new Error('API conversations were not saved to chatgpt_conversations')
        }
        if (storedConversations.conversations['conv-api-1'].url !== 'https://chatgpt.com/c/conv-api-1') {
            throw new Error('Conversation URL was not normalized to the current origin')
        }
        if (storedConversations.conversations['conv-api-1'].pinned !== true) {
            throw new Error('Starred API conversation was not imported as pinned')
        }
        const apiCall = fetchCalls.find(call => call.url.startsWith('https://chatgpt.com/backend-api/conversations'))
        if (!apiCall) {
            throw new Error('Conversation sync did not call the backend conversations API')
        }
        if (apiCall.options.headers.Authorization !== 'Bearer test-token') {
            throw new Error('Conversation API call did not include the session bearer token')
        }
    }
    finally {
        manager.stopAutoSync()
    }
}

await runConversationSyncRegression()

console.log('content script checks passed')
