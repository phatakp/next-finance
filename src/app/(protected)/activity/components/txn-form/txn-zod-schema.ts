import { APITxnResponse, FormAction } from "@/types/app";
import { TxnType } from "@prisma/client";
import { z } from "zod";

const OptionSchema = z
  .object({
    value: z.string(),
    label: z.string(),
  })
  .optional();

export const TxnFormSchema = z
  .object({
    id: z.string().optional(),
    action: z.nativeEnum(FormAction),
    type: z.nativeEnum(TxnType),
    date: z
      .string()
      .or(z.date())
      .transform((arg) => new Date(arg)),
    description: z.string().optional(),
    amount: z.coerce.number().gte(1, "Cannot add a zero amount txn"),
    category: OptionSchema,
    source: OptionSchema,
    destination: OptionSchema,
    group: OptionSchema,
  })
  .refine(
    (data) =>
      //allow when either description or category is populated
      !(!data.category?.value && !data.description),
    {
      message: "Either description or category required",
      path: ["description", "category"],
    }
  )
  .refine(
    (data) =>
      //expense and transfer should always have source
      !(data.type !== TxnType.Income && !data.source?.value),
    {
      message: "From Account required",
      path: ["source"],
    }
  )
  .refine(
    (data) =>
      //income and transfer should always have destination
      !(data.type !== TxnType.Expense && !data.destination?.value),
    {
      message: "To Account required",
      path: ["destination"],
    }
  )
  .refine(
    (data) =>
      //transfer source and destination cannot be same
      !(
        data.type === "Transfer" &&
        data.source?.value === data.destination?.value
      ),
    {
      message: "Both Accounts cannot be same",
      path: ["source", "destination"],
    }
  );

export type TxnFormData = z.infer<typeof TxnFormSchema>;

export const txnFormDefaultValues = (
  action: FormAction,
  txn?: APITxnResponse
) => ({
  id: !!txn ? txn.id : "",
  action,
  type: !!txn ? (txn.type as TxnType) : TxnType.Expense,
  date: !!txn ? new Date(txn.date) : new Date(),
  description: txn?.description ?? "",
  amount: !!txn ? txn.amount : 0,
  category: !!txn?.category
    ? {
        value: txn.category.id,
        label: `${txn.category.type}:${txn.category.name}`,
      }
    : undefined,
  source: !!txn?.sourceId
    ? {
        value: txn.sourceId,
        label: `${txn.source!.bank.type}:${
          txn.source!.bank.name
        }-${txn.source!.number.slice(-4)}`,
      }
    : undefined,
  destination: !!txn?.destinationId
    ? {
        value: txn.destinationId,
        label: `${txn.destination!.bank.type}:${
          txn.destination!.bank.name
        }-${txn.destination!.number.slice(-4)}`,
      }
    : undefined,
  group: !!txn?.groupName
    ? { value: txn.groupName, label: txn.groupName }
    : undefined,
});
