import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const intern = db.interns.findById(id)
  if (!intern) return jsonNotFound('Stagiaire non trouvé')
  const visits = db.visits.findAll(id)
  return jsonOk(visits)
}
