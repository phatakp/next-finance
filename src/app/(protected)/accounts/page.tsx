import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { getAcctsByType } from "@/lib/utils";
import { AcctType } from "@/types/app";
import { FC } from "react";
import { toast } from "react-hot-toast";
import AcctCarousel from "./components/acct-carousel";
import AcctTotCard from "./components/acct-tot-card";
import AcctTxns from "./components/acct-txns";

type AccountsPageProps = {
  searchParams: any;
};

const AccountsPage: FC<AccountsPageProps> = async ({ searchParams }) => {
  const acctsByType = await getAcctsByType();
  const type = searchParams?.type;

  if (acctsByType.length === 0) return toast.error("Error fetching accounts!");

  return (
    <Tabs defaultValue={type ?? "Savings"} className="w-full px-0">
      <TabsList>
        {acctsByType?.map((grp) => (
          <TabsTrigger key={grp.type} value={grp.type}>
            {grp.type}
          </TabsTrigger>
        ))}
      </TabsList>
      {acctsByType?.map((grp) => (
        <TabsContent key={grp.type} value={grp.type}>
          <div className="flex flex-col gap-4">
            <AcctTotCard
              total={grp.type === AcctType.Investment ? grp.totVal : grp.totBal}
              type={grp.type}
            />
            <AcctCarousel grp={grp} />
            <AcctTxns type={grp.type as AcctType} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AccountsPage;
