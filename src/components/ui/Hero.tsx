"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
  imageBlurUrl?: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageBlurUrl,
  ctaLabel,
  ctaHref,
}: HeroProps) {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-end"
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
    >
      {/* Image plein écran */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover select-none pointer-events-none"
        priority
        onDragStart={(e) => e.preventDefault()}
        style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
        {...(imageBlurUrl && {
          placeholder: "blur",
          blurDataURL: imageBlurUrl,
        })}
      />

      {/* Gradient bas → haut */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 pb-16 md:pb-24">
        <h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.05]"
          style={{
            fontOpticalSizing: "auto",
            fontVariantLigatures: "none",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-sm uppercase tracking-widest text-white/70 font-sans">
            {subtitle}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="group mt-8 inline-flex items-center gap-3 border border-white text-white text-xs uppercase transition-colors duration-300 hover:bg-white hover:text-ink"
            style={{ padding: "14px 40px", letterSpacing: "0.15em", fontSize: "0.75rem" }}
          >
            {ctaLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </section>
  )
}
