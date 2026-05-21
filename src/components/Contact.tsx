import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { viewport } from '../lib/animations'
import { getGmailComposeLink } from '../utils/email'
import { AnimatedSection } from './AnimatedSection'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

const contactOptions = [
  {
    label: 'LinkedIn',
    value: profile.name,
    href: profile.linkedin,
    className: 'bg-[#0A66C2] text-white',
    icon: LinkedInIcon,
  },
  {
    label: 'Email',
    value: profile.email,
    href: getGmailComposeLink(),
    className:
      'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)]',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'areeba75',
    href: profile.github,
    className:
      'border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)]',
    icon: GitHubIcon,
  },
]

export function Contact() {
  return (
    <AnimatedSection id="contact">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Contact
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
          Let&apos;s Build Something
        </h2>
        <p className="mt-4 text-center text-[var(--text-muted)]">
          Open to frontend roles and freelance projects.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {contactOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-pill ${opt.className}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-xs opacity-80">{opt.label}</span>
                  <span className="block truncate font-medium">{opt.value}</span>
                </span>
                <ArrowRight size={20} className="shrink-0 opacity-70" />
              </a>
            )
          })}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
