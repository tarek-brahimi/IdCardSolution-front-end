const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `API error ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

async function apiUpload<T>(path: string, file: File): Promise<T> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `API error ${res.status}`)
  }
  return res.json()
}

export const api = {
  listStagiaires: (params?: { search?: string; type?: string; status?: string }) => {
    const q = new URLSearchParams()
    if (params?.search) q.set('search', params.search)
    if (params?.type) q.set('type', params.type)
    if (params?.status) q.set('status', params.status)
    const qs = q.toString()
    return apiFetch<any[]>(`/api/stagiaires${qs ? '?' + qs : ''}`)
  },
  getStagiaire: (id: string) => apiFetch<any>(`/api/stagiaires/${id}`),
  createStagiaire: (data: any) => apiFetch<any>('/api/stagiaires', { method: 'POST', body: JSON.stringify(data) }),
  updateStagiaire: (id: string, data: any) => apiFetch<any>(`/api/stagiaires/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStagiaire: (id: string) => apiFetch<void>(`/api/stagiaires/${id}`, { method: 'DELETE' }),
  getProfile: (id: string) => apiFetch<any>(`/api/stagiaires/${id}/profile`),
  getStagiaireVisits: (id: string) => apiFetch<any[]>(`/api/stagiaires/${id}/visits`),
  getWeekVisits: (id: string) => apiFetch<any[]>(`/api/stagiaires/${id}/week-visits`),

  listVisits: (params?: { internId?: string; date?: string }) => {
    const q = new URLSearchParams()
    if (params?.internId) q.set('internId', params.internId)
    if (params?.date) q.set('date', params.date)
    const qs = q.toString()
    return apiFetch<any[]>(`/api/visits${qs ? '?' + qs : ''}`)
  },
  createVisit: (data: any) => apiFetch<any>('/api/visits', { method: 'POST', body: JSON.stringify(data) }),
  getVisit: (id: string) => apiFetch<any>(`/api/visits/${id}`),
  updateVisit: (id: string, data: any) => apiFetch<any>(`/api/visits/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  scan: (nin: string) => apiFetch<any>('/api/scan', { method: 'POST', body: JSON.stringify({ nin }) }),
  checkin: (internId: string) => apiFetch<any>('/api/checkin', { method: 'POST', body: JSON.stringify({ internId }) }),
  checkout: (internId: string) => apiFetch<any>('/api/checkout', { method: 'POST', body: JSON.stringify({ internId }) }),

  scanDocument: (file: File) => apiUpload<any>('/api/scan-document', file),

  getStatsToday: () => apiFetch<any>('/api/stats/today'),
  getStatsAccess: () => apiFetch<any[]>('/api/stats/access'),
  getStatsDistribution: () => apiFetch<any[]>('/api/stats/distribution'),
  getStatsTopStagiaires: () => apiFetch<any[]>('/api/stats/top-stagiaires'),

  getHealth: () => apiFetch<any>('/api/health'),
}
