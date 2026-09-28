const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest':'application/manifest+json', '.pdf':'application/pdf', '.png': 'image/png', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  let clean;
  try { clean = decodeURIComponent((req.url || '/').split('?')[0]); } catch { res.writeHead(400).end('Bad request'); return; }
  const file = path.resolve(root, clean === '/' ? 'index.html' : clean.replace(/^\/+/, ''));
  if (!file.startsWith(root + path.sep) || clean.split(/[\\/]/).some(part => part.startsWith('.')) || /\.bak(?:_|$)/i.test(clean) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.statusCode = 404;
    return res.end('Not found');
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT || 8080), process.env.HOST || '127.0.0.1', () => console.log('PrepMe : http://localhost:' + (process.env.PORT || 8080)));
