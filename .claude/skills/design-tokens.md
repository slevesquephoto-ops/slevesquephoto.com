# Skill : Design Tokens — slevesquephoto.com

## Identité visuelle
**Concept** : Minimalisme dramatique
L'interface s'efface pour laisser les photos parler.
Beaucoup d'espace blanc, typographie sérieuse, navigation discrète.

## Palette de couleurs

### Couleurs principales
```
--color-bg:        #FAFAF8   /* blanc cassé chaud — fond principal */
--color-surface:   #F2F0EB   /* surface légèrement plus sombre */
--color-ink:       #1A1A18   /* noir profond — texte principal */
--color-ink-muted: #6B6B65   /* texte secondaire, captions */
--color-ink-faint: #A8A89E   /* texte tertiaire, metadata */
--color-accent:    #2C3E2D   /* vert forêt foncé — touches d'accent */
--color-border:    #E4E2DC   /* bordures très subtiles */
```

### Usage
- Fond du site : `--color-bg`
- Cards et surfaces : `--color-surface`
- Titres et texte corps : `--color-ink`
- Navigation (état normal) : `--color-ink-muted`
- Captions de photos : `--color-ink-faint`
- Boutons CTA, liens actifs : `--color-accent`
- Séparateurs : `--color-border`

## Typographie

### Familles
```
--font-serif:  'Cormorant Garamond', Georgia, serif    /* titres — élégance */
--font-sans:   'Inter', system-ui, sans-serif          /* corps, UI, navigation */
--font-mono:   'JetBrains Mono', monospace             /* code uniquement */
```

### Échelle typographique
```
/* Titres — toujours en Cormorant Garamond */
h1: 4rem / 1.1 / weight 300 (light) — page hero
h2: 2.5rem / 1.2 / weight 300 — sections
h3: 1.5rem / 1.3 / weight 400 — sous-sections
h4: 1.1rem / 1.4 / weight 500 — labels, titres de cartes

/* Corps — Inter */
body:    1rem / 1.7 / weight 400
small:   0.875rem / 1.6 / weight 400
caption: 0.75rem / 1.5 / weight 400 — légendes de photos
nav:     0.8125rem / 1 / weight 400 / letter-spacing: 0.08em / uppercase
```

### Règles typo
- Titres principaux : JAMAIS en gras (weight 300 ou 400 max)
- Navigation : uppercase + letter-spacing généreux + petite taille
- Captions : italic optionnel, couleur `--color-ink-faint`

## Espacement
```
Unité de base : 8px

--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-6:  24px
--space-8:  32px
--space-12: 48px
--space-16: 64px
--space-24: 96px
--space-32: 128px
```

### Marges de page
- Mobile : 20px horizontal
- Tablet : 40px horizontal
- Desktop : max-width 1400px, centré, padding 80px horizontal

## Composants UI — règles visuelles

### Navigation
- Hauteur : 64px
- Fond : `--color-bg` avec `backdrop-filter: blur(12px)` au scroll
- Liens : uppercase, 0.8rem, letter-spacing 0.08em
- État actif : couleur `--color-ink` (vs `--color-ink-muted` en inactif)
- Sur les pages portfolio : fond transparent sur hero, fond `--color-bg` ensuite

### Boutons
```
Primaire (CTA) :
  background: --color-accent
  color: white
  padding: 12px 32px
  font-size: 0.8125rem
  letter-spacing: 0.06em
  uppercase: oui
  border-radius: 0 (carré — choix stylistique)
  hover: opacity 0.85

Secondaire (ghost) :
  background: transparent
  border: 1px solid --color-ink
  color: --color-ink
  padding: 11px 31px (compenser la bordure)
  hover: background --color-ink, color white
```

### Cards de photos
- Aucune bordure, aucune ombre
- Fond transparent — l'image est la carte
- Caption en dessous : opacity 0 → 1 au hover (desktop) ou toujours visible (mobile)
- Ratio : respecter le ratio original Cloudinary

### Lightbox
- Fond : `rgba(10, 10, 10, 0.95)` — quasi-noir
- Fermeture : croix discrète en haut à droite
- Navigation : flèches légères sur les côtés
- Caption : en bas, Inter 0.75rem, blanc opacité 0.7

## Tailwind config — classes custom à ajouter
```typescript
// tailwind.config.ts
extend: {
  fontFamily: {
    serif: ['Cormorant Garamond', 'Georgia', 'serif'],
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  colors: {
    bg: '#FAFAF8',
    surface: '#F2F0EB',
    ink: { DEFAULT: '#1A1A18', muted: '#6B6B65', faint: '#A8A89E' },
    accent: '#2C3E2D',
    border: '#E4E2DC',
  },
  maxWidth: { site: '1400px' },
}
```
