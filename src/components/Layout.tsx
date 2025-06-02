'use client'

import { Sidebar } from '@/components/Sidebar'
import { ToastProvider } from '@/components/ToastProvider'
import { useSession } from '@/context/AuthContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useSession()

  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ToastProvider />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}