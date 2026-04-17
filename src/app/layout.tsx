import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { PageTransition } from "@/components/layout/PageTransition"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | S. Lévesque Photographie",
    default: "S. Lévesque Photographie — Nature et faune sauvage du Québec",
  },
  description:
    "Portfolio et tirages de S. Lévesque, photographe nature et faune sauvage au Québec. Mammifères, oiseaux, paysages.",
  metadataBase: new URL("https://slevesquephoto.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col bg-bg text-ink font-sans antialiased">
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  )
}
