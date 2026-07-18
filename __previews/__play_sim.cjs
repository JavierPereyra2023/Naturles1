// Captura selectiva de la zona de simulación MRUV
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await c.newPage();
  await p.goto('http://localhost:8080/unidades/fisica/movimientos/mruv.html', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);
  // Scroll hasta el SVG de simulación
  const sim = await p.$('section#graficos-mruv');
  if (sim) {
    await sim.scrollIntoViewIfNeeded();
    await p.waitForTimeout(1500);
    // Esperar a que la animación corra un poco
    await p.waitForTimeout(3000);
    await sim.screenshot({ path: 'D:/naturales_1/__previews/fix_mruv_sim.png' });
    console.log('sim OK');
  } else {
    console.log('sim not found');
  }
  // También full page
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(500);
  await p.screenshot({ path: 'D:/naturales_1/__previews/fix_mruv_full.png', fullPage: true });
  console.log('full OK');
  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
