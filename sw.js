/* Service worker — mise en cache complète pour usage hors-ligne */
var CACHE = 'cnc-anass-v8';
var ASSETS = [
  './', './index.html', './app.css', './app.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  './data/doc01_concours.js',
  './data/doc01.js', './data/doc02.js', './data/doc03.js', './data/doc04.js',
  './data/doc05.js', './data/doc06.js', './data/doc07.js', './data/doc08.js',
  './data/doc16.js', './data/doc26.js', './data/doc31.js'
];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (u) { return c.add(u).catch(function () { }); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
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
