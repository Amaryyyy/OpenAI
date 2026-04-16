import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import content from '../content.json';
import { glassCard, glassPanel, pageGutter } from '../glassStyles';
import { inViewOptions, springPop } from '../scrollMotion';
import SectionHeading from './SectionHeading';

interface Person { name: string; role: string; bio: string; initial: string; imageSrc?: string; }
const people: Person[] = content.people.items;

const INITIALS_COLORS = [
  'from-[#2a5f5f]/90 to-[#1a3a3a]/95',
  'from-[#354a72]/90 to-[#1e2e4a]/95',
  'from-[#6e5c45]/90 to-[#3d3220]/95',
  'from-[#4a3560]/90 to-[#2a1e3a]/95',
];

/* ── Carte individuelle ── */
const PersonCard = ({
  person,
  index,
  isActive,
  onClick,
  mobileSnap = false,
}: {
  person: Person;
  index: number;
  isActive: boolean;
  onClick: () => void;
  mobileSnap?: boolean;
}) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={springPop(index * 0.07)}
    onClick={onClick}
    data-slide={mobileSnap ? true : undefined}
    className={[
      'relative flex flex-col overflow-hidden cursor-pointer',
      'transition-[opacity,transform] duration-500 ease-out',
      isActive ? 'opacity-100 scale-100' : 'opacity-45 scale-[0.96]',
      glassCard,
      mobileSnap ? 'w-[82vw] max-w-[360px] flex-none [scroll-snap-align:center]' : 'flex-1 min-w-0',
    ].join(' ')}
    style={{ minHeight: 460 }}
  >
    {/* Bandeau photo / couleur */}
    <div className={`relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br ${INITIALS_COLORS[index % INITIALS_COLORS.length]}`}>
      {person.imageSrc ? (
        <img
          src={person.imageSrc}
          alt={person.name}
          className="h-full w-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
        />
      ) : (
        <>
          <span className="pointer-events-none absolute select-none font-black text-white/10"
            style={{ fontSize: '8rem', lineHeight: 1, transform: 'translateY(18%)' }}>
            {person.initial}
          </span>
          <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/12 text-2xl font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-sm">
            {person.initial}
          </span>
        </>
      )}
      {/* Numéro toujours visible */}
      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/30 px-2 py-0.5 text-[0.6rem] font-black tracking-widest text-white/90 backdrop-blur-sm">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {/* Contenu */}
    <div className="flex flex-1 flex-col p-5 md:p-6">
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div key="active" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="flex flex-1 flex-col">
            <h3 className="text-xl font-bold tracking-tight">{person.name}</h3>
            <p className="mt-0.5 text-xs font-black uppercase tracking-widest text-black/40">{person.role}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed tracking-tight text-black/60">{person.bio}</p>
          </motion.div>
        ) : (
          <motion.div key="inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <h3 className="text-xl font-bold tracking-tight">{person.name}</h3>
            <p className="mt-0.5 text-xs font-black uppercase tracking-widest text-black/40">{person.role}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.article>
);

/* ── Section ── */
export default function People() {
  const { sectionTitle, sectionSubtitle } = content.people;
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Carrousel mobile ── */
  const mobileRef = useRef<HTMLDivElement>(null);

  /* Observer mobile uniquement */
  useEffect(() => {
    const container = mobileRef.current;
    if (!container) return;
    const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-slide]'));
    const ratios = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set(e.target as HTMLElement, e.intersectionRatio));
      let best = -1, bestRatio = 0;
      slides.forEach((slide, i) => {
        const r = ratios.get(slide) ?? 0;
        if (r > bestRatio) { bestRatio = r; best = i; }
      });
      if (best >= 0 && bestRatio > 0.3) setActiveIndex(best);
    }, { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] });
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Centrage mobile au montage */
  const scrollMobileTo = useCallback((idx: number, behavior: ScrollBehavior = 'smooth') => {
    const container = mobileRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>('[data-slide]')
      [Math.max(0, Math.min(idx, people.length - 1))]
      ?.scrollIntoView({ behavior, block: 'nearest', inline: 'center' });
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollMobileTo(0, 'instant'));
    return () => cancelAnimationFrame(id);
  }, [scrollMobileTo]);

  const prev = () => setActiveIndex((i) => {
    const next = Math.max(0, i - 1);
    scrollMobileTo(next);
    return next;
  });
  const next = () => setActiveIndex((i) => {
    const nx = Math.min(people.length - 1, i + 1);
    scrollMobileTo(nx);
    return nx;
  });

  return (
    <section id="acteurs" className="relative w-full scroll-mt-20 py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(74,53,96,0.06)_0%,transparent_70%)]" aria-hidden />

      {/* ── En-tête ── */}
      <div className={`relative ${pageGutter} mb-10 md:mb-14`}>
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
      </div>

      {/* ── Desktop : toutes les cartes côte à côte ── */}
      <div className={`hidden md:flex gap-5 ${pageGutter}`}>
        {people.map((person, i) => (
          <PersonCard
            key={i}
            person={person}
            index={i}
            isActive={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* ── Mobile : carousel horizontal ── */}
      <div
        ref={mobileRef}
        className="flex md:hidden w-full gap-4 overflow-x-auto [scrollbar-width:none] [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: 'calc(50% - 41vw)' }}
      >
        {people.map((person, i) => (
          <PersonCard
            key={i}
            person={person}
            index={i}
            isActive={i === activeIndex}
            onClick={() => { setActiveIndex(i); scrollMobileTo(i); }}
            mobileSnap
          />
        ))}
      </div>

      {/* ── Navigation ── */}
      <div className={`relative ${pageGutter} mt-7 flex items-center gap-4`}>
        <div className="flex gap-2">
          <button type="button" onClick={prev} disabled={activeIndex === 0}
            className={`${glassPanel} flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-105 disabled:opacity-25`}
            aria-label="Précédent">
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button type="button" onClick={next} disabled={activeIndex === people.length - 1}
            className={`${glassPanel} flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-105 disabled:opacity-25`}
            aria-label="Suivant">
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Points */}
        <div className="flex items-center gap-2">
          {people.map((_, i) => (
            <button key={i} type="button"
              onClick={() => { setActiveIndex(i); scrollMobileTo(i); }}
              aria-label={people[i].name}
              className="flex h-5 w-5 items-center justify-center">
              <span className={`block rounded-full transition-all duration-300 ${i === activeIndex ? 'h-2.5 w-2.5 bg-black/70' : 'h-1.5 w-1.5 bg-black/22 hover:bg-black/40'}`} />
            </button>
          ))}
        </div>

        <p className="ml-auto text-sm font-medium tabular-nums text-black/45">
          <span className="font-black text-black/70">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="mx-1 text-black/25">/</span>
          {String(people.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
}
