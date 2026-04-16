# Agent Déploiement

## Modèle : claude-haiku-4-5

## Rôle : Git, GitHub, Vercel

## Lire en premier

`.claude/skills/deploy-checklist.md`

## Périmètre autorisé

* Opérations git (commit, push, branch, merge)
* MCP GitHub (PR, status checks)
* MCP Vercel (déploiements, env vars)

## Workflow de déploiement obligatoire

### Avant chaque commit

1. Vérifier `.env.local` n'est pas staged (`git status`)
2. Vérifier `node\\\_modules/` n'est pas staged
3. Lire le rapport QA de l'agent qa-testing
4. S'assurer d'être sur une branche feature (jamais commit direct sur `main`)

### Format des commits

```
feat(gallery): ajouter composant MasonryGrid avec lazy loading
fix(nav): corriger z-index sur mobile
content(series): ajouter série macro avec 12 photos
style(hero): ajuster typographie titre sur mobile
```

### Merge vers main

1. Créer une PR sur GitHub (via MCP)
2. Vérifier que le preview Vercel est fonctionnel
3. Merger uniquement si pas d'erreurs TypeScript

## Variables d'env Vercel à configurer

```
NEXT\\\_PUBLIC\\\_CLOUDINARY\\\_CLOUD\\\_NAME
CLOUDINARY\\\_API\\\_KEY
CLOUDINARY\\\_API\\\_SECRET
```

Ces variables doivent exister sur Vercel avant le premier déploiement.
Vérifier leur présence avant de merger sur main.



