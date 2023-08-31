import { BankAcct, Group, Transaction } from "@prisma/client";

export enum FormAction {
  Add = "add",
  Update = "update",
  Delete = "delete",
}

export type ReactSelectOption = {
  label: string;
  value: string;
};
export type ReactSelectOptions = ReactSelectOption[];

export type ReactSelectGrpOption = {
  label: string;
  options: ReactSelectOptions;
};

export type ReactSelectGrpOptions = ReactSelectGrpOption[];

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

export type APIGrpResponse = Group & {
  users: { id: string; name: string };
};

export type APIBankAcctResponse = BankAcct & {
  user: { id: string; name: string };
};

export type APITxnResponse = Transaction & {
  user: { id: string; name: string };
  group?: { id: string; name: string };
  source?: { id: string; number: string; bank: Bank };
  destination?: { id: string; number: string; bank: Bank };
};
