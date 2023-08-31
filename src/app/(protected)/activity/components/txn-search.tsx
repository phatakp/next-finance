"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Form } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TxnSearchInput = ({
  getQuery,
}: {
  getQuery: (result: string) => void;
}) => {
  const form = useForm<{ q: string }>({
    defaultValues: { q: "" },
  });

  const q = form.watch("q");

  useEffect(() => {
    getQuery(q);
  }, [q]);

  return (
    <Form {...form}>
      <form className="w-full relative">
        <Input name="q" label="Search Transactions" required />
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <Search className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
};

export default TxnSearchInput;
