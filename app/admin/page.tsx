"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Logo } from "@/components/Mockups";
import { linkWhatsApp } from "@/lib/config";
import { supabase, type Categoria, type Cotizacion, type Trabajo } from "@/lib/supabase";

const BUCKET = "trabajos";

const estados: { valor: Cotizacion["estado"]; label: string; color: string }[] = [
  { valor: "nueva", label: "Nueva", color: "bg-sol" },
  { valor: "en_proceso", label: "En proceso", color: "bg-lila" },
  { valor: "entregada", label: "Entregada", color: "bg-menta" },
];

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!supabase) return setCargando(false);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <Centro>
        <h1 className="font-display text-3xl font-extrabold">Falta conectar Supabase</h1>
        <p className="mt-3 text-tinta/75">
          Configura <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (mira el README).
        </p>
      </Centro>
    );
  }
  if (cargando) return <Centro>Cargando…</Centro>;
  if (!session) return <Login />;
  return <Panel email={session.user.email ?? ""} />;
}

function Centro({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <div className="tarjeta w-full max-w-md bg-white p-8">{children}</div>
    </main>
  );
}

function Login() {
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEnviando(true);
    setError("");
    const { error } = await supabase!.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setEnviando(false);
    if (error) setError("Correo o contraseña incorrectos.");
  }

  return (
    <Centro>
      <Logo />
      <h1 className="mt-6 font-display text-3xl font-extrabold">Panel de la jefa ✺</h1>
      <form onSubmit={entrar} className="mt-6 space-y-4">
        <div>
          <label className="etiqueta" htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" required className="campo" autoComplete="email" />
        </div>
        <div>
          <label className="etiqueta" htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" required className="campo" autoComplete="current-password" />
        </div>
        {error && <p className="font-bold text-fucsia">{error}</p>}
        <button disabled={enviando} className="btn w-full bg-fucsia text-white">
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </Centro>
  );
}

function Panel({ email }: { email: string }) {
  const [tab, setTab] = useState<"cotizaciones" | "trabajos">("cotizaciones");

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <a href="/">
          <Logo />
        </a>
        <div className="flex items-center gap-3 text-sm font-bold">
          <span className="hidden sm:inline">{email}</span>
          <button onClick={() => supabase!.auth.signOut()} className="btn bg-white !px-4 !py-2 text-sm">
            Salir
          </button>
        </div>
      </header>

      <div className="mt-8 flex gap-2">
        {(["cotizaciones", "trabajos"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border-3 border-tinta px-5 py-2 font-display font-bold capitalize ${
              tab === t ? "bg-tinta text-crema" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">{tab === "cotizaciones" ? <Cotizaciones /> : <Trabajos />}</div>
    </main>
  );
}

function Cotizaciones() {
  const [items, setItems] = useState<Cotizacion[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    const { data } = await supabase!.from("cotizaciones").select("*").order("created_at", { ascending: false });
    setItems((data as Cotizacion[]) ?? []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function cambiarEstado(id: string, estado: Cotizacion["estado"]) {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, estado } : x)));
    await supabase!.from("cotizaciones").update({ estado }).eq("id", id);
  }

  async function borrar(id: string) {
    if (!confirm("¿Borrar esta cotización?")) return;
    setItems((xs) => xs.filter((x) => x.id !== id));
    await supabase!.from("cotizaciones").delete().eq("id", id);
  }

  if (cargando) return <p className="font-bold">Cargando…</p>;
  if (items.length === 0)
    return <div className="tarjeta bg-white p-8 text-center font-display text-xl font-bold">Aún no hay cotizaciones 🌱</div>;

  return (
    <ul className="space-y-4">
      {items.map((c) => {
        const tel = c.whatsapp.replace(/\D/g, "");
        const telIntl = tel.length === 10 ? `57${tel}` : tel;
        return (
          <li key={c.id} className="tarjeta bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-extrabold">{c.nombre}</p>
                <p className="text-sm text-tinta/60">
                  {new Date(c.created_at).toLocaleString("es-CO")} · {c.whatsapp}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {estados.map((e) => (
                  <button
                    key={e.valor}
                    onClick={() => cambiarEstado(c.id, e.valor)}
                    className={`chip ${c.estado === e.valor ? e.color : "bg-white opacity-50 hover:opacity-100"}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 font-bold">
              {c.producto} × {c.cantidad}
              {c.fecha_entrega && <span className="font-normal text-tinta/60"> · para el {c.fecha_entrega}</span>}
            </p>
            {c.idea && <p className="mt-2 whitespace-pre-wrap text-tinta/80">{c.idea}</p>}
            <div className="mt-4 flex gap-2">
              <a
                href={`https://wa.me/${telIntl}?text=${encodeURIComponent(`¡Hola ${c.nombre}! Te escribo de Tintazo por tu cotización 😊`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn bg-menta !px-4 !py-2 text-sm"
              >
                Responder por WhatsApp
              </a>
              <button onClick={() => borrar(c.id)} className="btn bg-white !px-4 !py-2 text-sm">
                Borrar
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Trabajos() {
  const [items, setItems] = useState<Trabajo[]>([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    const { data } = await supabase!.from("trabajos").select("*").order("created_at", { ascending: false });
    setItems((data as Trabajo[]) ?? []);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function subir(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const archivo = f.get("imagen") as File;
    if (!archivo || archivo.size === 0) return;
    if (archivo.size > 5 * 1024 * 1024) return setError("La imagen debe pesar menos de 5 MB.");

    setSubiendo(true);
    setError("");
    const ext = archivo.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const ruta = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: errSubida } = await supabase!.storage.from(BUCKET).upload(ruta, archivo, {
      cacheControl: "31536000",
      contentType: archivo.type,
    });
    if (errSubida) {
      setSubiendo(false);
      return setError("No se pudo subir la imagen: " + errSubida.message);
    }
    const { data: pub } = supabase!.storage.from(BUCKET).getPublicUrl(ruta);
    const { error: errInsert } = await supabase!.from("trabajos").insert({
      titulo: String(f.get("titulo")).trim(),
      categoria: f.get("categoria") as Categoria,
      imagen_url: pub.publicUrl,
    });
    setSubiendo(false);
    if (errInsert) return setError("No se pudo guardar: " + errInsert.message);
    form.reset();
    cargar();
  }

  async function borrar(t: Trabajo) {
    if (!confirm(`¿Borrar "${t.titulo}"?`)) return;
    const ruta = t.imagen_url.split(`/${BUCKET}/`)[1];
    if (ruta) await supabase!.storage.from(BUCKET).remove([ruta]);
    await supabase!.from("trabajos").delete().eq("id", t.id);
    setItems((xs) => xs.filter((x) => x.id !== t.id));
  }

  return (
    <div className="space-y-8">
      <form onSubmit={subir} className="tarjeta grid gap-4 bg-sol p-6 sm:grid-cols-2">
        <h2 className="font-display text-2xl font-extrabold sm:col-span-2">Subir trabajo nuevo</h2>
        <div>
          <label className="etiqueta" htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" required maxLength={60} className="campo" placeholder="Mug para el día del padre" />
        </div>
        <div>
          <label className="etiqueta" htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" className="campo">
            <option value="vasos">Vasos & mugs</option>
            <option value="camisetas">Camisetas</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="etiqueta" htmlFor="imagen">Foto (cuadrada se ve mejor, máx 5 MB)</label>
          <input id="imagen" name="imagen" type="file" accept="image/*" required className="campo file:mr-3 file:rounded-full file:border-0 file:bg-tinta file:px-4 file:py-1 file:text-crema" />
        </div>
        {error && <p className="font-bold text-fucsia sm:col-span-2">{error}</p>}
        <button disabled={subiendo} className="btn bg-fucsia text-white sm:col-span-2">
          {subiendo ? "Subiendo…" : "Publicar en la galería"}
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-center font-bold text-tinta/60">
          Aún no hay trabajos. Mientras tanto la página muestra ejemplos ilustrados.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((t) => (
            <li key={t.id} className="tarjeta overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.imagen_url} alt={t.titulo} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-2 border-t-3 border-tinta p-3">
                <span className="truncate text-sm font-bold">{t.titulo}</span>
                <button onClick={() => borrar(t)} className="text-sm font-bold text-fucsia" aria-label={`Borrar ${t.titulo}`}>
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
