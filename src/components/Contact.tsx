import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { getGmailComposeLink } from '../utils/email'
import { AnimatedSection } from './AnimatedSection'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const contactOptions = [
  {
    label: 'WhatsApp',
    value: profile.phone,
    href: profile.whatsapp,
    className: 'bg-[#25D366] text-white',
    icon: WhatsAppIcon,
  },
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
    className: 'border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)]',
    icon: Mail,
  },
]

export function Contact() {
  return (
    <AnimatedSection id="contact">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.1)}
      >
        <motion.p
          variants={staggerItem}
          className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]"
        >
          Contact
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-text)] md:text-5xl"
        >
          Let&apos;s Build Something
        </motion.h2>
        <motion.p variants={staggerItem} className="mt-4 text-[var(--color-muted)]">
          Open to frontend roles and freelance projects.
        </motion.p>

        <motion.h3
          variants={staggerItem}
          className="mt-10 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-text)] md:text-2xl"
        >
          I&apos;m Just a Message Away
        </motion.h3>

        <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-3">
          {contactOptions.map((opt, i) => {
            const Icon = opt.icon
            return (
              <motion.a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-pill ${opt.className}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, x: 6 }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Icon size={20} />
                </span>
                <span className="flex-1 text-left">
                  <span className="block text-xs opacity-80">{opt.label}</span>
                  <span className="block font-medium">{opt.value}</span>
                </span>
                <ArrowRight size={20} className="opacity-70" />
              </motion.a>
            )
          })}
        </motion.div>

        <motion.a
          variants={staggerItem}
          href={getGmailComposeLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-email-large mt-12 inline-block"
        >
          {profile.email}
        </motion.a>

        <motion.div variants={staggerItem} className="mt-8 flex justify-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition hover:border-[#0A66C2] hover:text-[#0A66C2]"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition hover:border-[#25D366] hover:text-[#25D366]"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={20} />
          </a>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
