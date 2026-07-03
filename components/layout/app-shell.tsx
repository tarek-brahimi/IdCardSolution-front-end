'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main id="main-content" className="flex-1 overflow-auto p-4 pt-16 lg:p-8 lg:pt-8" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}

export { AppShell }
