import { AppShell } from '@/components/layout/app-shell'
import { InternTable } from '@/components/stagiaires/intern-table'

export default function StagiairesPage() {
  return (
    <AppShell title="Stagiaires">
      <InternTable />
    </AppShell>
  )
}
