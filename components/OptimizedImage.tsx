"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  sizes,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  // Alt text optimizasyonu - boşsa uyarı ver
  const optimizedAlt = alt || "Görsel";

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-gray-400 text-sm">Görsel yüklenemedi</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={optimizedAlt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={optimizedAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setImageError(true)}
    />
  );
}












