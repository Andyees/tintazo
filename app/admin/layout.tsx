import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel · Tintazo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="fondo-puntos min-h-screen">{children}</div>;
}
