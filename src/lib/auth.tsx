/**
 * Authentification de l'espace administrateur.
 *
 * - Avec Supabase configuré : véritable connexion e-mail / mot de passe.
 * - En mode démo (sans Supabase) : connexion locale avec les identifiants
 *   de démonstration ci-dessous, pour pouvoir présenter l'espace admin.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase, modeDemo } from './db'

/** Identifiants utilisables uniquement en mode démo. */
export const IDENTIFIANTS_DEMO = {
  email: 'admin@nourabelhotel.com',
  motDePasse: 'nourabel2026',
}

const CLE_SESSION_DEMO = 'nourabel-admin-session'

interface AuthContexte {
  connecte: boolean
  email: string | null
  /** Devient false une fois la session initiale vérifiée. */
  chargement: boolean
  connexion: (email: string, motDePasse: string) => Promise<{ erreur?: string }>
  deconnexion: () => Promise<void>
}

const Contexte = createContext<AuthContexte | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setEmail(sessionStorage.getItem(CLE_SESSION_DEMO))
      setChargement(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null)
      setChargement(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setEmail(session?.user.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const connexion = async (mail: string, motDePasse: string): Promise<{ erreur?: string }> => {
    if (!supabase) {
      const ok =
        mail.trim().toLowerCase() === IDENTIFIANTS_DEMO.email &&
        motDePasse === IDENTIFIANTS_DEMO.motDePasse
      if (!ok) return { erreur: 'Identifiants incorrects.' }
      sessionStorage.setItem(CLE_SESSION_DEMO, IDENTIFIANTS_DEMO.email)
      setEmail(IDENTIFIANTS_DEMO.email)
      return {}
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: mail.trim(),
      password: motDePasse,
    })
    // Message brut de Supabase affiché temporairement pour diagnostiquer le login.
    if (error) return { erreur: `${error.message} (code ${error.status ?? '?'})` }
    return {}
  }

  const deconnexion = async () => {
    if (!supabase) {
      sessionStorage.removeItem(CLE_SESSION_DEMO)
      setEmail(null)
      return
    }
    await supabase.auth.signOut()
    setEmail(null)
  }

  return (
    <Contexte.Provider value={{ connecte: email !== null, email, chargement, connexion, deconnexion }}>
      {children}
    </Contexte.Provider>
  )
}

export function useAuth(): AuthContexte {
  const ctx = useContext(Contexte)
  if (!ctx) throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  return ctx
}

export { modeDemo }
