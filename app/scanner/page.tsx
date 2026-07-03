'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AppShell } from '@/components/layout/app-shell'
import { CameraView } from '@/components/scanner/camera-view'
import { ScanStatusIndicator } from '@/components/scanner/scan-status'
import { ScanResult } from '@/components/scanner/scan-result'
import { useScan } from '@/hooks/use-scan'
import { useTranslation } from '@/lib/language-context'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ScannerPage() {
  const router = useRouter()
  const { status, detectedIntern, scanResult, captureAndScan, resetScan } = useScan()
  const { t } = useTranslation()
  const isDetected = scanResult && status === 'detected'

  const handleCheckIn = useCallback(async () => {
    if (!detectedIntern) return
    try {
      await api.checkin(detectedIntern.id)
    } catch (err) {
      console.error('Checkin error:', err)
    }
    resetScan()
    router.push('/stagiaires')
  }, [detectedIntern, resetScan, router])

  const handleCancel = useCallback(() => {
    resetScan()
  }, [resetScan])

  return (
    <AppShell title={t('scanner.title')}>
      <div className="flex items-start gap-6">
        <motion.div
          className="w-full"
          animate={{
            width: isDetected ? '50%' : '100%',
            x: isDetected ? -10 : 0,
            scale: isDetected ? 0.98 : 1,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('scanner.camera')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CameraView />
              <ScanStatusIndicator status={status} />
              <Button
                onClick={captureAndScan}
                disabled={status === 'processing'}
                className="w-full"
                size="lg"
              >
                {status === 'processing' ? t('scanner.processing') : t('scanner.simulate')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {isDetected && scanResult && (
          <motion.div
            className="w-1/2"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.35 }}
          >
            <ScanResult
              scanResult={scanResult}
              onConfirm={handleCheckIn}
              onCancel={handleCancel}
            />
          </motion.div>
        )}
      </div>
    </AppShell>
  )
}
