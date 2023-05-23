import { cn } from "@/libs/utils";
import Link from "next/link";
import { FC } from "react";

interface INavlinkProps extends INavRoute {}

export const Navlink: FC<INavlinkProps> = ({
    name,
    href,
    icon: Icon,
    isActive,
}) => {
    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex items-center text-sm transition-all ease-in-out duration-200 hover:scale-110 hover:text-primary p-1",
                    isActive && "border-b-2 border-primary text-primary"
                )}
            >
                <Icon />
                <span className="ml-2">{name}</span>
            </div>
        </Link>
    );
};
