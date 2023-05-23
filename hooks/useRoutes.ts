"use client";

import { ClipboardList, Landmark, LayoutDashboard, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useRoutes() {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
                isActive: pathname.startsWith("/dashboard"),
            },
            {
                name: "Accounts",
                href: "/accounts",
                icon: Landmark,
                isActive: pathname.startsWith("/accounts"),
            },
            {
                name: "Activity",
                href: "/activity",
                icon: ClipboardList,
                isActive: pathname.startsWith("/activity"),
            },
            {
                name: "Groups",
                href: "/groups",
                icon: User2,
                isActive: pathname.startsWith("/groups"),
            },
        ],
        [pathname]
    );

    return routes;
}
