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

## 核心架构

- Helper 使用显式 ESM 导入；`src/content/helper/app.js` 统一组合功能对象，禁止恢复依赖脚本顺序的全局解构与分散原型补丁
- `15-runtime.js` 管理事件/观察器/延迟任务生命周期；正文消息及滚动容器识别集中在 `80-chatgpt-adapter.js`
- 所有阅读导航通过 `ScrollManager`，不要修改原生滚动 API 或重复派发强制滚动
- 助手 CSS 在 `src/content/helper/styles/helper.css`，宿主主题 CSS 在 `21-theme-runtime.js`；主题状态和资产读取分别归属 `92-app-theme.js` 与 `20-theme-assets.js`
- 架构说明与回归运行方法见 `docs/architecture.md`；核心行为改动需执行 `npm run test:browser`（使用已安装 Playwright）

## 验证方式

- 构建检查：`npm run check`
- 本地 UI 预览：可写临时 HTML 测试页（stub `chrome.storage`/`chrome.runtime`）加载 `content-scripts/dist/chatgpt-helper.js`，用浏览器截图验证；测完删除临时文件，不要提交
