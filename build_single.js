const fs = require('fs');
const path = require('path');

const base = __dirname;
let html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
const icon = fs.readFileSync(path.join(base, 'icons', 'icon-192.png')).toString('base64');
const jobAlert = fs.readFileSync(path.join(base, 'assets', 'recrutement-huism6.jpg')).toString('base64');

html = html.replace('<link rel="stylesheet" href="app.css">', '<style>\n' + fs.readFileSync(path.join(base, 'app.css'), 'utf8') + '\n</style>');
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '');
html = html.replace(/<link rel="(icon|apple-touch-icon)" href="[^"]*">/g, (_, kind) => '<link rel="' + kind + '" href="data:image/png;base64,' + icon + '">');

function filesWithExtension(dir, extension) {
  return fs.readdirSync(dir).filter(name => name.toLowerCase().endsWith(extension)).sort();
}

function b64Map(dir, names, keyPrefix) {
  const result = {};
  names.forEach(name => { result[(keyPrefix || '') + name] = fs.readFileSync(path.join(dir, name)).toString('base64'); });
  return result;
}

html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  let code = fs.readFileSync(path.join(base, src), 'utf8');
  let extra = '';
  if (src === 'app.js') {
    const concoursDir = path.join(base, 'concours-commun');
    const courseDir = path.join(base, 'cours-pdf');
    const viewers = {};
    fs.readdirSync(concoursDir).filter(name => /^sujet-.*\.html$/.test(name)).sort().forEach(name => {
      viewers[name] = fs.readFileSync(path.join(concoursDir, name)).toString('base64');
    });
    const coursePdfs = b64Map(courseDir, filesWithExtension(courseDir, '.pdf'));
    const concoursPdfs = b64Map(concoursDir, filesWithExtension(concoursDir, '.pdf'), 'concours-commun/');
    const concoursFiles = {};
    filesWithExtension(concoursDir, '.pptx').forEach(name => {
      concoursFiles['concours-commun/' + name] = {
        data: fs.readFileSync(path.join(concoursDir, name)).toString('base64'),
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      };
    });
    const safeJson = value => JSON.stringify(value).replace(/<\//g, '<\\/');
    extra = '<script>window.CNC_CONCOURS_VIEWERS_B64=' + safeJson(viewers) +
      ';window.PREP_COURSE_PDFS_B64=' + safeJson(coursePdfs) +
      ';window.CNC_CONCOURS_PDFS_B64=' + safeJson(concoursPdfs) +
      ';window.CNC_CONCOURS_FILES_B64=' + safeJson(concoursFiles) + ';</script>\n';
    code = code.replaceAll('assets/recrutement-huism6.jpg', 'data:image/jpeg;base64,' + jobAlert);
  }
  return extra + '<script>\n' + code + '\n</script>';
});

html = html.replace("navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })", 'Promise.resolve()');
fs.writeFileSync(path.join(base, 'CNC_ANASS_App_MOBILE.html'), html, 'utf8');
console.log('OK -> CNC_ANASS_App_MOBILE.html', Math.round(Buffer.byteLength(html) / 1024), 'Ko');
