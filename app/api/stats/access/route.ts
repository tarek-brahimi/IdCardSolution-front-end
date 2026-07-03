import { db } from '@/lib/data-store'
import { jsonOk } from '@/lib/api-helpers'
import type { ChartDataPoint } from '@/types'

const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

export async function GET() {
  const visits = db.visits.findAll()
  const now = new Date()

  const data: ChartDataPoint[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dateStr = d.toISOString().split('T')[0]
    const dayVisits = visits.filter((v) => v.date === dateStr)
    data.push({
      date: dayNames[d.getDay()],
      CNI: dayVisits.filter((v) => v.type === 'CNI').length,
      PERMIS: dayVisits.filter((v) => v.type === 'PERMIS').length,
      autre: dayVisits.filter((v) => v.type === 'AUTRE').length,
    })
  }

  return jsonOk(data)
}
