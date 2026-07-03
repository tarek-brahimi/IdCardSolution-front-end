import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonError } from '@/lib/api-helpers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? undefined
  const type = searchParams.get('type') ?? undefined
  const status = searchParams.get('status') ?? undefined
  return jsonOk(db.interns.findAll(search, type, status))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.nom || !body.prenom || !body.nin || !body.type) {
      return jsonError('Missing required fields: nom, prenom, nin, type')
    }
    const initials = (body.prenom[0] + body.nom[0]).toUpperCase()
    const intern = db.interns.create({
      initials,
      nom: body.nom,
      prenom: body.prenom,
      type: body.type,
      nin: body.nin,
      dateNaissance: body.dateNaissance ?? '',
      lieuNaissance: body.lieuNaissance ?? '',
      firstVisit: new Date().toISOString().split('T')[0],
      arriveeTime: body.arriveeTime,
    })
    return jsonOk(intern, 201)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
