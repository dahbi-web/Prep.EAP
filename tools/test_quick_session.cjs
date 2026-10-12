const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const fn = source.slice(source.indexOf('function quickQuestions('), source.indexOf('function diagnosticQuestions('));
let pool = [], due = [], S = {srs:{}, units:{}};
const context = vm.createContext({
  allQuestions: () => pool, dueList: () => due,
  shuffle: list => list.slice().reverse(), uKey: (d,u) => d+'.'+u, S
});
vm.runInContext(fn, context);
function setup(total, seen) {
  pool = Array.from({length:total}, (_,i) => ({k:'q1.0.'+i,d:1,u:0,q:{q:'Question '+i}}));
  due = []; S.srs = {}; S.units = {'1.0':{ok:2,ko:3}};
  for (let i=0;i<seen;i++) S.srs[pool[i].k] = {lap:0};
}
function run(n) {
  const before = JSON.stringify(S), order = pool.map(x=>x.k).join();
  const result = context.quickQuestions(n);
  assert.equal(new Set(result.map(x=>x.k)).size, result.length);
  assert.equal(JSON.stringify(S), before, 'La sélection ne modifie pas la progression');
  assert.equal(pool.map(x=>x.k).join(), order, 'Ordre de la banque préservé');
  return result;
}
setup(40,15);
due = pool.slice(0,15).map(x=>x.k);
S.srs['q1.0.0'].lap = 3;
S.srs['q1.0.1'].lap = 1;
for (const n of [5,10]) {
  const result = run(n);
  assert.equal(result.length,n);
  assert.equal(result.filter(x=>!S.srs[x.k]).length,n*0.4);
  assert.equal(result[0].k,'q1.0.0');
  assert.equal(result[1].k,'q1.0.1');
}
setup(20,12); due = pool.slice(0,12).map(x=>x.k);
assert.equal(run(10).filter(x=>!S.srs[x.k]).length,0,'À 60 %, priorité aux révisions');
setup(12,0); assert.equal(run(10).length,10);
setup(12,12); assert.equal(run(10).length,10);
setup(12,1); assert.equal(run(10).length,10,'Complément neuf si peu de questions vues');
setup(3,1); assert.equal(run(10).length,3);
setup(0,0); assert.equal(run(5).length,0);
setup(12,12); S.srs['q1.0.0'].lap=4;
assert.equal(run(5)[0].k,'q1.0.0','Erreurs historiques avant les questions maîtrisées');
console.log('OK : quotas 5/10, priorités, seuil 60 %, petites banques, unicité et progression inchangée.');
