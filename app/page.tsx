import Cotizar from "@/components/Cotizar";
import EnVideo from "@/components/EnVideo";
import Footer, { WhatsAppFlotante } from "@/components/Footer";
import Galeria from "@/components/Galeria";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Preguntas from "@/components/Preguntas";
import Precios from "@/components/Precios";
import Proceso from "@/components/Proceso";
import Servicios from "@/components/Servicios";
import { supabase, type Trabajo } from "@/lib/supabase";

// Vuelve a consultar los trabajos cada 60 segundos.
export const revalidate = 60;

async function obtenerTrabajos(): Promise<Trabajo[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("trabajos")
      .select("id, titulo, categoria, imagen_url, created_at")
      .order("created_at", { ascending: false })
      .limit(24);
    if (error) throw error;
    return data ?? [];
  } catch (e) {
    console.error("No se pudieron cargar los trabajos", e);
    return [];
  }
}

export default async function Home() {
  const trabajos = await obtenerTrabajos();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Servicios />
        <EnVideo />
        <Galeria trabajos={trabajos} />
        <Proceso />
        <Marquee invertido />
        <Precios />
        <Cotizar />
        <Preguntas />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
