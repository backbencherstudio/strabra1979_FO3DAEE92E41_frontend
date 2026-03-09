import { FileEditBlue } from '@/components/icons/FileEditBlue'
import { User } from '@/components/icons/User'
import { IActivityLogListItem } from '@/types'
import { PropsWithChildren } from 'react'

interface ActivityLogItemProps {
  log: IActivityLogListItem
}

const ActivityLogListItem = ({ log }: ActivityLogItemProps) => {
  const { category, message, created_at, actor_role } = log

  // Configuration based on category
  const isPropertyUpdate = category === 'PROPERTY_DASHBOARD_UPDATE'
  const iconBg = isPropertyUpdate ? 'bg-[#e5f3fe]' : 'bg-[#fbf5db]'

  return (
    <li className="flex items-start gap-3">
      {/* Icon Container */}
      <div className={`p-1.5 ${iconBg} mt-0.5 inline-block rounded-full`}>
        {isPropertyUpdate ? <FileEditBlue className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-gray-black-400 text-sm leading-snug">{message}</h3>
        <p className="mt-1 text-xs text-gray-400">{created_at}</p>
      </div>

      {/* Role Badge */}
      <div className="shrink-0">
        <Badge>{actor_role}</Badge>
      </div>
    </li>
  )
}

export default ActivityLogListItem

function Badge({ children }: PropsWithChildren) {
  if (typeof children !== 'string') {
    return null
  }
  const badge = children.toUpperCase()

  return (
    <p
      className={`inline-block rounded-full px-2 py-1 text-xs text-black ${
        badge === 'OPERATION'
          ? 'bg-mid-orange'
          : badge === 'ADMIN'
            ? 'bg-gray-black-100'
            : badge === 'AUTHORIZED VIEWER'
              ? 'bg-[#4ba7ff]'
              : badge === 'PROPERTY MANAGER'
                ? 'bg-[#05d945]'
                : 'bg-gray-black-100'
      }`}
    >
      {badge}
    </p>
  )
}
