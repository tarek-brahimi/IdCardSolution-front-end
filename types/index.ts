export type CardType = 'CNI' | 'PERMIS' | 'AUTRE'

export type InternStatus = 'present' | 'depart'

export type FilterType = CardType | 'all'

export type FilterStatus = InternStatus | 'all'

export type PageId = 'dashboard' | 'scanner' | 'stagiaires' | 'profil' | 'historique' | 'statistiques' | 'parametres'

export interface Intern {
  id: string
  initials: string
  nom: string
  prenom: string
  type: CardType
  nin: string
  dateNaissance: string
  lieuNaissance: string
  firstVisit: string
  totalVisits: number
  status: InternStatus
  lastVisit: string
  arriveeTime?: string
}

export interface Visit {
  id: string
  internId: string
  stagiaire: string
  type: CardType
  arrivee: string
  depart: string | null
  duree: string
  date: string
}

export interface NavigationItem {
  id: Exclude<PageId, 'profil'>
  label: string
  icon: string
}

export interface ChartDataPoint {
  date: string
  CNI: number
  PERMIS: number
  autre: number
}

export interface DistributionPoint {
  name: string
  value: number
  color: string
}

export interface WeekVisit {
  date: string
  duree: number
}

export interface TopStagiaire {
  name: string
  visits: number
  type: CardType
}
