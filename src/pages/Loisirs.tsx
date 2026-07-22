import { Link } from 'react-router-dom'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const activites = [
  {
    titre: 'Plage privée',
    texte: "200 mètres de sable doré réservés à nos hôtes, avec transats et parasols.",
  },
  {
    titre: 'Jeux aquatiques',
    texte: 'Bouées, frites et jeux de piscine à disposition pour petits et grands.',
  },
  {
    titre: 'Beach volley & pétanque',
    texte: 'Terrains aménagés sur la plage, matériel prêté à la réception.',
  },
  {
    titre: 'Balades en bord de mer',
    texte: 'Promenades au coucher du soleil le long du littoral de Jacqueville.',
  },
  {
    titre: 'Espace enfants',
    texte: 'Bassin à faible profondeur surveillé et coin jeux ombragé.',
  },
  {
    titre: 'Événements privés',
    texte: "Anniversaires, mariages et team-buildings au bord de l'eau.",
  },
]

export default function Loisirs() {
  return (
    <>
      <PageHero
        image={photos.piscine2}
        surtitle="Détente"
        title="Piscines & Loisirs"
        subtitle="Deux bassins turquoise, une plage privée et des activités pour toute la famille."
      />

      {/* Les piscines */}
      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            surtitle="Nos bassins"
            title="Deux piscines face au ciel"
            subtitle="Carrelage aux reflets d'émeraude, margelles en pierre claire et transats à l'ombre
            des parasols : nos piscines sont le cœur battant du resort."
          />
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <figure className="group overflow-hidden rounded-2xl shadow-xl">
              <img
                src={photos.piscine1}
                alt="Piscine principale avec transats et pavillon rose"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="bg-white p-6">
                <h3 className="text-xl font-bold text-encre-900">La Grande Piscine</h3>
                <p className="mt-2 text-sm leading-relaxed text-encre-500">
                  25 mètres de nage bordés de transats et de parasols, ouverte de 8h à 20h.
                  Bar de la piscine à quelques pas.
                </p>
              </figcaption>
            </figure>
            <figure className="group overflow-hidden rounded-2xl shadow-xl">
              <img
                src={photos.piscine2}
                alt="Piscine en longueur bordée de transats"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="bg-white p-6">
                <h3 className="text-xl font-bold text-encre-900">Le Bassin Lagune</h3>
                <p className="mt-2 text-sm leading-relaxed text-encre-500">
                  Un bassin paisible à débordement visuel, idéal pour la détente et les
                  familles, avec zone à faible profondeur.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Activités */}
      <section className="bg-lagune-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            surtitle="À vivre sur place"
            title="Des loisirs pour tous"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activites.map((a) => (
              <div key={a.titre} className="rounded-2xl bg-white p-7 shadow-md">
                <span className="inline-block h-1.5 w-10 rounded-full bg-terracotta-400" />
                <h3 className="mt-4 text-lg font-bold text-encre-900">{a.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-encre-500">{a.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau plage */}
      <section className="relative flex min-h-[400px] items-center overflow-hidden">
        <img
          src={photos.restaurantPlage1}
          alt="Plage de sable et cocotiers devant le restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-encre-900/55" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <SectionTitle
            light
            surtitle="Le sable pour horizon"
            title="Une journée au Nourable ne ressemble à aucune autre"
          />
          <Link
            to="/contact"
            className="mt-10 inline-block rounded-full bg-corail-500 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>
    </>
  )
}
