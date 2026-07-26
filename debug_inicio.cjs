// Debug: ver qué pasa con las imágenes de inicio
const { chromium } = require('D:/naturales_1/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const page = await browser.newPage();

  page.on('response', (resp) => {
    if (resp.url().includes('unidad-') || resp.url().includes('favicon')) {
      console.log('RESP', resp.status(), resp.url().split('/').slice(-1)[0]);
    }
  });

  await page.goto('http://localhost:8080/inicio.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  const imgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src.split('/').pop(),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
    })).filter(i => i.src.startsWith('unidad-') || i.src.startsWith('hero-') || i.src.includes('card-revista'));
  });
  console.log('\n=== Imágenes relevantes ===');
  imgs.forEach((img, i) => {
    console.log(`${i+1}. ${img.src}: complete=${img.complete}, natural=${img.naturalWidth}`);
  });

  await browser.close();
})();
