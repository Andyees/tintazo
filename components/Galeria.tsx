"use client";

import { useState } from "react";
import type { Categoria, Trabajo } from "@/lib/supabase";
import { trabajosEjemplo } from "@/lib/fotos";

const fondos = ["bg-sol", "bg-menta", "bg-lila", "bg-naranja", "bg-white", "bg-fucsia/80"];

const filtros: { valor: "todo" | Categoria; label: string }[] = [
  { valor: "todo", label: "Todo" },
  { valor: "vasos", label: "Vasos & mugs" },
  { valor: "camisetas", label: "Camisetas" },
  { valor: "otros", label: "Otros" },
];

export default function Galeria({ trabajos }: { trabajos: Trabajo[] }) {
  const [filtro, setFiltro] = useState<"todo" | Categoria>("todo");
  // Mientras no haya trabajos propios en Supabase, se muestran fotos de ejemplo.
  const fuente: readonly Pick<Trabajo, "id" | "titulo" | "categoria" | "imagen_url">[] =
    trabajos.length > 0 ? trabajos : trabajosEjemplo;
  const items = fuente.filter((t) => filtro === "todo" || t.categoria === filtro);

  return (
    <section id="trabajos" className="border-y-3 border-tinta bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="chip bg-menta">Portafolio</span>
            <h2 className="titulo-seccion mt-4">
              Trabajos que <br className="hidden sm:block" />
              <span className="text-electrico">sacan sonrisas.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist">
            {filtros.map((f) => (
              <button
                key={f.valor}
                role="tab"
                aria-selected={filtro === f.valor}
                onClick={() => setFiltro(f.valor)}
                className={`rounded-full border-3 border-tinta px-4 py-2 font-display text-sm font-bold transition ${
                  filtro === f.valor ? "bg-tinta text-crema" : "bg-crema hover:bg-sol"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {items.map((item, i) => (
            <figure
              key={item.id}
              className={`tarjeta group overflow-hidden ${fondos[i % fondos.length]} transition duration-300 hover:-translate-y-1 hover:shadow-brutal-lg ${
                i % 2 ? "md:translate-y-6 md:hover:translate-y-5" : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imagen_url}
                  alt={item.titulo}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-2 border-t-3 border-tinta bg-white px-4 py-3">
                <span className="truncate font-display font-bold">{item.titulo}</span>
                <span className="hidden shrink-0 text-xs font-bold uppercase text-tinta/50 sm:inline">{item.categoria}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-10 text-center font-display text-lg font-bold text-tinta/60">
            Pronto subimos trabajos de esta categoría ✺
          </p>
        )}
      </div>
    </section>
  );
}
