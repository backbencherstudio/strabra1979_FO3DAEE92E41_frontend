import { SortingIcon } from '@/components/icons/SortIcon'
import FilterDropdown from '../FilterDropdown/FilterDropdown'

type Props = {
  sortOrder: 'asc' | 'desc'
  onChange: (value: 'asc' | 'desc') => void
}

export default function SortDropdown({ sortOrder, onChange }: Props) {
  return (
    <FilterDropdown
      value={sortOrder}
      onChange={onChange}
      icon={<SortingIcon className="size-5" />}
      placeholder="Sort"
      options={[
        { label: 'Newest First', value: 'desc' },
        { label: 'Oldest First', value: 'asc' },
      ]}
    />
  )
}
