import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import { listerPhotos, obtenirFilm } from '../lib/medias'
import type { Media } from '../lib/types'
import HeroSlider from '../components/HeroSlider'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const cartes = [
  {
    to: '/chambres',
    image: photos.facade,
    alt: 'Façade rose corail du bâtiment des chambres',
    titre: 'Chambres',
    texte: 'Des chambres lumineuses aux teintes corail, entre jardins et océan.',
  },
  {
    to: '/restaurant',
    image: photos.restaurantPlage1,
    alt: 'Restaurant en paillote les pieds dans le sable',
    titre: 'Restaurant',
    texte: 'Cuisine ivoirienne et internationale, les pieds dans le sable.',
  },
  {
    to: '/loisirs',
    image: photos.piscine1,
    alt: 'Grande piscine turquoise avec transats et parasols',
    titre: 'Piscines',
    texte: 'Grande piscine adultes et aire de jeux aquatique pour enfants.',
  },
  {
    to: '/loisirs',
    image: photos.restaurantPlage2,
    alt: "Plage privée de sable doré bordée de cocotiers",
    titre: 'Plage privée',
    texte: '200 mètres de sable doré réservés à nos hôtes, face à l’Atlantique.',
  },
]

const apercuGalerieStatique = [
  { image: photos.piscine1, alt: 'Grande piscine et parasols' },
  { image: photos.restaurantPlage1, alt: 'Restaurant de plage, vue rapprochée' },
  { image: photos.facade, alt: 'Façade rose du bâtiment principal' },
  { image: photos.jeuxEnfants, alt: 'Aire de jeux aquatique pour enfants' },
  { image: photos.piscine2, alt: 'Bassin en longueur au petit matin' },
  { image: photos.restaurantPlage2, alt: 'La paillote du restaurant face à la mer' },
  { image: photos.piscine3, alt: 'La piscine vue depuis la plage carrelée' },
  { image: photos.facade, alt: "Allée d'entrée sous les filaos" },
]

export default function Accueil() {
  const [film, setFilm] = useState<Media | null>(null)
  const [photosAdmin, setPhotosAdmin] = useState<Media[]>([])

  useEffect(() => {
    obtenirFilm()
      .then(setFilm)
      .catch(() => setFilm(null))
    listerPhotos()
      .then(setPhotosAdmin)
      .catch(() => setPhotosAdmin([]))
  }, [])

  // Aperçu galerie : les photos ajoutées par l'admin priment, sinon les photos du site.
  const apercuGalerie = photosAdmin.length
    ? photosAdmin.slice(0, 8).map((p) => ({ image: p.url, alt: p.titre || 'Nourabel Hotel' }))
    : apercuGalerieStatique

  return (
    <>
      <Seo
        title="Nourabel Hotel — Resort en bord de plage, Côte d'Ivoire"
        description="Hôtel-resort les pieds dans le sable en Côte d'Ivoire : chambres au charme corail, restaurant de plage, piscines turquoise et plage privée."
      />

      {/* 1. HERO — slider automatique plein écran */}
      <section className="relative h-screen min-h-[560px]">
        <HeroSlider />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <p
            className="animate-hero-rise mb-6 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.5em] text-or-300"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="h-px w-12 bg-or-300/70" aria-hidden="true" />
            Hôtel · Resort · Côte d'Ivoire
            <span className="h-px w-12 bg-or-300/70" aria-hidden="true" />
          </p>
          <h1
            className="animate-hero-rise font-display text-5xl font-bold tracking-[0.08em] text-white sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '0.45s' }}
          >
            NOURABEL HOTEL
          </h1>
          <p
            className="animate-hero-rise mt-7 font-display text-xl italic text-white/90 sm:text-2xl"
            style={{ animationDelay: '0.7s' }}
          >
            Votre oasis en bord de plage
          </p>
        </div>
        {/* Fil de scroll animé */}
        <div className="absolute bottom-0 left-1/2 z-10 hidden h-24 w-px -translate-x-1/2 overflow-hidden sm:block">
          <span className="animate-scroll-cue block h-full w-full bg-white/70" />
        </div>
      </section>

      {/* 2. PRÉSENTATION */}
      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-or-500">
                Bienvenue
                <span className="h-px w-12 bg-or-400/70" aria-hidden="true" />
              </p>
              <h2 className="mt-4 text-3xl font-bold uppercase tracking-wide text-encre-900 sm:text-4xl">
                Découvrez l'hôtel Nourabel
              </h2>
              <p className="mt-2 font-display text-lg italic text-lagune-600">
                Un havre de paix entre plage et cocotiers
              </p>
              <p className="mt-6 leading-relaxed text-encre-500">
                Sur le littoral ivoirien, le Nourabel Hotel conjugue l'élégance d'une architecture
                aux teintes corail et terracotta avec la douceur d'une plage bordée de cocotiers.
                Chambres paisibles ouvertes sur les jardins, restaurant en paillote face à
                l'océan, piscines turquoise et aire de jeux pour les enfants : tout est réuni pour
                un séjour hors du temps, en famille, en couple ou entre amis.
              </p>
              <Link
                to="/chambres"
                className="group mt-9 inline-flex items-center gap-3 rounded-full border border-terracotta-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-terracotta-500 transition-all duration-300 hover:bg-terracotta-500 hover:text-white"
              >
                En savoir plus
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </Reveal>
            <Reveal delay={150} direction="right">
              {/* Cadre doré décalé, signature premium */}
              <div className="relative">
                <div className="absolute -bottom-5 -right-5 h-full w-full rounded-2xl border border-or-400/50" aria-hidden="true" />
                <img
                  src={photos.facade}
                  alt="Bâtiment principal rose corail du Nourabel Hotel et son allée de filaos"
                  loading="lazy"
                  className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </Reveal>
          </div>

          {/* Chiffres clés animés */}
          <Reveal className="mt-24">
            <div className="grid grid-cols-2 gap-y-10 border-y border-encre-700/10 py-10 text-center sm:grid-cols-4">
              {[
                { end: 24, suffix: '', label: 'Chambres & suites' },
                { end: 2, suffix: '', label: 'Piscines turquoise' },
                { end: 200, suffix: ' m', label: 'De plage privée' },
                { end: 7, suffix: 'j/7', label: 'À votre service' },
              ].map((stat) => (
                <div key={stat.label}>
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    className="font-display text-5xl font-bold text-terracotta-500"
                  />
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-encre-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FILM PROMOTIONNEL — affiché seulement si l'admin en a ajouté un */}
      {film && (
        <section className="bg-encre-900 py-24 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                light
                surtitle="En vidéo"
                title="Découvrez le Nourabel en images"
              />
            </Reveal>
            <Reveal className="mt-14">
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <video
                  src={film.url}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. GRILLE 4 CARTES */}
      <section className="bg-sable-200 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              surtitle="Nos univers"
              title="Quatre façons de vivre le Nourabel"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cartes.map((carte, i) => (
              <Reveal key={carte.titre} delay={i * 100}>
                <Link
                  to={carte.to}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={carte.image}
                      alt={carte.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-encre-900/0 transition-colors duration-500 group-hover:bg-encre-900/20" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-encre-900">
                      {carte.titre}
                    </h3>
                    <span
                      className="mt-2 block h-px w-8 bg-or-400 transition-all duration-500 group-hover:w-16"
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-encre-500">{carte.texte}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-terracotta-500">
                      En savoir plus
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOISIRS — alternance image/texte */}
      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              surtitle="Détente & famille"
              title="Des loisirs pour petits et grands"
            />
          </Reveal>

          <div className="mt-16 space-y-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal direction="left">
                <img
                  src={photos.piscine1}
                  alt="Grande piscine adultes bordée de transats blancs et de parasols"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
                />
              </Reveal>
              <Reveal delay={150} direction="right">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lagune-600">
                  Piscine adultes
                </p>
                <h3 className="mt-3 text-2xl font-bold text-encre-900 sm:text-3xl">
                  La grande piscine, cœur du resort
                </h3>
                <p className="mt-5 leading-relaxed text-encre-500">
                  25 mètres de nage aux reflets d'émeraude, entourés de transats et de parasols.
                  Commandez un cocktail au bar et laissez filer les heures entre deux longueurs,
                  à l'ombre des palmiers.
                </p>
                <Link
                  to="/loisirs"
                  className="mt-7 inline-block text-sm font-semibold uppercase tracking-widest text-terracotta-500 hover:underline"
                >
                  Découvrir les piscines →
                </Link>
              </Reveal>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal direction="right" className="lg:order-2">
                <img
                  src={photos.jeuxEnfants}
                  alt="Aire de jeux aquatique pour enfants avec toboggans colorés"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
                />
              </Reveal>
              <Reveal delay={150} direction="left" className="lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-corail-500">
                  Espace enfants
                </p>
                <h3 className="mt-3 text-2xl font-bold text-encre-900 sm:text-3xl">
                  Toboggans et jeux d'eau pour les petits
                </h3>
                <p className="mt-5 leading-relaxed text-encre-500">
                  Bassin à faible profondeur, structure de jeux aquatiques, toboggans colorés et
                  seau verseur : les enfants ont leur royaume, sous la surveillance de nos
                  équipes et à deux pas des transats des parents.
                </p>
                <Link
                  to="/loisirs"
                  className="mt-7 inline-block text-sm font-semibold uppercase tracking-widest text-terracotta-500 hover:underline"
                >
                  Voir l'espace enfants →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALERIE APERÇU */}
      <section className="bg-encre-900 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              light
              surtitle="En images"
              title="L'hôtel en un coup d'œil"
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {apercuGalerie.map((item, i) => (
              <Reveal key={`${item.alt}-${i}`} delay={(i % 4) * 80}>
                <div className="group relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-encre-900/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{item.alt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link
              to="/galerie"
              className="inline-block rounded-full border border-white/60 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-encre-900"
            >
              Accéder à la galerie
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
