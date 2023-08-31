"use client";

import { Input } from "@/components/shadcn/ui/input";
import {
  findExpenseCategory,
  findNonExpenseCategory,
  getCategoryOptions,
} from "@/lib/utils";
import { ReactSelectGrpOptions, ReactSelectOptions } from "@/types/app";
import { TxnType } from "@prisma/client";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface TxnDescFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TxnDescField: FC<TxnDescFieldProps> = ({ ...props }) => {
  const { setValue, getValues } = useFormContext();
  const { type, description } = getValues();
  const catOptions = getCategoryOptions(type);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (description.length > 2) {
        const foundCat =
          type === TxnType.Expense
            ? findExpenseCategory(
                description,
                catOptions as ReactSelectGrpOptions
              )
            : findNonExpenseCategory(
                description,
                catOptions as ReactSelectOptions
              );
        setValue("category", foundCat);
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [description, catOptions, setValue, type]);

  return <Input name="description" label="Description" {...props} />;
};

export default TxnDescField;
