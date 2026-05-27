import { build } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'node:path'
import './generate-html-assets.mjs'

const root = process.cwd()
const outDir = resolve(root, 'content-scripts/dist')

const common = {
    configFile: false,
    root,
    esbuild: {
        charset: 'utf8',
    },
    plugins: [
        preact({
            devToolsEnabled: false,
            devtoolsInProd: false,
        }),
        cssInjectedByJsPlugin(),
    ],
    define: {
        'process.env.NODE_ENV': '"production"',
    },
}

await build({
    ...common,
    build: {
        emptyOutDir: true,
        outDir,
        target: 'es2020',
        minify: false,
        sourcemap: false,
        lib: {
            entry: resolve(root, 'src/content/entries/chatgpt-exporter.tsx'),
            name: 'ChatGPTExporterContent',
            formats: ['iife'],
            fileName: () => 'chatgpt-exporter.js',
        },
        rollupOptions: {
            external: ['jszip', 'html2canvas'],
            output: {
                globals: {
                    jszip: 'JSZip',
                    html2canvas: 'html2canvas',
                },
                inlineDynamicImports: true,
            },
        },
    },
})

await build({
    ...common,
    build: {
        emptyOutDir: false,
        outDir,
        target: 'es2020',
        minify: false,
        sourcemap: false,
        lib: {
            entry: resolve(root, 'src/content/entries/chatgpt-helper.js'),
            name: 'ChatGPTHelperContent',
            formats: ['iife'],
            fileName: () => 'chatgpt-helper.js',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
})
