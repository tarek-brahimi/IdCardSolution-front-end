'use client'

import { AppShell } from '@/components/layout/app-shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { AccessChart } from '@/components/dashboard/access-chart'
import { DistributionChart } from '@/components/dashboard/distribution-chart'
import { PresentList } from '@/components/dashboard/present-list'
import { Users, Check, ClipboardList, Clock } from 'lucide-react'

export default function DashboardPage() {
  return (
    <AppShell title="Tableau de bord">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Total stagiaires aujourd'hui" value={45} icon={Users} />
          <StatCard label="Actuellement présents" value={12} icon={Check} />
          <StatCard label="Total visites ce mois" value={892} icon={ClipboardList} />
          <StatCard label="Durée moyenne de présence" value="8h 30m" icon={Clock} />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AccessChart />
          <DistributionChart />
        </div>
        <PresentList />
      </div>
    </AppShell>
  )
}
