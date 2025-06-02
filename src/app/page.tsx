// app/page.tsx
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function HomePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  // Si no hay token, redirigir a login
  if (!token) {
    redirect('/login')
  }

  // Si hay token, redirigir al dashboard
  redirect('/dashboard')
}