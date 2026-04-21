import Link from "next/link"
import type { TiragesContent } from "@/lib/photos"

interface PrintsTableProps {
  data: TiragesContent
}

export function PrintsTable({ data }: PrintsTableProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 py-20 md:py-28">

      {/* Intro */}
      <p className="text-base text-ink-muted max-w-2xl leading-relaxed mb-16">
        {data.intro}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">

        {/* Formats */}
        <div>
          <h2 className="font-serif text-3xl font-light text-ink mb-8">
            Formats disponibles
          </h2>
          <div className="border-t border-border">
            {data.formats.map((format) => (
              <div
                key={format.size}
                className="flex items-center justify-between py-5 border-b border-border"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {format.size}&Prime;
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">{format.cm} cm</p>
                </div>
                <p className="text-sm text-ink font-medium">
                  {format.priceCAD} $
                  <span className="text-xs text-ink-faint ml-1">CAD</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Papiers */}
        <div>
          <h2 className="font-serif text-3xl font-light text-ink mb-8">
            Supports d&apos;impression
          </h2>
          <div className="flex flex-col gap-6">
            {data.papers.map((paper) => (
              <div key={paper.id} className="border-l-2 border-border pl-5">
                <p className="text-sm font-medium text-ink">{paper.name}</p>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                  {paper.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Note */}
      <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-ink-faint leading-relaxed max-w-lg">
          {data.note}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent text-white text-xs uppercase tracking-widest px-8 py-3 hover:opacity-85 transition-opacity duration-200 flex-shrink-0"
        >
          DÉMARRER UN PROJET
        </Link>
      </div>

    </div>
  )
}
