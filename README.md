# Nourable Hotel — Maquette de site vitrine

Maquette de site vitrine pour **NOURABLE HOTEL**, hôtel-resort en bord de plage en
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

## ⚠️ Remplacer les images placeholder par les vraies photos

Les fichiers de `src/assets/photos/` sont des **placeholders SVG** générés aux
couleurs des vraies photos (l'environnement de création n'avait pas accès aux
fichiers originaux). Pour brancher les vraies photos :

1. Déposez les `.jpg` dans `src/assets/photos/` :
   - `restaurant-plage-1.jpg` — restaurant de plage, vue rapprochée
   - `restaurant-plage-2.jpg` — restaurant de plage, vue d'ensemble
   - `piscine-1.jpg` — grande piscine, transats et pavillon rose
   - `piscine-2.jpg` — piscine en longueur
   - `facade.jpg` — façade rose du bâtiment principal
2. Dans `src/assets/images.ts`, remplacez les extensions `.svg` par `.jpg`
   dans les imports (rien d'autre à changer : tout le site passe par ce module).
3. Supprimez les `.svg` devenus inutiles.
