# Probio Décodé – landing Probio9

Site statique Astro. Objectif : clic qualifié vers la fiche Probio9 (lien affilié) + capture email.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run check     # garde-fou conformité sur dist/ (échoue si une allégation interdite apparaît)
```

## Avant la mise en ligne : tout se règle dans `src/config.ts`

| Clé | À faire |
|---|---|
| `AWIN_URL` | Coller le lien de suivi Awin après validation. Tant qu'il est vide, les CTA pointent vers la fiche officielle (non tracée). |
| `EMAIL_FORM_ACTION` / `EMAIL_FIELD_NAME` | URL d'action du formulaire de l'outil emailing (Brevo : champ `EMAIL`). Vide = message « bientôt disponible ». |
| `site.author` | Votre prénom (FAQ « Qui écrit ce site »). |
| `product.*` | **Vérifier chaque valeur sur la fiche officielle** (dose, prix, libellé de certification). Renseigner `strains` avec les noms complets des 9 souches pour afficher la liste détaillée. |
| `trust.*` | Nombre d'avis Trustpilot, URL exacte de la page Trustpilot, date de consultation. |
| `personalReview` | Votre avis d'usage (format, routine), uniquement après avoir réellement testé, et sans effet santé. |
| `legal.*` | Identité de l'éditeur (obligatoire, LCEN), hébergeur. |

Les champs `[À COMPLÉTER]` apparaissent surlignés en jaune dans les pages légales.

## Structure

```
src/
  config.ts              données + liens (source unique)
  data/faq.ts            questions/réponses (aussi en JSON-LD FAQPage)
  layouts/Base.astro     <head>, police, SEO, header/footer
  layouts/Legal.astro    gabarit des pages légales
  components/
    Hero · Problem · Education · Solution · Proof · Faq · Action · StickyCta
    Cta.astro            bouton + mention d'affiliation (toujours ensemble)
  scripts/
    micro.ts             micro-interactions (Motion, ~7 ko gz, chargé avec la page)
    story.ts             scrolltelling GSAP (chunk séparé, chargé à l'idle)
  pages/                 index, affiliation, mentions-legales, confidentialite, sitemap.xml
scripts/check-claims.mjs garde-fou allégations
design/                  moodboard + architecture validée
```

## Système d'animation

| Couche | Fichier | Détail |
|---|---|---|
| Entrée du hero | `Hero.astro` (CSS) | fondu + 14 px, décalage 80 ms par élément. Le H1 (élément LCP) n'a pas de fondu : seule sa position bouge, il est peint dès la 1re frame. |
| Orbite des 9 souches | `Hero.astro` (CSS) | rotation 60 s, figée si `prefers-reduced-motion`. |
| Hovers / clic / focus | `global.css` | ressort `cubic-bezier(.34,1.56,.64,1)`, 150-250 ms. Bouton : −2 px et flèche +4 px ; clic : 0,97. |
| Header verre dépoli | `micro.ts` | classe `.is-scrolled` après 24 px (rAF, listener passif). |
| Cartes en cascade | `micro.ts` (Motion) | équivalent des variants Framer Motion `hidden {opacity:0,y:24}` → `show {opacity:1,y:0}`, ressort `stiffness 260 / damping 26`, `stagger(0.07)`. Ne s'applique qu'aux groupes situés sous la ligne de flottaison (pas de flash). |
| Icônes au trait | `micro.ts` + CSS | `pathLength="1"`, `stroke-dashoffset 1 → 0` en 900 ms à l'entrée dans l'écran (remplace Lottie, ~0 ko). |
| Barre CTA mobile | `micro.ts` | visible après le hero, masquée quand la section finale est à l'écran. |
| Pièges du marché | `story.ts` (GSAP) | `blur(6px) + opacité 0 + 40 px → net`, scrub entre `top 98%` et `top 72%`. Titre collant en CSS `sticky` (pas de pin). |
| Orbite → familles | `story.ts` (GSAP) | les 9 points partent d'un cercle (angle stocké en `data-angle`) et se rangent en 4/4/1, scrub, `invalidateOnRefresh`. |
| Compteur Trustpilot | `story.ts` (GSAP) | 0 → 4,6 en 1,4 s, une seule fois. |

**Mouvement réduit** : la classe `js-motion` n'est posée sur `<html>` que si JS est actif et que `prefers-reduced-motion` n'est pas demandé. Sans elle, rien n'est masqué, GSAP n'est pas chargé et l'orbite est figée.

## Performance (mesurée, Lighthouse 12, build de prod)

| | Mobile | Desktop |
|---|---|---|
| Performance | 99 | 100 |
| Accessibilité | 100 | – |
| Bonnes pratiques | 100 | – |
| SEO | 100 | – |
| LCP | 1,9 s (4G simulée) | 0,4 s |
| CLS / TBT | 0 / 50 ms | – |

Leviers en place (`astro.config.mjs`, `Base.astro`, `micro.ts`) :
- HTML statique, CSS inliné, aucune requête bloquante ;
- un seul fichier de police (Inter variable, sous-ensemble latin, 48 ko), préchargé, `font-display: swap` ;
- JS initial : 7 ko gz (Motion `mini` + `inView`) ;
- GSAP + ScrollTrigger (44 ko gz) dans un chunk dédié, `import()` à l'idle ;
- visuels 100 % SVG inline (pas d'image à charger) ;
- `vercel.json` : cache immuable 1 an sur `/_astro/*`, URLs propres, en-têtes de sécurité.

## Ce qui est volontairement absent

- **Three.js** : remplacé par la gélule SVG (< 3 ko). Option V2 desktop-only si besoin (cf. `design/ARCHITECTURE.md`).
- **Lottie** : remplacé par les icônes au trait animées.
- **Analytics / cookies** : aucun, donc pas de bandeau cookies. Si besoin, privilégier une solution sans cookie (Plausible, Vercel Analytics).
- **Témoignages clients** : voir `docs/conformite.md` §2 : un témoignage d'effet est une allégation, et un badge « achat vérifié » impose une vérification réelle.
