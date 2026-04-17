# Skill : QA Checklist — slevesquephoto.com

## Comment utiliser ce skill

L'agent qa-testing lit cette liste et vérifie chaque point.
Il produit un rapport avec ✅ ⚠️ ❌ pour chaque catégorie.
Il ne modifie rien — il signale seulement à l'orchestrateur.

## 1\. TypeScript

* \[ ] Aucun `any` explicite ou implicite
* \[ ] Aucun `// @ts-ignore` ou `// @ts-expect-error`
* \[ ] Toutes les props de composants ont une interface nommée
* \[ ] Les fonctions async ont un type de retour explicite
* \[ ] Pas d'imports de types sans le mot-clé `type` : `import type { X }`

## 2\. Composants React

* \[ ] Tous les composants sont des functional components
* \[ ] `"use client"` présent uniquement si hooks ou events nécessaires
* \[ ] Pas de `useEffect` inutile (données fetchées côté serveur quand possible)
* \[ ] Pas de props drilling excessif (plus de 3 niveaux = problème)

## 3\. Images

* \[ ] Aucune balise `<img>` nue — tout passe par `next/image`
* \[ ] Chaque `Image` a un `alt` non vide
* \[ ] Chaque `Image` a `width`+`height` ou `fill`+`sizes`
* \[ ] Les images de galerie ont `placeholder="blur"` et `blurDataURL`
* \[ ] Aucune URL Cloudinary hardcodée — toutes via `buildCloudinaryUrl()`

## 4\. Contenu et données

* \[ ] Aucun texte du site hardcodé dans un composant
* \[ ] Tous les textes viennent de `src/content/`
* \[ ] Les slugs dans `series.json` sont en kebab-case sans accents
* \[ ] Les `cloudinaryFolder` dans `series.json` correspondent à des dossiers réels
* \[ ] Le JSON est valide (pas de virgule finale, guillemets doubles)

## 5\. Accessibilité minimale

* \[ ] Chaque `<button>` a un texte visible ou `aria-label`
* \[ ] Les liens `<Link>` ont un texte descriptif (pas juste "cliquez ici")
* \[ ] Les titres respectent la hiérarchie (h1 → h2 → h3, pas de saut)
* \[ ] Le focus est visible sur les éléments interactifs

## 6\. Performance

* \[ ] Pas d'imports de librairies entières inutiles
* \[ ] Les images hero ont `priority={true}` sur `next/image`
* \[ ] Pas de `useEffect` qui fetch des données (utiliser Server Components)

## 7\. Sécurité

* \[ ] Aucune clé API dans le code source
* \[ ] Aucune variable `CLOUDINARY\\\_API\\\_KEY` ou `CLOUDINARY\\\_API\\\_SECRET` préfixée `NEXT\\\_PUBLIC\\\_`
* \[ ] `.env.local` absent de `git status`

## Format du rapport de sortie

```
QA REPORT — \\\[date] — \\\[scope vérifié]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TypeScript       : aucun problème
✅ Composants       : aucun problème
⚠️  Images          : 1 image sans blurDataURL (PhotoCard.tsx ligne 34)
❌ Sécurité         : NEXT\\\_PUBLIC\\\_ sur CLOUDINARY\\\_API\\\_KEY dans .env.local

Actions requises :
1. \\\[URGENT] Retirer NEXT\\\_PUBLIC\\\_ de CLOUDINARY\\\_API\\\_KEY dans .env.local
2. Ajouter blurDataURL sur Image dans PhotoCard.tsx ligne 34
```



