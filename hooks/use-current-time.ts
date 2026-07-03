'use client'

import { useEffect, useState } from 'react'

export function useCurrentTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(
        new Date().toLocaleString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    }, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return time
}
