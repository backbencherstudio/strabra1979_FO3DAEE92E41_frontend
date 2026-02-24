'use client'

import { Notification } from '@/components/icons/Notification'
import UserAvatar from '@/components/reusable/UserAvatar'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardSidebarHeader() {
  // const { logOut } = useAuth();

  return (
    <header className="border-sidebar-border sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4 z-50">
      <div className="text-heading-100 flex items-center gap-2">
        <SidebarTrigger />
        <h3 className="font-heading text-lg md:text-2xl font-medium">Dashboard</h3>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button size="icon-lg" variant="outline" className="rounded-full shadow-none">
          <Notification className="size-6" />
        </Button>

        <UserInfo />
      </div>
    </header>
  )
}

const UserInfo = () => {
  return (
    <div className="border-opacity-dark-05 flex h-12 items-center justify-start gap-1.5 rounded-full border px-1.5">
      <UserAvatar
        src="https://i.pravatar.cc/150?img=5"
        name="Gustavo Xavier"
        className="border-pressed-100 size-9 border"
      />
      <div className="hidden flex-col items-start justify-between gap-1.5 pr-6 sm:flex">
        <span className="block text-sm leading-3 font-medium">Gustavo Xavier</span>
        <span className="bg-mid-orange text-foreground block rounded-full px-1.5 pb-px text-center text-[10px] font-medium">
          Operation
        </span>
      </div>
    </div>
  )
}
