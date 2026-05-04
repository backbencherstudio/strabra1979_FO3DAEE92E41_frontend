import { cn } from '@/lib/utils'
import SectionCard from '../SectionCard/SectionCard'

export default function EmptyMessage({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <SectionCard {...props} className={cn('grid h-30 place-items-center bg-white', className)}>
      <p className="text-muted-foreground text-center text-sm">{children}</p>
    </SectionCard>
  )
}
