// Captura cada card de la página de celulas individualmente
const { chromium } = require('D:/naturales_1/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const OUT = 'D:/naturales_1/output/inspect/cards';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'));
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(500);

  const cards = await page.locator('a[href*=".html"]').filter({ has: page.locator('img') }).all();
  console.log('Found', cards.length, 'cards with images');
  for (let i = 0; i < cards.length; i++) {
    const title = (await cards[i].locator('h3').textContent() || 'x').trim().slice(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `card_${String(i).padStart(2, '0')}_${title}.png`;
    await cards[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await cards[i].screenshot({ path: path.join(OUT, fileName) });
    console.log('  ' + fileName);
  }
  await browser.close();
})();
