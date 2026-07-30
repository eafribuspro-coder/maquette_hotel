import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, Clock3, Moon, Utensils, Wallet } from 'lucide-react'
import Seo from '../../components/Seo'
import {
  BadgeStatut,
  Carte,
  EtatVide,
  TableauResponsive,
  Td,
  Th,
  TitrePage,
  Tuile,
} from '../../components/admin/UiAdmin'
import GraphiqueCa from '../../components/admin/GraphiqueCa'
import { listerReservationsChambre, listerReservationsTable, listerChambres } from '../../lib/db'
import { calculerIndicateurs, caParMois, TICKET_MOYEN_COUVERT } from '../../lib/stats'
import type { Chambre, ReservationChambre, ReservationTable } from '../../lib/types'
import { fcfa, dateFr } from '../../lib/format'

export default function Dashboard() {
  const [resaChambres, setResaChambres] = useState<ReservationChambre[]>([])
  const [resaTables, setResaTables] = useState<ReservationTable[]>([])
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    Promise.all([listerReservationsChambre(), listerReservationsTable(), listerChambres()])
      .then(([rc, rt, ch]) => {
        setResaChambres(rc)
        setResaTables(rt)
        setChambres(ch)
      })
      .finally(() => setChargement(false))
  }, [])

  const ind = calculerIndicateurs(resaChambres, resaTables)
  const points = caParMois(resaChambres, resaTables)
  const nomChambre = (id: string) => chambres.find((c) => c.id === id)?.nom ?? id

  /** Les 6 dernières demandes, chambres et tables confondues. */
  const dernieres = [
    ...resaChambres.map((r) => ({
      id: r.id,
      type: 'Chambre' as const,
      detail: nomChambre(r.chambreId),
      client: r.nom,
      quand: `${dateFr(r.arrivee)} → ${dateFr(r.depart)}`,
      montant: r.montant,
      statut: r.statut,
      creeLe: r.creeLe,
    })),
    ...resaTables.map((r) => ({
      id: r.id,
      type: 'Table' as const,
      detail: `${r.couverts} couvert${r.couverts > 1 ? 's' : ''}`,
      client: r.nom,
      quand: `${dateFr(r.date)} à ${r.heure.replace(':', 'h')}`,
      montant: r.couverts * TICKET_MOYEN_COUVERT,
      statut: r.statut,
      creeLe: r.creeLe,
    })),
  ]
    .sort((a, b) => b.creeLe.localeCompare(a.creeLe))
    .slice(0, 6)

  return (
    <>
      <Seo title="Tableau de bord — Espace admin Nourabel" description="Vue d'ensemble de l'activité." />
      <TitrePage
        titre="Tableau de bord"
        sousTitre="Vue d'ensemble de l'activité du complexe Nourabel."
      />

      {chargement ? (
        <p className="text-sm text-encre-500">Chargement des données…</p>
      ) : (
        <div className="space-y-6">
          {/* Indicateurs */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Tuile
              principale
              libelle="Chiffre d'affaires"
              valeur={fcfa(ind.caTotal)}
              detail="Réservations confirmées, toutes activités"
              icone={Wallet}
            />
            <Tuile
              libelle="CA hébergement"
              valeur={fcfa(ind.caChambres)}
              detail={`${ind.nuiteesVendues} nuitée${ind.nuiteesVendues > 1 ? 's' : ''} vendue${ind.nuiteesVendues > 1 ? 's' : ''}`}
              icone={BedDouble}
            />
            <Tuile
              libelle="CA restauration"
              valeur={fcfa(ind.caRestaurant)}
              detail={`${ind.couvertsServis} couverts × ${fcfa(TICKET_MOYEN_COUVERT)}`}
              icone={Utensils}
            />
            <Tuile
              libelle="À traiter"
              valeur={String(ind.nbEnAttente)}
              detail="Demandes en attente de confirmation"
              icone={Clock3}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* Graphique */}
            <div className="xl:col-span-2">
              <Carte titre="Chiffre d'affaires des 6 derniers mois">
                <GraphiqueCa points={points} />
              </Carte>
            </div>

            {/* Chiffres secondaires */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <Tuile
                libelle="Réservations chambres"
                valeur={String(ind.nbResaChambres)}
                detail="Depuis l'ouverture des réservations"
                icone={BedDouble}
              />
              <Tuile
                libelle="Réservations tables"
                valeur={String(ind.nbResaTables)}
                detail="Restaurant-Bar Nourabel"
                icone={Utensils}
              />
              <Tuile
                libelle="Panier moyen / séjour"
                valeur={ind.panierMoyenSejour ? fcfa(ind.panierMoyenSejour) : '—'}
                detail="Sur les séjours confirmés"
                icone={Moon}
              />
            </div>
          </div>

          {/* Dernières demandes */}
          <Carte
            titre="Dernières demandes"
            action={
              <div className="flex gap-3 text-xs font-semibold uppercase tracking-wider">
                <Link to="/admin/chambres" className="text-terracotta-500 hover:underline">
                  Chambres
                </Link>
                <Link to="/admin/tables" className="text-terracotta-500 hover:underline">
                  Tables
                </Link>
              </div>
            }
          >
            {dernieres.length === 0 ? (
              <EtatVide message="Aucune réservation pour le moment." />
            ) : (
              <TableauResponsive>
                <thead>
                  <tr>
                    <Th>Type</Th>
                    <Th>Client</Th>
                    <Th>Détail</Th>
                    <Th>Quand</Th>
                    <Th className="text-right">Montant</Th>
                    <Th>Statut</Th>
                  </tr>
                </thead>
                <tbody>
                  {dernieres.map((r) => (
                    <tr key={r.id}>
                      <Td>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-encre-500">
                          {r.type === 'Chambre' ? (
                            <BedDouble className="h-4 w-4" />
                          ) : (
                            <Utensils className="h-4 w-4" />
                          )}
                          {r.type}
                        </span>
                      </Td>
                      <Td className="font-medium text-encre-900">{r.client}</Td>
                      <Td>{r.detail}</Td>
                      <Td className="whitespace-nowrap">{r.quand}</Td>
                      <Td className="whitespace-nowrap text-right font-medium text-encre-900">
                        {fcfa(r.montant)}
                      </Td>
                      <Td>
                        <BadgeStatut statut={r.statut} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableauResponsive>
            )}
          </Carte>
        </div>
      )}
    </>
  )
}
