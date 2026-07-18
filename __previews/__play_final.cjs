// Validación final: calor-sonido + mruv (zona de simulación)
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });

  // 1. calor-sonido full page
  const p1 = await c.newPage();
  const errs1 = [];
  p1.on('pageerror', e => errs1.push(String(e)));
  p1.on('console', m => { if (m.type() === 'error') errs1.push('[c] ' + m.text()); });
  const r1 = await p1.goto('http://localhost:8080/unidades/fisica/calor-sonido/index.html', { waitUntil: 'domcontentloaded' });
  await p1.waitForTimeout(2500);
  await p1.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await p1.waitForTimeout(800);
  await p1.screenshot({ path: 'D:/naturales_1/__previews/v2_calorsonido.png', fullPage: true });
  console.log('calor-sonido: status=' + r1.status() + ' errs=' + errs1.length);
  if (errs1.length) console.log('  errs:', errs1);
  await p1.close();

  // 2. mruv simulación
  const p2 = await c.newPage();
  const errs2 = [];
  p2.on('pageerror', e => errs2.push(String(e)));
  p2.on('console', m => { if (m.type() === 'error') errs2.push('[c] ' + m.text()); });
  const r2 = await p2.goto('http://localhost:8080/unidades/fisica/movimientos/mruv.html', { waitUntil: 'domcontentloaded' });
  await p2.waitForTimeout(2500);
  const sim = await p2.$('section#graficos-mruv');
  if (sim) {
    await sim.scrollIntoViewIfNeeded();
    await p2.waitForTimeout(2500);
    await sim.screenshot({ path: 'D:/naturales_1/__previews/v2_mruv_sim.png' });
  }
  console.log('mruv: status=' + r2.status() + ' errs=' + errs2.length);
  if (errs2.length) console.log('  errs:', errs2);
  await p2.close();

  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
