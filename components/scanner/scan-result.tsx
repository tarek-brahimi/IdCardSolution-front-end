'use client'

import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InfoRow } from '@/components/shared/info-row'
import { useTranslation } from '@/lib/language-context'
import type { Intern } from '@/types'
import type { ScanResult as ScanResultType } from '@/hooks/use-scan'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
}

function ScanResult({
  scanResult,
  onConfirm,
  onCancel,
}: {
  scanResult: ScanResultType
  onConfirm: () => void
  onCancel: () => void
}) {
  const { t } = useTranslation()
  const intern = scanResult.intern
  const ocr = scanResult.ocr
  const imageUrl = scanResult.image_url

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t('scanner.resultTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="rounded-xl overflow-hidden bg-slate-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
          >
            {imageUrl ? (
              <img
                src={`http://localhost:8000${imageUrl}`}
                alt="Document scanné"
                className="w-full h-48 object-contain"
              />
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-slate-400">{t('scanner.noImage')}</p>
              </div>
            )}
          </motion.div>

          <motion.div className="space-y-1" variants={container} initial="hidden" animate="show">
            {intern && (
              <>
                <motion.div variants={item}>
                  <InfoRow label={t('scanner.cardType')} value={<Badge type={intern.type} />} />
                </motion.div>
                <motion.div variants={item}>
                  <InfoRow label={t('scanner.name')} value={intern.nom} />
                </motion.div>
                <motion.div variants={item}>
                  <InfoRow label={t('scanner.firstName')} value={intern.prenom} />
                </motion.div>
              </>
            )}
            {!intern && ocr && (
              <>
                <motion.div variants={item}>
                  <InfoRow label={t('scanner.name')} value={ocr.nom || '-'} />
                </motion.div>
                <motion.div variants={item}>
                  <InfoRow label={t('scanner.firstName')} value={ocr.prenom || '-'} />
                </motion.div>
              </>
            )}
            <motion.div variants={item}>
              <InfoRow label={t('scanner.nin')} value={<span className="font-mono">{ocr.nin || '-'}</span>} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.ninStatus')} value={
                ocr.nin ? <span className="text-emerald-600">{t('scanner.ninValid')}</span> : <span className="text-red-600">{t('scanner.ninInvalid')}</span>
              } />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.confidence')} value={`${Math.round((ocr.confidence || 0) * 100)}%`} />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-3 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.6 }}
          >
            <Button onClick={onConfirm} className="flex-1" size="lg" disabled={!intern}>
              <Check className="mr-2 h-5 w-5" />
              {t('scanner.confirmCheckin')}
            </Button>
            <Button onClick={onCancel} variant="destructive" className="flex-1" size="lg">
              <X className="mr-2 h-5 w-5" />
              {t('scanner.cancel')}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { ScanResult }
