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
  const localDate = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const contest = new Date(); contest.setDate(contest.getDate() + 30);
  const contestDate = localDate(contest);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors = [];
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}, serviceWorkers:'block'});
    await context.route(/https:\/\//, route => route.abort());
    await context.addInitScript(() => localStorage.setItem('prepme_analytics_consent', 'denied'));
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForSelector('#profileWelcome');
    assert.equal(await page.locator('.onboarding-step.on').getAttribute('data-step'), '1');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);

    await page.fill('#welcomeProfileName', 'Anass');
    await page.selectOption('#welcomeProfileDiploma', {label:'Infirmier(ère)'});
    await page.selectOption('#welcomeProfileSpecialty', {label:'Urgences et soins intensifs'});
    await page.selectOption('#welcomeProfileTarget', {label:'Concours de spécialité'});
    await page.click('#welcomeNext');
    assert.equal(await page.locator('.onboarding-step.on').getAttribute('data-step'), '2');

    await page.fill('#welcomeContestDate', contestDate);
    await page.locator('input[name="welcomeMinutes"][value="60"]').check({force:true});
    await page.locator('input[name="welcomeScore"][value="90"]').check({force:true});
    await page.uncheck('#welcomeWeekend');
    await page.click('#welcomeNext');
    assert.equal(await page.locator('.onboarding-step.on').getAttribute('data-step'), '3');
    assert.match(await page.locator('#onboardingSummary').textContent(), /60 min \/ jour/);
    assert.match(await page.locator('#onboardingSummary').textContent(), /lundi au vendredi/);
    await page.click('#welcomeFinish');
    await page.waitForSelector('#profileWelcome', {state:'detached'});
    await page.waitForTimeout(250);

    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('cnc_anass_v2')));
    assert.equal(stored.profile.specialty, 'Urgences et soins intensifs');
    assert.equal(stored.profile.target, 'Concours de spécialité');
    assert.equal(stored.contestDate, contestDate);
    assert.equal(stored.autoPlan.dailyMinutes, 60);
    assert.equal(stored.autoPlan.targetScore, 90);
    assert.equal(stored.autoPlan.weekend, false);
    assert.ok(Array.isArray(stored.tasks));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ok:true, specialty:stored.profile.specialty, contestDate, tasks:stored.tasks.length}, null, 2));
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
