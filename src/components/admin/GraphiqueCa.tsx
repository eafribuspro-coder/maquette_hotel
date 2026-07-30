import { useState } from 'react'
import type { PointMensuel } from '../../lib/stats'
import { fcfa } from '../../lib/format'

/**
 * Chiffre d'affaires mensuel — série unique, donc pas de légende :
 * le titre de la carte nomme la mesure. Les valeurs sont écrites au-dessus
 * des barres, ce qui remplace l'axe vertical.
 */
export default function GraphiqueCa({ points }: { points: PointMensuel[] }) {
  const [survol, setSurvol] = useState<number | null>(null)
  const max = Math.max(...points.map((p) => p.montant), 1)

  const compact = (montant: number) =>
    montant >= 1_000_000
      ? `${(montant / 1_000_000).toFixed(1).replace('.0', '')} M`
      : montant > 0
        ? `${Math.round(montant / 1000)} k`
        : '0'

  return (
    <div className="relative">
      <div className="flex h-56 items-end gap-2 sm:gap-4">
        {points.map((point, i) => (
          <div
            key={point.mois}
            className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            onMouseEnter={() => setSurvol(i)}
            onMouseLeave={() => setSurvol(null)}
          >
            <span className="text-[11px] font-semibold text-encre-700">
              {compact(point.montant)}
            </span>
            <div
              className={`w-full rounded-t transition-colors duration-200 ${
                survol === i ? 'bg-terracotta-600' : 'bg-terracotta-500'
              }`}
              style={{
                // 2 % minimum pour qu'un mois sans activité reste visible sur la ligne de base
                height: `${Math.max(2, (point.montant / max) * 88)}%`,
              }}
              role="presentation"
            />
          </div>
        ))}
      </div>

      {/* Ligne de base + libellés des mois */}
      <div className="mt-0 border-t border-encre-700/15" />
      <div className="mt-2 flex gap-2 sm:gap-4">
        {points.map((point) => (
          <p
            key={point.mois}
            className="min-w-0 flex-1 truncate text-center text-[11px] text-encre-500"
          >
            {point.mois}
          </p>
        ))}
      </div>

      {/* Infobulle */}
      {survol !== null && (
        <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 rounded-lg bg-encre-900 px-3 py-2 text-xs text-white shadow-lg">
          <span className="font-semibold">{points[survol].mois}</span>
          <span className="ml-2 text-or-300">{fcfa(points[survol].montant)}</span>
        </div>
      )}

      {/* Équivalent tabulaire, pour l'accessibilité */}
      <details className="mt-5">
        <summary className="cursor-pointer text-xs text-encre-500 hover:text-terracotta-500">
          Voir les valeurs sous forme de tableau
        </summary>
        <table className="mt-3 w-full text-left text-xs">
          <thead>
            <tr className="text-encre-500">
              <th className="pb-2 pr-4 font-medium">Mois</th>
              <th className="pb-2 font-medium">Chiffre d'affaires</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.mois} className="border-t border-encre-700/5">
                <td className="py-1.5 pr-4 text-encre-700">{point.mois}</td>
                <td className="py-1.5 text-encre-900">{fcfa(point.montant)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  )
}
