# Nom du site et stratégie SEO

Recherche OpenSEO du 17/11/2026, marché France (fr). 3 thèmes de départ (`microbiote`, `probiotique`, `flore vaginale`) → ~370 mots-clés, puis analyse des 10 premiers résultats Google sur 6 requêtes clés.
Volumes = recherches mensuelles estimées en France. KD = difficulté sur 100 (0-20 facile, 20-40 moyen).

## 1. Nom recommandé : **Probio Décodé** (`probiodecode.fr`)

**Pourquoi**
- **« probiotique » est le mot qui pèse** : 60 500 recherches/mois, et toute l'intention d'achat passe par lui (« meilleur probiotique », « quelle probiotique choisir »). « Microbiote » (12 100) est surtout informationnel.
- **« Décodé » porte l'angle** « sans bullshit » : on lit les étiquettes, on vérifie les souches, on ne promet rien. C'est exactement le seul discours autorisé par la réglementation (cf. `conformite.md`), donc le nom et la conformité vont dans le même sens.
- **Couvre les 3 produits** : probiotiques intestinaux, intimes, buccaux.
- Pas de « Noobiotik » dans le nom (marque de l'annonceur), neutre vis-à-vis d'Awin.
- Court, prononçable, marche aussi comme pseudo TikTok/Instagram (`@probiodecode`).

**À réserver** : `probiodecode.fr` (principal) + `probiodecode.com` (protection, redirection).

### Alternatives

| Nom | Domaine | Pour | Contre |
|---|---|---|---|
| **Microbiote Décodé** | microbiotedecode.fr | Plus large et pédagogique ; « microbiote » 12 100/mois, KD 17 | Moins proche de l'intention d'achat |
| Les 3 Flores | les3flores.fr | Colle aux 3 produits, très mémorisable | « flore » est ambigu sur Google : la recherche « flore vaginale » a remonté surtout de la botanique (flore des Alpes, de Corse…) |
| Microbiote en clair | microbiote-en-clair.fr | Ton pédagogique | Long, moins mémorisable |

> ⚠️ **Disponibilité à confirmer chez un registrar** (OVH, Gandi…) avant de compter dessus. La vérification Vercel indique « disponible » pour tous les candidats, y compris `lesflores.fr`, ce qui est douteux. Le registre officiel (RDAP AFNIC / Verisign) n'était pas joignable depuis cet environnement.

## 2. Carte des mots-clés (ce qu'on vise)

### Cluster A – Choisir un probiotique (intention d'achat : le cœur du revenu)

| Mot-clé | Volume | KD |
|---|---|---|
| meilleur probiotique | 2 400 | 0 |
| quelle probiotique choisir | 590 | 0 |
| meilleur probiotique flore intestinale | 590 | 0 |
| quel est le meilleur probiotique | 480 | 0 |
| gélules probiotiques | 390 | 3 |
| ufc probiotique | 50 | 0 |

### Cluster B – Probiotiques et flore intestinale (Probio9)

| Mot-clé | Volume | KD |
|---|---|---|
| probiotique (tête de cluster, long terme) | 60 500 | 31 |
| probiotique flore intestinale | 12 100 | 21 |
| probiotique intestinal | 9 900 | 15 |
| microbiote | 12 100 | 17 |
| microbiote intestinal | 6 600 | 34 |
| prébiotique probiotique (+ variante) | 2 400 + 1 900 | 0 |
| probiotique définition | 1 000 | 12 |
| pourquoi prendre des probiotiques | 480 | 0 |
| quand prendre probiotique matin ou soir | 390 | 0 |
| probiotique après antibiotiques (+ variante) | 390 + 390 | 0 |

### Cluster C – Flore intime (Flore Intime)

| Mot-clé | Volume | KD |
|---|---|---|
| probiotique flore intime | 12 100 | 0 |
| probiotique vaginal | 4 400 | 0 |
| probiotiques flore vaginale | 2 400 | 0 |
| flore vaginale | 1 600 | 0 |
| probiotique intime | 880 | 9 |

### Cluster D – Flore buccale (Flore Orale) : la niche la plus facile

| Mot-clé | Volume | KD |
|---|---|---|
| probiotique mauvaise haleine | 590 | 0 |
| probiotique buccal | 480 | 0 |
| probiotiques flore buccale | 320 | 0 |
| microbiote buccal | 320 | 0 |
| probiotiques flore orale | 110 | 0 |

### Volume écarté volontairement (conformité)

Ces requêtes sont grosses, mais les cibler avec du contenu affilié revient à associer le produit à un effet ou à une pathologie :
`probiotique pour maigrir` (12 100), `probiotique et ventre plat` (720), `côlon irritable probiotique` (1 600), `probiotique diarrhée` (1 300), `probiotique ballonnement` (880), `probiotiques mycose` (390), `probiotique sii`, `probiotiques immunité`.
→ On ne les cible pas. C'est le prix de la pérennité du compte Awin.

## 3. Ce que montrent les pages de résultats

| Requête | Qui est en haut | Lecture |
|---|---|---|
| quelle probiotique choisir | meilleurprobiotique.fr (#1), fete-internet.fr, melusinecosmetics, Que Choisir, marques (Pileje, Granions, Aroma-Zone) | **Des petits sites de niche sont n°1** → la place est prenable. Que Choisir (« Notre microbiote peut s'en passer ») confirme qu'il existe un public pour l'angle sceptique. |
| meilleur probiotique | journee-mondiale.com, bibamagazine, Que Choisir, Santé Magazine, L'Express | Mélange médias + sites de comparatifs génériques ; aucun spécialiste dominant. |
| probiotique flore intestinale | youtube, santepratique, nutremys, laboratoires, Medisite | Fragmenté, beaucoup de pages de marques. |
| probiotiques flore vaginale | kareena-k, blogs (unpetitboutdelise), osmoz, melusinecosmetics, pharmacies | Peu de contenu de fond : **un vrai guide sourcé passe devant**. |
| microbiote intestinal | em-consulte, lanutrition, CNRS, allodocteurs, Santé Magazine | Le plus dur (KD 34, sites d'autorité) : cible à 6-12 mois. |
| probiotique mauvaise haleine | fiches produits (Oral Biotics, iHerb, Amazon), Nordic Oil, Doctolib | **Presque aucun article de fond** → victoire rapide possible. Noobiotik y est déjà via une pub Facebook « Flore Orale ». |

## 4. Plan éditorial révisé (8 articles, ordre de publication)

| # | Article | Mot-clé principal | Cluster | Produit |
|---|---|---|---|---|
| 1 | Comment choisir un probiotique : la grille pour lire une étiquette (souches, UFC, gélule) | quelle probiotique choisir | A | tous |
| 2 | Probiotiques et flore intestinale : ce que dit vraiment la science | probiotique flore intestinale | B | Probio9 |
| 3 | Probiotiques et flore intime : comprendre le microbiote vaginal | probiotique flore intime | C | Flore Intime |
| 4 | Microbiote buccal et probiotiques oraux : le guide | probiotique buccal | D | Flore Orale |
| 5 | Meilleur probiotique en 2026 : nos critères, pas un classement bidon | meilleur probiotique | A | tous |
| 6 | Prébiotique, probiotique, postbiotique : les différences | prébiotique probiotique | B | – |
| 7 | Probiotiques et antibiotiques : quand et comment (ce qu'on sait) | probiotique après antibiotiques | B | Probio9 |
| 8 | Quand prendre ses probiotiques : matin, soir, pendant le repas ? | quand prendre probiotique matin ou soir | B | tous |

Article pilier plus tard : « Microbiote : le guide complet » (microbiote / microbiote intestinal), une fois que le site a gagné en autorité.

Fiches produits (Probio9, Flore Intime, Flore Orale) : une page factuelle chacune, liée depuis les articles 1-5.

## 5. Ce qui fera passer en tête

1. **Pages de choix en premier (cluster A)** : c'est là que sont l'intention d'achat et les SERP les plus faibles.
2. **Maillage en silo** : chaque cluster = 1 guide central + articles satellites qui pointent vers lui ; tous pointent vers l'article 1 (la grille).
3. **Signaux de confiance (E-E-A-T)**, indispensables sur la santé : page « À propos » avec une vraie personne, sources citées (études, ANSES, Inserm), date de mise à jour visible, méthodologie publique (« comment on évalue un probiotique »).
4. **Contenu unique** : tableaux comparatifs de souches et d'UFC, photos des étiquettes, mises à jour datées. Les concurrents recopient des fiches produit.
5. **Vidéos ↔ articles** : chaque vidéo renvoie vers l'article du même sujet ; intégrer la vidéo dans l'article.
6. **Technique** : site statique rapide (Astro), données structurées `Article` et `FAQPage`, Search Console dès J1.

## 6. Prochaines étapes

- [ ] Réserver `probiodecode.fr` + `.com` (vérifier la disponibilité chez le registrar)
- [ ] Réserver `@probiodecode` sur TikTok / Instagram / YouTube
- [ ] Brancher la Search Console, puis relancer OpenSEO sur le domaine à M+2 pour repérer les requêtes en position 11-20

Crédits OpenSEO consommés : ~190 sur 479.
