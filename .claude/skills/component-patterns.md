# Skill : Component Patterns — slevesquephoto.com

## Principes généraux
- Functional components uniquement, jamais de class components
- Un composant = un fichier
- Les composants sont dans `src/components/`
- Les pages sont dans `src/app/`
- Les composants ne fetchent jamais de données — ils reçoivent tout via props
- Les Server Components fetchent, les Client Components affichent

## Quand utiliser "use client"
Ajouter `"use client"` UNIQUEMENT si le composant utilise :
- `useState`, `useEffect`, `useRef`, `useReducer`
- Des event handlers (onClick, onChange, onSubmit)
- Framer Motion animations
- Le lightbox (interaction utilisateur)

Tout le reste = Server Component par défaut (pas de directive nécessaire)

## Structure type d'un composant

### Server Component (pas d'interactivité)
```tsx
// src/components/ui/NomComposant.tsx

interface NomComposantProps {
  title: string
  description?: string
}

export function NomComposant({ title, description }: NomComposantProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### Client Component (avec interactivité)
```tsx
"use client"

// src/components/gallery/Lightbox.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LightboxProps {
  images: CloudinaryPhoto[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)
  // ...
}
```

## Conventions de nommage
```
PascalCase   → composants : Nav.tsx, PhotoCard.tsx, MasonryGrid.tsx
camelCase    → fonctions, variables, props
kebab-case   → fichiers non-composants : cloudinary.ts, use-photos.ts
UPPER_SNAKE  → constantes : MAX_PHOTOS_PER_PAGE
```

## Organisation des imports (dans cet ordre)
```tsx
// 1. React et Next.js
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// 2. Librairies tierces
import { motion } from "framer-motion"

// 3. Composants internes (alias @/)
import { PhotoCard } from "@/components/gallery/PhotoCard"

// 4. Types et utilitaires
import type { CloudinaryPhoto } from "@/lib/cloudinary"
import { getPhotosByFolder } from "@/lib/photos"
```

## Tailwind — règles d'usage

### Classes utilitaires uniquement
```tsx
// ✅ Correct
<div className="flex items-center gap-4 px-6 py-3">

// ❌ Jamais de style inline sauf exception justifiée
<div style={{ display: 'flex', gap: '16px' }}>
```

### Responsive mobile-first
```tsx
// ✅ Mobile d'abord, puis desktop
<div className="px-5 md:px-10 lg:px-20">
<h1 className="text-3xl md:text-5xl lg:text-7xl">
```

### Couleurs — utiliser uniquement les tokens du projet
```tsx
// ✅ Couleurs du design system
<div className="bg-bg text-ink">
<span className="text-ink-muted">
<button className="bg-accent text-white">

// ❌ Jamais de couleurs Tailwind génériques
<div className="bg-gray-100 text-gray-900">
```

## Animations Framer Motion

### Transition de page standard
```tsx
const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}
```

### Liste d'éléments avec stagger
```tsx
const containerVariants = {
  visible: { transition: { staggerChildren: 0.06 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
}
```

### Respecter prefers-reduced-motion
```tsx
import { useReducedMotion } from "framer-motion"

export function AnimatedComponent() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
```

## Composants de layout

### Nav — comportement attendu
- Fixe en haut, `z-50`
- Sur pages portfolio avec hero : fond transparent → `bg-bg/90 backdrop-blur-sm` au scroll
- Sur autres pages : `bg-bg` direct
- Hauteur : `h-16` (64px)
- Liens en uppercase, `tracking-widest`, `text-xs`

### Footer — structure minimale
- Liens de navigation principaux
- Réseaux sociaux (Instagram prioritaire pour un photographe)
- Copyright avec année dynamique : `new Date().getFullYear()`
- Fond `bg-surface`, pas `bg-bg`

## next/image — règles absolues
```tsx
// ✅ Image avec dimensions connues
<Image
  src={cloudinaryUrl}
  alt="Description précise de la photo"
  width={800}
  height={600}
  className="object-cover"
/>

// ✅ Image fill (conteneur doit avoir position: relative + dimensions)
<div className="relative aspect-[4/3]">
  <Image
    src={cloudinaryUrl}
    alt="Description précise"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>

// ❌ Jamais
<img src={url} alt="..." />
```
