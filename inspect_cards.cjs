// Inspección visual de las cards de unidades + biologia/celulas
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const OUT = 'D:/naturales_1/output/inspect';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1) Inicio - sección "Tres grandes unidades"
  await page.goto('http://localhost:8080/inicio.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
  });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(800);

  // Localizar las 3 unit cards (quimica, fisica, biologia) y reportar estilos
  const unitCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="/unidades/"]'))
      .filter(a => a.querySelector('img'))
      .map(a => {
        const img = a.querySelector('img');
        const cs = getComputedStyle(img);
        const rect = img.getBoundingClientRect();
        return {
          href: a.getAttribute('href'),
          src: img.currentSrc || img.src,
          filter: cs.filter,
          objectPosition: cs.objectPosition,
          rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
          style: img.getAttribute('style') || '',
        };
      });
  });
  console.log('CARDS DE UNIDADES (inicio.html):');
  for (const c of unitCards) {
    console.log(`  - ${c.href}`);
    console.log(`    src: ${c.src.split('/').pop()}`);
    console.log(`    filter: ${c.filter}`);
    console.log(`    object-position: ${c.objectPosition}`);
    console.log(`    rect: ${c.rect.w}x${c.rect.h}`);
    console.log(`    style attr: ${c.style.slice(0, 100)}`);
  }
  // Screenshot de la sección
  const unitSection = await page.locator('section:has(h2:has-text("TRES GRANDES"))').first();
  await unitSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await unitSection.screenshot({ path: path.join(OUT, 'inicio-unidades.png') });
  console.log(`  → screenshot: ${OUT}/inicio-unidades.png`);

  // 2) Biología / Células - identificar la "célula cortada"
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
  });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(800);

  const cellCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*=".html"]'))
      .filter(a => {
        const href = a.getAttribute('href') || '';
        return a.querySelector('img') && !href.startsWith('http') && href.endsWith('.html');
      })
      .map(a => {
        const img = a.querySelector('img');
        const cs = getComputedStyle(img);
        const rect = img.getBoundingClientRect();
        return {
          href: a.getAttribute('href'),
          title: (a.querySelector('h3')?.textContent || '').trim().slice(0, 50),
          src: img.currentSrc || img.src,
          filter: cs.filter,
          objectPosition: cs.objectPosition,
          nw: img.naturalWidth, nh: img.naturalHeight,
          rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
        };
      });
  });
  console.log('\nCARDS DE CÉLULAS:');
  for (const c of cellCards) {
    console.log(`  - ${c.title.padEnd(28)}  src: ${c.src.split('/').pop().padEnd(35)}  nw=${c.nw}x${c.nh}  obj:${c.objectPosition}`);
  }

  // Screenshot de la sección de cards
  const cardsSection = await page.locator('section:has-text("Laboratorio visual")').first();
  await cardsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await cardsSection.screenshot({ path: path.join(OUT, 'celulas-cards.png') });
  console.log(`  → screenshot: ${OUT}/celulas-cards.png`);

  await browser.close();
})();
