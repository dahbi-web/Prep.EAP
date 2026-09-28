const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', 'analytics.js'), 'utf8');
const appended = [];
const timers = [];
const storage = new Map();
const meta = { getAttribute(name) { return name === 'content' ? 'G-6JX59N8YQT' : ''; } };
const context = {
  window: {},
  location: {
    protocol: 'https:',
    hostname: 'dahbi-web.github.io',
    pathname: '/Prep.EAP/index.html',
    search: '',
    hash: '#/home',
    href: 'https://dahbi-web.github.io/Prep.EAP/index.html#/home'
  },
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  },
  document: {
    title: 'PrepMe',
    readyState: 'loading',
    body: {},
    querySelector(selector) { return selector === 'meta[name="prepme-ga4-id"]' ? meta : null; },
    getElementById() { return null; },
    addEventListener() {},
    createElement() { return {}; },
    head: { appendChild(node) { appended.push(node); } }
  },
  Date,
  encodeURIComponent,
  setTimeout(fn) { timers.push(fn); return timers.length; }
};
context.window.window = context.window;
context.window.document = context.document;
context.window.location = context.location;
vm.createContext(context);
vm.runInContext(source, context);

const api = context.window.PREP_ANALYTICS;
assert.equal(api.measurementId, 'G-6JX59N8YQT');
assert.equal(api.isProductionPage(), true);
assert.equal(api.consentStatus(), 'pending');
assert.equal(api.status(), 'attente_consentement');
assert.equal(appended.length, 0, 'le tag ne doit pas charger avant consentement');
assert.equal(api.track('ui_click', { button_action: 'stats' }), false);

api.setConsent('granted');
assert.equal(api.consentStatus(), 'granted');
assert.equal(appended.length, 1);
assert.match(appended[0].src, /googletagmanager\.com\/gtag\/js\?id=G-6JX59N8YQT$/);
assert.equal(api.pageView(), false, 'la page initiale vient deja d etre envoyee apres consentement');
context.location.hash = '#/stats';
context.location.href = 'https://dahbi-web.github.io/Prep.EAP/index.html#/stats';
assert.equal(api.pageView(), true);
assert.equal(api.track('ui_click', { button_action: 'stats' }), true);

const calls = context.window.dataLayer.map(args => Array.from(args));
assert(calls.some(call => call[0] === 'consent' && call[1] === 'default' && call[2].analytics_storage === 'denied'));
assert(calls.some(call => call[0] === 'config' && call[2].allow_google_signals === false));
const pageViews = calls.filter(call => call[0] === 'event' && call[1] === 'page_view');
assert.equal(pageViews.length, 2);
assert.equal(pageViews[0][2].page_path, '/Prep.EAP/index.html#/home');
assert.equal(pageViews[1][2].page_path, '/Prep.EAP/index.html#/stats');
assert(calls.some(call => call[0] === 'event' && call[1] === 'app_open'));
assert(calls.some(call => call[0] === 'event' && call[1] === 'ui_click'));
console.log(JSON.stringify({ ok: true, measurementId: api.measurementId, pageViews: pageViews.length }));
