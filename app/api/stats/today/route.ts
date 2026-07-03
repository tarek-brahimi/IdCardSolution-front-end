import { db } from '@/lib/data-store'
import { jsonOk } from '@/lib/api-helpers'

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const allInterns = db.interns.findAll()
  const todayVisits = db.visits.findAll(undefined, today)

  const presentNow = allInterns.filter((i) => i.status === 'present').length
  const totalToday = todayVisits.length

  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  const monthVisits = db.visits.findAll().filter((v) => {
    const d = new Date(v.date)
    return d.getMonth() === month && d.getFullYear() === year
  })

  const avgDuration = (() => {
    const durations = monthVisits
      .map((v) => {
        const match = v.duree.match(/(\d+)h\s*(\d+)?/)
        if (!match) return 0
        return parseInt(match[1]) * 60 + (parseInt(match[2]) || 0)
      })
      .filter((d) => d > 0)
    if (durations.length === 0) return '0h 00m'
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length
    const h = Math.floor(avg / 60)
    const m = Math.round(avg % 60)
    return `${h}h ${String(m).padStart(2, '0')}m`
  })()

  return jsonOk({
    totalToday,
    presentNow,
    totalMonth: monthVisits.length,
    avgDuration,
  })
}
