import {
  DashboardSquare03,
  Property,
  Settings02,
} from "@/components/icons/SideBarIcons";

import { ComponentType } from "react";
export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  isActive?: (item: MenuItem, pathname: string) => boolean
}

export type UserRole = "admin" | "manager" | "operation" | "viewer";

 
export const adminMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: DashboardSquare03,
  },
  {
    id: "users",
    label: "Users",
    href: "/admin/users",
    icon: DashboardSquare03,
  },
];

 
export const managerMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/manager",
    icon: DashboardSquare03,
  },
  {
    id: "team",
    label: "Team",
    href: "/manager/team",
    icon: DashboardSquare03,
  },
];
 
export const operationMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/operation",
    isActive: (item: MenuItem, pathname: string) => item.href === pathname,
    icon: DashboardSquare03,
  },
  {
    id: "tasks",
    label: "Inspection List",
    href: "/operation/inspection-list",
    icon: Property,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/operation/settings",
    icon: Settings02,
  },
];

 
export const viewerMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/viewer",
    icon: DashboardSquare03,
  },
  {
    id: "browse",
    label: "Browse",
    href: "/viewer/browse",
    icon: DashboardSquare03,
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
