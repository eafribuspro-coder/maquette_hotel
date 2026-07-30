import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BedDouble, Check, Loader2, Users } from 'lucide-react'
import { photos } from '../assets/images'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import Champ, { classesChamp } from '../components/Champ'
import { listerChambres, creerReservationChambre } from '../lib/db'
import type { Chambre } from '../lib/types'
import { fcfa, nbNuits, aujourdhuiIso } from '../lib/format'

export default function ReserverChambre() {
  const [params] = useSearchParams()
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [chargement, setChargement] = useState(true)
  const [envoi, setEnvoi] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  const [chambreId, setChambreId] = useState(params.get('chambre') ?? '')
  const [arrivee, setArrivee] = useState(params.get('arrivee') ?? '')
  const [depart, setDepart] = useState(params.get('depart') ?? '')
  const [voyageurs, setVoyageurs] = useState(Number(params.get('voyageurs')) || 2)

  useEffect(() => {
    listerChambres()
      .then((liste) => {
        const actives = liste.filter((c) => c.active)
        setChambres(actives)
        setChambreId((actuel) => actuel || actives[0]?.id || '')
      })
      .catch(() => setErreur("Impossible de charger l'offre de chambres."))
      .finally(() => setChargement(false))
  }, [])

  const chambre = chambres.find((c) => c.id === chambreId)
  const nuits = arrivee && depart && depart > arrivee ? nbNuits(arrivee, depart) : 0
  const montant = useMemo(() => (chambre ? chambre.prix * nuits : 0), [chambre, nuits])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!chambre || nuits === 0) {
      setErreur('Vérifiez les dates : le départ doit être postérieur à l’arrivée.')
      return
    }
    const form = new FormData(e.currentTarget)
    setEnvoi(true)
    setErreur(null)
    try {
      await creerReservationChambre({
        chambreId: chambre.id,
        nom: String(form.get('nom')),
        telephone: String(form.get('telephone')),
        email: String(form.get('email')),
        arrivee,
        depart,
        voyageurs,
        montant,
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
        title="Réserver une chambre — Nourabel Hotel"
        description="Réservez votre chambre au Nourabel Hotel : choisissez vos dates, votre catégorie de chambre et recevez une confirmation de notre équipe."
      />
      <PageHero
        image={photos.facade}
        surtitle="Réservation"
        title="Réserver une chambre"
        subtitle="Choisissez vos dates et votre catégorie : nous confirmons votre séjour sous 24h."
      />

      <section className="bg-sable-100 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {envoye ? (
            <Reveal>
              <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lagune-100">
                  <Check className="h-8 w-8 text-lagune-600" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-encre-900">Demande enregistrée !</h2>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-encre-500">
                  Merci. Votre demande de séjour est arrivée à notre réception : nous vous
                  contactons sous 24h pour confirmer la disponibilité et finaliser votre
                  réservation.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/"
                    className="rounded-full bg-corail-500 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail-600"
                  >
                    Retour à l'accueil
                  </Link>
                  <Link
                    to="/reserver/table"
                    className="rounded-full border border-encre-700/20 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-encre-700 transition-colors hover:border-terracotta-400 hover:text-terracotta-500"
                  >
                    Réserver aussi une table
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-10 lg:grid-cols-5">
              {/* Formulaire */}
              <Reveal className="lg:col-span-3">
                <SectionTitle
                  align="left"
                  surtitle="Votre séjour"
                  title="Dites-nous tout"
                  subtitle="Toutes les demandes sont vérifiées par notre réception avant confirmation."
                />

                <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                  <Champ label="Catégorie de chambre" requis className="sm:col-span-2">
                    <select
                      required
                      value={chambreId}
                      onChange={(e) => setChambreId(e.target.value)}
                      className={classesChamp}
                    >
                      {chargement && <option value="">Chargement…</option>}
                      {chambres.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nom} — {fcfa(c.prix)} / nuit (jusqu'à {c.capacite} pers.)
                        </option>
                      ))}
                    </select>
                  </Champ>

                  <Champ label="Arrivée" requis>
                    <input
                      required
                      type="date"
                      min={aujourdhuiIso()}
                      value={arrivee}
                      onChange={(e) => setArrivee(e.target.value)}
                      className={classesChamp}
                    />
                  </Champ>
                  <Champ label="Départ" requis>
                    <input
                      required
                      type="date"
                      min={arrivee || aujourdhuiIso()}
                      value={depart}
                      onChange={(e) => setDepart(e.target.value)}
                      className={classesChamp}
                    />
                  </Champ>

                  <Champ label="Voyageurs" requis>
                    <input
                      required
                      type="number"
                      min={1}
                      max={chambre?.capacite ?? 9}
                      value={voyageurs}
                      onChange={(e) => setVoyageurs(Number(e.target.value))}
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
                      Envoyer ma demande
                    </button>
                  </div>
                </form>
              </Reveal>

              {/* Récapitulatif */}
              <Reveal delay={150} className="lg:col-span-2">
                <div className="sticky top-28 rounded-2xl bg-white p-7 shadow-xl">
                  <h3 className="font-display text-xl font-bold text-encre-900">
                    Votre récapitulatif
                  </h3>
                  <span className="mt-3 block h-px w-12 bg-or-400" aria-hidden="true" />

                  {chambre ? (
                    <>
                      <div className="mt-6 flex items-start gap-3">
                        <BedDouble className="mt-0.5 h-5 w-5 shrink-0 text-lagune-600" />
                        <div>
                          <p className="font-semibold text-encre-900">{chambre.nom}</p>
                          <p className="mt-1 text-sm text-encre-500">{chambre.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-sm text-encre-700">
                        <Users className="h-5 w-5 shrink-0 text-lagune-600" />
                        {voyageurs} voyageur{voyageurs > 1 ? 's' : ''} · capacité {chambre.capacite}
                      </div>

                      <dl className="mt-6 space-y-3 border-t border-encre-700/10 pt-5 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-encre-500">Prix par nuit</dt>
                          <dd className="font-medium text-encre-900">{fcfa(chambre.prix)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-encre-500">Nombre de nuits</dt>
                          <dd className="font-medium text-encre-900">{nuits || '—'}</dd>
                        </div>
                        <div className="flex justify-between border-t border-encre-700/10 pt-3">
                          <dt className="font-semibold text-encre-900">Total estimé</dt>
                          <dd className="font-display text-xl font-bold text-terracotta-500">
                            {nuits ? fcfa(montant) : '—'}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-5 text-xs leading-relaxed text-encre-500">
                        Règlement sur place à votre arrivée. Aucun prélèvement n'est effectué en
                        ligne.
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 text-sm text-encre-500">
                      Sélectionnez une catégorie de chambre pour voir le détail du tarif.
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
