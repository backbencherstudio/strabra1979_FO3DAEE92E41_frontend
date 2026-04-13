import AdminPropertyDashboardReport from '@/components/pages/admin/property-list/AdminPropertyDashboardReport'

interface PropertyDetailPageProps {
  params: Promise<{
    dashboardId: string
  }>
}

export default async function PropertyDetailReportPage({ params }: PropertyDetailPageProps) {
  const { dashboardId } = await params

  return <AdminPropertyDashboardReport dashboardId={dashboardId} />
}
