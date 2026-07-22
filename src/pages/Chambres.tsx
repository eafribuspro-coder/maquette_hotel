import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const chambres = [
  {
    nom: 'Chambre Classique',
    image: photos.facade,
    prix: '45 000 FCFA / nuit',
    description:
      "Confortable et lumineuse, la chambre Classique donne sur les jardins de filaos. Idéale pour une escapade d'une nuit ou un séjour d'affaires.",
    equipements: ['Lit double', 'Climatisation', 'Wi-Fi gratuit', 'Salle de bain privée'],
  },
  {
    nom: 'Chambre Supérieure Vue Piscine',
    image: photos.piscine1,
    prix: '65 000 FCFA / nuit',
    description:
      'Plus spacieuse, avec une terrasse privée ouverte sur la piscine principale et ses parasols. Parfaite pour un séjour détente en couple.',
    equipements: ['Lit queen size', 'Terrasse privée', 'Minibar', 'TV écran plat', 'Climatisation'],
  },
  {
    nom: 'Suite Familiale Océan',
    image: photos.restaurantPlage2,
    prix: '95 000 FCFA / nuit',
    description:
      "Deux chambres communicantes et un salon, à quelques pas du sable. Le choix des familles qui veulent vivre l'océan du lever au coucher du soleil.",
    equipements: ['2 chambres', 'Salon privé', 'Vue océan', 'Petit-déjeuner inclus', 'Wi-Fi gratuit'],
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
      <PageHero
        image={photos.facade}
        surtitle="Hébergement"
        title="Chambres & Suites"
        subtitle="Des chambres aux teintes corail, entre jardins ombragés et souffle de l'océan."
      />

      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            surtitle="Nos hébergements"
            title="Choisissez votre cocon"
            subtitle="Chaque chambre du Nourable a été pensée comme une parenthèse : matériaux naturels,
            couleurs douces et confort moderne."
          />

          <div className="mt-16 space-y-16">
            {chambres.map((chambre, i) => (
              <article
                key={chambre.nom}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={chambre.image}
                    alt={chambre.nom}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-500">
                    {chambre.prix}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-encre-900">{chambre.nom}</h3>
                  <p className="mt-4 leading-relaxed text-encre-500">{chambre.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {chambre.equipements.map((eq) => (
                      <li
                        key={eq}
                        className="rounded-full bg-corail-100 px-4 py-1.5 text-xs font-medium text-corail-700"
                      >
                        {eq}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-8 inline-block rounded-full bg-corail-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-corail-600"
                  >
                    Réserver cette chambre
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services inclus */}
      <section className="bg-lagune-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle light surtitle="Toujours inclus" title="Les petits plus du Nourable" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.titre} className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-white">{s.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{s.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
