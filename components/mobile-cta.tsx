"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

export function MobileCta() {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contato");
    if (!contact || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className={`mobile-cta ${contactVisible ? "is-subdued" : ""}`}
      aria-label="Contato rápido pelo WhatsApp"
    >
      <a
        href={whatsappUrl("Olá, Julio! Vim pelo site da Dassaevy Labs e quero conversar sobre um projeto.")}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} />
        <span>Falar sobre meu projeto</span>
      </a>
    </aside>
  );
}
