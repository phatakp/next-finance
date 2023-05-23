"use client";

import { Button } from "@/components/ui/Button";
import { ToolTipProvider } from "@/components/ui/TooltipProvider";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        // <!-- Dark mode switcher -->
        <ToolTipProvider
            text={
                theme === "dark"
                    ? "Change to Light Mode"
                    : "Change to Dark Mode"
            }
        >
            <Button
                variant="ghost"
                aria-label="mode"
                className="flex items-center justify-center p-1 ml-8 text-sm rounded-full"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                {theme === "light" && (
                    <Moon className="bg-light dark:bg-dark" />
                )}
                {theme === "dark" && <Sun className="bg-light dark:bg-dark" />}
            </Button>
        </ToolTipProvider>

        // <!-- Dark mode switcher end -->
    );
}
