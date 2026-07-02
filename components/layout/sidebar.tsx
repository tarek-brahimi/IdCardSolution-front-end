'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Camera,
  ClipboardList,
  Home,
  Settings,
  Users,
} from 'lucide-react'
import { Avatar } from '@/components/shared/avatar'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: Home },
  { href: '/scanner', label: 'Scanner', icon: Camera },
  { href: '/stagiaires', label: 'Stagiaires', icon: Users },
  { href: '/historique', label: 'Historique', icon: ClipboardList },
  { href: '/statistiques', label: 'Statistiques', icon: BarChart3 },
  { href: '/parametres', label: 'Paramètres', icon: Settings },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white font-heading">
            S
          </div>
          <div>
            <p className="text-lg font-bold font-heading">Stagify</p>
            <p className="text-xs text-slate-400">Management</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-3">
          <Avatar initials="JD" size="md" className="bg-indigo-600 text-white" />
          <div className="flex-1 text-sm">
            <p className="font-semibold">Jean Dupont</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export { Sidebar }
