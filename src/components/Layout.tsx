'use client';

import { Sidebar } from '@/components/Sidebar';
import { ToastProvider } from '@/components/ToastProvider';
import { useSession } from '@/context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();

  return (
    <div className="flex h-screen">
      {session && <Sidebar />}
      <div className="flex-1 overflow-auto">
        <ToastProvider />
        <main className="p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
