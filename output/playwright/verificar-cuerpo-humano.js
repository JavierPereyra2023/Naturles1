async (page) => {
  const names = [
    "index.html",
    "alimentacion.html",
    "digestion.html",
    "circulacion.html",
    "respiracion.html",
    "endocrino.html",
    "musculos.html",
    "esqueleto.html",
    "pancreas.html",
    "rinones.html",
    "urinario.html",
    "reproductor.html",
    "sentidos.html",
    "vista.html",
    "oido.html",
    "gusto.html",
    "olfato.html",
    "tacto.html",
    "nervioso.html",
    "cerebro.html",
  ];
  const results = [];

  for (const name of names) {
    const response = await page.goto(
      `http://localhost:8080/unidades/biologia/cuerpo-humano/${name}`,
      { waitUntil: "networkidle" },
    );
    const result = await page.evaluate(() => {
      const hero = document.querySelector(
        "body > section.relative.overflow-hidden, body > header.hero-sense",
      );
      const images = [...document.images];
      return {
        title: document.title,
        brokenImages: images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.getAttribute("src")),
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        cardSvgCount: [...document.querySelectorAll(".content-card img")].filter(
          (image) => image.src.endsWith(".svg"),
        ).length,
        heroBackground: hero ? getComputedStyle(hero).backgroundImage : null,
        heroImageCount: hero ? hero.querySelectorAll("img").length : 0,
      };
    });
    results.push({
      page: name,
      status: response?.status() ?? null,
      ...result,
    });
  }

  return results;
}
