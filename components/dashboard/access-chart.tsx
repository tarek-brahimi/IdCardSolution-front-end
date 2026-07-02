'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ChartCard } from './chart-card'
import { useTranslation } from '@/lib/language-context'
import { chartData7Days } from '@/data/chart-data'

function AccessChart() {
  const { t } = useTranslation()

  return (
    <ChartCard title={t('chart.access7days')}>
      <BarChart data={chartData7Days}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Legend />
        <Bar dataKey="CNI" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="PERMIS" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        <Bar dataKey="autre" fill="#EF4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartCard>
  )
}

export { AccessChart }
