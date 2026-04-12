'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TabFilterButtonsProps {
  tabs: Record<string, number>
  currentTab?: string
  onTabChange?: (tab: string) => void
  disabled?: boolean
}

export function TabFilterButtons({
  tabs,
  currentTab = '',
  onTabChange,
  disabled = false,
}: TabFilterButtonsProps) {
  const tabArray = Object.keys(tabs)
  const presentationOnly = currentTab === ''

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tabArray.map((t) => {
        const count = tabs[t] ?? 0

        const isDisabled = disabled || !count || count < 1

        return (
          <Button
            type="button"
            disabled={isDisabled || presentationOnly}
            onClick={() => onTabChange?.(t)}
            variant="ghost"
            className={cn(
              'px-3 capitalize',
              t === currentTab
                ? 'bg-foundation-light-blue hover:bg-foundation-light-blue text-primary hover:text-primary'
                : 'text-gray-black-300 hover:text-gray-black-300',
              { 'disabled:opacity-100': presentationOnly },
            )}
            size="sm"
            key={t}
          >
            {t} ({count})
          </Button>
        )
      })}
    </div>
  )
}
