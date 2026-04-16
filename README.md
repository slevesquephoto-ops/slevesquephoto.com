# slevesquephoto.com

Site portfolio et boutique pour S. Lévesque, photographe nature et faune sauvage.

## Stack
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Cloudinary · Vercel

---

## Installation

```bash
# 1. Cloner le repo
git clone https://github.com/[ton-username]/slevesquephoto.git
cd slevesquephoto

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# → Remplir .env.local avec tes clés Cloudinary

# 4. Lancer en développement
npm run dev
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir :

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ton_cloud_name
CLOUDINARY_API_KEY=ta_cle_api
CLOUDINARY_API_SECRET=ton_secret
```

⚠️ `.env.local` ne doit JAMAIS être commité. Il est dans `.gitignore`.

---

## Agents Claude Code

Ce projet utilise une équipe d'agents spécialisés. Voir `.claude/agents/` pour les instructions de chaque agent.

### Configuration MCP requise

```bash
# MCP GitHub
npm install -g @modelcontextprotocol/server-github
export GITHUB_TOKEN=ton_token  # https://github.com/settings/tokens

# MCP Vercel
npm install -g @modelcontextprotocol/server-vercel
export VERCEL_TOKEN=ton_token  # https://vercel.com/account/tokens

# MCP Cloudinary (custom)
npm install @modelcontextprotocol/sdk cloudinary
node .claude/mcp/cloudinary-server.js  # test de démarrage
```

### Lancer Claude Code avec les agents

```bash
# Mode plan (recommandé pour nouvelles tâches)
claude --plan

# Avec un agent spécifique
claude --agent .claude/agents/ui-components.md

# Orchestrateur (point d'entrée normal)
claude --agent .claude/agents/orchestrator.md
```

---

## Structure du projet

```
src/
  app/          → Pages Next.js (App Router)
  components/   → Composants React réutilisables
  lib/          → Utilitaires (Cloudinary, helpers)
  content/      → Données du site (JSON, Markdown)
.claude/
  agents/       → Instructions des agents Claude Code
  skills/       → Contexte partagé (design, schema, conventions)
  mcp/          → Configuration et serveurs MCP
```

## Déploiement

Le déploiement est automatique via Vercel sur push vers `main`.
Configurer les variables d'env dans le dashboard Vercel avant le premier déploiement.
