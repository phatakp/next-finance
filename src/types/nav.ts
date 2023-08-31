import { StaticImageData } from "next/image";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  // icon?: keyof typeof Icons;
  icon?: StaticImageData;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};

export type SidebarNavItem = NavItemWithChildren & {};
