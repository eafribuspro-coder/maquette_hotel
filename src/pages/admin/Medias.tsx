import { useEffect, useRef, useState } from 'react'
import { Film, ImagePlus, Loader2, Trash2, Upload } from 'lucide-react'
import type { Media } from '../../lib/types'
import {
  ajouterPhoto,
  definirFilm,
  listerPhotos,
  obtenirFilm,
  supprimerMedia,
} from '../../lib/medias'
import { modeDemo } from '../../lib/db'
import { TitrePage, Carte, EtatVide } from '../../components/admin/UiAdmin'

export default function Medias() {
  const [film, setFilm] = useState<Media | null>(null)
  const [photos, setPhotos] = useState<Media[]>([])
  const [chargement, setChargement] = useState(true)
  const [envoiFilm, setEnvoiFilm] = useState(false)
  const [envoiPhotos, setEnvoiPhotos] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  const champFilm = useRef<HTMLInputElement>(null)
  const champPhotos = useRef<HTMLInputElement>(null)

  const recharger = async () => {
    const [f, p] = await Promise.all([obtenirFilm(), listerPhotos()])
    setFilm(f)
    setPhotos(p)
    setChargement(false)
  }

  useEffect(() => {
    recharger().catch((e) => {
      setErreur(String(e instanceof Error ? e.message : e))
      setChargement(false)
    })
  }, [])

  const onFilm = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fichier = e.target.files?.[0]
    if (!fichier) return
    setErreur(null)
    setEnvoiFilm(true)
    try {
      await definirFilm(fichier)
      await recharger()
    } catch (err) {
      setErreur(err instanceof Error ? err.message : String(err))
    } finally {
      setEnvoiFilm(false)
      if (champFilm.current) champFilm.current.value = ''
    }
  }

  const onPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fichiers = Array.from(e.target.files ?? [])
    if (!fichiers.length) return
    setErreur(null)
    setEnvoiPhotos(true)
    try {
      for (const fichier of fichiers) await ajouterPhoto(fichier)
      await recharger()
    } catch (err) {
      setErreur(err instanceof Error ? err.message : String(err))
    } finally {
      setEnvoiPhotos(false)
      if (champPhotos.current) champPhotos.current.value = ''
    }
  }

  const supprimer = async (media: Media) => {
    if (!confirm('Supprimer ce média définitivement ?')) return
    setErreur(null)
    try {
      await supprimerMedia(media)
      await recharger()
    } catch (err) {
      setErreur(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <>
      <TitrePage
        titre="Médias du site"
        sousTitre="Ajoutez le film promotionnel et les photos affichés sur le site public."
      />

      {modeDemo && (
        <p className="mb-6 rounded-xl bg-or-300/25 px-4 py-3 text-sm text-encre-700">
          Mode démonstration : les médias sont enregistrés dans ce navigateur uniquement. Les
          vidéos volumineuses ne pourront pas être stockées — configurez Supabase pour cela.
        </p>
      )}

      {erreur && (
        <p className="mb-6 rounded-xl bg-corail-100 px-4 py-3 text-sm text-corail-700">{erreur}</p>
      )}

      {chargement ? (
        <p className="py-10 text-center text-sm text-encre-500">Chargement…</p>
      ) : (
        <div className="space-y-8">
          {/* -------- Film promotionnel -------- */}
          <Carte
            titre="Film promotionnel"
            action={
              <button
                type="button"
                onClick={() => champFilm.current?.click()}
                disabled={envoiFilm}
                className="inline-flex items-center gap-2 rounded-full bg-corail-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-corail-600 disabled:opacity-60"
              >
                {envoiFilm ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {film ? 'Remplacer le film' : 'Ajouter un film'}
              </button>
            }
          >
            <input
              ref={champFilm}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={onFilm}
              className="hidden"
            />
            {film ? (
              <div className="space-y-4">
                <video
                  src={film.url}
                  controls
                  className="aspect-video w-full max-w-2xl rounded-xl bg-encre-900"
                />
                <button
                  type="button"
                  onClick={() => supprimer(film)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-corail-600 hover:text-corail-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer le film
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-encre-700/15 py-12 text-center">
                <Film className="h-8 w-8 text-encre-500/60" />
                <p className="text-sm text-encre-500">
                  Aucun film pour le moment. Formats acceptés : MP4, WebM, MOV.
                </p>
              </div>
            )}
          </Carte>

          {/* -------- Photos de la galerie -------- */}
          <Carte
            titre={`Photos de la galerie${photos.length ? ` (${photos.length})` : ''}`}
            action={
              <button
                type="button"
                onClick={() => champPhotos.current?.click()}
                disabled={envoiPhotos}
                className="inline-flex items-center gap-2 rounded-full bg-corail-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-corail-600 disabled:opacity-60"
              >
                {envoiPhotos ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                Ajouter des photos
              </button>
            }
          >
            <input
              ref={champPhotos}
              type="file"
              accept="image/*"
              multiple
              onChange={onPhotos}
              className="hidden"
            />
            {photos.length === 0 ? (
              <EtatVide message="Aucune photo ajoutée. Les photos apparaîtront dans la galerie du site public." />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative overflow-hidden rounded-xl">
                    <img
                      src={photo.url}
                      alt={photo.titre || 'Photo de la galerie'}
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => supprimer(photo)}
                      aria-label="Supprimer la photo"
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-encre-900/70 text-white opacity-0 transition-opacity hover:bg-corail-500 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Carte>
        </div>
      )}
    </>
  )
}
