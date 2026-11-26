/* =====================================================================
   SERVICIOS Y PRECIOS DE AGOS NAILS
   ---------------------------------------------------------------------
   Para cambiar un precio, cambiá solo el texto entre comillas de "precio".
   Para agregar un servicio, copiá un bloque { ... }, pegalo debajo y
   cambiale los datos. No te olvides la coma entre bloques.
   Para quitar un servicio, borrá su bloque { ... } completo.

   Después de guardar, recargá la página (F5) y ya se ve el cambio.
   ===================================================================== */

const SERVICIOS = [
  {
    nombre: "Semipermanente",
    descripcion: "Color duradero y brillo impecable por semanas.",
    detalle: "Diseño liso",
    precio: "$12 mil",
  },
  {
    nombre: "Soft gel",
    descripcion: "Diseño a mano alzada, con terminación natural y resistente.",
    detalle: "Mano alzada",
    precio: "$16 mil",
  },
  {
    nombre: "Soft gel full diseño",
    descripcion: "Strass, personalizado 3D y todo lo que imagines.",
    detalle: "Full diseño",
    precio: "$20 mil",
  },
  {
    nombre: "Extensiones de gel",
    descripcion: "Largo y forma a tu gusto, full diseño o clásico.",
    detalle: "Full diseño o clásico",
    precio: "$22 mil",
  },
  {
    nombre: "Kapping",
    descripcion: "Refuerzo sobre tu uña natural para que crezca fuerte y linda.",
    detalle: "Uña natural",
    precio: "Consultar",
  },
  {
    nombre: "Diseño o strass",
    descripcion: "Sumale detalles a cualquier servicio: dorados, piedras, nail art.",
    detalle: "Por uña",
    precio: "$3 mil c/u",
  },
];
