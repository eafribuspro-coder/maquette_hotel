import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Valeur finale du compteur. */
  end: number
  /** Suffixe affiché après le nombre (ex. " m"). */
  suffix?: string
  duration?: number
  className?: string
}

/** Compteur qui défile de 0 à `end` lorsqu'il entre dans le viewport. */
export default function CountUp({ end, suffix = '', duration = 1800, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          // easeOutCubic pour un ralenti élégant en fin de course
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(end * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
