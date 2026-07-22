import { useState, type FormEvent } from 'react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  const [envoye, setEnvoye] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Maquette : pas d'envoi réel, on affiche simplement la confirmation.
    setEnvoye(true)
  }

  return (
    <>
      <PageHero
        image={photos.facade}
        surtitle="À votre écoute"
        title="Contact & Réservation"
        subtitle="Réservez votre séjour ou posez-nous vos questions : nous répondons 7j/7."
      />

      <section className="bg-sable-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-5">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <SectionTitle
                align="left"
                surtitle="Réservation"
                title="Demande de séjour"
                subtitle="Remplissez ce formulaire, notre équipe vous confirme la disponibilité sous 24h."
              />

              {envoye ? (
                <div className="mt-10 rounded-2xl bg-lagune-100 p-8">
                  <h3 className="text-xl font-bold text-lagune-700">Merci pour votre demande !</h3>
                  <p className="mt-2 text-sm leading-relaxed text-encre-500">
                    Ceci est une maquette : aucun message n'a réellement été envoyé. Sur le site
                    final, votre demande partirait directement à notre équipe de réservation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnvoye(false)}
                    className="mt-6 rounded-full bg-lagune-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-lagune-700"
                  >
                    Nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Nom complet *</span>
                    <input
                      required
                      type="text"
                      name="nom"
                      placeholder="Votre nom"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Téléphone *</span>
                    <input
                      required
                      type="tel"
                      name="telephone"
                      placeholder="+225 ..."
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-encre-700">Adresse e-mail *</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="vous@exemple.com"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Arrivée *</span>
                    <input
                      required
                      type="date"
                      name="arrivee"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Départ *</span>
                    <input
                      required
                      type="date"
                      name="depart"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Type de chambre</span>
                    <select
                      name="chambre"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    >
                      <option>Chambre Classique</option>
                      <option>Chambre Supérieure Vue Piscine</option>
                      <option>Suite Familiale Océan</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Voyageurs</span>
                    <select
                      name="voyageurs"
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    >
                      <option>1 adulte</option>
                      <option>2 adultes</option>
                      <option>2 adultes + enfants</option>
                      <option>Groupe (4 et plus)</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-encre-700">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Occasion particulière, demandes spécifiques..."
                      className="mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-corail-500 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600 sm:w-auto"
                    >
                      Envoyer ma demande
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Coordonnées */}
            <aside className="lg:col-span-2">
              <div className="rounded-2xl bg-encre-900 p-8 text-sable-200">
                <h3 className="font-display text-2xl font-bold text-white">Nous trouver</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <p className="font-semibold uppercase tracking-wider text-corail-300">Adresse</p>
                    <p className="mt-1 text-sable-200/85">
                      Bord de mer, Route de la plage
                      <br />
                      Jacqueville, Côte d'Ivoire
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold uppercase tracking-wider text-corail-300">Téléphone</p>
                    <a href="tel:+2250700000000" className="mt-1 block text-sable-200/85 hover:text-white">
                      +225 07 00 00 00 00
                    </a>
                  </li>
                  <li>
                    <p className="font-semibold uppercase tracking-wider text-corail-300">E-mail</p>
                    <a
                      href="mailto:contact@nourablehotel.ci"
                      className="mt-1 block text-sable-200/85 hover:text-white"
                    >
                      contact@nourablehotel.ci
                    </a>
                  </li>
                  <li>
                    <p className="font-semibold uppercase tracking-wider text-corail-300">Réception</p>
                    <p className="mt-1 text-sable-200/85">Ouverte 24h/24, 7j/7</p>
                  </li>
                </ul>
              </div>

              {/* Carte factice */}
              <div className="relative mt-8 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={photos.restaurantPlage2}
                  alt="Vue de l'hôtel depuis la plage"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-encre-900/40">
                  <span className="rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-encre-900">
                    📍 Jacqueville — face à l'océan
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
