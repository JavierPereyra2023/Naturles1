const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = 'D:\\naturales_1';
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.webp': 'image/webp'
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(8080, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8080/unidades/biologia/cuerpo-humano/boca-masticacion.html', { waitUntil: 'networkidle' });
  const checks = [];
  for (const name of ['incisivos', 'caninos', 'premolares', 'molares']) {
    await page.click('#tab-' + name);
    await page.waitForTimeout(150);
    const title = await page.textContent('#tooth-title');
    const shape = await page.$eval('#toothShape path', el => el.getAttribute('d').slice(0, 20));
    checks.push(name + ' => title:' + title + ' | path:' + shape);
  }
  console.log('TABS:\n' + checks.join('\n'));
  await browser.close();
  server.close();
})();
