import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { fadeDown } from '../lib/animations'
import { navLinks } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useLenis } from '../providers/SmoothScrollProvider'
import { scrollToSection } from '../utils/scroll'
import { ContactModal } from './ContactModal'
import { ThemeToggle } from './ui/ThemeToggle'

const sectionIds = ['hero', ...navLinks.map((l) => l.id)]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const { scrolled, hidden } = useScrollDirection()
  const active = useActiveSection(sectionIds)
  const lenis = useLenis()

  const goTo = (id: string) => {
    scrollToSection(id, lenis)
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
      >
        <motion.div
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`transition-all duration-300 ${
            scrolled ? 'nav-scrolled py-3' : 'bg-transparent py-5'
          }`}
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
            <motion.button
              type="button"
              onClick={() => goTo('hero')}
              className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>A</span>
              <span className="text-[var(--color-accent)]">A</span>
            </motion.button>

            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => goTo(link.id)}
                      className={`group relative px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`nav-link-underline ${isActive ? 'active' : ''}`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <motion.button
                type="button"
                onClick={() => setContactOpen(true)}
                className="btn-shimmer btn-primary-filled !px-5 !py-2.5 !text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s Contact Me
                  <ArrowRight size={16} />
                </span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="text-[var(--color-text)]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass mx-4 mt-2 overflow-hidden rounded-2xl md:hidden"
              >
                <ul className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        type="button"
                        onClick={() => goTo(link.id)}
                        className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--color-surface)] ${
                          active === link.id
                            ? 'text-[var(--color-accent)]'
                            : 'text-[var(--color-muted)]'
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setContactOpen(true)
                        setMobileOpen(false)
                      }}
                      className="btn-shimmer btn-primary-filled mt-2 flex w-full items-center justify-center gap-2 !px-4 !py-3 !text-sm"
                    >
                      Let&apos;s Contact Me
                      <ArrowRight size={16} />
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
