import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import content from '../content.json';
import { glassCard, pageGutter } from '../glassStyles';
import { inViewOptions, revealTransition } from '../scrollMotion';
import SectionHeading from './SectionHeading';

export default function Summary() {
  const { sectionTitle, sectionSubtitle, highlights, keyFigures } = content.summary;

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

        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={inViewOptions}
              transition={revealTransition(0.08 + index * 0.08)}
              className={`${glassCard} p-6 md:p-7`}
            >
              <h3 className="mb-2 text-xl font-black tracking-tight text-black/90">{item.title}</h3>
              <p className="text-sm leading-relaxed tracking-tight text-black/60 md:text-base">{item.description}</p>
            </motion.article>
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
