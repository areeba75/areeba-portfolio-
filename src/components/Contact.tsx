import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { fadeUp, staggerContainer, staggerItem, viewport } from '../lib/animations'
import { copyEmailToClipboard, getGmailComposeLink } from '../utils/email'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
const links = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: getGmailComposeLink(),
    external: true,
    color: 'text-rose-400',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    external: false,
    color: 'text-sky-400',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'areeba75',
    href: profile.github,
    external: true,
    color: 'text-white',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'Connect',
    href: profile.linkedin,
    external: true,
    color: 'text-sky-300',
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await copyEmailToClipboard()
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const message = data.get('message') as string
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(message)
    window.setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`,
        '_blank',
      )
      setLoading(false)
      setSent(true)
      window.setTimeout(() => setSent(false), 3000)
    }, 800)
  }

  return (
    <AnimatedSection id="contact" className="px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Let's build something great"
          description="Open to frontend roles, freelance projects, and collaborations."
        />

        <motion.div
          className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/10 via-transparent to-sky-500/10 p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <motion.div
            className="grid gap-10 lg:grid-cols-2"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div variants={staggerItem}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs uppercase tracking-wider text-[var(--color-muted)]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="input-premium"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-wider text-[var(--color-muted)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-premium"
                    placeholder="you@email.com"
                  />
                </div>
                <motion.div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs uppercase tracking-wider text-[var(--color-muted)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="input-premium resize-none"
                    placeholder="Tell me about your project or role..."
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-[var(--color-surface)] disabled:opacity-70"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {loading ? 'Sending...' : sent ? 'Opening email...' : 'Send message'}
                </motion.button>
              </form>

              <p className="mt-4 flex flex-wrap items-center gap-x-1 text-xs text-[var(--color-muted)]">
                <span>{profile.email}</span>
                <span className="relative inline-flex">
                  <button
                    type="button"
                    onClick={() => void handleCopyEmail()}
                    className="text-rose-400 hover:underline"
                  >
                    Copy
                  </button>
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[var(--color-surface-elevated)] px-2 py-1 text-[10px] text-white"
                      >
                        Copied
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="grid gap-4 sm:grid-cols-2"
            >
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="glass flex flex-col gap-3 rounded-xl p-5"
                    whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <Icon size={22} className={link.color} />
                    <motion.div>
                      <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
                        {link.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">
                        {link.value}
                      </p>
                    </motion.div>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
