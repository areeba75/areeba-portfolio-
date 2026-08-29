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
  rest: { opacity: 0.55 },
  hover: {
    opacity: 0.92,
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

const viewBtnSolid = 'bg-white text-[#0f0f0f] hover:bg-zinc-100'

/** Touch/small screens get a plain stacked layout — no hover-reveal, nothing overlapping the photo. */
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

  const badge = (
    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
      <Sparkles size={11} aria-hidden />
      Open to opportunities
    </div>
  )

  // ---------- MOBILE / REDUCED-MOTION: plain stacked card, nothing overlapping ----------
  if (staticLayout) {
    return (
      <div className={outerClass}>
        <div className="absolute -inset-[1.5px] rounded-[28px] bg-[linear-gradient(135deg,var(--accent),transparent_40%,transparent_60%,var(--accent))] opacity-60" />
        <article className={`relative overflow-hidden rounded-[27px] bg-[var(--bg-primary)] p-[3px] ${cardSurface}`}>
          <div className="overflow-hidden rounded-[24px]">
            <div className="relative h-[260px] w-full">
              <img
                src={avatarSrc}
                alt={profile.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,12,0)_55%,rgba(8,6,10,0.9)_100%)]" />
            </div>

            <div className="bg-[var(--bg-primary)] px-6 pb-6 pt-4 text-center">
              {badge}
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="mt-1 text-sm font-semibold tracking-wide text-[var(--accent)]">
                {subtitle}
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={resumeUrl}
                  download="Areeba_Arshad_Frontend-Developer(React).pdf"
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-colors ${downloadBtn}`}
                >
                  <Download size={17} aria-hidden />
                  Download
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${viewBtnSolid}`}
                >
                  <Eye size={17} aria-hidden />
                  Let&apos;s View
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }

  // ---------- DESKTOP: full-bleed photo, hover reveals buttons via a height collapse (no fixed offsets) ----------
  return (
    <div className={outerClass}>
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

        <div className="relative h-[430px] w-full overflow-hidden rounded-[26px]">
          <motion.img
            src={avatarSrc}
            alt={profile.name}
            variants={photoVariants}
            className="absolute inset-0 h-full w-full object-cover object-top select-none"
            draggable={false}
          />

          <motion.div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,12,0)_30%,rgba(10,8,12,0.6)_58%,rgba(8,6,10,0.97)_100%)]"
            variants={scrimVariants}
          />

          <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />

          {/* text always sits flush at the bottom — buttons below it collapse to zero height at rest,
              so they never push the text up, and expand on hover via a pure CSS grid-rows transition */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-6 text-center">
            {badge}
            <h3 className="font-[family-name:var(--font-display)] text-[26px] font-bold leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              {title}
            </h3>
            <p className="mt-1 text-sm font-semibold tracking-wide text-[var(--accent)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>

            <div className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-hover:mt-4 group-hover:grid-rows-[1fr]">
              <div className="flex flex-col gap-2.5 overflow-hidden">
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
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}