# Nourabel Hotel — Maquette de site vitrine

Maquette de site vitrine pour **NOURABEL HOTEL**, hôtel-resort en bord de plage en
Côte d'Ivoire. Design élégant inspiré des sites hôteliers haut de gamme : grandes
images plein écran, typographie Playfair Display / Inter, palette corail,
terracotta, turquoise et sable tirée des photos de l'hôtel.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- react-router-dom

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run preview  # prévisualiser le build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Accueil |
| `/chambres` | Chambres & Suites |
| `/restaurant` | Restaurant & Bar |
| `/loisirs` | Piscines & Loisirs |
| `/galerie` | Galerie (filtres + visionneuse) |
| `/contact` | Contact & Réservation (formulaire factice) |

## Photos

Les vraies photos de l'hôtel sont dans `src/assets/photos/` et centralisées dans
`src/assets/images.ts` : tout le site ne référence que l'objet `photos`, donc pour
changer une image il suffit de remplacer le fichier ou l'import correspondant.

## Réservations & espace administrateur

Le site comporte désormais un parcours de réservation et un espace admin.

### Parcours client (sans compte)

| Route | Rôle |
| --- | --- |
| `/reserver/chambre` | Réservation de chambre : catégorie, dates, voyageurs, coordonnées, total estimé |
| `/reserver/table` | Réservation de table : table, date, créneau, couverts, coordonnées |

La barre de réservation de l'accueil pré-remplit dates et voyageurs.

### Espace administrateur

| Route | Rôle |
| --- | --- |
| `/admin/connexion` | Connexion |
| `/admin` | Tableau de bord : chiffre d'affaires, CA hébergement / restauration, demandes à traiter, évolution sur 6 mois, dernières demandes |
| `/admin/chambres` | Réservations de chambres — confirmer / annuler |
| `/admin/tables` | Réservations de tables — confirmer / annuler |
| `/admin/clients` | Fiches clients agrégées (réservations, dépenses, dernière visite) |
| `/admin/config-chambres` | Catégories de chambres : nom, tarif, capacité, quantité, visibilité |
| `/admin/config-tables` | Plan de salle : tables, emplacements, places, disponibilité |

### Deux modes de fonctionnement

**Mode démonstration** (par défaut, sans configuration) : les données vivent dans
le `localStorage` du navigateur avec un jeu de données de départ. Identifiants
admin pré-remplis : `admin@nourabelhotel.com` / `nourabel2026`. Idéal pour
présenter l'application au client.

**Mode Supabase** (données réelles, partagées) :

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Exécutez `supabase/schema.sql` dans l'éditeur SQL du projet
   (tables, contraintes, politiques de sécurité et données de départ)
3. Créez le compte admin dans **Authentication → Users**
4. Copiez `.env.example` en `.env` et renseignez `VITE_SUPABASE_URL` et
   `VITE_SUPABASE_ANON_KEY` (Project Settings → API)

L'application détecte automatiquement la présence de ces variables : aucune
modification de code n'est nécessaire pour passer d'un mode à l'autre.

### Chiffre d'affaires

Le CA hébergement provient du montant réel des séjours confirmés. Le CA
restauration est estimé à partir du nombre de couverts confirmés multiplié par un
ticket moyen (`TICKET_MOYEN_COUVERT` dans `src/lib/stats.ts`, 12 000 FCFA par
défaut) — à remplacer par les additions réelles lorsque la caisse sera connectée.
