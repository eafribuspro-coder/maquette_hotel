/**
 * Point d'entrée unique pour toutes les photos du site.
 *
 * ⚠️ Les fichiers .svg de `photos/` sont des PLACEHOLDERS générés aux couleurs
 * des vraies photos. Pour utiliser les vraies photos : déposez les .jpg dans
 * `src/assets/photos/` et mettez à jour les imports ci-dessous
 * (ex. `./photos/facade.jpg` au lieu de `./photos/facade.svg`).
 * Le reste du site ne référence que l'objet `photos`.
 */
import restaurantPlage1 from './photos/restaurant-plage-1.svg'
import restaurantPlage2 from './photos/restaurant-plage-2.svg'
import piscine1 from './photos/piscine-1.svg'
import piscine2 from './photos/piscine-2.svg'
import facade from './photos/facade.svg'
import jeuxEnfants from './photos/jeux-enfants.svg'

export const photos = {
  /** Restaurant de plage, cocotiers aux troncs orange, vue rapprochée */
  restaurantPlage1,
  /** Restaurant de plage, longue galerie vue d'ensemble */
  restaurantPlage2,
  /** Grande piscine, transats et parasols, pavillon rose */
  piscine1,
  /** Piscine en longueur, rangée de transats */
  piscine2,
  /** Façade rose du bâtiment principal, allée et filaos */
  facade,
  /** Aire de jeux aquatique enfants avec toboggans */
  jeuxEnfants,
} as const

export type PhotoKey = keyof typeof photos
