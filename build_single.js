const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const base = __dirname;
const read = p => fs.readFileSync(path.join(base,p),'utf8');
const safe = s => s.replace(/<\/script/gi,'<\\/script');
const script = code => '<script>\n'+safe(code)+'\n</script>\n';
let html = read('index.html');
const dataUri = p => 'data:image/'+(p.endsWith('.png')?'png':'jpeg')+';base64,'+fs.readFileSync(path.join(base,p)).toString('base64');
html = html.replace(/<link rel="stylesheet" href="app\.css(?:\?[^\"]*)?">/,'<style>\n'+read('app.css')+'\n</style>');
html = html.replace('<link rel="manifest" href="manifest.webmanifest">','');
html = html.replace(/<link rel="(icon|apple-touch-icon)" href="[^"]*"[^>]*>/g,(_,kind)=>'<link rel="'+kind+'" href="'+dataUri('icons/icon-192.png')+'">');
const context={window:{}}; vm.createContext(context);
for(const p of ['pdfs.js','data/concours-catalog.js'])vm.runInContext(read(p),context);
const docs=[...context.window.PREP_PDFS.map(p=>({folder:'cours-pdf',file:p[2],format:'PDF'})),...context.window.PREP_CONCOURS_DOCS];
const output=path.join(base,'CNC_ANASS_App_MOBILE.html'), temp=output+'.tmp';
const fd=fs.openSync(temp,'w');
const write=s=>fs.writeSync(fd,s);
try {
  let cursor=0;
  for(const match of html.matchAll(/<script src="([^"]+)"><\/script>/g)){
    write(html.slice(cursor,match.index));
    const assetPath=match[1].split('?')[0];
    let code=read(assetPath);
    if(assetPath==='app.js'){
      // Keep base64 out of executable JavaScript and decode only the opened file.
      const ids=new Map(),entries=[],keys=new Set();
      for(const p of docs){
        const folder=p.folder||'concours-commun',key=folder==='cours-pdf'?p.file:folder+'/'+p.file;
        if(keys.has(key))continue; keys.add(key);
        const bytes=fs.readFileSync(path.join(base,folder,p.file));
        if(p.format==='PDF' && bytes.subarray(0,5).toString()!=='%PDF-')throw Error('Invalid PDF: '+key);
        const hash=crypto.createHash('sha256').update(bytes).digest('hex');
        let id=ids.get(hash);
        if(!id){id='embedded-document-'+ids.size;ids.set(hash,id);write('<script type="application/octet-stream" id="'+id+'">'+bytes.toString('base64')+'</script>\n');}
        entries.push([folder==='cours-pdf'?'PREP_COURSE_PDFS_B64':p.format==='PDF'?'CNC_CONCOURS_PDFS_B64':'CNC_CONCOURS_FILES_B64',key,id,p.format]);
      }
      write(script(`window.PREP_COURSE_PDFS_B64={};window.CNC_CONCOURS_PDFS_B64={};window.CNC_CONCOURS_FILES_B64={};
${JSON.stringify(entries)}.forEach(function(e){Object.defineProperty(window[e[0]],e[1],{enumerable:true,get:function(){var data=document.getElementById(e[2]).textContent;return e[3]==='PDF'?data:{data:data,type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'};}});});`));
      write('<script type="application/octet-stream" id="embedded-pdf-worker">'+fs.readFileSync(path.join(base,'vendor/pdf.worker.min.js')).toString('base64')+'</script>\n');
      write(script("window.PREP_PDF_WORKER_URL=URL.createObjectURL(new Blob([atob(document.getElementById('embedded-pdf-worker').textContent)],{type:'text/javascript'}));"));
      for(const asset of ['assets/prep-eap-accueil.jpg','assets/recrutement-huism6.jpg'])code=code.replaceAll(asset,dataUri(asset));
      code=code.replace("if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0)",'if (false)');
      console.log('Documents embedded:',entries.length,'references,',ids.size,'unique files');
    }
    write(script(code));cursor=match.index+match[0].length;
  }
  write(html.slice(cursor));
}finally{fs.closeSync(fd);}
fs.renameSync(temp,output);
console.log('OK ->',output,Math.round(fs.statSync(output).size/1024/1024),'MiB');
