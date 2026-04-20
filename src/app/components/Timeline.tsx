import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MeshGradient } from '@mesh-gradient/react';
import {
  Sparkles, UserX, MessageSquare, AlertTriangle,
  Rocket, Brain, Image, Mic, Video,
} from 'lucide-react';
import content from '../content.json';
import { pageGutter } from '../glassStyles';
import { inViewOptions, springPop } from '../scrollMotion';
import SectionHeading from './SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

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
  Icon: timelineIcons[ev.iconKey as TimelineIconKey] ?? Sparkles,
}));

/* ── Mesh dark — même palette que le Hero ── */
const meshColors: [string, string, string, string] = ['#141c24', '#2a5f5f', '#354a72', '#6e5c45'];

/* ── Styles verre sombre ── */
const darkCard = 'rounded-2xl border border-white/[0.12] bg-white/[0.07] shadow-[0_14px_56px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150';
const darkPanel = 'rounded-xl border border-white/[0.14] bg-white/[0.09] shadow-[0_2px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150';

interface TimelinePhase {
  id: string;
  label: string;
  year: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  items: TimelineEvent[];
}

function isMainSection(title: string) {
  return /^[IVXLCDM]+\./.test(title.trim());
}

function getMainLabel(title: string) {
  const match = title.trim().match(/^([IVXLCDM]+\.)/);
  return match ? match[1] : 'Phase';
}

function buildPhases(data: TimelineEvent[]): TimelinePhase[] {
  const phases: TimelinePhase[] = [];
  let current: TimelinePhase | null = null;

  data.forEach((event, index) => {
    if (isMainSection(event.title)) {
      const phase: TimelinePhase = {
        id: `phase-${index}`,
        label: getMainLabel(event.title),
        year: event.year,
        title: event.title,
        description: event.description,
        Icon: event.Icon,
        items: [],
      };
      phases.push(phase);
      current = phase;
      return;
    }

    if (!current) {
      const fallback: TimelinePhase = {
        id: `phase-fallback-${index}`,
        label: 'Phase',
        year: event.year,
        title: 'Phase non classée',
        description: 'Éléments complémentaires de la chronologie.',
        Icon: event.Icon,
        items: [event],
      };
      phases.push(fallback);
      current = fallback;
      return;
    }

    current.items.push(event);
  });

  return phases;
}

/* ────────────────────────────────
   Section principale
──────────────────────────────── */
export default function Timeline() {
  const phases = useMemo(() => buildPhases(events), []);
  const [activePhase, setActivePhase] = useState(phases[0]?.id ?? '');
  const { sectionTitle, sectionSubtitle } = content.timeline;
  const currentPhase = phases.find((phase) => phase.id === activePhase) ?? phases[0];

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

        <Tabs value={currentPhase?.id ?? ''} onValueChange={setActivePhase} className="w-full gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOptions}
            transition={springPop(0.08)}
            className="overflow-x-auto pb-2"
          >
            <TabsList className={`${darkPanel} h-auto w-max min-w-full gap-2 rounded-2xl bg-white/[0.08] p-2 md:min-w-0`}>
              {phases.map((phase) => (
                <TabsTrigger
                  key={phase.id}
                  value={phase.id}
                  className="group min-w-[170px] rounded-xl border border-white/10 bg-transparent px-4 py-3 text-left text-white/75 data-[state=active]:border-white/25 data-[state=active]:bg-white/15 data-[state=active]:text-white"
                >
                  <span className="block text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45 group-data-[state=active]:text-white/65">
                    {phase.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-tight">{phase.year}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {phases.map((phase, phaseIndex) => {
            const PhaseIcon = phase.Icon;
            return (
              <TabsContent key={phase.id} value={phase.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOptions}
                  transition={springPop(0.12)}
                  className={`${darkCard} p-5 md:p-8`}
                >
                  <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/65">
                        {phase.year}
                      </span>
                      <h3 className="max-w-3xl text-xl font-bold leading-tight tracking-tight text-white/95 md:text-2xl">
                        {phase.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 md:text-base">
                        {phase.description}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm">
                      <PhaseIcon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="relative pl-4 md:pl-6">
                    <div className="pointer-events-none absolute bottom-2 left-[6px] top-2 w-px bg-gradient-to-b from-white/35 via-white/20 to-transparent md:left-[10px]" />

                    <Accordion type="single" collapsible defaultValue={phase.items[0] ? `${phase.id}-item-0` : undefined} className="space-y-3">
                      {phase.items.map((item, itemIndex) => {
                        const ItemIcon = item.Icon;
                        return (
                          <AccordionItem
                            key={`${phase.id}-${itemIndex}`}
                            value={`${phase.id}-item-${itemIndex}`}
                            className="relative overflow-hidden rounded-xl border border-white/14 bg-black/20 px-4 last:border-white/14 md:px-5"
                          >
                            <span className="pointer-events-none absolute left-[-14px] top-7 h-2.5 w-2.5 rounded-full border border-white/35 bg-white/80 md:left-[-16px]" />
                            <AccordionTrigger className="py-4 text-white hover:no-underline">
                              <div className="flex w-full items-start gap-3 pr-3 text-left">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.09] text-white/80">
                                  <ItemIcon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="mb-1 inline-flex rounded-full border border-white/12 bg-white/[0.08] px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white/55">
                                    {item.year}
                                  </span>
                                  <p className="text-sm font-semibold leading-snug text-white/90 md:text-[0.95rem]">
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-1 text-sm leading-relaxed text-white/68">
                              {item.description}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[0.13em] text-white/45">
                    <span>{phase.items.length} sous-partie{phase.items.length > 1 ? 's' : ''}</span>
                    <span>Phase {phaseIndex + 1} / {phases.length}</span>
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
