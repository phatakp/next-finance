"use client";

import {
  BankAcctFormData,
  BankAcctFormSchema,
  formDefaultValues,
} from "@/app/(protected)/accounts/components/account-form/zod-schema";
import { processAccountAction } from "@/app/api/_actions/accounts";
import { Button } from "@/components/shadcn/ui/button";
import { Form } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { ModalContext } from "@/components/shared/modal";
import Select from "@/components/shared/select";
import banks from "@/config/banks";
import { APIBankAcctResponse, AcctType, FormAction } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";

type AccountFormProps = {
  acct?: APIBankAcctResponse;
  formAction: FormAction;
};

const typeOptions = Object.keys(AcctType).map((t) => ({ value: t, label: t }));

const AccountForm: FC<AccountFormProps> = ({ acct, formAction }) => {
  const { setOpen, getTitle } = useContext(ModalContext);
  const form = useForm<BankAcctFormData>({
    resolver: zodResolver(BankAcctFormSchema),
    defaultValues: formDefaultValues(formAction, acct),
  });
  const type = form.watch("type");
  const action = form.watch("action");
  const router = useRouter();
  const bankOptions = banks
    .filter((bank) => bank.type === type.value)
    .map((b) => ({ value: b.id, label: b.name }));

  useEffect(() => {
    getTitle(`${form.getValues("action")} account`);
  }, [action]);

  const processForm: SubmitHandler<BankAcctFormData> = async (formData) => {
    try {
      const data = BankAcctFormSchema.parse(formData);
      const {
        success,
        data: resp,
        error,
      } = await processAccountAction(data, action);
      if (!success) toast.error(error!);
      else {
        toast.success(
          `${resp?.bank.name} ${resp?.bank.type} account ${action}${
            action === FormAction.Add ? "ed" : "d"
          }`
        );
        form.reset();
        setOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);

      if (error instanceof ZodError) return toast.error(error.message);
      else return toast.error("Invalid Credentials");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-8 lg:min-h-[30vh] relative"
        onSubmit={form.handleSubmit(processForm)}
      >
        <div className="grid w-full gap-8 md:grid-cols-2">
          {/* Account Type Field */}
          <Select
            name="type"
            label="Acct Type"
            options={typeOptions}
            isDisabled={action !== FormAction.Add}
          />

          {/* Account Number Field */}
          <Input
            name="number"
            label="Acct Number"
            disabled={action !== FormAction.Add}
          />
        </div>

        <div className="grid w-full gap-8 md:grid-cols-2">
          {/* Account Bank Field */}
          <Select
            name="bank"
            label="Bank"
            options={bankOptions}
            isDisabled={action !== FormAction.Add}
          />

          {/* Account Balance Field */}
          <Input
            name="balance"
            label={getLabel(type.value)}
            disabled={action === FormAction.Delete}
          />
        </div>

        {!!type && type.value === AcctType.Investment && (
          <Input
            name="currvalue"
            label="Current Value"
            disabled={action === FormAction.Delete}
          />
        )}

        {action === FormAction.Delete && (
          <div className="mt-4 text-lg text-center font-semibold md:col-span-2 text-destructive font-fira">
            Are you sure you want to delete this account?
          </div>
        )}

        <div className="flex justify-end items-center gap-4">
          {action === FormAction.Add && (
            <Button
              className="capitalize"
              isLoading={form.formState.isSubmitting}
            >
              Add
            </Button>
          )}

          {action === FormAction.Update && (
            <>
              <Button
                type="submit"
                className="capitalize"
                isLoading={form.formState.isSubmitting}
              >
                Update
              </Button>
              <Button
                type="button"
                onClick={() => form.setValue("action", FormAction.Delete)}
                variant="destructive"
                className="capitalize"
                isLoading={form.formState.isSubmitting}
              >
                Delete
              </Button>
            </>
          )}

          {action === FormAction.Delete && (
            <Button
              variant="destructive"
              className="capitalize"
              isLoading={form.formState.isSubmitting}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

function getLabel(type: AcctType) {
  switch (type) {
    case AcctType.Investment:
      return "Invested Amount";
    case AcctType.CreditCard:
      return "Card Balance";
    case AcctType.Mortgage:
      return "Mortgage Amount";
    default:
      return "Account Balance";
  }
}

export default AccountForm;
