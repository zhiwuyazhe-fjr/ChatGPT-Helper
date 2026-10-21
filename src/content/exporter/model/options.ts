export interface ExportOptions {
    format: string;
    enableThinking: boolean;
    enableTimestamp: boolean;
    timeStamp24H: boolean;
    enableTimestampHTML: boolean;
    enableTimestampMarkdown: boolean;
    enableMeta: boolean;
    exportMetaList: { name: string; value: string }[];
    origin: string;
    language: string;
    theme: string;
}
