// Auditoría de cards: verifica que cada card tenga imagen y que cargue OK
// Genera además un JSON con hallazgos para regenerar faltantes.
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const OUT  = 'D:/naturales_1/output';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Páginas "card-heavy": las que muestran la grilla principal de cards
const PAGES = [
  { name: 'inicio',            url: '/inicio.html' },
  { name: 'quimica-index',     url: '/unidades/quimica/index.html' },
  { name: 'fisica-index',      url: '/unidades/fisica/index.html' },
  { name: 'biologia-index',    url: '/unidades/biologia/index.html' },
  { name: 'fuerzas-hub',       url: '/unidades/fisica/fuerzas/index.html' },
  { name: 'podcast-index',     url: '/podcast/index.html' },
  { name: 'revista-index',     url: '/revista/index.html' },
  { name: 'biologia-celulas',  url: '/unidades/biologia/celulas/index.html' },
  { name: 'biologia-animales', url: '/unidades/biologia/animales/index.html' },
  { name: 'biologia-plantas',  url: '/unidades/biologia/plantas/index.html' },
  { name: 'biologia-ecologia', url: '/unidades/biologia/ecologia/index.html' },
  { name: 'biologia-reinos',   url: '/unidades/biologia/seres-vivos/reinos/index.html' },
  { name: 'biologia-cuerpo',   url: '/unidades/biologia/cuerpo-humano/index.html' },
  { name: 'fisica-energia',    url: '/unidades/fisica/energia/index.html' },
  { name: 'fisica-calor',      url: '/unidades/fisica/calor-sonido/index.html' },
  { name: 'fisica-movim',      url: '/unidades/fisica/movimientos/index.html' },
  { name: 'fisica-solar',      url: '/unidades/fisica/sistema-solar/index.html' },
  { name: 'quimica-agua',      url: '/unidades/quimica/agua/index.html' },
  { name: 'quimica-materia',   url: '/unidades/quimica/materia-propiedades/index.html' },
  { name: 'quimica-mezclas',   url: '/unidades/quimica/mezclas/index.html' },
];

// Detecta "cards" en una página
const CARD_SELECTORS = [
  'a[class*="card"]', '.unit-card', '.revista-card', '.card',
  'a[href*="/unidades/"]', 'a[href*="revista/"]', 'a[href*="podcast/"]',
  'a[href*="esi"]', 'a[href*="eai"]', 'a[href*="evaluaciones/"]',
  'article',
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const report = { pages: [], summary: { total: 0, ok: 0, missing_img: 0, broken_img: 0, no_img: 0, errors: 0 } };
  const allBroken = [];
  const allMissing = [];

  for (const p of PAGES) {
    const pageReport = { name: p.name, url: p.url, cards: [], consoleErrors: [], failed: false };
    const errs = [];
    const onConsole = (m) => { if (m.type() === 'error') errs.push(m.text()); };
    const onErr     = (e) => errs.push('pageerror: ' + e.message);
    page.on('console', onConsole);
    page.on('pageerror', onErr);

    try {
      const resp = await page.goto(BASE + p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      pageReport.status = resp ? resp.status() : '?';
      await page.waitForTimeout(1500);

      // Saca TODAS las cards detectables
      const cards = await page.evaluate((sels) => {
        const out = [];
        const seen = new Set();
        for (const sel of sels) {
          document.querySelectorAll(sel).forEach((el) => {
            // dedupe por href si existe, sino por texto
            const key = (el.getAttribute('href') || el.textContent.trim().slice(0, 60)).toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            const r = el.getBoundingClientRect();
            // sólo las visibles (>= 80x80)
            if (r.width < 80 || r.height < 80) return;
            const imgs = Array.from(el.querySelectorAll('img'));
            const objs = Array.from(el.querySelectorAll('object'));
            const bg   = getComputedStyle(el).backgroundImage;
            const hasBgImg = bg && bg !== 'none';
            out.push({
              href: el.getAttribute('href') || null,
              tag: el.tagName,
              text: (el.textContent || '').trim().slice(0, 60),
              images: imgs.map((i) => ({
                src: i.currentSrc || i.src,
                complete: i.complete,
                nw: i.naturalWidth,
                nh: i.naturalHeight,
                alt: i.alt,
              })),
              objects: objs.length,
              hasBgImg,
              rect: { w: Math.round(r.width), h: Math.round(r.height) },
            });
          });
        }
        return out;
      }, CARD_SELECTORS);

      pageReport.cards = cards.map((c) => {
        const brokenImgs = c.images.filter((i) => !i.complete || i.nw === 0);
        const hasAnyImg = c.images.length > 0 || c.objects > 0 || c.hasBgImg;
        return {
          ...c,
          brokenImgs: brokenImgs.map((b) => b.src),
          status: brokenImgs.length ? 'BROKEN' : (hasAnyImg ? 'OK' : 'NO_IMG'),
        };
      });

      pageReport.consoleErrors = errs.slice(0, 5);
      pageReport.cardCount     = pageReport.cards.length;
      pageReport.brokenCount   = pageReport.cards.filter((c) => c.status === 'BROKEN').length;
      pageReport.noImgCount    = pageReport.cards.filter((c) => c.status === 'NO_IMG').length;
    } catch (e) {
      pageReport.failed = true;
      pageReport.error = String(e).slice(0, 200);
      report.summary.errors++;
    }
    page.off('console', onConsole);
    page.off('pageerror', onErr);
    report.pages.push(pageReport);
  }

  await browser.close();

  // Acumular hallazgos
  for (const p of report.pages) {
    for (const c of p.cards || []) {
      report.summary.total++;
      if (c.status === 'OK') report.summary.ok++;
      else if (c.status === 'NO_IMG') { report.summary.no_img++; allMissing.push({ page: p.name, href: c.href, text: c.text }); }
      else if (c.status === 'BROKEN') {
        report.summary.broken_img++;
        c.brokenImgs.forEach((src) => allBroken.push({ page: p.name, href: c.href, src }));
      }
    }
  }

  // Guardar JSON
  fs.writeFileSync(path.join(OUT, 'audit_cards.json'), JSON.stringify(report, null, 2));

  // Imprimir resumen
  console.log('='.repeat(80));
  console.log('AUDITORÍA DE CARDS');
  console.log('='.repeat(80));
  console.log(`Total cards: ${report.summary.total}`);
  console.log(`  OK       : ${report.summary.ok}`);
  console.log(`  SIN IMG  : ${report.summary.no_img}`);
  console.log(`  IMG ROTA : ${report.summary.broken_img}`);
  console.log(`  Errores  : ${report.summary.errors}`);
  console.log('');
  console.log('DETALLE POR PÁGINA:');
  for (const p of report.pages) {
    const flag = p.failed ? '✗' : (p.brokenCount > 0 ? '⚠' : (p.noImgCount > 0 ? '·' : '✓'));
    console.log(`  ${flag} ${p.name.padEnd(20)} cards=${String(p.cardCount).padStart(3)} broken=${p.brokenCount} noImg=${p.noImgCount}${p.failed ? ' FAILED' : ''}`);
  }
  if (allBroken.length) {
    console.log('\nIMÁGENES ROTAS:');
    for (const b of allBroken) console.log(`  ✗ [${b.page}] ${b.src}`);
  }
  if (allMissing.length) {
    console.log('\nCARDS SIN IMAGEN (puede ser intencional, ej. links externos):');
    for (const m of allMissing) console.log(`  · [${m.page}] ${m.text}  (${m.href || ''})`);
  }
  console.log('\nReporte completo en: ' + path.join(OUT, 'audit_cards.json'));
})();
