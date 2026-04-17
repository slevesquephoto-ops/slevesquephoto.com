import type { Metadata } from "next"
import { getAllSeries } from "@/lib/photos"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explorez le portfolio de S. Levesque : mammifères sauvages, oiseaux et paysages du Québec. Photographie nature et faune en milieu naturel.",
  openGraph: {
    title: "Portfolio — S. Levesque Photographie",
    description:
      "Mammifères sauvages, oiseaux et paysages du Québec en photographie nature.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://slevesquephoto.com/portfolio" },
}
import { SeriesGrid } from "@/components/ui/SeriesGrid"

export default function PortfolioPage() {
  const series = getAllSeries()

  return (
    <main className="pt-32 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mb-4">
        <p className="text-xs uppercase tracking-widest text-ink-faint mb-3">
          Portfolio
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-ink">
          Portfolio
        </h1>
        <p className="mt-4 text-base text-ink-muted max-w-xl leading-relaxed">
          Toutes mes photos sont prises en milieu naturel, sans appât ni manipulation. Ce que vous voyez, c'est ce qui s'est passé.
        </p>
      </div>
      <SeriesGrid series={series} />
    </main>
  )
}
