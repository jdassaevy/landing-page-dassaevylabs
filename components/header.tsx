"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { homeSectionLinks } from "@/lib/navigation";
import { whatsappUrl } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="header">
      <div className="shell nav">
        <Link className="brand" href="/">
          <Image src="/brand/logo.png" alt="" width={32} height={32} className="brand-logo" />
          <span>Dassaevy Labs</span>
        </Link>
        <nav className="desktop-nav">
          {homeSectionLinks.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
          <a
            className="button small"
            href={whatsappUrl("Olá, Julio! Vim pelo site da Dassaevy Labs e gostaria de conversar sobre um projeto.")}
            target="_blank"
          >
            Vamos conversar ↗
          </a>
        </nav>
        <button
          className="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-panel"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -5 }}
          >
            {homeSectionLinks.map(([label, href]) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
