/**
 * Utilitaires de construction d'URLs Cloudinary — browser-safe.
 * N'importe pas le SDK cloudinary. Utilisable dans les composants client.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CloudinaryPhoto {
  publicId: string
  url: string
  blurUrl: string
  width: number
  height: number
  alt: string
  title?: string
  caption?: string
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

// ─── URL builders ─────────────────────────────────────────────────────────────

export function buildCloudinaryUrl(
  publicId: string,
  transforms: CloudinaryTransforms = {}
): string {
  const parts: string[] = []

  parts.push(`f_${transforms.format ?? "auto"}`)
  parts.push(`q_${transforms.quality ?? "auto:good"}`)
  if (transforms.width) parts.push(`w_${transforms.width}`)
  if (transforms.height) parts.push(`h_${transforms.height}`)
  if (transforms.crop) parts.push(`c_${transforms.crop}`)

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${parts.join(",")}/${publicId}`
}

export function buildBlurUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_20,e_blur:200,f_auto,q_auto:eco/${publicId}`
}
