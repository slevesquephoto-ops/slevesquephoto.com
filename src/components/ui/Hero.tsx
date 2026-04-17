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
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Image plein écran */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
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
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-extralight text-white leading-[1.05] max-w-2xl"
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
            className="mt-8 inline-block bg-white text-ink text-xs uppercase tracking-widest px-8 py-3 hover:bg-accent hover:text-white transition-colors duration-300"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
