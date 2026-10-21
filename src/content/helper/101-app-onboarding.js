import { SETTING_KEYS, createElement, createHelperLogoNode } from './10-base.js';
import { RuntimeScope } from './15-runtime.js';
import css from './styles/onboarding.css?raw';

const STEPS = ['prompts', 'outline', 'organize', 'panel', 'appearance'];
const PREFIX = 'chatgpt-helper-onboarding';

class OnboardingTour {
    constructor(app, start = 'welcome') {
        this.app = app;
        this.scope = new RuntimeScope();
        this.step = STEPS.includes(start) ? start : 'welcome';
        this.initial = {
            tab: app.currentTab,
            collapsed: app.isCollapsed,
            focus: document.activeElement,
            focusText: document.activeElement?.textContent?.trim()
        };
        this.closed = false;
        this.installStyles();
        document.getElementById(`${PREFIX}-overlay`)?.remove();
        this.root = createElement('div', { id: `${PREFIX}-overlay`, className: 'gh-tour' });
        this.shade = createElement('div', { className: 'gh-tour-shade', 'aria-hidden': 'true' });
        this.spotlight = createElement('div', { className: 'gh-tour-spotlight', 'aria-hidden': 'true' });
        this.card = createElement('section', {
            className: 'gh-tour-card', role: 'dialog',
            'aria-labelledby': `${PREFIX}-title`, 'aria-describedby': `${PREFIX}-body`
        });
        this.root.append(this.shade, this.spotlight, this.card);
        document.body.appendChild(this.root);
        const position = () => this.scope.schedule('position', () => this.position(), 32);
        this.scope.listen(window, 'resize', position, { passive: true });
        this.scope.listen(document, 'scroll', position, { capture: true, passive: true });
        this.scope.listen(document, 'keydown', event => this.onKeyDown(event), true);
        if (app.panel) this.scope.observe(app.panel, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }, position);
        this.resizeObserver = new ResizeObserver(position);
        this.resizeObserver.observe(this.card);
        if (app.panel) this.resizeObserver.observe(app.panel);
        this.show(this.step);
    }

    t(key) { return this.app.t(key); }

    installStyles() {
        if (document.getElementById(`${PREFIX}-styles`)) return;
        const style = createElement('style', { id: `${PREFIX}-styles` });
        style.textContent = css;
        document.head.appendChild(style);
    }

    button(label, action, handler, className = 'gh-tour-button') {
        const button = createElement('button', { type: 'button', className, 'data-tour-action': action }, label);
        button.addEventListener('click', handler);
        return button;
    }

    ensurePanelOpen() {
        if (this.app.isCollapsed) this.app.toggleCollapse({ persist: false });
    }

    openTab(tab) {
        if (!this.app.panel?.querySelector(`#${tab}-tab`)) return false;
        this.ensurePanelOpen();
        if (this.app.currentTab !== tab) this.app.switchTab(tab);
        return true;
    }

    show(step) {
        if (this.closed) return;
        this.step = step;
        if (step !== 'welcome') this.ensurePanelOpen();
        if (step === 'prompts' || step === 'outline') this.openTab(step);
        this.root.dataset.tourStep = step;
        this.root.classList.toggle('gh-tour-welcome', step === 'welcome');
        this.render();
        this.position();
        this.card.querySelector('h2').focus({ preventScroll: true });
        this.store('in-progress');
    }

    render() {
        this.card.replaceChildren();
        const header = createElement('div', { className: 'gh-tour-header' });
        const brand = createElement('div', { className: 'gh-tour-brand' });
        brand.append(createHelperLogoNode({ size: 21, title: 'ChatGPT Helper' }), createElement('span', {}, 'ChatGPT Helper'));
        header.append(brand, this.button(this.t('onboardingSkip'), 'skip', () => this.finish('skipped'), 'gh-tour-skip'));
        this.card.appendChild(header);

        const index = STEPS.indexOf(this.step);
        const eyebrow = this.step === 'welcome' ? this.t('onboardingDuration') : `${this.t('onboardingGuide')} · ${index + 1} / ${STEPS.length}`;
        this.card.appendChild(createElement('p', { className: 'gh-tour-eyebrow' }, eyebrow));
        const titleKey = this.step === 'welcome' ? 'onboardingTitle' : `tour_${this.step}_title`;
        this.card.appendChild(createElement('h2', { id: `${PREFIX}-title`, tabindex: -1 }, this.t(titleKey)));
        let body = this.t(this.step === 'welcome' ? 'onboardingSubtitle' : `tour_${this.step}_body`);
        if (this.step === 'outline' && !this.app.adapter.getChatMessages().length) body = this.t('tour_outline_empty');
        this.card.appendChild(createElement('p', { className: 'gh-tour-body', id: `${PREFIX}-body` }, body));

        if (this.step === 'welcome') {
            const summary = createElement('div', { className: 'gh-tour-summary' });
            for (const key of ['tour_prompts_label', 'tour_outline_label', 'tour_appearance_label']) summary.appendChild(createElement('span', {}, this.t(key)));
            this.card.appendChild(summary);
        }
        const actions = createElement('div', { className: 'gh-tour-actions' });
        if (this.step === 'prompts') {
            actions.appendChild(createElement('kbd', {}, '//'));
            const focus = this.button(this.t('tour_focus_composer'), 'composer', () => {
                this.app.adapter.findTextarea();
                this.app.adapter.textarea?.focus({ preventScroll: true });
            });
            this.app.adapter.findTextarea();
            focus.disabled = !this.app.adapter.textarea;
            actions.appendChild(focus);
        } else if (this.step === 'organize') {
            for (const tab of ['conversations', 'export']) {
                const button = this.button(this.t(`tour_open_${tab}`), tab, () => { this.openTab(tab); this.position(); });
                button.disabled = !this.app.panel?.querySelector(`#${tab}-tab`);
                actions.appendChild(button);
            }
        } else if (this.step === 'panel') {
            actions.appendChild(createElement('kbd', {}, 'Alt+Shift+H'));
            actions.appendChild(this.button(this.t(this.app.isCollapsed ? 'tour_expand_panel' : 'tour_collapse_panel'), 'panel', () => {
                this.app.toggleCollapse({ persist: false });
                this.render();
                this.position();
                this.card.querySelector('[data-tour-action="panel"]').focus({ preventScroll: true });
            }));
        } else if (this.step === 'appearance') {
            actions.appendChild(this.button(this.t('tour_open_theme'), 'theme', () => {
                this.finish('completed');
                this.app.openThemeSettingsModal(this.app.panel?.querySelector('#chatgpt-helper-settings-btn'));
            }));
        }
        if (actions.childNodes.length) this.card.appendChild(actions);
        this.missing = createElement('p', { className: 'gh-tour-missing', hidden: true }, this.t('tour_target_missing'));
        this.card.appendChild(this.missing);

        const nav = createElement('nav', { className: 'gh-tour-progress', 'aria-label': this.t('onboardingGuide') });
        STEPS.forEach((step, i) => {
            const button = createElement('button', {
                type: 'button', 'data-tour-go': step,
                'aria-label': `${i + 1}. ${this.t(`tour_${step}_label`)}`,
                title: this.t(`tour_${step}_label`),
                className: i === index ? 'active' : i < index ? 'visited' : ''
            }, `${i + 1}`);
            if (i === index) button.setAttribute('aria-current', 'step');
            button.addEventListener('click', () => this.show(step));
            nav.appendChild(button);
        });
        this.card.appendChild(nav);
        const footer = createElement('div', { className: 'gh-tour-footer' });
        const previous = this.button(this.t('onboardingPrevious'), 'prev', () => this.move(-1), 'gh-tour-back');
        previous.hidden = this.step === 'welcome';
        footer.appendChild(previous);
        if (this.step === 'welcome') footer.appendChild(this.button(this.t('onboardingStart'), 'start', () => this.show(STEPS[0]), 'gh-tour-primary'));
        else if (index === STEPS.length - 1) footer.appendChild(this.button(this.t('onboardingFinish'), 'finish', () => this.finish('completed'), 'gh-tour-primary'));
        else footer.appendChild(this.button(this.t('onboardingNext'), 'next', () => this.move(1), 'gh-tour-primary'));
        this.card.appendChild(footer);
    }

    move(direction) {
        const index = STEPS.indexOf(this.step) + direction;
        if (index < 0) this.show('welcome');
        else if (index < STEPS.length) this.show(STEPS[index]);
    }

    target() {
        const panel = this.app.panel;
        if (!panel) return null;
        if (this.step === 'prompts' || this.step === 'outline') return panel.querySelector(`#${this.step}-content.active`);
        if (this.step === 'organize') return panel.querySelector('#chatgpt-helper-tabs');
        if (this.step === 'panel') return this.app.isCollapsed
            ? document.getElementById('quick-btn-panel') : panel.querySelector('#chatgpt-helper-resize-handle');
        if (this.step === 'appearance') return panel.querySelector('#chatgpt-helper-settings-btn');
        return null;
    }

    position() {
        if (this.closed) return;
        const width = window.innerWidth, height = window.innerHeight;
        const target = this.target();
        const rect = target?.getBoundingClientRect();
        const available = rect && rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < width;
        this.missing.hidden = this.step === 'welcome' || Boolean(available);
        this.root.classList.toggle('gh-tour-no-target', !available);
        this.spotlight.hidden = !available;
        if (available) {
            const left = Math.max(2, rect.left - 5), top = Math.max(2, rect.top - 5);
            Object.assign(this.spotlight.style, {
                left: `${left}px`, top: `${top}px`,
                width: `${Math.max(0, Math.min(width - 2, rect.right + 5) - left)}px`,
                height: `${Math.max(0, Math.min(height - 2, rect.bottom + 5) - top)}px`
            });
        }
        const card = this.card.getBoundingClientRect();
        let left = (width - card.width) / 2, top = (height - card.height) / 2;
        if (this.step !== 'welcome' && width <= 760) top = height - card.height - 12;
        else if (available) {
            if (rect.left >= card.width + 28) left = rect.left - card.width - 18;
            else if (width - rect.right >= card.width + 28) left = rect.right + 18;
            top = rect.top + Math.min(rect.height, height) / 2 - card.height / 2;
        }
        this.card.style.left = `${Math.max(12, Math.min(width - card.width - 12, left))}px`;
        this.card.style.top = `${Math.max(12, Math.min(height - card.height - 12, top))}px`;
    }

    onKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.finish('skipped');
        } else if (this.card.contains(event.target) && !event.altKey && !event.ctrlKey && !event.metaKey) {
            if (event.key === 'ArrowRight' && this.step !== STEPS.at(-1)) { event.preventDefault(); this.move(1); }
            if (event.key === 'ArrowLeft' && this.step !== 'welcome') { event.preventDefault(); this.move(-1); }
        }
    }

    store(status) {
        try {
            window.GM_setValue(SETTING_KEYS.ONBOARDING_DONE, {
                schemaVersion: 1, status, step: this.step, updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.warn('[ChatGPT Helper] 保存引导进度失败:', error);
        }
    }

    finish(status) {
        if (this.closed) return;
        this.store(status);
        this.destroy({ restore: status !== 'completed' });
        if (status === 'completed' && !this.app.destroyed) {
            this.ensurePanelOpen();
            this.openTab(this.app.panel?.querySelector('#prompts-tab') ? 'prompts' : this.app.getTabOrder()[0]);
            this.app.panel?.querySelector('.chatgpt-helper-tab.active')?.focus({ preventScroll: true });
        }
    }

    destroy({ restore = true } = {}) {
        if (this.closed) return;
        this.closed = true;
        this.scope.dispose();
        this.resizeObserver.disconnect();
        this.root.remove();
        if (this.app.onboardingTour === this) this.app.onboardingTour = null;
        if (!restore || this.app.destroyed) return;
        const tab = this.app.panel?.querySelector(`#${this.initial.tab}-content`)
            ? this.initial.tab : this.app.getTabOrder()[0];
        if (this.app.currentTab !== tab) this.app.switchTab(tab);
        if (this.app.isCollapsed !== this.initial.collapsed) this.app.toggleCollapse({ persist: false });
        const original = this.initial.focus;
        const equivalent = Array.from(this.app.panel?.querySelectorAll('button') || [])
            .find(button => button.textContent.trim() === this.initial.focusText);
        const focus = original?.isConnected ? original : equivalent || this.app.panel?.querySelector('#chatgpt-helper-settings-btn');
        if (this.initial.collapsed) document.getElementById('quick-btn-panel')?.focus({ preventScroll: true });
        else focus?.focus({ preventScroll: true });
    }
}

export const OnboardingFeature = {
    maybeShowOnboarding({ force = false } = {}) {
        const saved = window.GM_getValue(SETTING_KEYS.ONBOARDING_DONE, null);
        if (!force && saved && saved.status !== 'in-progress') return;
        if (this.onboardingTour && !this.onboardingTour.closed) {
            this.onboardingTour.card.querySelector('h2')?.focus({ preventScroll: true });
            return;
        }
        this.onboardingTour = new OnboardingTour(this, force ? 'welcome' : saved?.step);
    },
    showOnboardingOverlay() { this.maybeShowOnboarding({ force: true }); }
};
