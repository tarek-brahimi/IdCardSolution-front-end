import { Check, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/shared/avatar'
import { InfoRow } from '@/components/shared/info-row'
import type { Intern } from '@/types'

function ScanResult({
  intern,
  onConfirm,
  onCancel,
}: {
  intern: Intern
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Résultat du scan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 p-4">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <Avatar initials={intern.initials} size="lg" />
            </div>
            <Badge type={intern.type} />
          </div>
        </div>

        <div className="space-y-1">
          <InfoRow label="Type de carte" value={<Badge type={intern.type} />} />
          <InfoRow label="Nom" value={intern.nom} />
          <InfoRow label="Prénom" value={intern.prenom} />
          <InfoRow label="Date de naissance" value={intern.dateNaissance} />
          <InfoRow label="NIN" value={<span className="font-mono">{intern.nin}</span>} />
          <InfoRow label="Statut NIN" value={<span className="text-emerald-600">VALIDE</span>} />
          <InfoRow
            label="Heure d'arrivée"
            value={new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Check className="h-5 w-5" />
            Confirmer le Check-in
          </button>
          <button
            onClick={onCancel}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <X className="h-5 w-5" />
            Annuler
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export { ScanResult }
