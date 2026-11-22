import assert from 'node:assert/strict';

export async function testComposerPaste(page) {
  const editor = page.locator('[data-composer-markdown]');
  const table = '<table><tr><th>n</th><td>4</td></tr><tr><th>Cₙ</th><td>14</td></tr></table>';
  const html = '<h3>Catalan 数</h3>' + '<p>左右子树的选择相乘，不同划分相加。</p>'.repeat(120)
    + '<p data-message-author-role="assistant">$C_0=1$</p><div contenteditable="false">' + table + '</div>';
  const state = await editor.evaluate(async (element, html) => {
    const model = document.createElement('template');
    let redraws = 0;
    const render = () => element.replaceChildren(model.content.cloneNode(true));
    // A model-backed composer redraws foreign controls. Bound the loop so the
    // test can still report a failure if the extension starts injecting again.
    const observer = new MutationObserver(() => {
      if (element.querySelector('button, [data-gh-table-btn]') && redraws++ < 5) render();
    });
    observer.observe(element, { childList: true, subtree: true, attributes: true });
    element.addEventListener('paste', event => {
      event.preventDefault();
      model.innerHTML = event.clipboardData.getData('text/html');
      render();
    }, { once: true });
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/html', html);
    element.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
    const adapter = new window.__MY_EXT__.helper.ChatGPTAdapter();
    const draftMessages = adapter.getChatMessages().filter(message => element.contains(message)).length;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    observer.disconnect();
    return { redraws, draftMessages, intact: element.innerHTML === model.innerHTML };
  }, html);
  assert.deepEqual(state, { redraws: 0, draftMessages: 0, intact: true });

  // Sending the same content creates a new, read-only message.
  await page.locator('[data-dil-message-id]').first().evaluate((message, table) => {
    message.insertAdjacentHTML('beforeend', '<div id="published-paste">' + table + '</div>');
  }, table);
  await page.locator('#published-paste .chatgpt-helper-table-copy-btn').waitFor();
  assert.equal(await editor.locator('button, [data-gh-table-btn]').count(), 0);

  // A short command split across rich-text nodes still opens the native helper menu.
  await editor.evaluate(element => {
    element.innerHTML = '<span>  /</span><b>/</b>';
    element.dispatchEvent(new InputEvent('input', { bubbles: true }));
  });
  await page.locator('#chatgpt-helper-quick-menu.open').waitFor();
  await editor.fill('普通文本'.repeat(10000));
  await page.locator('#chatgpt-helper-quick-menu.open').waitFor({ state: 'hidden' });
  await editor.press('End');
  await editor.press('x');
  assert.ok((await editor.textContent()).endsWith('x'));
}
