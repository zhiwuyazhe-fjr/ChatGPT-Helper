import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import JSZip from 'jszip';
import katex from 'katex';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = process.env.BROWSER_TEST_OUTPUT ? join(process.env.BROWSER_TEST_OUTPUT, 'export') : await mkdtemp(join(tmpdir(), 'helper-export-'));
await mkdir(output, { recursive: true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE_PATH)).href : 'playwright');
const server = createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = pathname.startsWith('/c/') || pathname === '/' ? join(root, 'scripts/fixtures/chatgpt.html') : resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep)) return res.writeHead(403).end();
    try { const bytes = await readFile(file); res.writeHead(200, { 'Content-Type': ({'.js':'text/javascript','.css':'text/css','.html':'text/html; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'})[extname(file)] || 'application/octet-stream' }).end(bytes); }
    catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
const context = await browser.newContext({ viewport: { width:1440, height:1000 }, locale:'zh-CN', reducedMotion:'reduce' });
const page = await context.newPage(); page.setDefaultTimeout(10000);
const errors = []; const results = []; const loads = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (/html2canvas|jszip|chatgpt-exporter/.test(request.url())) loads.push(new URL(request.url()).pathname); });
const conversation = (id='fixture') => ({ id, title:'导出回归样例', create_time:1700000000, update_time:1700000001, current_node:'a2', mapping: {
    root:{id:'root',parent:null,children:['u1'],message:null},
    u1:{id:'u1',parent:'root',children:['a1'],message:{id:'u1',author:{role:'user'},create_time:1700000000,content:{content_type:'text',parts:['请解释架构']},metadata:{},recipient:'all'}},
    a1:{id:'a1',parent:'u1',children:['a2'],message:{id:'a1',author:{role:'assistant'},create_time:1700000001,content:{content_type:'text',parts:['第一段']},metadata:{},recipient:'all'}},
    a2:{id:'a2',parent:'a1',children:[],message:{id:'a2',author:{role:'assistant'},create_time:1700000002,content:{content_type:'text',parts:['第二段']},metadata:{},recipient:'all'}},
}});
await page.route('**/api/auth/session', route => route.fulfill({ json:{accessToken:'fixture-only-token'} }));
await page.route('**/backend-api/**', route => {
    const url = new URL(route.request().url());
    if (url.pathname.includes('/conversation/')) return route.fulfill({json:conversation()});
    if (url.pathname.includes('/accounts/')) return route.fulfill({json:{accounts:{}}});
    if (url.pathname.includes('/sidebar')) return route.fulfill({json:{items:[],cursor:null}});
    return route.fulfill({json:{items:[],total:0}});
});
const test = async (name, fn) => {
    if (process.env.EXPORT_TEST_FILTER && !name.includes(process.env.EXPORT_TEST_FILTER)) return;
    try { await fn(); results.push({name,passed:true}); console.log(`PASS ${name}`); }
    catch (error) { results.push({name,passed:false,error:error.stack}); console.error(`FAIL ${name}: ${error.message}`); await page.screenshot({path:join(output, `${results.length}-failure.png`)}); await page.keyboard.press('Escape'); }
};
const setup = async (modern=false) => {
    await page.goto(`${origin}/c/fixture${modern ? '?fixture=modern' : ''}`);
    await page.locator('#outline-tab').waitFor({state:'visible'});
    await page.evaluate(() => {
        const files = {engine:'/content-scripts/dist/chatgpt-exporter.js',zip:'/libs/jszip.min.js'};
        chrome.runtime.sendMessage = (message, callback) => {
            const script = document.createElement('script'); script.src=files[message.dependency || 'engine'];
            script.onload=() => callback({ok:true}); script.onerror=() => callback({ok:false,error:'fixture injection failure'}); document.head.append(script);
        };
    });
    if (!modern) await page.evaluate(html => { document.querySelector('#fixture-messages').innerHTML=html; }, `<article><div data-message-author-role="user" data-message-id="u1"><p>请解释架构</p></div></article><article><div data-message-author-role="assistant" data-message-id="a1"><div class="markdown"><h2>架构与验证</h2><p>这是中文导出测试。第一段内容，第二段内容。</p><table><tr><th>项目</th><th>结果</th></tr><tr><td>测试</td><td>通过</td></tr></table><pre><code>const answer = 42;</code></pre>${katex.renderToString('C_n=\\frac{1}{n+1}\\binom{2n}{n}',{displayMode:true})}<p>图片与公式应完整保留。</p><img alt="测试色块" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY9sAAAAASUVORK5CYII="></div></div></article>`);
    await page.locator('.gh-msg-select-check').first().waitFor();
};
const openImage = async () => { await page.locator('#export-tab').click(); await page.getByRole('button',{name:'导出图片',exact:true}).click(); await page.getByRole('button',{name:'保存图片',exact:true}).waitFor(); await page.waitForFunction(() => !document.querySelector('.gh-image-dialog .Button.green')?.disabled); };
const save = async name => {
    const promise = page.waitForEvent('download',{timeout:30000}); await page.getByRole('button',{name:'保存图片',exact:true}).click();
    const download = await promise; const path=join(output,name); await download.saveAs(path); return {bytes:await readFile(path),name:download.suggestedFilename(),path};
};
try {
    await test('export starts cold, selection snapshots are chronological and survive node replacement',async()=>{
        await setup();
        assert.equal(await page.evaluate(()=>Boolean(window.html2canvas || window.JSZip || window.__MY_EXT__.exporter)),false);
        await page.locator('.gh-msg-select-check').nth(1).click(); await page.locator('.gh-msg-select-check').nth(0).click();
        const selectedDownload=page.waitForEvent('download');await page.locator('.gh-msg-select-toolbar').getByRole('button',{name:'JSON',exact:true}).click();
        const selectedJson=JSON.parse(await readFile(await (await selectedDownload).path(),'utf8'));assert.deepEqual(selectedJson.messages.map(message=>message.role),['user','assistant']);
        await page.evaluate(()=>{ const node=document.querySelector('[data-message-id="a1"]'); const clone=node.cloneNode(true);clone.querySelector('.gh-msg-select-check').remove();node.replaceWith(clone); });
        await page.locator('[data-message-id="a1"] .gh-msg-select-check[aria-pressed="true"]').waitFor();
        await page.locator('[data-message-id="a1"] .gh-msg-select-check').click();
        assert.equal(await page.locator('.gh-msg-select-check[aria-pressed="true"]').count(),1);
    });
    await test('modern messages use the shared adapter and image preview includes only checked messages',async()=>{
        await setup(true); assert.equal(await page.locator('.gh-msg-select-check').count(),3);
        await page.locator('.gh-msg-select-check').nth(2).click(); await openImage();
        assert.equal(await page.locator('.gh-image-message-list input:checked').count(),1);
        assert.equal(await page.frameLocator('iframe[title="图片预览"]').locator('article').count(),1);
        assert.equal(await page.evaluate(()=>Boolean(window.html2canvas || window.JSZip)),false);
        await page.keyboard.press('Escape');
    });
    await test('PNG preserves formulas, table and code without changing host content or scrolling',async()=>{
        await setup(); await openImage();
        const preview=page.frameLocator('iframe[title="图片预览"]');
        assert.equal(await preview.locator('.katex').count(),1); assert.equal(await preview.locator('table').count(),1); assert.equal(await preview.locator('pre').count(),1);
        await preview.locator('.katex-display').screenshot({path:join(output,'formula-preview.png')});
        const before=await page.locator('#fixture-messages').innerHTML(); const top=await page.locator('#fixture-scroll').evaluate(node=>node.scrollTop);
        const result=await save('selected-messages.png');
        assert.equal(result.bytes.subarray(1,4).toString(),'PNG'); assert.equal(result.bytes.readUInt32BE(16),1536); assert.ok(result.bytes.length>15000);
        assert.equal(await page.locator('#fixture-messages').innerHTML(),before); assert.equal(await page.locator('#fixture-scroll').evaluate(node=>node.scrollTop),top);
        assert.equal(await page.evaluate(()=>Boolean(window.html2canvas)),false); assert.equal(await page.evaluate(()=>Boolean(window.JSZip)),false);
        await page.screenshot({path:join(output,'image-preview-desktop.png')});
        await page.keyboard.press('Escape');
    });
    await test('JPEG is genuinely encoded as JPEG and large exports become numbered PNG pages',async()=>{
        await setup(); await openImage(); await page.getByLabel('格式',{exact:true}).selectOption('jpeg'); await page.getByLabel('清晰度',{exact:true}).selectOption('1');
        const jpeg=await save('selected-messages.jpg'); assert.equal(jpeg.bytes.readUInt16BE(0),0xffd8); assert.match(jpeg.name,/\.jpg$/);
        await page.keyboard.press('Escape');
        await page.evaluate(()=>{ document.querySelector('.markdown').insertAdjacentHTML('beforeend','<p>分页内容必须完整，不能截断或重复。</p>'.repeat(120)); });
        await openImage(); await page.getByLabel('清晰度',{exact:true}).selectOption('1');
        const result=await save('paged-messages.zip'); assert.match(result.name,/\.zip$/); const zip=await JSZip.loadAsync(result.bytes); const names=Object.keys(zip.files); assert.ok(names.length>=2);
        assert.ok(names.every((name,index)=>name.startsWith(String(index+1).padStart(3,'0')+'-')));
        for(const name of names){const bytes=await zip.file(name).async('nodebuffer');assert.equal(bytes.subarray(1,4).toString(),'PNG');assert.ok(bytes.readUInt32BE(20)<=2400);const colors=await page.evaluate(async base64=>{const image=new Image();image.src='data:image/png;base64,'+base64;await image.decode();const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;const colors=new Set();for(let i=0;i<data.length;i+=16)colors.add([data[i],data[i+1],data[i+2],data[i+3]].join(','));return colors.size;},bytes.toString('base64'));assert.ok(colors>20,`Page ${name} must contain rendered text, not a blank canvas`);if(name===names.at(-1))await writeFile(join(output,'last-page.png'),bytes);}
        await page.keyboard.press('Escape');
    });
    await test('empty selection disables saving; a cancelled renderer never starts a download',async()=>{
        await setup(); await openImage(); await page.getByRole('button',{name:'清空',exact:true}).click(); assert.equal(await page.getByRole('button',{name:'保存图片',exact:true}).isDisabled(),true);
        await page.getByRole('button',{name:'全选',exact:true}).click(); await page.waitForFunction(()=>!document.querySelector('.gh-image-dialog .Button.green').disabled);
        let downloads=0;const onDownload=()=>downloads++;page.on('download',onDownload);
        await page.evaluate(()=>{ const original=Image.prototype.decode; Image.prototype.decode=async function(){if(this.src.startsWith('data:image/svg'))await new Promise(resolve=>setTimeout(resolve,400));return original.call(this);}; });
        await page.getByRole('button',{name:'保存图片',exact:true}).click(); await page.getByRole('button',{name:'取消',exact:true}).click(); await page.waitForTimeout(500); assert.equal(downloads,0);page.off('download',onDownload);
    });
    await test('outline click keeps exact highlight at constrained bottom and after same-title replacement',async()=>{
        await setup(true);await page.locator('#outline-tab').click();
        const last=page.locator('.outline-item').last();const id=await last.getAttribute('data-outline-id');await last.click();
        await page.waitForTimeout(1400);assert.equal(await page.locator('.outline-item[aria-current="location"]').getAttribute('data-outline-id'),id);
        await page.evaluate(()=>{const heading=document.querySelector('#modern-second-heading');heading.replaceWith(heading.cloneNode(true));});await page.waitForTimeout(1200);
        await page.locator('.outline-item').filter({hasText:'新版滚动与大纲'}).click();await page.waitForTimeout(1400);
        assert.match(await page.locator('.outline-item[aria-current="location"]').innerText(),/新版滚动与大纲/);
        await page.locator('.thread-scroll-container').evaluate(node=>node.scrollTo({top:0,behavior:'instant'}));
        await page.waitForFunction(()=>document.querySelector('.outline-item[aria-current="location"]')?.textContent.includes('请解释新版结构'));
        assert.notEqual(await page.locator('.outline-item[aria-current="location"]').getAttribute('data-outline-id'),id);
    });
    await test('image dialog fits narrow viewport and export portals are released on route change',async()=>{
        await setup();await page.setViewportSize({width:440,height:900});await openImage();
        const box=await page.locator('.gh-image-dialog').boundingBox();assert.ok(box.x>=0 && box.x+box.width<=441);assert.ok(box.y>=0 && box.y+box.height<=901);
        await page.screenshot({path:join(output,'image-preview-mobile.png')});
        await page.evaluate(()=>{history.pushState({},'', '/c/other');window.dispatchEvent(new PopStateEvent('popstate'));});
        await page.locator('.gh-image-dialog').waitFor({state:'detached'});assert.equal(await page.locator('.gh-msg-select-check[aria-pressed="true"]').count(),0);
        await page.locator('#prompts-tab').click();assert.equal(await page.locator('.gh-export-portal').count(),0);await page.setViewportSize({width:1440,height:1000});
    });
    await test('export settings and batch dialogs open through keyboard buttons; local exports remain immutable',async()=>{
        await setup();await page.locator('#export-tab').click();await page.getByRole('button',{name:'导出设置',exact:true}).waitFor();await page.screenshot({path:join(output,'export-sidebar.png')});await page.getByRole('button',{name:'导出设置',exact:true}).press('Enter');await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
        await page.getByRole('button',{name:'批量导出',exact:true}).click();await page.getByLabel('来源',{exact:true}).selectOption('Local');
        await page.locator('input[type=file]').setInputFiles({name:'conversations.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify([conversation()]))});
        await page.locator('.gh-batch-row input').check();
        const exportOnce=async()=>{const promise=page.waitForEvent('download');await page.getByRole('button',{name:'导出',exact:true}).click();const download=await promise;const zip=await JSZip.loadAsync(await readFile(await download.path()));return zip.file(Object.keys(zip.files)[0]).async('string');};
        const first=await exportOnce();const second=await exportOnce();assert.equal(first,second);assert.equal(first.match(/第二段/g)?.length,1);await page.keyboard.press('Escape');
    });
    await test('malformed conversation cycles fail visibly without downloading or locking the dialog',async()=>{
        await setup();await page.locator('#export-tab').click();await page.getByRole('button',{name:'批量导出',exact:true}).click();await page.getByLabel('来源',{exact:true}).selectOption('Local');
        const invalid=conversation();invalid.mapping.a1.parent='a2';await page.locator('input[type=file]').setInputFiles({name:'cycle.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify([invalid]))});
        await page.locator('.gh-batch-row input').check();await page.getByRole('button',{name:'导出',exact:true}).click();await page.getByRole('alert').filter({hasText:'cyclic'}).waitFor();assert.equal(await page.getByRole('button',{name:'导出',exact:true}).isEnabled(),true);await page.keyboard.press('Escape');
    });
    await test('project pagination uses opaque cursors and never repeats the first page',async()=>{
        await setup();
        await page.route('**/backend-api/gizmos/**',route=>{
            const url=new URL(route.request().url());
            if(url.pathname.endsWith('/sidebar'))return route.fulfill({json:{items:[{gizmo:{gizmo:{id:'project-one',display:{name:'游标项目'}}}}],cursor:null}});
            if(url.pathname.endsWith('/conversations'))return route.fulfill({json:url.searchParams.get('cursor')==='opaque-next' ? {items:[{id:'p2',title:'第二页会话'}],cursor:null} : {items:[{id:'p1',title:'第一页会话'}],cursor:'opaque-next'}});
            return route.fallback();
        });
        await page.locator('#export-tab').click();await page.getByRole('button',{name:'批量导出',exact:true}).click();
        await page.getByLabel('项目',{exact:true}).selectOption('project-one');await page.getByText('第一页会话',{exact:true}).waitFor();await page.getByRole('button',{name:'加载更多',exact:true}).click();await page.getByText('第二页会话',{exact:true}).waitFor();
        assert.equal(await page.locator('.gh-batch-row').count(),2);assert.equal(await page.getByRole('button',{name:'加载更多',exact:true}).count(),0);await page.keyboard.press('Escape');await page.unroute('**/backend-api/gizmos/**');
    });
    await test('current export renews an expired session once and retains all conversation text',async()=>{
        await setup();let calls=0;
        await page.route('**/backend-api/conversation/fixture',route=>++calls===1?route.fulfill({status:401,json:{error:'expired'}}):route.fulfill({json:conversation()}));
        await page.locator('#export-tab').click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Markdown',exact:true}).click();
        const content=await readFile(await (await download).path(),'utf8');assert.match(content,/第一段/);assert.match(content,/第二段/);assert.equal(calls,2);await page.unroute('**/backend-api/conversation/fixture');
    });
    await test('export styles stay scoped, light mode remains readable, and the supplied author image loads',async()=>{
        await setup();
        const before=await page.locator('.markdown p').first().evaluate(node=>({color:getComputedStyle(node).color,font:getComputedStyle(node).font}));
        await page.locator('#export-tab').click();await page.getByRole('button',{name:'导出图片',exact:true}).waitFor();
        assert.deepEqual(await page.locator('.markdown p').first().evaluate(node=>({color:getComputedStyle(node).color,font:getComputedStyle(node).font})),before);
        await page.getByRole('button',{name:'导出图片',exact:true}).click();await page.getByLabel('外观',{exact:true}).selectOption('light');await page.waitForFunction(()=>!document.querySelector('.gh-image-dialog .Button.green').disabled);
        const png=await save('selected-messages-light.png');assert.ok(png.bytes.length>15000);await page.screenshot({path:join(output,'image-preview-light.png')});await page.keyboard.press('Escape');
        await page.locator('#chatgpt-helper-settings-btn').click();await page.locator('.chatgpt-helper-about-btn').click();await page.locator('.chatgpt-helper-about-avatar img').evaluate(image=>image.decode());assert.equal(await page.locator('.chatgpt-helper-about-avatar img').evaluate(image=>image.naturalWidth),2048);
        await page.screenshot({path:join(output,'about-avatar.png')});await page.keyboard.press('Escape');
    });
    await test('no export runtime errors',async()=>assert.deepEqual(errors,[]));
} finally {
    await writeFile(join(output,'results.json'),JSON.stringify({results,errors,loads},null,2));console.log(`Export artifacts: ${output}`);await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));
}
if(results.some(result=>!result.passed))process.exitCode=1;
