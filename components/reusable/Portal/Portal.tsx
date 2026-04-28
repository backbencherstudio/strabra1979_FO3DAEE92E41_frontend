'use client'

import { createPortal } from 'react-dom'

interface PortalProps extends React.PropsWithChildren {
  targetId: string
}

export function Portal({ children, targetId }: PortalProps) {
  if (typeof window === 'undefined') return null

  const container = document.getElementById(targetId)

  if (!container) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Portal target "#${targetId}" not found`)
    }

    return null
  }

  return createPortal(children, container)
}
