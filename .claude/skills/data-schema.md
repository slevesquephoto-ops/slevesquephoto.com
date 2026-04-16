# Skill : Data Schema — src/content/

## series.json — structure complète
```json
[
  {
    "slug": "faune",
    "title": "Faune sauvage",
    "titleEn": "Wildlife",
    "description": "La faune du Québec capturée dans son habitat naturel.",
    "cloudinaryFolder": "slevesque/faune",
    "coverImage": "slevesque/faune/nom-de-la-photo-cover",
    "order": 1,
    "featured": true,
    "photoCount": 0
  }
]
```
**Champs obligatoires** : slug, title, cloudinaryFolder, coverImage, order
**Slugs valides** : kebab-case, sans accents, ex: faune, paysages, macro

## tirages.json — structure complète
```json
{
  "intro": "Tous les tirages sont produits sur commande, signés et numérotés.",
  "formats": [
    { "size": "8x10", "cm": "20x25", "priceCAD": 75 },
    { "size": "11x14", "cm": "28x36", "priceCAD": 120 },
    { "size": "16x20", "cm": "41x51", "priceCAD": 185 },
    { "size": "20x30", "cm": "51x76", "priceCAD": 265 }
  ],
  "papers": [
    { "id": "lustre", "name": "Lustre", "description": "Finition semi-brillante, couleurs vives" },
    { "id": "fine-art", "name": "Fine Art Mat", "description": "Papier coton 310g, rendu galerie" },
    { "id": "metal", "name": "Métal", "description": "Impression directe sur aluminium, effet flottant" }
  ],
  "note": "Délai de production : 5-7 jours ouvrables. Livraison Canada seulement.",
  "contactEmail": "info@slevesquephoto.com"
}
```

## about.md — frontmatter requis
```markdown
---
title: "À propos"
subtitle: "Photographe nature et faune sauvage"
location: "Québec, Canada"
since: 2015
portrait: "slevesque/portrait/nom-de-la-photo"
---

[Corps en Markdown libre ici]
```
