import { createHash } from "node:crypto";
import {
  readdirSync,
  readFileSync,
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  renameSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { build } from "vite";
import preact from "@preact/preset-vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve, join, dirname, basename } from "node:path";
import "./generate-html-assets.mjs";

const root = process.cwd();
const staging = mkdtempSync(join(tmpdir(), "chatgpt-helper-build-"));
const outDir = resolve(staging, "content-scripts/dist");
const sources = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sources(resolve(directory, entry.name))
      : [resolve(directory, entry.name)],
  );
const digest = createHash("sha256");
for (const file of sources(resolve(root, "src"))
  .filter((file) => /\.(?:js|ts|tsx|css|html|json)$/.test(file))
  .sort())
  digest.update(readFileSync(file));
digest.update(readFileSync(resolve(root, "package.json")));
digest.update(readFileSync(resolve(root, "package-lock.json")));
digest.update(readFileSync(resolve(root, "scripts/build-content.mjs")));
const buildId = digest.digest("hex").slice(0, 16);
const version = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
).version;
console.log(`Build ${version} / ${buildId}`);

const common = {
  configFile: false,
  root,
  esbuild: {
    charset: "ascii",
  },
  plugins: [
    preact({
      devToolsEnabled: false,
      devtoolsInProd: false,
    }),
    cssInjectedByJsPlugin(),
  ],
  define: {
    "process.env.NODE_ENV": '"production"',
    __HELPER_BUILD_ID__: JSON.stringify(buildId),
    __HELPER_VERSION__: JSON.stringify(version),
  },
};

try {
  await build({
    ...common,
    build: {
      emptyOutDir: true,
      outDir,
      target: "es2020",
      minify: true,
      sourcemap: false,
      lib: {
        entry: resolve(root, "src/content/entries/chatgpt-exporter.tsx"),
        name: "ChatGPTExporterContent",
        formats: ["iife"],
        fileName: () => "chatgpt-exporter.js",
      },
      rollupOptions: {
        external: ["jszip"],
        output: {
          globals: {
            jszip: "JSZip",
          },
          inlineDynamicImports: true,
        },
      },
    },
  });

  await build({
    ...common,
    build: {
      emptyOutDir: false,
      outDir,
      target: "es2020",
      minify: true,
      sourcemap: false,
      lib: {
        entry: resolve(root, "src/content/entries/chatgpt-helper.js"),
        name: "ChatGPTHelperContent",
        formats: ["iife"],
        fileName: () => "chatgpt-helper.js",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  });

  await build({
    ...common,
    build: {
      emptyOutDir: true,
      outDir: resolve(staging, "background"),
      target: "es2022",
      minify: false,
      lib: {
        entry: resolve(root, "src/background/index.js"),
        name: "ChatGPTHelperWorker",
        formats: ["iife"],
        fileName: () => "sw.js",
      },
    },
  });

  // Publish only after every entry compiled successfully. A failed build leaves the
  // installed extension intact; the shared build ID guards the brief replacement window.
  for (const file of [
    "content-scripts/dist/chatgpt-helper.js",
    "content-scripts/dist/chatgpt-exporter.js",
    "background/sw.js",
  ]) {
    const target = resolve(root, file);
    mkdirSync(dirname(target), { recursive: true });
    const temporary = `${target}.next`;
    writeFileSync(temporary, readFileSync(resolve(staging, file)));
    renameSync(temporary, target);
  }
} finally {
  if (
    dirname(resolve(staging)) !== resolve(tmpdir()) ||
    !basename(staging).startsWith("chatgpt-helper-build-")
  )
    throw new Error("Unexpected build staging directory");
  rmSync(staging, { recursive: true, force: true });
}
