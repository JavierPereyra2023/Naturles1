// Inspección detallada de las cards de celulas
const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'));
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*=".html"]'))
      .filter(a => a.querySelector('img'))
      .map(a => {
        const img = a.querySelector('img');
        const wrap = img.closest('.relative.h-40') || img.closest('.relative.h-44') || img.parentElement;
        const ir = img.getBoundingClientRect();
        const wr = wrap ? wrap.getBoundingClientRect() : ir;
        return {
          title: (a.querySelector('h3')?.textContent || '').trim().slice(0, 40),
          src: (img.currentSrc || img.src).split('/').pop(),
          imgRect: { w: Math.round(ir.width), h: Math.round(ir.height) },
          wrapRect: { w: Math.round(wr.width), h: Math.round(wr.height) },
          aspectImg: (ir.width / ir.height).toFixed(2),
          aspectWrap: (wr.width / wr.height).toFixed(2),
          nw: img.naturalWidth, nh: img.naturalHeight,
        };
      });
  });
  console.log('Card | img src | imgR | wrapR | imgA | wrapA | nWxnH');
  for (const d of data) {
    console.log(`${d.title.padEnd(28)} | ${d.src.padEnd(30)} | ${d.imgRect.w}x${d.imgRect.h} | ${d.wrapRect.w}x${d.wrapRect.h} | ${d.aspectImg} | ${d.aspectWrap} | ${d.nw}x${d.nh}`);
  }
  await browser.close();
})();
