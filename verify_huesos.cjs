// Verifica las páginas de esqueleto + biologia index
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'biologia-index', url: 'http://localhost:8080/unidades/biologia/index.html' },
  { name: 'esqueleto-full', url: 'http://localhost:8080/unidades/biologia/cuerpo-humano/esqueleto.html' },
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

  for (const { name, url } of PAGES) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    // Scroll completo para activar lazy/animaciones
    await page.evaluate(async () => {
      const distance = 300;
      const delay = 80;
      const totalHeight = document.body.scrollHeight;
      let current = 0;
      while (current < totalHeight) {
        window.scrollBy(0, distance);
        current += distance;
        await new Promise(r => setTimeout(r, delay));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `huesos-${name}.png`), fullPage: true });
    console.log('OK: ' + name);
  }

  // También capturo una vista parcial de la card del cuerpo humano (donde reemplazamos el SVG)
  await page.goto('http://localhost:8080/unidades/biologia/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'huesos-biologia-card.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
  console.log('OK: biologia-card');

  await browser.close();
})();
