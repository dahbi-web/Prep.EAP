#!/usr/bin/env node
// Synchronise le catalogue Concours avec les documents locaux sans perdre les métadonnées éditoriales existantes.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const app = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalogPath = path.join(app, 'data', 'concours-catalog.js');
const categoryOrder = [
  'EAP / échelle 11',
  'Textes officiels EAP',
  'Concours commun / national',
  'CHU',
  'Concours régionaux',
  'Recrutement / spécialité',
  'QCM / bases',
  'Autres documents',
];

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(catalogPath, 'utf8'), context, { filename: catalogPath });
const previous = context.window.PREP_CONCOURS_DOCS || [];
const byPath = new Map(previous.map((document) => [`${document.folder}/${document.file}`, document]));

const norm = (value) => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
const years = (name) => [...new Set(name.match(/20\d{2}/g) || [])].map(Number).sort();
const title = (name) => path.parse(name).name.replaceAll('_', ' ').replaceAll('^F', '–').replace(/\s+/g, ' ').trim();

function classify(name) {
  const value = norm(name);
  if (value.includes('statut') || value.includes('statuinf') || value.includes('decret') || value.includes('exa-con')) {
    return ['Textes officiels EAP', 'Texte officiel à consulter'];
  }
  if (/\beap\b/.test(value) || value.includes('echelle') || value.includes('concours-ide')) {
    return ['EAP / échelle 11', 'Préparation EAP ou échelle 11'];
  }
  if (value.includes('qcm') || value.includes('loi') || value.includes('carte sanitaire') || value.includes('economie') || value.includes('sns_')) {
    return ['QCM / bases', 'QCM ou support de santé publique'];
  }
  if (value.includes('chu')) return ['CHU', 'Sujet d’un centre hospitalier universitaire'];
  if (value.includes('special') || value.includes('tth') || value.includes('recrut')) {
    return ['Recrutement / spécialité', 'Sujet de recrutement ou de spécialité'];
  }
  if (['marrakech', 'draa', 'tanger', 'laayoune', 'dakhla', 'agadir', 'fes', 'goulmim', 'beni', 'souss', 'rabat', 'casa', 'oujda'].some((part) => value.includes(part))) {
    return ['Concours régionaux', 'Sujet régional ou local'];
  }
  if (['commun', 'national', 'etat', 'cnc', 'concours'].some((part) => value.includes(part))) {
    return ['Concours commun / national', 'Sujet commun, national ou d’État'];
  }
  return ['Autres documents', 'Document de concours à classer'];
}

function createEntry(folder, file, source, module = null) {
  const [category, note] = classify(file);
  const value = norm(file);
  return {
    folder,
    file,
    format: path.extname(file).slice(1).toUpperCase() || 'FICHIER',
    title: title(file),
    category,
    note,
    years: years(file),
    correction: /corrig|justification|correction|(?<!e)preuve/.test(value),
    official: category === 'Textes officiels EAP',
    viewer: null,
    source,
    module,
  };
}

const discovered = [];
const contentHashes = new Set();
function addUnique(document) {
  const filePath = path.join(app, document.folder, document.file);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
  if (contentHashes.has(hash)) return;
  contentHashes.add(hash);
  discovered.push(document);
}
const concoursDir = path.join(app, 'concours-commun');
const concoursFiles = fs.readdirSync(concoursDir).filter((file) => /\.(pdf|pptx|ppt)$/i.test(file));
concoursFiles.sort((a, b) => {
  const duplicatePenalty = (name) => /_1\.[^.]+$/i.test(name) ? 1 : 0;
  return duplicatePenalty(a) - duplicatePenalty(b) || norm(a).localeCompare(norm(b), 'fr');
});
for (const file of concoursFiles) {
  if (!/\.(pdf|pptx|ppt)$/i.test(file)) continue;
  const key = `concours-commun/${file}`;
  addUnique(byPath.get(key) || createEntry('concours-commun', file, /\.pptx?$/i.test(file) ? 'PPTX ISPITS local' : 'PDF local'));
}

const courseDir = path.join(app, 'cours-pdf');
const courseFiles = fs.readdirSync(courseDir).sort((a, b) => {
  const knownMislabelPenalty = (name) => /43- EAP - decret-2-93-308\.pdf$/i.test(name) ? 1 : 0;
  return knownMislabelPenalty(a) - knownMislabelPenalty(b) || norm(a).localeCompare(norm(b), 'fr');
});
for (const file of courseFiles) {
  const match = file.match(/^(32|33|35|36|37|38|39|40|41|42|43|44|45)- EAP.*\.pdf$/i);
  if (!match) continue;
  const key = `cours-pdf/${file}`;
  addUnique(byPath.get(key) || createEntry('cours-pdf', file, 'PDF EAP intégré au cours', Number(match[1])));
}

discovered.sort((a, b) => {
  const category = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  if (category) return category;
  const year = (b.years.at(-1) || 0) - (a.years.at(-1) || 0);
  return year || a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
});

const payload = JSON.stringify(discovered);
fs.writeFileSync(catalogPath, `/* Catalogue généré depuis les PDF locaux — organisation sans validation automatique. */\nwindow.PREP_CONCOURS_DOCS=${payload};\n`, 'utf8');
console.log(JSON.stringify({ documents: discovered.length, added: discovered.length - previous.length, categories: [...new Set(discovered.map((item) => item.category))] }, null, 2));
