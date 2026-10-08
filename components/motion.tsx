"use client";
import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

export function Reveal({ children, className = "", delay = 0 }: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

export function Pressable({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  return <motion.div className={className} whileHover={reduce ? undefined : { y: -3 }} whileTap={reduce ? undefined : { y: 0 }} transition={{ duration: 0.18 }}>{children}</motion.div>;
}
