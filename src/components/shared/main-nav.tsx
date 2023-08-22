"use client";
import { Icons } from "@/components/shared/icons";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {docsConfig.mainNav.map((link) => (
          <Link
            key={link.href}
            href={link.href as string}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === link.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
