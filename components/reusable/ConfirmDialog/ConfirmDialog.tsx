import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ConfirmDialog extends React.ComponentProps<typeof AlertDialog> {
  title: string
  desc: string
  iconContainerClass?: string
  trigger?: ReactNode
  icon?: ReactNode
}

export default function ConfirmDialog({
  title,
  desc,
  icon,
  trigger,
  iconContainerClass,
  children,
  ...props
}: ConfirmDialog) {
  return (
    <AlertDialog {...props}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          {icon ? (
            <div className="mb-2 flex w-full items-center justify-center">
              <div className={cn('bg-primary rounded-xl p-3 text-white', iconContainerClass)}>
                {icon}
              </div>
            </div>
          ) : null}
          <AlertDialogTitle className="w-full">{title}</AlertDialogTitle>
          <AlertDialogDescription className="w-full">{desc}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:*:flex-1">{children}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
