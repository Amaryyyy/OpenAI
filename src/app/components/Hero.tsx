import { motion } from 'motion/react';
import { MeshGradient } from '@mesh-gradient/react';
import content from '../content.json';

/** Teal / bleu / bronze — tons un peu relevés pour que le mouvement WebGL se lise bien sur l’écran */
const meshColors: [string, string, string, string] = [
  '#141c24',
  '#2a5f5f',
  '#354a72',
  '#6e5c45',
];

export default function Hero() {
  const { title, subtitle } = content.hero;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <MeshGradient
          className="h-full w-full min-h-full opacity-100 [image-rendering:high-quality]"
          style={{ display: 'block' }}
          options={{
            colors: meshColors,
            seed: 7,
            animationSpeed: 0.42,
            frequency: { x: 0.00007, y: 0.00013, delta: 0.000045 },
            isStatic: false,
            pauseOnOutsideViewport: true,
            appearance: 'smooth',
            appearanceDuration: 900,
          }}
        />

        {/* Assombrissement léger des bords uniquement — pas de grain SVG (évite l’effet pixelisé) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_42%,transparent_25%,rgba(5,8,12,0.45)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-5xl font-black uppercase text-white md:text-7xl lg:text-8xl [text-shadow:0_2px_48px_rgba(0,0,0,0.45)]"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed tracking-tight text-amber-100/80 md:text-xl [text-shadow:0_1px_28px_rgba(0,0,0,0.4)]"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
