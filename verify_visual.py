"""
Verifica visualmente las páginas críticas con Playwright.
"""
import asyncio
from playwright.async_api import async_playwright
import os

PAGES = [
    ("inicio", "http://localhost:8080/inicio.html"),
    ("fuerzas-hub", "http://localhost:8080/unidades/fisica/fuerzas/index.html"),
    ("fuerzas-gravedad", "http://localhost:8080/unidades/fisica/fuerzas/gravedad.html"),
    ("fuerzas-electromagnetismo", "http://localhost:8080/unidades/fisica/fuerzas/electromagnetismo.html"),
    ("fuerzas-nuclear-fuerte", "http://localhost:8080/unidades/fisica/fuerzas/nuclear-fuerte.html"),
    ("fuerzas-nuclear-debil", "http://localhost:8080/unidades/fisica/fuerzas/nuclear-debil.html"),
    ("fuerzas-rozamiento", "http://localhost:8080/unidades/fisica/fuerzas/rozamiento.html"),
    ("fisica-index", "http://localhost:8080/unidades/fisica/index.html"),
    ("podcast", "http://localhost:8080/podcast/index.html"),
]

OUTPUT_DIR = r"D:\naturales_1\output\playwright"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()

        results = []
        for name, url in PAGES:
            errors = []
            page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
            page.on("console", lambda msg: errors.append(f"console.{msg.type}: {msg.text}") if msg.type in ("error", "warning") else None)

            try:
                resp = await page.goto(url, wait_until="domcontentloaded", timeout=30000)
                status = resp.status if resp else "?"
                await page.wait_for_timeout(2000)  # Wait for SVGs to render
                title = await page.title()
                await page.screenshot(path=os.path.join(OUTPUT_DIR, f"verify_{name}.png"), full_page=False)
                # Check h1 presence
                h1 = await page.locator("h1").first.text_content() if await page.locator("h1").count() > 0 else "(no h1)"
                # Check broken images
                broken = await page.evaluate("""() => {
                    return Array.from(document.querySelectorAll('img'))
                      .filter(img => !img.complete || img.naturalWidth === 0)
                      .map(img => img.src);
                }""")
                # Check broken objects (SVGs embebidos)
                broken_obj = await page.evaluate("""() => {
                    const objs = Array.from(document.querySelectorAll('object'));
                    return objs.filter(o => o.contentDocument === null || (o.data && o.data.includes('.svg')))
                      .map(o => ({src: o.data, hasContent: !!o.contentDocument}));
                }""")
                results.append({
                    "name": name,
                    "url": url,
                    "status": status,
                    "title": title[:60],
                    "h1": h1[:80] if h1 else None,
                    "broken_images": len(broken) if broken else 0,
                    "broken_imgs_list": broken[:3] if broken else [],
                    "objects": len(broken_obj) if broken_obj else 0,
                    "errors": errors[:3],
                })
            except Exception as e:
                results.append({
                    "name": name,
                    "url": url,
                    "status": "EXCEPTION",
                    "error": str(e)[:200],
                })
            page.remove_all_listeners("pageerror")
            page.remove_all_listeners("console")

        await browser.close()

        # Print results
        print("=" * 80)
        print("RESULTADO DE LA VERIFICACIÓN")
        print("=" * 80)
        for r in results:
            print(f"\n--- {r['name']} ---")
            for k, v in r.items():
                if k == "name":
                    continue
                if k == "errors" and v:
                    print(f"  {k}:")
                    for e in v:
                        print(f"    - {e}")
                elif k == "broken_imgs_list" and v:
                    print(f"  {k}: {v}")
                else:
                    print(f"  {k}: {v}")
        print("\n" + "=" * 80)
        # Resumen final
        ok = sum(1 for r in results if r.get("status") == 200)
        print(f"RESUMEN: {ok}/{len(results)} páginas OK")
        if ok == len(results):
            print("✓ Todas las páginas cargan correctamente")
        else:
            print("✗ Hay páginas con problemas, revisar arriba")

asyncio.run(main())
