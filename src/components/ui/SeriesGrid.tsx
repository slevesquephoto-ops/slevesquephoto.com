import Image from "next/image"
import Link from "next/link"
import { buildCloudinaryUrl, buildBlurUrl } from "@/lib/cloudinary"
import type { Serie } from "@/lib/photos"

interface SeriesGridProps {
  series: Serie[]
}

export function SeriesGrid({ series }: SeriesGridProps) {
  return (
    <section className="py-20 md:py-28 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {series.map((serie) => (
          <SeriesCard key={serie.slug} serie={serie} />
        ))}
      </div>
    </section>
  )
}

interface SeriesCardProps {
  serie: Serie
}

function SeriesCard({ serie }: SeriesCardProps) {
  const imageUrl = buildCloudinaryUrl(serie.coverImage, {
    width: 900,
    height: 675,
    crop: "fill",
    quality: "auto:good",
  })
  const blurUrl = buildBlurUrl(serie.coverImage)

  return (
    <Link
      href={`/portfolio/${serie.slug}`}
      className="group block"
      aria-label={`Voir la série ${serie.title}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Aperçu de la série ${serie.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={blurUrl}
        />
      </div>

      {/* Texte */}
      <div className="mt-4">
        <h2 className="font-serif text-2xl font-light text-ink group-hover:text-accent transition-colors duration-200">
          {serie.title}
        </h2>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-2">
          {serie.description}
        </p>
        <span className="mt-3 inline-block text-xs uppercase tracking-widest text-ink-faint group-hover:text-accent transition-colors duration-200">
          Voir la série →
        </span>
      </div>
    </Link>
  )
}
