import { formatoCOP, precios } from "@/lib/config";

export default function Precios() {
  return (
    <section id="precios" className="border-y-3 border-tinta bg-tinta py-20 text-crema md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="chip border-crema bg-fucsia text-white">Precios</span>
            <h2 className="titulo-seccion mt-4">
              Precios <span className="text-sol">bien bacanos.</span>
            </h2>
          </div>
          <p className="max-w-sm text-crema/70">
            Valores de referencia por unidad. Por cantidad hay descuento — cada pedido se cotiza a la medida.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {precios.map((p) => (
            <article
              key={p.producto}
              className={`relative rounded-3xl border-3 border-crema p-7 text-tinta ${p.color} ${
                p.destacado ? "md:-translate-y-4 shadow-[8px_8px_0_0_#FF3D7F]" : "shadow-[6px_6px_0_0_#FFF6E9]"
              }`}
            >
              {p.destacado && (
                <span className="absolute -top-4 right-6 rotate-3 rounded-full border-3 border-tinta bg-fucsia px-3 py-1 font-display text-sm font-extrabold text-white">
                  El favorito
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold">{p.producto}</h3>
              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-tinta/60">Desde</p>
              <p className="font-display text-5xl font-extrabold tracking-tight">{formatoCOP(p.desde)}</p>
              <p className="mt-4 text-tinta/80">{p.detalle}</p>
              <a href="#cotizar" className="btn mt-6 w-full bg-white">
                Lo quiero
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
