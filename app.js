/* =====================================================================
   AGOS NAILS — carga de contenido desde Google Sheets
   ---------------------------------------------------------------------
   PLANILLA_ID: el código largo del link de la planilla:
   https://docs.google.com/spreadsheets/d/  >>> ESTE CÓDIGO <<<  /edit
   La planilla tiene que estar compartida como
   "Cualquier persona con el enlace: Lector".
   Si queda vacío, la web usa datos-respaldo.js.
   ===================================================================== */

const PLANILLA_ID = "1MiO-ZbLUSSBSGLwmnLdtdiBW2D1TfsjKIsGtdJ0fSuI"; // planilla "AgosNails"

/* ------------------------------------------------------------------ */

const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// CSV → array de objetos (soporta comillas, comas y saltos de línea dentro de celdas)
function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  const [head = [], ...body] = rows;
  const keys = head.map(h => h.trim().toLowerCase());
  return body
    .filter(r => r.some(c => c.trim() !== ""))
    .map(r => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

async function leerPestania(nombre) {
  const url = `https://docs.google.com/spreadsheets/d/${PLANILLA_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(nombre)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${nombre}: HTTP ${res.status}`);
  const texto = await res.text();
  if (texto.trim().startsWith("<")) throw new Error(`${nombre}: la planilla no está compartida`);
  return parseCSV(texto);
}

const visible = f => !/^no$/i.test(f.mostrar || "");

async function cargarDatos() {
  const r = DATOS_RESPALDO;
  if (!PLANILLA_ID) return r;
  const tabs = ["Servicios", "Opiniones", "Galeria", "Datos"];
  const res = await Promise.allSettled(tabs.map(leerPestania));
  res.forEach((x, i) => x.status === "rejected" && console.warn("Planilla, uso respaldo para", tabs[i], x.reason));
  const ok = i => (res[i].status === "fulfilled" && res[i].value.length ? res[i].value : null);
  const datos = ok(3) ? Object.fromEntries(ok(3).map(f => [f.clave, f.valor])) : {};
  return {
    servicios: ok(0) ? ok(0).filter(visible) : r.servicios,
    opiniones: ok(1) ? ok(1).filter(visible) : r.opiniones,
    galeria: ok(2) ? ok(2).filter(visible) : r.galeria,
    // dato por dato: si falta alguno en la planilla, uso el de respaldo
    datos: { ...r.datos, ...Object.fromEntries(Object.entries(datos).filter(([k, v]) => k && v !== "")) },
  };
}

// Foto: nombre de archivo (carpeta img/), link de Google Drive, o link directo
function urlFoto(foto) {
  const f = (foto || "").trim();
  const drive = f.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/);
  if (drive) return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w1200`;
  if (/^https?:\/\//i.test(f)) return f;
  return "img/" + f;
}

function pintar({ servicios, opiniones, galeria, datos: d }) {
  document.getElementById("lista-servicios").innerHTML = servicios.map(s => `
    <li class="item">
      <div class="item__linea">
        <span class="item__nombre"><span class="item__estrella">✦</span> ${esc(s.nombre)}</span>
        <span class="item__puntos"></span>
        <span class="precio">${esc(s.precio)}</span>
      </div>
      <p class="item__detalle">${esc(s.detalle)}${s.detalle && s.descripcion ? " · " : ""}${esc(s.descripcion)}</p>
    </li>`).join("");

  document.getElementById("lista-opiniones").innerHTML = opiniones.map(o => {
    const n = Math.max(0, Math.min(5, Math.round(Number(o.estrellas)) || 5));
    return `
    <article class="card opinion">
      <span class="opinion__comillas">“</span>
      <div class="opinion__estrellas" aria-label="${n} de 5 estrellas">${"★".repeat(n)}${"☆".repeat(5 - n)}</div>
      <p class="opinion__texto">${esc(o.comentario)}</p>
      <div class="servicio__meta"><span class="opinion__nombre">${esc(o.nombre)}</span><span>${esc(o.servicio)}</span></div>
    </article>`;
  }).join("");

  document.getElementById("lista-galeria").innerHTML = galeria.filter(g => g.foto).map(g =>
    `<img src="${esc(urlFoto(g.foto))}" alt="${esc(g.descripcion)}" loading="lazy" />`).join("");

  // Datos de contacto
  const set = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
  const ig = (d.instagram || "").replace(/^@/, "");
  set('[data-dato="zona"]', el => (el.textContent = d.zona));
  set('[data-dato="horarios"]', el => (el.innerHTML = (d.horarios || "").split("|").map(t => esc(t.trim())).join("<br />")));
  set('[data-dato="whatsapp-texto"]', el => (el.textContent = formatearTel(d.whatsapp)));
  set('[data-dato="email"]', el => { el.textContent = d.email; el.href = "mailto:" + d.email; });
  set('[data-dato="instagram"]', el => { el.textContent = "@" + ig; el.href = "https://instagram.com/" + ig; });

  // Botón de reseñas de Google (solo si hay link)
  set('[data-dato="resenas"]', el => { el.hidden = !d.link_resenas_google; el.querySelector("a").href = d.link_resenas_google || "#"; });

  // Turnos (Cal.com)
  const cal = document.getElementById("cal-iframe");
  const calUrl = d.link_reservas + (d.link_reservas.includes("?") ? "&" : "?") + "embed=true&theme=light";
  if (cal.src !== calUrl) cal.src = calUrl; // no recargar el calendario si no cambió
  set(".js-reserva", a => { a.href = d.link_reservas; a.target = "_blank"; a.rel = "noopener"; });

  // WhatsApp
  const wa = `https://wa.me/${(d.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(d.mensaje_whatsapp || "")}`;
  set(".js-chat", a => { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
}

// 5493704641958 → 370 464-1958 (formato argentino; si no coincide, lo deja como está)
function formatearTel(n) {
  const m = String(n || "").replace(/\D/g, "").match(/^549?(\d{3})(\d{3})(\d{4})$/);
  return m ? `${m[1]} ${m[2]}-${m[3]}` : n;
}

document.getElementById("year").textContent = new Date().getFullYear();
pintar(DATOS_RESPALDO);               // se ve al instante con el respaldo…
cargarDatos().then(pintar).catch(e => console.warn("No se pudo leer la planilla", e)); // …y se actualiza con la planilla
