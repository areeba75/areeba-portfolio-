import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Mail, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import { getGmailComposeLink } from '../utils/email'
import { LinkedInIcon } from './SocialIcons'

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

const options = [
  {
    label: 'WhatsApp',
    value: profile.phone,
    href: profile.whatsapp,
    bg: 'bg-[#25D366]',
    text: 'text-white',
    icon: WhatsAppIcon,
  },
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
