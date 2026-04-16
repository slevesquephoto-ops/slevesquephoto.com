# slevesquephoto.com — Instructions globales

## Contexte du projet
Site web portfolio et boutique pour S. Lévesque, photographe nature et faune sauvage au Québec.
Remplacement complet de l'ancien site slevesquephoto.com.
Développé avec une équipe d'agents Claude Code spécialisés.

## Stack technique
- **Framework** : Next.js 14 (App Router) + TypeScript strict
- **Style** : Tailwind CSS — utilitaires uniquement, pas de CSS custom sauf exception justifiée
- **Animations** : Framer Motion pour transitions de pages et galerie
- **Images** : Cloudinary (source) + next/image (affichage optimisé)
- **Contenu** : Fichiers JSON et Markdown dans `src/content/`
- **Déploiement** : Vercel (auto-deploy depuis branche `main`)

## Architecture des agents
Chaque agent a son propre fichier dans `.claude/agents/`.
**Toujours lire son fichier agent avant de commencer une tâche.**
L'orchestrateur est le seul point d'entrée pour les nouvelles demandes.

## Règles absolues — tous les agents

### Avant de coder
1. **Toujours utiliser `--plan` en premier** sur toute tâche de plus de 3 fichiers
2. Lire les skills pertinents dans `.claude/skills/` avant d'écrire du code
3. Ne jamais modifier un fichier hors de son périmètre sans en avertir l'orchestrateur

### Qualité du code
- TypeScript strict — pas de `any`, pas de `// @ts-ignore`
- Composants React : functional components uniquement, pas de class components
- Nommage : PascalCase pour composants, camelCase pour fonctions/variables, kebab-case pour fichiers
- Chaque composant dans son propre fichier
- Props typées avec `interface`, jamais avec `type` inline non nommé

### Gestion des images
- **Toutes** les images passent par `next/image` — jamais de balise `<img>` nue
- Toujours spécifier `width`, `height` ou `fill` + `sizes`
- Les URLs Cloudinary sont construites via `src/lib/cloudinary.ts` — jamais hardcodées

### Contenu
- Textes du site dans `src/content/` — jamais hardcodés dans les composants
- Les données de séries viennent de `src/content/series.json`
- La bio vient de `src/content/about.md`

### Sécurité
- Clés API uniquement dans `.env.local` (jamais committé)
- Utiliser les variables d'env préfixées `NEXT_PUBLIC_` uniquement pour les valeurs publiques
- `.env.local` est dans `.gitignore` — vérifier avant chaque commit

### Git
- Commits en français, format : `type(scope): description`
  - Types : `feat`, `fix`, `style`, `refactor`, `content`, `deploy`
  - Exemple : `feat(gallery): ajouter composant masonry avec lightbox`
- Ne jamais commit directement sur `main` — passer par une branche feature
- Branche `main` = production

## Variables d'environnement requises
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=     # ton cloud name public
CLOUDINARY_API_KEY=                    # clé privée — jamais NEXT_PUBLIC_
CLOUDINARY_API_SECRET=                 # secret — jamais NEXT_PUBLIC_
```

## Structure des URLs du site
```
/                     → Accueil
/portfolio            → Toutes les séries
/portfolio/[serie]    → Série spécifique (ex: /portfolio/faune)
/portfolio/[serie]/[slug] → Photo individuelle
/a-propos             → Bio du photographe
/tirages              → Formats et commandes
/contact              → Formulaire
/boutique             → Placeholder Phase 2
```

## Phases de développement
- **Phase 1 (en cours)** : Accueil, Portfolio, À propos, Tirages, Contact
- **Phase 2 (future)** : Boutique complète avec Stripe
- Ne pas développer la Phase 2 sauf instruction explicite

## Identité visuelle (à respecter par l'agent UI)
Voir `.claude/skills/design-tokens.md` pour les détails complets.
Résumé : minimalisme dramatique, beaucoup d'espace blanc, photos qui respirent,
typographie sérieuse avec serif pour les titres, navigation qui s'efface.

## MCP disponibles
Voir `.claude/mcp/config.json` pour la configuration complète.
- `filesystem` : lecture/écriture fichiers projet
- `github` : commits, branches, pull requests
- `vercel` : déploiements, variables d'environnement
- `cloudinary` : liste des assets, dossiers, URLs transformées
