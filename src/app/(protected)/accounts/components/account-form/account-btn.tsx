import { buttonVariants } from "@/components/shadcn/ui/button";
import Modal from "@/components/shared/modal";
import { cn } from "@/lib/utils";
import { APIBankAcctResponse, FormAction } from "@/types/app";
import { Plus } from "lucide-react";
import { FC, ReactNode } from "react";
import AccountForm from ".";

type AccountButtonProps = {
  acct?: APIBankAcctResponse;
  icon?: ReactNode;
  action: FormAction;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

const AccountButton: FC<AccountButtonProps> = ({
  icon,
  action,
  acct,
  variant,
}) => {
  return (
    <Modal
      trigger={
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            buttonVariants({ variant })
          )}
        >
          {icon ?? <Plus className="w-5 h-5" />} {action as string}
        </div>
      }
      title={`${action as string} Account`}
      desc={`Confirm details to ${action as string} account`}
    >
      <AccountForm formAction={action} acct={acct} />
    </Modal>
  );
};

export default AccountButton;
