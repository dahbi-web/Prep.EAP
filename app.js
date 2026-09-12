/* ==========================================================================
   Concours de santé — moteur de l'application
   Révision type "Duolingo" pour le concours (licence) — 31 modules
   Aucune dépendance externe. Fonctionne hors-ligne.
   ========================================================================== */
(function () {
"use strict";

/* ------------------------------------------------------------------ data */
var DOCS = (window.CNC_DATA && window.CNC_DATA.docs) || [];
DOCS.sort(function (a, b) { return a.id - b.id; });

// index rapide
var DOC_BY_ID = {};
DOCS.forEach(function (d) {
  DOC_BY_ID[d.id] = d;
  d.units.forEach(function (u, i) { u._d = d.id; u._i = i; u.qs = u.qs || []; u.cards = u.cards || []; });
});
function doc(id) { return DOC_BY_ID[+id]; }
function unit(did, ui) { var d = doc(did); return d && d.units[+ui]; }
function qKey(did, ui, qi) { return 'q' + did + '.' + ui + '.' + qi; }
function cKey(did, ui, ci) { return 'c' + did + '.' + ui + '.' + ci; }
function uKey(did, ui) { return did + '.' + ui; }

function unitCards(did, ui, min) {
  var d = doc(did), u = unit(did, ui); if (!u) return [];
  var out = u.cards.map(function (c, ci) { return { c: c, k: cKey(d.id, ui, ci), d: d.id, u: ui }; });
  min = min || 8;
  if (out.length < min && u.qs.length) {
    var idx = shuffle(u.qs.map(function (_, i) { return i; })).slice(0, min - out.length);
    idx.forEach(function (qi) {
      out.push({ c: qcCard(u.qs[qi]), k: 'cq' + d.id + '.' + ui + '.' + qi, d: d.id, u: ui });
    });
  }
  return out;
}
function qcCard(q) {
  return {
    f: '<div class="sub" style="margin-bottom:8px">D\u2019apr\u00e8s un QCM de l\u2019unit\u00e9</div>' + q.q,
    b: '<div><b>' + q.o[q.c] + '</b></div>' +
      (q.e ? '<div class="sub" style="margin-top:10px;font-weight:400">' + q.e + '</div>' : '')
  };
}
function allQuestions(filterDocId) {
  var out = [];
  DOCS.forEach(function (d) {
    if (filterDocId && d.id !== +filterDocId) return;
    d.units.forEach(function (u, ui) {
      u.qs.forEach(function (q, qi) { out.push({ q: q, k: qKey(d.id, ui, qi), d: d.id, u: ui }); });
    });
  });
  return out;
}
function allCards(filterDocId) {
  var out = [];
  DOCS.forEach(function (d) {
    if (filterDocId && d.id !== +filterDocId) return;
    d.units.forEach(function (u, ui) {
      u.cards.forEach(function (c, ci) { out.push({ c: c, k: cKey(d.id, ui, ci), d: d.id, u: ui }); });
    });
  });
  return out;
}

/* ----------------------------------------------------------------- state */
var KEY = 'cnc_anass_v2';
var HEART_MAX = 5, HEART_MIN = 25;           // 1 cœur toutes les 25 minutes
var CROWN_MAX = 5, CROWN_PCT = 0.8;
var CONTEST_DATE = '2026-10-10';

function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function dayShift(str, n) { var p = str.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function dayDiff(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }

function blank() {
  return {
    v: 2, xp: 0, day: today(), xpDay: 0, streak: 0, lastDay: null, best: 0,
    hearts: HEART_MAX, heartTs: Date.now(),
    goal: 50, sound: true, theme: 'auto', unlimited: false, hl: true,
    units: {}, srs: {}, exams: [], hist: {}, seen: {}
  };
}
var S = load();
var INSTALL_PROMPT = null;
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); INSTALL_PROMPT = e; render(); });
window.addEventListener('appinstalled', function () { INSTALL_PROMPT = null; toast('✅ Application installée hors ligne'); render(); });
function installApp() {
  if (INSTALL_PROMPT) { INSTALL_PROMPT.prompt(); INSTALL_PROMPT.userChoice.then(function () { INSTALL_PROMPT = null; render(); }); }
  else {
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    toast(ios ? 'iPhone/iPad : Partager → Sur l’écran d’accueil → Ajouter' : 'Android : menu ⋮ → Installer l’application ou Ajouter à l’écran d’accueil');
  }
}
function load() {
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    var s = JSON.parse(raw); var b = blank();
    for (var k in b) if (!(k in s)) s[k] = b[k];
    return s;
  } catch (e) { return blank(); }
}
var saveT = null;
function save() { clearTimeout(saveT); saveT = setTimeout(function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }, 120); }

function rollDay() {
  var t = today();
  if (S.day !== t) { S.hist[S.day] = S.xpDay; S.day = t; S.xpDay = 0; save(); }
}
function addXP(n) {
  rollDay();
  S.xp += n; S.xpDay += n;
  if (S.lastDay !== S.day) {
    if (S.lastDay && dayDiff(S.lastDay, S.day) === 1) S.streak++; else S.streak = 1;
    S.lastDay = S.day;
    if (S.streak > S.best) S.best = S.streak;
    toast('🔥 Série : ' + S.streak + ' jour' + (S.streak > 1 ? 's' : ''));
  }
  save();
}
/* --- cœurs --- */
function hearts() {
  if (S.unlimited) return HEART_MAX;
  var gained = Math.floor((Date.now() - (S.heartTs || Date.now())) / (HEART_MIN * 60000));
  if (gained > 0 && S.hearts < HEART_MAX) {
    S.hearts = Math.min(HEART_MAX, S.hearts + gained);
    S.heartTs = Date.now(); save();
  }
  return S.hearts;
}
function loseHeart() {
  if (S.unlimited) return HEART_MAX;
  if (S.hearts === HEART_MAX) S.heartTs = Date.now();
  S.hearts = Math.max(0, S.hearts - 1); save(); return S.hearts;
}
function gainHeart(n) { if (S.unlimited) return; S.hearts = Math.min(HEART_MAX, S.hearts + (n || 1)); save(); }
function heartIn() {
  if (S.hearts >= HEART_MAX) return '';
  var ms = HEART_MIN * 60000 - ((Date.now() - S.heartTs) % (HEART_MIN * 60000));
  var m = Math.floor(ms / 60000), s = Math.floor(ms % 60000 / 1000);
  return m + ':' + pad(s);
}

/* --- progression unité --- */
function ust(did, ui) {
  var k = uKey(did, ui);
  if (!S.units[k]) S.units[k] = { runs: 0, best: 0, crowns: 0, lesson: 0, ok: 0, ko: 0 };
  return S.units[k];
}
function docPct(d) {
  var tot = 0, got = 0;
  d.units.forEach(function (u, i) { tot += CROWN_MAX; got += ust(d.id, i).crowns; });
  return tot ? Math.round(got / tot * 100) : 0;
}
function docStarted(d) { return d.units.some(function (u, i) { return ust(d.id, i).runs > 0 || ust(d.id, i).lesson; }); }
function planInfo() {
  var left = Math.max(0, dayDiff(today(), CONTEST_DATE)), remaining = 0, total = 0, done = 0;
  DOCS.forEach(function (d) { d.units.forEach(function (u, i) { total++; if (ust(d.id, i).crowns >= CROWN_MAX) done++; else remaining++; }); });
  var perDay = left ? Math.ceil(remaining / left) : remaining;
  return { left: left, remaining: remaining, total: total, done: done, perDay: perDay, ahead: done >= Math.max(0, total - Math.ceil(total * left / 30)) };
}
function requestNotifications() {
  if (!('Notification' in window)) { toast('Notifications non disponibles dans ce navigateur'); return; }
  Notification.requestPermission().then(function (p) { S.notify = p === 'granted'; save(); toast(p === 'granted' ? '🔔 Rappels activés' : 'Notifications refusées'); render(); });
}
function dailyReminder() {
  if (S.notify && window.Notification && Notification.permission === 'granted' && S.notifyDay !== today() && S.xpDay < S.goal) {
    var pi = planInfo(); new Notification('Concours de santé · ton concours approche', { body: pi.left + ' jours restants. Vise ' + pi.perDay + ' unité(s) aujourd’hui.' });
    S.notifyDay = today(); save();
  }
}

/* --- SRS : paliers 0-5, intervalles 1 / 3 / 7 / 16 / 35 / 90 jours ---
   Règle : une erreur DESCEND DE 2 PALIERS, elle ne remet jamais à zéro. */
var BOX_IV = [1, 3, 7, 16, 35, 90];
function srs(k) {
  if (!S.srs[k]) S.srs[k] = { b: 0, due: today(), lap: 0, seen: 0 };
  if (S.srs[k].b == null) S.srs[k].b = 0;        // reprise d'une ancienne sauvegarde
  return S.srs[k];
}
function grade(k, g) {                      // g : 0 = raté, 3 dur, 4 bien, 5 facile
  var it = srs(k);
  it.seen = (it.seen || 0) + 1;
  if (g < 3) {
    it.b = Math.max(0, it.b - 2);           // jamais de remise à zéro
    it.lap = (it.lap || 0) + 1;
    it.due = today();                       // repasse dans la séance du jour
  } else if (g === 3) {
    it.due = dayShift(today(), Math.max(1, Math.round(BOX_IV[it.b] / 2)));
  } else {
    it.b = Math.min(5, it.b + (g === 5 ? 2 : 1));
    it.due = dayShift(today(), BOX_IV[it.b]);
  }
  save();
}
/* un item est « têtu » quand il a été raté au moins 3 fois */
function isStubborn(k) { return (S.srs[k] && S.srs[k].lap || 0) >= 3; }
function dueList() {
  var t = today(), out = [];
  for (var k in S.srs) { if (S.srs[k].due <= t) out.push(k); }
  return out;
}
function resolveKey(k) {
  if (k.slice(0, 2) === 'cq') {
    var pq = k.slice(2).split('.'), uq = unit(pq[0], pq[1]); if (!uq) return null;
    var qq = uq.qs[+pq[2]];
    return qq ? { type: 'c', c: qcCard(qq), k: k, d: +pq[0], u: +pq[1] } : null;
  }
  var kind = k[0], p = k.slice(1).split('.');
  var u = unit(p[0], p[1]); if (!u) return null;
  if (kind === 'q') { var q = u.qs[+p[2]]; return q ? { type: 'q', q: q, k: k, d: +p[0], u: +p[1] } : null; }
  var c = u.cards[+p[2]]; return c ? { type: 'c', c: c, k: k, d: +p[0], u: +p[1] } : null;
}

/* ------------------------------------------------------ surlignage leçons */
/* Reprend la charte du document source : definition (jaune) · date (bleu)
   · chiffre cle (vert) · loi ou article (rose). */
var MOIS = 'janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre';
var HLRX = [
  ['art', /\b(?:lois?[-\s]?cadres?|loi|dahirs?|décrets?|arrêtés?|circulaires?)\s*(?:n[°o]\s*)?\d{1,4}\s*[-.–]\s*\d{2,3}\b/gi],
  ['art', /\bart(?:icle)?s?\.?\s*\d+(?:\s*(?:et|,|à)\s*\d+)*\b/gi],
  ['art', /\b\d{2}\s?[-–]\s?\d{2}\b/g],
  ['date', new RegExp('\\b\\d{1,2}(?:er)?\\s+(?:' + MOIS + ')\\s+\\d{4}\\b', 'gi')],
  ['date', new RegExp('\\b(?:' + MOIS + ')\\s+\\d{4}\\b', 'gi')],
  ['date', /\b\d{1,2}[./]\d{1,2}[./]\d{4}\b/g],
  ['date', /\b(?:1[5-9]\d{2}|20\d{2})\b/g],
  ['num', /\b\d{1,3}(?:[  ]\d{3})*(?:[.,]\d+)?\s*%/g],
  ['num', /\b\d{1,3}(?:[  ]\d{3})*(?:[.,]\d+)?\s+(?:pour\s+\d[\d  ]*|milli(?:on|ard)s?|dirhams?|DH)\b/gi],
  ['num', /\b\d{1,3}(?:[.,]\d+)?\s+(?:piliers?|principes?|objectifs?|fonctions?|axes?|actions?|mesures?|missions?|directions?|divisions?|valeurs?|approches?|secteurs?|acteurs?|niveaux|catégories?|composantes?|éléments?|types?|critères?|qualités?|chapitres?|articles?|conditions?|étapes?|domaines?|instances?|pôles?|modes?|formes?|voies?|volets?|raisons?|cadres?|sources?|groupes?|unités?|paliers?|jours?|mois|ans|années?|semaines?|heures?|lits?|places?|habitants?|professionnels?|cliniques?|officines?|structures?|établissements?|services?|départements?|comités?|conseils?|membres?|représentants?|exclusions?|devoirs?|droits?)\b/gi]
];
var HLTOK = '\u0001';
/* --------------------------------------------- charte emoji des leçons */
/* Reprend la mise en forme du document source : chaque item de liste porte
   une émoji thématique, les énumérations sont numérotées en pastilles,
   les définitions passent en bloc citation, les pièges en encadré orange. */
var EMO_MAP = [
  [/gouvernance|régulation|pilotage|État|ministère|administration|tutelle|institutionnel/i, '\u{1F3DB}️'],
  [/ressources? humaines?|personnel|infirmi|médecin|sage-femme|professionnel|effectif|soignant/i, '\u{1F469}‍⚕️'],
  [/hôpital|hospitali|offre de soins|établissement|CHU|CHP|CHR|clinique|centre de santé|lit/i, '\u{1F3E5}'],
  [/digitalis|numérique|informati|système d.information|télémédecine|dossier électronique/i, '\u{1F4BB}'],
  [/financ|budget|coût|dépense|économi|dirham|tarif|coûteux|payant|gratuit|assurance|AMO|RAMED|cotisation/i, '\u{1F4B0}'],
  [/\bloi\b|loi-cadre|décret|dahir|article|juridique|réglement|arrêté|texte de loi|circulaire|code/i, '⚖️'],
  [/carte sanitaire|territo|région|SROS|découpage|spatial|province|préfecture|zone|répartition géo/i, '\u{1F5FA}️'],
  [/prévention|préventi|protection de la santé|sécurité sanitaire|prophyla/i, '\u{1F6E1}️'],
  [/vaccin|immunisation|injection/i, '\u{1F489}'],
  [/objectif|finalité|\bbut\b|cible|visée/i, '\u{1F3AF}'],
  [/composante|intégr|complémentarité|articulation entre/i, '\u{1F9E9}'],
  [/indicateur|évaluation|statistiq|mesure|\btaux\b|données|enquête|\bratio\b|surveillance/i, '\u{1F4CA}'],
  [/dépistage|diagnostic|détection|repérage|analyse/i, '\u{1F50D}'],
  [/recherche|étude scientifique|laboratoire|science/i, '\u{1F52C}'],
  [/médicament|pharmac|traitement|thérapeut|posologie|générique/i, '\u{1F48A}'],
  [/transmissible|infecti|épidémi|virus|microbe|contagi|pandémi|tuberculose|VIH|paludisme/i, '\u{1F9A0}'],
  [/partenariat|coopération|collabor|intersectoriel|multisectoriel|public-privé|participation/i, '\u{1F91D}'],
  [/population|communauté|collectivité|citoyen|usager|famille|habitant|ménage|bénéficiaire/i, '\u{1F465}'],
  [/\bOMS\b|international|mondial|\bglobal|Alma-Ata|Nations Unies|ONU|UNICEF/i, '\u{1F30D}'],
  [/Maroc|marocain|national/i, '\u{1F1F2}\u{1F1E6}'],
  [/constitution|déclaration|charte|convention|traité|pacte/i, '\u{1F4DC}'],
  [/\bplan\b|programme|stratégi|projet|schéma|feuille de route|réforme/i, '\u{1F4CB}'],
  [/communautaire|\blocal|quartier|milieu|proximité|douar/i, '\u{1F3D8}️'],
  [/\bgenre\b|femme|parité|maternel|égalité hommes/i, '♀️'],
  [/enfant|infantile|pédiatri|nourrisson|néonatal|nouveau-né|scolaire/i, '\u{1F9D2}'],
  [/grossesse|maternité|accouchement|prénatal|obstétri|parturiente/i, '\u{1F930}'],
  [/nutrition|alimentai?re|aliment|malnutrition|carence|allaitement/i, '\u{1F37D}️'],
  [/\beau\b|assainissement|hygiène du milieu|salubrité|potable|déchet/i, '\u{1F6B0}'],
  [/environnement|écolog|pollution|\bair\b|climat|bruit/i, '\u{1F33F}'],
  [/tabac|alcool|drogue|addiction|toxicoman|stupéfiant/i, '\u{1F6AD}'],
  [/mental|psych|mnémo|mémoire|cognitif|stress|dépression/i, '\u{1F9E0}'],
  [/handicap|incapacité|réadaptation|réinsertion|rééducation/i, '♿'],
  [/durée|année|période|calendrier|échéance|délai|\bans\b/i, '\u{1F4C5}'],
  [/continuité|processus|cycle|adaptation|permanence|suivi/i, '\u{1F504}'],
  [/qualité|excellence|performance|accréditation|certification/i, '⭐'],
  [/accès|accessib|proximité géographique|disponibilité/i, '\u{1F6AA}'],
  [/fonction|mécanisme|organisation|structuration|système/i, '⚙️'],
  [/promotion|communicat|sensibilis|éducation|mobilisation|IEC|plaidoyer/i, '\u{1F4E3}'],
  [/formation|enseignement|apprentissage|école|institut|stage|cursus/i, '\u{1F4DA}'],
  [/résultat|gestion par résultat|rendement|succès|réussite/i, '\u{1F3C6}'],
  [/coordination|réseau|filière|liaison|référence|contre-référence/i, '\u{1F517}'],
  [/approche|orientation|méthode|démarche|axe/i, '\u{1F9ED}'],
  [/urgence|riposte|catastrophe|crise|alerte|flambée|SAMU/i, '⚡'],
  [/infrastructure|bâtiment|locaux|structure|équipement|matériel|plateau technique/i, '\u{1F3E2}'],
  [/moyen|outil|dispositif|instrument/i, '\u{1F6E0}️'],
  [/solidarité|équité|justice sociale|vulnérab|pauvre|démuni/i, '\u{1F49E}'],
  [/décès|mortalité|létalité|espérance de vie/i, '⚰️'],
  [/naissance|natalité|fécondité|démograph/i, '\u{1F476}'],
  [/chronique|ALD|diabète|cancer|hypertension|non transmissible/i, '\u{1F3E5}'],
  [/\bdroit|devoir|obligation|responsabilité/i, '⚖️'],
  [/principe|valeur|éthique|déontolog|secret/i, '\u{1F48E}'],
  [/contrôle|inspection|audit|sanction|supervision/i, '\u{1F50E}'],
  [/couverture|universel|généralis|CMB|protection sociale/i, '\u{1F6E1}️'],
  [/soins? curatif|guérison|curatif/i, '\u{1F691}'],
  [/palliatif|souffrance|douleur|fin de vie/i, '\u{1F54A}️'],
  [/prestataire|dispensateur|producteur de soins/i, '\u{1F469}‍⚕️'],
  [/directeur|chef de|responsable|président|encadrement|gestionnaire|ministr|cabinet/i, '\u{1F9D1}‍\u{1F4BC}'],
  [/ingénieur|technicien|biomédical|maintenance|informaticien/i, '\u{1F9D1}‍\u{1F527}'],
  [/commission|comité|conseil|instance|assemblée|CMDP|bureau de/i, '\u{1F91D}'],
  [/norme|procédure|standard|référentiel|protocole|règlement intérieur/i, '\u{1F4CF}'],
  [/recommandation|\bavis\b|proposition|note de service|\bPEH\b|rapport/i, '\u{1F4CC}'],
  [/archive|dossier|secrétariat|affaires générales|courrier|document/i, '\u{1F5C2}️'],
  [/parc-auto|véhicule|transport|ambulance|évacuation/i, '\u{1F691}'],
  [/caisse|CNSS|CNOPS|ANAM|mutuelle|organisme gestionnaire|remboursement/i, '\u{1F3E6}'],
  [/facturation|recouvrement|tarification|\bdevis\b|honoraire/i, '\u{1F9FE}'],
  [/Bismarck|Beveridge|modèle|typologie|libéral|étatisé/i, '\u{1F310}'],
  [/hospitalisation|\blit\b|séjour|admission|accueil/i, '\u{1F6CF}️'],
  [/stérilisation|désinfection|hygiène hospitalière|asepsie|nettoyage/i, '\u{1F9F4}'],
  [/consultation|examen clinique|\bvisite\b|\bsoins\b/i, '\u{1FA7A}'],
  [/stock|approvisionnement|logistique|magasin|commande/i, '\u{1F4E6}'],
  [/sang|transfusion|hémato/i, '\u{1FA78}'],
  [/pôle|division|département|\bservice\b|unité|cellule/i, '\u{1F4C1}'],
  [/membre|composé de|comprend|comporte|regroupe/i, '\u{1F465}'],
  [/élection|\bvote\b|désignation|mandat|nomination/i, '\u{1F5F3}️'],
  [/catégorie|\btype\b|classe|niveau|palier|échelon/i, '\u{1F516}'],
  [/planif|gestion|gérer|administrer|piloter|organiser/i, '\u{1F4D0}'],
  [/garde|astreinte|permanence|horaire|\bnuit\b|24h/i, '\u{1F550}'],
  [/incident|signalement|informer|hiérarchie|notification/i, '\u{1F514}'],
  [/registre|enregistrement|inscription|immatricul|\bfiche\b/i, '\u{1F4DD}'],
  [/sortie|sortant|billet|congé|décharge|transfert/i, '\u{1F6B6}'],
  [/autonomie|indépendan|liberté|délégation|décentralis/i, '\u{1F513}'],
  [/mission|attribution|tâche|\brôle\b|prérogative/i, '\u{1F396}️'],
  [/technolog|innovation|brevet|numérisation|recherche appliquée/i, '\u{1F680}'],
  [/équipe|multidisciplinaire|pluridisciplinaire|collectif|binôme/i, '\u{1F91D}'],
  [/développ|renforcement|amélioration|extension|mise à niveau/i, '\u{1F4C8}'],
  [/liste|répertoire|nomenclature|inventaire|recensement/i, '\u{1F4D1}'],
  [/pays|monde|étranger|comparaison internationale|Cuba|France|Royaume-Uni/i, '\u{1F30E}']
];
var EMO_DEF = '\u{1F539}';
var KEYCAP = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
var RX_HASEMO = /^\s*(?:<\/?[a-z][^>]*>\s*)*(?:[\uD83C-\uDBFF][\uDC00-\uDFFF]|[←-⇿⌀-➿⬀-⯿☠-⛿]|\d️?⃣)/;
function stripTags(s) { return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function pickEmoji(txt) {
  for (var i = 0; i < EMO_MAP.length; i++) if (EMO_MAP[i][0].test(txt)) return EMO_MAP[i][1];
  return EMO_DEF;
}
function emojify(html) {
  var h = String(html);
  /* 1. énumérations 1. 2. 3. → pastilles (avant tout découpage) */
  h = h.replace(/(^|<br\s*\/?>|<p>|<\/b>\s|·\s|:\s)\s*<b>([1-9])\.<\/b>/g,
    function (m, pre, n) { return pre + '<b>' + KEYCAP[+n] + '</b>'; });
  h = h.replace(/(^|<br\s*\/?>|<p>|<li>)\s*<b>([1-9])\.\s+/g,
    function (m, pre, n) { return pre + '<b>' + KEYCAP[+n] + ' '; });
  h = h.replace(/(^|<br\s*\/?>|<p>|·\s|:\s)\s*([1-9])\.\s/g,
    function (m, pre, n) { return pre + KEYCAP[+n] + ' '; });
  /* 2. définitions entre guillemets → bloc citation */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    var i = inner.indexOf('«'), j = inner.lastIndexOf('»');
    if (i < 0 || j < i + 40 || inner.indexOf('<br') >= 0) return m;
    var intro = inner.slice(0, i).trim(), quote = inner.slice(i, j + 1), rest = inner.slice(j + 1).trim();
    return (intro ? '<p>' + intro + '</p>' : '') + '<div class="quote">' + quote + '</div>' +
      (stripTags(rest).length > 2 ? '<p>' + rest + '</p>' : '');
  });
  /* 3. paragraphes découpés par <br> → liste à émojis */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    if (inner.indexOf('<br') < 0) return m;
    var lines = inner.split(/<br\s*\/?>/), out = '', n = 0;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i].replace(/^\s+|\s+$/g, '');
      if (!stripTags(l)) continue;
      n++; out += '<li>' + bullet(l) + l + '</li>';
    }
    return n < 2 ? m : '<ul class="emo">' + out + '</ul>';
  });
  /* 4. énumérations séparées par « · » → liste à émojis */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    if (inner.indexOf('·') < 0 || inner.split('·').length < 3) return m;
    var intro = '', body = inner, k = inner.indexOf(' : ');
    if (k > 0 && k < inner.indexOf('·')) { intro = inner.slice(0, k + 2); body = inner.slice(k + 2); }
    var parts = body.split('·'), out = '', n = 0;
    for (var i = 0; i < parts.length; i++) {
      var l = parts[i].replace(/^\s+|[\s.]+$/g, '');
      if (!stripTags(l) || stripTags(l).length > 220) return m;
      n++; out += '<li>' + bullet(l) + l + '</li>';
    }
    return n < 3 ? m : (intro ? '<p>' + intro + '</p>' : '') + '<ul class="emo">' + out + '</ul>';
  });
  /* 5. listes déjà écrites en <ul> (contenu futur) */
  h = h.replace(/<ul(?![^>]*class)/g, '<ul class="emo"');
  h = h.replace(/<li>([\s\S]*?)<\/li>/g, function (m, inner) {
    return RX_HASEMO.test(inner) ? m : '<li>' + pickEmoji(stripTags(inner)) + ' ' + inner + '</li>';
  });
  /* 6. pièges et mnémos → encadré orange */
  h = h.replace(/<p>\s*(⚠️?|\u{1F9E0})\s*([\s\S]*?)<\/p>/gu,
    function (m, ic, body) { return '<div class="trap">' + ic + ' ' + body + '</div>'; });
  h = h.replace(/<div class="warn">\s*(?!⚠)/g, '<div class="trap">⚠️ ');
  h = h.replace(/<div class="tip">\s*(?![\u{1F4A1}\u{1F9E0}])/gu, '<div class="tip">\u{1F4A1} ');
  /* 7. titres sans émoji */
  h = h.replace(/<(h3|h4)>([\s\S]*?)<\/\1>/g, function (m, tag, inner) {
    if (RX_HASEMO.test(inner)) return m;
    return '<' + tag + '>' + pickEmoji(stripTags(inner)) + ' ' + inner + '</' + tag + '>';
  });
  return h;
}
function bullet(line) { return RX_HASEMO.test(line) ? '' : pickEmoji(stripTags(line)) + ' '; }

var RX_DEF = /«(?:(?!«|<\/p>|<\/h3>|<\/li>|<\/div>)[\s\S]){2,600}?»/g;
function decorate(html) {
  if (!html || !S.hl) return html;
  html = emojify(html);
  html = String(html).replace(RX_DEF, function (m) { return '<span class="hl def">' + m + '</span>'; });
  var parts = String(html).split(/(<[^>]*>)/);
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i] || parts[i].charAt(0) === '<') continue;
    parts[i] = markup(parts[i]);
  }
  return parts.join('');
}
function markup(text) {
  var store = [];
  function keep(cls) {
    return function (m) {
      store.push('<span class="hl ' + cls + '">' + m + '</span>');
      return HLTOK + (store.length - 1) + HLTOK;
    };
  }
  for (var i = 0; i < HLRX.length; i++) text = text.replace(HLRX[i][1], keep(HLRX[i][0]));
  return text.replace(new RegExp(HLTOK + '(\\d+)' + HLTOK, 'g'), function (_, n) { return store[+n]; });
}
function legendHL() {
  if (!S.hl) return '';
  return '<div class="legend-hl">🖍️' +
    '<i><span class="sw" style="background:#fff3b0"></span>💡 définition</i>' +
    '<i><span class="sw" style="background:#bbdefb"></span>📅 date</i>' +
    '<i><span class="sw" style="background:#c8e6c9"></span>🔢 chiffre clé</i>' +
    '<i><span class="sw" style="background:#f8bbd0"></span>⚖️ loi / article</i></div>';
}

/* ------------------------------------------------------------------ util */
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function rich(s) { return String(s == null ? '' : s); }   // le contenu est de confiance (généré localement)
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function el(id) { return document.getElementById(id); }
function toast(msg) {
  var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = rich(msg);
  document.body.appendChild(t); setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 1700);
  setTimeout(function () { t.remove(); }, 2100);
}
function confetti() {
  var c = document.createElement('div'); c.className = 'confetti';
  var cols = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'];
  for (var i = 0; i < 40; i++) {
    var s = document.createElement('i');
    s.style.left = Math.random() * 100 + 'vw'; s.style.top = '-20px';
    s.style.background = cols[i % cols.length];
    s.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
    s.style.animationDelay = (Math.random() * .4) + 's';
    c.appendChild(s);
  }
  document.body.appendChild(c); setTimeout(function () { c.remove(); }, 2800);
}

/* ------------------------------------------------------------------ sons */
var AC = null;
function beep(kind) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    var seq = kind === 'ok' ? [[660, 0], [880, .08]] :
      kind === 'ko' ? [[200, 0], [150, .09]] :
        kind === 'up' ? [[523, 0], [659, .09], [784, .18], [1047, .27]] : [[440, 0]];
    seq.forEach(function (p) {
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = kind === 'ko' ? 'square' : 'sine';
      o.frequency.value = p[0];
      var t0 = AC.currentTime + p[1];
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(kind === 'ko' ? .12 : .16, t0 + .012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + .19);
      o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + .22);
    });
  } catch (e) { }
}
function vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { } }

/* ----------------------------------------------------------------- thème */
function applyTheme() {
  var t = S.theme;
  if (t === 'auto') t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  var m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = t === 'dark' ? '#111820' : '#58cc02';
}
if (window.matchMedia) { try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) { } }

/* --------------------------------------------------------------- routeur */
function go(h) {
  var path = '/' + String(h || '').replace(/^\/+/, '');
  var target = '#' + path;
  if (location.hash === target) { render(); return; }
  location.hash = path;
}
function route() { return (location.hash || '#/').replace(/^#\/?/, '').split('/'); }
window.addEventListener('hashchange', render);

var ROOT;
function render() {
  rollDay(); hearts();
  var r = route(), v = r[0] || '';
  window.scrollTo(0, 0);
  var html;
  switch (v) {
    case '': case 'home': html = vHome(); break;
    case 'doc': html = vDoc(r[1]); break;
    case 'lesson': html = vLesson(r[1], r[2]); break;
    case 'quiz': html = vQuizStart(r[1], r[2]); break;
    case 'cards': html = vCardsStart(r[1], r[2]); break;
    case 'review': html = vReview(); break;
    case 'concours': html = vConcours(); break;
    case 'exam': html = vExamSetup(); break;
    case 'stats': html = vStats(); break;
    case 'set': html = vSettings(); break;
    case 'search': html = vSearch(); break;
    default: html = vHome();
  }
  ROOT.innerHTML = html + navBar(v);
  bind();
}

/* ------------------------------------------------------------ composants */
function bar(title, back) {
  return '<div class="topbar">' +
    (back ? '<button class="iconbtn" data-go="' + back + '">←</button>' : '<span style="width:34px"></span>') +
    '<span class="ttl">' + esc(title) + '</span>' +
    '<span class="pill hearts">' + (S.unlimited ? '♾️' : '❤️ ' + hearts()) + '</span>' +
    '</div>';
}
function navBar(v) {
  var d = dueList().length;
  var items = [
    ['', '🛣️', 'Le chemin'],
    ['review', '🧠', 'Évaluation intelligente'],
    ['concours', '📝', 'concours'],
    ['cards', '🃏', 'Cartes'],
    ['stats', '📊', 'Statistiques'],
    ['set', '⚙️', 'Réglages']
  ];
  return '<div class="nav"><div class="in">' + items.map(function (it) {
    var on = (v === it[0] || (v === 'home' && it[0] === '')) ? ' on' : '';
    var dot = (it[0] === 'review' && d) ? '<span class="dot">' + (d > 99 ? '99+' : d) + '</span>' : '';
    return '<button class="' + on.trim() + '" data-go="' + it[0] + '"><span class="ic">' + it[1] + '</span>' + it[2] + dot + '</button>';
  }).join('') + '</div></div>';
}
function ring(pct) {
  var r = 24, c = 2 * Math.PI * r, o = c * (1 - Math.min(1, pct));
  return '<div class="ring"><svg width="56" height="56">' +
    '<circle cx="28" cy="28" r="' + r + '" stroke="rgba(255,255,255,.3)" stroke-width="7" fill="none"/>' +
    '<circle cx="28" cy="28" r="' + r + '" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + o.toFixed(1) + '"/>' +
    '</svg><div class="txt">' + Math.round(pct * 100) + '%</div></div>';
}

/* ------------------------------------------------------- vue CONCOURS */
var CONCOURS_VIEWER_URLS = {};
function concoursViewerUrl(htmlFile) {
  var embedded = window.CNC_CONCOURS_VIEWERS_B64 && window.CNC_CONCOURS_VIEWERS_B64[htmlFile];
  if (!embedded) return 'concours-commun/' + htmlFile;
  if (!CONCOURS_VIEWER_URLS[htmlFile]) {
    var binary = atob(embedded), bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    CONCOURS_VIEWER_URLS[htmlFile] = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
  }
  return CONCOURS_VIEWER_URLS[htmlFile];
}
var CONCOURS_DOCS = [
  ['08- CNC Marrakech - Commun 2024-1.pdf', 'CNC Marrakech · Commun 2024'],
  ['15- CNC Marrakech - Commun 2025-2.pdf', 'CNC Marrakech · Commun 2025'],
  ['Chu Marrakech.pdf', 'CHU Marrakech'],
  ['CNC Beni Mellal Khénifra 2023 Avec Justification.pdf', 'CNC Beni Mellal-Khénifra 2023 · corrigé'],
  ['CNC Guelmim 2023 Avec Justification.pdf', 'CNC Guelmim 2023 · corrigé'],
  ['cnc rect Marrakech 2025-1.pdf', 'CNC Marrakech 2025 · rectificatif'],
  ['CNC Tanger 2023 - preuve 1 Avec Justification.pdf', 'CNC Tanger 2023 · corrigé'],
  ['commun marrakech 2024.pdf', 'Commun Marrakech 2024'],
  ['Concours CHU MARRAKECH 2020.pdf', 'Concours CHU Marrakech 2020'],
  ['Concours CHU SM 2024 Avec Justification.pdf', 'Concours CHU SM 2024 · corrigé'],
  ['Concours Commun 03 Mars 2019 Avec Justification.pdf', 'Concours commun · 3 mars 2019 · corrigé'],
  ['Concours Commun National 10 Juin 2018 Avec Justification.pdf', 'Concours commun national · 10 juin 2018 · corrigé'],
  ['Concours commun souss massa 2024.pdf', 'Concours commun Souss-Massa 2024'],
  ['Concours ISFSC Région  Marrakech 2024 Avec Justification.docx-1.pdf', 'ISFSC Marrakech 2024 · corrigé'],
  ['Concours National 26 Juin 2026 Avec Justification.pdf', 'Concours national · 26 juin 2026 · corrigé'],
  ['Concours Région Fès Meknes Avec Justification.pdf', 'Concours région Fès-Meknès · corrigé'],
  ['correction commun marrakech.pdf', 'Correction commun Marrakech'],
  ['Etat Marrakech commun 2024VF.pdf', 'État Marrakech commun 2024'],
  ['QCM_marrakech_2024_logo_arriere_plan_plus_clair-1.pdf', 'QCM Marrakech 2024'],
  ['Recueil des Epreuves du Concours ITS 2021-2025.pdf', 'Recueil des épreuves du concours ITS 2021–2025'],
  ['draa 2024.pdf', 'Draa-Tafilalet · Commun 2024'],
  ['Concours de draa Tafilalet octobre 2021.pdf', 'Draa-Tafilalet · octobre 2021'],
  ['DRAA 2025.pdf', 'Draa-Tafilalet · concours 2025'],
  ['CamScanner 22-06-2026 20.39.pdf', 'Sujet scanné · juin 2026'],
  ['beni mellal 2025 commun .pdf', 'Béni Mellal · Commun 2025'],
  ['commun CHU Oujda 2023.pdf', 'CHU Oujda · Commun 2023'],
  ['CHU Oujda.pdf', 'CHU Oujda'],
  ['cnc recrt laayoune 2025.pdf', 'Laâyoune · recrutement 2025'],
  ['etat laayoun 2024 commun.pdf', 'Laâyoune · Commun 2024'],
  ['cncr agadir 2024.pdf', 'Agadir · concours 2024'],
  ['commun état Tanger 2025.pdf', 'Tanger · Commun 2025'],
  ['état tanger.pdf', 'Tanger · concours d’État']
];
function vConcours() {
  var h = bar('Concours', '') + '<div class="wrap">';
  h += '<h1>📝 Concours</h1><div class="sub">Sujets et corrigés du dossier Concours commun</div>';
  h += '<div class="card" style="border-color:var(--green)"><b>Examen blanc</b><div class="sub">Teste-toi avec les QCM de préparation, en conditions chronométrées.</div><div class="spacer"></div><button class="btn gold" data-go="exam">Lancer un examen blanc</button></div>';
  h += '<h2>Sujets disponibles <span class="sub">(' + CONCOURS_DOCS.length + ' PDF)</span></h2>';
  CONCOURS_DOCS.forEach(function (p, i) {
    var htmlFile = 'sujet-' + String(i + 1).padStart(2, '0') + '.html';
    h += '<a class="card row" style="display:flex;text-decoration:none;color:inherit" href="' + esc(concoursViewerUrl(htmlFile)) + '" target="_blank" rel="noopener"><div style="font-size:25px">📄</div><div style="flex:1"><b>' + esc(p[1]) + '</b><div class="sub">Ouvrir la version HTML interactive · recherche et navigation</div></div><span style="font-size:20px">↗</span></a>';
  });
  return h + '</div>';
}

/* ------------------------------------------------------------ vue ACCUEIL */
function vHome() {
  var due = dueList().length;
  var plan = planInfo();
  var totQ = 0; DOCS.forEach(function (d) { d.units.forEach(function (u) { totQ += u.qs.length; }); });
  var nextU = firstUnfinished();
  var g = Math.min(1, S.xpDay / (S.goal || 50));

  var h = '<div class="card"><b>📲 Utiliser hors ligne</b><div class="sub">Installe l’application pour réviser sans Internet.</div><div class="spacer"></div><button class="btn blue sm" data-act="install">⬇️ Télécharger / installer</button></div>' +
    '<div class="hero">' +
    '<div class="row" style="justify-content:space-between">' +
    '<span class="pill">🔥 ' + S.streak + '</span>' +
    '<span class="pill">⭐ ' + S.xp + ' XP</span>' +
    '<span class="pill">' + (S.unlimited ? '♾️ cœurs' : '❤️ ' + hearts() + (hearts() < HEART_MAX ? ' · ' + heartIn() : '')) + '</span>' +
    '</div>' +
    '<h1 style="margin-top:12px">Prépare ton concours</h1>' +
    '<div class="sub">' + DOCS.length + ' modules · ' + totQ + ' questions · licence → concours</div>' +
    '<div class="goal-ring">' + ring(g) +
    '<div style="flex:1"><div style="font-weight:800">Objectif du jour</div>' +
    '<div class="sub" style="color:#eafbe0">' + S.xpDay + ' / ' + S.goal + ' XP' + (g >= 1 ? ' ✅ atteint !' : '') + '</div></div></div>' +
    '</div>';

  h += '<div class="wrap">';
  h += '<div class="card" style="border-color:' + (plan.ahead ? 'var(--green)' : 'var(--orange)') + '"><div class="row"><div style="font-size:28px">🗓️</div><div style="flex:1"><b>Objectif concours · 10 octobre 2026</b><div class="sub">' + plan.left + ' jours restants · ' + plan.remaining + ' unités à valider</div></div><span class="badge ' + (plan.ahead ? 'ok' : 'hot') + '">' + (plan.ahead ? 'Bon rythme' : 'À rattraper') + '</span></div><div class="progress" style="margin:12px 0 6px"><div style="width:' + Math.round(plan.done / Math.max(1, plan.total) * 100) + '%"></div></div><div class="sub">Aujourd’hui : vise ' + plan.perDay + ' unité' + (plan.perDay > 1 ? 's' : '') + ' + ' + due + ' révision' + (due > 1 ? 's' : '') + '</div></div>';
  if (nextU) {
    var d0 = doc(nextU.d), u0 = unit(nextU.d, nextU.u);
    h += '<div class="card" style="border-color:var(--green)">' +
      '<div class="row" style="justify-content:space-between"><b>🛣️ Chemin du jour</b><span class="badge ok">Jour ' + (plan.done + 1) + '</span></div>' +
      '<div class="sub" style="margin-top:6px">' + (S.streak ? '🔥 Série de ' + S.streak + ' jour' + (S.streak > 1 ? 's' : '') : 'Commence ta série aujourd’hui') + '</div>' +
      '<div style="font-weight:800;font-size:15.5px;margin:2px 0 10px">' + esc(d0.code + ' · ' + u0.t) + '</div>' +
      '<button class="btn" data-go="lesson/' + nextU.d + '/' + nextU.u + '">Commencer</button></div>';
  } else h += '<div class="card" style="border-color:var(--green)"><b>🏆 Chemin terminé !</b><div class="sub">Toutes les unités sont validées. Continue avec les révisions.</div></div>';
  h += '<div class="qa-grid">' +
    '<div class="qa" data-go="review"><div class="ic">🔁</div><div class="t">Révision</div><div class="d">' + (due ? due + ' à revoir' : 'à jour ✅') + '</div></div>' +
    '<div class="qa" data-go="exam"><div class="ic">📝</div><div class="t">Examen blanc</div><div class="d">chronométré</div></div>' +
    '</div><div class="spacer"></div>' +
    '<input class="search" id="q" placeholder="🔎 Chercher une notion, une loi, un chiffre…">' +
    '<h2>Modules</h2>';

  DOCS.forEach(function (d) {
    var p = docPct(d), st = docStarted(d);
    var nq = 0; d.units.forEach(function (u) { nq += u.qs.length; });
    h += '<div class="mod' + (p >= 100 ? ' done' : st ? ' started' : '') + '" data-go="doc/' + d.id + '">' +
      '<div class="bub">' + d.icon + '</div>' +
      '<div class="info"><div class="t">' + esc(d.code + '. ' + d.title) + '</div>' +
      '<div class="p">' + d.units.length + ' unités · ' + nq + ' QCM</div>' +
      '<div class="progress thin" style="margin-top:6px"><div style="width:' + p + '%"></div></div></div>' +
      '<div class="pct">' + p + '%</div></div>';
  });
  h += '</div>';
  return h;
}
function firstUnfinished() {
  for (var i = 0; i < DOCS.length; i++) {
    var d = DOCS[i];
    for (var j = 0; j < d.units.length; j++) if (ust(d.id, j).crowns < CROWN_MAX) return { d: d.id, u: j };
  }
  return null;
}

/* --------------------------------------------------------------- vue DOC */
function vDoc(id) {
  var d = doc(id); if (!d) return vHome();
  var h = bar(d.code + '. ' + d.title, '') + '<div class="wrap">';
  h += '<h1>' + d.icon + ' ' + esc(d.title) + '</h1><div class="sub">' + esc(d.sub || '') + '</div>';
  h += '<div class="row" style="margin:12px 0 4px"><div class="progress"><div style="width:' + docPct(d) + '%"></div></div>' +
    '<b style="font-size:13px">' + docPct(d) + '%</b></div>';
  h += '<div class="row2" style="margin:12px 0"><button class="btn blue sm" data-go="cards/' + d.id + '">🃏 Flashcards</button>' +
    '<button class="btn gold sm" data-go="quiz/' + d.id + '/all">⚡ Quiz du module</button></div>';
  h += '<div class="path">';
  d.units.forEach(function (u, i) {
    var s = ust(d.id, i);
    var cls = s.crowns >= CROWN_MAX ? 'mastered' : (s.runs > 0 || s.lesson) ? 'started' : '';
    h += '<div class="node ' + cls + '" data-go="lesson/' + d.id + '/' + i + '">' +
      '<div class="circ">' + (u.ic || '📘') + '</div>' +
      '<div class="info" style="flex:1"><div class="t">' + esc(u.t) + '</div>' +
      '<div class="d">' + u.qs.length + ' QCM · ' + u.cards.length + ' cartes' + (u.pages ? ' · ' + u.pages : '') + '</div>' +
      '<div class="crowns">' + '👑'.repeat(s.crowns) + '<span style="opacity:.25">' + '👑'.repeat(CROWN_MAX - s.crowns) + '</span>' +
      (s.best ? ' <span class="badge ok">' + s.best + '%</span>' : '') + '</div></div>' +
      '<button class="cardbtn" title="Flashcards de cette unité" data-go="cards/' + d.id + '/' + i + '">🃏</button></div>';
  });
  h += '</div></div>';
  return h;
}

/* ------------------------------------------------------------ vue LEÇON */
function vLesson(did, ui) {
  var d = doc(did), u = unit(did, ui); if (!u) return vHome();
  var s = ust(d.id, ui); s.lesson = 1; save();
  return bar(u.t, 'doc/' + d.id) + '<div class="wrap">' + legendHL() + '<div class="card lesson">' +
    rich(decorate(u.lesson) || '<p class="muted">Pas de leçon pour cette unité.</p>') + '</div>' +
    '<button class="btn" data-go="quiz/' + d.id + '/' + ui + '">Passer au quiz →</button>' +
    '<div class="spacer"></div>' +
    '<div class="row2">' +
    '<button class="btn blue sm" data-go="cards/' + d.id + '/' + ui + '">🃏 Cartes de cette unité (' +
    Math.max(u.cards.length, Math.min(8, u.cards.length + u.qs.length)) + ')</button>' +
    '<button class="btn ghost sm" data-go="cards/' + d.id + '">🃏 Cartes du module</button></div>' +
    '</div>';
}

/* ------------------------------------------------------------- vue QUIZ */
var RUN = null;
function vQuizStart(did, ui) {
  var d = doc(did); if (!d) return vHome();
  var pool;
  if (ui === 'all') pool = allQuestions(d.id);
  else { var u = unit(did, ui); if (!u) return vHome(); pool = u.qs.map(function (q, qi) { return { q: q, k: qKey(d.id, ui, qi), d: d.id, u: +ui }; }); }
  if (!pool.length) { return bar('Quiz', 'doc/' + d.id) + '<div class="wrap"><div class="card">Aucune question ici.</div></div>'; }
  var n = ui === 'all' ? Math.min(20, pool.length) : pool.length;
  RUN = {
    mode: 'lesson', items: shuffle(pool).slice(0, n), i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0,
    xp: 0, back: ui === 'all' ? 'doc/' + d.id : 'doc/' + d.id, title: ui === 'all' ? d.title : unit(did, ui).t,
    did: d.id, ui: ui === 'all' ? null : +ui, wrong: [], t0: Date.now()
  };
  if (!S.unlimited && hearts() <= 0) return vNoHearts();
  return quizFrame();
}
function vNoHearts() {
  return bar('Plus de cœurs', '') + '<div class="wrap center">' +
    '<div style="font-size:60px;margin:26px 0 6px">💔</div>' +
    '<h1>Plus de cœurs</h1>' +
    '<div class="sub">Un cœur revient toutes les ' + HEART_MIN + ' min — prochain dans <b>' + heartIn() + '</b>.</div>' +
    '<div class="spacer"></div>' +
    '<div class="card"><div class="sub" style="margin-bottom:10px">Tu peux regagner un cœur tout de suite en faisant une session de révision (5 items).</div>' +
    '<button class="btn blue" data-go="review">🔁 Réviser pour un cœur</button></div>' +
    '<button class="btn ghost" data-act="unlimited">♾️ Activer les cœurs illimités</button>' +
    '<div class="spacer"></div><button class="btn ghost" data-go="">Retour</button></div>';
}
function quizFrame() {
  var R = RUN, it = R.items[R.i];
  if (!it) return quizEnd();
  var q = it.q;
  var pct = R.i / R.items.length * 100;
  var opts = q._sh || (q._sh = shuffle(q.o.map(function (t, i) { return { t: t, i: i }; })));
  var letters = 'ABCDEF';
  var h = '<div class="qbar">' +
    '<button class="iconbtn" data-act="quit">✕</button>' +
    '<div class="progress"><div style="width:' + pct + '%"></div></div>' +
    (R.mode === 'lesson' ? '<span class="pill hearts">' + (S.unlimited ? '♾️' : '❤️ ' + S.hearts) + '</span>' : '<span class="pill xp">' + (R.i + 1) + '/' + R.items.length + '</span>') +
    (R.mode === 'exam' ? '<span class="pill gem timer" id="tm">--:--</span>' : '') +
    '</div>';
  h += '<div class="wrap"><div class="sub">' + (unit(it.d, it.u).ic || '📘') + ' ' +
    esc(unit(it.d, it.u).t) + ' <span style="opacity:.6">· ' + esc(doc(it.d).code) + '</span></div>' +
    '<div class="qtext">' + rich(q.q) + '</div><div id="opts">';
  opts.forEach(function (o, n) {
    h += '<button class="opt" data-opt="' + o.i + '"><span class="k">' + letters[n] + '</span>' + rich(o.t) + '</button>';
  });
  h += '</div><div style="height:150px"></div></div>';
  return h;
}
function answer(chosen) {
  var R = RUN, it = R.items[R.i], q = it.q;
  var correct = (+chosen === q.c);
  var btns = ROOT.querySelectorAll('.opt');
  Array.prototype.forEach.call(btns, function (b) {
    b.disabled = true;
    var v = +b.getAttribute('data-opt');
    if (v === q.c) b.classList.add('correct');
    else if (v === +chosen) b.classList.add('wrong');
    else b.classList.add('dim');
  });
  if (correct) {
    R.ok++; R.combo++; R.maxCombo = Math.max(R.maxCombo, R.combo);
    var gain = 2 + (R.combo >= 5 ? 2 : 0);
    R.xp += gain; beep('ok');
    grade(it.k, R.mode === 'exam' ? 4 : 4);
    if (R.combo === 5 || R.combo === 10 || R.combo === 15) {
      var c = document.createElement('div'); c.className = 'combo'; c.textContent = '🔥 ' + R.combo + ' d\'affilée ! +2 XP';
      document.body.appendChild(c); setTimeout(function () { c.remove(); }, 1400);
    }
  } else {
    R.ko++; R.combo = 0; R.wrong.push(it); beep('ko'); vibrate(60);
    grade(it.k, 0);
    if (R.mode === 'lesson') { loseHeart(); }
    var w = ROOT.querySelector('.qtext'); if (w) { w.classList.add('shake'); setTimeout(function () { w.classList.remove('shake'); }, 400); }
  }
  var us = ust(it.d, it.u); if (correct) us.ok++; else us.ko++; save();

  var fb = document.createElement('div');
  fb.className = 'fbbar ' + (correct ? 'ok' : 'ko');
  fb.innerHTML = '<div class="inner"><div class="h">' + (correct ? '✅ Bonne réponse !' : '❌ Réponse : ' + rich(q.o[q.c])) + '</div>' +
    (q.e ? '<div class="e">' + rich(q.e) + '</div>' : '<div class="e"></div>') +
    '<button class="btn ' + (correct ? '' : 'red') + '" id="next">Continuer</button></div>';
  document.body.appendChild(fb);
  el('next').onclick = function () {
    fb.remove(); RUN.i++;
    if (!S.unlimited && RUN.mode === 'lesson' && S.hearts <= 0 && RUN.i < RUN.items.length) { ROOT.innerHTML = vNoHearts() + navBar(''); bind(); return; }
    ROOT.innerHTML = quizFrame() + navBar(''); bind();
  };
  el('next').focus();
}
function quizEnd() {
  var R = RUN, tot = R.items.length, pct = tot ? Math.round(R.ok / tot * 100) : 0;
  addXP(R.xp + (R.mode === 'lesson' ? 10 : 0) + (pct === 100 ? 5 : 0));
  if (R.mode === 'lesson' && R.ui != null) {
    var s = ust(R.did, R.ui);
    s.runs++; s.best = Math.max(s.best, pct);
    if (pct >= CROWN_PCT * 100 && s.crowns < CROWN_MAX) { s.crowns++; beep('up'); confetti(); }
    save();
  }
  if (pct >= 80) { beep('up'); if (pct === 100) confetti(); }
  var secs = Math.round((Date.now() - R.t0) / 1000);
  var h = bar('Résultat', '') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:16px 0 4px">' + (pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚') + '</div>' +
    '<h1>' + pct + '%</h1><div class="sub">' + R.ok + ' bonnes / ' + tot + ' questions · ' + Math.floor(secs / 60) + 'm' + pad(secs % 60) + 's</div>' +
    '<div class="row3" style="margin:16px 0">' +
    '<div class="stat"><div class="v">+' + (R.xp + (R.mode === 'lesson' ? 10 : 0)) + '</div><div class="l">XP</div></div>' +
    '<div class="stat"><div class="v">' + R.maxCombo + '</div><div class="l">meilleure série</div></div>' +
    '<div class="stat"><div class="v">' + R.ko + '</div><div class="l">à revoir</div></div>' +
    '</div>';
  if (R.wrong.length) {
    h += '<div class="card" style="text-align:left"><b>À revoir (' + R.wrong.length + ')</b>';
    R.wrong.slice(0, 12).forEach(function (it) {
      h += '<div style="margin-top:10px;font-size:13.5px"><div style="font-weight:700">' + rich(it.q.q) + '</div>' +
        '<div style="color:var(--green-dk)">➜ ' + rich(it.q.o[it.q.c]) + '</div></div>';
    });
    h += '<div class="sub" style="margin-top:10px">Ces questions sont programmées dans ta révision espacée.</div></div>';
  }
  h += '<button class="btn" data-go="' + (R.back || '') + '">Continuer</button><div class="spacer"></div>' +
    (R.ui != null ? '<button class="btn ghost" data-act="again">↻ Refaire cette unité</button>' : '') +
    '</div>';
  return h;
}

/* ---------------------------------------------------------- vue RÉVISION */
/* Une séance n'est pas un tirage au hasard. Ordre de priorité :
   1) les têtues (ratées ≥ 3 fois)  2) les erreurs  3) les autres items dus
   4) du jamais-vu pris dans les unités les plus faibles — 35 % de la séance
   réservés au neuf tant que la banque n'est pas couverte à 60 %. */
function coverage() {
  var tot = allQuestions(null).length + allCards(null).length, seen = 0;
  for (var k in S.srs) if (k.slice(0, 2) !== 'cq') seen++;
  return tot ? seen / tot : 1;
}
function weakUnitScore(did, ui) {
  var s = ust(did, ui), n = s.ok + s.ko;
  return n ? s.ok / n : 0.5;                 // jamais travaillée : priorité moyenne
}
function freshItems(n) {
  if (n <= 0) return [];
  var pool = allQuestions(null).filter(function (x) { return !S.srs[x.k]; });
  if (!pool.length) return [];
  pool.sort(function (a, b) { return weakUnitScore(a.d, a.u) - weakUnitScore(b.d, b.u); });
  return shuffle(pool.slice(0, Math.max(n * 4, 40))).slice(0, n).map(function (x) {
    return { type: 'q', q: x.q, k: x.k, d: x.d, u: x.u };
  });
}
function buildSession(n) {
  var stub = [], errs = [], rest = [];
  dueList().forEach(function (k) {
    (isStubborn(k) ? stub : (S.srs[k].lap ? errs : rest)).push(k);
  });
  var ordered = shuffle(stub).concat(shuffle(errs), shuffle(rest)).map(resolveKey).filter(Boolean);
  var quota = coverage() < 0.6 ? Math.round(n * 0.35) : Math.max(0, n - ordered.length);
  var old = ordered.slice(0, Math.max(0, n - quota));
  var neuf = freshItems(Math.min(quota, n - old.length));
  var out = [], oi = 0, ni = 0;              // on intercale le neuf : 2 anciens, 1 nouveau
  while (oi < old.length || ni < neuf.length) {
    if (oi < old.length) out.push(old[oi++]);
    if (oi < old.length) out.push(old[oi++]);
    if (ni < neuf.length) out.push(neuf[ni++]);
  }
  return { items: out, due: ordered.length, stub: stub.length, neuf: neuf.length };
}
function vReview() {
  var plan = buildSession(20);
  if (!plan.items.length) {
    return bar('Révision', '') + '<div class="wrap center">' +
      '<div style="font-size:56px;margin:26px 0 6px">✅</div><h1>Tout est à jour</h1>' +
      '<div class="sub">Rien à revoir aujourd\'hui, et toute la banque est déjà passée au moins une fois.</div>' +
      '<div class="spacer"></div><button class="btn blue" data-act="freeplay">🎯 Entraînement libre (15 QCM)</button>' +
      '<div class="spacer"></div><button class="btn ghost" data-go="">Retour</button></div>';
  }
  RUN = {
    mode: 'review', items: plan.items, i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0,
    wrong: [], t0: Date.now(), back: '', title: 'Révision', did: null, ui: null, plan: plan
  };
  return reviewFrame();
}
function reviewFrame() {
  var R = RUN, it = R.items[R.i];
  if (!it) return reviewEnd();
  if (it.type === 'q') {
    // réutilise l'affichage quiz
    R.items[R.i] = { q: it.q, k: it.k, d: it.d, u: it.u, type: 'q' };
    return quizFrame();
  }
  var pct = R.i / R.items.length * 100;
  var h = '<div class="qbar"><button class="iconbtn" data-act="quit">✕</button>' +
    '<div class="progress blue"><div style="width:' + pct + '%"></div></div><span class="pill gem">' + (R.i + 1) + '/' + R.items.length + '</span></div>';
  h += '<div class="wrap"><div class="sub">' + (unit(it.d, it.u).ic || '📘') + ' ' +
    esc(unit(it.d, it.u).t) + ' <span style="opacity:.6">· ' + esc(doc(it.d).code) + '</span></div>' +
    '<div class="flip" id="flip"><div class="in">' +
    '<div class="fa">' + rich(it.c.f) + '</div><div class="ba">' + rich(it.c.b) + '</div></div></div>' +
    '<div id="cardbtns"><button class="btn blue" data-act="flip">Voir la réponse</button></div>' +
    '<div style="height:90px"></div></div>';
  return h;
}
function cardGrade(g) {
  var R = RUN, it = R.items[R.i];
  grade(it.k, g);
  if (g >= 3) { R.ok++; R.xp += 1; beep('ok'); } else { R.ko++; beep('ko'); }
  R.i++;
  ROOT.innerHTML = reviewFrame() + navBar('review'); bind();
}
function reviewEnd() {
  var R = RUN;
  addXP(R.xp + 5);
  if (!S.unlimited && S.hearts < HEART_MAX && R.items.length >= 5) { gainHeart(1); }
  beep('up');
  var pl = R.plan || {};
  return bar('Révision terminée', '') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:20px 0 4px">🔁</div><h1>Bien joué !</h1>' +
    '<div class="sub">' + R.items.length + ' items revus · +' + (R.xp + 5) + ' XP' +
    (!S.unlimited && R.items.length >= 5 ? ' · ❤️ +1 cœur' : '') + '</div>' +
    (pl.items ? '<div class="sub" style="margin-top:6px">' +
      (pl.stub ? '🔥 ' + pl.stub + ' têtue(s) · ' : '') +
      (pl.neuf ? '✨ ' + pl.neuf + ' nouvelle(s) · ' : '') +
      Math.round(coverage() * 100) + ' % de la banque déjà vue</div>' : '') +
    '<div class="spacer"></div><button class="btn" data-go="">Retour à l\'accueil</button>' +
    '<div class="spacer"></div><button class="btn ghost" data-go="review">Encore une session</button></div>';
}

/* -------------------------------------------------------- vue FLASHCARDS */
function vCardsStart(did, ui) {
  var d = did ? doc(did) : null;
  if (did && !d) return vHome();
  var one = ui != null && ui !== '' && ui !== 'all';
  var u = one ? unit(did, ui) : null;
  if (one && !u) return vHome();
  var pool = one ? unitCards(d.id, +ui) : allCards(d ? d.id : null);
  var back = one ? 'lesson/' + d.id + '/' + ui : (d ? 'doc/' + d.id : '');
  if (!pool.length) return bar('Cartes', back) + '<div class="wrap"><div class="card">Aucune carte.</div></div>';
  RUN = {
    mode: 'review',
    items: shuffle(pool).map(function (p) { return { type: 'c', c: p.c, k: p.k, d: p.d, u: p.u }; }).slice(0, one ? 20 : 30),
    i: 0, ok: 0, ko: 0, xp: 0, combo: 0, maxCombo: 0, wrong: [], t0: Date.now(),
    back: back, did: d ? d.id : null, ui: one ? +ui : null
  };
  return reviewFrame();
}

/* ------------------------------------------------------------ vue EXAMEN */
function vExamSetup() {
  var h = bar('Examen blanc', '') + '<div class="wrap">';
  h += '<h1>📝 Examen blanc</h1><div class="sub">Conditions du concours : QCM chronométrés, correction détaillée à la fin.</div>';
  h += '<div class="card"><b>Périmètre</b><div class="spacer"></div><select id="scope" class="search">' +
    '<option value="0">Tous les modules</option>' +
    DOCS.map(function (d) { return '<option value="' + d.id + '">' + esc(d.code + '. ' + d.title) + '</option>'; }).join('') +
    '</select><div class="spacer"></div><b>Nombre de questions</b><div class="spacer"></div>' +
    '<div class="row3"><button class="btn ghost sm nsel" data-n="20">20</button><button class="btn ghost sm nsel" data-n="40">40</button><button class="btn ghost sm nsel" data-n="60">60</button></div>' +
    '<div class="spacer"></div><label class="row"><input type="checkbox" id="chrono" checked> <span>Chronomètre (45 s / question)</span></label>' +
    '<div class="spacer"></div><button class="btn gold" data-act="startexam">Lancer l\'examen</button></div>';
  if (S.exams.length) {
    h += '<h2>Historique</h2>';
    S.exams.slice(-10).reverse().forEach(function (e) {
      h += '<div class="card tight row"><div style="flex:1"><b>' + e.pct + '%</b> <span class="sub">· ' + e.n + ' Q · ' + esc(e.scope) + '</span>' +
        '<div class="sub">' + e.date + ' · ' + Math.floor(e.secs / 60) + ' min</div></div>' +
        '<span class="badge ' + (e.pct >= 70 ? 'ok' : 'hot') + '">' + (e.pct >= 70 ? 'admis' : 'à travailler') + '</span></div>';
    });
  }
  h += '</div>';
  return h;
}
var EXN = 40, EXTIMER = null;
function startExam() {
  var scope = +(el('scope') ? el('scope').value : 0);
  var chrono = el('chrono') ? el('chrono').checked : true;
  var pool = allQuestions(scope || null);
  if (pool.length < 5) { toast('Pas assez de questions'); return; }
  var n = Math.min(EXN, pool.length);
  RUN = {
    mode: 'exam', items: shuffle(pool).slice(0, n), i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [],
    t0: Date.now(), back: 'exam', did: null, ui: null,
    scope: scope ? doc(scope).code + '. ' + doc(scope).title : 'Tous les modules',
    end: chrono ? Date.now() + n * 45000 : 0
  };
  ROOT.innerHTML = quizFrame() + navBar('exam'); bind(); tickExam();
}
function tickExam() {
  clearInterval(EXTIMER);
  if (!RUN || RUN.mode !== 'exam' || !RUN.end) return;
  EXTIMER = setInterval(function () {
    var t = el('tm'); if (!t) return;
    var left = Math.max(0, RUN.end - Date.now());
    var m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
    t.textContent = m + ':' + pad(s);
    if (left < 60000) t.classList.add('warn');
    if (left <= 0) { clearInterval(EXTIMER); RUN.i = RUN.items.length; ROOT.innerHTML = examEnd() + navBar('exam'); bind(); }
  }, 500);
}
function examEnd() {
  clearInterval(EXTIMER);
  var R = RUN, tot = R.items.length, pct = tot ? Math.round(R.ok / tot * 100) : 0;
  var secs = Math.round((Date.now() - R.t0) / 1000);
  addXP(R.xp + 25);
  S.exams.push({ date: today(), n: tot, pct: pct, secs: secs, scope: R.scope });
  save();
  if (pct >= 70) { beep('up'); confetti(); }
  var h = bar('Résultat examen', 'exam') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:14px 0 2px">' + (pct >= 80 ? '🥇' : pct >= 70 ? '🎓' : pct >= 50 ? '📈' : '📚') + '</div>' +
    '<h1>' + pct + '% · ' + R.ok + '/' + tot + '</h1>' +
    '<div class="sub">' + esc(R.scope) + ' · ' + Math.floor(secs / 60) + ' min ' + pad(secs % 60) + ' s</div>' +
    '<div class="row3" style="margin:16px 0">' +
    '<div class="stat"><div class="v">' + R.ok + '</div><div class="l">justes</div></div>' +
    '<div class="stat"><div class="v">' + R.ko + '</div><div class="l">faux</div></div>' +
    '<div class="stat"><div class="v">' + Math.round(secs / Math.max(1, tot)) + 's</div><div class="l">/question</div></div></div>';
  if (R.wrong.length) {
    h += '<div class="card" style="text-align:left"><b>Correction des erreurs</b>';
    R.wrong.forEach(function (it) {
      h += '<div class="hr"></div><div style="font-size:13.6px"><div style="font-weight:700">' + rich(it.q.q) + '</div>' +
        '<div style="color:var(--green-dk);margin:3px 0"><b>➜ ' + rich(it.q.o[it.q.c]) + '</b></div>' +
        (it.q.e ? '<div class="sub">' + rich(it.q.e) + '</div>' : '') +
        '<div class="sub" style="margin-top:3px">' + esc(doc(it.d).code + ' · ' + unit(it.d, it.u).t) + '</div></div>';
    });
    h += '</div>';
  }
  h += '<button class="btn" data-go="exam">Retour</button></div>';
  return h;
}

/* ------------------------------------------------------------- vue STATS */
function vStats() {
  var days = [], t = today();
  for (var i = 6; i >= 0; i--) { var d = dayShift(t, -i); days.push([d, d === t ? S.xpDay : (S.hist[d] || 0)]); }
  var max = Math.max(10, Math.max.apply(null, days.map(function (x) { return x[1]; })));
  var totQ = 0, okQ = 0, koQ = 0, crowns = 0, maxc = 0;
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, i) { var s = ust(d.id, i); totQ += u.qs.length; okQ += s.ok; koQ += s.ko; crowns += s.crowns; maxc += CROWN_MAX; });
  });
  var h = bar('Statistiques', '') + '<div class="wrap">';
  h += '<div class="row3">' +
    '<div class="stat"><div class="v">' + S.xp + '</div><div class="l">XP total</div></div>' +
    '<div class="stat"><div class="v">' + S.streak + '</div><div class="l">série (record ' + S.best + ')</div></div>' +
    '<div class="stat"><div class="v">' + Math.round(crowns / Math.max(1, maxc) * 100) + '%</div><div class="l">maîtrise</div></div></div>';
  h += '<h2>7 derniers jours</h2><div class="card"><div class="bars">' +
    days.map(function (x) {
      var n = ['D', 'L', 'M', 'M', 'J', 'V', 'S'][new Date(x[0]).getDay()];
      return '<div class="b" style="height:' + Math.max(3, x[1] / max * 100) + '%;' + (x[1] === 0 ? 'background:var(--line)' : '') + '"><span>' + n + '</span></div>';
    }).join('') + '</div><div style="height:24px"></div>' +
    '<div class="sub center">' + days.reduce(function (a, x) { return a + x[1]; }, 0) + ' XP cette semaine</div></div>';
  h += '<h2>Réponses</h2><div class="row3">' +
    '<div class="stat"><div class="v">' + okQ + '</div><div class="l">justes</div></div>' +
    '<div class="stat"><div class="v">' + koQ + '</div><div class="l">fausses</div></div>' +
    '<div class="stat"><div class="v">' + (okQ + koQ ? Math.round(okQ / (okQ + koQ) * 100) : 0) + '%</div><div class="l">réussite</div></div></div>';
  h += '<h2>Points faibles</h2>';
  var weak = [];
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, i) { var s = ust(d.id, i); if (s.ok + s.ko >= 4) weak.push({ d: d, u: u, i: i, r: s.ok / (s.ok + s.ko), n: s.ok + s.ko }); });
  });
  weak.sort(function (a, b) { return a.r - b.r; });
  if (!weak.length) h += '<div class="card sub">Fais quelques quiz : tes unités les plus fragiles apparaîtront ici.</div>';
  weak.slice(0, 8).forEach(function (w) {
    h += '<div class="mod" data-go="lesson/' + w.d.id + '/' + w.i + '"><div class="bub">' + (w.u.ic || '📘') + '</div>' +
      '<div class="info"><div class="t">' + esc(w.u.t) + '</div><div class="p">' + esc(w.d.code + '. ' + w.d.title) + '</div></div>' +
      '<span class="badge ' + (w.r < .6 ? 'hot' : '') + '">' + Math.round(w.r * 100) + '%</span></div>';
  });
  h += '<h2>Révision espacée</h2>';
  var due = dueList().length, tot = Object.keys(S.srs).length;
  var stub = Object.keys(S.srs).filter(isStubborn).length;
  h += '<div class="card"><div class="row"><div style="flex:1"><b>' + due + '</b> item' + (due > 1 ? 's' : '') + ' à revoir aujourd\'hui' +
    '<div class="sub">' + tot + ' items suivis · ' + Math.round(coverage() * 100) + ' % de la banque vue' +
    (stub ? ' · 🔥 ' + stub + ' têtue(s)' : '') + '</div></div>' +
    '<button class="btn blue sm" style="width:auto;padding:10px 16px" data-go="review">Réviser</button></div></div>';
  h += '</div>';
  return h;
}

/* ---------------------------------------------------------- vue RÉGLAGES */
function vSettings() {
  var h = bar('Réglages', '') + '<div class="wrap">';
  h += '<div class="card"><b>Objectif quotidien</b><div class="sub">XP à gagner chaque jour pour garder ta série</div>' +
    '<div class="spacer"></div><div class="row3">' +
    [20, 50, 100].map(function (g) { return '<button class="btn ' + (S.goal === g ? '' : 'ghost') + ' sm" data-goal="' + g + '">' + g + ' XP</button>'; }).join('') +
    '</div></div>';
  h += '<div class="card"><b>Thème</b><div class="spacer"></div><div class="row3">' +
    [['auto', '🌗 Auto'], ['light', '☀️ Mode diurne'], ['dark', '🌙 Sombre']].map(function (t) {
      return '<button class="btn ' + (S.theme === t[0] ? '' : 'ghost') + ' sm" data-theme="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div></div>';
  h += '<div class="card"><label class="row" style="justify-content:space-between"><span><b>🔊 Le son est activé</b><div class="sub">Retour audio juste / faux</div></span>' +
    '<input type="checkbox" id="snd"' + (S.sound ? ' checked' : '') + ' style="width:22px;height:22px"></label>' +
    '<div class="hr"></div><label class="row" style="justify-content:space-between"><span><b>Cœurs illimités</b><div class="sub">Ne jamais être bloqué par les erreurs</div></span>' +
    '<input type="checkbox" id="unl"' + (S.unlimited ? ' checked' : '') + ' style="width:22px;height:22px"></label>' +
    '<div class="hr"></div><label class="row" style="justify-content:space-between"><span><b>Mise en forme des leçons</b><div class="sub">Couleurs (définition, date, chiffre, loi) et émojis comme les documents source</div></span>' +
    '<input type="checkbox" id="hlx"' + (S.hl ? ' checked' : '') + ' style="width:22px;height:22px"></label></div>';
  h += '<div class="card"><b>🔔 Rappels du concours</b><div class="sub">Autoriser les rappels de l’application sur cet appareil.</div><div class="spacer"></div><button class="btn blue sm" data-act="notify">' + (S.notify ? '✅ Rappels activés' : 'Activer les notifications') + '</button></div>';
  h += '<div class="card"><b>📲 Installation hors ligne</b><div class="sub">Si le bouton ne s’ouvre pas : menu du navigateur → « Ajouter à l’écran d’accueil ».</div><div class="spacer"></div><button class="btn blue sm" data-act="install">⬇️ Installer l’application</button></div>';
  h += '<div class="card"><b>Sauvegarde</b><div class="sub">Ta progression est stockée sur cet appareil. Exporte-la pour la transférer sur un autre (PC ↔ téléphone).</div>' +
    '<div class="spacer"></div><div class="row2"><button class="btn blue sm" data-act="export">⬇️ Exporter</button>' +
    '<button class="btn ghost sm" data-act="import">⬆️ Importer</button></div>' +
    '<div class="spacer"></div><button class="btn red sm" data-act="reset">🗑️ Réinitialiser la progression</button></div>';
  var nq = 0, nc = 0; DOCS.forEach(function (d) { d.units.forEach(function (u) { nq += u.qs.length; nc += u.cards.length; }); });
  h += '<div class="card sub center">Concours de santé · ' + DOCS.length + ' modules · ' + nq + ' QCM · ' + nc + ' flashcards<br>Contenu généré à partir des résumés « Prépare mon concours » (ANASS SLIT).</div>';
  h += '</div>';
  return h;
}

/* ---------------------------------------------------------- vue RECHERCHE */
var SQ = '';
function vSearch() {
  var q = SQ.toLowerCase().trim();
  var h = bar('Recherche', '') + '<div class="wrap">' +
    '<input class="search" id="q2" placeholder="🔎 Chercher…" value="' + esc(SQ) + '"><div class="spacer"></div>';
  if (q.length < 2) { h += '<div class="card sub">Tape au moins 2 caractères.</div></div>'; return h; }
  var res = [];
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, ui) {
      var score = 0;
      if ((u.t || '').toLowerCase().indexOf(q) >= 0) score += 3;
      if ((u.lesson || '').toLowerCase().indexOf(q) >= 0) score += 2;
      var hits = u.qs.filter(function (x) { return (x.q + ' ' + x.o.join(' ') + ' ' + (x.e || '')).toLowerCase().indexOf(q) >= 0; });
      var chits = u.cards.filter(function (c) { return (c.f + ' ' + c.b).toLowerCase().indexOf(q) >= 0; });
      score += hits.length + chits.length;
      if (score) res.push({ d: d, u: u, ui: ui, n: hits.length + chits.length, score: score, sample: (chits[0] ? chits[0].f + ' → ' + chits[0].b : hits[0] ? hits[0].q : '') });
    });
  });
  res.sort(function (a, b) { return b.score - a.score; });
  h += '<div class="sub">' + res.length + ' unité(s) trouvée(s)</div><div class="spacer"></div>';
  res.slice(0, 30).forEach(function (r) {
    h += '<div class="mod" data-go="lesson/' + r.d.id + '/' + r.ui + '"><div class="bub">' + (r.u.ic || '📘') + '</div>' +
      '<div class="info"><div class="t">' + esc(r.u.t) + '</div><div class="p">' + esc(r.d.code + '. ' + r.d.title) + ' · ' + r.n + ' occurrence(s)</div>' +
      (r.sample ? '<div class="p" style="opacity:.8">' + esc(String(r.sample).replace(/<[^>]+>/g, '').slice(0, 90)) + '…</div>' : '') +
      '</div></div>';
  });
  h += '</div>';
  return h;
}

/* ------------------------------------------------------------- bindings */
function bind() {
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-go]'), function (b) {
    b.onclick = function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); clearInterval(EXTIMER); go('/' + b.getAttribute('data-go')); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('.opt'), function (b) {
    b.onclick = function () { answer(b.getAttribute('data-opt')); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-act]'), function (b) {
    b.onclick = function () { act(b.getAttribute('data-act'), b); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('.nsel'), function (b) {
    b.onclick = function () {
      EXN = +b.getAttribute('data-n');
      Array.prototype.forEach.call(ROOT.querySelectorAll('.nsel'), function (x) { x.classList.add('ghost'); });
      b.classList.remove('ghost');
    };
    if (+b.getAttribute('data-n') === EXN) b.classList.remove('ghost');
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-goal]'), function (b) {
    b.onclick = function () { S.goal = +b.getAttribute('data-goal'); save(); render(); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-theme]'), function (b) {
    b.onclick = function () { S.theme = b.getAttribute('data-theme'); save(); applyTheme(); render(); };
  });
  var snd = el('snd'); if (snd) snd.onchange = function () { S.sound = snd.checked; save(); if (snd.checked) beep('ok'); };
  var unl = el('unl'); if (unl) unl.onchange = function () { S.unlimited = unl.checked; save(); toast(unl.checked ? '♾️ Cœurs illimités' : '❤️ Cœurs activés'); render(); };
  var hlx = el('hlx'); if (hlx) hlx.onchange = function () { S.hl = hlx.checked; save(); toast(hlx.checked ? '🖍️ Mise en forme activée' : 'Mise en forme désactivée'); };
  var q = el('q'); if (q) q.onkeyup = function (e) { if (q.value.length >= 2 && (e.key === 'Enter' || q.value.length > 2)) { SQ = q.value; go('/search'); } };
  var q2 = el('q2'); if (q2) { q2.oninput = function () { SQ = q2.value; clearTimeout(q2._t); q2._t = setTimeout(function () { var p = q2.selectionStart; render(); var n = el('q2'); if (n) { n.focus(); n.setSelectionRange(p, p); } }, 350); }; q2.focus(); }
  var flip = el('flip'); if (flip) flip.onclick = function () { doFlip(); };
  if (RUN && RUN.mode === 'exam' && RUN.items[RUN.i]) tickExam();
}
function doFlip() {
  var f = el('flip'); if (!f || f.classList.contains('on')) return;
  f.classList.add('on');
  el('cardbtns').innerHTML = '<div class="srsrow">' +
    '<button class="srsbtn again" data-g="0">Raté</button>' +
    '<button class="srsbtn hard" data-g="3">Dur</button>' +
    '<button class="srsbtn good" data-g="4">Bien</button>' +
    '<button class="srsbtn easy" data-g="5">Facile</button></div>';
  Array.prototype.forEach.call(el('cardbtns').querySelectorAll('[data-g]'), function (b) {
    b.onclick = function () { cardGrade(+b.getAttribute('data-g')); };
  });
}
function anchorSave(text, name) {
  try {
    var blob = new Blob([text], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    toast('Sauvegarde exportée');
  } catch (e) { toast('Export impossible sur cet appareil'); }
}
function act(a, b) {
  switch (a) {
    case 'quit':
      clearInterval(EXTIMER);
      if (RUN && RUN.xp > 0) { addXP(RUN.xp); toast('+' + RUN.xp + ' XP conservés'); }
      go('/' + (RUN && RUN.back ? RUN.back : ''));
      break;
    case 'flip': doFlip(); break;
    case 'again': if (RUN) go('/quiz/' + RUN.did + '/' + RUN.ui); break;
    case 'startexam': startExam(); break;
    case 'notify': requestNotifications(); break;
    case 'install': installApp(); break;
    case 'unlimited': S.unlimited = true; save(); toast('♾️ Cœurs illimités activés'); go('/'); break;
    case 'freeplay': {
      var pool = allQuestions(null);
      RUN = { mode: 'review', items: shuffle(pool).slice(0, 15), i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], t0: Date.now(), back: '', did: null, ui: null };
      ROOT.innerHTML = quizFrame() + navBar('review'); bind(); break;
    }
    case 'export': {
      var json = JSON.stringify(S), name = 'cnc-anass-progression-' + today() + '.json';
      if (window.claude && typeof window.claude.use === 'function') {
        window.claude.use('downloads').then(function (dl) {
          if (!dl) { anchorSave(json, name); return; }
          dl.save({ filename: name, data: json })
            .then(function () { toast('Sauvegarde enregistrée'); })
            .catch(function (e) {
              if (e && e.code === 'declined') return;
              if (e && (e.code === 'rate_limited')) { toast('Réessaie dans un instant'); return; }
              anchorSave(json, name);
            });
        }).catch(function () { anchorSave(json, name); });
      } else anchorSave(json, name);
      break;
    }
    case 'import': {
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json';
      inp.onchange = function () {
        var f = inp.files[0]; if (!f) return;
        var rd = new FileReader();
        rd.onload = function () {
          try { var o = JSON.parse(rd.result); if (o && o.v) { S = o; save(); toast('Progression importée'); render(); } else toast('Fichier invalide'); }
          catch (e) { toast('Fichier illisible'); }
        };
        rd.readAsText(f);
      };
      inp.click(); break;
    }
    case 'reset':
      if (confirm('Effacer toute la progression (XP, séries, couronnes, révisions) ?')) { S = blank(); save(); applyTheme(); toast('Progression réinitialisée'); go('/'); render(); }
      break;
  }
}

/* ------------------------------------------------------- fin de session */
var _endWrap = quizEnd;
function quizEndRouter() { return RUN && RUN.mode === 'exam' ? examEnd() : RUN && RUN.mode === 'review' ? reviewEnd() : _endWrap(); }
quizEnd = quizEndRouter;

/* clavier : 1-6 pour répondre, Entrée pour continuer */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { var n = el('next'); if (n) { n.click(); e.preventDefault(); return; } }
  if (/^[1-6]$/.test(e.key)) {
    var opts = ROOT.querySelectorAll('.opt:not([disabled])');
    var i = +e.key - 1; if (opts[i]) opts[i].click();
  }
  if (e.key === ' ') { var f = el('flip'); if (f && !f.classList.contains('on')) { doFlip(); e.preventDefault(); } }
});

/* ------------------------------------------------------------- démarrage */
function boot() {
  ROOT = el('app');
  applyTheme();
  if (!DOCS.length) { ROOT.innerHTML = '<div class="wrap"><div class="card">Aucune donnée chargée. Vérifie que les fichiers du dossier <b>data/</b> sont bien présents à côté de index.html.</div></div>'; return; }
  render();
  dailyReminder();
  setInterval(function () { if ((route()[0] || '') === '' ) { /* rafraîchit les cœurs sur l'accueil */ if (!S.unlimited && S.hearts < HEART_MAX) render(); } }, 60000);
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () { });
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

})();
