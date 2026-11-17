# Animation « Voyage de la survie » – moodboard et storyboard v1 (à valider)

## 1. Moodboard

**Ambiance** : planche pédagogique de musée des sciences, version 2026. Un schéma qu'on comprend en 2 secondes, qui bouge lentement, comme une respiration. Aucune urgence, aucune menace.

| Élément | Choix |
|---|---|
| Fond | `#F8F9FA`, aplat, aucun décor parasite |
| Traits | `#0A2540`, 2 px, extrémités arrondies, opacité 40 % pour les organes (le schéma s'efface derrière l'action) |
| Organes | silhouettes douces, formes en « galet » (aucun réalisme anatomique), remplissage `#EEF3F0` |
| Acide | `#E8A87C` à 35-60 % d'opacité, 3 couches de vagues déphasées (sinusoïdes lentes, période 3-4 s) |
| Gélule | **reprise de la gélule du hero du site** : coque blanche + moitié `#1B4332`, contour `#0A2540` (voir question 4) |
| Bouclier | ellipse translucide `#0A2540` à 8 % + contour à 25 %, légère respiration (scale 1 → 1,04) |
| Souches | 9 points `#1B4332`, halo `#D8E8DF` (le même motif que le hero et la section « 4 / 4 / 1 ») |
| Bactéries non protégées | points gris-bleu `#8A9BB0` qui pâlissent (opacité → 0,15) : on ne les « détruit » pas visuellement, on les éteint |
| Easing | `power2.inOut` pour les déplacements, `sine.inOut` pour les vagues, aucun rebond |
| Ombres | une seule ombre portée douce sous la gélule (flou 12 px, 10 %) pour la profondeur |

Continuité avec la page : même gélule, mêmes 9 points, et la fin de l'animation reprend la répartition 4 / 4 / 1 de la section composition. L'animation devient le chaînon visuel entre le hero et la composition.

## 2. Storyboard proposé (5 plans, ~13 s au lieu de 20)

| # | Durée | Visuel | Texte HTML proposé |
|---|---|---|---|
| 1 · Le trajet | 0 – 2,5 s | Un tracé vertical en pointillés se dessine : estomac (haut), intestin (bas). La gélule apparaît en haut du tracé. | « Avalé, un probiotique doit d'abord traverser l'estomac. » |
| 2 · L'obstacle | 2,5 – 5,5 s | Les vagues acides s'animent dans l'estomac. Une poignée de points « nus » (sans gélule) y tombent et pâlissent doucement. | « Son acidité est un milieu difficile pour des bactéries vivantes. » |
| 3 · Le héros | 5,5 – 9 s | La gélule descend dans l'acide ; le bouclier s'allume ; les vagues s'écartent autour d'elle ; elle ressort intacte. | **Votre texte, inchangé** : « Grâce à sa gélule gastro-résistante, Probio9 protège les souches. » |
| 4 · La libération | 9 – 12,5 s | Arrivée dans l'intestin (villosités en arches douces). La gélule s'ouvre en deux, les 9 points s'en échappent lentement puis se rangent en 4 / 4 / 1. | « Elle s'ouvre plus loin, dans l'intestin, et y libère ses 9 souches. » |
| 5 · La preuve | 12,5 – 14 s | Dernière image figée : intestin + 9 points apaisés à gauche ; à droite, les 3 badges HTML et le CTA. | Badges : « Fabriqué en France » · « 32 milliards d'UFC » · « 39 000+ clients ». CTA : « Découvrir Probio9 » + « Lien affilié ». |

Le texte de chaque plan apparaît sous l'animation (live region `aria-live="polite"`), synchronisé sur des labels de la timeline GSAP.

## 3. Ce que je propose de changer, et pourquoi

### 3.1 Conformité (3 textes sur 5 posent problème)

| Plan | Texte du brief | Problème | Proposition |
|---|---|---|---|
| 1 | « Vous connaissez cette sensation de lourdeur ? » + personnage qui se tient le ventre | Symptôme associé au produit = allégation de santé implicite. Interdit aussi en pub Meta (attribut personnel). | Supprimer le personnage ; plan « trajet » neutre. |
| 6 | Personnage « apaisé » | Mise en scène avant / après = allégation d'effet par l'image, même sans texte. | Supprimé (le CTA HTML suffit). |
| 2 | « La majorité des probiotiques sont détruits par l'acide gastrique… » | Affirmation comparative non sourcée qui dénigre les concurrents (publicité comparative : doit être objective et vérifiable). Beaucoup de probiotiques utilisent aussi des gélules gastro-résistantes ou des souches acido-tolérantes. | Fait général sans comparaison : « Son acidité est un milieu difficile pour des bactéries vivantes. » |
| 3 | « Grâce à sa gélule gastro-résistante, Probio9 protège les souches. » | **OK** : allégation technique sur la gélule, pas sur votre corps. À condition que Noobiotik la documente (voir question 2). | Inchangé. |
| 4 | « …arrivent vivantes et intactes pour contribuer à l'équilibre de votre flore. » | « Contribuer à l'équilibre de votre flore » est une allégation de santé non autorisée pour un probiotique. « Intactes » promet 100 % de survie, invérifiable. | « Elle s'ouvre plus loin, dans l'intestin, et y libère ses 9 souches. » |

Rappel : la liste « contribue à / soutient / aide à maintenir » du brief est celle que nous avions écartée ensemble (cf. `docs/conformite.md`). Elle ne s'applique qu'aux nutriments ayant une allégation autorisée (vitamines, minéraux…), pas aux probiotiques.

### 3.2 Durée : 20 s → ~13 s

Sur une landing, le visiteur défile : à 20 s, la majorité ne verra jamais la fin, or le message clé (plan 3) n'arrivait qu'à la 7e seconde. En supprimant les plans 1 et 6 (problématiques de toute façon), l'obstacle arrive dès 2,5 s et la gélule à 5,5 s.

### 3.3 Format : SVG + GSAP d'abord, Lottie remplaçable ensuite

| | Lottie | SVG + GSAP |
|---|---|---|
| Lecteur | lottie-web light ≈ 45 ko gz **en plus** | GSAP **déjà chargé** par la page : 0 ko de plus |
| Animation | JSON à écrire à la main sans After Effects (fragile, difficile à retoucher) | ~15-20 ko de SVG + timeline, palette en tokens CSS (mode sombre automatique) |
| Texte synchronisé | via événements de frames | labels de timeline natifs |

**Proposition** : je livre la version SVG + GSAP (fonctionnelle, légère), et le composant accepte un `LOTTIE_JSON_PATH` : si un motion designer livre plus tard un `.json` After Effects, il le remplace sans toucher à la page (lottie-web chargé seulement dans ce cas).

### 3.4 Accessibilité : un bouton pause est obligatoire

WCAG 2.2.2 (niveau A) : tout mouvement automatique de plus de 5 s doit pouvoir être mis en pause. « Aucun contrôle utilisateur » rendrait la page non conforme. Proposition : un petit bouton discret « Pause / Revoir » dans un coin, sans barre de lecture ni défilement manuel.

## 4. Comportement technique prévu

- Lancement à 30 % de visibilité (ScrollTrigger), lecture unique, arrêt sur la dernière image.
- SVG inline dès le HTML (première image visible immédiatement, pas d'écran vide) ; la timeline démarre à l'entrée dans l'écran.
- `prefers-reduced-motion` : dernière image affichée directement, texte des 5 plans affiché en liste.
- Conteneur `role="img"` + `aria-label` (texte en 4), sous-titres HTML lisibles par les lecteurs d'écran.
- Prévisualisation : captures des 5 images clés + une vidéo/GIF de la timeline complète.

`aria-label` proposé (sans allégation) : « Animation montrant la gélule gastro-résistante de Probio9 traverser l'acidité de l'estomac puis s'ouvrir dans l'intestin pour y libérer ses 9 souches. »
