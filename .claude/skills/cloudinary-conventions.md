# Skill : Cloudinary Conventions — slevesquephoto.com

## Structure des dossiers Cloudinary
```
My Brand/
Portfolio/
├── mammiferes/
│   ├── Aquatiques/
│   ├── caribou/
│   ├── Chevreuil/
│   ├── Hermines/
│   ├── Lievre/
│   ├── loup/
│   ├── martre/
│   ├── Orignal/
│   ├── Ours/
│   ├── Raton/
│   ├── Renards/
│   └── Rongeur/
├── oiseaux/
│   ├── Chouette hibou/
│   ├── Foret/
│   ├── Marin/
│   └── oiseau de proie/
└── paysages/
```
⚠️ Noms de dossiers sensibles à la casse et aux espaces.
Toujours utiliser les noms EXACTEMENT comme ci-dessus.
Exemple correct   : "Portfolio/oiseaux/Chouette hibou"
Exemple incorrect : "portfolio/oiseaux/chouette-hibou"

## Nommage des assets
- kebab-case uniquement : `renard-roux-hiver-01`
- Pas d'espaces, pas d'accents, pas de majuscules
- Format suggéré : `sujet-description-numero`

## Client Cloudinary — src/lib/cloudinary.ts

### Configuration
```typescript
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
```

### Types
```typescript
export interface CloudinaryPhoto {
  publicId: string
  url: string
  blurUrl: string
  width: number
  height: number
  alt: string
  series: string
  slug: string
}

export interface CloudinaryTransforms {
  width?: number
  height?: number
  quality?: "auto" | "auto:good" | "auto:best" | "auto:eco"
  format?: "auto" | "webp" | "avif"
  crop?: "fill" | "fit" | "scale" | "crop"
}
```

### Fonction de génération d'URL
```typescript
export function buildCloudinaryUrl(
  publicId: string,
  transforms: CloudinaryTransforms = {}
): string {
  return cloudinary.url(publicId, {
    fetch_format: transforms.format ?? "auto",
    quality: transforms.quality ?? "auto:good",
    ...(transforms.width && { width: transforms.width }),
    ...(transforms.height && { height: transforms.height }),
    crop: transforms.crop ?? "fill",
    secure: true,
  })
}

export function buildBlurUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    width: 20,
    effect: "blur:200",
    fetch_format: "auto",
    quality: "auto:eco",
    secure: true,
  })
}
```

### Fetch des photos d'un dossier (Server Side uniquement)
```typescript
export async function getPhotosByFolder(folder: string): Promise<CloudinaryPhoto[]> {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: folder,
    max_results: 100,
    context: true,
  })

  return result.resources.map((r) => ({
    publicId: r.public_id,
    url: buildCloudinaryUrl(r.public_id),
    blurUrl: buildBlurUrl(r.public_id),
    width: r.width,
    height: r.height,
    alt: r.context?.custom?.alt ?? "",
    series: folder.split("/").pop() ?? "",
    slug: r.public_id.split("/").pop() ?? "",
  }))
}
```

## Utilisation avec next/image

### Pattern standard pour la galerie
```tsx
import Image from "next/image"
import { buildCloudinaryUrl, buildBlurUrl } from "@/lib/cloudinary"

// Dans un composant
<div className="relative aspect-[3/2]">
  <Image
    src={buildCloudinaryUrl(photo.publicId, { width: 800 })}
    alt={photo.alt || `Photo de ${photo.series}`}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 group-hover:scale-105"
    placeholder="blur"
    blurDataURL={photo.blurUrl}
  />
</div>
```

### Tailles recommandées par contexte
```
Hero plein écran    : width: 2400, quality: "auto:best"
Galerie masonry     : width: 800,  quality: "auto:good"
Lightbox            : width: 1600, quality: "auto:best"
Thumbnail / aperçu  : width: 400,  quality: "auto:good"
Blur placeholder    : width: 20,   buildBlurUrl()
Portrait À propos   : width: 600,  quality: "auto:good"
```

## Règles importantes
- `getPhotosByFolder` s'utilise UNIQUEMENT côté serveur (Server Components, API routes)
- `buildCloudinaryUrl` peut s'utiliser côté client (ne fait pas d'appel API)
- Ne jamais hardcoder une URL Cloudinary — toujours passer par `buildCloudinaryUrl`
- Toujours fournir un `alt` descriptif — si absent dans Cloudinary, générer un fallback
- Le `blurDataURL` est obligatoire sur toutes les images de galerie (UX de chargement)
