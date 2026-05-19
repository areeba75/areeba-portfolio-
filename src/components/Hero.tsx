import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin, Phone } from 'lucide-react'
import { heroContainer, heroItem } from '../lib/animations'
import { profile } from '../data/portfolio'
import { useLenis } from '../providers/SmoothScrollProvider'
import { getGmailComposeLink } from '../utils/email'
import { scrollToSection } from '../utils/scroll'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
import { GradientText } from './ui/GradientText'
import { MagneticButton } from './ui/MagneticButton'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Hero() {
  const lenis = useLenis()
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-24"
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.div variants={heroItem} className="mb-6 flex flex-wrap gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-[var(--color-muted)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Available for opportunities
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs text-[var(--color-muted)]">
              <MapPin size={12} className="text-rose-400" />
              {profile.location}
            </span>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-sky-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block text-white">Hi, I&apos;m</span>
            <GradientText className="mt-1 block text-5xl font-extrabold sm:text-6xl md:text-7xl">
              {profile.name}
            </GradientText>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-lg text-[var(--color-muted)] md:text-xl"
          >
            {profile.title} crafting{' '}
            <span className="text-white">scalable</span>,{' '}
            <span className="text-white">accessible</span>, and{' '}
            <span className="text-white">high-performance</span> interfaces
            that ship to production.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact', lenis)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-rose-500/30"
            >
              <Mail size={18} />
              Get in touch
            </MagneticButton>
            <MagneticButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects', lenis)
              }}
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white"
            >
              View projects
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-[var(--color-muted)]"
          >
            <a
              href={getGmailComposeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={16} className="text-rose-400" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone size={16} className="text-sky-400" />
              {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <LinkedInIcon size={16} />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={heroItem}
          className="relative mx-auto flex justify-center lg:mx-0"
        >
          <motion.div
            className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72"
            initial={reduced ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/30 via-transparent to-sky-500/30 blur-2xl"
              animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-[#1a1a28] to-[#0a0a12] shadow-2xl shadow-rose-500/10">
              <span className="font-[family-name:var(--font-display)] text-6xl font-bold text-white md:text-7xl">
                AA
              </span>
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent, rgba(244,63,94,0.4), transparent, rgba(56,189,248,0.3), transparent)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('about', lenis)
        }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-muted)] transition-colors hover:text-white"
        aria-label="Scroll to about"
        animate={reduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
