'use client'

import { LanguageProvider } from '@/lib/language-context'

function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

export { Providers }
