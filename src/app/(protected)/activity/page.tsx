"use client";
import { Metadata } from "next";
import { FC, useCallback, useContext, useState } from "react";
import TxnList from "./components/txn-list";
import { TxnContext } from "./components/txn-provider";
import TxnSearch from "./components/txn-search";

export const metadata: Metadata = {
  title: "Activity | Expensio",
  description: "Personal Expense Tracker Activity",
};

type ActivityPageProps = {};

const ActivityPage: FC<ActivityPageProps> = ({}) => {
  const { txns } = useContext(TxnContext);
  const [query, setQuery] = useState<string>("");

  const getQuery = useCallback((query: string) => setQuery(query), []);

  const txnData =
    query.length > 2
      ? txns?.filter(
          (txn) =>
            txn?.description?.toLowerCase().includes(query.toLowerCase()) ||
            txn.category?.name.toLowerCase().includes(query.toLowerCase()) ||
            txn.category?.type.toLowerCase().includes(query.toLowerCase())
        )
      : txns;

  return (
    <>
      <TxnSearch getQuery={getQuery} />
      <div className="rounded-xl border border-input md:p-8 px-3 py-8 shadow-mg shadow-background">
        <TxnList txns={txnData} />
      </div>
    </>
  );
};

export default ActivityPage;
