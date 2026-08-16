// Auditoría v2: maneja lazy loading (fuerza eager) y separa cards sin imagen por categoría
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const OUT  = 'D:/naturales_1/output';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

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

// Tipos de selectors de "card" más específicos (excluyendo links externos, navegación)
const CARD_SELECTORS = [
  '.unit-card', '.revista-card', '.content-card',
  'a.card', 'article',
  'a[href*="/unidades/quimica/"]', 'a[href*="/unidades/fisica/"]', 'a[href*="/unidades/biologia/"]',
  'a[href*="/revista/"]', 'a[href*="/podcast/"]',
  'a[href*="esi"]', 'a[href*="eai"]',
  'a[href*="evaluaciones/"]',
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const report = { pages: [], broken_images: [], cards_no_image: [] };
  const summary = { total: 0, ok: 0, no_img: 0, broken_img: 0, errors: 0 };

  for (const p of PAGES) {
    const pageReport = { name: p.name, url: p.url, cards: [], errors: [] };
    const errs = [];
    const onConsole = (m) => { if (m.type() === 'error') errs.push(m.text()); };
    const onErr     = (e) => errs.push('pageerror: ' + e.message);
    page.on('console', onConsole);
    page.on('pageerror', onErr);

    try {
      const resp = await page.goto(BASE + p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      pageReport.status = resp ? resp.status() : '?';

      // Esperar a que la página se asiente
      await page.waitForTimeout(500);

      // 1) Forzar todas las imágenes lazy a eager y forzar carga
      await page.evaluate(() => {
        document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
      });
      // 2) Scroll para que las imágenes lazy se carguen
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 400) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });
      // 3) Esperar a que todas las imágenes terminen de cargar
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

      // 4) Detectar cards y sus imágenes
      const cards = await page.evaluate((sels) => {
        const out = [];
        const seen = new Set();
        for (const sel of sels) {
          document.querySelectorAll(sel).forEach((el) => {
            const href = el.getAttribute('href') || null;
            const key = (href || el.textContent.trim().slice(0, 60)).toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            const r = el.getBoundingClientRect();
            if (r.width < 80 || r.height < 80) return;
            const imgs = Array.from(el.querySelectorAll('img')).map((i) => ({
              src: i.currentSrc || i.src,
              complete: i.complete,
              nw: i.naturalWidth,
              nh: i.naturalHeight,
            }));
            const objs = Array.from(el.querySelectorAll('object'));
            out.push({
              href,
              text: (el.textContent || '').trim().slice(0, 80),
              images: imgs,
              objects: objs.length,
              rect: { w: Math.round(r.width), h: Math.round(r.height) },
            });
          });
        }
        return out;
      }, CARD_SELECTORS);

      pageReport.cards = cards.map((c) => {
        const brokenImgs = c.images.filter((i) => !i.complete || i.nw === 0);
        const hasAnyImg = c.images.length > 0 || c.objects > 0;
        return {
          ...c,
          brokenImgs: brokenImgs.map((b) => b.src),
          status: brokenImgs.length ? 'BROKEN' : (hasAnyImg ? 'OK' : 'NO_IMG'),
        };
      });

      pageReport.errors = errs.slice(0, 3);
      pageReport.cardCount     = pageReport.cards.length;
      pageReport.brokenCount   = pageReport.cards.filter((c) => c.status === 'BROKEN').length;
      pageReport.noImgCount    = pageReport.cards.filter((c) => c.status === 'NO_IMG').length;
    } catch (e) {
      pageReport.failed = true;
      pageReport.error = String(e).slice(0, 200);
      summary.errors++;
    }
    page.off('console', onConsole);
    page.off('pageerror', onErr);
    report.pages.push(pageReport);
  }

  await browser.close();

  // Acumular
  for (const p of report.pages) {
    for (const c of p.cards || []) {
      summary.total++;
      if (c.status === 'OK') summary.ok++;
      else if (c.status === 'NO_IMG') {
        summary.no_img++;
        report.cards_no_image.push({ page: p.name, href: c.href, text: c.text });
      }
      else if (c.status === 'BROKEN') {
        summary.broken_img++;
        c.brokenImgs.forEach((src) => report.broken_images.push({ page: p.name, href: c.href, src }));
      }
    }
  }

  fs.writeFileSync(path.join(OUT, 'audit_cards_v2.json'), JSON.stringify(report, null, 2));

  console.log('='.repeat(80));
  console.log('AUDITORÍA DE CARDS v2 (con lazy loading forzado)');
  console.log('='.repeat(80));
  console.log(`Total cards: ${summary.total}`);
  console.log(`  OK       : ${summary.ok}`);
  console.log(`  SIN IMG  : ${summary.no_img}`);
  console.log(`  IMG ROTA : ${summary.broken_img}`);
  console.log(`  Errores  : ${summary.errors}`);
  console.log('');
  console.log('DETALLE POR PÁGINA:');
  for (const p of report.pages) {
    const flag = p.failed ? '✗' : (p.brokenCount > 0 ? '⚠' : (p.noImgCount > 0 ? '·' : '✓'));
    console.log(`  ${flag} ${p.name.padEnd(20)} cards=${String(p.cardCount).padStart(3)} broken=${p.brokenCount} noImg=${p.noImgCount}${p.failed ? ' FAILED' : ''}`);
  }
  if (report.broken_images.length) {
    console.log('\nIMÁGENES ROTAS:');
    for (const b of report.broken_images) console.log(`  ✗ [${b.page}] ${b.src}`);
  }
  console.log('\nCARDS SIN IMAGEN:');
  for (const m of report.cards_no_image) console.log(`  · [${m.page.padEnd(20)}] ${m.text.replace(/\s+/g, ' ').trim().slice(0, 60)}  (${m.href || ''})`);
})();
