"use client";

import { useState } from "react";
import { linkWhatsApp, productosCotizacion } from "@/lib/config";
import { supabase } from "@/lib/supabase";

type Estado = "idle" | "enviando" | "ok" | "error";

export default function Cotizar() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensajeWA, setMensajeWA] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const datos = {
      nombre: String(f.get("nombre") ?? "").trim(),
      whatsapp: String(f.get("whatsapp") ?? "").trim(),
      producto: String(f.get("producto") ?? ""),
      cantidad: Number(f.get("cantidad") || 1),
      fecha_entrega: String(f.get("fecha_entrega") ?? "") || null,
      idea: String(f.get("idea") ?? "").trim(),
    };

    const texto =
      `¡Hola! Soy ${datos.nombre} 👋\n` +
      `Quiero cotizar: ${datos.producto} x${datos.cantidad}\n` +
      (datos.fecha_entrega ? `Lo necesito para: ${datos.fecha_entrega}\n` : "") +
      (datos.idea ? `Mi idea: ${datos.idea}` : "");
    setMensajeWA(texto);

    // Sin Supabase configurado, la cotización va directo a WhatsApp.
    if (!supabase) {
      window.open(linkWhatsApp(texto), "_blank");
      setEstado("ok");
      return;
    }

    setEstado("enviando");
    const { error } = await supabase.from("cotizaciones").insert(datos);
    if (error) {
      console.error(error);
      setEstado("error");
      return;
    }
    setEstado("ok");
  }

  return (
    <section id="cotizar" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="tarjeta grid overflow-hidden bg-white md:grid-cols-[1fr_1.2fr]">
        <div className="fondo-puntos relative flex flex-col justify-between gap-8 border-b-3 border-tinta bg-fucsia p-8 text-white md:border-b-0 md:border-r-3 md:p-12">
          <div>
            <span className="chip border-tinta bg-sol text-tinta">Cotización gratis</span>
            <h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
              ¿Tienes una idea? <br />
              <span className="text-tinta">Hagámosla realidad.</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-white/90">
              Cuéntanos qué quieres y te respondemos por WhatsApp con el diseño y el precio. Sin compromiso.
            </p>
          </div>
          <ul className="space-y-2 font-display font-bold">
            <li>⚡ Respondemos el mismo día</li>
            <li>🎨 Diseño incluido en tu pedido</li>
            <li>💬 Te mostramos todo antes de producir</li>
          </ul>
        </div>

        <div className="p-8 md:p-12">
          {estado === "ok" ? (
            <div className="flex h-full flex-col items-start justify-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-full border-3 border-tinta bg-menta text-3xl">✓</span>
              <h3 className="font-display text-4xl font-extrabold">¡Recibido!</h3>
              <p className="max-w-sm text-tinta/75">
                Ya tenemos tu idea. Si quieres agilizar, mándanos también un WhatsApp con imágenes de referencia.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={linkWhatsApp(mensajeWA)} target="_blank" rel="noreferrer" className="btn bg-menta">
                  Seguir por WhatsApp
                </a>
                <button onClick={() => setEstado("idle")} className="btn bg-white">
                  Otra cotización
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={enviar} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="etiqueta" htmlFor="nombre">Tu nombre</label>
                <input id="nombre" name="nombre" required maxLength={80} className="campo" placeholder="Laura Gómez" />
              </div>
              <div>
                <label className="etiqueta" htmlFor="whatsapp">WhatsApp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  required
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9+ ]{7,20}"
                  className="campo"
                  placeholder="300 123 4567"
                />
              </div>
              <div>
                <label className="etiqueta" htmlFor="producto">Producto</label>
                <select id="producto" name="producto" className="campo">
                  {productosCotizacion.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="etiqueta" htmlFor="cantidad">Cantidad</label>
                <input id="cantidad" name="cantidad" type="number" min={1} max={5000} defaultValue={1} className="campo" />
              </div>
              <div>
                <label className="etiqueta" htmlFor="fecha_entrega">¿Para cuándo?</label>
                <input id="fecha_entrega" name="fecha_entrega" type="date" className="campo" />
              </div>
              <div className="sm:col-span-2">
                <label className="etiqueta" htmlFor="idea">Tu idea</label>
                <textarea
                  id="idea"
                  name="idea"
                  rows={4}
                  maxLength={1000}
                  className="campo resize-none"
                  placeholder="Ej: Un mug con la foto de mi perrito y la frase 'el mejor roomie'…"
                />
              </div>

              {estado === "error" && (
                <p className="rounded-2xl border-3 border-tinta bg-naranja p-3 text-sm font-bold sm:col-span-2">
                  Uy, algo falló. Escríbenos directo{" "}
                  <a className="underline" href={linkWhatsApp(mensajeWA)} target="_blank" rel="noreferrer">
                    por WhatsApp
                  </a>
                  .
                </p>
              )}

              <button type="submit" disabled={estado === "enviando"} className="btn bg-sol sm:col-span-2">
                {estado === "enviando" ? "Enviando…" : "Enviar cotización ✺"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
