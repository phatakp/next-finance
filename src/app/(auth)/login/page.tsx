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
import LoginForm from "../components/login-form";
import SocialButton from "../components/social-button";

interface pageProps {}

const LoginPage: FC<pageProps> = ({}) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-fira text-center">
          Login to your account
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
        <LoginForm />
      </CardContent>
      <CardFooter>
        <div className="inline-flex items-center justify-between gap-2 text-sm w-full">
          <span className="text-muted-foreground">
            Don&apos;t have an account
          </span>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Create here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
