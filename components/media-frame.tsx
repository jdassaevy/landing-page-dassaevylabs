"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { hasLoadedImage, mediaImageIsVisible, type MediaStatus } from "@/lib/media";

export function MediaFrame({ src, alt, width, height, priority = false, className = "" }: { src: string; alt: string; width: number; height: number; priority?: boolean; className?: string }) {
  const [status, setStatus] = useState<MediaStatus>("loading");
  const captureImage = useCallback((node: HTMLImageElement | null) => {
    if (hasLoadedImage(node)) setStatus("ready");
  }, []);

  return (
    <div
      className={`media-frame ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
      aria-busy={status === "loading"}
      data-media-status={status}
    >
      <Image
        ref={captureImage}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 80vw, 75vw"
        onLoad={(event) => {
          if (hasLoadedImage(event.currentTarget)) setStatus("ready");
        }}
        onError={() => setStatus("error")}
        className={`media-image ${mediaImageIsVisible(status) ? "visible" : "hidden"}`}
      />
      {status === "error" && (
        <div className="media-layer media-error" role="img" aria-label={`${alt} indisponível`}>
          Imagem indisponível
        </div>
      )}
    </div>
  );
}
