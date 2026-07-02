'use client'

import { AppShell } from '@/components/layout/app-shell'
import { HistoryPage } from '@/components/stagiaires/visits-table'
import { FadeIn } from '@/components/shared/motion'

export default function HistoriquePage() {
  return (
    <AppShell title="Historique">
      <FadeIn>
        <HistoryPage />
      </FadeIn>
    </AppShell>
  )
}
