import PageHeader from "@/components/shared/page-header";
import { getAuthServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthServerSession();

  if (!session?.user) redirect("/login");

  return (
    <section>
      <div className="flex flex-col w-full max-w-screen-xl gap-8 container pt-12">
        <PageHeader />
        {children}
      </div>
    </section>
  );
}
