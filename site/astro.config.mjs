// @ts-check
import { defineConfig } from 'astro/config';

// Configuration de performance :
// - sortie 100 % statique (aucun serveur), HTML compressé
// - CSS inliné dans le <head> (pas de requête bloquante supplémentaire)
// - scripts Astro regroupés et minifiés ; GSAP est importé dynamiquement
//   (chunk séparé, chargé à l'idle et seulement si prefers-reduced-motion est désactivé)
export default defineConfig({
  site: 'https://probiodecode.fr',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
  vite: {
    build: {
      cssMinify: true,
      // Un chunk dédié à GSAP pour qu'il ne pèse jamais sur le premier rendu
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap';
          },
        },
      },
    },
  },
});
