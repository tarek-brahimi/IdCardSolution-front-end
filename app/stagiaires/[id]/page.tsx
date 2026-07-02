'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { ProfileCard } from '@/components/stagiaires/profile-card'
import { ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const params = useParams()
  const internId = params.id as string

  return (
    <AppShell title="Profil">
      <div className="space-y-4">
        <Link
          href="/stagiaires"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste
        </Link>
        <ProfileCard internId={internId} />
      </div>
    </AppShell>
  )
}
