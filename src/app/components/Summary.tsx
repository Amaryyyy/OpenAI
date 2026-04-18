import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import content from '../content.json';
import { glassCard, pageGutter } from '../glassStyles';
import { inViewOptions, revealTransition } from '../scrollMotion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SectionHeading from './SectionHeading';

const SummaryBlock = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  index = 0,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  index?: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={inViewOptions}
    transition={revealTransition(0.08 + index * 0.08)}
    className={`${glassCard} overflow-hidden`}
  >
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className="relative w-full shrink-0 md:w-[42%]">
        <div className="relative aspect-[4/3] h-full w-full overflow-hidden md:min-h-[16rem]">
          <ImageWithFallback
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
          <span className="absolute left-4 top-4 select-none rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-xs font-black tracking-widest text-white/80 backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-7 md:p-9 lg:p-11">
        <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight md:text-[1.65rem]">
          {title}
        </h3>
        <p className="text-base leading-relaxed tracking-tight text-black/60 md:text-[1.0625rem]">
          {description}
        </p>
      </div>
    </div>
  </motion.article>
);

export default function Summary() {
  const { sectionTitle, sectionSubtitle, problemStatement, highlights, keyFigures } = content.summary;

  return (
    <section id="presentation-synthetique" className="relative w-full scroll-mt-20 overflow-hidden py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_15%,rgba(110,92,69,0.12)_0%,transparent_72%)]"
        aria-hidden
      />

      <div className={`relative z-10 w-full ${pageGutter}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOptions}
          transition={revealTransition(0)}
          className="mb-10 md:mb-12"
        >
          <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={inViewOptions}
          transition={revealTransition(0.05)}
          className={`${glassCard} mb-6 border-black/10 bg-white/70 p-6 md:mb-7 md:p-8`}
        >
          <span className="mb-3 inline-flex rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-black/55">
            Problématique
          </span>
          <p className="text-lg leading-relaxed tracking-tight text-black/75 md:text-2xl md:leading-snug">
            {problemStatement}
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 md:gap-6">
          {highlights.map((item, index) => (
            <SummaryBlock
              key={item.title}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              reverse={index % 2 === 1}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={inViewOptions}
          transition={revealTransition(0.22)}
          className={`${glassCard} mt-6 p-6 md:mt-7 md:p-8`}
        >
          <h3 className="mb-4 text-lg font-black uppercase tracking-[0.08em] text-black/65 md:text-xl">
            Chiffres repères
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            {keyFigures.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white/40 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black/60" />
                <p className="text-sm leading-relaxed tracking-tight text-black/70 md:text-[0.95rem]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
