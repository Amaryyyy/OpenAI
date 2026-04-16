import React from 'react';
import { motion } from 'motion/react';
import { inViewOptions, revealTransition } from '../scrollMotion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
  dark?: boolean;
  viewport?: Record<string, unknown>;
}

/** Vague SVG sous le titre */
const WaveRule = ({ delay, dark = false }: { delay: number; dark?: boolean }) => (
  <motion.svg
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={inViewOptions}
    transition={{ ...revealTransition(delay + 0.12), transformOrigin: 'left' }}
    viewBox="0 0 240 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-5 w-[min(60%,14rem)] overflow-visible"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      d="M2 12 C30 4, 60 16, 90 10 C120 4, 150 16, 180 10 C210 4, 228 14, 238 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={dark ? 'text-white/35' : 'text-black/30'}
    />
  </motion.svg>
);

export default function SectionHeading({
  title,
  subtitle,
  className = '',
  delay = 0,
  dark = false,
  viewport: viewportOverride,
}: SectionHeadingProps) {
  const vp = viewportOverride ?? inViewOptions;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={revealTransition(delay)}
      className={`${className}`}
    >
      <h2
        className={`text-5xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl xl:text-8xl ${dark ? 'text-white/95' : 'text-black/90'}`}
        style={{ fontFamily: "'Satoshi', sans-serif", letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      <WaveRule delay={delay} dark={dark} />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={revealTransition(delay + 0.2)}
          className={`mt-4 max-w-2xl text-base tracking-tight md:text-lg ${dark ? 'text-white/50' : 'text-black/55'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
