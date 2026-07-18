// Screenshots de validación visual
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const pages = [
    { url: 'unidades/biologia/celulas/niveles-organizacion.html', out: 'toc_v2_celulas.png' },
    { url: 'unidades/biologia/ecologia/factores-poblacionales.html', out: 'toc_v2_ecologia.png' },
    { url: 'unidades/fisica/energia/formas-energia.html', out: 'toc_v2_energia.png' },
    { url: 'unidades/quimica/agua/potabilizacion.html', out: 'toc_v2_quimica.png' },
  ];
  for (const t of pages) {
    const p = await c.newPage();
    await p.goto('http://localhost:8080/' + t.url, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2200);
    // Scroll al top para mostrar el TOC
    await p.evaluate(() => window.scrollTo(0, 200));
    await p.waitForTimeout(500);
    await p.screenshot({ path: 'D:/naturales_1/__previews/' + t.out, fullPage: false });
    await p.close();
  }
  await b.close();
  console.log('done');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
