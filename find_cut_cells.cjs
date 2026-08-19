// Encuentra la célula "cortada" más obvia
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

  // Detectar si la celda "más brillante" del contenido está en el centro o está corrida
  const analysis = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*=".html"]'))
      .filter(a => a.querySelector('img'))
      .map(a => {
        const img = a.querySelector('img');
        const title = (a.querySelector('h3')?.textContent || '').trim();
        // Buscar el centro de masa del brillo usando canvas
        const wrap = img.closest('.relative') || img.parentElement;
        const rect = wrap.getBoundingClientRect();
        return {
          title: title.slice(0, 35),
          src: (img.currentSrc || img.src).split('/').pop(),
          wrapW: Math.round(rect.width),
          wrapH: Math.round(rect.height),
          naturalRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
          wrapRatio: (rect.width / rect.height).toFixed(2),
          // Con object-cover, si la imagen es más ALTA (menor ratio) que el wrap, se recorta vertical
          // si es más ANCHA (mayor ratio) que el wrap, se recorta horizontal
        };
      });
  });
  console.log('Análisis de encuadre:');
  for (const a of analysis) {
    const orient = a.naturalRatio > a.wrapRatio ? 'recorta horizontal' : 'recorta vertical';
    console.log(`  ${a.title.padEnd(32)} nat=${a.naturalRatio}:1  wrap=${a.wrapRatio}:1  → ${orient}`);
  }
  await browser.close();
})();
