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
    'helper EXTENSION_VERSION': fs.readFileSync(path.join(root, 'src/content/helper/10-base.js'), 'utf8').match(/const EXTENSION_VERSION = '([^']+)'/)?.[1],
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

const exporterTemplate = fs.readFileSync(path.join(root, 'src/content/exporter/template.html'), 'utf8')
if (exporterTemplate.includes('ChatGPT Exporter')) {
    throw new Error('exported HTML template must use ChatGPT Helper branding instead of ChatGPT Exporter')
}
if (!exporterTemplate.includes('ChatGPT Helper')) {
    throw new Error('exported HTML template is missing ChatGPT Helper branding')
}
if (!exporterTemplate.includes('class="export-shell"')) {
    throw new Error('exported HTML template must include the refreshed export-shell layout')
}

const settingDialogSource = fs.readFileSync(path.join(root, 'src/content/exporter/ui/SettingDialog.tsx'), 'utf8')
for (const requiredSnippet of ['SettingsSection', 'aria-expanded', 'settings-section-panel']) {
    if (!settingDialogSource.includes(requiredSnippet)) {
        throw new Error(`settings dialog is missing collapsible section support: ${requiredSnippet}`)
    }
}

const helperSettingsSource = fs.readFileSync(path.join(root, 'src/content/helper/97-app-conversations-settings.js'), 'utf8')
for (const requiredSnippet of ['createCollapsibleSettingsSection', 'aria-expanded', 'chatgpt-helper-settings-compact-section collapsed']) {
    if (!helperSettingsSource.includes(requiredSnippet)) {
        throw new Error(`helper settings panel is missing collapsible section support: ${requiredSnippet}`)
    }
}
const helperStylesSource = fs.readFileSync(path.join(root, 'src/content/helper/styles/helper.css'), 'utf8')
for (const requiredSnippet of ['chatgpt-helper-settings-compact-title-btn', 'chatgpt-helper-settings-compact-section.collapsed']) {
    if (!helperStylesSource.includes(requiredSnippet)) {
        throw new Error(`helper settings styles are missing collapsible section support: ${requiredSnippet}`)
    }
}

const scripts = manifest.content_scripts?.[0]?.js ?? []
const expectedScripts = [
    'content-scripts/gm-api-adapter.js',
    'content-scripts/dist/chatgpt-helper.js',
]
if (JSON.stringify(scripts) !== JSON.stringify(expectedScripts)) {
    throw new Error(`manifest.json content script order mismatch:\nexpected ${JSON.stringify(expectedScripts, null, 2)}\nactual   ${JSON.stringify(scripts, null, 2)}`)
}

// 导出引擎改为按需注入后，service worker 与注入清单必须存在且接线正确
execFileSync(process.execPath, ['--check', path.join(root, 'background', 'sw.js')], { stdio: 'inherit' })
const swSource = fs.readFileSync(path.join(root, 'background', 'sw.js'), 'utf8')
for (const requiredSnippet of ['libs/jszip.min.js', 'content-scripts/dist/chatgpt-exporter.js', 'toggle-helper-panel', 'ch-helper-inject-export-deps']) {
    if (!swSource.includes(requiredSnippet)) {
        throw new Error(`background/sw.js is missing lazy export engine wiring: ${requiredSnippet}`)
    }
}
if (!manifest.background?.service_worker) {
    throw new Error('manifest.json is missing background.service_worker')
}
if (!manifest.commands?.['toggle-helper-panel']) {
    throw new Error('manifest.json is missing the toggle-helper-panel command')
}
if (!manifest.permissions?.includes('scripting')) {
    throw new Error('manifest.json is missing the scripting permission required by on-demand injection')
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
    structuredClone,
    AbortController,
    DOMException,
    Boolean,
    RegExp,
    Array,
    Object,
    Math,
    Date,
    JSZip: function JSZip() {},
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
        manager.destroy()
    }
}

await runConversationSyncRegression()

// Disposed features must not commit a late network result to extension storage.
{
    const { ConversationManager } = window.__MY_EXT__.helper;
    let completeRequest;
    let writes = 0;
    const originalSet = window.GM_setValue;
    window.GM_setValue = () => { writes++; };
    const manager = new ConversationManager({container:makeElement('div'),settings:{},adapter:{getConversationList:()=>new Promise(resolve=>{completeRequest=resolve;})},i18n:key=>key});
    manager.showToast = () => {};
    const operation = manager.syncConversations();
    manager.destroy();
    completeRequest([{id:'late',title:'Late response',url:'https://chatgpt.com/c/late'}]);
    await operation;
    window.GM_setValue = originalSet;
    if (writes || manager.data.conversations.late) throw new Error('Disposed conversation manager committed a late sync result');
}


// Lifecycle races are hard to reproduce with ordinary sequential UI clicks.
const { ChatGPTHelper, ScrollLockManager } = window.__MY_EXT__.helper
let finishRead
let signalRead
const readStarted = new Promise(resolve => { signalRead = resolve })
let writesAfterDispose = 0
const subject = Object.assign(Object.create(ChatGPTHelper.prototype), {
    settings: { themeConfig: { appearanceMode: 'light', presetKey: 'default', backgroundImageEnabled: true, backgroundAssetId: 'pending' } },
    themeAssetRepository: { getAsset() {
        signalRead()
        return new Promise(resolve => { finishRead = resolve })
    } },
    refreshThemeHostTargets() {},
    applyThemePresetVariables() {},
    async applyAppearanceMode() {},
    updateThemeVisualState() { writesAfterDispose++ },
    queueThemeHostRefresh() { writesAfterDispose++ },
    startThemeHostWatchdog() { writesAfterDispose++ },
})
const initialization = subject.initializeThemeSystem()
await readStarted
subject.destroyed = true
subject.themeBackgroundRevision++
finishRead({ blob: new Blob(['wallpaper']) })
await initialization
if (writesAfterDispose !== 0 || subject.themeBackgroundObjectUrl) {
    throw new Error('Late wallpaper reads must not recreate resources after disposal')
}

let corrections = 0
const scrollContainer = { isConnected: true, scrollTop: 100, scrollTo() { corrections++ } }
const lock = new ScrollLockManager({ getScrollContainer: () => scrollContainer, isGenerating: () => true })
lock.enabled = true
lock.navigationActive = true
lock.applyScrollCorrection(0)
lock.navigationActive = false
lock.scheduleScrollCorrection(0)
lock.markUserInteraction()
await new Promise(resolve => setTimeout(resolve, 20))
if (corrections !== 0) throw new Error('Scroll correction must yield to user navigation')

console.log('content script checks passed')
