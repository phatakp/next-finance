import { buttonVariants } from "@/components/shadcn/ui/button";
import Modal from "@/components/shared/modal";
import { cn } from "@/lib/utils";
import { APITxnResponse, FormAction } from "@/types/app";
import { Plus } from "lucide-react";
import { FC, ReactNode } from "react";
import TxnForm from ".";

type TxnButtonProps = {
  text?: string;
  txn?: APITxnResponse;
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

const TxnButton: FC<TxnButtonProps> = ({
  text,
  icon,
  action,
  txn,
  variant,
}) => {
  return (
    <Modal
      trigger={
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            buttonVariants({ variant, size: "sm" })
          )}
        >
          {icon ?? <Plus className="w-5 h-5" />}{" "}
          <span className="hidden sm:flex">{text ?? (action as string)}</span>
          {!text && action === FormAction.Add && (
            <span className="sm:hidden">Add</span>
          )}
        </div>
      }
      title={`${action as string} Transaction`}
      desc={`Confirm details to ${action as string} transaction`}
    >
      <TxnForm formAction={action} txn={txn} />
    </Modal>
  );
};

export default TxnButton;
