const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {pathToFileURL}=require('node:url');
const {chromium}=require('C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 let server;
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},offline:true,acceptDownloads:true,serviceWorkers:'block'});
  await context.addInitScript(()=>{localStorage.setItem('prepme_profile_prompt_seen','1');localStorage.setItem('prepme_analytics_consent','denied');});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.setDefaultTimeout(60000);
  const url=pathToFileURL(path.join(root,'../CNC_ANASS_App_MOBILE.html')).href;
  await page.goto(url+'#/concours',{timeout:180000});
  await page.locator('.contribution-later').click();
  assert.equal(await page.evaluate(()=>window.PREP_CONCOURS_DOCS.every(p=>{
    const key=p.folder==='cours-pdf'?p.file:(p.folder||'concours-commun')+'/'+p.file;
    const data=p.folder==='cours-pdf'?window.PREP_COURSE_PDFS_B64[key]:p.format==='PDF'?window.CNC_CONCOURS_PDFS_B64[key]:window.CNC_CONCOURS_FILES_B64[key]?.data;
    return typeof data==='string' && (p.format!=='PDF' || data.startsWith('JVBERi0'));
  })),true);
  console.log('PASS all catalogue files embedded');
  const refs=await page.evaluate(()=>window.PREP_CONCOURS_DOCS.map((p,i)=>({p,i})).filter(x=>x.p.format==='PDF'));
  const selections=[refs.find(x=>x.p.folder==='cours-pdf'),refs.find(x=>x.p.folder==='concours-commun'&&/[éèà]/.test(x.p.file))];
  // Start with the user's exact action from the catalogue.
  await page.locator('[data-go^="concourspdf/"]').first().click();
  await page.waitForFunction(()=>/^Page 1 \/ \d+$/.test(document.getElementById('pdfPage')?.textContent||''));
  console.log('PASS Consulter -> first PDF renders offline');
  for(const {p,i} of selections){
   await page.evaluate(i=>location.hash='/concourspdf/'+i,i);
   await page.waitForFunction(()=>/^Page 1 \/ \d+$/.test(document.getElementById('pdfPage')?.textContent||''));
   assert.equal(await page.locator('iframe.pdf-native-frame').count(),0);
   assert(await page.locator('#pdfCanvas').evaluate(c=>c.width>0&&c.height>0));
   const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.pdf-download a').click()]);
   assert.deepEqual(fs.readFileSync(await download.path()),fs.readFileSync(path.join(root,p.folder,p.file)));
   await page.locator('#pdfNext').click();
   await page.waitForFunction(()=>/^Page 2 \/ /.test(document.getElementById('pdfPage')?.textContent||''));
   await page.locator('#pdfZoomIn').click();
   await page.waitForFunction(()=>document.getElementById('pdfZoom')?.textContent==='130%');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   console.log('PASS offline render, next, zoom, exact downloaded bytes:',p.file);
  }
  await page.evaluate(()=>location.hash='/pdfview/0/3');
  await page.waitForFunction(()=>/^Page 3 \/ /.test(document.getElementById('pdfPage')?.textContent||''));
  console.log('PASS course opens at requested page offline');
  await page.setViewportSize({width:1366,height:768});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.screenshot({path:path.join(root,'../tmp/pdf-fix-desktop.png')});
  assert.deepEqual(errors,[]);
  await context.close();
  server=http.createServer((req,res)=>{
   const filename=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html');
   fs.readFile(filename,(err,data)=>{if(err){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',filename.endsWith('.js')?'application/javascript':filename.endsWith('.pdf')?'application/pdf':filename.endsWith('.css')?'text/css':'text/html');res.end(data);});
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const web=await browser.newContext({serviceWorkers:'block'}),webpage=await web.newPage();
  await web.addInitScript(()=>{localStorage.setItem('prepme_profile_prompt_seen','1');localStorage.setItem('prepme_analytics_consent','denied');});
  webpage.on('pageerror',e=>errors.push(e.message));
  await webpage.goto('http://127.0.0.1:'+server.address().port+'/#/concourspdf/'+selections[1].i);
  await webpage.waitForFunction(()=>/^Page 1 \/ \d+$/.test(document.getElementById('pdfPage')?.textContent||''),null,{timeout:60000});
  assert.deepEqual(errors,[]);console.log('PASS HTTP PWA reader without embedded documents');
 }finally{if(server)server.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
