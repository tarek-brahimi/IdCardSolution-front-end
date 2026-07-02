import type { ChartDataPoint, DistributionPoint, WeekVisit, TopStagiaire } from '@/types'

export const chartData7Days: ChartDataPoint[] = [
  { date: 'Lun', CNI: 25, PERMIS: 15, autre: 5 },
  { date: 'Mar', CNI: 30, PERMIS: 18, autre: 6 },
  { date: 'Mer', CNI: 28, PERMIS: 16, autre: 4 },
  { date: 'Jeu', CNI: 35, PERMIS: 20, autre: 7 },
  { date: 'Ven', CNI: 32, PERMIS: 19, autre: 5 },
  { date: 'Sam', CNI: 15, PERMIS: 10, autre: 2 },
  { date: 'Dim', CNI: 8, PERMIS: 5, autre: 1 },
]

export const distributionData: DistributionPoint[] = [
  { name: 'CNI', value: 65, color: '#4F46E5' },
  { name: 'PERMIS', value: 28, color: '#F59E0B' },
  { name: 'Autre', value: 7, color: '#EF4444' },
]

export const weekVisits: WeekVisit[] = [
  { date: 'Lun', duree: 8.5 },
  { date: 'Mar', duree: 9 },
  { date: 'Mer', duree: 8 },
  { date: 'Jeu', duree: 8.5 },
  { date: 'Ven', duree: 9 },
  { date: 'Sam', duree: 0 },
  { date: 'Dim', duree: 0 },
]

export const topStagiaires: TopStagiaire[] = [
  { name: 'Alice Dupont', visits: 42, type: 'CNI' },
  { name: 'Jean Martin', visits: 38, type: 'PERMIS' },
  { name: 'Marie Bernard', visits: 35, type: 'CNI' },
  { name: 'Pierre Durand', visits: 32, type: 'PERMIS' },
  { name: 'Sophie Moreau', visits: 28, type: 'CNI' },
]
