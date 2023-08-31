import { getUserAccounts } from "@/app/api/_actions/accounts";
import { getUserGroups } from "@/app/api/_actions/groups";
import { getUserTxns } from "@/app/api/_actions/transactions";
import banks from "@/config/banks";
import categories from "@/config/categories";
import {
  APITxnResponse,
  AcctType,
  ReactSelectGrpOptions,
  ReactSelectOptions,
} from "@/types/app";
import { TxnType } from "@prisma/client";
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
      accts: accts.sort(
        (a, b) => Number(b.defaultAcct) - Number(a.defaultAcct)
      ),
      totBal: accts.reduce((acc, b) => acc + b.balance, 0),
      totVal: accts.reduce((acc, b) => acc + b.currvalue, 0),
    }))
    .value();
}

export async function getAcctTypes() {
  const data = await getAcctsByType();
  return data.map((item) => item.type);
}
export async function getAcctOptions(type: TxnType, source?: boolean) {
  const { data: accounts } = await getUserAccounts();
  return _.chain(accounts)
    .groupBy((acct) => acct.bank.type)
    .map((accts, type) => ({
      label: type,
      options: accts
        .filter((acct) => {
          if (type === TxnType.Expense)
            return ["Savings", "CreditCard", "Wallet"].includes(acct.bank.type);
          else if (type === TxnType.Income)
            return ["Savings", "CreditCard", "Wallet"].includes(acct.bank.type);
          else if (source)
            return ["Savings", "CreditCard", "Wallet"].includes(acct.bank.type);
          else return acct;
        })
        .map((acct) => ({
          label: `${acct.bank.type}:${acct.bank.name}-${acct.number.slice(-4)}`,
          value: acct.id,
        })),
    }))
    .value();
}

export async function getGrpOptions() {
  const { data: groups } = await getUserGroups();
  return groups?.map((grp) => ({
    label: grp.name,
    value: grp.name,
  }));
}

export const defaultBank = banks
  .filter((bank) => bank.type === AcctType.Savings)
  .at(0);

export function getCategoryOptions(type: TxnType) {
  const catOptions = _.chain(categories)
    .groupBy("type")
    .map((value, type) => ({
      label: type,
      options: value.map((o) => ({
        label: `${o.type}:${o.name}`,
        value: o.id,
      })),
    }))
    .value();

  switch (type) {
    case TxnType.Income:
    case TxnType.Transfer:
      return catOptions.find((o) => o.label === type)
        ?.options as ReactSelectOptions;
    default:
      return catOptions.filter(
        (o) => !["Income", "Transfer"].includes(o.label)
      ) as ReactSelectGrpOptions;
  }
}

export function findExpenseCategory(
  desc: string,
  catOptions: ReactSelectGrpOptions
) {
  return catOptions
    ?.map((c) => c.options)
    .flatMap((arr) => arr)
    .find(({ label }) => label.toLowerCase().includes(desc.toLowerCase()));
}

export function findNonExpenseCategory(
  desc: string,
  catOptions: ReactSelectOptions
) {
  return catOptions.find(({ label }) =>
    label.toLowerCase().includes(desc.toLowerCase())
  );
}

export async function getTxnsByDate() {
  const { data: transactions } = await getUserTxns();
  return _.chain(transactions)
    .groupBy((txn) => new Date(txn.date).toISOString().slice(0, 10))
    .map((txns: APITxnResponse[], date: string) => ({
      date,
      txns: txns.sort((a: APITxnResponse, b: APITxnResponse) =>
        b.date > a.date ? 1 : -1
      ),
    }))
    .value();
}
