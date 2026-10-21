import * as Dialog from '@radix-ui/react-dialog';
import { useLayoutEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { exportToHtml } from '../exporter/html';
import { exportToJson, exportToOoba, exportToTavern } from '../exporter/json';
import { exportToMarkdown } from '../exporter/markdown';
import { exportToText } from '../exporter/text';
import { getExportPortal } from '../host';
import { ExportDialog } from './ExportDialog';
import { ImageDialog } from './ImageDialog';
import { FileCode, IconCopy, IconJSON, IconMarkdown, IconSetting, IconZip } from './Icons';
import { MenuItem } from './MenuItem';
import { SettingProvider, useSettingContext } from './SettingContext';
import { SettingDialog } from './SettingDialog';
import type { ExportHost, MessageSnapshot } from '../host';
import '../style.css';
import './Dialog.css';

type Props = { container: HTMLDivElement; host: ExportHost };
function DirectMenuInner({ container, host }: Props) {
    const { t } = useTranslation();
    const [jsonOpen, setJsonOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const [image, setImage] = useState<{ messages: MessageSnapshot[]; ids: string[] } | null>(null);
    const [selectedCount, setSelectedCount] = useState(host.getSelectedMessages().length);
    const { format, enableMeta, exportMetaList } = useSettingContext();
    const metaList = enableMeta ? exportMetaList : [];
    const openImage = () => {
        const selected = host.getSelectedMessages();
        const messages = host.getMessages();
        for (const saved of selected) if (!messages.some(message => message.id === saved.id)) messages.push(saved);
        messages.sort((a, b) => a.order - b.order);
        if (!messages.length) { host.notify(t('Please start a conversation first')); return; }
        setImage({ messages, ids: (selected.length ? selected : messages).map(message => message.id) });
    };
    useLayoutEffect(() => {
        const changed = () => { setImage(null); setJsonOpen(false); setExportOpen(false); setSelectedCount(host.getSelectedMessages().length); };
        const unsubscribe = host.subscribe(() => setSelectedCount(host.getSelectedMessages().length));
        container.addEventListener('open-image', openImage);
        container.addEventListener('context-changed', changed);
        return () => { unsubscribe(); container.removeEventListener('open-image', openImage); container.removeEventListener('context-changed', changed); };
    }, [container, host]);
    return <>
        <section className="gh-export-section">
            <h3>{t('Current conversation')}</h3>
            <p className="gh-export-hint">{t('Current export description')}</p>
            <MenuItem text={t('Export image')} icon={FileCode} onClick={() => { openImage(); return true; }} />
            <p className="gh-export-hint gh-export-selection-count">{selectedCount ? t('Selected count', { count: selectedCount }) : t('Image entry hint')}</p>
            <MenuItem text={t('Copy Text')} successText={t('Copied!')} icon={IconCopy} onClick={exportToText} />
            <MenuItem text={t('Markdown')} icon={IconMarkdown} onClick={() => exportToMarkdown(format, metaList)} />
            <MenuItem text={t('HTML')} icon={FileCode} onClick={() => exportToHtml(format, metaList)} />
            <MenuItem text={t('JSON')} icon={IconJSON} onClick={() => { setJsonOpen(true); return true; }} />
        </section>
        <section className="gh-export-section">
            <h3>{t('Export tools')}</h3>
            <ExportDialog format={format} open={exportOpen} onOpenChange={setExportOpen}><MenuItem text={t('Export All')} icon={IconZip} /></ExportDialog>
            <SettingDialog open={settingOpen} onOpenChange={setSettingOpen}><MenuItem text={t('Exporter Settings')} icon={IconSetting} /></SettingDialog>
        </section>
        <Dialog.Root open={jsonOpen} onOpenChange={setJsonOpen}>
            <Dialog.Portal container={getExportPortal()}><Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent" aria-describedby={undefined}>
                    <div className="gh-export-dialog-heading"><Dialog.Title className="DialogTitle">JSON</Dialog.Title><Dialog.Close className="gh-export-icon-button" aria-label={t('Close')}>×</Dialog.Close></div>
                    <MenuItem text={t('OpenAI Official Format')} icon={IconJSON} onClick={() => exportToJson(format)} />
                    <MenuItem text="JSONL · TavernAI / SillyTavern" icon={IconJSON} onClick={() => exportToTavern(format)} />
                    <MenuItem text="Ooba · text-generation-webui" icon={IconJSON} onClick={() => exportToOoba(format)} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        {image && <ImageDialog host={host} messages={image.messages} initialIds={image.ids} onClose={() => setImage(null)} />}
    </>;
}
export function DirectMenu(props: Props) { return <SettingProvider><DirectMenuInner {...props} /></SettingProvider>; }
