import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound, jsonError } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.internId) {
      return jsonError('Missing required field: internId')
    }
    const intern = db.interns.findById(body.internId)
    if (!intern) {
      return jsonNotFound('Stagiaire non trouvé')
    }

    const today = new Date().toISOString().split('T')[0]
    const todayVisits = db.visits.findAll(body.internId).filter((v) => v.date === today && !v.depart)
    if (todayVisits.length === 0) {
      return jsonNotFound('Aucune visite en cours')
    }

    const now = new Date()
    const depart = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const visit = todayVisits[0]

    const [ah, am] = visit.arrivee.split(':').map(Number)
    const [dh, dm] = depart.split(':').map(Number)
    const durationMin = (dh * 60 + dm) - (ah * 60 + am)
    const dureeH = Math.floor(durationMin / 60)
    const dureeM = durationMin % 60
    const duree = `${dureeH}h ${String(dureeM).padStart(2, '0')}m`

    const updated = db.visits.update(visit.id, { depart, duree })

    db.interns.update(intern.id, {
      status: 'depart',
      arriveeTime: undefined,
    })

    return jsonOk(updated)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
