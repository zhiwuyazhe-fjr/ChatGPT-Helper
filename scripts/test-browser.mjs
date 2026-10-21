/**
 * Real-browser regression suite for the built extension, with isolated local storage.
 * Run after npm run build: node scripts/test-browser.mjs
 * Install Playwright outside production dependencies, or set PLAYWRIGHT_MODULE_PATH
 * to an existing playwright/index.mjs. BROWSER_CHANNEL=chrome uses installed Chrome.
 * Optional BROWSER_TEST_OUTPUT retains screenshots/reports at an explicit directory.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, extname, sep, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = process.env.BROWSER_TEST_OUTPUT || await mkdtemp(join(tmpdir(), 'chatgpt-helper-browser-'));
await mkdir(output, { recursive:true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE_PATH)).href : 'playwright').catch(error => {
  throw new Error('Playwright is required for browser regressions. Set PLAYWRIGHT_MODULE_PATH to an existing playwright/index.mjs, or install it as a development tool.', { cause:error });
});
await readFile(join(root, 'content-scripts/dist/chatgpt-helper.js'));
const server = createServer(async (req,res) => {
  const pathname = new URL(req.url,'http://localhost').pathname;
  const file = pathname.startsWith('/c/') || pathname === '/' ? join(root,'scripts/fixtures/chatgpt.html') : resolve(root,'.' + decodeURIComponent(pathname));
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const content = await readFile(file);
    res.writeHead(200,{'Content-Type': ({'.js':'text/javascript','.html':'text/html; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'})[extname(file)] || 'application/octet-stream'}).end(content);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless:process.env.HEADED !== '1', ...(process.env.BROWSER_CHANNEL ? {channel:process.env.BROWSER_CHANNEL} : {}) }).catch(async error => {
  await new Promise(resolve => server.close(resolve));
  throw error;
});
const context = await browser.newContext({ viewport:{width:1440,height:1000}, locale:'zh-CN', colorScheme:'dark', reducedMotion:'reduce' });
const page = await context.newPage();
page.setDefaultTimeout(8000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404 (Not Found)')) errors.push(message.text()); });
const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push({name,passed:true}); console.log(`PASS ${name}`); }
  catch (error) {
    results.push({name,passed:false,error:error.stack});console.error(`FAIL ${name}: ${error.message}`);
    await page.screenshot({path:join(output,`${results.length}-failure.png`)}).catch(() => {});
    // Recover only presentation state so later, independent checks still execute.
    await page.locator('#chatgpt-helper-theme-modal.open .chatgpt-helper-theme-modal-close').click({timeout:1000}).catch(() => {});
    await page.waitForFunction(() => !document.querySelector('#chatgpt-helper-theme-modal'),null,{timeout:1000}).catch(() => {});
  }
};
const messages = () => `<article data-testid="conversation-turn-0"><div data-message-author-role="user" data-message-id="u1">请解释架构与验证方法</div></article><article data-testid="conversation-turn-1"><div data-message-author-role="assistant" data-message-id="a1"><div class="markdown prose"><h2 id="fixture-heading">架构与职责</h2><p id="fixture-prose">统一生命周期，可靠的明暗主题，以及流式内容的大纲。</p>${'<p>这是一段足够长的会话内容，用于验证真实滚动与锚点返回。</p>'.repeat(25)}<h2 id="fixture-second-heading">回归验证</h2><p>验证主题、背景、导航与设置。</p></div></div></article>`;
const openSettings = async () => {
  if (!await page.locator('#settings-content').isVisible()) await page.locator('#chatgpt-helper-settings-btn').click();
  const general=page.locator('[data-settings-section="general"] .chatgpt-helper-settings-compact-title-btn');
  if (await general.getAttribute('aria-expanded') === 'false') await general.click();
};
const openTheme = async () => {
  await openSettings();
  await page.getByRole('button',{name:'打开主题设置',exact:true}).click();
  await page.locator('#chatgpt-helper-theme-modal').waitFor({state:'visible'});
};
const closeTheme = async () => {
  await page.locator('.chatgpt-helper-theme-modal-close').click();
  await page.locator('#chatgpt-helper-theme-modal').waitFor({state:'detached'});
};
const makeWallpaper = async (color='#275b73') => page.evaluate(color => {
  const canvas=document.createElement('canvas'); canvas.width=100;canvas.height=100;
  const ctx=canvas.getContext('2d');const gradient=ctx.createLinearGradient(0,0,100,100);
  gradient.addColorStop(0,color);gradient.addColorStop(1,'#dfba8b');ctx.fillStyle=gradient;ctx.fillRect(0,0,100,100);
  return canvas.toDataURL('image/png').split(',')[1];
},color);
const uploadWallpaper = async (png,name='regression-wallpaper.png') => page.locator('.theme-wallpaper-block input[type=file]').setInputFiles({name,mimeType:'image/png',buffer:Buffer.from(png,'base64')});
const appearance = async mode => {
  await page.locator('.theme-appearance-block').getByRole('button',{name:mode === 'light' ? '浅色' : mode === 'dark' ? '深色' : '跟随系统',exact:true}).click();
  await page.waitForFunction(expected => document.documentElement.getAttribute('data-gh-mode') === expected || document.documentElement.getAttribute('data-theme') === expected, mode);
};
const getStorage = () => page.evaluate(() => JSON.parse(localStorage.getItem('fixture-storage')));
const assertContrast = async () => {
  const colors = await page.locator('#fixture-prose').evaluate(element => {
    let bg = element;
    while (bg && ['rgba(0, 0, 0, 0)','transparent'].includes(getComputedStyle(bg).backgroundColor)) bg = bg.parentElement;
    return {foreground:getComputedStyle(element).color, background:getComputedStyle(bg || document.documentElement).backgroundColor};
  });
  const luminance = value => value.match(/[\d.]+/g).slice(0,3).map(Number).map(v => v/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((sum,v,i) => sum+v*[.2126,.7152,.0722][i],0);
  const a=luminance(colors.foreground), b=luminance(colors.background);
  assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05) >= 4.5, `Unreadable text: ${JSON.stringify(colors)}`);
};

try {
  await page.goto(origin + '/c/fixture');
  await page.locator('#outline-tab').waitFor({state:'visible'});
  await test('empty outline observes the first dynamically inserted answer', async () => {
    await page.locator('#outline-tab').click();
    await page.locator('#outline-list').waitFor({state:'attached'});
    assert.equal(await page.locator('#outline-list .outline-item').count(),0);
    await page.evaluate(html => { document.querySelector('#fixture-messages').innerHTML=html; },messages());
    await page.locator('#outline-list .outline-item-text').filter({hasText:'架构与职责'}).waitFor();
    assert.equal(await page.locator('#outline-list .outline-item').count(),3);
  });
  await test('streaming text and heading additions update without refresh', async () => {
    await page.evaluate(() => { document.querySelector('#fixture-heading').firstChild.textContent='架构与职责（流式完成）'; document.querySelector('.markdown').insertAdjacentHTML('beforeend','<h3 id="fixture-streamed">新增流式章节</h3>'); });
    await page.locator('.outline-item-text').filter({hasText:'架构与职责（流式完成）'}).waitFor();
    await page.locator('.outline-item-text').filter({hasText:'新增流式章节'}).waitFor();
  });
  await test('same-title DOM replacement keeps outline jump targets live', async () => {
    await page.evaluate(() => { const old=document.querySelector('#fixture-second-heading'); old.replaceWith(old.cloneNode(true)); document.querySelector('#fixture-scroll').scrollTop=0; });
    await page.locator('.outline-item-text').filter({hasText:'回归验证'}).click();
    await page.waitForFunction(() => document.querySelector('#fixture-scroll').scrollTop > 300);
    await page.waitForFunction(() => document.querySelector('#fixture-second-heading').getBoundingClientRect().bottom <= document.querySelector('#fixture-scroll').getBoundingClientRect().bottom);
    await page.screenshot({path:join(output,'outline.png')});
  });
  await test('streaming paragraphs preserve outline DOM and collapsed branches', async () => {
    const branch=page.locator('.outline-item').filter({has:page.locator('.outline-item-text',{hasText:'回归验证'})});
    await branch.locator('.outline-item-toggle').click();
    assert.equal(await branch.locator('.outline-item-toggle').getAttribute('aria-expanded'),'false');
    await page.evaluate(() => {
      window.__fixtureOutlineNode=document.querySelector('#outline-list .outline-item');
      document.querySelector('#fixture-prose').append(' 流式段落继续写入。');
    });
    // One complete configured observer cycle, including its debounce interval.
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => window.__fixtureOutlineNode===document.querySelector('#outline-list .outline-item')),true);
    assert.equal(await branch.locator('.outline-item-toggle').getAttribute('aria-expanded'),'false');
    await branch.locator('.outline-item-toggle').click();
  });
  await test('light/dark switching keeps native prose readable', async () => {
    await page.locator('.markdown').evaluate(element => element.classList.add('prose-invert'));
    await openTheme();
    for (const mode of ['light','dark','light']) { await appearance(mode); await assertContrast(); }
    await page.locator('.theme-appearance-block').evaluate(element => {
      const buttons=element.querySelectorAll('button');
      buttons[2].click();buttons[1].click();buttons[0].click();
    });
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-mode')==='dark');
    await appearance('light');
    assert.equal(await page.evaluate(() => document.body.classList.contains('dark')),false);
    assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-gh-page-theme')),'false');
    assert.equal(await page.locator('#fixture-composer').evaluate(el => getComputedStyle(el).backgroundColor),'rgb(245, 245, 245)');
    await closeTheme();
    await page.locator('#scroll-top-btn').click();
    await page.screenshot({path:join(output,'light.png')});
  });
  await test('uploaded background survives mode changes and reload', async () => {
    await openTheme();
    const png=await makeWallpaper();
    await uploadWallpaper(png);
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    await appearance('dark');
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    await closeTheme();
    await page.screenshot({path:join(output,'wallpaper-dark.png')});
    const saved=await getStorage();
    assert.ok(saved.chatgpt_settings.themeConfig.backgroundAssetId);
    await page.reload();
    await page.locator('#outline-tab').waitFor({state:'visible'});
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    const image=await page.locator('#chatgpt-helper-theme-bg-layer').evaluate(el => getComputedStyle(el).backgroundImage);
    assert.ok(image.includes('blob:'),'Reload did not restore IndexedDB background');
    assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).isolation),'isolate');
    assert.equal(await page.locator('main').evaluate(el => getComputedStyle(el).backgroundColor),'rgba(0, 0, 0, 0)');
  });
  await test('rapid theme dialog close/reopen has one dialog and stable focus', async () => {
    await openTheme();
    const detached=await page.evaluate(() => {
      const old=document.querySelector('#chatgpt-helper-theme-modal');
      old.querySelector('.chatgpt-helper-theme-modal-close').click();
      document.querySelector('#settings-content .chatgpt-helper-theme-launch-btn').click();
      return !old.isConnected;
    });
    assert.equal(detached,true,'Closing dialog left a duplicate overlay in the document');
    assert.equal(await page.locator('#chatgpt-helper-theme-modal').count(),1);
    await page.waitForFunction(() => document.activeElement?.matches('.chatgpt-helper-theme-modal-close'));
    await closeTheme();
  });
  await test('slow upload cannot overwrite a newer upload or resurrect a deleted background', async () => {
    await openTheme();
    const first=await makeWallpaper('#143699');
    const second=await makeWallpaper('#c82919');
    const delayNextDecode=async () => page.evaluate(() => {
      const original=window.createImageBitmap;
      window.createImageBitmap=(...args) => {
        window.createImageBitmap=original;
        return new Promise((resolve,reject) => { window.__fixtureReleaseDecode=() => original(...args).then(resolve,reject); });
      };
    });
    await delayNextDecode();
    await uploadWallpaper(first,'slow.png');
    await page.waitForFunction(() => typeof window.__fixtureReleaseDecode==='function');
    const oldId=(await getStorage()).chatgpt_settings.themeConfig.backgroundAssetId;
    await uploadWallpaper(second,'latest.png');
    await page.waitForFunction(oldId => JSON.parse(localStorage.getItem('fixture-storage')).chatgpt_settings.themeConfig.backgroundAssetId !== oldId,oldId);
    await page.evaluate(() => window.__fixtureReleaseDecode());
    const expectedId=(await getStorage()).chatgpt_settings.themeConfig.backgroundAssetId;
    const actualBytes=await page.locator('#chatgpt-helper-theme-bg-layer').evaluate(async el => {
      const url=getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
      const blob=await (await fetch(url)).blob();
      return new Promise(resolve => { const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob); });
    });
    assert.equal(actualBytes,second,'Late upload replaced the latest chosen image');
    await delayNextDecode();
    await uploadWallpaper(first,'remove-while-uploading.png');
    await page.getByRole('button',{name:'移除背景图',exact:true}).click();
    await page.evaluate(() => window.__fixtureReleaseDecode());
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='false');
    const saved=(await getStorage()).chatgpt_settings.themeConfig;
    assert.notEqual(saved.backgroundAssetId,expectedId);
    assert.equal(saved.backgroundImageEnabled,false);
    await closeTheme();
  });
  await test('SPA route and scroll container replacement refresh outline and navigation', async () => {
    await page.locator('#outline-tab').click();
    await page.evaluate(html => { history.pushState({},'', '/c/replaced');const old=document.querySelector('#fixture-scroll');const replacement=old.cloneNode(false);replacement.innerHTML=`<div id="fixture-messages">${html.replace('架构与职责','新会话标题')}</div>`;old.replaceWith(replacement); },messages());
    await page.locator('.outline-item-text').filter({hasText:'新会话标题'}).waitFor();
    await page.locator('#scroll-bottom-btn').click();
    await page.waitForFunction(() => document.querySelector('#fixture-scroll').scrollTop > 500);
    await page.locator('#scroll-top-btn').click();
    await page.waitForFunction(() => document.querySelector('#fixture-scroll').scrollTop < 10);
  });
  await test('outline jump anchor returns to the original reading position', async () => {
    await page.evaluate(() => { document.querySelector('#fixture-scroll').scrollTop=210; });
    await page.locator('.outline-item-text').filter({hasText:'回归验证'}).click();
    await page.waitForFunction(() => document.querySelector('#fixture-scroll').scrollTop > 500);
    await page.locator('#scroll-anchor-btn').click();
    await page.waitForFunction(() => Math.abs(document.querySelector('#fixture-scroll').scrollTop-210)<10);
  });
  await test('new-chat root URL and semantic headings retain outline navigation', async () => {
    await page.evaluate(() => { history.pushState({},'', '/');document.querySelector('.markdown').insertAdjacentHTML('beforeend','<div role="heading" aria-level="2">语义标题</div>'); });
    await page.locator('.outline-item-text').filter({hasText:'语义标题'}).waitFor();
    await page.evaluate(() => { document.querySelector('#fixture-scroll').scrollTop=0; });
    const item=page.locator('.outline-item').filter({has:page.locator('.outline-item-text',{hasText:'语义标题'})});
    await item.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('#fixture-scroll').scrollTop > 500);
  });
  await test('settings persist and service-worker panel toggle remains usable', async () => {
    await openSettings();
    const toggle=page.locator('#settings-content button.chatgpt-helper-toggle').first();
    const before=await toggle.getAttribute('aria-pressed');
    await toggle.click();
    assert.notEqual(await toggle.getAttribute('aria-pressed'),before);
    assert.equal((await getStorage()).chatgpt_settings.defaultPanelState,before !== 'true');
    // The browser shortcut is handled by the extension service worker; the
    // fixture verifies its content-script message rather than faking a DOM key.
    await page.evaluate(() => window.__fixtureDispatchRuntime({type:'ch-helper-toggle-panel'}));
    await page.waitForFunction(() => document.querySelector('#chatgpt-helper-right').classList.contains('collapsed'));
    await page.evaluate(() => window.__fixtureDispatchRuntime({type:'ch-helper-toggle-panel'}));
    await page.waitForFunction(() => !document.querySelector('#chatgpt-helper-right').classList.contains('collapsed'));
    assert.ok((await getStorage()).chatgpt_settings);
  });
  await test('prompt search and insertion retain the selected prompt text', async () => {
    await page.locator('#prompts-tab').click();
    assert.ok(await page.locator('.chatgpt-helper-prompt-item').count() >= 3);
    const search=page.locator('#prompts-content .chatgpt-helper-search-input');
    await search.fill('资料精读');
    await page.waitForFunction(() => document.querySelectorAll('.chatgpt-helper-prompt-item').length===1);
    const content=await page.locator('.chatgpt-helper-prompt-item .chatgpt-helper-prompt-content').textContent();
    await page.locator('.chatgpt-helper-prompt-title').click();
    // Chromium's plain contenteditable adds a visual blank line for an empty
    // block; compare authored lines, preserving their order and characters.
    assert.deepEqual((await page.locator('#prompt-textarea').innerText()).split('\n').filter(Boolean),content.split('\n').filter(Boolean));
    await search.fill('no-matching-prompt-12345');
    await page.waitForFunction(() => document.querySelectorAll('.chatgpt-helper-prompt-item').length===0);
    await search.fill('');
    await page.locator('.chatgpt-helper-prompt-item').first().waitFor();
  });
  await test('backup download preserves prompts, settings, and format metadata', async () => {
    await openSettings();
    const section=page.locator('[data-settings-section="data"] .chatgpt-helper-settings-compact-title-btn');
    if (await section.getAttribute('aria-expanded')==='false') await section.click();
    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'导出备份',exact:true}).click();
    const download=await downloadPromise;
    const filename=join(output,'fixture-backup.json');
    await download.saveAs(filename);
    const backup=JSON.parse(await readFile(filename,'utf8'));
    assert.ok(backup.app && backup.formatVersion && backup.extensionVersion);
    assert.ok(backup.data.prompts.length >= 3);
    assert.deepEqual(backup.data.settings,(await getStorage()).chatgpt_settings);
    assert.equal(backup.data.language,'zh-CN');
    assert.ok(Array.isArray(backup.data.themeAssets));
  });
  await test('narrow panel retains readable Chinese tabs and arrow-key navigation', async () => {
    await page.setViewportSize({width:390,height:844});
    await page.locator('#prompts-tab').click();
    const panel=await page.locator('#chatgpt-helper-right').boundingBox();
    assert.ok(panel.x >= 0 && panel.x+panel.width <= 391,`Panel exceeds viewport: ${JSON.stringify(panel)}`);
    const label=await page.locator('#prompts-tab .chatgpt-helper-tab-label').evaluate(el => ({text:el.textContent,visibleWidth:el.clientWidth,textWidth:el.scrollWidth}));
    assert.equal(label.text,'提示词');
    assert.ok(label.textWidth <= label.visibleWidth+1,`Chinese tab is clipped: ${JSON.stringify(label)}`);
    await page.locator('#prompts-tab').focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('#outline-tab').getAttribute('aria-selected')==='true' && document.activeElement?.id==='outline-tab');
    await page.keyboard.press('ArrowLeft');
    await page.waitForFunction(() => document.querySelector('#prompts-tab').getAttribute('aria-selected')==='true' && document.activeElement?.id==='prompts-tab');
    await page.screenshot({path:join(output,'narrow.png')});
    await page.setViewportSize({width:1440,height:1000});
  });
  await test('no browser runtime or extension initialization errors', async () => assert.deepEqual(errors,[]));
} finally {
  await writeFile(join(output,'results.json'),JSON.stringify({results,errors},null,2));
  console.log(`Browser artifacts: ${output}`);
  await context.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
if (results.some(result => !result.passed)) process.exitCode=1;
