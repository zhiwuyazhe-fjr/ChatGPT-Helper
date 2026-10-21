/**
 * Real-browser regression suite for the built extension, with isolated local storage.
 * Run after npm run build: node scripts/test-browser.mjs
 * Install Playwright outside production dependencies, or set PLAYWRIGHT_MODULE_PATH
 * to an existing playwright/index.mjs. BROWSER_CHANNEL=chrome uses installed Chrome.
 * Optional BROWSER_TEST_OUTPUT retains screenshots/reports at an explicit directory.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, extname, sep, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { FORMULA_SOURCES, createFormulaFixture, assertFormulaRenders } from './fixtures/formulas.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = process.env.BROWSER_TEST_OUTPUT || await mkdtemp(join(tmpdir(), 'chatgpt-helper-browser-'));
await mkdir(output, { recursive:true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE_PATH)).href : 'playwright').catch(error => {
  throw new Error('Playwright is required for browser regressions. Set PLAYWRIGHT_MODULE_PATH to an existing playwright/index.mjs, or install it as a development tool.', { cause:error });
});
// One run always tests one immutable build, including its isolated contexts and
// reloads. A parallel package build must not remove or replace a served script.
const helperBundle=await readFile(join(root,'content-scripts/dist/chatgpt-helper.js'));
const bundleSha256=createHash('sha256').update(helperBundle).digest('hex');
const server = createServer(async (req,res) => {
  const pathname = new URL(req.url,'http://localhost').pathname;
  const file = pathname.startsWith('/c/') || pathname === '/' ? join(root,'scripts/fixtures/chatgpt.html') : resolve(root,'.' + decodeURIComponent(pathname));
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const content = pathname==='/content-scripts/dist/chatgpt-helper.js' ? helperBundle : await readFile(file);
    res.writeHead(200,{'Content-Type': ({'.js':'text/javascript','.html':'text/html; charset=utf-8','.css':'text/css','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.png':'image/png'})[extname(file)] || 'application/octet-stream'}).end(content);
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
const themeRange = name => page.getByRole('slider',{name,exact:true});
const themeCheckbox = name => page.getByRole('checkbox',{name,exact:true});
const setThemeRange = async (name,value) => {
  const range=themeRange(name);
  assert.equal(await range.isDisabled(),false,`${name} should be enabled`);
  await range.evaluate((element,value) => {
    element.value=String(value);
    element.dispatchEvent(new Event('input',{bubbles:true}));
    element.dispatchEvent(new Event('change',{bubbles:true}));
  },value);
};
const glassStyles = () => page.evaluate(async () => {
  // Sample the settled state, not an intermediate frame of the panel's
  // box-shadow transition. Force style resolution before collecting animations.
  const surfaces=Array.from(document.querySelectorAll('#chatgpt-helper-right, #chatgpt-helper-glass-sidebar, .chatgpt-helper-theme-preview-nav'));
  surfaces.forEach(element => getComputedStyle(element).boxShadow);
  await Promise.all(surfaces.flatMap(element => element.getAnimations()).filter(animation => animation.effect?.getTiming().iterations!==Infinity).map(animation => animation.finished.catch(() => {})));
  const read = selector => {
    const element=document.querySelector(selector);
    if (!element) throw new Error(`Missing glass surface ${selector}`);
    const style=getComputedStyle(element);
    const enhancement=style.boxShadow.split(/,(?![^()]*\))/).find(part => part.includes('9999px'))?.trim() || 'none';
    return {blur:style.backdropFilter,background:style.backgroundColor,shadow:style.boxShadow,enhancement};
  };
  return {
    user:read('[data-user-message-bubble="true"]'),
    assistant:read('[data-markdown-text-style="assistant-message"]'),
    left:read('#chatgpt-helper-glass-sidebar'),
    right:read('#chatgpt-helper-right'),
    previewUser:read('.chatgpt-helper-theme-preview-msg.user'),
    previewAssistant:read('.chatgpt-helper-theme-preview-msg.assistant'),
    previewPanel:read('.chatgpt-helper-theme-preview-nav')
  };
});
const appearance = async mode => {
  await page.locator('.theme-appearance-block').getByRole('button',{name:mode === 'light' ? '浅色' : mode === 'dark' ? '深色' : '跟随系统',exact:true}).click();
  await page.waitForFunction(expected => document.documentElement.getAttribute('data-gh-mode') === expected || document.documentElement.getAttribute('data-theme') === expected, mode);
};
const getStorage = () => page.evaluate(() => JSON.parse(localStorage.getItem('fixture-storage')));
const assertActiveCache = async (label,{empty=false}={}) => {
  await page.waitForFunction(({label,empty}) => {
    const main=document.querySelector(`main[data-fixture-cache="${label}"]`);
    return main?.getAttribute('data-gh-theme-host-main')==='true' &&
      getComputedStyle(main.querySelector('.modern-thread-shell'),'::before').backgroundColor==='rgba(0, 0, 0, 0)' &&
      (empty || document.querySelector('#chatgpt-helper-glass-composer')?.closest('main')===main);
  },{label,empty});
  const state=await page.evaluate(label => {
    const adapter=window.__fixtureCachedAdapter;
    adapter.findTextarea();
    const current=adapter.getChatContainer();
    const scroll=adapter.getScrollContainer();
    return {
      main:current?.dataset.fixtureCache,
      editor:adapter.textarea?.closest('main')?.dataset.fixtureCache || null,
      editorVisible:adapter.textarea?.hasAttribute('data-fixture-visible-composer') || false,
      scroll:scroll?.closest('main')?.dataset.fixtureCache || null,
      messages:adapter.getChatMessages().map(message => ({owner:message.closest('main').dataset.fixtureCache,role:adapter.getMessageRole(message)})),
      glass:document.querySelector('#chatgpt-helper-glass-composer')?.closest('main')?.dataset.fixtureCache || null,
      marked:Array.from(document.querySelectorAll('main[data-gh-theme-host-main="true"]')).map(main=>main.dataset.fixtureCache)
    };
  },label);
  assert.equal(state.main,label);
  assert.deepEqual(state.marked,[label]);
  if (empty) {
    assert.equal(state.editor,null);
    assert.deepEqual(state.messages,[]);
  } else {
    assert.equal(state.editor,label,'Composer belongs to an inactive workspace');
    assert.equal(state.editorVisible,true,'Adapter selected the hidden first matching editor');
    assert.equal(state.scroll,label,'Scroll container belongs to an inactive workspace');
    assert.equal(state.glass,label,'Composer glass remains in the inactive workspace');
    assert.deepEqual(state.messages,[{owner:label,role:'user'},{owner:label,role:'assistant'}]);
    await page.locator('#outline-list .outline-item-text').filter({hasText:`缓存会话 ${label} 章节`}).waitFor();
    assert.equal(await page.locator('#outline-list .outline-item-text').filter({hasText:`缓存会话 ${label==='A'?'B':'A'} 章节`}).count(),0);
  }
};
// Onboarding needs first-run storage and reloads. Each scenario owns a separate
// browser context so the main regression state and user data remain untouched.
const withTourPage = async (name,overrides,run,options={}) => {
  const tourContext=await browser.newContext({viewport:options.viewport || {width:1440,height:1000},locale:options.locale || 'zh-CN',colorScheme:options.colorScheme || 'dark',reducedMotion:'reduce'});
  const tourPage=await tourContext.newPage();
  tourPage.setDefaultTimeout(8000);
  tourPage.on('pageerror',error=>errors.push(`${name}: ${error.message}`));
  tourPage.on('console',message=>{if(message.type()==='error' && !message.text().includes('404 (Not Found)')) errors.push(`${name}: ${message.text()}`);});
  const seed={chatgpt_onboarding_done:null,chatgpt_language:'zh-CN',chatgpt_settings:{defaultPanelState:true,panelWidth:360,themeConfig:{appearanceMode:'dark',presetKey:'original'},readingHistory:{persistence:false,autoRestore:false}},...overrides};
  await tourPage.addInitScript(seed=>{
    if (!sessionStorage.getItem('fixture-tour-seeded')) {
      localStorage.setItem('fixture-storage',JSON.stringify(seed));
      sessionStorage.setItem('fixture-tour-seeded','true');
    }
  },seed);
  try {
    await tourPage.goto(origin+'/c/tour?fixture=modern');
    await tourPage.locator('#chatgpt-helper-right').waitFor({state:'attached'});
    await run(tourPage);
  } catch(error) {
    await tourPage.screenshot({path:join(output,`tour-${name}-failure.png`)}).catch(()=>{});
    throw error;
  } finally { await tourContext.close(); }
};
const tourRoot = tourPage => tourPage.locator('#chatgpt-helper-onboarding-overlay');
const tourAction = (tourPage,action) => tourPage.locator(`[data-tour-action="${action}"]`);
const waitTourStep = (tourPage,step) => tourPage.waitForFunction(step=>document.querySelector('#chatgpt-helper-onboarding-overlay')?.getAttribute('data-tour-step')===step,step);
const tourStorage = tourPage => tourPage.evaluate(()=>JSON.parse(localStorage.getItem('fixture-storage')));
const replayTour = async tourPage => {
  if (!await tourPage.locator('#settings-content').isVisible()) await tourPage.locator('#chatgpt-helper-settings-btn').click();
  const general=tourPage.locator('[data-settings-section="general"] .chatgpt-helper-settings-compact-title-btn');
  if(await general.getAttribute('aria-expanded')==='false') await general.click();
  const trigger=tourPage.getByRole('button',{name:/^(重看新手引导|Replay Onboarding)$/});
  await trigger.click();
  await waitTourStep(tourPage,'welcome');
  return trigger;
};
const withFormulaPage = async (name,run,{enabled=true}={}) => withTourPage(`formula-${name}`,{
  chatgpt_onboarding_done:true,
  chatgpt_settings:{defaultPanelState:true,panelWidth:360,themeConfig:{appearanceMode:'dark',presetKey:'original'},readingHistory:{persistence:false,autoRestore:false},formulaCopy:{enabled}}
},async formulaPage=>{
  await formulaPage.locator('#prompts-tab').waitFor({state:'visible'});
  await formulaPage.addStyleTag({url:origin+'/node_modules/katex/dist/katex.min.css'});
  await formulaPage.evaluate(html=>{
    document.querySelector('.modern-thread-shell').innerHTML=html;
    // Only the clipboard boundary is mocked; actual browser double clicks and
    // real KaTeX DOM/fonts exercise the production event handler and extraction.
    window.__fixtureClipboard={text:'unchanged clipboard sentinel',attempts:[],fail:false};
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{
      async writeText(value) {
        const state=window.__fixtureClipboard;
        state.attempts.push(String(value));
        if(state.fail) throw new DOMException('Synthetic clipboard permission denial','NotAllowedError');
        state.text=String(value);
      },
      async readText() { return window.__fixtureClipboard.text; }
    }});
  },createFormulaFixture());
  await formulaPage.evaluate(()=>document.fonts.ready);
  await run(formulaPage);
});
const resetFormulaClipboard = formulaPage => formulaPage.evaluate(()=>{
  window.__fixtureClipboard.text='unchanged clipboard sentinel';
  window.__fixtureClipboard.attempts=[];
});
const clickFormulaPart = async (formulaPage,selector,double=true) => {
  const target=formulaPage.locator(selector).first();
  await target.scrollIntoViewIfNeeded();
  const rect=await target.boundingBox();
  assert.ok(rect && rect.width>0 && rect.height>0,`Formula part is not visible: ${selector}`);
  // KaTeX's transparent fbox/vlist layout spans can cover a visible glyph.
  // Click its actual screen position, allowing the native hit target within the
  // same formula instead of forcing a synthetic event onto a chosen DOM node.
  const x=rect.x+rect.width/2,y=rect.y+rect.height/2;
  if(double) await formulaPage.mouse.dblclick(x,y);
  else await formulaPage.mouse.click(x,y);
};
const assertFormulaClipboard = async (formulaPage,source,displayMode) => {
  const expected=displayMode?`$$\n${source}\n$$`:`$${source}$`;
  await formulaPage.waitForFunction(expected=>window.__fixtureClipboard.text===expected,expected);
  const actual=await formulaPage.evaluate(()=>window.__fixtureClipboard.text);
  assert.deepEqual(Buffer.from(actual,'utf8'),Buffer.from(expected,'utf8'),'Copied source bytes differ');
  const unwrapped=actual.slice(displayMode?3:1,displayMode?-3:-1);
  assert.doesNotThrow(()=>assertFormulaRenders(unwrapped,displayMode),'Copied formula cannot be rendered by KaTeX');
  assert.equal(await formulaPage.evaluate(()=>window.__fixtureClipboard.attempts.length),1);
};
const assertContrast = async (selector='#fixture-prose') => {
  const colors = await page.locator(selector).evaluate(element => {
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
  // Keep legacy checks above: a modern fixture must supplement, not replace,
  // coverage of the structure the extension previously supported.
  await page.evaluate(() => localStorage.removeItem('fixture-storage'));
  await page.goto(origin + '/c/modern?fixture=modern');
  await page.locator('#outline-tab').waitFor({state:'visible'});
  await test('modern search units produce one outline entry per visible heading without legacy attributes', async () => {
    assert.equal(await page.locator('main [data-message-author-role], main [data-testid^="conversation-turn-"], main [data-turn], main .markdown').count(),0);
    await page.locator('#outline-tab').click();
    await page.locator('.outline-item-text').filter({hasText:'新版结构说明'}).waitFor();
    assert.deepEqual(await page.locator('#outline-list .outline-item-text').allTextContents(),[
      '请解释新版结构与主题','新版结构说明','新版滚动与大纲','没有标题时使用正文摘要作为大纲入口。'
    ]);
    await page.screenshot({path:join(output,'modern-outline.png')});
  });
  await test('modern nested DIL theme scopes switch with readable light and dark text', async () => {
    await openTheme();
    for (const mode of ['light','dark','light']) {
      await appearance(mode);
      await page.waitForFunction(mode => Array.from(document.querySelectorAll('[data-dil-message-id]')).every(element => element.closest('[data-theme]')?.getAttribute('data-theme')===mode),mode);
      await assertContrast('#modern-prose');
      assert.equal(await page.locator('#modern-prose').evaluate(el => getComputedStyle(el).color),mode === 'light' ? 'rgb(23, 23, 23)' : 'rgb(236, 236, 236)');
    }
    await closeTheme();
    // Streaming may attach a fresh dark scope after the user selected light.
    await page.evaluate(() => {
      document.querySelector('[data-turn-key="modern-turn-1"]').insertAdjacentHTML('beforeend','<div data-theme="dark"><div data-dil-message-id="late-dil"><p id="modern-late-prose" data-d-component="text">新插入的内容也应保持当前亮色主题。</p></div></div>');
    });
    await page.waitForFunction(() => document.querySelector('#modern-late-prose').closest('[data-theme]').getAttribute('data-theme')==='light');
    await assertContrast('#modern-late-prose');
    await page.screenshot({path:join(output,'modern-light.png')});
  });
  await test('modern thread pseudo-elements become transparent when wallpaper is enabled', async () => {
    assert.equal(await page.locator('.modern-thread-shell').evaluate(el => getComputedStyle(el,'::before').backgroundColor),'rgb(255, 255, 255)');
    await openTheme();
    await uploadWallpaper(await makeWallpaper('#157b96'),'modern-wallpaper.png');
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    await closeTheme();
    await page.waitForFunction(() => ['::before','::after'].every(pseudo => getComputedStyle(document.querySelector('.modern-thread-shell'),pseudo).backgroundColor==='rgba(0, 0, 0, 0)'));
    const coveringBackgrounds=await page.locator('.modern-thread-shell').evaluate(element => {
      const opaque=[];
      for (let node=element;node && node!==document.body;node=node.parentElement) {
        if (!['transparent','rgba(0, 0, 0, 0)'].includes(getComputedStyle(node).backgroundColor)) opaque.push(node.tagName+'.'+node.className);
      }
      return opaque;
    });
    assert.deepEqual(coveringBackgrounds,[]);
    assert.ok(await page.locator('#chatgpt-helper-theme-bg-layer').evaluate(el => getComputedStyle(el).backgroundImage.includes('blob:')));
    await page.screenshot({path:join(output,'modern-wallpaper.png')});
  });
  await test('modern same-title replacement still navigates to the live heading', async () => {
    await page.locator('#outline-tab').click();
    await page.evaluate(() => {
      const old=document.querySelector('#modern-second-heading');old.replaceWith(old.cloneNode(true));
      document.querySelector('.thread-scroll-container').scrollTop=0;
    });
    await page.locator('.outline-item-text').filter({hasText:'新版滚动与大纲'}).click();
    await page.waitForFunction(() => document.querySelector('.thread-scroll-container').scrollTop > 300 && document.querySelector('#modern-second-heading').getBoundingClientRect().bottom<=document.querySelector('.thread-scroll-container').getBoundingClientRect().bottom);
  });
  await test('modern composer without an id receives prompts while writing cards remain unchanged', async () => {
    assert.equal(await page.locator('#prompt-textarea').count(),0);
    const writing=page.locator('[data-oai-writing-block-surface] [contenteditable]');
    const original=await writing.innerText();
    await page.locator('#prompts-tab').click();
    await page.locator('#prompts-content .chatgpt-helper-search-input').fill('资料精读');
    const content=await page.locator('.chatgpt-helper-prompt-item .chatgpt-helper-prompt-content').textContent();
    await page.locator('.chatgpt-helper-prompt-title').click();
    assert.deepEqual((await page.locator('[data-composer-markdown]').innerText()).split('\n').filter(Boolean),content.split('\n').filter(Boolean));
    assert.equal(await writing.innerText(),original);
    assert.equal(await page.locator('[data-composer-body]').getAttribute('data-gh-theme-host-composer'),'true');
    assert.equal(await page.locator('[data-oai-writing-block-surface]').getAttribute('data-gh-theme-host-composer'),null);
  });
  await test('wallpaper removes the native footer strip and keeps a rounded composer in both modes', async () => {
    await openTheme();
    for (const mode of ['light','dark']) {
      await appearance(mode);
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.modern-composer-backdrop')).backgroundColor==='rgba(0, 0, 0, 0)');
      const glass=await page.locator('#chatgpt-helper-glass-composer').evaluate(el => ({
        root:el.parentElement.hasAttribute('data-composer-surface-variant'),
        radius:parseFloat(getComputedStyle(el).borderRadius),
        width:el.getBoundingClientRect().width,
        footerWidth:document.querySelector('.modern-composer-footer').getBoundingClientRect().width
      }));
      assert.equal(glass.root,true);
      assert.ok(glass.radius>=24);
      assert.ok(glass.width<glass.footerWidth);
    }
    const wallpaper=page.locator('#chatgpt-helper-theme-modal input[type="checkbox"]').first();
    await wallpaper.uncheck();
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.modern-composer-backdrop')).backgroundColor!=='rgba(0, 0, 0, 0)');
    await wallpaper.check();
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    await closeTheme();
  });
  await test('zero wallpaper blur has no forced tint, dimming or extra preview blur', async () => {
    await openTheme();
    await page.locator('#chatgpt-helper-theme-modal input[type="range"]').first().evaluate(el => {
      el.value='0'; el.dispatchEvent(new Event('input',{bubbles:true}));
    });
    for (const mode of ['light','dark']) {
      await appearance(mode);
      const styles=await page.evaluate(() => {
        const wallpaper=document.querySelector('#chatgpt-helper-theme-bg-layer');
        const preview=document.querySelector('.chatgpt-helper-theme-preview-bg');
        const s=getComputedStyle(wallpaper),p=getComputedStyle(preview);
        return {filter:s.filter,inset:s.top,opacity:s.opacity,overlay:getComputedStyle(wallpaper,'::after').content,
          previewFilter:p.filter,previewOpacity:p.opacity,previewOverlay:getComputedStyle(preview.parentElement,'::after').content};
      });
      assert.equal(styles.filter,'blur(0px)');
      assert.equal(styles.inset,'0px');
      assert.equal(styles.opacity,'1');
      assert.equal(styles.overlay,'none');
      assert.equal(styles.previewFilter,'blur(0px)');
      assert.equal(styles.previewOpacity,'1');
      assert.equal(styles.previewOverlay,'none');
    }
    await closeTheme();
    await page.screenshot({path:join(output,'modern-clear-wallpaper-rounded-composer.png')});
  });
  await test('original theme message and panel intensities change real surfaces and preview at 0/50/100', async () => {
    await openTheme();
    await page.locator('[data-preset-key="original"]').click();
    await themeCheckbox('消息毛玻璃效果').check();
    await themeCheckbox('侧栏文字增强').uncheck();
    for (const mode of ['light','dark']) {
      await appearance(mode);
      const messageBackgrounds=[],panelBackgrounds=[];
      for (const intensity of [0,50,100]) {
        await setThemeRange('消息毛玻璃强度',intensity);
        await setThemeRange('侧栏/右栏毛玻璃强度',intensity);
        const styles=await glassStyles();
        for (const key of ['user','assistant','previewUser','previewAssistant']) {
          assert.equal(styles[key].blur,`blur(${intensity*.32}px)`,`${mode} ${key} blur at ${intensity}`);
        }
        for (const key of ['left','right','previewPanel']) {
          assert.equal(styles[key].blur,`blur(${intensity*.4}px)`,`${mode} ${key} blur at ${intensity}`);
        }
        assert.equal(styles.left.background,styles.right.background,`${mode}: left/right panel surfaces differ`);
        assert.equal(styles.previewPanel.background,styles.left.background,`${mode}: preview panel differs`);
        assert.equal(styles.previewUser.background,styles.user.background,`${mode}: user preview differs`);
        assert.equal(styles.previewAssistant.background,styles.assistant.background,`${mode}: assistant preview differs`);
        messageBackgrounds.push(styles.assistant.background);
        panelBackgrounds.push(styles.right.background);
      }
      assert.equal(new Set(messageBackgrounds).size,3,`${mode}: message intensity did not change opacity`);
      assert.equal(new Set(panelBackgrounds).size,3,`${mode}: panel intensity did not change opacity`);
    }
    const nestedBlur=await page.locator('#chatgpt-helper-right').evaluate(panel => Array.from(panel.querySelectorAll('*')).filter(element => {
      const filter=getComputedStyle(element).backdropFilter;
      return filter!=='none' && filter!=='blur(0px)';
    }).map(element => element.id || element.className));
    assert.deepEqual(nestedBlur,[],'Right panel descendants apply additional backdrop blur');
    await page.screenshot({path:join(output,'glass-intensity-preview.png')});
    await closeTheme();
  });
  await test('text enhancement changes both panel masks at 0/50/100 in light and dark modes', async () => {
    await openTheme();
    await themeCheckbox('侧栏文字增强').check();
    for (const mode of ['light','dark']) {
      await appearance(mode);
      const shadows=[];
      for (const intensity of [0,50,100]) {
        await setThemeRange('增强强度',intensity);
        const immediate=await page.evaluate(() => ['#chatgpt-helper-glass-sidebar','#chatgpt-helper-right'].map(selector =>
          getComputedStyle(document.querySelector(selector)).boxShadow.split(/,(?![^()]*\))/).find(part => part.includes('9999px'))?.trim() || 'none'));
        assert.equal(immediate[0],immediate[1],`${mode}: panel enhancement lags behind the slider`);
        const styles=await glassStyles();
        assert.equal(styles.left.enhancement,styles.right.enhancement,`${mode}: left/right enhancement differs`);
        assert.equal(styles.previewPanel.enhancement,styles.left.enhancement,`${mode}: preview enhancement differs`);
        shadows.push(styles.right.enhancement);
      }
      assert.equal(new Set(shadows).size,3,`${mode}: enhancement slider has no visible effect`);
      await themeCheckbox('侧栏文字增强').uncheck();
      const off=await glassStyles();
      assert.notEqual(off.right.enhancement,shadows[2],`${mode}: enhancement toggle did not remove mask`);
      assert.equal(await themeRange('增强强度').isDisabled(),true);
      await themeCheckbox('侧栏文字增强').check();
      assert.equal((await glassStyles()).right.enhancement,shadows[2],`${mode}: enabling enhancement did not restore strength`);
    }
    await closeTheme();
  });
  await test('wallpaper and effect switches disable dependent controls without losing strengths', async () => {
    await openTheme();
    await setThemeRange('消息毛玻璃强度',50);
    await setThemeRange('侧栏/右栏毛玻璃强度',50);
    await setThemeRange('增强强度',50);
    await themeCheckbox('消息毛玻璃效果').uncheck();
    assert.equal(await themeRange('消息毛玻璃强度').isDisabled(),true);
    assert.equal(await themeRange('消息毛玻璃强度').inputValue(),'50');
    assert.equal((await glassStyles()).assistant.blur,'none');
    await themeCheckbox('消息毛玻璃效果').check();
    assert.equal((await glassStyles()).assistant.blur,'blur(16px)');
    await themeCheckbox('启用壁纸').uncheck();
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='false');
    for (const name of ['消息毛玻璃强度','侧栏/右栏毛玻璃强度','增强强度']) assert.equal(await themeRange(name).isDisabled(),true,`${name} should be disabled without wallpaper`);
    for (const name of ['消息毛玻璃效果','侧栏文字增强']) assert.equal(await themeCheckbox(name).isDisabled(),true,`${name} should be disabled without wallpaper`);
    await themeCheckbox('启用壁纸').check();
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    for (const name of ['消息毛玻璃强度','侧栏/右栏毛玻璃强度','增强强度']) {
      assert.equal(await themeRange(name).isDisabled(),false);
      assert.equal(await themeRange(name).inputValue(),'50');
    }
    await closeTheme();
  });
  await test('compact quick-menu and shortcut settings retain controls without description rows', async () => {
    await openSettings();
    for (const label of ['输入框 / 快速唤起','面板快捷键']) {
      const row=page.locator('.chatgpt-helper-settings-compact-row').filter({has:page.locator('.chatgpt-helper-settings-compact-label-text',{hasText:label})});
      assert.equal(await row.count(),1);
      assert.equal(await row.locator('.chatgpt-helper-settings-compact-desc').count(),0);
      assert.equal(await row.locator('button').count(),1);
      assert.equal(await row.locator('button').isVisible(),true);
    }
  });
  await test('dragging below collapse threshold preserves the previous width for reopening', async () => {
    const panel=page.locator('#chatgpt-helper-right');
    const resize=async width => {
      const bounds=await panel.boundingBox(),handle=await page.locator('#chatgpt-helper-resize-handle').boundingBox();
      const startX=handle.x+handle.width/2,y=handle.y+60;
      await page.mouse.move(startX,y);await page.mouse.down();
      await page.mouse.move(startX+bounds.width-width,y,{steps:3});await page.mouse.up();
      await page.waitForFunction(width => Math.abs(document.querySelector('#chatgpt-helper-right').getBoundingClientRect().width-width)<1,width);
    };
    await resize(360);
    const handle=await page.locator('#chatgpt-helper-resize-handle').boundingBox();
    const startX=handle.x+handle.width/2,y=handle.y+60;
    await page.mouse.move(startX,y);await page.mouse.down();
    await page.mouse.move(startX+360-163,y,{steps:3});
    await page.waitForFunction(() => document.querySelector('#chatgpt-helper-right').classList.contains('collapsed'));
    await page.mouse.up();
    assert.equal((await getStorage()).chatgpt_settings.panelWidth,360);
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('gh-resizing')),false);
    await page.locator('#quick-btn-panel').click();
    await page.waitForFunction(() => !document.querySelector('#chatgpt-helper-right').classList.contains('collapsed') && Math.abs(document.querySelector('#chatgpt-helper-right').getBoundingClientRect().width-360)<1);
  });
  await test('resize flushes the final mouseup coordinate and releases drag state on blur', async () => {
    await page.evaluate(() => {
      const handle=document.querySelector('#chatgpt-helper-resize-handle'),rect=handle.getBoundingClientRect();
      const x=rect.x+rect.width/2,y=rect.y+60;
      handle.dispatchEvent(new MouseEvent('mousedown',{clientX:x,clientY:y,button:0,buttons:1,bubbles:true}));
      document.dispatchEvent(new MouseEvent('mousemove',{clientX:x-10,clientY:y,buttons:1,bubbles:true}));
      document.dispatchEvent(new MouseEvent('mouseup',{clientX:x-47,clientY:y,button:0,buttons:0,bubbles:true}));
    });
    await page.waitForFunction(() => Math.abs(document.querySelector('#chatgpt-helper-right').getBoundingClientRect().width-407)<1);
    assert.equal((await getStorage()).chatgpt_settings.panelWidth,407);
    const handle=await page.locator('#chatgpt-helper-resize-handle').boundingBox();
    const x=handle.x+handle.width/2,y=handle.y+60;
    await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+17,y);
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await page.mouse.up();
    await page.waitForFunction(() => Math.abs(document.querySelector('#chatgpt-helper-right').getBoundingClientRect().width-390)<1);
    assert.equal((await getStorage()).chatgpt_settings.panelWidth,390);
    assert.deepEqual(await page.evaluate(() => ({body:document.body.classList.contains('gh-resizing'),panel:document.querySelector('#chatgpt-helper-right').classList.contains('gh-resizing'),select:document.body.style.userSelect})),{body:false,panel:false,select:''});
  });
  await test('effect strengths and switches restore after reload with dependent states intact', async () => {
    await openTheme();
    await setThemeRange('消息毛玻璃强度',50);await setThemeRange('侧栏/右栏毛玻璃强度',50);await setThemeRange('增强强度',50);
    await themeCheckbox('消息毛玻璃效果').uncheck();await themeCheckbox('侧栏文字增强').uncheck();
    await page.waitForFunction(() => {
      const config=JSON.parse(localStorage.getItem('fixture-storage')).chatgpt_settings.themeConfig;
      return config.messageGlassIntensity===50 && config.panelGlassIntensity===50 && config.sidebarTextEnhanceIntensity===50 && !config.messageGlassEnabled && !config.sidebarTextEnhanceEnabled;
    });
    await page.reload();await page.locator('#outline-tab').waitFor({state:'visible'});
    await page.waitForFunction(() => document.documentElement.getAttribute('data-gh-bg-enabled')==='true');
    await openTheme();
    for (const name of ['消息毛玻璃强度','侧栏/右栏毛玻璃强度','增强强度']) assert.equal(await themeRange(name).inputValue(),'50');
    assert.equal(await themeCheckbox('消息毛玻璃效果').isChecked(),false);assert.equal(await themeCheckbox('侧栏文字增强').isChecked(),false);
    assert.equal(await themeRange('消息毛玻璃强度').isDisabled(),true);assert.equal(await themeRange('增强强度').isDisabled(),true);
    assert.equal(await themeRange('侧栏/右栏毛玻璃强度').isDisabled(),false);
    await themeCheckbox('消息毛玻璃效果').check();await themeCheckbox('侧栏文字增强').check();
    const styles=await glassStyles();assert.equal(styles.assistant.blur,'blur(16px)');assert.equal(styles.right.blur,'blur(20px)');
    assert.equal(styles.left.enhancement,styles.right.enhancement);assert.equal(styles.previewPanel.enhancement,styles.right.enhancement);
    await closeTheme();
  });
  await page.addScriptTag({path:join(root,'scripts/fixtures/cached-workspaces.js')});
  await test('cached workspaces select the active main, messages, composer, scroll and wallpaper hosts', async () => {
    await page.evaluate(() => {
      window.__fixtureCache.setup();
      history.replaceState({fixtureCache:'A'},'', '/c/cached-a');
      window.__fixtureCachedAdapter=new window.__MY_EXT__.helper.ChatGPTAdapter();
      window.__fixtureCachedAdapter.getScrollContainer();
      window.__fixtureCacheNodes=Array.from(document.querySelectorAll('main[data-fixture-cache]'));
      window.__fixtureCachedWallpaper=getComputedStyle(document.querySelector('#chatgpt-helper-theme-bg-layer')).backgroundImage;
      const prototype=window.__MY_EXT__.helper.ChatGPTHelper.prototype;
      const original=prototype.refreshThemeHostTargets;
      window.__fixtureHostRefreshes=0;
      prototype.refreshThemeHostTargets=function(...args) { window.__fixtureHostRefreshes++;return original.apply(this,args); };
      window.__fixtureRestoreHostRefresh=() => { prototype.refreshThemeHostTargets=original; };
      const createObjectURL=URL.createObjectURL;
      window.__fixtureNewObjectURLs=0;
      URL.createObjectURL=function(...args) { window.__fixtureNewObjectURLs++;return createObjectURL.apply(this,args); };
      window.__fixtureRestoreCreateURL=() => { URL.createObjectURL=createObjectURL; };
    });
    await page.locator('#outline-tab').click();
    await assertActiveCache('A');
    await page.evaluate(() => window.__fixtureCache.activate('B'));
    await assertActiveCache('B');
    assert.equal(await page.evaluate(() => document.querySelector('main').dataset.fixtureCache),'A','Fixture must keep stale A before active B');
    const oldTop=await page.locator('main[data-fixture-cache="A"] .thread-scroll-container').evaluate(el=>el.scrollTop);
    await page.locator('#scroll-bottom-btn').click();
    await page.waitForFunction(() => document.querySelector('main[data-fixture-cache="B"] .thread-scroll-container').scrollTop>500);
    assert.equal(await page.locator('main[data-fixture-cache="A"] .thread-scroll-container').evaluate(el=>el.scrollTop),oldTop);
    await page.screenshot({path:join(output,'cached-active-b-wallpaper.png')});
  });
  await test('attribute-only cache activation changes outline and targets repeatedly without changing URL', async () => {
    const unchangedUrl=page.url();
    for (const label of ['A','B','A','B']) {
      await page.evaluate(label => window.__fixtureCache.activate(label),label);
      await assertActiveCache(label);
      assert.equal(page.url(),unchangedUrl);
      assert.equal(await page.evaluate(() => window.__fixtureCacheNodes.every(node=>node.isConnected)),true);
    }
    await page.locator('#prompts-tab').click();
    await page.locator('#prompts-content .chatgpt-helper-search-input').fill('资料精读');
    const oldEditor=await page.locator('main[data-fixture-cache="A"] [data-fixture-visible-composer]').innerText();
    await page.locator('.chatgpt-helper-prompt-title').click();
    assert.ok((await page.locator('main[data-fixture-cache="B"] [data-fixture-visible-composer]').innerText()).includes('请作为严谨的研究助理'));
    assert.equal(await page.locator('main[data-fixture-cache="A"] [data-fixture-visible-composer]').innerText(),oldEditor);
    await page.locator('#outline-tab').click();
  });
  await test('real history back and forward restores the corresponding cached workspace', async () => {
    await page.evaluate(() => { history.replaceState({fixtureCache:'A'},'', '/c/cached-a');window.__fixtureCache.activate('A'); });
    await assertActiveCache('A');
    await page.evaluate(() => { history.pushState({fixtureCache:'B'},'', '/c/cached-b');window.__fixtureCache.activate('B'); });
    await assertActiveCache('B');
    await page.goBack();
    await assertActiveCache('A');assert.ok(page.url().endsWith('/c/cached-a'));
    await page.goForward();
    await assertActiveCache('B');assert.ok(page.url().endsWith('/c/cached-b'));
  });
  await test('an activated empty shell receives wallpaper before delayed content and composer arrive', async () => {
    await page.evaluate(() => {
      window.__fixtureCache.activate('A');
      const target=window.__fixtureCache.main('B');
      target.querySelector('[data-thread-find-target="conversation"]').replaceChildren();
      target.querySelector('.modern-composer-footer').remove();
    });
    await assertActiveCache('A');
    await page.evaluate(() => window.__fixtureCache.activate('B'));
    await assertActiveCache('B',{empty:true});
    await page.waitForFunction(() => document.querySelectorAll('#outline-list .outline-item').length===0);
    await page.evaluate(() => window.__fixtureCache.hydrate('B'));
    await assertActiveCache('B');
  });
  await test('cache switching reuses the wallpaper URL and single layers without a refresh feedback loop', async () => {
    const stable=await page.evaluate(() => ({
      wallpaper:getComputedStyle(document.querySelector('#chatgpt-helper-theme-bg-layer')).backgroundImage===window.__fixtureCachedWallpaper,
      urls:window.__fixtureNewObjectURLs,
      backgroundLayers:document.querySelectorAll('#chatgpt-helper-theme-bg-layer').length,
      composerLayers:document.querySelectorAll('#chatgpt-helper-glass-composer').length,
      sidebarLayers:document.querySelectorAll('#chatgpt-helper-glass-sidebar').length
    }));
    assert.deepEqual(stable,{wallpaper:true,urls:0,backgroundLayers:1,composerLayers:1,sidebarLayers:1});
    // Allow queued host work to finish; an idle page must not keep scheduling itself.
    await page.waitForTimeout(700);
    const before=await page.evaluate(()=>window.__fixtureHostRefreshes);
    await page.waitForTimeout(700);
    const after=await page.evaluate(()=>window.__fixtureHostRefreshes);
    assert.ok(after-before<=1,`Idle cache generated ${after-before} host refreshes in 700ms`);
    await page.evaluate(() => { window.__fixtureRestoreHostRefresh();window.__fixtureRestoreCreateURL(); });
  });
  await test('onboarding auto-starts for first run while legacy true suppresses it and replay stays singular', async () => {
    await withTourPage('first-run',{},async tourPage=>{
      await waitTourStep(tourPage,'welcome');
      assert.equal(await tourRoot(tourPage).locator('.gh-tour-card').getAttribute('role'),'dialog');
      assert.notEqual(await tourRoot(tourPage).locator('.gh-tour-card').getAttribute('aria-modal'),'true');
      assert.equal(await tourRoot(tourPage).count(),1);
      await tourPage.screenshot({path:join(output,'onboarding-welcome.png')});
      await tourAction(tourPage,'skip').click();
    });
    await withTourPage('legacy-replay',{chatgpt_onboarding_done:true},async tourPage=>{
      await tourPage.locator('#chatgpt-helper-settings-btn').waitFor({state:'visible'});
      await tourPage.waitForTimeout(200);
      assert.equal(await tourRoot(tourPage).count(),0);
      const trigger=await replayTour(tourPage);
      await trigger.evaluate(element=>element.click());
      assert.equal(await tourRoot(tourPage).count(),1);
      await tourAction(tourPage,'skip').click();
    });
  });
  await test('onboarding navigation covers every step and completion persists without changing settings', async () => {
    await withTourPage('completion',{},async tourPage=>{
      await waitTourStep(tourPage,'welcome');
      const settings=(await tourStorage(tourPage)).chatgpt_settings;
      await tourAction(tourPage,'start').click();
      for (const step of ['prompts','outline','organize','panel','appearance']) {
        await waitTourStep(tourPage,step);
        if(step==='outline') {
          const card=await tourPage.locator('.gh-tour-card').boundingBox();
          const panel=await tourPage.locator('#chatgpt-helper-right').boundingBox();
          assert.ok(card.x>=0 && card.x+card.width<=panel.x,'Desktop guide overlaps its highlighted panel');
          await tourPage.screenshot({path:join(output,'onboarding-desktop-outline.png')});
        }
        if(step!=='appearance') await tourAction(tourPage,'next').click();
      }
      await tourAction(tourPage,'prev').click();await waitTourStep(tourPage,'panel');
      await tourPage.locator('[data-tour-go="outline"]').click();await waitTourStep(tourPage,'outline');
      await tourPage.locator('[data-tour-go="appearance"]').click();await waitTourStep(tourPage,'appearance');
      await tourAction(tourPage,'finish').click();
      await tourRoot(tourPage).waitFor({state:'detached'});
      const saved=await tourStorage(tourPage);
      assert.equal(saved.chatgpt_onboarding_done.status,'completed');
      assert.deepEqual(saved.chatgpt_settings,settings);
      assert.equal(await tourPage.locator('#prompts-tab').getAttribute('aria-selected'),'true');
    });
  });
  await test('onboarding skip and Escape restore the original pane and return focus to replay', async () => {
    await withTourPage('skip-focus',{chatgpt_onboarding_done:true},async tourPage=>{
      const trigger=await replayTour(tourPage);
      const originalTrigger=await trigger.elementHandle();
      await tourAction(tourPage,'start').click();await waitTourStep(tourPage,'prompts');
      await tourAction(tourPage,'next').click();await waitTourStep(tourPage,'outline');
      await tourPage.keyboard.press('Escape');
      await tourRoot(tourPage).waitFor({state:'detached'});
      assert.equal((await tourStorage(tourPage)).chatgpt_onboarding_done.status,'skipped');
      assert.equal(await tourPage.locator('#settings-content').isVisible(),true);
      if(await originalTrigger.evaluate(element=>element.isConnected)) assert.equal(await originalTrigger.evaluate(element=>document.activeElement===element),true);
      await trigger.click();await waitTourStep(tourPage,'welcome');
      await tourAction(tourPage,'skip').click();
      assert.equal(await tourPage.locator('#settings-content').isVisible(),true);
    });
  });
  await test('onboarding progress resumes after reload and completed records suppress future auto-start', async () => {
    await withTourPage('resume',{},async tourPage=>{
      await waitTourStep(tourPage,'welcome');await tourAction(tourPage,'start').click();
      await tourAction(tourPage,'next').click();await waitTourStep(tourPage,'outline');
      await tourPage.reload();await waitTourStep(tourPage,'outline');
      await tourPage.locator('[data-tour-go="appearance"]').click();await waitTourStep(tourPage,'appearance');
      await tourAction(tourPage,'finish').click();await tourRoot(tourPage).waitFor({state:'detached'});
      assert.equal((await tourStorage(tourPage)).chatgpt_onboarding_done.status,'completed');
      await tourPage.reload();await tourPage.locator('#prompts-tab').waitFor({state:'visible'});
      await tourPage.waitForTimeout(200);
      assert.equal(await tourRoot(tourPage).count(),0);
    });
  });
  await test('onboarding panel demonstration restores original width and collapsed preference on skip', async () => {
    await withTourPage('panel-demo',{chatgpt_settings:{defaultPanelState:false,panelWidth:360,themeConfig:{appearanceMode:'dark',presetKey:'original'},readingHistory:{persistence:false,autoRestore:false}}},async tourPage=>{
      await waitTourStep(tourPage,'welcome');
      const before=(await tourStorage(tourPage)).chatgpt_settings;
      assert.equal(await tourPage.locator('#chatgpt-helper-right').evaluate(el=>el.classList.contains('collapsed')),true);
      await tourAction(tourPage,'start').click();
      await tourPage.locator('[data-tour-go="panel"]').click();await waitTourStep(tourPage,'panel');
      assert.equal(await tourPage.locator('#chatgpt-helper-right').evaluate(el=>el.classList.contains('collapsed')),false);
      await tourAction(tourPage,'panel').click();
      assert.equal(await tourPage.locator('#chatgpt-helper-right').evaluate(el=>el.classList.contains('collapsed')),true);
      await tourAction(tourPage,'panel').click();
      await tourPage.waitForFunction(()=>Math.abs(document.querySelector('#chatgpt-helper-right').getBoundingClientRect().width-360)<1);
      assert.equal(await tourPage.locator('#chatgpt-helper-right').evaluate(el=>el.classList.contains('collapsed')),false);
      await tourAction(tourPage,'skip').click();
      await tourRoot(tourPage).waitFor({state:'detached'});
      assert.equal(await tourPage.locator('#chatgpt-helper-right').evaluate(el=>el.classList.contains('collapsed')),true);
      assert.deepEqual((await tourStorage(tourPage)).chatgpt_settings,before);
      assert.equal(await tourPage.locator('#quick-btn-panel').evaluate(el=>document.activeElement===el),true);
    });
  });
  await test('onboarding real actions focus composer and open organization/theme without modifying a draft', async () => {
    await withTourPage('real-actions',{chatgpt_onboarding_done:true},async tourPage=>{
      const composer=tourPage.locator('[data-composer-markdown]');
      const draft='保留这段尚未发送的草稿。\nKeep this existing draft unchanged.';
      await composer.fill(draft);
      const draftDOM=await composer.innerHTML();
      const settings=(await tourStorage(tourPage)).chatgpt_settings;
      await replayTour(tourPage);await tourAction(tourPage,'start').click();
      await tourAction(tourPage,'composer').click();
      assert.equal(await composer.evaluate(el=>document.activeElement===el),true);
      await tourPage.locator('[data-tour-go="organize"]').click();
      await tourAction(tourPage,'conversations').click();
      assert.equal(await tourPage.locator('#conversations-tab').getAttribute('aria-selected'),'true');
      await tourAction(tourPage,'export').click();
      assert.equal(await tourPage.locator('#export-tab').getAttribute('aria-selected'),'true');
      await tourPage.locator('[data-tour-go="appearance"]').click();
      await tourAction(tourPage,'theme').click();
      await tourRoot(tourPage).waitFor({state:'detached'});
      await tourPage.locator('#chatgpt-helper-theme-modal').waitFor({state:'visible'});
      assert.equal((await tourStorage(tourPage)).chatgpt_onboarding_done.status,'completed');
      assert.equal(await composer.innerHTML(),draftDOM);
      assert.deepEqual((await tourStorage(tourPage)).chatgpt_settings,settings);
      await tourPage.locator('.chatgpt-helper-theme-modal-close').click();
    });
  });
  await test('onboarding stays within a narrow viewport in Chinese/light and English/dark modes', async () => {
    for(const [language,mode] of [['zh-CN','light'],['en','dark']]) {
      await withTourPage(`narrow-${language}`,{chatgpt_language:language,chatgpt_settings:{defaultPanelState:true,panelWidth:360,themeConfig:{appearanceMode:mode,presetKey:'original'},readingHistory:{persistence:false,autoRestore:false}}},async tourPage=>{
        await waitTourStep(tourPage,'welcome');
        const assertBounds=async()=>{
          const box=await tourPage.locator('.gh-tour-card').boundingBox();
          assert.ok(box.x>=0 && box.y>=0 && box.x+box.width<=391 && box.y+box.height<=845,`Tour card exceeds viewport: ${JSON.stringify(box)}`);
        };
        await assertBounds();await tourAction(tourPage,'start').click();
        assert.equal((await tourAction(tourPage,'next').innerText()).trim(),language==='en'?'Next':'下一步');
        for(const step of ['prompts','outline','organize','panel','appearance']) {
          await waitTourStep(tourPage,step);await assertBounds();
          if(step!=='appearance') await tourAction(tourPage,'next').click();
        }
        assert.equal(await tourPage.locator('html').getAttribute('data-gh-mode'),mode);
        await tourPage.screenshot({path:join(output,`onboarding-narrow-${language}-${mode}.png`)});
        await tourAction(tourPage,'finish').click();
      },{viewport:{width:390,height:844},locale:language==='en'?'en-US':'zh-CN',colorScheme:mode});
    }
  });
  await test('onboarding survives missing targets, empty outline, route changes and rebuilt panel UI', async () => {
    await withTourPage('fallback',{},async tourPage=>{
      await waitTourStep(tourPage,'welcome');await tourAction(tourPage,'start').click();
      await tourPage.locator('#prompts-content').evaluate(el=>el.remove());
      await tourPage.locator('.gh-tour-missing').waitFor({state:'visible'});
      await tourPage.evaluate(()=>{
        document.querySelector('.modern-thread-shell').replaceChildren();
        history.pushState({},'', '/c/tour-next?fixture=modern');
      });
      await tourPage.locator('[data-tour-go="outline"]').click();await waitTourStep(tourPage,'outline');
      assert.equal(await tourPage.locator('#outline-list .outline-item').count(),0);
      await tourPage.locator('#chatgpt-helper-settings-btn').click();
      const general=tourPage.locator('[data-settings-section="general"] .chatgpt-helper-settings-compact-title-btn');
      if(await general.getAttribute('aria-expanded')==='false') await general.click();
      await tourPage.getByRole('button',{name:'界面语言',exact:true}).click();
      await tourPage.locator('#settings-content .chatgpt-helper-custom-select-option[data-value="en"]').click();
      assert.equal(await tourRoot(tourPage).count(),1);
      await tourPage.locator('[data-tour-go="panel"]').click();await waitTourStep(tourPage,'panel');
      await tourPage.locator('.gh-tour-spotlight').waitFor({state:'visible'});
      await tourPage.setViewportSize({width:390,height:844});
      await tourPage.waitForFunction(()=>{
        const rect=document.querySelector('.gh-tour-card').getBoundingClientRect();
        return rect.left>=0 && rect.right<=innerWidth && rect.bottom<=innerHeight;
      });
      await tourAction(tourPage,'next').click();await waitTourStep(tourPage,'appearance');
      await tourAction(tourPage,'finish').click();await tourRoot(tourPage).waitFor({state:'detached'});
    });
  });
  for(const [id,key] of [['formula-catalan','catalan'],['formula-fourth','fourth']]) {
    await test(`double-clicking ${key} glyph, fraction bar, numerator and denominator copies the complete KaTeX source`,async()=>{
      await withFormulaPage(key,async formulaPage=>{
        const selectors=[
          `#${id} .katex-html .mathnormal`,
          `#${id} .katex-html .frac-line`,
          `#${id} .mfrac > .vlist-t > .vlist-r:first-child > .vlist > span:nth-child(3) > .mord`,
          `#${id} .mfrac > .vlist-t > .vlist-r:first-child > .vlist > span:first-child > .mord`
        ];
        await clickFormulaPart(formulaPage,selectors[0],false);
        assert.equal(await formulaPage.evaluate(()=>window.__fixtureClipboard.attempts.length),0,'Single click should not copy a formula');
        for(const selector of selectors) {
          await resetFormulaClipboard(formulaPage);
          await clickFormulaPart(formulaPage,selector);
          await assertFormulaClipboard(formulaPage,FORMULA_SOURCES[key],true);
        }
        if(key==='catalan') {
          await formulaPage.locator('.thread-scroll-container').evaluate(element=>{element.scrollTop=0;});
          await formulaPage.screenshot({path:join(output,'formula-real-katex.png')});
        }
      });
    });
  }
  await test('tall inline fractions and nested binomials retain inline delimiters',async()=>{
    await withFormulaPage('inline',async formulaPage=>{
      assert.ok((await formulaPage.locator('#formula-inline .katex').boundingBox()).height>40,'Fixture must exceed the obsolete height heuristic');
      await clickFormulaPart(formulaPage,'#formula-inline .mfrac .mathnormal');
      await assertFormulaClipboard(formulaPage,FORMULA_SOURCES.inline,false);
    });
  });
  await test('annotation wins over speech labels and sourced wrappers preserve escapes/newlines without joining neighbors',async()=>{
    await withFormulaPage('sources',async formulaPage=>{
      await formulaPage.locator('#formula-priority .katex').evaluate(element=>element.setAttribute('aria-label','spoken C sub n equals a fraction'));
      for(const [id,key,display] of [
        ['formula-priority','inline',false],['formula-adjacent','adjacent',false],
        ['formula-data-latex','multiline',true],['formula-data-math','adjacent',false],['formula-data-formula','fourth',true]
      ]) {
        await resetFormulaClipboard(formulaPage);
        await formulaPage.locator(`#${id} .katex-html .mathnormal`).first().dblclick();
        await assertFormulaClipboard(formulaPage,FORMULA_SOURCES[key],display);
      }
    });
  });
  await test('formulas without trusted source show an explanation and leave the clipboard unchanged',async()=>{
    await withFormulaPage('missing-source',async formulaPage=>{
      await formulaPage.locator('#formula-source-missing .katex-html .mathnormal').first().dblclick();
      await formulaPage.getByText('未找到公式源码，未复制',{exact:true}).waitFor({state:'visible'});
      assert.deepEqual(await formulaPage.evaluate(()=>({text:window.__fixtureClipboard.text,attempts:window.__fixtureClipboard.attempts})),{text:'unchanged clipboard sentinel',attempts:[]});
    });
  });
  await test('KaTeX inside code and ordinary math-related classes do not trigger formula copy',async()=>{
    await withFormulaPage('excluded-text',async formulaPage=>{
      await formulaPage.locator('#formula-code .katex-html .mathnormal').first().dblclick();
      await formulaPage.locator('#formula-ordinary').dblclick();
      assert.deepEqual(await formulaPage.evaluate(()=>({text:window.__fixtureClipboard.text,attempts:window.__fixtureClipboard.attempts})),{text:'unchanged clipboard sentinel',attempts:[]});
      assert.equal(await formulaPage.locator('#chatgpt-helper-toast').count(),0);
    });
  });
  await test('formula-copy preference disables double-click copying and can be re-enabled from settings',async()=>{
    await withFormulaPage('preference',async formulaPage=>{
      const target=formulaPage.locator('#formula-fourth .katex-html .mathnormal').first();
      await target.dblclick();
      assert.equal(await formulaPage.evaluate(()=>window.__fixtureClipboard.attempts.length),0);
      await formulaPage.locator('#chatgpt-helper-settings-btn').click();
      await formulaPage.locator('[data-settings-section="content-processing"] .chatgpt-helper-settings-compact-title-btn').click();
      const toggle=formulaPage.getByRole('button',{name:'启用公式复制',exact:true});
      assert.equal(await toggle.getAttribute('aria-pressed'),'false');
      await toggle.click();
      await target.dblclick();await assertFormulaClipboard(formulaPage,FORMULA_SOURCES.fourth,true);
      await toggle.click();await resetFormulaClipboard(formulaPage);await target.dblclick();
      assert.equal(await formulaPage.evaluate(()=>window.__fixtureClipboard.attempts.length),0);
    },{enabled:false});
  });
  await test('clipboard API and legacy-copy failure report failure without claiming a copied formula',async()=>{
    await withFormulaPage('clipboard-failure',async formulaPage=>{
      await formulaPage.evaluate(()=>{
        window.__fixtureClipboard.fail=true;
        window.__fixtureClipboard.fallbackAttempts=0;
        const original=document.execCommand.bind(document);
        document.execCommand=(command,...args)=>{
          if(command==='copy') { window.__fixtureClipboard.fallbackAttempts++;return false; }
          return original(command,...args);
        };
      });
      await formulaPage.locator('#formula-fourth .katex-html .mathnormal').first().dblclick();
      await formulaPage.getByText('复制失败',{exact:true}).waitFor({state:'visible'});
      const state=await formulaPage.evaluate(()=>window.__fixtureClipboard);
      assert.equal(state.text,'unchanged clipboard sentinel');
      assert.equal(state.attempts.length,1);assert.equal(state.fallbackAttempts,1);
      assert.equal(state.attempts[0],`$$\n${FORMULA_SOURCES.fourth}\n$$`);
      assert.equal(await formulaPage.getByText('公式已复制',{exact:true}).count(),0);
    });
  });
  await test('no browser runtime or extension initialization errors', async () => assert.deepEqual(errors,[]));
} finally {
  await writeFile(join(output,'results.json'),JSON.stringify({bundleSha256,results,errors},null,2));
  console.log(`Browser bundle SHA-256: ${bundleSha256}`);
  console.log(`Browser artifacts: ${output}`);
  await context.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
if (results.some(result => !result.passed)) process.exitCode=1;
