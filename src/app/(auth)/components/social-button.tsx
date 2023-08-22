"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Icons } from "@/components/shared/icons";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

type SocialButtonProps = {};

const SocialButton: FC<SocialButtonProps> = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    try {
      setLoading(true);
      signIn("google", { callbackUrl: "/dashboard" }).then((callback) => {
        if (callback?.error) toast.error("Invalid Credentials");
        if (callback?.ok && !callback.error) {
          toast.success("You are logged in successfully!");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Could not log you in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      className="flex items-center justify-center w-full gap-4 text-sm"
      onClick={handleLogin}
      isLoading={loading}
    >
      <Icons.google className="w-4 h-4" />
      <span className="capitalize">google</span>
    </Button>
  );
};

export default SocialButton;
