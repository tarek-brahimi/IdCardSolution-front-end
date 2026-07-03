import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound, jsonError } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const visit = db.visits.findById(id)
  if (!visit) return jsonNotFound('Visite non trouvée')
  return jsonOk(visit)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const updated = db.visits.update(id, body)
    if (!updated) return jsonNotFound('Visite non trouvée')
    return jsonOk(updated)
  } catch {
    return jsonError('Invalid JSON body')
  }
}
