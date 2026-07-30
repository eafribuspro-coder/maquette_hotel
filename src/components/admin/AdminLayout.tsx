import { useState } from 'react'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import {
  BedDouble,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Utensils,
  X,
} from 'lucide-react'
import { useAuth, modeDemo } from '../../lib/auth'
import { logo } from '../../assets/images'

const liens = [
  { to: '/admin', label: 'Tableau de bord', icone: LayoutDashboard, exact: true },
  { to: '/admin/chambres', label: 'Réservations chambres', icone: BedDouble },
  { to: '/admin/tables', label: 'Réservations tables', icone: CalendarCheck },
  { to: '/admin/clients', label: 'Clients', icone: Users },
  { to: '/admin/config-chambres', label: 'Configurer les chambres', icone: Settings },
  { to: '/admin/config-tables', label: 'Configurer les tables', icone: Utensils },
]

export default function AdminLayout() {
  const { connecte, chargement, email, deconnexion } = useAuth()
  const [menuOuvert, setMenuOuvert] = useState(false)

  if (chargement) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-encre-900 text-sable-200">
        Chargement…
      </div>
    )
  }
  if (!connecte) return <Navigate to="/admin/connexion" replace />

  const navigation = (
    <nav className="space-y-1">
      {liens.map((lien) => (
        <NavLink
          key={lien.to}
          to={lien.to}
          end={lien.exact}
          onClick={() => setMenuOuvert(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-corail-500 text-white'
                : 'text-sable-200/80 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <lien.icone className="h-[18px] w-[18px] shrink-0" />
          {lien.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-sable-100">
      {/* Barre latérale bureau */}
      <aside className="hidden w-72 shrink-0 flex-col bg-encre-900 p-6 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Nourabel" className="h-11 w-auto object-contain" />
          <div>
            <span translate="no" className="notranslate font-display text-xl font-bold tracking-widest text-white">
              NOURABEL
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-or-300">
              Espace admin
            </span>
          </div>
        </Link>
        <div className="mt-8 flex-1">{navigation}</div>
        <div className="border-t border-white/10 pt-5">
          <p className="truncate text-xs text-sable-200/60">{email}</p>
          <button
            type="button"
            onClick={deconnexion}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-sable-200/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barre supérieure mobile */}
        <header className="flex items-center justify-between bg-encre-900 px-4 py-4 lg:hidden">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Nourabel" className="h-9 w-auto object-contain" />
            <span translate="no" className="notranslate font-display text-lg font-bold tracking-widest text-white">
              NOURABEL
            </span>
          </Link>
          <button
            type="button"
            aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOuvert((o) => !o)}
            className="text-white"
          >
            {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>
        {menuOuvert && (
          <div className="bg-encre-900 px-4 pb-6 lg:hidden">
            {navigation}
            <button
              type="button"
              onClick={deconnexion}
              className="mt-3 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-sable-200/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Se déconnecter
            </button>
          </div>
        )}

        {modeDemo && (
          <p className="bg-or-300/25 px-4 py-2 text-center text-xs text-encre-700 sm:px-6">
            Mode démonstration : les données sont enregistrées dans ce navigateur uniquement.
          </p>
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
