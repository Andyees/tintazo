import type { Metadata } from "next";
import { marca } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${marca.nombre} · Vasos y camisetas sublimadas`,
  description: marca.descripcion,
  openGraph: {
    title: `${marca.nombre} · ${marca.slogan}`,
    description: marca.descripcion,
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:opsz,wght@9..40,400..700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
