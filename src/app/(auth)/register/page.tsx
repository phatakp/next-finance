import { buttonVariants } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import RegisterForm from "../components/register-form";
import SocialButton from "../components/social-button";

type RegisterPageProps = {};

const RegisterPage: FC<RegisterPageProps> = ({}) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-fira text-center">
          Create your account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="w-1/2 mx-auto mb-8">
          <SocialButton />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <div className="inline-flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Already have an account</span>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Login here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
