/* eslint-disable @next/next/no-img-element */
import { fotos } from "@/lib/fotos";
import { Estallido } from "./Mockups";

export default function Hero() {
  return (
    <section id="inicio" className="fondo-puntos relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:pb-24 md:pt-16">
        <div>
          <span className="chip bg-white">✺ Taller de sublimación hecho con amor</span>

          <h1 className="mt-5 font-display text-[3.2rem] font-extrabold leading-[0.92] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Lo que imaginas,{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-[-0.15em] bottom-[0.08em] top-[0.35em] -z-0 -rotate-2 rounded-xl bg-sol" />
              <span className="relative">sublimado.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-tinta/80">
            Vasos, mugs y camisetas con tu foto, tu frase o tu locura favorita. Colores que no se
            caen, diseños que nadie más tiene.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cotizar" className="btn bg-fucsia text-white">
              Cotiza tu diseño →
            </a>
            <a href="#trabajos" className="btn bg-white">
              Ver trabajos
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm font-bold">
            {["Desde 1 unidad", "Te ayudamos con el diseño", "Envíos a todo el país"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-menta text-[11px] text-tinta">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Collage de fotos tipo polaroid */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[8%] rounded-full border-3 border-tinta bg-fucsia" />
          <div className="absolute inset-[22%] rounded-full border-3 border-dashed border-white/50" />

          <figure
            className="absolute left-[0%] top-[6%] w-[56%] animate-float rounded-2xl border-3 border-tinta bg-white p-2 pb-3 shadow-brutal-lg"
            style={{ ["--r" as string]: "-7deg" }}
          >
            <img src={fotos.mugFuego} alt="Mug sublimado con diseño anime de fuego" className="aspect-[4/5] w-full rounded-lg object-cover" />
            <figcaption className="mt-2 text-center font-display text-sm font-extrabold">Hecho en el taller 🔥</figcaption>
          </figure>

          <figure
            className="absolute bottom-[0%] right-[0%] w-[52%] animate-float-slow rounded-2xl border-3 border-tinta bg-white p-2 pb-3 shadow-brutal-lg"
            style={{ ["--r" as string]: "6deg", animationDelay: "-2s" }}
          >
            <img src={fotos.heroCamiseta} alt="Camiseta con estampado personalizado" className="aspect-[4/5] w-full rounded-lg object-cover object-top" />
            <figcaption className="mt-2 text-center font-display text-sm font-extrabold">Camisetas full color 👕</figcaption>
          </figure>

          <Estallido className="absolute right-[6%] top-[2%] h-28 w-28 sm:h-32 sm:w-32" color="#FFD23F">
            <span className="rotate-12 font-display text-sm font-extrabold leading-tight sm:text-base">
              100%
              <br />
              tuyo
            </span>
          </Estallido>

          <span className="absolute bottom-[10%] left-[2%] -rotate-6 rounded-xl border-3 border-tinta bg-menta px-3 py-1.5 font-display text-sm font-extrabold shadow-brutal-sm">
            🔥 Hecho a 200°C
          </span>
        </div>
      </div>
    </section>
  );
}
