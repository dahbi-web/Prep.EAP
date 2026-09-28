const { chromium } = require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');

(async () => {
  const baseUrl = process.env.PREP_URL || 'http://127.0.0.1:8767';
  const profile = `C:/Users/hp/Downloads/CNC 26 ANASS-20260729T200151Z-1-001/.chrome-audit-pw-${Date.now()}`;
  const context = await chromium.launchPersistentContext(profile, {
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
    timeout: 10000,
  });
  const page = await context.newPage({ viewport: { width: 390, height: 844 } });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('prepme_analytics_consent', 'denied'));
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${baseUrl}/#/concours`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  for (let pass = 0; pass < 4; pass += 1) {
    const continueButton = page.locator('#contributionWelcome .contribution-later');
    const profileLaterButton = page.locator('#profileWelcome .contribution-later');
    if (await continueButton.count() && await continueButton.isVisible()) await continueButton.click();
    if (await profileLaterButton.count() && await profileLaterButton.isVisible()) await profileLaterButton.click();
    await page.waitForTimeout(250);
  }
  const initial = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent || '',
    count: document.querySelector('.concours-count')?.textContent || '',
    options: [...document.querySelectorAll('[data-concours-category]')].map((x) => x.textContent.trim()),
    localStorage: !!localStorage.getItem('cnc_anass_v2'),
    overflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    overflowElements: [...document.querySelectorAll('*')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.right > window.innerWidth + 1 || r.left < -1;
    }).slice(0, 10).map((el) => ({ tag: el.tagName, className: el.className, right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width) })),
    items: document.querySelectorAll('.concours-item').length,
    sw: !!navigator.serviceWorker,
    welcome: document.querySelector('#contributionWelcome')?.outerHTML.slice(0, 4000) || '',
  }));
  if (process.env.AUDIT_SCREENSHOT === '1') {
    await page.screenshot({ path: require('node:path').resolve(__dirname, 'concours-mobile.png'), fullPage: true });
    await page.setViewportSize({ width: 1180, height: 900 });
    await page.screenshot({ path: require('node:path').resolve(__dirname, 'concours-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
  }
  console.log('INITIAL_STATE', JSON.stringify(initial, null, 2));
  await page.locator('[data-concours-category="EAP / échelle 11"]').click();
  await page.waitForTimeout(250);
  const eap = await page.evaluate(() => ({
    count: document.querySelectorAll('.concours-item').length,
    text: document.querySelector('.concours-count')?.textContent || '',
  }));
  await page.fill('#concoursSearch', '2015');
  await page.waitForTimeout(350);
  const search = await page.evaluate(() => ({
    count: document.querySelectorAll('.concours-item').length,
    hasPptx: document.querySelector('.concours-item h3')?.textContent.includes('qcm-echelle-11-2015-corrige') || false,
    downloadHref: document.querySelector('a[download][href*="qcm-echelle-11-2015-corrige"]')?.getAttribute('href') || '',
  }));
  const pptxResponse = await page.request.get(`${baseUrl}/${search.downloadHref}`);
  const pptxDownload = { status: pptxResponse.status(), contentType: pptxResponse.headers()['content-type'] || '', bytes: (await pptxResponse.body()).length };
  await page.fill('#concoursSearch', '1re épreuve cadre');
  await page.waitForTimeout(350);
  const eap2023 = await page.evaluate(() => ({
    count: document.querySelectorAll('.concours-item').length,
    title: document.querySelector('.concours-item h3')?.textContent || '',
    unverified: document.body.innerText.includes('Sujet seul'),
  }));
  const eap2023Open = page.locator('.concours-item button[data-go^="concourspdf/"]').first();
  if (await eap2023Open.count()) {
    await eap2023Open.click();
    await page.waitForTimeout(1200);
    eap2023.reader = await page.evaluate(() => !!document.querySelector('.pdf-reader'));
  }
  await page.goto(`${baseUrl}/#/concours`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.fill('#concoursSearch', '');
  await page.waitForTimeout(250);
  const first = page.locator('.concours-item button[data-go^="concourspdf/"]').first();
  const hasPdf = await first.count();
  let pdf = { hasPdf };
  if (hasPdf) {
    await first.click();
    await page.waitForTimeout(1800);
    pdf = await page.evaluate(() => ({
      reader: !!document.querySelector('.pdf-reader'),
      page: document.querySelector('#pdfPage')?.textContent || '',
      status: document.querySelector('#pdfStatus')?.textContent || '',
      canvas: !!document.querySelector('#pdfCanvas'),
    }));
  }
  let standaloneState = { skipped: true };
  let standalonePdfDownload = { available: false, href: '' };
  if (process.env.AUDIT_STANDALONE === '1') {
    const standaloneUrl = pathToFileURL(require('node:path').resolve(__dirname, '..', 'CNC_ANASS_App_MOBILE.html')).href + '#/concours';
    await page.goto(standaloneUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2200);
    for (let pass = 0; pass < 4; pass += 1) {
      const standaloneLater = page.locator('#contributionWelcome .contribution-later');
      const standaloneProfileLater = page.locator('#profileWelcome .contribution-later');
      if (await standaloneLater.count() && await standaloneLater.isVisible()) await standaloneLater.click();
      if (await standaloneProfileLater.count() && await standaloneProfileLater.isVisible()) await standaloneProfileLater.click();
      await page.waitForTimeout(200);
    }
    standaloneState = await page.evaluate(() => ({
      count: document.querySelector('.concours-count')?.textContent || '',
      hasPptx: (window.PREP_CONCOURS_DOCS || []).some((document) => document.file === 'qcm-echelle-11-2015-corrige.pptx'),
      lazyDocuments: !window.PREP_COURSE_PDFS_B64 && !window.CNC_CONCOURS_PDFS_B64,
    }));
    const standalonePdfLink = page.locator('a[data-concours-download]').first();
    if (await standalonePdfLink.count()) {
      const href = await standalonePdfLink.getAttribute('href');
      const localPath = require('node:path').resolve(__dirname, '..', decodeURIComponent(href));
      standalonePdfDownload = { available: require('node:fs').existsSync(localPath), href };
    }
    const standaloneOpen = page.locator('.concours-item button[data-go^="concourspdf/"]').first();
    if (await standaloneOpen.count()) {
      await standaloneOpen.click();
      await page.waitForTimeout(2200);
      standaloneState.reader = await page.evaluate(() => ({
        visible: !!document.querySelector('.pdf-reader, .pdf-native-reader'),
        nativeFrame: !!document.querySelector('.pdf-native-frame'),
        page: document.querySelector('#pdfPage')?.textContent || '',
        status: document.querySelector('#pdfStatus')?.textContent || '',
      }));
    }
  }
  console.log(JSON.stringify({ initial, eap, search, pptxDownload, eap2023, pdf, standaloneState, standalonePdfDownload, errors }, null, 2));
  await context.close();
  require('node:fs').rmSync(profile, { recursive: true, force: true });
  process.exitCode = errors.length ? 1 : 0;
})().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
