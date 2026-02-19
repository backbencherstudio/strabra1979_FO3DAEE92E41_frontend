import { cn } from '@/lib/utils'

export default function SectionCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('border-hover-50 bg-normal-25 rounded-2xl border px-4 py-5', className)}
      {...props}
    />
  )
}

export function SectionTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 className={cn('text-xl font-medium', className)} {...props} />
}
