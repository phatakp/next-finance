"use client";

import {
  SignUpFormData,
  UserSignUpFormSchema,
} from "@/app/(auth)/components/auth-zod-schema";
import { signUp } from "@/app/api/_actions/auth";
import { Button } from "@/components/shadcn/ui/button";
import { Form } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";

type RegisterFormProps = {};

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(UserSignUpFormSchema),
  });

  const router = useRouter();

  const processForm: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const user = await signUp(data);
      if (user) {
        const resp = await signIn("credentials", { ...data, redirect: false });

        if (resp?.error) toast.error("Invalid Credentials");
        if (resp?.ok && !resp.error) {
          toast.success("You are logged in successfully!");
          form.reset();
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      if (error instanceof ZodError) return toast.error(error.message);
      else return toast.error("Invalid Credentials");
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-8 my-8"
        onSubmit={form.handleSubmit(processForm)}
      >
        <Input name="name" label="Name" />
        <Input name="email" label="Email Address" />
        <Input name="password" label="Password" type="password" />
        <Input name="password2" label="Confirm Password" type="password" />

        <Button className="w-full" isLoading={form.formState.isSubmitting}>
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
