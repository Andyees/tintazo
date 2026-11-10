import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** null cuando aún no se han configurado las variables de entorno. */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export type Categoria = "vasos" | "camisetas" | "otros";

export type Trabajo = {
  id: string;
  titulo: string;
  categoria: Categoria;
  imagen_url: string;
  created_at?: string;
};

export type Cotizacion = {
  id: string;
  nombre: string;
  whatsapp: string;
  producto: string | null;
  cantidad: number | null;
  fecha_entrega: string | null;
  idea: string | null;
  estado: "nueva" | "en_proceso" | "entregada";
  created_at: string;
};
