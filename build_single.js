const fs = require('fs');
const path = require('path');

const base = __dirname;
let html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
const icon = fs.readFileSync(path.join(base, 'icons', 'icon-192.png')).toString('base64');
const jobAlert = fs.readFileSync(path.join(base, 'assets', 'recrutement-huism6.jpg')).toString('base64');

html = html.replace('<link rel="stylesheet" href="app.css">', '<style>\n' + fs.readFileSync(path.join(base, 'app.css'), 'utf8') + '\n</style>');
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '');
html = html.replace(/<link rel="(icon|apple-touch-icon)" href="[^"]*"[^>]*>/g, (_, kind) => '<link rel="' + kind + '" href="data:image/png;base64,' + icon + '">');

html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  let code = fs.readFileSync(path.join(base, src), 'utf8');
  if (src === 'app.js') {
    code = code.replaceAll('assets/prep-eap-accueil.jpg', 'data:image/jpeg;base64,' + fs.readFileSync(path.join(base, 'assets', 'prep-eap-accueil.jpg')).toString('base64'));
    code = code.replaceAll('assets/recrutement-huism6.jpg', 'data:image/jpeg;base64,' + jobAlert);
  }
  return '<script>\n' + code.replace(/<\/script/gi, '<\\/script') + '\n</script>';
});

html = html.replace("if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0)", 'if (false)');
fs.writeFileSync(path.join(base, 'CNC_ANASS_App_MOBILE.html'), html, 'utf8');
console.log('OK -> CNC_ANASS_App_MOBILE.html', Math.round(Buffer.byteLength(html) / 1024), 'Ko');
