"use server";

import {
  SignUpFormData,
  UserSignUpFormSchema,
} from "@/app/(auth)/components/auth-zod-schema";
import { cash } from "@/config/banks";
import { CashAcctNumber } from "@/config/docs";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function signUp(formData: SignUpFormData) {
  const {
    name,
    email,
    password: textPwd,
  } = UserSignUpFormSchema.parse(formData);
  const password = await bcrypt.hash(textPwd, 10);
  const user = await db.user.create({
    data: {
      name,
      email,
      password: { create: { hash: password } },
      bankaccts: {
        create: [{ number: CashAcctNumber, bank: cash }],
      },
    },
  });
  return user;
}
