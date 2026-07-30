/** Aides de formatage partagées. */

export function fcfa(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ /g, ' ')} FCFA`
}

export function dateFr(iso: string): string {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function nbNuits(arrivee: string, depart: string): number {
  const ms = new Date(`${depart}T00:00:00`).getTime() - new Date(`${arrivee}T00:00:00`).getTime()
  return Math.max(1, Math.round(ms / 86_400_000))
}

export function aujourdhuiIso(): string {
  return new Date().toISOString().slice(0, 10)
}
