# slevesquephoto.com

Site portfolio de Steeve Levesque, photographe nature et faune sauvage au Québec.

**En ligne : [www.slevesquephoto.com](https://www.slevesquephoto.com)**

## Le projet

Le site remplace complètement l'ancien slevesquephoto.com. Il présente les photos par
séries, les formats de tirages offerts, et un formulaire de contact qui envoie les messages
par courriel.

Il a été développé avec **Claude Code**, en orchestrant une équipe d'agents spécialisés
(voir plus bas). Mon rôle : définir le besoin et l'identité visuelle, découper le travail
entre les agents, réviser et tester ce qu'ils produisent, et déployer.

## Fonctionnalités

- **Portfolio par séries** (`/portfolio/[serie]`), avec images servies par Cloudinary
  et optimisées par `next/image`
- **Page Tirages** : formats et commandes
- **Formulaire de contact** : route API Next.js qui envoie le message avec Resend
- **Référencement** : `sitemap.xml` et `robots.txt` générés par l'application
- **Contenu séparé du code** : textes et séries dans `src/content/` (JSON et Markdown)
- **Boutique** : prévue (phase 2)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Framer Motion ·
Cloudinary · Resend · Vercel

## Développement avec une équipe d'agents

Chaque agent a son fichier d'instructions dans `.claude/agents/`. L'orchestrateur reçoit
les demandes et les répartit.

| Agent | Responsabilité |
| --- | --- |
| `orchestrator` | Point d'entrée, planification et répartition |
| `ui-components` | Composants et identité visuelle |
| `gallery-cloudinary` | Galerie et intégration Cloudinary |
| `content-data` | Contenu (séries, textes) |
| `seo-performance` | Référencement et performance |
| `qa-testing` | Vérification et tests |
| `deploy` | Déploiement Vercel |

Le contexte partagé (design, conventions, schéma) est dans `.claude/skills/`, et la
configuration des serveurs MCP dans `.claude/mcp/`.

## Installation locale

```bash
git clone https://github.com/slevesquephoto-ops/slevesquephoto.com.git
cd slevesquephoto.com
npm install
# Créer .env.local avec les variables ci-dessous
npm run dev
```

### Variables d'environnement (`.env.local`)

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
```

`.env.local` est dans `.gitignore` et n'est jamais commité. En production, les mêmes
variables sont configurées dans Vercel.

## Structure

```
src/
  app/          Pages (App Router) et route API de contact
  components/   Composants React
  lib/          Utilitaires (construction des URL Cloudinary, etc.)
  content/      Données du site (JSON, Markdown)
.claude/
  agents/       Instructions des agents Claude Code
  skills/       Contexte partagé
  mcp/          Configuration MCP
```

## Déploiement

Déploiement automatique par Vercel à chaque push sur `main`.
