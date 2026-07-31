/**
 * Gestion des médias (film promotionnel + photos de la galerie).
 *
 * Deux modes, comme le reste de l'application :
 * - SUPABASE : les fichiers sont téléversés dans le bucket de stockage
 *   « medias » et leurs métadonnées vivent dans la table `medias`.
 * - DÉMO : les fichiers sont convertis en data URL et rangés dans le
 *   localStorage (adapté aux photos ; une vidéo lourde peut dépasser le quota).
 */
import { supabase } from './db'
import type { Media, TypeMedia } from './types'

const BUCKET = 'medias'
const CLE_STOCKAGE = 'nourabel-medias-v1'

/* ------------------------------------------------------------------ */
/* Mode démo : localStorage                                            */
/* ------------------------------------------------------------------ */

function lireDemo(): Media[] {
  const brut = localStorage.getItem(CLE_STOCKAGE)
  if (!brut) return []
  try {
    return JSON.parse(brut) as Media[]
  } catch {
    return []
  }
}

function ecrireDemo(medias: Media[]): void {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(medias))
  } catch {
    throw new Error(
      "Le fichier est trop volumineux pour le mode démonstration. Configurez Supabase pour héberger les vidéos.",
    )
  }
}

function fichierVersDataUrl(fichier: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader()
    lecteur.onload = () => resolve(String(lecteur.result))
    lecteur.onerror = () => reject(lecteur.error)
    lecteur.readAsDataURL(fichier)
  })
}

function idMedia(): string {
  return `md-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function extension(fichier: File): string {
  const point = fichier.name.lastIndexOf('.')
  return point >= 0 ? fichier.name.slice(point + 1).toLowerCase() : 'bin'
}

/* ------------------------------------------------------------------ */
/* API publique — même signature dans les deux modes                   */
/* ------------------------------------------------------------------ */

export async function listerPhotos(): Promise<Media[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('medias')
      .select('*')
      .eq('type', 'photo')
      .order('ordre', { ascending: true })
    if (error) throw error
    return data as Media[]
  }
  return lireDemo()
    .filter((m) => m.type === 'photo')
    .sort((a, b) => a.ordre - b.ordre)
}

export async function obtenirFilm(): Promise<Media | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('medias')
      .select('*')
      .eq('type', 'film')
      .order('creeLe', { ascending: false })
      .limit(1)
    if (error) throw error
    return (data?.[0] as Media) ?? null
  }
  const films = lireDemo().filter((m) => m.type === 'film')
  return films.length ? films[films.length - 1] : null
}

async function televerser(fichier: File, dossier: TypeMedia): Promise<{ url: string; chemin: string }> {
  const chemin = `${dossier}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${extension(fichier)}`
  const { error } = await supabase!.storage
    .from(BUCKET)
    .upload(chemin, fichier, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const url = supabase!.storage.from(BUCKET).getPublicUrl(chemin).data.publicUrl
  return { url, chemin }
}

export async function ajouterPhoto(fichier: File, titre = ''): Promise<void> {
  if (supabase) {
    const { url, chemin } = await televerser(fichier, 'photo')
    const media: Media = {
      id: idMedia(),
      type: 'photo',
      url,
      chemin,
      titre,
      ordre: Date.now(),
      creeLe: new Date().toISOString(),
    }
    const { error } = await supabase.from('medias').insert(media)
    if (error) throw error
    return
  }
  const url = await fichierVersDataUrl(fichier)
  const medias = lireDemo()
  medias.push({
    id: idMedia(),
    type: 'photo',
    url,
    chemin: '',
    titre,
    ordre: Date.now(),
    creeLe: new Date().toISOString(),
  })
  ecrireDemo(medias)
}

export async function definirFilm(fichier: File): Promise<void> {
  // On ne garde qu'un seul film : on supprime l'ancien avant d'ajouter le nouveau.
  const ancien = await obtenirFilm()
  if (ancien) await supprimerMedia(ancien)

  if (supabase) {
    const { url, chemin } = await televerser(fichier, 'film')
    const media: Media = {
      id: idMedia(),
      type: 'film',
      url,
      chemin,
      titre: '',
      ordre: 0,
      creeLe: new Date().toISOString(),
    }
    const { error } = await supabase.from('medias').insert(media)
    if (error) throw error
    return
  }
  const url = await fichierVersDataUrl(fichier)
  const medias = lireDemo()
  medias.push({
    id: idMedia(),
    type: 'film',
    url,
    chemin: '',
    titre: '',
    ordre: 0,
    creeLe: new Date().toISOString(),
  })
  ecrireDemo(medias)
}

export async function supprimerMedia(media: Media): Promise<void> {
  if (supabase) {
    if (media.chemin) await supabase.storage.from(BUCKET).remove([media.chemin])
    const { error } = await supabase.from('medias').delete().eq('id', media.id)
    if (error) throw error
    return
  }
  ecrireDemo(lireDemo().filter((m) => m.id !== media.id))
}
