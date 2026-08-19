const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  // Bypass cache
  await page.route('**/*', (route) => {
    const headers = { ...route.request().headers() };
    headers['Cache-Control'] = 'no-cache';
    route.continue({ headers });
  });
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?v=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }));
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(800);
  const card = page.locator('a[href="animal.html"]').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await card.screenshot({ path: 'D:/naturales_1/output/inspect/cards/card_05_eucariota-animal-v2.png' });
  console.log('saved');
  await browser.close();
})();
