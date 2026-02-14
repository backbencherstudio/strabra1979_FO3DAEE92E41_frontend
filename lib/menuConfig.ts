export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export type UserRole = 'admin' | 'manager' | 'operation' | 'viewer';

// ==================== ADMIN MENU - 2 ITEMS ====================
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

// ==================== MANAGER MENU - 2 ITEMS ====================
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

// ==================== OPERATION MENU - 2 ITEMS ====================
export const operationMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/operation',
  },
  {
    id: 'tasks',
    label: 'Inspection List',
    href: '/operation/inspection-list',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/operation/settings',
  },
];

// ==================== VIEWER MENU - 2 ITEMS ====================
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

// Role-based menu mapping
export const roleMenus = {
  admin: adminMenu,
  manager: managerMenu,
  operation: operationMenu,
  viewer: viewerMenu,
};

// Helper function to get menu by role
export const getMenuByRole = (role: UserRole): MenuItem[] => {
  return roleMenus[role as keyof typeof roleMenus] || [];
};
