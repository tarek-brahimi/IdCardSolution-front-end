import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const intern = db.interns.findById(id)
  if (!intern) return jsonNotFound('Stagiaire non trouvé')

  const internVisits = db.visits.findAll(id)
  const totalVisits = internVisits.length
  const firstVisit = internVisits.length > 0 ? internVisits[internVisits.length - 1].date : intern.firstVisit

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekVisits = internVisits
    .filter((v) => new Date(v.date) >= weekAgo)
    .map((v) => ({
      date: v.date,
      duree: parseFloat(v.duree.replace('h', '').replace('m', '').split(' ')[0]) || 0,
    }))

  const avgArrival = internVisits.length > 0
    ? (() => {
        const times = internVisits.map((v) => {
          const [h, m] = v.arrivee.split(':').map(Number)
          return h * 60 + m
        })
        const avg = times.reduce((a, b) => a + b, 0) / times.length
        const h = Math.floor(avg / 60)
        const m = Math.round(avg % 60)
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      })()
    : '--:--'

  return jsonOk({
    ...intern,
    totalVisits,
    firstVisit,
    weekVisits,
    avgArrival,
  })
}
