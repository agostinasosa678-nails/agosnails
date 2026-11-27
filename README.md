# agos nails 💅

Web de **agos nails** — uñas en Formosa, en estudio y a domicilio.
*Cada detalle cuenta. Cada resultado enamora.*

## Editar contenido
Todo el contenido variable se edita en la **planilla de Google Sheets** (pestañas `Servicios`, `Opiniones`, `Galeria`, `Datos`). La web la lee al cargar.

- **Conectar la planilla:** poner su ID en `PLANILLA_ID` (arriba de `app.js`). La planilla debe estar compartida como "Cualquier persona con el enlace: Lector".
- **Respaldo:** `datos-respaldo.js` se usa si la planilla no se puede leer.
- **Fotos:** en `Galeria`, columna `foto`: nombre de archivo de `img/` o link de Google Drive (compartido con "cualquier persona con el enlace").

Web estática (HTML + CSS + JS), publicada con GitHub Pages.

## Publicación
Una sola rama: **`main`**. Cada `git push` publica en los dos sitios:

| Sitio | URL |
|---|---|
| Cloudflare (principal) | https://agosnails.agostinasosa678.workers.dev |
| GitHub Pages | https://andresprommel-dev.github.io/agosnails/ |

Repos: `andresprommel-dev/agosnails` y `agostinasosa678-nails/agosnails` (un `git push` sube a los dos). Cloudflare publica desde el repo de Agostina.
