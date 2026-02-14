import DashboardSidebarHeader from "@/components/dashboard/Sidebar/DashboardSidebarHeader";
import DashBoardSidebr from "@/components/dashboard/Sidebar/DashboardSidebr";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashBoardSidebr />
      <main className="w-full">
        <DashboardSidebarHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
