'use client'

import { Bell } from 'lucide-react'
import { useCurrentTime } from '@/hooks/use-current-time'
import { useTranslation } from '@/lib/language-context'
import { Avatar } from '@/components/shared/avatar'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { SlideUp } from '@/components/shared/motion'

function Header({ title }: { title: string }) {
  const time = useCurrentTime()
  const { t } = useTranslation()

  return (
    <SlideUp>
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 pl-16 lg:px-8 lg:pl-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">{title}</h1>
          <p className="text-sm capitalize text-slate-500">{time}</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-500 hover:text-slate-700"
            aria-label={t('header.notifications')}
            aria-haspopup="true"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Avatar initials="JD" size="md" />
        </div>
      </header>
    </SlideUp>
  )
}

export { Header }
