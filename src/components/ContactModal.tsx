import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Mail, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import { getGmailComposeLink } from '../utils/email'
import { LinkedInIcon } from './SocialIcons'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

const options = [
  {
    label: 'LinkedIn',
    value: profile.name,
    href: profile.linkedin,
    bg: 'bg-[#0A66C2]',
    text: 'text-white',
    icon: LinkedInIcon,
  },
  {
    label: 'Email',
    value: profile.email,
    href: getGmailComposeLink(),
    bg: 'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
    text: 'text-[var(--color-text)]',
    icon: Mail,
  },
]

export function ContactModal({ open, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-w-lg -translate-y-1/2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-2xl sm:inset-x-auto sm:w-full"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
                  Contact
                </p>
                <h2
                  id="contact-modal-title"
                  className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text)]"
                >
                  I&apos;m Just a Message Away
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[var(--color-muted)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {options.map((opt, i) => {
                const Icon = opt.icon
                return (
                  <motion.a
                    key={opt.label}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-pill ${opt.bg} ${opt.text}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <Icon size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs opacity-80">{opt.label}</span>
                      <span className="block font-medium">{opt.value}</span>
                    </span>
                    <ArrowRight size={20} className="opacity-70" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
