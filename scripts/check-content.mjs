import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'

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

for (const file of walk(path.join(root, 'content-scripts'))) {
    execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' })
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
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
    documentElement,
    body,
    head,
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

console.log('content script checks passed')
