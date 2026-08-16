// Screenshots de las páginas modificadas para verificar visualmente
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const OUT  = 'D:/naturales_1/output/screens';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: 'inicio',                  url: '/inicio.html' },
  { name: 'biologia-celulas',        url: '/unidades/biologia/celulas/index.html' },
  { name: 'biologia-ecologia',       url: '/unidades/biologia/ecologia/index.html' },
  { name: 'biologia-reinos',         url: '/unidades/biologia/seres-vivos/reinos/index.html' },
  { name: 'quimica-agua',            url: '/unidades/quimica/agua/index.html' },
  { name: 'quimica-materia',         url: '/unidades/quimica/materia-propiedades/index.html' },
  { name: 'revista',                 url: '/revista/index.html' },
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  for (const p of PAGES) {
    const consoleErrs = [];
    const onConsole = (m) => { if (m.type() === 'error') consoleErrs.push(m.text()); };
    page.on('console', onConsole);
    try {
      const resp = await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 30000 });
      // 1) Forzar todas las imágenes lazy a eager
      await page.evaluate(() => {
        document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
      });
      // 2) Scroll para que las imágenes lazy se carguen
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 400) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 100));
        }
        window.scrollTo(0, 0);
      });
      // 3) Forzar carga de todas las imágenes
      await page.evaluate(() => Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 5000);
          });
        })
      ));
      await page.waitForTimeout(800);
      const file = path.join(OUT, `cards_${p.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const imgsTotal = await page.evaluate(() => document.images.length);
      const imgsOk = await page.evaluate(() => Array.from(document.images).filter(i => i.complete && i.naturalWidth > 0).length);
      console.log(`✓ ${p.name.padEnd(28)} → ${file}  (imgs: ${imgsOk}/${imgsTotal} OK, console errors: ${consoleErrs.length})`);
      if (consoleErrs.length) {
        consoleErrs.slice(0, 3).forEach(e => console.log(`    ! ${e.slice(0, 120)}`));
      }
    } catch (e) {
      console.log(`✗ ${p.name}: ${String(e).slice(0, 120)}`);
    }
    page.off('console', onConsole);
  }
  await browser.close();
})();
