import { motion, type Variants } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
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

const avatarVariants: Variants = {
  rest: { y: 0, opacity: 1 },
  hover: {
    y: 60,
    opacity: 0.12,
    transition: { duration: DURATION, ease: EASE },
  },
}

const buttonsVariants: Variants = {
  rest: {
    opacity: 0,
    y: 20,
    pointerEvents: 'none',
    transition: { duration: DURATION, ease: EASE },
  },
  hover: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: { duration: DURATION, ease: EASE },
  },
}

const DEFAULT_AVATAR = '/avatar-removebg-preview.png'

const cardSurface =
  'border border-[var(--border)] bg-[var(--bg-card)] shadow-xl transition-shadow duration-300 hover:shadow-[var(--accent-glow)]'

const downloadBtn =
  'bg-[var(--accent)] text-[var(--on-accent)] shadow-[var(--accent-glow)] hover:brightness-110'

const viewBtn = 'bg-white text-[#0f0f0f] hover:bg-zinc-100'

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

  const cardClass = `relative w-[280px] overflow-hidden rounded-3xl border ${cardSurface} sm:w-[300px] ${className}`

  const header = (
    <>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--accent)]">{subtitle}</p>
    </>
  )

  const buttons = (
    <div className="flex flex-col gap-3">
      <a
        href={resumeUrl}
        download="Areeba-Arshad-Resume.pdf"
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-colors ${downloadBtn}`}
      >
        <Download size={18} aria-hidden />
        Download
      </a>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${viewBtn}`}
      >
        <Eye size={18} aria-hidden />
        Let&apos;s View
      </a>
    </div>
  )

  if (reduced) {
    return (
      <article className={`${cardClass} p-6`}>
        {header}
        <div className="mt-6">{buttons}</div>
      </article>
    )
  }

  return (
    <motion.article
      className={cardClass}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      aria-label="Interactive resume card"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--accent-soft)] blur-2xl" />

      <div className="relative px-6 pt-6">{header}</div>

      <div className="relative mt-4 h-[220px] overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-[var(--accent-soft)] blur-2xl" />

        <motion.div
          className="absolute inset-x-6 bottom-6 z-10 flex flex-col gap-3"
          variants={buttonsVariants}
        >
          {buttons}
        </motion.div>

        <motion.img
          src={avatarSrc}
          alt=""
          role="presentation"
          variants={avatarVariants}
          className="pointer-events-none absolute bottom-0 left-1/2 h-[230px] w-[230px] -translate-x-1/2 object-contain object-bottom select-none drop-shadow-[0_10px_24px_rgba(247,37,133,0.2)]"
          draggable={false}
        />
      </div>
    </motion.article>
  )
}
