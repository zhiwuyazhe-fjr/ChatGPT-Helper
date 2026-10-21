import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import {
  defaultImageOptions,
  imageDocument,
  prepareImageFrame,
  saveMessageImage,
} from "../exporter/image";
import { useExportSession } from "./SessionContext";
import type { ExportJob } from "../session";
import { useSettingContext } from "./SettingContext";
import type { ExportHost, MessageSnapshot } from "../host";
import type { ImageOptions } from "../exporter/image";

export function ImageDialog({
  host,
  messages,
  initialIds,
  onClose,
}: {
  host: ExportHost;
  messages: MessageSnapshot[];
  initialIds: string[];
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const session = useExportSession();
  const { format: filenameFormat } = useSettingContext();
  const [selected, setSelected] = useState(new Set(initialIds));
  const [options, setOptions] = useState<ImageOptions>({
    ...defaultImageOptions,
    theme: host.getContext().theme === "dark" ? "dark" : "light",
  });
  const [readyDocument, setReadyDocument] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(0);
  const [zoom, setZoom] = useState(0.6);
  const [height, setHeight] = useState(600);
  const frame = useRef<HTMLIFrameElement>();
  const viewport = useRef<HTMLDivElement>();
  const job = useRef<ExportJob>();
  const title = useRef(host.getContext().title).current;
  const chosen = useMemo(
    () => messages.filter((message) => selected.has(message.id)),
    [messages, selected],
  );
  const html = useMemo(
    () => imageDocument(title, chosen, options, t("You")),
    [title, chosen, options.width, options.theme, t],
  );
  const ready = readyDocument === html;
  const change = (key: keyof ImageOptions, value: any) =>
    setOptions((previous) => ({ ...previous, [key]: value }));
  useEffect(() => {
    const controller = new AbortController();
    setReadyDocument(null);
    setError("");
    prepareImageFrame(frame.current, html, controller.signal)
      .then((count) => {
        if (controller.signal.aborted) return;
        setMissing(count);
        setHeight(
          Math.min(
            4000,
            frame.current.contentDocument.getElementById("export-image")
              .scrollHeight,
          ),
        );
        setReadyDocument(html);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      });
    return () => controller.abort();
  }, [html]);
  useEffect(() => {
    const resize = new ResizeObserver(() =>
      setZoom(
        Math.min(
          1,
          Math.max(0.2, (viewport.current.clientWidth - 24) / options.width),
        ),
      ),
    );
    resize.observe(viewport.current);
    return () => resize.disconnect();
  }, [options.width]);
  useEffect(() => () => job.current?.cancel(), []);
  const close = () => {
    job.current?.cancel();
    onClose();
  };
  const save = async () => {
    if (
      busy ||
      !ready ||
      !chosen.length ||
      (job.current && !job.current.signal.aborted)
    )
      return;
    const operation = (job.current = session.createJob());
    setBusy(true);
    setError("");
    try {
      await saveMessageImage(
        frame.current,
        title,
        options,
        filenameFormat,
        operation.signal,
        (done, total) => setStatus(t("Image progress", { done, total })),
        {
          language: operation.context.language,
          zip: () => host.loadDependency("zip"),
          save: (filename, blob) =>
            session.commit(
              { filename, mime: blob.type, content: blob },
              operation,
            ),
        },
      );
      host.notify(t("Image saved"));
      setStatus(t("Image saved"));
    } catch (error) {
      if (!operation.signal.aborted)
        setError(error.message || t("Export failed"));
    } finally {
      operation.finish();
      if (job.current === operation) job.current = null;
      if (!operation.signal.aborted) setBusy(false);
    }
  };
  return (
    <Dialog.Root
      open
      onOpenChange={(value) => {
        if (!value) close();
      }}
    >
      <Dialog.Portal container={session.portal}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className="DialogContent gh-image-dialog"
          aria-describedby={undefined}
        >
          <div className="gh-export-dialog-heading">
            <Dialog.Title className="DialogTitle">
              {t("Export image")}
            </Dialog.Title>
            <button
              type="button"
              className="gh-export-icon-button"
              aria-label={t("Close")}
              onClick={close}
            >
              ×
            </button>
          </div>
          <div className="gh-image-layout">
            <section
              className="gh-image-selection"
              aria-label={t("Select messages")}
            >
              <div className="gh-image-selection-tools">
                <strong>{t("Selected count", { count: chosen.length })}</strong>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    setSelected(new Set(messages.map((message) => message.id)))
                  }
                >
                  {t("Select all")}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setSelected(new Set())}
                >
                  {t("Clear")}
                </button>
              </div>
              <div className="gh-image-message-list">
                {messages.map((message, index) => (
                  <label
                    key={message.id}
                    className="gh-image-message-option"
                    data-selected={selected.has(message.id) ? "true" : "false"}
                  >
                    <input
                      type="checkbox"
                      aria-label={`${index + 1} · ${message.role === "user" ? t("You") : "ChatGPT"}`}
                      checked={selected.has(message.id)}
                      disabled={busy}
                      onChange={(event) =>
                        setSelected((previous) => {
                          const next = new Set(previous);
                          if (event.currentTarget.checked) next.add(message.id);
                          else next.delete(message.id);
                          return next;
                        })
                      }
                    />
                    <span
                      className="gh-image-selection-mark"
                      aria-hidden="true"
                    >
                      {selected.has(message.id) ? "✓" : ""}
                    </span>
                    <span>
                      <strong>
                        {index + 1} ·{" "}
                        {message.role === "user" ? t("You") : "ChatGPT"}
                        <span className="gh-image-selection-state">
                          {t(
                            selected.has(message.id)
                              ? "Selected"
                              : "Not selected",
                          )}
                        </span>
                      </strong>
                      <span>{message.content.slice(0, 120) || t("Image")}</span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
            <section className="gh-image-preview-column">
              <div className="gh-image-options">
                <label>
                  {t("Format")}
                  <select
                    aria-label={t("Format")}
                    value={options.format}
                    disabled={busy}
                    onChange={(event) =>
                      change("format", event.currentTarget.value)
                    }
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </label>
                <label>
                  {t("Appearance")}
                  <select
                    aria-label={t("Appearance")}
                    value={options.theme}
                    disabled={busy}
                    onChange={(event) =>
                      change("theme", event.currentTarget.value)
                    }
                  >
                    <option value="light">{t("Light")}</option>
                    <option value="dark">{t("Dark")}</option>
                  </select>
                </label>
                <label>
                  {t("Image width")}
                  <select
                    aria-label={t("Image width")}
                    value={options.width}
                    disabled={busy}
                    onChange={(event) =>
                      change("width", Number(event.currentTarget.value))
                    }
                  >
                    <option value="768">768 px</option>
                    <option value="960">960 px</option>
                  </select>
                </label>
                <label>
                  {t("Resolution")}
                  <select
                    aria-label={t("Resolution")}
                    value={options.scale}
                    disabled={busy}
                    onChange={(event) =>
                      change("scale", Number(event.currentTarget.value))
                    }
                  >
                    <option value="1">1×</option>
                    <option value="2">2×</option>
                  </select>
                </label>
                <label>
                  {t("Layout")}
                  <select
                    aria-label={t("Layout")}
                    value={options.paged ? "pages" : "long"}
                    disabled={busy}
                    onChange={(event) =>
                      change("paged", event.currentTarget.value === "pages")
                    }
                  >
                    <option value="pages">{t("Pages")}</option>
                    <option value="long">{t("Long image")}</option>
                  </select>
                </label>
              </div>
              <div
                className="gh-image-preview-scroll"
                ref={viewport}
                aria-label={t("Preview")}
              >
                <div
                  style={{ width: options.width * zoom, height: height * zoom }}
                >
                  <iframe
                    ref={frame}
                    title={t("Image preview")}
                    sandbox="allow-same-origin"
                    style={{
                      width: options.width,
                      height,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                    }}
                  />
                </div>
              </div>
              {missing > 0 && (
                <p role="status" className="gh-export-hint">
                  {t("Image unavailable count", { count: missing })}
                </p>
              )}
            </section>
          </div>
          <div className="gh-export-dialog-footer">
            <span
              role={error ? "alert" : "status"}
              className={error ? "gh-export-error" : "gh-export-hint"}
            >
              {error ||
                (busy
                  ? status
                  : chosen.length
                    ? ready
                      ? status
                      : t("Preparing preview")
                    : t("Choose at least one message"))}
            </span>
            <button type="button" className="Button neutral" onClick={close}>
              {busy ? t("Cancel") : t("Close")}
            </button>
            <button
              type="button"
              className="Button green"
              onClick={save}
              disabled={!ready || !chosen.length || busy}
            >
              {busy ? t("Exporting") : t("Save image")}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
