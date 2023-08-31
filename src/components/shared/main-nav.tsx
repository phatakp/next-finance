"use client";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="mr-4 hidden md:flex items-center">
      <Link href="/" className="mr-6 mt-1 flex items-center space-x-2">
        <Image
          src="https://finance-categories.s3.ap-south-1.amazonaws.com/logo.svg"
          alt=""
          width={50}
          height={50}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {!!session?.user && (
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {docsConfig.mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href as string}
              className={cn(
                "transition-all ease-in duration-300 hover:text-foreground/80",
                pathname === link.href
                  ? "text-primary border-b-4 border-primary py-4 mt-2"
                  : "text-foreground/60 border-b-0 border-primary py-4 mt-1"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
