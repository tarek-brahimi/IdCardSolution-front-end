'use client'

import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/language-context'
import type { ScanStatus } from '@/hooks/use-scan'

function ScanStatusIndicator({ status }: { status: ScanStatus }) {
  const { t } = useTranslation()

  const statusConfig: Record<ScanStatus, { color: string; label: string }> = {
    waiting: { color: 'bg-amber-500', label: t('scanner.status.waiting') },
    detected: { color: 'bg-emerald-500', label: t('scanner.status.detected') },
    processing: { color: 'bg-indigo-500', label: t('scanner.status.processing') },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center justify-center gap-2.5 rounded-lg bg-slate-100 p-4">
      <span className={cn('h-3 w-3 rounded-full', config.color)} />
      <p className="font-semibold text-slate-800">{config.label}</p>
    </div>
  )
}

export { ScanStatusIndicator }
