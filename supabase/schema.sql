-- =============================================================
--  Tintazo · Esquema de base de datos
--  Pégalo completo en Supabase > SQL Editor > New query > Run
-- =============================================================

-- ---------- Trabajos (galería) ----------
create table if not exists public.trabajos (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (char_length(titulo) <= 80),
  categoria   text not null default 'vasos' check (categoria in ('vasos', 'camisetas', 'otros')),
  imagen_url  text not null,
  created_at  timestamptz not null default now()
);

alter table public.trabajos enable row level security;

drop policy if exists "trabajos: lectura publica" on public.trabajos;
create policy "trabajos: lectura publica"
  on public.trabajos for select
  to anon, authenticated
  using (true);

drop policy if exists "trabajos: admin escribe" on public.trabajos;
create policy "trabajos: admin escribe"
  on public.trabajos for all
  to authenticated
  using (true)
  with check (true);

-- ---------- Cotizaciones ----------
create table if not exists public.cotizaciones (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null check (char_length(nombre) between 1 and 80),
  whatsapp       text not null check (char_length(whatsapp) between 7 and 20),
  producto       text check (char_length(producto) <= 60),
  cantidad       int  check (cantidad between 1 and 5000),
  fecha_entrega  date,
  idea           text check (char_length(idea) <= 1000),
  estado         text not null default 'nueva' check (estado in ('nueva', 'en_proceso', 'entregada')),
  created_at     timestamptz not null default now()
);

alter table public.cotizaciones enable row level security;

-- Cualquier visitante puede ENVIAR una cotización, pero no leerlas.
drop policy if exists "cotizaciones: publico inserta" on public.cotizaciones;
create policy "cotizaciones: publico inserta"
  on public.cotizaciones for insert
  to anon, authenticated
  with check (estado = 'nueva');

drop policy if exists "cotizaciones: admin lee" on public.cotizaciones;
create policy "cotizaciones: admin lee"
  on public.cotizaciones for select
  to authenticated
  using (true);

drop policy if exists "cotizaciones: admin actualiza" on public.cotizaciones;
create policy "cotizaciones: admin actualiza"
  on public.cotizaciones for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "cotizaciones: admin borra" on public.cotizaciones;
create policy "cotizaciones: admin borra"
  on public.cotizaciones for delete
  to authenticated
  using (true);

-- ---------- Storage: bucket público para las fotos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('trabajos', 'trabajos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

drop policy if exists "fotos: admin sube" on storage.objects;
create policy "fotos: admin sube"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'trabajos');

drop policy if exists "fotos: admin borra" on storage.objects;
create policy "fotos: admin borra"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'trabajos');
