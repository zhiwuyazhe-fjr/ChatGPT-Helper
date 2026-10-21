# Helper 核心架构与验证

## 2.6.0 的边界

保留提示词、会话整理、导出、阅读导航、主题、复制、标签页和备份功能及已有存储键。导出引擎仍按需加载；本次重构集中在 Helper 内容脚本，未替换导出引擎。

| 层 | 入口 | 职责 |
| --- | --- | --- |
| 启动 | `src/content/entries/chatgpt-helper.js` | 等待 DOM 和存储就绪，只创建一次应用 |
| 组合 | `src/content/helper/app.js` | 显式组合功能对象；功能模块导入不再修改全局或原型 |
| 生命周期 | `90-app-core.js`、`15-runtime.js` | 创建管理器，统一释放事件、观察器和任务；可选功能独立报告失败 |
| 宿主适配 | `80-chatgpt-adapter.js` | 识别消息、消息角色、输入框及滚动容器；消息发现不依赖能否滚动 |
| 功能 | `91`–`100`、各 manager | 设置、主题、大纲、提示词、会话、导出与备份各自拥有状态 |
| 样式 | `styles/helper.css`、`21-theme-runtime.js` | 助手界面与宿主主题规则分别维护；构建时内联，无额外网络请求 |
| 兼容出口 | `index.js` | 保留诊断和测试使用的 `window.__MY_EXT__.helper`；内部使用直接 ESM 导入 |

`10-base.js` 保留翻译、图标、默认配置和纯工具；编号保留以便查找，模块执行顺序由 import 依赖决定。新增功能应导出功能对象并在 `app.js` 注册，不要恢复按脚本顺序读取全局对象的模式。

## 已移除的故障来源

- 主题以 `html` 的原生状态为准，清除旧版 `body.dark/light` 残留。宿主主题使用语义标记和统一正文色，避免亮色页面继承反色正文。
- 壁纸使用独立绘制层。IndexedDB 写入以事务完成为准；异步读取和上传带版本号，关闭壁纸、删除、更换图片、销毁应用都会使旧结果失效。读取失败保留资产引用。
- 大纲空态也保留工具栏和订阅。一个管理器负责内容更新，忽略自身 DOM 变化；文本未变时更新节点引用，不重建目录。标题层级按回答隔离，ID 包含路由与消息身份。
- 滚动、返回锚点和大纲跳转使用 `ScrollManager`。移除重复强制滚动、伪造输入与修改原生滚动属性的逻辑；真实用户输入中止平滑滚动，自动滚动保护让出导航控制权。
- SPA 导航只有一个宿主刷新调度入口。路由变化清理旧锚点、取消旧滚动并重新绑定阅读记录。切离大纲停止其监听。
- 初始化等待明确就绪事件，取消多层固定延迟和重复创建重试。资源释放后，迟到的壁纸读取不能重新创建 URL 或观察器。

## 交互约定

保留现有安静、高密度的侧栏设计和品牌图标，不引入新视觉组件或生产依赖。标签页支持方向键、Home、End 和正确的焦点状态；窄窗口以覆盖式面板显示，不挤压正文。主题与关于弹窗同步关闭、返回触发按钮焦点，快速重开不会出现重复节点。提示消息使用 `role="status"`。

## 验证

```powershell
npm run package
```

该命令构建两个内容脚本，检查语法、四处版本号、编码、MV3 打包约束、会话同步、主题销毁竞态、滚动保护竞态及 TypeScript，然后生成 `artifacts/`。

真实浏览器回归使用本地仿真 ChatGPT 页面，存储、会话内容和上传图片均为测试数据，不访问用户会话：

```powershell
# 使用已安装的 Playwright；也可将 PLAYWRIGHT_MODULE_PATH 指向既有 playwright/index.mjs
npm install --no-save --package-lock=false playwright
$env:BROWSER_CHANNEL = 'chrome'
npm run test:browser
```

不指定 Chrome 时，需安装 Playwright 对应的 Chromium。可设置 `BROWSER_TEST_OUTPUT` 保留截图与 JSON 报告；测试代码在 `scripts/test-browser.mjs`，页面在 `scripts/fixtures/chatgpt.html`。

浏览器检查覆盖：空大纲后产生回复、流式文本、相同标题替换 DOM、折叠保留、明暗正文对比、系统主题、壁纸上传/刷新恢复/并发删除、快速开关弹窗、SPA 容器替换、锚点、无 `/c/` 路径的新会话、提示词搜索与插入、备份内容、设置保存、快捷键消息入口和窄屏键盘导航。真实网站 DOM 后续改版仍需在适配层跟进；本地仿真不等于对所有线上页面的验收。

## 新版 ChatGPT 现场适配（版本仍为 2.6.0）

2026-10-21 在已登录的实际会话中复现了旧测试未覆盖的三个问题，并据此补充适配：

- 新页面没有 `data-message-author-role`、`conversation-turn-*` 或 `article`。使用 `data-content-search-unit-key` / `data-chatgpt-search-unit-key` 区分用户和助手，以 `data-chatgpt-selection-message-id` 和 `data-turn-key` 保持消息身份。正文在 `data-markdown-text-style="assistant-message"` 中；屏幕阅读器专用的 `h4.sr-only` 不纳入大纲。
- DIL 正文渲染器拥有独立的 `data-theme` 调色板。仅切换 html 会留下浅色背景上的深色模式文字。现在同步包含 `data-dil-message-id` / `data-oai-writing-block-surface` 的原生主题作用域，并处理延迟插入与原生重新渲染。
- 会话祖先用 `::before` 绘制不透明背景，元素自身的 computed background 却透明。壁纸开启时清除已识别结构路径的伪元素背景，关闭时恢复原样；不清除正文卡片内部结构。

真实输入区使用 `data-composer-markdown`，可能没有 ID，页面内另有可编辑写作卡片。输入框识别优先使用该语义标记并排除写作卡片，避免提示词插入错误区域。

现场已核验三个提问和三个回复摘要、大纲搜索与跳转、亮暗切换、原有壁纸开关与刷新恢复。刷新过程中曾出现原生“无法加载此回复”：关闭 Helper 后刷新仍能复现，重新进入原会话及独立标签页后回复完整恢复；没有把该失败状态算作大纲验收通过。回归套件新增五个 modern 场景，总计 21 项；fixture 仅保存合成内容和结构，不包含用户会话或壁纸。
