import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: ElementType }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-lg bg-indigo-100 p-3">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-900 font-heading">{value}</p>
      </div>
    </div>
  )
}

export { StatCard }
