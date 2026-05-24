import { FileEditBlue } from '@/components/icons/FileEditBlue'
import { User } from '@/components/icons/User'
import { formatTimeAndDate } from '@/lib/farmatters'
import { cn } from '@/lib/utils'
import { IActivityLogListItem, IAuthUserRole } from '@/types'

interface ActivityLogItemProps {
  log: IActivityLogListItem
  hideRole?: boolean
}

const ActivityLogListItem = ({ log, hideRole = false }: ActivityLogItemProps) => {
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
      <div className="flex flex-1 flex-col gap-x-3 gap-y-0.5 lg:flex-row">
        <div className="space-y-0.5">
          <h3 className="text-gray-black-400 text-sm leading-snug">{message}</h3>
          <p className="row-start-2 text-xs text-gray-400">{formatTimeAndDate(created_at)}</p>
        </div>

        {/* Role Badge */}
        {!hideRole ? (
          <div className="">
            <RoleBadge role={actor_role} />
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default ActivityLogListItem

function RoleBadge({ role }: { role: IAuthUserRole }) {
  const colors: Record<IAuthUserRole, string> = {
    ADMIN: 'bg-gray-black-100/50',
    PROPERTY_MANAGER: 'bg-mid-orange/50',
    AUTHORIZED_VIEWER: 'bg-[#4ba7ff]/50',
    OPERATIONAL: 'bg-[#05d945]/50',
  }

  const color = colors[role] ?? colors.ADMIN

  return (
    <p
      className={cn('inline-flex rounded-full px-2 py-1 text-center text-[10px] text-black', color)}
    >
      {role}
    </p>
  )
}
