import { cn } from '@/lib/utils'

interface InfoCardProps extends React.ComponentProps<'div'> {
  title?: string
  description?: string
  headerWrapperClass?: string
}

export default function InfoCard({
  title,
  description,
  children,
  className,
  headerWrapperClass,
}: InfoCardProps) {
  return (
    <div className={cn('border-input space-y-4 rounded-md border bg-white p-3', className)}>
      {title ? (
        <div className={cn('flex items-center justify-between', headerWrapperClass)}>
          <h3 className="text-base font-medium">{title}</h3>
          {children}
        </div>
      ) : null}

      {description ? <div className="text-sm">{description}</div> : null}
    </div>
  )
}
