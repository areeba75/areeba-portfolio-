import Lenis from 'lenis'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

type Props = { children: ReactNode }

export function SmoothScrollProvider({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    setLenis(instance)

    let rafId = 0
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
