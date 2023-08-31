"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../shadcn/ui/button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import ThemeToggle from "./theme-toggle";
import UserProfileDropdown from "./user-profile-dropdown";

export default function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b border-input bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        {!!session?.user ? (
          <MobileNav />
        ) : (
          <Link href="/" className="md:hidden">
            <Image
              src="https://finance-categories.s3.ap-south-1.amazonaws.com/logo.svg"
              alt=""
              width={40}
              height={40}
            />
          </Link>
        )}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            {session?.user ? (
              <UserProfileDropdown user={session.user} />
            ) : (
              <Link href="/login" className={cn(buttonVariants())}>
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
