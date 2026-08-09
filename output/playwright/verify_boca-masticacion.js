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
  await page.waitForTimeout(1500);
  const result = await page.evaluate(() => {
    const images = [...document.images];
    return {
      title: document.title,
      brokenImages: images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sectionCount: document.querySelectorAll('main section').length,
      svgCount: document.querySelectorAll('svg').length,
      tocLinks: document.querySelectorAll('[data-toc]').length
    };
  });
  console.log('RESULT:', JSON.stringify(result, null, 2));
  await page.screenshot({ path: 'output/playwright/verify_boca-masticacion.png', fullPage: true });
  await page.goto('http://localhost:8080/unidades/biologia/cuerpo-humano/digestion.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'output/playwright/verify_digestion.png', fullPage: true });
  await browser.close();
  server.close();
})();
