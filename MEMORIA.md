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

## Próximos pasos sugeridos

1. Cargar o generar los audios del podcast.
2. Revisar responsive en celular de páginas principales.
3. Completar más artículos de Revista.
4. Crear una página índice de actividades prácticas o laboratorio.
5. Agregar actividades evaluativas por unidad.
6. Revisar accesibilidad básica:
   - textos alternativos,
   - contraste,
   - foco de teclado,
   - títulos claros.
7. Preparar despliegue en GitHub + Vercel.

## Notas técnicas

- El proyecto no usa backend ni framework pesado.
- Debe poder abrirse directamente desde `index.html`.
- Los enlaces internos deben apuntar a archivos concretos, no solo carpetas.
- Mantener TailwindCSS, Iconify y Google Fonts vía CDN.

