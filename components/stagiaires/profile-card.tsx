'use client'

import Link from 'next/link'
import { LogOut, UserX } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/avatar'
import { InfoRow } from '@/components/shared/info-row'
import { MiniStat } from '@/components/shared/mini-stat'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'
import { mockInterns } from '@/data/mock-interns'
import { mockVisits } from '@/data/mock-visits'
import { weekVisits } from '@/data/chart-data'

function ProfileCard({ internId }: { internId: string }) {
  const intern = mockInterns.find((i) => i.id === internId)
  const { t } = useTranslation()

  if (!intern) {
    return (
      <FadeIn>
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <UserX className="mb-4 h-12 w-12" />
          <p className="mb-4 text-lg font-medium">{t('profile.notFound')}</p>
          <Link href="/stagiaires">
            <Button variant="outline">{t('profile.back')}</Button>
          </Link>
        </div>
      </FadeIn>
    )
  }

  const internVisits = mockVisits.filter((v) => v.internId === internId)

  return (
    <StaggerContainer className="space-y-6">
      <StaggerItem>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 font-heading">
            {intern.prenom} {intern.nom}
          </h1>
          {intern.status === 'present' && (
            <Button variant="destructive" size="lg">
              <LogOut className="mr-2 h-5 w-5" />
              {t('dashboard.checkout')}
            </Button>
          )}
        </div>
      </StaggerItem>

      <StaggerItem>
        <Card>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar initials={intern.initials} size="lg" />
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <Badge type={intern.type} />
                  <StatusBadge status={intern.status} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoRow label={t('scanner.nin')} value={intern.nin} />
                  <InfoRow label={t('scanner.birthDate')} value={intern.dateNaissance} />
                  <InfoRow label={t('profile.birthPlace')} value={intern.lieuNaissance} />
                  <InfoRow label={t('profile.firstVisit')} value={intern.firstVisit} />
                  <InfoRow label={t('profile.totalVisits')} value={intern.totalVisits.toString()} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </StaggerItem>

      <StaggerItem>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardContent>
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                {t('profile.cardScan')}
              </div>
              <div className="flex justify-center">
                <Badge type={intern.type} />
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniStat label={t('profile.weekVisits')} value="5" />
              <MiniStat label={t('profile.totalTime')} value="42h" />
              <MiniStat label={t('profile.avgArrival')} value="8:36" />
            </div>

            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.presence7days')}</CardTitle>
                </CardHeader>
                <div className="px-6 pb-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weekVisits}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                      <Line type="monotone" dataKey="duree" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </StaggerItem>

      <StaggerItem>
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.visitHistory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.date')}</TableHead>
                  <TableHead>{t('table.arrival')}</TableHead>
                  <TableHead>{t('table.departure')}</TableHead>
                  <TableHead>{t('table.duration')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell>{visit.date}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </StaggerItem>
    </StaggerContainer>
  )
}

export { ProfileCard }
