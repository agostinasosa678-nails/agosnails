/* =====================================================================
   DATOS DE RESPALDO
   ---------------------------------------------------------------------
   Los datos "de verdad" se editan en la planilla de Google Sheets.
   Este archivo solo se usa si la planilla no se puede leer (sin internet,
   planilla no compartida, etc.), para que la web nunca quede vacía.
   Conviene actualizarlo de vez en cuando con lo mismo que tiene la planilla.
   ===================================================================== */

const DATOS_RESPALDO = {
  servicios: [
    { nombre: "Semipermanente", descripcion: "Color duradero y brillo impecable por semanas.", detalle: "Diseño liso", precio: "$12 mil" },
    { nombre: "Soft gel", descripcion: "Diseño a mano alzada, con terminación natural y resistente.", detalle: "Mano alzada", precio: "$16 mil" },
    { nombre: "Soft gel full diseño", descripcion: "Strass, personalizado 3D y todo lo que imagines.", detalle: "Full diseño", precio: "$20 mil" },
    { nombre: "Extensiones de gel", descripcion: "Largo y forma a tu gusto, full diseño o clásico.", detalle: "Full diseño o clásico", precio: "$22 mil" },
    { nombre: "Kapping", descripcion: "Refuerzo sobre tu uña natural para que crezca fuerte y linda.", detalle: "Uña natural", precio: "Consultar" },
    { nombre: "Diseño o strass", descripcion: "Sumale detalles a cualquier servicio: dorados, piedras, nail art.", detalle: "Por uña", precio: "$3 mil c/u" },
  ],

  // ⚠ Opiniones DE EJEMPLO: reemplazar por reseñas reales
  opiniones: [
    { nombre: "Clienta de ejemplo 1", servicio: "Soft gel full diseño", estrellas: 5, comentario: "Me encantó el diseño, súper prolijo y me duró un montón. ¡Agos es una genia!" },
    { nombre: "Clienta de ejemplo 2", servicio: "Semipermanente", estrellas: 5, comentario: "Muy cómodo que venga a domicilio. Puntual, atenta y las uñas quedaron hermosas." },
    { nombre: "Clienta de ejemplo 3", servicio: "Extensiones de gel", estrellas: 5, comentario: "Le llevé una foto de lo que quería y quedó igual o mejor. Ya saqué el próximo turno." },
  ],

  galeria: [
    { foto: "trabajo1.jpg", descripcion: "Nail art con diseños en blanco y negro" },
    { foto: "trabajo2.jpg", descripcion: "Diseño marmolado lila con dorado" },
    { foto: "trabajo3.jpg", descripcion: "Uñas rojas con diseño de corazones" },
    { foto: "trabajo4.jpg", descripcion: "Esmaltado efecto perla" },
    { foto: "trabajo5.jpg", descripcion: "Uñas bordó con estrellas doradas" },
    { foto: "trabajo6.jpg", descripcion: "Nail art verde, dorado y mariposa" },
  ],

  datos: {
    whatsapp: "5493704641958",
    mensaje_whatsapp: "Hola Agos! Quiero consultar por un turno 💅",
    link_reservas: "https://cal.com/agostina-sosa-nck3qb",
    link_resenas_google: "",
    instagram: "agostinasosa_ok",
    email: "agostinasosa678@gmail.com",
    zona: "Formosa, Argentina · En el estudio y a domicilio",
    horarios: "Todos los días: 8:00 a 22:00 hs",
  },
};
