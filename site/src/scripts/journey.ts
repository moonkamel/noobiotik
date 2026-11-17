/**
 * Timeline « Voyage de la gélule » (skill gsap-scrolltrigger ; option Lottie via lottie-web).
 *
 * Plans (positions = journey.timings dans config.ts) :
 *   trajet     0    → organes + tracé, la gélule apparaît en haut
 *   obstacle   2,5  → bactéries « nues » tombent dans l'acide et pâlissent
 *   heros      5,5  → bouclier, traversée de l'acide, ondes sur le bouclier
 *   liberation 9    → la gélule s'ouvre, 9 souches s'échappent puis se rangent 4 / 4 / 1
 *   preuve     12,5 → badges + CTA (HTML)
 *   fin        13,5 → arrêt sur la dernière image
 *
 * Lecture unique déclenchée à l'entrée dans l'écran (ScrollTrigger, once).
 * Bouton Pause / Lecture / Revoir (WCAG 2.2.2). Pas de scrub, pas de barre de lecture.
 * Ne s'exécute jamais si prefers-reduced-motion: reduce (story.ts n'est pas chargé) :
 * le SVG reste alors sur sa dernière image, et tous les sous-titres sont affichés.
 */
import type { gsap as GSAP } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';
import { journey as cfg } from '../config';

const T = cfg.timings;

export function initJourney(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  const root = document.querySelector<HTMLElement>('[data-journey]');
  if (!root) return;

  const captions = [...root.querySelectorAll<HTMLElement>('[data-journey-captions] li')];
  const endItems = root.querySelectorAll<HTMLElement>('[data-journey-end-item]');
  const control = root.querySelector<HTMLButtonElement>('[data-journey-control]')!;
  const stage = root.querySelector<HTMLElement>('.journey__stage')!;

  const setCaption = (i: number) => captions.forEach((li, k) => li.classList.toggle('is-active', k === i));
  const showEnd = (visible: boolean, animate = true) =>
    animate
      ? gsap.fromTo(endItems, { autoAlpha: 0, y: 12 }, { autoAlpha: visible ? 1 : 0, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' })
      : gsap.set(endItems, { autoAlpha: visible ? 1 : 0, y: 0 });

  root.classList.add('is-animated');
  setCaption(0);

  if (root.dataset.lottie) return initLottie(root, gsap, ScrollTrigger, { setCaption, showEnd, control, stage });

  // ── Version SVG + GSAP ───────────────────────────────────────
  const q = (s: string) => root.querySelectorAll<SVGElement>(s);
  const organs = q('.j-organs');
  const guide = q('.j-guide');
  const capsule = q('.j-capsule');
  const shield = q('.j-shield');
  const top = q('.j-cap-top');
  const bottom = q('.j-cap-bottom');
  const naked = q('.j-naked-dot');
  const ripples = q('.j-ripple');
  const strains = [...q('.j-strain')];
  const halos = q('.j-halo');

  // Vagues : boucle continue indépendante, active seulement pendant la lecture
  const waves = gsap.timeline({ paused: true, repeat: -1 });
  q('.j-wave').forEach((w) => {
    waves.to(w, { x: -60, duration: Number((w as SVGElement).dataset.dur || 3), ease: 'none', repeat: -1 }, 0);
  });

  // Souches : départ au centre de la gélule, passage par un nuage, arrivée en 4 / 4 / 1
  const CX = 360, CY = 440;
  const fx = (el: Element) => Number((el as SVGElement).dataset.x);
  const fy = (el: Element) => Number((el as SVGElement).dataset.y);
  const cloud = strains.map((_, i) => {
    const a = (i / strains.length) * Math.PI * 2 - Math.PI / 2;
    const r = 62 + (i % 3) * 14;
    return { x: CX + Math.cos(a) * r * 1.6, y: CY + Math.sin(a) * r * 0.45 };
  });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
    onComplete: () => { waves.pause(); control.textContent = 'Revoir'; control.dataset.state = 'ended'; },
  });

  // 1 · Le trajet
  tl.addLabel('trajet', T.trajet)
    .call(setCaption, [0], 'trajet')
    .call(() => showEnd(false, false), [], 'trajet')
    .fromTo(organs, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.out' }, 'trajet')
    .fromTo(guide, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 1.8 }, 'trajet+=0.2')
    .fromTo(capsule, { y: -398, opacity: 0, scale: 0.8, transformOrigin: '50% 50%' }, { y: -398, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 'trajet+=0.6');
  // États de départ explicites (de = vers, durée quasi nulle) : réversibles et rejouables
  const init = (targets: gsap.TweenTarget, vars: gsap.TweenVars) => tl.fromTo(targets, vars, { ...vars, duration: 0.01 }, 'trajet');
  init(top, { x: 0, y: 0, rotation: 0, opacity: 1, transformOrigin: '50% 100%' });
  init(bottom, { x: 0, y: 0, rotation: 0, opacity: 1, transformOrigin: '50% 0%' });
  init(strains, { x: (_i: number, el: Element) => CX - fx(el), y: (_i: number, el: Element) => CY - fy(el), scale: 0.3, opacity: 0, transformOrigin: '50% 50%' });
  init(naked, { y: -190, opacity: 0, scale: 1, transformOrigin: '50% 50%' });
  init(shield, { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' });
  init(ripples, { opacity: 0, scale: 0.9, transformOrigin: '50% 50%' });

  tl
  // 2 · L'obstacle
    .addLabel('obstacle', T.obstacle)
    .call(setCaption, [1], 'obstacle')
    .to(naked, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.in', stagger: 0.12 }, 'obstacle+=0.1')
    .to(naked, { opacity: 0.15, scale: 0.6, duration: 1.2, stagger: 0.1, ease: 'sine.inOut' }, 'obstacle+=1.5')

  // 3 · Le héros
    .addLabel('heros', T.heros)
    .call(setCaption, [2], 'heros')
    .to(shield, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 'heros')
    .to(capsule, { y: -240, duration: 1.4 }, 'heros+=0.1')
    .fromTo(ripples, { opacity: 0.7, scale: 0.9, transformOrigin: '50% 50%' }, { opacity: 0, scale: 1.7, duration: 1.3, stagger: 0.4, ease: 'power1.out' }, 'heros+=1.2')
    .to(shield, { scale: 1.05, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'heros+=1.2')
    .to(capsule, { y: 0, duration: 1.5 }, 'heros+=2.1')
    .to(shield, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 'heros+=3.1')

  // 4 · La libération
    .addLabel('liberation', T.liberation)
    .call(setCaption, [3], 'liberation')
    .to(top, { x: -62, y: -6, rotation: -55, duration: 0.9, ease: 'power2.out' }, 'liberation+=0.3')
    .to(bottom, { x: 62, y: -6, rotation: 55, duration: 0.9, ease: 'power2.out' }, '<')
    .to(strains, { x: (i, el) => cloud[i].x - fx(el), y: (i, el) => cloud[i].y - fy(el), scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.04 }, 'liberation+=0.7')
    .to(strains, { x: 0, y: 0, duration: 1.3, stagger: 0.04 }, 'liberation+=1.9')
    .to([top, bottom], { opacity: 0.35, duration: 0.8, ease: 'power1.out' }, 'liberation+=1.9')
    .fromTo(halos, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.4, duration: 0.45, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.03 }, 'liberation+=3.2')

  // 5 · La preuve
    .addLabel('preuve', T.preuve)
    .call(() => showEnd(true), [], 'preuve')
    .addLabel('fin', T.fin)
    .set({}, {}, 'fin');

  // Image de départ (sans déclencher les callbacks)
  tl.progress(1, true).progress(0, true);
  setCaption(0);
  showEnd(false, false);

  // Déclenchement unique à l'entrée dans l'écran
  ScrollTrigger.create({
    trigger: stage, start: 'top 70%', once: true,
    onEnter: () => { control.hidden = false; tl.play(0); waves.play(); },
  });

  // Pause / Lecture / Revoir
  control.addEventListener('click', () => {
    if (control.dataset.state === 'ended') {
      control.dataset.state = ''; control.textContent = 'Pause';
      tl.restart(); waves.play();
    } else if (tl.paused()) {
      tl.play(); waves.play(); control.textContent = 'Pause';
    } else {
      tl.pause(); waves.pause(); control.textContent = 'Lecture';
    }
  });

  (root as any).__journey = tl;
  (root as any).__waves = waves; // utilisé par les captures de prévisualisation
}

/* ── Option Lottie : remplace le SVG si LOTTIE_JSON_PATH est renseigné ─────── */
function initLottie(
  root: HTMLElement,
  gsap: typeof GSAP,
  ScrollTrigger: typeof ST,
  ui: { setCaption: (i: number) => void; showEnd: (v: boolean, a?: boolean) => unknown; control: HTMLButtonElement; stage: HTMLElement },
) {
  const box = root.querySelector<HTMLElement>('[data-journey-lottie]')!;
  const poster = root.querySelector<SVGElement>('[data-journey-svg]')!;
  const marks = [T.trajet, T.obstacle, T.heros, T.liberation];
  ui.showEnd(false, false);

  // Chargement du lecteur + JSON seulement à 200 px de la section
  const io = new IntersectionObserver(async (entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    const { default: lottie } = await import('lottie-web/build/player/lottie_light');
    const anim = lottie.loadAnimation({ container: box, renderer: 'svg', loop: false, autoplay: false, path: root.dataset.lottie! });
    anim.addEventListener('DOMLoaded', () => {
      poster.style.visibility = 'hidden'; // le SVG statique sert d'affiche jusque-là
      box.setAttribute('role', 'img');
      box.removeAttribute('aria-hidden');
      box.setAttribute('aria-label', poster.getAttribute('aria-label') || '');
      ScrollTrigger.create({ trigger: ui.stage, start: 'top 70%', once: true, onEnter: () => { ui.control.hidden = false; anim.play(); } });
    });
    let shownEnd = false;
    anim.addEventListener('enterFrame', () => {
      const t = anim.currentFrame / anim.frameRate;
      let idx = 0;
      marks.forEach((m, i) => { if (t >= m) idx = i; });
      ui.setCaption(idx);
      if (!shownEnd && t >= T.preuve) { shownEnd = true; ui.showEnd(true); }
    });
    anim.addEventListener('complete', () => { ui.control.textContent = 'Revoir'; ui.control.dataset.state = 'ended'; });
    ui.control.addEventListener('click', () => {
      if (ui.control.dataset.state === 'ended') { ui.control.dataset.state = ''; ui.control.textContent = 'Pause'; anim.goToAndPlay(0, true); }
      else if ((anim as any).isPaused) { anim.play(); ui.control.textContent = 'Pause'; }
      else { anim.pause(); ui.control.textContent = 'Lecture'; }
    });
  }, { rootMargin: '200px 0px' });
  io.observe(root);
  void gsap;
}
