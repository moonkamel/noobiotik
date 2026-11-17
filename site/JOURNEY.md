# Animation « Voyage de la gélule »

Livrée en **SVG + GSAP** (pas de Lottie pour l'instant). Poids ajouté : ~2 ko gz de timeline + le SVG inline. GSAP est déjà chargé par la page.
Storyboard validé : `design/JOURNEY-STORYBOARD.md` · prévisualisations : `design/journey-preview/` (5 images clés, GIF, MP4, état « mouvement réduit », mobile).

| Fichier | Rôle |
|---|---|
| `src/components/Journey.astro` | Section, SVG (écrit dans l'état **final**), sous-titres, badges, CTA, bouton Pause |
| `src/scripts/journey.ts` | Timeline GSAP + option Lottie |
| `src/config.ts` → `journey`, `LOTTIE_JSON_PATH` | Textes, timings, badges, aria-label, chemin du Lottie |

## Comportement

- Démarre une fois, quand la scène atteint 70 % de la hauteur d'écran (ScrollTrigger `once`), puis s'arrête sur la dernière image.
- Bouton **Pause / Lecture / Revoir** (obligatoire au-delà de 5 s de mouvement automatique, WCAG 2.2.2). Pas de barre de lecture, pas de scrub.
- Sous-titres en HTML (un visible à la fois, tous lisibles par les lecteurs d'écran). Conteneur SVG `role="img"` + `aria-label`.
- **Mouvement réduit / sans JS** : le SVG reste sur sa dernière image, les 4 sous-titres sont listés, badges et CTA visibles.
- Sur mobile, la barre CTA collante se masque quand le CTA de l'animation est à l'écran.

## Ajuster les timings

Dans `src/config.ts` :

```ts
timings: { trajet: 0, obstacle: 2.5, heros: 5.5, liberation: 9, preuve: 12.5, fin: 13.5 },
```

Chaque plan démarre à sa valeur (en secondes). Les animations internes d'un plan sont positionnées relativement à son label dans `journey.ts` (ex. `'heros+=2.1'`) : si vous raccourcissez un plan, réduisez aussi ces décalages et les `duration`.

## Remplacer par une version After Effects (Lottie)

1. Exporter le `.json` avec Bodymovin (rendu SVG, sans images bitmap, < 150 ko), en respectant les mêmes timings que ci-dessus (les sous-titres sont synchronisés dessus).
2. Le déposer dans `public/animations/probio9-journey.json`.
3. Dans `src/config.ts` : `export const LOTTIE_JSON_PATH = '/animations/probio9-journey.json';`

Le composant charge alors `lottie-web` (version light, ~47 ko gz, chunk séparé) et le JSON **seulement à 200 px de la section**. Le SVG actuel sert d'affiche pendant le chargement. Sans chemin renseigné, lottie-web n'est jamais téléchargé.

## Désactiver l'animation

- Pour un visiteur : son réglage système « réduire les animations » suffit (aucune action côté site).
- Pour tout le monde : retirer `<Journey />` de `src/pages/index.astro`, ou supprimer l'appel `initJourney(...)` dans `src/scripts/story.ts` (la section reste alors affichée en version statique).

## Textes

Validés le 17/11/2026 (conformité : `docs/conformite.md`). Le texte du plan 3 suppose que Noobiotik documente la gastro-résistance de la gélule Embo Caps® AP : à confirmer auprès de la marque.
