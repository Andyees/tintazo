// ============================================================
//  ✏️  EDITA AQUÍ los datos del negocio. Todo el sitio los usa.
// ============================================================

export const marca = {
  nombre: "Tintazo",
  slogan: "Lo que imaginas, sublimado.",
  descripcion:
    "Vasos, mugs y camisetas personalizadas con sublimación de alta calidad. Diseños únicos para regalar, celebrar o emprender.",
  // Número de WhatsApp con indicativo de país, sin + ni espacios (57 = Colombia)
  whatsapp: "573000000000",
  instagram: "tintazo.co",
  ciudad: "Colombia",
};

export const precios = [
  {
    producto: "Vaso sin asa",
    desde: 18000,
    detalle: "Vaso sublimado a todo color. El detalle perfecto y el más económico.",
    color: "bg-naranja",
  },
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

export const productosCotizacion = [
  "Mug clásico",
  "Mug mágico",
  "Vaso sin asa",
  "Termo",
  "Camiseta",
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
