import AdminPropertyDashboard from '@/components/pages/admin/property-list/AdminPropertyDashboard'

interface PropertyDetailPageProps {
  params: Promise<{
    dashboardId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { dashboardId } = await params
  return <AdminPropertyDashboard dashboardId={dashboardId} />
}
