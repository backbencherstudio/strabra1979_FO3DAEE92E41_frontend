'use client'

import { ChevronsLeft, ChevronsLeftDouble } from '@/components/icons/Chevrons'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { usePaginationPage } from './PaginationPageProvider'
import { useMemo } from 'react'

interface PaginationProps extends React.ComponentProps<'div'> {
  size?: React.ComponentProps<typeof Button>['size']
  showHomeAndEnd?: boolean
}

function getPaginationPages(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 1) return [1]

  const pages = new Set<number>()

  pages.add(1)
  pages.add(totalPages)

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      pages.add(i)
    }
  }

  if (currentPage <= 3) {
    pages.add(2)
    pages.add(3)
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1)
    pages.add(totalPages - 2)
  }

  const sortedPages = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  const result: (number | '...')[] = []

  for (let i = 0; i < sortedPages.length; i++) {
    const current = sortedPages[i]
    const prev = sortedPages[i - 1]

    if (i > 0 && current - prev > 1) {
      result.push('...')
    }

    result.push(current)
  }

  return result
}

export default function PaginationControls({
  className,
  size = 'icon-lg',
  showHomeAndEnd = true,
  ...props
}: PaginationProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 'icon-xs' : size

  const { page, setPage, nextPage, prevPage, totalPages } = usePaginationPage()

  const lastPage = Math.max(1, totalPages || 1)

  const pages = useMemo(() => {
    return getPaginationPages(page, lastPage)
  }, [page, lastPage])

  if (lastPage <= 1) return null

  return (
    <div className={cn('flex justify-center gap-3', className)} {...props}>
      {showHomeAndEnd && (
        <Button
          size={iconSize}
          variant="muted"
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="text-sm font-semibold transition-none"
        >
          <ChevronsLeftDouble className="size-5" />
        </Button>
      )}

      <Button
        size={iconSize}
        variant="muted"
        onClick={prevPage}
        disabled={page === 1}
        className="text-sm font-semibold transition-none"
      >
        <ChevronsLeft className="size-5" />
      </Button>

      {pages.map((item, index) =>
        item === '...' ? (
          <Button
            key={`ellipsis-${index}`}
            disabled
            variant="muted"
            size={iconSize}
            className="pointer-events-none bg-transparent text-sm font-semibold transition-none hover:bg-transparent"
          >
            ...
          </Button>
        ) : (
          <Button
            key={item}
            size={iconSize}
            variant={item === page ? 'default' : 'muted'}
            onClick={() => setPage(item)}
            className="text-sm font-semibold transition-none"
          >
            {item}
          </Button>
        ),
      )}

      <Button
        size={iconSize}
        variant="muted"
        onClick={nextPage}
        disabled={page === lastPage}
        className="text-sm font-semibold transition-none"
      >
        <ChevronsLeft className="size-5 rotate-180" />
      </Button>

      {showHomeAndEnd && (
        <Button
          size={iconSize}
          variant="muted"
          onClick={() => setPage(lastPage)}
          disabled={page === lastPage}
          className="text-sm font-semibold transition-none"
        >
          <ChevronsLeftDouble className="size-5 rotate-180" />
        </Button>
      )}
    </div>
  )
}
