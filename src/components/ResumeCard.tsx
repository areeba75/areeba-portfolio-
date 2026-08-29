import { motion, useMotionTemplate, useMotionValue, type Variants } from 'framer-motion'
import { Download, Eye, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

const EASE = 'easeInOut' as const
const DURATION = 0.4

const cardVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: DURATION, ease: EASE },
  },
}

const photoVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.7, ease: EASE },
  },
}

const scrimVariants: Variants = {
  rest: { opacity: 0.6 },
  hover: {
    opacity: 0.94,
    transition: { duration: DURATION, ease: EASE },
  },
}

const buttonsVariants: Variants = {
  rest: {
    opacity: 0,
    y: 18,
    pointerEvents: 'none',
    transition: { duration: DURATION, ease: EASE },
  },
  hover: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: { duration: DURATION, ease: EASE, delay: 0.06 },
  },
}

const infoVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: DURATION, ease: EASE },
  },
}

const DEFAULT_AVATAR = '/linkedin.jpg'

const cardSurface =
  'shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:shadow-[0_30px_100px_rgba(247,37,133,0.28)]'

const downloadBtn =
  'bg-[var(--accent)] text-[var(--on-accent)] shadow-[var(--accent-glow)] hover:brightness-110 hover:-translate-y-0.5'

const viewBtn =
  'bg-white/[0.08] text-white border border-white/20 backdrop-blur-md hover:bg-white/[0.16] hover:-translate-y-0.5'

/** Mobile/touch screens skip hover-reveal — text & buttons stay pinned to the bottom instead. */
function useIsCompactViewport() {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    const update = () => setIsCompact(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isCompact
}

export interface ResumeCardProps {
  resumeUrl?: string
  title?: string
  subtitle?: string
  avatarSrc?: string
  className?: string
}

export function ResumeCard({
  resumeUrl = profile.resumeUrl,
  title = "Areeba's Resume",
  subtitle = profile.title,
  avatarSrc = DEFAULT_AVATAR,
  className = '',
}: ResumeCardProps) {
  const reduced = useReducedMotion()
  const isCompact = useIsCompactViewport()
  const staticLayout = reduced || isCompact

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glow = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(247,37,133,0.22), transparent 45%)`

  const outerClass = `relative w-[300px] sm:w-[320px] ${className}`

  const buttons = (
    <div className="flex flex-col gap-2.5">
      <a
        href={resumeUrl}
        download="Areeba_Arshad_Frontend-Developer(React).pdf"
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-all duration-300 ${downloadBtn}`}
      >
        <Download size={17} aria-hidden />
        Download
      </a>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${viewBtn}`}
      >
        <Eye size={17} aria-hidden />
        Let&apos;s View
      </a>
    </div>
  )

  const nameBlock = (
    <>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)] backdrop-blur-sm">
        <Sparkles size={11} aria-hidden />
        Available for hire
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-[26px] font-bold leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
        {title}
      </h3>
      <p className="mt-1 text-sm font-semibold tracking-wide text-[var(--accent)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
        {subtitle}
      </p>
    </>
  )

  const photoLayer = (
    <div className="relative h-[430px] w-full overflow-hidden rounded-[26px]">
      <motion.img
        src={avatarSrc}
        alt={profile.name}
        variants={staticLayout ? undefined : photoVariants}
        className="absolute inset-0 h-full w-full object-cover object-top select-none"
        draggable={false}
      />

      {/* base scrim — static & already dark enough at bottom on mobile so text needs no hover to read */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,12,0)_25%,rgba(10,8,12,0.6)_50%,rgba(8,6,10,0.97)_100%)]"
        variants={staticLayout ? undefined : scrimVariants}
        initial={staticLayout ? { opacity: 0.94 } : undefined}
        animate={staticLayout ? { opacity: 0.94 } : undefined}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />

      {/* text pinned to the true bottom edge — not pushed up by the buttons below */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-5 text-center"
        variants={staticLayout ? undefined : infoVariants}
      >
        {nameBlock}
      </motion.div>

      {/* buttons live in their own layer so they never reserve space above the text */}
      <motion.div
        className="absolute inset-x-0 bottom-[130px] px-6"
        variants={staticLayout ? undefined : buttonsVariants}
        initial={staticLayout ? { opacity: 1, y: 0 } : undefined}
        animate={staticLayout ? { opacity: 1, y: 0 } : undefined}
      >
        {buttons}
      </motion.div>
    </div>
  )

  if (staticLayout) {
    return (
      <div className={outerClass}>
        <div className="absolute -inset-[1.5px] rounded-[28px] bg-[linear-gradient(135deg,var(--accent),transparent_40%,transparent_60%,var(--accent))] opacity-60" />
        <article className={`relative rounded-[27px] bg-[var(--bg-primary)] p-[3px] ${cardSurface}`}>
          {photoLayer}
        </article>
      </div>
    )
  }

  return (
    <div className={outerClass}>
      {/* rotating gradient border frame */}
      <motion.div
        className="absolute -inset-[1.5px] rounded-[28px] opacity-70"
        style={{
          background:
            'conic-gradient(from 0deg, var(--accent), transparent 25%, transparent 50%, #6f7bff, transparent 75%, var(--accent))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <motion.article
        className={`group relative overflow-hidden rounded-[27px] bg-[var(--bg-primary)] p-[3px] ${cardSurface}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          mouseX.set(e.clientX - rect.left)
          mouseY.set(e.clientY - rect.top)
        }}
        aria-label="Interactive resume card"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        {photoLayer}
      </motion.article>
    </div>
  )
}