# agos nails 💅

Web de **agos nails** — uñas en Formosa, en estudio y a domicilio.
*Cada detalle cuenta. Cada resultado enamora.*

## Editar contenido
Todo el contenido variable se edita en la **planilla de Google Sheets** (pestañas `Servicios`, `Opiniones`, `Galeria`, `Datos`). La web la lee al cargar.

- **Conectar la planilla:** poner su ID en `PLANILLA_ID` (arriba de `app.js`). La planilla debe estar compartida como "Cualquier persona con el enlace: Lector".
- **Respaldo:** `datos-respaldo.js` se usa si la planilla no se puede leer.
- **Fotos:** en `Galeria`, columna `foto`: nombre de archivo de `img/` o link de Google Drive (compartido con "cualquier persona con el enlace").

Web estática (HTML + CSS + JS), publicada con GitHub Pages.

## Entornos
| Entorno | Rama | URL |
|---|---|---|
| **Dev** (pruebas) | `main` | https://andresprommel-dev.github.io/agosnails/ — GitHub Pages |
| **Prod** (la que ven las clientas) | `prod` | https://agosnails.agostinasosa678.workers.dev — Cloudflare Workers |

Repos: `andresprommel-dev/agosnails` y `agostinasosa678-nails/agosnails` (un `git push` sube a los dos). Cloudflare publica desde el repo de Agostina.

**Flujo:** los cambios se suben a `main` → se revisan en Dev → cuando están OK se pasan a `prod`:

```bash
git checkout prod && git merge --ff-only main && git push && git checkout main
```
