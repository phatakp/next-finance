"use server";

import {
  BankAcctFormData,
  BankAcctFormSchema,
} from "@/app/(protected)/accounts/components/account-form/acct-zod-schema";
import { getAuthServerSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { APIBankAcctResponse, FormAction } from "@/types/app";

const response = {
  success: false,
  error: undefined,
  data: undefined,
  field: undefined,
};

export async function getUserAccounts() {
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const accounts = await db.bankAcct.findMany({
    where: { userId: session.user.id },
    include: {
      user: { select: { id: true, name: true } },
    },
    orderBy: [
      { defaultAcct: "desc" },
      { bank: { name: "asc" } },
      { bank: { type: "asc" } },
    ],
  });
  return {
    ...response,
    success: true,
    data: accounts as APIBankAcctResponse[],
  };
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
  const { number, bank, type, balance, currvalue, defaultAcct } =
    BankAcctFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const existing = await db.bankAcct.findFirst({
    where: {
      number,
      bank: { id: bank.value, name: bank.label, type: type.value },
      userId: session.user.id,
    },
  });

  if (existing)
    return { ...response, error: "Duplicate Account", field: "number" };

  return await db.$transaction(async (tx) => {
    if (defaultAcct) {
      const currDefault = await tx.bankAcct.findFirst({
        where: { defaultAcct: true },
      });
      if (currDefault)
        await tx.bankAcct.update({
          where: { id: currDefault.id },
          data: { defaultAcct: false },
        });
    }

    const account = await tx.bankAcct.create({
      data: {
        number,
        bank: { id: bank.value, name: bank.label, type: type.value },
        userId: session.user.id,
        balance,
        currvalue,
        defaultAcct,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });
    if (account) {
      return {
        ...response,
        success: true,
        data: account as APIBankAcctResponse,
      };
    }
    return { ...response, error: "Could not add account" };
  });
}

export async function updateUserAccount(formData: BankAcctFormData) {
  const { id, balance, currvalue, defaultAcct } =
    BankAcctFormSchema.parse(formData);

  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const dbAcct = await db.bankAcct.findUnique({
    where: {
      id,
    },
  });

  if (!dbAcct) return { ...response, error: "Account Not Found" };

  return await db.$transaction(async (tx) => {
    if (!dbAcct.defaultAcct && defaultAcct) {
      const currDefault = await tx.bankAcct.findFirst({
        where: { defaultAcct: true },
      });
      if (currDefault)
        await tx.bankAcct.update({
          where: { id: currDefault.id },
          data: { defaultAcct: false },
        });
    }

    const account = await tx.bankAcct.update({
      where: { id },
      data: {
        balance,
        currvalue,
        defaultAcct,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });
    if (account) {
      return {
        ...response,
        success: true,
        data: account as APIBankAcctResponse,
      };
    }
    return { ...response, error: "Could not update account" };
  });
}

export async function deleteUserAccount(formData: BankAcctFormData) {
  const { id } = BankAcctFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const dbAcct = await db.bankAcct.findUnique({
    where: {
      id,
    },
    include: {
      user: { select: { id: true, name: true } },
    },
  });

  if (!dbAcct) return { ...response, error: "Account Not Found" };

  await db.bankAcct.delete({ where: { id } });
  return { ...response, success: true, data: dbAcct as APIBankAcctResponse };
}

export async function getAcctById(id: string) {
  return await db.bankAcct.findUnique({ where: { id } });
}
