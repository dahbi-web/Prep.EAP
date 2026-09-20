/* Service worker — mise en cache complète pour usage hors-ligne */
var CACHE = 'cnc-anass-v44';
  var APP_VERSION = '3.5.4';
var ASSETS = [
  './', './index.html', './privacy-policy.html', './app.css', './app.js', './manifest.webmanifest',
  './pdfs.js', './vendor/pdf.min.js', './vendor/pdf.worker.min.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  './data/doc01_concours.js',
  './data/doc01.js', './data/doc02.js', './data/doc03.js', './data/doc04.js',
  './data/doc05.js', './data/doc06.js', './data/doc07.js', './data/doc08.js',
  './data/doc16.js', './data/doc26.js', './data/doc31.js',
  './concours-commun/sujet-01.html', './concours-commun/sujet-02.html',
  './concours-commun/sujet-03.html', './concours-commun/sujet-04.html',
  './concours-commun/sujet-05.html', './concours-commun/sujet-06.html',
  './concours-commun/sujet-07.html', './concours-commun/sujet-08.html',
  './concours-commun/sujet-09.html', './concours-commun/sujet-10.html',
  './concours-commun/sujet-11.html', './concours-commun/sujet-12.html',
  './concours-commun/sujet-13.html', './concours-commun/sujet-14.html',
  './concours-commun/sujet-15.html', './concours-commun/sujet-16.html',
  './concours-commun/sujet-17.html', './concours-commun/sujet-18.html',
  './concours-commun/sujet-19.html', './concours-commun/sujet-20.html',
  './concours-commun/sujet-21.html', './concours-commun/sujet-22.html',
  './concours-commun/sujet-23.html', './concours-commun/sujet-24.html',
  './concours-commun/sujet-25.html', './concours-commun/sujet-26.html',
  './concours-commun/sujet-27.html', './concours-commun/sujet-28.html',
  './concours-commun/sujet-29.html', './concours-commun/sujet-30.html',
  './concours-commun/sujet-31.html', './concours-commun/sujet-32.html'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (u) { return c.add(u).catch(function () { }); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('message', function (e) {
  if (!e.data) return;
  if (e.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data.type === 'GET_VERSION' && e.ports && e.ports[0]) {
    e.ports[0].postMessage({ version: APP_VERSION });
  }
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function () { }); });
        return resp;
      }).catch(function () { return caches.match('./index.html'); });
    })
  );
});
