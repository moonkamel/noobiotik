/**
 * Garde-fou conformité (règlement CE 1924/2006) — `npm run check` après `npm run build`.
 * Cherche dans le HTML généré les formulations d'effet/pathologie interdites pour un probiotique.
 * Les éléments marqués data-claims-ok (citations en négation : « Ce que je ne vous dirai jamais »,
 * pièges du marché) sont exclus. Code de sortie 1 si une formulation est trouvée.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN = [
  /gu[ée]ri[rst]?/i, /\btrait(e|er|ement)\b/i, /\bsoign/i, /pr[ée]vien[st]?|pr[ée]venir/i,
  /[ée]limin/i, /\bboost/i, /ventre plat/i, /maigri/i, /contribue [àa]/i, /\bsoutien[st]?\b|\bsoutenir\b/i,
  /am[ée]liore/i, /r[ée]gul(e|ier|arise)/i, /ballonnement/i, /\btransit\b/i, /immunit/i,
  /mycose|candidose|infection|côlon irritable|\bSII\b/i, /mauvaise haleine/i, /flore (intestinale )?[ée]quilibr/i,
];
const dir = new URL('../dist/', import.meta.url).pathname;
const files = readdirSync(dir).filter((f) => f.endsWith('.html'));
let issues = 0;
for (const f of files) {
  let html = readFileSync(join(dir, f), 'utf8');
  html = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  // retire les éléments data-claims-ok (même nom de balise, sans imbrication du même type)
  html = html.replace(/<(\w+)[^>]*\bdata-claims-ok\b[^>]*>[\s\S]*?<\/\1>/g, '');
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ');
  for (const re of FORBIDDEN) {
    const g = new RegExp(re.source, 'gi');
    let m;
    while ((m = g.exec(text))) {
      issues++;
      console.log(`✗ ${f} « …${text.slice(Math.max(0, m.index - 50), m.index + 60).trim()}… »`);
    }
  }
}
console.log(issues ? `\n${issues} formulation(s) à revoir (cf. docs/conformite.md).` : '✓ Aucune allégation interdite détectée.');
process.exit(issues ? 1 : 0);
