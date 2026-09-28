const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.pdf':'application/pdf'};
const server = http.createServer((req, res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
  catch { res.writeHead(400).end(); return; }
  if (file === root) file = path.join(root, 'index.html');
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors = [];
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}, serviceWorkers:'block'});
    await context.route(/https:\/\//, route => route.abort());
    await context.addInitScript(() => {
      localStorage.setItem('prepme_analytics_consent', 'denied');
      localStorage.setItem('cnc_anass_v2', JSON.stringify({
        v:2,xp:0,day:'2026-09-23',xpDay:0,streak:0,lastDay:null,best:0,hearts:5,heartTs:Date.now(),goal:50,
        contestDate:'2026-10-10',planStart:'2026-09-10',homeMode:'manual',sound:false,theme:'light',fontScale:'normal',unlimited:false,hl:true,
        units:{},srs:{},exams:[],sessions:[],lastRoute:'',hist:{},seen:{},sns3047Migrated:true
      }));
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/#/home`);
    while (await page.locator('.contribution-later:visible').count()) await page.locator('.contribution-later:visible').first().click();
    const state = await page.evaluate(() => ({
      courses: document.querySelectorAll('.home-course').length,
      qcmButtons: document.querySelectorAll('.home-course-actions .qcm').length,
      pseudoCourses: [...document.querySelectorAll('.home-course .t')].filter(x => /QCM 2017|QCM 4|Annales des concours|Concours IDE/.test(x.textContent)).length,
      hero: document.querySelector('.hero .sub')?.textContent || '',
      firstQcmRoute: document.querySelector('.home-course-actions .qcm')?.getAttribute('data-go') || '',
      overflow: document.documentElement.scrollWidth > innerWidth + 1
    }));
    assert.equal(state.courses, 31);
    assert.ok(state.qcmButtons > 0);
    assert.equal(state.pseudoCourses, 0);
    assert.match(state.hero, /31 cours ciblés avec leurs QCM/);
    assert.match(state.firstQcmRoute, /^quiz\/\d+\/all$/);
    assert.equal(state.overflow, false);
    await page.locator('.home-course-actions .qcm').first().click();
    await page.waitForTimeout(150);
    assert.ok(await page.locator('.qtext').count());
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ok:true, state, errors}, null, 2));
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
