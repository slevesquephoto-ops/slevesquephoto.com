import type { Metadata } from "next"
import { getAboutContent } from "@/lib/photos"

export const metadata: Metadata = {
  title: "À propos",
  description:
    "S. Lévesque, photographe nature et faune sauvage au Québec depuis 2015. Découvrez son approche, sa philosophie et son territoire.",
  openGraph: {
    title: "À propos — S. Lévesque Photographie",
    description:
      "Photographe nature et faune sauvage au Québec depuis 2015.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "profile",
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://slevesquephoto.com/a-propos" },
}
import { AboutSection } from "@/components/ui/AboutSection"

export default function AProposPage() {
  const content = getAboutContent()

  return (
    <main className="pt-16">
      <AboutSection content={content} />
    </main>
  )
}
