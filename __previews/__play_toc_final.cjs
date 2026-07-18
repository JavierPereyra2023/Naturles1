// Validación final: TOC en 8 páginas (mix de unidades, mix de estructura main/article)
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const pages = [
    'unidades/biologia/animales/vertebrados.html',
    'unidades/biologia/cuerpo-humano/esqueleto.html',
    'unidades/biologia/celulas/niveles-organizacion.html',
    'unidades/biologia/ecologia/factores-poblacionales.html',
    'unidades/biologia/plantas/fotosintesis.html',
    'unidades/biologia/seres-vivos/ecosistemas.html',
    'unidades/fisica/energia/formas-energia.html',
    'unidades/fisica/calor-sonido/sonido.html',
    'unidades/fisica/calor-sonido/calor-temperatura.html',
    'unidades/quimica/agua/potabilizacion.html',
    'unidades/fisica/movimientos/mruv.html',
  ];
  const allOk = true;
  for (const p of pages) {
    const page = await c.newPage();
    const errs = [];
    const consoleErrs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });
    const url = 'http://localhost:8080/' + p;
    const r = await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2200);
    const tocCount = await page.$$eval('[data-toc]', els => els.length);
    const hasAside = await page.$('aside.hidden.lg\\:block');
    const activeText = await page.$eval('.toc-link.active', el => el.textContent.trim()).catch(() => 'NONE');
    const slugOk = await page.$$eval('[data-toc]', els => {
      const links = Array.from(document.querySelectorAll('[data-toc]'));
      const sections = Array.from(document.querySelectorAll('section[id]'));
      return links.every(l => {
        const target = l.getAttribute('href').substring(1);
        return sections.some(s => s.id === target);
      });
    });
    console.log(p);
    console.log('  status:', r.status(), '| TOC:', tocCount, '| aside:', !!hasAside, '| active:', activeText, '| slugs_match:', slugOk);
    if (errs.length) console.log('  pageerrs:', errs);
    if (consoleErrs.length) console.log('  consoleErrs:', consoleErrs);
    await page.close();
  }
  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
