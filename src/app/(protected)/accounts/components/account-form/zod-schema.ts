import { APIBankAcctResponse, AcctType, FormAction } from "@/types/app";
import { z } from "zod";
import { defaultBank } from "../../../../../lib/utils";

const AcctTypeSchema = z.object({
  value: z.nativeEnum(AcctType),
  label: z.nativeEnum(AcctType),
});

const BankSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const BankAcctFormSchema = z
  .object({
    id: z.string().optional(),
    action: z.nativeEnum(FormAction),
    type: AcctTypeSchema,
    bank: BankSchema,
    number: z.string().min(5, "Acct Number should be atleast 5 chars").max(19),
    balance: z.coerce.number().gte(1, "Cannot add a zero balance account"),
    currvalue: z.coerce.number().optional(),
  })
  .refine(
    (data) =>
      //need id when action != add
      !(data.action !== "add" && !data.id),
    {
      message: "Bank Acct not found",
      path: ["id"],
    }
  )
  .refine(
    (data) =>
      //allow currvalue to be optional only when type != Investment
      !(data.type.value === AcctType.Investment && !data.currvalue),
    {
      message: "Investment should have current value",
      path: ["currvalue"],
    }
  )
  .refine(
    (data) =>
      !(
        data.type.value === AcctType.CreditCard &&
        data.action !== "add" &&
        !data.number.match(/^[X]{4}-[X]{4}-[X]{4}-[0-9]{4}$/)
      ),
    {
      message: "Not valid credit card number format",
      path: ["number"],
    }
  )
  .refine(
    (data) =>
      !(
        data.type.value === AcctType.CreditCard &&
        data.action === "add" &&
        !data.number.match(/^[1-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/) &&
        !data.number.match(/^[1-9][0-9]{15}$/)
      ),
    {
      message: "Credit card number should have 16 digits",
      path: ["number"],
    }
  );

export type BankAcctFormData = z.infer<typeof BankAcctFormSchema>;

export const formDefaultValues = (
  action: FormAction,
  acct?: APIBankAcctResponse
) => ({
  id: acct ? acct.id : "",
  action,
  type: acct
    ? { value: acct.bank.type as AcctType, label: acct.bank.type as AcctType }
    : { value: AcctType.Savings, label: AcctType.Savings },
  bank: acct
    ? { value: acct.bank.id, label: acct.bank.name }
    : { value: defaultBank!.id, label: defaultBank!.name },
  number: acct ? acct.number : "",
  balance: acct ? acct.balance : 0,
  currvalue: acct ? acct.currvalue : 0,
});
