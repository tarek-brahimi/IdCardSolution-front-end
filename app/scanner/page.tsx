'use client'

import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { CameraView } from '@/components/scanner/camera-view'
import { ScanStatusIndicator } from '@/components/scanner/scan-status'
import { ScanResult } from '@/components/scanner/scan-result'
import { useScan } from '@/hooks/use-scan'
import { useTranslation } from '@/lib/language-context'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/shared/motion'

export default function ScannerPage() {
  const router = useRouter()
  const { status, detectedIntern, simulateScan, resetScan } = useScan()
  const { t } = useTranslation()

  const handleCheckIn = () => {
    if (!detectedIntern) return
    resetScan()
    router.push('/stagiaires')
  }

  return (
    <AppShell title={t('scanner.title')}>
      <StaggerContainer className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle>{t('scanner.camera')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CameraView />
              <ScanStatusIndicator status={status} />
              <Button
                onClick={simulateScan}
                disabled={status === 'processing'}
                className="w-full"
                size="lg"
              >
                {t('scanner.simulate')}
              </Button>
            </CardContent>
          </Card>
        </StaggerItem>

        {detectedIntern && status === 'detected' && (
          <StaggerItem>
            <ScanResult
              intern={detectedIntern}
              onConfirm={handleCheckIn}
              onCancel={resetScan}
            />
          </StaggerItem>
        )}
      </StaggerContainer>
    </AppShell>
  )
}
