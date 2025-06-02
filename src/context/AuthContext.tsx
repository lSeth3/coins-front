'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

type AuthContextType = {
  session: { token: string } | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ token: string } | null>(null)
  const router = useRouter()

  // Al montar el componente, eliminamos el token para forzar logout al refrescar
  useEffect(() => {
    Cookies.remove('token')
    setSession(null)
  }, [])

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1 }) // Cookie válida 1 día
    setSession({ token })
    router.push('/dashboard')
  }

  const logout = () => {
    Cookies.remove('token')
    setSession(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useSession() {
  return useContext(AuthContext)
}