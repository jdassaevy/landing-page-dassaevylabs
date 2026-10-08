"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

type RevealDirection = "up" | "left" | "right";

function revealOffset(direction: RevealDirection, distance: number) {
  if (direction === "left") return { opacity: 0, x: -distance, y: 0 };
  if (direction === "right") return { opacity: 0, x: distance, y: 0 };
  return { opacity: 0, x: 0, y: distance };
}

export function Reveal({ children, className = "", delay = 0, direction = "up", distance = 22 }: PropsWithChildren<{ className?: string; delay?: number; direction?: RevealDirection; distance?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : revealOffset(direction, distance)}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Pressable({ children, className = "", reveal = false, delay = 0 }: PropsWithChildren<{ className?: string; reveal?: boolean; delay?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reveal && !reduce ? { opacity: 0, y: 20 } : false}
      whileInView={reveal && !reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={reveal ? { once: true, amount: 0.18 } : undefined}
      whileHover={reduce ? undefined : { y: -6, scale: 1.008 }}
      whileTap={reduce ? undefined : { y: -1, scale: 0.998 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: reveal ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealListItem({ children, className = "", delay = 0 }: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial={reduce ? false : { opacity: 0, x: -18 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  );
}
