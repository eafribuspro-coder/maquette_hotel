import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const champInput =
  'mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400'

export default function Contact() {
  const [envoye, setEnvoye] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Maquette : pas d'envoi réel, on affiche simplement la confirmation.
    setEnvoye(true)
  }

  return (
    <>
      <Seo
        title="Contact & Réservation — Nourabel Hotel"
        description="Réservez votre séjour au Nourabel Hotel en Côte d'Ivoire : formulaire de réservation, téléphone, e-mail et plan d'accès. Réception ouverte 24h/24."
      />
      <PageHero
        image={photos.facade}
        surtitle="À votre écoute"
        title="Contact & Réservation"
        subtitle="Réservez votre séjour ou posez-nous vos questions : nous répondons 7j/7."
      />

      <section className="bg-sable-100 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-5">
            {/* Formulaire */}
            <Reveal className="lg:col-span-3">
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
                    <input required type="text" name="nom" placeholder="Votre nom" className={champInput} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Téléphone *</span>
                    <input required type="tel" name="telephone" placeholder="+225 ..." className={champInput} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-encre-700">Adresse e-mail *</span>
                    <input required type="email" name="email" placeholder="vous@exemple.com" className={champInput} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Arrivée *</span>
                    <input required type="date" name="arrivee" className={champInput} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-encre-700">Départ *</span>
                    <input required type="date" name="depart" className={champInput} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-encre-700">Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Type de chambre souhaité, nombre de voyageurs, occasion particulière..."
                      className={champInput}
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
            </Reveal>

            {/* Coordonnées + carte */}
            <Reveal delay={150} className="lg:col-span-2">
              <div className="rounded-2xl bg-encre-900 p-8 text-sable-200">
                <h3 className="font-display text-2xl font-bold text-white">Nous trouver</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-corail-300" />
                    <span className="text-sable-200/85">
                      Bord de mer, Route de la plage
                      <br />
                      Jacqueville, Côte d'Ivoire
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-corail-300" />
                    <a href="tel:+2250700000000" className="text-sable-200/85 hover:text-white">
                      +225 07 00 00 00 00
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-corail-300" />
                    <a href="mailto:contact@nourabelhotel.ci" className="text-sable-200/85 hover:text-white">
                      contact@nourabelhotel.ci
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-corail-300" />
                    <span className="text-sable-200/85">Réception ouverte 24h/24, 7j/7</span>
                  </li>
                </ul>
              </div>

              {/* Carte Google Maps (Abidjan / littoral) */}
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  title="Plan d'accès au Nourabel Hotel"
                  src="https://www.google.com/maps?q=Jacqueville,+C%C3%B4te+d'Ivoire&z=11&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
