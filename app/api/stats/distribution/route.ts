import { db } from '@/lib/data-store'
import { jsonOk } from '@/lib/api-helpers'
import type { DistributionPoint } from '@/types'

export async function GET() {
  const visits = db.visits.findAll()
  const total = visits.length || 1

  const counts = { CNI: 0, PERMIS: 0, AUTRE: 0 }
  visits.forEach((v) => {
    if (v.type in counts) counts[v.type as keyof typeof counts]++
    else counts.AUTRE++
  })

  const data: DistributionPoint[] = [
    { name: 'CNI', value: Math.round((counts.CNI / total) * 100), color: '#4F46E5' },
    { name: 'PERMIS', value: Math.round((counts.PERMIS / total) * 100), color: '#F59E0B' },
    { name: 'Autre', value: Math.round((counts.AUTRE / total) * 100), color: '#EF4444' },
  ]

  return jsonOk(data)
}
