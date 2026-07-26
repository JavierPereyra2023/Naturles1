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

## Implementado 2026-07-24 (Falcon 9: modelo 3D, video y lanzamientos en vivo)

### Modelo 3D interactivo del Falcon 9
- Nueva sección scrollytelling en `unidades/fisica/sistema-solar/falcon-9.html` (estilo spacex.com/vehicles/falcon-9), entre el hero y "01. Características".
- Cohete wireframe **procedural** (sin archivo GLTF externo) en `assets/three/falcon9-scene.js`, con Three.js cargado por CDN vía `importmap` (sin build tools).
- 6 pasos sincronizados con el scroll: cofia, segunda etapa, interetapa, primera etapa, aletas de rejilla, patas de aterrizaje. Texto y resaltado de color cambian según el paso.
- Fallback a imagen estática (`falcon-9-hero.png`) si el navegador no soporta WebGL.

### Video de despegue real
- Nueva sección "Despegue real" en `falcon-9.html`, justo después del modelo 3D.
- Archivo en `assets/video/falcon-9-overview.mp4` (renombrado desde el original, que tenía espacios y caracteres especiales en el nombre — rompía la URL).
- Al terminar, vuelve solo al frame inicial (evita quedar en pantalla negra al final).
- Se corrigió `__server.js` (servidor local de desarrollo) para reconocer `.mp4`/`.webm` con el content-type correcto — antes los servía como `application/octet-stream` y el navegador no los reproducía.

### Próximos lanzamientos de SpaceX (en vivo)
- Nueva sección en `unidades/fisica/sistema-solar/tecnologia-espacial.html` (página hub, no en cada página de cohete individual).
- Fuente de datos: **Launch Library 2** (`ll.thespacedevs.com`) — gratuita, sin API key, con CORS habilitado. Confirmado con una llamada real en julio 2026.
- **Importante**: la API `api.spacexdata.com` (la que recomiendan muchos tutoriales viejos) está **caída** (error 525) — no usarla.
- Módulo `assets/js/spacex-launches.js`, con foco en seguridad porque el sitio lo usan estudiantes:
  - Nunca usa `innerHTML` con datos de la API — solo `textContent`/`createElement`, para eliminar cualquier vector de XSS.
  - Valida el tipo de cada campo (nombre, fecha, cohete, sitio, estado) antes de mostrarlo; si algo no es válido, se omite esa tarjeta.
  - No carga imágenes remotas de la API (evita contenido/tracking no controlado).
  - Único link de salida hardcodeado en el HTML (`spacex.com/launches`), nunca generado a partir de la respuesta de la API.
  - `fetch` con timeout de 8s (`AbortController`) y `try/catch` en todo el flujo, con estado de error prolijo si la API falla.
- Se actualiza solo, sin que el estudiante recargue la página: caché en `localStorage` (1h, para no pegarle a la API en cada carga) + refresco automático en segundo plano cada 20 min mientras la pestaña está visible, y al volver a la pestaña si pasó ese tiempo.

### Video del quinto vuelo de prueba de Starship (IFT-5)
- Nueva sección "Vuelo de prueba real" en `unidades/fisica/sistema-solar/starship.html`, mismo patrón que el video de Falcon 9 (después del hero, antes del contenido principal, con TOC y auto-rewind al terminar).
- Archivo en `assets/video/starship-fifth-flight-test.mp4` (renombrado desde el original con espacios en el nombre).
- Texto conecta el video con el contenido ya existente sobre "Mechazilla" (sección 02 de la página).
- De paso, corregidos 2 bugs preexistentes encontrados en `starship.html` al editar el archivo: una clase CSS rota (`text-base-l Relaxed` → `text-base leading-relaxed`, línea ~396) y texto en chino mezclado por error en un título (`Starlink第二代` → `Starlink Segunda Generación`, línea ~497). Sin relación con el video, corregidos porque eran evidentes y triviales.

**Completado en esta sesión:**
- ✅ Modelo 3D interactivo + video de despegue en los **tres** cohetes (Falcon 9, Falcon Heavy y Starship).
- ✅ Video de Falcon Heavy renombrado a `falcon-heavy-launch.mp4` y conectado.

**Pendiente de verificación:**
- Confirmación visual manual: renderings de los modelos 3D (no se pudo ver en esta sesión por limitación del navegador de la sesión). El docente debería probar en su navegador:
  ```bash
  node __server.js
  # Luego visitar:
  http://localhost:8080/unidades/fisica/sistema-solar/falcon-9.html
  http://localhost:8080/unidades/fisica/sistema-solar/starship.html
  http://localhost:8080/unidades/fisica/sistema-solar/falcon-heavy.html
  ```
  Y verificar que el scroll interactivo, los videos y los colores se ven bien (incluso en mobile).
- El widget de lanzamientos depende 100% de internet (API externa) — si el aula se queda sin conexión un día de clase, se muestra el estado de fallback con el link a spacex.com, pero no hay datos offline.
- Convendría hacer una pasada de `grep` por el resto del sitio buscando clases CSS rotas similares a `text-base-l Relaxed` o texto no-español mezclado, ya que apareció sin buscarlo en esta iteración — no se descarta que haya casos parecidos en otras páginas generadas de forma similar.
- `__server.js` no implementa `Range` requests, así que adelantar/retroceder en videos puede ir lento en navegadores antiguos. No afecta a `file://` ni a hosting real, pero convendría si el docente lo quiere para testing más fluido.

## Implementado 2026-07-24 (Starship: modelo 3D interactivo)

### Modelo 3D wireframe del Starship + Super Heavy
- Nuevo `assets/three/starship-scene.js`: escena Three.js propia para el Starship, con la misma mecánica que `falcon9-scene.js` (wireframe con `EdgesGeometry`, recorrido por scroll con contenedor sticky, cámara que interpola entre waypoints, parte activa resaltada en color y las demás en gris).
- Color de acento `#38BDF8` (`natura-water`), el que ya usaba la página del Starship, en vez del azul del Falcon 9.
- Nueva sección "Modelo 3D interactivo" en `starship.html`, entre el hero y el video del IFT-5, con entrada propia en el TOC ("Vista 3D interactiva").
- Seis pasos con las especificaciones de cada parte: nariz/bahía de carga, las cuatro aletas, cuerpo de la nave (tanques CH₄/LOX + escudo térmico), motores de la nave (3 Raptor + 3 Raptor Vacuum), Super Heavy (anillo de hot-staging, grid fins, pivotes de captura) y los 33 Raptor de la base.
- Geometría a escala del cohete real: 121 m totales repartidos entre propulsor (71 m) y nave (50 m), cuerpo de 9 m de diámetro, 33 motores en tres anillos (3 + 10 + 20) y 6 motores en la nave con las campanas Vacuum visiblemente más anchas.
- Se agregaron a `starship.html` el `importmap` de Three.js, los estilos `.rocket3d-*` y la exclusión de `#modelo-3d` del observer de `.reveal` (si no, la sección sticky se queda en opacidad 0), igual que en `falcon-9.html`.

**Verificado:** el módulo carga sin errores de consola, `init()` construye la escena completa (no cae al fallback), el canvas toma el tamaño del contenedor y el mapeo scroll → paso recorre los 6 pasos de principio a fin.

**No verificado:** el aspecto visual del render. En el navegador de esta sesión `requestAnimationFrame` no se ejecuta (el panel no compone frames), así que no se pudo sacar captura ni ver el cohete dibujado. Conviene que el docente lo mire en su propio navegador (`node __server.js` → `http://localhost:8080/unidades/fisica/sistema-solar/starship.html`) y avise si alguna proporción quedó rara.

## Implementado 2026-07-24 (Falcon Heavy: modelo 3D + video de despegue)

### Video de despegue
- Nueva sección "Despegue real" en `falcon-heavy.html`, justo después del modelo 3D, con el mismo patrón que Falcon 9 y Starship (auto-rewind al terminar, poster con el hero de la página, entrada en el TOC).
- Archivo renombrado a `assets/video/falcon-heavy-launch.mp4` (el original venía como `Blastoff! SpaceX Falcon Heavy rocket launches 6.6 ton satellite... (online-video-cutter.com).mp4`, con espacios y signos que complican las rutas).
- El texto de la sección apunta la atención al aterrizaje simultáneo de los dos núcleos laterales, que es lo distintivo de este cohete.

### Modelo 3D wireframe del Falcon Heavy
- Nuevo `assets/three/falcon-heavy-scene.js`, misma mecánica que las otras dos escenas, acento `#3B82F6` (`natura-energy`, el que ya usaba la página).
- Geometría de tres núcleos: el central reutiliza las medidas exactas de la escena del Falcon 9 y los dos laterales son el mismo tanque rematado en cono en vez de interetapa, separados ±1,1 unidades sobre el eje X, con anclajes visibles entre núcleos.
- 27 motores modelados de verdad (9 por núcleo en formación octaweb: 1 central + anillo de 8), más aletas de rejilla y patas en los tres núcleos.
- Seis pasos: cofia, segunda etapa, núcleos laterales, núcleo central reforzado, los 27 motores y la recuperación triple. El último paso abre la cámara para ver el cohete entero, que es donde mejor se aprecia la configuración de tres cuerpos.
- Se agregaron a `falcon-heavy.html` el `importmap` de Three.js, los estilos `.rocket3d-*` y la exclusión de `#modelo-3d` del observer de `.reveal`.

**Verificado:** módulo sin errores de consola, escena construida completa (no cae al fallback), canvas dimensionado (790×720 en viewport de 1280), mapeo scroll → paso recorriendo los 6 pasos, y el `.mp4` servido correctamente (HTTP 200, 12,4 MB, `video/mp4`).

**No verificado:** el render en sí, por la misma razón que en Starship (el panel del navegador de la sesión no compone frames, `requestAnimationFrame` no corre, no hay captura posible).

**Nota aparte sobre `__server.js`:** no implementa `Range` requests, así que devuelve el video entero en cada pedido. Al previsualizar con este servidor, adelantar/retroceder dentro de los videos puede fallar o ser lento. No afecta al sitio abierto con `file://` ni a un hosting real. No se tocó porque es un helper de desarrollo, fuera del alcance del pedido.

## Estado actual (resumido)

✅ **Completado:**
- Todas las páginas de cohetes (Falcon 9, Falcon Heavy, Starship) con modelo 3D interactivo y video de despegue real.
- Widget de próximos lanzamientos SpaceX en vivo (con datos de Launch Library 2).
- Revista lote A (5 artículos: rana levitación, doble arcoíris, noche polar, sinestesia, Schrödinger).
- Sistema de navegación, colores por temática, TOC por página.

⏳ **Pendiente de hacer:**
1. Cargar audios del podcast (`podcast/audio/*.mp3`) — a cargo del docente.
2. Revista lote B/C: entrelazamiento, antimateria, materia oscura, pandemias, ¿la IA piensa?
3. Reemplazar `loremflickr` restantes (Química, Podcast).
4. Actividades de laboratorio índice.
5. Despliegue GitHub + Vercel.
6. **Confirmación visual manual** de modelos 3D, videos y widget (ver "Pendiente de verificación" en la sección anterior).

## Notas técnicas

- El proyecto no usa backend ni framework pesado.
- Debe poder abrirse directamente desde `index.html`.
- Los enlaces internos deben apuntar a archivos concretos, no solo carpetas.
- Mantener TailwindCSS, Iconify y Google Fonts vía CDN.


## Implementado 2026-07-26 (Las Fuerzas + Podcast completo)

### Sección nueva: Las Fuerzas de la Naturaleza (sub-unidad de Física)

Nueva sub-unidad dentro de Física con 5 páginas + 1 hub, todas con SVG didáctico propio como ilustración principal (estilo "libro de texto moderno", fondo oscuro + íconos vectoriales, NO fotos):

- unidades/fisica/fuerzas/index.html — Hub de la sub-unidad, presenta las 4 fuerzas fundamentales + rozamiento con tabla comparativa.
- unidades/fisica/fuerzas/gravedad.html — F = m·g, ley de Newton, peso vs masa, órbitas, mareas, agujeros negros. Experimento: caída libre con objetos del mismo tamaño.
- unidades/fisica/fuerzas/electromagnetismo.html — Cargas (+/−), Ley de Coulomb, imanes N/S, luz como onda EM. Experimento: imán + clips.
- unidades/fisica/fuerzas/nuclear-fuerte.html — Quarks, gluones, protón/neutrón, núcleo atómico. Por qué no se repelen los protones.
- unidades/fisica/fuerzas/nuclear-debil.html — Decaimiento beta, bosones W/Z, datación por C-14, fusión en el Sol.
- unidades/fisica/fuerzas/rozamiento.html — f_r = μ·N, estático vs cinético, tabla de coeficientes reales, por qué no es fundamental. Experimento: ángulo crítico por superficie.

SVGs didácticos en ssets/fisica/fuerzas/ (todos con paleta unificada oscuro + color temático por fuerza):
- svg-gravedad.svg, svg-electromagnetismo.svg, svg-nuclear-fuerte.svg, svg-nuclear-debil.svg, svg-rozamiento.svg, svg-tabla-fuerzas.svg.

Cada página tiene: hero con el SVG, 3-4 secciones de contenido, experimento casero, 3 preguntas de "Para pensar" con <details>, navegación entre páginas hermanas, footer, search overlay, search topics array.

**Regla de paleta confirmada para SVGs didácticos**: fondo oscuro #0E1410 → #161C18, grid sutil, tipografía Inter/Playfair, íconos geométricos. Cada fuerza tiene su color de acento: gravedad azul, electromagnetismo violeta, nuclear fuerte naranja, nuclear débil amarillo, rozamiento ámbar. La tabla comparativa los muestra todos juntos.

### Podcast completo: 14 audios + 14 SVGs

- **SVGs nuevos en ssets/podcast/**: 14 ilustraciones vectoriales, una por episodio. Estilo unificado: fondo oscuro con dots pattern, ícono geométrico central representativo del tema, badge de episodio en esquina superior izquierda, gradiente de color por unidad (verde química, azul física, rojo biología, turquesa ESI). Reemplazan los loremflickr.com que tenía la página (regla anti-patrón de la auditoría del 2026-07-17: nunca loremflickr con el mismo query).
- **Audios MP3 en podcast/audio/**: 14 episodios de ~3 min cada uno, generados con edge-tts voz es-AR-TomasNeural rate +18% (misma voz que los videos Manim del usuario). Venv de Anaconda D:\Anaconda\envs\manim\python.exe.

Guiones (~600-800 palabras cada uno, argentino nativo, con cierre "Chau" típico del profe Pereyra):
- **Química**: materia-propiedades, mezclas, agua
- **Física**: energia, calor-sonido, movimientos, sistema-solar
- **Biología**: seres-vivos, plantas, animales, digestion, circulacion, respiracion
- **ESI**: alimentacion

Pipeline de generación: D:\naturales_1\podcast\gen_podcast_audios.py (guion completo) + egen_audios_largos.py y egen_audios_largos2.py (extensiones para los 9 que quedaron cortos en primera pasada, target 2:50-3:10).

**Duraciones finales** (todas entre 2:28 y 3:30, mayoría en 2:50-3:10):
| Archivo | Duración | Archivo | Duración |
|---|---|---|---|
| agua | 3:30 | animales | 2:57 |
| alimentacion | 2:59 | calor-sonido | 2:50 |
| circulacion | 3:11 | digestion | 2:57 |
| energia | 3:27 | materia-propiedades | 2:57 |
| mezclas | 3:29 | movimientos | 2:57 |
| plantas | 3:21 | respiracion | 3:05 |
| seres-vivos | 3:06 | sistema-solar | 3:11 |

### Cambios estructurales en páginas existentes

- inicio.html: link nuevo en desktop nav **y** mobile menu con badge "NUEVO" → unidades/fisica/fuerzas/. Card destacado de la sub-unidad entre Física y Biología, con gradiente azul→naranja→amarillo en la barra lateral (los 3 colores de las fuerzas fundamentales) y miniaturas de los 5 nombres de fuerza. Search topics array: 6 entradas nuevas (Las Fuerzas como hub + 5 individuales).
- unidades/fisica/index.html: 5° card a ancho completo (md:col-span-2) con el SVG de la tabla comparativa como imagen, badge "Nuevo · 2026", y links a los 5 temas. Search topics array: 6 entradas nuevas.
- podcast/index.html: 14 <img src="https://loremflickr.com/..."> reemplazados por ../assets/podcast/[nombre].svg. También se corrigió el loading="lazy" duplicado en cada card (regex de limpieza). Mensaje final del bloque "Para cargar tus audios" reemplazado: ya no dice "colocá los .mp3 en podcast/audio/" (ahora dice "Los 14 episodios están disponibles con audios de 3 minutos en podcast/audio/. Voz: prof. Javier Pereyra.").

### Pendiente menor

- El SVG de la sub-unidad de Fuerzas en inicio.html y unidades/fisica/index.html se embebe vía <object> en vez de <img>. Verificado que se renderiza bien en pruebas locales, pero conviene confirmar visualmente en el navegador del docente.
- La sección de Fuerzas no tiene entrada propia en el "Mapa de navegación" de inicio si la hubiera — actualmente solo aparece en el nav como sub-item y como card destacado.
- Si en algún momento se quiere extender el podcast, los scripts gen_podcast_audios.py y egen_audios_largos.py son reutilizables: solo hay que agregar entradas al dict GUIAS o EXTENSIONES y volver a correr.
