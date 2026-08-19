const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  // Cargar el .webp directamente
  await page.goto('http://localhost:8080/assets/biologia/celulas/animal-cell.webp?cb=' + Date.now(), { waitUntil: 'networkidle' });
  const title = await page.title();
  const info = await page.evaluate(() => { const img = document.querySelector('img'); return { nw: img?.naturalWidth, nh: img?.naturalHeight, w: img?.width, h: img?.height }; });
  console.log('Direct view title:', title);
  console.log('Direct view info:', info);
  await page.screenshot({ path: 'D:/naturales_1/output/inspect/cards/DIRECT_webp.png' });

  // Comparar con la card
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }); });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => { if (img.complete) return Promise.resolve(); return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); }); })));
  await page.waitForTimeout(1500);

  // Captura el img element directamente
  const img = page.locator('a[href="animal.html"] img').first();
  const box = await img.boundingBox();
  console.log('IMG box:', box);
  await img.screenshot({ path: 'D:/naturales_1/output/inspect/cards/IMG_element.png' });

  await browser.close();
})();
