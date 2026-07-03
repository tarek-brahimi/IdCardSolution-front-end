'use client'

import { useCallback, useState } from 'react'
import type { Intern } from '@/types'
import { api } from '@/lib/api'

export type ScanStatus = 'waiting' | 'detected' | 'processing'

export interface ScanResult {
  intern: Intern | null
  image_url: string
  ocr: {
    nin: string
    nom: string
    prenom: string
    date_naissance: string
    lieu_naissance: string
    confidence: number
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function useScan() {
  const [status, setStatus] = useState<ScanStatus>('waiting')
  const [detectedIntern, setDetectedIntern] = useState<Intern | null>(null)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  const captureAndScan = useCallback(async () => {
    setStatus('processing')

    try {
      const frameRes = await fetch(`${API_BASE}/api/camera/frame`)
      if (!frameRes.ok) throw new Error('Impossible de capturer la frame')

      const blob = await frameRes.blob()
      const file = new File([blob], 'scan.jpg', { type: 'image/jpeg' })

      const result = await api.scanDocument(file)
      const intern = result.intern || (result.ocr?.nin ? {
        id: '0',
        initials: (result.ocr.prenom?.[0] || 'X') + (result.ocr.nom?.[0] || 'X'),
        nom: result.ocr.nom,
        prenom: result.ocr.prenom,
        type: 'CNI' as const,
        nin: result.ocr.nin,
        dateNaissance: result.ocr.date_naissance || '',
        lieuNaissance: result.ocr.lieu_naissance || '',
        firstVisit: new Date().toISOString().split('T')[0],
        totalVisits: 0,
        status: 'depart' as const,
        lastVisit: new Date().toISOString().split('T')[0],
      } : null)

      setDetectedIntern(intern)
      setScanResult({ intern, image_url: result.image_url, ocr: result.ocr })
      setStatus('detected')
    } catch (err) {
      console.error('Scan error:', err)
      setStatus('waiting')
    }
  }, [])

  const resetScan = useCallback(() => {
    setStatus('waiting')
    setDetectedIntern(null)
    setScanResult(null)
  }, [])

  return { status, detectedIntern, scanResult, captureAndScan, resetScan }
}
