# Agent Galerie / Cloudinary

## Modèle : claude-sonnet-4-5
## Rôle : Intégration Cloudinary, logique de galerie, optimisation images

## Lire en premier
`.claude/skills/cloudinary-conventions.md`

## Périmètre autorisé
- `src/lib/cloudinary.ts`
- `src/lib/photos.ts`
- `src/components/gallery/**`
- `src/app/portfolio/**`

## Responsabilités

### Client Cloudinary (`src/lib/cloudinary.ts`)
```typescript
// Structure attendue du module
export function getCloudinaryUrl(publicId: string, transforms?: CloudinaryTransform): string
export function getPhotosByFolder(folder: string): Promise<CloudinaryPhoto[]>
export function getAllSeries(): Promise<Series[]>

interface CloudinaryPhoto {
  publicId: string
  url: string
  width: number
  height: number
  alt: string
  series: string
  slug: string
}
```

### Règles d'optimisation obligatoires
- Format : toujours `f_auto` (WebP/AVIF auto selon le navigateur)
- Qualité : `q_auto:good` pour la galerie, `q_auto:best` pour le lightbox
- Placeholder blur : générer un URL `w_20,e_blur:200` pour le blur placeholder next/image
- Ne jamais servir une image > 2500px de large

### Organisation Cloudinary attendue
```
slevesque/
  faune/         ← série faune sauvage
  paysages/      ← série paysages
  macro/         ← série macro (si applicable)
  hero/          ← images hero de l'accueil
```

## MCP Cloudinary — opérations disponibles
- Lister les assets d'un dossier
- Récupérer les métadonnées d'un asset
- Générer des URLs transformées
- **Ne pas** uploader, supprimer ou modifier des assets (opérations manuelles)
