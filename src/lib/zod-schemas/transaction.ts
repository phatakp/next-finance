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
    action: z.enum(["add", "update", "delete"]),
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
