import type { Intern, Visit } from '@/types'
import { mockInterns } from '@/data/mock-interns'
import { mockVisits } from '@/data/mock-visits'

let interns: Intern[] = [...mockInterns]
let visits: Visit[] = [...mockVisits]
let nextInternId = 4
let nextVisitId = 5

export const db = {
  interns: {
    findAll(search?: string, type?: string, status?: string) {
      let result = [...interns]
      if (search) {
        const q = search.toLowerCase()
        result = result.filter(
          (i) => i.nom.toLowerCase().includes(q) || i.prenom.toLowerCase().includes(q) || i.nin.includes(q)
        )
      }
      if (type && type !== 'all') {
        result = result.filter((i) => i.type === type)
      }
      if (status && status !== 'all') {
        result = result.filter((i) => i.status === status)
      }
      return result
    },
    findById(id: string) {
      return interns.find((i) => i.id === id) ?? null
    },
    findByNin(nin: string) {
      return interns.find((i) => i.nin === nin) ?? null
    },
    create(data: Omit<Intern, 'id' | 'totalVisits' | 'status' | 'lastVisit'>) {
      const intern: Intern = {
        ...data,
        id: String(nextInternId++),
        totalVisits: 0,
        status: 'depart',
        lastVisit: new Date().toISOString().split('T')[0],
      }
      interns.push(intern)
      return intern
    },
    update(id: string, data: Partial<Intern>) {
      const idx = interns.findIndex((i) => i.id === id)
      if (idx === -1) return null
      interns[idx] = { ...interns[idx], ...data }
      return interns[idx]
    },
    delete(id: string) {
      const idx = interns.findIndex((i) => i.id === id)
      if (idx === -1) return false
      interns.splice(idx, 1)
      return true
    },
  },

  visits: {
    findAll(internId?: string, date?: string) {
      let result = [...visits]
      if (internId) {
        result = result.filter((v) => v.internId === internId)
      }
      if (date) {
        result = result.filter((v) => v.date === date)
      }
      return result.sort((a, b) => b.date.localeCompare(a.date))
    },
    findById(id: string) {
      return visits.find((v) => v.id === id) ?? null
    },
    create(data: Omit<Visit, 'id'>) {
      const visit: Visit = { ...data, id: String(nextVisitId++) }
      visits.push(visit)
      return visit
    },
    update(id: string, data: Partial<Visit>) {
      const idx = visits.findIndex((v) => v.id === id)
      if (idx === -1) return null
      visits[idx] = { ...visits[idx], ...data }
      return visits[idx]
    },
  },
}
