const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route('**/*', (route) => { const h = Object.assign({}, route.request().headers(), { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }); route.continue({ headers: h }); });
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }); });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => { if (img.complete) return Promise.resolve(); return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); }); })));
  await page.waitForTimeout(1500);

  const card = page.locator('a[href="animal.html"]').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await card.screenshot({ path: 'D:/naturales_1/output/inspect/cards/FRESH_animal.png' });
  const info = await page.evaluate(() => {
    const img = document.querySelector('a[href="animal.html"] img');
    return { src: img.src, nw: img.naturalWidth, nh: img.naturalHeight };
  });
  console.log(info);
  await browser.close();
})();
