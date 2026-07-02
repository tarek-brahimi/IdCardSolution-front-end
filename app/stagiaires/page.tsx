'use client'

import { AppShell } from '@/components/layout/app-shell'
import { InternTable } from '@/components/stagiaires/intern-table'
import { FadeIn } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'

export default function StagiairesPage() {
  const { t } = useTranslation()

  return (
    <AppShell title={t('interns.title')}>
      <FadeIn>
        <InternTable />
      </FadeIn>
    </AppShell>
  )
}
