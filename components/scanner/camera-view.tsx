import { Camera } from 'lucide-react'

function CameraView() {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900">
      <div className="flex aspect-video items-center justify-center text-slate-500">
        <Camera className="h-16 w-16" />
      </div>
    </div>
  )
}

export { CameraView }
