import type { Metadata } from "next"
import { getAllSeries } from "@/lib/photos"

export const metadata: Metadata = {
  title: "S. Levesque Photographie — Nature et faune sauvage du Québec",
  description:
    "Portfolio de S. Levesque, photographe nature et faune sauvage au Québec. Mammifères, oiseaux, paysages — tirages d'art signés sur commande.",
  openGraph: {
    title: "S. Levesque Photographie",
    description:
      "Photographie nature et faune sauvage au Québec. Mammifères, oiseaux, paysages.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://slevesquephoto.com" },
}
import { buildCloudinaryUrl, buildBlurUrl } from "@/lib/cloudinary"
import { Hero } from "@/components/ui/Hero"
import { SeriesGrid } from "@/components/ui/SeriesGrid"
import { PrintsTeaser } from "@/components/ui/PrintsTeaser"

export default function HomePage() {
  const series = getAllSeries()
  const heroSerie = series[0]

  const heroImageUrl = buildCloudinaryUrl(heroSerie.coverImage, {
    width: 2400,
    quality: "auto:best",
  })
  const heroBlurUrl = buildBlurUrl(heroSerie.coverImage)

  return (
    <main>
      <Hero
        title="La nature sauvage du Québec"
        subtitle="Chaque image raconte une rencontre authentique avec la faune"
        imageSrc={heroImageUrl}
        imageAlt="Photographie de nature et faune sauvage au Québec"
        imageBlurUrl={heroBlurUrl}
        ctaLabel="Voir le portfolio"
        ctaHref="/portfolio"
      />
      <SeriesGrid series={series} />
      <PrintsTeaser />
    </main>
  )
}
