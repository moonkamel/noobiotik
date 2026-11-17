/**
 * Scrolltelling (skill gsap-scrolltrigger).
 * Chunk séparé, importé dynamiquement par micro.ts à l'idle, jamais si
 * prefers-reduced-motion: reduce. Sans ce script, la page est complète et lisible :
 * GSAP ne fait que poser l'état de départ d'éléments situés sous la ligne de flottaison.
 *
 * Timelines :
 *  1. problem  — « le brouillard se dissipe » : chaque piège sort d'un flou (blur 6px → 0,
 *                opacité 0 → 1) en entrant dans l'écran (scrub, court).
 *  2. strains  — les 9 points partent de l'orbite du hero (cercle) et se rangent
 *                en 3 familles 4 / 4 / 1 (scrub, desktop + mobile, sans pin).
 *  3. counter  — note Trustpilot comptée de 0 à 4,6 (une seule fois).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStory() {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    problem();
    strains();
    counter();
  });

  // Recalcule après chargement de la police (hauteurs de texte)
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* 1 ─ Le problème ------------------------------------------------------------ */
function problem() {
  gsap.utils.toArray<HTMLElement>('[data-trap]').forEach((trap) => {
    gsap.fromTo(
      trap,
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none',
        scrollTrigger: { trigger: trap, start: 'top 98%', end: 'top 72%', scrub: 0.6 },
      },
    );
  });
  // Parallaxe légère du titre collant (desktop uniquement)
  const head = document.querySelector('.problem__head');
  if (head && matchMedia('(min-width: 861px)').matches) {
    gsap.fromTo(head, { y: 0 }, {
      y: -24, ease: 'none',
      scrollTrigger: { trigger: '[data-problem]', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* 2 ─ Orbite → familles de souches ------------------------------------------ */
function strains() {
  const viz = document.querySelector<HTMLElement>('.strains__viz');
  if (!viz) return;
  const dots = gsap.utils.toArray<HTMLElement>('.strain-dot', viz);
  const labels = viz.querySelectorAll('.strains__label, .strains__note');

  // Position de départ : chaque point sur un cercle centré sur la zone de visualisation
  const fromCircle = (dot: HTMLElement) => {
    const box = viz.getBoundingClientRect();
    const r = dot.getBoundingClientRect();
    const radius = Math.min(box.width, box.height) * 0.42;
    const a = (Number(dot.dataset.angle) * Math.PI) / 180;
    const cx = box.left + box.width / 2 + Math.cos(a) * radius;
    const cy = box.top + box.height / 2 + Math.sin(a) * radius;
    return { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2) };
  };

  const tl = gsap.timeline({
    scrollTrigger: { trigger: viz, start: 'top 85%', end: 'center 50%', scrub: 0.8, invalidateOnRefresh: true },
  });
  tl.fromTo(
    dots,
    { x: (_i, el) => fromCircle(el).x, y: (_i, el) => fromCircle(el).y, scale: 0.7 },
    { x: 0, y: 0, scale: 1, ease: 'power2.inOut', stagger: 0.03 },
  ).fromTo(labels, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.05 }, '-=0.25');
}

/* 3 ─ Compteur Trustpilot ---------------------------------------------------- */
function counter() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const fmt = (v: number) => v.toFixed(1).replace('.', ',');
    const state = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(state, {
      v: end, duration: 1.4, ease: 'power3.out',
      onUpdate: () => { el.textContent = fmt(state.v); },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}
