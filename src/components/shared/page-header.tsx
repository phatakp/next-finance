"use client";
import AccountButton from "@/app/(protected)/accounts/components/account-form/account-btn";
import TxnButton from "@/app/(protected)/activity/components/txn-form/txn-button";
import { FormAction } from "@/types/app";
import { usePathname } from "next/navigation";
import { FC } from "react";

type PageHeaderProps = {};

const PageHeader: FC<PageHeaderProps> = ({}) => {
  const pathName = usePathname();

  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-4xl font-bold tracking-wide font-fira capitalize">
        {pathName?.slice(1)}
      </h1>
      {pathName === "/accounts" && <AccountButton action={FormAction.Add} />}
      {pathName === "/activity" && <TxnButton action={FormAction.Add} />}
    </div>
  );
};

export default PageHeader;
