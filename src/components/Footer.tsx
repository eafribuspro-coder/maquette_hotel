import { Link } from 'react-router-dom'
import { logo } from '../assets/images'
import { etablissement } from '../lib/etablissement'

const quickLinks = [
  { to: '/chambres', label: 'Nos chambres' },
  { to: '/restaurant', label: 'Restaurant & Bar' },
  { to: '/loisirs', label: 'Piscines & Loisirs' },
  { to: '/galerie', label: 'Galerie photos' },
  { to: '/reserver/chambre', label: 'Réserver une chambre' },
  { to: '/reserver/table', label: 'Réserver une table' },
]

const socials = [
  {
    name: 'Facebook',
    href: '#',
    path: 'M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.97 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z',
  },
  {
    name: 'Instagram',
    href: '#',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.18 8.8 2.16 12 2.16zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.2-9.65a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
  },
  {
    name: 'WhatsApp',
    href: '#',
    path: 'M12 2a10 10 0 00-8.6 15.1L2 22l5.05-1.32A10 10 0 1012 2zm5.55 14.06c-.24.66-1.35 1.26-1.9 1.31-.5.05-1.14.07-1.84-.12-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5-4.43-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.03.9 2.18.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.13 1 2.08 1.32 2.38 1.47.3.15.47.12.64-.07.17-.2.74-.86.93-1.16.2-.3.39-.25.66-.15.27.1 1.7.8 2 .95.29.15.49.22.56.35.07.12.07.72-.17 1.41z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-encre-900 text-sable-200">
      {/* Filet doré signature */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-or-400/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Nourabel" className="h-14 w-auto object-contain" />
              <div>
                <p translate="no" className="notranslate font-display text-2xl font-bold tracking-widest text-white">
                  NOURABEL
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-or-300">
                  Hôtel · Resort · Plage
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sable-200/80">
              Un havre de paix les pieds dans le sable, entre cocotiers et océan Atlantique, en
              Côte d'Ivoire.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-corail-400 hover:bg-corail-500"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Liens rapides
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-sable-200/80 transition-colors hover:text-corail-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Coordonnées
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-sable-200/80">
              <li>{etablissement.adresse.rue}</li>
              <li>
                {etablissement.adresse.quartier} — {etablissement.adresse.ville}
              </li>
              <li>{etablissement.adresse.boitePostale}</li>
              {etablissement.telephones.map((tel) => (
                <li key={tel}>
                  <a href={`tel:${tel.replace(/\s/g, '')}`} className="hover:text-corail-300">
                    {tel}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${etablissement.email}`} className="hover:text-corail-300">
                  {etablissement.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Réservation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Réservation
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-sable-200/80">
              Réception ouverte 24h/24, 7j/7. Réservez votre séjour ou votre table en quelques
              clics.
            </p>
            <Link
              to="/reserver/chambre"
              className="mt-5 inline-block rounded-full bg-corail-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-corail-600"
            >
              Réserver une chambre
            </Link>
            <Link
              to="/reserver/table"
              className="mt-3 inline-block rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-corail-400 hover:bg-white/10"
            >
              Réserver une table
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-sable-200/60 sm:flex-row">
            <p>© 2026 {etablissement.nom}. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-corail-300">
                Mentions légales
              </a>
              <a href="#" className="hover:text-corail-300">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-corail-300">
                CGV
              </a>
              <Link to="/admin" className="hover:text-corail-300">
                Espace admin
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-sable-200/40 sm:text-left">
            RCCM : {etablissement.rccm} · {etablissement.site}
          </p>
        </div>
      </div>
    </footer>
  )
}
