import { APITxnResponse } from "@/types/app";
import { FC } from "react";

interface TxnDetailCardProps {
  txn: APITxnResponse;
}

const TxnDetailCard: FC<TxnDetailCardProps> = ({ txn }) => {
  return (
    <div className="grid md:grid-cols-3 md:gap-8 gap-4">
      <div className="grid grid-cols-3 md:grid-cols-1">
        <span className="text-muted-foreground">Date</span>
        <span className="col-span-2 opacity-80">
          {new Date(txn.date).toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-1">
        <span className="text-muted-foreground">Txn Type</span>
        <span className="col-span-2 opacity-80">{txn.type}</span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-1">
        <span className="text-muted-foreground">Txn Amount</span>
        <span className="col-span-2 opacity-80">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(txn.amount)}
        </span>
      </div>

      {!!txn.description && (
        <div className="grid grid-cols-3 md:grid-cols-1">
          <span className="text-muted-foreground">Desc</span>
          <span className="truncate col-span-2 opacity-80">
            {txn.description}
          </span>
        </div>
      )}

      {!!txn.category && (
        <div className="grid grid-cols-3 md:grid-cols-1">
          <span className="text-muted-foreground">Tag</span>
          <span className="col-span-2 opacity-80">{`${txn.category.type}-${txn.category.name}`}</span>
        </div>
      )}

      {txn.sourceId && (
        <div className="grid grid-cols-3 md:grid-cols-1">
          <span className="text-muted-foreground">From Account</span>
          <span className="truncate col-span-2 opacity-80">
            {`${txn.source!.bank.name} ${
              txn.source!.bank.type
            } XX-${txn.source!.number.slice(-4)}`}
          </span>
        </div>
      )}

      {txn.destinationId && (
        <div className="grid grid-cols-3 md:grid-cols-1">
          <span className="text-muted-foreground">To Account</span>
          <span className="truncate col-span-2 opacity-80">
            {`${txn.destination!.bank.name} ${
              txn.destination!.bank.type
            } XX-${txn.destination!.number.slice(-4)}`}
          </span>
        </div>
      )}

      {txn.groupName && (
        <div className="grid grid-cols-3 md:grid-cols-1">
          <span className="text-muted-foreground">Group</span>
          <span className="col-span-2 opacity-80">{txn.groupName}</span>
        </div>
      )}
    </div>
  );
};

export default TxnDetailCard;
