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
    await page.waitForFunction(() => window.PREP_ANALYTICS && document.querySelector('[data-analytics-consent="accept"]'), { timeout: 60000 });
    await page.click('[data-analytics-consent="accept"]');
    await page.waitForFunction(() => window.PREP_ANALYTICS.consentStatus() === 'granted');
    await page.waitForFunction(() => document.querySelector('button[data-go="stats"]'), { timeout: 60000 });
    await page.evaluate(() => document.querySelector('button[data-go="stats"]').click());
    await page.waitForFunction(() => location.hash === '#/stats');
    const result = await page.evaluate(() => {
      const calls = window.dataLayer.map(args => Array.from(args));
      return {
        status: window.PREP_ANALYTICS.status(),
        id: window.PREP_ANALYTICS.measurementId,
        consent: window.PREP_ANALYTICS.consentStatus(),
        consentGranted: calls.some(call => call[0] === 'consent' && call[1] === 'update' && call[2].analytics_storage === 'granted'),
        pages: calls.filter(call => call[0] === 'event' && call[1] === 'page_view').map(call => call[2].page_path),
        uiClicks: calls.filter(call => call[0] === 'event' && call[1] === 'ui_click').length
      };
    });
    assert.equal(tagRequested, true);
    assert.equal(result.status, 'charge');
    assert.equal(result.id, 'G-6JX59N8YQT');
    assert.equal(result.consent, 'granted');
    assert.equal(result.consentGranted, true);
    assert(result.pages.some(value => value.endsWith('#/home')));
    assert(result.pages.some(value => value.endsWith('#/stats')));
    assert(result.uiClicks >= 1);
    console.log(JSON.stringify({ ok: true, tagRequested, ...result }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
