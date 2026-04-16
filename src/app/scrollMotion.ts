/** Options de viewport communes pour les révélations au scroll */
export const inViewOptions = {
  once: true,
  amount: 0.22,
  margin: '0px 0px -12% 0px',
} as const;

/** Courbe type « expo out » — entrées fluides */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function revealTransition(delay = 0) {
  return { duration: 0.72, delay, ease: easeOutExpo };
}

/** Apparition type ressort — cartes / blocs vitrés */
export function springPop(delay = 0) {
  return {
    type: 'spring' as const,
    stiffness: 420,
    damping: 28,
    mass: 0.85,
    delay,
  };
}
