// Captura páginas con scroll previo para activar animaciones
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'inicio-scrolled', url: 'http://localhost:8080/inicio.html' },
  { name: 'fuerzas-hub-scrolled', url: 'http://localhost:8080/unidades/fisica/fuerzas/index.html' },
  { name: 'podcast-scrolled', url: 'http://localhost:8080/podcast/index.html' },
  { name: 'fisica-index-scrolled', url: 'http://localhost:8080/unidades/fisica/index.html' },
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
    // Hacer scroll hasta el fondo para activar todas las animaciones/lazy
    await page.evaluate(async () => {
      const distance = 200;
      const delay = 50;
      const totalHeight = document.body.scrollHeight;
      let current = 0;
      while (current < totalHeight) {
        window.scrollBy(0, distance);
        current += distance;
        await new Promise(r => setTimeout(r, delay));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}.png`), fullPage: true });
    console.log('OK: ' + name);
  }

  await browser.close();
})();
