"use client";

import { APITxnResponse } from "@/types/app";
import TxnCard from "./txn-card";

const TxnList = ({ txns }: { txns: APITxnResponse[] | undefined }) => {
  return (
    <div className="w-full space-y-8">
      {(!txns || txns.length === 0) && (
        <div className="text-lg font-medium">No transactions to display!</div>
      )}
      {txns?.map((txn, i, txns) => (
        <div key={txn.id} className="flex flex-col gap-4">
          {/* Txn Date */}
          {(i === 0 ||
            (i > 0 &&
              txn.date.toISOString().slice(0, 10) !==
                txns[i - 1].date.toISOString().slice(0, 10))) && (
            <span className="bg-secondary text-secondary-foreground text-lg font-medium px-4 py-2 rounded">
              {new Date(txn.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          <TxnCard key={txn.id} txn={txn} />
        </div>
      ))}
    </div>
  );
};

export default TxnList;
