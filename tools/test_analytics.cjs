const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', 'analytics.js'), 'utf8');
const appended = [];
const timers = [];
const context = {
  window: {},
  location: {
    pathname: '/prep/index.html',
    search: '',
    hash: '#/home',
    href: 'https://example.test/prep/index.html#/home'
  },
  document: {
    title: 'PrepMe',
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
assert.equal(appended.length, 1);
assert.match(appended[0].src, /googletagmanager\.com\/gtag\/js\?id=G-6JX59N8YQT$/);

assert.equal(api.pageView(), true);
assert.equal(api.pageView(), false, 'un rendu immediat ne doit pas doubler la page vue');
context.location.hash = '#/stats';
context.location.href = 'https://example.test/prep/index.html#/stats';
assert.equal(api.pageView(), true);
assert.equal(api.track('ui_click', { button_action: 'stats' }), true);

const calls = context.window.dataLayer.map(args => Array.from(args));
assert(calls.some(call => call[0] === 'consent' && call[1] === 'default' && call[2].analytics_storage === 'denied'));
assert(calls.some(call => call[0] === 'config' && call[2].allow_google_signals === false));
const pageViews = calls.filter(call => call[0] === 'event' && call[1] === 'page_view');
assert.equal(pageViews.length, 2);
assert.equal(pageViews[0][2].page_path, '/prep/index.html#/home');
assert.equal(pageViews[1][2].page_path, '/prep/index.html#/stats');
assert(calls.some(call => call[0] === 'event' && call[1] === 'ui_click'));
console.log(JSON.stringify({ ok: true, measurementId: api.measurementId, pageViews: pageViews.length }));
