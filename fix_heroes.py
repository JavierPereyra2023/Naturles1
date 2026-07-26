"""
Reemplaza el <object> por <img> en los heroes de las páginas de fuerzas,
para que se respete el z-index del gradient y no se superponga al texto.
"""
import os
import re

files = [
    (r"D:\naturales_1\unidades\fisica\fuerzas\gravedad.html", "svg-gravedad.svg"),
    (r"D:\naturales_1\unidades\fisica\fuerzas\electromagnetismo.html", "svg-electromagnetismo.svg"),
    (r"D:\naturales_1\unidades\fisica\fuerzas\nuclear-fuerte.html", "svg-nuclear-fuerte.svg"),
    (r"D:\naturales_1\unidades\fisica\fuerzas\nuclear-debil.html", "svg-nuclear-debil.svg"),
    (r"D:\naturales_1\unidades\fisica\fuerzas\rozamiento.html", "svg-rozamiento.svg"),
]

for path, svg in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Pattern para el bloque del hero background con <object>
    old = f'''<div class="absolute inset-0 opacity-25">
    <object data="../../../assets/fisica/fuerzas/{svg}" type="image/svg+xml" style="width:100%;height:100%;filter:blur(2px);"></object>
  </div>
  <div class="absolute inset-0 bg-gradient-to-b from-natura-black/80 via-natura-black/30 to-natura-black"></div>'''

    new = f'''<div class="absolute inset-0 opacity-25" style="z-index: 0;">
    <img src="../../../assets/fisica/fuerzas/{svg}" alt="" style="width:100%;height:100%;object-fit:cover;filter:blur(2px);">
  </div>
  <div class="absolute inset-0 bg-gradient-to-b from-natura-black/80 via-natura-black/30 to-natura-black" style="z-index: 1;"></div>'''

    if old in content:
        content = content.replace(old, new)
        print(f"OK: {os.path.basename(path)}")
    else:
        print(f"WARN: no encontrado en {os.path.basename(path)}")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
