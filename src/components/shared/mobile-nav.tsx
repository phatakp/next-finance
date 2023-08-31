"use client";
import { Button } from "@/components/shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn, getAcctTypes } from "@/lib/utils";
import { AcctType } from "@/types/app";
import { PanelLeftOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Icons } from "./icons";
import UserAvatar from "./user-avatar";

export function MobileNav() {
  const [types, setTypes] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetch() {
      const t = await getAcctTypes();
      setTypes(t);
    }
    fetch();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <PanelLeftOpen className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="grid items-center justify-center w-full"
      >
        <MobileLink
          href="/"
          className="flex items-center hover:bg-transparent opacity-100 w-full"
          onOpenChange={setOpen}
        >
          <Image
            src="https://finance-categories.s3.ap-south-1.amazonaws.com/logo.svg"
            alt=""
            width={40}
            height={40}
          />
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </MobileLink>

        <UserAvatar image={session!.user.image} className="w-24 h-24 mx-auto" />

        <div className="flex flex-col mx-auto">
          <span className="text-sm text-muted-foreground mx-auto">
            Welcome back
          </span>
          <span className="font-semibold mx-auto">{session?.user.name}</span>
        </div>

        {/* Main Navigation Items */}
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 w-full">
          <div className="grid items-center justify-center w-full space-y-4">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    <Image
                      src={`https://finance-categories.s3.ap-south-1.amazonaws.com/${item.title.toLowerCase()}.png`}
                      alt=""
                      width={32}
                      height={32}
                    />
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>

          <div className="grid items-center justify-center w-full space-y-4 mt-8">
            <h4 className="font-medium px-4">Accounts</h4>
            {types?.length &&
              types.map((type: string) => (
                <MobileLink
                  key={type}
                  href={{
                    pathname: "/accounts",
                    query: { type },
                  }}
                  onOpenChange={setOpen}
                >
                  {getSvg(type as AcctType)}
                  {type}
                </MobileLink>
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href as string);
        onOpenChange?.(false);
      }}
      className={cn(
        "flex items-center gap-4 opacity-90 hover:text-primary text-accent-foreground px-4 py-2 w-full transition-all duration-300 ease-in-out hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function getSvg(type: AcctType) {
  switch (type) {
    case AcctType.Wallet:
      return <Icons.wallet />;
    case AcctType.Investment:
      return <Icons.investment />;
    case AcctType.Mortgage:
      return <Icons.mortgage />;
    case AcctType.CreditCard:
      return <Icons.creditcard />;
    default:
      return <Icons.savings />;
  }
}
