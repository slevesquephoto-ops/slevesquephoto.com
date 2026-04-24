"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { buildCloudinaryUrl } from "@/lib/cloudinary-url"
import type { CloudinaryPhoto } from "@/lib/cloudinary-url"

interface LightboxProps {
  photos: CloudinaryPhoto[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)

  const photo = photos[current]
  const hasPrev = current > 0
  const hasNext = current < photos.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) setCurrent((i) => i - 1)
  }, [hasPrev])

  const goNext = useCallback(() => {
    if (hasNext) setCurrent((i) => i + 1)
  }, [hasNext])

  // Mettre à jour l'URL avec le slug de la photo courante
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set("photo", photo.slug)
    window.history.replaceState(null, "", url.toString())
  }, [photo.slug])

  const handleClose = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete("photo")
    window.history.replaceState(null, "", url.toString())
    onClose()
  }, [onClose])

  // Clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleClose, goPrev, goNext])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Swipe mobile
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const imageUrl = buildCloudinaryUrl(photo.publicId, {
    width: 1600,
    quality: "auto:best",
  })

  const alt = photo.alt || `Photo de la série ${photo.series}`

  // ─── Partage ────────────────────────────────────────────────────────────────

  function getShareUrl(): string {
    const url = new URL(window.location.href)
    url.searchParams.set("photo", photo.slug)
    return url.toString()
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(getShareUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleShareFacebook() {
    const shareUrl = encodeURIComponent(getShareUrl())
    const left = Math.round(window.screen.width / 2 - 300)
    const top = Math.round(window.screen.height / 2 - 200)
    const popup = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      "facebook-share",
      `width=600,height=400,left=${left},top=${top}`
    )
    popup?.focus()
  }

  function handleShareWhatsApp() {
    const title = photo.title || photo.alt || "Photo"
    const text = encodeURIComponent(`${title} — ${getShareUrl()}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.95)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fermer — clic sur fond */}
      <button
        onClick={handleClose}
        className="absolute inset-0 w-full h-full"
        aria-label="Fermer la photo"
      />

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          <Image
            src={imageUrl}
            alt={alt}
            width={photo.width}
            height={photo.height}
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain select-none pointer-events-none"
            priority
            onDragStart={(e) => e.preventDefault()}
            style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bouton fermer */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-20 text-white/70 hover:text-white transition-colors duration-200 p-2"
        aria-label="Fermer"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 md:left-8 z-20 text-white/60 hover:text-white transition-colors duration-200 p-3"
          aria-label="Photo précédente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 md:right-8 z-20 text-white/60 hover:text-white transition-colors duration-200 p-3"
          aria-label="Photo suivante"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Barre de partage + Caption + compteur */}
      <div
        className="absolute bottom-5 left-0 right-0 z-20 px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Boutons de partage */}
        <div className="flex justify-end items-center gap-4 mb-1">
          {/* Copier le lien */}
          <button
            onClick={handleCopyLink}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
            aria-label="Copier le lien"
            title="Copier le lien"
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Facebook */}
          <button
            onClick={handleShareFacebook}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
            aria-label="Partager sur Facebook"
            title="Partager sur Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
            aria-label="Partager sur WhatsApp"
            title="Partager sur WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </button>
        </div>

        {/* Tip Instagram */}
        <p className="text-right text-[11px] font-sans italic text-white/40 mb-3">
          Pour partager sur Instagram, copiez le lien et partagez-le en story.
        </p>

        {/* Caption + compteur */}
        <div className="text-center">
          {photo.alt && (
            <p className="text-white/70 text-xs font-sans italic mb-1">{photo.alt}</p>
          )}
          <p className="text-white/40 text-xs font-sans">
            {current + 1} / {photos.length}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
