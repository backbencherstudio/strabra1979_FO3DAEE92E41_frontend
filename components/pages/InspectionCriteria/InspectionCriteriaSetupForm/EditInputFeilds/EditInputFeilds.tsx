import { Trush } from '@/components/icons/Trush'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface EditInputFeildsProps extends React.PropsWithChildren {
  title: string
  iconContainerClass?: string
  trigger: ReactNode
  icon?: ReactNode
  footer?: ReactNode
}

export default function EditInputFeilds({
  title,
  footer,
  trigger,
  children,
}: EditInputFeildsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[624px]" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground text-left text-xl font-medium">
              {title}
            </DialogTitle>

            <Button size="icon" variant="muted">
              <Trush className="text-destructive size-5" />
            </Button>
          </div>
          <DialogDescription className="sr-only">Edit input feilds</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>

      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  )
}
