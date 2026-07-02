'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Avatar } from '@/components/shared/avatar'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'
import { mockInterns } from '@/data/mock-interns'
import type { FilterType, FilterStatus } from '@/types'

function InternFilters({
  searchTerm,
  onSearchChange,
  filterType,
  onTypeChange,
  filterStatus,
  onStatusChange,
}: {
  searchTerm: string
  onSearchChange: (v: string) => void
  filterType: FilterType
  onTypeChange: (v: FilterType) => void
  filterStatus: FilterStatus
  onStatusChange: (v: FilterStatus) => void
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <Input
        placeholder="Rechercher par nom ou NIN..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:col-span-2"
      />
      <Select value={filterType} onChange={(e) => onTypeChange(e.target.value as FilterType)}>
        <option value="all">Tous les types</option>
        <option value="CNI">CNI</option>
        <option value="PERMIS">PERMIS</option>
        <option value="AUTRE">AUTRE</option>
      </Select>
      <Select value={filterStatus} onChange={(e) => onStatusChange(e.target.value as FilterStatus)}>
        <option value="all">Tous les statuts</option>
        <option value="present">Présent</option>
        <option value="depart">Parti</option>
      </Select>
    </div>
  )
}

function InternTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

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
        <CardTitle>Stagiaires</CardTitle>
      </CardHeader>
      <CardContent>
        <InternFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onTypeChange={setFilterType}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Nom Prénom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>NIN</TableHead>
              <TableHead>Dernière visite</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <StaggerContainer>
              {filtered.map((intern) => (
                <StaggerItem key={intern.id}>
                  <TableRow>
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
                        Voir profil
                      </Link>
                    </TableCell>
                  </TableRow>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { InternTable }
