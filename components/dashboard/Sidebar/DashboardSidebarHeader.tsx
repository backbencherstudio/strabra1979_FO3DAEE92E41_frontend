"use client";

import { Notification } from "@/components/icons/Notification";
import UserAvatar from "@/components/reusable/UserAvatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardSidebarHeader() {
  // const { logOut } = useAuth();

  return (
    <header className="border-sidebar-border sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
      <div className="text-heading-100 flex items-center gap-2">
        <SidebarTrigger />
        <h3 className="font-heading text-2xl font-medium">Dashboard</h3>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="icon-lg"
          variant="outline"
          className="shadow-none rounded-full"
        >
          <Notification className="size-6" />
        </Button>

        <UserInfo />
      </div>
    </header>
  );
}

const UserInfo = () => {
  return (
    <div className="h-12 px-1.5 gap-1.5 items-center justify-start rounded-full flex border border-opacity-dark-05">
      <UserAvatar
        src="https://i.pravatar.cc/150?img=5"
        name="Gustavo Xavier"
        className="size-9 border border-pressed-100"
      />
      <div className="flex  flex-col items-start justify-between gap-1.5 pr-6  ">
        <span className="text-sm font-medium block leading-3">
          Gustavo Xavier
        </span>
        <span className="bg-mid-orange text-center pb-px text-[10px] font-medium text-foreground rounded-full px-1.5 block">
          Operation
        </span>
      </div>
    </div>
  );
};
