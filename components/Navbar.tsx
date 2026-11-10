"use client";

import { useState } from "react";
import { Logo } from "./Mockups";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#proceso", label: "Cómo funciona" },
  { href: "#precios", label: "Precios" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-3 border-tinta bg-crema/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#inicio" aria-label="Inicio">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 font-display font-bold transition hover:bg-tinta hover:text-crema"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#cotizar" className="btn bg-fucsia !px-5 !py-2 text-white">
            Cotizar
          </a>
          <button
            onClick={() => setAbierto((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border-3 border-tinta bg-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[3px] w-5 rounded bg-tinta transition ${abierto ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[3px] w-5 rounded bg-tinta transition ${abierto ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {abierto && (
        <ul className="border-t-3 border-tinta bg-sol px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setAbierto(false)}
                className="block py-2 font-display text-2xl font-extrabold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
