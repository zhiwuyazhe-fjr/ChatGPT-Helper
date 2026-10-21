import { HelperCore } from './90-app-core.js';
import { StorageFeature } from './91-app-storage-init.js';
import { ThemeFeature } from './92-app-theme.js';
import { StylesFeature } from './93-app-styles.js';
import { LayoutFeature } from './94-app-layout.js';
import { PromptsFeature } from './95-app-prompts.js';
import { ExportFeature } from './96-app-export.js';
import { SettingsFeature } from './97-app-conversations-settings.js';
import { OutlineFeature } from './98-app-outline.js';
import { ControlsFeature } from './99-app-controls-events.js';
import { BackupFeature } from './100-app-onboarding-backup.js';

// A single composition boundary. Feature modules export behavior without mutating globals.
export class ChatGPTHelper extends HelperCore {}
Object.assign(ChatGPTHelper.prototype,
    StorageFeature,
    ThemeFeature,
    StylesFeature,
    LayoutFeature,
    PromptsFeature,
    ExportFeature,
    SettingsFeature,
    OutlineFeature,
    ControlsFeature,
    BackupFeature
);
