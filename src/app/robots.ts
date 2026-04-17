import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/boutique"],
    },
    sitemap: "https://slevesquephoto.com/sitemap.xml",
  }
}
