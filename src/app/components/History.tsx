import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import content from '../content.json';
import { glassCard, pageGutter } from '../glassStyles';
import { inViewOptions, revealTransition, springPop } from '../scrollMotion';
import SectionHeading from './SectionHeading';

/* ── Carte texte + image ── */
const HistoryBlock = ({
  title,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  delay = 0,
  index = 0,
}: {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  delay?: number;
  index?: number;
}) => {
  const imagePositionClass =
    imageSrc.includes('/images/image2')
      ? 'object-[66%_center]'
      : imageSrc.includes('/images/image3')
        ? 'object-[36%_center]'
        : 'object-center';

  return (
  <motion.article
    initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={inViewOptions}
    transition={revealTransition(delay)}
    className={`${glassCard} overflow-hidden`}
  >
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

      {/* ── Image ── */}
      <div className="relative w-full shrink-0 md:flex md:w-[52%] md:items-stretch">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-full">
          <motion.div
            initial={{ scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={inViewOptions}
            transition={revealTransition(delay + 0.12)}
            className="h-full w-full"
          >
            <ImageWithFallback
              src={imageSrc}
              alt={imageAlt}
              className={`h-full w-full object-cover ${imagePositionClass} grayscale transition-all duration-700 hover:grayscale-0`}
            />
          </motion.div>

          {/* Numéro flottant sur l'image */}
          <span className="absolute left-4 top-4 select-none rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-xs font-black tracking-widest text-white/80 backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Texte ── */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewOptions}
        transition={springPop(delay + 0.08)}
        className="flex flex-1 flex-col justify-center p-7 md:p-9 lg:p-11"
      >
        <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight md:text-[1.65rem]">
          {title}
        </h3>
        <p className="whitespace-pre-line text-base leading-relaxed tracking-tight text-black/60 md:text-[1.0625rem]">
          {content}
        </p>
      </motion.div>
    </div>
  </motion.article>
  );
};

/* ── Séparateur de période ── */
const PeriodLabel = ({
  year,
  subtitle,
  delay,
}: {
  year: string;
  subtitle: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={inViewOptions}
    transition={revealTransition(delay)}
    className="flex items-center gap-3"
  >
    <div className="h-px w-8 shrink-0 bg-black/25" />
    <span className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-black/50">{year}</span>
    <span className="text-black/20">—</span>
    <span className="text-xs tracking-tight text-black/38">{subtitle}</span>
  </motion.div>
);

/* ── Section principale ── */
export default function History() {
  const { sectionTitle, sectionSubtitle, periods } = content.history;

  /* index global pour numéroter les blocs à la suite */
  let blockCounter = 0;

  return (
    <section id="histoire" className="relative w-full scroll-mt-20">
      {/* Nuance teal très légère */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_40%,rgba(42,95,95,0.06)_0%,transparent_70%)]" aria-hidden />

      {/* ── Titre ── */}
      <header className={`relative w-full border-b border-black/[0.06] ${pageGutter} pb-12 pt-14 md:pb-16 md:pt-20`}>
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
      </header>

      {/* ── Périodes ── */}
      <div className={`relative w-full ${pageGutter} py-14 md:py-20`}>
        <div className="flex flex-col gap-16 md:gap-20">
          {periods.map((period, periodIndex) => (
            <div key={periodIndex} className="flex flex-col gap-6 md:gap-8">
              <PeriodLabel
                year={period.headingYear}
                subtitle={period.headingSubtitle}
                delay={period.headingDelay * 0.4}
              />

              <div className="flex flex-col gap-5 md:gap-6">
                {period.blocks.map((block, blockIndex) => {
                  const idx = blockCounter++;
                  return (
                    <HistoryBlock
                      key={blockIndex}
                      title={block.title}
                      content={block.content}
                      imageSrc={block.imageSrc}
                      imageAlt={block.imageAlt}
                      reverse={block.reverse}
                      delay={block.delay * 0.5}
                      index={idx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
