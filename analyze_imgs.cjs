// Analiza SOLO el área de imagen de la card (sin texto)
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

  // Saca la imagen directa, sin el wrap
  const img = page.locator('a[href="animal.html"] img').first();
  const buf = await img.screenshot();
  fs.writeFileSync('D:/naturales_1/output/inspect/cards/eucariota-animal-only-img.png', buf);

  // Análisis del centro de masa del brillo
  const data = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await new Promise((r) => { img.onload = r; });
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, img.width, img.height).data;
    let sumX = 0, sumY = 0, sumW = 0;
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const i = (y * img.width + x) * 4;
        const lum = (d[i] + d[i+1] + d[i+2]) / 3;
        if (lum > 30) { sumX += x * lum; sumY += y * lum; sumW += lum; }
      }
    }
    return { w: img.width, h: img.height, cx: sumX / sumW, cy: sumY / sumW, normX: (sumX / sumW) / img.width, normY: (sumY / sumW) / img.height };
  }, buf.toString('base64'));
  console.log('Animal cell image only:', data);

  // Comparar con otras cells
  const targets = [
    { sel: 'a[href="procariota.html"] img', name: 'procariota' },
    { sel: 'a[href="vegetal.html"] img', name: 'vegetal' },
    { sel: 'a[href="animal.html"] img', name: 'animal' },
    { sel: 'a[href="membrana.html"] img', name: 'membrana' },
    { sel: 'a[href="neurona.html"] img', name: 'neurona' },
    { sel: 'a[href="tipos-celulas.html"] img', name: 'tipos' },
    { sel: 'a[href="organelas.html"] img', name: 'organelas' },
    { sel: 'a[href="niveles-organizacion.html"] img', name: 'niveles' },
  ];
  for (const t of targets) {
    const im = page.locator(t.sel).first();
    const b = await im.screenshot();
    const d = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await new Promise((r) => { img.onload = r; });
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, img.width, img.height).data;
      let sumX = 0, sumY = 0, sumW = 0;
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const i = (y * img.width + x) * 4;
          const lum = (d[i] + d[i+1] + d[i+2]) / 3;
          if (lum > 30) { sumX += x * lum; sumY += y * lum; sumW += lum; }
        }
      }
      return { w: img.width, h: img.height, cx: sumX / sumW, cy: sumY / sumW, normX: (sumX / sumW) / img.width, normY: (sumY / sumW) / img.height };
    }, b.toString('base64'));
    console.log(`${t.name.padEnd(12)} ${d.w}x${d.h}  center=(${d.cx.toFixed(0)},${d.cy.toFixed(0)})  normX=${d.normX.toFixed(2)} normY=${d.normY.toFixed(2)}`);
  }
  await browser.close();
})();
