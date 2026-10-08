import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import "./media-fixes.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Dassaevy Labs — Sites, Sistemas e Automações", template: "%s | Dassaevy Labs" },
  description: "Sites, sistemas e automações sob medida para empresas que querem crescer e trabalhar de forma mais inteligente.",
  openGraph: { title: "Dassaevy Labs", description: "Tecnologia que transforma ideias em soluções reais.", url: site.url, siteName: site.name, images: [{ url: "/opengraph-image" }], locale: "pt_BR", type: "website" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
