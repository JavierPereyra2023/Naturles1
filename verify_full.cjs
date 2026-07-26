// Verifica con screenshots fullpage
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'inicio-full', url: 'http://localhost:8080/inicio.html' },
  { name: 'fuerzas-hub-full', url: 'http://localhost:8080/unidades/fisica/fuerzas/index.html' },
  { name: 'fuerzas-gravedad-full', url: 'http://localhost:8080/unidades/fisica/fuerzas/gravedad.html' },
  { name: 'podcast-full', url: 'http://localhost:8080/podcast/index.html' },
  { name: 'fisica-index-full', url: 'http://localhost:8080/unidades/fisica/index.html' },
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
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}.png`), fullPage: true });
    console.log('OK: ' + name);
  }

  await browser.close();
})();
