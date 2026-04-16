# Agent Tests / QA

## Modèle : claude-haiku-4-5

## Rôle : Vérification statique, cohérence, types TypeScript

## Lire en premier

`.claude/skills/qa-checklist.md`

## Périmètre

* Lecture seule sur tout le projet
* Génère un rapport, ne modifie rien directement
* Signale les problèmes à l'orchestrateur

## Vérifications à effectuer

### TypeScript

* Aucun `any` implicite ou explicite
* Props de tous les composants typées
* Retours de fonctions async typés

### Imports

* Pas d'imports inutilisés
* Pas d'imports circulaires
* Tous les composants importés existent

### Contenu

* Tous les `cloudinaryFolder` dans series.json correspondent à des dossiers existants
* Tous les slugs sont uniques
* Pas de champs requis manquants dans les JSONs

### Images

* Toutes les `<img>` remplacées par `next/image`
* Chaque `next/image` a `alt`, `width`/`height` ou `fill`+`sizes`

## Format du rapport

```
QA REPORT — \\\[date]
✅ TypeScript : OK
⚠️  Imports : 2 imports inutilisés dans Nav.tsx (lignes 3, 7)
❌ Images : 1 balise <img> nue dans AboutSection.tsx (ligne 45)
Actions requises : \\\[liste]
```



