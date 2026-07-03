import { db } from '@/lib/data-store'
import { jsonOk } from '@/lib/api-helpers'
import type { TopStagiaire } from '@/types'

export async function GET() {
  const interns = db.interns.findAll()
  const visits = db.visits.findAll()

  const visitCounts = new Map<string, number>()
  visits.forEach((v) => {
    visitCounts.set(v.internId, (visitCounts.get(v.internId) ?? 0) + 1)
  })

  const data: TopStagiaire[] = interns
    .map((i) => ({
      name: `${i.prenom} ${i.nom}`,
      visits: visitCounts.get(i.id) ?? 0,
      type: i.type,
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5)

  return jsonOk(data)
}
