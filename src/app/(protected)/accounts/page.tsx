import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import Modal from "@/components/shared/modal";
import { getAcctsByType } from "@/lib/utils";
import { FormAction } from "@/types/app";
import { Metadata } from "next";
import { FC } from "react";
import { toast } from "react-hot-toast";
import AccountCard from "./components/account-card";
import AccountForm from "./components/account-form/index.";

export const metadata: Metadata = {
  title: "Accounts | Expensio",
  description: "Personal Expense Tracker Accounts",
};

type AccountsPageProps = {};

const AccountsPage: FC<AccountsPageProps> = async ({}) => {
  const acctsByType = await getAcctsByType();

  if (acctsByType.length === 0) return toast.error("Error fetching accounts!");

  return (
    <Tabs defaultValue={acctsByType.at(0)!.type} className="w-full">
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
            <span>{grp.totBal}</span>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {grp?.accts?.map((acct) => (
                <Modal
                  key={acct.id}
                  trigger={<AccountCard key={acct.id} acct={acct} />}
                  title="Update Account"
                  desc="Confirm details to update account"
                >
                  <AccountForm formAction={FormAction.Update} acct={acct} />
                </Modal>
              ))}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AccountsPage;
