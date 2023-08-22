import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/ui/form";

interface SelectProps extends ComponentPropsWithoutRef<typeof ReactSelect> {
  label: string;
  desc?: string;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  desc,
  isDisabled,
  isClearable = true,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = !!errors[name!]?.message;

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <FormItem className="relative">
          <FormControl>
            <ReactSelect
              placeholder="Select a value.."
              isClearable={isClearable}
              isDisabled={isDisabled}
              onChange={onChange}
              defaultValue={value}
              value={value}
              {...props}
              unstyled
              menuShouldScrollIntoView={false}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
                // On mobile, the label will truncate automatically, so we want to
                // override that behaviour.
                multiValueLabel: (base) => ({
                  ...base,
                  whiteSpace: "normal",
                  overflow: "hidden",
                }),
                control: (base) => ({
                  ...base,
                  transition: "all",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 99,
                }),
              }}
              classNames={{
                placeholder: () => "text-muted-foreground font-fira",
                input: () => "pl-3",
                valueContainer: () => "px-1 gap-2",
                clearIndicator: () =>
                  "border border-background bg-card hover:bg-card-hover text-card-foreground rounded-md",
                dropdownIndicator: () =>
                  cn(isDisabled ? "text-muted-foreground" : ""),
                menu: () =>
                  cn(
                    "p-1 mt-2 border border-background bg-accent text-accent-foreground rounded-lg text-sm z-[99] absolute"
                  ),
                menuPortal: () => "shadow-md shadow-background",

                control: ({ isFocused, isDisabled }) =>
                  cn(
                    "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm  bg-background border-0 border-b-2 border-input appearance-none peer",
                    isFocused && "outline-none ring-0 border-primary",
                    isDisabled && "cursor-not-allowed opacity-50",
                    !!error && "border-destructive"
                  ),
                groupHeading: () =>
                  "text-base text-foreground font-bold p-2 border-b border-input uppercase",

                option: ({ isFocused, isSelected }) =>
                  cn(
                    "hover:cursor-pointer px-3 py-2 rounded z-[99]",
                    isFocused &&
                      "bg-primary text-primary-foreground active:bg-primary active:text-white",
                    isSelected &&
                      "before:content-['✔'] before:mr-2 before:text-green-500"
                  ),
                multiValue: ({ isDisabled }) =>
                  cn(
                    "bg-primary text-primary-foreground rounded items-center py-0.5 pl-2 pr-1 gap-1 items-center relative",
                    isDisabled &&
                      "bg-muted text-muted-foreground cursor-not-allowed"
                  ),
                multiValueLabel: () => "leading-6 py-0.5 truncate",
                multiValueRemove: () =>
                  "bg-secondary text-secondary-foreground absolute -right-1 -top-1 rounded hover:bg-accent",
              }}
            />
          </FormControl>
          <FormLabel
            className={cn(
              "text-primary",
              isDisabled && "text-muted-foreground opacity-70"
            )}
          >
            {label}
          </FormLabel>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Select;
