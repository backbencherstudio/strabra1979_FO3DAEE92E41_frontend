import { getHomePageByRole, routes } from '@/constant'
import { getAuthCookies } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ dashboardId: string }>
}

// Redirect to dashboard with valid user role
export default async function Page({ params }: PageProps) {
  const { token, role } = await getAuthCookies()
  const { dashboardId } = await params

  if (!token || !role) {
    redirect(routes.signin)
  }

  const userHomePath = getHomePageByRole(role)

  switch (role) {
    case 'ADMIN':
      redirect(routes.admin.propertyDetail.build({ dashboardId }))

    case 'PROPERTY_MANAGER':
      redirect(routes.manager.propertyDetail.build({ dashboardId }))

    case 'OPERATIONAL':
      redirect(routes.operational.inspectionListItemDetail.build({ dashboardId }))

    case 'AUTHORIZED_VIEWER':
      redirect(routes.viewer.propertyDetail.build({ dashboardId }))

    default:
      redirect(userHomePath ?? routes.signin)
  }
}
