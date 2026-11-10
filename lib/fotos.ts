// Fotos de la página.
// - Las de /fotos/... son trabajos reales del taller (carpeta public/fotos).
// - Las de Pexels son de stock gratis (uso comercial permitido): cámbialas por
//   fotos propias apenas las tengas, poniéndolas en public/fotos y cambiando la ruta.

const pexels = (ruta: string, w = 900) =>
  `https://images.pexels.com/photos/${ruta}?auto=compress&cs=tinysrgb&w=${w}`;

export const fotos = {
  // ✅ Trabajos reales
  mugFuego: "/fotos/mug-fuego.webp",
  mugNoche: "/fotos/mug-noche.webp",
  mugFlash: "/fotos/mug-flash.webp",
  mugsPareja: "/fotos/mugs-pareja.webp",
  video: "/videos/taller.mp4",
  videoPoster: "/fotos/video-poster.webp",

  // 📷 Stock (pendiente reemplazar por fotos propias)
  heroCamiseta: pexels("36908588/pexels-photo-36908588/free-photo-of-casual-oversized-white-t-shirt-with-bold-print.jpeg"),
  camisetaColor: pexels("37186394/pexels-photo-37186394/free-photo-of-man-wearing-oversized-printed-t-shirt-with-bold-design.jpeg", 1000),
  mugNegro: pexels("34644/pexels-photo.jpg", 600),
  mugExterior: pexels("8341843/pexels-photo-8341843.jpeg", 600),
  empaque: pexels("7309213/pexels-photo-7309213.jpeg", 600),
  merch: pexels("32963961/pexels-photo-32963961/free-photo-of-cafe-merchandise-display-with-t-shirts-and-caps.jpeg", 600),
  plancha: pexels("9314012/pexels-photo-9314012.jpeg", 1400),
};

/** Trabajos para la galería mientras no haya fotos subidas desde /admin. */
export const trabajosEjemplo = [
  { id: "r1", titulo: "Mug anime · Fuego", categoria: "vasos", imagen_url: fotos.mugFuego },
  { id: "e2", titulo: "Camiseta con frase", categoria: "camisetas", imagen_url: pexels("36908588/pexels-photo-36908588/free-photo-of-casual-oversized-white-t-shirt-with-bold-print.jpeg", 600) },
  { id: "r2", titulo: "Mug anime · Noche", categoria: "vasos", imagen_url: fotos.mugNoche },
  { id: "e4", titulo: "Camiseta full color", categoria: "camisetas", imagen_url: pexels("37186394/pexels-photo-37186394/free-photo-of-man-wearing-oversized-printed-t-shirt-with-bold-design.jpeg", 600) },
  { id: "r3", titulo: "Mug superhéroe", categoria: "vasos", imagen_url: fotos.mugFlash },
  { id: "e6", titulo: "Camiseta ilustrada", categoria: "camisetas", imagen_url: pexels("36942017/pexels-photo-36942017/free-photo-of-stylish-oversized-men-s-t-shirt-with-abstract-print.jpeg", 600) },
  { id: "r4", titulo: "Mugs con nombre", categoria: "vasos", imagen_url: fotos.mugsPareja },
  { id: "e7", titulo: "Merch para marca", categoria: "otros", imagen_url: pexels("32963962/pexels-photo-32963962/free-photo-of-white-t-shirts-on-hangers-with-coffee-branding.jpeg", 600) },
] as const;
