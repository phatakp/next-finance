"use client";
import { SessionProvider } from "next-auth/react";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default AppProvider;
