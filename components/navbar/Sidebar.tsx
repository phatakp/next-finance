import logo from "@/assets/images/logo.png";
import { Navlink } from "@/components/navbar/Navlink";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ISidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: FC<ISidebarProps> = ({ isOpen, onClose }) => {
    const routes = useRoutes();

    return (
        <div
            className={cn(
                "absolute top-0 left-0 z-50 min-h-screen transition-all duration-500 ease-in-out bg-light dark:bg-dark shadow-light dark:shadow-dark",
                isOpen && "w-72",
                !isOpen && "w-0"
            )}
        >
            {isOpen && (
                <div className="flex flex-col space-y-10">
                    <div className="flex items-center justify-between w-full p-4">
                        <Link href={"/"}>
                            <div className="w-16 h-16 cursor-pointer hover:opacity-75">
                                <Image src={logo} alt="logo" />
                            </div>
                        </Link>
                        <div
                            onClick={onClose}
                            className="transition duration-150 ease-in-out cursor-pointer hover:scale-125"
                        >
                            <X />
                        </div>
                    </div>

                    <div className="flex flex-col px-6 space-y-12">
                        {routes.map((link) => (
                            <Navlink key={link.name} {...link} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
