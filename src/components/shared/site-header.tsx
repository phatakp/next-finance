"use client";

import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../shadcn/ui/button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import ThemeToggle from "./theme-toggle";

export default function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b border-input bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            {session?.user ? (
              <Link
                href="/"
                onClick={() => signOut()}
                className={cn(buttonVariants())}
              >
                Logout
              </Link>
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
