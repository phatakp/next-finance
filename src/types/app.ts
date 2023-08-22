import { BankAcct } from "@prisma/client";

export enum FormAction {
  Add = "add",
  Update = "update",
  Delete = "delete",
}

export type ReactSelectOptions = {
  label: string;
  value: string;
}[];

export type FormActionResponse = Promise<
  | {
      success: boolean;
      error: string;
      data?: undefined;
    }
  | {
      success: boolean;
      data: APIBankAcctResponse;
      error?: undefined;
    }
>;

export enum AcctType {
  Savings = "Savings",
  CreditCard = "CreditCard",
  Investment = "Investment",
  Mortgage = "Mortgage",
  Wallet = "Wallet",
}

export enum CatType {
  Food = "Food",
  Transportation = "Transportation",
  Household = "Household",
  Utilities = "Utilities",
  Health = "Health",
  Personal = "Personal",
  Income = "Income",
  Transfer = "Transfer",
}

export type Category = {
  id: string;
  name: string;
  type: CatType;
};

export type Bank = {
  id: string;
  name: string;
  type: AcctType;
};

export type APIBankAcctResponse = BankAcct & {
  user: { id: string; name: string };
};
