import AppProvider from "@/components/providers/app";
import SiteHeader from "@/components/shared/site-header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Fira_Sans, Inter } from "next/font/google";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fira = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-fira",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Expensio",
  description: "Personal Expense Tracker created in NextJS and MongoDb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(inter.variable, fira.variable)}>
        <AppProvider>
          <Toaster />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
