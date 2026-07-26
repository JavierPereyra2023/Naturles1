# AGENTS.md — Sitio Web de Biología / Ciencias Naturales

## 1. Rol del agente

Actuá como un desarrollador web educativo especializado en Ciencias Naturales, Biología, didáctica escolar y diseño visual interactivo.

El objetivo es construir una página web educativa para estudiantes de 1° año de secundaria, centrada en los contenidos de Biología dentro de la materia Ciencias Naturales.

La página debe funcionar como una experiencia visual, clara, moderna y navegable, pensada para estudiar, repasar y presentar contenidos en clase.
Puedes leer el PDF con los contenidos de la materia

---

## 2. Tecnologías obligatorias

Usar solamente:

- HTML
- CSS
- JavaScript
- TailwindCSS vía CDN
- Iconify vía CDN
- Google Fonts vía CDN

No usar frameworks pesados, backend, bases de datos ni dependencias complejas.

El sitio debe poder abrirse directamente con `file://` desde `index.html` y también subirse a GitHub + Vercel.

Para generar assets de audio (podcast) usar **edge-tts** con voces nativas regionales vía el venv `D:\Anaconda\envs\manim\python.exe`. Voz argentino: `es-AR-TomasNeural` rate `+18%`. **NUNCA** usar Matrix MCP ni `rate < +10%`.

---

## 3. Archivo principal

El archivo principal debe llamarse:

```text
index.html
```

(página de presentación animada. La página principal con el mapa del sitio es `inicio.html`).

---

## 4. Estructura del sitio (2026-07-26)

### Unidades curriculares

- `unidades/quimica/` — Eje 1. Materia y propiedades, mezclas, agua.
- `unidades/fisica/` — Ejes 2 y 3. **Contiene la sub-unidad `fuerzas/` con las 4 fuerzas fundamentales + rozamiento**, energía, calor y sonido, movimientos, sistema solar (con MAPI).
- `unidades/biologia/` — Eje 4. Seres vivos, células, ecología, plantas, animales, cuerpo humano.
- `unidades/ciencia/` — Tramo de inicio, método científico.

### Secciones transversales

- `revista/` — Divulgación científica (5 artículos IG Nobel, Física, Biología).
- `podcast/` — 14 episodios de ~3 min en `podcast/audio/` (voces es-AR-TomasNeural).
- `esi.html` — Educación Sexual Integral (Ley 26.150).
- `eai.html` — Educación Ambiental Integral (Ley 27.621).
- `evaluaciones/` — Quizzes con Práctica / Desafío y diplomas.

### Identidad visual por sección

- Química: verde `#22C55E` (natura.leaf).
- Física: azul `#3B82F6` (natura.energy).
- Biología: rojo `#DC2626` (natura.bio).
- Revista: violeta `#8B5CF6`.
- Podcast: salmón `#E8A87C` (natura.podcast).
- ESI: turquesa `#14B8A6` (natura.greenLight).
- EAI: verde hoja `#22C55E` (natura.leaf).

### Tipografía

- Heading: **Playfair Display**.
- Body: **Cormorant Garamond**.
- UI / labels / cards: **Inter** sans-serif.

### Assets

- Fotos fotorrealistas en `assets/biologia/`, `assets/fisica/`, etc. (generadas con `image_synthesize` cuando hace falta).
- SVGs didácticos (diagramas con ejes/fórmulas, ilustraciones vectoriales): en `assets/fisica/fuerzas/`, `assets/quimica/mezclas-naturaleza.svg`, `assets/biologia/celulas/svg-*.svg`, `assets/fisica/movimientos/grafico-*.svg`, `assets/podcast/*.svg` (14 cards).
- Videos: `assets/video/` (Falcon 9, Falcon Heavy, Starship, MP4 sin caracteres especiales en el nombre).

### Sub-unidad de Fuerzas (nueva, 2026-07-26)

Dentro de `unidades/fisica/fuerzas/`:

- `index.html` — Hub con tabla comparativa SVG.
- `gravedad.html`, `electromagnetismo.html`, `nuclear-fuerte.html`, `nuclear-debil.html`, `rozamiento.html` — 1 página por fuerza.
- SVGs didácticos en `assets/fisica/fuerzas/svg-*.svg` con paleta unificada (azul para gravedad, violeta para electromag, naranja nuclear fuerte, amarillo nuclear débil, ámbar rozamiento).

### Anti-patrones confirmados

- **Nunca** usar `loremflickr.com` con el mismo query cambiando el `lock` — devuelve imágenes random sin relación con el tema. Usar SVGs didácticos locales o generar fotos con `image_synthesize`.
- **Nunca** usar `Matrix MCP` para TTS en español — suenan a extranjero. Usar `edge-tts` con voces nativas.
- **Nunca** `rate < +10%` en edge-tts — suena lento y robótico. Sweet spot `+15%` a `+20%`.
- **Nunca** generar fondos pygame con primitivas (regla de DataContra, no aplica acá pero queda).

---

## 5. Reglas de trabajo confirmadas con el usuario

- "No es profesional", "se ve lavado", "papel pegado", "POLICE mal ubicado" — cada crítica puntual es una lección, arreglar ESO, no otra cosa.
- Si reporta "detalles menores" (gotas, manchas, letras) → patch con color sólido + feather, NO regenerar. Si reporta problema grande (>30% imagen) → regenerar ESA imagen.
- El usuario es directo, sin filtro. No suavizar la crítica — escuchar lo puntual y arreglarlo.
- El sitio es para estudiantes. Todo lo que se publique debe ser seguro (nada de `innerHTML` con datos de API; usar `textContent`/`createElement`).

---

## 6. Estado actual y pendientes

Ver `MEMORIA.md` sección "Implementado 2026-07-26" para el detalle de esta sesión, y "Pendientes" más arriba para lo que falta.

Última verificación: pendiente de confirmar visualmente con playwright que las páginas de Fuerzas y el podcast se vean bien en el navegador del docente (especialmente los SVGs embebidos vía `<object>`).
