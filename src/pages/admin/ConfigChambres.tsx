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
} from '../../components/admin/UiAdmin'
import Champ, { classesChamp } from '../../components/Champ'
import { listerChambres, enregistrerChambre, supprimerChambre } from '../../lib/db'
import type { Chambre } from '../../lib/types'
import { fcfa } from '../../lib/format'

const chambreVide: Chambre = {
  id: '',
  nom: '',
  description: '',
  prix: 50000,
  capacite: 2,
  quantite: 1,
  active: true,
}

export default function ConfigChambres() {
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [chargement, setChargement] = useState(true)
  const [edition, setEdition] = useState<Chambre | null>(null)

  const recharger = () => listerChambres().then(setChambres)

  useEffect(() => {
    recharger().finally(() => setChargement(false))
  }, [])

  const enregistrer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!edition) return
    await enregistrerChambre({
      ...edition,
      // Un nouvel enregistrement reçoit un identifiant dérivé de son nom.
      id: edition.id || `ch-${edition.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    })
    setEdition(null)
    await recharger()
  }

  const supprimer = async (chambre: Chambre) => {
    if (!confirm(`Supprimer « ${chambre.nom} » ? Cette action est définitive.`)) return
    await supprimerChambre(chambre.id)
    await recharger()
  }

  return (
    <>
      <Seo
        title="Configurer les chambres — Espace admin Nourabel"
        description="Catégories, tarifs et disponibilités des chambres."
      />
      <TitrePage
        titre="Configuration des chambres"
        sousTitre="Catégories, tarifs et capacités proposés sur le site public."
      />

      <Carte
        titre={`${chambres.length} catégorie${chambres.length > 1 ? 's' : ''}`}
        action={
          <button
            type="button"
            onClick={() => setEdition({ ...chambreVide })}
            className="inline-flex items-center gap-2 rounded-full bg-corail-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-corail-600"
          >
            <Plus className="h-4 w-4" />
            Nouvelle catégorie
          </button>
        }
      >
        {chargement ? (
          <p className="py-8 text-center text-sm text-encre-500">Chargement…</p>
        ) : chambres.length === 0 ? (
          <EtatVide message="Aucune catégorie de chambre. Créez la première." />
        ) : (
          <TableauResponsive>
            <thead>
              <tr>
                <Th>Catégorie</Th>
                <Th className="text-right">Prix / nuit</Th>
                <Th className="text-center">Capacité</Th>
                <Th className="text-center">Quantité</Th>
                <Th>Sur le site</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {chambres.map((c) => (
                <tr key={c.id}>
                  <Td>
                    <span className="block font-medium text-encre-900">{c.nom}</span>
                    <span className="block max-w-md text-xs text-encre-500">{c.description}</span>
                  </Td>
                  <Td className="whitespace-nowrap text-right font-medium text-encre-900">
                    {fcfa(c.prix)}
                  </Td>
                  <Td className="text-center">{c.capacite} pers.</Td>
                  <Td className="text-center">{c.quantite}</Td>
                  <Td>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        c.active ? 'bg-lagune-100 text-lagune-700' : 'bg-encre-700/10 text-encre-500'
                      }`}
                    >
                      {c.active ? 'Visible' : 'Masquée'}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEdition({ ...c })}
                        aria-label={`Modifier ${c.nom}`}
                        className="rounded-lg p-2 text-encre-500 transition-colors hover:bg-sable-200 hover:text-terracotta-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => supprimer(c)}
                        aria-label={`Supprimer ${c.nom}`}
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

      {/* Panneau d'édition */}
      {edition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-encre-900/60 p-4">
          <form
            onSubmit={enregistrer}
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-encre-900">
                {edition.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
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
              <Champ label="Nom de la catégorie" requis className="sm:col-span-2">
                <input
                  required
                  type="text"
                  value={edition.nom}
                  onChange={(e) => setEdition({ ...edition, nom: e.target.value })}
                  placeholder="Chambre Standard"
                  className={classesChamp}
                />
              </Champ>
              <Champ label="Description" className="sm:col-span-2">
                <textarea
                  rows={3}
                  value={edition.description}
                  onChange={(e) => setEdition({ ...edition, description: e.target.value })}
                  placeholder="Texte affiché sur le site public…"
                  className={classesChamp}
                />
              </Champ>
              <Champ label="Prix par nuit (FCFA)" requis>
                <input
                  required
                  type="number"
                  min={0}
                  step={1000}
                  value={edition.prix}
                  onChange={(e) => setEdition({ ...edition, prix: Number(e.target.value) })}
                  className={classesChamp}
                />
              </Champ>
              <Champ label="Capacité (personnes)" requis>
                <input
                  required
                  type="number"
                  min={1}
                  value={edition.capacite}
                  onChange={(e) => setEdition({ ...edition, capacite: Number(e.target.value) })}
                  className={classesChamp}
                />
              </Champ>
              <Champ label="Nombre de chambres" requis>
                <input
                  required
                  type="number"
                  min={1}
                  value={edition.quantite}
                  onChange={(e) => setEdition({ ...edition, quantite: Number(e.target.value) })}
                  className={classesChamp}
                />
              </Champ>
              <label className="flex items-center gap-3 self-end pb-3">
                <input
                  type="checkbox"
                  checked={edition.active}
                  onChange={(e) => setEdition({ ...edition, active: e.target.checked })}
                  className="h-4 w-4 rounded border-encre-700/30 text-corail-500"
                />
                <span className="text-sm text-encre-700">Visible sur le site</span>
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
