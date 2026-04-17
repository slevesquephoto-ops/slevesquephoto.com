"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { buildCloudinaryUrl } from "@/lib/cloudinary-url"

const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tirages", label: "Tirages" },
  { href: "/contact", label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const isHeroPage = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const isTransparent = isHeroPage && !scrolled && !menuOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-colors duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-bg/90 backdrop-blur-sm border-b border-border"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full px-5 md:px-10 lg:px-20 flex items-center justify-between">
          <Link href="/" aria-label="S. Lévesque Photographie — Accueil">
            <div className="relative h-16 w-64">
              {/* Logo noir — pages standard et après défilement */}
              <Image
                src={buildCloudinaryUrl("Logo_noir", { width: 288, quality: "auto:best" })}
                alt="S. Lévesque Photographie"
                fill
                sizes="144px"
                className={`object-contain object-left transition-opacity duration-300 ${
                  isTransparent ? "opacity-0" : "opacity-100"
                }`}
                priority
              />
              {/* Logo blanc — hero avant défilement */}
              <Image
                src={buildCloudinaryUrl("Logo_blanc", { width: 288, quality: "auto:best" })}
                alt=""
                aria-hidden="true"
                fill
                sizes="144px"
                className={`object-contain object-left transition-opacity duration-300 ${
                  isTransparent ? "opacity-100" : "opacity-0"
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:block" aria-label="Navigation principale">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/")
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`text-xs uppercase tracking-widest transition-colors duration-200 ${
                        isActive
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-ink"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-current transition-transform duration-300 origin-center ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg border-b border-border py-8 md:hidden"
          >
            <nav aria-label="Navigation mobile">
              <ul className="flex flex-col gap-6 px-5">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive =
                    pathname === href || pathname.startsWith(href + "/")
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`text-sm uppercase tracking-widest transition-colors duration-200 ${
                          isActive ? "text-ink" : "text-ink-muted"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
