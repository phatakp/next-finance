"use client";

import { getAcctById } from "@/app/api/_actions/accounts";
import { processTxnAction } from "@/app/api/_actions/transactions";
import { Button } from "@/components/shadcn/ui/button";
import { Form } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { ModalContext } from "@/components/shared/modal";
import Select from "@/components/shared/select";
import { cn, getAcctOptions, getCategoryOptions } from "@/lib/utils";
import { APITxnResponse, FormAction } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { TxnType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";
import { TxnContext } from "../txn-provider";
import TxnDescField from "./txn-desc-field";
import {
  TxnFormData,
  TxnFormSchema,
  txnFormDefaultValues,
} from "./txn-zod-schema";

type TxnFormProps = {
  txn?: APITxnResponse;
  formAction: FormAction;
};

const TxnForm: FC<TxnFormProps> = ({ txn, formAction }) => {
  const { setOpen, getTitle } = useContext(ModalContext);
  const form = useForm<TxnFormData>({
    resolver: zodResolver(TxnFormSchema),
    defaultValues: txnFormDefaultValues(formAction, txn),
  });
  const [type, date, source, destination] = form.watch([
    "type",
    "date",
    "source",
    "destination",
  ]);
  const action = form.watch("action");
  const router = useRouter();
  const catOptions = getCategoryOptions(type as TxnType);
  const {
    grpOptions,
    srcOptions,
    destOptions,
    setSrcOptions,
    setDestOptions,
    srcBalance,
    setSrcBalance,
  } = useContext(TxnContext);

  useEffect(() => {
    getTitle(`${form.getValues("action")} transaction`);
  }, [form, getTitle, action]);

  useEffect(() => {
    async function fetch() {
      if (source?.value) {
        const acct = await getAcctById(source.value);
        setSrcBalance(acct!.balance);
      }
    }
    fetch();
  }, [source?.value, setSrcBalance]);

  useEffect(() => {
    async function fetchAcctOptions() {
      if (type !== TxnType.Income) {
        const options = await getAcctOptions(type, true);
        setSrcOptions(() => options);
      }
      if (type !== TxnType.Expense) {
        const options = await getAcctOptions(type, false);
        setDestOptions(() => options);
      }
    }
    fetchAcctOptions();
  }, [type, setSrcOptions, setDestOptions]);

  const processForm: SubmitHandler<TxnFormData> = async (formData) => {
    try {
      const data = TxnFormSchema.parse(formData);
      const {
        success,
        data: resp,
        error,
        field,
      } = await processTxnAction(data, action);
      if (!success) {
        toast.error(error!);
        if (!!field)
          form.setError(field as keyof TxnFormData, {
            type: "validation",
            message: error!,
          });
      } else {
        toast.success(
          `${resp?.type} "${
            resp?.description ?? resp?.category?.name
          }" for INR ${resp?.amount} ${action}${
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
      else return toast.error("Could not process action");
    }
  };

  return (
    <Tabs defaultValue={TxnType.Expense} className="w-full">
      <TabsList>
        {Object.keys(TxnType).map((t) => (
          <TabsTrigger
            disabled={action !== FormAction.Add}
            key={t}
            value={t}
            onClick={() => form.setValue("type", t as TxnType)}
          >
            {t}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(TxnType).map((t) => (
        <TabsContent key={t} value={t}>
          <Form {...form}>
            <form
              className="w-full flex flex-col gap-8 lg:min-h-[30vh] relative mt-8"
              onSubmit={form.handleSubmit(processForm)}
            >
              <div className="grid w-full gap-8 md:grid-cols-2">
                {/* Txn Date Field */}
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  value={new Date(date).toISOString().slice(0, 10)}
                  disabled={action === FormAction.Delete}
                />

                {/* Txn Amount Field */}
                <Input
                  name="amount"
                  label="Amount"
                  disabled={action === FormAction.Delete}
                />
              </div>

              {/* Txn Desc Field */}
              <TxnDescField disabled={action === FormAction.Delete} />

              <div className="grid w-full gap-8 md:grid-cols-2">
                {/* Txn Source Field */}
                {type !== TxnType.Income && (
                  <Select
                    className={cn(type === TxnType.Expense && "md:col-span-2")}
                    name="source"
                    label={`${type === TxnType.Transfer ? "From" : ""} Account`}
                    desc={
                      !!source?.value
                        ? `Account Balance: ${srcBalance}`
                        : "Account that should be debited"
                    }
                    options={srcOptions}
                    isDisabled={action === FormAction.Delete}
                  />
                )}

                {/* Txn Destination Field */}
                {type !== TxnType.Expense && (
                  <Select
                    className={cn(type === TxnType.Income && "md:col-span-2")}
                    name="destination"
                    label={`${type === TxnType.Transfer ? "To" : ""} Account`}
                    desc="Account that should be credited"
                    options={destOptions}
                    isDisabled={action === FormAction.Delete}
                  />
                )}
              </div>

              <div className="grid w-full gap-8 md:grid-cols-2">
                {/* Txn Category */}
                <Select
                  className={cn(
                    (!grpOptions || grpOptions.length === 0) && "md:col-span-2"
                  )}
                  name="category"
                  label="Category"
                  options={catOptions}
                  isDisabled={action === FormAction.Delete}
                />

                {/* Txn Group Field */}
                {!!grpOptions && grpOptions.length > 0 && (
                  <Select
                    name="group"
                    label="Group"
                    options={grpOptions}
                    isDisabled={action === FormAction.Delete}
                  />
                )}
              </div>

              {action === FormAction.Delete && (
                <div className="mt-4 text-lg text-center font-semibold md:col-span-2 text-destructive font-fira">
                  Are you sure you want to delete this transaction?
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
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TxnForm;
