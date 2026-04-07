import { createRoute } from '@/lib/createRoute'

export const routes = {
  signin: '/signin',
  signup: '/signup',

  admin: {
    home: '/admin',
    propertyList: '/admin/properties-list',
    propertyDashboarDetail: createRoute('/admin/properties-list/[dashboardId]'),

    inspectionList: '/admin/inspection-list',
    inspectionListItemDetail: createRoute('/admin/inspection-list/[inspectionId]'),
  },

  operational: {
    home: '/operation',

    inspectionList: '/operation/inspection-list',
    inspectionListItemDetail: createRoute('/operation/inspection-list/[inspectionId]'),
  },
} as const
