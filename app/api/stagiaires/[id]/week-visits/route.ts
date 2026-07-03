import { NextRequest } from 'next/server'
import { db } from '@/lib/data-store'
import { jsonOk, jsonNotFound } from '@/lib/api-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const intern = db.interns.findById(id)
  if (!intern) return jsonNotFound('Stagiaire non trouvé')

  const visits = db.visits.findAll(id)
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekVisits = visits
    .filter((v) => new Date(v.date) >= weekAgo)
    .map((v) => ({
      date: v.date,
      duree: parseFloat(v.duree.replace('h', '').replace('m', '').split(' ')[0]) || 0,
    }))

  return jsonOk(weekVisits)
}
