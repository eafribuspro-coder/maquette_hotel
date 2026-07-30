import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Seo from '../../components/Seo'
import {
  Carte,
  EtatVide,
  TableauResponsive,
  Td,
  Th,
  TitrePage,
  Tuile,
} from '../../components/admin/UiAdmin'
import { listerReservationsChambre, listerReservationsTable } from '../../lib/db'
import { agregerClients } from '../../lib/stats'
import type { ReservationChambre, ReservationTable } from '../../lib/types'
import { fcfa, dateFr } from '../../lib/format'
import { classesChamp } from '../../components/Champ'

export default function Clients() {
  const [resaChambres, setResaChambres] = useState<ReservationChambre[]>([])
  const [resaTables, setResaTables] = useState<ReservationTable[]>([])
  const [recherche, setRecherche] = useState('')
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    Promise.all([listerReservationsChambre(), listerReservationsTable()])
      .then(([rc, rt]) => {
        setResaChambres(rc)
        setResaTables(rt)
      })
      .finally(() => setChargement(false))
  }, [])

  const clients = useMemo(() => agregerClients(resaChambres, resaTables), [resaChambres, resaTables])

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.nom.toLowerCase().includes(q) ||
        c.telephone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q),
    )
  }, [clients, recherche])

  const caTotal = clients.reduce((total, c) => total + c.totalDepense, 0)
  const fideles = clients.filter((c) => c.nbReservationsChambre + c.nbReservationsTable > 1).length

  return (
    <>
      <Seo title="Clients — Espace admin Nourabel" description="Fichier clients du complexe." />
      <TitrePage
        titre="Clients"
        sousTitre="Fiches constituées automatiquement à partir des réservations reçues."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Tuile libelle="Clients enregistrés" valeur={String(clients.length)} />
        <Tuile
          libelle="Clients fidèles"
          valeur={String(fideles)}
          detail="Au moins deux réservations"
        />
        <Tuile libelle="Dépenses cumulées" valeur={fcfa(caTotal)} detail="Réservations confirmées" />
      </div>

      <Carte
        titre={`${visibles.length} fiche${visibles.length > 1 ? 's' : ''}`}
        action={
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-encre-500" />
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Nom, téléphone ou e-mail…"
              aria-label="Rechercher un client"
              className={`${classesChamp} mt-0 pl-11`}
            />
          </div>
        }
      >
        {chargement ? (
          <p className="py-8 text-center text-sm text-encre-500">Chargement…</p>
        ) : visibles.length === 0 ? (
          <EtatVide
            message={
              recherche ? 'Aucun client ne correspond à cette recherche.' : 'Aucun client pour le moment.'
            }
          />
        ) : (
          <TableauResponsive>
            <thead>
              <tr>
                <Th>Client</Th>
                <Th>Contact</Th>
                <Th className="text-center">Chambres</Th>
                <Th className="text-center">Tables</Th>
                <Th className="text-right">Dépenses</Th>
                <Th>Dernière visite</Th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((c) => (
                <tr key={c.telephone + c.email}>
                  <Td className="font-medium text-encre-900">{c.nom}</Td>
                  <Td>
                    <span className="block text-xs text-encre-700">{c.telephone}</span>
                    <span className="block text-xs text-encre-500">{c.email}</span>
                  </Td>
                  <Td className="text-center">{c.nbReservationsChambre}</Td>
                  <Td className="text-center">{c.nbReservationsTable}</Td>
                  <Td className="whitespace-nowrap text-right font-medium text-encre-900">
                    {fcfa(c.totalDepense)}
                  </Td>
                  <Td className="whitespace-nowrap">{dateFr(c.derniereVisite)}</Td>
                </tr>
              ))}
            </tbody>
          </TableauResponsive>
        )}
      </Carte>
    </>
  )
}
