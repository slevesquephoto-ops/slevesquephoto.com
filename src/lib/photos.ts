import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { CloudinaryPhoto } from "./cloudinary"
import { getPhotosByFolder } from "./cloudinary"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubFolder {
  slug: string
  label: string
  folder: string
}

export interface Serie {
  slug: string
  title: string
  titleEn: string
  description: string
  cloudinaryFolder: string
  coverImage: string
  order: number
  featured: boolean
  photoCount: number
  subFolders: SubFolder[]
}

export interface AboutContent {
  title: string
  subtitle: string
  location: string
  since: number
  portrait: string
  body: string
}

// ─── Helpers fichiers ─────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "src/content")

function readSeriesFile(): Serie[] {
  const filePath = path.join(contentDir, "series.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as Serie[]
}

// ─── Séries ───────────────────────────────────────────────────────────────────

export function getAllSeries(): Serie[] {
  return readSeriesFile().sort((a, b) => a.order - b.order)
}

export function getFeaturedSeries(): Serie[] {
  return getAllSeries().filter((s) => s.featured)
}

export function getSerieBySlug(slug: string): Serie | undefined {
  return getAllSeries().find((s) => s.slug === slug)
}

// ─── Photos ───────────────────────────────────────────────────────────────────

export async function getPhotosBySerie(
  slug: string
): Promise<CloudinaryPhoto[]> {
  const serie = getSerieBySlug(slug)
  if (!serie) return []
  return getPhotosByFolder(serie.cloudinaryFolder)
}

export async function getPhotosBySubFolder(
  subFolder: SubFolder
): Promise<CloudinaryPhoto[]> {
  return getPhotosByFolder(subFolder.folder)
}

// ─── Contenu À propos ─────────────────────────────────────────────────────────

export function getAboutContent(): AboutContent {
  const filePath = path.join(contentDir, "about.md")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    title: data.title as string,
    subtitle: data.subtitle as string,
    location: data.location as string,
    since: data.since as number,
    portrait: data.portrait as string,
    body: content.trim(),
  }
}

// ─── Tirages ──────────────────────────────────────────────────────────────────

export interface TiragePaper {
  id: string
  name: string
  description: string
}

export interface TirageFormat {
  size: string
  cm: string
  priceCAD: number
}

export interface TiragesContent {
  intro: string
  formats: TirageFormat[]
  papers: TiragePaper[]
  note: string
  contactEmail: string
}

export function getTiragesContent(): TiragesContent {
  const filePath = path.join(contentDir, "tirages.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as TiragesContent
}
