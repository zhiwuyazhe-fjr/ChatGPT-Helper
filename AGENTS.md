# AGENTS.md — 协作约定

## 修改后的固定流程（必须遵守）

每次完成代码修改后，必须依次执行以下步骤，不要遗漏：

1. **构建与检查**：`npm run package`（等同 `build + check + 打包`，产物输出到 `artifacts/`）
2. **提交**：`git add -A && git commit`，提交信息用简短中文概括本次改动
3. **推送**：`git push origin main`

只要改动通过构建检查，就直接提交推送，不需要额外询问用户。

## 项目要点

- Chrome 扩展（Manifest V3），加载目录为仓库根目录（含 `manifest.json`、`icons/`、`libs/`、`content-scripts/`）
- 源码在 `src/content/helper/`，按编号分模块（10-base、93-app-styles、94-app-layout 等）；`content-scripts/dist/` 是构建产物，改源码后必须重新构建
- 版本号需要同步更新四处：`manifest.json`、`package.json`、`package-lock.json`（用 `npm install --package-lock-only`）、`src/content/helper/10-base.js` 的 `EXTENSION_VERSION`
- `manifest.json` 必须保持 UTF-8 编码，中文描述损坏会显示乱码
- `icons/logo.svg` 是品牌 Logo（用户提供），不要重绘或替换，UI 中优先加载它
- 产物目录 `artifacts/` 与源码一起提交

## 验证方式

- 构建检查：`npm run check`
- 本地 UI 预览：可写临时 HTML 测试页（stub `chrome.storage`/`chrome.runtime`）加载 `content-scripts/dist/chatgpt-helper.js`，用浏览器截图验证；测完删除临时文件，不要提交
