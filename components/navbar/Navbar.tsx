"use client";

import logo from "@/assets/images/logo.png";
import { Navlink } from "@/components/navbar/Navlink";
import { Sidebar } from "@/components/navbar/Sidebar";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { Button } from "@/components/ui/Button";
import useRoutes from "@/hooks/useRoutes";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const routes = useRoutes();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="fixed top-0 right-0 w-screen shadow-light dark:shadow-dark">
            <nav className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl">
                <Button
                    variant="ghost"
                    className="transition duration-150 ease-in-out md:hidden"
                    onClick={openSidebar}
                >
                    <Menu />
                </Button>

                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

                <Link href={"/"}>
                    <div className="w-16 h-16 cursor-pointer hover:opacity-75">
                        <Image src={logo} alt="logo" />
                    </div>
                </Link>

                <div className="items-center justify-end flex-1 hidden space-x-8 md:flex">
                    {routes.map((link) => (
                        <Navlink key={link.name} {...link} />
                    ))}
                </div>
                <ThemeToggle />
            </nav>
        </div>
    );
}
