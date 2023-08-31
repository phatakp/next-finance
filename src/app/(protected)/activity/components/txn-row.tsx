import { Badge } from "@/components/shadcn/ui/badge";
import { cn } from "@/lib/utils";
import { APITxnResponse } from "@/types/app";
import { FC } from "react";
import CategoryIcon from "./category-avatar";

interface TxnRowItemProps {
  txn: APITxnResponse;
}

const TxnRowItem: FC<TxnRowItemProps> = ({ txn }) => {
  return (
    <div className="w-full grid grid-cols-6 gap-x-2 lg:gap-x-8 p-2 items-center text-sm ">
      {/* Category */}
      <div className="font-medium flex items-center gap-3 sm:col-span-2">
        <CategoryIcon category={txn.category ?? undefined} />
        <Badge variant="secondary" className="w-fit hidden sm:flex">
          {txn?.category?.type ?? "Not-Tagged"}
        </Badge>
      </div>

      {/* Account */}
      <div className="flex flex-col col-span-3 items-start">
        <span className="text-base truncate opacity-90">
          {txn.description ?? txn.category?.name ?? "Miscellaneous"}
        </span>
        <div className="flex items-center gap-2 text-muted-foreground font-normal">
          {!!txn.sourceId ? (
            <>
              <span className="truncate">From {txn.source!.bank.name}</span>
              <span className="hidden sm:flex">{txn.source!.bank.type}</span>
              <span className="hidden sm:flex">
                {txn.source!.number.slice(-4)}
              </span>
            </>
          ) : (
            <>
              <span className="truncate">To {txn.destination!.bank.name}</span>
              <span className="hidden sm:flex">
                {txn.destination!.bank.type}
              </span>
              <span className="hidden sm:flex">
                {txn.destination!.number.slice(-4)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div
        className={cn(
          "text-right font-medium text-lg col-span-2 sm:col-span-1",
          txn.type !== "Income" ? "text-destructive" : "text-success"
        )}
      >
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          compactDisplay: "short",
          maximumFractionDigits: 0,
        }).format(txn.amount)}
      </div>
    </div>
  );
};

export default TxnRowItem;
