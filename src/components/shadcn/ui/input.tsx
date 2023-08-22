import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, desc, disabled }, ref) => {
    const {
      control,
      formState: { errors, isSubmitting },
    } = useFormContext();
    const error = !!errors[name!]?.message;

    return (
      <FormField
        control={control}
        name={name!}
        render={({ field }) => (
          <FormItem
            className={cn(
              "animate-in zoom-in-95 fade-in-0 slide-in-from-left-2 duration-500",
              type === "hidden" ? "" : "w-full"
            )}
          >
            <FormControl>
              <input
                type={type}
                className={cn(
                  "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm  bg-background border-0 border-b-2 border-input appearance-none focus:outline-none focus:ring-0 focus:border-primary peer disabled:cursor-not-allowed disabled:opacity-50",
                  error && "border-destructive",
                  className
                )}
                placeholder=" "
                disabled={disabled || isSubmitting}
                {...field}
              />
            </FormControl>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{desc}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
