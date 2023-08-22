import { AcctType } from "../types/app";
import { MainNavItem, SidebarNavItem } from "../types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Accounts",
      href: "/accounts",
    },
    {
      title: "Activity",
      href: "/activity",
    },
    {
      title: "Groups",
      href: "/groups",
    },
  ],
  sidebarNav: [
    {
      title: "Accounts",
      items: Object.keys(AcctType).map((type) => ({
        title: type,
        href: `/accounts/${type.toLowerCase()}`,
        items: [],
      })),
    },
  ],
};

export const CashAcctNumber = "XX-Cash";
