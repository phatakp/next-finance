import { getUserTxns } from "@/app/api/_actions/transactions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { AcctType } from "@/types/app";
import { FC } from "react";
import AcctTxnTable from "./acct-txn-table";

type AcctTxnsProps = {
  type: AcctType;
};

const AcctTxns: FC<AcctTxnsProps> = async ({ type }) => {
  const { data: transactions } = await getUserTxns();
  const filteredTxns = transactions?.filter(
    (txn) =>
      txn.source?.bank.type === type || txn.destination?.bank.type === type
  );
  return (
    <Card className="border-0 bg-background shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="capitalize text-xl md:text-2xl font-semibold">
          {type} transactions
        </CardTitle>
        <CardDescription>
          You have {filteredTxns?.length} transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-8">
        <AcctTxnTable txns={filteredTxns} />
      </CardContent>
    </Card>
  );
};

export default AcctTxns;
