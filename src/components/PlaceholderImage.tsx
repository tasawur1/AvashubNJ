"use client";

import Image from "next/image";
import { useState } from "react";

type PlaceholderImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tailwind aspect ratio wrapper e.g. aspect-[4/3] */
  aspectClass?: string;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

function ImageFallback({
  alt,
  className,
  fill,
}: {
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={
        "flex items-center justify-center bg-gradient-to-br from-brand-teal-light to-brand-lavender text-brand-teal/80 " +
        (fill ? "absolute inset-0 h-full w-full " : "") +
        (className ?? "")
      }
    >
      <svg
        className="h-10 w-10 opacity-40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function PlaceholderImage(props: PlaceholderImageProps) {
  const { src, alt, className = "", sizes, priority, aspectClass } = props;
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (props.fill) {
      return <ImageFallback alt={alt} className={className} fill />;
    }
    return (
      <div className={aspectClass ?? ""}>
        <ImageFallback
          alt={alt}
          className={`${className} h-full w-full rounded-2xl`}
        />
      </div>
    );
  }

  if (props.fill) {
    return (
      <>
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      </>
    );
  }

  const { width, height } = props;

  return (
    <div className={aspectClass}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
