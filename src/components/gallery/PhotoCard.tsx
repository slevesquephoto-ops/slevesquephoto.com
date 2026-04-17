"use client"

import Image from "next/image"
import { useReducedMotion } from "framer-motion"
import type { CloudinaryPhoto } from "@/lib/cloudinary-url"

interface PhotoCardProps {
  photo: CloudinaryPhoto
  index: number
  onClick: () => void
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const alt = photo.alt || `Photo de la série ${photo.series}`
  const reduceMotion = useReducedMotion()
  const displayTitle = photo.title || photo.subFolder || null

  return (
    <button
      onClick={onClick}
      className="group relative w-full block text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`Agrandir : ${alt}`}
    >
      {/* Ratio dynamique depuis les dimensions réelles Cloudinary */}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${(photo.height / photo.width) * 100}%` }}
      >
        <Image
          src={photo.url}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          placeholder="blur"
          blurDataURL={photo.blurUrl}
        />

        {/* Overlay hover — dégradé + titre + caption optionnelle */}
        {displayTitle && (
          <div
            className={[
              "absolute inset-x-0 bottom-0 px-4 pb-4 pt-10",
              "bg-gradient-to-t from-black/65 to-transparent",
              "transition-[opacity,transform] duration-300",
              "opacity-0 group-hover:opacity-100",
              reduceMotion ? "" : "translate-y-2 group-hover:translate-y-0",
            ].join(" ")}
          >
            <p className="text-white text-sm font-medium leading-snug">
              {displayTitle}
            </p>
            {photo.caption && (
              <p className="text-white/70 text-xs mt-1 leading-snug">
                {photo.caption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Caption textuelle sous la carte — toujours visible mobile, hover desktop */}
      {photo.alt && (
        <p className="mt-2 text-xs text-ink-faint italic opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {photo.alt}
        </p>
      )}
    </button>
  )
}
