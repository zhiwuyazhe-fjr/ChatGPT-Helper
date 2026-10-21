import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh-Hans.json';

declare global { interface Window { __MY_EXT__?: Record<string, any> } }
declare module 'i18next' { interface CustomTypeOptions { returnNull: false } }

i18n.use(initReactI18next).init({
    fallbackLng: 'en-US', lng: 'en-US',
    resources: { 'en-US': { translation: en }, 'zh-Hans': { translation: zh } },
    interpolation: { escapeValue: false },
});
export function syncLanguageFromHelper(language?: string | null) {
    const resolved = language?.startsWith('zh') ? 'zh-Hans' : 'en-US';
    if (i18n.language !== resolved) void i18n.changeLanguage(resolved);
    return resolved;
}
export default i18n;
