"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { fotos } from "@/lib/fotos";
import { Estallido } from "./Mockups";

export default function EnVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(false);

  // Solo reproduce el video cuando está en pantalla (ahorra datos en celular).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPausado(false);
    } else {
      v.pause();
      setPausado(true);
    }
  }

  return (
    <section className="relative overflow-hidden border-y-3 border-tinta bg-electrico py-20 text-white md:py-28">
      <div className="fondo-puntos pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Texto */}
        <div className="order-2 md:order-1">
          <span className="chip border-tinta bg-sol text-tinta">🎬 Recién salidos del horno</span>
          <h2 className="titulo-seccion mt-4">
            Míralos <span className="text-sol">de cerquita.</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg text-white/85">
            Así quedan los mugs en la vida real: colores vivos, brillo de cerámica y el diseño de lado a lado.
          </p>
          <ul className="mt-6 space-y-2 font-display font-bold">
            <li>🔥 Diseño envolvente 360°</li>
            <li>✍️ Con nombre, frase o foto</li>
            <li>💧 Aguanta microondas y lavadas a mano</li>
          </ul>
          <a href="#cotizar" className="btn mt-8 bg-sol text-tinta">
            Quiero el mío →
          </a>
        </div>

        {/* Celular con el video */}
        <div className="relative order-1 mx-auto md:order-2">
          <div className="relative w-[260px] rotate-2 rounded-[2.6rem] border-[5px] border-tinta bg-tinta p-2 shadow-[10px_10px_0_0_#1A1423] sm:w-[290px]">
            <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-tinta" />
            <video
              ref={ref}
              src={fotos.video}
              poster={fotos.videoPoster}
              muted
              loop
              playsInline
              preload="metadata"
              onClick={alternar}
              aria-label="Video de mugs sublimados del taller"
              className="aspect-[9/16] w-full cursor-pointer rounded-[2rem] object-cover"
            />
            {pausado && (
              <button
                onClick={alternar}
                aria-label="Reproducir video"
                className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full border-3 border-tinta bg-sol text-2xl text-tinta"
              >
                ▶
              </button>
            )}
          </div>
          <Estallido className="absolute -right-6 -top-8 z-10 h-24 w-24 sm:-right-10" color="#FF3D7F">
            <span className="-rotate-12 font-display text-xs font-extrabold leading-tight">
              ¡Hechos
              <br />
              por ella!
            </span>
          </Estallido>
        </div>

        {/* Fotos reales */}
        <div className="order-3 grid grid-cols-2 gap-4 md:grid-cols-1">
          {[
            { src: fotos.mugsPareja, alt: "Mugs personalizados con nombre", texto: "Con tu nombre", rot: "-rotate-3" },
            { src: fotos.mugFlash, alt: "Mug sublimado de superhéroe", texto: "Tu personaje fav", rot: "rotate-3" },
          ].map((f) => (
            <figure key={f.src} className={`${f.rot} rounded-2xl border-3 border-tinta bg-white p-2 pb-3 text-tinta shadow-brutal transition hover:rotate-0`}>
              <img src={f.src} alt={f.alt} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover md:aspect-[5/4]" />
              <figcaption className="mt-2 text-center font-display text-sm font-extrabold">{f.texto}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
