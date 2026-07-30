import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Minus, Plus, Users } from 'lucide-react'

/** Barre de réservation superposée au bas du hero : pré-remplit la page de réservation. */
export default function BookingBar() {
  const navigate = useNavigate()
  const today = new Date().toISOString().slice(0, 10)
  const [arrivee, setArrivee] = useState('')
  const [depart, setDepart] = useState('')
  const [adultes, setAdultes] = useState(2)
  const [enfants, setEnfants] = useState(0)
  const [guestsOpen, setGuestsOpen] = useState(false)

  const rechercher = () => {
    const params = new URLSearchParams()
    if (arrivee) params.set('arrivee', arrivee)
    if (depart) params.set('depart', depart)
    params.set('voyageurs', String(adultes + enfants))
    navigate(`/reserver/chambre?${params.toString()}`)
  }

  const compteur = (
    label: string,
    valeur: number,
    setValeur: (n: number) => void,
    min: number,
  ) => (
    <div className="flex items-center justify-between gap-6">
      <span className="text-sm text-encre-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Retirer un ${label.toLowerCase().slice(0, -1)}`}
          onClick={() => setValeur(Math.max(min, valeur - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-encre-700/20 text-encre-700 transition-colors hover:border-terracotta-400 hover:text-terracotta-500"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-encre-900">{valeur}</span>
        <button
          type="button"
          aria-label={`Ajouter un ${label.toLowerCase().slice(0, -1)}`}
          onClick={() => setValeur(Math.min(9, valeur + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-encre-700/20 text-encre-700 transition-colors hover:border-terracotta-400 hover:text-terracotta-500"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="relative z-20 mx-auto -mt-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl bg-white p-5 shadow-2xl sm:-mt-16 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <label className="block">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-encre-500">
            <CalendarDays className="h-4 w-4 text-terracotta-500" /> Arrivée
          </span>
          <input
            type="date"
            min={today}
            value={arrivee}
            onChange={(e) => setArrivee(e.target.value)}
            className="mt-2 w-full rounded-xl border border-encre-700/15 px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
          />
        </label>

        <label className="block">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-encre-500">
            <CalendarDays className="h-4 w-4 text-terracotta-500" /> Départ
          </span>
          <input
            type="date"
            min={arrivee || today}
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="mt-2 w-full rounded-xl border border-encre-700/15 px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta-400"
          />
        </label>

        <div className="relative">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-encre-500">
            <Users className="h-4 w-4 text-terracotta-500" /> Voyageurs
          </span>
          <button
            type="button"
            onClick={() => setGuestsOpen((o) => !o)}
            className="mt-2 w-full rounded-xl border border-encre-700/15 px-4 py-3 text-left text-sm transition-colors hover:border-terracotta-400"
          >
            {adultes} adulte{adultes > 1 ? 's' : ''}
            {enfants > 0 && `, ${enfants} enfant${enfants > 1 ? 's' : ''}`}
          </button>
          {guestsOpen && (
            <div className="absolute inset-x-0 top-full z-30 mt-2 space-y-4 rounded-xl border border-encre-700/10 bg-white p-5 shadow-xl">
              {compteur('Adultes', adultes, setAdultes, 1)}
              {compteur('Enfants', enfants, setEnfants, 0)}
              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="w-full rounded-full bg-sable-200 py-2 text-sm font-semibold text-encre-700 transition-colors hover:bg-sable-300"
              >
                Valider
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={rechercher}
          className="rounded-xl bg-corail-500 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-corail-600"
        >
          Réserver maintenant
        </button>
      </div>
    </div>
  )
}
