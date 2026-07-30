import { useEffect, useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
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
import Champ, { classesChamp } from '../../components/Champ'
import { listerTables, enregistrerTable, supprimerTable } from '../../lib/db'
import type { TableResto } from '../../lib/types'

const tableVide: TableResto = {
  id: '',
  nom: '',
  places: 4,
  emplacement: 'Bord de plage',
  active: true,
}

const emplacements = ['Bord de plage', 'Sous la paillote', 'Bord de piscine', 'Salle climatisée']

export default function ConfigTables() {
  const [tables, setTables] = useState<TableResto[]>([])
  const [chargement, setChargement] = useState(true)
  const [edition, setEdition] = useState<TableResto | null>(null)

  const recharger = () => listerTables().then(setTables)

  useEffect(() => {
    recharger().finally(() => setChargement(false))
  }, [])

  const enregistrer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!edition) return
    await enregistrerTable({
      ...edition,
      id: edition.id || `t-${edition.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    })
    setEdition(null)
    await recharger()
  }

  const supprimer = async (table: TableResto) => {
    if (!confirm(`Supprimer « ${table.nom} » ? Cette action est définitive.`)) return
    await supprimerTable(table.id)
    await recharger()
  }

  const totalPlaces = tables.filter((t) => t.active).reduce((total, t) => total + t.places, 0)

  return (
    <>
      <Seo
        title="Configurer les tables — Espace admin Nourabel"
        description="Plan de salle du Restaurant-Bar Nourabel."
      />
      <TitrePage
        titre="Configuration des tables"
        sousTitre="Le plan de salle proposé aux clients lors de la réservation."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Tuile libelle="Tables actives" valeur={String(tables.filter((t) => t.active).length)} />
        <Tuile libelle="Capacité totale" valeur={`${totalPlaces} couverts`} />
        <Tuile
          libelle="Emplacements"
          valeur={String(new Set(tables.map((t) => t.emplacement)).size)}
        />
      </div>

      <Carte
        titre={`${tables.length} table${tables.length > 1 ? 's' : ''}`}
        action={
          <button
            type="button"
            onClick={() => setEdition({ ...tableVide })}
            className="inline-flex items-center gap-2 rounded-full bg-corail-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-corail-600"
          >
            <Plus className="h-4 w-4" />
            Nouvelle table
          </button>
        }
      >
        {chargement ? (
          <p className="py-8 text-center text-sm text-encre-500">Chargement…</p>
        ) : tables.length === 0 ? (
          <EtatVide message="Aucune table configurée. Créez la première." />
        ) : (
          <TableauResponsive>
            <thead>
              <tr>
                <Th>Table</Th>
                <Th>Emplacement</Th>
                <Th className="text-center">Places</Th>
                <Th>Sur le site</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {tables.map((t) => (
                <tr key={t.id}>
                  <Td className="font-medium text-encre-900">{t.nom}</Td>
                  <Td>{t.emplacement}</Td>
                  <Td className="text-center">{t.places}</Td>
                  <Td>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        t.active ? 'bg-lagune-100 text-lagune-700' : 'bg-encre-700/10 text-encre-500'
                      }`}
                    >
                      {t.active ? 'Réservable' : 'Indisponible'}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEdition({ ...t })}
                        aria-label={`Modifier ${t.nom}`}
                        className="rounded-lg p-2 text-encre-500 transition-colors hover:bg-sable-200 hover:text-terracotta-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => supprimer(t)}
                        aria-label={`Supprimer ${t.nom}`}
                        className="rounded-lg p-2 text-encre-500 transition-colors hover:bg-corail-100 hover:text-corail-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableauResponsive>
        )}
      </Carte>

      {edition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-encre-900/60 p-4">
          <form
            onSubmit={enregistrer}
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-encre-900">
                {edition.id ? 'Modifier la table' : 'Nouvelle table'}
              </h2>
              <button
                type="button"
                onClick={() => setEdition(null)}
                aria-label="Fermer"
                className="rounded-lg p-1.5 text-encre-500 hover:bg-sable-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Champ label="Nom de la table" requis className="sm:col-span-2">
                <input
                  required
                  type="text"
                  value={edition.nom}
                  onChange={(e) => setEdition({ ...edition, nom: e.target.value })}
                  placeholder="Table Plage 4"
                  className={classesChamp}
                />
              </Champ>
              <Champ label="Emplacement" requis>
                <select
                  required
                  value={edition.emplacement}
                  onChange={(e) => setEdition({ ...edition, emplacement: e.target.value })}
                  className={classesChamp}
                >
                  {emplacements.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </Champ>
              <Champ label="Nombre de places" requis>
                <input
                  required
                  type="number"
                  min={1}
                  max={20}
                  value={edition.places}
                  onChange={(e) => setEdition({ ...edition, places: Number(e.target.value) })}
                  className={classesChamp}
                />
              </Champ>
              <label className="flex items-center gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={edition.active}
                  onChange={(e) => setEdition({ ...edition, active: e.target.checked })}
                  className="h-4 w-4 rounded border-encre-700/30 text-corail-500"
                />
                <span className="text-sm text-encre-700">Réservable sur le site</span>
              </label>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setEdition(null)}
                className="rounded-full border border-encre-700/20 px-6 py-2.5 text-sm font-semibold text-encre-700 hover:bg-sable-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-full bg-corail-500 px-7 py-2.5 text-sm font-semibold text-white hover:bg-corail-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
