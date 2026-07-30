import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { useAuth, modeDemo, IDENTIFIANTS_DEMO } from '../../lib/auth'
import Seo from '../../components/Seo'
import { classesChamp } from '../../components/Champ'

export default function Connexion() {
  const { connecte, connexion } = useAuth()
  const navigate = useNavigate()
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  if (connecte) return <Navigate to="/admin" replace />

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setEnvoi(true)
    setErreur(null)
    const { erreur: err } = await connexion(
      String(form.get('email')),
      String(form.get('motDePasse')),
    )
    setEnvoi(false)
    if (err) setErreur(err)
    else navigate('/admin', { replace: true })
  }

  return (
    <>
      <Seo
        title="Connexion — Espace admin Nourabel"
        description="Accès réservé à l'équipe du Nourabel Hotel."
      />
      <div className="flex min-h-screen items-center justify-center bg-encre-900 px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center">
            <Link to="/" className="font-display text-3xl font-bold tracking-widest text-white">
              NOURABEL
            </Link>
            <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-or-300">Espace admin</p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 rounded-2xl bg-white p-8 shadow-2xl">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-corail-100">
              <Lock className="h-5 w-5 text-corail-600" />
            </span>
            <h1 className="mt-5 text-center text-xl font-bold text-encre-900">Connexion</h1>
            <p className="mt-1 text-center text-sm text-encre-500">
              Accès réservé à l'équipe de l'hôtel.
            </p>

            <label className="mt-7 block">
              <span className="text-sm font-medium text-encre-700">Adresse e-mail</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="username"
                defaultValue={modeDemo ? IDENTIFIANTS_DEMO.email : ''}
                className={classesChamp}
              />
            </label>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-encre-700">Mot de passe</span>
              <input
                required
                type="password"
                name="motDePasse"
                autoComplete="current-password"
                defaultValue={modeDemo ? IDENTIFIANTS_DEMO.motDePasse : ''}
                className={classesChamp}
              />
            </label>

            {erreur && (
              <p className="mt-5 rounded-xl bg-corail-100 px-4 py-3 text-sm text-corail-700">
                {erreur}
              </p>
            )}

            <button
              type="submit"
              disabled={envoi}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-corail-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail-600 disabled:opacity-60"
            >
              {envoi && <Loader2 className="h-4 w-4 animate-spin" />}
              Se connecter
            </button>

            {modeDemo && (
              <p className="mt-5 rounded-xl bg-sable-200 px-4 py-3 text-xs leading-relaxed text-encre-500">
                Mode démonstration : les identifiants sont déjà pré-remplis. Une fois Supabase
                configuré, la connexion utilisera les comptes réels de l'hôtel.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm">
            <Link to="/" className="text-sable-200/70 hover:text-white">
              ← Retour au site
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
