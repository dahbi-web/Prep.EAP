const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const source = fs.readFileSync(path.join(root,'app.js'),'utf8');
const checks=[];
function check(name,fn){fn();checks.push(name);}
const values=new Map(), events={}, timers=new Map();let tid=0,failKey='';
const ctx={window:{addEventListener:(name,fn)=>events[name]=fn},document:{addEventListener(){},createElement(){return {style:{},remove(){}};},body:{appendChild(){}}},navigator:{},location:{protocol:'http:',hash:''},localStorage:{getItem:k=>values.get(k)||null,setItem(k,v){if(k===failKey)throw Error('quota');values.set(k,v);}},setTimeout(fn){timers.set(++tid,fn);return tid;},clearTimeout:id=>timers.delete(id),setInterval(){},clearInterval(){},console,Date,URL,Blob};
vm.createContext(ctx);
const boot=source.indexOf('/* ------------------------------------------------------------- démarrage */');
assert(boot>0);
vm.runInContext(source.slice(0,boot)+`window.audit={blank,isValidProgress,completeProgress,parseProgress,save,flushSave,load,grade,esc,get:()=>S,set:s=>S=s};})();`,ctx);
const api=ctx.window.audit;
check('progression actuelle acceptée',()=>assert(api.isValidProgress(api.blank())));
for(const [name,mutate] of [
 ['tableau à la place des unités',s=>s.units=[]],['couronnes hors limites',s=>s.units['1.0']={crowns:6}],
 ['historique mal typé',s=>s.exams={}],['XP texte',s=>s.xp='10'],['palier SRS hors limites',s=>s.srs['q1.0.0']={b:6,due:'2026-09-23'}],
 ['champ HTML dans historique',s=>s.exams=[{date:'<img src=x onerror=alert(1)>',secs:1}]],
 ['clé prototype',s=>s.units=JSON.parse('{"__proto__":{}}')],['version future incompatible',s=>s.v=999]
])check('rejet : '+name,()=>{const s=api.blank();mutate(s);assert.equal(api.isValidProgress(s),false);});
check('complétion des anciennes unités sans effacement',()=>{const s=api.blank();s.units['2.0']={crowns:2};api.completeProgress(s);assert.equal(s.units['2.0'].crowns,2);assert.equal(s.units['2.0'].runs,0);});
check('SRS : une erreur descend exactement de deux paliers',()=>{const s=api.blank();s.srs['q1.0.0']={b:4,due:'2026-09-23',lap:0,seen:2};api.set(s);api.grade('q1.0.0',0);assert.equal(api.get().srs['q1.0.0'].b,2);});
check('fermeture : écriture immédiate et trois copies',()=>{const s=api.blank();s.xp=123;api.set(s);api.save();events.pagehide();assert.equal(JSON.parse(values.get('cnc_anass_v2')).xp,123);assert(values.has('cnc_anass_v2_backup'));assert(values.has('cnc_anass_v2_backup2'));});
check('copie de secours indisponible : progression principale écrite',()=>{failKey='cnc_anass_v2_backup2';api.get().xp=124;api.save();api.flushSave();assert.equal(JSON.parse(values.get('cnc_anass_v2')).xp,124);failKey='';});
check('restauration depuis troisième copie',()=>{values.set('cnc_anass_v2','{');values.set('cnc_anass_v2_backup','{');assert.equal(api.load().xp,123);});
check('texte de recherche échappé pour attributs HTML',()=>assert.equal(api.esc('" onfocus="x'), '&quot; onfocus=&quot;x'));
check('copies illisibles préservées sans réinitialisation silencieuse',()=>{
 values.set('cnc_anass_v2','{corrupt');values.set('cnc_anass_v2_backup','{');values.set('cnc_anass_v2_backup2','{');
 api.set(api.load());api.save();assert.equal(api.flushSave(),false);assert.equal(values.get('cnc_anass_v2'),'{corrupt');
});

async function workerChecks(){
 const handlers={},deleted=[],added=[];let criticalFailure=false;
 const cache={add:async u=>added.push(u),addAll:async urls=>{if(criticalFailure)throw Error('missing app.js');added.push(...urls);},match:async()=>null,put:async()=>{}};
 const worker={self:{addEventListener:(n,fn)=>handlers[n]=fn,clients:{claim:async()=>{}},location:{origin:'https://test.local'},registration:{scope:'https://test.local/prep/'}},caches:{open:async()=>cache,keys:async()=>['cnc-anass-v84','cnc-anass-v85','other-app'],delete:async k=>deleted.push(k)},fetch:async()=>({ok:true,text:async()=>'{"folder":"cours-pdf","file":"test.pdf"}',clone(){return this;}}),URL,Response,Promise};
 vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),worker);
 let pending;handlers.install({waitUntil:p=>pending=p});await pending;
 assert(added.some(x=>x.includes('01- SNS Maroc.pdf')));checks.push('précache des premiers cours PDF');
 criticalFailure=true;handlers.install({waitUntil:p=>pending=p});await assert.rejects(pending);checks.push('installation incomplète refusée');
 handlers.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(deleted.sort(),['cnc-anass-v84','cnc-anass-v85']);checks.push('anciens caches PrepMe supprimés, caches des autres applications conservés');
 for(const url of ['https://third.party/track','https://test.local/prep/version.json','https://test.local/other/file']){
  let intercepted=false;handlers.fetch({request:{method:'GET',url},respondWith(){intercepted=true;}});assert.equal(intercepted,false);
 }checks.push('version et requêtes externes exclues du cache');
}
workerChecks().then(()=>console.log(JSON.stringify({ok:true,count:checks.length,checks},null,2))).catch(e=>{console.error(e);process.exitCode=1;});
