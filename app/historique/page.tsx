'use client'

import { AppShell } from '@/components/layout/app-shell'
import { HistoryPage } from '@/components/stagiaires/visits-table'
import { FadeIn } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'

export default function HistoriquePage() {
  const { t } = useTranslation()

  return (
    <AppShell title={t('history.title')}>
      <FadeIn>
        <HistoryPage />
      </FadeIn>
    </AppShell>
  )
}
