'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, SearchX } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Avatar } from '@/components/shared/avatar'
import { FadeIn } from '@/components/shared/motion'
import { useTranslation } from '@/lib/language-context'
import { mockInterns } from '@/data/mock-interns'
import type { FilterType, FilterStatus } from '@/types'

function InternTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const { t } = useTranslation()

  const filtered = mockInterns.filter((intern) => {
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      `${intern.prenom} ${intern.nom}`.toLowerCase().includes(query) ||
      intern.nin.includes(query)
    const matchesType = filterType === 'all' || intern.type === filterType
    const matchesStatus = filterStatus === 'all' || intern.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('interns.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input
            placeholder={t('interns.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2"
            aria-label={t('interns.search')}
          />
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value as FilterType)} aria-label={t('interns.allTypes')}>
            <option value="all">{t('interns.allTypes')}</option>
            <option value="CNI">CNI</option>
            <option value="PERMIS">PERMIS</option>
            <option value="AUTRE">AUTRE</option>
          </Select>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as FilterStatus)} aria-label={t('interns.allStatuses')}>
            <option value="all">{t('interns.allStatuses')}</option>
            <option value="present">{t('interns.present')}</option>
            <option value="depart">{t('interns.absent')}</option>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('interns.photo')}</TableHead>
              <TableHead>{t('interns.fullName')}</TableHead>
              <TableHead>{t('interns.type')}</TableHead>
              <TableHead>{t('scanner.nin')}</TableHead>
              <TableHead>{t('interns.lastVisit')}</TableHead>
              <TableHead>{t('interns.status')}</TableHead>
              <TableHead>{t('interns.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <FadeIn>
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                      <SearchX className="mb-3 h-10 w-10" />
                      <p className="text-sm font-medium">{t('interns.search')}</p>
                    </div>
                  </FadeIn>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>
                    <Avatar initials={intern.initials} />
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {intern.prenom} {intern.nom}
                  </TableCell>
                  <TableCell>
                    <Badge type={intern.type} />
                  </TableCell>
                  <TableCell className="font-mono text-slate-600">{intern.nin}</TableCell>
                  <TableCell>{intern.lastVisit}</TableCell>
                  <TableCell>
                    <StatusBadge status={intern.status} />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/stagiaires/${intern.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      <Eye className="h-4 w-4" />
                      {t('interns.viewProfile')}
                    </Link>
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

export { InternTable }
