/**
 * Opérations Cloudinary SDK — server-side uniquement.
 * Ne jamais importer ce fichier dans un composant "use client".
 */
import { v2 as cloudinary } from "cloudinary"
import { buildCloudinaryUrl, buildBlurUrl } from "./cloudinary-url"
import type { CloudinaryPhoto } from "./cloudinary-url"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export type { CloudinaryPhoto }
export { buildCloudinaryUrl, buildBlurUrl }

// ─── Fetch des assets (Server Side uniquement) ────────────────────────────────

export async function getPhotosByFolder(
  folder: string,
  subFolderLabel?: string
): Promise<CloudinaryPhoto[]> {
  const result = await cloudinary.api.resources_by_asset_folder(folder, {
    max_results: 500,
    context: true,
  })

  return result.resources.map(
    (r: {
      public_id: string
      width: number
      height: number
      asset_folder?: string
      context?: { custom?: { alt?: string } }
    }) => {
      // subFolder : soit passé explicitement, soit déduit depuis asset_folder
      const assetFolder = r.asset_folder ?? folder
      const resolvedSubFolder =
        subFolderLabel ?? (assetFolder !== folder
          ? assetFolder.split("/").pop()
          : undefined)

      return {
        publicId: r.public_id,
        url: buildCloudinaryUrl(r.public_id, { width: 800 }),
        blurUrl: buildBlurUrl(r.public_id),
        width: r.width,
        height: r.height,
        alt: r.context?.custom?.alt ?? "",
        series: folder.split("/").pop() ?? "",
        slug: r.public_id,
        subFolder: resolvedSubFolder,
      }
    }
  )
}
