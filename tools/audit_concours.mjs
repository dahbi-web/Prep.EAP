#!/usr/bin/env node
// Audit reproductible de la section Concours : catalogue, fichiers et livraisons.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const app = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const root = path.resolve(app, '..');
const read = (p) => fs.readFileSync(p, 'utf8');
const exists = (p) => fs.existsSync(p);
const catalogPath = path.join(app, 'data', 'concours-catalog.js');
const context = { window: {} };
vm.runInNewContext(read(catalogPath), context, { filename: catalogPath });
const docs = context.window.PREP_CONCOURS_DOCS || [];
const appJs = read(path.join(app, 'app.js'));
const indexHtml = read(path.join(app, 'index.html'));
const sw = read(path.join(app, 'sw.js'));
const version = JSON.parse(read(path.join(app, 'version.json')));
const standalone = path.join(root, 'CNC_ANASS_App_MOBILE.html');
const external = path.join(app, 'CNC_ANASS_App_MOBILE.html');

const missing = docs.filter((d) => !exists(path.join(app, d.folder, d.file)));
const unsupported = docs.filter((d) => !['PDF', 'PPTX'].includes(d.format));
const badModuleLinks = docs.filter((d) => d.module && !exists(path.join(app, 'data', `doc${String(d.module).padStart(2, '0')}.js`)));
const badViewers = docs.filter((d) => d.viewer && !exists(path.join(app, 'concours-commun', d.viewer)));
const byCategory = docs.reduce((a, d) => ((a[d.category] = (a[d.category] || 0) + 1), a), {});
const byFormat = docs.reduce((a, d) => ((a[d.format] = (a[d.format] || 0) + 1), a), {});
const eap2023 = docs.find((d) => d.file === 'ilide.info-1er-epreuve-eap-cadre-infirmier-2023-pr_595e1d2e129f5e3d696b7c507cfb7b15.pdf');
const sha256 = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const hashes = new Map();
const duplicateContent = [];
for (const document of docs) {
  const filePath = path.join(app, document.folder, document.file);
  const hash = sha256(filePath);
  if (hashes.has(hash)) duplicateContent.push([hashes.get(hash), `${document.folder}/${document.file}`]);
  else hashes.set(hash, `${document.folder}/${document.file}`);
}
const standaloneMatch = exists(standalone) && exists(external) && sha256(standalone) === sha256(external);
const standaloneText = exists(standalone) ? read(standalone) : '';
const checks = {
  catalogLoaded: docs.length > 0,
  filesPresent: missing.length === 0,
  catalogContentUnique: duplicateContent.length === 0,
  formatsSupported: unsupported.length === 0,
  eap2023Present: Boolean(eap2023 && eap2023.category === 'EAP / échelle 11' && eap2023.correction === false),
  moduleLinksValid: badModuleLinks.length === 0,
  viewerLinksValid: badViewers.length === 0,
  catalogScriptLoaded: indexHtml.includes('data/concours-catalog.js'),
  filteringImplemented: appJs.includes('concoursSearch') && appJs.includes('concoursFilter'),
  offlinePdfDownloadImplemented: appJs.includes('data-concours-download') && appJs.includes(' download href='),
  pptxPackagedSupport: standaloneText.includes('qcm-echelle-11-2015-corrige.pptx') && exists(path.join(app, 'concours-commun', 'qcm-echelle-11-2015-corrige.pptx')),
  mobileEntrypointLean: exists(standalone) && fs.statSync(standalone).size < 25 * 1024 * 1024,
  binaryPayloadsLazy: !standaloneText.includes('window.PREP_COURSE_PDFS_B64=') && !standaloneText.includes('window.CNC_CONCOURS_PDFS_B64='),
  standaloneVersionMatches: standaloneText.includes(version.version),
  cacheMatchesVersion: version.cache === (sw.match(/cnc-anass-v\d+/) || [])[0],
  standaloneCopiesMatch: standaloneMatch,
};
const failures = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
const result = {
  ok: failures.length === 0,
  version: version.version,
  cache: version.cache,
  documents: docs.length,
  byFormat,
  byCategory,
  failures,
  missing: missing.map((d) => `${d.folder}/${d.file}`),
  unsupported: unsupported.map((d) => `${d.format}: ${d.file}`),
  badModuleLinks: badModuleLinks.map((d) => d.file),
  badViewers: badViewers.map((d) => d.viewer),
  duplicateContent,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
