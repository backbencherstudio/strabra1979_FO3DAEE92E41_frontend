import { ChevronsLeft, ChevronsLeftDouble } from '@/components/icons/Chevrons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps extends React.ComponentProps<'div'> {}

export default function Pagination({ className }: PaginationProps) {
  return (
    <div className={cn('flex justify-center gap-3', className)}>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        <ChevronsLeftDouble className="size-5" />
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        <ChevronsLeft className="size-5" />
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="default">
        1
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        2
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        3
      </Button>

      <Button
        disabled
        className="pointer-events-none bg-transparent text-sm font-semibold hover:bg-transparent"
        size="icon-lg"
        variant="muted"
      >
        ...
      </Button>

      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        8
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        <ChevronsLeftDouble className="size-5 rotate-180" />
      </Button>
      <Button className="text-sm font-semibold" size="icon-lg" variant="muted">
        <ChevronsLeft className="size-5 rotate-180" />
      </Button>
    </div>
  )
}
