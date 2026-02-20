import { cn } from '@/lib/utils'
import SectionCard from '../SectionCard/SectionCard'

export interface InfoItem {
  label: string
  value: string
}

interface InfoGridProps {
  items: InfoItem[]
  className?: string
  labelClassName?: string
}

export function InfoGrid({ items, className, labelClassName }: InfoGridProps) {
  return (
    <SectionCard className={cn('grid bg-white max-lg:divide-y lg:grid-cols-3', className)}>
      {items.map((info) => (
        <div key={info.label} className={cn('flex flex-col gap-1 py-3 lg:py-0', labelClassName)}>
          <span className="text-gray-black-300 text-sm">{info.label}</span>
          <span className="text-sm font-medium">{info.value}</span>
        </div>
      ))}
    </SectionCard>
  )
}

