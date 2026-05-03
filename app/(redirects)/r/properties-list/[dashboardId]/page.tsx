import { getDashboardPathWithRole, routes } from '@/constant'
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

  redirect(getDashboardPathWithRole(role, dashboardId))
}
