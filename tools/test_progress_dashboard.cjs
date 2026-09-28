const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.pdf':'application/pdf','.png':'image/png'};
const server = http.createServer((req, res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
  catch { res.writeHead(400).end(); return; }
  if (file === root) file = path.join(root, 'index.html');
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});

function blankProgress() {
  return {v:2,xp:120,day:'2026-09-23',xpDay:20,streak:2,lastDay:'2026-09-23',best:3,hearts:5,heartTs:Date.now(),goal:50,
    contestDate:'2026-10-10',planStart:'2026-09-10',homeMode:'auto',sound:false,theme:'light',fontScale:'normal',unlimited:false,hl:true,
    units:{},srs:{},exams:[],sessions:[],lastRoute:'',hist:{},seen:{},sns3047Migrated:true};
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/#/stats`;
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors = [];
  try {
    const fresh = await browser.newContext({viewport:{width:320,height:844}, serviceWorkers:'block'});
    await fresh.route(/https:\/\//, route => route.abort());
    await fresh.addInitScript(() => { localStorage.setItem('prepme_analytics_consent', 'denied'); localStorage.setItem('prepme_profile_prompt_seen', '1'); });
    const freshPage = await fresh.newPage(); freshPage.on('pageerror', e => errors.push(e.message));
    await freshPage.goto(url); await freshPage.locator('.contribution-later').click();
    const freshState = await freshPage.evaluate(() => ({
      counts:[...document.querySelectorAll('.progress-state b')].map(x=>+x.textContent),
      chance:document.querySelector('.forecast-score')?.textContent.trim(),
      overflow:document.documentElement.scrollWidth > innerWidth + 1
    }));
    assert.deepEqual(freshState.counts, [0,0,0,299]);
    assert.match(freshState.chance, /^—/); assert.equal(freshState.overflow,false);
    await fresh.close();

    const progress = blankProgress();
    progress.units['1.0']={runs:1,best:90,crowns:1,lesson:1,ok:8,ko:1};
    progress.units['1.1']={runs:1,best:55,crowns:0,lesson:1,ok:4,ko:6};
    progress.units['1.2']={runs:0,best:0,crowns:0,lesson:1,ok:0,ko:0};
    for(let i=0;i<7;i++) progress.sessions.push({date:`2026-09-${String(23-i).padStart(2,'0')}T10:00:00.000Z`,type:'quiz',score:80,correct:8,total:10,secs:300,scope:'Test'});
    const seeded = await browser.newContext({viewport:{width:320,height:844}, serviceWorkers:'block'});
    await seeded.route(/https:\/\//, route => route.abort());
    await seeded.addInitScript(value => { localStorage.setItem('prepme_analytics_consent', 'denied'); localStorage.setItem('prepme_profile_prompt_seen', '1'); localStorage.setItem('cnc_anass_v2', JSON.stringify(value)); }, progress);
    const page = await seeded.newPage(); page.on('pageerror', e => errors.push(e.message));
    await page.goto(url); await page.locator('.contribution-later').click();
    const state = await page.evaluate(() => ({
      counts:[...document.querySelectorAll('.progress-state b')].map(x=>+x.textContent),
      coverage:document.querySelector('.progress-dashboard-head .sub')?.textContent,
      status:document.querySelector('.forecast-status')?.textContent,
      score:document.querySelector('.forecast-score')?.textContent,
      next:document.querySelector('.forecast-card [data-go]')?.getAttribute('data-go'),
      rows:document.querySelectorAll('.priority-row').length,
      overflow:document.documentElement.scrollWidth > innerWidth + 1
    }));
    assert.deepEqual(state.counts, [1,1,1,296]);
    assert.match(state.coverage,/299 unités avec QCM/);
    assert.equal(state.status,'Risque de retard');
    assert.match(state.score,/\d+%/); assert.equal(state.next,'lesson/1/1');
    assert.equal(state.rows,6); assert.equal(state.overflow,false);
    await page.screenshot({path:path.resolve(root,'../tmp/progress-dashboard-mobile.png'),fullPage:true});
    await seeded.close();
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({ok:true,fresh:freshState,seeded:state,errors},null,2));
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode=1; });
