# agos nails 💅

Web de **agos nails** — uñas en Formosa, en estudio y a domicilio.
*Cada detalle cuenta. Cada resultado enamora.*

## Editar contenido
- **Precios y servicios:** `servicios.js`
- **Opiniones:** `opiniones.js`
- **WhatsApp y link de turnos (Cal.com):** al final de `index.html` (`WHATSAPP`, `RESERVAS`)
- **Fotos:** carpeta `img/`

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
