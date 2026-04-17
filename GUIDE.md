# Guide de modifications — slevesquephoto.com

Ce fichier est pour toi uniquement. Il explique comment modifier le contenu
du site sans toucher au code.

---

## 1. Changer les textes du site

Tous les textes éditables sont dans **`src/content/`**.

### Bio (page À propos) → `src/content/about.md`

```
---
title: "À propos"
subtitle: "Photographe nature et faune sauvage"   ← sous-titre sous le titre
location: "Québec, Canada"                         ← affiché sous le nom
since: 2015                                        ← "depuis 2015"
portrait: "slevesquephoto_perso"                   ← public_id Cloudinary du portrait (voir section 4)
---

Le texte de ta bio vient ici en Markdown libre.
Un saut de ligne entre les paragraphes.
```

Tu peux modifier librement le texte sous les `---`. Les champs entre `---` sont
le frontmatter — modifie-les avec précaution (garde les guillemets).

---

### Tirages (prix, formats, papiers) → `src/content/tirages.json`

```json
{
  "intro": "Texte d'introduction affiché en haut de la page...",
  "formats": [
    { "size": "8x10", "cm": "20x25", "priceCAD": 75 },   ← changer le prix ici
    { "size": "11x14", "cm": "28x36", "priceCAD": 120 },
    { "size": "16x20", "cm": "41x51", "priceCAD": 185 },
    { "size": "20x30", "cm": "51x76", "priceCAD": 265 }
  ],
  "papers": [
    { "id": "lustre", "name": "Lustre", "description": "Description du papier..." },
    ...
  ],
  "note": "Texte de la note en bas de page (délais, livraison...)",
  "contactEmail": "info@slevesquephoto.com"
}
```

Pour changer un prix : modifie uniquement le nombre après `"priceCAD":`.
Pour ajouter un format : copie une ligne de `formats` et modifie les valeurs.

---

### Descriptions des séries → `src/content/series.json`

Chaque série a un champ `"title"` et `"description"` que tu peux modifier :

```json
{
  "slug": "mammiferes",
  "title": "Mammifères sauvages",           ← titre affiché partout
  "description": "Texte court affiché sur la carte et la page série...",
  ...
}
```

**Ne pas modifier** : `"slug"`, `"cloudinaryFolder"`, `"subFolders"` — ces champs
font fonctionner la galerie.

---

## 2. Changer la photo hero de la page d'accueil

La photo hero est définie par le `"coverImage"` de la **première série** dans
`src/content/series.json` (celle avec `"order": 1`, actuellement mammifères).

Pour changer la photo hero :
1. Trouve le **public_id** de la photo souhaitée (voir section 4 ci-dessous)
2. Dans `src/content/series.json`, modifie la première série :

```json
"coverImage": "orignal-aulne-rouge",   ← remplace par le public_id voulu
```

La même photo sert aussi d'aperçu de la série mammifères dans la grille Portfolio.
Si tu veux une photo hero différente de l'aperçu de la série, dis-le moi —
c'est faisable mais nécessite une petite modification de code.

---

## 3. Changer les photos d'aperçu dans la grille Portfolio

Chaque série a un `"coverImage"` dans `src/content/series.json` :

```json
{ "slug": "mammiferes", "coverImage": "orignal-aulne-rouge", ... },
{ "slug": "oiseaux",    "coverImage": "pyguarge-tete-blanche", ... },
{ "slug": "paysages",   "coverImage": "parc-terre-neuve", ... }
```

Pour changer l'aperçu d'une série :
1. Trouve le public_id de la photo souhaitée (voir section 4)
2. Remplace la valeur de `"coverImage"` pour la série concernée

---

## 4. Trouver le public_id d'une photo Cloudinary

Le **public_id** est l'identifiant unique d'une photo dans Cloudinary.
C'est simplement le nom du fichier **sans extension**.

**Méthode 1 — Via l'URL**
L'URL d'une photo Cloudinary ressemble à :
```
https://res.cloudinary.com/dun6tvfqg/image/upload/v.../maman-ours-alaite.jpg
                                                        ↑
                                              public_id = maman-ours-alaite
```

**Méthode 2 — Via le dashboard Cloudinary**
1. Va sur [cloudinary.com](https://cloudinary.com) → Media Library
2. Clique sur la photo
3. Dans le panneau de droite, copie le champ **"Public ID"**

---

## 5. Ajouter une nouvelle série au portfolio

1. Crée le dossier dans Cloudinary (Media Library → New Folder sous `Portfolio/`)
2. Upload tes photos dans ce dossier
3. Dans `src/content/series.json`, ajoute une entrée à la fin du tableau :

```json
{
  "slug": "macro",                          ← kebab-case, sans accents, unique
  "title": "Macro",
  "titleEn": "Macro",
  "description": "Description de la série...",
  "cloudinaryFolder": "Portfolio/macro",    ← chemin exact du dossier Cloudinary
  "coverImage": "public_id_de_la_cover",    ← public_id de la photo de couverture
  "order": 4,                               ← ordre d'affichage (1 = premier)
  "featured": true,
  "photoCount": 0,
  "subFolders": []                          ← laisser vide si pas de sous-catégories
}
```

---

## 6. Voir les modifications en local

```bash
npm run dev
# → Ouvre http://localhost:3000
# Les changements dans src/content/ sont visibles immédiatement (pas besoin de redémarrer)
```

---

## 7. Mettre en ligne les modifications

Une fois satisfait de tes changements :

```bash
git add src/content/
git commit -m "content: modifier [ce que tu as changé]"
git push origin feature/phase1
```

Vercel déploiera automatiquement depuis `main`. Pour l'instant on est sur
`feature/phase1` — le déploiement final se fait via la PR (ton développeur
ou Claude Code s'en occupe).

---

## Récapitulatif des fichiers à modifier

| Ce que tu veux changer | Fichier |
|------------------------|---------|
| Texte bio / portrait | `src/content/about.md` |
| Prix et formats tirages | `src/content/tirages.json` |
| Titre/description des séries | `src/content/series.json` |
| Photo hero accueil | `src/content/series.json` → `coverImage` de la série 1 |
| Photo aperçu d'une série | `src/content/series.json` → `coverImage` de la série |
| Ajouter une série | `src/content/series.json` (nouvelle entrée) |
