/* eslint-disable @next/next/no-img-element */
import { fotos } from "@/lib/fotos";

const extras = [
  { titulo: "Mug mágico", texto: "Negro por fuera. Le echas café caliente y ¡pum! aparece tu diseño.", icono: "✨", color: "bg-lila", foto: fotos.mugNegro },
  { titulo: "Vasos y termos", texto: "Para el gym, la oficina o la U. Personalizados con nombre o foto.", icono: "🥤", color: "bg-naranja", foto: fotos.mugExterior },
  { titulo: "Combos regalo", texto: "Mug + camiseta + empaque bonito. Perfecto para cumpleaños y fechas especiales.", icono: "🎁", color: "bg-menta", foto: fotos.empaque },
  { titulo: "Pedidos por mayor", texto: "Uniformes, eventos, recordatorios y merch para tu marca o empresa.", icono: "📦", color: "bg-sol", foto: fotos.merch },
];

function TarjetaGrande({
  titulo,
  texto,
  foto,
  alt,
  color,
  chip,
}: {
  titulo: string;
  texto: string;
  foto: string;
  alt: string;
  color: string;
  chip: string;
}) {
  return (
    <article className={`tarjeta group relative overflow-hidden ${color} text-white`}>
      <div className="relative aspect-[4/3] overflow-hidden border-b-3 border-tinta">
        <img
          src={foto}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="chip absolute left-4 top-4 bg-white text-tinta">{chip}</span>
      </div>
      <div className="p-7">
        <h3 className="font-display text-4xl font-extrabold">{titulo}</h3>
        <p className="mt-2 max-w-md text-white/90">{texto}</p>
      </div>
    </article>
  );
}

export default function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="max-w-2xl">
        <span className="chip bg-sol">Lo que hacemos</span>
        <h2 className="titulo-seccion mt-4">
          Si se puede sublimar, <span className="text-fucsia">lo hacemos.</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <TarjetaGrande
          titulo="Vasos & mugs"
          texto="Cerámica de 11oz con impresión a todo color que aguanta lavadas y microondas."
          foto={fotos.mugNoche}
          alt="Mug sublimado con diseño anime a todo color"
          color="bg-electrico"
          chip="☕ El clásico"
        />
        <TarjetaGrande
          titulo="Camisetas"
          texto="Diseños full color que no se craquelan ni se despegan. Tallas S a XXL."
          foto={fotos.camisetaColor}
          alt="Camiseta con estampado a todo color"
          color="bg-fucsia"
          chip="👕 Full color"
        />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {extras.map((e) => (
          <article key={e.titulo} className={`tarjeta group overflow-hidden ${e.color} transition hover:-translate-y-1`}>
            <div className="relative aspect-[4/3] overflow-hidden border-b-3 border-tinta">
              <img src={e.foto} alt={e.titulo} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute -bottom-0 right-3 grid h-12 w-12 translate-y-1/2 place-items-center rounded-2xl border-3 border-tinta bg-white text-2xl">
                {e.icono}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-extrabold">{e.titulo}</h3>
              <p className="mt-2 text-tinta/80">{e.texto}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
