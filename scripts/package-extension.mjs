import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve, sep } from 'node:path'
import JSZip from 'jszip'

const root = process.cwd()
const artifactsDir = resolve(root, 'artifacts')
const manifest = JSON.parse(await readFile(join(root, 'manifest.json'), 'utf8'))
const version = manifest.version
const unpackedName = `chatgpt-helper-${version}-unpacked`
const unpackedDir = join(artifactsDir, unpackedName)
const zipPath = join(artifactsDir, `chatgpt-helper-${version}-chrome.zip`)

if (dirname(artifactsDir) !== resolve(root)) {
    throw new Error(`Refusing to clean unexpected artifacts path: ${artifactsDir}`)
}

const entries = [
    'manifest.json',
    'LICENSE',
    'content-scripts/gm-api-adapter.js',
    'content-scripts/dist',
    'icons',
    'libs',
]

await rm(artifactsDir, { recursive: true, force: true })
await mkdir(unpackedDir, { recursive: true })

for (const entry of entries) {
    const source = join(root, entry)
    const target = join(unpackedDir, entry)
    await mkdir(dirname(target), { recursive: true })
    await cp(source, target, { recursive: true })
}

const requiredFiles = [
    'manifest.json',
    'LICENSE',
    'content-scripts/gm-api-adapter.js',
    'content-scripts/dist/chatgpt-exporter.js',
    'content-scripts/dist/chatgpt-helper.js',
    'icons/icon16.png',
    'icons/icon48.png',
    'icons/icon128.png',
    'icons/logo.svg',
    'libs/jszip.min.js',
    'libs/html2canvas.min.js',
]

for (const file of requiredFiles) {
    await stat(join(unpackedDir, file))
}

for (const script of manifest.content_scripts.flatMap(item => item.js || [])) {
    await stat(join(unpackedDir, script))
}

async function addDirectoryToZip(zip, directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
        const absolute = join(directory, item.name)
        if (item.isDirectory()) {
            await addDirectoryToZip(zip, absolute)
            continue
        }
        const zipName = relative(unpackedDir, absolute).split(sep).join('/')
        zip.file(zipName, await readFile(absolute))
    }
}

const zip = new JSZip()
await addDirectoryToZip(zip, unpackedDir)
const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
    platform: 'UNIX',
})
await writeFile(zipPath, buffer)

console.log(`Created unpacked extension: ${unpackedDir}`)
console.log(`Created install archive: ${zipPath}`)
console.log('After extraction, load the extracted folder from chrome://extensions/.')
