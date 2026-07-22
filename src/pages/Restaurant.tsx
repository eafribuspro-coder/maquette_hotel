import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const menus = [
  {
    titre: 'Saveurs de la lagune',
    plats: ['Poisson braisé entier, attiéké', 'Gambas grillées au citron vert', 'Sole meunière, alloco'],
  },
  {
    titre: 'Terroir ivoirien',
    plats: ['Poulet kedjenou traditionnel', 'Garba revisité', 'Sauce graine, riz parfumé'],
  },
  {
    titre: 'Douceurs & bar',
    plats: ['Ananas rôti, glace coco', 'Cocktails signatures au bissap', 'Jus frais de gingembre'],
  },
]

const moments = [
  { heure: '6h30 – 10h30', titre: 'Petit-déjeuner', texte: 'Buffet continental et ivoirien face à la mer.' },
  { heure: '12h00 – 15h00', titre: 'Déjeuner', texte: 'Grillades et poissons du jour, à la carte.' },
  { heure: '15h00 – 19h00', titre: 'Bar de plage', texte: 'Cocktails, jus frais et tapas sous les cocotiers.' },
  { heure: '19h00 – 22h30', titre: 'Dîner', texte: 'Cuisine raffinée au son des vagues.' },
]

export default function Restaurant() {
  return (
    <>
      <PageHero
        image={photos.restaurantPlage1}
        surtitle="Gastronomie"
        title="Restaurant & Bar"
        subtitle="Une table les pieds dans le sable, à l'ombre des cocotiers aux troncs flamboyants."
      />

      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={photos.restaurantPlage2}
                alt="Longue galerie du restaurant ouverte sur la plage"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <SectionTitle
              align="left"
              surtitle="Notre philosophie"
              title="La mer à votre table"
              subtitle="Sous sa longue galerie de toits terracotta, notre restaurant célèbre les produits
              de l'océan et le terroir ivoirien. Poissons du jour, grillades au feu de bois et
              cocktails créatifs se dégustent avec vue directe sur la plage — sans jamais quitter
              le sable."
            />
          </div>
        </div>
      </section>

      {/* Carte */}
      <section className="bg-encre-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            surtitle="À la carte"
            title="Un aperçu de nos saveurs"
            subtitle="La carte évolue au fil des arrivages et des saisons."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {menus.map((menu) => (
              <div key={menu.titre} className="rounded-2xl border border-white/15 p-8">
                <h3 className="font-display text-xl font-bold text-corail-300">{menu.titre}</h3>
                <ul className="mt-5 space-y-3">
                  {menu.plats.map((plat) => (
                    <li key={plat} className="border-b border-white/10 pb-3 text-sm text-sable-200/90">
                      {plat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section className="bg-sable-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            surtitle="Au fil de la journée"
            title="Horaires & moments"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moments.map((m) => (
              <div key={m.titre} className="rounded-2xl bg-white p-7 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-lagune-600">
                  {m.heure}
                </p>
                <h3 className="mt-2 text-lg font-bold text-encre-900">{m.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-encre-500">{m.texte}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-corail-500 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600"
            >
              Réserver une table
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
