'use client'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type SharedPropertyCardListContextState = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

const SharedPropertyCardListContext = createContext<SharedPropertyCardListContextState | null>(null)
export const SharedPropertyCardListContextProvider = (props: PropsWithChildren) => {
  const [date, _setDate] = useState<Date | undefined>(undefined)
  function setDate(date: Date | undefined) {
    _setDate(date)
  }

  return (
    <SharedPropertyCardListContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      {props.children}
    </SharedPropertyCardListContext.Provider>
  )
}

export function useSharedPropertyCardListContext() {
  const context = useContext(SharedPropertyCardListContext)

  if (!context) {
    throw new Error(
      'useSharedPropertyCardListContext must be used within a SharedPropertyCardListContextProvider',
    )
  }

  return context
}
