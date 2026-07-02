import type { Visit } from '@/types'

export const mockVisits: Visit[] = [
  { id: '1', internId: '1', stagiaire: 'Alice Dupont', type: 'CNI', date: '2024-01-09', arrivee: '08:30', depart: '17:45', duree: '9h 15m' },
  { id: '2', internId: '2', stagiaire: 'Jean Martin', type: 'PERMIS', date: '2024-01-09', arrivee: '09:15', depart: '17:30', duree: '8h 15m' },
  { id: '3', internId: '3', stagiaire: 'Marie Bernard', type: 'CNI', date: '2024-01-08', arrivee: '08:45', depart: '17:00', duree: '8h 15m' },
  { id: '4', internId: '1', stagiaire: 'Alice Dupont', type: 'CNI', date: '2024-01-08', arrivee: '08:30', depart: '17:45', duree: '9h 15m' },
]
