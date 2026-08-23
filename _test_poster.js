// Simula un click en "Reproducir cartel" y avanza el tiempo virtual del audio
// para validar que las cards se activan en el orden correcto.
const path = require('path');
const { chromium } = require(path.join(process.env.LOCALAPPDATA, 'ms-playwright'));

// Lanzar chrome con remote debugging
const { execSync, spawn } = require('child_process');
const fs = require('fs');

(async () => {
  // Buscar un ejecutable de playwright node
  const candidates = [
    'C:/Users/javie/AppData/Roaming/npm/node_modules/playwright/index.js',
    'C:/Users/javie/AppData/Local/ms-playwright-go/1.49.0/node_modules/playwright/index.js',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      console.log('Found playwright at', c);
      const pw = require(c);
      const browser = await pw.chromium.launch({ headless: true });
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push('PAGEERR: ' + e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push('CONSOLE: ' + m.text());
      });
      page.on('requestfailed', (r) => errors.push('REQ FAIL: ' + r.url() + ' ' + r.failure()?.errorText));
      await page.goto('file:///D:/naturales_1/unidades/biologia/celulas/neurona.html');
      await page.waitForLoadState('networkidle');
      // Estado inicial
      const initialActive = await page.$$eval('.poster-step.is-active', (els) => els.length);
      console.log('Initial active cards:', initialActive);
      // Click en play
      await page.click('#poster-play');
      // Esperar 2 segundos
      await page.waitForTimeout(2000);
      const t2 = await page.evaluate(() => document.getElementById('poster-audio').currentTime);
      const active2 = await page.$$eval('.poster-step.is-active .poster-num', (els) => els.map((e) => e.textContent));
      console.log('At 2s: audio currentTime =', t2, 'active card num:', active2);
      // Esperar a t=10s
      await page.evaluate(() => { document.getElementById('poster-audio').currentTime = 10; });
      await page.waitForTimeout(200);
      const active10 = await page.$$eval('.poster-step.is-active .poster-num', (els) => els.map((e) => e.textContent));
      console.log('At 10s: active card num:', active10);
      // Esperar a t=18s
      await page.evaluate(() => { document.getElementById('poster-audio').currentTime = 18; });
      await page.waitForTimeout(200);
      const active18 = await page.$$eval('.poster-step.is-active .poster-num', (els) => els.map((e) => e.textContent));
      console.log('At 18s: active card num:', active18);
      // Esperar a t=35s
      await page.evaluate(() => { document.getElementById('poster-audio').currentTime = 35; });
      await page.waitForTimeout(200);
      const active35 = await page.$$eval('.poster-step.is-active .poster-num', (els) => els.map((e) => e.textContent));
      console.log('At 35s: active card num:', active35);
      // Errores
      if (errors.length) {
        console.log('\n=== ERRORS ===');
        errors.forEach((e) => console.log(e));
      } else {
        console.log('\nNo errors.');
      }
      await browser.close();
      return;
    }
  }
  console.log('No playwright found');
})();
