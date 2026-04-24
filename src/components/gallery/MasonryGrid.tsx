"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { PhotoCard } from "./PhotoCard"
import { Lightbox } from "./Lightbox"
import type { CloudinaryPhoto } from "@/lib/cloudinary-url"
import type { SubFolder } from "@/lib/photos"

interface MasonryGridProps {
  photos: CloudinaryPhoto[]
  subFolders?: SubFolder[]
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function MasonryGrid({ photos, subFolders = [] }: MasonryGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  // Ouvrir le lightbox sur la photo indiquée par ?photo= dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const photoSlug = params.get("photo")
    if (!photoSlug) return
    const index = photos.findIndex((p) => p.slug === photoSlug)
    if (index !== -1) setLightboxIndex(index)
  }, [photos])

  // Filtre les photos selon le sous-dossier actif
  const filteredPhotos = useMemo(() => {
    if (!activeFilter) return photos
    // Extrait le dernier segment du folder pour comparaison
    const folderName = activeFilter.split("/").pop() ?? activeFilter
    return photos.filter((p) => p.subFolder === folderName)
  }, [photos, activeFilter])

  const hasFilters = subFolders.length > 0

  return (
    <>
      {/* Boutons filtres */}
      {hasFilters && (
        <div className="flex flex-wrap gap-3 mb-10">
          <FilterButton
            label="Tout"
            active={activeFilter === null}
            onClick={() => setActiveFilter(null)}
          />
          {subFolders.map((sf) => (
            <FilterButton
              key={sf.slug}
              label={sf.label}
              active={activeFilter === sf.folder}
              onClick={() => setActiveFilter(sf.folder)}
            />
          ))}
        </div>
      )}

      {/* Grille masonry via CSS columns */}
      <motion.div
        key={activeFilter ?? "all"}
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="columns-1 sm:columns-2 lg:columns-3 gap-4"
        onContextMenu={(e) => e.preventDefault()}
      >
        {filteredPhotos.map((photo, i) => (
          <motion.div
            key={photo.publicId}
            variants={reduceMotion ? undefined : itemVariants}
            className="break-inside-avoid mb-4"
          >
            <PhotoCard
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Message si aucun résultat */}
      {filteredPhotos.length === 0 && (
        <p className="text-sm text-ink-faint py-16 text-center">
          Aucune photo dans cette catégorie.
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filteredPhotos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Bouton filtre ────────────────────────────────────────────────────────────

interface FilterButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-xs uppercase tracking-widest px-5 py-2 border transition-colors duration-200 ${
        active
          ? "border-ink bg-ink text-white"
          : "border-border text-ink-muted hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  )
}
