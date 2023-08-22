import { Icons } from "@/components/shared/icons";
import { Metadata } from "next";
import Image from "next/image";
import authBg from "./components/auth.png";

export const metadata: Metadata = {
  title: "Auth | Expensio",
  description: "Personal Expense Tracker authentication using Next-Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-center">
      <div className="flex items-center justify-center pt-32 lg:pt-0">
        <div className="sm:container rounded  max-w-4xl w-full md:mt-8">
          <div className="grid lg:grid-cols-2 p-2 md:py-4 gap-4">
            <div className="flex flex-col gap-2 bg-primary container rounded-md py-2 md:py-8 justify-center items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap">
                <Icons.logo className="w-12 h-12" />
                <p className="flex-1 font-bold text-3xl sm:text-4xl text-white ml-4 text-center font-fira">
                  Track expenses with us
                </p>
              </div>
              <Image src={authBg} alt="auth" className="flex-1" />
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
