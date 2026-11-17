/**
 * Micro-interactions (skill motion-framer → Motion, version vanilla sans React).
 * Chargé avec la page (≈ 5 ko). Tout est < 300 ms ou piloté par ressort.
 *
 *  - Header : passe en verre dépoli après 24 px de défilement
 *  - Cartes [data-stagger] : apparition en cascade (ressort, stagger 70 ms)
 *  - Icônes .draw : tracé du trait à l'entrée dans l'écran
 *  - Barre CTA mobile : visible après le hero, masquée sur la section finale
 *  - Ensuite, à l'idle, chargement différé du récit GSAP (story.ts)
 */
import { animate } from 'motion/mini';
import { inView, stagger, spring } from 'motion';

const motionOK = document.documentElement.classList.contains('js-motion');

/* Header ------------------------------------------------------------------ */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* Cartes en cascade -------------------------------------------------------- */
// Variants équivalents Framer Motion : hidden {opacity:0, y:24} → show {opacity:1, y:0}
if (motionOK) {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
    // On ne cache que si le groupe est sous la ligne de flottaison (aucun flash sur ce qui est déjà visible)
    if (group.getBoundingClientRect().top < innerHeight) return;
    items.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; });
    inView(group, () => {
      animate(items, { opacity: [0, 1], transform: ['translateY(24px)', 'none'] }, { type: spring, stiffness: 260, damping: 26, delay: stagger(0.07) })
        .then(() => items.forEach((el) => { el.style.transform = ''; })); // rend la main au :hover CSS
    }, { amount: 0.2 });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.style.opacity = '0';
    inView(el, () => { animate(el, { opacity: [0, 1], transform: ['translateY(16px)', 'none'] }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] }); }, { amount: 0.3 });
  });
}

/* Icônes au trait ------------------------------------------------------------ */
document.querySelectorAll<SVGElement>('.draw').forEach((svg) => {
  inView(svg, () => { svg.classList.add('is-drawn'); }, { amount: 0.6 });
});

/* Barre CTA mobile ---------------------------------------------------------- */
const sticky = document.querySelector<HTMLElement>('[data-sticky-cta]');
const hero = document.querySelector<HTMLElement>('.hero');
const finalSection = document.querySelector<HTMLElement>('[data-action]');
if (sticky && hero && finalSection) {
  sticky.hidden = false;
  let heroVisible = true;
  let finalVisible = false;
  const sync = () => sticky.classList.toggle('is-hidden', heroVisible || finalVisible);
  sync();
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; sync(); }).observe(hero);
  new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; sync(); }, { rootMargin: '0px 0px -30% 0px' }).observe(finalSection);
}

/* Récit GSAP, chargé en différé ---------------------------------------------- */
if (motionOK) {
  const load = () => import('./story').then((m) => m.initStory());
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 2000 });
  else setTimeout(load, 1200);
}
