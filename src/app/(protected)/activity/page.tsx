import { getUserTxns } from "@/app/api/_actions/transactions";
import { Metadata } from "next";
import { FC } from "react";
import TxnList from "./components/txn-list";
import TxnContextProvider from "./components/txn-provider";
import TxnSearch from "./components/txn-search";

export const metadata: Metadata = {
  title: "Activity | Expensio",
  description: "Personal Expense Tracker Activity",
};

type ActivityPageProps = {};

const ActivityPage: FC<ActivityPageProps> = async ({}) => {
  const { data: transactions } = await getUserTxns();

  return (
    <TxnContextProvider initTxns={transactions}>
      <TxnSearch />
      <div className="rounded-xl border border-input md:p-8 px-3 py-8 shadow-mg shadow-background">
        <TxnList />
      </div>
    </TxnContextProvider>
  );
};

export default ActivityPage;
