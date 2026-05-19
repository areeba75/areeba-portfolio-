import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { fadeDown } from '../lib/animations'
import { navLinks } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useLenis } from '../providers/SmoothScrollProvider'
import { getGmailComposeLink } from '../utils/email'
import { scrollToSection } from '../utils/scroll'

const HIRE_SUBJECT = 'Job Opportunity - Areeba Arshad'
const sectionIds = ['hero', ...navLinks.map((l) => l.id)]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrolled, hidden } = useScrollDirection()
  const active = useActiveSection(sectionIds)
  const lenis = useLenis()
  const hireMeHref = getGmailComposeLink(HIRE_SUBJECT)

  const goTo = (id: string) => {
    scrollToSection(id, lenis)
    setMobileOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      initial="hidden"
      animate="visible"
      variants={fadeDown}
    >
      <motion.div
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-colors duration-300 ${
          scrolled ? 'glass py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <motion.button
            type="button"
            onClick={() => goTo('hero')}
            className="font-[family-name:var(--font-display)] text-lg font-bold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            AA<span className="text-rose-400">.</span>
          </motion.button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="group relative px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:text-white"
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-4 right-4 h-px bg-rose-400"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                      style={{ originX: 0.5 }}
                    />
                    <span className="absolute bottom-0 left-4 right-4 h-px scale-x-0 bg-white/30 transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </li>
              )
            })}
          </ul>

          <a
            href={hireMeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-rose-500/25 transition hover:bg-rose-400 md:inline-block"
          >
            Hire Me
          </a>

          <button
            type="button"
            className="text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-white/5 ${
                        active === link.id
                          ? 'text-rose-400'
                          : 'text-[var(--color-muted)]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href={hireMeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block rounded-full bg-rose-500 px-4 py-3 text-center text-sm font-medium text-white"
                  >
                    Hire Me
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}
