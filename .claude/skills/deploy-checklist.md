# Skill : Deploy Checklist — slevesquephoto.com

## Comment utiliser ce skill

L'agent deploy lit cette liste avant chaque opération Git ou Vercel.
Si un point ❌ est détecté, stopper et alerter l'orchestrateur.

## Checklist pré-commit

### Sécurité (CRITIQUE — vérifier en premier)

* \[ ] `git status` ne montre pas `.env.local`
* \[ ] `git status` ne montre pas `.env`
* \[ ] `git status` ne montre pas `node\\\_modules/`
* \[ ] Aucune clé API visible dans les fichiers stagés

### Qualité

* \[ ] Le rapport QA de l'agent qa-testing est disponible et sans ❌
* \[ ] `npm run build` réussit localement (si tâche importante)
* \[ ] Pas de `console.log` de debug oubliés

### Git

* \[ ] On est sur une branche feature (pas directement sur `main`)
* \[ ] Le message de commit suit le format : `type(scope): description`
* \[ ] Types valides : feat, fix, style, refactor, content, deploy, docs

## Workflow complet de déploiement

### 1\. Vérification locale

```bash
git status                    # vérifier les fichiers stagés
git diff --staged             # relire les changements
```

### 2\. Commit sur branche feature

```bash
git add \\\[fichiers spécifiques]   # jamais git add . sans vérifier
git commit -m "type(scope): description en français"
```

### 3\. Push et PR

```bash
git push origin nom-de-la-branche
# Créer une Pull Request sur GitHub via MCP
```

### 4\. Vérifier le preview Vercel

* Attendre que Vercel génère l'URL de preview
* Vérifier visuellement que le rendu est correct
* Vérifier la console du navigateur (pas d'erreurs JS)

### 5\. Merger vers main

```bash
git checkout main
git merge nom-de-la-branche
git push origin main
```

### 6\. Vérifier le déploiement production

* Vérifier les logs Vercel (pas d'erreur de build)
* Ouvrir l'URL de production et vérifier

## Messages de commit — exemples

```
feat(gallery): ajouter composant MasonryGrid avec lazy loading
feat(nav): créer navigation avec effet blur au scroll
fix(images): corriger taille manquante sur PhotoCard
style(hero): ajuster typographie titre sur mobile
content(series): ajouter série faune avec métadonnées
refactor(cloudinary): extraire buildBlurUrl dans lib
deploy(vercel): ajouter variable CLOUDINARY\\\_API\\\_SECRET
docs(readme): mettre à jour instructions installation
```

## Variables d'env Vercel — état requis avant merge main

Ces 3 variables doivent exister dans Vercel → Settings → Environment Variables :

* `NEXT\\\_PUBLIC\\\_CLOUDINARY\\\_CLOUD\\\_NAME` ← Production + Preview + Development
* `CLOUDINARY\\\_API\\\_KEY` ← Production + Preview + Development
* `CLOUDINARY\\\_API\\\_SECRET` ← Production + Preview + Development



