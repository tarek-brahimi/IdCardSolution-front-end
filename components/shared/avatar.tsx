import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
} as const

function Avatar({ initials, size = 'md', className }: { initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <div className={cn(
      'flex items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700',
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  )
}

export { Avatar }
