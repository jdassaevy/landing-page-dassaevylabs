"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { hasLoadedImage } from "@/lib/media";
import { Skeleton } from "./skeleton";

export function MediaFrame({ src, alt, width, height, priority = false, className = "" }: { src: string; alt: string; width: number; height: number; priority?: boolean; className?: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const reduce = useReducedMotion();
  const captureImage = useCallback((node: HTMLImageElement | null) => {
    if (hasLoadedImage(node)) setStatus("ready");
  }, []);

  return (
    <div className={`media-frame ${className}`} style={{ aspectRatio: `${width}/${height}` }} aria-busy={status === "loading"}>
      <AnimatePresence initial={false}>
        {status === "loading" && <motion.div key="s" className="media-layer" exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: .32 }}><Skeleton className="h-full w-full" /></motion.div>}
        {status === "error" && <motion.div key="e" className="media-layer media-error" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}>Mídia indisponível</motion.div>}
      </AnimatePresence>
      <Image
        ref={captureImage}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 75vw"
        onLoad={(event) => {
          if (hasLoadedImage(event.currentTarget)) setStatus("ready");
        }}
        onError={() => setStatus("error")}
        className={status === "ready" ? "media-image ready" : "media-image"}
      />
    </div>
  );
}
