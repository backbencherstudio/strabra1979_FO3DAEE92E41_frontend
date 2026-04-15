import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export default function FullPageSpinner({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section className={cn('grid fixed left-0 top-0 w-full h-full z-1000 place-items-center', className)} {...props}>
      <Spinner className="size-6" />
    </section>
  )
}
