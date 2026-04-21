import Link from "next/link"

export function PrintsTeaser() {
  return (
    <section className="bg-surface border-t border-border">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">
            Tirages d&apos;art
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-ink leading-snug">
            Chaque image mérite une vie sur vos murs.
          </h2>
          <p className="mt-6 text-base text-ink-muted leading-relaxed">
            Tirages signés et numérotés, produits sur commande sur des papiers
            sélectionnés pour leur rendu et leur longévité. Formats de 8×10 à
            20×30 pouces, sur Acrylique, Papier Fine Art ou Alupanel.
          </p>
          <Link
            href="/tirages"
            className="mt-8 inline-block border border-ink text-ink text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
          >
            Voir les tirages
          </Link>
        </div>
      </div>
    </section>
  )
}
