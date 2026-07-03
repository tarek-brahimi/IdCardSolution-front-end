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

    const now = new Date()
    const arrivee = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const date = now.toISOString().split('T')[0]

    const visit = db.visits.create({
      internId: intern.id,
      stagiaire: `${intern.prenom} ${intern.nom}`,
      type: intern.type,
      date,
      arrivee,
      depart: null,
      duree: '0h 00m',
    })

    db.interns.update(intern.id, {
      status: 'present',
      lastVisit: date,
      arriveeTime: arrivee,
    })

    return jsonOk(visit, 201)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
