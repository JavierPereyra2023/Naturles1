# MEMORIA.md - Proyecto Ciencias Naturales 1° Año

## Estado general

Sitio web educativo estático para Ciencias Naturales de 1° año. Funciona con HTML, CSS, JavaScript, TailwindCSS vía CDN, Iconify vía CDN y Google Fonts vía CDN.

Archivo de entrada:

- `index.html`: presentación inicial animada.
- `inicio.html`: página principal con navegación por unidades, revista, podcast, ESI y EAI.

## Cambios realizados

### Navegación y apertura local

- Se corrigieron enlaces que apuntaban a carpetas, por ejemplo `unidades/fisica/`, para que apunten explícitamente a `index.html`.
- Esto evita que al abrir el sitio con `file://` aparezca una página tipo `Index of D:\...`.
- Se eliminaron caracteres `?` iniciales antes del `<!DOCTYPE>` en páginas HTML.

### Presentación inicial

- Se reparó la codificación corrupta de `index.html`.
- La página principal `inicio.html` ahora vuelve a `index.html` cuando se refresca.
- El logo `Cs. Naturales` en `inicio.html` apunta a `index.html`, para volver a la presentación.

### Colores por temática

Se reforzó la identidad visual por unidad:

- Química: verde.
- Física: azul.
- Biología: rojo.
- Revista: violeta.
- Podcast: salmón.
- ESI: turquesa.
- EAI: verde.

### Revista

- Se cambió la identidad visual de Revista de ámbar/dorado a violeta.
- Archivos actualizados:
  - `inicio.html`
  - `revista/index.html`
  - `revista/rana-levitacion.html`
- Color principal usado: `#8B5CF6`.
- Variante clara: `#A78BFA`.
- Variante oscura: `#7C3AED`.

### Menú principal

- El subrayado de cada enlace del menú ahora coincide con su color temático.
- En particular, `Revista` usa underline violeta.

## Verificaciones realizadas

- Se revisaron las referencias locales del sitio.
- Ya no quedan enlaces locales a directorios sin `index.html`.
- Se verificó visualmente con Chrome:
  - `index.html`
  - `inicio.html`
  - `unidades/fisica/index.html`
  - `revista/index.html`
  - sección Revista dentro de `inicio.html`

## Plan de mejoras Física (2026-07-17)

Auditoría visual detectó: imágenes genéricas (SVG vectorial / loremflickr.com), secciones de energía incompletas (faltaba Energía Elástica y aplicaciones de Ec/Ep), gráficos MRUV sin figuras estáticas.

**Imágenes JPG fotorrealistas nuevas** (16:9, 2K, generadas con image_synthesize):
- `assets/fisica/energia/energia-cinetica-real.jpg` (auto de carrera)
- `assets/fisica/energia/energia-potencial-real.jpg` (lago glaciar / represa en altura)
- `assets/fisica/energia/energia-elastica-real.jpg` (resorte tensado)
- `assets/fisica/energia/energia-mecanica-real.jpg` (montaña rusa)
- `assets/fisica/movimientos/caida-libre-real.jpg` (saltador de bungee)
- `assets/fisica/index/physics-hero.jpg` (bobina de Tesla)
- `assets/fisica/index/energia-card.jpg` (paneles solares al atardecer)
- `assets/fisica/index/calor-card.jpg` (lava volcánica)

**SVGs didácticos nuevos** (curvas con ejes, números y fórmulas, estilo libro de texto):
- `assets/fisica/movimientos/grafico-mruv-xt.svg` (parábola posición-tiempo)
- `assets/fisica/movimientos/grafico-mruv-vt.svg` (recta velocidad-tiempo)
- `assets/fisica/movimientos/grafico-posicion-tres-casos.svg` (reposo, MRU, MRUV)
- `assets/fisica/movimientos/grafico-velocidad-dos-casos.svg` (MRU y MRUV)
- `assets/fisica/energia/grafico-ec-v.svg` (Ec vs v: parábola)
- `assets/fisica/energia/grafico-ep-h.svg` (Ep vs h: recta)
- `assets/fisica/energia/grafico-ee-x.svg` (Ee vs x: parábola)

**HTML modificados**:
- `formas-energia.html` (2 figuras reemplazadas por fotos + 2 secciones "Aplicaciones de Ec/Ep" + sección 5 "Energía Elástica" + sección "Gráficos de energía mecánica" + 2 preguntas nuevas)
- `mruv.html` (figura de caída libre reemplazada por foto de bungee + nueva sección 02c "Gráficos estáticos del MRUV" con 2 SVGs didácticos + pregunta nueva sobre pendiente y área)
- `graficos.html` (figura de posición-tiempo reemplazada por SVG + nueva figura de velocidad-tiempo + 2 preguntas nuevas sobre gráficos combinados)
- `unidades/fisica/index.html` (3 loremflickr reemplazados por fotos locales + filtro del hero ajustado a `grayscale(70%) brightness(0.6) contrast(1.1)` para que la imagen sea visible)

**Regla visual confirmada por el usuario**: las imágenes conceptuales deben ser fotorrealistas, los SVGs solo para gráficos didácticos (curvas, ejes, fórmulas, números).

**Anti-patrón detectado**: el index de calor-sonido usaba loremflickr.com con el MISMO query y solo cambiaba el lock. loremflickr devolvía imágenes random sin relación con el tema. **Nunca usar loremflickr con el mismo query** — regenerar con prompts distintos por tarjeta.

### Bug en la simulación SVG de MRUV (mruv.html)

La función `gVt(t)` estaba mal nombrada: calculaba la coordenada Y del gráfico v-t, pero se usaba también en el loop de ticks del eje X → ticks invertidos "8 6 4 2 0". **Fix**: renombrar a `gYv(v)` y usar `gXt(s)` para el eje X. También achicar rangos (VMAX 100→50, TMAX 10→8, slider a max 5 m/s²).

## Pendientes importantes

### Podcast

Faltan los archivos `.mp3` dentro de `podcast/audio/`.

Archivos esperados:

- `materia-propiedades.mp3`
- `mezclas.mp3`
- `agua.mp3`
- `energia.mp3`
- `calor-sonido.mp3`
- `movimientos.mp3`
- `sistema-solar.mp3`
- `seres-vivos.mp3`
- `plantas.mp3`
- `animales.mp3`
- `digestion.mp3`
- `circulacion.mp3`
- `respiracion.mp3`
- `alimentacion.mp3`

La página ya muestra un mensaje de error si falta el audio, pero los botones no reproducen hasta que esos archivos existan.

### Revisión visual completa

Conviene hacer una pasada visual por todas las páginas de unidades para revisar:

- Consistencia de colores.
- Encabezados.
- Botones.
- Enlaces de volver/inicio.
- Responsive en celular.
- Textos largos que puedan desbordar.

### Codificación

Se corrigieron casos detectados de mojibake, pero si se agregan nuevos archivos hay que guardarlos siempre como UTF-8.

Buscar señales de error:

- `Ã`
- `Â`
- `â€”`
- `â€“`
- `�`

### Revista

Pendiente agregar más artículos para que la sección no quede con un solo contenido.

Ideas:

- Grafeno y materiales del futuro.
- Superconductores.
- Científicas argentinas.
- Ciencia absurda que terminó siendo útil.
- Biotecnología cotidiana.

### ESI y EAI

Revisar que estén alineadas con:

- Ley 26.150 de ESI.
- Ley 27.621 de Educación Ambiental Integral.
- Diseño Curricular de Provincia de Buenos Aires.

## Implementado 2026-07-22 (libro interactivo)

### Quizzes (Fase 2)
- Banco ampliado: **13 unidades × 10 preguntas = 130** en `evaluaciones/js/quiz-data.js`.
- Modos **Práctica** (no guarda mejor puntaje) y **Desafío**.
- Feedback por tema + CTA “Repasar el tema” a la lección.
- Diplomas simplificados en `quiz-app.js`.
- Cards “¿Lo entendiste?” en índices de Química, Física y Biología.

### Responsive (Fase 3)
- `assets/responsive-fixes.css` global (imágenes, tablas, touch, hotspots quiz, sidebars).
- Ajustes en hub de quizzes y células 3D (`celulas-3d.css`).
- Linked desde inicio, evaluaciones, revista e índices de unidad.

### Revista (Fase 4 — Lote A + Schrödinger)
Artículos nuevos:
- `revista/doble-arcoiris.html`
- `revista/noche-polar.html`
- `revista/sinestesia.html`
- `revista/gato-schrodinger.html`
- Estilos compartidos: `assets/revista-article.css`
- Índice y card de `inicio.html` actualizados (5 artículos).
- Próximamente listado: entrelazamiento, IA, antimateria/materia oscura, pandemias.

## Próximos pasos sugeridos

1. Cargar audios del podcast (`podcast/audio/*.mp3`) — a cargo del docente.
2. Revista lote B/C: entrelazamiento, antimateria, materia oscura, pandemias, ¿la IA piensa?
3. Reemplazar `loremflickr` restantes (Química, Podcast).
4. Actividades de laboratorio índice.
5. Despliegue GitHub + Vercel.

## Notas técnicas

- El proyecto no usa backend ni framework pesado.
- Debe poder abrirse directamente desde `index.html`.
- Los enlaces internos deben apuntar a archivos concretos, no solo carpetas.
- Mantener TailwindCSS, Iconify y Google Fonts vía CDN.

