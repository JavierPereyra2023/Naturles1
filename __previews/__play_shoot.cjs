// Playwright screenshot helper — usa el cache de npx
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
const path = require('path');

const BASE = 'http://localhost:8080';
const OUT = 'D:/naturales_1/__previews';

const targets = [
  { url: `${BASE}/unidades/fisica/energia/formas-energia.html`, out: 'post_formas.png' },
  { url: `${BASE}/unidades/fisica/energia/index.html`, out: 'post_energia_idx.png' },
  { url: `${BASE}/unidades/fisica/movimientos/mruv.html`, out: 'post_mruv.png' },
  { url: `${BASE}/unidades/fisica/movimientos/graficos.html`, out: 'post_graficos.png' },
  { url: `${BASE}/unidades/fisica/index.html`, out: 'post_fisica_idx.png' },
];

(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const browser = await chromium.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  for (const t of targets) {
    const page = await ctx.newPage();
    const errs = [];
    const consoleErrs = [];
    const failedReqs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') consoleErrs.push('[console] ' + m.text()); });
    page.on('requestfailed', r => failedReqs.push(`${r.url()} :: ${r.failure()?.errorText}`));
    let status = '?';
    try {
      const resp = await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      status = resp?.status() || '?';
      await page.waitForTimeout(2500);
      // Scroll through to trigger lazy loads
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, t.out), fullPage: true });
    } catch (e) {
      console.error('  ERR:', e.message);
    }
    const ok = consoleErrs.length === 0 && errs.length === 0 && failedReqs.length === 0;
    console.log(`→ ${t.out} | status=${status} | ok=${ok}`);
    if (errs.length) console.log('  pageerrs:', errs);
    if (consoleErrs.length) console.log('  consoleErrs:', consoleErrs);
    if (failedReqs.length) console.log('  failedReqs:', failedReqs);
    await page.close();
  }
  await browser.close();
  // Re-print any 404 details from the first page only
  const page = await ctx.newPage();
  const reqs = [];
  page.on('response', r => { if (r.status() === 404) reqs.push(r.url()); });
  await page.goto(`${BASE}/unidades/fisica/energia/formas-energia.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  console.log('404 details on formas-energia:', reqs);
  await page.close();
  console.log('done');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
