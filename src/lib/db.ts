/**
 * Couche de données unique de l'application.
 *
 * Deux modes, choisis automatiquement :
 * - SUPABASE : si VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définies
 *   (fichier .env), toutes les données vivent dans le projet Supabase
 *   (schéma dans supabase/schema.sql).
 * - DÉMO : sinon, les données vivent dans le localStorage du navigateur avec
 *   un jeu de données de départ — parfait pour les démonstrations.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type {
  Chambre,
  TableResto,
  ReservationChambre,
  ReservationTable,
  StatutReservation,
} from './types'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        global: { headers: { apikey: supabaseKey } },
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null

export const modeDemo = supabase === null

/** Diagnostic de configuration (n'expose jamais la clé, seulement sa longueur). */
export const diagnosticSupabase = {
  urlDefinie: Boolean(supabaseUrl),
  hoteUrl: supabaseUrl ? supabaseUrl.replace(/^https?:\/\//, '').split('.')[0] : null,
  cleDefinie: Boolean(supabaseKey),
  longueurCle: supabaseKey ? supabaseKey.length : 0,
  debutCle: supabaseKey ? supabaseKey.slice(0, 6) : null,
}

/**
 * Teste en direct la connexion à Supabase et renvoie un texte lisible.
 * Deux essais : via le client supabase-js, puis via un fetch brut avec la clé,
 * pour distinguer un problème de client d'un problème de clé/projet.
 */
export async function testerConnexionSupabase(): Promise<string> {
  if (!supabase || !supabaseUrl || !supabaseKey) {
    return 'Client Supabase non initialisé (mode démonstration).'
  }
  const lignes: string[] = []

  try {
    const { data, error } = await supabase.from('chambres').select('id').limit(1)
    lignes.push(
      error
        ? `supabase-js : ERREUR — ${error.message}`
        : `supabase-js : OK (${data?.length ?? 0} ligne reçue)`,
    )
  } catch (e) {
    lignes.push(`supabase-js : exception — ${String(e)}`)
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/chambres?select=id&limit=1`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    })
    const txt = await res.text()
    lignes.push(`fetch brut : HTTP ${res.status} — ${txt.slice(0, 160)}`)
  } catch (e) {
    lignes.push(`fetch brut : exception — ${String(e)}`)
  }

  return lignes.join('\n')
}

/* ------------------------------------------------------------------ */
/* Mode démo : localStorage                                            */
/* ------------------------------------------------------------------ */

const CLE_STOCKAGE = 'nourabel-donnees-v2'

interface Donnees {
  chambres: Chambre[]
  tables: TableResto[]
  reservationsChambre: ReservationChambre[]
  reservationsTable: ReservationTable[]
}

function jourRelatif(decalage: number): string {
  const d = new Date()
  d.setDate(d.getDate() + decalage)
  return d.toISOString().slice(0, 10)
}

/** Date dans un mois passé, pour que l'historique du tableau de bord soit parlant. */
function moisPasse(nbMois: number, jour: number): string {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - nbMois)
  d.setDate(jour)
  return d.toISOString().slice(0, 10)
}

function donneesInitiales(): Donnees {
  const chambres: Chambre[] = [
    {
      id: 'ch-standard',
      nom: 'Chambre Standard',
      description: 'Confortable et lumineuse, vue sur les jardins de filaos.',
      prix: 45000,
      capacite: 2,
      quantite: 12,
      active: true,
    },
    {
      id: 'ch-superieure',
      nom: 'Chambre Supérieure',
      description: 'Terrasse privée ouverte sur la piscine et ses parasols.',
      prix: 65000,
      capacite: 3,
      quantite: 8,
      active: true,
    },
    {
      id: 'ch-suite',
      nom: 'Suite Familiale',
      description: 'Deux chambres communicantes et un salon, à quelques pas du sable.',
      prix: 95000,
      capacite: 5,
      quantite: 4,
      active: true,
    },
  ]
  const tables: TableResto[] = [
    { id: 't-plage-1', nom: 'Table Plage 1', places: 4, emplacement: 'Bord de plage', active: true },
    { id: 't-plage-2', nom: 'Table Plage 2', places: 4, emplacement: 'Bord de plage', active: true },
    { id: 't-plage-3', nom: 'Table Plage 3', places: 6, emplacement: 'Bord de plage', active: true },
    { id: 't-paillote-1', nom: 'Paillote 1', places: 8, emplacement: 'Sous la paillote', active: true },
    { id: 't-paillote-2', nom: 'Paillote 2', places: 10, emplacement: 'Sous la paillote', active: true },
    { id: 't-piscine-1', nom: 'Table Piscine 1', places: 4, emplacement: 'Bord de piscine', active: true },
  ]
  const reservationsChambre: ReservationChambre[] = [
    // Historique des mois précédents
    {
      id: 'rc-h1',
      chambreId: 'ch-standard',
      nom: 'Ibrahim Traoré',
      telephone: '+225 07 12 34 56 78',
      email: 'ibrahim.traore@exemple.ci',
      arrivee: moisPasse(4, 12),
      depart: moisPasse(4, 15),
      voyageurs: 2,
      montant: 135000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 130 * 86_400_000).toISOString(),
    },
    {
      id: 'rc-h2',
      chambreId: 'ch-superieure',
      nom: 'Clarisse Yao',
      telephone: '+225 05 88 77 66 55',
      email: 'clarisse.yao@exemple.ci',
      arrivee: moisPasse(3, 8),
      depart: moisPasse(3, 12),
      voyageurs: 2,
      montant: 260000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 100 * 86_400_000).toISOString(),
    },
    {
      id: 'rc-h3',
      chambreId: 'ch-suite',
      nom: 'Famille Bamba',
      telephone: '+225 01 44 33 22 11',
      email: 'bamba.famille@exemple.ci',
      arrivee: moisPasse(2, 20),
      depart: moisPasse(2, 24),
      voyageurs: 5,
      montant: 380000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 70 * 86_400_000).toISOString(),
    },
    {
      id: 'rc-h4',
      chambreId: 'ch-standard',
      nom: 'Ibrahim Traoré',
      telephone: '+225 07 12 34 56 78',
      email: 'ibrahim.traore@exemple.ci',
      arrivee: moisPasse(1, 5),
      depart: moisPasse(1, 7),
      voyageurs: 1,
      montant: 90000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 40 * 86_400_000).toISOString(),
    },
    // Mois en cours
    {
      id: 'rc-1',
      chambreId: 'ch-suite',
      nom: 'Awa Koné',
      telephone: '+225 07 08 09 10 11',
      email: 'awa.kone@exemple.ci',
      arrivee: jourRelatif(-12),
      depart: jourRelatif(-10),
      voyageurs: 4,
      montant: 190000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    },
    {
      id: 'rc-2',
      chambreId: 'ch-standard',
      nom: 'Jean-Marc Kouassi',
      telephone: '+225 05 04 03 02 01',
      email: 'jm.kouassi@exemple.ci',
      arrivee: jourRelatif(-5),
      depart: jourRelatif(-3),
      voyageurs: 2,
      montant: 90000,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 8 * 86_400_000).toISOString(),
    },
    {
      id: 'rc-3',
      chambreId: 'ch-superieure',
      nom: 'Fatou Diabaté',
      telephone: '+225 01 02 03 04 05',
      email: 'fatou.diabate@exemple.ci',
      arrivee: jourRelatif(3),
      depart: jourRelatif(6),
      voyageurs: 2,
      montant: 195000,
      statut: 'en_attente',
      creeLe: new Date(Date.now() - 1 * 86_400_000).toISOString(),
    },
  ]
  const reservationsTable: ReservationTable[] = [
    {
      id: 'rt-h1',
      tableId: 't-plage-3',
      nom: 'Clarisse Yao',
      telephone: '+225 05 88 77 66 55',
      email: 'clarisse.yao@exemple.ci',
      date: moisPasse(3, 9),
      heure: '19:30',
      couverts: 5,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 99 * 86_400_000).toISOString(),
    },
    {
      id: 'rt-h2',
      tableId: 't-paillote-2',
      nom: 'Famille Bamba',
      telephone: '+225 01 44 33 22 11',
      email: 'bamba.famille@exemple.ci',
      date: moisPasse(2, 21),
      heure: '20:30',
      couverts: 9,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 69 * 86_400_000).toISOString(),
    },
    {
      id: 'rt-h3',
      tableId: 't-piscine-1',
      nom: 'Marc Adjé',
      telephone: '+225 07 55 44 33 22',
      email: 'marc.adje@exemple.ci',
      date: moisPasse(1, 18),
      heure: '12:30',
      couverts: 3,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 35 * 86_400_000).toISOString(),
    },
    {
      id: 'rt-1',
      tableId: 't-paillote-1',
      nom: 'Awa Koné',
      telephone: '+225 07 08 09 10 11',
      email: 'awa.kone@exemple.ci',
      date: jourRelatif(-11),
      heure: '20:00',
      couverts: 6,
      statut: 'confirmee',
      creeLe: new Date(Date.now() - 12 * 86_400_000).toISOString(),
    },
    {
      id: 'rt-2',
      tableId: 't-plage-2',
      nom: 'Serge N’Guessan',
      telephone: '+225 07 77 66 55 44',
      email: 'serge.nguessan@exemple.ci',
      date: jourRelatif(1),
      heure: '12:30',
      couverts: 4,
      statut: 'en_attente',
      creeLe: new Date().toISOString(),
    },
  ]
  return { chambres, tables, reservationsChambre, reservationsTable }
}

function lire(): Donnees {
  const brut = localStorage.getItem(CLE_STOCKAGE)
  if (brut) {
    try {
      return JSON.parse(brut) as Donnees
    } catch {
      /* données corrompues : on repart du jeu initial */
    }
  }
  const donnees = donneesInitiales()
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees))
  return donnees
}

function ecrire(donnees: Donnees): void {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees))
}

function idUnique(prefixe: string): string {
  return `${prefixe}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/* ------------------------------------------------------------------ */
/* API publique — même signature dans les deux modes                   */
/* ------------------------------------------------------------------ */

export async function listerChambres(): Promise<Chambre[]> {
  if (supabase) {
    const { data, error } = await supabase.from('chambres').select('*').order('prix')
    if (error) throw error
    return data as Chambre[]
  }
  return lire().chambres
}

export async function enregistrerChambre(chambre: Chambre): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('chambres').upsert(chambre)
    if (error) throw error
    return
  }
  const donnees = lire()
  const index = donnees.chambres.findIndex((c) => c.id === chambre.id)
  if (index >= 0) donnees.chambres[index] = chambre
  else donnees.chambres.push({ ...chambre, id: chambre.id || idUnique('ch') })
  ecrire(donnees)
}

export async function supprimerChambre(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('chambres').delete().eq('id', id)
    if (error) throw error
    return
  }
  const donnees = lire()
  donnees.chambres = donnees.chambres.filter((c) => c.id !== id)
  ecrire(donnees)
}

export async function listerTables(): Promise<TableResto[]> {
  if (supabase) {
    const { data, error } = await supabase.from('tables').select('*').order('nom')
    if (error) throw error
    return data as TableResto[]
  }
  return lire().tables
}

export async function enregistrerTable(table: TableResto): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('tables').upsert(table)
    if (error) throw error
    return
  }
  const donnees = lire()
  const index = donnees.tables.findIndex((t) => t.id === table.id)
  if (index >= 0) donnees.tables[index] = table
  else donnees.tables.push({ ...table, id: table.id || idUnique('t') })
  ecrire(donnees)
}

export async function supprimerTable(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('tables').delete().eq('id', id)
    if (error) throw error
    return
  }
  const donnees = lire()
  donnees.tables = donnees.tables.filter((t) => t.id !== id)
  ecrire(donnees)
}

export async function listerReservationsChambre(): Promise<ReservationChambre[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('reservations_chambre')
      .select('*')
      .order('creeLe', { ascending: false })
    if (error) throw error
    return data as ReservationChambre[]
  }
  return [...lire().reservationsChambre].sort((a, b) => b.creeLe.localeCompare(a.creeLe))
}

export async function creerReservationChambre(
  reservation: Omit<ReservationChambre, 'id' | 'statut' | 'creeLe'>,
): Promise<void> {
  const complete: ReservationChambre = {
    ...reservation,
    id: idUnique('rc'),
    statut: 'en_attente',
    creeLe: new Date().toISOString(),
  }
  if (supabase) {
    const { error } = await supabase.from('reservations_chambre').insert(complete)
    if (error) throw error
    return
  }
  const donnees = lire()
  donnees.reservationsChambre.push(complete)
  ecrire(donnees)
}

export async function changerStatutReservationChambre(
  id: string,
  statut: StatutReservation,
): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('reservations_chambre').update({ statut }).eq('id', id)
    if (error) throw error
    return
  }
  const donnees = lire()
  const reservation = donnees.reservationsChambre.find((r) => r.id === id)
  if (reservation) reservation.statut = statut
  ecrire(donnees)
}

export async function listerReservationsTable(): Promise<ReservationTable[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('reservations_table')
      .select('*')
      .order('creeLe', { ascending: false })
    if (error) throw error
    return data as ReservationTable[]
  }
  return [...lire().reservationsTable].sort((a, b) => b.creeLe.localeCompare(a.creeLe))
}

export async function creerReservationTable(
  reservation: Omit<ReservationTable, 'id' | 'statut' | 'creeLe'>,
): Promise<void> {
  const complete: ReservationTable = {
    ...reservation,
    id: idUnique('rt'),
    statut: 'en_attente',
    creeLe: new Date().toISOString(),
  }
  if (supabase) {
    const { error } = await supabase.from('reservations_table').insert(complete)
    if (error) throw error
    return
  }
  const donnees = lire()
  donnees.reservationsTable.push(complete)
  ecrire(donnees)
}

export async function changerStatutReservationTable(
  id: string,
  statut: StatutReservation,
): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('reservations_table').update({ statut }).eq('id', id)
    if (error) throw error
    return
  }
  const donnees = lire()
  const reservation = donnees.reservationsTable.find((r) => r.id === id)
  if (reservation) reservation.statut = statut
  ecrire(donnees)
}
