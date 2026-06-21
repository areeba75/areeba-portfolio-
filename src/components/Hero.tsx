import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { heroContainer, heroItem } from '../lib/animations'
import { profile, roleCycle } from '../data/portfolio'
import { useLenis } from '../providers/SmoothScrollProvider'
import { scrollToSection } from '../utils/scroll'
import { ResumeCard } from './ResumeCard'
import { ShimmerButton } from './ui/ShimmerButton'
import { Typewriter } from './ui/Typewriter'

export function Hero() {
  const lenis = useLenis()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--bg-primary)] px-6 pt-24 pb-14"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,47,144,0.08),transparent_18%),radial-gradient(circle_at_bottom,rgba(111,123,255,0.08),transparent_20%)]" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.p
            variants={heroItem}
            className="mb-4 text-lg text-[var(--color-text)] md:text-xl"
          >
            <motion.span
              className="mr-2 inline-block origin-[70%_70%]"
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              👋
            </motion.span>
            Hey, I&apos;m{' '}
            <span className="font-[family-name:var(--font-display)] font-bold">
              {profile.name}
            </span>
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="min-h-[1.2em] font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl"
          >
            <Typewriter words={roleCycle} className="text-[var(--accent)] font-extrabold" />
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ShimmerButton href={profile.resumeUrl} download="Areeba-Arshad-Resume.pdf" variant="primary">
              <Download size={18} />
              Download Resume
            </ShimmerButton>
            <ShimmerButton
              href="#projects"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects', lenis)
              }}
            >
              View Portfolio
            </ShimmerButton>
          </motion.div>
        </div>

        <motion.div variants={heroItem} className="flex justify-center lg:justify-end">
          <ResumeCard />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('about', lenis)
        }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
        aria-label="Scroll to about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
