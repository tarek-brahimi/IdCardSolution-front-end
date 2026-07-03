import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonError } from '@/lib/api-helpers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const internId = searchParams.get('internId') ?? undefined
  const date = searchParams.get('date') ?? undefined
  return jsonOk(db.visits.findAll(internId, date))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.internId || !body.stagiaire || !body.arrivee) {
      return jsonError('Missing required fields: internId, stagiaire, arrivee')
    }
    const visit = db.visits.create({
      internId: body.internId,
      stagiaire: body.stagiaire,
      type: body.type ?? 'CNI',
      date: body.date ?? new Date().toISOString().split('T')[0],
      arrivee: body.arrivee,
      depart: null,
      duree: '0h 00m',
    })
    return jsonOk(visit, 201)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
