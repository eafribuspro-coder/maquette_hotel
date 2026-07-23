import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const items = [
  { image: photos.piscine1, legende: 'La grande piscine et ses parasols' },
  { image: photos.restaurantPlage1, legende: 'Le restaurant, les pieds dans le sable' },
  { image: photos.facade, legende: 'La façade corail du bâtiment principal' },
  { image: photos.jeuxEnfants, legende: "L'aire de jeux aquatique des enfants" },
  { image: photos.piscine2, legende: 'Le bassin en longueur au petit matin' },
  { image: photos.restaurantPlage2, legende: 'La paillote du restaurant face à la mer' },
]

export default function Galerie() {
  const [index, setIndex] = useState<number | null>(null)

  const fermer = useCallback(() => setIndex(null), [])
  const precedent = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [],
  )
  const suivant = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [],
  )

  // Navigation au clavier dans la lightbox
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fermer()
      if (e.key === 'ArrowLeft') precedent()
      if (e.key === 'ArrowRight') suivant()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, fermer, precedent, suivant])

  return (
    <>
      <Seo
        title="Galerie photos — Nourable Hotel"
        description="Découvrez le Nourable Hotel en images : piscines turquoise, restaurant de plage, façade corail, aire de jeux aquatique et plage privée."
      />
      <PageHero
        image={photos.restaurantPlage2}
        surtitle="En images"
        title="Galerie"
        subtitle="Plongez dans l'univers du Nourable, entre corail, terracotta et turquoise."
      />

      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle surtitle="Nos plus beaux instants" title="L'hôtel en photos" />
          </Reveal>

          {/* Grille masonry */}
          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5">
            {items.map((item, i) => (
              <Reveal key={item.legende} delay={(i % 3) * 80}>
                <figure
                  className="group cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-lg"
                  onClick={() => setIndex(i)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.legende}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'
                      }`}
                    />
                  </div>
                  <figcaption className="bg-white px-5 py-4 text-sm font-medium text-encre-900">
                    {item.legende}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-encre-900/95 p-4"
          role="dialog"
          aria-label={items[index].legende}
          onClick={fermer}
        >
          <button
            type="button"
            aria-label="Fermer la visionneuse"
            onClick={fermer}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => {
              e.stopPropagation()
              precedent()
            }}
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => {
              e.stopPropagation()
              suivant()
            }}
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[index].image}
              alt={items[index].legende}
              className="max-h-[78vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/85">
              {items[index].legende}
              <span className="ml-3 text-white/50">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
