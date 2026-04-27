import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export type DialogProps = React.ComponentProps<typeof Dialog>

export const CREATE_INPUT_TYPES = [
  'input-text',
  'input-dropdown',
  'input-date',
  'input-mark',
  'input-textarea',
  'input-media',
  'input-media-embedded',
] as const

export type InputFieldType = (typeof CREATE_INPUT_TYPES)[number]

interface EditInputFeildsProps
  extends React.PropsWithChildren, React.ComponentProps<typeof Dialog> {
  title: string
  titleClass?: string
  dialogContainerClass?: string
  trigger?: ReactNode
  headdingAction?: ReactNode
  icon?: ReactNode
  footer?: ReactNode
}

export function EditInputDialog({
  title,
  titleClass,
  footer,
  trigger,
  children,
  headdingAction,
  dialogContainerClass,
  ...props
}: EditInputFeildsProps) {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn('px-0 sm:max-w-156', dialogContainerClass)}
        showCloseButton={false}
      >
        <DialogHeader className="px-6">
          <div className="flex items-center justify-between">
            <DialogTitle
              className={cn('text-foreground text-left text-xl font-medium', titleClass)}
            >
              {title}
            </DialogTitle>

            {headdingAction}
          </div>
          <DialogDescription className="sr-only">Edit input feilds</DialogDescription>
        </DialogHeader>

        <section className="slim-scrollbar flex max-h-[75svh] flex-col overflow-y-auto px-6">
          {children}
        </section>
        <DialogFooter className="px-6 pt-2 *:flex-1">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
