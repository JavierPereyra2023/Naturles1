// Captura la card del eucariota animal y analiza dónde está el centro de masa del brillo
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route('**/*', (route) => {
    const headers = { ...route.request().headers() };
    headers['Cache-Control'] = 'no-cache';
    route.continue({ headers });
  });
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?v=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }));
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(800);

  // Saca la card completa como PNG
  const card = page.locator('a[href="animal.html"]').first();
  const buf = await card.screenshot();
  fs.writeFileSync('D:/naturales_1/output/inspect/cards/eucariota-animal-full.png', buf);

  // Analizar la imagen con sharp-like approach (sin libs): leer el PNG y obtener el centro de masa
  // Usar Image() de canvas en el browser
  const data = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await new Promise((r) => { img.onload = r; });
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, img.width, img.height).data;
    // Calcular el centro de masa usando solo el canal de brillo (R+G+B)
    let sumX = 0, sumY = 0, sumW = 0;
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const i = (y * img.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        const lum = (r + g + b) / 3;
        if (lum > 50) {  // solo píxeles brillantes
          sumX += x * lum;
          sumY += y * lum;
          sumW += lum;
        }
      }
    }
    const cx = sumW > 0 ? sumX / sumW : img.width / 2;
    const cy = sumW > 0 ? sumY / sumW : img.height / 2;
    return { w: img.width, h: img.height, cx, cy, normX: cx / img.width, normY: cy / img.height };
  }, buf.toString('base64'));
  console.log('Image:', data);
  await browser.close();
})();
