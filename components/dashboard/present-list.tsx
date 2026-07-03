'use client'

import { LogOut, Users } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
        {presentInterns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <Users className="mb-3 h-10 w-10" />
            <p className="text-sm font-medium">{t('interns.absent')}</p>
          </div>
        ) : (
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
                  <Button variant="destructive" size="sm">
                    <LogOut className="mr-1 h-4 w-4" />
                    {t('dashboard.checkout')}
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </CardContent>
    </Card>
  )
}

export { PresentList }
