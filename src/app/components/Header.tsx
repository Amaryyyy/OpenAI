import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import content from '../content.json';
import { glassPanel } from '../glassStyles';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logoAlt, nav: navItems } = content.header;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <motion.div
          layout
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:rounded-full md:px-5 md:py-2.5 ${glassPanel}`}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-1 py-0.5 transition-colors hover:bg-black/[0.04]"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
              alt={logoAlt}
              className="h-8 w-auto"
            />
          </motion.button>

          <motion.nav
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-3.5 py-2 text-sm tracking-tight text-black/65 transition-[background,color,box-shadow] hover:bg-black/[0.06] hover:text-black hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
              >
                {item.label}
              </button>
            ))}
          </motion.nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-black/75 transition-colors hover:bg-black/[0.06] md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </motion.div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className={`overflow-hidden md:hidden ${glassPanel} rounded-2xl`}
            >
              <div className="divide-y divide-black/[0.06] px-2 py-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full rounded-xl px-4 py-3.5 text-left text-sm tracking-tight text-black/70 transition-colors hover:bg-black/[0.05] hover:text-black"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
