'use client'

import { AppShell } from '@/components/layout/app-shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { AccessChart } from '@/components/dashboard/access-chart'
import { DistributionChart } from '@/components/dashboard/distribution-chart'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'
import { topStagiaires } from '@/data/chart-data'
import { Check, ClipboardList, Clock, BarChart3 } from 'lucide-react'

export default function StatistiquesPage() {
  return (
    <AppShell title="Statistiques">
      <StaggerContainer className="space-y-6">
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard label="Taux de présence" value="92%" icon={Check} />
            <StatCard label="Total visites" value="1,245" icon={ClipboardList} />
            <StatCard label="Durée moyenne" value="8h 24m" icon={Clock} />
            <StatCard label="Types de cartes" value="3" icon={BarChart3} />
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AccessChart />
            <DistributionChart />
          </div>
        </StaggerItem>

        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle>Top stagiaires par nombre de visites</CardTitle>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="space-y-3">
                {topStagiaires.map((stagiaire, index) => (
                  <StaggerItem key={stagiaire.name}>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50">
                      <div className="flex flex-1 items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{stagiaire.name}</p>
                          <Badge type={stagiaire.type} />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600 font-heading">{stagiaire.visits}</p>
                        <p className="text-sm text-slate-500">visites</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </AppShell>
  )
}
