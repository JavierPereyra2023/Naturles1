// Verifica visualmente las páginas críticas con Playwright (Node.js)
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'inicio', url: 'http://localhost:8080/inicio.html' },
  { name: 'fuerzas-hub', url: 'http://localhost:8080/unidades/fisica/fuerzas/index.html' },
  { name: 'fuerzas-gravedad', url: 'http://localhost:8080/unidades/fisica/fuerzas/gravedad.html' },
  { name: 'fuerzas-electromag', url: 'http://localhost:8080/unidades/fisica/fuerzas/electromagnetismo.html' },
  { name: 'fuerzas-nuclear-fuerte', url: 'http://localhost:8080/unidades/fisica/fuerzas/nuclear-fuerte.html' },
  { name: 'fuerzas-nuclear-debil', url: 'http://localhost:8080/unidades/fisica/fuerzas/nuclear-debil.html' },
  { name: 'fuerzas-rozamiento', url: 'http://localhost:8080/unidades/fisica/fuerzas/rozamiento.html' },
  { name: 'fisica-index', url: 'http://localhost:8080/unidades/fisica/index.html' },
  { name: 'podcast', url: 'http://localhost:8080/podcast/index.html' },
];

const OUTPUT_DIR = 'D:/naturales_1/output/playwright';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const results = [];
  for (const { name, url } of PAGES) {
    const errors = [];
    const consoleListener = (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    };
    const pageErrorListener = (err) => errors.push(`pageerror: ${err.message}`);
    page.on('console', consoleListener);
    page.on('pageerror', pageErrorListener);

    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const status = resp ? resp.status() : '?';
      await page.waitForTimeout(2000);

      const title = await page.title();
      const h1 = await page.locator('h1').first().textContent().catch(() => '(no h1)');
      const brokenImgs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src);
      });
      const objectCount = await page.evaluate(() => document.querySelectorAll('object').length);

      await page.screenshot({ path: path.join(OUTPUT_DIR, `verify_${name}.png`), fullPage: false });

      results.push({
        name, status, title: title.slice(0, 60),
        h1: (h1 || '').slice(0, 80),
        broken_images: brokenImgs.length,
        broken_list: brokenImgs.slice(0, 3),
        objects: objectCount,
        errors: errors.slice(0, 3),
      });
    } catch (e) {
      results.push({ name, status: 'EXCEPTION', error: String(e).slice(0, 200) });
    }
    page.off('console', consoleListener);
    page.off('pageerror', pageErrorListener);
  }

  await browser.close();

  console.log('='.repeat(80));
  console.log('RESULTADO DE LA VERIFICACIÓN');
  console.log('='.repeat(80));
  for (const r of results) {
    console.log(`\n--- ${r.name} ---`);
    for (const [k, v] of Object.entries(r)) {
      if (k === 'name') continue;
      if (k === 'errors' && v.length) {
        console.log(`  ${k}:`);
        v.forEach((e) => console.log(`    - ${e}`));
      } else if (k === 'broken_list' && v.length) {
        console.log(`  ${k}:`, v);
      } else {
        console.log(`  ${k}:`, v);
      }
    }
  }
  console.log('\n' + '='.repeat(80));
  const ok = results.filter((r) => r.status === 200).length;
  console.log(`RESUMEN: ${ok}/${results.length} páginas OK`);
  if (ok === results.length) console.log('✓ Todas las páginas cargan correctamente');
  else console.log('✗ Hay páginas con problemas, revisar arriba');
})();
