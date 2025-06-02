'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, UsersIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { href: '/employees', icon: UsersIcon, label: 'Empleados' },
    { href: '/departments', icon: BuildingOfficeIcon, label: 'Departamentos' },
  ]

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="space-y-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-2 rounded-lg ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}