import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ShimmerButtonProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
  download?: string
}

export function ShimmerButton({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  download,
}: ShimmerButtonProps) {
  const base =
    variant === 'primary'
      ? 'btn-shimmer btn-primary-filled'
      : 'btn-shimmer btn-ghost-outlined'

  return (
    <motion.a
      href={href}
      onClick={onClick}
      download={download}
      target={download ? undefined : href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${base} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.a>
  )
}
