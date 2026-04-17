import type { Metadata } from "next"
import { ContactForm } from "@/components/ui/ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez S. Levesque pour une commande de tirage, une collaboration ou toute question. Réponse sous 48 heures.",
  openGraph: {
    title: "Contact — S. Levesque Photographie",
    description: "Commande de tirage, collaboration, questions — écrivez-moi.",
    type: "website",
    locale: "fr_CA",
  },
  twitter: { card: "summary" },
  alternates: { canonical: "https://slevesquephoto.com/contact" },
}

export default function ContactPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-ink-faint mb-3">
          Contact
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-ink mb-4">
          Écrivez-moi
        </h1>
        <p className="text-base text-ink-muted max-w-md leading-relaxed mb-12">
          Pour une commande de tirage, une collaboration ou simplement
          pour parler photo — je réponds dans les 48 heures.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
