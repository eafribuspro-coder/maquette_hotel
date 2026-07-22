import { useState } from 'react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

type Categorie = 'Tout' | 'Restaurant' | 'Piscines' | 'Hôtel'

const items: { image: string; legende: string; categorie: Exclude<Categorie, 'Tout'> }[] = [
  { image: photos.restaurantPlage1, legende: 'Le restaurant, les pieds dans le sable', categorie: 'Restaurant' },
  { image: photos.piscine1, legende: 'La Grande Piscine et ses parasols', categorie: 'Piscines' },
  { image: photos.facade, legende: 'La façade corail du bâtiment principal', categorie: 'Hôtel' },
  { image: photos.piscine2, legende: 'Le Bassin Lagune au petit matin', categorie: 'Piscines' },
  { image: photos.restaurantPlage2, legende: 'La galerie du restaurant face à la mer', categorie: 'Restaurant' },
]

const categories: Categorie[] = ['Tout', 'Restaurant', 'Piscines', 'Hôtel']

export default function Galerie() {
  const [filtre, setFiltre] = useState<Categorie>('Tout')
  const [zoom, setZoom] = useState<(typeof items)[number] | null>(null)

  const visibles = filtre === 'Tout' ? items : items.filter((i) => i.categorie === filtre)

  return (
    <>
      <PageHero
        image={photos.restaurantPlage2}
        surtitle="En images"
        title="Galerie"
        subtitle="Plongez dans l'univers du Nourable, entre corail, terracotta et turquoise."
      />

      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle surtitle="Nos plus beaux instants" title="L'hôtel en photos" />

          {/* Filtres */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFiltre(cat)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  filtre === cat
                    ? 'bg-terracotta-500 text-white shadow-md'
                    : 'bg-white text-encre-700 hover:bg-corail-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mosaïque */}
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>figure]:mb-6">
            {visibles.map((item) => (
              <figure
                key={item.legende}
                className="group cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setZoom(item)}
              >
                <img
                  src={item.image}
                  alt={item.legende}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="bg-white px-5 py-4">
                  <p className="text-sm font-medium text-encre-900">{item.legende}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-terracotta-500">
                    {item.categorie}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Visionneuse plein écran */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-encre-900/90 p-4"
          onClick={() => setZoom(null)}
          role="dialog"
          aria-label={zoom.legende}
        >
          <button
            type="button"
            aria-label="Fermer"
            className="absolute right-6 top-6 text-4xl leading-none text-white/80 hover:text-white"
          >
            ×
          </button>
          <figure className="max-h-full max-w-5xl">
            <img src={zoom.image} alt={zoom.legende} className="max-h-[80vh] w-full rounded-xl object-contain" />
            <figcaption className="mt-4 text-center text-sm text-white/85">{zoom.legende}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
