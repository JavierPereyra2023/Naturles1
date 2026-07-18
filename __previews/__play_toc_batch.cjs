// Valida el TOC en varias páginas
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const pages = [
    'biologia/animales/vertebrados.html',
    'biologia/cuerpo-humano/esqueleto.html',
    'fisica/energia/formas-energia.html',
    'fisica/calor-sonido/sonido.html',
    'quimica/agua/potabilizacion.html',
  ];
  for (const p of pages) {
    const page = await c.newPage();
    const errs = [];
    const consoleErrs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });
    const url = 'http://localhost:8080/unidades/' + p;
    const r = await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2200);
    const tocCount = await page.$$eval('[data-toc]', els => els.length);
    const hasAside = await page.$('aside.hidden.lg\\:block');
    const activeText = await page.$eval('.toc-link.active', el => el.textContent.trim()).catch(() => 'NONE');
    console.log(p);
    console.log('  status:', r.status(), '| TOC links:', tocCount, '| aside:', !!hasAside, '| active:', activeText);
    if (errs.length) console.log('  errs:', errs);
    if (consoleErrs.length) console.log('  consoleErrs:', consoleErrs);
    await page.close();
  }
  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
