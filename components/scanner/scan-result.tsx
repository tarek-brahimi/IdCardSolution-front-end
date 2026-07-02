'use client'

import { Check, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Check className="h-5 w-5" />
            {t('scanner.confirmCheckin')}
          </button>
          <button
            onClick={onCancel}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <X className="h-5 w-5" />
            {t('scanner.cancel')}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export { ScanResult }
