/** Types partagés entre le site public et l'espace admin. */

export interface Chambre {
  id: string
  nom: string
  description: string
  /** Prix par nuit en FCFA. */
  prix: number
  /** Nombre de personnes maximum. */
  capacite: number
  /** Nombre de chambres de ce type dans l'hôtel. */
  quantite: number
  active: boolean
}

export interface TableResto {
  id: string
  nom: string
  places: number
  emplacement: string
  active: boolean
}

export type StatutReservation = 'en_attente' | 'confirmee' | 'annulee'

export interface ReservationChambre {
  id: string
  chambreId: string
  nom: string
  telephone: string
  email: string
  arrivee: string
  depart: string
  voyageurs: number
  /** Montant total du séjour en FCFA (nuits × prix au moment de la réservation). */
  montant: number
  statut: StatutReservation
  creeLe: string
}

export interface ReservationTable {
  id: string
  tableId: string
  nom: string
  telephone: string
  email: string
  date: string
  heure: string
  couverts: number
  statut: StatutReservation
  creeLe: string
}

/** Fiche client agrégée à partir des réservations. */
export interface FicheClient {
  nom: string
  telephone: string
  email: string
  nbReservationsChambre: number
  nbReservationsTable: number
  totalDepense: number
  derniereVisite: string
}
