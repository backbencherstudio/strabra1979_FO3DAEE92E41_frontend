'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string
  name?: string
}

export default function UserAvatar({ src, name = '', className, ...props }: UserAvatarProps) {
  return (
    <Avatar className={cn('border-pressed-100 size-10 border', className)} {...props}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

const getInitials = (fullName: string): string => {
  if (!fullName) return 'U'

  const names = fullName.trim().split(' ')

  if (names.length === 1) {
    return names[0][0]?.toUpperCase() ?? 'U'
  }

  return (names[0][0]?.toUpperCase() ?? '') + (names[names.length - 1][0]?.toUpperCase() ?? '')
}
