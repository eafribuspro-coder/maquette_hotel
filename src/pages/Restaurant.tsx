import { Link } from 'react-router-dom'
import { Clock, Fish, Soup, Palmtree } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const specialites = [
  {
    icone: Fish,
    titre: 'Fruits de mer grillés',
    texte: 'Poissons du jour, gambas et langoustes grillés au feu de bois, selon les arrivages.',
  },
  {
    icone: Soup,
    titre: 'Cuisine ivoirienne',
    texte: 'Kedjenou, attiéké, alloco, sauce graine : le terroir ivoirien dans toute sa générosité.',
  },
  {
    icone: Palmtree,
    titre: 'Saveurs internationales',
    texte: 'Grillades, pâtes et salades fraîches pour tous les goûts, midi et soir.',
  },
]

const horaires = [
  { heure: '6h30 – 10h30', titre: 'Petit-déjeuner', texte: 'Buffet continental et ivoirien face à la mer.' },
  { heure: '12h00 – 15h00', titre: 'Déjeuner', texte: 'Grillades et poissons du jour, à la carte.' },
  { heure: '15h00 – 19h00', titre: 'Bar de plage', texte: 'Cocktails, jus frais et tapas sous les cocotiers.' },
  { heure: '19h00 – 22h30', titre: 'Dîner', texte: 'Cuisine raffinée au son des vagues.' },
]

export default function Restaurant() {
  return (
    <>
      <Seo
        title="Restaurant & Bar — Nourabel Hotel"
        description="Restaurant en paillote face à la mer au Nourabel Hotel : cuisine ivoirienne et internationale, fruits de mer grillés, bar de plage sous les cocotiers."
      />
      <PageHero
        image={photos.restaurantPlage1}
        surtitle="Gastronomie"
        title="Restaurant & Bar"
        subtitle="Une table les pieds dans le sable, à l'ombre des cocotiers aux troncs flamboyants."
      />

      {/* Présentation */}
      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <img
                src={photos.restaurantPlage2}
                alt="Longue galerie du restaurant en paillote ouverte sur la plage"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
            </Reveal>
            <Reveal delay={150} direction="right">
              <SectionTitle
                align="left"
                surtitle="Notre philosophie"
                title="La mer à votre table"
                subtitle="Sous sa longue paillote aux toits terracotta, notre restaurant célèbre les
                produits de l'océan et le terroir ivoirien. On y déjeune en maillot au retour de
                la plage, on y dîne au son des vagues — sans jamais quitter le sable."
              />
              <div className="mt-8 rounded-2xl bg-corail-100 p-6">
                <p className="font-display text-lg italic text-corail-700">
                  « Les pieds dans le sable, sous les cocotiers : ici, chaque repas a un goût de
                  vacances. »
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Spécialités */}
      <section className="bg-encre-900 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              light
              surtitle="À la carte"
              title="Nos spécialités"
              subtitle="La carte évolue au fil des arrivages et des saisons."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {specialites.map((s, i) => (
              <Reveal key={s.titre} delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/15 p-8 text-center">
                  <s.icone className="mx-auto h-10 w-10 text-corail-300" />
                  <h3 className="mt-5 font-display text-xl font-bold text-white">{s.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sable-200/85">{s.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section className="bg-sable-200 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle surtitle="Au fil de la journée" title="Horaires & moments" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {horaires.map((m, i) => (
              <Reveal key={m.titre} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-md">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-lagune-600">
                    <Clock className="h-4 w-4" /> {m.heure}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-encre-900">{m.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-encre-500">{m.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-corail-500 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600"
            >
              Réserver une table
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
