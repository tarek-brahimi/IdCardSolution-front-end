'use client'

import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { CameraView } from '@/components/scanner/camera-view'
import { ScanStatusIndicator } from '@/components/scanner/scan-status'
import { ScanResult } from '@/components/scanner/scan-result'
import { useScan } from '@/hooks/use-scan'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ScannerPage() {
  const router = useRouter()
  const { status, detectedIntern, simulateScan, resetScan } = useScan()

  const handleCheckIn = () => {
    if (!detectedIntern) return
    resetScan()
    router.push('/stagiaires')
  }

  return (
    <AppShell title="Scanner">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Caméra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CameraView />
            <ScanStatusIndicator status={status} />
            <button
              onClick={simulateScan}
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Simuler un scan
            </button>
          </CardContent>
        </Card>

        {detectedIntern && status === 'detected' && (
          <ScanResult
            intern={detectedIntern}
            onConfirm={handleCheckIn}
            onCancel={resetScan}
          />
        )}
      </div>
    </AppShell>
  )
}
