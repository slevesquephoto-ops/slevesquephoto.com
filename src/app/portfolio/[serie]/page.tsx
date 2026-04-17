import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllSeries, getSerieBySlug, getPhotosBySerie } from "@/lib/photos"
import { buildCloudinaryUrl } from "@/lib/cloudinary-url"
import { MasonryGrid } from "@/components/gallery/MasonryGrid"

interface SeriePageProps {
  params: Promise<{ serie: string }>
}

export async function generateMetadata(
  { params }: SeriePageProps
): Promise<Metadata> {
  const { serie: slug } = await params
  const serie = getSerieBySlug(slug)
  if (!serie) return {}

  const ogImageUrl = buildCloudinaryUrl(serie.coverImage, {
    width: 1200,
    height: 630,
    quality: "auto:good",
    crop: "fill",
  })

  return {
    title: serie.title,
    description: `${serie.description} — Photographie nature Québec par S. Lévesque.`,
    openGraph: {
      title: `${serie.title} — S. Lévesque Photographie`,
      description: serie.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "website",
      locale: "fr_CA",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: `https://slevesquephoto.com/portfolio/${slug}`,
    },
  }
}

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ serie: s.slug }))
}

export default async function SeriePage({ params }: SeriePageProps) {
  const { serie: slug } = await params
  const serie = getSerieBySlug(slug)

  if (!serie) notFound()

  const photos = await getPhotosBySerie(slug)

  return (
    <main className="pt-32 md:pt-40 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">

        {/* En-tête */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-ink-faint mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-ink">
            {serie.title}
          </h1>
          <p className="mt-4 text-base text-ink-muted max-w-xl leading-relaxed">
            {serie.description}
          </p>
          {photos.length > 0 && (
            <p className="mt-2 text-xs text-ink-faint">
              {photos.length} photo{photos.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Galerie */}
        <MasonryGrid photos={photos} subFolders={serie.subFolders} />

        {photos.length === 0 && (
          <p className="text-sm text-ink-faint py-16 text-center">
            Cette série sera bientôt disponible.
          </p>
        )}

      </div>
    </main>
  )
}
