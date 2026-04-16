import { SocketProvider } from '@/api/socket/SocketProvider'
import DashboardSidebarHeader from '@/components/dashboard/Sidebar/DashboardSidebarHeader'
import DashBoardSidebr from '@/components/dashboard/Sidebar/DashboardSidebr'
import { SidebarProvider } from '@/components/ui/sidebar'

const DASHBOARD_HEADER_HEIGHT = '5rem'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <SocketProvider>
        <DashBoardSidebr />
        <main
          style={
            {
              '--dashboard-header-height': DASHBOARD_HEADER_HEIGHT,
            } as React.CSSProperties
          }
          className="w-full flex-1 md:w-[calc(100vw-var(--sidebar-width))]"
        >
          <DashboardSidebarHeader />
          <div className="dashboard-layout-wrapper flex min-h-[calc(100vh-var(--dashboard-header-height))] w-full flex-col">
            {children}
          </div>
        </main>
      </SocketProvider>
    </SidebarProvider>
  )
}
