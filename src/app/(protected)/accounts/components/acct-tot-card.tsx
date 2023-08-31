"use client";
import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { Icons } from "@/components/shared/icons";

import { cn } from "@/lib/utils";
import { AcctType } from "@/types/app";
import { FC } from "react";
import CountUp from "react-countup";

type AcctTotCardProps = {
  total: number;
  type: string;
};

const AcctTotCard: FC<AcctTotCardProps> = ({ total, type }) => {
  return (
    <Card
      className={cn(
        "shadow relative max-w-sm my-8 h-16",
        total < 0 ? "shadow-destructive" : "shadow-success"
      )}
    >
      <Badge className="absolute left-4 -translate-y-1/2">Total {type}</Badge>
      <CardHeader className="absolute right-0">
        {getSvg(type as AcctType)}
      </CardHeader>
      <CardContent className="absolute -bottom-4 left-0">
        <div className="text-3xl font-bold m-0 p-0 tracking-wide">
          <CountUp decimals={0} prefix={`&#8377;`} end={total} />
        </div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};

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

export default AcctTotCard;
