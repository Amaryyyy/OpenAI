import React from 'react';
import { motion } from 'motion/react';
import { MeshGradient } from '@mesh-gradient/react';
import content from '../content.json';
import { pageGutter } from '../glassStyles';
import { inViewOptions, springPop } from '../scrollMotion';
import SectionHeading from './SectionHeading';

/* ── Logos produits depuis public/images ── */
const PRODUCT_LOGOS: Record<string, string> = {
  brain: '/images/gpt.png',
  image: '/images/dalle.png',
  mic:   '/images/whisper.png',
  video: '/images/sora.png',
};

/* ── Mesh très sombre, quasi noir ── */
const meshColors: [string, string, string, string] = ['#060608', '#0a1414', '#0b0f1a', '#110e06'];

/* Lueurs hover par carte */
const HOVER_GLOWS = [
  'radial-gradient(circle at 40% 25%, rgba(42,95,95,0.55) 0%, transparent 60%)',
  'radial-gradient(circle at 60% 25%, rgba(110,92,69,0.50) 0%, transparent 60%)',
  'radial-gradient(circle at 40% 25%, rgba(53,74,114,0.52) 0%, transparent 60%)',
  'radial-gradient(circle at 60% 25%, rgba(74,53,96,0.50) 0%, transparent 60%)',
];

interface Product { name: string; tagline: string; description: string; iconKey: string; year: string; }

/* ── Carte produit ── */
const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 52, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={inViewOptions}
    transition={springPop(index * 0.07)}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] cursor-default"
    style={{ minHeight: '34rem' }}
  >
    {/* Lueur hover */}
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      style={{ background: HOVER_GLOWS[index % HOVER_GLOWS.length] }}
      aria-hidden
    />
    {/* Anneau hover */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-white/20 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

    <div className="relative flex flex-1 flex-col p-7 md:p-8 lg:p-9">

      {/* Année */}
        <div className="flex justify-end">
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/38">
            {product.year}
          </span>
        </div>

        {/* Logo grand — remplit l'espace */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inViewOptions}
          transition={springPop(index * 0.07 + 0.06)}
          className="flex flex-1 items-center justify-center py-6"
        >
          {PRODUCT_LOGOS[product.iconKey] && (
            <img
              src={PRODUCT_LOGOS[product.iconKey]}
              alt={product.name}
              className="w-full max-w-[14rem] object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              style={{ maxHeight: '12rem' }}
            />
          )}
        </motion.div>

      {/* Titre grand + tagline */}
      <div className="mb-7">
        <h3 className="text-4xl font-black leading-[1.05] tracking-tight text-white/93 md:text-5xl xl:text-[3.25rem]">
          {product.name}
        </h3>
        <p className="mt-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/32">
          {product.tagline}
        </p>
      </div>

      {/* Séparateur */}
      <div className="mb-6 h-px w-full bg-white/[0.08] transition-colors duration-300 group-hover:bg-white/[0.15]" />

      {/* Description */}
      <p className="text-sm leading-relaxed tracking-tight text-white/50 md:text-[0.9375rem]">
        {product.description}
      </p>
    </div>
  </motion.article>
);

/* ── Section ── */
export default function Products() {
  const { sectionTitle, sectionSubtitle } = content.products;

  return (
    <section id="produits" className="relative w-full scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <MeshGradient
          className="h-full w-full"
          style={{ display: 'block' }}
          options={{
            colors: meshColors,
            seed: 42,
            animationSpeed: 0.18,
            frequency: { x: 0.00006, y: 0.0001, delta: 0.000035 },
            isStatic: false,
            pauseOnOutsideViewport: true,
            appearance: 'smooth',
            appearanceDuration: 1200,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_40%,rgba(2,3,5,0.6)_100%)]" />
      </div>

      <div className={`relative z-10 w-full ${pageGutter}`}>
        <div className="mb-12 md:mb-16">
          <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} dark />
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2 md:gap-5 xl:gap-6">
          {content.products.items.map((item, index) => (
            <ProductCard key={index} product={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
