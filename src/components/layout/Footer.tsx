import Link from "next/link"

const FOOTER_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tirages", label: "Tirages" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

          {/* Identité */}
          <div className="flex-shrink-0">
            <p className="font-serif text-xl font-light text-ink">
              S. Lévesque
            </p>
            <p className="text-sm text-ink-muted mt-1">
              Photographie nature et faune sauvage
            </p>
            <p className="text-xs text-ink-faint mt-1">Québec, Canada</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + copyright */}
          <div className="flex flex-col gap-3">
            <a
              href="https://instagram.com/slevesquephoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200 self-start"
              aria-label="Instagram — S. Lévesque Photo"
            >
              Instagram
            </a>
            <p className="text-xs text-ink-faint">
              © {new Date().getFullYear()} S. Lévesque
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
