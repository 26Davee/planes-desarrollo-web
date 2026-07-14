import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Planes de desarrollo web para negocios | DE / Web",
    description: "Conoce planes de páginas web, catálogos y tiendas virtuales con dominio, hosting y soporte. Encuentra la opción adecuada para tu negocio.",
    keywords: ["desarrollo web", "páginas web para negocios", "tienda virtual", "catálogo web", "diseño web Ecuador"],
    authors: [{ name: "David Espinoza" }],
    creator: "DE / Web",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: "es_EC",
      title: "Planes de desarrollo web para negocios | DE / Web",
      description: "Desde una presencia profesional hasta una tienda virtual completa. Planes preparados para comenzar y crecer.",
      siteName: "DE / Web",
      images: [{ url: socialImage, width: 1733, height: 907, alt: "Páginas web para cada etapa de tu negocio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Planes de desarrollo web para negocios | DE / Web",
      description: "Planes de páginas web, catálogos y tiendas virtuales para cada etapa de tu negocio.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
