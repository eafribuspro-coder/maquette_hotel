/**
 * Point d'entrée unique pour toutes les photos du site.
 * Tout le site ne référence que l'objet `photos` : pour changer une image,
 * il suffit de remplacer le fichier ou l'import correspondant ici.
 */
import logo from './photos/Logo_nourabel.jpeg'
import restaurantPlage1 from './photos/restaurant-plage-1.jpeg'
import piscine1 from './photos/piscine-1.jpeg'
import piscine2 from './photos/piscine-2.jpeg'
import piscine3 from './photos/piscine-3.jpeg'
import facade from './photos/facade.jpeg'
import jeuxEnfants from './photos/jeux-enfants.jpeg'

export { logo }

export const photos = {
  /** Restaurant de plage sous les cocotiers aux troncs orange */
  restaurantPlage1,
  /** Deuxième vue du restaurant / plage (même paillote, autre cadrage) */
  restaurantPlage2: restaurantPlage1,
  /** Grande piscine, transats et pavillon rose */
  piscine1,
  /** Piscine en longueur, rangée de transats */
  piscine2,
  /** Piscine vue depuis la plage carrelée, parasols au fond */
  piscine3,
  /** Façade rose du bâtiment principal, allée et filaos */
  facade,
  /** Aire de jeux aquatique enfants avec toboggans */
  jeuxEnfants,
} as const

export type PhotoKey = keyof typeof photos
