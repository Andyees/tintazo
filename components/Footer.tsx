import { linkWhatsApp, marca } from "@/lib/config";
import { Logo } from "./Mockups";

export function WhatsAppFlotante() {
  return (
    <a
      href={linkWhatsApp("¡Hola! Quiero información sobre sus productos personalizados 🙌")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full border-3 border-tinta bg-[#25D366] shadow-brutal transition hover:-translate-y-1 hover:shadow-brutal-lg"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="#1A1423" aria-hidden>
        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.2-4-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7C5.3 9.7 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26.2 16 26.2zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-3 border-tinta bg-sol">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-display text-2xl font-extrabold leading-tight">{marca.slogan}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={linkWhatsApp("¡Hola! 👋")} target="_blank" rel="noreferrer" className="btn bg-white">
            WhatsApp
          </a>
          <a
            href={`https://instagram.com/${marca.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="btn bg-fucsia text-white"
          >
            @{marca.instagram}
          </a>
        </div>
      </div>
      <div className="border-t-3 border-tinta">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm font-bold">
          © {new Date().getFullYear()} {marca.nombre} · Hecho con ♥ en {marca.ciudad}
        </p>
      </div>
    </footer>
  );
}
