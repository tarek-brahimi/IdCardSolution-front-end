'use client'

import { Bell } from 'lucide-react'
import { useCurrentTime } from '@/hooks/use-current-time'
import { useTranslation } from '@/lib/language-context'
import { Avatar } from '@/components/shared/avatar'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { SlideUp } from '@/components/shared/motion'

function Header({ title }: { title: string }) {
  const time = useCurrentTime()
  const { t } = useTranslation()

  return (
    <SlideUp>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">{title}</h1>
          <p className="text-sm capitalize text-slate-500">{time}</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label={t('Notifications')}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Avatar initials="JD" size="md" />
        </div>
      </header>
    </SlideUp>
  )
}

export { Header }
