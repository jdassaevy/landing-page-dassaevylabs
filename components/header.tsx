"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { whatsappUrl } from "@/lib/site";

const links = [["Serviços", "#servicos"], ["Projetos", "#projetos"], ["Preços", "#precos"], ["Sobre", "#sobre"], ["Contato", "#contato"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return <header className="header"><div className="shell nav"><Link className="brand" href="/"><Image src="/brand/logo.png" alt="" width={32} height={32} className="brand-logo" /><span>Dassaevy Labs</span></Link><nav className="desktop-nav">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<a className="button small" href={whatsappUrl("Olá, Julio! Vim pelo site da Dassaevy Labs e gostaria de conversar sobre um projeto.")} target="_blank">Vamos conversar ↗</a></nav><button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="Abrir menu">{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.nav className="mobile-panel" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -5 }}>{links.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}</motion.nav>}</AnimatePresence></header>;
}
