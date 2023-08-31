"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./user-avatar";

interface UserProfileDropdownProps {
  user: User;
}

const UserProfileDropdown: FC<UserProfileDropdownProps> = ({ user }) => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-col bg-accent text-accent-foreground">
          <span className="text-sm font-normal">{user.name}</span>
          <span className="text-xs font-light">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
