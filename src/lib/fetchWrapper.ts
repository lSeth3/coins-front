import { useToast } from '@/components/ToastProvider'
import Cookies from 'js-cookie'

export async function fetchWrapper<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const toast = useToast()
  const token = Cookies.get('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error en la solicitud')
    }

    return await response.json()
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Error desconocido')
    throw error
  }
}