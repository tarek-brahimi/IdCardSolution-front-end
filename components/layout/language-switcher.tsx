'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from '@/lib/language-context'
import { locales, localeLabels, type Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'

function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <div role="radiogroup" aria-label="Language selection" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
      <Globe className="h-4 w-4 text-slate-500 mx-1" aria-hidden="true" />
      {locales.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={locale === l}
          onClick={() => setLocale(l)}
          className={cn(
            'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
            locale === l
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  )
}

export { LanguageSwitcher }
