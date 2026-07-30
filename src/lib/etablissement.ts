/**
 * Coordonnées et informations légales de l'établissement.
 * Source : fiche fournie par le client (à confirmer avant mise en production).
 */
export const etablissement = {
  nom: 'Nourabel Hotel',
  nomComplexe: 'Complexe Nourabel',
  nomRestaurant: 'Restaurant-Bar Nourabel',
  site: 'nourabelhotel.com',
  email: 'contact@nourabelhotel.com',
  telephones: ['+225 07 67 05 11 11', '+225 01 01 01 78 43'],
  /** Numéro utilisé pour les liens tel: et WhatsApp. */
  telephonePrincipalBrut: '+2250767051111',
  adresse: {
    quartier: 'Port-Bouët, Anani',
    rue: 'Ancienne route de Bassam',
    ville: 'Abidjan',
    pays: "Côte d'Ivoire",
    boitePostale: '26 BP 1091 Abidjan 26',
  },
  rccm: 'CI-ABJ-03-2018-B12-18683',
  /** Requête de la carte intégrée. */
  requeteCarte: "Ancienne route de Bassam, Port-Bou%C3%ABt, Abidjan, C%C3%B4te d'Ivoire",
} as const

export const adresseCourte = `${etablissement.adresse.rue}, ${etablissement.adresse.quartier}`
export const adresseComplete = `${etablissement.adresse.rue}, ${etablissement.adresse.quartier} — ${etablissement.adresse.ville}, ${etablissement.adresse.pays}`
