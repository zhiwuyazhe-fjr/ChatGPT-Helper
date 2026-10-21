import css from './styles/helper.css?raw';

export const StylesFeature = {
    createStyles() {
        const root = document.documentElement;
        const pageFont = getComputedStyle(document.body).fontFamily.trim();
        if (pageFont && !/[;{}]/.test(pageFont)) root.style.setProperty('--gh-font-family', pageFont);
        root.style.setProperty('--gh-panel-width', this.settings.panelWidth + 'px');
        let style = document.getElementById('chatgpt-helper-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'chatgpt-helper-styles';
            document.head.appendChild(style);
        }
        if (style.textContent !== css) style.textContent = css;
    }
};
