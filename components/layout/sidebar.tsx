'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Camera,
  ClipboardList,
  Home,
  Menu,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { Avatar } from '@/components/shared/avatar'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'
import { cn } from '@/lib/utils'

function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigationItems = [
    { href: '/dashboard', label: t('nav.dashboard'), icon: Home },
    { href: '/scanner', label: t('nav.scanner'), icon: Camera },
    { href: '/stagiaires', label: t('nav.interns'), icon: Users },
    { href: '/historique', label: t('nav.history'), icon: ClipboardList },
  ]

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white shadow-lg lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-48 flex-col bg-slate-900 text-white transition-transform lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-slate-800 p-4">
          <Link href="/dashboard" className="flex justify-start pl-2">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg">
              <Image src="/logo.svg" alt="Algérie Télécom" width={80} height={10} className="object-contain" />
            </div>
          </Link>
        </div>

        <StaggerContainer className="flex-1 space-y-1 p-3">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <StaggerItem key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <div className="border-t border-slate-800 p-3">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2">
            <Avatar initials="JD" size="sm" className="bg-indigo-600 text-white" />
            <div className="flex-1 text-xs">
              <p className="font-semibold">Jean Dupont</p>
              <p className="text-xs text-slate-400">{t('sidebar.role')}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export { Sidebar }
