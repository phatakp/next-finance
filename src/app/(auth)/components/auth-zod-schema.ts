import { z } from "zod";

export const UserSignUpFormSchema = z
  .object({
    name: z.string().min(3, "Name should have min 3 chars"),
    email: z.string().email("Not a valid email"),
    password: z.string().min(8, "Password should have min 8 chars"),
    password2: z.string().min(8, "Confirm Password should have min 8 chars"),
  })
  .refine(
    (data) =>
      //both passwords should match
      !(data.password !== data.password2),
    {
      message: "Both Passwords should match",
      path: ["password2"],
    }
  );

export const UserSignInFormSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z.string().min(8, "Password should have min 8 chars"),
});

export type SignInFormData = z.infer<typeof UserSignInFormSchema>;
export type SignUpFormData = z.infer<typeof UserSignUpFormSchema>;
