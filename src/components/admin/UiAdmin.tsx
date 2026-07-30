import type { LucideIcon } from 'lucide-react'
import { CircleCheck, CircleSlash, Clock3 } from 'lucide-react'
import type { StatutReservation } from '../../lib/types'

/* ---------------------------------------------------------------- */
/* Titre de page                                                    */
/* ---------------------------------------------------------------- */

export function TitrePage({ titre, sousTitre }: { titre: string; sousTitre?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-encre-900 sm:text-3xl">{titre}</h1>
      {sousTitre && <p className="mt-2 text-sm text-encre-500">{sousTitre}</p>}
    </header>
  )
}

/* ---------------------------------------------------------------- */
/* Tuile d'indicateur                                               */
/* ---------------------------------------------------------------- */

interface TuileProps {
  libelle: string
  valeur: string
  detail?: string
  icone?: LucideIcon
  /** Met la tuile en avant (chiffre principal du tableau de bord). */
  principale?: boolean
}

export function Tuile({ libelle, valeur, detail, icone: Icone, principale = false }: TuileProps) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm ${
        principale ? 'bg-encre-900 text-white' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
            principale ? 'text-or-300' : 'text-encre-500'
          }`}
        >
          {libelle}
        </p>
        {Icone && (
          <Icone
            className={`h-5 w-5 shrink-0 ${principale ? 'text-or-300' : 'text-lagune-600'}`}
          />
        )}
      </div>
      <p
        className={`mt-4 font-display font-bold ${
          principale ? 'text-3xl text-white sm:text-4xl' : 'text-2xl text-encre-900'
        }`}
      >
        {valeur}
      </p>
      {detail && (
        <p className={`mt-1.5 text-xs ${principale ? 'text-white/70' : 'text-encre-500'}`}>
          {detail}
        </p>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Badge de statut — icône + libellé, jamais la couleur seule       */
/* ---------------------------------------------------------------- */

const stylesStatut: Record<StatutReservation, { libelle: string; classes: string; icone: LucideIcon }> = {
  en_attente: {
    libelle: 'En attente',
    classes: 'bg-or-300/30 text-encre-700',
    icone: Clock3,
  },
  confirmee: {
    libelle: 'Confirmée',
    classes: 'bg-lagune-100 text-lagune-700',
    icone: CircleCheck,
  },
  annulee: {
    libelle: 'Annulée',
    classes: 'bg-encre-700/10 text-encre-500',
    icone: CircleSlash,
  },
}

export function BadgeStatut({ statut }: { statut: StatutReservation }) {
  const { libelle, classes, icone: Icone } = stylesStatut[statut]
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${classes}`}
    >
      <Icone className="h-3.5 w-3.5" aria-hidden="true" />
      {libelle}
    </span>
  )
}

/* ---------------------------------------------------------------- */
/* Carte / tableau                                                  */
/* ---------------------------------------------------------------- */

export function Carte({
  titre,
  action,
  children,
}: {
  titre?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      {(titre || action) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {titre && <h2 className="font-display text-lg font-bold text-encre-900">{titre}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

/** Enveloppe de tableau : défile horizontalement sans faire déborder la page. */
export function TableauResponsive({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">{children}</table>
    </div>
  )
}

export function Th({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={`border-b border-encre-700/10 pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-encre-500 ${className}`}
    >
      {children}
    </th>
  )
}

export function Td({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <td className={`border-b border-encre-700/5 py-4 pr-4 align-middle text-encre-700 ${className}`}>
      {children}
    </td>
  )
}

export function EtatVide({ message }: { message: string }) {
  return <p className="py-10 text-center text-sm text-encre-500">{message}</p>
}
