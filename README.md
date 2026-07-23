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

## Photos

Les vraies photos de l'hôtel sont dans `src/assets/photos/` et centralisées dans
`src/assets/images.ts` : tout le site ne référence que l'objet `photos`, donc pour
changer une image il suffit de remplacer le fichier ou l'import correspondant.
