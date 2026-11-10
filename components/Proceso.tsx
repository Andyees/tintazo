import { fotos } from "@/lib/fotos";

const pasos = [
  { n: "01", titulo: "Cuéntanos tu idea", texto: "Una foto, una frase, un meme… o solo la vibra que quieres. Por el formulario o WhatsApp.", color: "bg-sol" },
  { n: "02", titulo: "Te mostramos el diseño", texto: "Armamos una vista previa y la ajustamos contigo hasta que te encante.", color: "bg-menta" },
  { n: "03", titulo: "Lo sublimamos", texto: "Tinta + calor + presión. El diseño queda dentro del material: no se pela.", color: "bg-fucsia" },
  { n: "04", titulo: "¡Listo para ti!", texto: "Lo recoges o te lo enviamos bien empacado a donde estés.", color: "bg-lila" },
];

export default function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="text-center">
        <span className="chip bg-lila">Cómo funciona</span>
        <h2 className="titulo-seccion mx-auto mt-4 max-w-3xl">
          De tu cabeza a tus manos en <span className="underline decoration-fucsia decoration-[6px] underline-offset-8">4 pasos.</span>
        </h2>
      </div>

      <figure className="tarjeta relative mt-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fotos.plancha}
          alt="Camiseta en la plancha de sublimación"
          loading="lazy"
          className="aspect-[16/9] w-full object-cover md:aspect-[21/8]"
        />
        <figcaption className="absolute bottom-4 left-4 -rotate-2 rounded-xl border-3 border-tinta bg-sol px-4 py-2 font-display text-lg font-extrabold shadow-brutal-sm md:bottom-6 md:left-6 md:text-2xl">
          Así se hace la magia ✺
        </figcaption>
      </figure>

      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pasos.map((p, i) => (
          <li key={p.n} className={`tarjeta relative bg-white p-6 ${i % 2 ? "lg:mt-10" : ""}`}>
            <span
              className={`absolute -top-6 left-6 grid h-12 w-16 place-items-center rounded-full border-3 border-tinta ${p.color} font-display text-xl font-extrabold`}
            >
              {p.n}
            </span>
            <h3 className="mt-6 font-display text-2xl font-extrabold">{p.titulo}</h3>
            <p className="mt-2 text-tinta/75">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
