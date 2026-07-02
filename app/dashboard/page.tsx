'use client'

import { AppShell } from '@/components/layout/app-shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { AccessChart } from '@/components/dashboard/access-chart'
import { DistributionChart } from '@/components/dashboard/distribution-chart'
import { PresentList } from '@/components/dashboard/present-list'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'
import { Users, Check, ClipboardList, Clock } from 'lucide-react'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <AppShell title={t('dashboard.title')}>
      <StaggerContainer className="space-y-6">
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard label={t('dashboard.totalToday')} value={45} icon={Users} />
            <StatCard label={t('dashboard.presentNow')} value={12} icon={Check} />
            <StatCard label={t('dashboard.totalMonth')} value={892} icon={ClipboardList} />
            <StatCard label={t('dashboard.avgDuration')} value="8h 30m" icon={Clock} />
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AccessChart />
            <DistributionChart />
          </div>
        </StaggerItem>
        <StaggerItem>
          <PresentList />
        </StaggerItem>
      </StaggerContainer>
    </AppShell>
  )
}
