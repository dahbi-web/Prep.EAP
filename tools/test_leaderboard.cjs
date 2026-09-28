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

function today() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function progress() {
  return {v:2,xp:1680,day:today(),xpDay:180,streak:4,lastDay:today(),best:7,hearts:5,heartTs:Date.now(),goal:50,
    contestDate:'2026-10-10',planStart:'2026-09-10',homeMode:'auto',sound:false,theme:'light',fontScale:'normal',unlimited:true,hl:true,
    units:{},srs:{},exams:[],sessions:[],lastRoute:'',hist:{},seen:{},sns3047Migrated:true,
    profile:{displayName:'',diploma:'',target:''}};
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/#/league`;
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors = [];
  try {
    const context = await browser.newContext({viewport:{width:320,height:844}, serviceWorkers:'block'});
    await context.route(/https:\/\//, route => route.abort());
    await context.addInitScript(value => {
      localStorage.setItem('cnc_anass_v2', JSON.stringify(value));
      localStorage.setItem('prepme_analytics_consent', 'denied');
    }, progress());
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    for (let pass = 0; pass < 4; pass += 1) {
      const contributionLater = page.locator('#contributionWelcome .contribution-later');
      const profileLater = page.locator('#profileWelcome .contribution-later');
      if (await contributionLater.count() && await contributionLater.isVisible()) await contributionLater.click();
      if (await profileLater.count() && await profileLater.isVisible()) await profileLater.click();
      await page.waitForTimeout(150);
    }

    const initial = await page.evaluate(() => ({
      title: document.querySelector('.topbar .ttl')?.textContent,
      rows: document.querySelectorAll('.league-row').length,
      me: document.querySelector('.league-row.me')?.textContent.replace(/\s+/g, ' ').trim(),
      disclosure: document.querySelector('.league-disclosure')?.textContent,
      nav: !!document.querySelector('.nav [data-go="league"][aria-current="page"]'),
      overflow: document.documentElement.scrollWidth > innerWidth + 1
    }));
    assert.equal(initial.title, 'Classement');
    assert.equal(initial.rows, 10);
    assert.match(initial.me, /180 XP/);
    assert.match(initial.disclosure, /simulation d’entraînement/);
    assert.equal(initial.nav, true);
    assert.equal(initial.overflow, false);

    await page.locator('#leagueName').fill('Anass');
    await page.locator('#leagueDiploma').selectOption('Infirmier(ère)');
    await page.locator('#leagueTarget').selectOption('Concours de spécialité');
    await page.locator('#leagueProfileForm button[type="submit"]').click();
    await page.waitForTimeout(250);
    const saved = await page.evaluate(() => ({
      row: document.querySelector('.league-row.me')?.textContent.replace(/\s+/g, ' ').trim(),
      profile: JSON.parse(localStorage.getItem('cnc_anass_v2')).profile,
      name: document.querySelector('#leagueName')?.value
    }));
    assert.match(saved.row, /Anass/);
    assert.deepEqual(saved.profile, {displayName:'Anass',diploma:'Infirmier(ère)',target:'Concours de spécialité'});
    assert.equal(saved.name, 'Anass');

    await page.waitForTimeout(2400);
    await page.screenshot({path:path.resolve(root, '../tmp/leaderboard-mobile.png'), fullPage:true});
    await page.locator('[data-act="quick5"]').click();
    assert.equal(await page.locator('.qbar').count(), 1);
    assert.match(await page.locator('.qbar .pill').textContent(), /1\/5/);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ok:true,initial,saved,quiz:'1/5',errors}, null, 2));
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
