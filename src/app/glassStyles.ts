/** Gouttière page — pleine largeur avec marges latérales */
export const pageGutter = 'px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20';

/**
 * Base « verre liquide » — opaque à ~55 % pour rester lisible
 * sur le fond teinté des blobs. Flou fort + saturation + reflets.
 */
export const glassPanel =
  'border border-white/75 bg-white/55 shadow-[0_8px_40px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.95)_inset,inset_0_-1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-[1.6] supports-[backdrop-filter]:bg-white/50';

/** Carte — même base + coins arrondis + ombre plus marquée */
export const glassCard =
  'border border-white/75 bg-white/55 rounded-2xl shadow-[0_14px_56px_rgba(0,0,0,0.09),0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-2xl backdrop-saturate-[1.6] supports-[backdrop-filter]:bg-white/50';
