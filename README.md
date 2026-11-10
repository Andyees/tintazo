# tintazo. ✺

> **Lo que imaginas, sublimado.** Página web para vender vasos, mugs y camisetas sublimadas.

**Tintazo** = *tinta* (sublimación) + *tinto* (el cafecito en el mug) + el "‑azo" de "golazo". 🔥

Hecho con **Next.js 14 + Tailwind + Supabase**, listo para **Vercel**. Todo en planes **gratis**.

---

## Qué trae

| Sección | Qué hace |
|---|---|
| Hero | Título grande, mug y camiseta ilustrados flotando, botones a cotizar |
| Servicios | Vasos & mugs, camisetas, mug mágico, termos, combos, por mayor |
| Trabajos | Galería con filtros. Muestra ejemplos ilustrados hasta que subas fotos reales |
| Cómo funciona | Los 4 pasos del pedido |
| Precios | Precios "desde" en COP (se editan en `lib/config.ts`) |
| Cotizar | Formulario que guarda en Supabase y abre WhatsApp con el mensaje armado |
| Preguntas | FAQ desplegable |
| `/admin` | Panel privado: ver/gestionar cotizaciones y subir fotos a la galería |

Botón flotante de WhatsApp en toda la página.

---

## 1. Personalizar (2 min)

Abre **`lib/config.ts`** y cambia:

- `whatsapp`: el número con indicativo, sin + ni espacios → `573001234567`
- `instagram`: el usuario sin @
- `precios`: productos y valores

Las preguntas frecuentes están en `components/Preguntas.tsx`.

### Fotos

Por ahora la página usa fotos gratis de [Pexels](https://www.pexels.com/license/) (se permite uso comercial). **Lo ideal es cambiarlas por fotos reales de sus trabajos**:

- **Galería:** sube las fotos desde `/admin`. Apenas haya una, los ejemplos desaparecen solos.
- **Inicio, servicios y proceso:** guarda la foto en `public/fotos/` y cambia la ruta en `lib/fotos.ts` (ej. `heroMug: "/fotos/mi-mug.jpg"`).

Tip: fotos con luz natural, fondo limpio y el producto en la mano o en uso se ven mucho más reales.

## 2. Correrla en tu computador

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin Supabase ya funciona: el formulario manda todo directo a WhatsApp y la galería muestra ejemplos.

## 3. Supabase (gratis)

1. Crea cuenta en https://supabase.com → **New project** (región: `South America (São Paulo)`).
2. Ve a **SQL Editor → New query**, pega todo `supabase/schema.sql` y dale **Run**.
3. **Authentication → Users → Add user → Create new user**: el correo y contraseña de tu novia (marca *Auto Confirm User*). Con eso entra a `/admin`.
4. **Authentication → Sign In / Providers → Email**: desactiva **Allow new users to sign up** para que nadie más pueda crear cuenta.
5. **Project Settings → API**: copia `Project URL` y la llave `anon public`.
6. Crea el archivo `.env.local` (copia de `.env.example`) y pega esos dos valores.

## 4. Publicar en Vercel (gratis)

1. Sube la carpeta a un repo de GitHub.
2. En https://vercel.com → **Add New → Project** → importa el repo.
3. En **Environment Variables** agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. **Deploy**. Queda en `https://tu-proyecto.vercel.app` (puedes renombrarlo a `tintazo.vercel.app` si está libre).

---

## Sobre lo "gratis" — lo que debes saber

- **Vercel Hobby** es gratis pero sus términos dicen que es para uso *no comercial*. Para arrancar casi nadie tiene problema, pero si quieres ir 100% por la legal y gratis, **Netlify** o **Cloudflare Pages** (ambos gratis y permiten uso comercial) corren este mismo proyecto igual de fácil.
- **Supabase Free** pausa el proyecto si pasa **7 días sin actividad**. Mientras la página reciba visitas no pasa; si se pausa, se reactiva con un clic desde el panel de Supabase.
- **Dominio propio** (`tintazo.co`) sí cuesta (~$40–80 mil COP/año). Es opcional: el `.vercel.app` funciona perfecto.

## Estructura

```
app/
  page.tsx          ← la página principal (arma todas las secciones)
  admin/page.tsx    ← panel privado
components/         ← cada sección de la página
lib/config.ts       ← ✏️ datos del negocio
supabase/schema.sql ← tablas + seguridad
```
