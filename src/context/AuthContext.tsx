'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

type AuthContextType = {
  session: any
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      // Verificar token con el backend
      setSession({ token })
    }
  }, [])

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1 })
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