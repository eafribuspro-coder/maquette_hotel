import { useEffect, useState } from 'react'
import { photos } from '../assets/images'

const slides = [
  { image: photos.piscine1, alt: 'Grande piscine turquoise bordée de transats et de parasols' },
  { image: photos.restaurantPlage1, alt: 'Restaurant de plage sous les cocotiers aux troncs orange' },
  { image: photos.facade, alt: "Façade rose corail du bâtiment principal de l'hôtel" },
  { image: photos.piscine2, alt: 'Bassin en longueur au lever du jour' },
]

const INTERVAL_MS = 5000

/** Slider automatique plein écran du hero, transitions en fondu. */
export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <img
          key={slide.alt}
          src={slide.image}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === current ? 'animate-kenburns opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Overlay sombre léger */}
      <div className="absolute inset-0 bg-encre-900/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-encre-900/50 to-transparent" />

      {/* Indicateurs */}
      <div className="absolute bottom-36 left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:bottom-28">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`Aller à la photo ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current ? 'w-12 bg-or-300' : 'w-6 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
