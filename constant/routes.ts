import { createRoute } from '@/lib/createRoute'

export const routes = {
  signin: '/signin',
  signup: '/signup',

  admin: {
    propertyList: '/admin/properties-list',
    propertyDashboarDetail: createRoute('/admin/properties-list/[dashboardId]'),

    inspectionList: '/admin/inspection-list',
    inspectionListItemDetail: createRoute('/admin/inspection-list/[inspectionId]'),
  },
} as const
