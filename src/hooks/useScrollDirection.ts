import { useEffect, useState } from 'react'

export function useScrollDirection(threshold = 12) {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (Math.abs(y - lastY) < threshold) return
      setDirection(y > lastY ? 'down' : 'up')
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, scrolled, hidden: direction === 'down' && scrolled }
}
