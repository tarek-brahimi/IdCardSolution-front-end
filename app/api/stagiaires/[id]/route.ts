import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound, jsonError } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const intern = db.interns.findById(id)
  if (!intern) return jsonNotFound('Stagiaire non trouvé')
  return jsonOk(intern)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const updated = db.interns.update(id, body)
    if (!updated) return jsonNotFound('Stagiaire non trouvé')
    return jsonOk(updated)
  } catch {
    return jsonError('Invalid JSON body')
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deleted = db.interns.delete(id)
  if (!deleted) return jsonNotFound('Stagiaire non trouvé')
  return new Response(null, { status: 204 })
}
