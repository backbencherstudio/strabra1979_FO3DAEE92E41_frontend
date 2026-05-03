import { SortingIcon } from '@/components/icons/SortIcon'
import FilterDropdown from '../FilterDropdown/FilterDropdown'
import { InspectionProgressStatus } from '@/types'

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

interface InspectionProgressFilterDropdownProps {
  value: InspectionProgressStatus | undefined
  onChange: (value: InspectionProgressStatus | undefined) => void
}

export function InspectionProgressFilterDropdown({
  value,
  onChange,
}: InspectionProgressFilterDropdownProps) {
  return (
    <FilterDropdown
      value={value}
      onChange={onChange}
      icon={<SortingIcon className="size-5" />}
      placeholder="Filter"
      options={[
        { label: 'All', value: undefined },
        { label: 'Assigned', value: 'ASSIGNED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Completed', value: 'COMPLETE' },
        { label: 'Due', value: 'DUE' },
      ]}
    />
  )
}
