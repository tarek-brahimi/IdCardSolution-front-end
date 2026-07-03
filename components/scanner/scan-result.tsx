'use client'

import { Check, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/avatar'
import { InfoRow } from '@/components/shared/info-row'
import { useTranslation } from '@/lib/language-context'
import type { Intern } from '@/types'

function ScanResult({
  intern,
  onConfirm,
  onCancel,
}: {
  intern: Intern
  onConfirm: () => void
  onCancel: () => void
}) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('scanner.resultTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 p-4">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <Avatar initials={intern.initials} size="lg" />
            </div>
            <Badge type={intern.type} />
          </div>
        </div>

        <div className="space-y-1">
          <InfoRow label={t('scanner.cardType')} value={<Badge type={intern.type} />} />
          <InfoRow label={t('scanner.name')} value={intern.nom} />
          <InfoRow label={t('scanner.firstName')} value={intern.prenom} />
          <InfoRow label={t('scanner.birthDate')} value={intern.dateNaissance} />
          <InfoRow label={t('scanner.nin')} value={<span className="font-mono">{intern.nin}</span>} />
          <InfoRow label={t('scanner.ninStatus')} value={<span className="text-emerald-600">{t('scanner.ninValid')}</span>} />
          <InfoRow
            label={t('scanner.arrivalTime')}
            value={new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={onConfirm} className="flex-1" size="lg">
            <Check className="mr-2 h-5 w-5" />
            {t('scanner.confirmCheckin')}
          </Button>
          <Button onClick={onCancel} variant="destructive" className="flex-1" size="lg">
            <X className="mr-2 h-5 w-5" />
            {t('scanner.cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { ScanResult }
