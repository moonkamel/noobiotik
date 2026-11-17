# Landing Probio9 – Moodboard, architecture, arbitrages (v1, à valider)

Moodboard visuel : `site/moodboard.html` (tokens, typo, hero, cartes, boutons ; bascule clair/sombre).

## 0. Les 4 arbitrages à valider avant de coder

### A. Conformité : le brief contient des formulations interdites → recadrage de l'angle

Le brief autorise « contribue à / soutient / aide à maintenir le confort digestif / l'équilibre de la flore ». **Pour un probiotique, aucune de ces allégations n'est autorisée** (aucune allégation de santé validée par l'UE pour les probiotiques, cf. `docs/conformite.md`). Une landing 100 % commerciale qui enchaîne « ballonnements » → « Probio9 » est une allégation implicite, même sans le mot « guérir ».

| Brief | Problème | Proposition |
|---|---|---|
| H1 « La paix digestive commence par le bon équilibre » | Promesse d'effet | **« Un probiotique se choisit sur l'étiquette. »** |
| Sous-titre « …pour retrouver un confort digestif » | Allégation d'effet | « 9 souches, 32 milliards d'UFC garantis, gélule gastro-résistante. On a lu la composition ligne par ligne : la voici, sans promesse en l'air. » |
| Section problème « Les ballonnements ne sont pas une fatalité » | Symptôme → produit | **Le problème devient le marché** : « Le rayon probiotiques est un brouillard. » (souches sans code, UFC « à la fabrication », excipients, promesses miracles). On garde l'AIDA, et l'angle « décodé » prend tout son sens. |
| Témoignages Trustpilot recopiés | Un témoignage d'effet = une allégation ; et les avis appartiennent à Trustpilot et à leurs auteurs (leur réutilisation passe par le widget officiel) | Note 4,6/5 + nombre d'avis + date + lien « Lire les avis sur Trustpilot », **et un bloc « Mon avis d'utilisateur »** (goût, format, routine, prix par jour), sans effet santé. |
| « 39 000+ clients satisfaits » | « satisfaits » est invérifiable | « 39 000+ clients » (source Noobiotik) et la note Trustpilot à part. |
| Cible « souffrant de ballonnements » | Ciblage par symptôme | Inchangé pour la stratégie, mais **jamais écrit sur la page**. |

Le contenu éducatif sur le microbiote (alimentation, fibres, stress, sommeil) reste possible, dans un bloc séparé, sourcé et sans lien de cause à effet avec le produit.

### B. Stack : Astro + GSAP + Motion (vanilla), pas Next.js/React

- Framer Motion exige React (~45 ko + ~35 ko de runtime) **en plus** de GSAP : deux moteurs d'animation pour une seule page.
- **Proposition** : Astro (HTML statique, 0 JS par défaut) + **GSAP ScrollTrigger** pour le scrolltelling (chargé en différé) + **Motion** (la bibliothèque qui a succédé à Framer Motion, utilisable sans React : `animate()`, ressorts, `inView`, ~5 ko) pour les micro-interactions. On applique les deux skills, avec un seul framework.
- Hovers et focus en **CSS pur** (ressort via `cubic-bezier`) : 0 ko de JS, < 0,3 s.

### C. 3D : SVG animé d'abord, Three.js en option

- Three.js pèse ~150 ko compressé, sollicite le GPU sur mobile et ne fait pas progresser la conversion : le LCP doit être le titre.
- **Proposition** : la gélule et ses **9 points en orbite (= 9 souches)** en SVG inline (voir le moodboard). Animée par GSAP au chargement puis liée au scroll : les points se détachent et deviennent les 9 lignes de la liste des souches en section 4. La métaphore est littérale et le fichier pèse moins de 3 ko.
- Option : la même gélule en Three.js (PBR, sans OrbitControls), chargée seulement sur desktop, avec `prefers-reduced-motion: no-preference`, après `requestIdleCallback`, avec le SVG en poster. À ajouter en V2 si les mesures le permettent.

### D. Lottie → icônes SVG à tracé animé

- lottie-web pèse ~60-250 ko, et il faudrait des fichiers JSON dessinés dans After Effects, qu'on n'a pas.
- **Proposition** : icônes SVG au trait animé (`stroke-dashoffset`, déclenché à l'entrée dans l'écran). Même effet « scientifique », ~0 ko. Si un motion designer livre des `.lottie` plus tard, on les branche avec `@lottiefiles/dotlottie-web`, chargé à la demande.

## 1. Architecture de l'information (AIDA)

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER sticky (transparent → verre dépoli après 80px)          │
│ [Probio Décodé]                     [Le guide gratuit] [Voir Probio9] │
└──────────────────────────────────────────────────────────────┘

① HERO – Attention                                    (100svh max)
   eyebrow : PROBIOTIQUE DÉCODÉ · PROBIO9
   H1      : Un probiotique se choisit sur l'étiquette.
   sous-titre : 9 souches, 32 Md UFC garantis, gélule gastro-résistante.
                On a lu la composition ligne par ligne : la voici.
   [CTA ● Découvrir la formule Probio9 →]   Télécharger le guide gratuit
   micro : Lien affilié · commission sans surcoût pour vous
   preuve : ● Fabriqué en Bretagne ● Vegan ● 4,6/5 Trustpilot ● 39 000+ clients
   visuel : gélule SVG + 9 souches en orbite (lente, stoppée si reduced-motion)
   GSAP : fondu du texte (0 → 1, 12 px, stagger 80 ms), orbite qui se déploie

② LE PROBLÈME – Intérêt                              (fond teinté)
   H2 : Le rayon probiotiques est un brouillard.
   4 « pièges » révélés au scroll (ScrollTrigger, 1 par 1, parallaxe légère) :
     1. « Lactobacillus » sans code de souche → impossible à vérifier
     2. UFC « à la fabrication » → combien au moment où vous l'avalez ?
     3. Excipients : dioxyde de titane, stéarate de magnésium…
     4. Promesses miracles → interdites, et pourtant partout
   transition : « Voici ce qu'on regarde à la place. »

③ ÉDUCATION – (bloc court, séparé, sourcé)
   H2 : Le microbiote en 30 secondes
   3 faits sourcés (≈ autant de bactéries que de cellules ; diversité ;
   fibres 30 g/j ANSES) + lien vers les articles du blog
   → aucun lien vers le produit dans ce bloc

④ LA SOLUTION – Désir
   H2 : Probio9 : 9 souches, une formule lisible.
   4 cartes (Motion, stagger 60 ms, ressort) :
     32 Md UFC garantis · Gélule gastro-résistante Embo Caps® AP
     · 0 excipient controversé · Conservation à température ambiante
   Scroll : les 9 points du hero arrivent et forment
   la LISTE DES 9 SOUCHES (nom complet, copiée de la fiche officielle)
   [CTA ● Voir la composition complète →] + micro affiliation

⑤ LA PREUVE – Confiance
   Compteur GSAP 0 → 4,6 /5 · « N avis Trustpilot, consulté le JJ/MM/AAAA »
   [Lire les avis sur Trustpilot ↗]
   Bloc « Fabrication » : conçu à Nice · fabriqué à Moréac (56) · AFNOR HACCP+*
   Bloc « Mon avis d'utilisateur » : format, goût, routine, prix/jour.
   Carte « Ce que je ne vous dirai pas » : liste des promesses qu'on refuse
   de faire → pic de confiance, cœur de la marque.

⑥ FAQ – Lever les objections                          (accordéon <details>)
   Pourquoi un lien affilié ? · Quand le prendre (selon la notice) ?
   · Est-ce vegan ? · Où est-il fabriqué ? · Qui écrit ce site ?
   (+ données structurées FAQPage pour le SEO)

⑦ L'ACTION
   Rappel en une ligne + [CTA ● Découvrir la formule Probio9 →]
   « En cliquant, vous serez redirigé vers la boutique officielle Noobiotik.
     Je perçois une commission d'affiliation, sans surcoût pour vous. »
   ───
   Capture email : « Les 3 erreurs qui déséquilibrent votre microbiote »
   [email] [Recevoir le guide]  ☐ consentement RGPD · double opt-in

FOOTER : Mentions légales · Confidentialité · Politique d'affiliation
         · « Les compléments alimentaires ne remplacent pas une alimentation
           variée et équilibrée… »
```
\* Libellé exact de la certification à recopier depuis noobiotik.fr.

**Mobile** : barre CTA collante en bas d'écran, qui apparaît après le hero et disparaît sur la section ⑦ (pour ne pas doubler le CTA). Pas d'épinglage (pin) GSAP sur mobile : de simples apparitions.

## 2. Système de mouvement

| Couche | Outil | Usage | Durée |
|---|---|---|---|
| Hovers, focus, clic | CSS | boutons, cartes, liens | 150-250 ms, ressort |
| Micro-interactions JS | Motion `animate`/`inView` | stagger des cartes, header verre, barre CTA mobile | ≤ 300 ms |
| Récit au scroll | GSAP + ScrollTrigger (différé) | pièges ②, orbite → liste des souches ④, compteur ⑤ | scrub |
| Icônes | SVG `stroke-dashoffset` | tracé à l'entrée dans l'écran | 800 ms |

`prefers-reduced-motion: reduce` → GSAP n'est pas chargé, tout est visible d'emblée, l'orbite est figée.

## 3. Budget de performance (objectif Lighthouse ≥ 95)

| Ressource | Budget |
|---|---|
| HTML + CSS critique inline | ≤ 30 ko |
| Police (Inter variable, sous-ensemble latin, préchargée) | ≤ 40 ko |
| JS initial (Motion + header) | ≤ 10 ko |
| GSAP + ScrollTrigger (chargés après le 1er rendu / à l'idle) | ~45 ko |
| Images (packshot Probio9 issu des créas Awin, AVIF/WebP, lazy) | ≤ 60 ko |
| **LCP** | le H1 (texte) → < 1,2 s en 4G |

## 4. Ce qu'il me faut de votre côté

1. **Validation** des arbitrages A-D (ou vos contre-propositions).
2. Le **lien affilié Awin** de Probio9 (sinon je mets un emplacement `AWIN_URL` dans la config).
3. Le **packshot officiel** (bibliothèque de créas Awin ou kit média Noobiotik). Ne pas récupérer les images du site sans accord.
4. L'**outil emailing** retenu (Brevo, MailerLite…) pour brancher le formulaire.
5. Votre **prénom et une photo** pour « Qui écrit ce site » : c'est la base de la confiance (E-E-A-T).

Après validation : implémentation dans `site/` (Astro), puis prévisualisation (Vercel ou capture d'écran).
