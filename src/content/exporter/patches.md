# ChatGPT Helper 导出模块

格式转换代码最初基于 `pionxzh/chatgpt-exporter` 的 `userscript-v2.32.1`；原许可保留在 `LICENSE`，发布包包含根目录 `THIRD_PARTY_NOTICES.md`。产品界面、消息适配、生命周期与运行时现由 Helper 统一管理。

## 2.7.0 集成边界

- `96-app-export.js` 负责按需加载、挂载和销毁；`host.ts` 是唯一服务合同，提供消息快照、当前上下文、订阅、通知、后端适配器和 ZIP 加载。
- `main.tsx` 只创建一处面板根和一处弹窗根，返回带 `destroy`、`contextChanged`、`setLanguage`、`openImage` 的控制器；无时间戳注入器、全页消息观察器、语言广播监听或固定轮询。
- 消息身份和范围由 `80-chatgpt-adapter.js` 提供；`66-message-snapshot.js` 输出可移植、安全的 HTML 与文字，`65-message-select-manager.js` 拥有选择状态和订阅。
- 后端认证与会话管理共用 `adapter.fetchBackendResponse`，401 续期与 Cookie 回退也共用同一路径。格式层保留 HTTP/429 的错误类型，以支持取消及限流等待。
- 导出设置保留已有 `exporter:*` 键，使用 Helper 的扩展存储桥接；只使用 Helper 支持的中英文，不向网站 localStorage 另写设置。
- 图片使用隔离 iframe 排版和浏览器原生 SVG/Canvas 渲染；内嵌公式字体，PNG/JPEG 不依赖 html2canvas。多页逐页分配并释放 Canvas，再按顺序打入 ZIP。
- 批量导出只负责导出；归档、删除仍由 Helper 的会话页负责。项目列表保留不透明游标，导出转换不修改 API 或导入文件的数据。
- 所有导出 CSS 都限定在 `.gh-export-root` / `.gh-export-portal` 内。旧菜单、队列、独立语言列表和未使用的依赖已移除。

验证入口：`npm run package`、`npm run test:browser`。图片交互参考 Cherry Studio 的选择、预览、保存和分页流程：https://cherryai.com/docs/en/mobile/sharing-and-export/ 。未复制其实现代码。


## 2.7.1 服务合同

接口移除 `adapter`、模块全局宿主和全局 Portal。`ExportHost` 以协议号及构建指纹提供请求、上下文、消息快照和依赖加载；`ExportSession` 独占生命周期和文件提交。转换函数接收 `ExportOptions`，不读取存储或触发下载。`model/` 与 `repository.ts` 分别拥有内容结构和远端数据访问。

2.7.0 旧页面仅通过 `legacy-host.ts` 的显式迁移边界进入新合同。主脚本、导出脚本和后台必须来自同一构建，新协议不接受混合指纹。测试包含真实隔离世界和旧页面升级，详见 `docs/architecture.md`。
