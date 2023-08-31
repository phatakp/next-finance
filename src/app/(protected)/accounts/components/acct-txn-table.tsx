"use client";
import { APITxnResponse } from "@/types/app";
import { FC, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type AcctTxnTableProps = {
  txns: APITxnResponse[] | undefined;
};

const PER_PAGE_SIZE = 5;

const AcctTxnTable: FC<AcctTxnTableProps> = ({ txns }) => {
  const [page, setPage] = useState(1);
  const totalPages = !!txns ? Math.ceil(txns.length / PER_PAGE_SIZE) : 1;
  const start = (page - 1) * PER_PAGE_SIZE;
  const end = start + PER_PAGE_SIZE;
  const pageTxns = txns?.slice(start, end);

  if (!txns || txns.length === 0) return null;

  return (
    <Table className="min-w-[300px]">
      <TableCaption>
        <div className="flex items-center justify-between mb-4">
          <div>
            Page {page} of {totalPages}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <ChevronFirst
                className={cn(
                  page === 1
                    ? "cursor-not-allowed pointer-events-none"
                    : "hover:bg-accent cursor-pointer hover:text-accent-foreground"
                )}
                onClick={() => setPage(1)}
              />
              <ChevronLeft
                className={cn(
                  page === 1
                    ? "cursor-not-allowed pointer-events-none"
                    : "hover:bg-accent cursor-pointer hover:text-accent-foreground"
                )}
                onClick={() => setPage((p) => p - 1)}
              />
              <ChevronRight
                className={cn(
                  page === totalPages
                    ? "cursor-not-allowed pointer-events-none"
                    : "hover:bg-accent cursor-pointer hover:text-accent-foreground"
                )}
                onClick={() => setPage((p) => p + 1)}
              />
              <ChevronLast
                className={cn(
                  page === totalPages
                    ? "cursor-not-allowed pointer-events-none"
                    : "hover:bg-accent cursor-pointer hover:text-accent-foreground"
                )}
                onClick={() => setPage(totalPages)}
              />
            </div>
          )}
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow className="border-b border-input">
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="hidden md:table-cell">Account</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {pageTxns?.map((txn) => (
          <TableRow key={txn.id} className="border-0">
            <TableCell className="flex items-center justify-center px-0 py-3">
              <div className="rounded-full flex flex-col justify-center items-center bg-secondary text-secondary-foreground h-12 w-12">
                <span className="text-xs">
                  {getMonth(txn.date.toISOString().slice(5, 7))}
                </span>
                <span className="text-base font-medium">
                  {txn.date.toISOString().slice(8, 10)}
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{txn.type}</TableCell>
            <TableCell className="truncate">
              {txn.description ?? txn.category?.name ?? "Not tagged"}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {txn.sourceId
                ? `${txn.source?.bank.name} XX-${txn.source?.number.slice(-4)}`
                : `${
                    txn.destination?.bank.name
                  } XX-${txn.destination?.number.slice(-4)}`}
            </TableCell>
            <TableCell className="text-right text-base font-medium">
              {" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(txn.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function getMonth(mon: string) {
  switch (mon) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    default:
      return "Dec";
  }
}

export default AcctTxnTable;
