const { chromium } = require('D:/naturales_1/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route('**/*', (route) => { const h = Object.assign({}, route.request().headers(), { 'Cache-Control': 'no-cache' }); route.continue({ headers: h }); });
  await page.goto('http://localhost:8080/unidades/biologia/celulas/index.html?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }); });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => { if (img.complete) return Promise.resolve(); return new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); }); })));
  await page.waitForTimeout(800);

  const info = await page.evaluate(() => {
    const img = document.querySelector('a[href="animal.html"] img');
    const wrap = img.parentElement;
    return {
      img: {
        src: img.src,
        attr: img.getAttribute('src'),
        nw: img.naturalWidth,
        nh: img.naturalHeight,
        w: img.width,
        h: img.height,
        style: img.getAttribute('style'),
        className: img.className,
        objPos: getComputedStyle(img).objectPosition,
        x: img.getBoundingClientRect().x,
        y: img.getBoundingClientRect().y,
      },
      wrap: {
        className: wrap.className,
        w: wrap.getBoundingClientRect().width,
        h: wrap.getBoundingClientRect().height,
        x: wrap.getBoundingClientRect().x,
        y: wrap.getBoundingClientRect().y,
      },
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
