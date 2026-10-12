const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const context = await browser.newContext({viewport:{width:390,height:844},offline:true,acceptDownloads:true});
    await context.addInitScript(() => {
      localStorage.setItem('prepme_profile_prompt_seen','1');
      localStorage.setItem('prepme_analytics_consent','denied');
    });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e=>errors.push(e.message));
    page.on('dialog', dialog=>dialog.accept());
    const url = pathToFileURL(path.resolve(__dirname,'../CNC_ANASS_App_MOBILE.html')).href;
    await page.goto(url+'#/home');
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('cnc_anass_v2'));
      s.homeMode='manual'; s.xp=123;
      s.srs['q1.0.0']={b:2,lap:3,seen:4,due:'2026-01-01'};
      localStorage.setItem('cnc_anass_v2',JSON.stringify(s));
    });
    await page.reload();
    await page.locator('.contribution-later').click();
    for (const [action,count] of [['quick5',5],['quick',10]]) {
      await page.evaluate(()=>{location.hash='/home';});
      await page.locator('[data-act="'+action+'"]').first().click();
      assert.equal(await page.locator('.qbar .xp').textContent(),'1/'+count);
      assert.equal(await page.locator('.qtext').count(),1);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      await page.locator('[data-act="quit"]').click();
    }
    await page.evaluate(()=>{location.hash='/set';});
    const [download]=await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-act="export"]').first().click()
    ]);
    const saved=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
    assert.equal(saved.xp,123);
    assert.equal(saved.srs['q1.0.0'].lap,3);
    const chooserPromise=page.waitForEvent('filechooser');
    await page.locator('[data-act="import"]').click();
    const chooser=await chooserPromise;
    await chooser.setFiles({name:'progression.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
    await page.waitForFunction(()=>!!localStorage.getItem('cnc_anass_v2_before_import'));
    await page.reload();
    const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('cnc_anass_v2')));
    assert.equal(restored.xp,123);
    assert.deepEqual(restored.srs,saved.srs);
    assert.deepEqual(errors,[]);
    console.log('OK : HTML hors ligne, mobile 390 px, séances 5/10, export/import réel, progression persistante, aucune erreur JS.');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
