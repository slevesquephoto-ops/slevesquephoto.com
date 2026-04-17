import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Boutique",
  description: "Boutique en ligne de S. Levesque Photographie — bientôt disponible.",
  robots: { index: false, follow: false },
}

export default function BoutiquePage() {
  return (
    <main className="pt-32 md:pt-40 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-ink-faint mb-3">
          Boutique
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-ink mb-6">
          Bientôt disponible
        </h1>
        <p className="text-base text-ink-muted max-w-md leading-relaxed mb-10">
          La boutique en ligne arrive prochainement. En attendant, vous pouvez
          commander vos tirages directement par courriel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tirages"
            className="inline-block bg-accent text-white text-xs uppercase tracking-widest px-8 py-3 hover:opacity-85 transition-opacity duration-200"
          >
            Voir les tirages
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-ink text-ink text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  )
}
