"use server";

import {
  BankAcctFormData,
  BankAcctFormSchema,
} from "@/app/(protected)/accounts/components/account-form/zod-schema";
import { getAuthServerSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { APIBankAcctResponse, FormAction } from "@/types/app";

export async function getUserAccounts() {
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const accounts = await db.bankAcct.findMany({
    where: { userId: session.user.id },
    include: {
      user: { select: { id: true, name: true } },
    },
    orderBy: [{ bank: { name: "asc" } }, { bank: { type: "asc" } }],
  });
  return { success: true, data: accounts as APIBankAcctResponse[] };
}

export async function processAccountAction(
  formData: BankAcctFormData,
  action: FormAction
) {
  switch (action) {
    case FormAction.Update:
      return updateUserAccount(formData);
    case FormAction.Delete:
      return deleteUserAccount(formData);
    default:
      return addUserAccount(formData);
  }
}

export async function addUserAccount(formData: BankAcctFormData) {
  const { number, bank, type, balance, currvalue } =
    BankAcctFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const existing = await db.bankAcct.findFirst({
    where: {
      number,
      bank: { id: bank.value, name: bank.label, type: type.value },
      userId: session.user.id,
    },
  });

  if (existing) return { success: false, error: "Duplicate Account" };

  const account = await db.bankAcct.create({
    data: {
      number,
      bank: { id: bank.value, name: bank.label, type: type.value },
      userId: session.user.id,
      balance,
      currvalue,
    },
    include: {
      user: { select: { id: true, name: true } },
    },
  });
  if (account) {
    // revalidatePath("/accounts");
    return { success: true, data: account as APIBankAcctResponse };
  }
  return { success: false, error: "Could not add account" };
}

export async function updateUserAccount(formData: BankAcctFormData) {
  const { id, balance, currvalue } = BankAcctFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const dbAcct = await db.bankAcct.findUnique({
    where: {
      id,
    },
  });

  if (!dbAcct) return { success: false, error: "Account Not Found" };

  const account = await db.bankAcct.update({
    where: { id },
    data: {
      balance,
      currvalue,
    },
    include: {
      user: { select: { id: true, name: true } },
    },
  });
  if (account) {
    // revalidatePath("/accounts");
    return { success: true, data: account as APIBankAcctResponse };
  }
  return { success: false, error: "Could not update account" };
}

export async function deleteUserAccount(formData: BankAcctFormData) {
  const { id } = BankAcctFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { success: false, error: "Not Authenticated" };
  const dbAcct = await db.bankAcct.findUnique({
    where: {
      id,
    },
    include: {
      user: { select: { id: true, name: true } },
    },
  });

  if (!dbAcct) return { success: false, error: "Account Not Found" };

  await db.bankAcct.delete({
    where: { id },
  });
  // revalidatePath("/accounts");
  return { success: true, data: dbAcct as APIBankAcctResponse };
}
