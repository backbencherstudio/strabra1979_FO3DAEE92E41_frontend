// context/MediaFilesContext.tsx
'use client'
import { createContext, useContext, useState } from 'react'
import type { Slide } from 'yet-another-react-lightbox'

interface MediaFilesContextValue {
  open: boolean
  index: number
  setOpen: (open: boolean) => void
  openAt: (index: number) => void
}

const MediaFilesContext = createContext<MediaFilesContextValue | null>(null)

export function MediaFilesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  function openAt(i: number) {
    setIndex(i)
    setOpen(true)
  }

  return (
    <MediaFilesContext.Provider value={{ open, index, setOpen, openAt }}>
      {children}
    </MediaFilesContext.Provider>
  )
}

export function useMediaFiles() {
  const ctx = useContext(MediaFilesContext)
  if (!ctx) throw new Error('useMediaFiles must be used within MediaFilesProvider')
  return ctx
}
