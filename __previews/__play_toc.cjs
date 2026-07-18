// Valida el TOC en potabilizacion.html
const { chromium } = require('C:/Users/javie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright');
(async () => {
  const exe = 'C:/Users/javie/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await c.newPage();
  const errs = [];
  const consoleErrs = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });

  await p.goto('http://localhost:8080/unidades/quimica/agua/potabilizacion.html', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  // Count TOC links
  const tocLinks = await p.$$('[data-toc]');
  console.log('TOC links count:', tocLinks.length);
  for (const link of tocLinks.slice(0, 6)) {
    const text = await link.textContent();
    const href = await link.getAttribute('href');
    console.log('  link:', text, '->', href);
  }

  // Verify active state initially (should be first link)
  const activeBefore = await p.$('.toc-link.active');
  if (activeBefore) {
    const activeText = await activeBefore.textContent();
    console.log('Initial active:', activeText);
  }

  await p.screenshot({ path: 'D:/naturales_1/__previews/toc_test_before.png' });

  // Click on the 3rd link and verify scroll + active state changes
  if (tocLinks.length > 2) {
    await tocLinks[2].click();
    await p.waitForTimeout(1500);
    const scrollY = await p.evaluate(() => window.scrollY);
    console.log('After click, scrollY:', scrollY);
    const activeAfter = await p.$('.toc-link.active');
    if (activeAfter) {
      const activeText = await activeAfter.textContent();
      console.log('After click, active:', activeText);
    }
    await p.screenshot({ path: 'D:/naturales_1/__previews/toc_test_after.png' });
  }

  console.log('errs:', errs.length, 'consoleErrs:', consoleErrs.length);
  if (errs.length) console.log(errs);
  if (consoleErrs.length) console.log(consoleErrs);
  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
