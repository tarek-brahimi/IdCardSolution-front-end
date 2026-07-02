'use client'

import { AppShell } from '@/components/layout/app-shell'
import { Settings } from 'lucide-react'
import { FadeIn } from '@/components/shared/motion'

export default function ParametresPage() {
  return (
    <AppShell title="Paramètres">
      <FadeIn>
        <div className="py-12 text-center text-slate-500">
          <Settings className="mx-auto mb-4 h-12 w-12 opacity-40" />
          <p className="text-lg font-medium">Section Paramètres</p>
          <p className="text-sm">À venir</p>
        </div>
      </FadeIn>
    </AppShell>
  )
}
