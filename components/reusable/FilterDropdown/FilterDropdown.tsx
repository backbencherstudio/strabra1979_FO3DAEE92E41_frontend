import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Option<T extends string | undefined> = {
  label: string
  value: T
}

type Props<T extends string | undefined> = {
  value?: T
  options: Option<T>[]
  onChange: (value: T) => void
  icon?: React.ReactNode
  placeholder?: string
}

export default function FilterDropdown<T extends string | undefined>({
  value,
  options,
  onChange,
  icon,
  placeholder,
}: Props<T>) {
  const activeLabel = options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="muted" className="gap-2">
          {icon}
          <span className="max-xl:hidden">{activeLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={value === option.value}
              onCheckedChange={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
