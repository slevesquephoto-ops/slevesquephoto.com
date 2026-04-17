"use client"

import { useEffect, useRef, useState, useCallback } from "react"
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

  // Clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, goPrev, goNext])

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
        onClick={onClose}
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
        >
          <Image
            src={imageUrl}
            alt={alt}
            width={photo.width}
            height={photo.height}
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Bouton fermer */}
      <button
        onClick={onClose}
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

      {/* Caption + compteur */}
      <div className="absolute bottom-5 left-0 right-0 z-20 text-center px-16">
        {photo.alt && (
          <p className="text-white/70 text-xs font-sans italic mb-1">{photo.alt}</p>
        )}
        <p className="text-white/40 text-xs font-sans">
          {current + 1} / {photos.length}
        </p>
      </div>
    </motion.div>
  )
}
