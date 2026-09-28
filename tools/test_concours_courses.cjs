const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const app = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(app, 'data', 'concours-courses.json'), 'utf8'));
const index = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const pdfsSource = fs.readFileSync(path.join(app, 'pdfs.js'), 'utf8');
const sw = fs.readFileSync(path.join(app, 'sw.js'), 'utf8');
const context = { window: { CNC_DATA: { docs: [] } } };

assert.equal(manifest.length, 31, '31 sources doivent devenir 31 modules documentaires');
assert.equal(manifest.reduce((sum, item) => sum + item.pages, 0), 388, 'toutes les pages sources doivent être intégrées');

for (const item of manifest) {
  const dataPath = path.join(app, 'data', item.dataFile);
  const pdfPath = path.join(app, 'cours-pdf', item.courseFile);
  assert(fs.existsSync(dataPath), `${item.dataFile} absent`);
  assert(fs.existsSync(pdfPath), `${item.courseFile} absent`);
  assert(index.includes(`data/${item.dataFile}`), `${item.dataFile} absent de index.html`);
  assert(pdfsSource.includes(item.courseFile), `${item.courseFile} absent de Cours PDF`);
  assert(sw.includes(`./data/${item.dataFile}`), `${item.dataFile} absent du cache`);
  assert(sw.includes(`./cours-pdf/${item.courseFile}`), `${item.courseFile} absent du cache`);
  vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), context, { filename: dataPath });
}

const imported = context.window.CNC_DATA.docs;
assert.equal(imported.length, 31);
assert.equal(imported.reduce((sum, document) => sum + document.units.length, 0), 388);
assert(imported.every((document) => document.units.every((unit) => unit.lesson && unit.pages && unit.qs.length === 0)));
assert(imported.every((document) => document.units.every((unit) => unit.lesson.includes('aucune réponse automatique'))));

console.log(JSON.stringify({
  ok: true,
  modules: imported.length,
  pages: imported.reduce((sum, document) => sum + document.units.length, 0),
  ocrChars: manifest.reduce((sum, item) => sum + item.ocrChars, 0),
  answersInvented: 0,
}, null, 2));
