'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps extends React.PropsWithChildren {
  containerId: string
}

export function Portal({ children, containerId }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  const updateMounded = useEffectEvent(() => setMounted(true))
  useEffect(() => updateMounded(), [])

  if (!mounted) return null

  const container = document.getElementById(containerId)

  if (!container) return null

  return createPortal(children, container)
}
