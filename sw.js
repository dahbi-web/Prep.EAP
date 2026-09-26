/* Service worker — mise en cache complète pour usage hors-ligne */
var CACHE = 'cnc-anass-v92';
var APP_VERSION = '3.5.52';
var ASSETS = [
  "./cours-pdf/01- SNS Maroc.pdf",
  "./cours-pdf/02- Réglement Intérieur des Hôpitaux.pdf",
  "./cours-pdf/03- La Loi 08-22 GST.pdf",
  "./cours-pdf/04- Economie de la Santé.pdf",
  "./cours-pdf/05- Indicateurs de la Santé.pdf",
  "./cours-pdf/06- La Loi-Cadre 06-22.pdf",
  "./cours-pdf/07- Epidémiologie.pdf",
  "./cours-pdf/08- La loi 43-13 Exercice des professions infermière.pdf",
  "./cours-pdf/09- OMD et ODD.pdf",
  "./cours-pdf/10- Accident Exposition Au Sang.pdf",
  "./cours-pdf/11- Comptes Nationaux de la Santé 2022.pdf",
  "./cours-pdf/12- Comptes Nationaux de la Santé 2018.pdf",
  "./cours-pdf/13- Lavage Des Mains.pdf",
  "./cours-pdf/14- Maladies à Déclaration Obligatoire.pdf",
  "./cours-pdf/15- Jours internationaux et Fériés.pdf",
  "./cours-pdf/16- Couverture Médicale de Base.pdf",
  "./cours-pdf/17- Projet d_Etablissement Hospitalier.pdf",
  "./cours-pdf/18- Planification Stratégique.pdf",
  "./cours-pdf/19- Gestion et Management de la qualité.pdf",
  "./cours-pdf/20- Santé en chiffres 2018-2023.pdf",
  "./cours-pdf/21- Stratégie Sectorielle 2012-2016.pdf",
  "./cours-pdf/22- Les ALDs et Les ALCs.pdf",
  "./cours-pdf/23- La Loi Cadre 43-09.pdf",
  "./cours-pdf/24- La Loi 28-00 La Gestion Des Déchets.pdf",
  "./cours-pdf/25- La Loi 09-21 La Protection Sociale.pdf",
  "./cours-pdf/26- Le Plan Santé 2025.pdf",
  "./cours-pdf/27- Présentation Des Lois.pdf",
  "./cours-pdf/28- La Lois 07-22 Haute Autorité de la Santé.pdf",
  "./cours-pdf/29- La loi 10-22 Agence Des Médicaments.pdf",
  "./cours-pdf/30- La Loi 11-22 Agence du Sang et Ses Dérivés.pdf",
  "./cours-pdf/31- CS. SROS. CSN. CSR.pdf",
  './', './index.html', './privacy-policy.html', './app.css', './analytics.js', './app.js', './manifest.webmanifest',
  './assets/recrutement-huism6.jpg',
  './pdfs.js', './vendor/pdf.min.js', './vendor/pdf.worker.min.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png', './favicon.ico',
  './data/doc01_concours.js',
  './data/doc01.js', './data/doc02.js', './data/doc03.js', './data/doc04.js',
  './data/doc05.js', './data/doc05_enrichment.js', './data/doc06.js', './data/doc07.js',
  './data/doc08.js', './data/doc08_enrichment.js',
  './data/doc09.js', './data/doc09_enrichment.js', './data/doc09_frontmatter.js', './data/doc10.js', './data/doc10_enrichment.js', './data/doc11.js',
  './data/doc12.js', './data/doc13.js', './data/doc14.js', './data/doc12_13_14_enrichment.js', './data/doc15.js', './data/doc16.js',
  './data/doc15_17_18_enrichment.js', './data/doc17.js', './data/doc18.js', './data/doc19.js', './data/doc20.js', './data/doc21.js',
  './data/doc19_20_21_enrichment.js', './data/doc22.js', './data/doc23.js', './data/doc24.js', './data/doc23_24_enrichment.js', './data/doc25.js', './data/doc26.js',
  './data/doc27.js', './data/doc28.js', './data/doc29.js', './data/doc30.js', './data/doc31.js', './data/doc32.js',
  './data/doc33.js', './data/doc34.js', './data/doc35.js', './data/doc36.js', './data/doc37.js', './data/doc38.js',
  './data/doc39.js', './data/doc40.js', './data/doc41.js', './data/doc42.js', './data/doc43.js', './data/doc44.js', './data/doc45.js',
  './cours-pdf/32- Je prepare - Annales des concours.pdf',
  './cours-pdf/33- EAP - concours-ide-11-1.pdf',
  './cours-pdf/34- EAP - je-prepare-banques-questions.pdf',
  './cours-pdf/35- EAP - preparation-au-concours.pdf',
  './cours-pdf/36- EAP - qcm-17-et-ensp-corrig-elkh.pdf',
  './cours-pdf/37- EAP - qcm-17-et-master-corrig-elkh.pdf',
  './cours-pdf/38- EAP - qcm-2016-corrige-elkh.pdf',
  './cours-pdf/39- EAP - qcm-3-2017-corrig-ELKH.pdf',
  './cours-pdf/40- EAP - qcm-4.pdf',
  './cours-pdf/41- EAP - qcm-commun-corrige-sns.pdf',
  './cours-pdf/42- EAP - qcm-us-corrige.pdf',
  './cours-pdf/43- EAP - decret-2-93-308.pdf',
  './cours-pdf/44- EAP - EXA-CON2.pdf',
  './cours-pdf/45- EAP - STATUINF.pdf',
  './data/content-review.js', './data/concours-catalog.js',
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
function cacheCatalogDocuments(cache) {
  return fetch('./data/concours-catalog.js').then(function (r) { return r.text(); }).then(function (text) {
    var re = /\{"folder":"([^"]+)","file":"([^"]+)"/g, m, urls = [];
    while ((m = re.exec(text))) urls.push('./' + m[1] + '/' + encodeURIComponent(m[2]));
    return cacheOptional(cache, urls);
  }).catch(function () { });
}
// Limiter les téléchargements simultanés sur téléphone.
function cacheOptional(cache, urls) {
  var cursor = 0;
  function next() {
    if (cursor >= urls.length) return Promise.resolve();
    return cache.add(urls[cursor++]).catch(function () { }).then(next);
  }
  return Promise.all([next(), next(), next()]);
}
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    var core = ASSETS.filter(function (u) { return !/\.pdf$/i.test(u); });
    var documents = ASSETS.filter(function (u) { return /\.pdf$/i.test(u); });
    // Une version dont le moteur est incomplet ne doit pas remplacer la précédente.
    return c.addAll(core).then(function () { return cacheOptional(c, documents); }).then(function () { return cacheCatalogDocuments(c); });
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) { return k !== CACHE && k.indexOf('cnc-anass-v') === 0 ? caches.delete(k) : null; }));
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
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  // La version distante ne doit jamais rester figée dans le cache.
  if (/\/(version\.json|sw\.js)$/.test(url.pathname)) return;
  e.respondWith(
    caches.open(CACHE).then(function (cache) { return cache.match(e.request); }).then(function (r) {
      return r || fetch(e.request).then(function (resp) {
        if (!resp || !resp.ok) return resp;
        var copy = resp.clone();
        e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(e.request, copy); }).catch(function () { }));
        return resp;
      }).catch(function () {
        var isDocument = e.request.destination === 'document' || /\.html?$/.test(new URL(e.request.url).pathname);
        return (isDocument ? caches.open(CACHE).then(function (c) { return c.match('./index.html'); }) : Promise.resolve(null)).then(function (fallback) {
          return fallback || new Response('', { status: 503, statusText: 'Offline' });
        });
      });
    })
  );
});
