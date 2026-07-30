import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock, Loader2, MapPin, Utensils } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import Champ, { classesChamp } from '../components/Champ'
import { listerTables, creerReservationTable } from '../lib/db'
import type { TableResto } from '../lib/types'
import { aujourdhuiIso } from '../lib/format'

const creneaux = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
]

export default function ReserverTable() {
  const [tables, setTables] = useState<TableResto[]>([])
  const [chargement, setChargement] = useState(true)
  const [envoi, setEnvoi] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  const [tableId, setTableId] = useState('')
  const [date, setDate] = useState(aujourdhuiIso())
  const [heure, setHeure] = useState('20:00')
  const [couverts, setCouverts] = useState(2)

  useEffect(() => {
    listerTables()
      .then((liste) => {
        const actives = liste.filter((t) => t.active)
        setTables(actives)
        setTableId((actuel) => actuel || actives[0]?.id || '')
      })
      .catch(() => setErreur('Impossible de charger le plan de salle.'))
      .finally(() => setChargement(false))
  }, [])

  const table = tables.find((t) => t.id === tableId)
  const trapPlaces = table !== undefined && couverts > table.places

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!table) return
    if (trapPlaces) {
      setErreur(`Cette table accueille ${table.places} personnes au maximum.`)
      return
    }
    const form = new FormData(e.currentTarget)
    setEnvoi(true)
    setErreur(null)
    try {
      await creerReservationTable({
        tableId: table.id,
        nom: String(form.get('nom')),
        telephone: String(form.get('telephone')),
        email: String(form.get('email')),
        date,
        heure,
        couverts,
      })
      setEnvoye(true)
    } catch {
      setErreur("L'envoi a échoué. Merci de réessayer ou de nous appeler.")
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <>
      <Seo
        title="Réserver une table — Restaurant-Bar Nourabel"
        description="Réservez votre table au Restaurant-Bar Nourabel : choisissez la date, l'horaire et l'emplacement, les pieds dans le sable ou sous la paillote."
      />
      <PageHero
        image={photos.restaurantPlage1}
        surtitle="Restaurant-Bar"
        title="Réserver une table"
        subtitle="Déjeuner les pieds dans le sable ou dîner sous la paillote : choisissez votre table."
      />

      <section className="bg-sable-100 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {envoye ? (
            <Reveal>
              <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lagune-100">
                  <Check className="h-8 w-8 text-lagune-600" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-encre-900">Table demandée !</h2>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-encre-500">
                  Merci. Notre équipe vous rappelle rapidement pour confirmer votre table. À très
                  bientôt au Restaurant-Bar Nourabel.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/restaurant"
                    className="rounded-full bg-corail-500 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail-600"
                  >
                    Voir le restaurant
                  </Link>
                  <Link
                    to="/reserver/chambre"
                    className="rounded-full border border-encre-700/20 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-encre-700 transition-colors hover:border-terracotta-400 hover:text-terracotta-500"
                  >
                    Réserver une chambre
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-10 lg:grid-cols-5">
              <Reveal className="lg:col-span-3">
                <SectionTitle
                  align="left"
                  surtitle="Votre table"
                  title="Choisissez votre moment"
                  subtitle="Service de 12h à 15h et de 19h à 22h30, tous les jours."
                />

                <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                  <Champ label="Table souhaitée" requis className="sm:col-span-2">
                    <select
                      required
                      value={tableId}
                      onChange={(e) => setTableId(e.target.value)}
                      className={classesChamp}
                    >
                      {chargement && <option value="">Chargement…</option>}
                      {tables.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nom} — {t.emplacement} ({t.places} places)
                        </option>
                      ))}
                    </select>
                  </Champ>

                  <Champ label="Date" requis>
                    <input
                      required
                      type="date"
                      min={aujourdhuiIso()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={classesChamp}
                    />
                  </Champ>
                  <Champ label="Horaire" requis>
                    <select
                      required
                      value={heure}
                      onChange={(e) => setHeure(e.target.value)}
                      className={classesChamp}
                    >
                      {creneaux.map((c) => (
                        <option key={c} value={c}>
                          {c.replace(':', 'h')}
                        </option>
                      ))}
                    </select>
                  </Champ>

                  <Champ label="Nombre de couverts" requis>
                    <input
                      required
                      type="number"
                      min={1}
                      max={table?.places ?? 12}
                      value={couverts}
                      onChange={(e) => setCouverts(Number(e.target.value))}
                      className={classesChamp}
                    />
                  </Champ>
                  <Champ label="Nom complet" requis>
                    <input required type="text" name="nom" placeholder="Votre nom" className={classesChamp} />
                  </Champ>

                  <Champ label="Téléphone" requis>
                    <input
                      required
                      type="tel"
                      name="telephone"
                      placeholder="+225 ..."
                      className={classesChamp}
                    />
                  </Champ>
                  <Champ label="Adresse e-mail" requis>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="vous@exemple.com"
                      className={classesChamp}
                    />
                  </Champ>

                  {erreur && (
                    <p className="rounded-xl bg-corail-100 px-4 py-3 text-sm text-corail-700 sm:col-span-2">
                      {erreur}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={envoi}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-corail-500 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600 disabled:opacity-60 sm:w-auto"
                    >
                      {envoi && <Loader2 className="h-4 w-4 animate-spin" />}
                      Réserver ma table
                    </button>
                  </div>
                </form>
              </Reveal>

              <Reveal delay={150} className="lg:col-span-2">
                <div className="sticky top-28 rounded-2xl bg-white p-7 shadow-xl">
                  <h3 className="font-display text-xl font-bold text-encre-900">
                    Votre récapitulatif
                  </h3>
                  <span className="mt-3 block h-px w-12 bg-or-400" aria-hidden="true" />

                  {table ? (
                    <ul className="mt-6 space-y-4 text-sm">
                      <li className="flex items-start gap-3">
                        <Utensils className="mt-0.5 h-5 w-5 shrink-0 text-lagune-600" />
                        <span>
                          <span className="block font-semibold text-encre-900">{table.nom}</span>
                          <span className="text-encre-500">{table.places} places maximum</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lagune-600" />
                        <span className="text-encre-700">{table.emplacement}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-lagune-600" />
                        <span className="text-encre-700">
                          {heure.replace(':', 'h')} · {couverts} couvert{couverts > 1 ? 's' : ''}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <p className="mt-6 text-sm text-encre-500">Sélectionnez une table.</p>
                  )}

                  {trapPlaces && table && (
                    <p className="mt-5 rounded-xl bg-corail-100 px-4 py-3 text-xs text-corail-700">
                      Cette table accueille {table.places} personnes : choisissez une table plus
                      grande ou réduisez le nombre de couverts.
                    </p>
                  )}

                  <p className="mt-5 text-xs leading-relaxed text-encre-500">
                    Votre table est tenue 20 minutes après l'heure réservée. Règlement sur place.
                  </p>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
