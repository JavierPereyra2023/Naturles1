const http = require('http');
const fs = require('fs');
const path = require('path');
const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.svg':'image/svg+xml','.webp':'image/webp','.gif':'image/gif',
  '.ico':'image/x-icon','.mp4':'video/mp4','.webm':'video/webm',
  '.woff':'font/woff','.woff2':'font/woff2','.json':'application/json',
};
// Sirve favicon.svg cuando piden favicon.ico
const FAVICON_FALLBACK = 'favicon.svg';
const ROOT = 'D:/naturales_1';
http.createServer((req, res) => {
  let p = req.url === '/' ? '/index.html' : req.url;
  p = p.split('?')[0];
  // Favicon fallback: si piden favicon.ico y no existe, servir favicon.svg
  if (p === '/favicon.ico') {
    const svgPath = path.join(ROOT, FAVICON_FALLBACK);
    if (!fs.existsSync(path.join(ROOT, p)) && fs.existsSync(svgPath)) {
      res.writeHead(200, { 'Content-Type': MIME['.svg'] });
      fs.createReadStream(svgPath).pipe(res);
      return;
    }
  }
  const full = path.join(ROOT, p);
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + p); return; }
    const ext = path.extname(full).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8080, () => console.log('listening on 8080'));
