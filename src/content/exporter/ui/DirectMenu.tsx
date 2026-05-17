import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { exportToHtml } from '../exporter/html'
import { exportToJson, exportToOoba, exportToTavern } from '../exporter/json'
import { exportToMarkdown } from '../exporter/markdown'
import { exportToText } from '../exporter/text'
import { ExportDialog } from './ExportDialog'
import { FileCode, IconCopy, IconJSON, IconMarkdown, IconSetting, IconZip } from './Icons'
import { MenuItem } from './MenuItem'
import { SettingProvider, useSettingContext } from './SettingContext'
import { SettingDialog } from './SettingDialog'
import type { FC } from '../type'

import '../style.css'
import './Dialog.css'

function DirectMenuInner({ container: _container }: { container: HTMLDivElement }) {
    const { t } = useTranslation()
    const [jsonOpen, setJsonOpen] = useState(false)
    const [exportOpen, setExportOpen] = useState(false)
    const [settingOpen, setSettingOpen] = useState(false)

    const {
        format,
        enableTimestamp,
        timeStamp24H,
        enableMeta,
        exportMetaList,
    } = useSettingContext()

    useEffect(() => {
        if (enableTimestamp) {
            document.body.setAttribute('data-time-format', timeStamp24H ? '24' : '12')
        }
        else {
            document.body.removeAttribute('data-time-format')
        }
    }, [enableTimestamp, timeStamp24H])

    const metaList = useMemo(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList])

    const onClickText = useCallback(() => exportToText(), [])
    const onClickMarkdown = useCallback(() => exportToMarkdown(format, metaList), [format, metaList])
    const onClickHtml = useCallback(() => exportToHtml(format, metaList), [format, metaList])
    const onClickJSON = useCallback(() => {
        setJsonOpen(true)
        return true
    }, [])
    const onClickOfficialJSON = useCallback(() => exportToJson(format), [format])
    const onClickTavern = useCallback(() => exportToTavern(format), [format])
    const onClickOoba = useCallback(() => exportToOoba(format), [format])

    return (
        <>
            <SettingDialog
                open={settingOpen}
                onOpenChange={setSettingOpen}
            >
                <div className="row-full">
                    <MenuItem text={t('Setting')} icon={IconSetting} />
                </div>
            </SettingDialog>

            <MenuItem
                text={t('Copy Text')}
                successText={t('Copied!')}
                icon={IconCopy}
                className="row-full"
                onClick={onClickText}
            />
            <MenuItem
                text={t('Markdown')}
                icon={IconMarkdown}
                className="row-half"
                onClick={onClickMarkdown}
            />
            <MenuItem
                text={t('HTML')}
                icon={FileCode}
                className="row-half"
                onClick={onClickHtml}
            />
            <Dialog.Root
                open={jsonOpen}
                onOpenChange={setJsonOpen}
            >
                <Dialog.Trigger asChild>
                    <MenuItem
                        text={t('JSON')}
                        icon={IconJSON}
                        className="row-half"
                        onClick={onClickJSON}
                    />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent" style={{ width: '320px' }}>
                        <Dialog.Title className="DialogTitle">{t('JSON')}</Dialog.Title>
                        <MenuItem
                            text={t('OpenAI Official Format')}
                            icon={IconCopy}
                            className="row-full"
                            onClick={onClickOfficialJSON}
                        />
                        <MenuItem
                            text="JSONL (TavernAI, SillyTavern)"
                            icon={IconCopy}
                            className="row-full"
                            onClick={onClickTavern}
                        />
                        <MenuItem
                            text="Ooba (text-generation-webui)"
                            icon={IconCopy}
                            className="row-full"
                            onClick={onClickOoba}
                        />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <ExportDialog
                format={format}
                open={exportOpen}
                onOpenChange={setExportOpen}
            >
                <div className="row-full">
                    <MenuItem
                        text={t('Export All')}
                        icon={IconZip}
                    />
                </div>
            </ExportDialog>
        </>
    )
}

export const DirectMenu: FC<{ container: HTMLDivElement }> = ({ container }) => {
    return (
        <SettingProvider>
            <DirectMenuInner container={container} />
        </SettingProvider>
    )
}
