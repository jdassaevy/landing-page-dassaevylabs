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
        <Link className="brand" href="/" aria-label="Dassaevy Labs - início">
          <Image src="/brand/logo-blue.png" alt="" width={38} height={38} className="brand-logo" priority />
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
            initial={reduce ? false : { opacity: 0, y: -8, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -5, scale: .99 }}
            transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }}
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
