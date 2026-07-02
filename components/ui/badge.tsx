import { cn } from '@/lib/utils'
import type { CardType, InternStatus } from '@/types'

const cardColors: Record<CardType, string> = {
  CNI: 'bg-indigo-100 text-indigo-800',
  PERMIS: 'bg-amber-100 text-amber-800',
  AUTRE: 'bg-red-100 text-red-800',
}

function Badge({ type, className }: { type: CardType; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', cardColors[type], className)}>
      {type}
    </span>
  )
}

function StatusBadge({ status }: { status: InternStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
      status === 'present' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
    )}>
      <span className={cn(
        'h-2 w-2 rounded-full',
        status === 'present' ? 'bg-emerald-500' : 'bg-slate-400'
      )} />
      {status === 'present' ? 'Présent' : 'Parti'}
    </span>
  )
}

export { Badge, StatusBadge }
