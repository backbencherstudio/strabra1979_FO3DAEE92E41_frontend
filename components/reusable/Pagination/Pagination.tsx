'use client'

import { ChevronsLeft, ChevronsLeftDouble } from '@/components/icons/Chevrons'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface PaginationProps extends React.ComponentProps<'div'> {
  size?: React.ComponentProps<typeof Button>['size']
  showHomeAndEnd?: boolean
}

export default function Pagination({
  className,
  size = 'icon-lg',
  showHomeAndEnd = true,
}: PaginationProps) {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 'icon-xs' : size

  return (
    <div className={cn('flex justify-center gap-3', className)}>
      {showHomeAndEnd ? (
        <Button className="text-sm font-semibold" size={iconSize} variant="muted">
          <ChevronsLeftDouble className="size-5" />
        </Button>
      ) : null}
      <Button className="text-sm font-semibold" size={iconSize} variant="muted">
        <ChevronsLeft className="size-5" />
      </Button>
      <Button className="text-sm font-semibold" size={iconSize} variant="default">
        1
      </Button>
      <Button className="text-sm font-semibold" size={iconSize} variant="muted">
        2
      </Button>
      <Button className="text-sm font-semibold" size={iconSize} variant="muted">
        3
      </Button>

      <Button
        disabled
        className="pointer-events-none bg-transparent text-sm font-semibold hover:bg-transparent"
        size={iconSize}
        variant="muted"
      >
        ...
      </Button>

      <Button className="text-sm font-semibold" size={iconSize} variant="muted">
        8
      </Button>

      <Button className="text-sm font-semibold" size={iconSize} variant="muted">
        <ChevronsLeft className="size-5 rotate-180" />
      </Button>

      {showHomeAndEnd ? (
        <Button className="text-sm font-semibold" size={iconSize} variant="muted">
          <ChevronsLeftDouble className="size-5 rotate-180" />
        </Button>
      ) : null}
    </div>
  )
}
