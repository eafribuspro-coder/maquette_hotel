import type { ReactNode } from 'react'

export const classesChamp =
  'mt-2 w-full rounded-xl border border-encre-700/15 bg-white px-4 py-3 text-sm text-encre-900 outline-none transition-colors focus:border-terracotta-400'

interface ChampProps {
  label: string
  requis?: boolean
  className?: string
  children: ReactNode
}

/** Libellé + contrôle de formulaire, mise en forme homogène sur tout le site. */
export default function Champ({ label, requis = false, className = '', children }: ChampProps) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-encre-700">
        {label}
        {requis && <span className="text-corail-600"> *</span>}
      </span>
      {children}
    </label>
  )
}
