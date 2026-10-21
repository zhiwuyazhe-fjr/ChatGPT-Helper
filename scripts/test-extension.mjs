import assert from "node:assert/strict";
import {
  cp,
  readFile,
  writeFile,
  mkdtemp,
  mkdir,
  rm,
  readdir,
} from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve, dirname, basename, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import JSZip from "jszip";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE_PATH
    ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE_PATH)).href
    : "playwright"
);
let installed =
  process.env.EXTENSION_TEST_CHROMIUM || chromium.executablePath();
if (!existsSync(installed) && process.env.LOCALAPPDATA) {
  const cache = join(process.env.LOCALAPPDATA, "ms-playwright");
  const versions = (await readdir(cache))
    .filter((name) => /^chromium-\d+$/.test(name))
    .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]));
  installed =
    versions
      .map((name) => join(cache, name, "chrome-win64/chrome.exe"))
      .find(existsSync) || installed;
}
if (!existsSync(installed))
  throw new Error(
    "Set EXTENSION_TEST_CHROMIUM to an installed Chromium executable for real extension tests.",
  );
const temporary = await mkdtemp(join(tmpdir(), "chatgpt-helper-extension-"));
const results = [];
const model = {
  id: "fixture",
  title: "真实扩展隔离世界测试",
  create_time: 1700000000,
  update_time: 1700000001,
  current_node: "a1",
  mapping: {
    root: { id: "root", parent: null, children: ["u1"], message: null },
    u1: {
      id: "u1",
      parent: "root",
      children: ["a1"],
      message: {
        id: "u1",
        author: { role: "user" },
        recipient: "all",
        content: { content_type: "text", parts: ["验证内容脚本与后台通信"] },
      },
    },
    a1: {
      id: "a1",
      parent: "u1",
      children: [],
      message: {
        id: "a1",
        author: { role: "assistant" },
        recipient: "all",
        content: {
          content_type: "text",
          parts: ["# 原生扩展验证\n\n包含中文、**Markdown**、代码和数据。"],
        },
      },
    },
  },
};
const markup =
  '<article><div data-message-author-role="user" data-message-id="u1"><p>验证内容脚本与后台通信</p></div></article><article><div data-message-author-role="assistant" data-message-id="a1"><div class="markdown"><h2>原生扩展验证</h2><p>包含中文、Markdown、代码和数据。</p></div></div></article>';
let html = await readFile(join(root, "scripts/fixtures/chatgpt.html"), "utf8");
html = html
  .replace(/<script\b[\s\S]*?<\/script>/g, "")
  .replace(
    '<div id="fixture-messages"></div>',
    '<div id="fixture-messages">' + markup + "</div>",
  );
async function run(name, modify, check) {
  const extension = join(temporary, name, "extension");
  await mkdir(extension, { recursive: true });
  for (const entry of [
    "manifest.json",
    "background",
    "content-scripts",
    "icons",
    "libs",
  ])
    await cp(join(root, entry), join(extension, entry), { recursive: true });
  if (modify) await modify(extension);
  const context = await chromium.launchPersistentContext(
    join(temporary, name, "profile"),
    {
      executablePath: installed,
      headless: true,
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`,
      ],
      viewport: { width: 1440, height: 1000 },
      locale: "zh-CN",
    },
  );
  try {
    const worker =
      context.serviceWorkers()[0] ||
      (await context.waitForEvent("serviceworker"));
    await worker.evaluate(async () => {
      await chrome.storage.local.set({
        chatgpt_onboarding_done: true,
        chatgpt_language: "zh-CN",
        chatgpt_settings: {
          readingHistory: { persistence: false, autoRestore: false },
        },
      });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await context.route("https://chatgpt.com/**", (route) => {
      const url = new URL(route.request().url());
      if (url.pathname === "/api/auth/session")
        return route.fulfill({ json: { accessToken: "fixture-token" } });
      if (url.pathname === "/backend-api/conversation/fixture")
        return route.fulfill({ json: model });
      if (url.pathname === "/backend-api/conversations")
        return route.fulfill({
          json: {
            items: [
              { id: "fixture", title: model.title, create_time: 1700000000 },
            ],
            total: 1,
          },
        });
      if (url.pathname.includes("/backend-api/gizmos/"))
        return route.fulfill({ json: { items: [], cursor: null } });
      if (url.pathname.startsWith("/backend-api/"))
        return route.fulfill({ json: {} });
      if (url.pathname === "/c/fixture")
        return route.fulfill({
          contentType: "text/html",
          body: html,
          headers: {
            "Content-Security-Policy":
              "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: chrome-extension:; font-src 'self' data:; frame-src 'self'",
          },
        });
      return route.fulfill({ status: 404, body: "" });
    });
    await page.goto("https://chatgpt.com/c/fixture");
    await page.locator("#export-tab").waitFor();
    assert.equal(
      await page.evaluate(() => typeof window.__MY_EXT__),
      "undefined",
      "Helper must be isolated from the page world",
    );
    await check(page, worker);
    assert.deepEqual(errors, []);
    results.push({ name, passed: true });
    console.log(`PASS real extension: ${name}`);
  } catch (error) {
    results.push({ name, passed: false, error: error.stack });
    console.error(`FAIL real extension ${name}: ${error.stack}`);
  } finally {
    await context.close();
  }
}
try {
  await run("matching-build", null, async (page) => {
    await page.locator("#export-tab").click();
    await page.getByRole("button", { name: "Markdown", exact: true }).waitFor();
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Markdown", exact: true }).click();
    const file = await download;
    const content = await readFile(await file.path(), "utf8");
    assert.match(content, /验证内容脚本与后台通信/);
    assert.match(content, /原生扩展验证/);
    await page.getByRole("button", { name: "批量导出", exact: true }).click();
    await page.locator(".gh-batch-row input").check();
    const zipped = page.waitForEvent("download");
    await page.getByRole("button", { name: "导出", exact: true }).click();
    const zip = await JSZip.loadAsync(
      await readFile(await (await zipped).path()),
    );
    assert.equal(Object.keys(zip.files).length, 1);
    await page.getByLabel("关闭", { exact: true }).click();
    for (let i = 0; i < 3; i++) {
      await page.locator("#prompts-tab").click();
      assert.equal(await page.locator(".gh-export-portal").count(), 0);
      await page.locator("#export-tab").click();
      await page
        .getByRole("button", { name: "导出图片", exact: true })
        .waitFor();
      assert.equal(await page.locator(".gh-export-portal").count(), 1);
    }
  });
  await run(
    "worker-build-mismatch",
    async (extension) => {
      const path = join(extension, "background/sw.js");
      const source = await readFile(path, "utf8");
      await writeFile(
        path,
        source.replace(
          /const BUILD_ID = "[a-f0-9]+"/,
          'const BUILD_ID = "outdated-build"',
        ),
      );
    },
    async (page) => {
      await page.locator("#export-tab").click();
      await page
        .locator(".chatgpt-helper-export-engine-error")
        .filter({ hasText: "版本" })
        .waitFor();
      assert.equal(
        await page
          .getByRole("button", { name: "Markdown", exact: true })
          .count(),
        0,
      );
    },
  );
  await run(
    "v270-loaded-page-migration",
    async (extension) => {
      const helper = execFileSync(
        "git",
        ["show", "31df451:content-scripts/dist/chatgpt-helper.js"],
        { cwd: root, encoding: "utf8" },
      ).replaceAll("fetchBackendResponse", "legacyBackendRequest");
      const worker = execFileSync("git", ["show", "31df451:background/sw.js"], {
        cwd: root,
        encoding: "utf8",
      });
      await writeFile(
        join(extension, "content-scripts/dist/chatgpt-helper.js"),
        helper,
      );
      await writeFile(join(extension, "background/sw.js"), worker);
      const manifest = JSON.parse(
        await readFile(join(extension, "manifest.json"), "utf8"),
      );
      manifest.version = "2.7.0";
      await writeFile(
        join(extension, "manifest.json"),
        JSON.stringify(manifest),
      );
    },
    async (page) => {
      await page.locator("#export-tab").click();
      const download = page.waitForEvent("download");
      await page.getByRole("button", { name: "Markdown", exact: true }).click();
      assert.match(
        await readFile(await (await download).path(), "utf8"),
        /验证内容脚本与后台通信/,
      );
      await page.getByRole("button", { name: "批量导出", exact: true }).click();
      await page.locator(".gh-batch-row").waitFor();
      assert.equal(await page.locator(".gh-batch-row").count(), 1);
    },
  );
} finally {
  console.log(JSON.stringify({ extensionTests: results }));
  if (
    dirname(resolve(temporary)) !== resolve(tmpdir()) ||
    !basename(temporary).startsWith("chatgpt-helper-extension-")
  )
    throw new Error("Unsafe test cleanup path");
  await rm(temporary, { recursive: true, force: true });
}
if (results.some((result) => !result.passed)) process.exitCode = 1;
