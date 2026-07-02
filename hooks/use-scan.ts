'use client'

import { useCallback, useState } from 'react'
import type { Intern } from '@/types'
import { mockInterns } from '@/data/mock-interns'

export type ScanStatus = 'waiting' | 'detected' | 'processing'

export function useScan() {
  const [status, setStatus] = useState<ScanStatus>('waiting')
  const [detectedIntern, setDetectedIntern] = useState<Intern | null>(null)

  const simulateScan = useCallback(() => {
    setStatus('processing')
    window.setTimeout(() => {
      setDetectedIntern(mockInterns[Math.floor(Math.random() * mockInterns.length)])
      setStatus('detected')
    }, 1000)
  }, [])

  const resetScan = useCallback(() => {
    setStatus('waiting')
    setDetectedIntern(null)
  }, [])

  return { status, detectedIntern, simulateScan, resetScan }
}
