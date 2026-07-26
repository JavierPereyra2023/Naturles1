// Debug: ver exactamente qué pasa con los SVGs del podcast
const { chromium } = require('D:/naturales_1/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  });
  const page = await browser.newPage();

  page.on('requestfailed', (req) => {
    console.log('FAIL:', req.url(), '->', req.failure()?.errorText);
  });
  page.on('response', (resp) => {
    if (resp.url().includes('podcast/')) {
      console.log('RESP', resp.status(), resp.url().split('/').slice(-1)[0]);
    }
  });

  await page.goto('http://localhost:8080/podcast/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Inspeccionar cada img
  const imgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.podcast-card img')).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
  });
  console.log('\n=== Imágenes en .podcast-card ===');
  imgs.forEach((img, i) => {
    console.log(`${i+1}. ${img.src.split('/').pop()}`);
    console.log(`   complete: ${img.complete}, natural: ${img.naturalWidth}x${img.naturalHeight}`);
  });

  await browser.close();
})();
