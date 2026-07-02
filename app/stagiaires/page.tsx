'use client'

import { AppShell } from '@/components/layout/app-shell'
import { InternTable } from '@/components/stagiaires/intern-table'
import { FadeIn } from '@/components/shared/motion'

export default function StagiairesPage() {
  return (
    <AppShell title="Stagiaires">
      <FadeIn>
        <InternTable />
      </FadeIn>
    </AppShell>
  )
}
