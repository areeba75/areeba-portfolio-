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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--bg-primary)] px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,47,144,0.08),transparent_18%),radial-gradient(circle_at_bottom,rgba(111,123,255,0.08),transparent_20%)]" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_auto] lg:gap-12"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="min-w-0 text-center lg:text-left">
          <motion.p
            variants={heroItem}
            className="mb-4 text-base text-[var(--color-text)] sm:text-lg md:text-xl"
          >
            <motion.span
              className="mr-2 inline-block origin-[70%_70%] italic"
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
            className="md:min-h-[1.2em] break-words font-[family-name:var(--font-display)] text-xl md:text-3xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl"
          >
            <Typewriter
              words={roleCycle}
              className="text-[var(--accent)] font-extrabold"
            />
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base md:text-lg lg:mx-0"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
          >
            <ShimmerButton
              href={profile.resumeUrl}
              download="Areeba-Arshad-Resume.pdf"
              variant="primary"
            >
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

        <motion.div
          variants={heroItem}
          className="flex w-full justify-center lg:w-auto lg:justify-end"
        >
          <ResumeCard />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('about', lenis)
        }}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] sm:bottom-8"
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