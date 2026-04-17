import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CloudinaryPhoto {
  publicId: string
  url: string
  blurUrl: string
  width: number
  height: number
  alt: string
  series: string
  slug: string
  subFolder?: string
}

export interface CloudinaryTransforms {
  width?: number
  height?: number
  quality?: "auto" | "auto:good" | "auto:best" | "auto:eco"
  format?: "auto" | "webp" | "avif"
  crop?: "fill" | "fit" | "scale" | "crop"
}

// ─── Construction d'URLs ──────────────────────────────────────────────────────

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

// ─── Fetch des assets (Server Side uniquement) ────────────────────────────────

export async function getPhotosByFolder(
  folder: string
): Promise<CloudinaryPhoto[]> {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: folder,
    max_results: 100,
    context: true,
  })

  return result.resources.map(
    (r: {
      public_id: string
      width: number
      height: number
      context?: { custom?: { alt?: string } }
    }) => {
      const parts = r.public_id.split("/")
      // Le sous-dossier est la partie entre le dossier parent et le fichier
      const subFolder =
        parts.length > 2 ? parts[parts.length - 2] : undefined

      return {
        publicId: r.public_id,
        url: buildCloudinaryUrl(r.public_id, { width: 800 }),
        blurUrl: buildBlurUrl(r.public_id),
        width: r.width,
        height: r.height,
        alt: r.context?.custom?.alt ?? "",
        series: folder.split("/").pop() ?? "",
        slug: parts[parts.length - 1] ?? "",
        subFolder,
      }
    }
  )
}
