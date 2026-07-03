'use client'

import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { useTranslation } from '@/lib/language-context'
import { api } from '@/lib/api'
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
            {visits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="py-8 text-center text-sm text-slate-400">
                    {t('history.title')}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{visit.stagiaire}</TableCell>
                  <TableCell>
                    <Badge type={visit.type} />
                  </TableCell>
                  <TableCell>{visit.arrivee}</TableCell>
                  <TableCell>{visit.depart || '-'}</TableCell>
                  <TableCell className="font-semibold">{visit.duree}</TableCell>
                  <TableCell>
                    {visit.depart ? (
                      <span className="font-semibold text-emerald-600">{t('history.complete')}</span>
                    ) : (
                      <span className="font-semibold text-amber-600">{t('history.ongoing')}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function HistoryPage() {
  const [dateFilter, setDateFilter] = useState('')
  const [visits, setVisits] = useState<any[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const params: any = {}
    if (dateFilter) params.date = dateFilter
    api.listVisits(params).then(setVisits).catch(() => setVisits([]))
  }, [dateFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-auto"
          aria-label={t('history.date')}
        />
        <Button className="ml-auto" size="lg">
          <Download className="mr-2 h-5 w-5" />
          {t('history.print')}
        </Button>
      </div>
      <VisitsTable visits={visits} />
    </div>
  )
}

export { VisitsTable, HistoryPage }
