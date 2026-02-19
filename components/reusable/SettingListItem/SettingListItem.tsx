import { cn } from '@/lib/utils'

interface SettingListItemProps extends React.ComponentProps<'div'> {
  title: string
  titleClassName?: string
}
export default function SettingListItem({
  title,
  children,
  className,
  titleClassName,
  ...props
}: SettingListItemProps) {
  return (
    <div
      className={cn(
        'border-input flex items-center justify-between rounded-md border bg-white p-3',
        className,
      )}
      {...props}
    >
      <h5 className={cn('text-gray-black-500 text-sm font-medium', titleClassName)}>{title}</h5>
      {children}
    </div>
  )
}
