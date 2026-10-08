import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./motion.css";
import "./media-fixes.css";
import "./mobile-conversion.css";
import { site } from "@/lib/site";

const description = "Sites, sistemas e automações sob medida para empresas que querem crescer e trabalhar de forma mais inteligente.";
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dassaevy Labs — Sites, Sistemas e Automações",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Dassaevy Labs — Sites, Sistemas e Automações", template: "%s | Dassaevy Labs" },
  description,
  alternates: { canonical: site.url },
  authors: [{ name: site.founder, url: site.linkedin }],
  creator: site.founder,
  publisher: site.name,
  openGraph: {
    title: "Dassaevy Labs",
    description: "Tecnologia que transforma ideias em soluções reais.",
    url: site.url,
    siteName: site.name,
    images: [socialImage],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dassaevy Labs — Sites, Sistemas e Automações",
    description,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<Analytics /></body></html>;
}
