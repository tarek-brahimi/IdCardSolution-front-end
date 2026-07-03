'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartCard } from './chart-card'
import { useTranslation } from '@/lib/language-context'
import { useApi } from '@/hooks/use-api'
import { api } from '@/lib/api'

function DistributionChart() {
  const { t } = useTranslation()
  const { data } = useApi(() => api.getStatsDistribution())

  return (
    <ChartCard title={t('chart.distribution')}>
      <PieChart>
        <Pie
          data={data || []}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          paddingAngle={2}
        >
          {(data || []).map((entry: any) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Legend />
      </PieChart>
    </ChartCard>
  )
}

export { DistributionChart }
