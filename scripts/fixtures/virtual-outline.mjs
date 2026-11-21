import assert from 'node:assert/strict';

const turns = 16;
const prompt = i => i < 2 ? '' : `问题 ${i}`;
const heading = i => i % 3 === 0 ? '同名小节' : `章节 ${i}`;
function conversation() {
    const mapping = { root: { parent: null, children: [] } };
    let parent = 'root';
    for (let i = 0; i < turns; i++) {
        const parts = prompt(i) ? [prompt(i)] : Array.from({length: i + 1}, () => ({ content_type: 'image_asset_pointer' }));
        for (const [id, role, content] of [
            ['u' + i, 'user', { content_type: 'multimodal_text', parts }],
            ['a' + i, 'assistant', { content_type: 'text', parts: ['## ' + heading(i) + '\n\n```\n# code sample\n```'] }]
        ]) {
            mapping[id] = { parent, children: [], message: { id, author: { role }, content } };
            mapping[parent].children.push(id);
            parent = id;
        }
    }
    mapping.old = { parent: 'u2', children: [], message: { id:'old', author:{role:'assistant'}, content:{content_type:'text',parts:['# 其他分支']} } };
    mapping.u2.children.push('old');
    return { conversation_id: 'outline-window', mapping, current_node: parent };
}

export async function testVirtualOutline(browser, origin, saved) {
    const context = await browser.newContext({ viewport:{width:1440,height:880}, locale:'zh-CN', reducedMotion:'reduce' });
    try {
        const page = await context.newPage();
        page.setDefaultTimeout(8000);
        await page.route('**/api/auth/session', route => route.fulfill({ json:{accessToken:'fixture'} }));
        await page.route('**/backend-api/**', route => route.fulfill({ json:saved ? conversation() : {} }));
        await page.goto(origin + '/c/outline-window');
        await page.locator('#outline-tab').waitFor();
        const rows = Array.from({length:turns}, (_, i) => ({ question:prompt(i), heading:heading(i), height: i % 4 === 0 ? 1400 : 550 }));
        await page.evaluate(rows => {
            const scroll = document.querySelector('#fixture-scroll');
            scroll.style.scrollPaddingTop = '96px';
            const list = document.querySelector('#fixture-messages');
            list.style.cssText = 'position:relative;padding:0;overflow-anchor:none';
            let height = 0;
            const starts = rows.map(row => { const top = height; height += row.height; return top; });
            list.style.height = (height + scroll.clientHeight) + 'px';
            const render = () => {
                const middle = starts.findLastIndex(top => top <= scroll.scrollTop);
                if (list.dataset.window === String(middle)) return;
                list.dataset.window = middle;
                list.replaceChildren();
                for (let i = Math.max(0, middle - 1); i <= Math.min(rows.length - 1, middle + 1); i++) {
                    const turn = document.createElement('section');
                    turn.dataset.turnKey = 'turn-' + i;
                    turn.style.cssText = `position:absolute;top:${starts[i]}px;width:100%;margin:0`;
                    const attachments = '<button aria-label="打开附件"><img width="75" height="45" alt="上传的图片"></button>'.repeat(i < 2 ? i + 1 : Number(i === 8));
                    turn.innerHTML = `<div data-content-search-unit-key="turn-${i}:user">${attachments}<div data-user-message-bubble>${rows[i].question}</div><span class="sr-only">你说：</span></div>
                        <div data-content-search-unit-key="turn-${i}:assistant"><div data-chatgpt-selection-message-id="a${i}"><div class="markdown"><h2>${rows[i].heading}</h2></div></div></div>`;
                    list.append(turn);
                }
            };
            scroll.addEventListener('scroll', render);
            window.showTurn = i => { scroll.scrollTop = starts[i]; render(); };
            window.showTurn(8);
        }, rows);
        await page.locator('#outline-tab').click();
        const labels = page.locator('#outline-list .outline-item-text');
        const waitCount = n => page.waitForFunction(n => document.querySelectorAll('#outline-list .outline-item').length === n,n);
        if (saved) {
            await waitCount(turns * 2);
            assert.deepEqual(await labels.allTextContents(), rows.flatMap((row, i) => [row.question || `图片（${i + 1} 张）`, row.heading]));
            assert.equal(await page.locator('#fixture-messages').getAttribute('data-window'), '8');
        } else {
            await waitCount(6);
            await page.evaluate(() => window.showTurn(0));
            await waitCount(10);
            await page.evaluate(() => window.showTurn(15));
            await waitCount(14);
            assert.deepEqual((await labels.allTextContents()).slice(0,4), ['图片（1 张）','同名小节','图片（2 张）','章节 1']);
        }
        await page.locator('[data-outline-id="/c/outline-window:a0:0"]').click();
        await page.waitForFunction(() => document.querySelector('[data-turn-key="turn-0"] h2.outline-highlight'));
        const target = page.locator('[data-outline-id="/c/outline-window:a15:0"]');
        await target.click();
        await page.waitForFunction(() => document.querySelector('[data-turn-key="turn-15"] h2'));
        // A late layout change between seeking and settling must move the landing point.
        await page.locator('[data-turn-key="turn-15"] .markdown').evaluate(node => { node.style.paddingTop = '125px'; });
        await page.waitForFunction(() => {
            const h = document.querySelector('[data-turn-key="turn-15"] h2.outline-highlight');
            const scroll = document.querySelector('#fixture-scroll');
            return h && Math.abs(h.getBoundingClientRect().top - scroll.getBoundingClientRect().top - 96) < 3;
        });
        assert.equal(await target.getAttribute('aria-current'), 'location');
        await waitCount(saved ? turns * 2 : 14);
        if (saved) {
            await page.evaluate(() => {
                window.showTurn(2);
                const turn = document.querySelector('[data-turn-key="turn-2"]');
                document.querySelector('#fixture-messages').replaceChildren(turn);
                turn.querySelector('[data-chatgpt-selection-message-id]').dataset.chatgptSelectionMessageId = 'old';
                turn.querySelector('h2').textContent = '其他分支';
            });
            await waitCount(6);
            assert.equal(await labels.last().textContent(), '其他分支');
        }
    } finally { await context.close(); }
}
