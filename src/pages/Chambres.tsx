import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Snowflake, Wifi, Tv, Trees, Waves, BedDouble, Users, Coffee } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { photos } from '../assets/images'
import { listerChambres } from '../lib/db'
import type { Chambre as ChambreDb } from '../lib/types'
import { fcfa } from '../lib/format'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

interface Equipement {
  icone: LucideIcon
  label: string
}

/**
 * Habillage visuel des catégories : photo et équipements, associés par
 * identifiant. Le nom, le tarif, la capacité et la description viennent de la
 * configuration saisie par l'admin.
 */
interface Habillage {
  image: string
  alt: string
  equipements: Equipement[]
}

const equipementsCommuns: Equipement[] = [
  { icone: Snowflake, label: 'Climatisation' },
  { icone: Wifi, label: 'Wi-Fi gratuit' },
]

const habillages: Record<string, Habillage> = {
  'ch-standard': {
    image: photos.facade,
    alt: 'Chambre Standard ouvrant sur les jardins de filaos',
    equipements: [
      { icone: BedDouble, label: 'Lit double' },
      ...equipementsCommuns,
      { icone: Trees, label: 'Vue jardin' },
    ],
  },
  'ch-superieure': {
    image: photos.piscine1,
    alt: 'Chambre Supérieure avec terrasse donnant sur la piscine',
    equipements: [
      { icone: BedDouble, label: 'Lit queen size' },
      ...equipementsCommuns,
      { icone: Tv, label: 'TV écran plat' },
      { icone: Waves, label: 'Vue piscine' },
    ],
  },
  'ch-suite': {
    image: photos.restaurantPlage2,
    alt: 'Suite Familiale à quelques pas de la plage',
    equipements: [
      ...equipementsCommuns,
      { icone: Tv, label: 'TV écran plat' },
      { icone: Waves, label: 'Vue mer' },
      { icone: Coffee, label: 'Petit-déjeuner inclus' },
    ],
  },
}

/** Habillage de repli pour une catégorie créée depuis l'espace admin. */
const habillageDefaut: Habillage = {
  image: photos.facade,
  alt: "Chambre du Nourabel Hotel",
  equipements: [{ icone: BedDouble, label: 'Lit double' }, ...equipementsCommuns],
}

const services = [
  { titre: 'Petit-déjeuner', texte: 'Buffet servi face à la mer de 6h30 à 10h30.' },
  { titre: 'Ménage quotidien', texte: 'Chambres préparées chaque jour avec soin.' },
  { titre: 'Parking gratuit', texte: 'Parking privé ombragé et sécurisé 24h/24.' },
  { titre: 'Réception 24h/24', texte: 'Une équipe disponible à toute heure.' },
]

export default function Chambres() {
  const [chambres, setChambres] = useState<ChambreDb[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    listerChambres()
      .then((liste) => setChambres(liste.filter((c) => c.active)))
      .finally(() => setChargement(false))
  }, [])

  return (
    <>
      <Seo
        title="Chambres & Suites — Nourabel Hotel"
        description="Chambres Standard, Supérieure et Suite Familiale au Nourabel Hotel : climatisation, Wi-Fi, vue jardin ou mer, à partir de 45 000 FCFA la nuit."
      />
      <PageHero
        image={photos.facade}
        surtitle="Hébergement"
        title="Chambres & Suites"
        subtitle="Des chambres aux teintes corail, entre jardins ombragés et souffle de l'océan."
      />

      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              surtitle="Nos hébergements"
              title="Choisissez votre cocon"
              subtitle="Chaque chambre du Nourabel a été pensée comme une parenthèse : matériaux naturels,
              couleurs douces et confort moderne."
            />
          </Reveal>

          {chargement ? (
            <p className="mt-16 text-center text-sm text-encre-500">Chargement de nos chambres…</p>
          ) : (
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {chambres.map((chambre, i) => {
                const habillage = habillages[chambre.id] ?? habillageDefaut
                const equipements = [
                  { icone: Users, label: `Jusqu'à ${chambre.capacite} personnes` },
                  ...habillage.equipements,
                ]
                return (
                  <Reveal key={chambre.id} delay={i * 120} className="h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl">
                      <div className="overflow-hidden">
                        <img
                          src={habillage.image}
                          alt={habillage.alt}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="font-display text-2xl font-bold text-encre-900">
                          {chambre.nom}
                        </h3>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-terracotta-500">
                          dès {fcfa(chambre.prix)}{' '}
                          <span className="font-normal lowercase text-encre-500">/ nuit</span>
                        </p>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-encre-500">
                          {chambre.description}
                        </p>
                        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                          {equipements.map((eq) => (
                            <li
                              key={eq.label}
                              className="flex items-center gap-2 text-xs text-encre-700"
                            >
                              <eq.icone className="h-4 w-4 shrink-0 text-lagune-600" />
                              {eq.label}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/reserver/chambre?chambre=${chambre.id}`}
                          className="mt-8 block rounded-full bg-corail-500 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail-600"
                        >
                          Réserver
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Services inclus */}
      <section className="bg-lagune-600 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle light surtitle="Toujours inclus" title="Les petits plus du Nourabel" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.titre} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-lg font-bold text-white">{s.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{s.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
