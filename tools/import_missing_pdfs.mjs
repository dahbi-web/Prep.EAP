import fs from 'fs';
import path from 'path';
import * as pdfjs from 'file:///C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const root = 'C:/Users/hp/Downloads/CNC 26 ANASS-20260729T200151Z-1-001/CNC 26 ANASS';
const out = 'C:/Users/hp/Downloads/CNC 26 ANASS-20260729T200151Z-1-001/CNC_ANASS_App/data';
const missing = [9,10,12,13,14,15,17,18,19,20,21,23,24];
const files = fs.readdirSync(root).filter(x => /^\d\d- .*\.pdf$/i.test(x));
const esc = s => s.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$').replace(/</g,'&lt;').replace(/>/g,'&gt;');
for (const id of missing) {
  const name = files.find(x => x.startsWith(String(id).padStart(2,'0')+'- '));
  if (!name) continue;
  const buf = new Uint8Array(fs.readFileSync(path.join(root,name)));
  const pdf = await pdfjs.getDocument({data:buf}).promise;
  const units=[]; const seen=new Set();
  for (let n=1;n<=pdf.numPages;n++) {
    const page=await pdf.getPage(n); const c=await page.getTextContent();
    let text=c.items.map(x=>String(x.str||'').trim()).filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
    if (!text || seen.has(text)) continue; seen.add(text);
    const title=text.slice(0,90).replace(/[<>]/g,'');
    units.push({t:`Page ${n} — ${title}`,ic:'📄',pages:`p.${n}`,lesson:`<h3>📄 Contenu extrait du PDF — page ${n}</h3><p>${esc(text)}</p>`,qs:[],cards:[{f:`Document ${id} — page ${n}`,b:esc(text.slice(0,500))}]});
  }
  const title=name.replace(/^\d\d- /,'').replace(/\.pdf$/i,'');
  const js=`/* Module ${String(id).padStart(2,'0')} — import source PDF, sans duplication de pages */\n(window.CNC_DATA=window.CNC_DATA||{docs:[]}).docs.push(${JSON.stringify({id,code:String(id).padStart(2,'0'),title,sub:`Document PDF — ${name}`,icon:'📚',units},null,0)});\n`;
  fs.writeFileSync(path.join(out,`doc${String(id).padStart(2,'0')}.js`),js,'utf8');
}
console.log('Imported',missing.length,'PDF modules');
