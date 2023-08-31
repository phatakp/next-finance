"use server";

import {
  TxnFormData,
  TxnFormSchema,
} from "@/app/(protected)/activity/components/txn-form/txn-zod-schema";
import { getAuthServerSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { APITxnResponse, AcctType, FormAction } from "@/types/app";

const response = {
  success: false,
  error: undefined,
  data: undefined,
  field: undefined,
};

export async function getUserTxns() {
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
    include: {
      user: { select: { id: true, name: true } },
      group: { select: { id: true, name: true } },
      source: {
        select: { id: true, number: true, bank: true },
      },
      destination: {
        select: { id: true, number: true, bank: true },
      },
    },
    orderBy: [{ date: "desc" }],
  });
  return { ...response, success: true, data: transactions as APITxnResponse[] };
}

export async function processTxnAction(
  formData: TxnFormData,
  action: FormAction
) {
  switch (action) {
    case FormAction.Update:
      return updateUserTxn(formData);
    case FormAction.Delete:
      return deleteUserTxn(formData);
    default:
      return addUserTxn(formData);
  }
}

export async function addUserTxn(formData: TxnFormData) {
  const {
    date,
    type,
    source,
    destination,
    group,
    category,
    amount,
    description,
  } = TxnFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };

  let catName, catType;
  if (!!category) [catType, catName] = category?.label?.split(":");

  return await db.$transaction(async (tx) => {
    // 1. Add transaction to db
    const txn = await tx.transaction.create({
      data: {
        date: new Date(date),
        type,
        category: !!category
          ? { id: category.value, name: catName!, type: catType! }
          : undefined,
        userId: session.user.id,
        amount,
        description,
        sourceId: source?.value,
        destinationId: destination?.value,
        groupName: group?.value,
      },
      include: {
        user: { select: { id: true, name: true } },
        group: { select: { id: true, name: true } },
        source: {
          select: { id: true, number: true, bank: true },
        },
        destination: {
          select: { id: true, number: true, bank: true },
        },
      },
    });

    // 2. Adjust sender account if present
    if (!!txn.sourceId) {
      const whereClause =
        txn.source?.bank.type === AcctType.CreditCard
          ? { increment: txn.amount }
          : { decrement: txn.amount };
      const sender = await tx.bankAcct.update({
        where: { id: txn.sourceId },
        data: { balance: whereClause },
      });
      if (sender.balance < 0 && txn.source?.bank.type !== AcctType.CreditCard)
        return {
          ...response,
          error: "Insufficient balance in account",
          field: "source",
        };
    }

    // 3. Adjust receiver account if present
    if (!!txn.destinationId) {
      const whereClause =
        txn.destination?.bank.type === AcctType.CreditCard
          ? { decrement: txn.amount }
          : { increment: txn.amount };
      await tx.bankAcct.update({
        where: { id: txn.destinationId },
        data: { balance: whereClause },
      });
    }

    return { ...response, success: true, data: txn as APITxnResponse };
  });
}

export async function updateUserTxn(formData: TxnFormData) {
  const {
    id,
    date,
    source,
    destination,
    group,
    category,
    amount,
    description,
  } = TxnFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };

  const dbTxn = await db.transaction.findUnique({
    where: { id },
    include: {
      source: {
        select: { id: true, number: true, bank: true },
      },
      destination: {
        select: { id: true, number: true, bank: true },
      },
    },
  });
  if (!dbTxn) return { ...response, error: "Transaction Not Found" };

  let catName, catType;
  if (!!category) [catType, catName] = category?.label?.split(":");

  return await db.$transaction(async (tx) => {
    // 1. Adjust sender account if changed
    if (!!source?.value && dbTxn.sourceId !== source.value) {
      let whereClause =
        dbTxn.source?.bank.type === AcctType.CreditCard
          ? { decrement: dbTxn.amount }
          : { increment: dbTxn.amount };
      await tx.bankAcct.update({
        where: { id: dbTxn.sourceId! },
        data: { balance: whereClause },
      });

      const [type] = source.label.split(":");
      whereClause =
        type === AcctType.CreditCard
          ? { increment: amount }
          : { decrement: amount };
      const sender = await tx.bankAcct.update({
        where: { id: source.value },
        data: { balance: whereClause },
      });
      if (sender.balance < 0 && sender.bank.type !== AcctType.CreditCard)
        return {
          ...response,
          error: "Insufficient balance in account",
          field: "source",
        };
    }

    // 2. Adjust receiver account if changed
    if (!!destination?.value && dbTxn.destinationId !== destination.value) {
      let whereClause =
        dbTxn.destination?.bank.type === AcctType.CreditCard
          ? { increment: dbTxn.amount }
          : { decrement: dbTxn.amount };
      const oldReceiver = await tx.bankAcct.update({
        where: { id: dbTxn.destinationId! },
        data: { balance: whereClause },
      });
      if (
        oldReceiver.balance < 0 &&
        oldReceiver.bank.type !== AcctType.CreditCard
      )
        return {
          ...response,
          error: "Insufficient balance in account",
          field: "destination",
        };

      const [type] = destination.label.split(":");
      whereClause =
        type === AcctType.CreditCard
          ? { decrement: amount }
          : { increment: amount };
      await tx.bankAcct.update({
        where: { id: destination.value },
        data: { balance: whereClause },
      });
    }

    //3. Update transaction db
    const newTxn = await tx.transaction.update({
      where: { id },
      data: {
        date: new Date(date),
        category: !!category
          ? { id: category.value, name: catName!, type: catType! }
          : undefined,
        userId: session.user.id,
        amount,
        sourceId: source?.value,
        destinationId: destination?.value,
        groupName: group?.value,
        description,
      },
      include: {
        user: { select: { id: true, name: true } },
        group: { select: { id: true, name: true } },
        source: {
          select: { id: true, number: true, bank: true },
        },
        destination: {
          select: { id: true, number: true, bank: true },
        },
      },
    });
    return { ...response, success: true, data: newTxn as APITxnResponse };
  });
}

export async function deleteUserTxn(formData: TxnFormData) {
  const { id } = TxnFormSchema.parse(formData);
  const session = await getAuthServerSession();
  if (!session?.user) return { ...response, error: "Not Authenticated" };
  const dbTxn = await db.transaction.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      group: { select: { id: true, name: true } },
      source: {
        select: { id: true, number: true, bank: true },
      },
      destination: {
        select: { id: true, number: true, bank: true },
      },
    },
  });
  if (!dbTxn) return { ...response, error: "Transaction Not Found" };

  return await db.$transaction(async (tx) => {
    // 1. Adjust sender account if present
    if (!!dbTxn.sourceId) {
      let whereClause =
        dbTxn.source?.bank.type === AcctType.CreditCard
          ? { decrement: dbTxn.amount }
          : { increment: dbTxn.amount };
      const sender = await tx.bankAcct.update({
        where: { id: dbTxn.sourceId },
        data: { balance: whereClause },
      });
      if (sender.balance < 0 && sender.bank.type !== AcctType.CreditCard)
        return {
          ...response,
          error: "Insufficient balance in account",
          field: "source",
        };
    }

    // 2. Decrement receiver account if present
    if (!!dbTxn.destinationId) {
      let whereClause =
        dbTxn.destination?.bank.type === AcctType.CreditCard
          ? { increment: dbTxn.amount }
          : { decrement: dbTxn.amount };
      await tx.bankAcct.update({
        where: { id: dbTxn.destinationId },
        data: { balance: whereClause },
      });
    }

    //3. Delete from transaction db
    await tx.transaction.delete({
      where: { id },
    });
    return { ...response, success: true, data: dbTxn as APITxnResponse };
  });
}
