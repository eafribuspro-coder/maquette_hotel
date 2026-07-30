import { useEffect, useState } from 'react'
import Seo from '../../components/Seo'
import {
  BadgeStatut,
  Carte,
  EtatVide,
  TableauResponsive,
  Td,
  Th,
  TitrePage,
} from '../../components/admin/UiAdmin'
import { listerReservationsTable, listerTables, changerStatutReservationTable } from '../../lib/db'
import type { TableResto, ReservationTable, StatutReservation } from '../../lib/types'
import { dateFr } from '../../lib/format'
import { classesChamp } from '../../components/Champ'

const filtres: { valeur: StatutReservation | 'tous'; label: string }[] = [
  { valeur: 'tous', label: 'Toutes' },
  { valeur: 'en_attente', label: 'En attente' },
  { valeur: 'confirmee', label: 'Confirmées' },
  { valeur: 'annulee', label: 'Annulées' },
]

export default function ResaTables() {
  const [reservations, setReservations] = useState<ReservationTable[]>([])
  const [tables, setTables] = useState<TableResto[]>([])
  const [filtre, setFiltre] = useState<StatutReservation | 'tous'>('tous')
  const [chargement, setChargement] = useState(true)

  const recharger = () =>
    Promise.all([listerReservationsTable(), listerTables()]).then(([rt, t]) => {
      setReservations(rt)
      setTables(t)
    })

  useEffect(() => {
    recharger().finally(() => setChargement(false))
  }, [])

  const changerStatut = async (id: string, statut: StatutReservation) => {
    await changerStatutReservationTable(id, statut)
    await recharger()
  }

  const table = (id: string) => tables.find((t) => t.id === id)
  const visibles = filtre === 'tous' ? reservations : reservations.filter((r) => r.statut === filtre)

  return (
    <>
      <Seo
        title="Réservations tables — Espace admin Nourabel"
        description="Gestion des réservations du restaurant."
      />
      <TitrePage
        titre="Réservations de tables"
        sousTitre="Les demandes du Restaurant-Bar Nourabel, à confirmer avant le service."
      />

      <Carte
        titre={`${visibles.length} réservation${visibles.length > 1 ? 's' : ''}`}
        action={
          <div className="flex flex-wrap gap-2">
            {filtres.map((f) => (
              <button
                key={f.valeur}
                type="button"
                onClick={() => setFiltre(f.valeur)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  filtre === f.valeur
                    ? 'bg-terracotta-500 text-white'
                    : 'bg-sable-200 text-encre-700 hover:bg-sable-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        {chargement ? (
          <p className="py-8 text-center text-sm text-encre-500">Chargement…</p>
        ) : visibles.length === 0 ? (
          <EtatVide message="Aucune réservation dans cette catégorie." />
        ) : (
          <TableauResponsive>
            <thead>
              <tr>
                <Th>Client</Th>
                <Th>Table</Th>
                <Th>Date & heure</Th>
                <Th className="text-center">Couverts</Th>
                <Th>Statut</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((r) => {
                const t = table(r.tableId)
                return (
                  <tr key={r.id}>
                    <Td>
                      <span className="block font-medium text-encre-900">{r.nom}</span>
                      <span className="block text-xs text-encre-500">{r.telephone}</span>
                      <span className="block text-xs text-encre-500">{r.email}</span>
                    </Td>
                    <Td>
                      <span className="block">{t?.nom ?? r.tableId}</span>
                      {t && <span className="block text-xs text-encre-500">{t.emplacement}</span>}
                    </Td>
                    <Td className="whitespace-nowrap">
                      <span className="block">{dateFr(r.date)}</span>
                      <span className="block text-xs text-encre-500">
                        à {r.heure.replace(':', 'h')}
                      </span>
                    </Td>
                    <Td className="text-center">{r.couverts}</Td>
                    <Td>
                      <BadgeStatut statut={r.statut} />
                    </Td>
                    <Td>
                      <select
                        value={r.statut}
                        onChange={(e) => changerStatut(r.id, e.target.value as StatutReservation)}
                        aria-label={`Changer le statut de la réservation de ${r.nom}`}
                        className={`${classesChamp} mt-0 min-w-[9rem] py-2 text-xs`}
                      >
                        <option value="en_attente">En attente</option>
                        <option value="confirmee">Confirmer</option>
                        <option value="annulee">Annuler</option>
                      </select>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </TableauResponsive>
        )}
      </Carte>
    </>
  )
}
