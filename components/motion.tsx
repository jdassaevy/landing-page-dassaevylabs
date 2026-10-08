"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PropsWithChildren } from "react";

type RevealDirection = "up" | "left" | "right";

function revealOffset(direction: RevealDirection, distance: number) {
  if (direction === "left") return { opacity: 0, x: -distance, y: 0 };
  if (direction === "right") return { opacity: 0, x: distance, y: 0 };
  return { opacity: 0, x: 0, y: distance };
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.18 });

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={reduce ? undefined : { scaleX: progress }}
    />
  );
}

export function HeroSequence({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: 0.12, staggerChildren: 0.095 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroStep({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`hero-step ${className}`.trim()}
      variants={reduce ? undefined : {
        hidden: { opacity: 0, y: 20, filter: "blur(7px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({ children, className = "", distance = 24 }: PropsWithChildren<{ className?: string; distance?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

export function ProcessTimeline({ children }: PropsWithChildren) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 38%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });

  return (
    <ol ref={ref} className="process">
      <motion.span
        className="process-progress"
        aria-hidden="true"
        style={reduce ? { scaleY: 1 } : { scaleY: progress }}
      />
      {children}
    </ol>
  );
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
