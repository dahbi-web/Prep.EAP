const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const baseUrl = process.env.PREP_URL || 'http://127.0.0.1:8768';
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => localStorage.setItem('prepme_analytics_consent', 'denied'));
    await page.goto(`${baseUrl}/#/pdf`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    for (let pass = 0; pass < 4; pass += 1) {
      for (const selector of ['#contributionWelcome .contribution-later', '#profileWelcome .contribution-later']) {
        const button = page.locator(selector);
        if (await button.count() && await button.isVisible()) await button.click();
      }
      await page.waitForTimeout(200);
    }
    const cards = await page.locator('.pdf-course').count();
    assert.equal(cards, 76);
    const newCourse = page.locator('.pdf-course').filter({ hasText: '46. CNC Draa Tafilalet' });
    assert.equal(await newCourse.count(), 1);
    assert.equal(await newCourse.locator('button', { hasText: 'Lire le cours' }).count(), 1);
    await page.goto(`${baseUrl}/#/doc/46`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(350);
    assert.match(await page.locator('h1').innerText(), /CNC Draa Tafilalet/);
    assert.equal(await page.locator('.path .node').count(), 9);
    await page.goto(`${baseUrl}/#/lesson/46/1`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(350);
    const body = await page.locator('body').innerText();
    assert.match(body, /transcription OCR du PDF fourni/i);
    assert.match(body, /aucune réponse automatique/i);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ ok: true, coursePdfCards: cards, module46Units: 9, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
