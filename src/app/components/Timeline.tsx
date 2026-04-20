import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MeshGradient } from '@mesh-gradient/react';
import {
  ChevronLeft, ChevronRight,
  Sparkles, UserX, MessageSquare, AlertTriangle,
  Rocket, Brain, Image, Mic, Video,
} from 'lucide-react';
import content from '../content.json';
import { pageGutter } from '../glassStyles';
import { inViewOptions, springPop } from '../scrollMotion';
import SectionHeading from './SectionHeading';

const timelineIcons = {
  sparkles: Sparkles, userX: UserX, messageSquare: MessageSquare,
  alertTriangle: AlertTriangle, rocket: Rocket, brain: Brain,
  image: Image, mic: Mic, video: Video,
} as const;
type TimelineIconKey = keyof typeof timelineIcons;

interface TimelineEvent { year: string; title: string; description: string; Icon: React.ElementType; }
const events: TimelineEvent[] = content.timeline.events.map((ev) => ({
  year: ev.year,
  title: ev.title,
  description: ev.description,
  Icon: timelineIcons[ev.iconKey as TimelineIconKey],
}));

/* ── Mesh dark — même palette que le Hero ── */
const meshColors: [string, string, string, string] = ['#141c24', '#2a5f5f', '#354a72', '#6e5c45'];

/* ── Styles verre sombre ── */
const darkCard  = 'border border-white/[0.12] bg-white/[0.07] rounded-2xl shadow-[0_14px_56px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150';
const darkPanel = 'border border-white/[0.14] bg-white/[0.09] shadow-[0_2px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150';

/* ────────────────────────────────
   Constantes du cadran
──────────────────────────────── */
const N        = events.length;
const STEP     = 360 / N;
const D        = 300;
const CX       = D / 2;
const CY       = D / 2;
const R_TICK   = 120;
const R_PROG   = R_TICK + 18;
const R_CENTER = 40;
const CIRC     = 2 * Math.PI * R_PROG;

function progressDash(idx: number) {
  if (N <= 1) return CIRC;
  return CIRC * (1 - idx / (N - 1));
}

/* ────────────────────────────────
   Cadran SVG (couleurs inversées)
──────────────────────────────── */
function Dial({ activeIndex }: { activeIndex: number }) {
  const rotation = activeIndex * STEP;

  return (
    <div className="relative shrink-0" style={{ width: D, height: D }}>
      <svg width={D} height={D} viewBox={`0 0 ${D} ${D}`} overflow="visible" aria-hidden>

        {/* ── Anneaux fixes ── */}
        <circle cx={CX} cy={CY} r={R_PROG + 4}  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx={CX} cy={CY} r={R_PROG}       fill="none" stroke="rgba(255,255,255,0.1)"  strokeWidth="1" />
        <circle cx={CX} cy={CY} r={R_TICK - 28}  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

        {/* ── Arc de progression (fixe, démarre à 12h) ── */}
        <g transform={`rotate(-90 ${CX} ${CY})`}>
          <circle cx={CX} cy={CY} r={R_PROG} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
          <motion.circle
            cx={CX} cy={CY} r={R_PROG}
            fill="none"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            animate={{ strokeDashoffset: progressDash(activeIndex) }}
            transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.9 }}
          />
        </g>

        {/* ── Groupe rotatif ── */}
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.9 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {events.map((_, i) => {
            const angleDeg = -90 - i * STEP;
            const rad      = (angleDeg * Math.PI) / 180;
            const cos      = Math.cos(rad);
            const sin      = Math.sin(rad);
            const isActive = i === activeIndex;
            const tickLen  = isActive ? 26 : 13;

            return (
              <g key={i}>
                <line
                  x1={CX + (R_TICK - tickLen) * cos} y1={CY + (R_TICK - tickLen) * sin}
                  x2={CX + R_TICK * cos}             y2={CY + R_TICK * sin}
                  stroke={isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.22)'}
                  strokeWidth={isActive ? 3 : 1.2}
                  strokeLinecap="round"
                />
                <circle
                  cx={CX + (R_PROG - 1) * cos} cy={CY + (R_PROG - 1) * sin}
                  r={isActive ? 4.5 : 2.5}
                  fill={isActive ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.18)'}
                />
                <line
                  x1={CX + (R_CENTER + 4) * cos} y1={CY + (R_CENTER + 4) * sin}
                  x2={CX + (R_TICK - tickLen - 4) * cos} y2={CY + (R_TICK - tickLen - 4) * sin}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </motion.g>

        {/* ── Indicateur fixe ── */}
        <polygon
          points={`${CX - 5},${CY - R_PROG - 14}  ${CX + 5},${CY - R_PROG - 14}  ${CX},${CY - R_PROG - 2}`}
          fill="rgba(255,255,255,0.8)"
        />

        {/* ── Pastille centrale ── */}
        <circle cx={CX} cy={CY} r={R_CENTER} fill="rgba(0,0,0,0.45)" />
        <circle cx={CX} cy={CY} r={R_CENTER} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
      </svg>

      {/* Année au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={events[activeIndex].year}
            initial={{ opacity: 0, scale: 0.75, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-[1.35rem] font-black tracking-tight text-white/90"
          >
            {events[activeIndex].year}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ────────────────────────────────
   Section principale
──────────────────────────────── */
export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sectionTitle, sectionSubtitle } = content.timeline;
  const event   = events[activeIndex];
  const EventIcon = event.Icon;

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(N - 1, i + 1));

  return (
    <section id="chronologie" className="relative w-full scroll-mt-20 overflow-hidden py-20 text-white md:py-28">

      {/* ── Fond mesh sombre ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <MeshGradient
          className="h-full w-full"
          style={{ display: 'block' }}
          options={{
            colors: meshColors,
            seed: 12,
            animationSpeed: 0.28,
            frequency: { x: 0.00008, y: 0.00012, delta: 0.00004 },
            isStatic: false,
            pauseOnOutsideViewport: true,
            appearance: 'smooth',
            appearanceDuration: 900,
          }}
        />
        {/* Vignette bords */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_30%,rgba(5,8,12,0.55)_100%)]" />
      </div>

      <div className={`relative z-10 w-full ${pageGutter}`}>

        {/* ── Titre ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOptions}
          transition={springPop(0)}
          className="mb-12 md:mb-16"
        >
          <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} dark />
        </motion.div>

        {/* ── Cadran + contenu ── */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-16">

          {/* Cadran */}
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inViewOptions}
              transition={springPop(0.1)}
            >
              <Dial activeIndex={activeIndex} />
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                type="button" onClick={prev} disabled={activeIndex === 0}
                className={`${darkPanel} flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:scale-105 disabled:opacity-25`}
                aria-label="Précédent"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <span className="min-w-[4rem] text-center text-sm font-black tabular-nums text-white/45">
                {String(activeIndex + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(N).padStart(2, '0')}
              </span>
              <button
                type="button" onClick={next} disabled={activeIndex === N - 1}
                className={`${darkPanel} flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:scale-105 disabled:opacity-25`}
                aria-label="Suivant"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Carte de contenu */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`${darkCard} w-full flex-1 p-7 md:p-9`}
            >
              {/* Entête : numéro + icône */}
              <div className="mb-6 flex items-start gap-4">
                <span className="select-none text-7xl font-black leading-none text-white/[0.06]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm">
                  <EventIcon className="h-5 w-5" />
                </div>
              </div>

              {/* Année badge */}
              <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-3 py-0.5 text-xs font-black uppercase tracking-[0.14em] text-white/55">
                {event.year}
              </span>

              {/* Titre */}
              <h3 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-white/92 md:text-3xl">
                {event.title}
              </h3>

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed tracking-tight text-white/55">
                {event.description}
              </p>

              {/* Progression */}
              <div className="flex gap-1.5">
                {events.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Événement ${i + 1}`}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? 'bg-white/75 scale-y-125'
                        : i < activeIndex
                          ? 'bg-white/30'
                          : 'bg-white/12'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
