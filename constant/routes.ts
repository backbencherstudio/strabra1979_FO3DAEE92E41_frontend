import { createRoute } from '@/lib/createRoute'
import { getHomePageByRole } from './role'

export const routes = {
  signin: '/signin',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  varifyEmail: '/varify-email',
  setNewPassword: '/set-new-password',
  signUpSuccess: '/sign-up-success',

  redirects: {
    propertyDetail: createRoute('/r/properties-list/[dashboardId]'),
  },

  admin: {
    home: '/admin',

    propertyList: '/admin/properties-list',
    propertyDetail: createRoute('/admin/properties-list/[dashboardId]'),

    userManagement: '/admin/user-management',

    activityLog: '/admin/activity-log',
    templates: '/admin/templates',
    templatesDetial: createRoute('/admin/templates/[templateId]'),
    inspectionCriteria: '/admin/inspection-criteria',

    inspectionList: '/admin/inspection-list',
    inspectionListItemDetail: createRoute('/admin/inspection-list/[dashboardId]'),

    settings: '/admin/settings',
  },

  operational: {
    home: '/operation',

    inspectionList: '/operation/inspection-list',
    inspectionListItemDetail: createRoute('/operation/inspection-list/[dashboardId]'),

    settings: '/operation/settings',
  },

  manager: {
    home: '/manager',

    propertyList: '/manager/property-list',
    propertyDetail: createRoute('/manager/property-list/[dashboardId]'),

    report: '/manager/report',

    settings: '/manager/settings',
  },

  viewer: {
    home: '/',
    propertyList: '/property-list',
    propertyDetail: createRoute('/property-list/[dashboardId]'),
    settings: '/settings',
  },
} as const

export const publicRoutes = [
  routes.signin,
  routes.signup,
  routes.forgotPassword,
  routes.varifyEmail,
  routes.setNewPassword,
  routes.signUpSuccess,
]
