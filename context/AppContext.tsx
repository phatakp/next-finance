"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export interface AppContextProps {
    children: React.ReactNode;
    session: Session;
}

export default function AppContext({ children }: AppContextProps) {
    return (
        <SessionProvider>
            <ThemeProvider enableSystem={false} attribute="class">
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
