const fs = require('fs');
const path = require('path');
const base = __dirname;
let html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
const icon = fs.readFileSync(path.join(base, 'icons', 'icon-192.png')).toString('base64');
html = html.replace('<link rel="stylesheet" href="app.css">', '<style>\n' + fs.readFileSync(path.join(base, 'app.css'), 'utf8') + '\n</style>');
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '');
html = html.replace(/<link rel="(icon|apple-touch-icon)" href="[^"]*">/g, (_, kind) => '<link rel="' + kind + '" href="data:image/png;base64,' + icon + '">');
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  const code = fs.readFileSync(path.join(base, src), 'utf8');
  let extra = '';
  if (src === 'app.js') {
    const dir = path.join(base, 'concours-commun');
    const viewers = {};
    fs.readdirSync(dir).filter(f => /^sujet-\d+\.html$/.test(f)).sort().forEach(f => { viewers[f] = fs.readFileSync(path.join(dir, f), 'base64'); });
    extra = '<script>window.CNC_CONCOURS_VIEWERS_B64=' + JSON.stringify(viewers).replace(/<\//g, '<\\/') + ';</script>\n';
  }
  return extra + '<script>\n' + code + '\n</script>';
});
html = html.replace("navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })", 'Promise.resolve()');
fs.writeFileSync(path.join(base, 'CNC_ANASS_App_MOBILE.html'), html, 'utf8');
console.log('OK -> CNC_ANASS_App_MOBILE.html', Math.round(Buffer.byteLength(html) / 1024), 'Ko');
