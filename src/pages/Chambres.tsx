import { Link } from 'react-router-dom'
import { Snowflake, Wifi, Tv, Trees, Waves, BedDouble, Users, Coffee } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

interface Equipement {
  icone: LucideIcon
  label: string
}

interface Chambre {
  nom: string
  image: string
  alt: string
  prix: string
  description: string
  equipements: Equipement[]
}

const chambres: Chambre[] = [
  {
    nom: 'Chambre Standard',
    image: photos.facade,
    alt: 'Chambre Standard ouvrant sur les jardins de filaos',
    prix: '45 000 FCFA',
    description:
      "Confortable et lumineuse, la chambre Standard donne sur les jardins de filaos. Idéale pour une escapade d'une nuit ou un court séjour.",
    equipements: [
      { icone: BedDouble, label: 'Lit double' },
      { icone: Snowflake, label: 'Climatisation' },
      { icone: Wifi, label: 'Wi-Fi gratuit' },
      { icone: Trees, label: 'Vue jardin' },
    ],
  },
  {
    nom: 'Chambre Supérieure',
    image: photos.piscine1,
    alt: 'Chambre Supérieure avec terrasse donnant sur la piscine',
    prix: '65 000 FCFA',
    description:
      'Plus spacieuse, avec une terrasse privée ouverte sur la piscine et ses parasols. Parfaite pour un séjour détente en couple.',
    equipements: [
      { icone: BedDouble, label: 'Lit queen size' },
      { icone: Snowflake, label: 'Climatisation' },
      { icone: Wifi, label: 'Wi-Fi gratuit' },
      { icone: Tv, label: 'TV écran plat' },
      { icone: Waves, label: 'Vue piscine' },
    ],
  },
  {
    nom: 'Suite Familiale',
    image: photos.restaurantPlage2,
    alt: 'Suite Familiale à quelques pas de la plage',
    prix: '95 000 FCFA',
    description:
      "Deux chambres communicantes et un salon, à quelques pas du sable. Le choix des familles qui veulent vivre l'océan du lever au coucher du soleil.",
    equipements: [
      { icone: Users, label: 'Jusqu’à 5 personnes' },
      { icone: Snowflake, label: 'Climatisation' },
      { icone: Wifi, label: 'Wi-Fi gratuit' },
      { icone: Tv, label: 'TV écran plat' },
      { icone: Waves, label: 'Vue mer' },
      { icone: Coffee, label: 'Petit-déjeuner inclus' },
    ],
  },
]

const services = [
  { titre: 'Petit-déjeuner', texte: 'Buffet servi face à la mer de 6h30 à 10h30.' },
  { titre: 'Ménage quotidien', texte: 'Chambres préparées chaque jour avec soin.' },
  { titre: 'Parking gratuit', texte: 'Parking privé ombragé et sécurisé 24h/24.' },
  { titre: 'Réception 24h/24', texte: 'Une équipe disponible à toute heure.' },
]

export default function Chambres() {
  return (
    <>
      <Seo
        title="Chambres & Suites — Nourable Hotel"
        description="Chambres Standard, Supérieure et Suite Familiale au Nourable Hotel : climatisation, Wi-Fi, vue jardin ou mer, à partir de 45 000 FCFA la nuit."
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
              subtitle="Chaque chambre du Nourable a été pensée comme une parenthèse : matériaux naturels,
              couleurs douces et confort moderne."
            />
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {chambres.map((chambre, i) => (
              <Reveal key={chambre.nom} delay={i * 120} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl">
                  <div className="overflow-hidden">
                    <img
                      src={chambre.image}
                      alt={chambre.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl font-bold text-encre-900">
                        {chambre.nom}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-terracotta-500">
                      dès {chambre.prix} <span className="font-normal lowercase text-encre-500">/ nuit</span>
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-encre-500">
                      {chambre.description}
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                      {chambre.equipements.map((eq) => (
                        <li key={eq.label} className="flex items-center gap-2 text-xs text-encre-700">
                          <eq.icone className="h-4 w-4 shrink-0 text-lagune-600" />
                          {eq.label}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="mt-8 block rounded-full bg-corail-500 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail-600"
                    >
                      Réserver
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services inclus */}
      <section className="bg-lagune-600 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle light surtitle="Toujours inclus" title="Les petits plus du Nourable" />
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
