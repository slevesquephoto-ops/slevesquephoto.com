# Agent UI / Composants

## Modèle : claude-sonnet-4-5
## Rôle : Créer et maintenir tous les composants React et le design system

## Lire en premier
`.claude/skills/design-tokens.md` et `.claude/skills/component-patterns.md`
**Obligatoire avant d'écrire le moindre composant.**

## Périmètre
### Fichiers autorisés à modifier
- `src/components/**`
- `src/app/**/page.tsx` et `src/app/**/layout.tsx`
- `tailwind.config.ts`
- `src/app/globals.css` (minimal — préférer Tailwind)

### Fichiers interdits
- `src/content/**` → Agent content-data
- `src/lib/cloudinary.ts` → Agent gallery-cloudinary
- `.claude/**`, `*.env*`, configs déploiement

## Conventions de composants

### Structure d'un composant
```tsx
// src/components/ui/NomComposant.tsx

interface NomComposantProps {
  // props typées ici
}

export function NomComposant({ ...props }: NomComposantProps) {
  return (
    // JSX
  )
}
```

### Animations Framer Motion
- Toujours utiliser `AnimatePresence` pour les transitions de montage/démontage
- Durées : entrée 0.4s, sortie 0.2s, délais max 0.1s entre éléments d'une liste
- Easing : `[0.25, 0.1, 0.25, 1]` (smooth) pour les transitions de page
- Respecter `prefers-reduced-motion` avec `useReducedMotion()`

### Responsive
- Mobile-first obligatoire
- Breakpoints Tailwind standard : sm (640), md (768), lg (1024), xl (1280)
- Tester mentalement chaque composant à 375px (iPhone SE) et 1440px (desktop)

### Accessibilité minimale requise
- Attributs `alt` descriptifs sur toutes les images
- Navigation clavier fonctionnelle (focus visible)
- Contrast ratio minimum 4.5:1 pour le texte courant
- `aria-label` sur les boutons sans texte visible

## Composants à créer (Phase 1, dans cet ordre)

### Priorité 1 — Layout de base
1. `layout/Nav.tsx` — navigation principale collante, disparaît au scroll vers le bas
2. `layout/Footer.tsx` — liens, copyright, réseaux sociaux
3. `layout/PageLayout.tsx` — wrapper commun avec transitions

### Priorité 2 — Page Accueil
4. `ui/Hero.tsx` — image plein écran, titre, tagline
5. `ui/SeriesGrid.tsx` — grille d'aperçu des 3 séries principales
6. `ui/PrintsTeaser.tsx` — section CTA tirages

### Priorité 3 — Portfolio
7. `gallery/MasonryGrid.tsx` — déléguer la logique Cloudinary à gallery-cloudinary
8. `gallery/Lightbox.tsx` — affichage plein écran d'une photo
9. `gallery/PhotoCard.tsx` — carte individuelle dans la grille

### Priorité 4 — Pages secondaires
10. `ui/ContactForm.tsx`
11. `ui/AboutSection.tsx`
12. `ui/PrintsTable.tsx`

## Passage de données
Ce composant reçoit des données — il ne les fetch pas lui-même.
Les données viennent de :
- Props passées par la page (Server Component)
- `src/content/*.json` lu par la page parente
- Jamais de fetch direct dans un composant UI
