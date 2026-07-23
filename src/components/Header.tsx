import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/chambres', label: 'Chambres' },
  { to: '/restaurant', label: 'Restaurant & Bar' },
  { to: '/loisirs', label: 'Piscines & Loisirs' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'FR' | 'EN'>('FR')
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  // Sur la page d'accueil le header est transparent au-dessus du hero
  const solid = scrolled || menuOpen || pathname !== '/'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-sable-100/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span
            className={`font-display text-2xl font-bold tracking-widest transition-colors ${
              solid ? 'text-encre-900' : 'text-white'
            }`}
          >
            NOURABEL
          </span>
          <span
            className={`hidden text-xs font-medium uppercase tracking-[0.3em] sm:inline ${
              solid ? 'text-terracotta-500' : 'text-corail-200'
            }`}
          >
            Hôtel
          </span>
        </Link>

        {/* Navigation bureau */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `link-underline whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.15em] transition-colors ${
                  isActive
                    ? solid
                      ? 'text-terracotta-500'
                      : 'text-or-300'
                    : solid
                      ? 'text-encre-700 hover:text-terracotta-500'
                      : 'text-white/90 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Sélecteur de langue (visuel uniquement) */}
          <div
            className={`hidden overflow-hidden rounded-full border text-xs font-semibold sm:flex ${
              solid ? 'border-encre-700/30' : 'border-white/50'
            }`}
          >
            {(['FR', 'EN'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 transition-colors ${
                  lang === l
                    ? 'bg-terracotta-500 text-white'
                    : solid
                      ? 'text-encre-700 hover:bg-encre-700/10'
                      : 'text-white hover:bg-white/20'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden rounded-full bg-corail-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-corail-600 hover:shadow-xl sm:inline-block"
          >
            Réserver maintenant
          </Link>

          {/* Bouton menu mobile */}
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen((o) => !o)}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden ${
              solid ? 'text-encre-900' : 'text-white'
            }`}
          >
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-6 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="border-t border-encre-700/10 bg-sable-100 px-4 pb-6 pt-2 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-encre-700/10 py-3 text-sm font-medium uppercase tracking-wide ${
                  isActive ? 'text-terracotta-500' : 'text-encre-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 block rounded-full bg-corail-500 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Réserver maintenant
          </Link>
        </nav>
      )}
    </header>
  )
}
