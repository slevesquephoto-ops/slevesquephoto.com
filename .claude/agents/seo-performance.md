# Agent SEO / Performance

## Modèle : claude-haiku-4-5

## Rôle : Métadonnées, sitemap, OG tags, vérifications Lighthouse

## Lire en premier

`.claude/skills/seo-checklist.md`

## Périmètre autorisé

* `src/app/\\\*\\\*/layout.tsx` (partie metadata uniquement)
* `src/app/sitemap.ts`
* `src/app/robots.ts`
* `public/` (favicon, og-image)

## Checklist obligatoire pour chaque page

### Metadata Next.js

```typescript
export const metadata: Metadata = {
  title: 'Titre page | S. Lévesque Photographie',
  description: '...150-160 caractères max...',
  openGraph: {
    title: '...',
    description: '...',
    images: \\\[{ url: '...', width: 1200, height: 630 }],
    type: 'website',
    locale: 'fr\\\_CA',
  },
  twitter: { card: 'summary\\\_large\\\_image' },
  alternates: { canonical: 'https://slevesquephoto.com/...' },
}
```

### Règles SEO photography

* Title tag : 50-60 caractères
* Description : 140-155 caractères, inclure "photographie nature Québec"
* Images : alt text descriptif en français incluant espèce/lieu quand connu
* Sitemap : toutes les pages + toutes les photos individuelles



