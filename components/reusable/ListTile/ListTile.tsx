import { cn } from '@/lib/utils'

interface ListTileProps extends Omit<React.ComponentProps<'li'>, 'title'> {
  leading: React.ReactNode
  title: React.ReactNode
  subTitle: React.ReactNode
  tailing: React.ReactNode
  contentWrapperClassName?: string
  titleClassName?: string
  subTitleClassName?: string
}

export function ListTile({
  leading,
  title,
  subTitle,
  tailing,
  className,
  contentWrapperClassName,
  titleClassName,
  subTitleClassName,
  ...props
}: ListTileProps) {
  return (
    <li className={cn('flex items-center gap-2 py-4', className)} {...props}>
      {leading}

      <section className={cn('flex flex-1 flex-col', contentWrapperClassName)}>
        <span className={cn('text-base font-medium', titleClassName)}>{title}</span>
        <span className={cn('text-muted-foreground text-sm', subTitleClassName)}>{subTitle}</span>
      </section>

      {tailing}
    </li>
  )
}
