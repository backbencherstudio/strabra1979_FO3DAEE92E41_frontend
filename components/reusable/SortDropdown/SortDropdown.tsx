import { SortingIcon } from '@/components/icons/SortIcon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  sortOrder: 'asc' | 'desc'
  onChange: (value: 'asc' | 'desc') => void
}

export default function SortDropdown({ sortOrder, onChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="muted" className="gap-2">
          <SortingIcon className="size-5" />
          <span className="max-xl:hidden">
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="text-navy-300">
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={sortOrder === 'desc'}
            onCheckedChange={() => onChange('desc')}
          >
            Newest First
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            checked={sortOrder === 'asc'}
            onCheckedChange={() => onChange('asc')}
          >
            Oldest First
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
