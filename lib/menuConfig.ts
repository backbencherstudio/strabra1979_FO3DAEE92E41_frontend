export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export type UserRole = 'admin' | 'manager' | 'operation' | 'viewer';

 
export const adminMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin',
  },
  {
    id: 'users',
    label: 'Users',
    href: '/admin/users',
  },
];

 
export const managerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/manager',
  },
  {
    id: 'team',
    label: 'Team',
    href: '/manager/team',
  },
];
 
export const operationMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/operation',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    href: '/operation/tasks',
  },
];

 
export const viewerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/viewer',
  },
  {
    id: 'browse',
    label: 'Browse',
    href: '/viewer/browse',
  },
];

 
export const roleMenus = {
  admin: adminMenu,
  manager: managerMenu,
  operation: operationMenu,
  viewer: viewerMenu,
};

 
export const getMenuByRole = (role: string): MenuItem[] => {
  return roleMenus[role as keyof typeof roleMenus] || [];
};