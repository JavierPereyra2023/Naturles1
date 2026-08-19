const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route('**/*', (route) => { const h = { ...route.request().headers() }; h['Cache-Control'] = 'no-cache'; route.continue({ headers: h }); });
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?v=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }));
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => { if (img.complete) return Promise.resolve(); return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); }); })));
  await page.waitForTimeout(800);

  // Capturar todas las cards como screenshots
  const cardSel = ['tipos-celulas', 'organelas', 'niveles-organizacion', 'procariota', 'vegetal', 'animal', 'membrana', 'neurona'];
  for (const slug of cardSel) {
    const card = page.locator(`a[href="${slug}.html"]`).first();
    if (await card.count() === 0) continue;
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await card.screenshot({ path: `D:/naturales_1/output/inspect/cards/v3_${slug}.png` });
  }
  console.log('Saved all v3 cards');
  await browser.close();
})();
