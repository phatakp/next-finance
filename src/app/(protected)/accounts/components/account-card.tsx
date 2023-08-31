"use client";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import { APIBankAcctResponse, AcctType } from "@/types/app";
import { MoreVertical } from "lucide-react";
import { FC } from "react";
import CountUp from "react-countup";

type AccountCardProps = {
  acct: APIBankAcctResponse;
};

const AccountCard: FC<AccountCardProps> = ({ acct }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer shadow relative hover:shadow-lg",
        acct.defaultAcct
          ? "shadow-primary "
          : "hover:shadow-popover hover:opacity-75"
      )}
    >
      {acct.defaultAcct && (
        <Badge
          variant="success"
          className="absolute top-0 left-4 -translate-y-1/2"
        >
          Default Acct
        </Badge>
      )}
      <MoreVertical className="absolute bottom-4 right-4" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{acct.bank.name}</CardTitle>
        XX-{acct.number.slice(-4)}
      </CardHeader>
      <CardContent className="text-left">
        <div className="text-2xl font-bold tracking-wide">
          <CountUp
            decimals={0}
            prefix={`&#8377;`}
            end={
              acct.bank.type === AcctType.Investment
                ? acct.currvalue
                : acct.balance
            }
          />
        </div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
