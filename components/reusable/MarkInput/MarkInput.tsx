'use client'

import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatZeroPrefix } from '@/lib/farmatters'

interface MarkInputProps {
  value: number
  maxValue: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function MarkInput({ value, maxValue, onChange, disabled }: MarkInputProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    if (value > 1) onChange(value - 1)
  }

  const handleNext = () => {
    if (value < maxValue) onChange(value + 1)
  }

  // Keyboard Support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  // Auto scroll when value changes
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const activeElement = container.querySelector(`[data-number="${value}"]`) as HTMLElement | null

    if (!activeElement) return

    const containerRect = container.getBoundingClientRect()
    const elementRect = activeElement.getBoundingClientRect()

    const isOutOfView =
      elementRect.left < containerRect.left || elementRect.right > containerRect.right

    if (isOutOfView) {
      const offset =
        activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2

      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      })
    }
  }, [value])

  return (
    <div className="flex gap-2">
      <section
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-14 min-w-0 flex-1 items-center gap-1 rounded-md bg-white px-2 shadow-[0_2px_10px_0_rgba(0,0,0,0.11)]',
          'focus-visible:border-ring focus-visible:ring-ring/50 border border-white outline-none focus-visible:ring-[3px]',
        )}
      >
        {/* Prev */}
        <Button
          tabIndex={-1}
          type="button"
          size="icon-md"
          variant="ghost"
          onClick={handlePrev}
          disabled={disabled || value === 1}
          className="shrink-0 rounded-full disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-5" />
        </Button>

        {/* Scrollable Numbers */}
        <div className="no-scrollbar relative flex h-full flex-1 items-center overflow-hidden">
          <div
            className={cn(
              'pointer-events-none absolute top-0 left-0 h-full w-12 bg-linear-90 to-transparent transition',
              { 'from-white': value !== 1 },
            )}
          />
          <div
            className={cn(
              'pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-270 to-transparent transition',
              { 'from-white': value !== maxValue },
            )}
          />

          <div
            ref={scrollRef}
            tabIndex={-1}
            className="no-scrollbar flex h-full flex-1 items-center gap-2 overflow-x-auto px-0"
          >
            {Array.from({ length: maxValue }).map((_, idx) => {
              const number = idx + 1
              const isActive = number === value

              return (
                <button
                  disabled={disabled}
                  tabIndex={-1}
                  key={number}
                  data-number={number}
                  type="button"
                  onClick={() => onChange(number)}
                  className={cn(
                    'flex h-10.5 min-w-10.5 shrink-0 items-center justify-center rounded-full px-1.5 text-sm font-medium disabled:cursor-not-allowed',
                    isActive ? 'bg-primary relative text-white' : 'text-primary hover:bg-muted',
                  )}
                >
                  {formatZeroPrefix(number)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Next */}
        <Button
          tabIndex={-1}
          type="button"
          size="icon-md"
          variant="ghost"
          onClick={handleNext}
          disabled={disabled || value === maxValue}
          className="shrink-0 rounded-full disabled:cursor-not-allowed"
        >
          <ChevronRight className="size-5" />
        </Button>
      </section>
      <section className="flex h-14 min-w-16 items-center justify-center rounded-md bg-white shadow-[0_2px_10px_0_rgba(0,0,0,0.11)] @3xl:min-w-22">
        <div className="text-gray-black-300 flex items-baseline justify-center text-center text-base">
          <span>{formatZeroPrefix(value)}/</span>
          <span className="text-xs">{formatZeroPrefix(maxValue)}</span>
        </div>
      </section>
    </div>
  )
}
