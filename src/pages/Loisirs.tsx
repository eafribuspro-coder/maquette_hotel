import { Link } from 'react-router-dom'
import { Umbrella, Waves, Volleyball, Sun } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const atoutsPlage = [
  { icone: Umbrella, titre: 'Transats & parasols', texte: 'Installés chaque matin sur le sable, réservés à nos hôtes.' },
  { icone: Volleyball, titre: 'Beach volley & pétanque', texte: 'Terrains aménagés, matériel prêté à la réception.' },
  { icone: Waves, titre: 'Baignade surveillée', texte: 'Zone de baignade balisée face à l’hôtel en journée.' },
  { icone: Sun, titre: 'Couchers de soleil', texte: 'Les plus beaux couchers de soleil du littoral, cocktail en main.' },
]

export default function Loisirs() {
  return (
    <>
      <Seo
        title="Piscines & Loisirs — Nourabel Hotel"
        description="Grande piscine avec transats et parasols, aire de jeux aquatique avec toboggans pour enfants et plage privée de 200 mètres au Nourabel Hotel."
      />
      <PageHero
        image={photos.piscine2}
        surtitle="Détente"
        title="Piscines & Loisirs"
        subtitle="Deux bassins turquoise, une aire de jeux aquatique et une plage privée face à l'Atlantique."
      />

      {/* La grande piscine */}
      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <img
                src={photos.piscine1}
                alt="Grande piscine bordée de transats blancs, parasols et pavillon rose"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
            </Reveal>
            <Reveal delay={150} direction="right">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lagune-600">
                Piscine adultes
              </p>
              <h2 className="mt-3 text-3xl font-bold text-encre-900 sm:text-4xl">
                La grande piscine
              </h2>
              <p className="mt-6 leading-relaxed text-encre-500">
                25 mètres de nage aux reflets d'émeraude, ouverts de 8h à 20h. Tout autour,
                transats, parasols et service au bord de l'eau : commandez un jus de gingembre
                frais ou un cocktail au bissap sans quitter votre serviette. Le carrelage aux
                tons profonds donne à l'eau cette couleur de lagune qui fait la signature du
                Nourabel.
              </p>
              <ul className="mt-7 space-y-2 text-sm text-encre-700">
                <li>• Bassin de 25 m, profondeur 1,20 m à 2 m</li>
                <li>• Transats et parasols inclus pour les résidents</li>
                <li>• Bar de la piscine à quelques pas</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Espace enfants */}
      <section className="bg-lagune-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="lg:order-2">
              <img
                src={photos.jeuxEnfants}
                alt="Structure de jeux aquatiques avec toboggans bleu et orange pour enfants"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
            </Reveal>
            <Reveal delay={150} direction="left" className="lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-corail-500">
                Espace enfants
              </p>
              <h2 className="mt-3 text-3xl font-bold text-encre-900 sm:text-4xl">
                L'aire de jeux aquatique
              </h2>
              <p className="mt-6 leading-relaxed text-encre-500">
                Un bassin à faible profondeur rien que pour les petits, avec structure de jeux,
                toboggans colorés et seau verseur. Les enfants barbotent en toute sécurité
                pendant que les parents profitent des transats, à quelques mètres seulement.
              </p>
              <ul className="mt-7 space-y-2 text-sm text-encre-700">
                <li>• Profondeur maximale de 40 cm</li>
                <li>• Toboggans et jeux d'eau adaptés dès 3 ans</li>
                <li>• Bouées et brassards disponibles à la réception</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Plage privée */}
      <section className="relative overflow-hidden">
        <img
          src={photos.restaurantPlage2}
          alt="Plage privée de sable doré devant la paillote du restaurant"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-encre-900/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              light
              surtitle="Face à l'Atlantique"
              title="La plage privée"
              subtitle="200 mètres de sable doré réservés à nos hôtes, entre les cocotiers aux troncs
              flamboyants et l'océan. Serviettes fournies, sécurité assurée du lever au coucher
              du soleil."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {atoutsPlage.map((a, i) => (
              <Reveal key={a.titre} delay={i * 100}>
                <div className="h-full rounded-2xl bg-white/10 p-6 backdrop-blur">
                  <a.icone className="h-8 w-8 text-corail-300" />
                  <h3 className="mt-4 text-lg font-bold text-white">{a.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{a.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-corail-500 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600"
            >
              Réserver maintenant
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
