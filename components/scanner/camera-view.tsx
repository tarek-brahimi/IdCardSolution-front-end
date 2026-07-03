'use client'

import { Camera } from 'lucide-react'

function CameraView() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900">
      <div className="flex aspect-video items-center justify-center">
        <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-indigo-400" />
        <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-indigo-400" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-indigo-400" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-indigo-400" />

        <Camera className="h-16 w-16 text-slate-600" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-scan h-0.5 w-3/4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
        </div>

        <div className="absolute right-3 top-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
        </div>
      </div>
    </div>
  )
}

export { CameraView }
