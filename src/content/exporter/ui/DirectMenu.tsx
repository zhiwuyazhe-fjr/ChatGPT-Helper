import { useExportSession } from "./SessionContext";
import * as Dialog from "@radix-ui/react-dialog";
import { useLayoutEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { ExportDialog } from "./ExportDialog";
import { ImageDialog } from "./ImageDialog";
import {
  FileCode,
  IconCopy,
  IconJSON,
  IconMarkdown,
  IconSetting,
  IconZip,
} from "./Icons";
import { MenuItem } from "./MenuItem";
import { SettingProvider, useSettingContext } from "./SettingContext";
import { SettingDialog } from "./SettingDialog";
import type { ExportHost, MessageSnapshot } from "../host";
import "../style.css";
import "./Dialog.css";

type Props = { container: HTMLDivElement; host: ExportHost };
function DirectMenuInner({ container, host }: Props) {
  const { t } = useTranslation();
  const session = useExportSession();
  const [feedback, setFeedback] = useState(session.feedback);
  useLayoutEffect(
    () => session.subscribe(() => setFeedback(session.feedback)),
    [session],
  );
  const [jsonOpen, setJsonOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [image, setImage] = useState<{
    messages: MessageSnapshot[];
    ids: string[];
  } | null>(null);
  const [selectedCount, setSelectedCount] = useState(
    host.getSelectedMessages().length,
  );
  const settings = useSettingContext();
  const { format } = settings;
  const openImage = () => {
    const selected = host.getSelectedMessages();
    const messages = host.getMessages();
    for (const saved of selected)
      if (!messages.some((message) => message.id === saved.id))
        messages.push(saved);
    messages.sort((a, b) => a.order - b.order);
    if (!messages.length) {
      host.notify(t("Please start a conversation first"));
      return;
    }
    setImage({
      messages,
      ids: (selected.length ? selected : messages).map((message) => message.id),
    });
  };
  useLayoutEffect(() => {
    const changed = () => {
      setImage(null);
      setJsonOpen(false);
      setExportOpen(false);
      setSettingOpen(false);
      setSelectedCount(host.getSelectedMessages().length);
    };
    const unsubscribe = host.subscribe(() =>
      setSelectedCount(host.getSelectedMessages().length),
    );
    container.addEventListener("open-image", openImage);
    container.addEventListener("context-changed", changed);
    return () => {
      unsubscribe();
      container.removeEventListener("open-image", openImage);
      container.removeEventListener("context-changed", changed);
    };
  }, [container, host]);
  return (
    <>
      {feedback.message && (
        <p
          className={feedback.error ? "gh-export-error" : "gh-export-status"}
          role={feedback.error ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}
      <section className="gh-export-section">
        <h3>{t("Current conversation")}</h3>
        <MenuItem
          text={t("Export image")}
          icon={FileCode}
          onClick={() => {
            openImage();
            return true;
          }}
        />
        {selectedCount > 0 && (
          <span className="gh-export-selection-count">
            {t("Selected count", { count: selectedCount })}
          </span>
        )}
        <MenuItem
          text={t("Copy Text")}
          successText={t("Copied!")}
          icon={IconCopy}
          onClick={() => session.current("text", settings)}
        />
        <MenuItem
          text={t("Markdown")}
          icon={IconMarkdown}
          onClick={() => session.current("markdown", settings)}
        />
        <MenuItem
          text={t("HTML")}
          icon={FileCode}
          onClick={() => session.current("html", settings)}
        />
        <MenuItem
          text={t("JSON")}
          icon={IconJSON}
          onClick={() => {
            setJsonOpen(true);
            return true;
          }}
        />
      </section>
      <section className="gh-export-section">
        <h3>{t("Export tools")}</h3>
        <ExportDialog
          format={format}
          open={exportOpen}
          onOpenChange={setExportOpen}
        >
          <MenuItem text={t("Export All")} icon={IconZip} />
        </ExportDialog>
        <SettingDialog open={settingOpen} onOpenChange={setSettingOpen}>
          <MenuItem text={t("Exporter Settings")} icon={IconSetting} />
        </SettingDialog>
      </section>
      <Dialog.Root open={jsonOpen} onOpenChange={setJsonOpen}>
        <Dialog.Portal container={session.portal}>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content
            className="DialogContent"
            aria-describedby={undefined}
          >
            <div className="gh-export-dialog-heading">
              <Dialog.Title className="DialogTitle">JSON</Dialog.Title>
              <Dialog.Close
                className="gh-export-icon-button"
                aria-label={t("Close")}
              >
                ×
              </Dialog.Close>
            </div>
            <MenuItem
              text={t("OpenAI Official Format")}
              icon={IconJSON}
              onClick={() => session.current("json", settings)}
            />
            <MenuItem
              text="JSONL · TavernAI / SillyTavern"
              icon={IconJSON}
              onClick={() => session.current("tavern", settings)}
            />
            <MenuItem
              text="Ooba · text-generation-webui"
              icon={IconJSON}
              onClick={() => session.current("ooba", settings)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {image && (
        <ImageDialog
          host={host}
          messages={image.messages}
          initialIds={image.ids}
          onClose={() => setImage(null)}
        />
      )}
    </>
  );
}
export function DirectMenu(props: Props) {
  return (
    <SettingProvider>
      <DirectMenuInner {...props} />
    </SettingProvider>
  );
}
