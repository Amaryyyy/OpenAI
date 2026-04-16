import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import content from '../content.json';
import { glassCard, pageGutter } from '../glassStyles';
import { revealTransition, springPop } from '../scrollMotion';

/** Viewport sans marge négative — pour les éléments en bas de page */
const footerViewport = { once: true, amount: 0.05 } as const;
import SectionHeading from './SectionHeading';

interface Resource { title: string; author: string; type: string; url: string; }
const resources: Resource[] = content.footer.resources;

const ResourceItem = ({ resource, index }: { resource: Resource; index: number }) => (
  <motion.a
    href={resource.url}
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={footerViewport}
    transition={springPop(index * 0.03)}
    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-black/[0.04]"
  >
    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-black/30 transition-colors group-hover:text-black/70" />
    <div className="min-w-0 flex-1">
      <span className="text-sm font-medium tracking-tight group-hover:text-black/80">{resource.title}</span>
      <span className="ml-2 text-xs tracking-tight text-black/38">{resource.author} · {resource.type}</span>
    </div>
  </motion.a>
);

export default function Footer() {
  const { sectionTitle, sectionSubtitle, copyright } = content.footer;
  return (
    <footer id="ressources" className="relative w-full scroll-mt-20 pb-16 pt-20 md:pb-20 md:pt-24">
      {/* Nuance teal bas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,rgba(42,95,95,0.06)_0%,transparent_70%)]" aria-hidden />

      <div className={`relative w-full ${pageGutter}`}>
        {/* Titre sans card */}
        <div className="mb-10 md:mb-12">
          <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} viewport={footerViewport} />
        </div>

        {/* Grille 2 colonnes sur grand écran */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={footerViewport}
          transition={springPop(0.05)}
          className={`${glassCard} overflow-hidden`}
        >
          <div className="grid divide-y divide-black/[0.05] md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="divide-y divide-black/[0.05] px-1 py-1">
              {resources.slice(0, Math.ceil(resources.length / 2)).map((r, i) => (
                <ResourceItem key={i} resource={r} index={i} />
              ))}
            </div>
            <div className="divide-y divide-black/[0.05] px-1 py-1">
              {resources.slice(Math.ceil(resources.length / 2)).map((r, i) => (
                <ResourceItem key={i} resource={r} index={i + Math.ceil(resources.length / 2)} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={footerViewport}
            transition={revealTransition(0.2)}
            className="border-t border-black/[0.05] bg-black/[0.015] px-5 py-5 text-center"
          >
            <p className="text-xs tracking-tight text-black/38">{copyright}</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
