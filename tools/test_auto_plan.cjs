const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { chromium } = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const metricsStart = appSource.indexOf('function autoActiveError(');
const metricsEnd = appSource.indexOf('function autoTaskMinutes(', metricsStart);
assert.ok(metricsStart > 0 && metricsEnd > metricsStart);
const metricsContext = {
  S: {units:{'1.0':{runs:1,lastScore:90,ok:90,ko:10}},srs:{},autoPlan:{targetScore:80}},
  today: () => '2026-09-29', uKey: (did, ui) => `${did}.${ui}`,
  qKey: (did, ui, qi) => `q${did}.${ui}.${qi}`, urgencyScore: () => 75,
  cKey: (did, ui, ci) => `c${did}.${ui}.${ci}`,
  dayDiff: (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000)
};
vm.createContext(metricsContext);
vm.runInContext(appSource.slice(metricsStart, metricsEnd), metricsContext);
const sampleUnit = {qs:[{}],cards:[{}]};
const strongRecent = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
assert.equal(metricsContext.chooseAutoTaskType({metrics:strongRecent,unit:sampleUnit}, 'foundation'), 'flashcards');
metricsContext.S.units['1.0'].lastScore = 20;
const weakRecent = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
assert.equal(strongRecent.accuracy, weakRecent.accuracy);
assert.equal(weakRecent.weakness, 80);
assert.ok(weakRecent.priority > strongRecent.priority, 'un échec récent doit augmenter la priorité à réussite cumulée égale');
assert.equal(metricsContext.chooseAutoTaskType({metrics:weakRecent,unit:sampleUnit}, 'foundation'), 'qcm',
  'un dernier score sous la cible doit conduire à une séance QCM');
metricsContext.S.units['1.0'].runs = 0;
assert.equal(metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12).weakness, 10,
  'le score par défaut ne doit pas compter sans séance terminée');
assert.equal(metricsContext.chooseAutoTaskType({metrics:metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12),unit:sampleUnit}, 'foundation'), 'flashcards',
  'sans séance terminée, le score par défaut ne doit pas changer le type de tâche');
metricsContext.S.srs = {'q1.0.0':{due:'2026-09-29',b:2,lap:0}};
const dueToday = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
metricsContext.S.srs['q1.0.0'].due = '2026-09-19';
const overdue = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
assert.equal(dueToday.due, overdue.due);
assert.equal(overdue.oldestDueDays, 10);
assert.equal(overdue.priority - dueToday.priority, 15,
  'une révision en retard doit monter dans le plan, avec un bonus plafonné');
metricsContext.S.srs = {'c1.0.0':{due:'2026-09-29',b:2,lap:0}};
const cardDueToday = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
metricsContext.S.srs['c1.0.0'].due = '2026-09-19';
const cardOverdue = metricsContext.autoUnitMetrics({id:1}, sampleUnit, 0, 12);
assert.equal(cardOverdue.dueCards, 1);
assert.equal(cardOverdue.due, 0);
assert.equal(cardOverdue.unseen, false, 'une carte déjà travaillée rend l’unité connue');
assert.equal(cardOverdue.priority - cardDueToday.priority, 15,
  'une carte en retard doit recevoir le même bonus plafonné qu’un QCM');
assert.equal(metricsContext.chooseAutoTaskType({metrics:cardOverdue,unit:sampleUnit}, 'foundation'), 'flashcards');
metricsContext.S.srs = {};
const cardOnlyUnit = {t:'Unité avec cartes',qs:[],cards:[{}]};
assert.equal(metricsContext.autoAvailableTaskType('qcm', cardOnlyUnit), 'flashcards');
assert.equal(metricsContext.autoAvailableTaskType('review', cardOnlyUnit), 'flashcards');
assert.equal(metricsContext.autoAvailableTaskType('errors', cardOnlyUnit), 'flashcards');
assert.equal(metricsContext.autoAvailableTaskType('learn', cardOnlyUnit), 'learn');
metricsContext.COURSE_DOCS = [{id:1,units:[cardOnlyUnit]}];
metricsContext.S.autoPlan = {targetScore:80,dailyMinutes:30,mode:'review',focus:'balanced',weekend:true};
metricsContext.S.contestDate = '2026-10-04';
metricsContext.getExamPhase = () => 'lastWeek';
metricsContext.dayDiff = () => 5;
metricsContext.CONTEST_DATE = '2026-10-04';
vm.runInContext(appSource.slice(appSource.indexOf('function autoTaskMinutes('), appSource.indexOf('function regenerateAutoPlan(')), metricsContext);
assert.match(metricsContext.autoTaskReason({metrics:cardOverdue,unit:sampleUnit}, 'flashcards', 12), /1 carte à revoir · jusqu’à 10 jours de retard/);
assert.match(metricsContext.autoTaskReason({metrics:overdue,unit:sampleUnit}, 'review', 12), /10 jours de retard/);
const budgetCandidates = [
  {id:'long',type:'learn',docId:1,unitIndex:0,priority:100,estimatedMinutes:20},
  {id:'fits',type:'qcm',docId:2,unitIndex:0,priority:80,estimatedMinutes:12}
];
metricsContext.AUTO_PHASES = {foundation:{mix:{learn:.60,qcm:.15}}};
assert.equal(metricsContext.fillDailyTime(budgetCandidates.slice(), 15, 'foundation').map(task => task.id).join(','), 'fits',
  'le plan de 15 minutes doit choisir une tâche qui tient dans le budget');
assert.deepEqual(metricsContext.fillDailyTime([
  budgetCandidates[0], {id:'shorter',type:'qcm',docId:2,unitIndex:0,priority:60,estimatedMinutes:16}
], 15, 'foundation').map(task => task.id).join(','), 'shorter',
  'si aucune tâche ne tient, le plan doit limiter le dépassement');
metricsContext.S.reviewLog = [{date:'2026-09-29',taskId:'auto-2026-09-29-qcm-3-0',estimatedMinutes:20}];
assert.equal(metricsContext.fillDailyTime([
  {id:'too-long',type:'qcm',docId:2,unitIndex:0,priority:100,estimatedMinutes:12},
  {id:'fits-remaining',type:'qcm',docId:4,unitIndex:0,priority:60,estimatedMinutes:8}
], 30, 'foundation').map(task => task.id).join(','), 'fits-remaining',
  'les séances terminées doivent réduire le budget disponible du jour');
assert.equal(metricsContext.fillDailyTime(budgetCandidates.slice(), 20, 'foundation').length, 0,
  'un budget déjà consommé ne doit pas générer une nouvelle séance');
metricsContext.S.reviewLog = [];
const completionContext = {
  S:{tasks:[{id:'auto-task',type:'qcm',estimatedMinutes:12}],reviewLog:[]},
  today:() => '2026-09-29', regenerateAutoPlan:() => {}
};
vm.createContext(completionContext);
vm.runInContext(appSource.slice(appSource.indexOf('function completeAutoTask('), appSource.indexOf('function dateFr(')), completionContext);
completionContext.completeAutoTask('auto-task', 75);
assert.equal(completionContext.S.reviewLog[0].estimatedMinutes, 12,
  'la durée prévue de la tâche terminée doit être conservée pour les recalculs');
completionContext.completeAutoTask('auto-task', 75);
assert.equal(completionContext.S.reviewLog.length, 1, 'une tâche ne doit pas décompter deux fois le budget');
metricsContext.fillDailyTime = candidates => candidates;
for (const mode of ['review','adaptive']) {
  metricsContext.S.autoPlan.mode = mode;
  const task = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 1);
  assert.equal(task.type, 'flashcards', `le mode ${mode} doit respecter le contenu de l’unité`);
  assert.equal(task.questionCount, 0);
  assert.equal(task.cardCount, 1);
  assert.equal(task.route, 'cards/1/0');
}
const focusedUnit = {t:'Unité de quatre QCM',qs:[{},{},{},{}],cards:[]};
metricsContext.COURSE_DOCS = [{id:2,units:[focusedUnit]}];
metricsContext.S.autoPlan.mode = 'adaptive';
metricsContext.COURSE_DOCS = [{id:1,units:[sampleUnit]}];
metricsContext.S.srs = {'c1.0.0':{due:'2026-09-19',b:2,lap:0}};
let focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 1);
assert.equal(focusedTask.type, 'flashcards', 'le plan adaptatif doit choisir les cartes échues');
metricsContext.S.autoPlan.mode = 'review';
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 1);
assert.equal(focusedTask.type, 'flashcards', 'le mode réviser doit choisir les cartes échues');
metricsContext.S.srs = {};
metricsContext.COURSE_DOCS = [{id:2,units:[focusedUnit]}];
metricsContext.S.autoPlan.mode = 'adaptive';
metricsContext.S.srs = {'q2.0.0':{lap:3,due:'2026-10-05'}};
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.type, 'errors');
assert.equal(focusedTask.questionCount, 1, 'une erreur répétée représente un QCM, pas trois ni toute l’unité');
assert.equal(focusedTask.estimatedMinutes, 5, 'le temps dépend du nombre de QCM ciblés, pas des erreurs cumulées');
metricsContext.S.srs['q2.0.0'].lap = 12;
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.estimatedMinutes, 5, 'répéter une même erreur ne doit pas gonfler le budget quotidien');
metricsContext.S.srs['q2.0.0'].b = 4;
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.type, 'qcm', 'une erreur historique ne doit plus imposer une séance erreurs après maîtrise');
assert.equal(focusedTask.errors, 0);
assert.doesNotMatch(focusedTask.reason, /encore fragile/);
metricsContext.S.srs['q2.0.0'].b = 3;
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.type, 'errors', 'une question ratée au palier 5 descend au palier 3 et reste fragile');
assert.match(focusedTask.reason, /1 question encore fragile/);
metricsContext.S.srs = {'q2.0.0':{lap:12,b:4,due:'2026-10-05'},'q2.0.1':{lap:1,b:2,due:'2026-10-05'}};
metricsContext.S.tasks = [{id:'test-errors',type:'errors',status:'in_progress',docId:2,unitIndex:0,title:focusedUnit.t}];
Object.assign(metricsContext, {
  unit: () => focusedUnit, doc: () => ({id:2}), shuffle: items => items,
  trackQcmStart: () => {}, quizFrame: () => '', navBar: () => '', bind: () => {}, ROOT: {innerHTML:''}
});
vm.runInContext(appSource.slice(appSource.indexOf('function startAutoTask('), appSource.indexOf('/* ------------------------------------------------------------- bindings */')), metricsContext);
metricsContext.continueAutoTask('test-errors');
assert.equal(metricsContext.RUN.items.length, 1, 'la séance erreurs doit servir uniquement les questions encore fragiles');
assert.equal(metricsContext.RUN.items[0].k, 'q2.0.1');
const manyDueUnit = {t:'Nombreux QCM échus',qs:Array.from({length:21}, () => ({})),cards:[]};
metricsContext.unit = () => manyDueUnit;
metricsContext.S.tasks = [{id:'test-review',type:'review',status:'in_progress',docId:2,unitIndex:0,title:manyDueUnit.t}];
metricsContext.S.srs = Object.fromEntries(manyDueUnit.qs.map((_, qi) => [`q2.0.${qi}`, {due:qi === 20 ? '2026-09-19' : '2026-09-29'}]));
metricsContext.continueAutoTask('test-review');
assert.equal(metricsContext.RUN.items.length, 20);
assert.equal(metricsContext.RUN.items[0].k, 'q2.0.20', 'la séance sert d’abord le QCM le plus en retard');
const manyCards = Array.from({length:21}, (_, ci) => ({f:`Face ${ci}`,b:`Verso ${ci}`}));
const cardContext = {
  S:{srs:Object.fromEntries(manyCards.map((_, ci) => [`c2.0.${ci}`, {due:ci === 20 ? '2026-09-19' : '2026-09-29'}])),
    tasks:[{id:'auto-cards',type:'flashcards'}]},
  today:() => '2026-09-29', doc:() => ({id:2}), unit:() => ({cards:manyCards}),
  unitCards:() => manyCards.map((c, ci) => ({c,k:`c2.0.${ci}`,d:2,u:0})),
  activeAutoTaskId:() => 'auto-cards', shuffle:items => items, reviewFrame:() => ''
};
vm.createContext(cardContext);
vm.runInContext(appSource.slice(appSource.indexOf('function vCardsStart('), appSource.indexOf('/* ------------------------------------------------------------ vue EXAMEN */')), cardContext);
cardContext.vCardsStart(2, 0);
assert.equal(cardContext.RUN.items.length, 20);
assert.equal(cardContext.RUN.items[0].k, 'c2.0.20', 'la séance Auto doit servir d’abord la carte la plus en retard');
metricsContext.S.srs = {};
metricsContext.continueAutoTask('test-review');
assert.equal(metricsContext.RUN.items.length, 20, 'une révision devenue obsolète garde une séance de secours');
metricsContext.unit = () => focusedUnit;
metricsContext.S.srs = {'q2.0.0':{lap:0,due:'2026-09-29'}};
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.type, 'review');
assert.equal(focusedTask.questionCount, 1, 'la révision doit annoncer uniquement les QCM échus');
metricsContext.S.srs = {};
focusedTask = metricsContext.generateAutoPlan().tasks.find(item => item.docId === 2);
assert.equal(focusedTask.type, 'qcm');
assert.equal(focusedTask.questionCount, 4, 'un QCM ordinaire conserve le nombre de questions de l’unité');
const mockTask = metricsContext.generateAutoPlan().tasks.find(item => item.type === 'mock_exam');
assert.equal(mockTask.questionCount, 20);
assert.equal(mockTask.estimatedMinutes, 15, '20 QCM chronométrés à 45 secondes doivent réserver 15 minutes');
const mockContext = { S: {tasks:[mockTask]}, EXN:40, save:() => {}, go:route => { mockContext.route = route; } };
vm.createContext(mockContext);
vm.runInContext(appSource.slice(appSource.indexOf('function startAutoTask('), appSource.indexOf('function continueAutoTask(')), mockContext);
mockContext.startAutoTask(mockTask.id);
assert.equal(mockContext.EXN, 20, 'l’examen recommandé doit sélectionner les 20 QCM annoncés');
assert.equal(mockContext.route, '/exam');
metricsContext.COURSE_DOCS = [{id:2,units:[{t:'Unité libre',qs:[{}],cards:[{}]}]}];
metricsContext.S.units = {'2.0':{runs:1,lastScore:95,ok:95,ko:5}};
metricsContext.S.srs = {};
metricsContext.S.reviewLog = [];
metricsContext.S.autoPlan.mode = 'adaptive';
metricsContext.getExamPhase = () => 'foundation';
metricsContext.save = () => {};
vm.runInContext(appSource.slice(appSource.indexOf('function regenerateAutoPlan('), appSource.indexOf('function ensureAutoPlan(')), metricsContext);
vm.runInContext(appSource.slice(appSource.indexOf('function completeAutoTask('), appSource.indexOf('function dateFr(')), metricsContext);
metricsContext.regenerateAutoPlan();
assert.equal(metricsContext.S.tasks[0].type, 'flashcards');
metricsContext.S.units['2.0'].lastScore = 20;
metricsContext.completeAutoTask(null, 20);
assert.equal(metricsContext.S.tasks[0].type, 'qcm', 'une séance libre faible doit actualiser la recommandation du jour');
assert.equal(metricsContext.S.reviewLog.length, 0, 'une séance libre ne doit pas consommer le budget Auto PrepMe');
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
    if (await page.locator('.auto-lesson-next').count()) await page.locator('.auto-lesson-next').click();
    for (let guard = 0; guard < 25 && await page.locator('.qtext').count(); guard++) {
      await page.locator('.opt').first().click();
      await page.locator('#next').click();
    }
    await page.waitForTimeout(180);
    const afterSession = await page.evaluate(() => JSON.parse(localStorage.getItem('cnc_anass_v2')));
    assert.ok(afterSession.reviewLog.length >= 1);
    const recordedMinutes = afterSession.reviewLog.reduce((sum, entry) => sum + (entry.estimatedMinutes || 0), 0);
    assert.ok(recordedMinutes > 0, 'la séance recommandée doit enregistrer sa durée prévue');
    assert.ok(recordedMinutes + afterSession.tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0) <= 30,
      'après la séance, le nouveau plan doit respecter le budget quotidien choisi');
    assert.equal(afterSession.autoPlan.lastGenerated, testDay);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ok:true, initial:{tasks:initial.tasks,title:initial.title}, focused, completed:afterSession.reviewLog.length}, null, 2));
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
