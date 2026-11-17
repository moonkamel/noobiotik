import { product, site } from '../config';

export const faqs = [
  {
    q: 'Pourquoi un lien affilié ?',
    a: `Quand vous achetez via mes liens, ${product.brand} me verse une commission. Le prix est exactement le même pour vous. C'est ce qui finance ce site, et c'est pour ça que je l'écris en toutes lettres à côté de chaque bouton.`,
  },
  {
    q: 'Comment le prendre ?',
    a: `La fiche produit indique ${product.dose}. Suivez la notice de la boîte et ne dépassez pas la dose journalière recommandée.`,
  },
  {
    q: 'Est-ce vegan ? Y a-t-il des allergènes ?',
    a: `La marque annonce une formule vegan, sans OGM et sans allergènes, sans ${product.free.join(', ')}. Vérifiez toujours la liste d'ingrédients si vous avez une allergie.`,
  },
  {
    q: 'Où est-il fabriqué ?',
    a: `Conçu à ${product.designedIn}, fabriqué à ${product.madeIn}.`,
  },
  {
    q: 'Est-ce que ça remplace un avis médical ?',
    a: "Non. Un complément alimentaire n'est pas un médicament. Si une gêne digestive persiste ou vous inquiète, parlez-en à votre médecin ou à votre pharmacien. C'est particulièrement important en cas de grossesse, d'allaitement ou de traitement en cours.",
  },
  {
    q: 'Qui écrit ce site ?',
    a: `Je m'appelle ${site.author}. Je ne suis pas professionnel de santé : je lis les études et les étiquettes, et je vous montre ce que j'y trouve. Toutes mes sources sont citées.`,
  },
];
