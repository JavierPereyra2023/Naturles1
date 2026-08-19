const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'));
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
  })));
  await page.waitForTimeout(500);

  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*=".html"] img')).map((i) => ({
    src: i.getAttribute('src'),
    nw: i.naturalWidth,
    nh: i.naturalHeight,
    rectW: Math.round(i.getBoundingClientRect().width),
    rectH: Math.round(i.getBoundingClientRect().height),
    objPos: getComputedStyle(i).objectPosition,
  })));
  for (const i of imgs) {
    const srcShort = (i.src || '').split('/').pop();
    console.log(`src=${(srcShort || '').padEnd(30)} nw=${i.nw}x${i.nh} display=${i.rectW}x${i.rectH} obj=${i.objPos}`);
  }
  await browser.close();
})();
