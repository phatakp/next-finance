"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/ui/tooltip";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={toggleTheme}
          className="inline-flex items-center justify-center p-2 rounded hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {theme === "dark"
              ? "Change to Light Theme"
              : "Change to Dark Theme"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
