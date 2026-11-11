// ============================================================
//  ✏️  EDITA AQUÍ los datos del negocio. Todo el sitio los usa.
// ============================================================

export const marca = {
  nombre: "Tintazo",
  slogan: "Lo que imaginas, sublimado.",
  descripcion:
    "Vasos, mugs y camisetas personalizadas con sublimación de alta calidad. Diseños únicos para regalar, celebrar o emprender.",
  // Número de WhatsApp con indicativo de país, sin + ni espacios (57 = Colombia)
  whatsapp: "573226171395",
  instagram: "tintazo.co",
  ciudad: "Colombia",
};

export const precios = [
  {
    producto: "Mug clásico 11oz",
    desde: 25000,
    detalle: "Cerámica blanca, diseño a todo color, apto para microondas.",
    color: "bg-sol",
  },
  {
    producto: "Camiseta sublimada",
    desde: 35000,
    detalle: "Tela poliéster tacto algodón, tallas S a XXL.",
    color: "bg-menta",
    destacado: true,
  },
  {
    producto: "Mug mágico",
    desde: 38000,
    detalle: "Negro por fuera; con bebida caliente aparece tu diseño.",
    color: "bg-lila",
  },
];

/** Otros productos personalizados (tarjetas pequeñas debajo de los precios). */
export const otrosProductos = [
  {
    producto: "Cojín 40×40",
    precio: 30000,
    detalle: "Funda suave con tu foto o diseño. El abrazo perfecto.",
    icono: "🛋️",
    color: "bg-sol",
  },
  {
    producto: "Portarretrato con base de madera",
    precio: 25000,
    detalle: "Tu foto favorita impresa, sobre base de madera.",
    icono: "🖼️",
    color: "bg-menta",
  },
  {
    producto: "Portarretrato pequeño",
    precio: 20000,
    detalle: "Pequeño, con tu foto y su base. Ideal para el escritorio o la mesa de noche.",
    icono: "🪟",
    color: "bg-lila",
  },
  {
    producto: "Rompecabezas personalizado",
    precio: 18000,
    detalle: "Arma tu foto favorita pieza por pieza. Regalo top.",
    icono: "🧩",
    color: "bg-naranja",
  },
];

export const productosCotizacion = [
  "Mug clásico",
  "Mug mágico",
  "Vaso / termo",
  "Camiseta",
  "Cojín 40×40",
  "Portarretrato con base de madera",
  "Portarretrato pequeño",
  "Rompecabezas",
  "Combo regalo",
  "Pedido por mayor / empresa",
  "Otro",
];

export function formatoCOP(valor: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function linkWhatsApp(mensaje: string) {
  return `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
