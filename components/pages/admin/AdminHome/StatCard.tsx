import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export interface StatCardProps {
  title: string
  value: string | number | React.ReactNode | null | undefined
  change: string | React.ReactNode | null | undefined
  icon: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function StatCard({ title, value, change, icon, isLoading, className }: StatCardProps) {
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
        <h2 className="text-gray-black-400 text-2xl font-medium">{value ?? 'N/A'}</h2>
      )}
      {isLoading ? (
        <Skeleton className="h-6 w-full bg-gray-200" />
      ) : (
        <p className="text-base text-[#5f6166]">{change ?? 'N/A'}</p>
      )}
    </div>
  )
}
