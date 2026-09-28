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
  const now = new Date(), contest = new Date(now);
  contest.setDate(contest.getDate() + 12);
  const testDay = localDate(now), contestDate = localDate(contest);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const errors = [];
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}, serviceWorkers:'block'});
    await context.route(/https:\/\//, route => route.abort());
    await context.addInitScript(({testDay, contestDate}) => {
      if (sessionStorage.getItem('auto_plan_test_seeded')) return;
      sessionStorage.setItem('auto_plan_test_seeded', '1');
      localStorage.setItem('prepme_analytics_consent', 'denied');
      localStorage.setItem('prepme_profile_prompt_seen', '1');
      localStorage.setItem('cnc_anass_v2', JSON.stringify({
        v:2,xp:0,day:testDay,xpDay:0,streak:0,lastDay:null,best:0,hearts:5,heartTs:Date.now(),goal:50,
        contestDate,planStart:testDay,homeMode:'auto',sound:false,theme:'light',fontScale:'normal',unlimited:true,hl:true,
        units:{},srs:{},exams:[],sessions:[],lastRoute:'',hist:{},seen:{},sns3047Migrated:true
      }));
    }, {testDay, contestDate});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/#/home`);
    const welcome = page.locator('#contributionWelcome .contribution-later');
    if (await welcome.count()) await welcome.click();
    await page.waitForSelector('.auto-plan-card');
    const initial = await page.evaluate(() => ({
      tasks: document.querySelectorAll('.auto-task').length,
      title: document.querySelector('#auto-plan-title')?.textContent || '',
      primary: document.querySelector('.auto-plan-primary')?.textContent || '',
      reasons: document.querySelectorAll('.auto-task details').length,
      stored: JSON.parse(localStorage.getItem('cnc_anass_v2'))
    }));
    assert.ok(initial.tasks >= 1);
    assert.match(initial.title, /plan utile/i);
    assert.match(initial.primary, /session recommandée/i);
    assert.equal(initial.reasons, initial.tasks);
    assert.ok(initial.stored.autoPlan);
    assert.ok(Array.isArray(initial.stored.tasks));

    const completedUnit = initial.stored.tasks.find(task => task.docId);
    assert.ok(completedUnit);
    const previousType = completedUnit.type === 'learn' ? 'qcm' : 'learn';
    await page.waitForTimeout(200);
    await page.evaluate(({task, previousType, testDay}) => {
      const state = JSON.parse(localStorage.getItem('cnc_anass_v2'));
      state.reviewLog = [{date:testDay, taskId:`auto-${testDay}-${previousType}-${task.docId}-${task.unitIndex}`, type:previousType, score:70}];
      state.autoPlan.lastGenerated = null;
      localStorage.setItem('cnc_anass_v2', JSON.stringify(state));
    }, {task:completedUnit, previousType, testDay});
    await page.reload();
    await page.waitForSelector('.auto-plan-card');
    const welcomeAgain = page.locator('#contributionWelcome .contribution-later');
    if (await welcomeAgain.count()) await welcomeAgain.click();
    await page.waitForTimeout(200);
    const replanned = await page.evaluate(() => JSON.parse(localStorage.getItem('cnc_anass_v2')).tasks);
    assert.ok(replanned.length >= 1);
    assert.ok(replanned.every(task => task.docId !== completedUnit.docId || task.unitIndex !== completedUnit.unitIndex),
      'une unité terminée ne doit pas revenir sous un autre type de tâche');

    await page.locator('[data-act="preferQcm"]').click();
    await page.waitForTimeout(180);
    const focused = await page.evaluate(() => ({
      focus: JSON.parse(localStorage.getItem('cnc_anass_v2')).autoPlan.focus,
      first: document.querySelector('.auto-task-copy b')?.textContent || ''
    }));
    assert.equal(focused.focus, 'qcm');
    assert.match(focused.first, /QCM|erreurs/i);

    await page.selectOption('#autoDailyMinutes', '30');
    await page.waitForTimeout(180);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('cnc_anass_v2')).autoPlan.dailyMinutes), 30);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    await page.locator('.auto-plan-primary').click();
    for (let guard = 0; guard < 25 && await page.locator('.qtext').count(); guard++) {
      await page.locator('.opt').first().click();
      await page.locator('#next').click();
    }
    await page.waitForTimeout(180);
    const afterSession = await page.evaluate(() => JSON.parse(localStorage.getItem('cnc_anass_v2')));
    assert.ok(afterSession.reviewLog.length >= 1);
    assert.equal(afterSession.autoPlan.lastGenerated, testDay);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ok:true, initial:{tasks:initial.tasks,title:initial.title}, focused, completed:afterSession.reviewLog.length}, null, 2));
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
