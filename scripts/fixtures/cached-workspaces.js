// Synthetic version of ChatGPT's retained workspace tree. Activation deliberately
// changes attributes only; both main elements remain mounted in A-then-B order.
(() => {
    const style = document.createElement('style');
    style.textContent = '.fixture-workspace { flex:1; min-width:0; height:100%; display:flex; } .fixture-cache-page { flex:1; min-width:0; display:flex; }';
    document.head.appendChild(style);
    const turns = label => `
        <div data-turn-key="cache-${label}-turn">
            <div data-content-search-unit-key="cache-${label}:0:user"><div data-user-message-bubble="true"><div class="whitespace-pre-wrap">合成会话 ${label} 的问题</div></div></div>
            <div data-content-search-unit-key="cache-${label}:2:assistant"><div data-chatgpt-selection-message-id="cache-${label}-answer"><div data-markdown-text-style="assistant-message"><div data-theme="dark"><div data-dil-message-id="cache-${label}-dil">
                <h2>缓存会话 ${label} 章节</h2>
                ${`<p data-d-component="text">这是会话 ${label} 的合成正文，用于检验保留主区之间的切换。</p>`.repeat(30)}
                <h3>缓存会话 ${label} 末尾</h3><p data-d-component="text">正文结束。</p>
            </div></div></div></div></div>
        </div>`;
    const composer = () => `<div class="modern-composer-footer"><div class="modern-composer-backdrop pointer-events-none absolute inset-x-0 bg-surface"></div><form data-chatgpt-composer><div data-composer-surface-variant="default"><div data-composer-body><div data-composer-markdown contenteditable="true" role="textbox" style="display:none">隐藏的旧输入框</div><div data-composer-markdown data-fixture-visible-composer contenteditable="true" role="textbox" aria-label="消息"></div></div></div></form></div>`;
    const main = label => document.querySelector(`main[data-fixture-cache="${label}"]`);
    function activate(label) {
        for (const workspace of document.querySelectorAll('[data-fixture-workspace]')) {
            const active = workspace.dataset.fixtureWorkspace === label;
            workspace.querySelector('[data-app-shell-active-page]').setAttribute('data-app-shell-active-page', String(active));
            workspace.style.setProperty('display', active ? 'flex' : 'none', 'important');
        }
    }
    function hydrate(label) {
        const target = main(label);
        target.querySelector('[data-thread-find-target="conversation"]').innerHTML = turns(label);
        if (!target.querySelector('[data-composer-markdown]')) target.insertAdjacentHTML('beforeend', composer());
    }
    function setup() {
        document.querySelectorAll('#fixture-shell > main, #fixture-shell > [data-fixture-workspace]').forEach(node => node.remove());
        for (const label of ['A', 'B']) {
            const workspace = document.createElement('div');
            workspace.className = 'fixture-workspace';
            workspace.dataset.fixtureWorkspace = label;
            workspace.setAttribute('data-app-shell-page-surface', '');
            workspace.innerHTML = `<section class="fixture-cache-page" data-app-shell-active-page="false"><main data-fixture-cache="${label}"><header>缓存会话 ${label}</header><div class="thread-scroll-container"><div class="modern-thread-shell" data-thread-find-target="conversation"></div></div></main></section>`;
            document.querySelector('#fixture-shell').appendChild(workspace);
            hydrate(label);
        }
        activate('A');
    }
    window.__fixtureCache = {setup, activate, hydrate, main};
    window.addEventListener('popstate', event => {
        if (event.state?.fixtureCache) activate(event.state.fixtureCache);
    });
})();
