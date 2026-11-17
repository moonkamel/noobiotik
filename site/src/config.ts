/**
 * Configuration centrale du site.
 * ─────────────────────────────────────────────────────────────
 * TOUT ce qui doit être mis à jour sans toucher au code est ici.
 * Chaque donnée produit indique sa source et son statut de vérification :
 * relire la fiche officielle Noobiotik avant la mise en ligne.
 */

export const site = {
  name: 'Probio Décodé',
  url: 'https://probiodecode.fr',
  author: '[Prénom]', // À COMPLÉTER : votre prénom (section « Qui écrit ce site »)
  description:
    "Probio9 de Noobiotik décodé : 9 souches, 32 milliards d'UFC, gélule gastro-résistante. La composition, ligne par ligne, sans promesse en l'air.",
  locale: 'fr_FR',
};

/**
 * Lien de destination des CTA.
 * - Tant que le compte Awin n'est pas validé : la page produit officielle (non tracée).
 * - Après validation : coller ici le lien de suivi Awin (https://www.awin1.com/cread.php?...).
 */
export const AWIN_URL = ''; // ← À COMPLÉTER après validation Awin
export const PRODUCT_URL = 'https://www.noobiotik.com/products/probio9-intestin-digestion';
export const ctaHref = AWIN_URL || PRODUCT_URL;
export const isTracked = Boolean(AWIN_URL);

/**
 * Formulaire email (lead magnet).
 * Coller l'URL d'action du formulaire de votre outil (Brevo, MailerLite…).
 * Vide = le formulaire affiche « bientôt disponible » au lieu d'envoyer.
 */
export const EMAIL_FORM_ACTION = '';
export const EMAIL_FIELD_NAME = 'EMAIL'; // nom du champ attendu par l'outil (Brevo : EMAIL)

export const leadMagnet = {
  title: 'Les 3 erreurs qui déséquilibrent votre microbiote',
  pitch: 'Un guide de 8 pages, sourcé, sans pub. Envoyé par email, désinscription en un clic.',
};

/**
 * Données produit — Probio9 (Noobiotik)
 * Statut au 17/11/2026 : recoupé via recherche web (fiche produit noobiotik.com
 * + sites d'avis), fiche officielle non consultable depuis l'environnement de dev.
 * → À VÉRIFIER sur la fiche officielle avant mise en ligne.
 */
export const product = {
  name: 'Probio9',
  brand: 'Noobiotik',
  strainsCount: 9,
  cfuBillions: 32, // par dose
  dose: '2 gélules par jour', // à vérifier (notice)
  capsulesPerBox: 60,
  capsule: 'Gélule gastro-résistante Embo Caps® AP',
  // Répartition par genre : fiche produit (4 Bifidobacterium, 4 Lactobacillus, 1 Lactococcus)
  genera: [
    { genus: 'Bifidobacterium', count: 4 },
    { genus: 'Lactobacillus', count: 4, note: 'au sens large (genres reclassés en 2020)' },
    { genus: 'Lactococcus', count: 1 },
  ],
  /**
   * Noms complets des souches (genre + espèce + code) : à recopier depuis l'étiquette.
   * Laisser vide tant que non vérifié : la page affiche alors la répartition par genre.
   */
  strains: [] as { name: string; code?: string; cfuBillions?: number }[],
  free: ['dioxyde de titane', 'stéarate de magnésium', 'colorants'],
  labels: ['Vegan', 'Sans OGM', 'Sans allergènes'],
  storage: 'Conservation à température ambiante',
  designedIn: 'Nice',
  madeIn: 'Moréac (Morbihan, Bretagne)',
  certification: 'Laboratoire certifié AFNOR HACCP+', // libellé à vérifier
  price: { amount: 31.9, label: 'la boîte de 60 gélules', checkedOn: '17/11/2026' }, // à vérifier
};

/**
 * Votre avis personnel (usage uniquement : format, goût, routine — JAMAIS d'effet santé).
 * À écrire seulement après avoir réellement utilisé le produit. Vide = bloc masqué.
 */
export const personalReview = '';

export const trust = {
  trustpilotRating: 4.6,
  trustpilotReviews: null as number | null, // À COMPLÉTER : nombre d'avis affiché sur Trustpilot
  trustpilotUrl: 'https://fr.trustpilot.com/review/noobiotik.com', // à vérifier
  checkedOn: '17/11/2026',
  customers: '39 000', // source : Noobiotik ; à vérifier
};

/**
 * Animation « Voyage de la gélule » (section Journey).
 * - captions : textes validés, affichés en HTML sous l'animation (un par plan).
 * - timings : début de chaque plan, en secondes. Utilisés par la timeline GSAP ET
 *   par la version Lottie éventuelle (synchronisation des sous-titres).
 * - LOTTIE_JSON_PATH : chemin d'un JSON Lottie (ex. '/animations/probio9-journey.json',
 *   à déposer dans public/animations/). Vide = version SVG + GSAP (par défaut).
 */
export const LOTTIE_JSON_PATH = '';

export const journey = {
  captions: [
    "Avalé, un probiotique doit d'abord traverser l'estomac.",
    'Son acidité est un milieu difficile pour des bactéries vivantes.',
    'Grâce à sa gélule gastro-résistante, Probio9 protège les souches.',
    "Elle s'ouvre plus loin, dans l'intestin, et y libère ses 9 souches.",
  ],
  timings: { trajet: 0, obstacle: 2.5, heros: 5.5, liberation: 9, preuve: 12.5, fin: 13.5 },
  badges: ['Fabriqué en France', "32 milliards d'UFC", '39 000+ clients'],
  ariaLabel:
    "Animation montrant la gélule gastro-résistante de Probio9 traverser l'acidité de l'estomac puis s'ouvrir dans l'intestin pour y libérer ses 9 souches.",
};

export const legal = {
  editorName: '[Nom Prénom ou raison sociale]', // À COMPLÉTER
  editorStatus: '[Micro-entreprise — SIRET]', // À COMPLÉTER
  editorAddress: '[Adresse]', // À COMPLÉTER
  editorEmail: '[contact@probiodecode.fr]', // À COMPLÉTER
  host: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis', // à adapter à l'hébergeur retenu
};
