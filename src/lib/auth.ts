// src/lib/auth.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function auth() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  // Aquí puedes verificar el token con tu backend si es necesario
  // Ejemplo:
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      return null
    }

    return { token }
  } catch (error) {
    return null
  }
}