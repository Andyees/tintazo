const faqs = [
  {
    p: "¿Qué es la sublimación?",
    r: "Es una técnica donde la tinta, con calor y presión, se convierte en gas y se fusiona con el material. Por eso el diseño no se pela, no se craquela y aguanta muchísimas lavadas.",
  },
  {
    p: "¿Puedo pedir una sola unidad?",
    r: "¡Claro! Hacemos desde 1 unidad. Y si pides varias, te damos mejor precio.",
  },
  {
    p: "¿Cuánto se demora mi pedido?",
    r: "Normalmente entre 1 y 3 días hábiles después de aprobar el diseño. Si es urgente, cuéntanos y miramos cómo te ayudamos.",
  },
  {
    p: "¿Las camisetas pueden ser de algodón?",
    r: "La sublimación funciona en poliéster (o telas con alto porcentaje de poliéster) y en colores claros. Usamos telas con tacto tipo algodón, súper cómodas.",
  },
  {
    p: "¿Hacen envíos?",
    r: "Sí, enviamos a todo el país. El costo depende de la ciudad y lo incluimos en la cotización.",
  },
  {
    p: "¿Cómo pago?",
    r: "Transferencia, Nequi o Daviplata. Se separa el pedido con el 50% y el resto contra entrega.",
  },
];

export default function Preguntas() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 md:pb-28">
      <div className="text-center">
        <span className="chip bg-naranja">Preguntas</span>
        <h2 className="titulo-seccion mt-4">Lo que siempre nos preguntan</h2>
      </div>
      <div className="mt-12 space-y-4">
        {faqs.map((f) => (
          <details key={f.p} className="tarjeta group bg-white p-0 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg font-extrabold md:text-xl">
              {f.p}
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-3 border-tinta bg-sol text-xl transition group-open:rotate-45 group-open:bg-fucsia group-open:text-white">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-tinta/75">{f.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
