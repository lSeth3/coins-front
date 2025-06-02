import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Contenido del dashboard */}
    </div>
  )
}