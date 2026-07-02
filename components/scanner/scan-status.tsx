import { cn } from '@/lib/utils'
import type { ScanStatus } from '@/hooks/use-scan'

const statusConfig: Record<ScanStatus, { color: string; label: string }> = {
  waiting: { color: 'bg-amber-500', label: 'En attente de scan...' },
  detected: { color: 'bg-emerald-500', label: 'Carte détectée' },
  processing: { color: 'bg-indigo-500', label: 'Traitement...' },
}

function ScanStatusIndicator({ status }: { status: ScanStatus }) {
  const config = statusConfig[status]

  return (
    <div className="flex items-center justify-center gap-2.5 rounded-lg bg-slate-100 p-4">
      <span className={cn('h-3 w-3 rounded-full', config.color)} />
      <p className="font-semibold text-slate-800">{config.label}</p>
    </div>
  )
}

export { ScanStatusIndicator }
