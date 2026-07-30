/** Agrégations pour le tableau de bord administrateur. */
import type { FicheClient, ReservationChambre, ReservationTable } from './types'

/** Prix moyen d'un couvert au restaurant, utilisé pour estimer le CA restaurant. */
export const TICKET_MOYEN_COUVERT = 12000

export interface Indicateurs {
  caChambres: number
  caRestaurant: number
  caTotal: number
  nbResaChambres: number
  nbResaTables: number
  nbEnAttente: number
  nuiteesVendues: number
  couvertsServis: number
  panierMoyenSejour: number
}

/** Ne compte que les réservations confirmées : une demande annulée ou en attente ne fait pas de chiffre. */
export function calculerIndicateurs(
  chambres: ReservationChambre[],
  tables: ReservationTable[],
): Indicateurs {
  const chambresConfirmees = chambres.filter((r) => r.statut === 'confirmee')
  const tablesConfirmees = tables.filter((r) => r.statut === 'confirmee')

  const caChambres = chambresConfirmees.reduce((total, r) => total + r.montant, 0)
  const couvertsServis = tablesConfirmees.reduce((total, r) => total + r.couverts, 0)
  const caRestaurant = couvertsServis * TICKET_MOYEN_COUVERT

  const nuiteesVendues = chambresConfirmees.reduce((total, r) => {
    const ms = new Date(r.depart).getTime() - new Date(r.arrivee).getTime()
    return total + Math.max(1, Math.round(ms / 86_400_000))
  }, 0)

  return {
    caChambres,
    caRestaurant,
    caTotal: caChambres + caRestaurant,
    nbResaChambres: chambres.length,
    nbResaTables: tables.length,
    nbEnAttente:
      chambres.filter((r) => r.statut === 'en_attente').length +
      tables.filter((r) => r.statut === 'en_attente').length,
    nuiteesVendues,
    couvertsServis,
    panierMoyenSejour:
      chambresConfirmees.length > 0 ? Math.round(caChambres / chambresConfirmees.length) : 0,
  }
}

export interface PointMensuel {
  /** Libellé court du mois, ex. « févr. 26 ». */
  mois: string
  montant: number
}

/** Chiffre d'affaires confirmé des `nbMois` derniers mois, du plus ancien au plus récent. */
export function caParMois(
  chambres: ReservationChambre[],
  tables: ReservationTable[],
  nbMois = 6,
): PointMensuel[] {
  const points: PointMensuel[] = []
  const maintenant = new Date()

  for (let i = nbMois - 1; i >= 0; i--) {
    const debut = new Date(maintenant.getFullYear(), maintenant.getMonth() - i, 1)
    const fin = new Date(maintenant.getFullYear(), maintenant.getMonth() - i + 1, 1)
    const dansLeMois = (iso: string) => {
      const d = new Date(iso)
      return d >= debut && d < fin
    }

    const montantChambres = chambres
      .filter((r) => r.statut === 'confirmee' && dansLeMois(r.arrivee))
      .reduce((total, r) => total + r.montant, 0)
    const montantTables = tables
      .filter((r) => r.statut === 'confirmee' && dansLeMois(r.date))
      .reduce((total, r) => total + r.couverts * TICKET_MOYEN_COUVERT, 0)

    points.push({
      mois: debut.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
      montant: montantChambres + montantTables,
    })
  }
  return points
}

/** Regroupe les réservations par client (clé : téléphone, à défaut e-mail). */
export function agregerClients(
  chambres: ReservationChambre[],
  tables: ReservationTable[],
): FicheClient[] {
  const parClient = new Map<string, FicheClient>()

  const cle = (r: { telephone: string; email: string }) =>
    (r.telephone || r.email).replace(/\s/g, '').toLowerCase()

  const initier = (r: { nom: string; telephone: string; email: string }): FicheClient => ({
    nom: r.nom,
    telephone: r.telephone,
    email: r.email,
    nbReservationsChambre: 0,
    nbReservationsTable: 0,
    totalDepense: 0,
    derniereVisite: '',
  })

  for (const r of chambres) {
    const k = cle(r)
    const fiche = parClient.get(k) ?? initier(r)
    fiche.nbReservationsChambre += 1
    if (r.statut === 'confirmee') fiche.totalDepense += r.montant
    if (r.arrivee > fiche.derniereVisite) fiche.derniereVisite = r.arrivee
    parClient.set(k, fiche)
  }

  for (const r of tables) {
    const k = cle(r)
    const fiche = parClient.get(k) ?? initier(r)
    fiche.nbReservationsTable += 1
    if (r.statut === 'confirmee') fiche.totalDepense += r.couverts * TICKET_MOYEN_COUVERT
    if (r.date > fiche.derniereVisite) fiche.derniereVisite = r.date
    parClient.set(k, fiche)
  }

  return [...parClient.values()].sort((a, b) => b.totalDepense - a.totalDepense)
}
