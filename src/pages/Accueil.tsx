import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import SectionTitle from '../components/SectionTitle'

const experiences = [
  {
    to: '/chambres',
    image: photos.facade,
    title: 'Chambres & Suites',
    text: "Des chambres lumineuses aux teintes corail, ouvertes sur les jardins et l'océan.",
  },
  {
    to: '/restaurant',
    image: photos.restaurantPlage1,
    title: 'Restaurant & Bar',
    text: 'Une table les pieds dans le sable, entre saveurs ivoiriennes et cuisine du monde.',
  },
  {
    to: '/loisirs',
    image: photos.piscine1,
    title: 'Piscines & Loisirs',
    text: 'Deux piscines turquoise, transats, parasols et activités balnéaires toute la journée.',
  },
]

export default function Accueil() {
  return (
    <>
      {/* Hero plein écran */}
      <section className="relative flex h-screen min-h-[560px] items-center overflow-hidden">
        <img
          src={photos.piscine2}
          alt="Piscine du Nourable Hotel bordée de transats et de palmiers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-encre-900/50 via-encre-900/20 to-encre-900/60" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-corail-200">
            Hôtel · Resort · Bord de plage · Côte d'Ivoire
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            L'élégance,
            <br />
            les pieds dans le sable
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Entre cocotiers et océan Atlantique, le Nourable Hotel vous accueille dans un cadre
            balnéaire d'exception, où chaque instant devient un souvenir.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-corail-500 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-corail-600"
            >
              Réserver maintenant
            </Link>
            <Link
              to="/galerie"
              className="rounded-full border border-white/60 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/15"
            >
              Découvrir l'hôtel
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70">
          <svg viewBox="0 0 24 24" className="h-8 w-8 animate-bounce fill-current" aria-hidden="true">
            <path d="M12 16.5l-6-6 1.4-1.4 4.6 4.6 4.6-4.6L18 10.5z" />
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionTitle
                align="left"
                surtitle="Bienvenue au Nourable"
                title="Un refuge balnéaire au charme corail"
                subtitle="Niché sur le littoral ivoirien, le Nourable Hotel marie l'architecture aux teintes
                corail et terracotta avec la douceur de la plage. Restaurant en bord de mer,
                piscines turquoise et chambres paisibles : tout est pensé pour un séjour hors du
                temps, en famille, en couple ou entre amis."
              />
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-encre-700/10 pt-8 text-center">
                <div>
                  <p className="font-display text-4xl font-bold text-terracotta-500">24</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-encre-500">Chambres</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-terracotta-500">2</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-encre-500">Piscines</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-terracotta-500">200 m</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-encre-500">De plage privée</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={photos.facade}
                alt="Façade rose corail du bâtiment principal"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
              <img
                src={photos.restaurantPlage1}
                alt="Restaurant de plage sous les cocotiers"
                className="absolute -bottom-10 -left-6 hidden w-2/5 rounded-xl border-8 border-sable-100 object-cover shadow-xl md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section className="bg-sable-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            surtitle="Expériences"
            title="Vivez le Nourable"
            subtitle="Trois univers pour composer votre séjour, entre détente, saveurs et découvertes."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {experiences.map((exp) => (
              <Link
                key={exp.to}
                to={exp.to}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-encre-900">{exp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-encre-500">{exp.text}</p>
                  <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-terracotta-500 group-hover:underline">
                    Découvrir →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau immersif */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <img
          src={photos.restaurantPlage2}
          alt="Galerie du restaurant face à la plage"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-encre-900/55" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <SectionTitle
            light
            surtitle="Face à l'océan"
            title="Dînez au rythme des vagues"
            subtitle="Notre restaurant de plage vous reçoit du petit-déjeuner au dîner, à l'ombre des
            cocotiers aux troncs flamboyants."
          />
          <Link
            to="/restaurant"
            className="mt-10 inline-block rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-encre-900"
          >
            Voir le restaurant
          </Link>
        </div>
      </section>

      {/* Appel à réservation */}
      <section className="bg-corail-100 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionTitle
            surtitle="Votre séjour commence ici"
            title="Réservez votre évasion en bord de mer"
            subtitle="Notre équipe vous répond 7j/7 pour organiser un séjour à votre image :
            week-end en famille, escapade romantique ou événement privé."
          />
          <Link
            to="/contact"
            className="mt-10 inline-block rounded-full bg-corail-500 px-10 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-corail-600"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>
    </>
  )
}
