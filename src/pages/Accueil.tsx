import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import HeroSlider from '../components/HeroSlider'
import BookingBar from '../components/BookingBar'
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

const apercuGalerie = [
  { image: photos.piscine1, alt: 'Grande piscine et parasols' },
  { image: photos.restaurantPlage1, alt: 'Restaurant de plage, vue rapprochée' },
  { image: photos.facade, alt: 'Façade rose du bâtiment principal' },
  { image: photos.jeuxEnfants, alt: 'Aire de jeux aquatique pour enfants' },
  { image: photos.piscine2, alt: 'Bassin en longueur au petit matin' },
  { image: photos.restaurantPlage2, alt: 'Galerie du restaurant face à la mer' },
  { image: photos.piscine1, alt: 'Reflets turquoise de la piscine' },
  { image: photos.facade, alt: "Allée d'entrée sous les filaos" },
]

export default function Accueil() {
  return (
    <>
      <Seo
        title="Nourable Hotel — Resort en bord de plage, Côte d'Ivoire"
        description="Hôtel-resort les pieds dans le sable en Côte d'Ivoire : chambres au charme corail, restaurant de plage, piscines turquoise et plage privée."
      />

      {/* 1. HERO — slider automatique plein écran */}
      <section className="relative h-screen min-h-[560px]">
        <HeroSlider />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-corail-200">
            Hôtel · Resort · Côte d'Ivoire
          </p>
          <h1 className="font-display text-5xl font-bold tracking-[0.08em] text-white sm:text-7xl lg:text-8xl">
            NOURABLE HOTEL
          </h1>
          <p className="mt-6 font-display text-xl italic text-white/90 sm:text-2xl">
            Votre oasis en bord de plage
          </p>
        </div>
      </section>

      {/* 2. BARRE DE RÉSERVATION superposée */}
      <BookingBar />

      {/* 3. PRÉSENTATION */}
      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta-500">
                Bienvenue
              </p>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-wide text-encre-900 sm:text-4xl">
                Découvrez l'hôtel Nourable
              </h2>
              <p className="mt-2 font-display text-lg italic text-lagune-600">
                Un havre de paix entre plage et cocotiers
              </p>
              <p className="mt-6 leading-relaxed text-encre-500">
                Sur le littoral ivoirien, le Nourable Hotel conjugue l'élégance d'une architecture
                aux teintes corail et terracotta avec la douceur d'une plage bordée de cocotiers.
                Chambres paisibles ouvertes sur les jardins, restaurant en paillote face à
                l'océan, piscines turquoise et aire de jeux pour les enfants : tout est réuni pour
                un séjour hors du temps, en famille, en couple ou entre amis.
              </p>
              <Link
                to="/chambres"
                className="mt-8 inline-block rounded-full border-2 border-terracotta-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-terracotta-500 transition-colors hover:bg-terracotta-500 hover:text-white"
              >
                En savoir plus
              </Link>
            </Reveal>
            <Reveal delay={150}>
              <img
                src={photos.facade}
                alt="Bâtiment principal rose corail du Nourable Hotel et son allée de filaos"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. GRILLE 4 CARTES */}
      <section className="bg-sable-200 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              surtitle="Nos univers"
              title="Quatre façons de vivre le Nourable"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cartes.map((carte, i) => (
              <Reveal key={carte.titre} delay={i * 100}>
                <Link
                  to={carte.to}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={carte.image}
                      alt={carte.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-encre-900">
                      {carte.titre}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-encre-500">{carte.texte}</p>
                    <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-terracotta-500 group-hover:underline">
                      En savoir plus →
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
              <Reveal>
                <img
                  src={photos.piscine1}
                  alt="Grande piscine adultes bordée de transats blancs et de parasols"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
                />
              </Reveal>
              <Reveal delay={150}>
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
              <Reveal className="lg:order-2">
                <img
                  src={photos.jeuxEnfants}
                  alt="Aire de jeux aquatique pour enfants avec toboggans colorés"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
                />
              </Reveal>
              <Reveal delay={150} className="lg:order-1">
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
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
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
