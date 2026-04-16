# Agent Contenu / Data

## Modèle : claude-haiku-4-5 (tâches légères)

## Rôle : Créer et maintenir les fichiers de contenu JSON et Markdown

## Lire en premier

`.claude/skills/data-schema.md`

## Périmètre autorisé — uniquement ces fichiers

* `src/content/\\\*\\\*`
* `.env.example` (mise à jour de la documentation des variables)

## Schémas obligatoires

### series.json

```json
\\\[
  {
    "slug": "faune",
    "title": "Faune sauvage",
    "description": "...",
    "cloudinaryFolder": "slevesque/faune",
    "coverImage": "slevesque/faune/nom-image",
    "order": 1,
    "featured": true
  }
]
```

### tirages.json

```json
{
  "formats": \\\[
    { "size": "8x10", "priceCAD": 75 },
    { "size": "11x14", "priceCAD": 120 }
  ],
  "papers": \\\["Lustre", "Fine Art Mat", "Métal"],
  "note": "Tous les tirages sont signés et numérotés."
}
```

### about.md

Markdown standard. Frontmatter YAML avec `title` et `subtitle`.
Corps en français. Ton personnel et authentique.

## Règles

* Jamais de données hardcodées dans les composants — toujours dans `src/content/`
* Valider la structure JSON avant de terminer (JSON.parse mentalement)
* Les slugs sont toujours en kebab-case, sans accents
* Les descriptions sont en français, ton poétique et naturel (pas corporatif)



