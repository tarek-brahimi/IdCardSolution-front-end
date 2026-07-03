import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound, jsonError } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.nin) {
      return jsonError('Missing required field: nin')
    }
    const intern = db.interns.findByNin(body.nin)
    if (!intern) {
      return jsonNotFound('Aucun stagiaire trouvé pour ce NIN')
    }
    return jsonOk(intern)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
