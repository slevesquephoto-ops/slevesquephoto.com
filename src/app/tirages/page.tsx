import type { Metadata } from "next"
import { getTiragesContent } from "@/lib/photos"

export const metadata: Metadata = {
  title: "Impressions",
  description:
    "Tirages photographiques sur commande. Formats 8×10 à 24×36 po, papiers Acrylique, Fine Art ou Alupanel. Écrivez-moi pour discuter de votre projet.",
  openGraph: {
    title: "Tirages d'art — S. Levesque Photographie",
    description:
      "Tirages sur commande, formats 8×10 à 24×36 po. Contactez-moi pour discuter de votre projet.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://slevesquephoto.com/tirages" },
}
import { PrintsTable } from "@/components/ui/PrintsTable"

export default function TiragesPage() {
  const tirages = getTiragesContent()

  return (
    <main className="pt-32 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mb-4">
        <p className="text-xs uppercase tracking-widest text-ink-faint mb-3">
          Impressions
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-ink">
          Impressions sur commande
        </h1>
      </div>
      <PrintsTable data={tirages} />
    </main>
  )
}
