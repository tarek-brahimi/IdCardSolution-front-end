'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { useTranslation } from '@/lib/language-context'
import { mockVisits } from '@/data/mock-visits'
import type { Visit } from '@/types'

function VisitsTable({ visits, title }: { visits: Visit[]; title?: string }) {
  const { t } = useTranslation()

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('history.date')}</TableHead>
              <TableHead>{t('history.stagiaire')}</TableHead>
              <TableHead>{t('history.cardType')}</TableHead>
              <TableHead>{t('history.arrival')}</TableHead>
              <TableHead>{t('history.departure')}</TableHead>
              <TableHead>{t('history.duration')}</TableHead>
              <TableHead>{t('history.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell>{visit.date}</TableCell>
                <TableCell className="font-semibold text-slate-900">{visit.stagiaire}</TableCell>
                <TableCell>
                  <Badge type={visit.type} />
                </TableCell>
                <TableCell>{visit.arrivee}</TableCell>
                <TableCell>{visit.depart || '-'}</TableCell>
                <TableCell className="font-semibold">{visit.duree}</TableCell>
                <TableCell className="font-semibold text-emerald-600">{t('history.complete')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function HistoryPage() {
  const [dateFilter, setDateFilter] = useState('')
  const { t } = useTranslation()
  const visits = dateFilter ? mockVisits.filter((v) => v.date === dateFilter) : mockVisits

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-auto"
        />
        <button className="ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700">
          <Download className="h-5 w-5" />
          {t('history.print')}
        </button>
      </div>
      <VisitsTable visits={visits} />
    </div>
  )
}

export { VisitsTable, HistoryPage }
