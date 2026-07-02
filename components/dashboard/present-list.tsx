'use client'

import { LogOut } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/shared/avatar'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'
import { mockInterns } from '@/data/mock-interns'

function PresentList() {
  const { t } = useTranslation()
  const presentInterns = mockInterns.filter((intern) => intern.status === 'present')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.presentTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <StaggerContainer className="space-y-3">
          {presentInterns.map((intern) => (
            <StaggerItem key={intern.id}>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <Avatar initials={intern.initials} />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {intern.prenom} {intern.nom}
                    </p>
                    <p className="text-sm text-slate-500">{t('dashboard.arrival')}: {intern.arriveeTime}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
                  <LogOut className="h-4 w-4" />
                  {t('dashboard.checkout')}
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CardContent>
    </Card>
  )
}

export { PresentList }
