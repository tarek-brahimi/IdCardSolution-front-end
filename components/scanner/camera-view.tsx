'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, Wifi, WifiOff } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function CameraView() {
  const imgRef = useRef<HTMLImageElement>(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const streamUrl = `${API_BASE}/api/camera/stream`
    img.src = streamUrl

    img.onload = () => setConnected(true)
    img.onerror = () => {
      setConnected(false)
      setError(true)
    }

    return () => {
      img.src = ''
    }
  }, [])

  if (error) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video flex items-center justify-center">
        <div className="text-center">
          <WifiOff className="mx-auto h-12 w-12 text-red-400 mb-3" />
          <p className="text-sm text-slate-400">Camera non disponible</p>
          <p className="text-xs text-slate-500 mt-1">Verifiez que DroidCam est actif</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900">
      <img
        ref={imgRef}
        alt="Camera DroidCam"
        className="w-full aspect-video object-cover"
      />
      <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-indigo-400" />
      <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-indigo-400" />
      <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-indigo-400" />
      <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-indigo-400" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-scan h-0.5 w-3/4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
      </div>

      <div className="absolute right-3 top-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
      </div>

      <div className="absolute left-3 top-3">
        {connected ? (
          <Wifi className="h-4 w-4 text-emerald-400" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-400" />
        )}
      </div>
    </div>
  )
}

export { CameraView }
