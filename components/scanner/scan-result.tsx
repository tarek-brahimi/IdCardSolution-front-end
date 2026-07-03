'use client'

import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/avatar'
import { InfoRow } from '@/components/shared/info-row'
import { useTranslation } from '@/lib/language-context'
import type { Intern } from '@/types'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
}

function ScanResult({
  intern,
  onConfirm,
  onCancel,
}: {
  intern: Intern
  onConfirm: () => void
  onCancel: () => void
}) {
  const { t } = useTranslation()

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
            className="flex h-40 items-center justify-center rounded-xl bg-slate-100 p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
          >
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <Avatar initials={intern.initials} size="lg" />
              </div>
              <Badge type={intern.type} />
            </div>
          </motion.div>

          <motion.div
            className="space-y-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <InfoRow label={t('scanner.cardType')} value={<Badge type={intern.type} />} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.name')} value={intern.nom} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.firstName')} value={intern.prenom} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.birthDate')} value={intern.dateNaissance} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.nin')} value={<span className="font-mono">{intern.nin}</span>} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow label={t('scanner.ninStatus')} value={<span className="text-emerald-600">{t('scanner.ninValid')}</span>} />
            </motion.div>
            <motion.div variants={item}>
              <InfoRow
                label={t('scanner.arrivalTime')}
                value={new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-3 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.8 }}
          >
            <Button onClick={onConfirm} className="flex-1" size="lg">
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
