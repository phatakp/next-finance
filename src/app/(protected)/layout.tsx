import PageHeader from "@/components/shared/page-header";
import { getAuthServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserTxns } from "../api/_actions/transactions";
import TxnContextProvider from "./activity/components/txn-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthServerSession();

  if (!session?.user) redirect("/login");
  const { data: transactions } = await getUserTxns();

  return (
    <TxnContextProvider initTxns={transactions}>
      <section>
        <div className="flex flex-col w-full max-w-screen-xl gap-8 container pt-12">
          <PageHeader />
          {children}
        </div>
      </section>
    </TxnContextProvider>
  );
}
