import { getUserAccounts } from "@/app/api/_actions/accounts";
import banks from "@/config/banks";
import { AcctType } from "@/types/app";
import { clsx, type ClassValue } from "clsx";
import _ from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAcctsByType() {
  const { data: accounts } = await getUserAccounts();
  return _.chain(accounts)
    .groupBy((acct) => acct.bank.type)
    .map((accts, type) => ({
      type,
      accts: accts.sort((a, b) => (a.defaultAcct ? 1 : -1)),
      totBal: accts.reduce((acc, b) => acc + b.balance, 0),
      totVal: accts.reduce((acc, b) => acc + b.currvalue, 0),
    }))
    .value();
}

export const defaultBank = banks
  .filter((bank) => bank.type === AcctType.Savings)
  .at(0);
