import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/libs/utils";
import React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary/80 border",
                outline: "border hover:bg-primary hover:accent-gray-300",
                destructive: "bg-red-600 text-white hover:bg-red-500/90 border",
                secondary: "bg-gray-800 text-white hover:bg-gray-800/80 border",
                link: "underline-offset-4 hover:underline text-primary",
                ghost: "shadow shadow-gray-300 dark:shadow-gray-800",
            },
            size: {
                default: "py-2 px-4",
                sm: "py-1 px-2 rounded-md",
                lg: "py-4 px-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
