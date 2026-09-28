const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const clean = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (clean === '/' ? '/index.html' : clean));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end('Not found');
    return;
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    let tagRequested = false;
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().startsWith('https://www.googletagmanager.com/gtag/js')) {
        tagRequested = true;
        request.respond({ status: 200, contentType: 'text/javascript', body: 'window.__prepGaTagLoaded=true;' });
      } else request.continue();
    });
    const url = `http://127.0.0.1:${server.address().port}/#/home`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => window.PREP_ANALYTICS && document.querySelector('button[data-go="stats"]'), { timeout: 120000 });
    await page.evaluate(() => document.querySelector('button[data-go="stats"]').click());
    await page.waitForFunction(() => location.hash === '#/stats');
    const result = await page.evaluate(() => {
      const calls = window.dataLayer.map(args => Array.from(args));
      return {
        status: window.PREP_ANALYTICS.status(),
        id: window.PREP_ANALYTICS.measurementId,
        pages: calls.filter(call => call[0] === 'event' && call[1] === 'page_view').map(call => call[2].page_path),
        uiClicks: calls.filter(call => call[0] === 'event' && call[1] === 'ui_click').length
      };
    });
    await page.evaluate(() => {
      window.__trackedEvents = [];
      window.PREP_ANALYTICS.track = (name, parameters) => { window.__trackedEvents.push({ name, parameters }); return true; };
      window.PREP_ANALYTICS.pageView = () => true;
      location.hash = '#/doc/1';
    });
    await page.waitForFunction(() => location.hash === '#/doc/1' && document.querySelector('.node[data-go^="lesson/"]'));
    await page.evaluate(() => { location.hash = '#/lesson/1/0'; });
    await page.waitForFunction(() => location.hash.startsWith('#/lesson/'));
    await page.evaluate(() => { location.hash = '#/quiz/1/0'; });
    await page.waitForFunction(() => location.hash.startsWith('#/quiz/') && document.querySelector('.opt'));
    await page.evaluate(() => document.querySelector('.opt').click());
    await page.waitForFunction(() => window.__trackedEvents.some(event => event.name === 'question_answered'));
    const semanticEvents = await page.evaluate(() => window.__trackedEvents);
    assert.equal(tagRequested, false, 'le developpement local ne doit pas contacter Google Analytics');
    assert.equal(result.status, 'hors_perimetre');
    assert.equal(result.id, 'G-6JX59N8YQT');
    assert.deepEqual(result.pages, []);
    assert.equal(result.uiClicks, 0);
    ['course_open', 'qcm_start', 'question_answered'].forEach(name => {
      assert(semanticEvents.some(event => event.name === name), `evenement ${name} manquant`);
    });
    assert(semanticEvents.some(event => event.name === 'answer_correct' || event.name === 'answer_wrong'));
    console.log(JSON.stringify({ ok: true, tagRequested, ...result, semanticEvents: semanticEvents.map(event => event.name) }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
