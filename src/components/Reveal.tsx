import { useEffect, useRef, useState, type ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  /** Délai en ms avant l'apparition, pour décaler les éléments d'une même rangée. */
  delay?: number
  /** Sens d'où provient l'élément. */
  direction?: Direction
  className?: string
}

const hiddenByDirection: Record<Direction, string> = {
  up: 'translate-y-10 opacity-0',
  left: '-translate-x-10 opacity-0',
  right: 'translate-x-10 opacity-0',
  none: 'opacity-0',
}

/** Apparition douce (fondu + translation) au premier passage dans le viewport. */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'translate-x-0 translate-y-0 opacity-100' : hiddenByDirection[direction]
      } ${className}`}
    >
      {children}
    </div>
  )
}
