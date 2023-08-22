import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { APIBankAcctResponse, AcctType } from "@/types/app";
import { FC } from "react";

type AccountCardProps = {
  acct: APIBankAcctResponse;
};

const AccountCard: FC<AccountCardProps> = ({ acct }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer",
        acct.defaultAcct ? "shadow shadow-primary" : "hover:bg-card/80"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{acct.bank.name}</CardTitle>
        {getSvg(acct.bank.type as AcctType)}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(
            acct.bank.type === AcctType.Investment
              ? acct.currvalue
              : acct.balance
          )}
        </div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};

function getSvg(type: AcctType) {
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

export default AccountCard;
