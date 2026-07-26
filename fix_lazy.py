"""
Quita loading="lazy" y pone loading="eager" en los SVGs del podcast
para que no se demoren en cargarse cuando están fuera del viewport.
"""
import re

path = r"D:\naturales_1\podcast\index.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Reemplazar <img src="...svg" alt="..." [loading="lazy"]> por <img src="...svg" alt="..." loading="eager">
# Manejar tanto con loading="lazy" duplicado, sin loading, o con un solo
pattern = re.compile(r'<img src="(\.\./assets/podcast/[^"]+\.svg)"\s+alt="([^"]+)"(?:\s+loading="(?:lazy|eager)")?\s*>')

def repl(m):
    return f'<img src="{m.group(1)}" alt="{m.group(2)}" loading="eager">'

new_content, count = pattern.subn(repl, content)
print(f"{count} imágenes actualizadas")

with open(path, "w", encoding="utf-8") as f:
    f.write(new_content)
