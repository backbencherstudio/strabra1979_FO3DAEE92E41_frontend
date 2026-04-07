import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { withNA } from '@/lib/farmatters'

export interface StatListItemProps {
  title: string
  value: string | number | React.ReactNode | null | undefined
  subtitle: string | React.ReactNode | null | undefined
  icon: React.ReactNode
  isLoading?: boolean
  className?: string
}

export default function StatListItem({
  title,
  value,
  subtitle,
  icon,
  isLoading,
  className,
}: StatListItemProps) {
  return (
    <div
      className={cn(
        'bg-disabled-0 w-full space-y-2 rounded-3xl border border-[#ebeeef] p-4.5',
        className,
      )}
    >
      <div className="flex justify-between">
        <p className="text-base text-[#5f6166]">{title}</p>
        {icon}
      </div>

      {isLoading ? (
        <Skeleton className="h-8 w-20 bg-gray-200" />
      ) : (
        <h2 className="text-gray-black-400 text-2xl font-medium">{withNA(value)}</h2>
      )}
      {isLoading ? (
        <Skeleton className="h-4 w-full bg-gray-200" />
      ) : (
        <p className="text-xs text-[#5f6166]">{subtitle}</p>
      )}
    </div>
  )
}
