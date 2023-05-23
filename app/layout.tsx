import getSession from "@/actions/getSession";
import Navbar from "@/components/navbar/Navbar";
import AppContext from "@/context/AppContext";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Finance",
    description: "Personal Finance App created in Next JS",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession(headers().get("cookie") ?? "");

    return (
        <html lang="en">
            <body className={`${inter.className} relative`}>
                <AppContext session={session}>
                    <Navbar />
                    <Toaster />
                    <main className="min-h-screen pt-24">{children}</main>
                </AppContext>
            </body>
        </html>
    );
}
