import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DepartmentsPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Departamentos</h1>
      {/* Tabla de departamentos */}
    </div>
  )
}