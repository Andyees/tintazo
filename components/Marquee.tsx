const items = ["Vasos", "Camisetas", "Mugs mágicos", "Cojines", "Portarretratos", "Rompecabezas", "Regalos", "Empresas"];

export default function Marquee({ invertido = false }: { invertido?: boolean }) {
  const fila = [...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y-3 border-tinta py-4 ${
        invertido ? "-rotate-1 bg-sol text-tinta" : "rotate-1 bg-tinta text-sol"
      }`}
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
            {fila.map((t, i) => (
              <span key={i} className="flex items-center gap-6 px-3 font-display text-2xl font-extrabold uppercase md:text-3xl">
                {t}
                <span className={invertido ? "text-fucsia" : "text-fucsia"}>✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
