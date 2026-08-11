# Ciencias Naturales · 1° año

Sitio educativo estático para estudiantes de primer año. La portada pública es `index.html` y el mapa principal de contenidos está en `inicio.html`.

## Publicar con GitHub y Vercel

1. Subí esta carpeta a un repositorio de GitHub.
2. En Vercel elegí **Add New → Project** e importá ese repositorio.
3. Usá **Framework Preset: Other**.
4. Dejá **Root Directory** en `.`.
5. No configures **Build Command** ni **Output Directory**.
6. Presioná **Deploy**.

No se necesitan variables de entorno, backend ni base de datos. Cada nuevo `push` a la rama principal genera automáticamente una nueva publicación en Vercel.

## Probar localmente

Podés abrir `index.html` directamente o iniciar el servidor de desarrollo:

```powershell
node __server.js
```

Luego visitá `http://localhost:8080/`.

## Archivos de publicación

- `vercel.json`: cabeceras de seguridad y caché para recursos.
- `.vercelignore`: evita subir pruebas, capturas, dependencias y documentación interna.
- `.gitignore`: evita volver a versionar artefactos locales.
- `404.html`: página de error amigable.
