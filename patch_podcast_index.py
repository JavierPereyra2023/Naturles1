import re

path = r"D:\naturales_1\podcast\index.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Mapa de reemplazos: cada loremflickr URL -> SVG local
# El orden se basa en el data-audio que aparece en el HTML
SOURCES_TO_REPLACE = {
    "https://loremflickr.com/600/400/laboratory,flask,beaker?lock=71": "../assets/podcast/materia-propiedades.svg",
    "https://loremflickr.com/600/400/mixture,liquid,chemistry?lock=72": "../assets/podcast/mezclas.svg",
    "https://loremflickr.com/600/400/water,drop,nature?lock=73": "../assets/podcast/agua.svg",
    "https://loremflickr.com/600/400/lightning,energy,thunder?lock=74": "../assets/podcast/energia.svg",
    "https://loremflickr.com/600/400/fire,flame,heat?lock=75": "../assets/podcast/calor-sonido.svg",
    "https://loremflickr.com/600/400/motion,blur,speed?lock=76": "../assets/podcast/movimientos.svg",
    "https://loremflickr.com/600/400/sun,solar,space?lock=77": "../assets/podcast/sistema-solar.svg",
    "https://loremflickr.com/600/400/cell,biology,microscope?lock=78": "../assets/podcast/seres-vivos.svg",
    "https://loremflickr.com/600/400/plant,leaf,green?lock=79": "../assets/podcast/plantas.svg",
    "https://loremflickr.com/600/400/lion,wild,animal?lock=80": "../assets/podcast/animales.svg",
    "https://loremflickr.com/600/400/stomach,digestion,anatomy?lock=81": "../assets/podcast/digestion.svg",
    "https://loremflickr.com/600/400/heart,cardiac,red?lock=82": "../assets/podcast/circulacion.svg",
    "https://loremflickr.com/600/400/lungs,respiratory,breath?lock=83": "../assets/podcast/respiracion.svg",
    "https://loremflickr.com/600/400/vegetables,food,healthy?lock=84": "../assets/podcast/alimentacion.svg",
}

changes = 0
for old, new in SOURCES_TO_REPLACE.items():
    if old in content:
        content = content.replace(old, new)
        changes += 1
    else:
        print(f"  WARN: no encontrado {old[:60]}")

# También elimino el "loading lazy" duplicado que vi en el HTML original
content = re.sub(r'(\s*loading="lazy")+', ' loading="lazy"', content)

# Cambio el mensaje final del cuadro "Para cargar tus audios" para reflejar que ya están
old_msg = 'Colocá los archivos <strong class="text-white">.mp3</strong> en la carpeta <code class="text-natura-podcast bg-natura-mid px-1 py-0.5">podcast/audio/</code> con los nombres indicados en cada tarjeta (ej: <code class="text-natura-podcast bg-natura-mid px-1 py-0.5">materia-propiedades.mp3</code>). Los controles de reproducción se activan automáticamente cuando el archivo está presente.'
new_msg = 'Los 14 episodios están disponibles con audios de 3 minutos en <code class="text-natura-podcast bg-natura-mid px-1 py-0.5">podcast/audio/</code>. Voz: prof. Javier Pereyra. Hacé clic en play para escuchar.'
if old_msg in content:
    content = content.replace(old_msg, new_msg)
    print("  OK: mensaje final actualizado")
else:
    print("  WARN: mensaje final no encontrado")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n{changes} imágenes reemplazadas, archivo guardado")
