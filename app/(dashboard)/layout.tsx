import DashboardSidebarHeader from '@/components/dashboard/Sidebar/DashboardSidebarHeader'
import DashBoardSidebr from '@/components/dashboard/Sidebar/DashboardSidebr'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <DashBoardSidebr />
      <main className="w-full flex-1 md:w-[calc(100vw-var(--sidebar-width))]">
        <DashboardSidebarHeader />
        <div className="w-full p-4 xl:p-6">{children}</div>
      </main>
    </SidebarProvider>
  )
}
