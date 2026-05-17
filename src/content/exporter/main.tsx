import { render } from 'preact'
import sentinel from 'sentinel-js'
import { fetchConversation, processConversation } from './api'
import { getChatIdFromUrl } from './page'
import { DirectMenu } from './ui/DirectMenu'
import { onloadSafe } from './utils/utils'

import './i18n'
import './styles/missing-tailwind.css'

declare global {
    interface Window {
        __MY_EXT__?: Record<string, any>
        ChatGPTExporterMount?: (targetElement: Element) => Element | null
    }
}

const EXPORTER_STYLE_ID = 'chatgpt-helper-exporter-compact-style'

function ensureNamespace() {
    window.__MY_EXT__ = window.__MY_EXT__ || {}
    return window.__MY_EXT__
}

function ensureCompactStyle() {
    if (document.getElementById(EXPORTER_STYLE_ID)) return
    const style = document.createElement('style')
    style.id = EXPORTER_STYLE_ID
    style.textContent = `
        .chatgpt-helper-export-grid {
          padding: 12px 14px 18px !important;
          gap: 7px !important;
          grid-template-columns: minmax(0, 1fr) !important;
          align-content: start !important;
          grid-auto-rows: minmax(50px, auto) !important;
        }
        .chatgpt-helper-export-grid > .row-full,
        .chatgpt-helper-export-grid > .row-half {
          grid-column: auto !important;
        }
        .chatgpt-helper-export-grid > .row-full:not(.menu-item),
        .chatgpt-helper-export-grid > .row-half:not(.menu-item) {
          display: contents !important;
          grid-column: auto !important;
        }
        .chatgpt-helper-export-grid .menu-item {
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
          padding: 0 13px !important;
          min-height: 50px !important;
          height: auto !important;
          margin: 0 !important;
          gap: 11px !important;
          border-radius: 9px !important;
          box-shadow: none !important;
          transition: all 0.2s ease !important;
          background: color-mix(in srgb, var(--gh-panel-card, #ffffff), transparent 18%) !important;
          border: 1px solid color-mix(in srgb, var(--gh-panel-line, #d6ddd4), transparent 20%) !important;
          color: var(--gh-text, #20251f) !important;
          text-align: left !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }
        .chatgpt-helper-export-grid .menu-item:hover {
          transform: none !important;
          background: color-mix(in srgb, var(--gh-panel-card-hover, #eef3ed), transparent 12%) !important;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gh-primary, #2f7f6e), transparent 82%) !important;
          border-color: color-mix(in srgb, var(--gh-primary, #2f7f6e), transparent 54%) !important;
        }
        .chatgpt-helper-export-grid .menu-item-icon {
          width: 24px !important;
          height: 24px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 0 24px !important;
          color: color-mix(in srgb, var(--gh-primary, #2f7f6e), var(--gh-text-secondary, #677268) 34%) !important;
        }
        .chatgpt-helper-export-grid .menu-item-icon svg,
        .chatgpt-helper-export-grid .menu-item > svg {
          width: 17px !important;
          height: 17px !important;
          color: currentColor !important;
          flex-shrink: 0 !important;
        }
        .chatgpt-helper-export-grid .menu-item-label {
          min-width: 0 !important;
          flex: 1 1 auto !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
          color: var(--gh-text, #20251f) !important;
          font-size: 14px !important;
          font-weight: 680 !important;
          line-height: 1.25 !important;
        }
        .chatgpt-helper-export-grid .menu-item [class*="icon"] {
          font-size: 17px !important;
          width: 17px !important;
          height: 17px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        body[data-gh-mode="dark"] .chatgpt-helper-export-grid .menu-item {
          background: color-mix(in srgb, var(--gh-panel-card, #20251f), transparent 5%) !important;
          border-color: var(--gh-panel-line, #3c443b) !important;
        }
        :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid {
          background: transparent !important;
        }
        :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item {
          background: var(--gh-panel-card-bg, var(--gh-panel-card, #ffffff)) !important;
          border-color: var(--gh-panel-card-border, var(--gh-panel-line, #d6ddd4)) !important;
          backdrop-filter: blur(var(--gh-panel-blur, 12px)) saturate(1.02) !important;
          -webkit-backdrop-filter: blur(var(--gh-panel-blur, 12px)) saturate(1.02) !important;
        }
        :root[data-gh-bg-enabled="true"] .chatgpt-helper-export-grid .menu-item:hover {
          background: color-mix(in srgb, var(--gh-panel-card-bg, var(--gh-panel-card, #ffffff)), transparent 8%) !important;
          border-color: color-mix(in srgb, var(--gh-primary, #2f7f6e), transparent 28%) !important;
        }
        .chatgpt-helper-export-grid .menu-item[disabled] {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
          filter: none !important;
        }
    `
    document.head.appendChild(style)
}

function defineExporterMount() {
    const mount = (targetElement: Element) => {
        if (!targetElement) return null
        ensureCompactStyle()

        const container = document.createElement('div')
        container.style.width = '100%'
        container.style.height = '100%'
        container.style.position = 'relative'
        container.style.overflow = 'auto'
        container.style.padding = '12px 14px 18px'
        container.style.display = 'grid'
        container.style.gridTemplateColumns = 'minmax(0, 1fr)'
        container.style.gap = '7px'
        container.style.alignContent = 'start'
        container.style.overflowY = 'auto'
        container.style.background = 'transparent'
        container.className = 'chatgpt-helper-export-grid chatgpt-helper-export-host'
        container.setAttribute('data-gh-exporter-host', 'true')
        targetElement.appendChild(container)

        try {
            render(<DirectMenu container={container} />, container)
        }
        catch (error) {
            console.error('[ChatGPT Exporter] Failed to render DirectMenu:', error)
            container.appendChild(document.createElement('div')).textContent = `导出功能加载失败: ${(error as Error).message}`
        }
        return container
    }

    window.ChatGPTExporterMount = mount
    ensureNamespace().ChatGPTExporterMount = mount
}

function startTimestampObserver() {
    onloadSafe(() => {
        const styleEl = document.createElement('style')
        styleEl.id = 'sentinel-css'
        document.head.append(styleEl)

        let chatId = ''
        sentinel.on('[role="presentation"]', async () => {
            const currentChatId = getChatIdFromUrl()
            if (!currentChatId || currentChatId === chatId) return
            chatId = currentChatId

            const rawConversation = await fetchConversation(chatId, false)
            const { conversationNodes } = processConversation(rawConversation)

            const threadContents = Array.from(document.querySelectorAll('main [data-testid^="conversation-turn-"] [data-message-id]'))
            if (threadContents.length === 0) return

            threadContents.forEach((thread, index) => {
                const createTime = conversationNodes[index]?.message?.create_time
                if (!createTime) return

                const date = new Date(createTime * 1000)
                const timestamp = document.createElement('time')
                timestamp.className = 'w-full text-gray-500 dark:text-gray-400 text-sm text-right'
                timestamp.dateTime = date.toISOString()
                timestamp.title = date.toLocaleString()

                const hour12 = document.createElement('span')
                hour12.setAttribute('data-time-format', '12')
                hour12.textContent = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                const hour24 = document.createElement('span')
                hour24.setAttribute('data-time-format', '24')
                hour24.textContent = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                timestamp.append(hour12, hour24)
                thread.append(timestamp)
            })
        })
    })
}

defineExporterMount()
startTimestampObserver()
