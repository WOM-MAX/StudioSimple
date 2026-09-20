import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstudioSimple: Prototipo Clase 1 OA1",
  description: "Prototipo funcional sincronizado de la primera clase de Matemática de séptimo básico.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
