'use client'
import { formatDate } from 'date-fns'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type DateOptions = {
  dateFrom?: Date | null
}
type DateState = {
  formatted: string | undefined
  raw: Date | undefined
}

type SharedPropertyCardListContextState = {
  dateFrom: DateState | null
  setDate: (arg: DateOptions) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>
  search: string | undefined
  setSearch: Dispatch<SetStateAction<string>>
}

const SharedPropertyCardListContext = createContext<SharedPropertyCardListContextState | null>(null)
export const SharedPropertyCardListContextProvider = (props: PropsWithChildren) => {
  const [search, setSearch] = useState<string>('')

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const [dateFrom, setDateFrom] = useState<DateState | null>(null)
  function setDate({ dateFrom }: DateOptions) {
    if (dateFrom) {
      setDateFrom({
        formatted: formatDate(dateFrom, 'yyyy-MM-dd'),
        raw: dateFrom,
      })
    } else if (dateFrom === null) {
      setDateFrom(null)
    }
  }

  return (
    <SharedPropertyCardListContext.Provider
      value={{
        dateFrom,
        setDate,
        sortOrder,
        setSortOrder,
        search,
        setSearch,
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
